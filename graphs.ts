// 1971. Find if Path Exists in Graph
// There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

// You want to determine if there is a valid path that exists from vertex source to vertex destination.

// Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

// Example 1:

const n = 3;
const edges = [
  [0, 1],
  [1, 2],
  [2, 0],
];
const source = 0;
const destination = 2;
// Output: true
// Explanation: There are two paths from vertex 0 to vertex 2:
// - 0 → 1 → 2
// - 0 → 2
// Example 2:

// Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
// Output: false
// Explanation: There is no path from vertex 0 to vertex 5.

const validPath = (
  n: number,
  edges: number[][],
  source: number,
  destination: number
): boolean => {
  const adjacencyList: Map<number, number[]> = new Map();
  //Map(3) {
  //   0 => [ 1, 2 ],
  //   1 => [ 0, 2 ],
  //   2 => [ 1, 0 ]
  // }

  const visited: Set<number> = new Set();

  for (let [v, e] of edges) {
    if (adjacencyList.has(v)) {
      adjacencyList.get(v)?.push(e);
    } else {
      adjacencyList.set(v, [e]);
    }

    if (adjacencyList.has(e)) {
      adjacencyList.get(e)?.push(v);
    } else {
      adjacencyList.set(e, [v]);
    }
  }

  const dfs = (startingPoint: number) => {
    visited.add(startingPoint);

    //getting all the dots, that starting point is connected to
    let neighbours = adjacencyList.get(startingPoint);

    if (neighbours && neighbours.length > 0) {
      for (let i = 0; i < neighbours.length; i++) {
        if (!visited.has(neighbours[i])) {
          dfs(neighbours[i]);
        }
      }
    }
  };

  dfs(source);

  console.log(adjacencyList);
  console.log(visited);
  // Visited:  Set(3) { 0, 1, 2 }

  return visited.has(destination);
};

console.log(validPath(n, edges, source, destination));
