$.lazyLoadImages = function(h, p, r) {
    if (!this.elements || !Array.isArray(this.elements)) throw Error("lazyLoadImages.js requires domquery.js (this.elements is required)");
    if ("object" === typeof h && h.simply) {
        const a = h.selector || "[data-src]";
        let b;
        if (1 === this.elements.length && this.elements[0] === document) b = document.querySelectorAll(a);
        else {
            const c = new Set;
            this.elements.forEach(e => {
                e.querySelectorAll(a).forEach(k => c.add(k))
            });
            b = Array.from(c)
        }
        const d = c => {
                const e = c.dataset.src;
                e && ("img" === c.tagName.toLowerCase() ?
                    (c.src = e, c.alt = c.alt || "") : c.style.backgroundImage = `url(${e})`, c.removeAttribute("data-src"))
            },
            f = (c, e = 50) => {
                c = c.getBoundingClientRect();
                return c.top >= -e && c.left >= -e && c.bottom <= (window.innerHeight || document.documentElement.clientHeight) + e && c.right <= (window.innerWidth || document.documentElement.clientWidth) + e
            };
        if ("undefined" !== typeof IntersectionObserver) {
            const c = new IntersectionObserver((e, k) => {
                e.forEach(l => {
                    l.isIntersecting && (d(l.target), k.unobserve(l.target))
                })
            }, {
                threshold: .1,
                rootMargin: "50px"
            });
            b.forEach(e =>
                c.observe(e));
            this.destroy = function() {
                c.disconnect();
                return this
            }
        } else {
            const c = () => {
                b = b.filter(m => m.dataset.src);
                0 === b.length ? (window.removeEventListener("scroll", k, l ? {
                    passive: !0
                } : !1), window.removeEventListener("resize", k, l ? {
                    passive: !0
                } : !1)) : b.forEach(m => {
                    m.dataset.src && f(m, 50) && d(m)
                })
            };
            c();
            let e;
            const k = () => {
                    e && clearTimeout(e);
                    e = setTimeout(c, 100)
                },
                l = function() {
                    let m = !1;
                    try {
                        const q = Object.defineProperty({}, "passive", {
                            get: function() {
                                m = !0
                            }
                        });
                        window.addEventListener("test", null, q);
                        window.removeEventListener("test",
                            null, q)
                    } catch (q) {}
                    return m
                }();
            window.addEventListener("scroll", k, l ? {
                passive: !0
            } : !1);
            window.addEventListener("resize", k, l ? {
                passive: !0
            } : !1);
            this.destroy = function() {
                window.removeEventListener("scroll", k, l ? {
                    passive: !0
                } : !1);
                window.removeEventListener("resize", k, l ? {
                    passive: !0
                } : !1);
                e && (clearTimeout(e), e = null);
                return this
            }
        }
        return this
    }
    const w = {
        duration: 0,
        threshold: .1,
        rootMargin: "50px",
        callback: null,
        maxRetries: 3,
        retryDelay: 1E3,
        loading: !1,
        removeLoading: !0,
        placeholder: !1
    };
    let g = {
            ...w
        },
        t = null;
    "function" === typeof h ?
        g.callback = h : "number" === typeof h ? (g.duration = h, g.callback = p) : "string" === typeof h ? (t = h, "function" === typeof p ? g.callback = p : "number" === typeof p && (g.duration = p, g.callback = r)) : "object" === typeof h && (g = {
            ...w,
            ...h
        });
    let n;
    if (1 === this.elements.length && this.elements[0] === document) n = Array.from(document.querySelectorAll(t || "[data-src]"));
    else {
        const a = new Set;
        this.elements.forEach(b => {
            b.querySelectorAll(t || "[data-src]").forEach(d => a.add(d))
        });
        n = Array.from(a)
    }
    document.getElementById("lazy-loading-styles") || (h =
        document.createElement("style"), h.id = "lazy-loading-styles", h.textContent = "\n            .lazy-loading-wrap {\n                position: absolute !important;\n                top: 0 !important;\n                left: 0 !important;\n                width: 100% !important;\n                height: 100% !important;\n                z-index: 9998 !important;\n                pointer-events: none !important;\n                overflow: visible !important;\n                background-color: rgba(255, 255, 255, 0.5) !important;\n                backdrop-filter: blur(3px) !important;\n                transition: opacity 0.2s ease !important;\n            }\n            .lazy-loading-indicator {\n                position: absolute !important;\n                top: 50% !important;\n                left: 50% !important;\n                transform: translate(-50%, -50%) !important;\n                width: 60px !important;\n                height: 30px !important;\n                z-index: 9999 !important;\n                pointer-events: none !important;\n                display: flex !important;\n                justify-content: center !important;\n                align-items: center !important;\n            }\n            .lazy-loading-dot {\n                width: 8px !important;\n                height: 8px !important;\n                margin: 0 3px !important;\n                border-radius: 50% !important;\n                background-color: rgba(0, 0, 0, 0.5) !important;\n                display: inline-block !important;\n                animation: lazyPulse 1.4s infinite ease-in-out !important;\n            }\n            .lazy-loading-dot:nth-child(1) { animation-delay: 0s !important; }\n            .lazy-loading-dot:nth-child(2) { animation-delay: 0.2s !important; }\n            .lazy-loading-dot:nth-child(3) { animation-delay: 0.4s !important; }\n            @keyframes lazyPulse {\n                0%, 100% { transform: scale(0.6); opacity: 0.6; }\n                50% { transform: scale(1); opacity: 1; }\n            }\n            .lazy-loading-progress {\n                position: absolute !important;\n                bottom: 0 !important;\n                left: 0 !important;\n                height: 3px !important;\n                width: 0% !important;\n                background: linear-gradient(to right, #4facfe, #00f2fe) !important;\n                transition: width 0.3s ease !important;\n                z-index: 9999 !important;\n                box-shadow: 0 0 5px rgba(79, 172, 254, 0.5) !important;\n            }\n            .lazy-placeholder {\n                background-color: #f0f0f0 !important;\n                background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%) !important;\n                background-size: 200% 100% !important;\n                animation: shimmer 1.5s infinite !important;\n            }\n            @keyframes shimmer {\n                0% { background-position: 200% 0; }\n                100% { background-position: -200% 0; }\n            }\n        ",
        document.head.appendChild(h));
    n.forEach(a => {
        "img" === a.tagName.toLowerCase() && a.dataset.src && (g.placeholder && a.classList.add("lazy-placeholder"), a.src && "" !== a.src && a.src !== window.location.href || (a.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"), 0 < g.duration && (a.style.opacity = "0"))
    });
    const A = (a, b) => {
            let d;
            return (...f) => {
                clearTimeout(d);
                d = setTimeout(() => a(...f), b)
            }
        },
        x = a => {
            var b = window.getComputedStyle(a).position,
                d = "img" === a.tagName.toLowerCase();
            const f = document.createElement("div");
            f.className = "lazy-loading-wrap";
            var c = document.createElement("div");
            c.className = "lazy-loading-indicator";
            "string" === typeof g.loading ? (c.innerHTML = g.loading, c.style.color = "rgba(0, 0, 0, 0.7)", c.style.fontSize = "14px", c.style.whiteSpace = "nowrap") : c.innerHTML = '<div class="lazy-loading-dot"></div><div class="lazy-loading-dot"></div><div class="lazy-loading-dot"></div>';
            const e = document.createElement("div");
            e.className = "lazy-loading-progress";
            f.appendChild(c);
            f.appendChild(e);
            let k = 0;
            const l = setInterval(() => {
                k += 5 * Math.random();
                95 < k && (clearInterval(l), k = 95);
                e.style.width = k + "%"
            }, 200);
            c = {
                element: a,
                wrapper: f,
                indicator: c,
                originalPosition: b,
                progressBar: e,
                progressInterval: l
            };
            if (d)
                if (b = a.parentNode, "absolute" === window.getComputedStyle(a).position) "static" === window.getComputedStyle(b).position && (b.style.position = "relative"), b.appendChild(f);
                else {
                    d = document.createElement("div");
                    const m = a.offsetWidth || b.offsetWidth || "100%",
                        q = a.offsetHeight || b.offsetHeight || "auto";
                    d.style.cssText = `position: relative; display: inline-block; width: ${"number"===
typeof m?m+"px":m}; height: ${"number"===typeof q?q+"px":q}; overflow: hidden;`;
                    b.insertBefore(d, a);
                    d.appendChild(a);
                    d.appendChild(f);
                    c.container = d
                }
            else "static" === b && (a.style.position = "relative"), a.appendChild(f);
            return c
        },
        u = a => {
            a && (a.progressInterval && (clearInterval(a.progressInterval), a.progressBar && (a.progressBar.style.width = "100%")), a.wrapper?.parentNode && (a.wrapper.style.opacity = "0", setTimeout(() => {
                a.wrapper?.parentNode?.removeChild(a.wrapper)
            }, 200)), a.container?.parentNode && setTimeout(() => {
                const {
                    element: b,
                    container: d
                } = a;
                d.parentNode.insertBefore(b, d);
                d.parentNode.removeChild(d)
            }, 200), a.element && "static" === a.originalPosition && setTimeout(() => {
                a.element.style.position = "static"
            }, 200), a.element && g.placeholder && a.element.classList.remove("lazy-placeholder"))
        },
        y = a => {
            if ("img" === a.tagName.toLowerCase()) {
                var b = a.getAttribute("width"),
                    d = a.getAttribute("height");
                b && d ? a.style.aspectRatio = b / d : (b = a.offsetWidth, d = a.offsetHeight, 0 < b && 0 < d ? a.style.aspectRatio = b / d : a.style.minHeight = 0 < b ? .5625 * b + "px" : "200px");
                g.placeholder &&
                    a.classList.add("lazy-placeholder")
            } else 50 > a.offsetHeight && (b = a.offsetWidth, a.style.minHeight = 0 < b ? .5625 * b + "px" : "200px"), !g.placeholder || a.style.backgroundColor && "transparent" !== a.style.backgroundColor || a.classList.add("lazy-placeholder")
        },
        v = (a, b, d = 0, f = null) => {
            const c = new Image;
            a.tagName.toLowerCase();
            c.onload = A(() => {
                0 < g.duration ? (a.style.transition = `opacity ${g.duration}ms ease-in`, requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        a.style.opacity = "1";
                        f && setTimeout(() => u(f), g.duration)
                    })
                })) : (a.style.opacity =
                    "1", f && u(f));
                g.callback && g.callback(b, null, a)
            }, 50);
            c.onerror = () => {
                d < g.maxRetries ? setTimeout(() => v(a, b, d + 1, f), g.retryDelay) : (a.style.opacity = "1", f && u(f), g.callback && g.callback(b, Error("Failed to load image after retries"), a))
            };
            c.src = b
        },
        B = (a, b = 50) => {
            a = a.getBoundingClientRect();
            return a.top >= -b && a.left >= -b && a.bottom <= (window.innerHeight || document.documentElement.clientHeight) + b && a.right <= (window.innerWidth || document.documentElement.clientWidth) + b
        },
        z = a => {
            const b = a.dataset.src;
            if (b)
                if ("img" === a.tagName.toLowerCase()) {
                    y(a);
                    const f = g.loading ? x(a) : null;
                    0 < g.duration && (a.style.opacity = "0");
                    const c = new Image;
                    var d = a.parentElement;
                    const e = d && 0 < parseFloat(window.getComputedStyle(d).paddingTop);
                    d = () => {
                        if (c.naturalWidth && c.naturalHeight) {
                            const k = window.getComputedStyle(a);
                            e || k.aspectRatio || a.style.aspectRatio || a.style.width || a.style.height || a.hasAttribute("width") || a.hasAttribute("height") || (a.style.aspectRatio = `${c.naturalWidth} / ${c.naturalHeight}`);
                            e && (a.style.minHeight = "0", a.style.height = "100%", a.style.width = "100%")
                        }
                        a.src =
                            b;
                        a.alt = a.alt || "";
                        a.removeAttribute("data-src");
                        v(a, b, 0, f)
                    };
                    c.onload = d;
                    c.onerror = d;
                    c.src = b
                } else y(a), d = g.loading ? x(a) : null, 0 < g.duration && (a.style.opacity = "0"), a.style.backgroundImage = `url(${b})`, a.removeAttribute("data-src"), v(a, b, 0, d)
        };
    if ("undefined" !== typeof IntersectionObserver) {
        const a = new IntersectionObserver((b, d) => {
            b.forEach(f => {
                f.isIntersecting && (z(f.target), d.unobserve(f.target))
            })
        }, {
            threshold: g.threshold,
            rootMargin: g.rootMargin
        });
        n.forEach(b => a.observe(b));
        this.destroy = function() {
            a.disconnect();
            return this
        }
    } else {
        const a = () => {
            n = n.filter(c => c.dataset.src);
            0 === n.length ? (window.removeEventListener("scroll", d, f ? {
                passive: !0
            } : !1), window.removeEventListener("resize", d, f ? {
                passive: !0
            } : !1)) : n.forEach(c => {
                c.dataset.src && B(c, 50) && z(c)
            })
        };
        a();
        let b;
        const d = () => {
                b && clearTimeout(b);
                b = setTimeout(a, 100)
            },
            f = function() {
                let c = !1;
                try {
                    const e = Object.defineProperty({}, "passive", {
                        get: function() {
                            c = !0
                        }
                    });
                    window.addEventListener("test", null, e);
                    window.removeEventListener("test", null, e)
                } catch (e) {}
                return c
            }();
        window.addEventListener("scroll",
            d, f ? {
                passive: !0
            } : !1);
        window.addEventListener("resize", d, f ? {
            passive: !0
        } : !1);
        this.destroy = function() {
            window.removeEventListener("scroll", d, f ? {
                passive: !0
            } : !1);
            window.removeEventListener("resize", d, f ? {
                passive: !0
            } : !1);
            b && (clearTimeout(b), b = null);
            return this
        }
    }
    return this
};
$.fn.lazyLoadImages = function(h, p, r) {
    return $.lazyLoadImages.call(this, h, p, r)
};