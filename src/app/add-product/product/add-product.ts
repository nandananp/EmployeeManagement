import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Productservice } from '../../productservice';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule,MatFormFieldModule,MatInputModule, MatButtonModule, TranslateModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  productName:string="";
  constructor(private ps:Productservice, private router:Router){}
  onSubmit(form:any){
    this.ps.addProduct(form.value).subscribe(() =>{
     alert("Product Saved")
     this.router.navigate(['/products'])
    }
    
    );
    
  }

}
