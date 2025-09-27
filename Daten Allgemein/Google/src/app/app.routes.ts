import { Routes } from '@angular/router';
import { GoogleComponent } from './google/google.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {path: '', component: GoogleComponent},
    {path: 'login', component: LoginComponent},
    {path: 'search', component: SearchComponent},
];
