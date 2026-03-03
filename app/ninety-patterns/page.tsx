'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { Search, ExternalLink, ChevronRight, BookOpen, Zap } from 'lucide-react'

// Manual extraction from CSV content provided
const ninetyPatterns = [
  {
    category: "I. Two Pointer Patterns",
    patterns: [
      { id: 1, name: "Converging", problems: ["11. Container With Most Water", "15. 3Sum", "16. 3Sum Closest", "18. 4Sum", "167. Two Sum II - Input Array Is Sorted", "349. Intersection of Two Arrays", "881. Boats to Save People", "977. Squares of a Sorted Array", "259. 3Sum Smaller"] },
      { id: 2, name: "Fast & Slow", problems: ["141. Linked List Cycle", "202. Happy Number", "287. Find the Duplicate Number", "392. Is Subsequence"] },
      { id: 3, name: "Fixed Separation", problems: ["19. Remove Nth Node From End of List", "876. Middle of the Linked List", "2095. Delete the Middle Node of a Linked List"] },
      { id: 4, name: "In-place Array Modification", problems: ["26. Remove Duplicates from Sorted Array", "27. Remove Element", "75. Sort Colors", "80. Remove Duplicates from Sorted Array II", "283. Move Zeroes", "443. String Compression", "905. Sort Array By Parity", "2337. Move Pieces to Obtain a String", "2938. Separate Black and White Balls"] },
      { id: 5, name: "String Comparison with special characters", problems: ["844. Backspace String Compare", "1598. Crawler Log Folder", "2390. Removing Stars From a String"] },
      { id: 6, name: "Expanding From Center", problems: ["5. Longest Palindromic Substring", "647. Palindromic Substrings"] },
      { id: 7, name: "String Reversal", problems: ["151. Reverse Words in a String", "344. Reverse String", "345. Reverse Vowels of a String", "541. Reverse String II"] }
    ]
  },
  {
    category: "II. Sliding Window Patterns",
    patterns: [
      { id: 8, name: "Fixed Size", problems: ["346. Moving Average from Data Stream", "643. Maximum Average Subarray I", "2985. Calculate Compressed Mean", "3254. Find the Power of K-Size Subarrays I", "3318. Find X-Sum of All K-Long Subarrays I"] },
      { id: 9, name: "Variable Size", problems: ["3. Longest Substring Without Repeating Characters", "76. Minimum Window Substring", "209. Minimum Size Subarray Sum", "219. Contains Duplicate II", "424. Longest Repeating Character Replacement", "713. Subarray Product Less Than K", "904. Fruit Into Baskets", "1004. Max Consecutive Ones III", "1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit", "1493. Longest Subarray of 1's After Deleting One Element", "1658. Minimum Operations to Reduce X to Zero", "1838. Frequency of the Most Frequent Element", "2461. Maximum Sum of Distinct Subarrays With Length K", "2516. Take K of Each Character From Left and Right", "2762. Continuous Subarrays", "2779. Maximum Beauty of an Array After Applying Operation", "2981. Find Longest Special Substring That Occurs Thrice I", "3026. Maximum Good Subarray Sum", "3346. Maximum Frequency of an Element After Performing Operations I", "3347. Maximum Frequency of an Element After Performing Operations II"] },
      { id: 10, name: "Monotonic Queue for Max/Min", problems: ["239. Sliding Window Maximum", "862. Shortest Subarray with Sum at Least K", "1696. Jump Game VI"] },
      { id: 11, name: "Character Frequency Matching", problems: ["1. Two Sum", "438. Find All Anagrams in a String", "567. Permutation in String"] }
    ]
  },
  {
    category: "III. Tree Traversal Patterns (DFS & BFS)",
    patterns: [
      { id: 12, name: "Level Order Traversal", problems: ["102. Binary Tree Level Order Traversal", "103. Binary Tree Zigzag Level Order Traversal", "199. Binary Tree Right Side View", "515. Find Largest Value in Each Tree Row", "1161. Maximum Level Sum of a Binary Tree"] },
      { id: 13, name: "Recursive Preorder Traversal", problems: ["100. Same Tree", "101. Symmetric Tree", "105. Construct Binary Tree from Preorder and Inorder Traversal", "114. Flatten Binary Tree to Linked List", "226. Invert Binary Tree", "257. Binary Tree Paths", "988. Smallest String Starting From Leaf"] },
      { id: 14, name: "Recursive Inorder Traversal", problems: ["94. Binary Tree Inorder Traversal", "98. Validate Binary Search Tree", "173. Binary Search Tree Iterator", "230. Kth Smallest Element in a BST", "501. Find Mode in Binary Search Tree", "530. Minimum Absolute Difference in BST"] },
      { id: 15, name: "Recursive Postorder Traversal", problems: ["104. Maximum Depth of Binary Tree", "110. Balanced Binary Tree", "124. Binary Tree Maximum Path Sum", "145. Binary Tree Postorder Traversal", "337. House Robber III", "366. Find Leaves of Binary Tree", "543. Diameter of Binary Tree", "863. All Nodes Distance K in Binary Tree", "1110. Delete Nodes And Return Forest", "2458. Height of Binary Tree After Subtree Removal Queries"] },
      { id: 16, name: "Lowest Common Ancestor", problems: ["235. Lowest Common Ancestor of a Binary Search Tree", "236. Lowest Common Ancestor of a Binary Tree"] },
      { id: 17, name: "Serialization and Deserialization", problems: ["297. Serialize and Deserialize Binary Tree", "572. Subtree of Another Tree", "652. Find Duplicate Subtrees"] }
    ]
  },
  {
    category: "IV. Graph Traversal Patterns (DFS & BFS)",
    patterns: [
      { id: 18, name: "DFS - Connected Components / Island Counting", problems: ["130. Surrounded Regions", "200. Number of Islands", "417. Pacific Atlantic Water Flow", "547. Number of Provinces", "695. Max Area of Island", "733. Flood Fill", "841. Keys and Rooms", "1020. Number of Enclaves", "1254. Number of Closed Islands", "1905. Count Sub Islands", "2101. Detonate the Maximum Bombs"] },
      { id: 19, name: "BFS - Connected Components / Island Counting", problems: ["542. 01 Matrix", "994. Rotting Oranges", "1091. Shortest Path in Binary Matrix"] },
      { id: 20, name: "DFS - Cycle Detection", problems: ["207. Course Schedule", "210. Course Schedule II", "802. Find Eventual Safe States", "1059. All Paths from Source Lead to Destination"] },
      { id: 21, name: "BFS - Topological Sort (Kahn's Algorithm)", problems: ["210. Course Schedule II", "269. Alien Dictionary", "310. Minimum Height Trees", "444. Sequence Reconstruction", "1136. Parallel Courses", "1857. Largest Color Value in a Directed Graph", "2050. Parallel Courses III", "2115. Find All Possible Recipes from Given Supplies", "2392. Build a Matrix With Conditions"] },
      { id: 22, name: "Deep Copy / Cloning", problems: ["133. Clone Graph", "1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance", "138. Copy List with Random Pointer", "1490. Clone N-ary Tree"] },
      { id: 23, name: "Shortest Path", problems: ["743. Network Delay Time", "778. Swim in Rising Water", "1514. Path with Maximum Probability", "1631. Path With Minimum Effort", "1976. Number of Ways to Arrive at Destination", "2045. Second Minimum Time to Reach Destination", "2203. Minimum Weighted Subgraph With the Required Paths", "2290. Minimum Obstacle Removal to Reach Corner", "2577. Minimum Time to Visit a Cell In a Grid", "2812. Find the Safest Path in a Grid"] },
      { id: 24, name: "Shortest Path (Bellman-Ford / BFS+K)", problems: ["787. Cheapest Flights Within K Stops", "1129. Shortest Path with Alternating Colors"] },
      { id: 25, name: "Union-Find", problems: ["200. Number of Islands", "261. Graph Valid Tree", "305. Number of Islands II", "323. Number of Connected Components in an Undirected Graph", "547. Number of Provinces", "684. Redundant Connection", "721. Accounts Merge", "737. Sentence Similarity II", "947. Most Stones Removed with Same Row or Column", "952. Largest Component Size by Common Factor", "959. Regions Cut By Slashes", "1101. The Earliest Moment When Everyone Become Friends"] },
      { id: 26, name: "Strongly Connected Components (Kosaraju / Tarjan)", problems: ["210. Course Schedule II", "547. Number of Provinces", "1192. Critical Connections in a Network", "2127. Maximum Employees to Be Invited to a Meeting"] },
      { id: 27, name: "Bridges & Articulation Points (Tarjan low-link)", problems: ["1192. Critical Connections in a Network", "2360. Longest Cycle in a Graph"] },
      { id: 28, name: "Minimum Spanning Tree (Kruskal / Prim / DSU + heap)", problems: ["1135. Connecting Cities With Minimum Cost", "1584. Min Cost to Connect All Points", "1168. Optimize Water Distribution in a Village", "1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree"] },
      { id: 29, name: "Bidirectional BFS", problems: ["127. Word Ladder", "126. Word Ladder II", "815. Bus Routes"] }
    ]
  },
  {
    category: "V. Dynamic Programming (DP) Patterns",
    patterns: [
      { id: 30, name: "Fibonacci Style", problems: ["70. Climbing Stairs", "91. Decode Ways", "198. House Robber", "213. House Robber II", "337. House Robber III", "509. Fibonacci Number", "740. Delete and Earn", "746. Min Cost Climbing Stairs"] },
      { id: 31, name: "Kadane's Algorithm for Max/Min Subarray", problems: ["53. Maximum Subarray", "918. Maximum Sum Circular Subarray", "2321. Maximum Score Of Spliced Array", "1749. Maximum Absolute Sum of Any Subarray", "152. Maximum Product Subarray"] },
      { id: 32, name: "Coin Change / Unbounded Knapsack Style", problems: ["322. Coin Change", "377. Combination Sum IV", "518. Coin Change II"] },
      { id: 33, name: "0/1 Knapsack, Subset Sum Style", problems: ["416. Partition Equal Subset Sum", "494. Target Sum"] },
      { id: 34, name: "Word Break Style", problems: ["139. Word Break", "140. Word Break II"] },
      { id: 35, name: "Longest Common Subsequence - LCS", problems: ["1143. Longest Common Subsequence", "1092. Shortest Common Supersequence", "1312. Minimum Insertion Steps to Make a String Palindrome"] },
      { id: 36, name: "Edit Distance / Levenshtein Distance", problems: ["72. Edit Distance", "583. Delete Operation for Two Strings", "712. Minimum ASCII Delete Sum for Two Strings"] },
      { id: 37, name: "Unique Paths on Grid", problems: ["62. Unique Paths", "63. Unique Paths II", "64. Minimum Path Sum", "120. Triangle", "221. Maximal Square", "931. Minimum Falling Path Sum", "1277. Count Square Submatrices with All Ones"] },
      { id: 38, name: "Interval DP", problems: ["312. Burst Balloons", "546. Remove Boxes"] },
      { id: 39, name: "Catalan Numbers", problems: ["95. Unique Binary Search Trees II", "96. Unique Binary Search Trees", "241. Different Ways to Add Parentheses"] },
      { id: 40, name: "Longest Increasing Subsequence", problems: ["300. Longest Increasing Subsequence", "354. Russian Doll Envelopes", "1671. Minimum Number of Removals to Make Mountain Array", "2407. Longest Increasing Subsequence II"] },
      { id: 41, name: "Stock problems", problems: ["121. Best Time to Buy and Sell Stock", "122. Best Time to Buy and Sell Stock II", "123. Best Time to Buy and Sell Stock III", "188. Best Time to Buy and Sell Stock IV", "309. Best Time to Buy and Sell Stock with Cooldown"] }
    ]
  },
  {
    category: "VI. Heap (Priority Queue) Patterns",
    patterns: [
      { id: 42, name: "Top K Elements", problems: ["215. Kth Largest Element in an Array", "347. Top K Frequent Elements", "451. Sort Characters By Frequency", "506. Relative Ranks", "703. Kth Largest Element in a Stream", "973. K Closest Points to Origin", "1046. Last Stone Weight", "2558. Take Gifts From the Richest Pile"] },
      { id: 43, name: "Two Heaps for Median Finding", problems: ["295. Find Median from Data Stream", "1825. Finding MK Average"] },
      { id: 44, name: "K-way Merge", problems: ["23. Merge k Sorted Lists", "373. Find K Pairs with Smallest Sums", "378. Kth Smallest Element in a Sorted Matrix", "632. Smallest Range Covering Elements from K Lists"] },
      { id: 45, name: "Scheduling / Minimum Cost", problems: ["253. Meeting Rooms II", "767. Reorganize String", "857. Minimum Cost to Hire K Workers", "1642. Furthest Building You Can Reach", "1792. Maximum Average Pass Ratio", "1834. Single-Threaded CPU", "1942. The Number of the Smallest Unoccupied Chair", "2402. Meeting Rooms III"] }
    ]
  },
  {
    category: "VII. Backtracking Patterns",
    patterns: [
      { id: 46, name: "Subsets (Include/Exclude)", problems: ["17. Letter Combinations of a Phone Number", "77. Combinations", "78. Subsets", "90. Subsets II"] },
      { id: 47, name: "Permutations", problems: ["31. Next Permutation", "46. Permutations", "60. Permutation Sequence"] },
      { id: 48, name: "Combination Sum", problems: ["39. Combination Sum", "40. Combination Sum II"] },
      { id: 49, name: "Parentheses Generation", problems: ["22. Generate Parentheses", "301. Remove Invalid Parentheses"] },
      { id: 50, name: "Word Search / Path Finding in Grid", problems: ["79. Word Search", "212. Word Search II", "2018. Check if Word Can Be Placed In Crossword"] },
      { id: 51, name: "N-Queens / Constraint Satisfaction", problems: ["37. Sudoku Solver", "51. N-Queens"] },
      { id: 52, name: "Palindrome Partitioning", problems: ["131. Palindrome Partitioning", "132. Palindrome Partitioning II", "1457. Pseudo-Palindromic Paths in a Binary Tree"] }
    ]
  },
  {
    category: "VIII. Greedy Patterns",
    patterns: [
      { id: 53, name: "Interval Merging/Scheduling", problems: ["56. Merge Intervals", "57. Insert Interval", "759. Employee Free Time", "986. Interval List Intersections", "2406. Divide Intervals Into Minimum Number of Groups"] },
      { id: 54, name: "Jump Game Reachability/Minimization", problems: ["45. Jump Game II", "55. Jump Game"] },
      { id: 55, name: "Buy/Sell Stock", problems: ["121. Best Time to Buy and Sell Stock", "122. Best Time to Buy and Sell Stock II"] },
      { id: 56, name: "Gas Station Circuit", problems: ["134. Gas Station", "2202. Maximize the Topmost Element After K Moves"] },
      { id: 57, name: "Task Scheduling", problems: ["621. Task Scheduler", "767. Reorganize String", "1054. Distant Barcodes"] },
      { id: 58, name: "Sorting Based", problems: ["455. Assign Cookies", "135. Candy", "406. Queue Reconstruction by Height", "1029. Two City Scheduling"] }
    ]
  },
  {
    category: "IX. Binary Search Patterns",
    patterns: [
      { id: 59, name: "On Sorted Array/List", problems: ["35. Search Insert Position", "69. Sqrt(x)", "74. Search a 2D Matrix", "278. First Bad Version", "374. Guess Number Higher or Lower", "540. Single Element in a Sorted Array", "704. Binary Search", "1539. Kth Missing Positive Number"] },
      { id: 60, name: "Find Min/Max in Rotated Sorted Array", problems: ["33. Search in Rotated Sorted Array", "81. Search in Rotated Sorted Array II", "153. Find Minimum in Rotated Sorted Array", "162. Find Peak Element", "852. Peak Index in a Mountain Array", "1095. Find in Mountain Array"] },
      { id: 61, name: "On Answer / Condition Function", problems: ["410. Split Array Largest Sum", "774. Minimize Max Distance to Gas Station", "875. Koko Eating Bananas", "1011. Capacity To Ship Packages Within D Days", "1482. Minimum Number of Days to Make m Bouquets", "1760. Minimum Limit of Balls in a Bag", "2064. Minimized Maximum of Products Distributed to Any Store", "2226. Maximum Candies Allocated to K Children"] },
      { id: 62, name: "Find First/Last Occurrence", problems: ["34. Find First and Last Position of Element in Sorted Array", "658. Find K Closest Elements"] },
      { id: 63, name: "Median / Kth across Two Sorted Arrays", problems: ["4. Median of Two Sorted Arrays", "719. Find K-th Smallest Pair Distance", "378. Kth Smallest Element in a Sorted Matrix"] }
    ]
  },
  {
    category: "X. Stack Patterns",
    patterns: [
      { id: 64, name: "Valid Parentheses Matching", problems: ["20. Valid Parentheses", "32. Longest Valid Parentheses", "921. Minimum Add to Make Parentheses Valid", "1249. Minimum Remove to Make Valid Parentheses", "1963. Minimum Number of Swaps to Make the String Balanced"] },
      { id: 65, name: "Monotonic Stack", problems: ["402. Remove K Digits", "496. Next Greater Element I", "503. Next Greater Element II", "739. Daily Temperatures", "901. Online Stock Span", "907. Sum of Subarray Minimums", "962. Maximum Width Ramp", "1475. Final Prices With a Special Discount in a Shop", "1673. Find the Most Competitive Subsequence"] },
      { id: 66, name: "Expression Evaluation", problems: ["150. Evaluate Reverse Polish Notation", "224. Basic Calculator", "227. Basic Calculator II", "772. Basic Calculator III"] },
      { id: 67, name: "Simulation / Backtracking Helper", problems: ["71. Simplify Path", "394. Decode String", "735. Asteroid Collision"] },
      { id: 68, name: "Min Stack Design", problems: ["155. Min Stack", "895. Maximum Frequency Stack", "901. Online Stock Span"] },
      { id: 69, name: "Largest Rectangle in Histogram", problems: ["84. Largest Rectangle in Histogram", "85. Maximal Rectangle"] }
    ]
  },
  {
    category: "XI. Bit Manipulation Patterns",
    patterns: [
      { id: 70, name: "Bitwise XOR - Finding Single/Missing Number", problems: ["136. Single Number", "137. Single Number II", "268. Missing Number", "389. Find the Difference"] },
      { id: 71, name: "Bitwise AND - Counting Set Bits (Hamming Weight)", problems: ["191. Number of 1 Bits", "231. Power of Two", "477. Total Hamming Distance"] },
      { id: 72, name: "Bitwise DP - Counting Bits Optimization", problems: ["338. Counting Bits", "1494. Parallel Courses II", "1442. Count Triplets That Can Form Two Arrays of Equal XOR"] },
      { id: 73, name: "Bitwise Operations - Power of Two/Four Check", problems: ["231. Power of Two", "342. Power of Four"] }
    ]
  },
  {
    category: "XII. Linked List Manipulation Patterns",
    patterns: [
      { id: 74, name: "In-place Reversal", problems: ["83. Remove Duplicates from Sorted List", "92. Reverse Linked List II", "206. Reverse Linked List", "25. Reverse Nodes in k-Group", "234. Palindrome Linked List", "82. Remove Duplicates from Sorted List II"] },
      { id: 75, name: "Merging Two Sorted Lists", problems: ["21. Merge Two Sorted Lists", "Merge k Sorted Lists"] },
      { id: 76, name: "Addition of Numbers", problems: ["2. Add Two Numbers", "369. Plus One Linked List"] },
      { id: 77, name: "Intersection Detection", problems: ["160. Intersection of Two Linked Lists", "599. Minimum Index Sum of Two Lists"] },
      { id: 78, name: "Reordering / Partitioning", problems: ["24. Swap Nodes in Pairs", "61. Rotate List", "86. Partition List", "143. Reorder List", "328. Odd Even Linked List"] }
    ]
  },
  {
    category: "XIII. Array/Matrix Manipulation Patterns",
    patterns: [
      { id: 79, name: "In-place Rotation", problems: ["48. Rotate Image", "189. Rotate Array", "867. Transpose Matrix"] },
      { id: 80, name: "Spiral Traversal", problems: ["54. Spiral Matrix", "59. Spiral Matrix II", "885. Spiral Matrix III", "2326. Spiral Matrix IV"] },
      { id: 81, name: "In-place Marking", problems: ["73. Set Matrix Zeroes", "289. Game of Life", "498. Diagonal Traverse"] },
      { id: 82, name: "Prefix/Suffix Products", problems: ["238. Product of Array Except Self", "845. Longest Mountain in Array", "2483. Minimum Penalty for a Shop"] },
      { id: 83, name: "Plus One", problems: ["66. Plus One", "43. Multiply Strings", "989. Add to Array-Form of Integer", "67. Add Binary"] },
      { id: 84, name: "In-place from End", problems: ["88. Merge Sorted Array", "977. Squares of a Sorted Array"] },
      { id: 85, name: "Cyclic Sort", problems: ["41. First Missing Positive", "268. Missing Number", "287. Find the Duplicate Number", "442. Find All Duplicates in an Array", "448. Find All Numbers Disappeared in an Array"] }
    ]
  },
  {
    category: "XIV. String Manipulation Patterns",
    patterns: [
      { id: 86, name: "Palindrome Check", problems: ["9. Palindrome Number", "125. Valid Palindrome", "680. Valid Palindrome II"] },
      { id: 87, name: "Anagram Check", problems: ["49. Group Anagrams", "242. Valid Anagram"] },
      { id: 88, name: "Roman to Integer Conversion", problems: ["13. Roman to Integer", "12. Integer to Roman"] },
      { id: 89, name: "String to Integer (atoi)", problems: ["8. String to Integer (atoi)", "65. Valid Number"] },
      { id: 90, name: "Manual Simulation", problems: ["43. Multiply Strings", "415. Add Strings", "67. Add Binary"] },
      { id: 91, name: "String Matching - Naive / KMP / Rabin-Karp", problems: ["28. Find the Index of the First Occurrence in a String", "214. Shortest Palindrome", "686. Repeated String Match", "796. Rotate String", "3008. Find Beautiful Indices in the Given Array II"] },
      { id: 92, name: "Repeated Substring Pattern Detection", problems: ["459. Repeated Substring Pattern", "28. Find the Index of the First Occurrence in a String", "686. Repeated String Match"] }
    ]
  },
  {
    category: "XV. Design Patterns",
    patterns: [
      { id: 93, name: "Design (General/Specific)", problems: ["146. LRU Cache", "155. Min Stack", "225. Implement Stack using Queues", "232. Implement Queue using Stacks", "251. Flatten 2D Vector", "271. Encode and Decode Strings", "295. Find Median from Data Stream", "341. Flatten Nested List Iterator", "346. Moving Average from Data Stream", "353. Design Snake Game", "359. Logger Rate Limiter", "362. Design Hit Counter", "379. Design Phone Directory", "380. Insert Delete GetRandom O(1)", "432. All O`one Data Structure", "460. LFU Cache", "604. Design Compressed String Iterator", "622. Design Circular Queue", "641. Design Circular Deque", "642. Design Search Autocomplete System", "706. Design HashMap", "715. Range Module", "900. RLE Iterator", "981. Time Based Key-Value Store", "1146. Snapshot Array", "1348. Tweet Counts Per Frequency", "1352. Product of the Last K Numbers", "1381. Design a Stack With Increment Operation", "1756. Design Most Recently Used Queue", "2013. Detect Squares", "2034. Stock Price Fluctuation", "2296. Design a Text Editor", "2336. Smallest Number in Infinite Set"] },
      { id: 94, name: "Tries", problems: ["208. Implement Trie (Prefix Tree)", "211. Design Add and Search Words Data Structure", "720. Longest Word in Dictionary", "648. Replace Words", "425. Word Squares", "642. Design Search Autocomplete System", "745. Prefix and Suffix Search"] }
    ]
  }
]

export default function NinetyPatternsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPatterns = ninetyPatterns.map(category => ({
    ...category,
    patterns: category.patterns.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.problems.some(prob => prob.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.patterns.length > 0)

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-blue-500/10 overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-black/[0.05] dark:border-white/[0.05] bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-black dark:bg-white rounded flex items-center justify-center transition-transform duration-300">
              <Zap className="w-4 h-4 text-white dark:text-black fill-current" />
            </div>
            <span className="text-lg font-bold tracking-tight text-black dark:text-white">
              CodePath
            </span>
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/patterns" className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
              Patterns
            </Link>
            <Link href="/mastery" className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-widest">
              Mastery
            </Link>
            <Link href="/ninety-patterns" className="text-xs font-medium text-black dark:text-white uppercase tracking-widest">
              90 Patterns
            </Link>
            <Link href="/interview-questions">
              <Button size="sm" variant="ghost" className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white">
                Practice Kit
              </Button>
            </Link>
            <div className="border-l border-black/[0.05] dark:border-white/[0.05] pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-16 text-center space-y-6">
        <Badge variant="outline" className="px-3 py-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 uppercase tracking-widest text-[10px] font-black">
          Ultimate Curriculum
        </Badge>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.1]">
          The <span className="text-slate-400 dark:text-slate-500 italic">94 Patterns</span> Roadmap
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
          A comprehensive guide covering every major algorithmic pattern and data structure design. 
          Master these to unlock high-level problem solving intuition.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto pt-8 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          </div>
          <Input 
            type="text" 
            placeholder="Search patterns or problems (e.g. 'Sliding Window')..." 
            className="pl-12 py-6 bg-slate-50 dark:bg-slate-900/50 border-black/[0.05] dark:border-slate-800 focus:ring-black dark:focus:ring-white transition-all rounded-2xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="space-y-16">
          {filteredPatterns.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-black/[0.05] dark:bg-slate-800" />
                <h2 className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-[0.3em] px-4">
                  {cat.category}
                </h2>
                <div className="h-px flex-1 bg-black/[0.05] dark:bg-slate-800" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.patterns.map((pattern) => (
                  <Card key={pattern.id} className="bg-slate-50 dark:bg-slate-900/40 border-black/[0.05] dark:border-slate-800 hover:border-black/[0.1] dark:hover:border-blue-500/50 transition-all duration-300 group rounded-3xl overflow-hidden glass-panel">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded">
                          P-{String(pattern.id).padStart(2, '0')}
                        </Badge>
                        <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                      </div>
                      <CardTitle className="text-xl font-bold tracking-tight text-black dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                        {pattern.name}
                      </CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-600 text-[10px] font-black uppercase tracking-widest mt-1">
                        {pattern.problems.length} Curated Problems
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-48 pr-4">
                        <ul className="space-y-4">
                          {pattern.problems.map((prob, pIdx) => {
                            const match = prob.match(/^(\d+)\.\s*(.*)$/)
                            const id = match ? match[1] : null
                            const title = match ? match[2] : prob
                            const url = id ? `https://leetcode.com/problems/${title.toLowerCase().replace(/\s+/g, '-')}/` : '#'
                            
                            return (
                              <li key={pIdx} className="text-sm text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors flex items-start gap-3 group/item font-medium">
                                <span className="text-black/[0.1] dark:text-white/[0.1] mt-1.5 w-1 h-1 rounded-full bg-current" />
                                <Link 
                                  href={url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-between group-hover/item:text-black dark:group-hover/item:text-white"
                                >
                                  <span className="group-hover/item:underline">{prob}</span>
                                  <ExternalLink className="w-3 h-3 opacity-20 group-hover/item:opacity-100 transition-all flex-shrink-0 ml-2" />
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-slate-950/50 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 max-w-xs text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Zap className="w-4 h-4 text-black dark:text-white fill-current" />
              <span className="font-bold text-black dark:text-white text-lg tracking-tight">CodePath</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-medium">
              Curated roadmap based on high-frequency interview patterns. Master the patterns, win the interview.
            </p>
          </div>
          <div className="flex gap-12 text-[10px] font-bold text-slate-500 dark:text-slate-600 uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <Link href="/patterns" className="hover:text-black dark:hover:text-white transition-colors">Patterns</Link>
            <Link href="/mastery" className="hover:text-black dark:hover:text-white transition-colors">Mastery</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
