import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: [null, [
        Validators.required,
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8)
      ]]
    })
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];
    
    const result = control.invalid && control.touched;
    
    return result;
  }

  onSubmit() {
    const controls = this.form.controls;
    
    /** Проверяем форму на валидность */ 
    if (this.form.invalid) {
      /** Если форма не валидна, то помечаем все контролы как touched*/
      Object.keys(controls)
      .forEach(controlName => controls[controlName].markAsTouched());
       
      /** Прерываем выполнение метода*/
      return;
    }
    
    /** Обработка данных формы */
    this.auth.login(
      this.form.get('username').value,
      this.form.get('password').value
    )
  }

}
