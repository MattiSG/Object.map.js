Object.map.js
=============

`Array.map` for `Object` in JavaScript. Map both an object’s keys and values.

Usage
-----

By default, will allow calling `Object.map` (obviously, as a non-enumerable property).

If you're terrified about augmenting prototypes of natives zomg ruin on us all, just set the `shouldAugmentObjectPrototype` param to `false` on the last line. The enclosing IEFE will then return the `mapObject` function with the source object as its first parameter, so you can call it however you want.


```JavaScript
/**
*@param	{Function|String}	[valueMapper = pass-through]	The function to map the value from the source's value. Will be passed the current value, the original key, and the mapped key. If a string, will be set to an accessor for that attribute.
*@param	{Function|String}	[keyMapper = pass-through]	The function to map the key from the source's key. Will be passed the original key and the original value. If a string, will be set to an accessor for that attribute.
*@throws	TypeError	If one of the mapper is an illegal type.
*@returns	{Object<String,String>}
*/
Object.map(valueMapper, keyMapper);
```

### Example

```JavaScript
var source = { a: 1, b: 2 };
function sum(x) { return x + x }

source.map(sum);            // returns { a: 2, b: 4 }
source.map(undefined, sum); // returns { aa: 1, bb: 2 }
source.map(sum, sum);       // returns { aa: 2, bb: 4 }
```


License
-------

**MIT**: Do whatever you want as long as you don't sue me nor prevent others to reuse this piece of software.
Also, credit is always appreciated  ;)
