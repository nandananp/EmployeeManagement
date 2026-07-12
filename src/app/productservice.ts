import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Productservice {

private baseUrl = 'http://localhost:8082/products';
  constructor(private http: HttpClient){}
  getProducts() : Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl);
  }
  getProductById(id: number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  addProduct(product:any): Observable<any>{
    return this.http.post<any>(this.baseUrl, product);

  }
  updateProduct(id:number, product:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }
 
//   getProducts(){
//     return this.products;

//   }
//   getProductById(id:number){
// return this.products.find(p => p.id === id);
  
//   }
//   addProduct(name:string){
//     const newProduct = {id: this.products.length+1, name};
//     this.products.push(newProduct);
//   }
//   updateProduct(id: number, newName:string){
//     const product = this.products.find(p => p.id === id);
//     if(product){
//       product.name=newName;
//     }
//   }
}
