import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  textDir = 'ltr';

  constructor(
    private platform: Platform,
    public translate: TranslateService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.setDefaultLang('en');
    this.translate.use('vi');

    this.platform.ready().then(() => {
      this.afAuth.user.subscribe(
        user => {
          if (user) {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/login']);
          }
        },
        err => {
          this.router.navigate(['/login']);
        },
        () => {
          this.splashScreen.hide();
        }
      );
      this.statusBar.styleDefault();

      //this is to determine the text direction depending on the selected language
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.textDir = event.lang === 'ar' ? 'rtl' : 'ltr';
      });
    });
  }
}
