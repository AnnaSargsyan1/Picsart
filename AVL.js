class Node {
    left = null;
    right = null;
    height = 1;
    balace = 0;
    constructor(val = 0) {
        this.val = val;
    }
}
class AVLTree {
    root = null;
    insert(val) {
        this.root = this.#insert(this.root, val);
    }
    #insert(node, val) {
        if (!node) { return new Node(val); }
        if (val < node.val) {
            node.left = this.#insert(node.left, val);
        } else if (val > node.val) {
            node.right = this.#insert(node.right, val);
        }
        this.update(node);
        return this.balance(node);
    }
    deleteNode(val) {
        this.root = this.#deleteNode(this.root, val);
    }
    #deleteNode(node, val) {
        if (!node) { return; }
        if (node.val === val) {
            if (!node.left || !node.right) {
                return node.left || node.right;
            }
            const successor = this.#getMin(node);
            node.val = successor.val;
            node.right = this.#deleteNode(node, successor.val);
        } else if (val < node.val) {
            node.left = this.#deleteNode(node.left, val);
        } else {
            node.right = this.#deleteNode(node.right, val);
        }
        this.update(node);
        return this.balance(node);
    }
    #getMin(node = this.root) {
        while (node.left) {
            node = node.left; 
        }
        return node;
    }
    update(node) {
        const left = !node.left ? 0 : node.left.height;
        const right = !node.right ? 0 : node.right.height;
        node.height = 1 + Math.max(left, right);
        node.balance = left - right;
    }
    balance(node) {
        if (node.balance < -1) {
            if (node.right.balance > 0) {
                this.rotateRight(node);
            }
            return this.rotateLeft(node);
        } else if (node.balance > 1) {
            if (node.left.balance < 0) {
                this.rotateLeft(node);
            }
            return this.rotateRight(node);
        }
        return node;
    }
    rotateLeft(x) {
        let y = x.right;
        let T2 = y.left;
        
        y.left = x;
        x.right = T2;
        
        this.update(x);
        this.update(y);
        
        return y;
    }
    rotateRight(y) {
        let x = y.left;
        let T2 = x.right;
        
        x.right = y;
        y.left = T2;
        
        this.update(y);
        this.update(x);
        
        return x;
    }
    inorder(node = this.root) {
        const res = [];
        const helper = function(node) {
            if (!node) { return; }
            helper(node.left);
            res.push(node.val);
            helper(node.right);
        }
        helper(node);
        return res;
    }
    preorder(node = this.root) {
        const res = [];
        const helper = function(node) {
            if (!node) { return; }
            res.push(node.val);
            helper(node.left);
            helper(node.right);
        }
        helper(node);
        return res;
    }
    postorder(node = this.root) {
        const res = [];
        const helper = function(node) {
            if (!node) { return; }
            helper(node.left);
            helper(node.right);
            res.push(node.val);
        }
        helper(node);
        return res;
    }
}









