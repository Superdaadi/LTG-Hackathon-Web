import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev-86whsjajn2rvn8lt.us.auth0.com',
      clientId: 'AK8ncojHnkiRbHS2s9uxXngKgydWkBOR',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
