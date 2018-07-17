import LinkedListNode from "./LinkedListNode";
import Comparator from "../../utils/comparator/Comparator";

class LinkedList {
  head: LinkedListNode;
  tail: LinkedListNode;
  compare: Comparator;
  constructor(comparatorFunction?) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  /**
   * 在前面添加一个节点
   * @param value
   */
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }

  /**
   * 在后面添加一个节点
   * @param value
   */
  append(value) {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  /**
   * 删除节点
   * @param value
   */
  delete(value) {
    if (!this.head) {
      return null;
    }

    let deleteNode = null;

    // 删除头部
    while (this.head && this.compare.equal(this.head.value, value)) {
      deleteNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    // 删除中间节点
    if (currentNode != null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deleteNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    // 删除尾部
    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deleteNode;
  }

  /**
   * 查找，返回找到的节点
   * @param {Object} findParams
   * @param {*} findParams.value 
   * @param {function} [findParams.callback] 根据callback的值返回查找结果
   * @param {LinkedListNode}
   */
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

  /**
   * 删除尾节点
   */
  deleteTail() {
    // 如果只有一个节点
    if (this.head === this.tail) {
      const deleteTail = this.tail;
      this.head = null;
      this.tail = null;

      return deleteTail;
    }

    const deleteTail = this.tail;

    let currentNode = this.head;
    while (currentNode.next) {
      // 如果当前节点的下一个是最后一个节点，那么就删除下一个节点
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deleteTail;
  }

  /**
   * 删除头节点
   */
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deleteHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deleteHead;
  }

  /**
   * 转换为数组
   */
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  /**
   * 转换为字符串
   * @param callback 
   */
  toString(callback?) {
    return this.toArray()
      .map(node => node.toString(callback))
      .toString();
  }
}

export default LinkedList;
