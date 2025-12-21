function rgbToRgba(v, l = .5) {
    if (!v || v.startsWith("rgba")) return v;
    var H = v.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (H) {
        const [, r, y, n] = H;
        return `rgba(${r}, ${y}, ${n}, ${l})`
    }
    if (H = v.match(/^#([a-fA-F0-9]{6})$/)) {
        var q = H[1];
        v = parseInt(q.substr(0, 2), 16);
        H = parseInt(q.substr(2, 2), 16);
        q = parseInt(q.substr(4, 2), 16);
        return `rgba(${v}, ${H}, ${q}, ${l})`
    }
    return (H = v.match(/^#([a-fA-F0-9]{3})$/)) ? (q = H[1], v = parseInt(q[0] + q[0], 16), H = parseInt(q[1] + q[1], 16), q = parseInt(q[2] + q[2], 16), `rgba(${v}, ${H}, ${q}, ${l})`) : v
}
$.select = function(v, l, H) {
    function q() {
        var g = "undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
            isMobile: !1,
            isTablet: !1,
            isIOS: !1
        };
        return !0 === g.isMobile
    }

    function r(g) {
        const C = document.createElement("div");
        C.innerHTML = g;
        return C.textContent || C.innerText || ""
    }

    function y(g, C = 0) {
        return 1 === C ? g.replace(/\x3c!--(.*?)--\x3e/g, "$1").replace(/<[^>]*>/g, "") : g.replace(/\x3c!--(.*?)--\x3e/g, "$1")
    }

    function n(g, C, x) {
        g = $(g);
        x = g.find("option, li").eq(x);
        if (!x.length) return {
            text: g.find("option, li").first().text().trim(),
            tag: null
        };
        var t = x.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
        C = [];
        var F = x;
        for (C.unshift(t); F.length;) {
            var T = F.attr("class")?.split(" ") || [];
            t = !1;
            for (const f of T)
                if (T = g.find(`[group="${f}"]`), T.length) {
                    F = T.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
                    C.unshift(F);
                    F = T;
                    t = !0;
                    break
                } if (!t) break
        }
        return {
            text: C.join(" > "),
            tag: x.attr("tag")
        }
    }

    function Q(g, C) {
        C = parseInt(C?.radioSize || "16") / 2;
        return `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${C}px; height: ${C}px; background-color: ${g}; border-radius: 50%;"></div>`
    }

    function U(g) {
        g = parseInt(g);
        return `<span style="\n\t\t\tposition: absolute;\n\t\t\tleft: 50%;\n\t\t\ttop: 50%;\n\t\t\twidth: ${.3*g}px;\n\t\t\theight: ${.6*g}px;\n\t\t\tborder: solid white;\n\t\t\tborder-width: 0 ${.12*g}px ${.12*g}px 0;\n\t\t\ttransform: translate(-50%, -65%) rotate(45deg);\n\t\t\tdisplay: block;\n\t\t"></span>`
    }

    function A(g, C = "16px") {
        return `<div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; color: #fff; font-size: ${Math.max(.7*
parseInt(C),10)}px; font-weight: bold; line-height: 1; text-align: center; -webkit-font-smoothing: antialiased; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-tap-highlight-color: transparent;">${g}</div>`
    }

    function Y(g = "50%", C = "10px") {
        return {
            position: "absolute",
            right: C,
            top: g,
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px"
        }
    }

    function ca(g) {
        let C = g.groupArrowStyle?.size || g.arrowSize,
            x = g.arrowRight || Y().right,
            t = g.groupArrowColor || g.arrowColor;
        if ("checkbox" ===
            g.pointer || g.pointer?.startsWith("checkbox_")) {
            if (!g.groupArrowStyle?.size && g.checkboxSize) {
                var F = parseFloat(g.checkboxSize);
                isNaN(F) || (C = `${.6*F}px`)
            }!g.groupArrowColor && g.checkboxColor && (t = g.checkboxColor)
        } else "radio" === g.pointer ? (!g.groupArrowStyle?.size && g.radioSize && (F = parseFloat(g.radioSize), isNaN(F) || (C = `${.6*F}px`)), !g.groupArrowColor && g.radioColor && (t = g.radioColor)) : g.pointer && g.pointer.startsWith("question_") && !g.groupArrowColor && g.questionColor && (t = g.questionColor);
        return {
            arrowSizeValue: C,
            arrowRightValue: x,
            arrowColorValue: t
        }
    }

    function O(g) {
        return {
            wrapperClass: g + "-wrapper",
            triggerClass: g + "-trigger",
            optionsClass: g + "-options",
            optionClass: g + "-option",
            openClass: g + "-open"
        }
    }

    function L(g) {
        return {
            border: `2px solid ${g||"#ccc"}`,
            backgroundColor: "#fff"
        }
    }

    function M(g) {
        ua && ((g = g.find("select").first()[0]) && g._selectId && (g = window._gong_tea_yun_0.get(g._selectId + "_close")) && g.call(this, ua), ua = 0)
    }

    function B(g, C, x) {
        const t = g.closest('[class*="-wrapper"]');
        g.find("div").first().css({
            "background-color": x.optionsStyle.background ||
                "#fff"
        });
        M(t);
        C ? x.slideToggle ? g.css("opacity", x.opacity || 0).slideToggle(C, {
            easing: x.easing,
            complete: domqueryFocus
        }) : g.css("opacity", "").slideToggle(C, {
            easing: x.easing,
            complete: domqueryFocus
        }) : (g.hide(), domqueryFocus())
    }

    function N(g, C, x, t) {
        if (!qa) {
            qa = !0;
            var F = g.closest('[class*="-wrapper"]');
            M(F);
            x.css({
                "background-color": "rgba(0, 0, 0, 0)"
            });
            var T = F.find("select").first()[0]._selectId;
            setTimeout(() => {
                T && domquery(this).historyOff("select-" + T);
                qa = !1
            }, C + 300);
            g.slideToggle(C, {
                easing: t.easing,
                complete: function() {
                    x.hide();
                    domqueryFocus()
                }
            })
        }
    }

    function z(g, C, x, t, F) {
        if (!qa) {
            qa = !0;
            M(t);
            t.data("upHTMe10Running", !0);
            x.css({
                "background-color": "rgba(0, 0, 0, 0)",
                opacity: ""
            });
            var T = t.find("select").first()[0]._selectId;
            setTimeout(() => {
                !t.data("groupClicked") && T && domquery(this).historyOff("select-" + T);
                qa = !1
            }, C + 300);
            g.css("opacity", "").slideToggle(C, {
                easing: F.easing,
                complete: function() {
                    x.css("pointer-events", "none").hide();
                    t.removeClass(F.openClass);
                    t.attr("data-state", "closed");
                    setTimeout(() => {
                        x.css("pointer-events", "")
                    }, 100);
                    domqueryFocus()
                }
            })
        }
    }

    function Z(g, C) {
        var x = q(),
            t = g.data("settings");
        if (!x) {
            const F = g[0].getBoundingClientRect(),
                T = window.innerHeight;
            C = C.find("div").first();
            const f = t && t.height,
                R = f || `${.6*T}px`;
            x = T - F.bottom;
            const V = F.top;
            if (t.parentView) return g = {
                    position: "fixed",
                    left: F.left + "px",
                    width: F.width + "px",
                    zIndex: 1E3,
                    height: R,
                    overflowY: "auto",
                    overflowX: "hidden"
                }, V > x && x < C[0].scrollHeight ? (g.bottom = T - F.top + "px", g.top = "auto", g.borderRadius = "4px 4px 0 0") : (g.top = F.bottom + "px", g.bottom = "auto", g.borderRadius = "0 0 4px 4px"),
                g;
            if (f) return {
                top: "100%",
                bottom: "auto",
                borderRadius: "0 0 4px 4px",
                borderTop: "none",
                borderBottom: "1px solid #ccc"
            };
            g = g.find("select").first();
            g = (g.length ? parseInt(g.height() || g.css("height")) : null) || C[0].scrollHeight;
            t = {
                top: "100%",
                bottom: "auto",
                borderRadius: "0 0 4px 4px",
                borderTop: "none",
                borderBottom: "1px solid #ccc"
            };
            x < g && V > x ? (t = {
                top: "auto",
                bottom: "100%",
                borderRadius: "4px 4px 0 0",
                borderBottom: "1px solid #ccc",
                borderTop: "none"
            }, V < g && C.css({
                maxHeight: `${V-10}px`,
                overflowY: "auto"
            })) : x < g && C.css({
                maxHeight: `${x-
10}px`,
                overflowY: "auto"
            });
            return t
        }
        return {
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            top: "auto",
            borderRadius: t.MborderRadius || "4px 4px 0 0",
            width: "100%",
            Mheight: t.Mheight || "60vh",
            height: t.height || "auto",
            minHeight: t.minHeight || "auto",
            maxHeight: t.maxHeight || (x ? t.Mheight || "60vh" : t.height || "300px"),
            overflowY: "auto",
            zIndex: "1000"
        }
    }

    function aa(g) {
        g.css({
            "pointer-events": "none",
            opacity: "0.6"
        })
    }

    function ja(g, C) {
        C && g && Object.entries(C).forEach(([x, t]) => {
            try {
                g.style[x] = t
            } catch (F) {
                console.warn("Style application failed for property:",
                    x)
            }
        })
    }

    function na(g, C) {
        if (C.scrollColor) try {
            g.find('[class*="-options"]');
            const x = C.optionsStyle.background || "#fff",
                t = C.optionStyle.borderBottomColor || "#ddd",
                F = `scrollbar-${g.attr("id")||Math.random().toString(36).substr(2,9)}`;
            $(`#${F}`).remove();
            const T = document.createElement("style");
            T.id = F;
            T.textContent = `\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar {\n\t\t\t\t\twidth: 8px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-track,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-track {\n\t\t\t\t\tbackground: ${x};\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-thumb,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-thumb {\n\t\t\t\t\tbackground: ${t};\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\tborder: 1px solid ${x};\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-thumb:hover,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-thumb:hover {\n\t\t\t\t\tbackground: ${t};\n\t\t\t\t\topacity: 0.8;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} {\n\t\t\t\t\tscrollbar-width: thin;\n\t\t\t\t\tscrollbar-color: ${t} ${x};\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div {\n\t\t\t\t\tscrollbar-width: thin;\n\t\t\t\t\tscrollbar-color: ${t} ${x};\n\t\t\t\t}\n\t\t\t`;
            document.head.appendChild(T);
            g.data("scrollbarStyleId", F)
        } catch (x) {
            console.warn("\uc2a4\ud06c\ub864\ubc14 \uc0c9\uc0c1 \uc801\uc6a9 \uc911 \uc624\ub958:", x)
        }
    }
    let qa = !1,
        ua = 0;
    window._isMouseDown_gong = !1;
    window._isGroupClick = !1;
    window._selectPreviousFocus || (window._selectPreviousFocus = null);
    $(document).off("mousedown.selectTrigger touchstart.selectTrigger", '[class*="-trigger"]').on("mousedown.selectTrigger touchstart.selectTrigger", '[class*="-trigger"]', function(g) {
        !(g = document.activeElement) || "INPUT" !==
        g.tagName && "TEXTAREA" !== g.tagName && "true" !== g.getAttribute("contenteditable") || (window._selectPreviousFocus = g, void 0 !== g.selectionStart && (window._selectPreviousFocusPosition = g.selectionStart))
    });
    window.domqueryFocus = function() {
        if (q()) try {
            window._selectPreviousFocus && document.body.contains(window._selectPreviousFocus) ? setTimeout(() => {
                try {
                    if (window._selectPreviousFocus.focus(), "INPUT" === window._selectPreviousFocus.tagName || "TEXTAREA" === window._selectPreviousFocus.tagName) {
                        const g = window._selectPreviousFocus.value.length;
                        window._selectPreviousFocus.setSelectionRange(g, g)
                    }
                } catch (g) {}
                window._selectPreviousFocus = null
            }, 100) : window._selectPreviousFocus = null
        } catch (g) {
            window._selectPreviousFocus = null
        }
    };
    window._gong_tea_yun_0 || (window._gong_tea_yun_0 = new Map);
    window._gong_tea_yun_1 || (window._gong_tea_yun_1 = new Map);
    if (!document.getElementById("custom-select-group-style")) {
        const g = document.createElement("style");
        g.id = "custom-select-group-style";
        g.textContent = "\n\t\t\t.group-option {\n\t\t\t\tposition: relative;\n\t\t\t\tpadding-right: 30px !important;\n\t\t\t\tfont-style: italic;\n\t\t\t\tcolor: #666;\n\t\t\t\tfont-weight: bold;\n\t\t\t}\n\t\t\t.child-option {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t\t\n\t\t";
        document.head.appendChild(g)
    }
    "function" === typeof v ? (H = v, l = {}, v = 0) : "function" === typeof l ? "object" === typeof v ? (H = l, l = v, v = 0) : (H = l, l = {}) : "object" === typeof v && (l = v, v = 0);
    l = l || {};
    v = parseInt(v) || 0;
    this.elements.forEach(g => {
        function C(c) {
            if (!c) return "10px";
            c = c.split(" ").filter(a => a.trim());
            return 1 === c.length ? c[0] : 2 === c.length ? c[1] : 4 === c.length ? c[3] : "10px"
        }
        if (g._selectId) {
            var x = $(g).parent();
            if (x.length && x[0].className && "string" === typeof x[0].className && x[0].className.includes("-wrapper")) return
        }
        var t = Math.random().toString(36).substr(2,
            9);
        x = "select-" + t;
        var F = O(x),
            T = q();
        T = "auto" === l.slideToggle ? T ? !1 : !0 : l.slideToggle || !1;
        let f = {
            ...O(x),
            height: l.height,
            defaultText: "Select an option",
            allowHTML: !0,
            opacity: 0,
            easing: "linear",
            onclick: !1,
            offclick: !1,
            trigger: null,
            triggerOnce: null,
            onSelect: null,
            activeBackground: "#f5f5f5",
            highlightedClass: "highlighted",
            pointer: null,
            showArrow: !0,
            arrowColor: "#333",
            arrowSize: "5px",
            arrowRight: "10px",
            arrowTop: "50%",
            tagMargin: l.tagMargin || "0 0 0 10px",
            closeBox: l.closeBox || !1,
            checkboxSize: l.checkboxSize || "16px",
            questionSize: l.questionSize ||
                "16px",
            radioSize: l.radioSize || "16px",
            scrollColor: l.scrollColor || !1,
            triggerBgColor: l.triggerBgColor,
            triggerColor: l.triggerColor,
            triggerBorderColor: l.triggerBorderColor,
            triggerBorderWidth: l.triggerBorderWidth,
            triggerBorderRadius: l.triggerBorderRadius,
            triggerFontSize: l.triggerFontSize,
            triggerFontWeight: l.triggerFontWeight,
            triggerPadding: l.triggerPadding,
            triggerHeight: l.triggerHeight,
            triggerLineHeight: l.triggerLineHeight,
            triggerActiveBgColor: l.triggerActiveBgColor,
            triggerActiveColor: l.triggerActiveColor,
            triggerActiveBorderColor: l.triggerActiveBorderColor,
            wrapperStyle: {
                position: "relative",
                caretColor: "transparent",
                margin: "0",
                padding: "0",
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none"
            },
            triggerStyle: {
                padding: l.defaultPadding || "10px",
                paddingRight: l.defaultPaddingRight || "40px",
                margin: l.defaultMargin || "0",
                border: `${l.defaultBorderWidth||"1px"} ${l.defaultBorderStyle||"solid"} ${l.defaultBorderColor||"#ccc"}`,
                borderRadius: l.defaultBorderRadius || "4px",
                cursor: l.defaultCursor || "pointer",
                background: l.defaultBgColor ||
                    "#fff",
                color: l.defaultColor || "#000",
                position: l.defaultPosition || "relative",
                WebkitTapHighlightColor: l.defaultTapHighlight || "transparent",
                WebkitTouchCallout: l.defaultTouchCallout || "none",
                boxSizing: l.defaultBoxSizing || "border-box"
            },
            overlayStyle: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0)",
                zIndex: 999,
                transition: "background-color 0.3s ease",
                display: "none"
            },
            optionsStyle: {
                position: "absolute",
                top: "100%",
                left: "0",
                right: "0",
                margin: "0",
                padding: "0",
                background: "#fff",
                border: "1px solid #ddd",
                borderTop: "none",
                borderRadius: "0 0 4px 4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                zIndex: "1",
                WebkitOverflowScrolling: "touch",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation"
            },
            optionStyle: {
                padding: "10px",
                cursor: "pointer",
                fontWeight: "normal",
                WebkitTapHighlightColor: "transparent",
                WebkitTouchCallout: "none",
                borderBottom: "1px solid #f5f0f0",
                position: "relative"
            },
            selectedOptionStyle: {
                background: "transparent",
                fontWeight: "bold"
            },
            selectedBg: null,
            disabledOptionStyle: {
                filter: "opacity(0.5)",
                cursor: "not-allowed",
                fontStyle: "italic"
            },
            disabledStyle: {
                filter: "opacity(0.5)",
                cursor: "not-allowed",
                textDecoration: "line-through"
            },
            questionStyle: {
                ...Y(),
                ...L(l.buttonColor),
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                color: l.buttonColor || "#666",
                width: l.questionSize || "16px",
                height: l.questionSize || "16px"
            },
            checkboxStyle: {
                ...Y(),
                ...L(l.buttonColor),
                borderRadius: "3px",
                zIndex: "1",
                display: "block"
            },
            checkboxSelectedStyle: {
                border: "2px solid #007bff",
                backgroundColor: "#007bff",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "5px",
                    top: "1px",
                    width: "4px",
                    height: "8px",
                    border: "solid white",
                    borderWidth: "0 2px 2px 0",
                    transform: "rotate(45deg)",
                    display: "block"
                }
            },
            radioStyle: {
                ...Y(),
                ...L(l.buttonColor),
                borderRadius: "50%"
            },
            radioSelectedStyle: {
                border: "2px solid #007bff",
                borderRadius: "50%",
                backgroundColor: "#fff",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#007bff",
                    borderRadius: "50%"
                }
            },
            radioDisabledStyle: {
                border: "2px solid #ddd",
                backgroundColor: "#f5f5f5",
                cursor: "not-allowed"
            },
            dotStyle: {
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                border: "2px solid #ccc",
                backgroundColor: "#ccc"
            },
            dotSelectedStyle: {
                border: `2px solid ${l.dotColor||"#007bff"}`,
                backgroundColor: l.dotColor || "#007bff"
            },
            defaultBgColor: "#ffffff",
            defaultColor: "#333333",
            defaultBorderColor: "#cccccc",
            triggerHoverBgColor: l.triggerHoverBgColor || "#f5f5f5",
            triggerHoverColor: l.triggerHoverColor ||
                "#000000",
            triggerHoverBorderColor: l.triggerHoverBorderColor || "#999999",
            radioColor: l.radioColor || "#007bff",
            checkboxColor: l.checkboxColor || "#007bff",
            questionColor: l.questionColor || "#007bff",
            buttonColor: l.buttonColor || "#ccc",
            dotColor: l.dotColor || "#007bff",
            ...l,
            ...F,
            slideToggle: T
        };
        ("checkbox" === f.pointer || f.pointer?.startsWith("checkbox_")) && setTimeout(() => {
            const c = $(g),
                a = c.find("option[selected]").filter(function() {
                    return "" !== $(this).val().trim() && !$(this).is(":disabled")
                }).map(function() {
                    return {
                        value: $(this).val(),
                        text: $(this).text(),
                        index: $(this).index()
                    }
                }).get().length,
                b = c.closest('[class*="-wrapper"]');
            b.attr("data-check-count", a);
            const h = b.find(`.${f.triggerClass}`).find(".custom-checkbox");
            h.css({
                border: `2px solid ${0<a?f.checkboxColor:f.buttonColor}`,
                backgroundColor: 0 < a ? f.checkboxColor : "#fff",
                width: f.checkboxSize,
                height: f.checkboxSize
            });
            0 < a && h.html(A(a, f.checkboxSize));
            b.find('[class*="-option"]').each(function() {
                const d = $(this);
                var k = d.attr("data-value"),
                    u = c.find(`option[value="${k}"]`);
                k = u.is("[selected]") &&
                    "" !== k.trim();
                u = u.is(":disabled");
                const m = d.find(".custom-checkbox");
                m.length && (m.css({
                    border: `2px solid ${k?f.checkboxColor:f.buttonColor}`,
                    backgroundColor: k ? f.checkboxColor : u ? "#f5f5f5" : "#fff",
                    width: f.checkboxSize,
                    height: f.checkboxSize
                }), k && m.html(U(f.checkboxSize)), d.attr("data-checked", k ? "true" : "false"))
            })
        }, 0);
        g._selectId || (g._selectId = t);
        H && window._gong_tea_yun_0.set(g._selectId + "_callback", H);
        l.onSelect && window._gong_tea_yun_0.set(g._selectId + "_onSelect", l.onSelect);
        l.open && window._gong_tea_yun_0.set(g._selectId +
            "_open", l.open);
        l.close && window._gong_tea_yun_0.set(g._selectId + "_close", l.close);
        x = "select" === g.tagName.toLowerCase();
        F = "ul" === g.tagName.toLowerCase();
        if (x || F) {
            if (F) {
                var R = document.createElement("select");
                R.className = g.className;
                (x = g.getAttribute("onchange")) && R.setAttribute("onchange", x);
                const c = new Set;

                function a(b, h = 0) {
                    Array.from(b).forEach(d => {
                        if (!c.has(d))
                            if (c.add(d), d.hasAttribute("group")) {
                                var k = d.getAttribute("group");
                                const u = document.createElement("option");
                                u.innerHTML = d.innerHTML;
                                u.setAttribute("group",
                                    k);
                                u.setAttribute("data-is-group", "true");
                                u.setAttribute("data-level", h);
                                d.className && (u.className = d.className);
                                R.appendChild(u);
                                const m = d.getAttribute("group");
                                d = Array.from(g.children).filter(D => D.classList.contains(m));
                                a(d, h + 1)
                            } else k = document.createElement("option"), k.value = d.getAttribute("value") || "", k.innerHTML = d.innerHTML, d.hasAttribute("img") && k.setAttribute("img", d.getAttribute("img")), d.getAttribute("tag") && k.setAttribute("tag", d.getAttribute("tag")), d.hasAttribute("disabled") && (k.disabled = !0), d.hasAttribute("selected") && (k.selected = !0), d.className && (k.className = d.className), k.setAttribute("data-level", h), R.appendChild(k)
                    })
                }
                a(g.children);
                g.parentNode.replaceChild(R, g)
            } else R = g;
            R._selectId = g._selectId;
            var V = document.createElement("div");
            V.className = f.wrapperClass;
            V.setAttribute("data-state", "closed");
            V.setAttribute("tabindex", "0");
            V.setAttribute("data-selected-index", "-1");
            V.setAttribute("data-previous-index", "-1");
            $(V).data("settings", f);
            l.width && (V.style.width = l.width, V.style.boxSizing =
                "border-box");
            (x = R.querySelector("option:checked")) && x.value && (V.setAttribute("data-selected-value", x.value), x = Array.from(R.options).indexOf(x), V.setAttribute("data-selected-index", x));
            ja(V, f.wrapperStyle);
            x = document.createElement("div");
            x.style.position = "relative";
            var fa = document.createElement("div");
            fa.className = f.triggerClass;
            fa.setAttribute("tabindex", "-1");
            ja(fa, {
                padding: f.defaultPadding || "10px",
                paddingRight: f.defaultPaddingRight || "40px",
                margin: f.defaultMargin || "0",
                border: `${f.defaultBorderWidth||
"1px"} solid ${f.defaultBorderColor||"#ccc"}`,
                borderRadius: f.defaultBorderRadius || "4px",
                cursor: "pointer",
                backgroundColor: f.defaultBgColor,
                color: f.defaultColor,
                position: "relative",
                width: "100%",
                boxSizing: "border-box"
            });
            $(fa).on({
                mouseenter: function(c) {
                    window._isMouseDown_gong || (c = $(this).closest(`.${f.wrapperClass}`).data("settings")) && c.triggerHoverBgColor && (this.style.backgroundColor = c.triggerHoverBgColor, this.style.color = c.triggerHoverColor || c.defaultColor, this.style.borderColor = c.triggerHoverBorderColor ||
                        c.defaultBorderColor)
                },
                mouseleave: function() {
                    const c = $(this).closest(`.${f.wrapperClass}`).data("settings");
                    c && (this.style.backgroundColor = c.defaultBgColor, this.style.color = c.defaultColor, this.style.borderColor = c.defaultBorderColor)
                }
            });
            T = F = null;
            f.triggerStyle && (f.triggerStyle.width ? F = f.triggerStyle.width : f.triggerStyle.maxWidth ? F = f.triggerStyle.maxWidth : f.triggerStyle.minWidth && (F = f.triggerStyle.minWidth), f.triggerStyle.height ? T = f.triggerStyle.height : f.triggerStyle.maxHeight ? T = f.triggerStyle.maxHeight :
                f.triggerStyle.minHeight && (T = f.triggerStyle.minHeight));
            F || (F = R.style.width, !F && R.style.maxWidth && (F = R.style.maxWidth), !F && R.style.minWidth && (F = R.style.minWidth));
            T || (T = R.style.height, !T && R.style.maxHeight && (T = R.style.maxHeight), !T && R.style.minHeight && (T = R.style.minHeight));
            ja(fa, f.triggerStyle);
            fa.style.whiteSpace = "nowrap";
            fa.style.overflow = "hidden";
            fa.style.textOverflow = "ellipsis";
            fa.style.paddingRight = f.defaultPaddingRight || "40px";
            fa.style.height = "auto";
            var ia = f.defaultText,
                ya = R.querySelector("option:checked");
            if (ya) {
                var da = Array.from(R.options);
                "checkbox" === f.pointer || f.pointer?.startsWith("checkbox_") ? (da = da.find(c => "" === c.value)) && (ia = f.allowHTML ? da.innerHTML : da.textContent) : (ia = da.indexOf(ya), ia = n(R, ya.value, ia).text, R._needsExpandGroup = !0)
            }!f.showArrow || "radio" === f.pointer || "checkbox" === f.pointer || f.pointer && (f.pointer.startsWith("question_") || f.pointer.startsWith("checkbox_")) || (t = "custom-select-arrow-style-" + t, document.getElementById(t) || (da = document.createElement("style"), da.id = t, da.textContent =
                `\n\t\t\t\t\t.${f.triggerClass}::after {\n\t\t\t\t\t   content: '';\n\t\t\t\t\t   position: absolute;\n\t\t\t\t\t   right: ${f.arrowRight};\n\t\t\t\t\t   top: ${f.arrowTop}; \n\t\t\t\t\t   transform: translateY(-50%);\n\t\t\t\t\t   width: 0;\n\t\t\t\t\t   height: 0;\n\t\t\t\t\t   border-left: ${f.arrowSize} solid transparent;\n\t\t\t\t\t   border-right: ${f.arrowSize} solid transparent;\n\t\t\t\t\t   border-top: ${f.arrowSize} solid ${f.arrowColor};\n\t\t\t\t\t   transition: transform 0.3s ease;\n\t\t\t\t\t   z-index: 1;\n\t\t\t\t\t}\n\t\t\t\t\t.${f.wrapperClass}.${f.openClass} .${f.triggerClass}::after {\n\t\t\t\t\t   transform: translateY(-50%) rotate(180deg);\n\t\t\t\t\t   z-index: 1;  \n\t\t\t\t\t}\n\t\t\t\t\t.${f.triggerClass} {\n\t\t\t\t\t   position: relative;\n\t\t\t\t\t   z-index: 0;\n\t\t\t\t\t}\n\t\t\t\t`,
                document.head.appendChild(da)));
            if (f.allowHTML) {
                fa.innerHTML = ia;
                if (!f.pointer?.startsWith("question_") && !f.pointer?.startsWith("checkbox_") && "checkbox" !== f.pointer && (t = R.querySelector("option:checked"), !0 === f.tag && t && t.getAttribute("tag"))) {
                    t = t.getAttribute("tag");
                    ia = document.createElement("span");
                    da = f.tagStyle || {};
                    var oa = f.tagMap || {},
                        ka = {
                            position: "absolute",
                            right: "radio" === f.pointer ? "40px" : "30px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: da.color || f.tagColor || "#666",
                            fontSize: da.fontSize || "12px",
                            margin: f.tagMargin
                        };
                    da.padding && (ka.padding = da.padding);
                    da.borderRadius && (ka.borderRadius = da.borderRadius);
                    da.fontWeight && (ka.fontWeight = da.fontWeight);
                    oa[t] && (ka.backgroundColor = oa[t]);
                    Object.assign(ia.style, ka);
                    ia.innerHTML = t;
                    fa.appendChild(ia)
                }
                if (f.pointer && f.pointer.startsWith("question_")) {
                    t = document.createElement("div");
                    t.className = "custom-question trigger-question";
                    Object.assign(t.style, {
                        ...f.questionStyle,
                        width: f.questionSize,
                        height: f.questionSize
                    });
                    if (ia = R.querySelector("option[selected]")) {
                        Object.assign(t.style, {
                            border: `2px solid ${f.questionColor}`,
                            backgroundColor: f.questionColor
                        });
                        t.innerHTML = `<span style="color: white; font-size: calc(${f.questionSize} * 0.6);">\u2713</span>`;
                        ia = ia.getAttribute("tag");
                        if (!0 === f.tag && ia) {
                            da = document.createElement("span");
                            oa = f.tagStyle || {};
                            ka = f.tagMap || {};
                            const c = {
                                position: "absolute",
                                right: "40px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: oa.color || f.tagColor || "#666",
                                fontSize: oa.fontSize || "12px"
                            };
                            oa.padding && (c.padding = oa.padding);
                            oa.borderRadius && (c.borderRadius = oa.borderRadius);
                            oa.fontWeight && (c.fontWeight = oa.fontWeight);
                            ka[ia] && (c.backgroundColor = ka[ia]);
                            Object.assign(da.style, c);
                            da.textContent = ia;
                            fa.appendChild(da)
                        }
                        V.setAttribute("data-aun", "true")
                    } else t.innerHTML = `<span style="font-size: calc(${f.questionSize} * 0.6);">?</span>`;
                    fa.appendChild(t)
                }
                if ("checkbox" === f.pointer || f.pointer?.startsWith("checkbox_")) fa.style.position = "relative", fa.style.paddingRight = "40px", t = document.createElement("div"), t.className = "custom-checkbox trigger-checkbox", Object.assign(t.style, {
                    ...Y(),
                    border: `2px solid ${f.buttonColor}`,
                    borderRadius: "3px",
                    backgroundColor: "#fff",
                    zIndex: "2",
                    display: "block",
                    width: f.checkboxSize,
                    height: f.checkboxSize
                }), fa.appendChild(t);
                "radio" === f.pointer && (fa.style.position = "relative", fa.style.paddingRight = "40px", t = document.createElement("div"), t.className = "custom-radio trigger-radio", Object.assign(t.style, {
                        ...Y(),
                        border: `2px solid ${f.buttonColor}`,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        width: f.radioSize,
                        height: f.radioSize
                    }), (ia = R.querySelector("option:checked")) &&
                    ia.value && "" !== ia.value && (Object.assign(t.style, {
                        border: `2px solid ${f.radioColor}`
                    }), t.innerHTML = Q(f.radioColor, f)), fa.appendChild(t))
            } else fa.textContent = ia, f.pointer?.startsWith("question_") || f.pointer?.startsWith("checkbox_") || "checkbox" === f.pointer || (t = R.querySelector("option:checked"), !0 === f.tag && t && t.getAttribute("tag") && (t = t.getAttribute("tag"), ia = document.createElement("span"), da = f.tagStyle || {}, oa = f.tagMap || {}, ka = {
                position: "absolute",
                right: "radio" === f.pointer ? "40px" : "30px",
                top: "50%",
                transform: "translateY(-50%)",
                color: da.color || f.tagColor || "#666",
                fontSize: da.fontSize || "12px",
                margin: f.tagMargin
            }, da.padding && (ka.padding = da.padding), da.borderRadius && (ka.borderRadius = da.borderRadius), da.fontWeight && (ka.fontWeight = da.fontWeight), oa[t] && (ka.backgroundColor = oa[t]), Object.assign(ia.style, ka), ia.textContent = t, fa.appendChild(ia)));
            var ta = document.createElement("div");
            ta.className = f.optionsClass;
            ta.style.display = "none";
            ta.style.width = "100%";
            ta.style.boxSizing = "border-box";
            "100%" === F ? (V.style.width = F, V.style.boxSizing =
                "border-box", setTimeout(() => {
                    const c = parseInt(window.getComputedStyle(V).paddingLeft) + parseInt(window.getComputedStyle(V).paddingRight);
                    fa.style.width = `calc(100% - ${c}px)`;
                    ta.style.width = `calc(100% - ${c}px)`
                }, 0)) : F && (V.style.width = F);
            var va = document.createElement("div");
            va.style.overflowY = "auto";
            va.style.overflowX = "hidden";
            va.style.width = "100%";
            va.addEventListener("touchmove", function(c) {
                c.stopPropagation()
            }, {
                passive: !0
            });
            Object.assign(va.style, {
                userSelect: "none",
                webkitUserSelect: "none",
                mozUserSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none"
            });
            Object.assign(fa.style, {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingRight: f.defaultPaddingRight || "40px",
                height: "auto",
                userSelect: "none",
                webkitUserSelect: "none",
                mozUserSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none"
            });
            T && (va.style.maxHeight = T);
            ta.appendChild(va);
            ja(ta, {
                ...f.optionsStyle,
                position: f.slideToggle ? "static" : "absolute",
                zIndex: "1000"
            });
            var wa = {},
                e = f.optionStyle?.padding ? C(f.optionStyle.padding) : "10px";
            Array.from(R.options ||
                g.children).forEach((c, a) => {
                const b = document.createElement("div");
                b.className = f.optionClass;
                var h = function(m) {
                    let D = 0;
                    const J = m.className ? m.className.split(" ") : [];
                    if (0 === J.length) return D;
                    let E = J[0],
                        p = !0;
                    for (; p;) p = !1, Array.from(R.options || m.children).forEach(w => {
                        w.hasAttribute("group") && w.getAttribute("group") === E && (D++, w.className && (E = w.className.split(" ")[0], p = !0))
                    });
                    return D
                }(c);
                b.setAttribute("data-level", h);
                h = c.getAttribute("group");
                var d = c.className;
                if (c.hasAttribute("group") || "true" === c.getAttribute("data-is-group")) {
                    b.classList.add("group-option");
                    b.setAttribute("data-group", h);
                    var k = e;
                    if (d) {
                        var u = d.split(" ")[0];
                        wa[u] && (u = parseFloat(wa[u]), isNaN(u) || (k = u + 10 + "px"))
                    }
                    h && (wa[h] = k);
                    k = document.createElement("div");
                    k.className = "custom-group-arrow";
                    u = ca(f);
                    let m = u.arrowSizeValue,
                        D = u.arrowRightValue;
                    Object.assign(k.style, {
                        position: "absolute",
                        right: D,
                        top: "50%",
                        transform: "translateY(-50%) rotate(0deg)",
                        width: "0",
                        height: "0",
                        borderLeft: `${m} solid transparent`,
                        borderRight: `${m} solid transparent`,
                        borderTop: `${m} solid ${u.arrowColorValue}`,
                        transition: "all 0.3s ease"
                    });
                    b.appendChild(k);
                    k = () => {
                        const J = parseFloat(m),
                            E = parseFloat(D);
                        isNaN(J) || isNaN(E) || b.style.setProperty("padding-right", `${2*J+E+10}px`, "important")
                    };
                    k();
                    b._updateGroupPadding = k;
                    b.style.whiteSpace = "nowrap";
                    b.style.overflow = "hidden";
                    b.style.textOverflow = "ellipsis"
                }
                d && d.split(" ").forEach(m => {
                    m && m.trim() && (b.classList.add("child-option"), b.classList.add(m))
                });
                b.setAttribute("data-value", c.value || c.getAttribute("value") || "");
                k = {
                    ...f.optionStyle
                };
                if ((u = b.classList.contains("child-option")) && k.padding) {
                    const m =
                        k.padding.split(" ");
                    2 === m.length ? (k.paddingTop = m[0], k.paddingBottom = m[0], k.paddingRight = m[1], delete k.padding) : 4 === m.length && (k.paddingTop = m[0], k.paddingRight = m[1], k.paddingBottom = m[2], delete k.padding)
                }
                ja(b, {
                    ...k,
                    position: "relative",
                    paddingRight: c.getAttribute("tag") ? "100px" : "40px"
                });
                b.classList.contains("group-option") && h && wa[h] && b.style.setProperty("padding-left", wa[h], "important");
                u && !b.classList.contains("group-option") && d && (k = d.split(" ")[0], d = e, wa[k] && (k = parseFloat(wa[k]), isNaN(k) || (d = k + 10 +
                    "px")), b.style.setProperty("padding-left", d, "important"));
                b.classList.contains("group-option") && b._updateGroupPadding && b._updateGroupPadding();
                b.style.whiteSpace = "nowrap";
                b.style.overflow = "hidden";
                b.style.textOverflow = "ellipsis";
                a === R.options.length - 1 && (b.style.borderBottom = "none");
                !f.dot || f.pointer?.startsWith("question_") || c.hasAttribute("group") || c.getAttribute("data-is-group") || b.querySelector(".custom-dot") || (a = document.createElement("div"), a.className = "custom-dot", Object.assign(a.style, f.dotStyle),
                    (c.selected || c.hasAttribute("selected")) && Object.assign(a.style, f.dotSelectedStyle), f.pointer && (a.style.right = "40px"), b.appendChild(a));
                c.hasAttribute("img") && (a = c.getAttribute("img"), Object.assign(b.style, {
                    backgroundImage: `url(${a})`,
                    backgroundRepeat: "no-repeat"
                }), a = new ResizeObserver(m => {
                    const D = m[0].contentRect.height;
                    if (0 < D) {
                        var J = $(m[0].target);
                        J.hasClass("child-option") ? (J = 20 * (parseInt(J.attr("data-level")) || 1), m[0].target.style.setProperty("--image-size", D + 8 + "px"), Object.assign(m[0].target.style, {
                            backgroundSize: `${D}px`,
                            backgroundPosition: `${J}px center`,
                            paddingLeft: `${J+1.5*D}px`
                        })) : Object.assign(m[0].target.style, {
                            backgroundSize: `${D}px`,
                            backgroundPosition: "15px center",
                            paddingLeft: `${2*D}px`
                        })
                    }
                }), a.observe(b), window._resizeObservers || (window._resizeObservers = new WeakMap), window._resizeObservers.set(b, a));
                if (a = c.getAttribute("tag")) d = f.tagStyle || {}, k = f.tagMap || {}, u = {
                    position: "absolute",
                    right: f.pointer ? "40px" : "30px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: d.color || f.tagColor || "#666",
                    fontSize: d.fontSize || "12px",
                    margin: f.tagMargin
                }, d.padding && (u.padding = d.padding), d.borderRadius && (u.borderRadius = d.borderRadius), d.fontWeight && (u.fontWeight = d.fontWeight), k[a] && (u.backgroundColor = k[a]), d = $("<span>").css(u), f.allowHTML ? d.html(a) : d.text(a), b.appendChild(d[0]);
                "checkbox" !== f.pointer && !f.pointer?.startsWith("checkbox_") || c.hasAttribute("group") || "true" === c.getAttribute("data-is-group") || b.classList.contains("group-option") || (b.style.position = "relative", b.style.paddingRight = "40px", a = c.selected ||
                    c.hasAttribute("selected"), b.setAttribute("data-checked", a ? "true" : "false"), d = document.createElement("div"), d.className = "custom-checkbox option-checkbox", Object.assign(d.style, {
                        ...Y(),
                        border: a ? `2px solid ${f.checkboxColor}` : `2px solid ${f.buttonColor}`,
                        borderRadius: "3px",
                        backgroundColor: a ? f.checkboxColor : "#fff",
                        zIndex: "2",
                        display: "block",
                        width: f.checkboxSize,
                        height: f.checkboxSize
                    }), a && (d.innerHTML = U(f.checkboxSize)), b.appendChild(d));
                "radio" !== f.pointer || h || (b.style.position = "relative", b.style.paddingRight =
                    "40px", a = document.createElement("div"), a.className = "custom-radio", Object.assign(a.style, {
                        ...Y(),
                        border: `2px solid ${f.buttonColor}`,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        zIndex: "2",
                        width: f.radioSize,
                        height: f.radioSize
                    }), (c.selected || c.hasAttribute("selected")) && (c.value || c.getAttribute("value")) && (Object.assign(a.style, {
                        border: `2px solid ${f.radioColor}`
                    }), a.innerHTML = Q(f.radioColor, f)), (c.disabled || c.hasAttribute("disabled")) && Object.assign(a.style, {
                        border: `2px solid ${f.buttonColor}`,
                        backgroundColor: "#f5f5f5",
                        cursor: "not-allowed"
                    }), b.appendChild(a));
                f.pointer && f.pointer.startsWith("question_") && !h && (a = document.createElement("div"), a.className = "custom-question option-question", Object.assign(a.style, f.questionStyle), a.innerHTML = "?", b.appendChild(a));
                f.allowHTML ? (a = c.innerHTML, a = a.replace(/\x3c!--([\s\S]*?)--\x3e/g, (m, D) => D.trim()), b.insertAdjacentHTML("afterbegin", a)) : b.insertAdjacentText("afterbegin", c.textContent);
                !c.disabled && !c.hasAttribute("disabled") || h || (b.classList.add("disabled"), ja(b, f.disabledStyle));
                !c.selected && !c.hasAttribute("selected") || h || (b.classList.add("selected"), ja(b, f.selectedOptionStyle));
                va.appendChild(b)
            });
            x.appendChild(fa);
            V.appendChild(x);
            V.appendChild(ta);
            f.scrollColor && (V.id || (V.id = "select-scroll-" + Math.random().toString(36).substr(2, 9)), na($(V), f));
            x = R.parentNode;
            F = R.nextSibling;
            R.style.display = "none";
            V.insertBefore(R, V.firstChild);
            F ? x.insertBefore(V, F) : x.appendChild(V);
            R._needsExpandGroup && (setTimeout(() => {
                if ($(V).find(`[class*="-option"][data-value="${ya.value}"]`).length) {
                    const c =
                        ya.className?.split(" ") || [],
                        a = new Set;

                    function b(h) {
                        if (h && !a.has(h)) {
                            a.add(h);
                            var d = $(V).find(`[data-group="${h}"]`);
                            d.length && (d.addClass("expanded"), d.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), $(V).find(`.${h}`).show(), (d.attr("class")?.split(" ") || []).forEach(k => {
                                "group-option" !== k && "expanded" !== k && b(k)
                            }))
                        }
                    }
                    c.forEach(h => b(h))
                }
            }, 0), delete R._needsExpandGroup);
            $(V).data("isTriggeredOnce", !1);
            !0 === f.onclick && setTimeout(() => {
                const c = $(V).find(`.${f.triggerClass}`);
                $(V).data("isInitialOpen", !0);
                c.trigger("click")
            }, 0);
            V.setAttribute("data-duration", v);
            V.setAttribute("data-slide-toggle", f.slideToggle)
        }
    });
    if (!window._gong_tea_yun_2) {
        window._gong_tea_yun_2 = !0;
        let g = !1,
            C = !1,
            x = !1,
            t = !1,
            F = null,
            T = !1,
            f = !1;
        $(document).on("mousedown", '[class*="-wrapper"], [class*="-trigger"], [class*="-options"], [class*="-option"]', function(e) {
            e.stopPropagation();
            x = C = !0;
            R = !1;
            T = !0;
            window._isMouseDown_gong = !0;
            e = $(this).closest('[class*="-wrapper"]');
            window._gong_tea_yun_3 = e
        });
        $(document).on("mouseup",
            function(e) {
                window._isMouseDown_gong = !1;
                if (C) {
                    var c = x,
                        a = 0 < $(e.target).closest('[class*="-wrapper"]').length;
                    x = C = !1;
                    c && f && a && (e.stopPropagation(), e.preventDefault(), $(e.target).closest('[class*="-wrapper"]'));
                    window._gong_tea_yun_3 = null;
                    f = !1;
                    setTimeout(() => {
                        T = !1
                    }, 300)
                }
            });
        $(document).on("keydown", '[class*="-wrapper"], [class*="-trigger"]', function(e) {
            var c = $(this).closest('[class*="-wrapper"]');
            if (c.length) {
                var a = c.data("settings");
                if (a) {
                    var b = c.find(`.${a.triggerClass}`),
                        h = c.find(`.${a.optionClass}:not(.disabled)`),
                        d = c.hasClass(a.openClass),
                        k = c.find(`.${a.optionClass}.${a.highlightedClass}`);
                    switch (e.keyCode) {
                        case 13:
                            return e.preventDefault(), e.stopPropagation(), d ? k.length ? k.hasClass("group-option") ? k.trigger("click") : (e = new MouseEvent("click", {
                                bubbles: !0,
                                cancelable: !0,
                                view: window
                            }), c = a.offclick, a.offclick = !1, k[0].dispatchEvent(e), a.offclick = c) : b.trigger("click") : (b.trigger("click"), k.length || h.first().addClass(a.highlightedClass).css("background-color", a.activeBackground)), !1;
                        case 40:
                        case 38:
                            e.preventDefault();
                            e.stopPropagation();
                            e = 38 === e.keyCode;
                            if (!d) return b.trigger("click"), k.length || h.first().addClass(a.highlightedClass).css("background-color", a.activeBackground), !1;
                            d = c.find(`.${a.optionClass}:not(.disabled)`).filter(function() {
                                return "none" !== $(this).css("display")
                            });
                            b = c.find(`.${a.optionsClass} > div`).first();
                            h = b.height();
                            b.scrollTop();
                            k.is(":last-child");
                            k.position();
                            k.outerHeight();
                            c.find(`.${a.optionClass}`).removeClass(a.highlightedClass);
                            c.find(`.${a.optionClass}`).each(function() {
                                const u = $(this);
                                if (u.hasClass("selected") && a.selectedBg) {
                                    var m = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                                    u.attr("style", (u.attr("style") || "") + `; background-color: ${m} !important;`);
                                    u.css("opacity", "1")
                                } else m = (u.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), u.attr("style", m)
                            });
                            k.length ? (c = d.index(k), k = e ? d.eq(Math.max(0, c - 1)) : c < d.length - 1 ? d.eq(c + 1) : k) : k = d.first();
                            k.length && (k.hasClass("selected") && a.selectedBg ? k.css("opacity", "0.7") : k.addClass(a.highlightedClass).css("background-color",
                                a.activeBackground), c = k.position().top, d = c + k.outerHeight(), !e && (d >= h || k.is(":last-child")) ? b.scrollTop(d + 1 - h) : e && (0 >= c || k.is(":first-child")) && b.scrollTop(c));
                            return !1;
                        case 27:
                            return e.preventDefault(), e.stopPropagation(), d && b.trigger("click"), !1;
                        case 32:
                            return e.preventDefault(), e.stopPropagation(), d || b.trigger("click"), !1
                    }
                }
            }
        });
        $(document).on("mouseenter", '[class*="-option"]', function(e) {
            e.stopPropagation();
            e = $(this);
            var c = e.closest('[class*="-wrapper"]');
            const a = c.data("settings");
            a && !e.hasClass("disabled") &&
                (e.hasClass("selected") && a.selectedBg ? e.css("opacity", "0.7") : (c.find('[class*="-option"]:not(.disabled)').not(e).each(function() {
                        $(this).removeClass(a.highlightedClass);
                        if ($(this).hasClass("selected")) a.selectedBg && (b = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, $(this).attr("style", ($(this).attr("style") || "") + `; background-color: ${b} !important;`));
                        else {
                            var b = ($(this).attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                            $(this).attr("style", b)
                        }
                    }), e.addClass(a.highlightedClass),
                    (e.hasClass("selected") || ("checkbox" === a.pointer || a.pointer?.startsWith("checkbox_")) && "true" === e.attr("data-checked")) && a.selectedBg ? (c = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, e.attr("style", (e.attr("style") || "") + `; background-color: ${c} !important;`)) : e.css("background-color", a.activeBackground)))
        });
        $(document).on("mouseleave", '[class*="-option"]', function() {
            const e = $(this),
                c = e.closest('[class*="-wrapper"]').data("settings");
            if (c && !e.hasClass("disabled")) {
                var a = e.hasClass("selected") ||
                    ("checkbox" === c.pointer || c.pointer?.startsWith("checkbox_")) && "true" === e.attr("data-checked");
                a && c.selectedBg ? e.css("opacity", "1") : (e.removeClass(c.highlightedClass), a && c.selectedBg ? (a = !0 === c.selectedBg ? rgbToRgba(c.activeBackground, .5) : c.selectedBg, e.attr("style", (e.attr("style") || "") + `; background-color: ${a} !important;`)) : (a = (e.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), e.attr("style", a), setTimeout(() => {
                    e.hasClass(c.highlightedClass) || e.css("background-color", c.optionsStyle.background ||
                        "")
                }, 0)))
            }
        });
        let R = !1;
        $(document).on("mousemove", '[class*="-wrapper"]', function(e) {
            C && x && (R = !0)
        });
        $(document).on("mousemove", '[class*="-option"]:not(.disabled)', function() {});
        let V = null;
        $(document).on("touchstart", '[class*="-option"]', function(e) {
            V && clearTimeout(V);
            const c = $(this);
            t = !0;
            if (c.hasClass("disabled")) F = null;
            else {
                var a = c.closest('[class*="-wrapper"]'),
                    b = a.data("settings");
                b && (F = this, a.find('[class*="-option"]').removeClass(b.highlightedClass), a.find('[class*="-option"]').each(function() {
                    const h =
                        $(this);
                    if (h.hasClass("selected") && b.selectedBg) {
                        var d = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg;
                        h.attr("style", (h.attr("style") || "") + `; background-color: ${d} !important;`)
                    } else d = (h.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), h.attr("style", d)
                }), V = setTimeout(() => {
                    if (F === this)
                        if (c.hasClass("selected") && b.selectedBg) c.css("opacity", "0.7");
                        else if (c.addClass(b.highlightedClass), c.hasClass("selected") && b.selectedBg) {
                        const h = !0 === b.selectedBg ? rgbToRgba(b.activeBackground,
                            .5) : b.selectedBg;
                        c.attr("style", (c.attr("style") || "") + `; background-color: ${h} !important;`)
                    } else c.css("background-color", b.activeBackground)
                }, 0), e.stopPropagation())
            }
        });
        $(document).on("touchmove", '[class*="-wrapper"]', function(e) {
            t && $(this).data("settings")
        }, {
            passive: !1
        });
        $(document).on("touchend", function() {
            if (t) {
                if (F) {
                    const e = $(F).closest('[class*="-wrapper"]'),
                        c = e.data("settings");
                    c && (e.find('[class*="-option"]').removeClass(c.highlightedClass), e.find('[class*="-option"]').each(function() {
                        const a =
                            $(this);
                        if (a.hasClass("selected") && c.selectedBg) {
                            var b = !0 === c.selectedBg ? rgbToRgba(c.activeBackground, .5) : c.selectedBg;
                            a.attr("style", (a.attr("style") || "") + `; background-color: ${b} !important;`);
                            a.css("opacity", "1")
                        } else b = (a.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), a.attr("style", b)
                    }))
                }
                t = !1;
                F = null
            }
        });
        $(document).on("touchend", '[class*="-option"]:not(.disabled)', function(e) {
            60 > Date.now() - 0 && this === F && $(this).trigger("click");
            e.stopPropagation()
        });
        $(document).on("click", "[data-group]",
            function(e) {
                function c(E) {
                    function p(G) {
                        b.find("." + G).each(function() {
                            var K = $(this);
                            w.add(this);
                            if (K.attr("group") || K.data("group")) K = K.attr("group") || K.data("group"), p(K)
                        })
                    }
                    const w = new Set;
                    E = E.data("group");
                    p(E);
                    return w
                }
                e.preventDefault();
                e.stopPropagation();
                T = window._isGroupClick = !0;
                const a = $(this).closest('[class*="-wrapper"]'),
                    b = a.find('[class*="-options"]'),
                    h = b.find("div").first(),
                    d = a.data("settings"),
                    k = parseInt(a.attr("data-duration"));
                e = q() ? b : h;
                const u = () => {
                    window._heightCache || (window._heightCache =
                        new Map);
                    let E = 0;
                    const p = [];
                    b.find("li, option").each(function() {
                        "none" !== $(this).css("display") && p.push(this)
                    });
                    p.forEach(w => {
                        const G = $(w);
                        var K = w.id || G.data("height-id");
                        w = window._heightCache.get(K);
                        w || (w = G.outerHeight(!0), K ? window._heightCache.set(K, w) : (K = "height-" + Math.random().toString(36).substr(2, 9), G.data("height-id", K), window._heightCache.set(K, w)));
                        E += w
                    });
                    requestAnimationFrame(() => {
                        const w = Math.min(E, d.Mheight),
                            G = d.optionsStyle.background || "#fff";
                        h.css({
                            height: w,
                            overflowY: "auto",
                            WebkitOverflowScrolling: "touch",
                            backgroundColor: G
                        });
                        b.css({
                            height: w,
                            backgroundColor: G
                        })
                    });
                    1E3 < window._heightCache.size && window._heightCache.clear()
                };
                var m = $(this).data("group"),
                    D = $(this).hasClass("expanded");
                $(this).toggleClass("expanded");
                const J = $(this).find(".custom-group-arrow");
                if (D) {
                    J.css("transform", "translateY(-50%) rotate(0deg)");
                    e = c($(this));
                    const E = {};
                    e.forEach(p => {
                        const w = $(p);
                        if (w.attr("group") || w.data("group")) {
                            const G = p.id || `group_${Math.random().toString(36).substr(2,9)}`;
                            p.id || (p.id = G);
                            E[G] = w.hasClass("expanded")
                        }
                    });
                    $(this).data("childStates", E);
                    e.forEach(p => {
                        const w = $(p);
                        if (w.attr("group") || w.data("group")) w.removeClass("expanded"), w.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)");
                        w.css("opacity", "0.1").slideUp(k, function() {
                            w.css("opacity", "1");
                            u()
                        })
                    })
                } else {
                    J.css("transform", "translateY(-50%) rotate(180deg)");
                    D = b.find("." + m);
                    m = !$(this).closest("li").hasClass(m);
                    D.show();
                    D.first().outerHeight(!0);
                    D.hide();
                    D.css("opacity", "0.1").slideDown(k, function() {
                        $(this).css("opacity", "1");
                        u()
                    });
                    m && (m = D.first().outerHeight(), D = e[0] || e, e.animate && "function" === typeof e.animate ? e.animate({
                        scrollTop: m
                    }, k) : D && "function" === typeof D.scrollTo ? D.scrollTo({
                        top: m,
                        behavior: "smooth"
                    }) : D && (D.scrollTop = m));
                    const E = $(this).data("childStates");
                    E && Object.keys(E).forEach(p => {
                        E[p] && (p = $(`#${p}`), p.length && (p.addClass("expanded").find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), (p = p.attr("group") || p.data("group")) && b.find("." + p).css("opacity", "0.1").slideDown(k, function() {
                            $(this).css("opacity",
                                "1");
                            u()
                        })))
                    })
                }
                setTimeout(() => {
                    T = window._isGroupClick = !1;
                    a.data("groupClicked", !1)
                }, 300);
                return !1
            });

        function fa(e, c, a, b) {
            const h = a.pointer.split("_")[1],
                d = h + "_return";
            if ("function" === typeof window[h]) {
                e[0].setAttribute("data-aun", "true");
                b = e.find("select, ul").first();
                c = c.index();
                var k = b.find("option").eq(c);
                const u = k.val(),
                    m = y(k.html(), 1),
                    D = y(k.html());
                k = k.attr("tag");
                b = r(n(b[0], u, c).text);
                window[h]({
                    value: u,
                    text: m,
                    html: D,
                    tag: k,
                    group: b,
                    index: c
                });
                window[h + "_close"] = function() {
                    const J = $('[data-state="opened"][data-aun="true"]').filter(function() {
                        const W =
                            $(this).data("settings");
                        return W && W.pointer === `question_${h}`
                    });
                    if (!J.length) return !1;
                    const E = J.data("settings"),
                        p = J.find(`.${E.optionsClass}`),
                        w = parseInt(J.attr("data-duration")),
                        G = q(),
                        K = $(".select-overlay");
                    K.css("background-color", "rgba(0, 0, 0, 0)");
                    setTimeout(() => {
                        K.hide()
                    }, w);
                    J[0].removeAttribute("data-aun");
                    J.removeClass(E.openClass);
                    J.attr("data-state", "closed");
                    G && !E.slideToggle ? N(p, w, K, E) : B(p, w, E);
                    return !0
                };
                window[d] = function(J, E, p) {
                    e.data("forcedClose", !0);
                    const w = e.find(`.${a.triggerClass}`),
                        G = e.find(`.${a.optionsClass}`),
                        K = parseInt(e.attr("data-duration")),
                        W = q(),
                        ea = $(".select-overlay");
                    ea.css("background-color", "rgba(0, 0, 0, 0)");
                    setTimeout(() => {
                        ea.hide()
                    }, K);
                    var I = "";
                    let P = null;
                    "function" === typeof E ? P = E : (I = E, P = p);
                    E = J.split(": ")[1];
                    E = e.find("select, ul").first().find(`option[value="${E}"]`);
                    I = I || E.attr("tag");
                    if (a.allowHTML)
                        if (!0 === a.tag && I) {
                            E = a.tagStyle || {};
                            p = a.tagMap || {};
                            const ra = {
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: E.color || a.tagColor || "#666",
                                fontSize: E.fontSize ||
                                    "12px",
                                right: "radio" === a.pointer || a.pointer.includes("question_") ? "40px" : "30px",
                                margin: a.tagMargin
                            };
                            E.padding && (ra.padding = E.padding);
                            E.borderRadius && (ra.borderRadius = E.borderRadius);
                            E.fontWeight && (ra.fontWeight = E.fontWeight);
                            p[I] && (ra.backgroundColor = p[I]);
                            I = $("<span>").css(ra).html(I);
                            w.html(J).append(I)
                        } else w.html(J);
                    else w.text(J);
                    e.attr("data-aun", "true");
                    J = $("<div>").addClass("custom-question trigger-question").css({
                        ...a.questionStyle,
                        border: `2px solid ${a.questionColor}`,
                        backgroundColor: a.questionColor,
                        width: a.questionSize,
                        height: a.questionSize
                    }).html(`<span style="color: white; font-size: calc(${a.questionSize} * 0.6);">\u2713</span>`);
                    w.append(J);
                    e.removeClass(a.openClass);
                    e.attr("data-state", "closed");
                    W && !a.slideToggle ? N(G, K, ea, a) : G.slideToggle(K, {
                        easing: a.easing
                    });
                    "function" === typeof P && P();
                    delete window[d];
                    return !0
                }
            }
            return !1
        }

        function ia(e, c, a, b) {
            if (!c.hasClass(a.optionClass) || c.data("processing")) return !1;
            c.data("processing", !0);
            try {
                b.stopImmediatePropagation();
                b.preventDefault();
                let h = c.find(".custom-checkbox");
                const d = c[0].getBoundingClientRect(),
                    k = b.clientX || b.originalEvent?.touches?.[0]?.clientX,
                    u = b.clientY || b.originalEvent?.touches?.[0]?.clientY,
                    m = c.hasClass("group-option") || c.attr("data-group") || c.data("group");
                if (!(h.length && h[0] || m)) {
                    c.css({
                        position: "relative",
                        paddingRight: "40px"
                    });
                    const I = document.createElement("div");
                    I.className = "custom-checkbox option-checkbox";
                    const P = "true" === c.attr("data-checked");
                    Object.assign(I.style, {
                        ...Y(),
                        border: P ? `2px solid ${a.checkboxColor}` : `2px solid ${a.buttonColor}`,
                        borderRadius: "3px",
                        backgroundColor: P ? a.checkboxColor : "#fff",
                        zIndex: "2",
                        display: "block",
                        width: a.checkboxSize,
                        height: a.checkboxSize
                    });
                    P && (I.innerHTML = U(a.checkboxSize));
                    c.append(I);
                    h = c.find(".custom-checkbox")
                }
                if (!(k >= d.left - 1 && k <= d.right + 1 && u >= d.top - 1 && u <= d.bottom + 1)) return c.data("processing", !1), !1;
                const D = "true" === c.attr("data-checked"),
                    J = e.find('[data-checked="true"]').get(),
                    E = (b = !D) ? J.length + 1 : J.length - 1,
                    p = e.find("select").first(),
                    w = c.index(),
                    G = p.find("option").eq(w),
                    K = {
                        value: G.val(),
                        text: y(G.html(),
                            1),
                        html: y(G.html()),
                        tag: G.attr("tag"),
                        checked: b,
                        index: w,
                        count: E,
                        group: r(n(p[0], G.val(), w).text)
                    };
                if (a.pointer?.startsWith("checkbox_")) {
                    const I = a.pointer.split("checkbox_")[1];
                    if ("function" === typeof window[I] && !1 === window[I](K)) return c.data("processing", !1), !1
                }
                c.attr("data-checked", b.toString());
                e.attr("data-check-count", E);

                function W(I, P, ra) {
                    return {
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: `calc(${I} + ${4}px)`,
                        height: `calc(${I} + ${4}px)`,
                        borderRadius: "3px",
                        border: `${2}px solid ${ra?P:a.buttonColor}`,
                        backgroundColor: ra ? P : "#fff",
                        WebkitTapHighlightColor: "transparent",
                        display: "block",
                        zIndex: "2",
                        boxSizing: "border-box",
                        padding: "0"
                    }
                }
                if (!(h.length && h[0] || m)) {
                    c.css({
                        position: "relative",
                        paddingRight: "40px"
                    });
                    const I = document.createElement("div");
                    I.className = "custom-checkbox option-checkbox";
                    Object.assign(I.style, {
                        ...Y(),
                        borderRadius: "3px",
                        zIndex: "2",
                        display: "block",
                        width: a.checkboxSize,
                        height: a.checkboxSize
                    });
                    c.append(I);
                    h = c.find(".custom-checkbox")
                }
                const ea =
                    e.find(`.${a.triggerClass}`).find(".custom-checkbox");
                b ? (h.css(W(a.checkboxSize, a.checkboxColor, !0)).html(U(a.checkboxSize)), 0 < E && ea.css(W(a.checkboxSize, a.checkboxColor, !0)).html(A(E, a.checkboxSize))) : (h.css(W(a.checkboxSize, a.buttonColor, !1)).empty(), 0 === E ? ea.css(W(a.checkboxSize, a.buttonColor, !1)).empty() : ea.css(W(a.checkboxSize, a.checkboxColor, !0)).html(A(E, a.checkboxSize)));
                if (a.selectedBg) {
                    const I = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                    $("#dynamic-selected-bg-style").length ||
                        $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${I} !important; }</style>`);
                    e.find(`.${a.optionClass}`).each(function() {
                        const P = $(this);
                        "true" === P.attr("data-checked") ? (P.addClass("selected").addClass("selected-bg-active"), P[0].style.setProperty("background-color", I, "important")) : (P.removeClass("selected").removeClass("selected-bg-active"), P[0].style.removeProperty("background-color"));
                        P.css("font-weight", "normal")
                    })
                } else b ? (c.addClass("selected"),
                    c.css("font-weight", "bold")) : (c.removeClass("selected"), c.css("font-weight", "normal"));
                if (a.closeBox) {
                    const I = $(".select-overlay");
                    I.css("pointer-events", "none").hide();
                    setTimeout(() => {
                        I.css("pointer-events", "");
                        c.data("processing", !1)
                    }, 50)
                } else {
                    const I = parseInt(e.attr("data-duration")),
                        P = e.find(`.${a.optionsClass}`),
                        ra = q(),
                        za = $(".select-overlay");
                    ra && !a.slideToggle ? z(P, I, za, e, a) : (e.removeClass(a.openClass), za.css("pointer-events", "none").hide(), I ? P.slideToggle(I, {
                        easing: a.easing,
                        complete: () => {
                            setTimeout(() => {
                                za.css("pointer-events", "");
                                c.data("processing", !1)
                            }, 50)
                        }
                    }) : (P.hide(), za.css("pointer-events", ""), setTimeout(() => {
                        c.data("processing", !1)
                    }, 50)))
                }
                return !1
            } catch (h) {
                return console.error("[handleCheckboxPointer] \uc5d0\ub7ec \ubc1c\uc0dd:", h), c.data("processing", !1), !1
            } finally {
                setTimeout(() => {
                    c.data("processing") && (console.warn("[handleCheckboxPointer] \ud50c\ub798\uadf8 \uac15\uc81c \ud574\uc81c"), c.data("processing", !1))
                }, 1E3)
            }
        }

        function ya(e, c, a) {
            const b = e.find(`.${a.triggerClass}`),
                h = parseInt(e.attr("data-selected-index"));
            let d = b.find(".custom-radio");
            d.length ? d = d[0] : (d = document.createElement("div"), d.className = "custom-radio trigger-radio");
            Object.assign(d.style, {
                ...Y(),
                border: void 0 !== c ? `2px solid ${a.radioColor}` : `2px solid ${a.buttonColor}`,
                borderRadius: "50%",
                backgroundColor: "#fff",
                width: a.radioSize,
                height: a.radioSize
            });
            d.innerHTML = void 0 !== c ? Q(a.radioColor, a) : "";
            e.find(".custom-radio").not(".trigger-radio").each(function() {
                const u = $(this).closest('[class*="-option"]');
                var m = u.attr("data-value");
                const D = u.index();
                m = m === c && D === h;
                Object.assign(this.style, {
                    border: m ? `2px solid ${a.radioColor}` : `2px solid ${a.buttonColor}`,
                    backgroundColor: "#fff"
                });
                m ? (this.innerHTML = Q(a.radioColor, a), u.addClass("selected"), a.selectedBg || u.css("font-weight", "bold")) : (this.innerHTML = "", u.removeClass("selected").css("font-weight", "normal"))
            });
            b.find(".custom-radio").remove();
            b.append(d);
            var k = e.find("select").first();
            e = k.find("option").eq(h);
            e.length && (k = n(k[0], e.val(), h), e.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim(), b.html(k.text +
                d.outerHTML));
            domqueryFocus()
        }

        function da(e, c) {
            e.attr("data-selected-value", "");
            e.attr("data-selected-index", "-1");
            const a = e.find(`.${c.triggerClass}`),
                b = e.find("select, ul").first();
            var h = b.find("option").first();
            h = c.allowHTML ? h.html() : h.text();
            a.find(".custom-radio").remove();
            const d = document.createElement("div");
            d.className = "custom-radio trigger-radio";
            Object.assign(d.style, {
                ...Y(),
                border: `2px solid ${c.buttonColor}`,
                borderRadius: "50%",
                backgroundColor: "#fff",
                width: c.radioSize,
                height: c.radioSize
            });
            c.allowHTML ? a.html(h + d.outerHTML) : (a.text(h), a.append(d));
            e.find(".custom-radio").not(".trigger-radio").each(function() {
                const k = $(this).closest(`.${c.optionClass}`);
                $(this).css({
                    border: `2px solid ${c.buttonColor}`,
                    backgroundColor: "#fff"
                }).empty();
                k.removeClass("selected").css("font-weight", "normal");
                c.selectedBg && k.removeClass("selected-bg-active").css("background-color", "")
            });
            b.find("option").prop("selected", !1);
            ka(e)
        }

        function oa(e, c) {
            e.attr("data-check-count", "0");
            e.find(`.${c.triggerClass}`).find(".custom-checkbox").css({
                border: `2px solid ${c.buttonColor}`,
                backgroundColor: "#fff"
            }).empty();
            e.find(".custom-checkbox").not(".trigger-checkbox").each(function() {
                const a = $(this).closest(`.${c.optionClass}`);
                a.attr("data-checked", "false");
                $(this).css({
                    border: `2px solid ${c.buttonColor}`,
                    backgroundColor: "#fff"
                }).empty();
                c.selectedBg && a.removeClass("selected-bg-active").css("background-color", "")
            });
            ka(e)
        }

        function ka(e) {
            const c = e.find('[class*="-options"]');
            parseInt(e.attr("data-duration"));
            c.find("[data-group]").each(function() {
                const a = $(this),
                    b = a.find(".custom-group-arrow"),
                    h = a.data("group");
                a.hasClass("expanded") && (a.removeClass("expanded"), b.css("transform", "translateY(-50%) rotate(0deg)"));
                c.find("." + h).each(function() {
                    const d = $(this);
                    if (d.attr("group") || d.data("group")) d.removeClass("expanded"), d.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)");
                    d.hide()
                })
            })
        }

        function ta(e, c) {
            const a = ["custom-checkbox", "custom-radio", "custom-question", "custom-dot"];
            Array.from(e.childNodes).forEach(h => {
                (h.nodeType === Node.TEXT_NODE || h.nodeType === Node.ELEMENT_NODE &&
                    !a.some(d => h.classList.contains(d))) && h.remove()
            });
            c = document.createTextNode(c.replace(/<[^>]*>/g, ""));
            const b = Array.from(e.childNodes).find(h => h.nodeType === Node.ELEMENT_NODE && a.some(d => h.classList.contains(d)));
            b ? e.insertBefore(c, b) : e.appendChild(c)
        }

        function va(e, c) {
            const a = e.find(`.${c.triggerClass}`),
                b = e.find("select, ul").first().find("li, option").first().html(),
                h = "checkbox" === c.pointer || c.pointer?.startsWith("checkbox_");
            a.css({
                backgroundImage: "none",
                backgroundSize: "initial",
                backgroundPosition: "initial",
                backgroundRepeat: "no-repeat",
                ...(h ? {} : {
                    paddingLeft: c.defaultPadding || "10px"
                })
            });
            if (window._triggerResizeObservers) {
                const d = window._triggerResizeObservers.get(a[0]);
                d && (d.disconnect(), window._triggerResizeObservers.delete(a[0]))
            }
            h ? ta(a[0], b) : a.html(b);
            c.selectedBg && e.find(`.${c.optionClass}`).each(function() {
                $(this).removeClass("selected-bg-active").css("background-color", "")
            });
            ka(e)
        }

        function wa(e, c, a) {
            const b = e.find("select, ul").first();
            c = c.find(`.${a.optionClass}`).first();
            if ("checkbox" === a.pointer ||
                a.pointer?.startsWith("checkbox_")) c.hide();
            else if ("radio" === a.pointer) - 1 < parseInt(e.attr("data-selected-index") || "-1") ? c.show() : c.hide();
            else {
                a = e.attr("data-selected-value");
                const h = parseInt(e.attr("data-selected-index"));
                0 < b.find("option[group]").length ? -1 === h && void 0 === a || 0 === h && (!a || "" === a) ? (c.hide(), ka(e)) : c.show() : (-1 !== h || a && "" !== a) && (0 !== h || a && "" !== a) ? c.show() : c.hide()
            }
        }
        $(document).on("click", '[class*="-option"]', function(e) {
            e.stopPropagation();
            ua = 3;
            var c = $(this);
            const a = c.closest('[class*="-wrapper"]'),
                b = a.data("settings");
            if (b && c.hasClass(b.optionClass)) {
                if (a.data("optionClickProcessing")) return !1;
                a.data("optionClickProcessing", !0);
                setTimeout(() => {
                    a.removeData("optionClickProcessing")
                }, 500);
                var h = a.find("select, ul").first(),
                    d = c.attr("value") || c.attr("data-value"),
                    k = c.index();
                c.hasClass("selected") && "checkbox" !== b.pointer && !b.pointer?.startsWith("checkbox_") && (c.removeClass("selected"), c.removeClass(b.highlightedClass), c.removeClass("selected-bg-active"), c.css("font-weight", "normal"), b.selectedBg &&
                    c[0].style.removeProperty("background-color"), c[0].classList.remove("selected"), c[0].classList.remove(b.highlightedClass), c[0].classList.remove("selected-bg-active"));
                a.attr("data-current-index", k);
                if ((c.attr("group") || c.attr("data-group")) && !c.attr("value")) return e.preventDefault(), a.data("groupClicked", !0), !1;
                a.data("groupClicked", !1);
                "undefined" !== typeof R && R && (R = !1);
                R = !1;
                if ("undefined" !== typeof g && g) e.preventDefault(), e.stopPropagation(), a.removeData("optionClickProcessing");
                else {
                    if (c.hasClass("disabled")) return e.preventDefault(),
                        a.removeData("optionClickProcessing"), !1;
                    if (b.pointer && b.pointer.startsWith("question_") && (e.preventDefault(), e.stopPropagation(), !1 === fa(a, c, b, e))) return a.removeData("optionClickProcessing"), !1;
                    if (0 === c.index() || "" === c.attr("data-value") || !c.attr("data-value")) switch (b.pointer) {
                        case "radio":
                            da(a, b);
                            break;
                        case "checkbox":
                            oa(a, b);
                            break;
                        default:
                            va(a, b)
                    }
                    0 < h.find("option[group]").length && 0 === k && (!d || "" === d) && ka(a);
                    if ("radio" !== b.pointer || 0 !== k && d && "" !== d) {
                        if ("checkbox" === b.pointer || b.pointer?.startsWith("checkbox_")) return e.preventDefault(),
                            e.stopPropagation(), e.stopImmediatePropagation(), d = ia(a, c, b, e), a.removeData("optionClickProcessing"), d;
                        if (0 === k && (!d || "" === d)) {
                            if (a.data("processingReset")) return !1;
                            a.data("processingReset", !0);
                            try {
                                a.attr("data-selected-value", "");
                                a.attr("data-selected-index", "-1");
                                var u = h[0];
                                const W = h.find("li, option").first().html();
                                var m = h.find("option").eq(0);
                                const ea = a.find(`.${b.triggerClass}`);
                                if ("checkbox" === b.pointer || b.pointer?.startsWith("checkbox_")) {
                                    const I = b.allowHTML ? W : h.find("li, option").first().text();
                                    ta(ea[0], I)
                                } else b.allowHTML ? ea.html(W) : ea.text(h.find("li, option").first().text());
                                h.find("option, li").prop("selected", !1);
                                W && h.find("option").eq(0).prop("selected", !0);
                                a.find('[class*="-option"]').removeClass("selected").removeClass(b.highlightedClass).css("font-weight", "normal");
                                b.dot && a.find(".custom-dot").each(function() {
                                    Object.assign(this.style, {
                                        ...b.dotStyle,
                                        border: `2px solid ${b.buttonColor}`,
                                        backgroundColor: "#fff"
                                    })
                                });
                                if (u._selectId) {
                                    m.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
                                    k = function(I, P = 0) {
                                        return 1 === P ? I.replace(/\x3c!--(.*?)--\x3e/g, "$1").replace(/<[^>]*>/g, "") : I.replace(/\x3c!--(.*?)--\x3e/g, "$1")
                                    };
                                    d = "";
                                    try {
                                        if ("function" === typeof n) {
                                            const I = n(u, "", 0);
                                            I && (d = I.text)
                                        }
                                    } catch (I) {
                                        console.warn("Error in findGroupPath:", I)
                                    }
                                    var D = {
                                            value: "",
                                            text: k(m.html(), 1),
                                            html: k(m.html()),
                                            tag: m.attr("tag"),
                                            element: m[0],
                                            select: u,
                                            index: 0,
                                            group: function(I) {
                                                const P = document.createElement("div");
                                                P.innerHTML = I;
                                                return P.textContent || P.innerText || ""
                                            }(d)
                                        },
                                        J = window._gong_tea_yun_0.get(u._selectId +
                                            "_callback");
                                    J && J.call(this, D);
                                    var E = window._gong_tea_yun_0.get(u._selectId + "_onSelect");
                                    E && E.call(this, D);
                                    h.trigger("change")
                                }
                                var p = parseInt(a.attr("data-duration")) || 0,
                                    w = a.find(`.${b.optionsClass}`);
                                q() && !b.slideToggle ? z(w, p, $(".select-overlay"), a, b) : (a.removeClass(b.openClass), a.attr("data-state", "closed"), w.slideToggle(p, {
                                    easing: b.easing,
                                    complete: function() {
                                        setTimeout(() => {
                                            a.removeData("processingReset")
                                        }, 100)
                                    }
                                }))
                            } catch (W) {
                                console.error("Reset error:", W), a.removeData("processingReset")
                            }
                            return !1
                        }
                        u =
                            a.find("select").first()[0];
                        a.find('[class*="-option"]').each(function(W) {
                            W = $(this);
                            W.removeClass("selected").removeClass(b.highlightedClass).removeClass("selected-bg-active").css("font-weight", "normal");
                            this.classList.remove("selected");
                            this.classList.remove(b.highlightedClass);
                            this.classList.remove("selected-bg-active");
                            b.selectedBg && this.style.removeProperty("background-color");
                            "radio" === b.pointer && W.find(".custom-radio").removeClass("selected")
                        });
                        c.addClass("selected").addClass(b.highlightedClass);
                        b.selectedBg ? (c.addClass("selected-bg-active"), m = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${m} !important; }</style>`), c[0].style.setProperty("background-color", m, "important"), c.css("font-weight", "normal")) : c.css("font-weight", "bold");
                        "radio" === b.pointer && c.find(".custom-radio").addClass("selected");
                        b.dot && (a.find(".custom-dot").each(function() {
                            Object.assign(this.style,
                                b.dotStyle)
                        }), c.find(".custom-dot").css(b.dotSelectedStyle));
                        (d || "" === d) && a.attr({
                            "data-selected-value": d,
                            "data-selected-index": k
                        });
                        h.find("option").prop("selected", !1);
                        h.find("option").eq(k).prop("selected", !0);
                        h.trigger("change");
                        if (u._selectId) {
                            h = h.find("option").eq(k);
                            c = n(u, d, k);
                            m = a.find(`.${b.triggerClass}`);
                            m.empty();
                            if (h.attr("img")) p = h.attr("img"), Object.assign(m[0].style, {
                                backgroundImage: `url(${p})`,
                                backgroundRepeat: "no-repeat"
                            }), p = new ResizeObserver(W => {
                                const ea = W[0].contentRect.height;
                                0 < ea && Object.assign(W[0].target.style, {
                                    backgroundSize: `${ea}px`,
                                    backgroundPosition: `${ea/2}px center`,
                                    paddingLeft: `calc(${2*ea}px)`
                                })
                            }), p.observe(m[0]), window._triggerResizeObservers || (window._triggerResizeObservers = new WeakMap), (w = window._triggerResizeObservers.get(m[0])) && w.disconnect(), window._triggerResizeObservers.set(m[0], p);
                            else if (Object.assign(m[0].style, {
                                    backgroundImage: "none",
                                    backgroundPosition: "initial",
                                    backgroundSize: "initial",
                                    paddingLeft: b.defaultPadding || "10px"
                                }), window._triggerResizeObservers &&
                                (p = window._triggerResizeObservers.get(m[0]))) p.disconnect(), window._triggerResizeObservers.delete(m[0]);
                            b.allowHTML ? m.html(c.text) : m.text(c.text);
                            "radio" === b.pointer && (a.attr({
                                "data-selected-value": d,
                                "data-selected-index": k
                            }), ya(a, d, b));
                            p = h.attr("tag") || "";
                            !0 === b.tag && p && (w = document.createElement("span"), D = b.tagStyle || {}, J = b.tagMap || {}, E = {
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: D.color || b.tagColor || "#666",
                                fontSize: D.fontSize || "12px",
                                right: "radio" === b.pointer ? "40px" : "30px",
                                margin: b.tagMargin
                            }, D.padding && (E.padding = D.padding), D.borderRadius && (E.borderRadius = D.borderRadius), D.fontWeight && (E.fontWeight = D.fontWeight), J[p] && (E.backgroundColor = J[p]), Object.assign(w.style, E), b.allowHTML ? w.innerHTML = p : w.textContent = p, m.append(w));
                            d = {
                                value: d,
                                text: y(h.html(), 1),
                                html: y(h.html()),
                                tag: p,
                                element: h[0],
                                select: u,
                                index: k,
                                group: r(c.text)
                            };
                            (k = window._gong_tea_yun_0.get(u._selectId + "_callback")) && k.call(this, d);
                            (k = window._gong_tea_yun_0.get(u._selectId + "_onSelect")) && k.call(this, d)
                        }
                        a.removeData("optionClickProcessing");
                        d = parseInt(a.attr("data-duration")) || 0;
                        k = a.find(`.${b.optionsClass}`);
                        var G = $(".select-overlay"),
                            K = function() {
                                a.find('[class*="-option"]').removeClass("selected");
                                [50, 100, 200].forEach(W => {
                                    setTimeout(() => {
                                        const ea = a.find('[class*="-option"].selected');
                                        0 < ea.length && ea.removeClass("selected")
                                    }, W)
                                })
                            };
                        q() && !b.slideToggle ? (z(k, d, G, a, b), K()) : (a.removeClass(b.openClass), a.attr("data-state", "closed"), G.css("background-color", "rgba(0, 0, 0, 0)"), b.slideToggle && void 0 !== b.opacity ? k.slideToggle(d, {
                            easing: b.easing,
                            complete: function() {
                                G.hide();
                                M(a);
                                domqueryFocus();
                                K()
                            }
                        }) : k.css("opacity", "").slideToggle(d, {
                            easing: b.easing,
                            complete: function() {
                                G.hide();
                                M(a);
                                domqueryFocus();
                                K()
                            }
                        }))
                    } else da(a, b), d = parseInt(a.attr("data-duration")) || 0, k = a.find(`.${b.optionsClass}`), q() && !b.slideToggle ? z(k, d, $(".select-overlay"), a, b) : (a.removeClass(b.openClass), k.slideToggle(d, {
                        easing: b.easing
                    })), a.removeData("optionClickProcessing")
                }
            }
        });
        $(document).on("click", '[class*="-trigger"]', function(e) {
            function c(p) {
                function w() {
                    E || (E = !0, a.data("isInitialOpen") &&
                        a.removeData("isInitialOpen"), b.trigger && domquery(b.trigger).trigger("click"), b.triggerOnce && !a.data("isTriggeredOnce") && (domquery(b.triggerOnce).trigger("click"), a.data("isTriggeredOnce", !0)))
                }
                p = q();
                var G = a.find("select").first()[0];
                G._selectId && (G = window._gong_tea_yun_0.get(G._selectId + "_open")) && G.call(this);
                wa(a, d, b);
                const K = parseInt(a.attr("data-selected-index")),
                    W = a.attr("data-selected-value");
                G = W;
                let ea = K;
                const I = a.find('[class*="-option"].selected').first();
                I.length && !G && 0 >= ea && (G = I.attr("value") ||
                    I.attr("data-value"), ea = I.index());
                if (0 < ea || G) {
                    var P;
                    G ? P = d.find(`[value="${G}"], [data-value="${G}"]`) : 0 < ea && (P = d.find(`.${b.optionClass}`).eq(ea));
                    if (P && P.length && (P = (P.attr("class")?.split(" ") || []).filter(S => S !== b.optionClass && "selected" !== S && S !== b.highlightedClass), 0 < P.length)) {
                        const S = new Set,
                            X = ha => {
                                if (ha && !S.has(ha)) {
                                    S.add(ha);
                                    var ba = d.find(`[data-group="${ha}"]`);
                                    ba.length && (ba.addClass("expanded"), ba.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), d.find(`.${ha}`).show(),
                                        (ba.attr("class")?.split(" ") || []).forEach(xa => {
                                            "group-option" !== xa && "expanded" !== xa && X(xa)
                                        }))
                                }
                            };
                        P.forEach(ha => X(ha));
                        P = d.css("display");
                        d.css("display", "block");
                        d.outerHeight(!0);
                        d.css("display", P)
                    }
                }
                const ra = () => {
                        if (("checkbox" === b.pointer || b.pointer?.startsWith("checkbox_")) && b.selectedBg) {
                            const S = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg;
                            $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${S} !important; }</style>`);
                            a.find('[data-checked="true"]').each(function() {
                                const X = $(this);
                                X.addClass("selected").addClass("selected-bg-active");
                                X[0].style.setProperty("background-color", S, "important");
                                X.css("font-weight", "normal")
                            });
                            a.find(`.${b.optionClass}`).not('[data-checked="true"]').each(function() {
                                const X = $(this);
                                X.removeClass("selected").removeClass("selected-bg-active");
                                X[0].style.removeProperty("background-color");
                                X.css("font-weight", "normal")
                            })
                        }
                    },
                    za = () => {
                        var S = W;
                        let X = K;
                        const ha = a.find('[class*="-option"].selected').first();
                        ha.length && !S && 0 >= X && (S = ha.attr("value") || ha.attr("data-value"), X = ha.index(), (S || 0 < X) && a.attr({
                            "data-selected-value": S || "",
                            "data-selected-index": X
                        }));
                        a.find('[class*="-option"]').each(function() {
                            const ba = $(this);
                            ba.removeClass("selected").removeClass(b.highlightedClass).removeClass("selected-bg-active").css("font-weight", "normal");
                            b.selectedBg && ba[0].style.removeProperty("background-color");
                            this.classList.remove("selected");
                            this.classList.remove(b.highlightedClass);
                            this.classList.remove("selected-bg-active")
                        });
                        if (0 < X || S) {
                            let ba;
                            S ? ba = d.find(`[value="${S}"], [data-value="${S}"]`) : 0 < X && (ba = d.find(`.${b.optionClass}`).eq(X));
                            if (ba && ba.length) {
                                S = (ba.attr("class")?.split(" ") || []).filter(ma => ma !== b.optionClass && "selected" !== ma && ma !== b.highlightedClass);
                                const xa = new Set,
                                    sa = ma => {
                                        if (ma && !xa.has(ma)) {
                                            xa.add(ma);
                                            var la = d.find(`[data-group="${ma}"]`);
                                            la.length && (la.addClass("expanded"), la.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), d.find(`.${ma}`).show(), (la.attr("class")?.split(" ") || []).forEach(pa => {
                                                "group-option" !== pa && "expanded" !== pa && sa(pa)
                                            }))
                                        }
                                    };
                                S.forEach(ma => sa(ma));
                                ba.addClass("selected").addClass(b.highlightedClass);
                                ba[0].classList.add("selected");
                                ba[0].classList.add(b.highlightedClass);
                                b.selectedBg ? (S = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, ba.attr("style", (ba.attr("style") || "") + `; background-color: ${S} !important;`)) : ba.css("font-weight", "bold");
                                if (b.selectedBg) {
                                    const ma = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg;
                                    setTimeout(() => {
                                        ba.attr("style", (ba.attr("style") || "") + `; background-color: ${ma} !important;`)
                                    }, 50);
                                    setTimeout(() => {
                                        ba.attr("style", (ba.attr("style") || "") + `; background-color: ${ma} !important;`)
                                    }, 200)
                                }
                                void 0 !== b.autoScrollToSelected && b.autoScrollToSelected && (S = parseInt(a.attr("data-duration")) || 300, setTimeout(() => {
                                    d.find("div").first().length && ba.length && ba[0] && "function" === typeof ba[0].scrollIntoView && ba[0].scrollIntoView({
                                        block: "center",
                                        behavior: "smooth"
                                    })
                                }, S))
                            } else ra()
                        }
                        ra()
                    };
                window.requestAnimationFrame ? requestAnimationFrame(() => {
                    requestAnimationFrame(za)
                }) : setTimeout(za, 0);
                "radio" === b.pointer && (P = a.find(".trigger-radio"), P.length && (Object.assign(P[0].style, {
                    border: `2px solid ${b.buttonColor}`,
                    backgroundColor: "#fff",
                    width: b.radioSize,
                    height: b.radioSize
                }), P[0].innerHTML = ""));
                $('[class*="-wrapper"]').not(a).each(function() {
                    const S = $(this),
                        X = S.data("settings");
                    if (X) {
                        if (X.pointer && X.pointer.startsWith("question_") && "true" === S.attr("data-aun")) {
                            var ha = X.pointer.split("_")[1];
                            if ("function" === typeof window[ha + "_close"]) return window[ha +
                                "_close"](), domqueryFocus(), !1
                        }
                        ha = S.find(`.${X.optionsClass}`);
                        if (ha.is(":visible")) {
                            const ba = parseInt(S.attr("data-duration"));
                            S.removeClass(X.openClass).attr("data-state", "closed");
                            ba ? X.slideToggle ? ha.css("opacity", X.opacity || 0).slideToggle(ba, {
                                easing: b.easing
                            }) : ha.slideToggle(ba, {
                                easing: b.easing
                            }) : (X.slideToggle && ha.css("opacity", X.opacity || 0), ha.hide())
                        }
                    }
                });
                a.addClass(b.openClass);
                a.attr("data-state", "opened");
                aa(a.find('[class*="-option"]'));
                P = !0 === b.slideToggle;
                if (!P && (G = Z(a, d), d.css(G), !p)) $(window).off("scroll.select").on("scroll.select",
                    function() {
                        if (d.is(":visible")) {
                            const S = Z(a, d);
                            d.css({
                                top: S.top,
                                bottom: S.bottom,
                                left: S.left
                            })
                        } else $(window).off("scroll.select")
                    });
                P ? (p = b.optionStyle.backgroundColor || b.optionsStyle.background, d.css({
                    opacity: b.opacity || 0,
                    "background-color": p
                }), d.find("div").first().css("background-color", p), d.find(`.${b.optionClass}`).css("background-color", p), d.slideToggle(k, {
                    easing: b.easing,
                    complete: w
                })) : (() => new Promise(S => {
                    const X = a.parent();
                    X.find(".select-overlay").length ? S(X.find(".select-overlay")) : (X.append('<div class="select-overlay"></div>'),
                        setTimeout(() => {
                            const ha = X.find(".select-overlay");
                            S(ha)
                        }, 0))
                }))().then(S => {
                    window._selectCloseTimer && clearTimeout(window._selectCloseTimer);
                    g = !0;
                    S.off("click.selectOverlay");
                    if (!a.data("groupClicked")) {
                        var X = a.find("select, ul").first()[0]._selectId;
                        X && q() && !b.slideToggle && domquery(this).historyOn("select-" + X, sa => {
                            ua = 2;
                            if (0 === sa) {
                                ua = 1;
                                const ma = "undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                    isMobile: !1
                                };
                                sa = $('[class*="-wrapper"][class*="open"]').filter(function() {
                                    const la = $(this).data("settings");
                                    return la && !la.slideToggle && !0 === ma.isMobile
                                });
                                sa.length && sa.each(function() {
                                    const la = $(this),
                                        pa = la.data("settings"),
                                        Ca = la.find(`.${pa.optionsClass}`),
                                        Da = parseInt(la.attr("data-duration")),
                                        Aa = $(".select-overlay");
                                    M(la);
                                    if ("radio" === pa.pointer) {
                                        const Ea = la.attr("data-selected-value"),
                                            Fa = parseInt(la.attr("data-selected-index")),
                                            Ba = la.find(".trigger-radio");
                                        void 0 !== Ea && 0 <= Fa && (Object.assign(Ba[0].style, {
                                                border: `2px solid ${pa.radioColor}`,
                                                backgroundColor: "#fff",
                                                width: pa.radioSize,
                                                height: pa.radioSize
                                            }),
                                            Ba.html(Q(pa.radioColor, pa)))
                                    }
                                    Aa.css({
                                        "background-color": "rgba(0, 0, 0, 0)"
                                    });
                                    Ca.slideToggle(Da, {
                                        easing: pa.easing,
                                        complete: function() {
                                            Aa.hide();
                                            domqueryFocus();
                                            la.removeClass(pa.openClass);
                                            la.attr("data-state", "closed")
                                        }
                                    })
                                })
                            }
                        })
                    }
                    X = Z(a, d);
                    const ha = b.optionsStyle.background || "#fff";
                    S.css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        zIndex: 999,
                        display: "block",
                        transition: "background-color 0.3s ease"
                    });
                    d.css({
                        ...X,
                        opacity: 1,
                        display: "none",
                        backgroundColor: ha,
                        height: b.height ||
                            "auto",
                        Mheight: b.Mheight || "60vh",
                        minHeight: b.minHeight || "auto",
                        maxHeight: b.maxHeight || (g ? b.Mheight || "60vh" : b.height || "300px"),
                        overflowY: "auto",
                        zIndex: 1E3
                    });
                    d.find("div").first().css("background-color", ha);
                    d.find(`.${b.optionClass}`).css("background-color", ha);
                    let ba = !1,
                        xa = !0;
                    domquery(d).slideToggle(k, {
                        easing: b.easing,
                        complete: () => {
                            w();
                            g = xa = !1
                        }
                    });
                    setTimeout(() => {
                        S.css("background-color", "rgba(0, 0, 0, 0)")
                    }, 0);
                    S.on("click.selectOverlay", function(sa) {
                        if (ba || xa) return !1;
                        ua = 2;
                        const ma = a.find(`.${b.triggerClass}`);
                        ma.css("pointer-events", "none");
                        ba = !0;
                        sa.preventDefault();
                        sa.stopPropagation();
                        S.off("click.selectOverlay");
                        if ("radio" === b.pointer) {
                            sa = a.attr("data-selected-value");
                            const la = parseInt(a.attr("data-selected-index")),
                                pa = a.find(".trigger-radio");
                            void 0 === sa && -1 === la ? pa.css({
                                border: `2px solid ${b.buttonColor}`,
                                backgroundColor: "#fff",
                                width: b.radioSize,
                                height: b.radioSize
                            }).html("") : void 0 !== sa && 0 <= la && pa.css({
                                border: `2px solid ${b.radioColor}`,
                                backgroundColor: "#fff",
                                width: b.radioSize,
                                height: b.radioSize
                            }).html(Q(b.radioColor,
                                b))
                        }
                        S.css("background-color", "rgba(0, 0, 0, 0)");
                        window._selectCloseTimer = setTimeout(() => {
                            S.hide();
                            d.hide();
                            a.removeClass(b.openClass);
                            a.attr("data-state", "closed");
                            a.data("groupClicked", !1);
                            T = ba = g = !1;
                            setTimeout(() => {
                                ma.css("pointer-events", "auto")
                            }, 0)
                        }, k)
                    });
                    setTimeout(() => {
                        a.data("groupClicked", !1)
                    }, k)
                });
                setTimeout(function() {
                    u.css({
                        "pointer-events": "",
                        opacity: ""
                    })
                }, k || 0)
            }
            e.stopPropagation();
            const a = $(this).closest('[class*="-wrapper"]'),
                b = a.data("settings");
            if (b) {
                var h = $(".select-overlay");
                h.length &&
                    h.is(":visible") && h.css("pointer-events", "none").hide();
                var d = a.find(`.${b.optionsClass}`),
                    k = parseInt(a.attr("data-duration"));
                h = d.is(":visible");
                var u = $('[class*="-option"]'),
                    m = $('[class*="-wrapper"]').not(a).filter(function() {
                        return $(this).find('[class*="-options"]').is(":visible")
                    });
                if (h && !b.offclick) {
                    h = parseInt(a.attr("data-duration"));
                    if ("radio" === b.pointer) {
                        m = a.attr("data-selected-value");
                        var D = parseInt(a.attr("data-selected-index")),
                            J = a.find(".trigger-radio");
                        void 0 !== m && 0 <= D && (Object.assign(J[0].style, {
                            border: `2px solid ${b.radioColor}`,
                            backgroundColor: "#fff",
                            width: b.radioSize,
                            height: b.radioSize
                        }), J.html(Q(b.radioColor, b)))
                    }
                    q() && !b.slideToggle ? z(d, h, $(".select-overlay"), a, b) : (a.removeClass(b.openClass), a.attr("data-state", "closed"), h ? b.slideToggle ? d.css("opacity", b.opacity || 0).slideToggle(h, {
                        easing: b.easing,
                        complete: domqueryFocus
                    }) : d.slideToggle(h, {
                        easing: b.easing,
                        complete: domqueryFocus
                    }) : (d.hide(), domqueryFocus()));
                    return !1
                }
                if (0 < m.length) return m.each(function() {
                    const p = $(this),
                        w = p.data("settings");
                    if (w) {
                        var G = p.find(`.${w.optionsClass}`),
                            K = parseInt(p.attr("data-duration"));
                        p.removeClass(w.openClass).attr("data-state", "closed");
                        K ? w.slideToggle ? G.css("opacity", w.opacity || 0).slideToggle(K, {
                            easing: w.easing
                        }) : G.slideToggle(K, {
                            easing: w.easing
                        }) : G.hide()
                    }
                }), !1;
                if (b.pointer && b.pointer.startsWith("question_")) {
                    m = b.pointer.split("_")[1];
                    D = a[0].hasAttribute("data-aun");
                    J = a.find("select").first();
                    const p = parseInt(a.attr("data-current-index")),
                        w = J.find("option").eq(p);
                    J = {
                        value: w.val(),
                        text: y(w.html(), 1),
                        html: y(w.html()),
                        tag: w.attr("tag"),
                        group: r(n(J[0], w.val(), p).text),
                        index: p
                    };
                    if (D && (e.preventDefault(), e.stopPropagation(), "function" === typeof window[m + "_cancel"])) return window[m + "_reset"] = function() {
                        const G = a.find(`.${b.triggerClass}`);
                        var K = a.find("select, ul").first();
                        K.find("option, li").first().prop("selected", !0);
                        K = K.find("option, li").first().text();
                        G.text(K);
                        K = document.createElement("div");
                        K.className = "custom-question trigger-question";
                        Object.assign(K.style, {
                            ...b.questionStyle,
                            width: b.questionSize,
                            height: b.questionSize,
                            fontSize: `calc(${b.questionSize} * 0.6)`
                        });
                        K.innerHTML = "?";
                        G.append(K);
                        a.removeClass(b.openClass);
                        a[0].removeAttribute("data-aun")
                    }, window[m + "_cancel"](J), !1;
                    a.find(`.${b.optionClass}`).each(function() {
                        const G = $(this);
                        G.find(".custom-question, .custom-group-arrow").remove();
                        if (G.hasClass("group-option")) {
                            var K = document.createElement("div");
                            K.className = "custom-group-arrow";
                            const ea = ca(b);
                            let I = ea.arrowSizeValue;
                            var W = ea.arrowRightValue;
                            Object.assign(K.style, {
                                position: "absolute",
                                right: W,
                                top: "50%",
                                transform: "translateY(-50%) rotate(0deg)",
                                width: "0",
                                height: "0",
                                borderLeft: `${I} solid transparent`,
                                borderRight: `${I} solid transparent`,
                                borderTop: `${I} solid ${ea.arrowColorValue}`,
                                transition: "all 0.3s ease"
                            });
                            G.append(K);
                            K = parseFloat(I);
                            W = parseFloat(W);
                            isNaN(K) || isNaN(W) || G[0].style.setProperty("padding-right", `${2*K+W+10}px`, "important")
                        } else W = document.createElement("div"), W.className = "custom-question option-question", Object.assign(W.style, b.questionStyle), W.innerHTML = `<span style="font-size: calc(${b.questionSize} * 0.6);">?</span>`,
                            G.append(W)
                    })
                }
                m = $('[class*="-wrapper"][class*="open"]').filter(function() {
                    const p = $(this).data("settings");
                    return p && p.pointer && p.pointer.startsWith("question_") && "true" === $(this).attr("data-aun")
                });
                if (m.length) h = m.data("settings").pointer.split("_")[1], "function" === typeof window[h + "_close"] && (window[h + "_close"](), domqueryFocus());
                else {
                    if ("checkbox" === b.pointer || b.pointer?.startsWith("checkbox_")) m = a.find(`.${b.triggerClass}`), a.find(`.${b.optionClass}`).each(function() {
                        const p = $(this);
                        if (p.hasClass("group-option") ||
                            p.attr("data-group") || p.data("group")) p.find(".custom-checkbox").remove();
                        else {
                            var w = "true" === p.attr("data-checked");
                            p.find(".custom-checkbox").remove();
                            const G = document.createElement("div");
                            G.className = "custom-checkbox option-checkbox";
                            Object.assign(G.style, {
                                ...Y(),
                                border: w ? `2px solid ${b.checkboxColor}` : `2px solid ${b.buttonColor}`,
                                borderRadius: "3px",
                                backgroundColor: w ? b.checkboxColor : "#fff",
                                zIndex: "2",
                                display: "block",
                                width: b.checkboxSize,
                                height: b.checkboxSize
                            });
                            w ? (G.innerHTML = U(b.checkboxSize),
                                b.selectedBg && (w = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, p.addClass("selected").addClass("selected-bg-active"), p[0].style.setProperty("background-color", w, "important"), p.css("font-weight", "normal"))) : b.selectedBg && (p.removeClass("selected").removeClass("selected-bg-active"), p[0].style.removeProperty("background-color"), p.css("font-weight", "normal"));
                            p.append(G)
                        }
                    }), m.find(".custom-checkbox").length || (D = document.createElement("div"), D.className = "custom-checkbox trigger-checkbox",
                        J = parseInt(a.attr("data-check-count")) || 0, Object.assign(D.style, {
                            ...Y(),
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            border: 0 < J ? `2px solid ${b.checkboxColor}` : `2px solid ${b.buttonColor}`,
                            borderRadius: "3px",
                            backgroundColor: 0 < J ? b.checkboxColor : "#fff",
                            zIndex: "2",
                            display: "block",
                            width: b.checkboxSize,
                            height: b.checkboxSize
                        }), 0 < J && (D.innerHTML = A(J, b.checkboxSize)), m.append(D));
                    if (!b.offclick || !a.hasClass(b.openClass)) {
                        var E = !1;
                        if (h) a.removeClass(b.openClass), a.attr("data-state",
                            "closed"), aa(u), u.removeClass(b.highlightedClass), u.each(function() {
                            const p = $(this);
                            p.hasClass("selected") && b.selectedBg ? (p.addClass("selected-bg-active"), p.css("opacity", "1")) : p.removeClass("selected-bg-active")
                        }), "radio" === b.pointer && (h = a.attr("data-selected-value"), m = a.find(".trigger-radio"), m.length && (void 0 !== h ? (Object.assign(m[0].style, {
                            border: `2px solid ${b.radioColor}`,
                            backgroundColor: "#fff",
                            width: b.radioSize,
                            height: b.radioSize
                        }), m[0].innerHTML = void 0 !== h ? Q(b.radioColor, b) : "") : (Object.assign(m[0].style, {
                            border: `2px solid ${b.buttonColor}`,
                            backgroundColor: "#fff",
                            width: b.radioSize,
                            height: b.radioSize
                        }), m[0].innerHTML = ""))), B(d, k, b);
                        else {
                            if (b.delay && 0 < parseInt(b.delay)) {
                                if ("true" === a.attr("data-delay-pending")) return !1;
                                a.attr("data-delay-pending", "true");
                                const p = this;
                                e.preventDefault();
                                e.stopPropagation();
                                setTimeout(function() {
                                    a.removeAttr("data-delay-pending");
                                    c.call(p, e)
                                }, parseInt(b.delay));
                                return !1
                            }
                            c.call(this, e)
                        }
                    }
                }
            }
        });
        $(document).on("click", function(e) {
            if (T) T = !1;
            else {
                var c = $(e.target),
                    a = c.closest('[class*="-wrapper"]');
                if (c.closest(".group-option").length || a.data("groupClicked")) return e.preventDefault(), e.stopPropagation(), !1;
                e = $('[class*="-wrapper"][class*="open"]');
                e.length && !c.closest('[class*="-wrapper"]').length && (ua = 2, e.each(function() {
                    const b = $(this),
                        h = b.data("settings");
                    if (h && !0 !== h.offclick && (!h.pointer || !h.pointer.startsWith("question_") || "true" !== b.attr("data-aun"))) {
                        var d = b.find(`.${h.optionsClass}`),
                            k = parseInt(b.attr("data-duration")),
                            u = function() {
                                b.find('[class*="-option"]').removeClass("selected");
                                [50, 100, 200].forEach(m => {
                                    setTimeout(() => {
                                        const D = b.find('[class*="-option"].selected');
                                        0 < D.length && D.removeClass("selected")
                                    }, m)
                                })
                            };
                        if (q() && !h.slideToggle) z(d, k, $(".select-overlay"), b, h), u();
                        else {
                            b.removeClass(h.openClass);
                            b.attr("data-state", "closed");
                            if ("radio" === h.pointer) {
                                const m = b.attr("data-selected-value"),
                                    D = parseInt(b.attr("data-selected-index")),
                                    J = b.find(".trigger-radio");
                                void 0 !== m && 0 <= D && (Object.assign(J[0].style, {
                                    border: `2px solid ${h.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: h.radioSize,
                                    height: h.radioSize
                                }), J.html(Q(h.radioColor, h)))
                            }
                            k ? h.slideToggle ? d.css("opacity", h.opacity || 0).slideToggle(k, {
                                easing: h.easing,
                                complete: function() {
                                    M(b);
                                    u();
                                    domqueryFocus()
                                }
                            }) : d.slideToggle(k, {
                                easing: h.easing,
                                complete: function() {
                                    M(b);
                                    u();
                                    domqueryFocus()
                                }
                            }) : (u(), d.hide(), M(b), domqueryFocus())
                        }
                    }
                }))
            }
        });
        $(document).on("focusin", function(e) {
            e = $(e.target);
            const c = e.closest('[class*="-wrapper"]');
            e.is("body") || $('[class*="-wrapper"][class*="open"]').each(function() {
                const a = $(this);
                if (!c.length || a[0] !== c[0]) {
                    var b =
                        a.data("settings");
                    if (b && !0 !== b.offclick && (!b.pointer || !b.pointer.startsWith("question_") || "true" !== a.attr("data-aun"))) {
                        var h = a.find(`.${b.optionsClass}`),
                            d = parseInt(a.attr("data-duration"));
                        if (q() && !b.slideToggle) z(h, d, $(".select-overlay"), a, b);
                        else {
                            a.removeClass(b.openClass);
                            a.attr("data-state", "closed");
                            if ("radio" === b.pointer) {
                                const k = a.attr("data-selected-value"),
                                    u = parseInt(a.attr("data-selected-index")),
                                    m = a.find(".trigger-radio");
                                void 0 !== k && 0 <= u && (Object.assign(m[0].style, {
                                    border: `2px solid ${b.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: b.radioSize,
                                    height: b.radioSize
                                }), m.html(Q(b.radioColor, b)))
                            }
                            d ? b.slideToggle ? h.css("opacity", b.opacity || 0).slideToggle(d, {
                                easing: b.easing,
                                complete: function() {
                                    M(a);
                                    domqueryFocus()
                                }
                            }) : h.slideToggle(d, {
                                easing: b.easing,
                                complete: function() {
                                    M(a);
                                    domqueryFocus()
                                }
                            }) : (h.hide(), M(a), domqueryFocus())
                        }
                    }
                }
            })
        });
        $(document).on("focusout", '[class*="-wrapper"]', function(e) {
            const c = $(this),
                a = c.data("settings");
            a && !0 !== a.offclick && setTimeout(() => {
                if ($('[class*="-wrapper"][class*="open"]').length &&
                    !(0 < $(document.activeElement).closest('[class*="-wrapper"]').length || a.pointer && a.pointer.startsWith("question_") && "true" === c.attr("data-aun"))) {
                    var b = c.find(`.${a.optionsClass}`),
                        h = parseInt(c.attr("data-duration"));
                    if (q() && !a.slideToggle) z(b, h, $(".select-overlay"), c, a);
                    else {
                        c.removeClass(a.openClass);
                        c.attr("data-state", "closed");
                        if ("radio" === a.pointer) {
                            const d = c.attr("data-selected-value"),
                                k = parseInt(c.attr("data-selected-index")),
                                u = c.find(".trigger-radio");
                            void 0 !== d && 0 <= k && (Object.assign(u[0].style, {
                                border: `2px solid ${a.radioColor}`,
                                backgroundColor: "#fff",
                                width: a.radioSize,
                                height: a.radioSize
                            }), u.html(Q(a.radioColor, a)))
                        }
                        h ? a.slideToggle ? b.css("opacity", a.opacity || 0).slideToggle(h, {
                            easing: a.easing
                        }) : b.slideToggle(h, {
                            easing: a.easing
                        }) : b.hide()
                    }
                }
            }, 0)
        });
        $(window).on("resize", function() {
            $('[class*="-wrapper"][class*="open"]').each(function() {
                var e = $(this),
                    c = e.data("settings");
                c && !0 !== c.slideToggle && (c = e.find(`.${c.optionsClass}`), e = Z(e, c), c.css(e))
            })
        })
    }
    return this
};
$.fn.select = function(v, l, H) {
    const q = function(r, y, n) {
        if (n) {
            var Q = y.val();
            n.pointer ? "radio" === n.pointer ? r.find(".custom-radio").each(function() {
                const U = $(this).closest('[class*="-option"]').attr("data-value") === Q;
                $(this).css({
                    border: U ? `2px solid ${n.radioColor}` : `2px solid ${n.buttonColor}`,
                    backgroundColor: "#fff"
                }).html(U ? upHTMe(n.radioColor, n) : "")
            }) : "checkbox" === n.pointer ? r.find(".custom-checkbox").each(function() {
                const U = $(this).closest('[class*="-option"]').attr("data-value") === Q,
                    A = n.checkboxColor ||
                    "#2196F3",
                    Y = n.checkboxSize || "16px";
                U ? $(this).css({
                    border: `2px solid ${A}`,
                    backgroundColor: A
                }).html(upHTMe2(Y)) : $(this).css({
                    border: `2px solid ${n.buttonColor||"#ccc"}`,
                    backgroundColor: "#fff"
                }).html("")
            }) : n.pointer.startsWith("question_") && r.find(".custom-question").each(function() {
                $(this).closest('[class*="-option"]').attr("data-value") === Q ? $(this).addClass("active") : $(this).removeClass("active")
            }) : n.dot && r.find(".custom-dot").each(function() {
                $(this).closest('[class*="-option"]').attr("data-value") ===
                    Q ? $(this).css(n.dotSelectedStyle || {}) : $(this).css(n.dotStyle || {})
            })
        }
    };
    if ("string" === typeof v) {
        if ("value" === v) return "" === l || null === l || void 0 === l ? this.each(function() {
            const r = $(this).find('option[value=""]');
            if (r.length) return $(this).select("index", r.index())
        }) : this.each(function() {
            const r = $(this);
            if (this._selectId) {
                var y = r.find(`option[value="${l}"]`);
                if (y.length) {
                    var n = $(".select-" + (this._selectId + "-wrapper"));
                    const U = n.data("settings");
                    r.find("option").prop("selected", !1);
                    y.prop("selected", !0);
                    n.attr({
                        "data-selected-value": y.val(),
                        "data-selected-index": y.index()
                    });
                    var Q = n.find('[class*="-option"]');
                    Q.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    U.selectedBg && Q.each(function() {
                        const O = $(this),
                            L = (O.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        O.attr("style", L)
                    });
                    const A = n.find(`[data-value="${y.val()}"]`);
                    if (A.length) {
                        setTimeout(() => {
                            A.addClass("selected");
                            U.selectedBg ? (A.addClass("selected-bg-active"), A[0].style.setProperty("background-color",
                                !0 === U.selectedBg ? rgbToRgba(U.activeBackground, .5) : U.selectedBg, "important"), A.css("font-weight", "normal")) : A.css("font-weight", "bold")
                        }, 300);
                        const O = n.find('[class*="-options"]');
                        if (O.length) {
                            Q = (A.attr("class")?.split(" ") || []).filter(L => L !== U.optionClass && "selected" !== L && L !== U.highlightedClass && !L.includes("wrapper") && !L.includes("options"));
                            if (0 < Q.length) {
                                const L = new Set,
                                    M = B => {
                                        if (B && !L.has(B)) {
                                            L.add(B);
                                            var N = O.find(`[data-group="${B}"]`);
                                            N.length && (N.addClass("expanded"), N.find(".custom-group-arrow").css("transform",
                                                "translateY(-50%) rotate(180deg)"), O.find(`.${B}`).show(), (N.attr("class")?.split(" ") || []).forEach(z => {
                                                "group-option" !== z && "expanded" !== z && M(z)
                                            }))
                                        }
                                    };
                                Q.forEach(B => M(B))
                            }
                            void 0 !== U.autoScrollToSelected && U.autoScrollToSelected && (Q = parseInt(n.attr("data-duration")) || 300, setTimeout(() => {
                                O.find("div").first().length && A.length && A[0] && "function" === typeof A[0].scrollIntoView && A[0].scrollIntoView({
                                    block: "center",
                                    behavior: "smooth"
                                })
                            }, Q))
                        }
                    }
                    q(n, y, U);
                    n = n.find('[class*="-trigger"]');

                    function Y(O, L) {
                        var M = L.attr("class");
                        if (!M) return L.text();
                        const B = [];
                        M = M.split(" ");
                        for (let z = 0; z < M.length; z++) {
                            var N = O.find(`option[group="${M[z]}"]`);
                            if (N.length && (B.push(N.text()), N = N.attr("class"))) {
                                N = N.split(" ");
                                for (let Z = 0; Z < N.length; Z++) {
                                    const aa = O.find(`option[group="${N[Z]}"]`);
                                    aa.length && B.unshift(aa.text())
                                }
                            }
                        }
                        B.push(L.text());
                        return [...(new Set(B))].join(" > ")
                    }
                    let ca;
                    if (r.find("option[group]").length) try {
                        ca = "function" === typeof findGroupPath ? findGroupPath(this, y.val(), y.index()).text : Y(r, y)
                    } catch (O) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
                            O), ca = y.text()
                    } else ca = y.text();
                    y = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    Q = n.find('span[style*="position: absolute"]').clone();
                    U && U.allowHTML ? n.html(ca) : n.text(ca);
                    y.length && n.append(y);
                    Q.length && n.append(Q);
                    r.val(l)
                }
            } else console.warn("Select element was not initialized with $.select() method")
        });
        if ("index" === v && "number" === typeof l) return this.each(function() {
            var r = $(this);
            if (this._selectId) {
                var y = r.find("option").eq(l);
                if (y.length) {
                    var n = $(".select-" + (this._selectId +
                        "-wrapper"));
                    const U = n.data("settings");
                    r.find("option").prop("selected", !1);
                    y.prop("selected", !0);
                    n.attr({
                        "data-selected-value": y.val(),
                        "data-selected-index": l
                    });
                    var Q = n.find('[class*="-option"]');
                    Q.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    U.selectedBg && Q.each(function() {
                        const O = $(this),
                            L = (O.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        O.attr("style", L)
                    });
                    const A = n.find(`[data-value="${y.val()}"]`);
                    A.length && setTimeout(() => {
                        A.addClass("selected");
                        U.selectedBg ? (A.addClass("selected-bg-active"), A[0].style.setProperty("background-color", U.selectedBg, "important"), A.css("font-weight", "normal")) : A.css("font-weight", "bold")
                    }, 300);
                    q(n, y, U);
                    n = n.find('[class*="-trigger"]');

                    function Y(O, L) {
                        var M = L.attr("class");
                        if (!M) return L.text();
                        const B = [];
                        M = M.split(" ");
                        for (let z = 0; z < M.length; z++) {
                            var N = O.find(`option[group="${M[z]}"]`);
                            if (N.length && (B.push(N.text()), N = N.attr("class"))) {
                                N = N.split(" ");
                                for (let Z = 0; Z < N.length; Z++) {
                                    const aa = O.find(`option[group="${N[Z]}"]`);
                                    aa.length && B.unshift(aa.text())
                                }
                            }
                        }
                        B.push(L.text());
                        return [...(new Set(B))].join(" > ")
                    }
                    let ca;
                    if (r.find("option[group]").length) try {
                        ca = "function" === typeof findGroupPath ? findGroupPath(this, y.val(), l).text : Y(r, y)
                    } catch (O) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:", O), ca = y.text()
                    } else ca = y.text();
                    r = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    Q = n.find('span[style*="position: absolute"]').clone();
                    U && U.allowHTML ? n.html(ca) :
                        n.text(ca);
                    r.length && n.append(r);
                    Q.length && n.append(Q);
                    "function" === typeof H && H.call(this, {
                        index: l,
                        value: y.val(),
                        text: y.text(),
                        path: ca
                    })
                }
            } else console.warn("Select element was not initialized with $.select() method")
        });
        if ("value" === v) return this.each(function() {
            var r = $(this);
            if (this._selectId) {
                var y = r.find(`option[value="${l}"]`);
                if (y.length) {
                    var n = $(".select-" + (this._selectId + "-wrapper"));
                    const U = y.index(),
                        A = n.data("settings");
                    r.find("option").prop("selected", !1);
                    y.prop("selected", !0);
                    n.attr({
                        "data-selected-value": l,
                        "data-selected-index": U
                    });
                    var Q = n.find('[class*="-option"]');
                    Q.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    A.selectedBg && Q.each(function() {
                        const L = $(this),
                            M = (L.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        L.attr("style", M)
                    });
                    const Y = n.find(`[data-value="${l}"]`);
                    Y.length && setTimeout(() => {
                        Y.addClass("selected");
                        A.selectedBg ? (Y.addClass("selected-bg-active"), Y[0].style.setProperty("background-color", A.selectedBg, "important"), Y.css("font-weight",
                            "normal")) : Y.css("font-weight", "bold")
                    }, 300);
                    A && A.pointer ? "radio" === A.pointer ? n.find(".custom-radio").each(function() {
                        const L = $(this).closest('[class*="-option"]').attr("data-value") === l;
                        $(this).css({
                            border: L ? `2px solid ${A.radioColor}` : `2px solid ${A.buttonColor}`,
                            backgroundColor: "#fff"
                        }).html(L ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(A.radioSize)/2}px; height: ${parseInt(A.radioSize)/2}px; background-color: ${A.radioColor}; border-radius: 50%;"></div>` :
                            "")
                    }) : "checkbox" === A.pointer ? n.find(".custom-checkbox").each(function() {
                        const L = $(this).closest('[class*="-option"]').attr("data-value") === l,
                            M = A.checkboxColor || "#2196F3";
                        L ? $(this).css({
                            border: `2px solid ${M}`,
                            backgroundColor: M
                        }).html('<svg viewBox="0 0 24 24" style="fill: white; width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>') : $(this).css({
                            border: `2px solid ${A.buttonColor||
"#ccc"}`,
                            backgroundColor: "#fff"
                        }).html("")
                    }) : A.pointer.startsWith("question_") && n.find(".custom-question").each(function() {
                        $(this).closest('[class*="-option"]').attr("data-value") === l ? $(this).addClass("active") : $(this).removeClass("active")
                    }) : A && A.dot && n.find(".custom-dot").each(function() {
                        const L = $(this).closest('[class*="-option"]').attr("data-value") === l;
                        $(this).css({
                            border: L ? `2px solid ${A.dotColor}` : `2px solid ${A.buttonColor}`,
                            backgroundColor: L ? A.dotColor : "#fff"
                        })
                    });
                    n = n.find('[class*="-trigger"]');

                    function ca(L, M) {
                        var B = M.attr("class");
                        if (!B) return M.text();
                        const N = [];
                        B = B.split(" ");
                        for (let Z = 0; Z < B.length; Z++) {
                            var z = L.find(`option[group="${B[Z]}"]`);
                            if (z.length && (N.push(z.text()), z = z.attr("class"))) {
                                z = z.split(" ");
                                for (let aa = 0; aa < z.length; aa++) {
                                    const ja = L.find(`option[group="${z[aa]}"]`);
                                    ja.length && N.unshift(ja.text())
                                }
                            }
                        }
                        N.push(M.text());
                        return [...(new Set(N))].join(" > ")
                    }
                    let O;
                    if (r.find("option[group]").length) try {
                        O = "function" === typeof findGroupPath ? findGroupPath(this, l, U).text : ca(r, y)
                    } catch (L) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
                            L), O = y.text()
                    } else O = y.text();
                    r = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    Q = n.find('span[style*="position: absolute"]').clone();
                    A && A.allowHTML ? n.html(O) : n.text(O);
                    r.length && n.append(r);
                    Q.length && n.append(Q);
                    "function" === typeof H && H.call(this, {
                        index: U,
                        value: l,
                        text: y.text(),
                        path: O
                    })
                }
            } else console.warn("Select element was not initialized with $.select() method")
        })
    }
    return $.select.call(this, v, l, H)
};
$.fn.selectSet = function(v, l, H) {
    return this.each(function() {
        function q(B, N, z) {
            const [Z, aa] = N.split(":");
            if ("selected" === Z) "selected" === aa && (r.find("option").prop("selected", !1), B.prop("selected", !0), Q(A, r, B), r.trigger("change"));
            else if ("val" === Z)
                if (N = B.val(), B.val(aa), z) {
                    const na = B.attr("group");
                    B.attr("group", aa);
                    r.find(`option.${na}`).each(function() {
                        $(this).removeClass(na).addClass(aa)
                    });
                    B = A.find(`[data-group="${na}"]`);
                    B.length && (B.attr("data-group", aa), A.find(`.${na}`).each(function() {
                        $(this).removeClass(na).addClass(aa)
                    }))
                } else z =
                    A.find(`[data-value="${N}"]`), z.length && z.attr("data-value", aa), B.prop("selected") && U(A, y);
            else if ("text" === Z)
                if (B.text(aa), z) {
                    z = B.attr("group");
                    z = A.find(`[data-group="${z}"]`);
                    if (z.length) {
                        N = z.find(".custom-group-arrow").clone();
                        var ja = z.contents().filter(function() {
                            return 3 === this.nodeType
                        });
                        ja.length ? ja[0].nodeValue = aa : (Y && Y.allowHTML ? z.html(aa) : z.text(aa), N.length && z.append(N))
                    }
                    B = B.attr("group");
                    r.find(`option.${B}`).filter(function() {
                        return $(this).prop("selected")
                    }).length && U(A, y)
                } else {
                    z = B.val();
                    z = A.find(`[data-value="${z}"]`);
                    if (z.length) {
                        N = z.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot, .custom-group-arrow").clone();
                        ja = z.find('span[style*="position: absolute"]').clone();
                        let na = z.contents().filter(function() {
                            return 3 === this.nodeType
                        });
                        na.length ? na[0].nodeValue = aa : (Y && Y.allowHTML ? z.html(aa) : z.text(aa), N.length && z.append(N), ja.length && z.append(ja))
                    }
                    B.prop("selected") && U(A, y)
                }
        }
        const r = $(this),
            y = this;
        var n = this._selectId;
        if (n) {
            var Q = function(B, N, z) {
                    const Z = B.data("settings"),
                        aa = z.val();
                    z = z.index();
                    B.attr({
                        "data-selected-value": aa,
                        "data-selected-index": z
                    });
                    B.find('[class*="-option"]').removeClass("selected").css("font-weight", "normal");
                    const ja = B.find(`[data-value="${aa}"]`);
                    ja.length && setTimeout(() => {
                        ja.addClass("selected");
                        Z.selectedBg || ja.css("font-weight", "bold")
                    }, 300);
                    "radio" === Z.pointer ? B.find(".custom-radio").each(function() {
                        const na = $(this).closest('[class*="-option"]').attr("data-value") === aa;
                        $(this).css({
                            border: na ? `2px solid ${Z.radioColor}` : `2px solid ${Z.buttonColor}`,
                            backgroundColor: "#fff"
                        }).html(na ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(Z.radioSize)/2}px; height: ${parseInt(Z.radioSize)/2}px; background-color: ${Z.radioColor}; border-radius: 50%;"></div>` : "")
                    }) : Z.dot && B.find(".custom-dot").each(function() {
                        const na = $(this).closest('[class*="-option"]').attr("data-value") === aa;
                        $(this).css({
                            border: na ? `2px solid ${Z.dotColor}` : `2px solid ${Z.buttonColor}`,
                            backgroundColor: na ? Z.dotColor : "#fff"
                        })
                    });
                    U(B, N[0])
                },
                U = function(B, N) {
                    const z = B.data("settings");
                    B = B.find('[class*="-trigger"]');
                    var Z = $(N);
                    const aa = Z.find("option:selected");
                    if (aa.length) {
                        var ja = aa.index(),
                            na = aa.val();
                        if (Z.find("option[group]").length && "function" === typeof findGroupPath) try {
                            var qa = findGroupPath(N, na, ja).text
                        } catch (ua) {
                            console.warn("Error getting group path:", ua), qa = aa.text()
                        } else qa = aa.text();
                        N = B.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                        Z = B.find('span[style*="position: absolute"]').clone();
                        z && z.allowHTML ? B.html(qa) : B.text(qa);
                        N.length && B.append(N);
                        Z.length && B.append(Z);
                        "radio" === z.pointer && (qa = B.find(".custom-radio"), qa.length && qa.css({
                            border: `2px solid ${z.radioColor}`,
                            backgroundColor: "#fff"
                        }).html(`<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(z.radioSize)/2}px; height: ${parseInt(z.radioSize)/2}px; background-color: ${z.radioColor}; border-radius: 50%;"></div>`))
                    }
                },
                A = $(".select-" + (n + "-wrapper")),
                Y = A.data("settings");
            n = !1;
            if ("string" === typeof v && v.startsWith("group:")) {
                n = !0;
                var ca = v.substring(6);
                ca = r.find(`option[group="${ca}"]`)
            } else "number" !== typeof v && isNaN(parseInt(v)) ? "string" === typeof v && (ca = r.find(`option[value="${v}"]`)) : (ca = parseInt(v), ca = r.find("option").eq(ca), ca.attr("group") && (n = !0));
            if (ca.length) {
                if ("string" === typeof l && l.startsWith("{") && l.endsWith("}")) {
                    var O = l.match(/\{([^}]+)\}/g);
                    if (O)
                        for (var L of O) O = L.substring(1, L.length - 1), q(ca, O, n)
                } else "string" === typeof l && q(ca, l, n);
                if ("function" === typeof H) {
                    var M =
                        r.find("option:selected");
                    L = M.index();
                    n = M.val();
                    ca = M.text();
                    O = "";
                    if (M.length && M.attr("class")) {
                        M = M.attr("class").split(" ");
                        for (const B of M)
                            if (M = r.find(`option[group="${B}"]`), M.length) {
                                O = M.text();
                                break
                            }
                    }
                    H.call(this, {
                        index: L,
                        value: n,
                        text: ca,
                        group: O
                    })
                }
            } else console.warn(`Target option not found: ${v}`)
        } else console.warn("Select element was not initialized with $.select() method")
    })
};
$.fn.selectGet = function(v) {
    var l = $(this);
    if ("number" === typeof v) return l = l.find("option").eq(v), l.length ? l : $();
    if ("string" === typeof v && !["val", "value", "text", "index", "group"].includes(v)) {
        var H = l.find(`option[value="${v}"]`);
        if (H.length) return H;
        l = l.find("option").filter(function() {
            return $(this).text() === v
        });
        return l.length ? l : $()
    }
    var q = l.find("option:selected");
    if (!q.length) return $();
    if (v && "val" !== v && "value" !== v) {
        if ("text" === v) return q.text();
        if ("index" === v) return q.index();
        if ("group" === v) {
            H = "";
            try {
                if (q.attr("class")) {
                    const r = q.attr("class").split(" ");
                    q = [];
                    for (const y of r) {
                        const n = l.find(`option[group="${y}"]`);
                        if (n.length && (q.unshift(n.text()), n.attr("class"))) {
                            const Q = n.attr("class").split(" ");
                            for (const U of Q) {
                                const A = l.find(`option[group="${U}"]`);
                                A.length && q.unshift(A.text())
                            }
                        }
                    }
                    H = q.join(" > ")
                }
            } catch (r) {
                console.warn("Error finding group path:", r)
            }
            return H
        }
    } else return q.val();
    return q
};
$.fn.selectAdd = function(v, l) {
    return this.each(function() {
        const H = $(this);
        if (this._selectId) {
            var q;
            if ("string" === typeof v) {
                var r = (n, Q, U, A = {}) => ({
                    prefix: n,
                    minParts: Q,
                    fields: U,
                    optionalFields: A,
                    parse: function(Y) {
                        if (Y.length < this.minParts) return null;
                        const ca = {};
                        this.fields.forEach((O, L) => {
                            ca[O] = Y[L + 1] || ""
                        });
                        Object.entries(this.optionalFields).forEach(([O, L]) => {
                            O = parseInt(O);
                            Y[O] && Y[O].trim() && (ca[L] = Y[O])
                        });
                        return ca
                    }
                });
                window._selectParsers || (window._selectParsers = [], window._selectParsers.push(r("group:",
                    3, ["group", "text"])), window._selectParsers.push(r("option:", 4, ["value", "text", "groupClass"], {
                    4: "tag",
                    5: "img"
                })));
                var y = window._selectParsers;
                r = v.split(":");
                (y = y.find(n => v.startsWith(n.prefix))) && (q = y.parse(r));
                q || (q = v)
            } else q = v;
            q.group ? (r = document.createElement("option"), r.setAttribute("group", q.group), r.textContent = q.text || "", q.parentGroup && (r.className = q.parentGroup), H[0].appendChild(r)) : (r = document.createElement("option"), r.value = q.value || "", r.textContent = q.text || "", q.groupClass && (r.className =
                q.groupClass), q.tag && r.setAttribute("tag", q.tag), q.img && r.setAttribute("img", q.img), q.groupClass ? (y = Array.from(H[0].querySelectorAll(`.${q.groupClass}`)), 0 < y.length ? (y = y[y.length - 1], y.nextSibling ? H[0].insertBefore(r, y.nextSibling) : H[0].appendChild(r)) : (y = H[0].querySelector(`option[group="${q.groupClass}"]`)) && y.nextSibling ? H[0].insertBefore(r, y.nextSibling) : H[0].appendChild(r)) : H[0].appendChild(r));
            refreshSelectUI(H);
            "function" === typeof l && l.call(this, {
                type: q.group ? "group" : "option",
                group: q.group ||
                    q.groupClass,
                value: q.value,
                text: q.text
            })
        } else console.warn("Select element was not initialized with $.select() method")
    })
};

function refreshSelectUI(v) {
    const l = v.closest('[class*="-wrapper"]');
    if (l.length) {
        const H = l[0].parentNode,
            q = l[0].nextSibling;
        v[0].style.display = "";
        q ? H.insertBefore(v[0], q) : H.appendChild(v[0]);
        l.remove()
    }
    v.select(300, {
        duration: 300,
        slideToggle: !0,
        opacity: 1
    })
}
$.fn.selectAdd.registerParser = function(v, l, H, q) {
    window._selectParsers || (window._selectParsers = []);
    window._selectParsers.push(createParser(v, l, H, q))
};
$.fn.selectRemove = function(v, l) {
    return this.each(function() {
        const H = $(this);
        if (this._selectId) {
            var q = "";
            if ("string" === typeof v)
                if (v.startsWith("group:")) {
                    q = v.substring(6);
                    var r = H.find(`option[group="${q}"], option.${q}`);
                    q = "group"
                } else v.startsWith("value:") ? (q = v.substring(6), r = H.find(`option[value="${q}"]`)) : v.startsWith("index:") ? (q = parseInt(v.substring(6)), r = H.find("option").eq(q)) : r = H.find(`option[value="${v}"]`), q = "option";
            if (r && 0 < r.length) {
                q = {
                    type: q,
                    count: r.length,
                    items: r.map(function() {
                        return {
                            value: $(this).val(),
                            text: $(this).text(),
                            isGroup: void 0 !== $(this).attr("group"),
                            groupName: $(this).attr("group") || $(this).attr("class")
                        }
                    }).get()
                };
                r.remove();
                r = H.closest('[class*="-wrapper"]');
                if (r.length) {
                    const y = r[0].parentNode,
                        n = r[0].nextSibling;
                    H[0].style.display = "";
                    n ? y.insertBefore(H[0], n) : y.appendChild(H[0]);
                    r.remove()
                }
                r = parseInt(H.data("duration") || 300);
                H.select(r, {
                    duration: r,
                    slideToggle: !0,
                    opacity: 1
                });
                "function" === typeof l && l.call(this, q)
            }
        } else console.warn("Select element was not initialized with $.select() method")
    })
};