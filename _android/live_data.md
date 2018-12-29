---
layout: page
title:  Live Data
description: General guide to using Live Data
---

## Using LiveData as triggers/events
In this example we have a list of transactions that we want to show to the user.
In case that the data fails to load, we show a *retry* button that the user can click,
which triggers the repository to fetch the data again. There is also a *filter* on the UI
for the transaction type, which should also trigger the repository to return the newly filtered list.

We can achieve this with `MediatorLiveData` and `Transformations.switchMap()`.
`MediatorLiveData` lets us be notified when another `LiveData` object has had it's
value changed. In fact, it can listen to multiple instances of `LiveData` at once
by adding them as sources with `MediatorLiveData.addSource(otherLiveData, onChangedListener)`.

In our example we want the *retry* event and the *filter* to act as the sources.

We'll then use `Transformations.switchMap(mediatorWithTriggers) {}` to listen
for any of the sources in the mediator being changed, and respond by fetching
data from the repository.

First, lets see the helper classes that we'll be using *(to make the intent of our code clearer)*:
```
class LiveTrigger : MutableLiveData<Void>() {

    /** Calls the setValue() method, triggering the observers. */
    fun trigger() {
        value = value
    }
}

class MediatorLiveTrigger : MediatorLiveData<Void>() {

    /** Calls the setValue() method, triggering the observers. */
    fun trigger() {
        value = value
    }
}
```

Now for the full example:
```
class TransactionListViewModel @Inject constructor(
    private val repository: TransactionListRepository
) : ViewModel() {

    val transactions: LiveData<Resource<List<Transaction>>>

    private val transactionListFilter = MutableLiveData<TransactionListFilter>()
    private val retryTrigger = LiveTrigger()

    init {
        transactionListFilter.value = TransactionListFilter()

        val triggers = MediatorLiveTrigger().apply {
            addSource(transactionListFilter) { trigger() }
            addSource(retryTrigger) { trigger() }
        }

        transactions = Transformations.switchMap(triggers) {
            repository.loadTransactionList(transactionListFilter.value!!)
        }
    }

    /** Called from UI when the user wants to reload data */
    fun retry() {
        retryTrigger.trigger()
    }

    /** Called from UI when the user changes the filter */
    fun setTransactionListFilter(transactionListFilter: TransactionListFilter) {
        transactionListFilter.value = transactionListFilter
    }
}
```

Our `MediatorLiveTrigger` can be used with any `LiveData` as a source, not just
`LiveTrigger`. We use `LiveTrigger` when the `LiveData` doesn't hold any actual data,
but acts just as a *trigger/event* for a `switchMap()`.
