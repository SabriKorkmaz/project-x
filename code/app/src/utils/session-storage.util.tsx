export abstract class SessionStorageUtil {
  protected static storage = window.sessionStorage;

  static getItem(name: string): string | null {
    return this.storage.getItem(name);
  }

  static setItem(name: string, value: string): void {
    this.storage.setItem(name, value);
  }
}
