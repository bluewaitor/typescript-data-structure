import Sort from '../Sort';
import MinHeap from '../../../data-structures/heap/MinHeap';

export default class HeapSort extends Sort {
  sort(originalArray) {
    const sortedArray = [];

    const minHeap = new MinHeap(this.callbacks.compareCallback);

    originalArray.forEach((element) => {
      this.callbacks.visitingCallback(element);

      minHeap.add(element);
    });

    while(!minHeap.isEmpty()) {
      const nextMinElement = minHeap.poll();

      this.callbacks.visitingCallback(nextMinElement);

      sortedArray.push(nextMinElement);
    }

    return sortedArray;
  }
}