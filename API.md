## Classes

<dl>
<dt><a href="#Client">Client</a></dt>
<dd></dd>
<dt><a href="#FatalError">FatalError</a> ⇐ <code><a href="#new_BaseError_new">BaseError</a></code></dt>
<dd></dd>
<dt><a href="#APIError">APIError</a> ⇐ <code><a href="#new_BaseError_new">BaseError</a></code></dt>
<dd></dd>
<dt><a href="#ParseError">ParseError</a> ⇐ <code><a href="#new_BaseError_new">BaseError</a></code></dt>
<dd></dd>
</dl>

<a name="Client"></a>

## Client
**Kind**: global class  

* [Client](#Client)
    * [new Client(API_KEY, API_SECRET)](#new_Client_new)
    * [.API_KEY](#Client+API_KEY) : <code>string</code>
    * [.API_SECRET](#Client+API_SECRET) : <code>string</code>
    * [.API_URL](#Client+API_URL) : <code>String</code>
    * [.balance()](#Client+balance) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.proxies()](#Client+proxies) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.proxy(id)](#Client+proxy) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.changeWhitelist(id, ips)](#Client+changeWhitelist) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.extend(id, months)](#Client+extend) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.buyBandwidth(id, amount)](#Client+buyBandwidth) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.configuration([config])](#Client+configuration) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.order([config])](#Client+order) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_Client_new"></a>

### new Client(API_KEY, API_SECRET)
The proxy-cheap client


| Param | Type | Description |
| --- | --- | --- |
| API_KEY | <code>string</code> | proxy-cheap API key |
| API_SECRET | <code>string</code> | proxy-cheap API secret |

**Example**  
```js
const client = new Client("API_KEY", "API_SECRET");
```
<a name="Client+API_KEY"></a>

### client.API\_KEY : <code>string</code>
The API Key

**Kind**: instance property of [<code>Client</code>](#Client)  
<a name="Client+API_SECRET"></a>

### client.API\_SECRET : <code>string</code>
The API Secret

**Kind**: instance property of [<code>Client</code>](#Client)  
<a name="Client+API_URL"></a>

### client.API\_URL : <code>String</code>
The base API Url

**Kind**: instance property of [<code>Client</code>](#Client)  
<a name="Client+balance"></a>

### client.balance() ⇒ <code>Promise.&lt;Object&gt;</code>
Get user balance.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Example**  
```js
client.balance()
```
<a name="Client+proxies"></a>

### client.proxies() ⇒ <code>Promise.&lt;Object&gt;</code>
Get user proxies.

**Kind**: instance method of [<code>Client</code>](#Client)  
**Example**  
```js
client.proxies()
```
<a name="Client+proxy"></a>

### client.proxy(id) ⇒ <code>Promise.&lt;Object&gt;</code>
Get info on a proxy.

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | proxy id |

**Example**  
```js
client.proxy(12345)
```
<a name="Client+changeWhitelist"></a>

### client.changeWhitelist(id, ips) ⇒ <code>Promise.&lt;Object&gt;</code>
Change whitelisted IPs of a proxy.

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | proxy id |
| ips | <code>Array</code> |  |

**Example**  
```js
client.changeWhitelist(12345, ["0.0.0.0", "1.1.1.1", "2.2.2.2"])
```
<a name="Client+extend"></a>

### client.extend(id, months) ⇒ <code>Promise.&lt;Object&gt;</code>
Extend a proxy.

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | proxy id |
| months | <code>number</code> |  |

**Example**  
```js
client.extend(12345, 2)
```
<a name="Client+buyBandwidth"></a>

### client.buyBandwidth(id, amount) ⇒ <code>Promise.&lt;Object&gt;</code>
Buy additional bandwidth for a proxy.

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | proxy id |
| amount | <code>number</code> | in GB |

**Example**  
```js
client.buyBandwidth(12345, 5)
```
<a name="Client+configuration"></a>

### client.configuration([config]) ⇒ <code>Promise.&lt;Object&gt;</code>
Get configuration according to filter parameters.

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> | <code>{}</code> |  |
| config.networkType | <code>string</code> |  | MOBILE, DATACENTER, RESIDENTIAL, RESIDENTIAL_STATIC |
| config.ipVersion | <code>string</code> |  | IPv4, IPv6, MOBILE |
| config.country | <code>string</code> |  | 2 letter country code |
| config.region | <code>string</code> |  | 2 letter region code |
| config.isp | <code>string</code> |  | ISP id |
| config.proxyProtocol | <code>string</code> |  | HTTP, HTTPS, SOCKS5 |
| config.authenticationType | <code>string</code> |  | USERNAME_PASSWORD, IP_WHITELIST - In case of username/password auth, they will be auto-generated during the ordering process. |
| config.ipWhitelist | <code>Array</code> |  | whitelisted IPs: [ "1.1.1.1", ... ] |
| config.package | <code>string</code> |  | package id |
| config.quantity | <code>number</code> |  | proxies amount |
| config.couponCode | <code>string</code> |  | order promo code |
| config.bandwidth | <code>number</code> |  | amount in GB |
| config.isAutoExtendEnabled | <code>boolean</code> |  | enables auto extend |
| config.autoExtendBandwidth | <code>number</code> |  | how many GB to extend |

**Example**  
```js
client.configuration({ "networkType": "MOBILE", "country": "US" })
```
<a name="Client+order"></a>

### client.order([config]) ⇒ <code>Promise.&lt;Object&gt;</code>
Execute the order with the given configuration.

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> | <code>{}</code> |  |
| config.networkType | <code>string</code> |  | MOBILE, DATACENTER, RESIDENTIAL, RESIDENTIAL_STATIC |
| config.ipVersion | <code>string</code> |  | IPv4, IPv6, MOBILE |
| config.country | <code>string</code> |  | 2 letter country code |
| config.region | <code>string</code> |  | 2 letter region code |
| config.isp | <code>string</code> |  | ISP id |
| config.proxyProtocol | <code>string</code> |  | HTTP, HTTPS, SOCKS5 |
| config.authenticationType | <code>string</code> |  | USERNAME_PASSWORD, IP_WHITELIST - In case of username/password auth, they will be auto-generated during the ordering process. |
| config.ipWhitelist | <code>Array</code> |  | whitelisted IPs: [ "1.1.1.1", ... ] |
| config.package | <code>string</code> |  | package id |
| config.quantity | <code>number</code> |  | proxies amount |
| config.couponCode | <code>string</code> |  | order promo code |
| config.bandwidth | <code>number</code> |  | amount in GB |
| config.isAutoExtendEnabled | <code>boolean</code> |  | enables auto extend |
| config.autoExtendBandwidth | <code>number</code> |  | how many GB to extend |

**Example**  
```js
client.order({ "networkType": "MOBILE", "country": "US" })Check your configuration with client.configuration before
```
<a name="FatalError"></a>

## FatalError ⇐ [<code>BaseError</code>](#new_BaseError_new)
**Kind**: global class  
**Extends**: [<code>BaseError</code>](#new_BaseError_new)  
<a name="new_FatalError_new"></a>

### new FatalError(error)
Represents a fatal error from the Client : `"FatalError"`.


| Param | Type | Description |
| --- | --- | --- |
| error | <code>String</code> \| <code>Error</code> | Error object or message |

<a name="APIError"></a>

## APIError ⇐ [<code>BaseError</code>](#new_BaseError_new)
**Kind**: global class  
**Extends**: [<code>BaseError</code>](#new_BaseError_new)  
<a name="new_APIError_new"></a>

### new APIError(error, response, status, method, url)
Represents an error from the API : `"APIError"`.


| Param | Type | Description |
| --- | --- | --- |
| error | <code>String</code> \| <code>Error</code> | Error message |
| response | <code>Object</code> | Error response |
| status | <code>String</code> | Status type of the request |
| method | <code>String</code> | Method used for the request |
| url | <code>String</code> | Url of the request to the endpoint |

<a name="ParseError"></a>

## ParseError ⇐ [<code>BaseError</code>](#new_BaseError_new)
**Kind**: global class  
**Extends**: [<code>BaseError</code>](#new_BaseError_new)  

* [ParseError](#ParseError) ⇐ [<code>BaseError</code>](#new_BaseError_new)
    * [new ParseError(message, status, method, url)](#new_ParseError_new)
    * [.status](#ParseError+status) : <code>string</code>
    * [.method](#ParseError+method) : <code>string</code>
    * [.url](#ParseError+url) : <code>string</code>

<a name="new_ParseError_new"></a>

### new ParseError(message, status, method, url)
Represents a parsing error : `"ParseError"`.


| Param | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | error message |
| status | <code>String</code> | status type of the request |
| method | <code>String</code> | method used for the request |
| url | <code>String</code> | url of the request to the endpoint |

<a name="ParseError+status"></a>

### parseError.status : <code>string</code>
status type of the request

**Kind**: instance property of [<code>ParseError</code>](#ParseError)  
<a name="ParseError+method"></a>

### parseError.method : <code>string</code>
method used for the request

**Kind**: instance property of [<code>ParseError</code>](#ParseError)  
<a name="ParseError+url"></a>

### parseError.url : <code>string</code>
url of the request to the endpoint

**Kind**: instance property of [<code>ParseError</code>](#ParseError)  
