import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,TranslateModule],
  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('routing');
  constructor(private translate : TranslateService){
       this.translate.addLangs(['en', 'fr', 'ml']);

    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeLang(lang: string){
    this.translate.use(lang);

}
}
