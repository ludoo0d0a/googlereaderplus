# Introduction #

Learn how to use filter like an advanced user.


# Details #

There are 2 zones :
  * Excludes items
  * Includes items

Expressions are always multiline.
Each line are considered as AND operator.

Each words (blank separated) is considered as a term.
For a complete sentence, you could use quotes.

```
mac iphone
windows phone
```
will filter all items with either
mac AND iphone
or
windows AND phone

A complete phrase can be used using quotes :
```
"Guitar Hero"
```

If you want use regular expression, start your term with a #
```
#[iI]P[ao]d|ne
#[iI]os\s*\d+
```

You should use javascript regular expression.
Some references can be found here :
  * [w3schools regexp page](http://www.w3schools.com/jsref/jsref_obj_regexp.asp)
  * [Mozilla regular epxressions documentation](https://developer.mozilla.org/en/JavaScript/Guide/Regular_Expressions)

You could filter using specific keywords:
```
apple author:Matt
baseball tag:sports
birds date:Mar
facebook from:ZDNet
body:subtext
```

To filter on last days, you could use the following tag:
```
days:4
```
This will filter items on last 4 days.