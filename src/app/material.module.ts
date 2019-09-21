import { NgModule } from '@angular/core';

import { MatButtonModule,
             MatFormFieldModule,
             MatInputModule,
             MatDatepickerModule,
             MatNativeDateModule,
             MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ]
})
export class MaterialModule {}
