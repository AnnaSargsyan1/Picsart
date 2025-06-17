class MinHeap {
    heap = [];
    peek() {
        return this.heap[0];
    }
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }
    extractMin() {
        this.#swap(0, this.size() - 1);
        const val = this.heap.pop();
        this.heapifyDown();
        return val;
    }
    heapifyDown(curr = 0) {
        let left, right, smallest;
        while (curr < this.size()) {
            smallest = curr;
            left = curr * 2 + 1;
            right = curr * 2 + 2;
            if (left < this.size() && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.size() && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            if (smallest !== curr) {
                this.#swap(curr, smallest);
                curr = smallest;
            } else {
                break;
            }
        }
    }
    heapifyUp(curr = this.size() - 1) {
        let parent;
        while (curr > 0) {
            parent = Math.floor((curr - 1) / 2);
            if (this.heap[curr] < this.heap[parent]) {
                this.#swap(curr, parent);
                curr = parent;
            } else {
                break;
            }
        }
    }
    #swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    size() {
        return this.heap.length;
    }
}

const heap = new MinHeap();
heap.insert(10);
heap.insert(20);
heap.insert(12);
console.log(heap.peek());
heap.insert(-2);
console.log(heap);
console.log(heap.extractMin());
console.log(heap.peek());