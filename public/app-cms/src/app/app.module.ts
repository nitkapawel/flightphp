import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';

// Function to get the token from localStorage
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["id2it.com"], // Replace with your API domain
        disallowedRoutes: [
          "http://id2it.com/api/login",
          "http://id2it.com/api/register",
          "http://id2it.com/api/refresh-token"
        ]
        
      }
    })
  ],
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
