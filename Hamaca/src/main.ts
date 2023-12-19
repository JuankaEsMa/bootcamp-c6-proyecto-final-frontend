// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err)
// );

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { ApiLoggingInterceptor } from './app/services/api-logging.interceptor';

bootstrapApplication(AppComponent, {
  ...appConfig,
  // providers: [
  //   provideHttpClient(),
  //   { provide: ApiLoggingInterceptor, useClass: ApiLoggingInterceptor, multi: true },
  // ],
}).catch((err) => console.error(err));
