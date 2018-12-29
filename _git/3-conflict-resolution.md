---
layout: page
title:  Conflict Resolution
description: Resolving merge conflicts.
---

The way you resolve conflicts differs based on whether you're doing a merge or a rebase.

**When Merging:**
- you're resolving conflicts all-at-once
- you're not modifying existing commits

**When Rebasing:**
- you're resolving conflicts one-by-one
- you may end up rewriting history

## Merge conflicts
[Official Documentation](https://git-scm.com/docs/git-merge#_how_conflicts_are_presented)

Merging will create a new commit, in which you will make the changes necessary
to get the branch into the desired state. This new commit (called a **Merge commit**)
acts as a sort of _glue_ between the two versions of the code.

## Rebase conflicts
[Official Documentation](https://git-scm.com/docs/git-rebase)

In case of conflict, git rebase will stop at the first problematic commit.

A rebase first resets your branch to reflect the branch you're rebasing onto,
and then reapplies your commits one-by-one on top of the target branch.
Until when merging, where you would be resolving all the conflicts at once

During a rebase you're going through each of your commits again, and rewriting them directly
to make them compatible with the new base.
