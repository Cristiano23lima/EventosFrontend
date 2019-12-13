import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AutenticacaoService } from './../../services/autenticacao.service';
import { UsuarioServiceService } from './../../services/usuario-service.service';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.css']
})
export class AutenticacaoComponent implements OnInit {

  loginForm: FormGroup;
  RegisterForm: FormGroup;
  loading = false;
  submitted = false;
  submittedRegister = false;
  returnUrl: string;
  error = '';


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AutenticacaoService,
    private usuarioService: UsuarioServiceService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
   });

   this.RegisterForm = this.formBuilder.group({
     username: ['', Validators.required],
     password: ['', Validators.required],
     name: ['', Validators.required]
   })

    // Obtem a url de retorno dos parametros de rotas ou utiliza a url padrao
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //facilitar o acesso ao formulario
  get f() { return this.loginForm.controls; }
  get r() { return this.RegisterForm.controls; }

  onSubmit() {
    this.submitted = true;

    // para nessa codição caso o formulario seja invalido
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

  onSubmitRegister() {
    this.submittedRegister = true;

    if(this.RegisterForm.invalid){
      return ;
    }

    this.loading = true;
    this.usuarioService.RegisterUser(this.r.username.value, this.r.password.value, this.r.name.value)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
          this.loading = false;
          console.log(error);
        }
      )
  }
}
