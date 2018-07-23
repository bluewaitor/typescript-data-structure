import Comparator from '../../utils/comparator/Comparator';

class MinHeap {
  heapContainer: Array<any>;
  compare: Comparator;
  constructor(compareFunction?) {
    this.heapContainer = [];
    this.compare = new Comparator(compareFunction);
  }

  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    const temp = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = temp;
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    return this.heapContainer[0];
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  remove(item, customFindingComparator?) {
    const customComparator = customFindingComparator || this.compare;
    const indicesToRemove = this.find(item, customComparator);
    const numberOfItemsToRemove = indicesToRemove.length;
    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      const indexToRemove = this.find(item, customComparator).pop();
      if (indexToRemove === (this.heapContainer.length - 1)) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();

        const parentItem = this.hasParent(indexToRemove) ? this.parent(indexToRemove) : null;
        const leftChild = this.hasLeftChild(indexToRemove) ? this.leftChild(indexToRemove) : null;

        if (leftChild !== null && (parentItem === null || this.compare.lessThan(parentItem, this.heapContainer[indexToRemove]))) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  find(item, customComparator?) {
    const foundItemindices = [];
    const comparator = customComparator || this.compare;

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemindices.push(itemIndex);
      }
    }

    return foundItemindices;
  }

  heapifyDown(customStartIndex?) {
    let currentIndex = customStartIndex || 0;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (this.hasRightChild(currentIndex) && this.compare.lessThan(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (this.compare.lessThan(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  heapifyUp(customStartIndex?) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while(this.hasParent(currentIndex) && this.compare.lessThan(this.heapContainer[currentIndex], this.parent(currentIndex))) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }
}

export default MinHeap;