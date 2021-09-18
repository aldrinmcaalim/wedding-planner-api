export class Wedding {
  constructor(
    public weddingID: number,
    public weddingDate: string,
    public weddingLocation: string,
    public weddingName: string,
    public weddingBudget: number,
    public ssn: number
  ) {}
}

export class Expense {
  constructor(
    public expenseID: number,
    public expenseReason: string,
    public expenseAmount: number,
    public weddingID: number
  ) {}
}
