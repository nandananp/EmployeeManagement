import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Productservice } from '../productservice';

@Component({
  selector: 'app-products-list',
  imports: [RouterLink],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductList implements OnInit {
products: any[] =[];
constructor(private ps:Productservice){}
ngOnInit(): void {
  this.ps.getProducts().subscribe(data =>{
    this.products=data ;
  });
}
  

}
