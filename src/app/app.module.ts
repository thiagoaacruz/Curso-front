import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarCursoComponent } from './cadastrar-curso/cadastrar-curso.component';
import { ConsultarCursoComponent } from './consultar-curso/consultar-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

//Criando rotas para os formulários de preenchimento
const routes: Routes = [

  {path: 'cadastrar-curso', component: CadastrarCursoComponent},
  {path: 'consultar-curso', component: ConsultarCursoComponent},
  {path: 'editar-curso/:id', component: EditarCursoComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CadastrarCursoComponent,
    ConsultarCursoComponent,
    EditarCursoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule, //Fazer esse import para funcionar o [formGroup]="formCadastro"
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
