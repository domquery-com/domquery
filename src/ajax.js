const AJAX_CONFIG = {
        VERSION: "5.0",
        DEFAULT_TIMEOUT: 3E4,
        TEST_URL_PATTERN: "http://host",
        CALLBACK_PREFIX: "ajax_callback_",
        REQUEST_PREFIX: "req_",
        JSONP_CALLBACK_PREFIX: "jsonp_callback_",
        SUCCESS_CALLBACK_PREFIX: "ajax_success_",
        ERROR_CALLBACK_PREFIX: "ajax_error_",
        HTTP_RESPONSE_PREFIX: "httpResponse_",
        HTTP_ERROR_PREFIX: "httpError_",
        MAX_CALLBACK_RETRY: 3,
        BRIDGE_FALLBACK_DELAY: 100,
        DEFAULT_CONTENT_TYPE: "application/x-www-form-urlencoded; charset=UTF-8",
        FILE_URL_HANDLING: {
            FORCE_WEBVIEW_BRIDGE: !0,
            DISABLE_FALLBACK: !0,
            IMMEDIATE_BRIDGE_CHECK: !0,
            ENHANCED_TIMEOUT: 6E4,
            LOG_ALL_STEPS: !0
        },
        DETECTION: {
            URL_SCHEME_PRIORITY: 1,
            BRIDGE_EXISTENCE_PRIORITY: 2,
            USER_AGENT_PRIORITY: 3,
            URL_SCHEMES: {
                "file://": "webview_bridge",
                "content://": "webview_bridge",
                "android_asset://": "webview_bridge",
                "http://": "auto",
                "https://": "auto"
            }
        },
        BRIDGE: {
            ANDROID_BRIDGES: [{
                name: "AndroidBridge",
                method: "httpRequest",
                priority: 1
            }, {
                name: "Android",
                method: "httpRequest",
                priority: 2
            }],
            IOS_BRIDGE: {
                name: "webkit.messageHandlers.httpRequest",
                priority: 1
            },
            FILE_URL_CONFIG: {
                timeout: 6E4,
                retries: 2,
                immediate_execution: !0
            }
        },
        DEBUG: {
            ENABLED: !1,
            FILE_URL_VERBOSE: !0,
            BRIDGE_CALL_TRACE: !0,
            STEP_BY_STEP_LOG: !0,
            CONSOLE_PREFIX: "[AJAX5-FILE]"
        }
    },
    customBridges = new Map,
    bridgePriority = {
        custom: 1,
        android: 2,
        ios: 3,
        web: 4
    },
    domquery_SCRIPT_STORAGE_PREFIX = "ajax_script_",
    domquery_SCRIPT_STORAGE_EXPIRY = 864E5,
    domquery_hashString = a => {
        let b = 0;
        if (!a) return "0";
        for (let d = 0; d < a.length; d++) {
            const c = a.charCodeAt(d);
            b = (b << 5) - b + c;
            b &= b
        }
        return Math.abs(b).toString(36)
    },
    domquery_scriptRegistry = new Map,
    domquery_SCRIPT_STATES = {
        STORED: "stored",
        LOADED: "loaded",
        EXECUTED: "executed",
        ERROR: "error",
        REMOVED: "removed"
    },
    domquery_isScriptAlreadyLoaded = (a, b) => {
        for (const [, d] of domquery_scriptRegistry.entries())
            if (d.state === domquery_SCRIPT_STATES.EXECUTED && (a && d.src === a || !a && b && d.content === b)) return !0;
        return !1
    },
    domquery_extractAndStoreScripts = (a, b) => {
        if (!a || "string" !== typeof a) return a;
        if ("undefined" === typeof DOMParser) return {
            cleanHtml: a,
            storageKeys: [],
            skippedCount: 0
        };
        a = (new DOMParser).parseFromString(a, "text/html");
        const d = [];
        let c =
            0;
        a.querySelectorAll("script").forEach((e, g) => {
            var h = e.src || null;
            const f = e.textContent || null;
            if (domquery_isScriptAlreadyLoaded(h, f)) c++;
            else {
                var l = h ? `${domquery_SCRIPT_STORAGE_PREFIX}src_${domquery_hashString(h)}` : f ? `${domquery_SCRIPT_STORAGE_PREFIX}content_${domquery_hashString(f)}` : `${domquery_SCRIPT_STORAGE_PREFIX}${g}_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;
                h = {
                    src: h,
                    content: f,
                    type: e.type || "text/javascript",
                    async: e.async || !1,
                    defer: e.defer || !1,
                    timestamp: Date.now(),
                    originalUrl: b ||
                        null
                };
                try {
                    if ("undefined" !== typeof localStorage) {
                        const k = localStorage.getItem(l);
                        if (k) try {
                            const q = JSON.parse(k);
                            q.timestamp = Date.now();
                            localStorage.setItem(l, JSON.stringify(q))
                        } catch (q) {
                            localStorage.setItem(l, JSON.stringify(h))
                        } else localStorage.setItem(l, JSON.stringify(h))
                    }
                } catch (k) {}
                d.push(l);
                domquery_scriptRegistry.set(l, {
                    ...h,
                    state: domquery_SCRIPT_STATES.STORED,
                    registeredAt: Date.now(),
                    index: g
                })
            }
            e.remove()
        });
        return {
            cleanHtml: a.documentElement.outerHTML,
            storageKeys: d,
            skippedCount: c
        }
    },
    domquery_processScriptWithFunctionCall =
    (a, b) => {
        if (!a || "string" !== typeof a || !b) return {
            processedContent: a,
            extractedTexts: []
        };
        const d = new Map;
        var c = a.split("\n");
        const e = [...c];
        let g = !1,
            h = 0;
        c.forEach((f, l) => {
            if (f.includes("// domqGLG") && (!f.match(/\/\/\s*domqGLG_(\w+)/) || f.match(/\/\/\s*domqGLG\s+(\[[^\]]+\])/))) {
                var k = null,
                    q = [],
                    t = f.match(/\/\/\s*domqGLG(?:_\w+)?\s+(\[[^\]]+\])/);
                if (t) {
                    t = t[1];
                    const u = [];
                    try {
                        var m = t.replace(/'/g, '"');
                        const v = JSON.parse(m);
                        Array.isArray(v) && 0 < v.length && v.forEach(r => {
                            "string" === typeof r && u.push(r)
                        })
                    } catch (v) {
                        (m =
                            t.match(/['"]([^'"]+)['"]/g)) && m.forEach(r => {
                            u.push(r.replace(/^['"]|['"]$/g, ""))
                        })
                    }
                    if (0 < u.length) {
                        for (var n of u) {
                            d.has(n) || (d.set(n, h++), q.push(n));
                            const v = d.get(n);
                            f = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                            let r = !1;
                            k = new RegExp(`(title\\s*:\\s*)(['"])${f}\\2`, "gi");
                            m = new RegExp(`(title\\s*:\\s*)(\`)${f}\\2`, "gi");
                            k.test(e[l]) ? e[l] = e[l].replace(k, (w, x, y) => {
                                r = g = !0;
                                return `${x}${b}(${v})`
                            }) : m.test(e[l]) && (e[l] = e[l].replace(m, (w, x, y) => {
                                r = g = !0;
                                return `${x}${b}(${v})`
                            }));
                            if (!r) {
                                f = [new RegExp(`(["'])${f}\\1`,
                                    "g"), new RegExp(`(\`)${f}\\1`, "g")];
                                for (var p of f)
                                    if (p.test(e[l]) && (e[l] = e[l].replace(p, (w, x) => {
                                            r = g = !0;
                                            return `${b}(${v})`
                                        }), r)) break
                            }
                        }
                        return
                    }
                }
                k || (n = f.match(/^\s*([\[\{].+?[\]\}])\s*,?\s*\/\/\s*domqGLG/)) && (k = n[1].trim());
                k || (n = f.match(/^\s*"[^"]+":\s*(.+?)\s*,?\s*\/\/\s*domqGLG/)) && (k = n[1].trim().replace(/,\s*$/, ""));
                k || (n = f.indexOf("// domqGLG"), 0 < n && (n = f.substring(0, n).trim(), p = n.indexOf("="), 0 <= p && (k = n.substring(p + 1).trim(), k = k.replace(/[;,]\s*$/, ""), k = k.startsWith("[") || k.startsWith("{") ? k : k.replace(/^["'`]|["'`]$/g,
                    ""))), k || !(n = f.match(/=\s*(.+?)\s*[;,]?\s*\/\/\s*domqGLG/))) || (k = n[1].trim().replace(/[;,]\s*$/, ""), k = k.startsWith("[") || k.startsWith("{") ? k : k.replace(/^["'`]|["'`]$/g, ""));
                k || (n = f.match(/(["'`])(.+?)\1/)) && (k = n[2]);
                k || (n = f.indexOf("// domqGLG"), 0 < n && (f = f.substring(0, n).match(/['"]([^'"]+)['"][^'"]*$/)) && (k = f[1]));
                if (k && !k.startsWith("[") && !k.startsWith("{")) {
                    d.has(k) || (d.set(k, h++), q.push(k));
                    const u = d.get(k);
                    q = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                    f = new RegExp(`(title\\s*:\\s*)(['"])${q}\\2`,
                        "gi");
                    k = new RegExp(`(title\\s*:\\s*)(\`)${q}\\2`, "gi");
                    let v = !1;
                    f.test(e[l]) ? e[l] = e[l].replace(f, (r, w, x) => {
                        v = g = !0;
                        return `${w}${b}(${u})`
                    }) : k.test(e[l]) && (e[l] = e[l].replace(k, (r, w, x) => {
                        v = g = !0;
                        return `${w}${b}(${u})`
                    }));
                    v || [new RegExp(`(["'])${q}\\1`, "g"), new RegExp(`(\`)${q}\\1`, "g")].forEach(r => {
                        r.test(e[l]) && (e[l] = e[l].replace(r, () => {
                            g = !0;
                            return `${b}(${u})`
                        }))
                    })
                }
            }
        });
        c = Array.from(d.keys());
        return {
            processedContent: g ? e.join("\n") : a,
            extractedTexts: c
        }
    },
    domquery_generateArrayVarName = a => {
        if (!a || "string" !==
            typeof a) return "script_txt";
        try {
            const b = (new URL(a, window.location.origin)).pathname.split("/").pop();
            if (!b) return "script_txt";
            const d = b.split(".")[0].replace(/[^a-zA-Z0-9_]/g, "_");
            return d ? `${d}_script_txt` : "script_txt"
        } catch (b) {
            return "script_txt"
        }
    },
    domquery_generateTranslationKey = a => a && "string" === typeof a ? "Gong_" + a.replace(/\s+/g, "_").replace(/[^\uac00-\ud7a3a-zA-Z0-9_]/g, "") : "",
    domquery_createTranslationDiv = (a, b) => {
        if (!a || 0 === a.length) return null;
        if (b && "string" === typeof b) {
            var d = b.trim();
            d && (domquery_urlToDivMap[d] = !0)
        }
        b = domquery_generateArrayVarName(b);
        const c = `domquery-${b}-data`;
        (d = document.getElementById(c)) && d.remove();
        d = a.map(h => ({
            text: h,
            key: domquery_generateTranslationKey(h)
        }));
        const e = document.createElement("div");
        e.id = c;
        e.style.display = "none";
        e.setAttribute("data-array-name", b);
        e.setAttribute("data-texts", JSON.stringify(a));
        e.setAttribute("data-text-keys", JSON.stringify(d));
        if (document.body) document.body.appendChild(e);
        else {
            const h = () => {
                document.body ? document.body.appendChild(e) : setTimeout(h, 10)
            };
            h()
        }
        d =
            `${b}_fun`;
        const g = `${b}_data`;
        window[g] || (window[g] = a);
        window[d] = function(h) {
            var f = document.getElementById(c);
            if (f && (f = f.getAttribute("data-texts"))) try {
                const l = JSON.parse(f);
                return void 0 !== l[h] ? l[h] : ""
            } catch (l) {}
            return window[g] && void 0 !== window[g][h] ? window[g][h] : ""
        };
        return {
            divId: c,
            arrayVarName: b,
            funName: d,
            dataArrayName: g
        }
    },
    domquery_updateTranslationDiv = (a, b) => {
        if (!a || !b || !Array.isArray(b)) return !1;
        var d = domquery_generateArrayVarName(a);
        a = `${d}_data`;
        d = document.getElementById(`domquery-${d}-data`);
        if (!d) return !1;
        d.setAttribute("data-texts", JSON.stringify(b));
        window[a] && (window[a] = b);
        if (window._domqGLGTranslationCache && (a = d.getAttribute("data-text-keys"))) try {
            JSON.parse(a).forEach((c, e) => {
                c.key && void 0 !== b[e] && (c = c.key.startsWith("Gong_") ? c.key : `Gong_${c.key}`, window._domqGLGTranslationCache[c] = b[e])
            })
        } catch (c) {}
        return !0
    },
    domquery_updateTranslationDivFromJSON = (a, b) => {
        if (!a || !b || "object" !== typeof b) return !1;
        var d = domquery_generateArrayVarName(a);
        d = document.getElementById(`domquery-${d}-data`);
        if (!d) return !1;
        d = d.getAttribute("data-text-keys");
        if (!d) return !1;
        d = JSON.parse(d).map(({
            text: g,
            key: h
        }) => {
            if (h = b[h]) {
                if ("string" === typeof h && h.startsWith("[") && h.endsWith("]")) try {
                    const f = JSON.parse(h.replace(/'/g, '"'));
                    return Array.isArray(f) && 0 < f.length ? f[0] : h
                } catch (f) {}
                return h
            }
            return g
        });
        if (!domquery_updateTranslationDiv(a, d)) return !1;
        let c = 0;
        const e = () => {
            "function" === typeof window.domquery_convertDataArrayPropertiesAfterTranslation ? window.domquery_convertDataArrayPropertiesAfterTranslation() : 10 >
                c && (c++, setTimeout(e, 50))
        };
        setTimeout(e, 50);
        return !0
    },
    domquery_updateAllTranslationDivs = a => {
        if (!a || "object" !== typeof a) return !1;
        let b = 0,
            d = 0;
        Object.keys(a).forEach(c => {
            domquery_updateTranslationDiv(c, a[c]) ? b++ : d++
        });
        return {
            success: b,
            failed: d
        }
    };
window.domquery_updateTranslationDiv = domquery_updateTranslationDiv;
window.domquery_updateAllTranslationDivs = domquery_updateAllTranslationDivs;
window.domquery_updateTranslationDivFromJSON = domquery_updateTranslationDivFromJSON;
window.domquery_loadTranslationAndUpdate = function(a, b) {
    $.ajax({
        url: b,
        dataType: "json",
        success: function(d) {
            domquery_updateTranslationDivFromJSON(a, d)
        },
        error: function(d, c, e) {}
    })
};
const domquery_loadAndExecuteScripts = (a, b) => {
        if (a && Array.isArray(a)) {
            var d = [],
                c = [];
            a.forEach(e => {
                try {
                    if ("undefined" !== typeof localStorage) {
                        var g = localStorage.getItem(e);
                        if (g) {
                            const f = JSON.parse(g);
                            if (Date.now() - f.timestamp > domquery_SCRIPT_STORAGE_EXPIRY) localStorage.removeItem(e);
                            else {
                                try {
                                    localStorage.removeItem(e)
                                } catch (l) {}
                                if (f.content) {
                                    const l = domquery_generateArrayVarName(b || f.originalUrl || "");
                                    g = `${l}_fun`;
                                    var h = domquery_processScriptWithFunctionCall(f.content, g);
                                    d.push(...h.extractedTexts);
                                    let k =
                                        h.processedContent;
                                    const q = k.split("\n");
                                    h = [];
                                    for (let t = 0; t < q.length; t++) {
                                        const m = q[t],
                                            n = m.match(/(?:const|let|var)\s+(\w+Data)\s*=\s*\[/);
                                        if (n) {
                                            const p = n[1];
                                            (new RegExp(`window\\.${p}\\s*=`, "g")).test(k) || h.push({
                                                lineIndex: t,
                                                varName: p,
                                                line: m
                                            })
                                        }
                                        if (0 < h.length) {
                                            const p = h[h.length - 1];
                                            m.includes("];") && t > p.lineIndex && (q.splice(t + 1, 0, `    window.${p.varName} = ${p.varName};`), h.pop(), t++)
                                        }
                                    }
                                    k = q.join("\n");
                                    c.push({
                                        storageKey: e,
                                        scriptData: f,
                                        processedContent: k,
                                        arrayVarName: l,
                                        funName: g,
                                        originalContent: f.content
                                    })
                                } else f.src &&
                                    c.push({
                                        storageKey: e,
                                        scriptData: f,
                                        processedContent: null,
                                        arrayVarName: null,
                                        funName: null,
                                        originalContent: null
                                    })
                            }
                        }
                    }
                } catch (f) {}
            });
            0 < d.length && (a = [...(new Set(d))], domquery_createTranslationDiv(a, b));
            c.forEach(({
                storageKey: e,
                scriptData: g,
                processedContent: h,
                funName: f,
                originalContent: l
            }) => {
                try {
                    const k = document.createElement("script");
                    k.type = g.type;
                    k.async = g.async;
                    k.defer = g.defer;
                    g.src ? k.src = g.src : null !== h && (k.textContent = h);
                    k.onload = () => {
                        var t = domquery_scriptRegistry.get(e);
                        t && (t.state = domquery_SCRIPT_STATES.EXECUTED,
                            t.executedAt = Date.now());
                        if (h && f && l) {
                            t = new RegExp(`title:\\s*${f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}\\((\\d+)\\)`, "g");
                            const m = [...h.matchAll(t)];
                            0 < m.length && setTimeout(() => {
                                try {
                                    for (const n in window)
                                        if (n.endsWith("Data") && Array.isArray(window[n])) {
                                            const p = window[n];
                                            m.forEach(u => {
                                                const v = parseInt(u[1]);
                                                if (v < p.length && p[v] && "object" === typeof p[v] && (u = p[v], "title" in u)) {
                                                    const r = u.title;
                                                    Object.defineProperty(u, "title", {
                                                        get: function() {
                                                            if ("function" === typeof window[f]) try {
                                                                return window[f](v) || r
                                                            } catch (w) {}
                                                            return r
                                                        },
                                                        enumerable: !0,
                                                        configurable: !0
                                                    })
                                                }
                                            })
                                        }
                                } catch (n) {}
                            }, 100)
                        }
                    };
                    k.onerror = () => {
                        const t = domquery_scriptRegistry.get(e);
                        t && (t.state = domquery_SCRIPT_STATES.ERROR, t.errorAt = Date.now())
                    };
                    document.head.appendChild(k);
                    let q = domquery_scriptRegistry.get(e);
                    q && (q.state = domquery_SCRIPT_STATES.LOADED, q.loadedAt = Date.now())
                } catch (k) {}
            })
        }
    },
    domquery_cleanupExpiredScripts = () => {
        if ("undefined" !== typeof localStorage) try {
            const a = Object.keys(localStorage).filter(e => e.startsWith(domquery_SCRIPT_STORAGE_PREFIX));
            let b = 0;
            const d =
                Date.now();
            a.forEach(e => {
                try {
                    if (e.includes("_src_") || e.includes("_content_")) {
                        var g = localStorage.getItem(e);
                        if (g) {
                            const h = JSON.parse(g);
                            d - h.timestamp > domquery_SCRIPT_STORAGE_EXPIRY && (localStorage.removeItem(e), b++)
                        } else localStorage.removeItem(e), b++
                    } else localStorage.removeItem(e), b++
                } catch (h) {
                    localStorage.removeItem(e), b++
                }
            });
            0 < b && a.forEach(e => {
                localStorage.getItem(e) || domquery_scriptRegistry.delete(e)
            });
            const c = Date.now();
            for (const [e, g] of domquery_scriptRegistry.entries()) g.state === domquery_SCRIPT_STATES.EXECUTED &&
                g.executedAt ? 36E5 < c - g.executedAt && domquery_scriptRegistry.delete(e) : g.state === domquery_SCRIPT_STATES.ERROR && g.errorAt ? 36E5 < c - g.errorAt && domquery_scriptRegistry.delete(e) : g.registeredAt && 36E5 < c - g.registeredAt && domquery_scriptRegistry.delete(e)
        } catch (a) {}
    },
    generateUUID = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
        const b = 16 * Math.random() | 0;
        return ("x" === a ? b : b & 3 | 8).toString(16)
    }),
    generateCallbackName = (a = AJAX_CONFIG.CALLBACK_PREFIX) => a + Date.now() + "_" + generateUUID().substring(0,
        8),
    parseXML = a => (new DOMParser).parseFromString(a, "text/xml"),
    callAjaxEvent = (a, b, d, c) => {
        if (a && "function" === typeof a) try {
            a(b, d, c)
        } catch (e) {}
    },
    createXhrData = (a, b) => a || b ? {
        readyState: a ? 4 : 0,
        status: a ? a.status : 0,
        statusText: a ? a.statusText : b ? b.message : "",
        responseText: a && a.text ? a.text : "",
        responseXML: a && a.text && a.headers && a.headers.get("content-type")?.includes("xml") ? parseXML(a.text) : null,
        getResponseHeader: d => a ? a.headers.get(d) : null,
        getAllResponseHeaders: () => {
            if (!a || !a.headers) return "";
            let d = "";
            for (const [c,
                    e
                ] of a.headers.entries()) d += `${c}: ${e}\r\n`;
            return d
        },
        setRequestHeader: () => {},
        overrideMimeType: () => {}
    } : null,
    isFileUrl = a => a ? ["file://", "content://", "android_asset://"].some(b => a.toLowerCase().startsWith(b)) : !1,
    detectAvailableBridges = () => {
        const a = [];
        for (const b of AJAX_CONFIG.BRIDGE.ANDROID_BRIDGES) window[b.name] && window[b.name][b.method] && a.push({
            type: "android",
            name: b.name,
            method: b.method,
            priority: b.priority,
            available: !0
        });
        window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.httpRequest &&
            a.push({
                type: "ios",
                name: "webkit.messageHandlers",
                method: "httpRequest",
                priority: AJAX_CONFIG.BRIDGE.IOS_BRIDGE.priority,
                available: !0
            });
        return a.sort((b, d) => b.priority - d.priority)
    },
    detectEnvironmentAjax = (a, b = null) => {
        if (isFileUrl(a)) return a = detectAvailableBridges(), 0 < a.length ? {
            type: "webview_bridge",
            bridges: a,
            reason: "file_url_detected"
        } : {
            type: "webview_bridge_required",
            bridges: [],
            reason: "file_url_no_bridge"
        };
        if (b && ("android" === b || "ios" === b)) return {
            type: "webview_bridge",
            bridges: detectAvailableBridges().filter(d =>
                d.type === b),
            reason: "forced_app_setting"
        };
        a = detectAvailableBridges();
        return 0 < a.length ? {
            type: "webview_bridge",
            bridges: a,
            reason: "bridge_available"
        } : {
            type: "web",
            bridges: [],
            reason: "no_bridge_detected"
        }
    },
    prepareBridgeData = a => ({
        url: a.url,
        method: a.method || "GET",
        data: a.data || {},
        headers: a.headers || {},
        timeout: isFileUrl(a.url) ? AJAX_CONFIG.FILE_URL_HANDLING.ENHANCED_TIMEOUT : a.timeout,
        dataType: a.dataType || "text"
    }),
    executeAndroidBridge = (a, b) => new Promise((d, c) => {
        const e = window[a.name];
        let g = setTimeout(() => {
                c(Error("Android bridge timeout"))
            },
            b.timeout || AJAX_CONFIG.DEFAULT_TIMEOUT);
        const h = () => {
            g && (clearTimeout(g), g = null)
        };
        try {
            if ("AndroidBridge" === a.name && e.httpRequest) {
                const f = generateCallbackName(AJAX_CONFIG.SUCCESS_CALLBACK_PREFIX),
                    l = generateCallbackName(AJAX_CONFIG.ERROR_CALLBACK_PREFIX);
                window[f] = function(k) {
                    h();
                    try {
                        const q = "string" === typeof k ? JSON.parse(k) : k;
                        delete window[f];
                        delete window[l];
                        d(q.data || q)
                    } catch (q) {
                        c(q)
                    }
                };
                window[l] = function(k) {
                    h();
                    delete window[f];
                    delete window[l];
                    c(Error(k.message || k))
                };
                e.httpRequest(JSON.stringify(b),
                    f, l)
            } else if ("Android" === a.name && e.httpRequest) {
                const f = e.httpRequest(JSON.stringify(b));
                h();
                const l = JSON.parse(f);
                d(l.data || l)
            } else h(), c(Error(`Android bridge method not found: ${a.name}.${a.method}`))
        } catch (f) {
            h(), c(f)
        }
    }),
    executeIosBridge = (a, b) => new Promise((d, c) => {
        const e = b.timeout || AJAX_CONFIG.DEFAULT_TIMEOUT,
            g = generateCallbackName(AJAX_CONFIG.REQUEST_PREFIX);
        let h = setTimeout(() => {
            f();
            c(Error("iOS bridge timeout"))
        }, e);
        const f = () => {
            h && (clearTimeout(h), h = null);
            delete window[AJAX_CONFIG.HTTP_RESPONSE_PREFIX +
                g];
            delete window[AJAX_CONFIG.HTTP_ERROR_PREFIX + g]
        };
        try {
            window[AJAX_CONFIG.HTTP_RESPONSE_PREFIX + g] = function(l) {
                f();
                try {
                    const k = "string" === typeof l ? JSON.parse(l) : l;
                    d(k.data || k)
                } catch (k) {
                    c(k)
                }
            }, window[AJAX_CONFIG.HTTP_ERROR_PREFIX + g] = function(l) {
                f();
                c(Error(l.message || l))
            }, window.webkit.messageHandlers.httpRequest.postMessage({
                ...b,
                requestId: g
            })
        } catch (l) {
            f(), c(l)
        }
    }),
    executeWebViewBridge = async (a, b) => {
        const d = isFileUrl(a.url);
        if (!b.bridges || 0 === b.bridges.length) {
            if (d) throw Error("No WebView bridges available. File URL requires WebView bridge.");
            throw Error("No WebView bridges available");
        }
        a = prepareBridgeData(a);
        for (const c of b.bridges) try {
            let e;
            if ("android" === c.type) e = await executeAndroidBridge(c, a);
            else if ("ios" === c.type) e = await executeIosBridge(c, a);
            else throw Error(`Unsupported bridge type: ${c.type}`);
            return e
        } catch (e) {
            if (!d) throw e;
        }
        throw Error(`All WebView bridges failed for ${d?"file":"HTTP"} URL`);
    }, handleCustomBridge = (a, b) => {
        const d = customBridges.get(a);
        return d && d.ajax ? new Promise((c, e) => {
            let g = null;
            0 < b.timeout && (g = setTimeout(() => {
                e(Error("Custom bridge timeout"))
            }, b.timeout));
            try {
                callAjaxEvent(b.ajaxStart, null, null, b);
                callAjaxEvent(b.ajaxSend, null, null, b);
                const h = d.ajax(b);
                h && "function" === typeof h.then ? h.then(f => {
                    g && (clearTimeout(g), g = null);
                    const l = createXhrData({
                        status: f.status || 200,
                        statusText: f.statusText || "OK",
                        text: f.data || f,
                        headers: new Headers(f.headers || {})
                    }, null);
                    callAjaxEvent(b.ajaxSuccess, f.data || f, "success", l);
                    callAjaxEvent(b.success, f.data || f, "success", l);
                    callAjaxEvent(b.complete, l, "success");
                    callAjaxEvent(b.ajaxStop);
                    c(f.data || f)
                }).catch(f => {
                    g && (clearTimeout(g), g = null);
                    const l = createXhrData(null, f);
                    callAjaxEvent(b.ajaxError, l, "error", f);
                    callAjaxEvent(b.error, l, "error", f);
                    callAjaxEvent(b.complete, l, "error");
                    callAjaxEvent(b.ajaxStop);
                    e(f)
                }) : (g && (clearTimeout(g), g = null), e(Error("Custom bridge must return a Promise")))
            } catch (h) {
                g && (clearTimeout(g), g = null), e(h)
            }
        }) : Promise.reject(Error(`Custom bridge ${a} not available`))
    };
$.ajax = function(a, b) {
    function d() {
        callAjaxEvent(c.ajaxStart, null, null, c);
        return "jsonp" === c.dataType ? (callAjaxEvent(c.ajaxSend, null, null, c), new Promise((g, h) => {
            const f = (new URLSearchParams(c.data)).toString(),
                l = "function" === typeof c.jsonpCallback ? c.jsonpCallback() : c.jsonpCallback,
                k = encodeURIComponent(l),
                q = window[l],
                t = "function" === typeof q,
                m = document.createElement("script"),
                n = c.url.includes("?") ? "&" : "?";
            m.src = `${c.url}${n}${f}&callback=${k}`;
            let p = null;
            0 < c.timeout && (p = setTimeout(() => {
                u(Error("Timeout"),
                    "timeout")
            }, c.timeout));
            const u = (r, w) => {
                    p && clearTimeout(p);
                    const x = createXhrData(null, r);
                    callAjaxEvent(c.ajaxError, x, w || "error", r);
                    callAjaxEvent(c.error, x, w || "error", r);
                    v();
                    callAjaxEvent(c.complete, x, w || "error");
                    callAjaxEvent(c.ajaxStop);
                    h(r)
                },
                v = () => {
                    try {
                        t ? window[l] = q : delete window[l], m.parentNode && m.parentNode.removeChild(m)
                    } catch (r) {}
                };
            window[l] = function(r) {
                try {
                    t && q(r);
                    p && clearTimeout(p);
                    const w = createXhrData({
                            status: 200,
                            statusText: "OK",
                            text: "string" === typeof r ? r : JSON.stringify(r),
                            headers: new Headers
                        },
                        null);
                    callAjaxEvent(c.ajaxSuccess, r, "success", w);
                    callAjaxEvent(c.success, r, "success", w);
                    v();
                    callAjaxEvent(c.complete, w, "success");
                    callAjaxEvent(c.ajaxStop);
                    g(r)
                } catch (w) {
                    u(w, "error")
                }
            };
            m.onerror = function(r) {
                u(Error("Script loading error"), "error")
            };
            document.head.appendChild(m)
        })) : new Promise((g, h) => {
            var f = c.method;
            let l = c.url,
                k = {
                    method: f,
                    headers: new Headers(c.headers),
                    cache: c.cache ? "default" : "no-store",
                    credentials: c.crossDomain ? "omit" : "same-origin"
                };
            !1 !== c.contentType && k.headers.set("Content-Type",
                c.contentType);
            if ("GET" === f && c.data)
                if ("string" === typeof c.data) l += (l.includes("?") ? "&" : "?") + c.data;
                else {
                    if ("object" === typeof c.data) {
                        f = new URLSearchParams;
                        for (const [m, n] of Object.entries(c.data)) f.append(m, n);
                        l += (l.includes("?") ? "&" : "?") + f.toString()
                    }
                }
            else if ("POST" === f || "PUT" === f || "PATCH" === f || "DELETE" === f) {
                if (c.url.includes(AJAX_CONFIG.TEST_URL_PATTERN)) {
                    setTimeout(() => {
                        let m = "";
                        this.elements && this.elements.length ? this.elements.forEach(function(p, u) {
                            p && p.files && p.files[0] && (m && (m += "\n\n"), m +=
                                `file_name: file${u}\nfile_value: ${p.files[0].name}`)
                        }) : m = "Demo response data";
                        const n = {
                            readyState: 4,
                            status: 200,
                            statusText: "OK",
                            responseText: m,
                            responseXML: null,
                            getResponseHeader: () => null,
                            getAllResponseHeaders: () => ""
                        };
                        callAjaxEvent(c.ajaxSuccess, m, "success", n);
                        callAjaxEvent(c.success, m, "success", n);
                        g(m);
                        callAjaxEvent(c.complete, n, "success");
                        callAjaxEvent(c.ajaxStop)
                    }, AJAX_CONFIG.BRIDGE_FALLBACK_DELAY);
                    return
                }
                if (c.data instanceof FormData) k.body = c.data, k.headers.delete("Content-Type");
                else if ("string" ===
                    typeof c.data) k.body = c.data;
                else if ("object" === typeof c.data)
                    if (!1 !== c.processData) {
                        f = new URLSearchParams;
                        for (const [m, n] of Object.entries(c.data)) f.append(m, n);
                        k.body = f.toString()
                    } else {
                        f = new FormData;
                        for (const [m, n] of Object.entries(c.data)) f.append(m, n);
                        k.body = f;
                        k.headers.delete("Content-Type")
                    }
            }
            callAjaxEvent(c.ajaxSend, null, null, k);
            let q = null;
            const t = new AbortController;
            k.signal = t.signal;
            0 < c.timeout && (q = setTimeout(() => {
                t.abort()
            }, c.timeout));
            fetch(l, k).then(m => {
                q && clearTimeout(q);
                if (!m.ok) throw Error(`HTTP error! status: ${m.status}`);
                const n = m.headers.get("content-type") || "";
                return ("json" === c.dataType || n.includes("application/json") ? m.text().then(p => {
                    try {
                        return p ? JSON.parse(p) : null
                    } catch (u) {
                        throw Error(`JSON parse error: ${u.message}`);
                    }
                }).catch(p => {
                    throw p;
                }) : "xml" === c.dataType || n.includes("xml") ? m.text().then(p => parseXML(p)) : m.text()).then(p => ({
                    data: p,
                    response: m
                }))
            }).then(({
                data: m,
                response: n
            }) => {
                let p = m,
                    u = null;
                c.script && "string" === typeof m && m.includes("<script") && (m = domquery_extractAndStoreScripts(m, c.url), p = m.cleanHtml, u = m.storageKeys);
                n = createXhrData(n, null);
                n.responseText = "string" === typeof p ? p : JSON.stringify(p);
                callAjaxEvent(c.ajaxSuccess, p, "success", n);
                callAjaxEvent(c.success, p, "success", n);
                callAjaxEvent(c.complete, n, "success");
                callAjaxEvent(c.ajaxStop);
                u && 0 < u.length && setTimeout(() => {
                    domquery_loadAndExecuteScripts(u, c.url)
                }, 0);
                g(p)
            }).catch(m => {
                q && clearTimeout(q);
                const n = "AbortError" === m.name ? "timeout" : "error",
                    p = createXhrData(null, m);
                callAjaxEvent(c.ajaxError, p, n, m);
                callAjaxEvent(c.error, p, n, m);
                callAjaxEvent(c.complete, p, n);
                callAjaxEvent(c.ajaxStop);
                h(m)
            })
        })
    }
    const c = {
            url: a.url || "",
            method: (a.method || (1 === b ? "POST" : 2 === b ? "GET" : "POST")).toUpperCase(),
            dataType: (a.dataType || "*").toLowerCase(),
            data: a.data || {},
            headers: a.headers || {},
            processData: void 0 !== a.processData ? a.processData : !0,
            contentType: void 0 !== a.contentType ? a.contentType : AJAX_CONFIG.DEFAULT_CONTENT_TYPE,
            async: void 0 !== a.async ? a.async : !0,
            cache: void 0 !== a.cache ? a.cache : !0,
            jsonpCallback: a.jsonpCallback || AJAX_CONFIG.JSONP_CALLBACK_PREFIX + Math.round(1E5 * Math.random()),
            timeout: a.timeout || AJAX_CONFIG.DEFAULT_TIMEOUT,
            crossDomain: void 0 !== a.crossDomain ? a.crossDomain : !0,
            app: a.app,
            script: a.script || !1,
            ajaxStart: a.ajaxStart,
            ajaxSend: a.ajaxSend,
            ajaxSuccess: a.ajaxSuccess,
            ajaxError: a.ajaxError,
            ajaxComplete: a.ajaxComplete || a.complete,
            ajaxStop: a.ajaxStop,
            success: a.success,
            error: a.error,
            complete: a.complete
        },
        e = isFileUrl(c.url);
    a = detectEnvironmentAjax(c.url, c.app);
    return 0 < customBridges.size && (b = Array.from(customBridges.keys()).filter(g => (g = customBridges.get(g)) && g.isAvailable && g.isAvailable()), 0 < b.length) ? handleCustomBridge(b[0],
        c) : "webview_bridge" === a.type || "webview_bridge_required" === a.type ? (callAjaxEvent(c.ajaxStart, null, null, c), callAjaxEvent(c.ajaxSend, null, null, c), executeWebViewBridge(c, a).then(g => {
        let h = g,
            f = null;
        c.script && "string" === typeof g && g.includes("<script") && (g = domquery_extractAndStoreScripts(g, c.url), h = g.cleanHtml, f = g.storageKeys);
        g = createXhrData({
            status: 200,
            statusText: "OK",
            text: h,
            headers: new Headers
        }, null);
        callAjaxEvent(c.ajaxSuccess, h, "success", g);
        callAjaxEvent(c.success, h, "success", g);
        callAjaxEvent(c.complete,
            g, "success");
        callAjaxEvent(c.ajaxStop);
        f && 0 < f.length && setTimeout(() => {
            domquery_loadAndExecuteScripts(f, c.url)
        }, 0);
        return h
    }).catch(g => {
        const h = createXhrData(null, g);
        callAjaxEvent(c.ajaxError, h, "error", g);
        callAjaxEvent(c.error, h, "error", g);
        callAjaxEvent(c.complete, h, "error");
        callAjaxEvent(c.ajaxStop);
        if (e && AJAX_CONFIG.FILE_URL_HANDLING.DISABLE_FALLBACK) throw Error(`File URL access failed: ${g.message}. WebView Bridge required.`);
        if (!e) return d();
        throw g;
    })) : d()
};
$.registerCustomBridge = function(a, b) {
    if (!a || "string" !== typeof a) throw Error("Bridge name must be a non-empty string");
    if (!b || "object" !== typeof b) throw Error("Bridge interface must be an object");
    if (!b.ajax || "function" !== typeof b.ajax) throw Error("Bridge interface must have an ajax function");
    b.isAvailable || (b.isAvailable = () => !0);
    customBridges.set(a, b);
    return !0
};
$.unregisterCustomBridge = function(a) {
    return customBridges.has(a) ? (customBridges.delete(a), !0) : !1
};
$.getCustomBridges = function() {
    return Array.from(customBridges.keys())
};
$.getCustomBridgeInfo = function(a) {
    const b = customBridges.get(a);
    return b ? {
        name: a,
        available: b.isAvailable ? b.isAvailable() : !0,
        hasAjax: "function" === typeof b.ajax,
        description: b.description || "No description provided"
    } : null
};
$.getAllBridgesStatus = function() {
    const a = detectAvailableBridges(),
        b = [];
    for (const [d, c] of customBridges.entries()) b.push({
        name: d,
        available: c.isAvailable ? c.isAvailable() : !0,
        priority: bridgePriority.custom
    });
    return {
        environment: 0 < a.length ? "webview" : "web",
        standardBridges: a,
        customBridges: b
    }
};
$.post = function(a, b, d, c) {
    let e = "text";
    if ("string" === typeof a) {
        let g = "";
        if (a.includes("?")) {
            const [h, f] = a.split("?");
            a = h;
            g = f
        }
        "function" === typeof b ? (c = d, d = b, b = g) : "object" === typeof b && null !== b ? b = {
            ...b,
            ...$.parseQueryString(g)
        } : "string" !== typeof b && b || (b = b ? b + "&" + g : g);
        b = {
            url: a,
            method: "POST",
            data: b,
            success: d,
            error: c,
            dataType: e
        }
    } else b = a, e = b.dataType || "text";
    b.dataType = e;
    "json" === e && (b.contentType = "application/json");
    return $.ajax(b)
};
$.parseQueryString = function(a) {
    return a ? a.split("&").reduce((b, d) => {
        const [c, e] = d.split("=");
        c && (b[decodeURIComponent(c)] = e ? decodeURIComponent(e) : "");
        return b
    }, {}) : {}
};
$.getJSON = function(a, b, d) {
    return $.ajax({
        url: a,
        data: b,
        dataType: "json",
        success: d,
        method: "GET"
    })
};
$.get = function() {
    if (0 === arguments.length || "number" === typeof arguments[0]) {
        if (this.elements) return 0 === arguments.length ? this.elements : this.elements[arguments[0]]
    } else {
        if ("string" === typeof arguments[0]) {
            var a = arguments[0];
            if (a.includes("?")) {
                var b = a.split("?");
                a = b[0];
                b = b[1]
            }
            if ("function" === typeof arguments[1]) {
                var d = arguments[1];
                var c = arguments[2]
            } else "object" === typeof arguments[1] && null !== arguments[1] && (b = arguments[1], d = arguments[2], c = arguments[3])
        } else if ("object" === typeof arguments[0]) {
            var e = arguments[0];
            a = e.url;
            b = e.data;
            d = e.success;
            c = e.dataType;
            var g = e.error;
            e = e.jsonpCallback
        }
        return "function" === typeof $.ajax ? (a = {
            url: a,
            method: "GET",
            data: b,
            dataType: c,
            success: d,
            error: g
        }, "jsonp" === c && e ? a.jsonpCallback = e : "json" === c && (a.contentType = "application/json"), $.ajax(a)) : null
    }
};
$.gets = $.get;
$.fn.load = function(a, b, d) {
    if ("string" !== typeof a) return this.on("load", a);
    var c = null,
        e = a;
    0 < a.indexOf(" ") && (a = a.split(" "), 2 <= a.length && (e = a[0], c = a.slice(1).join(" ")));
    var g = this;
    $.ajax({
        url: e,
        data: b,
        success: function(h) {
            var f = h;
            if (c && "string" === typeof h) try {
                var l = (new DOMParser).parseFromString(h, "text/html").querySelector(c);
                l && (f = l.innerHTML)
            } catch (k) {}
            g.each(function() {
                this.innerHTML = f
            });
            d && "function" === typeof d && d.call(g, f, "success", null)
        },
        error: function(h, f, l) {
            d && "function" === typeof d && d.call(g,
                null, f, l)
        }
    });
    return this
};
$.fn.unload = function(a) {
    if ("function" === typeof a) {
        var b = function(d) {
            try {
                a.call(this, d)
            } catch (c) {}
        };
        window.addEventListener ? window.addEventListener("beforeunload", b) : window.attachEvent && window.attachEvent("onbeforeunload", b);
        this.removeUnload = function() {
            window.removeEventListener ? window.removeEventListener("beforeunload", b) : window.detachEvent && window.detachEvent("onbeforeunload", b)
        }
    }
    return this
};
$.load = function(a, b, d) {
    return $(document.body).load(a, b, d)
};
$.unload = function(a) {
    return $(window).on("beforeunload", a)
};
$.fn.ajax = function(a, b) {
    return $.ajax.call(this, a, b)
};
$.fn.post = function(a, b, d, c) {
    return $.post.apply(this, arguments)
};
$.fn.getJSON = function(a, b, d) {
    return $.getJSON.apply(this, arguments)
};
$.fn.get = function() {
    return $.get.apply(this, arguments)
};
$.fn.gets = $.fn.get;
$.ajaxDebug = function(a) {
    if (void 0 === a) return window.AJAX_DEBUG || AJAX_CONFIG.DEBUG.ENABLED || !1;
    window.AJAX_DEBUG = !!a;
    AJAX_CONFIG.DEBUG.ENABLED = !!a;
    "undefined" !== typeof localStorage && (a ? localStorage.setItem("ajax_debug", "true") : localStorage.removeItem("ajax_debug"));
    return a
};
$.detectWebView = function() {
    return 0 < detectAvailableBridges().length ? "webview" : "web"
};
$.checkWebViewBridge = function() {
    return $.getAllBridgesStatus()
};
$.ajaxConstants = function(a, b) {
    if (0 === arguments.length) return {
        ...AJAX_CONFIG
    };
    if (1 === arguments.length) return AJAX_CONFIG[a];
    if (2 === arguments.length) return AJAX_CONFIG.hasOwnProperty(a) ? AJAX_CONFIG[a] = b : null
};
$.getBridgePriority = function() {
    return {
        ...bridgePriority
    }
};
$.ajaxStatus = function() {
    const a = detectEnvironmentAjax("http://test.com");
    return {
        version: AJAX_CONFIG.VERSION,
        environment: a,
        bridges: detectAvailableBridges(),
        customBridges: $.getCustomBridges(),
        config: AJAX_CONFIG,
        debugMode: $.ajaxDebug(),
        fileUrlHandling: AJAX_CONFIG.FILE_URL_HANDLING
    }
};
$.ajaxConfig = function(a, b) {
    if (0 === arguments.length) return AJAX_CONFIG;
    if (1 === arguments.length) {
        var d = a.split("."),
            c = AJAX_CONFIG;
        for (var e of d) {
            if (void 0 === c[e]) return;
            c = c[e]
        }
        return c
    }
    if (2 === arguments.length) {
        d = a.split(".");
        c = AJAX_CONFIG;
        for (e = 0; e < d.length - 1; e++) c[d[e]] || (c[d[e]] = {}), c = c[d[e]];
        e = c[d[d.length - 1]];
        c[d[d.length - 1]] = b;
        return e
    }
};
$.testFileUrl = function(a) {
    return $.ajax({
        url: a || "./test.txt",
        method: "GET",
        success: function(b) {
            console.log("File URL test successful", {
                dataLength: b ? b.length : 0
            })
        },
        error: function(b) {
            console.error("File URL test failed", b)
        }
    })
};
"file:" === location.protocol && (AJAX_CONFIG.FILE_URL_HANDLING.FORCE_WEBVIEW_BRIDGE = !0, AJAX_CONFIG.DEBUG.FILE_URL_VERBOSE = !0);
const domquery_urlToDivMap = {},
    domqueryTranslationInterface = {
        urlToDivMap: domquery_urlToDivMap,
        updateTranslationDivFromJSON: domquery_updateTranslationDivFromJSON
    };
window.domqueryTranslationInterface = domqueryTranslationInterface;
(function() {
    "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", function() {
        domquery_cleanupExpiredScripts()
    }) : domquery_cleanupExpiredScripts();
    setInterval(function() {
        domquery_cleanupExpiredScripts()
    }, 6E5)
})();