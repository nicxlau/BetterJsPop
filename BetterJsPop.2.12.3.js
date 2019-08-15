
Function.prototype.bind || (Function.prototype.bind = function(t) {
    if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var e = Array.prototype.slice.call(arguments, 1),
        n = this,
        i = function() {},
        o = function() {
            return n.apply(this instanceof i && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
        };
    return i.prototype = this.prototype, o.prototype = new i, o
});
var BetterJsPop = {
    reset: function() {
        this.urls = []
    },
    add: function(t, e) {
        e || (e = {}), e.type || (this.cap.popunder && e.under && "chrome" != this.cap.env.b ? e.type = "popunder" : e.type = "popup", e.forceunder && this.cap.popunder && (e.type = "popunder")), this.addUrl(t, e)
    },
    config: function() {},
    ignoreTo: function(t) {
        this.ignores.push(t)
    },
    checkIgnore: function(t) {
        if (!t.target) return !1;
        if (0 == this.ignores.length) return !1;
        for (var e = 0; e < this.ignores.length; e++) {
            var n = this.ignores[e];
            if (t.target.id && t.target.id == n) return !0;
            for (var i = t.target; i && i.parentElement;)
                if ((i = i.parentElement).id && i.id == n) return !0
        }
        return !1
    },
    checkStackEmpty: function(t) {
        for (var e = 0; e < this.urls.length; e++) {
            var n = this.urls[e];
            if (n.options || (n.options = {}), "function" != typeof n.options.shouldFire || n.options.shouldFire()) return !1
        }
        return !0
    },
    checkStack: function(t) {
        for (var e = 0; e < this.urls.length; e++) {
            var n = this.urls[e];
            if (n.options || (n.options = {}), "function" != typeof n.options.shouldFire || n.options.shouldFire()) return this.urls.splice(e, 1), n
        }
        return !1
    },
    preload: function(t) {
        try {
            var e;
            (e = document.createElement("link")).rel = "dns-prefetch", e.href = t, document.head.appendChild(e), (e = document.createElement("link")).rel = "preconnect", e.href = t, document.head.appendChild(e)
        } catch (e) {}
    },
    randsize: function() {
        var t = window.screen.availWidth || window.screen.width || window.outerWidth || 1024,
            e = window.screen.availHeight || window.screen.height || window.outerHeight || 768,
            n = (Math.random() * (1 - .95) + .95) * t | 0,
            i = (Math.random() * (1 - .95) + .92) * e | 0;
        return {
            w: n,
            h: i,
            l: Math.max(Math.random() * (t - n) | 0, 0),
            t: Math.max(Math.random() * (e - i) * .4 | 0, 0)
        }
    },
    _windowOpen: function(t, e) {
        var n, i = "" + Math.random();
        "msie" == this.cap.env.b && this.cap.env.v <= 9 && (i = ""), n = e ? window.open("", i, e) : window.open("", i);
        try {
            n.location.replace(t)
        } catch (o) {}
        return n
    },
    _openTabup: function(t) {
        return this._windowOpen(t)
    },
    _openTabunder: function(t) {
        if (0 == this.cap.tabunder) this._openTabup(t);
        else {
            var e = this._openTabup(document.location.href);
            this.ti = setInterval(function() {
                if (e) try {
                    document.location.replace(t)
                } catch (n) {
                    clearInterval(this.ti)
                }
            }.bind(this), 10)
        }
        return !0
    },
    _getOptString: function() {
        var t = this.randsize();
        return optstring = "top=" + t.t + ",left=" + t.l + ",width=" + t.w + ",height=" + t.h + ",status=0,location=1,toolbar=1,menubar=1,resizable=1,scrollbars=1"
    },
    _openPopup: function(t) {
        return this._windowOpen(t, this._getOptString())
    },
    _openPopunderSafari: function(t) {
        function e(t, e, n) {
            var i = document.createElement("iframe");
            i.style = "display:none;", document.body.appendChild(i);
            var o = i.contentWindow.document.createElement("script");
            o.type = "text/javascript", o.innerHTML = "window.parent = window.top = window.frameElement = null;window.mkp = function(url, name, opts) {var popWin = window.open(url, name, opts);try {popWin.opener = null} catch (e) {}return popWin;};", i.contentWindow.document.body.appendChild(o);
            var r = i.contentWindow.mkp(t, e, n);
            return document.body.removeChild(i), r
        }
        window.name = "" + Math.random();
        var n = e(t, "" + Math.random(), this._getOptString());
        return e("", window.name, ""), window.name = null, n
    },
    _openPopunderBlur: function(t) {
        var e = this._openPopup(t);
        try {
            document.focus()
        } catch (n) {}
        return window.focus(), e.blur(), e
    },
    _openPopunderFF: function(t) {
        var e;
        return setTimeout(function() {
            e = this._openPopup(t), "about:blank" == t && (this.prepop = e)
        }.bind(this), 0), setTimeout(function() {
            var t = window.open("", "_self");
            t && !t.closed && t.focus()
        }, 0), !0
    },
    _openPopunderCRPre: function(t) {
        var e, n = "<body>		<script>		var s1i=0,s2i=0;window.name='';		function posred(){window.resizeTo(100,100);if (window.screenY>100) window.moveTo(0,0); else window.moveTo(9999,9999)};		function dance(){if (s1i==0 ){s1i=window.setInterval(function(){ posred(); }, 50);}posred();document.onmousemove=null;};		document.onmousemove=dance;		function phash(){return window.screenX+','+window.screenY+','+window.outerWidth+','+window.outerHeight};		phashc=phash();s2i=setInterval(function(){if ((phashc!=phash())) { if(phashc.indexOf(',100,100') == -1) {dance();}; phashc=phash(); }},100);		var deploy=function()		{			window.clearInterval(s1i);window.clearInterval(s2i);document.onmousemove=null;			window.moveTo(" + window.screenX + "," + window.screenY + ");			window.resizeTo(" + window.outerWidth + ", " + window.outerHeight + ");			if (window.name=='') window.name='ready'; else			window.location.replace(window.name);window.onblur=null;		};window.onblur=deploy;		var toi=setInterval(function(){if (window.name.length>5) {clearInterval(toi);setTimeout(function(){deploy()}, " + t + ");} },50);		<\/script>",
            i = "" + Math.random();
        e = window.open("about:blank", i, "top=9999,left=9999,width=100,height=100");
        try {
            e.document.open(), e.document.write(n), e.document.close()
        } catch (o) {}
        return e
    },
    _openPopunderCRPost: function(t) {
        "ready" == this.prepop.name ? this.prepop.location.replace(t) : this.prepop.name = t
    },
    _getMinipopStatus: function(t) {
        if (!t || t.closed || !t.location) return "closed";
        try {
            t.name
        } catch (e) {
            "error"
        }
        return "error" ? "success" : "" ? "waiting" : "ready" ? "prepopready" : 0
    },
    _openPopunderCR: function(t, e) {
        var n, i = "<body>		<script>		var s1i=0,s2i=0;		function posred(){window.resizeTo(100,100);if (window.screenY>100) window.moveTo(0,0); else window.moveTo(9999,9999)};		function dance(){if (s1i==0 ){s1i=window.setInterval(function(){ posred(); }, 50);}posred();document.onmousemove=null;};		document.onmousemove=dance;		function phash(){return window.screenX+','+window.screenY+','+window.outerWidth+','+window.outerHeight};		phashc=phash();s2i=setInterval(function(){if ((phashc!=phash())) { if(phashc.indexOf(',100,100') == -1) {dance();}; phashc=phash(); }},100);		var deploy=function()		{			window.name='ready';			window.clearInterval(s1i);window.clearInterval(s2i);document.onmousemove=null;			window.moveTo(" + window.screenX + "," + window.screenY + ");			window.resizeTo(" + window.outerWidth + ", " + window.outerHeight + ");			window.location.replace('" + t + "')		};window.onblur=deploy;setTimeout(deploy, " + e + ")<\/script>",
            o = "" + Math.random();
        n = window.open("", o, "top=9999,left=9999,width=100,height=100");
        try {
            n.document.open(), n.document.write(i), n.document.close()
        } catch (r) {}
        return n
    },
    _openPopunderIE11: function(t) {
        this.tw = this._openPopup(t);
        return this.focusInterval && clearInterval(this.focusInterval), this.runs = 0, this.focusInterval = setInterval(function() {
            try {
                this.tw && (this.tw.blur(), this.tw.opener.focus(), window.self.focus(), window.focus(), document.focus())
            } catch (t) {}
            this.runs++, this.runs > 10 && this.focusInterval && clearInterval(this.focusInterval)
        }.bind(this), 100), this.tw
    },
    _detectBrowser: function(t) {
        var e, n, i, o, r;
        return r = "desktop", (o = t.match(/^Mozilla\/5\.0 \([^\)]+\) AppleWebKit\/[0-9\.]+ \(KHTML, like Gecko\) Chrome\/([0-9]+)[0-9\.]+ Safari\/[0-9\.]+$/)) && (e = "chrome", n = o[1]), (o = t.match(/(Firefox|OPR)\/([0-9]+)/)) && (e = o[1].toLowerCase(), n = o[2]), (o = t.match(/rv:([0-9]+)\.0\) like Gecko/)) && (e = "msie", n = o[1]), (o = t.match(/MSIE ([0-9]+)/)) && (e = "msie", n = o[1]), (o = t.match(/Windows NT/)) && (i = "windows"), (o = t.match(/([0-9]+)(_([0-9]+)){0,} like Mac OS X/)) && (i = "ios", e = "safari", n = o[1], r = "mobile"), (o = t.match(/(CrOS)\/([0-9]+)/)) && (e = "chrome", n = o[2], r = "mobile"), (o = t.match(/(Edge)\/([0-9]+)/)) && (e = o[1].toLowerCase(), n = o[2]), (o = t.match(/\(KHTML, like Gecko\) Version\/([0-9]+)/)) && (e = "safari", n = o[1]), (o = t.match(/Macintosh; Intel Mac OS X /)) && (i = "macosx"), t.match(/Android|like Mac OS X|Mobile|Phone/) && (r = "mobile"), t.match(/^Mozilla\/5\.0 \(Linux; Android/) && (i = "android"), {
            o: i,
            b: e,
            v: n,
            f: r,
            i: window != window.top
        }
    },
    _getBrowserCapabilities: function() {
        var t = this._detectBrowser(navigator.userAgent),
            e = !1,
            n = !0,
            i = !0,
            o = !0;
        return "desktop" == t.f ? ("chrome" == t.b && (e = !0), "firefox" == t.b && (e = !0), "msie" == t.b && t.v < 11 && (o = !0, i = !0, e = !0), "msie" == t.b && 11 == t.v && (e = !0), "safari" == t.b && (e = !0)) : (n = !1, o = !1), 1 == t.i && (o = !1), {
            env: t,
            popup: n,
            popunder: e,
            tabup: i,
            tabunder: o
        }
    },
    _openPopunder: function(t, e) {
        var n = this.cap.env;
        return "desktop" != n.f ? this.cap.tabunder ? this._openTabunder(t) : this._openTabup(t) : "chrome" == n.b ? (this.minipopmon = !0, this._openPopunderCR(t, e)) : "firefox" == n.b ? this._openPopunderFF(t) : "msie" == n.b && n.v < 11 ? this._openPopunderBlur(t) : "msie" == n.b && 11 == n.v ? this._openPopunderIE11(t) : "safari" == n.b ? this._openPopunderSafari(t) : "edge" == n.b ? this.cap.tabunder ? this._openTabunder(t) : this._openPopup(t) : void 0
    },
    _prepopOpen: function(t) {
        "chrome" == this.cap.env.b ? this.prepop = this._openPopunderCRPre(t) : this._openPopunder("about:blank")
    },
    _prepopReady: function() {
        return !(!this.prepop || this.prepop.closed || !this.prepop.location)
    },
    _prepopUse: function(t) {
        this.settings.onbeforeopen && (t = this.settings.onbeforeopen(t));
        try {
            "chrome" == this.cap.env.b ? (this._openPopunderCRPost(t), this.prepop = !1) : (this.prepop.location.replace(t), this.prepop = !1)
        } catch (e) {
            return !1
        }
        return !0
    },
    _prepopClose: function() {
        try {
            this.prepop.close()
        } catch (t) {
            return !1
        }
        return !0
    },
    _openAd: function(t, e) {
        this.settings.onbeforeopen && (t = this.settings.onbeforeopen(t));
        var n = e.type;
        return "popunder" != n || this.cap.popunder || (n = "popup"), "tabunder" != n || this.cap.tabunder || (n = "popup"), "popup" != n || this.cap.popup || (n = "tabup"), "tabup" != n || this.cap.tabup || (n = "popup"), "popunder" == n ? this._openPopunder(t, e.crtimeout || this.settings.crtimeout) : "popup" == n ? this._openPopup(t) : "tabup" == n ? this._openTabup(t) : void 0
    },
    abortPop: function() {
        this._prepopReady() && this._prepopClose(), this.catchalldiv && this._removeCatchAllDiv(), this.settings.prepop = !1
    },
    _onExecute: function(t) {
        if ("click" == (t = t || window.event).type || "mouseup" == t.type || "mousedown" == t.type) {
            var e = !1;
            if ("which" in t ? e = 3 == t.which : "button" in t && (e = 2 == t.button), e) return !1
        }
        if ("isTrusted" in t && !t.isTrusted) return !1;
        if (navigator.userActivation && !navigator.userActivation.isActive) return !1;
        if (this.minipopmon) {
            var n = this._getMinipopStatus(this.minipopmontw);
            if ("success" == n) {
                if (this.minipopmon = !1, "chrome" == this.cap.env.b) return !1
            } else "closed" == n && (this.minipopmon = !1)
        }
        var i = this.checkStackEmpty();
        if (i && this.settings.prepop && !this._prepopReady() && (this.settings.prepop = !1, this._prepopOpen(this.settings.crtimeout)), this.catchalldiv && i && this._removeCatchAllDiv(), this.checkIgnore(t)) return !1;
        if (i) return !1;
        if (this.settings.prepop = !1, navigator.userActivation && !navigator.userActivation.isActive) return !1;
        var o = this.checkStack();
        if (!o) return !1;
        this.minipopmon = !1;
        var r = this._openAd(o.url, o.options);
        if (this.minipopmon && (this.minipopmontw = r), "function" == typeof o.options.afterOpen) try {
            o.options.afterOpen(o.url, o.options, r)
        } catch (t) {}
        this.catchalldiv && this.checkStackEmpty() && this._removeCatchAllDiv()
    },
    _userActivationHandler: function() {
        navigator.userActivation.isActive && this._onExecute({
           type: "uah"
        })
    },
    _onMouseDownHandler: function(t) {
        var e = t.target || t.srcElement || t.toElement;
        if (this._prepopReady()) return !1;
        var n = !1;
        if (this.minipopmontw) {
            var i = this._getMinipopStatus(this.minipopmontw);
            "waiting" == i && (n = !0), "prepopready" == i && (n = !0)
        }
        return !n && ("A" == e.tagName && (e.popjsoriginalhref && this.checkStackEmpty() ? (e.href = e.popjsoriginalhref, delete e.popjsoriginalhref, e.target = "_blank", !1) : !("_blank" != e.target && document.getElementsByTagName("BASE").length > 0 && "_blank" != (document.getElementsByTagName("BASE")[0].target || "").toLowerCase()) && (!this.checkStackEmpty() && (e.popjsoriginalhref = e.href, e.href = "#", void(e.target = "")))))
    },
    _onBeforeUnloadHandler: function() {
        this._prepopReady() && this._prepopClose()
    },
    _isCatchAllNeeded: function() {
        function t(t) {
            for (var e = document.getElementsByTagName(t), n = 0; n < e.length; n++)
                if ((e.item(n).clientHeight || e.item(n).offsetHeight || 0) > 30 || (e.item(n).clientWidth || e.item(n).offsetWidth || 0) > 30) return !0;
            return !1
        }
        return t("IFRAME") || t("VIDEO") || t("OBJECT")
    },
    _removeCatchAllDiv: function() {
        this.catchalldiv.parentNode.removeChild(this.catchalldiv), delete this.catchalldiv
    },
    _createCatchAllDiv: function() {
        if (0 == document.getElementsByTagName("body").length) return !1;
        var t = document.createElement("div");
        return t.style = "position: fixed; display: block; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0); z-index: 300000;", document.addEventListener ? ("desktop" != this.cap.env.f && "ios" == this.cap.env.o && t.addEventListener("touchend", this._onExecute.bind(this), !0), t.addEventListener("click", this._onExecute.bind(this), !0)) : t.attachEvent("onclick", this._onExecute.bind(this)), document.getElementsByTagName("body")[0].appendChild(t), this.catchalldiv = t, !0
    },
    _deployCatchAll: function() {
        this.settings.catchalldivoff && (this._isCatchAllNeeded() && !this.catchalldiv ? this._createCatchAllDiv() : this.catchallmon || (this.catchallmon = setInterval(function() {
            this.catchalldiv ? clearInterval(this.catchallmon) : this._isCatchAllNeeded() && (clearInterval(this.catchallmon), this._createCatchAllDiv())
        }.bind(this), 500)))
    },
    init: function(t) {
        this.cap = this._getBrowserCapabilities(), this.urls = [], this.ignores = [], this.settings = {}, this.settings.prepop = !!t.prepop && this.cap.popunder, this.settings.crtimeout = t.crtimeout || 6e4, this.settings.targetblankhandler = t.targetblankhandler || !0, this.settings.onbeforeopen = t.onbeforeopen, this.settings.catchalldivoff = t.catchalldiv || !navigator.userActivation, this.minipopmon = !1, this._deployCatchAll(), navigator.userActivation , document.addEventListener ? ("desktop" != this.cap.env.f && "ios" == this.cap.env.o && document.addEventListener("touchend", this._onExecute.bind(this), !0), document.addEventListener("click", this._onExecute.bind(this), !0), this.settings.targetblankhandler && document.addEventListener("mousedown", this._onMouseDownHandler.bind(this), !0), this.settings.prepop && window.addEventListener("beforeunload", this._onBeforeUnloadHandler.bind(this), !0)) : (document.attachEvent("onclick", this._onExecute.bind(this)), this.settings.targetblankhandler && document.attachEvent("onmousedown", this._onMouseDownHandler.bind(this)), this.settings.prepop && window.attachEvent("onbeforeunload", this._onBeforeUnloadHandler.bind(this)))
    },
    addUrl: function(t, e) {
        if (!this.cap) return !1;
        var n = !1;
        if (this._prepopReady()) {
            var i = !0;
            "function" == typeof e.shouldFire && (i = !1, n = !1), "popunder" == e.type && i ? this._prepopUse(t) && (n = !0) : i && this._prepopClose()
        }
        n || (this.urls.push({
            url: t,
            options: e
        }), this._deployCatchAll())
    }
};
BetterJsPop.popunderAvailable = BetterJsPop._getBrowserCapabilities().popunder, BetterJsPop.init({
    prepop: !1
});
