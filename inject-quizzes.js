const fs = require('fs')
const path = require('path')

const QUIZZES = {
  'beginner/01-introduction.html': [
    { q: "What symbol is used for single-line comments in Python?", options: ["//", "#", "/*", "--"], a: 1, e: "In Python, # is used for single-line comments. Everything after # on that line is ignored by Python." },
    { q: "What does the print() function do?", options: ["Reads user input", "Displays output to the screen", "Creates a new variable", "Stops the program"], a: 1, e: "print() displays output (text, numbers, etc.) to the screen. It is one of the most used Python functions." },
    { q: "What is the result of 2 ** 10 in Python?", options: ["12", "20", "100", "1024"], a: 3, e: "** is the exponentiation operator. 2 ** 10 means 2 raised to the power of 10, which equals 1024." },
    { q: "How do you check which Python version is installed?", options: ["python check", "python --version", "version python", "python v"], a: 1, e: "Run 'python --version' (or 'python -V') in your terminal to see the installed Python version." },
    { q: "Which of these is a valid print statement?", options: ["print('Hello')", "print Hello", "print('Hello'", "Print('Hello')"], a: 0, e: "Python is case-sensitive and requires parentheses: print('Hello'). The built-in function is lowercase 'print'." }
  ],
  'beginner/02-variables.html': [
    { q: "Which of the following creates a variable in Python?", options: ["var x = 5", "x = 5", "int x = 5", "variable x == 5"], a: 1, e: "Python creates variables by simple assignment: x = 5. No type declaration or keyword needed." },
    { q: "What is the type of 42 in Python?", options: ["float", "str", "int", "bool"], a: 2, e: "42 is an int (integer). Whole numbers without a decimal point are of type int." },
    { q: "What does type(3.14) return?", options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'decimal'>"], a: 1, e: "3.14 has a decimal point, so type(3.14) returns <class 'float'>." },
    { q: "Which variable name is NOT valid in Python?", options: ["student_name", "_score", "2nd_place", "total"], a: 2, e: "Variable names cannot start with a number. '2nd_place' would cause a SyntaxError." },
    { q: "What is the result of int('42')?", options: ["'42'", "42", "'int'", "Error"], a: 1, e: "int('42') converts the string '42' to the integer 42." }
  ],
  'beginner/03-strings.html': [
    { q: "What does 'a' + 'b' produce in Python?", options: ["'ab'", "'a b'", "2", "Error"], a: 0, e: "The + operator concatenates (joins) strings: 'a' + 'b' produces 'ab'." },
    { q: "What is the output of 'Py' * 3?", options: ["'PyPyPy'", "'Py3'", "Error", "'P y P y P y'"], a: 0, e: "Multiplying a string by an integer repeats it: 'Py' * 3 equals 'PyPyPy'." },
    { q: "What does 'Python'[0] return?", options: ["'P'", "'y'", "0", "Error"], a: 0, e: "Indexing starts at 0 in Python. 'Python'[0] returns 'P', the first character." },
    { q: "What does 'Python'[1:4] return?", options: ["'Pyt'", "'yth'", "'yho'", "'Pyth'"], a: 1, e: "Slicing [1:4] starts at index 1 and goes up to (but not including) index 4, giving 'yth'." },
    { q: "Which method converts a string to uppercase?", options: ["upper()", "upcase()", "toUpper()", "capital()"], a: 0, e: "Python strings have the upper() method: 'hello'.upper() returns 'HELLO'." }
  ],
  'beginner/04-conditionals.html': [
    { q: "What does the == operator do in Python?", options: ["Assigns a value", "Compares for equality", "Is not valid", "Raises an error"], a: 1, e: "== checks if two values are equal. A single = is used for assignment, == for comparison." },
    { q: "What is the correct way to write an if statement?", options: ["if x = 5:", "if x == 5:", "if (x == 5)", "if x == 5 then"], a: 1, e: "An if statement uses == for comparison and ends with a colon: if x == 5:" },
    { q: "Which logical operator means AND?", options: ["&&", "and", "&", "AND"], a: 1, e: "Python uses the word 'and' (not && like in C/JavaScript). Both conditions must be true." },
    { q: "What is the output of this code?\nif 5 > 3:\n    print('big')\nelse:\n    print('small')", options: ["'big'", "'small'", "both", "nothing"], a: 0, e: "Since 5 > 3 is True, the if branch runs and prints 'big'." },
    { q: "Which of these values is considered falsy in Python?", options: ["1", "'text'", "0", "[1, 2]"], a: 2, e: "0 is falsy. Empty containers, 0, None, and False are all considered falsy in boolean contexts." }
  ],
  'beginner/05-loops.html': [
    { q: "What does range(3) generate?", options: ["[0, 1, 2]", "[1, 2, 3]", "[0, 1, 2, 3]", "[1, 2]"], a: 0, e: "range(3) produces the numbers 0, 1, 2 (starts at 0, stops before 3)." },
    { q: "How many times does 'for i in range(5)' run its body?", options: ["4", "5", "6", "1"], a: 1, e: "range(5) yields 0, 1, 2, 3, 4 — five values, so the body runs 5 times." },
    { q: "What keyword exits a loop immediately?", options: ["exit", "stop", "break", "return"], a: 2, e: "The break statement exits the loop immediately, skipping any remaining iterations." },
    { q: "What keyword skips the rest of the current iteration?", options: ["skip", "pass", "next", "continue"], a: 3, e: "continue jumps to the next iteration, skipping any code after it in the current one." },
    { q: "A while loop repeats as long as its condition is...", options: ["True", "False", "5", "a string"], a: 0, e: "A while loop runs while its condition evaluates to True. It stops when the condition becomes False." }
  ],
  'beginner/06-lists.html': [
    { q: "How do you access the first item of a list?", options: ["list[1]", "list[0]", "list.first()", "list[-0]"], a: 1, e: "List indexing starts at 0, so the first item is list[0]." },
    { q: "What does list[-1] return?", options: ["The first item", "An error", "The last item", "None"], a: 2, e: "Negative indexing counts from the end. -1 is the last item, -2 the second-to-last, etc." },
    { q: "Which method adds an item to the END of a list?", options: ["append()", "add()", "push()", "insert()"], a: 0, e: "list.append(x) adds x to the end. insert() adds at a specific position." },
    { q: "What is the main difference between a list and a tuple?", options: ["Lists are ordered, tuples are not", "Lists are mutable, tuples are immutable", "Tuples can hold more items", "There is no difference"], a: 1, e: "Lists are mutable (can change), while tuples are immutable (cannot change after creation)." },
    { q: "What does len([10, 20, 30]) return?", options: ["3", "30", "60", "Error"], a: 0, e: "len() returns the number of items. The list has 3 items, so it returns 3." }
  ],
  'beginner/07-dicts-sets.html': [
    { q: "What does a dictionary store?", options: ["Only numbers", "Key-value pairs", "Only strings", "Unordered values only"], a: 1, e: "Dictionaries store key-value pairs, like a real dictionary mapping a word to its meaning." },
    { q: "How do you get a value from a dictionary?", options: ["dict.value(key)", "dict[key]", "dict.key", "dict[key()]"], a: 1, e: "Use square brackets with the key: person['name'] returns the value for the 'name' key." },
    { q: "Which method adds or updates a key in a dict?", options: ["dict.add()", "dict[key] = value", "dict.insert()", "dict.setup()"], a: 1, e: "Assignment dict[key] = value adds a new key or updates an existing one." },
    { q: "What is TRUE about a set?", options: ["It stores ordered items", "It only stores unique items", "It stores key-value pairs", "It can contain duplicates"], a: 1, e: "Sets store only unique items. Duplicates are automatically removed." },
    { q: "What does the union (|) operator do with sets?", options: ["Finds common items", "Combines all items from both sets", "Removes items", "Sorts the sets"], a: 1, e: "Set union combines all unique items from both sets. {1,2} | {2,3} gives {1,2,3}." }
  ],
  'beginner/08-functions.html': [
    { q: "What keyword is used to define a function?", options: ["function", "def", "func", "define"], a: 1, e: "Python uses 'def' to define a function: def greet(): ..." },
    { q: "What keyword returns a value from a function?", options: ["return", "give", "send", "out"], a: 0, e: "The return statement sends a value back to the caller." },
    { q: "What is a parameter?", options: ["A value a function outputs", "An input a function receives", "A type of loop", "A Python keyword"], a: 1, e: "A parameter is an input the function receives when called, used inside the function body." },
    { q: "What is the output of this code?\ndef add(a, b):\n    return a + b\nprint(add(2, 3))", options: ["5", "'2 + 3'", "23", "None"], a: 0, e: "add(2, 3) returns 2 + 3 = 5, which print() displays." },
    { q: "What happens if you call a function without providing a required argument?", options: ["It uses 0", "It raises a TypeError", "It returns None", "It uses a random value"], a: 1, e: "Calling a function without its required arguments raises a TypeError: missing required argument." }
  ],
  'beginner/09-modules.html': [
    { q: "Which statement imports the math module?", options: ["include math", "import math", "using math", "require math"], a: 1, e: "The import statement loads a module: import math." },
    { q: "How do you use the sqrt function from math?", options: ["math.sqrt(16)", "sqrt.math(16)", "use sqrt from math", "sqrt(16)"], a: 0, e: "After 'import math', access its functions with the module name: math.sqrt(16)." },
    { q: "Which module gives you today's date?", options: ["date", "datetime", "time-date", "calendar"], a: 1, e: "The datetime module provides date and time functionality, e.g., datetime.date.today()." },
    { q: "What does 'from random import randint' do?", options: ["Imports the whole module", "Imports only randint", "Creates a random number", "Errors"], a: 1, e: "'from module import name' imports just that specific name, so you can call randint() directly." },
    { q: "What command installs a third-party package?", options: ["pip install", "import install", "python get", "install pkg"], a: 0, e: "Use 'pip install package-name' in your terminal to install third-party packages." }
  ],
  'beginner/10-mini-project.html': [
    { q: "What function reads text input from the user?", options: ["input()", "read()", "get()", "scan()"], a: 0, e: "input() prompts the user for text and returns what they type as a string." },
    { q: "What does int(input()) accomplish?", options: ["Rounds a number", "Converts user input to an integer", "Prints the input", "Catches errors"], a: 1, e: "input() returns a string, and int() converts that string to a whole number for math operations." },
    { q: "Which structure is best for a menu that repeats until the user quits?", options: ["An if statement", "A while loop", "A function", "A list"], a: 1, e: "A while loop repeats the menu as long as the user hasn't chosen to quit." },
    { q: "In the calculator project, what is used to perform the selected operation?", options: ["A list of numbers", "Conditional statements checking the choice", "A random selector", "A string slice"], a: 1, e: "Conditionals (if/elif) check which operation the user chose and run the matching math." },
    { q: "What happens if the user enters a letter instead of a number in int()?", options: ["It returns 0", "It raises a ValueError", "It ignores the input", "It converts automatically"], a: 1, e: "int() raises a ValueError if the string is not a valid number, so good programs handle this with error checking." }
  ],
  'intermediate/01-advanced-functions.html': [
    { q: "What does *args do in a function definition?", options: ["Passes keyword arguments", "Accepts any number of positional arguments", "Creates a list", "Returns a tuple"], a: 1, e: "*args collects any number of positional arguments into a tuple inside the function." },
    { q: "What does **kwargs allow a function to accept?", options: ["Any number of keyword arguments", "Positional arguments", "Only one argument", "A dictionary"], a: 0, e: "**kwargs collects extra keyword arguments into a dictionary inside the function." },
    { q: "What is a lambda function?", options: ["A named function", "An anonymous one-line function", "A type of loop", "A Python module"], a: 1, e: "A lambda is an anonymous, single-expression function: lambda x: x * 2." },
    { q: "What does map() do?", options: ["Filters items", "Applies a function to every item in an iterable", "Sorts items", "Converts types"], a: 1, e: "map(f, iterable) applies function f to each item and returns an iterator of results." },
    { q: "What does filter() do?", options: ["Keeps items where the condition is True", "Removes all items", "Sums all items", "Multiplies items"], a: 0, e: "filter(f, iterable) keeps only the items for which function f returns True." }
  ],
  'intermediate/02-list-comprehensions.html': [
    { q: "What does [x**2 for x in range(5)] produce?", options: ["[0, 1, 4, 9, 16]", "[1, 4, 9, 16, 25]", "[0, 1, 2, 3, 4]", "[0, 1, 4, 9, 25]"], a: 0, e: "For x in 0..4, it squares each: [0, 1, 4, 9, 16]." },
    { q: "What is the basic syntax of a list comprehension?", options: ["[expression for item in iterable]", "for item in iterable: [expression]", "(expression) for item in iterable", "[for item in iterable expression]"], a: 0, e: "The pattern is [expression for item in iterable], optionally with an if condition." },
    { q: "Which comprehension gives only even numbers from 0 to 9?", options: ["[x for x in range(10) if x % 2 == 0]", "[x for x in range(10) if x / 2]", "[x for x in range(0, 10, 1)]", "[x * 2 for x in range(10)]"], a: 0, e: "The if clause filters: it keeps x when x % 2 == 0 (even numbers)." },
    { q: "What does a generator expression use instead of [ ]?", options: ["{ }", "( )", "< >", "nothing"], a: 1, e: "Generator expressions use parentheses: (x for x in range(10)). They produce values lazily, one at a time." },
    { q: "What does {k: v for k, v in pairs} create?", options: ["A list", "A set", "A dictionary", "A tuple"], a: 2, e: "Using { } with key:value syntax creates a dictionary comprehension." }
  ],
  'intermediate/03-file-handling.html': [
    { q: "Which statement safely opens and auto-closes a file?", options: ["with open('f.txt') as f:", "file('f.txt').open()", "open('f.txt').with:", "import open"], a: 0, e: "The with statement ensures the file is closed automatically when the block ends, even if errors occur." },
    { q: "What mode string opens a file for writing?", options: ["'r'", "'w'", "'a'", "'x'"], a: 1, e: "'w' opens a file for writing (overwriting existing content). 'r' reads, 'a' appends." },
    { q: "Which method reads all lines of a file into a list?", options: ["readline()", "readlines()", "readall()", "lines()"], a: 1, e: "readlines() returns a list where each element is one line of the file." },
    { q: "What does the 'a' mode do?", options: ["Overwrites the file", "Appends to the end of the file", "Reads only", "Creates a new file each time"], a: 1, e: "'a' (append) writes new content to the end of the file without erasing existing data." },
    { q: "What module helps check if a file exists?", options: ["os.path", "fileops", "pathlib", "sys"], a: 0, e: "os.path.exists('file.txt') returns True if the file exists. (pathlib also works, but os.path is the classic answer.)" }
  ],
  'intermediate/04-error-handling.html': [
    { q: "Which block catches an exception?", options: ["catch:", "except:", "handle:", "error:"], a: 1, e: "Python uses try/except: code that may fail goes in try, and the except block handles the error." },
    { q: "What is the output of int('hello')?", options: ["0", "TypeError", "ValueError", "hello"], a: 2, e: "int('hello') raises a ValueError because 'hello' is not a valid number." },
    { q: "Which clause always runs whether or not an exception occurred?", options: ["finally:", "else:", "end:", "last:"], a: 0, e: "The finally block always executes, making it ideal for cleanup like closing resources." },
    { q: "What keyword is used to raise an exception manually?", options: ["throw", "raise", "error", "trigger"], a: 1, e: "Use raise to trigger an exception on purpose, e.g., raise ValueError('bad value')." },
    { q: "What is a custom exception in Python?", options: ["A built-in error type", "A new exception class you define", "A type of loop", "A module"], a: 1, e: "You create custom exceptions by subclassing the Exception class: class MyError(Exception): pass." }
  ],
  'intermediate/05-oop-basics.html': [
    { q: "What keyword defines a class in Python?", options: ["object", "class", "def", "type"], a: 1, e: "The 'class' keyword defines a class: class Dog: ..." },
    { q: "What is the __init__ method used for?", options: ["Destroying an object", "Initializing new objects", "Creating a class", "Deleting data"], a: 1, e: "__init__ is the constructor; it runs when you create an object and sets up its attributes." },
    { q: "What does self refer to inside a method?", options: ["The class itself", "The current instance/object", "The module", "Nothing"], a: 1, e: "self refers to the specific instance on which the method was called." },
    { q: "How do you create an object from a class named Car?", options: ["car = Car()", "car = new Car()", "car = Car.create()", "car = make Car"], a: 0, e: "Call the class like a function: car = Car() creates an instance." },
    { q: "What does inheritance let a class do?", options: ["Run without import", "Reuse methods and attributes from a parent class", "Delete other objects", "Create modules"], a: 1, e: "A subclass inherits attributes and methods from its parent class, avoiding duplication." }
  ],
  'intermediate/06-oop-advanced.html': [
    { q: "What is polymorphism?", options: ["Different classes responding to the same method differently", "Making data private", "A design pattern", "Type conversion"], a: 0, e: "Polymorphism lets objects of different classes respond differently to the same method call." },
    { q: "What does the @property decorator do?", options: ["Makes a method callable as an attribute", "Deletes an attribute", "Creates a thread", "Defines a class"], a: 0, e: "@property lets you access a method like a plain attribute: obj.value instead of obj.value()." },
    { q: "What are dunder (magic) methods?", options: ["Methods with double underscores like __str__", "Methods that are private", "Built-in functions", "Deprecated methods"], a: 0, e: "Dunder methods like __str__ and __len__ customize how objects behave with built-in operations." },
    { q: "What does __str__ define?", options: ["The object's string representation for print()", "The object's memory address", "The object's type", "How to copy an object"], a: 0, e: "__str__ returns a readable string representation, used by print() and str()." },
    { q: "What is encapsulation?", options: ["Bundling data and methods, restricting direct access", "Storing data in files", "Running code in parallel", "Compiling code"], a: 0, e: "Encapsulation bundles data with methods and hides internal state, often using private attributes." }
  ],
  'intermediate/07-modules-packages.html': [
    { q: "What is a package in Python?", options: ["A single .py file", "A folder of modules with __init__.py", "A compiled program", "A list of functions"], a: 1, e: "A package is a directory containing modules and an __init__.py file that marks it as a package." },
    { q: "What is the difference between 'import math' and 'from math import sqrt'?", options: ["No difference", "The first imports the module; the second imports only sqrt", "The first errors", "The second is faster"], a: 1, e: "'import math' requires math.sqrt() to call it, while 'from math import sqrt' lets you call sqrt() directly." },
    { q: "Which command lists installed packages?", options: ["pip list", "pip show all", "list packages", "pip check"], a: 0, e: "'pip list' displays all installed Python packages in your environment." },
    { q: "What is pip?", options: ["A Python data type", "Python's package installer", "A debugger", "A web framework"], a: 1, e: "pip is Python's package installer used to install and manage third-party libraries." },
    { q: "What does 'pip install requests' do?", options: ["Deletes requests", "Installs the requests package", "Checks for updates", "Creates a request"], a: 1, e: "'pip install requests' downloads and installs the requests HTTP library so you can import it." }
  ],
  'intermediate/08-working-with-data.html': [
    { q: "Which module handles JSON in Python?", options: ["json", "csv", "pickle", "xml"], a: 0, e: "The json module provides json.loads() and json.dumps() for JSON data." },
    { q: "What does json.loads() do?", options: ["Converts JSON string to Python data", "Converts Python data to JSON", "Reads a file", "Saves data"], a: 0, e: "json.loads() parses a JSON string into Python objects like dicts and lists." },
    { q: "What does json.dumps() do?", options: ["Parses JSON", "Converts Python data into a JSON string", "Deletes data", "Compresses data"], a: 1, e: "json.dumps() serializes Python objects into a JSON-formatted string." },
    { q: "Which module reads CSV files?", options: ["csv", "sheet", "table", "data"], a: 0, e: "The csv module has csv.reader and csv.writer for working with comma-separated values." },
    { q: "What is Counter from the collections module used for?", options: ["Counting hashable items in a sequence", "Sorting lists", "Creating classes", "Math operations"], a: 0, e: "collections.Counter counts how many times each item appears, e.g., Counter('hello') counts each letter." }
  ],
  'intermediate/09-iterators-generators.html': [
    { q: "What keyword turns a function into a generator?", options: ["return", "yield", "break", "next"], a: 1, e: "Using yield (instead of return) makes a function a generator that produces values lazily." },
    { q: "What does a generator produce?", options: ["All values at once", "One value at a time on demand", "A list", "A dictionary"], a: 1, e: "Generators produce values one at a time as requested, saving memory for large sequences." },
    { q: "What is an iterator?", options: ["An object that returns values one at a time", "A type of list", "A function", "A module"], a: 0, e: "An iterator is any object implementing __next__() that yields values one at a time." },
    { q: "Which built-in function gets the next value from an iterator?", options: ["next()", "advance()", "step()", "get()"], a: 0, e: "next(iterator) returns the next value, raising StopIteration when the iterator is exhausted." },
    { q: "Why use generators instead of lists for large data?", options: ["They are faster to write", "They use less memory", "They sort automatically", "They cannot be iterated"], a: 1, e: "Generators compute values lazily, so they don't store the whole sequence in memory." }
  ],
  'intermediate/10-mini-project.html': [
    { q: "A to-do app needs to store tasks. Which data structure is best?", options: ["A tuple", "A list", "An integer", "A string"], a: 1, e: "A list works well for a to-do app because tasks can be added, removed, and modified." },
    { q: "To keep tasks saved between runs, what should the app use?", options: ["A file or database", "A variable", "A function", "A loop"], a: 0, e: "To persist tasks, save them to a file (like JSON or CSV) or a database." },
    { q: "Which function displays the list of tasks to the user?", options: ["input()", "print()", "len()", "type()"], a: 1, e: "print() displays output. Looping over the tasks and printing each one shows the list." },
    { q: "How do you let the user mark a task as done?", options: ["Remove the task from the list", "Add it again", "Convert it to a string", "Call len() on it"], a: 0, e: "Marking done is typically done by removing the task or storing a 'done' status." },
    { q: "What does input() always return?", options: ["An integer", "A string", "A float", "A list"], a: 1, e: "input() always returns a string, so numeric values must be converted with int() or float()." }
  ],
  'advanced/01-decorators.html': [
    { q: "What is a decorator in Python?", options: ["A type of loop", "A function that modifies another function", "A data structure", "A module"], a: 1, e: "A decorator takes a function and returns a wrapped version that extends its behavior." },
    { q: "What is the decorator syntax to decorate function foo()?", options: ["@decorator\ndef foo():", "def @decorator foo():", "decorator(def foo())", "foo = @decorator"], a: 0, e: "Place @decorator on the line above the function definition." },
    { q: "What does functools.wraps do in a decorator?", options: ["Speeds up the function", "Preserves the original function's metadata", "Deletes the function", "Adds arguments"], a: 1, e: "functools.wraps copies the original function's name and docstring onto the wrapper." },
    { q: "Which is a common use case for decorators?", options: ["Timing function execution", "Creating variables", "Importing modules", "Defining classes"], a: 0, e: "Decorators are commonly used for logging, timing, access control, and caching." },
    { q: "How do you make a decorator that takes arguments?", options: ["Add a factory function wrapping the decorator", "It's impossible", "Use a lambda", "Use yield"], a: 0, e: "Argument-taking decorators are built with an outer factory function that returns the actual decorator." }
  ],
  'advanced/02-context-managers.html': [
    { q: "Which methods define a class-based context manager?", options: ["__enter__ and __exit__", "__init__ and __str__", "__get__ and __set__", "__start__ and __stop__"], a: 0, e: "A context manager class implements __enter__() (setup) and __exit__() (cleanup)." },
    { q: "What does the with statement guarantee?", options: ["The file is never opened", "Cleanup runs even if errors occur", "Code runs faster", "Variables are global"], a: 1, e: "The with statement guarantees __exit__() runs, ensuring resources are cleaned up." },
    { q: "Which contextlib decorator turns a generator into a context manager?", options: ["@contextmanager", "@generator", "@with", "@manager"], a: 0, e: "contextlib.contextmanager turns a generator function with yield into a context manager." },
    { q: "What is the with statement's syntax for a file?", options: ["with open('f') as f:", "open with f:", "with file('f'):", "f = with open"], a: 0, e: "The standard pattern is: with open('f.txt', 'r') as f: ..." },
    { q: "Why use a context manager instead of manual open/close?", options: ["It's harder", "It automatically handles closing even on errors", "It opens faster", "It locks files"], a: 1, e: "Context managers handle cleanup automatically, preventing resource leaks and errors." }
  ],
  'advanced/03-regular-expressions.html': [
    { q: "Which module provides regular expressions in Python?", options: ["regex", "re", "regexp", "pattern"], a: 1, e: "The 're' module provides all regular expression functions in Python." },
    { q: "Which function searches for a pattern and returns the first match?", options: ["re.search()", "re.first()", "re.find()", "re.locate()"], a: 0, e: "re.search() scans a string for the first location matching the pattern." },
    { q: "Which function returns all matches as a list?", options: ["re.all()", "re.findall()", "re.matches()", "re.list()"], a: 1, e: "re.findall() returns a list of all non-overlapping matches of the pattern." },
    { q: "In the pattern r'\\d+', what does \\d match?", options: ["A letter", "A digit", "A space", "An underscore"], a: 1, e: "\\d matches any digit (0-9). The + means one or more digits." },
    { q: "What do parentheses () do in a regex?", options: ["Nothing", "Create capture groups", "Match spaces", "Repeat the pattern"], a: 1, e: "Parentheses group part of the pattern into a capture group you can extract separately." }
  ],
  'advanced/04-testing.html': [
    { q: "Which framework is built into Python for unit testing?", options: ["pytest", "unittest", "mocha", "jest"], a: 1, e: "unittest is Python's built-in testing framework, part of the standard library." },
    { q: "Which statement checks an expectation in unittest?", options: ["assertEqual(a, b)", "equals(a, b)", "check(a, b)", "verify(a, b)"], a: 0, e: "assertEqual(a, b) fails the test if a and b are not equal." },
    { q: "In pytest, what does a test function need to start with?", options: ["test_", "check_", "verify_", "run_"], a: 0, e: "pytest discovers functions whose names start with 'test_' by default." },
    { q: "What is a fixture in testing?", options: ["A way to set up test prerequisites", "A type of assertion", "A bug", "A performance test"], a: 0, e: "A fixture provides setup/teardown — data or objects the test needs before running." },
    { q: "What is mocking used for in tests?", options: ["Speeding up tests", "Replacing real dependencies with fakes", "Generating random data", "Debugging"], a: 1, e: "Mocking replaces real objects (like a database) with fake ones so tests run in isolation." }
  ],
  'advanced/05-multithreading.html': [
    { q: "Which module provides threads in Python?", options: ["threading", "thread", "multiprocess", "async"], a: 0, e: "The threading module provides Thread, Lock, and other concurrency tools." },
    { q: "How do you start a thread?", options: ["thread.start()", "thread.run()", "thread.go()", "thread.launch()"], a: 0, e: "Create a Thread object and call .start() to begin execution." },
    { q: "Why is a Lock used in multithreading?", options: ["To speed up code", "To prevent multiple threads from corrupting shared data", "To create threads", "To stop threads"], a: 1, e: "A Lock ensures only one thread accesses shared data at a time, preventing race conditions." },
    { q: "What is a race condition?", options: ["Multiple threads competing to modify shared data unsafely", "Running code slowly", "A type of error in math", "A network issue"], a: 0, e: "A race condition occurs when threads access shared data without proper synchronization." },
    { q: "Which module provides a high-level ThreadPoolExecutor?", options: ["concurrent.futures", "pooling", "threadpool", "async.futures"], a: 0, e: "concurrent.futures.ThreadPoolExecutor manages a pool of threads with submit()/map()." }
  ],
  'advanced/06-async-io.html': [
    { q: "Which keyword defines an async function?", options: ["async def", "def async", "await def", "asyncio def"], a: 0, e: "Async functions are defined with 'async def'." },
    { q: "Which keyword waits for an async operation?", options: ["wait", "await", "pause", "sync"], a: 1, e: "The 'await' keyword pauses the coroutine until the awaited task completes." },
    { q: "Which library provides the event loop?", options: ["asyncio", "threading", "multiprocessing", "time"], a: 0, e: "asyncio provides the event loop and async/await infrastructure in Python." },
    { q: "How do you run an async function from sync code?", options: ["asyncio.run(main())", "main()", "await main()", "run.main()"], a: 0, e: "asyncio.run(main()) creates a loop, runs the coroutine, and closes the loop." },
    { q: "What does asyncio.gather() do?", options: ["Runs multiple coroutines concurrently", "Runs them one by one", "Stops all tasks", "Measures performance"], a: 0, e: "asyncio.gather(*coroutines) schedules several coroutines to run concurrently and awaits all of them." }
  ],
  'advanced/07-data-structures.html': [
    { q: "Which principle does a stack follow?", options: ["FIFO", "LIFO", "Random", "Sorted"], a: 1, e: "A stack is Last-In-First-Out (LIFO) — like a stack of plates." },
    { q: "Which principle does a queue follow?", options: ["LIFO", "FIFO", "Random", "Priority only"], a: 1, e: "A queue is First-In-First-Out (FIFO) — like a line of people." },
    { q: "What list methods implement a stack's push and pop?", options: ["append() and pop()", "add() and remove()", "insert() and delete()", "put() and get()"], a: 0, e: "append() adds to the end and pop() removes from the end, giving LIFO behavior." },
    { q: "Which module provides deque for efficient queue operations?", options: ["collections", "queueing", "deque", "stack"], a: 0, e: "collections.deque provides O(1) append and popleft operations, ideal for queues." },
    { q: "A binary tree node typically stores what?", options: ["Value + left and right child references", "Only a value", "An array of values", "A sorted list"], a: 0, e: "Each binary tree node holds a value plus references to its left and right children." }
  ],
  'advanced/08-algorithms.html': [
    { q: "What is the time complexity of binary search on a sorted list of n items?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], a: 1, e: "Binary search halves the search space each step, giving O(log n) time." },
    { q: "What is the key requirement for binary search?", options: ["The data must be sorted", "The data must be unique", "The data must be small", "The data must be strings"], a: 0, e: "Binary search only works on a sorted sequence." },
    { q: "What is the time complexity of bubble sort in the worst case?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], a: 2, e: "Bubble sort compares adjacent pairs repeatedly, giving O(n^2) worst-case time." },
    { q: "What is a recursive function?", options: ["A function that calls itself", "A function without a return", "A fast function", "A built-in function"], a: 0, e: "Recursion is when a function calls itself to solve a smaller version of the problem." },
    { q: "In the Fibonacci sequence, what is fib(3)?", options: ["1", "2", "3", "5"], a: 1, e: "fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2. So fib(3) equals 2." }
  ],
  'advanced/09-databases.html': [
    { q: "Which module connects to SQLite databases?", options: ["sqlite3", "mysql", "database", "sqlalchemy"], a: 0, e: "sqlite3 is Python's built-in module for SQLite databases." },
    { q: "What is SQLAlchemy primarily used for?", options: ["An ORM and database toolkit", "A web server", "A GUI framework", "A testing library"], a: 0, e: "SQLAlchemy is an ORM that maps Python classes to database tables." },
    { q: "Which method runs a query and returns results in sqlite3?", options: ["cursor.fetchall()", "cursor.getall()", "cursor.read()", "cursor.results()"], a: 0, e: "After execute(), cursor.fetchall() returns all rows as a list of tuples." },
    { q: "What is a parameterized query used for?", options: ["Speeding up queries", "Preventing SQL injection", "Sorting results", "Joining tables"], a: 1, e: "Parameterized queries (?) safely pass values and prevent SQL injection attacks." },
    { q: "What does commit() do after an INSERT?", options: ["Undoes the change", "Saves the transaction to the database", "Closes the connection", "Runs the query"], a: 1, e: "commit() permanently saves pending changes made during the transaction." }
  ],
  'advanced/10-web-basics.html': [
    { q: "Which library makes HTTP requests easy in Python?", options: ["requests", "http", "urllib3", "socket"], a: 0, e: "The requests library provides a simple API: requests.get(url), requests.post(url), etc." },
    { q: "What does requests.get(url) return?", options: ["A Response object", "A string", "A dict only", "An error"], a: 0, e: "requests.get() returns a Response object with .status_code, .text, and .json() attributes." },
    { q: "What is FastAPI?", options: ["A modern Python web framework", "A database", "A testing tool", "A web browser"], a: 0, e: "FastAPI is a modern, high-performance web framework for building APIs with Python." },
    { q: "What does a decorator like @app.get('/') do in FastAPI?", options: ["Defines a route for GET requests", "Deletes a route", "Creates a database", "Starts the server"], a: 0, e: "@app.get('/path') registers a function to handle GET requests to that path." },
    { q: "What does a REST API primarily exchange?", options: ["HTML pages", "JSON data", "Binary files", "Python objects"], a: 1, e: "REST APIs typically exchange structured JSON data between client and server." }
  ],
  'professional/01-design-patterns.html': [
    { q: "Which pattern ensures a class has only one instance?", options: ["Factory", "Observer", "Singleton", "Strategy"], a: 2, e: "Singleton guarantees one instance and provides a global access point to it." },
    { q: "Which pattern creates objects without specifying the exact class?", options: ["Factory", "Singleton", "Decorator", "Proxy"], a: 0, e: "Factory encapsulates object creation, letting you choose which class to instantiate at runtime." },
    { q: "Which pattern lets objects be notified when another object changes?", options: ["Observer", "Singleton", "Builder", "Facade"], a: 0, e: "Observer defines a one-to-many dependency: when the subject changes, all observers are notified." },
    { q: "Which pattern lets you swap algorithms at runtime?", options: ["Strategy", "Singleton", "Adapter", "Command"], a: 0, e: "Strategy encapsulates interchangeable algorithms so you can select behavior dynamically." },
    { q: "Why use design patterns?", options: ["To make code slower", "To solve common design problems with proven solutions", "To avoid writing code", "To hide data"], a: 1, e: "Design patterns are reusable, proven solutions to common software design problems." }
  ],
  'professional/02-solid-principles.html': [
    { q: "What does the S in SOLID stand for?", options: ["Single Responsibility", "Simple Code", "Safe Design", "Systematic"], a: 0, e: "S = Single Responsibility Principle: a class should have only one reason to change." },
    { q: "What does the O in SOLID stand for?", options: ["Object-Oriented", "Open/Closed", "Optimal", "Output"], a: 1, e: "O = Open/Closed Principle: classes should be open for extension but closed for modification." },
    { q: "What does the Liskov Substitution Principle state?", options: ["Subclasses must be able to replace their parent classes", "Classes should be small", "Only one class per file", "All classes must be public"], a: 0, e: "LSP: objects of a subclass must behave like objects of the parent class without breaking the program." },
    { q: "What does the I in SOLID stand for?", options: ["Interface Segregation", "Inheritance", "Iteration", "Integration"], a: 0, e: "I = Interface Segregation Principle: don't force clients to depend on methods they don't use." },
    { q: "What does the D in SOLID stand for?", options: ["Data Structures", "Dependency Inversion", "Dynamic Typing", "Design"], a: 1, e: "D = Dependency Inversion Principle: depend on abstractions, not concrete implementations." }
  ],
  'professional/03-advanced-algorithms.html': [
    { q: "Which traversal visits a node, then its children, level by level?", options: ["DFS", "BFS", "Binary search", "Quick sort"], a: 1, e: "BFS (Breadth-First Search) explores neighbors level by level, typically using a queue." },
    { q: "Which data structure does DFS typically use?", options: ["A queue", "A stack (or recursion)", "A hash table", "A heap"], a: 1, e: "DFS explores depth-first, using a stack (or the call stack via recursion)." },
    { q: "Dijkstra's algorithm finds...", options: ["The shortest path in a weighted graph", "The longest path", "A random path", "The number of nodes"], a: 0, e: "Dijkstra's algorithm computes the shortest paths from a start node to all others." },
    { q: "What data structure does Dijkstra's algorithm commonly use?", options: ["A priority queue (min-heap)", "A stack", "A linked list", "A tree"], a: 0, e: "A min-heap priority queue efficiently picks the closest unvisited node." },
    { q: "Dynamic programming solves problems by...", options: ["Random guessing", "Breaking them into overlapping subproblems and storing results", "Running forever", "Using only recursion"], a: 1, e: "DP solves problems by combining solutions to overlapping subproblems and caching results." }
  ],
  'professional/04-system-design.html': [
    { q: "Which pattern separates the app into model, view, and controller?", options: ["MVC", "Singleton", "Observer", "Factory"], a: 0, e: "MVC (Model-View-Controller) separates data, UI, and logic for maintainability." },
    { q: "What does horizontal scaling mean?", options: ["Adding more machines/servers", "Making one server more powerful", "Reducing servers", "Caching everything"], a: 0, e: "Horizontal scaling adds more servers to distribute load; vertical scaling upgrades one server." },
    { q: "What is a cache used for?", options: ["Storing frequently accessed data for speed", "Deleting data", "Backing up data", "Encrypting data"], a: 0, e: "Caches store frequently accessed data so repeated reads are fast, reducing load." },
    { q: "The CAP theorem states that a distributed system can guarantee at most...", options: ["Two of: Consistency, Availability, Partition tolerance", "All three at once", "One property only", "None"], a: 0, e: "CAP says you can guarantee only two of Consistency, Availability, and Partition Tolerance at once." },
    { q: "What is a load balancer used for?", options: ["Distributing traffic across servers", "Storing data", "Compiling code", "Testing code"], a: 0, e: "A load balancer spreads incoming requests across multiple servers to avoid overloading any one." }
  ],
  'professional/05-api-development.html': [
    { q: "What does CRUD stand for?", options: ["Create, Read, Update, Delete", "Copy, Run, Undo, Debug", "Cache, Response, URL, Data", "Connect, Request, Upload, Download"], a: 0, e: "CRUD is the four basic data operations: Create, Read, Update, Delete." },
    { q: "Which HTTP method creates a new resource?", options: ["POST", "GET", "PUT", "DELETE"], a: 0, e: "POST creates resources; GET reads, PUT/PATCH update, DELETE removes." },
    { q: "Which HTTP method retrieves data?", options: ["POST", "GET", "DELETE", "PATCH"], a: 1, e: "GET retrieves a resource; it should be safe and not change data." },
    { q: "What status code means 'success' (OK)?", options: ["200", "404", "500", "302"], a: 0, e: "200 OK is the standard success status. 404 = not found, 500 = server error." },
    { q: "What status code means 'resource not found'?", options: ["200", "404", "500", "400"], a: 1, e: "404 Not Found means the requested resource does not exist." }
  ],
  'professional/06-database-design.html': [
    { q: "What does normalization reduce?", options: ["Redundancy and data anomalies", "Query speed", "Number of tables", "Indexes"], a: 0, e: "Normalization organizes data to reduce redundancy and prevent update anomalies." },
    { q: "What is Third Normal Form (3NF)?", options: ["No transitive dependencies", "Only primary keys", "No tables", "Only foreign keys"], a: 0, e: "A table is in 3NF if it's in 2NF and has no transitive dependencies (non-key columns depending on other non-key columns)." },
    { q: "What is the main purpose of a database index?", options: ["Speeding up queries", "Storing more data", "Deleting data", "Encrypting data"], a: 0, e: "Indexes speed up lookups by allowing the database to find rows without scanning the whole table." },
    { q: "What does a transaction guarantee with ACID?", options: ["Atomicity — all steps succeed or none do", "Faster queries", "More storage", "Better UI"], a: 0, e: "ACID (Atomicity, Consistency, Isolation, Durability) ensures transactions are reliable." },
    { q: "Which JOIN returns only rows with matches in both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], a: 0, e: "INNER JOIN returns only rows where the join condition matches in both tables." }
  ],
  'professional/07-testing-advanced.html': [
    { q: "What is property-based testing?", options: ["Testing that properties hold for many generated inputs", "Testing only properties of objects", "Testing with real data", "A performance test"], a: 0, e: "Property-based testing (e.g., Hypothesis) generates many inputs and checks that properties always hold." },
    { q: "Which library enables property-based testing in Python?", options: ["hypothesis", "pytest", "unittest", "mock"], a: 0, e: "Hypothesis is the leading property-based testing library for Python." },
    { q: "What do integration tests verify?", options: ["How components work together", "Only one function", "Code style", "Memory usage"], a: 0, e: "Integration tests verify that multiple components interact correctly as a system." },
    { q: "What is CI/CD?", options: ["Continuously integrating and deploying code automatically", "A programming language", "A database", "A testing framework"], a: 0, e: "CI/CD automates building, testing, and deploying code on every change." },
    { q: "What is GitHub Actions used for?", options: ["Automating workflows like tests and deploys", "Writing Python", "Hosting websites only", "Creating databases"], a: 0, e: "GitHub Actions automates CI/CD pipelines triggered by events like pushes or PRs." }
  ],
  'professional/08-packaging-deployment.html': [
    { q: "Which file describes a Python package's metadata?", options: ["pyproject.toml", "package.json", "setup.yaml", "requirements.txt"], a: 0, e: "pyproject.toml (modern) or setup.py describes a package's metadata and dependencies." },
    { q: "What is Docker used for?", options: ["Packaging apps in portable containers", "Writing Python", "Testing APIs", "Managing databases"], a: 0, e: "Docker bundles an app and its environment into a container that runs anywhere." },
    { q: "What does a Dockerfile define?", options: ["How to build the container image", "The app's UI", "The database schema", "The test cases"], a: 0, e: "A Dockerfile contains instructions to build a container image." },
    { q: "Which platform is commonly used for cloud deployment?", options: ["AWS, Azure, or Google Cloud", "Only localhost", "A USB drive", "A spreadsheet"], a: 0, e: "Cloud platforms like AWS, Azure, GCP, Heroku, and Render host deployed applications." },
    { q: "What is the purpose of a virtual environment?", options: ["Isolating project dependencies", "Speeding up code", "Encrypting files", "Formatting code"], a: 0, e: "Virtual environments isolate each project's dependencies, preventing version conflicts." }
  ],
  'professional/09-data-science-intro.html': [
    { q: "What is NumPy mainly used for?", options: ["Numerical arrays and math operations", "Web development", "Testing", "Styling"], a: 0, e: "NumPy provides fast multi-dimensional arrays and numerical computing." },
    { q: "What is Pandas mainly used for?", options: ["Data analysis with DataFrames", "Creating threads", "Making requests", "Graphics"], a: 0, e: "Pandas offers DataFrames for working with tabular data, cleaning, and analysis." },
    { q: "Which library creates plots and charts?", options: ["Matplotlib", "requests", "sqlite3", "threading"], a: 0, e: "Matplotlib is Python's classic plotting library for charts and graphs." },
    { q: "What is a Pandas DataFrame?", options: ["A 2D labeled data structure", "A list of numbers", "A SQL database", "A web page"], a: 0, e: "A DataFrame is a 2D, labeled, tabular data structure similar to a spreadsheet." },
    { q: "What does the mean() method do in Pandas?", options: ["Calculates the average of a column", "Finds the median", "Deletes a column", "Sorts data"], a: 0, e: "DataFrame['col'].mean() computes the arithmetic average of that column." }
  ],
  'professional/10-machine-learning.html': [
    { q: "Linear regression is used to predict...", options: ["A continuous numeric value", "A category", "A boolean", "Text"], a: 0, e: "Linear regression predicts continuous numeric outputs by fitting a line to data." },
    { q: "Which task does classification solve?", options: ["Predicting a category/class", "Predicting a continuous number", "Clustering data", "Reducing dimensions"], a: 0, e: "Classification assigns inputs to discrete categories (e.g., spam vs. not spam)." },
    { q: "What is K-Means?", options: ["An unsupervised clustering algorithm", "A regression model", "A web server", "A database"], a: 0, e: "K-Means is an unsupervised algorithm that groups similar data points into clusters." },
    { q: "What is the difference between supervised and unsupervised learning?", options: ["Supervised uses labeled data, unsupervised finds patterns without labels", "One is faster", "No difference", "One is older"], a: 0, e: "Supervised learning trains on labeled data; unsupervised learning discovers structure in unlabeled data." },
    { q: "What is the 'label' in supervised learning?", options: ["The correct output you want the model to predict", "A plot title", "A column name", "A variable name"], a: 0, e: "The label is the known, correct answer used to train and evaluate a supervised model." }
  ],
  'professional/11-capstone-planning.html': [
    { q: "What is the first step in planning a capstone project?", options: ["Defining the requirements and scope", "Writing all code", "Deploying", "Testing"], a: 0, e: "Planning starts with clear requirements and scope before writing any code." },
    { q: "For a Task Management API, what is a core entity?", options: ["Task", "Thread", "Function", "Color"], a: 0, e: "Task is the core entity — with fields like title, description, status, and due date." },
    { q: "Which architecture suits a small Task API?", options: ["A single service with routes, models, and a database", "Microservices everywhere", "No backend", "A desktop GUI"], a: 0, e: "A simple layered API (routes → models → database) is appropriate for a small project." },
    { q: "Why define API endpoints before coding?", options: ["To clarify how clients will interact with the system", "To slow down development", "To write less code", "It is not needed"], a: 0, e: "Defining endpoints (GET /tasks, POST /tasks, etc.) clarifies the contract between client and server." },
    { q: "What should you decide early for a database-backed project?", options: ["The data model and schema", "The logo colors", "The marketing plan", "The font size"], a: 0, e: "Designing the data model and schema early prevents major rework later." }
  ],
  'professional/12-capstone-build.html': [
    { q: "Which framework is ideal for a modern Python Task API?", options: ["FastAPI", "React", "Bootstrap", "Excel"], a: 0, e: "FastAPI is a modern Python framework great for building REST APIs quickly." },
    { q: "What should be done before deploying the API?", options: ["Testing endpoints and edge cases", "Deleting tests", "Removing error handling", "Skipping documentation"], a: 0, e: "Thorough testing of endpoints, validation, and error handling is essential before deployment." },
    { q: "What is one key item on a deployment checklist?", options: ["Setting environment variables and secrets", "Removing the README", "Hard-coding passwords", "Disabling logging"], a: 0, e: "Deployment requires configuring environment variables and keeping secrets secure." },
    { q: "Why add validation to API inputs?", options: ["To reject bad data and prevent errors", "To make code longer", "To slow requests", "It is optional styling"], a: 0, e: "Input validation (e.g., Pydantic in FastAPI) rejects invalid data before it reaches the database." },
    { q: "What is the final step after deploying an API?", options: ["Monitoring and maintaining it", "Deleting the repo", "Stopping development", "Removing docs"], a: 0, e: "After deployment, you monitor logs and errors and continue to maintain and improve the service." }
  ]
}

const levels = ['beginner', 'intermediate', 'advanced', 'professional']
let injected = 0, skipped = 0

for (const level of levels) {
  const dir = path.join(__dirname, 'courses', level)
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'))
  for (const file of files) {
    const key = `${level}/${file}`
    const quiz = QUIZZES[key]
    const filePath = path.join(dir, file)
    let html = fs.readFileSync(filePath, 'utf-8')
    if (!quiz) { console.log(`SKIP (no quiz defined): ${key}`); skipped++; continue }
    const json = JSON.stringify(quiz)
    const block = `<script id="quizData" type="application/json">${json}</script>`
    if (/<script id="quizData"[\s\S]*?<\/script>/.test(html)) {
      html = html.replace(/<script id="quizData"[\s\S]*?<\/script>/, block)
    } else {
      const marker = '<div id="quizContainer" class="quiz-section"></div>'
      if (html.includes(marker)) {
        html = html.replace(marker, marker + '\n\n        ' + block)
      } else {
        console.log(`WARN (no quizContainer in ${key})`)
        html = html.replace('</body>', block + '\n</body>')
      }
    }
    fs.writeFileSync(filePath, html)
    injected++
    console.log(`INJECTED: ${key} (${quiz.length} questions)`)
  }
}
console.log(`\nDone. Injected ${injected} quizzes, skipped ${skipped}.`)
