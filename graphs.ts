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
      for (const neighbour of neighbours) {
        if (!visited.has(neighbour)) {
          dfs(neighbour);
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

// console.log(validPath(n, edges, source, destination));

// AIRPORTS GRAPH

const airports: string[] = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(
  " "
);

const routes: string[][] = [
  ["PHX", "LAX"],
  ["PHX", "JFK"],
  ["JFK", "OKC"],
  ["JFK", "HEL"],
  ["JFK", "LOS"],
  ["MEX", "LAX"],
  ["MEX", "BKK"],
  ["MEX", "LIM"],
  ["MEX", "EZE"],
  ["LIM", "BKK"],
];

const adjacencyList: Map<string, string[]> = new Map();

const addAirportToAdjacencyList = (airport: string): void => {
  adjacencyList.set(airport, []);
};
airports.forEach((airport: string) => addAirportToAdjacencyList(airport));
// Map(11) {
//     'PHX' => [],
//     'BKK' => [],
//     'OKC' => [],
//     'JFK' => [],
//     'LAX' => [],
//     'MEX' => [],
//     'EZE' => [],
//     'HEL' => [],
//     'LOS' => [],
//     'LAP' => [],
//     'LIM' => []
//   }

const addDestinations = (airport: string, destination: string): void => {
  adjacencyList.get(airport)?.push(destination);
  adjacencyList.get(destination)?.push(airport);
};

routes.forEach((route: string[]) => addDestinations(route[0], route[1]));
// Map(11) {
//     'PHX' => [ 'LAX', 'JFK' ],
//     'BKK' => [ 'MEX', 'LIM' ],
//     'OKC' => [ 'JFK' ],
//     'JFK' => [ 'PHX', 'OKC', 'HEL', 'LOS' ],
//     'LAX' => [ 'PHX', 'MEX' ],
//     'MEX' => [ 'LAX', 'BKK', 'LIM', 'EZE' ],
//     'EZE' => [ 'MEX' ],
//     'HEL' => [ 'JFK' ],
//     'LOS' => [ 'JFK' ],
//     'LAP' => [],
//     'LIM' => [ 'MEX', 'BKK' ]
//   }

//BFS Breadth First Search
// Queue - a list, where first item in and first item out

// CHECK IF there is a route between startAirport and destination airport
const bfs = (startAirport: string, destAirport: string) => {
  const queue: string[] = [startAirport];
  const visitedAirports: Set<string> = new Set();

  while (queue.length > 0) {
    // shift mutates the original array and removes the first item and returns it;
    const airport: string = queue.shift()!; //! fixes TS of airport posibility to be undefined. We are sure that at least one item is in the queue, if not, the while loop should not initiate
    const destinations: string[] | undefined = adjacencyList.get(airport);

    if (destinations?.length) {
      for (const destination of destinations) {
        if (!visitedAirports.has(destination)) {
          visitedAirports.add(destination);
          queue.push(destination);
        }
      }
    }
  }

  console.log(visitedAirports);
  return visitedAirports.has(destAirport);
};

console.log({ routeExists: bfs("PHX", "BKK") });
