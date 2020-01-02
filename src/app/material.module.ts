import { NgModule } from "@angular/core";

import {
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
} from '@angular/material';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {}