import LinkedList from '../linked-list/LinkedList';

// 默认数组大小
const defaultHashTableSize = 32;


class HashTable {
  buckets: Array<LinkedList>;
  keys: object;

  /**
   * 初始化
   * @param {number} hashTableSize
   */
  constructor(hashTableSize = defaultHashTableSize) {
    // 数组里面是单链表，解决哈希冲突
    this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
    this.keys = {}
  }

  /**
   * 将key哈希成数组对应的下标
   * @param {string} key
   * @returns {number}
   */
  hash(key: string) {
    const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)), 0)
    return hash % this.buckets.length;
  }

  /**
   * 设置 key,value
   * @param key
   * @param value
   */
  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({callback: nodeValue => nodeValue.key === key});

    if (!node) {
      bucketLinkedList.append({key, value});
    } else {
      node.value.value = value;
    }
  }

  /**
   * 根据key删除
   * @param key
   * @returns {any}
   */
  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({callback: nodeValue => nodeValue.key === key});

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  /**
   * 根据key获取值
   * @param key
   * @returns {undefined}
   */
  get(key) {
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({callback: nodeValue => nodeValue.key === key});
    return node ? node.value.value : undefined;
  }

  /**
   * key 是否存在
   * @param key
   * @returns {any}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * 获取所有的key
   * @returns {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }
}

export default HashTable;
