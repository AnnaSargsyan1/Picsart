import { PriorityQueue } from "./priorityQueue.js";
export class Graph {
    #graph = new Map();

    addEdge(u, v, w) {
        if (isNaN(u) || isNaN(v) || isNaN(w)) {
            return false;
        }
        if (!this.#graph.get(u)) { this.#graph.set(u, []); }
        if (!this.#graph.get(v)) { this.#graph.set(v, []); }
        this.#graph.get(u).push([v, w]);
        this.#graph.get(v).push([u, w]);
        return true;
    }   
    hasCycle() {
        const visited = new Set();
        for (const u of this.#graph.keys()) {
            if (visited.has(u)) { continue; }

            const stack = [ [ u, null ] ];
            while (stack.length) {
                const [ from, parent ] = stack.pop();
                if (!visited.has(from)) {
                    visited.add(from);
                }

                const neighbors = this.#graph.get(from);
                for (const [ to ] of neighbors) {
                    if (!visited.has(to)) {
                        stack.push([ to, from ]);
                    } else if (to !== parent) {
                        return true;
                    }
                }
            }
        }
        return false;
    } 
    shortestPath(u, v) {
        if (this.#graph.get(u) && this.#graph.get(v)) {
            const costs = new Map();
            const visited = new Set();
    
            for (const vertex of this.#graph.keys()) {
                costs.set(vertex, Infinity);
            }
            costs.set(u, 0);
    
            const queue = new PriorityQueue();
            queue.insert(u, 0);
    
            while (!queue.isEmpty()) {
                const [from, cost] = queue.extractMin();
                if (visited.has(from)) continue;
                visited.add(from);
    
                const neighbors = this.#graph.get(from) || [];
                for (const [n, w] of neighbors) {
                    if (cost + w < costs.get(n)) {
                        costs.set(n, cost + w);
                        queue.insert(n, cost + w);
                    }
                }
            }
    
            console.log(costs);
            return costs.get(v) === Infinity ? -1 : costs.get(v);
        }
        return -1;
    }
}