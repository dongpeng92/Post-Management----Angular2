import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { TooltipModule } from 'angular2-tooltips';

import { AppComponent } from './app.component';
import { HomeComponent } from './auth/home/home.component';
import { PostsComponent } from './posts/posts/posts.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { CreateComponent } from './posts/create/create.component';
import {AuthinterceptorService} from './auth/authinterceptor.service';
import { PostsService } from './posts/posts.service';
import { CommentComponent } from './posts/comment/comment.component';
import { PanelComponent } from './posts/panel/panel.component';
import { EditComponent } from './posts/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    CreateComponent,
    CommentComponent,
    PanelComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // TooltipModule,
    RouterModule.forRoot([
      {path: 'posts', component: PostsComponent, canActivate: [AuthGuard],
        children: [
          {path: 'edit/:id', component: EditComponent}
        ]},
      {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: '*', redirectTo: 'home'}
    ])
  ],
  providers: [AuthService, PostsService, CookieService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
