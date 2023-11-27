// 347. Top K Frequent Elements
// Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

// Example 1:

const nums: number[] = [1, 1, 1, 2, 2, 3];
const k = 2;
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

const topKFrequent = (nums: number[], k: number): number[] => {
  const hashMap: Map<number, number> = new Map();
  let bucket: Set<number>[] = [];
  let result: number[] = [];

  for (const num of nums) {
    if (!hashMap.has(num)) {
      hashMap.set(num, 1);
    } else {
      const currFreq = hashMap.get(num)!;
      hashMap.set(num, currFreq + 1);
    }
  }

  for (let [num, freq] of Array.from(hashMap)) {
    if (!bucket[freq]) {
      bucket[freq] = new Set().add(num) as Set<number>;
    } else {
      bucket[freq] = bucket[freq].add(num);
    }
  }
  console.log({ bucket });
  for (let i = bucket.length - 1; i >= 0; i--) {
    console.log({ bucketItem: bucket[i] });
    if (bucket[i]) result.push(...bucket[i]);
    if (result.length === k) break;
  }

  return result;
};

console.log(topKFrequent(nums, k));

// Time complexity of this solution:
// O(n + k log k): It involves linear time for building the frequency map (hashMap and bucket) and then sorting the bucket array, where the sorting operation for each non-empty bucket takes O(log k) time.
