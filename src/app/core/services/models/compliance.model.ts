import { Base } from "./base.model";

export class Compliance extends Base {
    public country: string;
    public law: string;
    public authority: string;
    public returnStatement: string;
    public deadlineDate: string;
    public filingDate: string;
    public remarks: string;
}