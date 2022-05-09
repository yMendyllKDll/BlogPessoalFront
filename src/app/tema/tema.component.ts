import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-temas',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTema: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit(){

    if(environment.token ==''){
      alert('Sessão expirada, faça login para continuar')
      this.router.navigate(['/entrar'])
    }

    this.findAllTema()


  }

  findAllTema(){
    this.temaService.getAllTema().subscribe((resp:Tema[]) =>{
      this.listaTema = resp
      console.log(this.listaTema)
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe({
      next: (resp:Tema) =>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.tema = new Tema()
      this.findAllTema()
      },
      error: (erro) => {
        if(erro.status == 400){
          alert('Tema não pode ser cadastrado pois já existe um tema com está descrição');
        }
      },
    })
  }
}