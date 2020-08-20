---
layout: page
title:  Pass data between fragments
---

<!--
TODO
- Passing data to navigated fragment
-->

# Passing data to the previous fragment

### Intro

Starting with [Fragment 1.3.0-alpha04](https://developer.android.com/jetpack/androidx/releases/fragment#1.3.0-alpha04), each `FragmentManager` implements [`FragmentResultOwner`](https://developer.android.com/reference/androidx/fragment/app/FragmentResultOwner). This means that a `FragmentManager` can act as a central store for fragment results. This change allows separate fragments to communicate with each other by setting fragment results and listening for those results without requiring fragments to have direct references to each other.


### Dependencies

```gradle
implementation "androidx.fragment:fragment-ktx:1.3.0-alpha04"

// Optional Navigation dependencies
implementation "android.arch.navigation:navigation-fragment-ktx:1.0.0-alpha09"
implementation "android.arch.navigation:navigation-ui-ktx:1.0.0-alpha09"
```

### The code

```kotlin
class FirstFragment : Fragment() {

    companion object {
        const val RESULT_REQUEST_KEY = "resultRequest"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setFragmentResultListener(RESULT_REQUEST_KEY) { key, bundle ->
            val result = bundle.getString(SecondFragment.RESULT_KEY)
            viewModel.doSomething(result)
        }
    }

    // TODO: Show how to navigate to the next fragment
}
```

```kotlin
class SecondFragment : Fragment() {

    companion object {
        const val RESULT_KEY = "resultKey"
    }

    fun sendResultToCallerAndExit() {
        setFragmentResult(event.requestKey, bundleOf(RESULT_KEY to event.result))
        findNavController().navigateUp()
    }
}
```


---
### References

[Android Developers - Pass data between fragments](https://developer.android.com/training/basics/fragments/pass-data-between)
