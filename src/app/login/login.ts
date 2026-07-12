import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username =''
  password ='';
  constructor(private router:Router, private authS:AuthService){}
  login(){
    this.authS.login({username: this.username, password:this.password})
    .subscribe(res => {
      this.authS.saveToken(res.token);
      this.router.navigateByUrl('/products');
      
    })
    }
    logout(){
      this.authS.logout();
      this.router.navigate(['/login'])

    }
}
