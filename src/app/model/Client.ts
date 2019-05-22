export class Client {
    public get addedDate(): string {
        return this._addedDate;
    }
    public set addedDate(value: string) {
        this._addedDate = value;
    }

    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get businessId(): string {
        return this._businessId;
    }
    public set businessId(value: string) {
        this._businessId = value;
    }

    public get sharedKey(): string {
        return this._sharedKey;
    }
    public set sharedKey(value: string) {
        this._sharedKey = value;
    }

    constructor(
        private _sharedKey: string,
        private _businessId: string,
        private _email: string,
        private _phone: string,
        private _addedDate: string
    ) {
    }
}
