import { DatePipe } from "@angular/common";
import { Trademark, TrademarkComment } from "./models/trademark.model";
import { Status } from "./models/base.model";
import { Injectable } from "@angular/core";
import { BrandProtection, BrandProtectionProgress } from "./models/brand-protection.model";

@Injectable({
    providedIn: 'root',
})
export class MappingService {

    constructor(
        private datePipe: DatePipe
    ) { }

    public mapTrademark(res: any): Trademark {
        const resData = res ? res : null
        const isTrademark = new Trademark();
        if (resData) {
            isTrademark.id = resData.id || null;
            isTrademark.createdOn = resData.createdOn || null;
            isTrademark.createdBy = resData.createdBy || null;
            isTrademark.updatedBy = resData.updatedBy || null;
            isTrademark.updatedOn = resData.updatedOn || null;
            isTrademark.active = resData.active || null;
            isTrademark.titleOfArtwork = resData.titleOfArtwork || null;
            isTrademark.imageOfArtwork = resData.imageOfArtwork || null;
            isTrademark.registrationNo = resData.registrationNo || null;
            isTrademark.dateOfApplication = resData.dateOfApplication || null;
            isTrademark.nameOfApplicant = resData.nameOfApplicant || null;
            isTrademark.dateOfExpiry = resData.dateOfExpiry || null;
            isTrademark.statusId = resData.statusId || null;
            isTrademark.status = resData.statusId && resData.status ? this.mapStatus(resData.status) : null;
            isTrademark.notifyDaysBeforeExpiry = resData.notifyDaysBeforeExpiry || null;

            if (resData.commentList && resData.commentList.length > 0) {
                let tempList = [];
                for (let i = 0; i < resData.commentList.length; i++) {
                    let temp = this.mapComment(resData.commentList[i]);
                    tempList.push(temp);
                }

                isTrademark.commentList = tempList;
            }
        }

        return isTrademark;
    }

    public mapBrandProtection(res: any): BrandProtection {
        const resData = res ? res : null;
        const isBrandProtection = new BrandProtection();
        if (resData) {
            isBrandProtection.id = resData.id || null;
            isBrandProtection.createdOn = resData.createdOn ? this.datePipe.transform(resData.createdOn, 'yyyy-MMM-dd') : null;
            isBrandProtection.createdBy = resData.createdBy || null;
            isBrandProtection.updatedBy = resData.updatedBy || null;
            isBrandProtection.updatedOn = resData.updatedOn ? this.datePipe.transform(resData.updatedOn, 'yyyy-MMM-dd') : null;
            isBrandProtection.active = resData.active || null;
            isBrandProtection.name = resData.name || null;
            isBrandProtection.year = resData.year || null;
            isBrandProtection.city = resData.city || null;
            isBrandProtection.brief = resData.brief || null;
            isBrandProtection.statusId = resData.statusId || null;
            isBrandProtection.status = resData.statusId && resData.status ? this.mapStatus(resData.status) : null;
            
            if (resData.progressList && resData.progressList.length > 0) {
                let tempList = [];
                for (let i = 0; i < resData.progressList.length; i++) {
                    let temp = this.mapProgress(resData.progressList[i]);
                    tempList.push(temp);
                }

                isBrandProtection.progressList = tempList;
            }
        }

        return isBrandProtection;
    }

    public mapStatus(res: any): Status {
        const resData = res ? res : null;
        const isStatus = new Status();
        if (resData) {
            isStatus.id = resData.id || null;
            isStatus.createdOn = resData.createdOn ? this.datePipe.transform(resData.createdOn, 'yyyy-MMM-dd') : null;
            isStatus.createdBy = resData.createdBy || null;
            isStatus.updatedBy = resData.updatedBy || null;
            isStatus.updatedOn = resData.updatedOn ? this.datePipe.transform(resData.updatedOn, 'yyyy-MMM-dd') : null;
            isStatus.active = resData.active || null;
            isStatus.key = resData.key || null;
            isStatus.name = resData.name || null;
        }
        return isStatus;
    }

    public mapComment(res: any): TrademarkComment {
        const resData = res ? res : null;
        const isComment = new TrademarkComment();
        if (resData) {
            isComment.id = resData.id || null;
            isComment.createdOn = resData.createdOn ? this.datePipe.transform(resData.createdOn, 'yyyy-MMM-dd') : null;
            isComment.createdBy = resData.createdBy || null;
            isComment.updatedBy = resData.updatedBy || null;
            isComment.updatedOn = resData.updatedOn ? this.datePipe.transform(resData.updatedOn, 'yyyy-MMM-dd') : null;
            isComment.active = resData.active || null;
            isComment.text = resData.text || null;
            isComment.userName = resData.userName || null;
        }
        return isComment;
    }

    public mapProgress(res: any): BrandProtectionProgress {
        const resData = res ? res : null;
        const isProgress = new BrandProtectionProgress();
        if (resData) {
            isProgress.id = resData.id || null;
            isProgress.createdOn = resData.createdOn ? this.datePipe.transform(resData.createdOn, 'yyyy-MMM-dd') : null;
            isProgress.createdBy = resData.createdBy || null;
            isProgress.updatedBy = resData.updatedBy || null;
            isProgress.updatedOn = resData.updatedOn ? this.datePipe.transform(resData.updatedOn, 'yyyy-MMM-dd') : null;
            isProgress.active = resData.active || null;
            isProgress.text = resData.text || null;
            isProgress.userName = resData.userName || null;
        }
        return isProgress;
    }
}