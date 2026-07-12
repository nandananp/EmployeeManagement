import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [RouterOutlet,RouterLink,TranslateModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

}
