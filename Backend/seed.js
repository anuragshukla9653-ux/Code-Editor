import mongoose from 'mongoose';
import Problem from './models/problem.model.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    acceptanceRate: 52,
    tags: ['array', 'hashmap'],
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }],
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    starterCode: {
      javascript: 'function twoSum(nums, target) {\n  // Your code here\n}',
      python: 'def two_sum(nums, target):\n    # Your code here\n    pass',
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};'
    },
    visibleTestCases: [{ input: '[2,7,11,15], 9', output: '[0,1]' }, { input: '[3,2,4], 6', output: '[1,2]' }],
    hiddenTestCases: [{ input: '[3,3], 6', output: '[0,1]' }]
  },
  {
    title: 'Palindrome Number',
    slug: 'palindrome-number',
    description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
    difficulty: 'easy',
    acceptanceRate: 58,
    tags: ['math'],
    examples: [{ input: 'x = 121', output: 'true' }, { input: 'x = -121', output: 'false' }],
    constraints: ['-2^31 <= x <= 2^31 - 1'],
    starterCode: {
      javascript: 'function isPalindrome(x) {\n  // Your code here\n}',
      python: 'def is_palindrome(x):\n    # Your code here\n    pass',
      cpp: 'class Solution {\npublic:\n    bool isPalindrome(int x) {\n        \n    }\n};'
    },
    visibleTestCases: [{ input: '121', output: 'true' }, { input: '-121', output: 'false' }],
    hiddenTestCases: [{ input: '10', output: 'false' }, { input: '12321', output: 'true' }]
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    difficulty: 'easy',
    acceptanceRate: 61,
    tags: ['string', 'stack'],
    examples: [{ input: 's = "()"', output: 'true' }, { input: 's = "()[]{}"', output: 'true' }],
    constraints: ['1 <= s.length <= 10^4'],
    starterCode: {
      javascript: 'function isValid(s) {\n  // Your code here\n}',
      python: 'def is_valid(s):\n    # Your code here\n    pass',
      cpp: 'class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};'
    },
    visibleTestCases: [{ input: '"()"', output: 'true' }, { input: '"()[]{}"', output: '"true"' }],
    hiddenTestCases: [{ input: '"(]"', output: 'false' }, { input: '"([)]"', output: 'false' }]
  },
  {
    title: 'Fibonacci Number',
    slug: 'fibonacci-number',
    description: 'The Fibonacci numbers form a sequence such that each number is the sum of the two preceding ones, starting from 0 and 1.',
    difficulty: 'easy',
    acceptanceRate: 69,
    tags: ['math', 'dynamic programming'],
    examples: [{ input: 'n = 2', output: '1' }, { input: 'n = 3', output: '2' }],
    constraints: ['0 <= n <= 30'],
    starterCode: {
      javascript: 'function fib(n) {\n  // Your code here\n}',
      python: 'def fib(n):\n    # Your code here\n    pass',
      cpp: 'int fib(int n) {\n    \n}'
    },
    visibleTestCases: [{ input: '2', output: '1' }, { input: '3', output: '2' }],
    hiddenTestCases: [{ input: '4', output: '3' }, { input: '10', output: '55' }]
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    description: 'Given an integer array nums, find the subarray with the largest sum and return its sum.',
    difficulty: 'medium',
    acceptanceRate: 45,
    tags: ['array', 'dynamic programming'],
    examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' }],
    constraints: ['1 <= nums.length <= 10^5'],
    starterCode: {
      javascript: 'function maxSubArray(nums) {\n  // Your code here\n}',
      python: 'def max_sub_array(nums):\n    # Your code here\n    pass',
      cpp: 'int maxSubArray(vector<int>& nums) {\n    \n}'
    },
    visibleTestCases: [{ input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6' }, { input: '[1]', output: '1' }],
    hiddenTestCases: [{ input: '[5,4,-1,7,8]', output: '23' }]
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    difficulty: 'easy',
    acceptanceRate: 62,
    tags: ['array', 'hash table'],
    examples: [{ input: 'nums = [1,2,3,1]', output: 'true' }],
    constraints: ['1 <= nums.length <= 10^5'],
    starterCode: {
      javascript: 'function containsDuplicate(nums) {\n  // Your code here\n}',
      python: 'def contains_duplicate(nums):\n    pass'
    },
    visibleTestCases: [{ input: '[1,2,3,1]', output: 'true' }, { input: '[1,2,3,4]', output: 'false' }],
    hiddenTestCases: [{ input: '[1,1,1,3,3,4,3,2,4,2]', output: 'true' }]
  },
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    difficulty: 'easy',
    acceptanceRate: 56,
    tags: ['string', 'two pointers'],
    examples: [{ input: 's = "A man, a plan, a canal: Panama"', output: 'true' }],
    constraints: ['1 <= s.length <= 2 * 10^5'],
    starterCode: {
      javascript: 'function isPalindrome(s) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '"A man, a plan, a canal: Panama"', output: 'true' }, { input: '"race a car"', output: 'false' }],
    hiddenTestCases: [{ input: '" "', output: 'true' }]
  },
  {
    title: 'Single Number',
    slug: 'single-number',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
    difficulty: 'easy',
    acceptanceRate: 64,
    tags: ['array', 'bit manipulation'],
    examples: [{ input: 'nums = [2,2,1]', output: '1' }],
    constraints: ['1 <= nums.length <= 3 * 10^4'],
    starterCode: {
      javascript: 'function singleNumber(nums) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[2,2,1]', output: '1' }, { input: '[4,1,2,1,2]', output: '4' }],
    hiddenTestCases: [{ input: '[1]', output: '1' }]
  },
  {
    title: 'Reverse String',
    slug: 'reverse-string',
    description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
    difficulty: 'easy',
    acceptanceRate: 83,
    tags: ['string', 'two pointers'],
    examples: [{ input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }],
    constraints: ['1 <= s.length <= 10^5'],
    starterCode: {
      javascript: 'function reverseString(s) {\n  // Your code here\n  return s.reverse();\n}'
    },
    visibleTestCases: [{ input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }],
    hiddenTestCases: [{ input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }]
  },
  {
    title: 'Missing Number',
    slug: 'missing-number',
    description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
    difficulty: 'easy',
    acceptanceRate: 60,
    tags: ['array', 'math'],
    examples: [{ input: 'nums = [3,0,1]', output: '2' }],
    constraints: ['n == nums.length', '1 <= n <= 10^4'],
    starterCode: {
      javascript: 'function missingNumber(nums) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[3,0,1]', output: '2' }, { input: '[0,1]', output: '2' }],
    hiddenTestCases: [{ input: '[9,6,4,2,3,5,7,0,1]', output: '8' }]
  },
  {
    title: 'Move Zeroes',
    slug: 'move-zeroes',
    description: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements.',
    difficulty: 'easy',
    acceptanceRate: 59,
    tags: ['array', 'two pointers'],
    examples: [{ input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' }],
    constraints: ['1 <= nums.length <= 10^4'],
    starterCode: {
      javascript: 'function moveZeroes(nums) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[0,1,0,3,12]', output: '[1,3,12,0,0]' }, { input: '[0]', output: '[0]' }],
    hiddenTestCases: [{ input: '[4,2,4,0,0,3,0,5,1,0]', output: '[4,2,4,3,5,1,0,0,0,0]' }]
  },
  {
    title: 'Fizz Buzz',
    slug: 'fizz-buzz',
    description: 'Given an integer n, return a string array answer (1-indexed) where answer[i] == "FizzBuzz" if i is divisible by 3 and 5, "Fizz" if i is divisible by 3, etc.',
    difficulty: 'easy',
    acceptanceRate: 67,
    tags: ['math', 'string'],
    examples: [{ input: 'n = 3', output: '["1","2","Fizz"]' }],
    constraints: ['1 <= n <= 10^4'],
    starterCode: {
      javascript: 'function fizzBuzz(n) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '3', output: '["1","2","Fizz"]' }, { input: '5', output: '["1","2","Fizz","4","Buzz"]' }],
    hiddenTestCases: [{ input: '15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }]
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    difficulty: 'easy',
    acceptanceRate: 51,
    tags: ['math', 'dynamic programming'],
    examples: [{ input: 'n = 2', output: '2' }],
    constraints: ['1 <= n <= 45'],
    starterCode: {
      javascript: 'function climbStairs(n) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '2', output: '2' }, { input: '3', output: '3' }],
    hiddenTestCases: [{ input: '5', output: '8' }]
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
    difficulty: 'easy',
    acceptanceRate: 65,
    tags: ['hash table', 'string', 'sorting'],
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    starterCode: {
      javascript: 'function isAnagram(s, t) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '"anagram", "nagaram"', output: 'true' }, { input: '"rat", "car"', output: 'false' }],
    hiddenTestCases: [{ input: '"a", "ab"', output: 'false' }]
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Return the maximum profit you can achieve.',
    difficulty: 'easy',
    acceptanceRate: 55,
    tags: ['array', 'dynamic programming'],
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
    constraints: ['1 <= prices.length <= 10^5'],
    starterCode: {
      javascript: 'function maxProfit(prices) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[7,1,5,3,6,4]', output: '5' }, { input: '[7,6,4,3,1]', output: '0' }],
    hiddenTestCases: [{ input: '[1,2]', output: '1' }]
  },
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    description: 'Given the head of a singly linked list, reverse the list and return the reversed list.',
    difficulty: 'easy',
    acceptanceRate: 72,
    tags: ['linked list', 'recursion'],
    examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
    constraints: ['The number of nodes in the list is the range [0, 5000].'],
    starterCode: {
      javascript: '/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nfunction reverseList(head) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' }],
    hiddenTestCases: [{ input: '[1,2]', output: '[2,1]' }]
  },
  {
    title: 'Search Insert Position',
    slug: 'search-insert-position',
    description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
    difficulty: 'easy',
    acceptanceRate: 41,
    tags: ['array', 'binary search'],
    examples: [{ input: 'nums = [1,3,5,6], target = 5', output: '2' }],
    constraints: ['1 <= nums.length <= 10^4'],
    starterCode: {
      javascript: 'function searchInsert(nums, target) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[1,3,5,6], 5', output: '2' }, { input: '[1,3,5,6], 2', output: '1' }],
    hiddenTestCases: [{ input: '[1,3,5,6], 7', output: '4' }]
  },
  {
    title: 'Length of Last Word',
    slug: 'length-of-last-word',
    description: 'Given a string s consisting of words and spaces, return the length of the last word in the string.',
    difficulty: 'easy',
    acceptanceRate: 36,
    tags: ['string'],
    examples: [{ input: 's = "Hello World"', output: '5' }],
    constraints: ['1 <= s.length <= 10^4'],
    starterCode: {
      javascript: 'function lengthOfLastWord(s) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '"Hello World"', output: '5' }, { input: '"   fly me   to   the moon  "', output: '4' }],
    hiddenTestCases: [{ input: '"luffy is still joyboy"', output: '6' }]
  },
  {
    title: 'Plus One',
    slug: 'plus-one',
    description: 'You are given a large integer represented as an integer array digits. Increment the large integer by one and return the resulting array of digits.',
    difficulty: 'easy',
    acceptanceRate: 42,
    tags: ['array', 'math'],
    examples: [{ input: 'digits = [1,2,3]', output: '[1,2,4]' }],
    constraints: ['1 <= digits.length <= 100'],
    starterCode: {
      javascript: 'function plusOne(digits) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[1,2,3]', output: '[1,2,4]' }, { input: '[9]', output: '[1,0]' }],
    hiddenTestCases: [{ input: '[4,3,2,1]', output: '[4,3,2,2]' }]
  },
  {
    title: 'Binary Tree Inorder Traversal',
    slug: 'binary-tree-inorder-traversal',
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
    difficulty: 'easy',
    acceptanceRate: 68,
    tags: ['stack', 'tree', 'depth-first search', 'binary tree'],
    examples: [{ input: 'root = [1,null,2,3]', output: '[1,3,2]' }],
    constraints: ['The number of nodes in the tree is in the range [0, 100].'],
    starterCode: {
      javascript: 'function inorderTraversal(root) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[1,null,2,3]', output: '[1,3,2]' }, { input: '[]', output: '[]' }],
    hiddenTestCases: [{ input: '[1]', output: '[1]' }]
  },
  {
    title: 'Symmetric Tree',
    slug: 'symmetric-tree',
    description: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
    difficulty: 'easy',
    acceptanceRate: 55,
    tags: ['tree', 'depth-first search', 'breadth-first search', 'binary tree'],
    examples: [{ input: 'root = [1,2,2,3,4,4,3]', output: 'true' }],
    constraints: ['The number of nodes in the tree is in the range [1, 1000].'],
    starterCode: {
      javascript: 'function isSymmetric(root) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[1,2,2,3,4,4,3]', output: 'true' }, { input: '[1,2,2,null,3,null,3]', output: 'false' }],
    hiddenTestCases: [{ input: '[1,0]', output: 'false' }]
  },
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    description: 'Given the root of a binary tree, return its maximum depth.',
    difficulty: 'easy',
    acceptanceRate: 77,
    tags: ['tree', 'depth-first search', 'breadth-first search', 'binary tree'],
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '3' }],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].'],
    starterCode: {
      javascript: 'function maxDepth(root) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[3,9,20,null,null,15,7]', output: '3' }, { input: '[1,null,2]', output: '2' }],
    hiddenTestCases: [{ input: '[]', output: '0' }]
  },
  {
    title: 'Same Tree',
    slug: 'same-tree',
    description: 'Given the roots of two binary trees p and q, write a function to check if they are the same or not.',
    difficulty: 'easy',
    acceptanceRate: 60,
    tags: ['tree', 'depth-first search', 'breadth-first search', 'binary tree'],
    examples: [{ input: 'p = [1,2,3], q = [1,2,3]', output: 'true' }],
    constraints: ['The number of nodes in both trees is in the range [0, 100].'],
    starterCode: {
      javascript: 'function isSameTree(p, q) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[1,2,3], [1,2,3]', output: 'true' }, { input: '[1,2], [1,null,2]', output: 'false' }],
    hiddenTestCases: [{ input: '[1,2,1], [1,1,2]', output: 'false' }]
  },
  {
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    description: 'Given the root of a binary tree, invert the tree, and return its root.',
    difficulty: 'easy',
    acceptanceRate: 80,
    tags: ['tree', 'depth-first search', 'breadth-first search', 'binary tree'],
    examples: [{ input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }],
    constraints: ['The number of nodes in the tree is in the range [0, 100].'],
    starterCode: {
      javascript: 'function invertTree(root) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }, { input: '[2,1,3]', output: '[2,3,1]' }],
    hiddenTestCases: [{ input: '[]', output: '[]' }]
  },
  {
    title: 'Remove Duplicates from Sorted List',
    slug: 'remove-duplicates-from-sorted-list',
    description: 'Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.',
    difficulty: 'easy',
    acceptanceRate: 52,
    tags: ['linked list'],
    examples: [{ input: 'head = [1,1,2]', output: '[1,2]' }],
    constraints: ['The number of nodes in the list is in the range [0, 300].'],
    starterCode: {
      javascript: 'function deleteDuplicates(head) {\n  // Your code here\n}'
    },
    visibleTestCases: [{ input: '[1,1,2]', output: '[1,2]' }, { input: '[1,1,2,3,3]', output: '[1,2,3]' }],
    hiddenTestCases: [{ input: '[1,1,1]', output: '[1]' }]
  }
];

const seedProblems = async () => {
  try {
    // Clear existing problems
    await Problem.deleteMany({});
    console.log('Cleared existing problems');

    // Insert problems
    const insertedProblems = await Problem.insertMany(problems);
    console.log(`Seeded ${insertedProblems.length} problems`);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeder
connectDB().then(() => {
  seedProblems();
});