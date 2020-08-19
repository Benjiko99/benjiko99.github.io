---
layout: page
title: References
permalink: /references/
---
### References
<ul>

{% for page in site.references %}
  <li>
    <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a></span>
  </li>
{% endfor %}

</ul>

<br />
### Uncategorized References

# [Worry Dream's own collection of references](http://worrydream.com/refs/)

# [AT&T Archives: The UNIX Operating System](https://youtu.be/tc4ROCJYbm0?t=118)

Interesting how the programmers in the video talk about software and the importance of writing software that can change a lot.
"There is no way to get the perfect requirements in the first place, and that means that we have to build the software to be very change tolerant".
In general the video describes Clean Code the same way Robert C. Martin would go on to do in his book a few decades later.

What's fascinating about the growth of UNIX is the long amount of time that it was given to develop, almost organically, and based on the needs of
the users and programmers. The first installation of the program was done as late as 1972 (on a NY Telephone branch computer). It was in conjunction
with the refinement of the C programming language, principally designed by Dennis Ritchie.

This is followed up on nicely in another video [Is It Time to Rewrite the Operating System in Rust?](https://www.youtube.com/watch?v=HgtRAbE1nBM)

The main design goal of UNIX was to be simple. It is build from a small number of primitives that can be combined together to do larger things.
Kernighan describes "pipelining" as one of UNIX's greatest contributions, which is being able to combine the outputs of multiple small programs.


# [Is It Time to Rewrite the Operating System in Rust?](https://www.youtube.com/watch?v=HgtRAbE1nBM)

Really great and funny presentation going through a lot of history of programming languages and operating systems and explaining the benefits of Rust
for the development of operating systems.