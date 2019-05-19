import { Component } from '@angular/core';

@Component({
  selector: 'bubble-primary',
  templateUrl: 'bubble-primary.html'
})
export class BubblePrimaryComponent {

  text: string;

  constructor() {
    console.log('Hello BubblePrimaryComponent Component');
    this.text = 'Hello World';
  }

}
