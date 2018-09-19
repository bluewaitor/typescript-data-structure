import { Comparator } from "../../utils/comparator/Comparator";

export class Sort {
  callbacks: {
    compareCallback: Function;
    visitingCallback: Function;
  };
  comparator: Comparator;
  constructor(originalCallbacks) {
    this.callbacks = Sort.initSortingCallbacks(originalCallbacks);
    this.comparator = new Comparator(this.callbacks.compareCallback);
  }

  static initSortingCallbacks(originalCallbacks) {
    const callbacks = originalCallbacks || {};
    const stubCallback = () => {};

    callbacks.compareCallback = callbacks.compareCallback || undefined;
    callbacks.visitingCallback = callbacks.visitingCallback || stubCallback;

    return callbacks;
  }

  sort(array?) {
    throw new Error("sort method must be implemented");
  }
}
