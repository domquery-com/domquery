(function(h) {
    const z = {
            options: {},
            observers: {},
            rootElement: {
                checked: !1,
                element: null
            },
            closingAlerts: new Set,
            callbackExecuting: !1
        },
        ja = (() => {
            let b = 0,
                a = !1;
            const l = [];
            let g = !1,
                q = null,
                E = null;
            const S = () => ({
                    x: h.pageXOffset || document.documentElement.scrollLeft || 0,
                    y: h.pageYOffset || document.documentElement.scrollTop || 0
                }),
                B = F => {
                    F && M.setTimeoutRAF(() => {
                        try {
                            h.scrollTo(F.x, F.y)
                        } catch (r) {}
                    }, 0)
                },
                G = () => {
                    try {
                        "scrollRestoration" in history && 0 === l.length && null !== E && (history.scrollRestoration = E, E = null)
                    } catch (F) {}
                },
                y = F => {
                    try {
                        const r = ++b,
                            H = Object.assign({}, history.state, {
                                __domqueryAlert: !0,
                                __domqueryAlertKey: "alertA",
                                __domqueryAlertSeq: r,
                                __domqueryAlertInstanceId: F
                            });
                        history.pushState(H, document.title);
                        return r
                    } catch (r) {
                        return null
                    }
                },
                u = () => {
                    if (g) g = !1, q && (B(q), q = null);
                    else {
                        var F = l[l.length - 1];
                        if (F) {
                            var r = S();
                            if (!0 === F.closeBack) {
                                const f = F.instanceId;
                                var H = () => {
                                    q = r;
                                    try {
                                        g = !0, history.forward()
                                    } catch (t) {
                                        g = !1;
                                        const v = y(f);
                                        if (null !== v) {
                                            F.seq = v;
                                            const T = document.querySelector(`.domquery-alert[data-instance-id="${f}"]`);
                                            T &&
                                                T.setAttribute("data-history-seq", String(v))
                                        }
                                        B(r)
                                    }
                                };
                                if (z.closingAlerts && z.closingAlerts.has(f)) H();
                                else {
                                    H();
                                    if (H = z.options?.[f]) H.__backCloseHold = !0;
                                    if (H && "function" === typeof H.__closeFromHistory) H.__closeFromHistory();
                                    else try {
                                        var N = document.querySelector(`.domquery-alert[data-instance-id="${f}"]`),
                                            x = N && (N.querySelector(".domquery-close-x-btn") || N.querySelector(".domquery-alert-close-btn"));
                                        x && x.click()
                                    } catch (t) {}
                                }
                                B(r)
                            } else {
                                try {
                                    const f = z.options?.[F.instanceId];
                                    if (f && !1 !== f.vibrate) {
                                        H = Number(f.openSpeed ||
                                            f.closeSpeed || 300);
                                        const t = document.querySelector(`.domquery-alert[data-instance-id="${F.instanceId}"]`);
                                        if (t && "undefined" !== typeof $ && "function" === typeof $.aBox) {
                                            const v = "TC LC RC BC TL TR BL BR".split(" ").find(T => void 0 !== f[T]);
                                            if ("vibrate" in navigator) try {
                                                navigator.vibrate(H / 3)
                                            } catch (T) {}
                                            $.aBox(t, v)
                                        }
                                    }
                                } catch (f) {}
                                q = r;
                                try {
                                    g = !0, history.forward()
                                } catch (f) {
                                    g = !1, N = y(F.instanceId), null !== N && (F.seq = N, (x = document.querySelector(`.domquery-alert[data-instance-id="${F.instanceId}"]`)) && x.setAttribute("data-history-seq",
                                        String(N))), B(r)
                                }
                            }
                        }
                    }
                };
            return {
                register: (F, r, H) => {
                    if (H && !0 === H.History) {
                        if (!a) {
                            a = !0;
                            try {
                                h.addEventListener("popstate", u)
                            } catch (x) {}
                        }
                        try {
                            "scrollRestoration" in history && (null === E && (E = history.scrollRestoration), history.scrollRestoration = "manual")
                        } catch (x) {}
                        var N = y(F);
                        null !== N && r && r.setAttribute("data-history-seq", String(N));
                        l.push({
                            instanceId: String(F),
                            seq: N || 0,
                            closeBack: !0 === H.closeBack
                        })
                    }
                },
                cleanupOnClose: (F, r, H, N) => {
                    if (H && !0 === H.History) {
                        var x = String(F);
                        F = l.findIndex(f => f.instanceId === x);
                        if (-1 === F) G();
                        else if (r = F === l.length - 1, l.splice(F, 1), "back" === N)
                            if (z.options?.[x]?.__backCloseHold && r) {
                                try {
                                    delete z.options[x].__backCloseHold
                                } catch (f) {}
                                try {
                                    g = !0, q = S(), history.back()
                                } catch (f) {
                                    g = !1
                                } finally {
                                    G()
                                }
                            } else G();
                        else if (r) try {
                            g = !0, q = S(), history.back()
                        } catch (f) {
                            g = !1
                        } finally {
                            G()
                        } else G()
                    } else G()
                }
            }
        })();
    h.domQuery8Alert || (h.domQuery8Alert = {});
    h.domQuery8Alert._internal = z;
    const M = {
            setTimeoutRAF: function(b, a) {
                if (0 >= a) return requestAnimationFrame(b), null;
                const l = performance.now();
                let g;
                const q = E => {
                    E - l >= a ? b() :
                        g = requestAnimationFrame(q)
                };
                return g = requestAnimationFrame(q)
            },
            clearTimeoutRAF: function(b) {
                b && cancelAnimationFrame(b)
            },
            waitForAnimation: function(b, a) {
                function l(q) {
                    q - g >= a ? b() : requestAnimationFrame(l)
                }
                const g = performance.now();
                requestAnimationFrame(l)
            },
            nextFrame: function(b) {
                return requestAnimationFrame(b)
            },
            afterFrames: function(b, a = 1) {
                if (0 >= a) requestAnimationFrame(b);
                else {
                    var l = 0,
                        g = () => {
                            l++;
                            l >= a ? b() : requestAnimationFrame(g)
                        };
                    requestAnimationFrame(g)
                }
            }
        },
        ua = function(b) {
            let a = 0;
            const l = b.length;
            for (let g =
                    0; g < l; g++) {
                const q = b.charCodeAt(g);
                a = (a << 5) - a + q;
                a &= a
            }
            return Math.abs(a).toString(36)
        },
        D = {
            elementCache: new WeakMap,
            allElementsCache: new WeakMap,
            getElement: function(b, a) {
                if (!b || !a) return null;
                this.elementCache.has(b) || this.elementCache.set(b, {});
                const l = this.elementCache.get(b);
                a in l || (l[a] = b.querySelector(a));
                return l[a]
            },
            getAllElements: function(b, a) {
                if (!b || !a) return [];
                this.allElementsCache.has(b) || this.allElementsCache.set(b, {});
                const l = this.allElementsCache.get(b);
                a in l || (l[a] = Array.from(b.querySelectorAll(a)));
                return l[a]
            },
            documentCache: {},
            getDocumentElement: function(b) {
                if (!b) return null;
                b in this.documentCache || (this.documentCache[b] = document.querySelector(b));
                return this.documentCache[b]
            },
            getAllDocumentElements: function(b) {
                if (!b) return [];
                const a = "all:" + b;
                a in this.documentCache || (this.documentCache[a] = Array.from(document.querySelectorAll(b)));
                return this.documentCache[a]
            },
            invalidate: function(b, a) {
                b && this.elementCache.has(b) && delete this.elementCache.get(b)[a];
                b && this.allElementsCache.has(b) && delete this.allElementsCache.get(b)[a]
            },
            invalidateDocument: function(b) {
                delete this.documentCache[b];
                delete this.documentCache["all:" + b]
            },
            clearParentCache: function(b) {
                b && (this.elementCache.delete(b), this.allElementsCache.delete(b))
            },
            clearDocumentCache: function() {
                this.documentCache = {}
            }
        };
    $.AlertScrollManager = {
        positions: {},
        isUserScrolling: {},
        lastScrollTime: {},
        scrollStates: {},
        savePosition: function(b, a) {
            !b && a && (b = a.getAttribute("data-instance-id"));
            if (b && a) {
                a = [D.getElement(a, ".alert-scroll-wrapper"), D.getElement(a, ".domquery-alert-body"), a.querySelector('div[style*="overflow: auto"]'),
                    a.querySelector('div[style*="overflow-y: auto"]'), a.querySelector('div[style*="overflow-y: scroll"]'), a
                ].filter(l => null !== l);
                for (const l of a)
                    if (l.scrollHeight > l.clientHeight) {
                        this.positions[b] = {
                            element: l,
                            position: l.scrollTop
                        };
                        break
                    }
            }
        },
        scrollTo: function(b, a, l) {
            if (!b) return !1;
            b.scrollTo({
                top: a,
                behavior: "smooth"
            });
            return !0
        },
        restorePosition: function(b, a, l = 300) {
            !b && a && (b = a.getAttribute("data-instance-id"));
            if (!b || !a || !this.positions[b]) return !1;
            const g = this.positions[b],
                q = [D.getElement(a, ".alert-scroll-wrapper"),
                    D.getElement(a, ".domquery-alert-body"), a.querySelector('div[style*="overflow: auto"]'), a.querySelector('div[style*="overflow-y: auto"]'), a.querySelector('div[style*="overflow-y: scroll"]'), a
                ].filter(B => null !== B);
            let E = 0;
            const S = () => {
                for (const B of q)
                    if (B.scrollHeight > B.clientHeight) return 0 < l ? this.scrollTo(B, g.position, l) : B.scrollTop = g.position, !0;
                E++;
                5 > E && setTimeout(S, 200);
                return !1
            };
            return S()
        },
        clearPosition: function(b) {
            return b && this.positions[b] ? (delete this.positions[b], !0) : !1
        },
        clearAll: function() {
            this.positions = {};
            return !0
        },
        scrollToBottom: function(b, a, l = !1) {
            !b && a && (b = a.getAttribute("data-instance-id"));
            if (!b || !a) return !1;
            if (!l && !0 === this.isUserScrolling[b]) {
                const g = Date.now();
                if (this.lastScrollTime[b] && 3E3 > g - this.lastScrollTime[b]) return !1
            }
            if (!l && this.scrollStates[b] && this.scrollStates[b].thresholdExceeded) return !1;
            b = [D.getElement(a, ".alert-scroll-wrapper"), D.getElement(a, ".domquery-alert-body"), a.querySelector('div[style*="overflow: auto"]'), a.querySelector('div[style*="overflow-y: auto"]'), a.querySelector('div[style*="overflow-y: scroll"]'),
                a
            ].filter(g => null !== g);
            for (const g of b)
                if (g.scrollHeight > g.clientHeight) return g.scrollTop = g.scrollHeight, !0;
            return !1
        },
        startUserScrolling: function(b) {
            this.isUserScrolling[b] = !0;
            this.lastScrollTime[b] = Date.now()
        },
        endUserScrolling: function(b, a = 1E3) {
            M.setTimeoutRAF(() => {
                this.isUserScrolling[b] = !1
            }, a)
        },
        checkScrollThreshold: function(b, a, l) {
            if (b && a) {
                a = [D.getElement(a, ".alert-scroll-wrapper"), D.getElement(a, ".domquery-alert-body"), a.querySelector('div[style*="overflow: auto"]'), a.querySelector('div[style*="overflow-y: auto"]'),
                    a.querySelector('div[style*="overflow-y: scroll"]'), a
                ].filter(q => null !== q);
                for (var g of a)
                    if (g.scrollHeight > g.clientHeight) {
                        a = g.scrollHeight - g.scrollTop - g.clientHeight;
                        g = g.scrollHeight - g.clientHeight;
                        let q = 0;
                        "number" === typeof l ? q = l : "string" === typeof l && (l.endsWith("px") ? (q = parseInt(l, 10), isNaN(q) && (q = 0)) : l.endsWith("%") ? (l = parseFloat(l), isNaN(l) || (q = l / 100 * g)) : isNaN(parseFloat(l)) || (q = parseFloat(l)));
                        this.scrollStates[b] ? this.scrollStates[b].threshold = q : this.scrollStates[b] = {
                            thresholdExceeded: !1,
                            threshold: q
                        };
                        this.scrollStates[b].thresholdExceeded = a > q ? !0 : !1;
                        break
                    }
            }
        }
    };
    $.scaleArr = function(b, a, l = 300) {
        if (b && a) {
            var g = "",
                q = void 0;
            void 0 !== a.LC ? (g = "LC", q = a.LC) : void 0 !== a.RC ? (g = "RC", q = a.RC) : void 0 !== a.TC ? (g = "TC", q = a.TC) : void 0 !== a.BC ? (g = "BC", q = a.BC) : void 0 !== a.TL ? (g = "TL", q = a.TL) : void 0 !== a.TR ? (g = "TR", q = a.TR) : void 0 !== a.BL ? (g = "BL", q = a.BL) : void 0 !== a.BR && (g = "BR", q = a.BR);
            b.style.position = "fixed";
            b.style.willChange = "transform, opacity";
            var E = "",
                S = "",
                B = !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                    isMobile: !1
                }).isMobile,
                G = () => {
                    if (B && h.visualViewport) {
                        b.style.opacity = String("number" === typeof a.opacity ? a.opacity : 1);
                        b.style.transition = "opacity 0.3s";
                        M.setTimeoutRAF(() => {
                            b.style.opacity = "1"
                        }, 1E3);
                        if (!0 === a.resize) {
                            const v = b.querySelectorAll('input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');
                            let T = h.visualViewport.height,
                                na = !1,
                                va = null,
                                Z = null;
                            var H = {
                                    height: b.style.height,
                                    maxHeight: b.style.maxHeight,
                                    minHeight: b.style.minHeight,
                                    overflow: b.style.overflow
                                },
                                N = null;
                            const ba = D.getElement(b, ".domquery-alert-body");
                            ba && (N = {
                                maxHeight: ba.style.maxHeight,
                                minHeight: ba.style.minHeight,
                                height: ba.style.height,
                                overflowY: ba.style.overflowY,
                                webkitOverflowScrolling: ba.style.webkitOverflowScrolling
                            });
                            const Ca = () => {
                                var d = b.getBoundingClientRect();
                                b.style.height = `${d.height}px`;
                                b.style.maxHeight = `${d.height}px`;
                                b.style.minHeight = `${d.height}px`;
                                ba && (d = ba.getBoundingClientRect(), ba.style.height = `${d.height}px`, ba.style.minHeight = `${d.height}px`)
                            };
                            M.setTimeoutRAF(Ca, 200);
                            const Da = () => {
                                    Z && (clearTimeout(Z), Z = null);
                                    Object.keys(H).forEach(d => {
                                        b.style[d] = H[d]
                                    });
                                    ba && N && Object.keys(N).forEach(d => {
                                        ba.style[d] = N[d]
                                    });
                                    M.setTimeoutRAF(Ca, 100);
                                    na = !1
                                },
                                ta = () => {
                                    var d = document.getElementById("keyboard-virtual-layer");
                                    d && d.remove();
                                    d = document.createElement("div");
                                    d.id = "keyboard-virtual-layer";
                                    d.style.cssText = `\n                           position: fixed;\n                           top: 0;\n                           left: 0;\n                           width: 100%;\n                           height: 100%;\n                           background-color: transparent;\n                           z-index: ${parseInt(b.style.zIndex||
9999)+2};\n                           pointer-events: none;\n                       `;
                                    const c = a.parent ? "string" === typeof a.parent ? document.querySelector(a.parent) : a.parent : document.body;
                                    c ? c.appendChild(d) : document.body.appendChild(d);
                                    return d
                                },
                                ya = () => {
                                    try {
                                        var d = document.getElementById("keyboard-transition-layer");
                                        if (d) try {
                                            d.remove()
                                        } catch (k) {
                                            d.parentNode && d.parentNode.removeChild(d)
                                        }
                                        d = "#ffffff";
                                        var c = document.body;
                                        let e = 10001;
                                        try {
                                            b && 1 === b.nodeType && (d = window.getComputedStyle(b).backgroundColor || "#ffffff")
                                        } catch (k) {}
                                        try {
                                            if (a &&
                                                a.parent)
                                                if ("string" === typeof a.parent) {
                                                    const k = document.querySelector(a.parent);
                                                    k && (c = k)
                                                } else a.parent instanceof Element && (c = a.parent)
                                        } catch (k) {}
                                        try {
                                            if (b && b.style) {
                                                const k = b.style.zIndex;
                                                k && (e = parseInt(k) + 2)
                                            }
                                        } catch (k) {}
                                        const m = document.createElement("div");
                                        m.id = "keyboard-transition-layer";
                                        m.style.position = "fixed";
                                        m.style.top = "0";
                                        m.style.left = "0";
                                        m.style.width = "100%";
                                        m.style.height = "100%";
                                        m.style.backgroundColor = d;
                                        m.style.opacity = "1";
                                        m.style.transition = "opacity 0.3s ease";
                                        m.style.zIndex = e.toString();
                                        try {
                                            c.appendChild(m)
                                        } catch (k) {
                                            document.body.appendChild(m)
                                        }
                                        return m
                                    } catch (e) {
                                        c = document.createElement("div");
                                        c.style.display = "none";
                                        try {
                                            document.body.appendChild(c)
                                        } catch (m) {}
                                        return c
                                    }
                                },
                                Fa = () => {
                                    const d = h.visualViewport.height;
                                    Z && M.clearTimeoutRAF(Z);
                                    Z = M.setTimeoutRAF(() => {
                                        if (d < T - 50 && !na) {
                                            na = !0;
                                            wa || (wa = !0);
                                            const c = d - Math.max(0, window.outerHeight - window.innerHeight);
                                            b.style.height = `${c}px`;
                                            b.style.maxHeight = `${c}px`;
                                            b.style.minHeight = null;
                                            if (ba) {
                                                const e = D.getElement(b, ".domquery-alert-header"),
                                                    m = D.getElement(b,
                                                        ".domquery-alert-footer");
                                                ba.style.maxHeight = `${c-(e?e.offsetHeight:0)-(m?m.offsetHeight:0)-40}px`;
                                                ba.style.height = "";
                                                ba.style.minHeight = "";
                                                ba.style.overflowY = "auto";
                                                ba.style.webkitOverflowScrolling = "touch";
                                                ba.scrollTop = 0
                                            }
                                        } else d > T - 100 && na && Da()
                                    }, 100)
                                };
                            h.visualViewport.addEventListener("resize", Fa);
                            let Ea = !0,
                                ia = null,
                                wa = !1;
                            v && "function" === typeof v.forEach && v.forEach(d => {
                                d && d instanceof Element && (d.addEventListener("focus", () => {
                                    if (Ea) {
                                        va = ta();
                                        try {
                                            ia = ya()
                                        } catch (c) {
                                            ia = document.createElement("div"), ia.style.display =
                                                "none", document.body.appendChild(ia)
                                        }
                                        T = h.visualViewport.height;
                                        M.setTimeoutRAF(() => {
                                            va && (va.remove(), va = null);
                                            M.setTimeoutRAF(() => {
                                                ia && (ia.style.opacity = "0", M.setTimeoutRAF(() => {
                                                    ia && (ia.style.display = "none")
                                                }, 300))
                                            }, 300)
                                        }, 200);
                                        Ea = !1
                                    } else ia && M.setTimeoutRAF(() => {
                                        ia && (ia.style.display = "block", ia.style.opacity = "1", M.setTimeoutRAF(() => {
                                            ia && (ia.style.opacity = "0", M.setTimeoutRAF(() => {
                                                ia && (ia.style.display = "none")
                                            }, 300))
                                        }, 300))
                                    }, 300)
                                }), d.addEventListener("blur", () => {
                                    M.setTimeoutRAF(() => {
                                        const c = document.activeElement;
                                        let e = !1;
                                        Array.isArray(v) ? e = v.some(m => m === c) : v && "object" === typeof v && (e = v === c);
                                        !e && na && Da()
                                    }, 100)
                                }))
                            });
                            const sa = setInterval(() => {
                                    na && h.visualViewport.height > T - 100 && Da()
                                }, 1E3),
                                ma = () => {
                                    na && window.innerHeight > T - 100 && Da()
                                };
                            window.addEventListener("resize", ma);
                            const n = a.onClose;
                            a.onClose = function() {
                                h.visualViewport.removeEventListener("resize", Fa);
                                window.removeEventListener("resize", ma);
                                clearInterval(sa);
                                Z && clearTimeout(Z);
                                const d = document.getElementById("keyboard-virtual-layer");
                                d && d.remove();
                                ia && (ia.remove(),
                                    ia = null);
                                "function" === typeof n && n.apply(this, arguments)
                            }
                        }
                        let x = h.visualViewport.height,
                            f = null;
                        const t = () => {
                            if (100 < Math.abs(h.visualViewport.height - x)) f && clearTimeout(f), f = setTimeout(() => {
                                const v = h.visualViewport.offsetTop,
                                    T = h.visualViewport.height,
                                    na = h.innerHeight - T;
                                switch (g) {
                                    case "TC":
                                        b.style.top = v + "px";
                                        b.style.bottom = "auto";
                                        break;
                                    case "BC":
                                        b.style.top = "auto";
                                        b.style.bottom = na + "px";
                                        break;
                                    case "LC":
                                    case "RC":
                                        b.style.top = v + T / 2 + "px";
                                        break;
                                    case "TL":
                                    case "TR":
                                        b.style.top = v + "px";
                                        break;
                                    case "BL":
                                    case "BR":
                                        b.style.bottom =
                                            na + "px"
                                }
                            }, 100), x = h.visualViewport.height;
                            else {
                                const v = h.visualViewport.offsetTop,
                                    T = h.visualViewport.height,
                                    na = h.innerHeight - T;
                                switch (g) {
                                    case "TC":
                                        b.style.top = v + "px";
                                        b.style.bottom = "auto";
                                        break;
                                    case "BC":
                                        b.style.top = "auto";
                                        b.style.bottom = na + "px";
                                        break;
                                    case "LC":
                                    case "RC":
                                        b.style.top = v + T / 2 + "px";
                                        break;
                                    case "TL":
                                    case "TR":
                                        b.style.top = v + "px";
                                        break;
                                    case "BL":
                                    case "BR":
                                        b.style.bottom = na + "px"
                                }
                            }
                        };
                        h.visualViewport.addEventListener("resize", t, {
                            passive: !0
                        });
                        h.visualViewport.addEventListener("scroll", t, {
                            passive: !0
                        });
                        t();
                        return () => {
                            f && clearTimeout(f);
                            h.visualViewport.removeEventListener("resize", t, {
                                passive: !0
                            });
                            h.visualViewport.removeEventListener("scroll", t, {
                                passive: !0
                            })
                        }
                    }
                    return null
                };
            "" === g || "center" === g ? (b.style.top = "50%", b.style.left = "50%", b.style.transformOrigin = "center", E = "translate(-50%, -50%) scale(0)", S = "translate(-50%, -50%) scale(1)") : ["LC", "RC"].includes(g) ? (b.style.top = "50%", b.style["LC" === g ? "left" : "right"] = "0", b.style.transformOrigin = `${"LC"===g?"left":"right"} center`, !1 === q ? (E = `translate(${"LC"===
g?"-100%":"100%"}, -50%)`, S = "translate(0, -50%)") : (E = "translate(0, -50%) scale(0)", S = "translate(0, -50%) scale(1)"), G()) : ["TC", "BC"].includes(g) ? (b.style["TC" === g ? "top" : "bottom"] = "0", b.style.left = "50%", b.style.transformOrigin = `${"TC"===g?"top":"bottom"} center`, !1 === q ? (E = `translate(-50%, ${"TC"===g?"-100%":"100%"})`, S = "translate(-50%, 0)") : (E = "translate(-50%, 0) scale(0)", S = "translate(-50%, 0) scale(1)"), G()) : ["TL", "TR", "BL", "BR"].includes(g) && (E = g.startsWith("T") ? "top" : "bottom", S = g.endsWith("L") ?
                "left" : "right", b.style[E] = "0", b.style[S] = "0", b.style.transformOrigin = `${E} ${S}`, !1 === q ? (E = `translate(${"right"===S?"100%":"-100%"}, ${"bottom"===E?"100%":"-100%"})`, S = "translate(0, 0)") : (E = "translate(0, 0) scale(0)", S = "translate(0, 0) scale(1)"), G());
            b.style.transform = E;
            b.style.opacity = String("number" === typeof a.opacity ? a.opacity : 1);
            b.style.willChange = "transform, opacity";
            b.style.backfaceVisibility = "hidden";
            var y = null;
            !0 === a.hide && (y = Array.from(b.querySelectorAll(".domquery-alert-body, .domquery-text-container, .domquery-text-bottom-container, .domquery-alert-close-btn, .alert-scroll-wrapper > div")),
                y.forEach(H => {
                    H && (H.style.transition = "opacity 0.3s ease", H.style.opacity = "0")
                }));
            var u = performance.now(),
                F = H => {
                    H = Math.min((H - u) / l, 1);
                    const N = a.easing ? this._anieasing(0, 1, H, a.easing) : H;
                    if (!0 === a.hide && y) {
                        const f = .8 <= H ? 5 * (H - .8) : 0;
                        y.forEach(t => {
                            t && (t.style.opacity = f.toString())
                        })
                    }
                    b.style.transform = (() => {
                        if (["TL", "TR", "BL", "BR"].includes(g)) {
                            if (!1 === q) {
                                var f = g.endsWith("L") ? "left" : "right",
                                    t = g.startsWith("T") ? "top" : "bottom";
                                f = "right" === f ? 100 : -100;
                                t = "bottom" === t ? 100 : -100;
                                return `translate3d(${f+(0-f)*N}%, ${t+
(0-t)*N}%, 0)`
                            }
                            return `translate3d(0, 0, 0) scale(${N})`
                        }
                        if (!1 === q) {
                            if (["LC", "RC"].includes(g)) return t = "LC" === g ? -100 : 100, `translate3d(${t+(0-t)*N}%, -50%, 0)`;
                            if (["TC", "BC"].includes(g)) return t = "TC" === g ? -100 : 100, `translate3d(-50%, ${t+(0-t)*N}%, 0)`
                        }
                        return ["LC", "RC"].includes(g) ? `translate3d(0, -50%, 0) scale(${N})` : ["TC", "BC"].includes(g) ? `translate3d(-50%, 0, 0) scale(${N})` : ["TL", "TR", "BL", "BR"].includes(g) ? `translate3d(0, 0, 0) scale(${N})` : `translate3d(-50%, -50%, 0) scale(${N})`
                    })();
                    const x =
                        "number" === typeof a.opacity ? a.opacity : 1;
                    b.style.opacity = String(x + (1 - x) * N);
                    if (1 > H) r = requestAnimationFrame(F);
                    else if (b.style.willChange = "auto", b.style.backfaceVisibility = "", a.onComplete) a.onComplete()
                };
            var r = requestAnimationFrame(F);
            return {
                initialTransform: E,
                finalTransform: S,
                cancel: () => {
                    r && (cancelAnimationFrame(r), b.style.willChange = "auto", b.style.backfaceVisibility = "")
                }
            }
        }
    };
    $.aBox = function(b, a) {
        function l() {
            if (S) {
                E += 2 * q;
                3 <= Math.abs(E) && (q *= -1);
                var u = Math.abs(E) / 3;
                u = 2 * (.5 > u ? 2 * u * u : -1 + (4 - 2 * u) * u);
                if (a) switch (a) {
                    case "TL":
                        u =
                            `translate(${G-u}px, ${y-u}px)`;
                        break;
                    case "TR":
                        u = `translate(${G+u}px, ${y-u}px)`;
                        break;
                    case "BL":
                        u = `translate(${G-u}px, ${y+u}px)`;
                        break;
                    case "BR":
                        u = `translate(${G+u}px, ${y+u}px)`;
                        break;
                    case "TC":
                        u = `translate(${G}px, ${y-u}px)`;
                        break;
                    case "BC":
                        u = `translate(${G}px, ${y+u}px)`;
                        break;
                    case "LC":
                        u = `translate(${G-u}px, ${y}px)`;
                        break;
                    case "RC":
                        u = `translate(${G+u}px, ${y}px)`;
                        break;
                    default:
                        u = B
                } else u = `${B} scale(${1+u/100})`;
                g.css("transform", u); - 10 <= E && 10 >= E ? requestAnimationFrame(l) : (S = !1, g.css("transform",
                    B))
            }
        }
        const g = $(b);
        let q = 1,
            E = 0,
            S = !0;
        const B = g.css("transform");
        b = new DOMMatrix(B);
        const G = b.m41,
            y = b.m42;
        l();
        M.setTimeoutRAF(() => {
            S = !1;
            g.css("transform", B)
        }, 300)
    };
    $._alert0 = function(b, a = {}, l = 300) {
        var g = a.preserveExisting,
            q = a.parent;
        "string" === typeof b && (b = b.replace(/>\s+</g, "><").trim());
        "object" === typeof b && (a = b, b = "");
        if (null === b || void 0 === b) b = "";
        var E = {
                id: null,
                swipe: !1,
                parent: "body",
                background: "#000000",
                alpha: 50,
                retainScroll: !0,
                autoscroll: !1,
                noScrollRestore: !1,
                bgcolor: "#FFFFFF",
                titleColor: "#000000",
                color: "#000000",
                TOPS: "",
                shadow: "",
                History: !0,
                closeBack: void 0,
                shadowBox: "0 2px 10px rgba(0,0,0,0.3)",
                vibrate: !0,
                trigger: "",
                title: "",
                Font: "1.1em",
                font: "0.9em",
                opacity: 1,
                padding: 0,
                margin: "0",
                border: "none",
                borderWidth: "",
                borderStyle: "",
                borderColor: "",
                text: "",
                textBottom: "",
                width: "250px",
                minWidth: "",
                maxWidth: "",
                height: "auto",
                minHeight: "",
                maxHeight: "",
                radius: "3px",
                zindex: 9999,
                toastZindex: 99999,
                $Ok: "Ok",
                OkBgcolor: "#E0E0E0",
                OkColor: "#000000",
                scroll: !1,
                scrollX: !1,
                scrollY: !1,
                unscroll: !1,
                close: !1,
                xclose: !1,
                loading: !1,
                TL: void 0,
                TR: void 0,
                BL: void 0,
                BR: void 0,
                TC: void 0,
                LC: void 0,
                RC: void 0,
                BC: void 0,
                CC: void 0
            },
            S = !1 !== a.$Ok || Object.keys(a).some(f => f.startsWith("$") && "$Ok" !== f);
        a.padding = a.padding || (S ? "15px" : "15px 15px 0 15px");
        "_self" === a.parent && (a.preserveExisting = !0);
        if ("_blank" === a.parent) {
            let f = 2147483640;
            Array.from(document.querySelectorAll(".domquery-alert")).forEach(t => {
                t = parseInt(getComputedStyle(t).zIndex);
                !isNaN(t) && t > f && (f = t)
            });
            a.zindex = a.zindex && a.zindex !== E.zindex ? Math.max(a.zindex, f) + 2 : f +
                2;
            2147483647 < a.zindex && (a.zindex = 2147483647);
            a.overlayZindex = a.zindex - 1
        }
        g = void 0 !== g ? g : a.preserveExisting;
        q = void 0 !== q ? q : a.parent;
        a = Object.assign({}, E, a);
        void 0 === a.closeBack && (a.closeBack = !1);
        void 0 !== g && (a.preserveExisting = g);
        if ("_self" === q || "_blank" === q) a.parent = q;
        delete a._originalParent;
        if ("_self" !== a.parent && "_blank" !== a.parent && (!a.zindex || a.zindex === E.zindex)) {
            q = Array.from(document.querySelectorAll(".domquery-alert"));
            let f = E.zindex;
            q.forEach(t => {
                t = parseInt(getComputedStyle(t).zIndex);
                !isNaN(t) &&
                    t > f && (f = t)
            });
            a.zindex = f + 2;
            a.overlayZindex = a.zindex - 1
        }!a.unscroll || a.scrollY || a.scroll || (a.scrollY = !0, a.hideScrollbar = !0);
        !0 === a.scrollY && (a.forceScroll = !0, a.scroll = !0);
        "auto" !== a.height || !a.scrollY && !a.scroll || a.minHeight || (a.minHeight = "200px");
        q = f => {
            if (void 0 === f) return "auto";
            if ("number" === typeof f) return f + "px";
            if ("string" === typeof f) {
                if (/px|%|vh|vw|rem|em|ch|ex|cm|mm|in|pt|pc/i.test(f)) return f;
                const t = parseFloat(f);
                if (!isNaN(t)) return t + "px"
            }
            return f
        };
        const B = q(a.width);
        let G = q(a.height);
        "_blank" ===
        a.parent && "100%" === G && (G = "100vh");
        g = "" !== a.title;
        S = `alert-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;
        a.instanceId = S;
        if (!a._originalFirstStepOptions) {
            a._originalFirstStepOptions = {};
            var y = new Set;
            for (var u in a) a[u] && "object" === typeof a[u] && !Array.isArray(a[u]) && "_originalFirstStepOptions" !== u && "_hasNext" !== u && "instanceId" !== u && "_stepInputValues" !== u && "_currentStepKey" !== u && void 0 !== a[u].title && y.add(u);
            for (var F in a) y.has(F) || "_originalFirstStepOptions" === F || "_hasNext" === F || "_stepInputValues" ===
                F || "_currentStepKey" === F || (a._originalFirstStepOptions[F] = a[F])
        }
        a._currentStepKey || (a._currentStepKey = "first");
        a._stepInputValues || (a._stepInputValues = {});
        z.options[S] = {
            swipe: a.swipe,
            parent: a.parent,
            toast: a.toast,
            History: a.History,
            closeBack: a.closeBack,
            vibrate: a.vibrate,
            openSpeed: a.openSpeed,
            closeSpeed: a.closeSpeed,
            CC: a.CC,
            TC: a.TC,
            LC: a.LC,
            RC: a.RC,
            BC: a.BC,
            TL: a.TL,
            TR: a.TR,
            BL: a.BL,
            BR: a.BR,
            swipeCallback: a.swipeCallback,
            __closeFromHistory: null
        };
        a.toast || a.preserveExisting || "_blank" === a.parent || "_self" ===
            a.parent || !(u = D.getDocumentElement(".domquery-alert:not(.toast-alert)")) || ((F = u.getAttribute("data-instance-id")) && (F = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${F}"]`)) && F.parentNode && F.parentNode.removeChild(F), u.parentNode && u.parentNode.removeChild(u));
        F = u = "";
        let r = [];
        y = (f, t) => {
            if (!f) return "";
            if ("function" === typeof f) {
                try {
                    var v = f();
                    if ("string" === typeof v) return `<div class="domquery-text-container">${v}</div>`;
                    if (v instanceof Element) return `<div class="domquery-text-container">${v.outerHTML}</div>`
                } catch (na) {}
                return ""
            }
            if ("string" ===
                typeof f) {
                v = t.alertId || "alert_" + Date.now();
                t.alertId = v;
                const na = document.createElement("div");
                na.id = v;
                for (var T in t) "function" === typeof t[T] && (na[T] = t[T]);
                document.body.appendChild(na);
                f = f.replace(/this\./g, `document.getElementById('${v}').`);
                f = f.replace(/onclick="([^"]+)"/g, (va, Z) => Z.includes("this.") ? va : `onclick="window.${Z}"`);
                t = f.trim();
                return !t.startsWith("#") && !t.startsWith(".") || t.includes("bin(") || t.includes("{") || t.includes("}") ? `<div class="domquery-text-container">${f.split(/(\{[^}]+\}|bin\([^)]+\))/).map(va=>
(va=va.trim())?va.startsWith("bin(")?va.slice(4,-1).split(",").map(Z=>Z.trim()).map(Z=>{const ba=document.querySelector(Z);if(ba){const Ca=h.getComputedStyle(ba).display;"none"===Ca&&(ba.style.display="block");r.push({selector:Z,parent:ba.parentNode,nextSibling:ba.nextSibling,element:ba,originalDisplay:Ca});Z=ba.outerHTML;ba.parentNode.removeChild(ba);return Z}return""}).join("\n"):va.startsWith("{")&&va.endsWith("}")&&!va.includes("{")&&!va.includes("}")?va.slice(1,-1).split(";").map(Z=>Z.trim()).map(Z=>
{try{return eval(Z)||""}catch(ba){return""}}).join(""):va:"").join("")}</div>` : (f = document.querySelector(t)) ? (T = getComputedStyle(f).display, "none" === T && (f.style.display = "block"), r.push({
                    selector: t,
                    parent: f.parentNode,
                    nextSibling: f.nextSibling,
                    element: f,
                    originalDisplay: T
                }), t = f.outerHTML, f.parentNode.removeChild(f), `<div class="domquery-text-container">${t}</div>`) : ""
            }
            return `<div class="domquery-text-container">${String(f)}</div>`
        };
        a.text && (u = y(a.text, a));
        a.textBottom && (F = y(a.textBottom, a));
        y = a.xclose ?
            `<div style="position: absolute; right: 10px; top: 10px; cursor: pointer; transition: opacity 0.2s; z-index:1; ${!0===a.hide?"opacity: 0;":""}" class="domquery-close-x-btn">\n\t\t\t\t<svg width="20" height="20" viewBox="0 0 24 24" style="opacity: 0.6; transition: opacity 0.2s; pointer-events: all;"\n\t\t\t\t\t\tonmouseover="this.style.opacity='1'"\n\t\t\t\t\t\tonmouseout="this.style.opacity='0.6'">\n\t\t\t\t\t<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="${a.color}"/>\n\t\t\t\t</svg>\n\t\t\t</div>` :
            '<div style="display:none" class="domquery-close-x-btn"></div>';
        const H = ['<div class="domquery-alert-loading" style="display: none;position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: rgba(255,255,255,0.2);', "z-index: " + (a.zindex + 1) + ";", 'justify-content: center;align-items: center;"><div style="width: 40px;height: 40px;border: 3px solid #f3f3f3;', "border-top: 3px solid " + a.OkBgcolor + ";", 'border-radius: 50%;animation: spin 1s linear infinite;"></div></div><style>@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}</style>'].join(""),
            N = (f => {
                const t = [];
                Object.keys(f).forEach(v => {
                    if (v.startsWith("$") && !v.endsWith("Style") && !v.endsWith("hover")) {
                        var T = v.substring(1).replace(/Bgcolor|Color$/, "");
                        "Ok" === T || v.endsWith("Color") || v.endsWith("Bgcolor") || t.find(na => na.name === T) || t.push({
                            name: T,
                            text: f[v] || T,
                            bgcolor: f[`$${T}Bgcolor`] || "#007bff",
                            color: f[`$${T}Color`] || "#FFFFFF",
                            customStyle: f[`$${T}Style`] || "",
                            hoverStyle: f[`$${T}hover`] || ""
                        })
                    }
                });
                return t
            })(a),
            x = (() => {
                let f = '<div style="text-align: right; margin-top: 15px;">';
                if (!1 !== a.$Ok) {
                    const t =
                        a.$Okhover || "opacity: 1;",
                        v = ["padding: 6px 10px;", "background: " + (a.$OkBgcolor || a.OkBgcolor) + ";", "color: " + (a.$OkColor || a.OkColor) + ";", "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;", a.$OkStyle || ""].join("");
                    f += ['<button class="domquery-alert-close-btn" style="', v, '" onmouseover="this.style.cssText = `' + v + "; " + t + '`"', 'onmouseout="this.style.cssText = `' + v + '`">', a.$Ok, "</button>"].join("")
                }
                f += N.map(function(t) {
                    const v = ["padding: 6px 10px;",
                            `background: ${t.bgcolor};`, `color: ${t.color};`, "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;", t.customStyle
                        ].join(""),
                        T = t.hoverStyle || "opacity: 1;";
                    return [`<button class="alert-${t.name.toLowerCase()}-btn" style="`, v, '" onmouseover="this.style.cssText = `' + v + "; " + T + '`"', 'onmouseout="this.style.cssText = `' + v + '`">', t.text, "</button>"].join("")
                }).join("");
                return f + "</div>"
            })();
        E = ["z-index: " + ("_blank" === a.parent ? a.zindex : a.toast ?
                a.toastZindex : a.zindex) + " !important;", "margin: " + (a.margin || "0") + ";", a.border ? "border: " + a.border + ";" : "", a.borderWidth ? "border-width: " + a.borderWidth + ";" : "", a.borderStyle ? "border-style: " + a.borderStyle + ";" : "", a.borderColor ? "border-color: " + a.borderColor + ";" : "", "background: " + a.bgcolor + ";", "width: " + B + ";", a.minWidth ? "min-width: " + q(a.minWidth) + ";" : "", a.maxWidth ? "max-width: " + q(a.maxWidth) + ";" : "", "height: " + G + ";", a.minHeight ? "min-height: " + q(a.minHeight) + ";" : "", a.maxHeight ? "max-height: " + q(a.maxHeight) +
            ";" : "", "border-radius: " + a.radius + ";", "transparent" === a.bgcolor ? "" : !1 === a.shadowBox ? "" : "box-shadow: " + ("string" === typeof a.shadowBox ? a.shadowBox : E.shadowBox) + ";", "box-sizing: border-box;position: fixed;", "opacity: " + ("number" === typeof a.opacity ? a.opacity : 1) + ";", "z-index: " + a.zindex + ";", "overflow: hidden !important;", a.maxHeight ? "" : "max-height: 100vh !important;", "display: flex !important;flex-direction: column !important;"
        ].join("");
        b = ['<div class="domquery-alert ' + (a.toast ? "toast-alert" : "standard-alert") +
            '" ', `data-instance-id="${S}" `, null !== a.id ? `id="${a.id}" ` : `id="${S}" `, 'style="' + E + '">', y, H, a.scroll || a.scrollX || a.scrollY || a.forceScroll ? '<div class="alert-scroll-wrapper" style="position: relative !important;width: 100% !important;height: 100% !important;max-height: ' + (a.maxHeight || "100%") + " !important;overflow: " + (a.scroll || a.scrollY || a.forceScroll ? "auto" : a.scrollX ? "auto hidden" : a.scrollY || a.forceScroll ? "hidden auto" : "hidden") + " !important;" + (a.hideScrollbar ? "scrollbar-width: none !important; -ms-overflow-style: none !important;" :
                "") + "-webkit-overflow-scrolling: touch !important;touch-action: " + (a.scroll || a.scrollY || a.forceScroll ? "pan-x pan-y" : a.scrollY || a.forceScroll ? "pan-y" : "pan-x") + ' !important;"><div style="padding: ' + ("0" === a.padding ? "0" : q(a.padding)) + ';">' : '<div style="padding: ' + ("0" === a.padding ? "0" : q(a.padding)) + ';overflow: hidden !important;max-height: 100% !important;height: 100% !important;flex: 1;">', '<div class="domquery-alert-body" style="width: 100% !important;' + (a.toast ? "text-overflow: ellipsis;" : "") + (a.scroll ||
                a.scrollX || a.scrollY || a.forceScroll ? "" : "overflow: hidden !important;") + (!0 === a.hide ? "opacity: 0;" : "") + '">', ((f, t) => {
                if (t) return `<div style="font-size:${a.Font}; font-weight:bold; color:${a.titleColor}">${a.title}</div>\n\t\t\t\t\t   <hr style="border:none; height:1px; background-color:rgba(0,0,0,0.1); margin:10px 0">\n\t\t\t\t\t   <div style="font-size:${a.font}; color:${a.color||"#000000"}">${f}</div>`;
                let v;
                f.includes("\n") ? v = f.split("\n", 2) : f.includes("<br>") && (v = f.split("<br>", 2));
                return v ? `<div style="font-size:${a.Font}; font-weight:bold; color:${a.titleColor}">${v[0]}</div>\n\t\t\t\t\t   <hr style="border:none; height:1px; background-color:rgba(0,0,0,0.1); margin:10px 0">\n\t\t\t\t\t   <div style="font-size:${a.font}; color:${a.color||
"#000000"}">${v[1]}</div>` : `<div style="font-size:${a.Font}; font-weight:bold; color:${a.titleColor}">${f}</div>`
            })(b, g), "</div>", '<div class="domquery-text-container" style="width: 100% !important;' + (a.scroll || a.scrollX || a.scrollY || a.forceScroll ? "" : "overflow: hidden !important;") + (!0 === a.hide ? "opacity: 0;" : "") + '">', u, "</div>", '<div style="width: 100% !important;' + (a.scroll || a.scrollX || a.scrollY || a.forceScroll ? "" : "overflow: hidden !important;") + (!0 === a.hide ? "opacity: 0;" : "") + '">', x, "</div>", '<div class="domquery-text-bottom-container" style="width: 100% !important;' +
            (a.scroll || a.scrollX || a.scrollY || a.forceScroll ? "" : "overflow: hidden !important;") + (!0 === a.hide ? "opacity: 0;" : "") + '">', F, "</div></div>", a.scroll || a.scrollX || a.scrollY || a.forceScroll ? "</div></div>" : "</div>", "</div>"
        ].join("");
        E = document.createElement("div");
        E.innerHTML = b;
        b = E.firstElementChild;
        b._elementInfos = r;
        E = a && "number" === typeof a.openSpeed ? a.openSpeed : l;
        a._closeSpeed = a && "number" === typeof a.closeSpeed ? a.closeSpeed : l;
        return {
            alertBox: b,
            options: a,
            speed: E,
            buttonConfigs: N
        }
    };
    $._alert1 = function(b, a, l,
        g, q) {
        function E(n) {
            b.contains(n.target) || n.preventDefault()
        }

        function S(n, d, c) {
            const e = D.getElement(d, ".alert-scroll-wrapper") || D.getElement(d, ".domquery-alert-body");
            if (e)
                if (50 < e.scrollHeight) $.AlertScrollManager.restorePosition(n, d, c);
                else {
                    const m = new MutationObserver(() => {
                        50 < e.scrollHeight && ($.AlertScrollManager.restorePosition(n, d, c), m.disconnect())
                    });
                    m.observe(e, {
                        childList: !0,
                        subtree: !0
                    })
                }
            else {
                const m = new MutationObserver(() => {
                    const k = D.getElement(d, ".alert-scroll-wrapper") || D.getElement(d, ".domquery-alert-body");
                    k && 50 < k.scrollHeight && ($.AlertScrollManager.restorePosition(n, d, c), m.disconnect())
                });
                m.observe(d, {
                    childList: !0,
                    subtree: !0
                })
            }
        }
        const B = b.getAttribute("data-instance-id");
        let G = !0;
        var y = () => {
            if (!a.parent) return document.body;
            if ("_blank" === a.parent) try {
                var n = "domquery-blank-container-" + B;
                let d = null,
                    c = 0;
                Array.from(document.querySelectorAll(".domquery-alert")).forEach(p => {
                    if (p.getAttribute("data-instance-id") !== B) {
                        const w = parseInt(getComputedStyle(p).zIndex);
                        !isNaN(w) && w > c && (c = w, d = p)
                    }
                });
                const e = a.zindex ||
                    2147483647,
                    m = e - 1 - 1;
                let k = document.getElementById(n);
                if (k) {
                    const p = a.zindex || 2147483647;
                    a.overlayZindex = p - 1;
                    a.zindex = p;
                    a.toastZindex = p
                } else {
                    k = document.createElement("div");
                    k.className = "domquery-blank-container";
                    k.id = n;
                    k.setAttribute("data-instance-id", B);
                    k.style.cssText = `\n\t\t\t\t\t\t\tposition: fixed;\n\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\t\twidth: 100vw;\n\t\t\t\t\t\t\theight: 100vh;\n\t\t\t\t\t\t\tpointer-events: none; /* \uae30\ubcf8\uc801\uc73c\ub85c\ub294 \uc774\ubca4\ud2b8 \ud1b5\uacfc */\n\t\t\t\t\t\t\tz-index: ${m};\n\t\t\t\t\t\t`;
                    document.body.appendChild(k);
                    b.setAttribute("data-blank-container-id", n);
                    b.style.position = "fixed";
                    b.style.pointerEvents = "auto";
                    b.style.setProperty("z-index", e.toString(), "important");
                    b.style.left = "0";
                    b.style.right = "0";
                    b.style.margin = "0 auto";
                    b.classList.add("domquery-independent-alert");
                    a.overlayZindex = e - 1;
                    a.zindex = e;
                    a.toastZindex = e;
                    b.style.setProperty("z-index", a.zindex.toString(), "important");
                    d && (a._parentAlert = d);
                    try {
                        window !== window.top && window.top.document.body.appendChild(k)
                    } catch (p) {}
                }
                return document.body
            } catch (d) {
                return document.body
            }
            if ("_self" ===
                a.parent) {
                let d = null,
                    c = 9998;
                Array.from(document.querySelectorAll(".domquery-alert")).forEach(e => {
                    if (e.getAttribute("data-instance-id") !== a.instanceId) {
                        const m = parseInt(getComputedStyle(e).zIndex);
                        !isNaN(m) && m > c && (c = m, d = e)
                    }
                });
                if (d) {
                    a._parentAlert = d;
                    n = parseInt(getComputedStyle(d).zIndex) || 0;
                    !isNaN(n) && 0 < n ? (a.zindex = n + 2, a.overlayZindex = a.zindex - 1) : a.zindex && 9999 !== a.zindex || (a.zindex = 9999, a.overlayZindex = a.zindex - 1);
                    if (n = d.getAttribute("data-instance-id")) a._parentInstanceId = n, b.setAttribute("data-parent-instance-id",
                        n);
                    else try {
                        console.warn("[alert.js] _self alert \uc0dd\uc131 - \ubd80\ubaa8 instanceId\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c")
                    } catch (e) {}
                    return document.body
                }
                console.warn("[alert.js] _self alert \uc0dd\uc131 - \ubd80\ubaa8 alert\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c");
                return document.body
            }
            n = null;
            "string" === typeof a.parent ? a.parent.startsWith("#") ? (n = a.parent.substring(1), n = document.getElementById(n)) : n = document.querySelector(a.parent) : n = a.parent;
            if (!n) return document.body;
            n === document.body || n.classList.contains("domquery-alert") ||
                "static" !== getComputedStyle(n).position || (n.style.position = "relative");
            return n
        };
        const u = y(),
            F = !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                isMobile: !1
            }).isMobile;
        (function() {
            if ("_self" === a.parent) {
                const d = b.querySelector('div[style*="overflow: auto"]');
                d && (d.addEventListener("wheel", c => {
                    c.stopPropagation();
                    d.scrollHeight > d.clientHeight && (c.preventDefault(), d.scrollTop += c.deltaY)
                }, {
                    passive: !1
                }), d.addEventListener("touchmove", c => {
                    const e = Math.abs(c.touches[0].clientX - (c.touches[0].target.getBoundingClientRect().left +
                            c.touches[0].target.offsetWidth / 2)),
                        m = Math.abs(c.touches[0].clientY - (c.touches[0].target.getBoundingClientRect().top + c.touches[0].target.offsetHeight / 2));
                    e > 1.5 * m || c.stopPropagation()
                }, {
                    passive: !0
                }));
                var n = D.getElement(b, ".alert-scroll-wrapper");
                n && (n.addEventListener("wheel", c => {
                    c.target.closest('div[style*="overflow: auto"]') || c.stopPropagation()
                }, {
                    passive: !0
                }), n.addEventListener("touchmove", c => {
                    if (!c.target.closest('div[style*="overflow: auto"]')) {
                        var e = Math.abs(c.touches[0].clientX - (c.touches[0].target.getBoundingClientRect().left +
                                c.touches[0].target.offsetWidth / 2)),
                            m = Math.abs(c.touches[0].clientY - (c.touches[0].target.getBoundingClientRect().top + c.touches[0].target.offsetHeight / 2));
                        e > 1.5 * m || c.stopPropagation()
                    }
                }, {
                    passive: !0
                }))
            } else if (n = Array.from(document.querySelectorAll(".domquery-alert")), 1 < n.length || "_blank" === a.parent && 0 < n.length) {
                const d = b.querySelector('div[style*="overflow: auto"]');
                d && (d.addEventListener("wheel", c => {
                        c.stopPropagation();
                        d.scrollHeight > d.clientHeight && (c.preventDefault(), d.scrollTop += c.deltaY)
                    }, {
                        passive: !1
                    }),
                    d.addEventListener("touchmove", c => {
                        const e = Math.abs(c.touches[0].clientX - (c.touches[0].target.getBoundingClientRect().left + c.touches[0].target.offsetWidth / 2)),
                            m = Math.abs(c.touches[0].clientY - (c.touches[0].target.getBoundingClientRect().top + c.touches[0].target.offsetHeight / 2));
                        e > 1.5 * m || c.stopPropagation()
                    }, {
                        passive: !0
                    }));
                b.style.overflow = "auto";
                b.style.WebkitOverflowScrolling = "touch"
            } else if (!a.toast || a.toast && !1 !== a.background)
                if (F) {
                    document.body.style.overflow = "hidden";
                    document.documentElement.style.overflow =
                        "hidden";
                    b.style.overflow = "auto";
                    b.style.WebkitOverflowScrolling = "touch";
                    document.addEventListener("touchmove", E, {
                        passive: !1
                    });
                    const d = b.querySelector('div[style*="overflow: auto"]');
                    d && (d.addEventListener("wheel", c => {
                        c.stopPropagation();
                        d.scrollHeight > d.clientHeight && (c.preventDefault(), d.scrollTop += c.deltaY)
                    }, {
                        passive: !1
                    }), d.addEventListener("touchmove", c => {
                        const e = Math.abs(c.touches[0].clientX - (c.touches[0].target.getBoundingClientRect().left + c.touches[0].target.offsetWidth / 2)),
                            m = Math.abs(c.touches[0].clientY -
                                (c.touches[0].target.getBoundingClientRect().top + c.touches[0].target.offsetHeight / 2));
                        e > 1.5 * m || c.stopPropagation()
                    }, {
                        passive: !0
                    }))
                } else if (n = document.documentElement.scrollWidth > document.documentElement.clientWidth, document.documentElement.scrollHeight > document.documentElement.clientHeight || n) b.wheelListener = d => {
                    const c = d.target.closest('div[style*="overflow: auto"]');
                    c ? (d.stopPropagation(), c.scrollHeight > c.clientHeight && (d.preventDefault(), c.scrollTop += d.deltaY)) : b.contains(d.target) || d.preventDefault()
                },
                document.addEventListener("wheel", b.wheelListener, {
                    passive: !1
                })
        })();
        if (!1 === a.autoscroll) {
            var r = a.id || "default-scroll-position";
            $.AlertScrollManager.positions[r] && delete $.AlertScrollManager.positions[r]
        } else if (a.autoscroll && !1 !== a.autoscroll) {
            const n = a._autoscrollId || a.id || "default-scroll-position";
            if ("object" === typeof a.autoscroll && null !== a.autoscroll) {
                r = a.autoscroll;
                const d = "number" === typeof r.duration ? r.duration : 300,
                    c = "number" === typeof r.offset ? r.offset : 20;
                let e = null;
                r.scrollKey ? e = b.querySelector(`[data-scroll-key="${r.scrollKey}"]`) :
                    r.selector && (e = b.querySelector(r.selector));
                e && setTimeout(() => {
                    const k = D.getElement(b, ".alert-scroll-wrapper") || D.getElement(b, ".domquery-alert-body");
                    if (k && e) {
                        var p;
                        if ((p = D.getElement(b, ".alert-scroll-wrapper") || D.getElement(b, ".domquery-alert-body")) && e) {
                            if ("undefined" !== typeof $ && $.fn && $.fn.offset) {
                                var w = $(e);
                                p = $(p);
                                w = w.offset().top;
                                p = p.offset().top
                            } else {
                                w = e.getBoundingClientRect();
                                const V = p.getBoundingClientRect();
                                w = w.top - V.top + p.scrollTop;
                                p = p.scrollTop
                            }
                            p = w - p - c
                        } else p = null;
                        null !== p && 0 <= p && $.AlertScrollManager.scrollTo(k,
                            p, d)
                    }
                }, (a && "number" === typeof a.openSpeed ? a.openSpeed : 500) + 50);
                const m = () => {
                    $.AlertScrollManager.savePosition(n, b)
                };
                r = [D.getElement(b, ".alert-scroll-wrapper"), D.getElement(b, ".domquery-alert-body"), b.querySelector('div[style*="overflow: auto"]'), b.querySelector('div[style*="overflow-y: auto"]'), b.querySelector('div[style*="overflow-y: scroll"]'), b].filter(k => null !== k);
                r.forEach(k => {
                    k.addEventListener("scroll", m, {
                        passive: !0
                    })
                });
                b.scrollListener = m;
                b.scrollElements = r
            } else {
                const d = () => {
                    $.AlertScrollManager.savePosition(n,
                        b)
                };
                r = [D.getElement(b, ".alert-scroll-wrapper"), D.getElement(b, ".domquery-alert-body"), b.querySelector('div[style*="overflow: auto"]'), b.querySelector('div[style*="overflow-y: auto"]'), b.querySelector('div[style*="overflow-y: scroll"]'), b].filter(c => null !== c);
                r.forEach(c => {
                    c.addEventListener("scroll", d, {
                        passive: !0
                    })
                });
                b.scrollListener = d;
                b.scrollElements = r
            }
        }
        let H = 0,
            N = 0,
            x = 0,
            f = 0,
            t = 0,
            v = !1,
            T = null,
            na = 0,
            va = 0,
            Z = 1,
            ba = 0,
            Ca = !1,
            Da = null,
            ta = !1,
            ya = !1,
            Fa = 0,
            Ea = 0;
        if (void 0 !== a.LC || void 0 !== a.RC || void 0 !== a.TC || void 0 !==
            a.BC)
            if (!0 === a.swipe) {
                const n = void 0 !== a.LC ? "LC" : void 0 !== a.RC ? "RC" : void 0 !== a.TC ? "TC" : "BC";
                let d = D.getDocumentElement(".domquery-shadow-overlay"),
                    c = null,
                    e = null;
                const m = () => {
                    t = f = x = N = H = 0;
                    v = !1;
                    T = null;
                    ya = ta = !1;
                    va = na = 0;
                    Z = 1;
                    b.style.transition = "";
                    d && (d.style.transition = "")
                };
                (r = D.getElement(b, ".domquery-alert-close-btn") || D.getElement(b, ".domquery-close-x-btn")) && r.addEventListener("click", m);
                b.querySelectorAll(".domquery-alert-cancel-btn, .domquery-alert-confirm-btn").forEach(p => {
                    p.addEventListener("click",
                        m)
                });

                function k() {
                    const p = b.scrollTop;
                    Ca = 1 < Math.abs(p - ba);
                    ba = p;
                    Ca && (v || ta) && (v = !1, T = null, ya = ta = !1, "LC" === n || "RC" === n ? b.style.left = `${na}px` : b.style.top = `${va}px`, "_self" === a.parent ? (c && (c.style.opacity = Z), e && e.initialOpacity && (e.style.opacity = e.initialOpacity)) : d && (d.style.opacity = Z))
                }
                b.addEventListener("scroll", () => {
                    k();
                    Ca && (v = !1, T = null, ya = ta = !1, b.style.left = `${na}px`, d && (d.style.opacity = Z))
                }, {
                    passive: !0
                });
                b.addEventListener("touchstart", p => {
                    if (!p.target.closest(".editor-wrapper") && !p.target.closest(".domquery-alert-close-btn, .domquery-close-x-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn") &&
                        !G) {
                        var w = Array.from(document.querySelectorAll(".domquery-alert"));
                        if (w.findIndex(V => V.getAttribute("data-instance-id") === a.instanceId) === w.length - 1)
                            if (H = p.touches[0].clientX, N = p.touches[0].clientY, x = Date.now(), v = !1, T = null, ya = ta = !1, t = f = 0, p = b.getBoundingClientRect(), na = p.left, va = p.top, "_self" === a.parent) {
                                if (c = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`), p = parseInt(a.instanceId) - 1, e = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${p}"]`)) e.initialOpacity =
                                    parseFloat(h.getComputedStyle(e).opacity)
                            } else(d = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`)) && (Z = parseFloat(h.getComputedStyle(d).opacity))
                    }
                }, {
                    passive: !0
                });
                b.addEventListener("touchmove", p => {
                    if (!p.target.closest(".editor-wrapper") && (p.stopPropagation(), !p.target.closest(".domquery-alert-close-btn, .domquery-close-x-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn") && !G)) {
                        var w = p.target.closest(".domquery-alert").getAttribute("data-instance-id");
                        if (!1 !== z.options[w]?.swipe) {
                            w = p.touches[0];
                            var V = w.clientX - H,
                                Y = w.clientY - N;
                            f = V;
                            t = Y;
                            if (!Ca) {
                                w = void 0 !== a.LC ? "LC" : void 0 !== a.RC ? "RC" : void 0 !== a.TC ? "TC" : "BC";
                                if (!v && (8 < Math.abs(V) || 8 < Math.abs(Y)) && p.cancelable && null === T) {
                                    var K = Math.abs(V),
                                        A = Math.abs(Y);
                                    const ea = 20 < K + A ? 1.3 : 2;
                                    switch (w) {
                                        case "LC":
                                            0 > V && K > A * ea && (v = ta = T = !0, 20 < K && (p.preventDefault(), ya = !0));
                                            break;
                                        case "RC":
                                            0 < V && K > A * ea && (v = ta = T = !0, 20 < K && (p.preventDefault(), ya = !0));
                                            break;
                                        case "TC":
                                            0 > Y && A > K * ea && (T = !1, v = ta = !0, 20 < A && (p.preventDefault(), ya = !0));
                                            break;
                                        case "BC":
                                            0 < Y && A > K * ea && (T = !1, v = ta = !0, 20 < A && (p.preventDefault(), ya = !0))
                                    }
                                }
                                ta && !ya && p.cancelable && (K = Math.abs(V), A = Math.abs(Y), 20 < (T ? K : A) && (p.preventDefault(), ya = !0));
                                ta && (p.stopPropagation(), p = b.offsetWidth, K = b.offsetHeight, A = 1 * ("LC" === w || "RC" === w ? p : K), p = V, K = Y, T ? (K = 0, "LC" === w ? p = Math.max(-A, Math.min(0, V)) : "RC" === w && (p = Math.min(A, Math.max(0, V)))) : (p = 0, "TC" === w ? K = Math.max(-A, Math.min(0, Y)) : "BC" === w && (K = Math.min(A, Math.max(0, Y)))), b.style.transform = "LC" === w || "RC" === w ? `translate3d(${p}px, -50%, 0)` :
                                    `translate3d(-50%, ${K}px, 0)`, V = "LC" === w || "RC" === w ? Math.abs(p) / A : Math.abs(K) / A, "_self" === a.parent ? (c && (c.style.opacity = Z - Z * V), e && (e.style.opacity = e.initialOpacity + (1 - e.initialOpacity) * V)) : d && (d.style.opacity = Z - Z * V), z.options[a.instanceId]?.swipeCallback && "function" === typeof z.options[a.instanceId].swipeCallback && (Y = Date.now(), A = "LC" === w || "RC" === w ? Math.abs(p) / Math.max(Y - x, 1) : Math.abs(K) / Math.max(Y - x, 1), w = {
                                        direction: w.toLowerCase(),
                                        velocity: A,
                                        timeElapsed: Y - x,
                                        progress: V,
                                        deltaX: p,
                                        deltaY: K,
                                        instanceId: a.instanceId,
                                        phase: "progress"
                                    }, z.options[a.instanceId].swipeCallback(w)))
                            }
                        }
                    }
                }, {
                    passive: !1
                });
                b.addEventListener("touchend", p => {
                    if (!p.target.closest(".editor-wrapper") && ta && !G)
                        if (Da && (cancelAnimationFrame(Da), Da = null), p.stopPropagation(), k(), Ca) b.style.transition = `all ${l}ms`, "LC" === n || "RC" === n ? b.style.left = `${na}px` : b.style.top = `${va}px`, "_self" === a.parent ? (c && (c.style.transition = `opacity ${l}ms`, c.style.opacity = Z), e && e.initialOpacity && (e.style.transition = `opacity ${l}ms`, e.style.opacity = e.initialOpacity)) : d &&
                            (d.style.transition = `opacity ${l}ms`, d.style.opacity = Z);
                        else {
                            p = Date.now() - x;
                            var w = "LC" === n || "RC" === n ? Math.abs(f) / Math.max(p, 1) : Math.abs(t) / Math.max(p, 1);
                            Fa = w;
                            Ea = p;
                            if (.5 < w) {
                                b.timeoutId && (clearTimeout(b.timeoutId), b.timeoutId = null);
                                a.timeOut && (a.timeOut = null);
                                b._elementInfos && b._elementInfos.forEach(K => {
                                    if (K.element) try {
                                        K.nextSibling ? K.parent.insertBefore(K.element, K.nextSibling) : K.parent.appendChild(K.element), K.element.style.display = K.originalDisplay
                                    } catch (A) {}
                                });
                                v = !1;
                                T = null;
                                va = na = t = f = x = N = H = 0;
                                Z = 1;
                                const V = .5 < w ? Math.max(Math.floor(p / 2), 600) : Math.max(p, 600),
                                    Y = document.querySelectorAll(`.domquery-${a.toast?"toast":"shadow"}-overlay[data-instance-id="${a.instanceId}"]`);
                                Y.forEach(K => {
                                    K.style.transition = `opacity ${V}ms linear`;
                                    K.style.opacity = "0"
                                });
                                b.style.transition = `all ${V}ms ease-out`;
                                switch (n) {
                                    case "LC":
                                        b.style.left = "-100%";
                                        break;
                                    case "RC":
                                        b.style.left = "100%";
                                        break;
                                    case "TC":
                                        b.style.top = "-100%";
                                        break;
                                    case "BC":
                                        b.style.top = "100%"
                                }
                                M.setTimeoutRAF(() => {
                                    Y.forEach(K => {
                                        K && K.parentNode && K.parentNode.removeChild(K)
                                    });
                                    M.setTimeoutRAF(() => {
                                        sa(n.toLowerCase(), !0, 0, "swipe")
                                    }, 100)
                                }, V)
                            } else {
                                b.style.transition = "all 300ms";
                                switch (n) {
                                    case "LC":
                                    case "RC":
                                        b.style.left = `${na}px`;
                                        b.style.transform = "translate(0, -50%)";
                                        break;
                                    case "TC":
                                    case "BC":
                                        b.style.top = `${va}px`, b.style.transform = "translate(-50%, 0)"
                                }
                                "_self" === a.parent ? (c && (c.style.transition = "opacity 300ms", c.style.opacity = Z), e && e.initialOpacity && (e.style.transition = "opacity 300ms", e.style.opacity = e.initialOpacity)) : d && (d.style.transition = "opacity 300ms", d.style.opacity =
                                    Z);
                                M.setTimeoutRAF(() => {
                                    b.style.transition = "";
                                    document.querySelectorAll(".domquery-shadow-overlay").forEach(V => {
                                        V.style.transition = ""
                                    })
                                }, 300)
                            }
                        }
                }, {
                    passive: !0
                });
                b.addEventListener("touchcancel", () => {
                    v && (v = !1, b.style.overflow = "auto", b.style.willChange = "auto")
                }, {
                    passive: !0
                })
            } else b.addEventListener("touchmove", n => {
                const d = n.target.closest('.alert-scroll-wrapper, [style*="overflow: auto"], [id="chat-output"], [style*="overflow-y:auto"]');
                a.forceScroll || a.scrollY || d && (a.scroll || a.scrollY || a.scrollX) ? n.stopPropagation() :
                    n.preventDefault()
            }, {
                passive: !1
            });
        createAlertContext = (n, d = [], c = "default") => ({
            totalResults: d,
            arr: d,
            element: b,
            el: b,
            closeType: c,
            focus: e => {
                const m = b.querySelectorAll("input");
                m[e] && m[e].focus()
            },
            close: function(e = "xclose") {
                this._closeWasCalled = !0;
                this._closeTypeParam = e;
                if (this._functionCallbackExecuting) return !0;
                try {
                    if ("_self" === a.parent) {
                        const m = D.getElement(b, ".domquery-close-x-btn") || D.getElement(b, ".domquery-alert-close-btn");
                        m ? m.click() : sa(e, !0, 0, "function")
                    } else sa(e, !0, 0, "function")
                } catch (m) {
                    try {
                        const k =
                            D.getElement(b, ".domquery-close-x-btn") || D.getElement(b, ".domquery-alert-close-btn");
                        k && k.click()
                    } catch (k) {
                        console.error("[close] \uc5d0\ub7ec:", k)
                    }
                }
                return !0
            },
            setLoading: (e, m = 0, k) => {
                const p = b.querySelector(".domquery-alert-loading");
                p ? 0 < m ? setTimeout(() => {
                    p.style.display = e ? "flex" : "none";
                    "function" === typeof k && k()
                }, m) : (p.style.display = e ? "flex" : "none", "function" === typeof k && k()) : "function" === typeof k && k()
            },
            disableParentScroll: function(e) {
                b._scrollPosition = {
                    x: h.pageXOffset || document.documentElement.scrollLeft,
                    y: h.pageYOffset || document.documentElement.scrollTop
                };
                e ? e.split(",").map(m => m.trim()).forEach(m => {
                    "body" === m || "html" === m ? (document.body.style.cssText += "overflow: hidden !important;", document.documentElement.style.cssText += "overflow: hidden !important;") : document.querySelectorAll(m).forEach(k => {
                        k._originalOverflow = k.style.overflow;
                        k._originalPosition = k.style.position;
                        k.style.cssText += "overflow: hidden !important;"
                    })
                }) : (document.body.style.cssText += "overflow: hidden !important;", document.documentElement.style.cssText +=
                    "overflow: hidden !important;");
                !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                    isIOS: !1
                }).isIOS && (document.body.style.position = "fixed", document.body.style.width = "100%", document.body.style.top = `-${b._scrollPosition.y}px`);
                return this
            },
            enableParentScroll: function(e) {
                e ? e.split(",").map(m => m.trim()).forEach(m => {
                    "body" === m || "html" === m ? (document.body.style.overflow = "", document.documentElement.style.overflow = "") : document.querySelectorAll(m).forEach(k => {
                        void 0 !== k._originalOverflow && (k.style.overflow =
                            k._originalOverflow, delete k._originalOverflow);
                        void 0 !== k._originalPosition && (k.style.position = k._originalPosition, delete k._originalPosition)
                    })
                }) : (document.body.style.overflow = "", document.documentElement.style.overflow = "");
                !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                    isIOS: !1
                }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "");
                if (e = b._scrollPosition) h.scrollTo(e.x, e.y), delete b._scrollPosition;
                return this
            },
            controlElementScroll: function(e,
                m) {
                e && ("disable" === m ? (e._savedOverflow = e.style.overflow, e._savedScrollTop = e.scrollTop, e.style.overflow = "hidden") : "enable" === m && (e.style.overflow = e._savedOverflow || "auto", void 0 !== e._savedScrollTop && (e.scrollTop = e._savedScrollTop)))
            },
            next: (e, m, k = 400, p, w, V) => {
                let Y = null;
                const K = "CC TC LC RC BC RL LR TB BT".split(" ");
                "function" === typeof m ? (V = k, w = m, k = 400, m = null) : "number" === typeof m ? ("function" === typeof k ? (V = w, w = k) : "string" === typeof k && K.includes(k) && (Y = k, "function" === typeof p && (V = w, w = p)), k = m, m = null) :
                    "function" === typeof k ? (V = w, w = k, k = 400) : "string" === typeof k && K.includes(k) ? (Y = k, "function" === typeof p && (V = w, w = p), k = 400) : "number" === typeof k && "string" === typeof p && K.includes(p) && (Y = p);
                this.totalResults || (this.totalResults = {});
                p = a._currentStepKey || "first";
                m && (Array.isArray(m) || "" !== m) && (this.totalResults[p] = m);
                a._nextStepKey = "" === e ? "first" : e;
                let A;
                if ((A = "" === e ? a._originalFirstStepOptions || {} : a[e]) && "object" === typeof A) {
                    var ea = this.totalResults ? {
                            ...this.totalResults
                        } : {},
                        U = document.querySelector(`.domquery-alert[data-instance-id="${a.instanceId}"]`);
                    a._stepInputValues || (a._stepInputValues = {});
                    if (U) {
                        m = a._currentStepKey || "first";
                        const za = {};
                        U.querySelectorAll("input, textarea, select").forEach((P, ka) => {
                            za[ka] = "checkbox" === P.type || "radio" === P.type ? P.checked : P.value
                        });
                        0 < Object.keys(za).length && (a._stepInputValues[m] = za)
                    }
                    U ? M.setTimeoutRAF(() => {
                        a._hasNext = !0;
                        var za = {};
                        for (var P in a) a[P] && "object" === typeof a[P] && !Array.isArray(a[P]) && "_originalFirstStepOptions" !== P && "_hasNext" !== P && "instanceId" !== P && "_stepInputValues" !== P && "_currentStepKey" !== P && (za[P] =
                            a[P]);
                        Object.assign(a, A, za, {
                            function: function(ha) {
                                this.arr = this.totalResults = {
                                    ...ea
                                };
                                ha && (Array.isArray(ha) || "" !== ha) && (this.totalResults[e || "first"] = ha, this.arr = {
                                    ...this.totalResults
                                });
                                if (A.function) return this._functionCallbackExecuting = !0, ha = A.function.call(this, ha), this._functionCallbackExecuting = !1, ha
                            }
                        });
                        const ka = U.querySelector(".domquery-alert-body"),
                            ca = U.querySelector(".domquery-text-container"),
                            Ja = (ha, W, O) => {
                                ka && void 0 !== ha && (ka.innerHTML = ha);
                                ca && void 0 !== W && (ca.innerHTML = W);
                                (ha = U.querySelector(".domquery-text-bottom-container")) &&
                                void 0 !== O && (ha.innerHTML = O);
                                const I = "" === e ? "first" : e;
                                a._stepInputValues && a._stepInputValues[I] && setTimeout(() => {
                                    const oa = U.querySelectorAll("input, textarea, select"),
                                        aa = a._stepInputValues[I];
                                    aa && oa.forEach((la, X) => {
                                        void 0 !== aa[X] && ("checkbox" === la.type || "radio" === la.type ? la.checked = aa[X] : la.value = aa[X])
                                    })
                                }, 10);
                                a._currentStepKey = a._nextStepKey || ("" === e ? "first" : e)
                            },
                            Ka = (ha, W = !1) => {
                                if (!(!ha || ka.contains(ha) || ca && ca.contains(ha))) {
                                    var O = ha.querySelector(".domquery-alert-close-btn");
                                    if (O) {
                                        if (W) {
                                            var I =
                                                A.$Okhover || a.$Okhover || "opacity: 1;",
                                                oa = ["padding: 6px 10px;", "background: " + (A.$OkBgcolor || A.OkBgcolor || a.$OkBgcolor || a.OkBgcolor || "#E0E0E0") + ";", "color: " + (A.$OkColor || A.OkColor || a.$OkColor || a.OkColor || "#000000") + ";", "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;", A.$OkStyle || a.$OkStyle || ""].join("");
                                            O.style.cssText = oa;
                                            O.setAttribute("onmouseover", "this.style.cssText = `" + oa + "; " + I + "`");
                                            O.setAttribute("onmouseout", "this.style.cssText = `" +
                                                oa + "`");
                                            O.offsetHeight
                                        }
                                        if (void 0 !== A.$Ok || void 0 !== a.$Ok) O.textContent = A.$Ok || a.$Ok
                                    }
                                    if (O = ha.querySelector(".alert-cancel-btn, .domquery-alert-cancel-btn"))
                                        if (W && (W = A.$cancelhover || a.$cancelhover || "opacity: 1;", I = ["padding: 6px 10px;", "background: " + (A.$cancelBgcolor || A.cancelBgcolor || a.$cancelBgcolor || a.cancelBgcolor || "#e74c3c") + ";", "color: " + (A.$cancelColor || A.cancelColor || a.$cancelColor || a.cancelColor || "#FFFFFF") + ";", "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;",
                                                A.$cancelStyle || a.$cancelStyle || ""
                                            ].join(""), O.style.cssText = I, O.setAttribute("onmouseover", "this.style.cssText = `" + I + "; " + W + "`"), O.setAttribute("onmouseout", "this.style.cssText = `" + I + "`")), void 0 !== A.$cancel || void 0 !== a.$cancel) O.textContent = A.$cancel || a.$cancel;
                                    var aa = ha.querySelector(".alert-prev-btn");
                                    if (void 0 !== A.$prev && !1 !== A.$prev || void 0 !== a.$prev && !1 !== a.$prev)
                                        if (W = A.$prevhover || a.$prevhover || "opacity: 1;", I = ["padding: 6px 10px;", "background: " + (A.$prevBgcolor || a.$prevBgcolor || "#95a5a6") +
                                                ";", "color: " + (A.$prevColor || a.$prevColor || "#FFFFFF") + ";", "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;", A.$prevStyle || a.$prevStyle || ""
                                            ].join(""), oa = la => {
                                                A.prev && "function" === typeof A.prev ? la.onclick = function() {
                                                    const X = createAlertContext("prev", [], "button");
                                                    X.close = function(C = "xclose") {
                                                        sa(C, !0, 0, "button")
                                                    };
                                                    A.prev.call(X)
                                                } : a.prev && "function" === typeof a.prev && (la.onclick = function() {
                                                    const X = createAlertContext("prev", [], "button");
                                                    X.close = function(C = "xclose") {
                                                        sa(C, !0, 0, "button")
                                                    };
                                                    a.prev.call(X)
                                                })
                                            }, aa) {
                                            aa.style.cssText = I;
                                            aa.setAttribute("onmouseover", "this.style.cssText = `" + I + "; " + W + "`");
                                            aa.setAttribute("onmouseout", "this.style.cssText = `" + I + "`");
                                            if (void 0 !== A.$prev || void 0 !== a.$prev) aa.textContent = A.$prev || a.$prev;
                                            oa(aa)
                                        } else aa = document.createElement("button"), aa.className = "alert-prev-btn", aa.style.cssText = I, aa.setAttribute("onmouseover", "this.style.cssText = `" + I + "; " + W + "`"), aa.setAttribute("onmouseout", "this.style.cssText = `" +
                                            I + "`"), aa.textContent = A.$prev || a.$prev || "\uc774\uc804", oa(aa), O ? ha.insertBefore(aa, O) : ha.appendChild(aa);
                                    else aa && aa.parentNode && aa.parentNode.removeChild(aa)
                                }
                            };
                        if (ka) {
                            const ha = ((L, Q) => {
                                    if (Q) return `<div style="font-size:${a.Font||"16px"}; font-weight:bold; color:${a.titleColor||"#000000"}">${a.title}</div>\n\t\t\t\t\t\t\t\t\t\t   <hr style="border:none; height:1px; background-color:rgba(0,0,0,0.1); margin:10px 0">\n\t\t\t\t\t\t\t\t\t\t   <div style="font-size:${a.font||"14px"}; color:${a.color||"#000000"}">${L}</div>`;
                                    let J;
                                    L.includes("\n") ? J = L.split("\n", 2) : L.includes("<br>") && (J = L.split("<br>", 2));
                                    return J ? `<div style="font-size:${a.Font||"16px"}; font-weight:bold; color:${a.titleColor||"#000000"}">${J[0]}</div>\n\t\t\t\t\t\t\t\t\t\t   <hr style="border:none; height:1px; background-color:rgba(0,0,0,0.1); margin:10px 0">\n\t\t\t\t\t\t\t\t\t\t   <div style="font-size:${a.font||"14px"}; color:${a.color||"#000000"}">${J[1]}</div>` : `<div style="font-size:${a.Font||"16px"}; font-weight:bold; color:${a.titleColor||
"#000000"}">${L}</div>`
                                })(A.message || a.message || "", "" !== a.title),
                                W = (() => {
                                    const L = void 0 !== A.text ? A.text : a.text;
                                    if (!L) return "";
                                    if ("string" === typeof L) return L;
                                    if ("function" === typeof L) try {
                                        const Q = L();
                                        if ("string" === typeof Q) return Q;
                                        if (Q instanceof Element) return Q.outerHTML
                                    } catch (Q) {}
                                    return ""
                                })(),
                                O = (() => {
                                    const L = A.textBottom;
                                    if (void 0 === L || !L) return "";
                                    if ("string" === typeof L) return L;
                                    if ("function" === typeof L) try {
                                        const Q = L();
                                        if ("string" === typeof Q) return Q;
                                        if (Q instanceof Element) return Q.outerHTML
                                    } catch (Q) {}
                                    return ""
                                })(),
                                I = L => {
                                    if (void 0 === L) return "auto";
                                    if ("number" === typeof L) return L + "px";
                                    if ("string" === typeof L) {
                                        if (/px|%|vh|vw|rem|em|ch|ex|cm|mm|in|pt|pc/i.test(L)) return L;
                                        const Q = parseFloat(L);
                                        if (!isNaN(Q)) return Q + "px"
                                    }
                                    return L
                                },
                                oa = (L, Q, J, ra) => {
                                    J = Object.assign({}, a, Q);
                                    if (void 0 !== Q.bgcolor || void 0 !== a.bgcolor) L.style.background = J.bgcolor;
                                    if (void 0 !== Q.radius || void 0 !== a.radius) L.style.borderRadius = J.radius;
                                    if (void 0 !== Q.border || void 0 !== a.border) L.style.border = J.border || "none";
                                    if (void 0 !== Q.borderWidth || void 0 !==
                                        a.borderWidth) L.style.borderWidth = J.borderWidth || "";
                                    if (void 0 !== Q.borderStyle || void 0 !== a.borderStyle) L.style.borderStyle = J.borderStyle || "";
                                    if (void 0 !== Q.borderColor || void 0 !== a.borderColor) L.style.borderColor = J.borderColor || "";
                                    if (void 0 !== Q.shadowBox || void 0 !== a.shadowBox) !1 === J.shadowBox ? L.style.boxShadow = "none" : "string" === typeof J.shadowBox ? L.style.boxShadow = J.shadowBox : "transparent" !== J.bgcolor && (L.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)");
                                    if (void 0 !== Q.opacity || void 0 !== a.opacity) L.style.opacity =
                                        "number" === typeof J.opacity ? String(J.opacity) : "1";
                                    if (void 0 !== Q.margin || void 0 !== a.margin) L.style.margin = J.margin || "0";
                                    if (void 0 !== Q.padding || void 0 !== a.padding) {
                                        ra = "0" === J.padding ? "0" : I(J.padding);
                                        const pa = L.querySelector(".alert-scroll-wrapper") || L.querySelector(".domquery-alert-body")?.parentElement;
                                        pa && (pa.style.padding = ra)
                                    }
                                    if (void 0 !== Q.minWidth || void 0 !== a.minWidth) L.style.minWidth = J.minWidth ? I(J.minWidth) : "";
                                    if (void 0 !== Q.maxWidth || void 0 !== a.maxWidth) L.style.maxWidth = J.maxWidth ? I(J.maxWidth) :
                                        "";
                                    if (void 0 !== Q.minHeight || void 0 !== a.minHeight) L.style.minHeight = J.minHeight ? I(J.minHeight) : "";
                                    if (void 0 !== Q.maxHeight || void 0 !== a.maxHeight) L.style.maxHeight = J.maxHeight ? I(J.maxHeight) : ""
                                },
                                aa = Math.max(U.offsetWidth, 1) + "px",
                                la = Math.max(U.offsetHeight, 1) + "px",
                                X = getComputedStyle(U).width,
                                C = getComputedStyle(U).height;
                            let da = X,
                                R = C;
                            void 0 !== A.width && (da = I(A.width));
                            void 0 !== A.height && (R = I(A.height));
                            const fa = da !== X || R !== C;
                            za = k || 400;
                            if (Y) {
                                const L = (pa, qa, Aa = !1) => {
                                    const Ba = Aa ? -1 : 1;
                                    return "CC" === pa ? `scale(${Aa?
1-qa:qa})` : "LC" === pa ? `translate3d(${Ba*(Aa?100*qa:100*(1-qa))}%, 0, 0)` : "RC" === pa ? `translate3d(${Ba*(Aa?100*-qa:100*-(1-qa))}%, 0, 0)` : "TC" === pa ? `translate3d(0, ${Ba*(Aa?100*qa:100*(1-qa))}%, 0)` : "BC" === pa ? `translate3d(0, ${Ba*(Aa?100*-qa:100*-(1-qa))}%, 0)` : "RL" === pa ? `translate3d(${Ba*(Aa?100*-qa:100*-(1-qa))}%, 0, 0)` : "LR" === pa ? `translate3d(${Ba*(Aa?100*qa:100*(1-qa))}%, 0, 0)` : "TB" === pa ? `translate3d(0, ${Ba*(Aa?100*qa:100*(1-qa))}%, 0)` : "BT" === pa ? `translate3d(0, ${Ba*(Aa?100*-qa:100*-(1-qa))}%, 0)` :
                                        "translate3d(0, 0, 0)"
                                };
                                if (fa) {
                                    P = Math.max(parseFloat(aa), 1);
                                    const pa = Math.max(parseFloat(la), 1);
                                    U.style.width = P + "px";
                                    U.style.height = pa + "px";
                                    U.style.minWidth = P + "px";
                                    U.style.minHeight = pa + "px";
                                    U.style.maxWidth = P + "px";
                                    U.style.maxHeight = pa + "px";
                                    U.style.boxSizing = "border-box";
                                    U.offsetWidth;
                                    U.offsetHeight
                                }
                                ka.style.willChange = "transform, opacity";
                                ka.style.backfaceVisibility = "hidden";
                                ka.style.transition = "none";
                                ka.style.transform = "translate3d(0, 0, 0)";
                                ka.style.opacity = "1";
                                ca && (ca.style.willChange = "transform, opacity",
                                    ca.style.backfaceVisibility = "hidden", ca.style.transition = "none", ca.style.transform = "translate3d(0, 0, 0)", ca.style.opacity = "1");
                                "CC" === Y && (ka.style.transformOrigin = "center center", ca && (ca.style.transformOrigin = "center center"));
                                P = U.querySelectorAll(".domquery-alert-close-btn, .alert-cancel-btn, .alert-confirm-btn, .alert-prev-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn");
                                let Q = null;
                                0 < P.length && (Q = P[0].parentElement, !Q || ka.contains(Q) || ca && ca.contains(Q) || (Q.style.willChange = "transform, opacity",
                                    Q.style.backfaceVisibility = "hidden", Q.style.transition = "none", Q.style.transform = "translate3d(0, 0, 0)", Q.style.opacity = "1"));
                                ka.offsetHeight;
                                ca && ca.offsetHeight;
                                const J = .5 * za,
                                    ra = .5 * za;
                                requestAnimationFrame(() => {
                                    const pa = performance.now(),
                                        qa = Aa => {
                                            Aa = Math.min((Aa - pa) / J, 1);
                                            const Ba = 1 - Math.pow(1 - Aa, 3);
                                            ka.style.transform = L(Y, Ba, !0);
                                            ka.style.opacity = String(1 - Ba);
                                            ca && (ca.style.transform = L(Y, Ba, !0), ca.style.opacity = String(1 - Ba));
                                            Q && (Q.style.transform = L(Y, Ba, !0), Q.style.opacity = String(1 - Ba));
                                            if (1 > Aa) requestAnimationFrame(qa);
                                            else {
                                                Ja(ha, W, O);
                                                Aa = U.querySelectorAll(".domquery-alert-close-btn, .alert-cancel-btn, .alert-confirm-btn, .alert-prev-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn");
                                                let xa = null;
                                                0 < Aa.length && (xa = Aa[0].parentElement, Ka(xa, !1), !xa || ka.contains(xa) || ca && ca.contains(xa) || (xa.style.willChange = "transform, opacity", xa.style.backfaceVisibility = "hidden", xa.style.transition = "none", xa.style.transform = L(Y, 0, !1), xa.style.opacity = "0"));
                                                ka.style.transform = L(Y, 0, !1);
                                                ka.style.opacity = "0";
                                                ca && (ca.style.transform =
                                                    L(Y, 0, !1), ca.style.opacity = "0");
                                                oa(U, A, da || X, R || C);
                                                ka.offsetHeight;
                                                ca && ca.offsetHeight;
                                                requestAnimationFrame(() => {
                                                    if (fa) {
                                                        const Ga = parseFloat(aa);
                                                        var Ma = parseFloat(la),
                                                            Na = da,
                                                            La = R,
                                                            Ia = !1;
                                                        "auto" === R && (La = U.style.height, U.style.height = "auto", Ia = U.offsetHeight, U.style.height = La || Ma + "px", La = Ia + "px", Ia = !0);
                                                        "auto" === da && (Ma = U.style.width, U.style.width = "auto", Na = U.offsetWidth, U.style.width = Ma || Ga + "px", Na += "px", Ia = !0);
                                                        U.style.transition = `width ${ra}ms ease-out, height ${ra}ms ease-out`;
                                                        U.offsetWidth;
                                                        da !== X &&
                                                            (U.style.width = Na);
                                                        R !== C && (U.style.height = La);
                                                        Ia && setTimeout(() => {
                                                            "auto" === da && (U.style.width = "auto");
                                                            "auto" === R && (U.style.height = "auto");
                                                            U.style.transition = ""
                                                        }, ra)
                                                    }
                                                    U.offsetHeight;
                                                    const Pa = performance.now(),
                                                        Oa = Ga => {
                                                            Ga = Math.min((Ga - Pa) / ra, 1);
                                                            const Ha = 1 - Math.pow(1 - Ga, 3);
                                                            ka.style.transform = L(Y, Ha, !1);
                                                            ka.style.opacity = String(Ha);
                                                            ca && (ca.style.transform = L(Y, Ha, !1), ca.style.opacity = String(Ha));
                                                            xa && (xa.style.transform = L(Y, Ha, !1), xa.style.opacity = String(Ha));
                                                            1 > Ga ? requestAnimationFrame(Oa) : (ka.style.willChange =
                                                                "auto", ka.style.backfaceVisibility = "", ka.style.transition = "", ka.style.transform = "", ka.style.opacity = "", "CC" === Y && (ka.style.transformOrigin = ""), ca && (ca.style.willChange = "auto", ca.style.backfaceVisibility = "", ca.style.transition = "", ca.style.transform = "", ca.style.opacity = "", "CC" === Y && (ca.style.transformOrigin = "")), Q && (Q.style.willChange = "auto", Q.style.backfaceVisibility = "", Q.style.transition = "", Q.style.transform = "", Q.style.opacity = ""), xa && (xa.style.willChange = "auto", xa.style.backfaceVisibility = "", xa.style.transition =
                                                                    "", xa.style.transform = "", xa.style.opacity = ""), fa && (U.style.transition = ""), "function" === typeof w && w(this))
                                                        };
                                                    requestAnimationFrame(Oa)
                                                })
                                            }
                                        };
                                    requestAnimationFrame(qa)
                                })
                            } else fa && (da !== X && (U.style.width = da), R !== C && (U.style.height = R)), oa(U, A, da || X, R || C), Ja(ha, W, O), za = U.querySelectorAll(".domquery-alert-close-btn, .alert-cancel-btn, .alert-confirm-btn, .alert-prev-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn"), 0 < za.length && Ka(za[0].parentElement, !1), "function" === typeof w && w(this)
                        } else "function" ===
                            typeof w && w(this)
                    }, 0) : "function" === typeof V && V(Error("Current alert box not found"))
                } else "function" === typeof V && V(Error(`Next options not found for key: ${e}`))
            }
        });
        const ia = !Object.entries(a).some(([n, d]) => "CC TC LC RC BC TL TR BL BR".split(" ").includes(n) && void 0 !== d);
        let wa;
        if (ia && q) {
            y = y();
            r = y.getBoundingClientRect();
            let n = q.clientX,
                d = q.clientY,
                c, e;
            if ("_self" === a.parent) {
                if (r = a._parentAlert || (() => {
                        const p = Array.from(document.querySelectorAll(".domquery-alert"));
                        for (let w = p.length - 1; 0 <= w; w--)
                            if (p[w].getAttribute("data-instance-id") !==
                                a.instanceId) return p[w];
                        return null
                    })()) r = r.getBoundingClientRect(), n = q ? q.clientX : r.left + r.width / 2, d = q ? q.clientY : r.top + r.height / 2;
                c = h.innerWidth / 2;
                e = h.innerHeight / 2;
                b.style.position = "fixed"
            } else y !== document.body ? (b.style.position = "absolute", n -= r.left, d -= r.top, c = r.width / 2, e = r.height / 2) : (c = h.innerWidth / 2, e = h.innerHeight / 2, b.style.position = "fixed");
            b.style.left = n + "px";
            b.style.top = d + "px";
            b.style.transform = "translate(-50%, -50%) scale(0)";
            b.style.opacity = String("number" === typeof a.opacity ? a.opacity :
                1);
            y.appendChild(b);
            const m = performance.now(),
                k = p => {
                    p = Math.min((p - m) / l, 1);
                    if (a.easing) {
                        [w] = a.easing.split(",").map(K => K.trim());
                        var w = $._anieasing(0, 1, p, w)
                    } else w = p;
                    const V = d + (e - d) * w,
                        Y = "number" === typeof a.opacity ? a.opacity : 1;
                    b.style.left = n + (c - n) * w + "px";
                    b.style.top = V + "px";
                    b.style.transform = `translate(-50%, -50%) scale(${w})`;
                    b.style.opacity = String(Y + (1 - Y) * w);
                    if (1 > p) requestAnimationFrame(k);
                    else if (G = !1, b.style.opacity = 1, a.onOpen && "function" === typeof a.onOpen) {
                        p = createAlertContext(null, [], "open");
                        a.onOpen.call(p,
                            b);
                        if (!0 === a.scrollY || !0 === a.forceScroll)
                            if (p = D.getElement(b, ".alert-scroll-wrapper")) p.style.overflow = "hidden auto", p.style.webkitOverflowScrolling = "touch", p.style.touchAction = "pan-y", b.querySelectorAll('[id="chat-output"], [style*="overflow-y:auto"]').forEach(K => {
                                K.style.overflow = "auto";
                                K.style.overflowY = "auto";
                                K.style.webkitOverflowScrolling = "touch";
                                K.style.touchAction = "pan-y"
                            });
                        if (!0 === a.noScrollRestore) {
                            const K = D.getElement(b, ".alert-scroll-wrapper") || D.getElement(b, ".domquery-alert-body");
                            if (K) {
                                K.scrollTop =
                                    0;
                                p = (a && "number" === typeof a.openSpeed ? a.openSpeed : l) || 500;
                                let A = !1;
                                const ea = () => {
                                    A || (K.scrollTop = 0, requestAnimationFrame(ea))
                                };
                                requestAnimationFrame(ea);
                                setTimeout(() => {
                                    A = !0
                                }, p + 50)
                            }
                        }
                        if (a.autoscroll && !1 !== a.autoscroll) {
                            const K = a._autoscrollId || a.id || "default-scroll-position",
                                A = "number" === typeof a.autoscroll ? a.autoscroll : 300;
                            setTimeout(() => {
                                S(K, b, A)
                            }, animationDuration + 100)
                        }
                    }
                };
            requestAnimationFrame(k);
            wa = {
                finalTransform: "translate(-50%, -50%)"
            }
        } else wa = $.scaleArr(b, a, l), b.style.opacity = 1, M.setTimeoutRAF(() => {
            if (a.onOpen && "function" === typeof a.onOpen) {
                var n = createAlertContext(null, [], "open");
                a.onOpen.call(n, b);
                if (!0 === a.scrollY || !0 === a.forceScroll)
                    if (n = D.getElement(b, ".alert-scroll-wrapper")) n.style.overflow = "hidden auto", n.style.webkitOverflowScrolling = "touch", n.style.touchAction = "pan-y", b.querySelectorAll('[id="chat-output"], [style*="overflow-y:auto"]').forEach(d => {
                        d.style.overflow = "auto";
                        d.style.overflowY = "auto";
                        d.style.webkitOverflowScrolling = "touch";
                        d.style.touchAction = "pan-y"
                    });
                if (!0 === a.noScrollRestore) {
                    const d =
                        D.getElement(b, ".alert-scroll-wrapper") || D.getElement(b, ".domquery-alert-body");
                    if (d) {
                        d.scrollTop = 0;
                        n = (a && "number" === typeof a.openSpeed ? a.openSpeed : l) || 500;
                        let c = !1;
                        const e = () => {
                            c || (d.scrollTop = 0, requestAnimationFrame(e))
                        };
                        requestAnimationFrame(e);
                        setTimeout(() => {
                            c = !0
                        }, n + 50)
                    }
                }
                if (a.autoscroll && !1 !== a.autoscroll) {
                    const d = a._autoscrollId || a.id || "default-scroll-position",
                        c = "number" === typeof a.autoscroll ? a.autoscroll : 300;
                    setTimeout(() => {
                            S(d, b, c)
                        }, ((a && "number" === typeof a.openSpeed ? a.openSpeed : l) || 500) +
                        50)
                }
            }
        }, 0), M.setTimeoutRAF(() => {
            G = !1
        }, l);
        a.loading && (y = b.querySelector(".domquery-alert-loading")) && (y.style.display = "flex");
        a.TOPS && (y = {
            button: null,
            scrollListener: null,
            create: function() {
                let n = a.TOPS;
                if ("string" === typeof a.TOPS && a.TOPS.startsWith("#")) {
                    const c = document.querySelector(a.TOPS);
                    c && (n = c.innerHTML)
                } else !0 === a.TOPS && (n = '\n\t\t\t\t\t   <div class="domquery-tops-icon" style="\n\t\t\t\t\t\t  width: 40px;\n\t\t\t\t\t\t  height: 40px;\n\t\t\t\t\t\t  background-color: transparent;\n\t\t\t\t\t\t  border-radius: 50%;\n\t\t\t\t\t\t  display: flex;\n\t\t\t\t\t\t  justify-content: center;\n\t\t\t\t\t\t  align-items: center;\n\t\t\t\t\t\t  border: 2px solid rgba(150, 150, 150, 0.5);\n\t\t\t\t\t\t  transition: all 0.3s ease;\n\t\t\t\t\t   ">\n\t\t\t\t\t\t  <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(100, 100, 100, 0.8)">\n\t\t\t\t\t\t\t <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>\n\t\t\t\t\t\t  </svg>\n\t\t\t\t\t   </div>\n\t\t\t\t\t');
                "static" === getComputedStyle(b).position && (b.style.position = "relative");
                this.button = document.createElement("div");
                this.button.className = "domquery-tops-button";
                this.button.setAttribute("data-instance-id", B);
                this.button.innerHTML = n;
                this.button.style.cssText = `\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\tbottom: 15px;\n\t\t\t\t\tright: ${F?"15px":"35px"};\n\t\t\t\t\topacity: 0;\n\t\t\t\t\ttransform: scale(0.7);\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\tz-index: 9999;\n\t\t\t\t\ttransition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);\n\t\t\t\t `;
                F;
                this.button.addEventListener("mouseenter", () => {
                    var c = this.button.querySelector(".domquery-tops-icon");
                    c && (c.style.backgroundColor = "rgba(50, 50, 50, 0.8)", c.style.border = "2px solid rgba(70, 70, 70, 0.9)", c.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.5)", c.style.transform = "scale(1.1)", (c = c.querySelector("svg")) && c.setAttribute("fill", "rgba(230, 230, 230, 0.9)"))
                });
                this.button.addEventListener("mouseleave", () => {
                    var c = D.getElement(this.button, ".domquery-tops-icon");
                    c && (c.style.backgroundColor = "transparent",
                        c.style.border = "2px solid rgba(150, 150, 150, 0.5)", c.style.boxShadow = "none", c.style.transform = "scale(1)", (c = D.getElement(c, "svg")) && c.setAttribute("fill", "rgba(100, 100, 100, 0.8)"))
                });
                b.appendChild(this.button);
                const d = D.getElement(b, ".alert-scroll-wrapper") || D.getElement(b, ".domquery-alert-body") || b.querySelector('div[style*="overflow: auto"]') || b;
                this.scrollListener = () => {
                    const c = d.scrollTop,
                        e = d.clientHeight,
                        m = d.scrollHeight;
                    m > e ? .1 < c / (m - e) ? (this.button.style.opacity = "1", this.button.style.transform =
                        "scale(1)") : (this.button.style.opacity = "0", this.button.style.transform = "scale(0.7)") : (this.button.style.opacity = "0", this.button.style.transform = "scale(0.7)")
                };
                d.addEventListener("scroll", this.scrollListener, {
                    passive: !0
                });
                this.scrollListener();
                this.button.addEventListener("click", () => {
                    d.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                });
                this.button.addEventListener("touchend", c => {
                    c.preventDefault();
                    d.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }, {
                    passive: !1
                })
            },
            cleanup: function() {
                const n = D.getElement(b, ".alert-scroll-wrapper") ||
                    D.getElement(b, ".domquery-alert-body") || b.querySelector('div[style*="overflow: auto"]') || b;
                this.scrollListener && n.removeEventListener("scroll", this.scrollListener, {
                    passive: !0
                });
                this.button && this.button.parentNode && this.button.parentNode.removeChild(this.button)
            }
        }, y.create(), b.topsManager = y);
        const sa = (n, d = !1, c, e = "default") => {
            if (G && (!d || "function" !== e)) return Promise.resolve();
            G = !0;
            z.closingAlerts.add(B);
            b && (D.clearParentCache(b), D.invalidateDocument(".domquery-alert"));
            if ("_blank" === a.parent) {
                1 < Array.from(document.querySelectorAll(".domquery-alert")).length ||
                    (document.body.style.overflow = "", document.documentElement.style.overflow = "", !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                        isIOS: !1
                    }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, parseInt(scrollY || "0"))));
                try {
                    const w = a.instanceId;
                    var m = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${w}"]`);
                    m && m.parentNode && m.setAttribute("data-related-alert", w);
                    const V = document.querySelector(`.domquery-blank-iframe[data-instance-id="${w}"]`);
                    if (V && V.parentNode) {
                        try {
                            V.contentWindow && (V.contentWindow._alertInstance = null, V.contentWindow._alertOptions = null, V.contentDocument && (V.contentDocument.body.innerHTML = ""))
                        } catch (K) {}
                        V.parentNode.removeChild(V)
                    }
                    const Y = document.querySelectorAll(".domquery-blank-container");
                    if (0 < Y.length) {
                        const K = Array.from(Y).sort((ea, U) => {
                            ea = parseInt(window.getComputedStyle(ea).zIndex || 0);
                            return parseInt(window.getComputedStyle(U).zIndex || 0) - ea
                        });
                        0 < K.length && parseInt(window.getComputedStyle(K[0]).zIndex || 0);
                        let A =
                            0;
                        K.forEach(ea => {
                            const U = ea.getAttribute("data-instance-id");
                            if (U !== w) {
                                var za = parseInt(window.getComputedStyle(ea).zIndex || 0);
                                U && (ea = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${U}"]`)) && (za -= 20, ea.style.zIndex = za.toString(), ea.setAttribute("data-related-container", U), za > A && (A = za))
                            }
                        })
                    }
                } catch (w) {}
            }
            z.observers && z.observers[a.instanceId] && (z.observers[a.instanceId].disconnect(), delete z.observers[a.instanceId]);
            h.alertScrollHandlers && h.alertScrollHandlers[a.instanceId] && (m = h.alertScrollHandlers[a.instanceId],
                m.element && m.handler && m.element.removeEventListener("scroll", m.handler), delete h.alertScrollHandlers[a.instanceId]);
            h.alertScrollStyles && h.alertScrollStyles[a.instanceId] && (document.head.removeChild(h.alertScrollStyles[a.instanceId]), delete h.alertScrollStyles[a.instanceId]);
            $.AlertScrollManager.isUserScrolling[a.instanceId] && delete $.AlertScrollManager.isUserScrolling[a.instanceId];
            $.AlertScrollManager.lastScrollTime[a.instanceId] && delete $.AlertScrollManager.lastScrollTime[a.instanceId];
            $.AlertScrollManager.scrollStates[a.instanceId] &&
                delete $.AlertScrollManager.scrollStates[a.instanceId];
            a.autoscroll && !1 !== a.autoscroll && ($.AlertScrollManager.savePosition(a._autoscrollId || a.id || "default-scroll-position", b), b.scrollListener && b.scrollElements && (b.scrollElements.forEach(w => {
                w.removeEventListener("scroll", b.scrollListener)
            }), delete b.scrollListener, delete b.scrollElements));
            try {
                a.instanceId && document.querySelectorAll(`.virtual-input-layer[data-alert-id="${a.instanceId}"]`).forEach(w => {
                    w && w.parentNode && w.parentNode.removeChild(w)
                });
                var k = document.querySelectorAll(".virtual-input-layer");
                0 < k.length && k.forEach(w => {
                    w && w.parentNode && w.parentNode.removeChild(w)
                });
                Array.from(document.body.children).forEach(w => {
                    w.className && w.className.includes("virtual-input-layer") && document.body.removeChild(w)
                })
            } catch (w) {}
            b.timeoutId && (clearTimeout(b.timeoutId), b.timeoutId = null);
            if (k = b.querySelector(".domquery-alert-loading")) k.style.display = "none";
            const p = c || a && a._closeSpeed || l;
            return new Promise(w => {
                let V = !1;
                const Y = W => {
                        V || null === n || "function" !==
                            typeof g || (V = !0, setTimeout(() => {
                                z.callbackExecuting = !0;
                                try {
                                    g(n, W)
                                } finally {
                                    z.callbackExecuting = !1
                                }
                            }, 0))
                    },
                    K = W => {
                        try {
                            ja.cleanupOnClose(B, b, a, W)
                        } catch (O) {}
                        z.closingAlerts.delete(B)
                    };
                if (!d && n && a.text && "function" === typeof a.function) {
                    var A = Array.from(b.querySelectorAll("input, textarea, select"));
                    const W = [],
                        O = {},
                        I = new Set,
                        oa = new Map,
                        aa = new Map;
                    A.forEach(C => {
                        var da = C.type;
                        "checkbox" === da ? (da = C.name || "checkbox", oa.has(da) || oa.set(da, []), C.checked && oa.get(da).push(C.value || "true")) : "radio" === da && C.checked &&
                            (da = C.name || "radio", aa.has(da) || aa.set(da, C.value || "true"))
                    });
                    A.forEach(C => {
                        const da = C.type;
                        var R = C.tagName.toLowerCase();
                        if ("checkbox" === da) C = C.name || "checkbox", R = `checkbox_${C}`, I.has(R) || (C = oa.get(C) || [], 0 < C.length && (W.push(C), O.checkbox = C), I.add(R));
                        else if ("radio" === da) {
                            if (C = C.name || "radio", R = `radio_${C}`, !I.has(R)) {
                                if (C = aa.get(C)) W.push(C), O.radio = C;
                                I.add(R)
                            }
                        } else "select" === R ? W.push(C.value) : (C = C.value.replace(/[`'"]/g, ""), C = W.push(C) - 1, "textarea" === R && (O.textarea = C))
                    });
                    for (var ea in O) W[ea] =
                        "textarea" === ea && "number" === typeof O[ea] ? W[O[ea]] : O[ea];
                    this.totalResults || (this.totalResults = []);
                    const la = createAlertContext(n, this.totalResults, "function");
                    la._closeWasCalled = !1;
                    A = h.$closeAlert;
                    let X;
                    if ("_self" === a.parent || "_blank" === a.parent) X = () => {
                        la._closeWasCalled = !0;
                        M.setTimeoutRAF(() => {
                            const C = D.getElement(b, ".domquery-close-x-btn") || D.getElement(b, ".domquery-alert-close-btn");
                            if (C) C.click();
                            else try {
                                sa("xclose", !0, 0, "force_close")
                            } catch (da) {}
                        }, 0);
                        return !0
                    }, h.$closeAlert = function(...C) {
                        return X()
                    };
                    la._functionCallbackExecuting = !0;
                    a.function.call(la, W);
                    la._functionCallbackExecuting = !1;
                    h.$closeAlert = A;
                    if (la._closeWasCalled) return sa(la._closeTypeParam || "close", !0, 0, "function");
                    G = !1;
                    z.closingAlerts.delete(B);
                    return Promise.resolve()
                }
                const U = a.toast ? ".domquery-toast-overlay" : ".domquery-shadow-overlay",
                    za = `${U}[data-instance-id="${a.instanceId}"]`,
                    P = "TC LC RC BC TL TR BL BR".split(" ").find(W => void 0 !== a[W]),
                    ka = P && !1 === a[P];
                let ca;
                if (a.easing) {
                    const [W, O] = a.easing.split(",").map(I => I.trim());
                    ca =
                        O || W
                }
                const Ja = performance.now(),
                    Ka = () => {
                        const W = document.createElement("div");
                        W.style.position = "fixed";
                        W.style.zIndex = a.zindex;
                        const O = b.offsetWidth,
                            I = b.offsetHeight;
                        W.style.width = O + "px";
                        W.style.height = I + "px";
                        W.style.left = "50%";
                        W.style.top = "50%";
                        W.style.transform = "translate(-50%, -50%)";
                        W.style.pointerEvents = "none";
                        const oa = b.parentNode;
                        oa && oa.insertBefore(W, b);
                        W.appendChild(b);
                        b.style.position = "relative";
                        b.style.left = "50%";
                        b.style.top = "50%";
                        b.style.width = O + "px";
                        b.style.height = I + "px";
                        return W
                    };
                F &&
                    (document.body.style.overflow = "", document.documentElement.style.overflow = "", document.removeEventListener("touchmove", E));
                if (!0 === a.fastMode) {
                    A = document.querySelector(`${U}[data-instance-id="${B}"]`);
                    if (a.easing) {
                        const [O, I] = a.easing.split(",").map(oa => oa.trim());
                        ea = I || O
                    } else ea = "ease-out";
                    const W = function(O) {
                        switch (O) {
                            case "linear":
                                return "linear";
                            case "easeOutQuint":
                                return "cubic-bezier(0.22, 1, 0.36, 1)";
                            case "easeInOutQuint":
                                return "cubic-bezier(0.83, 0, 0.17, 1)";
                            case "easeInQuint":
                                return "cubic-bezier(0.64, 0, 0.78, 0)";
                            default:
                                return "ease-out"
                        }
                    }(ea);
                    !0 === a.hide && b.querySelectorAll(".domquery-alert-body, .domquery-text-container, .domquery-text-bottom-container, .domquery-alert-close-btn, .alert-scroll-wrapper > div").forEach(O => {
                        O && (O.style.transition = `opacity ${p/2}ms ${W}`, O.style.opacity = "0")
                    });
                    A && (A.style.transition = `opacity ${p}ms ${W}`, A.style.opacity = "0");
                    A = void 0 !== a.CC;
                    if (ka)
                        if (["TL", "TR", "BL", "BR"].includes(P)) {
                            ea = P.endsWith("L") ? "left" : "right";
                            var ha = P.startsWith("T") ? "top" : "bottom";
                            ea = `translate(${"right"===
ea?100:-100}%, ${"bottom"===ha?100:-100}%)`
                        } else ea = ["LC", "RC"].includes(P) ? `translate(${"LC"===P?-100:100}%, -50%)` : ["TC", "BC"].includes(P) ? `translate(-50%, ${"TC"===P?-100:100}%)` : A ? "translate(-50%, -50%) scale(0.8)" : "scale(0.8)";
                    else ea = A ? "translate(-50%, -50%) scale(0.8)" : "scale(0.8)";
                    b.style.willChange = "transform, opacity";
                    b.style.backfaceVisibility = "hidden";
                    if (ea.includes("scale")) {
                        ha = "center center";
                        if (P && !ka)
                            if ("BL" === P) ha = "left bottom";
                            else if ("BR" === P) ha = "right bottom";
                        else if ("TL" === P) ha =
                            "left top";
                        else if ("TR" === P) ha = "right top";
                        else if ("TC" === P) ha = "center top";
                        else if ("BC" === P) ha = "center bottom";
                        else if ("LC" === P) ha = "left center";
                        else if ("RC" === P) ha = "right center";
                        else if ("CC" === P || A) ha = "center center";
                        b.style.transformOrigin = ha
                    }
                    A = ea;
                    ea.includes("translate") && !ea.includes("translate3d") && (A = ea.replace(/translate\(([^)]+)\)/g, "translate3d($1, 0)"));
                    b.style.transition = `transform ${p}ms ${W}, opacity ${p}ms ${W}`;
                    b.style.opacity = "0";
                    b.style.transform = A;
                    M.setTimeoutRAF(() => {
                        b.style.willChange &&
                            (b.style.willChange = "auto", b.style.backfaceVisibility = "");
                        G = !1;
                        b._elementInfos && b._elementInfos.forEach(I => {
                            I.element && (I.element.style.display = "none" === I.originalDisplay ? "none" : I.originalDisplay, I.parent && (I.nextSibling ? I.parent.insertBefore(I.element, I.nextSibling) : I.parent.appendChild(I.element)))
                        });
                        b.wrapper && b.wrapper.parentNode && b.wrapper.parentNode.removeChild(b.wrapper);
                        var O = u.querySelector(za);
                        O && O.remove();
                        "_blank" === a.parent ? [`.domquery-shadow-overlay[data-connected-alert="${a.instanceId}"]`,
                            `.domquery-shadow-overlay[data-related-alert="${a.instanceId}"]`, `.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`, `.domquery-blank-overlay[data-instance-id="${a.instanceId}"]`, `.domquery-blank-overlay[data-connected-alert="${a.instanceId}"]`
                        ].forEach(I => {
                            document.querySelectorAll(I).forEach(oa => {
                                oa && oa.parentNode && oa.remove()
                            })
                        }) : (O = document.querySelector(za)) && O.remove();
                        if ("_blank" === a.parent && (document.querySelectorAll(`.domquery-alert[data-parent-instance-id="${B}"]`).forEach(I => {
                                const oa = I.getAttribute("data-instance-id");
                                if (oa && h.$closeAlert) try {
                                    const aa = I.querySelector(".domquery-close-x-btn") || I.querySelector(".domquery-alert-close-btn");
                                    if (aa) aa.click();
                                    else {
                                        I.parentNode && I.parentNode.removeChild(I);
                                        const la = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${oa}"]`);
                                        la && la.parentNode && la.parentNode.removeChild(la)
                                    }
                                } catch (aa) {
                                    I.parentNode && I.parentNode.removeChild(I)
                                }
                            }), (O = document.getElementById("domquery-blank-container-" + B)) && O.parentNode)) {
                            const I =
                                O.querySelector(".domquery-blank-iframe");
                            if (I) try {
                                I.contentWindow && (I.contentWindow._alertInstance = null, I.contentWindow._alertOptions = null, I.contentDocument && (I.contentDocument.body.innerHTML = ""))
                            } catch (oa) {}
                            O.parentNode.removeChild(O)
                        }
                        O = "true" === b.getAttribute("data-offout");
                        u !== document.body && void 0 !== u._originalOverflow && (u.style.overflow = u._originalOverflow, delete u._originalOverflow);
                        b && b.parentNode && b.parentNode.removeChild(b);
                        0 === document.querySelectorAll(".domquery-alert").length ? (b.wheelListener &&
                                (document.removeEventListener("wheel", b.wheelListener, {
                                    passive: !1
                                }), delete b.wheelListener), !1 === a.retainScroll ? (document.body.style.overflow = "", document.documentElement.style.overflow = "", void 0 !== document.body._originalOverflowX && (document.body.style.overflowX = document.body._originalOverflowX, document.documentElement.style.overflowX = document.documentElement._originalOverflowX, delete document.body._originalOverflowX, delete document.documentElement._originalOverflowX)) : O && a.History || (document.body.style.overflow =
                                    "", document.documentElement.style.overflow = "", void 0 !== document.body._originalOverflowX && (document.body.style.overflowX = document.body._originalOverflowX, document.documentElement.style.overflowX = document.documentElement._originalOverflowX, delete document.body._originalOverflowX, delete document.documentElement._originalOverflowX), !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                        isIOS: !1
                                    }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = ""))) : b.wheelListener &&
                            (document.removeEventListener("wheel", b.wheelListener, {
                                passive: !1
                            }), delete b.wheelListener);
                        a.onClose && "function" === typeof a.onClose && (O = createAlertContext(n, this.totalResults, e), a.onClose.call(O), 1 >= document.querySelectorAll(".domquery-alert").length && !1 !== a.retainScroll && (document.body.style.overflow = "", document.documentElement.style.overflow = ""));
                        Y(e);
                        K(e);
                        w()
                    }, p + 20)
                } else {
                    const W = function(O) {
                        const I = document.querySelector(`${U}[data-instance-id="${B}"]`),
                            oa = I ? parseFloat(h.getComputedStyle(I).opacity) :
                            0,
                            aa = "number" === typeof a.opacity ? a.opacity : 1;
                        let la;
                        if (a.easing) {
                            const [X, C] = a.easing.split(",").map(da => da.trim());
                            la = C || X
                        }!0 === a.hide && b.querySelectorAll(".domquery-alert-body, .domquery-text-container, .domquery-text-bottom-container, .domquery-alert-close-btn, .alert-scroll-wrapper > div").forEach(X => {
                            X && (X.style.transition = "opacity 0.3s ease", X.style.opacity = "1")
                        });
                        return function(X) {
                            var C = X - Ja;
                            X = Math.min(C / p, 1);
                            if (!0 === a.hide) {
                                var da = b.querySelectorAll(".domquery-alert-body, .domquery-text-container, .domquery-text-bottom-container, .domquery-alert-close-btn, .alert-scroll-wrapper > div");
                                const J = Math.max(0, 1 - 2 * X);
                                da.forEach(ra => {
                                    ra && (ra.style.opacity = J.toString())
                                })
                            }
                            if (ka)
                                if (da = $._anieasing(0, 1, X, la), ["TL", "TR", "BL", "BR"].includes(P)) {
                                    var R = P.endsWith("L") ? "left" : "right";
                                    var fa = P.startsWith("T") ? "top" : "bottom";
                                    R = "right" === R ? 100 : -100;
                                    fa = "bottom" === fa ? 100 : -100;
                                    if (1 > C) R = null;
                                    else {
                                        var L = $._anieasing(0, 1, Math.min((C - 1) / p, 1), la);
                                        R = `translate3d(${R*L}%, ${fa*L}%, 0)`
                                    }
                                    null !== R && 1 <= C && (1 <= C && !b._willChangeApplied && (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden",
                                        b._willChangeApplied = !0), b.style.transform = R);
                                    b.style.opacity = 1 - (1 - aa) * da
                                } else ["LC", "RC"].includes(P) ? (R = "LC" === P ? -100 : 100, 1 > C ? R = null : (fa = $._anieasing(0, 1, Math.min((C - 1) / p, 1), la), R = `translate3d(${R*fa}%, -50%, 0)`), null !== R && 1 <= C && (1 <= C && !b._willChangeApplied && (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden", b._willChangeApplied = !0), b.style.transform = R), b.style.opacity = 1 - (1 - aa) * da) : ["TC", "BC"].includes(P) && (R = "TC" === P ? -100 : 100, 1 > C ? R = null : (fa = $._anieasing(0, 1, Math.min((C -
                                    1) / p, 1), la), R = `translate3d(-50%, ${R*fa}%, 0)`), null !== R && 1 <= C && (1 <= C && !b._willChangeApplied && (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden", b._willChangeApplied = !0), b.style.transform = R), b.style.opacity = 1 - (1 - aa) * da);
                            else if (ia && q)
                                if ("boxcenter" == ca) 1 > C || (C = $._anieasing(0, 1, Math.min((C - 1) / p, 1), la), b._willChangeApplied || (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden", b.style.transformOrigin = "center center", b._willChangeApplied = !0), b.style.transform =
                                    `translate3d(-50%, -50%, 0) scale(${1-C})`, b.style.opacity = Math.max(0, 1 - C));
                                else {
                                    C = $._anieasing(0, 1, X, la);
                                    da = null;
                                    if ("_self" === a.parent)
                                        for (R = Array.from(document.querySelectorAll(".domquery-alert")), fa = R.length - 1; 0 <= fa; fa--)
                                            if (R[fa].getAttribute("data-instance-id") !== a.instanceId) {
                                                da = R[fa];
                                                break
                                            } R = q.clientX;
                                    fa = q.clientY;
                                    if (da) {
                                        var Q = da.getBoundingClientRect();
                                        R = q.clientX - Q.left;
                                        fa = q.clientY - Q.top;
                                        L = Q.width / 2;
                                        Q = Q.height / 2
                                    } else L = h.innerWidth / 2, Q = h.innerHeight / 2;
                                    b.wrapper || (b.wrapper = Ka());
                                    b.wrapper.style.position =
                                        da ? "absolute" : "fixed";
                                    b.wrapper.style.left = `${R+(L-R)*(1-C)}px`;
                                    b.wrapper.style.top = `${fa+(Q-fa)*(1-C)}px`;
                                    b.style.transition = "none";
                                    b._willChangeApplied || (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden", b.style.transformOrigin = "center center", b._willChangeApplied = !0);
                                    b.style.transform = `translate3d(-50%, -50%, 0) scale(${1-C})`;
                                    b.style.opacity = 1 - (1 - aa) * C
                                }
                            else {
                                da = $._anieasing(0, 1, X, la);
                                if (1 > C) R = null;
                                else {
                                    R = 1 - $._anieasing(0, 1, Math.min((C - 1) / p, 1), la);
                                    if (!b._willChangeApplied) {
                                        b.style.willChange =
                                            "transform, opacity";
                                        b.style.backfaceVisibility = "hidden";
                                        fa = "center center";
                                        if (P && !ka)
                                            if ("BL" === P) fa = "left bottom";
                                            else if ("BR" === P) fa = "right bottom";
                                        else if ("TL" === P) fa = "left top";
                                        else if ("TR" === P) fa = "right top";
                                        else if ("TC" === P) fa = "center top";
                                        else if ("BC" === P) fa = "center bottom";
                                        else if ("LC" === P) fa = "left center";
                                        else if ("RC" === P) fa = "right center";
                                        else if ("CC" === P || void 0 !== a.CC) fa = "center center";
                                        b.style.transformOrigin = fa;
                                        b._willChangeApplied = !0
                                    }
                                    void 0 !== a.CC ? R = `translate3d(-50%, -50%, 0) scale(${R})` :
                                        wa && wa.finalTransform ? (fa = wa.finalTransform, fa = fa.replace(/translate\(-50%,\s*-50%\)/g, "translate3d(-50%, -50%, 0)"), fa = fa.replace(/translate\(([^)]+)\)/g, "translate3d($1, 0)"), R = fa.replace("scale(1)", `scale(${R})`)) : R = `scale(${R})`
                                }
                                null !== R && 1 <= C && (b.style.transform = R);
                                b.style.opacity = 1 - (1 - aa) * da
                            }
                            I && (I.style.opacity = oa * (1 - X));
                            if (1 > X) requestAnimationFrame(W);
                            else {
                                b._willChangeApplied && (b.style.willChange = "auto", b.style.backfaceVisibility = "", delete b._willChangeApplied);
                                G = !1;
                                K(e);
                                X = "true" === b.getAttribute("data-offout");
                                u !== document.body && void 0 !== u._originalOverflow && (u.style.overflow = u._originalOverflow, delete u._originalOverflow);
                                b && b.parentNode && b.parentNode.removeChild(b);
                                0 === document.querySelectorAll(".domquery-alert").length ? (b.wheelListener && (document.removeEventListener("wheel", b.wheelListener, {
                                    passive: !1
                                }), delete b.wheelListener), !1 === a.retainScroll ? (document.body.style.overflow = "", document.documentElement.style.overflow = "") : X && a.History || (document.body.style.overflow = "", document.documentElement.style.overflow =
                                    "", !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                        isIOS: !1
                                    }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, parseInt(scrollY || "0"))))) : b.wheelListener && (document.removeEventListener("wheel", b.wheelListener, {
                                    passive: !1
                                }), delete b.wheelListener);
                                b._elementInfos && b._elementInfos.forEach(J => {
                                    J.element && J.parent && (J.element.style.display = "none" === J.originalDisplay ? "none" : J.originalDisplay, J.nextSibling ? J.parent.insertBefore(J.element,
                                        J.nextSibling) : J.parent.appendChild(J.element))
                                });
                                b.wrapper && b.wrapper.parentNode && b.wrapper.parentNode.removeChild(b.wrapper);
                                (X = u.querySelector(za)) && X.remove();
                                "_blank" === a.parent ? [`.domquery-shadow-overlay[data-connected-alert="${a.instanceId}"]`, `.domquery-shadow-overlay[data-related-alert="${a.instanceId}"]`, `.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`, `.domquery-blank-overlay[data-instance-id="${a.instanceId}"]`, `.domquery-blank-overlay[data-connected-alert="${a.instanceId}"]`].forEach(J => {
                                    document.querySelectorAll(J).forEach(ra => {
                                        ra && ra.parentNode && ra.remove()
                                    })
                                }) : (X = document.querySelector(za)) && X.remove();
                                if ("_blank" === a.parent) {
                                    document.querySelectorAll(`.domquery-alert[data-parent-instance-id="${B}"]`).forEach(J => {
                                        const ra = J.getAttribute("data-instance-id");
                                        if (ra && h.$closeAlert) try {
                                            const pa = J.querySelector(".domquery-close-x-btn") || J.querySelector(".domquery-alert-close-btn");
                                            if (pa) pa.click();
                                            else {
                                                J.parentNode && J.parentNode.removeChild(J);
                                                const qa = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${ra}"]`);
                                                qa && qa.parentNode && qa.parentNode.removeChild(qa)
                                            }
                                        } catch (pa) {
                                            J.parentNode && J.parentNode.removeChild(J)
                                        }
                                    });
                                    if (X = document.getElementById("domquery-blank-container-" + B)) {
                                        if (C = X.querySelector(".domquery-blank-iframe")) try {
                                            C.contentWindow && (C.contentWindow._alertInstance = null, C.contentWindow._alertOptions = null, C.contentDocument && (C.contentDocument.body.innerHTML = ""))
                                        } catch (J) {}
                                        X.parentNode && X.parentNode.removeChild(X)
                                    } [`.domquery-shadow-overlay[data-connected-alert="${B}"]`, `.domquery-shadow-overlay[data-related-alert="${B}"]`,
                                        `.domquery-shadow-overlay[data-instance-id="${B}"]`, `.domquery-blank-overlay[data-instance-id="${B}"]`, `.domquery-blank-overlay[data-connected-alert="${B}"]`
                                    ].forEach(J => {
                                        document.querySelectorAll(J).forEach(ra => {
                                            ra && ra.parentNode && ra.remove()
                                        })
                                    });
                                    X = document.querySelectorAll(".domquery-blank-container");
                                    C = document.querySelectorAll(".domquery-alert");
                                    if (0 === X.length && 1 >= C.length) document.body.style.overflow = "", document.documentElement.style.overflow = "", !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                        isIOS: !1
                                    }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, parseInt(scrollY || "0")));
                                    else {
                                        const J = document.querySelectorAll(".domquery-alert");
                                        J.forEach(ra => {
                                            var pa = ra.getAttribute("data-instance-id");
                                            if (pa) {
                                                let qa = 9999;
                                                J.forEach(xa => {
                                                    xa !== ra && (xa = parseInt(window.getComputedStyle(xa).zIndex || 0), xa > qa && (qa = xa))
                                                });
                                                const Aa = qa + 2;
                                                ra.style.zIndex = Aa.toString();
                                                const Ba = document.querySelector(`.domquery-shadow-overlay[data-connected-alert="${pa}"]`) ||
                                                    document.querySelector(`.domquery-blank-overlay[data-instance-id="${pa}"]`) || document.querySelector(`.domquery-shadow-overlay[data-instance-id="${pa}"]`);
                                                Ba && (Ba.style.zIndex = (Aa - 1).toString());
                                                if (pa = document.getElementById("domquery-blank-container-" + pa)) pa.style.zIndex = (Aa - 2).toString()
                                            }
                                        })
                                    }
                                }
                                u !== document.body && void 0 !== u._originalOverflow && (u.style.overflow = u._originalOverflow, delete u._originalOverflow);
                                b && b.parentNode && b.parentNode.removeChild(b);
                                0 === document.querySelectorAll(".domquery-alert").length &&
                                    (!1 === a.retainScroll ? (document.body.style.overflow = "", document.documentElement.style.overflow = "") : (document.body.style.overflow = "", document.documentElement.style.overflow = "", !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                        isIOS: !1
                                    }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", b._scrollPosition && void 0 !== b._scrollPosition.y && window.scrollTo(0, b._scrollPosition.y))));
                                "swipe" === O && z.options[B]?.swipeCallback && "function" === typeof z.options[B].swipeCallback &&
                                    z.options[B].swipeCallback({
                                        direction: n,
                                        velocity: Fa || 0,
                                        timeElapsed: Ea || 0,
                                        instanceId: B,
                                        phase: "complete"
                                    });
                                a.onClose && "function" === typeof a.onClose && (X = createAlertContext(n, this.totalResults, O), a.onClose.call(X), 1 >= document.querySelectorAll(".domquery-alert").length && !1 !== a.retainScroll && (document.body.style.overflow = "", document.documentElement.style.overflow = ""));
                                Y(O);
                                K(O);
                                [`.domquery-shadow-overlay[data-instance-id="${B}"]`, `.domquery-blank-overlay[data-instance-id="${B}"]`, `.domquery-shadow-overlay[data-connected-alert="${B}"]`,
                                    `.domquery-blank-overlay[data-connected-alert="${B}"]`
                                ].forEach(J => {
                                    document.querySelectorAll(J).forEach(ra => {
                                        ra && ra.parentNode && ra.remove()
                                    })
                                });
                                w()
                            }
                        }
                    }(e);
                    requestAnimationFrame(W)
                }
            })
        };
        "_self" !== a.parent && document.body.appendChild(b);
        a.toast && (b.style.cssText += "overflow: hidden !important;", y = D.getElement(b, ".domquery-alert-body")) && (y.style.cssText += "overflow: hidden !important; text-overflow: ellipsis !important;");
        (y = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`)) &&
        y.parentNode && y.parentNode.removeChild(y);
        a.timeOut && "number" === typeof a.timeOut && 0 < a.timeOut && (b.timeoutId = M.setTimeoutRAF(() => {
            G || sa("timeout", !0, void 0, "timeout")
        }, a.timeOut));
        if (u !== document.body || "_self" === a.parent || !a.parent && u === document.body)
            if (u !== document.body && (b.style.position = "absolute", b.style.maxWidth = a.maxWidth ? processSize(a.maxWidth) : "100%", b.style.minWidth = a.minWidth ? processSize(a.minWidth) : "", b.style.maxHeight = a.maxHeight ? processSize(a.maxHeight) : "100%"), "_blank" === a.parent && b.style.setProperty("z-index",
                    (a.zindex || 2147483647).toString(), "important"), "_self" === a.parent || !a.parent && u === document.body) b.style.position = "fixed", a.zindex && (b.style.zIndex = a.zindex.toString()), "TC LC RC BC TL TR BL BR".split(" ").some(n => void 0 !== a[n]) && void 0 === a.CC ? void 0 !== a.TC ? (b.style.left = "50%", b.style.top = "0", b.style.transform = "translateX(-50%)") : void 0 !== a.BC ? (b.style.left = "50%", b.style.bottom = "0", b.style.transform = "translateX(-50%)") : void 0 !== a.LC ? (b.style.left = "0", b.style.top = "50%", b.style.transform = "translateY(-50%)") :
                void 0 !== a.RC ? (b.style.right = "0", b.style.top = "50%", b.style.transform = "translateY(-50%)") : void 0 !== a.TL ? (b.style.left = "0", b.style.top = "0", b.style.transform = "none") : void 0 !== a.TR ? (b.style.right = "0", b.style.top = "0", b.style.transform = "none") : void 0 !== a.BL ? (b.style.left = "0", b.style.bottom = "0", b.style.transform = "none") : void 0 !== a.BR && (b.style.right = "0", b.style.bottom = "0", b.style.transform = "none") : (b.style.left = "50%", b.style.top = "50%", b.style.transform = "translate(-50%, -50%)"), a.width && (b.style.width = a.width),
                a.height && (b.style.height = a.height), b.style.maxWidth = "100%", b.style.maxHeight = a.maxHeight ? processSize(a.maxHeight) : "100%";
        u !== document.body && !1 === a.BC && a.parent && "_self" !== a.parent && "_blank" !== a.parent && (u._originalOverflow || (u._originalOverflow = getComputedStyle(u).overflow), u.style.overflow = "hidden");
        u.appendChild(b);
        if (!1 !== a.background) {
            y = "_blank" === a.parent ? document.body : "_self" === a.parent ? b : a.parent || "body";
            if ("_blank" === a.parent) {
                a.overlayZindex || (a.overlayZindex = (a.zindex || 2147483647) - 1);
                let n =
                    null,
                    d = 0;
                document.querySelectorAll(".domquery-alert").forEach(c => {
                    if (c.getAttribute("data-instance-id") !== a.instanceId) {
                        const e = parseInt(window.getComputedStyle(c).zIndex || 0);
                        e > d && (d = e, n = c)
                    }
                });
                n && (a._parentAlert = n)
            }
            $.shadow(y, {
                bgcolor: a.background,
                alpha: a.alpha,
                zindex: a.overlayZindex || (a.toast ? a.toastZindex - 10 : a.zindex - 10),
                close: !1,
                overlayType: a.toast ? "toast" : "alert",
                instanceId: a.instanceId,
                parent: a.parent,
                preserveExisting: a.toast
            }, l);
            "_blank" === a.parent && (y = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`)) &&
                (y.style.zIndex = a.overlayZindex, y.style.position = "fixed", y.style.top = "0", y.style.left = "0", y.style.width = "100%", y.style.height = "100%", "_blank" === a.parent && (y.setAttribute("data-blank-container", "domquery-blank-container-" + a.instanceId), y.style.pointerEvents = !0 === a.close ? "auto" : "none", b.classList.add("domquery-blank-alert"), b.style.zIndex = a.zindex.toString(), y.classList.add("domquery-blank-overlay"), y.setAttribute("data-connected-alert", a.instanceId), b.setAttribute("data-connected-overlay", y.getAttribute("data-instance-id") ||
                    "")), y.style.pointerEvents = "auto", y.style.backgroundColor = "rgba(0, 0, 0, 0.5)")
        }
        y = `.domquery-${a.toast?"toast":"shadow"}-overlay[data-instance-id="${a.instanceId}"]`;
        let ma = null;
        "_blank" === a.parent ? ma = document.querySelector(y) : "_self" === a.parent ? (ma = u.querySelector(y)) || (ma = document.querySelector(y)) : ma = u.querySelector(y);
        if ("_blank" === a.parent && b && ma) {
            b.classList.add("domquery-blank-alert");
            ma.classList.add("domquery-blank-overlay");
            let n = 0;
            document.querySelectorAll(".domquery-blank-alert").forEach(d => {
                if (d !== b) {
                    const c = parseInt(window.getComputedStyle(d).zIndex || 0);
                    c > n && (n = c, parentAlert = d)
                }
            });
            y = 0 < n ? n + 2 : parseInt(b.style.zIndex || a.zindex || 0);
            b.style.zIndex = y.toString();
            ma.style.zIndex = (y - 1).toString();
            ma.setAttribute("data-connected-alert", a.instanceId);
            b.setAttribute("data-connected-overlay", ma.getAttribute("data-instance-id") || "");
            ma.style.pointerEvents = "auto";
            ma.style.backgroundColor || (ma.style.backgroundColor = "rgba(0, 0, 0, 0.5)");
            document.querySelectorAll(".domquery-blank-alert").forEach(d => {
                if (d !== b) {
                    var c = d.getAttribute("data-instance-id"),
                        e = d.getAttribute("data-connected-overlay");
                    c && (e = document.querySelector(`.domquery-blank-overlay[data-instance-id="${e}"]`)) && (c = parseInt(window.getComputedStyle(d).zIndex || 0), e = parseInt(window.getComputedStyle(e).zIndex || 0), c <= e && (d.style.zIndex = (e + 1).toString()))
                }
            })
        }
        if (ma)
            if (ma.style.pointerEvents = "auto", ma.style.backgroundColor || (ma.style.backgroundColor = "rgba(0, 0, 0, 0.5)"), a.close) ma.style.backgroundColor || (ma.style.backgroundColor = "rgba(0, 0, 0, 0.5)"),
                ma.addEventListener("click", n => {
                    n.preventDefault();
                    n.stopPropagation();
                    G || (n = Array.from(document.querySelectorAll(".domquery-alert")), n.findIndex(d => d.getAttribute("data-instance-id") === a.instanceId) === n.length - 1 && sa("xclose", !0, void 0, "overlay"))
                });
            else {
                let n = 0,
                    d = !1;
                ma.addEventListener("click", c => {
                    c.preventDefault();
                    c.stopPropagation();
                    if (!G && !d) {
                        c = ma.getAttribute("data-connected-alert") || ma.getAttribute("data-instance-id");
                        var e = document.querySelector(`.domquery-alert[data-instance-id="${c}"]`);
                        if (e) {
                            if (a.shadow) {
                                let m = 0,
                                    k = 120;
                                !0 === a.vibrate && (k = 30);
                                const p = () => {
                                    const w = 0 === m % 2 ? "1" : "0.2";
                                    e.style.boxShadow = `0 0 23px rgba(${a.shadow.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)?a.shadow.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).slice(1).map(V=>parseInt(V,16)).join(","):"red"===a.shadow?"255,0,0":"blue"===a.shadow?"0,0,255":"green"===a.shadow?"0,255,0":"pink"===a.shadow?"255,192,203":"purple"===a.shadow?"128,0,128":"cyan"===a.shadow?"0,255,255":"yellow"===a.shadow?"255,255,0":
"0,0,0"},${w})`;
                                    m++;
                                    10 > m ? setTimeout(p, k) : e.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"
                                };
                                p();
                                n = 20
                            }
                            if (!0 === a.vibrate) {
                                c = "CC TC LC RC BC TL TR BL BR".split(" ").some(w => void 0 !== a[w]);
                                const m = "TC LC RC BC TL TR BL BR".split(" ").find(w => void 0 !== a[w]);
                                if ("vibrate" in navigator) try {
                                    navigator.vibrate(l / 3)
                                } catch (w) {}
                                const k = e.style.transform,
                                    p = e.style.transition;
                                d = !0;
                                c ? ($.aBox(e, m), M.setTimeoutRAF(() => {
                                    e.style.transform = k;
                                    e.style.transition = p;
                                    d = !1
                                }, 300)) : (e.style.transition = "box-shadow 0s", e.style.boxShadow =
                                    "none", M.setTimeoutRAF(() => {
                                        $.aBox(e, m);
                                        M.setTimeoutRAF(() => {
                                            e.style.transform = k;
                                            e.style.transition = p;
                                            d = !1
                                        }, 300)
                                    }, n))
                            }
                        }
                    }
                })
            } a.buttonConfigs && a.buttonConfigs.forEach(n => {
            const d = b.querySelector(`.alert-${n.name}-btn`);
            d && d.addEventListener("click", () => {
                if (!G) {
                    f = x = H = 0;
                    v = !1;
                    na = 0;
                    Z = 1;
                    b.style.transition = "";
                    var c = document.querySelector(".domquery-shadow-overlay");
                    c && (c.style.transition = "");
                    c = createAlertContext(n.name, [], "button");
                    c.close = function(e = "xclose") {
                        return sa(e, !0, void 0, e)
                    };
                    "function" === typeof a[n.name] ?
                        a[n.name].call(c, n.name, "button") : sa(n.name, !0, void 0, n.name)
                }
            })
        });
        y = D.getElement(b, ".domquery-alert-close-btn");
        r = D.getElement(b, ".domquery-close-x-btn");
        y && y.addEventListener("click", () => {
            if (!G)
                if ("function" === typeof a.Ok) {
                    const n = createAlertContext("Ok", [], "button");
                    n.close = function(d = "xclose") {
                        return sa(d, !0, void 0, d)
                    };
                    a.Ok.call(n, "Ok", "button")
                } else sa("close", !1, void 0, "button")
        });
        r && (r.style.pointerEvents = "auto", r.addEventListener("click", n => {
            n.stopPropagation();
            G || sa("xclose", !0, void 0, "xbutton")
        }));
        b.style.cssText += "pointer-events: auto;";
        try {
            z.options && z.options[B] && (z.options[B].__closeFromHistory = function() {
                return sa("back", !0, void 0, "back")
            }), ja.register(B, b, a)
        } catch (n) {}
        if (y = D.getElement(b, ".alert-scroll-wrapper")) y.addEventListener("wheel", n => {
            a.unscroll && ($.AlertScrollManager.startUserScrolling(B), !0 !== a.unscroll && $.AlertScrollManager.checkScrollThreshold(B, b, a.unscroll), $.AlertScrollManager.endUserScrolling(B))
        }, {
            passive: !0
        }), y.addEventListener("touchmove", n => {
            a.unscroll && ($.AlertScrollManager.startUserScrolling(B),
                !0 !== a.unscroll && $.AlertScrollManager.checkScrollThreshold(B, b, a.unscroll), $.AlertScrollManager.endUserScrolling(B))
        }, {
            passive: !0
        }), !0 !== a.unscroll && !1 !== a.unscroll && (r = () => {
            $.AlertScrollManager.checkScrollThreshold(B, b, a.unscroll)
        }, y.addEventListener("scroll", r, {
            passive: !0
        }), h.alertScrollHandlers || (h.alertScrollHandlers = {}), h.alertScrollHandlers[B] = {
            element: y,
            handler: r
        }), a.unscroll && (a.hideScrollbar && (r = document.createElement("style"), r.textContent = "\n\t\t\t\t\t.alert-scroll-wrapper::-webkit-scrollbar {\n\t\t\t\t\t\tdisplay: none !important;\n\t\t\t\t\t\twidth: 0 !important;\n\t\t\t\t\t\theight: 0 !important;\n\t\t\t\t\t}\n\t\t\t\t",
            document.head.appendChild(r), h.alertScrollStyles || (h.alertScrollStyles = {}), h.alertScrollStyles[B] = r), setTimeout(() => {
            $.AlertScrollManager.scrollToBottom(B, b, !0)
        }, 100), r = new MutationObserver(n => {
            $.AlertScrollManager.scrollToBottom(B, b)
        }), y = y.querySelector("div") || y, r.observe(y, {
            childList: !0,
            subtree: !0,
            characterData: !0
        }), z.observers[B] = r);
        return b
    };
    $.alert = function(b, a = {}, l = 300, g) {
        if (z.callbackExecuting) return new Promise(r => {
            setTimeout(() => {
                const H = $.alert(b, a, l, g);
                H && "function" === typeof H.then ? H.then(r) :
                    r(H)
            }, 300)
        });
        "object" !== typeof b || null === b || Array.isArray(b) || void 0 === b.text && void 0 === b.width && void 0 === b.height && void 0 === b.title && void 0 === b.bgcolor && void 0 === b.color && void 0 === b.$Ok && void 0 === b.close && void 0 === b.xclose && void 0 === b.input && void 0 === b.prompt && void 0 === b.toast ? "number" === typeof a ? (g = l, l = a, a = {}) : "function" === typeof a ? (g = a, a = {}) : "function" === typeof l && (g = l, l = 300) : ("number" === typeof a ? ("function" === typeof l && (g = l), l = a, a = b) : "function" === typeof a ? (g = a, a = b) : a = "object" !== typeof a || null ===
            a || Array.isArray(a) ? b : Object.assign({}, b, a), b = "");
        (3 <= arguments.length || !a) && a && (delete a.openSpeed, delete a.closeSpeed);
        var q = a.parent,
            E = Error().stack || "",
            S = "undefined" !== typeof event && event.target instanceof Element && event.target.closest(".domquery-alert") || E.includes("onOpen") || E.includes("function") || "_self" === a.parent;
        E = Array.from(document.querySelectorAll(".domquery-alert"));
        E.filter(r => !r.contains(document.activeElement) && r !== document.activeElement);
        void 0 === q && 0 < E.length && (a.parent = "_self",
            a.preserveExisting = !0);
        if (!0 === a.autoscroll) {
            var B = ua(a.title || String(b));
            a._autoscrollId = `${a.id||"default-scroll-position"}-${B}`
        }
        if (S) a._originalParent = q;
        else {
            a._originalParent = q;
            q = "_self" === a.parent;
            S = a.parent instanceof Element || a.parent instanceof HTMLDocument;
            B = a.parent === window || a.parent === document.defaultView;
            if (!("_blank" === a.parent || q || S || B) && 0 < E.length) return null;
            if (a.parent === window || a.parent === document.defaultView) a.parent = "_blank"
        }
        E = !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
            isMobile: !1
        }).isMobile;
        if ((!0 === a.input || "string" === typeof a.input) && E) {
            const r = a.onOpen;
            a.onOpen = function(H) {
                r && r.call(this, H);
                const N = H.querySelectorAll(!0 === a.input ? 'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea' : a.input);
                H.querySelectorAll("select").forEach(x => {
                    x.classList.add("no-virtual-layer")
                });
                if (0 < N.length) {
                    const x = f => {
                        function t(c, e = 5) {
                            let m;
                            if (c.startsWith("#")) {
                                var k = c.substring(1);
                                3 === k.length ? (c = parseInt(k[0] +
                                    k[0], 16), m = parseInt(k[1] + k[1], 16), k = parseInt(k[2] + k[2], 16)) : (c = parseInt(k.substring(0, 2), 16), m = parseInt(k.substring(2, 4), 16), k = parseInt(k.substring(4, 6), 16))
                            } else if (c.startsWith("rgb"))
                                if ((k = c.match(/\d+/g)) && 3 <= k.length) c = parseInt(k[0]), m = parseInt(k[1]), k = parseInt(k[2]);
                                else return c;
                            else return c;
                            c = Math.min(255, Math.round(c * (100 + e) / 100));
                            m = Math.min(255, Math.round(m * (100 + e) / 100));
                            k = Math.min(255, Math.round(k * (100 + e) / 100));
                            return `#${c.toString(16).padStart(2,"0")}${m.toString(16).padStart(2,"0")}${k.toString(16).padStart(2,
"0")}`
                        }

                        function v(c) {
                            let e;
                            if (c.startsWith("#")) {
                                var m = c.substring(1);
                                3 === m.length ? (c = parseInt(m[0] + m[0], 16), e = parseInt(m[1] + m[1], 16), m = parseInt(m[2] + m[2], 16)) : (c = parseInt(m.substring(0, 2), 16), e = parseInt(m.substring(2, 4), 16), m = parseInt(m.substring(4, 6), 16))
                            } else return "#ffffff";
                            return 128 < (299 * c + 587 * e + 114 * m) / 1E3 ? "#000000" : "#ffffff"
                        }
                        if ("checkbox" !== f.type && "radio" !== f.type && "select" !== f.tagName.toLowerCase() && !f.classList.contains("no-virtual-layer")) {
                            document.querySelectorAll(".virtual-input-layer").forEach(c => {
                                c && c.parentNode && c.parentNode.removeChild(c)
                            });
                            document.querySelectorAll(".virtual-input-overlay").forEach(c => {
                                c && c.parentNode && c.parentNode.removeChild(c)
                            });
                            var T = f.value,
                                na = f.type,
                                va = f.placeholder,
                                Z = f.getAttribute("title"),
                                ba = f.getAttribute("titleColor"),
                                Ca = f.getAttribute("background"),
                                Da = f.getAttribute("color"),
                                ta = a.inputBgcolor || "#ffffff",
                                ya = a.inputColor || "#333333",
                                Fa = ba || ya;
                            ba = (c, e = 20) => {
                                let m;
                                if (c.startsWith("#")) {
                                    var k = c.substring(1);
                                    3 === k.length ? (c = parseInt(k[0] + k[0], 16), m = parseInt(k[1] +
                                        k[1], 16), k = parseInt(k[2] + k[2], 16)) : (c = parseInt(k.substring(0, 2), 16), m = parseInt(k.substring(2, 4), 16), k = parseInt(k.substring(4, 6), 16))
                                } else if (c.startsWith("rgb"))
                                    if ((k = c.match(/\d+/g)) && 3 <= k.length) c = parseInt(k[0]), m = parseInt(k[1]), k = parseInt(k[2]);
                                    else return c;
                                else return c;
                                c = Math.max(0, Math.round(c * (100 - e) / 100));
                                m = Math.max(0, Math.round(m * (100 - e) / 100));
                                k = Math.max(0, Math.round(k * (100 - e) / 100));
                                return `#${c.toString(16).padStart(2,"0")}${m.toString(16).padStart(2,"0")}${k.toString(16).padStart(2,"0")}`
                            };
                            var Ea = ba(ta),
                                ia = null;
                            !0 === a.inputOverlay && (ia = document.createElement("div"), ia.className = "virtual-input-overlay", ia.id = "virtual-input-overlay-" + Date.now(), ia.style.cssText = `\n\t\t\t\t\t\t\t\tposition: fixed;\n\t\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\t\t\theight: 100%;\n\t\t\t\t\t\t\t\tbackground-color: rgba(0, 0, 0, 0.5);\n\t\t\t\t\t\t\t\tz-index: ${parseInt(H.style.zIndex||9999)+2};\n\t\t\t\t\t\t\t\topacity: 0;\n\t\t\t\t\t\t\t\ttransition: opacity 0.3s ease;\n\t\t\t\t\t\t\t`,
                                document.body.appendChild(ia), setTimeout(() => {
                                    ia.style.opacity = "1"
                                }, 10));
                            var wa = document.createElement("div");
                            wa.className = "virtual-input-layer";
                            wa.id = "virtual-input-layer-" + Date.now();
                            wa.style.cssText = `\n\t\t\t\t\t\t\tposition: fixed;\n\t\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\t\tright: 0;\n\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\tbackground-color: ${ta};\n\t\t\t\t\t\t\tcolor: ${ya};\n\t\t\t\t\t\t\tpadding: ${a.inputPadding||"15px"};\n\t\t\t\t\t\t\tmargin: ${a.inputMargin||"0"};\n\t\t\t\t\t\t\tborder-radius: ${a.inputRadius||
"0"};\n\t\t\t\t\t\t\tbox-shadow: 0 2px 10px rgba(0,0,0,0.2);\n\t\t\t\t\t\t\tz-index: ${parseInt(H.style.zIndex||9999)+2};\n\t\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\t\tflex-direction: column;\n\t\t\t\t\t\t\t-webkit-tap-highlight-color: transparent;\n\t\t\t\t\t\t\ttouch-action: manipulation;\n\t\t\t\t\t\t\tfont-size: ${a.inputFontsize||"16px"};\n\t\t\t\t\t\t`;
                            if (Z) {
                                const c = document.createElement("div");
                                c.textContent = Z;
                                c.style.cssText = `\n\t\t\t\t\t\t\t\ttext-align: center;\n\t\t\t\t\t\t\t\tmargin-bottom: 15px;\n\t\t\t\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\t\t\t\tcolor: ${Fa};\n\t\t\t\t\t\t\t`;
                                wa.appendChild(c)
                            }
                            var sa = document.createElement("input");
                            sa.type = na || "text";
                            sa.value = T || "";
                            sa.placeholder = va || "";
                            sa.style.cssText = `\n\t\t\t\t\t\t\tmargin: 0 0 10px 0;\n\t\t\t\t\t\t\tpadding: 10px;\n\t\t\t\t\t\t\tborder: 1px solid ${ba(ta,10)};\n\t\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\t\tfont-size: 16px;\n\t\t\t\t\t\t\tbackground-color: ${Ca||("#ffffff"===ta?"#ffffff":t(ta,5))};\n\t\t\t\t\t\t\tcolor: ${Da||ya};\n\t\t\t\t\t\t\toutline: none;\n\t\t\t\t\t\t\tappearance: none;\n\t\t\t\t\t\t\t-webkit-appearance: none;\n\t\t\t\t\t\t`;
                            T = document.createElement("style");
                            ya = a.inputPlaceholder || ya;
                            T.textContent = `\n\t\t\t\t\t\t\t#${wa.id} input::placeholder {\n\t\t\t\t\t\t\t\tcolor: ${ya};\n\t\t\t\t\t\t\t\topacity: ${a.inputPlaceholder?1:.5};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t#${wa.id} input::-webkit-input-placeholder {\n\t\t\t\t\t\t\t\tcolor: ${ya};\n\t\t\t\t\t\t\t\topacity: ${a.inputPlaceholder?1:.5};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t#${wa.id} input::-moz-placeholder {\n\t\t\t\t\t\t\t\tcolor: ${ya};\n\t\t\t\t\t\t\t\topacity: ${a.inputPlaceholder?
1:.5};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t#${wa.id} input:-ms-input-placeholder {\n\t\t\t\t\t\t\t\tcolor: ${ya};\n\t\t\t\t\t\t\t\topacity: ${a.inputPlaceholder?1:.5};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t`;
                            document.head.appendChild(T);
                            var ma = document.createElement("button");
                            ma.textContent = a.inputConfirm || "Confirm";
                            ma.style.cssText = `\n\t\t\t\t\t\t\tpadding: 10px;\n\t\t\t\t\t\t\tbackground-color: ${a.OkBgcolor||Ea};\n\t\t\t\t\t\t\tcolor: ${a.OkColor||v(Ea)};\n\t\t\t\t\t\t\tborder: none;\n\t\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\t\tfont-size: 16px;\n\t\t\t\t\t\t\tflex: 1;\n\t\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\t`;
                            var n = document.createElement("button");
                            n.textContent = a.inputCancel || "Cancel";
                            n.style.cssText = `\n\t\t\t\t\t\t\tpadding: 10px;\n\t\t\t\t\t\t\tbackground-color: ${ba(ta,10)};\n\t\t\t\t\t\t\tcolor: ${v(ba(ta,10))};\n\t\t\t\t\t\t\tborder: none;\n\t\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\t\tfont-size: 16px;\n\t\t\t\t\t\t\tflex: 1;\n\t\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\t`;
                            ta = document.createElement("div");
                            ta.style.cssText = "\n\t\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\t\tgap: 10px;\n\t\t\t\t\t\t";
                            ta.appendChild(ma);
                            ta.appendChild(n);
                            wa.appendChild(sa);
                            wa.appendChild(ta);
                            wa.addEventListener("click", function(c) {
                                c.stopPropagation()
                            });
                            sa.addEventListener("click", function(c) {
                                c.stopPropagation()
                            });
                            ma.addEventListener("click", function(c) {
                                c.stopPropagation()
                            });
                            n.addEventListener("click", function(c) {
                                c.stopPropagation()
                            });
                            wa.dataset.alertId = a.instanceId;
                            var d = () => {
                                try {
                                    ia && (ia.style.opacity = "0", setTimeout(() => {
                                        const k = document.getElementById(ia.id);
                                        k && k.parentNode && k.parentNode.removeChild(k)
                                    }, 300));
                                    document.querySelectorAll(".virtual-input-overlay").forEach(k => {
                                        k && k.parentNode && (k.style.opacity = "0", setTimeout(() => {
                                            k.parentNode && k.parentNode.removeChild(k)
                                        }, 300))
                                    });
                                    var c = document.getElementById(wa.id);
                                    if (c && c.parentNode) return c.parentNode.removeChild(c), !0;
                                    const e = document.querySelectorAll(".virtual-input-layer");
                                    if (0 < e.length) return e.forEach(k => {
                                        k && k.parentNode && k.parentNode.removeChild(k)
                                    }), !0;
                                    const m = document.body.children;
                                    for (c = 0; c < m.length; c++)
                                        if (m[c].classList && (m[c].classList.contains("virtual-input-layer") ||
                                                m[c].classList.contains("virtual-input-overlay"))) return document.body.removeChild(m[c]), !0;
                                    return !1
                                } catch (e) {
                                    return !1
                                }
                            };
                            ma.addEventListener("click", () => {
                                try {
                                    f.value = sa.value;
                                    const c = new Event("input", {
                                        bubbles: !0,
                                        cancelable: !0
                                    });
                                    f.dispatchEvent(c);
                                    const e = new Event("change", {
                                        bubbles: !0,
                                        cancelable: !0
                                    });
                                    f.dispatchEvent(e);
                                    !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                        isIOS: !1
                                    }).isIOS && f.setAttribute("value", sa.value)
                                } catch (c) {} finally {
                                    d() || Array.from(document.body.children).forEach(c => {
                                        c.className &&
                                            (c.className.includes("virtual-input-layer") || c.className.includes("virtual-input-overlay")) && document.body.removeChild(c)
                                    })
                                }
                            });
                            n.addEventListener("click", () => {
                                d() || Array.from(document.body.children).forEach(c => {
                                    c.className && (c.className.includes("virtual-input-layer") || c.className.includes("virtual-input-overlay")) && document.body.removeChild(c)
                                })
                            });
                            sa.addEventListener("keydown", c => {
                                "Enter" === c.key ? (c.preventDefault(), ma.click()) : "Escape" === c.key && (c.preventDefault(), n.click())
                            });
                            document.body.appendChild(wa);
                            ia && ia.addEventListener("click", c => {
                                c.target === ia && d()
                            });
                            setTimeout(() => {
                                const c = function(e) {
                                    wa.contains(e.target) || e.target === wa || e.target.classList.contains("virtual-input-overlay") || (d(), document.removeEventListener("click", c))
                                };
                                document.addEventListener("click", c)
                            }, 300);
                            setTimeout(() => {
                                sa.focus()
                            }, 100)
                        }
                    };
                    N.forEach(f => {
                        if (!(f.readOnly || f.disabled || f.classList.contains("no-virtual-layer"))) {
                            var t = f.onfocus;
                            f.addEventListener("click", v => {
                                v.preventDefault();
                                v.stopPropagation();
                                x(f)
                            });
                            f.onfocus = function(v) {
                                "checkbox" ===
                                f.type || "radio" === f.type || "select" === f.tagName.toLowerCase() || f.classList.contains("no-virtual-layer") ? t && t.call(this, v) : (v && v.preventDefault(), f.blur(), t && t.call(this, v), setTimeout(() => {
                                    x(f)
                                }, 50))
                            }
                        }
                    })
                }
            }
        }
        if (!0 === a.confirm) return a.Ok = a.Ok || "OK", a.$cancel = a.$cancel || "cancel", new Promise(r => {
            const H = event,
                {
                    alertBox: N,
                    options: x,
                    speed: f,
                    buttonConfigs: t
                } = $._alert0(String(b), a, l);
            x.buttonConfigs = t;
            $._alert1(N, x, f, (v, T) => {
                v = "button" === T;
                g && g(v);
                r(v)
            }, H)
        });
        E = event;
        const {
            alertBox: G,
            options: y,
            speed: u,
            buttonConfigs: F
        } =
        $._alert0(b, a, l);
        y.buttonConfigs = F;
        return $._alert1(G, y, u, g, E)
    };
    $.confirm = function(b, a = {}, l) {
        if ("string" !== typeof b || !b.trim()) return {
            else: function() {
                return this
            }
        };
        "function" === typeof a && (l = a, a = {});
        a.ifO = !0;
        return $.if(b, a, 300, l)
    };
    $.toast = function(b, a = {}, l = 300, g) {
        if ("object" === typeof b && null !== b) {
            g = l;
            l = a;
            a = b;
            if (!0 === a.closeToast) {
                Array.from(document.querySelectorAll(".domquery-alert.toast-alert")).forEach(q => {
                    (q = D.getElement(q, ".domquery-close-x-btn") || D.getElement(q, ".domquery-alert-close-btn")) &&
                    q.click()
                });
                return
            }
            b = a.message || a.title || "";
            delete a.message;
            delete a.speed
        } else "string" !== typeof b && (b = String(b));
        "function" === typeof a ? (g = a, a = {}) : "function" === typeof l && (g = l, l = 300);
        void 0 === a.timeOut ? (a.timeOut = 3E3, void 0 === a.$Ok && (a.$Ok = !1)) : !1 === a.timeOut ? delete a.timeOut : void 0 === a.$Ok && (a.$Ok = !1);
        void 0 === a.background ? a.background = !1 : a.toastZindex = a.toastZindex || 9999;
        void 0 === a.closeBack && (a.closeBack = !1);
        a.History = !1;
        a.prompt = !0;
        a.toast = !0;
        return $.alert(b, a, l, g)
    };
    $.closeToast = function(b) {
        if (b =
            document.getElementById(b)) {
            b.timeoutId && (clearTimeout(b.timeoutId), b.timeoutId = null);
            const a = b.getAttribute("data-instance-id");
            a && z.options && z.options[a] && $._alert1(b, z.options[a], 0).close_Alert("close", !0, 0)
        }
    };
    $.prompt = function(b, a = {}, l = 300, g) {
        "function" === typeof a ? (g = a, a = {}) : "function" === typeof l && (g = l, l = 300);
        a.prompt = !0;
        return $.alert(b, a, l, g)
    };
    $.if = function(b, a = {}, l, g) {
        let q;
        const E = x => {
            if ("function" === typeof x) return x();
            if (Array.isArray(x) && 3 === x.length) {
                const [f, t, v] = x;
                switch (t) {
                    case ">":
                        return f >
                            v;
                    case "<":
                        return f < v;
                    case ">=":
                        return f >= v;
                    case "<=":
                        return f <= v;
                    case "===":
                        return f === v;
                    case "!==":
                        return f !== v;
                    default:
                        return !!x
                }
            } else return "boolean" === typeof x ? x : !!x
        };
        var S = (x, f, t = g) => $if(x, f, t);
        if ("object" === typeof a) {
            if (void 0 !== a.if) return E(b) ? S(a.if, {
                ...a,
                if: void 0
            }, l, g) : {
                else: function() {},
                elseif: function() {}
            };
            if (a.hasOwnProperty("else")) {
                S = a.else;
                delete a.else;
                if (E(b)) return $.alert(a.title || b, a, l);
                "function" === typeof S && S();
                return {
                    else: function() {},
                    elseif: function() {}
                }
            }
        }
        "number" === typeof a ?
            (g = l, l = a, a = {}) : "function" === typeof a ? (g = a, a = {}, l = 300) : "function" === typeof l && (g = l, l = 300);
        4 <= arguments.length && "function" === typeof arguments[3] && (g = arguments[3]);
        var B = q = b;
        a.ifO ? B = String(b) : (q = E(b), B = String(q));
        const G = (x => function(...f) {
                let t = -1;
                for (let v = f.length - 1; 0 <= v; v--)
                    if ("object" === typeof f[v] && null !== f[v] && !Array.isArray(f[v])) {
                        t = v;
                        break
                    } 0 <= t ? f[t].hasOwnProperty("retainScroll") || (f[t] = {
                    ...f[t],
                    retainScroll: !1
                }) : f.push({
                    retainScroll: !1
                });
                return x.apply(this, f)
            })($.alert),
            y = x => {
                const f = $.alert;
                $.alert = G;
                try {
                    x?.()
                } finally {
                    $.alert = f
                }
            };
        S = {
            elseif: function(x, f) {
                !q && "function" === typeof f && E(x) && (y(f), this.previousResult = !0);
                return this
            },
            else: function(x) {
                if (!q && !this.previousResult && "function" === typeof x) return y(x), this;
                if (a.$cancel) r.cancel = x;
                else {
                    const f = x.toString().match(/\(([^)]*)\)/);
                    if (f && f[1]) {
                        const t = f[1].trim();
                        H.includes(t) && (r[t] = x, H = H.filter(v => v !== t))
                    }
                }
                return this
            },
            previousResult: !1
        };
        a = (x => {
            x = {
                ...x
            };
            void 0 !== x.$ok && (x.$Ok = x.$ok, delete x.$ok);
            void 0 !== x.Ok && (x.$Ok = x.Ok, delete x.Ok);
            void 0 !== x.$OkBgcolor && (x.OkBgcolor = x.$OkBgcolor, delete x.$OkBgcolor);
            void 0 !== x.$OkColor && (x.OkColor = x.$OkColor, delete x.$OkColor);
            return x
        })(a);
        const u = "$Ok $ok $OkBgcolor $OkColor $cancel $cancelBgcolor $cancelColor".split(" ");
        var F = Object.keys(a).some(x => x.startsWith("$") && !u.includes(x));
        a = {
            $Ok: "OK",
            Cancel: "cancel",
            ...(F || !1 === a.$cancel ? {} : {
                $cancel: "cancel"
            }),
            OkBgcolor: "#E0E0E0",
            OkColor: "#000000",
            $cancelBgcolor: "#ECEFF1",
            $cancelColor: "#607D8B",
            ...a
        };
        if (F || !1 === a.$cancel) delete a.$cancel, delete a.$cancelBgcolor,
            delete a.$cancelColor;
        let r = {},
            H = Object.keys(a).filter(x => x.startsWith("$") && !u.includes(x) && "undefined" !== typeof a[x] && null !== a[x]).map(x => x.substring(1));
        F = {
            else: function(x) {
                if (a.$cancel) r.cancel = x;
                else {
                    const f = x.toString().match(/\(([^)]*)\)/);
                    if (f && f[1]) {
                        const t = f[1].trim();
                        H.includes(t) && (r[t] = x, H = H.filter(v => v !== t))
                    }
                }
                return this
            }
        };
        if (!a.ifO && !q) return r.cancel && r.cancel.call(null, "condition_false"), Object.assign(F, S);
        const N = {
            ...a
        };
        void 0 !== a.$cancel && (N.Cancel = a.$cancel, N.$cancel = a.$cancel);
        N.Ok = function() {
            g && "function" === typeof g && g.call(this, this);
            this.close()
        };
        a.$cancel && (N.cancel = function() {
            this.close();
            r.cancel && r.cancel.call(this, "cancel")
        });
        Object.keys(a).filter(x => x.startsWith("$") && !u.includes(x)).forEach(x => {
            const f = x.substring(1);
            N[f] = function() {
                this.close();
                r[f] && r[f].call(this, f)
            }
        });
        B = N.message || B;
        N.message && delete N.message;
        $.alert(B, N, l);
        return Object.assign(F, S)
    };
    $.closeAlert = function(b, a) {
        "function" === typeof b && (a = b, b = null);
        var l = document.querySelectorAll(".domquery-alert");
        if (0 === l.length) return document.body.style.overflow = "", document.documentElement.style.overflow = "", document.querySelectorAll(".domquery-blank-container").forEach(G => {
            G && G.parentNode && G.parentNode.removeChild(G)
        }), document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay").forEach(G => {
            G && G.parentNode && G.parentNode.removeChild(G)
        }), "function" === typeof a && setTimeout(a, 300, null, "no_alert"), !1;
        let g = null;
        if (b) {
            if ((g = document.getElementById(b)) || (g = document.querySelector(`.domquery-alert[data-id="${b}"]`)),
                g || (g = document.querySelector(`.domquery-alert[data-instance-id="${b}"]`)), !g || !g.classList.contains("domquery-alert")) return "function" === typeof a && setTimeout(a, 50, null, "id_not_found"), !1
        } else g = l[l.length - 1];
        let q = !1;
        const E = (G, y) => {
                q || "function" !== typeof a || (q = !0, setTimeout(() => {
                    a(G, y)
                }, 300))
            },
            S = new MutationObserver(G => {
                for (const y of G) "childList" === y.type && (G = Array.from(y.removedNodes), G.includes(g) || G.some(u => u.contains && u.contains(g))) && (S.disconnect(), E("removed", "dom_observation"))
            });
        S.observe(document.body, {
            childList: !0,
            subtree: !0
        });
        b = setTimeout(() => {
            S.disconnect();
            E("timeout", "safety")
        }, 1E3);
        try {
            const G = g.getAttribute("data-instance-id");
            l = "normal";
            let y = {};
            try {
                var B = g.getAttribute("data-options");
                B && (y = JSON.parse(B)) && "_self" === y.parent && (l = "self")
            } catch (F) {}
            const u = D.getElement(g, ".domquery-close-x-btn") || D.getElement(g, ".domquery-alert-close-btn");
            if ("self" === l) {
                const F = g.querySelectorAll("button");
                if (0 < F.length) {
                    B = null;
                    for (const r of F) {
                        const H = r.textContent.trim().toLowerCase();
                        if ("\ud655\uc778" ===
                            H || "ok" === H || "\uc608" === H || "yes" === H) {
                            B = r;
                            break
                        }
                    }
                    B ? B.click() : u ? u.click() : F[0].click()
                } else u && u.click();
                setTimeout(() => {
                    if (document.contains(g)) {
                        g.parentNode && g.parentNode.removeChild(g);
                        const r = document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay");
                        for (const H of r) H.parentNode && H.parentNode.removeChild(H);
                        E("forced_removal", "parent_self")
                    }
                }, 100)
            } else if (u) u.click(), setTimeout(() => {
                if (document.contains(g)) {
                    const F = document.querySelector(`.domquery-alert[data-instance-id="${G}"]`);
                    if (F) {
                        const r = D.getElement(F, ".domquery-close-x-btn") || D.getElement(F, ".domquery-alert-close-btn");
                        r && r.click();
                        setTimeout(() => {
                            if (document.contains(F)) {
                                F.parentNode && F.parentNode.removeChild(F);
                                const H = document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay");
                                for (const N of H) N.parentNode && N.parentNode.removeChild(N);
                                document.querySelectorAll(".domquery-blank-container").forEach(N => {
                                    N && N.parentNode && N.parentNode.removeChild(N)
                                })
                            }
                        }, 100)
                    }
                }
            }, 100);
            else {
                g.parentNode && g.parentNode.removeChild(g);
                const F = document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay");
                for (const r of F) r.parentNode && r.parentNode.removeChild(r);
                E("forced_removal", "no_button")
            }
            return !0
        } catch (G) {
            try {
                g && g.parentNode && g.parentNode.removeChild(g);
                const y = document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay");
                for (const u of y) u.parentNode && u.parentNode.removeChild(u)
            } catch (y) {}
            clearTimeout(b);
            S.disconnect();
            E("emergency_removal", "error_recovery");
            return !0
        }
    }
})("undefined" !== typeof window ?
    window : this);
$.fn.alert = function(h, z, ja, M) {
    const ua = this[0];
    if (!ua) return this;
    z = z || {};
    z.parent = ua;
    $.alert(h, z, ja, M);
    return this
};
$.fn.confirm = function(h, z, ja) {
    const M = this[0];
    if (!M) return this;
    z = z || {};
    z.parent = M;
    return $.confirm(h, z, ja)
};
$.fn.prompt = function(h, z, ja, M) {
    const ua = this[0];
    if (!ua) return this;
    z = z || {};
    z.parent = ua;
    z.prompt = !0;
    $.alert(h, z, ja, M);
    return this
};
$.fn.toast = function(h, z, ja, M) {
    const ua = this[0];
    if (!ua) return this;
    z = z || {};
    z.parent = ua;
    z.toast = !0;
    $.alert(h, z, ja, M);
    return this
};
$.fn.closeToast = function(h) {
    !h && this[0] && this[0].id && (h = this[0].id);
    h && $.closeToast(h);
    return this
};
$.fn.if = function(h, z, ja, M) {
    const ua = this[0];
    if (!ua) return this;
    z = z || {};
    z.parent = ua;
    return $.if(h, z, ja, M)
};
$.fn.topAlert = function(h = 0, z = 300, ja) {
    var M = $(".domquery-alert");
    if (0 === M.length) return "function" === typeof ja && ja(!1), !1;
    M = M.last();
    M = [M.find(".alert-scroll-wrapper"), M.find(".domquery-alert-body"), M.find('div[style*="overflow: auto"]'), M.find('div[style*="overflow-y: auto"]'), M.find('div[style*="overflow-y: scroll"]'), M].filter(D => 0 < D.length);
    let ua = !1;
    for (const D of M)
        if (D[0].scrollHeight > D[0].clientHeight) {
            const b = D.scrollTop(),
                a = h - b,
                l = performance.now(),
                g = q => {
                    q = Math.min((q - l) / z, 1);
                    D.scrollTop(b +
                        a * (1 - Math.pow(1 - q, 2)));
                    1 > q ? requestAnimationFrame(g) : ua || "function" !== typeof ja || (ua = !0, ja(!0))
                };
            requestAnimationFrame(g);
            return !0
        }
    "function" !== typeof ja || ua || ja(!1);
    return !1
};
const $alert = function(...h) {
        if (1 === h.length && "object" === typeof h[0]) {
            h = h[0];
            const z = "alert_" + Date.now();
            h.alertId = z;
            const ja = document.createElement("div");
            ja.id = z;
            for (const M in h) "function" === typeof h[M] && (ja[M] = h[M]);
            document.body.appendChild(ja);
            return void 0 !== h.speed ? $.alert(h.message || "", h, h.speed, h.callback) : void 0 !== h.callback ? $.alert(h.message || "", h, h.callback) : $.alert(h.message || "", h)
        }
        return $.alert.call($, ...h)
    },
    $confirm = function(...h) {
        return 1 === h.length && "object" === typeof h[0] ? (h = h[0],
            $.confirm(h.message || "", h, h.callback)) : $.confirm.call($, ...h)
    },
    $prompt = function(...h) {
        return 1 === h.length && "object" === typeof h[0] ? (h = h[0], $.prompt(h.message || "", h, h.speed || 300, h.callback)) : $.prompt.call($, ...h)
    },
    $toast = function(...h) {
        return 1 === h.length && "object" === typeof h[0] ? (h = h[0], $.toast(h.message || "", h, h.speed || 300, h.callback)) : $.toast.call($, ...h)
    },
    $if = function(...h) {
        return 1 === h.length && "object" === typeof h[0] ? (h = h[0], $.if(h.condition || "", h, h.speed, h.thenCallback)) : $.if.call($, ...h)
    },
    $closeAlert =
    function(h, z) {
        return $.closeAlert(h, z)
    },
    $topAlert = function(h = 0, z = 300, ja) {
        return $.fn.topAlert.call($, h, z, ja)
    },
    $openAlert = function(h, z) {
        return $.openAlert(h, z)
    };
$.openAlert = function(h, z) {
    let ja = null;
    z ? "function" === typeof z && (ja = z, z = {}) : z = {};
    return new Promise(M => {
        $.closeAlert(() => {
            let ua = !1;
            var D = h;
            h.startsWith("#") && (D = h.substring(1));
            if (D = document.getElementById(D)) D.click(), ua = !0;
            ja && "function" === typeof ja && setTimeout(() => ja(ua), 50);
            M(ua)
        })
    })
};
const $lastAlert = function() {
        const h = Array.from(document.querySelectorAll(".domquery-alert"));
        return $(h[h.length - 1])
},
$spinner = function(h, z, ja) {
	if (!h) {
		z = $(".domquery-spinner-overlay");
		ja = $(".domquery-spinner-container");
		h = $(".domquery-spinner-message");
		if (z.length) {
			var M = parseFloat(z.css("opacity")),
				ua = z.data("opacity");
			0 < M || ua ? (ja.remove(), h.length && (h.css({
					position: "absolute",
					transform: h.css("transform") || "translate(-50%, -50%)"
				}), h.css("animation", "fadeOut 0.5s forwards")), z.css({
					animation: "fadeOut 0.5s forwards"
				}),
				setTimeout(() => {
					$(".domquery-spinner-overlay, .domquery-spinner-message").remove()
				}, 500)) : $(".domquery-spinner-container, .domquery-spinner-overlay, .domquery-spinner-message").remove()
		}
		return this
	}
	$(".domquery-spinner-container, .domquery-spinner-overlay, .domquery-spinner-message-overlay, .domquery-spinner-message").remove();
	const D = $lastAlert();
	if (!D.length) return this;
	let b;
	h = (a = "transparent", l = 0) => {
		const g = $("<div>", {
				class: "domquery-spinner-container",
				css: {
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "auto",
					height: "auto",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					zIndex: 9999,
					pointerEvents: "none"
				}
			}),
			q = $("<div>", {
				class: "domquery-spinner",
				css: {
					width: "45px",
					height: "45px",
					border: "3px solid #f3f3f3",
					borderTop: "3px solid #3498db",
					borderRadius: "50%",
					animation: "spin 1s linear infinite",
					display: "block"
				}
			});
		a = $("<div>", {
			class: "domquery-spinner-overlay",
			css: {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: a,
				opacity: l,
				display: "block",
				zIndex: 9998,
				textAlign: "center",
				paddingTop: "60px"
			}
		});
		const E = $("<div>", {
			class: "domquery-spinner-message-overlay",
			css: {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "transparent",
				zIndex: 9999,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				pointerEvents: "none"
			}
		});
		l = l || .8;
		const S = "spinner-style-" + l;
		$("#" + S).remove();
		$("<style>", {
			id: S,
			text: `\n                @keyframes spin {\n                    0% { transform: rotate(0deg); }\n                    100% { transform: rotate(360deg); }\n                }\n                @keyframes fadeIn {\n                    0% { opacity: 0; }\n                    100% { opacity: ${l}; }\n                }\n                @keyframes fadeOut {\n                    0% { opacity: ${l}; }\n                    100% { opacity: 0; }\n                }\n                @keyframes messageShow {\n                    0% { opacity: 0; }\n                    100% { opacity: 1; }\n                }\n                @keyframes messageHide {\n                    0% { opacity: 1; }\n                    100% { opacity: 0; }\n                }\n                .domquery-spinner-overlay {\n                    animation: fadeIn 0.5s forwards;\n                }\n                .domquery-spinner-message {\n                    opacity: 0;\n                    animation: messageShow 0.5s forwards;\n                }\n            `
		}).appendTo("head");
		g.append(q);
		D.append(a);
		D.append(E);
		D.append(g);
		a.data("opacity", l);
		return {
			spinner: q,
			overlay: a,
			messageOverlay: E,
			spinnerContainer: g
		}
	};
	M = (a, l) => {
		void 0 !== a && "50%" !== a && b.spinnerContainer.css({
			top: a
		});
		void 0 !== l && "50%" !== l && b.spinnerContainer.css({
			left: l
		})
	};
	ua = (a, l) => {
		Object.keys(l).forEach(g => {
			"function" === typeof l[g] && (a.find("*").each(function() {
				this[g] = l[g].bind(this)
			}), a[0][g] = l[g].bind(a[0]))
		})
	};
	if ("object" === typeof z) {
		const {
			top: a,
			left: l,
			html: g,
			text: q,
			backgroundColor: E,
			opacity: S,
			spinner: B
		} = z;
		b = h(E, S);
		M(a, l);
		if (void 0 !== g) {
			const G = $("<div>", {
				class: "domquery-spinner-message",
				css: {
					position: "absolute",
					top: "0",
					left: "0",
					right: "0",
					bottom: "0",
					width: "100%",
					height: "100%",
					textAlign: "center",
					zIndex: 10001,
					color: "#fff",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxSizing: "border-box",
					margin: "0",
					padding: "0",
					opacity: 0,
					pointerEvents: "auto"
				}
			}).appendTo(D);
			G.html(g);
			ua(G, z);
			setTimeout(() => {
				G.css("animation", "messageShow 0.5s forwards")
			}, 50);
			!0 !== B && setTimeout(() => {
				$(".domquery-spinner").hide();
				$(".domquery-spinner-container").hide()
			}, 300)
		} else if (void 0 !== q) {
			const G = $("<div>", {
				class: "domquery-spinner-message",
				css: {
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "100%",
					textAlign: "center",
					zIndex: 10001,
					color: "#fff",
					opacity: 0,
					pointerEvents: "auto"
				}
			}).appendTo(D);
			G.html(q);
			ua(G, z);
			setTimeout(() => {
				G.css("animation", "messageShow 0.5s forwards")
			}, 50);
			!0 !== B && setTimeout(() => {
				$(".domquery-spinner").hide();
				$(".domquery-spinner-container").hide()
			}, 300)
		}
	} else b = h(), M(z,
		ja);
	return this
};