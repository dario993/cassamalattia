import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  localesList = [
    { code: 'de', label: 'Tedesco' },
    { code: 'fr', label: 'Francese' }
  ]
  title = 'cassamalattia';


}
