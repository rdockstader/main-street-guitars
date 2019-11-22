import { Guitar } from './../../home/guitars/guitar.model';
import { GuitarService } from './../../home/guitars/guitar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-admin-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class AdminGuitarsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'make', 'model', 'subModel', 'price', 'addDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<Guitar>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private guitarService: GuitarService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.buildDatasource();
  }

  buildDatasource() {
    this.store.select(fromRoot.getGuitars).subscribe(guitars => {
      if (this.dataSource) {
        this.dataSource.data = guitars;
      } else {
        this.dataSource = new MatTableDataSource(guitars);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: string) {
    this.guitarService.removeGuitar(id);
    this.buildDatasource();
  }

}
