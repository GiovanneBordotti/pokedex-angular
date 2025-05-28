import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private url = environment.api;

  constructor(
    private httpClientService: HttpClient) { }

  getPokemons(limit: number, offset: number) {
    return this.httpClientService.get(`${this.url}pokemon?limit=${limit}&offset=${offset}`)
      .pipe(map((res: any) => { return res; }));
  }

  getPokemonById(id: number) {
    return this.httpClientService.get(`${this.url}pokemon/${id}/`)
      .pipe(map((res: any) => { return res; }));
  }

  getPokemonsByFilter(name: string) {
    return this.httpClientService.get(`${this.url}pokemon/${name}`)
      .pipe(map((res: any) => { return res; }));
  }
}
