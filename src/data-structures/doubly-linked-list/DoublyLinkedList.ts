import { Comparator } from "../../utils/comparator/Comparator";
import { DoublyLinkedListNode } from "./DoublyLinkedListNode";

export class DoublyLinkedList {
  head: DoublyLinkedListNode;
  tail: DoublyLinkedListNode;
  compare: Comparator;

  constructor(comparatorFunction?) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head);
    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new DoublyLinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    newNode.previous = this.tail;
    this.tail = newNode;

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deleteNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        deleteNode = currentNode;

        if (deleteNode === this.head) {
          this.head = deleteNode.next;

          if (this.head) {
            this.head.previous = null;
          }

          if (deleteNode === this.tail) {
            this.tail = null;
          }
        } else if (deleteNode === this.tail) {
          this.tail = deleteNode.previous;
          this.tail.next = null;
        } else {
          const previousNode = deleteNode.previous;
          const nextNode = deleteNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deleteNode;
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deleteHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleteHead;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }

    if (this.head === this.tail) {
      const deleteTail = this.tail;

      this.head = null;
      this.tail = null;

      return deleteTail;
    }

    const deleteTail = this.tail;

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deleteTail;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback?) {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString();
  }
}
