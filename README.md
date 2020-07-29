### Live demo []()

### Practical questions

#### 1. Write a function that removes duplicates elements of an array and return an array of unique elements only.
For example:
```
function unique(arr) { ... }
var arr = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];
unique(arr); // result: [1, 2, 3, 5, 9, 8]
```
```
const arr = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

function unique(arr) {
  return [...new Set(arr)];	
}

unique(arr)
```

#### 2. Implement the following function:
```
function duplicate (arr, times) {...}
duplicate([1, 2, 3, 4, 5],3); // [1,2,3,4,5,1,2,3,4,5,1,2,3,4,5]
```
```
function duplicate (arr, times) {
  let array = []
  for(let i = 0; i < times; i++) {
    array = [...array, ...arr];
  }
  return array
}

duplicate([1, 2, 3, 4, 5],3);
```

#### 3. Write a function isAnagram, that gets two strings and return true if they are anagrams of one another.
For example: Mary is an anagram of Army. Mar1y is not an anagram of Army
```
function isAnagram (str1, str2) {...}
isAnagram("Mary","Army"); // true
isAnagram("Mar1y","Army"); // false
```
```
function isAnagram (str1, str2) {
  if (str1.length !== str2.length) return false;
  let sortStr1 = str1.toLowerCase().split("").sort().join("");
  let sortStr2 = str2.toLowerCase().split("").sort().join("");
  for (var i = 0; i < str1.length; i++) {
    if ((sortStr1.charAt(i)) !== (sortStr2.charAt(i))) {
      return false;
    }
  }
  return true;
}

isAnagram("Mary","Army"); // true
isAnagram("Mar1y","Army"); // false
```

#### 4. What are exceptions? Which keywords are used to handle exceptions and what are the meaning of each of these keywords? Write a short example for such a use

**Exceptions** are special situations that need to be handled.

There are following keywords that handle if any exception occurs:
- throw;
- try…catch;
- try…catch…finally.

**try{}**: here, the code which needs possible error testing is kept within the try block. In case any error occur, it passes to the catch{} block for taking suitable actions and handle the error. Otherwise, it executes the code written within.

**catch{}**: this block handles the error of the code by executing the set of statements written within the block. This block contains either the user-defined exception handler or the built-in handler. This block executes only when any error-prone code needs to be handled in the try block. Otherwise, the catch block is skipped.

```
try {
  var a = ["34", "32", "5", "31", "24", "44", "67"] // a is an array
  document.write(a); // displays elements of a
  document.write(b); // b is undefined but still trying to fetch its value. Thus catch block will be invoked
} catch (e) {
  alert("There is error which shows " + e.message); // handling error
}
```

**Throw** are used for throwing user-defined errors. User can define and throw his own custom errors. When throw statement is executed, the statements present after it will not execute. The control will directly pass to the catch block.

```
try {
  throw new Error("This is the throw keyword"); // user-defined throw statement
} catch (e) {
  document.write(e.message); // this will generate an error message
}
```

**Finally** is an optional block of statements which is executed after the execution of try and catch statements. Finally block does not hold for the exception to be thrown. Any exception is thrown or not, finally block code, if present, will definitely execute. It does not care for the output too.

```
try {
  var a = 2;
  if (a == 2) document.write("ok");
} catch (e) {
  document.write("Error found " + e.message);
} finally {
  document.write("Value of a is 2");
}
```

### React native questions

#### 1. What is the InteractionManager and how is it used? Why is it important?

The InteractionManager is a native module present in React Native with the workability of deferring the execution of a function until an “interaction” has finished. This module is crucial because React Native has only one thread for making UI updates which can be overloaded and result in drop frames. Developers use interaction manager to ensure that the function is only executed after the animations occurred so that any frame drops may not result.

#### 2. Describe how events are handled in React?

React does not connect directly to a DOM event, but rather Synthetic Events that are wrappers for DOM events. When dealing with events for React elements, we can take a similar approach as when handling events on regular DOM elements. There are a couple of differences such as React events being named using camelCase, and we pass a function as the event handler, rather than a string. When using classes to define a component, a common pattern is for an event handler to be a method on the class.
