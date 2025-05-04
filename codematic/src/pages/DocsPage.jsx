// DocsPage.js
import React, { useState } from "react";
import "./DocsPage.css";
import { useNavigate } from 'react-router-dom'
import hey from '../assets/Wave.png';
import { useAuth } from "../context/AuthContext";

const DocsPage = () => {
  const [code, setCode] = useState("");
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <header className="docs-header">
        <div className="docs-right">
          <i onClick={handleBack} className="ri-arrow-left-line"></i>
          <h2>Hello, {currentUser?.displayName || "Aadarsh"}</h2>
          <div className="hey-img">
            <img src={hey} alt="" />
          </div>
        </div>
        
        <div className="docs-header-left">
          <i className="ri-search-line"></i>
          <i className="ri-notification-3-line"></i>
          <button>
            <i onClick={handleLogout} className="ri-logout-box-r-line"></i>
          </button>
        </div>
      </header>
      
      <div className="docs-page">
        <div className="docs">
          <h1>CodeMatic Documentation</h1>
          
          <div className="question" id="array-section">
            <h2>1. What is an Array?</h2>
            <p>
              An array is a data structure that can hold multiple values at once. It is a collection of elements, typically of the same type, stored in contiguous memory locations. 
              The elements can be accessed using an index, with the first element being at index 0.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`const arr = [1, 2, 3, 4, 5];
console.log(arr[0]); // Output: 1`}
            </pre>
          </div>

          <div className="question" id="linked-list-section">
            <h2>2. What is a Linked List?</h2>
            <p>
              A linked list is a linear collection of data elements where each element points to the next one. Unlike arrays, linked lists do not store elements in contiguous memory locations. 
              The elements are nodes, each containing data and a reference to the next node in the sequence.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
}

const list = new LinkedList();
list.append(10);
list.append(20);
console.log(list);`}
            </pre>
          </div>

          <div className="question" id="stack-section">
            <h2>3. What is a Stack?</h2>
            <p>
              A stack is a collection of elements with two principal operations: push (adding an element) and pop (removing the most recently added element). 
              It operates on a Last In, First Out (LIFO) principle.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
console.log(stack.pop()); // Output: 20`}
            </pre>
          </div>

          <div className="question" id="queue-section">
            <h2>4. What is a Queue?</h2>
            <p>
              A queue is a collection of elements that follows the First In, First Out (FIFO) principle. It allows operations like enqueue (adding an element) and dequeue (removing an element).
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }
}

const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.dequeue()); // Output: 10`}
            </pre>
          </div>

          <div className="question" id="hash-map-section">
            <h2>5. What is a Hash Map?</h2>
            <p>
              A hash map is a data structure that stores key-value pairs. It provides efficient data retrieval, insertion, and deletion, with the keys being hashed to determine their location in memory.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`const hashMap = new Map();
hashMap.set('name', 'John');
hashMap.set('age', 30);
console.log(hashMap.get('name')); // Output: John`}
            </pre>
          </div>

          <div className="question" id="set-section">
            <h2>6. What is a Set?</h2>
            <p>
              A set is a collection of unique values. It does not allow duplicate elements and is commonly used to store distinct items.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(1); // Duplicate, will not be added
console.log(mySet); // Output: Set(2) {1, 2}`}
            </pre>
          </div>

          <div className="question" id="tree-section">
            <h2>7. What is a Tree?</h2>
            <p>
              A tree is a hierarchical data structure with a root value and subtrees of children, represented as a set of linked nodes.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

const root = new TreeNode(1);
const child1 = new TreeNode(2);
const child2 = new TreeNode(3);
root.children.push(child1, child2);`}
            </pre>
          </div>

          <div className="question" id="binary-tree-section">
            <h2>8. What is a Binary Tree?</h2>
            <p>
              A binary tree is a tree data structure where each node has at most two children referred to as the left and right child.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const root = new Node(10);
root.left = new Node(5);
root.right = new Node(15);`}
            </pre>
          </div>

          <div className="question" id="bst-section">
            <h2>9. What is a Binary Search Tree (BST)?</h2>
            <p>
              A BST is a binary tree where each node has a key greater than all the keys in its left subtree and less than those in its right subtree.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const root = new BSTNode(10);
root.left = new BSTNode(5);
root.right = new BSTNode(15);`}
            </pre>
          </div>

          <div className="question" id="graph-section">
            <h2>10. What is a Graph?</h2>
            <p>
              A graph is a collection of nodes connected by edges. It can be directed or undirected, and cyclic or acyclic.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`const graph = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['E'],
  D: [],
  E: []
};`}
            </pre>
          </div>

          <div className="question" id="heap-section">
            <h2>11. What is a Heap?</h2>
            <p>
              A heap is a special tree-based data structure that satisfies the heap property. In a max heap, each parent node is greater than its children.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`const maxHeap = [100, 19, 36, 17, 3, 25, 1, 2, 7];`}
            </pre>
          </div>

          <div className="question" id="trie-section">
            <h2>12. What is a Trie?</h2>
            <p>
              A trie is a tree-like data structure used to store associative data structures, typically strings. It is used in autocomplete and spell check features.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}`}
            </pre>
          </div>

          <div className="question" id="deque-section">
            <h2>13. What is a Deque?</h2>
            <p>
              A deque (double-ended queue) is a linear data structure that allows insertion and removal from both ends.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`const deque = [];
deque.push(1); // back
deque.unshift(2); // front
deque.pop(); // remove from back
deque.shift(); // remove from front`}
            </pre>
          </div>

          <div className="question" id="priority-queue-section">
            <h2>14. What is a Priority Queue?</h2>
            <p>
              A priority queue is a type of queue where each element is associated with a priority and is dequeued based on its priority.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, priority) {
    this.queue.push({ element, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift();
  }
}`}
            </pre>
          </div>

          <div className="question" id="circular-queue-section">
            <h2>15. What is a Circular Queue?</h2>
            <p>
              A circular queue is a linear data structure that connects the end back to the start to form a circle. It overcomes the limitation of a regular queue.
            </p>
            <h3>Example Code:</h3>
            <pre>
              {`class CircularQueue {
  constructor(size) {
    this.queue = new Array(size);
    this.size = size;
    this.front = -1;
    this.rear = -1;
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsPage;