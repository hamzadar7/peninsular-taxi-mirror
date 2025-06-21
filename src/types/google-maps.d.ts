
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    namespace places {
      class Autocomplete {
        constructor(
          inputField: HTMLInputElement,
          opts?: {
            componentRestrictions?: { country: string };
            fields?: string[];
          }
        );
      }
    }
  }
}

export {};
