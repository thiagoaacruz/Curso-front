import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consultar-curso',
  templateUrl: './consultar-curso.component.html',
  styleUrls: ['./consultar-curso.component.css']
})
export class ConsultarCursoComponent implements OnInit {

  //injeção de dependencia
  constructor(private HttpClient: HttpClient) { }

  //atributos para armazenas os dados dos cursos
  curso: any[] = [];


  //formPeriodo: FormGroup;


  //metodo de execuçao quando componente é aberto
  ngOnInit(): void {
    this.HttpClient.get(environment.apiUrl + '/curso?descricaoAssunto=' + this.formPeriodo.value.descricaoAssunto
    + "&dataInicio=" + this.formPeriodo.value.dataInicio + "&dataTermino=" +
    this.formPeriodo.value.dataTermino).subscribe(
      (data) => { this.curso = data as any[]; },
      (e) => {
        console.log(e);

      }
    )
  }


  //função para fazer a exclusão do curso na API
  excluir(idcurso: number): void {

    if (window.confirm('Deseja realmente excluir o curso selecionado?')) {
      this.HttpClient.delete(environment.apiUrl + "/curso/" + idcurso,
        { responseType: 'text' })
        .subscribe(
          (data) => {

            alert(data); //exibir mensagem em uma janela popup
            this.ngOnInit(); //recarregar a consulta de cursos

          },
          (e) => {
            console.log(e);
            alert(e.error)//Exibir mensagem de alerta "Curso finalizado"
          }
        )
    }
  }


  formPeriodo = new FormGroup({
    //campos do formulário de consulta
    descricaoAssunto: new FormControl(''),
    dataInicio: new FormControl(''),
    dataTermino: new FormControl('')

  });

  get form(): any {
    return this.formPeriodo.controls;

  }


  onSubmit(): void {

    this.HttpClient.get(environment.apiUrl + '/curso?descricaoAssunto=' + this.formPeriodo.value.descricaoAssunto
      + "&dataInicio=" + this.formPeriodo.value.dataInicio + "&dataTermino=" +
      this.formPeriodo.value.dataTermino).subscribe(

        (data) => { this.curso = data as any[]; },


        (error) => {
          alert(error.error)
          console.log(error.error);
          console.log(this.curso);
        },

      )
  }






}
