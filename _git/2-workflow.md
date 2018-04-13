---
layout: page
title:  Git workflow
description: How you'll typically be working with git
---
Usually your project will have a stable branch, called **master**, and a development branch called **develop**. When working on the code you'd either push your changes directly into **develop** or make a new branch based on it and do your work there, and merge the changes at some later time.

# Keeping feature branches up to date
While you're working in your own branch on some feature, other developers are merging their changes into **develop**. It's a good idea to be periodically updating your branch with the latest version of **develop**. We do this by **rebasing** our branch.

```
$ git rebase develop
```
