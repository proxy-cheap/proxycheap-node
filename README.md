# proxycheap.js

[![axios](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/proxycheap.js/axios)](https://www.npmjs.com/package/axios)

[![GitHub stars](https://img.shields.io/github/stars/LockBlock-dev/proxycheap.js.svg)](https://github.com/LockBlock-dev/proxycheap.js/stargazers) ![npm](https://img.shields.io/npm/dm/proxycheap.js)

proxycheap.js is a Node.js module that allows you to easily interact with the proxy-cheap API.

• Promise based

• Performant

• 100% coverage of the proxy-cheap API

## Installation

• Download [NodeJS](https://nodejs.org) and get [NPM](https://www.npmjs.com/get-npm)

With GitHub :

• Download the project or clone it

• Go to the proxycheap.js folder and do `npm install`

• Require the [client.js](/src/client.js)

With NPM :

• Download the project

• Do `npm install proxycheap.js`

• Require the library

## Documentation

See the [API documentation](/API.md)  
See the [changelog](/CHANGELOG.md)

## Example usage

The library can be used in both CommonJS and ES Modules

### Using the library

**Create an API key [here](https://app.proxy-cheap.com/account/security/api-keys).**

```js
const { Client } = require("proxycheap.js");
//OR
import { Client } from "proxycheap.js";

const client = new Client("API_KEY", "API_SECRET");

client.balance().then((data) => console.log(data.balance));

//OR

const myFunc = async () => {
    const { balance } = await client.balance();
    console.log(balance);
};

myFunc();
```

The library is async, be sure to use [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#syntax) or [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#syntax)

## Credits

[proxy-cheap](https://www.proxy-cheap.com/)

## Copyright

See the [license](/LICENSE)
