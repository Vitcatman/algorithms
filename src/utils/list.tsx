export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  private tail: LinkedListNode<T> | null;

  constructor(initialState?: T[]) {
    this.size = 0;
    this.head = null;
    this.tail = null;
    initialState?.forEach((el) => {
      this.insertAt(el, 0);
    });
  }
  getNodeByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }
    let currEl = this.head;
    let currIndex = 0;

    while (currIndex < index && currEl) {
      currEl = currEl.next;
      currIndex++;
    }
    return currEl ? currEl.value : null;
  }

  prepend(value: T) {
    let node = new LinkedListNode(value);

    if (!this.head) {
      this.head = node;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  append(element: T) {
    const newNode = new LinkedListNode(element);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;

    this.tail = newNode;

    this.size++;
  }

  deleteHead() {
    if (!this.head) return null;
    let deletedHead = this.head;

    if (this.head.next) {
      this.head = deletedHead.next;
    } else {
      this.head = null;
    }
    this.size--;
    return deletedHead ? deletedHead.value : null;
  }

  deleteTail() {
    if (this.size === 0) {
      console.log('linkedList to small');
      return null;
    }

    let currentEl = this.head;
    let prevEl = null;
    let currentIndex = 0;

    while (currentIndex < this.size - 1 && currentEl) {
      prevEl = currentEl;
      currentEl = currentEl.next;
      currentIndex++;
    }

    if (prevEl && currentEl) {
      prevEl.next = currentEl.next;
    }
    this.size--;
    return currentEl ? currentEl.value : null;
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let currentEl = this.head;

    if (index === 0 && currentEl) {
      this.head = currentEl.next;
    } else {
      let prevEl = null;
      let currentIndex = 0;

      while (currentIndex < index && currentEl) {
        prevEl = currentEl;
        currentEl = currentEl.next;
        currentIndex++;
      }

      if (prevEl && currentEl) {
        prevEl.next = currentEl.next;
      }
    }
    this.size--;
    return currentEl ? currentEl.value : null;
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

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.getSize()) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new LinkedListNode(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = this.head;

        while (currIndex < index) {
          if (curr) {
            currIndex++;
            prev = curr;
            curr = curr.next;
          }
        }

        node.next = curr;
        if (prev) {
          prev.next = node;
        }
      }

      this.size++;
    }
  }

  getSize() {
    return this.size;
  }
}
