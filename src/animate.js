$.fn.animate_interpolateColor = function(b, c, d) {
    function m(p) {
        var t = document.createElement("canvas");
        t.width = t.height = 1;
        t = t.getContext("2d");
        t.fillStyle = p;
        t.fillRect(0, 0, 1, 1);
        const [n, A, u] = t.getImageData(0, 0, 1, 1).data;
        return [n, A, u]
    }
    b = m(b);
    const h = m(c);
    c = b.map((p, t) => Math.round(p + d * (h[t] - p)));
    return function(p, t, n) {
        return "#" + [p, t, n].map(A => {
            A = A.toString(16);
            return 1 === A.length ? "0" + A : A
        }).join("")
    }(c[0], c[1], c[2])
};

function isGradient(b) {
    return b && "string" === typeof b ? b.trim().startsWith("linear-gradient") || b.trim().startsWith("radial-gradient") || b.trim().startsWith("conic-gradient") : !1
}

function parseGradient(b) {
    if (!isGradient(b)) return null;
    var c = b.match(/(linear-gradient|radial-gradient|conic-gradient)\s*\(([^)]+)\)/);
    if (!c) return null;
    b = c[1];
    var d = c[2].trim();
    c = "180deg";
    let m = [];
    if ("linear-gradient" === b) {
        const h = d.match(/^([\d.]+(?:deg|turn|rad|grad)?)\s*,/);
        h ? (c = h[1], m = d.substring(h[0].length).split(",").map(p => p.trim())) : m = d.split(",").map(p => p.trim())
    } else m = d.split(",").map(h => h.trim());
    d = m.map(h => {
        const p = h.trim().split(/\s+/),
            t = p[0];
        h = p[1] || (m.indexOf(h) === m.length - 1 ? "100%" :
            0 === m.indexOf(h) ? "0%" : m.indexOf(h) / (m.length - 1) * 100 + "%");
        return {
            color: t,
            position: h
        }
    });
    return {
        type: b,
        angle: c,
        stops: d
    }
}

function interpolateGradient(b, c, d) {
    b = parseGradient(b);
    c = parseGradient(c);
    if (!b || !c) return null;
    var m = b.angle;
    if ("linear-gradient" === b.type && "linear-gradient" === c.type) {
        m = parseFloat(b.angle) || 180;
        var h = parseFloat(c.angle) || 180;
        m = m + (h - m) * d + "deg"
    }
    h = Math.max(b.stops.length, c.stops.length);
    const p = [];
    for (let u = 0; u < h; u++) {
        var t = b.stops[Math.min(u, b.stops.length - 1)],
            n = c.stops[Math.min(u, c.stops.length - 1)],
            A = parseFloat(t.position) || u / (h - 1) * 100;
        const B = parseFloat(n.position) || u / (h - 1) * 100;
        A = A + (B - A) * d + "%";

        function C(e) {
            if (e.startsWith("#")) {
                var w = e.substring(1);
                e = parseInt(w.substring(0, 2), 16);
                var g = parseInt(w.substring(2, 4), 16);
                w = parseInt(w.substring(4, 6), 16);
                return [e, g, w, 1]
            }
            if (e.startsWith("rgba")) return (e = e.match(/[\d.]+/g)) ? e.map(Number) : [0, 0, 0, 1];
            if (e.startsWith("rgb")) return (e = e.match(/\d+/g)) ? [...e.map(Number), 1] : [0, 0, 0, 1];
            try {
                g = document.createElement("canvas");
                g.width = g.height = 1;
                w = g.getContext("2d");
                w.fillStyle = e;
                w.fillRect(0, 0, 1, 1);
                const [a, f, v] = w.getImageData(0, 0, 1, 1).data;
                return [a, f, v, 1]
            } catch (a) {
                return [0,
                    0, 0, 1
                ]
            }
        }
        t = C(t.color);
        n = C(n.color);
        p.push({
            color: `rgba(${Math.round(t[0]+(n[0]-t[0])*d)},${Math.round(t[1]+(n[1]-t[1])*d)},${Math.round(t[2]+(n[2]-t[2])*d)},${t[3]+(n[3]-t[3])*d})`,
            position: A
        })
    }
    d = p.map(u => `${u.color} ${u.position}`).join(", ");
    return `${b.type}(${"linear-gradient"===b.type?m+", ":""}${d})`
}
$.fn.animate_getInitialStyles = function(b, c) {
    let d = {};
    var m = b.parentElement || document.body;
    let h = m.getBoundingClientRect(),
        p = b.getBoundingClientRect(),
        t = window.getComputedStyle(b),
        n = "none" !== t.transform ? t.transform : "";
    var A = window.getComputedStyle(m);
    m = parseFloat(A.paddingLeft);
    A = parseFloat(A.paddingTop);
    let u = t.position,
        B = [],
        C = b;
    for (; C.previousElementSibling && C.previousElementSibling.classList.contains(b.classList[0]);) B.unshift(C.previousElementSibling), C = C.previousElementSibling;
    for (let e in c)
        if ("left" ===
            e || "right" === e) {
            let w = 0;
            c = parseFloat(t.marginLeft);
            B.forEach(g => {
                let a = window.getComputedStyle(g);
                w += g.offsetWidth + parseFloat(a.marginLeft) + parseFloat(a.marginRight)
            });
            switch (u) {
                case "static":
                case "relative":
                    d[e] = p.left - h.left - m - w - c;
                    break;
                case "absolute":
                    c = "auto" !== t.left ? parseFloat(t.left) : p.left - h.left - m - w - c;
                    d[e] = c;
                    break;
                case "fixed":
                    d[e] = p.left - w - c
            }
        } else if ("top" === e || "bottom" === e) switch (c = parseFloat(t.marginTop), u) {
        case "static":
        case "relative":
            d[e] = p.top - h.top - A - c;
            "top" === e && (d[e] = p.top - h.top);
            break;
        case "absolute":
            c = "auto" !== t.top ? parseFloat(t.top) : p.top - h.top - A - c;
            "top" === e && (c = "auto" !== t.top ? parseFloat(t.top) : p.top - h.top);
            d[e] = c;
            break;
        case "fixed":
            d[e] = p.top - c, "top" === e && (d[e] = p.top)
    } else "opacity" === e ? d[e] = parseFloat(t[e]) : "scale" === e || "scaleX" === e || "scaleY" === e ? "" === n ? (d.scaleX = 1, d.scaleY = 1, d.scale = 1) : (c = n.match(/matrix\(([^)]+)\)/)) ? (c = c[1].split(","), d.scaleX = parseFloat(c[0]), d.scaleY = parseFloat(c[3]), d.scale = parseFloat(c[0])) : (d.scaleX = 1, d.scaleY = 1, d.scale = 1) : "rotate" === e || "rotateX" ===
        e || "rotateY" === e ? (c = b.getAttribute(`data-${e}`), null !== c ? (c = parseFloat(c), d[e] = isNaN(c) ? 0 : c) : "" === n ? d[e] = 0 : (c = n.match(new RegExp(`${e}\\(([^)]+)deg\\)`)), d[e] = c ? parseFloat(c[1]) : 0)) : "skewX" === e || "skewY" === e ? (c = b.getAttribute(`data-${e}`), null !== c ? (c = parseFloat(c), d[e] = isNaN(c) ? 0 : c) : "" === n ? d[e] = 0 : (c = n.match(new RegExp(`${e}\\(([^)]+)deg\\)`)), d[e] = c ? parseFloat(c[1]) : 0)) : "fontSize" === e ? (c = t[e], d[e] = parseFloat(c), d[e + "Unit"] = c.replace(d[e], "")) : d[e] = parseFloat(t[e]);
    return d
};
$.fn.animate_updateStyles = function(b, c, d, m) {
    var h = b.style.transform || "";
    let p = {
        scaleX: m.scaleX || 1,
        scaleY: m.scaleY || 1,
        rotate: m.rotate || 0,
        rotateX: m.rotateX || 0,
        rotateY: m.rotateY || 0,
        skewX: m.skewX || 0,
        skewY: m.skewY || 0
    };
    "left" === c || "top" === c ? b.style[c] = d + "px" : "right" === c ? b.style.left = d + "px" : "bottom" === c ? b.style.top = d + "px" : "opacity" === c ? b.style.opacity = d : "scale" === c ? (p.scaleX = d, p.scaleY = d) : "scaleX" === c || "scaleY" === c ? p[c] = d : "rotate" === c || "rotateX" === c || "rotateY" === c ? (d = parseFloat(d), m = b.getAttribute(`data-${c}`) ||
        "0", m = parseFloat(m), p[c] = m + d) : "skewX" === c || "skewY" === c ? (d = parseFloat(d), m = b.getAttribute(`data-${c}`) || "0", m = parseFloat(m), p[c] = m + d) : "fontSize" === c ? b.style.fontSize = d + m[c + "Unit"] : "background" === c && (c = b.getAttribute("data-initial-background") || "rgba(0,0,0,0)", c = this.interpolateBackground(c, d, b.style.opacity), b.style.background = c);
    h.includes("scale(") && (c = h.match(/scale\(([^)]+)\)/)) && (c = c[1].split(","), p.scaleX = parseFloat(c[0]), p.scaleY = parseFloat(c[1]));
    h.includes("rotate(") && (c = h.match(/rotate\(([^)]+)deg\)/)) &&
        (p.rotate = parseFloat(c[1]));
    h.includes("rotateX(") && (c = h.match(/rotateX\(([^)]+)deg\)/)) && (p.rotateX = parseFloat(c[1]));
    h.includes("rotateY(") && (c = h.match(/rotateY\(([^)]+)deg\)/)) && (p.rotateY = parseFloat(c[1]));
    h.includes("skewX(") && (c = h.match(/skewX\(([^)]+)deg\)/)) && (p.skewX = parseFloat(c[1]));
    h.includes("skewY(") && (h = h.match(/skewY\(([^)]+)deg\)/)) && (p.skewY = parseFloat(h[1]));
    h = `scale(${p.scaleX}, ${p.scaleY}) rotate(${p.rotate}deg) rotateX(${p.rotateX}deg) rotateY(${p.rotateY}deg) skewX(${p.skewX}deg) skewY(${p.skewY}deg)`;
    b.style.transform = h.trim()
};
$.fn.animate_calculateFinalValue = function(b, c, d, m, h, p, t, n, A, u) {
    function B(f, v) {
        let [H, y] = f.split(",");
        f = parseFloat(H);
        H.endsWith("%") && (f = parseFloat(H) / 100 * v);
        void 0 !== y && (f += parseFloat(y));
        return f
    }

    function C(f, v, H, y) {
        if ("string" === typeof f) {
            if (f.startsWith("+=")) {
                if (f.endsWith("%")) return f = parseFloat(f.slice(2, -1)), v + f / 100 * y;
                y = parseFloat(f.slice(2));
                return v + y
            }
            if (f.startsWith("-=")) {
                if (f.endsWith("%")) return f = parseFloat(f.slice(2, -1)), v - f / 100 * y;
                y = parseFloat(f.slice(2));
                return v - y
            }
            if (f.startsWith("+")) {
                if (f.endsWith("%")) return y *=
                    parseFloat(f.slice(1, -1)) / 100, v + y;
                y = parseFloat(f.slice(1));
                return v + y
            }
            if (f.startsWith("-")) {
                if (f.endsWith("%")) return y *= parseFloat(f.slice(1, -1)) / 100, v - y;
                y = parseFloat(f.slice(1));
                return v - y
            }
        }
        return parseFloat(f)
    }
    let e = c[b];
    var w = parseFloat(e),
        g = u.offsetParent === document.body || u.offsetParent === document.documentElement;
    w = window.innerWidth;
    let a = window.innerHeight;
    w = g ? w : m.width;
    g = g ? a : m.height;
    "left" === b ? w = "50%" === c[b] ? (w - p) / 2 : "string" !== typeof e || !e.endsWith("%") || e.startsWith("+") || e.startsWith("-") ?
        "string" === typeof e && e.includes(",") ? B(e, w) : "string" === typeof e && (e.startsWith("+") || e.startsWith("-") || e.startsWith("+=") || e.startsWith("-=")) ? C(e, d[b], w, h.width) : parseFloat(c[b]) : parseFloat(e) / 100 * w : "right" === b ? (w = "50%" === c[b] ? (w - p) / 2 : "string" !== typeof e || !e.endsWith("%") || e.startsWith("+") || e.startsWith("-") ? "string" === typeof e && e.includes(",") ? w - B(e, w) - h.width : "string" === typeof e && (e.startsWith("+") || e.startsWith("-") || e.startsWith("+=") || e.startsWith("-=")) ? C(e, d[b], w, h.width) : w - h.width - parseFloat(c[b]) :
            w - parseFloat(e) / 100 * w - h.width, c.width && (w = "string" === typeof c.width && c.width.endsWith("px") ? w - (Math.abs(parseFloat(c.width)) - p + n) : w - parseFloat(c.width))) : "top" === b ? w = "50%" === c[b] ? (g - t) / 2 : "string" !== typeof e || !e.endsWith("%") || e.startsWith("+") || e.startsWith("-") ? "string" === typeof e && e.includes(",") ? B(e, g) : "string" === typeof e && (e.startsWith("+") || e.startsWith("-") || e.startsWith("+=") || e.startsWith("-=")) ? C(e, d[b], g, h.height) : parseFloat(c[b]) : parseFloat(e) / 100 * g : "bottom" === b ? (w = "50%" === c[b] ? (g - t) / 2 :
            "string" !== typeof e || !e.endsWith("%") || e.startsWith("+") || e.startsWith("-") ? "string" === typeof e && e.includes(",") ? g - B(e, g) - h.height : "string" === typeof e && (e.startsWith("+") || e.startsWith("-") || e.startsWith("+=") || e.startsWith("-=")) ? C(e, d[b], g, h.height) : g - h.height - parseFloat(c[b]) : g - parseFloat(e) / 100 * g - h.height, c.height && (w = "string" === typeof c.height && c.height.endsWith("px") ? w - (Math.abs(parseFloat(c.height)) - t + A) : w - parseFloat(c.height))) : "width" === b || "height" === b ? (h = "width" === b ? h.width : h.height, w = "string" !==
            typeof e || !e.endsWith("%") || e.startsWith("+") || e.startsWith("-") || e.startsWith("+=") || e.startsWith("-=") ? "string" === typeof e && e.endsWith("px") ? Math.abs(parseFloat(e)) : "string" === typeof e && (e.startsWith("+=") || e.startsWith("-=") || e.startsWith("+") || e.startsWith("-")) ? C(e, d[b], w, h) : d[b] + parseFloat(e) : ("width" === b ? m.width : m.height) * parseFloat(e) / 100) : "opacity" === b ? w = parseFloat(c[b]) : "scale" === b || "scaleX" === b || "scaleY" === b ? w = parseFloat(c[b]) : "rotate" === b || "rotateX" === b || "rotateY" === b ? w = "string" === typeof e &&
        (e.startsWith("+") || e.startsWith("-") || e.startsWith("+=") || e.startsWith("-=")) ? C(e, d[b] || 0, 0, 0) : parseFloat(c[b]) : "skewX" === b || "skewY" === b ? w = "string" === typeof e && (e.startsWith("+") || e.startsWith("-") || e.startsWith("+=") || e.startsWith("-=")) ? C(e, d[b] || 0, 0, 0) : parseFloat(c[b]) : "fontSize" === b ? (d = c[b].match(/([\d.]+)(\D*)/), b = parseFloat(d[1]), d = d[2] || "px", "em" === d ? (d = parseFloat(window.getComputedStyle(document.documentElement).fontSize), b *= d) : "pt" === d && (b *= 96 / 72), w = b) : "background" === b ? (w = c[b], u.setAttribute("data-initial-background",
            getComputedStyle(u).background)) : w = parseFloat(c[b]);
    window.addEventListener("resize", function() {
        if (u && document.contains(u)) {
            var f = u.offsetParent === document.body || u.offsetParent === document.documentElement ? {
                width: window.innerWidth,
                height: window.innerHeight
            } : u.parentElement ? u.parentElement.getBoundingClientRect() : null;
            if (f) {
                var v = u.getBoundingClientRect(),
                    H = u.style.left,
                    y = u.style.right,
                    V = u.style.top,
                    W = u.style.bottom;
                for (let L in c) {
                    let Q;
                    if ("left" === L || "right" === L) Q = "50%" === c[L] ? (f.width - v.width) / 2 :
                        "string" === typeof c[L] && c[L].endsWith("%") ? parseFloat(c[L]) / 100 * f.width : parseFloat(c[L]), "left" === L && "auto" !== H ? (u.style.left = `${Q}px`, u.style.right = "auto") : "right" === L && "auto" !== y && (u.style.right = `${Q}px`, u.style.left = "auto");
                    else if ("top" === L || "bottom" === L) Q = "50%" === c[L] ? (f.height - v.height) / 2 : "string" === typeof c[L] && c[L].endsWith("%") ? parseFloat(c[L]) / 100 * f.height : parseFloat(c[L]), "top" === L && "auto" !== V ? (u.style.top = `${Q}px`, u.style.bottom = "auto") : "bottom" === L && "auto" !== W && (u.style.bottom = `${Q}px`,
                        u.style.top = "auto")
                }
                u.offsetHeight
            }
        }
    });
    return w
};
$.fn._animate1 = function(b, c, d, m) {
    function h(n) {
        if ("number" === typeof n) return {
            top: n,
            right: n,
            bottom: n,
            left: n
        };
        n = n.toString().trim().split(/\s+/);
        switch (n.length) {
            case 1:
                return {
                    top: n[0], right: n[0], bottom: n[0], left: n[0]
                };
            case 2:
                return {
                    top: n[0], right: n[1], bottom: n[0], left: n[1]
                };
            case 3:
                return {
                    top: n[0], right: n[1], bottom: n[2], left: n[1]
                };
            case 4:
                return {
                    top: n[0], right: n[1], bottom: n[2], left: n[3]
                };
            default:
                return null
        }
    }

    function p(n) {
        if ("number" === typeof n) return {
            value: n,
            unit: "px"
        };
        const A = String(n).match(/^(-?\d*\.?\d+)(%|px|em|rem|vh|vw)$/);
        return A ? {
            value: parseFloat(A[1]),
            unit: A[2]
        } : {
            value: parseFloat(n),
            unit: "px"
        }
    }

    function t(n, A, u, B) {
        return (A = u.parentElement) ? B.toLowerCase().includes("top") || B.toLowerCase().includes("bottom") ? parseFloat(n) / 100 * A.clientHeight : parseFloat(n) / 100 * A.clientWidth : n
    }
    this._Queue = this._Queue.then(() => new Promise((n, A) => {
        let u = this,
            B = this.elements,
            C = [];
        if (1 === Object.keys(b).length && ("scrollTop" in b || "scrollLeft" in b)) {
            let a;
            "scrollTop" in b ? a = new Promise(f => {
                    this.scrollTop(b.scrollTop, c, f)
                }) : "scrollLeft" in b &&
                (a = new Promise(f => {
                    this.scrollLeft(b.scrollLeft, c, f)
                }));
            a.then(() => {
                d && "function" === typeof d && d.call(this);
                d && d.always && d.always.call(this, this.elements);
                n()
            }).catch(A)
        } else {
            if ("scrollTop" in b || "scrollLeft" in b) {
                let a;
                "scrollTop" in b ? (a = new Promise(f => {
                    this.scrollTop(b.scrollTop, c, f)
                }), delete b.scrollTop) : "scrollLeft" in b && (a = new Promise(f => {
                    this.scrollLeft(b.scrollLeft, c, f)
                }), delete b.scrollLeft);
                C.push(a)
            }
            "slow" === c && (c = 500);
            var e = () => d && "function" === typeof d.condition ? B.every(a => d.condition(a)) :
                !0;
            if (!e()) return n(), this;
            if ("finish" === m) return B.forEach(a => {
                a.currentAnimationFrame && (cancelAnimationFrame(a.currentAnimationFrame), delete a.currentAnimationFrame)
            }), B.forEach(a => {
                for (let f in b) f in a.style && (a.style[f] = b[f]);
                a.removeAttribute("data-last-animation-options")
            }), d && "function" === typeof d && d.call(this), d && d.done && d.done.call(this, B), n(), this;
            m && B.forEach(a => {
                a.currentAnimationFrame && (cancelAnimationFrame(a.currentAnimationFrame), delete a.currentAnimationFrame)
            });
            var w = "scale scaleX scaleY scaleTL scaleTR scaleBL scaleBR scaleTC scaleBC scaleC scaleLC scaleRC".split(" ");
            w.some(a => a in b);
            var g = b.scaleDirection || "scale";
            b.scaleDirection = g;
            C = B.map(a => {
                const f = window.getComputedStyle(a),
                    v = "none" === f.display || "hidden" === f.visibility || 0 === parseFloat(f.opacity);
                var H = !1;
                v || (H = !0);
                return new Promise((y, V) => {
                    function W() {
                        const k = a.getAttribute("data-origScale");
                        if (/^scale(TL|TR|BL|BR|TC|BC|C|LC|RC)?$/.test(k)) {
                            b.transformOrigin = k.replace("scale", "").replace(/([A-Z])/g, " $1").toLowerCase().trim().replace(/\s+/g, " ");
                            switch (k) {
                                case "scaleTC":
                                    b.transformOrigin = "top center";
                                    break;
                                case "scaleBC":
                                    b.transformOrigin = "bottom center";
                                    break;
                                case "scaleC":
                                    b.transformOrigin = "center center";
                                    break;
                                case "scaleLC":
                                    b.transformOrigin = "left center";
                                    break;
                                case "scaleRC":
                                    b.transformOrigin = "right center"
                            }
                            b.scale = 1
                        }
                    }
                    if (!a.isAnimating || b.isClicking || b.allowMultiple) {
                        u.elementData.has(a) || u.elementData.set(a, {
                            startCss: null,
                            currentAnimation: null
                        });
                        var L = u.elementData.get(a);
                        if (w.includes(g))
                            if ("scale" === g) L.hasSetScaleOrigin ? b.transformOrigin = b.transformOrigin || "center center" : (b.transformOrigin =
                                "center center", L.hasSetScaleOrigin = !0);
                            else {
                                switch (g) {
                                    case "scaleTL":
                                        var Q = "top left";
                                        break;
                                    case "scaleTR":
                                        Q = "top right";
                                        break;
                                    case "scaleBL":
                                        Q = "bottom left";
                                        break;
                                    case "scaleBR":
                                        Q = "bottom right";
                                        break;
                                    case "scaleTC":
                                        Q = "top center";
                                        break;
                                    case "scaleBC":
                                        Q = "bottom center";
                                        break;
                                    case "scaleC":
                                        Q = "center center";
                                        break;
                                    case "scaleLC":
                                        Q = "left center";
                                        break;
                                    case "scaleRC":
                                        Q = "right center"
                                }
                                a.setAttribute("data-origScale", g);
                                b.transformOrigin = Q
                            } Q = 1 === Object.keys(b).length && "opacity" in b;
                        L = a.hasAttribute("data-origScale");
                        if (Q && !v) {
                            let k = null;
                            const pa = parseFloat(f.opacity),
                                R = parseFloat(b.opacity);

                            function P(ba) {
                                k || (k = ba);
                                ba = Math.min((ba - k) / c, 1);
                                a.style.opacity = pa + (R - pa) * ba;
                                1 > ba ? window.requestAnimationFrame(P) : (d && d.done && d.done.call(u, a), y())
                            }
                            d && d.start && d.start.call(u, a);
                            window.requestAnimationFrame(P)
                        } else {
                            if (Q && (v || L)) L ? W() : (a.style.display = "block", a.style.visibility = "visible", a.style.opacity = 0, b.opacity = parseFloat(b.opacity));
                            else if (!b.transformOrigin && !Q && (v || L) && !1 !== b.appear) {
                                const {
                                    scaleTL: k,
                                    scaleTR: pa,
                                    scaleBL: R,
                                    scaleBR: P,
                                    scale: ba
                                } = b;
                                Q = [k, pa, R, P, ba].some(za => 0 === za) ? 0 : 1;
                                const qa = b.scaleTL || b.scaleTR || b.scaleBL || b.scaleBR || b.scale ? 1 : 0;
                                if (0 !== Q) {
                                    a.style.display = "block";
                                    a.style.visibility = "visible";
                                    if (0 === parseFloat(f.opacity) || b.appear) a.style.opacity = 0, b.opacity = void 0 !== b.opacity ? b.opacity : 1;
                                    L && qa ? W() : qa ? W() : (void 0 === b.scale && void 0 === b.scaleX && (b.scaleX = parseFloat(a.getAttribute("data-scaleX") || "1")), void 0 === b.scale && void 0 === b.scaleY && (b.scaleY = parseFloat(a.getAttribute("data-scaleY") || "1")))
                                }
                            }!0 === b.alpha &&
                                (L = parseFloat(window.getComputedStyle(a).opacity), b.opacity = 0 < L ? 0 : 1);
                            void 0 !== b.scaleTL ? (b.transformOrigin = "top left", b.scale = b.scaleTL, a.setAttribute("data-origScale", "scaleTL")) : void 0 !== b.scaleTR ? (b.transformOrigin = "top right", b.scale = b.scaleTR, a.setAttribute("data-origScale", "scaleTR")) : void 0 !== b.scaleBL ? (b.transformOrigin = "bottom left", b.scale = b.scaleBL, a.setAttribute("data-origScale", "scaleBL")) : void 0 !== b.scaleBR ? (b.transformOrigin = "bottom right", b.scale = b.scaleBR, a.setAttribute("data-origScale",
                                "scaleBR")) : void 0 !== b.scale || void 0 !== b.scaleX || void 0 !== b.scaleY ? a.setAttribute("data-origScale", "scale") : void 0 !== b.scaleTC ? (b.transformOrigin = "top center", b.scale = b.scaleTC, a.setAttribute("data-origScale", "scaleTC")) : void 0 !== b.scaleBC ? (b.transformOrigin = "bottom center", b.scale = b.scaleBC, a.setAttribute("data-origScale", "scaleBC")) : void 0 !== b.scaleC ? (b.transformOrigin = "center center", b.scale = b.scaleC, a.setAttribute("data-origScale", "scaleC")) : void 0 !== b.scaleLC ? (b.transformOrigin = "left center",
                                b.scale = b.scaleLC, a.setAttribute("data-origScale", "scaleLC")) : void 0 !== b.scaleRC && (b.transformOrigin = "right center", b.scale = b.scaleRC, a.setAttribute("data-origScale", "scaleRC"));
                            b.fadeIn ? (b.appear = !0, delete b.fadeIn) : b.fadeOut && (b.appear = !1, delete b.fadeOut);
                            w.forEach(k => {
                                0 === b[k] && (b[k] = 1E-5)
                            });
                            (function(k, pa, R, P, ba) {
                                function qa(r, q) {
                                    for (let I in k)
                                        if (["rotate", "rotateX", "rotateY", "skewX", "skewY"].includes(I))["rotate", "rotateX", "rotateY"].includes(I) && "true" === a.getAttribute(`data-${I}-was-zero`) ?
                                            (a.setAttribute(`data-${I}`, "0"), a.setAttribute(`data-start-${I}`, "0"), a.removeAttribute(`data-${I}-was-zero`)) : (q = parseFloat(a.getAttribute(`data-start-${I}`) || "0"), a.setAttribute(`data-${I}`, q));
                                        else if (["scale", "scaleX", "scaleY"].includes(I)) {
                                        q = void 0 !== k.scaleX ? parseFloat(k.scaleX) : void 0 !== k.scale ? parseFloat(k.scale) : parseFloat(a.getAttribute("data-scaleX") || "1");
                                        let J = void 0 !== k.scaleY ? parseFloat(k.scaleY) : void 0 !== k.scale ? parseFloat(k.scale) : parseFloat(a.getAttribute("data-scaleY") || "1");
                                        a.setAttribute("data-scaleX",
                                            q);
                                        a.setAttribute("data-scaleY", J)
                                    } else "fontSize" === I ? a.setAttribute("data-fontSize", k[I]) : "width" === I || "height" === I ? a.setAttribute(`data-${I}`, k[I]) : "borderRadius" === I ? a.setAttribute("data-borderRadius", k[I]) : "backgroundColor" === I && a.setAttribute("data-backgroundColor", k[I]);
                                    !1 === k.appear && (a.style.visibility = k.visibility ? k.visibility : "hidden", a.style.display = k.display ? k.display : "none");
                                    a.style.willChange = "auto";
                                    a.isAnimating = !1;
                                    R && R.done && R.done.call(u, a);
                                    r()
                                }

                                function za(r, q, I) {
                                    if (r.transform &&
                                        (r = r.transform.match(/translate\(([-\d.]+(?:px|%|vw|vh)?\s*,\s*[-\d.]+(?:px|%|vw|vh)?)\)/))) {
                                        const [J, ra] = r[1].split(",").map(la => la.trim());
                                        r = parseFloat(a.getAttribute("data-initial-transform-x")) || 0;
                                        const ha = parseFloat(a.getAttribute("data-initial-transform-y")) || 0,
                                            ia = parseFloat(J) || 0,
                                            ja = parseFloat(ra) || 0;
                                        I += ` translate(${r+(ia-r)*q}px, ${ha+(ja-ha)*q}px)`;
                                        1 === q && (a.setAttribute("data-initial-transform-x", ia), a.setAttribute("data-initial-transform-y", ja))
                                    }
                                    return I
                                }

                                function ma(r) {
                                    if (e()) {
                                        if (0 < wa) {
                                            Aa ||
                                                (Aa = r);
                                            if (r - Aa < wa) {
                                                a.currentAnimationFrame = requestAnimationFrame(ma);
                                                return
                                            }
                                            S || (S = r, wa = 0)
                                        }
                                        S || (S = r);
                                        T && (S = r - X, T = !1);
                                        X = r - S;
                                        Y = Math.min((X + da) / pa, 1);
                                        var q = u._anieasing(0, 1, Y, k.easing || "linear");
                                        R && R.progress && R.progress.call(u, a, Y, q, k);
                                        R && R.step && R.step.call(u, a, Y, q, k);
                                        for (let F in k)
                                            if ("background" === F || "background1" === F || "background2" === F || "background3" === F) "background" === F || "background1" === F ? (isGradient(Ea) || isGradient(Ga) ? (r = interpolateGradient(Ga, Ea, Y), a.style.background = r ? r : .5 > Y ? Ga : Ea) : (r = window.getComputedStyle(a).backgroundColor,
                                                r = u.interpolateBackground.call(u, r, Ea, Y), a.style.background = r), a.style.opacity = 1) : "background2" === F ? .5 >= Y ? (r = 1 - 1 * Y, a.style.background = Ga, a.style.opacity = r) : Ha ? a.style.opacity = .5 + (Y - .5) : (a.style.background = Ea, a.style.opacity = .5, Ha = !0) : "background3" === F && (Ha ? a.style.opacity = .5 + .5 * Y : (a.style.background = Ea, a.style.opacity = .5, Ha = !0), a.style.opacity = 1);
                                            else if ("left top right bottom fontSize width height opacity borderRadius backgroundColor color path".split(" ").includes(F)) {
                                            r = U[F];
                                            var I = u.animate_calculateFinalValue(F,
                                                k, U, Fa, l, E, G, z, x, a);
                                            r += (I - r) * q;
                                            if ("fontSize" === F) a.style.fontSize = `${N+(M-N)*q}px`;
                                            else if ("width" === F) I = r - E, a.style.width = `${r}px`, a.style.right = `${U.right-I/2}px`;
                                            else if ("height" === F) I = r - G, a.style.height = `${r}px`, a.style.bottom = `${U.bottom-I/2}px`;
                                            else if ("borderRadius" === F) a.style.borderRadius = `${r}px`;
                                            else if ("color" === F) r = u.animate_interpolateColor(U.color, k.color, q), a.style.color = r;
                                            else if ("backgroundColor" === F) a.style.backgroundColor = u.animate_interpolateColor(U.backgroundColor || "rgba(0,0,0,0)",
                                                k.backgroundColor, q);
                                            else if ("path" === F) {
                                                if (r = document.querySelector(k.path)) I = r.getTotalLength(), r = r.getPointAtLength(I * q), a.style.left = `${r.x}px`, a.style.top = `${r.y}px`
                                            } else u.animate_updateStyles(a, F, r, U)
                                        } else if ("margin" === F || "padding" === F) {
                                            if (!a.hasAttribute("data-start-" + F)) {
                                                const Ba = {};
                                                ["Top", "Right", "Bottom", "Left"].forEach(na => {
                                                    const Ca = `${F}${na}`;
                                                    Ba[na.toLowerCase()] = parseFloat(getComputedStyle(a)[Ca])
                                                });
                                                a.setAttribute("data-start-" + F, JSON.stringify(Ba))
                                            }
                                            const sa = h(k[F]),
                                                Da = JSON.parse(a.getAttribute("data-start-" +
                                                    F));
                                            if (sa) {
                                                const Ba = F;
                                                ["Top", "Right", "Bottom", "Left"].forEach(na => {
                                                    const Ca = `${Ba}${na}`;
                                                    var ta = Da[na.toLowerCase()];
                                                    const {
                                                        value: Ia,
                                                        unit: Ja
                                                    } = p(sa[na.toLowerCase()]);
                                                    "%" === Ja ? (na = t(Ia, Ca, a, Ca), ta += (na - ta) * q) : ta += (Ia - ta) * q;
                                                    a.style[Ca] = `${ta}${Ja||"px"}`
                                                })
                                            }
                                            1 <= Y && a.removeAttribute("data-start-" + F)
                                        } else if ("marginTop marginRight marginBottom marginLeft paddingTop paddingRight paddingBottom paddingLeft".split(" ").includes(F)) {
                                            a.hasAttribute("data-start-" + F) || (r = getComputedStyle(a)[F], r = parseFloat(r),
                                                a.setAttribute("data-start-" + F, r));
                                            r = parseFloat(a.getAttribute("data-start-" + F));
                                            const {
                                                value: sa,
                                                unit: Da
                                            } = p(k[F]);
                                            "%" === Da ? (I = t(sa, F, a, F), r += (I - r) * q) : r += (sa - r) * q;
                                            a.style[F] = `${r}${Da||"px"}`;
                                            1 <= Y && a.removeAttribute("data-start-" + F)
                                        }
                                        r = void 0 !== k.scaleX ? parseFloat(k.scaleX) : void 0 !== k.scale ? parseFloat(k.scale) : K;
                                        I = void 0 !== k.scaleY ? parseFloat(k.scaleY) : void 0 !== k.scale ? parseFloat(k.scale) : O;
                                        r = K + (r - K) * q;
                                        I = O + (I - O) * q;
                                        var J = f.position,
                                            ra = parseFloat(a.getAttribute("data-start-rotate")) || 0,
                                            ha = void 0 !== k.rotate ?
                                            parseFloat(k.rotate) : ra;
                                        ra += (ha - ra) * q;
                                        ha = parseFloat(a.getAttribute("data-start-rotateX")) || 0;
                                        var ia = void 0 !== k.rotateX ? parseFloat(k.rotateX) : ha;
                                        ha += (ia - ha) * q;
                                        ia = parseFloat(a.getAttribute("data-start-rotateY")) || 0;
                                        var ja = void 0 !== k.rotateY ? parseFloat(k.rotateY) : ia;
                                        ia += (ja - ia) * q;
                                        ja = parseFloat(a.getAttribute("data-start-skewX")) || 0;
                                        var la = void 0 !== k.skewX ? parseFloat(k.skewX) : ja;
                                        ja += (la - ja) * q;
                                        la = parseFloat(a.getAttribute("data-start-skewY")) || 0;
                                        var ua = void 0 !== k.skewY ? parseFloat(k.skewY) : la;
                                        la += (ua - la) *
                                            q;
                                        if (J && "static" !== J && "relative" !== J || !a.getAttribute("data-origScale")) a.style.transformOrigin = k.transformOrigin ? k.transformOrigin : "50% 50%", J = za(k, q, `scale(${r}, ${I})`), a.style.transform = J + ` rotate(${ra}deg)` + ` rotateX(${ha}deg)` + ` rotateY(${ia}deg)` + ` skewX(${ja}deg)` + ` skewY(${la}deg)`;
                                        else {
                                            if (!a.hasAttribute("data-original-width"))
                                                if (J = (Ba, na, Ca) => {
                                                        Ba = parseFloat(f.paddingLeft) || 0;
                                                        na = parseFloat(f.paddingRight) || 0;
                                                        var ta = parseFloat(f.paddingTop) || 0;
                                                        const Ia = parseFloat(f.paddingBottom) || 0;
                                                        ta = a.clientHeight -
                                                            ta - Ia;
                                                        a.setAttribute("data-original-width", a.clientWidth - Ba - na);
                                                        a.setAttribute("data-original-height", ta);
                                                        a.setAttribute("data-original-margin-top", f.marginTop);
                                                        a.setAttribute("data-original-margin-right", f.marginRight);
                                                        a.setAttribute("data-original-margin-bottom", f.marginBottom);
                                                        a.setAttribute("data-original-margin-left", f.marginLeft);
                                                        a.setAttribute("data-original-font-size", f.fontSize);
                                                        a.setAttribute("data-start-scale", Ca);
                                                        a.style.overflow = "hidden"
                                                    }, H) {
                                                    ua = a.clientWidth - (parseFloat(f.paddingLeft) ||
                                                        0) - (parseFloat(f.paddingRight) || 0);
                                                    var ea = a.clientHeight - (parseFloat(f.paddingTop) || 0) - (parseFloat(f.paddingBottom) || 0);
                                                    J(ua, ea, "1");
                                                    a.style.width = `${ua}px`;
                                                    a.style.height = `${ea}px`
                                                } else J(0, 0, "0"), a.style.width = "0px", a.style.height = "0px";
                                            J = parseFloat(a.getAttribute("data-original-width"));
                                            ua = parseFloat(a.getAttribute("data-original-height"));
                                            ea = parseFloat(a.getAttribute("data-original-margin-top"));
                                            parseFloat(a.getAttribute("data-original-margin-right"));
                                            parseFloat(a.getAttribute("data-original-margin-bottom"));
                                            const F = parseFloat(a.getAttribute("data-original-margin-left"));
                                            var xa = parseFloat(a.getAttribute("data-original-font-size")),
                                                ya = parseFloat(a.getAttribute("data-start-scale"));
                                            let sa;
                                            sa = void 0 !== k.scaleX ? k.scaleX : void 0 !== k.scaleY ? k.scaleY : k[a.getAttribute("data-origScale")] || 1;
                                            ya += (sa - ya) * q;
                                            const Da = J * ya;
                                            var va = ua * ya;
                                            a.style.width = `${Da}px`;
                                            a.style.height = `${va}px`;
                                            a.style.fontSize = `${xa*ya}px`;
                                            xa = J - Da;
                                            va = ua - va;
                                            switch (a.getAttribute("data-origScale")) {
                                                case "scaleTL":
                                                    a.style.marginTop = `${ea}px`;
                                                    a.style.marginLeft =
                                                        `${F}px`;
                                                    break;
                                                case "scaleTR":
                                                    a.style.marginTop = `${ea}px`;
                                                    a.style.marginLeft = `${F+xa}px`;
                                                    break;
                                                case "scaleBL":
                                                    a.style.marginTop = `${ea+va}px`;
                                                    a.style.marginLeft = `${F}px`;
                                                    break;
                                                case "scaleBR":
                                                    a.style.marginTop = `${ea+va}px`;
                                                    a.style.marginLeft = `${F+xa}px`;
                                                    break;
                                                case "scaleTC":
                                                    a.style.marginTop = `${ea}px`;
                                                    a.style.marginLeft = `${F+xa/2}px`;
                                                    break;
                                                case "scaleBC":
                                                    a.style.marginTop = `${ea+va}px`;
                                                    a.style.marginLeft = `${F+xa/2}px`;
                                                    break;
                                                case "scaleC":
                                                    a.style.marginTop = `${ea+va/2}px`;
                                                    a.style.marginLeft = `${F+xa/2}px`;
                                                    break;
                                                case "scaleLC":
                                                    a.style.marginTop = `${ea+va/2}px`;
                                                    a.style.marginLeft = `${F}px`;
                                                    break;
                                                case "scaleRC":
                                                    a.style.marginTop = `${ea+va/2}px`;
                                                    a.style.marginLeft = `${F+xa}px`;
                                                    break;
                                                case "scale":
                                                    void 0 !== k.scaleX ? (a.style.width = `${J*ya}px`, a.style.height = `${ua}px`) : (a.style.width = void 0 !== k.scaleY ? `${J}px` : `${J*ya}px`, a.style.height = `${ua*ya}px`), a.style.marginTop = `${ea}px`, a.style.marginLeft = `${F}px`, a.style.transformOrigin = "center center"
                                            }
                                            1 === q && a.setAttribute("data-start-scale", sa.toString());
                                            a.style.transformOrigin =
                                                k.transformOrigin ? k.transformOrigin : "50% 50%";
                                            J = za(k, q, "");
                                            0 !== ra && (J += ` rotate(${ra}deg)`);
                                            0 !== ha && (J += ` rotateX(${ha}deg)`);
                                            0 !== ia && (J += ` rotateY(${ia}deg)`);
                                            0 !== ja && (J += ` skewX(${ja}deg)`);
                                            0 !== la && (J += ` skewY(${la}deg)`);
                                            a.style.transform = J.trim() || "none"
                                        }
                                        void 0 !== k.appear && (a.style.opacity = k.noOpacityAnimation || k.alphaOut ? k.appear ? 1 : void 0 !== Z ? Z : k.alphaOut : Z + ((k.appear ? 1 : 0) - Z) * q);
                                        1 > Y && !a.animationStopped ? a.currentAnimationFrame = window.requestAnimationFrame(ma) : (1 !== k.scale && 1 !== k.opacity || a.removeAttribute("data-origScale"),
                                            a.setAttribute("data-scaleX", r), a.setAttribute("data-scaleY", I), a.setAttribute("data-start-rotate", ra), a.setAttribute("data-start-rotateX", ha), a.setAttribute("data-start-rotateY", ia), a.setAttribute("data-start-skewX", ja), a.setAttribute("data-start-skewY", la), qa(P, ba))
                                    } else qa(P, ba)
                                }
                                if (e()) {
                                    var wa = k.delay || 0;
                                    delete k.delay;
                                    var Aa = null,
                                        ka = !1,
                                        fa = !1;
                                    !0 === k.appear && ("none" !== window.getComputedStyle(a).display && "hidden" !== window.getComputedStyle(a).visibility && 0 !== parseFloat(window.getComputedStyle(a).opacity) ?
                                        fa = !0 : "none" === window.getComputedStyle(a).display && (ka = !0, a.style.display = "block"));
                                    var oa = window.getComputedStyle(a).position;
                                    a.style.position = oa && "static" !== oa ? k.position || oa : "static";
                                    var U = u.animate_getInitialStyles(a, k),
                                        Fa = (a.parentElement || document.body).getBoundingClientRect(),
                                        l = a.getBoundingClientRect(),
                                        E = l.width,
                                        G = l.height;
                                    ka && (a.style.display = "none");
                                    void 0 !== k.color && (U.color = window.getComputedStyle(a).color);
                                    var D = getComputedStyle(a),
                                        z = 0,
                                        x = 0;
                                    k.height && (x = ["borderTopWidth", "borderBottomWidth",
                                        "paddingTop", "paddingBottom"
                                    ].reduce((r, q) => r + parseFloat(D[q]), 0));
                                    k.width && (z = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"].reduce((r, q) => r + parseFloat(D[q]), 0));
                                    var K = parseFloat(a.getAttribute("data-scaleX")) || 1,
                                        O = parseFloat(a.getAttribute("data-scaleY")) || 1;
                                    !v || void 0 === k.scale && void 0 === k.scaleX && void 0 === k.scaleY || (a.style.transform = "scale(0.00001)", a.style.display = "block", a.style.visibility = "visible", O = K = 1E-5, a.dataset.isInitialized = "true");
                                    ["rotate", "rotateX", "rotateY"].forEach(r => {
                                        if (void 0 !== k[r] && !a.hasAttribute("data-start-" + r)) {
                                            var q = a.getAttribute(`data-${r}`);
                                            null !== q ? (q = parseFloat(q), q = isNaN(q) ? U[r] || 0 : q) : q = U[r] || 0;
                                            a.setAttribute("data-start-" + r, q)
                                        }
                                    });
                                    ["skewX", "skewY"].forEach(r => {
                                        if (void 0 !== k[r] && !a.hasAttribute("data-start-" + r)) {
                                            var q = a.getAttribute(`data-${r}`);
                                            null !== q ? (q = parseFloat(q), q = isNaN(q) ? U[r] || 0 : q) : q = U[r] || 0;
                                            a.setAttribute("data-start-" + r, q)
                                        }
                                    });
                                    var N = parseFloat(window.getComputedStyle(a).fontSize),
                                        M = k.fontSize ? parseFloat(k.fontSize) : N;
                                    if (k.fontSize && k.fontSize.endsWith("em")) {
                                        ka =
                                            parseFloat(k.fontSize) || 1;
                                        try {
                                            var ca = a.parentElement || document.body;
                                            var aa = ca ? parseFloat(window.getComputedStyle(ca).fontSize) || 16 : 16
                                        } catch (r) {
                                            console.warn("Error getting parent font size for em calculation:", r), aa = 16
                                        }
                                        M = ka * aa
                                    }
                                    var Z = !0 === k.appear ? fa ? parseFloat(window.getComputedStyle(a).opacity) : 0 : !1 === k.appear ? 1 : parseFloat(window.getComputedStyle(a).opacity);
                                    a.style.opacity = Z;
                                    !0 === k.appear ? (a.style.display = "block", a.style.visibility = "visible") : !1 === k.appear && (a.style.visibility = "visible");
                                    a.style.willChange =
                                        "transform, left, top, right, bottom, font-size, width, height, opacity, border-radius, background-color";
                                    var S = null,
                                        X = 0,
                                        da = 0,
                                        Y = 0,
                                        T = !1;
                                    R && R.start && R.start.call(u, a);
                                    var Ga = window.getComputedStyle(a).background,
                                        Ea = k.background || k.background1 || k.background2 || k.background3,
                                        Ha = !1;
                                    a.hasAttribute("data-initial-transform") || (aa = window.getComputedStyle(a).transform, ca = fa = 0, aa && "none" !== aa && (aa = new DOMMatrix(aa), fa = aa.m41, ca = aa.m42), a.setAttribute("data-initial-transform-x", fa), a.setAttribute("data-initial-transform-y",
                                        ca));
                                    ["rotate", "rotateX", "rotateY"].forEach(r => {
                                        if (void 0 !== k[r]) {
                                            var q = k[r];
                                            let I = parseFloat(a.getAttribute(`data-${r}`) || "0");
                                            if ("string" === typeof q && (q.startsWith("+") || q.startsWith("-") || q.startsWith("+=") || q.startsWith("-="))) {
                                                let J = 0;
                                                q.startsWith("+=") ? J = parseFloat(q.slice(2)) || 0 : q.startsWith("-=") ? J = -parseFloat(q.slice(2)) || 0 : q.startsWith("+") ? J = parseFloat(q.slice(1)) || 0 : q.startsWith("-") && (J = -parseFloat(q.slice(1)) || 0);
                                                k[r] = I + J
                                            } else q = parseFloat(String(q).replace(/deg/gi, "")), isNaN(q) && (q =
                                                0), 0 === q && 0 !== I ? (k[r] = 0, a.setAttribute(`data-${r}-was-zero`, "true")) : (k[r] = q, 0 !== q && a.removeAttribute(`data-${r}-was-zero`))
                                        }
                                    });
                                    ["skewX", "skewY"].forEach(r => {
                                        if (void 0 !== k[r]) {
                                            var q = k[r];
                                            let I = parseFloat(a.getAttribute(`data-${r}`) || "0");
                                            if ("string" === typeof q && (q.startsWith("+") || q.startsWith("-") || q.startsWith("+=") || q.startsWith("-="))) {
                                                let J = 0;
                                                q.startsWith("+=") ? J = parseFloat(q.slice(2).replace(/deg/gi, "")) || 0 : q.startsWith("-=") ? J = -parseFloat(q.slice(2).replace(/deg/gi, "")) || 0 : q.startsWith("+") ?
                                                    J = parseFloat(q.slice(1).replace(/deg/gi, "")) || 0 : q.startsWith("-") && (J = -parseFloat(q.slice(1).replace(/deg/gi, "")) || 0);
                                                k[r] = I + J
                                            } else q = parseFloat(String(q).replace(/deg/gi, "")), isNaN(q) && (q = 0), k[r] = q
                                        }
                                    });
                                    a.currentAnimationFrame = requestAnimationFrame(ma);
                                    a.stop = function() {
                                        a.currentAnimationFrame && !T && (window.cancelAnimationFrame(a.currentAnimationFrame), da += X, T = !0, a.animationStopped = !0, R && R.fail && R.fail.call(u, a))
                                    };
                                    a.start = function() {
                                        T && (T = !1, a.animationStopped = !1, S = null, window.requestAnimationFrame(ma))
                                    }
                                } else qa(P,
                                    ba)
                            })(b, c, d, y, V)
                        }
                    } else y()
                })
            });
            Promise.all(C).then(() => {
                "function" === typeof d && d.call(this, this.elements);
                d && d.always && d.always.call(this, this.elements);
                n()
            }).catch(a => {
                A(a)
            })
        }
    }));
    return this
};
$.fn._animate0 = function(b, c, d, m) {
    try {
        if (!this.data("queueId")) {
            const f = Date.now(),
                v = Math.random().toString(36).substr(2, 5);
            this.data("queueId", `q_${f}_${v}`)
        }
        const p = this.data("queueId");
        var h = this[0];
        h.hasAttribute("data-is-stopnow") && h.removeAttribute("data-is-stopnow");
        const t = window.getComputedStyle(h);
        if (!this.fx[p] || !this.fx[p].length) {
            if (b.display && t.display === b.display) return this;
            if (void 0 !== b.opacity) {
                const f = parseFloat(t.opacity);
                if (0 === b.opacity && 0 === f || 1 === b.opacity && 1 === f) return this
            }
        }
        if (this.fx[p] &&
            this.fx[p].length) {
            const f = JSON.stringify(this.fx[p][this.fx[p].length - 1].properties),
                v = JSON.stringify(b);
            if (f === v) return this
        }
        this.fx[p] || (this.fx[p] = []);
        if (!this.data("initialState")) {
            const f = {};
            ["left", "top", "right", "bottom"].forEach(v => {
                f[v] = t[v]
            });
            this.data("initialState", f)
        }
        let n;
        h = {};
        b.start && (h.start = b.start);
        b.progress && (h.progress = b.progress);
        b.step && (h.step = b.step);
        b.done && (h.done = b.done);
        b.complete && !b.done && (h.done = b.complete);
        b.fail && (h.fail = b.fail);
        b.always && (h.always = b.always);
        "function" ===
        typeof d ? n = d : d && "object" === typeof d && (n = d.done || d.complete || d, d.complete && !d.done && (d.done = d.complete), Object.assign(h, d));
        const {
            start: A,
            progress: u,
            step: B,
            done: C,
            complete: e,
            fail: w,
            always: g,
            ...a
        } = b;
        this.fx[p].push({
            type: "animate",
            properties: a,
            duration: c,
            callback: n,
            lifecycleCallbacks: h,
            skipQueue: m,
            completed: !1
        });
        1 === this.fx[p].length && this.dequeue();
        return this
    } catch (p) {
        return this.selector && "string" === typeof this.selector ? this.selector.startsWith("text=") ? console.warn(`No elements found with text containing "${searchText}"`) :
            this.selector.startsWith("size[") ? console.warn(`No elements found matching size condition "${this.selector}"`) : this.selector.startsWith("#") ? console.warn(`No element found with ID "${this.selector.slice(1)}"`) : this.selector.startsWith(".") ? console.warn(`No elements found with class "${this.selector.slice(1)}"`) : console.warn(`No elements found matching selector "${this.selector}"`) : console.warn("Animation initialization error:", p), d?.fail && d.fail.call(this, p), this
    }
};
$.animate = function(b, c, d, m) {
    return "object" === typeof c ? (b = {
        ...b,
        ...Object.keys(c).filter(h => "duration" !== h && "queue" !== h).reduce((h, p) => {
            h[p] = c[p];
            return h
        }, {})
    }, this._animate0(b, c.duration || 400, d, c.queue)) : this._animate0(b, c, d, m)
};
$.fn.animate = function() {
    return $.animate.apply(this, arguments)
};
$.anitime = function(b, c) {
    window._runningAnimations || (window._runningAnimations = new Map);
    if (0 < this.anitimeRunning) return this;
    if (!this.elements || 0 === this.elements.length) return console.warn("No elements found to run animation list."), c && c(), this;
    const d = window._runningAnimations.get(this.selector);
    d && d !== this && (d.elements.forEach(g => {
        $(g).stop(!0, !0)
    }), d._Queue = Promise.resolve(), d.fx && Object.keys(d.fx).forEach(g => {
        d.fx[g] = []
    }));
    window._runningAnimations.set(this.selector, this);
    window._elementOriginalStates ||
        (window._elementOriginalStates = new Map);
    const m = this,
        h = this.elements.map(g => {
            if (g.id) return g.id;
            if (g.getAttribute("data-anitime-id")) return g.getAttribute("data-anitime-id");
            const a = "anitime_" + Math.random().toString(36).substr(2, 9);
            g.setAttribute("data-anitime-id", a);
            return a
        }),
        p = h.join(","),
        t = g => {
            const a = document.createElement("div");
            a.className = "anitime-virtual-parent";
            a.style.cssText = "\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\topacity: 0;\n\t\t\tpointer-events: none;\n\t\t\tz-index: 1;\n\t\t";
            var f = window.getComputedStyle(g);
            const v = f.position,
                H = f.zIndex;
            f = f.transform;
            g.style.position = "relative";
            g.style.zIndex = "2";
            g = g.getBoundingClientRect();
            a._originalRect = {
                top: g.top,
                left: g.left,
                width: g.width,
                height: g.height,
                position: v,
                zIndex: H,
                transform: "none" === f ? "" : f
            };
            return a
        },
        n = g => {
            g = `step_${g}`;
            if (this.animationDump[g]) return !1;
            this.animationDump[g] = this.elements.map(a => {
                var f = a.id || a.getAttribute("data-anitime-id");
                const v = window.getComputedStyle(a);
                let H = {};
                for (let y of v) H[y] = v.getPropertyValue(y);
                H.inlineStyles = a.style.cssText;
                return {
                    id: f,
                    state: H,
                    timestamp: Date.now()
                }
            });
            return !0
        };
    var A = $(this.elements[0]);
    A.data("isStopnow") && (0 === b ? "running" !== A.data("animationState") && this.start() : (this.stop(!0), this.start(), this.dequeue()));
    if (0 === arguments.length) {
        const g = [],
            a = {
                animate: this.animate,
                delay: this.delay,
                css: this.css,
                hide: this.hide,
                show: this.show
            };
        this.elements.forEach(f => {
            f.id || f.getAttribute("data-anitime-id") || f.setAttribute("data-anitime-id", "anitime_" + Math.random().toString(36).substr(2,
                9))
        });
        this.animate = function(f, v, H) {
            g.push({
                type: "animate",
                properties: f,
                duration: v,
                callback: H,
                args: arguments
            });
            this.animationChains[p] = g;
            return this
        };
        this.css = function(f, v) {
            g.push({
                type: "css",
                properties: f,
                callback: v,
                args: arguments
            });
            this.animationChains[p] = g;
            return this
        };
        this.delay = function(f, v) {
            g.push({
                type: "delay",
                delay: f,
                callback: v,
                args: arguments
            });
            this.animationChains[p] = g;
            return this
        };
        this.hide = function(...f) {
            g.push({
                type: "hide",
                callback: "function" === typeof f[f.length - 1] ? f[f.length - 1] : null,
                args: f
            });
            this.animationChains[p] = g;
            return this
        };
        this.show = function(...f) {
            g.push({
                type: "show",
                callback: "function" === typeof f[f.length - 1] ? f[f.length - 1] : null,
                args: f
            });
            this.animationChains[p] = g;
            return this
        };
        this.end = function(f) {
            Object.assign(this, a);
            this.animationChains[p] = g;
            h.forEach((v, H) => {
                H = this.elements[H];
                window._elementOriginalStates.has(v) || (H = H.cloneNode(!0), window._elementOriginalStates.set(v, [H]))
            });
            0 < arguments.length && this.anitime(f, c);
            return this
        };
        return this
    }
    this.anitimeRunning = 1;
    A = this.animationChains[p];
    if (!A) return console.warn("No animation chain found for elements:", p), c && c(), this;
    var u = (g => {
        if (0 === g) return 0;
        for (g = 10 * Math.floor(g / 10); 0 < g; g -= 10)
            if (this.animationDump[`step_${g}`]) return g;
        return 0
    })(b);
    let B = [];
    if (!A.some(g => {
            if (!["animate", "show", "hide"].includes(g.type)) return !1;
            g = g.properties;
            if (!g) return !1;
            const a = ["left", "top", "right", "bottom"];
            return Object.entries(g).some(([f, v]) => a.includes(f) ? "string" === typeof v && (v.includes("+=") || v.includes("-=") || /^[+-]\d/.test(v)) : !1)
        }))
        if (this.elements.forEach(g => {
                $(g).css("opacity", "0")
            }), 0 < u) {
            const g = this.animationDump[`step_${u}`];
            this.elements.forEach((a, f) => {
                var v = window._elementOriginalStates.get(h[f]);
                v && v[0] && (v = v[0].cloneNode(!0), a.parentNode.replaceChild(v, a), this.elements[f] = v, v.style.cssText = g[f].state.inlineStyles, a = t(v), B.push(a), v.parentNode.insertBefore(a, v), a.appendChild(v))
            })
        } else this.elements.forEach(g => {
            const a = t(g);
            g.parentNode.insertBefore(a, g);
            a.appendChild(g);
            B.push(a)
        }), this.elements.forEach((g, a) => {
            var f = window._elementOriginalStates.get(h[a]);
            f && f[0] && (f = f[0].cloneNode(!0), B[a].replaceChild(f, g), this.elements[a] = f)
        });
    var C = "q" + Date.now() + Math.random().toString(36).substr(2, 5);
    m.data("queueId", C);
    m.fx[C] = [];
    let e = !1,
        w = !1;
    C = A.filter(g => "animate" === g.type || "hide" === g.type || "show" === g.type).pop();
    C = A.lastIndexOf(C);
    for (let g = u; g < A.length; g++) {
        const a = A[g],
            f = () => {
                0 === (g + 1) % 10 && n(g + 1)
            };
        g !== b || e || m.queue(function(H) {
            setTimeout(() => {
                m.anitimeRunning = 0
            }, 0);
            B.forEach((y, V) => {
                V = m.elements[V];
                const W = y._originalRect;
                V.style.position = W.position;
                V.style.zIndex =
                    W.zIndex;
                V.style.transform = W.transform;
                y.parentNode.insertBefore(V, y);
                y.remove();
                $(V).css("opacity", "1")
            });
            e = !0;
            f();
            H()
        });
        const v = H => {
            g < b || e || this.elements.forEach(y => {
                $(y).css("opacity", "0")
            });
            H()
        };
        if ("css" === a.type) m.queue(function(H) {
            v(() => {
                m.css(a.properties);
                a.callback && a.callback.call(m);
                f();
                H()
            })
        });
        else if ("delay" === a.type) m.delay(g < b ? 1 : a.delay).queue(function(H) {
            v(() => {
                a.callback && a.callback.call(m);
                f();
                H()
            })
        });
        else if ("animate" === a.type) m.animate(a.properties, g < b ? 1 : a.duration, g === C ? function() {
            v(() => {
                a.callback && a.callback.call(m);
                f();
                !w && c && (w = !0, c())
            })
        } : function() {
            v(() => {
                a.callback && a.callback.call(m);
                f()
            })
        });
        else if ("hide" === a.type || "show" === a.type) {
            u = 300;
            let H = {},
                y = a.callback || null;
            "number" === typeof a.args[0] ? (u = a.args[0], "function" === typeof a.args[1] ? y = a.args[1] : "object" === typeof a.args[1] && (H = a.args[1], y = a.args[2])) : (H = "object" === typeof a.args[0] ? a.args[0] : {}, y = "function" === typeof a.args[1] ? a.args[1] : null);
            m[a.type](g < b ? 1 : u, H, g === C ? function() {
                    v(() => {
                        y && y.call(m);
                        f();
                        !w && c && (w = !0, c())
                    })
                } :
                function() {
                    v(() => {
                        y && y.call(m);
                        f()
                    })
                })
        }
    }
    $(this.elements[0]).removeData("isStopped");
    m.start();
    m.dequeue();
    return this
};
$.fn.anitime = function(b, c) {
    $.anitime.apply(this, arguments);
    return this
};
$.fn.svg = function() {
    if (this.data("svgInitialized")) return this;
    this.data("svgInitialized", !0);
    this.data("svgPoints", []);
    const b = this,
        c = parseFloat(b.css("left")) || 0,
        d = parseFloat(b.css("top")) || 0,
        m = this.data("svgPoints");
    m.push({
        x: c,
        y: d
    });
    this.data("svgPoints", m);
    this.animate = function(h, p, t, n) {
        "function" === typeof p ? (n = p, p = 400, t = "swing") : "function" === typeof t && (n = t, t = "swing");
        p = p || 400;
        t = t || "swing";
        if (void 0 !== h.left && void 0 !== h.top) {
            const A = this.data("svgPoints");
            A.push({
                x: parseFloat(h.left),
                y: parseFloat(h.top),
                duration: p,
                easing: t
            });
            this.data("svgPoints", A);
            clearTimeout(this.data("svgTimeout"));
            this.data("svgTimeout", setTimeout(() => {
                createAndAnimateAlongPath(b, this.data("svgPoints"), n)
            }, 0))
        }
        return this
    };
    return this
};

function createAndAnimateAlongPath(b, c, d) {
    function m(B) {
        B = Math.min((B - u) / A, 1);
        const C = p.getPointAtLength(n * B);
        b.css({
            left: C.x + "px",
            top: C.y + "px"
        });
        1 > B ? requestAnimationFrame(m) : (h.remove(), b.removeData("svgInitialized"), b.removeData("svgPoints"), b.removeData("svgTimeout"), d && "function" === typeof d && d.call(b))
    }
    if (!(2 > c.length)) {
        var h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        h.setAttribute("width", "100%");
        h.setAttribute("height", "100%");
        h.style.position = "absolute";
        h.style.top = "0";
        h.style.left =
            "0";
        h.style.pointerEvents = "none";
        h.style.zIndex = "-1";
        var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", "#00a8ff");
        p.setAttribute("stroke-width", "2");
        var t = `M ${c[0].x} ${c[0].y}`;
        for (let B = 1; B < c.length; B++) {
            const C = c[B - 1],
                e = c[B];
            t += ` C ${C.x+(e.x-C.x)/3} ${C.y}, ${C.x+2*(e.x-C.x)/3} ${e.y}, ${e.x} ${e.y}`
        }
        p.setAttribute("d", t);
        h.appendChild(p);
        c.forEach(B => {
            const C = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            C.setAttribute("cx", B.x);
            C.setAttribute("cy", B.y);
            C.setAttribute("r", "3");
            C.setAttribute("fill", "red");
            h.appendChild(C)
        });
        document.body.appendChild(h);
        var n = p.getTotalLength(),
            A = c.reduce((B, C, e) => 0 < e ? B + (C.duration || 400) : B, 0),
            u = performance.now();
        requestAnimationFrame(m)
    }
}
$.fn.aniPath = function(b, c, d) {
    if ("string" !== typeof b) return console.error("SVG path specification must be a string"), this;
    if (!this.length) return console.error("No elements found for the selector"), this;
    let m = 0;
    const h = this.length,
        p = this;
    this.each(function(t) {
        t = $(this);
        var n = t[0];
        const A = n.closest(".example-container") || n.parentElement || document.body;
        if (!A) return console.error("Container element not found for aniPath animation"), this;
        const u = A.getBoundingClientRect();
        if (!u) return console.error("Failed to get container bounding rect"),
            this;
        var B = window.getComputedStyle(n);
        const C = "none" === B.display || "hidden" === B.visibility || 0 === parseFloat(B.opacity),
            e = {
                display: B.display,
                visibility: B.visibility,
                opacity: parseFloat(B.opacity)
            };
        "static" === B.position && (n.style.position = "absolute");
        const w = parsePathSpecCorrectly(b);
        let g = !1;
        0 < w.length && !0 === w[0].options.show && (g = !0);
        let a = !1;
        C && "none" === B.display && (n.style.display = "block", n.style.visibility = "hidden", a = !0);
        var f = n.getBoundingClientRect();
        B = f.width;
        const v = f.height,
            H = void 0 !== n.offsetLeft ?
            n.offsetLeft : f.left - u.left;
        f = void 0 !== n.offsetTop ? n.offsetTop : f.top - u.top;
        a && (n.style.display = e.display, n.style.visibility = e.visibility);
        const y = [{
            x: H + B / 2,
            y: f + v / 2,
            isHidden: C,
            originalStyles: e,
            show: g
        }];
        d && d.debug && console.log("\ud30c\uc2f1\ub41c \uc120\ud0dd\uc790:", w.map(V => V.selector).join(" -> "));
        w.forEach(V => {
            let W;
            try {
                W = $(V.selector, A), W.length || (W = $(V.selector))
            } catch (L) {
                console.error("\uc120\ud0dd\uc790 \uc624\ub958:", L);
                return
            }
            W && W.length ? W.each(function() {
                const L = createPointFromSection(V,
                    this, A, u, d);
                y.push(L)
            }) : console.warn(`\uc120\ud0dd\uc790 ${V.selector}\uc5d0 \ud574\ub2f9\ud558\ub294 \uc694\uc18c\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.`)
        });
        n = function() {
            m++;
            m === h && "function" === typeof c && c.call(p)
        };
        2 <= y.length ? (n = animateAlongPath(t, y, n, d), t.data("aniPathInstance", n)) : (console.warn("\uc560\ub2c8\uba54\uc774\uc158 \ud3ec\uc778\ud2b8\uac00 \ucda9\ubd84\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4."), m++, m === h && c && c.call(p))
    });
    if (0 < this.length) {
        const t = $(this[0]).data("aniPathInstance");
        if (t) return t
    }
    return this
};

function calculateTargetCenter(b, c, d) {
    const m = b.getBoundingClientRect();
    let h;
    b.offsetParent === c || b.offsetParent && b.offsetParent.contains(c) ? (h = b.offsetLeft, b = b.offsetTop) : (h = m.left - d.left, b = m.top - d.top, d = window.getComputedStyle(c), h -= parseFloat(d.borderLeftWidth) || 0, h -= parseFloat(d.paddingLeft) || 0, b -= parseFloat(d.borderTopWidth) || 0, b -= parseFloat(d.paddingTop) || 0);
    return {
        x: h + m.width / 2 + (c.scrollLeft || 0),
        y: b + m.height / 2 + (c.scrollTop || 0)
    }
}

function validateAndNormalizeOptions(b, c) {
    let d = b.time || b.duration || 300;
    if (isNaN(d) || 0 > d) console.warn(`Invalid duration value for ${c}, using default 300ms`), d = 300;
    let m = b.delay || 0;
    if (isNaN(m) || 0 > m) console.warn(`Invalid delay value for ${c}, using default 0ms`), m = 0;
    b = b.easing || "swing";
    if ("string" !== typeof b || "" === b.trim()) console.warn(`Invalid easing value for ${c}, using default 'swing'`), b = "swing";
    return {
        duration: d,
        easing: b,
        delay: m
    }
}

function createPointFromSection(b, c, d, m, h) {
    c = calculateTargetCenter(c, d, m);
    d = validateAndNormalizeOptions(b.options, b.selector);
    h && h.debug && console.log(`\ud0c0\uac9f ${b.selector} \uc911\uc2ec \uc88c\ud45c:`, c.x, c.y);
    const p = {
        x: c.x,
        y: c.y,
        duration: d.duration,
        easing: d.easing,
        delay: d.delay,
        targetSelector: b.selector
    };
    !0 === b.options.show && (p.show = !0);
    !0 === b.options.hide && (p.hide = !0);
    Object.keys(b.options).forEach(t => {
        "time duration easing delay show hide".split(" ").includes(t) || (p[t] = b.options[t])
    });
    return p
}

function parseTransform(b, c = !0) {
    const d = {
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        skewX: 0,
        skewY: 0
    };
    if (!b || "none" === b) return d;
    var m = b;
    c && (m = b.replace(/translate\([^)]+\)/g, "").trim());
    b = {
        ...d
    };
    if (c = m.match(/scale\(([^,]+),\s*([^)]+)\)/)) b.scaleX = parseFloat(c[1]) || 1, b.scaleY = parseFloat(c[2]) || 1;
    else if (c = m.match(/scale\(([^)]+)\)/)) c = parseFloat(c[1]) || 1, b.scaleX = c, b.scaleY = c;
    if (c = m.match(/rotate\(([^)]+)deg\)/)) b.rotate = parseFloat(c[1]) || 0;
    if (c = m.match(/rotateX\(([^)]+)deg\)/)) b.rotateX = parseFloat(c[1]) ||
        0;
    if (c = m.match(/rotateY\(([^)]+)deg\)/)) b.rotateY = parseFloat(c[1]) || 0;
    if (c = m.match(/skewX\(([^)]+)deg\)/)) b.skewX = parseFloat(c[1]) || 0;
    if (m = m.match(/skewY\(([^)]+)deg\)/)) b.skewY = parseFloat(m[1]) || 0;
    return b
}

function animateAlongPath(b, c, d, m = {}) {
    function h(l) {
        return l >= c.length - 1 ? 0 : (c[l + 1].duration || c[l + 1].time || 400) + (c[l + 1].delay || 0)
    }

    function p(l, E) {
        if (!l.targetSelector) return {
            width: 0,
            height: 0,
            x: l.x || 0,
            y: l.y || 0
        };
        if (l.targetSelector.startsWith("#")) {
            var G = $(l.targetSelector, f);
            if (G.length) return l = G[0].getBoundingClientRect(), {
                width: l.width,
                height: l.height,
                x: l.left - v.left + l.width / 2,
                y: l.top - v.top + l.height / 2
            }
        }
        return l.targetSelector.startsWith(".") && (V[l.targetSelector] || (V[l.targetSelector] = $(l.targetSelector,
            f), W[l.targetSelector] = 0), G = V[l.targetSelector], G.length && (0 < E && c[E - 1].targetSelector === l.targetSelector && (W[l.targetSelector]++, W[l.targetSelector] >= G.length && (W[l.targetSelector] = 0)), E = G[W[l.targetSelector]])) ? (l = E.getBoundingClientRect(), {
            width: l.width,
            height: l.height,
            x: l.left - v.left + l.width / 2,
            y: l.top - v.top + l.height / 2
        }) : {
            width: 0,
            height: 0,
            x: l.x || 0,
            y: l.y || 0
        }
    }

    function t(l) {
        if (ma) fa = requestAnimationFrame(t);
        else {
            for (l = l - za - Aa; P < c.length - 1 && l > ba + h(P);) ba += h(P), P++;
            if (P >= c.length - 1 && l > ba) {
                const O = c[c.length -
                    1];
                l = U[c.length - 1];
                n(a, l.x, l.y);
                B(b, O, k);
                if (!0 === O.hide) {
                    const N = O.time || 300,
                        M = performance.now(),
                        ca = parseFloat(window.getComputedStyle(a).opacity);

                    function aa(S) {
                        let X = S = Math.min((S - M) / N, 1);
                        const da = O.easing || "linear";
                        "function" === typeof $._anieasing ? X = $._anieasing(0, 1, S, da) : $.easing && $.easing[da] ? X = $.easing[da](null, S, 0, 1, 1) : "swing" === da && (X = .5 - Math.cos(S * Math.PI) / 2);
                        a.style.opacity = ca * (1 - X);
                        a.style.left = Z.left;
                        a.style.top = Z.top;
                        a.style.transform = Z.transform;
                        1 > S ? requestAnimationFrame(aa) : (a.style.display =
                            "none", f.contains(y) && !1 !== g.lineOut && null !== g.lineOut && Infinity !== g.lineOut && (g.lineOut ? setTimeout(() => {
                                f.removeChild(y)
                            }, g.lineOut) : f.removeChild(y)))
                    }
                    const Z = {
                        left: a.style.left,
                        top: a.style.top,
                        transform: a.style.transform
                    };
                    requestAnimationFrame(aa)
                } else !1 !== g.lineOut && null !== g.lineOut && Infinity !== g.lineOut && setTimeout(() => {
                    f.contains(y) && f.removeChild(y)
                }, g.lineOut);
                ka = !1;
                oa = !0;
                fa = null;
                d && "function" === typeof d && d.call(b)
            } else {
                var E = h(P),
                    G = l - ba,
                    D = Math.min(G / E, 1);
                l = c[P];
                var z = c[P + 1],
                    x = U[P],
                    K = U[P +
                        1];
                z && z.delay && G < z.delay ? requestAnimationFrame(t) : (E = z && z.delay ? (G - z.delay) / (E - z.delay) : D, 0 < E && (G = z.easing || "linear", D = E, "function" === typeof $._anieasing ? D = $._anieasing(0, 1, E, G) : $.easing && $.easing[G] ? D = $.easing[G](null, E, 0, 1, 1) : "swing" === G && (D = .5 - Math.cos(E * Math.PI) / 2), n(a, x.x + (K.x - x.x) * D, x.y + (K.y - x.y) * D), g.line && (A(y, "http://www.w3.org/2000/svg", L, Q, c, l, z, P, D, qa, x, K), qa || (qa = !0)), u(b, a, l, z, D, k)), fa = requestAnimationFrame(t))
            }
        }
    }

    function n(l, E, G) {
        l.style.left = `${E}px`;
        l.style.top = `${G}px`;
        l.style.transform =
            "translate(-50%, -50%)"
    }

    function A(l, E, G, D, z, x, K, O, N, M, ca, aa) {
        if (!M) {
            let Z = "#00a8ff";
            x = 2;
            M = "none";
            let S = !0;
            if ("string" === typeof g.line && "" !== g.line.trim()) {
                const X = g.line.trim();
                X.includes("point:false") && (S = !1);
                const da = X.match(/(\d+)(?:px)?\s+(solid|dotted|dashed|double|groove|ridge|inset|outset)\s+(#[0-9a-f]{3,8}|rgba?\([^)]+\)|[a-z]+)/i);
                if (da) {
                    x = parseInt(da[1], 10) || x;
                    switch (da[2].toLowerCase()) {
                        case "solid":
                            M = "none";
                            break;
                        case "dotted":
                            M = `${x},${x}`;
                            break;
                        case "dashed":
                            M = `${4*x},${2*x}`;
                            break;
                        case "double":
                            M = `${2*x},${x}`;
                            break;
                        default:
                            M = "none"
                    }
                    Z = da[3]
                } else if (["solid", "dotted", "dashed", "dashdot"].includes(X.toLowerCase())) switch (X.toLowerCase()) {
                    case "solid":
                        M = "none";
                        break;
                    case "dotted":
                        M = "2,2";
                        break;
                    case "dashed":
                        M = "8,4";
                        break;
                    case "dashdot":
                        M = "8,4,2,4"
                } else if (X.startsWith("#") || X.startsWith("rgb") || /^[a-z]+$/i.test(X)) Z = X
            }
            l.appendChild(document.createElementNS(E, "g"));
            f.appendChild(l);
            S && z.forEach((X, da) => {
                var Y = U[da];
                X = Y.x;
                Y = Y.y;
                var T = document.createElementNS(E, "circle");
                T.setAttribute("cx",
                    X);
                T.setAttribute("cy", Y);
                T.setAttribute("r", "3");
                T.setAttribute("fill", Z);
                T.setAttribute("opacity", "0");
                l.appendChild(T);
                G.push(T);
                T = document.createElementNS(E, "text");
                T.setAttribute("x", X + 5);
                T.setAttribute("y", Y - 5);
                T.setAttribute("font-size", "10");
                T.setAttribute("fill", "#333");
                T.setAttribute("opacity", "0");
                T.textContent = da;
                l.appendChild(T);
                D.push(T)
            });
            l.dataset.showMarkers = S;
            l.dataset.strokeColor = Z;
            l.dataset.strokeWidth = x;
            l.dataset.strokeDashArray = M;
            l.dataset.strokeOpacity = .5
        }
        K && (K = Math.max(.01,
            N), z = ca.x + (aa.x - ca.x) * K, aa = ca.y + (aa.y - ca.y) * K, K = l.querySelector("g"), (x = K.lastElementChild) && x.getAttribute("data-segment-index") === O.toString() ? (ca = x.getAttribute("d").split("L")[0], x.setAttribute("d", `${ca} L ${z} ${aa}`)) : (x = document.createElementNS(E, "path"), x.setAttribute("fill", "none"), x.setAttribute("stroke", l.dataset.strokeColor), x.setAttribute("stroke-width", l.dataset.strokeWidth), x.setAttribute("opacity", l.dataset.strokeOpacity), "none" !== l.dataset.strokeDashArray && x.setAttribute("stroke-dasharray",
            l.dataset.strokeDashArray), x.setAttribute("d", `${`M ${ca.x} ${ca.y}`} ${`L ${z} ${aa}`}`), x.setAttribute("data-segment-index", O.toString()), K.appendChild(x)), "true" === l.dataset.showMarkers && 0 < G.length && 0 < D.length && (G.forEach((Z, S) => {
            (S < O || S === O && .9 < N) && Z.setAttribute("opacity", "0.7")
        }), D.forEach((Z, S) => {
            (S < O || S === O && .9 < N) && Z.setAttribute("opacity", "0.7")
        })))
    }

    function u(l, E, G, D, z, x) {
        pa.forEach(K => {
            if (void 0 !== D[K]) {
                var O = void 0 !== G[K] ? G[K] : x[K],
                    N = D[K],
                    M = N;
                "string" === typeof N && (N.startsWith("+=") ? M =
                    O + parseFloat(N.substring(2)) : N.startsWith("-=") ? M = O - parseFloat(N.substring(2)) : N.startsWith("+") ? M = O + parseFloat(N.substring(1)) : N.startsWith("-") ? M = O - parseFloat(N.substring(1)) : N.endsWith("%") ? (M = parseFloat(N) / 100, M = "width" === K ? f.clientWidth * M : "height" === K ? f.clientHeight * M : O * M) : M = parseFloat(N));
                N = O + (M - O) * z;
                "opacity" === K ? E.style.opacity = N : "width" === K ? E.style.width = `${N}px` : "height" === K ? E.style.height = `${N}px` : "fontSize" === K ? E.style.fontSize = `${N}px` : "color" === K || "backgroundColor" === K ? "function" ===
                    typeof $.fn.animate_interpolateColor ? (O = $.fn.animate_interpolateColor(O, M, z), E.style[K] = O) : E.style[K] = M : "borderRadius" === K ? E.style.borderRadius = `${N}px` : "scale scaleX scaleY rotate rotateX rotateY skewX skewY".split(" ").includes(K) && C(E, K, N)
            }
        })
    }

    function B(l, E, G) {
        const D = l[0];
        pa.forEach(z => {
            if (void 0 !== E[z]) {
                var x = E[z];
                "string" === typeof x && (x.startsWith("+=") ? x = G[z] + parseFloat(x.substring(2)) : x.startsWith("-=") ? x = G[z] - parseFloat(x.substring(2)) : x.startsWith("+") ? x = G[z] + parseFloat(x.substring(1)) :
                    x.startsWith("-") ? x = G[z] - parseFloat(x.substring(1)) : x.endsWith("%") ? (x = parseFloat(x) / 100, x = "width" === z ? f.clientWidth * x : "height" === z ? f.clientHeight * x : G[z] * x) : x = parseFloat(x));
                "opacity" === z ? D.style.opacity = x : "width" === z || "height" === z || "fontSize" === z || "borderRadius" === z ? D.style[z] = `${x}px` : "color" === z || "backgroundColor" === z ? D.style[z] = x : "scale scaleX scaleY rotate rotateX rotateY skewX skewY".split(" ").includes(z) && (C(D, z, x), D.setAttribute(`data-${z}`, x))
            }
        })
    }

    function C(l, E, G) {
        var D = (l.style.transform ||
            "").replace(/translate\(-50%,\s*-50%\)/, "").trim();
        D = parseTransform(D, !1);
        "scale" === E ? (D.scaleX = G, D.scaleY = G) : D[E] = G;
        l.style.transform = `translate(-50%, -50%) ${(`scale(${D.scaleX}, ${D.scaleY}) `+`rotate(${D.rotate}deg) `+`rotateX(${D.rotateX}deg) `+`rotateY(${D.rotateY}deg) `+`skewX(${D.skewX}deg) `+`skewY(${D.skewY}deg)`).trim()}`
    }

    function e(l) {
        if (!ka || oa) return console.warn("\uc560\ub2c8\uba54\uc774\uc158\uc774 \uc2e4\ud589 \uc911\uc774 \uc544\ub2c8\ubbc0\ub85c \ud3ec\uc778\ud2b8\ub97c \ucd94\uac00\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."),
            !1;
        l = parsePathSpecCorrectly(l);
        const E = f.getBoundingClientRect();
        l.forEach(G => {
            let D;
            try {
                D = $(G.selector, f), D.length || (D = $(G.selector))
            } catch (z) {
                console.error("\uc120\ud0dd\uc790 \uc624\ub958:", z);
                return
            }
            D && D.length && D.each(function() {
                const z = createPointFromSection(G, this, f, E, null);
                c.push(z);
                const x = p(z, c.length - 1);
                U.push(x);
                void 0 === z.x && (z.x = x.x);
                void 0 === z.y && (z.y = x.y)
            })
        });
        return !0
    }

    function w() {
        if (!ka || oa) {
            var l = U[U.length - 1];
            return {
                x: l.x,
                y: l.y
            }
        }
        var E = c[P + 1];
        l = U[P];
        const G = U[P + 1];
        if (!E) return {
            x: l.x,
            y: l.y
        };
        var D = h(P),
            z = performance.now() - za - Aa - ba;
        D = Math.min(Math.max(z / D, 0), 1);
        E = E.easing || "linear";
        z = D;
        "function" === typeof $._anieasing ? z = $._anieasing(0, 1, D, E) : $.easing && $.easing[E] ? z = $.easing[E](null, D, 0, 1, 1) : "swing" === E && (z = .5 - Math.cos(D * Math.PI) / 2);
        return {
            x: l.x + (G.x - l.x) * z,
            y: l.y + (G.y - l.y) * z
        }
    }
    if (2 > c.length) return null;
    const g = {
        line: !1,
        lineOut: 1E3,
        ...m
    };
    !1 === g.line || null === g.line || "string" === typeof g.line && "" !== g.line.trim() || !0 === g.line || (console.warn("Invalid line option value, using default false"),
        g.line = !1);
    !1 !== g.lineOut && null !== g.lineOut && Infinity !== g.lineOut && ("number" !== typeof g.lineOut || isNaN(g.lineOut) || 0 > g.lineOut) && (console.warn("Invalid lineOut option value, using default 1000ms"), g.lineOut = 1E3);
    const a = b[0];
    if (!a) return console.error("Element not found for animateAlongPath"), null;
    const f = a.closest(".example-container") || a.parentElement || document.body;
    if (!f) return console.error("Container element not found for animateAlongPath"), null;
    const v = f.getBoundingClientRect();
    if (!v) return console.error("Failed to get container bounding rect for animateAlongPath"),
        null;
    const H = window.getComputedStyle(a);
    "static" === H.position && (a.style.position = "absolute");
    a.style.transformOrigin = "center center";
    const y = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    if (!y) return console.error("Failed to create SVG element"), null;
    y.setAttribute("width", "100%");
    y.setAttribute("height", "100%");
    y.style.position = "absolute";
    y.style.top = "0";
    y.style.left = "0";
    y.style.pointerEvents = "none";
    y.style.zIndex = "1000";
    const V = {},
        W = {};
    let L = [],
        Q = [];
    m = c[0];
    m.isHidden && !0 === m.show &&
        ("none" === m.originalStyles.display && (a.style.display = "block"), "hidden" === m.originalStyles.visibility && (a.style.visibility = "visible"), a.style.opacity = "0", 1 < c.length && (c[1].opacity = 1));
    const k = {},
        pa = "width height opacity scale scaleX scaleY rotate rotateX rotateY skewX skewY fontSize color backgroundColor borderRadius".split(" "),
        R = parseTransform(H.transform || a.style.transform || "", !0);
    pa.forEach(l => {
        "opacity" === l ? k[l] = parseFloat(H[l]) : "width" === l || "height" === l ? k[l] = a.getBoundingClientRect()[l] : "scale" ===
            l ? k[l] = R.scaleX : "scaleX" === l ? k[l] = R.scaleX : "scaleY" === l ? k[l] = R.scaleY : ["rotate", "rotateX", "rotateY", "skewX", "skewY"].includes(l) ? k[l] = R[l] : k[l] = parseFloat(H[l]) || 0
    });
    let P = 0,
        ba = 0,
        qa = !1,
        za = performance.now(),
        ma = !1,
        wa = 0,
        Aa = 0,
        ka = !0,
        fa = null,
        oa = !1;
    const U = [];
    c.forEach((l, E) => {
        const G = p(l, E);
        U[E] = G;
        void 0 === l.x && (l.x = G.x);
        void 0 === l.y && (l.y = G.y)
    });
    const Fa = {
        addPoint: function(l) {
            return e(l)
        },
        getCurrentPosition: function() {
            return w()
        },
        isRunning: function() {
            return ka && !oa
        },
        pause: function() {
            ma || !ka || oa || (ma = !0,
                wa = performance.now());
            return Fa
        },
        resume: function() {
            ma && ka && !oa && (0 < wa && (Aa += performance.now() - wa, wa = 0), ma = !1);
            return Fa
        },
        stop: function() {
            null !== fa && (cancelAnimationFrame(fa), fa = null);
            ka = !1;
            oa = !0;
            ma = !1;
            return Fa
        },
        element: b,
        getCurrentPointIndex: function() {
            return P
        },
        getTotalPoints: function() {
            return c.length
        }
    };
    fa = requestAnimationFrame(t);
    return Fa
}

function parsePathSpecCorrectly(b) {
    const c = [];
    let d = 0;
    for (; d < b.length;)
        if ("#" === b[d] || "." === b[d]) {
            for (var m = d; d < b.length && " " !== b[d] && "{" !== b[d];) d++;
            m = b.substring(m, d).trim();
            const h = {};
            if ("{" === b[d] || " " === b[d] && -1 !== b.indexOf("{", d)) {
                for (;
                    " " === b[d];) d++;
                if ("{" === b[d]) {
                    const p = d + 1;
                    let t = 1;
                    for (d++; d < b.length && 0 < t;) "{" === b[d] && t++, "}" === b[d] && t--, d++;
                    b.substring(p, d - 1).trim().split(",").forEach(n => {
                        const A = n.indexOf(":");
                        if (-1 !== A) {
                            const u = n.substring(0, A).trim();
                            n = n.substring(A + 1).trim();
                            if (n.startsWith('"') &&
                                n.endsWith('"') || n.startsWith("'") && n.endsWith("'")) n = n.substring(1, n.length - 1);
                            "show" === u || "hide" === u ? "true" === n.toLowerCase() ? h[u] = !0 : (n.toLowerCase(), h[u] = !1) : !isNaN(parseFloat(n)) && isFinite(n) ? h[u] = parseFloat(n) : h[u] = n
                        }
                    })
                }
            }
            c.push({
                selector: m,
                options: h
            })
        } else "-" === b[d] && ">" === b[d + 1] ? d += 2 : d++;
    return c
};