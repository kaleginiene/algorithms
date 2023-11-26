// 359. Logger Rate Limiter
// Design a logger system that receives a stream of messages along with their timestamps. Each unique message should only be printed at most every 10 seconds (i.e. a message printed at timestamp t will prevent other identical messages from being printed until timestamp t + 10).

// All messages will come in chronological order. Several messages may arrive at the same timestamp.

// Implement the Logger class:

// Logger() Initializes the logger object.
// bool shouldPrintMessage(int timestamp, string message) Returns true if the message should be printed in the given timestamp, otherwise returns false.

// Example 1:

// Input
// ["Logger", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage"]
// [[], [1, "foo"], [2, "bar"], [3, "foo"], [8, "bar"], [10, "foo"], [11, "foo"]]
// Output
// [null, true, true, false, false, false, true]

// Explanation
// Logger logger = new Logger();
// logger.shouldPrintMessage(1, "foo");  // return true, next allowed timestamp for "foo" is 1 + 10 = 11
// logger.shouldPrintMessage(2, "bar");  // return true, next allowed timestamp for "bar" is 2 + 10 = 12
// logger.shouldPrintMessage(3, "foo");  // 3 < 11, return false
// logger.shouldPrintMessage(8, "bar");  // 8 < 12, return false
// logger.shouldPrintMessage(10, "foo"); // 10 < 11, return false
// logger.shouldPrintMessage(11, "foo"); // 11 >= 11, return true, next allowed timestamp for "foo" is 11 + 10 = 21

class Logger {
  private printedMessages: Map<string, number>;
  constructor() {
    this.printedMessages = new Map();
  }
  shouldPrintMessage(timestamp: number, message: string): boolean {
    const MIN_TIME_STAMP = 10;
    const isMessageAlreadyPrinted = this.printedMessages.has(message);
    const isMessageValid: boolean =
      isMessageAlreadyPrinted &&
      this.printedMessages.get(message)! + MIN_TIME_STAMP <= timestamp;
    const isMessageFirstTime: boolean = !isMessageAlreadyPrinted;

    if (isMessageValid || isMessageFirstTime) {
      this.printedMessages.set(message, timestamp);
      return true;
    }

    return false;
  }
}

const logger: Logger = new Logger();
// console.log(logger.shouldPrintMessage(8, "foo"));
// console.log(logger.shouldPrintMessage(11, "foo"));
// console.log(logger.shouldPrintMessage(12, "foo"));
// console.log(logger.shouldPrintMessage(22, "foo"));
// console.log(logger.shouldPrintMessage(33, "foo"));

// -------- 355. Design Twitter----------------------------------
// Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.

// Implement the Twitter class:

// Twitter() Initializes your twitter object.
// void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.
// List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
// void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.
// void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.

// Example 1:

// Input
// ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
// [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
// Output
// [null, null, [5], null, null, [6, 5], null, [5]]

// Explanation
// Twitter twitter = new Twitter();
// twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
// twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
// twitter.follow(1, 2);    // User 1 follows user 2.
// twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
// twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
// twitter.unfollow(1, 2);  // User 1 unfollows user 2.
// twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.

type UserId = number;
type TweetId = number;

interface UserProfile {
  followingUsers: UserId[];
  postedTweets: number[];
}

interface Tweet {
  userId: UserId;
  tweetId: TweetId;
}

class Twitter {
  private tweetsDb: Map<UserId, TweetId[]>;
  private usersDb: Map<UserId, UserProfile>;

  constructor() {
    this.tweetsDb = new Map();
    this.usersDb = new Map();
  }

  postTweet(userId: number, tweetId: number): void {
    const userProfile = this.usersDb.get(userId)?.postedTweets;

    if (!this.tweetsDb.get(userId)) {
      this.tweetsDb.set(userId, [tweetId]);
    } else {
      this.tweetsDb.get(userId)?.push(tweetId);
    }

    if (!this.usersDb.has(userId)) {
      this.usersDb.set(userId, { followingUsers: [], postedTweets: [] });
    } else {
      userProfile?.push(tweetId);
    }

    console.log(this.usersDb);
    console.log({ tweets: this.tweetsDb });
  }

  getNewsFeed(userId: number): number[] {
    const followingUsers: number[] =
      this.usersDb.get(userId)?.followingUsers || [];
    const tweets = Array.from(this.tweetsDb);
    const feed: number[] = [];
    tweets.forEach((tweet) => {
      if (followingUsers.includes(tweet[0])) {
        feed.push(...tweet[1]);
      }
    });

    return feed;
  }

  follow(followerId: number, followedId: number): void {
    if (!this.usersDb.has(followerId)) {
      this.usersDb.set(followerId, {
        followingUsers: [followedId],
        postedTweets: [],
      });
    } else {
      this.usersDb.get(followerId)?.followingUsers.push(followedId);
    }
  }
  unfollow(followerId: number, followeeId: number): void {
    if (!this.usersDb.has(followerId)) return;
    const userDetails = this.usersDb.get(followerId)!;
    const followingUsersList: number[] = userDetails?.followingUsers!;

    const filteredOutUnfollowedId = followingUsersList.filter(
      (ids) => ids !== followeeId
    );

    this.usersDb.set(followerId, {
      ...userDetails,
      followingUsers: filteredOutUnfollowedId,
    });
  }
}

const twitter = new Twitter();
console.log(twitter.postTweet(1, 6));
console.log(twitter.postTweet(1, 3));
console.log(twitter.postTweet(3, 5));
console.log(twitter.follow(1, 3));
console.log(twitter.getNewsFeed(1));
