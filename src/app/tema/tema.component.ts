import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(environment.token ==''){
      alert('Sessão expirada, faça login novamente.')
      this.router.navigate(['/entrar'])
    }
  }

}
