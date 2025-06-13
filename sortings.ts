interface ISortable {
    execute(data: number[]): number[];
}
class SortContext {
    constructor(private strategy: ISortable) {}
    executeSort(data: number[]) {
        const st = performance.now();
        const res = this.strategy.execute([...data]);
        const end = performance.now();
        return {
            strategy: String(this.strategy), 
            result: res, 
            duration: `${(end - st).toFixed(2)}ms`
        };
    }
    setStrategy(strategy: ISortable) {
        this.strategy = strategy;
    }
}

class BubbleSort implements ISortable {
    execute(data: number[]): number[] {
        for (let i = 0; i < data.length; ++i) {
            let count = 0;
            for (let j = 0; j < data.length - i - 1; ++j) {
                if (data[j] > data[j + 1]) { 
                    [data[j], data[j + 1]] = [data[j + 1], data[j]];
                    ++count;
                }
            }
            if (count === 0) break;
        }
        return data;
    }
    toString() {
        return "bubble";
    }
}

class SelectionSort implements ISortable {
    execute(data: number[]): number[] {
        for (let i = 0; i < data.length; ++i) {
            let min = i;
            for (let j = i + 1; j < data.length; ++j) {
                if (data[j] < data[min]) min = j;
            }
            [data[i], data[min]] = [data[min], data[i]];
        }
        return data;
    }
    toString() {
        return "selection";
    }
}

class InsertionSort implements ISortable {
    execute(data: number[]): number[] {
        for (let i = 1; i < data.length; ++i) {
            let key = data[i];
            let j = i - 1;
            while (j >= 0 && data[j] > key) {
                data[j + 1] = data[j];
                --j;
            }
            data[j + 1] = key;
        }
        return data;
    }
    toString() {
        return "insertion";
    }
}

class CountingSort {
    execute(data: number[]): number[] {
        const max = Math.max(...data);
        const counts = new Array(max + 1).fill(0);
        for (let i = 0; i < data.length; ++i) {
            ++counts[data[i]];
        }
        for (let i = 1; i < counts.length; ++i) {
            counts[i] += counts[i - 1];
        }
        const sorted = [];
        for (let i = data.length - 1; i >= 0; --i) {
            sorted[counts[data[i]] - 1] = data[i];
            --counts[data[i]];
        }
        return sorted;
    }
    toString() {
        return "counting";
    }
}

class RadixSort implements ISortable {
    execute(data: number[]): number[] {
        const max = Math.max(...data);
        let sorted = [...data];
        for (let exp = 1; max / exp >= 1; exp *= 10) {
            sorted = this.#helperCountingSort(sorted, exp);
        }
        return sorted;
    }

    #helperCountingSort(data: number[], exp: number) {
        const counts = new Array(10).fill(0);
        for (let i = 0; i < 10; ++i) {
            ++counts[Math.floor(data[i] / exp) % exp];
        }
        for (let i = 1; i < 10; ++i) {
            counts[i] += counts[i - 1];
        }
        const sorted = [];
        for (let i = 0; i < data.length; ++i) {
            let digit = Math.floor(data[i] / exp) % exp;
            sorted[counts[digit] - 1] = data[i];
            --counts[digit];
        }
        return sorted;
    }

    toString() {
        return "radix";
    }
}

class MergeSort implements ISortable {
    execute(data: number[]): number[] {
        if (data.length <= 1) return data;

        const mid = Math.floor(data.length / 2);
        const left = this.execute(data.slice(0, mid));
        const right = this.execute(data.slice(mid));

        return this.#helperMerge(left, right);
    }
    #helperMerge(left: number[], right: number[]): number[] {
        let i = 0, j = 0;
        const res = [];
        while (i < left.length && j < right.length) {
            res.push(left[i] < right[j] ? left[i++] : right[j++]);
        }

        while (i < left.length) { res.push(left[i++]); }
        while (j < right.length) { res.push(right[j++]); }

        return res;
    }
    toString() {
        return "merge";
    }
}

const data = [9, 4, 6, 2, 1];
const data2 = [9, 14, 5, 76, 23, 45];

const context = new SortContext(new BubbleSort());

console.log(context.executeSort(data));  
console.log(context.executeSort(data2));

context.setStrategy(new InsertionSort());
console.log(context.executeSort(data));
console.log(context.executeSort(data2));

context.setStrategy(new SelectionSort());
console.log(context.executeSort(data));
console.log(context.executeSort(data2));

context.setStrategy(new CountingSort());
console.log(context.executeSort(data));
console.log(context.executeSort(data2));

context.setStrategy(new RadixSort());
console.log(context.executeSort(data));
console.log(context.executeSort(data2));

context.setStrategy(new MergeSort());
console.log(context.executeSort(data));
console.log(context.executeSort(data2));
