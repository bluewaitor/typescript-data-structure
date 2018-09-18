import {LinkedList} from '../linked-list/LinkedList';

class Stack {
  linkedList: LinkedList;
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.tail;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.tail.value;
  }

  push(value) {
    this.linkedList.append(value);
  }

  pop() {
    const deleteTail = this.linkedList.deleteTail();
    return deleteTail ? deleteTail.value: null;
  }

  toArray() {
    return this.linkedList.toArray().map(linkedListNode => linkedListNode.value);
  }

  toString(callback?) {
    return this.linkedList.toString(callback);
  }
}

export default Stack;
