# Methods

<dl>
<dt><a href="#balance">balance()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get user balance.</p>
</dd>
<dt><a href="#changeWhitelist">changeWhitelist(id, ips)</a> ⇒ <code>Promise</code></dt>
<dd><p>Change IP whitelist of a proxy.</p>
</dd>
<dt><a href="#extend">extend(id, months)</a> ⇒ <code>Promise</code></dt>
<dd><p>Extend a proxy.</p>
</dd>
<dt><a href="#login">login(PHPSessId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Login to ProxyCheap.</p>
</dd>
<dt><a href="#proxies">proxies()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get user proxies.</p>
</dd>
<dt><a href="#proxy">proxy()</a> ⇒ <code>Promise</code></dt>
<dd><p>Get info on a proxy.</p>
</dd>
</dl>

# Errors

<dl>
<dt><a href="APIError">APIError</a> ⇒ <code>Error</code></dt>
<dd><p>Error related to the API.</p>
</dd>
<dt><a href="FatalError">FatalError</a> ⇒ <code>Error</code></dt>
<dd><p>Fatal error in the program. (you don't want this one)</p>
</dd>
</dl>

---

# Methods

<a name="balance"></a>

## balance() ⇒ <code>Promise</code>

Get user balance.

**Kind**: method  
**Returns**:

```js
{
    ok: Boolean,
    data: Number,
    error: String,
}
```

**Example**

```js
balance();
```

<a name="changeWhitelist"></a>

## changeWhitelist(id, ips) ⇒ <code>Promise</code>

Change whitelisted IPs of a proxy.

**Kind**: method  
**Returns**:

```js
{
    ok: Boolean,
    error: String,
}
```

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| id    | <code>Number</code> | proxy id    |
| ips   | <code>Array</code>  | IPs         |

**Example**

```js
changeWhitelist(12345, ["0.0.0.0", "1.1.1.1", "2.2.2.2"]);
```

<a name="extend"></a>

## extend(id, months) ⇒ <code>Promise</code>

Extend a proxy.

**Kind**: method  
**Returns**:

```js
{
    ok: Boolean,
    error: String,
}
```

| Param  | Type                | Description                |
| ------ | ------------------- | -------------------------- |
| id     | <code>Number</code> | proxy id                   |
| months | <code>Number</code> | Amount of months to extend |

**Example**

```js
extend(12345, 2);
```

<a name="login"></a>

## login(PHPSessId) ⇒ <code>Promise</code>

Login to ProxyCheap.

**Kind**: method  
**Returns**:

```js
{
    ok: Boolean,
    error: String,
}
```

| Param     | Type                | Default |
| --------- | ------------------- | ------- |
| PHPSessId | <code>String</code> |         |

**Example**

```js
login("PHPSESSID");
```

<a name="proxies"></a>

## proxies() ⇒ <code>Promise</code>

Get user proxies id.

**Kind**: method  
**Returns**:

```js
{
    ok: Boolean,
    data: Array,
    error: String,
}
```

**Example**

```js
proxies();
```

<a name="proxy"></a>

## proxy(id) ⇒ <code>Promise</code>

Get info on a proxy.

**Kind**: method  
**Returns**:

```js
{
    ok: Boolean,
    data: Object,
    error: String,
}
```

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| id    | <code>Number</code> | proxy id    |

**Example**

```js
proxy(12345);
```

# Errors

<a name="APIError"></a>

## APIError ⇒ <code>Error</code>

Error related to the API

**Returns**:

```js
{
    message: String,
    type: String,
    status: Number,
    method: String,
    url: String,
}
```

**Example**

```js
{
    message: "Request failed with status code 403",
    type: 'APIError',
    status: 403,
    method: 'GET',
    url: 'https://app.proxy-cheap.com/dashboard/services/proxies/12345/change-whitelist-ip'
}

```

<a name="FatalError"></a>

## FatalError ⇒ <code>Error</code>

Fatal error in the program. (you don't want this one)

**Kind**: method  
**Returns**:

```js
{
    message: String,
    type: String,
    stack: String
}
```
