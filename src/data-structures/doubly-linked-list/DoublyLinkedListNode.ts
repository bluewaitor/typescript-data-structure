export class DoublyLinkedListNode {
  value: any;
  next: DoublyLinkedListNode;
  previous: DoublyLinkedListNode;
  constructor(value, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString(callback?) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}