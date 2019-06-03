export class Client {

    constructor(
        public sharedKey: string,
        public businessId: string,
        public email: string,
        public phone: string,
        public addedDate: string,
        public lastModifiedDate: string
    ) {
    }
}
