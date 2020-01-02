import { NgModule } from "@angular/core";

import {
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressBarModule,
} from '@angular/material';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressBarModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}