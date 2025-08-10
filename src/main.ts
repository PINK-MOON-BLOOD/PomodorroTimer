import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { PomodoroTimerComponent } from './app/pomodoro-timer/pomodoro-timer.component';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
 