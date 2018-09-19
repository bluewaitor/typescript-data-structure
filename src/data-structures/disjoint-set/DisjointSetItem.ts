export class DisjointSetItem {
  value: any;
  keyCallBack: Function;
  parent: DisjointSetItem;
  children: object;

  /**
   * 构造函数
   * @param value
   * @param keyCallback
   */
  constructor(value, keyCallback = null) {
    this.value = value;
    this.keyCallBack = keyCallback;

    this.parent = null;
    this.children = {};
  }

  getKey() {
    if (this.keyCallBack) {
      return this.keyCallBack(this.value);
    }
    // 使用 value 当作 key
    return this.value;
  }

  isRoot() {
    return this.parent === null;
  }

  getRoot() {
    return this.isRoot() ? this : this.parent.getRoot();
  }

  getChildren() {
    // @ts-ignore
    return Object.values(this.children);
  }

  getRank() {
    if (this.getChildren().length === 0) {
      return 0;
    }
    let rank = 0;

    this.getChildren().forEach(child => {
      rank += 1;
      rank += child.getRank();
    });

    return rank;
  }

  setParent(parentItem: DisjointSetItem, forceSettingParentChild = true) {
    this.parent = parentItem;
    if (forceSettingParentChild) {
      parentItem.addChild(this);
    }

    return this;
  }

  addChild(childItem: DisjointSetItem) {
    this.children[childItem.getKey()] = childItem;
    childItem.setParent(this, false);

    return this;
  }
}
