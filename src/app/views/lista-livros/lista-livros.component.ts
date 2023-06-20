import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl;
  // listaLivros: Livro[];

  constructor(private service: LivroService) { }


  livrosEncontrados$ = this.campoBusca.valueChanges
  .pipe(
    tap(() => console.log("Fluxo inicial")),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)), // so passa a ultima requisição. Desconsiderando as anteriores
    tap(() => console.log("Fim das Resuisições") ),
    map(items => {
      return this.livrosResultadoParaLivros(items)
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}



