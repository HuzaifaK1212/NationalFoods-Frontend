import { Base, Status } from "./base.model";

export class BrandProtection extends Base {
    public name: string;
    public year: string;
    public city: string;
    public brief: string;
    public statusId: number;
    public status: Status | null = new Status();

    public progressList: BrandProtectionProgress[] = []; 
}

export class BrandProtectionProgress extends Base {
    public text: string;
    public userName: string;
    public brandProtectionId: number;
}