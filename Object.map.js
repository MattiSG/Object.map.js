/** Definition-wrapping closure, as a IEFE.
* Allow clientside inclusion without leaking in global scope.
*
*@param	{Boolean} [shouldAugmentObjectPrototype = true]	Allow calling `Object.map` (obviously, as a non-enumerable property). If you're terrified about augmenting prototypes of natives zomg ruin on us all, just set this param to `false` on the last line. This IEFE will then return the `mapObject` function, so you can call it however you want.
*@returns	{Function}
*@see	mapObject
*/
(function(shouldAugmentObjectPrototype) {
/** Map both an object’s keys and values.
*
*@param	{Object}	source	The object to map.
*@param	{Function}	valueMapper	The function to map the value from the source's value. Will be passed the original value, the original key, and the mapped key.
*@param	{Function}	keyMapper	The function to map the key from the source's key. Will be passed the original key and the original value.
*@returns	{Object}	An object whose key-value pairs are mapped by the given functions.
*@private
*/
function _mapObject(source, valueMapper, keyMapper) {
	return Object.keys(source).reduce(function(result, currentKey) {
		var keyProjection = keyMapper(currentKey, source[currentKey]);

		if (keyProjection)
			result[keyProjection] = valueMapper(source[currentKey], currentKey, keyProjection);

		return result;
	}, {});
}

/**
*@private
*/
var MAPPER_WRAPPERS = {
	'function'	: function(mapper) {
		return mapper;
	},
	'string'	: function(attribute) {
		return function accessor(source) {
			return source[attribute];
		}
	},
	'undefined'	: function() {
		return function noop(source) {
			return source;
		}
	}
}

/**
*@private
*/
function wrapMapper(mapper) {
	var result = MAPPER_WRAPPERS[typeof mapper](mapper);

	if (! result)
		throw new TypeError('The given mapper (' + mapper + ') is neither a function, a string or undefined (it is a ' + typeof mapper + ').');

	return result;
}

/** Map both an object’s keys and values.
*
*@param	{Object|Array}	source	The object whose keys and values are to be mapped.
*@param	{Function|String}	[valueMapper = pass-through]	The function to map the value from the source's value. Will be passed the current value, the original key, and the mapped key. If a string, will be set to an accessor for that attribute.
*@param	{Function|String}	[keyMapper = pass-through]	The function to map the key from the source's key. Will be passed the original key and the original value. If a string, will be set to an accessor for that attribute.
*@throws	TypeError	If one of the mapper is an illegal type.
*@returns	{Object<String,String>}
*/
function mapObject(source, valueMapper, keyMapper) {
	return _mapObject(source, wrapMapper(valueMapper), wrapMapper(keyMapper));
}


// exports

if (shouldAugmentObjectPrototype) {
	Object.defineProperty(Object.prototype, 'map', {
		value: function(keyMapper, valueMapper) {
			return mapObject(this, keyMapper, valueMapper);
		}
	});
}

return mapObject;

})(true);
