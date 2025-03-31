# Python Crash Course for JavaScript Developers

## Table of Contents

- [Python Basics](#python-basics)
- [Variables and Data Types](#variables-and-data-types)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Data Structures](#data-structures)
- [Object-Oriented Programming](#object-oriented-programming)
- [Modules and Packages](#modules-and-packages)
- [File I/O](#file-io)
- [Error Handling](#error-handling)
- [Python for GenAI](#python-for-genai)
- [Virtual Environments](#virtual-environments)
- [Common Python Libraries](#common-python-libraries)
- [JavaScript to Python Comparison](#javascript-to-python-comparison)

## Python Basics

### Installation and Setup

Download Python from [python.org](https://python.org) or use your package manager.

Check your installation:

```bash
python --version  # or python3 --version on some systems
```

### Python Interpreter

Python can be run interactively:

```bash
python  # Starts the Python REPL
```

### Running Python Scripts

```bash
python script.py
```

### Python Syntax Highlights

- No curly braces or semicolons
- Indentation defines code blocks (typically 4 spaces)
- Comments use `#` instead of `//`

```python
# This is a comment
print("Hello, World!")  # This prints to the console

# Multiline strings or comments
"""
This is a multiline string
that can be used as a comment
"""
```

## Variables and Data Types

### Variable Declaration

No `var`, `let`, or `const` - just assign values directly:

```python
name = "John"  # String
age = 30       # Integer
height = 5.9   # Float
is_active = True  # Boolean (note the capital T)
nothing = None  # Similar to null in JavaScript
```

### Data Types

#### Numbers

```python
# Integers
x = 5
y = -10

# Floats
z = 3.14
w = -0.001

# Complex numbers
c = 2 + 3j

# Operations
sum_result = x + y  # 5 + (-10) = -5
product = x * y     # 5 * (-10) = -50
division = x / y    # 5 / (-10) = -0.5 (always returns float)
integer_division = x // y  # Integer division: 5 // (-10) = -1
modulo = x % y      # 5 % (-10) = 5
power = x ** 2      # 5^2 = 25
```

#### Strings

```python
# String creation
single_quotes = 'Hello'
double_quotes = "World"
triple_quotes = """This is a
multiline string"""

# String concatenation
greeting = single_quotes + " " + double_quotes  # "Hello World"

# String formatting
name = "Alice"
age = 30

# f-strings (Python 3.6+) - similar to JS template literals
message = f"Hello, {name}! You are {age} years old."

# .format() method
message = "Hello, {}! You are {} years old.".format(name, age)

# String methods
upper_case = "hello".upper()  # "HELLO"
lower_case = "HELLO".lower()  # "hello"
replaced = "hello".replace("h", "j")  # "jello"
split_string = "hello world".split()  # ["hello", "world"]
```

#### Booleans

```python
is_valid = True
is_complete = False

# Boolean operations
result = is_valid and is_complete  # False
result = is_valid or is_complete   # True
result = not is_valid              # False
```

#### Type Conversion

```python
# String to int/float
num_str = "42"
num = int(num_str)  # 42
float_num = float(num_str)  # 42.0

# Int/float to string
num = 42
num_str = str(num)  # "42"

# Check type
print(type(num))  # <class 'int'>
```

## Control Flow

### Conditional Statements

```python
# If-elif-else
age = 20

if age < 18:
    print("Minor")
elif age >= 18 and age < 65:
    print("Adult")
else:
    print("Senior")

# Ternary operator (different from JavaScript)
status = "Adult" if age >= 18 else "Minor"
```

### Loops

#### For Loops

```python
# Looping through a range
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# Looping with start, stop, step
for i in range(1, 10, 2):  # 1, 3, 5, 7, 9
    print(i)

# Looping through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Enumerate for index and value (like entries() in JS)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
```

#### While Loops

```python
count = 0
while count < 5:
    print(count)
    count += 1

# Break and continue work like in JavaScript
while True:
    if count >= 10:
        break
    if count % 2 == 0:
        count += 1
        continue
    print(count)
    count += 1
```

## Functions

### Function Definition

```python
# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameters
def greet_with_title(name, title="Mr."):
    return f"Hello, {title} {name}!"

# Calling functions
message = greet("John")  # "Hello, John!"
message = greet_with_title("John")  # "Hello, Mr. John!"
message = greet_with_title("Jane", "Ms.")  # "Hello, Ms. Jane!"
```

### Args and Kwargs

```python
# Variable number of arguments
def sum_all(*args):
    return sum(args)

result = sum_all(1, 2, 3, 4)  # 10

# Variable number of keyword arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="John", age=30, city="New York")
```

### Lambda Functions (Anonymous Functions)

```python
# Lambda function (similar to arrow functions in JS)
square = lambda x: x ** 2
print(square(5))  # 25

# Common use with map, filter
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))  # [1, 4, 9, 16, 25]
evens = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]
```

## Data Structures

### Lists (Similar to JavaScript Arrays)

```python
# Creating lists
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", True, 3.14]

# Accessing elements
first_fruit = fruits[0]  # "apple"
last_fruit = fruits[-1]  # "cherry"

# Slicing
subset = fruits[0:2]  # ["apple", "banana"]
# Start:end:step
every_other = fruits[::2]  # ["apple", "cherry"]

# Modifying lists
fruits.append("orange")  # Add to end
fruits.insert(1, "blueberry")  # Insert at index
fruits.remove("banana")  # Remove by value
popped = fruits.pop()  # Remove and return last item
popped_index = fruits.pop(0)  # Remove and return item at index

# List comprehensions (powerful feature not in JS)
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]  # [1, 4, 9, 16, 25]
even_squares = [x**2 for x in numbers if x % 2 == 0]  # [4, 16]
```

### Tuples (Immutable Lists)

```python
# Creating tuples
coordinates = (10, 20)
person = ("John", 30, "New York")

# Accessing elements (same as lists)
x = coordinates[0]  # 10

# Unpacking
name, age, city = person

# Tuples are immutable
# coordinates[0] = 15  # This would raise an error
```

### Dictionaries (Similar to JavaScript Objects)

```python
# Creating dictionaries
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Accessing values
name = person["name"]  # "John"
# Safe access with get (returns None or default if key doesn't exist)
phone = person.get("phone")  # None
phone = person.get("phone", "N/A")  # "N/A"

# Modifying dictionaries
person["email"] = "john@example.com"  # Add new key-value pair
person["age"] = 31  # Update existing value
del person["city"]  # Remove key-value pair

# Dictionary methods
keys = person.keys()  # dict_keys(['name', 'age', 'email'])
values = person.values()  # dict_values(['John', 31, 'john@example.com'])
items = person.items()  # dict_items([('name', 'John'), ('age', 31), ('email', 'john@example.com')])

# Dictionary comprehensions
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### Sets (Unordered Collections of Unique Elements)

```python
# Creating sets
fruits = {"apple", "banana", "cherry"}
numbers = set([1, 2, 2, 3, 4, 4])  # {1, 2, 3, 4}

# Set operations
fruits.add("orange")
fruits.remove("banana")  # Raises error if not found
fruits.discard("banana")  # No error if not found

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}
union = a | b  # {1, 2, 3, 4, 5}
intersection = a & b  # {3}
difference = a - b  # {1, 2}
symmetric_difference = a ^ b  # {1, 2, 4, 5}
```

## Object-Oriented Programming

### Classes and Objects

```python
# Class definition
class Person:
    # Class variable (shared by all instances)
    species = "Human"

    # Constructor
    def __init__(self, name, age):
        # Instance variables
        self.name = name
        self.age = age

    # Instance method
    def greet(self):
        return f"Hello, my name is {self.name}"

    # Instance method with parameters
    def celebrate_birthday(self):
        self.age += 1
        return f"Happy {self.age}th birthday, {self.name}!"

    # Static method (doesn't use self)
    @staticmethod
    def is_adult(age):
        return age >= 18

    # Class method (receives class as first argument)
    @classmethod
    def create_anonymous(cls):
        return cls("Anonymous", 0)

# Creating objects
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

# Accessing attributes and methods
print(person1.name)  # "Alice"
print(person1.greet())  # "Hello, my name is Alice"
print(Person.species)  # "Human"
print(Person.is_adult(20))  # True

# Creating object using class method
anonymous = Person.create_anonymous()
```

### Inheritance

```python
# Base class
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

# Derived class
class Dog(Animal):
    def __init__(self, name, breed):
        # Call parent constructor
        super().__init__(name)
        self.breed = breed

    # Override method
    def speak(self):
        return "Woof!"

# Creating objects
dog = Dog("Rex", "German Shepherd")
print(dog.name)  # "Rex"
print(dog.breed)  # "German Shepherd"
print(dog.speak())  # "Woof!"
```

### Special Methods (Magic Methods)

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # String representation
    def __str__(self):
        return f"Point({self.x}, {self.y})"

    # Representation (for debugging)
    def __repr__(self):
        return f"Point({self.x}, {self.y})"

    # Addition
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

    # Equality
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# Using special methods
p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2  # Point(4, 6)
print(p1)  # "Point(1, 2)"
print(p1 == Point(1, 2))  # True
```

## Modules and Packages

### Importing Modules

```python
# Importing entire module
import math
result = math.sqrt(16)  # 4.0

# Importing specific functions
from math import sqrt, pi
result = sqrt(16)  # 4.0

# Importing with alias
import math as m
result = m.sqrt(16)  # 4.0

# Importing all functions (not recommended)
from math import *
result = sqrt(16)  # 4.0
```

### Creating Your Own Modules

```python
# File: mymodule.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159

# In another file
import mymodule
print(mymodule.greet("Alice"))  # "Hello, Alice!"
print(mymodule.PI)  # 3.14159
```

### Packages

A package is a directory with an `__init__.py` file and module files.

```
mypackage/
    __init__.py
    module1.py
    module2.py
    subpackage/
        __init__.py
        module3.py
```

```python
# Importing from packages
import mypackage.module1
from mypackage import module2
from mypackage.subpackage import module3
```

## File I/O

### Reading Files

```python
# Basic file reading
with open("file.txt", "r") as file:
    content = file.read()  # Read entire file

# Reading line by line
with open("file.txt", "r") as file:
    for line in file:
        print(line.strip())  # strip() removes newline characters

# Reading all lines into a list
with open("file.txt", "r") as file:
    lines = file.readlines()
```

### Writing Files

```python
# Writing to a file (overwrites existing content)
with open("file.txt", "w") as file:
    file.write("Hello, World!")

# Appending to a file
with open("file.txt", "a") as file:
    file.write("\nAnother line.")
```

### Working with JSON

```python
import json

# Reading JSON
with open("data.json", "r") as file:
    data = json.load(file)  # Converts JSON to Python dict/list

# Writing JSON
data = {"name": "John", "age": 30}
with open("data.json", "w") as file:
    json.dump(data, file, indent=4)  # indent for pretty printing

# Converting between JSON and Python objects
json_str = '{"name": "John", "age": 30}'
data = json.loads(json_str)  # String to Python object
json_str = json.dumps(data)  # Python object to string
```

## Error Handling

### Try-Except Blocks

```python
# Basic try-except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")

# Handling multiple exceptions
try:
    num = int("abc")
except ValueError:
    print("Invalid conversion")
except ZeroDivisionError:
    print("Cannot divide by zero")

# Catching any exception
try:
    # Some code
    pass
except Exception as e:
    print(f"An error occurred: {e}")

# Finally block (always executes)
try:
    file = open("file.txt", "r")
    # Process file
except FileNotFoundError:
    print("File not found")
finally:
    file.close()  # This will always execute

# With statement (context manager) - preferred for resources
with open("file.txt", "r") as file:
    # Process file
    pass  # File is automatically closed when block exits
```

### Raising Exceptions

```python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Custom exceptions
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

def some_function():
    raise CustomError("Something went wrong")
```

## Python for GenAI

### Essential Libraries for GenAI

```python
# NumPy - Numerical computing
import numpy as np
array = np.array([1, 2, 3, 4, 5])
mean = np.mean(array)
matrix = np.zeros((3, 3))  # 3x3 matrix of zeros

# Pandas - Data manipulation
import pandas as pd
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35]
})
filtered = df[df['Age'] > 28]  # Filter rows
grouped = df.groupby('Age').count()  # Group by age

# Matplotlib - Visualization
import matplotlib.pyplot as plt
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Sample Plot')
plt.savefig('plot.png')
plt.show()

# Scikit-learn - Machine Learning
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LogisticRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)

# PyTorch - Deep Learning
import torch
x = torch.tensor([1, 2, 3])
y = torch.tensor([4, 5, 6])
z = x + y  # [5, 7, 9]

# Transformers - NLP models
from transformers import pipeline
classifier = pipeline('sentiment-analysis')
result = classifier('I love Python!')[0]
print(f"Label: {result['label']}, Score: {result['score']}")
```

### Working with APIs

```python
import requests

# Making GET requests
response = requests.get('https://api.example.com/data')
data = response.json()  # Parse JSON response

# Making POST requests
payload = {'key1': 'value1', 'key2': 'value2'}
response = requests.post('https://api.example.com/submit', json=payload)

# Authentication
headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.get('https://api.example.com/protected', headers=headers)

# Error handling
response = requests.get('https://api.example.com/data')
response.raise_for_status()  # Raises exception for 4XX/5XX status codes
if response.status_code == 200:
    data = response.json()
else:
    print(f"Error: {response.status_code}")
```

## Virtual Environments

### Creating and Using Virtual Environments

```bash
# Creating a virtual environment
python -m venv myenv

# Activating the virtual environment
# On Windows:
myenv\Scripts\activate
# On macOS/Linux:
source myenv/bin/activate

# Deactivating the virtual environment
deactivate
```

### Managing Packages with pip

```bash
# Installing packages
pip install package_name
pip install package_name==1.2.3  # Specific version

# Installing multiple packages from requirements file
pip install -r requirements.txt

# Listing installed packages
pip list

# Generating requirements file
pip freeze > requirements.txt
```

## Common Python Libraries

### Standard Library

```python
# os - Operating system interface
import os
current_dir = os.getcwd()  # Get current directory
files = os.listdir('.')  # List files in current directory
os.makedirs('new_dir', exist_ok=True)  # Create directory

# sys - System-specific parameters and functions
import sys
print(sys.version)  # Python version
sys.exit(0)  # Exit program

# datetime - Date and time handling
from datetime import datetime, timedelta
now = datetime.now()
tomorrow = now + timedelta(days=1)
formatted = now.strftime('%Y-%m-%d %H:%M:%S')

# random - Generate random numbers
import random
random_num = random.randint(1, 10)  # Random integer between 1 and 10
random_choice = random.choice(['apple', 'banana', 'cherry'])  # Random item from list
random.shuffle(my_list)  # Shuffle list in-place

# re - Regular expressions
import re
pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
is_email = re.match(pattern, 'user@example.com')
```

## JavaScript to Python Comparison

### Syntax Comparison

```javascript
// JavaScript
let name = "John";
const age = 30;
let isActive = true;

// Function
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function
const square = (x) => x * x;

// Conditional
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// Loops
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((x) => x * 2);
const evens = numbers.filter((x) => x % 2 === 0);

// Object
const person = {
  name: "John",
  age: 30,
  greet() {
    return `Hello, my name is ${this.name}`;
  },
};

// Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

// Async/await
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
```

```python
# Python
name = "John"
age = 30
is_active = True

# Function
def greet(name):
    return f"Hello, {name}!"

# Lambda function
square = lambda x: x * x

# Conditional
if age >= 18:
    print("Adult")
else:
    print("Minor")

# Loops
for i in range(5):
    print(i)

# List comprehensions (instead of map/filter)
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]

# Dictionary (similar to JS object)
person = {
    "name": "John",
    "age": 30
}

def greet_method(self):
    return f"Hello, my name is {self['name']}"

person["greet"] = greet_method
# Note: In Python, methods don't have automatic access to the object

# Class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, my name is {self.name}"

# Async/await (requires asyncio)
import asyncio
import aiohttp

async def fetch_data():
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get('https://api.example.com/data') as response:
                return await response.json()
    except Exception as e:
        print(f"Error: {e}")
```

### Key Differences to Remember

1. Python uses indentation for code blocks, not curly braces
2. No semicolons at the end of statements
3. Variable declaration doesn't use `var`, `let`, or `const`
4. Python has tuples and sets as built-in data types
5. List comprehensions are more powerful than JavaScript's map/filter
6. Python's `self` parameter is explicit in methods (similar to `this` in JS)
7. Python uses `__init__` instead of `constructor`
8. Python's async/await requires the `asyncio` library
9. Python has built-in support for complex numbers
10. Python's `None` is equivalent to JavaScript's `null`

## Final Tips for JavaScript Developers Learning Python

1. **Indentation matters**: Python uses indentation for code blocks, so be consistent (usually 4 spaces).
2. **Use list comprehensions**: They're more Pythonic than loops for creating new lists.
3. **Embrace duck typing**: Python is dynamically typed like JavaScript, but with a "duck typing" philosophy.
4. **Use context managers**: The `with` statement helps manage resources properly.
5. **Learn the standard library**: Python has a rich standard library that can save you time.
6. **Follow PEP 8**: Python's style guide helps write clean, readable code.
7. **Use virtual environments**: Keep your project dependencies isolated.
8. **Understand mutable vs immutable types**: Lists and dictionaries are mutable, strings and tuples are immutable.
9. **Use f-strings for formatting**: They're similar to JavaScript template literals.
10. **Leverage Python's built-in functions**: `map()`, `filter()`, `zip()`, `enumerate()`, etc.

Good luck with your GenAI project! This guide should help you get up to speed quickly with Python's syntax and features.
