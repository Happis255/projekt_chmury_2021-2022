export interface IError {
  errorDescription?: string;
  errorCode?: string;
  system?: string;
}

export function isIErrorObject(object: any): boolean {
  return object instanceof Object
    && ("errorDescription" in object
    || "errorCode" in object
    || "system" in object);
}
