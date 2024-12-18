import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
    @Input() height: string = '14px';
    @Input() color: string | null = null;
    @Input() center: boolean = false;
}
