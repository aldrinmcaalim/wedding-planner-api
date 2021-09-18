export class MissingResourceError {
  message: string;
  description: string = "This error means a resource could not be located.";

  constructor(message: string) {
    this.message = message;
  }
}
export class ExpensesError {
  message: string;
  description: string =
    "This error means there are no expenses for this particular wedding at the moment.";

  constructor(message: string) {
    this.message = message;
  }
}
export class ConflictingIdentifications {
  message: string;
  description: string =
    "This error means there is a confliction with the ID entered";

  constructor(message: string) {
    this.message = message;
  }
}

export class WeddingExists {
  message: string;
  description: string =
    "This error means a client with this SSN already exists";

  constructor(message: string) {
    this.message = message;
  }
}
