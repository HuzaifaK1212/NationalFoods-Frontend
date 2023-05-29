import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/core/services/config.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { SalesTaxCase } from 'src/app/core/services/models/sales-tax.model';

@Component({
  selector: 'app-sales-tax-list',
  templateUrl: './sales-tax-list.component.html',
  styleUrls: ['./sales-tax-list.component.scss']
})
export class SalesTaxListComponent implements OnInit {

  displayedColumns: string[] = [
    "select",
    'sNo',
    'description',
    'taxYear',
    'amountExposure',
    'provision',
    'status',
  ];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize = 10; // by default
  length: number = 0;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];

  dataList: any = [];

  constructor(
    private configService: ConfigService,
    private mappingService: MappingService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Create 100 users

    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
  }
  ngOnInit(): void {
    this.fetch();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetch() {
    this.dataList = [];
    this.dataSource = new MatTableDataSource(this.dataList);
    return this.configService.getSalesTaxCases().subscribe((res: any) => {
      let tempList = res || [];
      let tList = [];
      if (tempList && tempList.length > 0) {
        for (let i = 0; i < tempList.length; i++) {
          let tempItem = this.mappingService.mapSalesTaxCase(tempList[i]);
          tList.push(tempItem);
        }
        console.log(tList);
        this.dataList = tList;
      } else {
        this.dataList = [];
      }

      this.dataSource = new MatTableDataSource(this.dataList);
      this.length = this.dataList.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: SalesTaxCase): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+1}`;
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  onUpdate() {
    // this.id = +this.router.snapshot.paramMap.get('id');
    console.log("onUpdate this.selection", this.selection)
    if (this.selection.selected.length > 0) {
      let id = this.selection.selected[0].id;
      this.router.navigate(['edit/', id], { relativeTo: this.activatedRoute });
    }
  }

  async onDelete() {
    let id = this.selection.selected[0].id;
    if (id) {
      try {
        this.configService.deleteTrademark(id).subscribe((res: {}) => {
          if (res) {
            this.selection.clear();
            this.fetch();
          } else {
            alert('Failed to delete record');
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Error in selection. Invalid');
    }
  }

}
