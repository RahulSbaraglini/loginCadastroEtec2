import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ArmazenamentoService {

  constructor(private storage: Storage) { }

  public salvarDados(chave: string, dados: any) {

    if (chave.trim().length > 0 && dados) {
      return this.storage.set(chave, dados)
        .then(() => {
          console.log('Dados armazenados com sucesso!');
          return true;
        })
        .catch(erro => {
          console.log('Erro ao gravar os dados', erro);
          return false;
        });
    } else {
      return false;
    }
  } // fim do salvar dados

  public pegarDados(chave: string) {

    if (chave.trim().length > 0) {
      return this.storage.get(chave)
        .then(dadosArmazenados => {
          return dadosArmazenados;
        })
        .catch(erro => {
          console.log('Erro ao buscar os dados', erro);
          return null;
        });
    } else {
      return null;
    }

  }
}
