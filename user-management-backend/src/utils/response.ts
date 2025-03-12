export class SuccessResponse {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    this.status = status;
    this.data = data;
  }
}

export class ErrorResponse {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
