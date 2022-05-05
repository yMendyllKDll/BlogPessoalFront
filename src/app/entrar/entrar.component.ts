import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    window.scroll(0,0);
  }

  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;
        alert('Usuario Logado com sucesso');
        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.foto = this.usuarioLogin.foto;
        environment.token = this.usuarioLogin.token;
        this.router.navigate(['/inicio']);
      },
      error: (erro) => {
        if (erro.status == 401) {
          alert('Usuário ou senha estão incorretos!');
        }
      },
    });
  }
  validaEmail() {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(this.usuarioLogin.usuario.match(regex)) {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'green';
      usuario.style.boxShadow = '0 0 1em green';
    } else {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'red';
      usuario.style.boxShadow = '0 0 1em red';
    }
  }
}
