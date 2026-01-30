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
        ka = (() => {
            let b = 0,
                a = !1;
            const l = [];
            let g = !1,
                r = null,
                H = null;
            const L = () => ({
                    x: h.pageXOffset || document.documentElement.scrollLeft || 0,
                    y: h.pageYOffset || document.documentElement.scrollTop || 0
                }),
                A = G => {
                    G && P.setTimeoutRAF(() => {
                        try {
                            h.scrollTo(G.x, G.y)
                        } catch (v) {}
                    }, 0)
                },
                F = () => {
                    try {
                        "scrollRestoration" in history && 0 === l.length && null !== H && (history.scrollRestoration = H, H = null)
                    } catch (G) {}
                },
                w = G => {
                    try {
                        const v = ++b,
                            D = Object.assign({}, history.state, {
                                __domqueryAlert: !0,
                                __domqueryAlertKey: "alertA",
                                __domqueryAlertSeq: v,
                                __domqueryAlertInstanceId: G
                            });
                        history.pushState(D, document.title);
                        return v
                    } catch (v) {
                        return null
                    }
                },
                t = () => {
                    if (g) g = !1, r && (A(r), r = null);
                    else {
                        var G = l[l.length - 1];
                        if (G) {
                            var v = L();
                            if (!0 === G.closeBack) {
                                const k = G.instanceId;
                                var D = () => {
                                    r = v;
                                    try {
                                        g = !0, history.forward()
                                    } catch (p) {
                                        g = !1;
                                        const x = w(k);
                                        if (null !== x) {
                                            G.seq = x;
                                            const M = document.querySelector(`.domquery-alert[data-instance-id="${k}"]`);
                                            M &&
                                                M.setAttribute("data-history-seq", String(x))
                                        }
                                        A(v)
                                    }
                                };
                                if (z.closingAlerts && z.closingAlerts.has(k)) D();
                                else {
                                    D();
                                    if (D = z.options?.[k]) D.__backCloseHold = !0;
                                    if (D && "function" === typeof D.__closeFromHistory) D.__closeFromHistory();
                                    else try {
                                        var J = document.querySelector(`.domquery-alert[data-instance-id="${k}"]`),
                                            y = J && (J.querySelector(".domquery-close-x-btn") || J.querySelector(".domquery-alert-close-btn"));
                                        y && y.click()
                                    } catch (p) {}
                                }
                                A(v)
                            } else {
                                try {
                                    const k = z.options?.[G.instanceId];
                                    if (k && !1 !== k.vibrate) {
                                        D = Number(k.openSpeed ||
                                            k.closeSpeed || 300);
                                        const p = document.querySelector(`.domquery-alert[data-instance-id="${G.instanceId}"]`);
                                        if (p && "undefined" !== typeof $ && "function" === typeof $.aBox) {
                                            const x = "TC LC RC BC TL TR BL BR".split(" ").find(M => void 0 !== k[M]);
                                            if ("vibrate" in navigator) try {
                                                navigator.vibrate(D / 3)
                                            } catch (M) {}
                                            $.aBox(p, x)
                                        }
                                    }
                                } catch (k) {}
                                r = v;
                                try {
                                    g = !0, history.forward()
                                } catch (k) {
                                    g = !1, J = w(G.instanceId), null !== J && (G.seq = J, (y = document.querySelector(`.domquery-alert[data-instance-id="${G.instanceId}"]`)) && y.setAttribute("data-history-seq",
                                        String(J))), A(v)
                                }
                            }
                        }
                    }
                };
            return {
                register: (G, v, D) => {
                    if (D && !0 === D.History) {
                        if (!a) {
                            a = !0;
                            try {
                                h.addEventListener("popstate", t)
                            } catch (y) {}
                        }
                        try {
                            "scrollRestoration" in history && (null === H && (H = history.scrollRestoration), history.scrollRestoration = "manual")
                        } catch (y) {}
                        var J = w(G);
                        null !== J && v && v.setAttribute("data-history-seq", String(J));
                        l.push({
                            instanceId: String(G),
                            seq: J || 0,
                            closeBack: !0 === D.closeBack
                        })
                    }
                },
                cleanupOnClose: (G, v, D, J) => {
                    if (D && !0 === D.History) {
                        var y = String(G);
                        G = l.findIndex(k => k.instanceId === y);
                        if (-1 === G) F();
                        else if (v = G === l.length - 1, l.splice(G, 1), "back" === J)
                            if (z.options?.[y]?.__backCloseHold && v) {
                                try {
                                    delete z.options[y].__backCloseHold
                                } catch (k) {}
                                try {
                                    g = !0, r = L(), history.back()
                                } catch (k) {
                                    g = !1
                                } finally {
                                    F()
                                }
                            } else F();
                        else if (v) try {
                            g = !0, r = L(), history.back()
                        } catch (k) {
                            g = !1
                        } finally {
                            F()
                        } else F()
                    } else F()
                }
            }
        })();
    h.domQuery8Alert || (h.domQuery8Alert = {});
    h.domQuery8Alert._internal = z;
    const P = {
            setTimeoutRAF: function(b, a) {
                if (0 >= a) return requestAnimationFrame(b), null;
                const l = performance.now();
                let g;
                const r = H => {
                    H - l >= a ? b() :
                        g = requestAnimationFrame(r)
                };
                return g = requestAnimationFrame(r)
            },
            clearTimeoutRAF: function(b) {
                b && cancelAnimationFrame(b)
            },
            waitForAnimation: function(b, a) {
                function l(r) {
                    r - g >= a ? b() : requestAnimationFrame(l)
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
        sa = function(b) {
            let a = 0;
            const l = b.length;
            for (let g =
                    0; g < l; g++) {
                const r = b.charCodeAt(g);
                a = (a << 5) - a + r;
                a &= a
            }
            return Math.abs(a).toString(36)
        },
        E = {
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
                a = [E.getElement(a, ".alert-scroll-wrapper"), E.getElement(a, ".domquery-alert-body"), a.querySelector('div[style*="overflow: auto"]'),
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
                r = [E.getElement(a, ".alert-scroll-wrapper"),
                    E.getElement(a, ".domquery-alert-body"), a.querySelector('div[style*="overflow: auto"]'), a.querySelector('div[style*="overflow-y: auto"]'), a.querySelector('div[style*="overflow-y: scroll"]'), a
                ].filter(A => null !== A);
            let H = 0;
            const L = () => {
                for (const A of r)
                    if (A.scrollHeight > A.clientHeight) return 0 < l ? this.scrollTo(A, g.position, l) : A.scrollTop = g.position, !0;
                H++;
                5 > H && setTimeout(L, 200);
                return !1
            };
            return L()
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
            b = [E.getElement(a, ".alert-scroll-wrapper"), E.getElement(a, ".domquery-alert-body"), a.querySelector('div[style*="overflow: auto"]'), a.querySelector('div[style*="overflow-y: auto"]'), a.querySelector('div[style*="overflow-y: scroll"]'),
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
            P.setTimeoutRAF(() => {
                this.isUserScrolling[b] = !1
            }, a)
        },
        checkScrollThreshold: function(b, a, l) {
            if (b && a) {
                a = [E.getElement(a, ".alert-scroll-wrapper"), E.getElement(a, ".domquery-alert-body"), a.querySelector('div[style*="overflow: auto"]'), a.querySelector('div[style*="overflow-y: auto"]'),
                    a.querySelector('div[style*="overflow-y: scroll"]'), a
                ].filter(r => null !== r);
                for (var g of a)
                    if (g.scrollHeight > g.clientHeight) {
                        a = g.scrollHeight - g.scrollTop - g.clientHeight;
                        g = g.scrollHeight - g.clientHeight;
                        let r = 0;
                        "number" === typeof l ? r = l : "string" === typeof l && (l.endsWith("px") ? (r = parseInt(l, 10), isNaN(r) && (r = 0)) : l.endsWith("%") ? (l = parseFloat(l), isNaN(l) || (r = l / 100 * g)) : isNaN(parseFloat(l)) || (r = parseFloat(l)));
                        this.scrollStates[b] ? this.scrollStates[b].threshold = r : this.scrollStates[b] = {
                            thresholdExceeded: !1,
                            threshold: r
                        };
                        this.scrollStates[b].thresholdExceeded = a > r ? !0 : !1;
                        break
                    }
            }
        }
    };
    $.scaleArr = function(b, a, l = 300) {
        if (b && a) {
            var g = "",
                r = void 0;
            void 0 !== a.LC ? (g = "LC", r = a.LC) : void 0 !== a.RC ? (g = "RC", r = a.RC) : void 0 !== a.TC ? (g = "TC", r = a.TC) : void 0 !== a.BC ? (g = "BC", r = a.BC) : void 0 !== a.TL ? (g = "TL", r = a.TL) : void 0 !== a.TR ? (g = "TR", r = a.TR) : void 0 !== a.BL ? (g = "BL", r = a.BL) : void 0 !== a.BR && (g = "BR", r = a.BR);
            b.style.position = "fixed";
            b.style.willChange = "transform, opacity";
            var H = "",
                L = "",
                A = !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                    isMobile: !1
                }).isMobile,
                F = () => {
                    if (A && h.visualViewport) {
                        b.style.opacity = String("number" === typeof a.opacity ? a.opacity : 1);
                        b.style.transition = "opacity 0.3s";
                        P.setTimeoutRAF(() => {
                            b.style.opacity = "1"
                        }, 1E3);
                        if (!0 === a.resize) {
                            const x = b.querySelectorAll('input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');
                            let M = h.visualViewport.height,
                                ha = !1,
                                ta = null,
                                aa = null;
                            var D = {
                                    height: b.style.height,
                                    maxHeight: b.style.maxHeight,
                                    minHeight: b.style.minHeight,
                                    overflow: b.style.overflow
                                },
                                J = null;
                            const ia = E.getElement(b, ".domquery-alert-body");
                            ia && (J = {
                                maxHeight: ia.style.maxHeight,
                                minHeight: ia.style.minHeight,
                                height: ia.style.height,
                                overflowY: ia.style.overflowY,
                                webkitOverflowScrolling: ia.style.webkitOverflowScrolling
                            });
                            const Aa = () => {
                                var d = b.getBoundingClientRect();
                                b.style.height = `${d.height}px`;
                                b.style.maxHeight = `${d.height}px`;
                                b.style.minHeight = `${d.height}px`;
                                ia && (d = ia.getBoundingClientRect(), ia.style.height = `${d.height}px`, ia.style.minHeight = `${d.height}px`)
                            };
                            P.setTimeoutRAF(Aa, 200);
                            const Ea = () => {
                                    aa && (clearTimeout(aa), aa = null);
                                    Object.keys(D).forEach(d => {
                                        b.style[d] = D[d]
                                    });
                                    ia && J && Object.keys(J).forEach(d => {
                                        ia.style[d] = J[d]
                                    });
                                    P.setTimeoutRAF(Aa, 100);
                                    ha = !1
                                },
                                Ca = () => {
                                    var d = document.getElementById("keyboard-virtual-layer");
                                    d && d.remove();
                                    d = document.createElement("div");
                                    d.id = "keyboard-virtual-layer";
                                    d.style.cssText = `\n                           position: fixed;\n                           top: 0;\n                           left: 0;\n                           width: 100%;\n                           height: 100%;\n                           background-color: transparent;\n                           z-index: ${parseInt(b.style.zIndex||
9999)+2};\n                           pointer-events: none;\n                       `;
                                    const f = a.parent ? "string" === typeof a.parent ? document.querySelector(a.parent) : a.parent : document.body;
                                    f ? f.appendChild(d) : document.body.appendChild(d);
                                    return d
                                },
                                ua = () => {
                                    try {
                                        var d = document.getElementById("keyboard-transition-layer");
                                        if (d) try {
                                            d.remove()
                                        } catch (m) {
                                            d.parentNode && d.parentNode.removeChild(d)
                                        }
                                        d = "#ffffff";
                                        var f = document.body;
                                        let c = 10001;
                                        try {
                                            b && 1 === b.nodeType && (d = window.getComputedStyle(b).backgroundColor || "#ffffff")
                                        } catch (m) {}
                                        try {
                                            if (a &&
                                                a.parent)
                                                if ("string" === typeof a.parent) {
                                                    const m = document.querySelector(a.parent);
                                                    m && (f = m)
                                                } else a.parent instanceof Element && (f = a.parent)
                                        } catch (m) {}
                                        try {
                                            if (b && b.style) {
                                                const m = b.style.zIndex;
                                                m && (c = parseInt(m) + 2)
                                            }
                                        } catch (m) {}
                                        const n = document.createElement("div");
                                        n.id = "keyboard-transition-layer";
                                        n.style.position = "fixed";
                                        n.style.top = "0";
                                        n.style.left = "0";
                                        n.style.width = "100%";
                                        n.style.height = "100%";
                                        n.style.backgroundColor = d;
                                        n.style.opacity = "1";
                                        n.style.transition = "opacity 0.3s ease";
                                        n.style.zIndex = c.toString();
                                        try {
                                            f.appendChild(n)
                                        } catch (m) {
                                            document.body.appendChild(n)
                                        }
                                        return n
                                    } catch (c) {
                                        f = document.createElement("div");
                                        f.style.display = "none";
                                        try {
                                            document.body.appendChild(f)
                                        } catch (n) {}
                                        return f
                                    }
                                },
                                Da = () => {
                                    const d = h.visualViewport.height;
                                    aa && P.clearTimeoutRAF(aa);
                                    aa = P.setTimeoutRAF(() => {
                                        if (d < M - 50 && !ha) {
                                            ha = !0;
                                            za || (za = !0);
                                            const f = d - Math.max(0, window.outerHeight - window.innerHeight);
                                            b.style.height = `${f}px`;
                                            b.style.maxHeight = `${f}px`;
                                            b.style.minHeight = null;
                                            if (ia) {
                                                const c = E.getElement(b, ".domquery-alert-header"),
                                                    n =
                                                    E.getElement(b, ".domquery-alert-footer");
                                                ia.style.maxHeight = `${f-(c?c.offsetHeight:0)-(n?n.offsetHeight:0)-40}px`;
                                                ia.style.height = "";
                                                ia.style.minHeight = "";
                                                ia.style.overflowY = "auto";
                                                ia.style.webkitOverflowScrolling = "touch";
                                                ia.scrollTop = 0
                                            }
                                        } else d > M - 100 && ha && Ea()
                                    }, 100)
                                };
                            h.visualViewport.addEventListener("resize", Da);
                            let Fa = !0,
                                va = null,
                                za = !1;
                            x && "function" === typeof x.forEach && x.forEach(d => {
                                d && d instanceof Element && (d.addEventListener("focus", () => {
                                    if (Fa) {
                                        ta = Ca();
                                        try {
                                            va = ua()
                                        } catch (f) {
                                            va = document.createElement("div"),
                                                va.style.display = "none", document.body.appendChild(va)
                                        }
                                        M = h.visualViewport.height;
                                        P.setTimeoutRAF(() => {
                                            ta && (ta.remove(), ta = null);
                                            P.setTimeoutRAF(() => {
                                                va && (va.style.opacity = "0", P.setTimeoutRAF(() => {
                                                    va && (va.style.display = "none")
                                                }, 300))
                                            }, 300)
                                        }, 200);
                                        Fa = !1
                                    } else va && P.setTimeoutRAF(() => {
                                        va && (va.style.display = "block", va.style.opacity = "1", P.setTimeoutRAF(() => {
                                            va && (va.style.opacity = "0", P.setTimeoutRAF(() => {
                                                va && (va.style.display = "none")
                                            }, 300))
                                        }, 300))
                                    }, 300)
                                }), d.addEventListener("blur", () => {
                                    P.setTimeoutRAF(() => {
                                        const f = document.activeElement;
                                        let c = !1;
                                        Array.isArray(x) ? c = x.some(n => n === f) : x && "object" === typeof x && (c = x === f);
                                        !c && ha && Ea()
                                    }, 100)
                                }))
                            });
                            const la = setInterval(() => {
                                    ha && h.visualViewport.height > M - 100 && Ea()
                                }, 1E3),
                                ja = () => {
                                    ha && window.innerHeight > M - 100 && Ea()
                                };
                            window.addEventListener("resize", ja);
                            const q = a.onClose;
                            a.onClose = function() {
                                h.visualViewport.removeEventListener("resize", Da);
                                window.removeEventListener("resize", ja);
                                clearInterval(la);
                                aa && clearTimeout(aa);
                                const d = document.getElementById("keyboard-virtual-layer");
                                d && d.remove();
                                va && (va.remove(), va = null);
                                "function" === typeof q && q.apply(this, arguments)
                            }
                        }
                        let y = h.visualViewport.height,
                            k = null;
                        const p = () => {
                            if (100 < Math.abs(h.visualViewport.height - y)) k && clearTimeout(k), k = setTimeout(() => {
                                const x = h.visualViewport.offsetTop,
                                    M = h.visualViewport.height,
                                    ha = h.innerHeight - M;
                                switch (g) {
                                    case "TC":
                                        b.style.top = x + "px";
                                        b.style.bottom = "auto";
                                        break;
                                    case "BC":
                                        b.style.top = "auto";
                                        b.style.bottom = ha + "px";
                                        break;
                                    case "LC":
                                    case "RC":
                                        b.style.top = x + M / 2 + "px";
                                        break;
                                    case "TL":
                                    case "TR":
                                        b.style.top =
                                            x + "px";
                                        break;
                                    case "BL":
                                    case "BR":
                                        b.style.bottom = ha + "px"
                                }
                            }, 100), y = h.visualViewport.height;
                            else {
                                const x = h.visualViewport.offsetTop,
                                    M = h.visualViewport.height,
                                    ha = h.innerHeight - M;
                                switch (g) {
                                    case "TC":
                                        b.style.top = x + "px";
                                        b.style.bottom = "auto";
                                        break;
                                    case "BC":
                                        b.style.top = "auto";
                                        b.style.bottom = ha + "px";
                                        break;
                                    case "LC":
                                    case "RC":
                                        b.style.top = x + M / 2 + "px";
                                        break;
                                    case "TL":
                                    case "TR":
                                        b.style.top = x + "px";
                                        break;
                                    case "BL":
                                    case "BR":
                                        b.style.bottom = ha + "px"
                                }
                            }
                        };
                        h.visualViewport.addEventListener("resize", p, {
                            passive: !0
                        });
                        h.visualViewport.addEventListener("scroll",
                            p, {
                                passive: !0
                            });
                        p();
                        return () => {
                            k && clearTimeout(k);
                            h.visualViewport.removeEventListener("resize", p, {
                                passive: !0
                            });
                            h.visualViewport.removeEventListener("scroll", p, {
                                passive: !0
                            })
                        }
                    }
                    return null
                };
            "" === g || "center" === g ? (b.style.top = "50%", b.style.left = "50%", b.style.transformOrigin = "center", H = "translate(-50%, -50%) scale(0)", L = "translate(-50%, -50%) scale(1)") : ["LC", "RC"].includes(g) ? (b.style.top = "50%", b.style["LC" === g ? "left" : "right"] = "0", b.style.transformOrigin = `${"LC"===g?"left":"right"} center`, !1 === r ? (H =
                `translate(${"LC"===g?"-100%":"100%"}, -50%)`, L = "translate(0, -50%)") : (H = "translate(0, -50%) scale(0)", L = "translate(0, -50%) scale(1)"), F()) : ["TC", "BC"].includes(g) ? (b.style["TC" === g ? "top" : "bottom"] = "0", b.style.left = "50%", b.style.transformOrigin = `${"TC"===g?"top":"bottom"} center`, !1 === r ? (H = `translate(-50%, ${"TC"===g?"-100%":"100%"})`, L = "translate(-50%, 0)") : (H = "translate(-50%, 0) scale(0)", L = "translate(-50%, 0) scale(1)"), F()) : ["TL", "TR", "BL", "BR"].includes(g) && (H = g.startsWith("T") ? "top" : "bottom",
                L = g.endsWith("L") ? "left" : "right", b.style[H] = "0", b.style[L] = "0", b.style.transformOrigin = `${H} ${L}`, !1 === r ? (H = `translate(${"right"===L?"100%":"-100%"}, ${"bottom"===H?"100%":"-100%"})`, L = "translate(0, 0)") : (H = "translate(0, 0) scale(0)", L = "translate(0, 0) scale(1)"), F());
            b.style.transform = H;
            b.style.opacity = String("number" === typeof a.opacity ? a.opacity : 1);
            b.style.willChange = "transform, opacity";
            b.style.backfaceVisibility = "hidden";
            var w = null;
            !0 === a.hide && (w = Array.from(b.querySelectorAll(".domquery-alert-body, .domquery-text-container, .domquery-text-bottom-container, .domquery-alert-close-btn, .alert-scroll-wrapper > div")),
                w.forEach(D => {
                    D && (D.style.transition = "opacity 0.3s ease", D.style.opacity = "0")
                }));
            var t = performance.now(),
                G = D => {
                    D = Math.min((D - t) / l, 1);
                    const J = a.easing ? this._anieasing(0, 1, D, a.easing) : D;
                    if (!0 === a.hide && w) {
                        const k = .8 <= D ? 5 * (D - .8) : 0;
                        w.forEach(p => {
                            p && (p.style.opacity = k.toString())
                        })
                    }
                    b.style.transform = (() => {
                        if (["TL", "TR", "BL", "BR"].includes(g)) {
                            if (!1 === r) {
                                var k = g.endsWith("L") ? "left" : "right",
                                    p = g.startsWith("T") ? "top" : "bottom";
                                k = "right" === k ? 100 : -100;
                                p = "bottom" === p ? 100 : -100;
                                return `translate3d(${k+(0-k)*J}%, ${p+
(0-p)*J}%, 0)`
                            }
                            return `translate3d(0, 0, 0) scale(${J})`
                        }
                        if (!1 === r) {
                            if (["LC", "RC"].includes(g)) return p = "LC" === g ? -100 : 100, `translate3d(${p+(0-p)*J}%, -50%, 0)`;
                            if (["TC", "BC"].includes(g)) return p = "TC" === g ? -100 : 100, `translate3d(-50%, ${p+(0-p)*J}%, 0)`
                        }
                        return ["LC", "RC"].includes(g) ? `translate3d(0, -50%, 0) scale(${J})` : ["TC", "BC"].includes(g) ? `translate3d(-50%, 0, 0) scale(${J})` : ["TL", "TR", "BL", "BR"].includes(g) ? `translate3d(0, 0, 0) scale(${J})` : `translate3d(-50%, -50%, 0) scale(${J})`
                    })();
                    const y =
                        "number" === typeof a.opacity ? a.opacity : 1;
                    b.style.opacity = String(y + (1 - y) * J);
                    if (1 > D) v = requestAnimationFrame(G);
                    else if (b.style.willChange = "auto", b.style.backfaceVisibility = "", a.onComplete) a.onComplete()
                };
            var v = requestAnimationFrame(G);
            return {
                initialTransform: H,
                finalTransform: L,
                cancel: () => {
                    v && (cancelAnimationFrame(v), b.style.willChange = "auto", b.style.backfaceVisibility = "")
                }
            }
        }
    };
    $.aBox = function(b, a) {
        function l() {
            if (L) {
                H += 2 * r;
                3 <= Math.abs(H) && (r *= -1);
                var t = Math.abs(H) / 3;
                t = 2 * (.5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t);
                if (a) switch (a) {
                    case "TL":
                        t =
                            `translate(${F-t}px, ${w-t}px)`;
                        break;
                    case "TR":
                        t = `translate(${F+t}px, ${w-t}px)`;
                        break;
                    case "BL":
                        t = `translate(${F-t}px, ${w+t}px)`;
                        break;
                    case "BR":
                        t = `translate(${F+t}px, ${w+t}px)`;
                        break;
                    case "TC":
                        t = `translate(${F}px, ${w-t}px)`;
                        break;
                    case "BC":
                        t = `translate(${F}px, ${w+t}px)`;
                        break;
                    case "LC":
                        t = `translate(${F-t}px, ${w}px)`;
                        break;
                    case "RC":
                        t = `translate(${F+t}px, ${w}px)`;
                        break;
                    default:
                        t = A
                } else t = `${A} scale(${1+t/100})`;
                g.css("transform", t); - 10 <= H && 10 >= H ? requestAnimationFrame(l) : (L = !1, g.css("transform",
                    A))
            }
        }
        const g = $(b);
        let r = 1,
            H = 0,
            L = !0;
        const A = g.css("transform");
        b = new DOMMatrix(A);
        const F = b.m41,
            w = b.m42;
        l();
        P.setTimeoutRAF(() => {
            L = !1;
            g.css("transform", A)
        }, 300)
    };
    $._alert0 = function(b, a = {}, l = 300) {
        var g = a.preserveExisting,
            r = a.parent;
        "string" === typeof b && (b = b.replace(/>\s+</g, "><").trim());
        "object" === typeof b && (a = b, b = "");
        if (null === b || void 0 === b) b = "";
        var H = {
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
            L = !1 !== a.$Ok || Object.keys(a).some(k => k.startsWith("$") && "$Ok" !== k);
        a.padding = a.padding || (L ? "15px" : "15px 15px 0 15px");
        "_self" === a.parent && (a.preserveExisting = !0);
        if ("_blank" === a.parent) {
            let k = 2147483640;
            Array.from(document.querySelectorAll(".domquery-alert")).forEach(p => {
                p = parseInt(getComputedStyle(p).zIndex);
                !isNaN(p) && p > k && (k = p)
            });
            a.zindex = a.zindex && a.zindex !== H.zindex ? Math.max(a.zindex, k) + 2 : k +
                2;
            2147483647 < a.zindex && (a.zindex = 2147483647);
            a.overlayZindex = a.zindex - 1
        }
        g = void 0 !== g ? g : a.preserveExisting;
        r = void 0 !== r ? r : a.parent;
        a = Object.assign({}, H, a);
        void 0 === a.closeBack && (a.closeBack = !1);
        void 0 !== g && (a.preserveExisting = g);
        if ("_self" === r || "_blank" === r) a.parent = r;
        delete a._originalParent;
        if ("_self" !== a.parent && "_blank" !== a.parent && (!a.zindex || a.zindex === H.zindex)) {
            r = Array.from(document.querySelectorAll(".domquery-alert"));
            let k = H.zindex;
            r.forEach(p => {
                p = parseInt(getComputedStyle(p).zIndex);
                !isNaN(p) &&
                    p > k && (k = p)
            });
            a.zindex = k + 2;
            a.overlayZindex = a.zindex - 1
        }!a.unscroll || a.scrollY || a.scroll || (a.scrollY = !0, a.hideScrollbar = !0);
        !0 === a.scrollY && (a.forceScroll = !0, a.scroll = !0);
        "auto" !== a.height || !a.scrollY && !a.scroll || a.minHeight || (a.minHeight = "200px");
        r = k => {
            if (void 0 === k) return "auto";
            if ("number" === typeof k) return k + "px";
            if ("string" === typeof k) {
                if (/px|%|vh|vw|rem|em|ch|ex|cm|mm|in|pt|pc/i.test(k)) return k;
                const p = parseFloat(k);
                if (!isNaN(p)) return p + "px"
            }
            return k
        };
        const A = r(a.width);
        let F = r(a.height);
        "_blank" ===
        a.parent && "100%" === F && (F = "100vh");
        g = "" !== a.title;
        L = `alert-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;
        a.instanceId = L;
        if (!a._originalFirstStepOptions) {
            a._originalFirstStepOptions = {};
            var w = new Set;
            for (var t in a) a[t] && "object" === typeof a[t] && !Array.isArray(a[t]) && "_originalFirstStepOptions" !== t && "_hasNext" !== t && "instanceId" !== t && "_stepInputValues" !== t && "_currentStepKey" !== t && void 0 !== a[t].title && w.add(t);
            for (var G in a) w.has(G) || "_originalFirstStepOptions" === G || "_hasNext" === G || "_stepInputValues" ===
                G || "_currentStepKey" === G || (a._originalFirstStepOptions[G] = a[G])
        }
        a._currentStepKey || (a._currentStepKey = "first");
        a._stepInputValues || (a._stepInputValues = {});
        z.options[L] = {
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
            a.parent || !(t = E.getDocumentElement(".domquery-alert:not(.toast-alert)")) || ((G = t.getAttribute("data-instance-id")) && (G = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${G}"]`)) && G.parentNode && G.parentNode.removeChild(G), t.parentNode && t.parentNode.removeChild(t));
        G = t = "";
        let v = [];
        w = (k, p) => {
            if (!k) return "";
            if ("function" === typeof k) {
                try {
                    var x = k();
                    if ("string" === typeof x) return `<div class="domquery-text-container">${x}</div>`;
                    if (x instanceof Element) return `<div class="domquery-text-container">${x.outerHTML}</div>`
                } catch (ha) {}
                return ""
            }
            if ("string" ===
                typeof k) {
                x = p.alertId || "alert_" + Date.now();
                p.alertId = x;
                const ha = document.createElement("div");
                ha.id = x;
                for (var M in p) "function" === typeof p[M] && (ha[M] = p[M]);
                document.body.appendChild(ha);
                k = k.replace(/this\./g, `document.getElementById('${x}').`);
                k = k.replace(/onclick="([^"]+)"/g, (ta, aa) => aa.includes("this.") ? ta : `onclick="window.${aa}"`);
                p = k.trim();
                return !p.startsWith("#") && !p.startsWith(".") || p.includes("bin(") || p.includes("{") || p.includes("}") ? `<div class="domquery-text-container">${k.split(/(\{[^}]+\}|bin\([^)]+\))/).map(ta=>
(ta=ta.trim())?ta.startsWith("bin(")?ta.slice(4,-1).split(",").map(aa=>aa.trim()).map(aa=>{const ia=document.querySelector(aa);if(ia){const Aa=h.getComputedStyle(ia).display;"none"===Aa&&(ia.style.display="block");v.push({selector:aa,parent:ia.parentNode,nextSibling:ia.nextSibling,element:ia,originalDisplay:Aa});aa=ia.outerHTML;ia.parentNode.removeChild(ia);return aa}return""}).join("\n"):ta.startsWith("{")&&ta.endsWith("}")&&!ta.includes("{")&&!ta.includes("}")?ta.slice(1,-1).split(";").map(aa=>
aa.trim()).map(aa=>{try{return eval(aa)||""}catch(ia){return""}}).join(""):ta:"").join("")}</div>` : (k = document.querySelector(p)) ? (M = getComputedStyle(k).display, "none" === M && (k.style.display = "block"), v.push({
                    selector: p,
                    parent: k.parentNode,
                    nextSibling: k.nextSibling,
                    element: k,
                    originalDisplay: M
                }), p = k.outerHTML, k.parentNode.removeChild(k), `<div class="domquery-text-container">${p}</div>`) : ""
            }
            return `<div class="domquery-text-container">${String(k)}</div>`
        };
        a.text && (t = w(a.text, a));
        a.textBottom && (G = w(a.textBottom,
            a));
        w = a.xclose ? `<div style="position: absolute; right: 10px; top: 10px; cursor: pointer; transition: opacity 0.2s; z-index:1; ${!0===a.hide?"opacity: 0;":""}" class="domquery-close-x-btn">\n\t\t\t\t<svg width="20" height="20" viewBox="0 0 24 24" style="opacity: 0.6; transition: opacity 0.2s; pointer-events: all;"\n\t\t\t\t\t\tonmouseover="this.style.opacity='1'"\n\t\t\t\t\t\tonmouseout="this.style.opacity='0.6'">\n\t\t\t\t\t<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="${a.color}"/>\n\t\t\t\t</svg>\n\t\t\t</div>` :
            '<div style="display:none" class="domquery-close-x-btn"></div>';
        const D = ['<div class="domquery-alert-loading" style="display: none;position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: rgba(255,255,255,0.2);', "z-index: " + (a.zindex + 1) + ";", 'justify-content: center;align-items: center;"><div style="width: 40px;height: 40px;border: 3px solid #f3f3f3;', "border-top: 3px solid " + a.OkBgcolor + ";", 'border-radius: 50%;animation: spin 1s linear infinite;"></div></div><style>@keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}</style>'].join(""),
            J = (k => {
                const p = [];
                Object.keys(k).forEach(x => {
                    if (x.startsWith("$") && !x.endsWith("Style") && !x.endsWith("hover")) {
                        var M = x.substring(1).replace(/Bgcolor|Color$/, "");
                        "Ok" === M || x.endsWith("Color") || x.endsWith("Bgcolor") || p.find(ha => ha.name === M) || p.push({
                            name: M,
                            text: k[x] || M,
                            bgcolor: k[`$${M}Bgcolor`] || "#007bff",
                            color: k[`$${M}Color`] || "#FFFFFF",
                            customStyle: k[`$${M}Style`] || "",
                            hoverStyle: k[`$${M}hover`] || ""
                        })
                    }
                });
                return p
            })(a),
            y = (() => {
                let k = '<div style="text-align: right; margin-top: 15px;">';
                if (!1 !== a.$Ok) {
                    const p =
                        a.$Okhover || "opacity: 1;",
                        x = ["padding: 6px 10px;", "background: " + (a.$OkBgcolor || a.OkBgcolor) + ";", "color: " + (a.$OkColor || a.OkColor) + ";", "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;", a.$OkStyle || ""].join("");
                    k += ['<button class="domquery-alert-close-btn" style="', x, '" onmouseover="this.style.cssText = `' + x + "; " + p + '`"', 'onmouseout="this.style.cssText = `' + x + '`">', a.$Ok, "</button>"].join("")
                }
                k += J.map(function(p) {
                    const x = ["padding: 6px 10px;",
                            `background: ${p.bgcolor};`, `color: ${p.color};`, "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;", p.customStyle
                        ].join(""),
                        M = p.hoverStyle || "opacity: 1;";
                    return [`<button class="alert-${p.name.toLowerCase()}-btn" style="`, x, '" onmouseover="this.style.cssText = `' + x + "; " + M + '`"', 'onmouseout="this.style.cssText = `' + x + '`">', p.text, "</button>"].join("")
                }).join("");
                return k + "</div>"
            })();
        H = ["z-index: " + ("_blank" === a.parent ? a.zindex : a.toast ?
                a.toastZindex : a.zindex) + " !important;", "margin: " + (a.margin || "0") + ";", a.border ? "border: " + a.border + ";" : "", a.borderWidth ? "border-width: " + a.borderWidth + ";" : "", a.borderStyle ? "border-style: " + a.borderStyle + ";" : "", a.borderColor ? "border-color: " + a.borderColor + ";" : "", "background: " + a.bgcolor + ";", "width: " + A + ";", a.minWidth ? "min-width: " + r(a.minWidth) + ";" : "", a.maxWidth ? "max-width: " + r(a.maxWidth) + ";" : "", "height: " + F + ";", a.minHeight ? "min-height: " + r(a.minHeight) + ";" : "", a.maxHeight ? "max-height: " + r(a.maxHeight) +
            ";" : "", "border-radius: " + a.radius + ";", "transparent" === a.bgcolor ? "" : !1 === a.shadowBox ? "" : "box-shadow: " + ("string" === typeof a.shadowBox ? a.shadowBox : H.shadowBox) + ";", "box-sizing: border-box;position: fixed;", "opacity: " + ("number" === typeof a.opacity ? a.opacity : 1) + ";", "z-index: " + a.zindex + ";", "overflow: hidden !important;", a.maxHeight ? "" : "max-height: 100vh !important;", "display: flex !important;flex-direction: column !important;"
        ].join("");
        b = ['<div class="domquery-alert ' + (a.toast ? "toast-alert" : "standard-alert") +
            '" ', `data-instance-id="${L}" `, null !== a.id ? `id="${a.id}" ` : `id="${L}" `, 'style="' + H + '">', w, D, a.scroll || a.scrollX || a.scrollY || a.forceScroll ? '<div class="alert-scroll-wrapper" style="position: relative !important;width: 100% !important;height: 100% !important;max-height: ' + (a.maxHeight || "100%") + " !important;overflow: " + (a.scroll || a.scrollY || a.forceScroll ? "auto" : a.scrollX ? "auto hidden" : a.scrollY || a.forceScroll ? "hidden auto" : "hidden") + " !important;" + (a.hideScrollbar ? "scrollbar-width: none !important; -ms-overflow-style: none !important;" :
                "") + "-webkit-overflow-scrolling: touch !important;touch-action: " + (a.scroll || a.scrollY || a.forceScroll ? "pan-x pan-y" : a.scrollY || a.forceScroll ? "pan-y" : "pan-x") + ' !important;"><div style="padding: ' + ("0" === a.padding ? "0" : r(a.padding)) + ';">' : '<div style="padding: ' + ("0" === a.padding ? "0" : r(a.padding)) + ';overflow: hidden !important;max-height: 100% !important;height: 100% !important;flex: 1;">', '<div class="domquery-alert-body" style="width: 100% !important;' + (a.toast ? "text-overflow: ellipsis;" : "") + (a.scroll ||
                a.scrollX || a.scrollY || a.forceScroll ? "" : "overflow: hidden !important;") + (!0 === a.hide ? "opacity: 0;" : "") + '">', ((k, p) => {
                if (p) return `<div style="font-size:${a.Font}; font-weight:bold; color:${a.titleColor}">${a.title}</div>\n\t\t\t\t\t   <hr style="border:none; height:1px; background-color:rgba(0,0,0,0.1); margin:10px 0">\n\t\t\t\t\t   <div style="font-size:${a.font}; color:${a.color||"#000000"}">${k}</div>`;
                let x;
                k.includes("\n") ? x = k.split("\n", 2) : k.includes("<br>") && (x = k.split("<br>", 2));
                return x ? `<div style="font-size:${a.Font}; font-weight:bold; color:${a.titleColor}">${x[0]}</div>\n\t\t\t\t\t   <hr style="border:none; height:1px; background-color:rgba(0,0,0,0.1); margin:10px 0">\n\t\t\t\t\t   <div style="font-size:${a.font}; color:${a.color||
"#000000"}">${x[1]}</div>` : `<div style="font-size:${a.Font}; font-weight:bold; color:${a.titleColor}">${k}</div>`
            })(b, g), "</div>", '<div class="domquery-text-container" style="width: 100% !important;' + (a.scroll || a.scrollX || a.scrollY || a.forceScroll ? "" : "overflow: hidden !important;") + (!0 === a.hide ? "opacity: 0;" : "") + '">', t, "</div>", '<div style="width: 100% !important;' + (a.scroll || a.scrollX || a.scrollY || a.forceScroll ? "" : "overflow: hidden !important;") + (!0 === a.hide ? "opacity: 0;" : "") + '">', y, "</div>", '<div class="domquery-text-bottom-container" style="width: 100% !important;' +
            (a.scroll || a.scrollX || a.scrollY || a.forceScroll ? "" : "overflow: hidden !important;") + (!0 === a.hide ? "opacity: 0;" : "") + '">', G, "</div></div>", a.scroll || a.scrollX || a.scrollY || a.forceScroll ? "</div></div>" : "</div>", "</div>"
        ].join("");
        H = document.createElement("div");
        H.innerHTML = b;
        b = H.firstElementChild;
        b._elementInfos = v;
        H = a && "number" === typeof a.openSpeed ? a.openSpeed : l;
        a._closeSpeed = a && "number" === typeof a.closeSpeed ? a.closeSpeed : l;
        return {
            alertBox: b,
            options: a,
            speed: H,
            buttonConfigs: J
        }
    };
    $._alert1 = function(b, a, l,
        g, r) {
        function H(q) {
            b.contains(q.target) || q.preventDefault()
        }

        function L(q, d, f) {
            const c = E.getElement(d, ".alert-scroll-wrapper") || E.getElement(d, ".domquery-alert-body");
            if (c)
                if (50 < c.scrollHeight) $.AlertScrollManager.restorePosition(q, d, f);
                else {
                    const n = new MutationObserver(() => {
                        50 < c.scrollHeight && ($.AlertScrollManager.restorePosition(q, d, f), n.disconnect())
                    });
                    n.observe(c, {
                        childList: !0,
                        subtree: !0
                    })
                }
            else {
                const n = new MutationObserver(() => {
                    const m = E.getElement(d, ".alert-scroll-wrapper") || E.getElement(d, ".domquery-alert-body");
                    m && 50 < m.scrollHeight && ($.AlertScrollManager.restorePosition(q, d, f), n.disconnect())
                });
                n.observe(d, {
                    childList: !0,
                    subtree: !0
                })
            }
        }
        const A = b.getAttribute("data-instance-id");
        let F = !0;
        var w = () => {
            if (!a.parent) return document.body;
            if ("_blank" === a.parent) try {
                var q = "domquery-blank-container-" + A;
                let f = null,
                    c = 0;
                Array.from(document.querySelectorAll(".domquery-alert")).forEach(e => {
                    if (e.getAttribute("data-instance-id") !== A) {
                        const u = parseInt(getComputedStyle(e).zIndex);
                        !isNaN(u) && u > c && (c = u, f = e)
                    }
                });
                var d = a.zindex ||
                    2147483647;
                const n = d - 1 - 1;
                let m = document.getElementById(q);
                if (m) {
                    const e = a.zindex || 2147483647;
                    a.overlayZindex = e - 1;
                    a.zindex = e;
                    a.toastZindex = e
                } else {
                    m = document.createElement("div");
                    m.className = "domquery-blank-container";
                    m.id = q;
                    m.setAttribute("data-instance-id", A);
                    m.style.cssText = `\n\t\t\t\t\t\t\tposition: fixed;\n\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\t\twidth: 100vw;\n\t\t\t\t\t\t\theight: 100vh;\n\t\t\t\t\t\t\tpointer-events: none; /* \uae30\ubcf8\uc801\uc73c\ub85c\ub294 \uc774\ubca4\ud2b8 \ud1b5\uacfc */\n\t\t\t\t\t\t\tz-index: ${n};\n\t\t\t\t\t\t`;
                    document.body.appendChild(m);
                    b.setAttribute("data-blank-container-id", q);
                    b.style.position = "fixed";
                    b.style.pointerEvents = "auto";
                    b.style.setProperty("z-index", d.toString(), "important");
                    b.style.left = "0";
                    b.style.right = "0";
                    b.style.margin = "0 auto";
                    b.classList.add("domquery-independent-alert");
                    a.overlayZindex = d - 1;
                    a.zindex = d;
                    a.toastZindex = d;
                    b.style.setProperty("z-index", a.zindex.toString(), "important");
                    f && (a._parentAlert = f);
                    try {
                        window !== window.top && window.top.document.body.appendChild(m)
                    } catch (e) {}
                }
                return document.body
            } catch (f) {
                return document.body
            }
            if ("_self" ===
                a.parent) {
                let f = null,
                    c = 9998;
                Array.from(document.querySelectorAll(".domquery-alert")).forEach(n => {
                    if (n.getAttribute("data-instance-id") !== a.instanceId) {
                        const m = parseInt(getComputedStyle(n).zIndex);
                        !isNaN(m) && m > c && (c = m, f = n)
                    }
                });
                try {
                    a._preferredParentInstanceId && (q = document.querySelector(`.domquery-alert[data-instance-id="${a._preferredParentInstanceId}"]`)) && (f = q)
                } catch (n) {}
                if (f) {
                    a._parentAlert = f;
                    d = parseInt(getComputedStyle(f).zIndex) || 0;
                    !isNaN(d) && 0 < d ? (a.zindex = d + 2, a.overlayZindex = a.zindex - 1) : a.zindex &&
                        9999 !== a.zindex || (a.zindex = 9999, a.overlayZindex = a.zindex - 1);
                    if (d = f.getAttribute("data-instance-id")) a._parentInstanceId = d, b.setAttribute("data-parent-instance-id", d);
                    else try {
                        console.warn("[alert.js] _self alert \uc0dd\uc131 - \ubd80\ubaa8 instanceId\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c")
                    } catch (n) {}
                    return document.body
                }
                console.warn("[alert.js] _self alert \uc0dd\uc131 - \ubd80\ubaa8 alert\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc74c");
                return document.body
            }
            d = null;
            "string" === typeof a.parent ? a.parent.startsWith("#") ?
                (d = a.parent.substring(1), d = document.getElementById(d)) : d = document.querySelector(a.parent) : d = a.parent;
            if (!d) return document.body;
            d === document.body || d.classList.contains("domquery-alert") || "static" !== getComputedStyle(d).position || (d.style.position = "relative");
            return d
        };
        const t = w(),
            G = !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                isMobile: !1
            }).isMobile;
        (function() {
            if ("_self" === a.parent) {
                const d = b.querySelector('div[style*="overflow: auto"]');
                d && (d.addEventListener("wheel", f => {
                    f.stopPropagation();
                    d.scrollHeight > d.clientHeight && (f.preventDefault(), d.scrollTop += f.deltaY)
                }, {
                    passive: !1
                }), d.addEventListener("touchmove", f => {
                    const c = Math.abs(f.touches[0].clientX - (f.touches[0].target.getBoundingClientRect().left + f.touches[0].target.offsetWidth / 2)),
                        n = Math.abs(f.touches[0].clientY - (f.touches[0].target.getBoundingClientRect().top + f.touches[0].target.offsetHeight / 2));
                    c > 1.5 * n || f.stopPropagation()
                }, {
                    passive: !0
                }));
                var q = E.getElement(b, ".alert-scroll-wrapper");
                q && (q.addEventListener("wheel", f => {
                    f.target.closest('div[style*="overflow: auto"]') ||
                        f.stopPropagation()
                }, {
                    passive: !0
                }), q.addEventListener("touchmove", f => {
                    if (!f.target.closest('div[style*="overflow: auto"]')) {
                        var c = Math.abs(f.touches[0].clientX - (f.touches[0].target.getBoundingClientRect().left + f.touches[0].target.offsetWidth / 2)),
                            n = Math.abs(f.touches[0].clientY - (f.touches[0].target.getBoundingClientRect().top + f.touches[0].target.offsetHeight / 2));
                        c > 1.5 * n || f.stopPropagation()
                    }
                }, {
                    passive: !0
                }))
            } else if (q = Array.from(document.querySelectorAll(".domquery-alert")), 1 < q.length || "_blank" === a.parent &&
                0 < q.length) {
                const d = b.querySelector('div[style*="overflow: auto"]');
                d && (d.addEventListener("wheel", f => {
                    f.stopPropagation();
                    d.scrollHeight > d.clientHeight && (f.preventDefault(), d.scrollTop += f.deltaY)
                }, {
                    passive: !1
                }), d.addEventListener("touchmove", f => {
                    const c = Math.abs(f.touches[0].clientX - (f.touches[0].target.getBoundingClientRect().left + f.touches[0].target.offsetWidth / 2)),
                        n = Math.abs(f.touches[0].clientY - (f.touches[0].target.getBoundingClientRect().top + f.touches[0].target.offsetHeight / 2));
                    c > 1.5 * n || f.stopPropagation()
                }, {
                    passive: !0
                }));
                b.style.overflow = "auto";
                b.style.WebkitOverflowScrolling = "touch"
            } else if (!a.toast || a.toast && !1 !== a.background)
                if (G) {
                    document.body.style.overflow = "hidden";
                    document.documentElement.style.overflow = "hidden";
                    b.style.overflow = "auto";
                    b.style.WebkitOverflowScrolling = "touch";
                    document.addEventListener("touchmove", H, {
                        passive: !1
                    });
                    const d = b.querySelector('div[style*="overflow: auto"]');
                    d && (d.addEventListener("wheel", f => {
                        f.stopPropagation();
                        d.scrollHeight > d.clientHeight && (f.preventDefault(), d.scrollTop +=
                            f.deltaY)
                    }, {
                        passive: !1
                    }), d.addEventListener("touchmove", f => {
                        const c = Math.abs(f.touches[0].clientX - (f.touches[0].target.getBoundingClientRect().left + f.touches[0].target.offsetWidth / 2)),
                            n = Math.abs(f.touches[0].clientY - (f.touches[0].target.getBoundingClientRect().top + f.touches[0].target.offsetHeight / 2));
                        c > 1.5 * n || f.stopPropagation()
                    }, {
                        passive: !0
                    }))
                } else if (q = document.documentElement.scrollWidth > document.documentElement.clientWidth, document.documentElement.scrollHeight > document.documentElement.clientHeight ||
                q) b.wheelListener = d => {
                const f = d.target.closest('div[style*="overflow: auto"]');
                f ? (d.stopPropagation(), f.scrollHeight > f.clientHeight && (d.preventDefault(), f.scrollTop += d.deltaY)) : b.contains(d.target) || d.preventDefault()
            }, document.addEventListener("wheel", b.wheelListener, {
                passive: !1
            })
        })();
        if (!1 === a.autoscroll) {
            var v = a.id || "default-scroll-position";
            $.AlertScrollManager.positions[v] && delete $.AlertScrollManager.positions[v]
        } else if (a.autoscroll && !1 !== a.autoscroll) {
            const q = a._autoscrollId || a.id || "default-scroll-position";
            if ("object" === typeof a.autoscroll && null !== a.autoscroll) {
                v = a.autoscroll;
                const d = "number" === typeof v.duration ? v.duration : 300,
                    f = "number" === typeof v.offset ? v.offset : 20;
                let c = null;
                v.scrollKey ? c = b.querySelector(`[data-scroll-key="${v.scrollKey}"]`) : v.selector && (c = b.querySelector(v.selector));
                c && setTimeout(() => {
                    const m = E.getElement(b, ".alert-scroll-wrapper") || E.getElement(b, ".domquery-alert-body");
                    if (m && c) {
                        var e;
                        if ((e = E.getElement(b, ".alert-scroll-wrapper") || E.getElement(b, ".domquery-alert-body")) && c) {
                            if ("undefined" !==
                                typeof $ && $.fn && $.fn.offset) {
                                var u = $(c);
                                e = $(e);
                                u = u.offset().top;
                                e = e.offset().top
                            } else {
                                u = c.getBoundingClientRect();
                                const V = e.getBoundingClientRect();
                                u = u.top - V.top + e.scrollTop;
                                e = e.scrollTop
                            }
                            e = u - e - f
                        } else e = null;
                        null !== e && 0 <= e && $.AlertScrollManager.scrollTo(m, e, d)
                    }
                }, (a && "number" === typeof a.openSpeed ? a.openSpeed : 500) + 50);
                const n = () => {
                    $.AlertScrollManager.savePosition(q, b)
                };
                v = [E.getElement(b, ".alert-scroll-wrapper"), E.getElement(b, ".domquery-alert-body"), b.querySelector('div[style*="overflow: auto"]'),
                    b.querySelector('div[style*="overflow-y: auto"]'), b.querySelector('div[style*="overflow-y: scroll"]'), b
                ].filter(m => null !== m);
                v.forEach(m => {
                    m.addEventListener("scroll", n, {
                        passive: !0
                    })
                });
                b.scrollListener = n;
                b.scrollElements = v
            } else {
                const d = () => {
                    $.AlertScrollManager.savePosition(q, b)
                };
                v = [E.getElement(b, ".alert-scroll-wrapper"), E.getElement(b, ".domquery-alert-body"), b.querySelector('div[style*="overflow: auto"]'), b.querySelector('div[style*="overflow-y: auto"]'), b.querySelector('div[style*="overflow-y: scroll"]'),
                    b
                ].filter(f => null !== f);
                v.forEach(f => {
                    f.addEventListener("scroll", d, {
                        passive: !0
                    })
                });
                b.scrollListener = d;
                b.scrollElements = v
            }
        }
        let D = 0,
            J = 0,
            y = 0,
            k = 0,
            p = 0,
            x = !1,
            M = null,
            ha = 0,
            ta = 0,
            aa = 1,
            ia = 0,
            Aa = !1,
            Ea = null,
            Ca = !1,
            ua = !1,
            Da = 0,
            Fa = 0;
        if (void 0 !== a.LC || void 0 !== a.RC || void 0 !== a.TC || void 0 !== a.BC)
            if (!0 === a.swipe) {
                const q = void 0 !== a.LC ? "LC" : void 0 !== a.RC ? "RC" : void 0 !== a.TC ? "TC" : "BC";
                let d = E.getDocumentElement(".domquery-shadow-overlay"),
                    f = null,
                    c = null;
                const n = () => {
                    p = k = y = J = D = 0;
                    x = !1;
                    M = null;
                    ua = Ca = !1;
                    ta = ha = 0;
                    aa = 1;
                    b.style.transition =
                        "";
                    d && (d.style.transition = "")
                };
                (v = E.getElement(b, ".domquery-alert-close-btn") || E.getElement(b, ".domquery-close-x-btn")) && v.addEventListener("click", n);
                b.querySelectorAll(".domquery-alert-cancel-btn, .domquery-alert-confirm-btn").forEach(e => {
                    e.addEventListener("click", n)
                });

                function m() {
                    const e = b.scrollTop;
                    Aa = 1 < Math.abs(e - ia);
                    ia = e;
                    Aa && (x || Ca) && (x = !1, M = null, ua = Ca = !1, "LC" === q || "RC" === q ? b.style.left = `${ha}px` : b.style.top = `${ta}px`, "_self" === a.parent ? (f && (f.style.opacity = aa), c && c.initialOpacity && (c.style.opacity =
                        c.initialOpacity)) : d && (d.style.opacity = aa))
                }
                b.addEventListener("scroll", () => {
                    m();
                    Aa && (x = !1, M = null, ua = Ca = !1, b.style.left = `${ha}px`, d && (d.style.opacity = aa))
                }, {
                    passive: !0
                });
                b.addEventListener("touchstart", e => {
                    if (!e.target.closest(".editor-wrapper") && !e.target.closest(".domquery-alert-close-btn, .domquery-close-x-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn") && !F) {
                        var u = Array.from(document.querySelectorAll(".domquery-alert"));
                        if (u.findIndex(V => V.getAttribute("data-instance-id") === a.instanceId) ===
                            u.length - 1)
                            if (D = e.touches[0].clientX, J = e.touches[0].clientY, y = Date.now(), x = !1, M = null, ua = Ca = !1, p = k = 0, e = b.getBoundingClientRect(), ha = e.left, ta = e.top, "_self" === a.parent) {
                                if (f = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`), e = parseInt(a.instanceId) - 1, c = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${e}"]`)) c.initialOpacity = parseFloat(h.getComputedStyle(c).opacity)
                            } else(d = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`)) &&
                                (aa = parseFloat(h.getComputedStyle(d).opacity))
                    }
                }, {
                    passive: !0
                });
                b.addEventListener("touchmove", e => {
                    if (!e.target.closest(".editor-wrapper") && (e.stopPropagation(), !e.target.closest(".domquery-alert-close-btn, .domquery-close-x-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn") && !F)) {
                        var u = e.target.closest(".domquery-alert").getAttribute("data-instance-id");
                        if (!1 !== z.options[u]?.swipe) {
                            u = e.touches[0];
                            var V = u.clientX - D,
                                Y = u.clientY - J;
                            k = V;
                            p = Y;
                            if (!Aa) {
                                u = void 0 !== a.LC ? "LC" : void 0 !== a.RC ? "RC" : void 0 !==
                                    a.TC ? "TC" : "BC";
                                if (!x && (8 < Math.abs(V) || 8 < Math.abs(Y)) && e.cancelable && null === M) {
                                    var N = Math.abs(V),
                                        B = Math.abs(Y);
                                    const da = 20 < N + B ? 1.3 : 2;
                                    switch (u) {
                                        case "LC":
                                            0 > V && N > B * da && (x = Ca = M = !0, 20 < N && (e.preventDefault(), ua = !0));
                                            break;
                                        case "RC":
                                            0 < V && N > B * da && (x = Ca = M = !0, 20 < N && (e.preventDefault(), ua = !0));
                                            break;
                                        case "TC":
                                            0 > Y && B > N * da && (M = !1, x = Ca = !0, 20 < B && (e.preventDefault(), ua = !0));
                                            break;
                                        case "BC":
                                            0 < Y && B > N * da && (M = !1, x = Ca = !0, 20 < B && (e.preventDefault(), ua = !0))
                                    }
                                }
                                Ca && !ua && e.cancelable && (N = Math.abs(V), B = Math.abs(Y), 20 < (M ? N : B) &&
                                    (e.preventDefault(), ua = !0));
                                Ca && (e.stopPropagation(), e = b.offsetWidth, N = b.offsetHeight, B = 1 * ("LC" === u || "RC" === u ? e : N), e = V, N = Y, M ? (N = 0, "LC" === u ? e = Math.max(-B, Math.min(0, V)) : "RC" === u && (e = Math.min(B, Math.max(0, V)))) : (e = 0, "TC" === u ? N = Math.max(-B, Math.min(0, Y)) : "BC" === u && (N = Math.min(B, Math.max(0, Y)))), b.style.transform = "LC" === u || "RC" === u ? `translate3d(${e}px, -50%, 0)` : `translate3d(-50%, ${N}px, 0)`, V = "LC" === u || "RC" === u ? Math.abs(e) / B : Math.abs(N) / B, "_self" === a.parent ? (f && (f.style.opacity = aa - aa * V), c && (c.style.opacity =
                                    c.initialOpacity + (1 - c.initialOpacity) * V)) : d && (d.style.opacity = aa - aa * V), z.options[a.instanceId]?.swipeCallback && "function" === typeof z.options[a.instanceId].swipeCallback && (Y = Date.now(), B = "LC" === u || "RC" === u ? Math.abs(e) / Math.max(Y - y, 1) : Math.abs(N) / Math.max(Y - y, 1), u = {
                                    direction: u.toLowerCase(),
                                    velocity: B,
                                    timeElapsed: Y - y,
                                    progress: V,
                                    deltaX: e,
                                    deltaY: N,
                                    instanceId: a.instanceId,
                                    phase: "progress"
                                }, z.options[a.instanceId].swipeCallback(u)))
                            }
                        }
                    }
                }, {
                    passive: !1
                });
                b.addEventListener("touchend", e => {
                    if (!e.target.closest(".editor-wrapper") &&
                        Ca && !F)
                        if (Ea && (cancelAnimationFrame(Ea), Ea = null), e.stopPropagation(), m(), Aa) b.style.transition = `all ${l}ms`, "LC" === q || "RC" === q ? b.style.left = `${ha}px` : b.style.top = `${ta}px`, "_self" === a.parent ? (f && (f.style.transition = `opacity ${l}ms`, f.style.opacity = aa), c && c.initialOpacity && (c.style.transition = `opacity ${l}ms`, c.style.opacity = c.initialOpacity)) : d && (d.style.transition = `opacity ${l}ms`, d.style.opacity = aa);
                        else {
                            e = Date.now() - y;
                            var u = "LC" === q || "RC" === q ? Math.abs(k) / Math.max(e, 1) : Math.abs(p) / Math.max(e, 1);
                            Da = u;
                            Fa = e;
                            if (.5 < u) {
                                b.timeoutId && (clearTimeout(b.timeoutId), b.timeoutId = null);
                                a.timeOut && (a.timeOut = null);
                                b._elementInfos && b._elementInfos.forEach(N => {
                                    if (N.element) try {
                                        N.nextSibling ? N.parent.insertBefore(N.element, N.nextSibling) : N.parent.appendChild(N.element), N.element.style.display = N.originalDisplay
                                    } catch (B) {}
                                });
                                x = !1;
                                M = null;
                                ta = ha = p = k = y = J = D = 0;
                                aa = 1;
                                const V = .5 < u ? Math.max(Math.floor(e / 2), 600) : Math.max(e, 600),
                                    Y = document.querySelectorAll(`.domquery-${a.toast?"toast":"shadow"}-overlay[data-instance-id="${a.instanceId}"]`);
                                Y.forEach(N => {
                                    N.style.transition = `opacity ${V}ms linear`;
                                    N.style.opacity = "0"
                                });
                                b.style.transition = `all ${V}ms ease-out`;
                                switch (q) {
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
                                P.setTimeoutRAF(() => {
                                    Y.forEach(N => {
                                        N && N.parentNode && N.parentNode.removeChild(N)
                                    });
                                    P.setTimeoutRAF(() => {
                                        la(q.toLowerCase(), !0, 0, "swipe")
                                    }, 100)
                                }, V)
                            } else {
                                b.style.transition = "all 300ms";
                                switch (q) {
                                    case "LC":
                                    case "RC":
                                        b.style.left = `${ha}px`;
                                        b.style.transform = "translate(0, -50%)";
                                        break;
                                    case "TC":
                                    case "BC":
                                        b.style.top = `${ta}px`, b.style.transform = "translate(-50%, 0)"
                                }
                                "_self" === a.parent ? (f && (f.style.transition = "opacity 300ms", f.style.opacity = aa), c && c.initialOpacity && (c.style.transition = "opacity 300ms", c.style.opacity = c.initialOpacity)) : d && (d.style.transition = "opacity 300ms", d.style.opacity = aa);
                                P.setTimeoutRAF(() => {
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
                    x && (x = !1, b.style.overflow = "auto", b.style.willChange = "auto")
                }, {
                    passive: !0
                })
            } else b.addEventListener("touchmove", q => {
                const d = q.target.closest('.alert-scroll-wrapper, [style*="overflow: auto"], [id="chat-output"], [style*="overflow-y:auto"]');
                a.forceScroll || a.scrollY || d && (a.scroll || a.scrollY || a.scrollX) ? q.stopPropagation() : q.preventDefault()
            }, {
                passive: !1
            });
        createAlertContext = (q, d = [], f = "default") => ({
            totalResults: d,
            arr: d,
            element: b,
            el: b,
            closeType: f,
            focus: c => {
                const n =
                    b.querySelectorAll("input");
                n[c] && n[c].focus()
            },
            close: function(c = "xclose") {
                this._closeWasCalled = !0;
                this._closeTypeParam = c;
                if (this._functionCallbackExecuting) return !0;
                try {
                    if ("_self" === a.parent) {
                        const n = E.getElement(b, ".domquery-close-x-btn") || E.getElement(b, ".domquery-alert-close-btn");
                        n ? n.click() : la(c, !0, 0, "function")
                    } else la(c, !0, 0, "function")
                } catch (n) {
                    try {
                        const m = E.getElement(b, ".domquery-close-x-btn") || E.getElement(b, ".domquery-alert-close-btn");
                        m && m.click()
                    } catch (m) {
                        console.error("[close] \uc5d0\ub7ec:",
                            m)
                    }
                }
                return !0
            },
            setLoading: (c, n = 0, m) => {
                const e = b.querySelector(".domquery-alert-loading");
                e ? 0 < n ? setTimeout(() => {
                    e.style.display = c ? "flex" : "none";
                    "function" === typeof m && m()
                }, n) : (e.style.display = c ? "flex" : "none", "function" === typeof m && m()) : "function" === typeof m && m()
            },
            disableParentScroll: function(c) {
                b._scrollPosition = {
                    x: h.pageXOffset || document.documentElement.scrollLeft,
                    y: h.pageYOffset || document.documentElement.scrollTop
                };
                c ? c.split(",").map(n => n.trim()).forEach(n => {
                    "body" === n || "html" === n ? (document.body.style.cssText +=
                        "overflow: hidden !important;", document.documentElement.style.cssText += "overflow: hidden !important;") : document.querySelectorAll(n).forEach(m => {
                        m._originalOverflow = m.style.overflow;
                        m._originalPosition = m.style.position;
                        m.style.cssText += "overflow: hidden !important;"
                    })
                }) : (document.body.style.cssText += "overflow: hidden !important;", document.documentElement.style.cssText += "overflow: hidden !important;");
                !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                    isIOS: !1
                }).isIOS && (document.body.style.position =
                    "fixed", document.body.style.width = "100%", document.body.style.top = `-${b._scrollPosition.y}px`);
                return this
            },
            enableParentScroll: function(c) {
                c ? c.split(",").map(n => n.trim()).forEach(n => {
                        "body" === n || "html" === n ? (document.body.style.overflow = "", document.documentElement.style.overflow = "") : document.querySelectorAll(n).forEach(m => {
                            void 0 !== m._originalOverflow && (m.style.overflow = m._originalOverflow, delete m._originalOverflow);
                            void 0 !== m._originalPosition && (m.style.position = m._originalPosition, delete m._originalPosition)
                        })
                    }) :
                    (document.body.style.overflow = "", document.documentElement.style.overflow = "");
                !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                    isIOS: !1
                }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "");
                if (c = b._scrollPosition) h.scrollTo(c.x, c.y), delete b._scrollPosition;
                return this
            },
            controlElementScroll: function(c, n) {
                c && ("disable" === n ? (c._savedOverflow = c.style.overflow, c._savedScrollTop = c.scrollTop, c.style.overflow = "hidden") : "enable" === n && (c.style.overflow = c._savedOverflow ||
                    "auto", void 0 !== c._savedScrollTop && (c.scrollTop = c._savedScrollTop)))
            },
            next: (c, n, m = 400, e, u, V) => {
                let Y = null;
                const N = "CC TC LC RC BC RL LR TB BT".split(" ");
                "function" === typeof n ? (V = m, u = n, m = 400, n = null) : "number" === typeof n ? ("function" === typeof m ? (V = u, u = m) : "string" === typeof m && N.includes(m) && (Y = m, "function" === typeof e && (V = u, u = e)), m = n, n = null) : "function" === typeof m ? (V = u, u = m, m = 400) : "string" === typeof m && N.includes(m) ? (Y = m, "function" === typeof e && (V = u, u = e), m = 400) : "number" === typeof m && "string" === typeof e && N.includes(e) &&
                    (Y = e);
                this.totalResults || (this.totalResults = {});
                e = a._currentStepKey || "first";
                n && (Array.isArray(n) || "" !== n) && (this.totalResults[e] = n);
                a._nextStepKey = "" === c ? "first" : c;
                let B;
                if ((B = "" === c ? a._originalFirstStepOptions || {} : a[c]) && "object" === typeof B) {
                    var da = this.totalResults ? {
                            ...this.totalResults
                        } : {},
                        U = document.querySelector(`.domquery-alert[data-instance-id="${a.instanceId}"]`);
                    a._stepInputValues || (a._stepInputValues = {});
                    if (U) {
                        n = a._currentStepKey || "first";
                        const xa = {};
                        U.querySelectorAll("input, textarea, select").forEach((R,
                            ma) => {
                            xa[ma] = "checkbox" === R.type || "radio" === R.type ? R.checked : R.value
                        });
                        0 < Object.keys(xa).length && (a._stepInputValues[n] = xa)
                    }
                    U ? P.setTimeoutRAF(() => {
                        a._hasNext = !0;
                        var xa = {};
                        for (var R in a) a[R] && "object" === typeof a[R] && !Array.isArray(a[R]) && "_originalFirstStepOptions" !== R && "_hasNext" !== R && "instanceId" !== R && "_stepInputValues" !== R && "_currentStepKey" !== R && (xa[R] = a[R]);
                        Object.assign(a, B, xa, {
                            function: function(fa) {
                                this.arr = this.totalResults = {
                                    ...da
                                };
                                fa && (Array.isArray(fa) || "" !== fa) && (this.totalResults[c || "first"] =
                                    fa, this.arr = {
                                        ...this.totalResults
                                    });
                                if (B.function) return this._functionCallbackExecuting = !0, fa = B.function.call(this, fa), this._functionCallbackExecuting = !1, fa
                            }
                        });
                        const ma = U.querySelector(".domquery-alert-body"),
                            ba = U.querySelector(".domquery-text-container"),
                            Ja = (fa, W, Q) => {
                                ma && void 0 !== fa && (ma.innerHTML = fa);
                                ba && void 0 !== W && (ba.innerHTML = W);
                                (fa = U.querySelector(".domquery-text-bottom-container")) && void 0 !== Q && (fa.innerHTML = Q);
                                const I = "" === c ? "first" : c;
                                a._stepInputValues && a._stepInputValues[I] && setTimeout(() => {
                                    const oa = U.querySelectorAll("input, textarea, select"),
                                        Z = a._stepInputValues[I];
                                    Z && oa.forEach((na, X) => {
                                        void 0 !== Z[X] && ("checkbox" === na.type || "radio" === na.type ? na.checked = Z[X] : na.value = Z[X])
                                    })
                                }, 10);
                                a._currentStepKey = a._nextStepKey || ("" === c ? "first" : c)
                            },
                            Ka = (fa, W = !1) => {
                                if (!(!fa || ma.contains(fa) || ba && ba.contains(fa))) {
                                    var Q = fa.querySelector(".domquery-alert-close-btn");
                                    if (Q) {
                                        if (W) {
                                            var I = B.$Okhover || a.$Okhover || "opacity: 1;",
                                                oa = ["padding: 6px 10px;", "background: " + (B.$OkBgcolor || B.OkBgcolor || a.$OkBgcolor ||
                                                    a.OkBgcolor || "#E0E0E0") + ";", "color: " + (B.$OkColor || B.OkColor || a.$OkColor || a.OkColor || "#000000") + ";", "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;", B.$OkStyle || a.$OkStyle || ""].join("");
                                            Q.style.cssText = oa;
                                            Q.setAttribute("onmouseover", "this.style.cssText = `" + oa + "; " + I + "`");
                                            Q.setAttribute("onmouseout", "this.style.cssText = `" + oa + "`");
                                            Q.offsetHeight
                                        }
                                        if (void 0 !== B.$Ok || void 0 !== a.$Ok) Q.textContent = B.$Ok || a.$Ok
                                    }
                                    if (Q = fa.querySelector(".alert-cancel-btn, .domquery-alert-cancel-btn"))
                                        if (W &&
                                            (W = B.$cancelhover || a.$cancelhover || "opacity: 1;", I = ["padding: 6px 10px;", "background: " + (B.$cancelBgcolor || B.cancelBgcolor || a.$cancelBgcolor || a.cancelBgcolor || "#e74c3c") + ";", "color: " + (B.$cancelColor || B.cancelColor || a.$cancelColor || a.cancelColor || "#FFFFFF") + ";", "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;", B.$cancelStyle || a.$cancelStyle || ""].join(""), Q.style.cssText = I, Q.setAttribute("onmouseover", "this.style.cssText = `" + I + "; " +
                                                W + "`"), Q.setAttribute("onmouseout", "this.style.cssText = `" + I + "`")), void 0 !== B.$cancel || void 0 !== a.$cancel) Q.textContent = B.$cancel || a.$cancel;
                                    var Z = fa.querySelector(".alert-prev-btn");
                                    if (void 0 !== B.$prev && !1 !== B.$prev || void 0 !== a.$prev && !1 !== a.$prev)
                                        if (W = B.$prevhover || a.$prevhover || "opacity: 1;", I = ["padding: 6px 10px;", "background: " + (B.$prevBgcolor || a.$prevBgcolor || "#95a5a6") + ";", "color: " + (B.$prevColor || a.$prevColor || "#FFFFFF") + ";", "border: none;border-radius: 3px;cursor: pointer;opacity: 0.9;font-size:0.9em;transition: all 0.2s;margin-left: 10px;",
                                                B.$prevStyle || a.$prevStyle || ""
                                            ].join(""), oa = na => {
                                                B.prev && "function" === typeof B.prev ? na.onclick = function() {
                                                    const X = createAlertContext("prev", [], "button");
                                                    X.close = function(C = "xclose") {
                                                        la(C, !0, 0, "button")
                                                    };
                                                    B.prev.call(X)
                                                } : a.prev && "function" === typeof a.prev && (na.onclick = function() {
                                                    const X = createAlertContext("prev", [], "button");
                                                    X.close = function(C = "xclose") {
                                                        la(C, !0, 0, "button")
                                                    };
                                                    a.prev.call(X)
                                                })
                                            }, Z) {
                                            Z.style.cssText = I;
                                            Z.setAttribute("onmouseover", "this.style.cssText = `" + I + "; " + W + "`");
                                            Z.setAttribute("onmouseout",
                                                "this.style.cssText = `" + I + "`");
                                            if (void 0 !== B.$prev || void 0 !== a.$prev) Z.textContent = B.$prev || a.$prev;
                                            oa(Z)
                                        } else Z = document.createElement("button"), Z.className = "alert-prev-btn", Z.style.cssText = I, Z.setAttribute("onmouseover", "this.style.cssText = `" + I + "; " + W + "`"), Z.setAttribute("onmouseout", "this.style.cssText = `" + I + "`"), Z.textContent = B.$prev || a.$prev || "\uc774\uc804", oa(Z), Q ? fa.insertBefore(Z, Q) : fa.appendChild(Z);
                                    else Z && Z.parentNode && Z.parentNode.removeChild(Z)
                                }
                            };
                        if (ma) {
                            const fa = ((O, S) => {
                                    if (S) return `<div style="font-size:${a.Font||
"16px"}; font-weight:bold; color:${a.titleColor||"#000000"}">${a.title}</div>\n\t\t\t\t\t\t\t\t\t\t   <hr style="border:none; height:1px; background-color:rgba(0,0,0,0.1); margin:10px 0">\n\t\t\t\t\t\t\t\t\t\t   <div style="font-size:${a.font||"14px"}; color:${a.color||"#000000"}">${O}</div>`;
                                    let K;
                                    O.includes("\n") ? K = O.split("\n", 2) : O.includes("<br>") && (K = O.split("<br>", 2));
                                    return K ? `<div style="font-size:${a.Font||"16px"}; font-weight:bold; color:${a.titleColor||"#000000"}">${K[0]}</div>\n\t\t\t\t\t\t\t\t\t\t   <hr style="border:none; height:1px; background-color:rgba(0,0,0,0.1); margin:10px 0">\n\t\t\t\t\t\t\t\t\t\t   <div style="font-size:${a.font||
"14px"}; color:${a.color||"#000000"}">${K[1]}</div>` : `<div style="font-size:${a.Font||"16px"}; font-weight:bold; color:${a.titleColor||"#000000"}">${O}</div>`
                                })(B.message || a.message || "", "" !== a.title),
                                W = (() => {
                                    const O = void 0 !== B.text ? B.text : a.text;
                                    if (!O) return "";
                                    if ("string" === typeof O) return O;
                                    if ("function" === typeof O) try {
                                        const S = O();
                                        if ("string" === typeof S) return S;
                                        if (S instanceof Element) return S.outerHTML
                                    } catch (S) {}
                                    return ""
                                })(),
                                Q = (() => {
                                    const O = B.textBottom;
                                    if (void 0 === O || !O) return "";
                                    if ("string" ===
                                        typeof O) return O;
                                    if ("function" === typeof O) try {
                                        const S = O();
                                        if ("string" === typeof S) return S;
                                        if (S instanceof Element) return S.outerHTML
                                    } catch (S) {}
                                    return ""
                                })(),
                                I = O => {
                                    if (void 0 === O) return "auto";
                                    if ("number" === typeof O) return O + "px";
                                    if ("string" === typeof O) {
                                        if (/px|%|vh|vw|rem|em|ch|ex|cm|mm|in|pt|pc/i.test(O)) return O;
                                        const S = parseFloat(O);
                                        if (!isNaN(S)) return S + "px"
                                    }
                                    return O
                                },
                                oa = (O, S, K, ra) => {
                                    K = Object.assign({}, a, S);
                                    if (void 0 !== S.bgcolor || void 0 !== a.bgcolor) O.style.background = K.bgcolor;
                                    if (void 0 !== S.radius ||
                                        void 0 !== a.radius) O.style.borderRadius = K.radius;
                                    if (void 0 !== S.border || void 0 !== a.border) O.style.border = K.border || "none";
                                    if (void 0 !== S.borderWidth || void 0 !== a.borderWidth) O.style.borderWidth = K.borderWidth || "";
                                    if (void 0 !== S.borderStyle || void 0 !== a.borderStyle) O.style.borderStyle = K.borderStyle || "";
                                    if (void 0 !== S.borderColor || void 0 !== a.borderColor) O.style.borderColor = K.borderColor || "";
                                    if (void 0 !== S.shadowBox || void 0 !== a.shadowBox) !1 === K.shadowBox ? O.style.boxShadow = "none" : "string" === typeof K.shadowBox ?
                                        O.style.boxShadow = K.shadowBox : "transparent" !== K.bgcolor && (O.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)");
                                    if (void 0 !== S.opacity || void 0 !== a.opacity) O.style.opacity = "number" === typeof K.opacity ? String(K.opacity) : "1";
                                    if (void 0 !== S.margin || void 0 !== a.margin) O.style.margin = K.margin || "0";
                                    if (void 0 !== S.padding || void 0 !== a.padding) {
                                        ra = "0" === K.padding ? "0" : I(K.padding);
                                        const pa = O.querySelector(".alert-scroll-wrapper") || O.querySelector(".domquery-alert-body")?.parentElement;
                                        pa && (pa.style.padding = ra)
                                    }
                                    if (void 0 !==
                                        S.minWidth || void 0 !== a.minWidth) O.style.minWidth = K.minWidth ? I(K.minWidth) : "";
                                    if (void 0 !== S.maxWidth || void 0 !== a.maxWidth) O.style.maxWidth = K.maxWidth ? I(K.maxWidth) : "";
                                    if (void 0 !== S.minHeight || void 0 !== a.minHeight) O.style.minHeight = K.minHeight ? I(K.minHeight) : "";
                                    if (void 0 !== S.maxHeight || void 0 !== a.maxHeight) O.style.maxHeight = K.maxHeight ? I(K.maxHeight) : ""
                                },
                                Z = Math.max(U.offsetWidth, 1) + "px",
                                na = Math.max(U.offsetHeight, 1) + "px",
                                X = getComputedStyle(U).width,
                                C = getComputedStyle(U).height;
                            let ca = X,
                                T = C;
                            void 0 !==
                                B.width && (ca = I(B.width));
                            void 0 !== B.height && (T = I(B.height));
                            const ea = ca !== X || T !== C;
                            xa = m || 400;
                            if (Y) {
                                const O = (pa, qa, ya = !1) => {
                                    const Ba = ya ? -1 : 1;
                                    return "CC" === pa ? `scale(${ya?1-qa:qa})` : "LC" === pa ? `translate3d(${Ba*(ya?100*qa:100*(1-qa))}%, 0, 0)` : "RC" === pa ? `translate3d(${Ba*(ya?100*-qa:100*-(1-qa))}%, 0, 0)` : "TC" === pa ? `translate3d(0, ${Ba*(ya?100*qa:100*(1-qa))}%, 0)` : "BC" === pa ? `translate3d(0, ${Ba*(ya?100*-qa:100*-(1-qa))}%, 0)` : "RL" === pa ? `translate3d(${Ba*(ya?100*-qa:100*-(1-qa))}%, 0, 0)` : "LR" === pa ? `translate3d(${Ba*
(ya?100*qa:100*(1-qa))}%, 0, 0)` : "TB" === pa ? `translate3d(0, ${Ba*(ya?100*qa:100*(1-qa))}%, 0)` : "BT" === pa ? `translate3d(0, ${Ba*(ya?100*-qa:100*-(1-qa))}%, 0)` : "translate3d(0, 0, 0)"
                                };
                                if (ea) {
                                    R = Math.max(parseFloat(Z), 1);
                                    const pa = Math.max(parseFloat(na), 1);
                                    U.style.width = R + "px";
                                    U.style.height = pa + "px";
                                    U.style.minWidth = R + "px";
                                    U.style.minHeight = pa + "px";
                                    U.style.maxWidth = R + "px";
                                    U.style.maxHeight = pa + "px";
                                    U.style.boxSizing = "border-box";
                                    U.offsetWidth;
                                    U.offsetHeight
                                }
                                ma.style.willChange = "transform, opacity";
                                ma.style.backfaceVisibility =
                                    "hidden";
                                ma.style.transition = "none";
                                ma.style.transform = "translate3d(0, 0, 0)";
                                ma.style.opacity = "1";
                                ba && (ba.style.willChange = "transform, opacity", ba.style.backfaceVisibility = "hidden", ba.style.transition = "none", ba.style.transform = "translate3d(0, 0, 0)", ba.style.opacity = "1");
                                "CC" === Y && (ma.style.transformOrigin = "center center", ba && (ba.style.transformOrigin = "center center"));
                                R = U.querySelectorAll(".domquery-alert-close-btn, .alert-cancel-btn, .alert-confirm-btn, .alert-prev-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn");
                                let S = null;
                                0 < R.length && (S = R[0].parentElement, !S || ma.contains(S) || ba && ba.contains(S) || (S.style.willChange = "transform, opacity", S.style.backfaceVisibility = "hidden", S.style.transition = "none", S.style.transform = "translate3d(0, 0, 0)", S.style.opacity = "1"));
                                ma.offsetHeight;
                                ba && ba.offsetHeight;
                                const K = .5 * xa,
                                    ra = .5 * xa;
                                requestAnimationFrame(() => {
                                    const pa = performance.now(),
                                        qa = ya => {
                                            ya = Math.min((ya - pa) / K, 1);
                                            const Ba = 1 - Math.pow(1 - ya, 3);
                                            ma.style.transform = O(Y, Ba, !0);
                                            ma.style.opacity = String(1 - Ba);
                                            ba && (ba.style.transform =
                                                O(Y, Ba, !0), ba.style.opacity = String(1 - Ba));
                                            S && (S.style.transform = O(Y, Ba, !0), S.style.opacity = String(1 - Ba));
                                            if (1 > ya) requestAnimationFrame(qa);
                                            else {
                                                Ja(fa, W, Q);
                                                ya = U.querySelectorAll(".domquery-alert-close-btn, .alert-cancel-btn, .alert-confirm-btn, .alert-prev-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn");
                                                let wa = null;
                                                0 < ya.length && (wa = ya[0].parentElement, Ka(wa, !1), !wa || ma.contains(wa) || ba && ba.contains(wa) || (wa.style.willChange = "transform, opacity", wa.style.backfaceVisibility = "hidden", wa.style.transition =
                                                    "none", wa.style.transform = O(Y, 0, !1), wa.style.opacity = "0"));
                                                ma.style.transform = O(Y, 0, !1);
                                                ma.style.opacity = "0";
                                                ba && (ba.style.transform = O(Y, 0, !1), ba.style.opacity = "0");
                                                oa(U, B, ca || X, T || C);
                                                ma.offsetHeight;
                                                ba && ba.offsetHeight;
                                                requestAnimationFrame(() => {
                                                    if (ea) {
                                                        const Ga = parseFloat(Z);
                                                        var Ma = parseFloat(na),
                                                            Na = ca,
                                                            La = T,
                                                            Ia = !1;
                                                        "auto" === T && (La = U.style.height, U.style.height = "auto", Ia = U.offsetHeight, U.style.height = La || Ma + "px", La = Ia + "px", Ia = !0);
                                                        "auto" === ca && (Ma = U.style.width, U.style.width = "auto", Na = U.offsetWidth,
                                                            U.style.width = Ma || Ga + "px", Na += "px", Ia = !0);
                                                        U.style.transition = `width ${ra}ms ease-out, height ${ra}ms ease-out`;
                                                        U.offsetWidth;
                                                        ca !== X && (U.style.width = Na);
                                                        T !== C && (U.style.height = La);
                                                        Ia && setTimeout(() => {
                                                            "auto" === ca && (U.style.width = "auto");
                                                            "auto" === T && (U.style.height = "auto");
                                                            U.style.transition = ""
                                                        }, ra)
                                                    }
                                                    U.offsetHeight;
                                                    const Pa = performance.now(),
                                                        Oa = Ga => {
                                                            Ga = Math.min((Ga - Pa) / ra, 1);
                                                            const Ha = 1 - Math.pow(1 - Ga, 3);
                                                            ma.style.transform = O(Y, Ha, !1);
                                                            ma.style.opacity = String(Ha);
                                                            ba && (ba.style.transform = O(Y, Ha, !1), ba.style.opacity =
                                                                String(Ha));
                                                            wa && (wa.style.transform = O(Y, Ha, !1), wa.style.opacity = String(Ha));
                                                            1 > Ga ? requestAnimationFrame(Oa) : (ma.style.willChange = "auto", ma.style.backfaceVisibility = "", ma.style.transition = "", ma.style.transform = "", ma.style.opacity = "", "CC" === Y && (ma.style.transformOrigin = ""), ba && (ba.style.willChange = "auto", ba.style.backfaceVisibility = "", ba.style.transition = "", ba.style.transform = "", ba.style.opacity = "", "CC" === Y && (ba.style.transformOrigin = "")), S && (S.style.willChange = "auto", S.style.backfaceVisibility = "", S.style.transition =
                                                                "", S.style.transform = "", S.style.opacity = ""), wa && (wa.style.willChange = "auto", wa.style.backfaceVisibility = "", wa.style.transition = "", wa.style.transform = "", wa.style.opacity = ""), ea && (U.style.transition = ""), "function" === typeof u && u(this))
                                                        };
                                                    requestAnimationFrame(Oa)
                                                })
                                            }
                                        };
                                    requestAnimationFrame(qa)
                                })
                            } else ea && (ca !== X && (U.style.width = ca), T !== C && (U.style.height = T)), oa(U, B, ca || X, T || C), Ja(fa, W, Q), xa = U.querySelectorAll(".domquery-alert-close-btn, .alert-cancel-btn, .alert-confirm-btn, .alert-prev-btn, .domquery-alert-cancel-btn, .domquery-alert-confirm-btn"),
                                0 < xa.length && Ka(xa[0].parentElement, !1), "function" === typeof u && u(this)
                        } else "function" === typeof u && u(this)
                    }, 0) : "function" === typeof V && V(Error("Current alert box not found"))
                } else "function" === typeof V && V(Error(`Next options not found for key: ${c}`))
            }
        });
        const va = !Object.entries(a).some(([q, d]) => "CC TC LC RC BC TL TR BL BR".split(" ").includes(q) && void 0 !== d);
        let za;
        if (va && r) {
            w = w();
            v = w.getBoundingClientRect();
            let q = r.clientX,
                d = r.clientY,
                f, c;
            if ("_self" === a.parent) {
                if (v = a._parentAlert || (() => {
                        const e = Array.from(document.querySelectorAll(".domquery-alert"));
                        for (let u = e.length - 1; 0 <= u; u--)
                            if (e[u].getAttribute("data-instance-id") !== a.instanceId) return e[u];
                        return null
                    })()) v = v.getBoundingClientRect(), q = r ? r.clientX : v.left + v.width / 2, d = r ? r.clientY : v.top + v.height / 2;
                f = h.innerWidth / 2;
                c = h.innerHeight / 2;
                b.style.position = "fixed"
            } else w !== document.body ? (b.style.position = "absolute", q -= v.left, d -= v.top, f = v.width / 2, c = v.height / 2) : (f = h.innerWidth / 2, c = h.innerHeight / 2, b.style.position = "fixed");
            b.style.left = q + "px";
            b.style.top = d + "px";
            b.style.transform = "translate(-50%, -50%) scale(0)";
            b.style.opacity = String("number" === typeof a.opacity ? a.opacity : 1);
            w.appendChild(b);
            const n = performance.now(),
                m = e => {
                    e = Math.min((e - n) / l, 1);
                    if (a.easing) {
                        [u] = a.easing.split(",").map(N => N.trim());
                        var u = $._anieasing(0, 1, e, u)
                    } else u = e;
                    const V = d + (c - d) * u,
                        Y = "number" === typeof a.opacity ? a.opacity : 1;
                    b.style.left = q + (f - q) * u + "px";
                    b.style.top = V + "px";
                    b.style.transform = `translate(-50%, -50%) scale(${u})`;
                    b.style.opacity = String(Y + (1 - Y) * u);
                    if (1 > e) requestAnimationFrame(m);
                    else if (F = !1, b.style.opacity = 1, a.onOpen && "function" ===
                        typeof a.onOpen) {
                        e = createAlertContext(null, [], "open");
                        a.onOpen.call(e, b);
                        if (!0 === a.scrollY || !0 === a.forceScroll)
                            if (e = E.getElement(b, ".alert-scroll-wrapper")) e.style.overflow = "hidden auto", e.style.webkitOverflowScrolling = "touch", e.style.touchAction = "pan-y", b.querySelectorAll('[id="chat-output"], [style*="overflow-y:auto"]').forEach(N => {
                                N.style.overflow = "auto";
                                N.style.overflowY = "auto";
                                N.style.webkitOverflowScrolling = "touch";
                                N.style.touchAction = "pan-y"
                            });
                        if (!0 === a.noScrollRestore) {
                            const N = E.getElement(b,
                                ".alert-scroll-wrapper") || E.getElement(b, ".domquery-alert-body");
                            if (N) {
                                N.scrollTop = 0;
                                e = (a && "number" === typeof a.openSpeed ? a.openSpeed : l) || 500;
                                let B = !1;
                                const da = () => {
                                    B || (N.scrollTop = 0, requestAnimationFrame(da))
                                };
                                requestAnimationFrame(da);
                                setTimeout(() => {
                                    B = !0
                                }, e + 50)
                            }
                        }
                        if (a.autoscroll && !1 !== a.autoscroll) {
                            const N = a._autoscrollId || a.id || "default-scroll-position",
                                B = "number" === typeof a.autoscroll ? a.autoscroll : 300;
                            setTimeout(() => {
                                L(N, b, B)
                            }, animationDuration + 100)
                        }
                    }
                };
            requestAnimationFrame(m);
            za = {
                finalTransform: "translate(-50%, -50%)"
            }
        } else za =
            $.scaleArr(b, a, l), b.style.opacity = 1, P.setTimeoutRAF(() => {
                if (a.onOpen && "function" === typeof a.onOpen) {
                    var q = createAlertContext(null, [], "open");
                    a.onOpen.call(q, b);
                    if (!0 === a.scrollY || !0 === a.forceScroll)
                        if (q = E.getElement(b, ".alert-scroll-wrapper")) q.style.overflow = "hidden auto", q.style.webkitOverflowScrolling = "touch", q.style.touchAction = "pan-y", b.querySelectorAll('[id="chat-output"], [style*="overflow-y:auto"]').forEach(d => {
                            d.style.overflow = "auto";
                            d.style.overflowY = "auto";
                            d.style.webkitOverflowScrolling =
                                "touch";
                            d.style.touchAction = "pan-y"
                        });
                    if (!0 === a.noScrollRestore) {
                        const d = E.getElement(b, ".alert-scroll-wrapper") || E.getElement(b, ".domquery-alert-body");
                        if (d) {
                            d.scrollTop = 0;
                            q = (a && "number" === typeof a.openSpeed ? a.openSpeed : l) || 500;
                            let f = !1;
                            const c = () => {
                                f || (d.scrollTop = 0, requestAnimationFrame(c))
                            };
                            requestAnimationFrame(c);
                            setTimeout(() => {
                                f = !0
                            }, q + 50)
                        }
                    }
                    if (a.autoscroll && !1 !== a.autoscroll) {
                        const d = a._autoscrollId || a.id || "default-scroll-position",
                            f = "number" === typeof a.autoscroll ? a.autoscroll : 300;
                        setTimeout(() => {
                            L(d, b, f)
                        }, ((a && "number" === typeof a.openSpeed ? a.openSpeed : l) || 500) + 50)
                    }
                }
            }, 0), P.setTimeoutRAF(() => {
                F = !1
            }, l);
        a.loading && (w = b.querySelector(".domquery-alert-loading")) && (w.style.display = "flex");
        a.TOPS && (w = {
            button: null,
            scrollListener: null,
            create: function() {
                let q = a.TOPS;
                if ("string" === typeof a.TOPS && a.TOPS.startsWith("#")) {
                    const f = document.querySelector(a.TOPS);
                    f && (q = f.innerHTML)
                } else !0 === a.TOPS && (q = '\n\t\t\t\t\t   <div class="domquery-tops-icon" style="\n\t\t\t\t\t\t  width: 40px;\n\t\t\t\t\t\t  height: 40px;\n\t\t\t\t\t\t  background-color: transparent;\n\t\t\t\t\t\t  border-radius: 50%;\n\t\t\t\t\t\t  display: flex;\n\t\t\t\t\t\t  justify-content: center;\n\t\t\t\t\t\t  align-items: center;\n\t\t\t\t\t\t  border: 2px solid rgba(150, 150, 150, 0.5);\n\t\t\t\t\t\t  transition: all 0.3s ease;\n\t\t\t\t\t   ">\n\t\t\t\t\t\t  <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(100, 100, 100, 0.8)">\n\t\t\t\t\t\t\t <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>\n\t\t\t\t\t\t  </svg>\n\t\t\t\t\t   </div>\n\t\t\t\t\t');
                "static" === getComputedStyle(b).position && (b.style.position = "relative");
                this.button = document.createElement("div");
                this.button.className = "domquery-tops-button";
                this.button.setAttribute("data-instance-id", A);
                this.button.innerHTML = q;
                this.button.style.cssText = `\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\tbottom: 15px;\n\t\t\t\t\tright: ${G?"15px":"35px"};\n\t\t\t\t\topacity: 0;\n\t\t\t\t\ttransform: scale(0.7);\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\tz-index: 9999;\n\t\t\t\t\ttransition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);\n\t\t\t\t `;
                G;
                this.button.addEventListener("mouseenter", () => {
                    var f = this.button.querySelector(".domquery-tops-icon");
                    f && (f.style.backgroundColor = "rgba(50, 50, 50, 0.8)", f.style.border = "2px solid rgba(70, 70, 70, 0.9)", f.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.5)", f.style.transform = "scale(1.1)", (f = f.querySelector("svg")) && f.setAttribute("fill", "rgba(230, 230, 230, 0.9)"))
                });
                this.button.addEventListener("mouseleave", () => {
                    var f = E.getElement(this.button, ".domquery-tops-icon");
                    f && (f.style.backgroundColor = "transparent",
                        f.style.border = "2px solid rgba(150, 150, 150, 0.5)", f.style.boxShadow = "none", f.style.transform = "scale(1)", (f = E.getElement(f, "svg")) && f.setAttribute("fill", "rgba(100, 100, 100, 0.8)"))
                });
                b.appendChild(this.button);
                const d = E.getElement(b, ".alert-scroll-wrapper") || E.getElement(b, ".domquery-alert-body") || b.querySelector('div[style*="overflow: auto"]') || b;
                this.scrollListener = () => {
                    const f = d.scrollTop,
                        c = d.clientHeight,
                        n = d.scrollHeight;
                    n > c ? .1 < f / (n - c) ? (this.button.style.opacity = "1", this.button.style.transform =
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
                this.button.addEventListener("touchend", f => {
                    f.preventDefault();
                    d.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }, {
                    passive: !1
                })
            },
            cleanup: function() {
                const q = E.getElement(b, ".alert-scroll-wrapper") ||
                    E.getElement(b, ".domquery-alert-body") || b.querySelector('div[style*="overflow: auto"]') || b;
                this.scrollListener && q.removeEventListener("scroll", this.scrollListener, {
                    passive: !0
                });
                this.button && this.button.parentNode && this.button.parentNode.removeChild(this.button)
            }
        }, w.create(), b.topsManager = w);
        const la = (q, d = !1, f, c = "default") => {
            if (F && (!d || "function" !== c)) return Promise.resolve();
            F = !0;
            z.closingAlerts.add(A);
            b && (E.clearParentCache(b), E.invalidateDocument(".domquery-alert"));
            if ("_blank" === a.parent) {
                1 < Array.from(document.querySelectorAll(".domquery-alert")).length ||
                    (document.body.style.overflow = "", document.documentElement.style.overflow = "", !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                        isIOS: !1
                    }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, parseInt(scrollY || "0"))));
                try {
                    const u = a.instanceId;
                    var n = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${u}"]`);
                    n && n.parentNode && n.setAttribute("data-related-alert", u);
                    const V = document.querySelector(`.domquery-blank-iframe[data-instance-id="${u}"]`);
                    if (V && V.parentNode) {
                        try {
                            V.contentWindow && (V.contentWindow._alertInstance = null, V.contentWindow._alertOptions = null, V.contentDocument && (V.contentDocument.body.innerHTML = ""))
                        } catch (N) {}
                        V.parentNode.removeChild(V)
                    }
                    const Y = document.querySelectorAll(".domquery-blank-container");
                    if (0 < Y.length) {
                        const N = Array.from(Y).sort((da, U) => {
                            da = parseInt(window.getComputedStyle(da).zIndex || 0);
                            return parseInt(window.getComputedStyle(U).zIndex || 0) - da
                        });
                        0 < N.length && parseInt(window.getComputedStyle(N[0]).zIndex || 0);
                        let B =
                            0;
                        N.forEach(da => {
                            const U = da.getAttribute("data-instance-id");
                            if (U !== u) {
                                var xa = parseInt(window.getComputedStyle(da).zIndex || 0);
                                U && (da = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${U}"]`)) && (xa -= 20, da.style.zIndex = xa.toString(), da.setAttribute("data-related-container", U), xa > B && (B = xa))
                            }
                        })
                    }
                } catch (u) {}
            }
            z.observers && z.observers[a.instanceId] && (z.observers[a.instanceId].disconnect(), delete z.observers[a.instanceId]);
            h.alertScrollHandlers && h.alertScrollHandlers[a.instanceId] && (n = h.alertScrollHandlers[a.instanceId],
                n.element && n.handler && n.element.removeEventListener("scroll", n.handler), delete h.alertScrollHandlers[a.instanceId]);
            h.alertScrollStyles && h.alertScrollStyles[a.instanceId] && (document.head.removeChild(h.alertScrollStyles[a.instanceId]), delete h.alertScrollStyles[a.instanceId]);
            $.AlertScrollManager.isUserScrolling[a.instanceId] && delete $.AlertScrollManager.isUserScrolling[a.instanceId];
            $.AlertScrollManager.lastScrollTime[a.instanceId] && delete $.AlertScrollManager.lastScrollTime[a.instanceId];
            $.AlertScrollManager.scrollStates[a.instanceId] &&
                delete $.AlertScrollManager.scrollStates[a.instanceId];
            a.autoscroll && !1 !== a.autoscroll && ($.AlertScrollManager.savePosition(a._autoscrollId || a.id || "default-scroll-position", b), b.scrollListener && b.scrollElements && (b.scrollElements.forEach(u => {
                u.removeEventListener("scroll", b.scrollListener)
            }), delete b.scrollListener, delete b.scrollElements));
            try {
                a.instanceId && document.querySelectorAll(`.virtual-input-layer[data-alert-id="${a.instanceId}"]`).forEach(u => {
                    u && u.parentNode && u.parentNode.removeChild(u)
                });
                var m = document.querySelectorAll(".virtual-input-layer");
                0 < m.length && m.forEach(u => {
                    u && u.parentNode && u.parentNode.removeChild(u)
                });
                Array.from(document.body.children).forEach(u => {
                    u.className && u.className.includes("virtual-input-layer") && document.body.removeChild(u)
                })
            } catch (u) {}
            b.timeoutId && (clearTimeout(b.timeoutId), b.timeoutId = null);
            if (m = b.querySelector(".domquery-alert-loading")) m.style.display = "none";
            const e = f || a && a._closeSpeed || l;
            return new Promise(u => {
                let V = !1;
                const Y = W => {
                        V || null === q || "function" !==
                            typeof g || (V = !0, setTimeout(() => {
                                z.callbackExecuting = !0;
                                try {
                                    g(q, W)
                                } finally {
                                    z.callbackExecuting = !1
                                }
                            }, 0))
                    },
                    N = W => {
                        try {
                            ka.cleanupOnClose(A, b, a, W)
                        } catch (Q) {}
                        z.closingAlerts.delete(A)
                    };
                if (!d && q && a.text && "function" === typeof a.function) {
                    var B = Array.from(b.querySelectorAll("input, textarea, select"));
                    const W = [],
                        Q = {},
                        I = new Set,
                        oa = new Map,
                        Z = new Map;
                    B.forEach(C => {
                        var ca = C.type;
                        "checkbox" === ca ? (ca = C.name || "checkbox", oa.has(ca) || oa.set(ca, []), C.checked && oa.get(ca).push(C.value || "true")) : "radio" === ca && C.checked &&
                            (ca = C.name || "radio", Z.has(ca) || Z.set(ca, C.value || "true"))
                    });
                    B.forEach(C => {
                        const ca = C.type;
                        var T = C.tagName.toLowerCase();
                        if ("checkbox" === ca) C = C.name || "checkbox", T = `checkbox_${C}`, I.has(T) || (C = oa.get(C) || [], 0 < C.length && (W.push(C), Q.checkbox = C), I.add(T));
                        else if ("radio" === ca) {
                            if (C = C.name || "radio", T = `radio_${C}`, !I.has(T)) {
                                if (C = Z.get(C)) W.push(C), Q.radio = C;
                                I.add(T)
                            }
                        } else "select" === T ? W.push(C.value) : (C = C.value.replace(/[`'"]/g, ""), C = W.push(C) - 1, "textarea" === T && (Q.textarea = C))
                    });
                    for (var da in Q) W[da] = "textarea" ===
                        da && "number" === typeof Q[da] ? W[Q[da]] : Q[da];
                    this.totalResults || (this.totalResults = []);
                    const na = createAlertContext(q, this.totalResults, "function");
                    na._closeWasCalled = !1;
                    B = h.$closeAlert;
                    let X;
                    if ("_self" === a.parent || "_blank" === a.parent) X = () => {
                        na._closeWasCalled = !0;
                        P.setTimeoutRAF(() => {
                            const C = E.getElement(b, ".domquery-close-x-btn") || E.getElement(b, ".domquery-alert-close-btn");
                            if (C) C.click();
                            else try {
                                la("xclose", !0, 0, "force_close")
                            } catch (ca) {}
                        }, 0);
                        return !0
                    }, h.$closeAlert = function(...C) {
                        return X()
                    };
                    na._functionCallbackExecuting = !0;
                    a.function.call(na, W);
                    na._functionCallbackExecuting = !1;
                    h.$closeAlert = B;
                    if (na._closeWasCalled) return la(na._closeTypeParam || "close", !0, 0, "function");
                    F = !1;
                    z.closingAlerts.delete(A);
                    return Promise.resolve()
                }
                const U = a.toast ? ".domquery-toast-overlay" : ".domquery-shadow-overlay",
                    xa = `${U}[data-instance-id="${a.instanceId}"]`,
                    R = "TC LC RC BC TL TR BL BR".split(" ").find(W => void 0 !== a[W]),
                    ma = R && !1 === a[R];
                let ba;
                if (a.easing) {
                    const [W, Q] = a.easing.split(",").map(I => I.trim());
                    ba = Q || W
                }
                const Ja = performance.now(),
                    Ka = () => {
                        const W = document.createElement("div");
                        W.style.position = "fixed";
                        W.style.zIndex = a.zindex;
                        const Q = b.offsetWidth,
                            I = b.offsetHeight;
                        W.style.width = Q + "px";
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
                        b.style.width = Q + "px";
                        b.style.height = I + "px";
                        return W
                    };
                G && (document.body.style.overflow = "",
                    document.documentElement.style.overflow = "", document.removeEventListener("touchmove", H));
                if (!0 === a.fastMode) {
                    B = document.querySelector(`${U}[data-instance-id="${A}"]`);
                    if (a.easing) {
                        const [Q, I] = a.easing.split(",").map(oa => oa.trim());
                        da = I || Q
                    } else da = "ease-out";
                    const W = function(Q) {
                        switch (Q) {
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
                    }(da);
                    !0 === a.hide && b.querySelectorAll(".domquery-alert-body, .domquery-text-container, .domquery-text-bottom-container, .domquery-alert-close-btn, .alert-scroll-wrapper > div").forEach(Q => {
                        Q && (Q.style.transition = `opacity ${e/2}ms ${W}`, Q.style.opacity = "0")
                    });
                    B && (B.style.transition = `opacity ${e}ms ${W}`, B.style.opacity = "0");
                    B = void 0 !== a.CC;
                    if (ma)
                        if (["TL", "TR", "BL", "BR"].includes(R)) {
                            da = R.endsWith("L") ? "left" : "right";
                            var fa = R.startsWith("T") ? "top" : "bottom";
                            da = `translate(${"right"===da?100:-100}%, ${"bottom"===
fa?100:-100}%)`
                        } else da = ["LC", "RC"].includes(R) ? `translate(${"LC"===R?-100:100}%, -50%)` : ["TC", "BC"].includes(R) ? `translate(-50%, ${"TC"===R?-100:100}%)` : B ? "translate(-50%, -50%) scale(0.8)" : "scale(0.8)";
                    else da = B ? "translate(-50%, -50%) scale(0.8)" : "scale(0.8)";
                    b.style.willChange = "transform, opacity";
                    b.style.backfaceVisibility = "hidden";
                    if (da.includes("scale")) {
                        fa = "center center";
                        if (R && !ma)
                            if ("BL" === R) fa = "left bottom";
                            else if ("BR" === R) fa = "right bottom";
                        else if ("TL" === R) fa = "left top";
                        else if ("TR" ===
                            R) fa = "right top";
                        else if ("TC" === R) fa = "center top";
                        else if ("BC" === R) fa = "center bottom";
                        else if ("LC" === R) fa = "left center";
                        else if ("RC" === R) fa = "right center";
                        else if ("CC" === R || B) fa = "center center";
                        b.style.transformOrigin = fa
                    }
                    B = da;
                    da.includes("translate") && !da.includes("translate3d") && (B = da.replace(/translate\(([^)]+)\)/g, "translate3d($1, 0)"));
                    b.style.transition = `transform ${e}ms ${W}, opacity ${e}ms ${W}`;
                    b.style.opacity = "0";
                    b.style.transform = B;
                    P.setTimeoutRAF(() => {
                        b.style.willChange && (b.style.willChange =
                            "auto", b.style.backfaceVisibility = "");
                        F = !1;
                        b._elementInfos && b._elementInfos.forEach(I => {
                            I.element && (I.element.style.display = "none" === I.originalDisplay ? "none" : I.originalDisplay, I.parent && (I.nextSibling ? I.parent.insertBefore(I.element, I.nextSibling) : I.parent.appendChild(I.element)))
                        });
                        b.wrapper && b.wrapper.parentNode && b.wrapper.parentNode.removeChild(b.wrapper);
                        var Q = t.querySelector(xa);
                        Q && Q.remove();
                        "_blank" === a.parent ? [`.domquery-shadow-overlay[data-connected-alert="${a.instanceId}"]`, `.domquery-shadow-overlay[data-related-alert="${a.instanceId}"]`,
                            `.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`, `.domquery-blank-overlay[data-instance-id="${a.instanceId}"]`, `.domquery-blank-overlay[data-connected-alert="${a.instanceId}"]`
                        ].forEach(I => {
                            document.querySelectorAll(I).forEach(oa => {
                                oa && oa.parentNode && oa.remove()
                            })
                        }) : (Q = document.querySelector(xa)) && Q.remove();
                        if ("_blank" === a.parent && (document.querySelectorAll(`.domquery-alert[data-parent-instance-id="${A}"]`).forEach(I => {
                                const oa = I.getAttribute("data-instance-id");
                                if (oa && h.$closeAlert) try {
                                    const Z =
                                        I.querySelector(".domquery-close-x-btn") || I.querySelector(".domquery-alert-close-btn");
                                    if (Z) Z.click();
                                    else {
                                        I.parentNode && I.parentNode.removeChild(I);
                                        const na = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${oa}"]`);
                                        na && na.parentNode && na.parentNode.removeChild(na)
                                    }
                                } catch (Z) {
                                    I.parentNode && I.parentNode.removeChild(I)
                                }
                            }), (Q = document.getElementById("domquery-blank-container-" + A)) && Q.parentNode)) {
                            const I = Q.querySelector(".domquery-blank-iframe");
                            if (I) try {
                                I.contentWindow && (I.contentWindow._alertInstance =
                                    null, I.contentWindow._alertOptions = null, I.contentDocument && (I.contentDocument.body.innerHTML = ""))
                            } catch (oa) {}
                            Q.parentNode.removeChild(Q)
                        }
                        Q = "true" === b.getAttribute("data-offout");
                        t !== document.body && void 0 !== t._originalOverflow && (t.style.overflow = t._originalOverflow, delete t._originalOverflow);
                        b && b.parentNode && b.parentNode.removeChild(b);
                        0 === document.querySelectorAll(".domquery-alert").length ? (b.wheelListener && (document.removeEventListener("wheel", b.wheelListener, {
                                passive: !1
                            }), delete b.wheelListener),
                            !1 === a.retainScroll ? (document.body.style.overflow = "", document.documentElement.style.overflow = "", void 0 !== document.body._originalOverflowX && (document.body.style.overflowX = document.body._originalOverflowX, document.documentElement.style.overflowX = document.documentElement._originalOverflowX, delete document.body._originalOverflowX, delete document.documentElement._originalOverflowX)) : Q && a.History || (document.body.style.overflow = "", document.documentElement.style.overflow = "", void 0 !== document.body._originalOverflowX &&
                                (document.body.style.overflowX = document.body._originalOverflowX, document.documentElement.style.overflowX = document.documentElement._originalOverflowX, delete document.body._originalOverflowX, delete document.documentElement._originalOverflowX), !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                    isIOS: !1
                                }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = ""))) : b.wheelListener && (document.removeEventListener("wheel", b.wheelListener, {
                            passive: !1
                        }), delete b.wheelListener);
                        a.onClose && "function" === typeof a.onClose && (Q = createAlertContext(q, this.totalResults, c), a.onClose.call(Q), 0 === document.querySelectorAll(".domquery-alert:not(.toast-alert)").length && !1 !== a.retainScroll && (document.body.style.overflow = "", document.documentElement.style.overflow = ""));
                        Y(c);
                        N(c);
                        u()
                    }, e + 20)
                } else {
                    const W = function(Q) {
                        const I = document.querySelector(`${U}[data-instance-id="${A}"]`),
                            oa = I ? parseFloat(h.getComputedStyle(I).opacity) : 0,
                            Z = "number" === typeof a.opacity ? a.opacity : 1;
                        let na;
                        if (a.easing) {
                            const [X,
                                C
                            ] = a.easing.split(",").map(ca => ca.trim());
                            na = C || X
                        }!0 === a.hide && b.querySelectorAll(".domquery-alert-body, .domquery-text-container, .domquery-text-bottom-container, .domquery-alert-close-btn, .alert-scroll-wrapper > div").forEach(X => {
                            X && (X.style.transition = "opacity 0.3s ease", X.style.opacity = "1")
                        });
                        return function(X) {
                            var C = X - Ja;
                            X = Math.min(C / e, 1);
                            if (!0 === a.hide) {
                                var ca = b.querySelectorAll(".domquery-alert-body, .domquery-text-container, .domquery-text-bottom-container, .domquery-alert-close-btn, .alert-scroll-wrapper > div");
                                const K = Math.max(0, 1 - 2 * X);
                                ca.forEach(ra => {
                                    ra && (ra.style.opacity = K.toString())
                                })
                            }
                            if (ma)
                                if (ca = $._anieasing(0, 1, X, na), ["TL", "TR", "BL", "BR"].includes(R)) {
                                    var T = R.endsWith("L") ? "left" : "right";
                                    var ea = R.startsWith("T") ? "top" : "bottom";
                                    T = "right" === T ? 100 : -100;
                                    ea = "bottom" === ea ? 100 : -100;
                                    if (1 > C) T = null;
                                    else {
                                        var O = $._anieasing(0, 1, Math.min((C - 1) / e, 1), na);
                                        T = `translate3d(${T*O}%, ${ea*O}%, 0)`
                                    }
                                    null !== T && 1 <= C && (1 <= C && !b._willChangeApplied && (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden",
                                        b._willChangeApplied = !0), b.style.transform = T);
                                    b.style.opacity = 1 - (1 - Z) * ca
                                } else ["LC", "RC"].includes(R) ? (T = "LC" === R ? -100 : 100, 1 > C ? T = null : (ea = $._anieasing(0, 1, Math.min((C - 1) / e, 1), na), T = `translate3d(${T*ea}%, -50%, 0)`), null !== T && 1 <= C && (1 <= C && !b._willChangeApplied && (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden", b._willChangeApplied = !0), b.style.transform = T), b.style.opacity = 1 - (1 - Z) * ca) : ["TC", "BC"].includes(R) && (T = "TC" === R ? -100 : 100, 1 > C ? T = null : (ea = $._anieasing(0, 1, Math.min((C -
                                    1) / e, 1), na), T = `translate3d(-50%, ${T*ea}%, 0)`), null !== T && 1 <= C && (1 <= C && !b._willChangeApplied && (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden", b._willChangeApplied = !0), b.style.transform = T), b.style.opacity = 1 - (1 - Z) * ca);
                            else if (va && r)
                                if ("boxcenter" == ba) 1 > C || (C = $._anieasing(0, 1, Math.min((C - 1) / e, 1), na), b._willChangeApplied || (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden", b.style.transformOrigin = "center center", b._willChangeApplied = !0), b.style.transform =
                                    `translate3d(-50%, -50%, 0) scale(${1-C})`, b.style.opacity = Math.max(0, 1 - C));
                                else {
                                    C = $._anieasing(0, 1, X, na);
                                    ca = null;
                                    if ("_self" === a.parent)
                                        for (T = Array.from(document.querySelectorAll(".domquery-alert")), ea = T.length - 1; 0 <= ea; ea--)
                                            if (T[ea].getAttribute("data-instance-id") !== a.instanceId) {
                                                ca = T[ea];
                                                break
                                            } T = r.clientX;
                                    ea = r.clientY;
                                    if (ca) {
                                        var S = ca.getBoundingClientRect();
                                        T = r.clientX - S.left;
                                        ea = r.clientY - S.top;
                                        O = S.width / 2;
                                        S = S.height / 2
                                    } else O = h.innerWidth / 2, S = h.innerHeight / 2;
                                    b.wrapper || (b.wrapper = Ka());
                                    b.wrapper.style.position =
                                        ca ? "absolute" : "fixed";
                                    b.wrapper.style.left = `${T+(O-T)*(1-C)}px`;
                                    b.wrapper.style.top = `${ea+(S-ea)*(1-C)}px`;
                                    b.style.transition = "none";
                                    b._willChangeApplied || (b.style.willChange = "transform, opacity", b.style.backfaceVisibility = "hidden", b.style.transformOrigin = "center center", b._willChangeApplied = !0);
                                    b.style.transform = `translate3d(-50%, -50%, 0) scale(${1-C})`;
                                    b.style.opacity = 1 - (1 - Z) * C
                                }
                            else {
                                ca = $._anieasing(0, 1, X, na);
                                if (1 > C) T = null;
                                else {
                                    T = 1 - $._anieasing(0, 1, Math.min((C - 1) / e, 1), na);
                                    if (!b._willChangeApplied) {
                                        b.style.willChange =
                                            "transform, opacity";
                                        b.style.backfaceVisibility = "hidden";
                                        ea = "center center";
                                        if (R && !ma)
                                            if ("BL" === R) ea = "left bottom";
                                            else if ("BR" === R) ea = "right bottom";
                                        else if ("TL" === R) ea = "left top";
                                        else if ("TR" === R) ea = "right top";
                                        else if ("TC" === R) ea = "center top";
                                        else if ("BC" === R) ea = "center bottom";
                                        else if ("LC" === R) ea = "left center";
                                        else if ("RC" === R) ea = "right center";
                                        else if ("CC" === R || void 0 !== a.CC) ea = "center center";
                                        b.style.transformOrigin = ea;
                                        b._willChangeApplied = !0
                                    }
                                    void 0 !== a.CC ? T = `translate3d(-50%, -50%, 0) scale(${T})` :
                                        za && za.finalTransform ? (ea = za.finalTransform, ea = ea.replace(/translate\(-50%,\s*-50%\)/g, "translate3d(-50%, -50%, 0)"), ea = ea.replace(/translate\(([^)]+)\)/g, "translate3d($1, 0)"), T = ea.replace("scale(1)", `scale(${T})`)) : T = `scale(${T})`
                                }
                                null !== T && 1 <= C && (b.style.transform = T);
                                b.style.opacity = 1 - (1 - Z) * ca
                            }
                            I && (I.style.opacity = oa * (1 - X));
                            if (1 > X) requestAnimationFrame(W);
                            else {
                                b._willChangeApplied && (b.style.willChange = "auto", b.style.backfaceVisibility = "", delete b._willChangeApplied);
                                F = !1;
                                N(c);
                                X = "true" === b.getAttribute("data-offout");
                                t !== document.body && void 0 !== t._originalOverflow && (t.style.overflow = t._originalOverflow, delete t._originalOverflow);
                                b && b.parentNode && b.parentNode.removeChild(b);
                                0 === document.querySelectorAll(".domquery-alert").length ? (b.wheelListener && (document.removeEventListener("wheel", b.wheelListener, {
                                    passive: !1
                                }), delete b.wheelListener), !1 === a.retainScroll ? (document.body.style.overflow = "", document.documentElement.style.overflow = "") : X && a.History || (document.body.style.overflow = "", document.documentElement.style.overflow =
                                    "", !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                        isIOS: !1
                                    }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, parseInt(scrollY || "0"))))) : b.wheelListener && (document.removeEventListener("wheel", b.wheelListener, {
                                    passive: !1
                                }), delete b.wheelListener);
                                b._elementInfos && b._elementInfos.forEach(K => {
                                    K.element && K.parent && (K.element.style.display = "none" === K.originalDisplay ? "none" : K.originalDisplay, K.nextSibling ? K.parent.insertBefore(K.element,
                                        K.nextSibling) : K.parent.appendChild(K.element))
                                });
                                b.wrapper && b.wrapper.parentNode && b.wrapper.parentNode.removeChild(b.wrapper);
                                (X = t.querySelector(xa)) && X.remove();
                                "_blank" === a.parent ? [`.domquery-shadow-overlay[data-connected-alert="${a.instanceId}"]`, `.domquery-shadow-overlay[data-related-alert="${a.instanceId}"]`, `.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`, `.domquery-blank-overlay[data-instance-id="${a.instanceId}"]`, `.domquery-blank-overlay[data-connected-alert="${a.instanceId}"]`].forEach(K => {
                                    document.querySelectorAll(K).forEach(ra => {
                                        ra && ra.parentNode && ra.remove()
                                    })
                                }) : (X = document.querySelector(xa)) && X.remove();
                                if ("_blank" === a.parent) {
                                    document.querySelectorAll(`.domquery-alert[data-parent-instance-id="${A}"]`).forEach(K => {
                                        const ra = K.getAttribute("data-instance-id");
                                        if (ra && h.$closeAlert) try {
                                            const pa = K.querySelector(".domquery-close-x-btn") || K.querySelector(".domquery-alert-close-btn");
                                            if (pa) pa.click();
                                            else {
                                                K.parentNode && K.parentNode.removeChild(K);
                                                const qa = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${ra}"]`);
                                                qa && qa.parentNode && qa.parentNode.removeChild(qa)
                                            }
                                        } catch (pa) {
                                            K.parentNode && K.parentNode.removeChild(K)
                                        }
                                    });
                                    if (X = document.getElementById("domquery-blank-container-" + A)) {
                                        if (C = X.querySelector(".domquery-blank-iframe")) try {
                                            C.contentWindow && (C.contentWindow._alertInstance = null, C.contentWindow._alertOptions = null, C.contentDocument && (C.contentDocument.body.innerHTML = ""))
                                        } catch (K) {}
                                        X.parentNode && X.parentNode.removeChild(X)
                                    } [`.domquery-shadow-overlay[data-connected-alert="${A}"]`, `.domquery-shadow-overlay[data-related-alert="${A}"]`,
                                        `.domquery-shadow-overlay[data-instance-id="${A}"]`, `.domquery-blank-overlay[data-instance-id="${A}"]`, `.domquery-blank-overlay[data-connected-alert="${A}"]`
                                    ].forEach(K => {
                                        document.querySelectorAll(K).forEach(ra => {
                                            ra && ra.parentNode && ra.remove()
                                        })
                                    });
                                    X = document.querySelectorAll(".domquery-blank-container");
                                    C = document.querySelectorAll(".domquery-alert:not(.toast-alert)");
                                    if (0 === X.length && 0 === C.length) document.body.style.overflow = "", document.documentElement.style.overflow = "", !0 === ("undefined" !== typeof $ &&
                                        $.isMobile ? $.isMobile() : {
                                            isIOS: !1
                                        }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", window.scrollTo(0, parseInt(scrollY || "0")));
                                    else {
                                        const K = document.querySelectorAll(".domquery-alert");
                                        K.forEach(ra => {
                                            var pa = ra.getAttribute("data-instance-id");
                                            if (pa) {
                                                let qa = 9999;
                                                K.forEach(wa => {
                                                    wa !== ra && (wa = parseInt(window.getComputedStyle(wa).zIndex || 0), wa > qa && (qa = wa))
                                                });
                                                const ya = qa + 2;
                                                ra.style.zIndex = ya.toString();
                                                const Ba = document.querySelector(`.domquery-shadow-overlay[data-connected-alert="${pa}"]`) ||
                                                    document.querySelector(`.domquery-blank-overlay[data-instance-id="${pa}"]`) || document.querySelector(`.domquery-shadow-overlay[data-instance-id="${pa}"]`);
                                                Ba && (Ba.style.zIndex = (ya - 1).toString());
                                                if (pa = document.getElementById("domquery-blank-container-" + pa)) pa.style.zIndex = (ya - 2).toString()
                                            }
                                        })
                                    }
                                }
                                t !== document.body && void 0 !== t._originalOverflow && (t.style.overflow = t._originalOverflow, delete t._originalOverflow);
                                b && b.parentNode && b.parentNode.removeChild(b);
                                0 === document.querySelectorAll(".domquery-alert:not(.toast-alert)").length &&
                                    (!1 === a.retainScroll ? (document.body.style.overflow = "", document.documentElement.style.overflow = "") : (document.body.style.overflow = "", document.documentElement.style.overflow = "", !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                        isIOS: !1
                                    }).isIOS && (document.body.style.position = "", document.body.style.width = "", document.body.style.top = "", b._scrollPosition && void 0 !== b._scrollPosition.y && window.scrollTo(0, b._scrollPosition.y))));
                                "swipe" === Q && z.options[A]?.swipeCallback && "function" === typeof z.options[A].swipeCallback &&
                                    z.options[A].swipeCallback({
                                        direction: q,
                                        velocity: Da || 0,
                                        timeElapsed: Fa || 0,
                                        instanceId: A,
                                        phase: "complete"
                                    });
                                a.onClose && "function" === typeof a.onClose && (X = createAlertContext(q, this.totalResults, Q), a.onClose.call(X), 0 === document.querySelectorAll(".domquery-alert:not(.toast-alert)").length && !1 !== a.retainScroll && (document.body.style.overflow = "", document.documentElement.style.overflow = ""));
                                Y(Q);
                                N(Q);
                                [`.domquery-shadow-overlay[data-instance-id="${A}"]`, `.domquery-blank-overlay[data-instance-id="${A}"]`, `.domquery-shadow-overlay[data-connected-alert="${A}"]`,
                                    `.domquery-blank-overlay[data-connected-alert="${A}"]`
                                ].forEach(K => {
                                    document.querySelectorAll(K).forEach(ra => {
                                        ra && ra.parentNode && ra.remove()
                                    })
                                });
                                u()
                            }
                        }
                    }(c);
                    requestAnimationFrame(W)
                }
            })
        };
        "_self" !== a.parent && document.body.appendChild(b);
        a.toast && (b.style.cssText += "overflow: hidden !important;", w = E.getElement(b, ".domquery-alert-body")) && (w.style.cssText += "overflow: hidden !important; text-overflow: ellipsis !important;");
        (w = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`)) &&
        w.parentNode && w.parentNode.removeChild(w);
        a.timeOut && "number" === typeof a.timeOut && 0 < a.timeOut && (b.timeoutId = P.setTimeoutRAF(() => {
            F || la("timeout", !0, void 0, "timeout")
        }, a.timeOut));
        if (t !== document.body || "_self" === a.parent || !a.parent && t === document.body)
            if (t !== document.body && (b.style.position = "absolute", b.style.maxWidth = a.maxWidth ? processSize(a.maxWidth) : "100%", b.style.minWidth = a.minWidth ? processSize(a.minWidth) : "", b.style.maxHeight = a.maxHeight ? processSize(a.maxHeight) : "100%"), "_blank" === a.parent && b.style.setProperty("z-index",
                    (a.zindex || 2147483647).toString(), "important"), "_self" === a.parent || !a.parent && t === document.body) b.style.position = "fixed", a.zindex && (b.style.zIndex = a.zindex.toString()), "TC LC RC BC TL TR BL BR".split(" ").some(q => void 0 !== a[q]) && void 0 === a.CC ? void 0 !== a.TC ? (b.style.left = "50%", b.style.top = "0", b.style.transform = "translateX(-50%)") : void 0 !== a.BC ? (b.style.left = "50%", b.style.bottom = "0", b.style.transform = "translateX(-50%)") : void 0 !== a.LC ? (b.style.left = "0", b.style.top = "50%", b.style.transform = "translateY(-50%)") :
                void 0 !== a.RC ? (b.style.right = "0", b.style.top = "50%", b.style.transform = "translateY(-50%)") : void 0 !== a.TL ? (b.style.left = "0", b.style.top = "0", b.style.transform = "none") : void 0 !== a.TR ? (b.style.right = "0", b.style.top = "0", b.style.transform = "none") : void 0 !== a.BL ? (b.style.left = "0", b.style.bottom = "0", b.style.transform = "none") : void 0 !== a.BR && (b.style.right = "0", b.style.bottom = "0", b.style.transform = "none") : (b.style.left = "50%", b.style.top = "50%", b.style.transform = "translate(-50%, -50%)"), a.width && (b.style.width = a.width),
                a.height && (b.style.height = a.height), b.style.maxWidth = "100%", b.style.maxHeight = a.maxHeight ? processSize(a.maxHeight) : "100%";
        t !== document.body && !1 === a.BC && a.parent && "_self" !== a.parent && "_blank" !== a.parent && (t._originalOverflow || (t._originalOverflow = getComputedStyle(t).overflow), t.style.overflow = "hidden");
        t.appendChild(b);
        if (!1 !== a.background) {
            w = "_blank" === a.parent ? document.body : "_self" === a.parent ? b : a.parent || "body";
            if ("_blank" === a.parent) {
                a.overlayZindex || (a.overlayZindex = (a.zindex || 2147483647) - 1);
                let q =
                    null,
                    d = 0;
                document.querySelectorAll(".domquery-alert").forEach(f => {
                    if (f.getAttribute("data-instance-id") !== a.instanceId) {
                        const c = parseInt(window.getComputedStyle(f).zIndex || 0);
                        c > d && (d = c, q = f)
                    }
                });
                q && (a._parentAlert = q)
            }
            $.shadow(w, {
                bgcolor: a.background,
                alpha: a.alpha,
                zindex: a.overlayZindex || (a.toast ? a.toastZindex - 10 : a.zindex - 10),
                close: !1,
                overlayType: a.toast ? "toast" : "alert",
                instanceId: a.instanceId,
                parent: a.parent,
                preserveExisting: a.toast
            }, l);
            "_blank" === a.parent && (w = document.querySelector(`.domquery-shadow-overlay[data-instance-id="${a.instanceId}"]`)) &&
                (w.style.zIndex = a.overlayZindex, w.style.position = "fixed", w.style.top = "0", w.style.left = "0", w.style.width = "100%", w.style.height = "100%", "_blank" === a.parent && (w.setAttribute("data-blank-container", "domquery-blank-container-" + a.instanceId), w.style.pointerEvents = !0 === a.close ? "auto" : "none", b.classList.add("domquery-blank-alert"), b.style.zIndex = a.zindex.toString(), w.classList.add("domquery-blank-overlay"), w.setAttribute("data-connected-alert", a.instanceId), b.setAttribute("data-connected-overlay", w.getAttribute("data-instance-id") ||
                    "")), w.style.pointerEvents = "auto", w.style.backgroundColor = "rgba(0, 0, 0, 0.5)")
        }
        w = `.domquery-${a.toast?"toast":"shadow"}-overlay[data-instance-id="${a.instanceId}"]`;
        let ja = null;
        "_blank" === a.parent ? ja = document.querySelector(w) : "_self" === a.parent ? (ja = t.querySelector(w)) || (ja = document.querySelector(w)) : ja = t.querySelector(w);
        if ("_blank" === a.parent && b && ja) {
            b.classList.add("domquery-blank-alert");
            ja.classList.add("domquery-blank-overlay");
            let q = 0;
            document.querySelectorAll(".domquery-blank-alert").forEach(d => {
                if (d !== b) {
                    const f = parseInt(window.getComputedStyle(d).zIndex || 0);
                    f > q && (q = f, parentAlert = d)
                }
            });
            w = 0 < q ? q + 2 : parseInt(b.style.zIndex || a.zindex || 0);
            b.style.zIndex = w.toString();
            ja.style.zIndex = (w - 1).toString();
            ja.setAttribute("data-connected-alert", a.instanceId);
            b.setAttribute("data-connected-overlay", ja.getAttribute("data-instance-id") || "");
            ja.style.pointerEvents = "auto";
            ja.style.backgroundColor || (ja.style.backgroundColor = "rgba(0, 0, 0, 0.5)");
            document.querySelectorAll(".domquery-blank-alert").forEach(d => {
                if (d !== b) {
                    var f = d.getAttribute("data-instance-id"),
                        c = d.getAttribute("data-connected-overlay");
                    f && (c = document.querySelector(`.domquery-blank-overlay[data-instance-id="${c}"]`)) && (f = parseInt(window.getComputedStyle(d).zIndex || 0), c = parseInt(window.getComputedStyle(c).zIndex || 0), f <= c && (d.style.zIndex = (c + 1).toString()))
                }
            })
        }
        if (ja)
            if (ja.style.pointerEvents = "auto", ja.style.backgroundColor || (ja.style.backgroundColor = "rgba(0, 0, 0, 0.5)"), a.close) ja.style.backgroundColor || (ja.style.backgroundColor = "rgba(0, 0, 0, 0.5)"),
                ja.addEventListener("click", q => {
                    q.preventDefault();
                    q.stopPropagation();
                    F || (q = Array.from(document.querySelectorAll(".domquery-alert")), q.findIndex(d => d.getAttribute("data-instance-id") === a.instanceId) === q.length - 1 && la("xclose", !0, void 0, "overlay"))
                });
            else {
                let q = 0,
                    d = !1;
                ja.addEventListener("click", f => {
                    f.preventDefault();
                    f.stopPropagation();
                    if (!F && !d) {
                        f = ja.getAttribute("data-connected-alert") || ja.getAttribute("data-instance-id");
                        var c = document.querySelector(`.domquery-alert[data-instance-id="${f}"]`);
                        if (c) {
                            if (a.shadow) {
                                let n = 0,
                                    m = 120;
                                !0 === a.vibrate && (m = 30);
                                const e = () => {
                                    const u = 0 === n % 2 ? "1" : "0.2";
                                    c.style.boxShadow = `0 0 23px rgba(${a.shadow.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)?a.shadow.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).slice(1).map(V=>parseInt(V,16)).join(","):"red"===a.shadow?"255,0,0":"blue"===a.shadow?"0,0,255":"green"===a.shadow?"0,255,0":"pink"===a.shadow?"255,192,203":"purple"===a.shadow?"128,0,128":"cyan"===a.shadow?"0,255,255":"yellow"===a.shadow?"255,255,0":
"0,0,0"},${u})`;
                                    n++;
                                    10 > n ? setTimeout(e, m) : c.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"
                                };
                                e();
                                q = 20
                            }
                            if (!0 === a.vibrate) {
                                f = "CC TC LC RC BC TL TR BL BR".split(" ").some(u => void 0 !== a[u]);
                                const n = "TC LC RC BC TL TR BL BR".split(" ").find(u => void 0 !== a[u]);
                                if ("vibrate" in navigator) try {
                                    navigator.vibrate(l / 3)
                                } catch (u) {}
                                const m = c.style.transform,
                                    e = c.style.transition;
                                d = !0;
                                f ? ($.aBox(c, n), P.setTimeoutRAF(() => {
                                    c.style.transform = m;
                                    c.style.transition = e;
                                    d = !1
                                }, 300)) : (c.style.transition = "box-shadow 0s", c.style.boxShadow =
                                    "none", P.setTimeoutRAF(() => {
                                        $.aBox(c, n);
                                        P.setTimeoutRAF(() => {
                                            c.style.transform = m;
                                            c.style.transition = e;
                                            d = !1
                                        }, 300)
                                    }, q))
                            }
                        }
                    }
                })
            } a.buttonConfigs && a.buttonConfigs.forEach(q => {
            const d = b.querySelector(`.alert-${q.name}-btn`);
            d && d.addEventListener("click", () => {
                if (!F) {
                    k = y = D = 0;
                    x = !1;
                    ha = 0;
                    aa = 1;
                    b.style.transition = "";
                    var f = document.querySelector(".domquery-shadow-overlay");
                    f && (f.style.transition = "");
                    f = createAlertContext(q.name, [], "button");
                    f.close = function(c = "xclose") {
                        return la(c, !0, void 0, c)
                    };
                    "function" === typeof a[q.name] ?
                        a[q.name].call(f, q.name, "button") : la(q.name, !0, void 0, q.name)
                }
            })
        });
        w = E.getElement(b, ".domquery-alert-close-btn");
        v = E.getElement(b, ".domquery-close-x-btn");
        w && w.addEventListener("click", () => {
            if (!F)
                if ("function" === typeof a.Ok) {
                    const q = createAlertContext("Ok", [], "button");
                    q.close = function(d = "xclose") {
                        return la(d, !0, void 0, d)
                    };
                    a.Ok.call(q, "Ok", "button")
                } else la("close", !1, void 0, "button")
        });
        v && (v.style.pointerEvents = "auto", v.addEventListener("click", q => {
            q.stopPropagation();
            F || la("xclose", !0, void 0, "xbutton")
        }));
        b.style.cssText += "pointer-events: auto;";
        try {
            z.options && z.options[A] && (z.options[A].__closeFromHistory = function() {
                return la("back", !0, void 0, "back")
            }), ka.register(A, b, a)
        } catch (q) {}
        if (w = E.getElement(b, ".alert-scroll-wrapper")) w.addEventListener("wheel", q => {
            a.unscroll && ($.AlertScrollManager.startUserScrolling(A), !0 !== a.unscroll && $.AlertScrollManager.checkScrollThreshold(A, b, a.unscroll), $.AlertScrollManager.endUserScrolling(A))
        }, {
            passive: !0
        }), w.addEventListener("touchmove", q => {
            a.unscroll && ($.AlertScrollManager.startUserScrolling(A),
                !0 !== a.unscroll && $.AlertScrollManager.checkScrollThreshold(A, b, a.unscroll), $.AlertScrollManager.endUserScrolling(A))
        }, {
            passive: !0
        }), !0 !== a.unscroll && !1 !== a.unscroll && (v = () => {
            $.AlertScrollManager.checkScrollThreshold(A, b, a.unscroll)
        }, w.addEventListener("scroll", v, {
            passive: !0
        }), h.alertScrollHandlers || (h.alertScrollHandlers = {}), h.alertScrollHandlers[A] = {
            element: w,
            handler: v
        }), a.unscroll && (a.hideScrollbar && (v = document.createElement("style"), v.textContent = "\n\t\t\t\t\t.alert-scroll-wrapper::-webkit-scrollbar {\n\t\t\t\t\t\tdisplay: none !important;\n\t\t\t\t\t\twidth: 0 !important;\n\t\t\t\t\t\theight: 0 !important;\n\t\t\t\t\t}\n\t\t\t\t",
            document.head.appendChild(v), h.alertScrollStyles || (h.alertScrollStyles = {}), h.alertScrollStyles[A] = v), setTimeout(() => {
            $.AlertScrollManager.scrollToBottom(A, b, !0)
        }, 100), v = new MutationObserver(q => {
            $.AlertScrollManager.scrollToBottom(A, b)
        }), w = w.querySelector("div") || w, v.observe(w, {
            childList: !0,
            subtree: !0,
            characterData: !0
        }), z.observers[A] = v);
        return b
    };
    $.alert = function(b, a = {}, l = 300, g) {
        if (z.callbackExecuting) return new Promise(D => {
            setTimeout(() => {
                const J = $.alert(b, a, l, g);
                J && "function" === typeof J.then ? J.then(D) :
                    D(J)
            }, 300)
        });
        "object" !== typeof b || null === b || Array.isArray(b) || void 0 === b.text && void 0 === b.width && void 0 === b.height && void 0 === b.title && void 0 === b.bgcolor && void 0 === b.color && void 0 === b.$Ok && void 0 === b.close && void 0 === b.xclose && void 0 === b.input && void 0 === b.prompt && void 0 === b.toast ? "number" === typeof a ? (g = l, l = a, a = {}) : "function" === typeof a ? (g = a, a = {}) : "function" === typeof l && (g = l, l = 300) : ("number" === typeof a ? ("function" === typeof l && (g = l), l = a, a = b) : "function" === typeof a ? (g = a, a = b) : a = "object" !== typeof a || null ===
            a || Array.isArray(a) ? b : Object.assign({}, b, a), b = "");
        (3 <= arguments.length || !a) && a && (delete a.openSpeed, delete a.closeSpeed);
        var r = a.parent,
            H = Error().stack || "";
        let L = null;
        try {
            "undefined" !== typeof event && event && event.target instanceof Element && (L = event.target.closest(".domquery-alert:not(.toast-alert)"))
        } catch (D) {}
        try {
            !L && document.activeElement instanceof Element && (L = document.activeElement.closest(".domquery-alert:not(.toast-alert)"))
        } catch (D) {}
        var A = L ? L.getAttribute("data-instance-id") : null,
            F = !!L || H.includes("onOpen") ||
            "_self" === a.parent;
        H = Array.from(document.querySelectorAll(".domquery-alert:not(.toast-alert)"));
        H.filter(D => !D.contains(document.activeElement) && D !== document.activeElement);
        if (void 0 === r && A) {
            try {
                const D = Date.now();
                if (L._autoSelfLastOpenAt && 400 > D - L._autoSelfLastOpenAt) return null;
                L._autoSelfLastOpenAt = D;
                setTimeout(() => {
                    try {
                        L && L._autoSelfLastOpenAt === D && delete L._autoSelfLastOpenAt
                    } catch (J) {}
                }, 450)
            } catch (D) {}
            a.parent = "_self";
            a._preferredParentInstanceId = A;
            a.preserveExisting = !0
        } else void 0 === r && 0 < H.length &&
            (a.parent = "_self", a.preserveExisting = !0);
        !0 === a.autoscroll && (A = sa(a.title || String(b)), a._autoscrollId = `${a.id||"default-scroll-position"}-${A}`);
        if (F) a._originalParent = r;
        else {
            a._originalParent = r;
            r = "_self" === a.parent;
            A = a.parent instanceof Element || a.parent instanceof HTMLDocument;
            F = a.parent === window || a.parent === document.defaultView;
            if (!("_blank" === a.parent || r || A || F) && 0 < H.length) return null;
            if (a.parent === window || a.parent === document.defaultView) a.parent = "_blank"
        }
        H = !0 === ("undefined" !== typeof $ && $.isMobile ?
            $.isMobile() : {
                isMobile: !1
            }).isMobile;
        if ((!0 === a.input || "string" === typeof a.input) && H) {
            const D = a.onOpen;
            a.onOpen = function(J) {
                D && D.call(this, J);
                const y = J.querySelectorAll(!0 === a.input ? 'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea' : a.input);
                J.querySelectorAll("select").forEach(k => {
                    k.classList.add("no-virtual-layer")
                });
                if (0 < y.length) {
                    const k = p => {
                        function x(c, n = 5) {
                            let m;
                            if (c.startsWith("#")) {
                                var e = c.substring(1);
                                3 === e.length ? (c =
                                    parseInt(e[0] + e[0], 16), m = parseInt(e[1] + e[1], 16), e = parseInt(e[2] + e[2], 16)) : (c = parseInt(e.substring(0, 2), 16), m = parseInt(e.substring(2, 4), 16), e = parseInt(e.substring(4, 6), 16))
                            } else if (c.startsWith("rgb"))
                                if ((e = c.match(/\d+/g)) && 3 <= e.length) c = parseInt(e[0]), m = parseInt(e[1]), e = parseInt(e[2]);
                                else return c;
                            else return c;
                            c = Math.min(255, Math.round(c * (100 + n) / 100));
                            m = Math.min(255, Math.round(m * (100 + n) / 100));
                            e = Math.min(255, Math.round(e * (100 + n) / 100));
                            return `#${c.toString(16).padStart(2,"0")}${m.toString(16).padStart(2,
"0")}${e.toString(16).padStart(2,"0")}`
                        }

                        function M(c) {
                            let n;
                            if (c.startsWith("#")) {
                                var m = c.substring(1);
                                3 === m.length ? (c = parseInt(m[0] + m[0], 16), n = parseInt(m[1] + m[1], 16), m = parseInt(m[2] + m[2], 16)) : (c = parseInt(m.substring(0, 2), 16), n = parseInt(m.substring(2, 4), 16), m = parseInt(m.substring(4, 6), 16))
                            } else return "#ffffff";
                            return 128 < (299 * c + 587 * n + 114 * m) / 1E3 ? "#000000" : "#ffffff"
                        }
                        if ("checkbox" !== p.type && "radio" !== p.type && "select" !== p.tagName.toLowerCase() && !p.classList.contains("no-virtual-layer")) {
                            document.querySelectorAll(".virtual-input-layer").forEach(c => {
                                c && c.parentNode && c.parentNode.removeChild(c)
                            });
                            document.querySelectorAll(".virtual-input-overlay").forEach(c => {
                                c && c.parentNode && c.parentNode.removeChild(c)
                            });
                            var ha = p.value,
                                ta = p.type,
                                aa = p.placeholder,
                                ia = p.getAttribute("title"),
                                Aa = p.getAttribute("titleColor"),
                                Ea = p.getAttribute("background"),
                                Ca = p.getAttribute("color"),
                                ua = a.inputBgcolor || "#ffffff",
                                Da = a.inputColor || "#333333",
                                Fa = Aa || Da;
                            Aa = (c, n = 20) => {
                                let m;
                                if (c.startsWith("#")) {
                                    var e = c.substring(1);
                                    3 === e.length ? (c = parseInt(e[0] + e[0], 16), m = parseInt(e[1] +
                                        e[1], 16), e = parseInt(e[2] + e[2], 16)) : (c = parseInt(e.substring(0, 2), 16), m = parseInt(e.substring(2, 4), 16), e = parseInt(e.substring(4, 6), 16))
                                } else if (c.startsWith("rgb"))
                                    if ((e = c.match(/\d+/g)) && 3 <= e.length) c = parseInt(e[0]), m = parseInt(e[1]), e = parseInt(e[2]);
                                    else return c;
                                else return c;
                                c = Math.max(0, Math.round(c * (100 - n) / 100));
                                m = Math.max(0, Math.round(m * (100 - n) / 100));
                                e = Math.max(0, Math.round(e * (100 - n) / 100));
                                return `#${c.toString(16).padStart(2,"0")}${m.toString(16).padStart(2,"0")}${e.toString(16).padStart(2,"0")}`
                            };
                            var va = Aa(ua),
                                za = null;
                            !0 === a.inputOverlay && (za = document.createElement("div"), za.className = "virtual-input-overlay", za.id = "virtual-input-overlay-" + Date.now(), za.style.cssText = `\n\t\t\t\t\t\t\t\tposition: fixed;\n\t\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\t\t\theight: 100%;\n\t\t\t\t\t\t\t\tbackground-color: rgba(0, 0, 0, 0.5);\n\t\t\t\t\t\t\t\tz-index: ${parseInt(J.style.zIndex||9999)+2};\n\t\t\t\t\t\t\t\topacity: 0;\n\t\t\t\t\t\t\t\ttransition: opacity 0.3s ease;\n\t\t\t\t\t\t\t`,
                                document.body.appendChild(za), setTimeout(() => {
                                    za.style.opacity = "1"
                                }, 10));
                            var la = document.createElement("div");
                            la.className = "virtual-input-layer";
                            la.id = "virtual-input-layer-" + Date.now();
                            la.style.cssText = `\n\t\t\t\t\t\t\tposition: fixed;\n\t\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\t\tright: 0;\n\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\tbackground-color: ${ua};\n\t\t\t\t\t\t\tcolor: ${Da};\n\t\t\t\t\t\t\tpadding: ${a.inputPadding||"15px"};\n\t\t\t\t\t\t\tmargin: ${a.inputMargin||"0"};\n\t\t\t\t\t\t\tborder-radius: ${a.inputRadius||
"0"};\n\t\t\t\t\t\t\tbox-shadow: 0 2px 10px rgba(0,0,0,0.2);\n\t\t\t\t\t\t\tz-index: ${parseInt(J.style.zIndex||9999)+2};\n\t\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\t\tflex-direction: column;\n\t\t\t\t\t\t\t-webkit-tap-highlight-color: transparent;\n\t\t\t\t\t\t\ttouch-action: manipulation;\n\t\t\t\t\t\t\tfont-size: ${a.inputFontsize||"16px"};\n\t\t\t\t\t\t`;
                            if (ia) {
                                const c = document.createElement("div");
                                c.textContent = ia;
                                c.style.cssText = `\n\t\t\t\t\t\t\t\ttext-align: center;\n\t\t\t\t\t\t\t\tmargin-bottom: 15px;\n\t\t\t\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\t\t\t\tcolor: ${Fa};\n\t\t\t\t\t\t\t`;
                                la.appendChild(c)
                            }
                            var ja = document.createElement("input");
                            ja.type = ta || "text";
                            ja.value = ha || "";
                            ja.placeholder = aa || "";
                            ja.style.cssText = `\n\t\t\t\t\t\t\tmargin: 0 0 10px 0;\n\t\t\t\t\t\t\tpadding: 10px;\n\t\t\t\t\t\t\tborder: 1px solid ${Aa(ua,10)};\n\t\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\t\tfont-size: 16px;\n\t\t\t\t\t\t\tbackground-color: ${Ea||("#ffffff"===ua?"#ffffff":x(ua,5))};\n\t\t\t\t\t\t\tcolor: ${Ca||Da};\n\t\t\t\t\t\t\toutline: none;\n\t\t\t\t\t\t\tappearance: none;\n\t\t\t\t\t\t\t-webkit-appearance: none;\n\t\t\t\t\t\t`;
                            ha = document.createElement("style");
                            Da = a.inputPlaceholder || Da;
                            ha.textContent = `\n\t\t\t\t\t\t\t#${la.id} input::placeholder {\n\t\t\t\t\t\t\t\tcolor: ${Da};\n\t\t\t\t\t\t\t\topacity: ${a.inputPlaceholder?1:.5};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t#${la.id} input::-webkit-input-placeholder {\n\t\t\t\t\t\t\t\tcolor: ${Da};\n\t\t\t\t\t\t\t\topacity: ${a.inputPlaceholder?1:.5};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t#${la.id} input::-moz-placeholder {\n\t\t\t\t\t\t\t\tcolor: ${Da};\n\t\t\t\t\t\t\t\topacity: ${a.inputPlaceholder?
1:.5};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t#${la.id} input:-ms-input-placeholder {\n\t\t\t\t\t\t\t\tcolor: ${Da};\n\t\t\t\t\t\t\t\topacity: ${a.inputPlaceholder?1:.5};\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t`;
                            document.head.appendChild(ha);
                            var q = document.createElement("button");
                            q.textContent = a.inputConfirm || "Confirm";
                            q.style.cssText = `\n\t\t\t\t\t\t\tpadding: 10px;\n\t\t\t\t\t\t\tbackground-color: ${a.OkBgcolor||va};\n\t\t\t\t\t\t\tcolor: ${a.OkColor||M(va)};\n\t\t\t\t\t\t\tborder: none;\n\t\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\t\tfont-size: 16px;\n\t\t\t\t\t\t\tflex: 1;\n\t\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\t`;
                            var d = document.createElement("button");
                            d.textContent = a.inputCancel || "Cancel";
                            d.style.cssText = `\n\t\t\t\t\t\t\tpadding: 10px;\n\t\t\t\t\t\t\tbackground-color: ${Aa(ua,10)};\n\t\t\t\t\t\t\tcolor: ${M(Aa(ua,10))};\n\t\t\t\t\t\t\tborder: none;\n\t\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\t\tfont-size: 16px;\n\t\t\t\t\t\t\tflex: 1;\n\t\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\t`;
                            ua = document.createElement("div");
                            ua.style.cssText = "\n\t\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\t\tgap: 10px;\n\t\t\t\t\t\t";
                            ua.appendChild(q);
                            ua.appendChild(d);
                            la.appendChild(ja);
                            la.appendChild(ua);
                            la.addEventListener("click", function(c) {
                                c.stopPropagation()
                            });
                            ja.addEventListener("click", function(c) {
                                c.stopPropagation()
                            });
                            q.addEventListener("click", function(c) {
                                c.stopPropagation()
                            });
                            d.addEventListener("click", function(c) {
                                c.stopPropagation()
                            });
                            la.dataset.alertId = a.instanceId;
                            var f = () => {
                                try {
                                    za && (za.style.opacity = "0", setTimeout(() => {
                                        const e = document.getElementById(za.id);
                                        e && e.parentNode && e.parentNode.removeChild(e)
                                    }, 300));
                                    document.querySelectorAll(".virtual-input-overlay").forEach(e => {
                                        e && e.parentNode && (e.style.opacity = "0", setTimeout(() => {
                                            e.parentNode && e.parentNode.removeChild(e)
                                        }, 300))
                                    });
                                    var c = document.getElementById(la.id);
                                    if (c && c.parentNode) return c.parentNode.removeChild(c), !0;
                                    const n = document.querySelectorAll(".virtual-input-layer");
                                    if (0 < n.length) return n.forEach(e => {
                                        e && e.parentNode && e.parentNode.removeChild(e)
                                    }), !0;
                                    const m = document.body.children;
                                    for (c = 0; c < m.length; c++)
                                        if (m[c].classList && (m[c].classList.contains("virtual-input-layer") || m[c].classList.contains("virtual-input-overlay"))) return document.body.removeChild(m[c]),
                                            !0;
                                    return !1
                                } catch (n) {
                                    return !1
                                }
                            };
                            q.addEventListener("click", () => {
                                try {
                                    p.value = ja.value;
                                    const c = new Event("input", {
                                        bubbles: !0,
                                        cancelable: !0
                                    });
                                    p.dispatchEvent(c);
                                    const n = new Event("change", {
                                        bubbles: !0,
                                        cancelable: !0
                                    });
                                    p.dispatchEvent(n);
                                    !0 === ("undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                        isIOS: !1
                                    }).isIOS && p.setAttribute("value", ja.value)
                                } catch (c) {} finally {
                                    f() || Array.from(document.body.children).forEach(c => {
                                        c.className && (c.className.includes("virtual-input-layer") || c.className.includes("virtual-input-overlay")) &&
                                            document.body.removeChild(c)
                                    })
                                }
                            });
                            d.addEventListener("click", () => {
                                f() || Array.from(document.body.children).forEach(c => {
                                    c.className && (c.className.includes("virtual-input-layer") || c.className.includes("virtual-input-overlay")) && document.body.removeChild(c)
                                })
                            });
                            ja.addEventListener("keydown", c => {
                                "Enter" === c.key ? (c.preventDefault(), q.click()) : "Escape" === c.key && (c.preventDefault(), d.click())
                            });
                            document.body.appendChild(la);
                            za && za.addEventListener("click", c => {
                                c.target === za && f()
                            });
                            setTimeout(() => {
                                const c =
                                    function(n) {
                                        la.contains(n.target) || n.target === la || n.target.classList.contains("virtual-input-overlay") || (f(), document.removeEventListener("click", c))
                                    };
                                document.addEventListener("click", c)
                            }, 300);
                            setTimeout(() => {
                                ja.focus()
                            }, 100)
                        }
                    };
                    y.forEach(p => {
                        if (!(p.readOnly || p.disabled || p.classList.contains("no-virtual-layer"))) {
                            var x = p.onfocus;
                            p.addEventListener("click", M => {
                                M.preventDefault();
                                M.stopPropagation();
                                k(p)
                            });
                            p.onfocus = function(M) {
                                "checkbox" === p.type || "radio" === p.type || "select" === p.tagName.toLowerCase() ||
                                    p.classList.contains("no-virtual-layer") ? x && x.call(this, M) : (M && M.preventDefault(), p.blur(), x && x.call(this, M), setTimeout(() => {
                                        k(p)
                                    }, 50))
                            }
                        }
                    })
                }
            }
        }
        if (!0 === a.confirm) return a.Ok = a.Ok || "OK", a.$cancel = a.$cancel || "cancel", new Promise(D => {
            const J = event,
                {
                    alertBox: y,
                    options: k,
                    speed: p,
                    buttonConfigs: x
                } = $._alert0(String(b), a, l);
            k.buttonConfigs = x;
            $._alert1(y, k, p, (M, ha) => {
                M = "button" === ha;
                g && g(M);
                D(M)
            }, J)
        });
        H = event;
        const {
            alertBox: w,
            options: t,
            speed: G,
            buttonConfigs: v
        } = $._alert0(b, a, l);
        t.buttonConfigs = v;
        return $._alert1(w,
            t, G, g, H)
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
                Array.from(document.querySelectorAll(".domquery-alert.toast-alert")).forEach(r => {
                    (r = E.getElement(r, ".domquery-close-x-btn") || E.getElement(r, ".domquery-alert-close-btn")) && r.click()
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
        if (b = document.getElementById(b)) {
            b.timeoutId && (clearTimeout(b.timeoutId),
                b.timeoutId = null);
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
        let r;
        const H = y => {
            if ("function" === typeof y) return y();
            if (Array.isArray(y) && 3 === y.length) {
                const [k, p, x] = y;
                switch (p) {
                    case ">":
                        return k > x;
                    case "<":
                        return k < x;
                    case ">=":
                        return k >= x;
                    case "<=":
                        return k <=
                            x;
                    case "===":
                        return k === x;
                    case "!==":
                        return k !== x;
                    default:
                        return !!y
                }
            } else return "boolean" === typeof y ? y : !!y
        };
        var L = (y, k, p = g) => $if(y, k, p);
        if ("object" === typeof a) {
            if (void 0 !== a.if) return H(b) ? L(a.if, {
                ...a,
                if: void 0
            }, l, g) : {
                else: function() {},
                elseif: function() {}
            };
            if (a.hasOwnProperty("else")) {
                L = a.else;
                delete a.else;
                if (H(b)) return $.alert(a.title || b, a, l);
                "function" === typeof L && L();
                return {
                    else: function() {},
                    elseif: function() {}
                }
            }
        }
        "number" === typeof a ? (g = l, l = a, a = {}) : "function" === typeof a ? (g = a, a = {}, l = 300) : "function" ===
            typeof l && (g = l, l = 300);
        4 <= arguments.length && "function" === typeof arguments[3] && (g = arguments[3]);
        var A = r = b;
        a.ifO ? A = String(b) : (r = H(b), A = String(r));
        const F = (y => function(...k) {
                let p = -1;
                for (let x = k.length - 1; 0 <= x; x--)
                    if ("object" === typeof k[x] && null !== k[x] && !Array.isArray(k[x])) {
                        p = x;
                        break
                    } 0 <= p ? k[p].hasOwnProperty("retainScroll") || (k[p] = {
                    ...k[p],
                    retainScroll: !1
                }) : k.push({
                    retainScroll: !1
                });
                return y.apply(this, k)
            })($.alert),
            w = y => {
                const k = $.alert;
                $.alert = F;
                try {
                    y?.()
                } finally {
                    $.alert = k
                }
            };
        L = {
            elseif: function(y, k) {
                !r &&
                    "function" === typeof k && H(y) && (w(k), this.previousResult = !0);
                return this
            },
            else: function(y) {
                if (!r && !this.previousResult && "function" === typeof y) return w(y), this;
                if (a.$cancel) v.cancel = y;
                else {
                    const k = y.toString().match(/\(([^)]*)\)/);
                    if (k && k[1]) {
                        const p = k[1].trim();
                        D.includes(p) && (v[p] = y, D = D.filter(x => x !== p))
                    }
                }
                return this
            },
            previousResult: !1
        };
        a = (y => {
            y = {
                ...y
            };
            void 0 !== y.$ok && (y.$Ok = y.$ok, delete y.$ok);
            void 0 !== y.Ok && (y.$Ok = y.Ok, delete y.Ok);
            void 0 !== y.$OkBgcolor && (y.OkBgcolor = y.$OkBgcolor, delete y.$OkBgcolor);
            void 0 !== y.$OkColor && (y.OkColor = y.$OkColor, delete y.$OkColor);
            return y
        })(a);
        const t = "$Ok $ok $OkBgcolor $OkColor $cancel $cancelBgcolor $cancelColor".split(" ");
        var G = Object.keys(a).some(y => y.startsWith("$") && !t.includes(y));
        a = {
            $Ok: "OK",
            Cancel: "cancel",
            ...(G || !1 === a.$cancel ? {} : {
                $cancel: "cancel"
            }),
            OkBgcolor: "#E0E0E0",
            OkColor: "#000000",
            $cancelBgcolor: "#ECEFF1",
            $cancelColor: "#607D8B",
            ...a
        };
        if (G || !1 === a.$cancel) delete a.$cancel, delete a.$cancelBgcolor, delete a.$cancelColor;
        let v = {},
            D = Object.keys(a).filter(y =>
                y.startsWith("$") && !t.includes(y) && "undefined" !== typeof a[y] && null !== a[y]).map(y => y.substring(1));
        G = {
            else: function(y) {
                if (a.$cancel) v.cancel = y;
                else {
                    const k = y.toString().match(/\(([^)]*)\)/);
                    if (k && k[1]) {
                        const p = k[1].trim();
                        D.includes(p) && (v[p] = y, D = D.filter(x => x !== p))
                    }
                }
                return this
            }
        };
        if (!a.ifO && !r) return v.cancel && v.cancel.call(null, "condition_false"), Object.assign(G, L);
        const J = {
            ...a
        };
        void 0 !== a.$cancel && (J.Cancel = a.$cancel, J.$cancel = a.$cancel);
        J.Ok = function() {
            g && "function" === typeof g && g.call(this, this);
            this.close()
        };
        a.$cancel && (J.cancel = function() {
            this.close();
            v.cancel && v.cancel.call(this, "cancel")
        });
        Object.keys(a).filter(y => y.startsWith("$") && !t.includes(y)).forEach(y => {
            const k = y.substring(1);
            J[k] = function() {
                this.close();
                v[k] && v[k].call(this, k)
            }
        });
        A = J.message || A;
        J.message && delete J.message;
        $.alert(A, J, l);
        return Object.assign(G, L)
    };
    $.closeAlert = function(b, a) {
        "function" === typeof b && (a = b, b = null);
        var l = document.querySelectorAll(".domquery-alert");
        if (0 === l.length) return document.body.style.overflow =
            "", document.documentElement.style.overflow = "", document.querySelectorAll(".domquery-blank-container").forEach(F => {
                F && F.parentNode && F.parentNode.removeChild(F)
            }), document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay").forEach(F => {
                F && F.parentNode && F.parentNode.removeChild(F)
            }), "function" === typeof a && setTimeout(a, 300, null, "no_alert"), !1;
        let g = null;
        if (b) {
            if ((g = document.getElementById(b)) || (g = document.querySelector(`.domquery-alert[data-id="${b}"]`)), g || (g = document.querySelector(`.domquery-alert[data-instance-id="${b}"]`)),
                !g || !g.classList.contains("domquery-alert")) return "function" === typeof a && setTimeout(a, 50, null, "id_not_found"), !1
        } else g = l[l.length - 1];
        let r = !1;
        const H = (F, w) => {
                r || "function" !== typeof a || (r = !0, setTimeout(() => {
                    a(F, w)
                }, 300))
            },
            L = new MutationObserver(F => {
                for (const w of F) "childList" === w.type && (F = Array.from(w.removedNodes), F.includes(g) || F.some(t => t.contains && t.contains(g))) && (L.disconnect(), H("removed", "dom_observation"))
            });
        L.observe(document.body, {
            childList: !0,
            subtree: !0
        });
        b = setTimeout(() => {
            L.disconnect();
            H("timeout", "safety")
        }, 1E3);
        try {
            const F = g.getAttribute("data-instance-id");
            l = "normal";
            let w = {};
            try {
                var A = g.getAttribute("data-options");
                A && (w = JSON.parse(A)) && "_self" === w.parent && (l = "self")
            } catch (G) {}
            const t = E.getElement(g, ".domquery-close-x-btn") || E.getElement(g, ".domquery-alert-close-btn");
            if ("self" === l) {
                const G = g.querySelectorAll("button");
                if (0 < G.length) {
                    A = null;
                    for (const v of G) {
                        const D = v.textContent.trim().toLowerCase();
                        if ("\ud655\uc778" === D || "ok" === D || "\uc608" === D || "yes" === D) {
                            A = v;
                            break
                        }
                    }
                    A ? A.click() :
                        t ? t.click() : G[0].click()
                } else t && t.click();
                setTimeout(() => {
                    if (document.contains(g)) {
                        g.parentNode && g.parentNode.removeChild(g);
                        const v = document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay");
                        for (const D of v) D.parentNode && D.parentNode.removeChild(D);
                        H("forced_removal", "parent_self")
                    }
                }, 100)
            } else if (t) t.click(), setTimeout(() => {
                if (document.contains(g)) {
                    const G = document.querySelector(`.domquery-alert[data-instance-id="${F}"]`);
                    if (G) {
                        const v = E.getElement(G, ".domquery-close-x-btn") ||
                            E.getElement(G, ".domquery-alert-close-btn");
                        v && v.click();
                        setTimeout(() => {
                            if (document.contains(G)) {
                                G.parentNode && G.parentNode.removeChild(G);
                                const D = document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay");
                                for (const J of D) J.parentNode && J.parentNode.removeChild(J);
                                document.querySelectorAll(".domquery-blank-container").forEach(J => {
                                    J && J.parentNode && J.parentNode.removeChild(J)
                                })
                            }
                        }, 100)
                    }
                }
            }, 100);
            else {
                g.parentNode && g.parentNode.removeChild(g);
                const G = document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay");
                for (const v of G) v.parentNode && v.parentNode.removeChild(v);
                H("forced_removal", "no_button")
            }
            return !0
        } catch (F) {
            try {
                g && g.parentNode && g.parentNode.removeChild(g);
                const w = document.querySelectorAll(".domquery-shadow-overlay, .domquery-toast-overlay");
                for (const t of w) t.parentNode && t.parentNode.removeChild(t)
            } catch (w) {}
            clearTimeout(b);
            L.disconnect();
            H("emergency_removal", "error_recovery");
            return !0
        }
    }
})("undefined" !== typeof window ? window : this);
$.fn.alert = function(h, z, ka, P) {
    const sa = this[0];
    if (!sa) return this;
    z = z || {};
    z.parent = sa;
    $.alert(h, z, ka, P);
    return this
};
$.fn.confirm = function(h, z, ka) {
    const P = this[0];
    if (!P) return this;
    z = z || {};
    z.parent = P;
    return $.confirm(h, z, ka)
};
$.fn.prompt = function(h, z, ka, P) {
    const sa = this[0];
    if (!sa) return this;
    z = z || {};
    z.parent = sa;
    z.prompt = !0;
    $.alert(h, z, ka, P);
    return this
};
$.fn.toast = function(h, z, ka, P) {
    const sa = this[0];
    if (!sa) return this;
    z = z || {};
    z.parent = sa;
    z.toast = !0;
    $.alert(h, z, ka, P);
    return this
};
$.fn.closeToast = function(h) {
    !h && this[0] && this[0].id && (h = this[0].id);
    h && $.closeToast(h);
    return this
};
$.fn.if = function(h, z, ka, P) {
    const sa = this[0];
    if (!sa) return this;
    z = z || {};
    z.parent = sa;
    return $.if(h, z, ka, P)
};
$.fn.topAlert = function(h = 0, z = 300, ka) {
    var P = $(".domquery-alert");
    if (0 === P.length) return "function" === typeof ka && ka(!1), !1;
    P = P.last();
    P = [P.find(".alert-scroll-wrapper"), P.find(".domquery-alert-body"), P.find('div[style*="overflow: auto"]'), P.find('div[style*="overflow-y: auto"]'), P.find('div[style*="overflow-y: scroll"]'), P].filter(E => 0 < E.length);
    let sa = !1;
    for (const E of P)
        if (E[0].scrollHeight > E[0].clientHeight) {
            const b = E.scrollTop(),
                a = h - b,
                l = performance.now(),
                g = r => {
                    r = Math.min((r - l) / z, 1);
                    E.scrollTop(b +
                        a * (1 - Math.pow(1 - r, 2)));
                    1 > r ? requestAnimationFrame(g) : sa || "function" !== typeof ka || (sa = !0, ka(!0))
                };
            requestAnimationFrame(g);
            return !0
        }
    "function" !== typeof ka || sa || ka(!1);
    return !1
};
const $alert = function(...h) {
        if (1 === h.length && "object" === typeof h[0]) {
            h = h[0];
            const z = "alert_" + Date.now();
            h.alertId = z;
            const ka = document.createElement("div");
            ka.id = z;
            for (const P in h) "function" === typeof h[P] && (ka[P] = h[P]);
            document.body.appendChild(ka);
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
    $topAlert = function(h = 0, z = 300, ka) {
        return $.fn.topAlert.call($, h, z, ka)
    },
    $openAlert = function(h, z) {
        return $.openAlert(h, z)
    };
$.openAlert = function(h, z) {
    let ka = null;
    z ? "function" === typeof z && (ka = z, z = {}) : z = {};
    return new Promise(P => {
        $.closeAlert(() => {
            let sa = !1;
            var E = h;
            h.startsWith("#") && (E = h.substring(1));
            if (E = document.getElementById(E)) E.click(), sa = !0;
            ka && "function" === typeof ka && setTimeout(() => ka(sa), 50);
            P(sa)
        })
    })
};
const $lastAlert = function() {
        const h = Array.from(document.querySelectorAll(".domquery-alert"));
        return $(h[h.length - 1])
},
$spinner = function(h, z, ka) {
	if (!h) {
		z = $(".domquery-spinner-overlay");
		ka = $(".domquery-spinner-container");
		h = $(".domquery-spinner-message");
		if (z.length) {
			var P = parseFloat(z.css("opacity")),
				sa = z.data("opacity");
			0 < P || sa ? (ka.remove(), h.length && (h.css({
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
	const E = $lastAlert();
	if (!E.length) return this;
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
			r = $("<div>", {
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
		const H = $("<div>", {
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
		const L = "spinner-style-" + l;
		$("#" + L).remove();
		$("<style>", {
			id: L,
			text: `\n                @keyframes spin {\n                    0% { transform: rotate(0deg); }\n                    100% { transform: rotate(360deg); }\n                }\n                @keyframes fadeIn {\n                    0% { opacity: 0; }\n                    100% { opacity: ${l}; }\n                }\n                @keyframes fadeOut {\n                    0% { opacity: ${l}; }\n                    100% { opacity: 0; }\n                }\n                @keyframes messageShow {\n                    0% { opacity: 0; }\n                    100% { opacity: 1; }\n                }\n                @keyframes messageHide {\n                    0% { opacity: 1; }\n                    100% { opacity: 0; }\n                }\n                .domquery-spinner-overlay {\n                    animation: fadeIn 0.5s forwards;\n                }\n                .domquery-spinner-message {\n                    opacity: 0;\n                    animation: messageShow 0.5s forwards;\n                }\n            `
		}).appendTo("head");
		g.append(r);
		E.append(a);
		E.append(H);
		E.append(g);
		a.data("opacity", l);
		return {
			spinner: r,
			overlay: a,
			messageOverlay: H,
			spinnerContainer: g
		}
	};
	P = (a, l) => {
		void 0 !== a && "50%" !== a && b.spinnerContainer.css({
			top: a
		});
		void 0 !== l && "50%" !== l && b.spinnerContainer.css({
			left: l
		})
	};
	sa = (a, l) => {
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
			text: r,
			backgroundColor: H,
			opacity: L,
			spinner: A
		} = z;
		b = h(H, L);
		P(a, l);
		if (void 0 !== g) {
			const F = $("<div>", {
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
			}).appendTo(E);
			F.html(g);
			sa(F, z);
			setTimeout(() => {
				F.css("animation", "messageShow 0.5s forwards")
			}, 50);
			!0 !== A && setTimeout(() => {
				$(".domquery-spinner").hide();
				$(".domquery-spinner-container").hide()
			}, 300)
		} else if (void 0 !== r) {
			const F = $("<div>", {
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
			}).appendTo(E);
			F.html(r);
			sa(F, z);
			setTimeout(() => {
				F.css("animation", "messageShow 0.5s forwards")
			}, 50);
			!0 !== A && setTimeout(() => {
				$(".domquery-spinner").hide();
				$(".domquery-spinner-container").hide()
			}, 300)
		}
	} else b = h(), P(z,
		ka);
	return this
};