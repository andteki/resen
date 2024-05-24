# Resen command-line HTTP client

Simple command-line HTTP client.

GitHub:

* [https://github.com/andteki/resen.git](https://github.com/andteki/resen.git)

## Why

The HTTPie command is a very good program, but it cannot be installed with the npm package manager. What we have is not a command line program.

## Install

```cmd
npm i -g resen
```

After installation, we get a res command. Check:

```cmd
res --version
```

## Using

Methods that can be used:

* get
* post
* put
* patch
* delete

### Syntax

```cmd
res [method] <url> [params...]
```

### Examples

GET method:

```cmd
res http://localhost:8000/employees
```

```cmd
res localhost:8000/employees
```

```cmd
res get localhost:8000/employees
```

POST method:

```cmd
res post localhost:8000/employees name='Steven' city='Szeged'
```

PUT method:

```cmd
res put localhost:8000/employees/1 name='Steven' city='Szeged'
```

PATCH method:

```cmd
res patch localhost:8000/employees/1 name='Steven' city='Szeged'
```

DELETE method:

```cmd
res delete localhost:8000/employees/1
```

## TODO

Use bearer token
