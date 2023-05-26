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
import { Trademark, TrademarkComment } from 'src/app/core/services/models/trademark.model';


@Component({
  selector: 'app-trademark-add',
  templateUrl: './trademark-add.component.html',
  styleUrls: ['./trademark-add.component.scss']
})
export class TrademarkAddComponent implements OnInit {

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  trademark: Trademark = new Trademark();
  currentDate = new Date();

  tryDoctype: any;

  comment: TrademarkComment = new TrademarkComment();
  commentList: TrademarkComment[] = [];

  dataSource = new MatTableDataSource<TrademarkComment>();

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
    titleOfArtwork: [this.trademark.titleOfArtwork, Validators.compose([Validators.required])],
    registrationNo: [this.trademark.registrationNo, Validators.compose([Validators.required])],
    dateOfApplication: [this.trademark.dateOfApplication, Validators.compose([Validators.required])],
    nameOfApplicant: [this.trademark.nameOfApplicant, Validators.compose([Validators.required])],
    dateOfExpiry: [this.trademark.dateOfExpiry, Validators.compose([Validators.required])],
    notifyDaysBeforeExpiry: [this.trademark.notifyDaysBeforeExpiry, Validators.compose([Validators.required])]
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
    this._router.navigate([".."]);
  }

  async loadTrademarkViaId(id: number) {
    this.commentList = [];
    this.dataSource = new MatTableDataSource(this.commentList);
    try {
      this.configService.getTrademarksViaId(id).subscribe((res: {}) => {
        if (res) {
          this.trademark = this.mappingService.mapTrademark(res);

          let tempList = [];
          if (this.trademark.commentList && this.trademark.commentList.length > 0) {
            this.commentList = this.trademark.commentList || null;
          }
          this.length = this.commentList.length || 0;
          this.dataSource = new MatTableDataSource(this.commentList);
          console.log(this.dataSource)
          // let _type = this.function('png');
          // const blob = new Blob([this.trademark.imageOfArtwork], { type: _type });
          // let fileURL = URL.createObjectURL(blob);
          // this.tryDoctype = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          // // var blob = new Blob([this.trademark.imageOfArtwork], { type: 'image/png' });
          // // let fileURL = URL.createObjectURL(blob);
          // // this.tryDoctype = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
          // console.log(this.tryDoctype)
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
      this.configService.addTrademark(this.trademark).subscribe((res: {}) => {
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
        this.configService.updateTrademark(this.trademark).subscribe((res: {}) => {
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
      this.comment.trademarkId = this.trademark.id;
      try {
        this.configService.addTrademarkComment(this.comment).subscribe((res: {}) => {
          if (res) {
            this.trademarkForm.reset;
            this.commentForm.reset;
            this.comment = new TrademarkComment();
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

  fetchPhotoURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.trademark.imageOfArtwork);
  }

}
 