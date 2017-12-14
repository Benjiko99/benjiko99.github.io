---
layout: page
title:  Aliases
description: Shorten, rename or create new commands.
---
[Official Documentation](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)

If you don’t want to type the entire command or want to chain together multiple commands, you can easily set up an alias using `$ git config`. Here are a couple of examples you may want to set up:

```
$ git config --global alias.cont 'rebase --continue'
$ git config --global alias.abort 'rebase --abort'
```

Now you can use them like so:

```
$ git cont
$ git abort
```

You can also use aliases to create commands you think should exist:

```
$ git config --global alias.undo 'reset HEAD~'
```

Now you can undo the latest commit by using `$ git undo`.

---

As you can tell, Git simply replaces the new command with whatever you alias it for. However, maybe you want to run an external command, rather than a Git subcommand. In that case, you start the command with a `!` character. We can demonstrate by aliasing `git visual` to run `gitk`:

```
$ git config --global alias.visual '!gitk'
```
