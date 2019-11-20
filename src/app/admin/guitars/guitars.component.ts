import { Guitar } from './../../guitars/guitar.model';
import { GuitarService } from './../../guitars/guitar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class AdminGuitarsComponent implements OnInit {
  showAddGuitar = false;
  guitars: Guitar[] = [];
  displayedColumns: string[] = ['id', 'make', 'model', 'subModel', 'price', 'addDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<Guitar>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private guitarService: GuitarService) { }

  ngOnInit() {
    this.guitarService.guitarsChanged.subscribe(() => {
      this.getGuitars();
    });
    this.getGuitars();
  }

  getGuitars() {
    this.guitars = this.guitarService.getGuitars();
    this.dataSource = new MatTableDataSource(this.guitars);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(id: string) {
    console.log(id);
  }

  onDelete(id: string) {
    this.guitarService.removeGuitar(id);
  }

  toggleAddGuitar() {
    this.showAddGuitar = (this.showAddGuitar) ? false : true;
  }

}
