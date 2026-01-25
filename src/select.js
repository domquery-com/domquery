function rgbToRgba(v, l = .5) {
    if (!v || v.startsWith("rgba")) return v;
    var H = v.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (H) {
        const [, m, B, p] = H;
        return `rgba(${m}, ${B}, ${p}, ${l})`
    }
    if (H = v.match(/^#([a-fA-F0-9]{6})$/)) {
        var x = H[1];
        v = parseInt(x.substr(0, 2), 16);
        H = parseInt(x.substr(2, 2), 16);
        x = parseInt(x.substr(4, 2), 16);
        return `rgba(${v}, ${H}, ${x}, ${l})`
    }
    return (H = v.match(/^#([a-fA-F0-9]{3})$/)) ? (x = H[1], v = parseInt(x[0] + x[0], 16), H = parseInt(x[1] + x[1], 16), x = parseInt(x[2] + x[2], 16), `rgba(${v}, ${H}, ${x}, ${l})`) : v
}
$.select = function(v, l, H) {
    function x(g, C) {
        let z;
        return function() {
            const q = arguments;
            z || (g.apply(this, q), z = !0, setTimeout(() => z = !1, C))
        }
    }

    function m() {
        var g = typeof $ !== "undefined" && $.isMobile ? $.isMobile() : {
            isMobile: !1,
            isTablet: !1,
            isIOS: !1
        };
        return g.isMobile === !0
    }

    function B(g) {
        const C = document.createElement("div");
        C.innerHTML = g;
        return C.textContent || C.innerText || ""
    }

    function p(g, C = 0) {
        return C === 1 ? g.replace(/\x3c!--(.*?)--\x3e/g, "$1").replace(/<[^>]*>/g, "") : g.replace(/\x3c!--(.*?)--\x3e/g, "$1")
    }

    function S(g,
        C) {
        g = $(g);
        C = g.find("option, li").eq(C);
        if (!C.length) return {
            text: g.find("option, li").first().text().trim(),
            tag: null
        };
        var z = C.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
        const q = [];
        var G = C;
        for (q.unshift(z); G.length;) {
            var e = G.attr("class")?.split(" ") || [];
            z = !1;
            for (const T of e)
                if (e = g.find(`[group="${T}"]`), e.length) {
                    G = e.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
                    q.unshift(G);
                    G = e;
                    z = !0;
                    break
                } if (!z) break
        }
        return {
            text: q.join(" > "),
            tag: C.attr("tag")
        }
    }

    function Q(g, C) {
        C = parseInt(C?.radioSize ||
            "16") / 2;
        return `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${C}px; height: ${C}px; background-color: ${g}; border-radius: 50%;"></div>`
    }

    function E(g) {
        g = parseInt(g);
        return `<span style="\n\t\t\tposition: absolute;\n\t\t\tleft: 50%;\n\t\t\ttop: 50%;\n\t\t\twidth: ${g*.3}px;\n\t\t\theight: ${g*.6}px;\n\t\t\tborder: solid white;\n\t\t\tborder-width: 0 ${g*.12}px ${g*.12}px 0;\n\t\t\ttransform: translate(-50%, -65%) rotate(45deg);\n\t\t\tdisplay: block;\n\t\t"></span>`
    }

    function ja(g, C = "16px") {
        return `<div style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; color: #fff; font-size: ${Math.max(parseInt(C)*.7,10)}px; font-weight: bold; line-height: 1; text-align: center; -webkit-font-smoothing: antialiased; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-tap-highlight-color: transparent;">${g}</div>`
    }

    function X(g = "50%", C = "10px") {
        return {
            position: "absolute",
            right: C,
            top: g,
            transform: "translateY(-50%)",
            width: "16px",
            height: "16px"
        }
    }

    function ba(g) {
        let C = g.groupArrowStyle?.size || g.arrowSize,
            z = g.arrowRight || X().right,
            q = g.groupArrowColor || g.arrowColor;
        if (g.pointer === "checkbox" || g.pointer?.startsWith("checkbox_")) {
            if (!g.groupArrowStyle?.size && g.checkboxSize) {
                var G = parseFloat(g.checkboxSize);
                isNaN(G) || (C = `${G*.6}px`)
            }!g.groupArrowColor && g.checkboxColor && (q = g.checkboxColor)
        } else g.pointer === "radio" ? (!g.groupArrowStyle?.size && g.radioSize && (G = parseFloat(g.radioSize),
            isNaN(G) || (C = `${G*.6}px`)), !g.groupArrowColor && g.radioColor && (q = g.radioColor)) : g.pointer && g.pointer.startsWith("question_") && !g.groupArrowColor && g.questionColor && (q = g.questionColor);
        return {
            arrowSizeValue: C,
            arrowRightValue: z,
            arrowColorValue: q
        }
    }

    function U(g) {
        return {
            wrapperClass: g + "-wrapper",
            triggerClass: g + "-trigger",
            optionsClass: g + "-options",
            optionClass: g + "-option",
            openClass: g + "-open"
        }
    }

    function Z(g) {
        return {
            border: `2px solid ${g||"#ccc"}`,
            backgroundColor: "#fff"
        }
    }

    function y(g) {
        wa && ((g = g.find("select").first()[0]) &&
            g._selectId && (g = window._gong_tea_yun_0.get(g._selectId + "_close")) && g.call(this, wa), wa = 0)
    }

    function N(g, C, z) {
        const q = g.closest('[class*="-wrapper"]');
        g.find("div").first().css({
            "background-color": z.optionsStyle.background || "#fff"
        });
        y(q);
        C ? (z.slideToggle ? g.css("opacity", z.opacity || 0) : g.css("opacity", ""), g.slideUp(C, {
            easing: z.easing,
            complete: domqueryFocus
        })) : (g.hide(), domqueryFocus())
    }

    function I(g, C, z, q) {
        if (!ya) {
            ya = !0;
            var G = g.closest('[class*="-wrapper"]');
            y(G);
            z.css({
                "background-color": "rgba(0, 0, 0, 0)"
            });
            var e = G.find("select").first()[0]._selectId;
            setTimeout(() => {
                e && domquery(this).historyOff("select-" + e);
                ya = !1
            }, C + 300);
            g.slideUp(C, {
                easing: q.easing,
                complete: function() {
                    z.hide();
                    domqueryFocus()
                }
            })
        }
    }

    function V(g, C, z, q, G) {
        if (!ya) {
            ya = !0;
            y(q);
            q.data("upHTMe10Running", !0);
            z.css({
                "background-color": "rgba(0, 0, 0, 0)",
                opacity: ""
            });
            var e = q.find("select").first()[0]._selectId;
            setTimeout(() => {
                !q.data("groupClicked") && e && domquery(this).historyOff("select-" + e);
                ya = !1
            }, C + 300);
            g.css("opacity", "").slideUp(C, {
                easing: G.easing,
                complete: function() {
                    z.css("pointer-events", "none").hide();
                    q.removeClass(G.openClass);
                    q.attr("data-state", "closed");
                    setTimeout(() => {
                        z.css("pointer-events", "")
                    }, 100);
                    domqueryFocus()
                }
            })
        }
    }

    function aa(g, C) {
        var z = m(),
            q = g.data("settings");
        if (!z) {
            const G = g[0].getBoundingClientRect(),
                e = window.innerHeight;
            C = C.find("div").first();
            const T = q && q.height,
                W = T || `${e*.6}px`;
            z = e - G.bottom;
            const ca = G.top;
            if (q.parentView) return g = {
                position: "fixed",
                left: G.left + "px",
                width: G.width + "px",
                zIndex: 1E3,
                height: W,
                overflowY: "auto",
                overflowX: "hidden"
            }, ca > z && z < C[0].scrollHeight ? (g.bottom = e - G.top + "px", g.top = "auto", g.borderRadius = "4px 4px 0 0") : (g.top = G.bottom + "px", g.bottom = "auto", g.borderRadius = "0 0 4px 4px"), g;
            if (T) return {
                top: "100%",
                bottom: "auto",
                borderRadius: "0 0 4px 4px",
                borderTop: "none",
                borderBottom: "1px solid #ccc"
            };
            g = g.find("select").first();
            g = (g.length ? parseInt(g.height() || g.css("height")) : null) || C[0].scrollHeight;
            q = {
                top: "100%",
                bottom: "auto",
                borderRadius: "0 0 4px 4px",
                borderTop: "none",
                borderBottom: "1px solid #ccc"
            };
            z < g &&
                ca > z ? (q = {
                    top: "auto",
                    bottom: "100%",
                    borderRadius: "4px 4px 0 0",
                    borderBottom: "1px solid #ccc",
                    borderTop: "none"
                }, ca < g && C.css({
                    maxHeight: `${ca-10}px`,
                    overflowY: "auto"
                })) : z < g && C.css({
                    maxHeight: `${z-10}px`,
                    overflowY: "auto"
                });
            return q
        }
        return {
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            top: "auto",
            borderRadius: q.MborderRadius || "4px 4px 0 0",
            width: "100%",
            Mheight: q.Mheight || "60vh",
            height: q.height || "auto",
            minHeight: q.minHeight || "auto",
            maxHeight: q.maxHeight || (z ? q.Mheight || "60vh" : q.height || "300px"),
            overflowY: "auto",
            zIndex: "1000"
        }
    }

    function ma(g) {
        g.css({
            "pointer-events": "none",
            opacity: "0.6"
        })
    }

    function fa(g, C) {
        C && g && Object.entries(C).forEach(([z, q]) => {
            try {
                g.style[z] = q
            } catch (G) {
                console.warn("Style application failed for property:", z)
            }
        })
    }

    function Ba(g, C) {
        if (C.scrollColor) try {
            g.find('[class*="-options"]');
            const z = C.optionsStyle.background || "#fff",
                q = C.optionStyle.borderBottomColor || "#ddd",
                G = `scrollbar-${g.attr("id")||Math.random().toString(36).substr(2,9)}`;
            $(`#${G}`).remove();
            const e = document.createElement("style");
            e.id = G;
            e.textContent = `\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar {\n\t\t\t\t\twidth: 8px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-track,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-track {\n\t\t\t\t\tbackground: ${z};\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-thumb,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-thumb {\n\t\t\t\t\tbackground: ${q};\n\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\tborder: 1px solid ${z};\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass}::-webkit-scrollbar-thumb:hover,\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div::-webkit-scrollbar-thumb:hover {\n\t\t\t\t\tbackground: ${q};\n\t\t\t\t\topacity: 0.8;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} {\n\t\t\t\t\tscrollbar-width: thin;\n\t\t\t\t\tscrollbar-color: ${q} ${z};\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t#${g.attr("id")} .${C.optionsClass} div {\n\t\t\t\t\tscrollbar-width: thin;\n\t\t\t\t\tscrollbar-color: ${q} ${z};\n\t\t\t\t}\n\t\t\t`;
            document.head.appendChild(e);
            g.data("scrollbarStyleId", G)
        } catch (z) {
            console.warn("\uc2a4\ud06c\ub864\ubc14 \uc0c9\uc0c1 \uc801\uc6a9 \uc911 \uc624\ub958:", z)
        }
    }
    let ya = !1,
        wa = 0;
    window._isMouseDown_gong = !1;
    window._isGroupClick = !1;
    window._selectPreviousFocus || (window._selectPreviousFocus = null);
    $(document).off("mousedown.selectTrigger touchstart.selectTrigger", '[class*="-trigger"]').on("mousedown.selectTrigger touchstart.selectTrigger", '[class*="-trigger"]', function(g) {
        !(g = document.activeElement) || g.tagName !==
            "INPUT" && g.tagName !== "TEXTAREA" && g.getAttribute("contenteditable") !== "true" || (window._selectPreviousFocus = g, g.selectionStart !== void 0 && (window._selectPreviousFocusPosition = g.selectionStart))
    });
    window.domqueryFocus = function() {
        if (m()) try {
            window._selectPreviousFocus && document.body.contains(window._selectPreviousFocus) ? setTimeout(() => {
                try {
                    if (window._selectPreviousFocus.focus(), window._selectPreviousFocus.tagName === "INPUT" || window._selectPreviousFocus.tagName === "TEXTAREA") {
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
    typeof v === "function" ? (H = v, l = {}, v = 0) : typeof l === "function" ? typeof v === "object" ? (H = l, l = v, v = 0) : (H = l, l = {}) : typeof v === "object" && (l = v, v = 0);
    l = l || {};
    v = parseInt(v) || 0;
    this.elements.forEach(g => {
        function C(c) {
            if (!c) return "10px";
            c = c.split(" ").filter(b => b.trim());
            return c.length === 1 ? c[0] : c.length === 2 ? c[1] : c.length === 4 ? c[3] : "10px"
        }
        if (g._selectId) {
            var z = $(g).parent();
            if (z.length && z[0].className && typeof z[0].className === "string" && z[0].className.includes("-wrapper")) return
        }
        var q = Math.random().toString(36).substr(2,
            9);
        z = U("select-" + q);
        var G = m();
        G = l.slideToggle === "auto" ? G ? !1 : !0 : l.slideToggle || !1;
        let e = {
            ...z,
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
                maxHeight: "280px",
                overflowY: "auto",
                overflowX: "hidden",
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
                ...X(),
                ...Z(l.buttonColor),
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
                ...X(),
                ...Z(l.buttonColor),
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
                ...X(),
                ...Z(l.buttonColor),
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
            triggerHoverColor: l.triggerHoverColor || "#000000",
            triggerHoverBorderColor: l.triggerHoverBorderColor || "#999999",
            radioColor: l.radioColor || "#007bff",
            checkboxColor: l.checkboxColor || "#007bff",
            questionColor: l.questionColor || "#007bff",
            buttonColor: l.buttonColor || "#ccc",
            dotColor: l.dotColor || "#007bff",
            ...l,
            ...z,
            slideToggle: G
        };
        (e.pointer === "checkbox" || e.pointer?.startsWith("checkbox_")) && setTimeout(() => {
            const c = $(g),
                b = c.find("option[selected]").filter(function() {
                    return $(this).val().trim() !==
                        "" && !$(this).is(":disabled")
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
                border: `2px solid ${b>0?e.checkboxColor:e.buttonColor}`,
                backgroundColor: b > 0 ? e.checkboxColor : "#fff",
                width: e.checkboxSize,
                height: e.checkboxSize
            });
            b > 0 && h.html(ja(b, e.checkboxSize));
            a.find('[class*="-option"]').each(function() {
                const d = $(this);
                var k = d.attr("data-value"),
                    t = c.find(`option[value="${k}"]`);
                k = t.is("[selected]") && k.trim() !== "";
                t = t.is(":disabled");
                const n = d.find(".custom-checkbox");
                n.length && (n.css({
                    border: `2px solid ${k?e.checkboxColor:e.buttonColor}`,
                    backgroundColor: k ? e.checkboxColor : t ? "#f5f5f5" : "#fff",
                    width: e.checkboxSize,
                    height: e.checkboxSize
                }), k && n.html(E(e.checkboxSize)), d.attr("data-checked", k ? "true" : "false"))
            })
        }, 0);
        g._selectId || (g._selectId = q);
        H && window._gong_tea_yun_0.set(g._selectId + "_callback", H);
        l.onSelect && window._gong_tea_yun_0.set(g._selectId +
            "_onSelect", l.onSelect);
        l.open && window._gong_tea_yun_0.set(g._selectId + "_open", l.open);
        l.close && window._gong_tea_yun_0.set(g._selectId + "_close", l.close);
        z = g.tagName.toLowerCase() === "select";
        G = g.tagName.toLowerCase() === "ul";
        if (z || G) {
            if (G) {
                var T = document.createElement("select");
                T.className = g.className;
                (z = g.getAttribute("onchange")) && T.setAttribute("onchange", z);
                const c = new Set;

                function b(a, h = 0) {
                    Array.from(a).forEach(d => {
                        if (!c.has(d))
                            if (c.add(d), d.hasAttribute("group")) {
                                var k = d.getAttribute("group");
                                const t = document.createElement("option");
                                t.innerHTML = d.innerHTML;
                                t.setAttribute("group", k);
                                t.setAttribute("data-is-group", "true");
                                t.setAttribute("data-level", h);
                                d.className && (t.className = d.className);
                                T.appendChild(t);
                                const n = d.getAttribute("group");
                                d = Array.from(g.children).filter(M => M.classList.contains(n));
                                b(d, h + 1)
                            } else k = document.createElement("option"), k.value = d.getAttribute("value") || "", k.innerHTML = d.innerHTML, d.hasAttribute("img") && k.setAttribute("img", d.getAttribute("img")), d.getAttribute("tag") &&
                                k.setAttribute("tag", d.getAttribute("tag")), d.hasAttribute("disabled") && (k.disabled = !0), d.hasAttribute("selected") && (k.selected = !0), d.className && (k.className = d.className), k.setAttribute("data-level", h), T.appendChild(k)
                    })
                }
                b(g.children);
                g.parentNode.replaceChild(T, g)
            } else T = g;
            T._selectId = g._selectId;
            var W = document.createElement("div");
            W.className = e.wrapperClass;
            W.setAttribute("data-state", "closed");
            W.setAttribute("tabindex", "0");
            W.setAttribute("data-selected-index", "-1");
            W.setAttribute("data-previous-index",
                "-1");
            $(W).data("settings", e);
            l.width && (W.style.width = l.width, W.style.boxSizing = "border-box");
            (z = T.querySelector("option:checked")) && z.value && (W.setAttribute("data-selected-value", z.value), z = Array.from(T.options).indexOf(z), W.setAttribute("data-selected-index", z));
            fa(W, e.wrapperStyle);
            z = document.createElement("div");
            z.style.position = "relative";
            var ca = document.createElement("div");
            ca.className = e.triggerClass;
            ca.setAttribute("tabindex", "-1");
            fa(ca, {
                padding: e.defaultPadding || "10px",
                paddingRight: e.defaultPaddingRight ||
                    "40px",
                margin: e.defaultMargin || "0",
                border: `${e.defaultBorderWidth||"1px"} solid ${e.defaultBorderColor||"#ccc"}`,
                borderRadius: e.defaultBorderRadius || "4px",
                cursor: "pointer",
                backgroundColor: e.defaultBgColor,
                color: e.defaultColor,
                position: "relative",
                width: "100%",
                boxSizing: "border-box"
            });
            $(ca).on({
                mouseenter: function(c) {
                    window._isMouseDown_gong || (c = $(this).closest(`.${e.wrapperClass}`).data("settings")) && c.triggerHoverBgColor && (this.style.backgroundColor = c.triggerHoverBgColor, this.style.color = c.triggerHoverColor ||
                        c.defaultColor, this.style.borderColor = c.triggerHoverBorderColor || c.defaultBorderColor)
                },
                mouseleave: function() {
                    const c = $(this).closest(`.${e.wrapperClass}`).data("settings");
                    c && (this.style.backgroundColor = c.defaultBgColor, this.style.color = c.defaultColor, this.style.borderColor = c.defaultBorderColor)
                }
            });
            var pa = G = null;
            e.triggerStyle && (e.triggerStyle.width ? G = e.triggerStyle.width : e.triggerStyle.maxWidth ? G = e.triggerStyle.maxWidth : e.triggerStyle.minWidth && (G = e.triggerStyle.minWidth), e.triggerStyle.height ?
                pa = e.triggerStyle.height : e.triggerStyle.maxHeight ? pa = e.triggerStyle.maxHeight : e.triggerStyle.minHeight && (pa = e.triggerStyle.minHeight));
            G || (G = T.style.width, !G && T.style.maxWidth && (G = T.style.maxWidth), !G && T.style.minWidth && (G = T.style.minWidth));
            pa || (pa = T.style.height, !pa && T.style.maxHeight && (pa = T.style.maxHeight), !pa && T.style.minHeight && (pa = T.style.minHeight));
            fa(ca, e.triggerStyle);
            ca.style.whiteSpace = "nowrap";
            ca.style.overflow = "hidden";
            ca.style.textOverflow = "ellipsis";
            ca.style.paddingRight = e.defaultPaddingRight ||
                "40px";
            ca.style.height = "auto";
            var ha = e.defaultText,
                za = T.querySelector("option:checked");
            if (za) {
                var da = Array.from(T.options);
                e.pointer === "checkbox" || e.pointer?.startsWith("checkbox_") ? (da = da.find(c => c.value === "")) && (ha = e.allowHTML ? da.innerHTML : da.textContent) : (ha = da.indexOf(za), ha = S(T, ha).text, T._needsExpandGroup = !0)
            }!e.showArrow || e.pointer === "radio" || e.pointer === "checkbox" || e.pointer && (e.pointer.startsWith("question_") || e.pointer.startsWith("checkbox_")) || (q = "custom-select-arrow-style-" + q, document.getElementById(q) ||
                (da = document.createElement("style"), da.id = q, da.textContent = `\n\t\t\t\t\t.${e.triggerClass}::after {\n\t\t\t\t\t   content: '';\n\t\t\t\t\t   position: absolute;\n\t\t\t\t\t   right: ${e.arrowRight};\n\t\t\t\t\t   top: ${e.arrowTop}; \n\t\t\t\t\t   transform: translateY(-50%);\n\t\t\t\t\t   width: 0;\n\t\t\t\t\t   height: 0;\n\t\t\t\t\t   border-left: ${e.arrowSize} solid transparent;\n\t\t\t\t\t   border-right: ${e.arrowSize} solid transparent;\n\t\t\t\t\t   border-top: ${e.arrowSize} solid ${e.arrowColor};\n\t\t\t\t\t   transition: transform 0.3s ease;\n\t\t\t\t\t   z-index: 1;\n\t\t\t\t\t}\n\t\t\t\t\t.${e.wrapperClass}.${e.openClass} .${e.triggerClass}::after {\n\t\t\t\t\t   transform: translateY(-50%) rotate(180deg);\n\t\t\t\t\t   z-index: 1;  \n\t\t\t\t\t}\n\t\t\t\t\t.${e.triggerClass} {\n\t\t\t\t\t   position: relative;\n\t\t\t\t\t   z-index: 0;\n\t\t\t\t\t}\n\t\t\t\t`,
                    document.head.appendChild(da)));
            if (e.allowHTML) {
                ca.innerHTML = ha;
                if (!e.pointer?.startsWith("question_") && !e.pointer?.startsWith("checkbox_") && e.pointer !== "checkbox" && (q = T.querySelector("option:checked"), e.tag === !0 && q && q.getAttribute("tag"))) {
                    q = q.getAttribute("tag");
                    ha = document.createElement("span");
                    da = e.tagStyle || {};
                    var na = e.tagMap || {},
                        ka = {
                            position: "absolute",
                            right: e.pointer === "radio" ? "40px" : "30px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: da.color || e.tagColor || "#666",
                            fontSize: da.fontSize || "12px",
                            margin: e.tagMargin
                        };
                    da.padding && (ka.padding = da.padding);
                    da.borderRadius && (ka.borderRadius = da.borderRadius);
                    da.fontWeight && (ka.fontWeight = da.fontWeight);
                    na[q] && (ka.backgroundColor = na[q]);
                    Object.assign(ha.style, ka);
                    ha.innerHTML = q;
                    ca.appendChild(ha)
                }
                if (e.pointer && e.pointer.startsWith("question_")) {
                    q = document.createElement("div");
                    q.className = "custom-question trigger-question";
                    Object.assign(q.style, {
                        ...e.questionStyle,
                        width: e.questionSize,
                        height: e.questionSize
                    });
                    if (ha = T.querySelector("option[selected]")) {
                        Object.assign(q.style, {
                            border: `2px solid ${e.questionColor}`,
                            backgroundColor: e.questionColor
                        });
                        q.innerHTML = `<span style="color: white; font-size: calc(${e.questionSize} * 0.6);">\u2713</span>`;
                        ha = ha.getAttribute("tag");
                        if (e.tag === !0 && ha) {
                            da = document.createElement("span");
                            na = e.tagStyle || {};
                            ka = e.tagMap || {};
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
                            ka[ha] && (c.backgroundColor = ka[ha]);
                            Object.assign(da.style, c);
                            da.textContent = ha;
                            ca.appendChild(da)
                        }
                        W.setAttribute("data-aun", "true")
                    } else q.innerHTML = `<span style="font-size: calc(${e.questionSize} * 0.6);">?</span>`;
                    ca.appendChild(q)
                }
                if (e.pointer === "checkbox" || e.pointer?.startsWith("checkbox_")) ca.style.position = "relative", ca.style.paddingRight = "40px", q = document.createElement("div"), q.className = "custom-checkbox trigger-checkbox", Object.assign(q.style, {
                    ...X(),
                    border: `2px solid ${e.buttonColor}`,
                    borderRadius: "3px",
                    backgroundColor: "#fff",
                    zIndex: "2",
                    display: "block",
                    width: e.checkboxSize,
                    height: e.checkboxSize
                }), ca.appendChild(q);
                e.pointer === "radio" && (ca.style.position = "relative", ca.style.paddingRight = "40px", q = document.createElement("div"), q.className = "custom-radio trigger-radio", Object.assign(q.style, {
                        ...X(),
                        border: `2px solid ${e.buttonColor}`,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        width: e.radioSize,
                        height: e.radioSize
                    }), (ha = T.querySelector("option:checked")) &&
                    ha.value && ha.value !== "" && (Object.assign(q.style, {
                        border: `2px solid ${e.radioColor}`
                    }), q.innerHTML = Q(e.radioColor, e)), ca.appendChild(q))
            } else ca.textContent = ha, e.pointer?.startsWith("question_") || e.pointer?.startsWith("checkbox_") || e.pointer === "checkbox" || (q = T.querySelector("option:checked"), e.tag === !0 && q && q.getAttribute("tag") && (q = q.getAttribute("tag"), ha = document.createElement("span"), da = e.tagStyle || {}, na = e.tagMap || {}, ka = {
                position: "absolute",
                right: e.pointer === "radio" ? "40px" : "30px",
                top: "50%",
                transform: "translateY(-50%)",
                color: da.color || e.tagColor || "#666",
                fontSize: da.fontSize || "12px",
                margin: e.tagMargin
            }, da.padding && (ka.padding = da.padding), da.borderRadius && (ka.borderRadius = da.borderRadius), da.fontWeight && (ka.fontWeight = da.fontWeight), na[q] && (ka.backgroundColor = na[q]), Object.assign(ha.style, ka), ha.textContent = q, ca.appendChild(ha)));
            var sa = document.createElement("div");
            sa.className = e.optionsClass;
            sa.style.display = "none";
            sa.style.width = "100%";
            sa.style.boxSizing = "border-box";
            G === "100%" ? (W.style.width = G, W.style.boxSizing =
                "border-box", setTimeout(() => {
                    const c = parseInt(window.getComputedStyle(W).paddingLeft) + parseInt(window.getComputedStyle(W).paddingRight);
                    ca.style.width = `calc(100% - ${c}px)`;
                    sa.style.width = `calc(100% - ${c}px)`
                }, 0)) : G && (W.style.width = G);
            var ta = document.createElement("div");
            ta.style.overflowY = "auto";
            ta.style.overflowX = "hidden";
            ta.style.width = "100%";
            ta.addEventListener("touchmove", function(c) {
                c.stopPropagation()
            }, {
                passive: !0
            });
            Object.assign(ta.style, {
                userSelect: "none",
                webkitUserSelect: "none",
                mozUserSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none"
            });
            Object.assign(ca.style, {
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
            pa && (ta.style.maxHeight = pa);
            sa.appendChild(ta);
            G = m() && !e.slideToggle;
            pa = e.slideToggle ? {} : {
                top: "-9999px",
                left: "-9999px",
                visibility: "hidden"
            };
            e._hasBeenShown = !1;
            fa(sa, {
                ...e.optionsStyle,
                position: e.slideToggle ?
                    "static" : "absolute",
                zIndex: G ? "10000" : "1000",
                ...pa
            });
            var ua = {},
                f = e.optionStyle?.padding ? C(e.optionStyle.padding) : "10px";
            Array.from(T.options || g.children).forEach((c, b) => {
                const a = document.createElement("div");
                a.className = e.optionClass;
                var h = function(n) {
                    let M = 0;
                    const L = n.className ? n.className.split(" ") : [];
                    if (L.length === 0) return M;
                    let D = L[0],
                        u = !0;
                    for (; u;) u = !1, Array.from(T.options || n.children).forEach(F => {
                        F.hasAttribute("group") && F.getAttribute("group") === D && (M++, F.className && (D = F.className.split(" ")[0],
                            u = !0))
                    });
                    return M
                }(c);
                a.setAttribute("data-level", h);
                h = c.getAttribute("group");
                var d = c.className;
                if (c.hasAttribute("group") || c.getAttribute("data-is-group") === "true") {
                    a.classList.add("group-option");
                    a.setAttribute("data-group", h);
                    var k = f;
                    if (d) {
                        var t = d.split(" ")[0];
                        ua[t] && (t = parseFloat(ua[t]), isNaN(t) || (k = t + 10 + "px"))
                    }
                    h && (ua[h] = k);
                    k = document.createElement("div");
                    k.className = "custom-group-arrow";
                    t = ba(e);
                    let n = t.arrowSizeValue,
                        M = t.arrowRightValue;
                    Object.assign(k.style, {
                        position: "absolute",
                        right: M,
                        top: "50%",
                        transform: "translateY(-50%) rotate(0deg)",
                        width: "0",
                        height: "0",
                        borderLeft: `${n} solid transparent`,
                        borderRight: `${n} solid transparent`,
                        borderTop: `${n} solid ${t.arrowColorValue}`,
                        transition: "all 0.3s ease"
                    });
                    a.appendChild(k);
                    k = () => {
                        const L = parseFloat(n),
                            D = parseFloat(M);
                        isNaN(L) || isNaN(D) || a.style.setProperty("padding-right", `${L*2+D+10}px`, "important")
                    };
                    k();
                    a._updateGroupPadding = k;
                    a.style.whiteSpace = "nowrap";
                    a.style.overflow = "hidden";
                    a.style.textOverflow = "ellipsis"
                }
                d && d.split(" ").forEach(n => {
                    n &&
                        n.trim() && (a.classList.add("child-option"), a.classList.add(n))
                });
                a.setAttribute("data-value", c.value || c.getAttribute("value") || "");
                k = {
                    ...e.optionStyle
                };
                if ((t = a.classList.contains("child-option")) && k.padding) {
                    const n = k.padding.split(" ");
                    n.length === 2 ? (k.paddingTop = n[0], k.paddingBottom = n[0], k.paddingRight = n[1], delete k.padding) : n.length === 4 && (k.paddingTop = n[0], k.paddingRight = n[1], k.paddingBottom = n[2], delete k.padding)
                }
                fa(a, {
                    ...k,
                    position: "relative",
                    paddingRight: c.getAttribute("tag") ? "100px" : "40px"
                });
                a.classList.contains("group-option") && h && ua[h] && a.style.setProperty("padding-left", ua[h], "important");
                t && !a.classList.contains("group-option") && d && (k = d.split(" ")[0], d = f, ua[k] && (k = parseFloat(ua[k]), isNaN(k) || (d = k + 10 + "px")), a.style.setProperty("padding-left", d, "important"));
                a.classList.contains("group-option") && a._updateGroupPadding && a._updateGroupPadding();
                a.style.whiteSpace = "nowrap";
                a.style.overflow = "hidden";
                a.style.textOverflow = "ellipsis";
                b === T.options.length - 1 && (a.style.borderBottom = "none");
                !e.dot ||
                    e.pointer?.startsWith("question_") || c.hasAttribute("group") || c.getAttribute("data-is-group") || a.querySelector(".custom-dot") || (b = document.createElement("div"), b.className = "custom-dot", Object.assign(b.style, e.dotStyle), (c.selected || c.hasAttribute("selected")) && Object.assign(b.style, e.dotSelectedStyle), e.pointer && (b.style.right = "40px"), a.appendChild(b));
                c.hasAttribute("img") && (b = c.getAttribute("img"), Object.assign(a.style, {
                        backgroundImage: `url(${b})`,
                        backgroundRepeat: "no-repeat"
                    }), b = new ResizeObserver(n => {
                        const M = n[0].contentRect.height;
                        if (M > 0) {
                            var L = $(n[0].target);
                            L.hasClass("child-option") ? (L = (parseInt(L.attr("data-level")) || 1) * 20, n[0].target.style.setProperty("--image-size", M + 8 + "px"), Object.assign(n[0].target.style, {
                                backgroundSize: `${M}px`,
                                backgroundPosition: `${L}px center`,
                                paddingLeft: `${L+M*1.5}px`
                            })) : Object.assign(n[0].target.style, {
                                backgroundSize: `${M}px`,
                                backgroundPosition: "15px center",
                                paddingLeft: `${M*2}px`
                            })
                        }
                    }), b.observe(a), window._resizeObservers || (window._resizeObservers = new WeakMap),
                    window._resizeObservers.set(a, b));
                if (b = c.getAttribute("tag")) d = e.tagStyle || {}, k = e.tagMap || {}, t = {
                    position: "absolute",
                    right: e.pointer ? "40px" : "30px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: d.color || e.tagColor || "#666",
                    fontSize: d.fontSize || "12px",
                    margin: e.tagMargin
                }, d.padding && (t.padding = d.padding), d.borderRadius && (t.borderRadius = d.borderRadius), d.fontWeight && (t.fontWeight = d.fontWeight), k[b] && (t.backgroundColor = k[b]), d = $("<span>").css(t), e.allowHTML ? d.html(b) : d.text(b), a.appendChild(d[0]);
                e.pointer !==
                    "checkbox" && !e.pointer?.startsWith("checkbox_") || c.hasAttribute("group") || c.getAttribute("data-is-group") === "true" || a.classList.contains("group-option") || (a.style.position = "relative", a.style.paddingRight = "40px", b = c.selected || c.hasAttribute("selected"), a.setAttribute("data-checked", b ? "true" : "false"), d = document.createElement("div"), d.className = "custom-checkbox option-checkbox", Object.assign(d.style, {
                        ...X(),
                        border: b ? `2px solid ${e.checkboxColor}` : `2px solid ${e.buttonColor}`,
                        borderRadius: "3px",
                        backgroundColor: b ?
                            e.checkboxColor : "#fff",
                        zIndex: "2",
                        display: "block",
                        width: e.checkboxSize,
                        height: e.checkboxSize
                    }), b && (d.innerHTML = E(e.checkboxSize)), a.appendChild(d));
                e.pointer !== "radio" || h || (a.style.position = "relative", a.style.paddingRight = "40px", b = document.createElement("div"), b.className = "custom-radio", Object.assign(b.style, {
                        ...X(),
                        border: `2px solid ${e.buttonColor}`,
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        zIndex: "2",
                        width: e.radioSize,
                        height: e.radioSize
                    }), (c.selected || c.hasAttribute("selected")) && (c.value || c.getAttribute("value")) &&
                    (Object.assign(b.style, {
                        border: `2px solid ${e.radioColor}`
                    }), b.innerHTML = Q(e.radioColor, e)), (c.disabled || c.hasAttribute("disabled")) && Object.assign(b.style, {
                        border: `2px solid ${e.buttonColor}`,
                        backgroundColor: "#f5f5f5",
                        cursor: "not-allowed"
                    }), a.appendChild(b));
                e.pointer && e.pointer.startsWith("question_") && !h && (b = document.createElement("div"), b.className = "custom-question option-question", Object.assign(b.style, e.questionStyle), b.innerHTML = "?", a.appendChild(b));
                e.allowHTML ? (b = c.innerHTML, b = b.replace(/\x3c!--([\s\S]*?)--\x3e/g,
                    (n, M) => M.trim()), a.insertAdjacentHTML("afterbegin", b)) : a.insertAdjacentText("afterbegin", c.textContent);
                !c.disabled && !c.hasAttribute("disabled") || h || (a.classList.add("disabled"), fa(a, e.disabledStyle));
                !c.selected && !c.hasAttribute("selected") || h || (a.classList.add("selected"), fa(a, e.selectedOptionStyle));
                ta.appendChild(a)
            });
            z.appendChild(ca);
            W.appendChild(z);
            W.appendChild(sa);
            e.scrollColor && (W.id || (W.id = "select-scroll-" + Math.random().toString(36).substr(2, 9)), Ba($(W), e));
            z = T.parentNode;
            G = T.nextSibling;
            T.style.display = "none";
            W.insertBefore(T, W.firstChild);
            G ? z.insertBefore(W, G) : z.appendChild(W);
            T._needsExpandGroup && (setTimeout(() => {
                if ($(W).find(`[class*="-option"][data-value="${za.value}"]`).length) {
                    const c = za.className?.split(" ") || [],
                        b = new Set;

                    function a(h) {
                        if (h && !b.has(h)) {
                            b.add(h);
                            var d = $(W).find(`[data-group="${h}"]`);
                            d.length && (d.addClass("expanded"), d.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), $(W).find(`.${h}`).show(), (d.attr("class")?.split(" ") || []).forEach(k => {
                                k !== "group-option" && k !== "expanded" && a(k)
                            }))
                        }
                    }
                    c.forEach(h => a(h))
                }
            }, 0), delete T._needsExpandGroup);
            $(W).data("isTriggeredOnce", !1);
            e.onclick === !0 && setTimeout(() => {
                const c = $(W).find(`.${e.triggerClass}`);
                $(W).data("isInitialOpen", !0);
                c.trigger("click")
            }, 0);
            W.setAttribute("data-duration", v);
            W.setAttribute("data-slide-toggle", e.slideToggle)
        }
    });
    if (!window._gong_tea_yun_2) {
        window._gong_tea_yun_2 = !0;
        let g = !1,
            C = !1,
            z = !1,
            q = !1,
            G = null,
            e = !1,
            T = !1;
        $(document).on("mousedown", '[class*="-wrapper"], [class*="-trigger"], [class*="-options"], [class*="-option"]',
            function(f) {
                f.stopPropagation();
                z = C = !0;
                W = !1;
                e = !0;
                window._isMouseDown_gong = !0;
                f = $(this).closest('[class*="-wrapper"]');
                window._gong_tea_yun_3 = f
            });
        $(document).on("mouseup", function(f) {
            window._isMouseDown_gong = !1;
            if (C) {
                var c = z,
                    b = $(f.target).closest('[class*="-wrapper"]').length > 0;
                z = C = !1;
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
                                f = f.keyCode === 38;
                                if (!d) return a.trigger("click"), k.length || h.first().addClass(b.highlightedClass).css("background-color", b.activeBackground), !1;
                                d = c.find(`.${b.optionClass}:not(.disabled)`).filter(function() {
                                    return $(this).css("display") !== "none"
                                });
                                a = c.find(`.${b.optionsClass} > div`).first();
                                h = a.height();
                                a.scrollTop();
                                k.is(":last-child");
                                k.position();
                                k.outerHeight();
                                c.find(`.${b.optionClass}`).removeClass(b.highlightedClass);
                                c.find(`.${b.optionClass}`).each(function() {
                                    const t = $(this);
                                    if (t.hasClass("selected") && b.selectedBg) {
                                        var n = b.selectedBg === !0 ? rgbToRgba(b.activeBackground, .5) : b.selectedBg;
                                        t.attr("style", (t.attr("style") || "") + `; background-color: ${n} !important;`);
                                        t.css("opacity", "1")
                                    } else n = (t.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), t.attr("style", n)
                                });
                                k.length ? (c = d.index(k),
                                    k = f ? d.eq(Math.max(0, c - 1)) : c < d.length - 1 ? d.eq(c + 1) : k) : k = d.first();
                                k.length && (k.hasClass("selected") && b.selectedBg ? k.css("opacity", "0.7") : k.addClass(b.highlightedClass).css("background-color", b.activeBackground), c = k.position().top, d = c + k.outerHeight(), !f && (d >= h || k.is(":last-child")) ? a.scrollTop(d + 1 - h) : f && (c <= 0 || k.is(":first-child")) && a.scrollTop(c));
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
                if ($(this).hasClass("selected")) b.selectedBg && (a = b.selectedBg === !0 ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, $(this).attr("style", ($(this).attr("style") ||
                    "") + `; background-color: ${a} !important;`));
                else {
                    var a = ($(this).attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                    $(this).attr("style", a)
                }
            }), f.addClass(b.highlightedClass), (f.hasClass("selected") || (b.pointer === "checkbox" || b.pointer?.startsWith("checkbox_")) && f.attr("data-checked") === "true") && b.selectedBg ? (c = b.selectedBg === !0 ? rgbToRgba(b.activeBackground, .5) : b.selectedBg, f.attr("style", (f.attr("style") || "") + `; background-color: ${c} !important;`)) : f.css("background-color", b.activeBackground)))
        });
        $(document).on("mouseleave", '[class*="-option"]', function() {
            const f = $(this),
                c = f.closest('[class*="-wrapper"]').data("settings");
            if (c && !f.hasClass("disabled")) {
                var b = f.hasClass("selected") || (c.pointer === "checkbox" || c.pointer?.startsWith("checkbox_")) && f.attr("data-checked") === "true";
                b && c.selectedBg ? f.css("opacity", "1") : (f.removeClass(c.highlightedClass), b && c.selectedBg ? (b = c.selectedBg === !0 ? rgbToRgba(c.activeBackground, .5) : c.selectedBg, f.attr("style", (f.attr("style") || "") + `; background-color: ${b} !important;`)) :
                    (b = (f.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), f.attr("style", b), setTimeout(() => {
                        f.hasClass(c.highlightedClass) || f.css("background-color", c.optionsStyle.background || "")
                    }, 0)))
            }
        });
        let W = !1;
        $(document).on("mousemove", '[class*="-wrapper"]', function(f) {
            C && z && (W = !0)
        });
        let ca = null;
        $(document).on("touchstart", '[class*="-option"]', function(f) {
            ca && clearTimeout(ca);
            const c = $(this);
            q = !0;
            if (c.hasClass("disabled")) G = null;
            else {
                var b = c.closest('[class*="-wrapper"]'),
                    a = b.data("settings");
                a && (G = this,
                    b.find('[class*="-option"]').removeClass(a.highlightedClass), b.find('[class*="-option"]').each(function() {
                        const h = $(this);
                        if (h.hasClass("selected") && a.selectedBg) {
                            var d = a.selectedBg === !0 ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                            h.attr("style", (h.attr("style") || "") + `; background-color: ${d} !important;`)
                        } else d = (h.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), h.attr("style", d)
                    }), ca = setTimeout(() => {
                        if (G === this)
                            if (c.hasClass("selected") && a.selectedBg) c.css("opacity", "0.7");
                            else if (c.addClass(a.highlightedClass),
                            c.hasClass("selected") && a.selectedBg) {
                            const h = a.selectedBg === !0 ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                            c.attr("style", (c.attr("style") || "") + `; background-color: ${h} !important;`)
                        } else c.css("background-color", a.activeBackground)
                    }, 0), f.stopPropagation())
            }
        });
        $(document).on("touchend", function() {
            if (q) {
                if (G) {
                    const f = $(G).closest('[class*="-wrapper"]'),
                        c = f.data("settings");
                    c && (f.find('[class*="-option"]').removeClass(c.highlightedClass), f.find('[class*="-option"]').each(function() {
                        const b = $(this);
                        if (b.hasClass("selected") && c.selectedBg) {
                            var a = c.selectedBg === !0 ? rgbToRgba(c.activeBackground, .5) : c.selectedBg;
                            b.attr("style", (b.attr("style") || "") + `; background-color: ${a} !important;`);
                            b.css("opacity", "1")
                        } else a = (b.attr("style") || "").replace(/background-color:[^;]+;?/g, ""), b.attr("style", a)
                    }))
                }
                q = !1;
                G = null
            }
        });
        $(document).on("touchend", '[class*="-option"]:not(.disabled)', function(f) {
            this === G && $(this).trigger("click");
            f.stopPropagation()
        });
        $(document).on("click", "[data-group]", function(f) {
            function c(F) {
                function K(r) {
                    a.find("." +
                        r).each(function() {
                        var J = $(this);
                        w.add(this);
                        if (J.attr("group") || J.data("group")) J = J.attr("group") || J.data("group"), K(J)
                    })
                }
                const w = new Set;
                F = F.data("group");
                K(F);
                return w
            }
            f.preventDefault();
            f.stopPropagation();
            e = window._isGroupClick = !0;
            const b = $(this).closest('[class*="-wrapper"]'),
                a = b.find('[class*="-options"]'),
                h = a.find("div").first(),
                d = b.data("settings"),
                k = parseInt(b.attr("data-duration")),
                t = m() ? a : h,
                n = m() ? t.scrollTop() : null,
                M = () => {
                    window._heightCache || (window._heightCache = new Map);
                    let F = 0;
                    const K = [];
                    a.find("li, option").each(function() {
                        $(this).css("display") !== "none" && K.push(this)
                    });
                    K.forEach(w => {
                        const r = $(w);
                        var J = w.id || r.data("height-id");
                        w = window._heightCache.get(J);
                        w || (w = r.outerHeight(!0), J ? window._heightCache.set(J, w) : (J = "height-" + Math.random().toString(36).substr(2, 9), r.data("height-id", J), window._heightCache.set(J, w)));
                        F += w
                    });
                    requestAnimationFrame(() => {
                        const w = Math.min(F, d.Mheight),
                            r = d.optionsStyle.background || "#fff";
                        h.css({
                            height: w,
                            overflowY: "auto",
                            WebkitOverflowScrolling: "touch",
                            backgroundColor: r
                        });
                        a.css({
                            height: w,
                            backgroundColor: r
                        })
                    });
                    window._heightCache.size > 1E3 && window._heightCache.clear()
                },
                L = $(this).data("group");
            f = $(this).hasClass("expanded");
            $(this).toggleClass("expanded");
            var D = $(this).find(".custom-group-arrow");
            if (f) {
                D.css("transform", "translateY(-50%) rotate(0deg)");
                f = c($(this));
                const F = {};
                f.forEach(r => {
                    r = $(r);
                    const J = r.attr("group") || r.data("group");
                    J && J !== L && (F[J] = r.hasClass("expanded"))
                });
                $(this).data("childStates", F);
                const K = new Set(f);
                f.forEach(r => {
                    r = $(r);
                    const J = r.attr("group") || r.data("group");
                    J && J !== L && a.find("." + J).filter(function() {
                        const A = $(this);
                        return (A.attr("group") || A.data("group")) !== J
                    }).each(function() {
                        K.add(this)
                    })
                });
                const w = Array.from(K);
                w.forEach(r => {
                    r = $(r);
                    if (r.attr("group") || r.data("group")) r.removeClass("expanded"), r.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)");
                    r.css("opacity", "0.1")
                });
                w.length > 0 && $(w).slideUp(k, {
                    useQueue: !1
                }, function() {
                    w.forEach(r => {
                        $(r).css({
                            opacity: "1",
                            display: "none"
                        })
                    });
                    M()
                })
            } else {
                D.css("transform",
                    "translateY(-50%) rotate(180deg)");
                D = a.find("." + L);
                f = !$(this).closest("li").hasClass(L);
                const F = $(this).data("childStates"),
                    K = [];
                D = D.filter(function() {
                    const w = $(this),
                        r = w.attr("group") || w.data("group");
                    return r && r !== L ? (K.push({
                        $element: w,
                        groupName: r,
                        wasExpanded: F && F[r] || !1
                    }), !1) : !0
                });
                K.forEach(function(w) {
                    w = w.$element;
                    w.show();
                    w.css("opacity", "1");
                    w[0] && w[0].style && w[0].style.setProperty("opacity", "1", "important")
                });
                D.show();
                D.hide();
                if (D.length > 0) {
                    var u = $(this).closest('[class*="-wrapper"]').find("select");
                    const w = u.val(),
                        r = u[0] ? u[0].selectedIndex : -1;
                    u = D.filter(function() {
                        var A = $(this);
                        const O = A.attr("data-value") || A.data("value");
                        A = A.index();
                        return w && O === w || A === r
                    });
                    const J = D.not(u);
                    u.length > 0 && u.show().css("opacity", "1");
                    J.length > 0 && J.css("opacity", "0.1").slideDown(k, {
                        useQueue: !1
                    }, function() {
                        $(this).css("opacity", "1");
                        this.style && this.style.setProperty("opacity", "1", "important");
                        M()
                    })
                }
                f && !m() ? (f = D.length > 0 ? D.first().outerHeight() : 0, D = t[0] || t, t.animate && typeof t.animate === "function" ? t.animate({
                        scrollTop: f
                    },
                    k) : D && typeof D.scrollTo === "function" ? D.scrollTo({
                    top: f,
                    behavior: "smooth"
                }) : D && (D.scrollTop = f)) : f && m() && n !== null && setTimeout(() => {
                    t.scrollTop(n)
                }, k + 50);
                K.forEach(function(w) {
                    const r = w.$element,
                        J = w.groupName;
                    w = w.wasExpanded;
                    r.css("opacity", "1");
                    r[0] && r[0].style && r[0].style.setProperty("opacity", "1", "important");
                    w ? (r.addClass("expanded").find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), a.find("." + J).filter(function() {
                        const A = $(this);
                        return (A.attr("group") || A.data("group")) !==
                            J
                    }).css("opacity", "0.1").slideDown(k, {
                        useQueue: !1
                    }, function() {
                        $(this).css("opacity", "1");
                        this.style && this.style.setProperty("opacity", "1", "important");
                        M()
                    })) : (r.removeClass("expanded").find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)"), a.find("." + J).filter(function() {
                        const A = $(this);
                        return (A.attr("group") || A.data("group")) !== J
                    }).hide())
                })
            }
            setTimeout(() => {
                e = window._isGroupClick = !1;
                b.data("groupClicked", !1)
            }, 300);
            return !1
        });

        function pa(f, c, b, a) {
            const h = b.pointer.split("_")[1],
                d = h + "_return";
            if (typeof window[h] === "function") {
                f[0].setAttribute("data-aun", "true");
                a = f.find("select, ul").first();
                c = c.index();
                var k = a.find("option").eq(c);
                const t = k.val(),
                    n = p(k.html(), 1),
                    M = p(k.html());
                k = k.attr("tag");
                a = B(S(a[0], c).text);
                window[h]({
                    value: t,
                    text: n,
                    html: M,
                    tag: k,
                    group: a,
                    index: c
                });
                window[h + "_close"] = function() {
                    const L = $('[data-state="opened"][data-aun="true"]').filter(function() {
                        const r = $(this).data("settings");
                        return r && r.pointer === `question_${h}`
                    });
                    if (!L.length) return !1;
                    const D = L.data("settings"),
                        u = L.find(`.${D.optionsClass}`),
                        F = parseInt(L.attr("data-duration")),
                        K = m(),
                        w = $(".select-overlay");
                    w.css("background-color", "rgba(0, 0, 0, 0)");
                    setTimeout(() => {
                        w.hide()
                    }, F);
                    L[0].removeAttribute("data-aun");
                    L.removeClass(D.openClass);
                    L.attr("data-state", "closed");
                    K && !D.slideToggle ? I(u, F, w, D) : N(u, F, D);
                    return !0
                };
                window[d] = function(L, D, u) {
                    f.data("forcedClose", !0);
                    const F = f.find(`.${b.triggerClass}`),
                        K = f.find(`.${b.optionsClass}`),
                        w = parseInt(f.attr("data-duration")),
                        r = m(),
                        J = $(".select-overlay");
                    J.css("background-color",
                        "rgba(0, 0, 0, 0)");
                    setTimeout(() => {
                        J.hide()
                    }, w);
                    var A = "";
                    let O = null;
                    typeof D === "function" ? O = D : (A = D, O = u);
                    D = L.split(": ")[1];
                    D = f.find("select, ul").first().find(`option[value="${D}"]`);
                    A = A || D.attr("tag");
                    if (b.allowHTML)
                        if (b.tag === !0 && A) {
                            D = b.tagStyle || {};
                            u = b.tagMap || {};
                            const qa = {
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: D.color || b.tagColor || "#666",
                                fontSize: D.fontSize || "12px",
                                right: b.pointer === "radio" || b.pointer.includes("question_") ? "40px" : "30px",
                                margin: b.tagMargin
                            };
                            D.padding &&
                                (qa.padding = D.padding);
                            D.borderRadius && (qa.borderRadius = D.borderRadius);
                            D.fontWeight && (qa.fontWeight = D.fontWeight);
                            u[A] && (qa.backgroundColor = u[A]);
                            A = $("<span>").css(qa).html(A);
                            F.html(L).append(A)
                        } else F.html(L);
                    else F.text(L);
                    f.attr("data-aun", "true");
                    L = $("<div>").addClass("custom-question trigger-question").css({
                        ...b.questionStyle,
                        border: `2px solid ${b.questionColor}`,
                        backgroundColor: b.questionColor,
                        width: b.questionSize,
                        height: b.questionSize
                    }).html(`<span style="color: white; font-size: calc(${b.questionSize} * 0.6);">\u2713</span>`);
                    F.append(L);
                    f.removeClass(b.openClass);
                    f.attr("data-state", "closed");
                    r && !b.slideToggle ? I(K, w, J, b) : K.slideUp(w, {
                        easing: b.easing
                    });
                    typeof O === "function" && O();
                    delete window[d];
                    return !0
                }
            }
            return !1
        }

        function ha(f, c, b, a) {
            if (!c.hasClass(b.optionClass) || c.data("processing")) return !1;
            c.data("processing", !0);
            try {
                a.stopImmediatePropagation();
                a.preventDefault();
                let h = c.find(".custom-checkbox");
                const d = c[0].getBoundingClientRect(),
                    k = a.clientX || a.originalEvent?.touches?.[0]?.clientX,
                    t = a.clientY || a.originalEvent?.touches?.[0]?.clientY,
                    n = c.hasClass("group-option") || c.attr("data-group") || c.data("group");
                if (!(h.length && h[0] || n)) {
                    c.css({
                        position: "relative",
                        paddingRight: "40px"
                    });
                    const A = document.createElement("div");
                    A.className = "custom-checkbox option-checkbox";
                    const O = c.attr("data-checked") === "true";
                    Object.assign(A.style, {
                        ...X(),
                        border: O ? `2px solid ${b.checkboxColor}` : `2px solid ${b.buttonColor}`,
                        borderRadius: "3px",
                        backgroundColor: O ? b.checkboxColor : "#fff",
                        zIndex: "2",
                        display: "block",
                        width: b.checkboxSize,
                        height: b.checkboxSize
                    });
                    O && (A.innerHTML =
                        E(b.checkboxSize));
                    c.append(A);
                    h = c.find(".custom-checkbox")
                }
                if (!(k >= d.left - 1 && k <= d.right + 1 && t >= d.top - 1 && t <= d.bottom + 1)) return c.data("processing", !1), !1;
                const M = c.attr("data-checked") === "true",
                    L = f.find('[data-checked="true"]').get(),
                    D = (a = !M) ? L.length + 1 : L.length - 1,
                    u = f.find("select").first(),
                    F = c.index(),
                    K = u.find("option").eq(F),
                    w = {
                        value: K.val(),
                        text: p(K.html(), 1),
                        html: p(K.html()),
                        tag: K.attr("tag"),
                        checked: a,
                        index: F,
                        count: D,
                        group: B(S(u[0], F).text)
                    };
                if (b.pointer?.startsWith("checkbox_")) {
                    const A = b.pointer.split("checkbox_")[1];
                    if (typeof window[A] === "function" && window[A](w) === !1) return c.data("processing", !1), !1
                }
                c.attr("data-checked", a.toString());
                f.attr("data-check-count", D);

                function r(A, O, qa) {
                    return {
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: `calc(${A} + ${4}px)`,
                        height: `calc(${A} + ${4}px)`,
                        borderRadius: "3px",
                        border: `${2}px solid ${qa?O:b.buttonColor}`,
                        backgroundColor: qa ? O : "#fff",
                        WebkitTapHighlightColor: "transparent",
                        display: "block",
                        zIndex: "2",
                        boxSizing: "border-box",
                        padding: "0"
                    }
                }
                if (!(h.length &&
                        h[0] || n)) {
                    c.css({
                        position: "relative",
                        paddingRight: "40px"
                    });
                    const A = document.createElement("div");
                    A.className = "custom-checkbox option-checkbox";
                    Object.assign(A.style, {
                        ...X(),
                        borderRadius: "3px",
                        zIndex: "2",
                        display: "block",
                        width: b.checkboxSize,
                        height: b.checkboxSize
                    });
                    c.append(A);
                    h = c.find(".custom-checkbox")
                }
                const J = f.find(`.${b.triggerClass}`).find(".custom-checkbox");
                a ? (h.css(r(b.checkboxSize, b.checkboxColor, !0)).html(E(b.checkboxSize)), D > 0 && J.css(r(b.checkboxSize, b.checkboxColor, !0)).html(ja(D, b.checkboxSize))) :
                    (h.css(r(b.checkboxSize, b.buttonColor, !1)).empty(), D === 0 ? J.css(r(b.checkboxSize, b.buttonColor, !1)).empty() : J.css(r(b.checkboxSize, b.checkboxColor, !0)).html(ja(D, b.checkboxSize)));
                if (b.selectedBg) {
                    const A = b.selectedBg === !0 ? rgbToRgba(b.activeBackground, .5) : b.selectedBg;
                    $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${A} !important; }</style>`);
                    f.find(`.${b.optionClass}`).each(function() {
                        const O = $(this);
                        O.attr("data-checked") ===
                            "true" ? (O.addClass("selected").addClass("selected-bg-active"), O[0].style.setProperty("background-color", A, "important")) : (O.removeClass("selected").removeClass("selected-bg-active"), O[0].style.removeProperty("background-color"));
                        O.css("font-weight", "normal")
                    })
                } else a ? (c.addClass("selected"), c.css("font-weight", "bold")) : (c.removeClass("selected"), c.css("font-weight", "normal"));
                if (b.closeBox) {
                    const A = $(".select-overlay");
                    A.css("pointer-events", "none").hide();
                    setTimeout(() => {
                        A.css("pointer-events", "");
                        c.data("processing", !1)
                    }, 50)
                } else {
                    const A = parseInt(f.attr("data-duration")),
                        O = f.find(`.${b.optionsClass}`),
                        qa = m(),
                        xa = $(".select-overlay");
                    qa && !b.slideToggle ? V(O, A, xa, f, b) : (f.removeClass(b.openClass), xa.css("pointer-events", "none").hide(), A ? O.slideUp(A, {
                        easing: b.easing,
                        complete: () => {
                            setTimeout(() => {
                                xa.css("pointer-events", "");
                                c.data("processing", !1)
                            }, 50)
                        }
                    }) : (O.hide(), xa.css("pointer-events", ""), setTimeout(() => {
                        c.data("processing", !1)
                    }, 50)))
                }
                return !1
            } catch (h) {
                return console.error("[handleCheckboxPointer] \uc5d0\ub7ec \ubc1c\uc0dd:",
                    h), c.data("processing", !1), !1
            } finally {
                setTimeout(() => {
                    c.data("processing") && (console.warn("[handleCheckboxPointer] \ud50c\ub798\uadf8 \uac15\uc81c \ud574\uc81c"), c.data("processing", !1))
                }, 1E3)
            }
        }

        function za(f, c, b) {
            const a = f.find(`.${b.triggerClass}`),
                h = parseInt(f.attr("data-selected-index"));
            let d = a.find(".custom-radio");
            d.length ? d = d[0] : (d = document.createElement("div"), d.className = "custom-radio trigger-radio");
            Object.assign(d.style, {
                ...X(),
                border: c !== void 0 ? `2px solid ${b.radioColor}` : `2px solid ${b.buttonColor}`,
                borderRadius: "50%",
                backgroundColor: "#fff",
                width: b.radioSize,
                height: b.radioSize
            });
            d.innerHTML = c !== void 0 ? Q(b.radioColor, b) : "";
            f.find(".custom-radio").not(".trigger-radio").each(function() {
                const t = $(this).closest('[class*="-option"]');
                var n = t.attr("data-value");
                const M = t.index();
                n = n === c && M === h;
                Object.assign(this.style, {
                    border: n ? `2px solid ${b.radioColor}` : `2px solid ${b.buttonColor}`,
                    backgroundColor: "#fff"
                });
                n ? (this.innerHTML = Q(b.radioColor, b), t.addClass("selected"), b.selectedBg || t.css("font-weight",
                    "bold")) : (this.innerHTML = "", t.removeClass("selected").css("font-weight", "normal"))
            });
            a.find(".custom-radio").remove();
            a.append(d);
            var k = f.find("select").first();
            f = k.find("option").eq(h);
            f.length && (k = S(k[0], h), f.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim(), a.html(k.text + d.outerHTML));
            domqueryFocus()
        }

        function da(f, c) {
            f.attr("data-selected-value", "");
            f.attr("data-selected-index", "-1");
            const b = f.find(`.${c.triggerClass}`),
                a = f.find("select, ul").first();
            var h = a.find("option").first();
            h = c.allowHTML ?
                h.html() : h.text();
            b.find(".custom-radio").remove();
            const d = document.createElement("div");
            d.className = "custom-radio trigger-radio";
            Object.assign(d.style, {
                ...X(),
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
            ka(f)
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
            ka(f)
        }

        function ka(f) {
            const c = f.find('[class*="-options"]');
            parseInt(f.attr("data-duration"));
            c.find("[data-group]").each(function() {
                const b = $(this),
                    a = b.find(".custom-group-arrow"),
                    h = b.data("group");
                b.hasClass("expanded") && (b.removeClass("expanded"), a.css("transform", "translateY(-50%) rotate(0deg)"));
                c.find("." + h).each(function() {
                    const d = $(this);
                    if (d.attr("group") || d.data("group")) d.removeClass("expanded"),
                        d.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(0deg)");
                    d.hide()
                })
            })
        }

        function sa(f, c) {
            const b = ["custom-checkbox", "custom-radio", "custom-question", "custom-dot"];
            Array.from(f.childNodes).forEach(h => {
                (h.nodeType === Node.TEXT_NODE || h.nodeType === Node.ELEMENT_NODE && !b.some(d => h.classList.contains(d))) && h.remove()
            });
            c = document.createTextNode(c.replace(/<[^>]*>/g, ""));
            const a = Array.from(f.childNodes).find(h => h.nodeType === Node.ELEMENT_NODE && b.some(d => h.classList.contains(d)));
            a ? f.insertBefore(c,
                a) : f.appendChild(c)
        }

        function ta(f, c) {
            const b = f.find(`.${c.triggerClass}`),
                a = f.find("select, ul").first().find("li, option").first().html(),
                h = c.pointer === "checkbox" || c.pointer?.startsWith("checkbox_");
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
            h ?
                sa(b[0], a) : b.html(a);
            c.selectedBg && f.find(`.${c.optionClass}`).each(function() {
                $(this).removeClass("selected-bg-active").css("background-color", "")
            });
            ka(f)
        }

        function ua(f, c, b) {
            const a = f.find("select, ul").first();
            c = c.find(`.${b.optionClass}`).first();
            if (b.pointer === "checkbox" || b.pointer?.startsWith("checkbox_")) c.hide();
            else if (b.pointer === "radio") parseInt(f.attr("data-selected-index") || "-1") > -1 ? c.show() : c.hide();
            else {
                b = f.attr("data-selected-value");
                const h = parseInt(f.attr("data-selected-index"));
                a.find("option[group]").length > 0 ? h === -1 && b === void 0 || h === 0 && (!b || b === "") ? (c.hide(), ka(f)) : c.show() : (h !== -1 || b && b !== "") && (h !== 0 || b && b !== "") ? c.show() : c.hide()
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
                c.hasClass("selected") && a.pointer !== "checkbox" && !a.pointer?.startsWith("checkbox_") && (c.removeClass("selected"), c.removeClass(a.highlightedClass), c.removeClass("selected-bg-active"), c.css("font-weight", "normal"), a.selectedBg && c[0].style.removeProperty("background-color"), c[0].classList.remove("selected"), c[0].classList.remove(a.highlightedClass), c[0].classList.remove("selected-bg-active"));
                b.attr("data-current-index", k);
                if ((c.attr("group") || c.attr("data-group")) &&
                    !c.attr("value")) return f.preventDefault(), b.data("groupClicked", !0), !1;
                b.data("groupClicked", !1);
                typeof W !== "undefined" && W && (W = !1);
                W = !1;
                if (typeof g !== "undefined" && g) f.preventDefault(), f.stopPropagation(), b.removeData("optionClickProcessing");
                else {
                    if (c.hasClass("disabled")) return f.preventDefault(), b.removeData("optionClickProcessing"), !1;
                    if (a.pointer && a.pointer.startsWith("question_") && (f.preventDefault(), f.stopPropagation(), pa(b, c, a, f) === !1)) return b.removeData("optionClickProcessing"), !1;
                    if (c.index() ===
                        0 || c.attr("data-value") === "" || !c.attr("data-value")) switch (a.pointer) {
                        case "radio":
                            da(b, a);
                            break;
                        case "checkbox":
                            na(b, a);
                            break;
                        default:
                            ta(b, a)
                    }
                    h.find("option[group]").length > 0 && k === 0 && (!d || d === "") && ka(b);
                    if (a.pointer !== "radio" || k !== 0 && d && d !== "") {
                        if (a.pointer === "checkbox" || a.pointer?.startsWith("checkbox_")) return f.preventDefault(), f.stopPropagation(), f.stopImmediatePropagation(), d = ha(b, c, a, f), b.removeData("optionClickProcessing"), d;
                        if (k === 0 && (!d || d === "")) {
                            if (b.data("processingReset")) return !1;
                            b.data("processingReset",
                                !0);
                            try {
                                b.attr("data-selected-value", "");
                                b.attr("data-selected-index", "-1");
                                var t = h[0];
                                const r = h.find("li, option").first().html();
                                var n = h.find("option").eq(0);
                                const J = b.find(`.${a.triggerClass}`);
                                if (a.pointer === "checkbox" || a.pointer?.startsWith("checkbox_")) {
                                    const A = a.allowHTML ? r : h.find("li, option").first().text();
                                    sa(J[0], A)
                                } else a.allowHTML ? J.html(r) : J.text(h.find("li, option").first().text());
                                h.find("option, li").prop("selected", !1);
                                r && h.find("option").eq(0).prop("selected", !0);
                                b.find('[class*="-option"]').removeClass("selected").removeClass(a.highlightedClass).css("font-weight",
                                    "normal");
                                a.dot && b.find(".custom-dot").each(function() {
                                    Object.assign(this.style, {
                                        ...a.dotStyle,
                                        border: `2px solid ${a.buttonColor}`,
                                        backgroundColor: "#fff"
                                    })
                                });
                                if (t._selectId) {
                                    n.html().replace(/\x3c!--(.*?)--\x3e/g, "$1").trim();
                                    k = function(A, O = 0) {
                                        return O === 1 ? A.replace(/\x3c!--(.*?)--\x3e/g, "$1").replace(/<[^>]*>/g, "") : A.replace(/\x3c!--(.*?)--\x3e/g, "$1")
                                    };
                                    d = "";
                                    try {
                                        if (typeof S === "function") {
                                            const A = S(t, 0);
                                            A && (d = A.text)
                                        }
                                    } catch (A) {
                                        console.warn("Error in findGroupPath:", A)
                                    }
                                    var M = {
                                            value: "",
                                            text: k(n.html(),
                                                1),
                                            html: k(n.html()),
                                            tag: n.attr("tag"),
                                            element: n[0],
                                            select: t,
                                            index: 0,
                                            group: function(A) {
                                                const O = document.createElement("div");
                                                O.innerHTML = A;
                                                return O.textContent || O.innerText || ""
                                            }(d)
                                        },
                                        L = window._gong_tea_yun_0.get(t._selectId + "_callback");
                                    L && L.call(this, M);
                                    var D = window._gong_tea_yun_0.get(t._selectId + "_onSelect");
                                    D && D.call(this, M);
                                    h.trigger("change")
                                }
                                var u = parseInt(b.attr("data-duration")) || 0,
                                    F = b.find(`.${a.optionsClass}`);
                                m() && !a.slideToggle ? V(F, u, $(".select-overlay"), b, a) : (b.removeClass(a.openClass),
                                    b.attr("data-state", "closed"), F.slideUp(u, {
                                        easing: a.easing,
                                        complete: function() {
                                            setTimeout(() => {
                                                b.removeData("processingReset")
                                            }, 100)
                                        }
                                    }))
                            } catch (r) {
                                console.error("Reset error:", r), b.removeData("processingReset")
                            }
                            return !1
                        }
                        t = b.find("select").first()[0];
                        b.find('[class*="-option"]').each(function(r) {
                            r = $(this);
                            r.removeClass("selected").removeClass(a.highlightedClass).removeClass("selected-bg-active").css("font-weight", "normal");
                            this.classList.remove("selected");
                            this.classList.remove(a.highlightedClass);
                            this.classList.remove("selected-bg-active");
                            a.selectedBg && this.style.removeProperty("background-color");
                            a.pointer === "radio" && r.find(".custom-radio").removeClass("selected")
                        });
                        c.addClass("selected").addClass(a.highlightedClass);
                        a.selectedBg ? (c.addClass("selected-bg-active"), n = a.selectedBg === !0 ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${n} !important; }</style>`),
                            c[0].style.setProperty("background-color", n, "important"), c.css("font-weight", "normal")) : c.css("font-weight", "bold");
                        a.pointer === "radio" && c.find(".custom-radio").addClass("selected");
                        a.dot && (b.find(".custom-dot").each(function() {
                            Object.assign(this.style, a.dotStyle)
                        }), c.find(".custom-dot").css(a.dotSelectedStyle));
                        (d || d === "") && b.attr({
                            "data-selected-value": d,
                            "data-selected-index": k
                        });
                        h.find("option").prop("selected", !1);
                        h.find("option").eq(k).prop("selected", !0);
                        h.trigger("change");
                        if (t._selectId) {
                            h =
                                h.find("option").eq(k);
                            c = S(t, k);
                            n = b.find(`.${a.triggerClass}`);
                            n.empty();
                            if (h.attr("img")) u = h.attr("img"), Object.assign(n[0].style, {
                                    backgroundImage: `url(${u})`,
                                    backgroundRepeat: "no-repeat"
                                }), u = new ResizeObserver(r => {
                                    const J = r[0].contentRect.height;
                                    J > 0 && Object.assign(r[0].target.style, {
                                        backgroundSize: `${J}px`,
                                        backgroundPosition: `${J/2}px center`,
                                        paddingLeft: `calc(${J*2}px)`
                                    })
                                }), u.observe(n[0]), window._triggerResizeObservers || (window._triggerResizeObservers = new WeakMap), (F = window._triggerResizeObservers.get(n[0])) &&
                                F.disconnect(), window._triggerResizeObservers.set(n[0], u);
                            else if (Object.assign(n[0].style, {
                                    backgroundImage: "none",
                                    backgroundPosition: "initial",
                                    backgroundSize: "initial",
                                    paddingLeft: a.defaultPadding || "10px"
                                }), window._triggerResizeObservers && (u = window._triggerResizeObservers.get(n[0]))) u.disconnect(), window._triggerResizeObservers.delete(n[0]);
                            a.allowHTML ? n.html(c.text) : n.text(c.text);
                            a.pointer === "radio" && (b.attr({
                                "data-selected-value": d,
                                "data-selected-index": k
                            }), za(b, d, a));
                            u = h.attr("tag") || "";
                            a.tag ===
                                !0 && u && (F = document.createElement("span"), M = a.tagStyle || {}, L = a.tagMap || {}, D = {
                                    position: "absolute",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: M.color || a.tagColor || "#666",
                                    fontSize: M.fontSize || "12px",
                                    right: a.pointer === "radio" ? "40px" : "30px",
                                    margin: a.tagMargin
                                }, M.padding && (D.padding = M.padding), M.borderRadius && (D.borderRadius = M.borderRadius), M.fontWeight && (D.fontWeight = M.fontWeight), L[u] && (D.backgroundColor = L[u]), Object.assign(F.style, D), a.allowHTML ? F.innerHTML = u : F.textContent = u, n.append(F));
                            d = {
                                value: d,
                                text: p(h.html(), 1),
                                html: p(h.html()),
                                tag: u,
                                element: h[0],
                                select: t,
                                index: k,
                                group: B(c.text)
                            };
                            (k = window._gong_tea_yun_0.get(t._selectId + "_callback")) && k.call(this, d);
                            (k = window._gong_tea_yun_0.get(t._selectId + "_onSelect")) && k.call(this, d)
                        }
                        b.removeData("optionClickProcessing");
                        d = parseInt(b.attr("data-duration")) || 0;
                        k = b.find(`.${a.optionsClass}`);
                        var K = $(".select-overlay"),
                            w = function() {
                                b.find('[class*="-option"]').removeClass("selected");
                                [50, 100, 200].forEach(r => {
                                    setTimeout(() => {
                                        const J = b.find('[class*="-option"].selected');
                                        J.length > 0 && J.removeClass("selected")
                                    }, r)
                                })
                            };
                        m() && !a.slideToggle ? (V(k, d, K, b, a), w()) : (b.removeClass(a.openClass), b.attr("data-state", "closed"), K.css("background-color", "rgba(0, 0, 0, 0)"), a.slideToggle && a.opacity !== void 0 ? k.css("opacity", a.opacity || 0) : k.css("opacity", ""), k.slideUp(d, {
                            easing: a.easing,
                            complete: function() {
                                K.hide();
                                y(b);
                                domqueryFocus();
                                w()
                            }
                        }))
                    } else da(b, a), d = parseInt(b.attr("data-duration")) || 0, k = b.find(`.${a.optionsClass}`), m() && !a.slideToggle ? V(k, d, $(".select-overlay"), b, a) : (b.removeClass(a.openClass),
                        k.slideUp(d, {
                            easing: a.easing
                        })), b.removeData("optionClickProcessing")
                }
            }
        });
        $(document).on("click", '[class*="-trigger"]', function(f) {
            function c(u) {
                function F() {
                    D || (D = !0, b.data("isInitialOpen") && b.removeData("isInitialOpen"), a.trigger && domquery(a.trigger).trigger("click"), a.triggerOnce && !b.data("isTriggeredOnce") && (domquery(a.triggerOnce).trigger("click"), b.data("isTriggeredOnce", !0)))
                }
                u = m();
                var K = b.find("select").first()[0];
                K._selectId && (K = window._gong_tea_yun_0.get(K._selectId + "_open")) && K.call(this);
                ua(b, d, a);
                const w = parseInt(b.attr("data-selected-index")),
                    r = b.attr("data-selected-value");
                K = r;
                let J = w;
                const A = b.find('[class*="-option"].selected').first();
                A.length && !K && J <= 0 && (K = A.attr("value") || A.attr("data-value"), J = A.index());
                if (J > 0 || K) {
                    var O;
                    K ? O = d.find(`[value="${K}"], [data-value="${K}"]`) : J > 0 && (O = d.find(`.${a.optionClass}`).eq(J));
                    if (O && O.length && (O = (O.attr("class")?.split(" ") || []).filter(P => P !== a.optionClass && P !== "selected" && P !== a.highlightedClass), O.length > 0)) {
                        const P = new Set,
                            R = ea => {
                                if (ea &&
                                    !P.has(ea)) {
                                    P.add(ea);
                                    var Y = d.find(`[data-group="${ea}"]`);
                                    Y.length && (Y.addClass("expanded"), Y.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), d.find(`.${ea}`).show(), (Y.attr("class")?.split(" ") || []).forEach(oa => {
                                        oa !== "group-option" && oa !== "expanded" && R(oa)
                                    }))
                                }
                            };
                        O.forEach(ea => R(ea));
                        O = d.css("display");
                        d.css("display", "block");
                        d.outerHeight(!0);
                        d.css("display", O)
                    }
                }
                const qa = () => {
                        if ((a.pointer === "checkbox" || a.pointer?.startsWith("checkbox_")) && a.selectedBg) {
                            const P = a.selectedBg ===
                                !0 ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                            $("#dynamic-selected-bg-style").length || $("head").append(`<style id="dynamic-selected-bg-style">.selected-bg-active { background-color: ${P} !important; }</style>`);
                            b.find('[data-checked="true"]').each(function() {
                                const R = $(this);
                                R.addClass("selected").addClass("selected-bg-active");
                                R[0].style.setProperty("background-color", P, "important");
                                R.css("font-weight", "normal")
                            });
                            b.find(`.${a.optionClass}`).not('[data-checked="true"]').each(function() {
                                const R =
                                    $(this);
                                R.removeClass("selected").removeClass("selected-bg-active");
                                R[0].style.removeProperty("background-color");
                                R.css("font-weight", "normal")
                            })
                        }
                    },
                    xa = () => {
                        var P = r;
                        let R = w;
                        const ea = b.find('[class*="-option"].selected').first();
                        ea.length && !P && R <= 0 && (P = ea.attr("value") || ea.attr("data-value"), R = ea.index(), (P || R > 0) && b.attr({
                            "data-selected-value": P || "",
                            "data-selected-index": R
                        }));
                        b.find('[class*="-option"]').each(function() {
                            const Y = $(this);
                            Y.removeClass("selected").removeClass(a.highlightedClass).removeClass("selected-bg-active").css("font-weight",
                                "normal");
                            a.selectedBg && Y[0].style.removeProperty("background-color");
                            this.classList.remove("selected");
                            this.classList.remove(a.highlightedClass);
                            this.classList.remove("selected-bg-active")
                        });
                        if (R > 0 || P) {
                            let Y;
                            P ? Y = d.find(`[value="${P}"], [data-value="${P}"]`) : R > 0 && (Y = d.find(`.${a.optionClass}`).eq(R));
                            if (Y && Y.length) {
                                P = (Y.attr("class")?.split(" ") || []).filter(ia => ia !== a.optionClass && ia !== "selected" && ia !== a.highlightedClass);
                                const oa = new Set,
                                    Aa = ia => {
                                        if (ia && !oa.has(ia)) {
                                            oa.add(ia);
                                            var va = d.find(`[data-group="${ia}"]`);
                                            va.length && (va.addClass("expanded"), va.find(".custom-group-arrow").css("transform", "translateY(-50%) rotate(180deg)"), d.find(`.${ia}`).show(), (va.attr("class")?.split(" ") || []).forEach(la => {
                                                la !== "group-option" && la !== "expanded" && Aa(la)
                                            }))
                                        }
                                    };
                                P.forEach(ia => Aa(ia));
                                Y.addClass("selected").addClass(a.highlightedClass);
                                Y[0].classList.add("selected");
                                Y[0].classList.add(a.highlightedClass);
                                a.selectedBg ? (P = a.selectedBg === !0 ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, Y.attr("style", (Y.attr("style") || "") +
                                    `; background-color: ${P} !important;`)) : Y.css("font-weight", "bold");
                                if (a.selectedBg) {
                                    const ia = a.selectedBg === !0 ? rgbToRgba(a.activeBackground, .5) : a.selectedBg;
                                    setTimeout(() => {
                                        Y.attr("style", (Y.attr("style") || "") + `; background-color: ${ia} !important;`)
                                    }, 50);
                                    setTimeout(() => {
                                        Y.attr("style", (Y.attr("style") || "") + `; background-color: ${ia} !important;`)
                                    }, 200)
                                }
                                a.autoScrollToSelected !== void 0 && a.autoScrollToSelected && (P = parseInt(b.attr("data-duration")) || 300, setTimeout(() => {
                                    d.find("div").first().length &&
                                        Y.length && Y[0] && typeof Y[0].scrollIntoView === "function" && Y[0].scrollIntoView({
                                            block: "center",
                                            behavior: "smooth"
                                        })
                                }, P))
                            } else qa()
                        }
                        qa()
                    };
                window.requestAnimationFrame ? requestAnimationFrame(() => {
                    requestAnimationFrame(xa)
                }) : setTimeout(xa, 0);
                a.pointer === "radio" && (O = b.find(".trigger-radio"), O.length && (Object.assign(O[0].style, {
                    border: `2px solid ${a.buttonColor}`,
                    backgroundColor: "#fff",
                    width: a.radioSize,
                    height: a.radioSize
                }), O[0].innerHTML = ""));
                $('[class*="-wrapper"]').not(b).each(function() {
                    const P = $(this),
                        R = P.data("settings");
                    if (R) {
                        if (R.pointer && R.pointer.startsWith("question_") && P.attr("data-aun") === "true") {
                            var ea = R.pointer.split("_")[1];
                            if (typeof window[ea + "_close"] === "function") return window[ea + "_close"](), domqueryFocus(), !1
                        }
                        ea = P.find(`.${R.optionsClass}`);
                        if (ea.is(":visible")) {
                            const Y = parseInt(P.attr("data-duration"));
                            P.removeClass(R.openClass).attr("data-state", "closed");
                            Y ? R.slideToggle ? ea.css("opacity", R.opacity || 0).slideUp(Y, {
                                easing: a.easing
                            }) : ea.slideUp(Y, {
                                easing: a.easing
                            }) : (R.slideToggle &&
                                ea.css("opacity", R.opacity || 0), ea.hide())
                        }
                    }
                });
                b.addClass(a.openClass);
                b.attr("data-state", "opened");
                ma(b.find('[class*="-option"]'));
                O = a.slideToggle === !0;
                if (!O && (K = aa(b, d), d.css(K), a._hasBeenShown = !0, !u)) {
                    let P = null;
                    const R = "scroll.select-" + (b.find("select").first()[0]._selectId || "default"),
                        ea = x(function() {
                            d.is(":visible") ? (P && cancelAnimationFrame(P), P = requestAnimationFrame(function() {
                                const Y = aa(b, d),
                                    oa = {};
                                Y.top !== void 0 && (oa.top = Y.top);
                                Y.bottom !== void 0 && (oa.bottom = Y.bottom);
                                Y.left !== void 0 && (oa.left =
                                    Y.left);
                                Object.keys(oa).length > 0 && d.css(oa)
                            })) : (P && (cancelAnimationFrame(P), P = null), ea.cancel && ea.cancel(), $(window).off(R))
                        }, 16);
                    $(window).off(R).on(R, ea)
                }
                O ? (u = a.optionStyle.backgroundColor || a.optionsStyle.background, d.css({
                    opacity: a.opacity || 0,
                    "background-color": u
                }), d.find("div").first().css("background-color", u), d.find(`.${a.optionClass}`).css("background-color", u), d.css("will-change", "height, opacity"), d.slideDown(k, {
                    easing: a.easing,
                    complete: function() {
                        d.css("will-change", "");
                        F()
                    }
                })) : (() => new Promise(P => {
                    const R = b.parent();
                    R.find(".select-overlay").length ? P(R.find(".select-overlay")) : (R.append('<div class="select-overlay"></div>'), setTimeout(() => {
                        const ea = R.find(".select-overlay");
                        P(ea)
                    }, 0))
                }))().then(P => {
                    window._selectCloseTimer && clearTimeout(window._selectCloseTimer);
                    g = !0;
                    P.off("click.selectOverlay");
                    if (!b.data("groupClicked")) {
                        var R = b.find("select, ul").first()[0]._selectId;
                        R && m() && !a.slideToggle && domquery(this).historyOn("select-" + R, ia => {
                            wa = 2;
                            if (ia === 0) {
                                wa = 1;
                                const va = typeof $ !== "undefined" &&
                                    $.isMobile ? $.isMobile() : {
                                        isMobile: !1
                                    };
                                ia = $('[class*="-wrapper"][class*="open"]').filter(function() {
                                    const la = $(this).data("settings");
                                    return la && !la.slideToggle && va.isMobile === !0
                                });
                                ia.length && ia.each(function() {
                                    const la = $(this),
                                        ra = la.data("settings"),
                                        Ea = la.find(`.${ra.optionsClass}`),
                                        Fa = parseInt(la.attr("data-duration")),
                                        Ca = $(".select-overlay");
                                    y(la);
                                    if (ra.pointer === "radio") {
                                        const Ga = la.attr("data-selected-value"),
                                            Ha = parseInt(la.attr("data-selected-index")),
                                            Da = la.find(".trigger-radio");
                                        Ga !== void 0 &&
                                            Ha >= 0 && (Object.assign(Da[0].style, {
                                                border: `2px solid ${ra.radioColor}`,
                                                backgroundColor: "#fff",
                                                width: ra.radioSize,
                                                height: ra.radioSize
                                            }), Da.html(Q(ra.radioColor, ra)))
                                    }
                                    Ca.css({
                                        "background-color": "rgba(0, 0, 0, 0)"
                                    });
                                    Ea.slideUp(Fa, {
                                        easing: ra.easing,
                                        complete: function() {
                                            Ca.hide();
                                            domqueryFocus();
                                            la.removeClass(ra.openClass);
                                            la.attr("data-state", "closed")
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
                    var ea = aa(b, d);
                    R = a.optionsStyle.background || "#fff";
                    P.css({
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
                    const Y = g && !a.slideToggle ? 1E4 : 1E3;
                    ea = {
                        ...ea
                    };
                    ea.hasOwnProperty("left") || (ea.left = "");
                    d.css({
                        ...ea,
                        opacity: 1,
                        display: "none",
                        backgroundColor: R,
                        height: a.height || "auto",
                        Mheight: a.Mheight || "60vh",
                        minHeight: a.minHeight || "auto",
                        maxHeight: a.maxHeight || (g ? a.Mheight || "60vh" :
                            a.height || "300px"),
                        overflowY: "auto",
                        zIndex: Y
                    });
                    ea.left === "" && d.css("left", "");
                    d.find("div").first().css("background-color", R);
                    d.find(`.${a.optionClass}`).css("background-color", R);
                    let oa = !1,
                        Aa = !0;
                    domquery(d).slideDown(k, {
                        easing: a.easing,
                        complete: () => {
                            F();
                            g = Aa = !1
                        }
                    });
                    setTimeout(() => {
                        P.css("background-color", "rgba(0, 0, 0, 0)")
                    }, 0);
                    P.on("click.selectOverlay", function(ia) {
                        if (oa || Aa) return !1;
                        wa = 2;
                        const va = b.find(`.${a.triggerClass}`);
                        va.css("pointer-events", "none");
                        oa = !0;
                        ia.preventDefault();
                        ia.stopPropagation();
                        P.off("click.selectOverlay");
                        if (a.pointer === "radio") {
                            ia = b.attr("data-selected-value");
                            const la = parseInt(b.attr("data-selected-index")),
                                ra = b.find(".trigger-radio");
                            ia === void 0 && la === -1 ? ra.css({
                                border: `2px solid ${a.buttonColor}`,
                                backgroundColor: "#fff",
                                width: a.radioSize,
                                height: a.radioSize
                            }).html("") : ia !== void 0 && la >= 0 && ra.css({
                                border: `2px solid ${a.radioColor}`,
                                backgroundColor: "#fff",
                                width: a.radioSize,
                                height: a.radioSize
                            }).html(Q(a.radioColor, a))
                        }
                        P.css("background-color", "rgba(0, 0, 0, 0)");
                        window._selectCloseTimer =
                            setTimeout(() => {
                                P.hide();
                                d.hide();
                                a.slideToggle || d.css({
                                    top: "-9999px",
                                    left: "-9999px",
                                    visibility: "hidden"
                                });
                                b.removeClass(a.openClass);
                                b.attr("data-state", "closed");
                                b.data("groupClicked", !1);
                                e = oa = g = !1;
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
                    t.css({
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
                h.length &&
                    h.is(":visible") && h.css("pointer-events", "none").hide();
                var d = b.find(`.${a.optionsClass}`),
                    k = parseInt(b.attr("data-duration"));
                h = d.is(":visible");
                var t = $('[class*="-option"]'),
                    n = $('[class*="-wrapper"]').not(b).filter(function() {
                        return $(this).find('[class*="-options"]').is(":visible")
                    });
                if (h && !a.offclick) {
                    h = parseInt(b.attr("data-duration"));
                    if (a.pointer === "radio") {
                        n = b.attr("data-selected-value");
                        var M = parseInt(b.attr("data-selected-index")),
                            L = b.find(".trigger-radio");
                        n !== void 0 && M >= 0 && (Object.assign(L[0].style, {
                            border: `2px solid ${a.radioColor}`,
                            backgroundColor: "#fff",
                            width: a.radioSize,
                            height: a.radioSize
                        }), L.html(Q(a.radioColor, a)))
                    }
                    m() && !a.slideToggle ? V(d, h, $(".select-overlay"), b, a) : (b.removeClass(a.openClass), b.attr("data-state", "closed"), h ? a.slideToggle ? d.css({
                        opacity: a.opacity || 0,
                        "will-change": "height, opacity"
                    }).slideUp(h, {
                        easing: a.easing,
                        complete: function() {
                            d.css("will-change", "");
                            domqueryFocus()
                        }
                    }) : d.css("will-change", "height, opacity").slideUp(h, {
                        easing: a.easing,
                        complete: function() {
                            d.css("will-change",
                                "");
                            domqueryFocus()
                        }
                    }) : (d.hide(), domqueryFocus()));
                    return !1
                }
                if (n.length > 0) return n.each(function() {
                    const u = $(this),
                        F = u.data("settings");
                    if (F) {
                        var K = u.find(`.${F.optionsClass}`),
                            w = parseInt(u.attr("data-duration"));
                        u.removeClass(F.openClass).attr("data-state", "closed");
                        m() && !F.slideToggle ? V(K, w || 0, $(".select-overlay"), u, F) : w ? F.slideToggle ? K.css("opacity", F.opacity || 0).slideUp(w, {
                            easing: F.easing
                        }) : K.slideUp(w, {
                            easing: F.easing
                        }) : K.hide()
                    }
                }), !1;
                if (a.pointer && a.pointer.startsWith("question_")) {
                    n = a.pointer.split("_")[1];
                    M = b[0].hasAttribute("data-aun");
                    L = b.find("select").first();
                    const u = parseInt(b.attr("data-current-index")),
                        F = L.find("option").eq(u);
                    L = {
                        value: F.val(),
                        text: p(F.html(), 1),
                        html: p(F.html()),
                        tag: F.attr("tag"),
                        group: B(S(L[0], u).text),
                        index: u
                    };
                    if (M && (f.preventDefault(), f.stopPropagation(), typeof window[n + "_cancel"] === "function")) return window[n + "_reset"] = function() {
                        const K = b.find(`.${a.triggerClass}`);
                        var w = b.find("select, ul").first();
                        w.find("option, li").first().prop("selected", !0);
                        w = w.find("option, li").first().text();
                        K.text(w);
                        w = document.createElement("div");
                        w.className = "custom-question trigger-question";
                        Object.assign(w.style, {
                            ...a.questionStyle,
                            width: a.questionSize,
                            height: a.questionSize,
                            fontSize: `calc(${a.questionSize} * 0.6)`
                        });
                        w.innerHTML = "?";
                        K.append(w);
                        b.removeClass(a.openClass);
                        b[0].removeAttribute("data-aun")
                    }, window[n + "_cancel"](L), !1;
                    b.find(`.${a.optionClass}`).each(function() {
                        const K = $(this);
                        K.find(".custom-question, .custom-group-arrow").remove();
                        if (K.hasClass("group-option")) {
                            var w = document.createElement("div");
                            w.className = "custom-group-arrow";
                            const J = ba(a);
                            let A = J.arrowSizeValue;
                            var r = J.arrowRightValue;
                            Object.assign(w.style, {
                                position: "absolute",
                                right: r,
                                top: "50%",
                                transform: "translateY(-50%) rotate(0deg)",
                                width: "0",
                                height: "0",
                                borderLeft: `${A} solid transparent`,
                                borderRight: `${A} solid transparent`,
                                borderTop: `${A} solid ${J.arrowColorValue}`,
                                transition: "all 0.3s ease"
                            });
                            K.append(w);
                            w = parseFloat(A);
                            r = parseFloat(r);
                            isNaN(w) || isNaN(r) || K[0].style.setProperty("padding-right", `${w*2+r+10}px`, "important")
                        } else r =
                            document.createElement("div"), r.className = "custom-question option-question", Object.assign(r.style, a.questionStyle), r.innerHTML = `<span style="font-size: calc(${a.questionSize} * 0.6);">?</span>`, K.append(r)
                    })
                }
                n = $('[class*="-wrapper"][class*="open"]').filter(function() {
                    const u = $(this).data("settings");
                    return u && u.pointer && u.pointer.startsWith("question_") && $(this).attr("data-aun") === "true"
                });
                if (n.length) h = n.data("settings").pointer.split("_")[1], typeof window[h + "_close"] === "function" && (window[h + "_close"](),
                    domqueryFocus());
                else {
                    if (a.pointer === "checkbox" || a.pointer?.startsWith("checkbox_")) n = b.find(`.${a.triggerClass}`), b.find(`.${a.optionClass}`).each(function() {
                        const u = $(this);
                        if (u.hasClass("group-option") || u.attr("data-group") || u.data("group")) u.find(".custom-checkbox").remove();
                        else {
                            var F = u.attr("data-checked") === "true";
                            u.find(".custom-checkbox").remove();
                            const K = document.createElement("div");
                            K.className = "custom-checkbox option-checkbox";
                            Object.assign(K.style, {
                                ...X(),
                                border: F ? `2px solid ${a.checkboxColor}` : `2px solid ${a.buttonColor}`,
                                borderRadius: "3px",
                                backgroundColor: F ? a.checkboxColor : "#fff",
                                zIndex: "2",
                                display: "block",
                                width: a.checkboxSize,
                                height: a.checkboxSize
                            });
                            F ? (K.innerHTML = E(a.checkboxSize), a.selectedBg && (F = a.selectedBg === !0 ? rgbToRgba(a.activeBackground, .5) : a.selectedBg, u.addClass("selected").addClass("selected-bg-active"), u[0].style.setProperty("background-color", F, "important"), u.css("font-weight", "normal"))) : a.selectedBg && (u.removeClass("selected").removeClass("selected-bg-active"), u[0].style.removeProperty("background-color"),
                                u.css("font-weight", "normal"));
                            u.append(K)
                        }
                    }), n.find(".custom-checkbox").length || (M = document.createElement("div"), M.className = "custom-checkbox trigger-checkbox", L = parseInt(b.attr("data-check-count")) || 0, Object.assign(M.style, {
                            ...X(),
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            border: L > 0 ? `2px solid ${a.checkboxColor}` : `2px solid ${a.buttonColor}`,
                            borderRadius: "3px",
                            backgroundColor: L > 0 ? a.checkboxColor : "#fff",
                            zIndex: "2",
                            display: "block",
                            width: a.checkboxSize,
                            height: a.checkboxSize
                        }),
                        L > 0 && (M.innerHTML = ja(L, a.checkboxSize)), n.append(M));
                    if (!a.offclick || !b.hasClass(a.openClass)) {
                        var D = !1;
                        if (h) b.removeClass(a.openClass), b.attr("data-state", "closed"), ma(t), t.removeClass(a.highlightedClass), t.each(function() {
                            const u = $(this);
                            u.hasClass("selected") && a.selectedBg ? (u.addClass("selected-bg-active"), u.css("opacity", "1")) : u.removeClass("selected-bg-active")
                        }), a.pointer === "radio" && (h = b.attr("data-selected-value"), n = b.find(".trigger-radio"), n.length && (h !== void 0 ? (Object.assign(n[0].style, {
                            border: `2px solid ${a.radioColor}`,
                            backgroundColor: "#fff",
                            width: a.radioSize,
                            height: a.radioSize
                        }), n[0].innerHTML = h !== void 0 ? Q(a.radioColor, a) : "") : (Object.assign(n[0].style, {
                            border: `2px solid ${a.buttonColor}`,
                            backgroundColor: "#fff",
                            width: a.radioSize,
                            height: a.radioSize
                        }), n[0].innerHTML = ""))), N(d, k, a);
                        else {
                            if (a.delay && parseInt(a.delay) > 0) {
                                if (b.attr("data-delay-pending") === "true") return !1;
                                b.attr("data-delay-pending", "true");
                                const u = this;
                                f.preventDefault();
                                f.stopPropagation();
                                setTimeout(function() {
                                    b.removeAttr("data-delay-pending");
                                    c.call(u,
                                        f)
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
                    if (h && h.offclick !== !0 && (!h.pointer || !h.pointer.startsWith("question_") || a.attr("data-aun") !==
                            "true")) {
                        var d = a.find(`.${h.optionsClass}`),
                            k = parseInt(a.attr("data-duration")),
                            t = function() {
                                a.find('[class*="-option"]').removeClass("selected");
                                [50, 100, 200].forEach(n => {
                                    setTimeout(() => {
                                        const M = a.find('[class*="-option"].selected');
                                        M.length > 0 && M.removeClass("selected")
                                    }, n)
                                })
                            };
                        if (m() && !h.slideToggle) V(d, k, $(".select-overlay"), a, h), t();
                        else {
                            a.removeClass(h.openClass);
                            a.attr("data-state", "closed");
                            if (h.pointer === "radio") {
                                const n = a.attr("data-selected-value"),
                                    M = parseInt(a.attr("data-selected-index")),
                                    L = a.find(".trigger-radio");
                                n !== void 0 && M >= 0 && (Object.assign(L[0].style, {
                                    border: `2px solid ${h.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: h.radioSize,
                                    height: h.radioSize
                                }), L.html(Q(h.radioColor, h)))
                            }
                            k ? (h.slideToggle && d.css("opacity", h.opacity || 0), d.slideUp(k, {
                                easing: h.easing,
                                complete: function() {
                                    y(a);
                                    t();
                                    domqueryFocus()
                                }
                            })) : (t(), d.hide(), y(a), domqueryFocus())
                        }
                    }
                }))
            }
        });
        $(document).on("focusin", function(f) {
            f = $(f.target);
            const c = f.closest('[class*="-wrapper"]');
            f.is("body") || $('[class*="-wrapper"][class*="open"]').each(function() {
                const b =
                    $(this);
                if (!c.length || b[0] !== c[0]) {
                    var a = b.data("settings");
                    if (a && a.offclick !== !0 && (!a.pointer || !a.pointer.startsWith("question_") || b.attr("data-aun") !== "true")) {
                        var h = b.find(`.${a.optionsClass}`),
                            d = parseInt(b.attr("data-duration"));
                        if (m() && !a.slideToggle) V(h, d, $(".select-overlay"), b, a);
                        else {
                            b.removeClass(a.openClass);
                            b.attr("data-state", "closed");
                            if (a.pointer === "radio") {
                                const k = b.attr("data-selected-value"),
                                    t = parseInt(b.attr("data-selected-index")),
                                    n = b.find(".trigger-radio");
                                k !== void 0 && t >= 0 && (Object.assign(n[0].style, {
                                    border: `2px solid ${a.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: a.radioSize,
                                    height: a.radioSize
                                }), n.html(Q(a.radioColor, a)))
                            }
                            d ? a.slideToggle ? h.css({
                                opacity: a.opacity || 0,
                                "will-change": "height, opacity"
                            }).slideUp(d, {
                                easing: a.easing,
                                complete: function() {
                                    h.css("will-change", "");
                                    y(b);
                                    domqueryFocus()
                                }
                            }) : h.css("will-change", "height, opacity").slideUp(d, {
                                easing: a.easing,
                                complete: function() {
                                    h.css("will-change", "");
                                    y(b);
                                    domqueryFocus()
                                }
                            }) : (h.hide(), y(b), domqueryFocus())
                        }
                    }
                }
            })
        });
        $(document).on("focusout", '[class*="-wrapper"]',
            function(f) {
                const c = $(this),
                    b = c.data("settings");
                b && b.offclick !== !0 && setTimeout(() => {
                    if ($('[class*="-wrapper"][class*="open"]').length && !($(document.activeElement).closest('[class*="-wrapper"]').length > 0 || b.pointer && b.pointer.startsWith("question_") && c.attr("data-aun") === "true")) {
                        var a = c.find(`.${b.optionsClass}`),
                            h = parseInt(c.attr("data-duration"));
                        if (m() && !b.slideToggle) V(a, h, $(".select-overlay"), c, b);
                        else {
                            c.removeClass(b.openClass);
                            c.attr("data-state", "closed");
                            if (b.pointer === "radio") {
                                const d =
                                    c.attr("data-selected-value"),
                                    k = parseInt(c.attr("data-selected-index")),
                                    t = c.find(".trigger-radio");
                                d !== void 0 && k >= 0 && (Object.assign(t[0].style, {
                                    border: `2px solid ${b.radioColor}`,
                                    backgroundColor: "#fff",
                                    width: b.radioSize,
                                    height: b.radioSize
                                }), t.html(Q(b.radioColor, b)))
                            }
                            h ? (b.slideToggle && a.css("opacity", b.opacity || 0), a.slideUp(h, {
                                easing: b.easing
                            })) : a.hide()
                        }
                    }
                }, 0)
            });
        $(window).on("resize", function() {
            $('[class*="-wrapper"][class*="open"]').each(function() {
                var f = $(this),
                    c = f.data("settings");
                c && c.slideToggle !==
                    !0 && (c = f.find(`.${c.optionsClass}`), f = aa(f, c), c.css(f))
            })
        })
    }
    return this
};
$.fn.select = function(v, l, H) {
    const x = function(m, B, p) {
        if (p) {
            var S = B.val();
            p.pointer ? p.pointer === "radio" ? m.find(".custom-radio").each(function() {
                const Q = $(this).closest('[class*="-option"]').attr("data-value") === S;
                $(this).css({
                    border: Q ? `2px solid ${p.radioColor}` : `2px solid ${p.buttonColor}`,
                    backgroundColor: "#fff"
                }).html(Q ? upHTMe(p.radioColor, p) : "")
            }) : p.pointer === "checkbox" ? m.find(".custom-checkbox").each(function() {
                const Q = $(this).closest('[class*="-option"]').attr("data-value") === S,
                    E = p.checkboxColor ||
                    "#2196F3",
                    ja = p.checkboxSize || "16px";
                Q ? $(this).css({
                    border: `2px solid ${E}`,
                    backgroundColor: E
                }).html(upHTMe2(ja)) : $(this).css({
                    border: `2px solid ${p.buttonColor||"#ccc"}`,
                    backgroundColor: "#fff"
                }).html("")
            }) : p.pointer.startsWith("question_") && m.find(".custom-question").each(function() {
                $(this).closest('[class*="-option"]').attr("data-value") === S ? $(this).addClass("active") : $(this).removeClass("active")
            }) : p.dot && m.find(".custom-dot").each(function() {
                $(this).closest('[class*="-option"]').attr("data-value") ===
                    S ? $(this).css(p.dotSelectedStyle || {}) : $(this).css(p.dotStyle || {})
            })
        }
    };
    if (typeof v === "string") {
        if (v === "value") return l === "" || l === null || l === void 0 ? this.each(function() {
            const m = $(this).find('option[value=""]');
            if (m.length) return $(this).select("index", m.index())
        }) : this.each(function() {
            const m = $(this);
            if (this._selectId) {
                var B = m.find(`option[value="${l}"]`);
                if (B.length) {
                    var p = $(".select-" + (this._selectId + "-wrapper"));
                    const Q = p.data("settings");
                    m.find("option").prop("selected", !1);
                    B.prop("selected", !0);
                    p.attr({
                        "data-selected-value": B.val(),
                        "data-selected-index": B.index()
                    });
                    var S = p.find('[class*="-option"]');
                    S.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    Q.selectedBg && S.each(function() {
                        const ba = $(this),
                            U = (ba.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        ba.attr("style", U)
                    });
                    const E = p.find(`[data-value="${B.val()}"]`);
                    if (E.length) {
                        setTimeout(() => {
                            E.addClass("selected");
                            Q.selectedBg ? (E.addClass("selected-bg-active"), E[0].style.setProperty("background-color",
                                Q.selectedBg === !0 ? rgbToRgba(Q.activeBackground, .5) : Q.selectedBg, "important"), E.css("font-weight", "normal")) : E.css("font-weight", "bold")
                        }, 300);
                        const ba = p.find('[class*="-options"]');
                        if (ba.length) {
                            S = (E.attr("class")?.split(" ") || []).filter(U => U !== Q.optionClass && U !== "selected" && U !== Q.highlightedClass && !U.includes("wrapper") && !U.includes("options"));
                            if (S.length > 0) {
                                const U = new Set,
                                    Z = y => {
                                        if (y && !U.has(y)) {
                                            U.add(y);
                                            var N = ba.find(`[data-group="${y}"]`);
                                            N.length && (N.addClass("expanded"), N.find(".custom-group-arrow").css("transform",
                                                "translateY(-50%) rotate(180deg)"), ba.find(`.${y}`).show(), (N.attr("class")?.split(" ") || []).forEach(I => {
                                                I !== "group-option" && I !== "expanded" && Z(I)
                                            }))
                                        }
                                    };
                                S.forEach(y => Z(y))
                            }
                            Q.autoScrollToSelected !== void 0 && Q.autoScrollToSelected && (S = parseInt(p.attr("data-duration")) || 300, setTimeout(() => {
                                ba.find("div").first().length && E.length && E[0] && typeof E[0].scrollIntoView === "function" && E[0].scrollIntoView({
                                    block: "center",
                                    behavior: "smooth"
                                })
                            }, S))
                        }
                    }
                    x(p, B, Q);
                    p = p.find('[class*="-trigger"]');

                    function ja(ba, U) {
                        var Z = U.attr("class");
                        if (!Z) return U.text();
                        const y = [];
                        Z = Z.split(" ");
                        for (let I = 0; I < Z.length; I++) {
                            var N = ba.find(`option[group="${Z[I]}"]`);
                            if (N.length && (y.push(N.text()), N = N.attr("class"))) {
                                N = N.split(" ");
                                for (let V = 0; V < N.length; V++) {
                                    const aa = ba.find(`option[group="${N[V]}"]`);
                                    aa.length && y.unshift(aa.text())
                                }
                            }
                        }
                        y.push(U.text());
                        return [...(new Set(y))].join(" > ")
                    }
                    let X;
                    if (m.find("option[group]").length) try {
                        X = typeof findGroupPath === "function" ? findGroupPath(this, B.index()).text : ja(m, B)
                    } catch (ba) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
                            ba), X = B.text()
                    } else X = B.text();
                    B = p.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    S = p.find('span[style*="position: absolute"]').clone();
                    Q && Q.allowHTML ? p.html(X) : p.text(X);
                    B.length && p.append(B);
                    S.length && p.append(S);
                    m.val(l)
                }
            } else console.warn("Select element was not initialized with $.select() method")
        });
        if (v === "index" && typeof l === "number") return this.each(function() {
            var m = $(this);
            if (this._selectId) {
                var B = m.find("option").eq(l);
                if (B.length) {
                    var p = $(".select-" + (this._selectId +
                        "-wrapper"));
                    const Q = p.data("settings");
                    m.find("option").prop("selected", !1);
                    B.prop("selected", !0);
                    p.attr({
                        "data-selected-value": B.val(),
                        "data-selected-index": l
                    });
                    var S = p.find('[class*="-option"]');
                    S.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    Q.selectedBg && S.each(function() {
                        const ba = $(this),
                            U = (ba.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        ba.attr("style", U)
                    });
                    const E = p.find(`[data-value="${B.val()}"]`);
                    E.length && setTimeout(() => {
                        E.addClass("selected");
                        Q.selectedBg ? (E.addClass("selected-bg-active"), E[0].style.setProperty("background-color", Q.selectedBg, "important"), E.css("font-weight", "normal")) : E.css("font-weight", "bold")
                    }, 300);
                    x(p, B, Q);
                    p = p.find('[class*="-trigger"]');

                    function ja(ba, U) {
                        var Z = U.attr("class");
                        if (!Z) return U.text();
                        const y = [];
                        Z = Z.split(" ");
                        for (let I = 0; I < Z.length; I++) {
                            var N = ba.find(`option[group="${Z[I]}"]`);
                            if (N.length && (y.push(N.text()), N = N.attr("class"))) {
                                N = N.split(" ");
                                for (let V = 0; V < N.length; V++) {
                                    const aa = ba.find(`option[group="${N[V]}"]`);
                                    aa.length && y.unshift(aa.text())
                                }
                            }
                        }
                        y.push(U.text());
                        return [...(new Set(y))].join(" > ")
                    }
                    let X;
                    if (m.find("option[group]").length) try {
                        X = typeof findGroupPath === "function" ? findGroupPath(this, l).text : ja(m, B)
                    } catch (ba) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:", ba), X = B.text()
                    } else X = B.text();
                    m = p.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    S = p.find('span[style*="position: absolute"]').clone();
                    Q && Q.allowHTML ? p.html(X) : p.text(X);
                    m.length && p.append(m);
                    S.length && p.append(S);
                    typeof H === "function" && H.call(this, {
                        index: l,
                        value: B.val(),
                        text: B.text(),
                        path: X
                    })
                }
            } else console.warn("Select element was not initialized with $.select() method")
        });
        if (v === "value") return this.each(function() {
            var m = $(this);
            if (this._selectId) {
                var B = m.find(`option[value="${l}"]`);
                if (B.length) {
                    var p = $(".select-" + (this._selectId + "-wrapper"));
                    const Q = B.index(),
                        E = p.data("settings");
                    m.find("option").prop("selected", !1);
                    B.prop("selected", !0);
                    p.attr({
                        "data-selected-value": l,
                        "data-selected-index": Q
                    });
                    var S = p.find('[class*="-option"]');
                    S.removeClass("selected").removeClass("selected-bg-active").css("font-weight", "normal");
                    E.selectedBg && S.each(function() {
                        const U = $(this),
                            Z = (U.attr("style") || "").replace(/background-color:[^;]+;?/g, "");
                        U.attr("style", Z)
                    });
                    const ja = p.find(`[data-value="${l}"]`);
                    ja.length && setTimeout(() => {
                        ja.addClass("selected");
                        E.selectedBg ? (ja.addClass("selected-bg-active"), ja[0].style.setProperty("background-color", E.selectedBg, "important"), ja.css("font-weight",
                            "normal")) : ja.css("font-weight", "bold")
                    }, 300);
                    E && E.pointer ? E.pointer === "radio" ? p.find(".custom-radio").each(function() {
                        const U = $(this).closest('[class*="-option"]').attr("data-value") === l;
                        $(this).css({
                            border: U ? `2px solid ${E.radioColor}` : `2px solid ${E.buttonColor}`,
                            backgroundColor: "#fff"
                        }).html(U ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(E.radioSize)/2}px; height: ${parseInt(E.radioSize)/2}px; background-color: ${E.radioColor}; border-radius: 50%;"></div>` :
                            "")
                    }) : E.pointer === "checkbox" ? p.find(".custom-checkbox").each(function() {
                        const U = $(this).closest('[class*="-option"]').attr("data-value") === l,
                            Z = E.checkboxColor || "#2196F3";
                        U ? $(this).css({
                            border: `2px solid ${Z}`,
                            backgroundColor: Z
                        }).html('<svg viewBox="0 0 24 24" style="fill: white; width: 90%; height: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg>') : $(this).css({
                            border: `2px solid ${E.buttonColor||
"#ccc"}`,
                            backgroundColor: "#fff"
                        }).html("")
                    }) : E.pointer.startsWith("question_") && p.find(".custom-question").each(function() {
                        $(this).closest('[class*="-option"]').attr("data-value") === l ? $(this).addClass("active") : $(this).removeClass("active")
                    }) : E && E.dot && p.find(".custom-dot").each(function() {
                        const U = $(this).closest('[class*="-option"]').attr("data-value") === l;
                        $(this).css({
                            border: U ? `2px solid ${E.dotColor}` : `2px solid ${E.buttonColor}`,
                            backgroundColor: U ? E.dotColor : "#fff"
                        })
                    });
                    p = p.find('[class*="-trigger"]');

                    function X(U, Z) {
                        var y = Z.attr("class");
                        if (!y) return Z.text();
                        const N = [];
                        y = y.split(" ");
                        for (let V = 0; V < y.length; V++) {
                            var I = U.find(`option[group="${y[V]}"]`);
                            if (I.length && (N.push(I.text()), I = I.attr("class"))) {
                                I = I.split(" ");
                                for (let aa = 0; aa < I.length; aa++) {
                                    const ma = U.find(`option[group="${I[aa]}"]`);
                                    ma.length && N.unshift(ma.text())
                                }
                            }
                        }
                        N.push(Z.text());
                        return [...(new Set(N))].join(" > ")
                    }
                    let ba;
                    if (m.find("option[group]").length) try {
                        ba = typeof findGroupPath === "function" ? findGroupPath(this, Q).text : X(m, B)
                    } catch (U) {
                        console.warn("\uadf8\ub8f9 \uacbd\ub85c \uad6c\uc131 \uc911 \uc624\ub958 \ubc1c\uc0dd:",
                            U), ba = B.text()
                    } else ba = B.text();
                    m = p.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                    S = p.find('span[style*="position: absolute"]').clone();
                    E && E.allowHTML ? p.html(ba) : p.text(ba);
                    m.length && p.append(m);
                    S.length && p.append(S);
                    typeof H === "function" && H.call(this, {
                        index: Q,
                        value: l,
                        text: B.text(),
                        path: ba
                    })
                }
            } else console.warn("Select element was not initialized with $.select() method")
        })
    }
    return $.select.call(this, v, l, H)
};
$.fn.selectSet = function(v, l, H) {
    return this.each(function() {
        function x(y, N, I) {
            const [V, aa] = N.split(":");
            if (V === "selected") aa === "selected" && (m.find("option").prop("selected", !1), y.prop("selected", !0), S(E, m, y), m.trigger("change"));
            else if (V === "val")
                if (N = y.val(), y.val(aa), I) {
                    const fa = y.attr("group");
                    y.attr("group", aa);
                    m.find(`option.${fa}`).each(function() {
                        $(this).removeClass(fa).addClass(aa)
                    });
                    y = E.find(`[data-group="${fa}"]`);
                    y.length && (y.attr("data-group", aa), E.find(`.${fa}`).each(function() {
                        $(this).removeClass(fa).addClass(aa)
                    }))
                } else I =
                    E.find(`[data-value="${N}"]`), I.length && I.attr("data-value", aa), y.prop("selected") && Q(E, B);
            else if (V === "text")
                if (y.text(aa), I) {
                    I = y.attr("group");
                    I = E.find(`[data-group="${I}"]`);
                    if (I.length) {
                        N = I.find(".custom-group-arrow").clone();
                        var ma = I.contents().filter(function() {
                            return this.nodeType === 3
                        });
                        ma.length ? ma[0].nodeValue = aa : (ja && ja.allowHTML ? I.html(aa) : I.text(aa), N.length && I.append(N))
                    }
                    y = y.attr("group");
                    m.find(`option.${y}`).filter(function() {
                        return $(this).prop("selected")
                    }).length && Q(E, B)
                } else {
                    I =
                        y.val();
                    I = E.find(`[data-value="${I}"]`);
                    if (I.length) {
                        N = I.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot, .custom-group-arrow").clone();
                        ma = I.find('span[style*="position: absolute"]').clone();
                        let fa = I.contents().filter(function() {
                            return this.nodeType === 3
                        });
                        fa.length ? fa[0].nodeValue = aa : (ja && ja.allowHTML ? I.html(aa) : I.text(aa), N.length && I.append(N), ma.length && I.append(ma))
                    }
                    y.prop("selected") && Q(E, B)
                }
        }
        const m = $(this),
            B = this;
        var p = this._selectId;
        if (p) {
            var S = function(y, N, I) {
                    const V =
                        y.data("settings"),
                        aa = I.val();
                    I = I.index();
                    y.attr({
                        "data-selected-value": aa,
                        "data-selected-index": I
                    });
                    y.find('[class*="-option"]').removeClass("selected").css("font-weight", "normal");
                    const ma = y.find(`[data-value="${aa}"]`);
                    ma.length && setTimeout(() => {
                        ma.addClass("selected");
                        V.selectedBg || ma.css("font-weight", "bold")
                    }, 300);
                    V.pointer === "radio" ? y.find(".custom-radio").each(function() {
                        const fa = $(this).closest('[class*="-option"]').attr("data-value") === aa;
                        $(this).css({
                            border: fa ? `2px solid ${V.radioColor}` : `2px solid ${V.buttonColor}`,
                            backgroundColor: "#fff"
                        }).html(fa ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(V.radioSize)/2}px; height: ${parseInt(V.radioSize)/2}px; background-color: ${V.radioColor}; border-radius: 50%;"></div>` : "")
                    }) : V.dot && y.find(".custom-dot").each(function() {
                        const fa = $(this).closest('[class*="-option"]').attr("data-value") === aa;
                        $(this).css({
                            border: fa ? `2px solid ${V.dotColor}` : `2px solid ${V.buttonColor}`,
                            backgroundColor: fa ?
                                V.dotColor : "#fff"
                        })
                    });
                    Q(y, N[0])
                },
                Q = function(y, N) {
                    const I = y.data("settings");
                    y = y.find('[class*="-trigger"]');
                    var V = $(N);
                    const aa = V.find("option:selected");
                    if (aa.length) {
                        var ma = aa.index();
                        if (V.find("option[group]").length && typeof findGroupPath === "function") try {
                            var fa = findGroupPath(N, ma).text
                        } catch (Ba) {
                            console.warn("Error getting group path:", Ba), fa = aa.text()
                        } else fa = aa.text();
                        N = y.find(".custom-radio, .custom-checkbox, .custom-question, .custom-dot").clone();
                        V = y.find('span[style*="position: absolute"]').clone();
                        I && I.allowHTML ? y.html(fa) : y.text(fa);
                        N.length && y.append(N);
                        V.length && y.append(V);
                        I.pointer === "radio" && (fa = y.find(".custom-radio"), fa.length && fa.css({
                            border: `2px solid ${I.radioColor}`,
                            backgroundColor: "#fff"
                        }).html(`<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: ${parseInt(I.radioSize)/2}px; height: ${parseInt(I.radioSize)/2}px; background-color: ${I.radioColor}; border-radius: 50%;"></div>`))
                    }
                },
                E = $(".select-" + (p + "-wrapper")),
                ja = E.data("settings");
            p = !1;
            if (typeof v === "string" && v.startsWith("group:")) {
                p = !0;
                var X = v.substring(6);
                X = m.find(`option[group="${X}"]`)
            } else typeof v !== "number" && isNaN(parseInt(v)) ? typeof v === "string" && (X = m.find(`option[value="${v}"]`)) : (X = parseInt(v), X = m.find("option").eq(X), X.attr("group") && (p = !0));
            if (X.length) {
                if (typeof l === "string" && l.startsWith("{") && l.endsWith("}")) {
                    var ba = l.match(/\{([^}]+)\}/g);
                    if (ba)
                        for (var U of ba) ba = U.substring(1, U.length - 1), x(X, ba, p)
                } else typeof l === "string" && x(X, l, p);
                if (typeof H === "function") {
                    var Z =
                        m.find("option:selected");
                    U = Z.index();
                    p = Z.val();
                    X = Z.text();
                    ba = "";
                    if (Z.length && Z.attr("class")) {
                        Z = Z.attr("class").split(" ");
                        for (const y of Z)
                            if (Z = m.find(`option[group="${y}"]`), Z.length) {
                                ba = Z.text();
                                break
                            }
                    }
                    H.call(this, {
                        index: U,
                        value: p,
                        text: X,
                        group: ba
                    })
                }
            } else console.warn(`Target option not found: ${v}`)
        } else console.warn("Select element was not initialized with $.select() method")
    })
};
$.fn.selectGet = function(v) {
    var l = $(this);
    if (typeof v === "number") return l = l.find("option").eq(v), l.length ? l : $();
    if (typeof v === "string" && !["val", "value", "text", "index", "group"].includes(v)) {
        var H = l.find(`option[value="${v}"]`);
        if (H.length) return H;
        l = l.find("option").filter(function() {
            return $(this).text() === v
        });
        return l.length ? l : $()
    }
    var x = l.find("option:selected");
    if (!x.length) return $();
    if (v && v !== "val" && v !== "value") {
        if (v === "text") return x.text();
        if (v === "index") return x.index();
        if (v === "group") {
            H = "";
            try {
                if (x.attr("class")) {
                    const m = x.attr("class").split(" ");
                    x = [];
                    for (const B of m) {
                        const p = l.find(`option[group="${B}"]`);
                        if (p.length && (x.unshift(p.text()), p.attr("class"))) {
                            const S = p.attr("class").split(" ");
                            for (const Q of S) {
                                const E = l.find(`option[group="${Q}"]`);
                                E.length && x.unshift(E.text())
                            }
                        }
                    }
                    H = x.join(" > ")
                }
            } catch (m) {
                console.warn("Error finding group path:", m)
            }
            return H
        }
    } else return x.val();
    return x
};

function createParser(v, l, H, x = {}) {
    return {
        prefix: v,
        minParts: l,
        fields: H,
        optionalFields: x,
        parse: function(m) {
            if (m.length < this.minParts) return null;
            const B = {};
            this.fields.forEach((p, S) => {
                B[p] = m[S + 1] || ""
            });
            Object.entries(this.optionalFields).forEach(([p, S]) => {
                p = parseInt(p);
                m[p] && m[p].trim() && (B[S] = m[p])
            });
            return B
        }
    }
}
$.fn.selectAdd = function(v, l) {
    return this.each(function() {
        const H = $(this);
        if (this._selectId) {
            var x;
            if (typeof v === "string") {
                window._selectParsers || (window._selectParsers = [], window._selectParsers.push(createParser("group:", 3, ["group", "text"])), window._selectParsers.push(createParser("option:", 4, ["value", "text", "groupClass"], {
                    4: "tag",
                    5: "img"
                })));
                var m = window._selectParsers,
                    B = v.split(":");
                (m = m.find(p => v.startsWith(p.prefix))) && (x = m.parse(B));
                x || (x = v)
            } else x = v;
            x.group ? (B = document.createElement("option"),
                B.setAttribute("group", x.group), B.textContent = x.text || "", x.parentGroup && (B.className = x.parentGroup), H[0].appendChild(B)) : (B = document.createElement("option"), B.value = x.value || "", B.textContent = x.text || "", x.groupClass && (B.className = x.groupClass), x.tag && B.setAttribute("tag", x.tag), x.img && B.setAttribute("img", x.img), x.groupClass ? (m = Array.from(H[0].querySelectorAll(`.${x.groupClass}`)), m.length > 0 ? (m = m[m.length - 1], m.nextSibling ? H[0].insertBefore(B, m.nextSibling) : H[0].appendChild(B)) : (m = H[0].querySelector(`option[group="${x.groupClass}"]`)) &&
                m.nextSibling ? H[0].insertBefore(B, m.nextSibling) : H[0].appendChild(B)) : H[0].appendChild(B));
            refreshSelectUI(H);
            typeof l === "function" && l.call(this, {
                type: x.group ? "group" : "option",
                group: x.group || x.groupClass,
                value: x.value,
                text: x.text
            })
        } else console.warn("Select element was not initialized with $.select() method")
    })
};

function refreshSelectUI(v) {
    var l = v.closest('[class*="-wrapper"]');
    let H = null;
    l.length && (H = l.data("settings"));
    if (l.length) {
        const x = l[0].parentNode,
            m = l[0].nextSibling;
        v[0].style.display = "";
        m ? x.insertBefore(v[0], m) : x.appendChild(v[0]);
        l.remove()
    }
    l = {
        duration: 300,
        opacity: 1
    };
    H ? (H.slideToggle !== void 0 && (l.slideToggle = H.slideToggle), H.width !== void 0 && (l.width = H.width), H.defaultBgColor !== void 0 && (l.defaultBgColor = H.defaultBgColor), H.defaultColor !== void 0 && (l.defaultColor = H.defaultColor)) : l.slideToggle = !0;
    v.select(300, l)
}
$.fn.selectAdd.registerParser = function(v, l, H, x) {
    window._selectParsers || (window._selectParsers = []);
    window._selectParsers.push(createParser(v, l, H, x))
};
$.fn.selectRemove = function(v, l) {
    return this.each(function() {
        const H = $(this);
        if (this._selectId) {
            var x = "";
            if (typeof v === "string")
                if (v.startsWith("group:")) {
                    var m = v.substring(6);
                    m = H.find(`option[group="${m}"], option.${m}`);
                    x = "group"
                } else v.startsWith("value:") ? (m = v.substring(6), m = H.find(`option[value="${m}"]`)) : v.startsWith("index:") ? (m = parseInt(v.substring(6)), m = H.find("option").eq(m)) : m = H.find(`option[value="${v}"]`), x = "option";
            m && m.length > 0 && (x = {
                type: x,
                count: m.length,
                items: m.map(function() {
                    return {
                        value: $(this).val(),
                        text: $(this).text(),
                        isGroup: $(this).attr("group") !== void 0,
                        groupName: $(this).attr("group") || $(this).attr("class")
                    }
                }).get()
            }, m.remove(), refreshSelectUI(H), typeof l === "function" && l.call(this, x))
        } else console.warn("Select element was not initialized with $.select() method")
    })
};