import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  constructor(private HttpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  //atributo
  mensagem: string = '';

  formEdicao: FormGroup;

  categorias: Categoria[]


  //Função é executada quando a página é aberta
  ngOnInit(): void {
    //capturar o id enviado pela URL
    const idCurso = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //montando a estrutura do formulário
    this.formEdicao = new FormGroup({

      //campos do formulário...serão os mesmos que temos na consulta

      idCurso: new FormControl(''),
      descricaoAssunto: new FormControl('', [Validators.required]),
      dataInicio: new FormControl('', [Validators.required]),
      dataTermino: new FormControl('', [Validators.required]),
      quantidadeAluno: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required])

    });

    this.carregarCategorias();

    //consultar o curso na API através do id
    this.HttpClient.get(environment.apiUrl + "/curso/" + idCurso).subscribe(

      (data: any) => {

        //preenchendo os campos do formulário com os dados do curso
        this.formEdicao.patchValue({ idCurso: data.idCurso });
        this.formEdicao.patchValue({ descricaoAssunto: data.descricaoAssunto });
        this.formEdicao.patchValue({ dataInicio: data.dataInicio });
        this.formEdicao.patchValue({ dataTermino: data.dataTermino });
        this.formEdicao.patchValue({ quantidadeAluno: data.quantidadeAluno });
        this.formEdicao.patchValue({ categoria: data.categoria.idCategoria });

      },
      (e) => {
        console.log(e);
      }
    )

  }

  //carregar categorias
  carregarCategorias() {
    //buscar categorias do banco

    this.categorias = [
      { idCategoria: 1, nome: 'Multiplataforma' },
      { idCategoria: 2, nome: 'Banco_de_dados' },
      { idCategoria: 3, nome: 'Metodologia' },
      { idCategoria: 4, nome: 'Comportamento' },
      { idCategoria: 5, nome: 'Comunicação' }
    ];

  }

  get form(): any {

    return this.formEdicao.controls;

  }

  //função para fazer a camada do edição na API
  onSubmit(): void {

    let curso = this.formEdicao.value//atribuindo o valor da variavel

    let categoria = { 'idCategoria': this.formEdicao.get('categoria').value }

    curso.categoria = categoria

    this.HttpClient.put(environment.apiUrl + '/curso',
      curso, { responseType: 'text' }).subscribe(
        data => {
          this.mensagem = data;
          this.formEdicao.reset();
        },
        e => {
          this.mensagem = "Edição não realizada";
          console.log(e);
        }
      )
  }

}
