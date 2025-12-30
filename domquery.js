function DomQuery(a, b) {
    function c() {
        if (!g && "undefined" !== typeof window && window.MutationObserver) {
            g = new MutationObserver(function(m) {
                l && clearTimeout(l);
                l = setTimeout(function() {
                    h.clear();
                    l = null
                }, 100)
            });
            try {
                g.observe(document.documentElement || document.body, {
                    childList: !0,
                    subtree: !0,
                    attributes: !1,
                    characterData: !1
                })
            } catch (m) {
                g = null
            }
        }
    }

    function d(m) {
        if (m === document || m === document.documentElement) {
            c();
            if (h.has("document")) return h.get("document");
            m = [];
            var u = document.documentElement;
            if (!u) return h.set("document",
                []), [];
            u = document.createTreeWalker(u, NodeFilter.SHOW_ELEMENT, null, !1);
            for (var z; z = u.nextNode();) m.push(z);
            h.set("document", m);
            return m
        }
        if (f.has(m)) return f.get(m);
        u = [];
        try {
            z = document.createTreeWalker(m, NodeFilter.SHOW_ELEMENT, null, !1);
            let B;
            for (; B = z.nextNode();) u.push(B)
        } catch (B) {
            return Array.from(m.querySelectorAll("*") || [])
        }
        f.set(m, u);
        return u
    }

    function e(m) {
        return (m = m.match(/(['"])((?:(?!\1)[^\\]|\\[\s\S])*)\1/)) ? m[2] : null
    }
    if (!(this instanceof DomQuery)) return new DomQuery(a, b);
    this.elements = [];
    this._Queue = Promise.resolve();
    b = b || document;
    b instanceof DomQuery && (b = b[0] || document);
    this.selector = a;
    const f = new WeakMap,
        h = new Map;
    let g = null,
        l = null;
    const k = (m, u) => {
            if (!m || !u) return [];
            m = m.split(" ").filter(z => z.trim());
            u = [u];
            for (let z = 0; z < m.length; z++) {
                const B = m[z].trim();
                if (!B) continue;
                const C = [];
                for (const D of u)
                    if (D)
                        if (B.includes(":")) {
                            const [F, ...G] = B.split(":"), v = G.join(":");
                            let x;
                            try {
                                if (x = F ? Array.from(D.querySelectorAll(F) || []) : d(D), v.includes("(")) {
                                    const r = v.match(/([^(]+)\((.*)\)/);
                                    if (r) {
                                        const [,
                                            q, w
                                        ] = r, y = w.trim();
                                        if ("eq" === q) {
                                            const A = parseInt(y);
                                            x[A] && C.push(x[A])
                                        } else n[":" + v] && C.push(...x.filter((A, I, E) => A && n[":" + v](A, I, E, y)))
                                    }
                                } else n[":" + v] && C.push(...x.filter((r, q, w) => r && n[":" + v](r, q, w)))
                            } catch (r) {
                                console.warn(`Error processing selector part: ${B}`, r)
                            }
                        } else try {
                            const F = D.querySelectorAll(B);
                            F && F.length && C.push(...F)
                        } catch (F) {
                            console.warn(`Error with selector: ${B}`, F)
                        }
                u = C.filter(Boolean)
            }
            return [...(new Set(u))]
        },
        n = {
            ":button": m => "button" === m.tagName.toLowerCase() || "input" === m.tagName.toLowerCase() &&
                "button" === m.type,
            ":checkbox": m => "input" === m.tagName.toLowerCase() && "checkbox" === m.type,
            ":radio": m => "radio" === m.type,
            ":file": m => "file" === m.type,
            ":image": m => "image" === m.type,
            ":password": m => "password" === m.type,
            ":reset": m => "reset" === m.type,
            ":submit": m => "input" === m.tagName.toLowerCase() && "submit" === m.type || "button" === m.tagName.toLowerCase() && (!m.type || "submit" === m.type),
            ":text": m => "text" === m.type,
            ":header": m => /^h[1-6]$/i.test(m.tagName),
            ":input": m => /^(input|select|textarea|button)$/i.test(m.tagName),
            ":parent": m => 0 < m.childNodes.length,
            ":empty": m => 0 === m.childNodes.length,
            ":enabled": m => !m.disabled && "hidden" !== m.type,
            ":disabled": m => !0 === m.disabled,
            ":checked": m => !0 === m.checked,
            ":selected": m => "option" === m.tagName.toLowerCase() && !0 === m.selected,
            ":first": (m, u) => 0 === u,
            ":last": (m, u, z) => u === z.length - 1,
            ":even": (m, u) => 0 === u % 2,
            ":odd": (m, u) => 0 !== u % 2,
            ":lt": (m, u, z, B) => u < parseInt(B),
            ":gt": (m, u, z, B) => u > parseInt(B),
            ":eq": (m, u, z, B) => {
                m = parseInt(B);
                return u === m
            },
            ":first-child": m => m === m.parentNode.firstElementChild,
            ":last-child": m => m === m.parentNode.lastElementChild,
            ":only-child": m => 1 === m.parentNode.children.length,
            ":nth-child": (m, u, z, B) => {
                u = Array.from(m.parentNode.children);
                B = parseInt(B);
                return u.indexOf(m) === B - 1
            },
            ":not": (m, u, z, B) => !m.matches(B),
            ":nth-of-type": (m, u, z, B) => {
                u = Array.from(m.parentNode.children).filter(C => C.tagName === m.tagName);
                B = parseInt(B);
                return u.indexOf(m) === B - 1
            },
            ":first-of-type": m => m === Array.from(m.parentNode.children).find(u => u.tagName === m.tagName),
            ":prev": m => m.previousElementSibling,
            ":next": m =>
                m.nextElementSibling,
            ":contains": (m, u, z, B) => m.textContent.includes(B),
            ":visible": m => {
                const u = window.getComputedStyle(m);
                return "none" !== u.display && "hidden" !== u.visibility && 0 < parseFloat(u.opacity) && 0 < m.offsetWidth && 0 < m.offsetHeight
            },
            ":hidden": m => {
                const u = window.getComputedStyle(m);
                return "none" === u.display || "hidden" === u.visibility || 0 === parseFloat(u.opacity) || 0 === m.offsetWidth || 0 === m.offsetHeight
            },
            ":has": (m, u, z, B) => null !== m.querySelector(B),
            ":target": m => m.id === location.hash.substring(1),
            ":lang": (m, u,
                z, B) => m.lang === B,
            ":hover": m => m.matches(":hover"),
            ":is": (m, u, z, B) => m.matches(B),
            ":td": m => "td" === m.tagName.toLowerCase(),
            ":tr": m => "tr" === m.tagName.toLowerCase(),
            ":focus": m => document.activeElement === m,
            ":root": m => m === document.documentElement
        },
        p = m => {
            function u(r) {
                try {
                    const q = document.createElement("template"),
                        w = r.replace(/\${(.+?)}/g, (y, A) => {
                            try {
                                return Function("return " + A)()
                            } catch (I) {
                                return ""
                            }
                        });
                    q.innerHTML = w.trim();
                    return Array.from(q.content.childNodes)
                } catch (q) {
                    return console.warn("Template parsing error:",
                        q), []
                }
            }

            function z(r) {
                var q = r.split(":");
                r = q[0];
                q = q.slice(1);
                r = Array.from(b.querySelectorAll(r));
                for (const w of q)
                    if (q = [], "last" === w) r = r.length ? [r[r.length - 1]] : [];
                    else if ("first" === w) r = r.length ? [r[0]] : [];
                else if (w.startsWith("lt(") || w.startsWith("gt(") || w.startsWith("eq(")) {
                    const [y, A] = w.split("(");
                    q = parseInt(A);
                    "lt" === y ? r = r.slice(0, q) : "gt" === y ? r = r.slice(q + 1) : "eq" === y && (r = r.slice(q, q + 1))
                } else if (n[":" + w]) {
                    for (const y of r) q.push(...d(y).filter((A, I, E) => n[":" + w](A, I, E)));
                    r = q
                } else if (w.startsWith("contains(")) {
                    q =
                        w.match(/contains\((.*?)\)/)[1];
                    const y = e(q);
                    r = r.filter(A => A.textContent.includes(y))
                } else try {
                    for (const y of r) q.push(...y.querySelectorAll(w));
                    r = q
                } catch (y) {
                    console.warn(`Invalid selector: ${w}`)
                }
                return r
            }

            function B(r) {
                r = r.split("[");
                var q = r[0];
                r = "[" + r.slice(1).join("[");
                const w = /\[([\w-]+)(?:([!~|^$*]?=)(['"'])?([^\]'"]*)\3?)?\]/g;
                let y = q ? Array.from(b.querySelectorAll(q)) : d(b);
                const A = [];
                for (; null !== (q = w.exec(r));) {
                    const [, I, E = "", , J = ""] = q;
                    A.push({
                        attr: I.trim(),
                        operator: E.trim(),
                        value: J.trim()
                    })
                }
                return y.filter(I =>
                    A.every(({
                        attr: E,
                        operator: J,
                        value: K
                    }) => {
                        if ("!=" === J) return !I.hasAttribute(E) || I.getAttribute(E) !== K;
                        if (!J) return I.hasAttribute(E);
                        if (!I.hasAttribute(E)) return !1;
                        E = I.getAttribute(E);
                        switch (J) {
                            case "=":
                                return E === K;
                            case "^=":
                                return E.startsWith(K);
                            case "$=":
                                return E.endsWith(K);
                            case "*=":
                                return E.includes(K);
                            case "~=":
                                return E.split(/\s+/).includes(K);
                            case "|=":
                                return E === K || E.startsWith(K + "-");
                            default:
                                return !1
                        }
                    }))
            }

            function C(r) {
                try {
                    return b.querySelectorAll(r)
                } catch (q) {
                    return k(r, b)
                }
            }

            function D(r) {
                const [q,
                    w
                ] = r.split(":");
                r = q ? Array.from(b.querySelectorAll(q)) : d(b);
                if (w.includes("(")) {
                    var y = w.match(/([^(]+)\((.*?)\)/);
                    if (y) {
                        const [, A, I] = y;
                        y = parseInt(I);
                        switch (A) {
                            case "eq":
                                return r.length > y ? [r[y]] : [];
                            case "gt":
                                return r.slice(y + 1);
                            case "lt":
                                return r.slice(0, y);
                            default:
                                if (n[":" + w]) return r.filter((E, J, K) => n[":" + w](E, J, K, I))
                        }
                    }
                }
                return n[":" + w] ? r.filter((A, I, E) => n[":" + w](A, I, E)) : []
            }

            function F(r) {
                try {
                    r = r.trim();
                    if ("*" === r) return d(b);
                    if (r.startsWith("#")) {
                        const w = b.querySelector(r);
                        if (!w) {
                            const y = `Element with ID "#${r.slice(1)}" not found`;
                            console.warn(y);
                            return []
                        }
                        requestAnimationFrame(() => {
                            const y = b.querySelector(r);
                            if (y && y instanceof HTMLElement && "fixed" === window.getComputedStyle(y).position) {
                                let A = y.parentElement;
                                for (; A && A !== document.body;) {
                                    const I = window.getComputedStyle(A);
                                    "none" !== I.transform && (A.dataset.originalTransform = I.transform, A.style.transform = "", (new IntersectionObserver(E => {
                                        E.forEach(J => {
                                            !J.isIntersecting && A.dataset.originalTransform && (A.style.transform = A.dataset.originalTransform, delete A.dataset.originalTransform)
                                        })
                                    })).observe(y));
                                    A = A.parentElement
                                }
                            }
                        });
                        return [w]
                    }
                    if (r.startsWith(".") && !/\${.*}|[^a-zA-Z0-9-_]/.test(r.slice(1))) {
                        const w = Array.from(b.querySelectorAll(r));
                        return 0 === w.length ? [] : w
                    }
                    const q = b.querySelectorAll(r);
                    return 0 === q.length ? [] : Array.from(q)
                } catch (q) {
                    return []
                }
            }
            if (!m || "string" !== typeof m) return console.warn("Invalid or empty selector provided"), [];
            m = m.trim();
            if (!m) return console.warn("Empty selector provided"), [];
            if (m.startsWith("text=")) {
                const r = m.slice(5);
                return d(b).filter(q => {
                    q = q.textContent.trim();
                    return r.startsWith("^") ?
                        q.startsWith(r.slice(1)) : r.endsWith("$") ? q.endsWith(r.slice(0, -1)) : q === r
                })
            }
            if (m.startsWith("depth=")) {
                const r = parseInt(m.slice(6));
                return d(b).filter(q => {
                    let w = 0;
                    for (; q.parentElement && !["html", "body"].includes(q.parentElement.tagName.toLowerCase());) w++, q = q.parentElement;
                    return w === r - 1
                })
            }
            var G = m.match(/([\w\.#]+)-sibling\[([-]?\d+|first|last)\]/);
            if (G) {
                const [, r, q] = G;
                var v = b.querySelector(r);
                if (!v) return [];
                if ("last" === q)
                    for (m = v; m.nextElementSibling && "SCRIPT" !== m.nextElementSibling.tagName;) m = m.nextElementSibling;
                else if ("first" === q)
                    for (m = v; m.previousElementSibling;) m = m.previousElementSibling;
                else {
                    m = parseInt(q);
                    for (G = 0; G < Math.abs(m); G++) {
                        var x = 0 < m ? v.nextElementSibling : v.previousElementSibling;
                        if (!x || "SCRIPT" === x.tagName) break;
                        v = x
                    }
                    m = v
                }
                return m ? [m] : []
            }
            if (m.startsWith("&&(")) {
                const r = m.slice(3, -1).split(",").map(q => q.trim());
                return d(b).filter(q => r.every(w => q.matches(w)))
            }
            if (m.startsWith("!!(")) {
                const r = m.slice(3, -1).split(",").map(q => q.trim());
                return d(b).filter(q => r.every(w => !q.matches(w)))
            }
            if (m.startsWith("range[") &&
                (G = m.match(/range\[([\w-]+)=(\d+)~(\d+)\]/))) {
                const [, r, q, w] = G;
                return d(b).filter(y => {
                    y = parseInt(y.getAttribute(r));
                    return y >= parseInt(q) && y <= parseInt(w)
                })
            }
            if (m.startsWith("child-range[") && (G = m.match(/child-range\[(\d+)~(\d+)\]/))) {
                const [, r, q] = G;
                return d(b).filter(w => {
                    w = Array.from(w.parentNode.children).indexOf(w) + 1;
                    return w >= parseInt(r) && w <= parseInt(q)
                })
            }
            if (m.startsWith("attr-contains[") && (G = m.match(/attr-contains\[([\w-]+)=([^\]]+)\]/))) {
                const [, r, q] = G;
                return d(b).filter(w => (w = w.getAttribute(r)) &&
                    w.includes(q))
            }
            if (m.startsWith("classes[") && (G = m.match(/classes\[([\w\s\.-|]+)\]/))) {
                const r = G[1].split("|");
                return d(b).filter(q => r.some(w => q.matches(w)))
            }
            if (m.startsWith("style[") && (G = m.match(/style\[([\w-]+)=([^\]]+)\]/))) {
                const [, r, q] = G;
                return d(b).filter(w => window.getComputedStyle(w)[r] === q)
            }
            if ("visible" === m) return d(b).filter(r => {
                r = window.getComputedStyle(r);
                return "none" !== r.display && "hidden" !== r.visibility && "0" !== r.opacity
            });
            if ("animated" === m) {
                m = DomQuery.prototype.fx;
                G = [];
                for (v in m) m[v] &&
                    Array.isArray(m[v]) && 0 < m[v].length && (x = document.querySelector(`[data-queue-id="${v}"]`)) && G.push(x);
                return this.elements = G
            }
            if (m.startsWith("form-state[")) {
                const r = m.match(/form-state\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("input, select, textarea")).filter(q => {
                    switch (r) {
                        case "valid":
                            return q.validity.valid;
                        case "invalid":
                            return !q.validity.valid;
                        case "required":
                            return q.required;
                        case "optional":
                            return !q.required;
                        default:
                            return !1
                    }
                })
            }
            if (m.startsWith("viewport[")) {
                const r = m.match(/viewport\[(\w+)\]/)[1];
                return d(b).filter(q => {
                    q = q.getBoundingClientRect();
                    const w = window.innerHeight;
                    switch (r) {
                        case "visible":
                            return 0 <= q.top && q.bottom <= w;
                        case "partially":
                            return q.top < w && 0 < q.bottom;
                        case "above":
                            return 0 > q.bottom;
                        case "below":
                            return q.top > w
                    }
                })
            }
            if (m.startsWith("text-length[") && (v = m.match(/text-length\[([<>])(\d+)\]/))) {
                const [, r, q] = v;
                return d(b).filter(w => {
                    w = w.textContent.trim().length;
                    return "<" === r ? w < parseInt(q) : w > parseInt(q)
                })
            }
            if (m.startsWith("nested[") && (v = m.match(/nested\[([\w\.#]+)>(\d+)\]/))) {
                const [,
                    r, q
                ] = v;
                return d(b).filter(w => {
                    let y = 0;
                    for (w = w.parentElement; w;) w.matches(r) && y++, w = w.parentElement;
                    return y > parseInt(q)
                })
            }
            if (m.startsWith("density[")) switch (v = m.match(/density\[(\w+)\]/)[1], G = d(b).map(r => ({
                    el: r,
                    density: r.getElementsByTagName("*").length
                })).sort((r, q) => q.density - r.density), x = Math.floor(G.length / 3), v) {
                case "high":
                    return G.slice(0, x).map(r => r.el);
                case "medium":
                    return G.slice(x, 2 * x).map(r => r.el);
                case "low":
                    return G.slice(2 * x).map(r => r.el)
            }
            if (m.startsWith("responsive[")) {
                const r = m.match(/responsive\[(\w+)\]/)[1];
                return d(b).filter(q => {
                    q = window.getComputedStyle(q);
                    switch (r) {
                        case "mobile":
                            return 768 >= parseInt(q.maxWidth);
                        case "tablet":
                            return 768 < parseInt(q.maxWidth) && 1024 >= parseInt(q.maxWidth);
                        case "desktop":
                            return 1024 < parseInt(q.maxWidth)
                    }
                })
            }
            if (m.startsWith("performance[")) {
                const r = m.match(/performance\[(\w+)\]/)[1];
                return d(b).filter(q => {
                    var w = q.getElementsByTagName("*").length,
                        y = getEventListeners(q)?.length || 0,
                        A = document.styleSheets.length;
                    q = q.getAnimations().length;
                    w = .4 * w + .3 * y + .2 * A + .1 * q;
                    switch (r) {
                        case "heavy":
                            return 100 <
                                w;
                        case "medium":
                            return 50 < w && 100 >= w;
                        case "light":
                            return 50 >= w
                    }
                })
            }
            if (m.startsWith("a11y[")) {
                const r = m.match(/a11y\[(\w+)\]/)[1];
                return d(b).filter(q => {
                    switch (r) {
                        case "warning":
                            return !q.hasAttribute("alt") && "IMG" === q.tagName || !q.hasAttribute("aria-label") && "button" === q.role;
                        case "error":
                            return q.hasAttribute("tabindex") && 0 > q.tabIndex || q.hasAttribute("aria-hidden") && "true" === q.getAttribute("aria-hidden") && q.textContent.trim();
                        case "valid":
                            return q.hasAttribute("aria-label") || q.hasAttribute("alt") || q.hasAttribute("role")
                    }
                })
            }
            if (m.startsWith("interaction[")) {
                const r =
                    m.match(/interaction\[(\w+)\]/)[1];
                return d(b).filter(q => {
                    switch (r) {
                        case "active":
                            return document.activeElement === q;
                        case "hover":
                            return q.matches(":hover");
                        case "focused":
                            return q.matches(":focus");
                        case "pressed":
                            return q.matches(":active")
                    }
                })
            }
            if (m.startsWith("content-type[")) {
                const r = m.match(/content-type\[(\w+)\]/)[1];
                return d(b).filter(q => {
                    switch (r) {
                        case "media":
                            return q.matches("img, video, audio, canvas, svg");
                        case "input":
                            return q.matches("input, textarea, select, button");
                        case "text":
                            return !q.matches("script, style") &&
                                0 === q.children.length && 0 < q.textContent.trim().length;
                        case "container":
                            return 0 < q.children.length
                    }
                })
            }
            if (m.startsWith("dynamic[")) {
                const r = m.match(/dynamic\[(\w+)\]/)[1];
                return d(b).filter(q => {
                    const w = Date.now();
                    switch (r) {
                        case "added":
                            return q.dataset.addedTimestamp && 5E3 > w - parseInt(q.dataset.addedTimestamp);
                        case "modified":
                            return q.dataset.lastModified && 5E3 > w - parseInt(q.dataset.lastModified);
                        case "removed-soon":
                            return q.matches(".fade-out, .removing, .disappearing")
                    }
                })
            }
            if (":header" === m) return b.querySelectorAll("h1, h2, h3, h4, h5, h6");
            if (":input" === m) return b.querySelectorAll("input, select, textarea, button");
            if (m.includes(",")) return m = m.split(",").map(r => r.trim()), [...(new Set(m.flatMap(r => Array.from(p(r)))))];
            switch (function(r) {
                    return r.trim().startsWith("<") && r.trim().endsWith(">") ? "HTML" : r.includes("#") && r.includes(":") ? "ID_PSEUDO" : r.includes("[") ? "ATTRIBUTE" : r.includes(" ") ? "COMPLEX" : r.includes(":") && !r.includes("::") ? "PSEUDO" : "BASIC"
                }(m)) {
                case "HTML":
                    return u(m);
                case "ID_PSEUDO":
                    return z(m);
                case "ATTRIBUTE":
                    return B(m);
                case "COMPLEX":
                    return C(m);
                case "PSEUDO":
                    return D(m);
                default:
                    return F(m)
            }
        };
    if ("function" === typeof a) return domquery(document).ready(a);
    if (!a || "function" !== typeof a.addEventListener || a instanceof Element || a instanceof DocumentFragment) {
        if (a instanceof DomQuery) return a;
        if ("string" === typeof a) {
            if (a.startsWith("#")) {
                var t = a.slice(1);
                /^\d/.test(t) && (a = "#\\3" + t.charAt(0) + " " + t.slice(1))
            }
            if (a.trim().startsWith("<"))
                if (t = (t = a.trim().match(/<(\w+)/)) ? t[1] : "div", !b || "object" !== typeof b || b instanceof Node ||
                    b instanceof Window) t = document.createElement("template"), t.innerHTML = a.trim(), this.elements = Array.from(t.content.childNodes);
                else {
                    const m = document.createElement(t);
                    b.id && (m.id = b.id);
                    if (b.class || b.className) m.className = b.class || b.className;
                    b.css && "object" === typeof b.css && Object.assign(m.style, b.css);
                    b.data && "object" === typeof b.data && Object.entries(b.data).forEach(([u, z]) => {
                        m.dataset[u] = z
                    });
                    b.attr && "object" === typeof b.attr && Object.entries(b.attr).forEach(([u, z]) => {
                        m.setAttribute(u, z)
                    });
                    b.on && "object" ===
                        typeof b.on && Object.entries(b.on).forEach(([u, z]) => {
                            m.addEventListener(u, z)
                        });
                    b.html && (m.innerHTML = b.html);
                    b.text && (m.textContent = b.text);
                    Object.entries(b).forEach(([u, z]) => {
                        "id class className css data attr on html text".split(" ").includes(u) || (u in m ? m[u] = z : m.setAttribute(u, z))
                    });
                    this.elements = [m]
                }
            else if ("*" === a) this.elements = d(b);
            else if (a.trim())
                if (a.startsWith(":header") || a.includes(":eq(") || a.includes(":contains(") || a.includes(":button") || a.includes(":checkbox") || a.includes(":radio") || a.includes(":file") ||
                    a.includes(":root")) this.elements = Array.from(p(a));
                else try {
                    if (a.includes(",")) {
                        const m = b.querySelectorAll(a);
                        this.elements = Array.from(m).sort((u, z) => u.compareDocumentPosition(z) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
                    } else this.elements = Array.from(b.querySelectorAll(a))
                } catch (m) {
                    try {
                        this.elements = Array.from(p(a))
                    } catch (u) {
                        console.warn("Invalid selector:", a), this.elements = []
                    }
                } else console.warn("Empty selector provided"), this.elements = []
        } else if (a instanceof Node) this.elements = [a];
        else if (a instanceof NodeList || Array.isArray(a)) this.elements = Array.from(a)
    } else this.elements = [a];
    this.length = this.elements.length;
    for (a = 0; a < this.length; a++) this[a] = this.elements[a];
    this.addCustomSelector = function(m, u) {
        "string" === typeof m && "function" === typeof u ? n[":" + m] = u : console.warn("Invalid custom selector. Name must be string and fn must be function.");
        return this
    };
    return this
}
DomQuery.prototype = {
    constructor: DomQuery,
    elementData: new WeakMap,
    fx: {},
    animationDump: {},
    animationChains: {},
    ready: function(a) {
        "loading" !== document.readyState ? a() : document.addEventListener("DOMContentLoaded", a);
        this._kcolorInitialized || (this._kcolorInitialized = !0, setTimeout(function() {
            document.querySelectorAll('[data-kcolor="true"]').forEach(function(b) {
                b._kcolorInitialized || null !== b.closest(".editor-wrapper") || null !== b.closest('[id*="editor"]') || null !== b.closest(".toolbar") || ($(b).Kcolor(), b._kcolorInitialized = !0)
            })
        }, 300));
        return this
    },
    param: function(a, b = {}) {
        function c(h, g, l) {
            const k = Object.prototype.toString.call(h);
            if ("[object Array]" === k) return d(h, g, l);
            if ("[object Object]" === k) {
                l = [];
                for (const n in h) Object.prototype.hasOwnProperty.call(h, n) && l.push(c(h[n], g ? f.allowDots ? `${g}.${n}` : `${g}[${n}]` : n, e));
                return l.join("&")
            }
            return "[object Date]" === k ? f.encoder(g) + "=" + f.encoder(h.toISOString()) : null === h ? f.encoder(g) + "=" : "boolean" === typeof h || "number" === typeof h ? f.encoder(g) + "=" + f.encoder(h.toString()) : f.encoder(g) +
                "=" + f.encoder(h)
        }

        function d(h, g, l) {
            const k = [];
            for (let n = 0; n < h.length; n++) {
                const p = l(g, n);
                k.push(c(h[n], p, l))
            }
            return k.join("&")
        }

        function e(h, g) {
            switch (f.arrayFormat) {
                case "indices":
                    return `${h}[${g}]`;
                case "brackets":
                    return `${h}[]`;
                case "repeat":
                    return h;
                case "comma":
                    return h;
                default:
                    return `${h}[${g}]`
            }
        }
        const f = {
            traditional: !1,
            encodeValuesOnly: !1,
            encoder: encodeURIComponent,
            serializer: (h, g) => `${h}=${g}`,
            allowDots: !1,
            arrayFormat: "brackets",
            ...b
        };
        return null === a || "undefined" === typeof a ? "" : Array.isArray(a) &&
            !f.traditional ? d(a, "", e) : c(a, "", e)
    },
    serialize: function(a = {}) {
        function b(e) {
            if (c.customSerialize && "function" === typeof c.customSerialize) {
                var f = c.customSerialize(e);
                if (f) {
                    d.push(f);
                    return
                }
            }
            if (c.includeDisabled || !e.disabled) switch (f = encodeURIComponent(e.name), e.type.toLowerCase()) {
                case "text":
                case "password":
                case "hidden":
                case "textarea":
                    (c.includeEmpty || "" !== e.value) && d.push(`${f}=${encodeURIComponent(e.value)}`);
                    break;
                case "radio":
                case "checkbox":
                    e.checked && d.push(`${f}=${encodeURIComponent(e.value)}`);
                    break;
                case "select-one":
                    0 <= e.selectedIndex && d.push(`${f}=${encodeURIComponent(e.options[e.selectedIndex].value)}`);
                    break;
                case "select-multiple":
                    for (let h = 0; h < e.options.length; h++) e.options[h].selected && d.push(`${f}=${encodeURIComponent(e.options[h].value)}`)
            }
        }
        const c = {
                includeDisabled: !1,
                includeEmpty: !0,
                customSerialize: null,
                ...a
            },
            d = [];
        this.elements.forEach(e => {
            if ("form" === e.tagName.toLowerCase()) {
                e = e.elements;
                for (let f = 0; f < e.length; f++) b(e[f])
            } else b(e)
        });
        return d.join("&")
    },
    serializeArray: function(a = {}) {
        function b(e) {
            if (c.customSerialize && "function" === typeof c.customSerialize) {
                var f = c.customSerialize(e);
                if (f) {
                    d.push(f);
                    return
                }
            }
            if (c.includeDisabled || !e.disabled) {
                var h = e.name;
                f = g => {
                    if (c.includeEmpty || "" !== g) {
                        var l = d,
                            k = l.push;
                        g = c.convertTypes ? isNaN(g) || "" === g ? "true" === g ? !0 : "false" === g ? !1 : "null" === g ? null : g : +g : g;
                        k.call(l, {
                            name: h,
                            value: g
                        })
                    }
                };
                switch (e.type.toLowerCase()) {
                    case "text":
                    case "password":
                    case "hidden":
                    case "textarea":
                    case "email":
                    case "url":
                    case "tel":
                    case "number":
                    case "range":
                    case "date":
                    case "month":
                    case "week":
                    case "time":
                    case "datetime":
                    case "datetime-local":
                    case "color":
                        f(e.value);
                        break;
                    case "radio":
                    case "checkbox":
                        e.checked && f(e.value);
                        break;
                    case "select-one":
                        0 <= e.selectedIndex && f(e.options[e.selectedIndex].value);
                        break;
                    case "select-multiple":
                        for (let g = 0; g < e.options.length; g++) e.options[g].selected && f(e.options[g].value);
                        break;
                    case "file":
                        if (0 < e.files.length)
                            for (f = 0; f < e.files.length; f++) d.push({
                                name: h,
                                value: e.files[f],
                                isFile: !0
                            })
                }
            }
        }
        const c = {
                includeDisabled: !1,
                includeEmpty: !0,
                customSerialize: null,
                convertTypes: !1,
                ...a
            },
            d = [];
        this.elements.forEach(e => {
            if ("form" === e.tagName.toLowerCase()) {
                e =
                    e.elements;
                for (let f = 0; f < e.length; f++) b(e[f])
            } else b(e)
        });
        return d
    },
    map: function(a) {
        if ("function" !== typeof a) return console.error("Invalid callback provided to map."), this;
        const b = [];
        this.elements.forEach(function(d, e) {
            d = a.call(d, e, d);
            void 0 !== d && b.push(d)
        });
        const c = Object.create(this);
        c.elements = b;
        c._prevObject = this;
        c.get = function(d) {
            return void 0 === d ? this.elements : this.elements[d]
        };
        return c
    },
    filter: function(a) {
        let b;
        if ("string" === typeof a) switch (a) {
                case ":even":
                    b = this.elements.filter((c, d) => 0 ===
                        d % 2);
                    break;
                case ":odd":
                    b = this.elements.filter((c, d) => 0 !== d % 2);
                    break;
                case ":visible":
                    b = this.elements.filter(c => !!(c.offsetWidth || c.offsetHeight || c.getClientRects().length));
                    break;
                case ":hidden":
                    b = this.elements.filter(c => !(c.offsetWidth || c.offsetHeight || c.getClientRects().length));
                    break;
                default:
                    try {
                        b = this.elements.filter(c => c.matches(a))
                    } catch (c) {
                        return console.error("Invalid selector provided to filter."), this
                    }
            } else if ("function" === typeof a) b = this.elements.filter(function(c, d) {
                return a.call(c, d, c)
            });
            else return console.error("Invalid callback provided to filter."), this;
        return this.endStack(b)
    },
    toArray: function() {
        let a = this.elements.map(c => c instanceof NodeList || c instanceof HTMLCollection ? Array.from(c) : c);
        const b = c => c.reduce((d, e) => d.concat(Array.isArray(e) ? b(e) : e), []);
        a = b(a);
        return a = a.filter(c => null != c)
    },
    gets: function(a, b) {
        return new Promise(function(c, d) {
            fetch(a, {
                method: "GET"
            }).then(e => {
                if (!e.ok) throw Error(`HTTP error! status: ${e.status}`);
                return e.json()
            }).then(e => {
                b(e);
                c(e)
            }).catch(e => {
                d(e)
            })
        })
    },
    get: function() {
        if (0 === arguments.length || "number" === typeof arguments[0]) {
            if (this.elements) return 0 === arguments.length ? this.elements : this.elements[arguments[0]]
        } else if ("string" === typeof arguments[0]) {
            var a = arguments[0];
            a.includes("?") && a.split("?")
        }
    },
    join: function(a, b = !1) {
        a = a || ",";
        return Array.isArray(this.elements) && 0 !== this.elements.length ? this.elements.map(function(c) {
            return ((b ? c.innerText : c.textContent) || "").trim()
        }).join(a) : ""
    },
    size: function() {
        return this.elements.length
    },
    isBlock: function(a) {
        const b = [];
        this.elements.forEach(function(d) {
            "block" === window.getComputedStyle(d).display && b.push(d)
        });
        const c = new DomQuery(b);
        0 < b.length && "function" === typeof a && a.call(c, c);
        return 0 < b.length
    },
    empty: function(a) {
        this.elements.forEach(function(b) {
            if ("function" === typeof a) {
                if (a(b))
                    for (; b.firstChild;) b.removeChild(b.firstChild)
            } else
                for (; b.firstChild;) b.removeChild(b.firstChild)
        });
        return this
    },
    isNone: function(a) {
        const b = [];
        this.elements.forEach(function(d) {
            "none" === window.getComputedStyle(d).display && b.push(d)
        });
        const c = new DomQuery(b);
        0 < b.length && "function" === typeof a && a.call(c, c);
        return 0 < b.length
    },
    block: function(a) {
        const b = [];
        this.elements.forEach(function(d) {
            "none" === window.getComputedStyle(d).display && (d.style.display = "block", b.push(d))
        });
        const c = new DomQuery(b);
        0 < b.length && "function" === typeof a && a.call(c, c);
        return this
    },
    none: function(a) {
        const b = [];
        this.elements.forEach(function(d) {
            "none" !== window.getComputedStyle(d).display && (d.style.display = "none", b.push(d))
        });
        const c = new DomQuery(b);
        0 < b.length && "function" ===
            typeof a && a.call(c, c);
        return this
    },
    hidden: function(a) {
        const b = [];
        this.elements.forEach(function(d) {
            const e = window.getComputedStyle(d);
            "none" !== e.display && "hidden" !== e.visibility && 0 !== parseFloat(e.opacity) && 0 !== d.offsetWidth && 0 !== d.offsetHeight || b.push(d)
        });
        const c = new DomQuery(b);
        "function" === typeof a && a.call(c, c);
        return c
    },
    visible: function(a) {
        const b = [];
        this.elements.forEach(function(d) {
            const e = window.getComputedStyle(d);
            "none" !== e.display && "hidden" !== e.visibility && 0 < parseFloat(e.opacity) && "contents" !==
                e.display && (0 !== d.offsetWidth || 0 !== d.offsetHeight) && b.push(d)
        });
        const c = new DomQuery(b);
        "function" === typeof a && a.call(c, c);
        return c
    },
    detach: function() {
        this._Queue = this._Queue.then(() => new Promise(a => {
            this.elements = this.elements.map(function(b) {
                var c = b.cloneNode(!0);
                b.parentNode && b.parentNode.removeChild(b);
                return c
            });
            a(this)
        }));
        return this
    },
    html: function(a, b) {
        const c = e => {
            if (e instanceof HTMLElement) {
                const f = e.cloneNode(!0);
                e._eventHandlers && Object.keys(e._eventHandlers).forEach(h => {
                    e._eventHandlers[h].forEach(g => {
                        f.addEventListener(h, g.handler)
                    })
                });
                return f
            }
            return e.cloneNode(!0)
        };
        if ("undefined" !== typeof a) return this.elements.forEach(function(e) {
            a instanceof DomQuery ? (e.innerHTML = "", a.elements.forEach(f => {
                    e.appendChild(c(f))
                })) : a instanceof HTMLElement ? (e.innerHTML = "", e.appendChild(c(a))) : Array.isArray(a) ? (e.innerHTML = "", a.forEach(f => {
                    f instanceof HTMLElement ? e.appendChild(c(f)) : f instanceof DomQuery ? f.elements.forEach(h => {
                        e.appendChild(c(h))
                    }) : e.appendChild(document.createTextNode(String(f)))
                })) : e.innerHTML =
                String(a) || ""
        }), "function" === typeof b && b.call(this), this;
        if (0 === this.elements.length) return "";
        const d = Array.from(this.elements).map(function(e) {
            return e.innerHTML
        }).join("");
        "function" === typeof b && b.call(this, d);
        return d
    },
    text: function(a, b) {
        if (void 0 !== a) return this.elements.forEach(function(d) {
            d.textContent = a.toString()
        }), "function" === typeof b && b.call(this), this;
        if (0 === this.elements.length) return "";
        const c = this.elements[0].textContent.trim();
        "function" === typeof b && b.call(this, c);
        return c
    },
    after: function(a,
        b) {
        this._Queue = this._Queue.then(() => new Promise(c => {
            const d = (e, f) => {
                if (f instanceof DomQuery) f.elements.forEach(h => {
                    const g = h.cloneNode(!0);
                    h._eventHandlers && Object.keys(h._eventHandlers).forEach(l => {
                        h._eventHandlers[l].forEach(k => {
                            g.addEventListener(l, k.handler)
                        })
                    });
                    e.parentNode.insertBefore(g, e.nextSibling)
                });
                else if (f instanceof HTMLElement) {
                    const h = f.cloneNode(!0);
                    f._eventHandlers && Object.keys(f._eventHandlers).forEach(g => {
                        f._eventHandlers[g].forEach(l => {
                            h.addEventListener(g, l.handler)
                        })
                    });
                    e.parentNode.insertBefore(h,
                        e.nextSibling)
                } else "string" === typeof f ? e.insertAdjacentHTML("afterend", f) : f instanceof Text || f instanceof DocumentFragment ? e.parentNode.insertBefore(f.cloneNode(!0), e.nextSibling) : Array.isArray(f) && f.forEach(h => d(e, h))
            };
            this.elements.forEach(e => {
                e instanceof Element && e.parentNode && d(e, a)
            });
            "function" === typeof b && b.call(this);
            c(this)
        }));
        return this
    },
    before: function(a, b) {
        this._Queue = this._Queue.then(() => new Promise(c => {
            const d = (e, f) => {
                if (e && e instanceof Element && e.parentNode) {
                    var h = g => {
                        if (g instanceof DomQuery) g.elements.forEach(l => h(l));
                        else if (g instanceof Element) e.parentNode.insertBefore(g.cloneNode(!0), e);
                        else if ("string" === typeof g) {
                            const l = document.createElement("div");
                            l.innerHTML = g;
                            Array.from(l.childNodes).forEach(k => {
                                e.parentNode.insertBefore(k, e)
                            })
                        } else g instanceof DocumentFragment && e.parentNode.insertBefore(g.cloneNode(!0), e)
                    };
                    Array.isArray(f) ? f.forEach(g => h(g)) : h(f)
                } else console.warn("Invalid element or missing parent node")
            };
            this.elements.forEach(e => {
                d(e, a)
            });
            "function" === typeof b &&
                b.call(this);
            c(this)
        }));
        return this
    },
    prepend: function(a, b) {
        this._Queue = this._Queue.then(() => new Promise(c => {
            const d = (e, f) => {
                if (f instanceof DomQuery) f.elements.forEach(h => {
                    const g = h.cloneNode(!0);
                    h._eventHandlers && Object.keys(h._eventHandlers).forEach(l => {
                        h._eventHandlers[l].forEach(k => {
                            g.addEventListener(l, k.handler)
                        })
                    });
                    e.insertBefore(g, e.firstChild)
                });
                else if (f instanceof HTMLElement) {
                    const h = f.cloneNode(!0);
                    f._eventHandlers && Object.keys(f._eventHandlers).forEach(g => {
                        f._eventHandlers[g].forEach(l => {
                            h.addEventListener(g, l.handler)
                        })
                    });
                    e.insertBefore(h, e.firstChild)
                } else "string" === typeof f ? e.insertAdjacentHTML("afterbegin", f) : f instanceof Text || f instanceof DocumentFragment ? e.insertBefore(f.cloneNode(!0), e.firstChild) : Array.isArray(f) && f.reverse().forEach(h => d(e, h))
            };
            this.elements.forEach(e => {
                e instanceof Element && d(e, a)
            });
            "function" === typeof b && b.call(this);
            c(this)
        }));
        return this
    },
    append: function(a, b = {}, c) {
        this._Queue = this._Queue.then(() => new Promise(d => {
            if (a || "" === a || 1 !== arguments.length) {
                var e =
                    1 < arguments.length && "object" !== typeof b ? Array.from(arguments) : [a];
                if (e.every(g => "" === g || "string" === typeof g || g instanceof Node || g instanceof DocumentFragment || Array.isArray(g) || g instanceof DomQuery || "function" === typeof g)) {
                    var f = {
                        position: "beforeend",
                        triggerEvent: !0
                    };
                    b = 1 < arguments.length && "object" === typeof b ? {
                        ...f,
                        ...b
                    } : f;
                    ["beforeend", "afterbegin"].includes(b.position) || (console.warn("Invalid position option. Using 'beforeend'."), b.position = "beforeend");
                    var h = (g, l) => {
                        if (g && g instanceof Element) try {
                            if ("function" ===
                                typeof l) {
                                const k = l.call(g, g.index, g.innerHTML);
                                h(g, k)
                            } else if (l instanceof DomQuery) l.elements.forEach(k => {
                                if (k)
                                    if (k instanceof Node) {
                                        const n = k.cloneNode(!0);
                                        k._eventHandlers && Object.keys(k._eventHandlers).forEach(p => {
                                            k._eventHandlers[p].forEach(t => {
                                                n.addEventListener(p, t.handler)
                                            })
                                        });
                                        n instanceof Element ? g.insertAdjacentElement(b.position, n) : n instanceof Text ? g.insertAdjacentText(b.position, n.textContent) : g.insertAdjacentHTML(b.position, n.outerHTML || n.textContent)
                                    } else Array.isArray(k) ? k.forEach(n => {
                                        n && n instanceof Node && h(g, n)
                                    }) : "string" === typeof k ? g.insertAdjacentHTML(b.position, k) : console.warn("Unsupported element type in domquery instance:", k)
                            });
                            else if (l instanceof Node) {
                                const k = l.cloneNode(!0);
                                l._eventHandlers && Object.keys(l._eventHandlers).forEach(n => {
                                    l._eventHandlers[n].forEach(p => {
                                        k.addEventListener(n, p.handler)
                                    })
                                });
                                k instanceof Element ? g.insertAdjacentElement(b.position, k) : k instanceof Text ? g.insertAdjacentText(b.position, k.textContent) : g.insertAdjacentHTML(b.position, k.outerHTML ||
                                    k.textContent)
                            } else "string" === typeof l ? g.insertAdjacentHTML(b.position, l) : Array.isArray(l) ? l.forEach(k => h(g, k)) : console.warn("Unsupported content type:", l)
                        } catch (k) {
                            console.error("Error in appendContent:", k)
                        } else console.warn("Invalid target element:", g)
                    };
                    this.elements.forEach((g, l) => {
                        g instanceof Element ? (g.index = l, e.forEach(k => h(g, k))) : console.warn("Invalid element in the elements array:", g)
                    });
                    "function" === typeof c && c.call(this);
                    if (b.triggerEvent) {
                        const g = new Event("contentAppended");
                        this.elements.forEach(l => {
                            l instanceof Element && l.dispatchEvent(g)
                        })
                    }
                } else console.warn("Invalid content type provided to append()")
            } else console.warn("append() called with null/undefined content");
            d(this)
        }));
        return this
    },
    prependTo: function(a) {
        return this._insertTo(a, "prepend")
    },
    appendTo: function(a) {
        return this._insertTo(a, "append")
    },
    _insertTo: function(a, b) {
        const c = this._insertTo_getTargetElements(a);
        if (0 === c.length) return console.warn(`No valid target elements found for ${b}`), this;
        const d = c.length - 1;
        this.elements.forEach(e => {
            c.forEach((f, h) => {
                if (f && "function" === typeof f[b]) f[b](h === d ? e : e.cloneNode(!0));
                else console.warn(`Method ${b} not supported for target element`, f)
            })
        });
        return this
    },
    _insertTo_getTargetElements: function(a) {
        return a instanceof DomQuery ? a.elements : "string" === typeof a ? Array.from(document.querySelectorAll(a)) : a instanceof Element ? [a] : a instanceof NodeList || a instanceof HTMLCollection ? Array.from(a) : Array.isArray(a) ? a.filter(b => b instanceof Element) : []
    },
    clone: function(a = {}) {
        const b = {
            events: !1,
            deep: !1,
            data: !1,
            selector: null,
            maxClones: Infinity,
            callback: null,
            index: null,
            oddEven: null,
            tags: null,
            ...a
        };
        if (0 === this.elements.length) return new DomQuery([]);
        a = [];
        const c = (d, e = !1, f = 0) => {
            const h = d.cloneNode(!0);
            b.events && this._cloneEvents(d, h, f);
            b.data && this.elementData.has(d) && this.elementData.set(h, {
                ...this.elementData.get(d)
            });
            e && b.selector && Array.from(h.querySelectorAll(b.selector)).forEach((g, l) => {
                (l = c(g, !0, f + 1)) && g.parentNode.replaceChild(l, g)
            });
            if (h instanceof HTMLInputElement || h instanceof HTMLTextAreaElement ||
                h instanceof HTMLSelectElement) h.value = d.value;
            h.setAttribute("data-cloned", "true");
            h.setAttribute("data-clone-level", f.toString());
            return h
        };
        b.deep ? (a = this.elements.map(d => d.id ? `#${d.id}` : "").filter(Boolean).join(", "), a = (a ? Array.from(document.querySelectorAll(a)) : this.elements).map(d => c(d, !0)).filter(d => null !== d)) : a = this.elements.map((d, e) => "true" === d.getAttribute("data-cloned") || null !== b.index && e !== b.index || "odd" === b.oddEven && 0 === e % 2 || "even" === b.oddEven && 0 !== e % 2 ? null : c(d)).filter(d => null !== d);
        if (document.querySelectorAll('[data-cloned="true"]').length + a.length > b.maxClones) return console.warn("Maximum clone limit reached"), new DomQuery([]);
        a = new DomQuery(a);
        "function" === typeof b.callback && b.callback.call(a);
        return a
    },
    _cloneEvents: function(a, b, c = 0) {
        const d = (e, f, h) => {
            if (e._eventHandlers) {
                f._eventHandlers || (f._eventHandlers = {});
                for (let g in e._eventHandlers) f._eventHandlers[g] || (f._eventHandlers[g] = []), e._eventHandlers[g].forEach(l => {
                    if (l.selector) {
                        var k = function(n) {
                            for (var p = n.target; p &&
                                p !== f;) {
                                if (p.matches(l.selector)) {
                                    l.handler.call(p, n);
                                    break
                                }
                                p = p.parentElement
                            }
                        };
                        f._eventHandlers[g].push({
                            selector: l.selector,
                            handler: l.handler,
                            delegatedHandler: k
                        });
                        f.addEventListener(g, k)
                    } else f._eventHandlers[g].push({
                        handler: l.handler
                    }), f.addEventListener(g, l.handler)
                })
            }
            if (e.hasAttribute("data-cloned")) {
                const g = this._clone_getOriginalEventHandlers(e);
                for (let l in g) f._eventHandlers || (f._eventHandlers = {}), f._eventHandlers[l] || (f._eventHandlers[l] = []), g[l].forEach(k => {
                    f._eventHandlers[l].push(k);
                    f.addEventListener(l, k.handler)
                })
            }
            Array.from(e.children).forEach((g, l) => {
                f.children[l] && d(g, f.children[l], h + 1)
            })
        };
        d(a, b, c)
    },
    _clone_getOriginalEventHandlers: function(a) {
        a = a.id.replace(/-clone-\d+$/, "");
        return (a = document.getElementById(a)) && a._eventHandlers ? a._eventHandlers : {}
    },
    first: function() {
        return 0 === this.elements.length ? this : new DomQuery(this.elements[0])
    },
    last: function(a = 0) {
        if (0 === this.elements.length) return this;
        a = Math.floor(a);
        if (0 > a || a >= this.elements.length) a = 0;
        a = this.elements.length - 1 - a;
        this.elements = [this.elements[0 <= a ? a : 0]];
        this.length = 1;
        return this
    },
    _insert: function(a, b) {
        if (!a) return this;
        const c = "string" === typeof a ? document.querySelectorAll(a) : a instanceof DomQuery ? a.elements : [a];
        if (!c.length) return this;
        0 === this.elements.length && "string" === typeof this.selector && this.selector.trim().startsWith("<") && (a = document.createElement("template"), a.innerHTML = this.selector.trim(), this.elements = Array.from(a.content.childNodes));
        const d = [];
        this.elements.forEach(e => {
            c.forEach(f => {
                if (f?.parentNode) {
                    var h =
                        e.cloneNode(!0);
                    d.push(h);
                    "before" === b ? f.parentNode.insertBefore(h, f) : f.parentNode.insertBefore(h, f.nextSibling)
                }
            })
        });
        this.elements = d;
        return this
    },
    insertBefore: function(a) {
        return this._insert.call(this, a, "before")
    },
    insertAfter: function(a) {
        return this._insert.call(this, a, "after")
    },
    replaceAll: function(a) {
        a = "string" === typeof a ? document.querySelectorAll(a) : a instanceof DomQuery ? a.elements : a instanceof NodeList || Array.isArray(a) ? a : [a];
        const b = this.elements.map(c => c.cloneNode(!0));
        a.forEach(c => {
            const d =
                b.shift() || b[b.length - 1].cloneNode(!0);
            c.parentNode.replaceChild(d, c)
        });
        return this
    },
    wrapInner: function(a) {
        const b = c => {
            if ("string" === typeof c) {
                const d = document.createElement("div");
                d.innerHTML = c.trim();
                return d.firstChild
            }
            if (c instanceof Node) return c.cloneNode(!0);
            if (c instanceof DomQuery) return c.elements[0].cloneNode(!0)
        };
        this.elements.forEach(c => {
            const d = b(a);
            Array.from(c.childNodes).forEach(e => d.appendChild(e));
            c.appendChild(d)
        });
        return this
    },
    wrapAll: function(a) {
        if (0 === this.elements.length) return this;
        const b = "string" === typeof a ? (() => {
                const e = document.createElement("div");
                e.innerHTML = a.trim();
                return e.firstChild
            })() : a instanceof Node ? a.cloneNode(!0) : a instanceof DomQuery ? a.elements[0].cloneNode(!0) : document.createElement("div"),
            c = this.elements[0];
        c.parentNode.insertBefore(b, c);
        let d = b;
        for (; d.firstChild && 1 === d.firstChild.nodeType;) d = d.firstChild;
        this.elements.forEach(e => d.appendChild(e));
        return this
    },
    contents: function() {
        const a = [];
        this.elements.forEach(b => {
            a.push(...b.childNodes)
        });
        return this.endStack(a)
    },
    unwrap: function(a) {
        this.elements.forEach(b => {
            const c = b.parentNode;
            if (c && c !== document.body && (!a || !("string" === typeof a && !c.matches(a) || a instanceof Node && c !== a || a instanceof DomQuery && !a.elements.includes(c)))) {
                var d = c.parentNode;
                d.insertBefore(b, c);
                c.firstChild || d.removeChild(c)
            }
        });
        return this
    },
    wrap: function(a) {
        this.elements.forEach((b, c) => {
            if (!b.parentNode.classList.contains("domquery-wrapper")) {
                if ("function" === typeof a) c = a.call(b, c);
                else if ("string" === typeof a) c = document.createElement("div"), c.innerHTML =
                    a.trim(), c = c.firstChild;
                else if (a instanceof Node) c = a.cloneNode(!0);
                else if (a instanceof DomQuery) c = a.elements[0].cloneNode(!0);
                else return console.error("Invalid wrapper type"), this;
                c.classList.add("domquery-wrapper");
                for (var d = b.parentNode, e = b.nextSibling, f = c; f.firstElementChild;) f = f.firstElementChild;
                f.appendChild(b);
                e ? d.insertBefore(c, e) : d.appendChild(c)
            }
        });
        return this
    },
    one: function(a, b, c) {
        "function" === typeof b && (c = b, b = void 0);
        this.elements.forEach(d => {
            if (d instanceof Element) {
                var e = function(f) {
                    if (b) {
                        const h =
                            f.target.closest(b);
                        h && d.contains(h) && (c.call(h, f), d.removeEventListener(a, e))
                    } else c.call(d, f), d.removeEventListener(a, e)
                };
                d.addEventListener(a, e)
            }
        });
        return this
    },
    hasClass: function(a, b) {
        let c = !1;
        if (0 < this.elements.length) {
            var d = this.elements[0].classList;
            a && "classListing" !== a ? c = d.contains(a) : "classListing" !== a && a || (c = Array.from(d).join(" "))
        }
        return "function" === typeof b ? (this._Queue = this._Queue.then(() => {
            b.call(this, c);
            return this
        }), this) : c
    },
    addClass(a, b = {}) {
        if (!this.elements || 0 === this.elements.length) return this;
        const c = n => "P" === n.tagName && n.parentElement && (n.parentElement.classList.contains("left") || n.parentElement.classList.contains("right")) && null === n.previousElementSibling,
            {
                skip: d = c,
                callback: e,
                override: f = !1,
                deep: h = !1
            } = b,
            g = n => Array.isArray(n) ? n.flatMap(p => "string" === typeof p ? p.split(/\s+/) : Array.isArray(p) ? g(p) : []).filter(Boolean) : "string" === typeof n ? n.split(/\s+/).filter(Boolean) : [],
            l = (n, p) => {
                f ? n.className = p.join(" ") : n.classList.add(...p)
            },
            k = (n, p) => {
                d(n, p) || ("function" === typeof a ? (p = a.call(n, p, n.className),
                    p = g(p)) : p = g(a), 0 < p.length && l(n, p), h && 0 < n.children.length && Array.from(n.children).forEach((t, m) => {
                    k(t, m)
                }))
            };
        this.elements.forEach(k);
        "function" === typeof e && (this._Queue = this._Queue.then(() => {
            e.call(this);
            return this
        }));
        return this
    },
    removeProp: function(a, b = {}) {
        b = {
            deep: !1,
            strict: !1,
            callback: null,
            triggerEvent: !0,
            ...b
        };
        const c = (d, e) => {
            if (b.deep && "object" === typeof d[e] && null !== d[e])
                for (let f in d[e]) c(d[e], f);
            if (b.strict && !(e in d)) throw Error(`Property "${e}" does not exist on element`);
            try {
                delete d[e]
            } catch (f) {
                d[e] =
                    void 0
            }
            b.callback && "function" === typeof b.callback && b.callback.call(d, e)
        };
        this.elements.forEach(d => {
            Array.isArray(a) ? a.forEach(e => c(d, e)) : c(d, a);
            if (b.triggerEvent) {
                const e = new CustomEvent("propRemoved", {
                    detail: {
                        prop: a
                    }
                });
                d.dispatchEvent(e)
            }
        });
        return this
    },
    removeClass: function(a, b) {
        if (this.elements && 0 < this.elements.length) {
            let c = [];
            void 0 !== a && (c = Array.isArray(a) ? a : a.split(" "));
            this.elements.forEach(d => {
                d && d.classList && (0 < c.length ? d.classList.remove(...c) : d.className = "")
            })
        }
        "function" === typeof b && (this._Queue =
            this._Queue.then(() => {
                b.call(this);
                return this
            }));
        return this
    },
    toggleClass: function(a, b) {
        this.initialStates || (this.initialStates = this.elements.map(c => c.className));
        this.elements.forEach((c, d) => {
            if (this.resetTriggered) c.className = this.initialStates[d];
            else if (void 0 === a || "" === a) {
                const e = c.className.split(" ").filter(Boolean);
                d = this.initialStates[d].split(" ").filter(Boolean);
                [...(new Set([...e, ...d]))].forEach(f => {
                    c.classList.contains(f) ? c.classList.remove(f) : c.classList.add(f)
                })
            } else "string" === typeof a &&
                a.split(/\s+/).filter(Boolean).forEach(e => {
                    c.classList.contains(e) ? c.classList.remove(e) : c.classList.add(e)
                })
        });
        this.resetTriggered = !1;
        "function" === typeof b && b.call(this);
        return this
    },
    prop: function(a, b, c) {
        if ("object" !== typeof a || Array.isArray(a)) {
            if (Array.isArray(a) && "function" === typeof b) {
                if (0 === this.elements.length) return this;
                c = a.map(d => this.elements[0][d]);
                b.call(this, c);
                return this
            }
            if (Array.isArray(a)) return 0 === this.elements.length ? void 0 : a.map(d => this.elements[0][d]);
            if ("function" === typeof b) {
                if (0 ===
                    this.elements.length) return this;
                b.call(this, this.elements[0][a]);
                return this
            }
            if (void 0 === b) return 0 === this.elements.length ? void 0 : this.elements[0][a];
            this.elements.forEach(d => {
                d instanceof Element && (null === b || "" === b ? "id" === a ? d.removeAttribute("id") : "className" === a ? d.removeAttribute("class") : delete d[a] : d[a] = b)
            });
            "function" === typeof c && c.call(this);
            return this
        }
        this.elements.forEach(d => {
            if (d instanceof Element)
                for (const e in a) a.hasOwnProperty(e) && (null === a[e] || "" === a[e] ? "id" === e ? d.removeAttribute("id") :
                    "className" === e ? d.removeAttribute("class") : delete d[e] : d[e] = a[e])
        });
        "function" === typeof b ? b.call(this) : "function" === typeof c && c.call(this);
        return this
    },
    fire: function(...a) {
        this.elements.forEach(b => {
            "function" === typeof b.fire && b.fire(...a)
        });
        return this
    },
    val: function(a, b) {
        if (void 0 === a) {
            if (0 !== this.elements.length) {
                var c = this.elements[0];
                return "SELECT" === c.tagName && c.multiple ? Array.from(c.selectedOptions).map(d => d.value) : "SELECT" === c.tagName ? c.options[c.selectedIndex].value : "checkbox" === c.type || "radio" ===
                    c.type ? c.checked ? c.value : null : c.value
            }
        } else return this._Queue = "function" === typeof a ? this._Queue.then(() => new Promise(d => {
            this.elements.forEach((e, f) => {
                let h;
                h = "SELECT" === e.tagName && e.multiple ? Array.from(e.selectedOptions).map(l => l.value) : "SELECT" === e.tagName ? e.options[e.selectedIndex].value : "checkbox" === e.type || "radio" === e.type ? e.checked ? e.value : null : e.value;
                const g = a.call(e, f, h);
                void 0 !== g && ("SELECT" === e.tagName && e.multiple ? Array.from(e.options).forEach(l => {
                    l.selected = Array.isArray(g) ? g.includes(l.value) :
                        g === l.value
                }) : "SELECT" === e.tagName ? Array.from(e.options).forEach(l => {
                    l.selected = l.value === g
                }) : "checkbox" === e.type || "radio" === e.type ? Array.isArray(g) ? e.checked = g.includes(e.value) : e.checked = e.value === g : e.value = g)
            });
            d(this)
        })) : this._Queue.then(() => new Promise(d => {
            this.elements.forEach(e => {
                "SELECT" === e.tagName && e.multiple ? Array.from(e.options).forEach(f => {
                        f.selected = Array.isArray(a) ? a.includes(f.value) : a === f.value
                    }) : "SELECT" === e.tagName ? Array.from(e.options).forEach(f => {
                        f.selected = f.value === a
                    }) : "checkbox" ===
                    e.type || "radio" === e.type ? Array.isArray(a) ? e.checked = a.includes(e.value) : e.checked = e.value === a : e.value = a
            });
            d(this)
        })).then(() => {
            if ("function" === typeof b) {
                const d = Array.from(this.elements).map(e => "SELECT" === e.tagName && e.multiple ? Array.from(e.selectedOptions).map(f => f.value) : "SELECT" === e.tagName ? e.options[e.selectedIndex].value : "checkbox" === e.type || "radio" === e.type ? e.checked ? e.value : null : e.value);
                b.call(this, 1 === d.length ? d[0] : d)
            }
            return this
        }), this
    },
    data: function(a, b, c) {
        if (this.elements && 0 !== this.elements.length) {
            if ("string" !==
                typeof a) return console.warn("\ud0a4\ub294 \ubb38\uc790\uc5f4\uc774\uc5b4\uc57c \ud569\ub2c8\ub2e4."), this;
            var d = f => {
                    if (void 0 === f) return f;
                    try {
                        return JSON.parse(f)
                    } catch {
                        return f
                    }
                },
                e = (f => f.replace(/[-_]([a-z])/g, h => h[1].toUpperCase()))(a);
            "function" === typeof b && (c = b, b = void 0);
            if (void 0 === b) return a = d(this.elements[0].dataset[e]), "function" === typeof c && c.call(this, a), a;
            this.elements.forEach(f => {
                f = f.dataset;
                var h = b;
                h = "object" === typeof h && null !== h ? JSON.stringify(h) : String(h);
                f[e] = h
            });
            "function" === typeof c &&
                c.call(this);
            return this
        }
    },
    removeData: function(a) {
        if (!this.elements || 0 === this.elements.length) return console.error("\uc694\uc18c\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."), this;
        void 0 === a ? this.elements.forEach(b => {
            for (let c in b.dataset) delete b.dataset[c]
        }) : "string" === typeof a ? this.elements.forEach(b => {
            delete b.dataset[a]
        }) : Array.isArray(a) ? this.elements.forEach(b => {
            a.forEach(c => delete b.dataset[c])
        }) : console.error("\uc798\ubabb\ub41c \ud0a4 \ud0c0\uc785\uc785\ub2c8\ub2e4. \ubb38\uc790\uc5f4 \ub610\ub294 \ubc30\uc5f4\uc744 \uc0ac\uc6a9\ud558\uc138\uc694.");
        return this
    },
    attr: function(a, b, c) {
        if (0 === this.elements.length) return this;
        const d = ["checked", "selected", "disabled"],
            e = g => {
                const l = this.elements[0];
                if (l instanceof HTMLElement) {
                    if (d.includes(g)) return l[g] ? g : "";
                    g = l.getAttribute(g);
                    return null !== g ? g : void 0
                }
            },
            f = (g, l) => {
                this.elements.forEach(k => {
                    k instanceof HTMLElement && ("" === l ? k.removeAttribute(g) : "class" === g && "string" === typeof l ? k.className = l : d.includes(g) ? k[g] = !!l : k.setAttribute(g, l))
                })
            };
        if ("object" !== typeof a || Array.isArray(a))
            if (Array.isArray(a) &&
                "function" === typeof b) {
                if (0 === this.elements.length) return this;
                var h = a.map(g => e(g));
                b.call(this, h)
            } else {
                if (Array.isArray(a)) return 0 === this.elements.length ? void 0 : a.map(g => e(g));
                if ("function" === typeof b) {
                    if (0 === this.elements.length) return this;
                    this.elements.forEach((g, l) => {
                        const k = e.call({
                            elements: [g]
                        }, a);
                        l = b.call(g, l, k);
                        void 0 !== l && f.call({
                            elements: [g]
                        }, a, l)
                    })
                } else if (void 0 !== b) f(a, b), "function" === typeof c && (this._Queue = this._Queue.then(() => new Promise(g => {
                    c.call(this);
                    g(this)
                })));
                else return e(a)
            }
        else {
            for (h in a) a.hasOwnProperty(h) &&
                f(h, a[h]);
            "function" === typeof b && (this._Queue = this._Queue.then(() => new Promise(g => {
                b.call(this);
                g(this)
            })))
        }
        return this
    },
    each(a) {
        if (null == this.elements) return this;
        try {
            if (Symbol.iterator in Object(this.elements) || Array.isArray(this.elements) || 0 <= this.elements.length)
                for (const [b, c] of Array.from(this.elements).entries()) {
                    if (!1 === a.call(c, b, c)) break
                } else if ("object" === typeof this.elements)
                    for (const [b, c] of Object.entries(this.elements))
                        if (!1 === a.call(c, b, c)) break
        } catch (b) {
            console.warn("Each iteration error:",
                b)
        }
        return this
    },
    promise: function() {
        return {
            done: a => {
                this._Queue = this._Queue.then(a);
                return this
            }
        }
    },
    done: function(a) {
        this._Queue = this._Queue.then(a);
        return this
    },
    is: function(a) {
        if (0 === this.length) return !1;
        const b = {
                ":visible": d => {
                    window.getComputedStyle(d);
                    return 0 < d.offsetWidth || 0 < d.offsetHeight || 0 < d.getClientRects().length
                },
                ":hidden": d => !b[":visible"](d),
                ":none": d => "none" === window.getComputedStyle(d).display,
                ":block": d => "block" === window.getComputedStyle(d).display,
                ":inline": d => "inline" === window.getComputedStyle(d).display,
                ":inline-block": d => "inline-block" === window.getComputedStyle(d).display,
                ":flex": d => "flex" === window.getComputedStyle(d).display,
                ":grid": d => "grid" === window.getComputedStyle(d).display,
                ":first": d => d === d.parentNode.firstElementChild,
                ":last": d => d === d.parentNode.lastElementChild,
                ":even": d => 0 === Array.from(d.parentNode.children).indexOf(d) % 2,
                ":odd": d => 0 !== Array.from(d.parentNode.children).indexOf(d) % 2,
                ":checked": d => d.checked,
                ":disabled": d => d.disabled,
                ":enabled": d => !d.disabled && "hidden" !== d.type,
                ":focus": d =>
                    d === document.activeElement,
                ":empty": d => !d.hasChildNodes(),
                ":root": d => d === document.documentElement,
                ":input": d => /^(input|select|textarea|button)$/i.test(d.nodeName),
                ":button": d => "button" === d.type || "button" === d.tagName.toLowerCase(),
                ":checkbox": d => "checkbox" === d.type,
                ":file": d => "file" === d.type,
                ":image": d => "image" === d.type,
                ":password": d => "password" === d.type,
                ":radio": d => "radio" === d.type,
                ":reset": d => "reset" === d.type,
                ":submit": d => "submit" === d.type,
                ":text": d => "text" === d.type,
                ":selected": d => d.selected,
                ":parent": d =>
                    d.hasChildNodes(),
                ":header": d => /^h[1-6]$/i.test(d.nodeName),
                ":animated": d => 0 < d.getAnimations().length,
                ":target": d => d.id && d.id === location.hash.slice(1),
                ":focus-visible": d => d.matches(":focus-visible"),
                ":focus-within": d => d.matches(":focus-within"),
                ":hover": d => d.matches(":hover"),
                ":link": d => "a" === d.tagName.toLowerCase() && d.href,
                ":visited": d => "a" === d.tagName.toLowerCase() && d.href && d.visited,
                ":first-child": d => d === d.parentNode.firstElementChild,
                ":last-child": d => d === d.parentNode.lastElementChild,
                ":only-child": d =>
                    1 === d.parentNode.children.length,
                ":first-of-type": d => Array.from(d.parentNode.children).filter(e => e.tagName === d.tagName)[0] === d,
                ":last-of-type": d => Array.from(d.parentNode.children).filter(e => e.tagName === d.tagName).pop() === d,
                ":only-of-type": d => 1 === Array.from(d.parentNode.children).filter(e => e.tagName === d.tagName).length,
                ":has": (d, e) => "string" === typeof e ? null !== d.querySelector(e) : e instanceof Node ? d.contains(e) : e instanceof DomQuery ? e.elements.some(f => d.contains(f)) : !1,
                ":not": (d, e) => !c(d, e),
                ":contains": (d,
                    e) => {
                    e = e.replace(/^['"]|['"]$/g, "");
                    return d.textContent.includes(e)
                },
                ":lang": (d, e) => d.matches(`:lang(${e})`),
                ":nth-child": (d, e) => d.matches(`:nth-child(${e})`),
                ":nth-last-child": (d, e) => d.matches(`:nth-last-child(${e})`),
                ":nth-of-type": (d, e) => d.matches(`:nth-of-type(${e})`),
                ":nth-last-of-type": (d, e) => d.matches(`:nth-last-of-type(${e})`),
                ":is": (d, e) => d.matches(e),
                ":where": (d, e) => d.matches(e),
                ":scope": d => d === this.elements[0],
                ":read-only": d => d.readOnly,
                ":read-write": d => !d.readOnly && !d.disabled,
                ":required": d =>
                    d.required,
                ":optional": d => !d.required,
                ":valid": d => d.validity.valid,
                ":invalid": d => !d.validity.valid,
                ":in-range": d => !1 === d.validity.rangeUnderflow && !1 === d.validity.rangeOverflow,
                ":out-of-range": d => d.validity.rangeUnderflow || d.validity.rangeOverflow
            },
            c = (d, e) => {
                if ("string" === typeof e) {
                    if (e.includes(",")) return e.split(",").some(f => c(d, f.trim()));
                    if (/\s+/.test(e)) {
                        e = e.split(/\s+/);
                        let f = d;
                        for (let h = e.length - 1; 0 <= h; h--) {
                            if (!f || !c(f, e[h])) return !1;
                            f = f.parentElement
                        }
                        return !0
                    }
                    if (e.startsWith(".")) return d.classList.contains(e.slice(1));
                    if (e.startsWith("#")) return d.id === e.slice(1);
                    if (e.startsWith("[") && e.endsWith("]")) {
                        const [f, h, g] = e.slice(1, -1).split(/([~^$*|]?=)/);
                        e = d.getAttribute(f);
                        if (!h) return null !== e;
                        if (!e) return !1;
                        switch (h) {
                            case "=":
                                return e === g;
                            case "~=":
                                return e.split(/\s+/).includes(g);
                            case "^=":
                                return e.startsWith(g);
                            case "$=":
                                return e.endsWith(g);
                            case "*=":
                                return e.includes(g);
                            case "|=":
                                return e === g || e.startsWith(g + "-")
                        }
                    } else if (e.startsWith(":")) {
                        if (e = e.match(/^:([\w-]+)(?:\((.*?)\))?$/)) {
                            const [, f, h] = e;
                            if (b[`:${f}`]) return b[`:${f}`](d,
                                h)
                        }
                    } else return d.matches(e)
                } else {
                    if (e instanceof Node) return d === e;
                    if (e instanceof DomQuery) return e.elements.includes(d);
                    if ("function" === typeof e) return e.call(d, d)
                }
                return !1
            };
        try {
            return this.elements.some(d => c(d, a))
        } catch (d) {
            return !1
        }
    },
    _queueTask: function(a) {
        const b = this.data("queueId"),
            c = this.elements[0]?.id || "default" + Math.random().toString(36).substr(2, 9);
        if (this.animationChains && this.animationChains[c]) return this._Queue = this._Queue.then(() => a()), this;
        if (b && this.fx[b]) return this.queue(function(d) {
            a().then(() =>
                d())
        });
        this._Queue = this._Queue.then(() => a());
        return this
    },
    css: function(a, b, c) {
        if (!this.elements || 0 === this.elements.length) return this;
        const d = this.elements[0];
        if (!d || 1 !== d.nodeType || "undefined" === typeof d.style) return this;
        if (void 0 === b && "string" === typeof a) return window.getComputedStyle(d).getPropertyValue(a);
        if (Array.isArray(a) && void 0 === b) {
            const h = {},
                g = window.getComputedStyle(d);
            a.forEach(l => {
                h[l] = g.getPropertyValue(l)
            });
            return h
        }
        const e = this,
            f = {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            };
        return this._queueTask(() => new Promise(h => {
            let g;
            !Array.isArray(a) && "object" !== typeof a || "function" !== typeof b ? "function" === typeof c && (g = c) : g = b;
            const l = (n, p, t) => {
                    for (const B in p)
                        if (Object.prototype.hasOwnProperty.call(p, B)) {
                            let C = p[B];
                            if ("function" === typeof C) {
                                var m = window.getComputedStyle(n);
                                C = C.call(n, t, m.getPropertyValue(B))
                            }
                            if ("string" === typeof C)
                                if (/^([+-])=\d+(\.\d+)?([a-z%]*)$/.test(C)) {
                                    m =
                                        C.match(/^([+-])=(\d+(\.\d+)?)([a-z%]*)$/);
                                    var u = parseFloat(window.getComputedStyle(n).getPropertyValue(B)) || 0,
                                        z = m[4] || "px";
                                    C = ("+" === m[1] ? u + parseFloat(m[2]) : u - parseFloat(m[2])) + z
                                } else /^([+-])\d+(\.\d+)?([a-z%]*)$/.test(C) && (m = C.match(/^([+-])(\d+(\.\d+)?)([a-z%]*)$/), u = parseFloat(window.getComputedStyle(n).getPropertyValue(B)) || 0, z = m[4] || "px", C = ("+" === m[1] ? u + parseFloat(m[2]) : u - parseFloat(m[2])) + z);
                            "number" !== typeof C || f[B] || (C += "px");
                            ["", "-webkit-", "-moz-", "-ms-", "-o-"].forEach(D => {
                                n.style[D + B] = null ===
                                    C ? "" : C
                            })
                        }
                },
                k = [];
            e.elements.forEach((n, p) => {
                if (1 === n.nodeType && n.style)
                    if (Array.isArray(a)) {
                        const t = window.getComputedStyle(n),
                            m = {};
                        a.forEach(u => {
                            m[u] = t.getPropertyValue(u)
                        });
                        k.push(m);
                        g && g.call(e, m, n)
                    } else "object" === typeof a ? l(n, a, p) : l(n, {
                        [a]: b
                    }, p), g && g.call(e, n)
            });
            h(0 < k.length ? k : e)
        }))
    },
    _processDuration: function(a) {
        let b;
        b = "slow" === a ? 600 : "fast" === a ? 200 : "normal" === a ? 400 : "string" === typeof a ? parseInt(a, 10) || 300 : a;
        ["slow", "fast", "normal"].includes(a) && (b += Math.floor(100 * Math.random()) / 100);
        return b
    },
    _isStringSelector: function(a) {
        return "string" === typeof a && !["slow", "fast", "normal"].includes(a)
    },
    _fadeToScale: function(a) {
        return "scale scaleX scaleY scaleTL scaleTR scaleBL scaleBR scaleTC scaleBC scaleC scaleLC scaleRC".split(" ").some(b => b in a)
    },
    toggle: function(a = 300, b = {}, c) {
        if (this._isStringSelector(a)) return domquery(a).toggle(b, c);
        a = this._processDuration(a);
        let d;
        "boolean" === typeof a ? (c = b, d = a, a = 0, b = {}) : "boolean" === typeof b ? (d = b, b = {}) : "function" === typeof a ? (c = a, a = 0, b = {}) : "function" === typeof b &&
            (c = b, b = {});
        const e = this,
            f = function(h) {
                function g() {
                    k++;
                    k === n && ("function" === typeof c && c.call(e), h && h())
                }
                const l = e.elements;
                let k = 0;
                const n = l.length;
                l.forEach(p => {
                    const t = "none" === window.getComputedStyle(p).display || "none" === p.style.display;
                    "undefined" !== typeof d ? d ? t ? domquery(p).slideDown(a, b, g) : g() : t ? g() : domquery(p).slideUp(a, b, g) : t ? domquery(p).slideDown(a, b, g) : domquery(p).slideUp(a, b, g)
                })
            };
        if (!1 !== b.useQueue) return this.queue(f);
        f();
        return this
    },
    slideUp: function(a = 300, b = {}, c) {
        performance.now();
        if (this._isStringSelector(a)) return domquery(a).slideUp(b,
            c);
        "string" === typeof a ? ("function" === typeof b && (c = b, b = {}), a = this._processDuration(a)) : "function" === typeof a ? (c = a, a = 300, b = {}) : "function" === typeof b ? (c = b, b = {}) : "object" === typeof a && (c = b, b = a, a = 300);
        const d = this;
        a = this._processDuration(a);
        const e = function(f) {
            const h = d.elements;
            let g = 0;
            const l = h.length;
            h.forEach(function(k) {
                if ("none" !== window.getComputedStyle(k).display && "none" !== k.style.display)
                    if (k._isAnimating) g++, g === l && ("function" === typeof c && c.call(d), f && f());
                    else {
                        k._isAnimating = !0;
                        let n = !1;
                        const p =
                            function() {
                                n || (n = !0, k._isAnimating = !1, g++, g === l && ("function" === typeof c && c.call(d), performance.now(), f && f()))
                            };
                        domquery(k)._hide$Height(a, {
                            ...b,
                            start: function() {
                                b.start && b.start.call(this)
                            },
                            step: function(t, m, u) {
                                b.step && b.step.call(this, t, m, u)
                            },
                            progress: function(t, m, u) {
                                b.progress && b.progress.call(this, t, m, u)
                            },
                            done: function() {
                                b.done && b.done.call(this)
                            },
                            complete: function() {
                                b.complete && b.complete.call(this);
                                b.done && b.done.call(this)
                            },
                            fail: function(t) {
                                b.fail && b.fail.call(this, t);
                                p()
                            },
                            always: function() {
                                b.complete &&
                                    b.complete.call(this);
                                b.always && b.always.call(this);
                                p()
                            }
                        })
                    }
                else g++, g === l && ("function" === typeof c && c.call(d), f && f())
            })
        };
        if (!1 !== b.useQueue) return this.queue(e);
        e();
        return this
    },
    slideDown: function(a = 300, b = {}, c) {
        performance.now();
        if (this._isStringSelector(a)) return domquery(a).slideDown(b, c);
        "string" === typeof a ? ("function" === typeof b && (c = b, b = {}), a = this._processDuration(a)) : "function" === typeof a ? (c = a, a = 300, b = {}) : "function" === typeof b ? (c = b, b = {}) : "object" === typeof a && (c = b, b = a, a = 300);
        const d = this;
        a = this._processDuration(a);
        const e = function(f) {
            const h = d.elements;
            let g = 0;
            const l = h.length;
            h.forEach(function(k) {
                if ("none" === window.getComputedStyle(k).display || "none" === k.style.display)
                    if (k._isAnimating) g++, g === l && ("function" === typeof c && c.call(d), f && f());
                    else {
                        k._isAnimating = !0;
                        let n = !1;
                        const p = function() {
                            n || (n = !0, k._isAnimating = !1, g++, g === l && ("function" === typeof c && c.call(d), performance.now(), f && f()))
                        };
                        domquery(k)._show$Height(a, {
                            ...b,
                            start: function() {
                                b.start && b.start.call(this)
                            },
                            step: function(t, m, u) {
                                b.step && b.step.call(this,
                                    t, m, u)
                            },
                            progress: function(t, m, u) {
                                b.progress && b.progress.call(this, t, m, u)
                            },
                            done: function() {
                                b.done && b.done.call(this)
                            },
                            complete: function() {
                                b.complete && b.complete.call(this);
                                b.done && b.done.call(this)
                            },
                            fail: function(t) {
                                b.fail && b.fail.call(this, t);
                                p()
                            },
                            always: function() {
                                b.complete && b.complete.call(this);
                                b.always && b.always.call(this);
                                p()
                            }
                        })
                    }
                else g++, g === l && ("function" === typeof c && c.call(d), f && f())
            })
        };
        if (!1 !== b.useQueue) return this.queue(e);
        e();
        return this
    },
    fadeToggle: function(a, b = {}, c) {
        if (this._isStringSelector(a)) return domquery(a).fadeToggle(b,
            c);
        "function" === typeof b && (c = b, b = {});
        b = {
            ...b,
            opacity: !0
        };
        const d = this,
            e = function(f) {
                const h = d._processDuration(a);
                d.slideToggle(h, b, function() {
                    c && c.call(d);
                    f && f()
                })
            };
        if (!1 !== b.useQueue) return this.queue(e);
        e();
        return this
    },
    slideToggle: function(a = 300, b = {}, c) {
        performance.now();
        "object" === typeof a ? (c = b, b = a, a = 300) : "function" === typeof a && (c = a, b = {}, a = 300);
        if (this._isStringSelector(a)) return domquery(a).slideToggle(b, c);
        "function" === typeof b && (c = b, b = {});
        const d = this;
        a = this._processDuration(a);
        const e = function(f) {
            const h =
                d.elements;
            let g = 0;
            const l = h.length;
            h.forEach(function(k) {
                const n = "none" === window.getComputedStyle(k).display || "none" === k.style.display ? "_show$Height" : "_hide$Height";
                if (k._isAnimating) g++, g === l && ("function" === typeof c && c.call(d), f && f());
                else {
                    k._isAnimating = !0;
                    let p = !1;
                    const t = function() {
                        p || (p = !0, k._isAnimating = !1, g++, g === l && ("function" === typeof c && c.call(d), performance.now(), f && f()))
                    };
                    domquery(k)[n](a, {
                        ...b,
                        start: function() {
                            b.start && b.start.call(this)
                        },
                        step: function(m, u, z) {
                            b.step && b.step.call(this,
                                m, u, z)
                        },
                        progress: function(m, u, z) {
                            b.progress && b.progress.call(this, m, u, z)
                        },
                        done: function() {
                            b.done && b.done.call(this)
                        },
                        complete: function() {
                            b.complete && b.complete.call(this);
                            b.done && b.done.call(this)
                        },
                        fail: function(m) {
                            b.fail && b.fail.call(this, m);
                            t()
                        },
                        always: function() {
                            b.complete && b.complete.call(this);
                            b.always && b.always.call(this);
                            t()
                        }
                    })
                }
            })
        };
        if (!1 !== b.useQueue) return this.queue(e);
        e();
        return this
    },
    show$Height: function(a = 300, b = {}, c) {
        const d = this;
        return this.queue(function(e) {
            d._show$Height(a, b, function() {
                c &&
                    c.call(this);
                e()
            })
        })
    },
    hide$Height: function(a = 300, b = {}, c) {
        const d = this;
        return this.queue(function(e) {
            d._hide$Height(a, b, function() {
                c && c.call(this);
                e()
            })
        })
    },
    _show$Height: function(a = 300, b = {}, c) {
        "function" === typeof b && (b = {});
        var d = b.start || null,
            e = b.fail || null,
            f = b.always || null,
            h = b.complete || null,
            g = b.done || null;
        return this._Queue = this._Queue.then(() => new Promise(l => {
            d && d.call(this);
            this.elements.forEach(function(k) {
                try {
                    const O = k.getAttribute("data-animating"),
                        R = parseInt(k.getAttribute("data-animating-timestamp") ||
                            "0", 10),
                        P = Date.now();
                    if (("show" === O || "shows" === O || "hides" === O) && P - R < a + 100) l();
                    else {
                        P - R >= a + 100 && (k.removeAttribute("data-animating"), k.removeAttribute("data-animating-timestamp"));
                        k.setAttribute("data-animating", "shows");
                        k.setAttribute("data-animating-timestamp", P.toString());
                        var n = window.getComputedStyle(k),
                            p = n.height,
                            t = n.paddingTop,
                            m = n.paddingBottom,
                            u = n.marginTop,
                            z = n.marginBottom,
                            B = n.borderTopWidth,
                            C = n.borderBottomWidth,
                            D = n.overflow,
                            F = n.display,
                            G = n.transition,
                            v = n.boxSizing,
                            x = k.getAttribute("data-flex-display");
                        x ? (k.style.display = x, k.style.justifyContent = k.getAttribute("data-justify-content") || "", k.style.alignItems = k.getAttribute("data-align-items") || "", k.style.flexDirection = k.getAttribute("data-flex-direction") || "") : k.style.display = "none" === F ? "block" : F;
                        k.style.height = "auto";
                        k.style.paddingTop = "0";
                        k.style.paddingBottom = "0";
                        k.style.marginTop = "0";
                        k.style.marginBottom = "0";
                        k.style.borderTopWidth = "0";
                        k.style.borderBottomWidth = "0";
                        k.style.overflow = "hidden";
                        "number" === typeof b.opacity && 0 <= b.opacity && 1 >= b.opacity ?
                            k.style.opacity = b.opacity.toString() : !0 === b.opacity && (k.style.opacity = "0");
                        var r = (() => {
                                if (k.style.height) {
                                    var H = k.style.height;
                                    if ("auto" !== H && "" !== H && !H.includes("%")) return parseFloat(H)
                                }
                                return "auto" !== p && "" !== p && !p.includes("%") && (H = parseFloat(p), !isNaN(H) && 0 < H) ? H : null
                            })(),
                            q = k.offsetHeight,
                            w = parseFloat(t) + parseFloat(m),
                            y = parseFloat(B) + parseFloat(C),
                            A = r || q + w + y,
                            I = Array.from(k.children).filter(H => H.classList.contains("post") || Array.from(H.children).some(L => L.classList.contains("post"))),
                            E = 0;
                        0 < I.length &&
                            I.forEach(H => {
                                (H.classList.contains("post") ? [H] : Array.from(H.children).filter(L => L.classList.contains("post"))).forEach(L => {
                                    L = window.getComputedStyle(L);
                                    E += parseFloat(L.borderTopWidth) + parseFloat(L.borderBottomWidth)
                                })
                            });
                        k.style.height = "0";
                        k.offsetHeight;
                        var J = b.easing ? b.easing.split(",")[0] : "linear",
                            K = null,
                            Q = "border-box" === v,
                            M = H => {
                                const L = this._anieasing(0, 1, H, J);
                                let S;
                                S = Q ? this._anieasing(0, A, H, J) : this._anieasing(0, A - w - y + y * (1 - L), H, J);
                                k.style.height = `${S}px`;
                                k.style.paddingTop = parseFloat(t) * L + "px";
                                k.style.paddingBottom = parseFloat(m) * L + "px";
                                k.style.marginTop = parseFloat(u) * L + "px";
                                k.style.marginBottom = parseFloat(z) * L + "px";
                                k.style.borderTopWidth = parseFloat(B) * L + "px";
                                k.style.borderBottomWidth = parseFloat(C) * L + "px";
                                if ("number" === typeof b.opacity) {
                                    if (1 === H) {
                                        const V = a / 2,
                                            W = Date.now(),
                                            U = () => {
                                                const T = Math.min((Date.now() - W) / V, 1),
                                                    X = this._anieasing(b.opacity, 1, T, J);
                                                k.style.opacity = X.toString();
                                                1 > T && requestAnimationFrame(U)
                                            };
                                        requestAnimationFrame(U)
                                    }
                                } else !0 === b.opacity && (k.style.opacity = L.toString());
                                b.step &&
                                    b.step.call(this, k, Math.round(100 * H), L);
                                b.progress && b.progress.call(this, k, H, L)
                            },
                            N = H => {
                                K || (K = H);
                                H = Math.min((H - K) / a, 1);
                                M.call(this, H);
                                if (1 > H) requestAnimationFrame(N.bind(this));
                                else {
                                    k.style.height = r ? `${r}px` : "";
                                    k.style.overflow = D;
                                    k.style.transition = G;
                                    k.style.marginTop = u;
                                    k.style.marginBottom = z;
                                    k.style.paddingTop = t;
                                    k.style.paddingBottom = m;
                                    k.style.borderTopWidth = B;
                                    k.style.borderBottomWidth = C;
                                    k.removeAttribute("data-animating");
                                    k.removeAttribute("data-animating-timestamp");
                                    try {
                                        h && h.call(this, k), g && g.call(this,
                                            k)
                                    } finally {
                                        f && f.call(this), l()
                                    }
                                }
                            };
                        requestAnimationFrame(N.bind(this))
                    }
                } catch (O) {
                    k.removeAttribute("data-animating"), k.removeAttribute("data-animating-timestamp"), e && e.call(this, O), f && f.call(this), l()
                }
            }, this)
        }))
    },
    _hide$Height: function(a = 300, b = {}, c) {
        "function" === typeof b && (b = {});
        var d = b.start || null,
            e = b.fail || null,
            f = b.always || null,
            h = b.complete || null,
            g = b.done || null;
        return this._Queue = this._Queue.then(() => new Promise(l => {
            d && d.call(this);
            this.elements.forEach(function(k) {
                let n;
                try {
                    const J = k.getAttribute("data-animating"),
                        K = parseInt(k.getAttribute("data-animating-timestamp") || "0", 10),
                        Q = Date.now();
                    if (("hide" === J || "hides" === J || "shows" === J) && Q - K < a + 100) l();
                    else {
                        Q - K >= a + 100 && (k.removeAttribute("data-animating"), k.removeAttribute("data-animating-timestamp"));
                        k.setAttribute("data-animating", "hides");
                        k.setAttribute("data-animating-timestamp", Q.toString());
                        var p = k.getBoundingClientRect().height,
                            t = k.style.height && "auto" !== k.style.height && "" !== k.style.height && !k.style.height.includes("%"),
                            m = document.createElement("div");
                        m.style.cssText =
                            "display:block;overflow:hidden;height:auto;margin:0;padding:0;border:0;";
                        if (n = 0 < k.childNodes.length) {
                            for (; k.firstChild;) m.appendChild(k.firstChild);
                            k.appendChild(m)
                        }
                        var u = window.getComputedStyle(k),
                            z = u.paddingTop,
                            B = u.paddingBottom,
                            C = u.marginTop,
                            D = u.marginBottom,
                            F = u.borderTopWidth,
                            G = u.borderBottomWidth,
                            v = u.overflow,
                            x = u.display,
                            r = u.transition;
                        x.includes("flex") && (k.setAttribute("data-flex-display", x), k.setAttribute("data-justify-content", u.justifyContent), k.setAttribute("data-align-items", u.alignItems),
                            k.setAttribute("data-flex-direction", u.flexDirection));
                        var q = t || (() => {
                            const M = u.height;
                            return "auto" !== M && "" !== M && !M.includes("%")
                        })() ? t ? parseFloat(k.style.height) : parseInt(u.height, 10) : p;
                        k.style.height = q + "px";
                        k.style.overflow = "hidden";
                        if ("number" === typeof b.opacity && 0 <= b.opacity && 1 >= b.opacity) {
                            const M = parseFloat(k.style.opacity || "1");
                            k.style.opacity = M.toString()
                        } else !0 === b.opacity && (k.style.opacity = "1");
                        k.style.marginTop = C;
                        k.style.marginBottom = D;
                        k.style.paddingTop = z;
                        k.style.paddingBottom = B;
                        k.style.borderTopWidth =
                            F;
                        k.style.borderBottomWidth = G;
                        k.offsetHeight;
                        var w = b.easing ? b.easing.split(",") : [],
                            y = 1 < w.length ? w[1].trim() : w[0] ? w[0].trim() : "linear",
                            A = Date.now();
                        parseFloat(z);
                        parseFloat(B);
                        parseFloat(F);
                        parseFloat(G);
                        var I = M => {
                                const N = this._anieasing(1, 0, M, y);
                                k.style.height = q * N + "px";
                                k.style.paddingTop = parseFloat(z) * N + "px";
                                k.style.paddingBottom = parseFloat(B) * N + "px";
                                k.style.marginTop = parseFloat(C) * N + "px";
                                k.style.marginBottom = parseFloat(D) * N + "px";
                                k.style.borderTopWidth = parseFloat(F) * N + "px";
                                k.style.borderBottomWidth =
                                    parseFloat(G) * N + "px";
                                if ("number" === typeof b.opacity) {
                                    var O = parseFloat(k.style.opacity || "1");
                                    O = this._anieasing(O, b.opacity, M, y);
                                    k.style.opacity = O.toString();
                                    if (1 === M) {
                                        const R = a / 2,
                                            P = Date.now(),
                                            H = () => {
                                                const L = Math.min((Date.now() - P) / R, 1),
                                                    S = this._anieasing(b.opacity, 0, L, y);
                                                k.style.opacity = S.toString();
                                                1 > L && requestAnimationFrame(H)
                                            };
                                        requestAnimationFrame(H)
                                    }
                                } else !0 === b.opacity && (k.style.opacity = N.toString());
                                b.step && b.step.call(this, k, Math.round(100 * M), N);
                                b.progress && b.progress.call(this, k, M, N)
                            },
                            E = () => {
                                const M = Math.min((Date.now() - A) / a, 1);
                                I.call(this, M);
                                if (1 > M) requestAnimationFrame(E.bind(this));
                                else {
                                    k.style.display = "none";
                                    k.style.height = "";
                                    k.style.overflow = v;
                                    k.style.transition = r;
                                    k.style.marginTop = C;
                                    k.style.marginBottom = D;
                                    k.style.paddingTop = z;
                                    k.style.paddingBottom = B;
                                    k.style.borderTopWidth = F;
                                    k.style.borderBottomWidth = G;
                                    k.removeAttribute("data-animating");
                                    k.removeAttribute("data-animating-timestamp");
                                    if (n && m.parentNode === k) {
                                        for (; m.firstChild;) k.appendChild(m.firstChild);
                                        k.removeChild(m)
                                    }
                                    try {
                                        h && h.call(this,
                                            k), g && g.call(this, k)
                                    } finally {
                                        f && f.call(this), l()
                                    }
                                }
                            };
                        requestAnimationFrame(E.bind(this));
                        b.hide && domquery(b.hide).hide$Height(a, b);
                        b.show && domquery(b.show).show$Height(a, b)
                    }
                } catch (J) {
                    k.removeAttribute("data-animating"), k.removeAttribute("data-animating-timestamp"), e && e.call(this, J), f && f.call(this), l()
                }
            }, this)
        }))
    },
    interpolateBackground: function(a, b, c) {
        a = this.parseColor(a);
        b = this.parseColor(b);
        var d = Math.pow(c, 28);
        d = d * (Math.sin(c * Math.PI - Math.PI / 2) + 1) / 2;
        d = (1 - Math.cos(d * Math.PI)) / 2;
        d = d * (1 - Math.cos(c *
            Math.PI)) / 2;
        var e = d * d * (3 - 2 * d);
        d = Math.round(a[0] + (b[0] - a[0]) * e * 200 / 200);
        let f = Math.round(a[1] + (b[1] - a[1]) * e * 200 / 200),
            h = Math.round(a[2] + (b[2] - a[2]) * e * 200 / 200);
        e = a[3] + (b[3] - a[3]) * e * 200 / 200;
        0 < c && 1 > c && (2 > Math.abs(d - a[0]) && (d += b[0] > a[0] ? Math.ceil(.25 * c) : -Math.ceil(.25 * c)), 2 > Math.abs(f - a[1]) && (f += b[1] > a[1] ? Math.ceil(.25 * c) : -Math.ceil(.25 * c)), 2 > Math.abs(h - a[2]) && (h += b[2] > a[2] ? Math.ceil(.25 * c) : -Math.ceil(.25 * c)));
        d = Math.round(100 * d) / 100;
        f = Math.round(100 * f) / 100;
        h = Math.round(100 * h) / 100;
        d = Math.max(0, Math.min(255,
            d));
        f = Math.max(0, Math.min(255, f));
        h = Math.max(0, Math.min(255, h));
        e = Math.max(0, Math.min(1, e));
        return `rgba(${d},${f},${h},${e})`
    },
    parseColor: function(a) {
        if (a.startsWith("rgba")) return a.match(/[\d.]+/g).map(Number);
        if (a.startsWith("rgb")) return [...a.match(/\d+/g).map(Number), 1];
        if (a.startsWith("#")) return [...a.substring(1).match(/.{2}/g).map(c => parseInt(c, 16)), 1];
        let b = document.createElement("div");
        b.style.color = a;
        document.body.appendChild(b);
        a = window.getComputedStyle(b).color;
        document.body.removeChild(b);
        return this.parseColor(a)
    },
    anieasing: {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        },
        smooth: function(a) {
            return a * a * (3 - 2 * a)
        },
        easeInQuad: function(a) {
            return a * a
        },
        easeOutQuad: function(a) {
            return a * (2 - a)
        },
        easeInOutQuad: function(a) {
            return .5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a
        },
        easeInCubic: function(a) {
            return a * a * a
        },
        easeOutCubic: function(a) {
            return --a * a * a + 1
        },
        easeInOutCubic: function(a) {
            return .5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1
        },
        easeOutBounce: function(a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ?
                7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        },
        easeOutElastic: function(a) {
            return .95 <= a ? 1 : Math.pow(2, -10 * a) * Math.sin(2 * (a - .075) * Math.PI / .3) + 1
        },
        easeInQuart: function(a) {
            return a * a * a * a
        },
        easeOutQuart: function(a) {
            return 1 - --a * a * a * a
        },
        easeInOutQuart: function(a) {
            return .5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a
        },
        easeInSine: function(a) {
            return -Math.cos(Math.PI / 2 * a) + 1
        },
        easeOutSine: function(a) {
            return Math.sin(Math.PI / 2 * a)
        },
        easeInOutSine: function(a) {
            return -(Math.cos(Math.PI *
                a) - 1) / 2
        },
        easeInBack: function(a) {
            return a * a * (2.70158 * a - 1.70158)
        },
        easeOutBack: function(a) {
            return --a * a * (2.70158 * a + 1.70158) + 1
        },
        easeInOutBack: function(a) {
            return 1 > (a *= 2) ? .5 * a * a * (3.5949095 * a - 2.5949095) : .5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2)
        },
        easeInBounce: function(a) {
            a = 1 - a;
            return 1 - (a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        },
        easeInOutBounce: function(a) {
            function b(c) {
                return c < 1 / 2.75 ? 7.5625 * c * c : c < 2 / 2.75 ? 7.5625 * (c -= 1.5 /
                    2.75) * c + .75 : c < 2.5 / 2.75 ? 7.5625 * (c -= 2.25 / 2.75) * c + .9375 : 7.5625 * (c -= 2.625 / 2.75) * c + .984375
            }
            return .5 > a ? .5 * (1 - b(1 - 2 * a)) : .5 * b(2 * a - 1) + .5
        },
        easeInElastic: function(a) {
            return .95 <= a ? 1 : 0 === a ? 0 : -(Math.pow(2, 10 * --a) * Math.sin(2 * (a - .1) * Math.PI / .4))
        },
        easeInOutElastic: function(a) {
            return .99 <= a ? 1 : .5 > a ? -.5 * Math.pow(2, 10 * (a = 2 * a - 1)) * Math.sin(2 * (a - .1) * Math.PI / .4) : Math.pow(2, -10 * (a = 2 * a - 1)) * Math.sin(2 * (a - .1) * Math.PI / .4) * .5 + 1
        },
        softBounce: function(a) {
            return .95 <= a ? 1 : 1 - Math.pow(2, -10 * a) * Math.abs(Math.cos(20 * a))
        },
        gentleSpring: function(a) {
            return .95 <=
                a ? 1 : 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a)
        },
        strongElastic: function(a) {
            return .95 <= a ? 1 : Math.pow(2, -15 * a) * Math.sin(2 * (a - .1 / 3) * Math.PI / .1) + 1
        },
        zigzag: function(a) {
            return .95 <= a ? 1 : a + .5 * Math.sin(a * Math.PI * 8) * (1 - a)
        },
        steps: function(a) {
            const b = Math.floor(5 * a);
            return Math.min(1, b / 5 + .2 * (1 - Math.pow(1 - (a - .2 * b) / .2, 4)))
        },
        heartbeat: function(a) {
            return .95 <= a ? (a = (a - .95) / (1 - .95), (1 - a) * (1 - Math.cos(.95 * 6 * Math.PI) * (1 - .95)) + a) : 1 - Math.cos(6 * a * Math.PI) * (1 - a)
        },
        yoyo: function(a) {
            return .5 > a ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2
        },
        rushThenSoft: function(a) {
            return .3 >
                a ? 3.33 * a * a : 1 - Math.pow(-2 * a + 2, 2) / 2
        },
        vibrate: function(a) {
            return .95 <= a ? 1 : 1 - Math.pow(1 - a, 4) + .006 * Math.sin(a * Math.PI * 80) * (.95 < a ? 20 * (1 - a) : 1)
        },
        smoothVibrate: function(a) {
            return .95 <= a ? 1 : Math.sin(a * Math.PI * 4) * Math.exp(3 * -a) * (1 - a) + a
        },
        dramaticBack: function(a) {
            return .5 > a ? Math.pow(2 * a, 2) * (7.40316 * a - 2.70158) / 2 : (Math.pow(2 * a - 2, 2) * (3.70158 * (2 * a - 2) + 2.70158) + 2) / 2
        },
        increasingBounce: function(a) {
            return .95 <= a ? 1 : 1 - Math.abs(Math.sin(6 * a * Math.PI)) * (1 - a)
        },
        rubberBand: function(a) {
            return .95 <= a ? 1 : .4 > a ? 2.5 * a * a : .6 > a ? -12.5 * Math.pow(a -
                .5, 2) + 1.5625 : 2.5 * Math.pow(a - 1, 2) + 1
        }
    },
    _anieasing: function(a, b, c, d) {
        let e = "linear",
            f = null,
            h = this;
        Array.isArray(d) ? (e = d[0], "function" === typeof d[1] && (f = d[1], d._animationId || (d._animationId = Date.now() + Math.random()), this._callbacks || (this._callbacks = {}), 1 <= c && !this._callbacks[d._animationId] && (this._callbacks[d._animationId] = !0, setTimeout(function() {
            f.call(h)
        }, 0)))) : "string" === typeof d && (e = d);
        return "string" === typeof e && e.includes(",") ? (d = e.split(",").map(g => g.trim())[0], a + (b - a) * (this.anieasing[d] || this.anieasing.linear)(c)) :
            a + (b - a) * (this.anieasing[e] || this.anieasing.linear)(c)
    },
    dequeue: function() {
        const a = this.data("queueId");
        if (!this.fx[a] || !this.fx[a].length) return this;
        const b = this.fx[a][0];
        if (!b) return this;
        if ("queue" === b.type) this.fx[a].shift(), b.callback ? b.callback.call(this[0], () => this.dequeue()) : this.dequeue();
        else if ("animate" === b.type && !b.completed) {
            b.completed = !0;
            let c, d;
            const e = Date.now();
            b.lifecycleCallbacks.start && b.lifecycleCallbacks.start.call(this, this[0]);
            const f = this.stop;
            this.stop = (...h) => {
                c && clearInterval(c);
                d && clearInterval(d);
                const g = this.data("stepAnimationFrame");
                g && (cancelAnimationFrame(g), this.removeData("stepAnimationFrame"));
                b.lifecycleCallbacks.fail && b.lifecycleCallbacks.fail.call(this, this[0]);
                return f.apply(this, h)
            };
            b.lifecycleCallbacks.progress && (c = setInterval(() => {
                const h = Math.min((Date.now() - e) / b.duration, 1);
                b.lifecycleCallbacks.progress.call(this, this[0], h);
                1 <= h && clearInterval(c)
            }, 1E3 / 60));
            if (b.lifecycleCallbacks.step) {
                const h = this.elements || [this[0]],
                    g = {};
                h.forEach((n, p) => {
                    g[p] = {};
                    for (let t in b.properties)
                        if ("left top right bottom width height opacity".split(" ").includes(t)) {
                            const m =
                                window.getComputedStyle(n);
                            g[p][t] = parseFloat(m[t]) || 0
                        }
                });
                d = setInterval(() => {
                    const n = Date.now();
                    1 <= Math.min((n - e) / b.duration, 1) && clearInterval(d)
                }, 1E3 / 60);
                let l;

                function k() {
                    const n = Date.now(),
                        p = Math.min((n - e) / b.duration, 1);
                    h.forEach((t, m) => {
                        for (let u in b.properties)
                            if ("left top right bottom width height opacity".split(" ").includes(u)) {
                                const z = g[m][u];
                                let B;
                                B = "string" === typeof b.properties[u] ? b.properties[u].startsWith("+=") ? z + parseFloat(b.properties[u].substring(2)) : b.properties[u].startsWith("-=") ?
                                    z - parseFloat(b.properties[u].substring(2)) : parseFloat(b.properties[u]) : parseFloat(b.properties[u]);
                                const C = z + (B - z) * p;
                                b.lifecycleCallbacks.step.call(t, C, {
                                    elem: t,
                                    prop: u,
                                    start: z,
                                    end: B,
                                    now: C,
                                    pos: p,
                                    unit: "px"
                                })
                            }
                    });
                    1 > p && (l = requestAnimationFrame(k))
                }
                l = requestAnimationFrame(k);
                this.data("stepAnimationFrame", l)
            }
            this.data("progressInterval", c);
            this.data("stepInterval", d);
            this._animate1(b.properties, b.duration || 0, (h = !0) => {
                c && clearInterval(c);
                d && clearInterval(d);
                const g = this.data("stepAnimationFrame");
                g && (cancelAnimationFrame(g),
                    this.removeData("stepAnimationFrame"));
                this.stop = f;
                h && (b.callback && b.callback.call(this, this[0]), b.lifecycleCallbacks.done && b.lifecycleCallbacks.done.call(this, this[0]));
                b.lifecycleCallbacks.always && b.lifecycleCallbacks.always.call(this, this[0]);
                this.fx[a].shift();
                this.dequeue()
            })
        }
        return this
    },
    queue: function(a, b) {
        if (!this.data("queueId")) {
            var c = Date.now();
            const d = Math.random().toString(36).substr(2, 5);
            this.data("queueId", `q_${c}_${d}`)
        }
        c = this.data("queueId");
        this.fx[c] || (this.fx[c] = []);
        "function" ===
        typeof a && (b = a, a = null);
        "function" === typeof b && this.fx[c].push({
            type: "queue",
            callback: b
        });
        1 === this.fx[c].length && setTimeout(() => this.dequeue(), 0);
        return this
    },
    delay: function(a, b) {
        return this.animate({}, a, b)
    },
    start: function(a, b) {
        try {
            1 === arguments.length && "function" === typeof a && (b = a, a = !1);
            if ("number" === typeof a) {
                const d = a,
                    e = "function" === typeof b;
                this.elements.forEach(f => {
                    const h = $(f),
                        g = h.data("queueId");
                    h.removeData("isStopnow");
                    if (g && this.fx[g] && 0 < this.fx[g].length) {
                        const l = this.fx[g][0];
                        if (l.lifecycleCallbacks) {
                            const k =
                                Date.now(),
                                n = l.duration;
                            if (l.lifecycleCallbacks.progress) {
                                let p;
                                const t = () => {
                                    const m = Math.min((Date.now() - k) / n, 1);
                                    l.lifecycleCallbacks.progress.call(h, f, m);
                                    1 > m && (p = requestAnimationFrame(t), h.data("progressRAF", p))
                                };
                                p = requestAnimationFrame(t)
                            }
                            if (l.lifecycleCallbacks.step) {
                                let p;
                                const t = () => {
                                    const m = Math.min((Date.now() - k) / n, 1);
                                    l.lifecycleCallbacks.step.call(h, f, m, m);
                                    1 > m && (p = requestAnimationFrame(t), h.data("stepRAF", p))
                                };
                                p = requestAnimationFrame(t)
                            }
                        }
                        this.dequeue(g)
                    }
                    f.isStopped && ("function" === typeof f.start &&
                        f.start(), f.isStopped = !1)
                });
                setTimeout(() => {
                    this.stop();
                    if (e) try {
                        b.call(this, this.elements)
                    } catch (f) {
                        console.error("Start delay callback error:", f), console.error("Context:", this)
                    }
                }, d);
                return this
            }
            const c = [];
            this.elements.forEach(d => {
                const e = $(d),
                    f = e.data("queueId");
                e.removeData("isStopnow");
                if (!0 === a && f && this.fx[f]) {
                    const h = new Promise(g => {
                        const l = this.fx[f][0];
                        if (l) {
                            const k = l.lifecycleCallbacks?.done;
                            l.lifecycleCallbacks = l.lifecycleCallbacks || {};
                            l.lifecycleCallbacks.done = function(...n) {
                                k && k.apply(this,
                                    n);
                                setTimeout(g, 0)
                            }
                        } else g()
                    });
                    c.push(h)
                }
                if (f && this.fx[f] && 0 < this.fx[f].length) {
                    const h = this.fx[f][0];
                    if (h.lifecycleCallbacks) {
                        const g = Date.now(),
                            l = h.duration;
                        if (h.lifecycleCallbacks.progress) {
                            let k;
                            const n = () => {
                                const p = Math.min((Date.now() - g) / l, 1);
                                h.lifecycleCallbacks.progress.call(e, d, p);
                                1 > p && (k = requestAnimationFrame(n), e.data("progressRAF", k))
                            };
                            k = requestAnimationFrame(n)
                        }
                        if (h.lifecycleCallbacks.step) {
                            let k;
                            const n = () => {
                                const p = Math.min((Date.now() - g) / l, 1);
                                h.lifecycleCallbacks.step.call(e, d, p, p);
                                1 > p && (k = requestAnimationFrame(n), e.data("stepRAF", k))
                            };
                            k = requestAnimationFrame(n)
                        }
                    }
                    this.dequeue(f)
                }!0 === a && f && this.fx[f] && (this.fx[f] = [], e.removeData("queueId"));
                d.isStopped && ("function" === typeof d.start && d.start(), d.isStopped = !1)
            });
            if ("function" === typeof b)
                if (!0 === a) Promise.all(c).then(() => {
                    setTimeout(() => {
                        try {
                            b.call(this, this.elements)
                        } catch (d) {
                            console.error("Start callback error:", d), console.error("Context:", this)
                        }
                    }, 0)
                });
                else try {
                    b.call(this, this.elements)
                } catch (d) {
                    console.error("Start callback error:",
                        d), console.error("Context:", this)
                }
            return this
        } catch (c) {
            return console.error("Start error:", c), console.error("Context:", this), this
        }
    },
    stop: function(a, b) {
        try {
            if ("number" === typeof a) return this.elements.forEach(c => {
                const d = $(c);
                var e = d.data("progressInterval");
                const f = d.data("stepInterval");
                e && (clearInterval(e), d.removeData("progressInterval"));
                f && (clearInterval(f), d.removeData("stepInterval"));
                "function" !== typeof c.stop || c.isStopped || (c.stop(), c.isStopped = !0);
                if (e = d.data("timerId")) clearTimeout(e), d.removeData("timerId");
                (e = d.data("queueId")) && this.fx[e] && this.fx[e][0] && (e = this.fx[e][0], e.lifecycleCallbacks?.fail && e.lifecycleCallbacks.fail.call(d, c));
                d.data("isStopnow", !0)
            }), setTimeout(() => {
                this.start();
                if ("function" === typeof b) try {
                    b.call(this, this.elements)
                } catch (c) {
                    console.error("Stop callback error:", c), console.error("Context:", this), console.error("Elements:", this.elements)
                }
            }, a), this;
            if (0 === arguments.length || "function" === typeof a) {
                this.elements.forEach(c => {
                    const d = $(c);
                    var e = d.data("progressInterval");
                    const f =
                        d.data("stepInterval");
                    e && (clearInterval(e), d.removeData("progressInterval"));
                    f && (clearInterval(f), d.removeData("stepInterval"));
                    "function" !== typeof c.stop || c.isStopped || (c.stop(), c.isStopped = !0);
                    if (e = d.data("timerId")) clearTimeout(e), d.removeData("timerId");
                    (e = d.data("queueId")) && this.fx[e] && this.fx[e][0] && (e = this.fx[e][0], e.lifecycleCallbacks?.fail && e.lifecycleCallbacks.fail.call(d, c));
                    d.data("isStopnow", !0)
                });
                if ("function" === typeof a) try {
                    a.call(this, this.elements)
                } catch (c) {
                    console.error("Error in clearQueueCallback:",
                        c), console.error("Context:", this), console.error("Elements:", this.elements)
                }
                return this
            }
            this.elements.forEach(c => {
                const d = $(c);
                var e = d.data("progressInterval");
                const f = d.data("stepInterval");
                e && (clearInterval(e), d.removeData("progressInterval"));
                f && (clearInterval(f), d.removeData("stepInterval"));
                if ((e = d.data("queueId")) && this.fx[e]) {
                    this.fx[e][0]?.lifecycleCallbacks?.fail && this.fx[e][0].lifecycleCallbacks.fail.call(d, c);
                    d.css("transition", "none");
                    if (a) {
                        const h = this.fx[e][0];
                        if (h?.properties) {
                            const g =
                                window.getComputedStyle(c),
                                l = {};
                            Object.keys(h.properties).forEach(k => {
                                l[k] = "left" === k || "top" === k || "right" === k || "bottom" === k ? g[k] : "width" === k || "height" === k ? g[k] : "opacity" === k ? g.opacity : "backgroundColor" === k ? g.backgroundColor : h.properties[k]
                            });
                            d.css(l);
                            "function" === typeof h.callbacks && h.callbacks.call(d)
                        }
                        a ? this.fx[e] = [] : this.fx[e].shift();
                        0 === this.fx[e].length && d.removeData("queueId")
                    }
                    setTimeout(() => {
                        d.css("transition", "")
                    }, 0)
                }
                if (c = d.data("timerId")) clearTimeout(c), d.removeData("timerId");
                d.data("isStopnow",
                    !0)
            });
            if ("function" === typeof b) try {
                b.call(this, this.elements)
            } catch (c) {
                console.error("Stop callback error:", c), console.error("Context:", this), console.error("Elements:", this.elements)
            }
            return this
        } catch (c) {
            return console.error("Stop error:", c), console.error("Context:", this), this
        }
    },
    finish: function() {
        this.elements.forEach(a => {
            const b = $(a),
                c = b.data("queueId");
            if (c && this.fx[c]) {
                b.css("transition", "none");
                const d = this.fx[c].filter(e => "function" !== typeof e && e.properties);
                0 < d.length ? this._animate1(d[d.length -
                    1].properties, 0, () => {
                    var e = this.fx[c].filter(f => "function" === typeof f || "function" === typeof f.callbacks);
                    0 < e.length && (e = e[e.length - 1], "function" === typeof e ? e.call(a) : "function" === typeof e.callbacks && e.callbacks.call(b));
                    this.fx[c] = [];
                    b.removeData("queueId");
                    (e = b.data("initialState")) && 0 < Object.keys(e).length && b.css(e);
                    setTimeout(() => {
                        b.css("transition", "")
                    }, 0)
                }, "finish") : (this.fx[c] = [], b.removeData("queueId"), b.css("transition", ""))
            }
        });
        return this
    },
    clearQueue: function(a, b) {
        const c = d => {
            d.currentAnimationFrame &&
                (cancelAnimationFrame(d.currentAnimationFrame), delete d.currentAnimationFrame);
            $(d).off(".animation");
            $(d).removeData("queueId");
            $(d).removeData("animationData")
        };
        "function" === typeof a && (b = a, a = void 0);
        (void 0 !== this.length && 0 < this.length ? Array.from(this) : [this]).forEach(d => {
            var e;
            if ((e = $(d).data("queueId") || d._domquery && d._domquery.queueId) && this.fx[e])
                if (!a) this.fx[e] = [], c(d);
                else if ("number" === typeof a) this.fx[e].splice(a, 1), 0 === this.fx[e].length && c(d);
            else if ("string" === typeof a) {
                const [f, h] = a.split("-"),
                    g = parseInt(f), l = "end" === h ? this.fx[e].length : parseInt(h);
                this.fx[e].splice(g, l - g + 1);
                0 === this.fx[e].length && c(d)
            }
        });
        "function" === typeof b && b.call(this);
        return this
    },
    fadeTo: function(a, b, c = {}, d = null) {
        if ("string" === typeof a && !["slow", "fast", "normal"].includes(a)) return "string" === typeof b || "number" === typeof b ? domquery(a).fadeTo(b, c, d) : domquery(a).fadeTo(400, b, c, d);
        if (!this.elements.length) return "function" === typeof d && d.call(this), this;
        let e = !1;
        "show" !== d && "hide" !== d || this._fadeToScale(c) || (e = !0);
        "function" ===
        typeof c && (d = c, c = {});
        "object" === typeof a && (c = a, d = b, b = c.opacity, a = c.duration || 400);
        const f = this.elements[0];
        if (!f) return "function" === typeof d && d.call(this), this;
        if (!["show", "hide", "fadeIn", "fadeOut"].includes(d)) {
            if (this.data("isStopnow") || this.data("isStopped")) return f.style.transition = "none", f.offsetHeight, f.style.transition = `opacity ${a/1E3}s ease`, f.style.opacity = b, "function" === typeof d && d.call(this), this;
            f.style.transition = "none";
            f.offsetHeight
        }
        var h = getComputedStyle(f),
            g = parseFloat(h.opacity);
        const l = h.transform;
        var k = new DOMMatrix(l);
        k = .01 > Math.hypot(k.a, k.b) || !f.offsetParent;
        const n = "none" === h.display;
        h = "hidden" === h.visibility;
        g = k || n || h || 0 === g;
        h = f.getAttribute("data-origScale") || "scale";
        g && 0 < parseFloat(b) && (f.style.display = "block", f.style.visibility = "visible", f.style.opacity = "0", k && ("scale" === h ? f.style.transform = `${l.replace(/scale\([^)]*\)/,"")} scale(0.01)`.trim() : f.style[h] = "0.01"));
        return this.animate({
            opacity: b,
            ...c,
            isFadeTo: !0
        }, this._processDuration(a), d, e)
    },
    show: function(a, b = {}, c = null) {
        if (this._isStringSelector(a)) return domquery(a).show(b, c);
        if (!this.elements.length) return "function" === typeof c && c.call(this), this;
        if (0 === a || void 0 === a) return this.elements.forEach(d => {
            d.style.display = "block"
        }), "function" === typeof c && c.call(this), this;
        if ("object" === typeof a && "object" === typeof b) return b = {
            ...a,
            ...b,
            fadeIn: !0
        }, a = b.duration || 300, delete b.duration, this.fadeTo(a, 1, b, "function" === typeof c ? {
            done: c
        } : c);
        a = a || 300;
        "object" === typeof a ? (c = b, b = a, a = b.duration || 300) : "function" === typeof b &&
            (c = b, b = {});
        b = {
            ...b,
            fadeIn: !0
        };
        return this.fadeTo(a, 1, b, c)
    },
    hide: function(a, b = {}, c = null) {
        if (this._isStringSelector(a)) return domquery(a).hide(b, c);
        if (!this.elements.length) return "function" === typeof c && c.call(this), this;
        if (0 === a || void 0 === a) return this.elements.forEach(d => {
            d.style.display = "none"
        }), "function" === typeof c && c.call(this), this;
        if ("object" === typeof a && "object" === typeof b) return b = {
            ...a,
            ...b,
            fadeOut: !0
        }, a = b.duration || 300, delete b.duration, this.fadeTo(a, 0, b, "function" === typeof c ? {
            done: c
        } : c);
        a = a || 300;
        "object" === typeof a ? (c = b, b = a, a = b.duration || 300) : "function" === typeof b && (c = b, b = {});
        b = {
            ...b,
            fadeOut: !0
        };
        return this.fadeTo(a, 0, b, c)
    },
    fadeIn: function(a = 300, b = {}, c = null) {
        if (this._isStringSelector(a)) return domquery(a).fadeIn(b, c);
        a = this._processDuration(a);
        return this.show(a, b, c)
    },
    fadeOut: function(a = 300, b = {}, c = null) {
        if (this._isStringSelector(a)) return domquery(a).fadeOut(b, c);
        a = this._processDuration(a);
        return this.hide(a, b, c)
    },
    shadow: function() {
        var a = this;
        let b = {},
            c = 0,
            d;
        for (let f = 0; f < arguments.length; f++) "string" ===
            typeof arguments[f] || arguments[f] instanceof Element ? a = arguments[f] : "object" !== typeof arguments[f] || Array.isArray(arguments[f]) ? "number" === typeof arguments[f] ? c = arguments[f] : "function" === typeof arguments[f] && (d = arguments[f]) : b = arguments[f];
        b = Object.assign({}, {
            bgcolor: "#000000",
            zindex: 999,
            half: !1,
            close: null,
            overlayType: "alert"
        }, b);
        const e = f => {
            if (!f || "string" !== typeof f) return {
                color: "#000000",
                blur: 0
            };
            let h = {
                color: null,
                blur: 0
            };
            f.split(";").forEach(g => {
                var l = g.trim();
                l.startsWith("blur:") ? h.blur = parseInt(l.split(":")[1]) ||
                    0 : l && (l.startsWith("rgba(") || l.startsWith("hsla(") ? h.color = l : l.startsWith("rgb(") ? (g = l.match(/\d+/g), h.color = `rgba(${g[0]}, ${g[1]}, ${g[2]}, 0.5)`) : l.startsWith("hsl(") ? (g = l.match(/\d+/g), h.color = `hsla(${g[0]}, ${g[1]}%, ${g[2]}%, 0.5)`) : (g = document.createElement("div"), g.style.color = l, document.body.appendChild(g), l = getComputedStyle(g).color.match(/\d+/g), document.body.removeChild(g), h.color = `rgba(${l[0]}, ${l[1]}, ${l[2]}, 0.5)`))
            });
            return h
        };
        a = "string" === typeof a ? document.querySelectorAll(a) : a instanceof
        NodeList ? a : a instanceof Element ? [a] : [document.body];
        Array.from(a).forEach(function(f) {
            var h = "toast" === b.overlayType ? "domquery-toast-overlay" : "domquery-shadow-overlay";
            const g = e(b.bgcolor);
            var l = null;
            if ("_self" === b.parent) {
                var k = document.querySelectorAll(".domquery-alert");
                for (let t = k.length - 1; 0 <= t; t--) {
                    const m = k[t];
                    if (m.getAttribute("data-instance-id") !== b.instanceId) {
                        l = m;
                        break
                    }
                }
                l && (l.style.cssText += "overflow: hidden !important;")
            }
            let n = f.querySelector(`.${h}[data-instance-id="${b.instanceId}"]`);
            k = !1;
            if (!n && (k = !0, n = document.createElement("div"), n.className = h, n.setAttribute("data-instance-id", b.instanceId), h = `\n\t\t\t\t\t\tposition: ${l?"absolute":f===document.body?"fixed":"absolute"};\n\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\theight: 100%;\n\t\t\t\t\t\tz-index: ${b.zindex};\n\t\t\t\t\t\tpointer-events: auto;\n\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t`, g.color && (h += `background-color: ${g.color};`), 0 < g.blur && (h += `backdrop-filter: blur(${g.blur}px);-webkit-backdrop-filter: blur(${g.blur}px);`),
                    n.style.cssText = h, l ? l.insertBefore(n, l.firstChild) : f.appendChild(n), b.close)) {
                const t = b.close.replace(/["']/g, "");
                l || n.addEventListener("click", function() {
                    const m = document.querySelector(t);
                    m && m.click()
                });
                try {
                    document.querySelectorAll(t).forEach(m => {
                        m.addEventListener("click", function(u) {
                            u.preventDefault();
                            c ? p(parseFloat(getComputedStyle(n).opacity), 0, c) : (0 < g.blur && (n.style.backdropFilter = "blur(0px)", n.style.WebkitBackdropFilter = "blur(0px)"), n.style.opacity = 0, n.style.display = "none", b.half || "function" !==
                                typeof d || d.call(f))
                        })
                    })
                } catch (m) {
                    console.warn("Invalid close selector:", b.close)
                }
            }
            l = "alpha" in b ? b.alpha / 100 : 1;
            const p = function(t, m, u) {
                let z = !1,
                    B = Date.now();
                n.style.display = "block";
                const C = function() {
                    var D = Date.now() - B;
                    D = Math.min(D / u, 1);
                    if (0 < g.blur) {
                        const F = 0 === m ? g.blur * (1 - D) : g.blur * D;
                        n.style.backdropFilter = `blur(${F}px)`;
                        n.style.WebkitBackdropFilter = `blur(${F}px)`
                    }
                    n.style.opacity = 0 === m ? 1 - D : D;
                    b.half && !z && .5 <= D && (z = !0, "function" === typeof d && d.call(f));
                    1 > D ? requestAnimationFrame(C) : (0 === m && (n.style.display =
                        "none"), b.half || "function" !== typeof d || d.call(f))
                };
                requestAnimationFrame(C)
            };
            "none" !== n.style.display && 0 < parseFloat(getComputedStyle(n).opacity) && !k ? c ? p(l, 0, c) : (0 < g.blur && (n.style.backdropFilter = "blur(0px)", n.style.WebkitBackdropFilter = "blur(0px)"), n.style.opacity = 0, n.style.display = "none", b.half || "function" !== typeof d || d.call(f)) : c ? p(0, l, c) : (0 < g.blur && (n.style.backdropFilter = `blur(${g.blur}px)`, n.style.WebkitBackdropFilter = `blur(${g.blur}px)`), n.style.opacity = l, n.style.display = "block", b.half || "function" !==
                typeof d || d.call(f))
        });
        return this
    },
    saveAnimationChain: function(a) {
        if (!this.elements || 0 === this.elements.length) return console.warn("No elements found to save animation chain."), this;
        const b = this.elements[0].id || "default_" + Math.random().toString(36).substr(2, 9);
        this.animationChains[b] = a;
        return this
    },
    anitimeRunning: 0,
    hasData: function() {
        let a = !1;
        $(this.elements).each((b, c) => {
            if ($(c).data() && 0 < Object.keys($(c).data()).length) return a = !0, !1
        });
        return a
    },
    gt: function(a, b) {
        0 <= a && a < this.elements.length ? (this.elements =
            this.elements.filter((c, d) => d > a), "function" === typeof b && b.call(this)) : console.error("Index out of bounds");
        return this
    },
    lt: function(a, b) {
        0 <= a && a < this.elements.length ? (this.elements = this.elements.filter((c, d) => d < a), "function" === typeof b && b.call(this)) : console.error("Index out of bounds");
        return this
    },
    children: function(a, b) {
        let c = [];
        const d = f => {
            if (!(f instanceof HTMLElement)) return !1;
            const h = window.getComputedStyle(f);
            return "none" !== h.display && "hidden" !== h.visibility && 0 < parseFloat(h.opacity) && (0 < f.offsetWidth ||
                0 < f.offsetHeight)
        };
        this.elements.forEach(f => {
            f instanceof Element && (f = Array.from(f.children), a ? ":visible" === a ? c = c.concat(f.filter(d)) : f.forEach(h => {
                h.matches && h.matches(a) && c.push(h)
            }) : c = c.concat(f))
        });
        c = Array.from(new Set(c));
        const e = new DomQuery(c);
        e._prevObject = this;
        "function" === typeof b && b.call(e, e);
        return e
    },
    removeAttr: function(a) {
        this.elements.forEach(b => {
            b instanceof Element && b.removeAttribute(a)
        });
        return this
    },
    remove: function(a) {
        let b = a ? this.find(a).elements : this.elements;
        b.forEach(c => {
            c &&
                c.parentNode && (c._eventHandlers && (Object.keys(c._eventHandlers).forEach(d => {
                    c._eventHandlers[d].forEach(e => {
                        c.removeEventListener(d, e.handler, !0)
                    })
                }), delete c._eventHandlers), c.parentNode.removeChild(c))
        });
        this.elements = this.elements.filter(c => !b.includes(c));
        return this
    },
    find: function(a, b) {
        if (!a) return domquery([]);
        var c = [];
        const d = (g, l) => {
                if (!g || !l) return [];
                g = g.split(/\s+(?=[^[\]]*(?:\[|$))/);
                l = [l];
                for (const k of g) {
                    const n = [];
                    l.forEach(p => {
                        if (p instanceof HTMLElement)
                            if (k.includes(":first") || k.includes(":last")) {
                                const [m,
                                    u
                                ] = k.split(":");
                                p = m ? Array.from(p.querySelectorAll(m)) : Array.from(p.children);
                                p.length && n.push("first" === u ? p[0] : p[p.length - 1])
                            } else if (k.includes(":eq(")) {
                            const [m, u] = k.split(":eq(");
                            var t = parseInt(u);
                            p = m ? Array.from(p.querySelectorAll(m)) : Array.from(p.children);
                            p.length > t && n.push(p[t])
                        } else try {
                            t = p.querySelectorAll(k), n.push(...Array.from(t))
                        } catch (m) {
                            console.warn(`Invalid selector part: ${k}`, m)
                        }
                    });
                    l = n
                }
                return Array.from(new Set(l))
            },
            e = g => "input" === g.tagName.toLowerCase() && "submit" === g.type || "button" ===
            g.tagName.toLowerCase() && (!g.type || "submit" === g.type),
            f = g => {
                if (!(g instanceof HTMLElement)) return !1;
                const l = window.getComputedStyle(g);
                return "none" !== l.display && "hidden" !== l.visibility && 0 < parseFloat(l.opacity) && (0 < g.offsetWidth || 0 < g.offsetHeight)
            };
        if (a instanceof HTMLElement || a instanceof NodeList || a instanceof Object && "length" in a) {
            const g = Array.from(a);
            this.elements.forEach(l => {
                g.forEach(k => {
                    l.contains(k) && c.push(k)
                })
            })
        } else if ("string" === typeof a) {
            var h = ["window", "document", "body", "html"].includes(a.toLowerCase());
            if (":submit" === a) 0 === this.elements.length ? c = Array.from(document.querySelectorAll('input[type="submit"], button:not([type]), button[type="submit"]')).filter(e) : this.elements.forEach(g => {
                g instanceof HTMLElement && (g = Array.from(g.querySelectorAll('input[type="submit"], button:not([type]), button[type="submit"]')), c = c.concat(g.filter(e)))
            });
            else if (":selected" === a || "option:selected" === a) 0 === this.elements.length ? c = Array.from(document.querySelectorAll("option")).filter(g => g.selected) : this.elements.forEach(g => {
                if (g instanceof HTMLElement) {
                    const l = Array.from(g.querySelectorAll("option")).filter(k => k.selected);
                    "select" === g.tagName.toLowerCase() && (g = g.options[g.selectedIndex]) && l.push(g);
                    c = c.concat(l)
                }
            });
            else if (a.includes(":visible")) {
                const g = a.replace(":visible", "").trim();
                0 === this.elements.length ? c = (g ? Array.from(document.querySelectorAll(g)) : getAllElementsOptimized(document)).filter(f) : this.elements.forEach(l => {
                    l instanceof HTMLElement && (l = g ? Array.from(l.querySelectorAll(g)) : getAllElementsOptimized(l),
                        c = c.concat(l.filter(f)))
                })
            } else if (":hidden" === a) 0 === this.elements.length ? c = getAllElementsOptimized(document).filter(g => !f(g)) : this.elements.forEach(g => {
                g instanceof HTMLElement && (c = c.concat(getAllElementsOptimized(g).filter(l => !f(l))))
            });
            else if (a.includes(":first") || a.includes(":last") || a.includes(":eq(")) 0 === this.elements.length ? c = d(a, document) : this.elements.forEach(g => {
                g instanceof HTMLElement && (c = c.concat(d(a, g)))
            });
            else try {
                0 === this.elements.length ? c = h ? [document.querySelector(a)] : Array.from(document.querySelectorAll(a)) :
                    this.elements.forEach(g => {
                        g instanceof HTMLElement && (g = g.querySelectorAll(a), c = c.concat(Array.from(g)))
                    })
            } catch (g) {
                return console.error("Invalid selector:", a), domquery([])
            }
        } else return console.error("Invalid selector type:", typeof a, a), domquery([]);
        c = Array.from(new Set(c.filter(Boolean)));
        h = domquery(c);
        h._prevObject = this;
        h.size = function() {
            return c.length
        };
        h.each = function(g) {
            c.forEach((l, k) => {
                g.call(l, k, l)
            });
            return this
        };
        "function" === typeof b && b.call(h, h);
        return h
    },
    index: function(a) {
        if (0 === arguments.length) return this.elements.length ?
            Array.from(this.elements[0].parentNode.children).indexOf(this.elements[0]) : -1;
        if (a instanceof Node) return this.elements.indexOf(a);
        if (a instanceof DomQuery) return this.elements.indexOf(a.elements[0]);
        if ("string" === typeof a) {
            var b = document.querySelector(a);
            return b ? this.elements.indexOf(b) : -1
        }
        if ("function" === typeof a)
            for (b = 0; b < this.elements.length; b++)
                if (a.call(this.elements[b], b, this.elements[b])) return b;
        return -1
    },
    parent: function(a, b, c) {
        const d = [];
        this.elements.forEach(f => {
            f = f.parentNode;
            !f || a &&
                !f.matches(a) || d.push(f)
        });
        let e = domquery([...(new Set(d))]);
        if ("string" === typeof b || "number" === typeof b) "first" === b ? e = e.eq(0) : "last" === b ? e = e.eq(-1) : "all" !== b && "number" === typeof b && (e = e.eq(b));
        "function" === typeof c && c.call(e, e);
        return e
    },
    parents: function(a, b) {
        "function" === typeof a && (b = a, a = null);
        var c = [];
        this.elements.forEach(function(e) {
            for (; e && e.parentNode && 1 === e.parentNode.nodeType;) e = e.parentNode, (!a || "string" === typeof a && e.matches(a)) && c.push(e)
        });
        c = Array.from(new Set(c));
        var d = this.endStack(c);
        "function" === typeof b && b.call(d);
        return d
    },
    closest: function(a) {
        let b = [];
        this.elements.forEach(function(c) {
            for (c = c.nodeType === Node.TEXT_NODE ? c.parentNode : c; c && c !== document;) {
                var d = c;
                if ("function" === typeof a ? a(d) : "string" === typeof a ? d.nodeType === Node.ELEMENT_NODE && d.matches(a) : (Array.isArray(a) || a instanceof DomQuery) && (a instanceof DomQuery ? a.elements : a).includes(d)) {
                    b.push(c);
                    break
                }
                c = c.parentNode
            }
        });
        return domquery(b)
    },
    parentsUntil: function(a, b, c) {
        let d = [];
        "function" === typeof b && (c = b, b = null);
        a instanceof
        DomQuery && (a = a.elements[0]);
        this.elements.forEach(e => {
            for (e = e.parentNode; e && 1 === e.nodeType;) {
                if (a)
                    if ("string" === typeof a && e.matches(a)) break;
                    else if (a instanceof Element && e === a) break;
                if (!b || "string" === typeof b && e.matches(b)) d.push(e), "function" === typeof c && c.call(e, e);
                e = e.parentNode
            }
        });
        d = Array.from(new Set(d));
        return this.endStack(d)
    },
    prev: function(a, b) {
        let c = [];
        "function" === typeof a && (b = a, a = null);
        this.elements.forEach(d => {
            (d = d.previousElementSibling) && (!a || "string" === typeof a && d.matches(a)) && (c.push(d),
                "function" === typeof b && b.call(d, d))
        });
        return this.endStack(c)
    },
    prevAll: function(a, b) {
        let c = [];
        "function" === typeof a && (b = a, a = null);
        this.elements.forEach(d => {
            let e = [];
            for (d = d.previousElementSibling; d;) {
                if (!a || "string" === typeof a && d.matches(a)) e.push(d), "function" === typeof b && b.call(d, d);
                d = d.previousElementSibling
            }
            c = c.concat(e)
        });
        return this.endStack(c)
    },
    uniqueSort: function(a) {
        const b = new Set;
        getAllElementsOptimized(document).forEach(d => {
            this.elements.includes(d) && b.add(d)
        });
        let c = Array.from(b);
        "function" ===
        typeof a ? c.sort((d, e) => {
            d = d.compareDocumentPosition(e);
            return d & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : d & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
        }).sort(a) : c.sort((d, e) => {
            d = d.compareDocumentPosition(e);
            return d & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : d & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
        });
        this.elements = c;
        this.length = this.elements.length;
        for (a = 0; a < this.length; a++) this[a] = this.elements[a];
        return this
    },
    prevUntil: function(a, b) {
        let c = [],
            d;
        d = "function" === typeof a ? a : a instanceof Element ? f => f === a : "string" === typeof a ?
            f => f.matches(a) : () => !1;
        let e;
        e = "function" === typeof b ? b : "string" === typeof b ? f => f.matches(b) : () => !0;
        this.elements.forEach(f => {
            for (f = f.previousElementSibling; f && !d(f);) e(f) && c.push(f), f = f.previousElementSibling
        });
        return this.endStack(c)
    },
    next: function(a, b = 1) {
        return new this.constructor(this.elements.flatMap(c => {
            const d = [];
            c = c.nextElementSibling;
            let e = 0;
            for (; c && e < b;) {
                if (!a || c.matches(a))
                    if (d.push(c), e++, e >= b) break;
                c = c.nextElementSibling
            }
            return d
        }))
    },
    nextAll: function(a, b = Infinity) {
        if ("number" !== typeof b ||
            0 >= b) throw Error("Limit must be a positive number");
        return new this.constructor(this.elements.flatMap(c => {
            const d = [];
            for (c = c.nextElementSibling; c && d.length < b;) a && !c.matches(a) || d.push(c), c = c.nextElementSibling;
            return d
        }))
    },
    nextUntil: function(a, b) {
        let c = [];
        this.elements.forEach(d => {
            for (d = d.nextElementSibling; d && ("string" === typeof a && !d.matches(a) || a instanceof Element && d !== a || a instanceof DomQuery && !a.elements.includes(d));)(!b || "string" === typeof b && d.matches(b)) && c.push(d), d = d.nextElementSibling
        });
        return this.endStack(c)
    },
    eq: function(a, b) {
        0 > a && (a = this.elements.length + a);
        return 0 <= a && a < this.elements.length ? (a = this.endStack([this.elements[a]]), "function" === typeof b && b.call(a), a) : this
    },
    _scrollLR: function(a, b, c, d) {
        function e(n) {
            k || (k = n);
            n -= k;
            var p = n / b;
            p = l + (a - l) * (.5 > p ? 2 * p * p : -1 + (4 - 2 * p) * p);
            h ? window.scrollTo(d ? p : 0, d ? 0 : p) : d ? f[0].scrollLeft = p : f[0].scrollTop = p;
            n < b ? requestAnimationFrame(e) : (h ? window.scrollTo(d ? a : 0, d ? 0 : a) : d ? f[0].scrollLeft = a : f[0].scrollTop = a, "function" === typeof c && c())
        }
        var f = this.elements;
        if (!f || !f[0]) return "function" === typeof c && c(), this;
        var h = 2 === f.length && "BODY" === f[0].nodeName && "HTML" === f[1].nodeName,
            g = h ? d ? window.scrollX : window.scrollY : d ? f[0].scrollLeft : f[0].scrollTop;
        if (void 0 === a) return g;
        if ("first" === a || 0 === a || "0" === a) a = 0;
        else if ("last" === a) a = h ? d ? document.documentElement.scrollWidth - window.innerWidth : document.documentElement.scrollHeight - window.innerHeight : d ? f[0].scrollWidth - f[0].clientWidth : f[0].scrollHeight - f[0].clientHeight;
        else if ("string" === typeof a && (a.startsWith("+=") ||
                a.startsWith("-="))) {
            const n = parseFloat(a.substring(2));
            a = g + (a.startsWith("+=") ? n : -n)
        } else a = Number(a);
        const l = g;
        if (b) {
            var k;
            requestAnimationFrame(e);
            return this
        }
        h ? window.scrollTo(d ? a : 0, d ? 0 : a) : d ? f[0].scrollLeft = a : f[0].scrollTop = a;
        "function" === typeof c && c()
    },
    scrollLeft: function(a, b, c) {
        if (!this.elements || !this.elements[0]) return "function" === typeof c && c(), this;
        const d = this.elements[0];
        return void 0 === a ? d === document || d === window ? window.pageXOffset || document.documentElement.scrollLeft : d.scrollLeft : this._scrollLR(a,
            b, c, !0)
    },
    scroll: function(a) {
        if (!this.elements || !this.elements.length) return this;
        const b = this;
        this.elements.forEach(c => {
            c === document ? window.addEventListener("scroll", d => {
                a.call(window, d, b)
            }) : c instanceof Window ? window.addEventListener("scroll", d => {
                a.call(window, d, b)
            }) : c instanceof Element && c.addEventListener("scroll", d => {
                a.call(c, d, b)
            })
        });
        return this
    },
    scrollTop: function(a, b, c) {
        if (!this.elements || !this.elements[0]) return "function" === typeof c && c(), this;
        const d = this.elements[0];
        return void 0 === a ? d ===
            document || d === window ? window.pageYOffset || document.documentElement.scrollTop : d.scrollTop : this._scrollLR(a, b, c, !1)
    },
    scrollTo: function(a, b, c) {
        return this.elements && this.elements.length ? new Promise(d => {
            const e = this.elements[0],
                f = this,
                h = () => e === window || e === document.documentElement ? window.pageYOffset || document.documentElement.scrollTop : e.scrollTop,
                g = m => {
                    e === window || e === document.documentElement ? window.scrollTo(0, m) : e.scrollTop = m
                },
                l = h();
            let k;
            k = "string" === typeof a ? a.startsWith("+") || a.startsWith("-") ? l + parseInt(a) :
                parseInt(a) : parseInt(a);
            if (isNaN(k)) console.warn("Invalid scroll target value"), d();
            else if (b) {
                var n, p = h(),
                    t = m => {
                        n || (n = m);
                        m -= n;
                        m < b ? (m /= b, g(p + (k - p) * (.5 > m ? 2 * m * m : -1 + (4 - 2 * m) * m)), requestAnimationFrame(t)) : (g(k), "function" === typeof c && c.call(e, f), d())
                    };
                requestAnimationFrame(t)
            } else {
                try {
                    "scrollBehavior" in document.documentElement.style ? e === window || e === document.documentElement ? window.scrollTo({
                        top: k,
                        behavior: "smooth"
                    }) : e.scrollTo({
                        top: k,
                        behavior: "smooth"
                    }) : g(k)
                } catch (m) {
                    g(k)
                }
                "function" === typeof c && c.call(e,
                    f);
                d()
            }
        }) : Promise.resolve()
    },
    mouse_event: function(a, b, c, d = {}) {
        if (1 === arguments.length || void 0 === b && void 0 === c) return this.elements.forEach(e => {
            if (e)
                if ("function" === typeof e[a]) e[a]();
                else try {
                    const f = new Event(a, {
                        bubbles: !0,
                        cancelable: !0
                    });
                    e.dispatchEvent(f)
                } catch (f) {
                    console.warn(`Failed to trigger ${a} event on element`, e, f)
                }
        }), this;
        void 0 !== b && "function" !== typeof b && "string" !== typeof b && console.warn("Warning: scallback should be a function, a string, or undefined");
        "string" === typeof b && "function" !==
            typeof c && console.warn("Warning: callback should be a function when selector is provided");
        d = {
            passive: !1,
            capture: !1,
            ...d
        };
        this._Queue = this._Queue || Promise.resolve();
        this._Queue = this._Queue.then(() => {
            this.elements.forEach(e => {
                var f = ["scroll", "touchstart", "touchmove", "touchend"];
                const h = {
                    passive: void 0 !== d.passive ? d.passive : f.includes(a),
                    capture: !!d.capture,
                    once: !!d.once,
                    ...d
                };
                f = (g, l = !1) => {
                    e._eventHandlers || (e._eventHandlers = {});
                    e._eventHandlers[a] || (e._eventHandlers[a] = []);
                    const k = n => {
                        try {
                            let p = [n];
                            n.detail && Array.isArray(n.detail) ? p = p.concat(n.detail) : null !== n.detail && void 0 !== n.detail && p.push(n.detail);
                            g.apply(l ? n.target : e, p)
                        } catch (p) {
                            console.error("Error in event handler:", p)
                        }
                    };
                    e._eventHandlers[a].push({
                        wrappedHandler: k,
                        selector: l ? b : void 0,
                        options: h
                    });
                    e.addEventListener(a, k, h)
                };
                if ("function" === typeof b) f(b);
                else if ("string" === typeof b && "function" === typeof c) f(g => {
                    try {
                        const l = g.target.closest(b);
                        if (l && e.contains(l)) {
                            let k = [g];
                            g.detail && Array.isArray(g.detail) ? k = k.concat(g.detail) : null !== g.detail &&
                                void 0 !== g.detail && k.push(g.detail);
                            c.apply(l, k)
                        }
                    } catch (l) {
                        console.error("Error in delegated event handler:", l)
                    }
                }, !0);
                else if (void 0 === b || void 0 === c) {
                    const g = "function" === typeof b ? b : c;
                    "function" === typeof g && f(g)
                } else console.warn("Invalid argument combination. Event listener not added.")
            })
        });
        return this
    },
    off: function(a, b) {
        this._Queue = this._Queue.then(() => {
            this.elements.forEach(c => {
                if (c._eventHandlers)
                    if ("object" === typeof a && void 0 === b)
                        for (var d in a) this.off.call(this, d, a[d]);
                    else if (d = a ? "string" ===
                    typeof a ? a.split(" ") : [a] : null) {
                    let e = d.filter(h => "string" === typeof h && h.startsWith(".")).map(h => h.slice(1)),
                        f = d.filter(h => "string" === typeof h && !h.startsWith("."));
                    Object.keys(c._eventHandlers).forEach(h => {
                        if (0 === f.length || f.includes(h)) c._eventHandlers[h] = c._eventHandlers[h].filter(g => {
                            let l = (0 === e.length || e.includes(g.namespace)) && (!b || g.selector === b || g.originalHandler === b);
                            if (l) {
                                const k = {
                                    passive: ["scroll", "touchstart", "touchmove", "touchend"].includes(h),
                                    capture: !0
                                };
                                c.removeEventListener(h, g.handler,
                                    k)
                            }
                            return !l
                        }), 0 === c._eventHandlers[h].length && delete c._eventHandlers[h]
                    });
                    0 === Object.keys(c._eventHandlers).length && delete c._eventHandlers
                } else Object.keys(c._eventHandlers).forEach(e => {
                    c._eventHandlers[e].forEach(f => {
                        const h = {
                            passive: ["scroll", "touchstart", "touchmove", "touchend"].includes(e),
                            capture: !0
                        };
                        c.removeEventListener(e, f.handler, h)
                    })
                }), delete c._eventHandlers
            })
        });
        return this
    },
    on: function(a, b, c) {
        this._Queue = this._Queue.then(() => {
            this.elements.forEach(d => {
                d._eventHandlers || (d._eventHandlers = {});
                "undefined" === typeof d._eventEnabled && (d._eventEnabled = !0);
                if ("object" === typeof a && void 0 === b)
                    for (let e in a) this.on.call(this, e, a[e]);
                else("string" === typeof a ? a.split(" ") : [a]).forEach(e => {
                    let [f, h] = "string" === typeof e ? e.split(".") : [e, ""];
                    if ("function" === typeof b) e = function(l) {
                        d._eventEnabled && (l = l.detail ? [l].concat(l.detail) : [l], b.apply(this, l))
                    };
                    else if ("string" === typeof b && "function" === typeof c) e = function(l) {
                        if (d._eventEnabled) {
                            let k = l.target;
                            for (; k && k !== d;) {
                                if (k.matches(b)) {
                                    l = l.detail ? [l].concat(l.detail) : [l];
                                    c.apply(k, l);
                                    break
                                }
                                k = k.parentElement
                            }
                        }
                    };
                    else {
                        console.warn("Invalid arguments for on method");
                        return
                    }
                    d._eventHandlers[f] || (d._eventHandlers[f] = []);
                    const g = {
                        passive: ["scroll", "touchstart", "touchmove", "touchend"].includes(f),
                        capture: !0
                    };
                    d._eventHandlers[f].push({
                        namespace: h,
                        handler: e,
                        selector: "string" === typeof b ? b : null,
                        originalHandler: "function" === typeof b ? b : c
                    });
                    d.addEventListener(f, e, g)
                })
            })
        });
        return this
    },
    trigger: function(a, b = {}, c) {
        this._Queue && "function" === typeof this._Queue.then || (this._Queue =
            Promise.resolve());
        "function" === typeof b && (c = b, b = {});
        this._Queue = this._Queue.then(() => new Promise(d => {
            if ("function" === typeof a) a.call(this, this);
            else if ("string" !== typeof a) console.error("eventType must be a string or a function");
            else {
                var e = this.elements,
                    f = {
                        bubbles: !0,
                        cancelable: !0,
                        detail: null
                    };
                if ("string" === typeof b) e = document.querySelectorAll(b);
                else if (Array.isArray(b)) f.detail = b;
                else if ("object" === typeof b && null !== b) f = Object.assign(f, b);
                else if (void 0 !== b && "function" !== typeof b) {
                    console.error("options must be an object, array, or a selector string");
                    d();
                    return
                }
                e.forEach(h => {
                    var g = f;
                    if (a.includes(".")) {
                        const [l, k] = a.split(".");
                        g = new CustomEvent(l, g);
                        g.namespace = k
                    } else g = null !== g.detail ? new CustomEvent(a, g) : new Event(a, g);
                    !1 === h.dispatchEvent(g) && (g.preventDefault(), g.stopPropagation())
                });
                "function" === typeof c && c.call(this, this)
            }
            d()
        }));
        return this
    },
    triggerEvent: function(a, b = {}) {
        this._Queue = this._Queue.then(() => {
            if ("function" === typeof a) return a(this), this;
            if ("string" !== typeof a) return console.error("eventType must be a string or a function"), this;
            let c = this.elements,
                d = {
                    bubbles: !0,
                    cancelable: !0,
                    detail: null
                };
            if ("string" === typeof b) c = document.querySelectorAll(b);
            else if ("object" === typeof b && null !== b) d = Object.assign(d, b);
            else return console.error("options must be an object or a selector string"), this;
            c.forEach(e => {
                var f = d;
                f = null !== f.detail ? new CustomEvent(a, f) : new Event(a, f);
                e.dispatchEvent(f)
            });
            return this
        });
        return this
    },
    bind: function(a, b, c, d) {
        a.split(/\s+/).forEach(e => {
            this.mouse_event(e, b, c, d)
        });
        return this
    },
    unbind: function(a, b, c) {
        a.split(/\s+/).forEach(d => {
            this.elements.forEach(e => {
                e instanceof Element && e._eventHandlers?.[d] && (e._eventHandlers[d] = e._eventHandlers[d].filter(f => {
                        let h = !1;
                        "function" === typeof b ? h = f.handler === b : "string" === typeof b && "function" === typeof c ? h = f.handler.toString().includes(b) && f.handler.toString().includes(c.toString()) : void 0 === b && "function" === typeof c ? h = f.handler === c : b || c || (h = !0);
                        return h ? (e.removeEventListener(d, f.wrappedHandler, f.options), !1) : !0
                    }), 0 === e._eventHandlers[d].length && delete e._eventHandlers[d], 0 === Object.keys(e._eventHandlers).length &&
                    delete e._eventHandlers)
            })
        });
        return this
    },
    blur: function(a, b, c) {
        return this.mouse_event("blur", a, b, c)
    },
    focus: function(a, b, c) {
        return "function" === typeof a || "string" === typeof a && "function" === typeof b ? this.mouse_event("focus", a, b, c) : this
    },
    focusin: function(a, b, c) {
        return this.mouse_event("focusin", a, b, c)
    },
    focusout: function(a, b, c) {
        return this.mouse_event("focusout", a, b, c)
    },
    change: function(a, b, c) {
        return this.mouse_event("change", a, b, c)
    },
    submit: function(a, b, c) {
        return this.mouse_event("submit", a, b, c)
    },
    click: function(a,
        b, c) {
        return this.mouse_event("click", a, b, c)
    },
    dblclick: function(a, b, c) {
        return this.mouse_event("dblclick", a, b, c)
    },
    contextmenu: function(a, b, c) {
        return this.mouse_event("contextmenu", a, b, c)
    },
    keydown: function(a, b, c) {
        return this.mouse_event("keydown", a, b, c)
    },
    keypress: function(a, b, c) {
        return this.mouse_event("keypress", a, b, c)
    },
    keyup: function(a, b, c) {
        return this.mouse_event("keyup", a, b, c)
    },
    input: function(a, b, c) {
        return this.mouse_event("input", a, b, c)
    },
    reset: function(a, b, c) {
        return this.mouse_event("reset", a,
            b, c)
    },
    mousedown: function(a, b, c) {
        return this.mouse_event("mousedown", a, b, c)
    },
    mouseenter: function(a, b, c) {
        return this.mouse_event("mouseenter", a, b, c)
    },
    mouseleave: function(a, b, c) {
        return this.mouse_event("mouseleave", a, b, c)
    },
    mousemove: function(a, b, c) {
        return this.mouse_event("mousemove", a, b, c)
    },
    mouseout: function(a, b, c) {
        return this.mouse_event("mouseout", a, b, c)
    },
    mouseup: function(a, b, c) {
        return this.mouse_event("mouseup", a, b, c)
    },
    mouseover: function(a, b, c) {
        return this.mouse_event("mouseover", a, b, c)
    },
    hover: function(a,
        b, c, d) {
        "function" === typeof a ? (this.mouse_event("mouseenter", a, null, d), this.mouse_event("mouseleave", b || a, null, d)) : (this.mouse_event("mouseenter", a, b, d), this.mouse_event("mouseleave", a, c || b, d));
        return this
    },
    dragstart: function(a, b, c) {
        return this.mouse_event("dragstart", a, b, c)
    },
    drag: function(a, b, c) {
        return this.mouse_event("drag", a, b, c)
    },
    dragend: function(a, b, c) {
        return this.mouse_event("dragend", a, b, c)
    },
    drop: function(a, b, c) {
        return this.mouse_event("drop", a, b, c)
    },
    animationstart: function(a, b, c) {
        return this.mouse_event("animationstart",
            a, b, c)
    },
    animationend: function(a, b, c) {
        return this.mouse_event("animationend", a, b, c)
    },
    animationiteration: function(a, b, c) {
        return this.mouse_event("animationiteration", a, b, c)
    },
    animationcancel: function(a, b, c) {
        return this.mouse_event("animationcancel", a, b, c)
    },
    transitionend: function(a, b, c) {
        return this.mouse_event("transitionend", a, b, c)
    },
    wheel: function(a, b, c) {
        return this.mouse_event("wheel", a, b, c)
    },
    gotpointercapture: function(a, b, c) {
        return this.mouse_event("gotpointercapture", a, b, c)
    },
    lostpointercapture: function(a,
        b, c) {
        return this.mouse_event("lostpointercapture", a, b, c)
    },
    touchstart: function(a, b, c) {
        return this.mouse_event("touchstart", a, b, c)
    },
    touchmove: function(a, b, c) {
        return this.mouse_event("touchmove", a, b, c)
    },
    touchend: function(a, b, c) {
        return this.mouse_event("touchend", a, b, c)
    },
    touchcancel: function(a, b, c) {
        return this.mouse_event("touchcancel", a, b, c)
    },
    pointerdown: function(a, b, c) {
        return this.mouse_event("pointerdown", a, b, c)
    },
    pointermove: function(a, b, c) {
        return this.mouse_event("pointermove", a, b, c)
    },
    pointerup: function(a,
        b, c) {
        return this.mouse_event("pointerup", a, b, c)
    },
    pointercancel: function(a, b, c) {
        return this.mouse_event("pointercancel", a, b, c)
    },
    pointerenter: function(a, b, c) {
        return this.mouse_event("pointerenter", a, b, c)
    },
    pointerleave: function(a, b, c) {
        return this.mouse_event("pointerleave", a, b, c)
    },
    pointerover: function(a, b, c) {
        return this.mouse_event("pointerover", a, b, c)
    },
    pointerout: function(a, b, c) {
        return this.mouse_event("pointerout", a, b, c)
    },
    error: function(a, b, c) {
        return this.mouse_event("error", a, b, c)
    },
    abort: function(a,
        b, c) {
        return this.mouse_event("abort", a, b, c)
    },
    transitionrun: function(a) {
        return this.mouse_event("transitionrun", a)
    },
    transitionstart: function(a) {
        return this.mouse_event("transitionstart", a)
    },
    transitioncancel: function(a) {
        return this.mouse_event("transitioncancel", a)
    },
    play: function(a, b) {
        return this.mouse_event("play", a, b)
    },
    pause: function(a, b) {
        return this.mouse_event("pause", a, b)
    },
    ended: function(a, b) {
        return this.mouse_event("ended", a, b)
    },
    volumechange: function(a, b) {
        return this.mouse_event("volumechange",
            a, b)
    },
    timeupdate: function(a, b) {
        return this.mouse_event("timeupdate", a, b)
    },
    orientationchange: function(a) {
        window.addEventListener("orientationchange", function(b) {
            a(b)
        });
        return this
    },
    devicemotion: function(a) {
        window.addEventListener("devicemotion", function(b) {
            a(b)
        });
        return this
    },
    deviceorientation: function(a) {
        window.addEventListener("deviceorientation", function(b) {
            a(b)
        });
        return this
    },
    beforeunload: function(a) {
        window.addEventListener("beforeunload", function(b) {
            a(b)
        });
        return this
    },
    hashchange: function(a) {
        window.addEventListener("hashchange",
            function(b) {
                a(b)
            });
        return this
    },
    popstate: function(a) {
        window.addEventListener("popstate", function(b) {
            a(b)
        });
        return this
    },
    pagehide: function(a) {
        window.addEventListener("pagehide", function(b) {
            a(b)
        });
        return this
    },
    pageshow: function(a) {
        window.addEventListener("pageshow", function(b) {
            a(b)
        });
        return this
    },
    end: function() {
        return this._prevObject ? this._prevObject : this
    },
    endStack: function(a) {
        a = new DomQuery(a);
        a._prevObject = this;
        return a
    },
    offsetParent: function(a) {
        let b = [];
        this.elements.forEach(d => {
            (d = d.offsetParent) ||
            (d = document.body || document.documentElement);
            b.push(d)
        });
        let c = this.endStack(b);
        "function" === typeof a && a.call(c, c);
        return c
    },
    resize: function(a) {
        this.elements.forEach(b => {
            b instanceof Window ? window.addEventListener("resize", function(c) {
                a.call(window, c)
            }) : console.warn("Skipping non-window element for resize:", b)
        });
        return this
    },
    selectionchange: function(a) {
        document.addEventListener("selectionchange", function(b) {
            a(b)
        });
        return this
    },
    fullscreenchange: function(a) {
        document.addEventListener("fullscreenchange",
            function(b) {
                a(b)
            });
        return this
    },
    readystatechange: function(a) {
        document.addEventListener("readystatechange", function(b) {
            a(b)
        });
        return this
    },
    delegate: function(a, b, c, d) {
        "object" !== typeof b || Array.isArray(b) || (d = c, c = b, b = Object.keys(c));
        Array.isArray(b) || (b = b.split(" "));
        d = d || {};
        this.elements.forEach(e => {
            if (e instanceof Element) {
                var f = function(h) {
                    var g = e.querySelectorAll(a);
                    let l = h.target;
                    for (; l && l !== e;) {
                        if (Array.from(g).includes(l)) {
                            g = {
                                type: h.type.replace(/^focusin$/, "focus").replace(/^focusout$/, "blur"),
                                target: h.target,
                                currentTarget: l,
                                bubbles: h.bubbles,
                                cancelable: h.cancelable,
                                preventDefault: h.preventDefault.bind(h),
                                stopPropagation: h.stopPropagation.bind(h),
                                timeStamp: h.timeStamp,
                                isTrusted: h.isTrusted
                            };
                            for (let k in h) k in g || (g[k] = h[k]);
                            !1 === ("function" === typeof c ? c.call(l, g) : c[g.type].call(l, g)) && (h.preventDefault(), h.stopPropagation());
                            d.once && e.removeEventListener(h.type, f);
                            break
                        }
                        l = l.parentElement
                    }
                };
                b.forEach(h => {
                    const [g, l] = h.split(".");
                    h = "focus" === g ? "focusin" : "blur" === g ? "focusout" : g;
                    e.addEventListener(h,
                        f, d.capture);
                    e.delegatedEvents || (e.delegatedEvents = {});
                    e.delegatedEvents[h] || (e.delegatedEvents[h] = []);
                    e.delegatedEvents[h].push({
                        selector: a,
                        handler: f,
                        originalType: g,
                        namespace: l,
                        options: d,
                        callback: c
                    })
                })
            }
        });
        return this
    },
    undelegate: function(a, b, c) {
        "object" !== typeof b || Array.isArray(b) || (c = b, b = Object.keys(c));
        Array.isArray(b) || (b = b ? b.split(" ") : null);
        this.elements.forEach(d => {
            if (d instanceof Element && d.delegatedEvents) {
                var e = (f, h) => {
                    const g = "focus" === f ? "focusin" : "blur" === f ? "focusout" : f;
                    d.delegatedEvents[g] &&
                        (d.delegatedEvents[g] = d.delegatedEvents[g].filter(l => {
                            const k = (!a || a === l.selector) && (!h || h === l.namespace) && (!c || c === l.callback);
                            k && d.removeEventListener(g, l.handler, l.options.capture);
                            return !k
                        }), 0 === d.delegatedEvents[g].length && delete d.delegatedEvents[g])
                };
                b ? b.forEach(f => {
                    const [h, g] = f.split(".");
                    e(h, g)
                }) : Object.keys(d.delegatedEvents).forEach(f => {
                    e(f)
                });
                0 === Object.keys(d.delegatedEvents).length && delete d.delegatedEvents
            }
        });
        return this
    },
    visibilitychange: function(a) {
        document.addEventListener("visibilitychange",
            function(b) {
                a(b)
            });
        return this
    },
    online: function(a) {
        window.addEventListener("online", function(b) {
            a(b)
        });
        return this
    },
    offline: function(a) {
        window.addEventListener("offline", function(b) {
            a(b)
        });
        return this
    },
    install: function(a) {
        "serviceWorker" in navigator && navigator.serviceWorker.addEventListener("install", function(b) {
            a(b)
        });
        return this
    },
    activate: function(a) {
        "serviceWorker" in navigator && navigator.serviceWorker.addEventListener("activate", function(b) {
            a(b)
        });
        return this
    },
    fetch: function(a) {
        "serviceWorker" in
        navigator && navigator.serviceWorker.addEventListener("fetch", function(b) {
            a(b)
        });
        return this
    },
    sync: function(a) {
        "serviceWorker" in navigator && navigator.serviceWorker.addEventListener("sync", function(b) {
            a(b)
        });
        return this
    },
    push: function(a) {
        "serviceWorker" in navigator && navigator.serviceWorker.addEventListener("push", function(b) {
            a(b)
        });
        return this
    },
    replaceWith: function(a) {
        this.elements.forEach(b => {
            b instanceof Element && (b.outerHTML = a)
        });
        return this
    },
    not: function(a) {
        if (0 === this.length) return this;
        var b = this.elements;
        let c = [];
        try {
            if ("function" === typeof a) c = b.filter((e, f) => a.call(e, f, e));
            else if (a instanceof DomQuery) c = a.elements;
            else if (a instanceof Node) c = [a];
            else if (a instanceof NodeList || Array.isArray(a)) c = Array.from(a);
            else if ("string" === typeof a) {
                if ("" === a.trim()) return this;
                c = ":first" === a ? 0 < b.length ? [b[0]] : [] : ":last" === a ? 0 < b.length ? [b[b.length - 1]] : [] : Array.from(document.querySelectorAll(a))
            } else if (a && "object" === typeof a && "length" in a) c = Array.from(a);
            else return console.warn("Invalid selector provided to not() method"),
                this
        } catch (e) {
            return console.error("Error in not() method:", e), this
        }
        const d = new Set(c);
        b = b.filter(e => !d.has(e));
        return this.endStack(b)
    },
    even: function(a) {
        if (0 === this.length) return console.warn("No elements selected for even() method"), this;
        try {
            const b = this.elements.filter((c, d) => {
                const e = 0 === d % 2;
                return "function" === typeof a ? e && a.call(c, d, c) : e
            });
            return "function" !== typeof a || 0 < b.length ? this.endStack(b) : this
        } catch (b) {
            return console.error("Error in even() method:", b), this
        }
    },
    odd: function(a) {
        if (0 === this.length) return console.warn("No elements selected for odd() method"),
            this;
        try {
            const b = this.elements.filter((c, d) => {
                const e = 0 !== d % 2;
                return "function" === typeof a ? e && a.call(c, d, c) : e
            });
            return "function" !== typeof a || 0 < b.length ? this.endStack(b) : this
        } catch (b) {
            return console.error("Error in odd() method:", b), this
        }
    },
    nth: function(a, b) {
        if (0 === this.length) return console.warn("No elements selected for nth() method"), this;
        if ("number" !== typeof a || 1 > a) return console.error("Invalid argument for nth() method. Expected a positive number."), this;
        try {
            const c = this.elements.filter((d, e) => {
                const f = 0 === (e + 1) % a;
                return "function" === typeof b ? f && b.call(d, e, d) : f
            });
            return "function" !== typeof b || 0 < c.length ? this.endStack(c) : this
        } catch (c) {
            return console.error("Error in nth() method:", c), this
        }
    },
    slice: function(a, b) {
        if (0 === this.length) return console.warn("No elements selected for slice() method"), this;
        try {
            a = null == a ? 0 : parseInt(a, 10);
            b = null == b ? this.length : parseInt(b, 10);
            0 > a && (a = Math.max(0, this.length + a));
            0 > b && (b = Math.max(0, this.length + b));
            if (a > b) return this.endStack([]);
            const c = this.elements.slice(a,
                b);
            return this.endStack(c)
        } catch (c) {
            return console.error("Error in slice() method:", c), this
        }
    },
    toUpperCase: function() {
        function a(b) {
            if ("string" === typeof b) return b.toUpperCase();
            if (Array.isArray(b)) return b.map(a);
            if (b instanceof Node) b.nodeType === Node.TEXT_NODE ? b.nodeValue = b.nodeValue.toUpperCase() : b.childNodes && b.childNodes.forEach(a);
            else if ("object" === typeof b && null !== b) {
                const c = {};
                for (let d in b) b.hasOwnProperty(d) && (c[d] = a(b[d]));
                return c
            }
            return b
        }
        this.elements.forEach(b => {
            b.nodeType === Node.ELEMENT_NODE ?
                a(b) : b.nodeType === Node.TEXT_NODE && (b.nodeValue = b.nodeValue.toUpperCase())
        });
        return this
    },
    has: function(a) {
        if (0 === this.length) return console.warn("No elements selected for has() method"), this;
        try {
            let b;
            if ("string" === typeof a) b = this.elements.filter(c => null !== c.querySelector(a));
            else if (a instanceof Node) b = this.elements.filter(c => c.contains(a));
            else if (a instanceof DomQuery) b = this.elements.filter(c => a.elements.some(d => c.contains(d)));
            else if ("function" === typeof a) b = this.elements.filter((c, d) => a.call(c,
                d, c));
            else return console.warn("Invalid selector provided to has() method"), this;
            return this.endStack(b)
        } catch (b) {
            return console.error("Error in has() method:", b), this
        }
    },
    add: function(a) {
        var b = [];
        "string" === typeof a ? "<" === a.trim().charAt(0) && ">" === a.trim().charAt(a.trim().length - 1) ? (b = document.createElement("template"), b.innerHTML = a.trim(), b = Array.from(b.content.childNodes)) : b = Array.from(document.querySelectorAll(a)) : a instanceof Element ? b = [a] : a instanceof NodeList || a instanceof HTMLCollection ? b = Array.from(a) :
            Array.isArray(a) ? b = a.filter(c => c instanceof Element) : a instanceof DomQuery && (b = a.elements);
        this.elements = [...this.elements, ...b];
        this.length = this.elements.length;
        for (a = 0; a < this.length; a++) this[a] = this.elements[a];
        return this
    },
    addBack: function(a) {
        if (!this._prevObject) return this;
        let b = this.elements.slice();
        void 0 === a ? b = b.concat(this._prevObject.elements) : "string" === typeof a ? b = b.concat(this._prevObject.filter(a).elements) : "function" === typeof a ? b = b.concat(this._prevObject.filter((c, d) => a.call(c, d, c)).elements) :
            a instanceof Node || a instanceof NodeList || Array.isArray(a) ? b = b.concat(Array.from(a)) : a instanceof DomQuery && (b = b.concat(a.elements));
        return this.endStack(b)
    },
    andSelf: function() {
        return this.addBack()
    },
    siblings: function(a) {
        const b = new Set;
        this.elements.forEach(d => {
            d.parentNode && Array.from(d.parentNode.children).forEach(e => {
                e !== d && b.add(e)
            })
        });
        let c = Array.from(b);
        "string" === typeof a ? c = c.filter(d => d.matches(a)) : "function" === typeof a && (c = c.filter(a));
        return this.endStack(c)
    },
    file: function(a) {
        "function" ===
        typeof a ? this.elements.forEach(b => {
            b instanceof Element && "file" === b.type && b.addEventListener("change", function(c) {
                a.call(b, c.target.files)
            })
        }) : this.elements.forEach(b => {
            b instanceof Element && "file" === b.type && (b.value = "")
        });
        return this
    },
    WHclen: function(a, b = !1) {
        var c = this.elements[0];
        b = c.cloneNode(b);
        var d = "width" === a ? b.offsetWidth : b.offsetHeight;
        c && c.style && "none" === c.style.display && (b.style.position = "absolute", b.style.visibility = "hidden", b.style.display = "block", document.body.appendChild(b), d = "width" ===
            a ? b.offsetWidth : b.offsetHeight, document.body.removeChild(b));
        return d
    },
    getDimension: function(a, b) {
        if (0 !== this.elements.length) {
            var c = this.elements[0];
            if (b) {
                if (c === document || "document" === c || "body" === c || "html" === c) return "width" === a ? document.documentElement.offsetWidth : document.documentElement.offsetHeight;
                if (c === window || "window" === c) return "width" === a ? window.innerWidth : window.innerHeight;
                b = "width" === a ? c.offsetWidth : c.offsetHeight;
                c && c.style && "none" === c.style.display && (b = this.WHclen(a, !0))
            } else {
                if (c ===
                    document || "document" === c || "body" === c || "html" === c) return "width" === a ? document.documentElement.clientWidth : document.documentElement.clientHeight;
                if (c === window || "window" === c) return "width" === a ? window.innerWidth : window.innerHeight;
                b = "width" === a ? c.clientWidth : c.clientHeight;
                c && c.style && "none" === c.style.display && (b = this.WHclen(a, !1))
            }
            return b
        }
    },
    width: function(a) {
        if (void 0 === a) return this.getDimension("width");
        this.elements.forEach(function(b) {
            b.style && (b.style.width = "number" === typeof a ? a + "px" : a)
        });
        return this
    },
    height: function(a) {
        if (void 0 === a) return this.getDimension("height");
        this.elements.forEach(function(b) {
            b.style && (b.style.height = "number" === typeof a ? a + "px" : a)
        });
        return this
    },
    innerHeight(a) {
        if (this.elements && 0 !== this.elements.length) {
            if (void 0 === a) {
                a = this.elements[0];
                if (a === window) return window.innerHeight;
                if (a === document) return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight);
                if (!(a instanceof Element)) throw new TypeError("\uc720\ud6a8\ud55c DOM \uc694\uc18c\uac00 \uc544\ub2d9\ub2c8\ub2e4.");
                if (a instanceof SVGElement && "getBBox" in a) return a.getBBox().height;
                var b = window.getComputedStyle(a);
                a = parseFloat(b.height);
                const d = parseFloat(b.paddingTop);
                b = parseFloat(b.paddingBottom);
                return a + d + b
            }
            var c = parseFloat(a);
            if (isNaN(c)) return console.warn("\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \ub192\uc774 \uac12\uc785\ub2c8\ub2e4."), this;
            this.elements.forEach(d => {
                if (d instanceof Element) {
                    var e =
                        window.getComputedStyle(d);
                    const f = parseFloat(e.paddingTop);
                    e = parseFloat(e.paddingBottom);
                    d.style.height = `${Math.max(0,c-f-e)}px`
                }
            });
            return this
        }
        console.warn("\ub0b4\ubd80 \ub192\uc774\ub97c \uacc4\uc0b0\ud558\uac70\ub098 \uc124\uc815\ud560 \uc694\uc18c\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.")
    },
    innerWidth(a) {
        if (this.elements && 0 !== this.elements.length) {
            if (void 0 === a) {
                a = this.elements[0];
                if (a === window) return window.innerWidth;
                if (a === document) return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth,
                    document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);
                if (!(a instanceof Element)) throw new TypeError("\uc720\ud6a8\ud55c DOM \uc694\uc18c\uac00 \uc544\ub2d9\ub2c8\ub2e4.");
                if (a instanceof SVGElement && "getBBox" in a) return a.getBBox().width;
                var b = window.getComputedStyle(a);
                a = parseFloat(b.width);
                const d = parseFloat(b.paddingLeft);
                b = parseFloat(b.paddingRight);
                return a + d + b
            }
            var c = parseFloat(a);
            if (isNaN(c)) return console.warn("\uc720\ud6a8\ud558\uc9c0 \uc54a\uc740 \ub108\ube44 \uac12\uc785\ub2c8\ub2e4."),
                this;
            this.elements.forEach(d => {
                if (d instanceof Element) {
                    var e = window.getComputedStyle(d);
                    const f = parseFloat(e.paddingLeft);
                    e = parseFloat(e.paddingRight);
                    d.style.width = `${Math.max(0,c-f-e)}px`
                }
            });
            return this
        }
        console.warn("\ub0b4\ubd80 \ub108\ube44\ub97c \uacc4\uc0b0\ud558\uac70\ub098 \uc124\uc815\ud560 \uc694\uc18c\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.")
    },
    position: function(a, b = {}) {
        function c(k) {
            k = parseFloat(k.toFixed(4));
            return 0 === k % 1 ? Math.round(k) : k
        }
        b = {
            useRAF: !1,
            considerTransform: !1,
            ...b
        };
        if (!this.elements ||
            !this.elements.length) return "function" === typeof a && a.call(this, this), this;
        var d = this,
            e = new WeakMap,
            f = new WeakMap;
        const h = (k, n) => {
                if (!k || !k.getBoundingClientRect) return {
                    top: 0,
                    left: 0
                };
                if (f.has(k)) return f.get(k);
                n = k.getBoundingClientRect();
                a: if (e.has(k)) var p = e.get(k);
                    else {
                        for (var t = k; t && t !== document.body && t !== document.documentElement;) {
                            p = getComputedStyle(t).overflow;
                            if ("auto" === p || "scroll" === p) {
                                e.set(k, t);
                                p = t;
                                break a
                            }
                            t = t.parentElement
                        }
                        e.set(k, null);
                        p = null
                    } t = p ? p.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft ||
                    0;
                p = p ? p.scrollTop : window.pageYOffset || document.documentElement.scrollTop || 0;
                n = {
                    top: n.top + p,
                    left: n.left + t
                };
                var m = k.offsetParent;
                m && m !== document.body && m !== document.documentElement && (m = m.getBoundingClientRect(), n.top -= m.top + p, n.left -= m.left + t);
                p = getComputedStyle(k);
                t = parseFloat(p.marginTop) || 0;
                p = parseFloat(p.marginLeft) || 0;
                n.top -= t;
                n.left -= p;
                n.top = c(isNaN(n.top) ? 0 : n.top);
                n.left = c(isNaN(n.left) ? 0 : n.left);
                f.set(k, n);
                return n
            },
            g = () => {
                var k = d.elements.map(h);
                k = 1 < k.length ? k : k[0] || {
                    top: 0,
                    left: 0
                };
                document.getElementById("dynamicPositionInfo") &&
                    (document.getElementById("dynamicPositionInfo").textContent = `Left: ${k.left}, Top: ${k.top}`);
                return k
            },
            l = k => {
                a && "function" === typeof a && a.call(d, k);
                return k
            };
        return "function" === typeof a ? (b.useRAF ? requestAnimationFrame(() => {
            const k = g();
            l(k)
        }) : setTimeout(() => {
            const k = g();
            l(k)
        }, 0), d) : g()
    },
    getLastPosition: function() {
        return this.lastPosition || {
            left: 0,
            top: 0
        }
    },
    _outerHeight_outerWidth: function(a, b, c, d) {
        if (!a || 0 === a.length) return 0;
        var e = "outer" + d.charAt(0).toUpperCase() + d.slice(1) + "Cache",
            f = this[e] || (this[e] =
                new WeakMap),
            h = function(g, l) {
                if (1 !== g.nodeType) return 0;
                var k = f.get(g);
                if (k && !l) return k;
                k = window.getComputedStyle(g);
                if (g instanceof SVGElement) var n = "svg" === g.tagName.toLowerCase() ? parseFloat(g.getAttribute(d)) || g.viewBox && g.viewBox.baseVal[d] || parseFloat(k[d]) || 0 : g.getBBox()[d];
                else {
                    var p = k.display;
                    if ("none" === p) {
                        var t = g.style.position;
                        var m = g.style.visibility;
                        var u = g.style.display;
                        g.style.position = "absolute";
                        g.style.visibility = "hidden";
                        g.style.display = "block";
                        k = window.getComputedStyle(g)
                    }
                    n = parseFloat(k[d]) +
                        parseFloat(k["padding" + ("height" === d ? "Top" : "Left")]) + parseFloat(k["padding" + ("height" === d ? "Bottom" : "Right")]) + parseFloat(k["border" + ("height" === d ? "Top" : "Left") + "Width"]) + parseFloat(k["border" + ("height" === d ? "Bottom" : "Right") + "Width"]);
                    "none" === p && (g.style.position = t, g.style.visibility = m, g.style.display = u)
                }
                l && (n += parseFloat(k["margin" + ("height" === d ? "Top" : "Left")]) + parseFloat(k["margin" + ("height" === d ? "Bottom" : "Right")]));
                n = Math.round(n);
                f.set(g, n);
                return n
            };
        if (void 0 === b || "boolean" === typeof b) return c = !0 === b, h(a[0], c);
        b = parseFloat(b);
        a.forEach(function(g) {
            var l = window.getComputedStyle(g);
            h(g, !1);
            var k = b;
            g instanceof SVGElement || (k -= parseFloat(l["padding" + ("height" === d ? "Top" : "Left")]) + parseFloat(l["padding" + ("height" === d ? "Bottom" : "Right")]) + parseFloat(l["border" + ("height" === d ? "Top" : "Left") + "Width"]) + parseFloat(l["border" + ("height" === d ? "Bottom" : "Right") + "Width"]));
            c && (k -= parseFloat(l["margin" + ("height" === d ? "Top" : "Left")]) + parseFloat(l["margin" + ("height" === d ? "Bottom" : "Right")]));
            k = Math.max(0, k);
            if (g instanceof SVGElement) {
                if (g.setAttribute(d, k), "svg" === g.tagName.toLowerCase() && (g.style[d] = k + "px", l = g.getAttribute("viewBox"))) l = l.split(" "), l["width" === d ? 2 : 3] = k, g.setAttribute("viewBox", l.join(" "))
            } else g.style[d] = k + "px";
            f.delete(g)
        });
        return this
    },
    outerHeight: function(a, b) {
        return this._outerHeight_outerWidth.call(this, this.elements, a, b, "height")
    },
    outerWidth: function(a, b) {
        return this._outerHeight_outerWidth.call(this, this.elements, a, b, "width")
    },
    offset: function(a, b = !1, c) {
        if (!this.elements || 0 === this.elements.length) return b ? [] : void 0;
        if (void 0 === a) return c = d => {
            d = d.getBoundingClientRect();
            let e = document.documentElement,
                f = window;
            return {
                top: d.top + f.pageYOffset - e.clientTop,
                left: d.left + f.pageXOffset - e.clientLeft
            }
        }, b ? Array.prototype.map.call(this.elements, c) : c(this.elements[0]);
        this.elements.forEach(d => {
            if (1 === d.nodeType) {
                var e = this.offset.call({
                        elements: [d]
                    }),
                    f = a.top - e.top;
                e = a.left - e.left;
                "static" === window.getComputedStyle(d).position && (d.style.position = "relative");
                d.style.top = `${f}px`;
                d.style.left = `${e}px`
            }
        });
        return this
    },
    reverse: function() {
        return this.each(function(a, b) {
            var c = domquery(b);
            if (a = c.data("animation")) c.stop(), c.start(), c.animate(a.from, a.duration, {
                easing: a.easing,
                complete: function() {
                    c.removeData("animation")
                }
            })
        })
    },
    restoreTableClassesFordomQuery: function(a) {
        try {
            a.querySelectorAll("table").forEach((b, c) => {
                c = b.parentElement;
                if (!c || !c.classList.contains("tea24874")) {
                    c = document.createElement("div");
                    const e = `table-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;
                    c.className = `${e} tea24874`;
                    c.style.position =
                        "relative";
                    b.parentNode.insertBefore(c, b);
                    c.appendChild(b)
                }
                b.getAttribute("data-symbol-type") || b.setAttribute("data-symbol-type", "table-grid");
                b.id && b.id.startsWith("table-") || (b.id = `table-${Date.now()}-${Math.random().toString(36).substr(2,9)}`);
                const d = b.getAttribute("style") || "";
                Object.entries({
                    "border-collapse": "collapse",
                    width: "100%",
                    margin: "10px 0px",
                    "table-layout": "fixed",
                    position: "relative"
                }).forEach(([e, f]) => {
                    d.includes(e) || (b.style[e] = f)
                });
                b.setAttribute("data-border-color", "");
                b.setAttribute("data-border-width",
                    "1");
                b.setAttribute("data-event-initialized", "true");
                b.querySelectorAll("td, th").forEach(e => {
                    const f = e.getAttribute("style") || "";
                    Object.entries({
                        border: "1px solid rgb(0, 0, 0)",
                        padding: "6px",
                        "min-height": "18px",
                        height: "18px"
                    }).forEach(([h, g]) => {
                        f.includes(h) || (e.style[h] = g)
                    });
                    e.innerHTML.trim() || (e.innerHTML = "<div><br></div>")
                })
            })
        } catch (b) {
            console.error("domquery.js \ud14c\uc774\ube14 \ud074\ub798\uc2a4 \ubcf5\uc6d0 \uc911 \uc624\ub958:", b)
        }
    },
    setContent: function(a) {
        const b = this[0];
        if (b && b.webEditorInstance) return b.webEditorInstance.setContent(a);
        if (b) {
            const c = b.querySelector(".editor");
            if (c && c.webEditorInstance && c.webEditorInstance.setContent) return c.webEditorInstance.setContent(a);
            const d = b.querySelector(".editor");
            if (d) return d.innerHTML = a, setTimeout(() => {
                d.querySelectorAll("table").forEach((e, f) => {
                    if ((f = e.parentElement) && f.classList.contains("tea24874")) {
                        var h = `table-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;
                        f.className = `table-${h} tea24874`;
                        f.style.position = "relative"
                    } else f = document.createElement("div"), h = `table-${Date.now()}-${Math.random().toString(36).substr(2,
9)}`, f.className = `table-${h} tea24874`, f.style.position = "relative", e.parentNode.insertBefore(f, e), f.appendChild(e);
                    e.setAttribute("data-symbol-type", "table-grid");
                    e.setAttribute("data-border-color", "");
                    e.setAttribute("data-border-width", "1");
                    e.setAttribute("data-event-initialized", "true");
                    e.id && e.id.startsWith("table-") || (e.id = `table-${Date.now()}-${Math.random().toString(36).substr(2,9)}`)
                })
            }, 100), setTimeout(() => {
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                d.querySelectorAll(".video-wrapper").forEach(e => {
                    const f = e.querySelector("iframe");
                    if (f) {
                        var h = f.style.width.match(/(\d+)%/);
                        if (h) {
                            h = parseInt(h[1]);
                            e.setAttribute("data-scale", h.toString());
                            const g = d.clientWidth * h / 100,
                                l = g / (16 / 9);
                            f.style.width = `${h}%`;
                            f.style.height = `${l}px`;
                            e.style.setProperty("--video-width", `${g}px`);
                            e.style.setProperty("--video-height", `${l}px`)
                        }
                    }
                });
                "function" === typeof setupVideoInteractions && setupVideoInteractions()
            }, 10), !0
        }
        return !1
    },
    getContent: function() {
        var a = this[0];
        if (a &&
            a.webEditorInstance) return a.webEditorInstance.getContent();
        if (a) {
            if ((a = a.querySelector(".editor")) && a.webEditorInstance && a.webEditorInstance.getContent) return a.webEditorInstance.getContent();
            if (!a) return null;
            let b = "";
            (() => {
                const c = contentArea.cloneNode(!0);
                c.innerHTML.includes('<textarea style="box-sizing: border-box') ? b = "" : (c.querySelectorAll("td").forEach(d => {
                    if (d.querySelector(".video-wrapper") || d.querySelector("img") || d.querySelector("iframe")) {
                        const e = (d.getAttribute("style") || "").split(";").filter(f =>
                            -1 === f.indexOf("height")).join(";");
                        d.setAttribute("style", e)
                    }
                }), [".symbol-controls", ".resize-handle", ".resize-handle-mobile", ".size-overlay"].forEach(d => {
                    c.querySelectorAll(d).forEach(e => e.remove())
                }), c.querySelectorAll(".video-wrapper").forEach(d => {
                    for (; d.firstChild;) {
                        const g = d.firstChild;
                        if ("IFRAME" === g.tagName) {
                            var e = g.getAttribute("style") || "",
                                f = e.match(/width:\s([\d.]+[%px])/);
                            e = e.match(/height:\s([\d.]+[%px])/);
                            if (f && e) {
                                f = f[1];
                                f = -1 !== f.indexOf("%") ? f : parseFloat(f) / contentArea.clientWidth * 100 +
                                    "%";
                                var h = f;
                                e = e[1];
                                if (-1 !== h.indexOf("%")) {
                                    h = parseFloat(h);
                                    const l = contentArea.clientWidth;
                                    e = parseFloat(e) / (h / 100 * l) * 100 + "%"
                                }
                                f = f.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                                e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                                g.setAttribute("width", f);
                                g.setAttribute("height", e)
                            }
                            g.removeAttribute("style");
                            g.hasAttribute("src") && ((f = g.getAttribute("src")) && f.toLowerCase().trim().startsWith("javascript:") ?
                                g.removeAttribute("src") : f && f.toLowerCase().trim().startsWith("data:") && !f.toLowerCase().includes("data:image/") && g.removeAttribute("src"));
                            g.setAttribute("sandbox", "allow-same-origin allow-scripts")
                        }
                        d.parentNode.insertBefore(g, d)
                    }
                    d.remove()
                }), c.querySelectorAll(".resizable-image").forEach(d => {
                    const e = d.querySelector("img");
                    if (e) {
                        if (e.hasAttribute("src")) {
                            const f = e.getAttribute("src");
                            f && f.toLowerCase().trim().startsWith("javascript:") ? e.removeAttribute("src") : f && f.toLowerCase().trim().startsWith("data:") &&
                                !f.toLowerCase().includes("data:image/") && e.removeAttribute("src")
                        }
                        d.parentNode.insertBefore(e, d)
                    }
                    d.remove()
                }), c.querySelectorAll('div[class*="table-"][class*="tea24874"]').forEach(d => {
                    var e = d.className.split(" ").filter(f => !f.startsWith("table-") && "tea24874" !== f);
                    0 === e.length ? ((e = d.querySelector("table")) && d.parentNode.insertBefore(e, d), d.remove()) : d.className = e.join(" ").trim()
                }), c.querySelectorAll("table[data-symbol-type]").forEach(d => {
                    d.removeAttribute("data-symbol-type")
                }), c.querySelectorAll("[data-symbol-type]").forEach(d => {
                    d.removeAttribute("data-symbol-type")
                }), c.querySelectorAll('[id^="symbol-"]').forEach(d => {
                    d.removeAttribute("id")
                }), getAllElementsOptimized(c).forEach(d => {
                    Array.from(d.attributes).forEach(e => {
                        e.name.toLowerCase().startsWith("on") && d.removeAttribute(e.name)
                    })
                }), c.querySelectorAll("script").forEach(d => {
                    d.remove()
                }), c.querySelectorAll("object, embed, applet").forEach(d => {
                    d.remove()
                }), b = c.innerHTML, b = b.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<script/gi, "&lt;script").replace(/<\/script/gi,
                    "&lt;/script").replace(/on\w+="[^"]*"/gi, "").replace(/on\w+='[^']*'/gi, "").replace(/on\w+=\w+/gi, "").replace(/javascript:[^\s"']+/gi, "").replace(/<object/gi, "&lt;object").replace(/<embed/gi, "&lt;embed").replace(/<applet/gi, "&lt;applet").replace(/<base/gi, "&lt;base"), b = b.replace(/&#x/gi, "&amp;#x").replace(/&#0/gi, "&amp;#0").replace(/&#/gi, "&amp;#"), b = b.replace(/eval\s*\(/gi, "eval&#40;").replace(/setTimeout\s*\(/gi, "setTimeout&#40;").replace(/setInterval\s*\(/gi, "setInterval&#40;").replace(/Function\s*\(/gi,
                    "Function&#40;").replace(/alert\s*\(/gi, "alert&#40;").replace(/confirm\s*\(/gi, "confirm&#40;").replace(/prompt\s*\(/gi, "prompt&#40;").replace(/document\.cookie/gi, "document&#46;cookie").replace(/document\.domain/gi, "document&#46;domain").replace(/document\.location/gi, "document&#46;location").replace(/document\.write/gi, "document&#46;write").replace(/document\.URL/gi, "document&#46;URL").replace(/window\.location/gi, "window&#46;location").replace(/location\./gi, "location&#46;").replace(/fetch\s*\(/gi,
                    "fetch&#40;"))
            })();
            return b ? b : null
        }
        return null
    },
    executeCommand: function(a, b = null) {
        return this.each(function() {
            this.webEditorInstance && this.webEditorInstance.executeCommand(a, b)
        })
    },
    _dlanguageExtractHelper: function() {
        return {
            extractHTMLContent: function(a) {
                var b = document.createElement("div");
                b.innerHTML = a;
                b = b.querySelectorAll(".domqGLG");
                const c = [],
                    d = /\x3c!--\s*domqGLG(?:_([^\s]+?))?\s*--\x3e/gi;
                let e = [],
                    f;
                for (; null !== (f = d.exec(a));) e.push({
                    index: f.index,
                    fullMatch: f[0],
                    key: f[1] || null,
                    commentStart: f.index,
                    commentEnd: f.index + f[0].length
                });
                e.forEach(h => {
                    var g = h.commentStart;
                    g = a.substring(Math.max(0, g - 500), g);
                    var l = g.lastIndexOf(">");
                    if (g = (0 <= l ? g.substring(l + 1) : g).replace(/<[^>]*>/g, "").trim().replace(/\s+/g, " ").trim()) l = document.createElement("span"), l.className = "domqGLG", l.textContent = g, h.key && l.setAttribute("data-comment-key", h.key.trim()), c.push(l)
                });
                return [...b, ...c]
            },
            extractJSContent: function(a) {
                return a.split("\n").filter(b => /\/\/\s*domqGLG/.test(b))
            },
            processdomqGLGElements: function(a) {
                const b = [];
                a.forEach((c, d) => {
                    const e = f => {
                        var h = "title value placeholder alt aria-label content".split(" ");
                        for (let g of f.attributes) {
                            const l = g.name,
                                k = g.value.trim();
                            h.includes(l) && k && b.push(k)
                        }
                        for (let g of f.childNodes) g.nodeType === Node.TEXT_NODE && (h = g.nodeValue.trim()) && b.push(h);
                        for (let g of f.children) e(g)
                    };
                    e(c)
                });
                return b
            }
        }
    },
    _dlanguageTranslateHelper: function() {
        return {
            replaceStringsInCode: function(a, b) {
                function c(l) {
                    if ("string" !== typeof l) return null;
                    l = l.trim();
                    try {
                        return JSON.parse(l)
                    } catch (k) {
                        try {
                            return JSON.parse("[" +
                                l + "]")
                        } catch (n) {
                            try {
                                return JSON.parse("[" + l + "]")
                            } catch (p) {
                                return null
                            }
                        }
                    }
                }

                function d(l, k) {
                    if (Array.isArray(l)) return l.map(n => d(n, k));
                    if (l && "object" === typeof l) {
                        const n = {};
                        for (const p in l) l.hasOwnProperty(p) && (n[p] = d(l[p], k));
                        return n
                    }
                    return "string" === typeof l ? k : l
                }
                a = a.split("\n");
                let e = 0;
                for (let l = 0; l < a.length; l++) {
                    const k = a[l];
                    if (/\/\/\s*domqGLG/.test(k)) {
                        if (e >= b.length) break;
                        var f = b[e],
                            h = k.match(/^\s*([\[\{].+?[\]\}])\s*,?\s*\/\/\s*domqGLG/);
                        if (h) {
                            h = h[1].trim();
                            var g = c(h);
                            if (null !== g) {
                                f = d(g, f);
                                f = JSON.stringify(f);
                                a[l] = k.replace(h, f);
                                e++;
                                continue
                            }
                        }
                        if (h = k.match(/^\s*"[^"]+":\s*(.+?)\s*,?\s*\/\/\s*domqGLG/))
                            if (h = h[1].trim().replace(/,\s*$/, ""), g = c(h), null !== g) {
                                f = d(g, f);
                                f = JSON.stringify(f);
                                a[l] = k.replace(h, f);
                                e++;
                                continue
                            } if (h = k.match(/=\s*(.+?)\s*[;,]?\s*\/\/\s*domqGLG/))
                            if (h = h[1].trim().replace(/[;,]\s*$/, ""), h.startsWith("[") || h.startsWith("{")) {
                                if (g = c(h), null !== g) {
                                    f = d(g, f);
                                    f = JSON.stringify(f);
                                    a[l] = k.replace(h, f);
                                    e++;
                                    continue
                                }
                            } else {
                                h = h.replace(/^["'`]|["'`]$/g, "");
                                a[l] = k.replace(h, f);
                                e++;
                                continue
                            } h = [...k.matchAll(/(["'`])((?:[^\\]|\\.)*?)\1/g)];
                        for (const n of h)
                            if (h = n[1], n[2].replace(/\\(.)/g, "$1").trim()) {
                                g = f.replace(/\\/g, "\\\\").replace(new RegExp(h, "g"), "\\" + h);
                                a[l] = k.replace(n[0], `${h}${g}${h}`);
                                e++;
                                break
                            } if (h = k.match(/\/\/\s*(.+?)\s*\/\/\s*domqGLG/)) a[l] = k.replace(h[1], f), e++
                    }
                }
                return a.join("\n")
            }
        }
    },
    _extractCreateModal: function(a) {
        a = a || "Multilingual Text Extraction";
        const b = document.createElement("div");
        b.id = "domquery-dlanguage-modal";
        b.style.cssText = "\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n\t\t\t\tbackground: rgba(0, 0, 0, 0.5);\n\t\t\t\tdisplay: none;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\tz-index: 10000;\n\t\t\t";
        const c = document.createElement("div");
        c.style.cssText = "\n\t\t\t\tbackground: white;\n\t\t\t\tpadding: 30px;\n\t\t\t\tborder-radius: 10px;\n\t\t\t\tbox-shadow: 0 4px 20px rgba(0,0,0,0.3);\n\t\t\t\twidth: 100%;\n\t\t\t\tmax-width: 420px;\n\t\t\t\tmin-width: 220px;\n\t\t\t\tmax-height: 80vh;\n\t\t\t\tmargin: 0 20px;\n\t\t\t\toverflow-y: auto;\n\t\t\t";
        var d = document.createElement("style");
        d.textContent = "\n\t\t\t\t#domquery-dlanguage-modal-header {\n\t\t\t\t\toverflow: hidden;\n\t\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\t\twhite-space: nowrap;\n\t\t\t\t}\n\t\t\t";
        document.head.appendChild(d);
        d = document.createElement("div");
        d.style.cssText = "margin-bottom: 20px;";
        var e = document.createElement("h2");
        e.textContent = a;
        e.style.cssText = "margin: 0; color: #333;";
        e.id = "domquery-dlanguage-modal-header";
        d.appendChild(e);
        a = document.createElement("div");
        a.id = "domquery-extraction-items";
        a.style.cssText = "margin-bottom: 20px;";
        e = (() => {
            const h = document.createElement("div");
            h.className = "domquery-extraction-item";
            h.style.cssText = "\n\t\t\t\t\tborder: 1px solid #ddd;\n\t\t\t\t\tborder-radius: 8px;\n\t\t\t\t\tpadding: 2px;\n\t\t\t\t\tbackground:rgb(233, 229, 229);\n\t\t\t\t";
            const g = document.createElement("div");
            g.style.cssText = "display: flex; align-items: center; gap: 3px; flex-wrap: wrap;";
            const l = document.createElement("input");
            l.type = "text";
            l.placeholder = "e.g., test.html or test.js";
            l.style.cssText = "\n\t\t\t\t\tflex: 1;\n\t\t\t\t\tmin-width: 120px;\n\t\t\t\t\tpadding: 8px;\n\t\t\t\t\tborder: 1px solid #ddd;\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\tfont-size: 14px;\n\t\t\t\t";
            const k = document.createElement("button");
            k.textContent = "Extract";
            k.style.cssText = "\n\t\t\t\t\tbackground: #2196F3;\n\t\t\t\t\tcolor: white;\n\t\t\t\t\tborder: none;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\tmargin-left: 5px;\n\t\t\t\t";
            k.className = "domquery-extract-btn";
            g.appendChild(l);
            g.appendChild(k);
            h.appendChild(g);
            k.onclick = () => {
                let n = l.value.trim();
                if (n) {
                    var p = null;
                    p = n.toLowerCase().endsWith(".html") ? "html" : n.toLowerCase().endsWith(".js") ? "js" : (window.location.pathname || "").toLowerCase().endsWith(".js") ? "js" : "html";
                    k.disabled = !0;
                    k.textContent = "Extracting...";
                    window.domquery_extractSingleFile(n, p, function(t, m) {
                        k.disabled = !1;
                        k.textContent = "Extract";
                        t || alert("Extraction failed: " + (m && m.error ? m.error : "Failed to extract file. Please check the file path and try again."))
                    })
                }
            };
            return h
        })();
        a.appendChild(e);
        const f = h => {
            "Escape" === h.key && (document.body.removeChild(b), document.removeEventListener("keydown", f))
        };
        document.addEventListener("keydown", f);
        b.onclick = h => {
            h.target === b && (document.body.removeChild(b), document.removeEventListener("keydown", f))
        };
        c.onclick = h => {
            h.stopPropagation()
        };
        c.appendChild(d);
        c.appendChild(a);
        b.appendChild(c);
        return b
    },
    _extractGenerateHash: function(a) {
        let b = 0;
        if (0 === a.length) return b;
        for (let c = 0; c < a.length; c++) {
            const d = a.charCodeAt(c);
            b = (b << 5) - b + d;
            b &= b
        }
        return Math.abs(b).toString(36)
    },
    _extractGenerateKey: function(a) {
        return DomQuery.prototype._extractGenerateHash.call(this, a)
    },
    _extractGenerateHTMLKey: function(a, b, c) {
        a = DomQuery.prototype._extractGenerateKey.call(this, a);
        return !a || 2 > a.length ? `${c.split("/").pop().replace(".html","").replace(/[^a-zA-Z0-9]/g,"_")}_${b}` : a
    },
    _extractNormalizeText: function(a) {
        return (a || "").replace(/\s+/g, " ").trim()
    },
    _convertQuotesForExtraction: function(a) {
        if (!a || "string" !== typeof a) return a;
        const b = a.trim();
        return b.startsWith("[") &&
            b.endsWith("]") || b.startsWith("{") && b.endsWith("}") ? DomQuery.prototype._convertQuotesInArrayOrObject.call(this, a) : a.replace(/\\\\/g, "<&>").replace(/\\'/g, "<@>").replace(/\\"/g, "<#>")
    },
    _convertQuotesInArrayOrObject: function(a) {
        a = a.replace(/'((?:[^'\\]|\\.)*)'/g, (b, c) => `'${c.replace(/\\\\/g,"<&>").replace(/\\'/g,"<@>").replace(/\\"/g,"<#>")}'`);
        return a = a.replace(/"((?:[^"\\]|\\.)*)"/g, (b, c) => `"${c.replace(/\\\\/g,"<&>").replace(/\\'/g,"<@>").replace(/\\"/g,"<#>")}"`)
    },
    _restoreQuotesForTranslation: function(a) {
        return a &&
            "string" === typeof a ? a.replace(/<@>/g, "\\'").replace(/<#>/g, '\\"').replace(/<&>/g, "\\\\") : a
    },
    _extractTextFromJSLine: function(a) {
        var b = null,
            c = a.match(/domqGLG\s*\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*,\s*['"]([^'"]+)['"]\s*(?:,\s*[^)]+)?\s*\)/);
        c && (b = (c[1] || c[2]).replace(/\\(.)/g, "$1"));
        if (!b && (c = a.match(/\/\/\s*domqGLG(?:_\w+)?\s+(\[[^\]]+\])/))) {
            c = c[1];
            try {
                var d = JSON.parse(c);
                b = Array.isArray(d) && 0 < d.length ? 1 === d.length ? "string" === typeof d[0] ? d[0] : c : d.map(e => "string" === typeof e ? e : JSON.stringify(e)).join(", ") :
                    c
            } catch (e) {
                b = c
            }
        }
        b || (d = a.match(/^\s*([\[\{].+?[\]\}])\s*,?\s*\/\/\s*domqGLG/)) && (b = d[1].trim());
        b || (d = a.match(/^\s*"[^"]+":\s*(.+?)\s*,?\s*\/\/\s*domqGLG/)) && (b = d[1].trim().replace(/,\s*$/, ""));
        b || (d = a.indexOf("// domqGLG"), 0 < d && (d = a.substring(0, d).trim(), c = d.indexOf("="), 0 <= c && (b = d.substring(c + 1).trim(), b = b.replace(/[;,]\s*$/, ""), b = b.startsWith("[") || b.startsWith("{") ? b : b.replace(/^["'`]|["'`]$/g, ""))), b || !(d = a.match(/=\s*(.+?)\s*[;,]?\s*\/\/\s*domqGLG/))) || (b = d[1].trim().replace(/[;,]\s*$/, ""), b =
            b.startsWith("[") || b.startsWith("{") ? b : b.replace(/^["'`]|["'`]$/g, ""));
        b || (d = a.match(/(["'`])((?:[^\\]|\\.)*?)\1/)) && (b = d[2].replace(/\\(.)/g, "$1"));
        b || (d = a.indexOf("// domqGLG"), 0 < d && (d = a.substring(0, d).match(/(["'`])((?:[^\\]|\\.)*?)\1[^"'`]*$/)) && (b = d[2].replace(/\\(.)/g, "$1")));
        b || (a = a.match(/\/\/\s*(.+?)\s*\/\/\s*domqGLG/)) && (b = a[1].trim());
        return b
    },
    _extractProcessHTMLArrayComment: function(a) {
        var b = a.match(/\/\/\s*domqGLG\s+\[([^\]]+)\]/);
        if (!b) return null;
        b = b[1].split(",").map(d => d.trim().replace(/^['"]|['"]$/g,
            ""));
        let c = 1 === b.length ? b[0] : b.join(", ");
        1 === b.length && (a = a.substring(0, a.indexOf("// domqGLG")).match(/['"]([^'"]+)['"]/)) && a[1] === b[0] && (c = a[1]);
        return c
    },
    _extractProcessJSLine: function(a, b, c, d, e, f = null) {
        var h = a.match(/domqGLG\s*\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*,\s*['"]([^'"]+)['"]\s*(?:,\s*[^)]+)?\s*\)/);
        if (h) return a = h[1] || h[2], b = h[3], a = a.replace(/\\(.)/g, "$1"), b = `Gong_${b}`, c[b] = DomQuery.prototype._convertQuotesForExtraction.call(this, a), b;
        if (!a.includes("// domqGLG")) return null;
        f || (h = a.match(/\/\/\s*domqGLG_(\w+)/)) && (f = h[1]);
        (h = DomQuery.prototype._extractTextFromJSLine.call(this, a)) || (h = DomQuery.prototype._extractProcessHTMLArrayComment.call(this, a));
        if (!h) return null;
        a = f ? `Gong_${f}` : DomQuery.prototype._extractGenerateAndRegisterKey.call(this, h, b, c, d, "Gong_", e);
        c[a] = DomQuery.prototype._convertQuotesForExtraction.call(this, h);
        return a
    },
    _extractGenerateAndRegisterKey: function(a, b, c, d, e, f) {
        e = e || "Gong_";
        if (f = b.get(a)) return f;
        f = DomQuery.prototype._extractGenerateKey.call(this,
            a);
        f = e = `${e}${f}`;
        c.hasOwnProperty(e) ? (d[e] = (d[e] || 0) + 1, f = `${e}_${d[e]}`) : d[e] = 0;
        b.set(a, f);
        return f
    },
    _extractAnalyzeDynamicElements: function(a, b, c, d, e, f) {
        const h = this,
            g = [];
        a = a.split("\n");
        const l = new Map;
        for (let p = 0; p < a.length; p++) {
            var k = a[p].trim(),
                n = k.match(/(\w+)\s*=\s*document\.createElement\(['"](button|img|a)['"]\)/i);
            if (n) k = n[1], n = n[2].toUpperCase(), l.has(k) || l.set(k, {
                varName: k,
                tagName: n,
                attributes: {},
                textContent: null,
                hasDomqGLG: !1
            });
            else
                for (const [t, m] of l.entries())
                    if (k.includes(t))
                        if (k.includes(`${t}.className`) &&
                            k.includes("domqGLG")) m.hasDomqGLG = !0;
                        else if (k.includes(`${t}.classList.add`) && k.includes("domqGLG")) m.hasDomqGLG = !0;
            else if (k.includes(`${t}.setAttribute('class'`) && k.includes("domqGLG")) m.hasDomqGLG = !0;
            else {
                if (k.includes(`${t}.setAttribute`) && k.includes("// domqGLG") && (n = k.match(/\/\/\s*domqGLG\s+\[['"]([^'"]+)['"]\]/))) {
                    m.hasDomqGLG = !0;
                    const u = k.match(/\.setAttribute\(['"](value|title|aria-label|alt)['"]/);
                    u && (m.attributes[u[1]] = n[1]);
                    continue
                }
                if (k.includes(`${t}.textContent`) && k.includes("// domqGLG") &&
                    (n = k.match(/\/\/\s*domqGLG\s+\[['"]([^'"]+)['"]\]/))) {
                    m.hasDomqGLG = !0;
                    m.textContent = n[1];
                    continue
                }
                k.includes("appendChild") && k.includes(t) && m.hasDomqGLG && (0 < Object.keys(m.attributes).length || m.textContent) && (g.push({
                    ...m
                }), l.delete(t))
            }
        }
        for (const p of l.values()) p.hasDomqGLG && (0 < Object.keys(p.attributes).length || p.textContent) && g.push({
            ...p
        });
        g.forEach(p => {
            var t = [];
            "BUTTON" === p.tagName ? (p.textContent && t.push(`text:${p.textContent}`), p.attributes.value && t.push(`value:${p.attributes.value}`), p.attributes.title &&
                t.push(`title:${p.attributes.title}`), p.attributes["aria-label"] && t.push(`aria-label:${p.attributes["aria-label"]}`)) : "IMG" === p.tagName ? (p.attributes.alt && t.push(`alt:${p.attributes.alt}`), p.attributes.title && t.push(`title:${p.attributes.title}`), p.attributes["aria-label"] && t.push(`aria-label:${p.attributes["aria-label"]}`)) : "A" === p.tagName && (p.textContent && t.push(`text:${p.textContent}`), p.attributes.title && t.push(`title:${p.attributes.title}`), p.attributes["aria-label"] && t.push(`aria-label:${p.attributes["aria-label"]}`));
            if (0 < t.length) {
                t = t.join(", ");
                p = DomQuery.prototype._convertQuotesForExtraction.call(h, t);
                let m = t = `Yoon_${DomQuery.prototype._extractGenerateHTMLKey.call(h,t,e,f)}`;
                c.hasOwnProperty(t) && (d[t] = (d[t] || 0) + 1, m = `${t}_${d[t]}`);
                t = m;
                c[t] = p;
                b.set(p, t);
                e++
            }
        });
        return e
    },
    _extractDownloadJSON: function(a, b, c) {
        var d = JSON.stringify(a, null, 2);
        b = `${b.split("/").pop().replace(`.${c}`,"").replace(/[^a-zA-Z0-9]/g,"_")}.${c}.json`;
        d = new Blob([d], {
            type: "application/json"
        });
        d = URL.createObjectURL(d);
        c = document.createElement("a");
        c.href = d;
        c.download = b;
        c.click();
        URL.revokeObjectURL(d);
        return {
            data: a,
            fileName: b
        }
    },
    _extractProcessHTML: function(a, b, c, d) {
        const e = this,
            f = {},
            h = new Map,
            g = {},
            l = new Map,
            k = [],
            n = (v, x, r, q) => {
                if (l.has(v)) {
                    const w = l.get(v);
                    console.warn(`\u26a0\ufe0f \uc911\ubcf5\ub41c \uace0\uc720\uac12 \ubc1c\uacac: "${v}" (${x})\n` + `   \uc774\uc804 \uc704\uce58: ${c}:${w.lineNumber}\uc904\n` + `   \ud604\uc7ac \uc704\uce58: ${c}:${r}\uc904\n` + `   \ucee8\ud14d\uc2a4\ud2b8: ${q}`);
                    k.push({
                        uniqueValue: v,
                        keyType: x,
                        previousLine: w.lineNumber,
                        currentLine: r,
                        context: q
                    })
                } else l.set(v, {
                    lineNumber: r,
                    context: q
                })
            };
        for (var p = /\x3c!--\s*domqGLG_(\w+)(?:\s+(\[.*?\]))?\s*--\x3e/g, t; null !== (t = p.exec(a));) {
            var m = t[1],
                u = t[2],
                z = `Tae_${m}`,
                B = a.substring(0, t.index).split("\n").length;
            const v = a.substring(Math.max(0, t.index - 50), Math.min(a.length, t.index + 50)).replace(/\n/g, " ");
            n(m, "Tae_", B, v);
            m = [];
            u && (B = u.match(/['"]TAG:([^'"]+)['"]/)) && (m = B[1].split(",").map(x => x.trim().toUpperCase()), u = u.replace(/,?\s*['"]TAG:[^'"]+['"]\s*,?/g, ""), "[]" === u.trim() || "[,]" ===
                u.trim()) && (u = null);
            if (u) u.match(/\[([^\]]+)\]/) && (f[z] = DomQuery.prototype._convertQuotesForExtraction.call(e, u));
            else if (t = a.substring(Math.max(0, t.index - 200), t.index), u = t.match(/\$alert\s*\(\s*['"]([^'"]+)['"]\s*\)$/)) f[z] = DomQuery.prototype._convertQuotesForExtraction.call(e, u[1]);
            else {
                let x = "";
                (u = t.match(/>([^<]+)<\/(\w+)>\s*$/)) ? x = u[1]: (u = t.lastIndexOf(">"), u = 0 <= u ? t.substring(u + 1) : t, x = (t = t.match(/(?:<(\w+)[^>]*>)([^<]*?)(?:<\/\1>)\s*$/)) && t[2] ? t[2] : u);
                0 < m.length && m.forEach(r => {
                    x = x.replace(new RegExp(`<${r}[^>]*>.*?</${r}>`,
                        "gi"), "")
                });
                (m = DomQuery.prototype._extractNormalizeText.call(e, x)) && (f[z] = DomQuery.prototype._convertQuotesForExtraction.call(e, m))
            }
        }
        b = b.querySelectorAll('[class*="domqGLG"]');
        let C = 0;
        b.forEach((v, x) => {
            if (x = Array.from(v.classList).find(q => q.startsWith("domqGLG_"))) {
                x = x.replace("domqGLG_", "");
                v = v.outerHTML;
                var r = a.indexOf(v);
                r = 0 <= r ? a.substring(0, r).split("\n").length : 0;
                v = v.substring(0, 100).replace(/\n/g, " ");
                n(x, "Yoon_", r, v)
            }
        });
        const D = (v, x, r = null) => {
                if (r) return `Yoon_${r}`;
                x = v = `Yoon_${DomQuery.prototype._extractGenerateHTMLKey.call(e,
v,x,c)}`;
                f.hasOwnProperty(v) && (g[v] = (g[v] || 0) + 1, x = `${v}_${g[v]}`);
                return x
            },
            F = (v, x) => {
                v = DomQuery.prototype._convertQuotesForExtraction.call(e, v);
                f[x] = v;
                h.set(v, x)
            },
            G = (v, x = [], r = []) => {
                var q = Array.from(v.classList).find(A => A.startsWith("domqGLG_"));
                q = q ? q.replace("domqGLG_", "") : null;
                if ("SELECT" === v.tagName && (v.classList.contains("domqGLG") || q)) v = Array.from(v.querySelectorAll("option")).map(A => {
                    const I = A.getAttribute("value") || "";
                    A = DomQuery.prototype._extractNormalizeText.call(e, A.textContent);
                    return I ?
                        `${I}:${A}` : A
                }).filter(A => A), 0 < v.length && (v = v.join(", "), q ? F(v, `Yoon_${q}`) : h.get(v) || (q = D(v, C), F(v, q), C++));
                else if ("OPTION" !== v.tagName && !v.closest("select") && !r.includes(v.tagName)) {
                    x = [...x];
                    if (v.classList.contains("domqGLG") || q)
                        if (r = v.getAttribute("data-exclude-tags"))
                            if (r = r.match(/TAG:([^,]+(?:,[^,]+)*)/)) r = r[1].split(",").map(A => A.trim().toUpperCase()), x = [...x, ...r];
                    if (0 === v.children.length)
                        if ("INPUT" !== v.tagName && "TEXTAREA" !== v.tagName || !v.classList.contains("domqGLG") && !q)
                            if ("BUTTON" === v.tagName &&
                                (v.classList.contains("domqGLG") || q)) {
                                x = v.getAttribute("value") || "";
                                r = v.getAttribute("title") || "";
                                var w = v.getAttribute("aria-label") || "";
                                v = DomQuery.prototype._extractNormalizeText.call(e, v.textContent) || "";
                                var y = [];
                                v && y.push(`text:${v}`);
                                x && y.push(`value:${x}`);
                                r && y.push(`title:${r}`);
                                w && y.push(`aria-label:${w}`);
                                0 < y.length && (v = y.join(", "), q ? F(v, `Yoon_${q}`) : (q = D(v, C), F(v, q), C++))
                            } else if ("IMG" === v.tagName && (v.classList.contains("domqGLG") || q)) x = v.getAttribute("alt") || "", r = v.getAttribute("title") ||
                        "", v = v.getAttribute("aria-label") || "", w = [], x && w.push(`alt:${x}`), r && w.push(`title:${r}`), v && w.push(`aria-label:${v}`), 0 < w.length && (v = w.join(", "), q ? F(v, `Yoon_${q}`) : (q = D(v, C), F(v, q), C++));
                    else if ("A" === v.tagName && (v.classList.contains("domqGLG") || q)) x = v.getAttribute("title") || "", r = v.getAttribute("aria-label") || "", v = DomQuery.prototype._extractNormalizeText.call(e, v.textContent) || "", w = [], v && w.push(`text:${v}`), x && w.push(`title:${x}`), r && w.push(`aria-label:${r}`), 0 < w.length && (v = w.join(", "), q ? F(v, `Yoon_${q}`) :
                        (q = D(v, C), F(v, q), C++));
                    else if ("META" === v.tagName && (v.classList.contains("domqGLG") || q)) w = v.getAttribute("content") || "", x = v.getAttribute("name") || "", r = v.getAttribute("property") || "", v = v.getAttribute("http-equiv") || "", y = [], w && (w = DomQuery.prototype._extractNormalizeText.call(e, w)) && (r ? y.push(`property:${r}, content:${w}`) : x ? y.push(`name:${x}, content:${w}`) : v ? y.push(`http-equiv:${v}, content:${w}`) : y.push(`content:${w}`)), 0 < y.length && (v = y.join(", "), q ? F(v, `Yoon_${q}`) : (q = D(v, C), F(v, q), C++));
                    else {
                        if (v =
                            DomQuery.prototype._extractNormalizeText.call(e, v.textContent)) q ? F(v, `Yoon_${q}`) : h.get(v) || (q = D(v, C), F(v, q), C++)
                    } else x = v.getAttribute("placeholder") || "", r = v.getAttribute("value") || "", w = v.getAttribute("title") || "", v = v.getAttribute("aria-label") || "", y = [], x && y.push(`placeholder:${x}`), r && y.push(`value:${r}`), w && y.push(`title:${w}`), v && y.push(`aria-label:${v}`), 0 < y.length && (v = y.join(", "), q ? F(v, `Yoon_${q}`) : (q = D(v, C), F(v, q), C++));
                    else "html" === (v.getAttribute("data-extract-mode") || "text") ? (v = v.innerHTML,
                        x = DomQuery.prototype._extractNormalizeText.call(e, v)) : x = v = DomQuery.prototype._extractNormalizeText.call(e, v.textContent), x && (q ? (q = `Yoon_${q}`, f[q] = DomQuery.prototype._convertQuotesForExtraction.call(e, v.trim()), h.set(x, q)) : h.get(x) || (r = q = `Yoon_${DomQuery.prototype._extractGenerateHTMLKey.call(e,x,C,c)}`, f.hasOwnProperty(q) && (g[q] = (g[q] || 0) + 1, r = `${q}_${g[q]}`), f[r] = DomQuery.prototype._convertQuotesForExtraction.call(e, v.trim()), h.set(x, r), C++))
                }
            };
        b.forEach(v => {
            G(v)
        });
        for (b = /<script[^>]*>([\s\S]*?)<\/script>/gi; null !==
            (p = b.exec(a));) {
            z = p[1];
            C = DomQuery.prototype._extractAnalyzeDynamicElements.call(e, z, h, f, g, C, c);
            z = z.split("\n");
            const v = a.substring(0, p.index).split("\n").length;
            z.forEach((x, r) => {
                var q = x.match(/\/\/\s*domqGLG_(\w+)/);
                let w = null;
                q && (w = q[1], r = v + r, q = x.substring(0, 100).replace(/\n/g, " "), n(w, "Gong_", r, q));
                DomQuery.prototype._extractProcessJSLine.call(e, x, h, f, g, c, w)
            })
        }
        0 < k.length && alert(`\u26a0\ufe0f \uc911\ubcf5\ub41c \uace0\uc720\uac12\uc774 ${k.length}\uac1c \ubc1c\uacac\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\n` +
            "\ucf58\uc194 \ub85c\uadf8\ub97c \ud655\uc778\ud558\uc5ec \uc911\ubcf5 \uc704\uce58\ub97c \ud655\uc778\ud558\uc138\uc694.\n\n" + `\ud30c\uc77c: ${c}`);
        b = DomQuery.prototype._extractDownloadJSON.call(e, f, c, "html");
        d(!0, b)
    },
    _extractProcessJS: function(a, b, c) {
        const d = {},
            e = new Map,
            f = {};
        a = a.split("\n");
        const h = new Map,
            g = [];
        for (let p = 0; p < a.length; p++) {
            const t = a[p];
            var l = p + 1,
                k = t.match(/domqGLG\s*\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*,\s*['"]([^'"]+)['"]\s*(?:,\s*[^)]+)?\s*\)/);
            if (k || /\/\/\s*domqGLG/.test(t))
                if (k) DomQuery.prototype._extractProcessJSLine.call(this,
                    t, e, d, f, b, null);
                else {
                    var n = t.match(/\/\/\s*domqGLG_(\w+)/);
                    k = null;
                    if (n) {
                        k = n[1];
                        const m = t.substring(0, 100).replace(/\n/g, " ");
                        n = k;
                        if (h.has(n)) {
                            const u = h.get(n);
                            console.warn(`\u26a0\ufe0f \uc911\ubcf5\ub41c \uace0\uc720\uac12 \ubc1c\uacac: "${n}" (${"Gong_"})\n` + `   \uc774\uc804 \uc704\uce58: ${b}:${u.lineNumber}\uc904\n` + `   \ud604\uc7ac \uc704\uce58: ${b}:${l}\uc904\n` + `   \ucee8\ud14d\uc2a4\ud2b8: ${m}`);
                            g.push({
                                uniqueValue: n,
                                keyType: "Gong_",
                                previousLine: u.lineNumber,
                                currentLine: l,
                                context: m
                            })
                        } else h.set(n, {
                            lineNumber: l,
                            context: m
                        })
                    }(l = t.match(/\/\/\s*domqGLG_(\w+)\s+(\[[^\]]+\])/)) ? d[`Tae_${l[1]}`] = l[2]: DomQuery.prototype._extractProcessJSLine.call(this, t, e, d, f, b, k)
                }
        }
        0 < g.length && alert(`\u26a0\ufe0f \uc911\ubcf5\ub41c \uace0\uc720\uac12\uc774 ${g.length}\uac1c \ubc1c\uacac\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\n` + "\ucf58\uc194 \ub85c\uadf8\ub97c \ud655\uc778\ud558\uc5ec \uc911\ubcf5 \uc704\uce58\ub97c \ud655\uc778\ud558\uc138\uc694.\n\n" + `\ud30c\uc77c: ${b}`);
        b = DomQuery.prototype._extractDownloadJSON.call(this,
            d, b, "js");
        c(!0, b)
    },
    _extractSingleFile: function(a, b, c) {
        c = c || function(e, f) {};
        const d = this;
        try {
            if ("html" === b) {
                const e = window.location.pathname || window.location.href.split("/").pop() || "",
                    f = e.split("/").pop() || "",
                    h = a.split("/").pop() || a;
                f && (f === h || e.includes(h)) ? DomQuery.prototype._extractProcessHTML.call(d, document.body.innerHTML, document.body, a, c) : fetch(a).then(g => {
                    if (!g.ok) throw Error(`HTTP error! status: ${g.status}`);
                    return g.text()
                }).then(g => {
                    const l = document.createElement("div");
                    l.innerHTML = g;
                    DomQuery.prototype._extractProcessHTML.call(d,
                        g, l, a, c)
                }).catch(g => {
                    c(!1, {
                        error: g.message
                    })
                })
            } else "js" === b && fetch(a).then(e => {
                if (!e.ok) throw Error(`HTTP error! status: ${e.status}`);
                return e.text()
            }).then(e => {
                DomQuery.prototype._extractProcessJS.call(d, e, a, c)
            }).catch(e => {
                c(!1, {
                    error: e.message
                })
            })
        } catch (e) {
            c(!1, {
                error: e.message
            })
        }
    },
    _decryptLoadAESJS: async function() {
        return new Promise(async (a, b) => {
            if ("function" === typeof window.decrypt) a();
            else {
                if (window.AES_LOADING_IN_PROGRESS) {
                    let c = 0;
                    for (; window.AES_LOADING_IN_PROGRESS && 50 > c;) {
                        await new Promise(d =>
                            setTimeout(d, 100));
                        if ("function" === typeof window.decrypt) {
                            a();
                            return
                        }
                        c++
                    }
                    if ("function" === typeof window.decrypt) {
                        a();
                        return
                    }
                }
                b(Error('window.decrypt \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc0ac\uc6a9\uc790 \uc2a4\ud06c\ub9bd\ud2b8\uc5d0\uc11c AES.js\ub97c \uba3c\uc800 \ub85c\ub4dc\ud574\uc8fc\uc138\uc694. \uc608: <script src="../chat/AES.js">\x3c/script>'))
            }
        })
    },
    _decryptDecryptChunk: async function(a, b) {
        try {
            if ("function" === typeof window.decrypt) return await window.decrypt(a,
                b);
            throw Error("window.decrypt \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4");
        } catch (c) {
            throw console.error("\uc9c1\uc811 \ubcf5\ud638\ud654 \uc2e4\ud328:", c), c;
        }
    },
    _decryptDecompressGzip: async function(a) {
        try {
            if ("undefined" !== typeof DecompressionStream) {
                const b = new DecompressionStream("gzip"),
                    c = await (new Blob([a])).stream().pipeThrough(b);
                return await (new Response(c)).arrayBuffer()
            }
            return a
        } catch (b) {
            return console.warn("\uc555\ucd95 \ud574\uc81c \uc2e4\ud328, \uc6d0\ubcf8 \ub370\uc774\ud130 \uc0ac\uc6a9:",
                b), a
        }
    },
    _decryptFetchLicense: async function() {
        try {
            const a = await fetch("Dlicense/license.key");
            return a.ok ? await a.text() : null
        } catch (a) {
            return console.warn("\ub77c\uc774\uc13c\uc2a4 \ud0a4 fetch \uc2e4\ud328:", a), null
        }
    },
    _decryptParseLicense: function(a) {
        return (a = a.match(/-----BEGIN PRIVATE KEY-----\n([\s\S]+)\n-----END PRIVATE KEY-----/)) ? (a = a[1].replace(/\n/g, ""), a = decodeURIComponent(escape(atob(a))), a = JSON.parse(a), a.info || a) : null
    },
    _decryptCalculateSeed: function(a) {
        const b = a.getMonth() + 1,
            c = a.getDate(),
            d = a.getHours(),
            e = a.getMinutes();
        a = a.getSeconds();
        return (17 * (1E6 * b + 1E4 * c + 100 * d + e) + 31 * (100 * (60 * d + e) + a)) % 1E7
    },
    _decryptCalculateOrder: function(a, b) {
        const c = [],
            d = new Set;
        for (let f = 0; f < b; f++) {
            let h;
            var e = 0;
            do
                if (h = ((a + 17 * f) % b + (3 * a + 7 * f + 1) % b * 2) % b, a = (5 * a + 11 * f + 1) % 1E7, e++, 200 < e) {
                    for (e = 0; e < b; e++)
                        if (!d.has(e)) {
                            h = e;
                            break
                        } break
                } while (d.has(h));
            c[f] = h;
            d.add(h)
        }
        return c
    },
    _decryptRestoreKeyParts: function(a, b) {
        const c = Array(5);
        for (let d = 0; d < b.length; d++) c[b[d]] = a[d];
        return c
    },
    _decryptValidateKeyHash: function(a, b) {
        if ("undefined" ===
            typeof secureSHA256) throw Error("secureSHA256 \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc0ac\uc6a9\uc790 \uc2a4\ud06c\ub9bd\ud2b8\uc5d0\uc11c SHA256.js\ub97c \uba3c\uc800 \ub85c\ub4dc\ud574\uc8fc\uc138\uc694.");
        if (secureSHA256(a) !== b) throw Error("\ubcf5\ud638\ud654 \ud0a4 \ud574\uc2dc\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ub77c\uc774\uc13c\uc2a4 \ud0a4\uac00 \ubcc0\uc870\ub418\uc5c8\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uc0c8\ub85c\uc6b4 \ub77c\uc774\uc13c\uc2a4 \ud0a4\ub97c \uc0dd\uc131\ud574\uc8fc\uc138\uc694.");
    },
    _decryptGetDecryptKey: async function() {
        let a = null;
        if (window.decryptKeyForLanguageJS) a = window.decryptKeyForLanguageJS;
        else try {
            const b = await DomQuery.prototype._decryptFetchLicense.call(this);
            if (b) {
                const c = DomQuery.prototype._decryptParseLicense.call(this, b);
                if (c) {
                    const d = DomQuery.prototype._decryptCalculateSeed.call(this, new Date(c.createdAt)),
                        e = DomQuery.prototype._decryptCalculateOrder.call(this, d, 5),
                        f = c.decryptKeyParts;
                    if (!f || 5 !== f.length) throw Error("\ub77c\uc774\uc13c\uc2a4\uc5d0 \ubcf5\ud638\ud654 \ud0a4 \ubd80\ubd84\uc774 \uc62c\ubc14\ub974\uac8c \ud3ec\ud568\ub418\uc5b4 \uc788\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. (5\uac1c \ubd80\ubd84 \ud544\uc694)");
                    a = DomQuery.prototype._decryptRestoreKeyParts.call(this, f, e).join("");
                    if (32 !== a.length) throw Error("\ubcf5\uc6d0\ub41c \ubcf5\ud638\ud654 \ud0a4 \uae38\uc774\uac00 \uc62c\ubc14\ub974\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");
                    c.decryptKeyHash && DomQuery.prototype._decryptValidateKeyHash.call(this, a, c.decryptKeyHash);
                    window.decryptKeyForLanguageJS = a;
                    window._decryptKeyCleanup = !0
                }
            }
        } catch (b) {
            console.warn("\u26a0\ufe0f \ub77c\uc774\uc13c\uc2a4 \ud0a4\uc5d0\uc11c \ubcf5\ud638\ud654 \ud0a4\ub97c \uac00\uc838\uc624\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4:",
                b)
        }
        if (!a) throw Error("\ubcf5\ud638\ud654 \ud0a4\ub97c \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ub77c\uc774\uc13c\uc2a4 \ud0a4\ub97c \ud655\uc778\ud558\uac70\ub098 PHP \uc11c\ubc84\ub97c \uc0ac\uc6a9\ud558\uc138\uc694.");
        return a
    },
    _decryptFetchEncryptedScript: async function(a) {
        a = await fetch(a);
        if (!a.ok) throw Error(`\ud30c\uc77c \ub2e4\uc6b4\ub85c\ub4dc \uc2e4\ud328: ${a.status} ${a.statusText}`);
        return await a.arrayBuffer()
    },
    _decryptParseBinaryHeader: function(a) {
        const b = new DataView(a);
        a = new Uint8Array(a);
        let c = 0;
        var d = a.slice(c, c + 32);
        (new TextDecoder).decode(d).replace(/\0/g, "");
        c += 32;
        d = b.getUint32(c, !0);
        c += 4;
        var e = a.slice(c, c + d);
        (new TextDecoder).decode(e);
        c += d;
        d = Number(b.getBigUint64(c, !0));
        c += 8;
        b.getBigUint64(c, !0);
        c += 8;
        e = b.getUint32(c, !0);
        c += 4;
        const f = b.getUint32(c, !0);
        c += 4;
        const h = [];
        for (let g = 0; g < f; g++) {
            const l = b.getUint32(c, !0);
            h.push(l);
            c += 4
        }
        return {
            offset: c,
            originalSize: d,
            storedChunkSize: e,
            storedTotalChunks: f,
            chunkSizes: h,
            uint8View: a
        }
    },
    _decryptDecryptChunks: async function(a,
        b, c) {
        const d = this,
            e = Array(a.length);
        c = [];
        for (let h = 0; h < a.length; h++) {
            const g = a[h];
            var f = (async () => {
                try {
                    const l = await DomQuery.prototype._decryptDecryptChunk.call(d, g, b);
                    return {
                        index: h,
                        data: l
                    }
                } catch (l) {
                    throw console.error(`\uccad\ud06c ${h+1} AES \ubcf5\ud638\ud654 \uc2e4\ud328:`, l), Error(`\uccad\ud06c ${h+1} \ubcf5\ud638\ud654 \uc2e4\ud328: ${l.message}`);
                }
            })();
            c.push(f)
        }
        for (a = 0; a < c.length; a += 5) f = c.slice(a, a + 5), (await Promise.all(f)).forEach(h => {
            e[h.index] = h.data
        });
        return e
    },
    _decryptCombineChunks: function(a,
        b, c) {
        let d = new Uint8Array(b),
            e = 0;
        for (let f = 0; f < a.length; f++) {
            const h = a[f],
                g = f === a.length - 1 ? b - e : c;
            for (let l = 0; l < g && l < h.length; l++) d[e + l] = h.charCodeAt(l);
            e += g
        }
        return d
    },
    _decryptDecodeText: function(a) {
        a = (new TextDecoder("utf-8")).decode(a);
        try {
            65279 === a.charCodeAt(0) && (a = a.substring(1)), a = a.replace(/\0/g, ""), a = a.trim()
        } catch (b) {}
        return a
    },
    _decryptExecuteScript: async function(a) {
        const b = document.createElement("script");
        b.textContent = a;
        b.textContent = a;
        document.head.appendChild(b);
        a = !1;
        const c = Date.now();
        for (; !a && 3E3 > Date.now() - c;) {
            if ("function" === typeof window.domquery_applyHTMLTranslation && "function" === typeof window.domquery_applyJSTranslation && "function" === typeof window.domquery_extractSingleFile) {
                a = !0;
                break
            }
            await new Promise(d => setTimeout(d, 50))
        }
        a || console.warn("\u26a0\ufe0f language.js \uc804\uc5ed \ud568\uc218 \ub4f1\ub85d \ud655\uc778 \uc2e4\ud328 (\ud0c0\uc784\uc544\uc6c3), \uacc4\uc18d \uc9c4\ud589...");
        return b
    },
    _decryptCleanupKey: function() {
        window._decryptKeyCleanup && window.decryptKeyForLanguageJS &&
            setTimeout(() => {
                try {
                    window.decryptKeyForLanguageJS = null, delete window.decryptKeyForLanguageJS, delete window._decryptKeyCleanup
                } catch (a) {
                    console.warn("\ubcf5\ud638\ud654 \ud0a4 \uc81c\uac70 \uc911 \uc624\ub958:", a)
                }
            }, 1E3)
    },
    _decryptLoadAndRunScript: async function(a, b) {
        let c = null;
        try {
            const e = await DomQuery.prototype._decryptGetDecryptKey.call(this);
            var d = await DomQuery.prototype._decryptFetchEncryptedScript.call(this, a);
            const f = await DomQuery.prototype._decryptDecompressGzip.call(this, d),
                h = DomQuery.prototype._decryptParseBinaryHeader.call(this,
                    f);
            await DomQuery.prototype._decryptLoadAESJS.call(this);
            a = [];
            let g = h.offset;
            for (d = 0; d < h.storedTotalChunks; d++) {
                const p = h.chunkSizes[d],
                    t = h.uint8View.slice(g, g + p);
                g += p;
                const m = (new TextDecoder).decode(t);
                a.push(m)
            }
            const l = await DomQuery.prototype._decryptDecryptChunks.call(this, a, e, h.chunkSizes),
                k = DomQuery.prototype._decryptCombineChunks.call(this, l, h.originalSize, h.storedChunkSize),
                n = DomQuery.prototype._decryptDecodeText.call(this, k);
            c = await DomQuery.prototype._decryptExecuteScript.call(this, n);
            DomQuery.prototype._decryptCleanupKey.call(this);
            c && c.parentNode && c.parentNode.removeChild(c);
            c = null;
            b && b(null)
        } catch (e) {
            console.error("\u274c language.js.zip \ub85c\ub4dc \uc2e4\ud328:", e);
            if (c && c.parentNode) try {
                c.parentNode.removeChild(c)
            } catch (f) {
                console.warn("\u274c \uc2a4\ud06c\ub9bd\ud2b8 \uc694\uc18c \uc81c\uac70 \uc2e4\ud328:", f)
            }
            b && b(e)
        }
    },
    _decryptLoadLanguageJS: function(a) {
        const b = window.DomQueryLanguage;
        b.loaded ? "function" === typeof a && a(null) : b.loading ? "function" === typeof a && b.pendingCallbacks.push(a) :
            (b.loading = !0, "function" === typeof a && b.pendingCallbacks.push(a), DomQuery.prototype._decryptLoadAndRunScript.call(this, "Dlicense/language.js.zip?v=" + (window.languageVersion || "1.0.0"), function(c) {
                c ? (console.error("language.js \ub85c\ub4dc \uc2e4\ud328:", c), b.loading = !1, b.pendingCallbacks.forEach(d => {
                    try {
                        d(c)
                    } catch (e) {
                        console.error("\ucf5c\ubc31 \uc2e4\ud589 \uc911 \uc624\ub958:", e)
                    }
                })) : (b.loaded = !0, b.loading = !1, b.pendingCallbacks.forEach(d => {
                    try {
                        d(null)
                    } catch (e) {
                        console.error("\ucf5c\ubc31 \uc2e4\ud589 \uc911 \uc624\ub958:",
                            e)
                    }
                }));
                b.pendingCallbacks = []
            }))
    },
    insertAdjacentHTML: function(a, b, c) {
        if (!["beforebegin", "afterbegin", "beforeend", "afterend"].includes(a)) return console.error("Invalid position. Use 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."), this;
        this.each(function() {
            this.insertAdjacentHTML(a, b)
        });
        "function" === typeof c && c.call(this);
        return this
    },
    unique: function(a) {
        return Array.isArray(a) ? 0 < a.length && a[0] instanceof Element ? a.filter((b, c, d) => d.findIndex(e => e === b) === c) : [...(new Set(a))] : (console.error("Input must be an array"),
            [])
    },
    trim: function(a, b) {
        return "string" !== typeof a ? a : void 0 === b ? a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") : a.replace(new RegExp(`^[${b.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}]+|[${b.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}]+$`, "g"), "")
    },
    _detectDeviceInfo: function(a) {
        if (DomQuery.prototype._deviceInfoCache && !a) return DomQuery.prototype._deviceInfoCache;
        try {
            a = navigator;
            var b = a.userAgent,
                c = b.toLowerCase(),
                d = window.innerWidth || screen.width || 0,
                e = window.innerHeight || screen.height || 0,
                f = window.devicePixelRatio ||
                1,
                h = 0 < a.maxTouchPoints || "ontouchstart" in window,
                g = (a.vendor || "").toLowerCase(),
                l = "unknown",
                k = !1,
                n = !1,
                p = !1,
                t = !1,
                m = !1;
            /\bCrOS\b/i.test(c) ? (l = "chromeos", m = !0) : /macintosh/i.test(c) ? 500 > d && 1E3 > e || 1E3 > d && 500 > e || (600 > d || 600 > e) && 450 > d ? (l = "ios", k = !0) : h && 1 < a.maxTouchPoints ? (l = "ios", k = !0) : (l = "macos", p = !0) : /iphone|ipod/i.test(c) ? (l = "ios", k = !0) : /ipad/i.test(c) ? (l = "ios", k = !0) : /android/i.test(c) ? (l = "android", n = !0) : /linux/i.test(c) && h && !m ? (l = "android", n = !0) : /windows|win32|win64|wow64/i.test(c) ? (l = "windows", t = !0) :
                /linux|x11/i.test(c) && (l = "linux");
            var u = !1,
                z = null,
                B = null,
                C = {
                    facebook: /\bfb[\w_]*\b|fbav|fb_iab|fbios|fbandroid/i,
                    instagram: /\binstagram\b/i,
                    twitter: /\btwitter\b/i,
                    tiktok: /\btiktok\b|bytedancewebview/i,
                    snapchat: /\bsnapchat\b/i,
                    linkedin: /\blinkedin\b/i,
                    pinterest: /\bpinterest\b/i,
                    reddit: /\breddit\b/i,
                    kakaotalk: /\bkakaotalk\b/i,
                    line: /\bline\b/i,
                    whatsapp: /\bwhatsapp\b/i,
                    telegram: /\btelegram\b/i,
                    wechat: /\bmicromessenger\b/i,
                    naver: /\bnaver\b|naver\(inapp\)/i,
                    daum: /\bdaum\b/i,
                    samsung: /\bsamsungbrowser\b/i,
                    reactnative: /react[\s-]?native/i,
                    flutter: /flutter/i,
                    cordova: /cordova/i,
                    ionic: /ionic/i
                };
            for (let K in C)
                if (C[K].test(c)) {
                    B = K;
                    break
                } if (k) {
                var D = !(!window.webkit || !window.webkit.messageHandlers),
                    F = !!(window.webkit || window.ReactNativeWebView || window.flutter_inappwebview || window.cordova),
                    G = !c.includes("safari/") || c.includes("version/") && !c.includes("mobile/");
                (u = D || F || null !== B || G && !a.standalone && !/crios|fxios|edgios|opios/i.test(c)) && (z = "ios")
            } else if (n) {
                var v = !!(window.Android || window.AndroidBridge || window.ReactNativeWebView ||
                        window.flutter_inappwebview || window.cordova),
                    x = /\bwv\b/i.test(c),
                    r = /version\/[\d.]+.*?chrome/i.test(c) && !/ chrome\/[\d.]+/i.test(c),
                    q = c.includes("chrome/") && x && !/samsungbrowser|opr\/|edg\//i.test(c);
                (u = v || x || r || null !== B || q) && (z = "android")
            }
            D = "desktop";
            if (/smart-?tv|googletv|appletv|roku|tizen|webos|hbbtv/i.test(c)) D = "tv";
            else if (/playstation|xbox|nintendo|wii/i.test(c)) D = "console";
            else if (k)
                if (/macintosh/i.test(c)) {
                    var w = d / f;
                    D = 450 > w || 500 > d && 1E3 > e ? "mobile" : 900 > w || 1E3 > d && 1E3 > e ? "tablet" : "mobile"
                } else /ipad/i.test(c) ||
                    h && 1 < a.maxTouchPoints && /macintosh/i.test(c) ? D = "tablet" : /iphone|ipod/i.test(c) ? D = "mobile" : (w = d / f, 450 > w ? D = "mobile" : 900 > w && (D = "tablet"));
            else if (n) {
                var y = /mobile/i.test(c),
                    A = /tablet/i.test(c);
                w = d / f;
                var I = Math.min(d, e) / f;
                y = !y || A;
                w = 600 <= w || 600 <= I;
                var E = 2.1 > Math.max(d, e) / Math.min(d, e);
                D = A || y && w || w && E && 3 > f ? "tablet" : "mobile"
            } else if (m) D = h ? "tablet" : "desktop";
            else if (/mobile|phone/i.test(c)) D = "mobile";
            else if (h && "desktop" === D) {
                w = d / f;
                var J = Math.sqrt(d * d + e * e) / f;
                if (450 > w || 700 > J) D = "mobile";
                else if (900 > w || 1300 >
                    J) D = "tablet"
            }
            A = "unknown";
            E = "";
            u ? A = "webview" : /edg(?:e|ios|a)\//i.test(c) ? (A = "edge", E = (c.match(/edg(?:e|ios|a)\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /opr\//i.test(c) || /opera/i.test(c) && !/mini/i.test(c) ? (A = "opera", E = (c.match(/(?:opr|opera)\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /samsungbrowser/i.test(c) ? (A = "samsung", E = (c.match(/samsungbrowser\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /chrome|crios|crmo/i.test(c) ? (A = "chrome", E = (c.match(/(?:chrome|crios|crmo)\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /safari/i.test(c) && /apple/i.test(g) ?
                (A = "safari", E = (c.match(/version\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /firefox|fxios/i.test(c) ? (A = "firefox", E = (c.match(/(?:firefox|fxios)\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /trident|msie/i.test(c) && (A = "ie", E = (c.match(/(?:msie |rv:)(\d+(?:\.\d+)?)/i) || [])[1] || "");
            DomQuery.prototype._deviceInfoCache = {
                platform: l,
                deviceType: D,
                browser: A,
                browserVersion: E,
                isIOS: k,
                isAndroid: n,
                isMacOS: p,
                isWindows: t,
                isChromeOS: m,
                isPC: ("windows" === l || "macos" === l || "linux" === l || "chromeos" === l) && "desktop" === D,
                isMobile: "mobile" === D,
                isTablet: "tablet" ===
                    D,
                isDesktop: "desktop" === D,
                isTV: "tv" === D,
                isConsole: "console" === D,
                isWebView: u,
                webViewType: z,
                inAppBrowser: B,
                isSafari: "safari" === A,
                isChrome: "chrome" === A,
                isFirefox: "firefox" === A,
                isEdge: "edge" === A,
                isSamsungBrowser: "samsung" === A,
                userAgent: b,
                screenWidth: d,
                screenHeight: e,
                pixelRatio: f,
                hasTouch: h,
                orientation: d && e ? d > e ? "landscape" : "portrait" : null,
                maxTouchPoints: a.maxTouchPoints || 0,
                isIPad: /ipad/i.test(c) || k && "tablet" === D,
                isIPadOS13Plus: /macintosh/i.test(c) && k,
                isStandalone: !!a.standalone
            };
            return DomQuery.prototype._deviceInfoCache
        } catch (K) {
            return console.error("Device detection error:",
                K), DomQuery.prototype._deviceInfoCache = {
                platform: "unknown",
                deviceType: "desktop",
                browser: "unknown",
                browserVersion: "",
                isIOS: !1,
                isAndroid: !1,
                isMacOS: !1,
                isWindows: !1,
                isChromeOS: !1,
                isPC: !0,
                isMobile: !1,
                isTablet: !1,
                isDesktop: !0,
                isTV: !1,
                isConsole: !1,
                isWebView: !1,
                webViewType: null,
                inAppBrowser: null,
                isSafari: !1,
                isChrome: !1,
                isFirefox: !1,
                isEdge: !1,
                isSamsungBrowser: !1,
                userAgent: navigator && navigator.userAgent || "",
                screenWidth: 0,
                screenHeight: 0,
                pixelRatio: 1,
                hasTouch: !1,
                orientation: null,
                maxTouchPoints: 0,
                isIPad: !1,
                isIPadOS13Plus: !1,
                isStandalone: !1,
                _error: K.message
            }, DomQuery.prototype._deviceInfoCache
        }
    },
    _handlePanelCloseWithTarget: function(a) {
        const b = "gong_tea_yun_" + a.key,
            c = window._domqueryStateManager.histories.get(b);
        var d = "gong_tea_yun_" + a.options.target.replace(/[^a-zA-Z0-9_]/g, "");
        const e = window._domqueryStateManager.histories.get(d);
        if (c && e)
            if (window._domqueryStateManager.closingStates.get(b)) history.forward();
            else {
                var f = e.preventBack;
                e.preventBack = !0;
                window._domqueryStateManager.closingStates.set(b, !0);
                if ("function" ===
                    typeof a.options.onCloseStart) a.options.onCloseStart(c.count);
                var h = !1;
                d = function() {
                    if (!h) {
                        h = !0;
                        c.count = Math.max(0, c.count - 1);
                        var g = window._domqueryStateManager.registrationOrder[window._domqueryStateManager.registrationOrder.length - 1];
                        g && g.key === a.key && window._domqueryStateManager.registrationOrder.pop();
                        0 >= c.count && (c.isActive = !1, window._domqueryStateManager.activeHistories.delete(b));
                        window._domqueryStateManager.closingStates.delete(b);
                        e.preventBack = f;
                        window._domqueryStateManager.doneCallbackTime =
                            Date.now()
                    }
                };
                if ("function" === typeof a.options.onCloseEnd) a.options.onCloseEnd(c.count, d);
                else d()
            }
    },
    _historyOn: function(a, b, c, d, e) {
        let f = "default_history_key",
            h = null;
        var g = null;
        let l = !1,
            k = null;
        "string" === typeof a ? (f = a, h = "function" === typeof b ? b : null, l = "boolean" === typeof c ? c : !1, g = "function" === typeof d ? d : "function" === typeof c ? c : null, k = e && "object" === typeof e ? e : null) : "function" === typeof a ? (h = a, l = "boolean" === typeof b ? b : !1, g = "function" === typeof c ? c : null, k = d && "object" === typeof d ? d : null) : "boolean" === typeof a &&
            (l = a);
        window.popstateHandlerRegistered || (window.addEventListener("popstate", function(n) {
            if (window._domqueryStateManager.isButtonBack) window._domqueryStateManager.isButtonBack = !1;
            else {
                var p = Date.now();
                if (!(window._domqueryStateManager.doneCallbackTime && 100 > p - window._domqueryStateManager.doneCallbackTime || 100 > p - window._domqueryStateManager.lastPopstateTime)) {
                    window._domqueryStateManager.lastPopstateTime = p;
                    if (n.state && n.state.key && (p = window._domqueryStateManager.histories.get(n.state.key)) && (!p.isActive ||
                            p.count < n.state.count)) {
                        p.count = n.state.count;
                        p.isActive = !0;
                        window._domqueryStateManager.activeHistories.add(n.state.key);
                        window._domqueryStateManager.registrationOrder.push({
                            key: n.state.key.replace("gong_tea_yun_", ""),
                            preventBack: n.state.preventBack,
                            options: n.state.hasOptions ? p.options : null,
                            onBackCallback: p.finalOnBackCallback
                        });
                        p.onCallback?.(p.count);
                        return
                    }
                    if (p = window._domqueryStateManager.registrationOrder[window._domqueryStateManager.registrationOrder.length - 1])
                        if (p.options && p.options.target) DomQuery.prototype._handlePanelCloseWithTarget.call({},
                            p);
                        else {
                            var t = "gong_tea_yun_" + p.key,
                                m = window._domqueryStateManager.histories.get(t);
                            if (m && !m.preventBack) {
                                if (m.count = Math.max(0, m.count - 1), window._domqueryStateManager.registrationOrder.pop(), 0 >= m.count && (m.isActive = !1, window._domqueryStateManager.activeHistories.delete(t)), m.callback?.(m.count), m.finalOnBackCallback?.(m.count), p.onBackCallback && p.onBackCallback !== m.finalOnBackCallback) p.onBackCallback(m.count)
                            } else {
                                t = null;
                                for (const [, u] of window._domqueryStateManager.histories)
                                    if (u.isActive && u.preventBack &&
                                        0 < u.count) {
                                        t = u;
                                        break
                                    } if (t) {
                                    t.finalOnBackCallback?.(t.count);
                                    if (p.onBackCallback && p.onBackCallback !== t.finalOnBackCallback) p.onBackCallback(t.count);
                                    (!n.state || n.state && !n.state.isBlocker) && history.forward()
                                }
                            }
                        }
                }
            }
        }), window.popstateHandlerRegistered = !0);
        window._domqueryStateManager || (window._domqueryStateManager = {
            histories: new Map,
            activeHistories: new Set,
            stateIndex: 0,
            registrationOrder: [],
            stats: {
                totalTrueCount: 0,
                totalFalseCount: 0
            },
            preventBackForwardCount: {},
            lastPopstateTime: 0,
            isButtonBack: !1,
            closingStates: new Map,
            pendingPreventBackReset: new Map,
            doneCallbackTime: 0
        });
        f = "gong_tea_yun_" + f.replace(/[^a-zA-Z0-9_]/g, "");
        window._domqueryStateManager.histories.has(f) || window._domqueryStateManager.histories.set(f, {
            count: 0,
            trueCount: 0,
            falseCount: 0,
            callback: h,
            onCallback: h,
            finalOnBackCallback: g,
            isMinusCall: !1,
            isActive: !1,
            lastStateIndex: -1,
            preventBack: l,
            options: k
        });
        a = window._domqueryStateManager.histories.get(f);
        a.callback = h;
        a.onCallback = h;
        a.finalOnBackCallback = g;
        a.isActive = !0;
        a.preventBack = l;
        a.options = k;
        window._domqueryStateManager.activeHistories.add(f);
        window._domqueryStateManager.registrationOrder.push({
            key: f.replace("gong_tea_yun_", ""),
            preventBack: l,
            options: k,
            onBackCallback: g
        });
        window._domqueryStateManager.stateIndex++;
        g = a.count + 1;
        a.count = g;
        a.lastStateIndex = window._domqueryStateManager.stateIndex;
        l ? (a.trueCount++, window._domqueryStateManager.stats.totalTrueCount++) : (a.falseCount++, window._domqueryStateManager.stats.totalFalseCount++);
        try {
            history.pushState({
                key: f,
                count: g,
                stateIndex: window._domqueryStateManager.stateIndex,
                preventBack: l,
                hasOptions: !!k,
                targetKey: k?.target
            }, ""), "function" === typeof h && h(g)
        } catch (n) {
            console.error("History state update failed:", n)
        }
        return g
    },
    _historyOff: function(a, b, c) {
        let d = "default_history_key",
            e = null;
        c = void 0 !== c ? c : 100;
        void 0 !== a && null !== a && ("function" === typeof a ? e = a : d = "function" === typeof a.toString ? a.toString() : "default_history_key");
        "function" === typeof b && (e = b);
        d = "gong_tea_yun_" + d.replace(/[^a-zA-Z0-9_]/g, "");
        a = () => {
            if (!window._domqueryStateManager) return window.history.back(), "function" === typeof e && e(0, 0), 0;
            var f =
                d.replace("gong_tea_yun_", ""),
                h = null,
                g = -1;
            for (var l = window._domqueryStateManager.registrationOrder.length - 1; 0 <= l; l--)
                if (window._domqueryStateManager.registrationOrder[l].key === f) {
                    h = window._domqueryStateManager.registrationOrder[l];
                    g = l;
                    break
                } l = window._domqueryStateManager.registrationOrder[window._domqueryStateManager.registrationOrder.length - 1];
            if (!h) return "function" === typeof e && e(0, 0), 0;
            h = g === window._domqueryStateManager.registrationOrder.length - 1;
            if (!h) window._domqueryStateManager.registrationOrder.splice(g,
                1);
            else if (l && f !== l.key) return "function" === typeof e && e(0, 0), 0;
            window._domqueryStateManager.isButtonBack = !0;
            f = window._domqueryStateManager.histories.get(d);
            if (!f || 0 >= f.count || !f.isActive) {
                window._domqueryStateManager.activeHistories.delete(d);
                f && (f.isActive = !1, f.count = 0);
                var k = 0;
                f = !1;
                for (var [, n] of window._domqueryStateManager.histories) n.isActive && 0 < n.count && (k += n.count, n.preventBack && (f = !0));
                "function" === typeof e && e(0, k);
                0 !== k || f || window.history.go(-1);
                return 0
            }
            n = d.replace("gong_tea_yun_", "");
            if (h)
                for (g =
                    window._domqueryStateManager.registrationOrder.length - 1; 0 <= g; g--)
                    if (window._domqueryStateManager.registrationOrder[g].key === n) {
                        window._domqueryStateManager.registrationOrder.splice(g, 1);
                        break
                    } n = f.count - 1;
            f.count = n;
            f.isMinusCall = !0;
            f.preventBack ? (f.trueCount = Math.max(0, f.trueCount - 1), window._domqueryStateManager.stats.totalTrueCount = Math.max(0, window._domqueryStateManager.stats.totalTrueCount - 1)) : (f.falseCount = Math.max(0, f.falseCount - 1), window._domqueryStateManager.stats.totalFalseCount = Math.max(0,
                window._domqueryStateManager.stats.totalFalseCount - 1));
            if (0 >= n) {
                f.isActive = !1;
                window._domqueryStateManager.activeHistories.delete(d);
                k = 0;
                g = !1;
                h = [];
                for (let [p, t] of window._domqueryStateManager.histories) t.isActive && 0 < t.count && (k += t.count, t.preventBack && (g = !0), h.push({
                    key: p,
                    count: t.count,
                    preventBack: t.preventBack
                }));
                "function" === typeof e && e(n, k);
                f.preventBack ? (h.forEach(p => {
                        history.pushState({
                            key: p.key,
                            count: p.count,
                            preventBack: p.preventBack,
                            restack: !0
                        }, "")
                    }), window.history.go(-(h.length + 1))) : 0 !== k ||
                    g ? window.history.back() : window.history.go(-1)
            } else {
                f = 0;
                for ([, k] of window._domqueryStateManager.histories) k.isActive && 0 < k.count && (f += k.count);
                "function" === typeof e && e(n, f);
                window.history.back()
            }
            return n
        };
        if (0 >= c) return a();
        setTimeout(a, c);
        return -1
    }
};
const $ = function(a, b) {
    return new DomQuery(a, b)
};
var $domquery = $,
    domQuery = DomQuery,
    domquery = DomQuery;
$.trim = DomQuery.prototype.trim;
domQuery.trim = $.trim;
$.fn = DomQuery.prototype;
DomQuery.fn = DomQuery.prototype;
domquery.fn = DomQuery.prototype;
$.param = DomQuery.prototype.param;
$.unique = DomQuery.prototype.unique;
domQuery.unique = $.unique;
$.easing = DomQuery.prototype.easing = {};
$.shadow = DomQuery.prototype.shadow;
$.scaleArr = DomQuery.prototype.scaleArr;
$.aBox = DomQuery.prototype.aBox;
$.anieasing = DomQuery.prototype.anieasing;
$._anieasing = DomQuery.prototype._anieasing;
$.show = DomQuery.prototype.show;
$.hide = DomQuery.prototype.hide;
$.fadeIn = DomQuery.prototype.fadeIn;
$.fadeOut = DomQuery.prototype.fadeOut;
$.fadeTo = DomQuery.prototype.fadeTo;
$.delay = DomQuery.prototype.delay;
$.toggle = DomQuery.prototype.toggle;
$.slideUp = DomQuery.prototype.slideUp;
$.slideDown = DomQuery.prototype.slideDown;
$.fadeToggle = DomQuery.prototype.fadeToggle;
$.slideToggle = DomQuery.prototype.slideToggle;
$._processDuration = DomQuery.prototype._processDuration;
$._isStringSelector = DomQuery.prototype._isStringSelector;
$.fn.on = DomQuery.prototype.on;
$.fn.off = DomQuery.prototype.off;
$.hasData = DomQuery.prototype.hasData;
domQuery.hasData = $.hasData;
$.queue = function(a, b, c) {
    return $(a).queue(b, c)
};
$.dequeue = function(a, b) {
    return $(a).dequeue(b)
};
$.version = "1.0.0";
$.fn.version = $.version;
domquery.version = $.version;
$.fn.reverse = function() {
    this.elements.reverse();
    return this
};
let _$ = window.$;
$.noConflict = function() {
    window.$ === $ && (window.$ = _$);
    return $
};
$.extend = function() {
    let a = arguments[0] || {},
        b = 1,
        c = arguments.length,
        d = !1;
    "boolean" === typeof a && (d = a, a = arguments[b] || {}, b++);
    for ("object" === typeof a || $.isFunction(a) || (a = {}); b < c; b++) {
        let f = arguments[b];
        if (null != f)
            for (let h in f) {
                var e = a[h];
                let g = f[h];
                a !== g && (d && g && ($.isPlainObject(g) || $.isArray(g)) ? (e = e && ($.isPlainObject(e) || $.isArray(e)) ? e : $.isArray(g) ? [] : {}, a[h] = $.extend(d, e, g)) : void 0 !== g && (a[h] = g))
            }
    }
    return a
};
$.fn.extend = function(a) {
    return $.extend($.fn, a)
};
$.isPlainObject = function(a) {
    return "[object Object]" === Object.prototype.toString.call(a)
};
$.isArray = Array.isArray || function(a) {
    return "[object Array]" === Object.prototype.toString.call(a)
};
$.isFunction = function(a) {
    return "function" === typeof a
};
const inArray = function(a, b) {
    return b && Array.isArray(b) ? b.indexOf(a) : -1
};
domquery.inArray = inArray;
$.inArray = inArray;
$.when = function() {
    return Promise.all(Array.from(arguments))
};
$.parseXML = function(a) {
    let b;
    if (!a || "string" !== typeof a) return null;
    try {
        b = (new window.DOMParser).parseFromString(a, "text/xml")
    } catch (c) {
        b = void 0
    }
    if (!b || b.getElementsByTagName("parsererror").length) throw Error("Invalid XML: " + a);
    return b
};
$.Callbacks = function(a) {
    a = "string" === typeof a ? createOptions(a) : {};
    let b = [],
        c, d, e, f, h = function(l) {
            d = a.memory && l;
            c = f || 0;
            for (f = e = 0; void 0 > c && (!1 !== b[c].apply(l[0], l[1]) || !a.stopOnFalse); c++);
        },
        g = {
            add: function() {
                b && (e = b.length, function n(k) {
                    $.each(k, function(p, t) {
                        "function" === typeof t ? a.unique && g.has(t) || b.push(t) : t && t.length && "string" !== typeof t && n(t)
                    })
                }(arguments), d && (f = e, h(d)));
                return this
            }
        };
    return g
};
$.Deferred = function(a) {
    let b = [
            ["resolve", "done", $.Callbacks("once memory"), "resolved"],
            ["reject", "fail", $.Callbacks("once memory"), "rejected"],
            ["notify", "progress", $.Callbacks("memory")]
        ],
        c = "pending",
        d = {
            state: function() {
                return c
            },
            always: function() {
                e.done(arguments).fail(arguments);
                return this
            },
            then: function() {
                let f = arguments;
                return $.Deferred(function(h) {
                    $.each(b, function(g, l) {
                        let k = $.isFunction(f[g]) && f[g];
                        e[l[1]](function() {
                            let n = k && k.apply(this, arguments);
                            if (n && $.isFunction(n.promise)) n.promise().done(h.resolve).fail(h.reject).progress(h.notify);
                            else h[l[0] + "With"](this === d ? h.promise() : this, k ? [n] : arguments)
                        })
                    });
                    f = null
                }).promise()
            },
            promise: function(f) {
                return null != f ? $.extend(f, d) : d
            }
        },
        e = {};
    $.each(b, function(f, h) {
        let g = h[2],
            l = h[3];
        d[h[1]] = g.add;
        l && g.add(function() {
            c = l
        }, b[f ^ 1][2].disable, b[2][2].lock);
        e[h[0]] = function() {
            e[h[0] + "With"](this === e ? d : this, arguments);
            return this
        };
        e[h[0] + "With"] = g.fireWith
    });
    d.promise(e);
    a && a.call(e, e);
    return e
};
$.each = function(a, b, c) {
    if (null == a) return a;
    c = c || a;
    if (void 0 !== a.nodeType || "object" === typeof a && "length" in a) {
        var d = a.length;
        for (let e = 0; e < d && !1 !== b.call(c, e, a[e]); e++);
    } else if ("object" === typeof a)
        for (d in a) {
            if (Object.prototype.hasOwnProperty.call(a, d) && !1 === b.call(c, d, a[d])) break
        } else b.call(c, 0, a);
    return a
};
$.getScript = function(a, b) {
    return new Promise((c, d) => {
        const e = document.createElement("script");
        e.src = a;
        e.async = !0;
        e.onload = e.onreadystatechange = function() {
            this.readyState && "complete" !== this.readyState && "loaded" !== this.readyState || (e.onload = e.onreadystatechange = null, b && "function" === typeof b && b.call(this, e), c(e))
        };
        e.onerror = function() {
            e.onload = e.onreadystatechange = null;
            d(Error(`Failed to load script: ${a}`))
        };
        document.head.appendChild(e)
    })
};
window.domquery_createDlanguageModal = function(a) {
    return DomQuery.prototype._extractCreateModal.call({}, a)
};
window.domquery_extractSingleFile = function(a, b, c) {
    return DomQuery.prototype._extractSingleFile.call({}, a, b, c)
};
$.Dlanguage = function(a, b) {
    if ("undefined" === typeof domquery || !DomQuery.prototype._dlanguageExtractHelper || !DomQuery.prototype._dlanguageTranslateHelper) return console.error("Dlanguage requires domquery.js library for extraction and translation features. Please include domquery.js first."), !1;
    a = null;
    "string" === typeof b ? a = b : b && "object" === typeof b && b.title && (a = b.title);
    b = window.domquery_createDlanguageModal(a);
    document.body.appendChild(b);
    b.style.display = "flex"
};

function waitForLicenseVerification(a, b) {
    b = b || 5E3;
    const c = Date.now();
    let d = 0;
    const e = b / 50,
        f = function() {
            if ("undefined" !== typeof window.licenseVerificationComplete && !0 === window.licenseVerificationComplete) a();
            else {
                if ("function" === typeof window.isTranslationEnabled) {
                    if (window.isTranslationEnabled()) {
                        a();
                        return
                    }
                } else {
                    if ("undefined" !== typeof window.licenseValid && !0 === window.licenseValid) {
                        a();
                        return
                    }
                    if ("undefined" !== typeof window.licenseValid && !1 === window.licenseValid) {
                        a();
                        return
                    }
                }
                d++;
                d >= e || Date.now() -
                    c >= b ? (console.warn("\ub77c\uc774\uc13c\uc2a4 \uac80\uc99d \ub300\uae30 \uc2dc\uac04 \ucd08\uacfc, \uacc4\uc18d \uc9c4\ud589\ud569\ub2c8\ub2e4."), a()) : setTimeout(f, 50)
            }
        };
    f()
}
$.fn.DClanguage = function(a, b, c) {
    if ("function" === typeof b) {
        const d = 3 <= arguments.length ? arguments[2] : void 0,
            e = d && "object" === typeof d && !Array.isArray(d) && "function" !== typeof d ? d : {};
        c = b;
        "function" === typeof window.domquery_applyHTMLTranslation ? waitForLicenseVerification(function() {
            window.domquery_applyHTMLTranslation(a, c, e)
        }) : "function" === typeof window.loadLanguageJS ? window.loadLanguageJS(function(f) {
            f || "function" !== typeof window.domquery_applyHTMLTranslation ? (console.error("domquery_applyHTMLTranslation \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. language.js\uac00 \ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694."),
                c && c(!1)) : waitForLicenseVerification(function() {
                window.domquery_applyHTMLTranslation(a, c, e)
            })
        }) : (console.error("domquery_applyHTMLTranslation \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. language.js\uac00 \ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694."), c && c(!1));
        return this
    }
    if ("string" === typeof a && a.endsWith(".json") && (void 0 === b || null === b)) {
        const d = "object" !== typeof b || Array.isArray(b) || "function" === typeof b ? 3 <= arguments.length && "object" === typeof arguments[2] &&
            !Array.isArray(arguments[2]) && "function" !== typeof arguments[2] ? arguments[2] : {} : b,
            e = c || d.callback || function() {};
        "function" === typeof window.domquery_applyHTMLTranslation ? waitForLicenseVerification(function() {
            window.domquery_applyHTMLTranslation(a, e, d)
        }) : "function" === typeof window.loadLanguageJS ? window.loadLanguageJS(function(f) {
            f || "function" !== typeof window.domquery_applyHTMLTranslation ? (console.error("domquery_applyHTMLTranslation \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. language.js\uac00 \ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694."),
                e && e(!1)) : waitForLicenseVerification(function() {
                window.domquery_applyHTMLTranslation(a, e, d)
            })
        }) : (console.error("domquery_applyHTMLTranslation \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. language.js\uac00 \ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694."), e && e(!1));
        return this
    }
    "function" === typeof window.domquery_applyJSTranslation ? waitForLicenseVerification(function() {
        window.domquery_applyJSTranslation(a, b, c)
    }) : "function" === typeof window.loadLanguageJS ? window.loadLanguageJS(function(d) {
        d ||
            "function" !== typeof window.domquery_applyJSTranslation ? (console.error("domquery_applyJSTranslation \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. language.js\uac00 \ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694."), c && c(!1)) : waitForLicenseVerification(function() {
                window.domquery_applyJSTranslation(a, b, c)
            })
    }) : (console.error("domquery_applyJSTranslation \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. language.js\uac00 \ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694."),
        c && c(!1));
    return this
};
$.DClanguage = function(a, b, c) {
    return $.fn.DClanguage.apply($, arguments)
};
$.isMobile = function(a, b) {
    "function" === typeof a && (b = a, a = {});
    a = a || {};
    try {
        var c = DomQuery.prototype._detectDeviceInfo.call({}, !0 === a.forceRefresh),
            d = c;
        if (!1 === a.includeScreen) {
            d = {};
            for (let f in c) /^(screenWidth|screenHeight|orientation|pixelRatio)$/.test(f) || (d[f] = c[f])
        }!0 === a.minimal && (d = {
            platform: c.platform,
            deviceType: c.deviceType,
            browser: c.browser,
            isWebView: c.isWebView,
            isMobile: c.isMobile,
            isTablet: c.isTablet,
            isDesktop: c.isDesktop
        });
        !0 === a.debug && c._scores && (d._debug = {
            scores: c._scores,
            diagonal: c._diagonal,
            capabilities: c._capabilities
        });
        b && "function" === typeof b && setTimeout(function() {
            b(d)
        }, 0);
        return d
    } catch (f) {
        console.error("$.isMobile error:", f);
        var e = {
            platform: "unknown",
            deviceType: "desktop",
            browser: "unknown",
            isWebView: !1,
            isMobile: !1,
            isTablet: !1,
            isDesktop: !0,
            _error: f.message
        };
        b && "function" === typeof b && setTimeout(function() {
            b(e)
        }, 0);
        return e
    }
};
window.DomQueryLanguage = window.DomQueryLanguage || {
    loaded: !1,
    loading: !1,
    pendingCallbacks: []
};
window.loadLanguageJS = function() {
    return function(a) {
        return DomQuery.prototype._decryptLoadLanguageJS.call({}, a)
    }
}();
$.historyOn = function(a, b, c, d, e) {
    return DomQuery.prototype._historyOn.call({}, a, b, c, d, e)
};
$.historyOff = function(a, b, c) {
    return DomQuery.prototype._historyOff.call({}, a, b, c)
};
$.fn.historyOn = function(a, b, c, d, e) {
    return $.historyOn.call(null, a, b, c, d, e)
};
$.fn.historyOff = function(a, b, c) {
    return $.historyOff.call(null, a, b, c)
};
"undefined" === typeof window.domqGLG && (window.domqGLG = function(a, b) {
    return a
});