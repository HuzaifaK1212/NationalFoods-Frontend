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
import { BrandProtection, BrandProtectionProgress } from 'src/app/core/services/models/brand-protection.model';

@Component({
  selector: 'app-brand-protection-add',
  templateUrl: './brand-protection-add.component.html',
  styleUrls: ['./brand-protection-add.component.scss']
})
export class BrandProtectionAddComponent implements OnInit {

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  trademark: BrandProtection = new BrandProtection();
  currentDate = new Date();

  tryDoctype: any;

  comment: BrandProtectionProgress = new BrandProtectionProgress();
  commentList: BrandProtectionProgress[] = [];

  dataSource = new MatTableDataSource<BrandProtectionProgress>();

  enable: boolean = false;

  statusList = [
    { id: 1, key: 'active', name: 'Active' },
    { id: 2, key: 'expired', name: 'Expired' },
    { id: 3, key: 'discarded', name: 'Discarded' },
  ];

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

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private configService: ConfigService,
    private mappingService: MappingService,
    private uploadService: FileUploadService,
    private sanitizer: DomSanitizer
  ) { }

  trademarkForm = this._formBuilder.group({
    name: [this.trademark.name, Validators.compose([Validators.required])],
    year: [this.trademark.year, Validators.compose([Validators.required])],
    city: [this.trademark.city, Validators.compose([Validators.required])],
    brief: [this.trademark.brief, Validators.compose([Validators.required])],
  });

  commentForm = this._formBuilder.group({
    text: [this.comment.text, Validators.compose([])],
    userName: [this.comment.userName, Validators.compose([])]
  })

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.loadTrademarkViaId(+this._activatedRoute.snapshot.params['id']);
    }
    this.comment.userName = "Huzaifa Khatri";
    this.commentForm.controls['userName'].disable();
  }

  back() {
    this._router.navigate(["/brand-protections"]);
  }

  async loadTrademarkViaId(id: number) {
    this.commentList = [];
    this.dataSource = new MatTableDataSource(this.commentList);
    try {
      this.configService.getBrandProtectionViaId(id).subscribe((res: {}) => {
        if (res) {
          this.trademark = this.mappingService.mapBrandProtection(res);

          let tempList = [];
          if (this.trademark.progressList && this.trademark.progressList.length > 0) {
            this.commentList = this.trademark.progressList || null;
          }
          this.length = this.commentList.length || 0;
          this.dataSource = new MatTableDataSource(this.commentList);
          // let _type = this.function('png');
          // const blob = new Blob([this.trademark.imageOfArtwork], { type: _type });
          // let fileURL = URL.createObjectURL(blob);
          // this.tryDoctype = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          // // var blob = new Blob([this.trademark.imageOfArtwork], { type: 'image/png' });
          // // let fileURL = URL.createObjectURL(blob);
          // // this.tryDoctype = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          // console.log(this.tryDoctype)
        } else {
          console.log();
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async add() {
    try {
      this.configService.addBrandProtection(this.trademark).subscribe((res: {}) => {
        if (res) {
          this._router.navigate(["trademarks"]);
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
      if (this.trademarkForm.valid) {
        this.configService.updateBrandProtection(this.trademark).subscribe((res: {}) => {
          if (res) {
            this._router.navigate(['trademarks']);
          } else {
            alert('Failed to update record');
          }
        });
      } else {
        this.trademarkForm.markAllAsTouched();
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addComment() {
    if (this.commentForm.valid && this.comment.text && this.comment.text.length > 0) {
      this.comment.brandProtectionId = this.trademark.id;
      try {
        this.configService.addBrandProtectionProgress(this.comment).subscribe((res: {}) => {
          if (res) {
            this.trademarkForm.reset;
            this.commentForm.reset;
            this.comment = new BrandProtectionProgress();
            this.comment.userName = "Huzaifa Khatri"
            this.loadTrademarkViaId(this.trademark.id);
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

  fileUpload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }


  function(ext: any) {
    if (ext != undefined) {
      return this.extToMimes(ext);
    }
    return undefined;
  }

  extToMimes(ext: any) {
    let type = undefined;
    switch (ext) {
      case 'jpg':
      case 'png':
      case 'jpeg':
        type = 'image/jpeg'
        break;
      case 'txt':
        type = 'text/plain'
        break;
      case 'xls':
        type = 'application/vnd.ms-excel'
        break;
      case 'doc':
        type = 'application/msword'
        break;
      case 'xlsx':
        type = 'application/vnd.ms-excel'
        break;
      default:

    }
    return type;
  }

  print() {
    console.log(this.trademarkForm);
  }

}
