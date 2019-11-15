import { MakesService } from './makes.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { formatDate } from '@angular/common';
import { Make } from './make.model';

@Component({
  selector: 'app-makes',
  templateUrl: './makes.component.html',
  styleUrls: ['./makes.component.css']
})
export class MakesComponent implements OnInit {
  displayedColumns = ['value', 'Add Date', 'Delete'];
  makes: Make[] = [];
  makesDataSource = new MatTableDataSource<{modelId: string,
                                                                                    value: string,
                                                                                    addDate: Date,
                                                                                    delete: string}>();

  constructor(private makesService: MakesService) { }

  ngOnInit() {
    this.makes = this.makesService.getMakes();
    this.buildDatasource();
    this.makesService.makesChanged.subscribe(() => {
      this.makes = this.makesService.getMakes();
      this.buildDatasource();
    });
  }

  onSubmit() {
    console.log('submit called');
  }

  onDeleteModel(MakeID: number) {
    this.makesService.RemoveMake(MakeID);
  }

  private buildDatasource() {
    const rows = [];
    this.makes.forEach(make => {
      const row = {
        id: make.makeID,
        value: make.value,
        addDate: formatDate(make.addDate, 'shortDate', 'en-US'),
        delete: ''
      };
      rows.push(row);
    });
    console.log(rows);
    this.makesDataSource.data = rows;
  }

}
