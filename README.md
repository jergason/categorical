#categorical

categorical is an impementation of a [categorical distribution](http://en.wikipedia.org/wiki/Categorical_distribution)
in JavaScript. Why do you care about it?

It allows you to do fancy things like randomly draw from several different outcomes that all have
different probabilities. Imagine you have a bunch of different fruits, and you want to randomly pick
one to eat. However, you like some fruits more than others.

```JavaScript
var fruits = [
    {name: 'apple', like: 10 }
  , {name: 'banana', like: 15}
  , {name: 'peach', like: 20}
];
```

Fruits that you like more should show up more when you randomly draw, but you still sometimes want to pick
fruits that you like less. Categorical to the rescue!

```JavaScript
var categorical = require('categorical')
  , distribution
  , fruitResults = [0,0,0]
  , fruit
  , i
  ;

  function calculateScoreForFruit(fruit) {
    return fruit.like;
  }

  distribution = categorical.createDistribution(fruits, calculateScoreForFruit);

  // test the results
  for (i = 0; i < 10000; i++) {
    fruit = categorical.draw(distribution);
    if (fruit.name === 'apple') {
      fruit[0]++;
    }
    else if (fruit.name === 'banana') {
      fruit[1]++;
    }
    else {
      fruit[2]++;
    }
  }

  console.log('apple: ' + fruit[0] + ', banana: ' + fruit[1] + ', peach: ' + fruit[2]);
```


##Installation
If you are using node.js, simply `npm install categorical`.

If you are in the browser, categorical looks for one of the CommonJS browser
package managers (browserify, OneJS, pakmanager).

If none of these are found, it falls back to attaching itself to the `window` object,
and can be accessed via `window.categorical`.


##API

categorical is pretty simple. It only has two calls:


###categorical.createDistribution(items, scoreFunction)

Creates and returns a categorical distribution.

`items` - An array of items to use to create the distribution.

`scoreFunction` -  `function(item)` that returns a numeric score
 for an individual item from `items`.

Returns the distribution. An array of objects containing the
 probability windows for each item, along with the item itself.

```javascript
var fruits = [
    {name: 'apple', like: 10 }
  , {name: 'banana', like: 15}
  , {name: 'peach', like: 20}
];
function calculateScoreForFruit(fruit) {
  return fruit.like;
}

distribution = categorical.createDistribution(fruits, calculateScoreForFruit);
```

###categorical.draw(distribution)

Draw a random item from the `distribution`.

`distribution` is the distribution returned from a call to `createDistribution`.

returns the random item returned from the distribution.


```javascript
var fruit = categorical.draw(distribution);
console.log(fruit); // will be either 'apple', 'banana', or 'peach'
```
