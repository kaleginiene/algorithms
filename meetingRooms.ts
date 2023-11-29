// 253. Meeting Rooms II

function minMeetingRooms(intervals: Array<[number, number]>): number {
  if (!intervals.length) return 0;
  if (intervals.length < 2) return 1;

  const starts = intervals.map((interval) => interval[0]).sort((a, b) => a - b);
  const ends = intervals.map((interval) => interval[1]).sort((a, b) => a - b);

  let rooms: number = 0;
  let end: number = 0;

  for (let i = 0; i < intervals.length; i++) {
    if (starts[i] < ends[end]) {
      rooms++;
    } else {
      end++;
    }
  }

  return rooms;
}

const intervals: Array<[number, number]> = [
  [0, 30],
  [5, 10],
  [15, 20],
];

console.log(minMeetingRooms(intervals));
