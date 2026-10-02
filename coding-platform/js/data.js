// data.js - the problem database (30 problems).
// makeProblem() just turns the values into one object with named fields.
// "keywords": the simulated checker accepts code containing at least ONE of them.

function makeProblem(id, title, difficulty, topic, description, input, output, constraints, exIn, exOut, explanation, starter, keywords) {
  return {
    id: id, title: title, difficulty: difficulty, topic: topic,
    description: description, input: input, output: output, constraints: constraints,
    examples: [{ input: exIn, output: exOut }],
    explanation: explanation, starter: starter, keywords: keywords
  };
}

const PROBLEMS = [
  // ---------- Basics ----------
  makeProblem(1, "Hello World", "Easy", "Functions", "Print the message Hello, World! on the screen.", "No input.", "Print Hello, World!", "None.", "(no input)", "Hello, World!", "Every programmer starts here: print text to the screen.", "print Hello, World!", ["Hello, World!"]),
  makeProblem(2, "Add Two Numbers", "Easy", "Basic Mathematics", "Read two integers and print their sum.", "Two integers a and b.", "One integer: a + b.", "-1000 <= a, b <= 1000", "3 5", "8", "3 + 5 = 8.", "read a and b, print a + b", ["+", "sum"]),
  makeProblem(3, "Even or Odd", "Easy", "Basic Mathematics", "Read an integer and print Even if it is divisible by 2, otherwise print Odd.", "One integer n.", "Even or Odd.", "-10^6 <= n <= 10^6", "7", "Odd", "7 % 2 is 1, so 7 is odd.", "use the % operator to print Even or Odd", ["%", "&"]),
  makeProblem(4, "Positive, Negative or Zero", "Easy", "Basic Mathematics", "Read an integer and tell whether it is Positive, Negative or Zero.", "One integer n.", "Positive, Negative or Zero.", "-10^9 <= n <= 10^9", "-4", "Negative", "-4 is less than 0.", "use if / else if / else on n", ["if"]),
  makeProblem(5, "Largest of Two Numbers", "Easy", "Basic Mathematics", "Read two integers and print the larger one.", "Two integers a and b.", "The larger number.", "-10^9 <= a, b <= 10^9", "10 25", "25", "25 is greater than 10.", "compare a and b, print the larger", ["if", "max", "?"]),
  makeProblem(6, "Largest of Three Numbers", "Easy", "Basic Mathematics", "Read three integers and print the largest.", "Three integers a, b and c.", "The largest number.", "-10^9 <= a, b, c <= 10^9", "4 9 2", "9", "9 is bigger than 4 and 2.", "compare three numbers, print the largest", ["if", "max", "?"]),
  makeProblem(7, "Multiplication Table", "Easy", "Loops", "Read n and print its multiplication table from 1 to 10.", "One integer n.", "10 lines in the form n x i = result.", "1 <= n <= 100", "5", "5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50", "A loop runs from 1 to 10 and prints n * i each time.", "loop i from 1 to 10 and print n x i = n*i", ["for", "while"]),

  // ---------- Loops ----------
  makeProblem(8, "Sum of N Numbers", "Easy", "Loops", "Print the sum of the first N natural numbers (1 + 2 + ... + N).", "One integer N.", "The sum.", "1 <= N <= 10^5", "5", "15", "1+2+3+4+5 = 15.", "add 1..N using a loop", ["for", "while", "sum"]),
  makeProblem(9, "Factorial", "Easy", "Functions", "Print the factorial of n (n! = 1 x 2 x ... x n).", "One integer n.", "n!", "0 <= n <= 12", "5", "120", "5! = 5 x 4 x 3 x 2 x 1 = 120.", "multiply 1..n in a loop or function", ["for", "while", "fact", "*"]),
  makeProblem(10, "Fibonacci Series", "Easy", "Loops", "Print the first N Fibonacci numbers. Each number is the sum of the previous two.", "One integer N.", "N numbers separated by spaces.", "1 <= N <= 40", "7", "0 1 1 2 3 5 8", "Start 0 and 1, then keep adding the last two.", "keep two variables a and b and update them in a loop", ["for", "while"]),
  makeProblem(11, "Reverse a Number", "Medium", "Loops", "Reverse the digits of an integer.", "One positive integer n.", "The reversed number.", "1 <= n <= 10^9", "1234", "4321", "Take the last digit (n % 10) again and again.", "use % 10 and / 10 in a loop", ["%", "[::-1]", "reverse"]),
  makeProblem(12, "Palindrome Number", "Medium", "Loops", "Check whether a number reads the same forwards and backwards.", "One positive integer n.", "Palindrome or Not Palindrome.", "1 <= n <= 10^9", "121", "Palindrome", "121 reversed is 121.", "reverse n and compare it with the original", ["%", "[::-1]", "reverse"]),
  makeProblem(13, "Count Digits", "Easy", "Loops", "Count how many digits an integer has.", "One positive integer n.", "The number of digits.", "1 <= n <= 10^9", "12345", "5", "12345 has 5 digits.", "divide n by 10 until it becomes 0", ["while", "for", "len"]),
  makeProblem(14, "Prime Number Check", "Medium", "Basic Mathematics", "Check whether a number is prime (only divisible by 1 and itself).", "One integer n.", "Prime or Not Prime.", "1 <= n <= 10^6", "17", "Prime", "17 has no divisor between 2 and 16.", "test divisors from 2 upward using %", ["%"]),

  // ---------- Arrays ----------
  makeProblem(15, "Find Maximum Element", "Easy", "Arrays", "Find the largest element in an array.", "n, then n integers.", "The maximum value.", "1 <= n <= 1000", "5\n3 9 2 7 1", "9", "9 is the biggest value.", "loop through the array keeping the largest so far", ["for", "max"]),
  makeProblem(16, "Find Minimum Element", "Easy", "Arrays", "Find the smallest element in an array.", "n, then n integers.", "The minimum value.", "1 <= n <= 1000", "5\n3 9 2 7 1", "1", "1 is the smallest value.", "loop through the array keeping the smallest so far", ["for", "min"]),
  makeProblem(17, "Sum of Array", "Easy", "Arrays", "Print the sum of all elements of an array.", "n, then n integers.", "The sum.", "1 <= n <= 1000", "4\n1 2 3 4", "10", "1+2+3+4 = 10.", "add every element to a total", ["for", "while", "sum"]),
  makeProblem(18, "Reverse an Array", "Easy", "Arrays", "Print the array in reverse order.", "n, then n integers.", "The elements in reverse order.", "1 <= n <= 1000", "4\n1 2 3 4", "4 3 2 1", "Read the array from the last index to 0.", "loop from index n-1 down to 0", ["for", "reverse", "[::-1]", "while"]),
  makeProblem(19, "Find Second Largest", "Medium", "Arrays", "Find the second largest distinct element of an array.", "n, then n integers.", "The second largest value.", "2 <= n <= 1000", "5\n3 9 2 7 1", "7", "9 is largest and 7 comes next.", "track both the largest and second largest", ["for", "sort", "second"]),
  makeProblem(20, "Count Even and Odd Numbers", "Easy", "Arrays", "Count how many elements are even and how many are odd.", "n, then n integers.", "Two numbers: even count and odd count.", "1 <= n <= 1000", "5\n1 2 3 4 6", "Even: 3 Odd: 2", "2, 4, 6 are even; 1 and 3 are odd.", "check each element with % 2", ["%", "&"]),

  // ---------- Strings ----------
  makeProblem(21, "Reverse a String", "Easy", "Strings", "Print a string in reverse.", "One string s.", "The reversed string.", "1 <= length <= 1000", "hello", "olleh", "Read characters from the end to the start.", "loop from the last character to the first", ["for", "reverse", "[::-1]", "while"]),
  makeProblem(22, "Palindrome String", "Medium", "Strings", "Check whether a string is a palindrome.", "One string s (lowercase).", "Palindrome or Not Palindrome.", "1 <= length <= 1000", "madam", "Palindrome", "madam reversed is madam.", "compare characters from both ends", ["for", "while", "[::-1]", "reverse"]),
  makeProblem(23, "Count Vowels", "Easy", "Strings", "Count the vowels (a, e, i, o, u) in a string.", "One lowercase string s.", "The number of vowels.", "1 <= length <= 1000", "education", "5", "e, u, a, i, o are vowels.", "check each character against a, e, i, o, u", ["for", "while", "'a'", "\"a\"", "aeiou"]),
  makeProblem(24, "Count Characters", "Easy", "Strings", "Print the number of characters in a string.", "One string s.", "The length of s.", "1 <= length <= 1000", "coding", "6", "coding has 6 letters.", "count characters (loop, strlen, len or length)", ["len", "length", "strlen", "size", "for", "while"]),
  makeProblem(25, "Remove Spaces", "Easy", "Strings", "Remove all spaces from a string.", "One string s (may contain spaces).", "The string without spaces.", "1 <= length <= 1000", "a b c", "abc", "Spaces are skipped, other characters are kept.", "copy only the non-space characters", ["for", "replace", "while"]),

  // ---------- Searching & Sorting ----------
  makeProblem(26, "Linear Search", "Easy", "Searching", "Find the position (index) of a value in an array, or -1 if it is missing.", "n, n integers, then the target.", "The index or -1.", "1 <= n <= 1000", "5\n4 8 1 9 3\n9", "3", "9 is at index 3 (counting from 0).", "check each element one by one", ["for", "while", "index"]),
  makeProblem(27, "Binary Search", "Hard", "Searching", "In a SORTED array, find the index of a value using binary search, or -1.", "n, n sorted integers, then the target.", "The index or -1.", "1 <= n <= 10^5", "5\n1 3 5 7 9\n7", "3", "Check the middle, then discard half of the array each step.", "use low, high and mid", ["mid"]),
  makeProblem(28, "Bubble Sort", "Medium", "Sorting", "Sort an array in ascending order using bubble sort.", "n, then n integers.", "The sorted array.", "1 <= n <= 1000", "5\n5 1 4 2 8", "1 2 4 5 8", "Neighbouring elements are swapped when out of order.", "use two nested loops and swap neighbours", ["for", "while"]),
  makeProblem(29, "Selection Sort", "Medium", "Sorting", "Sort an array in ascending order using selection sort.", "n, then n integers.", "The sorted array.", "1 <= n <= 1000", "5\n64 25 12 22 11", "11 12 22 25 64", "Pick the smallest remaining element and put it in place.", "find the minimum of the unsorted part, then swap", ["for", "while", "min"]),
  makeProblem(30, "Insertion Sort", "Hard", "Sorting", "Sort an array in ascending order using insertion sort.", "n, then n integers.", "The sorted array.", "1 <= n <= 1000", "5\n12 11 13 5 6", "5 6 11 12 13", "Insert each element into its correct place in the sorted part.", "shift bigger elements right, then insert the key", ["key", "while", "for"])
];
