export const problems = [
  {
    id: 'p-001',
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    acceptance: 52,
    tags: ['Array', 'Hash Table'],
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Exactly one valid answer exists.',
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] equals 9.',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
}

console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)))`,
      python: `def two_sum(nums, target):
    # Write your solution here
    pass

print(two_sum([2, 7, 11, 15], 9))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}`,
    },
    visibleTestCases: [
      { input: '[2,7,11,15], 9', output: '[0,1]' },
      { input: '[3,2,4], 6', output: '[1,2]' },
    ],
    hiddenTestCases: 12,
  },
  {
    id: 'p-002',
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    acceptance: 61,
    tags: ['String', 'Stack'],
    description:
      'Given a string s containing brackets, determine if the input string is valid.',
    constraints: ['1 <= s.length <= 10^4', 's consists only of brackets (). {} [].'],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "([)]"', output: 'false' },
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your solution here
}

console.log(isValid("()"))`,
      python: `def is_valid(s):
    # Write your solution here
    pass

print(is_valid("()"))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    // Write your solution here
    return false;
}`,
    },
    visibleTestCases: [
      { input: '"()"', output: 'true' },
      { input: '"([)]"', output: 'false' },
    ],
    hiddenTestCases: 10,
  },
  {
    id: 'p-003',
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    acceptance: 55,
    tags: ['Array', 'Dynamic Programming'],
    description:
      'Given an array prices where prices[i] is the price of a stock on day i, return the maximum profit from one buy and one sell.',
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5' },
      { input: 'prices = [7,6,4,3,1]', output: '0' },
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Write your solution here
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]))`,
      python: `def max_profit(prices):
    # Write your solution here
    pass

print(max_profit([7, 1, 5, 3, 6, 4]))`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxProfit(vector<int>& prices) {
    // Write your solution here
    return 0;
}`,
    },
    visibleTestCases: [
      { input: '[7,1,5,3,6,4]', output: '5' },
      { input: '[7,6,4,3,1]', output: '0' },
    ],
    hiddenTestCases: 14,
  },
  {
    id: 'p-004',
    slug: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    acceptance: 48,
    tags: ['Array', 'Sorting'],
    description:
      'Given an array of intervals, merge all overlapping intervals and return an array of non-overlapping intervals.',
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2'],
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
    ],
    starterCode: {
      javascript: `function merge(intervals) {
  // Write your solution here
}

console.log(JSON.stringify(merge([[1, 3], [2, 6], [8, 10], [15, 18]])))`,
      python: `def merge(intervals):
    # Write your solution here
    pass`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    // Write your solution here
    return {};
}`,
    },
    visibleTestCases: [{ input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
    hiddenTestCases: 18,
  },
]

export function getProblemBySlug(slug) {
  return problems.find((problem) => problem.slug === slug)
}
