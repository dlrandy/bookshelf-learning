/* eslint-disable max-classes-per-file */
/* eslint-disable no-param-reassign */
export default class BSTNode {
    constructor(value = null, data = null) {
        this.value = value;
        this.data = data;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    find(value) {
        if (value > this.value) {
            if (this.right) {
                return this.right.find(value);
            }
        }
        if (value < this.value) {
            if (this.left) {
                return this.left.find(value);
            }
        }
        if (value === this.value) {
            return this;
        }
        return null;
    }

    insert(value, data) {
        if (this.value === null) {
            this.value = value;
            this.data = data;
            return this;
        }

        if (value > this.value) {
            if (this.right) {
                return this.right.insert(value, data);
            }
            const newNode = new BSTNode(value, data);
            this.setRight(newNode);
            return newNode;
        }

        if (value < this.value) {
            if (this.left) {
                return this.left.insert(value, data);
            }
            const newNode = new BSTNode(value, data);
            this.setLeft(newNode);
            return newNode;
        }

        return this;
    }

    remove(value) {
        let toBeRemovedNode = this.find(value);
        if (!toBeRemovedNode) {
            return false;
        }
        const { parent } = toBeRemovedNode;
        if (!toBeRemovedNode.left && !toBeRemovedNode.right) {
            if (parent) {
                parent.removeChild(toBeRemovedNode);
            } else {
                toBeRemovedNode.setValue(undefined);
            }
        } else if (toBeRemovedNode.left && toBeRemovedNode.right) {
            const nextBiggerNode = toBeRemovedNode.right.findMin();

            if (nextBiggerNode !== toBeRemovedNode.right) {
                this.remove(nextBiggerNode.value);
                toBeRemovedNode.setValue(nextBiggerNode.value);
                toBeRemovedNode.setData(nextBiggerNode.data);
            } else {
                toBeRemovedNode.setValue(toBeRemovedNode.right.value);
                toBeRemovedNode.setData(toBeRemovedNode.right.data);
            }
            toBeRemovedNode = nextBiggerNode;
        } else {
            const childNode = toBeRemovedNode.left || toBeRemovedNode.right;
            if (parent) {
                parent.replaceChild(toBeRemovedNode, childNode);
            } else {
                BSTNode.copyNode(childNode, toBeRemovedNode);
            }
        }
        toBeRemovedNode.parent = null;
        return true;
    }

    removeChild(nodeToRemove) {
        if (this.left === nodeToRemove) {
            if (this.left) this.left.parent = null;
            this.left = null;
            return true;
        }
        if (this.right === nodeToRemove) {
            if (this.right) this.right.parent = null;
            this.right = null;
            return true;
        }

        return false;
    }

    findMin() {
        if (!this.left) {
            return this;
        }
        return this.left.findMin();
    }

    findMax() {
        if (!this.right) {
            return this;
        }
        return this.right.findMax();
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    contains(value) {
        return !!this.find(value);
    }

    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            return false;
        }
        if (this.left && this.left === nodeToReplace) {
            this.left.parent = null;
            this.left = replacementNode;
            replacementNode.parent = this;
            return true;
        }
        if (this.right && this.right === nodeToReplace) {
            this.right.parent = null;
            this.right = replacementNode;
            replacementNode.parent = this;
            return true;
        }
        return false;
    }

    static copyNode(sourceNode, targetNode) {
        targetNode.setValue(sourceNode.value);
        targetNode.setData(sourceNode.data);
        targetNode.setLeft(sourceNode.left);
        targetNode.setRight(sourceNode.right);
    }

    setLeft(node) {
        if (this.left) {
            this.left.parent = null;
        }
        this.left = node;
        if (this.left) {
            this.left.parent = this;
        }
        return this;
    }

    setRight(node) {
        if (this.right) {
            this.right.parent = null;
        }
        this.right = node;
        if (this.right) {
            this.right.parent = this;
        }
        return this;
    }

    traverseInOrder() {
        let traverse = [];
        if (this.left) {
            traverse = traverse.concat(this.left.traverseInOrder());
        }
        traverse.push(this.value);
        if (this.right) {
            traverse = traverse.concat(this.right.traverseInOrder());
        }
        return traverse;
    }

    traversePreOrder() {
        let traverse = [];
        traverse.push(this.value);
        if (this.left) {
            traverse = traverse.concat(this.left.traversePreOrder());
        }
        if (this.right) {
            traverse = traverse.concat(this.right.traversePreOrder());
        }
        return traverse;
    }

    traversePostOrder() {
        let traverse = [];
        if (this.left) {
            traverse = traverse.concat(this.left.traversePostOrder());
        }

        if (this.right) {
            traverse = traverse.concat(this.right.traversePostOrder());
        }
        traverse.push(this.value);
        return traverse;
    }

    toString() {
        return this.traverseInOrder().toString();
    }
}

export class BSTree {
    constructor() {
        this.root = new BSTNode(null);
    }

    find(value) {
        return this.root.find(value);
    }

    findMin() {
        return this.root.findMin();
    }

    findMax() {
        return this.root.findMax();
    }

    insert(value, data = null) {
        return this.root.insert(value, data);
    }

    contains(value) {
        return this.root.contains(value);
    }

    remove(value) {
        return this.root.remove(value);
    }

    toString() {
        return this.root.toString();
    }
}
