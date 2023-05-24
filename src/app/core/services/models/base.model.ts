export class Base {
    public id: number;
    public createdBy: number;
    public createdOn: string | null;
    public updatedBy: number;
    public updatedOn: string | null;
    public active: boolean;
}

export class Status extends Base {
    public key: string;
    public name: string;
}