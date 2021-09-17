export class Wedding {
    constructor(
        public weddingId:number,
        public weddingDate:string,
        public weddingLocation:string,
        public weddingName:string,
        public weddingBudget: number
    ){}
}

export class Expenses {
    constructor (
        public expensesReason: string,
        public expensesAmount: number,
        public expensesId: number,
        public weddingId:number
    ){}
}