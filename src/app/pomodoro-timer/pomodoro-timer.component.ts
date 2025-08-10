import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IsOnService } from '../is-on.service';
@Component({
  selector: 'app-pomodoro-timer',
  imports: [CommonModule, FormsModule],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.css',
})
export class PomodoroTimerComponent implements OnInit{
  @Input() timeLeft: number = 0;
  totalTime: number = 0;
  breakTime!: number;
  isRunning: boolean = false;
  timer: any;
  isOn: boolean= false;
  counterStartTimer: number = 0;
  counterPomodoro: number = 0;
  condition: any;

  constructor(private isonservice : IsOnService){}
   ngOnInit(){
    this.isonservice.booleanState$.subscribe(value =>{
      this.isOn = value;
      console.log(this.isOn);
    });
   }
  
  mode: 'work' | 'break' = 'work';
  get time() {
    return this.timeLeft === 0 ? true : false;
  }
  
  get minutesPomodor() {
    return Math.floor(this.timeLeft / 60)
      .toString()
      .padStart(2, '0');
  }

  get secondsPomodor() {
    return (this.timeLeft % 60).toString().padStart(2, '0');
  }
  get progres() {
    return this.totalTime ? (this.timeLeft / this.totalTime) * 100 : 0;
  }
  get colorProgresBar() {
    return this.mode === 'work' ? 'bg-gradient-to-r from-violet-600 to-cyan-400' : 'bg-gradient-to-r from-green-600 to-green-300';
  }

  
  onToggle() {
  // При кліку оновлюємо сервіс, а не локальну змінну напряму
  this.isonservice.setBooleanState(!this.isOn);
  this.resetTimer();
}
  noToggleBackWhenPomodoroWork() {
    this.condition = this.isOn && this.time === false && this.isRunning;
    return this.condition ? 'check' : false;
  }
  startTimer() {
    this.counterStartTimer += 1;
    console.log(this.counterStartTimer);
    if (this.isRunning) {
      return;
    }

    if (!this.isRunning && this.counterStartTimer === 1) {
      this.totalTime = this.timeLeft;
      console.log(this.totalTime);
    }
    this.isRunning = true;
    if (this.isRunning) {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else if (this.timeLeft === 0) {
          const audio = new Audio('/sound/alarm_clock.mp3');
          audio.play();
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, 3000);

          clearInterval(this.timer);
          this.isRunning = false;
          this.counterStartTimer = 0;
          console.log('Timer finished');
        }
      }, 1000);
    }
  }

  startTimerPomodor() {
    this.counterStartTimer += 1;
    if (this.isRunning) return;
    if (!this.isRunning && this.counterStartTimer === 1) {
      this.totalTime = this.timeLeft;
      console.log(this.totalTime);
    }
    this.isRunning = true;
    if (this.isRunning) {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          const audio = new Audio('/sound/alarm_clock.mp3');
          audio.play();
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, 3000);

          clearInterval(this.timer);
          this.isRunning = false;
          this.counterStartTimer = 0;

          this.breakTime =
            this.totalTime === 5 * 60
              ? 1 * 60
              : this.totalTime === 10 * 60
              ? 2 * 60
              : this.totalTime === 25 * 60
              ? 5 * 60
              : this.totalTime === 50 * 60
              ? 10 * 60
              : this.totalTime > 50 * 60
              ? 15 * 60
              : this.counterPomodoro === 4
              ? 25 * 60
              : 5 * 60;

          this.mode = this.mode === 'work' ? 'break' : 'work';
          if (this.mode === 'work') {
            this.timeLeft = this.totalTime;
          } else {
            this.timeLeft = this.breakTime;
            this.counterPomodoro += 1;
            console.log('this.counterPomodoro' + this.counterPomodoro);
            if (this.counterPomodoro == 5) {
              this.counterPomodoro = 0;
            }
          }
          this.startTimerPomodor();
        }
      }, 1000);
    }
  }
  resetTimer() {
    this.totalTime = 0;
    this.counterStartTimer = 0;
    this.timeLeft = 0 * 60;
    this.isRunning = false;
    clearInterval(this.timer);
    console.log('Timer reset');
  }

  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
      console.log('Timer paused');
    }
  }

  addMinutes(value: number) {
    this.timeLeft += value * 60;
  }
 
}
// Додай пояснення до таймерів
