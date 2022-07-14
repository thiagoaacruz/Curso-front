import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-cadastrar-curso',
  templateUrl: './cadastrar-curso.component.html',
  styleUrls: ['./cadastrar-curso.component.css']
})
export class CadastrarCursoComponent implements OnInit {

  constructor(private httpCliente: HttpClient) { }

  //atributo
  mensagem: string = '';

  formCadastro: FormGroup;

  categorias: Categoria[]

  ngOnInit(): void {

    //estrutura do formulario
    this.formCadastro = new FormGroup({
      //campos formulario
      descricaoAssunto: new FormControl('', [Validators.required]),
      dataInicio: new FormControl('', [Validators.required]),
      dataTermino: new FormControl('', [Validators.required]),
      quantidadeAluno: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required])

    })
    this.carregarCategorias();

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

  //acessando o formulario/pagina HTML pegando dados tela
  get form(): any {
    return this.formCadastro.controls;
  }

  //fazer chamada de cadastro na API
  onSubmit(): void {

    let curso = this.formCadastro.value//atribuindo o valor da variavel

    let categoria = { 'idCategoria': this.formCadastro.get('categoria').value }

    curso.categoria = categoria

    this.httpCliente.post(environment.apiUrl + '/curso',
      curso, { responseType: 'text' }).subscribe(
        data => {
          this.mensagem = data;
          this.formCadastro.reset();
        },
        e => {
          alert(e.error)
          this.mensagem = "Cadastro nao realizado";
          console.log(e);
        }
      )
  }

}
