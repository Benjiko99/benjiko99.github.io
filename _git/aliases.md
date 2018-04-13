---
layout: page
title:  Aliases
description: Shorten commands or define new ones.
---
### Aliases
[Further Reading](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)

Aliases let you define shorthands for commands or sets of commands.

### Defining an Alias
```
# Syntax
$ git config --global alias.<shorthand> <command>

# Examples
$ git config --global alias.cont 'rebase --continue'
$ git config --global alias.abort 'rebase --abort'

# Usage
$ git cont
$ git abort
```

You can not only shorten commands with aliases, but also define new ones:

```
# Alias to undo latest commit
$ git config --global alias.undo 'reset HEAD~'
```

Now you can undo the latest commit with `$ git undo`.

---

*As you can tell, Git simply replaces the new command with whatever you alias it for.*

### Running External Commands
If you wanted to run an external command, rather than a Git subcommand, you would start the command with a `!` character. We can demonstrate by aliasing `git visual` to run `gitk`:

```
$ git config --global alias.visual '!gitk'
```
