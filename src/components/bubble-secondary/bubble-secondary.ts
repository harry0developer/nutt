import { Component, Input } from '@angular/core';

@Component({
  selector: 'bubble-secondary',
  templateUrl: 'bubble-secondary.html'
})
export class BubbleSecondaryComponent {

  @Input() chatData: any;

  constructor() { }

}
