function rgbToRgba(x, l = .5) {
    if (!x || x.startsWith("rgba")) return x;
    var I = x.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (I) {
        const [, q, A, n] = I;
        return `rgba(${q}, ${A}, ${n}, ${l})`
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
        const G = document.createElement("div");
        G.innerHTML = g;
        return G.textContent || G.innerText || ""
    }

    function A(g, G = 0) {
        return 1 === G ? g.replace(/\x3c!--(.*?)--\x3e/g, "$1").replace(/<[^>]*>/g, "") : g.replace(/\x3c!--(.*?)--\x3e/g, "$1")
    }

    function n(g, G, y) {
        g = $(g);
        y = g.find("option, li").eq(y);
        if (!y.length) return {
            text: g.find("option, li").first().text().trim(),
            tag: null
        };
        var r = y.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
        G = [];
        var H = y;
        for (G.unshift(r); H.length;) {
            var U = H.attr("class")?.split(" ") || [];
            r = !1;
            for (const f of U)
                if (U = g.find(`[group="${f}"]`), U.length) {
                    H = U.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
                    G.unshift(H);
                    H = U;
                    r = !0;
                    break
                } if (!r) break
        }
        return {
            text: G.join(" > "),
            tag: y.attr("tag")
        }
    }

    function R(g, G) {
        G = parseInt(G?.radioSize || "16") / 2;
        return `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${G}px; height: ${G}px; background-color: ${g}; border-radius: 50%;"></div>`
    }

    function V(g) {
        g = parseInt(g);
        return `<span style="\n\t\t\tposition: absolute;\n\t\t\tleft: 50%;\n\t\t\ttop: 50%;\n\t\t\twidth: ${.3*g}px;\n\t\t\theight: ${.6*g}px;\n\t\t\tborder: solid white;\n\t\t\tborder-width: 0 ${.12*g}px ${.12*g}px 0;\n\t\t\ttransform: translate(-50%, -65%) rotate(45deg);\n\t\t\tdisplay: block;\n\t\t"></span>`
    }

    function C(g, G = "16px") {
        return `<div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; color: #fff; font-size: ${Math.max(.7*
parseInt(G),10)}px; font-weight: bold; line-height: 1; text-align: center; -webkit-font-smoothing: antialiased; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-tap-highlight-color: transparent;">${g}</div>`
    }

    function Y(g = "50%", G = "10px") {
        return {
            position: "absolute",
            right: G,
            top: g,
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px"
        }
    }

    function da(g) {
        let G = g.groupArrowStyle?.size || g.arrowSize,
            y = g.arrowRight || Y().right,
            r = g.groupArrowColor || g.arrowColor;
        if ("checkbox" ===
            g.pointer || g.pointer?.startsWith("checkbox_")) {
            if (!g.groupArrowStyle?.size && g.checkboxSize) {
                var H = parseFloat(g.checkboxSize);
                isNaN(H) || (G = `${.6*H}px`)
            }!g.groupArrowColor && g.checkboxColor && (r = g.checkboxColor)
        } else "radio" === g.pointer ? (!g.groupArrowStyle?.size && g.radioSize && (H = parseFloat(g.radioSize), isNaN(H) || (G = `${.6*H}px`)), !g.groupArrowColor && g.radioColor && (r = g.radioColor)) : g.pointer && g.pointer.startsWith("question_") && !g.groupArrowColor && g.questionColor && (r = g.questionColor);
        return {
            arrowSizeValue: G,
            arrowRightValue: y,
            arrowColorValue: r
        }
    }

    function P(g) {
        return {
            wrapperClass: g + "-wrapper",
            triggerClass: g + "-trigger",
            optionsClass: g + "-options",
            optionClass: g + "-option",
            openClass: g + "-open"
        }
    }

    function M(g) {
        return {
            border: `2px solid ${g||"#ccc"}`,
            backgroundColor: "#fff"
        }
    }

    function N(g) {
        ua && ((g = g.find("select").first()[0]) && g._selectId && (g = window._gong_tea_yun_0.get(g._selectId + "_close")) && g.call(this, ua), ua = 0)
    }

    function D(g, G, y) {
        const r = g.closest('[class*="-wrapper"]');
        g.find("div").first().css({
            "background-color": y.optionsStyle.background ||
                "#fff"
        });
        N(r);
        G ? y.slideToggle ? g.css("opacity", y.opacity || 0).slideToggle(G, {
            easing: y.easing,
            complete: domqueryFocus
        }) : g.css("opacity", "").slideToggle(G, {
            easing: y.easing,
            complete: domqueryFocus
        }) : (g.hide(), domqueryFocus())
    }

    function O(g, G, y, r) {
        if (!qa) {
            qa = !0;
            var H = g.closest('[class*="-wrapper"]');
            N(H);
            y.css({
                "background-color": "rgba(0, 0, 0, 0)"
            });
            var U = H.find("select").first()[0]._selectId;
            setTimeout(() => {
                U && domquery(this).historyOff("select-" + U);
                qa = !1
            }, G + 300);
            g.slideToggle(G, {
                easing: r.easing,
                complete: function() {
                    y.hide();
                    domqueryFocus()
                }
            })
        }
    }

    function z(g, G, y, r, H) {
        if (!qa) {
            qa = !0;
            N(r);
            r.data("upHTMe10Running", !0);
            y.css({
                "background-color": "rgba(0, 0, 0, 0)",
                opacity: ""
            });
            var U = r.find("select").first()[0]._selectId;
            setTimeout(() => {
                !r.data("groupClicked") && U && domquery(this).historyOff("select-" + U);
                qa = !1
            }, G + 300);
            g.css("opacity", "").slideToggle(G, {
                easing: H.easing,
                complete: function() {
                    y.css("pointer-events", "none").hide();
                    r.removeClass(H.openClass);
                    r.attr("data-state", "closed");
                    setTimeout(() => {
                        y.css("pointer-events", "")
                    }, 100);
                    domqueryFocus()
                }
            })
        }
    }

    function Z(g, G) {
        var y = p(),
            r = g.data("settings");
        if (!y) {
            const H = g[0].getBoundingClientRect(),
                U = window.innerHeight;
            G = G.find("div").first();
            const f = r && r.height,
                S = f || `${.6*U}px`;
            y = U - H.bottom;
            const W = H.top;
            if (r.parentView) return g = {
                    position: "fixed",
                    left: H.left + "px",
                    width: H.width + "px",
                    zIndex: 1E3,
                    height: S,
                    overflowY: "auto",
                    overflowX: "hidden"
                }, W > y && y < G[0].scrollHeight ? (g.bottom = U - H.top + "px", g.top = "auto", g.borderRadius = "4px 4px 0 0") : (g.top = H.bottom + "px", g.bottom = "auto", g.borderRadius = "0 0 4px 4px"),
                g;
            if (f) return {
                top: "100%",
                bottom: "auto",
                borderRadius: "0 0 4px 4px",
                borderTop: "none",
                borderBottom: "1px solid #ccc"
            };
            g = g.find("select").first();
            g = (g.length ? parseInt(g.height() || g.css("height")) : null) || G[0].scrollHeight;
            r = {
                top: "100%",
                bottom: "auto",
                borderRadius: "0 0 4px 4px",
                borderTop: "none",
                borderBottom: "1px solid #ccc"
            };
            y < g && W > y ? (r = {
                top: "auto",
                bottom: "100%",
                borderRadius: "4px 4px 0 0",
                borderBottom: "1px solid #ccc",
                borderTop: "none"
            }, W < g && G.css({
                maxHeight: `${W-10}px`,
                overflowY: "auto"
            })) : y < g && G.css({
                maxHeight: `${y-
10}px`,
                overflowY: "auto"
            });
            return r
        }
        return {
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            top: "auto",
            borderRadius: r.MborderRadius || "4px 4px 0 0",
            width: "100%",
            Mheight: r.Mheight || "60vh",
            height: r.height || "auto",
            minHeight: r.minHeight || "auto",
            maxHeight: r.maxHeight || (y ? r.Mheight || "60vh" : r.height || "300px"),
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

    function ja(g, G) {
        G && g && Object.entries(G).forEach(([y, r]) => {
            try {
                g.style[y] = r
            } catch (H) {
                console.warn("Style application failed for property:",
                    y)
            }
        })
    }

    function na(g, G) {
        if (G.scrollColor) try {
            g.find('[class*="-options"]');
            const y = G.optionsStyle.background || "#fff",
                r = G.optionStyle.borderBottomColor || "#ddd",
                H = `scrollbar-${g.attr("id")||Math.random().toString(36).substr(2,9)}`;
            $(`#${H}`).remove();
            const U = document.createElement("style");
            U.id = H;
            U.textContent = `\n\t\t\t\t#${g.attr("id")} .${G.optionsClass}::-webkit-scrollbar,\n\t\t\t\t#${g.attr("id")} .${G.optionsClass} div::-webkit-scrollbar {\n\t\t\t\t\twidth: 8px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${G.optionsClass}::-webkit-scrollbar-track,\n\t\t\t\t#${g.attr("id")} .${G.optionsClass} div::-webkit-scrollbar-track {\n\t\t\t\t\tbackground: ${y};\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${G.optionsClass}::-webkit-scrollbar-thumb,\n\t\t\t\t#${g.attr("id")} .${G.optionsClass} div::-webkit-scrollbar-thumb {\n\t\t\t\t\tbackground: ${r};\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\tborder: 1px solid ${y};\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${G.optionsClass}::-webkit-scrollbar-thumb:hover,\n\t\t\t\t#${g.attr("id")} .${G.optionsClass} div::-webkit-scrollbar-thumb:hover {\n\t\t\t\t\tbackground: ${r};\n\t\t\t\t\topacity: 0.8;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${G.optionsClass} {\n\t\t\t\t\tscrollbar-width: thin;\n\t\t\t\t\tscrollbar-color: ${r} ${y};\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${G.optionsClass} div {\n\t\t\t\t\tscrollbar-width: thin;\n\t\t\t\t\tscrollbar-color: ${r} ${y};\n\t\t\t\t}\n\t\t\t`;
            document.head.appendChild(U);
            g.data("scrollbarStyleId", H)
        } catch (y) {
            console.warn("\uc2a4\ud06c\ub864\ubc14 \uc0c9\uc0c1 \uc801\uc6a9 \uc911 \uc624\ub958:", y)
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
        function G(c) {
            if (!c) return "10px";
            c = c.split(" ").filter(b => b.trim());
            return 1 === c.length ? c[0] : 2 === c.length ? c[1] : 4 === c.length ? c[3] : "10px"
        }
        if (g._selectId) {
            var y = $(g).parent();
            if (y.length && y[0].className && "string" === typeof y[0].className && y[0].className.includes("-wrapper")) return
        }
        var r = Math.random().toString(36).substr(2,
            9);
        y = "select-" + r;
        var H = P(y),
            U = p();
        U = "auto" === l.slideToggle ? U ? !1 : !0 : l.slideToggle || !1;
        let f = {
            ...P(y),
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
                ...M(l.buttonColor),
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
                ...M(l.buttonColor),
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
                ...M(l.buttonColor),
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
            ...H,
            slideToggle: U
        };
        ("checkbox" === f.pointer || f.pointer?.startsWith("checkbox_")) && setTimeout(() => {
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
            const h = a.find(`.${f.triggerClass}`).find(".custom-checkbox");
            h.css({
                border: `2px solid ${0<b?f.checkboxColor:f.buttonColor}`,
                backgroundColor: 0 < b ? f.checkboxColor : "#fff",
                width: f.checkboxSize,
                height: f.checkboxSize
            });
            0 < b && h.html(C(b, f.checkboxSize));
            a.find('[class*="-option"]').each(function() {
                const d = $(this);
                var k = d.attr("data-value"),
                    v = c.find(`option[value="${k}"]`);
                k = v.is("[selected]") &&
                    "" !== k.trim();
                v = v.is(":disabled");
                const m = d.find(".custom-checkbox");
                m.length && (m.css({
                    border: `2px solid ${k?f.checkboxColor:f.buttonColor}`,
                    backgroundColor: k ? f.checkboxColor : v ? "#f5f5f5" : "#fff",
                    width: f.checkboxSize,
                    height: f.checkboxSize
                }), k && m.html(V(f.checkboxSize)), d.attr("data-checked", k ? "true" : "false"))
            })
        }, 0);
        g._selectId || (g._selectId = r);
        I && window._gong_tea_yun_0.set(g._selectId + "_callback", I);
        l.onSelect && window._gong_tea_yun_0.set(g._selectId + "_onSelect", l.onSelect);
        l.open && window._gong_tea_yun_0.set(g._selectId +
            "_open", l.open);
        l.close && window._gong_tea_yun_0.set(g._selectId + "_close", l.close);
        y = "select" === g.tagName.toLowerCase();
        H = "ul" === g.tagName.toLowerCase();
        if (y || H) {
            if (H) {
                var S = document.createElement("select");
                S.className = g.className;
                (y = g.getAttribute("onchange")) && S.setAttribute("onchange", y);
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
                                S.appendChild(v);
                                const m = d.getAttribute("group");
                                d = Array.from(g.children).filter(L => L.classList.contains(m));
                                b(d, h + 1)
                            } else k = document.createElement("option"), k.value = d.getAttribute("value") || "", k.innerHTML = d.innerHTML, d.hasAttribute("img") && k.setAttribute("img", d.getAttribute("img")), d.getAttribute("tag") && k.setAttribute("tag", d.getAttribute("tag")), d.hasAttribute("disabled") && (k.disabled = !0), d.hasAttribute("selected") && (k.selected = !0), d.className && (k.className = d.className), k.setAttribute("data-level", h), S.appendChild(k)
                    })
                }
                b(g.children);
                g.parentNode.replaceChild(S, g)
            } else S = g;
            S._selectId = g._selectId;
            var W = document.createElement("div");
            W.className = f.wrapperClass;
            W.setAttribute("data-state", "closed");
            W.setAttribute("tabindex", "0");
            W.setAttribute("data-selected-index", "-1");
            W.setAttribute("data-previous-index", "-1");
            $(W).data("settings", f);
            l.width && (W.style.width = l.width, W.style.boxSizing =
                "border-box");
            (y = S.querySelector("option:checked")) && y.value && (W.setAttribute("data-selected-value", y.value), y = Array.from(S.options).indexOf(y), W.setAttribute("data-selected-index", y));
            ja(W, f.wrapperStyle);
            y = document.createElement("div");
            y.style.position = "relative";
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
            U = H = null;
            f.triggerStyle && (f.triggerStyle.width ? H = f.triggerStyle.width : f.triggerStyle.maxWidth ? H = f.triggerStyle.maxWidth : f.triggerStyle.minWidth && (H = f.triggerStyle.minWidth), f.triggerStyle.height ? U = f.triggerStyle.height : f.triggerStyle.maxHeight ? U = f.triggerStyle.maxHeight :
                f.triggerStyle.minHeight && (U = f.triggerStyle.minHeight));
            H || (H = S.style.width, !H && S.style.maxWidth && (H = S.style.maxWidth), !H && S.style.minWidth && (H = S.style.minWidth));
            U || (U = S.style.height, !U && S.style.maxHeight && (U = S.style.maxHeight), !U && S.style.minHeight && (U = S.style.minHeight));
            ja(fa, f.triggerStyle);
            fa.style.whiteSpace = "nowrap";
            fa.style.overflow = "hidden";
            fa.style.textOverflow = "ellipsis";
            fa.style.paddingRight = f.defaultPaddingRight || "40px";
            fa.style.height = "auto";
            var ia = f.defaultText,
                ya = S.querySelector("option:checked");
            if (ya) {
                var ea = Array.from(S.options);
                "checkbox" === f.pointer || f.pointer?.startsWith("checkbox_") ? (ea = ea.find(c => "" === c.value)) && (ia = f.allowHTML ? ea.innerHTML : ea.textContent) : (ia = ea.indexOf(ya), ia = n(S, ya.value, ia).text, S._needsExpandGroup = !0)
            }!f.showArrow || "radio" === f.pointer || "checkbox" === f.pointer || f.pointer && (f.pointer.startsWith("question_") || f.pointer.startsWith("checkbox_")) || (r = "custom-select-arrow-style-" + r, document.getElementById(r) || (ea = document.createElement("style"), ea.id = r, ea.textContent =
                `\n\t\t\t\t\t.${f.triggerClass}::after {\n\t\t\t\t\t   content: '';\n\t\t\t\t\t   position: absolute;\n\t\t\t\t\t   right: ${f.arrowRight};\n\t\t\t\t\t   top: ${f.arrowTop}; \n\t\t\t\t\t   transform: translateY(-50%);\n\t\t\t\t\t   width: 0;\n\t\t\t\t\t   height: 0;\n\t\t\t\t\t   border-left: ${f.arrowSize} solid transparent;\n\t\t\t\t\t   border-right: ${f.arrowSize} solid transparent;\n\t\t\t\t\t   border-top: ${f.arrowSize} solid ${f.arrowColor};\n\t\t\t\t\t   transition: transform 0.3s ease;\n\t\t\t\t\t   z-index: 1;\n\t\t\t\t\t}\n\t\t\t\t\t.${f.wrapperClass}.${f.openClass} .${f.triggerClass}::after {\n\t\t\t\t\t   transform: translateY(-50%) rotate(180deg);\n\t\t\t\t\t   z-index: 1;  \n\t\t\t\t\t}\n\t\t\t\t\t.${f.triggerClass} {\n\t\t\t\t\t   position: relative;\n\t\t\t\t\t   z-index: 0;\n\t\t\t\t\t}\n\t\t\t\t`,
                document.head.appendChild(ea)));
            if (f.allowHTML) {
                fa.innerHTML = ia;
                if (!f.pointer?.startsWith("question_") && !f.pointer?.startsWith("checkbox_") && "checkbox" !== f.pointer && (r = S.querySelector("option:checked"), !0 === f.tag && r && r.getAttribute("tag"))) {
                    r = r.getAttribute("tag");
                    ia = document.createElement("span");
                    ea = f.tagStyle || {};
                    var oa = f.tagMap || {},
                        ka = {
                            position: "absolute",
                            right: "radio" === f.pointer ? "40px" : "30px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: ea.color || f.tagColor || "#666",
                            fontSize: ea.fontSize || "12px",
                            margin: f.tagMargin
                        };
                    ea.padding && (ka.padding = ea.padding);
                    ea.borderRadius && (ka.borderRadius = ea.borderRadius);
                    ea.fontWeight && (ka.fontWeight = ea.fontWeight);
                    oa[r] && (ka.backgroundColor = oa[r]);
                    Object.assign(ia.style, ka);
                    ia.innerHTML = r;
                    fa.appendChild(ia)
                }
                if (f.pointer && f.pointer.startsWith("question_")) {
                    r = document.createElement("div");
                    r.className = "custom-question trigger-question";
                    Object.assign(r.style, {
                        ...f.questionStyle,
                        width: f.questionSize,
                        height: f.questionSize
                    });
                    if (ia = S.querySelector("option[selected]")) {
                        Object.assign(r.style, {
                            border: `2px solid ${f.questionColor}`,
                            backgroundColor: f.questionColor
                        });
                        r.innerHTML = `<span style="color: white; font-size: calc(${f.questionSize} * 0.6);">\u2713</span>`;
                        ia = ia.getAttribute("tag");
                        if (!0 === f.tag && ia) {
                            ea = document.createElement("span");
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
                            Object.assign(ea.style, c);
                            ea.textContent = ia;
                            fa.appendChild(ea)
                        }
                        W.setAttribute("data-aun", "true")
                    } else r.innerHTML = `<span style="font-size: calc(${f.questionSize} * 0.6);">?</span>`;
                    fa.appendChild(r)
                }
                if ("checkbox" === f.pointer || f.pointer?.startsWith("checkbox_")) fa.style.position = "relative", fa.style.paddingRight = "40px", r = document.createElement("div"), r.className = "custom-checkbox trigger-checkbox", Object.assign(r.style, {
                    ...Y(),
                    border: `2px solid ${f.buttonColor}`,
                    borderRadius: "3px",
                    backgroundColor: "#fff",
                    zIndex: "2",
                    display: "block",
                    width: f.checkboxSize,
                    height: f.checkboxSize
                }), fa.appendChild(r);
                "radio" === f.pointer && (fa.style.position = "relative", fa.style.paddingRight = "40px", r = document.createElement("div"), r.className = "custom-radio trigger-radio", Object.assign(r.style, {
                        ...Y(),
                        border: `2px solid ${f.buttonColor}`,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        width: f.radioSize,
                        height: f.radioSize
                    }), (ia = S.querySelector("option:checked")) &&
                    ia.value && "" !== ia.value && (Object.assign(r.style, {
                        border: `2px solid ${f.radioColor}`
                    }), r.innerHTML = R(f.radioColor, f)), fa.appendChild(r))
            } else fa.textContent = ia, f.pointer?.startsWith("question_") || f.pointer?.startsWith("checkbox_") || "checkbox" === f.pointer || (r = S.querySelector("option:checked"), !0 === f.tag && r && r.getAttribute("tag") && (r = r.getAttribute("tag"), ia = document.createElement("span"), ea = f.tagStyle || {}, oa = f.tagMap || {}, ka = {
                position: "absolute",
                right: "radio" === f.pointer ? "40px" : "30px",
                top: "50%",
                transform: "translateY(-50%)",
                color: ea.color || f.tagColor || "#666",
                fontSize: ea.fontSize || "12px",
                margin: f.tagMargin
            }, ea.padding && (ka.padding = ea.padding), ea.borderRadius && (ka.borderRadius = ea.borderRadius), ea.fontWeight && (ka.fontWeight = ea.fontWeight), oa[r] && (ka.backgroundColor = oa[r]), Object.assign(ia.style, ka), ia.textContent = r, fa.appendChild(ia)));
            var ta = document.createElement("div");
            ta.className = f.optionsClass;
            ta.style.display = "none";
            ta.style.width = "100%";
            ta.style.boxSizing = "border-box";
            "100%" === H ? (W.style.width = H, W.style.boxSizing =
                "border-box", setTimeout(() => {
                    const c = parseInt(window.getComputedStyle(W).paddingLeft) + parseInt(window.getComputedStyle(W).paddingRight);
                    fa.style.width = `calc(100% - ${c}px)`;
                    ta.style.width = `calc(100% - ${c}px)`
                }, 0)) : H && (W.style.width = H);
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
            U && (va.style.maxHeight = U);
            ta.appendChild(va);
            H = p() && !f.slideToggle;
            ja(ta, {
                ...f.optionsStyle,
                position: f.slideToggle ? "static" : "absolute",
                zIndex: H ? "10000" : "1000"
            });
            var wa = {},
                e = f.optionStyle?.padding ? G(f.optionStyle.padding) :
                "10px";
            Array.from(S.options || g.children).forEach((c, b) => {
                const a = document.createElement("div");
                a.className = f.optionClass;
                var h = function(m) {
                    let L = 0;
                    const J = m.className ? m.className.split(" ") : [];
                    if (0 === J.length) return L;
                    let E = J[0],
                        t = !0;
                    for (; t;) t = !1, Array.from(S.options || m.children).forEach(F => {
                        F.hasAttribute("group") && F.getAttribute("group") === E && (L++, F.className && (E = F.className.split(" ")[0], t = !0))
                    });
                    return L
                }(c);
                a.setAttribute("data-level", h);
                h = c.getAttribute("group");
                var d = c.className;
                if (c.hasAttribute("group") ||
                    "true" === c.getAttribute("data-is-group")) {
                    a.classList.add("group-option");
                    a.setAttribute("data-group", h);
                    var k = e;
                    if (d) {
                        var v = d.split(" ")[0];
                        wa[v] && (v = parseFloat(wa[v]), isNaN(v) || (k = v + 10 + "px"))
                    }
                    h && (wa[h] = k);
                    k = document.createElement("div");
                    k.className = "custom-group-arrow";
                    v = da(f);
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
                    m && m.trim() && (a.classList.add("child-option"), a.classList.add(m))
                });
                a.setAttribute("data-value", c.value || c.getAttribute("value") || "");
                k = {
                    ...f.optionStyle
                };
                if ((v = a.classList.contains("child-option")) && k.padding) {
                    const m = k.padding.split(" ");
                    2 === m.length ? (k.paddingTop = m[0], k.paddingBottom = m[0], k.paddingRight = m[1], delete k.padding) : 4 === m.length && (k.paddingTop = m[0], k.paddingRight = m[1], k.paddingBottom = m[2], delete k.padding)
                }
                ja(a, {
                    ...k,
                    position: "relative",
                    paddingRight: c.getAttribute("tag") ? "100px" : "40px"
                });
                a.classList.contains("group-option") && h && wa[h] && a.style.setProperty("padding-left", wa[h], "important");
                v && !a.classList.contains("group-option") && d && (k =
                    d.split(" ")[0], d = e, wa[k] && (k = parseFloat(wa[k]), isNaN(k) || (d = k + 10 + "px")), a.style.setProperty("padding-left", d, "important"));
                a.classList.contains("group-option") && a._updateGroupPadding && a._updateGroupPadding();
                a.style.whiteSpace = "nowrap";
                a.style.overflow = "hidden";
                a.style.textOverflow = "ellipsis";
                b === S.options.length - 1 && (a.style.borderBottom = "none");
                !f.dot || f.pointer?.startsWith("question_") || c.hasAttribute("group") || c.getAttribute("data-is-group") || a.querySelector(".custom-dot") || (b = document.createElement("div"),
                    b.className = "custom-dot", Object.assign(b.style, f.dotStyle), (c.selected || c.hasAttribute("selected")) && Object.assign(b.style, f.dotSelectedStyle), f.pointer && (b.style.right = "40px"), a.appendChild(b));
                c.hasAttribute("img") && (b = c.getAttribute("img"), Object.assign(a.style, {
                    backgroundImage: `url(${b})`,
                    backgroundRepeat: "no-repeat"
                }), b = new ResizeObserver(m => {
                    const L = m[0].contentRect.height;
                    if (0 < L) {
                        var J = $(m[0].target);
                        J.hasClass("child-option") ? (J = 20 * (parseInt(J.attr("data-level")) || 1), m[0].target.style.setProperty("--image-size",
                            L + 8 + "px"), Object.assign(m[0].target.style, {
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
                if (b = c.getAttribute("tag")) d = f.tagStyle || {}, k = f.tagMap || {}, v = {
                    position: "absolute",
                    right: f.pointer ? "40px" : "30px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: d.color || f.tagColor || "#666",
                    fontSize: d.fontSize || "12px",
                    margin: f.tagMargin
                }, d.padding && (v.padding = d.padding), d.borderRadius && (v.borderRadius = d.borderRadius), d.fontWeight && (v.fontWeight = d.fontWeight), k[b] && (v.backgroundColor = k[b]), d = $("<span>").css(v), f.allowHTML ? d.html(b) : d.text(b), a.appendChild(d[0]);
                "checkbox" !== f.pointer && !f.pointer?.startsWith("checkbox_") || c.hasAttribute("group") || "true" === c.getAttribute("data-is-group") || a.classList.contains("group-option") || (a.style.position = "relative",
                    a.style.paddingRight = "40px", b = c.selected || c.hasAttribute("selected"), a.setAttribute("data-checked", b ? "true" : "false"), d = document.createElement("div"), d.className = "custom-checkbox option-checkbox", Object.assign(d.style, {
                        ...Y(),
                        border: b ? `2px solid ${f.checkboxColor}` : `2px solid ${f.buttonColor}`,
                        borderRadius: "3px",
                        backgroundColor: b ? f.checkboxColor : "#fff",
                        zIndex: "2",
                        display: "block",
                        width: f.checkboxSize,
                        height: f.checkboxSize
                    }), b && (d.innerHTML = V(f.checkboxSize)), a.appendChild(d));
                "radio" !== f.pointer || h ||
                    (a.style.position = "relative", a.style.paddingRight = "40px", b = document.createElement("div"), b.className = "custom-radio", Object.assign(b.style, {
                        ...Y(),
                        border: `2px solid ${f.buttonColor}`,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        zIndex: "2",
                        width: f.radioSize,
                        height: f.radioSize
                    }), (c.selected || c.hasAttribute("selected")) && (c.value || c.getAttribute("value")) && (Object.assign(b.style, {
                        border: `2px solid ${f.radioColor}`
                    }), b.innerHTML = R(f.radioColor, f)), (c.disabled || c.hasAttribute("disabled")) && Object.assign(b.style, {
                        border: `2px solid ${f.buttonColor}`,
                        backgroundColor: "#f5f5f5",
                        cursor: "not-allowed"
                    }), a.appendChild(b));
                f.pointer && f.pointer.startsWith("question_") && !h && (b = document.createElement("div"), b.className = "custom-question option-question", Object.assign(b.style, f.questionStyle), b.innerHTML = "?", a.appendChild(b));
                f.allowHTML ? (b = c.innerHTML, b = b.replace(/\x3c!--([\s\S]*?)--\x3e/g, (m, L) => L.trim()), a.insertAdjacentHTML("afterbegin", b)) : a.insertAdjacentText("afterbegin", c.textContent);
                !c.disabled && !c.hasAttribute("disabled") ||
                    h || (a.classList.add("disabled"), ja(a, f.disabledStyle));
                !c.selected && !c.hasAttribute("selected") || h || (a.classList.add("selected"), ja(a, f.selectedOptionStyle));
                va.appendChild(a)
            });
            y.appendChild(fa);
            W.appendChild(y);
            W.appendChild(ta);
            f.scrollColor && (W.id || (W.id = "select-scroll-" + Math.random().toString(36).substr(2, 9)), na($(W), f));
            y = S.parentNode;
            H = S.nextSibling;
            S.style.display = "none";
            W.insertBefore(S, W.firstChild);
            H ? y.insertBefore(W, H) : y.appendChild(W);
            S._needsExpandGroup && (setTimeout(() => {
                if ($(W).find(`[class*="-option"][data-value="${ya.value}"]`).length) {
                    const c =
                        ya.className?.split(" ") || [],
                        b = new Set;

                    function a(h) {
                        if (h && !b.has(h)) {
                            b.add(h);
                            var d = $(W).find(`[data-group="${h}"]`);
                            d.length && (d.addClass("expanded"), d.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), $(W).find(`.${h}`).show(), (d.attr("class")?.split(" ") || []).forEach(k => {
                                "group-option" !== k && "expanded" !== k && a(k)
                            }))
                        }
                    }
                    c.forEach(h => a(h))
                }
            }, 0), delete S._needsExpandGroup);
            $(W).data("isTriggeredOnce", !1);
            !0 === f.onclick && setTimeout(() => {
                const c = $(W).find(`.${f.triggerClass}`);
                $(W).data("isInitialOpen", !0);
                c.trigger("click")
            }, 0);
            W.setAttribute("data-duration", x);
            W.setAttribute("data-slide-toggle", f.slideToggle)
        }
    });
    if (!window._gong_tea_yun_2) {
        window._gong_tea_yun_2 = !0;
        let g = !1,
            G = !1,
            y = !1,
            r = !1,
            H = null,
            U = !1,
            f = !1;
        $(document).on("mousedown", '[class*="-wrapper"], [class*="-trigger"], [class*="-options"], [class*="-option"]', function(e) {
            e.stopPropagation();
            y = G = !0;
            S = !1;
            U = !0;
            window._isMouseDown_gong = !0;
            e = $(this).closest('[class*="-wrapper"]');
            window._gong_tea_yun_3 = e
        });
        $(document).on("mouseup",
            function(e) {
                window._isMouseDown_gong = !1;
                if (G) {
                    var c = y,
                        b = 0 < $(e.target).closest('[class*="-wrapper"]').length;
                    y = G = !1;
                    c && f && b && (e.stopPropagation(), e.preventDefault(), $(e.target).closest('[class*="-wrapper"]'));
                    window._gong_tea_yun_3 = null;
                    f = !1;
                    setTimeout(() => {
                        U = !1
                    }, 300)
                }
            });
        $(document).on("keydown", '[class*="-wrapper"], [class*="-trigger"]', function(e) {
            var c = $(this).closest('[class*="-wrapper"]');
            if (c.length) {
                var b = c.data("settings");
                if (b) {
                    var a = c.find(`.${b.triggerClass}`),
                        h = c.find(`.${b.optionClass}:not(.disabled)`),
                        d = c.hasClass(b.openClass),
                        k = c.find(`.${b.optionClass}.${b.highlightedClass}`);
                    switch (e.keyCode) {
                        case 13:
                            return e.preventDefault(), e.stopPropagation(), d ? k.length ? k.hasClass("group-option") ? k.trigger("click") : (e = new MouseEvent("click", {
                                bubbles: !0,
                                cancelable: !0,
                                view: window
                            }), c = b.offclick, b.offclick = !1, k[0].dispatchEvent(e), b.offclick = c) : a.trigger("click") : (a.trigger("click"), k.length || h.first().addClass(b.highlightedClass).css("background-color", b.activeBackground)), !1;
                        case 40:
                        case 38:
                            e.preventDefault();
                            e.stopPropagation();
                            e = 38 === e.keyCode;
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
                            k.length ? (c = d.index(k), k = e ? d.eq(Math.max(0, c - 1)) : c < d.length - 1 ? d.eq(c + 1) : k) : k = d.first();
                            k.length && (k.hasClass("selected") && b.selectedBg ? k.css("opacity", "0.7") : k.addClass(b.highlightedClass).css("background-color",
                                b.activeBackground), c = k.position().top, d = c + k.outerHeight(), !e && (d >= h || k.is(":last-child")) ? a.scrollTop(d + 1 - h) : e && (0 >= c || k.is(":first-child")) && a.scrollTop(c));
                            return !1;
                        case 27:
                            return e.preventDefault(), e.stopPropagation(), d && a.trigger("click"), !1;
                        case 32:
                            return e.preventDefault(), e.stopPropagation(), d || a.trigger("click"), !1
                    }
                }
            }
        });
        $(document).on("mouseenter", '[class*="-option"]', function(e) {
            e.stopPropagation();
            e = $(this);
            var c = e.closest('[class*="-wrapper"]');
            const b = c.data("settings");
            b && !e.hasClass("disabled") &&
                (e.hasClass("selected") && b.selectedBg ? e.css("opacity", "0.7") : (c.find('[class*="-option"]:not(.disabled)').not(e).each(function() {
                        $(this).removeClass(b.highlightedClass);
                        if ($(this).hasClass("selected")) b.selectedBg && (a = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, $(this).attr("style", ($(this).attr("style") || "") + `; background-color: ${a} !important;`));
                        else {
                            var a = ($(this).attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                            $(this).attr("style", a)
                        }
                    }), e.addClass(b.highlightedClass),
                    (e.hasClass("selected") || ("checkbox" === b.pointer || b.pointer?.startsWith("checkbox_")) && "true" === e.attr("data-checked")) && b.selectedBg ? (c = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, e.attr("style", (e.attr("style") || "") + `; background-color: ${c} !important;`)) : e.css("background-color", b.activeBackground)))
        });
        $(document).on("mouseleave", '[class*="-option"]', function() {
            const e = $(this),
                c = e.closest('[class*="-wrapper"]').data("settings");
            if (c && !e.hasClass("disabled")) {
                var b = e.hasClass("selected") ||
                    ("checkbox" === c.pointer || c.pointer?.startsWith("checkbox_")) && "true" === e.attr("data-checked");
                b && c.selectedBg ? e.css("opacity", "1") : (e.removeClass(c.highlightedClass), b && c.selectedBg ? (b = !0 === c.selectedBg ? rgbToRgba(c.activeBackground, .5) : c.selectedBg, e.attr("style", (e.attr("style") || "") + `; background-color: ${b} !important;`)) : (b = (e.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), e.attr("style", b), setTimeout(() => {
                    e.hasClass(c.highlightedClass) || e.css("background-color", c.optionsStyle.background ||
                        "")
                }, 0)))
            }
        });
        let S = !1;
        $(document).on("mousemove", '[class*="-wrapper"]', function(e) {
            G && y && (S = !0)
        });
        $(document).on("mousemove", '[class*="-option"]:not(.disabled)', function() {});
        let W = null;
        $(document).on("touchstart", '[class*="-option"]', function(e) {
            W && clearTimeout(W);
            const c = $(this);
            r = !0;
            if (c.hasClass("disabled")) H = null;
            else {
                var b = c.closest('[class*="-wrapper"]'),
                    a = b.data("settings");
                a && (H = this, b.find('[class*="-option"]').removeClass(a.highlightedClass), b.find('[class*="-option"]').each(function() {
                    const h =
                        $(this);
                    if (h.hasClass("selected") && a.selectedBg) {
                        var d = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                        h.attr("style", (h.attr("style") || "") + `; background-color: ${d} !important;`)
                    } else d = (h.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), h.attr("style", d)
                }), W = setTimeout(() => {
                    if (H === this)
                        if (c.hasClass("selected") && a.selectedBg) c.css("opacity", "0.7");
                        else if (c.addClass(a.highlightedClass), c.hasClass("selected") && a.selectedBg) {
                        const h = !0 === a.selectedBg ? rgbToRgba(a.activeBackground,
                            .5) : a.selectedBg;
                        c.attr("style", (c.attr("style") || "") + `; background-color: ${h} !important;`)
                    } else c.css("background-color", a.activeBackground)
                }, 0), e.stopPropagation())
            }
        });
        $(document).on("touchmove", '[class*="-wrapper"]', function(e) {
            r && $(this).data("settings")
        }, {
            passive: !1
        });
        $(document).on("touchend", function() {
            if (r) {
                if (H) {
                    const e = $(H).closest('[class*="-wrapper"]'),
                        c = e.data("settings");
                    c && (e.find('[class*="-option"]').removeClass(c.highlightedClass), e.find('[class*="-option"]').each(function() {
                        const b =
                            $(this);
                        if (b.hasClass("selected") && c.selectedBg) {
                            var a = !0 === c.selectedBg ? rgbToRgba(c.activeBackground, .5) : c.selectedBg;
                            b.attr("style", (b.attr("style") || "") + `; background-color: ${a} !important;`);
                            b.css("opacity", "1")
                        } else a = (b.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), b.attr("style", a)
                    }))
                }
                r = !1;
                H = null
            }
        });
        $(document).on("touchend", '[class*="-option"]:not(.disabled)', function(e) {
            60 > Date.now() - 0 && this === H && $(this).trigger("click");
            e.stopPropagation()
        });
        $(document).on("click", "[data-group]",
            function(e) {
                function c(t) {
                    function F(w) {
                        a.find("." + w).each(function() {
                            var B = $(this);
                            u.add(this);
                            if (B.attr("group") || B.data("group")) B = B.attr("group") || B.data("group"), F(B)
                        })
                    }
                    const u = new Set;
                    t = t.data("group");
                    F(t);
                    return u
                }
                e.preventDefault();
                e.stopPropagation();
                U = window._isGroupClick = !0;
                const b = $(this).closest('[class*="-wrapper"]'),
                    a = b.find('[class*="-options"]'),
                    h = a.find("div").first(),
                    d = b.data("settings"),
                    k = parseInt(b.attr("data-duration")),
                    v = p() ? a : h,
                    m = p() ? v.scrollTop() : null;
                p();
                const L = () => {
                        window._heightCache ||
                            (window._heightCache = new Map);
                        let t = 0;
                        const F = [];
                        a.find("li, option").each(function() {
                            "none" !== $(this).css("display") && F.push(this)
                        });
                        F.forEach(u => {
                            const w = $(u);
                            var B = u.id || w.data("height-id");
                            u = window._heightCache.get(B);
                            u || (u = w.outerHeight(!0), B ? window._heightCache.set(B, u) : (B = "height-" + Math.random().toString(36).substr(2, 9), w.data("height-id", B), window._heightCache.set(B, u)));
                            t += u
                        });
                        requestAnimationFrame(() => {
                            const u = Math.min(t, d.Mheight),
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
                e = $(this).hasClass("expanded");
                $(this).toggleClass("expanded");
                var E = $(this).find(".custom-group-arrow");
                if (e) {
                    E.css("transform", "translateY(-50%) rotate(0deg)");
                    e = c($(this));
                    const t = {};
                    e.forEach(w => {
                        w = $(w);
                        const B = w.attr("group") || w.data("group");
                        B && B !== J && (t[B] = w.hasClass("expanded"))
                    });
                    $(this).data("childStates", t);
                    const F =
                        new Set(e);
                    e.forEach(w => {
                        w = $(w);
                        const B = w.attr("group") || w.data("group");
                        B && B !== J && a.find("." + B).filter(function() {
                            const ba = $(this);
                            return (ba.attr("group") || ba.data("group")) !== B
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
                    E.css("transform", "translateY(-50%) rotate(180deg)");
                    E = a.find("." + J);
                    e = !$(this).closest("li").hasClass(J);
                    const t = $(this).data("childStates"),
                        F = [];
                    E = E.filter(function() {
                        const u = $(this),
                            w = u.attr("group") || u.data("group");
                        return w && w !== J ? (F.push({
                            $element: u,
                            groupName: w,
                            wasExpanded: t && t[w] || !1
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
                    0 < E.length && E.css("opacity",
                        "0.1").slideDown(k, {
                        useQueue: !1
                    }, function() {
                        $(this).css("opacity", "1");
                        this.style && this.style.setProperty("opacity", "1", "important");
                        L()
                    });
                    e && !p() ? (e = 0 < E.length ? E.first().outerHeight() : 0, E = v[0] || v, v.animate && "function" === typeof v.animate ? v.animate({
                        scrollTop: e
                    }, k) : E && "function" === typeof E.scrollTo ? E.scrollTo({
                        top: e,
                        behavior: "smooth"
                    }) : E && (E.scrollTop = e)) : e && p() && null !== m && setTimeout(() => {
                        v.scrollTop(m)
                    }, k + 50);
                    F.forEach(function(u) {
                        const w = u.$element,
                            B = u.groupName;
                        u = u.wasExpanded;
                        w.css("opacity", "1");
                        w[0] && w[0].style && w[0].style.setProperty("opacity", "1", "important");
                        u ? (w.addClass("expanded").find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), a.find("." + B).filter(function() {
                            const ba = $(this);
                            return (ba.attr("group") || ba.data("group")) !== B
                        }).css("opacity", "0.1").slideDown(k, {
                            useQueue: !1
                        }, function() {
                            $(this).css("opacity", "1");
                            this.style && this.style.setProperty("opacity", "1", "important");
                            L()
                        })) : (w.removeClass("expanded").find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)"),
                            a.find("." + B).filter(function() {
                                const ba = $(this);
                                return (ba.attr("group") || ba.data("group")) !== B
                            }).hide())
                    })
                }
                setTimeout(() => {
                    U = window._isGroupClick = !1;
                    b.data("groupClicked", !1)
                }, 300);
                return !1
            });

        function fa(e, c, b, a) {
            const h = b.pointer.split("_")[1],
                d = h + "_return";
            if ("function" === typeof window[h]) {
                e[0].setAttribute("data-aun", "true");
                a = e.find("select, ul").first();
                c = c.index();
                var k = a.find("option").eq(c);
                const v = k.val(),
                    m = A(k.html(), 1),
                    L = A(k.html());
                k = k.attr("tag");
                a = q(n(a[0], v, c).text);
                window[h]({
                    value: v,
                    text: m,
                    html: L,
                    tag: k,
                    group: a,
                    index: c
                });
                window[h + "_close"] = function() {
                    const J = $('[data-state="opened"][data-aun="true"]').filter(function() {
                        const B = $(this).data("settings");
                        return B && B.pointer === `question_${h}`
                    });
                    if (!J.length) return !1;
                    const E = J.data("settings"),
                        t = J.find(`.${E.optionsClass}`),
                        F = parseInt(J.attr("data-duration")),
                        u = p(),
                        w = $(".select-overlay");
                    w.css("background-color", "rgba(0, 0, 0, 0)");
                    setTimeout(() => {
                        w.hide()
                    }, F);
                    J[0].removeAttribute("data-aun");
                    J.removeClass(E.openClass);
                    J.attr("data-state",
                        "closed");
                    u && !E.slideToggle ? O(t, F, w, E) : D(t, F, E);
                    return !0
                };
                window[d] = function(J, E, t) {
                    e.data("forcedClose", !0);
                    const F = e.find(`.${b.triggerClass}`),
                        u = e.find(`.${b.optionsClass}`),
                        w = parseInt(e.attr("data-duration")),
                        B = p(),
                        ba = $(".select-overlay");
                    ba.css("background-color", "rgba(0, 0, 0, 0)");
                    setTimeout(() => {
                        ba.hide()
                    }, w);
                    var K = "";
                    let Q = null;
                    "function" === typeof E ? Q = E : (K = E, Q = t);
                    E = J.split(": ")[1];
                    E = e.find("select, ul").first().find(`option[value="${E}"]`);
                    K = K || E.attr("tag");
                    if (b.allowHTML)
                        if (!0 === b.tag &&
                            K) {
                            E = b.tagStyle || {};
                            t = b.tagMap || {};
                            const ra = {
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: E.color || b.tagColor || "#666",
                                fontSize: E.fontSize || "12px",
                                right: "radio" === b.pointer || b.pointer.includes("question_") ? "40px" : "30px",
                                margin: b.tagMargin
                            };
                            E.padding && (ra.padding = E.padding);
                            E.borderRadius && (ra.borderRadius = E.borderRadius);
                            E.fontWeight && (ra.fontWeight = E.fontWeight);
                            t[K] && (ra.backgroundColor = t[K]);
                            K = $("<span>").css(ra).html(K);
                            F.html(J).append(K)
                        } else F.html(J);
                    else F.text(J);
                    e.attr("data-aun",
                        "true");
                    J = $("<div>").addClass("custom-question trigger-question").css({
                        ...b.questionStyle,
                        border: `2px solid ${b.questionColor}`,
                        backgroundColor: b.questionColor,
                        width: b.questionSize,
                        height: b.questionSize
                    }).html(`<span style="color: white; font-size: calc(${b.questionSize} * 0.6);">\u2713</span>`);
                    F.append(J);
                    e.removeClass(b.openClass);
                    e.attr("data-state", "closed");
                    B && !b.slideToggle ? O(u, w, ba, b) : u.slideToggle(w, {
                        easing: b.easing
                    });
                    "function" === typeof Q && Q();
                    delete window[d];
                    return !0
                }
            }
            return !1
        }

        function ia(e,
            c, b, a) {
            if (!c.hasClass(b.optionClass) || c.data("processing")) return !1;
            c.data("processing", !0);
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
                    K.className =
                        "custom-checkbox option-checkbox";
                    const Q = "true" === c.attr("data-checked");
                    Object.assign(K.style, {
                        ...Y(),
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
                    J = e.find('[data-checked="true"]').get(),
                    E = (a = !L) ? J.length + 1 : J.length - 1,
                    t = e.find("select").first(),
                    F = c.index(),
                    u = t.find("option").eq(F),
                    w = {
                        value: u.val(),
                        text: A(u.html(), 1),
                        html: A(u.html()),
                        tag: u.attr("tag"),
                        checked: a,
                        index: F,
                        count: E,
                        group: q(n(t[0], u.val(), F).text)
                    };
                if (b.pointer?.startsWith("checkbox_")) {
                    const K = b.pointer.split("checkbox_")[1];
                    if ("function" === typeof window[K] && !1 === window[K](w)) return c.data("processing", !1), !1
                }
                c.attr("data-checked", a.toString());
                e.attr("data-check-count", E);

                function B(K,
                    Q, ra) {
                    return {
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: `calc(${K} + ${4}px)`,
                        height: `calc(${K} + ${4}px)`,
                        borderRadius: "3px",
                        border: `${2}px solid ${ra?Q:b.buttonColor}`,
                        backgroundColor: ra ? Q : "#fff",
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
                        ...Y(),
                        borderRadius: "3px",
                        zIndex: "2",
                        display: "block",
                        width: b.checkboxSize,
                        height: b.checkboxSize
                    });
                    c.append(K);
                    h = c.find(".custom-checkbox")
                }
                const ba = e.find(`.${b.triggerClass}`).find(".custom-checkbox");
                a ? (h.css(B(b.checkboxSize, b.checkboxColor, !0)).html(V(b.checkboxSize)), 0 < E && ba.css(B(b.checkboxSize, b.checkboxColor, !0)).html(C(E, b.checkboxSize))) : (h.css(B(b.checkboxSize, b.buttonColor, !1)).empty(), 0 === E ? ba.css(B(b.checkboxSize, b.buttonColor, !1)).empty() : ba.css(B(b.checkboxSize, b.checkboxColor, !0)).html(C(E,
                    b.checkboxSize)));
                if (b.selectedBg) {
                    const K = !0 === b.selectedBg ? rgbToRgba(b.activeBackground, .5) : b.selectedBg;
                    $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${K} !important; }</style>`);
                    e.find(`.${b.optionClass}`).each(function() {
                        const Q = $(this);
                        "true" === Q.attr("data-checked") ? (Q.addClass("selected").addClass("selected-bg-active"), Q[0].style.setProperty("background-color", K, "important")) : (Q.removeClass("selected").removeClass("selected-bg-active"),
                            Q[0].style.removeProperty("background-color"));
                        Q.css("font-weight", "normal")
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
                    const K = parseInt(e.attr("data-duration")),
                        Q = e.find(`.${b.optionsClass}`),
                        ra = p(),
                        za = $(".select-overlay");
                    ra && !b.slideToggle ? z(Q, K, za, e, b) : (e.removeClass(b.openClass),
                        za.css("pointer-events", "none").hide(), K ? Q.slideToggle(K, {
                            easing: b.easing,
                            complete: () => {
                                setTimeout(() => {
                                    za.css("pointer-events", "");
                                    c.data("processing", !1)
                                }, 50)
                            }
                        }) : (Q.hide(), za.css("pointer-events", ""), setTimeout(() => {
                            c.data("processing", !1)
                        }, 50)))
                }
                return !1
            } catch (h) {
                return console.error("[handleCheckboxPointer] \uc5d0\ub7ec \ubc1c\uc0dd:", h), c.data("processing", !1), !1
            } finally {
                setTimeout(() => {
                    c.data("processing") && (console.warn("[handleCheckboxPointer] \ud50c\ub798\uadf8 \uac15\uc81c \ud574\uc81c"),
                        c.data("processing", !1))
                }, 1E3)
            }
        }

        function ya(e, c, b) {
            const a = e.find(`.${b.triggerClass}`),
                h = parseInt(e.attr("data-selected-index"));
            let d = a.find(".custom-radio");
            d.length ? d = d[0] : (d = document.createElement("div"), d.className = "custom-radio trigger-radio");
            Object.assign(d.style, {
                ...Y(),
                border: void 0 !== c ? `2px solid ${b.radioColor}` : `2px solid ${b.buttonColor}`,
                borderRadius: "50%",
                backgroundColor: "#fff",
                width: b.radioSize,
                height: b.radioSize
            });
            d.innerHTML = void 0 !== c ? R(b.radioColor, b) : "";
            e.find(".custom-radio").not(".trigger-radio").each(function() {
                const v =
                    $(this).closest('[class*="-option"]');
                var m = v.attr("data-value");
                const L = v.index();
                m = m === c && L === h;
                Object.assign(this.style, {
                    border: m ? `2px solid ${b.radioColor}` : `2px solid ${b.buttonColor}`,
                    backgroundColor: "#fff"
                });
                m ? (this.innerHTML = R(b.radioColor, b), v.addClass("selected"), b.selectedBg || v.css("font-weight", "bold")) : (this.innerHTML = "", v.removeClass("selected").css("font-weight", "normal"))
            });
            a.find(".custom-radio").remove();
            a.append(d);
            var k = e.find("select").first();
            e = k.find("option").eq(h);
            e.length &&
                (k = n(k[0], e.val(), h), e.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim(), a.html(k.text + d.outerHTML));
            domqueryFocus()
        }

        function ea(e, c) {
            e.attr("data-selected-value", "");
            e.attr("data-selected-index", "-1");
            const b = e.find(`.${c.triggerClass}`),
                a = e.find("select, ul").first();
            var h = a.find("option").first();
            h = c.allowHTML ? h.html() : h.text();
            b.find(".custom-radio").remove();
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
            c.allowHTML ? b.html(h + d.outerHTML) : (b.text(h), b.append(d));
            e.find(".custom-radio").not(".trigger-radio").each(function() {
                const k = $(this).closest(`.${c.optionClass}`);
                $(this).css({
                    border: `2px solid ${c.buttonColor}`,
                    backgroundColor: "#fff"
                }).empty();
                k.removeClass("selected").css("font-weight", "normal");
                c.selectedBg && k.removeClass("selected-bg-active").css("background-color", "")
            });
            a.find("option").prop("selected", !1);
            ka(e)
        }

        function oa(e, c) {
            e.attr("data-check-count", "0");
            e.find(`.${c.triggerClass}`).find(".custom-checkbox").css({
                border: `2px solid ${c.buttonColor}`,
                backgroundColor: "#fff"
            }).empty();
            e.find(".custom-checkbox").not(".trigger-checkbox").each(function() {
                const b = $(this).closest(`.${c.optionClass}`);
                b.attr("data-checked", "false");
                $(this).css({
                    border: `2px solid ${c.buttonColor}`,
                    backgroundColor: "#fff"
                }).empty();
                c.selectedBg && b.removeClass("selected-bg-active").css("background-color", "")
            });
            ka(e)
        }

        function ka(e) {
            const c =
                e.find('[class*="-options"]');
            parseInt(e.attr("data-duration"));
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

        function ta(e, c) {
            const b = ["custom-checkbox",
                "custom-radio", "custom-question", "custom-dot"
            ];
            Array.from(e.childNodes).forEach(h => {
                (h.nodeType === Node.TEXT_NODE || h.nodeType === Node.ELEMENT_NODE && !b.some(d => h.classList.contains(d))) && h.remove()
            });
            c = document.createTextNode(c.replace(/<[^>]*>/g, ""));
            const a = Array.from(e.childNodes).find(h => h.nodeType === Node.ELEMENT_NODE && b.some(d => h.classList.contains(d)));
            a ? e.insertBefore(c, a) : e.appendChild(c)
        }

        function va(e, c) {
            const b = e.find(`.${c.triggerClass}`),
                a = e.find("select, ul").first().find("li, option").first().html(),
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
            h ? ta(b[0], a) : b.html(a);
            c.selectedBg && e.find(`.${c.optionClass}`).each(function() {
                $(this).removeClass("selected-bg-active").css("background-color",
                    "")
            });
            ka(e)
        }

        function wa(e, c, b) {
            const a = e.find("select, ul").first();
            c = c.find(`.${b.optionClass}`).first();
            if ("checkbox" === b.pointer || b.pointer?.startsWith("checkbox_")) c.hide();
            else if ("radio" === b.pointer) - 1 < parseInt(e.attr("data-selected-index") || "-1") ? c.show() : c.hide();
            else {
                b = e.attr("data-selected-value");
                const h = parseInt(e.attr("data-selected-index"));
                0 < a.find("option[group]").length ? -1 === h && void 0 === b || 0 === h && (!b || "" === b) ? (c.hide(), ka(e)) : c.show() : (-1 !== h || b && "" !== b) && (0 !== h || b && "" !== b) ? c.show() :
                    c.hide()
            }
        }
        $(document).on("click", '[class*="-option"]', function(e) {
            e.stopPropagation();
            ua = 3;
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
                c.hasClass("selected") && "checkbox" !== a.pointer && !a.pointer?.startsWith("checkbox_") &&
                    (c.removeClass("selected"), c.removeClass(a.highlightedClass), c.removeClass("selected-bg-active"), c.css("font-weight", "normal"), a.selectedBg && c[0].style.removeProperty("background-color"), c[0].classList.remove("selected"), c[0].classList.remove(a.highlightedClass), c[0].classList.remove("selected-bg-active"));
                b.attr("data-current-index", k);
                if ((c.attr("group") || c.attr("data-group")) && !c.attr("value")) return e.preventDefault(), b.data("groupClicked", !0), !1;
                b.data("groupClicked", !1);
                "undefined" !== typeof S &&
                    S && (S = !1);
                S = !1;
                if ("undefined" !== typeof g && g) e.preventDefault(), e.stopPropagation(), b.removeData("optionClickProcessing");
                else {
                    if (c.hasClass("disabled")) return e.preventDefault(), b.removeData("optionClickProcessing"), !1;
                    if (a.pointer && a.pointer.startsWith("question_") && (e.preventDefault(), e.stopPropagation(), !1 === fa(b, c, a, e))) return b.removeData("optionClickProcessing"), !1;
                    if (0 === c.index() || "" === c.attr("data-value") || !c.attr("data-value")) switch (a.pointer) {
                        case "radio":
                            ea(b, a);
                            break;
                        case "checkbox":
                            oa(b,
                                a);
                            break;
                        default:
                            va(b, a)
                    }
                    0 < h.find("option[group]").length && 0 === k && (!d || "" === d) && ka(b);
                    if ("radio" !== a.pointer || 0 !== k && d && "" !== d) {
                        if ("checkbox" === a.pointer || a.pointer?.startsWith("checkbox_")) return e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), d = ia(b, c, a, e), b.removeData("optionClickProcessing"), d;
                        if (0 === k && (!d || "" === d)) {
                            if (b.data("processingReset")) return !1;
                            b.data("processingReset", !0);
                            try {
                                b.attr("data-selected-value", "");
                                b.attr("data-selected-index", "-1");
                                var v = h[0];
                                const B =
                                    h.find("li, option").first().html();
                                var m = h.find("option").eq(0);
                                const ba = b.find(`.${a.triggerClass}`);
                                if ("checkbox" === a.pointer || a.pointer?.startsWith("checkbox_")) {
                                    const K = a.allowHTML ? B : h.find("li, option").first().text();
                                    ta(ba[0], K)
                                } else a.allowHTML ? ba.html(B) : ba.text(h.find("li, option").first().text());
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
                                    k = function(K, Q = 0) {
                                        return 1 === Q ? K.replace(/\x3c!--(.*?)--\x3e/g, "$1").replace(/<[^>]*>/g, "") : K.replace(/\x3c!--(.*?)--\x3e/g, "$1")
                                    };
                                    d = "";
                                    try {
                                        if ("function" === typeof n) {
                                            const K = n(v, "", 0);
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
                                var t = parseInt(b.attr("data-duration")) || 0,
                                    F = b.find(`.${a.optionsClass}`);
                                p() && !a.slideToggle ? z(F, t, $(".select-overlay"), b, a) : (b.removeClass(a.openClass), b.attr("data-state",
                                    "closed"), F.slideToggle(t, {
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
                        a.selectedBg ? (c.addClass("selected-bg-active"), m = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${m} !important; }</style>`), c[0].style.setProperty("background-color",
                            m, "important"), c.css("font-weight", "normal")) : c.css("font-weight", "bold");
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
                            c = n(v, d, k);
                            m = b.find(`.${a.triggerClass}`);
                            m.empty();
                            if (h.attr("img")) t = h.attr("img"), Object.assign(m[0].style, {
                                backgroundImage: `url(${t})`,
                                backgroundRepeat: "no-repeat"
                            }), t = new ResizeObserver(B => {
                                const ba = B[0].contentRect.height;
                                0 < ba && Object.assign(B[0].target.style, {
                                    backgroundSize: `${ba}px`,
                                    backgroundPosition: `${ba/2}px center`,
                                    paddingLeft: `calc(${2*ba}px)`
                                })
                            }), t.observe(m[0]), window._triggerResizeObservers || (window._triggerResizeObservers = new WeakMap), (F = window._triggerResizeObservers.get(m[0])) && F.disconnect(), window._triggerResizeObservers.set(m[0],
                                t);
                            else if (Object.assign(m[0].style, {
                                    backgroundImage: "none",
                                    backgroundPosition: "initial",
                                    backgroundSize: "initial",
                                    paddingLeft: a.defaultPadding || "10px"
                                }), window._triggerResizeObservers && (t = window._triggerResizeObservers.get(m[0]))) t.disconnect(), window._triggerResizeObservers.delete(m[0]);
                            a.allowHTML ? m.html(c.text) : m.text(c.text);
                            "radio" === a.pointer && (b.attr({
                                "data-selected-value": d,
                                "data-selected-index": k
                            }), ya(b, d, a));
                            t = h.attr("tag") || "";
                            !0 === a.tag && t && (F = document.createElement("span"), L = a.tagStyle || {}, J = a.tagMap || {}, E = {
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: L.color || a.tagColor || "#666",
                                fontSize: L.fontSize || "12px",
                                right: "radio" === a.pointer ? "40px" : "30px",
                                margin: a.tagMargin
                            }, L.padding && (E.padding = L.padding), L.borderRadius && (E.borderRadius = L.borderRadius), L.fontWeight && (E.fontWeight = L.fontWeight), J[t] && (E.backgroundColor = J[t]), Object.assign(F.style, E), a.allowHTML ? F.innerHTML = t : F.textContent = t, m.append(F));
                            d = {
                                value: d,
                                text: A(h.html(), 1),
                                html: A(h.html()),
                                tag: t,
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
                                            const ba = b.find('[class*="-option"].selected');
                                            0 < ba.length && ba.removeClass("selected")
                                        },
                                        B)
                                })
                            };
                        p() && !a.slideToggle ? (z(k, d, u, b, a), w()) : (b.removeClass(a.openClass), b.attr("data-state", "closed"), u.css("background-color", "rgba(0, 0, 0, 0)"), a.slideToggle && void 0 !== a.opacity ? k.slideToggle(d, {
                            easing: a.easing,
                            complete: function() {
                                u.hide();
                                N(b);
                                domqueryFocus();
                                w()
                            }
                        }) : k.css("opacity", "").slideToggle(d, {
                            easing: a.easing,
                            complete: function() {
                                u.hide();
                                N(b);
                                domqueryFocus();
                                w()
                            }
                        }))
                    } else ea(b, a), d = parseInt(b.attr("data-duration")) || 0, k = b.find(`.${a.optionsClass}`), p() && !a.slideToggle ? z(k, d, $(".select-overlay"),
                        b, a) : (b.removeClass(a.openClass), k.slideToggle(d, {
                        easing: a.easing
                    })), b.removeData("optionClickProcessing")
                }
            }
        });
        $(document).on("click", '[class*="-trigger"]', function(e) {
            function c(t) {
                function F() {
                    E || (E = !0, b.data("isInitialOpen") && b.removeData("isInitialOpen"), a.trigger && domquery(a.trigger).trigger("click"), a.triggerOnce && !b.data("isTriggeredOnce") && (domquery(a.triggerOnce).trigger("click"), b.data("isTriggeredOnce", !0)))
                }
                t = p();
                var u = b.find("select").first()[0];
                u._selectId && (u = window._gong_tea_yun_0.get(u._selectId +
                    "_open")) && u.call(this);
                wa(b, d, a);
                const w = parseInt(b.attr("data-selected-index")),
                    B = b.attr("data-selected-value");
                u = B;
                let ba = w;
                const K = b.find('[class*="-option"].selected').first();
                K.length && !u && 0 >= ba && (u = K.attr("value") || K.attr("data-value"), ba = K.index());
                if (0 < ba || u) {
                    var Q;
                    u ? Q = d.find(`[value="${u}"], [data-value="${u}"]`) : 0 < ba && (Q = d.find(`.${a.optionClass}`).eq(ba));
                    if (Q && Q.length && (Q = (Q.attr("class")?.split(" ") || []).filter(T => T !== a.optionClass && "selected" !== T && T !== a.highlightedClass), 0 < Q.length)) {
                        const T =
                            new Set,
                            X = ha => {
                                if (ha && !T.has(ha)) {
                                    T.add(ha);
                                    var ca = d.find(`[data-group="${ha}"]`);
                                    ca.length && (ca.addClass("expanded"), ca.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), d.find(`.${ha}`).show(), (ca.attr("class")?.split(" ") || []).forEach(xa => {
                                        "group-option" !== xa && "expanded" !== xa && X(xa)
                                    }))
                                }
                            };
                        Q.forEach(ha => X(ha));
                        Q = d.css("display");
                        d.css("display", "block");
                        d.outerHeight(!0);
                        d.css("display", Q)
                    }
                }
                const ra = () => {
                        if (("checkbox" === a.pointer || a.pointer?.startsWith("checkbox_")) &&
                            a.selectedBg) {
                            const T = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                            $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${T} !important; }</style>`);
                            b.find('[data-checked="true"]').each(function() {
                                const X = $(this);
                                X.addClass("selected").addClass("selected-bg-active");
                                X[0].style.setProperty("background-color", T, "important");
                                X.css("font-weight", "normal")
                            });
                            b.find(`.${a.optionClass}`).not('[data-checked="true"]').each(function() {
                                const X =
                                    $(this);
                                X.removeClass("selected").removeClass("selected-bg-active");
                                X[0].style.removeProperty("background-color");
                                X.css("font-weight", "normal")
                            })
                        }
                    },
                    za = () => {
                        var T = B;
                        let X = w;
                        const ha = b.find('[class*="-option"].selected').first();
                        ha.length && !T && 0 >= X && (T = ha.attr("value") || ha.attr("data-value"), X = ha.index(), (T || 0 < X) && b.attr({
                            "data-selected-value": T || "",
                            "data-selected-index": X
                        }));
                        b.find('[class*="-option"]').each(function() {
                            const ca = $(this);
                            ca.removeClass("selected").removeClass(a.highlightedClass).removeClass("selected-bg-active").css("font-weight",
                                "normal");
                            a.selectedBg && ca[0].style.removeProperty("background-color");
                            this.classList.remove("selected");
                            this.classList.remove(a.highlightedClass);
                            this.classList.remove("selected-bg-active")
                        });
                        if (0 < X || T) {
                            let ca;
                            T ? ca = d.find(`[value="${T}"], [data-value="${T}"]`) : 0 < X && (ca = d.find(`.${a.optionClass}`).eq(X));
                            if (ca && ca.length) {
                                T = (ca.attr("class")?.split(" ") || []).filter(ma => ma !== a.optionClass && "selected" !== ma && ma !== a.highlightedClass);
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
                                T.forEach(ma => sa(ma));
                                ca.addClass("selected").addClass(a.highlightedClass);
                                ca[0].classList.add("selected");
                                ca[0].classList.add(a.highlightedClass);
                                a.selectedBg ? (T = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, ca.attr("style", (ca.attr("style") ||
                                    "") + `; background-color: ${T} !important;`)) : ca.css("font-weight", "bold");
                                if (a.selectedBg) {
                                    const ma = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                                    setTimeout(() => {
                                        ca.attr("style", (ca.attr("style") || "") + `; background-color: ${ma} !important;`)
                                    }, 50);
                                    setTimeout(() => {
                                        ca.attr("style", (ca.attr("style") || "") + `; background-color: ${ma} !important;`)
                                    }, 200)
                                }
                                void 0 !== a.autoScrollToSelected && a.autoScrollToSelected && (T = parseInt(b.attr("data-duration")) || 300, setTimeout(() => {
                                    d.find("div").first().length &&
                                        ca.length && ca[0] && "function" === typeof ca[0].scrollIntoView && ca[0].scrollIntoView({
                                            block: "center",
                                            behavior: "smooth"
                                        })
                                }, T))
                            } else ra()
                        }
                        ra()
                    };
                window.requestAnimationFrame ? requestAnimationFrame(() => {
                    requestAnimationFrame(za)
                }) : setTimeout(za, 0);
                "radio" === a.pointer && (Q = b.find(".trigger-radio"), Q.length && (Object.assign(Q[0].style, {
                    border: `2px solid ${a.buttonColor}`,
                    backgroundColor: "#fff",
                    width: a.radioSize,
                    height: a.radioSize
                }), Q[0].innerHTML = ""));
                $('[class*="-wrapper"]').not(b).each(function() {
                    const T = $(this),
                        X = T.data("settings");
                    if (X) {
                        if (X.pointer && X.pointer.startsWith("question_") && "true" === T.attr("data-aun")) {
                            var ha = X.pointer.split("_")[1];
                            if ("function" === typeof window[ha + "_close"]) return window[ha + "_close"](), domqueryFocus(), !1
                        }
                        ha = T.find(`.${X.optionsClass}`);
                        if (ha.is(":visible")) {
                            const ca = parseInt(T.attr("data-duration"));
                            T.removeClass(X.openClass).attr("data-state", "closed");
                            ca ? X.slideToggle ? ha.css("opacity", X.opacity || 0).slideUp(ca, {
                                easing: a.easing
                            }) : ha.slideUp(ca, {
                                easing: a.easing
                            }) : (X.slideToggle &&
                                ha.css("opacity", X.opacity || 0), ha.hide())
                        }
                    }
                });
                b.addClass(a.openClass);
                b.attr("data-state", "opened");
                aa(b.find('[class*="-option"]'));
                Q = !0 === a.slideToggle;
                if (!Q && (d.is(":visible") || d.css({
                        display: "block",
                        opacity: "0",
                        visibility: "hidden",
                        transition: "opacity 0.15s ease-out"
                    }), u = Z(b, d), d.css(u), setTimeout(function() {
                        d.css({
                            opacity: "1",
                            visibility: "visible"
                        })
                    }, 0), !t)) $(window).off("scroll.select").on("scroll.select", function() {
                    if (d.is(":visible")) {
                        const T = Z(b, d);
                        d.css({
                            top: T.top,
                            bottom: T.bottom,
                            left: T.left
                        })
                    } else $(window).off("scroll.select")
                });
                Q ? (t = a.optionStyle.backgroundColor || a.optionsStyle.background, d.css({
                    opacity: a.opacity || 0,
                    "background-color": t
                }), d.find("div").first().css("background-color", t), d.find(`.${a.optionClass}`).css("background-color", t), d.slideToggle(k, {
                    easing: a.easing,
                    complete: F
                })) : (() => new Promise(T => {
                    const X = b.parent();
                    X.find(".select-overlay").length ? T(X.find(".select-overlay")) : (X.append('<div class="select-overlay"></div>'), setTimeout(() => {
                        const ha = X.find(".select-overlay");
                        T(ha)
                    }, 0))
                }))().then(T => {
                    window._selectCloseTimer &&
                        clearTimeout(window._selectCloseTimer);
                    g = !0;
                    T.off("click.selectOverlay");
                    if (!b.data("groupClicked")) {
                        var X = b.find("select, ul").first()[0]._selectId;
                        X && p() && !a.slideToggle && domquery(this).historyOn("select-" + X, sa => {
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
                                    N(la);
                                    if ("radio" === pa.pointer) {
                                        const Ea = la.attr("data-selected-value"),
                                            Fa = parseInt(la.attr("data-selected-index")),
                                            Ba = la.find(".trigger-radio");
                                        void 0 !== Ea && 0 <= Fa && (Object.assign(Ba[0].style, {
                                            border: `2px solid ${pa.radioColor}`,
                                            backgroundColor: "#fff",
                                            width: pa.radioSize,
                                            height: pa.radioSize
                                        }), Ba.html(R(pa.radioColor, pa)))
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
                    X = Z(b, d);
                    const ha = a.optionsStyle.background || "#fff";
                    T.css({
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
                    d.css({
                        ...X,
                        opacity: 1,
                        display: "none",
                        backgroundColor: ha,
                        height: a.height || "auto",
                        Mheight: a.Mheight || "60vh",
                        minHeight: a.minHeight || "auto",
                        maxHeight: a.maxHeight || (g ? a.Mheight || "60vh" : a.height || "300px"),
                        overflowY: "auto",
                        zIndex: g && !a.slideToggle ? 1E4 : 1E3
                    });
                    d.find("div").first().css("background-color", ha);
                    d.find(`.${a.optionClass}`).css("background-color", ha);
                    let ca = !1,
                        xa = !0;
                    domquery(d).slideToggle(k, {
                        easing: a.easing,
                        complete: () => {
                            F();
                            g = xa = !1
                        }
                    });
                    setTimeout(() => {
                        T.css("background-color", "rgba(0, 0, 0, 0)")
                    }, 0);
                    T.on("click.selectOverlay", function(sa) {
                        if (ca || xa) return !1;
                        ua = 2;
                        const ma = b.find(`.${a.triggerClass}`);
                        ma.css("pointer-events", "none");
                        ca = !0;
                        sa.preventDefault();
                        sa.stopPropagation();
                        T.off("click.selectOverlay");
                        if ("radio" === a.pointer) {
                            sa = b.attr("data-selected-value");
                            const la = parseInt(b.attr("data-selected-index")),
                                pa = b.find(".trigger-radio");
                            void 0 === sa && -1 === la ? pa.css({
                                border: `2px solid ${a.buttonColor}`,
                                backgroundColor: "#fff",
                                width: a.radioSize,
                                height: a.radioSize
                            }).html("") : void 0 !== sa && 0 <= la && pa.css({
                                border: `2px solid ${a.radioColor}`,
                                backgroundColor: "#fff",
                                width: a.radioSize,
                                height: a.radioSize
                            }).html(R(a.radioColor, a))
                        }
                        T.css("background-color", "rgba(0, 0, 0, 0)");
                        window._selectCloseTimer = setTimeout(() => {
                            T.hide();
                            d.hide();
                            b.removeClass(a.openClass);
                            b.attr("data-state", "closed");
                            b.data("groupClicked", !1);
                            U = ca = g = !1;
                            setTimeout(() => {
                                ma.css("pointer-events", "auto")
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
            e.stopPropagation();
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
                        }), J.html(R(a.radioColor, a)))
                    }
                    p() && !a.slideToggle ? z(d, h, $(".select-overlay"), b, a) : (b.removeClass(a.openClass), b.attr("data-state", "closed"), h ? a.slideToggle ? d.css("opacity", a.opacity || 0).slideToggle(h, {
                        easing: a.easing,
                        complete: domqueryFocus
                    }) : d.slideToggle(h, {
                        easing: a.easing,
                        complete: domqueryFocus
                    }) : (d.hide(), domqueryFocus()));
                    return !1
                }
                if (0 <
                    m.length) return m.each(function() {
                    const t = $(this),
                        F = t.data("settings");
                    if (F) {
                        var u = t.find(`.${F.optionsClass}`),
                            w = parseInt(t.attr("data-duration"));
                        t.removeClass(F.openClass).attr("data-state", "closed");
                        p() && !F.slideToggle ? z(u, w || 0, $(".select-overlay"), t, F) : w ? F.slideToggle ? u.css("opacity", F.opacity || 0).slideUp(w, {
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
                    const t = parseInt(b.attr("data-current-index")),
                        F = J.find("option").eq(t);
                    J = {
                        value: F.val(),
                        text: A(F.html(), 1),
                        html: A(F.html()),
                        tag: F.attr("tag"),
                        group: q(n(J[0], F.val(), t).text),
                        index: t
                    };
                    if (L && (e.preventDefault(), e.stopPropagation(), "function" === typeof window[m + "_cancel"])) return window[m + "_reset"] = function() {
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
                    }, window[m + "_cancel"](J), !1;
                    b.find(`.${a.optionClass}`).each(function() {
                        const u = $(this);
                        u.find(".custom-question, .custom-group-arrow").remove();
                        if (u.hasClass("group-option")) {
                            var w = document.createElement("div");
                            w.className = "custom-group-arrow";
                            const ba = da(a);
                            let K = ba.arrowSizeValue;
                            var B = ba.arrowRightValue;
                            Object.assign(w.style, {
                                position: "absolute",
                                right: B,
                                top: "50%",
                                transform: "translateY(-50%) rotate(0deg)",
                                width: "0",
                                height: "0",
                                borderLeft: `${K} solid transparent`,
                                borderRight: `${K} solid transparent`,
                                borderTop: `${K} solid ${ba.arrowColorValue}`,
                                transition: "all 0.3s ease"
                            });
                            u.append(w);
                            w = parseFloat(K);
                            B = parseFloat(B);
                            isNaN(w) || isNaN(B) || u[0].style.setProperty("padding-right", `${2*w+B+10}px`, "important")
                        } else B = document.createElement("div"),
                            B.className = "custom-question option-question", Object.assign(B.style, a.questionStyle), B.innerHTML = `<span style="font-size: calc(${a.questionSize} * 0.6);">?</span>`, u.append(B)
                    })
                }
                m = $('[class*="-wrapper"][class*="open"]').filter(function() {
                    const t = $(this).data("settings");
                    return t && t.pointer && t.pointer.startsWith("question_") && "true" === $(this).attr("data-aun")
                });
                if (m.length) h = m.data("settings").pointer.split("_")[1], "function" === typeof window[h + "_close"] && (window[h + "_close"](), domqueryFocus());
                else {
                    if ("checkbox" ===
                        a.pointer || a.pointer?.startsWith("checkbox_")) m = b.find(`.${a.triggerClass}`), b.find(`.${a.optionClass}`).each(function() {
                        const t = $(this);
                        if (t.hasClass("group-option") || t.attr("data-group") || t.data("group")) t.find(".custom-checkbox").remove();
                        else {
                            var F = "true" === t.attr("data-checked");
                            t.find(".custom-checkbox").remove();
                            const u = document.createElement("div");
                            u.className = "custom-checkbox option-checkbox";
                            Object.assign(u.style, {
                                ...Y(),
                                border: F ? `2px solid ${a.checkboxColor}` : `2px solid ${a.buttonColor}`,
                                borderRadius: "3px",
                                backgroundColor: F ? a.checkboxColor : "#fff",
                                zIndex: "2",
                                display: "block",
                                width: a.checkboxSize,
                                height: a.checkboxSize
                            });
                            F ? (u.innerHTML = V(a.checkboxSize), a.selectedBg && (F = !0 === a.selectedBg ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, t.addClass("selected").addClass("selected-bg-active"), t[0].style.setProperty("background-color", F, "important"), t.css("font-weight", "normal"))) : a.selectedBg && (t.removeClass("selected").removeClass("selected-bg-active"), t[0].style.removeProperty("background-color"),
                                t.css("font-weight", "normal"));
                            t.append(u)
                        }
                    }), m.find(".custom-checkbox").length || (L = document.createElement("div"), L.className = "custom-checkbox trigger-checkbox", J = parseInt(b.attr("data-check-count")) || 0, Object.assign(L.style, {
                            ...Y(),
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
                        }),
                        0 < J && (L.innerHTML = C(J, a.checkboxSize)), m.append(L));
                    if (!a.offclick || !b.hasClass(a.openClass)) {
                        var E = !1;
                        if (h) b.removeClass(a.openClass), b.attr("data-state", "closed"), aa(v), v.removeClass(a.highlightedClass), v.each(function() {
                            const t = $(this);
                            t.hasClass("selected") && a.selectedBg ? (t.addClass("selected-bg-active"), t.css("opacity", "1")) : t.removeClass("selected-bg-active")
                        }), "radio" === a.pointer && (h = b.attr("data-selected-value"), m = b.find(".trigger-radio"), m.length && (void 0 !== h ? (Object.assign(m[0].style, {
                            border: `2px solid ${a.radioColor}`,
                            backgroundColor: "#fff",
                            width: a.radioSize,
                            height: a.radioSize
                        }), m[0].innerHTML = void 0 !== h ? R(a.radioColor, a) : "") : (Object.assign(m[0].style, {
                            border: `2px solid ${a.buttonColor}`,
                            backgroundColor: "#fff",
                            width: a.radioSize,
                            height: a.radioSize
                        }), m[0].innerHTML = ""))), D(d, k, a);
                        else {
                            if (a.delay && 0 < parseInt(a.delay)) {
                                if ("true" === b.attr("data-delay-pending")) return !1;
                                b.attr("data-delay-pending", "true");
                                const t = this;
                                e.preventDefault();
                                e.stopPropagation();
                                setTimeout(function() {
                                    b.removeAttr("data-delay-pending");
                                    c.call(t,
                                        e)
                                }, parseInt(a.delay));
                                return !1
                            }
                            c.call(this, e)
                        }
                    }
                }
            }
        });
        $(document).on("click", function(e) {
            if (U) U = !1;
            else {
                var c = $(e.target),
                    b = c.closest('[class*="-wrapper"]');
                if (c.closest(".group-option").length || b.data("groupClicked")) return e.preventDefault(), e.stopPropagation(), !1;
                e = $('[class*="-wrapper"][class*="open"]');
                e.length && !c.closest('[class*="-wrapper"]').length && (ua = 2, e.each(function() {
                    const a = $(this),
                        h = a.data("settings");
                    if (h && !0 !== h.offclick && (!h.pointer || !h.pointer.startsWith("question_") || "true" !==
                            a.attr("data-aun"))) {
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
                        if (p() && !h.slideToggle) z(d, k, $(".select-overlay"), a, h), v();
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
                                }), J.html(R(h.radioColor, h)))
                            }
                            k ? h.slideToggle ? d.css("opacity", h.opacity || 0).slideToggle(k, {
                                easing: h.easing,
                                complete: function() {
                                    N(a);
                                    v();
                                    domqueryFocus()
                                }
                            }) : d.slideToggle(k, {
                                easing: h.easing,
                                complete: function() {
                                    N(a);
                                    v();
                                    domqueryFocus()
                                }
                            }) : (v(), d.hide(), N(a), domqueryFocus())
                        }
                    }
                }))
            }
        });
        $(document).on("focusin", function(e) {
            e = $(e.target);
            const c =
                e.closest('[class*="-wrapper"]');
            e.is("body") || $('[class*="-wrapper"][class*="open"]').each(function() {
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
                                }), m.html(R(a.radioColor, a)))
                            }
                            d ? a.slideToggle ? h.css("opacity", a.opacity || 0).slideToggle(d, {
                                easing: a.easing,
                                complete: function() {
                                    N(b);
                                    domqueryFocus()
                                }
                            }) : h.slideToggle(d, {
                                easing: a.easing,
                                complete: function() {
                                    N(b);
                                    domqueryFocus()
                                }
                            }) : (h.hide(), N(b), domqueryFocus())
                        }
                    }
                }
            })
        });
        $(document).on("focusout",
            '[class*="-wrapper"]',
            function(e) {
                const c = $(this),
                    b = c.data("settings");
                b && !0 !== b.offclick && setTimeout(() => {
                    if ($('[class*="-wrapper"][class*="open"]').length && !(0 < $(document.activeElement).closest('[class*="-wrapper"]').length || b.pointer && b.pointer.startsWith("question_") && "true" === c.attr("data-aun"))) {
                        var a = c.find(`.${b.optionsClass}`),
                            h = parseInt(c.attr("data-duration"));
                        if (p() && !b.slideToggle) z(a, h, $(".select-overlay"), c, b);
                        else {
                            c.removeClass(b.openClass);
                            c.attr("data-state", "closed");
                            if ("radio" ===
                                b.pointer) {
                                const d = c.attr("data-selected-value"),
                                    k = parseInt(c.attr("data-selected-index")),
                                    v = c.find(".trigger-radio");
                                void 0 !== d && 0 <= k && (Object.assign(v[0].style, {
                                    border: `2px solid ${b.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: b.radioSize,
                                    height: b.radioSize
                                }), v.html(R(b.radioColor, b)))
                            }
                            h ? b.slideToggle ? a.css("opacity", b.opacity || 0).slideToggle(h, {
                                easing: b.easing
                            }) : a.slideToggle(h, {
                                easing: b.easing
                            }) : a.hide()
                        }
                    }
                }, 0)
            });
        $(window).on("resize", function() {
            $('[class*="-wrapper"][class*="open"]').each(function() {
                var e =
                    $(this),
                    c = e.data("settings");
                c && !0 !== c.slideToggle && (c = e.find(`.${c.optionsClass}`), e = Z(e, c), c.css(e))
            })
        })
    }
    return this
};
$.fn.select = function(x, l, I) {
    const p = function(q, A, n) {
        if (n) {
            var R = A.val();
            n.pointer ? "radio" === n.pointer ? q.find(".custom-radio").each(function() {
                const V = $(this).closest('[class*="-option"]').attr("data-value") === R;
                $(this).css({
                    border: V ? `2px solid ${n.radioColor}` : `2px solid ${n.buttonColor}`,
                    backgroundColor: "#fff"
                }).html(V ? upHTMe(n.radioColor, n) : "")
            }) : "checkbox" === n.pointer ? q.find(".custom-checkbox").each(function() {
                const V = $(this).closest('[class*="-option"]').attr("data-value") === R,
                    C = n.checkboxColor ||
                    "#2196F3",
                    Y = n.checkboxSize || "16px";
                V ? $(this).css({
                    border: `2px solid ${C}`,
                    backgroundColor: C
                }).html(upHTMe2(Y)) : $(this).css({
                    border: `2px solid ${n.buttonColor||"#ccc"}`,
                    backgroundColor: "#fff"
                }).html("")
            }) : n.pointer.startsWith("question_") && q.find(".custom-question").each(function() {
                $(this).closest('[class*="-option"]').attr("data-value") === R ? $(this).addClass("active") : $(this).removeClass("active")
            }) : n.dot && q.find(".custom-dot").each(function() {
                $(this).closest('[class*="-option"]').attr("data-value") ===
                    R ? $(this).css(n.dotSelectedStyle || {}) : $(this).css(n.dotStyle || {})
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
                var A = q.find(`option[value="${l}"]`);
                if (A.length) {
                    var n = $(".select-" + (this._selectId + "-wrapper"));
                    const V = n.data("settings");
                    q.find("option").prop("selected", !1);
                    A.prop("selected", !0);
                    n.attr({
                        "data-selected-value": A.val(),
                        "data-selected-index": A.index()
                    });
                    var R = n.find('[class*="-option"]');
                    R.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    V.selectedBg && R.each(function() {
                        const P = $(this),
                            M = (P.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        P.attr("style", M)
                    });
                    const C = n.find(`[data-value="${A.val()}"]`);
                    if (C.length) {
                        setTimeout(() => {
                            C.addClass("selected");
                            V.selectedBg ? (C.addClass("selected-bg-active"), C[0].style.setProperty("background-color",
                                !0 === V.selectedBg ? rgbToRgba(V.activeBackground, .5) : V.selectedBg, "important"), C.css("font-weight", "normal")) : C.css("font-weight", "bold")
                        }, 300);
                        const P = n.find('[class*="-options"]');
                        if (P.length) {
                            R = (C.attr("class")?.split(" ") || []).filter(M => M !== V.optionClass && "selected" !== M && M !== V.highlightedClass && !M.includes("wrapper") && !M.includes("options"));
                            if (0 < R.length) {
                                const M = new Set,
                                    N = D => {
                                        if (D && !M.has(D)) {
                                            M.add(D);
                                            var O = P.find(`[data-group="${D}"]`);
                                            O.length && (O.addClass("expanded"), O.find(".custom-group-arrow").css("transform",
                                                "translateY(-50%) rotate(180deg)"), P.find(`.${D}`).show(), (O.attr("class")?.split(" ") || []).forEach(z => {
                                                "group-option" !== z && "expanded" !== z && N(z)
                                            }))
                                        }
                                    };
                                R.forEach(D => N(D))
                            }
                            void 0 !== V.autoScrollToSelected && V.autoScrollToSelected && (R = parseInt(n.attr("data-duration")) || 300, setTimeout(() => {
                                P.find("div").first().length && C.length && C[0] && "function" === typeof C[0].scrollIntoView && C[0].scrollIntoView({
                                    block: "center",
                                    behavior: "smooth"
                                })
                            }, R))
                        }
                    }
                    p(n, A, V);
                    n = n.find('[class*="-trigger"]');

                    function Y(P, M) {
                        var N = M.attr("class");
                        if (!N) return M.text();
                        const D = [];
                        N = N.split(" ");
                        for (let z = 0; z < N.length; z++) {
                            var O = P.find(`option[group="${N[z]}"]`);
                            if (O.length && (D.push(O.text()), O = O.attr("class"))) {
                                O = O.split(" ");
                                for (let Z = 0; Z < O.length; Z++) {
                                    const aa = P.find(`option[group="${O[Z]}"]`);
                                    aa.length && D.unshift(aa.text())
                                }
                            }
                        }
                        D.push(M.text());
                        return [...(new Set(D))].join(" > ")
                    }
                    let da;
                    if (q.find("option[group]").length) try {
                        da = "function" === typeof findGroupPath ? findGroupPath(this, A.val(), A.index()).text : Y(q, A)
                    } catch (P) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
                            P), da = A.text()
                    } else da = A.text();
                    A = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    R = n.find('span[style*="position: absolute"]').clone();
                    V && V.allowHTML ? n.html(da) : n.text(da);
                    A.length && n.append(A);
                    R.length && n.append(R);
                    q.val(l)
                }
            } else console.warn("Select element was not initialized with $.select() method")
        });
        if ("index" === x && "number" === typeof l) return this.each(function() {
            var q = $(this);
            if (this._selectId) {
                var A = q.find("option").eq(l);
                if (A.length) {
                    var n = $(".select-" + (this._selectId +
                        "-wrapper"));
                    const V = n.data("settings");
                    q.find("option").prop("selected", !1);
                    A.prop("selected", !0);
                    n.attr({
                        "data-selected-value": A.val(),
                        "data-selected-index": l
                    });
                    var R = n.find('[class*="-option"]');
                    R.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    V.selectedBg && R.each(function() {
                        const P = $(this),
                            M = (P.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        P.attr("style", M)
                    });
                    const C = n.find(`[data-value="${A.val()}"]`);
                    C.length && setTimeout(() => {
                        C.addClass("selected");
                        V.selectedBg ? (C.addClass("selected-bg-active"), C[0].style.setProperty("background-color", V.selectedBg, "important"), C.css("font-weight", "normal")) : C.css("font-weight", "bold")
                    }, 300);
                    p(n, A, V);
                    n = n.find('[class*="-trigger"]');

                    function Y(P, M) {
                        var N = M.attr("class");
                        if (!N) return M.text();
                        const D = [];
                        N = N.split(" ");
                        for (let z = 0; z < N.length; z++) {
                            var O = P.find(`option[group="${N[z]}"]`);
                            if (O.length && (D.push(O.text()), O = O.attr("class"))) {
                                O = O.split(" ");
                                for (let Z = 0; Z < O.length; Z++) {
                                    const aa = P.find(`option[group="${O[Z]}"]`);
                                    aa.length && D.unshift(aa.text())
                                }
                            }
                        }
                        D.push(M.text());
                        return [...(new Set(D))].join(" > ")
                    }
                    let da;
                    if (q.find("option[group]").length) try {
                        da = "function" === typeof findGroupPath ? findGroupPath(this, A.val(), l).text : Y(q, A)
                    } catch (P) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:", P), da = A.text()
                    } else da = A.text();
                    q = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    R = n.find('span[style*="position: absolute"]').clone();
                    V && V.allowHTML ? n.html(da) :
                        n.text(da);
                    q.length && n.append(q);
                    R.length && n.append(R);
                    "function" === typeof I && I.call(this, {
                        index: l,
                        value: A.val(),
                        text: A.text(),
                        path: da
                    })
                }
            } else console.warn("Select element was not initialized with $.select() method")
        });
        if ("value" === x) return this.each(function() {
            var q = $(this);
            if (this._selectId) {
                var A = q.find(`option[value="${l}"]`);
                if (A.length) {
                    var n = $(".select-" + (this._selectId + "-wrapper"));
                    const V = A.index(),
                        C = n.data("settings");
                    q.find("option").prop("selected", !1);
                    A.prop("selected", !0);
                    n.attr({
                        "data-selected-value": l,
                        "data-selected-index": V
                    });
                    var R = n.find('[class*="-option"]');
                    R.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    C.selectedBg && R.each(function() {
                        const M = $(this),
                            N = (M.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        M.attr("style", N)
                    });
                    const Y = n.find(`[data-value="${l}"]`);
                    Y.length && setTimeout(() => {
                        Y.addClass("selected");
                        C.selectedBg ? (Y.addClass("selected-bg-active"), Y[0].style.setProperty("background-color", C.selectedBg, "important"), Y.css("font-weight",
                            "normal")) : Y.css("font-weight", "bold")
                    }, 300);
                    C && C.pointer ? "radio" === C.pointer ? n.find(".custom-radio").each(function() {
                        const M = $(this).closest('[class*="-option"]').attr("data-value") === l;
                        $(this).css({
                            border: M ? `2px solid ${C.radioColor}` : `2px solid ${C.buttonColor}`,
                            backgroundColor: "#fff"
                        }).html(M ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(C.radioSize)/2}px; height: ${parseInt(C.radioSize)/2}px; background-color: ${C.radioColor}; border-radius: 50%;"></div>` :
                            "")
                    }) : "checkbox" === C.pointer ? n.find(".custom-checkbox").each(function() {
                        const M = $(this).closest('[class*="-option"]').attr("data-value") === l,
                            N = C.checkboxColor || "#2196F3";
                        M ? $(this).css({
                            border: `2px solid ${N}`,
                            backgroundColor: N
                        }).html('<svg viewBox="0 0 24 24" style="fill: white; width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>') : $(this).css({
                            border: `2px solid ${C.buttonColor||
"#ccc"}`,
                            backgroundColor: "#fff"
                        }).html("")
                    }) : C.pointer.startsWith("question_") && n.find(".custom-question").each(function() {
                        $(this).closest('[class*="-option"]').attr("data-value") === l ? $(this).addClass("active") : $(this).removeClass("active")
                    }) : C && C.dot && n.find(".custom-dot").each(function() {
                        const M = $(this).closest('[class*="-option"]').attr("data-value") === l;
                        $(this).css({
                            border: M ? `2px solid ${C.dotColor}` : `2px solid ${C.buttonColor}`,
                            backgroundColor: M ? C.dotColor : "#fff"
                        })
                    });
                    n = n.find('[class*="-trigger"]');

                    function da(M, N) {
                        var D = N.attr("class");
                        if (!D) return N.text();
                        const O = [];
                        D = D.split(" ");
                        for (let Z = 0; Z < D.length; Z++) {
                            var z = M.find(`option[group="${D[Z]}"]`);
                            if (z.length && (O.push(z.text()), z = z.attr("class"))) {
                                z = z.split(" ");
                                for (let aa = 0; aa < z.length; aa++) {
                                    const ja = M.find(`option[group="${z[aa]}"]`);
                                    ja.length && O.unshift(ja.text())
                                }
                            }
                        }
                        O.push(N.text());
                        return [...(new Set(O))].join(" > ")
                    }
                    let P;
                    if (q.find("option[group]").length) try {
                        P = "function" === typeof findGroupPath ? findGroupPath(this, l, V).text : da(q, A)
                    } catch (M) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
                            M), P = A.text()
                    } else P = A.text();
                    q = n.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    R = n.find('span[style*="position: absolute"]').clone();
                    C && C.allowHTML ? n.html(P) : n.text(P);
                    q.length && n.append(q);
                    R.length && n.append(R);
                    "function" === typeof I && I.call(this, {
                        index: V,
                        value: l,
                        text: A.text(),
                        path: P
                    })
                }
            } else console.warn("Select element was not initialized with $.select() method")
        })
    }
    return $.select.call(this, x, l, I)
};
$.fn.selectSet = function(x, l, I) {
    return this.each(function() {
        function p(D, O, z) {
            const [Z, aa] = O.split(":");
            if ("selected" === Z) "selected" === aa && (q.find("option").prop("selected", !1), D.prop("selected", !0), R(C, q, D), q.trigger("change"));
            else if ("val" === Z)
                if (O = D.val(), D.val(aa), z) {
                    const na = D.attr("group");
                    D.attr("group", aa);
                    q.find(`option.${na}`).each(function() {
                        $(this).removeClass(na).addClass(aa)
                    });
                    D = C.find(`[data-group="${na}"]`);
                    D.length && (D.attr("data-group", aa), C.find(`.${na}`).each(function() {
                        $(this).removeClass(na).addClass(aa)
                    }))
                } else z =
                    C.find(`[data-value="${O}"]`), z.length && z.attr("data-value", aa), D.prop("selected") && V(C, A);
            else if ("text" === Z)
                if (D.text(aa), z) {
                    z = D.attr("group");
                    z = C.find(`[data-group="${z}"]`);
                    if (z.length) {
                        O = z.find(".custom-group-arrow").clone();
                        var ja = z.contents().filter(function() {
                            return 3 === this.nodeType
                        });
                        ja.length ? ja[0].nodeValue = aa : (Y && Y.allowHTML ? z.html(aa) : z.text(aa), O.length && z.append(O))
                    }
                    D = D.attr("group");
                    q.find(`option.${D}`).filter(function() {
                        return $(this).prop("selected")
                    }).length && V(C, A)
                } else {
                    z = D.val();
                    z = C.find(`[data-value="${z}"]`);
                    if (z.length) {
                        O = z.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot, .custom-group-arrow").clone();
                        ja = z.find('span[style*="position: absolute"]').clone();
                        let na = z.contents().filter(function() {
                            return 3 === this.nodeType
                        });
                        na.length ? na[0].nodeValue = aa : (Y && Y.allowHTML ? z.html(aa) : z.text(aa), O.length && z.append(O), ja.length && z.append(ja))
                    }
                    D.prop("selected") && V(C, A)
                }
        }
        const q = $(this),
            A = this;
        var n = this._selectId;
        if (n) {
            var R = function(D, O, z) {
                    const Z = D.data("settings"),
                        aa = z.val();
                    z = z.index();
                    D.attr({
                        "data-selected-value": aa,
                        "data-selected-index": z
                    });
                    D.find('[class*="-option"]').removeClass("selected").css("font-weight", "normal");
                    const ja = D.find(`[data-value="${aa}"]`);
                    ja.length && setTimeout(() => {
                        ja.addClass("selected");
                        Z.selectedBg || ja.css("font-weight", "bold")
                    }, 300);
                    "radio" === Z.pointer ? D.find(".custom-radio").each(function() {
                        const na = $(this).closest('[class*="-option"]').attr("data-value") === aa;
                        $(this).css({
                            border: na ? `2px solid ${Z.radioColor}` : `2px solid ${Z.buttonColor}`,
                            backgroundColor: "#fff"
                        }).html(na ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(Z.radioSize)/2}px; height: ${parseInt(Z.radioSize)/2}px; background-color: ${Z.radioColor}; border-radius: 50%;"></div>` : "")
                    }) : Z.dot && D.find(".custom-dot").each(function() {
                        const na = $(this).closest('[class*="-option"]').attr("data-value") === aa;
                        $(this).css({
                            border: na ? `2px solid ${Z.dotColor}` : `2px solid ${Z.buttonColor}`,
                            backgroundColor: na ? Z.dotColor : "#fff"
                        })
                    });
                    V(D, O[0])
                },
                V = function(D, O) {
                    const z = D.data("settings");
                    D = D.find('[class*="-trigger"]');
                    var Z = $(O);
                    const aa = Z.find("option:selected");
                    if (aa.length) {
                        var ja = aa.index(),
                            na = aa.val();
                        if (Z.find("option[group]").length && "function" === typeof findGroupPath) try {
                            var qa = findGroupPath(O, na, ja).text
                        } catch (ua) {
                            console.warn("Error getting group path:", ua), qa = aa.text()
                        } else qa = aa.text();
                        O = D.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                        Z = D.find('span[style*="position: absolute"]').clone();
                        z && z.allowHTML ? D.html(qa) : D.text(qa);
                        O.length && D.append(O);
                        Z.length && D.append(Z);
                        "radio" === z.pointer && (qa = D.find(".custom-radio"), qa.length && qa.css({
                            border: `2px solid ${z.radioColor}`,
                            backgroundColor: "#fff"
                        }).html(`<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(z.radioSize)/2}px; height: ${parseInt(z.radioSize)/2}px; background-color: ${z.radioColor}; border-radius: 50%;"></div>`))
                    }
                },
                C = $(".select-" + (n + "-wrapper")),
                Y = C.data("settings");
            n = !1;
            if ("string" === typeof x && x.startsWith("group:")) {
                n = !0;
                var da = x.substring(6);
                da = q.find(`option[group="${da}"]`)
            } else "number" !== typeof x && isNaN(parseInt(x)) ? "string" === typeof x && (da = q.find(`option[value="${x}"]`)) : (da = parseInt(x), da = q.find("option").eq(da), da.attr("group") && (n = !0));
            if (da.length) {
                if ("string" === typeof l && l.startsWith("{") && l.endsWith("}")) {
                    var P = l.match(/\{([^}]+)\}/g);
                    if (P)
                        for (var M of P) P = M.substring(1, M.length - 1), p(da, P, n)
                } else "string" === typeof l && p(da, l, n);
                if ("function" === typeof I) {
                    var N =
                        q.find("option:selected");
                    M = N.index();
                    n = N.val();
                    da = N.text();
                    P = "";
                    if (N.length && N.attr("class")) {
                        N = N.attr("class").split(" ");
                        for (const D of N)
                            if (N = q.find(`option[group="${D}"]`), N.length) {
                                P = N.text();
                                break
                            }
                    }
                    I.call(this, {
                        index: M,
                        value: n,
                        text: da,
                        group: P
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
                    for (const A of q) {
                        const n = l.find(`option[group="${A}"]`);
                        if (n.length && (p.unshift(n.text()), n.attr("class"))) {
                            const R = n.attr("class").split(" ");
                            for (const V of R) {
                                const C = l.find(`option[group="${V}"]`);
                                C.length && p.unshift(C.text())
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
$.fn.selectAdd = function(x, l) {
    return this.each(function() {
        const I = $(this);
        if (this._selectId) {
            var p;
            if ("string" === typeof x) {
                var q = (n, R, V, C = {}) => ({
                    prefix: n,
                    minParts: R,
                    fields: V,
                    optionalFields: C,
                    parse: function(Y) {
                        if (Y.length < this.minParts) return null;
                        const da = {};
                        this.fields.forEach((P, M) => {
                            da[P] = Y[M + 1] || ""
                        });
                        Object.entries(this.optionalFields).forEach(([P, M]) => {
                            P = parseInt(P);
                            Y[P] && Y[P].trim() && (da[M] = Y[P])
                        });
                        return da
                    }
                });
                window._selectParsers || (window._selectParsers = [], window._selectParsers.push(q("group:",
                    3, ["group", "text"])), window._selectParsers.push(q("option:", 4, ["value", "text", "groupClass"], {
                    4: "tag",
                    5: "img"
                })));
                var A = window._selectParsers;
                q = x.split(":");
                (A = A.find(n => x.startsWith(n.prefix))) && (p = A.parse(q));
                p || (p = x)
            } else p = x;
            p.group ? (q = document.createElement("option"), q.setAttribute("group", p.group), q.textContent = p.text || "", p.parentGroup && (q.className = p.parentGroup), I[0].appendChild(q)) : (q = document.createElement("option"), q.value = p.value || "", q.textContent = p.text || "", p.groupClass && (q.className =
                p.groupClass), p.tag && q.setAttribute("tag", p.tag), p.img && q.setAttribute("img", p.img), p.groupClass ? (A = Array.from(I[0].querySelectorAll(`.${p.groupClass}`)), 0 < A.length ? (A = A[A.length - 1], A.nextSibling ? I[0].insertBefore(q, A.nextSibling) : I[0].appendChild(q)) : (A = I[0].querySelector(`option[group="${p.groupClass}"]`)) && A.nextSibling ? I[0].insertBefore(q, A.nextSibling) : I[0].appendChild(q)) : I[0].appendChild(q));
            refreshSelectUI(I);
            "function" === typeof l && l.call(this, {
                type: p.group ? "group" : "option",
                group: p.group ||
                    p.groupClass,
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