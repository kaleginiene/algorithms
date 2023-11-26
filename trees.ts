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

// 617. Merge Two binary trees
// You are given two binary trees root1 and root2.

// Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

// Return the merged tree.

// Note: The merging process must start from the root nodes of both trees.

const mergeTrees = (
  root1: TreeNode | null | undefined,
  root2: TreeNode | null | undefined
): TreeNode | null => {
  if (!root1 && !root2) return null;
  if (root1 && !root2) return root1;
  if (!root1 && root2) return root2;
  const val1 = root1?.val ? root1.val : 0;
  const val2 = root2?.val ? root2.val : 0;

  const mergedTree: TreeNode = new TreeNode(val1 + val2);

  mergedTree.left = mergeTrees(root1?.left, root2?.left);
  mergedTree.right = mergeTrees(root1?.right, root2?.right);

  return mergedTree;
};

console.log(mergeTrees(tree, tree));
