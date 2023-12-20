import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { CholloDetailComponent } from './content/chollo-detail/chollo-detail.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContentComponent } from './content/content.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { clientGuard } from './guards/client.guard';
import { MyUserComponent } from './content/my-user/my-user.component';


export const routes: Routes = [
    {
        path:'',
        component: ContentComponent,
        children:[
            {
                path:'home',
                component:HomeComponent
            },
            {
                path:'chollo/:id',
                component:CholloDetailComponent
            },
            {
                path: 'my-user',
                component: MyUserComponent
            }
        ]
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'login/:id',
        component: LoginComponent
    },
    {
        path:'sign-up',
        component: SignUpComponent
    },
    {
        path:'client',
        component: ClientPageComponent,
        canActivate: [clientGuard]
    },
    {
        path:'404',
        component: ErrorComponent
    },
    {
        path:'**',
        redirectTo: '404'
    }
];
