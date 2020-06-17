import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, [
        Validators.required,
        Validators.pattern(/[А-я]/)
      ]],
      email: [null, [
        Validators.required, 
        Validators.email
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8)
      ]],
      isCook: [false]
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
    this.auth.signup(
      this.form.get('name').value,
      this.form.get('email').value,
      this.form.get('password').value,
      this.form.get('isCook').value,
    )
  }

}
