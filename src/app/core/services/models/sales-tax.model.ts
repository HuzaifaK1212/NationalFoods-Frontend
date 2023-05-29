import { Base } from "./base.model";

export class SalesTaxCase extends Base{
    public description: string;
    public taxYear: string;
    public amountExposure: string;
    public provision: string;
    public status: string;
}

export class SalesTaxComments extends Base {
    public text: string;
    public userName: string;
    public salesTaxCaseId: number;
    public salesTaxCase: SalesTaxCase = new SalesTaxCase();
}