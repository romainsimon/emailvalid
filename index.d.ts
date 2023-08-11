type EmailValidationOptions = {
  whitelist: Array<string>,
  blacklist: Array<string>,
  allowFreemail: boolean,
  allowDisposable: boolean
}

type ErrorKind = "invalid" | "disposable" | "freemail" | "blacklisted"

type CheckReturn = {
  email: string,
  domain: string,
  valid: boolean,
  errors: Array<ErrorKind>,
  typo?: string
}

declare class EmailValidation {
  constructor(options?: Partial<EmailValidationOptions>);
  check(email: string): CheckReturn;
  whitelist(domain: string): void;
  blacklist(domain: string): void;
  setOptions(options: Partial<EmailValidationOptions>): void;
}

export default EmailValidation;

