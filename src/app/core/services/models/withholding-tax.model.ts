import { Base } from "./base.model";

export class WithholdingTax extends Base {
    public accountingYears: string;
    public demandAssessed: string;
    public demandPaid: string;
    public comments: string;
    public actionPoint: string;
}