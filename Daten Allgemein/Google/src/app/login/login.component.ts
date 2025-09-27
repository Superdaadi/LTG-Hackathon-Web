import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';
  errorMsg: string = '';
  showPassword: boolean = false;

  // Beispiel-Liste erlaubter Mails
  allowedEmails: string[] = ['test@gmail.com', 'dadimanuelsch@gmail.com', 'informatik-am-ltg-26@gmail.com'];

  constructor(private router: Router) {}

  onNext() {
    if (!this.showPassword) {
      // Step 1: Email check
      if (this.allowedEmails.includes(this.email.trim().toLowerCase())) {
        this.errorMsg = '';
        this.showPassword = true; // Weiter zum Passwort
      } else {
        this.errorMsg = 'Couldn’t find your Google Account';
      }
    } else {
      // Step 2: Passwort Eingabe (hier könnte man Backend-Check machen)
      if (this.password.trim()) {
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['']);
      } else {
        this.errorMsg = 'Please enter your password';
      }
    }
  }

}
