# JMinor

### ✂️ A configurable Two-Way JSON minifier to reduce your payload size.

![jminor](https://img.shields.io/npm/v/jminor.svg?style=flat-square)
[![Travis](https://img.shields.io/travis/uditalias/jminor.svg?style=flat-square)](https://travis-ci.org/uditalias/jminor)


## What is it good for?

When passing data back and forth between servers and clients its always a good idea to reduce your payload size to the minimum, that will save you money and time for your users.

JMinor will help you achive this task by reducing the size of your payload with a generated payload translation dictionary.

#### Turn (~136 Bytes):
```json
{
    "my_very_long_key": 1,
    "deep_object": {
        "a_falsy_value": false,
        "filled_array": [1, 2, 3],
        "empty_array": [],
        "another_array": [{
            "some_number": 0
        }]
    }
}
```

#### Into (~25 Bytes):
```json
{
    "a": 1,
    "b": {
        "d": [1, 2, 3]
    }
}
```

#### And then back into (~61 Bytes):
```json
{
    "my_very_long_key": 1,
    "deep_object": {
        "filled_array": [1, 2, 3]
    }
}
```

## Install
Install via npm with
```sh
$ npm install --save jminor
```

Or use the CDN:

```html
<script src="https://unpkg.com/jminor/umd/jminor.js"></script>
```
Or the minified version:
```html
<script src="https://unpkg.com/jminor/umd/jminor.min.js"></script>
```

> You can use JMinor both in the Client and the Service (or any other ECMAScript runtime).


## Usage


### Dictionary

The first thing to do is to create a Dictionary. The dictionary will hold all the original payload keys mapped to their translations.

```javascript
import { createDictionary } from "jminor";

const dictionary = createDictionary();
```

`createDictionary()` is a factory function that receive a key generator factory.  
A key generator is a module that generates dictionary keys.

**`createDictionary(keyGeneratorFactory)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| keyGeneratorFactory | [`() => IKeyGenerator`](src/generators/IKeyGenerator.ts) | false | [`createDefaultKeyGenerator`](src/generators/defaultKeyGenerator.ts) | [See below]() |

#### Dictionary API

**`dictionary.replaceKeyGenerator(keyGenerator)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| keyGenerator | [`IKeyGenerator`](src/generators/IKeyGenerator.ts) | true | - | - |

- replaces the current key generator.  
***Note!*** that this will reset the dictionary.

**`dictionary.fromJSON(data)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| data | JSON | true | - | - |

- This method will digest the json object passed to it, and generates a uniqe key for each property for later translation

**`dictionary.extendWith(data)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| data | JSON | true | - | - |

- After dictionary is craeted and generated, you can pass another object to extend the dictionary that was created with the `fromJSON` method.

**`dictionary.export()`**

- Returns the generated dictionary as a raw object.

**`dictionary.import(rawDictionary)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| rawDictionary | JSON | true | - | exported raw dictionary |

- If you have exported dictionary received from the `export` method, you can import it.

**`dictionary.ktoc(key)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| key | String | true | - | - |

- Translates original key to generated key, if it exist in the dictionary.

**`dictionary.ctok(ckey)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| ckey | String | true | - | - |

- Translates generated key to original key, if it exist in the dictionary.

### Compress

After we have our dictionary with the generated keys, we can go and compress some data.

```javascript
import { compress } from "jminor";

const compressed = compress(data, dictionary, config);
```

**`compress(data, dictionary, config)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| data | JSON | true | - | A JSON with keys that presented in the dictionary |
| dictionary | Dictionary | true | - | - |
| config | [`ICompressConfig`](src/minifier/ICompressConfig.ts) | false | See below | - |

#### Config and defaults
```javascript
{
    // Translate object keys
    // Default: true
    translateKeys: true,

    null: {

        // Remove null values (null)
        // Default: false
        removeNull: false,

        // If removeNull is true, exclude this keys
        // Default: []
        exclude: []
    },

    boolean: {

        // Remove false values (false)
        // Default: false
        removeFalse: false,

        // If removeFalse is true, exclude this keys
        // Default: []
        exclude: []
    },

    string: {

        // Remove empty strings ("")
        // Default: false
        removeEmpty: false,

        // If removeEmpty is true, exclude this keys
        // Default: []
        exclude: []
    },

    number: {

        // Remove zero values (0)
        // Default: false
        removeZero: false,

        // If removeZero is true, exclude this keys
        // Default: []
        exclude: []
    },

    object: {

        // Remove empty objects ({})
        // Default: false
        removeEmpty: false,

        // If removeEmpty is true, exclude this keys
        // Default: []
        exclude: []
    },

    array: {

        // Remove empty arrays ([])
        // Default: false
        removeEmpty: false,

        // If removeEmpty is true, exclude this keys
        // Default: []
        exclude: []
    }
}
```

***Note!*** All config keys are optionals

### Decompress

After compressing some data we can decompres it.  
***Note!*** that some data may be truncated based on your compress config.

```javascript
import { decompress } from "jminor";

const data = decompress(compressed, dictionary);
```

**`decompress(compressed, dictionary)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| compressed | JSON | true | - | A JSON with keys that presented in the dictionary |
| dictionary | Dictionary | true | - | - |

## Generators

### JMinor comes with two built in key generators:
- `DefaultKeyGenerator` - generates keys in the form of `aaa`, `aab`, `zxc` etc.  

- `NumericKeyGenerator` - generates keys in the form of a numeric ascending series.

You can create your own key generator, if you will, you should implement the [`IKeyGenerator`](src/generators/IKeyGenerator.ts) interface.

See the `generators/` folder for source example

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details