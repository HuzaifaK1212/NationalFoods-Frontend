import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  showMessages: any;
  errors: any;
  submitted: any;
  socialLinks: any;
  messages: any;
  rememberMe: any;

  formLogin: FormGroup;
  isSubmitted = false;

  showPassword = false;
  user = {
    user_Email: "",
    user_Password: ""
  };

  // loginTypeList = Config.loginTypeList;

  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // this.user.loginType = this.environment.defaultLoginType;

    this.formLogin = new FormGroup(
      {
        // loginType: new FormControl('', [Validators.required]),
        // email: new FormControl('', [Validators.required, Validators.email]),
        email: new FormControl(this.user.user_Email, [Validators.required, Validators.email]),
        // 'email': new FormControl('', [Validators.required, Validators.pattern(this.patternEmail)]),
        // password: new FormControl('', [Validators.required])
        password: new FormControl(this.user.user_Password, [Validators.required])
      }
    );

    this.updateValidation();
  }

  ngOnInit(): void {
  }

  updateValidation() {

    // if (this.user.loginType && this._utilityService.isStringMatched((this.user.loginType).toString(), ['1'])) {
    //   this.formLogin.get('email').setValidators([Validators.required, Validators.email]);
    // }
    // if (this.user.loginType && this._utilityService.isStringMatched((this.user.loginType).toString(), ['2'])) {
    //   this.formLogin.get('email').setValidators([Validators.required]);
    // }
    // if (!(this.user.loginType) || (this.user.loginType && !this._utilityService.isStringMatched((this.user.loginType).toString(), ['1', '2']))) {
    //   this.formLogin.get('email').setValidators([Validators.required, Validators.email]);
    // }


    // this.formLogin.get('email').updateValueAndValidity();

  }


  onLogin() {
    console.log("onLogin");
    this._router.navigate(['/dashboard']);
    // this.route.navigate(['Main']);
  }
}
