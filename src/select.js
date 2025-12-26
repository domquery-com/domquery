function rgbToRgba(x, l = .5) {
    if (!x || x.startsWith("rgba")) return x;
    var I = x.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (I) {
        const [, q, y, n] = I;
        return `rgba(${q}, ${y}, ${n}, ${l})`
    }
    if (I = x.match(/^#([a-fA-F0-9]{6})$/)) {
        var p = I[1];
        x = parseInt(p.substr(0, 2), 16);
        I = parseInt(p.substr(2, 2), 16);
        p = parseInt(p.substr(4, 2), 16);
        return `rgba(${x}, ${I}, ${p}, ${l})`
    }
    return (I = x.match(/^#([a-fA-F0-9]{3})$/)) ? (p = I[1], x = parseInt(p[0] + p[0], 16), I = parseInt(p[1] + p[1], 16), p = parseInt(p[2] + p[2], 16), `rgba(${x}, ${I}, ${p}, ${l})`) : x
}
$.select = function(x, l, I) {
    function p() {
        var g = "undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
            isMobile: !1,
            isTablet: !1,
            isIOS: !1
        };
        return !0 === g.isMobile
    }

    function q(g) {
        const C = document.createElement("div");
        C.innerHTML = g;
        return C.textContent || C.innerText || ""
    }

    function y(g, C = 0) {
        return 1 === C ? g.replace(/\x3c!--(.*?)--\x3e/g, "$1").replace(/<[^>]*>/g, "") : g.replace(/\x3c!--(.*?)--\x3e/g, "$1")
    }

    function n(g, C) {
        g = $(g);
        C = g.find("option, li").eq(C);
        if (!C.length) return {
            text: g.find("option, li").first().text().trim(),
            tag: null
        };
        var A = C.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
        const t = [];
        var G = C;
        for (t.unshift(A); G.length;) {
            var e = G.attr("class")?.split(" ") || [];
            A = !1;
            for (const T of e)
                if (e = g.find(`[group="${T}"]`), e.length) {
                    G = e.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
                    t.unshift(G);
                    G = e;
                    A = !0;
                    break
                } if (!A) break
        }
        return {
            text: t.join(" > "),
            tag: C.attr("tag")
        }
    }

    function O(g, C) {
        C = parseInt(C?.radioSize || "16") / 2;
        return `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${C}px; height: ${C}px; background-color: ${g}; border-radius: 50%;"></div>`
    }

    function V(g) {
        g = parseInt(g);
        return `<span style="\n\t\t\tposition: absolute;\n\t\t\tleft: 50%;\n\t\t\ttop: 50%;\n\t\t\twidth: ${.3*g}px;\n\t\t\theight: ${.6*g}px;\n\t\t\tborder: solid white;\n\t\t\tborder-width: 0 ${.12*g}px ${.12*g}px 0;\n\t\t\ttransform: translate(-50%, -65%) rotate(45deg);\n\t\t\tdisplay: block;\n\t\t"></span>`
    }

    function H(g, C = "16px") {
        return `<div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; color: #fff; font-size: ${Math.max(.7*
parseInt(C),10)}px; font-weight: bold; line-height: 1; text-align: center; -webkit-font-smoothing: antialiased; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-tap-highlight-color: transparent;">${g}</div>`
    }

    function da(g = "50%", C = "10px") {
        return {
            position: "absolute",
            right: C,
            top: g,
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px"
        }
    }

    function ea(g) {
        let C = g.groupArrowStyle?.size || g.arrowSize,
            A = g.arrowRight || da().right,
            t = g.groupArrowColor || g.arrowColor;
        if ("checkbox" ===
            g.pointer || g.pointer?.startsWith("checkbox_")) {
            if (!g.groupArrowStyle?.size && g.checkboxSize) {
                var G = parseFloat(g.checkboxSize);
                isNaN(G) || (C = `${.6*G}px`)
            }!g.groupArrowColor && g.checkboxColor && (t = g.checkboxColor)
        } else "radio" === g.pointer ? (!g.groupArrowStyle?.size && g.radioSize && (G = parseFloat(g.radioSize), isNaN(G) || (C = `${.6*G}px`)), !g.groupArrowColor && g.radioColor && (t = g.radioColor)) : g.pointer && g.pointer.startsWith("question_") && !g.groupArrowColor && g.questionColor && (t = g.questionColor);
        return {
            arrowSizeValue: C,
            arrowRightValue: A,
            arrowColorValue: t
        }
    }

    function Y(g) {
        return {
            wrapperClass: g + "-wrapper",
            triggerClass: g + "-trigger",
            optionsClass: g + "-options",
            optionClass: g + "-option",
            openClass: g + "-open"
        }
    }

    function R(g) {
        return {
            border: `2px solid ${g||"#ccc"}`,
            backgroundColor: "#fff"
        }
    }

    function P(g) {
        wa && ((g = g.find("select").first()[0]) && g._selectId && (g = window._gong_tea_yun_0.get(g._selectId + "_close")) && g.call(this, wa), wa = 0)
    }

    function D(g, C, A) {
        const t = g.closest('[class*="-wrapper"]');
        g.find("div").first().css({
            "background-color": A.optionsStyle.background ||
                "#fff"
        });
        P(t);
        C ? (A.slideToggle ? g.css("opacity", A.opacity || 0) : g.css("opacity", ""), g.slideUp(C, {
            easing: A.easing,
            complete: domqueryFocus
        })) : (g.hide(), domqueryFocus())
    }

    function M(g, C, A, t) {
        if (!xa) {
            xa = !0;
            var G = g.closest('[class*="-wrapper"]');
            P(G);
            A.css({
                "background-color": "rgba(0, 0, 0, 0)"
            });
            var e = G.find("select").first()[0]._selectId;
            setTimeout(() => {
                e && domquery(this).historyOff("select-" + e);
                xa = !1
            }, C + 300);
            g.slideUp(C, {
                easing: t.easing,
                complete: function() {
                    A.hide();
                    domqueryFocus()
                }
            })
        }
    }

    function z(g, C, A, t,
        G) {
        if (!xa) {
            xa = !0;
            P(t);
            t.data("upHTMe10Running", !0);
            A.css({
                "background-color": "rgba(0, 0, 0, 0)",
                opacity: ""
            });
            var e = t.find("select").first()[0]._selectId;
            setTimeout(() => {
                !t.data("groupClicked") && e && domquery(this).historyOff("select-" + e);
                xa = !1
            }, C + 300);
            g.css("opacity", "").slideUp(C, {
                easing: G.easing,
                complete: function() {
                    A.css("pointer-events", "none").hide();
                    t.removeClass(G.openClass);
                    t.attr("data-state", "closed");
                    setTimeout(() => {
                        A.css("pointer-events", "")
                    }, 100);
                    domqueryFocus()
                }
            })
        }
    }

    function W(g, C) {
        var A =
            p(),
            t = g.data("settings");
        if (!A) {
            const G = g[0].getBoundingClientRect(),
                e = window.innerHeight;
            C = C.find("div").first();
            const T = t && t.height,
                U = T || `${.6*e}px`;
            A = e - G.bottom;
            const aa = G.top;
            if (t.parentView) return g = {
                position: "fixed",
                left: G.left + "px",
                width: G.width + "px",
                zIndex: 1E3,
                height: U,
                overflowY: "auto",
                overflowX: "hidden"
            }, aa > A && A < C[0].scrollHeight ? (g.bottom = e - G.top + "px", g.top = "auto", g.borderRadius = "4px 4px 0 0") : (g.top = G.bottom + "px", g.bottom = "auto", g.borderRadius = "0 0 4px 4px"), g;
            if (T) return {
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
            A < g && aa > A ? (t = {
                top: "auto",
                bottom: "100%",
                borderRadius: "4px 4px 0 0",
                borderBottom: "1px solid #ccc",
                borderTop: "none"
            }, aa < g && C.css({
                maxHeight: `${aa-10}px`,
                overflowY: "auto"
            })) : A < g && C.css({
                maxHeight: `${A-10}px`,
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
            maxHeight: t.maxHeight || (A ? t.Mheight || "60vh" : t.height || "300px"),
            overflowY: "auto",
            zIndex: "1000"
        }
    }

    function Z(g) {
        g.css({
            "pointer-events": "none",
            opacity: "0.6"
        })
    }

    function ka(g, C) {
        C && g && Object.entries(C).forEach(([A, t]) => {
            try {
                g.style[A] = t
            } catch (G) {
                console.warn("Style application failed for property:",
                    A)
            }
        })
    }

    function ja(g, C) {
        if (C.scrollColor) try {
            g.find('[class*="-options"]');
            const A = C.optionsStyle.background || "#fff",
                t = C.optionStyle.borderBottomColor || "#ddd",
                G = `scrollbar-${g.attr("id")||Math.random().toString(36).substr(2,9)}`;
            $(`#${G}`).remove();
            const e = document.createElement("style");
            e.id = G;
            e.textContent = `\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar {\n\t\t\t\t\twidth: 8px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-track,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-track {\n\t\t\t\t\tbackground: ${A};\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-thumb,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-thumb {\n\t\t\t\t\tbackground: ${t};\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\tborder: 1px solid ${A};\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-thumb:hover,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-thumb:hover {\n\t\t\t\t\tbackground: ${t};\n\t\t\t\t\topacity: 0.8;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} {\n\t\t\t\t\tscrollbar-width: thin;\n\t\t\t\t\tscrollbar-color: ${t} ${A};\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div {\n\t\t\t\t\tscrollbar-width: thin;\n\t\t\t\t\tscrollbar-color: ${t} ${A};\n\t\t\t\t}\n\t\t\t`;
            document.head.appendChild(e);
            g.data("scrollbarStyleId", G)
        } catch (A) {
            console.warn("\uc2a4\ud06c\ub864\ubc14 \uc0c9\uc0c1 \uc801\uc6a9 \uc911 \uc624\ub958:", A)
        }
    }
    let xa = !1,
        wa = 0;
    window._isMouseDown_gong = !1;
    window._isGroupClick = !1;
    window._selectPreviousFocus || (window._selectPreviousFocus = null);
    $(document).off("mousedown.selectTrigger touchstart.selectTrigger", '[class*="-trigger"]').on("mousedown.selectTrigger touchstart.selectTrigger", '[class*="-trigger"]', function(g) {
        !(g = document.activeElement) || "INPUT" !==
        g.tagName && "TEXTAREA" !== g.tagName && "true" !== g.getAttribute("contenteditable") || (window._selectPreviousFocus = g, void 0 !== g.selectionStart && (window._selectPreviousFocusPosition = g.selectionStart))
    });
    window.domqueryFocus = function() {
        if (p()) try {
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
    "function" === typeof x ? (I = x, l = {}, x = 0) : "function" === typeof l ? "object" === typeof x ? (I = l, l = x, x = 0) : (I = l, l = {}) : "object" === typeof x && (l = x, x = 0);
    l = l || {};
    x = parseInt(x) || 0;
    this.elements.forEach(g => {
        function C(c) {
            if (!c) return "10px";
            c = c.split(" ").filter(b => b.trim());
            return 1 === c.length ? c[0] : 2 === c.length ? c[1] : 4 === c.length ? c[3] : "10px"
        }
        if (g._selectId) {
            var A = $(g).parent();
            if (A.length && A[0].className && "string" === typeof A[0].className && A[0].className.includes("-wrapper")) return
        }
        var t = Math.random().toString(36).substr(2,
            9);
        A = Y("select-" + t);
        var G = p();
        G = "auto" === l.slideToggle ? G ? !1 : !0 : l.slideToggle || !1;
        let e = {
            ...A,
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
                ...da(),
                ...R(l.buttonColor),
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
                ...da(),
                ...R(l.buttonColor),
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
                ...da(),
                ...R(l.buttonColor),
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
            ...A,
            slideToggle: G
        };
        ("checkbox" === e.pointer || e.pointer?.startsWith("checkbox_")) && setTimeout(() => {
            const c = $(g),
                b = c.find("option[selected]").filter(function() {
                    return "" !== $(this).val().trim() && !$(this).is(":disabled")
                }).map(function() {
                    return {
                        value: $(this).val(),
                        text: $(this).text(),
                        index: $(this).index()
                    }
                }).get().length,
                a = c.closest('[class*="-wrapper"]');
            a.attr("data-check-count", b);
            const h = a.find(`.${e.triggerClass}`).find(".custom-checkbox");
            h.css({
                border: `2px solid ${0<b?e.checkboxColor:e.buttonColor}`,
                backgroundColor: 0 < b ? e.checkboxColor : "#fff",
                width: e.checkboxSize,
                height: e.checkboxSize
            });
            0 < b && h.html(H(b, e.checkboxSize));
            a.find('[class*="-option"]').each(function() {
                const d = $(this);
                var k = d.attr("data-value"),
                    v = c.find(`option[value="${k}"]`);
                k = v.is("[selected]") &&
                    "" !== k.trim();
                v = v.is(":disabled");
                const m = d.find(".custom-checkbox");
                m.length && (m.css({
                    border: `2px solid ${k?e.checkboxColor:e.buttonColor}`,
                    backgroundColor: k ? e.checkboxColor : v ? "#f5f5f5" : "#fff",
                    width: e.checkboxSize,
                    height: e.checkboxSize
                }), k && m.html(V(e.checkboxSize)), d.attr("data-checked", k ? "true" : "false"))
            })
        }, 0);
        g._selectId || (g._selectId = t);
        I && window._gong_tea_yun_0.set(g._selectId + "_callback", I);
        l.onSelect && window._gong_tea_yun_0.set(g._selectId + "_onSelect", l.onSelect);
        l.open && window._gong_tea_yun_0.set(g._selectId +
            "_open", l.open);
        l.close && window._gong_tea_yun_0.set(g._selectId + "_close", l.close);
        A = "select" === g.tagName.toLowerCase();
        G = "ul" === g.tagName.toLowerCase();
        if (A || G) {
            if (G) {
                var T = document.createElement("select");
                T.className = g.className;
                (A = g.getAttribute("onchange")) && T.setAttribute("onchange", A);
                const c = new Set;

                function b(a, h = 0) {
                    Array.from(a).forEach(d => {
                        if (!c.has(d))
                            if (c.add(d), d.hasAttribute("group")) {
                                var k = d.getAttribute("group");
                                const v = document.createElement("option");
                                v.innerHTML = d.innerHTML;
                                v.setAttribute("group",
                                    k);
                                v.setAttribute("data-is-group", "true");
                                v.setAttribute("data-level", h);
                                d.className && (v.className = d.className);
                                T.appendChild(v);
                                const m = d.getAttribute("group");
                                d = Array.from(g.children).filter(L => L.classList.contains(m));
                                b(d, h + 1)
                            } else k = document.createElement("option"), k.value = d.getAttribute("value") || "", k.innerHTML = d.innerHTML, d.hasAttribute("img") && k.setAttribute("img", d.getAttribute("img")), d.getAttribute("tag") && k.setAttribute("tag", d.getAttribute("tag")), d.hasAttribute("disabled") && (k.disabled = !0), d.hasAttribute("selected") && (k.selected = !0), d.className && (k.className = d.className), k.setAttribute("data-level", h), T.appendChild(k)
                    })
                }
                b(g.children);
                g.parentNode.replaceChild(T, g)
            } else T = g;
            T._selectId = g._selectId;
            var U = document.createElement("div");
            U.className = e.wrapperClass;
            U.setAttribute("data-state", "closed");
            U.setAttribute("tabindex", "0");
            U.setAttribute("data-selected-index", "-1");
            U.setAttribute("data-previous-index", "-1");
            $(U).data("settings", e);
            l.width && (U.style.width = l.width, U.style.boxSizing =
                "border-box");
            (A = T.querySelector("option:checked")) && A.value && (U.setAttribute("data-selected-value", A.value), A = Array.from(T.options).indexOf(A), U.setAttribute("data-selected-index", A));
            ka(U, e.wrapperStyle);
            A = document.createElement("div");
            A.style.position = "relative";
            var aa = document.createElement("div");
            aa.className = e.triggerClass;
            aa.setAttribute("tabindex", "-1");
            ka(aa, {
                padding: e.defaultPadding || "10px",
                paddingRight: e.defaultPaddingRight || "40px",
                margin: e.defaultMargin || "0",
                border: `${e.defaultBorderWidth||
"1px"} solid ${e.defaultBorderColor||"#ccc"}`,
                borderRadius: e.defaultBorderRadius || "4px",
                cursor: "pointer",
                backgroundColor: e.defaultBgColor,
                color: e.defaultColor,
                position: "relative",
                width: "100%",
                boxSizing: "border-box"
            });
            $(aa).on({
                mouseenter: function(c) {
                    window._isMouseDown_gong || (c = $(this).closest(`.${e.wrapperClass}`).data("settings")) && c.triggerHoverBgColor && (this.style.backgroundColor = c.triggerHoverBgColor, this.style.color = c.triggerHoverColor || c.defaultColor, this.style.borderColor = c.triggerHoverBorderColor ||
                        c.defaultBorderColor)
                },
                mouseleave: function() {
                    const c = $(this).closest(`.${e.wrapperClass}`).data("settings");
                    c && (this.style.backgroundColor = c.defaultBgColor, this.style.color = c.defaultColor, this.style.borderColor = c.defaultBorderColor)
                }
            });
            var oa = G = null;
            e.triggerStyle && (e.triggerStyle.width ? G = e.triggerStyle.width : e.triggerStyle.maxWidth ? G = e.triggerStyle.maxWidth : e.triggerStyle.minWidth && (G = e.triggerStyle.minWidth), e.triggerStyle.height ? oa = e.triggerStyle.height : e.triggerStyle.maxHeight ? oa = e.triggerStyle.maxHeight :
                e.triggerStyle.minHeight && (oa = e.triggerStyle.minHeight));
            G || (G = T.style.width, !G && T.style.maxWidth && (G = T.style.maxWidth), !G && T.style.minWidth && (G = T.style.minWidth));
            oa || (oa = T.style.height, !oa && T.style.maxHeight && (oa = T.style.maxHeight), !oa && T.style.minHeight && (oa = T.style.minHeight));
            ka(aa, e.triggerStyle);
            aa.style.whiteSpace = "nowrap";
            aa.style.overflow = "hidden";
            aa.style.textOverflow = "ellipsis";
            aa.style.paddingRight = e.defaultPaddingRight || "40px";
            aa.style.height = "auto";
            var ha = e.defaultText,
                za = T.querySelector("option:checked");
            if (za) {
                var ba = Array.from(T.options);
                "checkbox" === e.pointer || e.pointer?.startsWith("checkbox_") ? (ba = ba.find(c => "" === c.value)) && (ha = e.allowHTML ? ba.innerHTML : ba.textContent) : (ha = ba.indexOf(za), ha = n(T, ha).text, T._needsExpandGroup = !0)
            }!e.showArrow || "radio" === e.pointer || "checkbox" === e.pointer || e.pointer && (e.pointer.startsWith("question_") || e.pointer.startsWith("checkbox_")) || (t = "custom-select-arrow-style-" + t, document.getElementById(t) || (ba = document.createElement("style"), ba.id = t, ba.textContent = `\n\t\t\t\t\t.${e.triggerClass}::after {\n\t\t\t\t\t   content: '';\n\t\t\t\t\t   position: absolute;\n\t\t\t\t\t   right: ${e.arrowRight};\n\t\t\t\t\t   top: ${e.arrowTop}; \n\t\t\t\t\t   transform: translateY(-50%);\n\t\t\t\t\t   width: 0;\n\t\t\t\t\t   height: 0;\n\t\t\t\t\t   border-left: ${e.arrowSize} solid transparent;\n\t\t\t\t\t   border-right: ${e.arrowSize} solid transparent;\n\t\t\t\t\t   border-top: ${e.arrowSize} solid ${e.arrowColor};\n\t\t\t\t\t   transition: transform 0.3s ease;\n\t\t\t\t\t   z-index: 1;\n\t\t\t\t\t}\n\t\t\t\t\t.${e.wrapperClass}.${e.openClass} .${e.triggerClass}::after {\n\t\t\t\t\t   transform: translateY(-50%) rotate(180deg);\n\t\t\t\t\t   z-index: 1;  \n\t\t\t\t\t}\n\t\t\t\t\t.${e.triggerClass} {\n\t\t\t\t\t   position: relative;\n\t\t\t\t\t   z-index: 0;\n\t\t\t\t\t}\n\t\t\t\t`,
                document.head.appendChild(ba)));
            if (e.allowHTML) {
                aa.innerHTML = ha;
                if (!e.pointer?.startsWith("question_") && !e.pointer?.startsWith("checkbox_") && "checkbox" !== e.pointer && (t = T.querySelector("option:checked"), !0 === e.tag && t && t.getAttribute("tag"))) {
                    t = t.getAttribute("tag");
                    ha = document.createElement("span");
                    ba = e.tagStyle || {};
                    var na = e.tagMap || {},
                        la = {
                            position: "absolute",
                            right: "radio" === e.pointer ? "40px" : "30px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: ba.color || e.tagColor || "#666",
                            fontSize: ba.fontSize || "12px",
                            margin: e.tagMargin
                        };
                    ba.padding && (la.padding = ba.padding);
                    ba.borderRadius && (la.borderRadius = ba.borderRadius);
                    ba.fontWeight && (la.fontWeight = ba.fontWeight);
                    na[t] && (la.backgroundColor = na[t]);
                    Object.assign(ha.style, la);
                    ha.innerHTML = t;
                    aa.appendChild(ha)
                }
                if (e.pointer && e.pointer.startsWith("question_")) {
                    t = document.createElement("div");
                    t.className = "custom-question trigger-question";
                    Object.assign(t.style, {
                        ...e.questionStyle,
                        width: e.questionSize,
                        height: e.questionSize
                    });
                    if (ha = T.querySelector("option[selected]")) {
                        Object.assign(t.style, {
                            border: `2px solid ${e.questionColor}`,
                            backgroundColor: e.questionColor
                        });
                        t.innerHTML = `<span style="color: white; font-size: calc(${e.questionSize} * 0.6);">\u2713</span>`;
                        ha = ha.getAttribute("tag");
                        if (!0 === e.tag && ha) {
                            ba = document.createElement("span");
                            na = e.tagStyle || {};
                            la = e.tagMap || {};
                            const c = {
                                position: "absolute",
                                right: "40px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: na.color || e.tagColor || "#666",
                                fontSize: na.fontSize || "12px"
                            };
                            na.padding && (c.padding = na.padding);
                            na.borderRadius && (c.borderRadius = na.borderRadius);
                            na.fontWeight && (c.fontWeight = na.fontWeight);
                            la[ha] && (c.backgroundColor = la[ha]);
                            Object.assign(ba.style, c);
                            ba.textContent = ha;
                            aa.appendChild(ba)
                        }
                        U.setAttribute("data-aun", "true")
                    } else t.innerHTML = `<span style="font-size: calc(${e.questionSize} * 0.6);">?</span>`;
                    aa.appendChild(t)
                }
                if ("checkbox" === e.pointer || e.pointer?.startsWith("checkbox_")) aa.style.position = "relative", aa.style.paddingRight = "40px", t = document.createElement("div"), t.className = "custom-checkbox trigger-checkbox", Object.assign(t.style, {
                    ...da(),
                    border: `2px solid ${e.buttonColor}`,
                    borderRadius: "3px",
                    backgroundColor: "#fff",
                    zIndex: "2",
                    display: "block",
                    width: e.checkboxSize,
                    height: e.checkboxSize
                }), aa.appendChild(t);
                "radio" === e.pointer && (aa.style.position = "relative", aa.style.paddingRight = "40px", t = document.createElement("div"), t.className = "custom-radio trigger-radio", Object.assign(t.style, {
                        ...da(),
                        border: `2px solid ${e.buttonColor}`,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        width: e.radioSize,
                        height: e.radioSize
                    }), (ha = T.querySelector("option:checked")) &&
                    ha.value && "" !== ha.value && (Object.assign(t.style, {
                        border: `2px solid ${e.radioColor}`
                    }), t.innerHTML = O(e.radioColor, e)), aa.appendChild(t))
            } else aa.textContent = ha, e.pointer?.startsWith("question_") || e.pointer?.startsWith("checkbox_") || "checkbox" === e.pointer || (t = T.querySelector("option:checked"), !0 === e.tag && t && t.getAttribute("tag") && (t = t.getAttribute("tag"), ha = document.createElement("span"), ba = e.tagStyle || {}, na = e.tagMap || {}, la = {
                position: "absolute",
                right: "radio" === e.pointer ? "40px" : "30px",
                top: "50%",
                transform: "translateY(-50%)",
                color: ba.color || e.tagColor || "#666",
                fontSize: ba.fontSize || "12px",
                margin: e.tagMargin
            }, ba.padding && (la.padding = ba.padding), ba.borderRadius && (la.borderRadius = ba.borderRadius), ba.fontWeight && (la.fontWeight = ba.fontWeight), na[t] && (la.backgroundColor = na[t]), Object.assign(ha.style, la), ha.textContent = t, aa.appendChild(ha)));
            var ra = document.createElement("div");
            ra.className = e.optionsClass;
            ra.style.display = "none";
            ra.style.width = "100%";
            ra.style.boxSizing = "border-box";
            "100%" === G ? (U.style.width = G, U.style.boxSizing =
                "border-box", setTimeout(() => {
                    const c = parseInt(window.getComputedStyle(U).paddingLeft) + parseInt(window.getComputedStyle(U).paddingRight);
                    aa.style.width = `calc(100% - ${c}px)`;
                    ra.style.width = `calc(100% - ${c}px)`
                }, 0)) : G && (U.style.width = G);
            var sa = document.createElement("div");
            sa.style.overflowY = "auto";
            sa.style.overflowX = "hidden";
            sa.style.width = "100%";
            sa.addEventListener("touchmove", function(c) {
                c.stopPropagation()
            }, {
                passive: !0
            });
            Object.assign(sa.style, {
                userSelect: "none",
                webkitUserSelect: "none",
                mozUserSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none"
            });
            Object.assign(aa.style, {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                paddingRight: e.defaultPaddingRight || "40px",
                height: "auto",
                userSelect: "none",
                webkitUserSelect: "none",
                mozUserSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none"
            });
            oa && (sa.style.maxHeight = oa);
            ra.appendChild(sa);
            G = p() && !e.slideToggle;
            ka(ra, {
                ...e.optionsStyle,
                position: e.slideToggle ? "static" : "absolute",
                zIndex: G ? "10000" : "1000",
                ...(e.slideToggle ? {} : {
                    top: "-9999px",
                    left: "-9999px",
                    visibility: "hidden"
                })
            });
            var ua = {},
                f = e.optionStyle?.padding ? C(e.optionStyle.padding) : "10px";
            Array.from(T.options || g.children).forEach((c, b) => {
                const a = document.createElement("div");
                a.className = e.optionClass;
                var h = function(m) {
                    let L = 0;
                    const J = m.className ? m.className.split(" ") : [];
                    if (0 === J.length) return L;
                    let E = J[0],
                        r = !0;
                    for (; r;) r = !1, Array.from(T.options || m.children).forEach(F => {
                        F.hasAttribute("group") && F.getAttribute("group") === E && (L++, F.className && (E = F.className.split(" ")[0], r = !0))
                    });
                    return L
                }(c);
                a.setAttribute("data-level",
                    h);
                h = c.getAttribute("group");
                var d = c.className;
                if (c.hasAttribute("group") || "true" === c.getAttribute("data-is-group")) {
                    a.classList.add("group-option");
                    a.setAttribute("data-group", h);
                    var k = f;
                    if (d) {
                        var v = d.split(" ")[0];
                        ua[v] && (v = parseFloat(ua[v]), isNaN(v) || (k = v + 10 + "px"))
                    }
                    h && (ua[h] = k);
                    k = document.createElement("div");
                    k.className = "custom-group-arrow";
                    v = ea(e);
                    let m = v.arrowSizeValue,
                        L = v.arrowRightValue;
                    Object.assign(k.style, {
                        position: "absolute",
                        right: L,
                        top: "50%",
                        transform: "translateY(-50%) rotate(0deg)",
                        width: "0",
                        height: "0",
                        borderLeft: `${m} solid transparent`,
                        borderRight: `${m} solid transparent`,
                        borderTop: `${m} solid ${v.arrowColorValue}`,
                        transition: "all 0.3s ease"
                    });
                    a.appendChild(k);
                    k = () => {
                        const J = parseFloat(m),
                            E = parseFloat(L);
                        isNaN(J) || isNaN(E) || a.style.setProperty("padding-right", `${2*J+E+10}px`, "important")
                    };
                    k();
                    a._updateGroupPadding = k;
                    a.style.whiteSpace = "nowrap";
                    a.style.overflow = "hidden";
                    a.style.textOverflow = "ellipsis"
                }
                d && d.split(" ").forEach(m => {
                    m && m.trim() && (a.classList.add("child-option"),
                        a.classList.add(m))
                });
                a.setAttribute("data-value", c.value || c.getAttribute("value") || "");
                k = {
                    ...e.optionStyle
                };
                if ((v = a.classList.contains("child-option")) && k.padding) {
                    const m = k.padding.split(" ");
                    2 === m.length ? (k.paddingTop = m[0], k.paddingBottom = m[0], k.paddingRight = m[1], delete k.padding) : 4 === m.length && (k.paddingTop = m[0], k.paddingRight = m[1], k.paddingBottom = m[2], delete k.padding)
                }
                ka(a, {
                    ...k,
                    position: "relative",
                    paddingRight: c.getAttribute("tag") ? "100px" : "40px"
                });
                a.classList.contains("group-option") && h &&
                    ua[h] && a.style.setProperty("padding-left", ua[h], "important");
                v && !a.classList.contains("group-option") && d && (k = d.split(" ")[0], d = f, ua[k] && (k = parseFloat(ua[k]), isNaN(k) || (d = k + 10 + "px")), a.style.setProperty("padding-left", d, "important"));
                a.classList.contains("group-option") && a._updateGroupPadding && a._updateGroupPadding();
                a.style.whiteSpace = "nowrap";
                a.style.overflow = "hidden";
                a.style.textOverflow = "ellipsis";
                b === T.options.length - 1 && (a.style.borderBottom = "none");
                !e.dot || e.pointer?.startsWith("question_") ||
                    c.hasAttribute("group") || c.getAttribute("data-is-group") || a.querySelector(".custom-dot") || (b = document.createElement("div"), b.className = "custom-dot", Object.assign(b.style, e.dotStyle), (c.selected || c.hasAttribute("selected")) && Object.assign(b.style, e.dotSelectedStyle), e.pointer && (b.style.right = "40px"), a.appendChild(b));
                c.hasAttribute("img") && (b = c.getAttribute("img"), Object.assign(a.style, {
                    backgroundImage: `url(${b})`,
                    backgroundRepeat: "no-repeat"
                }), b = new ResizeObserver(m => {
                    const L = m[0].contentRect.height;
                    if (0 < L) {
                        var J = $(m[0].target);
                        J.hasClass("child-option") ? (J = 20 * (parseInt(J.attr("data-level")) || 1), m[0].target.style.setProperty("--image-size", L + 8 + "px"), Object.assign(m[0].target.style, {
                            backgroundSize: `${L}px`,
                            backgroundPosition: `${J}px center`,
                            paddingLeft: `${J+1.5*L}px`
                        })) : Object.assign(m[0].target.style, {
                            backgroundSize: `${L}px`,
                            backgroundPosition: "15px center",
                            paddingLeft: `${2*L}px`
                        })
                    }
                }), b.observe(a), window._resizeObservers || (window._resizeObservers = new WeakMap), window._resizeObservers.set(a, b));
                if (b = c.getAttribute("tag")) d = e.tagStyle || {}, k = e.tagMap || {}, v = {
                    position: "absolute",
                    right: e.pointer ? "40px" : "30px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: d.color || e.tagColor || "#666",
                    fontSize: d.fontSize || "12px",
                    margin: e.tagMargin
                }, d.padding && (v.padding = d.padding), d.borderRadius && (v.borderRadius = d.borderRadius), d.fontWeight && (v.fontWeight = d.fontWeight), k[b] && (v.backgroundColor = k[b]), d = $("<span>").css(v), e.allowHTML ? d.html(b) : d.text(b), a.appendChild(d[0]);
                "checkbox" !== e.pointer && !e.pointer?.startsWith("checkbox_") ||
                    c.hasAttribute("group") || "true" === c.getAttribute("data-is-group") || a.classList.contains("group-option") || (a.style.position = "relative", a.style.paddingRight = "40px", b = c.selected || c.hasAttribute("selected"), a.setAttribute("data-checked", b ? "true" : "false"), d = document.createElement("div"), d.className = "custom-checkbox option-checkbox", Object.assign(d.style, {
                        ...da(),
                        border: b ? `2px solid ${e.checkboxColor}` : `2px solid ${e.buttonColor}`,
                        borderRadius: "3px",
                        backgroundColor: b ? e.checkboxColor : "#fff",
                        zIndex: "2",
                        display: "block",
                        width: e.checkboxSize,
                        height: e.checkboxSize
                    }), b && (d.innerHTML = V(e.checkboxSize)), a.appendChild(d));
                "radio" !== e.pointer || h || (a.style.position = "relative", a.style.paddingRight = "40px", b = document.createElement("div"), b.className = "custom-radio", Object.assign(b.style, {
                    ...da(),
                    border: `2px solid ${e.buttonColor}`,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    zIndex: "2",
                    width: e.radioSize,
                    height: e.radioSize
                }), (c.selected || c.hasAttribute("selected")) && (c.value || c.getAttribute("value")) && (Object.assign(b.style, {
                        border: `2px solid ${e.radioColor}`
                    }),
                    b.innerHTML = O(e.radioColor, e)), (c.disabled || c.hasAttribute("disabled")) && Object.assign(b.style, {
                    border: `2px solid ${e.buttonColor}`,
                    backgroundColor: "#f5f5f5",
                    cursor: "not-allowed"
                }), a.appendChild(b));
                e.pointer && e.pointer.startsWith("question_") && !h && (b = document.createElement("div"), b.className = "custom-question option-question", Object.assign(b.style, e.questionStyle), b.innerHTML = "?", a.appendChild(b));
                e.allowHTML ? (b = c.innerHTML, b = b.replace(/\x3c!--([\s\S]*?)--\x3e/g, (m, L) => L.trim()), a.insertAdjacentHTML("afterbegin",
                    b)) : a.insertAdjacentText("afterbegin", c.textContent);
                !c.disabled && !c.hasAttribute("disabled") || h || (a.classList.add("disabled"), ka(a, e.disabledStyle));
                !c.selected && !c.hasAttribute("selected") || h || (a.classList.add("selected"), ka(a, e.selectedOptionStyle));
                sa.appendChild(a)
            });
            A.appendChild(aa);
            U.appendChild(A);
            U.appendChild(ra);
            e.scrollColor && (U.id || (U.id = "select-scroll-" + Math.random().toString(36).substr(2, 9)), ja($(U), e));
            A = T.parentNode;
            G = T.nextSibling;
            T.style.display = "none";
            U.insertBefore(T, U.firstChild);
            G ? A.insertBefore(U, G) : A.appendChild(U);
            T._needsExpandGroup && (setTimeout(() => {
                if ($(U).find(`[class*="-option"][data-value="${za.value}"]`).length) {
                    const c = za.className?.split(" ") || [],
                        b = new Set;

                    function a(h) {
                        if (h && !b.has(h)) {
                            b.add(h);
                            var d = $(U).find(`[data-group="${h}"]`);
                            d.length && (d.addClass("expanded"), d.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), $(U).find(`.${h}`).show(), (d.attr("class")?.split(" ") || []).forEach(k => {
                                "group-option" !== k && "expanded" !== k && a(k)
                            }))
                        }
                    }
                    c.forEach(h => a(h))
                }
            }, 0), delete T._needsExpandGroup);
            $(U).data("isTriggeredOnce", !1);
            !0 === e.onclick && setTimeout(() => {
                const c = $(U).find(`.${e.triggerClass}`);
                $(U).data("isInitialOpen", !0);
                c.trigger("click")
            }, 0);
            U.setAttribute("data-duration", x);
            U.setAttribute("data-slide-toggle", e.slideToggle)
        }
    });
    if (!window._gong_tea_yun_2) {
        window._gong_tea_yun_2 = !0;
        let g = !1,
            C = !1,
            A = !1,
            t = !1,
            G = null,
            e = !1,
            T = !1;
        $(document).on("mousedown", '[class*="-wrapper"], [class*="-trigger"], [class*="-options"], [class*="-option"]',
            function(f) {
                f.stopPropagation();
                A = C = !0;
                U = !1;
                e = !0;
                window._isMouseDown_gong = !0;
                f = $(this).closest('[class*="-wrapper"]');
                window._gong_tea_yun_3 = f
            });
        $(document).on("mouseup", function(f) {
            window._isMouseDown_gong = !1;
            if (C) {
                var c = A,
                    b = 0 < $(f.target).closest('[class*="-wrapper"]').length;
                A = C = !1;
                c && T && b && (f.stopPropagation(), f.preventDefault(), $(f.target).closest('[class*="-wrapper"]'));
                window._gong_tea_yun_3 = null;
                T = !1;
                setTimeout(() => {
                    e = !1
                }, 300)
            }
        });
        $(document).on("keydown", '[class*="-wrapper"], [class*="-trigger"]',
            function(f) {
                var c = $(this).closest('[class*="-wrapper"]');
                if (c.length) {
                    var b = c.data("settings");
                    if (b) {
                        var a = c.find(`.${b.triggerClass}`),
                            h = c.find(`.${b.optionClass}:not(.disabled)`),
                            d = c.hasClass(b.openClass),
                            k = c.find(`.${b.optionClass}.${b.highlightedClass}`);
                        switch (f.keyCode) {
                            case 13:
                                return f.preventDefault(), f.stopPropagation(), d ? k.length ? k.hasClass("group-option") ? k.trigger("click") : (f = new MouseEvent("click", {
                                        bubbles: !0,
                                        cancelable: !0,
                                        view: window
                                    }), c = b.offclick, b.offclick = !1, k[0].dispatchEvent(f),
                                    b.offclick = c) : a.trigger("click") : (a.trigger("click"), k.length || h.first().addClass(b.highlightedClass).css("background-color", b.activeBackground)), !1;
                            case 40:
                            case 38:
                                f.preventDefault();
                                f.stopPropagation();
                                f = 38 === f.keyCode;
                                if (!d) return a.trigger("click"), k.length || h.first().addClass(b.highlightedClass).css("background-color", b.activeBackground), !1;
                                d = c.find(`.${b.optionClass}:not(.disabled)`).filter(function() {
                                    return "none" !== $(this).css("display")
                                });
                                a = c.find(`.${b.optionsClass} > div`).first();
                                h = a.height();
                                a.scrollTop();
                                k.is(":last-child");
                                k.position();
                                k.outerHeight();
                                c.find(`.${b.optionClass}`).removeClass(b.highlightedClass);
                                c.find(`.${b.optionClass}`).each(function() {
                                    const v = $(this);
                                    if (v.hasClass("selected") && b.selectedBg) {
                                        var m = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg;
                                        v.attr("style", (v.attr("style") || "") + `; background-color: ${m} !important;`);
                                        v.css("opacity", "1")
                                    } else m = (v.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), v.attr("style", m)
                                });
                                k.length ? (c = d.index(k),
                                    k = f ? d.eq(Math.max(0, c - 1)) : c < d.length - 1 ? d.eq(c + 1) : k) : k = d.first();
                                k.length && (k.hasClass("selected") && b.selectedBg ? k.css("opacity", "0.7") : k.addClass(b.highlightedClass).css("background-color", b.activeBackground), c = k.position().top, d = c + k.outerHeight(), !f && (d >= h || k.is(":last-child")) ? a.scrollTop(d + 1 - h) : f && (0 >= c || k.is(":first-child")) && a.scrollTop(c));
                                return !1;
                            case 27:
                                return f.preventDefault(), f.stopPropagation(), d && a.trigger("click"), !1;
                            case 32:
                                return f.preventDefault(), f.stopPropagation(), d || a.trigger("click"),
                                    !1
                        }
                    }
                }
            });
        $(document).on("mouseenter", '[class*="-option"]', function(f) {
            f.stopPropagation();
            f = $(this);
            var c = f.closest('[class*="-wrapper"]');
            const b = c.data("settings");
            b && !f.hasClass("disabled") && (f.hasClass("selected") && b.selectedBg ? f.css("opacity", "0.7") : (c.find('[class*="-option"]:not(.disabled)').not(f).each(function() {
                $(this).removeClass(b.highlightedClass);
                if ($(this).hasClass("selected")) b.selectedBg && (a = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, $(this).attr("style", ($(this).attr("style") ||
                    "") + `; background-color: ${a} !important;`));
                else {
                    var a = ($(this).attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                    $(this).attr("style", a)
                }
            }), f.addClass(b.highlightedClass), (f.hasClass("selected") || ("checkbox" === b.pointer || b.pointer?.startsWith("checkbox_")) && "true" === f.attr("data-checked")) && b.selectedBg ? (c = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, f.attr("style", (f.attr("style") || "") + `; background-color: ${c} !important;`)) : f.css("background-color", b.activeBackground)))
        });
        $(document).on("mouseleave", '[class*="-option"]', function() {
            const f = $(this),
                c = f.closest('[class*="-wrapper"]').data("settings");
            if (c && !f.hasClass("disabled")) {
                var b = f.hasClass("selected") || ("checkbox" === c.pointer || c.pointer?.startsWith("checkbox_")) && "true" === f.attr("data-checked");
                b && c.selectedBg ? f.css("opacity", "1") : (f.removeClass(c.highlightedClass), b && c.selectedBg ? (b = !0 === c.selectedBg ? rgbToRgba(c.activeBackground, .5) : c.selectedBg, f.attr("style", (f.attr("style") || "") + `; background-color: ${b} !important;`)) :
                    (b = (f.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), f.attr("style", b), setTimeout(() => {
                        f.hasClass(c.highlightedClass) || f.css("background-color", c.optionsStyle.background || "")
                    }, 0)))
            }
        });
        let U = !1;
        $(document).on("mousemove", '[class*="-wrapper"]', function(f) {
            C && A && (U = !0)
        });
        let aa = null;
        $(document).on("touchstart", '[class*="-option"]', function(f) {
            aa && clearTimeout(aa);
            const c = $(this);
            t = !0;
            if (c.hasClass("disabled")) G = null;
            else {
                var b = c.closest('[class*="-wrapper"]'),
                    a = b.data("settings");
                a && (G = this,
                    b.find('[class*="-option"]').removeClass(a.highlightedClass), b.find('[class*="-option"]').each(function() {
                        const h = $(this);
                        if (h.hasClass("selected") && a.selectedBg) {
                            var d = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                            h.attr("style", (h.attr("style") || "") + `; background-color: ${d} !important;`)
                        } else d = (h.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), h.attr("style", d)
                    }), aa = setTimeout(() => {
                        if (G === this)
                            if (c.hasClass("selected") && a.selectedBg) c.css("opacity", "0.7");
                            else if (c.addClass(a.highlightedClass),
                            c.hasClass("selected") && a.selectedBg) {
                            const h = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                            c.attr("style", (c.attr("style") || "") + `; background-color: ${h} !important;`)
                        } else c.css("background-color", a.activeBackground)
                    }, 0), f.stopPropagation())
            }
        });
        $(document).on("touchend", function() {
            if (t) {
                if (G) {
                    const f = $(G).closest('[class*="-wrapper"]'),
                        c = f.data("settings");
                    c && (f.find('[class*="-option"]').removeClass(c.highlightedClass), f.find('[class*="-option"]').each(function() {
                        const b = $(this);
                        if (b.hasClass("selected") && c.selectedBg) {
                            var a = !0 === c.selectedBg ? rgbToRgba(c.activeBackground, .5) : c.selectedBg;
                            b.attr("style", (b.attr("style") || "") + `; background-color: ${a} !important;`);
                            b.css("opacity", "1")
                        } else a = (b.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), b.attr("style", a)
                    }))
                }
                t = !1;
                G = null
            }
        });
        $(document).on("touchend", '[class*="-option"]:not(.disabled)', function(f) {
            this === G && $(this).trigger("click");
            f.stopPropagation()
        });
        $(document).on("click", "[data-group]", function(f) {
            function c(r) {
                function F(w) {
                    a.find("." +
                        w).each(function() {
                        var B = $(this);
                        u.add(this);
                        if (B.attr("group") || B.data("group")) B = B.attr("group") || B.data("group"), F(B)
                    })
                }
                const u = new Set;
                r = r.data("group");
                F(r);
                return u
            }
            f.preventDefault();
            f.stopPropagation();
            e = window._isGroupClick = !0;
            const b = $(this).closest('[class*="-wrapper"]'),
                a = b.find('[class*="-options"]'),
                h = a.find("div").first(),
                d = b.data("settings"),
                k = parseInt(b.attr("data-duration")),
                v = p() ? a : h,
                m = p() ? v.scrollTop() : null,
                L = () => {
                    window._heightCache || (window._heightCache = new Map);
                    let r = 0;
                    const F = [];
                    a.find("li, option").each(function() {
                        "none" !== $(this).css("display") && F.push(this)
                    });
                    F.forEach(u => {
                        const w = $(u);
                        var B = u.id || w.data("height-id");
                        u = window._heightCache.get(B);
                        u || (u = w.outerHeight(!0), B ? window._heightCache.set(B, u) : (B = "height-" + Math.random().toString(36).substr(2, 9), w.data("height-id", B), window._heightCache.set(B, u)));
                        r += u
                    });
                    requestAnimationFrame(() => {
                        const u = Math.min(r, d.Mheight),
                            w = d.optionsStyle.background || "#fff";
                        h.css({
                            height: u,
                            overflowY: "auto",
                            WebkitOverflowScrolling: "touch",
                            backgroundColor: w
                        });
                        a.css({
                            height: u,
                            backgroundColor: w
                        })
                    });
                    1E3 < window._heightCache.size && window._heightCache.clear()
                },
                J = $(this).data("group");
            f = $(this).hasClass("expanded");
            $(this).toggleClass("expanded");
            var E = $(this).find(".custom-group-arrow");
            if (f) {
                E.css("transform", "translateY(-50%) rotate(0deg)");
                f = c($(this));
                const r = {};
                f.forEach(w => {
                    w = $(w);
                    const B = w.attr("group") || w.data("group");
                    B && B !== J && (r[B] = w.hasClass("expanded"))
                });
                $(this).data("childStates", r);
                const F = new Set(f);
                f.forEach(w => {
                    w = $(w);
                    const B = w.attr("group") || w.data("group");
                    B && B !== J && a.find("." + B).filter(function() {
                        const X = $(this);
                        return (X.attr("group") || X.data("group")) !== B
                    }).each(function() {
                        F.add(this)
                    })
                });
                const u = Array.from(F);
                u.forEach(w => {
                    w = $(w);
                    if (w.attr("group") || w.data("group")) w.removeClass("expanded"), w.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)");
                    w.css("opacity", "0.1")
                });
                0 < u.length && $(u).slideUp(k, {
                    useQueue: !1
                }, function() {
                    u.forEach(w => {
                        $(w).css({
                            opacity: "1",
                            display: "none"
                        })
                    });
                    L()
                })
            } else {
                E.css("transform",
                    "translateY(-50%) rotate(180deg)");
                E = a.find("." + J);
                f = !$(this).closest("li").hasClass(J);
                const r = $(this).data("childStates"),
                    F = [];
                E = E.filter(function() {
                    const u = $(this),
                        w = u.attr("group") || u.data("group");
                    return w && w !== J ? (F.push({
                        $element: u,
                        groupName: w,
                        wasExpanded: r && r[w] || !1
                    }), !1) : !0
                });
                F.forEach(function(u) {
                    u = u.$element;
                    u.show();
                    u.css("opacity", "1");
                    u[0] && u[0].style && u[0].style.setProperty("opacity", "1", "important")
                });
                E.show();
                E.hide();
                0 < E.length && E.css("opacity", "0.1").slideDown(k, {
                    useQueue: !1
                }, function() {
                    $(this).css("opacity",
                        "1");
                    this.style && this.style.setProperty("opacity", "1", "important");
                    L()
                });
                f && !p() ? (f = 0 < E.length ? E.first().outerHeight() : 0, E = v[0] || v, v.animate && "function" === typeof v.animate ? v.animate({
                    scrollTop: f
                }, k) : E && "function" === typeof E.scrollTo ? E.scrollTo({
                    top: f,
                    behavior: "smooth"
                }) : E && (E.scrollTop = f)) : f && p() && null !== m && setTimeout(() => {
                    v.scrollTop(m)
                }, k + 50);
                F.forEach(function(u) {
                    const w = u.$element,
                        B = u.groupName;
                    u = u.wasExpanded;
                    w.css("opacity", "1");
                    w[0] && w[0].style && w[0].style.setProperty("opacity", "1", "important");
                    u ? (w.addClass("expanded").find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), a.find("." + B).filter(function() {
                        const X = $(this);
                        return (X.attr("group") || X.data("group")) !== B
                    }).css("opacity", "0.1").slideDown(k, {
                        useQueue: !1
                    }, function() {
                        $(this).css("opacity", "1");
                        this.style && this.style.setProperty("opacity", "1", "important");
                        L()
                    })) : (w.removeClass("expanded").find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)"), a.find("." + B).filter(function() {
                        const X = $(this);
                        return (X.attr("group") || X.data("group")) !== B
                    }).hide())
                })
            }
            setTimeout(() => {
                e = window._isGroupClick = !1;
                b.data("groupClicked", !1)
            }, 300);
            return !1
        });

        function oa(f, c, b, a) {
            const h = b.pointer.split("_")[1],
                d = h + "_return";
            if ("function" === typeof window[h]) {
                f[0].setAttribute("data-aun", "true");
                a = f.find("select, ul").first();
                c = c.index();
                var k = a.find("option").eq(c);
                const v = k.val(),
                    m = y(k.html(), 1),
                    L = y(k.html());
                k = k.attr("tag");
                a = q(n(a[0], c).text);
                window[h]({
                    value: v,
                    text: m,
                    html: L,
                    tag: k,
                    group: a,
                    index: c
                });
                window[h + "_close"] =
                    function() {
                        const J = $('[data-state="opened"][data-aun="true"]').filter(function() {
                            const B = $(this).data("settings");
                            return B && B.pointer === `question_${h}`
                        });
                        if (!J.length) return !1;
                        const E = J.data("settings"),
                            r = J.find(`.${E.optionsClass}`),
                            F = parseInt(J.attr("data-duration")),
                            u = p(),
                            w = $(".select-overlay");
                        w.css("background-color", "rgba(0, 0, 0, 0)");
                        setTimeout(() => {
                            w.hide()
                        }, F);
                        J[0].removeAttribute("data-aun");
                        J.removeClass(E.openClass);
                        J.attr("data-state", "closed");
                        u && !E.slideToggle ? M(r, F, w, E) : D(r, F, E);
                        return !0
                    };
                window[d] = function(J, E, r) {
                    f.data("forcedClose", !0);
                    const F = f.find(`.${b.triggerClass}`),
                        u = f.find(`.${b.optionsClass}`),
                        w = parseInt(f.attr("data-duration")),
                        B = p(),
                        X = $(".select-overlay");
                    X.css("background-color", "rgba(0, 0, 0, 0)");
                    setTimeout(() => {
                        X.hide()
                    }, w);
                    var K = "";
                    let Q = null;
                    "function" === typeof E ? Q = E : (K = E, Q = r);
                    E = J.split(": ")[1];
                    E = f.find("select, ul").first().find(`option[value="${E}"]`);
                    K = K || E.attr("tag");
                    if (b.allowHTML)
                        if (!0 === b.tag && K) {
                            E = b.tagStyle || {};
                            r = b.tagMap || {};
                            const pa = {
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: E.color || b.tagColor || "#666",
                                fontSize: E.fontSize || "12px",
                                right: "radio" === b.pointer || b.pointer.includes("question_") ? "40px" : "30px",
                                margin: b.tagMargin
                            };
                            E.padding && (pa.padding = E.padding);
                            E.borderRadius && (pa.borderRadius = E.borderRadius);
                            E.fontWeight && (pa.fontWeight = E.fontWeight);
                            r[K] && (pa.backgroundColor = r[K]);
                            K = $("<span>").css(pa).html(K);
                            F.html(J).append(K)
                        } else F.html(J);
                    else F.text(J);
                    f.attr("data-aun", "true");
                    J = $("<div>").addClass("custom-question trigger-question").css({
                        ...b.questionStyle,
                        border: `2px solid ${b.questionColor}`,
                        backgroundColor: b.questionColor,
                        width: b.questionSize,
                        height: b.questionSize
                    }).html(`<span style="color: white; font-size: calc(${b.questionSize} * 0.6);">\u2713</span>`);
                    F.append(J);
                    f.removeClass(b.openClass);
                    f.attr("data-state", "closed");
                    B && !b.slideToggle ? M(u, w, X, b) : u.slideUp(w, {
                        easing: b.easing
                    });
                    "function" === typeof Q && Q();
                    delete window[d];
                    return !0
                }
            }
            return !1
        }

        function ha(f, c, b, a) {
            if (!c.hasClass(b.optionClass) || c.data("processing")) return !1;
            c.data("processing",
                !0);
            try {
                a.stopImmediatePropagation();
                a.preventDefault();
                let h = c.find(".custom-checkbox");
                const d = c[0].getBoundingClientRect(),
                    k = a.clientX || a.originalEvent?.touches?.[0]?.clientX,
                    v = a.clientY || a.originalEvent?.touches?.[0]?.clientY,
                    m = c.hasClass("group-option") || c.attr("data-group") || c.data("group");
                if (!(h.length && h[0] || m)) {
                    c.css({
                        position: "relative",
                        paddingRight: "40px"
                    });
                    const K = document.createElement("div");
                    K.className = "custom-checkbox option-checkbox";
                    const Q = "true" === c.attr("data-checked");
                    Object.assign(K.style, {
                        ...da(),
                        border: Q ? `2px solid ${b.checkboxColor}` : `2px solid ${b.buttonColor}`,
                        borderRadius: "3px",
                        backgroundColor: Q ? b.checkboxColor : "#fff",
                        zIndex: "2",
                        display: "block",
                        width: b.checkboxSize,
                        height: b.checkboxSize
                    });
                    Q && (K.innerHTML = V(b.checkboxSize));
                    c.append(K);
                    h = c.find(".custom-checkbox")
                }
                if (!(k >= d.left - 1 && k <= d.right + 1 && v >= d.top - 1 && v <= d.bottom + 1)) return c.data("processing", !1), !1;
                const L = "true" === c.attr("data-checked"),
                    J = f.find('[data-checked="true"]').get(),
                    E = (a = !L) ? J.length + 1 : J.length - 1,
                    r = f.find("select").first(),
                    F = c.index(),
                    u = r.find("option").eq(F),
                    w = {
                        value: u.val(),
                        text: y(u.html(), 1),
                        html: y(u.html()),
                        tag: u.attr("tag"),
                        checked: a,
                        index: F,
                        count: E,
                        group: q(n(r[0], F).text)
                    };
                if (b.pointer?.startsWith("checkbox_")) {
                    const K = b.pointer.split("checkbox_")[1];
                    if ("function" === typeof window[K] && !1 === window[K](w)) return c.data("processing", !1), !1
                }
                c.attr("data-checked", a.toString());
                f.attr("data-check-count", E);

                function B(K, Q, pa) {
                    return {
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: `calc(${K} + ${4}px)`,
                        height: `calc(${K} + ${4}px)`,
                        borderRadius: "3px",
                        border: `${2}px solid ${pa?Q:b.buttonColor}`,
                        backgroundColor: pa ? Q : "#fff",
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
                    const K = document.createElement("div");
                    K.className = "custom-checkbox option-checkbox";
                    Object.assign(K.style, {
                        ...da(),
                        borderRadius: "3px",
                        zIndex: "2",
                        display: "block",
                        width: b.checkboxSize,
                        height: b.checkboxSize
                    });
                    c.append(K);
                    h = c.find(".custom-checkbox")
                }
                const X = f.find(`.${b.triggerClass}`).find(".custom-checkbox");
                a ? (h.css(B(b.checkboxSize, b.checkboxColor, !0)).html(V(b.checkboxSize)), 0 < E && X.css(B(b.checkboxSize, b.checkboxColor, !0)).html(H(E, b.checkboxSize))) : (h.css(B(b.checkboxSize, b.buttonColor, !1)).empty(), 0 === E ? X.css(B(b.checkboxSize, b.buttonColor, !1)).empty() : X.css(B(b.checkboxSize, b.checkboxColor, !0)).html(H(E, b.checkboxSize)));
                if (b.selectedBg) {
                    const K = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) :
                        b.selectedBg;
                    $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${K} !important; }</style>`);
                    f.find(`.${b.optionClass}`).each(function() {
                        const Q = $(this);
                        "true" === Q.attr("data-checked") ? (Q.addClass("selected").addClass("selected-bg-active"), Q[0].style.setProperty("background-color", K, "important")) : (Q.removeClass("selected").removeClass("selected-bg-active"), Q[0].style.removeProperty("background-color"));
                        Q.css("font-weight",
                            "normal")
                    })
                } else a ? (c.addClass("selected"), c.css("font-weight", "bold")) : (c.removeClass("selected"), c.css("font-weight", "normal"));
                if (b.closeBox) {
                    const K = $(".select-overlay");
                    K.css("pointer-events", "none").hide();
                    setTimeout(() => {
                        K.css("pointer-events", "");
                        c.data("processing", !1)
                    }, 50)
                } else {
                    const K = parseInt(f.attr("data-duration")),
                        Q = f.find(`.${b.optionsClass}`),
                        pa = p(),
                        ya = $(".select-overlay");
                    pa && !b.slideToggle ? z(Q, K, ya, f, b) : (f.removeClass(b.openClass), ya.css("pointer-events", "none").hide(), K ? Q.slideUp(K, {
                        easing: b.easing,
                        complete: () => {
                            setTimeout(() => {
                                ya.css("pointer-events", "");
                                c.data("processing", !1)
                            }, 50)
                        }
                    }) : (Q.hide(), ya.css("pointer-events", ""), setTimeout(() => {
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

        function za(f, c, b) {
            const a =
                f.find(`.${b.triggerClass}`),
                h = parseInt(f.attr("data-selected-index"));
            let d = a.find(".custom-radio");
            d.length ? d = d[0] : (d = document.createElement("div"), d.className = "custom-radio trigger-radio");
            Object.assign(d.style, {
                ...da(),
                border: void 0 !== c ? `2px solid ${b.radioColor}` : `2px solid ${b.buttonColor}`,
                borderRadius: "50%",
                backgroundColor: "#fff",
                width: b.radioSize,
                height: b.radioSize
            });
            d.innerHTML = void 0 !== c ? O(b.radioColor, b) : "";
            f.find(".custom-radio").not(".trigger-radio").each(function() {
                const v = $(this).closest('[class*="-option"]');
                var m = v.attr("data-value");
                const L = v.index();
                m = m === c && L === h;
                Object.assign(this.style, {
                    border: m ? `2px solid ${b.radioColor}` : `2px solid ${b.buttonColor}`,
                    backgroundColor: "#fff"
                });
                m ? (this.innerHTML = O(b.radioColor, b), v.addClass("selected"), b.selectedBg || v.css("font-weight", "bold")) : (this.innerHTML = "", v.removeClass("selected").css("font-weight", "normal"))
            });
            a.find(".custom-radio").remove();
            a.append(d);
            var k = f.find("select").first();
            f = k.find("option").eq(h);
            f.length && (k = n(k[0], h), f.html().replace(/\x3c!--(.*?)--\x3e/g,
                "$1").trim(), a.html(k.text + d.outerHTML));
            domqueryFocus()
        }

        function ba(f, c) {
            f.attr("data-selected-value", "");
            f.attr("data-selected-index", "-1");
            const b = f.find(`.${c.triggerClass}`),
                a = f.find("select, ul").first();
            var h = a.find("option").first();
            h = c.allowHTML ? h.html() : h.text();
            b.find(".custom-radio").remove();
            const d = document.createElement("div");
            d.className = "custom-radio trigger-radio";
            Object.assign(d.style, {
                ...da(),
                border: `2px solid ${c.buttonColor}`,
                borderRadius: "50%",
                backgroundColor: "#fff",
                width: c.radioSize,
                height: c.radioSize
            });
            c.allowHTML ? b.html(h + d.outerHTML) : (b.text(h), b.append(d));
            f.find(".custom-radio").not(".trigger-radio").each(function() {
                const k = $(this).closest(`.${c.optionClass}`);
                $(this).css({
                    border: `2px solid ${c.buttonColor}`,
                    backgroundColor: "#fff"
                }).empty();
                k.removeClass("selected").css("font-weight", "normal");
                c.selectedBg && k.removeClass("selected-bg-active").css("background-color", "")
            });
            a.find("option").prop("selected", !1);
            la(f)
        }

        function na(f, c) {
            f.attr("data-check-count", "0");
            f.find(`.${c.triggerClass}`).find(".custom-checkbox").css({
                border: `2px solid ${c.buttonColor}`,
                backgroundColor: "#fff"
            }).empty();
            f.find(".custom-checkbox").not(".trigger-checkbox").each(function() {
                const b = $(this).closest(`.${c.optionClass}`);
                b.attr("data-checked", "false");
                $(this).css({
                    border: `2px solid ${c.buttonColor}`,
                    backgroundColor: "#fff"
                }).empty();
                c.selectedBg && b.removeClass("selected-bg-active").css("background-color", "")
            });
            la(f)
        }

        function la(f) {
            const c = f.find('[class*="-options"]');
            parseInt(f.attr("data-duration"));
            c.find("[data-group]").each(function() {
                const b = $(this),
                    a = b.find(".custom-group-arrow"),
                    h = b.data("group");
                b.hasClass("expanded") && (b.removeClass("expanded"), a.css("transform", "translateY(-50%) rotate(0deg)"));
                c.find("." + h).each(function() {
                    const d = $(this);
                    if (d.attr("group") || d.data("group")) d.removeClass("expanded"), d.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)");
                    d.hide()
                })
            })
        }

        function ra(f, c) {
            const b = ["custom-checkbox", "custom-radio", "custom-question", "custom-dot"];
            Array.from(f.childNodes).forEach(h => {
                (h.nodeType === Node.TEXT_NODE || h.nodeType === Node.ELEMENT_NODE &&
                    !b.some(d => h.classList.contains(d))) && h.remove()
            });
            c = document.createTextNode(c.replace(/<[^>]*>/g, ""));
            const a = Array.from(f.childNodes).find(h => h.nodeType === Node.ELEMENT_NODE && b.some(d => h.classList.contains(d)));
            a ? f.insertBefore(c, a) : f.appendChild(c)
        }

        function sa(f, c) {
            const b = f.find(`.${c.triggerClass}`),
                a = f.find("select, ul").first().find("li, option").first().html(),
                h = "checkbox" === c.pointer || c.pointer?.startsWith("checkbox_");
            b.css({
                backgroundImage: "none",
                backgroundSize: "initial",
                backgroundPosition: "initial",
                backgroundRepeat: "no-repeat",
                ...(h ? {} : {
                    paddingLeft: c.defaultPadding || "10px"
                })
            });
            if (window._triggerResizeObservers) {
                const d = window._triggerResizeObservers.get(b[0]);
                d && (d.disconnect(), window._triggerResizeObservers.delete(b[0]))
            }
            h ? ra(b[0], a) : b.html(a);
            c.selectedBg && f.find(`.${c.optionClass}`).each(function() {
                $(this).removeClass("selected-bg-active").css("background-color", "")
            });
            la(f)
        }

        function ua(f, c, b) {
            const a = f.find("select, ul").first();
            c = c.find(`.${b.optionClass}`).first();
            if ("checkbox" === b.pointer ||
                b.pointer?.startsWith("checkbox_")) c.hide();
            else if ("radio" === b.pointer) - 1 < parseInt(f.attr("data-selected-index") || "-1") ? c.show() : c.hide();
            else {
                b = f.attr("data-selected-value");
                const h = parseInt(f.attr("data-selected-index"));
                0 < a.find("option[group]").length ? -1 === h && void 0 === b || 0 === h && (!b || "" === b) ? (c.hide(), la(f)) : c.show() : (-1 !== h || b && "" !== b) && (0 !== h || b && "" !== b) ? c.show() : c.hide()
            }
        }
        $(document).on("click", '[class*="-option"]', function(f) {
            f.stopPropagation();
            wa = 3;
            var c = $(this);
            const b = c.closest('[class*="-wrapper"]'),
                a = b.data("settings");
            if (a && c.hasClass(a.optionClass)) {
                if (b.data("optionClickProcessing")) return !1;
                b.data("optionClickProcessing", !0);
                setTimeout(() => {
                    b.removeData("optionClickProcessing")
                }, 500);
                var h = b.find("select, ul").first(),
                    d = c.attr("value") || c.attr("data-value"),
                    k = c.index();
                c.hasClass("selected") && "checkbox" !== a.pointer && !a.pointer?.startsWith("checkbox_") && (c.removeClass("selected"), c.removeClass(a.highlightedClass), c.removeClass("selected-bg-active"), c.css("font-weight", "normal"), a.selectedBg &&
                    c[0].style.removeProperty("background-color"), c[0].classList.remove("selected"), c[0].classList.remove(a.highlightedClass), c[0].classList.remove("selected-bg-active"));
                b.attr("data-current-index", k);
                if ((c.attr("group") || c.attr("data-group")) && !c.attr("value")) return f.preventDefault(), b.data("groupClicked", !0), !1;
                b.data("groupClicked", !1);
                "undefined" !== typeof U && U && (U = !1);
                U = !1;
                if ("undefined" !== typeof g && g) f.preventDefault(), f.stopPropagation(), b.removeData("optionClickProcessing");
                else {
                    if (c.hasClass("disabled")) return f.preventDefault(),
                        b.removeData("optionClickProcessing"), !1;
                    if (a.pointer && a.pointer.startsWith("question_") && (f.preventDefault(), f.stopPropagation(), !1 === oa(b, c, a, f))) return b.removeData("optionClickProcessing"), !1;
                    if (0 === c.index() || "" === c.attr("data-value") || !c.attr("data-value")) switch (a.pointer) {
                        case "radio":
                            ba(b, a);
                            break;
                        case "checkbox":
                            na(b, a);
                            break;
                        default:
                            sa(b, a)
                    }
                    0 < h.find("option[group]").length && 0 === k && (!d || "" === d) && la(b);
                    if ("radio" !== a.pointer || 0 !== k && d && "" !== d) {
                        if ("checkbox" === a.pointer || a.pointer?.startsWith("checkbox_")) return f.preventDefault(),
                            f.stopPropagation(), f.stopImmediatePropagation(), d = ha(b, c, a, f), b.removeData("optionClickProcessing"), d;
                        if (0 === k && (!d || "" === d)) {
                            if (b.data("processingReset")) return !1;
                            b.data("processingReset", !0);
                            try {
                                b.attr("data-selected-value", "");
                                b.attr("data-selected-index", "-1");
                                var v = h[0];
                                const B = h.find("li, option").first().html();
                                var m = h.find("option").eq(0);
                                const X = b.find(`.${a.triggerClass}`);
                                if ("checkbox" === a.pointer || a.pointer?.startsWith("checkbox_")) {
                                    const K = a.allowHTML ? B : h.find("li, option").first().text();
                                    ra(X[0], K)
                                } else a.allowHTML ? X.html(B) : X.text(h.find("li, option").first().text());
                                h.find("option, li").prop("selected", !1);
                                B && h.find("option").eq(0).prop("selected", !0);
                                b.find('[class*="-option"]').removeClass("selected").removeClass(a.highlightedClass).css("font-weight", "normal");
                                a.dot && b.find(".custom-dot").each(function() {
                                    Object.assign(this.style, {
                                        ...a.dotStyle,
                                        border: `2px solid ${a.buttonColor}`,
                                        backgroundColor: "#fff"
                                    })
                                });
                                if (v._selectId) {
                                    m.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
                                    k = function(K,
                                        Q = 0) {
                                        return 1 === Q ? K.replace(/\x3c!--(.*?)--\x3e/g, "$1").replace(/<[^>]*>/g, "") : K.replace(/\x3c!--(.*?)--\x3e/g, "$1")
                                    };
                                    d = "";
                                    try {
                                        if ("function" === typeof n) {
                                            const K = n(v, 0);
                                            K && (d = K.text)
                                        }
                                    } catch (K) {
                                        console.warn("Error in findGroupPath:", K)
                                    }
                                    var L = {
                                            value: "",
                                            text: k(m.html(), 1),
                                            html: k(m.html()),
                                            tag: m.attr("tag"),
                                            element: m[0],
                                            select: v,
                                            index: 0,
                                            group: function(K) {
                                                const Q = document.createElement("div");
                                                Q.innerHTML = K;
                                                return Q.textContent || Q.innerText || ""
                                            }(d)
                                        },
                                        J = window._gong_tea_yun_0.get(v._selectId + "_callback");
                                    J && J.call(this, L);
                                    var E = window._gong_tea_yun_0.get(v._selectId + "_onSelect");
                                    E && E.call(this, L);
                                    h.trigger("change")
                                }
                                var r = parseInt(b.attr("data-duration")) || 0,
                                    F = b.find(`.${a.optionsClass}`);
                                p() && !a.slideToggle ? z(F, r, $(".select-overlay"), b, a) : (b.removeClass(a.openClass), b.attr("data-state", "closed"), F.slideUp(r, {
                                    easing: a.easing,
                                    complete: function() {
                                        setTimeout(() => {
                                            b.removeData("processingReset")
                                        }, 100)
                                    }
                                }))
                            } catch (B) {
                                console.error("Reset error:", B), b.removeData("processingReset")
                            }
                            return !1
                        }
                        v = b.find("select").first()[0];
                        b.find('[class*="-option"]').each(function(B) {
                            B = $(this);
                            B.removeClass("selected").removeClass(a.highlightedClass).removeClass("selected-bg-active").css("font-weight", "normal");
                            this.classList.remove("selected");
                            this.classList.remove(a.highlightedClass);
                            this.classList.remove("selected-bg-active");
                            a.selectedBg && this.style.removeProperty("background-color");
                            "radio" === a.pointer && B.find(".custom-radio").removeClass("selected")
                        });
                        c.addClass("selected").addClass(a.highlightedClass);
                        a.selectedBg ? (c.addClass("selected-bg-active"),
                            m = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${m} !important; }</style>`), c[0].style.setProperty("background-color", m, "important"), c.css("font-weight", "normal")) : c.css("font-weight", "bold");
                        "radio" === a.pointer && c.find(".custom-radio").addClass("selected");
                        a.dot && (b.find(".custom-dot").each(function() {
                            Object.assign(this.style, a.dotStyle)
                        }), c.find(".custom-dot").css(a.dotSelectedStyle));
                        (d || "" === d) && b.attr({
                            "data-selected-value": d,
                            "data-selected-index": k
                        });
                        h.find("option").prop("selected", !1);
                        h.find("option").eq(k).prop("selected", !0);
                        h.trigger("change");
                        if (v._selectId) {
                            h = h.find("option").eq(k);
                            c = n(v, k);
                            m = b.find(`.${a.triggerClass}`);
                            m.empty();
                            if (h.attr("img")) r = h.attr("img"), Object.assign(m[0].style, {
                                backgroundImage: `url(${r})`,
                                backgroundRepeat: "no-repeat"
                            }), r = new ResizeObserver(B => {
                                const X = B[0].contentRect.height;
                                0 < X && Object.assign(B[0].target.style, {
                                    backgroundSize: `${X}px`,
                                    backgroundPosition: `${X/
2}px center`,
                                    paddingLeft: `calc(${2*X}px)`
                                })
                            }), r.observe(m[0]), window._triggerResizeObservers || (window._triggerResizeObservers = new WeakMap), (F = window._triggerResizeObservers.get(m[0])) && F.disconnect(), window._triggerResizeObservers.set(m[0], r);
                            else if (Object.assign(m[0].style, {
                                    backgroundImage: "none",
                                    backgroundPosition: "initial",
                                    backgroundSize: "initial",
                                    paddingLeft: a.defaultPadding || "10px"
                                }), window._triggerResizeObservers && (r = window._triggerResizeObservers.get(m[0]))) r.disconnect(), window._triggerResizeObservers.delete(m[0]);
                            a.allowHTML ? m.html(c.text) : m.text(c.text);
                            "radio" === a.pointer && (b.attr({
                                "data-selected-value": d,
                                "data-selected-index": k
                            }), za(b, d, a));
                            r = h.attr("tag") || "";
                            !0 === a.tag && r && (F = document.createElement("span"), L = a.tagStyle || {}, J = a.tagMap || {}, E = {
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: L.color || a.tagColor || "#666",
                                    fontSize: L.fontSize || "12px",
                                    right: "radio" === a.pointer ? "40px" : "30px",
                                    margin: a.tagMargin
                                }, L.padding && (E.padding = L.padding), L.borderRadius && (E.borderRadius = L.borderRadius), L.fontWeight &&
                                (E.fontWeight = L.fontWeight), J[r] && (E.backgroundColor = J[r]), Object.assign(F.style, E), a.allowHTML ? F.innerHTML = r : F.textContent = r, m.append(F));
                            d = {
                                value: d,
                                text: y(h.html(), 1),
                                html: y(h.html()),
                                tag: r,
                                element: h[0],
                                select: v,
                                index: k,
                                group: q(c.text)
                            };
                            (k = window._gong_tea_yun_0.get(v._selectId + "_callback")) && k.call(this, d);
                            (k = window._gong_tea_yun_0.get(v._selectId + "_onSelect")) && k.call(this, d)
                        }
                        b.removeData("optionClickProcessing");
                        d = parseInt(b.attr("data-duration")) || 0;
                        k = b.find(`.${a.optionsClass}`);
                        var u = $(".select-overlay"),
                            w = function() {
                                b.find('[class*="-option"]').removeClass("selected");
                                [50, 100, 200].forEach(B => {
                                    setTimeout(() => {
                                        const X = b.find('[class*="-option"].selected');
                                        0 < X.length && X.removeClass("selected")
                                    }, B)
                                })
                            };
                        p() && !a.slideToggle ? (z(k, d, u, b, a), w()) : (b.removeClass(a.openClass), b.attr("data-state", "closed"), u.css("background-color", "rgba(0, 0, 0, 0)"), a.slideToggle && void 0 !== a.opacity ? k.css("opacity", a.opacity || 0) : k.css("opacity", ""), k.slideUp(d, {
                            easing: a.easing,
                            complete: function() {
                                u.hide();
                                P(b);
                                domqueryFocus();
                                w()
                            }
                        }))
                    } else ba(b, a), d = parseInt(b.attr("data-duration")) || 0, k = b.find(`.${a.optionsClass}`), p() && !a.slideToggle ? z(k, d, $(".select-overlay"), b, a) : (b.removeClass(a.openClass), k.slideUp(d, {
                        easing: a.easing
                    })), b.removeData("optionClickProcessing")
                }
            }
        });
        $(document).on("click", '[class*="-trigger"]', function(f) {
            function c(r) {
                function F() {
                    E || (E = !0, b.data("isInitialOpen") && b.removeData("isInitialOpen"), a.trigger && domquery(a.trigger).trigger("click"), a.triggerOnce && !b.data("isTriggeredOnce") && (domquery(a.triggerOnce).trigger("click"),
                        b.data("isTriggeredOnce", !0)))
                }
                r = p();
                var u = b.find("select").first()[0];
                u._selectId && (u = window._gong_tea_yun_0.get(u._selectId + "_open")) && u.call(this);
                ua(b, d, a);
                const w = parseInt(b.attr("data-selected-index")),
                    B = b.attr("data-selected-value");
                u = B;
                let X = w;
                const K = b.find('[class*="-option"].selected').first();
                K.length && !u && 0 >= X && (u = K.attr("value") || K.attr("data-value"), X = K.index());
                if (0 < X || u) {
                    var Q;
                    u ? Q = d.find(`[value="${u}"], [data-value="${u}"]`) : 0 < X && (Q = d.find(`.${a.optionClass}`).eq(X));
                    if (Q && Q.length &&
                        (Q = (Q.attr("class")?.split(" ") || []).filter(N => N !== a.optionClass && "selected" !== N && N !== a.highlightedClass), 0 < Q.length)) {
                        const N = new Set,
                            S = fa => {
                                if (fa && !N.has(fa)) {
                                    N.add(fa);
                                    var ca = d.find(`[data-group="${fa}"]`);
                                    ca.length && (ca.addClass("expanded"), ca.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), d.find(`.${fa}`).show(), (ca.attr("class")?.split(" ") || []).forEach(ta => {
                                        "group-option" !== ta && "expanded" !== ta && S(ta)
                                    }))
                                }
                            };
                        Q.forEach(fa => S(fa));
                        Q = d.css("display");
                        d.css("display",
                            "block");
                        d.outerHeight(!0);
                        d.css("display", Q)
                    }
                }
                const pa = () => {
                        if (("checkbox" === a.pointer || a.pointer?.startsWith("checkbox_")) && a.selectedBg) {
                            const N = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                            $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${N} !important; }</style>`);
                            b.find('[data-checked="true"]').each(function() {
                                const S = $(this);
                                S.addClass("selected").addClass("selected-bg-active");
                                S[0].style.setProperty("background-color",
                                    N, "important");
                                S.css("font-weight", "normal")
                            });
                            b.find(`.${a.optionClass}`).not('[data-checked="true"]').each(function() {
                                const S = $(this);
                                S.removeClass("selected").removeClass("selected-bg-active");
                                S[0].style.removeProperty("background-color");
                                S.css("font-weight", "normal")
                            })
                        }
                    },
                    ya = () => {
                        var N = B;
                        let S = w;
                        const fa = b.find('[class*="-option"].selected').first();
                        fa.length && !N && 0 >= S && (N = fa.attr("value") || fa.attr("data-value"), S = fa.index(), (N || 0 < S) && b.attr({
                            "data-selected-value": N || "",
                            "data-selected-index": S
                        }));
                        b.find('[class*="-option"]').each(function() {
                            const ca = $(this);
                            ca.removeClass("selected").removeClass(a.highlightedClass).removeClass("selected-bg-active").css("font-weight", "normal");
                            a.selectedBg && ca[0].style.removeProperty("background-color");
                            this.classList.remove("selected");
                            this.classList.remove(a.highlightedClass);
                            this.classList.remove("selected-bg-active")
                        });
                        if (0 < S || N) {
                            let ca;
                            N ? ca = d.find(`[value="${N}"], [data-value="${N}"]`) : 0 < S && (ca = d.find(`.${a.optionClass}`).eq(S));
                            if (ca && ca.length) {
                                N = (ca.attr("class")?.split(" ") || []).filter(ia => ia !== a.optionClass && "selected" !== ia && ia !== a.highlightedClass);
                                const ta = new Set,
                                    Aa = ia => {
                                        if (ia && !ta.has(ia)) {
                                            ta.add(ia);
                                            var va = d.find(`[data-group="${ia}"]`);
                                            va.length && (va.addClass("expanded"), va.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), d.find(`.${ia}`).show(), (va.attr("class")?.split(" ") || []).forEach(ma => {
                                                "group-option" !== ma && "expanded" !== ma && Aa(ma)
                                            }))
                                        }
                                    };
                                N.forEach(ia => Aa(ia));
                                ca.addClass("selected").addClass(a.highlightedClass);
                                ca[0].classList.add("selected");
                                ca[0].classList.add(a.highlightedClass);
                                a.selectedBg ? (N = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, ca.attr("style", (ca.attr("style") || "") + `; background-color: ${N} !important;`)) : ca.css("font-weight", "bold");
                                if (a.selectedBg) {
                                    const ia = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                                    setTimeout(() => {
                                        ca.attr("style", (ca.attr("style") || "") + `; background-color: ${ia} !important;`)
                                    }, 50);
                                    setTimeout(() => {
                                            ca.attr("style", (ca.attr("style") || "") + `; background-color: ${ia} !important;`)
                                        },
                                        200)
                                }
                                void 0 !== a.autoScrollToSelected && a.autoScrollToSelected && (N = parseInt(b.attr("data-duration")) || 300, setTimeout(() => {
                                    d.find("div").first().length && ca.length && ca[0] && "function" === typeof ca[0].scrollIntoView && ca[0].scrollIntoView({
                                        block: "center",
                                        behavior: "smooth"
                                    })
                                }, N))
                            } else pa()
                        }
                        pa()
                    };
                window.requestAnimationFrame ? requestAnimationFrame(() => {
                    requestAnimationFrame(ya)
                }) : setTimeout(ya, 0);
                "radio" === a.pointer && (Q = b.find(".trigger-radio"), Q.length && (Object.assign(Q[0].style, {
                    border: `2px solid ${a.buttonColor}`,
                    backgroundColor: "#fff",
                    width: a.radioSize,
                    height: a.radioSize
                }), Q[0].innerHTML = ""));
                $('[class*="-wrapper"]').not(b).each(function() {
                    const N = $(this),
                        S = N.data("settings");
                    if (S) {
                        if (S.pointer && S.pointer.startsWith("question_") && "true" === N.attr("data-aun")) {
                            var fa = S.pointer.split("_")[1];
                            if ("function" === typeof window[fa + "_close"]) return window[fa + "_close"](), domqueryFocus(), !1
                        }
                        fa = N.find(`.${S.optionsClass}`);
                        if (fa.is(":visible")) {
                            const ca = parseInt(N.attr("data-duration"));
                            N.removeClass(S.openClass).attr("data-state",
                                "closed");
                            ca ? S.slideToggle ? fa.css("opacity", S.opacity || 0).slideUp(ca, {
                                easing: a.easing
                            }) : fa.slideUp(ca, {
                                easing: a.easing
                            }) : (S.slideToggle && fa.css("opacity", S.opacity || 0), fa.hide())
                        }
                    }
                });
                b.addClass(a.openClass);
                b.attr("data-state", "opened");
                Z(b.find('[class*="-option"]'));
                Q = !0 === a.slideToggle;
                if (!Q && (u = W(b, d), d.css(u), !r)) {
                    let N = null;
                    $(window).off("scroll.select").on("scroll.select", function() {
                        d.is(":visible") ? (N && cancelAnimationFrame(N), N = requestAnimationFrame(function() {
                            const S = W(b, d);
                            d.css({
                                top: S.top,
                                bottom: S.bottom,
                                left: S.left
                            })
                        })) : (N && (cancelAnimationFrame(N), N = null), $(window).off("scroll.select"))
                    })
                }
                Q ? (r = a.optionStyle.backgroundColor || a.optionsStyle.background, d.css({
                    opacity: a.opacity || 0,
                    "background-color": r
                }), d.find("div").first().css("background-color", r), d.find(`.${a.optionClass}`).css("background-color", r), d.slideDown(k, {
                    easing: a.easing,
                    complete: F
                })) : (() => new Promise(N => {
                    const S = b.parent();
                    S.find(".select-overlay").length ? N(S.find(".select-overlay")) : (S.append('<div class="select-overlay"></div>'),
                        setTimeout(() => {
                            const fa = S.find(".select-overlay");
                            N(fa)
                        }, 0))
                }))().then(N => {
                    window._selectCloseTimer && clearTimeout(window._selectCloseTimer);
                    g = !0;
                    N.off("click.selectOverlay");
                    if (!b.data("groupClicked")) {
                        var S = b.find("select, ul").first()[0]._selectId;
                        S && p() && !a.slideToggle && domquery(this).historyOn("select-" + S, ia => {
                            wa = 2;
                            if (0 === ia) {
                                wa = 1;
                                const va = "undefined" !== typeof $ && $.isMobile ? $.isMobile() : {
                                    isMobile: !1
                                };
                                ia = $('[class*="-wrapper"][class*="open"]').filter(function() {
                                    const ma = $(this).data("settings");
                                    return ma && !ma.slideToggle && !0 === va.isMobile
                                });
                                ia.length && ia.each(function() {
                                    const ma = $(this),
                                        qa = ma.data("settings"),
                                        Da = ma.find(`.${qa.optionsClass}`),
                                        Ea = parseInt(ma.attr("data-duration")),
                                        Ba = $(".select-overlay");
                                    P(ma);
                                    if ("radio" === qa.pointer) {
                                        const Fa = ma.attr("data-selected-value"),
                                            Ga = parseInt(ma.attr("data-selected-index")),
                                            Ca = ma.find(".trigger-radio");
                                        void 0 !== Fa && 0 <= Ga && (Object.assign(Ca[0].style, {
                                                border: `2px solid ${qa.radioColor}`,
                                                backgroundColor: "#fff",
                                                width: qa.radioSize,
                                                height: qa.radioSize
                                            }),
                                            Ca.html(O(qa.radioColor, qa)))
                                    }
                                    Ba.css({
                                        "background-color": "rgba(0, 0, 0, 0)"
                                    });
                                    Da.slideUp(Ea, {
                                        easing: qa.easing,
                                        complete: function() {
                                            Ba.hide();
                                            domqueryFocus();
                                            ma.removeClass(qa.openClass);
                                            ma.attr("data-state", "closed")
                                        }
                                    })
                                })
                            }
                        })
                    }
                    d.css({
                        visibility: "visible",
                        opacity: 0
                    });
                    var fa = W(b, d);
                    S = a.optionsStyle.background || "#fff";
                    N.css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        zIndex: 999,
                        display: "block",
                        transition: "background-color 0.3s ease",
                        pointerEvents: "auto",
                        touchAction: "none",
                        WebkitTouchCallout: "none",
                        WebkitUserSelect: "none",
                        userSelect: "none"
                    });
                    const ca = g && !a.slideToggle ? 1E4 : 1E3;
                    fa = {
                        ...fa
                    };
                    fa.hasOwnProperty("left") || (fa.left = "");
                    d.css({
                        ...fa,
                        opacity: 1,
                        display: "none",
                        backgroundColor: S,
                        height: a.height || "auto",
                        Mheight: a.Mheight || "60vh",
                        minHeight: a.minHeight || "auto",
                        maxHeight: a.maxHeight || (g ? a.Mheight || "60vh" : a.height || "300px"),
                        overflowY: "auto",
                        zIndex: ca
                    });
                    "" === fa.left && d.css("left", "");
                    d.find("div").first().css("background-color", S);
                    d.find(`.${a.optionClass}`).css("background-color",
                        S);
                    let ta = !1,
                        Aa = !0;
                    domquery(d).slideDown(k, {
                        easing: a.easing,
                        complete: () => {
                            F();
                            g = Aa = !1
                        }
                    });
                    setTimeout(() => {
                        N.css("background-color", "rgba(0, 0, 0, 0)")
                    }, 0);
                    N.on("click.selectOverlay", function(ia) {
                        if (ta || Aa) return !1;
                        wa = 2;
                        const va = b.find(`.${a.triggerClass}`);
                        va.css("pointer-events", "none");
                        ta = !0;
                        ia.preventDefault();
                        ia.stopPropagation();
                        N.off("click.selectOverlay");
                        if ("radio" === a.pointer) {
                            ia = b.attr("data-selected-value");
                            const ma = parseInt(b.attr("data-selected-index")),
                                qa = b.find(".trigger-radio");
                            void 0 ===
                                ia && -1 === ma ? qa.css({
                                    border: `2px solid ${a.buttonColor}`,
                                    backgroundColor: "#fff",
                                    width: a.radioSize,
                                    height: a.radioSize
                                }).html("") : void 0 !== ia && 0 <= ma && qa.css({
                                    border: `2px solid ${a.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: a.radioSize,
                                    height: a.radioSize
                                }).html(O(a.radioColor, a))
                        }
                        N.css("background-color", "rgba(0, 0, 0, 0)");
                        window._selectCloseTimer = setTimeout(() => {
                            N.hide();
                            d.hide();
                            a.slideToggle || d.css({
                                top: "-9999px",
                                left: "-9999px",
                                visibility: "hidden"
                            });
                            b.removeClass(a.openClass);
                            b.attr("data-state", "closed");
                            b.data("groupClicked", !1);
                            e = ta = g = !1;
                            setTimeout(() => {
                                va.css("pointer-events", "auto")
                            }, 0)
                        }, k)
                    });
                    setTimeout(() => {
                        b.data("groupClicked", !1)
                    }, k)
                });
                setTimeout(function() {
                    v.css({
                        "pointer-events": "",
                        opacity: ""
                    })
                }, k || 0)
            }
            f.stopPropagation();
            const b = $(this).closest('[class*="-wrapper"]'),
                a = b.data("settings");
            if (a) {
                var h = $(".select-overlay");
                h.length && h.is(":visible") && h.css("pointer-events", "none").hide();
                var d = b.find(`.${a.optionsClass}`),
                    k = parseInt(b.attr("data-duration"));
                h = d.is(":visible");
                var v = $('[class*="-option"]'),
                    m = $('[class*="-wrapper"]').not(b).filter(function() {
                        return $(this).find('[class*="-options"]').is(":visible")
                    });
                if (h && !a.offclick) {
                    h = parseInt(b.attr("data-duration"));
                    if ("radio" === a.pointer) {
                        m = b.attr("data-selected-value");
                        var L = parseInt(b.attr("data-selected-index")),
                            J = b.find(".trigger-radio");
                        void 0 !== m && 0 <= L && (Object.assign(J[0].style, {
                            border: `2px solid ${a.radioColor}`,
                            backgroundColor: "#fff",
                            width: a.radioSize,
                            height: a.radioSize
                        }), J.html(O(a.radioColor, a)))
                    }
                    p() && !a.slideToggle ? z(d, h, $(".select-overlay"),
                        b, a) : (b.removeClass(a.openClass), b.attr("data-state", "closed"), h ? a.slideToggle ? d.css("opacity", a.opacity || 0).slideUp(h, {
                        easing: a.easing,
                        complete: domqueryFocus
                    }) : d.slideUp(h, {
                        easing: a.easing,
                        complete: domqueryFocus
                    }) : (d.hide(), domqueryFocus()));
                    return !1
                }
                if (0 < m.length) return m.each(function() {
                    const r = $(this),
                        F = r.data("settings");
                    if (F) {
                        var u = r.find(`.${F.optionsClass}`),
                            w = parseInt(r.attr("data-duration"));
                        r.removeClass(F.openClass).attr("data-state", "closed");
                        p() && !F.slideToggle ? z(u, w || 0, $(".select-overlay"),
                            r, F) : w ? F.slideToggle ? u.css("opacity", F.opacity || 0).slideUp(w, {
                            easing: F.easing
                        }) : u.slideUp(w, {
                            easing: F.easing
                        }) : u.hide()
                    }
                }), !1;
                if (a.pointer && a.pointer.startsWith("question_")) {
                    m = a.pointer.split("_")[1];
                    L = b[0].hasAttribute("data-aun");
                    J = b.find("select").first();
                    const r = parseInt(b.attr("data-current-index")),
                        F = J.find("option").eq(r);
                    J = {
                        value: F.val(),
                        text: y(F.html(), 1),
                        html: y(F.html()),
                        tag: F.attr("tag"),
                        group: q(n(J[0], r).text),
                        index: r
                    };
                    if (L && (f.preventDefault(), f.stopPropagation(), "function" === typeof window[m +
                            "_cancel"])) return window[m + "_reset"] = function() {
                            const u = b.find(`.${a.triggerClass}`);
                            var w = b.find("select, ul").first();
                            w.find("option, li").first().prop("selected", !0);
                            w = w.find("option, li").first().text();
                            u.text(w);
                            w = document.createElement("div");
                            w.className = "custom-question trigger-question";
                            Object.assign(w.style, {
                                ...a.questionStyle,
                                width: a.questionSize,
                                height: a.questionSize,
                                fontSize: `calc(${a.questionSize} * 0.6)`
                            });
                            w.innerHTML = "?";
                            u.append(w);
                            b.removeClass(a.openClass);
                            b[0].removeAttribute("data-aun")
                        },
                        window[m + "_cancel"](J), !1;
                    b.find(`.${a.optionClass}`).each(function() {
                        const u = $(this);
                        u.find(".custom-question, .custom-group-arrow").remove();
                        if (u.hasClass("group-option")) {
                            var w = document.createElement("div");
                            w.className = "custom-group-arrow";
                            const X = ea(a);
                            let K = X.arrowSizeValue;
                            var B = X.arrowRightValue;
                            Object.assign(w.style, {
                                position: "absolute",
                                right: B,
                                top: "50%",
                                transform: "translateY(-50%) rotate(0deg)",
                                width: "0",
                                height: "0",
                                borderLeft: `${K} solid transparent`,
                                borderRight: `${K} solid transparent`,
                                borderTop: `${K} solid ${X.arrowColorValue}`,
                                transition: "all 0.3s ease"
                            });
                            u.append(w);
                            w = parseFloat(K);
                            B = parseFloat(B);
                            isNaN(w) || isNaN(B) || u[0].style.setProperty("padding-right", `${2*w+B+10}px`, "important")
                        } else B = document.createElement("div"), B.className = "custom-question option-question", Object.assign(B.style, a.questionStyle), B.innerHTML = `<span style="font-size: calc(${a.questionSize} * 0.6);">?</span>`, u.append(B)
                    })
                }
                m = $('[class*="-wrapper"][class*="open"]').filter(function() {
                    const r = $(this).data("settings");
                    return r && r.pointer && r.pointer.startsWith("question_") && "true" === $(this).attr("data-aun")
                });
                if (m.length) h = m.data("settings").pointer.split("_")[1], "function" === typeof window[h + "_close"] && (window[h + "_close"](), domqueryFocus());
                else {
                    if ("checkbox" === a.pointer || a.pointer?.startsWith("checkbox_")) m = b.find(`.${a.triggerClass}`), b.find(`.${a.optionClass}`).each(function() {
                        const r = $(this);
                        if (r.hasClass("group-option") || r.attr("data-group") || r.data("group")) r.find(".custom-checkbox").remove();
                        else {
                            var F = "true" ===
                                r.attr("data-checked");
                            r.find(".custom-checkbox").remove();
                            const u = document.createElement("div");
                            u.className = "custom-checkbox option-checkbox";
                            Object.assign(u.style, {
                                ...da(),
                                border: F ? `2px solid ${a.checkboxColor}` : `2px solid ${a.buttonColor}`,
                                borderRadius: "3px",
                                backgroundColor: F ? a.checkboxColor : "#fff",
                                zIndex: "2",
                                display: "block",
                                width: a.checkboxSize,
                                height: a.checkboxSize
                            });
                            F ? (u.innerHTML = V(a.checkboxSize), a.selectedBg && (F = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, r.addClass("selected").addClass("selected-bg-active"),
                                r[0].style.setProperty("background-color", F, "important"), r.css("font-weight", "normal"))) : a.selectedBg && (r.removeClass("selected").removeClass("selected-bg-active"), r[0].style.removeProperty("background-color"), r.css("font-weight", "normal"));
                            r.append(u)
                        }
                    }), m.find(".custom-checkbox").length || (L = document.createElement("div"), L.className = "custom-checkbox trigger-checkbox", J = parseInt(b.attr("data-check-count")) || 0, Object.assign(L.style, {
                        ...da(),
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: 0 < J ? `2px solid ${a.checkboxColor}` : `2px solid ${a.buttonColor}`,
                        borderRadius: "3px",
                        backgroundColor: 0 < J ? a.checkboxColor : "#fff",
                        zIndex: "2",
                        display: "block",
                        width: a.checkboxSize,
                        height: a.checkboxSize
                    }), 0 < J && (L.innerHTML = H(J, a.checkboxSize)), m.append(L));
                    if (!a.offclick || !b.hasClass(a.openClass)) {
                        var E = !1;
                        if (h) b.removeClass(a.openClass), b.attr("data-state", "closed"), Z(v), v.removeClass(a.highlightedClass), v.each(function() {
                            const r = $(this);
                            r.hasClass("selected") && a.selectedBg ? (r.addClass("selected-bg-active"),
                                r.css("opacity", "1")) : r.removeClass("selected-bg-active")
                        }), "radio" === a.pointer && (h = b.attr("data-selected-value"), m = b.find(".trigger-radio"), m.length && (void 0 !== h ? (Object.assign(m[0].style, {
                            border: `2px solid ${a.radioColor}`,
                            backgroundColor: "#fff",
                            width: a.radioSize,
                            height: a.radioSize
                        }), m[0].innerHTML = void 0 !== h ? O(a.radioColor, a) : "") : (Object.assign(m[0].style, {
                            border: `2px solid ${a.buttonColor}`,
                            backgroundColor: "#fff",
                            width: a.radioSize,
                            height: a.radioSize
                        }), m[0].innerHTML = ""))), D(d, k, a);
                        else {
                            if (a.delay &&
                                0 < parseInt(a.delay)) {
                                if ("true" === b.attr("data-delay-pending")) return !1;
                                b.attr("data-delay-pending", "true");
                                const r = this;
                                f.preventDefault();
                                f.stopPropagation();
                                setTimeout(function() {
                                    b.removeAttr("data-delay-pending");
                                    c.call(r, f)
                                }, parseInt(a.delay));
                                return !1
                            }
                            c.call(this, f)
                        }
                    }
                }
            }
        });
        $(document).on("click", function(f) {
            if (e) e = !1;
            else {
                var c = $(f.target),
                    b = c.closest('[class*="-wrapper"]');
                if (c.closest(".group-option").length || b.data("groupClicked")) return f.preventDefault(), f.stopPropagation(), !1;
                f = $('[class*="-wrapper"][class*="open"]');
                f.length && !c.closest('[class*="-wrapper"]').length && (wa = 2, f.each(function() {
                    const a = $(this),
                        h = a.data("settings");
                    if (h && !0 !== h.offclick && (!h.pointer || !h.pointer.startsWith("question_") || "true" !== a.attr("data-aun"))) {
                        var d = a.find(`.${h.optionsClass}`),
                            k = parseInt(a.attr("data-duration")),
                            v = function() {
                                a.find('[class*="-option"]').removeClass("selected");
                                [50, 100, 200].forEach(m => {
                                    setTimeout(() => {
                                        const L = a.find('[class*="-option"].selected');
                                        0 < L.length && L.removeClass("selected")
                                    }, m)
                                })
                            };
                        if (p() && !h.slideToggle) z(d,
                            k, $(".select-overlay"), a, h), v();
                        else {
                            a.removeClass(h.openClass);
                            a.attr("data-state", "closed");
                            if ("radio" === h.pointer) {
                                const m = a.attr("data-selected-value"),
                                    L = parseInt(a.attr("data-selected-index")),
                                    J = a.find(".trigger-radio");
                                void 0 !== m && 0 <= L && (Object.assign(J[0].style, {
                                    border: `2px solid ${h.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: h.radioSize,
                                    height: h.radioSize
                                }), J.html(O(h.radioColor, h)))
                            }
                            k ? (h.slideToggle && d.css("opacity", h.opacity || 0), d.slideUp(k, {
                                    easing: h.easing,
                                    complete: function() {
                                        P(a);
                                        v();
                                        domqueryFocus()
                                    }
                                })) :
                                (v(), d.hide(), P(a), domqueryFocus())
                        }
                    }
                }))
            }
        });
        $(document).on("focusin", function(f) {
            f = $(f.target);
            const c = f.closest('[class*="-wrapper"]');
            f.is("body") || $('[class*="-wrapper"][class*="open"]').each(function() {
                const b = $(this);
                if (!c.length || b[0] !== c[0]) {
                    var a = b.data("settings");
                    if (a && !0 !== a.offclick && (!a.pointer || !a.pointer.startsWith("question_") || "true" !== b.attr("data-aun"))) {
                        var h = b.find(`.${a.optionsClass}`),
                            d = parseInt(b.attr("data-duration"));
                        if (p() && !a.slideToggle) z(h, d, $(".select-overlay"), b, a);
                        else {
                            b.removeClass(a.openClass);
                            b.attr("data-state", "closed");
                            if ("radio" === a.pointer) {
                                const k = b.attr("data-selected-value"),
                                    v = parseInt(b.attr("data-selected-index")),
                                    m = b.find(".trigger-radio");
                                void 0 !== k && 0 <= v && (Object.assign(m[0].style, {
                                    border: `2px solid ${a.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: a.radioSize,
                                    height: a.radioSize
                                }), m.html(O(a.radioColor, a)))
                            }
                            d ? a.slideToggle ? h.css("opacity", a.opacity || 0).slideUp(d, {
                                easing: a.easing,
                                complete: function() {
                                    P(b);
                                    domqueryFocus()
                                }
                            }) : h.slideUp(d, {
                                easing: a.easing,
                                complete: function() {
                                    P(b);
                                    domqueryFocus()
                                }
                            }) : (h.hide(), P(b), domqueryFocus())
                        }
                    }
                }
            })
        });
        $(document).on("focusout", '[class*="-wrapper"]', function(f) {
            const c = $(this),
                b = c.data("settings");
            b && !0 !== b.offclick && setTimeout(() => {
                if ($('[class*="-wrapper"][class*="open"]').length && !(0 < $(document.activeElement).closest('[class*="-wrapper"]').length || b.pointer && b.pointer.startsWith("question_") && "true" === c.attr("data-aun"))) {
                    var a = c.find(`.${b.optionsClass}`),
                        h = parseInt(c.attr("data-duration"));
                    if (p() && !b.slideToggle) z(a,
                        h, $(".select-overlay"), c, b);
                    else {
                        c.removeClass(b.openClass);
                        c.attr("data-state", "closed");
                        if ("radio" === b.pointer) {
                            const d = c.attr("data-selected-value"),
                                k = parseInt(c.attr("data-selected-index")),
                                v = c.find(".trigger-radio");
                            void 0 !== d && 0 <= k && (Object.assign(v[0].style, {
                                border: `2px solid ${b.radioColor}`,
                                backgroundColor: "#fff",
                                width: b.radioSize,
                                height: b.radioSize
                            }), v.html(O(b.radioColor, b)))
                        }
                        h ? (b.slideToggle && a.css("opacity", b.opacity || 0), a.slideUp(h, {
                            easing: b.easing
                        })) : a.hide()
                    }
                }
            }, 0)
        });
        $(window).on("resize",
            function() {
                $('[class*="-wrapper"][class*="open"]').each(function() {
                    var f = $(this),
                        c = f.data("settings");
                    c && !0 !== c.slideToggle && (c = f.find(`.${c.optionsClass}`), f = W(f, c), c.css(f))
                })
            })
    }
    return this
};
$.fn.select = function(x, l, I) {
    const p = function(q, y, n) {
        if (n) {
            var O = y.val();
            n.pointer ? "radio" === n.pointer ? q.find(".custom-radio").each(function() {
                const V = $(this).closest('[class*="-option"]').attr("data-value") === O;
                $(this).css({
                    border: V ? `2px solid ${n.radioColor}` : `2px solid ${n.buttonColor}`,
                    backgroundColor: "#fff"
                }).html(V ? upHTMe(n.radioColor, n) : "")
            }) : "checkbox" === n.pointer ? q.find(".custom-checkbox").each(function() {
                const V = $(this).closest('[class*="-option"]').attr("data-value") === O,
                    H = n.checkboxColor ||
                    "#2196F3",
                    da = n.checkboxSize || "16px";
                V ? $(this).css({
                    border: `2px solid ${H}`,
                    backgroundColor: H
                }).html(upHTMe2(da)) : $(this).css({
                    border: `2px solid ${n.buttonColor||"#ccc"}`,
                    backgroundColor: "#fff"
                }).html("")
            }) : n.pointer.startsWith("question_") && q.find(".custom-question").each(function() {
                $(this).closest('[class*="-option"]').attr("data-value") === O ? $(this).addClass("active") : $(this).removeClass("active")
            }) : n.dot && q.find(".custom-dot").each(function() {
                $(this).closest('[class*="-option"]').attr("data-value") ===
                    O ? $(this).css(n.dotSelectedStyle || {}) : $(this).css(n.dotStyle || {})
            })
        }
    };
    if ("string" === typeof x) {
        if ("value" === x) return "" === l || null === l || void 0 === l ? this.each(function() {
            const q = $(this).find('option[value=""]');
            if (q.length) return $(this).select("index", q.index())
        }) : this.each(function() {
            const q = $(this);
            if (this._selectId) {
                var y = q.find(`option[value="${l}"]`);
                if (y.length) {
                    var n = $(".select-" + (this._selectId + "-wrapper"));
                    const V = n.data("settings");
                    q.find("option").prop("selected", !1);
                    y.prop("selected", !0);
                    n.attr({
                        "data-selected-value": y.val(),
                        "data-selected-index": y.index()
                    });
                    var O = n.find('[class*="-option"]');
                    O.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    V.selectedBg && O.each(function() {
                        const Y = $(this),
                            R = (Y.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        Y.attr("style", R)
                    });
                    const H = n.find(`[data-value="${y.val()}"]`);
                    if (H.length) {
                        setTimeout(() => {
                            H.addClass("selected");
                            V.selectedBg ? (H.addClass("selected-bg-active"), H[0].style.setProperty("background-color",
                                !0 === V.selectedBg ? rgbToRgba(V.activeBackground, .5) : V.selectedBg, "important"), H.css("font-weight", "normal")) : H.css("font-weight", "bold")
                        }, 300);
                        const Y = n.find('[class*="-options"]');
                        if (Y.length) {
                            O = (H.attr("class")?.split(" ") || []).filter(R => R !== V.optionClass && "selected" !== R && R !== V.highlightedClass && !R.includes("wrapper") && !R.includes("options"));
                            if (0 < O.length) {
                                const R = new Set,
                                    P = D => {
                                        if (D && !R.has(D)) {
                                            R.add(D);
                                            var M = Y.find(`[data-group="${D}"]`);
                                            M.length && (M.addClass("expanded"), M.find(".custom-group-arrow").css("transform",
                                                "translateY(-50%) rotate(180deg)"), Y.find(`.${D}`).show(), (M.attr("class")?.split(" ") || []).forEach(z => {
                                                "group-option" !== z && "expanded" !== z && P(z)
                                            }))
                                        }
                                    };
                                O.forEach(D => P(D))
                            }
                            void 0 !== V.autoScrollToSelected && V.autoScrollToSelected && (O = parseInt(n.attr("data-duration")) || 300, setTimeout(() => {
                                Y.find("div").first().length && H.length && H[0] && "function" === typeof H[0].scrollIntoView && H[0].scrollIntoView({
                                    block: "center",
                                    behavior: "smooth"
                                })
                            }, O))
                        }
                    }
                    p(n, y, V);
                    n = n.find('[class*="-trigger"]');

                    function da(Y, R) {
                        var P = R.attr("class");
                        if (!P) return R.text();
                        const D = [];
                        P = P.split(" ");
                        for (let z = 0; z < P.length; z++) {
                            var M = Y.find(`option[group="${P[z]}"]`);
                            if (M.length && (D.push(M.text()), M = M.attr("class"))) {
                                M = M.split(" ");
                                for (let W = 0; W < M.length; W++) {
                                    const Z = Y.find(`option[group="${M[W]}"]`);
                                    Z.length && D.unshift(Z.text())
                                }
                            }
                        }
                        D.push(R.text());
                        return [...(new Set(D))].join(" > ")
                    }
                    let ea;
                    if (q.find("option[group]").length) try {
                        ea = "function" === typeof findGroupPath ? findGroupPath(this, y.index()).text : da(q, y)
                    } catch (Y) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
                            Y), ea = y.text()
                    } else ea = y.text();
                    y = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    O = n.find('span[style*="position: absolute"]').clone();
                    V && V.allowHTML ? n.html(ea) : n.text(ea);
                    y.length && n.append(y);
                    O.length && n.append(O);
                    q.val(l)
                }
            } else console.warn("Select element was not initialized with $.select() method")
        });
        if ("index" === x && "number" === typeof l) return this.each(function() {
            var q = $(this);
            if (this._selectId) {
                var y = q.find("option").eq(l);
                if (y.length) {
                    var n = $(".select-" + (this._selectId +
                        "-wrapper"));
                    const V = n.data("settings");
                    q.find("option").prop("selected", !1);
                    y.prop("selected", !0);
                    n.attr({
                        "data-selected-value": y.val(),
                        "data-selected-index": l
                    });
                    var O = n.find('[class*="-option"]');
                    O.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    V.selectedBg && O.each(function() {
                        const Y = $(this),
                            R = (Y.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        Y.attr("style", R)
                    });
                    const H = n.find(`[data-value="${y.val()}"]`);
                    H.length && setTimeout(() => {
                        H.addClass("selected");
                        V.selectedBg ? (H.addClass("selected-bg-active"), H[0].style.setProperty("background-color", V.selectedBg, "important"), H.css("font-weight", "normal")) : H.css("font-weight", "bold")
                    }, 300);
                    p(n, y, V);
                    n = n.find('[class*="-trigger"]');

                    function da(Y, R) {
                        var P = R.attr("class");
                        if (!P) return R.text();
                        const D = [];
                        P = P.split(" ");
                        for (let z = 0; z < P.length; z++) {
                            var M = Y.find(`option[group="${P[z]}"]`);
                            if (M.length && (D.push(M.text()), M = M.attr("class"))) {
                                M = M.split(" ");
                                for (let W = 0; W < M.length; W++) {
                                    const Z = Y.find(`option[group="${M[W]}"]`);
                                    Z.length && D.unshift(Z.text())
                                }
                            }
                        }
                        D.push(R.text());
                        return [...(new Set(D))].join(" > ")
                    }
                    let ea;
                    if (q.find("option[group]").length) try {
                        ea = "function" === typeof findGroupPath ? findGroupPath(this, l).text : da(q, y)
                    } catch (Y) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:", Y), ea = y.text()
                    } else ea = y.text();
                    q = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    O = n.find('span[style*="position: absolute"]').clone();
                    V && V.allowHTML ? n.html(ea) : n.text(ea);
                    q.length && n.append(q);
                    O.length && n.append(O);
                    "function" === typeof I && I.call(this, {
                        index: l,
                        value: y.val(),
                        text: y.text(),
                        path: ea
                    })
                }
            } else console.warn("Select element was not initialized with $.select() method")
        });
        if ("value" === x) return this.each(function() {
            var q = $(this);
            if (this._selectId) {
                var y = q.find(`option[value="${l}"]`);
                if (y.length) {
                    var n = $(".select-" + (this._selectId + "-wrapper"));
                    const V = y.index(),
                        H = n.data("settings");
                    q.find("option").prop("selected", !1);
                    y.prop("selected", !0);
                    n.attr({
                        "data-selected-value": l,
                        "data-selected-index": V
                    });
                    var O = n.find('[class*="-option"]');
                    O.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    H.selectedBg && O.each(function() {
                        const R = $(this),
                            P = (R.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        R.attr("style", P)
                    });
                    const da = n.find(`[data-value="${l}"]`);
                    da.length && setTimeout(() => {
                        da.addClass("selected");
                        H.selectedBg ? (da.addClass("selected-bg-active"), da[0].style.setProperty("background-color", H.selectedBg, "important"), da.css("font-weight",
                            "normal")) : da.css("font-weight", "bold")
                    }, 300);
                    H && H.pointer ? "radio" === H.pointer ? n.find(".custom-radio").each(function() {
                        const R = $(this).closest('[class*="-option"]').attr("data-value") === l;
                        $(this).css({
                            border: R ? `2px solid ${H.radioColor}` : `2px solid ${H.buttonColor}`,
                            backgroundColor: "#fff"
                        }).html(R ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(H.radioSize)/2}px; height: ${parseInt(H.radioSize)/2}px; background-color: ${H.radioColor}; border-radius: 50%;"></div>` :
                            "")
                    }) : "checkbox" === H.pointer ? n.find(".custom-checkbox").each(function() {
                        const R = $(this).closest('[class*="-option"]').attr("data-value") === l,
                            P = H.checkboxColor || "#2196F3";
                        R ? $(this).css({
                            border: `2px solid ${P}`,
                            backgroundColor: P
                        }).html('<svg viewBox="0 0 24 24" style="fill: white; width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>') : $(this).css({
                            border: `2px solid ${H.buttonColor||
"#ccc"}`,
                            backgroundColor: "#fff"
                        }).html("")
                    }) : H.pointer.startsWith("question_") && n.find(".custom-question").each(function() {
                        $(this).closest('[class*="-option"]').attr("data-value") === l ? $(this).addClass("active") : $(this).removeClass("active")
                    }) : H && H.dot && n.find(".custom-dot").each(function() {
                        const R = $(this).closest('[class*="-option"]').attr("data-value") === l;
                        $(this).css({
                            border: R ? `2px solid ${H.dotColor}` : `2px solid ${H.buttonColor}`,
                            backgroundColor: R ? H.dotColor : "#fff"
                        })
                    });
                    n = n.find('[class*="-trigger"]');

                    function ea(R, P) {
                        var D = P.attr("class");
                        if (!D) return P.text();
                        const M = [];
                        D = D.split(" ");
                        for (let W = 0; W < D.length; W++) {
                            var z = R.find(`option[group="${D[W]}"]`);
                            if (z.length && (M.push(z.text()), z = z.attr("class"))) {
                                z = z.split(" ");
                                for (let Z = 0; Z < z.length; Z++) {
                                    const ka = R.find(`option[group="${z[Z]}"]`);
                                    ka.length && M.unshift(ka.text())
                                }
                            }
                        }
                        M.push(P.text());
                        return [...(new Set(M))].join(" > ")
                    }
                    let Y;
                    if (q.find("option[group]").length) try {
                        Y = "function" === typeof findGroupPath ? findGroupPath(this, V).text : ea(q, y)
                    } catch (R) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
                            R), Y = y.text()
                    } else Y = y.text();
                    q = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    O = n.find('span[style*="position: absolute"]').clone();
                    H && H.allowHTML ? n.html(Y) : n.text(Y);
                    q.length && n.append(q);
                    O.length && n.append(O);
                    "function" === typeof I && I.call(this, {
                        index: V,
                        value: l,
                        text: y.text(),
                        path: Y
                    })
                }
            } else console.warn("Select element was not initialized with $.select() method")
        })
    }
    return $.select.call(this, x, l, I)
};
$.fn.selectSet = function(x, l, I) {
    return this.each(function() {
        function p(D, M, z) {
            const [W, Z] = M.split(":");
            if ("selected" === W) "selected" === Z && (q.find("option").prop("selected", !1), D.prop("selected", !0), O(H, q, D), q.trigger("change"));
            else if ("val" === W)
                if (M = D.val(), D.val(Z), z) {
                    const ja = D.attr("group");
                    D.attr("group", Z);
                    q.find(`option.${ja}`).each(function() {
                        $(this).removeClass(ja).addClass(Z)
                    });
                    D = H.find(`[data-group="${ja}"]`);
                    D.length && (D.attr("data-group", Z), H.find(`.${ja}`).each(function() {
                        $(this).removeClass(ja).addClass(Z)
                    }))
                } else z =
                    H.find(`[data-value="${M}"]`), z.length && z.attr("data-value", Z), D.prop("selected") && V(H, y);
            else if ("text" === W)
                if (D.text(Z), z) {
                    z = D.attr("group");
                    z = H.find(`[data-group="${z}"]`);
                    if (z.length) {
                        M = z.find(".custom-group-arrow").clone();
                        var ka = z.contents().filter(function() {
                            return 3 === this.nodeType
                        });
                        ka.length ? ka[0].nodeValue = Z : (da && da.allowHTML ? z.html(Z) : z.text(Z), M.length && z.append(M))
                    }
                    D = D.attr("group");
                    q.find(`option.${D}`).filter(function() {
                        return $(this).prop("selected")
                    }).length && V(H, y)
                } else {
                    z = D.val();
                    z = H.find(`[data-value="${z}"]`);
                    if (z.length) {
                        M = z.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot, .custom-group-arrow").clone();
                        ka = z.find('span[style*="position: absolute"]').clone();
                        let ja = z.contents().filter(function() {
                            return 3 === this.nodeType
                        });
                        ja.length ? ja[0].nodeValue = Z : (da && da.allowHTML ? z.html(Z) : z.text(Z), M.length && z.append(M), ka.length && z.append(ka))
                    }
                    D.prop("selected") && V(H, y)
                }
        }
        const q = $(this),
            y = this;
        var n = this._selectId;
        if (n) {
            var O = function(D, M, z) {
                    const W = D.data("settings"),
                        Z = z.val();
                    z = z.index();
                    D.attr({
                        "data-selected-value": Z,
                        "data-selected-index": z
                    });
                    D.find('[class*="-option"]').removeClass("selected").css("font-weight", "normal");
                    const ka = D.find(`[data-value="${Z}"]`);
                    ka.length && setTimeout(() => {
                        ka.addClass("selected");
                        W.selectedBg || ka.css("font-weight", "bold")
                    }, 300);
                    "radio" === W.pointer ? D.find(".custom-radio").each(function() {
                        const ja = $(this).closest('[class*="-option"]').attr("data-value") === Z;
                        $(this).css({
                            border: ja ? `2px solid ${W.radioColor}` : `2px solid ${W.buttonColor}`,
                            backgroundColor: "#fff"
                        }).html(ja ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(W.radioSize)/2}px; height: ${parseInt(W.radioSize)/2}px; background-color: ${W.radioColor}; border-radius: 50%;"></div>` : "")
                    }) : W.dot && D.find(".custom-dot").each(function() {
                        const ja = $(this).closest('[class*="-option"]').attr("data-value") === Z;
                        $(this).css({
                            border: ja ? `2px solid ${W.dotColor}` : `2px solid ${W.buttonColor}`,
                            backgroundColor: ja ? W.dotColor : "#fff"
                        })
                    });
                    V(D,
                        M[0])
                },
                V = function(D, M) {
                    const z = D.data("settings");
                    D = D.find('[class*="-trigger"]');
                    var W = $(M);
                    const Z = W.find("option:selected");
                    if (Z.length) {
                        var ka = Z.index();
                        if (W.find("option[group]").length && "function" === typeof findGroupPath) try {
                            var ja = findGroupPath(M, ka).text
                        } catch (xa) {
                            console.warn("Error getting group path:", xa), ja = Z.text()
                        } else ja = Z.text();
                        M = D.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                        W = D.find('span[style*="position: absolute"]').clone();
                        z && z.allowHTML ? D.html(ja) :
                            D.text(ja);
                        M.length && D.append(M);
                        W.length && D.append(W);
                        "radio" === z.pointer && (ja = D.find(".custom-radio"), ja.length && ja.css({
                            border: `2px solid ${z.radioColor}`,
                            backgroundColor: "#fff"
                        }).html(`<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(z.radioSize)/2}px; height: ${parseInt(z.radioSize)/2}px; background-color: ${z.radioColor}; border-radius: 50%;"></div>`))
                    }
                },
                H = $(".select-" + (n + "-wrapper")),
                da = H.data("settings");
            n = !1;
            if ("string" === typeof x &&
                x.startsWith("group:")) {
                n = !0;
                var ea = x.substring(6);
                ea = q.find(`option[group="${ea}"]`)
            } else "number" !== typeof x && isNaN(parseInt(x)) ? "string" === typeof x && (ea = q.find(`option[value="${x}"]`)) : (ea = parseInt(x), ea = q.find("option").eq(ea), ea.attr("group") && (n = !0));
            if (ea.length) {
                if ("string" === typeof l && l.startsWith("{") && l.endsWith("}")) {
                    var Y = l.match(/\{([^}]+)\}/g);
                    if (Y)
                        for (var R of Y) Y = R.substring(1, R.length - 1), p(ea, Y, n)
                } else "string" === typeof l && p(ea, l, n);
                if ("function" === typeof I) {
                    var P = q.find("option:selected");
                    R = P.index();
                    n = P.val();
                    ea = P.text();
                    Y = "";
                    if (P.length && P.attr("class")) {
                        P = P.attr("class").split(" ");
                        for (const D of P)
                            if (P = q.find(`option[group="${D}"]`), P.length) {
                                Y = P.text();
                                break
                            }
                    }
                    I.call(this, {
                        index: R,
                        value: n,
                        text: ea,
                        group: Y
                    })
                }
            } else console.warn(`Target option not found: ${x}`)
        } else console.warn("Select element was not initialized with $.select() method")
    })
};
$.fn.selectGet = function(x) {
    var l = $(this);
    if ("number" === typeof x) return l = l.find("option").eq(x), l.length ? l : $();
    if ("string" === typeof x && !["val", "value", "text", "index", "group"].includes(x)) {
        var I = l.find(`option[value="${x}"]`);
        if (I.length) return I;
        l = l.find("option").filter(function() {
            return $(this).text() === x
        });
        return l.length ? l : $()
    }
    var p = l.find("option:selected");
    if (!p.length) return $();
    if (x && "val" !== x && "value" !== x) {
        if ("text" === x) return p.text();
        if ("index" === x) return p.index();
        if ("group" === x) {
            I = "";
            try {
                if (p.attr("class")) {
                    const q = p.attr("class").split(" ");
                    p = [];
                    for (const y of q) {
                        const n = l.find(`option[group="${y}"]`);
                        if (n.length && (p.unshift(n.text()), n.attr("class"))) {
                            const O = n.attr("class").split(" ");
                            for (const V of O) {
                                const H = l.find(`option[group="${V}"]`);
                                H.length && p.unshift(H.text())
                            }
                        }
                    }
                    I = p.join(" > ")
                }
            } catch (q) {
                console.warn("Error finding group path:", q)
            }
            return I
        }
    } else return p.val();
    return p
};

function createParser(x, l, I, p = {}) {
    return {
        prefix: x,
        minParts: l,
        fields: I,
        optionalFields: p,
        parse: function(q) {
            if (q.length < this.minParts) return null;
            const y = {};
            this.fields.forEach((n, O) => {
                y[n] = q[O + 1] || ""
            });
            Object.entries(this.optionalFields).forEach(([n, O]) => {
                n = parseInt(n);
                q[n] && q[n].trim() && (y[O] = q[n])
            });
            return y
        }
    }
}
$.fn.selectAdd = function(x, l) {
    return this.each(function() {
        const I = $(this);
        if (this._selectId) {
            var p;
            if ("string" === typeof x) {
                window._selectParsers || (window._selectParsers = [], window._selectParsers.push(createParser("group:", 3, ["group", "text"])), window._selectParsers.push(createParser("option:", 4, ["value", "text", "groupClass"], {
                    4: "tag",
                    5: "img"
                })));
                var q = window._selectParsers,
                    y = x.split(":");
                (q = q.find(n => x.startsWith(n.prefix))) && (p = q.parse(y));
                p || (p = x)
            } else p = x;
            p.group ? (y = document.createElement("option"),
                y.setAttribute("group", p.group), y.textContent = p.text || "", p.parentGroup && (y.className = p.parentGroup), I[0].appendChild(y)) : (y = document.createElement("option"), y.value = p.value || "", y.textContent = p.text || "", p.groupClass && (y.className = p.groupClass), p.tag && y.setAttribute("tag", p.tag), p.img && y.setAttribute("img", p.img), p.groupClass ? (q = Array.from(I[0].querySelectorAll(`.${p.groupClass}`)), 0 < q.length ? (q = q[q.length - 1], q.nextSibling ? I[0].insertBefore(y, q.nextSibling) : I[0].appendChild(y)) : (q = I[0].querySelector(`option[group="${p.groupClass}"]`)) &&
                q.nextSibling ? I[0].insertBefore(y, q.nextSibling) : I[0].appendChild(y)) : I[0].appendChild(y));
            refreshSelectUI(I);
            "function" === typeof l && l.call(this, {
                type: p.group ? "group" : "option",
                group: p.group || p.groupClass,
                value: p.value,
                text: p.text
            })
        } else console.warn("Select element was not initialized with $.select() method")
    })
};

function refreshSelectUI(x) {
    var l = x.closest('[class*="-wrapper"]');
    let I = null;
    l.length && (I = l.data("settings"));
    if (l.length) {
        const p = l[0].parentNode,
            q = l[0].nextSibling;
        x[0].style.display = "";
        q ? p.insertBefore(x[0], q) : p.appendChild(x[0]);
        l.remove()
    }
    l = {
        duration: 300,
        opacity: 1
    };
    I ? (void 0 !== I.slideToggle && (l.slideToggle = I.slideToggle), void 0 !== I.width && (l.width = I.width), void 0 !== I.defaultBgColor && (l.defaultBgColor = I.defaultBgColor), void 0 !== I.defaultColor && (l.defaultColor = I.defaultColor)) : l.slideToggle = !0;
    x.select(300, l)
}
$.fn.selectAdd.registerParser = function(x, l, I, p) {
    window._selectParsers || (window._selectParsers = []);
    window._selectParsers.push(createParser(x, l, I, p))
};
$.fn.selectRemove = function(x, l) {
    return this.each(function() {
        const I = $(this);
        if (this._selectId) {
            var p = "";
            if ("string" === typeof x)
                if (x.startsWith("group:")) {
                    var q = x.substring(6);
                    q = I.find(`option[group="${q}"], option.${q}`);
                    p = "group"
                } else x.startsWith("value:") ? (q = x.substring(6), q = I.find(`option[value="${q}"]`)) : x.startsWith("index:") ? (q = parseInt(x.substring(6)), q = I.find("option").eq(q)) : q = I.find(`option[value="${x}"]`), p = "option";
            q && 0 < q.length && (p = {
                type: p,
                count: q.length,
                items: q.map(function() {
                    return {
                        value: $(this).val(),
                        text: $(this).text(),
                        isGroup: void 0 !== $(this).attr("group"),
                        groupName: $(this).attr("group") || $(this).attr("class")
                    }
                }).get()
            }, q.remove(), refreshSelectUI(I), "function" === typeof l && l.call(this, p))
        } else console.warn("Select element was not initialized with $.select() method")
    })
};