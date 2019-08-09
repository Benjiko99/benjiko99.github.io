---
layout: page
title:  State
description:
---

## Don't store state in singletons
Singletons—e.g. the `Application` class—will be destroyed when the app is idle in the background and the system needs to reclaim memory. Data should either be stored in some persistent storage (in preferences or on disk), or the app should expect that the data can be missing when it is relaunched and needs to know how to fetch it again safely.

*Further reading:*
http://www.developerphil.com/dont-store-data-in-the-application-object/
