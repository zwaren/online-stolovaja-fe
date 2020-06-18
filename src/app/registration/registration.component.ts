import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../auth.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private flash: FlashMessagesService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: [null, [
        Validators.required,
      ]],
      email: [null, [
        Validators.required, 
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8)
      ]],
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
    let ret = this.auth.signup(
      this.form.get('username').value,
      this.form.get('email').value,
      this.form.get('password').value,
    )
    if (ret) {
      this.flash.show('Регистрация прошла успешно!', { cssClass: 'alert-success', timeout: 3000 })
    } else {
      this.flash.show('При регистрации возникла ошибка!', { cssClass: 'alert-danger', timeout: 3000 })
    }
  }

}
