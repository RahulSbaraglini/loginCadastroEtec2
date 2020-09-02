import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CpfValidator } from '../validators/cpf-validator';

import { Router } from '@angular/router';
import { ComparacaoValidator } from '../validators/comparacao-validator';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup;

  public mensagens_validacao = {
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório!' },
      { tipo: 'email', mensagem: 'E-mail inválido!' }
    ],
    nome: [
      { tipo: 'required', mensagem: 'O campo nome é obrigatório!' },
      { tipo: 'email', mensagem: 'E-mail inválido!' },
      { tipo: 'minlength', mensagem: 'O número deve ter pelo menos 10 caracteres!' }
    ],
    senha: [
      { tipo: 'required', mensagem: 'O campo senha é obrigatório' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha!' },
    ],
    confirmarsenha: [
      { tipo: 'required', mensagem: 'O campo confirmar senha é obrigatório' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha!' },
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O cpf deve ter pelo menos 11 caracteres!' },
      { tipo: 'maxlength', mensagem: 'O cpf deve ter no máximo 14 caracteres!' },
      { tipo: 'invalido', mensagem: 'CPF inválido!' }
    ],
    data: [
      { tipo: 'required', mensagem: 'O campo data é obrigatório!' },
    ],
    celular: [
      { tipo: 'required', mensagem: 'O campo celular é obrigatório!' },
      { tipo: 'minlength', mensagem: 'O número deve ter pelo menos 10 caracteres!' },
      { tipo: 'maxlength', mensagem: 'O número deve ter no máximo 11 caracteres!' }
    ],
    genero: [
      { tipo: 'required', mensagem: 'O campo genero é obrigatório!' },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    public alertController: AlertController,
    public router: Router
  ) {
    this.formRegistro = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],

      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],

      confirmarsenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],

      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfValidator.cpfValido])],

      data: ['', Validators.compose([Validators.required])],

      celular: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(16)])],

      genero: ['', Validators.compose([Validators.required])]
    }, {
      validator: ComparacaoValidator('senha', 'confirmarsenha')
    });
  }

 async ngOnInit() {
    await this.usuariosService.buscarTodos();
    console.log(this.usuariosService.listaUsuarios);
  }

  public async salvarFomulario() {
    if (this.formRegistro.valid) {

      let usuario = new Usuario();
      usuario.nome = this.formRegistro.value.nome;
      usuario.cpf = this.formRegistro.value.cpf;
      usuario.dataNascimento = new Date(this.formRegistro.value.dataNascimento);
      usuario.genero = this.formRegistro.value.genero;
      usuario.celular = this.formRegistro.value.celular;
      usuario.email = this.formRegistro.value.email;
      usuario.senha = this.formRegistro.value.senha;

      if(await this.usuariosService.salvar(usuario)){
        this.exibirAlerta('SUCESSO!', 'Usuario salvo com sucesso!');
        this.router.navigateByUrl('/login');
      }else {
        this.exibirAlerta('ERRO!', 'Erro ao salvar o usuário!');
      }

    } else {
      this.exibirAlerta('ADVERTENCIA!', 'Formulario inválido<br/>Verifique os campos do seu formulário!');
    }
  }

  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
