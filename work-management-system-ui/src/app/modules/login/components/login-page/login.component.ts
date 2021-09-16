import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Configuration } from '../../../../config';
import { BackEndAuthService } from 'src/app/services/back-end-auth.service';
import { AuthResponse } from 'src/app/dto/authResponse';
import { RolesService } from 'src/app/services/roles.service';
import { RoleUpdateDTO } from 'src/app/dto/roleUpdateDTO';
import { AuthService } from 'src/app/services/auth.service';
import { AccessLevelEnum } from 'src/app/dto/accessLevelEnum';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private loginService: BackEndAuthService,
    private rolesService: RolesService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.loginService
      .login({
        email: this.f.username.value,
        password: this.f.password.value,
      })
      .subscribe({
        next: (authResponse: AuthResponse) => {
          this.authenticationService.login(
            authResponse,
            AccessLevelEnum.Undefined
          );
          this.rolesService.get(authResponse.loggedUser.roleId).subscribe({
            next: (role: RoleUpdateDTO) => {
              this.authenticationService.login(authResponse, role.accessLevel);
              this.loginAproved();
            },
            //blad integralnosci bazy (nie powinien sie zdarzyc())
            error: (error) => {
              error.console.log(error);
            },
          });
        },
        //zle dane logowania
        error: (error) => {
          console.log('zle dane logowania');
          this.loading = false;
        },
      });
  }

  loginAproved() {
    this.loading = false;
    this.router.navigate([Configuration.DefaultAdminPage]);
  }
}
