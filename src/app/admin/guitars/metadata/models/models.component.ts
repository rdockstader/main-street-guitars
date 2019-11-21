import { MakesService } from './../makes/makes.service';
import { ModelsService } from './models.service';
import { Model } from './model.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Make } from '../makes/make.model';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  displayedColumns: string[] = ['modelID', 'value', 'addDate', 'delete'];
  dataSource: MatTableDataSource<Model>;
  models: Model[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private modelsService: ModelsService) {}

  private getModels() {
    this.models = this.modelsService.getModels();
    this.dataSource = new MatTableDataSource(this.models);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit() {
    this.modelsService.modelsChanged.subscribe(() => {
      this.getModels();
    });
    this.getModels();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(modelID: number) {
    this.modelsService.RemoveModel(modelID);
  }
}
