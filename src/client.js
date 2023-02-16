const axios = require("axios").default;
const errors = require("./errors");
const pkg = require("../package.json");

class Client {
    /**
     * The proxy-cheap client
     * @param {string} API_KEY proxy-cheap API key
     * @param {string} API_SECRET proxy-cheap API secret
     * @example const client = new Client("API_KEY", "API_SECRET");
     */
    constructor(API_KEY, API_SECRET) {
        /**
         * The API Key
         * @type {string}
         */
        this.API_KEY = API_KEY;

        /**
         * The API Secret
         * @type {string}
         */
        this.API_SECRET = API_SECRET;

        /**
         * The base API Url
         * @type {String}
         */
        this.API_URL = "https://api.proxy-cheap.com";

        this.headers = {
            "User-Agent": `proxycheap.js ${pkg.version} (https://github.com/LockBlock-dev/proxycheap.js)`,
            "X-Api-Key": this.API_KEY,
            "X-Api-Secret": this.API_SECRET,
        };
    }

    /**
     * Make request against the API
     * @param  {string} path API endpoint
     * @param  {Object} [reqOptions] request options
     * @return {Promise} promise
     * @private
     */
    #request(method, path, reqOptions = {}) {
        let options = {
            method: method,
            url: `${this.API_URL}/${path}`,
            headers: {
                ...this.headers,
            },
            ...reqOptions,
        };

        return axios(options)
            .then((response) => {
                if (typeof response.data === "object") {
                    return response.data;
                } else {
                    try {
                        let data = JSON.parse(response.data);

                        if (data.errorCode) {
                            data.code = data.errorCode;
                            data.error = APIcodes[data.errorCode];
                            delete data.errorCode;
                        }

                        return data;
                    } catch (err) {
                        throw new errors.ParseError(
                            response.data,
                            response.status,
                            options.method,
                            options.url
                        );
                    }
                }
            })
            .catch((error) => {
                throw error.type === "ParseError"
                    ? error
                    : new errors.APIError(
                          error,
                          error.response,
                          error.response.status,
                          options.method,
                          options.url
                      );
            });
    }

    /**
     * Get user balance.
     * @example client.balance()
     * @return {Promise<Object>}
     */
    balance() {
        return this.#request("GET", "account/balance");
    }

    /**
     * Get user proxies.
     * @example client.proxies()
     * @return {Promise<Object>}
     */
    proxies() {
        return this.#request("GET", "proxies");
    }

    /**
     * Get info on a proxy.
     * @param {number} id proxy id
     * @example client.proxy(12345)
     * @return {Promise<Object>}
     */
    proxy(id) {
        return this.#request("GET", `proxies/${id}`);
    }

    /**
     * Change whitelisted IPs of a proxy.
     * @param {number} id proxy id
     * @param {Array} [ips = []]
     * @example client.whitelist(12345, ["0.0.0.0", "1.1.1.1", "2.2.2.2"])
     * @return {Promise<Object>}
     */
    whitelist(id, ips = []) {
        return this.#request("GET", `proxies/${id}/whitelist-ip`, {
            data: {
                ips: ips,
            },
        });
    }

    /**
     * Extend a proxy.
     * @param {number} id proxy id
     * @param {number} months
     * @example client.extend(12345, 2)
     * @return {Promise<Object>}
     */
    extend(id, months) {
        if (!months || months < 1) throw new Error("You must extend for at least 1 month!");

        return this.#request("GET", `proxies/${id}/extend-period`, {
            data: { periodInMonths: months },
        });
    }

    /**
     * Buy additional bandwidth for a proxy.
     * @param {number} id proxy id
     * @param {number} amount in GB
     * @example client.buyBandwidth(12345, 5)
     * @return {Promise<Object>}
     */
    buyBandwidth(id, amount) {
        if (!amount || amount < 1) throw new Error("You must buy at least 1 GB!");

        return this.#request("GET", `proxies/${id}/buy-bandwidth`, {
            data: { bandwidth: amount },
        });
    }

    /**
     * Get configuration according to filter parameters.
     * @param {Object} [config = {}]
     * @param {string} config.networkType MOBILE, DATACENTER, RESIDENTIAL, RESIDENTIAL_STATIC
     * @param {string} config.ipVersion IPv4, IPv6, MOBILE
     * @param {string} config.country 2 letter country code
     * @param {string} config.region 2 letter region code
     * @param {string} config.isp ISP id
     * @param {string} config.proxyProtocol HTTP, HTTPS, SOCKS5
     * @param {string} config.authenticationType USERNAME_PASSWORD, IP_WHITELIST
     * - In case of username/password auth, they will be auto-generated during the ordering process.
     * @param {Array} config.ipWhitelist whitelisted IPs: [ "1.1.1.1", ... ]
     * @param {string} config.package package id
     * @param {number} config.quantity proxies amount
     * @param {string} config.couponCode order promo code
     * @param {number} config.bandwidth amount in GB
     * @param {boolean} config.isAutoExtendEnabled enables auto extend
     * @param {number} config.autoExtendBandwidth how many GB to extend
     * @example client.configuration({ "networkType": "MOBILE", "country": "US" })
     * @return {Promise<Object>}
     */
    configuration(body = {}) {
        return this.#request("POST", "order/configuration", {
            data: body,
        });
    }

    /**
     * Execute the order with the given configuration.
     * @param {Object} [config = {}]
     * @param {string} config.networkType MOBILE, DATACENTER, RESIDENTIAL, RESIDENTIAL_STATIC
     * @param {string} config.ipVersion IPv4, IPv6, MOBILE
     * @param {string} config.country 2 letter country code
     * @param {string} config.region 2 letter region code
     * @param {string} config.isp ISP id
     * @param {string} config.proxyProtocol HTTP, HTTPS, SOCKS5
     * @param {string} config.authenticationType USERNAME_PASSWORD, IP_WHITELIST
     * - In case of username/password auth, they will be auto-generated during the ordering process.
     * @param {Array} config.ipWhitelist whitelisted IPs: [ "1.1.1.1", ... ]
     * @param {string} config.package package id
     * @param {number} config.quantity proxies amount
     * @param {string} config.couponCode order promo code
     * @param {number} config.bandwidth amount in GB
     * @param {boolean} config.isAutoExtendEnabled enables auto extend
     * @param {number} config.autoExtendBandwidth how many GB to extend
     * @example client.order({ "networkType": "MOBILE", "country": "US" })
     * Check your configuration with client.configuration before
     * @return {Promise<Object>}
     */
    order(body = {}) {
        return this.#request("POST", "order/execute", {
            data: body,
        });
    }

    /**
     * Enable or disable auto-extend of a proxy.
     * @param {number} id proxy id
     * @param {bool} [enabled = true]
     * @example client.autoExtend(12345, true)
     * @return {Promise<Object>}
     */
    autoExtend(id, enabled = true) {
        if (typeof enabled !== "boolean") throw new Error("Parameter 'enabled' must be a boolean");

        if (enabled) {
            return this.#request("POST", `proxies/${id}/auto-extend/enable`);
        } else {
            return this.#request("POST", `proxies/${id}/auto-extend/disable`);
        }
    }
}

module.exports = { Client };
