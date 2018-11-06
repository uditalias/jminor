# JMinor

### ✂️ A configurable Two-Way JSON minifier to reduce your payload size.

![jminor](https://img.shields.io/npm/v/jminor.svg?style=flat-square)
[![Travis](https://img.shields.io/travis/uditalias/jminor.svg?style=flat-square)](https://travis-ci.org/uditalias/jminor)


## What is it good for?

When passing data back and forth between servers and clients its always a good idea to reduce your payload size to the minimum, that will save you money and time for your users.

JMinor will help you achive this task by reducing the size of your payload with a generated payload translation dictionary.

#### Turn (~150 Bytes):
```json
{
    "my_very_long_key": 1,
    "deep_object": {
        "a_falsy_value": false,
        "filled_array": [1, 2, 3],
        "empty_array": []
    }
}
```

#### Into (~55 Bytes):
```json
{
    "a": 1,
    "b": {
        "d": [1, 2, 3]
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

You can use JMinor both in the Client and the Service (or any other ECMAScript runtime).


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
| keyGeneratorFactory | [`() => IKeyGenerator`](src/generators/IKeyGenerator.ts) | false | [`createDefaultKeyGenerator`](src/generators/defaultKeyGenerator.ts) |  |

#### JMinor comes with two built in key generators:
The `DefaultKeyGenerator` - generates keys in the form of `aaa`, `aab`, `zxc` etc.  
The `NumericKeyGenerator` - generates keys in the form of a numeric ascending series.

You can create your own key generator, if you will, you should implement the `IKeyGenerator` interface.

#### Dictionary API

**`dictionary.setKeyGenerator(keyGenerator)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |
| keyGenerator | [`IKeyGenerator`](src/generators/IKeyGenerator.ts) | true | false | key generator |

**`dictionary.fromJSON(data)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |

**`dictionary.extendWith(data)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |

**`dictionary.export()`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |

**`dictionary.import(rawDictionary)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |

**`dictionary.ktoc(key)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |

**`dictionary.ctok(ckey)`**

| Name | Type | Required | Default | Description |
| - | - | - | - | - |


### Compress


### Decompress



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details