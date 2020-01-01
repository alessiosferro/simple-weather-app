import { NgModule } from "@angular/core";

import {
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

const materialModules = [MatInputModule, MatFormFieldModule];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}