import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/core/services/config.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { BrandProtection } from 'src/app/core/services/models/brand-protection.model';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {

  // displayedColumns: string[] = [
  //   "select",
  //   'sNo',
  //   'name',
  //   'year',
  //   'city',
  //   'brief',
  //   'status'
  // ];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize = 10; // by default
  length: number = 0;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];
  clickedRows = new Set<any>();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  trademarks: any = [];

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
    // this.fetchBrandProtections();
    // this.displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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

  fetchBrandProtections() {
    this.trademarks = [];
    this.dataSource = new MatTableDataSource(this.trademarks);
    return this.configService.getBrandProtections().subscribe((res: any) => {
      let tempList = res || [];
      let tList = [];
      if (tempList && tempList.length > 0) {
        for (let i = 0; i < tempList.length; i++) {
          let tempItem = this.mappingService.mapBrandProtection(tempList[i]);
          tList.push(tempItem);
        }
        console.log(tList);
        this.trademarks = tList;
      } else {
        this.trademarks = [];
      }

      this.dataSource = new MatTableDataSource(this.trademarks);
      this.length = this.trademarks.length;
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

  onClick() {
    this.router.navigate(['/repo-sub-items']);
  }

  checkboxLabel(row?: BrandProtection): string {
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
            this.fetchBrandProtections();
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


