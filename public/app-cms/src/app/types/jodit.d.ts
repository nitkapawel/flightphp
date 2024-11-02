declare module 'jodit/es2021/jodit' {
  export class Jodit {
    static make(element: HTMLElement, options?: any): Jodit;
    value: string;
    selection: {
      insertImage: (url: string) => void;
    };
    // Add other methods/properties you need
  }
}