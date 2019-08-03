---
layout: page
title: Git
permalink: /git/
---
### Guides
<ul>

{% for page in site.git %}
  <li>
    <span style="font-size: 18px;"><a href="{{ page.url }}">{{ page.title }}</a></span>
    {% if page.description %}
      <span> - {{ page.description }}</span>
    {% endif %}
  </li>
{% endfor %}

</ul>

<br />
### Uncategorized Guides
---
<br />

# Staging / Working-Copy Manipulation
**Undo** latest commit and **keep it's changes** (they are put into the index).

*(The commit is only removed locally.)*

```
$ git reset HEAD~
```

**Undo** latest commit and **throw away the changes**.

```
$ git reset --hard HEAD~
```

Modify previous commit with staged changes. You'll also be able to change it's commit message.

```
$ git commit --amend
```

# Rebasing
```
$ git rebase -i HEAD~3
```

# Overwriting the Remote
```
# Will overwrite the remote with no regards.
$ git push --force

# Will only overwrite the remote if it has not changed since the last time you had pulled/fetched it.
$ git push --force-with-lease
```

# Clean-up

```
# Mac/Linux
$ git fetch -p && for branch in `git branch -vv | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done

# On Windows replace 'awk' with 'gawk'
```

Deletes local branches that no longer exist on the remote

# Restoring Lost Work
```
$ git log --graph --oneline --decorate --all $( git fsck --no-reflog | awk '/dangling commit/ {print $3}' )
```

Prints a graph of dangling commits, useful for finding a dropped Stash

# Reset Branch
```
$ git reset --hard origin/target_branch
```

Throws away your locally checked out branch and completely replaces it with
the remote target branch.

<br />
### Upcoming Guides
---
<br />
- Discard all changes
