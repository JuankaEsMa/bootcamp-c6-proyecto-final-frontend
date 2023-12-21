import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { CholloDetailComponent } from './content/chollo-detail/chollo-detail.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContentComponent } from './content/content.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployeeFormComponent} from './employee-form/employee-form.component';
import { EmployeeFormEditComponent } from './employee-form-edit/employee-form-edit.component';
import { clientGuard } from './guards/client.guard';
import { MyUserComponent } from './content/my-user/my-user.component';
import { FavoritosComponent } from './content/favoritos/favoritos.component';


export const routes: Routes = [
    {
        path:'',
        component: ContentComponent,
        children:[
            {
                path:'',
                component:HomeComponent
            },
            {
                path:'chollo/:id',
                component:CholloDetailComponent
            },
            {
                path: 'my-user',
                component: MyUserComponent,
                canActivate: [clientGuard]
            },
            {
                path:'favoritos',
                component: FavoritosComponent,
                canActivate: [clientGuard]
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
        path:'employee',
        component: EmployeePageComponent,
        // canActivate: [clientGuard]
    },
    {
        path:'employee-form',
        component: EmployeeFormComponent,
        // canActivate: [clientGuard]
    },
    {
        path:'employee-form-edit/:id',
        component: EmployeeFormEditComponent,
        // canActivate: [clientGuard]
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
