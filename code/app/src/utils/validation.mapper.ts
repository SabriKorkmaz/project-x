export abstract class ValidationMapper {
  protected static storage = window.sessionStorage;

  static keyValidation(obj: any): any {
    let isValid = true;
    Object.keys(obj).forEach((key) => {
      if (key !== "id" && (obj[key] === "" || obj[key] === 0)) {
        isValid = false;
      }
    });
    return isValid;
  }

  static setItem(name: string, value: string): void {
    this.storage.setItem(name, value);
  }

  static clear(): void {
    this.storage.clear();
  }
}
