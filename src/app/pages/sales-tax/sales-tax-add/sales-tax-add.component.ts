import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigService } from 'src/app/core/services/config.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { SalesTaxCase, SalesTaxComments } from 'src/app/core/services/models/sales-tax.model';

@Component({
  selector: 'app-sales-tax-add',
  templateUrl: './sales-tax-add.component.html',
  styleUrls: ['./sales-tax-add.component.scss']
})
export class SalesTaxAddComponent implements OnInit {

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  item: SalesTaxCase = new SalesTaxCase();
  currentDate = new Date();

  tryDoctype: any;

  enable: boolean = false;

  statusList = [
    { id: 1, key: 'active', name: 'Active' },
    { id: 2, key: 'expired', name: 'Expired' },
    { id: 3, key: 'discarded', name: 'Discarded' },
  ];


  countryList = [
    "Pakistan",
    "China",
    "Germany",
    "Australia",
    "India"
  ];

  lawList = [
    "First Law",
    "Second Law",
    "Third Law",
  ];

  authorityList = [
    "First Authority",
    "Second Authority",
    "Third Authority"
  ];

  occurrences = [
    "One Time only",
    "Every Month",
    "Every Quarter",
    "Half-Yearly",
    "Yearly"
  ];
  selectedOccurrence: string = "";
  displayedColumns = [
    'sNo',
    'username',
    'comment'
  ];
  pageSize = 10; // by default
  length: number = 0;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];
  id: any;

  comment: SalesTaxComments = new SalesTaxComments();
  commentList: SalesTaxComments[] = [];
  dataSource = new MatTableDataSource<SalesTaxComments>();
  
  commentForm = this._formBuilder.group({
    text: [this.comment.text, Validators.compose([])],
    userName: [this.comment.userName, Validators.compose([])]
  })

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private mappingService: MappingService,
    private uploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) { }

  mainForm = this._formBuilder.group({
    description: [this.item.description, Validators.compose([Validators.required])],
    taxYear: [this.item.taxYear, Validators.compose([Validators.required])],
    amountExposure: [this.item.amountExposure, Validators.compose([Validators.required])],
    provision: [this.item.provision, Validators.compose([Validators.required])],
    status: [this.item.status, Validators.compose([Validators.required])]
  });

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot['id'];
    if (this.id) {
      this.loadViaId(+this._activatedRoute.snapshot.params['id']);
    }
  }

  back() {
    this._router.navigate(["/sales-taxes"]);
  }

  async loadViaId(id: number) {
    this.commentList = [];
    this.dataSource = new MatTableDataSource(this.commentList);
    try {
      this.configService.getSalesTaxCasesViaId(id).subscribe((res: {}) => {
        if (res) {
          this.item = this.mappingService.mapSalesTaxCase(res);
        } else {
          console.log
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async add() {
    try {
      this.configService.addSalesTax(this.item).subscribe((res: {}) => {
        if (res) {
          this._router.navigate(["compliances"]);
        } else {
          alert("Failed to add record");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update() {
    try {
      if (this.mainForm.valid) {
        this.configService.updateTrademark(this.item).subscribe((res: {}) => {
          if (res) {
            this._router.navigate(['trademarks']);
          } else {
            alert('Failed to update record');
          }
        });
      } else {
        this.mainForm.markAllAsTouched();
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addComment() {
    if (this.commentForm.valid && this.comment.text && this.comment.text.length > 0) {
      this.comment.salesTaxCaseId = this.item.id;
      try {
        this.configService.addTrademarkComment(this.comment).subscribe((res: {}) => {
          if (res) {
            this.mainForm.reset;
            this.commentForm.reset;
            this.comment = new SalesTaxComments();
            this.loadViaId(this.item.id);
          } else {
            alert('Failed to add record');
          }
        });
      } catch (error) {
        console.error(error)
      }
    } else {
      alert('Cannot insert empty comment');
    }
  }
}
