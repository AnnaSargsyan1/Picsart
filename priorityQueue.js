export class PriorityQueue {
    #heap = [];
    insert(val, priority) {
        this.#heap.push([ val, priority ]);
        this.#bubble_up();
    }
    extractMin() {
        this.#swap(0, this.#size() - 1);
        const val = this.#heap.pop();
        this.#bubble_down();
        return val;
    }
    isEmpty() {
        return this.#size() === 0;
    }
    peek() {
        return this.#heap[0];
    }
    #bubble_up(index = this.#size() - 1) {
        if (index <= 0) { return; }
        const parent = Math.floor((index - 1) / 2);
        if (this.#heap[index][1] < this.#heap[parent][1]) {
            this.#swap(index, parent);
            this.#bubble_up(parent);
        }
    }
    #bubble_down(index = 0) {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        let smallest = index;
        if (left < this.#size() && this.#heap[left][1] < this.#heap[index][1]) {
            smallest = left;
        }
        if (right < this.#size() && this.#heap[right][1] < this.#heap[index][1]) {
            smallest = right;
        }
        if (smallest !== index) {
            this.#swap(smallest, index);
            this.#bubble_down(smallest);
        }
    }
    #size() {
        return this.#heap.length;
    }
    #swap(i, j) {
        [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
    }
}