import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PokemonInfos } from '../shared/models/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../shared/pipes/capitalize-first-letter.pipe';

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [
    CommonModule,
     CapitalizePipe,
  ],
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.scss'
})
export class DetailsModalComponent implements OnInit {
  public modalInfos?: PokemonInfos;
  public loading: boolean = true; 

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {}

  closeModal() {
    this.bsModalRef.hide();
  }

}