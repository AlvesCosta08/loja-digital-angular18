import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Este import está sendo usado no template
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'loja-digital';
}
