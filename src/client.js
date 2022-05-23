const axios = require("axios").default;
const cheerio = require("cheerio");
const errors = require("./errors");
const pkg = require("../package.json");

exports.Client = class Client {
    constructor() {
        /**
         * The base API Url
         * @type {String}
         */
        this.baseApiUrl = "https://app.proxy-cheap.com";
    }

    #headers = {
        //"User-Agent": `proxycheap.js ${pkg.version} (https://github.com/LockBlock-dev/proxycheap.js)`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0",
        Accept: "*",
    };

    /**
     * Make request against the API
     * @param  {String} path API endpoint
     * @param  {Object} data request data
     * @return {Promise} promise
     * @private
     */
    #request(method, path, data) {
        let options = {
            method: method,
            url: `${this.baseApiUrl}/${path}`,
            headers: {
                ...this.#headers,
            },
        };

        if (data) options.data = data;

        return axios(options)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw new errors.APIError(
                    error,
                    error.response,
                    error.response.status,
                    options.method,
                    options.url
                );
            });
    }

    /**
     * Login to ProxyCheap.
     * @param {String} PHPSessId
     * @example login("PHPSESSID")
     * @return {Promise<Object>}
     */
    async login(PHPSessId) {
        this.#headers = {
            ...this.#headers,
            Cookie: `PHPSESSID=${PHPSessId}`,
        };

        try {
            const auth = await this.#request("GET", "dashboard");

            if (auth.status === 200) return { ok: true };
        } catch {}

        return { ok: false, error: "invalid PHP Session ID" };
    }

    /**
     * Get user balance.
     * @return {Promise<Object>}
     */
    async balance() {
        try {
            const result = await this.#request("GET", "dashboard");
            const resultHTML = cheerio.load(result.data);

            let balance = resultHTML("i[data-feather='wallet']").parent().text();
            return { ok: true, data: Number(/\d+.+\d+/g.exec(balance)[0]) };
        } catch {
            return { ok: false, error: "could not get balance!" };
        }
    }

    /**
     * Get user proxies id.
     * @return {Promise<Object>}
     */
    async proxies() {
        try {
            const result = await this.#request("GET", "dashboard/services/my-proxies");
            const resultHTML = cheerio.load(result.data);
            const proxies = [];

            resultHTML("a:contains('Proxy overview')").each((i, p) =>
                proxies.push(Number(resultHTML(p).attr("href").split("/")[4]))
            );

            return { ok: true, data: proxies };
        } catch {
            return { ok: false, error: "could not get proxies!" };
        }
    }

    /**
     * Get info on a proxy.
     * @param {Number} id proxy id
     * @example proxy(12345)
     * @return {Promise<Object>}
     */
    async proxy(id) {
        try {
            const result = await this.#request("GET", `dashboard/services/proxies/${id}`);
            const resultHTML = cheerio.load(result.data);

            const authMethod = resultHTML("td:contains('Authentication type')")
                .next()
                .text()
                .replaceAll("\n", "");

            let proxy = {
                ok: true,
                data: {
                    type: resultHTML("td:contains('Network Type')")
                        .next()
                        .text()
                        .replaceAll("\n", ""),
                    ip: resultHTML("td:contains('Public IP')").next().text().replaceAll("\n", ""),
                    ports: {
                        http: Number(
                            resultHTML("td:contains('PROXY IP:PORT (HTTP)')")
                                .next()
                                .text()
                                .replaceAll("\n", "")
                                .split(":")[1]
                        ),
                        socks5: Number(
                            resultHTML("td:contains('PROXY IP:PORT (SOCKS5)')")
                                .next()
                                .text()
                                .replaceAll("\n", "")
                                .split(":")[1]
                        ),
                    },
                    version: resultHTML("td:contains('Internet protocol version (IPv)')")
                        .next()
                        .text()
                        .replaceAll("\n", ""),
                    protocol: resultHTML("td:contains('Proxy type')")
                        .next()
                        .text()
                        .replaceAll("\n", ""),
                    country: resultHTML("td:contains('Country')")
                        .next()
                        .text()
                        .replaceAll("\n", ""),
                    status: resultHTML("td:contains('Status')").next().text().replaceAll("\n", ""),
                    orderedAt: new Date(
                        resultHTML("td:contains('Ordered at')").next().text().replaceAll("\n", "")
                    ).toISOString(),
                    activatedAt: new Date(
                        resultHTML("td:contains('Activated at')").next().text().replaceAll("\n", "")
                    ).toISOString(),
                    expiresAt: new Date(
                        resultHTML("td:contains('Expires at')").next().text().replaceAll("\n", "")
                    ).toISOString(),
                    authentication: authMethod,
                },
            };

            switch (authMethod) {
                case "IP WHITELIST":
                    proxy.data.whitelistedIPs = resultHTML("td:contains('Whitelisted IPs')")
                        .next()
                        .text()
                        .replaceAll("\n", "")
                        .split(", ");
                    break;
                case "USERNAME & PASSWD":
                    proxy.data.username = resultHTML("td:contains('Username')")
                        .next()
                        .text()
                        .replaceAll("\n", "");
                    proxy.data.password = resultHTML("td:contains('Password')")
                        .next()
                        .text()
                        .replaceAll("\n", "");
                    break;
            }

            return proxy;
        } catch {
            return { ok: false, error: "could not get proxy info!" };
        }
    }

    /**
     * Change whitelisted IPs of a proxy.
     * @param {Number} id proxy id
     * @param {Array} ips
     * @example changeWhitelist(12345, ["0.0.0.0", "1.1.1.1", "2.2.2.2"])
     * @return {Promise<Object>}
     */
    async changeWhitelist(id, ips) {
        if (!ips || ips.length < 1) throw new Error("You must provide at least 1 IP!");

        let body = {};

        try {
            let token = await this.#request(
                "GET",
                `dashboard/services/proxies/${id}/change-whitelist-ip`
            );
            const tokenHTML = cheerio.load(token.data);

            token = tokenHTML("input[id='whitelist_ip_change_form__token']").val();

            const options = ["[ips][0]", "[ips][1]", "[ips][2]", "[_token]"];
            const data = [ips[0], ips[1] || "", ips[2] || "", token];

            for (let i = 0; i < options.length; i++) {
                body[`whitelist_ip_change_form${options[i]}`] = data[i];
            }
        } catch {
            return { ok: false, error: "could not get the form token!" };
        }

        try {
            const result = await this.#request(
                "POST",
                `dashboard/services/proxies/${id}/change-whitelist-ip`,
                new URLSearchParams(body).toString()
            );

            return { ok: true };
        } catch {
            return { ok: false, error: "something went wrong!" };
        }
    }

    /**
     * Extend a proxy.
     * @param {Number} id
     * @param {Number} months
     * @example extend(12345, 2)
     * @return {Promise<Object>}
     */
    async extend(id, months) {
        if (!months || months < 1) throw new Error("You must extend for at least 1 month!");

        let body = {};

        try {
            let token = await this.#request(
                "GET",
                `dashboard/services/proxies/${id}/extend-period`
            );
            const tokenHTML = cheerio.load(token.data);

            token = tokenHTML("input[id='period_extend_form__token']").val();

            const options = ["[periodInMonths]", "[_token]"];
            const data = [parseInt(months), token];

            for (let i = 0; i < options.length; i++) {
                body[`period_extend_form${options[i]}`] = data[i];
            }
        } catch {
            return { ok: false, error: "could not get the form token!" };
        }

        try {
            const result = await this.#request(
                "POST",
                `dashboard/services/proxies/${id}/extend-period`,
                new URLSearchParams(body).toString()
            );

            if (result.data.includes("Insufficient account balance"))
                return { ok: false, error: "insufficient balance!" };

            return { ok: true };
        } catch {
            return { ok: false, error: "something went wrong!" };
        }
    }
};
