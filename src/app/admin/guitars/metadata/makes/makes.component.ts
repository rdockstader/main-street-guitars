import { Subscription } from 'rxjs';
import { MakesService } from './makes.service';
import { Make } from './make.model';
import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-makes',
  styleUrls: ['makes.component.css'],
  templateUrl: 'makes.component.html',
})
export class MakesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['makeID', 'value', 'addDate', 'delete'];
  dataSource: MatTableDataSource<Make>;
  makes: Make[] = [];

  makesSubscription: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private makesService: MakesService) {}

  private getMakes() {
    this.makes = this.makesService.getMakes();
    this.dataSource = new MatTableDataSource(this.makes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.makesSubscription = this.makesService.makesChanged.subscribe(() => {
      this.getMakes();
    });
    this.getMakes();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(makeID: number) {
    this.makesService.RemoveMake(makeID);
  }

  ngOnDestroy() {
    if (this.makesSubscription) {
      this.makesSubscription.unsubscribe();
    }
  }
}
