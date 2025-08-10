import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PomodoroTimerComponent } from './pomodoro-timer/pomodoro-timer.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IsOnService } from './is-on.service';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PomodoroTimerComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'PomodoraAngular';
  modalWindow: boolean = false;
  inputMinPomodor: number = 0;

  inputMin: number = 0;
  inputSec: number = 0;
  convertMin: number = 0;
  convertSec: number = 0;
  totalConvertTime: number = 0;
  isOn1: boolean = false;
  upDataTimer: number = 0;
  allWallpapers: string[] = ['Sim.jpg', 'flower.jpg', 'Sur.jpg'];

  reactiveForm: FormGroup;
  constructor(private fb: FormBuilder, private isonservice: IsOnService) {
    this.reactiveForm = this.fb.group({
      skills: this.fb.array([]),
    });
  }
  ngOnInit() {
    this.isonservice.booleanState$.subscribe((value) => {
      this.isOn1 = value;
      console.log(this.isOn1);
    });
    document.body.style.backgroundImage = `url(/wallpaper/Sim.jpg)`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center top -80px';
    document.body.style.backgroundRepeat = 'no-repeat';
  }

  get skills(): FormArray {
    return this.reactiveForm.get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      done: false,
    });
  }

  addSkill() {
    this.skills.push(this.newSkill());
  }

  deleteSkill(i: number) {
    this.skills.removeAt(i);
  }

  onSubmit() {
    console.log(this.reactiveForm.value);
  }
  changeWallpaper(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log(selectedValue);
    document.body.style.backgroundImage = `url(/wallpaper/${selectedValue})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center top -80px';
    document.body.style.backgroundRepeat = 'no-repeat';

    // document.body.style.backgroundImage = `url(/wallpaper/Sim.jpg)`;
    // document.body.style.backgroundSize = 'cover';
    // document.body.style.backgroundPosition = 'center top -80px';
    // document.body.style.backgroundRepeat = 'no-repeat';
  }
  openModalwindowSettings() {
    this.modalWindow = !this.modalWindow;
  }
  updateTimerPomodor() {
    this.upDataTimer = this.inputMinPomodor * 60;
  }
  convertInSeconds() {
    this.convertMin = this.inputMin * 60;
    this.convertSec = this.inputSec;
    this.totalConvertTime = this.convertMin + this.convertSec;
  }

  changeInput() {
    if (this.inputSec === 60) {
      this.inputMin += 1;
      this.inputSec = 0;
    }
  }
}
