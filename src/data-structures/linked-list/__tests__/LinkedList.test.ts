import { LinkedList } from "../LinkedList";

describe("LinkedList", () => {
  test("should create empty linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList.toString()).toBe("");
  });

  test("should append node to linked list", () => {
    const linkedList = new LinkedList();
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.toString()).toBe("1,2");
  });

  test("should prepend node to linked list", () => {
    const linkedList = new LinkedList();

    linkedList.prepend(2);
    expect(linkedList.head.toString()).toBe("2");
    expect(linkedList.tail.toString()).toBe("2");

    linkedList.append(1);
    linkedList.prepend(3);

    expect(linkedList.toString()).toBe("3,2,1");
  });

  test("should delete node by value from linked list", () => {
    const linkedList = new LinkedList();

    expect(linkedList.delete(5)).toBeNull();

    linkedList.append(1);
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    expect(linkedList.head.toString()).toBe("1");
    expect(linkedList.tail.toString()).toBe("5");

    const deleteNode = linkedList.delete(3);
    expect(deleteNode.value).toBe(3);
    expect(linkedList.toString()).toBe("1,1,2,4,5");

    linkedList.delete(1);
    expect(linkedList.toString()).toBe("2,4,5");
    expect(linkedList.head.toString()).toBe("2");
    expect(linkedList.tail.toString()).toBe("5");

    linkedList.delete(5);
    expect(linkedList.toString()).toBe("2,4");
    expect(linkedList.head.toString()).toBe("2");
    expect(linkedList.tail.toString()).toBe("4");

    linkedList.delete(4);
    expect(linkedList.toString()).toBe("2");
    expect(linkedList.head.toString()).toBe("2");
    expect(linkedList.tail.toString()).toBe("2");

    linkedList.delete(2);
    expect(linkedList.toString()).toBe("");
  });

  test("should delete linked list tail", () => {
    const linkedList = new LinkedList();
    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.head.toString()).toBe("1");
    expect(linkedList.tail.toString()).toBe("3");

    const deleteNode1 = linkedList.deleteTail();
    expect(deleteNode1.value).toBe(3);
    expect(linkedList.toString()).toBe("1,2");
    expect(linkedList.head.toString()).toBe("1");
    expect(linkedList.tail.toString()).toBe("2");

    const deleteNode2 = linkedList.deleteTail();
    expect(deleteNode2.value).toBe(2);
    expect(linkedList.toString()).toBe("1");
    expect(linkedList.head.toString()).toBe("1");
    expect(linkedList.tail.toString()).toBe("1");

    const deleteNode3 = linkedList.deleteTail();
    expect(deleteNode3.value).toBe(1);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test("should delete linked list head", () => {
    const linkedList = new LinkedList();

    expect(linkedList.deleteHead()).toBeNull();

    linkedList.append(1);
    linkedList.append(2);

    expect(linkedList.head.toString()).toBe("1");
    expect(linkedList.tail.toString()).toBe("2");

    const deleteNode1 = linkedList.deleteHead();
    expect(deleteNode1.value).toBe(1);
    expect(linkedList.toString()).toBe("2");
    expect(linkedList.head.toString()).toBe("2");
    expect(linkedList.tail.toString()).toBe("2");

    const deleteNode2 = linkedList.deleteHead();
    expect(deleteNode2.value).toBe(2);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test("should be possible to store objects in the list and to print them out", () => {
    const linkedList = new LinkedList();

    const nodeValue1 = { value: 1, key: "key1" };
    const nodeValue2 = { value: 2, key: "key2" };

    linkedList.append(nodeValue1).prepend(nodeValue2);

    const nodeStringifier = value => `${value.key}:${value.value}`;

    expect(linkedList.toString()).toBe("[object Object],[object Object]");
    expect(linkedList.toString(nodeStringifier)).toBe("key2:2,key1:1");
  });

  test("should find node by value", () => {
    const linkedList = new LinkedList();

    expect(linkedList.find({ value: 5 })).toBeNull();

    linkedList.append(1);
    expect(linkedList.find({ value: 1 })).toBeDefined();

    linkedList.append(2).append(3);

    const node = linkedList.find({ value: 2 });

    expect(node.value).toBe(2);
    expect(linkedList.find({ value: 5 })).toBeNull();
  });

  test("should find node by callback", () => {
    const linkedList = new LinkedList();

    linkedList
      .append({ value: 1, key: "test1" })
      .append({ value: 2, key: "test2" })
      .append({ value: 3, key: "test3" });

    const node = linkedList.find({ callback: value => value.key === "test2" });

    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(node.value.key).toBe("test2");
    expect(
      linkedList.find({ callback: value => value.key === "test5" })
    ).toBeNull();
  });

  test("should find node by means of custom compare function", () => {
    const comparatorFunction = (a, b) => {
      if (a.customValue === b.customValue) {
        return 0;
      }
      return a.customValue < b.customValue ? -1 : 1;
    };

    const linkedList = new LinkedList(comparatorFunction);

    linkedList
      .append({ value: 1, customValue: "test1" })
      .append({ value: 2, customValue: "test2" })
      .append({ value: 3, customValue: "test3" });

    const node = linkedList.find({
      value: { value: 2, customValue: "test2" }
    });

    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(node.value.customValue).toBe("test2");
    expect(
      linkedList.find({ value: { value: 2, customValue: "test5" } })
    ).toBeNull();
  });
});
