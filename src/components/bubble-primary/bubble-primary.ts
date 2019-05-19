import { Component, Input } from '@angular/core';

@Component({
  selector: 'bubble-primary',
  templateUrl: 'bubble-primary.html'
})
export class BubblePrimaryComponent {

  @Input() chatData: any;

  constructor() { }

}
