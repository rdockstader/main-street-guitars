import { NgModule } from '@angular/core';

import { MatButtonModule,
             MatFormFieldModule,
             MatInputModule,
             MatDatepickerModule,
             MatNativeDateModule,
             MatCheckboxModule,
             MatSidenavModule,
             MatToolbarModule,
             MatIconModule,
             MatListModule
} from '@angular/material';

@NgModule({
  imports: [
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ]
})
export class MaterialModule {}
