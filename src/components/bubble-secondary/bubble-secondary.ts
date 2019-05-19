import { Component, Input } from '@angular/core';

/**
 * Generated class for the BubbleSecondaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bubble-secondary',
  templateUrl: 'bubble-secondary.html'
})
export class BubbleSecondaryComponent {

  @Input() chatData: any;

  constructor() {
    console.log(this.chatData);

  }

}
