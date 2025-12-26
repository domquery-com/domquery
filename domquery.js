function DomQuery(a, b) {
    function c(f) {
        return (f = f.match(/(['"])((?:(?!\1)[^\\]|\\[\s\S])*)\1/)) ? f[2] : null
    }
    if (!(this instanceof DomQuery)) return new DomQuery(a, b);
    this.elements = [];
    this._Queue = Promise.resolve();
    b = b || document;
    b instanceof DomQuery && (b = b[0] || document);
    this.selector = a;
    const d = (f, l) => {
            if (!f || !l) return [];
            f = f.split(" ").filter(h => h.trim());
            l = [l];
            for (let h = 0; h < f.length; h++) {
                const m = f[h].trim();
                if (!m) continue;
                const n = [];
                for (const q of l)
                    if (q)
                        if (m.includes(":")) {
                            const [u, ...v] = m.split(":"), B =
                                v.join(":");
                            let D;
                            try {
                                if (D = u ? Array.from(q.querySelectorAll(u) || []) : Array.from(q.querySelectorAll("*") || []), B.includes("(")) {
                                    const p = B.match(/([^(]+)\((.*)\)/);
                                    if (p) {
                                        const [, t, w] = p, C = w.trim();
                                        if ("eq" === t) {
                                            const r = parseInt(C);
                                            D[r] && n.push(D[r])
                                        } else e[":" + B] && n.push(...D.filter((r, x, y) => r && e[":" + B](r, x, y, C)))
                                    }
                                } else e[":" + B] && n.push(...D.filter((p, t, w) => p && e[":" + B](p, t, w)))
                            } catch (p) {
                                console.warn(`Error processing selector part: ${m}`, p)
                            }
                        } else try {
                            const u = q.querySelectorAll(m);
                            u && u.length && n.push(...u)
                        } catch (u) {
                            console.warn(`Error with selector: ${m}`,
                                u)
                        }
                l = n.filter(Boolean)
            }
            return [...(new Set(l))]
        },
        e = {
            ":button": f => "button" === f.tagName.toLowerCase() || "input" === f.tagName.toLowerCase() && "button" === f.type,
            ":checkbox": f => "input" === f.tagName.toLowerCase() && "checkbox" === f.type,
            ":radio": f => "radio" === f.type,
            ":file": f => "file" === f.type,
            ":image": f => "image" === f.type,
            ":password": f => "password" === f.type,
            ":reset": f => "reset" === f.type,
            ":submit": f => "input" === f.tagName.toLowerCase() && "submit" === f.type || "button" === f.tagName.toLowerCase() && (!f.type || "submit" === f.type),
            ":text": f => "text" === f.type,
            ":header": f => /^h[1-6]$/i.test(f.tagName),
            ":input": f => /^(input|select|textarea|button)$/i.test(f.tagName),
            ":parent": f => 0 < f.childNodes.length,
            ":empty": f => 0 === f.childNodes.length,
            ":enabled": f => !f.disabled && "hidden" !== f.type,
            ":disabled": f => !0 === f.disabled,
            ":checked": f => !0 === f.checked,
            ":selected": f => "option" === f.tagName.toLowerCase() && !0 === f.selected,
            ":first": (f, l) => 0 === l,
            ":last": (f, l, h) => l === h.length - 1,
            ":even": (f, l) => 0 === l % 2,
            ":odd": (f, l) => 0 !== l % 2,
            ":lt": (f, l, h, m) => l < parseInt(m),
            ":gt": (f, l, h, m) => l > parseInt(m),
            ":eq": (f, l, h, m) => {
                f = parseInt(m);
                return l === f
            },
            ":first-child": f => f === f.parentNode.firstElementChild,
            ":last-child": f => f === f.parentNode.lastElementChild,
            ":only-child": f => 1 === f.parentNode.children.length,
            ":nth-child": (f, l, h, m) => {
                l = Array.from(f.parentNode.children);
                m = parseInt(m);
                return l.indexOf(f) === m - 1
            },
            ":not": (f, l, h, m) => !f.matches(m),
            ":nth-of-type": (f, l, h, m) => {
                l = Array.from(f.parentNode.children).filter(n => n.tagName === f.tagName);
                m = parseInt(m);
                return l.indexOf(f) === m - 1
            },
            ":first-of-type": f => f === Array.from(f.parentNode.children).find(l => l.tagName === f.tagName),
            ":prev": f => f.previousElementSibling,
            ":next": f => f.nextElementSibling,
            ":contains": (f, l, h, m) => f.textContent.includes(m),
            ":visible": f => {
                const l = window.getComputedStyle(f);
                return "none" !== l.display && "hidden" !== l.visibility && 0 < parseFloat(l.opacity) && 0 < f.offsetWidth && 0 < f.offsetHeight
            },
            ":hidden": f => {
                const l = window.getComputedStyle(f);
                return "none" === l.display || "hidden" === l.visibility || 0 === parseFloat(l.opacity) || 0 === f.offsetWidth ||
                    0 === f.offsetHeight
            },
            ":has": (f, l, h, m) => null !== f.querySelector(m),
            ":target": f => f.id === location.hash.substring(1),
            ":lang": (f, l, h, m) => f.lang === m,
            ":hover": f => f.matches(":hover"),
            ":is": (f, l, h, m) => f.matches(m),
            ":td": f => "td" === f.tagName.toLowerCase(),
            ":tr": f => "tr" === f.tagName.toLowerCase(),
            ":focus": f => document.activeElement === f,
            ":root": f => f === document.documentElement
        },
        g = f => {
            function l(p) {
                try {
                    const t = document.createElement("template"),
                        w = p.replace(/\${(.+?)}/g, (C, r) => {
                            try {
                                return Function("return " + r)()
                            } catch (x) {
                                return ""
                            }
                        });
                    t.innerHTML = w.trim();
                    return Array.from(t.content.childNodes)
                } catch (t) {
                    return console.warn("Template parsing error:", t), []
                }
            }

            function h(p) {
                var t = p.split(":");
                p = t[0];
                t = t.slice(1);
                p = Array.from(b.querySelectorAll(p));
                for (const w of t)
                    if (t = [], "last" === w) p = p.length ? [p[p.length - 1]] : [];
                    else if ("first" === w) p = p.length ? [p[0]] : [];
                else if (w.startsWith("lt(") || w.startsWith("gt(") || w.startsWith("eq(")) {
                    const [C, r] = w.split("(");
                    t = parseInt(r);
                    "lt" === C ? p = p.slice(0, t) : "gt" === C ? p = p.slice(t + 1) : "eq" === C && (p = p.slice(t, t +
                        1))
                } else if (e[":" + w]) {
                    for (const C of p) t.push(...Array.from(C.querySelectorAll("*")).filter((r, x, y) => e[":" + w](r, x, y)));
                    p = t
                } else if (w.startsWith("contains(")) {
                    t = w.match(/contains\((.*?)\)/)[1];
                    const C = c(t);
                    p = p.filter(r => r.textContent.includes(C))
                } else try {
                    for (const C of p) t.push(...C.querySelectorAll(w));
                    p = t
                } catch (C) {
                    console.warn(`Invalid selector: ${w}`)
                }
                return p
            }

            function m(p) {
                p = p.split("[");
                var t = p[0];
                p = "[" + p.slice(1).join("[");
                const w = /\[([\w-]+)(?:([!~|^$*]?=)(['"'])?([^\]'"]*)\3?)?\]/g;
                let C =
                    t ? Array.from(b.querySelectorAll(t)) : Array.from(b.querySelectorAll("*"));
                const r = [];
                for (; null !== (t = w.exec(p));) {
                    const [, x, y = "", , z = ""] = t;
                    r.push({
                        attr: x.trim(),
                        operator: y.trim(),
                        value: z.trim()
                    })
                }
                return C.filter(x => r.every(({
                    attr: y,
                    operator: z,
                    value: A
                }) => {
                    if ("!=" === z) return !x.hasAttribute(y) || x.getAttribute(y) !== A;
                    if (!z) return x.hasAttribute(y);
                    if (!x.hasAttribute(y)) return !1;
                    y = x.getAttribute(y);
                    switch (z) {
                        case "=":
                            return y === A;
                        case "^=":
                            return y.startsWith(A);
                        case "$=":
                            return y.endsWith(A);
                        case "*=":
                            return y.includes(A);
                        case "~=":
                            return y.split(/\s+/).includes(A);
                        case "|=":
                            return y === A || y.startsWith(A + "-");
                        default:
                            return !1
                    }
                }))
            }

            function n(p) {
                try {
                    return b.querySelectorAll(p)
                } catch (t) {
                    return d(p, b)
                }
            }

            function q(p) {
                const [t, w] = p.split(":");
                p = t ? Array.from(b.querySelectorAll(t)) : Array.from(b.querySelectorAll("*"));
                if (w.includes("(")) {
                    var C = w.match(/([^(]+)\((.*?)\)/);
                    if (C) {
                        const [, r, x] = C;
                        C = parseInt(x);
                        switch (r) {
                            case "eq":
                                return p.length > C ? [p[C]] : [];
                            case "gt":
                                return p.slice(C + 1);
                            case "lt":
                                return p.slice(0, C);
                            default:
                                if (e[":" +
                                        w]) return p.filter((y, z, A) => e[":" + w](y, z, A, x))
                        }
                    }
                }
                return e[":" + w] ? p.filter((r, x, y) => e[":" + w](r, x, y)) : []
            }

            function u(p) {
                try {
                    p = p.trim();
                    if ("*" === p) return b.getElementsByTagName("*");
                    if (p.startsWith("#")) {
                        const w = b.querySelector(p);
                        if (!w) {
                            const C = `Element with ID "#${p.slice(1)}" not found`;
                            console.warn(C);
                            return []
                        }
                        requestAnimationFrame(() => {
                            const C = b.querySelector(p);
                            if (C && C instanceof HTMLElement && "fixed" === window.getComputedStyle(C).position) {
                                let r = C.parentElement;
                                for (; r && r !== document.body;) {
                                    const x =
                                        window.getComputedStyle(r);
                                    "none" !== x.transform && (r.dataset.originalTransform = x.transform, r.style.transform = "", (new IntersectionObserver(y => {
                                        y.forEach(z => {
                                            !z.isIntersecting && r.dataset.originalTransform && (r.style.transform = r.dataset.originalTransform, delete r.dataset.originalTransform)
                                        })
                                    })).observe(C));
                                    r = r.parentElement
                                }
                            }
                        });
                        return [w]
                    }
                    if (p.startsWith(".") && !/\${.*}|[^a-zA-Z0-9-_]/.test(p.slice(1))) {
                        const w = Array.from(b.querySelectorAll(p));
                        return 0 === w.length ? (p.slice(1), console.error(error), []) : w
                    }
                    const t =
                        b.querySelectorAll(p);
                    return 0 === t.length ? [] : Array.from(t)
                } catch (t) {
                    return []
                }
            }
            if (!f || "string" !== typeof f) return console.warn("Invalid or empty selector provided"), [];
            f = f.trim();
            if (!f) return console.warn("Empty selector provided"), [];
            if (f.startsWith("text=")) {
                const p = f.slice(5);
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    t = t.textContent.trim();
                    return p.startsWith("^") ? t.startsWith(p.slice(1)) : p.endsWith("$") ? t.endsWith(p.slice(0, -1)) : t === p
                })
            }
            if (f.startsWith("depth=")) {
                const p = parseInt(f.slice(6));
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    let w = 0;
                    for (; t.parentElement && !["html", "body"].includes(t.parentElement.tagName.toLowerCase());) w++, t = t.parentElement;
                    return w === p - 1
                })
            }
            var v = f.match(/([\w\.#]+)-sibling\[([-]?\d+|first|last)\]/);
            if (v) {
                const [, p, t] = v;
                var B = b.querySelector(p);
                if (!B) return [];
                if ("last" === t)
                    for (f = B; f.nextElementSibling && "SCRIPT" !== f.nextElementSibling.tagName;) f = f.nextElementSibling;
                else if ("first" === t)
                    for (f = B; f.previousElementSibling;) f = f.previousElementSibling;
                else {
                    f =
                        parseInt(t);
                    for (v = 0; v < Math.abs(f); v++) {
                        var D = 0 < f ? B.nextElementSibling : B.previousElementSibling;
                        if (!D || "SCRIPT" === D.tagName) break;
                        B = D
                    }
                    f = B
                }
                return f ? [f] : []
            }
            if (f.startsWith("&&(")) {
                const p = f.slice(3, -1).split(",").map(t => t.trim());
                return Array.from(b.querySelectorAll("*")).filter(t => p.every(w => t.matches(w)))
            }
            if (f.startsWith("!!(")) {
                const p = f.slice(3, -1).split(",").map(t => t.trim());
                return Array.from(b.querySelectorAll("*")).filter(t => p.every(w => !t.matches(w)))
            }
            if (f.startsWith("range[") && (v = f.match(/range\[([\w-]+)=(\d+)~(\d+)\]/))) {
                const [,
                    p, t, w
                ] = v;
                return Array.from(b.querySelectorAll("*")).filter(C => {
                    C = parseInt(C.getAttribute(p));
                    return C >= parseInt(t) && C <= parseInt(w)
                })
            }
            if (f.startsWith("child-range[") && (v = f.match(/child-range\[(\d+)~(\d+)\]/))) {
                const [, p, t] = v;
                return Array.from(b.querySelectorAll("*")).filter(w => {
                    w = Array.from(w.parentNode.children).indexOf(w) + 1;
                    return w >= parseInt(p) && w <= parseInt(t)
                })
            }
            if (f.startsWith("attr-contains[") && (v = f.match(/attr-contains\[([\w-]+)=([^\]]+)\]/))) {
                const [, p, t] = v;
                return Array.from(b.querySelectorAll("*")).filter(w =>
                    (w = w.getAttribute(p)) && w.includes(t))
            }
            if (f.startsWith("classes[") && (v = f.match(/classes\[([\w\s\.-|]+)\]/))) {
                const p = v[1].split("|");
                return Array.from(b.querySelectorAll("*")).filter(t => p.some(w => t.matches(w)))
            }
            if (f.startsWith("style[") && (v = f.match(/style\[([\w-]+)=([^\]]+)\]/))) {
                const [, p, t] = v;
                return Array.from(b.querySelectorAll("*")).filter(w => window.getComputedStyle(w)[p] === t)
            }
            if ("visible" === f) return Array.from(b.querySelectorAll("*")).filter(p => {
                p = window.getComputedStyle(p);
                return "none" !== p.display &&
                    "hidden" !== p.visibility && "0" !== p.opacity
            });
            if ("animated" === f) {
                f = DomQuery.prototype.fx;
                v = [];
                for (B in f) f[B] && Array.isArray(f[B]) && 0 < f[B].length && (D = document.querySelector(`[data-queue-id="${B}"]`)) && v.push(D);
                return this.elements = v
            }
            if (f.startsWith("form-state[")) {
                const p = f.match(/form-state\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("input, select, textarea")).filter(t => {
                    switch (p) {
                        case "valid":
                            return t.validity.valid;
                        case "invalid":
                            return !t.validity.valid;
                        case "required":
                            return t.required;
                        case "optional":
                            return !t.required;
                        default:
                            return !1
                    }
                })
            }
            if (f.startsWith("viewport[")) {
                const p = f.match(/viewport\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    t = t.getBoundingClientRect();
                    const w = window.innerHeight;
                    switch (p) {
                        case "visible":
                            return 0 <= t.top && t.bottom <= w;
                        case "partially":
                            return t.top < w && 0 < t.bottom;
                        case "above":
                            return 0 > t.bottom;
                        case "below":
                            return t.top > w
                    }
                })
            }
            if (f.startsWith("text-length[") && (B = f.match(/text-length\[([<>])(\d+)\]/))) {
                const [, p, t] = B;
                return Array.from(b.querySelectorAll("*")).filter(w => {
                    w = w.textContent.trim().length;
                    return "<" === p ? w < parseInt(t) : w > parseInt(t)
                })
            }
            if (f.startsWith("nested[") && (B = f.match(/nested\[([\w\.#]+)>(\d+)\]/))) {
                const [, p, t] = B;
                return Array.from(b.querySelectorAll("*")).filter(w => {
                    let C = 0;
                    for (w = w.parentElement; w;) w.matches(p) && C++, w = w.parentElement;
                    return C > parseInt(t)
                })
            }
            if (f.startsWith("density[")) switch (B = f.match(/density\[(\w+)\]/)[1], v = Array.from(b.querySelectorAll("*")).map(p => ({
                    el: p,
                    density: p.getElementsByTagName("*").length
                })).sort((p, t) => t.density - p.density),
                D = Math.floor(v.length / 3), B) {
                case "high":
                    return v.slice(0, D).map(p => p.el);
                case "medium":
                    return v.slice(D, 2 * D).map(p => p.el);
                case "low":
                    return v.slice(2 * D).map(p => p.el)
            }
            if (f.startsWith("responsive[")) {
                const p = f.match(/responsive\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    t = window.getComputedStyle(t);
                    switch (p) {
                        case "mobile":
                            return 768 >= parseInt(t.maxWidth);
                        case "tablet":
                            return 768 < parseInt(t.maxWidth) && 1024 >= parseInt(t.maxWidth);
                        case "desktop":
                            return 1024 < parseInt(t.maxWidth)
                    }
                })
            }
            if (f.startsWith("performance[")) {
                const p =
                    f.match(/performance\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    var w = t.getElementsByTagName("*").length,
                        C = getEventListeners(t)?.length || 0,
                        r = document.styleSheets.length;
                    t = t.getAnimations().length;
                    w = .4 * w + .3 * C + .2 * r + .1 * t;
                    switch (p) {
                        case "heavy":
                            return 100 < w;
                        case "medium":
                            return 50 < w && 100 >= w;
                        case "light":
                            return 50 >= w
                    }
                })
            }
            if (f.startsWith("a11y[")) {
                const p = f.match(/a11y\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    switch (p) {
                        case "warning":
                            return !t.hasAttribute("alt") &&
                                "IMG" === t.tagName || !t.hasAttribute("aria-label") && "button" === t.role;
                        case "error":
                            return t.hasAttribute("tabindex") && 0 > t.tabIndex || t.hasAttribute("aria-hidden") && "true" === t.getAttribute("aria-hidden") && t.textContent.trim();
                        case "valid":
                            return t.hasAttribute("aria-label") || t.hasAttribute("alt") || t.hasAttribute("role")
                    }
                })
            }
            if (f.startsWith("interaction[")) {
                const p = f.match(/interaction\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    switch (p) {
                        case "active":
                            return document.activeElement ===
                                t;
                        case "hover":
                            return t.matches(":hover");
                        case "focused":
                            return t.matches(":focus");
                        case "pressed":
                            return t.matches(":active")
                    }
                })
            }
            if (f.startsWith("content-type[")) {
                const p = f.match(/content-type\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    switch (p) {
                        case "media":
                            return t.matches("img, video, audio, canvas, svg");
                        case "input":
                            return t.matches("input, textarea, select, button");
                        case "text":
                            return !t.matches("script, style") && 0 === t.children.length && 0 < t.textContent.trim().length;
                        case "container":
                            return 0 < t.children.length
                    }
                })
            }
            if (f.startsWith("dynamic[")) {
                const p = f.match(/dynamic\[(\w+)\]/)[1];
                return Array.from(b.querySelectorAll("*")).filter(t => {
                    const w = Date.now();
                    switch (p) {
                        case "added":
                            return t.dataset.addedTimestamp && 5E3 > w - parseInt(t.dataset.addedTimestamp);
                        case "modified":
                            return t.dataset.lastModified && 5E3 > w - parseInt(t.dataset.lastModified);
                        case "removed-soon":
                            return t.matches(".fade-out, .removing, .disappearing")
                    }
                })
            }
            if (":header" === f) return b.querySelectorAll("h1, h2, h3, h4, h5, h6");
            if (":input" === f) return b.querySelectorAll("input, select, textarea, button");
            if (f.includes(",")) return f = f.split(",").map(p => p.trim()), [...(new Set(f.flatMap(p => Array.from(g(p)))))];
            switch (function(p) {
                    return p.trim().startsWith("<") && p.trim().endsWith(">") ? "HTML" : p.includes("#") && p.includes(":") ? "ID_PSEUDO" : p.includes("[") ? "ATTRIBUTE" : p.includes(" ") ? "COMPLEX" : p.includes(":") && !p.includes("::") ? "PSEUDO" : "BASIC"
                }(f)) {
                case "HTML":
                    return l(f);
                case "ID_PSEUDO":
                    return h(f);
                case "ATTRIBUTE":
                    return m(f);
                case "COMPLEX":
                    return n(f);
                case "PSEUDO":
                    return q(f);
                default:
                    return u(f)
            }
        };
    if ("function" === typeof a) return domquery(document).ready(a);
    if (!a || "function" !== typeof a.addEventListener || a instanceof Element || a instanceof DocumentFragment) {
        if (a instanceof DomQuery) return a;
        if ("string" === typeof a) {
            if (a.startsWith("#")) {
                var k = a.slice(1);
                /^\d/.test(k) && (a = "#\\3" + k.charAt(0) + " " + k.slice(1))
            }
            if (a.trim().startsWith("<"))
                if (k = (k = a.trim().match(/<(\w+)/)) ? k[1] : "div", !b || "object" !== typeof b || b instanceof Node ||
                    b instanceof Window) k = document.createElement("template"), k.innerHTML = a.trim(), this.elements = Array.from(k.content.childNodes);
                else {
                    const f = document.createElement(k);
                    b.id && (f.id = b.id);
                    if (b.class || b.className) f.className = b.class || b.className;
                    b.css && "object" === typeof b.css && Object.assign(f.style, b.css);
                    b.data && "object" === typeof b.data && Object.entries(b.data).forEach(([l, h]) => {
                        f.dataset[l] = h
                    });
                    b.attr && "object" === typeof b.attr && Object.entries(b.attr).forEach(([l, h]) => {
                        f.setAttribute(l, h)
                    });
                    b.on && "object" ===
                        typeof b.on && Object.entries(b.on).forEach(([l, h]) => {
                            f.addEventListener(l, h)
                        });
                    b.html && (f.innerHTML = b.html);
                    b.text && (f.textContent = b.text);
                    Object.entries(b).forEach(([l, h]) => {
                        "id class className css data attr on html text".split(" ").includes(l) || (l in f ? f[l] = h : f.setAttribute(l, h))
                    });
                    this.elements = [f]
                }
            else if ("*" === a) this.elements = Array.from(b.getElementsByTagName("*"));
            else if (a.trim())
                if (a.startsWith(":header") || a.includes(":eq(") || a.includes(":contains(") || a.includes(":button") || a.includes(":checkbox") ||
                    a.includes(":radio") || a.includes(":file") || a.includes(":root")) this.elements = Array.from(g(a));
                else try {
                    if (a.includes(",")) {
                        const f = b.querySelectorAll(a);
                        this.elements = Array.from(f).sort((l, h) => l.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
                    } else this.elements = Array.from(b.querySelectorAll(a))
                } catch (f) {
                    try {
                        this.elements = Array.from(g(a))
                    } catch (l) {
                        console.warn("Invalid selector:", a), this.elements = []
                    }
                } else console.warn("Empty selector provided"), this.elements = []
        } else if (a instanceof Node) this.elements = [a];
        else if (a instanceof NodeList || Array.isArray(a)) this.elements = Array.from(a)
    } else this.elements = [a];
    this.length = this.elements.length;
    for (a = 0; a < this.length; a++) this[a] = this.elements[a];
    this.addCustomSelector = function(f, l) {
        "string" === typeof f && "function" === typeof l ? e[":" + f] = l : console.warn("Invalid custom selector. Name must be string and fn must be function.");
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
        function c(k, f, l) {
            const h = Object.prototype.toString.call(k);
            if ("[object Array]" === h) return d(k, f, l);
            if ("[object Object]" === h) {
                l = [];
                for (const m in k) Object.prototype.hasOwnProperty.call(k, m) && l.push(c(k[m], f ? g.allowDots ? `${f}.${m}` : `${f}[${m}]` : m, e));
                return l.join("&")
            }
            return "[object Date]" === h ? g.encoder(f) + "=" + g.encoder(k.toISOString()) : null === k ? g.encoder(f) + "=" : "boolean" === typeof k || "number" === typeof k ? g.encoder(f) + "=" + g.encoder(k.toString()) : g.encoder(f) +
                "=" + g.encoder(k)
        }

        function d(k, f, l) {
            const h = [];
            for (let m = 0; m < k.length; m++) {
                const n = l(f, m);
                h.push(c(k[m], n, l))
            }
            return h.join("&")
        }

        function e(k, f) {
            switch (g.arrayFormat) {
                case "indices":
                    return `${k}[${f}]`;
                case "brackets":
                    return `${k}[]`;
                case "repeat":
                    return k;
                case "comma":
                    return k;
                default:
                    return `${k}[${f}]`
            }
        }
        const g = {
            traditional: !1,
            encodeValuesOnly: !1,
            encoder: encodeURIComponent,
            serializer: (k, f) => `${k}=${f}`,
            allowDots: !1,
            arrayFormat: "brackets",
            ...b
        };
        return null === a || "undefined" === typeof a ? "" : Array.isArray(a) &&
            !g.traditional ? d(a, "", e) : c(a, "", e)
    },
    serialize: function(a = {}) {
        function b(e) {
            if (c.customSerialize && "function" === typeof c.customSerialize) {
                var g = c.customSerialize(e);
                if (g) {
                    d.push(g);
                    return
                }
            }
            if (c.includeDisabled || !e.disabled) switch (g = encodeURIComponent(e.name), e.type.toLowerCase()) {
                case "text":
                case "password":
                case "hidden":
                case "textarea":
                    (c.includeEmpty || "" !== e.value) && d.push(`${g}=${encodeURIComponent(e.value)}`);
                    break;
                case "radio":
                case "checkbox":
                    e.checked && d.push(`${g}=${encodeURIComponent(e.value)}`);
                    break;
                case "select-one":
                    0 <= e.selectedIndex && d.push(`${g}=${encodeURIComponent(e.options[e.selectedIndex].value)}`);
                    break;
                case "select-multiple":
                    for (let k = 0; k < e.options.length; k++) e.options[k].selected && d.push(`${g}=${encodeURIComponent(e.options[k].value)}`)
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
                for (let g = 0; g < e.length; g++) b(e[g])
            } else b(e)
        });
        return d.join("&")
    },
    serializeArray: function(a = {}) {
        function b(e) {
            if (c.customSerialize && "function" === typeof c.customSerialize) {
                var g = c.customSerialize(e);
                if (g) {
                    d.push(g);
                    return
                }
            }
            if (c.includeDisabled || !e.disabled) {
                var k = e.name;
                g = f => {
                    if (c.includeEmpty || "" !== f) {
                        var l = d,
                            h = l.push;
                        f = c.convertTypes ? isNaN(f) || "" === f ? "true" === f ? !0 : "false" === f ? !1 : "null" === f ? null : f : +f : f;
                        h.call(l, {
                            name: k,
                            value: f
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
                        g(e.value);
                        break;
                    case "radio":
                    case "checkbox":
                        e.checked && g(e.value);
                        break;
                    case "select-one":
                        0 <= e.selectedIndex && g(e.options[e.selectedIndex].value);
                        break;
                    case "select-multiple":
                        for (let f = 0; f < e.options.length; f++) e.options[f].selected && g(e.options[f].value);
                        break;
                    case "file":
                        if (0 < e.files.length)
                            for (g = 0; g < e.files.length; g++) d.push({
                                name: k,
                                value: e.files[g],
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
                for (let g = 0; g < e.length; g++) b(e[g])
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
                const g = e.cloneNode(!0);
                e._eventHandlers && Object.keys(e._eventHandlers).forEach(k => {
                    e._eventHandlers[k].forEach(f => {
                        g.addEventListener(k, f.handler)
                    })
                });
                return g
            }
            return e.cloneNode(!0)
        };
        if ("undefined" !== typeof a) return this.elements.forEach(function(e) {
            a instanceof DomQuery ? (e.innerHTML = "", a.elements.forEach(g => {
                    e.appendChild(c(g))
                })) : a instanceof HTMLElement ? (e.innerHTML = "", e.appendChild(c(a))) : Array.isArray(a) ? (e.innerHTML = "", a.forEach(g => {
                    g instanceof HTMLElement ? e.appendChild(c(g)) : g instanceof DomQuery ? g.elements.forEach(k => {
                        e.appendChild(c(k))
                    }) : e.appendChild(document.createTextNode(String(g)))
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
            const d = (e, g) => {
                if (g instanceof DomQuery) g.elements.forEach(k => {
                    const f = k.cloneNode(!0);
                    k._eventHandlers && Object.keys(k._eventHandlers).forEach(l => {
                        k._eventHandlers[l].forEach(h => {
                            f.addEventListener(l, h.handler)
                        })
                    });
                    e.parentNode.insertBefore(f, e.nextSibling)
                });
                else if (g instanceof HTMLElement) {
                    const k = g.cloneNode(!0);
                    g._eventHandlers && Object.keys(g._eventHandlers).forEach(f => {
                        g._eventHandlers[f].forEach(l => {
                            k.addEventListener(f, l.handler)
                        })
                    });
                    e.parentNode.insertBefore(k,
                        e.nextSibling)
                } else "string" === typeof g ? e.insertAdjacentHTML("afterend", g) : g instanceof Text || g instanceof DocumentFragment ? e.parentNode.insertBefore(g.cloneNode(!0), e.nextSibling) : Array.isArray(g) && g.forEach(k => d(e, k))
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
            const d = (e, g) => {
                if (e && e instanceof Element && e.parentNode) {
                    var k = f => {
                        if (f instanceof DomQuery) f.elements.forEach(l => k(l));
                        else if (f instanceof Element) e.parentNode.insertBefore(f.cloneNode(!0), e);
                        else if ("string" === typeof f) {
                            const l = document.createElement("div");
                            l.innerHTML = f;
                            Array.from(l.childNodes).forEach(h => {
                                e.parentNode.insertBefore(h, e)
                            })
                        } else f instanceof DocumentFragment && e.parentNode.insertBefore(f.cloneNode(!0), e)
                    };
                    Array.isArray(g) ? g.forEach(f => k(f)) : k(g)
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
            const d = (e, g) => {
                if (g instanceof DomQuery) g.elements.forEach(k => {
                    const f = k.cloneNode(!0);
                    k._eventHandlers && Object.keys(k._eventHandlers).forEach(l => {
                        k._eventHandlers[l].forEach(h => {
                            f.addEventListener(l, h.handler)
                        })
                    });
                    e.insertBefore(f, e.firstChild)
                });
                else if (g instanceof HTMLElement) {
                    const k = g.cloneNode(!0);
                    g._eventHandlers && Object.keys(g._eventHandlers).forEach(f => {
                        g._eventHandlers[f].forEach(l => {
                            k.addEventListener(f, l.handler)
                        })
                    });
                    e.insertBefore(k, e.firstChild)
                } else "string" === typeof g ? e.insertAdjacentHTML("afterbegin", g) : g instanceof Text || g instanceof DocumentFragment ? e.insertBefore(g.cloneNode(!0), e.firstChild) : Array.isArray(g) && g.reverse().forEach(k => d(e, k))
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
                if (e.every(f => "" === f || "string" === typeof f || f instanceof Node || f instanceof DocumentFragment || Array.isArray(f) || f instanceof DomQuery || "function" === typeof f)) {
                    var g = {
                        position: "beforeend",
                        triggerEvent: !0
                    };
                    b = 1 < arguments.length && "object" === typeof b ? {
                        ...g,
                        ...b
                    } : g;
                    ["beforeend", "afterbegin"].includes(b.position) || (console.warn("Invalid position option. Using 'beforeend'."), b.position = "beforeend");
                    var k = (f, l) => {
                        if (f && f instanceof Element) try {
                            if ("function" ===
                                typeof l) {
                                const h = l.call(f, f.index, f.innerHTML);
                                k(f, h)
                            } else if (l instanceof DomQuery) l.elements.forEach(h => {
                                if (h)
                                    if (h instanceof Node) {
                                        const m = h.cloneNode(!0);
                                        h._eventHandlers && Object.keys(h._eventHandlers).forEach(n => {
                                            h._eventHandlers[n].forEach(q => {
                                                m.addEventListener(n, q.handler)
                                            })
                                        });
                                        m instanceof Element ? f.insertAdjacentElement(b.position, m) : m instanceof Text ? f.insertAdjacentText(b.position, m.textContent) : f.insertAdjacentHTML(b.position, m.outerHTML || m.textContent)
                                    } else Array.isArray(h) ? h.forEach(m => {
                                        m && m instanceof Node && k(f, m)
                                    }) : "string" === typeof h ? f.insertAdjacentHTML(b.position, h) : console.warn("Unsupported element type in domquery instance:", h)
                            });
                            else if (l instanceof Node) {
                                const h = l.cloneNode(!0);
                                l._eventHandlers && Object.keys(l._eventHandlers).forEach(m => {
                                    l._eventHandlers[m].forEach(n => {
                                        h.addEventListener(m, n.handler)
                                    })
                                });
                                h instanceof Element ? f.insertAdjacentElement(b.position, h) : h instanceof Text ? f.insertAdjacentText(b.position, h.textContent) : f.insertAdjacentHTML(b.position, h.outerHTML ||
                                    h.textContent)
                            } else "string" === typeof l ? f.insertAdjacentHTML(b.position, l) : Array.isArray(l) ? l.forEach(h => k(f, h)) : console.warn("Unsupported content type:", l)
                        } catch (h) {
                            console.error("Error in appendContent:", h)
                        } else console.warn("Invalid target element:", f)
                    };
                    this.elements.forEach((f, l) => {
                        f instanceof Element ? (f.index = l, e.forEach(h => k(f, h))) : console.warn("Invalid element in the elements array:", f)
                    });
                    "function" === typeof c && c.call(this);
                    if (b.triggerEvent) {
                        const f = new Event("contentAppended");
                        this.elements.forEach(l => {
                            l instanceof Element && l.dispatchEvent(f)
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
            c.forEach((g, k) => {
                if (g && "function" === typeof g[b]) g[b](k === d ? e : e.cloneNode(!0));
                else console.warn(`Method ${b} not supported for target element`, g)
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
        const c = (d, e = !1, g = 0) => {
            const k = d.cloneNode(!0);
            b.events && this._cloneEvents(d, k, g);
            b.data && this.elementData.has(d) && this.elementData.set(k, {
                ...this.elementData.get(d)
            });
            e && b.selector && Array.from(k.querySelectorAll(b.selector)).forEach((f, l) => {
                (l = c(f, !0, g + 1)) && f.parentNode.replaceChild(l, f)
            });
            if (k instanceof HTMLInputElement || k instanceof HTMLTextAreaElement ||
                k instanceof HTMLSelectElement) k.value = d.value;
            k.setAttribute("data-cloned", "true");
            k.setAttribute("data-clone-level", g.toString());
            return k
        };
        b.deep ? (a = this.elements.map(d => d.id ? `#${d.id}` : "").filter(Boolean).join(", "), a = (a ? Array.from(document.querySelectorAll(a)) : this.elements).map(d => c(d, !0)).filter(d => null !== d)) : a = this.elements.map((d, e) => "true" === d.getAttribute("data-cloned") || null !== b.index && e !== b.index || "odd" === b.oddEven && 0 === e % 2 || "even" === b.oddEven && 0 !== e % 2 ? null : c(d)).filter(d => null !== d);
        if (document.querySelectorAll('[data-cloned="true"]').length + a.length > b.maxClones) return console.warn("Maximum clone limit reached"), new DomQuery([]);
        a = new DomQuery(a);
        "function" === typeof b.callback && b.callback.call(a);
        return a
    },
    _cloneEvents: function(a, b, c = 0) {
        const d = (e, g, k) => {
            if (e._eventHandlers) {
                g._eventHandlers || (g._eventHandlers = {});
                for (let f in e._eventHandlers) g._eventHandlers[f] || (g._eventHandlers[f] = []), e._eventHandlers[f].forEach(l => {
                    if (l.selector) {
                        var h = function(m) {
                            for (var n = m.target; n &&
                                n !== g;) {
                                if (n.matches(l.selector)) {
                                    l.handler.call(n, m);
                                    break
                                }
                                n = n.parentElement
                            }
                        };
                        g._eventHandlers[f].push({
                            selector: l.selector,
                            handler: l.handler,
                            delegatedHandler: h
                        });
                        g.addEventListener(f, h)
                    } else g._eventHandlers[f].push({
                        handler: l.handler
                    }), g.addEventListener(f, l.handler)
                })
            }
            if (e.hasAttribute("data-cloned")) {
                const f = this._clone_getOriginalEventHandlers(e);
                for (let l in f) g._eventHandlers || (g._eventHandlers = {}), g._eventHandlers[l] || (g._eventHandlers[l] = []), f[l].forEach(h => {
                    g._eventHandlers[l].push(h);
                    g.addEventListener(l, h.handler)
                })
            }
            Array.from(e.children).forEach((f, l) => {
                g.children[l] && d(f, g.children[l], k + 1)
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
            c.forEach(g => {
                if (g?.parentNode) {
                    var k =
                        e.cloneNode(!0);
                    d.push(k);
                    "before" === b ? g.parentNode.insertBefore(k, g) : g.parentNode.insertBefore(k, g.nextSibling)
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
                for (var d = b.parentNode, e = b.nextSibling, g = c; g.firstElementChild;) g = g.firstElementChild;
                g.appendChild(b);
                e ? d.insertBefore(c, e) : d.appendChild(c)
            }
        });
        return this
    },
    one: function(a, b, c) {
        "function" === typeof b && (c = b, b = void 0);
        this.elements.forEach(d => {
            if (d instanceof Element) {
                var e = function(g) {
                    if (b) {
                        const k =
                            g.target.closest(b);
                        k && d.contains(k) && (c.call(k, g), d.removeEventListener(a, e))
                    } else c.call(d, g), d.removeEventListener(a, e)
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
        const c = m => "P" === m.tagName && m.parentElement && (m.parentElement.classList.contains("left") || m.parentElement.classList.contains("right")) && null === m.previousElementSibling,
            {
                skip: d = c,
                callback: e,
                override: g = !1,
                deep: k = !1
            } = b,
            f = m => Array.isArray(m) ? m.flatMap(n => "string" === typeof n ? n.split(/\s+/) : Array.isArray(n) ? f(n) : []).filter(Boolean) : "string" === typeof m ? m.split(/\s+/).filter(Boolean) : [],
            l = (m, n) => {
                g ? m.className = n.join(" ") : m.classList.add(...n)
            },
            h = (m, n) => {
                d(m, n) || ("function" === typeof a ? (n = a.call(m, n, m.className),
                    n = f(n)) : n = f(a), 0 < n.length && l(m, n), k && 0 < m.children.length && Array.from(m.children).forEach((q, u) => {
                    h(q, u)
                }))
            };
        this.elements.forEach(h);
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
                for (let g in d[e]) c(d[e], g);
            if (b.strict && !(e in d)) throw Error(`Property "${e}" does not exist on element`);
            try {
                delete d[e]
            } catch (g) {
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
                [...(new Set([...e, ...d]))].forEach(g => {
                    c.classList.contains(g) ? c.classList.remove(g) : c.classList.add(g)
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
            this.elements.forEach((e, g) => {
                let k;
                k = "SELECT" === e.tagName && e.multiple ? Array.from(e.selectedOptions).map(l => l.value) : "SELECT" === e.tagName ? e.options[e.selectedIndex].value : "checkbox" === e.type || "radio" === e.type ? e.checked ? e.value : null : e.value;
                const f = a.call(e, g, k);
                void 0 !== f && ("SELECT" === e.tagName && e.multiple ? Array.from(e.options).forEach(l => {
                    l.selected = Array.isArray(f) ? f.includes(l.value) :
                        f === l.value
                }) : "SELECT" === e.tagName ? Array.from(e.options).forEach(l => {
                    l.selected = l.value === f
                }) : "checkbox" === e.type || "radio" === e.type ? Array.isArray(f) ? e.checked = f.includes(e.value) : e.checked = e.value === f : e.value = f)
            });
            d(this)
        })) : this._Queue.then(() => new Promise(d => {
            this.elements.forEach(e => {
                "SELECT" === e.tagName && e.multiple ? Array.from(e.options).forEach(g => {
                        g.selected = Array.isArray(a) ? a.includes(g.value) : a === g.value
                    }) : "SELECT" === e.tagName ? Array.from(e.options).forEach(g => {
                        g.selected = g.value === a
                    }) : "checkbox" ===
                    e.type || "radio" === e.type ? Array.isArray(a) ? e.checked = a.includes(e.value) : e.checked = e.value === a : e.value = a
            });
            d(this)
        })).then(() => {
            if ("function" === typeof b) {
                const d = Array.from(this.elements).map(e => "SELECT" === e.tagName && e.multiple ? Array.from(e.selectedOptions).map(g => g.value) : "SELECT" === e.tagName ? e.options[e.selectedIndex].value : "checkbox" === e.type || "radio" === e.type ? e.checked ? e.value : null : e.value);
                b.call(this, 1 === d.length ? d[0] : d)
            }
            return this
        }), this
    },
    data: function(a, b, c) {
        if (this.elements && 0 !== this.elements.length) {
            if ("string" !==
                typeof a) return console.warn("\ud0a4\ub294 \ubb38\uc790\uc5f4\uc774\uc5b4\uc57c \ud569\ub2c8\ub2e4."), this;
            var d = g => {
                    if (void 0 === g) return g;
                    try {
                        return JSON.parse(g)
                    } catch {
                        return g
                    }
                },
                e = (g => g.replace(/[-_]([a-z])/g, k => k[1].toUpperCase()))(a);
            "function" === typeof b && (c = b, b = void 0);
            if (void 0 === b) return a = d(this.elements[0].dataset[e]), "function" === typeof c && c.call(this, a), a;
            this.elements.forEach(g => {
                g = g.dataset;
                var k = b;
                k = "object" === typeof k && null !== k ? JSON.stringify(k) : String(k);
                g[e] = k
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
            e = f => {
                const l = this.elements[0];
                if (l instanceof HTMLElement) {
                    if (d.includes(f)) return l[f] ? f : "";
                    f = l.getAttribute(f);
                    return null !== f ? f : void 0
                }
            },
            g = (f, l) => {
                this.elements.forEach(h => {
                    h instanceof HTMLElement && ("" === l ? h.removeAttribute(f) : "class" === f && "string" === typeof l ? h.className = l : d.includes(f) ? h[f] = !!l : h.setAttribute(f, l))
                })
            };
        if ("object" !== typeof a || Array.isArray(a))
            if (Array.isArray(a) &&
                "function" === typeof b) {
                if (0 === this.elements.length) return this;
                var k = a.map(f => e(f));
                b.call(this, k)
            } else {
                if (Array.isArray(a)) return 0 === this.elements.length ? void 0 : a.map(f => e(f));
                if ("function" === typeof b) {
                    if (0 === this.elements.length) return this;
                    this.elements.forEach((f, l) => {
                        const h = e.call({
                            elements: [f]
                        }, a);
                        l = b.call(f, l, h);
                        void 0 !== l && g.call({
                            elements: [f]
                        }, a, l)
                    })
                } else if (void 0 !== b) g(a, b), "function" === typeof c && (this._Queue = this._Queue.then(() => new Promise(f => {
                    c.call(this);
                    f(this)
                })));
                else return e(a)
            }
        else {
            for (k in a) a.hasOwnProperty(k) &&
                g(k, a[k]);
            "function" === typeof b && (this._Queue = this._Queue.then(() => new Promise(f => {
                b.call(this);
                f(this)
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
                ":has": (d, e) => "string" === typeof e ? null !== d.querySelector(e) : e instanceof Node ? d.contains(e) : e instanceof DomQuery ? e.elements.some(g => d.contains(g)) : !1,
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
                    if (e.includes(",")) return e.split(",").some(g => c(d, g.trim()));
                    if (/\s+/.test(e)) {
                        e = e.split(/\s+/);
                        let g = d;
                        for (let k = e.length - 1; 0 <= k; k--) {
                            if (!g || !c(g, e[k])) return !1;
                            g = g.parentElement
                        }
                        return !0
                    }
                    if (e.startsWith(".")) return d.classList.contains(e.slice(1));
                    if (e.startsWith("#")) return d.id === e.slice(1);
                    if (e.startsWith("[") && e.endsWith("]")) {
                        const [g, k, f] = e.slice(1, -1).split(/([~^$*|]?=)/);
                        e = d.getAttribute(g);
                        if (!k) return null !== e;
                        if (!e) return !1;
                        switch (k) {
                            case "=":
                                return e === f;
                            case "~=":
                                return e.split(/\s+/).includes(f);
                            case "^=":
                                return e.startsWith(f);
                            case "$=":
                                return e.endsWith(f);
                            case "*=":
                                return e.includes(f);
                            case "|=":
                                return e === f || e.startsWith(f + "-")
                        }
                    } else if (e.startsWith(":")) {
                        if (e = e.match(/^:([\w-]+)(?:\((.*?)\))?$/)) {
                            const [, g, k] = e;
                            if (b[`:${g}`]) return b[`:${g}`](d,
                                k)
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
            const k = {},
                f = window.getComputedStyle(d);
            a.forEach(l => {
                k[l] = f.getPropertyValue(l)
            });
            return k
        }
        const e = this,
            g = {
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
        return this._queueTask(() => new Promise(k => {
            let f;
            !Array.isArray(a) && "object" !== typeof a || "function" !== typeof b ? "function" === typeof c && (f = c) : f = b;
            const l = (m, n, q) => {
                    for (const D in n)
                        if (Object.prototype.hasOwnProperty.call(n, D)) {
                            let p = n[D];
                            if ("function" === typeof p) {
                                var u = window.getComputedStyle(m);
                                p = p.call(m, q, u.getPropertyValue(D))
                            }
                            if ("string" === typeof p)
                                if (/^([+-])=\d+(\.\d+)?([a-z%]*)$/.test(p)) {
                                    u =
                                        p.match(/^([+-])=(\d+(\.\d+)?)([a-z%]*)$/);
                                    var v = parseFloat(window.getComputedStyle(m).getPropertyValue(D)) || 0,
                                        B = u[4] || "px";
                                    p = ("+" === u[1] ? v + parseFloat(u[2]) : v - parseFloat(u[2])) + B
                                } else /^([+-])\d+(\.\d+)?([a-z%]*)$/.test(p) && (u = p.match(/^([+-])(\d+(\.\d+)?)([a-z%]*)$/), v = parseFloat(window.getComputedStyle(m).getPropertyValue(D)) || 0, B = u[4] || "px", p = ("+" === u[1] ? v + parseFloat(u[2]) : v - parseFloat(u[2])) + B);
                            "number" !== typeof p || g[D] || (p += "px");
                            ["", "-webkit-", "-moz-", "-ms-", "-o-"].forEach(t => {
                                m.style[t + D] = null ===
                                    p ? "" : p
                            })
                        }
                },
                h = [];
            e.elements.forEach((m, n) => {
                if (1 === m.nodeType && m.style)
                    if (Array.isArray(a)) {
                        const q = window.getComputedStyle(m),
                            u = {};
                        a.forEach(v => {
                            u[v] = q.getPropertyValue(v)
                        });
                        h.push(u);
                        f && f.call(e, u, m)
                    } else "object" === typeof a ? l(m, a, n) : l(m, {
                        [a]: b
                    }, n), f && f.call(e, m)
            });
            k(0 < h.length ? h : e)
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
            g = function(k) {
                function f() {
                    h++;
                    h === m && ("function" === typeof c && c.call(e), k && k())
                }
                const l = e.elements;
                let h = 0;
                const m = l.length;
                l.forEach(n => {
                    const q = "none" === window.getComputedStyle(n).display || "none" === n.style.display;
                    "undefined" !== typeof d ? d ? q ? domquery(n).slideDown(a, b, f) : f() : q ? f() : domquery(n).slideUp(a, b, f) : q ? domquery(n).slideDown(a, b, f) : domquery(n).slideUp(a, b, f)
                })
            };
        if (!1 !== b.useQueue) return this.queue(g);
        g();
        return this
    },
    slideUp: function(a = 300, b = {}, c) {
        performance.now();
        if (this._isStringSelector(a)) return domquery(a).slideUp(b,
            c);
        "string" === typeof a ? ("function" === typeof b && (c = b, b = {}), a = this._processDuration(a)) : "function" === typeof a ? (c = a, a = 300, b = {}) : "function" === typeof b ? (c = b, b = {}) : "object" === typeof a && (c = b, b = a, a = 300);
        const d = this;
        a = this._processDuration(a);
        const e = function(g) {
            const k = d.elements;
            let f = 0;
            const l = k.length;
            k.forEach(function(h) {
                if ("none" !== window.getComputedStyle(h).display && "none" !== h.style.display)
                    if (h._isAnimating) f++, f === l && ("function" === typeof c && c.call(d), g && g());
                    else {
                        h._isAnimating = !0;
                        let m = !1;
                        const n =
                            function() {
                                m || (m = !0, h._isAnimating = !1, f++, f === l && ("function" === typeof c && c.call(d), performance.now(), g && g()))
                            };
                        domquery(h)._hide$Height(a, {
                            ...b,
                            start: function() {
                                b.start && b.start.call(this)
                            },
                            step: function(q, u, v) {
                                b.step && b.step.call(this, q, u, v)
                            },
                            progress: function(q, u, v) {
                                b.progress && b.progress.call(this, q, u, v)
                            },
                            done: function() {
                                b.done && b.done.call(this)
                            },
                            complete: function() {
                                b.complete && b.complete.call(this);
                                b.done && b.done.call(this)
                            },
                            fail: function(q) {
                                b.fail && b.fail.call(this, q);
                                n()
                            },
                            always: function() {
                                b.complete &&
                                    b.complete.call(this);
                                b.always && b.always.call(this);
                                n()
                            }
                        })
                    }
                else f++, f === l && ("function" === typeof c && c.call(d), g && g())
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
        const e = function(g) {
            const k = d.elements;
            let f = 0;
            const l = k.length;
            k.forEach(function(h) {
                if ("none" === window.getComputedStyle(h).display || "none" === h.style.display)
                    if (h._isAnimating) f++, f === l && ("function" === typeof c && c.call(d), g && g());
                    else {
                        h._isAnimating = !0;
                        let m = !1;
                        const n = function() {
                            m || (m = !0, h._isAnimating = !1, f++, f === l && ("function" === typeof c && c.call(d), performance.now(), g && g()))
                        };
                        domquery(h)._show$Height(a, {
                            ...b,
                            start: function() {
                                b.start && b.start.call(this)
                            },
                            step: function(q, u, v) {
                                b.step && b.step.call(this,
                                    q, u, v)
                            },
                            progress: function(q, u, v) {
                                b.progress && b.progress.call(this, q, u, v)
                            },
                            done: function() {
                                b.done && b.done.call(this)
                            },
                            complete: function() {
                                b.complete && b.complete.call(this);
                                b.done && b.done.call(this)
                            },
                            fail: function(q) {
                                b.fail && b.fail.call(this, q);
                                n()
                            },
                            always: function() {
                                b.complete && b.complete.call(this);
                                b.always && b.always.call(this);
                                n()
                            }
                        })
                    }
                else f++, f === l && ("function" === typeof c && c.call(d), g && g())
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
            e = function(g) {
                const k = d._processDuration(a);
                d.slideToggle(k, b, function() {
                    c && c.call(d);
                    g && g()
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
        const e = function(g) {
            const k =
                d.elements;
            let f = 0;
            const l = k.length;
            k.forEach(function(h) {
                const m = "none" === window.getComputedStyle(h).display || "none" === h.style.display ? "_show$Height" : "_hide$Height";
                if (h._isAnimating) f++, f === l && ("function" === typeof c && c.call(d), g && g());
                else {
                    h._isAnimating = !0;
                    let n = !1;
                    const q = function() {
                        n || (n = !0, h._isAnimating = !1, f++, f === l && ("function" === typeof c && c.call(d), performance.now(), g && g()))
                    };
                    domquery(h)[m](a, {
                        ...b,
                        start: function() {
                            b.start && b.start.call(this)
                        },
                        step: function(u, v, B) {
                            b.step && b.step.call(this,
                                u, v, B)
                        },
                        progress: function(u, v, B) {
                            b.progress && b.progress.call(this, u, v, B)
                        },
                        done: function() {
                            b.done && b.done.call(this)
                        },
                        complete: function() {
                            b.complete && b.complete.call(this);
                            b.done && b.done.call(this)
                        },
                        fail: function(u) {
                            b.fail && b.fail.call(this, u);
                            q()
                        },
                        always: function() {
                            b.complete && b.complete.call(this);
                            b.always && b.always.call(this);
                            q()
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
            g = b.always || null,
            k = b.complete || null,
            f = b.done || null;
        return this._Queue = this._Queue.then(() => new Promise(l => {
            d && d.call(this);
            this.elements.forEach(function(h) {
                try {
                    const M = h.getAttribute("data-animating"),
                        R = parseInt(h.getAttribute("data-animating-timestamp") ||
                            "0", 10),
                        Q = Date.now();
                    if (("show" === M || "shows" === M || "hides" === M) && Q - R < a + 100) l();
                    else {
                        Q - R >= a + 100 && (h.removeAttribute("data-animating"), h.removeAttribute("data-animating-timestamp"));
                        h.setAttribute("data-animating", "shows");
                        h.setAttribute("data-animating-timestamp", Q.toString());
                        var m = window.getComputedStyle(h),
                            n = m.height,
                            q = m.paddingTop,
                            u = m.paddingBottom,
                            v = m.marginTop,
                            B = m.marginBottom,
                            D = m.borderTopWidth,
                            p = m.borderBottomWidth,
                            t = m.overflow,
                            w = m.display,
                            C = m.transition,
                            r = m.boxSizing,
                            x = h.getAttribute("data-flex-display");
                        x ? (h.style.display = x, h.style.justifyContent = h.getAttribute("data-justify-content") || "", h.style.alignItems = h.getAttribute("data-align-items") || "", h.style.flexDirection = h.getAttribute("data-flex-direction") || "") : h.style.display = "none" === w ? "block" : w;
                        h.style.height = "auto";
                        h.style.paddingTop = "0";
                        h.style.paddingBottom = "0";
                        h.style.marginTop = "0";
                        h.style.marginBottom = "0";
                        h.style.borderTopWidth = "0";
                        h.style.borderBottomWidth = "0";
                        h.style.overflow = "hidden";
                        "number" === typeof b.opacity && 0 <= b.opacity && 1 >= b.opacity ?
                            h.style.opacity = b.opacity.toString() : !0 === b.opacity && (h.style.opacity = "0");
                        var y = (() => {
                                if (h.style.height) {
                                    var F = h.style.height;
                                    if ("auto" !== F && "" !== F && !F.includes("%")) return parseFloat(F)
                                }
                                return "auto" !== n && "" !== n && !n.includes("%") && (F = parseFloat(n), !isNaN(F) && 0 < F) ? F : null
                            })(),
                            z = h.offsetHeight,
                            A = parseFloat(q) + parseFloat(u),
                            E = parseFloat(D) + parseFloat(p),
                            J = y || z + A + E,
                            G = Array.from(h.children).filter(F => F.classList.contains("post") || Array.from(F.children).some(H => H.classList.contains("post"))),
                            P = 0;
                        0 < G.length &&
                            G.forEach(F => {
                                (F.classList.contains("post") ? [F] : Array.from(F.children).filter(H => H.classList.contains("post"))).forEach(H => {
                                    H = window.getComputedStyle(H);
                                    P += parseFloat(H.borderTopWidth) + parseFloat(H.borderBottomWidth)
                                })
                            });
                        h.style.height = "0";
                        h.offsetHeight;
                        var I = b.easing ? b.easing.split(",")[0] : "linear",
                            N = null,
                            O = "border-box" === r,
                            K = F => {
                                const H = this._anieasing(0, 1, F, I);
                                let S;
                                S = O ? this._anieasing(0, J, F, I) : this._anieasing(0, J - A - E + E * (1 - H), F, I);
                                h.style.height = `${S}px`;
                                h.style.paddingTop = parseFloat(q) * H + "px";
                                h.style.paddingBottom = parseFloat(u) * H + "px";
                                h.style.marginTop = parseFloat(v) * H + "px";
                                h.style.marginBottom = parseFloat(B) * H + "px";
                                h.style.borderTopWidth = parseFloat(D) * H + "px";
                                h.style.borderBottomWidth = parseFloat(p) * H + "px";
                                if ("number" === typeof b.opacity) {
                                    if (1 === F) {
                                        const V = a / 2,
                                            W = Date.now(),
                                            U = () => {
                                                const T = Math.min((Date.now() - W) / V, 1),
                                                    X = this._anieasing(b.opacity, 1, T, I);
                                                h.style.opacity = X.toString();
                                                1 > T && requestAnimationFrame(U)
                                            };
                                        requestAnimationFrame(U)
                                    }
                                } else !0 === b.opacity && (h.style.opacity = H.toString());
                                b.step &&
                                    b.step.call(this, h, Math.round(100 * F), H);
                                b.progress && b.progress.call(this, h, F, H)
                            },
                            L = F => {
                                N || (N = F);
                                F = Math.min((F - N) / a, 1);
                                K.call(this, F);
                                if (1 > F) requestAnimationFrame(L.bind(this));
                                else {
                                    h.style.height = y ? `${y}px` : "";
                                    h.style.overflow = t;
                                    h.style.transition = C;
                                    h.style.marginTop = v;
                                    h.style.marginBottom = B;
                                    h.style.paddingTop = q;
                                    h.style.paddingBottom = u;
                                    h.style.borderTopWidth = D;
                                    h.style.borderBottomWidth = p;
                                    h.removeAttribute("data-animating");
                                    h.removeAttribute("data-animating-timestamp");
                                    try {
                                        k && k.call(this, h), f && f.call(this,
                                            h)
                                    } finally {
                                        g && g.call(this), l()
                                    }
                                }
                            };
                        requestAnimationFrame(L.bind(this))
                    }
                } catch (M) {
                    h.removeAttribute("data-animating"), h.removeAttribute("data-animating-timestamp"), e && e.call(this, M), g && g.call(this), l()
                }
            }, this)
        }))
    },
    _hide$Height: function(a = 300, b = {}, c) {
        "function" === typeof b && (b = {});
        var d = b.start || null,
            e = b.fail || null,
            g = b.always || null,
            k = b.complete || null,
            f = b.done || null;
        return this._Queue = this._Queue.then(() => new Promise(l => {
            d && d.call(this);
            this.elements.forEach(function(h) {
                let m;
                try {
                    const I = h.getAttribute("data-animating"),
                        N = parseInt(h.getAttribute("data-animating-timestamp") || "0", 10),
                        O = Date.now();
                    if (("hide" === I || "hides" === I || "shows" === I) && O - N < a + 100) l();
                    else {
                        O - N >= a + 100 && (h.removeAttribute("data-animating"), h.removeAttribute("data-animating-timestamp"));
                        h.setAttribute("data-animating", "hides");
                        h.setAttribute("data-animating-timestamp", O.toString());
                        var n = h.getBoundingClientRect().height,
                            q = h.style.height && "auto" !== h.style.height && "" !== h.style.height && !h.style.height.includes("%"),
                            u = document.createElement("div");
                        u.style.cssText =
                            "display:block;overflow:hidden;height:auto;margin:0;padding:0;border:0;";
                        if (m = 0 < h.childNodes.length) {
                            for (; h.firstChild;) u.appendChild(h.firstChild);
                            h.appendChild(u)
                        }
                        var v = window.getComputedStyle(h),
                            B = v.paddingTop,
                            D = v.paddingBottom,
                            p = v.marginTop,
                            t = v.marginBottom,
                            w = v.borderTopWidth,
                            C = v.borderBottomWidth,
                            r = v.overflow,
                            x = v.display,
                            y = v.transition;
                        x.includes("flex") && (h.setAttribute("data-flex-display", x), h.setAttribute("data-justify-content", v.justifyContent), h.setAttribute("data-align-items", v.alignItems),
                            h.setAttribute("data-flex-direction", v.flexDirection));
                        var z = q || (() => {
                            const K = v.height;
                            return "auto" !== K && "" !== K && !K.includes("%")
                        })() ? q ? parseFloat(h.style.height) : parseInt(v.height, 10) : n;
                        h.style.height = z + "px";
                        h.style.overflow = "hidden";
                        if ("number" === typeof b.opacity && 0 <= b.opacity && 1 >= b.opacity) {
                            const K = parseFloat(h.style.opacity || "1");
                            h.style.opacity = K.toString()
                        } else !0 === b.opacity && (h.style.opacity = "1");
                        h.style.marginTop = p;
                        h.style.marginBottom = t;
                        h.style.paddingTop = B;
                        h.style.paddingBottom = D;
                        h.style.borderTopWidth =
                            w;
                        h.style.borderBottomWidth = C;
                        h.offsetHeight;
                        var A = b.easing ? b.easing.split(",") : [],
                            E = 1 < A.length ? A[1].trim() : A[0] ? A[0].trim() : "linear",
                            J = Date.now();
                        parseFloat(B);
                        parseFloat(D);
                        parseFloat(w);
                        parseFloat(C);
                        var G = K => {
                                const L = this._anieasing(1, 0, K, E);
                                h.style.height = z * L + "px";
                                h.style.paddingTop = parseFloat(B) * L + "px";
                                h.style.paddingBottom = parseFloat(D) * L + "px";
                                h.style.marginTop = parseFloat(p) * L + "px";
                                h.style.marginBottom = parseFloat(t) * L + "px";
                                h.style.borderTopWidth = parseFloat(w) * L + "px";
                                h.style.borderBottomWidth =
                                    parseFloat(C) * L + "px";
                                if ("number" === typeof b.opacity) {
                                    var M = parseFloat(h.style.opacity || "1");
                                    M = this._anieasing(M, b.opacity, K, E);
                                    h.style.opacity = M.toString();
                                    if (1 === K) {
                                        const R = a / 2,
                                            Q = Date.now(),
                                            F = () => {
                                                const H = Math.min((Date.now() - Q) / R, 1),
                                                    S = this._anieasing(b.opacity, 0, H, E);
                                                h.style.opacity = S.toString();
                                                1 > H && requestAnimationFrame(F)
                                            };
                                        requestAnimationFrame(F)
                                    }
                                } else !0 === b.opacity && (h.style.opacity = L.toString());
                                b.step && b.step.call(this, h, Math.round(100 * K), L);
                                b.progress && b.progress.call(this, h, K, L)
                            },
                            P = () => {
                                const K = Math.min((Date.now() - J) / a, 1);
                                G.call(this, K);
                                if (1 > K) requestAnimationFrame(P.bind(this));
                                else {
                                    h.style.display = "none";
                                    h.style.height = "";
                                    h.style.overflow = r;
                                    h.style.transition = y;
                                    h.style.marginTop = p;
                                    h.style.marginBottom = t;
                                    h.style.paddingTop = B;
                                    h.style.paddingBottom = D;
                                    h.style.borderTopWidth = w;
                                    h.style.borderBottomWidth = C;
                                    h.removeAttribute("data-animating");
                                    h.removeAttribute("data-animating-timestamp");
                                    if (m && u.parentNode === h) {
                                        for (; u.firstChild;) h.appendChild(u.firstChild);
                                        h.removeChild(u)
                                    }
                                    try {
                                        k && k.call(this,
                                            h), f && f.call(this, h)
                                    } finally {
                                        g && g.call(this), l()
                                    }
                                }
                            };
                        requestAnimationFrame(P.bind(this));
                        b.hide && domquery(b.hide).hide$Height(a, b);
                        b.show && domquery(b.show).show$Height(a, b)
                    }
                } catch (I) {
                    h.removeAttribute("data-animating"), h.removeAttribute("data-animating-timestamp"), e && e.call(this, I), g && g.call(this), l()
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
        let g = Math.round(a[1] + (b[1] - a[1]) * e * 200 / 200),
            k = Math.round(a[2] + (b[2] - a[2]) * e * 200 / 200);
        e = a[3] + (b[3] - a[3]) * e * 200 / 200;
        0 < c && 1 > c && (2 > Math.abs(d - a[0]) && (d += b[0] > a[0] ? Math.ceil(.25 * c) : -Math.ceil(.25 * c)), 2 > Math.abs(g - a[1]) && (g += b[1] > a[1] ? Math.ceil(.25 * c) : -Math.ceil(.25 * c)), 2 > Math.abs(k - a[2]) && (k += b[2] > a[2] ? Math.ceil(.25 * c) : -Math.ceil(.25 * c)));
        d = Math.round(100 * d) / 100;
        g = Math.round(100 * g) / 100;
        k = Math.round(100 * k) / 100;
        d = Math.max(0, Math.min(255,
            d));
        g = Math.max(0, Math.min(255, g));
        k = Math.max(0, Math.min(255, k));
        e = Math.max(0, Math.min(1, e));
        return `rgba(${d},${g},${k},${e})`
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
            g = null,
            k = this;
        Array.isArray(d) ? (e = d[0], "function" === typeof d[1] && (g = d[1], d._animationId || (d._animationId = Date.now() + Math.random()), this._callbacks || (this._callbacks = {}), 1 <= c && !this._callbacks[d._animationId] && (this._callbacks[d._animationId] = !0, setTimeout(function() {
            g.call(k)
        }, 0)))) : "string" === typeof d && (e = d);
        return "string" === typeof e && e.includes(",") ? (d = e.split(",").map(f => f.trim())[0], a + (b - a) * (this.anieasing[d] || this.anieasing.linear)(c)) :
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
            const g = this.stop;
            this.stop = (...k) => {
                c && clearInterval(c);
                d && clearInterval(d);
                const f = this.data("stepAnimationFrame");
                f && (cancelAnimationFrame(f), this.removeData("stepAnimationFrame"));
                b.lifecycleCallbacks.fail && b.lifecycleCallbacks.fail.call(this, this[0]);
                return g.apply(this, k)
            };
            b.lifecycleCallbacks.progress && (c = setInterval(() => {
                const k = Math.min((Date.now() - e) / b.duration, 1);
                b.lifecycleCallbacks.progress.call(this, this[0], k);
                1 <= k && clearInterval(c)
            }, 1E3 / 60));
            if (b.lifecycleCallbacks.step) {
                const k = this.elements || [this[0]],
                    f = {};
                k.forEach((m, n) => {
                    f[n] = {};
                    for (let q in b.properties)
                        if ("left top right bottom width height opacity".split(" ").includes(q)) {
                            const u =
                                window.getComputedStyle(m);
                            f[n][q] = parseFloat(u[q]) || 0
                        }
                });
                d = setInterval(() => {
                    const m = Date.now();
                    1 <= Math.min((m - e) / b.duration, 1) && clearInterval(d)
                }, 1E3 / 60);
                let l;

                function h() {
                    const m = Date.now(),
                        n = Math.min((m - e) / b.duration, 1);
                    k.forEach((q, u) => {
                        for (let v in b.properties)
                            if ("left top right bottom width height opacity".split(" ").includes(v)) {
                                const B = f[u][v];
                                let D;
                                D = "string" === typeof b.properties[v] ? b.properties[v].startsWith("+=") ? B + parseFloat(b.properties[v].substring(2)) : b.properties[v].startsWith("-=") ?
                                    B - parseFloat(b.properties[v].substring(2)) : parseFloat(b.properties[v]) : parseFloat(b.properties[v]);
                                const p = B + (D - B) * n;
                                b.lifecycleCallbacks.step.call(q, p, {
                                    elem: q,
                                    prop: v,
                                    start: B,
                                    end: D,
                                    now: p,
                                    pos: n,
                                    unit: "px"
                                })
                            }
                    });
                    1 > n && (l = requestAnimationFrame(h))
                }
                l = requestAnimationFrame(h);
                this.data("stepAnimationFrame", l)
            }
            this.data("progressInterval", c);
            this.data("stepInterval", d);
            this._animate1(b.properties, b.duration || 0, (k = !0) => {
                c && clearInterval(c);
                d && clearInterval(d);
                const f = this.data("stepAnimationFrame");
                f && (cancelAnimationFrame(f),
                    this.removeData("stepAnimationFrame"));
                this.stop = g;
                k && (b.callback && b.callback.call(this, this[0]), b.lifecycleCallbacks.done && b.lifecycleCallbacks.done.call(this, this[0]));
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
                this.elements.forEach(g => {
                    const k = $(g),
                        f = k.data("queueId");
                    k.removeData("isStopnow");
                    if (f && this.fx[f] && 0 < this.fx[f].length) {
                        const l = this.fx[f][0];
                        if (l.lifecycleCallbacks) {
                            const h =
                                Date.now(),
                                m = l.duration;
                            if (l.lifecycleCallbacks.progress) {
                                let n;
                                const q = () => {
                                    const u = Math.min((Date.now() - h) / m, 1);
                                    l.lifecycleCallbacks.progress.call(k, g, u);
                                    1 > u && (n = requestAnimationFrame(q), k.data("progressRAF", n))
                                };
                                n = requestAnimationFrame(q)
                            }
                            if (l.lifecycleCallbacks.step) {
                                let n;
                                const q = () => {
                                    const u = Math.min((Date.now() - h) / m, 1);
                                    l.lifecycleCallbacks.step.call(k, g, u, u);
                                    1 > u && (n = requestAnimationFrame(q), k.data("stepRAF", n))
                                };
                                n = requestAnimationFrame(q)
                            }
                        }
                        this.dequeue(f)
                    }
                    g.isStopped && ("function" === typeof g.start &&
                        g.start(), g.isStopped = !1)
                });
                setTimeout(() => {
                    this.stop();
                    if (e) try {
                        b.call(this, this.elements)
                    } catch (g) {
                        console.error("Start delay callback error:", g), console.error("Context:", this)
                    }
                }, d);
                return this
            }
            const c = [];
            this.elements.forEach(d => {
                const e = $(d),
                    g = e.data("queueId");
                e.removeData("isStopnow");
                if (!0 === a && g && this.fx[g]) {
                    const k = new Promise(f => {
                        const l = this.fx[g][0];
                        if (l) {
                            const h = l.lifecycleCallbacks?.done;
                            l.lifecycleCallbacks = l.lifecycleCallbacks || {};
                            l.lifecycleCallbacks.done = function(...m) {
                                h && h.apply(this,
                                    m);
                                setTimeout(f, 0)
                            }
                        } else f()
                    });
                    c.push(k)
                }
                if (g && this.fx[g] && 0 < this.fx[g].length) {
                    const k = this.fx[g][0];
                    if (k.lifecycleCallbacks) {
                        const f = Date.now(),
                            l = k.duration;
                        if (k.lifecycleCallbacks.progress) {
                            let h;
                            const m = () => {
                                const n = Math.min((Date.now() - f) / l, 1);
                                k.lifecycleCallbacks.progress.call(e, d, n);
                                1 > n && (h = requestAnimationFrame(m), e.data("progressRAF", h))
                            };
                            h = requestAnimationFrame(m)
                        }
                        if (k.lifecycleCallbacks.step) {
                            let h;
                            const m = () => {
                                const n = Math.min((Date.now() - f) / l, 1);
                                k.lifecycleCallbacks.step.call(e, d, n, n);
                                1 > n && (h = requestAnimationFrame(m), e.data("stepRAF", h))
                            };
                            h = requestAnimationFrame(m)
                        }
                    }
                    this.dequeue(g)
                }!0 === a && g && this.fx[g] && (this.fx[g] = [], e.removeData("queueId"));
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
                const g = d.data("stepInterval");
                e && (clearInterval(e), d.removeData("progressInterval"));
                g && (clearInterval(g), d.removeData("stepInterval"));
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
                    const g =
                        d.data("stepInterval");
                    e && (clearInterval(e), d.removeData("progressInterval"));
                    g && (clearInterval(g), d.removeData("stepInterval"));
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
                const g = d.data("stepInterval");
                e && (clearInterval(e), d.removeData("progressInterval"));
                g && (clearInterval(g), d.removeData("stepInterval"));
                if ((e = d.data("queueId")) && this.fx[e]) {
                    this.fx[e][0]?.lifecycleCallbacks?.fail && this.fx[e][0].lifecycleCallbacks.fail.call(d, c);
                    d.css("transition", "none");
                    if (a) {
                        const k = this.fx[e][0];
                        if (k?.properties) {
                            const f =
                                window.getComputedStyle(c),
                                l = {};
                            Object.keys(k.properties).forEach(h => {
                                l[h] = "left" === h || "top" === h || "right" === h || "bottom" === h ? f[h] : "width" === h || "height" === h ? f[h] : "opacity" === h ? f.opacity : "backgroundColor" === h ? f.backgroundColor : k.properties[h]
                            });
                            d.css(l);
                            "function" === typeof k.callbacks && k.callbacks.call(d)
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
                    var e = this.fx[c].filter(g => "function" === typeof g || "function" === typeof g.callbacks);
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
                const [g, k] = a.split("-"),
                    f = parseInt(g), l = "end" === k ? this.fx[e].length : parseInt(k);
                this.fx[e].splice(f, l - f + 1);
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
        const g = this.elements[0];
        if (!g) return "function" === typeof d && d.call(this), this;
        if (!["show", "hide", "fadeIn", "fadeOut"].includes(d)) {
            if (this.data("isStopnow") || this.data("isStopped")) return g.style.transition = "none", g.offsetHeight, g.style.transition = `opacity ${a/1E3}s ease`, g.style.opacity = b, "function" === typeof d && d.call(this), this;
            g.style.transition = "none";
            g.offsetHeight
        }
        var k = getComputedStyle(g),
            f = parseFloat(k.opacity);
        const l = k.transform;
        var h = new DOMMatrix(l);
        h = .01 > Math.hypot(h.a, h.b) || !g.offsetParent;
        const m = "none" === k.display;
        k = "hidden" === k.visibility;
        f = h || m || k || 0 === f;
        k = g.getAttribute("data-origScale") || "scale";
        f && 0 < parseFloat(b) && (g.style.display = "block", g.style.visibility = "visible", g.style.opacity = "0", h && ("scale" === k ? g.style.transform = `${l.replace(/scale\([^)]*\)/,"")} scale(0.01)`.trim() : g.style[k] = "0.01"));
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
        for (let g = 0; g < arguments.length; g++) "string" ===
            typeof arguments[g] || arguments[g] instanceof Element ? a = arguments[g] : "object" !== typeof arguments[g] || Array.isArray(arguments[g]) ? "number" === typeof arguments[g] ? c = arguments[g] : "function" === typeof arguments[g] && (d = arguments[g]) : b = arguments[g];
        b = Object.assign({}, {
            bgcolor: "#000000",
            zindex: 999,
            half: !1,
            close: null,
            overlayType: "alert"
        }, b);
        const e = g => {
            if (!g || "string" !== typeof g) return {
                color: "#000000",
                blur: 0
            };
            let k = {
                color: null,
                blur: 0
            };
            g.split(";").forEach(f => {
                var l = f.trim();
                l.startsWith("blur:") ? k.blur = parseInt(l.split(":")[1]) ||
                    0 : l && (l.startsWith("rgba(") || l.startsWith("hsla(") ? k.color = l : l.startsWith("rgb(") ? (f = l.match(/\d+/g), k.color = `rgba(${f[0]}, ${f[1]}, ${f[2]}, 0.5)`) : l.startsWith("hsl(") ? (f = l.match(/\d+/g), k.color = `hsla(${f[0]}, ${f[1]}%, ${f[2]}%, 0.5)`) : (f = document.createElement("div"), f.style.color = l, document.body.appendChild(f), l = getComputedStyle(f).color.match(/\d+/g), document.body.removeChild(f), k.color = `rgba(${l[0]}, ${l[1]}, ${l[2]}, 0.5)`))
            });
            return k
        };
        a = "string" === typeof a ? document.querySelectorAll(a) : a instanceof
        NodeList ? a : a instanceof Element ? [a] : [document.body];
        Array.from(a).forEach(function(g) {
            var k = "toast" === b.overlayType ? "domquery-toast-overlay" : "domquery-shadow-overlay";
            const f = e(b.bgcolor);
            var l = null;
            if ("_self" === b.parent) {
                var h = document.querySelectorAll(".domquery-alert");
                for (let q = h.length - 1; 0 <= q; q--) {
                    const u = h[q];
                    if (u.getAttribute("data-instance-id") !== b.instanceId) {
                        l = u;
                        break
                    }
                }
                l && (l.style.cssText += "overflow: hidden !important;")
            }
            let m = g.querySelector(`.${k}[data-instance-id="${b.instanceId}"]`);
            h = !1;
            if (!m && (h = !0, m = document.createElement("div"), m.className = k, m.setAttribute("data-instance-id", b.instanceId), k = `\n\t\t\t\t\t\tposition: ${l?"absolute":g===document.body?"fixed":"absolute"};\n\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\theight: 100%;\n\t\t\t\t\t\tz-index: ${b.zindex};\n\t\t\t\t\t\tpointer-events: auto;\n\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t`, f.color && (k += `background-color: ${f.color};`), 0 < f.blur && (k += `backdrop-filter: blur(${f.blur}px);-webkit-backdrop-filter: blur(${f.blur}px);`),
                    m.style.cssText = k, l ? l.insertBefore(m, l.firstChild) : g.appendChild(m), b.close)) {
                const q = b.close.replace(/["']/g, "");
                l || m.addEventListener("click", function() {
                    const u = document.querySelector(q);
                    u && u.click()
                });
                try {
                    document.querySelectorAll(q).forEach(u => {
                        u.addEventListener("click", function(v) {
                            v.preventDefault();
                            c ? n(parseFloat(getComputedStyle(m).opacity), 0, c) : (0 < f.blur && (m.style.backdropFilter = "blur(0px)", m.style.WebkitBackdropFilter = "blur(0px)"), m.style.opacity = 0, m.style.display = "none", b.half || "function" !==
                                typeof d || d.call(g))
                        })
                    })
                } catch (u) {
                    console.warn("Invalid close selector:", b.close)
                }
            }
            l = "alpha" in b ? b.alpha / 100 : 1;
            const n = function(q, u, v) {
                let B = !1,
                    D = Date.now();
                m.style.display = "block";
                const p = function() {
                    var t = Date.now() - D;
                    t = Math.min(t / v, 1);
                    if (0 < f.blur) {
                        const w = 0 === u ? f.blur * (1 - t) : f.blur * t;
                        m.style.backdropFilter = `blur(${w}px)`;
                        m.style.WebkitBackdropFilter = `blur(${w}px)`
                    }
                    m.style.opacity = 0 === u ? 1 - t : t;
                    b.half && !B && .5 <= t && (B = !0, "function" === typeof d && d.call(g));
                    1 > t ? requestAnimationFrame(p) : (0 === u && (m.style.display =
                        "none"), b.half || "function" !== typeof d || d.call(g))
                };
                requestAnimationFrame(p)
            };
            "none" !== m.style.display && 0 < parseFloat(getComputedStyle(m).opacity) && !h ? c ? n(l, 0, c) : (0 < f.blur && (m.style.backdropFilter = "blur(0px)", m.style.WebkitBackdropFilter = "blur(0px)"), m.style.opacity = 0, m.style.display = "none", b.half || "function" !== typeof d || d.call(g)) : c ? n(0, l, c) : (0 < f.blur && (m.style.backdropFilter = `blur(${f.blur}px)`, m.style.WebkitBackdropFilter = `blur(${f.blur}px)`), m.style.opacity = l, m.style.display = "block", b.half || "function" !==
                typeof d || d.call(g))
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
        const d = g => {
            if (!(g instanceof HTMLElement)) return !1;
            const k = window.getComputedStyle(g);
            return "none" !== k.display && "hidden" !== k.visibility && 0 < parseFloat(k.opacity) && (0 < g.offsetWidth ||
                0 < g.offsetHeight)
        };
        this.elements.forEach(g => {
            g instanceof Element && (g = Array.from(g.children), a ? ":visible" === a ? c = c.concat(g.filter(d)) : g.forEach(k => {
                k.matches && k.matches(a) && c.push(k)
            }) : c = c.concat(g))
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
        const d = (f, l) => {
                if (!f || !l) return [];
                f = f.split(/\s+(?=[^[\]]*(?:\[|$))/);
                l = [l];
                for (const h of f) {
                    const m = [];
                    l.forEach(n => {
                        if (n instanceof HTMLElement)
                            if (h.includes(":first") || h.includes(":last")) {
                                const [u,
                                    v
                                ] = h.split(":");
                                n = u ? Array.from(n.querySelectorAll(u)) : Array.from(n.children);
                                n.length && m.push("first" === v ? n[0] : n[n.length - 1])
                            } else if (h.includes(":eq(")) {
                            const [u, v] = h.split(":eq(");
                            var q = parseInt(v);
                            n = u ? Array.from(n.querySelectorAll(u)) : Array.from(n.children);
                            n.length > q && m.push(n[q])
                        } else try {
                            q = n.querySelectorAll(h), m.push(...Array.from(q))
                        } catch (u) {
                            console.warn(`Invalid selector part: ${h}`, u)
                        }
                    });
                    l = m
                }
                return Array.from(new Set(l))
            },
            e = f => "input" === f.tagName.toLowerCase() && "submit" === f.type || "button" ===
            f.tagName.toLowerCase() && (!f.type || "submit" === f.type),
            g = f => {
                if (!(f instanceof HTMLElement)) return !1;
                const l = window.getComputedStyle(f);
                return "none" !== l.display && "hidden" !== l.visibility && 0 < parseFloat(l.opacity) && (0 < f.offsetWidth || 0 < f.offsetHeight)
            };
        if (a instanceof HTMLElement || a instanceof NodeList || a instanceof Object && "length" in a) {
            const f = Array.from(a);
            this.elements.forEach(l => {
                f.forEach(h => {
                    l.contains(h) && c.push(h)
                })
            })
        } else if ("string" === typeof a) {
            var k = ["window", "document", "body", "html"].includes(a.toLowerCase());
            if (":submit" === a) 0 === this.elements.length ? c = Array.from(document.querySelectorAll('input[type="submit"], button:not([type]), button[type="submit"]')).filter(e) : this.elements.forEach(f => {
                f instanceof HTMLElement && (f = Array.from(f.querySelectorAll('input[type="submit"], button:not([type]), button[type="submit"]')), c = c.concat(f.filter(e)))
            });
            else if (":selected" === a || "option:selected" === a) 0 === this.elements.length ? c = Array.from(document.querySelectorAll("option")).filter(f => f.selected) : this.elements.forEach(f => {
                if (f instanceof HTMLElement) {
                    const l = Array.from(f.querySelectorAll("option")).filter(h => h.selected);
                    "select" === f.tagName.toLowerCase() && (f = f.options[f.selectedIndex]) && l.push(f);
                    c = c.concat(l)
                }
            });
            else if (a.includes(":visible")) {
                const f = a.replace(":visible", "").trim();
                0 === this.elements.length ? c = (f ? Array.from(document.querySelectorAll(f)) : Array.from(document.getElementsByTagName("*"))).filter(g) : this.elements.forEach(l => {
                    l instanceof HTMLElement && (l = f ? Array.from(l.querySelectorAll(f)) : Array.from(l.getElementsByTagName("*")),
                        c = c.concat(l.filter(g)))
                })
            } else if (":hidden" === a) 0 === this.elements.length ? c = Array.from(document.querySelectorAll("*")).filter(f => !g(f)) : this.elements.forEach(f => {
                f instanceof HTMLElement && (c = c.concat(Array.from(f.querySelectorAll("*")).filter(l => !g(l))))
            });
            else if (a.includes(":first") || a.includes(":last") || a.includes(":eq(")) 0 === this.elements.length ? c = d(a, document) : this.elements.forEach(f => {
                f instanceof HTMLElement && (c = c.concat(d(a, f)))
            });
            else try {
                0 === this.elements.length ? c = k ? [document.querySelector(a)] :
                    Array.from(document.querySelectorAll(a)) : this.elements.forEach(f => {
                        f instanceof HTMLElement && (f = f.querySelectorAll(a), c = c.concat(Array.from(f)))
                    })
            } catch (f) {
                return console.error("Invalid selector:", a), domquery([])
            }
        } else return console.error("Invalid selector type:", typeof a, a), domquery([]);
        c = Array.from(new Set(c.filter(Boolean)));
        k = domquery(c);
        k._prevObject = this;
        k.size = function() {
            return c.length
        };
        k.each = function(f) {
            c.forEach((l, h) => {
                f.call(l, h, l)
            });
            return this
        };
        "function" === typeof b && b.call(k, k);
        return k
    },
    index: function(a) {
        if (0 === arguments.length) return this.elements.length ? Array.from(this.elements[0].parentNode.children).indexOf(this.elements[0]) : -1;
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
    parent: function(a) {
        const b = [];
        this.elements.forEach(c => {
            c = c.parentNode;
            !c || a && !c.matches(a) || b.push(c)
        });
        return domquery([...(new Set(b))])
    },
    parents: function(a, b) {
        var c = [];
        this.elements.forEach(function(e) {
            for (; e && e.parentNode && 1 === e.parentNode.nodeType;) e = e.parentNode, (!a || a && e.matches(a)) && c.push(e)
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
                var d =
                    c;
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
        a instanceof DomQuery && (a = a.elements[0]);
        this.elements.forEach(e => {
            for (e = e.parentNode; e && 1 === e.nodeType;) {
                if (a)
                    if ("string" === typeof a && e.matches(a)) break;
                    else if (a instanceof Element &&
                    e === a) break;
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
            (d = d.previousElementSibling) && (!a || "string" === typeof a && d.matches(a)) && (c.push(d), "function" === typeof b && b.call(d, d))
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
        document.querySelectorAll("*").forEach(d => {
            this.elements.includes(d) && b.add(d)
        });
        let c = Array.from(b);
        "function" === typeof a ? c.sort((d, e) => {
            d = d.compareDocumentPosition(e);
            return d & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : d & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
        }).sort(a) : c.sort((d,
            e) => {
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
        d = "function" === typeof a ? a : a instanceof Element ? g => g === a : "string" === typeof a ? g => g.matches(a) : () => !1;
        let e;
        e = "function" === typeof b ? b : "string" === typeof b ? g => g.matches(b) : () => !0;
        this.elements.forEach(g => {
            for (g = g.previousElementSibling; g &&
                !d(g);) e(g) && c.push(g), g = g.previousElementSibling
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
        if ("number" !== typeof b || 0 >= b) throw Error("Limit must be a positive number");
        return new this.constructor(this.elements.flatMap(c => {
            const d = [];
            for (c = c.nextElementSibling; c && d.length <
                b;) a && !c.matches(a) || d.push(c), c = c.nextElementSibling;
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
        return 0 <= a && a < this.elements.length ? (a = this.endStack([this.elements[a]]), "function" ===
            typeof b && b.call(a), a) : this
    },
    _scrollLR: function(a, b, c, d) {
        function e(m) {
            h || (h = m);
            m -= h;
            var n = m / b;
            n = l + (a - l) * (.5 > n ? 2 * n * n : -1 + (4 - 2 * n) * n);
            k ? window.scrollTo(d ? n : 0, d ? 0 : n) : d ? g[0].scrollLeft = n : g[0].scrollTop = n;
            m < b ? requestAnimationFrame(e) : (k ? window.scrollTo(d ? a : 0, d ? 0 : a) : d ? g[0].scrollLeft = a : g[0].scrollTop = a, "function" === typeof c && c())
        }
        var g = this.elements;
        if (!g || !g[0]) return "function" === typeof c && c(), this;
        var k = 2 === g.length && "BODY" === g[0].nodeName && "HTML" === g[1].nodeName,
            f = k ? d ? window.scrollX : window.scrollY : d ?
            g[0].scrollLeft : g[0].scrollTop;
        if (void 0 === a) return f;
        if ("first" === a || 0 === a || "0" === a) a = 0;
        else if ("last" === a) a = k ? d ? document.documentElement.scrollWidth - window.innerWidth : document.documentElement.scrollHeight - window.innerHeight : d ? g[0].scrollWidth - g[0].clientWidth : g[0].scrollHeight - g[0].clientHeight;
        else if ("string" === typeof a && (a.startsWith("+=") || a.startsWith("-="))) {
            const m = parseFloat(a.substring(2));
            a = f + (a.startsWith("+=") ? m : -m)
        } else a = Number(a);
        const l = f;
        if (b) {
            var h;
            requestAnimationFrame(e);
            return this
        }
        k ?
            window.scrollTo(d ? a : 0, d ? 0 : a) : d ? g[0].scrollLeft = a : g[0].scrollTop = a;
        "function" === typeof c && c()
    },
    scrollLeft: function(a, b, c) {
        if (!this.elements || !this.elements[0]) return "function" === typeof c && c(), this;
        const d = this.elements[0];
        return void 0 === a ? d === document || d === window ? window.pageXOffset || document.documentElement.scrollLeft : d.scrollLeft : this._scrollLR(a, b, c, !0)
    },
    scroll: function(a) {
        if (!this.elements || !this.elements.length) return this;
        const b = this;
        this.elements.forEach(c => {
            c === document ? window.addEventListener("scroll",
                d => {
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
        return void 0 === a ? d === document || d === window ? window.pageYOffset || document.documentElement.scrollTop : d.scrollTop : this._scrollLR(a, b, c, !1)
    },
    scrollTo: function(a, b, c) {
        return this.elements && this.elements.length ?
            new Promise(d => {
                const e = this.elements[0],
                    g = this,
                    k = () => e === window || e === document.documentElement ? window.pageYOffset || document.documentElement.scrollTop : e.scrollTop,
                    f = u => {
                        e === window || e === document.documentElement ? window.scrollTo(0, u) : e.scrollTop = u
                    },
                    l = k();
                let h;
                h = "string" === typeof a ? a.startsWith("+") || a.startsWith("-") ? l + parseInt(a) : parseInt(a) : parseInt(a);
                if (isNaN(h)) console.warn("Invalid scroll target value"), d();
                else if (b) {
                    var m, n = k(),
                        q = u => {
                            m || (m = u);
                            u -= m;
                            u < b ? (u /= b, f(n + (h - n) * (.5 > u ? 2 * u * u : -1 + (4 - 2 * u) * u)),
                                requestAnimationFrame(q)) : (f(h), "function" === typeof c && c.call(e, g), d())
                        };
                    requestAnimationFrame(q)
                } else {
                    try {
                        "scrollBehavior" in document.documentElement.style ? e === window || e === document.documentElement ? window.scrollTo({
                            top: h,
                            behavior: "smooth"
                        }) : e.scrollTo({
                            top: h,
                            behavior: "smooth"
                        }) : f(h)
                    } catch (u) {
                        f(h)
                    }
                    "function" === typeof c && c.call(e, g);
                    d()
                }
            }) : Promise.resolve()
    },
    mouse_event: function(a, b, c, d = {}) {
        if (1 === arguments.length || void 0 === b && void 0 === c) return this.elements.forEach(e => {
            if (e)
                if ("function" === typeof e[a]) e[a]();
                else try {
                    const g = new Event(a, {
                        bubbles: !0,
                        cancelable: !0
                    });
                    e.dispatchEvent(g)
                } catch (g) {
                    console.warn(`Failed to trigger ${a} event on element`, e, g)
                }
        }), this;
        void 0 !== b && "function" !== typeof b && "string" !== typeof b && console.warn("Warning: scallback should be a function, a string, or undefined");
        "string" === typeof b && "function" !== typeof c && console.warn("Warning: callback should be a function when selector is provided");
        d = {
            passive: !1,
            capture: !1,
            ...d
        };
        this._Queue = this._Queue || Promise.resolve();
        this._Queue = this._Queue.then(() => {
            this.elements.forEach(e => {
                var g = ["scroll", "touchstart", "touchmove", "touchend"];
                const k = {
                    passive: void 0 !== d.passive ? d.passive : g.includes(a),
                    capture: !!d.capture,
                    once: !!d.once,
                    ...d
                };
                g = (f, l = !1) => {
                    e._eventHandlers || (e._eventHandlers = {});
                    e._eventHandlers[a] || (e._eventHandlers[a] = []);
                    const h = m => {
                        try {
                            let n = [m];
                            m.detail && Array.isArray(m.detail) ? n = n.concat(m.detail) : null !== m.detail && void 0 !== m.detail && n.push(m.detail);
                            f.apply(l ? m.target : e, n)
                        } catch (n) {
                            console.error("Error in event handler:", n)
                        }
                    };
                    e._eventHandlers[a].push({
                        wrappedHandler: h,
                        selector: l ? b : void 0,
                        options: k
                    });
                    e.addEventListener(a, h, k)
                };
                if ("function" === typeof b) g(b);
                else if ("string" === typeof b && "function" === typeof c) g(f => {
                    try {
                        const l = f.target.closest(b);
                        if (l && e.contains(l)) {
                            let h = [f];
                            f.detail && Array.isArray(f.detail) ? h = h.concat(f.detail) : null !== f.detail && void 0 !== f.detail && h.push(f.detail);
                            c.apply(l, h)
                        }
                    } catch (l) {
                        console.error("Error in delegated event handler:", l)
                    }
                }, !0);
                else if (void 0 === b || void 0 === c) {
                    const f = "function" === typeof b ? b : c;
                    "function" === typeof f && g(f)
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
                    else if (d = a ? "string" === typeof a ? a.split(" ") : [a] : null) {
                    let e = d.filter(k => "string" === typeof k && k.startsWith(".")).map(k => k.slice(1)),
                        g = d.filter(k => "string" === typeof k && !k.startsWith("."));
                    Object.keys(c._eventHandlers).forEach(k => {
                        if (0 === g.length || g.includes(k)) c._eventHandlers[k] = c._eventHandlers[k].filter(f => {
                            let l =
                                (0 === e.length || e.includes(f.namespace)) && (!b || f.selector === b || f.originalHandler === b);
                            if (l) {
                                const h = {
                                    passive: ["scroll", "touchstart", "touchmove", "touchend"].includes(k),
                                    capture: !0
                                };
                                c.removeEventListener(k, f.handler, h)
                            }
                            return !l
                        }), 0 === c._eventHandlers[k].length && delete c._eventHandlers[k]
                    });
                    0 === Object.keys(c._eventHandlers).length && delete c._eventHandlers
                } else Object.keys(c._eventHandlers).forEach(e => {
                    c._eventHandlers[e].forEach(g => {
                        const k = {
                            passive: ["scroll", "touchstart", "touchmove", "touchend"].includes(e),
                            capture: !0
                        };
                        c.removeEventListener(e, g.handler, k)
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
                    let [g, k] = "string" === typeof e ? e.split(".") : [e, ""];
                    if ("function" === typeof b) e = function(l) {
                        d._eventEnabled &&
                            (l = l.detail ? [l].concat(l.detail) : [l], b.apply(this, l))
                    };
                    else if ("string" === typeof b && "function" === typeof c) e = function(l) {
                        if (d._eventEnabled) {
                            let h = l.target;
                            for (; h && h !== d;) {
                                if (h.matches(b)) {
                                    l = l.detail ? [l].concat(l.detail) : [l];
                                    c.apply(h, l);
                                    break
                                }
                                h = h.parentElement
                            }
                        }
                    };
                    else {
                        console.warn("Invalid arguments for on method");
                        return
                    }
                    d._eventHandlers[g] || (d._eventHandlers[g] = []);
                    const f = {
                        passive: ["scroll", "touchstart", "touchmove", "touchend"].includes(g),
                        capture: !0
                    };
                    d._eventHandlers[g].push({
                        namespace: k,
                        handler: e,
                        selector: "string" === typeof b ? b : null,
                        originalHandler: "function" === typeof b ? b : c
                    });
                    d.addEventListener(g, e, f)
                })
            })
        });
        return this
    },
    trigger: function(a, b = {}, c) {
        this._Queue && "function" === typeof this._Queue.then || (this._Queue = Promise.resolve());
        "function" === typeof b && (c = b, b = {});
        this._Queue = this._Queue.then(() => new Promise(d => {
            if ("function" === typeof a) a.call(this, this);
            else if ("string" !== typeof a) console.error("eventType must be a string or a function");
            else {
                var e = this.elements,
                    g = {
                        bubbles: !0,
                        cancelable: !0,
                        detail: null
                    };
                if ("string" === typeof b) e = document.querySelectorAll(b);
                else if (Array.isArray(b)) g.detail = b;
                else if ("object" === typeof b && null !== b) g = Object.assign(g, b);
                else if (void 0 !== b && "function" !== typeof b) {
                    console.error("options must be an object, array, or a selector string");
                    d();
                    return
                }
                e.forEach(k => {
                    var f = g;
                    if (a.includes(".")) {
                        const [l, h] = a.split(".");
                        f = new CustomEvent(l, f);
                        f.namespace = h
                    } else f = null !== f.detail ? new CustomEvent(a, f) : new Event(a, f);
                    !1 === k.dispatchEvent(f) && (f.preventDefault(), f.stopPropagation())
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
            else return console.error("options must be an object or a selector string"),
                this;
            c.forEach(e => {
                var g = d;
                g = null !== g.detail ? new CustomEvent(a, g) : new Event(a, g);
                e.dispatchEvent(g)
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
                e instanceof Element && e._eventHandlers?.[d] && (e._eventHandlers[d] = e._eventHandlers[d].filter(g => {
                    let k = !1;
                    "function" === typeof b ? k = g.handler === b : "string" === typeof b && "function" === typeof c ? k = g.handler.toString().includes(b) &&
                        g.handler.toString().includes(c.toString()) : void 0 === b && "function" === typeof c ? k = g.handler === c : b || c || (k = !0);
                    return k ? (e.removeEventListener(d, g.wrappedHandler, g.options), !1) : !0
                }), 0 === e._eventHandlers[d].length && delete e._eventHandlers[d], 0 === Object.keys(e._eventHandlers).length && delete e._eventHandlers)
            })
        });
        return this
    },
    blur: function(a, b, c) {
        return this.mouse_event("blur", a, b, c)
    },
    focus: function(a, b, c) {
        return "function" === typeof a || "string" === typeof a && "function" === typeof b ? this.mouse_event("focus", a,
            b, c) : this
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
    click: function(a, b, c) {
        return this.mouse_event("click", a, b, c)
    },
    dblclick: function(a, b, c) {
        return this.mouse_event("dblclick", a, b, c)
    },
    contextmenu: function(a, b, c) {
        return this.mouse_event("contextmenu", a, b, c)
    },
    keydown: function(a, b, c) {
        return this.mouse_event("keydown",
            a, b, c)
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
        return this.mouse_event("reset", a, b, c)
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
        return this.mouse_event("mousemove",
            a, b, c)
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
    hover: function(a, b, c, d) {
        "function" === typeof a ? (this.mouse_event("mouseenter", a, null, d), this.mouse_event("mouseleave", b || a, null, d)) : (this.mouse_event("mouseenter", a, b, d), this.mouse_event("mouseleave", a, c || b, d));
        return this
    },
    dragstart: function(a, b, c) {
        return this.mouse_event("dragstart", a, b,
            c)
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
        return this.mouse_event("animationstart", a, b, c)
    },
    animationend: function(a, b, c) {
        return this.mouse_event("animationend", a, b, c)
    },
    animationiteration: function(a, b, c) {
        return this.mouse_event("animationiteration", a, b, c)
    },
    animationcancel: function(a, b, c) {
        return this.mouse_event("animationcancel",
            a, b, c)
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
    lostpointercapture: function(a, b, c) {
        return this.mouse_event("lostpointercapture", a, b, c)
    },
    touchstart: function(a, b, c) {
        return this.mouse_event("touchstart", a, b, c)
    },
    touchmove: function(a, b, c) {
        return this.mouse_event("touchmove", a, b, c)
    },
    touchend: function(a, b, c) {
        return this.mouse_event("touchend",
            a, b, c)
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
    pointerup: function(a, b, c) {
        return this.mouse_event("pointerup", a, b, c)
    },
    pointercancel: function(a, b, c) {
        return this.mouse_event("pointercancel", a, b, c)
    },
    pointerenter: function(a, b, c) {
        return this.mouse_event("pointerenter", a, b, c)
    },
    pointerleave: function(a, b, c) {
        return this.mouse_event("pointerleave",
            a, b, c)
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
    abort: function(a, b, c) {
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
    play: function(a,
        b) {
        return this.mouse_event("play", a, b)
    },
    pause: function(a, b) {
        return this.mouse_event("pause", a, b)
    },
    ended: function(a, b) {
        return this.mouse_event("ended", a, b)
    },
    volumechange: function(a, b) {
        return this.mouse_event("volumechange", a, b)
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
        window.addEventListener("deviceorientation",
            function(b) {
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
        window.addEventListener("hashchange", function(b) {
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
        return this._prevObject ?
            this._prevObject : this
    },
    endStack: function(a) {
        a = new DomQuery(a);
        a._prevObject = this;
        return a
    },
    offsetParent: function(a) {
        let b = [];
        this.elements.forEach(d => {
            (d = d.offsetParent) || (d = document.body || document.documentElement);
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
        document.addEventListener("selectionchange",
            function(b) {
                a(b)
            });
        return this
    },
    fullscreenchange: function(a) {
        document.addEventListener("fullscreenchange", function(b) {
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
                var g = function(k) {
                    var f = e.querySelectorAll(a);
                    let l = k.target;
                    for (; l && l !==
                        e;) {
                        if (Array.from(f).includes(l)) {
                            f = {
                                type: k.type.replace(/^focusin$/, "focus").replace(/^focusout$/, "blur"),
                                target: k.target,
                                currentTarget: l,
                                bubbles: k.bubbles,
                                cancelable: k.cancelable,
                                preventDefault: k.preventDefault.bind(k),
                                stopPropagation: k.stopPropagation.bind(k),
                                timeStamp: k.timeStamp,
                                isTrusted: k.isTrusted
                            };
                            for (let h in k) h in f || (f[h] = k[h]);
                            !1 === ("function" === typeof c ? c.call(l, f) : c[f.type].call(l, f)) && (k.preventDefault(), k.stopPropagation());
                            d.once && e.removeEventListener(k.type, g);
                            break
                        }
                        l = l.parentElement
                    }
                };
                b.forEach(k => {
                    const [f, l] = k.split(".");
                    k = "focus" === f ? "focusin" : "blur" === f ? "focusout" : f;
                    e.addEventListener(k, g, d.capture);
                    e.delegatedEvents || (e.delegatedEvents = {});
                    e.delegatedEvents[k] || (e.delegatedEvents[k] = []);
                    e.delegatedEvents[k].push({
                        selector: a,
                        handler: g,
                        originalType: f,
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
            if (d instanceof Element &&
                d.delegatedEvents) {
                var e = (g, k) => {
                    const f = "focus" === g ? "focusin" : "blur" === g ? "focusout" : g;
                    d.delegatedEvents[f] && (d.delegatedEvents[f] = d.delegatedEvents[f].filter(l => {
                        const h = (!a || a === l.selector) && (!k || k === l.namespace) && (!c || c === l.callback);
                        h && d.removeEventListener(f, l.handler, l.options.capture);
                        return !h
                    }), 0 === d.delegatedEvents[f].length && delete d.delegatedEvents[f])
                };
                b ? b.forEach(g => {
                    const [k, f] = g.split(".");
                    e(k, f)
                }) : Object.keys(d.delegatedEvents).forEach(g => {
                    e(g)
                });
                0 === Object.keys(d.delegatedEvents).length &&
                    delete d.delegatedEvents
            }
        });
        return this
    },
    visibilitychange: function(a) {
        document.addEventListener("visibilitychange", function(b) {
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
        "serviceWorker" in navigator && navigator.serviceWorker.addEventListener("activate",
            function(b) {
                a(b)
            });
        return this
    },
    fetch: function(a) {
        "serviceWorker" in navigator && navigator.serviceWorker.addEventListener("fetch", function(b) {
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
            if ("function" === typeof a) c = b.filter((e, g) => a.call(e, g, e));
            else if (a instanceof DomQuery) c = a.elements;
            else if (a instanceof Node) c = [a];
            else if (a instanceof NodeList || Array.isArray(a)) c = Array.from(a);
            else if ("string" === typeof a) {
                if ("" === a.trim()) return this;
                c = ":first" === a ? 0 < b.length ? [b[0]] : [] : ":last" === a ? 0 < b.length ? [b[b.length - 1]] : [] : Array.from(document.querySelectorAll(a))
            } else if (a && "object" === typeof a && "length" in
                a) c = Array.from(a);
            else return console.warn("Invalid selector provided to not() method"), this
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
            return console.error("Error in even() method:",
                b), this
        }
    },
    odd: function(a) {
        if (0 === this.length) return console.warn("No elements selected for odd() method"), this;
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
        if ("number" !== typeof a || 1 > a) return console.error("Invalid argument for nth() method. Expected a positive number."),
            this;
        try {
            const c = this.elements.filter((d, e) => {
                const g = 0 === (e + 1) % a;
                return "function" === typeof b ? g && b.call(d, e, d) : g
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
            const c = this.elements.slice(a, b);
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
            b.nodeType === Node.ELEMENT_NODE ? a(b) : b.nodeType === Node.TEXT_NODE && (b.nodeValue = b.nodeValue.toUpperCase())
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
            else if ("function" === typeof a) b = this.elements.filter((c,
                d) => a.call(c, d, c));
            else return console.warn("Invalid selector provided to has() method"), this;
            return this.endStack(b)
        } catch (b) {
            return console.error("Error in has() method:", b), this
        }
    },
    add: function(a) {
        var b = [];
        "string" === typeof a ? "<" === a.trim().charAt(0) && ">" === a.trim().charAt(a.trim().length - 1) ? (b = document.createElement("template"), b.innerHTML = a.trim(), b = Array.from(b.content.childNodes)) : b = Array.from(document.querySelectorAll(a)) : a instanceof Element ? b = [a] : a instanceof NodeList || a instanceof HTMLCollection ?
            b = Array.from(a) : Array.isArray(a) ? b = a.filter(c => c instanceof Element) : a instanceof DomQuery && (b = a.elements);
        this.elements = [...this.elements, ...b];
        this.length = this.elements.length;
        for (a = 0; a < this.length; a++) this[a] = this.elements[a];
        return this
    },
    addBack: function(a) {
        if (!this._prevObject) return this;
        let b = this.elements.slice();
        void 0 === a ? b = b.concat(this._prevObject.elements) : "string" === typeof a ? b = b.concat(this._prevObject.filter(a).elements) : "function" === typeof a ? b = b.concat(this._prevObject.filter((c, d) =>
            a.call(c, d, c)).elements) : a instanceof Node || a instanceof NodeList || Array.isArray(a) ? b = b.concat(Array.from(a)) : a instanceof DomQuery && (b = b.concat(a.elements));
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
                    const g = parseFloat(e.paddingTop);
                    e = parseFloat(e.paddingBottom);
                    d.style.height = `${Math.max(0,c-g-e)}px`
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
                    const g = parseFloat(e.paddingLeft);
                    e = parseFloat(e.paddingRight);
                    d.style.width = `${Math.max(0,c-g-e)}px`
                }
            });
            return this
        }
        console.warn("\ub0b4\ubd80 \ub108\ube44\ub97c \uacc4\uc0b0\ud558\uac70\ub098 \uc124\uc815\ud560 \uc694\uc18c\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.")
    },
    position: function(a, b = {}) {
        function c(h) {
            h = parseFloat(h.toFixed(4));
            return 0 === h % 1 ? Math.round(h) : h
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
            g = new WeakMap;
        const k = (h, m) => {
                if (!h || !h.getBoundingClientRect) return {
                    top: 0,
                    left: 0
                };
                if (g.has(h)) return g.get(h);
                m = h.getBoundingClientRect();
                a: if (e.has(h)) var n = e.get(h);
                    else {
                        for (var q = h; q && q !== document.body && q !== document.documentElement;) {
                            n = getComputedStyle(q).overflow;
                            if ("auto" === n || "scroll" === n) {
                                e.set(h, q);
                                n = q;
                                break a
                            }
                            q = q.parentElement
                        }
                        e.set(h, null);
                        n = null
                    } q = n ? n.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft ||
                    0;
                n = n ? n.scrollTop : window.pageYOffset || document.documentElement.scrollTop || 0;
                m = {
                    top: m.top + n,
                    left: m.left + q
                };
                var u = h.offsetParent;
                u && u !== document.body && u !== document.documentElement && (u = u.getBoundingClientRect(), m.top -= u.top + n, m.left -= u.left + q);
                n = getComputedStyle(h);
                q = parseFloat(n.marginTop) || 0;
                n = parseFloat(n.marginLeft) || 0;
                m.top -= q;
                m.left -= n;
                m.top = c(isNaN(m.top) ? 0 : m.top);
                m.left = c(isNaN(m.left) ? 0 : m.left);
                g.set(h, m);
                return m
            },
            f = () => {
                var h = d.elements.map(k);
                h = 1 < h.length ? h : h[0] || {
                    top: 0,
                    left: 0
                };
                document.getElementById("dynamicPositionInfo") &&
                    (document.getElementById("dynamicPositionInfo").textContent = `Left: ${h.left}, Top: ${h.top}`);
                return h
            },
            l = h => {
                a && "function" === typeof a && a.call(d, h);
                return h
            };
        return "function" === typeof a ? (b.useRAF ? requestAnimationFrame(() => {
            const h = f();
            l(h)
        }) : setTimeout(() => {
            const h = f();
            l(h)
        }, 0), d) : f()
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
            g = this[e] || (this[e] =
                new WeakMap),
            k = function(f, l) {
                if (1 !== f.nodeType) return 0;
                var h = g.get(f);
                if (h && !l) return h;
                h = window.getComputedStyle(f);
                if (f instanceof SVGElement) var m = "svg" === f.tagName.toLowerCase() ? parseFloat(f.getAttribute(d)) || f.viewBox && f.viewBox.baseVal[d] || parseFloat(h[d]) || 0 : f.getBBox()[d];
                else {
                    var n = h.display;
                    if ("none" === n) {
                        var q = f.style.position;
                        var u = f.style.visibility;
                        var v = f.style.display;
                        f.style.position = "absolute";
                        f.style.visibility = "hidden";
                        f.style.display = "block";
                        h = window.getComputedStyle(f)
                    }
                    m = parseFloat(h[d]) +
                        parseFloat(h["padding" + ("height" === d ? "Top" : "Left")]) + parseFloat(h["padding" + ("height" === d ? "Bottom" : "Right")]) + parseFloat(h["border" + ("height" === d ? "Top" : "Left") + "Width"]) + parseFloat(h["border" + ("height" === d ? "Bottom" : "Right") + "Width"]);
                    "none" === n && (f.style.position = q, f.style.visibility = u, f.style.display = v)
                }
                l && (m += parseFloat(h["margin" + ("height" === d ? "Top" : "Left")]) + parseFloat(h["margin" + ("height" === d ? "Bottom" : "Right")]));
                m = Math.round(m);
                g.set(f, m);
                return m
            };
        if (void 0 === b || "boolean" === typeof b) return c = !0 === b, k(a[0], c);
        b = parseFloat(b);
        a.forEach(function(f) {
            var l = window.getComputedStyle(f);
            k(f, !1);
            var h = b;
            f instanceof SVGElement || (h -= parseFloat(l["padding" + ("height" === d ? "Top" : "Left")]) + parseFloat(l["padding" + ("height" === d ? "Bottom" : "Right")]) + parseFloat(l["border" + ("height" === d ? "Top" : "Left") + "Width"]) + parseFloat(l["border" + ("height" === d ? "Bottom" : "Right") + "Width"]));
            c && (h -= parseFloat(l["margin" + ("height" === d ? "Top" : "Left")]) + parseFloat(l["margin" + ("height" === d ? "Bottom" : "Right")]));
            h = Math.max(0, h);
            if (f instanceof SVGElement) {
                if (f.setAttribute(d, h), "svg" === f.tagName.toLowerCase() && (f.style[d] = h + "px", l = f.getAttribute("viewBox"))) l = l.split(" "), l["width" === d ? 2 : 3] = h, f.setAttribute("viewBox", l.join(" "))
            } else f.style[d] = h + "px";
            g.delete(f)
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
                g = window;
            return {
                top: d.top + g.pageYOffset - e.clientTop,
                left: d.left + g.pageXOffset - e.clientLeft
            }
        }, b ? Array.prototype.map.call(this.elements, c) : c(this.elements[0]);
        this.elements.forEach(d => {
            if (1 === d.nodeType) {
                var e = this.offset.call({
                        elements: [d]
                    }),
                    g = a.top - e.top;
                e = a.left - e.left;
                "static" === window.getComputedStyle(d).position && (d.style.position = "relative");
                d.style.top = `${g}px`;
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
                }).forEach(([e, g]) => {
                    d.includes(e) || (b.style[e] = g)
                });
                b.setAttribute("data-border-color", "");
                b.setAttribute("data-border-width",
                    "1");
                b.setAttribute("data-event-initialized", "true");
                b.querySelectorAll("td, th").forEach(e => {
                    const g = e.getAttribute("style") || "";
                    Object.entries({
                        border: "1px solid rgb(0, 0, 0)",
                        padding: "6px",
                        "min-height": "18px",
                        height: "18px"
                    }).forEach(([k, f]) => {
                        g.includes(k) || (e.style[k] = f)
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
                d.querySelectorAll("table").forEach((e, g) => {
                    if ((g = e.parentElement) && g.classList.contains("tea24874")) {
                        var k = `table-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;
                        g.className = `table-${k} tea24874`;
                        g.style.position = "relative"
                    } else g = document.createElement("div"), k = `table-${Date.now()}-${Math.random().toString(36).substr(2,
9)}`, g.className = `table-${k} tea24874`, g.style.position = "relative", e.parentNode.insertBefore(g, e), g.appendChild(e);
                    e.setAttribute("data-symbol-type", "table-grid");
                    e.setAttribute("data-border-color", "");
                    e.setAttribute("data-border-width", "1");
                    e.setAttribute("data-event-initialized", "true");
                    e.id && e.id.startsWith("table-") || (e.id = `table-${Date.now()}-${Math.random().toString(36).substr(2,9)}`)
                })
            }, 100), setTimeout(() => {
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                d.querySelectorAll(".video-wrapper").forEach(e => {
                    const g = e.querySelector("iframe");
                    if (g) {
                        var k = g.style.width.match(/(\d+)%/);
                        if (k) {
                            k = parseInt(k[1]);
                            e.setAttribute("data-scale", k.toString());
                            const f = d.clientWidth * k / 100,
                                l = f / (16 / 9);
                            g.style.width = `${k}%`;
                            g.style.height = `${l}px`;
                            e.style.setProperty("--video-width", `${f}px`);
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
                        const e = (d.getAttribute("style") || "").split(";").filter(g =>
                            -1 === g.indexOf("height")).join(";");
                        d.setAttribute("style", e)
                    }
                }), [".symbol-controls", ".resize-handle", ".resize-handle-mobile", ".size-overlay"].forEach(d => {
                    c.querySelectorAll(d).forEach(e => e.remove())
                }), c.querySelectorAll(".video-wrapper").forEach(d => {
                    for (; d.firstChild;) {
                        const f = d.firstChild;
                        if ("IFRAME" === f.tagName) {
                            var e = f.getAttribute("style") || "",
                                g = e.match(/width:\s([\d.]+[%px])/);
                            e = e.match(/height:\s([\d.]+[%px])/);
                            if (g && e) {
                                g = g[1];
                                g = -1 !== g.indexOf("%") ? g : parseFloat(g) / contentArea.clientWidth * 100 +
                                    "%";
                                var k = g;
                                e = e[1];
                                if (-1 !== k.indexOf("%")) {
                                    k = parseFloat(k);
                                    const l = contentArea.clientWidth;
                                    e = parseFloat(e) / (k / 100 * l) * 100 + "%"
                                }
                                g = g.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                                e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                                f.setAttribute("width", g);
                                f.setAttribute("height", e)
                            }
                            f.removeAttribute("style");
                            f.hasAttribute("src") && ((g = f.getAttribute("src")) && g.toLowerCase().trim().startsWith("javascript:") ?
                                f.removeAttribute("src") : g && g.toLowerCase().trim().startsWith("data:") && !g.toLowerCase().includes("data:image/") && f.removeAttribute("src"));
                            f.setAttribute("sandbox", "allow-same-origin allow-scripts")
                        }
                        d.parentNode.insertBefore(f, d)
                    }
                    d.remove()
                }), c.querySelectorAll(".resizable-image").forEach(d => {
                    const e = d.querySelector("img");
                    if (e) {
                        if (e.hasAttribute("src")) {
                            const g = e.getAttribute("src");
                            g && g.toLowerCase().trim().startsWith("javascript:") ? e.removeAttribute("src") : g && g.toLowerCase().trim().startsWith("data:") &&
                                !g.toLowerCase().includes("data:image/") && e.removeAttribute("src")
                        }
                        d.parentNode.insertBefore(e, d)
                    }
                    d.remove()
                }), c.querySelectorAll('div[class*="table-"][class*="tea24874"]').forEach(d => {
                    var e = d.className.split(" ").filter(g => !g.startsWith("table-") && "tea24874" !== g);
                    0 === e.length ? ((e = d.querySelector("table")) && d.parentNode.insertBefore(e, d), d.remove()) : d.className = e.join(" ").trim()
                }), c.querySelectorAll("table[data-symbol-type]").forEach(d => {
                    d.removeAttribute("data-symbol-type")
                }), c.querySelectorAll("[data-symbol-type]").forEach(d => {
                    d.removeAttribute("data-symbol-type")
                }), c.querySelectorAll('[id^="symbol-"]').forEach(d => {
                    d.removeAttribute("id")
                }), c.querySelectorAll("*").forEach(d => {
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
                    g;
                for (; null !== (g = d.exec(a));) e.push({
                    index: g.index,
                    fullMatch: g[0],
                    key: g[1] || null,
                    commentStart: g.index,
                    commentEnd: g.index + g[0].length
                });
                e.forEach(k => {
                    var f = k.commentStart;
                    f = a.substring(Math.max(0, f - 500), f);
                    var l = f.lastIndexOf(">");
                    if (f = (0 <= l ? f.substring(l + 1) : f).replace(/<[^>]*>/g, "").trim().replace(/\s+/g, " ").trim()) l = document.createElement("span"), l.className = "domqGLG", l.textContent = f, k.key && l.setAttribute("data-comment-key", k.key.trim()), c.push(l)
                });
                return [...b, ...c]
            },
            extractJSContent: function(a) {
                return a.split("\n").filter(b => /\/\/\s*domqGLG/.test(b))
            },
            processdomqGLGElements: function(a) {
                const b = [];
                a.forEach((c, d) => {
                    const e = g => {
                        var k = "title value placeholder alt aria-label content".split(" ");
                        for (let f of g.attributes) {
                            const l = f.name,
                                h = f.value.trim();
                            k.includes(l) && h && b.push(h)
                        }
                        for (let f of g.childNodes) f.nodeType === Node.TEXT_NODE && (k = f.nodeValue.trim()) && b.push(k);
                        for (let f of g.children) e(f)
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
                    } catch (h) {
                        try {
                            return JSON.parse("[" +
                                l + "]")
                        } catch (m) {
                            try {
                                return JSON.parse("[" + l + "]")
                            } catch (n) {
                                return null
                            }
                        }
                    }
                }

                function d(l, h) {
                    if (Array.isArray(l)) return l.map(m => d(m, h));
                    if (l && "object" === typeof l) {
                        const m = {};
                        for (const n in l) l.hasOwnProperty(n) && (m[n] = d(l[n], h));
                        return m
                    }
                    return "string" === typeof l ? h : l
                }
                a = a.split("\n");
                let e = 0;
                for (let l = 0; l < a.length; l++) {
                    const h = a[l];
                    if (/\/\/\s*domqGLG/.test(h)) {
                        if (e >= b.length) break;
                        var g = b[e],
                            k = h.match(/^\s*([\[\{].+?[\]\}])\s*,?\s*\/\/\s*domqGLG/);
                        if (k) {
                            k = k[1].trim();
                            var f = c(k);
                            if (null !== f) {
                                g = d(f, g);
                                g = JSON.stringify(g);
                                a[l] = h.replace(k, g);
                                e++;
                                continue
                            }
                        }
                        if (k = h.match(/^\s*"[^"]+":\s*(.+?)\s*,?\s*\/\/\s*domqGLG/))
                            if (k = k[1].trim().replace(/,\s*$/, ""), f = c(k), null !== f) {
                                g = d(f, g);
                                g = JSON.stringify(g);
                                a[l] = h.replace(k, g);
                                e++;
                                continue
                            } if (k = h.match(/=\s*(.+?)\s*[;,]?\s*\/\/\s*domqGLG/))
                            if (k = k[1].trim().replace(/[;,]\s*$/, ""), k.startsWith("[") || k.startsWith("{")) {
                                if (f = c(k), null !== f) {
                                    g = d(f, g);
                                    g = JSON.stringify(g);
                                    a[l] = h.replace(k, g);
                                    e++;
                                    continue
                                }
                            } else {
                                k = k.replace(/^["'`]|["'`]$/g, "");
                                a[l] = h.replace(k, g);
                                e++;
                                continue
                            } k = [...h.matchAll(/(["'`])((?:[^\\]|\\.)*?)\1/g)];
                        for (const m of k)
                            if (k = m[1], m[2].replace(/\\(.)/g, "$1").trim()) {
                                f = g.replace(/\\/g, "\\\\").replace(new RegExp(k, "g"), "\\" + k);
                                a[l] = h.replace(m[0], `${k}${f}${k}`);
                                e++;
                                break
                            } if (k = h.match(/\/\/\s*(.+?)\s*\/\/\s*domqGLG/)) a[l] = h.replace(k[1], g), e++
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
            const k = document.createElement("div");
            k.className = "domquery-extraction-item";
            k.style.cssText = "\n\t\t\t\t\tborder: 1px solid #ddd;\n\t\t\t\t\tborder-radius: 8px;\n\t\t\t\t\tpadding: 2px;\n\t\t\t\t\tbackground:rgb(233, 229, 229);\n\t\t\t\t";
            const f = document.createElement("div");
            f.style.cssText = "display: flex; align-items: center; gap: 3px; flex-wrap: wrap;";
            const l = document.createElement("input");
            l.type = "text";
            l.placeholder = "e.g., test.html or test.js";
            l.style.cssText = "\n\t\t\t\t\tflex: 1;\n\t\t\t\t\tmin-width: 120px;\n\t\t\t\t\tpadding: 8px;\n\t\t\t\t\tborder: 1px solid #ddd;\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\tfont-size: 14px;\n\t\t\t\t";
            const h = document.createElement("button");
            h.textContent = "Extract";
            h.style.cssText = "\n\t\t\t\t\tbackground: #2196F3;\n\t\t\t\t\tcolor: white;\n\t\t\t\t\tborder: none;\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t\tmargin-left: 5px;\n\t\t\t\t";
            h.className = "domquery-extract-btn";
            f.appendChild(l);
            f.appendChild(h);
            k.appendChild(f);
            h.onclick = () => {
                let m = l.value.trim();
                if (m) {
                    var n = null;
                    n = m.toLowerCase().endsWith(".html") ? "html" : m.toLowerCase().endsWith(".js") ? "js" : (window.location.pathname || "").toLowerCase().endsWith(".js") ? "js" : "html";
                    h.disabled = !0;
                    h.textContent = "Extracting...";
                    window.domquery_extractSingleFile(m, n, function(q, u) {
                        h.disabled = !1;
                        h.textContent = "Extract";
                        q || alert("Extraction failed: " + (u && u.error ? u.error : "Failed to extract file. Please check the file path and try again."))
                    })
                }
            };
            return k
        })();
        a.appendChild(e);
        const g = k => {
            "Escape" === k.key && (document.body.removeChild(b), document.removeEventListener("keydown", g))
        };
        document.addEventListener("keydown", g);
        b.onclick = k => {
            k.target === b && (document.body.removeChild(b), document.removeEventListener("keydown", g))
        };
        c.onclick = k => {
            k.stopPropagation()
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
    _extractProcessJSLine: function(a, b, c, d, e, g = null) {
        var k = a.match(/domqGLG\s*\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*,\s*['"]([^'"]+)['"]\s*(?:,\s*[^)]+)?\s*\)/);
        if (k) return a = k[1] || k[2], b = k[3], a = a.replace(/\\(.)/g, "$1"), b = `Gong_${b}`, c[b] = DomQuery.prototype._convertQuotesForExtraction.call(this, a), b;
        if (!a.includes("// domqGLG")) return null;
        g || (k = a.match(/\/\/\s*domqGLG_(\w+)/)) && (g = k[1]);
        (k = DomQuery.prototype._extractTextFromJSLine.call(this, a)) || (k = DomQuery.prototype._extractProcessHTMLArrayComment.call(this, a));
        if (!k) return null;
        a = g ? `Gong_${g}` : DomQuery.prototype._extractGenerateAndRegisterKey.call(this, k, b, c, d, "Gong_", e);
        c[a] = DomQuery.prototype._convertQuotesForExtraction.call(this, k);
        return a
    },
    _extractGenerateAndRegisterKey: function(a, b, c, d, e, g) {
        e = e || "Gong_";
        if (g = b.get(a)) return g;
        g = DomQuery.prototype._extractGenerateKey.call(this,
            a);
        g = e = `${e}${g}`;
        c.hasOwnProperty(e) ? (d[e] = (d[e] || 0) + 1, g = `${e}_${d[e]}`) : d[e] = 0;
        b.set(a, g);
        return g
    },
    _extractAnalyzeDynamicElements: function(a, b, c, d, e, g) {
        const k = this,
            f = [];
        a = a.split("\n");
        const l = new Map;
        for (let n = 0; n < a.length; n++) {
            var h = a[n].trim(),
                m = h.match(/(\w+)\s*=\s*document\.createElement\(['"](button|img|a)['"]\)/i);
            if (m) h = m[1], m = m[2].toUpperCase(), l.has(h) || l.set(h, {
                varName: h,
                tagName: m,
                attributes: {},
                textContent: null,
                hasDomqGLG: !1
            });
            else
                for (const [q, u] of l.entries())
                    if (h.includes(q))
                        if (h.includes(`${q}.className`) &&
                            h.includes("domqGLG")) u.hasDomqGLG = !0;
                        else if (h.includes(`${q}.classList.add`) && h.includes("domqGLG")) u.hasDomqGLG = !0;
            else if (h.includes(`${q}.setAttribute('class'`) && h.includes("domqGLG")) u.hasDomqGLG = !0;
            else {
                if (h.includes(`${q}.setAttribute`) && h.includes("// domqGLG") && (m = h.match(/\/\/\s*domqGLG\s+\[['"]([^'"]+)['"]\]/))) {
                    u.hasDomqGLG = !0;
                    const v = h.match(/\.setAttribute\(['"](value|title|aria-label|alt)['"]/);
                    v && (u.attributes[v[1]] = m[1]);
                    continue
                }
                if (h.includes(`${q}.textContent`) && h.includes("// domqGLG") &&
                    (m = h.match(/\/\/\s*domqGLG\s+\[['"]([^'"]+)['"]\]/))) {
                    u.hasDomqGLG = !0;
                    u.textContent = m[1];
                    continue
                }
                h.includes("appendChild") && h.includes(q) && u.hasDomqGLG && (0 < Object.keys(u.attributes).length || u.textContent) && (f.push({
                    ...u
                }), l.delete(q))
            }
        }
        for (const n of l.values()) n.hasDomqGLG && (0 < Object.keys(n.attributes).length || n.textContent) && f.push({
            ...n
        });
        f.forEach(n => {
            var q = [];
            "BUTTON" === n.tagName ? (n.textContent && q.push(`text:${n.textContent}`), n.attributes.value && q.push(`value:${n.attributes.value}`), n.attributes.title &&
                q.push(`title:${n.attributes.title}`), n.attributes["aria-label"] && q.push(`aria-label:${n.attributes["aria-label"]}`)) : "IMG" === n.tagName ? (n.attributes.alt && q.push(`alt:${n.attributes.alt}`), n.attributes.title && q.push(`title:${n.attributes.title}`), n.attributes["aria-label"] && q.push(`aria-label:${n.attributes["aria-label"]}`)) : "A" === n.tagName && (n.textContent && q.push(`text:${n.textContent}`), n.attributes.title && q.push(`title:${n.attributes.title}`), n.attributes["aria-label"] && q.push(`aria-label:${n.attributes["aria-label"]}`));
            if (0 < q.length) {
                q = q.join(", ");
                n = DomQuery.prototype._convertQuotesForExtraction.call(k, q);
                let u = q = `Yoon_${DomQuery.prototype._extractGenerateHTMLKey.call(k,q,e,g)}`;
                c.hasOwnProperty(q) && (d[q] = (d[q] || 0) + 1, u = `${q}_${d[q]}`);
                q = u;
                c[q] = n;
                b.set(n, q);
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
            g = {},
            k = new Map,
            f = {},
            l = new Map,
            h = [],
            m = (r, x, y, z) => {
                if (l.has(r)) {
                    const A = l.get(r);
                    console.warn(`\u26a0\ufe0f \uc911\ubcf5\ub41c \uace0\uc720\uac12 \ubc1c\uacac: "${r}" (${x})\n` + `   \uc774\uc804 \uc704\uce58: ${c}:${A.lineNumber}\uc904\n` + `   \ud604\uc7ac \uc704\uce58: ${c}:${y}\uc904\n` + `   \ucee8\ud14d\uc2a4\ud2b8: ${z}`);
                    h.push({
                        uniqueValue: r,
                        keyType: x,
                        previousLine: A.lineNumber,
                        currentLine: y,
                        context: z
                    })
                } else l.set(r, {
                    lineNumber: y,
                    context: z
                })
            };
        for (var n = /\x3c!--\s*domqGLG_(\w+)(?:\s+(\[.*?\]))?\s*--\x3e/g, q; null !== (q = n.exec(a));) {
            var u = q[1],
                v = q[2],
                B = `Tae_${u}`,
                D = a.substring(0, q.index).split("\n").length;
            const r = a.substring(Math.max(0, q.index - 50), Math.min(a.length, q.index + 50)).replace(/\n/g, " ");
            m(u, "Tae_", D, r);
            u = [];
            v && (D = v.match(/['"]TAG:([^'"]+)['"]/)) && (u = D[1].split(",").map(x => x.trim().toUpperCase()), v = v.replace(/,?\s*['"]TAG:[^'"]+['"]\s*,?/g, ""), "[]" === v.trim() || "[,]" ===
                v.trim()) && (v = null);
            if (v) v.match(/\[([^\]]+)\]/) && (g[B] = DomQuery.prototype._convertQuotesForExtraction.call(e, v));
            else if (q = a.substring(Math.max(0, q.index - 200), q.index), v = q.match(/\$alert\s*\(\s*['"]([^'"]+)['"]\s*\)$/)) g[B] = DomQuery.prototype._convertQuotesForExtraction.call(e, v[1]);
            else {
                let x = "";
                (v = q.match(/>([^<]+)<\/(\w+)>\s*$/)) ? x = v[1]: (v = q.lastIndexOf(">"), v = 0 <= v ? q.substring(v + 1) : q, x = (q = q.match(/(?:<(\w+)[^>]*>)([^<]*?)(?:<\/\1>)\s*$/)) && q[2] ? q[2] : v);
                0 < u.length && u.forEach(y => {
                    x = x.replace(new RegExp(`<${y}[^>]*>.*?</${y}>`,
                        "gi"), "")
                });
                (u = DomQuery.prototype._extractNormalizeText.call(e, x)) && (g[B] = DomQuery.prototype._convertQuotesForExtraction.call(e, u))
            }
        }
        b = b.querySelectorAll('[class*="domqGLG"]');
        let p = 0;
        b.forEach((r, x) => {
            if (x = Array.from(r.classList).find(z => z.startsWith("domqGLG_"))) {
                x = x.replace("domqGLG_", "");
                r = r.outerHTML;
                var y = a.indexOf(r);
                y = 0 <= y ? a.substring(0, y).split("\n").length : 0;
                r = r.substring(0, 100).replace(/\n/g, " ");
                m(x, "Yoon_", y, r)
            }
        });
        const t = (r, x, y = null) => {
                if (y) return `Yoon_${y}`;
                x = r = `Yoon_${DomQuery.prototype._extractGenerateHTMLKey.call(e,
r,x,c)}`;
                g.hasOwnProperty(r) && (f[r] = (f[r] || 0) + 1, x = `${r}_${f[r]}`);
                return x
            },
            w = (r, x) => {
                r = DomQuery.prototype._convertQuotesForExtraction.call(e, r);
                g[x] = r;
                k.set(r, x)
            },
            C = (r, x = [], y = []) => {
                var z = Array.from(r.classList).find(J => J.startsWith("domqGLG_"));
                z = z ? z.replace("domqGLG_", "") : null;
                if ("SELECT" === r.tagName && (r.classList.contains("domqGLG") || z)) r = Array.from(r.querySelectorAll("option")).map(J => {
                    const G = J.getAttribute("value") || "";
                    J = DomQuery.prototype._extractNormalizeText.call(e, J.textContent);
                    return G ?
                        `${G}:${J}` : J
                }).filter(J => J), 0 < r.length && (r = r.join(", "), z ? w(r, `Yoon_${z}`) : k.get(r) || (z = t(r, p), w(r, z), p++));
                else if ("OPTION" !== r.tagName && !r.closest("select") && !y.includes(r.tagName)) {
                    x = [...x];
                    if (r.classList.contains("domqGLG") || z)
                        if (y = r.getAttribute("data-exclude-tags"))
                            if (y = y.match(/TAG:([^,]+(?:,[^,]+)*)/)) y = y[1].split(",").map(J => J.trim().toUpperCase()), x = [...x, ...y];
                    if (0 === r.children.length)
                        if ("INPUT" !== r.tagName && "TEXTAREA" !== r.tagName || !r.classList.contains("domqGLG") && !z)
                            if ("BUTTON" === r.tagName &&
                                (r.classList.contains("domqGLG") || z)) {
                                x = r.getAttribute("value") || "";
                                y = r.getAttribute("title") || "";
                                var A = r.getAttribute("aria-label") || "";
                                r = DomQuery.prototype._extractNormalizeText.call(e, r.textContent) || "";
                                var E = [];
                                r && E.push(`text:${r}`);
                                x && E.push(`value:${x}`);
                                y && E.push(`title:${y}`);
                                A && E.push(`aria-label:${A}`);
                                0 < E.length && (r = E.join(", "), z ? w(r, `Yoon_${z}`) : (z = t(r, p), w(r, z), p++))
                            } else if ("IMG" === r.tagName && (r.classList.contains("domqGLG") || z)) x = r.getAttribute("alt") || "", y = r.getAttribute("title") ||
                        "", r = r.getAttribute("aria-label") || "", A = [], x && A.push(`alt:${x}`), y && A.push(`title:${y}`), r && A.push(`aria-label:${r}`), 0 < A.length && (r = A.join(", "), z ? w(r, `Yoon_${z}`) : (z = t(r, p), w(r, z), p++));
                    else if ("A" === r.tagName && (r.classList.contains("domqGLG") || z)) x = r.getAttribute("title") || "", y = r.getAttribute("aria-label") || "", r = DomQuery.prototype._extractNormalizeText.call(e, r.textContent) || "", A = [], r && A.push(`text:${r}`), x && A.push(`title:${x}`), y && A.push(`aria-label:${y}`), 0 < A.length && (r = A.join(", "), z ? w(r, `Yoon_${z}`) :
                        (z = t(r, p), w(r, z), p++));
                    else if ("META" === r.tagName && (r.classList.contains("domqGLG") || z)) A = r.getAttribute("content") || "", x = r.getAttribute("name") || "", y = r.getAttribute("property") || "", r = r.getAttribute("http-equiv") || "", E = [], A && (A = DomQuery.prototype._extractNormalizeText.call(e, A)) && (y ? E.push(`property:${y}, content:${A}`) : x ? E.push(`name:${x}, content:${A}`) : r ? E.push(`http-equiv:${r}, content:${A}`) : E.push(`content:${A}`)), 0 < E.length && (r = E.join(", "), z ? w(r, `Yoon_${z}`) : (z = t(r, p), w(r, z), p++));
                    else {
                        if (r =
                            DomQuery.prototype._extractNormalizeText.call(e, r.textContent)) z ? w(r, `Yoon_${z}`) : k.get(r) || (z = t(r, p), w(r, z), p++)
                    } else x = r.getAttribute("placeholder") || "", y = r.getAttribute("value") || "", A = r.getAttribute("title") || "", r = r.getAttribute("aria-label") || "", E = [], x && E.push(`placeholder:${x}`), y && E.push(`value:${y}`), A && E.push(`title:${A}`), r && E.push(`aria-label:${r}`), 0 < E.length && (r = E.join(", "), z ? w(r, `Yoon_${z}`) : (z = t(r, p), w(r, z), p++));
                    else "html" === (r.getAttribute("data-extract-mode") || "text") ? (r = r.innerHTML,
                        x = DomQuery.prototype._extractNormalizeText.call(e, r)) : x = r = DomQuery.prototype._extractNormalizeText.call(e, r.textContent), x && (z ? (z = `Yoon_${z}`, g[z] = DomQuery.prototype._convertQuotesForExtraction.call(e, r.trim()), k.set(x, z)) : k.get(x) || (y = z = `Yoon_${DomQuery.prototype._extractGenerateHTMLKey.call(e,x,p,c)}`, g.hasOwnProperty(z) && (f[z] = (f[z] || 0) + 1, y = `${z}_${f[z]}`), g[y] = DomQuery.prototype._convertQuotesForExtraction.call(e, r.trim()), k.set(x, y), p++))
                }
            };
        b.forEach(r => {
            C(r)
        });
        for (b = /<script[^>]*>([\s\S]*?)<\/script>/gi; null !==
            (n = b.exec(a));) {
            B = n[1];
            p = DomQuery.prototype._extractAnalyzeDynamicElements.call(e, B, k, g, f, p, c);
            B = B.split("\n");
            const r = a.substring(0, n.index).split("\n").length;
            B.forEach((x, y) => {
                var z = x.match(/\/\/\s*domqGLG_(\w+)/);
                let A = null;
                z && (A = z[1], y = r + y, z = x.substring(0, 100).replace(/\n/g, " "), m(A, "Gong_", y, z));
                DomQuery.prototype._extractProcessJSLine.call(e, x, k, g, f, c, A)
            })
        }
        0 < h.length && alert(`\u26a0\ufe0f \uc911\ubcf5\ub41c \uace0\uc720\uac12\uc774 ${h.length}\uac1c \ubc1c\uacac\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\n` +
            "\ucf58\uc194 \ub85c\uadf8\ub97c \ud655\uc778\ud558\uc5ec \uc911\ubcf5 \uc704\uce58\ub97c \ud655\uc778\ud558\uc138\uc694.\n\n" + `\ud30c\uc77c: ${c}`);
        b = DomQuery.prototype._extractDownloadJSON.call(e, g, c, "html");
        d(!0, b)
    },
    _extractProcessJS: function(a, b, c) {
        const d = {},
            e = new Map,
            g = {};
        a = a.split("\n");
        const k = new Map,
            f = [];
        for (let m = 0; m < a.length; m++) {
            const n = a[m];
            var l = m + 1;
            if (!/\/\/\s*domqGLG/.test(n)) continue;
            var h = n.match(/\/\/\s*domqGLG_(\w+)/);
            let q = null;
            if (h) {
                q = h[1];
                const u = n.substring(0, 100).replace(/\n/g,
                    " ");
                h = q;
                if (k.has(h)) {
                    const v = k.get(h);
                    console.warn(`\u26a0\ufe0f \uc911\ubcf5\ub41c \uace0\uc720\uac12 \ubc1c\uacac: "${h}" (${"Gong_"})\n` + `   \uc774\uc804 \uc704\uce58: ${b}:${v.lineNumber}\uc904\n` + `   \ud604\uc7ac \uc704\uce58: ${b}:${l}\uc904\n` + `   \ucee8\ud14d\uc2a4\ud2b8: ${u}`);
                    f.push({
                        uniqueValue: h,
                        keyType: "Gong_",
                        previousLine: v.lineNumber,
                        currentLine: l,
                        context: u
                    })
                } else k.set(h, {
                    lineNumber: l,
                    context: u
                })
            }(l = n.match(/\/\/\s*domqGLG_(\w+)\s+(\[[^\]]+\])/)) ? d[`Tae_${l[1]}`] = l[2]: DomQuery.prototype._extractProcessJSLine.call(this,
                n, e, d, g, b, q)
        }
        0 < f.length && alert(`\u26a0\ufe0f \uc911\ubcf5\ub41c \uace0\uc720\uac12\uc774 ${f.length}\uac1c \ubc1c\uacac\ub418\uc5c8\uc2b5\ub2c8\ub2e4.\n\n` + "\ucf58\uc194 \ub85c\uadf8\ub97c \ud655\uc778\ud558\uc5ec \uc911\ubcf5 \uc704\uce58\ub97c \ud655\uc778\ud558\uc138\uc694.\n\n" + `\ud30c\uc77c: ${b}`);
        b = DomQuery.prototype._extractDownloadJSON.call(this, d, b, "js");
        c(!0, b)
    },
    _extractSingleFile: function(a, b, c) {
        c = c || function(e, g) {};
        const d = this;
        try {
            if ("html" === b) {
                const e = window.location.pathname || window.location.href.split("/").pop() ||
                    "",
                    g = e.split("/").pop() || "",
                    k = a.split("/").pop() || a;
                g && (g === k || e.includes(k)) ? DomQuery.prototype._extractProcessHTML.call(d, document.body.innerHTML, document.body, a, c) : fetch(a).then(f => {
                    if (!f.ok) throw Error(`HTTP error! status: ${f.status}`);
                    return f.text()
                }).then(f => {
                    const l = document.createElement("div");
                    l.innerHTML = f;
                    DomQuery.prototype._extractProcessHTML.call(d, f, l, a, c)
                }).catch(f => {
                    c(!1, {
                        error: f.message
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
                        await new Promise(d => setTimeout(d, 100));
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
            if ("function" === typeof window.decrypt) return await window.decrypt(a, b);
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
        for (let g = 0; g < b; g++) {
            let k;
            var e = 0;
            do
                if (k = ((a + 17 * g) % b + (3 * a + 7 * g + 1) % b * 2) % b, a = (5 * a + 11 * g + 1) % 1E7, e++, 200 < e) {
                    for (e = 0; e < b; e++)
                        if (!d.has(e)) {
                            k = e;
                            break
                        } break
                } while (d.has(k));
            c[g] = k;
            d.add(k)
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
                        g = c.decryptKeyParts;
                    if (!g || 5 !== g.length) throw Error("\ub77c\uc774\uc13c\uc2a4\uc5d0 \ubcf5\ud638\ud654 \ud0a4 \ubd80\ubd84\uc774 \uc62c\ubc14\ub974\uac8c \ud3ec\ud568\ub418\uc5b4 \uc788\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. (5\uac1c \ubd80\ubd84 \ud544\uc694)");
                    a = DomQuery.prototype._decryptRestoreKeyParts.call(this, g, e).join("");
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
        const g = b.getUint32(c, !0);
        c += 4;
        const k = [];
        for (let f = 0; f < g; f++) {
            const l = b.getUint32(c, !0);
            k.push(l);
            c += 4
        }
        return {
            offset: c,
            originalSize: d,
            storedChunkSize: e,
            storedTotalChunks: g,
            chunkSizes: k,
            uint8View: a
        }
    },
    _decryptDecryptChunks: async function(a,
        b, c) {
        const d = this,
            e = Array(a.length);
        c = [];
        for (let k = 0; k < a.length; k++) {
            const f = a[k];
            var g = (async () => {
                try {
                    const l = await DomQuery.prototype._decryptDecryptChunk.call(d, f, b);
                    return {
                        index: k,
                        data: l
                    }
                } catch (l) {
                    throw console.error(`\uccad\ud06c ${k+1} AES \ubcf5\ud638\ud654 \uc2e4\ud328:`, l), Error(`\uccad\ud06c ${k+1} \ubcf5\ud638\ud654 \uc2e4\ud328: ${l.message}`);
                }
            })();
            c.push(g)
        }
        for (a = 0; a < c.length; a += 5) g = c.slice(a, a + 5), (await Promise.all(g)).forEach(k => {
            e[k.index] = k.data
        });
        return e
    },
    _decryptCombineChunks: function(a,
        b, c) {
        let d = new Uint8Array(b),
            e = 0;
        for (let g = 0; g < a.length; g++) {
            const k = a[g],
                f = g === a.length - 1 ? b - e : c;
            for (let l = 0; l < f && l < k.length; l++) d[e + l] = k.charCodeAt(l);
            e += f
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
            const g = await DomQuery.prototype._decryptDecompressGzip.call(this, d),
                k = DomQuery.prototype._decryptParseBinaryHeader.call(this,
                    g);
            await DomQuery.prototype._decryptLoadAESJS.call(this);
            a = [];
            let f = k.offset;
            for (d = 0; d < k.storedTotalChunks; d++) {
                const n = k.chunkSizes[d],
                    q = k.uint8View.slice(f, f + n);
                f += n;
                const u = (new TextDecoder).decode(q);
                a.push(u)
            }
            const l = await DomQuery.prototype._decryptDecryptChunks.call(this, a, e, k.chunkSizes),
                h = DomQuery.prototype._decryptCombineChunks.call(this, l, k.originalSize, k.storedChunkSize),
                m = DomQuery.prototype._decryptDecodeText.call(this, h);
            c = await DomQuery.prototype._decryptExecuteScript.call(this, m);
            DomQuery.prototype._decryptCleanupKey.call(this);
            c && c.parentNode && c.parentNode.removeChild(c);
            c = null;
            b && b(null)
        } catch (e) {
            console.error("\u274c language.js.zip \ub85c\ub4dc \uc2e4\ud328:", e);
            if (c && c.parentNode) try {
                c.parentNode.removeChild(c)
            } catch (g) {
                console.warn("\u274c \uc2a4\ud06c\ub9bd\ud2b8 \uc694\uc18c \uc81c\uac70 \uc2e4\ud328:", g)
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
                g = window.devicePixelRatio ||
                1,
                k = 0 < a.maxTouchPoints || "ontouchstart" in window,
                f = (a.vendor || "").toLowerCase(),
                l = "unknown",
                h = !1,
                m = !1,
                n = !1,
                q = !1,
                u = !1;
            /\bCrOS\b/i.test(c) ? (l = "chromeos", u = !0) : /macintosh/i.test(c) ? 500 > d && 1E3 > e || 1E3 > d && 500 > e || (600 > d || 600 > e) && 450 > d ? (l = "ios", h = !0) : k && 1 < a.maxTouchPoints ? (l = "ios", h = !0) : (l = "macos", n = !0) : /iphone|ipod/i.test(c) ? (l = "ios", h = !0) : /ipad/i.test(c) ? (l = "ios", h = !0) : /android/i.test(c) ? (l = "android", m = !0) : /linux/i.test(c) && k && !u ? (l = "android", m = !0) : /windows|win32|win64|wow64/i.test(c) ? (l = "windows", q = !0) :
                /linux|x11/i.test(c) && (l = "linux");
            var v = !1,
                B = null,
                D = null,
                p = {
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
            for (A in p)
                if (p[A].test(c)) {
                    D = A;
                    break
                } if (h) {
                var t = !(!window.webkit || !window.webkit.messageHandlers),
                    w = !!(window.webkit || window.ReactNativeWebView || window.flutter_inappwebview || window.cordova),
                    C = !c.includes("safari/") || c.includes("version/") && !c.includes("mobile/");
                (v = t || w || null !== D || C && !a.standalone && !/crios|fxios|edgios|opios/i.test(c)) && (B = "ios")
            } else if (m) {
                var r = !!(window.Android || window.AndroidBridge || window.ReactNativeWebView ||
                        window.flutter_inappwebview || window.cordova),
                    x = /\bwv\b/i.test(c),
                    y = /version\/[\d.]+.*?chrome/i.test(c) && !/ chrome\/[\d.]+/i.test(c),
                    z = c.includes("chrome/") && x && !/samsungbrowser|opr\/|edg\//i.test(c);
                (v = r || x || y || null !== D || z) && (B = "android")
            }
            var A = "desktop";
            if (/smart-?tv|googletv|appletv|roku|tizen|webos|hbbtv/i.test(c)) A = "tv";
            else if (/playstation|xbox|nintendo|wii/i.test(c)) A = "console";
            else if (h)
                if (/macintosh/i.test(c)) {
                    var E = d / g;
                    A = 450 > E || 500 > d && 1E3 > e ? "mobile" : 900 > E || 1E3 > d && 1E3 > e ? "tablet" : "mobile"
                } else /ipad/i.test(c) ||
                    k && 1 < a.maxTouchPoints && /macintosh/i.test(c) ? A = "tablet" : /iphone|ipod/i.test(c) ? A = "mobile" : (E = d / g, 450 > E ? A = "mobile" : 900 > E && (A = "tablet"));
            else if (m) {
                var J = /mobile/i.test(c),
                    G = /tablet/i.test(c);
                E = d / g;
                var P = Math.min(d, e) / g;
                J = !J || G;
                E = 600 <= E || 600 <= P;
                var I = 2.1 > Math.max(d, e) / Math.min(d, e);
                A = G || J && E || E && I && 3 > g ? "tablet" : "mobile"
            } else if (u) A = k ? "tablet" : "desktop";
            else if (/mobile|phone/i.test(c)) A = "mobile";
            else if (k && "desktop" === A) {
                E = d / g;
                var N = Math.sqrt(d * d + e * e) / g;
                if (450 > E || 700 > N) A = "mobile";
                else if (900 > E || 1300 >
                    N) A = "tablet"
            }
            G = "unknown";
            I = "";
            v ? G = "webview" : /edg(?:e|ios|a)\//i.test(c) ? (G = "edge", I = (c.match(/edg(?:e|ios|a)\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /opr\//i.test(c) || /opera/i.test(c) && !/mini/i.test(c) ? (G = "opera", I = (c.match(/(?:opr|opera)\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /samsungbrowser/i.test(c) ? (G = "samsung", I = (c.match(/samsungbrowser\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /chrome|crios|crmo/i.test(c) ? (G = "chrome", I = (c.match(/(?:chrome|crios|crmo)\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /safari/i.test(c) && /apple/i.test(f) ?
                (G = "safari", I = (c.match(/version\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /firefox|fxios/i.test(c) ? (G = "firefox", I = (c.match(/(?:firefox|fxios)\/(\d+(?:\.\d+)?)/i) || [])[1] || "") : /trident|msie/i.test(c) && (G = "ie", I = (c.match(/(?:msie |rv:)(\d+(?:\.\d+)?)/i) || [])[1] || "");
            DomQuery.prototype._deviceInfoCache = {
                platform: l,
                deviceType: A,
                browser: G,
                browserVersion: I,
                isIOS: h,
                isAndroid: m,
                isMacOS: n,
                isWindows: q,
                isChromeOS: u,
                isPC: ("windows" === l || "macos" === l || "linux" === l || "chromeos" === l) && "desktop" === A,
                isMobile: "mobile" === A,
                isTablet: "tablet" ===
                    A,
                isDesktop: "desktop" === A,
                isTV: "tv" === A,
                isConsole: "console" === A,
                isWebView: v,
                webViewType: B,
                inAppBrowser: D,
                isSafari: "safari" === G,
                isChrome: "chrome" === G,
                isFirefox: "firefox" === G,
                isEdge: "edge" === G,
                isSamsungBrowser: "samsung" === G,
                userAgent: b,
                screenWidth: d,
                screenHeight: e,
                pixelRatio: g,
                hasTouch: k,
                orientation: d && e ? d > e ? "landscape" : "portrait" : null,
                maxTouchPoints: a.maxTouchPoints || 0,
                isIPad: /ipad/i.test(c) || h && "tablet" === A,
                isIPadOS13Plus: /macintosh/i.test(c) && h,
                isStandalone: !!a.standalone
            };
            return DomQuery.prototype._deviceInfoCache
        } catch (O) {
            return console.error("Device detection error:",
                O), DomQuery.prototype._deviceInfoCache = {
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
                _error: O.message
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
                var g = e.preventBack;
                e.preventBack = !0;
                window._domqueryStateManager.closingStates.set(b, !0);
                if ("function" ===
                    typeof a.options.onCloseStart) a.options.onCloseStart(c.count);
                var k = !1;
                d = function() {
                    if (!k) {
                        k = !0;
                        c.count = Math.max(0, c.count - 1);
                        var f = window._domqueryStateManager.registrationOrder[window._domqueryStateManager.registrationOrder.length - 1];
                        f && f.key === a.key && window._domqueryStateManager.registrationOrder.pop();
                        0 >= c.count && (c.isActive = !1, window._domqueryStateManager.activeHistories.delete(b));
                        window._domqueryStateManager.closingStates.delete(b);
                        e.preventBack = g;
                        window._domqueryStateManager.doneCallbackTime =
                            Date.now()
                    }
                };
                if ("function" === typeof a.options.onCloseEnd) a.options.onCloseEnd(c.count, d);
                else d()
            }
    },
    _historyOn: function(a, b, c, d, e) {
        let g = "default_history_key",
            k = null;
        var f = null;
        let l = !1,
            h = null;
        "string" === typeof a ? (g = a, k = "function" === typeof b ? b : null, l = "boolean" === typeof c ? c : !1, f = "function" === typeof d ? d : "function" === typeof c ? c : null, h = e && "object" === typeof e ? e : null) : "function" === typeof a ? (k = a, l = "boolean" === typeof b ? b : !1, f = "function" === typeof c ? c : null, h = d && "object" === typeof d ? d : null) : "boolean" === typeof a &&
            (l = a);
        window.popstateHandlerRegistered || (window.addEventListener("popstate", function(m) {
            if (window._domqueryStateManager.isButtonBack) window._domqueryStateManager.isButtonBack = !1;
            else {
                var n = Date.now();
                if (!(window._domqueryStateManager.doneCallbackTime && 100 > n - window._domqueryStateManager.doneCallbackTime || 100 > n - window._domqueryStateManager.lastPopstateTime)) {
                    window._domqueryStateManager.lastPopstateTime = n;
                    if (m.state && m.state.key && (n = window._domqueryStateManager.histories.get(m.state.key)) && (!n.isActive ||
                            n.count < m.state.count)) {
                        n.count = m.state.count;
                        n.isActive = !0;
                        window._domqueryStateManager.activeHistories.add(m.state.key);
                        window._domqueryStateManager.registrationOrder.push({
                            key: m.state.key.replace("gong_tea_yun_", ""),
                            preventBack: m.state.preventBack,
                            options: m.state.hasOptions ? n.options : null,
                            onBackCallback: n.finalOnBackCallback
                        });
                        n.onCallback?.(n.count);
                        return
                    }
                    if (n = window._domqueryStateManager.registrationOrder[window._domqueryStateManager.registrationOrder.length - 1])
                        if (n.options && n.options.target) DomQuery.prototype._handlePanelCloseWithTarget.call({},
                            n);
                        else {
                            var q = "gong_tea_yun_" + n.key,
                                u = window._domqueryStateManager.histories.get(q);
                            if (u && !u.preventBack) {
                                if (u.count = Math.max(0, u.count - 1), window._domqueryStateManager.registrationOrder.pop(), 0 >= u.count && (u.isActive = !1, window._domqueryStateManager.activeHistories.delete(q)), u.callback?.(u.count), u.finalOnBackCallback?.(u.count), n.onBackCallback && n.onBackCallback !== u.finalOnBackCallback) n.onBackCallback(u.count)
                            } else {
                                q = null;
                                for (const [, v] of window._domqueryStateManager.histories)
                                    if (v.isActive && v.preventBack &&
                                        0 < v.count) {
                                        q = v;
                                        break
                                    } if (q) {
                                    q.finalOnBackCallback?.(q.count);
                                    if (n.onBackCallback && n.onBackCallback !== q.finalOnBackCallback) n.onBackCallback(q.count);
                                    (!m.state || m.state && !m.state.isBlocker) && history.forward()
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
        g = "gong_tea_yun_" + g.replace(/[^a-zA-Z0-9_]/g, "");
        window._domqueryStateManager.histories.has(g) || window._domqueryStateManager.histories.set(g, {
            count: 0,
            trueCount: 0,
            falseCount: 0,
            callback: k,
            onCallback: k,
            finalOnBackCallback: f,
            isMinusCall: !1,
            isActive: !1,
            lastStateIndex: -1,
            preventBack: l,
            options: h
        });
        a = window._domqueryStateManager.histories.get(g);
        a.callback = k;
        a.onCallback = k;
        a.finalOnBackCallback = f;
        a.isActive = !0;
        a.preventBack = l;
        a.options = h;
        window._domqueryStateManager.activeHistories.add(g);
        window._domqueryStateManager.registrationOrder.push({
            key: g.replace("gong_tea_yun_", ""),
            preventBack: l,
            options: h,
            onBackCallback: f
        });
        window._domqueryStateManager.stateIndex++;
        f = a.count + 1;
        a.count = f;
        a.lastStateIndex = window._domqueryStateManager.stateIndex;
        l ? (a.trueCount++, window._domqueryStateManager.stats.totalTrueCount++) : (a.falseCount++, window._domqueryStateManager.stats.totalFalseCount++);
        try {
            history.pushState({
                key: g,
                count: f,
                stateIndex: window._domqueryStateManager.stateIndex,
                preventBack: l,
                hasOptions: !!h,
                targetKey: h?.target
            }, ""), "function" === typeof k && k(f)
        } catch (m) {
            console.error("History state update failed:", m)
        }
        return f
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
            var g =
                d.replace("gong_tea_yun_", ""),
                k = null,
                f = -1;
            for (var l = window._domqueryStateManager.registrationOrder.length - 1; 0 <= l; l--)
                if (window._domqueryStateManager.registrationOrder[l].key === g) {
                    k = window._domqueryStateManager.registrationOrder[l];
                    f = l;
                    break
                } l = window._domqueryStateManager.registrationOrder[window._domqueryStateManager.registrationOrder.length - 1];
            if (!k) return "function" === typeof e && e(0, 0), 0;
            k = f === window._domqueryStateManager.registrationOrder.length - 1;
            if (!k) window._domqueryStateManager.registrationOrder.splice(f,
                1);
            else if (l && g !== l.key) return "function" === typeof e && e(0, 0), 0;
            window._domqueryStateManager.isButtonBack = !0;
            g = window._domqueryStateManager.histories.get(d);
            if (!g || 0 >= g.count || !g.isActive) {
                window._domqueryStateManager.activeHistories.delete(d);
                g && (g.isActive = !1, g.count = 0);
                var h = 0;
                g = !1;
                for (var [, m] of window._domqueryStateManager.histories) m.isActive && 0 < m.count && (h += m.count, m.preventBack && (g = !0));
                "function" === typeof e && e(0, h);
                0 !== h || g || window.history.go(-1);
                return 0
            }
            m = d.replace("gong_tea_yun_", "");
            if (k)
                for (f =
                    window._domqueryStateManager.registrationOrder.length - 1; 0 <= f; f--)
                    if (window._domqueryStateManager.registrationOrder[f].key === m) {
                        window._domqueryStateManager.registrationOrder.splice(f, 1);
                        break
                    } m = g.count - 1;
            g.count = m;
            g.isMinusCall = !0;
            g.preventBack ? (g.trueCount = Math.max(0, g.trueCount - 1), window._domqueryStateManager.stats.totalTrueCount = Math.max(0, window._domqueryStateManager.stats.totalTrueCount - 1)) : (g.falseCount = Math.max(0, g.falseCount - 1), window._domqueryStateManager.stats.totalFalseCount = Math.max(0,
                window._domqueryStateManager.stats.totalFalseCount - 1));
            if (0 >= m) {
                g.isActive = !1;
                window._domqueryStateManager.activeHistories.delete(d);
                h = 0;
                f = !1;
                k = [];
                for (let [n, q] of window._domqueryStateManager.histories) q.isActive && 0 < q.count && (h += q.count, q.preventBack && (f = !0), k.push({
                    key: n,
                    count: q.count,
                    preventBack: q.preventBack
                }));
                "function" === typeof e && e(m, h);
                g.preventBack ? (k.forEach(n => {
                        history.pushState({
                            key: n.key,
                            count: n.count,
                            preventBack: n.preventBack,
                            restack: !0
                        }, "")
                    }), window.history.go(-(k.length + 1))) : 0 !== h ||
                    f ? window.history.back() : window.history.go(-1)
            } else {
                g = 0;
                for ([, h] of window._domqueryStateManager.histories) h.isActive && 0 < h.count && (g += h.count);
                "function" === typeof e && e(m, g);
                window.history.back()
            }
            return m
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
        let g = arguments[b];
        if (null != g)
            for (let k in g) {
                var e = a[k];
                let f = g[k];
                a !== f && (d && f && ($.isPlainObject(f) || $.isArray(f)) ? (e = e && ($.isPlainObject(e) || $.isArray(e)) ? e : $.isArray(f) ? [] : {}, a[k] = $.extend(d, e, f)) : void 0 !== f && (a[k] = f))
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
        c, d, e, g, k = function(l) {
            d = a.memory && l;
            c = g || 0;
            for (g = e = 0; void 0 > c && (!1 !== b[c].apply(l[0], l[1]) || !a.stopOnFalse); c++);
        },
        f = {
            add: function() {
                b && (e = b.length, function m(h) {
                    $.each(h, function(n, q) {
                        "function" === typeof q ? a.unique && f.has(q) || b.push(q) : q && q.length && "string" !== typeof q && m(q)
                    })
                }(arguments), d && (g = e, k(d)));
                return this
            }
        };
    return f
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
                let g = arguments;
                return $.Deferred(function(k) {
                    $.each(b, function(f, l) {
                        let h = $.isFunction(g[f]) && g[f];
                        e[l[1]](function() {
                            let m = h && h.apply(this, arguments);
                            if (m && $.isFunction(m.promise)) m.promise().done(k.resolve).fail(k.reject).progress(k.notify);
                            else k[l[0] + "With"](this === d ? k.promise() : this, h ? [m] : arguments)
                        })
                    });
                    g = null
                }).promise()
            },
            promise: function(g) {
                return null != g ? $.extend(g, d) : d
            }
        },
        e = {};
    $.each(b, function(g, k) {
        let f = k[2],
            l = k[3];
        d[k[1]] = f.add;
        l && f.add(function() {
            c = l
        }, b[g ^ 1][2].disable, b[2][2].lock);
        e[k[0]] = function() {
            e[k[0] + "With"](this === e ? d : this, arguments);
            return this
        };
        e[k[0] + "With"] = f.fireWith
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
        g = function() {
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
                    c >= b ? (console.warn("\ub77c\uc774\uc13c\uc2a4 \uac80\uc99d \ub300\uae30 \uc2dc\uac04 \ucd08\uacfc, \uacc4\uc18d \uc9c4\ud589\ud569\ub2c8\ub2e4."), a()) : setTimeout(g, 50)
            }
        };
    g()
}
$.fn.DClanguage = function(a, b, c) {
    if ("function" === typeof b) {
        const d = 3 <= arguments.length ? arguments[2] : void 0,
            e = d && "object" === typeof d && !Array.isArray(d) && "function" !== typeof d ? d : {};
        c = b;
        "function" === typeof window.domquery_applyHTMLTranslation ? waitForLicenseVerification(function() {
            window.domquery_applyHTMLTranslation(a, c, e)
        }) : "function" === typeof window.loadLanguageJS ? window.loadLanguageJS(function(g) {
            g || "function" !== typeof window.domquery_applyHTMLTranslation ? (console.error("domquery_applyHTMLTranslation \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. language.js\uac00 \ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694."),
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
        }) : "function" === typeof window.loadLanguageJS ? window.loadLanguageJS(function(g) {
            g || "function" !== typeof window.domquery_applyHTMLTranslation ? (console.error("domquery_applyHTMLTranslation \ud568\uc218\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. language.js\uac00 \ub85c\ub4dc\ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud558\uc138\uc694."),
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
            for (var e in c) /^(screenWidth|screenHeight|orientation|pixelRatio)$/.test(e) || (d[e] = c[e])
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
    } catch (k) {
        console.error("$.isMobile error:", k);
        var g = {
            platform: "unknown",
            deviceType: "desktop",
            browser: "unknown",
            isWebView: !1,
            isMobile: !1,
            isTablet: !1,
            isDesktop: !0,
            _error: k.message
        };
        b && "function" === typeof b && setTimeout(function() {
            b(g)
        }, 0);
        return g
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