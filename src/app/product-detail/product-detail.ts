import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  imports: [TranslateModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  productId:string | null =null;
  constructor(private route: ActivatedRoute, private router: Router){}
  ngOnInit(): void{
this.productId = this.route.snapshot.paramMap.get('id');
this.route.paramMap.subscribe(params=>{
  this.productId = params.get('id');

})
  }
goBack(){
this.router.navigate(['/products'])
}




}
// Activated Route : AR is used for reading route parameters.
// Snapshot:  Snapshot gives a one time, static copy of the route data at the moment the 
// component loads.it does not update if the route parameters changes.while staying on the same page.
//Subscribe(){} :It listens for the changes in the route parameters.


