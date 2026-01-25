(function() {
    "undefined" !== typeof DomQuery && DomQuery.prototype && (DomQuery.prototype.pulling = function(I) {
        function O(u) {
            var v = document.createElement("canvas");
            v.width = 1;
            v.height = 1;
            v = v.getContext("2d");
            v.fillStyle = u;
            v.fillRect(0, 0, 1, 1);
            v = v.getImageData(0, 0, 1, 1).data;
            let l = 1;
            u.toLowerCase().startsWith("rgba") && (u = u.match(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*([\d.]+)\s*\)/i)) && u[1] && (l = parseFloat(u[1]));
            return {
                r: v[0],
                g: v[1],
                b: v[2],
                a: l
            }
        }
        "string" === typeof I && (I = {
            pulling: I
        });
        const d = $.extend({}, {
                shadowColor: "rgba(0, 0, 0, 0.2)",
                circleColor: "rgba(0, 0, 0, 0.7)",
                arrowColor: "white",
                highlightColor: "rgba(255, 255, 255, 0.1)",
                minSwipeDistance: 30,
                maxScaleDistance: 150,
                horizontalRatio: 2.5,
                verticalRatio: 2.5,
                onLeftPull: null,
                onRightPull: null,
                onUpPull: null,
                onDownPull: null,
                progress: null,
                pulling: "left, right, up, down",
                arrow: !0,
                zIndex: 1,
                cancelThreshold: .6,
                preventNativeScroll: "auto",
                touchAction: null
            }, I),
            A = d.pulling.split(",").map(u => u.trim()).filter(u => u);
        return this.each(function() {
            function u() {
                w.width = l.width();
                w.height = l.height()
            }

            function v() {
                l[0].getBoundingClientRect();
                var e = l.offset().top,
                    n = l.offset().left,
                    h = $(window).scrollTop();
                const a = $(window).scrollLeft(),
                    b = $(window).height(),
                    f = $(window).width(),
                    g = l.outerHeight(),
                    x = l.outerWidth(),
                    m = Math.max(0, h - e);
                e = Math.min(g, h + b - e);
                h = Math.max(0, a - n);
                n = Math.min(x, a + f - n);
                return e <= m || n <= h ? {
                    top: 0,
                    bottom: g,
                    left: 0,
                    right: x,
                    centerX: x / 2,
                    centerY: g / 2
                } : {
                    top: m,
                    bottom: e,
                    left: h,
                    right: n,
                    centerX: (h + n) / 2,
                    centerY: (m + e) / 2
                }
            }
            const l = $(this);
            if (!l.data("pullingInit")) {
                "static" === l.css("position") && l.css("position", "relative");
                "hidden" !== l.css("overflow") &&
                    l.css("overflow", "hidden");
                var E = $('<div class="pulling-container"></div>').css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: d.zIndex,
                        pointerEvents: "none",
                        opacity: 0
                    }).appendTo(l),
                    P = $('<div class="pulling-shadow"></div>').css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: d.shadowColor,
                        opacity: 0,
                        transition: "opacity 0.3s",
                        pointerEvents: "none"
                    }).appendTo(E),
                    w = $('<canvas class="pulling-canvas"></canvas>').css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none"
                    }).appendTo(E)[0];
                if (w) {
                    var c = w.getContext("2d");
                    if (c) {
                        var q;
                        if (!1 !== d.arrow) {
                            var y = $('<div class="pulling-circle-container"></div>').css({
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none",
                                zIndex: d.zIndex + 2,
                                overflow: "hidden",
                                opacity: 0
                            }).appendTo(l);
                            var z = $('<div class="pulling-circle"></div>').css({
                                position: "absolute",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                backgroundColor: d.circleColor,
                                opacity: 0,
                                transition: "opacity 0.3s",
                                pointerEvents: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: d.zIndex + 1,
                                boxShadow: "inset 0 0 0px 0px rgba(255, 255, 255, 0)",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            }).appendTo(y);
                            !0 === d.arrow ? q = $('<div class="pulling-arrow"></div>').css({
                                position: "absolute",
                                width: 0,
                                height: 0,
                                borderStyle: "solid",
                                borderWidth: "8px 0 8px 12px",
                                borderColor: `transparent transparent transparent ${d.arrowColor}`,
                                transform: "translate(-50%, -50%) rotate(0deg)",
                                opacity: 0,
                                transition: "opacity 0.3s, transform 0.3s",
                                pointerEvents: "none",
                                left: "50%",
                                top: "50%"
                            }).appendTo(z) : "string" === typeof d.arrow && (q = $('<div class="pulling-text"></div>').css({
                                position: "absolute",
                                color: "white",
                                fontSize: "14px",
                                textAlign: "center",
                                transform: "translate(-50%, -50%)",
                                opacity: 0,
                                transition: "opacity 0.3s",
                                pointerEvents: "none",
                                left: "50%",
                                top: "50%",
                                width: "100%",
                                padding: "5px"
                            }).text(d.arrow).appendTo(z))
                        }
                        var L = {
                            arrow: function(e) {
                                if ("undefined" !== typeof e) {
                                    d.arrow = e;
                                    if (!z) return this;
                                    q && q.remove();
                                    !0 === e ? q = $('<div class="pulling-arrow"></div>').css({
                                        position: "absolute",
                                        width: 0,
                                        height: 0,
                                        borderStyle: "solid",
                                        borderWidth: "8px 0 8px 12px",
                                        borderColor: `transparent transparent transparent ${d.arrowColor}`,
                                        transform: "translate(-50%, -50%) rotate(0deg)",
                                        opacity: 0,
                                        transition: "opacity 0.3s, transform 0.3s",
                                        pointerEvents: "none",
                                        left: "50%",
                                        top: "50%"
                                    }).appendTo(z) : "string" === typeof e && (q = $('<div class="pulling-text"></div>').css({
                                        position: "absolute",
                                        color: "white",
                                        fontSize: "14px",
                                        textAlign: "center",
                                        transform: "translate(-50%, -50%)",
                                        opacity: 0,
                                        transition: "opacity 0.3s",
                                        pointerEvents: "none",
                                        left: "50%",
                                        top: "50%",
                                        width: "100%",
                                        padding: "5px"
                                    }).text(e).appendTo(z));
                                    return this
                                }
                                return d.arrow
                            }
                        };
                        y = function(e) {
                            return "function" === typeof e ? function() {
                                return e.apply(L, arguments)
                            } : e
                        };
                        d.onLeftPull = y(d.onLeftPull);
                        d.onRightPull = y(d.onRightPull);
                        d.onUpPull = y(d.onUpPull);
                        d.onDownPull = y(d.onDownPull);
                        d.progress = y(d.progress);
                        setTimeout(u, 10);
                        $(window).on("resize", function() {
                            u()
                        });
                        var C = !1,
                            B = !1,
                            M = 0,
                            N = 0,
                            r = 0,
                            t = 0,
                            p = null,
                            J = null,
                            K = 0,
                            F = !1,
                            D = null,
                            G = 0,
                            Q = 0,
                            R = 0,
                            S = 0;
                        y = l.attr("id");
                        y || (y = "pulling-element-" + Math.floor(1E4 *
                            Math.random()), l.attr("id", y));
                        var T = function(e) {
                            if (C) {
                                e = Math.sqrt(r * r + t * t);
                                var n = e < K * d.cancelThreshold;
                                B && !n && A.includes(p) && e >= 1.5 * d.minSwipeDistance && !F && (e = {
                                    left: d.onLeftPull,
                                    right: d.onRightPull,
                                    up: d.onUpPull,
                                    down: d.onDownPull
                                } [p], "function" === typeof e && (F = !0, e.call(L)));
                                if (B && A.includes(p)) {
                                    R = r;
                                    S = t;
                                    G = 0;
                                    Q = performance.now();
                                    D && cancelAnimationFrame(D);
                                    var h = function(a) {
                                        G = Math.min((a - Q) / 300, 1);
                                        a = 1 - (1 - G) * (1 - G);
                                        r = R * (1 - a);
                                        t = S * (1 - a);
                                        c.clearRect(0, 0, w.width, w.height);
                                        if (1 > G) {
                                            a = Math.min(Math.sqrt(r * r +
                                                t * t) / d.maxScaleDistance, 1);
                                            var b = v(),
                                                f = l[0].getBoundingClientRect(),
                                                g = M - f.left,
                                                x = N - f.top;
                                            f = Math.min(.5 * Math.sqrt(r * r + t * t), 100);
                                            var m = O(d.shadowColor);
                                            if ("left" === p || "right" === p) {
                                                var k = Math.abs(r);
                                                g = `rgba(${m.r}, ${m.g}, ${m.b}, ${m.a*Math.min(1,k/d.maxScaleDistance)})`;
                                                m = `rgba(${m.r}, ${m.g}, ${m.b}, 0)`;
                                                c.beginPath();
                                                "right" === p ? (c.moveTo(b.left, b.top), c.lineTo(b.left + k - f, b.top), c.quadraticCurveTo(b.left + k, b.centerY, b.left + k, x), c.quadraticCurveTo(b.left + k, b.centerY, b.left + k - f, b.bottom), c.lineTo(b.left,
                                                    b.bottom), c.closePath(), f = c.createLinearGradient(b.left, 0, b.left + k, 0)) : (c.moveTo(b.right, b.top), c.lineTo(b.right - k + f, b.top), c.quadraticCurveTo(b.right - k, b.centerY, b.right - k, x), c.quadraticCurveTo(b.right - k, b.centerY, b.right - k + f, b.bottom), c.lineTo(b.right, b.bottom), c.closePath(), f = c.createLinearGradient(b.right, 0, b.right - k, 0));
                                                f.addColorStop(0, g);
                                                f.addColorStop(1, m);
                                                c.fillStyle = f
                                            } else k = Math.abs(t), x = `rgba(${m.r}, ${m.g}, ${m.b}, ${m.a*Math.min(1,k/d.maxScaleDistance)})`, m = `rgba(${m.r}, ${m.g}, ${m.b}, 0)`,
                                                c.beginPath(), "down" === p ? (c.moveTo(b.left, b.top), c.lineTo(b.left, b.top + k - f), c.quadraticCurveTo(b.centerX, b.top + k, g, b.top + k), c.quadraticCurveTo(b.centerX, b.top + k, b.right, b.top + k - f), c.lineTo(b.right, b.top), c.closePath(), f = c.createLinearGradient(0, b.top, 0, b.top + k)) : (c.moveTo(b.left, b.bottom), c.lineTo(b.left, b.bottom - k + f), c.quadraticCurveTo(b.centerX, b.bottom - k, g, b.bottom - k), c.quadraticCurveTo(b.centerX, b.bottom - k, b.right, b.bottom - k + f), c.lineTo(b.right, b.bottom), c.closePath(), f = c.createLinearGradient(0,
                                                    b.bottom, 0, b.bottom - k)), f.addColorStop(0, x), f.addColorStop(1, m), c.fillStyle = f;
                                            c.fill();
                                            if (!1 !== d.arrow && (z.css({
                                                    opacity: a,
                                                    transform: `translate(-50%, -50%) scale(${.2+.8*a})`,
                                                    "box-shadow": `inset 0 0 ${15*a}px ${8*a}px rgba(255, 255, 255, ${.5*a})`,
                                                    left: `${b.centerX}px`,
                                                    top: `${b.centerY}px`
                                                }), q))
                                                if (q.hasClass("pulling-arrow")) {
                                                    b = 0;
                                                    switch (p) {
                                                        case "left":
                                                            b = 180;
                                                            break;
                                                        case "right":
                                                            b = 0;
                                                            break;
                                                        case "up":
                                                            b = -90;
                                                            break;
                                                        case "down":
                                                            b = 90
                                                    }
                                                    q.css({
                                                        opacity: a,
                                                        transform: `translate(-50%, -50%) rotate(${b}deg)`
                                                    })
                                                } else q.hasClass("pulling-text") &&
                                                    q.css({
                                                        opacity: a,
                                                        transform: "translate(-50%, -50%)"
                                                    });
                                            D = requestAnimationFrame(h)
                                        } else !1 !== d.arrow && q && (z.css("opacity", "0"), q.css("opacity", "0")), E.css("opacity", "0"), !1 !== d.arrow && $(".pulling-circle-container").css("opacity", "0"), B = C = !1, J = null, F = !1
                                    };
                                    D = requestAnimationFrame(h)
                                } else {
                                    D && (cancelAnimationFrame(D), D = null);
                                    try {
                                        c.clearRect(0, 0, w.width, w.height)
                                    } catch (a) {}!1 !== d.arrow && q && (z.css("opacity", "0"), q.css("opacity", "0"));
                                    E.css("opacity", "0");
                                    !1 !== d.arrow && $(".pulling-circle-container").css("opacity",
                                        "0");
                                    B = C = !1;
                                    J = null;
                                    F = !1
                                }
                            }
                        };
                        l.on("touchstart mousedown", function(e) {
                            J = e.target;
                            C = !0;
                            B = !1;
                            p = null;
                            K = 0;
                            F = !1;
                            e = e.touches ? e.touches[0] : e;
                            M = e.clientX;
                            N = e.clientY;
                            t = r = 0;
                            E.css("opacity", "1");
                            !1 !== d.arrow && $(".pulling-circle-container").css("opacity", "1");
                            P.css("opacity", "0");
                            !1 !== d.arrow && (z.css("opacity", "0"), q.css("opacity", "0"));
                            u();
                            c.clearRect(0, 0, w.width, w.height)
                        });
                        $(document).on("touchmove mousemove", function(e) {
                            if (C && J && C) {
                                var n = e.touches ? e.touches[0] : e;
                                r = n.clientX - M;
                                t = n.clientY - N;
                                var h = Math.sqrt(r *
                                    r + t * t);
                                K = Math.max(K, h);
                                if (0 !== h) {
                                    e = Math.abs(r) / h;
                                    var a = Math.abs(t) / h;
                                    h > d.minSwipeDistance && !B && (p = null, .8 < e && .3 > a ? p = 0 < r ? "right" : "left" : .8 < a && .3 > e && (p = 0 < t ? "down" : "up"), A.includes(p) && (B = !0, "function" === typeof d.progress && d.progress.call(L, p)));
                                    if (B && A.includes(p)) {
                                        e = Math.min(h / d.maxScaleDistance, 1);
                                        c.clearRect(0, 0, w.width, w.height);
                                        a = v();
                                        var b = l[0].getBoundingClientRect(),
                                            f = n.clientX - b.left;
                                        n = n.clientY - b.top;
                                        h = Math.min(.5 * h, 100);
                                        b = O(d.shadowColor);
                                        if ("left" === p || "right" === p) {
                                            var g = Math.abs(r);
                                            f = `rgba(${b.r}, ${b.g}, ${b.b}, ${b.a*
Math.min(1,g/d.maxScaleDistance)})`;
                                            b = `rgba(${b.r}, ${b.g}, ${b.b}, 0)`;
                                            c.beginPath();
                                            "right" === p ? (c.moveTo(a.left, a.top), c.lineTo(a.left + g - h, a.top), c.quadraticCurveTo(a.left + g, a.centerY, a.left + g, n), c.quadraticCurveTo(a.left + g, a.centerY, a.left + g - h, a.bottom), c.lineTo(a.left, a.bottom), c.closePath(), h = c.createLinearGradient(a.left, 0, a.left + g, 0)) : (c.moveTo(a.right, a.top), c.lineTo(a.right - g + h, a.top), c.quadraticCurveTo(a.right - g, a.centerY, a.right - g, n), c.quadraticCurveTo(a.right - g, a.centerY, a.right - g + h,
                                                a.bottom), c.lineTo(a.right, a.bottom), c.closePath(), h = c.createLinearGradient(a.right, 0, a.right - g, 0));
                                            h.addColorStop(0, f);
                                            h.addColorStop(1, b);
                                            c.fillStyle = h
                                        } else g = Math.abs(t), n = `rgba(${b.r}, ${b.g}, ${b.b}, ${b.a*Math.min(1,g/d.maxScaleDistance)})`, b = `rgba(${b.r}, ${b.g}, ${b.b}, 0)`, c.beginPath(), "down" === p ? (c.moveTo(a.left, a.top), c.lineTo(a.left, a.top + g - h), c.quadraticCurveTo(a.centerX, a.top + g, f, a.top + g), c.quadraticCurveTo(a.centerX, a.top + g, a.right, a.top + g - h), c.lineTo(a.right, a.top), c.closePath(),
                                            f = c.createLinearGradient(0, a.top, 0, a.top + g)) : (c.moveTo(a.left, a.bottom), c.lineTo(a.left, a.bottom - g + h), c.quadraticCurveTo(a.centerX, a.bottom - g, f, a.bottom - g), c.quadraticCurveTo(a.centerX, a.bottom - g, a.right, a.bottom - g + h), c.lineTo(a.right, a.bottom), c.closePath(), f = c.createLinearGradient(0, a.bottom, 0, a.bottom - g)), f.addColorStop(0, n), f.addColorStop(1, b), c.fillStyle = f;
                                        c.fill();
                                        P.css("opacity", "0");
                                        if (!1 !== d.arrow)
                                            if (z.css({
                                                    opacity: e,
                                                    transform: `translate(-50%, -50%) scale(${.2+.8*e})`,
                                                    "box-shadow": `inset 0 0 ${15*
e}px ${8*e}px rgba(255, 255, 255, ${.5*e})`,
                                                    left: `${a.centerX}px`,
                                                    top: `${a.centerY}px`
                                                }), a = 0, q.hasClass("pulling-arrow")) {
                                                switch (p) {
                                                    case "left":
                                                        a = 180;
                                                        break;
                                                    case "right":
                                                        a = 0;
                                                        break;
                                                    case "up":
                                                        a = -90;
                                                        break;
                                                    case "down":
                                                        a = 90
                                                }
                                                q.css({
                                                    opacity: e,
                                                    transform: `translate(-50%, -50%) rotate(${a}deg)`
                                                })
                                            } else q.hasClass("pulling-text") && q.css({
                                                opacity: e,
                                                transform: "translate(-50%, -50%)"
                                            })
                                    }
                                }
                            }
                        });
                        $(document).on("touchend mouseup touchcancel mouseleave", function(e) {
                            C && T(e)
                        });
                        try {
                            const e = 0 < A.length && A.every(a => "left" ===
                                    a || "right" === a),
                                n = 0 < A.length && A.every(a => "up" === a || "down" === a);
                            var H = d.touchAction || "auto";
                            d.touchAction || (e ? H = "pan-x" : n && (H = "pan-y"));
                            l.css({
                                "touch-action": H,
                                "user-select": "none"
                            });
                            const h = d.preventNativeScroll;
                            if (!0 === h || "auto" === h) {
                                const a = l[0];
                                if (a && a.addEventListener) {
                                    const b = !0 === h;
                                    H = function(f) {
                                        try {
                                            if (f && "touchmove" === f.type && C)
                                                if (b) f.cancelable && f.preventDefault();
                                                else if (B && A.includes(p)) f.cancelable && f.preventDefault();
                                            else {
                                                var g = Math.abs(r || 0),
                                                    x = Math.abs(t || 0);
                                                e && g > x && g > d.minSwipeDistance ?
                                                    f.cancelable && f.preventDefault() : n && x > g && x > d.minSwipeDistance && f.cancelable && f.preventDefault()
                                            }
                                        } catch (m) {}
                                    };
                                    a.__pullingTouchMoveAttached || (a.addEventListener("touchmove", H, {
                                        passive: !1
                                    }), a.__pullingTouchMoveAttached = !0)
                                }
                            }
                        } catch (e) {}
                        l.data("pullingInit", !0);
                        l.data("pullingSettings", d)
                    } else console.error("Canvas context could not be obtained")
                } else console.error("Canvas element could not be created")
            }
        })
    })
})();