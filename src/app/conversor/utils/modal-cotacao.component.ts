import { Component, Input, OnInit, Output } from '@angular/core';

import {ConversaoResponse, Conversao} from '../models/';
import {ConversorService} from '../services';

@Component({
  selector: 'modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.css']
})
export class ModalCotacaoComponent implements OnInit {

  @Input() id:string;
  @Input() conversaoResponse:ConversaoResponse;
  @Input() conversao:Conversao = new Conversao();
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private ConversorService:ConversorService) { }

  ngOnInit(): void {
  }

  novaConsulta(){
    this.onConfirm.emit();
  }

  get valorConvertido():string{
    if(this.conversaoResponse === undefined){
      return '0';
    }

    return (this.conversao.valor * this.conversaoResponse.rates[this.conversao.moedaPara]).toFixed(2);
  }

  get cotacaoPara():number{
    return this.ConversorService.cotacaoPara(this.conversaoResponse, this.conversao);
  }

  get cotacaoDe():string{
    return this.ConversorService.cotacaoDe(this.conversaoResponse, this.conversao);
  }

  get dataCotacao():string{
    return this.ConversorService.dataCotacao(this.conversaoResponse);
  }

}
