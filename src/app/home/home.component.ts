import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetailsModalComponent } from './../details-modal/details-modal.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexService } from './../shared/services/pokedex.service';
import { FormsModule } from '@angular/forms';
import { PokemonListItem, PokemonApiResponse, PokemonInfos } from '../shared/models/models/pokemon.model';
import { Filter } from '../shared/models/models/filter.model';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DetailsModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public pokemons: PokemonListItem[] = [];
  public pokemonInfos: PokemonInfos[] = [];
  public pokeDomainValues?: PokemonInfos;
  public filter: Filter = new Filter();
  public loading: boolean = true;
  public BsModalRef?: BsModalRef;
  public itemsPerPage: number = 48;
  public currentPage: number = 1;
  public totalPokemons: number = 0;
  public totalPages: number = 0;
  public pages: Array<number> = [];
  public timeout: any;

  constructor(
    public pokedexService: PokedexService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getAllPokemons();
  }

  getAllPokemons(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.pokedexService.getPokemons(this.itemsPerPage, offset).subscribe((res: PokemonApiResponse) => {
      this.pokemons = res.results;
      this.totalPokemons = res.count;
      this.totalPages = Math.ceil(this.totalPokemons / this.itemsPerPage);
      this.pages = this.numberToArray(this.totalPages);
      this.loading = false;
    });
  }

  pageChange(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.getAllPokemons();
  }

  numberToArray(count: number) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }

  filterName() {
    if (this.filter.name.length > 0) {
      this.loading=true
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.pokedexService.getPokemons(10000, 0).subscribe(res => {
          this.pokemons = res.results.filter((x: any) => x.name.includes(this.filter.name.toLowerCase()));
          this.totalPokemons = this.pokemons.length;
          this.totalPages = Math.ceil(this.totalPokemons / this.itemsPerPage);
          this.pages = this.numberToArray(this.totalPages);
          this.loading = false;
        });
      }, 0)
    } else {
      this.pokemons = [];
      this.getAllPokemons();
    };
  }

  openModal(id: number) {
    this.pokedexService.getPokemonById(id).subscribe((res: PokemonInfos) => {
      this.pokeDomainValues = res;
      const initialState = { modalInfos: this.pokeDomainValues };
      this.BsModalRef = this.modalService.show(DetailsModalComponent, { initialState })
    });
  }


  

}
