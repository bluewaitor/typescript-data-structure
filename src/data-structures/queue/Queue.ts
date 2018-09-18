import {LinkedList} from "../linked-list/LinkedList";

class Queue {
  linkedList: LinkedList;
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.tail;
  }

  peek() {
    if (!this.linkedList.head) {
      return null;
    }
    return this.linkedList.head.value;
  }

  enqueue(value) {
    this.linkedList.append(value);
  }

  dequeue() {
    const deleteHead = this.linkedList.deleteHead();
    return deleteHead ? deleteHead.value: null;
  }

  toString(callback?) {
    return this.linkedList.toString(callback);
  }
}

export default Queue;
