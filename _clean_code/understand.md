---
layout: page
title:  Understand Clean Code
description: 
---

I don't want to be reading code, I want to read human-readable sentences. That's one aspect of what Clean Code is; the other aspect is that is easy to change. You want to be hiding implementation details. Why do I have to read the code, when all I wanted to know, was what the code does, which could have been described with a nice function name. (COUNTER-POINT-WARNING: You can only know what the code really does by reading it). I shouldn't have to read the code to know what it is trying to do; the function names should make that clear. If every piece of work is a separate function then I can understand the whole program very quickly. Clean Code is a step towards writing code that humans can understand. OOP helps with testing?

"You cannot teach beginners top-down programming, because they don't know
which end is up." - C. A. R. Hoare

"Everything should be built top-down, except the first time." - Alan Perlis

Top-down is good for describing how something should work to someone, but it
doesn't really work well when you're actually trying to implement it.
This is because when you're describing something, you are talking about
the end result, a conclusion of a thinking process, but when you're implementing
it, you're describing the process.

**How should be organize our procedures?**
"We propose [...] that one begins with a list of difficult design decisions
or design decisions which are likely to change. Each module is then designed
to hide such a decision from the others." - David L Parnas

But how do you know that something is a difficult design decision?
We spend ours discussing it; we can't agree on something; the fact that you
cannot agree with your colleagues about something is a strong indicator that
you're not sure about this. It is not an opportunity to beat your colleague or
come up with a killer answer, it's an opportunity to step back and go "oh that's
interesting.", maybe the answer is not so obvious, maybe there are multiple
ways, maybe the way we describe it now is good in one way but in six months
the world moves on and we have to change; so let's structure our code according
to this level of indecision.

**Data Structuring**
"An abstract data type defines a class of abstract objects which is completely
characterized by the operations available on those objects.
A programmer [...] is concerned only with the behavior which that object
exhibits but not with any details of how that behavior is achieved by means of
an implementation." - Barbara Liskov

## Procedural Programming
The goal is to decompose a program into smaller pieces to help achieve
modifiability. A program is decomposed hierarchically.

There is typically a single thread of control and each component in the
hierarchy gets this control (optionally along with some data) from its parent
and passes it along to its children.

## Functional Programming
Is Procedural Programming without mutable state.

## Structured Programming
### Block Structure
This is the idea of folding concepts away, it's about folding complexity.
It is the idea that I can just fold away all of the second-level stuff
and I'm going to focus on the first-level stuff.

So can I reason about these two functions without understanding the content
of each branch? And the answer is yes in one case and no in the other.

This type of function could contain surprises (in a more complex example).
```
fun isLeapYear(year) {
  if (year % 400 == 0)
    return true
  if (year % 100 == 0)
    return false
  if (year % 4 == 0)
    return true

  return false
}
```

This type of function makes it clear that it is a 4-way decision. The parts are
mutually exclusive.
```
fun isLeapYear(year) {
  if (year % 400 == 0)
    true
  else if (year % 100 == 0)
    false
  else if (year % 4 == 0)
    true
  else
    false
}
```

Helps to imagine the functions as being folded:

Here you feel like the function is always going to return false and there's
a bunch of guard statements to check for bad cases, or some pre-processing.
The point is you cannot tell what is going on unless you read the next-level
of code. The idea of a block, and procedural programming is to encapsulate,
so that you don't need to know what the rest of the code does to understand it.
In the other example, I don't need to know if there are returns in the folded
sections, in fact there can be anything in there, and it won't affect the one
block that I care about.
```
fun isLeapYear(year) {
  if (year % 400 == 0)
    ...
  if (year % 100 == 0)
    ...
  if (year % 4 == 0)
    ...

  return false
}
```

```
fun isLeapYear(year) {
  if (year % 400 == 0)
    ...
  else if (year % 100 == 0)
    ...
  else if (year % 4 == 0)
    ...
  else
    ...
}
```

### Hierarchical Program Structures
"A procedure which is capable of giving rise to block instances which survive
its call will be known as a class; and the instances will be known as objects
of that class." - C. A. R. Hoare

So there is this idea that the block and the procedure concept is the powerful
idea. What if I were to pass to you a block that contained data and its own procedures, we can call that a closure, or say that there's lambda-ness
happening.

JavaScript example:
```
const newStack = () => {
  const items = []
  return {
    depth: () => items.length,
    top: () => items[0],
    pop: () => P items.shift() },
    push: newTop => { items.unshift(newTop) },
  }
}
```

The implementation is private, `items` are a local variable to the lambda, you
can't even reflect on it, it's proper private.

The function returns a collection of named lambdas, that operate on that variable.

So what you are given is something that is truly a separation of implementation
from the public face, you are only presented with something through which you
can name methods; this is effectively a realization of that block idea; this is
one of the purest forms of object orientation that you can have.

#### Concept Hierarchies
"The construction principle involved is best called abstraction; we concentrate
on features common to many phenomena, and we abstract away features too far
removed from the conceptual level at which we are working." - C. A. R. Hoare

"A type hierarchy is composed of subtypes and supertypes. The intuitive idea
of a subtype is one whose objects provide all the behavior of objects
of another type (the supertype) plus something extra." - Barbara Liskov

### Coordination and Computation
"We can build a complete programming model out of two separate pieces--the
computation model and the coordination model." - David Gelernter + Nicholas Carriero

Historically we had:
"Algorithms + Data Structures = Programs" - Niklaus Wirth

We can refine this to:
"Coordination + Computation = Programs"

With declarative languages you set an objective and relationships and the
computation happens procedurally, it's a regular script.

Our computation should be a single computational activity: a single-threaded,
step-at-a-time computation. The idea is you have little pieces of computation,
that you then coordinate in a pipeline.
We should be using Immutable data types and no locks/mutexes.
