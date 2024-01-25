export interface ErrorValidate {
  code: string;
  object?: string;
  attribute?: string;
  value?: any;
  [extras: string]: any;
}
