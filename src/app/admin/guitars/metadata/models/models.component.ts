import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ModelsService } from './models.service';
import { Model } from './model.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import * as fromRoot from '../../../../app.reducer';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['modelID', 'value', 'addDate', 'delete'];
  dataSource: MatTableDataSource<Model>;

  modelSubscription: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modelsService: ModelsService,
              private store: Store<fromRoot.State>) {}

  private getModels() {
    this.modelsService.FetchModels();
    this.store.select(fromRoot.getModels).subscribe(models => {
      this.dataSource = new MatTableDataSource(models);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  ngOnInit() {
    this.modelsService.FetchModels();
    this.getModels();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(modelID: string) {
    this.modelsService.RemoveModel(modelID);
    this.getModels();
  }

  ngOnDestroy() {
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }
}
