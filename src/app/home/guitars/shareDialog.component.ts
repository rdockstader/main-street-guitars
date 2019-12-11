import { FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-share-dialog',
  template: `<h1 mat-dialog-title> {{ title }}</h1>
             <mat-dialog-content>
               <form>
                 <mat-form-field>
                   <input
                        type="email"
                        placeholder="Your friends email"
                        matInput
                        ngModel
                        name="email"
                        email
                    >
                 </mat-form-field>
               </form>
             </mat-dialog-content>
             <mat-dialog-actions>
               <button mat-raised-button [mat-dialog-close]="true" color="primary">Send</button>
               <button mat-raised-button [mat-dialog-close]="false" color="warn">Close</button>
             </mat-dialog-actions>`
})
export class ShareDialogComponent implements OnInit {
  title = 'Sharing a guitar';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.guitar != null) {
      this.title = 'Shaing the ' + this.data.guitar.model + ' ' + this.data.guitar.make;
    }
  }

}
