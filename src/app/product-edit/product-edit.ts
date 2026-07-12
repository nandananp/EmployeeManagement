import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cancomponentDeactivate } from '../deactivate-guard';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Productservice } from '../productservice';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-edit',
  imports: [FormsModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,TranslateModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css',
})
export class ProductEdit implements cancomponentDeactivate{

  productForm! : FormGroup;

  productId!:number;
  constructor(private router : Router, private route:ActivatedRoute, private fb:FormBuilder, private ps:Productservice){
    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
     this.ps.getProductById(this.productId).subscribe(product => {
      if(product){
        this.productForm.patchValue({
          name:product.name
        });
      }
     });
  
  }
  goBack(){
    this.router.navigate(['/products'])
   }
  name='';
  saved=false;
  save(){
    this.ps.updateProduct(this.productId, this.productForm.value).subscribe(()=>{

   
    this.saved=true;
    alert('product saved!');
    this.router.navigate(['/products'])
 });
  }
  CanDeactivate():boolean {
    if(!this.saved && this.name){
      return confirm('you have unsaved changes.Leave this page?');

    }
    return true;
  }

}
