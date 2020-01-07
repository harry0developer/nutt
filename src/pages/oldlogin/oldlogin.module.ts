import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OldloginPage } from './oldlogin';

@NgModule({
  declarations: [
    OldloginPage,
  ],
  imports: [
    IonicPageModule.forChild(OldloginPage),
  ],
})
export class OldloginPageModule {}
