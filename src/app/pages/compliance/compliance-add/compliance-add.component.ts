import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigService } from 'src/app/core/services/config.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { MappingService } from 'src/app/core/services/mapping.service';
import { Compliance } from 'src/app/core/services/models/compliance.model';

@Component({
  selector: 'app-compliance-add',
  templateUrl: './compliance-add.component.html',
  styleUrls: ['./compliance-add.component.scss']
})
export class ComplianceAddComponent implements OnInit {

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  item: Compliance = new Compliance();
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
    "Tax Filing",
    "Financial Statement"
  ];

  authorityList = [
    "FBR",
    "SECP",
  ];

  occurrences = [];
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

  notifyDaysBeforeExpiry: number = 2;
  checked: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private mappingService: MappingService,
    private uploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) { }

  mainForm: FormGroup;

  ngOnInit(): void {
    
    this.id = this._activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.mainForm = this._formBuilder.group({
        country: [this.item.country, Validators.compose([Validators.required])],
        law: [this.item.law, Validators.compose([Validators.required])],
        authority: [this.item.authority, Validators.compose([Validators.required])],
        returnStatement: [this.item.returnStatement, Validators.compose([Validators.required])],
        deadlineDate: [this.item.deadlineDate, Validators.compose([Validators.required])],
        filingDate: [this.item.filingDate, Validators.compose([Validators.required])],
        remarks: [this.item.remarks, Validators.compose([Validators.required])],
        notifyDaysBeforeExpiry: [this.notifyDaysBeforeExpiry, Validators.compose([Validators.required])],
        checkbox: [this.checked, Validators.compose([Validators.required])]
      });
      this.loadViaId(+this._activatedRoute.snapshot.params['id']);
    } else {
      this.mainForm = this._formBuilder.group({
        country: [this.item.country, Validators.compose([Validators.required])],
        law: [this.item.law, Validators.compose([Validators.required])],
        authority: [this.item.authority, Validators.compose([Validators.required])],
        returnStatement: [this.item.returnStatement, Validators.compose([Validators.required])],
        deadlineDate: [this.item.deadlineDate, Validators.compose([Validators.required])],
        // filingDate: [this.item.filingDate, Validators.compose([Validators.required])],
        // remarks: [this.item.remarks, Validators.compose([Validators.required])],
        occurrence: [this.selectedOccurrence, Validators.compose([Validators.required])],
        notifyDaysBeforeExpiry: [this.notifyDaysBeforeExpiry, Validators.compose([Validators.required])],
        checkbox: [this.checked, Validators.compose([Validators.required])]
      });
      this.occurrences = [
        "One Time only",
        "Every Month",
        "Every Quarter",
        "Half-Yearly",
        "Yearly"
      ];
    }
  }

  back() {
    this._router.navigate(["/compliances"]);
  }

  async loadViaId(id: number) {
    try {
      this.configService.getComplianceViaId(id).subscribe((res: {}) => {
        if (res) {
          this.item = this.mappingService.mapCompliance(res);
          if (this.item.filingDate && this.item.remarks) {
            this.checked = true;
          }
        } else {
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async add() {
    try {
      this.configService.addCompliance(this.item).subscribe((res: {}) => {
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
        this.configService.UpdateCompliance(this.item).subscribe((res: {}) => {
          if (res) {
            this._router.navigate(['compliances']);
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

  downloadMyFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '..\..\..\..\assets\file\May Tax Filing.pdf');
    link.setAttribute('download', `May Tax Filing.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
}

}
