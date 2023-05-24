import { Base, Status } from "./base.model";

export class Trademark extends Base {
    public titleOfArtwork: string;
    public imageOfArtwork: string;
    public registrationNo: string;
    public dateOfApplication: string | null;
    public nameOfApplicant: string;
    public dateOfExpiry: string | null;
    public statusId: number;
    public status: Status | null = new Status();
    public notifyDaysBeforeExpiry: string;

    public commentList: TrademarkComment[] = [];
}

export class TrademarkComment extends Base {
    public text: string;
    public userName: string;
    public trademarkId: number;
}