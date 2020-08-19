---
layout: page
title:  Rebasing
description: Manipulating commit history.
---

[Official Documentation](https://git-scm.com/docs/git-rebase), [Further Reading](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

*// TODO What is a rebasing and when to use it*

## Interactive Rebase
The interactive mode lets you chose what you want to do with each commit.

```
# Syntax
$ git rebase -i <after-this-commit>

# Usage
$ git rebase -i HEAD~3
$ git rebase -i 2e03c4467275da670bd8d14ee98278979681f6ef
```

When you enter a **Interactive Rebase**, git displays what commands are at your disposal:
```
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
```

## Getting out of a Bad Rebase
If you're currently in the middle of a rebase and would like to abort it, you can do so with this command:
```
$ git rebase --abort
```
The rebase will be aborted and the repository will be reset to the state it was in before the rebase started.

If you've already finished the rebase and then realised you'd like to revert it, you can do so via [git reflog](/git/reflog).

## Useful Aliases
You can learn more about [Aliases here](/git/aliases).

```
$ git config --global alias.cont 'rebase --continue'
$ git config --global alias.abort 'rebase --abort'
```

## Replacing/Swapping Commits
With interactive rebase, you can use the `pick` command to replace commits deep in the history.
As an example, let's say you've decided to make large changes to your repository's initial commit.
You used `git rebase -i --root` to rebase your history all the way to the root (initial) commit,
and used the `edit` commit to make the desired changes on your **master** branch. But you have more
branches than just **master**, how do you get your changes to the other branches without having to
redo them in each one?

First, grab the hash of your initial commit on **master**, which reflects the changes you want to apply elsewhere.
Let's say our hash is `16b845e`.

Then checkout and rebase your target branch.
```
git checkout feature-branch
git rebase -i --root
```

This opens up the editor with a history similar to this:
```
pick cbc85d9 Initial commit
pick e7ed0b1 Wrote some code
pick d5377f5 Wrote more code
```

Now all we have to do to replace the "Initial commit" on **feature-branch** with the one from **master**,
is to change the hash of it's `pick` command from `cbc85d9` to `16b845e`, like so:

```
pick 16b845e Initial commit
pick e7ed0b1 Wrote some code
pick d5377f5 Wrote more code
```

_NOTE: You do not need to change the name of the commit that's after the hash._

Git will now use our new "Initial commit" instead of the old one.
