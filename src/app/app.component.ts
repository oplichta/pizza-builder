import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// No OnPush on the root: an unmarked OnPush component blocks change detection for its whole
// subtree, which would freeze DeliveryComponent's timer and payment state under <router-outlet>.

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pizza-builder';
}
