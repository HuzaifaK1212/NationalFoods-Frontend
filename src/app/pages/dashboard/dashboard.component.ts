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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart: any;
	
  chartOptions = {
    title:{
      text: "Contracts"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: ""
    },
    data: [{
      type: "pie",
      indexLabel: "{y}",
      yValueFormatString: "",
      dataPoints: [
        { label: "Active", y: 20 },
        { label: "New", y: 15 },
        { label: "Expiry", y: 10 }
      ]
    }]
  }

  chartOptions1 = {
    title:{
      text: "Cases"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      suffix: ""
    },
    data: [{
      type: "pie",
      indexLabel: "{y}",
      yValueFormatString: "",
      dataPoints: [
        { label: "Closed", y: 25 },
        { label: "Litigation", y: 20 },
        { label: "Settlement", y: 18 },
        { label: "Negotiation", y: 15 },
      ]
    }]
  }

  chartOptionsDept = {
    title:{
      text: "Departments"
    },
    animationEnabled: true,
    data: [{
      type: "column",
      dataPoints: [
        { label: "Admin", y: 10 },
        { label: "Compliance", y: 11 },
        { label: "Finance", y: 15 },
        { label: "HR", y: 17 },
        { label: "IT", y: 25 },
        { label: "Logistics", y: 6 },
        { label: "Operations", y: 17 },
        { label: "Procurement", y: 18 },
      ]
    }]
  }


  displayedColumns: string[] = [
    'sNo',
    'item',
    'date',
  ];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSize = 10; // by default
  length: number = 0;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];

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
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.length = ELEMENT_DATA.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  onView()
  {
    var blobURL = "/src/assets/file/May Tax Filing.pdf"
    window.open(blobURL);

  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'National Chilli Garlic Sauce', date: '12-Jun-2025'},
  {position: 2, name: 'National Tomato Ketchup', date: '12-Jun-2025'},
  {position: 3, name: 'National Garlic Mayo', date: '12-Jun-2025'},
  {position: 4, name: 'General Litigation', date: '17-05-2023'},
  {position: 5, name: 'HR Litigation', date: '18-05-2023'},
  {position: 6, name: 'National Biryani Masala', date: '01-Jun-2023'},
  {position: 7, name: 'National Chat Masala', date: '12-Jun-2025'},
  {position: 8, name: 'National Chat Masala', date: '12-Jun-2025'},
  {position: 9, name: 'National Chicken Broast Mix', date: '05-Jul-2025'},
  {position: 10, name: 'National Chat Masala', date: '12-Jun-2025'},
  {position: 11, name: 'Vendor Contract', date: '12-Jul-2023'},
  {position: 10, name: 'Legal Contract', date: '12-Jul-2023'},
];

