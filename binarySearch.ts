//704. Binary Search

// Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4
// Example 2:

// Input: nums = [-1,0,3,5,9,12], target = 2
// Output: -1
// Explanation: 2 does not exist in nums so return -1

const numsList = [-1, 0, 3, 5, 9, 12];
const target = 9;

const search = (nums: number[], target: number): number => {
  let left: number = 0;
  let right: number = nums.length - 1;

  while (left <= right) {
    const midIndex = Math.floor((right + left) / 2);
    const midNum = nums[midIndex];

    if (midNum === target) {
      return midIndex;
    }

    if (midNum > target) {
      right = midIndex - 1;
    } else {
      left = midIndex + 1;
    }
  }

  return -1;
};

console.log(search(numsList, target));

// Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.
