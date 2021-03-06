import { 
  Directive,
  HostListener, 
  ElementRef
 } from '@angular/core';

 import {
   NG_VALUE_ACCESSOR,
   ControlValueAccessor
 } from '@angular/forms';

@Directive({
  selector: '[Numero]',
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:NumeroDirective,
    multi:true
  }]
})
export class NumeroDirective implements ControlValueAccessor {

  onTouched:any;
  onChange:any;

  constructor(private el:ElementRef) { }

  @HostListener('keyup', ['$event'])
  onKeyUp($event: any) {
    let valor = $event.target.value;
    let posDecimais = valor.indexOf('.');

    valor = valor.replace(/[\D]/g, '');

    if (posDecimais > 0) {
      valor = valor.substr(0, posDecimais) + '.' + 
        valor.substr(posDecimais);
    }

    $event.target.value = valor;
    this.onChange(valor);
  }

  registerOnCahnge(fn:any):void{
    this.onChange = fn;
  }

  registerOnTouched(fn:any):void{
    this.onTouched = fn;
  }

  writeValue(value:any):void{
    this.el.nativeElement.value = value;
  }



}
