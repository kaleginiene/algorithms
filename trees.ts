// 112. Path Sum

// Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

// A leaf is a node with no children.

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const tree: TreeNode = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: {
        val: 7,
        right: null,
        left: null,
      },
      right: {
        val: 2,
        left: null,
        right: null,
      },
    },
    right: null,
  },
  right: {
    val: 8,
    left: {
      val: 13,
      left: null,
      right: null,
    },
    right: {
      val: 4,
      left: null,
      right: {
        val: 1,
        left: null,
        right: null,
      },
    },
  },
};

//DFS Algorithm

const hasPathSum = (root: TreeNode | null, targetSum: number): boolean => {
  if (!root) return false;

  if (!root.right && !root.left && targetSum === root.val) return true;

  return (
    hasPathSum(root.right, targetSum - root.val) ||
    hasPathSum(root.left, targetSum - root.val)
  );
};

console.log({ hasPathSum: hasPathSum(tree, 2) });

//270. Closest Binary Search Tree Value

// Given the root of a binary search tree and a target value, return the value in the BST that is closest to the target. If there are multiple answers, print the smallest.

interface Closest {
  val: number;
  distance: number;
}

const closestValue = (root: TreeNode | null, target: number): number => {
  if (!root) return 0;
  let closest: Closest = {
    val: root.val,
    distance: Math.abs(root.val - target),
  };

  const dfs = (rootNode: TreeNode | null) => {
    if (!rootNode) return;
    const distance: number = Math.abs(target - rootNode.val);
    const isCloser: boolean =
      (distance === closest.distance && closest.val > rootNode.val) ||
      distance < closest?.distance;

    closest = {
      val: isCloser ? rootNode.val : closest.val,
      distance: isCloser ? distance : closest.distance,
    };

    if (!rootNode?.right && !rootNode?.left) return;

    dfs(rootNode?.left);
    dfs(rootNode?.right);
  };

  dfs(root);

  return closest.val;
};

console.log(closestValue(tree, 10.2345));
