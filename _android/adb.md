---
layout: page
title:  ADB
description: Android Debug Bridge
---
# Simulating the system killing your process
You should test whether your application restarts properly if killed by the system,
either when it runs out of memory or the phone gets restarted by the user.

You can easily get the system to restart the application on whatever screen
you had opened (likely restores the intent and arguments but not state bundles?),
just navigate to the screen, press the Home button, and run this command from the
terminal:

```
adb shell am kill <package-name>
```

    am kill: Kill all processes associated with <PACKAGE>.
      Only kills processes that are safe to kill -- that is, will not impact the
      user experience.

This page contains more methods to achieve this with different kinds of state
being restored: [How to simulate Android killing my process](https://exceptionshub.com/how-to-simulate-android-killing-my-process.html).
