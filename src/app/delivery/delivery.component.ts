import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import { PaymentService } from '../services/payment.service';
import { OrderDetailsService } from '../services/order-details.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { environment } from '../../../enviroment';

const ROUTE_DURATION_MS = 60000;
// Grace period before the courier leaves the pizzeria, so the route is visible before it moves.
const COURIER_START_DELAY_MS = 5000;
// Demo fallback used when /delivery is opened directly, without going through the order form first.
const FALLBACK_ADDRESS = 'aleja Grunwaldzka 129, Gdańsk 80-244';

// Angular's esbuild-based builder can't bundle mapbox-gl's blob-based worker (a known, still-open
// upstream issue: angular/angular-cli#27378, mapbox/mapbox-gl-js#13131). Pointing workerUrl at the
// pre-built, unbundled CSP worker (copied into public/) sidesteps the problem entirely.
mapboxgl.workerUrl = 'mapbox-gl-csp-worker.js';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit, OnDestroy {
  paymentCompleted = false;
  loading = false;
  delivered = false;
  timerMinutes = 1;
  timerSeconds = 0;
  mapError: string | null = null;

  @ViewChild('mapContainer') private mapContainerRef?: ElementRef<HTMLDivElement>;

  private interval: any;
  private animationFrameId: number | null = null;
  private map: mapboxgl.Map | null = null;
  private courierMarker: mapboxgl.Marker | null = null;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private orderDetailsService: OrderDetailsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  makePayment() {
    this.loading = true;
    this.paymentService.processPayment().subscribe(() => {
      this.paymentCompleted = true;
      this.loading = false;
      this.startCountdown();
      // The map container sits behind an @else-if branch, so wait a tick for it to render.
      setTimeout(() => this.startDeliverySimulation());
    });
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.timerSeconds === 0) {
        if (this.timerMinutes === 0) {
          clearInterval(this.interval);
          this.delivered = true;
        } else {
          this.timerMinutes--;
          this.timerSeconds = 59;
        }
      } else {
        this.timerSeconds--;
      }
    }, 1000);
  }

  private startDeliverySimulation() {
    const container = this.mapContainerRef?.nativeElement;
    if (!container) {
      return;
    }

    const origin = environment.pizzeriaOrigin;
    const details = this.orderDetailsService.orderDetails();
    if (!details) {
      console.warn('No order details found for the delivery map — using a placeholder address.');
    }
    // Demo-scoped limitation: the order form has no city field, so a fixed city/country is
    // appended for geocoding (see Geocoding API call below, filtered to country=PL as well).
    const address = details ? `${details.address}, ${details.postcode}` : FALLBACK_ADDRESS;

    this.initMap(container, origin);

    this.geocodeAddress(address).subscribe((destination) => {
      if (!destination) {
        this.mapError = 'Live map unavailable — showing an estimated route.';
        this.drawRoute([origin, origin]);
        return;
      }

      this.getDirections(origin, destination).subscribe((routeCoordinates) => {
        const coordinates = routeCoordinates ?? [origin, destination];
        if (!routeCoordinates) {
          this.mapError = 'Live map unavailable — showing an estimated route.';
        }
        this.drawRoute(coordinates, destination);
        this.animateCourier(coordinates);
      });
    });
  }

  private geocodeAddress(address: string) {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward';
    return this.http
      .get<any>(url, {
        params: { q: address, access_token: environment.mapboxAccessToken, country: 'PL', limit: '1' },
      })
      .pipe(
        map((res) => (res.features?.[0]?.geometry?.coordinates as [number, number]) ?? null),
        catchError(() => of(null))
      );
  }

  private getDirections(origin: [number, number], destination: [number, number]) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}`;
    return this.http
      .get<any>(url, {
        params: { geometries: 'geojson', overview: 'full', access_token: environment.mapboxAccessToken },
      })
      .pipe(
        map((res) => (res.routes?.[0]?.geometry?.coordinates as [number, number][]) ?? null),
        catchError(() => of(null))
      );
  }

  private initMap(container: HTMLDivElement, origin: [number, number]) {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxAccessToken,
      container,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: origin,
      zoom: 12,
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    new mapboxgl.Marker({ color: '#4caf50' }).setLngLat(origin).addTo(this.map);
  }

  private drawRoute(coordinates: [number, number][], destination?: [number, number]) {
    const map = this.map;
    if (!map) {
      return;
    }

    const render = () => {
      const source = map.getSource('route') as GeoJSONSource | undefined;
      const data = { type: 'Feature' as const, properties: {}, geometry: { type: 'LineString' as const, coordinates } };
      if (source) {
        source.setData(data);
      } else {
        map.addSource('route', { type: 'geojson', data });
        map.addLayer({ id: 'route', type: 'line', source: 'route', paint: { 'line-color': '#4caf50', 'line-width': 4 } });
      }

      if (destination) {
        new mapboxgl.Marker({ color: '#9a2f17' }).setLngLat(destination).addTo(map);
        const bounds = coordinates.reduce((b, coord) => b.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
        map.fitBounds(bounds, { padding: 60 });
      }
    };

    if (map.isStyleLoaded()) {
      render();
    } else {
      map.on('load', render);
    }
  }

  private animateCourier(coordinates: [number, number][]) {
    if (!this.map) {
      return;
    }
    this.courierMarker = new mapboxgl.Marker({ color: '#1B98E0' }).setLngLat(coordinates[0]).addTo(this.map);

    // Offset the clock by the delay: progress stays clamped at 0 (courier idle at the origin) until
    // the grace period elapses, then it animates over ROUTE_DURATION_MS.
    const startTime = performance.now() + COURIER_START_DELAY_MS;
    const step = (now: number) => {
      const progress = Math.min(Math.max((now - startTime) / ROUTE_DURATION_MS, 0), 1);
      const index = Math.floor(progress * (coordinates.length - 1));
      this.courierMarker?.setLngLat(coordinates[index]);
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      }
    };
    this.animationFrameId = requestAnimationFrame(step);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.map?.remove();
  }
}
