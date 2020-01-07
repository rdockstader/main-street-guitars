import { Store } from '@ngrx/store';
import { MakesService } from './makes.service';
import { Make } from './make.model';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import * as fromRoot from '../../../../app.reducer';

@Component({
  selector: 'app-makes',
  styleUrls: ['makes.component.css'],
  templateUrl: 'makes.component.html',
})
export class MakesComponent implements OnInit {
  displayedColumns: string[] = ['makeID', 'value', 'addDate', 'delete'];
  dataSource: MatTableDataSource<Make>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private makesService: MakesService, private store: Store<fromRoot.State>) {}

  private getMakes() {
    this.makesService.FetchMakes();
    this.store.select(fromRoot.getMakes).subscribe(makes => {
      this.dataSource = new MatTableDataSource(makes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.getMakes();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(makeID: string) {
    this.makesService.RemoveMake(makeID);
    this.getMakes();
  }
}
