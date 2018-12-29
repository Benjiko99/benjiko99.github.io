---
layout: page
title:  Examples of Clean Code
description: What does Clean Code look like?
---

## Staircase Example
We'll be solving the problem from this link: https://www.hackerrank.com/challenges/staircase/problem,
read it for the full description, but in-short, we'll be printing a staircase out of '#' characters into the console, like so:

```
   #
  ##
 ###
####
```

A simple code to do this would look like this:

```
import java.util.Scanner

fun staircase(n: Int) {
    for (y in 1..n) {
        var line = ""
        for (x in 1..n) {
            if (x <= n-y)
                line += " "
            else
                line += "#"
        }
        System.out.println(line)
    }
}

fun main(args: Array<String>) {
    val scan = Scanner(System.`in`)
    val n = scan.nextLine().trim().toInt()
    staircase(n)
}
```

but the above code is not Clean Code.

Clean Code would look like this:

```
import java.util.Scanner

class StaircaseBuilder() {

    fun build(size: Int): Staircase {
        var stairs = Array<Step>(size) {
            i -> Step(width=i+1)
        }
        return Staircase(stairs)
    }
}

class Staircase(var stairs: Array<Step>) {

    fun print() {
        for (step in stairs)
            System.out.println(step.renderMirrored(stairs.size))
    }
}

class Step(val width: Int) {
    val HASH = '#'
    val SPACE = ' '

    fun renderMirrored(staircaseWidth: Int): String {
        var output = ""
        for (i in 1..staircaseWidth) {
            if (i <= staircaseWidth - width)
                output += SPACE
            else
                output += HASH
        }
        return output
    }
}

fun main(args: Array<String>) {
    val scan = Scanner(System.`in`)
    val n = scan.nextLine().trim().toInt()

    val staircase = StaircaseBuilder().build(n)
    staircase.print()
}

```

_TODO: The most important thing to note is that there is zero human-readable text present in the sequential example. You cannot just look at it and have an immediate idea of what the codes purpose is supposed to be._

_TODO: The thing that really makes it click in your head, is when you're actually doing the conversion from the simple to the OOP version, as you'll notice fundamental truths about the code
and ways to describe it in simple and self-fulfilling ways._
_TODO: Explain why this code is better and how we refactored it into this form and how what it should look like was a incremental discovery process and not pre-planned_
_TODO: FORMATTING_
_TODO: Could `Step` be an inner class so that we could get rid of the `staircaseWidth: Int` param when calling `renderMirrored()`?_
_TODO: In `Step`, `HASH` and `SPACE` should be constants in a companion object._
_TODO: Since all the individual parts of code are classes, you can extend them
with additional functionality._

When the code is separated with OOP, you can add new pieces of functionality and handling at well defined points.
You could want to add error handling around a sequence of the code, all you have to do is wrap a function in another one and you're done; zero chance for error or uncertainty.
A type of some variable might have changed and you now need to convert your value to another type before proceeding;
again this would be easy to insert this new piece of logic in here.

**If on the other hand the code was a sequential mess, all of this would be of varying difficulty,
with high likelyhood of introducing errors, as the code is doing everything all at once, with no real separation into steps,
there is no clearly defined beginning and end.

**Instead of one large function responsible for everything.
you'll have many small functions with distinct responsibilities.**
