import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }
}
