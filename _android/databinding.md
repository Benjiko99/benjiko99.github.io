---
layout: page
title:  Databinding
description: Tips for using Databinding
---

## Where should you do the binding?

The ViewModel holds data. The View(Fragment) should be just binding it.

I guess either the Fragment or a BindingAdapter should be retrieving the resources instead of the ViewModel.

The layout is also kinda a View, the question is should it be communicating directly with the ViewModel as the Fragment does, or should it go through the Fragment? The documentation seems to be suggesting talking directly to the ViewModel.

Types of DataBinding
---
There are several ways to bind data, all of which can be used at the same time.

You can be binding from the View or the ViewModel or BindingAdapters.

The ViewModel can use constants, LiveData or Observables. Technically it can access context but I'd rather avoid it. It should probably just be communicating with other components like the Repository and providing that data to Views in a raw form. It also holds all the business logic and Views should be calling it's callbacks when they want to do something.
**THE VIEWMODEL SHOULD ABSOLUTELY NOT BE DOING FORMATTING, IT HAS A APPLICATION CONTEXT NOT A FRAGMENT CONTEXT, ITS SUPPOSED TO ONLY USE IT TO ACCESS SYSTEM SERVICES AND SUCH.** Only the Fragment has the real context with theming and other things.

The View can use constants, or dynamic values set inside of an Observer when data from the ViewModel changes. It has access to context and can handle formatting.

BindingAdapters can work with any kind of reference you pass to them, originating from anywhere. They have access to the view that they are binding and to a context; they can thus handle formatting and resolving resource references.

Layout can reference ViewModel to directly call callbacks and do **TWO-WAY DATABINDING**.

The ViewModel can call a Worker with values provided by the user. Those values would be gathered by using a two-way databinding.

Binding adapters can be called manually, so we could just be using BindingAdapters and either use them in the layout or View.
