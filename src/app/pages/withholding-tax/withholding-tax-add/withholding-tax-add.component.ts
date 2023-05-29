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
import { WithholdingTax } from 'src/app/core/services/models/withholding-tax.model';

@Component({
  selector: 'app-withholding-tax-add',
  templateUrl: './withholding-tax-add.component.html',
  styleUrls: ['./withholding-tax-add.component.scss']
})
export class WithholdingTaxAddComponent implements OnInit {

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  item: WithholdingTax = new WithholdingTax();
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
  // selectedOccurrence: string = "";
  // displayedColumns = [
  //   'sNo',
  //   'username',
  //   'comment'
  // ];
  pageSize = 10; // by default
  length: number = 0;
  pageIndex = 0;
  pageSizeOptions = [10, 25, 50, 100];
  id: any;

  // comment: SalesTaxComments = new SalesTaxComments();
  // commentList: SalesTaxComments[] = [];
  // dataSource = new MatTableDataSource<SalesTaxComments>();
  
  // commentForm = this._formBuilder.group({
  //   text: [this.comment.text, Validators.compose([])],
  //   userName: [this.comment.userName, Validators.compose([])]
  // })

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
    accountingYears: [this.item.accountingYears, Validators.compose([Validators.required])],
    demandAssessed: [this.item.demandAssessed, Validators.compose([Validators.required])],
    demandPaid: [this.item.demandPaid, Validators.compose([Validators.required])],
    comments: [this.item.comments, Validators.compose([Validators.required])],
    actionPoint: [this.item.actionPoint, Validators.compose([Validators.required])]
  });

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.loadViaId(+this._activatedRoute.snapshot.params['id']);
    }
  }

  back() {
    this._router.navigate(["/withholding-taxes"]);
  }

  async loadViaId(id: number) {
    try {
      this.configService.getTrademarksViaId(id).subscribe((res: {}) => {
        if (res) {
          this.item = this.mappingService.mapWithholdingTax(res);
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
      this.configService.addTrademark(this.item).subscribe((res: {}) => {
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

}
