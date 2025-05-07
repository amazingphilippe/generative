/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Oo(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const ve = {}, mr = [], Gi = () => {
}, Dc = () => !1, Ys = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Mo = (t) => t.startsWith("onUpdate:"), ni = Object.assign, Lo = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Vc = Object.prototype.hasOwnProperty, pe = (t, e) => Vc.call(t, e), Wt = Array.isArray, vr = (t) => $s(t) === "[object Map]", zl = (t) => $s(t) === "[object Set]", Yt = (t) => typeof t == "function", De = (t) => typeof t == "string", An = (t) => typeof t == "symbol", Ie = (t) => t !== null && typeof t == "object", Dl = (t) => (Ie(t) || Yt(t)) && Yt(t.then) && Yt(t.catch), Vl = Object.prototype.toString, $s = (t) => Vl.call(t), Bc = (t) => $s(t).slice(8, -1), Bl = (t) => $s(t) === "[object Object]", No = (t) => De(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Vr = /* @__PURE__ */ Oo(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Xs = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Uc = /-(\w)/g, In = Xs(
  (t) => t.replace(Uc, (e, n) => n ? n.toUpperCase() : "")
), qc = /\B([A-Z])/g, tr = Xs(
  (t) => t.replace(qc, "-$1").toLowerCase()
), Ul = Xs((t) => t.charAt(0).toUpperCase() + t.slice(1)), za = Xs(
  (t) => t ? `on${Ul(t)}` : ""
), wn = (t, e) => !Object.is(t, e), Os = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, ql = (t, e, n, s = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, io = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Zu;
const Qs = () => Zu || (Zu = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ro(t) {
  if (Wt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], o = De(s) ? Gc(s) : Ro(s);
      if (o)
        for (const l in o)
          e[l] = o[l];
    }
    return e;
  } else if (De(t) || Ie(t))
    return t;
}
const jc = /;(?![^(]*\))/g, Hc = /:([^]+)/, Wc = /\/\*[^]*?\*\//g;
function Gc(t) {
  const e = {};
  return t.replace(Wc, "").split(jc).forEach((n) => {
    if (n) {
      const s = n.split(Hc);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function Fo(t) {
  let e = "";
  if (De(t))
    e = t;
  else if (Wt(t))
    for (let n = 0; n < t.length; n++) {
      const s = Fo(t[n]);
      s && (e += s + " ");
    }
  else if (Ie(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Zc = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Kc = /* @__PURE__ */ Oo(Zc);
function jl(t) {
  return !!t || t === "";
}
const Hl = (t) => !!(t && t.__v_isRef === !0), no = (t) => De(t) ? t : t == null ? "" : Wt(t) || Ie(t) && (t.toString === Vl || !Yt(t.toString)) ? Hl(t) ? no(t.value) : JSON.stringify(t, Wl, 2) : String(t), Wl = (t, e) => Hl(e) ? Wl(t, e.value) : vr(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [s, o], l) => (n[Da(s, l) + " =>"] = o, n),
    {}
  )
} : zl(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => Da(n))
} : An(e) ? Da(e) : Ie(e) && !Wt(e) && !Bl(e) ? String(e) : e, Da = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    An(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ti;
class Gl {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ti, !e && ti && (this.index = (ti.scopes || (ti.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].pause();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, n;
      if (this.scopes)
        for (e = 0, n = this.scopes.length; e < n; e++)
          this.scopes[e].resume();
      for (e = 0, n = this.effects.length; e < n; e++)
        this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const n = ti;
      try {
        return ti = this, e();
      } finally {
        ti = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ti = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ti = this.parent;
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Zl(t) {
  return new Gl(t);
}
function Kl() {
  return ti;
}
function Yc(t, e = !1) {
  ti && ti.cleanups.push(t);
}
let be;
const Va = /* @__PURE__ */ new WeakSet();
class Yl {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ti && ti.active && ti.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Va.has(this) && (Va.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Xl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ku(this), Ql(this);
    const e = be, n = Fi;
    be = this, Fi = !0;
    try {
      return this.fn();
    } finally {
      Jl(this), be = e, Fi = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        Vo(e);
      this.deps = this.depsTail = void 0, Ku(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Va.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ro(this) && this.run();
  }
  get dirty() {
    return ro(this);
  }
}
let $l = 0, Br, Ur;
function Xl(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Ur, Ur = t;
    return;
  }
  t.next = Br, Br = t;
}
function zo() {
  $l++;
}
function Do() {
  if (--$l > 0)
    return;
  if (Ur) {
    let e = Ur;
    for (Ur = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; Br; ) {
    let e = Br;
    for (Br = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (s) {
          t || (t = s);
        }
      e = n;
    }
  }
  if (t) throw t;
}
function Ql(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function Jl(t) {
  let e, n = t.depsTail, s = n;
  for (; s; ) {
    const o = s.prevDep;
    s.version === -1 ? (s === n && (n = o), Vo(s), $c(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = o;
  }
  t.deps = e, t.depsTail = n;
}
function ro(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (th(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function th(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Kr))
    return;
  t.globalVersion = Kr;
  const e = t.dep;
  if (t.flags |= 2, e.version > 0 && !t.isSSR && t.deps && !ro(t)) {
    t.flags &= -3;
    return;
  }
  const n = be, s = Fi;
  be = t, Fi = !0;
  try {
    Ql(t);
    const o = t.fn(t._value);
    (e.version === 0 || wn(o, t._value)) && (t._value = o, e.version++);
  } catch (o) {
    throw e.version++, o;
  } finally {
    be = n, Fi = s, Jl(t), t.flags &= -3;
  }
}
function Vo(t, e = !1) {
  const { dep: n, prevSub: s, nextSub: o } = t;
  if (s && (s.nextSub = o, t.prevSub = void 0), o && (o.prevSub = s, t.nextSub = void 0), n.subs === t && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let l = n.computed.deps; l; l = l.nextDep)
      Vo(l, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function $c(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let Fi = !0;
const eh = [];
function Tn() {
  eh.push(Fi), Fi = !1;
}
function En() {
  const t = eh.pop();
  Fi = t === void 0 ? !0 : t;
}
function Ku(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = be;
    be = void 0;
    try {
      e();
    } finally {
      be = n;
    }
  }
}
let Kr = 0;
class Xc {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Bo {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e) {
    if (!be || !Fi || be === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== be)
      n = this.activeLink = new Xc(be, this), be.deps ? (n.prevDep = be.depsTail, be.depsTail.nextDep = n, be.depsTail = n) : be.deps = be.depsTail = n, ih(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = be.depsTail, n.nextDep = void 0, be.depsTail.nextDep = n, be.depsTail = n, be.deps === n && (be.deps = s);
    }
    return n;
  }
  trigger(e) {
    this.version++, Kr++, this.notify(e);
  }
  notify(e) {
    zo();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Do();
    }
  }
}
function ih(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let s = e.deps; s; s = s.nextDep)
        ih(s);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Rs = /* @__PURE__ */ new WeakMap(), Gn = Symbol(
  ""
), so = Symbol(
  ""
), Yr = Symbol(
  ""
);
function Ke(t, e, n) {
  if (Fi && be) {
    let s = Rs.get(t);
    s || Rs.set(t, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || (s.set(n, o = new Bo()), o.map = s, o.key = n), o.track();
  }
}
function tn(t, e, n, s, o, l) {
  const _ = Rs.get(t);
  if (!_) {
    Kr++;
    return;
  }
  const v = (k) => {
    k && k.trigger();
  };
  if (zo(), e === "clear")
    _.forEach(v);
  else {
    const k = Wt(t), N = k && No(n);
    if (k && n === "length") {
      const z = Number(s);
      _.forEach((q, tt) => {
        (tt === "length" || tt === Yr || !An(tt) && tt >= z) && v(q);
      });
    } else
      switch ((n !== void 0 || _.has(void 0)) && v(_.get(n)), N && v(_.get(Yr)), e) {
        case "add":
          k ? N && v(_.get("length")) : (v(_.get(Gn)), vr(t) && v(_.get(so)));
          break;
        case "delete":
          k || (v(_.get(Gn)), vr(t) && v(_.get(so)));
          break;
        case "set":
          vr(t) && v(_.get(Gn));
          break;
      }
  }
  Do();
}
function Qc(t, e) {
  const n = Rs.get(t);
  return n && n.get(e);
}
function or(t) {
  const e = ee(t);
  return e === t ? e : (Ke(e, "iterate", Yr), Pi(t) ? e : e.map(Ye));
}
function Js(t) {
  return Ke(t = ee(t), "iterate", Yr), t;
}
const Jc = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ba(this, Symbol.iterator, Ye);
  },
  concat(...t) {
    return or(this).concat(
      ...t.map((e) => Wt(e) ? or(e) : e)
    );
  },
  entries() {
    return Ba(this, "entries", (t) => (t[1] = Ye(t[1]), t));
  },
  every(t, e) {
    return Xi(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Xi(this, "filter", t, e, (n) => n.map(Ye), arguments);
  },
  find(t, e) {
    return Xi(this, "find", t, e, Ye, arguments);
  },
  findIndex(t, e) {
    return Xi(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Xi(this, "findLast", t, e, Ye, arguments);
  },
  findLastIndex(t, e) {
    return Xi(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Xi(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Ua(this, "includes", t);
  },
  indexOf(...t) {
    return Ua(this, "indexOf", t);
  },
  join(t) {
    return or(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return Ua(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Xi(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Nr(this, "pop");
  },
  push(...t) {
    return Nr(this, "push", t);
  },
  reduce(t, ...e) {
    return Yu(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Yu(this, "reduceRight", t, e);
  },
  shift() {
    return Nr(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Xi(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Nr(this, "splice", t);
  },
  toReversed() {
    return or(this).toReversed();
  },
  toSorted(t) {
    return or(this).toSorted(t);
  },
  toSpliced(...t) {
    return or(this).toSpliced(...t);
  },
  unshift(...t) {
    return Nr(this, "unshift", t);
  },
  values() {
    return Ba(this, "values", Ye);
  }
};
function Ba(t, e, n) {
  const s = Js(t), o = s[e]();
  return s !== t && !Pi(t) && (o._next = o.next, o.next = () => {
    const l = o._next();
    return l.value && (l.value = n(l.value)), l;
  }), o;
}
const td = Array.prototype;
function Xi(t, e, n, s, o, l) {
  const _ = Js(t), v = _ !== t && !Pi(t), k = _[e];
  if (k !== td[e]) {
    const q = k.apply(t, l);
    return v ? Ye(q) : q;
  }
  let N = n;
  _ !== t && (v ? N = function(q, tt) {
    return n.call(this, Ye(q), tt, t);
  } : n.length > 2 && (N = function(q, tt) {
    return n.call(this, q, tt, t);
  }));
  const z = k.call(_, N, s);
  return v && o ? o(z) : z;
}
function Yu(t, e, n, s) {
  const o = Js(t);
  let l = n;
  return o !== t && (Pi(t) ? n.length > 3 && (l = function(_, v, k) {
    return n.call(this, _, v, k, t);
  }) : l = function(_, v, k) {
    return n.call(this, _, Ye(v), k, t);
  }), o[e](l, ...s);
}
function Ua(t, e, n) {
  const s = ee(t);
  Ke(s, "iterate", Yr);
  const o = s[e](...n);
  return (o === -1 || o === !1) && jo(n[0]) ? (n[0] = ee(n[0]), s[e](...n)) : o;
}
function Nr(t, e, n = []) {
  Tn(), zo();
  const s = ee(t)[e].apply(t, n);
  return Do(), En(), s;
}
const ed = /* @__PURE__ */ Oo("__proto__,__v_isRef,__isVue"), nh = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(An)
);
function id(t) {
  An(t) || (t = String(t));
  const e = ee(this);
  return Ke(e, "has", t), e.hasOwnProperty(t);
}
class rh {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, s) {
    if (n === "__v_skip") return e.__v_skip;
    const o = this._isReadonly, l = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return l;
    if (n === "__v_raw")
      return s === (o ? l ? cd : uh : l ? oh : ah).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const _ = Wt(e);
    if (!o) {
      let k;
      if (_ && (k = Jc[n]))
        return k;
      if (n === "hasOwnProperty")
        return id;
    }
    const v = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ye(e) ? e : s
    );
    return (An(n) ? nh.has(n) : ed(n)) || (o || Ke(e, "get", n), l) ? v : ye(v) ? _ && No(n) ? v : v.value : Ie(v) ? o ? lh(v) : ta(v) : v;
  }
}
class sh extends rh {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, o) {
    let l = e[n];
    if (!this._isShallow) {
      const k = Yn(l);
      if (!Pi(s) && !Yn(s) && (l = ee(l), s = ee(s)), !Wt(e) && ye(l) && !ye(s))
        return k ? !1 : (l.value = s, !0);
    }
    const _ = Wt(e) && No(n) ? Number(n) < e.length : pe(e, n), v = Reflect.set(
      e,
      n,
      s,
      ye(e) ? e : o
    );
    return e === ee(o) && (_ ? wn(s, l) && tn(e, "set", n, s) : tn(e, "add", n, s)), v;
  }
  deleteProperty(e, n) {
    const s = pe(e, n);
    e[n];
    const o = Reflect.deleteProperty(e, n);
    return o && s && tn(e, "delete", n, void 0), o;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!An(n) || !nh.has(n)) && Ke(e, "has", n), s;
  }
  ownKeys(e) {
    return Ke(
      e,
      "iterate",
      Wt(e) ? "length" : Gn
    ), Reflect.ownKeys(e);
  }
}
class nd extends rh {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const rd = /* @__PURE__ */ new sh(), sd = /* @__PURE__ */ new nd(), ad = /* @__PURE__ */ new sh(!0);
const ao = (t) => t, Is = (t) => Reflect.getPrototypeOf(t);
function od(t, e, n) {
  return function(...s) {
    const o = this.__v_raw, l = ee(o), _ = vr(l), v = t === "entries" || t === Symbol.iterator && _, k = t === "keys" && _, N = o[t](...s), z = n ? ao : e ? oo : Ye;
    return !e && Ke(
      l,
      "iterate",
      k ? so : Gn
    ), {
      // iterator protocol
      next() {
        const { value: q, done: tt } = N.next();
        return tt ? { value: q, done: tt } : {
          value: v ? [z(q[0]), z(q[1])] : z(q),
          done: tt
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ks(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function ud(t, e) {
  const n = {
    get(o) {
      const l = this.__v_raw, _ = ee(l), v = ee(o);
      t || (wn(o, v) && Ke(_, "get", o), Ke(_, "get", v));
      const { has: k } = Is(_), N = e ? ao : t ? oo : Ye;
      if (k.call(_, o))
        return N(l.get(o));
      if (k.call(_, v))
        return N(l.get(v));
      l !== _ && l.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !t && Ke(ee(o), "iterate", Gn), Reflect.get(o, "size", o);
    },
    has(o) {
      const l = this.__v_raw, _ = ee(l), v = ee(o);
      return t || (wn(o, v) && Ke(_, "has", o), Ke(_, "has", v)), o === v ? l.has(o) : l.has(o) || l.has(v);
    },
    forEach(o, l) {
      const _ = this, v = _.__v_raw, k = ee(v), N = e ? ao : t ? oo : Ye;
      return !t && Ke(k, "iterate", Gn), v.forEach((z, q) => o.call(l, N(z), N(q), _));
    }
  };
  return ni(
    n,
    t ? {
      add: ks("add"),
      set: ks("set"),
      delete: ks("delete"),
      clear: ks("clear")
    } : {
      add(o) {
        !e && !Pi(o) && !Yn(o) && (o = ee(o));
        const l = ee(this);
        return Is(l).has.call(l, o) || (l.add(o), tn(l, "add", o, o)), this;
      },
      set(o, l) {
        !e && !Pi(l) && !Yn(l) && (l = ee(l));
        const _ = ee(this), { has: v, get: k } = Is(_);
        let N = v.call(_, o);
        N || (o = ee(o), N = v.call(_, o));
        const z = k.call(_, o);
        return _.set(o, l), N ? wn(l, z) && tn(_, "set", o, l) : tn(_, "add", o, l), this;
      },
      delete(o) {
        const l = ee(this), { has: _, get: v } = Is(l);
        let k = _.call(l, o);
        k || (o = ee(o), k = _.call(l, o)), v && v.call(l, o);
        const N = l.delete(o);
        return k && tn(l, "delete", o, void 0), N;
      },
      clear() {
        const o = ee(this), l = o.size !== 0, _ = o.clear();
        return l && tn(
          o,
          "clear",
          void 0,
          void 0
        ), _;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    n[o] = od(o, t, e);
  }), n;
}
function Uo(t, e) {
  const n = ud(t, e);
  return (s, o, l) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? s : Reflect.get(
    pe(n, o) && o in s ? n : s,
    o,
    l
  );
}
const ld = {
  get: /* @__PURE__ */ Uo(!1, !1)
}, hd = {
  get: /* @__PURE__ */ Uo(!1, !0)
}, fd = {
  get: /* @__PURE__ */ Uo(!0, !1)
};
const ah = /* @__PURE__ */ new WeakMap(), oh = /* @__PURE__ */ new WeakMap(), uh = /* @__PURE__ */ new WeakMap(), cd = /* @__PURE__ */ new WeakMap();
function dd(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function pd(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : dd(Bc(t));
}
function ta(t) {
  return Yn(t) ? t : qo(
    t,
    !1,
    rd,
    ld,
    ah
  );
}
function gd(t) {
  return qo(
    t,
    !1,
    ad,
    hd,
    oh
  );
}
function lh(t) {
  return qo(
    t,
    !0,
    sd,
    fd,
    uh
  );
}
function qo(t, e, n, s, o) {
  if (!Ie(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const l = o.get(t);
  if (l)
    return l;
  const _ = pd(t);
  if (_ === 0)
    return t;
  const v = new Proxy(
    t,
    _ === 2 ? s : n
  );
  return o.set(t, v), v;
}
function nn(t) {
  return Yn(t) ? nn(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Yn(t) {
  return !!(t && t.__v_isReadonly);
}
function Pi(t) {
  return !!(t && t.__v_isShallow);
}
function jo(t) {
  return t ? !!t.__v_raw : !1;
}
function ee(t) {
  const e = t && t.__v_raw;
  return e ? ee(e) : t;
}
function Ho(t) {
  return !pe(t, "__v_skip") && Object.isExtensible(t) && ql(t, "__v_skip", !0), t;
}
const Ye = (t) => Ie(t) ? ta(t) : t, oo = (t) => Ie(t) ? lh(t) : t;
function ye(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function He(t) {
  return _d(t, !1);
}
function _d(t, e) {
  return ye(t) ? t : new md(t, e);
}
class md {
  constructor(e, n) {
    this.dep = new Bo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : ee(e), this._value = n ? e : Ye(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, s = this.__v_isShallow || Pi(e) || Yn(e);
    e = s ? e : ee(e), wn(e, n) && (this._rawValue = e, this._value = s ? e : Ye(e), this.dep.trigger());
  }
}
function Ri(t) {
  return ye(t) ? t.value : t;
}
const vd = {
  get: (t, e, n) => e === "__v_raw" ? t : Ri(Reflect.get(t, e, n)),
  set: (t, e, n, s) => {
    const o = t[e];
    return ye(o) && !ye(n) ? (o.value = n, !0) : Reflect.set(t, e, n, s);
  }
};
function hh(t) {
  return nn(t) ? t : new Proxy(t, vd);
}
function yd(t) {
  const e = Wt(t) ? new Array(t.length) : {};
  for (const n in t)
    e[n] = fh(t, n);
  return e;
}
class bd {
  constructor(e, n, s) {
    this._object = e, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const e = this._object[this._key];
    return this._value = e === void 0 ? this._defaultValue : e;
  }
  set value(e) {
    this._object[this._key] = e;
  }
  get dep() {
    return Qc(ee(this._object), this._key);
  }
}
class xd {
  constructor(e) {
    this._getter = e, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function wd(t, e, n) {
  return ye(t) ? t : Yt(t) ? new xd(t) : Ie(t) && arguments.length > 1 ? fh(t, e, n) : He(t);
}
function fh(t, e, n) {
  const s = t[e];
  return ye(s) ? s : new bd(t, e, n);
}
class Sd {
  constructor(e, n, s) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new Bo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Kr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    be !== this)
      return Xl(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return th(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function Cd(t, e, n = !1) {
  let s, o;
  return Yt(t) ? s = t : (s = t.get, o = t.set), new Sd(s, o, n);
}
const Ps = {}, Fs = /* @__PURE__ */ new WeakMap();
let qn;
function Id(t, e = !1, n = qn) {
  if (n) {
    let s = Fs.get(n);
    s || Fs.set(n, s = []), s.push(t);
  }
}
function kd(t, e, n = ve) {
  const { immediate: s, deep: o, once: l, scheduler: _, augmentJob: v, call: k } = n, N = (xt) => o ? xt : Pi(xt) || o === !1 || o === 0 ? en(xt, 1) : en(xt);
  let z, q, tt, F, mt = !1, X = !1;
  if (ye(t) ? (q = () => t.value, mt = Pi(t)) : nn(t) ? (q = () => N(t), mt = !0) : Wt(t) ? (X = !0, mt = t.some((xt) => nn(xt) || Pi(xt)), q = () => t.map((xt) => {
    if (ye(xt))
      return xt.value;
    if (nn(xt))
      return N(xt);
    if (Yt(xt))
      return k ? k(xt, 2) : xt();
  })) : Yt(t) ? e ? q = k ? () => k(t, 2) : t : q = () => {
    if (tt) {
      Tn();
      try {
        tt();
      } finally {
        En();
      }
    }
    const xt = qn;
    qn = z;
    try {
      return k ? k(t, 3, [F]) : t(F);
    } finally {
      qn = xt;
    }
  } : q = Gi, e && o) {
    const xt = q, Bt = o === !0 ? 1 / 0 : o;
    q = () => en(xt(), Bt);
  }
  const It = Kl(), ut = () => {
    z.stop(), It && It.active && Lo(It.effects, z);
  };
  if (l && e) {
    const xt = e;
    e = (...Bt) => {
      xt(...Bt), ut();
    };
  }
  let Xt = X ? new Array(t.length).fill(Ps) : Ps;
  const Pt = (xt) => {
    if (!(!(z.flags & 1) || !z.dirty && !xt))
      if (e) {
        const Bt = z.run();
        if (o || mt || (X ? Bt.some((ht, At) => wn(ht, Xt[At])) : wn(Bt, Xt))) {
          tt && tt();
          const ht = qn;
          qn = z;
          try {
            const At = [
              Bt,
              // pass undefined as the old value when it's changed for the first time
              Xt === Ps ? void 0 : X && Xt[0] === Ps ? [] : Xt,
              F
            ];
            k ? k(e, 3, At) : (
              // @ts-expect-error
              e(...At)
            ), Xt = Bt;
          } finally {
            qn = ht;
          }
        }
      } else
        z.run();
  };
  return v && v(Pt), z = new Yl(q), z.scheduler = _ ? () => _(Pt, !1) : Pt, F = (xt) => Id(xt, !1, z), tt = z.onStop = () => {
    const xt = Fs.get(z);
    if (xt) {
      if (k)
        k(xt, 4);
      else
        for (const Bt of xt) Bt();
      Fs.delete(z);
    }
  }, e ? s ? Pt(!0) : Xt = z.run() : _ ? _(Pt.bind(null, !0), !0) : z.run(), ut.pause = z.pause.bind(z), ut.resume = z.resume.bind(z), ut.stop = ut, ut;
}
function en(t, e = 1 / 0, n) {
  if (e <= 0 || !Ie(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, ye(t))
    en(t.value, e, n);
  else if (Wt(t))
    for (let s = 0; s < t.length; s++)
      en(t[s], e, n);
  else if (zl(t) || vr(t))
    t.forEach((s) => {
      en(s, e, n);
    });
  else if (Bl(t)) {
    for (const s in t)
      en(t[s], e, n);
    for (const s of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, s) && en(t[s], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function rs(t, e, n, s) {
  try {
    return s ? t(...s) : t();
  } catch (o) {
    ea(o, e, n);
  }
}
function Zi(t, e, n, s) {
  if (Yt(t)) {
    const o = rs(t, e, n, s);
    return o && Dl(o) && o.catch((l) => {
      ea(l, e, n);
    }), o;
  }
  if (Wt(t)) {
    const o = [];
    for (let l = 0; l < t.length; l++)
      o.push(Zi(t[l], e, n, s));
    return o;
  }
}
function ea(t, e, n, s = !0) {
  const o = e ? e.vnode : null, { errorHandler: l, throwUnhandledErrorInProduction: _ } = e && e.appContext.config || ve;
  if (e) {
    let v = e.parent;
    const k = e.proxy, N = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; v; ) {
      const z = v.ec;
      if (z) {
        for (let q = 0; q < z.length; q++)
          if (z[q](t, k, N) === !1)
            return;
      }
      v = v.parent;
    }
    if (l) {
      Tn(), rs(l, null, 10, [
        t,
        k,
        N
      ]), En();
      return;
    }
  }
  Pd(t, n, o, s, _);
}
function Pd(t, e, n, s = !0, o = !1) {
  if (o)
    throw t;
  console.error(t);
}
const ei = [];
let Hi = -1;
const yr = [];
let yn = null, dr = 0;
const ch = /* @__PURE__ */ Promise.resolve();
let zs = null;
function dh(t) {
  const e = zs || ch;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function Ad(t) {
  let e = Hi + 1, n = ei.length;
  for (; e < n; ) {
    const s = e + n >>> 1, o = ei[s], l = $r(o);
    l < t || l === t && o.flags & 2 ? e = s + 1 : n = s;
  }
  return e;
}
function Wo(t) {
  if (!(t.flags & 1)) {
    const e = $r(t), n = ei[ei.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= $r(n) ? ei.push(t) : ei.splice(Ad(e), 0, t), t.flags |= 1, ph();
  }
}
function ph() {
  zs || (zs = ch.then(_h));
}
function Td(t) {
  Wt(t) ? yr.push(...t) : yn && t.id === -1 ? yn.splice(dr + 1, 0, t) : t.flags & 1 || (yr.push(t), t.flags |= 1), ph();
}
function $u(t, e, n = Hi + 1) {
  for (; n < ei.length; n++) {
    const s = ei[n];
    if (s && s.flags & 2) {
      if (t && s.id !== t.uid)
        continue;
      ei.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function gh(t) {
  if (yr.length) {
    const e = [...new Set(yr)].sort(
      (n, s) => $r(n) - $r(s)
    );
    if (yr.length = 0, yn) {
      yn.push(...e);
      return;
    }
    for (yn = e, dr = 0; dr < yn.length; dr++) {
      const n = yn[dr];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    yn = null, dr = 0;
  }
}
const $r = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function _h(t) {
  try {
    for (Hi = 0; Hi < ei.length; Hi++) {
      const e = ei[Hi];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), rs(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Hi < ei.length; Hi++) {
      const e = ei[Hi];
      e && (e.flags &= -2);
    }
    Hi = -1, ei.length = 0, gh(), zs = null, (ei.length || yr.length) && _h();
  }
}
let pi = null, mh = null;
function Ds(t) {
  const e = pi;
  return pi = t, mh = t && t.type.__scopeId || null, e;
}
function Ed(t, e = pi, n) {
  if (!e || t._n)
    return t;
  const s = (...o) => {
    s._d && sl(-1);
    const l = Ds(e);
    let _;
    try {
      _ = t(...o);
    } finally {
      Ds(l), s._d && sl(1);
    }
    return _;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function ur(t, e) {
  if (pi === null)
    return t;
  const n = sa(pi), s = t.dirs || (t.dirs = []);
  for (let o = 0; o < e.length; o++) {
    let [l, _, v, k = ve] = e[o];
    l && (Yt(l) && (l = {
      mounted: l,
      updated: l
    }), l.deep && en(_), s.push({
      dir: l,
      instance: n,
      value: _,
      oldValue: void 0,
      arg: v,
      modifiers: k
    }));
  }
  return t;
}
function Bn(t, e, n, s) {
  const o = t.dirs, l = e && e.dirs;
  for (let _ = 0; _ < o.length; _++) {
    const v = o[_];
    l && (v.oldValue = l[_].value);
    let k = v.dir[s];
    k && (Tn(), Zi(k, n, 8, [
      t.el,
      v,
      t,
      e
    ]), En());
  }
}
const Od = Symbol("_vte"), Md = (t) => t.__isTeleport;
function Go(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Go(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function vh(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Vs(t, e, n, s, o = !1) {
  if (Wt(t)) {
    t.forEach(
      (mt, X) => Vs(
        mt,
        e && (Wt(e) ? e[X] : e),
        n,
        s,
        o
      )
    );
    return;
  }
  if (qr(s) && !o) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Vs(t, e, n, s.component.subTree);
    return;
  }
  const l = s.shapeFlag & 4 ? sa(s.component) : s.el, _ = o ? null : l, { i: v, r: k } = t, N = e && e.r, z = v.refs === ve ? v.refs = {} : v.refs, q = v.setupState, tt = ee(q), F = q === ve ? () => !1 : (mt) => pe(tt, mt);
  if (N != null && N !== k && (De(N) ? (z[N] = null, F(N) && (q[N] = null)) : ye(N) && (N.value = null)), Yt(k))
    rs(k, v, 12, [_, z]);
  else {
    const mt = De(k), X = ye(k);
    if (mt || X) {
      const It = () => {
        if (t.f) {
          const ut = mt ? F(k) ? q[k] : z[k] : k.value;
          o ? Wt(ut) && Lo(ut, l) : Wt(ut) ? ut.includes(l) || ut.push(l) : mt ? (z[k] = [l], F(k) && (q[k] = z[k])) : (k.value = [l], t.k && (z[t.k] = k.value));
        } else mt ? (z[k] = _, F(k) && (q[k] = _)) : X && (k.value = _, t.k && (z[t.k] = _));
      };
      _ ? (It.id = -1, ci(It, n)) : It();
    }
  }
}
Qs().requestIdleCallback;
Qs().cancelIdleCallback;
const qr = (t) => !!t.type.__asyncLoader, yh = (t) => t.type.__isKeepAlive;
function Ld(t, e) {
  bh(t, "a", e);
}
function Nd(t, e) {
  bh(t, "da", e);
}
function bh(t, e, n = $e) {
  const s = t.__wdc || (t.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return t();
  });
  if (ia(e, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      yh(o.parent.vnode) && Rd(s, e, n, o), o = o.parent;
  }
}
function Rd(t, e, n, s) {
  const o = ia(
    e,
    t,
    s,
    !0
    /* prepend */
  );
  Ko(() => {
    Lo(s[e], o);
  }, n);
}
function ia(t, e, n = $e, s = !1) {
  if (n) {
    const o = n[t] || (n[t] = []), l = e.__weh || (e.__weh = (..._) => {
      Tn();
      const v = ss(n), k = Zi(e, n, t, _);
      return v(), En(), k;
    });
    return s ? o.unshift(l) : o.push(l), l;
  }
}
const on = (t) => (e, n = $e) => {
  (!Qr || t === "sp") && ia(t, (...s) => e(...s), n);
}, Fd = on("bm"), Zo = on("m"), zd = on(
  "bu"
), Dd = on("u"), Vd = on(
  "bum"
), Ko = on("um"), Bd = on(
  "sp"
), Ud = on("rtg"), qd = on("rtc");
function jd(t, e = $e) {
  ia("ec", t, e);
}
const Hd = Symbol.for("v-ndc");
function Wd(t, e, n, s) {
  let o;
  const l = n, _ = Wt(t);
  if (_ || De(t)) {
    const v = _ && nn(t);
    let k = !1;
    v && (k = !Pi(t), t = Js(t)), o = new Array(t.length);
    for (let N = 0, z = t.length; N < z; N++)
      o[N] = e(
        k ? Ye(t[N]) : t[N],
        N,
        void 0,
        l
      );
  } else if (typeof t == "number") {
    o = new Array(t);
    for (let v = 0; v < t; v++)
      o[v] = e(v + 1, v, void 0, l);
  } else if (Ie(t))
    if (t[Symbol.iterator])
      o = Array.from(
        t,
        (v, k) => e(v, k, void 0, l)
      );
    else {
      const v = Object.keys(t);
      o = new Array(v.length);
      for (let k = 0, N = v.length; k < N; k++) {
        const z = v[k];
        o[k] = e(t[z], z, k, l);
      }
    }
  else
    o = [];
  return o;
}
const uo = (t) => t ? qh(t) ? sa(t) : uo(t.parent) : null, jr = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ni(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => uo(t.parent),
    $root: (t) => uo(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => wh(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      Wo(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = dh.bind(t.proxy)),
    $watch: (t) => pp.bind(t)
  })
), qa = (t, e) => t !== ve && !t.__isScriptSetup && pe(t, e), Gd = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: o, props: l, accessCache: _, type: v, appContext: k } = t;
    let N;
    if (e[0] !== "$") {
      const F = _[e];
      if (F !== void 0)
        switch (F) {
          case 1:
            return s[e];
          case 2:
            return o[e];
          case 4:
            return n[e];
          case 3:
            return l[e];
        }
      else {
        if (qa(s, e))
          return _[e] = 1, s[e];
        if (o !== ve && pe(o, e))
          return _[e] = 2, o[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (N = t.propsOptions[0]) && pe(N, e)
        )
          return _[e] = 3, l[e];
        if (n !== ve && pe(n, e))
          return _[e] = 4, n[e];
        lo && (_[e] = 0);
      }
    }
    const z = jr[e];
    let q, tt;
    if (z)
      return e === "$attrs" && Ke(t.attrs, "get", ""), z(t);
    if (
      // css module (injected by vue-loader)
      (q = v.__cssModules) && (q = q[e])
    )
      return q;
    if (n !== ve && pe(n, e))
      return _[e] = 4, n[e];
    if (
      // global properties
      tt = k.config.globalProperties, pe(tt, e)
    )
      return tt[e];
  },
  set({ _: t }, e, n) {
    const { data: s, setupState: o, ctx: l } = t;
    return qa(o, e) ? (o[e] = n, !0) : s !== ve && pe(s, e) ? (s[e] = n, !0) : pe(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (l[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: s, appContext: o, propsOptions: l }
  }, _) {
    let v;
    return !!n[_] || t !== ve && pe(t, _) || qa(e, _) || (v = l[0]) && pe(v, _) || pe(s, _) || pe(jr, _) || pe(o.config.globalProperties, _);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : pe(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function Xu(t) {
  return Wt(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let lo = !0;
function Zd(t) {
  const e = wh(t), n = t.proxy, s = t.ctx;
  lo = !1, e.beforeCreate && Qu(e.beforeCreate, t, "bc");
  const {
    // state
    data: o,
    computed: l,
    methods: _,
    watch: v,
    provide: k,
    inject: N,
    // lifecycle
    created: z,
    beforeMount: q,
    mounted: tt,
    beforeUpdate: F,
    updated: mt,
    activated: X,
    deactivated: It,
    beforeDestroy: ut,
    beforeUnmount: Xt,
    destroyed: Pt,
    unmounted: xt,
    render: Bt,
    renderTracked: ht,
    renderTriggered: At,
    errorCaptured: Ft,
    serverPrefetch: zt,
    // public API
    expose: me,
    inheritAttrs: Te,
    // assets
    components: Fe,
    directives: Oe,
    filters: Tt
  } = e;
  if (N && Kd(N, s, null), _)
    for (const Ut in _) {
      const ue = _[Ut];
      Yt(ue) && (s[Ut] = ue.bind(n));
    }
  if (o) {
    const Ut = o.call(n, n);
    Ie(Ut) && (t.data = ta(Ut));
  }
  if (lo = !0, l)
    for (const Ut in l) {
      const ue = l[Ut], Jt = Yt(ue) ? ue.bind(n, n) : Yt(ue.get) ? ue.get.bind(n, n) : Gi, Qe = !Yt(ue) && Yt(ue.set) ? ue.set.bind(n) : Gi, Di = br({
        get: Jt,
        set: Qe
      });
      Object.defineProperty(s, Ut, {
        enumerable: !0,
        configurable: !0,
        get: () => Di.value,
        set: (bi) => Di.value = bi
      });
    }
  if (v)
    for (const Ut in v)
      xh(v[Ut], s, n, Ut);
  if (k) {
    const Ut = Yt(k) ? k.call(n) : k;
    Reflect.ownKeys(Ut).forEach((ue) => {
      tp(ue, Ut[ue]);
    });
  }
  z && Qu(z, t, "c");
  function ot(Ut, ue) {
    Wt(ue) ? ue.forEach((Jt) => Ut(Jt.bind(n))) : ue && Ut(ue.bind(n));
  }
  if (ot(Fd, q), ot(Zo, tt), ot(zd, F), ot(Dd, mt), ot(Ld, X), ot(Nd, It), ot(jd, Ft), ot(qd, ht), ot(Ud, At), ot(Vd, Xt), ot(Ko, xt), ot(Bd, zt), Wt(me))
    if (me.length) {
      const Ut = t.exposed || (t.exposed = {});
      me.forEach((ue) => {
        Object.defineProperty(Ut, ue, {
          get: () => n[ue],
          set: (Jt) => n[ue] = Jt
        });
      });
    } else t.exposed || (t.exposed = {});
  Bt && t.render === Gi && (t.render = Bt), Te != null && (t.inheritAttrs = Te), Fe && (t.components = Fe), Oe && (t.directives = Oe), zt && vh(t);
}
function Kd(t, e, n = Gi) {
  Wt(t) && (t = ho(t));
  for (const s in t) {
    const o = t[s];
    let l;
    Ie(o) ? "default" in o ? l = Hr(
      o.from || s,
      o.default,
      !0
    ) : l = Hr(o.from || s) : l = Hr(o), ye(l) ? Object.defineProperty(e, s, {
      enumerable: !0,
      configurable: !0,
      get: () => l.value,
      set: (_) => l.value = _
    }) : e[s] = l;
  }
}
function Qu(t, e, n) {
  Zi(
    Wt(t) ? t.map((s) => s.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function xh(t, e, n, s) {
  let o = s.includes(".") ? Fh(n, s) : () => n[s];
  if (De(t)) {
    const l = e[t];
    Yt(l) && Sn(o, l);
  } else if (Yt(t))
    Sn(o, t.bind(n));
  else if (Ie(t))
    if (Wt(t))
      t.forEach((l) => xh(l, e, n, s));
    else {
      const l = Yt(t.handler) ? t.handler.bind(n) : e[t.handler];
      Yt(l) && Sn(o, l, t);
    }
}
function wh(t) {
  const e = t.type, { mixins: n, extends: s } = e, {
    mixins: o,
    optionsCache: l,
    config: { optionMergeStrategies: _ }
  } = t.appContext, v = l.get(e);
  let k;
  return v ? k = v : !o.length && !n && !s ? k = e : (k = {}, o.length && o.forEach(
    (N) => Bs(k, N, _, !0)
  ), Bs(k, e, _)), Ie(e) && l.set(e, k), k;
}
function Bs(t, e, n, s = !1) {
  const { mixins: o, extends: l } = e;
  l && Bs(t, l, n, !0), o && o.forEach(
    (_) => Bs(t, _, n, !0)
  );
  for (const _ in e)
    if (!(s && _ === "expose")) {
      const v = Yd[_] || n && n[_];
      t[_] = v ? v(t[_], e[_]) : e[_];
    }
  return t;
}
const Yd = {
  data: Ju,
  props: tl,
  emits: tl,
  // objects
  methods: zr,
  computed: zr,
  // lifecycle
  beforeCreate: Je,
  created: Je,
  beforeMount: Je,
  mounted: Je,
  beforeUpdate: Je,
  updated: Je,
  beforeDestroy: Je,
  beforeUnmount: Je,
  destroyed: Je,
  unmounted: Je,
  activated: Je,
  deactivated: Je,
  errorCaptured: Je,
  serverPrefetch: Je,
  // assets
  components: zr,
  directives: zr,
  // watch
  watch: Xd,
  // provide / inject
  provide: Ju,
  inject: $d
};
function Ju(t, e) {
  return e ? t ? function() {
    return ni(
      Yt(t) ? t.call(this, this) : t,
      Yt(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function $d(t, e) {
  return zr(ho(t), ho(e));
}
function ho(t) {
  if (Wt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Je(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function zr(t, e) {
  return t ? ni(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function tl(t, e) {
  return t ? Wt(t) && Wt(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : ni(
    /* @__PURE__ */ Object.create(null),
    Xu(t),
    Xu(e ?? {})
  ) : e;
}
function Xd(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = ni(/* @__PURE__ */ Object.create(null), t);
  for (const s in e)
    n[s] = Je(t[s], e[s]);
  return n;
}
function Sh() {
  return {
    app: null,
    config: {
      isNativeTag: Dc,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Qd = 0;
function Jd(t, e) {
  return function(s, o = null) {
    Yt(s) || (s = ni({}, s)), o != null && !Ie(o) && (o = null);
    const l = Sh(), _ = /* @__PURE__ */ new WeakSet(), v = [];
    let k = !1;
    const N = l.app = {
      _uid: Qd++,
      _component: s,
      _props: o,
      _container: null,
      _context: l,
      _instance: null,
      version: Fp,
      get config() {
        return l.config;
      },
      set config(z) {
      },
      use(z, ...q) {
        return _.has(z) || (z && Yt(z.install) ? (_.add(z), z.install(N, ...q)) : Yt(z) && (_.add(z), z(N, ...q))), N;
      },
      mixin(z) {
        return l.mixins.includes(z) || l.mixins.push(z), N;
      },
      component(z, q) {
        return q ? (l.components[z] = q, N) : l.components[z];
      },
      directive(z, q) {
        return q ? (l.directives[z] = q, N) : l.directives[z];
      },
      mount(z, q, tt) {
        if (!k) {
          const F = N._ceVNode || _i(s, o);
          return F.appContext = l, tt === !0 ? tt = "svg" : tt === !1 && (tt = void 0), t(F, z, tt), k = !0, N._container = z, z.__vue_app__ = N, sa(F.component);
        }
      },
      onUnmount(z) {
        v.push(z);
      },
      unmount() {
        k && (Zi(
          v,
          N._instance,
          16
        ), t(null, N._container), delete N._container.__vue_app__);
      },
      provide(z, q) {
        return l.provides[z] = q, N;
      },
      runWithContext(z) {
        const q = Zn;
        Zn = N;
        try {
          return z();
        } finally {
          Zn = q;
        }
      }
    };
    return N;
  };
}
let Zn = null;
function tp(t, e) {
  if ($e) {
    let n = $e.provides;
    const s = $e.parent && $e.parent.provides;
    s === n && (n = $e.provides = Object.create(s)), n[t] = e;
  }
}
function Hr(t, e, n = !1) {
  const s = $e || pi;
  if (s || Zn) {
    const o = Zn ? Zn._context.provides : s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (o && t in o)
      return o[t];
    if (arguments.length > 1)
      return n && Yt(e) ? e.call(s && s.proxy) : e;
  }
}
function ep() {
  return !!($e || pi || Zn);
}
const Ch = {}, Ih = () => Object.create(Ch), kh = (t) => Object.getPrototypeOf(t) === Ch;
function ip(t, e, n, s = !1) {
  const o = {}, l = Ih();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), Ph(t, e, o, l);
  for (const _ in t.propsOptions[0])
    _ in o || (o[_] = void 0);
  n ? t.props = s ? o : gd(o) : t.type.props ? t.props = o : t.props = l, t.attrs = l;
}
function np(t, e, n, s) {
  const {
    props: o,
    attrs: l,
    vnode: { patchFlag: _ }
  } = t, v = ee(o), [k] = t.propsOptions;
  let N = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || _ > 0) && !(_ & 16)
  ) {
    if (_ & 8) {
      const z = t.vnode.dynamicProps;
      for (let q = 0; q < z.length; q++) {
        let tt = z[q];
        if (na(t.emitsOptions, tt))
          continue;
        const F = e[tt];
        if (k)
          if (pe(l, tt))
            F !== l[tt] && (l[tt] = F, N = !0);
          else {
            const mt = In(tt);
            o[mt] = fo(
              k,
              v,
              mt,
              F,
              t,
              !1
            );
          }
        else
          F !== l[tt] && (l[tt] = F, N = !0);
      }
    }
  } else {
    Ph(t, e, o, l) && (N = !0);
    let z;
    for (const q in v)
      (!e || // for camelCase
      !pe(e, q) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((z = tr(q)) === q || !pe(e, z))) && (k ? n && // for camelCase
      (n[q] !== void 0 || // for kebab-case
      n[z] !== void 0) && (o[q] = fo(
        k,
        v,
        q,
        void 0,
        t,
        !0
      )) : delete o[q]);
    if (l !== v)
      for (const q in l)
        (!e || !pe(e, q)) && (delete l[q], N = !0);
  }
  N && tn(t.attrs, "set", "");
}
function Ph(t, e, n, s) {
  const [o, l] = t.propsOptions;
  let _ = !1, v;
  if (e)
    for (let k in e) {
      if (Vr(k))
        continue;
      const N = e[k];
      let z;
      o && pe(o, z = In(k)) ? !l || !l.includes(z) ? n[z] = N : (v || (v = {}))[z] = N : na(t.emitsOptions, k) || (!(k in s) || N !== s[k]) && (s[k] = N, _ = !0);
    }
  if (l) {
    const k = ee(n), N = v || ve;
    for (let z = 0; z < l.length; z++) {
      const q = l[z];
      n[q] = fo(
        o,
        k,
        q,
        N[q],
        t,
        !pe(N, q)
      );
    }
  }
  return _;
}
function fo(t, e, n, s, o, l) {
  const _ = t[n];
  if (_ != null) {
    const v = pe(_, "default");
    if (v && s === void 0) {
      const k = _.default;
      if (_.type !== Function && !_.skipFactory && Yt(k)) {
        const { propsDefaults: N } = o;
        if (n in N)
          s = N[n];
        else {
          const z = ss(o);
          s = N[n] = k.call(
            null,
            e
          ), z();
        }
      } else
        s = k;
      o.ce && o.ce._setProp(n, s);
    }
    _[
      0
      /* shouldCast */
    ] && (l && !v ? s = !1 : _[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === tr(n)) && (s = !0));
  }
  return s;
}
const rp = /* @__PURE__ */ new WeakMap();
function Ah(t, e, n = !1) {
  const s = n ? rp : e.propsCache, o = s.get(t);
  if (o)
    return o;
  const l = t.props, _ = {}, v = [];
  let k = !1;
  if (!Yt(t)) {
    const z = (q) => {
      k = !0;
      const [tt, F] = Ah(q, e, !0);
      ni(_, tt), F && v.push(...F);
    };
    !n && e.mixins.length && e.mixins.forEach(z), t.extends && z(t.extends), t.mixins && t.mixins.forEach(z);
  }
  if (!l && !k)
    return Ie(t) && s.set(t, mr), mr;
  if (Wt(l))
    for (let z = 0; z < l.length; z++) {
      const q = In(l[z]);
      el(q) && (_[q] = ve);
    }
  else if (l)
    for (const z in l) {
      const q = In(z);
      if (el(q)) {
        const tt = l[z], F = _[q] = Wt(tt) || Yt(tt) ? { type: tt } : ni({}, tt), mt = F.type;
        let X = !1, It = !0;
        if (Wt(mt))
          for (let ut = 0; ut < mt.length; ++ut) {
            const Xt = mt[ut], Pt = Yt(Xt) && Xt.name;
            if (Pt === "Boolean") {
              X = !0;
              break;
            } else Pt === "String" && (It = !1);
          }
        else
          X = Yt(mt) && mt.name === "Boolean";
        F[
          0
          /* shouldCast */
        ] = X, F[
          1
          /* shouldCastTrue */
        ] = It, (X || pe(F, "default")) && v.push(q);
      }
    }
  const N = [_, v];
  return Ie(t) && s.set(t, N), N;
}
function el(t) {
  return t[0] !== "$" && !Vr(t);
}
const Th = (t) => t[0] === "_" || t === "$stable", Yo = (t) => Wt(t) ? t.map(Wi) : [Wi(t)], sp = (t, e, n) => {
  if (e._n)
    return e;
  const s = Ed((...o) => Yo(e(...o)), n);
  return s._c = !1, s;
}, Eh = (t, e, n) => {
  const s = t._ctx;
  for (const o in t) {
    if (Th(o)) continue;
    const l = t[o];
    if (Yt(l))
      e[o] = sp(o, l, s);
    else if (l != null) {
      const _ = Yo(l);
      e[o] = () => _;
    }
  }
}, Oh = (t, e) => {
  const n = Yo(e);
  t.slots.default = () => n;
}, Mh = (t, e, n) => {
  for (const s in e)
    (n || s !== "_") && (t[s] = e[s]);
}, ap = (t, e, n) => {
  const s = t.slots = Ih();
  if (t.vnode.shapeFlag & 32) {
    const o = e._;
    o ? (Mh(s, e, n), n && ql(s, "_", o, !0)) : Eh(e, s);
  } else e && Oh(t, e);
}, op = (t, e, n) => {
  const { vnode: s, slots: o } = t;
  let l = !0, _ = ve;
  if (s.shapeFlag & 32) {
    const v = e._;
    v ? n && v === 1 ? l = !1 : Mh(o, e, n) : (l = !e.$stable, Eh(e, o)), _ = e;
  } else e && (Oh(t, e), _ = { default: 1 });
  if (l)
    for (const v in o)
      !Th(v) && _[v] == null && delete o[v];
}, ci = xp;
function up(t) {
  return lp(t);
}
function lp(t, e) {
  const n = Qs();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: o,
    patchProp: l,
    createElement: _,
    createText: v,
    createComment: k,
    setText: N,
    setElementText: z,
    parentNode: q,
    nextSibling: tt,
    setScopeId: F = Gi,
    insertStaticContent: mt
  } = t, X = (W, K, it, ct = null, lt = null, ft = null, wt = void 0, bt = null, vt = !!K.dynamicChildren) => {
    if (W === K)
      return;
    W && !Rr(W, K) && (ct = cn(W), bi(W, lt, ft, !0), W = null), K.patchFlag === -2 && (vt = !1, K.dynamicChildren = null);
    const { type: st, ref: Ot, shapeFlag: pt } = K;
    switch (st) {
      case ra:
        It(W, K, it, ct);
        break;
      case $n:
        ut(W, K, it, ct);
        break;
      case Ha:
        W == null && Xt(K, it, ct, wt);
        break;
      case di:
        Fe(
          W,
          K,
          it,
          ct,
          lt,
          ft,
          wt,
          bt,
          vt
        );
        break;
      default:
        pt & 1 ? Bt(
          W,
          K,
          it,
          ct,
          lt,
          ft,
          wt,
          bt,
          vt
        ) : pt & 6 ? Oe(
          W,
          K,
          it,
          ct,
          lt,
          ft,
          wt,
          bt,
          vt
        ) : (pt & 64 || pt & 128) && st.process(
          W,
          K,
          it,
          ct,
          lt,
          ft,
          wt,
          bt,
          vt,
          xe
        );
    }
    Ot != null && lt && Vs(Ot, W && W.ref, ft, K || W, !K);
  }, It = (W, K, it, ct) => {
    if (W == null)
      s(
        K.el = v(K.children),
        it,
        ct
      );
    else {
      const lt = K.el = W.el;
      K.children !== W.children && N(lt, K.children);
    }
  }, ut = (W, K, it, ct) => {
    W == null ? s(
      K.el = k(K.children || ""),
      it,
      ct
    ) : K.el = W.el;
  }, Xt = (W, K, it, ct) => {
    [W.el, W.anchor] = mt(
      W.children,
      K,
      it,
      ct,
      W.el,
      W.anchor
    );
  }, Pt = ({ el: W, anchor: K }, it, ct) => {
    let lt;
    for (; W && W !== K; )
      lt = tt(W), s(W, it, ct), W = lt;
    s(K, it, ct);
  }, xt = ({ el: W, anchor: K }) => {
    let it;
    for (; W && W !== K; )
      it = tt(W), o(W), W = it;
    o(K);
  }, Bt = (W, K, it, ct, lt, ft, wt, bt, vt) => {
    K.type === "svg" ? wt = "svg" : K.type === "math" && (wt = "mathml"), W == null ? ht(
      K,
      it,
      ct,
      lt,
      ft,
      wt,
      bt,
      vt
    ) : zt(
      W,
      K,
      lt,
      ft,
      wt,
      bt,
      vt
    );
  }, ht = (W, K, it, ct, lt, ft, wt, bt) => {
    let vt, st;
    const { props: Ot, shapeFlag: pt, transition: Et, dirs: gt } = W;
    if (vt = W.el = _(
      W.type,
      ft,
      Ot && Ot.is,
      Ot
    ), pt & 8 ? z(vt, W.children) : pt & 16 && Ft(
      W.children,
      vt,
      null,
      ct,
      lt,
      ja(W, ft),
      wt,
      bt
    ), gt && Bn(W, null, ct, "created"), At(vt, W, W.scopeId, wt, ct), Ot) {
      for (const r in Ot)
        r !== "value" && !Vr(r) && l(vt, r, null, Ot[r], ft, ct);
      "value" in Ot && l(vt, "value", null, Ot.value, ft), (st = Ot.onVnodeBeforeMount) && qi(st, ct, W);
    }
    gt && Bn(W, null, ct, "beforeMount");
    const i = hp(lt, Et);
    i && Et.beforeEnter(vt), s(vt, K, it), ((st = Ot && Ot.onVnodeMounted) || i || gt) && ci(() => {
      st && qi(st, ct, W), i && Et.enter(vt), gt && Bn(W, null, ct, "mounted");
    }, lt);
  }, At = (W, K, it, ct, lt) => {
    if (it && F(W, it), ct)
      for (let ft = 0; ft < ct.length; ft++)
        F(W, ct[ft]);
    if (lt) {
      let ft = lt.subTree;
      if (K === ft || Dh(ft.type) && (ft.ssContent === K || ft.ssFallback === K)) {
        const wt = lt.vnode;
        At(
          W,
          wt,
          wt.scopeId,
          wt.slotScopeIds,
          lt.parent
        );
      }
    }
  }, Ft = (W, K, it, ct, lt, ft, wt, bt, vt = 0) => {
    for (let st = vt; st < W.length; st++) {
      const Ot = W[st] = bt ? bn(W[st]) : Wi(W[st]);
      X(
        null,
        Ot,
        K,
        it,
        ct,
        lt,
        ft,
        wt,
        bt
      );
    }
  }, zt = (W, K, it, ct, lt, ft, wt) => {
    const bt = K.el = W.el;
    let { patchFlag: vt, dynamicChildren: st, dirs: Ot } = K;
    vt |= W.patchFlag & 16;
    const pt = W.props || ve, Et = K.props || ve;
    let gt;
    if (it && Un(it, !1), (gt = Et.onVnodeBeforeUpdate) && qi(gt, it, K, W), Ot && Bn(K, W, it, "beforeUpdate"), it && Un(it, !0), (pt.innerHTML && Et.innerHTML == null || pt.textContent && Et.textContent == null) && z(bt, ""), st ? me(
      W.dynamicChildren,
      st,
      bt,
      it,
      ct,
      ja(K, lt),
      ft
    ) : wt || ue(
      W,
      K,
      bt,
      null,
      it,
      ct,
      ja(K, lt),
      ft,
      !1
    ), vt > 0) {
      if (vt & 16)
        Te(bt, pt, Et, it, lt);
      else if (vt & 2 && pt.class !== Et.class && l(bt, "class", null, Et.class, lt), vt & 4 && l(bt, "style", pt.style, Et.style, lt), vt & 8) {
        const i = K.dynamicProps;
        for (let r = 0; r < i.length; r++) {
          const a = i[r], u = pt[a], h = Et[a];
          (h !== u || a === "value") && l(bt, a, u, h, lt, it);
        }
      }
      vt & 1 && W.children !== K.children && z(bt, K.children);
    } else !wt && st == null && Te(bt, pt, Et, it, lt);
    ((gt = Et.onVnodeUpdated) || Ot) && ci(() => {
      gt && qi(gt, it, K, W), Ot && Bn(K, W, it, "updated");
    }, ct);
  }, me = (W, K, it, ct, lt, ft, wt) => {
    for (let bt = 0; bt < K.length; bt++) {
      const vt = W[bt], st = K[bt], Ot = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        vt.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (vt.type === di || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Rr(vt, st) || // - In the case of a component, it could contain anything.
        vt.shapeFlag & 70) ? q(vt.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          it
        )
      );
      X(
        vt,
        st,
        Ot,
        null,
        ct,
        lt,
        ft,
        wt,
        !0
      );
    }
  }, Te = (W, K, it, ct, lt) => {
    if (K !== it) {
      if (K !== ve)
        for (const ft in K)
          !Vr(ft) && !(ft in it) && l(
            W,
            ft,
            K[ft],
            null,
            lt,
            ct
          );
      for (const ft in it) {
        if (Vr(ft)) continue;
        const wt = it[ft], bt = K[ft];
        wt !== bt && ft !== "value" && l(W, ft, bt, wt, lt, ct);
      }
      "value" in it && l(W, "value", K.value, it.value, lt);
    }
  }, Fe = (W, K, it, ct, lt, ft, wt, bt, vt) => {
    const st = K.el = W ? W.el : v(""), Ot = K.anchor = W ? W.anchor : v("");
    let { patchFlag: pt, dynamicChildren: Et, slotScopeIds: gt } = K;
    gt && (bt = bt ? bt.concat(gt) : gt), W == null ? (s(st, it, ct), s(Ot, it, ct), Ft(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      K.children || [],
      it,
      Ot,
      lt,
      ft,
      wt,
      bt,
      vt
    )) : pt > 0 && pt & 64 && Et && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    W.dynamicChildren ? (me(
      W.dynamicChildren,
      Et,
      it,
      lt,
      ft,
      wt,
      bt
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (K.key != null || lt && K === lt.subTree) && Lh(
      W,
      K,
      !0
      /* shallow */
    )) : ue(
      W,
      K,
      it,
      Ot,
      lt,
      ft,
      wt,
      bt,
      vt
    );
  }, Oe = (W, K, it, ct, lt, ft, wt, bt, vt) => {
    K.slotScopeIds = bt, W == null ? K.shapeFlag & 512 ? lt.ctx.activate(
      K,
      it,
      ct,
      wt,
      vt
    ) : Tt(
      K,
      it,
      ct,
      lt,
      ft,
      wt,
      vt
    ) : fn(W, K, vt);
  }, Tt = (W, K, it, ct, lt, ft, wt) => {
    const bt = W.component = Ep(
      W,
      ct,
      lt
    );
    if (yh(W) && (bt.ctx.renderer = xe), Op(bt, !1, wt), bt.asyncDep) {
      if (lt && lt.registerDep(bt, ot, wt), !W.el) {
        const vt = bt.subTree = _i($n);
        ut(null, vt, K, it);
      }
    } else
      ot(
        bt,
        W,
        K,
        it,
        lt,
        ft,
        wt
      );
  }, fn = (W, K, it) => {
    const ct = K.component = W.component;
    if (yp(W, K, it))
      if (ct.asyncDep && !ct.asyncResolved) {
        Ut(ct, K, it);
        return;
      } else
        ct.next = K, ct.update();
    else
      K.el = W.el, ct.vnode = K;
  }, ot = (W, K, it, ct, lt, ft, wt) => {
    const bt = () => {
      if (W.isMounted) {
        let { next: pt, bu: Et, u: gt, parent: i, vnode: r } = W;
        {
          const d = Nh(W);
          if (d) {
            pt && (pt.el = r.el, Ut(W, pt, wt)), d.asyncDep.then(() => {
              W.isUnmounted || bt();
            });
            return;
          }
        }
        let a = pt, u;
        Un(W, !1), pt ? (pt.el = r.el, Ut(W, pt, wt)) : pt = r, Et && Os(Et), (u = pt.props && pt.props.onVnodeBeforeUpdate) && qi(u, i, pt, r), Un(W, !0);
        const h = nl(W), f = W.subTree;
        W.subTree = h, X(
          f,
          h,
          // parent may have changed if it's in a teleport
          q(f.el),
          // anchor may have changed if it's in a fragment
          cn(f),
          W,
          lt,
          ft
        ), pt.el = h.el, a === null && bp(W, h.el), gt && ci(gt, lt), (u = pt.props && pt.props.onVnodeUpdated) && ci(
          () => qi(u, i, pt, r),
          lt
        );
      } else {
        let pt;
        const { el: Et, props: gt } = K, { bm: i, m: r, parent: a, root: u, type: h } = W, f = qr(K);
        Un(W, !1), i && Os(i), !f && (pt = gt && gt.onVnodeBeforeMount) && qi(pt, a, K), Un(W, !0);
        {
          u.ce && u.ce._injectChildStyle(h);
          const d = W.subTree = nl(W);
          X(
            null,
            d,
            it,
            ct,
            W,
            lt,
            ft
          ), K.el = d.el;
        }
        if (r && ci(r, lt), !f && (pt = gt && gt.onVnodeMounted)) {
          const d = K;
          ci(
            () => qi(pt, a, d),
            lt
          );
        }
        (K.shapeFlag & 256 || a && qr(a.vnode) && a.vnode.shapeFlag & 256) && W.a && ci(W.a, lt), W.isMounted = !0, K = it = ct = null;
      }
    };
    W.scope.on();
    const vt = W.effect = new Yl(bt);
    W.scope.off();
    const st = W.update = vt.run.bind(vt), Ot = W.job = vt.runIfDirty.bind(vt);
    Ot.i = W, Ot.id = W.uid, vt.scheduler = () => Wo(Ot), Un(W, !0), st();
  }, Ut = (W, K, it) => {
    K.component = W;
    const ct = W.vnode.props;
    W.vnode = K, W.next = null, np(W, K.props, ct, it), op(W, K.children, it), Tn(), $u(W), En();
  }, ue = (W, K, it, ct, lt, ft, wt, bt, vt = !1) => {
    const st = W && W.children, Ot = W ? W.shapeFlag : 0, pt = K.children, { patchFlag: Et, shapeFlag: gt } = K;
    if (Et > 0) {
      if (Et & 128) {
        Qe(
          st,
          pt,
          it,
          ct,
          lt,
          ft,
          wt,
          bt,
          vt
        );
        return;
      } else if (Et & 256) {
        Jt(
          st,
          pt,
          it,
          ct,
          lt,
          ft,
          wt,
          bt,
          vt
        );
        return;
      }
    }
    gt & 8 ? (Ot & 16 && Vi(st, lt, ft), pt !== st && z(it, pt)) : Ot & 16 ? gt & 16 ? Qe(
      st,
      pt,
      it,
      ct,
      lt,
      ft,
      wt,
      bt,
      vt
    ) : Vi(st, lt, ft, !0) : (Ot & 8 && z(it, ""), gt & 16 && Ft(
      pt,
      it,
      ct,
      lt,
      ft,
      wt,
      bt,
      vt
    ));
  }, Jt = (W, K, it, ct, lt, ft, wt, bt, vt) => {
    W = W || mr, K = K || mr;
    const st = W.length, Ot = K.length, pt = Math.min(st, Ot);
    let Et;
    for (Et = 0; Et < pt; Et++) {
      const gt = K[Et] = vt ? bn(K[Et]) : Wi(K[Et]);
      X(
        W[Et],
        gt,
        it,
        null,
        lt,
        ft,
        wt,
        bt,
        vt
      );
    }
    st > Ot ? Vi(
      W,
      lt,
      ft,
      !0,
      !1,
      pt
    ) : Ft(
      K,
      it,
      ct,
      lt,
      ft,
      wt,
      bt,
      vt,
      pt
    );
  }, Qe = (W, K, it, ct, lt, ft, wt, bt, vt) => {
    let st = 0;
    const Ot = K.length;
    let pt = W.length - 1, Et = Ot - 1;
    for (; st <= pt && st <= Et; ) {
      const gt = W[st], i = K[st] = vt ? bn(K[st]) : Wi(K[st]);
      if (Rr(gt, i))
        X(
          gt,
          i,
          it,
          null,
          lt,
          ft,
          wt,
          bt,
          vt
        );
      else
        break;
      st++;
    }
    for (; st <= pt && st <= Et; ) {
      const gt = W[pt], i = K[Et] = vt ? bn(K[Et]) : Wi(K[Et]);
      if (Rr(gt, i))
        X(
          gt,
          i,
          it,
          null,
          lt,
          ft,
          wt,
          bt,
          vt
        );
      else
        break;
      pt--, Et--;
    }
    if (st > pt) {
      if (st <= Et) {
        const gt = Et + 1, i = gt < Ot ? K[gt].el : ct;
        for (; st <= Et; )
          X(
            null,
            K[st] = vt ? bn(K[st]) : Wi(K[st]),
            it,
            i,
            lt,
            ft,
            wt,
            bt,
            vt
          ), st++;
      }
    } else if (st > Et)
      for (; st <= pt; )
        bi(W[st], lt, ft, !0), st++;
    else {
      const gt = st, i = st, r = /* @__PURE__ */ new Map();
      for (st = i; st <= Et; st++) {
        const g = K[st] = vt ? bn(K[st]) : Wi(K[st]);
        g.key != null && r.set(g.key, st);
      }
      let a, u = 0;
      const h = Et - i + 1;
      let f = !1, d = 0;
      const c = new Array(h);
      for (st = 0; st < h; st++) c[st] = 0;
      for (st = gt; st <= pt; st++) {
        const g = W[st];
        if (u >= h) {
          bi(g, lt, ft, !0);
          continue;
        }
        let b;
        if (g.key != null)
          b = r.get(g.key);
        else
          for (a = i; a <= Et; a++)
            if (c[a - i] === 0 && Rr(g, K[a])) {
              b = a;
              break;
            }
        b === void 0 ? bi(g, lt, ft, !0) : (c[b - i] = st + 1, b >= d ? d = b : f = !0, X(
          g,
          K[b],
          it,
          null,
          lt,
          ft,
          wt,
          bt,
          vt
        ), u++);
      }
      const p = f ? fp(c) : mr;
      for (a = p.length - 1, st = h - 1; st >= 0; st--) {
        const g = i + st, b = K[g], S = g + 1 < Ot ? K[g + 1].el : ct;
        c[st] === 0 ? X(
          null,
          b,
          it,
          S,
          lt,
          ft,
          wt,
          bt,
          vt
        ) : f && (a < 0 || st !== p[a] ? Di(b, it, S, 2) : a--);
      }
    }
  }, Di = (W, K, it, ct, lt = null) => {
    const { el: ft, type: wt, transition: bt, children: vt, shapeFlag: st } = W;
    if (st & 6) {
      Di(W.component.subTree, K, it, ct);
      return;
    }
    if (st & 128) {
      W.suspense.move(K, it, ct);
      return;
    }
    if (st & 64) {
      wt.move(W, K, it, xe);
      return;
    }
    if (wt === di) {
      s(ft, K, it);
      for (let pt = 0; pt < vt.length; pt++)
        Di(vt[pt], K, it, ct);
      s(W.anchor, K, it);
      return;
    }
    if (wt === Ha) {
      Pt(W, K, it);
      return;
    }
    if (ct !== 2 && st & 1 && bt)
      if (ct === 0)
        bt.beforeEnter(ft), s(ft, K, it), ci(() => bt.enter(ft), lt);
      else {
        const { leave: pt, delayLeave: Et, afterLeave: gt } = bt, i = () => s(ft, K, it), r = () => {
          pt(ft, () => {
            i(), gt && gt();
          });
        };
        Et ? Et(ft, i, r) : r();
      }
    else
      s(ft, K, it);
  }, bi = (W, K, it, ct = !1, lt = !1) => {
    const {
      type: ft,
      props: wt,
      ref: bt,
      children: vt,
      dynamicChildren: st,
      shapeFlag: Ot,
      patchFlag: pt,
      dirs: Et,
      cacheIndex: gt
    } = W;
    if (pt === -2 && (lt = !1), bt != null && Vs(bt, null, it, W, !0), gt != null && (K.renderCache[gt] = void 0), Ot & 256) {
      K.ctx.deactivate(W);
      return;
    }
    const i = Ot & 1 && Et, r = !qr(W);
    let a;
    if (r && (a = wt && wt.onVnodeBeforeUnmount) && qi(a, K, W), Ot & 6)
      Me(W.component, it, ct);
    else {
      if (Ot & 128) {
        W.suspense.unmount(it, ct);
        return;
      }
      i && Bn(W, null, K, "beforeUnmount"), Ot & 64 ? W.type.remove(
        W,
        K,
        it,
        xe,
        ct
      ) : st && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !st.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ft !== di || pt > 0 && pt & 64) ? Vi(
        st,
        K,
        it,
        !1,
        !0
      ) : (ft === di && pt & 384 || !lt && Ot & 16) && Vi(vt, K, it), ct && Mn(W);
    }
    (r && (a = wt && wt.onVnodeUnmounted) || i) && ci(() => {
      a && qi(a, K, W), i && Bn(W, null, K, "unmounted");
    }, it);
  }, Mn = (W) => {
    const { type: K, el: it, anchor: ct, transition: lt } = W;
    if (K === di) {
      ya(it, ct);
      return;
    }
    if (K === Ha) {
      xt(W);
      return;
    }
    const ft = () => {
      o(it), lt && !lt.persisted && lt.afterLeave && lt.afterLeave();
    };
    if (W.shapeFlag & 1 && lt && !lt.persisted) {
      const { leave: wt, delayLeave: bt } = lt, vt = () => wt(it, ft);
      bt ? bt(W.el, ft, vt) : vt();
    } else
      ft();
  }, ya = (W, K) => {
    let it;
    for (; W !== K; )
      it = tt(W), o(W), W = it;
    o(K);
  }, Me = (W, K, it) => {
    const { bum: ct, scope: lt, job: ft, subTree: wt, um: bt, m: vt, a: st } = W;
    il(vt), il(st), ct && Os(ct), lt.stop(), ft && (ft.flags |= 8, bi(wt, W, K, it)), bt && ci(bt, K), ci(() => {
      W.isUnmounted = !0;
    }, K), K && K.pendingBranch && !K.isUnmounted && W.asyncDep && !W.asyncResolved && W.suspenseId === K.pendingId && (K.deps--, K.deps === 0 && K.resolve());
  }, Vi = (W, K, it, ct = !1, lt = !1, ft = 0) => {
    for (let wt = ft; wt < W.length; wt++)
      bi(W[wt], K, it, ct, lt);
  }, cn = (W) => {
    if (W.shapeFlag & 6)
      return cn(W.component.subTree);
    if (W.shapeFlag & 128)
      return W.suspense.next();
    const K = tt(W.anchor || W.el), it = K && K[Od];
    return it ? tt(it) : K;
  };
  let Ln = !1;
  const Ce = (W, K, it) => {
    W == null ? K._vnode && bi(K._vnode, null, null, !0) : X(
      K._vnode || null,
      W,
      K,
      null,
      null,
      null,
      it
    ), K._vnode = W, Ln || (Ln = !0, $u(), gh(), Ln = !1);
  }, xe = {
    p: X,
    um: bi,
    m: Di,
    r: Mn,
    mt: Tt,
    mc: Ft,
    pc: ue,
    pbc: me,
    n: cn,
    o: t
  };
  return {
    render: Ce,
    hydrate: void 0,
    createApp: Jd(Ce)
  };
}
function ja({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Un({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function hp(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function Lh(t, e, n = !1) {
  const s = t.children, o = e.children;
  if (Wt(s) && Wt(o))
    for (let l = 0; l < s.length; l++) {
      const _ = s[l];
      let v = o[l];
      v.shapeFlag & 1 && !v.dynamicChildren && ((v.patchFlag <= 0 || v.patchFlag === 32) && (v = o[l] = bn(o[l]), v.el = _.el), !n && v.patchFlag !== -2 && Lh(_, v)), v.type === ra && (v.el = _.el);
    }
}
function fp(t) {
  const e = t.slice(), n = [0];
  let s, o, l, _, v;
  const k = t.length;
  for (s = 0; s < k; s++) {
    const N = t[s];
    if (N !== 0) {
      if (o = n[n.length - 1], t[o] < N) {
        e[s] = o, n.push(s);
        continue;
      }
      for (l = 0, _ = n.length - 1; l < _; )
        v = l + _ >> 1, t[n[v]] < N ? l = v + 1 : _ = v;
      N < t[n[l]] && (l > 0 && (e[s] = n[l - 1]), n[l] = s);
    }
  }
  for (l = n.length, _ = n[l - 1]; l-- > 0; )
    n[l] = _, _ = e[_];
  return n;
}
function Nh(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : Nh(e);
}
function il(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const cp = Symbol.for("v-scx"), dp = () => Hr(cp);
function Sn(t, e, n) {
  return Rh(t, e, n);
}
function Rh(t, e, n = ve) {
  const { immediate: s, deep: o, flush: l, once: _ } = n, v = ni({}, n), k = e && s || !e && l !== "post";
  let N;
  if (Qr) {
    if (l === "sync") {
      const F = dp();
      N = F.__watcherHandles || (F.__watcherHandles = []);
    } else if (!k) {
      const F = () => {
      };
      return F.stop = Gi, F.resume = Gi, F.pause = Gi, F;
    }
  }
  const z = $e;
  v.call = (F, mt, X) => Zi(F, z, mt, X);
  let q = !1;
  l === "post" ? v.scheduler = (F) => {
    ci(F, z && z.suspense);
  } : l !== "sync" && (q = !0, v.scheduler = (F, mt) => {
    mt ? F() : Wo(F);
  }), v.augmentJob = (F) => {
    e && (F.flags |= 4), q && (F.flags |= 2, z && (F.id = z.uid, F.i = z));
  };
  const tt = kd(t, e, v);
  return Qr && (N ? N.push(tt) : k && tt()), tt;
}
function pp(t, e, n) {
  const s = this.proxy, o = De(t) ? t.includes(".") ? Fh(s, t) : () => s[t] : t.bind(s, s);
  let l;
  Yt(e) ? l = e : (l = e.handler, n = e);
  const _ = ss(this), v = Rh(o, l.bind(s), n);
  return _(), v;
}
function Fh(t, e) {
  const n = e.split(".");
  return () => {
    let s = t;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
const gp = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${In(e)}Modifiers`] || t[`${tr(e)}Modifiers`];
function _p(t, e, ...n) {
  if (t.isUnmounted) return;
  const s = t.vnode.props || ve;
  let o = n;
  const l = e.startsWith("update:"), _ = l && gp(s, e.slice(7));
  _ && (_.trim && (o = n.map((z) => De(z) ? z.trim() : z)), _.number && (o = n.map(io)));
  let v, k = s[v = za(e)] || // also try camelCase event handler (#2249)
  s[v = za(In(e))];
  !k && l && (k = s[v = za(tr(e))]), k && Zi(
    k,
    t,
    6,
    o
  );
  const N = s[v + "Once"];
  if (N) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[v])
      return;
    t.emitted[v] = !0, Zi(
      N,
      t,
      6,
      o
    );
  }
}
function zh(t, e, n = !1) {
  const s = e.emitsCache, o = s.get(t);
  if (o !== void 0)
    return o;
  const l = t.emits;
  let _ = {}, v = !1;
  if (!Yt(t)) {
    const k = (N) => {
      const z = zh(N, e, !0);
      z && (v = !0, ni(_, z));
    };
    !n && e.mixins.length && e.mixins.forEach(k), t.extends && k(t.extends), t.mixins && t.mixins.forEach(k);
  }
  return !l && !v ? (Ie(t) && s.set(t, null), null) : (Wt(l) ? l.forEach((k) => _[k] = null) : ni(_, l), Ie(t) && s.set(t, _), _);
}
function na(t, e) {
  return !t || !Ys(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), pe(t, e[0].toLowerCase() + e.slice(1)) || pe(t, tr(e)) || pe(t, e));
}
function nl(t) {
  const {
    type: e,
    vnode: n,
    proxy: s,
    withProxy: o,
    propsOptions: [l],
    slots: _,
    attrs: v,
    emit: k,
    render: N,
    renderCache: z,
    props: q,
    data: tt,
    setupState: F,
    ctx: mt,
    inheritAttrs: X
  } = t, It = Ds(t);
  let ut, Xt;
  try {
    if (n.shapeFlag & 4) {
      const xt = o || s, Bt = xt;
      ut = Wi(
        N.call(
          Bt,
          xt,
          z,
          q,
          F,
          tt,
          mt
        )
      ), Xt = v;
    } else {
      const xt = e;
      ut = Wi(
        xt.length > 1 ? xt(
          q,
          { attrs: v, slots: _, emit: k }
        ) : xt(
          q,
          null
        )
      ), Xt = e.props ? v : mp(v);
    }
  } catch (xt) {
    Wr.length = 0, ea(xt, t, 1), ut = _i($n);
  }
  let Pt = ut;
  if (Xt && X !== !1) {
    const xt = Object.keys(Xt), { shapeFlag: Bt } = Pt;
    xt.length && Bt & 7 && (l && xt.some(Mo) && (Xt = vp(
      Xt,
      l
    )), Pt = xr(Pt, Xt, !1, !0));
  }
  return n.dirs && (Pt = xr(Pt, null, !1, !0), Pt.dirs = Pt.dirs ? Pt.dirs.concat(n.dirs) : n.dirs), n.transition && Go(Pt, n.transition), ut = Pt, Ds(It), ut;
}
const mp = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || Ys(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, vp = (t, e) => {
  const n = {};
  for (const s in t)
    (!Mo(s) || !(s.slice(9) in e)) && (n[s] = t[s]);
  return n;
};
function yp(t, e, n) {
  const { props: s, children: o, component: l } = t, { props: _, children: v, patchFlag: k } = e, N = l.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && k >= 0) {
    if (k & 1024)
      return !0;
    if (k & 16)
      return s ? rl(s, _, N) : !!_;
    if (k & 8) {
      const z = e.dynamicProps;
      for (let q = 0; q < z.length; q++) {
        const tt = z[q];
        if (_[tt] !== s[tt] && !na(N, tt))
          return !0;
      }
    }
  } else
    return (o || v) && (!v || !v.$stable) ? !0 : s === _ ? !1 : s ? _ ? rl(s, _, N) : !0 : !!_;
  return !1;
}
function rl(t, e, n) {
  const s = Object.keys(e);
  if (s.length !== Object.keys(t).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const l = s[o];
    if (e[l] !== t[l] && !na(n, l))
      return !0;
  }
  return !1;
}
function bp({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const s = e.subTree;
    if (s.suspense && s.suspense.activeBranch === t && (s.el = t.el), s === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const Dh = (t) => t.__isSuspense;
function xp(t, e) {
  e && e.pendingBranch ? Wt(t) ? e.effects.push(...t) : e.effects.push(t) : Td(t);
}
const di = Symbol.for("v-fgt"), ra = Symbol.for("v-txt"), $n = Symbol.for("v-cmt"), Ha = Symbol.for("v-stc"), Wr = [];
let gi = null;
function rn(t = !1) {
  Wr.push(gi = t ? null : []);
}
function wp() {
  Wr.pop(), gi = Wr[Wr.length - 1] || null;
}
let Xr = 1;
function sl(t, e = !1) {
  Xr += t, t < 0 && gi && e && (gi.hasOnce = !0);
}
function Vh(t) {
  return t.dynamicChildren = Xr > 0 ? gi || mr : null, wp(), Xr > 0 && gi && gi.push(t), t;
}
function Cn(t, e, n, s, o, l) {
  return Vh(
    Kt(
      t,
      e,
      n,
      s,
      o,
      l,
      !0
    )
  );
}
function Sp(t, e, n, s, o) {
  return Vh(
    _i(
      t,
      e,
      n,
      s,
      o,
      !0
    )
  );
}
function Bh(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Rr(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Uh = ({ key: t }) => t ?? null, Ms = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? De(t) || ye(t) || Yt(t) ? { i: pi, r: t, k: e, f: !!n } : t : null);
function Kt(t, e = null, n = null, s = 0, o = null, l = t === di ? 0 : 1, _ = !1, v = !1) {
  const k = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Uh(e),
    ref: e && Ms(e),
    scopeId: mh,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: l,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: pi
  };
  return v ? ($o(k, n), l & 128 && t.normalize(k)) : n && (k.shapeFlag |= De(n) ? 8 : 16), Xr > 0 && // avoid a block node from tracking itself
  !_ && // has current parent block
  gi && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (k.patchFlag > 0 || l & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  k.patchFlag !== 32 && gi.push(k), k;
}
const _i = Cp;
function Cp(t, e = null, n = null, s = 0, o = null, l = !1) {
  if ((!t || t === Hd) && (t = $n), Bh(t)) {
    const v = xr(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && $o(v, n), Xr > 0 && !l && gi && (v.shapeFlag & 6 ? gi[gi.indexOf(t)] = v : gi.push(v)), v.patchFlag = -2, v;
  }
  if (Rp(t) && (t = t.__vccOpts), e) {
    e = Ip(e);
    let { class: v, style: k } = e;
    v && !De(v) && (e.class = Fo(v)), Ie(k) && (jo(k) && !Wt(k) && (k = ni({}, k)), e.style = Ro(k));
  }
  const _ = De(t) ? 1 : Dh(t) ? 128 : Md(t) ? 64 : Ie(t) ? 4 : Yt(t) ? 2 : 0;
  return Kt(
    t,
    e,
    n,
    s,
    o,
    _,
    l,
    !0
  );
}
function Ip(t) {
  return t ? jo(t) || kh(t) ? ni({}, t) : t : null;
}
function xr(t, e, n = !1, s = !1) {
  const { props: o, ref: l, patchFlag: _, children: v, transition: k } = t, N = e ? Pp(o || {}, e) : o, z = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: N,
    key: N && Uh(N),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && l ? Wt(l) ? l.concat(Ms(e)) : [l, Ms(e)] : Ms(e)
    ) : l,
    scopeId: t.scopeId,
    slotScopeIds: t.slotScopeIds,
    children: v,
    target: t.target,
    targetStart: t.targetStart,
    targetAnchor: t.targetAnchor,
    staticCount: t.staticCount,
    shapeFlag: t.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: e && t.type !== di ? _ === -1 ? 16 : _ | 16 : _,
    dynamicProps: t.dynamicProps,
    dynamicChildren: t.dynamicChildren,
    appContext: t.appContext,
    dirs: t.dirs,
    transition: k,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: t.component,
    suspense: t.suspense,
    ssContent: t.ssContent && xr(t.ssContent),
    ssFallback: t.ssFallback && xr(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return k && s && Go(
    z,
    k.clone(z)
  ), z;
}
function Ji(t = " ", e = 0) {
  return _i(ra, null, t, e);
}
function kp(t = "", e = !1) {
  return e ? (rn(), Sp($n, null, t)) : _i($n, null, t);
}
function Wi(t) {
  return t == null || typeof t == "boolean" ? _i($n) : Wt(t) ? _i(
    di,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : Bh(t) ? bn(t) : _i(ra, null, String(t));
}
function bn(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : xr(t);
}
function $o(t, e) {
  let n = 0;
  const { shapeFlag: s } = t;
  if (e == null)
    e = null;
  else if (Wt(e))
    n = 16;
  else if (typeof e == "object")
    if (s & 65) {
      const o = e.default;
      o && (o._c && (o._d = !1), $o(t, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = e._;
      !o && !kh(e) ? e._ctx = pi : o === 3 && pi && (pi.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else Yt(e) ? (e = { default: e, _ctx: pi }, n = 32) : (e = String(e), s & 64 ? (n = 16, e = [Ji(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function Pp(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    for (const o in s)
      if (o === "class")
        e.class !== s.class && (e.class = Fo([e.class, s.class]));
      else if (o === "style")
        e.style = Ro([e.style, s.style]);
      else if (Ys(o)) {
        const l = e[o], _ = s[o];
        _ && l !== _ && !(Wt(l) && l.includes(_)) && (e[o] = l ? [].concat(l, _) : _);
      } else o !== "" && (e[o] = s[o]);
  }
  return e;
}
function qi(t, e, n, s = null) {
  Zi(t, e, 7, [
    n,
    s
  ]);
}
const Ap = Sh();
let Tp = 0;
function Ep(t, e, n) {
  const s = t.type, o = (e ? e.appContext : t.appContext) || Ap, l = {
    uid: Tp++,
    vnode: t,
    type: s,
    parent: e,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Gl(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: e ? e.provides : Object.create(o.provides),
    ids: e ? e.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ah(s, o),
    emitsOptions: zh(s, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ve,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ve,
    data: ve,
    props: ve,
    attrs: ve,
    slots: ve,
    refs: ve,
    setupState: ve,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return l.ctx = { _: l }, l.root = e ? e.root : l, l.emit = _p.bind(null, l), t.ce && t.ce(l), l;
}
let $e = null, Us, co;
{
  const t = Qs(), e = (n, s) => {
    let o;
    return (o = t[n]) || (o = t[n] = []), o.push(s), (l) => {
      o.length > 1 ? o.forEach((_) => _(l)) : o[0](l);
    };
  };
  Us = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => $e = n
  ), co = e(
    "__VUE_SSR_SETTERS__",
    (n) => Qr = n
  );
}
const ss = (t) => {
  const e = $e;
  return Us(t), t.scope.on(), () => {
    t.scope.off(), Us(e);
  };
}, al = () => {
  $e && $e.scope.off(), Us(null);
};
function qh(t) {
  return t.vnode.shapeFlag & 4;
}
let Qr = !1;
function Op(t, e = !1, n = !1) {
  e && co(e);
  const { props: s, children: o } = t.vnode, l = qh(t);
  ip(t, s, l, e), ap(t, o, n);
  const _ = l ? Mp(t, e) : void 0;
  return e && co(!1), _;
}
function Mp(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, Gd);
  const { setup: s } = n;
  if (s) {
    Tn();
    const o = t.setupContext = s.length > 1 ? Np(t) : null, l = ss(t), _ = rs(
      s,
      t,
      0,
      [
        t.props,
        o
      ]
    ), v = Dl(_);
    if (En(), l(), (v || t.sp) && !qr(t) && vh(t), v) {
      if (_.then(al, al), e)
        return _.then((k) => {
          ol(t, k);
        }).catch((k) => {
          ea(k, t, 0);
        });
      t.asyncDep = _;
    } else
      ol(t, _);
  } else
    jh(t);
}
function ol(t, e, n) {
  Yt(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Ie(e) && (t.setupState = hh(e)), jh(t);
}
function jh(t, e, n) {
  const s = t.type;
  t.render || (t.render = s.render || Gi);
  {
    const o = ss(t);
    Tn();
    try {
      Zd(t);
    } finally {
      En(), o();
    }
  }
}
const Lp = {
  get(t, e) {
    return Ke(t, "get", ""), t[e];
  }
};
function Np(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, Lp),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function sa(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(hh(Ho(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in jr)
        return jr[n](t);
    },
    has(e, n) {
      return n in e || n in jr;
    }
  })) : t.proxy;
}
function Rp(t) {
  return Yt(t) && "__vccOpts" in t;
}
const br = (t, e) => Cd(t, e, Qr), Fp = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let po;
const ul = typeof window < "u" && window.trustedTypes;
if (ul)
  try {
    po = /* @__PURE__ */ ul.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const Hh = po ? (t) => po.createHTML(t) : (t) => t, zp = "http://www.w3.org/2000/svg", Dp = "http://www.w3.org/1998/Math/MathML", Qi = typeof document < "u" ? document : null, ll = Qi && /* @__PURE__ */ Qi.createElement("template"), Vp = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, s) => {
    const o = e === "svg" ? Qi.createElementNS(zp, t) : e === "mathml" ? Qi.createElementNS(Dp, t) : n ? Qi.createElement(t, { is: n }) : Qi.createElement(t);
    return t === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (t) => Qi.createTextNode(t),
  createComment: (t) => Qi.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => Qi.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, s, o, l) {
    const _ = n ? n.previousSibling : e.lastChild;
    if (o && (o === l || o.nextSibling))
      for (; e.insertBefore(o.cloneNode(!0), n), !(o === l || !(o = o.nextSibling)); )
        ;
    else {
      ll.innerHTML = Hh(
        s === "svg" ? `<svg>${t}</svg>` : s === "mathml" ? `<math>${t}</math>` : t
      );
      const v = ll.content;
      if (s === "svg" || s === "mathml") {
        const k = v.firstChild;
        for (; k.firstChild; )
          v.appendChild(k.firstChild);
        v.removeChild(k);
      }
      e.insertBefore(v, n);
    }
    return [
      // first
      _ ? _.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
}, Bp = Symbol("_vtc");
function Up(t, e, n) {
  const s = t[Bp];
  s && (e = (e ? [e, ...s] : [...s]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const hl = Symbol("_vod"), qp = Symbol("_vsh"), jp = Symbol(""), Hp = /(^|;)\s*display\s*:/;
function Wp(t, e, n) {
  const s = t.style, o = De(n);
  let l = !1;
  if (n && !o) {
    if (e)
      if (De(e))
        for (const _ of e.split(";")) {
          const v = _.slice(0, _.indexOf(":")).trim();
          n[v] == null && Ls(s, v, "");
        }
      else
        for (const _ in e)
          n[_] == null && Ls(s, _, "");
    for (const _ in n)
      _ === "display" && (l = !0), Ls(s, _, n[_]);
  } else if (o) {
    if (e !== n) {
      const _ = s[jp];
      _ && (n += ";" + _), s.cssText = n, l = Hp.test(n);
    }
  } else e && t.removeAttribute("style");
  hl in t && (t[hl] = l ? s.display : "", t[qp] && (s.display = "none"));
}
const fl = /\s*!important$/;
function Ls(t, e, n) {
  if (Wt(n))
    n.forEach((s) => Ls(t, e, s));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const s = Gp(t, e);
    fl.test(n) ? t.setProperty(
      tr(s),
      n.replace(fl, ""),
      "important"
    ) : t[s] = n;
  }
}
const cl = ["Webkit", "Moz", "ms"], Wa = {};
function Gp(t, e) {
  const n = Wa[e];
  if (n)
    return n;
  let s = In(e);
  if (s !== "filter" && s in t)
    return Wa[e] = s;
  s = Ul(s);
  for (let o = 0; o < cl.length; o++) {
    const l = cl[o] + s;
    if (l in t)
      return Wa[e] = l;
  }
  return e;
}
const dl = "http://www.w3.org/1999/xlink";
function pl(t, e, n, s, o, l = Kc(e)) {
  s && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(dl, e.slice(6, e.length)) : t.setAttributeNS(dl, e, n) : n == null || l && !jl(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    l ? "" : An(n) ? String(n) : n
  );
}
function gl(t, e, n, s, o) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? Hh(n) : n);
    return;
  }
  const l = t.tagName;
  if (e === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    const v = l === "OPTION" ? t.getAttribute("value") || "" : t.value, k = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(n);
    (v !== k || !("_value" in t)) && (t.value = k), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let _ = !1;
  if (n === "" || n == null) {
    const v = typeof t[e];
    v === "boolean" ? n = jl(n) : n == null && v === "string" ? (n = "", _ = !0) : v === "number" && (n = 0, _ = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  _ && t.removeAttribute(o || e);
}
function pr(t, e, n, s) {
  t.addEventListener(e, n, s);
}
function Zp(t, e, n, s) {
  t.removeEventListener(e, n, s);
}
const _l = Symbol("_vei");
function Kp(t, e, n, s, o = null) {
  const l = t[_l] || (t[_l] = {}), _ = l[e];
  if (s && _)
    _.value = s;
  else {
    const [v, k] = Yp(e);
    if (s) {
      const N = l[e] = Qp(
        s,
        o
      );
      pr(t, v, N, k);
    } else _ && (Zp(t, v, _, k), l[e] = void 0);
  }
}
const ml = /(?:Once|Passive|Capture)$/;
function Yp(t) {
  let e;
  if (ml.test(t)) {
    e = {};
    let s;
    for (; s = t.match(ml); )
      t = t.slice(0, t.length - s[0].length), e[s[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : tr(t.slice(2)), e];
}
let Ga = 0;
const $p = /* @__PURE__ */ Promise.resolve(), Xp = () => Ga || ($p.then(() => Ga = 0), Ga = Date.now());
function Qp(t, e) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    Zi(
      Jp(s, n.value),
      e,
      5,
      [s]
    );
  };
  return n.value = t, n.attached = Xp(), n;
}
function Jp(t, e) {
  if (Wt(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (s) => (o) => !o._stopped && s && s(o)
    );
  } else
    return e;
}
const vl = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, t0 = (t, e, n, s, o, l) => {
  const _ = o === "svg";
  e === "class" ? Up(t, s, _) : e === "style" ? Wp(t, n, s) : Ys(e) ? Mo(e) || Kp(t, e, n, s, l) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : e0(t, e, s, _)) ? (gl(t, e, s), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && pl(t, e, s, _, l, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !De(s)) ? gl(t, In(e), s, l, e) : (e === "true-value" ? t._trueValue = s : e === "false-value" && (t._falseValue = s), pl(t, e, s, _));
};
function e0(t, e, n, s) {
  if (s)
    return !!(e === "innerHTML" || e === "textContent" || e in t && vl(e) && Yt(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const o = t.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return vl(e) && De(n) ? !1 : e in t;
}
const yl = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return Wt(e) ? (n) => Os(e, n) : e;
};
function i0(t) {
  t.target.composing = !0;
}
function bl(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const Za = Symbol("_assign"), lr = {
  created(t, { modifiers: { lazy: e, trim: n, number: s } }, o) {
    t[Za] = yl(o);
    const l = s || o.props && o.props.type === "number";
    pr(t, e ? "change" : "input", (_) => {
      if (_.target.composing) return;
      let v = t.value;
      n && (v = v.trim()), l && (v = io(v)), t[Za](v);
    }), n && pr(t, "change", () => {
      t.value = t.value.trim();
    }), e || (pr(t, "compositionstart", i0), pr(t, "compositionend", bl), pr(t, "change", bl));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: s, trim: o, number: l } }, _) {
    if (t[Za] = yl(_), t.composing) return;
    const v = (l || t.type === "number") && !/^0\d/.test(t.value) ? io(t.value) : t.value, k = e ?? "";
    v !== k && (document.activeElement === t && t.type !== "range" && (s && e === n || o && t.value.trim() === k) || (t.value = k));
  }
}, n0 = /* @__PURE__ */ ni({ patchProp: t0 }, Vp);
let xl;
function r0() {
  return xl || (xl = up(n0));
}
const s0 = (...t) => {
  const e = r0().createApp(...t), { mount: n } = e;
  return e.mount = (s) => {
    const o = o0(s);
    if (!o) return;
    const l = e._component;
    !Yt(l) && !l.render && !l.template && (l.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const _ = n(o, !1, a0(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), _;
  }, e;
};
function a0(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function o0(t) {
  return De(t) ? document.querySelector(t) : t;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Wh;
const aa = (t) => Wh = t, Gh = (
  /* istanbul ignore next */
  Symbol()
);
function go(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var Gr;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(Gr || (Gr = {}));
function u0() {
  const t = Zl(!0), e = t.run(() => He({}));
  let n = [], s = [];
  const o = Ho({
    install(l) {
      aa(o), o._a = l, l.provide(Gh, o), l.config.globalProperties.$pinia = o, s.forEach((_) => n.push(_)), s = [];
    },
    use(l) {
      return this._a ? n.push(l) : s.push(l), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: t,
    _s: /* @__PURE__ */ new Map(),
    state: e
  });
  return o;
}
const Zh = () => {
};
function wl(t, e, n, s = Zh) {
  t.push(e);
  const o = () => {
    const l = t.indexOf(e);
    l > -1 && (t.splice(l, 1), s());
  };
  return !n && Kl() && Yc(o), o;
}
function hr(t, ...e) {
  t.slice().forEach((n) => {
    n(...e);
  });
}
const l0 = (t) => t(), Sl = Symbol(), Ka = Symbol();
function _o(t, e) {
  t instanceof Map && e instanceof Map ? e.forEach((n, s) => t.set(s, n)) : t instanceof Set && e instanceof Set && e.forEach(t.add, t);
  for (const n in e) {
    if (!e.hasOwnProperty(n))
      continue;
    const s = e[n], o = t[n];
    go(o) && go(s) && t.hasOwnProperty(n) && !ye(s) && !nn(s) ? t[n] = _o(o, s) : t[n] = s;
  }
  return t;
}
const h0 = (
  /* istanbul ignore next */
  Symbol()
);
function f0(t) {
  return !go(t) || !t.hasOwnProperty(h0);
}
const { assign: vn } = Object;
function c0(t) {
  return !!(ye(t) && t.effect);
}
function d0(t, e, n, s) {
  const { state: o, actions: l, getters: _ } = e, v = n.state.value[t];
  let k;
  function N() {
    v || (n.state.value[t] = o ? o() : {});
    const z = yd(n.state.value[t]);
    return vn(z, l, Object.keys(_ || {}).reduce((q, tt) => (q[tt] = Ho(br(() => {
      aa(n);
      const F = n._s.get(t);
      return _[tt].call(F, F);
    })), q), {}));
  }
  return k = Kh(t, N, e, n, s, !0), k;
}
function Kh(t, e, n = {}, s, o, l) {
  let _;
  const v = vn({ actions: {} }, n), k = { deep: !0 };
  let N, z, q = [], tt = [], F;
  const mt = s.state.value[t];
  !l && !mt && (s.state.value[t] = {}), He({});
  let X;
  function It(Ft) {
    let zt;
    N = z = !1, typeof Ft == "function" ? (Ft(s.state.value[t]), zt = {
      type: Gr.patchFunction,
      storeId: t,
      events: F
    }) : (_o(s.state.value[t], Ft), zt = {
      type: Gr.patchObject,
      payload: Ft,
      storeId: t,
      events: F
    });
    const me = X = Symbol();
    dh().then(() => {
      X === me && (N = !0);
    }), z = !0, hr(q, zt, s.state.value[t]);
  }
  const ut = l ? function() {
    const { state: zt } = n, me = zt ? zt() : {};
    this.$patch((Te) => {
      vn(Te, me);
    });
  } : (
    /* istanbul ignore next */
    Zh
  );
  function Xt() {
    _.stop(), q = [], tt = [], s._s.delete(t);
  }
  const Pt = (Ft, zt = "") => {
    if (Sl in Ft)
      return Ft[Ka] = zt, Ft;
    const me = function() {
      aa(s);
      const Te = Array.from(arguments), Fe = [], Oe = [];
      function Tt(Ut) {
        Fe.push(Ut);
      }
      function fn(Ut) {
        Oe.push(Ut);
      }
      hr(tt, {
        args: Te,
        name: me[Ka],
        store: Bt,
        after: Tt,
        onError: fn
      });
      let ot;
      try {
        ot = Ft.apply(this && this.$id === t ? this : Bt, Te);
      } catch (Ut) {
        throw hr(Oe, Ut), Ut;
      }
      return ot instanceof Promise ? ot.then((Ut) => (hr(Fe, Ut), Ut)).catch((Ut) => (hr(Oe, Ut), Promise.reject(Ut))) : (hr(Fe, ot), ot);
    };
    return me[Sl] = !0, me[Ka] = zt, me;
  }, xt = {
    _p: s,
    // _s: scope,
    $id: t,
    $onAction: wl.bind(null, tt),
    $patch: It,
    $reset: ut,
    $subscribe(Ft, zt = {}) {
      const me = wl(q, Ft, zt.detached, () => Te()), Te = _.run(() => Sn(() => s.state.value[t], (Fe) => {
        (zt.flush === "sync" ? z : N) && Ft({
          storeId: t,
          type: Gr.direct,
          events: F
        }, Fe);
      }, vn({}, k, zt)));
      return me;
    },
    $dispose: Xt
  }, Bt = ta(xt);
  s._s.set(t, Bt);
  const At = (s._a && s._a.runWithContext || l0)(() => s._e.run(() => (_ = Zl()).run(() => e({ action: Pt }))));
  for (const Ft in At) {
    const zt = At[Ft];
    if (ye(zt) && !c0(zt) || nn(zt))
      l || (mt && f0(zt) && (ye(zt) ? zt.value = mt[Ft] : _o(zt, mt[Ft])), s.state.value[t][Ft] = zt);
    else if (typeof zt == "function") {
      const me = Pt(zt, Ft);
      At[Ft] = me, v.actions[Ft] = zt;
    }
  }
  return vn(Bt, At), vn(ee(Bt), At), Object.defineProperty(Bt, "$state", {
    get: () => s.state.value[t],
    set: (Ft) => {
      It((zt) => {
        vn(zt, Ft);
      });
    }
  }), s._p.forEach((Ft) => {
    vn(Bt, _.run(() => Ft({
      store: Bt,
      app: s._a,
      pinia: s,
      options: v
    })));
  }), mt && l && n.hydrate && n.hydrate(Bt.$state, mt), N = !0, z = !0, Bt;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function p0(t, e, n) {
  let s, o;
  const l = typeof e == "function";
  s = t, o = l ? n : e;
  function _(v, k) {
    const N = ep();
    return v = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    v || (N ? Hr(Gh, null) : null), v && aa(v), v = Wh, v._s.has(s) || (l ? Kh(s, e, o, v) : d0(s, o, v)), v._s.get(s);
  }
  return _.$id = s, _;
}
function g0(t) {
  {
    const e = ee(t), n = {};
    for (const s in e) {
      const o = e[s];
      o.effect ? n[s] = // ...
      br({
        get: () => t[s],
        set(l) {
          t[s] = l;
        }
      }) : (ye(o) || nn(o)) && (n[s] = // ---
      wd(t, s));
    }
    return n;
  }
}
const mo = {}, Yh = [];
function Qt(t, e) {
  if (Array.isArray(t)) {
    for (const n of t)
      Qt(n, e);
    return;
  }
  if (typeof t == "object") {
    for (const n in t)
      Qt(n, t[n]);
    return;
  }
  $h(Object.getOwnPropertyNames(e)), mo[t] = Object.assign(mo[t] || {}, e);
}
function ui(t) {
  return mo[t] || {};
}
function _0() {
  return [...new Set(Yh)];
}
function $h(t) {
  Yh.push(...t);
}
function Xo(t, e) {
  let n;
  const s = t.length, o = [];
  for (n = 0; n < s; n++)
    o.push(e(t[n]));
  return o;
}
function m0(t, e) {
  let n;
  const s = t.length, o = [];
  for (n = 0; n < s; n++)
    e(t[n]) && o.push(t[n]);
  return o;
}
function Ya(t) {
  return t % 360 * Math.PI / 180;
}
function As(t) {
  return t.toLowerCase().replace(/-(.)/g, function(e, n) {
    return n.toUpperCase();
  });
}
function v0(t) {
  return t.replace(/([A-Z])/g, function(e, n) {
    return "-" + n.toLowerCase();
  });
}
function Xh(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Ir(t, e, n, s) {
  return (e == null || n == null) && (s = s || t.bbox(), e == null ? e = s.width / s.height * n : n == null && (n = s.height / s.width * e)), {
    width: e,
    height: n
  };
}
function vo(t, e) {
  const n = t.origin;
  let s = t.ox != null ? t.ox : t.originX != null ? t.originX : "center", o = t.oy != null ? t.oy : t.originY != null ? t.originY : "center";
  n != null && ([s, o] = Array.isArray(n) ? n : typeof n == "object" ? [n.x, n.y] : [n, n]);
  const l = typeof s == "string", _ = typeof o == "string";
  if (l || _) {
    const {
      height: v,
      width: k,
      x: N,
      y: z
    } = e.bbox();
    l && (s = s.includes("left") ? N : s.includes("right") ? N + k : N + k / 2), _ && (o = o.includes("top") ? z : o.includes("bottom") ? z + v : z + v / 2);
  }
  return [s, o];
}
const Qo = "http://www.w3.org/2000/svg", y0 = "http://www.w3.org/1999/xhtml", Ts = "http://www.w3.org/2000/xmlns/", as = "http://www.w3.org/1999/xlink", b0 = "http://svgjs.dev/svgjs", fe = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
class Jo {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const Kn = {}, tu = "___SYMBOL___ROOT___";
function Jr(t, e = Qo) {
  return fe.document.createElementNS(e, t);
}
function ii(t, e = !1) {
  if (t instanceof Jo) return t;
  if (typeof t == "object")
    return $a(t);
  if (t == null)
    return new Kn[tu]();
  if (typeof t == "string" && t.charAt(0) !== "<")
    return $a(fe.document.querySelector(t));
  const n = e ? fe.document.createElement("div") : Jr("svg");
  return n.innerHTML = t, t = $a(n.firstChild), n.removeChild(n.firstChild), t;
}
function Se(t, e) {
  return e && e.ownerDocument && e instanceof e.ownerDocument.defaultView.Node ? e : Jr(t);
}
function Ii(t) {
  if (!t) return null;
  if (t.instance instanceof Jo) return t.instance;
  if (t.nodeName === "#document-fragment")
    return new Kn.Fragment(t);
  let e = Xh(t.nodeName || "Dom");
  return e === "LinearGradient" || e === "RadialGradient" ? e = "Gradient" : Kn[e] || (e = "Dom"), new Kn[e](t);
}
let $a = Ii;
function oe(t, e = t.name, n = !1) {
  return Kn[e] = t, n && (Kn[tu] = t), $h(Object.getOwnPropertyNames(t.prototype)), t;
}
function x0(t) {
  return Kn[t];
}
let w0 = 1e3;
function Qh(t) {
  return "Svgjs" + Xh(t) + w0++;
}
function Jh(t) {
  for (let e = t.children.length - 1; e >= 0; e--)
    Jh(t.children[e]);
  return t.id && (t.id = Qh(t.nodeName)), t;
}
function ne(t, e) {
  let n, s;
  for (t = Array.isArray(t) ? t : [t], s = t.length - 1; s >= 0; s--)
    for (n in e)
      t[s].prototype[n] = e[n];
}
function we(t) {
  return function(...e) {
    const n = e[e.length - 1];
    return n && n.constructor === Object && !(n instanceof Array) ? t.apply(this, e.slice(0, -1)).attr(n) : t.apply(this, e);
  };
}
function S0() {
  return this.parent().children();
}
function C0() {
  return this.parent().index(this);
}
function I0() {
  return this.siblings()[this.position() + 1];
}
function k0() {
  return this.siblings()[this.position() - 1];
}
function P0() {
  const t = this.position();
  return this.parent().add(this.remove(), t + 1), this;
}
function A0() {
  const t = this.position();
  return this.parent().add(this.remove(), t ? t - 1 : 0), this;
}
function T0() {
  return this.parent().add(this.remove()), this;
}
function E0() {
  return this.parent().add(this.remove(), 0), this;
}
function O0(t) {
  t = ii(t), t.remove();
  const e = this.position();
  return this.parent().add(t, e), this;
}
function M0(t) {
  t = ii(t), t.remove();
  const e = this.position();
  return this.parent().add(t, e + 1), this;
}
function L0(t) {
  return t = ii(t), t.before(this), this;
}
function N0(t) {
  return t = ii(t), t.after(this), this;
}
Qt("Dom", {
  siblings: S0,
  position: C0,
  next: I0,
  prev: k0,
  forward: P0,
  backward: A0,
  front: T0,
  back: E0,
  before: O0,
  after: M0,
  insertBefore: L0,
  insertAfter: N0
});
const tf = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, R0 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, F0 = /rgb\((\d+),(\d+),(\d+)\)/, z0 = /(#[a-z_][a-z0-9\-_]*)/i, D0 = /\)\s*,?\s*/, V0 = /\s/g, Cl = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, Il = /^rgb\(/, kl = /^(\s+)?$/, Pl = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, B0 = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, un = /[\s,]+/, eu = /[MLHVCSQTAZ]/i;
function U0() {
  const t = this.attr("class");
  return t == null ? [] : t.trim().split(un);
}
function q0(t) {
  return this.classes().indexOf(t) !== -1;
}
function j0(t) {
  if (!this.hasClass(t)) {
    const e = this.classes();
    e.push(t), this.attr("class", e.join(" "));
  }
  return this;
}
function H0(t) {
  return this.hasClass(t) && this.attr("class", this.classes().filter(function(e) {
    return e !== t;
  }).join(" ")), this;
}
function W0(t) {
  return this.hasClass(t) ? this.removeClass(t) : this.addClass(t);
}
Qt("Dom", {
  classes: U0,
  hasClass: q0,
  addClass: j0,
  removeClass: H0,
  toggleClass: W0
});
function G0(t, e) {
  const n = {};
  if (arguments.length === 0)
    return this.node.style.cssText.split(/\s*;\s*/).filter(function(s) {
      return !!s.length;
    }).forEach(function(s) {
      const o = s.split(/\s*:\s*/);
      n[o[0]] = o[1];
    }), n;
  if (arguments.length < 2) {
    if (Array.isArray(t)) {
      for (const s of t) {
        const o = As(s);
        n[s] = this.node.style[o];
      }
      return n;
    }
    if (typeof t == "string")
      return this.node.style[As(t)];
    if (typeof t == "object")
      for (const s in t)
        this.node.style[As(s)] = t[s] == null || kl.test(t[s]) ? "" : t[s];
  }
  return arguments.length === 2 && (this.node.style[As(t)] = e == null || kl.test(e) ? "" : e), this;
}
function Z0() {
  return this.css("display", "");
}
function K0() {
  return this.css("display", "none");
}
function Y0() {
  return this.css("display") !== "none";
}
Qt("Dom", {
  css: G0,
  show: Z0,
  hide: K0,
  visible: Y0
});
function $0(t, e, n) {
  if (t == null)
    return this.data(Xo(m0(this.node.attributes, (s) => s.nodeName.indexOf("data-") === 0), (s) => s.nodeName.slice(5)));
  if (t instanceof Array) {
    const s = {};
    for (const o of t)
      s[o] = this.data(o);
    return s;
  } else if (typeof t == "object")
    for (e in t)
      this.data(e, t[e]);
  else if (arguments.length < 2)
    try {
      return JSON.parse(this.attr("data-" + t));
    } catch {
      return this.attr("data-" + t);
    }
  else
    this.attr("data-" + t, e === null ? null : n === !0 || typeof e == "string" || typeof e == "number" ? e : JSON.stringify(e));
  return this;
}
Qt("Dom", {
  data: $0
});
function X0(t, e) {
  if (typeof arguments[0] == "object")
    for (const n in t)
      this.remember(n, t[n]);
  else {
    if (arguments.length === 1)
      return this.memory()[t];
    this.memory()[t] = e;
  }
  return this;
}
function Q0() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let t = arguments.length - 1; t >= 0; t--)
      delete this.memory()[arguments[t]];
  return this;
}
function J0() {
  return this._memory = this._memory || {};
}
Qt("Dom", {
  remember: X0,
  forget: Q0,
  memory: J0
});
function tg(t) {
  return t.length === 4 ? ["#", t.substring(1, 2), t.substring(1, 2), t.substring(2, 3), t.substring(2, 3), t.substring(3, 4), t.substring(3, 4)].join("") : t;
}
function eg(t) {
  const e = Math.round(t), s = Math.max(0, Math.min(255, e)).toString(16);
  return s.length === 1 ? "0" + s : s;
}
function fr(t, e) {
  for (let n = e.length; n--; )
    if (t[e[n]] == null)
      return !1;
  return !0;
}
function ig(t, e) {
  const n = fr(t, "rgb") ? {
    _a: t.r,
    _b: t.g,
    _c: t.b,
    _d: 0,
    space: "rgb"
  } : fr(t, "xyz") ? {
    _a: t.x,
    _b: t.y,
    _c: t.z,
    _d: 0,
    space: "xyz"
  } : fr(t, "hsl") ? {
    _a: t.h,
    _b: t.s,
    _c: t.l,
    _d: 0,
    space: "hsl"
  } : fr(t, "lab") ? {
    _a: t.l,
    _b: t.a,
    _c: t.b,
    _d: 0,
    space: "lab"
  } : fr(t, "lch") ? {
    _a: t.l,
    _b: t.c,
    _c: t.h,
    _d: 0,
    space: "lch"
  } : fr(t, "cmyk") ? {
    _a: t.c,
    _b: t.m,
    _c: t.y,
    _d: t.k,
    space: "cmyk"
  } : {
    _a: 0,
    _b: 0,
    _c: 0,
    space: "rgb"
  };
  return n.space = e || n.space, n;
}
function ng(t) {
  return t === "lab" || t === "xyz" || t === "lch";
}
function Xa(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
class _e {
  constructor(...e) {
    this.init(...e);
  }
  // Test if given value is a color
  static isColor(e) {
    return e && (e instanceof _e || this.isRgb(e) || this.test(e));
  }
  // Test if given value is an rgb object
  static isRgb(e) {
    return e && typeof e.r == "number" && typeof e.g == "number" && typeof e.b == "number";
  }
  /*
  Generating random colors
  */
  static random(e = "vibrant", n, s) {
    const {
      random: o,
      round: l,
      sin: _,
      PI: v
    } = Math;
    if (e === "vibrant") {
      const k = 24 * o() + 57, N = 38 * o() + 45, z = 360 * o();
      return new _e(k, N, z, "lch");
    } else if (e === "sine") {
      n = n ?? o();
      const k = l(80 * _(2 * v * n / 0.5 + 0.01) + 150), N = l(50 * _(2 * v * n / 0.5 + 4.6) + 200), z = l(100 * _(2 * v * n / 0.5 + 2.3) + 150);
      return new _e(k, N, z);
    } else if (e === "pastel") {
      const k = 8 * o() + 86, N = 17 * o() + 9, z = 360 * o();
      return new _e(k, N, z, "lch");
    } else if (e === "dark") {
      const k = 10 + 10 * o(), N = 50 * o() + 86, z = 360 * o();
      return new _e(k, N, z, "lch");
    } else if (e === "rgb") {
      const k = 255 * o(), N = 255 * o(), z = 255 * o();
      return new _e(k, N, z);
    } else if (e === "lab") {
      const k = 100 * o(), N = 256 * o() - 128, z = 256 * o() - 128;
      return new _e(k, N, z, "lab");
    } else if (e === "grey") {
      const k = 255 * o();
      return new _e(k, k, k);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(e) {
    return typeof e == "string" && (Cl.test(e) || Il.test(e));
  }
  cmyk() {
    const {
      _a: e,
      _b: n,
      _c: s
    } = this.rgb(), [o, l, _] = [e, n, s].map((tt) => tt / 255), v = Math.min(1 - o, 1 - l, 1 - _);
    if (v === 1)
      return new _e(0, 0, 0, 1, "cmyk");
    const k = (1 - o - v) / (1 - v), N = (1 - l - v) / (1 - v), z = (1 - _ - v) / (1 - v);
    return new _e(k, N, z, v, "cmyk");
  }
  hsl() {
    const {
      _a: e,
      _b: n,
      _c: s
    } = this.rgb(), [o, l, _] = [e, n, s].map((X) => X / 255), v = Math.max(o, l, _), k = Math.min(o, l, _), N = (v + k) / 2, z = v === k, q = v - k, tt = z ? 0 : N > 0.5 ? q / (2 - v - k) : q / (v + k), F = z ? 0 : v === o ? ((l - _) / q + (l < _ ? 6 : 0)) / 6 : v === l ? ((_ - o) / q + 2) / 6 : v === _ ? ((o - l) / q + 4) / 6 : 0;
    return new _e(360 * F, 100 * tt, 100 * N, "hsl");
  }
  init(e = 0, n = 0, s = 0, o = 0, l = "rgb") {
    if (e = e || 0, this.space)
      for (const q in this.space)
        delete this[this.space[q]];
    if (typeof e == "number")
      l = typeof o == "string" ? o : l, o = typeof o == "string" ? 0 : o, Object.assign(this, {
        _a: e,
        _b: n,
        _c: s,
        _d: o,
        space: l
      });
    else if (e instanceof Array)
      this.space = n || (typeof e[3] == "string" ? e[3] : e[4]) || "rgb", Object.assign(this, {
        _a: e[0],
        _b: e[1],
        _c: e[2],
        _d: e[3] || 0
      });
    else if (e instanceof Object) {
      const q = ig(e, n);
      Object.assign(this, q);
    } else if (typeof e == "string")
      if (Il.test(e)) {
        const q = e.replace(V0, ""), [tt, F, mt] = F0.exec(q).slice(1, 4).map((X) => parseInt(X));
        Object.assign(this, {
          _a: tt,
          _b: F,
          _c: mt,
          _d: 0,
          space: "rgb"
        });
      } else if (Cl.test(e)) {
        const q = (X) => parseInt(X, 16), [, tt, F, mt] = R0.exec(tg(e)).map(q);
        Object.assign(this, {
          _a: tt,
          _b: F,
          _c: mt,
          _d: 0,
          space: "rgb"
        });
      } else throw Error("Unsupported string format, can't construct Color");
    const {
      _a: _,
      _b: v,
      _c: k,
      _d: N
    } = this, z = this.space === "rgb" ? {
      r: _,
      g: v,
      b: k
    } : this.space === "xyz" ? {
      x: _,
      y: v,
      z: k
    } : this.space === "hsl" ? {
      h: _,
      s: v,
      l: k
    } : this.space === "lab" ? {
      l: _,
      a: v,
      b: k
    } : this.space === "lch" ? {
      l: _,
      c: v,
      h: k
    } : this.space === "cmyk" ? {
      c: _,
      m: v,
      y: k,
      k: N
    } : {};
    Object.assign(this, z);
  }
  lab() {
    const {
      x: e,
      y: n,
      z: s
    } = this.xyz(), o = 116 * n - 16, l = 500 * (e - n), _ = 200 * (n - s);
    return new _e(o, l, _, "lab");
  }
  lch() {
    const {
      l: e,
      a: n,
      b: s
    } = this.lab(), o = Math.sqrt(n ** 2 + s ** 2);
    let l = 180 * Math.atan2(s, n) / Math.PI;
    return l < 0 && (l *= -1, l = 360 - l), new _e(e, o, l, "lch");
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb")
      return this;
    if (ng(this.space)) {
      let {
        x: e,
        y: n,
        z: s
      } = this;
      if (this.space === "lab" || this.space === "lch") {
        let {
          l: F,
          a: mt,
          b: X
        } = this;
        if (this.space === "lch") {
          const {
            c: ht,
            h: At
          } = this, Ft = Math.PI / 180;
          mt = ht * Math.cos(Ft * At), X = ht * Math.sin(Ft * At);
        }
        const It = (F + 16) / 116, ut = mt / 500 + It, Xt = It - X / 200, Pt = 16 / 116, xt = 8856e-6, Bt = 7.787;
        e = 0.95047 * (ut ** 3 > xt ? ut ** 3 : (ut - Pt) / Bt), n = 1 * (It ** 3 > xt ? It ** 3 : (It - Pt) / Bt), s = 1.08883 * (Xt ** 3 > xt ? Xt ** 3 : (Xt - Pt) / Bt);
      }
      const o = e * 3.2406 + n * -1.5372 + s * -0.4986, l = e * -0.9689 + n * 1.8758 + s * 0.0415, _ = e * 0.0557 + n * -0.204 + s * 1.057, v = Math.pow, k = 31308e-7, N = o > k ? 1.055 * v(o, 1 / 2.4) - 0.055 : 12.92 * o, z = l > k ? 1.055 * v(l, 1 / 2.4) - 0.055 : 12.92 * l, q = _ > k ? 1.055 * v(_, 1 / 2.4) - 0.055 : 12.92 * _;
      return new _e(255 * N, 255 * z, 255 * q);
    } else if (this.space === "hsl") {
      let {
        h: e,
        s: n,
        l: s
      } = this;
      if (e /= 360, n /= 100, s /= 100, n === 0)
        return s *= 255, new _e(s, s, s);
      const o = s < 0.5 ? s * (1 + n) : s + n - s * n, l = 2 * s - o, _ = 255 * Xa(l, o, e + 1 / 3), v = 255 * Xa(l, o, e), k = 255 * Xa(l, o, e - 1 / 3);
      return new _e(_, v, k);
    } else if (this.space === "cmyk") {
      const {
        c: e,
        m: n,
        y: s,
        k: o
      } = this, l = 255 * (1 - Math.min(1, e * (1 - o) + o)), _ = 255 * (1 - Math.min(1, n * (1 - o) + o)), v = 255 * (1 - Math.min(1, s * (1 - o) + o));
      return new _e(l, _, v);
    } else
      return this;
  }
  toArray() {
    const {
      _a: e,
      _b: n,
      _c: s,
      _d: o,
      space: l
    } = this;
    return [e, n, s, o, l];
  }
  toHex() {
    const [e, n, s] = this._clamped().map(eg);
    return `#${e}${n}${s}`;
  }
  toRgb() {
    const [e, n, s] = this._clamped();
    return `rgb(${e},${n},${s})`;
  }
  toString() {
    return this.toHex();
  }
  xyz() {
    const {
      _a: e,
      _b: n,
      _c: s
    } = this.rgb(), [o, l, _] = [e, n, s].map((ut) => ut / 255), v = o > 0.04045 ? Math.pow((o + 0.055) / 1.055, 2.4) : o / 12.92, k = l > 0.04045 ? Math.pow((l + 0.055) / 1.055, 2.4) : l / 12.92, N = _ > 0.04045 ? Math.pow((_ + 0.055) / 1.055, 2.4) : _ / 12.92, z = (v * 0.4124 + k * 0.3576 + N * 0.1805) / 0.95047, q = (v * 0.2126 + k * 0.7152 + N * 0.0722) / 1, tt = (v * 0.0193 + k * 0.1192 + N * 0.9505) / 1.08883, F = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116, mt = q > 8856e-6 ? Math.pow(q, 1 / 3) : 7.787 * q + 16 / 116, X = tt > 8856e-6 ? Math.pow(tt, 1 / 3) : 7.787 * tt + 16 / 116;
    return new _e(F, mt, X, "xyz");
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const {
      _a: e,
      _b: n,
      _c: s
    } = this.rgb(), {
      max: o,
      min: l,
      round: _
    } = Math, v = (k) => o(0, l(_(k), 255));
    return [e, n, s].map(v);
  }
  /*
  Constructing colors
  */
}
class Re {
  // Initialize
  constructor(...e) {
    this.init(...e);
  }
  // Clone point
  clone() {
    return new Re(this);
  }
  init(e, n) {
    const s = {
      x: 0,
      y: 0
    }, o = Array.isArray(e) ? {
      x: e[0],
      y: e[1]
    } : typeof e == "object" ? {
      x: e.x,
      y: e.y
    } : {
      x: e,
      y: n
    };
    return this.x = o.x == null ? s.x : o.x, this.y = o.y == null ? s.y : o.y, this;
  }
  toArray() {
    return [this.x, this.y];
  }
  transform(e) {
    return this.clone().transformO(e);
  }
  // Transform point with matrix
  transformO(e) {
    Nt.isMatrixLike(e) || (e = new Nt(e));
    const {
      x: n,
      y: s
    } = this;
    return this.x = e.a * n + e.c * s + e.e, this.y = e.b * n + e.d * s + e.f, this;
  }
}
function rg(t, e) {
  return new Re(t, e).transformO(this.screenCTM().inverseO());
}
function cr(t, e, n) {
  return Math.abs(e - t) < 1e-6;
}
class Nt {
  constructor(...e) {
    this.init(...e);
  }
  static formatTransforms(e) {
    const n = e.flip === "both" || e.flip === !0, s = e.flip && (n || e.flip === "x") ? -1 : 1, o = e.flip && (n || e.flip === "y") ? -1 : 1, l = e.skew && e.skew.length ? e.skew[0] : isFinite(e.skew) ? e.skew : isFinite(e.skewX) ? e.skewX : 0, _ = e.skew && e.skew.length ? e.skew[1] : isFinite(e.skew) ? e.skew : isFinite(e.skewY) ? e.skewY : 0, v = e.scale && e.scale.length ? e.scale[0] * s : isFinite(e.scale) ? e.scale * s : isFinite(e.scaleX) ? e.scaleX * s : s, k = e.scale && e.scale.length ? e.scale[1] * o : isFinite(e.scale) ? e.scale * o : isFinite(e.scaleY) ? e.scaleY * o : o, N = e.shear || 0, z = e.rotate || e.theta || 0, q = new Re(e.origin || e.around || e.ox || e.originX, e.oy || e.originY), tt = q.x, F = q.y, mt = new Re(e.position || e.px || e.positionX || NaN, e.py || e.positionY || NaN), X = mt.x, It = mt.y, ut = new Re(e.translate || e.tx || e.translateX, e.ty || e.translateY), Xt = ut.x, Pt = ut.y, xt = new Re(e.relative || e.rx || e.relativeX, e.ry || e.relativeY), Bt = xt.x, ht = xt.y;
    return {
      scaleX: v,
      scaleY: k,
      skewX: l,
      skewY: _,
      shear: N,
      theta: z,
      rx: Bt,
      ry: ht,
      tx: Xt,
      ty: Pt,
      ox: tt,
      oy: F,
      px: X,
      py: It
    };
  }
  static fromArray(e) {
    return {
      a: e[0],
      b: e[1],
      c: e[2],
      d: e[3],
      e: e[4],
      f: e[5]
    };
  }
  static isMatrixLike(e) {
    return e.a != null || e.b != null || e.c != null || e.d != null || e.e != null || e.f != null;
  }
  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply(e, n, s) {
    const o = e.a * n.a + e.c * n.b, l = e.b * n.a + e.d * n.b, _ = e.a * n.c + e.c * n.d, v = e.b * n.c + e.d * n.d, k = e.e + e.a * n.e + e.c * n.f, N = e.f + e.b * n.e + e.d * n.f;
    return s.a = o, s.b = l, s.c = _, s.d = v, s.e = k, s.f = N, s;
  }
  around(e, n, s) {
    return this.clone().aroundO(e, n, s);
  }
  // Transform around a center point
  aroundO(e, n, s) {
    const o = e || 0, l = n || 0;
    return this.translateO(-o, -l).lmultiplyO(s).translateO(o, l);
  }
  // Clones this matrix
  clone() {
    return new Nt(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(e = 0, n = 0) {
    const s = this.a, o = this.b, l = this.c, _ = this.d, v = this.e, k = this.f, N = s * _ - o * l, z = N > 0 ? 1 : -1, q = z * Math.sqrt(s * s + o * o), tt = Math.atan2(z * o, z * s), F = 180 / Math.PI * tt, mt = Math.cos(tt), X = Math.sin(tt), It = (s * l + o * _) / N, ut = l * q / (It * s - o) || _ * q / (It * o + s), Xt = v - e + e * mt * q + n * (It * mt * q - X * ut), Pt = k - n + e * X * q + n * (It * X * q + mt * ut);
    return {
      // Return the affine parameters
      scaleX: q,
      scaleY: ut,
      shear: It,
      rotate: F,
      translateX: Xt,
      translateY: Pt,
      originX: e,
      originY: n,
      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
  // Check if two matrices are equal
  equals(e) {
    if (e === this) return !0;
    const n = new Nt(e);
    return cr(this.a, n.a) && cr(this.b, n.b) && cr(this.c, n.c) && cr(this.d, n.d) && cr(this.e, n.e) && cr(this.f, n.f);
  }
  // Flip matrix on x or y, at a given offset
  flip(e, n) {
    return this.clone().flipO(e, n);
  }
  flipO(e, n) {
    return e === "x" ? this.scaleO(-1, 1, n, 0) : e === "y" ? this.scaleO(1, -1, 0, n) : this.scaleO(-1, -1, e, n || e);
  }
  // Initialize
  init(e) {
    const n = Nt.fromArray([1, 0, 0, 1, 0, 0]);
    return e = e instanceof Ki ? e.matrixify() : typeof e == "string" ? Nt.fromArray(e.split(un).map(parseFloat)) : Array.isArray(e) ? Nt.fromArray(e) : typeof e == "object" && Nt.isMatrixLike(e) ? e : typeof e == "object" ? new Nt().transform(e) : arguments.length === 6 ? Nt.fromArray([].slice.call(arguments)) : n, this.a = e.a != null ? e.a : n.a, this.b = e.b != null ? e.b : n.b, this.c = e.c != null ? e.c : n.c, this.d = e.d != null ? e.d : n.d, this.e = e.e != null ? e.e : n.e, this.f = e.f != null ? e.f : n.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const e = this.a, n = this.b, s = this.c, o = this.d, l = this.e, _ = this.f, v = e * o - n * s;
    if (!v) throw new Error("Cannot invert " + this);
    const k = o / v, N = -n / v, z = -s / v, q = e / v, tt = -(k * l + z * _), F = -(N * l + q * _);
    return this.a = k, this.b = N, this.c = z, this.d = q, this.e = tt, this.f = F, this;
  }
  lmultiply(e) {
    return this.clone().lmultiplyO(e);
  }
  lmultiplyO(e) {
    const n = this, s = e instanceof Nt ? e : new Nt(e);
    return Nt.matrixMultiply(s, n, this);
  }
  // Left multiplies by the given matrix
  multiply(e) {
    return this.clone().multiplyO(e);
  }
  multiplyO(e) {
    const n = this, s = e instanceof Nt ? e : new Nt(e);
    return Nt.matrixMultiply(n, s, this);
  }
  // Rotate matrix
  rotate(e, n, s) {
    return this.clone().rotateO(e, n, s);
  }
  rotateO(e, n = 0, s = 0) {
    e = Ya(e);
    const o = Math.cos(e), l = Math.sin(e), {
      a: _,
      b: v,
      c: k,
      d: N,
      e: z,
      f: q
    } = this;
    return this.a = _ * o - v * l, this.b = v * o + _ * l, this.c = k * o - N * l, this.d = N * o + k * l, this.e = z * o - q * l + s * l - n * o + n, this.f = q * o + z * l - n * l - s * o + s, this;
  }
  // Scale matrix
  scale(e, n, s, o) {
    return this.clone().scaleO(...arguments);
  }
  scaleO(e, n = e, s = 0, o = 0) {
    arguments.length === 3 && (o = s, s = n, n = e);
    const {
      a: l,
      b: _,
      c: v,
      d: k,
      e: N,
      f: z
    } = this;
    return this.a = l * e, this.b = _ * n, this.c = v * e, this.d = k * n, this.e = N * e - s * e + s, this.f = z * n - o * n + o, this;
  }
  // Shear matrix
  shear(e, n, s) {
    return this.clone().shearO(e, n, s);
  }
  shearO(e, n = 0, s = 0) {
    const {
      a: o,
      b: l,
      c: _,
      d: v,
      e: k,
      f: N
    } = this;
    return this.a = o + l * e, this.c = _ + v * e, this.e = k + N * e - s * e, this;
  }
  // Skew Matrix
  skew(e, n, s, o) {
    return this.clone().skewO(...arguments);
  }
  skewO(e, n = e, s = 0, o = 0) {
    arguments.length === 3 && (o = s, s = n, n = e), e = Ya(e), n = Ya(n);
    const l = Math.tan(e), _ = Math.tan(n), {
      a: v,
      b: k,
      c: N,
      d: z,
      e: q,
      f: tt
    } = this;
    return this.a = v + k * l, this.b = k + v * _, this.c = N + z * l, this.d = z + N * _, this.e = q + tt * l - o * l, this.f = tt + q * _ - s * _, this;
  }
  // SkewX
  skewX(e, n, s) {
    return this.skew(e, 0, n, s);
  }
  // SkewY
  skewY(e, n, s) {
    return this.skew(0, e, n, s);
  }
  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }
  // Convert matrix to string
  toString() {
    return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.e + "," + this.f + ")";
  }
  // Transform a matrix into another matrix by manipulating the space
  transform(e) {
    if (Nt.isMatrixLike(e))
      return new Nt(e).multiplyO(this);
    const n = Nt.formatTransforms(e), s = this, {
      x: o,
      y: l
    } = new Re(n.ox, n.oy).transform(s), _ = new Nt().translateO(n.rx, n.ry).lmultiplyO(s).translateO(-o, -l).scaleO(n.scaleX, n.scaleY).skewO(n.skewX, n.skewY).shearO(n.shear).rotateO(n.theta).translateO(o, l);
    if (isFinite(n.px) || isFinite(n.py)) {
      const v = new Re(o, l).transform(_), k = isFinite(n.px) ? n.px - v.x : 0, N = isFinite(n.py) ? n.py - v.y : 0;
      _.translateO(k, N);
    }
    return _.translateO(n.tx, n.ty), _;
  }
  // Translate matrix
  translate(e, n) {
    return this.clone().translateO(e, n);
  }
  translateO(e, n) {
    return this.e += e || 0, this.f += n || 0, this;
  }
  valueOf() {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
}
function sg() {
  return new Nt(this.node.getCTM());
}
function ag() {
  if (typeof this.isRoot == "function" && !this.isRoot()) {
    const t = this.rect(1, 1), e = t.node.getScreenCTM();
    return t.remove(), new Nt(e);
  }
  return new Nt(this.node.getScreenCTM());
}
oe(Nt, "Matrix");
function xn() {
  if (!xn.nodes) {
    const t = ii().size(2, 0);
    t.node.style.cssText = ["opacity: 0", "position: absolute", "left: -100%", "top: -100%", "overflow: hidden"].join(";"), t.attr("focusable", "false"), t.attr("aria-hidden", "true");
    const e = t.path().node;
    xn.nodes = {
      svg: t,
      path: e
    };
  }
  if (!xn.nodes.svg.node.parentNode) {
    const t = fe.document.body || fe.document.documentElement;
    xn.nodes.svg.addTo(t);
  }
  return xn.nodes;
}
function ef(t) {
  return !t.width && !t.height && !t.x && !t.y;
}
function og(t) {
  return t === fe.document || (fe.document.documentElement.contains || function(e) {
    for (; e.parentNode; )
      e = e.parentNode;
    return e === fe.document;
  }).call(fe.document.documentElement, t);
}
class Xe {
  constructor(...e) {
    this.init(...e);
  }
  addOffset() {
    return this.x += fe.window.pageXOffset, this.y += fe.window.pageYOffset, new Xe(this);
  }
  init(e) {
    const n = [0, 0, 0, 0];
    return e = typeof e == "string" ? e.split(un).map(parseFloat) : Array.isArray(e) ? e : typeof e == "object" ? [e.left != null ? e.left : e.x, e.top != null ? e.top : e.y, e.width, e.height] : arguments.length === 4 ? [].slice.call(arguments) : n, this.x = e[0] || 0, this.y = e[1] || 0, this.width = this.w = e[2] || 0, this.height = this.h = e[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return ef(this);
  }
  // Merge rect box with another, return a new instance
  merge(e) {
    const n = Math.min(this.x, e.x), s = Math.min(this.y, e.y), o = Math.max(this.x + this.width, e.x + e.width) - n, l = Math.max(this.y + this.height, e.y + e.height) - s;
    return new Xe(n, s, o, l);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(e) {
    e instanceof Nt || (e = new Nt(e));
    let n = 1 / 0, s = -1 / 0, o = 1 / 0, l = -1 / 0;
    return [new Re(this.x, this.y), new Re(this.x2, this.y), new Re(this.x, this.y2), new Re(this.x2, this.y2)].forEach(function(v) {
      v = v.transform(e), n = Math.min(n, v.x), s = Math.max(s, v.x), o = Math.min(o, v.y), l = Math.max(l, v.y);
    }), new Xe(n, o, s - n, l - o);
  }
}
function nf(t, e, n) {
  let s;
  try {
    if (s = e(t.node), ef(s) && !og(t.node))
      throw new Error("Element not in the dom");
  } catch {
    s = n(t);
  }
  return s;
}
function ug() {
  const n = nf(this, (o) => o.getBBox(), (o) => {
    try {
      const l = o.clone().addTo(xn().svg).show(), _ = l.node.getBBox();
      return l.remove(), _;
    } catch (l) {
      throw new Error(`Getting bbox of element "${o.node.nodeName}" is not possible: ${l.toString()}`);
    }
  });
  return new Xe(n);
}
function lg(t) {
  const s = nf(this, (l) => l.getBoundingClientRect(), (l) => {
    throw new Error(`Getting rbox of element "${l.node.nodeName}" is not possible`);
  }), o = new Xe(s);
  return t ? o.transform(t.screenCTM().inverseO()) : o.addOffset();
}
function hg(t, e) {
  const n = this.bbox();
  return t > n.x && e > n.y && t < n.x + n.width && e < n.y + n.height;
}
Qt({
  viewbox: {
    viewbox(t, e, n, s) {
      return t == null ? new Xe(this.attr("viewBox")) : this.attr("viewBox", new Xe(t, e, n, s));
    },
    zoom(t, e) {
      let {
        width: n,
        height: s
      } = this.attr(["width", "height"]);
      if ((!n && !s || typeof n == "string" || typeof s == "string") && (n = this.node.clientWidth, s = this.node.clientHeight), !n || !s)
        throw new Error("Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element");
      const o = this.viewbox(), l = n / o.width, _ = s / o.height, v = Math.min(l, _);
      if (t == null)
        return v;
      let k = v / t;
      k === 1 / 0 && (k = Number.MAX_SAFE_INTEGER / 100), e = e || new Re(n / 2 / l + o.x, s / 2 / _ + o.y);
      const N = new Xe(o).transform(new Nt({
        scale: k,
        origin: e
      }));
      return this.viewbox(N);
    }
  }
});
oe(Xe, "Box");
class Xn extends Array {
  constructor(e = [], ...n) {
    if (super(e, ...n), typeof e == "number") return this;
    this.length = 0, this.push(...e);
  }
}
ne([Xn], {
  each(t, ...e) {
    return typeof t == "function" ? this.map((n, s, o) => t.call(n, n, s, o)) : this.map((n) => n[t](...e));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const fg = ["toArray", "constructor", "each"];
Xn.extend = function(t) {
  t = t.reduce((e, n) => (fg.includes(n) || n[0] === "_" || (e[n] = function(...s) {
    return this.each(n, ...s);
  }), e), {}), ne([Xn], t);
};
function kr(t, e) {
  return new Xn(Xo((e || fe.document).querySelectorAll(t), function(n) {
    return Ii(n);
  }));
}
function cg(t) {
  return kr(t, this.node);
}
function dg(t) {
  return Ii(this.node.querySelector(t));
}
let pg = 0;
const rf = {};
function sf(t) {
  let e = t.getEventHolder();
  return e === fe.window && (e = rf), e.events || (e.events = {}), e.events;
}
function iu(t) {
  return t.getEventTarget();
}
function gg(t) {
  let e = t.getEventHolder();
  e === fe.window && (e = rf), e.events && (e.events = {});
}
function yo(t, e, n, s, o) {
  const l = n.bind(s || t), _ = ii(t), v = sf(_), k = iu(_);
  e = Array.isArray(e) ? e : e.split(un), n._svgjsListenerId || (n._svgjsListenerId = ++pg), e.forEach(function(N) {
    const z = N.split(".")[0], q = N.split(".")[1] || "*";
    v[z] = v[z] || {}, v[z][q] = v[z][q] || {}, v[z][q][n._svgjsListenerId] = l, k.addEventListener(z, l, o || !1);
  });
}
function gr(t, e, n, s) {
  const o = ii(t), l = sf(o), _ = iu(o);
  typeof n == "function" && (n = n._svgjsListenerId, !n) || (e = Array.isArray(e) ? e : (e || "").split(un), e.forEach(function(v) {
    const k = v && v.split(".")[0], N = v && v.split(".")[1];
    let z, q;
    if (n)
      l[k] && l[k][N || "*"] && (_.removeEventListener(k, l[k][N || "*"][n], s || !1), delete l[k][N || "*"][n]);
    else if (k && N) {
      if (l[k] && l[k][N]) {
        for (q in l[k][N])
          gr(_, [k, N].join("."), q);
        delete l[k][N];
      }
    } else if (N)
      for (v in l)
        for (z in l[v])
          N === z && gr(_, [v, N].join("."));
    else if (k) {
      if (l[k]) {
        for (z in l[k])
          gr(_, [k, z].join("."));
        delete l[k];
      }
    } else {
      for (v in l)
        gr(_, v);
      gg(o);
    }
  }));
}
function _g(t, e, n, s) {
  const o = iu(t);
  return e instanceof fe.window.Event || (e = new fe.window.CustomEvent(e, {
    detail: n,
    cancelable: !0,
    ...s
  })), o.dispatchEvent(e), e;
}
class os extends Jo {
  addEventListener() {
  }
  dispatch(e, n, s) {
    return _g(this, e, n, s);
  }
  dispatchEvent(e) {
    const n = this.getEventHolder().events;
    if (!n) return !0;
    const s = n[e.type];
    for (const o in s)
      for (const l in s[o])
        s[o][l](e);
    return !e.defaultPrevented;
  }
  // Fire given event
  fire(e, n, s) {
    return this.dispatch(e, n, s), this;
  }
  getEventHolder() {
    return this;
  }
  getEventTarget() {
    return this;
  }
  // Unbind event from listener
  off(e, n, s) {
    return gr(this, e, n, s), this;
  }
  // Bind given event to listener
  on(e, n, s, o) {
    return yo(this, e, n, s, o), this;
  }
  removeEventListener() {
  }
}
oe(os, "EventTarget");
function Al() {
}
const Dr = {
  duration: 400,
  ease: ">",
  delay: 0
}, mg = {
  // fill and stroke
  "fill-opacity": 1,
  "stroke-opacity": 1,
  "stroke-width": 0,
  "stroke-linejoin": "miter",
  "stroke-linecap": "butt",
  fill: "#000000",
  stroke: "#000000",
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  "stop-opacity": 1,
  "stop-color": "#000000",
  // text
  "text-anchor": "start"
};
class wr extends Array {
  constructor(...e) {
    super(...e), this.init(...e);
  }
  clone() {
    return new this.constructor(this);
  }
  init(e) {
    return typeof e == "number" ? this : (this.length = 0, this.push(...this.parse(e)), this);
  }
  // Parse whitespace separated string
  parse(e = []) {
    return e instanceof Array ? e : e.trim().split(un).map(parseFloat);
  }
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
  toSet() {
    return new Set(this);
  }
  toString() {
    return this.join(" ");
  }
  // Flattens the array if needed
  valueOf() {
    const e = [];
    return e.push(...this), e;
  }
}
class Gt {
  // Initialize
  constructor(...e) {
    this.init(...e);
  }
  convert(e) {
    return new Gt(this.value, e);
  }
  // Divide number
  divide(e) {
    return e = new Gt(e), new Gt(this / e, this.unit || e.unit);
  }
  init(e, n) {
    return n = Array.isArray(e) ? e[1] : n, e = Array.isArray(e) ? e[0] : e, this.value = 0, this.unit = n || "", typeof e == "number" ? this.value = isNaN(e) ? 0 : isFinite(e) ? e : e < 0 ? -34e37 : 34e37 : typeof e == "string" ? (n = e.match(tf), n && (this.value = parseFloat(n[1]), n[5] === "%" ? this.value /= 100 : n[5] === "s" && (this.value *= 1e3), this.unit = n[5])) : e instanceof Gt && (this.value = e.valueOf(), this.unit = e.unit), this;
  }
  // Subtract number
  minus(e) {
    return e = new Gt(e), new Gt(this - e, this.unit || e.unit);
  }
  // Add number
  plus(e) {
    return e = new Gt(e), new Gt(this + e, this.unit || e.unit);
  }
  // Multiply number
  times(e) {
    return e = new Gt(e), new Gt(this * e, this.unit || e.unit);
  }
  toArray() {
    return [this.value, this.unit];
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return (this.unit === "%" ? ~~(this.value * 1e8) / 1e6 : this.unit === "s" ? this.value / 1e3 : this.value) + this.unit;
  }
  valueOf() {
    return this.value;
  }
}
const af = [];
function vg(t) {
  af.push(t);
}
function yg(t, e, n) {
  if (t == null) {
    t = {}, e = this.node.attributes;
    for (const s of e)
      t[s.nodeName] = Pl.test(s.nodeValue) ? parseFloat(s.nodeValue) : s.nodeValue;
    return t;
  } else {
    if (t instanceof Array)
      return t.reduce((s, o) => (s[o] = this.attr(o), s), {});
    if (typeof t == "object" && t.constructor === Object)
      for (e in t) this.attr(e, t[e]);
    else if (e === null)
      this.node.removeAttribute(t);
    else {
      if (e == null)
        return e = this.node.getAttribute(t), e == null ? mg[t] : Pl.test(e) ? parseFloat(e) : e;
      e = af.reduce((s, o) => o(t, s, this), e), typeof e == "number" ? e = new Gt(e) : _e.isColor(e) ? e = new _e(e) : e.constructor === Array && (e = new wr(e)), t === "leading" ? this.leading && this.leading(e) : typeof n == "string" ? this.node.setAttributeNS(n, t, e.toString()) : this.node.setAttribute(t, e.toString()), this.rebuild && (t === "font-size" || t === "x") && this.rebuild();
    }
  }
  return this;
}
class kn extends os {
  constructor(e, n) {
    super(), this.node = e, this.type = e.nodeName, n && e !== n && this.attr(n);
  }
  // Add given element at a position
  add(e, n) {
    return e = ii(e), e.removeNamespace && this.node instanceof fe.window.SVGElement && e.removeNamespace(), n == null ? this.node.appendChild(e.node) : e.node !== this.node.childNodes[n] && this.node.insertBefore(e.node, this.node.childNodes[n]), this;
  }
  // Add element to given container and return self
  addTo(e, n) {
    return ii(e).put(this, n);
  }
  // Returns all child elements
  children() {
    return new Xn(Xo(this.node.children, function(e) {
      return Ii(e);
    }));
  }
  // Remove all elements in this container
  clear() {
    for (; this.node.hasChildNodes(); )
      this.node.removeChild(this.node.lastChild);
    return this;
  }
  // Clone element
  clone(e = !0, n = !0) {
    this.writeDataToDom();
    let s = this.node.cloneNode(e);
    return n && (s = Jh(s)), new this.constructor(s);
  }
  // Iterates over all children and invokes a given block
  each(e, n) {
    const s = this.children();
    let o, l;
    for (o = 0, l = s.length; o < l; o++)
      e.apply(s[o], [o, s]), n && s[o].each(e, n);
    return this;
  }
  element(e, n) {
    return this.put(new kn(Jr(e), n));
  }
  // Get first child
  first() {
    return Ii(this.node.firstChild);
  }
  // Get a element at the given index
  get(e) {
    return Ii(this.node.childNodes[e]);
  }
  getEventHolder() {
    return this.node;
  }
  getEventTarget() {
    return this.node;
  }
  // Checks if the given element is a child
  has(e) {
    return this.index(e) >= 0;
  }
  html(e, n) {
    return this.xml(e, n, y0);
  }
  // Get / set id
  id(e) {
    return typeof e > "u" && !this.node.id && (this.node.id = Qh(this.type)), this.attr("id", e);
  }
  // Gets index of given element
  index(e) {
    return [].slice.call(this.node.childNodes).indexOf(e.node);
  }
  // Get the last child
  last() {
    return Ii(this.node.lastChild);
  }
  // matches the element vs a css selector
  matches(e) {
    const n = this.node, s = n.matches || n.matchesSelector || n.msMatchesSelector || n.mozMatchesSelector || n.webkitMatchesSelector || n.oMatchesSelector || null;
    return s && s.call(n, e);
  }
  // Returns the parent element instance
  parent(e) {
    let n = this;
    if (!n.node.parentNode) return null;
    if (n = Ii(n.node.parentNode), !e) return n;
    do
      if (typeof e == "string" ? n.matches(e) : n instanceof e) return n;
    while (n = Ii(n.node.parentNode));
    return n;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(e, n) {
    return e = ii(e), this.add(e, n), e;
  }
  // Add element to given container and return container
  putIn(e, n) {
    return ii(e).add(this, n);
  }
  // Remove element
  remove() {
    return this.parent() && this.parent().removeElement(this), this;
  }
  // Remove a given child
  removeElement(e) {
    return this.node.removeChild(e.node), this;
  }
  // Replace this with element
  replace(e) {
    return e = ii(e), this.node.parentNode && this.node.parentNode.replaceChild(e.node, this.node), e;
  }
  round(e = 2, n = null) {
    const s = 10 ** e, o = this.attr(n);
    for (const l in o)
      typeof o[l] == "number" && (o[l] = Math.round(o[l] * s) / s);
    return this.attr(o), this;
  }
  // Import / Export raw svg
  svg(e, n) {
    return this.xml(e, n, Qo);
  }
  // Return id on string conversion
  toString() {
    return this.id();
  }
  words(e) {
    return this.node.textContent = e, this;
  }
  wrap(e) {
    const n = this.parent();
    if (!n)
      return this.addTo(e);
    const s = n.index(this);
    return n.put(e, s).put(this);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return this.each(function() {
      this.writeDataToDom();
    }), this;
  }
  // Import / Export raw svg
  xml(e, n, s) {
    if (typeof e == "boolean" && (s = n, n = e, e = null), e == null || typeof e == "function") {
      n = n ?? !0, this.writeDataToDom();
      let v = this;
      if (e != null) {
        if (v = Ii(v.node.cloneNode(!0)), n) {
          const k = e(v);
          if (v = k || v, k === !1) return "";
        }
        v.each(function() {
          const k = e(this), N = k || this;
          k === !1 ? this.remove() : k && this !== N && this.replace(N);
        }, !0);
      }
      return n ? v.node.outerHTML : v.node.innerHTML;
    }
    n = n ?? !1;
    const o = Jr("wrapper", s), l = fe.document.createDocumentFragment();
    o.innerHTML = e;
    for (let v = o.children.length; v--; )
      l.appendChild(o.firstElementChild);
    const _ = this.parent();
    return n ? this.replace(l) && _ : this.add(l);
  }
}
ne(kn, {
  attr: yg,
  find: cg,
  findOne: dg
});
oe(kn, "Dom");
let Ki = class extends kn {
  constructor(e, n) {
    super(e, n), this.dom = {}, this.node.instance = this, e.hasAttribute("svgjs:data") && this.setData(JSON.parse(e.getAttribute("svgjs:data")) || {});
  }
  // Move element by its center
  center(e, n) {
    return this.cx(e).cy(n);
  }
  // Move by center over x-axis
  cx(e) {
    return e == null ? this.x() + this.width() / 2 : this.x(e - this.width() / 2);
  }
  // Move by center over y-axis
  cy(e) {
    return e == null ? this.y() + this.height() / 2 : this.y(e - this.height() / 2);
  }
  // Get defs
  defs() {
    const e = this.root();
    return e && e.defs();
  }
  // Relative move over x and y axes
  dmove(e, n) {
    return this.dx(e).dy(n);
  }
  // Relative move over x axis
  dx(e = 0) {
    return this.x(new Gt(e).plus(this.x()));
  }
  // Relative move over y axis
  dy(e = 0) {
    return this.y(new Gt(e).plus(this.y()));
  }
  getEventHolder() {
    return this;
  }
  // Set height of element
  height(e) {
    return this.attr("height", e);
  }
  // Move element to given x and y values
  move(e, n) {
    return this.x(e).y(n);
  }
  // return array of all ancestors of given type up to the root svg
  parents(e = this.root()) {
    const n = typeof e == "string";
    n || (e = ii(e));
    const s = new Xn();
    let o = this;
    for (; (o = o.parent()) && o.node !== fe.document && o.nodeName !== "#document-fragment" && (s.push(o), !(!n && o.node === e.node || n && o.matches(e))); )
      if (o.node === this.root().node)
        return null;
    return s;
  }
  // Get referenced element form attribute value
  reference(e) {
    if (e = this.attr(e), !e) return null;
    const n = (e + "").match(z0);
    return n ? ii(n[1]) : null;
  }
  // Get parent document
  root() {
    const e = this.parent(x0(tu));
    return e && e.root();
  }
  // set given data to the elements data property
  setData(e) {
    return this.dom = e, this;
  }
  // Set element size to given width and height
  size(e, n) {
    const s = Ir(this, e, n);
    return this.width(new Gt(s.width)).height(new Gt(s.height));
  }
  // Set width of element
  width(e) {
    return this.attr("width", e);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return this.node.removeAttribute("svgjs:data"), Object.keys(this.dom).length && this.node.setAttribute("svgjs:data", JSON.stringify(this.dom)), super.writeDataToDom();
  }
  // Move over x-axis
  x(e) {
    return this.attr("x", e);
  }
  // Move over y-axis
  y(e) {
    return this.attr("y", e);
  }
};
ne(Ki, {
  bbox: ug,
  rbox: lg,
  inside: hg,
  point: rg,
  ctm: sg,
  screenCTM: ag
});
oe(Ki, "Element");
const Fr = {
  stroke: ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"],
  fill: ["color", "opacity", "rule"],
  prefix: function(t, e) {
    return e === "color" ? t : t + "-" + e;
  }
};
["fill", "stroke"].forEach(function(t) {
  const e = {};
  let n;
  e[t] = function(s) {
    if (typeof s > "u")
      return this.attr(t);
    if (typeof s == "string" || s instanceof _e || _e.isRgb(s) || s instanceof Ki)
      this.attr(t, s);
    else
      for (n = Fr[t].length - 1; n >= 0; n--)
        s[Fr[t][n]] != null && this.attr(Fr.prefix(t, Fr[t][n]), s[Fr[t][n]]);
    return this;
  }, Qt(["Element", "Runner"], e);
});
Qt(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(t, e, n, s, o, l) {
    return t == null ? new Nt(this) : this.attr("transform", new Nt(t, e, n, s, o, l));
  },
  // Map rotation to transform
  rotate: function(t, e, n) {
    return this.transform({
      rotate: t,
      ox: e,
      oy: n
    }, !0);
  },
  // Map skew to transform
  skew: function(t, e, n, s) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      skew: t,
      ox: e,
      oy: n
    }, !0) : this.transform({
      skew: [t, e],
      ox: n,
      oy: s
    }, !0);
  },
  shear: function(t, e, n) {
    return this.transform({
      shear: t,
      ox: e,
      oy: n
    }, !0);
  },
  // Map scale to transform
  scale: function(t, e, n, s) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      scale: t,
      ox: e,
      oy: n
    }, !0) : this.transform({
      scale: [t, e],
      ox: n,
      oy: s
    }, !0);
  },
  // Map translate to transform
  translate: function(t, e) {
    return this.transform({
      translate: [t, e]
    }, !0);
  },
  // Map relative translations to transform
  relative: function(t, e) {
    return this.transform({
      relative: [t, e]
    }, !0);
  },
  // Map flip to transform
  flip: function(t = "both", e = "center") {
    return "xybothtrue".indexOf(t) === -1 && (e = t, t = "both"), this.transform({
      flip: t,
      origin: e
    }, !0);
  },
  // Opacity
  opacity: function(t) {
    return this.attr("opacity", t);
  }
});
Qt("radius", {
  // Add x and y radius
  radius: function(t, e = t) {
    return (this._element || this).type === "radialGradient" ? this.attr("r", new Gt(t)) : this.rx(t).ry(e);
  }
});
Qt("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(t) {
    return new Re(this.node.getPointAtLength(t));
  }
});
Qt(["Element", "Runner"], {
  // Set font
  font: function(t, e) {
    if (typeof t == "object") {
      for (e in t) this.font(e, t[e]);
      return this;
    }
    return t === "leading" ? this.leading(e) : t === "anchor" ? this.attr("text-anchor", e) : t === "size" || t === "family" || t === "weight" || t === "stretch" || t === "variant" || t === "style" ? this.attr("font-" + t, e) : this.attr(t, e);
  }
});
const bg = ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchleave", "touchend", "touchcancel"].reduce(function(t, e) {
  const n = function(s) {
    return s === null ? this.off(e) : this.on(e, s), this;
  };
  return t[e] = n, t;
}, {});
Qt("Element", bg);
function xg() {
  return this.attr("transform", null);
}
function wg() {
  return (this.attr("transform") || "").split(D0).slice(0, -1).map(function(e) {
    const n = e.trim().split("(");
    return [n[0], n[1].split(un).map(function(s) {
      return parseFloat(s);
    })];
  }).reverse().reduce(function(e, n) {
    return n[0] === "matrix" ? e.lmultiply(Nt.fromArray(n[1])) : e[n[0]].apply(e, n[1]);
  }, new Nt());
}
function Sg(t, e) {
  if (this === t) return this;
  const n = this.screenCTM(), s = t.screenCTM().inverse();
  return this.addTo(t, e).untransform().transform(s.multiply(n)), this;
}
function Cg(t) {
  return this.toParent(this.root(), t);
}
function Ig(t, e) {
  if (t == null || typeof t == "string") {
    const o = new Nt(this).decompose();
    return t == null ? o : o[t];
  }
  Nt.isMatrixLike(t) || (t = {
    ...t,
    origin: vo(t, this)
  });
  const n = e === !0 ? this : e || !1, s = new Nt(n).transform(t);
  return this.attr("transform", s);
}
Qt("Element", {
  untransform: xg,
  matrixify: wg,
  toParent: Sg,
  toRoot: Cg,
  transform: Ig
});
class li extends Ki {
  flatten(e = this, n) {
    return this.each(function() {
      if (this instanceof li)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(e = this.parent(), n = e.index(this)) {
    return n = n === -1 ? e.children().length : n, this.each(function(s, o) {
      return o[o.length - s - 1].toParent(e, n);
    }), this.remove();
  }
}
oe(li, "Container");
class nu extends li {
  constructor(e, n = e) {
    super(Se("defs", e), n);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
oe(nu, "Defs");
class vi extends Ki {
}
oe(vi, "Shape");
function ru(t) {
  return this.attr("rx", t);
}
function su(t) {
  return this.attr("ry", t);
}
function of(t) {
  return t == null ? this.cx() - this.rx() : this.cx(t + this.rx());
}
function uf(t) {
  return t == null ? this.cy() - this.ry() : this.cy(t + this.ry());
}
function lf(t) {
  return this.attr("cx", t);
}
function hf(t) {
  return this.attr("cy", t);
}
function ff(t) {
  return t == null ? this.rx() * 2 : this.rx(new Gt(t).divide(2));
}
function cf(t) {
  return t == null ? this.ry() * 2 : this.ry(new Gt(t).divide(2));
}
var kg = {
  __proto__: null,
  rx: ru,
  ry: su,
  x: of,
  y: uf,
  cx: lf,
  cy: hf,
  width: ff,
  height: cf
};
class oa extends vi {
  constructor(e, n = e) {
    super(Se("ellipse", e), n);
  }
  size(e, n) {
    const s = Ir(this, e, n);
    return this.rx(new Gt(s.width).divide(2)).ry(new Gt(s.height).divide(2));
  }
}
ne(oa, kg);
Qt("Container", {
  // Create an ellipse
  ellipse: we(function(t = 0, e = t) {
    return this.put(new oa()).size(t, e).move(0, 0);
  })
});
oe(oa, "Ellipse");
class df extends kn {
  constructor(e = fe.document.createDocumentFragment()) {
    super(e);
  }
  // Import / Export raw xml
  xml(e, n, s) {
    if (typeof e == "boolean" && (s = n, n = e, e = null), e == null || typeof e == "function") {
      const o = new kn(Jr("wrapper", s));
      return o.add(this.node.cloneNode(!0)), o.xml(!1, s);
    }
    return super.xml(e, !1, s);
  }
}
oe(df, "Fragment");
function pf(t, e) {
  return (this._element || this).type === "radialGradient" ? this.attr({
    fx: new Gt(t),
    fy: new Gt(e)
  }) : this.attr({
    x1: new Gt(t),
    y1: new Gt(e)
  });
}
function gf(t, e) {
  return (this._element || this).type === "radialGradient" ? this.attr({
    cx: new Gt(t),
    cy: new Gt(e)
  }) : this.attr({
    x2: new Gt(t),
    y2: new Gt(e)
  });
}
var Pg = {
  __proto__: null,
  from: pf,
  to: gf
};
class us extends li {
  constructor(e, n) {
    super(Se(e + "Gradient", typeof e == "string" ? null : e), n);
  }
  // custom attr to handle transform
  attr(e, n, s) {
    return e === "transform" && (e = "gradientTransform"), super.attr(e, n, s);
  }
  bbox() {
    return new Xe();
  }
  targets() {
    return kr("svg [fill*=" + this.id() + "]");
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update gradient
  update(e) {
    return this.clear(), typeof e == "function" && e.call(this, this), this;
  }
  // Return the fill id
  url() {
    return "url(#" + this.id() + ")";
  }
}
ne(us, Pg);
Qt({
  Container: {
    // Create gradient element in defs
    gradient(...t) {
      return this.defs().gradient(...t);
    }
  },
  // define gradient
  Defs: {
    gradient: we(function(t, e) {
      return this.put(new us(t)).update(e);
    })
  }
});
oe(us, "Gradient");
class ts extends li {
  // Initialize node
  constructor(e, n = e) {
    super(Se("pattern", e), n);
  }
  // custom attr to handle transform
  attr(e, n, s) {
    return e === "transform" && (e = "patternTransform"), super.attr(e, n, s);
  }
  bbox() {
    return new Xe();
  }
  targets() {
    return kr("svg [fill*=" + this.id() + "]");
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update pattern by rebuilding
  update(e) {
    return this.clear(), typeof e == "function" && e.call(this, this), this;
  }
  // Return the fill id
  url() {
    return "url(#" + this.id() + ")";
  }
}
Qt({
  Container: {
    // Create pattern element in defs
    pattern(...t) {
      return this.defs().pattern(...t);
    }
  },
  Defs: {
    pattern: we(function(t, e, n) {
      return this.put(new ts()).update(n).attr({
        x: 0,
        y: 0,
        width: t,
        height: e,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
oe(ts, "Pattern");
class ua extends vi {
  constructor(e, n = e) {
    super(Se("image", e), n);
  }
  // (re)load image
  load(e, n) {
    if (!e) return this;
    const s = new fe.window.Image();
    return yo(s, "load", function(o) {
      const l = this.parent(ts);
      this.width() === 0 && this.height() === 0 && this.size(s.width, s.height), l instanceof ts && l.width() === 0 && l.height() === 0 && l.size(this.width(), this.height()), typeof n == "function" && n.call(this, o);
    }, this), yo(s, "load error", function() {
      gr(s);
    }), this.attr("href", s.src = e, as);
  }
}
vg(function(t, e, n) {
  return (t === "fill" || t === "stroke") && B0.test(e) && (e = n.root().defs().image(e)), e instanceof ua && (e = n.root().defs().pattern(0, 0, (s) => {
    s.add(e);
  })), e;
});
Qt({
  Container: {
    // create image element, load image and set its size
    image: we(function(t, e) {
      return this.put(new ua()).size(0, 0).load(t, e);
    })
  }
});
oe(ua, "Image");
class Pn extends wr {
  // Get bounding box of points
  bbox() {
    let e = -1 / 0, n = -1 / 0, s = 1 / 0, o = 1 / 0;
    return this.forEach(function(l) {
      e = Math.max(l[0], e), n = Math.max(l[1], n), s = Math.min(l[0], s), o = Math.min(l[1], o);
    }), new Xe(s, o, e - s, n - o);
  }
  // Move point string
  move(e, n) {
    const s = this.bbox();
    if (e -= s.x, n -= s.y, !isNaN(e) && !isNaN(n))
      for (let o = this.length - 1; o >= 0; o--)
        this[o] = [this[o][0] + e, this[o][1] + n];
    return this;
  }
  // Parse point string and flat array
  parse(e = [0, 0]) {
    const n = [];
    e instanceof Array ? e = Array.prototype.concat.apply([], e) : e = e.trim().split(un).map(parseFloat), e.length % 2 !== 0 && e.pop();
    for (let s = 0, o = e.length; s < o; s = s + 2)
      n.push([e[s], e[s + 1]]);
    return n;
  }
  // Resize poly string
  size(e, n) {
    let s;
    const o = this.bbox();
    for (s = this.length - 1; s >= 0; s--)
      o.width && (this[s][0] = (this[s][0] - o.x) * e / o.width + o.x), o.height && (this[s][1] = (this[s][1] - o.y) * n / o.height + o.y);
    return this;
  }
  // Convert array to line object
  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  }
  // Convert array to string
  toString() {
    const e = [];
    for (let n = 0, s = this.length; n < s; n++)
      e.push(this[n].join(","));
    return e.join(" ");
  }
  transform(e) {
    return this.clone().transformO(e);
  }
  // transform points with matrix (similar to Point.transform)
  transformO(e) {
    Nt.isMatrixLike(e) || (e = new Nt(e));
    for (let n = this.length; n--; ) {
      const [s, o] = this[n];
      this[n][0] = e.a * s + e.c * o + e.e, this[n][1] = e.b * s + e.d * o + e.f;
    }
    return this;
  }
}
const Ag = Pn;
function Tg(t) {
  return t == null ? this.bbox().x : this.move(t, this.bbox().y);
}
function Eg(t) {
  return t == null ? this.bbox().y : this.move(this.bbox().x, t);
}
function Og(t) {
  const e = this.bbox();
  return t == null ? e.width : this.size(t, e.height);
}
function Mg(t) {
  const e = this.bbox();
  return t == null ? e.height : this.size(e.width, t);
}
var au = {
  __proto__: null,
  MorphArray: Ag,
  x: Tg,
  y: Eg,
  width: Og,
  height: Mg
};
class es extends vi {
  // Initialize node
  constructor(e, n = e) {
    super(Se("line", e), n);
  }
  // Get array
  array() {
    return new Pn([[this.attr("x1"), this.attr("y1")], [this.attr("x2"), this.attr("y2")]]);
  }
  // Move by left top corner
  move(e, n) {
    return this.attr(this.array().move(e, n).toLine());
  }
  // Overwrite native plot() method
  plot(e, n, s, o) {
    return e == null ? this.array() : (typeof n < "u" ? e = {
      x1: e,
      y1: n,
      x2: s,
      y2: o
    } : e = new Pn(e).toLine(), this.attr(e));
  }
  // Set element size to given width and height
  size(e, n) {
    const s = Ir(this, e, n);
    return this.attr(this.array().size(s.width, s.height).toLine());
  }
}
ne(es, au);
Qt({
  Container: {
    // Create a line element
    line: we(function(...t) {
      return es.prototype.plot.apply(this.put(new es()), t[0] != null ? t : [0, 0, 0, 0]);
    })
  }
});
oe(es, "Line");
class qs extends li {
  // Initialize node
  constructor(e, n = e) {
    super(Se("marker", e), n);
  }
  // Set height of element
  height(e) {
    return this.attr("markerHeight", e);
  }
  orient(e) {
    return this.attr("orient", e);
  }
  // Set marker refX and refY
  ref(e, n) {
    return this.attr("refX", e).attr("refY", n);
  }
  // Return the fill id
  toString() {
    return "url(#" + this.id() + ")";
  }
  // Update marker
  update(e) {
    return this.clear(), typeof e == "function" && e.call(this, this), this;
  }
  // Set width of element
  width(e) {
    return this.attr("markerWidth", e);
  }
}
Qt({
  Container: {
    marker(...t) {
      return this.defs().marker(...t);
    }
  },
  Defs: {
    // Create marker
    marker: we(function(t, e, n) {
      return this.put(new qs()).size(t, e).ref(t / 2, e / 2).viewbox(0, 0, t, e).attr("orient", "auto").update(n);
    })
  },
  marker: {
    // Create and attach markers
    marker(t, e, n, s) {
      let o = ["marker"];
      return t !== "all" && o.push(t), o = o.join("-"), t = arguments[1] instanceof qs ? arguments[1] : this.defs().marker(e, n, s), this.attr(o, t);
    }
  }
});
oe(qs, "Marker");
function _r(t, e) {
  return function(n) {
    return n == null ? this[t] : (this[t] = n, e && e.call(this), this);
  };
}
const Lg = {
  "-": function(t) {
    return t;
  },
  "<>": function(t) {
    return -Math.cos(t * Math.PI) / 2 + 0.5;
  },
  ">": function(t) {
    return Math.sin(t * Math.PI / 2);
  },
  "<": function(t) {
    return -Math.cos(t * Math.PI / 2) + 1;
  },
  bezier: function(t, e, n, s) {
    return function(o) {
      return o < 0 ? t > 0 ? e / t * o : n > 0 ? s / n * o : 0 : o > 1 ? n < 1 ? (1 - s) / (1 - n) * o + (s - n) / (1 - n) : t < 1 ? (1 - e) / (1 - t) * o + (e - t) / (1 - t) : 1 : 3 * o * (1 - o) ** 2 * e + 3 * o ** 2 * (1 - o) * s + o ** 3;
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function(t, e = "end") {
    e = e.split("-").reverse()[0];
    let n = t;
    return e === "none" ? --n : e === "both" && ++n, (s, o = !1) => {
      let l = Math.floor(s * t);
      const _ = s * l % 1 === 0;
      return (e === "start" || e === "both") && ++l, o && _ && --l, s >= 0 && l < 0 && (l = 0), s <= 1 && l > n && (l = n), l / n;
    };
  }
};
class ou {
  done() {
    return !1;
  }
}
class bo extends ou {
  constructor(e = Dr.ease) {
    super(), this.ease = Lg[e] || e;
  }
  step(e, n, s) {
    return typeof e != "number" ? s < 1 ? e : n : e + (n - e) * this.ease(s);
  }
}
class js extends ou {
  constructor(e) {
    super(), this.stepper = e;
  }
  done(e) {
    return e.done;
  }
  step(e, n, s, o) {
    return this.stepper(e, n, s, o);
  }
}
function Tl() {
  const t = (this._duration || 500) / 1e3, e = this._overshoot || 0, n = 1e-10, s = Math.PI, o = Math.log(e / 100 + n), l = -o / Math.sqrt(s * s + o * o), _ = 3.9 / (l * t);
  this.d = 2 * l * _, this.k = _ * _;
}
class Ng extends js {
  constructor(e = 500, n = 0) {
    super(), this.duration(e).overshoot(n);
  }
  step(e, n, s, o) {
    if (typeof e == "string") return e;
    if (o.done = s === 1 / 0, s === 1 / 0) return n;
    if (s === 0) return e;
    s > 100 && (s = 16), s /= 1e3;
    const l = o.velocity || 0, _ = -this.d * l - this.k * (e - n), v = e + l * s + _ * s * s / 2;
    return o.velocity = l + _ * s, o.done = Math.abs(n - v) + Math.abs(l) < 2e-3, o.done ? n : v;
  }
}
ne(Ng, {
  duration: _r("_duration", Tl),
  overshoot: _r("_overshoot", Tl)
});
class Rg extends js {
  constructor(e = 0.1, n = 0.01, s = 0, o = 1e3) {
    super(), this.p(e).i(n).d(s).windup(o);
  }
  step(e, n, s, o) {
    if (typeof e == "string") return e;
    if (o.done = s === 1 / 0, s === 1 / 0) return n;
    if (s === 0) return e;
    const l = n - e;
    let _ = (o.integral || 0) + l * s;
    const v = (l - (o.error || 0)) / s, k = this._windup;
    return k !== !1 && (_ = Math.max(-k, Math.min(_, k))), o.error = l, o.integral = _, o.done = Math.abs(l) < 1e-3, o.done ? n : e + (this.P * l + this.I * _ + this.D * v);
  }
}
ne(Rg, {
  windup: _r("_windup"),
  p: _r("P"),
  i: _r("I"),
  d: _r("D")
});
const Fg = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
}, xo = {
  M: function(t, e, n) {
    return e.x = n.x = t[0], e.y = n.y = t[1], ["M", e.x, e.y];
  },
  L: function(t, e) {
    return e.x = t[0], e.y = t[1], ["L", t[0], t[1]];
  },
  H: function(t, e) {
    return e.x = t[0], ["H", t[0]];
  },
  V: function(t, e) {
    return e.y = t[0], ["V", t[0]];
  },
  C: function(t, e) {
    return e.x = t[4], e.y = t[5], ["C", t[0], t[1], t[2], t[3], t[4], t[5]];
  },
  S: function(t, e) {
    return e.x = t[2], e.y = t[3], ["S", t[0], t[1], t[2], t[3]];
  },
  Q: function(t, e) {
    return e.x = t[2], e.y = t[3], ["Q", t[0], t[1], t[2], t[3]];
  },
  T: function(t, e) {
    return e.x = t[0], e.y = t[1], ["T", t[0], t[1]];
  },
  Z: function(t, e, n) {
    return e.x = n.x, e.y = n.y, ["Z"];
  },
  A: function(t, e) {
    return e.x = t[5], e.y = t[6], ["A", t[0], t[1], t[2], t[3], t[4], t[5], t[6]];
  }
}, Qa = "mlhvqtcsaz".split("");
for (let t = 0, e = Qa.length; t < e; ++t)
  xo[Qa[t]] = /* @__PURE__ */ function(n) {
    return function(s, o, l) {
      if (n === "H") s[0] = s[0] + o.x;
      else if (n === "V") s[0] = s[0] + o.y;
      else if (n === "A")
        s[5] = s[5] + o.x, s[6] = s[6] + o.y;
      else
        for (let _ = 0, v = s.length; _ < v; ++_)
          s[_] = s[_] + (_ % 2 ? o.y : o.x);
      return xo[n](s, o, l);
    };
  }(Qa[t].toUpperCase());
function zg(t) {
  const e = t.segment[0];
  return xo[e](t.segment.slice(1), t.p, t.p0);
}
function wo(t) {
  return t.segment.length && t.segment.length - 1 === Fg[t.segment[0].toUpperCase()];
}
function Dg(t, e) {
  t.inNumber && jn(t, !1);
  const n = eu.test(e);
  if (n)
    t.segment = [e];
  else {
    const s = t.lastCommand, o = s.toLowerCase(), l = s === o;
    t.segment = [o === "m" ? l ? "l" : "L" : s];
  }
  return t.inSegment = !0, t.lastCommand = t.segment[0], n;
}
function jn(t, e) {
  if (!t.inNumber) throw new Error("Parser Error");
  t.number && t.segment.push(parseFloat(t.number)), t.inNumber = e, t.number = "", t.pointSeen = !1, t.hasExponent = !1, wo(t) && So(t);
}
function So(t) {
  t.inSegment = !1, t.absolute && (t.segment = zg(t)), t.segments.push(t.segment);
}
function Vg(t) {
  if (!t.segment.length) return !1;
  const e = t.segment[0].toUpperCase() === "A", n = t.segment.length;
  return e && (n === 4 || n === 5);
}
function Bg(t) {
  return t.lastToken.toUpperCase() === "E";
}
function Ug(t, e = !0) {
  let n = 0, s = "";
  const o = {
    segment: [],
    inNumber: !1,
    number: "",
    lastToken: "",
    inSegment: !1,
    segments: [],
    pointSeen: !1,
    hasExponent: !1,
    absolute: e,
    p0: new Re(),
    p: new Re()
  };
  for (; o.lastToken = s, s = t.charAt(n++); )
    if (!(!o.inSegment && Dg(o, s))) {
      if (s === ".") {
        if (o.pointSeen || o.hasExponent) {
          jn(o, !1), --n;
          continue;
        }
        o.inNumber = !0, o.pointSeen = !0, o.number += s;
        continue;
      }
      if (!isNaN(parseInt(s))) {
        if (o.number === "0" || Vg(o)) {
          o.inNumber = !0, o.number = s, jn(o, !0);
          continue;
        }
        o.inNumber = !0, o.number += s;
        continue;
      }
      if (s === " " || s === ",") {
        o.inNumber && jn(o, !1);
        continue;
      }
      if (s === "-") {
        if (o.inNumber && !Bg(o)) {
          jn(o, !1), --n;
          continue;
        }
        o.number += s, o.inNumber = !0;
        continue;
      }
      if (s.toUpperCase() === "E") {
        o.number += s, o.hasExponent = !0;
        continue;
      }
      if (eu.test(s)) {
        if (o.inNumber)
          jn(o, !1);
        else if (wo(o))
          So(o);
        else
          throw new Error("parser Error");
        --n;
      }
    }
  return o.inNumber && jn(o, !1), o.inSegment && wo(o) && So(o), o.segments;
}
function qg(t) {
  let e = "";
  for (let n = 0, s = t.length; n < s; n++)
    e += t[n][0], t[n][1] != null && (e += t[n][1], t[n][2] != null && (e += " ", e += t[n][2], t[n][3] != null && (e += " ", e += t[n][3], e += " ", e += t[n][4], t[n][5] != null && (e += " ", e += t[n][5], e += " ", e += t[n][6], t[n][7] != null && (e += " ", e += t[n][7])))));
  return e + " ";
}
class Qn extends wr {
  // Get bounding box of path
  bbox() {
    return xn().path.setAttribute("d", this.toString()), new Xe(xn.nodes.path.getBBox());
  }
  // Move path string
  move(e, n) {
    const s = this.bbox();
    if (e -= s.x, n -= s.y, !isNaN(e) && !isNaN(n))
      for (let o, l = this.length - 1; l >= 0; l--)
        o = this[l][0], o === "M" || o === "L" || o === "T" ? (this[l][1] += e, this[l][2] += n) : o === "H" ? this[l][1] += e : o === "V" ? this[l][1] += n : o === "C" || o === "S" || o === "Q" ? (this[l][1] += e, this[l][2] += n, this[l][3] += e, this[l][4] += n, o === "C" && (this[l][5] += e, this[l][6] += n)) : o === "A" && (this[l][6] += e, this[l][7] += n);
    return this;
  }
  // Absolutize and parse path to array
  parse(e = "M0 0") {
    return Array.isArray(e) && (e = Array.prototype.concat.apply([], e).toString()), Ug(e);
  }
  // Resize path string
  size(e, n) {
    const s = this.bbox();
    let o, l;
    for (s.width = s.width === 0 ? 1 : s.width, s.height = s.height === 0 ? 1 : s.height, o = this.length - 1; o >= 0; o--)
      l = this[o][0], l === "M" || l === "L" || l === "T" ? (this[o][1] = (this[o][1] - s.x) * e / s.width + s.x, this[o][2] = (this[o][2] - s.y) * n / s.height + s.y) : l === "H" ? this[o][1] = (this[o][1] - s.x) * e / s.width + s.x : l === "V" ? this[o][1] = (this[o][1] - s.y) * n / s.height + s.y : l === "C" || l === "S" || l === "Q" ? (this[o][1] = (this[o][1] - s.x) * e / s.width + s.x, this[o][2] = (this[o][2] - s.y) * n / s.height + s.y, this[o][3] = (this[o][3] - s.x) * e / s.width + s.x, this[o][4] = (this[o][4] - s.y) * n / s.height + s.y, l === "C" && (this[o][5] = (this[o][5] - s.x) * e / s.width + s.x, this[o][6] = (this[o][6] - s.y) * n / s.height + s.y)) : l === "A" && (this[o][1] = this[o][1] * e / s.width, this[o][2] = this[o][2] * n / s.height, this[o][6] = (this[o][6] - s.x) * e / s.width + s.x, this[o][7] = (this[o][7] - s.y) * n / s.height + s.y);
    return this;
  }
  // Convert array to string
  toString() {
    return qg(this);
  }
}
const _f = (t) => {
  const e = typeof t;
  return e === "number" ? Gt : e === "string" ? _e.isColor(t) ? _e : un.test(t) ? eu.test(t) ? Qn : wr : tf.test(t) ? Gt : Co : uu.indexOf(t.constructor) > -1 ? t.constructor : Array.isArray(t) ? wr : e === "object" ? is : Co;
};
class Hn {
  constructor(e) {
    this._stepper = e || new bo("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
  }
  at(e) {
    return this._morphObj.morph(this._from, this._to, e, this._stepper, this._context);
  }
  done() {
    return this._context.map(this._stepper.done).reduce(function(n, s) {
      return n && s;
    }, !0);
  }
  from(e) {
    return e == null ? this._from : (this._from = this._set(e), this);
  }
  stepper(e) {
    return e == null ? this._stepper : (this._stepper = e, this);
  }
  to(e) {
    return e == null ? this._to : (this._to = this._set(e), this);
  }
  type(e) {
    return e == null ? this._type : (this._type = e, this);
  }
  _set(e) {
    this._type || this.type(_f(e));
    let n = new this._type(e);
    return this._type === _e && (n = this._to ? n[this._to[4]]() : this._from ? n[this._from[4]]() : n), this._type === is && (n = this._to ? n.align(this._to) : this._from ? n.align(this._from) : n), n = n.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(n.length)).map(Object).map(function(s) {
      return s.done = !0, s;
    }), n;
  }
}
class Co {
  constructor(...e) {
    this.init(...e);
  }
  init(e) {
    return e = Array.isArray(e) ? e[0] : e, this.value = e, this;
  }
  toArray() {
    return [this.value];
  }
  valueOf() {
    return this.value;
  }
}
class ls {
  constructor(...e) {
    this.init(...e);
  }
  init(e) {
    return Array.isArray(e) && (e = {
      scaleX: e[0],
      scaleY: e[1],
      shear: e[2],
      rotate: e[3],
      translateX: e[4],
      translateY: e[5],
      originX: e[6],
      originY: e[7]
    }), Object.assign(this, ls.defaults, e), this;
  }
  toArray() {
    const e = this;
    return [e.scaleX, e.scaleY, e.shear, e.rotate, e.translateX, e.translateY, e.originX, e.originY];
  }
}
ls.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const jg = (t, e) => t[0] < e[0] ? -1 : t[0] > e[0] ? 1 : 0;
class is {
  constructor(...e) {
    this.init(...e);
  }
  align(e) {
    const n = this.values;
    for (let s = 0, o = n.length; s < o; ++s) {
      if (n[s + 1] === e[s + 1]) {
        if (n[s + 1] === _e && e[s + 7] !== n[s + 7]) {
          const v = e[s + 7], k = new _e(this.values.splice(s + 3, 5))[v]().toArray();
          this.values.splice(s + 3, 0, ...k);
        }
        s += n[s + 2] + 2;
        continue;
      }
      if (!e[s + 1])
        return this;
      const l = new e[s + 1]().toArray(), _ = n[s + 2] + 3;
      n.splice(s, _, e[s], e[s + 1], e[s + 2], ...l), s += n[s + 2] + 2;
    }
    return this;
  }
  init(e) {
    if (this.values = [], Array.isArray(e)) {
      this.values = e.slice();
      return;
    }
    e = e || {};
    const n = [];
    for (const s in e) {
      const o = _f(e[s]), l = new o(e[s]).toArray();
      n.push([s, o, l.length, ...l]);
    }
    return n.sort(jg), this.values = n.reduce((s, o) => s.concat(o), []), this;
  }
  toArray() {
    return this.values;
  }
  valueOf() {
    const e = {}, n = this.values;
    for (; n.length; ) {
      const s = n.shift(), o = n.shift(), l = n.shift(), _ = n.splice(0, l);
      e[s] = new o(_);
    }
    return e;
  }
}
const uu = [Co, ls, is];
function Hg(t = []) {
  uu.push(...[].concat(t));
}
function Wg() {
  ne(uu, {
    to(t) {
      return new Hn().type(this.constructor).from(this.toArray()).to(t);
    },
    fromArray(t) {
      return this.init(t), this;
    },
    toConsumable() {
      return this.toArray();
    },
    morph(t, e, n, s, o) {
      const l = function(_, v) {
        return s.step(_, e[v], n, o[v], o);
      };
      return this.fromArray(t.map(l));
    }
  });
}
class Pr extends vi {
  // Initialize node
  constructor(e, n = e) {
    super(Se("path", e), n);
  }
  // Get array
  array() {
    return this._array || (this._array = new Qn(this.attr("d")));
  }
  // Clear array cache
  clear() {
    return delete this._array, this;
  }
  // Set height of element
  height(e) {
    return e == null ? this.bbox().height : this.size(this.bbox().width, e);
  }
  // Move by left top corner
  move(e, n) {
    return this.attr("d", this.array().move(e, n));
  }
  // Plot new path
  plot(e) {
    return e == null ? this.array() : this.clear().attr("d", typeof e == "string" ? e : this._array = new Qn(e));
  }
  // Set element size to given width and height
  size(e, n) {
    const s = Ir(this, e, n);
    return this.attr("d", this.array().size(s.width, s.height));
  }
  // Set width of element
  width(e) {
    return e == null ? this.bbox().width : this.size(e, this.bbox().height);
  }
  // Move by left top corner over x-axis
  x(e) {
    return e == null ? this.bbox().x : this.move(e, this.bbox().y);
  }
  // Move by left top corner over y-axis
  y(e) {
    return e == null ? this.bbox().y : this.move(this.bbox().x, e);
  }
}
Pr.prototype.MorphArray = Qn;
Qt({
  Container: {
    // Create a wrapped path element
    path: we(function(t) {
      return this.put(new Pr()).plot(t || new Qn());
    })
  }
});
oe(Pr, "Path");
function Gg() {
  return this._array || (this._array = new Pn(this.attr("points")));
}
function Zg() {
  return delete this._array, this;
}
function Kg(t, e) {
  return this.attr("points", this.array().move(t, e));
}
function Yg(t) {
  return t == null ? this.array() : this.clear().attr("points", typeof t == "string" ? t : this._array = new Pn(t));
}
function $g(t, e) {
  const n = Ir(this, t, e);
  return this.attr("points", this.array().size(n.width, n.height));
}
var mf = {
  __proto__: null,
  array: Gg,
  clear: Zg,
  move: Kg,
  plot: Yg,
  size: $g
};
class hs extends vi {
  // Initialize node
  constructor(e, n = e) {
    super(Se("polygon", e), n);
  }
}
Qt({
  Container: {
    // Create a wrapped polygon element
    polygon: we(function(t) {
      return this.put(new hs()).plot(t || new Pn());
    })
  }
});
ne(hs, au);
ne(hs, mf);
oe(hs, "Polygon");
class fs extends vi {
  // Initialize node
  constructor(e, n = e) {
    super(Se("polyline", e), n);
  }
}
Qt({
  Container: {
    // Create a wrapped polygon element
    polyline: we(function(t) {
      return this.put(new fs()).plot(t || new Pn());
    })
  }
});
ne(fs, au);
ne(fs, mf);
oe(fs, "Polyline");
class la extends vi {
  // Initialize node
  constructor(e, n = e) {
    super(Se("rect", e), n);
  }
}
ne(la, {
  rx: ru,
  ry: su
});
Qt({
  Container: {
    // Create a rect element
    rect: we(function(t, e) {
      return this.put(new la()).size(t, e);
    })
  }
});
oe(la, "Rect");
class Ja {
  constructor() {
    this._first = null, this._last = null;
  }
  // Shows us the first item in the list
  first() {
    return this._first && this._first.value;
  }
  // Shows us the last item in the list
  last() {
    return this._last && this._last.value;
  }
  push(e) {
    const n = typeof e.next < "u" ? e : {
      value: e,
      next: null,
      prev: null
    };
    return this._last ? (n.prev = this._last, this._last.next = n, this._last = n) : (this._last = n, this._first = n), n;
  }
  // Removes the item that was returned from the push
  remove(e) {
    e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e === this._last && (this._last = e.prev), e === this._first && (this._first = e.next), e.prev = null, e.next = null;
  }
  shift() {
    const e = this._first;
    return e ? (this._first = e.next, this._first && (this._first.prev = null), this._last = this._first ? this._last : null, e.value) : null;
  }
}
const de = {
  nextDraw: null,
  frames: new Ja(),
  timeouts: new Ja(),
  immediates: new Ja(),
  timer: () => fe.window.performance || fe.window.Date,
  transforms: [],
  frame(t) {
    const e = de.frames.push({
      run: t
    });
    return de.nextDraw === null && (de.nextDraw = fe.window.requestAnimationFrame(de._draw)), e;
  },
  timeout(t, e) {
    e = e || 0;
    const n = de.timer().now() + e, s = de.timeouts.push({
      run: t,
      time: n
    });
    return de.nextDraw === null && (de.nextDraw = fe.window.requestAnimationFrame(de._draw)), s;
  },
  immediate(t) {
    const e = de.immediates.push(t);
    return de.nextDraw === null && (de.nextDraw = fe.window.requestAnimationFrame(de._draw)), e;
  },
  cancelFrame(t) {
    t != null && de.frames.remove(t);
  },
  clearTimeout(t) {
    t != null && de.timeouts.remove(t);
  },
  cancelImmediate(t) {
    t != null && de.immediates.remove(t);
  },
  _draw(t) {
    let e = null;
    const n = de.timeouts.last();
    for (; (e = de.timeouts.shift()) && (t >= e.time ? e.run() : de.timeouts.push(e), e !== n); )
      ;
    let s = null;
    const o = de.frames.last();
    for (; s !== o && (s = de.frames.shift()); )
      s.run(t);
    let l = null;
    for (; l = de.immediates.shift(); )
      l();
    de.nextDraw = de.timeouts.first() || de.frames.first() ? fe.window.requestAnimationFrame(de._draw) : null;
  }
}, Xg = function(t) {
  const e = t.start, n = t.runner.duration(), s = e + n;
  return {
    start: e,
    duration: n,
    end: s,
    runner: t.runner
  };
}, Qg = function() {
  const t = fe.window;
  return (t.performance || t.Date).now();
};
class vf extends os {
  // Construct a new timeline on the given element
  constructor(e = Qg) {
    super(), this._timeSource = e, this._startTime = 0, this._speed = 1, this._persist = 0, this._nextFrame = null, this._paused = !0, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
  }
  active() {
    return !!this._nextFrame;
  }
  finish() {
    return this.time(this.getEndTimeOfTimeline() + 1), this.pause();
  }
  // Calculates the end of the timeline
  getEndTime() {
    const e = this.getLastRunnerInfo(), n = e ? e.runner.duration() : 0;
    return (e ? e.start : this._time) + n;
  }
  getEndTimeOfTimeline() {
    const e = this._runners.map((n) => n.start + n.runner.duration());
    return Math.max(0, ...e);
  }
  getLastRunnerInfo() {
    return this.getRunnerInfoById(this._lastRunnerId);
  }
  getRunnerInfoById(e) {
    return this._runners[this._runnerIds.indexOf(e)] || null;
  }
  pause() {
    return this._paused = !0, this._continue();
  }
  persist(e) {
    return e == null ? this._persist : (this._persist = e, this);
  }
  play() {
    return this._paused = !1, this.updateTime()._continue();
  }
  reverse(e) {
    const n = this.speed();
    if (e == null) return this.speed(-n);
    const s = Math.abs(n);
    return this.speed(e ? -s : s);
  }
  // schedules a runner on the timeline
  schedule(e, n, s) {
    if (e == null)
      return this._runners.map(Xg);
    let o = 0;
    const l = this.getEndTime();
    if (n = n || 0, s == null || s === "last" || s === "after")
      o = l;
    else if (s === "absolute" || s === "start")
      o = n, n = 0;
    else if (s === "now")
      o = this._time;
    else if (s === "relative") {
      const k = this.getRunnerInfoById(e.id);
      k && (o = k.start + n, n = 0);
    } else if (s === "with-last") {
      const k = this.getLastRunnerInfo();
      o = k ? k.start : this._time;
    } else
      throw new Error('Invalid value for the "when" parameter');
    e.unschedule(), e.timeline(this);
    const _ = e.persist(), v = {
      persist: _ === null ? this._persist : _,
      start: o + n,
      runner: e
    };
    return this._lastRunnerId = e.id, this._runners.push(v), this._runners.sort((k, N) => k.start - N.start), this._runnerIds = this._runners.map((k) => k.runner.id), this.updateTime()._continue(), this;
  }
  seek(e) {
    return this.time(this._time + e);
  }
  source(e) {
    return e == null ? this._timeSource : (this._timeSource = e, this);
  }
  speed(e) {
    return e == null ? this._speed : (this._speed = e, this);
  }
  stop() {
    return this.time(0), this.pause();
  }
  time(e) {
    return e == null ? this._time : (this._time = e, this._continue(!0));
  }
  // Remove the runner from this timeline
  unschedule(e) {
    const n = this._runnerIds.indexOf(e.id);
    return n < 0 ? this : (this._runners.splice(n, 1), this._runnerIds.splice(n, 1), e.timeline(null), this);
  }
  // Makes sure, that after pausing the time doesn't jump
  updateTime() {
    return this.active() || (this._lastSourceTime = this._timeSource()), this;
  }
  // Checks if we are running and continues the animation
  _continue(e = !1) {
    return de.cancelFrame(this._nextFrame), this._nextFrame = null, e ? this._stepImmediate() : this._paused ? this : (this._nextFrame = de.frame(this._step), this);
  }
  _stepFn(e = !1) {
    const n = this._timeSource();
    let s = n - this._lastSourceTime;
    e && (s = 0);
    const o = this._speed * s + (this._time - this._lastStepTime);
    this._lastSourceTime = n, e || (this._time += o, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);
    for (let _ = this._runners.length; _--; ) {
      const v = this._runners[_], k = v.runner;
      this._time - v.start <= 0 && k.reset();
    }
    let l = !1;
    for (let _ = 0, v = this._runners.length; _ < v; _++) {
      const k = this._runners[_], N = k.runner;
      let z = o;
      const q = this._time - k.start;
      if (q <= 0) {
        l = !0;
        continue;
      } else q < z && (z = q);
      if (!N.active()) continue;
      N.step(z).done ? k.persist !== !0 && N.duration() - N.time() + this._time + k.persist < this._time && (N.unschedule(), --_, --v) : l = !0;
    }
    return l && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished")), this;
  }
}
Qt({
  Element: {
    timeline: function(t) {
      return t == null ? (this._timeline = this._timeline || new vf(), this._timeline) : (this._timeline = t, this);
    }
  }
});
class mi extends os {
  constructor(e) {
    super(), this.id = mi.id++, e = e ?? Dr.duration, e = typeof e == "function" ? new js(e) : e, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof e == "number" && e, this._isDeclarative = e instanceof js, this._stepper = this._isDeclarative ? e : new bo(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new Nt(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(e, n, s) {
    let o = 1, l = !1, _ = 0;
    return e = e || Dr.duration, n = n || Dr.delay, s = s || "last", typeof e == "object" && !(e instanceof ou) && (n = e.delay || n, s = e.when || s, l = e.swing || l, o = e.times || o, _ = e.wait || _, e = e.duration || Dr.duration), {
      duration: e,
      delay: n,
      swing: l,
      times: o,
      wait: _,
      when: s
    };
  }
  active(e) {
    return e == null ? this.enabled : (this.enabled = e, this);
  }
  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */
  addTransform(e, n) {
    return this.transforms.lmultiplyO(e), this;
  }
  after(e) {
    return this.on("finished", e);
  }
  animate(e, n, s) {
    const o = mi.sanitise(e, n, s), l = new mi(o.duration);
    return this._timeline && l.timeline(this._timeline), this._element && l.element(this._element), l.loop(o).schedule(o.delay, o.when);
  }
  clearTransform() {
    return this.transforms = new Nt(), this;
  }
  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue() {
    (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) && (this._queue = this._queue.filter((e) => !e.isTransform));
  }
  delay(e) {
    return this.animate(0, e);
  }
  duration() {
    return this._times * (this._wait + this._duration) - this._wait;
  }
  during(e) {
    return this.queue(null, e);
  }
  ease(e) {
    return this._stepper = new bo(e), this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */
  element(e) {
    return e == null ? this._element : (this._element = e, e._prepareRunner(), this);
  }
  finish() {
    return this.step(1 / 0);
  }
  loop(e, n, s) {
    return typeof e == "object" && (n = e.swing, s = e.wait, e = e.times), this._times = e || 1 / 0, this._swing = n || !1, this._wait = s || 0, this._times === !0 && (this._times = 1 / 0), this;
  }
  loops(e) {
    const n = this._duration + this._wait;
    if (e == null) {
      const _ = Math.floor(this._time / n), k = (this._time - _ * n) / this._duration;
      return Math.min(_ + k, this._times);
    }
    const s = Math.floor(e), o = e % 1, l = n * s + this._duration * o;
    return this.time(l);
  }
  persist(e) {
    return e == null ? this._persist : (this._persist = e, this);
  }
  position(e) {
    const n = this._time, s = this._duration, o = this._wait, l = this._times, _ = this._swing, v = this._reverse;
    let k;
    if (e == null) {
      const tt = function(mt) {
        const X = _ * Math.floor(mt % (2 * (o + s)) / (o + s)), It = X && !v || !X && v, ut = Math.pow(-1, It) * (mt % (o + s)) / s + It;
        return Math.max(Math.min(ut, 1), 0);
      }, F = l * (o + s) - o;
      return k = n <= 0 ? Math.round(tt(1e-5)) : n < F ? tt(n) : Math.round(tt(F - 1e-5)), k;
    }
    const N = Math.floor(this.loops()), z = _ && N % 2 === 0;
    return k = N + (z && !v || v && z ? e : 1 - e), this.loops(k);
  }
  progress(e) {
    return e == null ? Math.min(1, this._time / this.duration()) : this.time(e * this.duration());
  }
  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */
  queue(e, n, s, o) {
    return this._queue.push({
      initialiser: e || Al,
      runner: n || Al,
      retarget: s,
      isTransform: o,
      initialised: !1,
      finished: !1
    }), this.timeline() && this.timeline()._continue(), this;
  }
  reset() {
    return this._reseted ? this : (this.time(0), this._reseted = !0, this);
  }
  reverse(e) {
    return this._reverse = e ?? !this._reverse, this;
  }
  schedule(e, n, s) {
    if (e instanceof vf || (s = n, n = e, e = this.timeline()), !e)
      throw Error("Runner cannot be scheduled without timeline");
    return e.schedule(this, n, s), this;
  }
  step(e) {
    if (!this.enabled) return this;
    e = e ?? 16, this._time += e;
    const n = this.position(), s = this._lastPosition !== n && this._time >= 0;
    this._lastPosition = n;
    const o = this.duration(), l = this._lastTime <= 0 && this._time > 0, _ = this._lastTime < o && this._time >= o;
    this._lastTime = this._time, l && this.fire("start", this);
    const v = this._isDeclarative;
    this.done = !v && !_ && this._time >= o, this._reseted = !1;
    let k = !1;
    return (s || v) && (this._initialise(s), this.transforms = new Nt(), k = this._run(v ? e : n), this.fire("step", this)), this.done = this.done || k && v, _ && this.fire("finished", this), this;
  }
  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */
  time(e) {
    if (e == null)
      return this._time;
    const n = e - this._time;
    return this.step(n), this;
  }
  timeline(e) {
    return typeof e > "u" ? this._timeline : (this._timeline = e, this);
  }
  unschedule() {
    const e = this.timeline();
    return e && e.unschedule(this), this;
  }
  // Run each initialise function in the runner if required
  _initialise(e) {
    if (!(!e && !this._isDeclarative))
      for (let n = 0, s = this._queue.length; n < s; ++n) {
        const o = this._queue[n], l = this._isDeclarative || !o.initialised && e;
        e = !o.finished, l && e && (o.initialiser.call(this), o.initialised = !0);
      }
  }
  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher(e, n) {
    if (this._history[e] = {
      morpher: n,
      caller: this._queue[this._queue.length - 1]
    }, this._isDeclarative) {
      const s = this.timeline();
      s && s.play();
    }
  }
  // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given
  _run(e) {
    let n = !0;
    for (let s = 0, o = this._queue.length; s < o; ++s) {
      const l = this._queue[s], _ = l.runner.call(this, e);
      l.finished = l.finished || _ === !0, n = n && l.finished;
    }
    return n;
  }
  // do nothing and return false
  _tryRetarget(e, n, s) {
    if (this._history[e]) {
      if (!this._history[e].caller.initialised) {
        const l = this._queue.indexOf(this._history[e].caller);
        return this._queue.splice(l, 1), !1;
      }
      this._history[e].caller.retarget ? this._history[e].caller.retarget.call(this, n, s) : this._history[e].morpher.to(n), this._history[e].caller.finished = !1;
      const o = this.timeline();
      return o && o.play(), !0;
    }
    return !1;
  }
}
mi.id = 0;
class Hs {
  constructor(e = new Nt(), n = -1, s = !0) {
    this.transforms = e, this.id = n, this.done = s;
  }
  clearTransformsFromQueue() {
  }
}
ne([mi, Hs], {
  mergeWith(t) {
    return new Hs(t.transforms.lmultiply(this.transforms), t.id);
  }
});
const yf = (t, e) => t.lmultiplyO(e), bf = (t) => t.transforms;
function Jg() {
  const e = this._transformationRunners.runners.map(bf).reduce(yf, new Nt());
  this.transform(e), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class t_ {
  constructor() {
    this.runners = [], this.ids = [];
  }
  add(e) {
    if (this.runners.includes(e)) return;
    const n = e.id + 1;
    return this.runners.push(e), this.ids.push(n), this;
  }
  clearBefore(e) {
    const n = this.ids.indexOf(e + 1) || 1;
    return this.ids.splice(0, n, 0), this.runners.splice(0, n, new Hs()).forEach((s) => s.clearTransformsFromQueue()), this;
  }
  edit(e, n) {
    const s = this.ids.indexOf(e + 1);
    return this.ids.splice(s, 1, e + 1), this.runners.splice(s, 1, n), this;
  }
  getByID(e) {
    return this.runners[this.ids.indexOf(e + 1)];
  }
  length() {
    return this.ids.length;
  }
  merge() {
    let e = null;
    for (let n = 0; n < this.runners.length; ++n) {
      const s = this.runners[n];
      if (e && s.done && e.done && (!s._timeline || !s._timeline._runnerIds.includes(s.id)) && (!e._timeline || !e._timeline._runnerIds.includes(e.id))) {
        this.remove(s.id);
        const l = s.mergeWith(e);
        this.edit(e.id, l), e = l, --n;
      } else
        e = s;
    }
    return this;
  }
  remove(e) {
    const n = this.ids.indexOf(e + 1);
    return this.ids.splice(n, 1), this.runners.splice(n, 1), this;
  }
}
Qt({
  Element: {
    animate(t, e, n) {
      const s = mi.sanitise(t, e, n), o = this.timeline();
      return new mi(s.duration).loop(s).element(this).timeline(o.play()).schedule(s.delay, s.when);
    },
    delay(t, e) {
      return this.animate(0, t, e);
    },
    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore(t) {
      this._transformationRunners.clearBefore(t.id);
    },
    _currentTransform(t) {
      return this._transformationRunners.runners.filter((e) => e.id <= t.id).map(bf).reduce(yf, new Nt());
    },
    _addRunner(t) {
      this._transformationRunners.add(t), de.cancelImmediate(this._frameId), this._frameId = de.immediate(Jg.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new t_().add(new Hs(new Nt(this))));
    }
  }
});
const e_ = (t, e) => t.filter((n) => !e.includes(n));
ne(mi, {
  attr(t, e) {
    return this.styleAttr("attr", t, e);
  },
  // Add animatable styles
  css(t, e) {
    return this.styleAttr("css", t, e);
  },
  styleAttr(t, e, n) {
    if (typeof e == "string")
      return this.styleAttr(t, {
        [e]: n
      });
    let s = e;
    if (this._tryRetarget(t, s)) return this;
    let o = new Hn(this._stepper).to(s), l = Object.keys(s);
    return this.queue(function() {
      o = o.from(this.element()[t](l));
    }, function(_) {
      return this.element()[t](o.at(_).valueOf()), o.done();
    }, function(_) {
      const v = Object.keys(_), k = e_(v, l);
      if (k.length) {
        const z = this.element()[t](k), q = new is(o.from()).valueOf();
        Object.assign(q, z), o.from(q);
      }
      const N = new is(o.to()).valueOf();
      Object.assign(N, _), o.to(N), l = v, s = _;
    }), this._rememberMorpher(t, o), this;
  },
  zoom(t, e) {
    if (this._tryRetarget("zoom", t, e)) return this;
    let n = new Hn(this._stepper).to(new Gt(t));
    return this.queue(function() {
      n = n.from(this.element().zoom());
    }, function(s) {
      return this.element().zoom(n.at(s), e), n.done();
    }, function(s, o) {
      e = o, n.to(s);
    }), this._rememberMorpher("zoom", n), this;
  },
  /**
   ** absolute transformations
   **/
  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)
  transform(t, e, n) {
    if (e = t.relative || e, this._isDeclarative && !e && this._tryRetarget("transform", t))
      return this;
    const s = Nt.isMatrixLike(t);
    n = t.affine != null ? t.affine : n ?? !s;
    const o = new Hn(this._stepper).type(n ? ls : Nt);
    let l, _, v, k, N;
    function z() {
      _ = _ || this.element(), l = l || vo(t, _), N = new Nt(e ? void 0 : _), _._addRunner(this), e || _._clearTransformRunnersBefore(this);
    }
    function q(F) {
      e || this.clearTransform();
      const {
        x: mt,
        y: X
      } = new Re(l).transform(_._currentTransform(this));
      let It = new Nt({
        ...t,
        origin: [mt, X]
      }), ut = this._isDeclarative && v ? v : N;
      if (n) {
        It = It.decompose(mt, X), ut = ut.decompose(mt, X);
        const Pt = It.rotate, xt = ut.rotate, Bt = [Pt - 360, Pt, Pt + 360], ht = Bt.map((zt) => Math.abs(zt - xt)), At = Math.min(...ht), Ft = ht.indexOf(At);
        It.rotate = Bt[Ft];
      }
      e && (s || (It.rotate = t.rotate || 0), this._isDeclarative && k && (ut.rotate = k)), o.from(ut), o.to(It);
      const Xt = o.at(F);
      return k = Xt.rotate, v = new Nt(Xt), this.addTransform(v), _._addRunner(this), o.done();
    }
    function tt(F) {
      (F.origin || "center").toString() !== (t.origin || "center").toString() && (l = vo(F, _)), t = {
        ...F,
        origin: l
      };
    }
    return this.queue(z, q, tt, !0), this._isDeclarative && this._rememberMorpher("transform", o), this;
  },
  // Animatable x-axis
  x(t, e) {
    return this._queueNumber("x", t);
  },
  // Animatable y-axis
  y(t) {
    return this._queueNumber("y", t);
  },
  dx(t = 0) {
    return this._queueNumberDelta("x", t);
  },
  dy(t = 0) {
    return this._queueNumberDelta("y", t);
  },
  dmove(t, e) {
    return this.dx(t).dy(e);
  },
  _queueNumberDelta(t, e) {
    if (e = new Gt(e), this._tryRetarget(t, e)) return this;
    const n = new Hn(this._stepper).to(e);
    let s = null;
    return this.queue(function() {
      s = this.element()[t](), n.from(s), n.to(s + e);
    }, function(o) {
      return this.element()[t](n.at(o)), n.done();
    }, function(o) {
      n.to(s + new Gt(o));
    }), this._rememberMorpher(t, n), this;
  },
  _queueObject(t, e) {
    if (this._tryRetarget(t, e)) return this;
    const n = new Hn(this._stepper).to(e);
    return this.queue(function() {
      n.from(this.element()[t]());
    }, function(s) {
      return this.element()[t](n.at(s)), n.done();
    }), this._rememberMorpher(t, n), this;
  },
  _queueNumber(t, e) {
    return this._queueObject(t, new Gt(e));
  },
  // Animatable center x-axis
  cx(t) {
    return this._queueNumber("cx", t);
  },
  // Animatable center y-axis
  cy(t) {
    return this._queueNumber("cy", t);
  },
  // Add animatable move
  move(t, e) {
    return this.x(t).y(e);
  },
  // Add animatable center
  center(t, e) {
    return this.cx(t).cy(e);
  },
  // Add animatable size
  size(t, e) {
    let n;
    return (!t || !e) && (n = this._element.bbox()), t || (t = n.width / n.height * e), e || (e = n.height / n.width * t), this.width(t).height(e);
  },
  // Add animatable width
  width(t) {
    return this._queueNumber("width", t);
  },
  // Add animatable height
  height(t) {
    return this._queueNumber("height", t);
  },
  // Add animatable plot
  plot(t, e, n, s) {
    if (arguments.length === 4)
      return this.plot([t, e, n, s]);
    if (this._tryRetarget("plot", t)) return this;
    const o = new Hn(this._stepper).type(this._element.MorphArray).to(t);
    return this.queue(function() {
      o.from(this._element.array());
    }, function(l) {
      return this._element.plot(o.at(l)), o.done();
    }), this._rememberMorpher("plot", o), this;
  },
  // Add leading method
  leading(t) {
    return this._queueNumber("leading", t);
  },
  // Add animatable viewbox
  viewbox(t, e, n, s) {
    return this._queueObject("viewbox", new Xe(t, e, n, s));
  },
  update(t) {
    return typeof t != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", t.offset), this);
  }
});
ne(mi, {
  rx: ru,
  ry: su,
  from: pf,
  to: gf
});
oe(mi, "Runner");
class lu extends li {
  constructor(e, n = e) {
    super(Se("svg", e), n), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? Ii(this.node.querySelector("defs")) || this.put(new nu()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof fe.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({
      xmlns: Qo,
      version: "1.1"
    }).attr("xmlns:xlink", as, Ts).attr("xmlns:svgjs", b0, Ts) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({
      xmlns: null,
      version: null
    }).attr("xmlns:xlink", null, Ts).attr("xmlns:svgjs", null, Ts);
  }
  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    return this.isRoot() ? this : super.root();
  }
}
Qt({
  Container: {
    // Create nested svg document
    nested: we(function() {
      return this.put(new lu());
    })
  }
});
oe(lu, "Svg", !0);
let hu = class extends li {
  // Initialize node
  constructor(e, n = e) {
    super(Se("symbol", e), n);
  }
};
Qt({
  Container: {
    symbol: we(function() {
      return this.put(new hu());
    })
  }
});
oe(hu, "Symbol");
function i_(t) {
  return this._build === !1 && this.clear(), this.node.appendChild(fe.document.createTextNode(t)), this;
}
function n_() {
  return this.node.getComputedTextLength();
}
function r_(t, e = this.bbox()) {
  return t == null ? e.x : this.attr("x", this.attr("x") + t - e.x);
}
function s_(t, e = this.bbox()) {
  return t == null ? e.y : this.attr("y", this.attr("y") + t - e.y);
}
function a_(t, e, n = this.bbox()) {
  return this.x(t, n).y(e, n);
}
function o_(t, e = this.bbox()) {
  return t == null ? e.cx : this.attr("x", this.attr("x") + t - e.cx);
}
function u_(t, e = this.bbox()) {
  return t == null ? e.cy : this.attr("y", this.attr("y") + t - e.cy);
}
function l_(t, e, n = this.bbox()) {
  return this.cx(t, n).cy(e, n);
}
function h_(t) {
  return this.attr("x", t);
}
function f_(t) {
  return this.attr("y", t);
}
function c_(t, e) {
  return this.ax(t).ay(e);
}
function d_(t) {
  return this._build = !!t, this;
}
var xf = {
  __proto__: null,
  plain: i_,
  length: n_,
  x: r_,
  y: s_,
  move: a_,
  cx: o_,
  cy: u_,
  center: l_,
  ax: h_,
  ay: f_,
  amove: c_,
  build: d_
};
class zi extends vi {
  // Initialize node
  constructor(e, n = e) {
    super(Se("text", e), n), this.dom.leading = new Gt(1.3), this._rebuild = !0, this._build = !1;
  }
  // Set / get leading
  leading(e) {
    return e == null ? this.dom.leading : (this.dom.leading = new Gt(e), this.rebuild());
  }
  // Rebuild appearance type
  rebuild(e) {
    if (typeof e == "boolean" && (this._rebuild = e), this._rebuild) {
      const n = this;
      let s = 0;
      const o = this.dom.leading;
      this.each(function(l) {
        const _ = fe.window.getComputedStyle(this.node).getPropertyValue("font-size"), v = o * new Gt(_);
        this.dom.newLined && (this.attr("x", n.attr("x")), this.text() === `
` ? s += v : (this.attr("dy", l ? v + s : 0), s = 0));
      }), this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(e) {
    return this.dom = e, this.dom.leading = new Gt(e.leading || 1.3), this;
  }
  // Set the text content
  text(e) {
    if (e === void 0) {
      const n = this.node.childNodes;
      let s = 0;
      e = "";
      for (let o = 0, l = n.length; o < l; ++o) {
        if (n[o].nodeName === "textPath") {
          o === 0 && (s = 1);
          continue;
        }
        o !== s && n[o].nodeType !== 3 && Ii(n[o]).dom.newLined === !0 && (e += `
`), e += n[o].textContent;
      }
      return e;
    }
    if (this.clear().build(!0), typeof e == "function")
      e.call(this, this);
    else {
      e = (e + "").split(`
`);
      for (let n = 0, s = e.length; n < s; n++)
        this.newLine(e[n]);
    }
    return this.build(!1).rebuild();
  }
}
ne(zi, xf);
Qt({
  Container: {
    // Create text element
    text: we(function(t = "") {
      return this.put(new zi()).text(t);
    }),
    // Create plain text element
    plain: we(function(t = "") {
      return this.put(new zi()).plain(t);
    })
  }
});
oe(zi, "Text");
class ha extends vi {
  // Initialize node
  constructor(e, n = e) {
    super(Se("tspan", e), n), this._build = !1;
  }
  // Shortcut dx
  dx(e) {
    return this.attr("dx", e);
  }
  // Shortcut dy
  dy(e) {
    return this.attr("dy", e);
  }
  // Create new line
  newLine() {
    this.dom.newLined = !0;
    const e = this.parent();
    if (!(e instanceof zi))
      return this;
    const n = e.index(this), s = fe.window.getComputedStyle(this.node).getPropertyValue("font-size"), o = e.dom.leading * new Gt(s);
    return this.dy(n ? o : 0).attr("x", e.x());
  }
  // Set text content
  text(e) {
    return e == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof e == "function" ? (this.clear().build(!0), e.call(this, this), this.build(!1)) : this.plain(e), this);
  }
}
ne(ha, xf);
Qt({
  Tspan: {
    tspan: we(function(t = "") {
      const e = new ha();
      return this._build || this.clear(), this.put(e).text(t);
    })
  },
  Text: {
    newLine: function(t = "") {
      return this.tspan(t).newLine();
    }
  }
});
oe(ha, "Tspan");
class fu extends vi {
  constructor(e, n = e) {
    super(Se("circle", e), n);
  }
  radius(e) {
    return this.attr("r", e);
  }
  // Radius x value
  rx(e) {
    return this.attr("r", e);
  }
  // Alias radius x value
  ry(e) {
    return this.rx(e);
  }
  size(e) {
    return this.radius(new Gt(e).divide(2));
  }
}
ne(fu, {
  x: of,
  y: uf,
  cx: lf,
  cy: hf,
  width: ff,
  height: cf
});
Qt({
  Container: {
    // Create circle element
    circle: we(function(t = 0) {
      return this.put(new fu()).size(t).move(0, 0);
    })
  }
});
oe(fu, "Circle");
class Io extends li {
  constructor(e, n = e) {
    super(Se("clipPath", e), n);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    return this.targets().forEach(function(e) {
      e.unclip();
    }), super.remove();
  }
  targets() {
    return kr("svg [clip-path*=" + this.id() + "]");
  }
}
Qt({
  Container: {
    // Create clipping element
    clip: we(function() {
      return this.defs().put(new Io());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(t) {
      const e = t instanceof Io ? t : this.parent().clip().add(t);
      return this.attr("clip-path", "url(#" + e.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
oe(Io, "ClipPath");
class wf extends Ki {
  constructor(e, n = e) {
    super(Se("foreignObject", e), n);
  }
}
Qt({
  Container: {
    foreignObject: we(function(t, e) {
      return this.put(new wf()).size(t, e);
    })
  }
});
oe(wf, "ForeignObject");
function p_(t, e) {
  return this.children().forEach((n, s) => {
    let o;
    try {
      o = n.bbox();
    } catch {
      return;
    }
    const l = new Nt(n), _ = l.translate(t, e).transform(l.inverse()), v = new Re(o.x, o.y).transform(_);
    n.move(v.x, v.y);
  }), this;
}
function g_(t) {
  return this.dmove(t, 0);
}
function __(t) {
  return this.dmove(0, t);
}
function m_(t, e = this.bbox()) {
  return t == null ? e.height : this.size(e.width, t, e);
}
function v_(t = 0, e = 0, n = this.bbox()) {
  const s = t - n.x, o = e - n.y;
  return this.dmove(s, o);
}
function y_(t, e, n = this.bbox()) {
  const s = Ir(this, t, e, n), o = s.width / n.width, l = s.height / n.height;
  return this.children().forEach((_, v) => {
    const k = new Re(n).transform(new Nt(_).inverse());
    _.scale(o, l, k.x, k.y);
  }), this;
}
function b_(t, e = this.bbox()) {
  return t == null ? e.width : this.size(t, e.height, e);
}
function x_(t, e = this.bbox()) {
  return t == null ? e.x : this.move(t, e.y, e);
}
function w_(t, e = this.bbox()) {
  return t == null ? e.y : this.move(e.x, t, e);
}
var Sf = {
  __proto__: null,
  dmove: p_,
  dx: g_,
  dy: __,
  height: m_,
  move: v_,
  size: y_,
  width: b_,
  x: x_,
  y: w_
};
class cu extends li {
  constructor(e, n = e) {
    super(Se("g", e), n);
  }
}
ne(cu, Sf);
Qt({
  Container: {
    // Create a group element
    group: we(function() {
      return this.put(new cu());
    })
  }
});
oe(cu, "G");
class Ws extends li {
  constructor(e, n = e) {
    super(Se("a", e), n);
  }
  // Link target attribute
  target(e) {
    return this.attr("target", e);
  }
  // Link url
  to(e) {
    return this.attr("href", e, as);
  }
}
ne(Ws, Sf);
Qt({
  Container: {
    // Create a hyperlink element
    link: we(function(t) {
      return this.put(new Ws()).to(t);
    })
  },
  Element: {
    unlink() {
      const t = this.linker();
      if (!t) return this;
      const e = t.parent();
      if (!e)
        return this.remove();
      const n = e.index(t);
      return e.add(this, n), t.remove(), this;
    },
    linkTo(t) {
      let e = this.linker();
      return e || (e = new Ws(), this.wrap(e)), typeof t == "function" ? t.call(e, e) : e.to(t), this;
    },
    linker() {
      const t = this.parent();
      return t && t.node.nodeName.toLowerCase() === "a" ? t : null;
    }
  }
});
oe(Ws, "A");
class ko extends li {
  // Initialize node
  constructor(e, n = e) {
    super(Se("mask", e), n);
  }
  // Unmask all masked elements and remove itself
  remove() {
    return this.targets().forEach(function(e) {
      e.unmask();
    }), super.remove();
  }
  targets() {
    return kr("svg [mask*=" + this.id() + "]");
  }
}
Qt({
  Container: {
    mask: we(function() {
      return this.defs().put(new ko());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(t) {
      const e = t instanceof ko ? t : this.parent().mask().add(t);
      return this.attr("mask", "url(#" + e.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
oe(ko, "Mask");
class Cf extends Ki {
  constructor(e, n = e) {
    super(Se("stop", e), n);
  }
  // add color stops
  update(e) {
    return (typeof e == "number" || e instanceof Gt) && (e = {
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }), e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", new Gt(e.offset)), this;
  }
}
Qt({
  Gradient: {
    // Add a color stop
    stop: function(t, e, n) {
      return this.put(new Cf()).update(t, e, n);
    }
  }
});
oe(Cf, "Stop");
function S_(t, e) {
  if (!t) return "";
  if (!e) return t;
  let n = t + "{";
  for (const s in e)
    n += v0(s) + ":" + e[s] + ";";
  return n += "}", n;
}
class Po extends Ki {
  constructor(e, n = e) {
    super(Se("style", e), n);
  }
  addText(e = "") {
    return this.node.textContent += e, this;
  }
  font(e, n, s = {}) {
    return this.rule("@font-face", {
      fontFamily: e,
      src: n,
      ...s
    });
  }
  rule(e, n) {
    return this.addText(S_(e, n));
  }
}
Qt("Dom", {
  style(t, e) {
    return this.put(new Po()).rule(t, e);
  },
  fontface(t, e, n) {
    return this.put(new Po()).font(t, e, n);
  }
});
oe(Po, "Style");
class du extends zi {
  // Initialize node
  constructor(e, n = e) {
    super(Se("textPath", e), n);
  }
  // return the array of the path track element
  array() {
    const e = this.track();
    return e ? e.array() : null;
  }
  // Plot path if any
  plot(e) {
    const n = this.track();
    let s = null;
    return n && (s = n.plot(e)), e == null ? s : this;
  }
  // Get the path element
  track() {
    return this.reference("href");
  }
}
Qt({
  Container: {
    textPath: we(function(t, e) {
      return t instanceof zi || (t = this.text(t)), t.path(e);
    })
  },
  Text: {
    // Create path for text to run on
    path: we(function(t, e = !0) {
      const n = new du();
      t instanceof Pr || (t = this.defs().path(t)), n.attr("href", "#" + t, as);
      let s;
      if (e)
        for (; s = this.node.firstChild; )
          n.node.appendChild(s);
      return this.put(n);
    }),
    // Get the textPath children
    textPath() {
      return this.findOne("textPath");
    }
  },
  Path: {
    // creates a textPath from this path
    text: we(function(t) {
      return t instanceof zi || (t = new zi().addTo(this.parent()).text(t)), t.path(this);
    }),
    targets() {
      return kr("svg textPath").filter((t) => (t.attr("href") || "").includes(this.id()));
    }
  }
});
du.prototype.MorphArray = Qn;
oe(du, "TextPath");
class If extends vi {
  constructor(e, n = e) {
    super(Se("use", e), n);
  }
  // Use element as a reference
  use(e, n) {
    return this.attr("href", (n || "") + "#" + e, as);
  }
}
Qt({
  Container: {
    // Create a use element
    use: we(function(t, e) {
      return this.put(new If()).use(t, e);
    })
  }
});
oe(If, "Use");
const C_ = ii;
ne([lu, hu, ua, ts, qs], ui("viewbox"));
ne([es, fs, hs, Pr], ui("marker"));
ne(zi, ui("Text"));
ne(Pr, ui("Path"));
ne(nu, ui("Defs"));
ne([zi, ha], ui("Tspan"));
ne([la, oa, us, mi], ui("radius"));
ne(os, ui("EventTarget"));
ne(kn, ui("Dom"));
ne(Ki, ui("Element"));
ne(vi, ui("Shape"));
ne([li, df], ui("Container"));
ne(us, ui("Gradient"));
ne(mi, ui("Runner"));
Xn.extend(_0());
Hg([Gt, _e, Xe, Nt, wr, Pn, Qn, Re]);
Wg();
function I_(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function kf(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function s() {
      return this instanceof s ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(s) {
    var o = Object.getOwnPropertyDescriptor(t, s);
    Object.defineProperty(n, s, o.get ? o : {
      enumerable: !0,
      get: function() {
        return t[s];
      }
    });
  }), n;
}
function k_(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ns = { exports: {} };
const P_ = {}, A_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: P_
}, Symbol.toStringTag, { value: "Module" })), El = /* @__PURE__ */ kf(A_);
var to = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}, eo = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", T_ = {
  5: eo,
  "5module": eo + " export import",
  6: eo + " const class extends export import super"
}, E_ = /^in(stanceof)?$/, pu = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Pf = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿", O_ = new RegExp("[" + pu + "]"), M_ = new RegExp("[" + pu + Pf + "]");
pu = Pf = null;
var Af = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938], L_ = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
function Ao(t, e) {
  for (var n = 65536, s = 0; s < e.length; s += 2) {
    if (n += e[s], n > t)
      return !1;
    if (n += e[s + 1], n >= t)
      return !0;
  }
}
function an(t, e) {
  return t < 65 ? t === 36 : t < 91 ? !0 : t < 97 ? t === 95 : t < 123 ? !0 : t <= 65535 ? t >= 170 && O_.test(String.fromCharCode(t)) : e === !1 ? !1 : Ao(t, Af);
}
function Jn(t, e) {
  return t < 48 ? t === 36 : t < 58 ? !0 : t < 65 ? !1 : t < 91 ? !0 : t < 97 ? t === 95 : t < 123 ? !0 : t <= 65535 ? t >= 170 && M_.test(String.fromCharCode(t)) : e === !1 ? !1 : Ao(t, Af) || Ao(t, L_);
}
var he = function(e, n) {
  n === void 0 && (n = {}), this.label = e, this.keyword = n.keyword, this.beforeExpr = !!n.beforeExpr, this.startsExpr = !!n.startsExpr, this.isLoop = !!n.isLoop, this.isAssign = !!n.isAssign, this.prefix = !!n.prefix, this.postfix = !!n.postfix, this.binop = n.binop || null, this.updateContext = null;
};
function wi(t, e) {
  return new he(t, { beforeExpr: !0, binop: e });
}
var Si = { beforeExpr: !0 }, fi = { startsExpr: !0 }, fa = {};
function se(t, e) {
  return e === void 0 && (e = {}), e.keyword = t, fa[t] = new he(t, e);
}
var L = {
  num: new he("num", fi),
  regexp: new he("regexp", fi),
  string: new he("string", fi),
  name: new he("name", fi),
  eof: new he("eof"),
  // Punctuation token types.
  bracketL: new he("[", { beforeExpr: !0, startsExpr: !0 }),
  bracketR: new he("]"),
  braceL: new he("{", { beforeExpr: !0, startsExpr: !0 }),
  braceR: new he("}"),
  parenL: new he("(", { beforeExpr: !0, startsExpr: !0 }),
  parenR: new he(")"),
  comma: new he(",", Si),
  semi: new he(";", Si),
  colon: new he(":", Si),
  dot: new he("."),
  question: new he("?", Si),
  questionDot: new he("?."),
  arrow: new he("=>", Si),
  template: new he("template"),
  invalidTemplate: new he("invalidTemplate"),
  ellipsis: new he("...", Si),
  backQuote: new he("`", fi),
  dollarBraceL: new he("${", { beforeExpr: !0, startsExpr: !0 }),
  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.
  eq: new he("=", { beforeExpr: !0, isAssign: !0 }),
  assign: new he("_=", { beforeExpr: !0, isAssign: !0 }),
  incDec: new he("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
  prefix: new he("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  logicalOR: wi("||", 1),
  logicalAND: wi("&&", 2),
  bitwiseOR: wi("|", 3),
  bitwiseXOR: wi("^", 4),
  bitwiseAND: wi("&", 5),
  equality: wi("==/!=/===/!==", 6),
  relational: wi("</>/<=/>=", 7),
  bitShift: wi("<</>>/>>>", 8),
  plusMin: new he("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
  modulo: wi("%", 10),
  star: wi("*", 10),
  slash: wi("/", 10),
  starstar: new he("**", { beforeExpr: !0 }),
  coalesce: wi("??", 1),
  // Keyword token types.
  _break: se("break"),
  _case: se("case", Si),
  _catch: se("catch"),
  _continue: se("continue"),
  _debugger: se("debugger"),
  _default: se("default", Si),
  _do: se("do", { isLoop: !0, beforeExpr: !0 }),
  _else: se("else", Si),
  _finally: se("finally"),
  _for: se("for", { isLoop: !0 }),
  _function: se("function", fi),
  _if: se("if"),
  _return: se("return", Si),
  _switch: se("switch"),
  _throw: se("throw", Si),
  _try: se("try"),
  _var: se("var"),
  _const: se("const"),
  _while: se("while", { isLoop: !0 }),
  _with: se("with"),
  _new: se("new", { beforeExpr: !0, startsExpr: !0 }),
  _this: se("this", fi),
  _super: se("super", fi),
  _class: se("class", fi),
  _extends: se("extends", Si),
  _export: se("export"),
  _import: se("import", fi),
  _null: se("null", fi),
  _true: se("true", fi),
  _false: se("false", fi),
  _in: se("in", { beforeExpr: !0, binop: 7 }),
  _instanceof: se("instanceof", { beforeExpr: !0, binop: 7 }),
  _typeof: se("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _void: se("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _delete: se("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 })
}, yi = /\r\n?|\n|\u2028|\u2029/, Sr = new RegExp(yi.source, "g");
function Ar(t, e) {
  return t === 10 || t === 13 || !e && (t === 8232 || t === 8233);
}
var gu = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, ki = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, Tf = Object.prototype, N_ = Tf.hasOwnProperty, R_ = Tf.toString;
function ca(t, e) {
  return N_.call(t, e);
}
var Ol = Array.isArray || function(t) {
  return R_.call(t) === "[object Array]";
};
function Wn(t) {
  return new RegExp("^(?:" + t.replace(/ /g, "|") + ")$");
}
var Cr = function(e, n) {
  this.line = e, this.column = n;
};
Cr.prototype.offset = function(e) {
  return new Cr(this.line, this.column + e);
};
var cs = function(e, n, s) {
  this.start = n, this.end = s, e.sourceFile !== null && (this.source = e.sourceFile);
};
function _u(t, e) {
  for (var n = 1, s = 0; ; ) {
    Sr.lastIndex = s;
    var o = Sr.exec(t);
    if (o && o.index < e)
      ++n, s = o.index + o[0].length;
    else
      return new Cr(n, e - s);
  }
}
var Gs = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (2015), 7 (2016), 8 (2017), 9 (2018), or 10
  // (2019). This influences support for strict mode, the set of
  // reserved words, and support for new syntax features. The default
  // is 10.
  ecmaVersion: 10,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called
  // when a semicolon is automatically inserted. It will be passed
  // the position of the comma as an offset, and if `locations` is
  // enabled, it is given the location as a `{line, column}` object
  // as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: !1,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: !1,
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: !1,
  // When enabled, hashbang directive in the beginning of file
  // is allowed and treated as a line comment.
  allowHashBang: !1,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: !1,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: !1,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: !1
};
function F_(t) {
  var e = {};
  for (var n in Gs)
    e[n] = t && ca(t, n) ? t[n] : Gs[n];
  if (e.ecmaVersion >= 2015 && (e.ecmaVersion -= 2009), e.allowReserved == null && (e.allowReserved = e.ecmaVersion < 5), Ol(e.onToken)) {
    var s = e.onToken;
    e.onToken = function(o) {
      return s.push(o);
    };
  }
  return Ol(e.onComment) && (e.onComment = z_(e, e.onComment)), e;
}
function z_(t, e) {
  return function(n, s, o, l, _, v) {
    var k = {
      type: n ? "Block" : "Line",
      value: s,
      start: o,
      end: l
    };
    t.locations && (k.loc = new cs(this, _, v)), t.ranges && (k.range = [o, l]), e.push(k);
  };
}
var ns = 1, ds = 2, mu = ns | ds, Ef = 4, Of = 8, Mf = 16, Lf = 32, Nf = 64, Rf = 128;
function vu(t, e) {
  return ds | (t ? Ef : 0) | (e ? Of : 0);
}
var Ml = 0, yu = 1, sn = 2, Ff = 3, zf = 4, Df = 5, Ae = function(e, n, s) {
  this.options = e = F_(e), this.sourceFile = e.sourceFile, this.keywords = Wn(T_[e.ecmaVersion >= 6 ? 6 : e.sourceType === "module" ? "5module" : 5]);
  var o = "";
  if (e.allowReserved !== !0) {
    for (var l = e.ecmaVersion; !(o = to[l]); l--)
      ;
    e.sourceType === "module" && (o += " await");
  }
  this.reservedWords = Wn(o);
  var _ = (o ? o + " " : "") + to.strict;
  this.reservedWordsStrict = Wn(_), this.reservedWordsStrictBind = Wn(_ + " " + to.strictBind), this.input = String(n), this.containsEsc = !1, s ? (this.pos = s, this.lineStart = this.input.lastIndexOf(`
`, s - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(yi).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = L.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = {}, this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(ns), this.regexpState = null;
}, er = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 } };
Ae.prototype.parse = function() {
  var e = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(e);
};
er.inFunction.get = function() {
  return (this.currentVarScope().flags & ds) > 0;
};
er.inGenerator.get = function() {
  return (this.currentVarScope().flags & Of) > 0;
};
er.inAsync.get = function() {
  return (this.currentVarScope().flags & Ef) > 0;
};
er.allowSuper.get = function() {
  return (this.currentThisScope().flags & Nf) > 0;
};
er.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & Rf) > 0;
};
er.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
Ae.prototype.inNonArrowFunction = function() {
  return (this.currentThisScope().flags & ds) > 0;
};
Ae.extend = function() {
  for (var e = [], n = arguments.length; n--; ) e[n] = arguments[n];
  for (var s = this, o = 0; o < e.length; o++)
    s = e[o](s);
  return s;
};
Ae.parse = function(e, n) {
  return new this(n, e).parse();
};
Ae.parseExpressionAt = function(e, n, s) {
  var o = new this(s, e, n);
  return o.nextToken(), o.parseExpression();
};
Ae.tokenizer = function(e, n) {
  return new this(n, e);
};
Object.defineProperties(Ae.prototype, er);
var ri = Ae.prototype, D_ = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
ri.strictDirective = function(t) {
  for (; ; ) {
    ki.lastIndex = t, t += ki.exec(this.input)[0].length;
    var e = D_.exec(this.input.slice(t));
    if (!e)
      return !1;
    if ((e[1] || e[2]) === "use strict") {
      ki.lastIndex = t + e[0].length;
      var n = ki.exec(this.input), s = n.index + n[0].length, o = this.input.charAt(s);
      return o === ";" || o === "}" || yi.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(o) || o === "!" && this.input.charAt(s + 1) === "=");
    }
    t += e[0].length, ki.lastIndex = t, t += ki.exec(this.input)[0].length, this.input[t] === ";" && t++;
  }
};
ri.eat = function(t) {
  return this.type === t ? (this.next(), !0) : !1;
};
ri.isContextual = function(t) {
  return this.type === L.name && this.value === t && !this.containsEsc;
};
ri.eatContextual = function(t) {
  return this.isContextual(t) ? (this.next(), !0) : !1;
};
ri.expectContextual = function(t) {
  this.eatContextual(t) || this.unexpected();
};
ri.canInsertSemicolon = function() {
  return this.type === L.eof || this.type === L.braceR || yi.test(this.input.slice(this.lastTokEnd, this.start));
};
ri.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
};
ri.semicolon = function() {
  !this.eat(L.semi) && !this.insertSemicolon() && this.unexpected();
};
ri.afterTrailingComma = function(t, e) {
  if (this.type === t)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), e || this.next(), !0;
};
ri.expect = function(t) {
  this.eat(t) || this.unexpected();
};
ri.unexpected = function(t) {
  this.raise(t ?? this.start, "Unexpected token");
};
function da() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
}
ri.checkPatternErrors = function(t, e) {
  if (t) {
    t.trailingComma > -1 && this.raiseRecoverable(t.trailingComma, "Comma is not permitted after the rest element");
    var n = e ? t.parenthesizedAssign : t.parenthesizedBind;
    n > -1 && this.raiseRecoverable(n, "Parenthesized pattern");
  }
};
ri.checkExpressionErrors = function(t, e) {
  if (!t)
    return !1;
  var n = t.shorthandAssign, s = t.doubleProto;
  if (!e)
    return n >= 0 || s >= 0;
  n >= 0 && this.raise(n, "Shorthand property assignments are valid only in destructuring patterns"), s >= 0 && this.raiseRecoverable(s, "Redefinition of __proto__ property");
};
ri.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
};
ri.isSimpleAssignTarget = function(t) {
  return t.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(t.expression) : t.type === "Identifier" || t.type === "MemberExpression";
};
var $t = Ae.prototype;
$t.parseTopLevel = function(t) {
  var e = {};
  for (t.body || (t.body = []); this.type !== L.eof; ) {
    var n = this.parseStatement(null, !0, e);
    t.body.push(n);
  }
  if (this.inModule)
    for (var s = 0, o = Object.keys(this.undefinedExports); s < o.length; s += 1) {
      var l = o[s];
      this.raiseRecoverable(this.undefinedExports[l].start, "Export '" + l + "' is not defined");
    }
  return this.adaptDirectivePrologue(t.body), this.next(), t.sourceType = this.options.sourceType, this.finishNode(t, "Program");
};
var bu = { kind: "loop" }, V_ = { kind: "switch" };
$t.isLet = function(t) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return !1;
  ki.lastIndex = this.pos;
  var e = ki.exec(this.input), n = this.pos + e[0].length, s = this.input.charCodeAt(n);
  if (s === 91)
    return !0;
  if (t)
    return !1;
  if (s === 123)
    return !0;
  if (an(s, !0)) {
    for (var o = n + 1; Jn(this.input.charCodeAt(o), !0); )
      ++o;
    var l = this.input.slice(n, o);
    if (!E_.test(l))
      return !0;
  }
  return !1;
};
$t.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return !1;
  ki.lastIndex = this.pos;
  var t = ki.exec(this.input), e = this.pos + t[0].length;
  return !yi.test(this.input.slice(this.pos, e)) && this.input.slice(e, e + 8) === "function" && (e + 8 === this.input.length || !Jn(this.input.charAt(e + 8)));
};
$t.parseStatement = function(t, e, n) {
  var s = this.type, o = this.startNode(), l;
  switch (this.isLet(t) && (s = L._var, l = "let"), s) {
    case L._break:
    case L._continue:
      return this.parseBreakContinueStatement(o, s.keyword);
    case L._debugger:
      return this.parseDebuggerStatement(o);
    case L._do:
      return this.parseDoStatement(o);
    case L._for:
      return this.parseForStatement(o);
    case L._function:
      return t && (this.strict || t !== "if" && t !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(o, !1, !t);
    case L._class:
      return t && this.unexpected(), this.parseClass(o, !0);
    case L._if:
      return this.parseIfStatement(o);
    case L._return:
      return this.parseReturnStatement(o);
    case L._switch:
      return this.parseSwitchStatement(o);
    case L._throw:
      return this.parseThrowStatement(o);
    case L._try:
      return this.parseTryStatement(o);
    case L._const:
    case L._var:
      return l = l || this.value, t && l !== "var" && this.unexpected(), this.parseVarStatement(o, l);
    case L._while:
      return this.parseWhileStatement(o);
    case L._with:
      return this.parseWithStatement(o);
    case L.braceL:
      return this.parseBlock(!0, o);
    case L.semi:
      return this.parseEmptyStatement(o);
    case L._export:
    case L._import:
      if (this.options.ecmaVersion > 10 && s === L._import) {
        ki.lastIndex = this.pos;
        var _ = ki.exec(this.input), v = this.pos + _[0].length, k = this.input.charCodeAt(v);
        if (k === 40 || k === 46)
          return this.parseExpressionStatement(o, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (e || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), s === L._import ? this.parseImport(o) : this.parseExport(o, n);
    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    default:
      if (this.isAsyncFunction())
        return t && this.unexpected(), this.next(), this.parseFunctionStatement(o, !0, !t);
      var N = this.value, z = this.parseExpression();
      return s === L.name && z.type === "Identifier" && this.eat(L.colon) ? this.parseLabeledStatement(o, N, z, t) : this.parseExpressionStatement(o, z);
  }
};
$t.parseBreakContinueStatement = function(t, e) {
  var n = e === "break";
  this.next(), this.eat(L.semi) || this.insertSemicolon() ? t.label = null : this.type !== L.name ? this.unexpected() : (t.label = this.parseIdent(), this.semicolon());
  for (var s = 0; s < this.labels.length; ++s) {
    var o = this.labels[s];
    if ((t.label == null || o.name === t.label.name) && (o.kind != null && (n || o.kind === "loop") || t.label && n))
      break;
  }
  return s === this.labels.length && this.raise(t.start, "Unsyntactic " + e), this.finishNode(t, n ? "BreakStatement" : "ContinueStatement");
};
$t.parseDebuggerStatement = function(t) {
  return this.next(), this.semicolon(), this.finishNode(t, "DebuggerStatement");
};
$t.parseDoStatement = function(t) {
  return this.next(), this.labels.push(bu), t.body = this.parseStatement("do"), this.labels.pop(), this.expect(L._while), t.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(L.semi) : this.semicolon(), this.finishNode(t, "DoWhileStatement");
};
$t.parseForStatement = function(t) {
  this.next();
  var e = this.options.ecmaVersion >= 9 && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction) && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(bu), this.enterScope(0), this.expect(L.parenL), this.type === L.semi)
    return e > -1 && this.unexpected(e), this.parseFor(t, null);
  var n = this.isLet();
  if (this.type === L._var || this.type === L._const || n) {
    var s = this.startNode(), o = n ? "let" : this.value;
    return this.next(), this.parseVar(s, !0, o), this.finishNode(s, "VariableDeclaration"), (this.type === L._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && s.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === L._in ? e > -1 && this.unexpected(e) : t.await = e > -1), this.parseForIn(t, s)) : (e > -1 && this.unexpected(e), this.parseFor(t, s));
  }
  var l = new da(), _ = this.parseExpression(!0, l);
  return this.type === L._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? (this.options.ecmaVersion >= 9 && (this.type === L._in ? e > -1 && this.unexpected(e) : t.await = e > -1), this.toAssignable(_, !1, l), this.checkLVal(_), this.parseForIn(t, _)) : (this.checkExpressionErrors(l, !0), e > -1 && this.unexpected(e), this.parseFor(t, _));
};
$t.parseFunctionStatement = function(t, e, n) {
  return this.next(), this.parseFunction(t, Zr | (n ? 0 : To), !1, e);
};
$t.parseIfStatement = function(t) {
  return this.next(), t.test = this.parseParenExpression(), t.consequent = this.parseStatement("if"), t.alternate = this.eat(L._else) ? this.parseStatement("if") : null, this.finishNode(t, "IfStatement");
};
$t.parseReturnStatement = function(t) {
  return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(L.semi) || this.insertSemicolon() ? t.argument = null : (t.argument = this.parseExpression(), this.semicolon()), this.finishNode(t, "ReturnStatement");
};
$t.parseSwitchStatement = function(t) {
  this.next(), t.discriminant = this.parseParenExpression(), t.cases = [], this.expect(L.braceL), this.labels.push(V_), this.enterScope(0);
  for (var e, n = !1; this.type !== L.braceR; )
    if (this.type === L._case || this.type === L._default) {
      var s = this.type === L._case;
      e && this.finishNode(e, "SwitchCase"), t.cases.push(e = this.startNode()), e.consequent = [], this.next(), s ? e.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), n = !0, e.test = null), this.expect(L.colon);
    } else
      e || this.unexpected(), e.consequent.push(this.parseStatement(null));
  return this.exitScope(), e && this.finishNode(e, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(t, "SwitchStatement");
};
$t.parseThrowStatement = function(t) {
  return this.next(), yi.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), t.argument = this.parseExpression(), this.semicolon(), this.finishNode(t, "ThrowStatement");
};
var B_ = [];
$t.parseTryStatement = function(t) {
  if (this.next(), t.block = this.parseBlock(), t.handler = null, this.type === L._catch) {
    var e = this.startNode();
    if (this.next(), this.eat(L.parenL)) {
      e.param = this.parseBindingAtom();
      var n = e.param.type === "Identifier";
      this.enterScope(n ? Lf : 0), this.checkLVal(e.param, n ? zf : sn), this.expect(L.parenR);
    } else
      this.options.ecmaVersion < 10 && this.unexpected(), e.param = null, this.enterScope(0);
    e.body = this.parseBlock(!1), this.exitScope(), t.handler = this.finishNode(e, "CatchClause");
  }
  return t.finalizer = this.eat(L._finally) ? this.parseBlock() : null, !t.handler && !t.finalizer && this.raise(t.start, "Missing catch or finally clause"), this.finishNode(t, "TryStatement");
};
$t.parseVarStatement = function(t, e) {
  return this.next(), this.parseVar(t, !1, e), this.semicolon(), this.finishNode(t, "VariableDeclaration");
};
$t.parseWhileStatement = function(t) {
  return this.next(), t.test = this.parseParenExpression(), this.labels.push(bu), t.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(t, "WhileStatement");
};
$t.parseWithStatement = function(t) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), t.object = this.parseParenExpression(), t.body = this.parseStatement("with"), this.finishNode(t, "WithStatement");
};
$t.parseEmptyStatement = function(t) {
  return this.next(), this.finishNode(t, "EmptyStatement");
};
$t.parseLabeledStatement = function(t, e, n, s) {
  for (var o = 0, l = this.labels; o < l.length; o += 1) {
    var _ = l[o];
    _.name === e && this.raise(n.start, "Label '" + e + "' is already declared");
  }
  for (var v = this.type.isLoop ? "loop" : this.type === L._switch ? "switch" : null, k = this.labels.length - 1; k >= 0; k--) {
    var N = this.labels[k];
    if (N.statementStart === t.start)
      N.statementStart = this.start, N.kind = v;
    else
      break;
  }
  return this.labels.push({ name: e, kind: v, statementStart: this.start }), t.body = this.parseStatement(s ? s.indexOf("label") === -1 ? s + "label" : s : "label"), this.labels.pop(), t.label = n, this.finishNode(t, "LabeledStatement");
};
$t.parseExpressionStatement = function(t, e) {
  return t.expression = e, this.semicolon(), this.finishNode(t, "ExpressionStatement");
};
$t.parseBlock = function(t, e, n) {
  for (t === void 0 && (t = !0), e === void 0 && (e = this.startNode()), e.body = [], this.expect(L.braceL), t && this.enterScope(0); this.type !== L.braceR; ) {
    var s = this.parseStatement(null);
    e.body.push(s);
  }
  return n && (this.strict = !1), this.next(), t && this.exitScope(), this.finishNode(e, "BlockStatement");
};
$t.parseFor = function(t, e) {
  return t.init = e, this.expect(L.semi), t.test = this.type === L.semi ? null : this.parseExpression(), this.expect(L.semi), t.update = this.type === L.parenR ? null : this.parseExpression(), this.expect(L.parenR), t.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(t, "ForStatement");
};
$t.parseForIn = function(t, e) {
  var n = this.type === L._in;
  return this.next(), e.type === "VariableDeclaration" && e.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || e.kind !== "var" || e.declarations[0].id.type !== "Identifier") ? this.raise(
    e.start,
    (n ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
  ) : e.type === "AssignmentPattern" && this.raise(e.start, "Invalid left-hand side in for-loop"), t.left = e, t.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(L.parenR), t.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(t, n ? "ForInStatement" : "ForOfStatement");
};
$t.parseVar = function(t, e, n) {
  for (t.declarations = [], t.kind = n; ; ) {
    var s = this.startNode();
    if (this.parseVarId(s, n), this.eat(L.eq) ? s.init = this.parseMaybeAssign(e) : n === "const" && !(this.type === L._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : s.id.type !== "Identifier" && !(e && (this.type === L._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : s.init = null, t.declarations.push(this.finishNode(s, "VariableDeclarator")), !this.eat(L.comma))
      break;
  }
  return t;
};
$t.parseVarId = function(t, e) {
  t.id = this.parseBindingAtom(), this.checkLVal(t.id, e === "var" ? yu : sn, !1);
};
var Zr = 1, To = 2, Vf = 4;
$t.parseFunction = function(t, e, n, s) {
  this.initFunction(t), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !s) && (this.type === L.star && e & To && this.unexpected(), t.generator = this.eat(L.star)), this.options.ecmaVersion >= 8 && (t.async = !!s), e & Zr && (t.id = e & Vf && this.type !== L.name ? null : this.parseIdent(), t.id && !(e & To) && this.checkLVal(t.id, this.strict || t.generator || t.async ? this.treatFunctionsAsVar ? yu : sn : Ff));
  var o = this.yieldPos, l = this.awaitPos, _ = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(vu(t.async, t.generator)), e & Zr || (t.id = this.type === L.name ? this.parseIdent() : null), this.parseFunctionParams(t), this.parseFunctionBody(t, n, !1), this.yieldPos = o, this.awaitPos = l, this.awaitIdentPos = _, this.finishNode(t, e & Zr ? "FunctionDeclaration" : "FunctionExpression");
};
$t.parseFunctionParams = function(t) {
  this.expect(L.parenL), t.params = this.parseBindingList(L.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
};
$t.parseClass = function(t, e) {
  this.next();
  var n = this.strict;
  this.strict = !0, this.parseClassId(t, e), this.parseClassSuper(t);
  var s = this.startNode(), o = !1;
  for (s.body = [], this.expect(L.braceL); this.type !== L.braceR; ) {
    var l = this.parseClassElement(t.superClass !== null);
    l && (s.body.push(l), l.type === "MethodDefinition" && l.kind === "constructor" && (o && this.raise(l.start, "Duplicate constructor in the same class"), o = !0));
  }
  return this.strict = n, this.next(), t.body = this.finishNode(s, "ClassBody"), this.finishNode(t, e ? "ClassDeclaration" : "ClassExpression");
};
$t.parseClassElement = function(t) {
  var e = this;
  if (this.eat(L.semi))
    return null;
  var n = this.startNode(), s = function(k, N) {
    N === void 0 && (N = !1);
    var z = e.start, q = e.startLoc;
    return e.eatContextual(k) ? e.type !== L.parenL && (!N || !e.canInsertSemicolon()) ? !0 : (n.key && e.unexpected(), n.computed = !1, n.key = e.startNodeAt(z, q), n.key.name = k, e.finishNode(n.key, "Identifier"), !1) : !1;
  };
  n.kind = "method", n.static = s("static");
  var o = this.eat(L.star), l = !1;
  o || (this.options.ecmaVersion >= 8 && s("async", !0) ? (l = !0, o = this.options.ecmaVersion >= 9 && this.eat(L.star)) : s("get") ? n.kind = "get" : s("set") && (n.kind = "set")), n.key || this.parsePropertyName(n);
  var _ = n.key, v = !1;
  return !n.computed && !n.static && (_.type === "Identifier" && _.name === "constructor" || _.type === "Literal" && _.value === "constructor") ? (n.kind !== "method" && this.raise(_.start, "Constructor can't have get/set modifier"), o && this.raise(_.start, "Constructor can't be a generator"), l && this.raise(_.start, "Constructor can't be an async method"), n.kind = "constructor", v = t) : n.static && _.type === "Identifier" && _.name === "prototype" && this.raise(_.start, "Classes may not have a static property named prototype"), this.parseClassMethod(n, o, l, v), n.kind === "get" && n.value.params.length !== 0 && this.raiseRecoverable(n.value.start, "getter should have no params"), n.kind === "set" && n.value.params.length !== 1 && this.raiseRecoverable(n.value.start, "setter should have exactly one param"), n.kind === "set" && n.value.params[0].type === "RestElement" && this.raiseRecoverable(n.value.params[0].start, "Setter cannot use rest params"), n;
};
$t.parseClassMethod = function(t, e, n, s) {
  return t.value = this.parseMethod(e, n, s), this.finishNode(t, "MethodDefinition");
};
$t.parseClassId = function(t, e) {
  this.type === L.name ? (t.id = this.parseIdent(), e && this.checkLVal(t.id, sn, !1)) : (e === !0 && this.unexpected(), t.id = null);
};
$t.parseClassSuper = function(t) {
  t.superClass = this.eat(L._extends) ? this.parseExprSubscripts() : null;
};
$t.parseExport = function(t, e) {
  if (this.next(), this.eat(L.star))
    return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (t.exported = this.parseIdent(!0), this.checkExport(e, t.exported.name, this.lastTokStart)) : t.exported = null), this.expectContextual("from"), this.type !== L.string && this.unexpected(), t.source = this.parseExprAtom(), this.semicolon(), this.finishNode(t, "ExportAllDeclaration");
  if (this.eat(L._default)) {
    this.checkExport(e, "default", this.lastTokStart);
    var n;
    if (this.type === L._function || (n = this.isAsyncFunction())) {
      var s = this.startNode();
      this.next(), n && this.next(), t.declaration = this.parseFunction(s, Zr | Vf, !1, n);
    } else if (this.type === L._class) {
      var o = this.startNode();
      t.declaration = this.parseClass(o, "nullableID");
    } else
      t.declaration = this.parseMaybeAssign(), this.semicolon();
    return this.finishNode(t, "ExportDefaultDeclaration");
  }
  if (this.shouldParseExportStatement())
    t.declaration = this.parseStatement(null), t.declaration.type === "VariableDeclaration" ? this.checkVariableExport(e, t.declaration.declarations) : this.checkExport(e, t.declaration.id.name, t.declaration.id.start), t.specifiers = [], t.source = null;
  else {
    if (t.declaration = null, t.specifiers = this.parseExportSpecifiers(e), this.eatContextual("from"))
      this.type !== L.string && this.unexpected(), t.source = this.parseExprAtom();
    else {
      for (var l = 0, _ = t.specifiers; l < _.length; l += 1) {
        var v = _[l];
        this.checkUnreserved(v.local), this.checkLocalExport(v.local);
      }
      t.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(t, "ExportNamedDeclaration");
};
$t.checkExport = function(t, e, n) {
  t && (ca(t, e) && this.raiseRecoverable(n, "Duplicate export '" + e + "'"), t[e] = !0);
};
$t.checkPatternExport = function(t, e) {
  var n = e.type;
  if (n === "Identifier")
    this.checkExport(t, e.name, e.start);
  else if (n === "ObjectPattern")
    for (var s = 0, o = e.properties; s < o.length; s += 1) {
      var l = o[s];
      this.checkPatternExport(t, l);
    }
  else if (n === "ArrayPattern")
    for (var _ = 0, v = e.elements; _ < v.length; _ += 1) {
      var k = v[_];
      k && this.checkPatternExport(t, k);
    }
  else n === "Property" ? this.checkPatternExport(t, e.value) : n === "AssignmentPattern" ? this.checkPatternExport(t, e.left) : n === "RestElement" ? this.checkPatternExport(t, e.argument) : n === "ParenthesizedExpression" && this.checkPatternExport(t, e.expression);
};
$t.checkVariableExport = function(t, e) {
  if (t)
    for (var n = 0, s = e; n < s.length; n += 1) {
      var o = s[n];
      this.checkPatternExport(t, o.id);
    }
};
$t.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
$t.parseExportSpecifiers = function(t) {
  var e = [], n = !0;
  for (this.expect(L.braceL); !this.eat(L.braceR); ) {
    if (n)
      n = !1;
    else if (this.expect(L.comma), this.afterTrailingComma(L.braceR))
      break;
    var s = this.startNode();
    s.local = this.parseIdent(!0), s.exported = this.eatContextual("as") ? this.parseIdent(!0) : s.local, this.checkExport(t, s.exported.name, s.exported.start), e.push(this.finishNode(s, "ExportSpecifier"));
  }
  return e;
};
$t.parseImport = function(t) {
  return this.next(), this.type === L.string ? (t.specifiers = B_, t.source = this.parseExprAtom()) : (t.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), t.source = this.type === L.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(t, "ImportDeclaration");
};
$t.parseImportSpecifiers = function() {
  var t = [], e = !0;
  if (this.type === L.name) {
    var n = this.startNode();
    if (n.local = this.parseIdent(), this.checkLVal(n.local, sn), t.push(this.finishNode(n, "ImportDefaultSpecifier")), !this.eat(L.comma))
      return t;
  }
  if (this.type === L.star) {
    var s = this.startNode();
    return this.next(), this.expectContextual("as"), s.local = this.parseIdent(), this.checkLVal(s.local, sn), t.push(this.finishNode(s, "ImportNamespaceSpecifier")), t;
  }
  for (this.expect(L.braceL); !this.eat(L.braceR); ) {
    if (e)
      e = !1;
    else if (this.expect(L.comma), this.afterTrailingComma(L.braceR))
      break;
    var o = this.startNode();
    o.imported = this.parseIdent(!0), this.eatContextual("as") ? o.local = this.parseIdent() : (this.checkUnreserved(o.imported), o.local = o.imported), this.checkLVal(o.local, sn), t.push(this.finishNode(o, "ImportSpecifier"));
  }
  return t;
};
$t.adaptDirectivePrologue = function(t) {
  for (var e = 0; e < t.length && this.isDirectiveCandidate(t[e]); ++e)
    t[e].directive = t[e].expression.raw.slice(1, -1);
};
$t.isDirectiveCandidate = function(t) {
  return t.type === "ExpressionStatement" && t.expression.type === "Literal" && typeof t.expression.value == "string" && // Reject parenthesized strings.
  (this.input[t.start] === '"' || this.input[t.start] === "'");
};
var ln = Ae.prototype;
ln.toAssignable = function(t, e, n) {
  if (this.options.ecmaVersion >= 6 && t)
    switch (t.type) {
      case "Identifier":
        this.inAsync && t.name === "await" && this.raise(t.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        t.type = "ObjectPattern", n && this.checkPatternErrors(n, !0);
        for (var s = 0, o = t.properties; s < o.length; s += 1) {
          var l = o[s];
          this.toAssignable(l, e), l.type === "RestElement" && (l.argument.type === "ArrayPattern" || l.argument.type === "ObjectPattern") && this.raise(l.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        t.kind !== "init" && this.raise(t.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(t.value, e);
        break;
      case "ArrayExpression":
        t.type = "ArrayPattern", n && this.checkPatternErrors(n, !0), this.toAssignableList(t.elements, e);
        break;
      case "SpreadElement":
        t.type = "RestElement", this.toAssignable(t.argument, e), t.argument.type === "AssignmentPattern" && this.raise(t.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        t.operator !== "=" && this.raise(t.left.end, "Only '=' operator can be used for specifying default value."), t.type = "AssignmentPattern", delete t.operator, this.toAssignable(t.left, e);
      // falls through to AssignmentPattern
      case "AssignmentPattern":
        break;
      case "ParenthesizedExpression":
        this.toAssignable(t.expression, e, n);
        break;
      case "ChainExpression":
        this.raiseRecoverable(t.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!e)
          break;
      default:
        this.raise(t.start, "Assigning to rvalue");
    }
  else n && this.checkPatternErrors(n, !0);
  return t;
};
ln.toAssignableList = function(t, e) {
  for (var n = t.length, s = 0; s < n; s++) {
    var o = t[s];
    o && this.toAssignable(o, e);
  }
  if (n) {
    var l = t[n - 1];
    this.options.ecmaVersion === 6 && e && l && l.type === "RestElement" && l.argument.type !== "Identifier" && this.unexpected(l.argument.start);
  }
  return t;
};
ln.parseSpread = function(t) {
  var e = this.startNode();
  return this.next(), e.argument = this.parseMaybeAssign(!1, t), this.finishNode(e, "SpreadElement");
};
ln.parseRestBinding = function() {
  var t = this.startNode();
  return this.next(), this.options.ecmaVersion === 6 && this.type !== L.name && this.unexpected(), t.argument = this.parseBindingAtom(), this.finishNode(t, "RestElement");
};
ln.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case L.bracketL:
        var t = this.startNode();
        return this.next(), t.elements = this.parseBindingList(L.bracketR, !0, !0), this.finishNode(t, "ArrayPattern");
      case L.braceL:
        return this.parseObj(!0);
    }
  return this.parseIdent();
};
ln.parseBindingList = function(t, e, n) {
  for (var s = [], o = !0; !this.eat(t); )
    if (o ? o = !1 : this.expect(L.comma), e && this.type === L.comma)
      s.push(null);
    else {
      if (n && this.afterTrailingComma(t))
        break;
      if (this.type === L.ellipsis) {
        var l = this.parseRestBinding();
        this.parseBindingListItem(l), s.push(l), this.type === L.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.expect(t);
        break;
      } else {
        var _ = this.parseMaybeDefault(this.start, this.startLoc);
        this.parseBindingListItem(_), s.push(_);
      }
    }
  return s;
};
ln.parseBindingListItem = function(t) {
  return t;
};
ln.parseMaybeDefault = function(t, e, n) {
  if (n = n || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(L.eq))
    return n;
  var s = this.startNodeAt(t, e);
  return s.left = n, s.right = this.parseMaybeAssign(), this.finishNode(s, "AssignmentPattern");
};
ln.checkLVal = function(t, e, n) {
  switch (e === void 0 && (e = Ml), t.type) {
    case "Identifier":
      e === sn && t.name === "let" && this.raiseRecoverable(t.start, "let is disallowed as a lexically bound name"), this.strict && this.reservedWordsStrictBind.test(t.name) && this.raiseRecoverable(t.start, (e ? "Binding " : "Assigning to ") + t.name + " in strict mode"), n && (ca(n, t.name) && this.raiseRecoverable(t.start, "Argument name clash"), n[t.name] = !0), e !== Ml && e !== Df && this.declareName(t.name, e, t.start);
      break;
    case "ChainExpression":
      this.raiseRecoverable(t.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      e && this.raiseRecoverable(t.start, "Binding member expression");
      break;
    case "ObjectPattern":
      for (var s = 0, o = t.properties; s < o.length; s += 1) {
        var l = o[s];
        this.checkLVal(l, e, n);
      }
      break;
    case "Property":
      this.checkLVal(t.value, e, n);
      break;
    case "ArrayPattern":
      for (var _ = 0, v = t.elements; _ < v.length; _ += 1) {
        var k = v[_];
        k && this.checkLVal(k, e, n);
      }
      break;
    case "AssignmentPattern":
      this.checkLVal(t.left, e, n);
      break;
    case "RestElement":
      this.checkLVal(t.argument, e, n);
      break;
    case "ParenthesizedExpression":
      this.checkLVal(t.expression, e, n);
      break;
    default:
      this.raise(t.start, (e ? "Binding" : "Assigning to") + " rvalue");
  }
};
var ie = Ae.prototype;
ie.checkPropClash = function(t, e, n) {
  if (!(this.options.ecmaVersion >= 9 && t.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (t.computed || t.method || t.shorthand))) {
    var s = t.key, o;
    switch (s.type) {
      case "Identifier":
        o = s.name;
        break;
      case "Literal":
        o = String(s.value);
        break;
      default:
        return;
    }
    var l = t.kind;
    if (this.options.ecmaVersion >= 6) {
      o === "__proto__" && l === "init" && (e.proto && (n ? n.doubleProto < 0 && (n.doubleProto = s.start) : this.raiseRecoverable(s.start, "Redefinition of __proto__ property")), e.proto = !0);
      return;
    }
    o = "$" + o;
    var _ = e[o];
    if (_) {
      var v;
      l === "init" ? v = this.strict && _.init || _.get || _.set : v = _.init || _[l], v && this.raiseRecoverable(s.start, "Redefinition of property");
    } else
      _ = e[o] = {
        init: !1,
        get: !1,
        set: !1
      };
    _[l] = !0;
  }
};
ie.parseExpression = function(t, e) {
  var n = this.start, s = this.startLoc, o = this.parseMaybeAssign(t, e);
  if (this.type === L.comma) {
    var l = this.startNodeAt(n, s);
    for (l.expressions = [o]; this.eat(L.comma); )
      l.expressions.push(this.parseMaybeAssign(t, e));
    return this.finishNode(l, "SequenceExpression");
  }
  return o;
};
ie.parseMaybeAssign = function(t, e, n) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(t);
    this.exprAllowed = !1;
  }
  var s = !1, o = -1, l = -1;
  e ? (o = e.parenthesizedAssign, l = e.trailingComma, e.parenthesizedAssign = e.trailingComma = -1) : (e = new da(), s = !0);
  var _ = this.start, v = this.startLoc;
  (this.type === L.parenL || this.type === L.name) && (this.potentialArrowAt = this.start);
  var k = this.parseMaybeConditional(t, e);
  if (n && (k = n.call(this, k, _, v)), this.type.isAssign) {
    var N = this.startNodeAt(_, v);
    return N.operator = this.value, N.left = this.type === L.eq ? this.toAssignable(k, !1, e) : k, s || (e.parenthesizedAssign = e.trailingComma = e.doubleProto = -1), e.shorthandAssign >= N.left.start && (e.shorthandAssign = -1), this.checkLVal(k), this.next(), N.right = this.parseMaybeAssign(t), this.finishNode(N, "AssignmentExpression");
  } else
    s && this.checkExpressionErrors(e, !0);
  return o > -1 && (e.parenthesizedAssign = o), l > -1 && (e.trailingComma = l), k;
};
ie.parseMaybeConditional = function(t, e) {
  var n = this.start, s = this.startLoc, o = this.parseExprOps(t, e);
  if (this.checkExpressionErrors(e))
    return o;
  if (this.eat(L.question)) {
    var l = this.startNodeAt(n, s);
    return l.test = o, l.consequent = this.parseMaybeAssign(), this.expect(L.colon), l.alternate = this.parseMaybeAssign(t), this.finishNode(l, "ConditionalExpression");
  }
  return o;
};
ie.parseExprOps = function(t, e) {
  var n = this.start, s = this.startLoc, o = this.parseMaybeUnary(e, !1);
  return this.checkExpressionErrors(e) || o.start === n && o.type === "ArrowFunctionExpression" ? o : this.parseExprOp(o, n, s, -1, t);
};
ie.parseExprOp = function(t, e, n, s, o) {
  var l = this.type.binop;
  if (l != null && (!o || this.type !== L._in) && l > s) {
    var _ = this.type === L.logicalOR || this.type === L.logicalAND, v = this.type === L.coalesce;
    v && (l = L.logicalAND.binop);
    var k = this.value;
    this.next();
    var N = this.start, z = this.startLoc, q = this.parseExprOp(this.parseMaybeUnary(null, !1), N, z, l, o), tt = this.buildBinary(e, n, t, q, k, _ || v);
    return (_ && this.type === L.coalesce || v && (this.type === L.logicalOR || this.type === L.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(tt, e, n, s, o);
  }
  return t;
};
ie.buildBinary = function(t, e, n, s, o, l) {
  var _ = this.startNodeAt(t, e);
  return _.left = n, _.operator = o, _.right = s, this.finishNode(_, l ? "LogicalExpression" : "BinaryExpression");
};
ie.parseMaybeUnary = function(t, e) {
  var n = this.start, s = this.startLoc, o;
  if (this.isContextual("await") && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction))
    o = this.parseAwait(), e = !0;
  else if (this.type.prefix) {
    var l = this.startNode(), _ = this.type === L.incDec;
    l.operator = this.value, l.prefix = !0, this.next(), l.argument = this.parseMaybeUnary(null, !0), this.checkExpressionErrors(t, !0), _ ? this.checkLVal(l.argument) : this.strict && l.operator === "delete" && l.argument.type === "Identifier" ? this.raiseRecoverable(l.start, "Deleting local variable in strict mode") : e = !0, o = this.finishNode(l, _ ? "UpdateExpression" : "UnaryExpression");
  } else {
    if (o = this.parseExprSubscripts(t), this.checkExpressionErrors(t))
      return o;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var v = this.startNodeAt(n, s);
      v.operator = this.value, v.prefix = !1, v.argument = o, this.checkLVal(o), this.next(), o = this.finishNode(v, "UpdateExpression");
    }
  }
  return !e && this.eat(L.starstar) ? this.buildBinary(n, s, o, this.parseMaybeUnary(null, !1), "**", !1) : o;
};
ie.parseExprSubscripts = function(t) {
  var e = this.start, n = this.startLoc, s = this.parseExprAtom(t);
  if (s.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    return s;
  var o = this.parseSubscripts(s, e, n);
  return t && o.type === "MemberExpression" && (t.parenthesizedAssign >= o.start && (t.parenthesizedAssign = -1), t.parenthesizedBind >= o.start && (t.parenthesizedBind = -1)), o;
};
ie.parseSubscripts = function(t, e, n, s) {
  for (var o = this.options.ecmaVersion >= 8 && t.type === "Identifier" && t.name === "async" && this.lastTokEnd === t.end && !this.canInsertSemicolon() && t.end - t.start === 5 && this.potentialArrowAt === t.start, l = !1; ; ) {
    var _ = this.parseSubscript(t, e, n, s, o, l);
    if (_.optional && (l = !0), _ === t || _.type === "ArrowFunctionExpression") {
      if (l) {
        var v = this.startNodeAt(e, n);
        v.expression = _, _ = this.finishNode(v, "ChainExpression");
      }
      return _;
    }
    t = _;
  }
};
ie.parseSubscript = function(t, e, n, s, o, l) {
  var _ = this.options.ecmaVersion >= 11, v = _ && this.eat(L.questionDot);
  s && v && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var k = this.eat(L.bracketL);
  if (k || v && this.type !== L.parenL && this.type !== L.backQuote || this.eat(L.dot)) {
    var N = this.startNodeAt(e, n);
    N.object = t, N.property = k ? this.parseExpression() : this.parseIdent(this.options.allowReserved !== "never"), N.computed = !!k, k && this.expect(L.bracketR), _ && (N.optional = v), t = this.finishNode(N, "MemberExpression");
  } else if (!s && this.eat(L.parenL)) {
    var z = new da(), q = this.yieldPos, tt = this.awaitPos, F = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var mt = this.parseExprList(L.parenR, this.options.ecmaVersion >= 8, !1, z);
    if (o && !v && !this.canInsertSemicolon() && this.eat(L.arrow))
      return this.checkPatternErrors(z, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = q, this.awaitPos = tt, this.awaitIdentPos = F, this.parseArrowExpression(this.startNodeAt(e, n), mt, !0);
    this.checkExpressionErrors(z, !0), this.yieldPos = q || this.yieldPos, this.awaitPos = tt || this.awaitPos, this.awaitIdentPos = F || this.awaitIdentPos;
    var X = this.startNodeAt(e, n);
    X.callee = t, X.arguments = mt, _ && (X.optional = v), t = this.finishNode(X, "CallExpression");
  } else if (this.type === L.backQuote) {
    (v || l) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var It = this.startNodeAt(e, n);
    It.tag = t, It.quasi = this.parseTemplate({ isTagged: !0 }), t = this.finishNode(It, "TaggedTemplateExpression");
  }
  return t;
};
ie.parseExprAtom = function(t) {
  this.type === L.slash && this.readRegexp();
  var e, n = this.potentialArrowAt === this.start;
  switch (this.type) {
    case L._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), e = this.startNode(), this.next(), this.type === L.parenL && !this.allowDirectSuper && this.raise(e.start, "super() call outside constructor of a subclass"), this.type !== L.dot && this.type !== L.bracketL && this.type !== L.parenL && this.unexpected(), this.finishNode(e, "Super");
    case L._this:
      return e = this.startNode(), this.next(), this.finishNode(e, "ThisExpression");
    case L.name:
      var s = this.start, o = this.startLoc, l = this.containsEsc, _ = this.parseIdent(!1);
      if (this.options.ecmaVersion >= 8 && !l && _.name === "async" && !this.canInsertSemicolon() && this.eat(L._function))
        return this.parseFunction(this.startNodeAt(s, o), 0, !1, !0);
      if (n && !this.canInsertSemicolon()) {
        if (this.eat(L.arrow))
          return this.parseArrowExpression(this.startNodeAt(s, o), [_], !1);
        if (this.options.ecmaVersion >= 8 && _.name === "async" && this.type === L.name && !l)
          return _ = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(L.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(s, o), [_], !0);
      }
      return _;
    case L.regexp:
      var v = this.value;
      return e = this.parseLiteral(v.value), e.regex = { pattern: v.pattern, flags: v.flags }, e;
    case L.num:
    case L.string:
      return this.parseLiteral(this.value);
    case L._null:
    case L._true:
    case L._false:
      return e = this.startNode(), e.value = this.type === L._null ? null : this.type === L._true, e.raw = this.type.keyword, this.next(), this.finishNode(e, "Literal");
    case L.parenL:
      var k = this.start, N = this.parseParenAndDistinguishExpression(n);
      return t && (t.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(N) && (t.parenthesizedAssign = k), t.parenthesizedBind < 0 && (t.parenthesizedBind = k)), N;
    case L.bracketL:
      return e = this.startNode(), this.next(), e.elements = this.parseExprList(L.bracketR, !0, !0, t), this.finishNode(e, "ArrayExpression");
    case L.braceL:
      return this.parseObj(!1, t);
    case L._function:
      return e = this.startNode(), this.next(), this.parseFunction(e, 0);
    case L._class:
      return this.parseClass(this.startNode(), !1);
    case L._new:
      return this.parseNew();
    case L.backQuote:
      return this.parseTemplate();
    case L._import:
      return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected();
    default:
      this.unexpected();
  }
};
ie.parseExprImport = function() {
  var t = this.startNode();
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import");
  var e = this.parseIdent(!0);
  switch (this.type) {
    case L.parenL:
      return this.parseDynamicImport(t);
    case L.dot:
      return t.meta = e, this.parseImportMeta(t);
    default:
      this.unexpected();
  }
};
ie.parseDynamicImport = function(t) {
  if (this.next(), t.source = this.parseMaybeAssign(), !this.eat(L.parenR)) {
    var e = this.start;
    this.eat(L.comma) && this.eat(L.parenR) ? this.raiseRecoverable(e, "Trailing comma is not allowed in import()") : this.unexpected(e);
  }
  return this.finishNode(t, "ImportExpression");
};
ie.parseImportMeta = function(t) {
  this.next();
  var e = this.containsEsc;
  return t.property = this.parseIdent(!0), t.property.name !== "meta" && this.raiseRecoverable(t.property.start, "The only valid meta property for import is 'import.meta'"), e && this.raiseRecoverable(t.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && this.raiseRecoverable(t.start, "Cannot use 'import.meta' outside a module"), this.finishNode(t, "MetaProperty");
};
ie.parseLiteral = function(t) {
  var e = this.startNode();
  return e.value = t, e.raw = this.input.slice(this.start, this.end), e.raw.charCodeAt(e.raw.length - 1) === 110 && (e.bigint = e.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(e, "Literal");
};
ie.parseParenExpression = function() {
  this.expect(L.parenL);
  var t = this.parseExpression();
  return this.expect(L.parenR), t;
};
ie.parseParenAndDistinguishExpression = function(t) {
  var e = this.start, n = this.startLoc, s, o = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var l = this.start, _ = this.startLoc, v = [], k = !0, N = !1, z = new da(), q = this.yieldPos, tt = this.awaitPos, F;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== L.parenR; )
      if (k ? k = !1 : this.expect(L.comma), o && this.afterTrailingComma(L.parenR, !0)) {
        N = !0;
        break;
      } else if (this.type === L.ellipsis) {
        F = this.start, v.push(this.parseParenItem(this.parseRestBinding())), this.type === L.comma && this.raise(this.start, "Comma is not permitted after the rest element");
        break;
      } else
        v.push(this.parseMaybeAssign(!1, z, this.parseParenItem));
    var mt = this.start, X = this.startLoc;
    if (this.expect(L.parenR), t && !this.canInsertSemicolon() && this.eat(L.arrow))
      return this.checkPatternErrors(z, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = q, this.awaitPos = tt, this.parseParenArrowList(e, n, v);
    (!v.length || N) && this.unexpected(this.lastTokStart), F && this.unexpected(F), this.checkExpressionErrors(z, !0), this.yieldPos = q || this.yieldPos, this.awaitPos = tt || this.awaitPos, v.length > 1 ? (s = this.startNodeAt(l, _), s.expressions = v, this.finishNodeAt(s, "SequenceExpression", mt, X)) : s = v[0];
  } else
    s = this.parseParenExpression();
  if (this.options.preserveParens) {
    var It = this.startNodeAt(e, n);
    return It.expression = s, this.finishNode(It, "ParenthesizedExpression");
  } else
    return s;
};
ie.parseParenItem = function(t) {
  return t;
};
ie.parseParenArrowList = function(t, e, n) {
  return this.parseArrowExpression(this.startNodeAt(t, e), n);
};
var U_ = [];
ie.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var t = this.startNode(), e = this.parseIdent(!0);
  if (this.options.ecmaVersion >= 6 && this.eat(L.dot)) {
    t.meta = e;
    var n = this.containsEsc;
    return t.property = this.parseIdent(!0), t.property.name !== "target" && this.raiseRecoverable(t.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(t.start, "'new.target' must not contain escaped characters"), this.inNonArrowFunction() || this.raiseRecoverable(t.start, "'new.target' can only be used in functions"), this.finishNode(t, "MetaProperty");
  }
  var s = this.start, o = this.startLoc, l = this.type === L._import;
  return t.callee = this.parseSubscripts(this.parseExprAtom(), s, o, !0), l && t.callee.type === "ImportExpression" && this.raise(s, "Cannot use new with import()"), this.eat(L.parenL) ? t.arguments = this.parseExprList(L.parenR, this.options.ecmaVersion >= 8, !1) : t.arguments = U_, this.finishNode(t, "NewExpression");
};
ie.parseTemplateElement = function(t) {
  var e = t.isTagged, n = this.startNode();
  return this.type === L.invalidTemplate ? (e || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), n.value = {
    raw: this.value,
    cooked: null
  }) : n.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
    cooked: this.value
  }, this.next(), n.tail = this.type === L.backQuote, this.finishNode(n, "TemplateElement");
};
ie.parseTemplate = function(t) {
  t === void 0 && (t = {});
  var e = t.isTagged;
  e === void 0 && (e = !1);
  var n = this.startNode();
  this.next(), n.expressions = [];
  var s = this.parseTemplateElement({ isTagged: e });
  for (n.quasis = [s]; !s.tail; )
    this.type === L.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(L.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(L.braceR), n.quasis.push(s = this.parseTemplateElement({ isTagged: e }));
  return this.next(), this.finishNode(n, "TemplateLiteral");
};
ie.isAsyncProp = function(t) {
  return !t.computed && t.key.type === "Identifier" && t.key.name === "async" && (this.type === L.name || this.type === L.num || this.type === L.string || this.type === L.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === L.star) && !yi.test(this.input.slice(this.lastTokEnd, this.start));
};
ie.parseObj = function(t, e) {
  var n = this.startNode(), s = !0, o = {};
  for (n.properties = [], this.next(); !this.eat(L.braceR); ) {
    if (s)
      s = !1;
    else if (this.expect(L.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(L.braceR))
      break;
    var l = this.parseProperty(t, e);
    t || this.checkPropClash(l, o, e), n.properties.push(l);
  }
  return this.finishNode(n, t ? "ObjectPattern" : "ObjectExpression");
};
ie.parseProperty = function(t, e) {
  var n = this.startNode(), s, o, l, _;
  if (this.options.ecmaVersion >= 9 && this.eat(L.ellipsis))
    return t ? (n.argument = this.parseIdent(!1), this.type === L.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(n, "RestElement")) : (this.type === L.parenL && e && (e.parenthesizedAssign < 0 && (e.parenthesizedAssign = this.start), e.parenthesizedBind < 0 && (e.parenthesizedBind = this.start)), n.argument = this.parseMaybeAssign(!1, e), this.type === L.comma && e && e.trailingComma < 0 && (e.trailingComma = this.start), this.finishNode(n, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (t || e) && (l = this.start, _ = this.startLoc), t || (s = this.eat(L.star)));
  var v = this.containsEsc;
  return this.parsePropertyName(n), !t && !v && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(n) ? (o = !0, s = this.options.ecmaVersion >= 9 && this.eat(L.star), this.parsePropertyName(n, e)) : o = !1, this.parsePropertyValue(n, t, s, o, l, _, e, v), this.finishNode(n, "Property");
};
ie.parsePropertyValue = function(t, e, n, s, o, l, _, v) {
  if ((n || s) && this.type === L.colon && this.unexpected(), this.eat(L.colon))
    t.value = e ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, _), t.kind = "init";
  else if (this.options.ecmaVersion >= 6 && this.type === L.parenL)
    e && this.unexpected(), t.kind = "init", t.method = !0, t.value = this.parseMethod(n, s);
  else if (!e && !v && this.options.ecmaVersion >= 5 && !t.computed && t.key.type === "Identifier" && (t.key.name === "get" || t.key.name === "set") && this.type !== L.comma && this.type !== L.braceR && this.type !== L.eq) {
    (n || s) && this.unexpected(), t.kind = t.key.name, this.parsePropertyName(t), t.value = this.parseMethod(!1);
    var k = t.kind === "get" ? 0 : 1;
    if (t.value.params.length !== k) {
      var N = t.value.start;
      t.kind === "get" ? this.raiseRecoverable(N, "getter should have no params") : this.raiseRecoverable(N, "setter should have exactly one param");
    } else
      t.kind === "set" && t.value.params[0].type === "RestElement" && this.raiseRecoverable(t.value.params[0].start, "Setter cannot use rest params");
  } else this.options.ecmaVersion >= 6 && !t.computed && t.key.type === "Identifier" ? ((n || s) && this.unexpected(), this.checkUnreserved(t.key), t.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = o), t.kind = "init", e ? t.value = this.parseMaybeDefault(o, l, t.key) : this.type === L.eq && _ ? (_.shorthandAssign < 0 && (_.shorthandAssign = this.start), t.value = this.parseMaybeDefault(o, l, t.key)) : t.value = t.key, t.shorthand = !0) : this.unexpected();
};
ie.parsePropertyName = function(t) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(L.bracketL))
      return t.computed = !0, t.key = this.parseMaybeAssign(), this.expect(L.bracketR), t.key;
    t.computed = !1;
  }
  return t.key = this.type === L.num || this.type === L.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
ie.initFunction = function(t) {
  t.id = null, this.options.ecmaVersion >= 6 && (t.generator = t.expression = !1), this.options.ecmaVersion >= 8 && (t.async = !1);
};
ie.parseMethod = function(t, e, n) {
  var s = this.startNode(), o = this.yieldPos, l = this.awaitPos, _ = this.awaitIdentPos;
  return this.initFunction(s), this.options.ecmaVersion >= 6 && (s.generator = t), this.options.ecmaVersion >= 8 && (s.async = !!e), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(vu(e, s.generator) | Nf | (n ? Rf : 0)), this.expect(L.parenL), s.params = this.parseBindingList(L.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(s, !1, !0), this.yieldPos = o, this.awaitPos = l, this.awaitIdentPos = _, this.finishNode(s, "FunctionExpression");
};
ie.parseArrowExpression = function(t, e, n) {
  var s = this.yieldPos, o = this.awaitPos, l = this.awaitIdentPos;
  return this.enterScope(vu(n, !1) | Mf), this.initFunction(t), this.options.ecmaVersion >= 8 && (t.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, t.params = this.toAssignableList(e, !0), this.parseFunctionBody(t, !0, !1), this.yieldPos = s, this.awaitPos = o, this.awaitIdentPos = l, this.finishNode(t, "ArrowFunctionExpression");
};
ie.parseFunctionBody = function(t, e, n) {
  var s = e && this.type !== L.braceL, o = this.strict, l = !1;
  if (s)
    t.body = this.parseMaybeAssign(), t.expression = !0, this.checkParams(t, !1);
  else {
    var _ = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(t.params);
    (!o || _) && (l = this.strictDirective(this.end), l && _ && this.raiseRecoverable(t.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
    var v = this.labels;
    this.labels = [], l && (this.strict = !0), this.checkParams(t, !o && !l && !e && !n && this.isSimpleParamList(t.params)), this.strict && t.id && this.checkLVal(t.id, Df), t.body = this.parseBlock(!1, void 0, l && !o), t.expression = !1, this.adaptDirectivePrologue(t.body.body), this.labels = v;
  }
  this.exitScope();
};
ie.isSimpleParamList = function(t) {
  for (var e = 0, n = t; e < n.length; e += 1) {
    var s = n[e];
    if (s.type !== "Identifier")
      return !1;
  }
  return !0;
};
ie.checkParams = function(t, e) {
  for (var n = {}, s = 0, o = t.params; s < o.length; s += 1) {
    var l = o[s];
    this.checkLVal(l, yu, e ? null : n);
  }
};
ie.parseExprList = function(t, e, n, s) {
  for (var o = [], l = !0; !this.eat(t); ) {
    if (l)
      l = !1;
    else if (this.expect(L.comma), e && this.afterTrailingComma(t))
      break;
    var _ = void 0;
    n && this.type === L.comma ? _ = null : this.type === L.ellipsis ? (_ = this.parseSpread(s), s && this.type === L.comma && s.trailingComma < 0 && (s.trailingComma = this.start)) : _ = this.parseMaybeAssign(!1, s), o.push(_);
  }
  return o;
};
ie.checkUnreserved = function(t) {
  var e = t.start, n = t.end, s = t.name;
  if (this.inGenerator && s === "yield" && this.raiseRecoverable(e, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && s === "await" && this.raiseRecoverable(e, "Cannot use 'await' as identifier inside an async function"), this.keywords.test(s) && this.raise(e, "Unexpected keyword '" + s + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(e, n).indexOf("\\") !== -1)) {
    var o = this.strict ? this.reservedWordsStrict : this.reservedWords;
    o.test(s) && (!this.inAsync && s === "await" && this.raiseRecoverable(e, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(e, "The keyword '" + s + "' is reserved"));
  }
};
ie.parseIdent = function(t, e) {
  var n = this.startNode();
  return this.type === L.name ? n.name = this.value : this.type.keyword ? (n.name = this.type.keyword, (n.name === "class" || n.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop()) : this.unexpected(), this.next(!!t), this.finishNode(n, "Identifier"), t || (this.checkUnreserved(n), n.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = n.start)), n;
};
ie.parseYield = function(t) {
  this.yieldPos || (this.yieldPos = this.start);
  var e = this.startNode();
  return this.next(), this.type === L.semi || this.canInsertSemicolon() || this.type !== L.star && !this.type.startsExpr ? (e.delegate = !1, e.argument = null) : (e.delegate = this.eat(L.star), e.argument = this.parseMaybeAssign(t)), this.finishNode(e, "YieldExpression");
};
ie.parseAwait = function() {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeUnary(null, !1), this.finishNode(t, "AwaitExpression");
};
var Zs = Ae.prototype;
Zs.raise = function(t, e) {
  var n = _u(this.input, t);
  e += " (" + n.line + ":" + n.column + ")";
  var s = new SyntaxError(e);
  throw s.pos = t, s.loc = n, s.raisedAt = this.pos, s;
};
Zs.raiseRecoverable = Zs.raise;
Zs.curPosition = function() {
  if (this.options.locations)
    return new Cr(this.curLine, this.pos - this.lineStart);
};
var On = Ae.prototype, q_ = function(e) {
  this.flags = e, this.var = [], this.lexical = [], this.functions = [];
};
On.enterScope = function(t) {
  this.scopeStack.push(new q_(t));
};
On.exitScope = function() {
  this.scopeStack.pop();
};
On.treatFunctionsAsVarInScope = function(t) {
  return t.flags & ds || !this.inModule && t.flags & ns;
};
On.declareName = function(t, e, n) {
  var s = !1;
  if (e === sn) {
    var o = this.currentScope();
    s = o.lexical.indexOf(t) > -1 || o.functions.indexOf(t) > -1 || o.var.indexOf(t) > -1, o.lexical.push(t), this.inModule && o.flags & ns && delete this.undefinedExports[t];
  } else if (e === zf) {
    var l = this.currentScope();
    l.lexical.push(t);
  } else if (e === Ff) {
    var _ = this.currentScope();
    this.treatFunctionsAsVar ? s = _.lexical.indexOf(t) > -1 : s = _.lexical.indexOf(t) > -1 || _.var.indexOf(t) > -1, _.functions.push(t);
  } else
    for (var v = this.scopeStack.length - 1; v >= 0; --v) {
      var k = this.scopeStack[v];
      if (k.lexical.indexOf(t) > -1 && !(k.flags & Lf && k.lexical[0] === t) || !this.treatFunctionsAsVarInScope(k) && k.functions.indexOf(t) > -1) {
        s = !0;
        break;
      }
      if (k.var.push(t), this.inModule && k.flags & ns && delete this.undefinedExports[t], k.flags & mu)
        break;
    }
  s && this.raiseRecoverable(n, "Identifier '" + t + "' has already been declared");
};
On.checkLocalExport = function(t) {
  this.scopeStack[0].lexical.indexOf(t.name) === -1 && this.scopeStack[0].var.indexOf(t.name) === -1 && (this.undefinedExports[t.name] = t);
};
On.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
On.currentVarScope = function() {
  for (var t = this.scopeStack.length - 1; ; t--) {
    var e = this.scopeStack[t];
    if (e.flags & mu)
      return e;
  }
};
On.currentThisScope = function() {
  for (var t = this.scopeStack.length - 1; ; t--) {
    var e = this.scopeStack[t];
    if (e.flags & mu && !(e.flags & Mf))
      return e;
  }
};
var pa = function(e, n, s) {
  this.type = "", this.start = n, this.end = 0, e.options.locations && (this.loc = new cs(e, s)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [n, 0]);
}, ga = Ae.prototype;
ga.startNode = function() {
  return new pa(this, this.start, this.startLoc);
};
ga.startNodeAt = function(t, e) {
  return new pa(this, t, e);
};
function Bf(t, e, n, s) {
  return t.type = e, t.end = n, this.options.locations && (t.loc.end = s), this.options.ranges && (t.range[1] = n), t;
}
ga.finishNode = function(t, e) {
  return Bf.call(this, t, e, this.lastTokEnd, this.lastTokEndLoc);
};
ga.finishNodeAt = function(t, e, n, s) {
  return Bf.call(this, t, e, n, s);
};
var Ci = function(e, n, s, o, l) {
  this.token = e, this.isExpr = !!n, this.preserveSpace = !!s, this.override = o, this.generator = !!l;
}, Ee = {
  b_stat: new Ci("{", !1),
  b_expr: new Ci("{", !0),
  b_tmpl: new Ci("${", !1),
  p_stat: new Ci("(", !1),
  p_expr: new Ci("(", !0),
  q_tmpl: new Ci("`", !0, !0, function(t) {
    return t.tryReadTemplateToken();
  }),
  f_stat: new Ci("function", !1),
  f_expr: new Ci("function", !0),
  f_expr_gen: new Ci("function", !0, !1, null, !0),
  f_gen: new Ci("function", !1, !1, null, !0)
}, _a = Ae.prototype;
_a.initialContext = function() {
  return [Ee.b_stat];
};
_a.braceIsBlock = function(t) {
  var e = this.curContext();
  return e === Ee.f_expr || e === Ee.f_stat ? !0 : t === L.colon && (e === Ee.b_stat || e === Ee.b_expr) ? !e.isExpr : t === L._return || t === L.name && this.exprAllowed ? yi.test(this.input.slice(this.lastTokEnd, this.start)) : t === L._else || t === L.semi || t === L.eof || t === L.parenR || t === L.arrow ? !0 : t === L.braceL ? e === Ee.b_stat : t === L._var || t === L._const || t === L.name ? !1 : !this.exprAllowed;
};
_a.inGeneratorContext = function() {
  for (var t = this.context.length - 1; t >= 1; t--) {
    var e = this.context[t];
    if (e.token === "function")
      return e.generator;
  }
  return !1;
};
_a.updateContext = function(t) {
  var e, n = this.type;
  n.keyword && t === L.dot ? this.exprAllowed = !1 : (e = n.updateContext) ? e.call(this, t) : this.exprAllowed = n.beforeExpr;
};
L.parenR.updateContext = L.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = !0;
    return;
  }
  var t = this.context.pop();
  t === Ee.b_stat && this.curContext().token === "function" && (t = this.context.pop()), this.exprAllowed = !t.isExpr;
};
L.braceL.updateContext = function(t) {
  this.context.push(this.braceIsBlock(t) ? Ee.b_stat : Ee.b_expr), this.exprAllowed = !0;
};
L.dollarBraceL.updateContext = function() {
  this.context.push(Ee.b_tmpl), this.exprAllowed = !0;
};
L.parenL.updateContext = function(t) {
  var e = t === L._if || t === L._for || t === L._with || t === L._while;
  this.context.push(e ? Ee.p_stat : Ee.p_expr), this.exprAllowed = !0;
};
L.incDec.updateContext = function() {
};
L._function.updateContext = L._class.updateContext = function(t) {
  t.beforeExpr && t !== L.semi && t !== L._else && !(t === L._return && yi.test(this.input.slice(this.lastTokEnd, this.start))) && !((t === L.colon || t === L.braceL) && this.curContext() === Ee.b_stat) ? this.context.push(Ee.f_expr) : this.context.push(Ee.f_stat), this.exprAllowed = !1;
};
L.backQuote.updateContext = function() {
  this.curContext() === Ee.q_tmpl ? this.context.pop() : this.context.push(Ee.q_tmpl), this.exprAllowed = !1;
};
L.star.updateContext = function(t) {
  if (t === L._function) {
    var e = this.context.length - 1;
    this.context[e] === Ee.f_expr ? this.context[e] = Ee.f_expr_gen : this.context[e] = Ee.f_gen;
  }
  this.exprAllowed = !0;
};
L.name.updateContext = function(t) {
  var e = !1;
  this.options.ecmaVersion >= 6 && t !== L.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (e = !0), this.exprAllowed = e;
};
var Uf = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", qf = Uf + " Extended_Pictographic", j_ = qf, H_ = {
  9: Uf,
  10: qf,
  11: j_
}, Ll = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", jf = "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", Hf = jf + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", W_ = Hf + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", G_ = {
  9: jf,
  10: Hf,
  11: W_
}, Wf = {};
function xu(t) {
  var e = Wf[t] = {
    binary: Wn(H_[t] + " " + Ll),
    nonBinary: {
      General_Category: Wn(Ll),
      Script: Wn(G_[t])
    }
  };
  e.nonBinary.Script_Extensions = e.nonBinary.Script, e.nonBinary.gc = e.nonBinary.General_Category, e.nonBinary.sc = e.nonBinary.Script, e.nonBinary.scx = e.nonBinary.Script_Extensions;
}
xu(9);
xu(10);
xu(11);
var Lt = Ae.prototype, hn = function(e) {
  this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >= 9 ? "s" : ""), this.unicodeProperties = Wf[e.options.ecmaVersion >= 11 ? 11 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = [], this.backReferenceNames = [];
};
hn.prototype.reset = function(e, n, s) {
  var o = s.indexOf("u") !== -1;
  this.start = e | 0, this.source = n + "", this.flags = s, this.switchU = o && this.parser.options.ecmaVersion >= 6, this.switchN = o && this.parser.options.ecmaVersion >= 9;
};
hn.prototype.raise = function(e) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);
};
hn.prototype.at = function(e, n) {
  n === void 0 && (n = !1);
  var s = this.source, o = s.length;
  if (e >= o)
    return -1;
  var l = s.charCodeAt(e);
  if (!(n || this.switchU) || l <= 55295 || l >= 57344 || e + 1 >= o)
    return l;
  var _ = s.charCodeAt(e + 1);
  return _ >= 56320 && _ <= 57343 ? (l << 10) + _ - 56613888 : l;
};
hn.prototype.nextIndex = function(e, n) {
  n === void 0 && (n = !1);
  var s = this.source, o = s.length;
  if (e >= o)
    return o;
  var l = s.charCodeAt(e), _;
  return !(n || this.switchU) || l <= 55295 || l >= 57344 || e + 1 >= o || (_ = s.charCodeAt(e + 1)) < 56320 || _ > 57343 ? e + 1 : e + 2;
};
hn.prototype.current = function(e) {
  return e === void 0 && (e = !1), this.at(this.pos, e);
};
hn.prototype.lookahead = function(e) {
  return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
};
hn.prototype.advance = function(e) {
  e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
};
hn.prototype.eat = function(e, n) {
  return n === void 0 && (n = !1), this.current(n) === e ? (this.advance(n), !0) : !1;
};
function Ks(t) {
  return t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10) + 55296, (t & 1023) + 56320));
}
Lt.validateRegExpFlags = function(t) {
  for (var e = t.validFlags, n = t.flags, s = 0; s < n.length; s++) {
    var o = n.charAt(s);
    e.indexOf(o) === -1 && this.raise(t.start, "Invalid regular expression flag"), n.indexOf(o, s + 1) > -1 && this.raise(t.start, "Duplicate regular expression flag");
  }
};
Lt.validateRegExpPattern = function(t) {
  this.regexp_pattern(t), !t.switchN && this.options.ecmaVersion >= 9 && t.groupNames.length > 0 && (t.switchN = !0, this.regexp_pattern(t));
};
Lt.regexp_pattern = function(t) {
  t.pos = 0, t.lastIntValue = 0, t.lastStringValue = "", t.lastAssertionIsQuantifiable = !1, t.numCapturingParens = 0, t.maxBackReference = 0, t.groupNames.length = 0, t.backReferenceNames.length = 0, this.regexp_disjunction(t), t.pos !== t.source.length && (t.eat(
    41
    /* ) */
  ) && t.raise("Unmatched ')'"), (t.eat(
    93
    /* ] */
  ) || t.eat(
    125
    /* } */
  )) && t.raise("Lone quantifier brackets")), t.maxBackReference > t.numCapturingParens && t.raise("Invalid escape");
  for (var e = 0, n = t.backReferenceNames; e < n.length; e += 1) {
    var s = n[e];
    t.groupNames.indexOf(s) === -1 && t.raise("Invalid named capture referenced");
  }
};
Lt.regexp_disjunction = function(t) {
  for (this.regexp_alternative(t); t.eat(
    124
    /* | */
  ); )
    this.regexp_alternative(t);
  this.regexp_eatQuantifier(t, !0) && t.raise("Nothing to repeat"), t.eat(
    123
    /* { */
  ) && t.raise("Lone quantifier brackets");
};
Lt.regexp_alternative = function(t) {
  for (; t.pos < t.source.length && this.regexp_eatTerm(t); )
    ;
};
Lt.regexp_eatTerm = function(t) {
  return this.regexp_eatAssertion(t) ? (t.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(t) && t.switchU && t.raise("Invalid quantifier"), !0) : (t.switchU ? this.regexp_eatAtom(t) : this.regexp_eatExtendedAtom(t)) ? (this.regexp_eatQuantifier(t), !0) : !1;
};
Lt.regexp_eatAssertion = function(t) {
  var e = t.pos;
  if (t.lastAssertionIsQuantifiable = !1, t.eat(
    94
    /* ^ */
  ) || t.eat(
    36
    /* $ */
  ))
    return !0;
  if (t.eat(
    92
    /* \ */
  )) {
    if (t.eat(
      66
      /* B */
    ) || t.eat(
      98
      /* b */
    ))
      return !0;
    t.pos = e;
  }
  if (t.eat(
    40
    /* ( */
  ) && t.eat(
    63
    /* ? */
  )) {
    var n = !1;
    if (this.options.ecmaVersion >= 9 && (n = t.eat(
      60
      /* < */
    )), t.eat(
      61
      /* = */
    ) || t.eat(
      33
      /* ! */
    ))
      return this.regexp_disjunction(t), t.eat(
        41
        /* ) */
      ) || t.raise("Unterminated group"), t.lastAssertionIsQuantifiable = !n, !0;
  }
  return t.pos = e, !1;
};
Lt.regexp_eatQuantifier = function(t, e) {
  return e === void 0 && (e = !1), this.regexp_eatQuantifierPrefix(t, e) ? (t.eat(
    63
    /* ? */
  ), !0) : !1;
};
Lt.regexp_eatQuantifierPrefix = function(t, e) {
  return t.eat(
    42
    /* * */
  ) || t.eat(
    43
    /* + */
  ) || t.eat(
    63
    /* ? */
  ) || this.regexp_eatBracedQuantifier(t, e);
};
Lt.regexp_eatBracedQuantifier = function(t, e) {
  var n = t.pos;
  if (t.eat(
    123
    /* { */
  )) {
    var s = 0, o = -1;
    if (this.regexp_eatDecimalDigits(t) && (s = t.lastIntValue, t.eat(
      44
      /* , */
    ) && this.regexp_eatDecimalDigits(t) && (o = t.lastIntValue), t.eat(
      125
      /* } */
    )))
      return o !== -1 && o < s && !e && t.raise("numbers out of order in {} quantifier"), !0;
    t.switchU && !e && t.raise("Incomplete quantifier"), t.pos = n;
  }
  return !1;
};
Lt.regexp_eatAtom = function(t) {
  return this.regexp_eatPatternCharacters(t) || t.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(t) || this.regexp_eatCharacterClass(t) || this.regexp_eatUncapturingGroup(t) || this.regexp_eatCapturingGroup(t);
};
Lt.regexp_eatReverseSolidusAtomEscape = function(t) {
  var e = t.pos;
  if (t.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatAtomEscape(t))
      return !0;
    t.pos = e;
  }
  return !1;
};
Lt.regexp_eatUncapturingGroup = function(t) {
  var e = t.pos;
  if (t.eat(
    40
    /* ( */
  )) {
    if (t.eat(
      63
      /* ? */
    ) && t.eat(
      58
      /* : */
    )) {
      if (this.regexp_disjunction(t), t.eat(
        41
        /* ) */
      ))
        return !0;
      t.raise("Unterminated group");
    }
    t.pos = e;
  }
  return !1;
};
Lt.regexp_eatCapturingGroup = function(t) {
  if (t.eat(
    40
    /* ( */
  )) {
    if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(t) : t.current() === 63 && t.raise("Invalid group"), this.regexp_disjunction(t), t.eat(
      41
      /* ) */
    ))
      return t.numCapturingParens += 1, !0;
    t.raise("Unterminated group");
  }
  return !1;
};
Lt.regexp_eatExtendedAtom = function(t) {
  return t.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(t) || this.regexp_eatCharacterClass(t) || this.regexp_eatUncapturingGroup(t) || this.regexp_eatCapturingGroup(t) || this.regexp_eatInvalidBracedQuantifier(t) || this.regexp_eatExtendedPatternCharacter(t);
};
Lt.regexp_eatInvalidBracedQuantifier = function(t) {
  return this.regexp_eatBracedQuantifier(t, !0) && t.raise("Nothing to repeat"), !1;
};
Lt.regexp_eatSyntaxCharacter = function(t) {
  var e = t.current();
  return Gf(e) ? (t.lastIntValue = e, t.advance(), !0) : !1;
};
function Gf(t) {
  return t === 36 || t >= 40 && t <= 43 || t === 46 || t === 63 || t >= 91 && t <= 94 || t >= 123 && t <= 125;
}
Lt.regexp_eatPatternCharacters = function(t) {
  for (var e = t.pos, n = 0; (n = t.current()) !== -1 && !Gf(n); )
    t.advance();
  return t.pos !== e;
};
Lt.regexp_eatExtendedPatternCharacter = function(t) {
  var e = t.current();
  return e !== -1 && e !== 36 && !(e >= 40 && e <= 43) && e !== 46 && e !== 63 && e !== 91 && e !== 94 && e !== 124 ? (t.advance(), !0) : !1;
};
Lt.regexp_groupSpecifier = function(t) {
  if (t.eat(
    63
    /* ? */
  )) {
    if (this.regexp_eatGroupName(t)) {
      t.groupNames.indexOf(t.lastStringValue) !== -1 && t.raise("Duplicate capture group name"), t.groupNames.push(t.lastStringValue);
      return;
    }
    t.raise("Invalid group");
  }
};
Lt.regexp_eatGroupName = function(t) {
  if (t.lastStringValue = "", t.eat(
    60
    /* < */
  )) {
    if (this.regexp_eatRegExpIdentifierName(t) && t.eat(
      62
      /* > */
    ))
      return !0;
    t.raise("Invalid capture group name");
  }
  return !1;
};
Lt.regexp_eatRegExpIdentifierName = function(t) {
  if (t.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(t)) {
    for (t.lastStringValue += Ks(t.lastIntValue); this.regexp_eatRegExpIdentifierPart(t); )
      t.lastStringValue += Ks(t.lastIntValue);
    return !0;
  }
  return !1;
};
Lt.regexp_eatRegExpIdentifierStart = function(t) {
  var e = t.pos, n = this.options.ecmaVersion >= 11, s = t.current(n);
  return t.advance(n), s === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(t, n) && (s = t.lastIntValue), Z_(s) ? (t.lastIntValue = s, !0) : (t.pos = e, !1);
};
function Z_(t) {
  return an(t, !0) || t === 36 || t === 95;
}
Lt.regexp_eatRegExpIdentifierPart = function(t) {
  var e = t.pos, n = this.options.ecmaVersion >= 11, s = t.current(n);
  return t.advance(n), s === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(t, n) && (s = t.lastIntValue), K_(s) ? (t.lastIntValue = s, !0) : (t.pos = e, !1);
};
function K_(t) {
  return Jn(t, !0) || t === 36 || t === 95 || t === 8204 || t === 8205;
}
Lt.regexp_eatAtomEscape = function(t) {
  return this.regexp_eatBackReference(t) || this.regexp_eatCharacterClassEscape(t) || this.regexp_eatCharacterEscape(t) || t.switchN && this.regexp_eatKGroupName(t) ? !0 : (t.switchU && (t.current() === 99 && t.raise("Invalid unicode escape"), t.raise("Invalid escape")), !1);
};
Lt.regexp_eatBackReference = function(t) {
  var e = t.pos;
  if (this.regexp_eatDecimalEscape(t)) {
    var n = t.lastIntValue;
    if (t.switchU)
      return n > t.maxBackReference && (t.maxBackReference = n), !0;
    if (n <= t.numCapturingParens)
      return !0;
    t.pos = e;
  }
  return !1;
};
Lt.regexp_eatKGroupName = function(t) {
  if (t.eat(
    107
    /* k */
  )) {
    if (this.regexp_eatGroupName(t))
      return t.backReferenceNames.push(t.lastStringValue), !0;
    t.raise("Invalid named reference");
  }
  return !1;
};
Lt.regexp_eatCharacterEscape = function(t) {
  return this.regexp_eatControlEscape(t) || this.regexp_eatCControlLetter(t) || this.regexp_eatZero(t) || this.regexp_eatHexEscapeSequence(t) || this.regexp_eatRegExpUnicodeEscapeSequence(t, !1) || !t.switchU && this.regexp_eatLegacyOctalEscapeSequence(t) || this.regexp_eatIdentityEscape(t);
};
Lt.regexp_eatCControlLetter = function(t) {
  var e = t.pos;
  if (t.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatControlLetter(t))
      return !0;
    t.pos = e;
  }
  return !1;
};
Lt.regexp_eatZero = function(t) {
  return t.current() === 48 && !ma(t.lookahead()) ? (t.lastIntValue = 0, t.advance(), !0) : !1;
};
Lt.regexp_eatControlEscape = function(t) {
  var e = t.current();
  return e === 116 ? (t.lastIntValue = 9, t.advance(), !0) : e === 110 ? (t.lastIntValue = 10, t.advance(), !0) : e === 118 ? (t.lastIntValue = 11, t.advance(), !0) : e === 102 ? (t.lastIntValue = 12, t.advance(), !0) : e === 114 ? (t.lastIntValue = 13, t.advance(), !0) : !1;
};
Lt.regexp_eatControlLetter = function(t) {
  var e = t.current();
  return Zf(e) ? (t.lastIntValue = e % 32, t.advance(), !0) : !1;
};
function Zf(t) {
  return t >= 65 && t <= 90 || t >= 97 && t <= 122;
}
Lt.regexp_eatRegExpUnicodeEscapeSequence = function(t, e) {
  e === void 0 && (e = !1);
  var n = t.pos, s = e || t.switchU;
  if (t.eat(
    117
    /* u */
  )) {
    if (this.regexp_eatFixedHexDigits(t, 4)) {
      var o = t.lastIntValue;
      if (s && o >= 55296 && o <= 56319) {
        var l = t.pos;
        if (t.eat(
          92
          /* \ */
        ) && t.eat(
          117
          /* u */
        ) && this.regexp_eatFixedHexDigits(t, 4)) {
          var _ = t.lastIntValue;
          if (_ >= 56320 && _ <= 57343)
            return t.lastIntValue = (o - 55296) * 1024 + (_ - 56320) + 65536, !0;
        }
        t.pos = l, t.lastIntValue = o;
      }
      return !0;
    }
    if (s && t.eat(
      123
      /* { */
    ) && this.regexp_eatHexDigits(t) && t.eat(
      125
      /* } */
    ) && Y_(t.lastIntValue))
      return !0;
    s && t.raise("Invalid unicode escape"), t.pos = n;
  }
  return !1;
};
function Y_(t) {
  return t >= 0 && t <= 1114111;
}
Lt.regexp_eatIdentityEscape = function(t) {
  if (t.switchU)
    return this.regexp_eatSyntaxCharacter(t) ? !0 : t.eat(
      47
      /* / */
    ) ? (t.lastIntValue = 47, !0) : !1;
  var e = t.current();
  return e !== 99 && (!t.switchN || e !== 107) ? (t.lastIntValue = e, t.advance(), !0) : !1;
};
Lt.regexp_eatDecimalEscape = function(t) {
  t.lastIntValue = 0;
  var e = t.current();
  if (e >= 49 && e <= 57) {
    do
      t.lastIntValue = 10 * t.lastIntValue + (e - 48), t.advance();
    while ((e = t.current()) >= 48 && e <= 57);
    return !0;
  }
  return !1;
};
Lt.regexp_eatCharacterClassEscape = function(t) {
  var e = t.current();
  if ($_(e))
    return t.lastIntValue = -1, t.advance(), !0;
  if (t.switchU && this.options.ecmaVersion >= 9 && (e === 80 || e === 112)) {
    if (t.lastIntValue = -1, t.advance(), t.eat(
      123
      /* { */
    ) && this.regexp_eatUnicodePropertyValueExpression(t) && t.eat(
      125
      /* } */
    ))
      return !0;
    t.raise("Invalid property name");
  }
  return !1;
};
function $_(t) {
  return t === 100 || t === 68 || t === 115 || t === 83 || t === 119 || t === 87;
}
Lt.regexp_eatUnicodePropertyValueExpression = function(t) {
  var e = t.pos;
  if (this.regexp_eatUnicodePropertyName(t) && t.eat(
    61
    /* = */
  )) {
    var n = t.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(t)) {
      var s = t.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(t, n, s), !0;
    }
  }
  if (t.pos = e, this.regexp_eatLoneUnicodePropertyNameOrValue(t)) {
    var o = t.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(t, o), !0;
  }
  return !1;
};
Lt.regexp_validateUnicodePropertyNameAndValue = function(t, e, n) {
  ca(t.unicodeProperties.nonBinary, e) || t.raise("Invalid property name"), t.unicodeProperties.nonBinary[e].test(n) || t.raise("Invalid property value");
};
Lt.regexp_validateUnicodePropertyNameOrValue = function(t, e) {
  t.unicodeProperties.binary.test(e) || t.raise("Invalid property name");
};
Lt.regexp_eatUnicodePropertyName = function(t) {
  var e = 0;
  for (t.lastStringValue = ""; Kf(e = t.current()); )
    t.lastStringValue += Ks(e), t.advance();
  return t.lastStringValue !== "";
};
function Kf(t) {
  return Zf(t) || t === 95;
}
Lt.regexp_eatUnicodePropertyValue = function(t) {
  var e = 0;
  for (t.lastStringValue = ""; X_(e = t.current()); )
    t.lastStringValue += Ks(e), t.advance();
  return t.lastStringValue !== "";
};
function X_(t) {
  return Kf(t) || ma(t);
}
Lt.regexp_eatLoneUnicodePropertyNameOrValue = function(t) {
  return this.regexp_eatUnicodePropertyValue(t);
};
Lt.regexp_eatCharacterClass = function(t) {
  if (t.eat(
    91
    /* [ */
  )) {
    if (t.eat(
      94
      /* ^ */
    ), this.regexp_classRanges(t), t.eat(
      93
      /* ] */
    ))
      return !0;
    t.raise("Unterminated character class");
  }
  return !1;
};
Lt.regexp_classRanges = function(t) {
  for (; this.regexp_eatClassAtom(t); ) {
    var e = t.lastIntValue;
    if (t.eat(
      45
      /* - */
    ) && this.regexp_eatClassAtom(t)) {
      var n = t.lastIntValue;
      t.switchU && (e === -1 || n === -1) && t.raise("Invalid character class"), e !== -1 && n !== -1 && e > n && t.raise("Range out of order in character class");
    }
  }
};
Lt.regexp_eatClassAtom = function(t) {
  var e = t.pos;
  if (t.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatClassEscape(t))
      return !0;
    if (t.switchU) {
      var n = t.current();
      (n === 99 || Xf(n)) && t.raise("Invalid class escape"), t.raise("Invalid escape");
    }
    t.pos = e;
  }
  var s = t.current();
  return s !== 93 ? (t.lastIntValue = s, t.advance(), !0) : !1;
};
Lt.regexp_eatClassEscape = function(t) {
  var e = t.pos;
  if (t.eat(
    98
    /* b */
  ))
    return t.lastIntValue = 8, !0;
  if (t.switchU && t.eat(
    45
    /* - */
  ))
    return t.lastIntValue = 45, !0;
  if (!t.switchU && t.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatClassControlLetter(t))
      return !0;
    t.pos = e;
  }
  return this.regexp_eatCharacterClassEscape(t) || this.regexp_eatCharacterEscape(t);
};
Lt.regexp_eatClassControlLetter = function(t) {
  var e = t.current();
  return ma(e) || e === 95 ? (t.lastIntValue = e % 32, t.advance(), !0) : !1;
};
Lt.regexp_eatHexEscapeSequence = function(t) {
  var e = t.pos;
  if (t.eat(
    120
    /* x */
  )) {
    if (this.regexp_eatFixedHexDigits(t, 2))
      return !0;
    t.switchU && t.raise("Invalid escape"), t.pos = e;
  }
  return !1;
};
Lt.regexp_eatDecimalDigits = function(t) {
  var e = t.pos, n = 0;
  for (t.lastIntValue = 0; ma(n = t.current()); )
    t.lastIntValue = 10 * t.lastIntValue + (n - 48), t.advance();
  return t.pos !== e;
};
function ma(t) {
  return t >= 48 && t <= 57;
}
Lt.regexp_eatHexDigits = function(t) {
  var e = t.pos, n = 0;
  for (t.lastIntValue = 0; Yf(n = t.current()); )
    t.lastIntValue = 16 * t.lastIntValue + $f(n), t.advance();
  return t.pos !== e;
};
function Yf(t) {
  return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
}
function $f(t) {
  return t >= 65 && t <= 70 ? 10 + (t - 65) : t >= 97 && t <= 102 ? 10 + (t - 97) : t - 48;
}
Lt.regexp_eatLegacyOctalEscapeSequence = function(t) {
  if (this.regexp_eatOctalDigit(t)) {
    var e = t.lastIntValue;
    if (this.regexp_eatOctalDigit(t)) {
      var n = t.lastIntValue;
      e <= 3 && this.regexp_eatOctalDigit(t) ? t.lastIntValue = e * 64 + n * 8 + t.lastIntValue : t.lastIntValue = e * 8 + n;
    } else
      t.lastIntValue = e;
    return !0;
  }
  return !1;
};
Lt.regexp_eatOctalDigit = function(t) {
  var e = t.current();
  return Xf(e) ? (t.lastIntValue = e - 48, t.advance(), !0) : (t.lastIntValue = 0, !1);
};
function Xf(t) {
  return t >= 48 && t <= 55;
}
Lt.regexp_eatFixedHexDigits = function(t, e) {
  var n = t.pos;
  t.lastIntValue = 0;
  for (var s = 0; s < e; ++s) {
    var o = t.current();
    if (!Yf(o))
      return t.pos = n, !1;
    t.lastIntValue = 16 * t.lastIntValue + $f(o), t.advance();
  }
  return !0;
};
var va = function(e) {
  this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new cs(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
}, re = Ae.prototype;
re.next = function(t) {
  !t && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new va(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
};
re.getToken = function() {
  return this.next(), new va(this);
};
typeof Symbol < "u" && (re[Symbol.iterator] = function() {
  var t = this;
  return {
    next: function() {
      var e = t.getToken();
      return {
        done: e.type === L.eof,
        value: e
      };
    }
  };
});
re.curContext = function() {
  return this.context[this.context.length - 1];
};
re.nextToken = function() {
  var t = this.curContext();
  if ((!t || !t.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
    return this.finishToken(L.eof);
  if (t.override)
    return t.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
re.readToken = function(t) {
  return an(t, this.options.ecmaVersion >= 6) || t === 92 ? this.readWord() : this.getTokenFromCode(t);
};
re.fullCharCodeAtPos = function() {
  var t = this.input.charCodeAt(this.pos);
  if (t <= 55295 || t >= 57344)
    return t;
  var e = this.input.charCodeAt(this.pos + 1);
  return (t << 10) + e - 56613888;
};
re.skipBlockComment = function() {
  var t = this.options.onComment && this.curPosition(), e = this.pos, n = this.input.indexOf("*/", this.pos += 2);
  if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations) {
    Sr.lastIndex = e;
    for (var s; (s = Sr.exec(this.input)) && s.index < this.pos; )
      ++this.curLine, this.lineStart = s.index + s[0].length;
  }
  this.options.onComment && this.options.onComment(
    !0,
    this.input.slice(e + 2, n),
    e,
    this.pos,
    t,
    this.curPosition()
  );
};
re.skipLineComment = function(t) {
  for (var e = this.pos, n = this.options.onComment && this.curPosition(), s = this.input.charCodeAt(this.pos += t); this.pos < this.input.length && !Ar(s); )
    s = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(
    !1,
    this.input.slice(e + t, this.pos),
    e,
    this.pos,
    n,
    this.curPosition()
  );
};
re.skipSpace = function() {
  t: for (; this.pos < this.input.length; ) {
    var t = this.input.charCodeAt(this.pos);
    switch (t) {
      case 32:
      case 160:
        ++this.pos;
        break;
      case 13:
        this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
      case 10:
      case 8232:
      case 8233:
        ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
        break;
      case 47:
        switch (this.input.charCodeAt(this.pos + 1)) {
          case 42:
            this.skipBlockComment();
            break;
          case 47:
            this.skipLineComment(2);
            break;
          default:
            break t;
        }
        break;
      default:
        if (t > 8 && t < 14 || t >= 5760 && gu.test(String.fromCharCode(t)))
          ++this.pos;
        else
          break t;
    }
  }
};
re.finishToken = function(t, e) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var n = this.type;
  this.type = t, this.value = e, this.updateContext(n);
};
re.readToken_dot = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t >= 48 && t <= 57)
    return this.readNumber(!0);
  var e = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && t === 46 && e === 46 ? (this.pos += 3, this.finishToken(L.ellipsis)) : (++this.pos, this.finishToken(L.dot));
};
re.readToken_slash = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : t === 61 ? this.finishOp(L.assign, 2) : this.finishOp(L.slash, 1);
};
re.readToken_mult_modulo_exp = function(t) {
  var e = this.input.charCodeAt(this.pos + 1), n = 1, s = t === 42 ? L.star : L.modulo;
  return this.options.ecmaVersion >= 7 && t === 42 && e === 42 && (++n, s = L.starstar, e = this.input.charCodeAt(this.pos + 2)), e === 61 ? this.finishOp(L.assign, n + 1) : this.finishOp(s, n);
};
re.readToken_pipe_amp = function(t) {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e === t) {
    if (this.options.ecmaVersion >= 12) {
      var n = this.input.charCodeAt(this.pos + 2);
      if (n === 61)
        return this.finishOp(L.assign, 3);
    }
    return this.finishOp(t === 124 ? L.logicalOR : L.logicalAND, 2);
  }
  return e === 61 ? this.finishOp(L.assign, 2) : this.finishOp(t === 124 ? L.bitwiseOR : L.bitwiseAND, 1);
};
re.readToken_caret = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61 ? this.finishOp(L.assign, 2) : this.finishOp(L.bitwiseXOR, 1);
};
re.readToken_plus_min = function(t) {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === t ? e === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || yi.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(L.incDec, 2) : e === 61 ? this.finishOp(L.assign, 2) : this.finishOp(L.plusMin, 1);
};
re.readToken_lt_gt = function(t) {
  var e = this.input.charCodeAt(this.pos + 1), n = 1;
  return e === t ? (n = t === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(L.assign, n + 1) : this.finishOp(L.bitShift, n)) : e === 33 && t === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (e === 61 && (n = 2), this.finishOp(L.relational, n));
};
re.readToken_eq_excl = function(t) {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(L.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : t === 61 && e === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(L.arrow)) : this.finishOp(t === 61 ? L.eq : L.prefix, 1);
};
re.readToken_question = function() {
  var t = this.options.ecmaVersion;
  if (t >= 11) {
    var e = this.input.charCodeAt(this.pos + 1);
    if (e === 46) {
      var n = this.input.charCodeAt(this.pos + 2);
      if (n < 48 || n > 57)
        return this.finishOp(L.questionDot, 2);
    }
    if (e === 63) {
      if (t >= 12) {
        var s = this.input.charCodeAt(this.pos + 2);
        if (s === 61)
          return this.finishOp(L.assign, 3);
      }
      return this.finishOp(L.coalesce, 2);
    }
  }
  return this.finishOp(L.question, 1);
};
re.getTokenFromCode = function(t) {
  switch (t) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46:
      return this.readToken_dot();
    // Punctuation tokens.
    case 40:
      return ++this.pos, this.finishToken(L.parenL);
    case 41:
      return ++this.pos, this.finishToken(L.parenR);
    case 59:
      return ++this.pos, this.finishToken(L.semi);
    case 44:
      return ++this.pos, this.finishToken(L.comma);
    case 91:
      return ++this.pos, this.finishToken(L.bracketL);
    case 93:
      return ++this.pos, this.finishToken(L.bracketR);
    case 123:
      return ++this.pos, this.finishToken(L.braceL);
    case 125:
      return ++this.pos, this.finishToken(L.braceR);
    case 58:
      return ++this.pos, this.finishToken(L.colon);
    case 96:
      if (this.options.ecmaVersion < 6)
        break;
      return ++this.pos, this.finishToken(L.backQuote);
    case 48:
      var e = this.input.charCodeAt(this.pos + 1);
      if (e === 120 || e === 88)
        return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (e === 111 || e === 79)
          return this.readRadixNumber(8);
        if (e === 98 || e === 66)
          return this.readRadixNumber(2);
      }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(!1);
    // Quotes produce strings.
    case 34:
    case 39:
      return this.readString(t);
    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(t);
    case 124:
    case 38:
      return this.readToken_pipe_amp(t);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(t);
    case 60:
    case 62:
      return this.readToken_lt_gt(t);
    case 61:
    case 33:
      return this.readToken_eq_excl(t);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(L.prefix, 1);
  }
  this.raise(this.pos, "Unexpected character '" + wu(t) + "'");
};
re.finishOp = function(t, e) {
  var n = this.input.slice(this.pos, this.pos + e);
  return this.pos += e, this.finishToken(t, n);
};
re.readRegexp = function() {
  for (var t, e, n = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(n, "Unterminated regular expression");
    var s = this.input.charAt(this.pos);
    if (yi.test(s) && this.raise(n, "Unterminated regular expression"), t)
      t = !1;
    else {
      if (s === "[")
        e = !0;
      else if (s === "]" && e)
        e = !1;
      else if (s === "/" && !e)
        break;
      t = s === "\\";
    }
    ++this.pos;
  }
  var o = this.input.slice(n, this.pos);
  ++this.pos;
  var l = this.pos, _ = this.readWord1();
  this.containsEsc && this.unexpected(l);
  var v = this.regexpState || (this.regexpState = new hn(this));
  v.reset(n, o, _), this.validateRegExpFlags(v), this.validateRegExpPattern(v);
  var k = null;
  try {
    k = new RegExp(o, _);
  } catch {
  }
  return this.finishToken(L.regexp, { pattern: o, flags: _, value: k });
};
re.readInt = function(t, e, n) {
  for (var s = this.options.ecmaVersion >= 12 && e === void 0, o = n && this.input.charCodeAt(this.pos) === 48, l = this.pos, _ = 0, v = 0, k = 0, N = e ?? 1 / 0; k < N; ++k, ++this.pos) {
    var z = this.input.charCodeAt(this.pos), q = void 0;
    if (s && z === 95) {
      o && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), v === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), k === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), v = z;
      continue;
    }
    if (z >= 97 ? q = z - 97 + 10 : z >= 65 ? q = z - 65 + 10 : z >= 48 && z <= 57 ? q = z - 48 : q = 1 / 0, q >= t)
      break;
    v = z, _ = _ * t + q;
  }
  return s && v === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === l || e != null && this.pos - l !== e ? null : _;
};
function Q_(t, e) {
  return e ? parseInt(t, 8) : parseFloat(t.replace(/_/g, ""));
}
function Qf(t) {
  return typeof BigInt != "function" ? null : BigInt(t.replace(/_/g, ""));
}
re.readRadixNumber = function(t) {
  var e = this.pos;
  this.pos += 2;
  var n = this.readInt(t);
  return n == null && this.raise(this.start + 2, "Expected number in radix " + t), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = Qf(this.input.slice(e, this.pos)), ++this.pos) : an(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(L.num, n);
};
re.readNumber = function(t) {
  var e = this.pos;
  !t && this.readInt(10, void 0, !0) === null && this.raise(e, "Invalid number");
  var n = this.pos - e >= 2 && this.input.charCodeAt(e) === 48;
  n && this.strict && this.raise(e, "Invalid number");
  var s = this.input.charCodeAt(this.pos);
  if (!n && !t && this.options.ecmaVersion >= 11 && s === 110) {
    var o = Qf(this.input.slice(e, this.pos));
    return ++this.pos, an(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(L.num, o);
  }
  n && /[89]/.test(this.input.slice(e, this.pos)) && (n = !1), s === 46 && !n && (++this.pos, this.readInt(10), s = this.input.charCodeAt(this.pos)), (s === 69 || s === 101) && !n && (s = this.input.charCodeAt(++this.pos), (s === 43 || s === 45) && ++this.pos, this.readInt(10) === null && this.raise(e, "Invalid number")), an(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var l = Q_(this.input.slice(e, this.pos), n);
  return this.finishToken(L.num, l);
};
re.readCodePoint = function() {
  var t = this.input.charCodeAt(this.pos), e;
  if (t === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var n = ++this.pos;
    e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, e > 1114111 && this.invalidStringToken(n, "Code point out of bounds");
  } else
    e = this.readHexChar(4);
  return e;
};
function wu(t) {
  return t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10) + 55296, (t & 1023) + 56320));
}
re.readString = function(t) {
  for (var e = "", n = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var s = this.input.charCodeAt(this.pos);
    if (s === t)
      break;
    s === 92 ? (e += this.input.slice(n, this.pos), e += this.readEscapedChar(!1), n = this.pos) : (Ar(s, this.options.ecmaVersion >= 10) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return e += this.input.slice(n, this.pos++), this.finishToken(L.string, e);
};
var Jf = {};
re.tryReadTemplateToken = function() {
  this.inTemplateElement = !0;
  try {
    this.readTmplToken();
  } catch (t) {
    if (t === Jf)
      this.readInvalidTemplateToken();
    else
      throw t;
  }
  this.inTemplateElement = !1;
};
re.invalidStringToken = function(t, e) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw Jf;
  this.raise(t, e);
};
re.readTmplToken = function() {
  for (var t = "", e = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var n = this.input.charCodeAt(this.pos);
    if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      return this.pos === this.start && (this.type === L.template || this.type === L.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(L.dollarBraceL)) : (++this.pos, this.finishToken(L.backQuote)) : (t += this.input.slice(e, this.pos), this.finishToken(L.template, t));
    if (n === 92)
      t += this.input.slice(e, this.pos), t += this.readEscapedChar(!0), e = this.pos;
    else if (Ar(n)) {
      switch (t += this.input.slice(e, this.pos), ++this.pos, n) {
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        case 10:
          t += `
`;
          break;
        default:
          t += String.fromCharCode(n);
          break;
      }
      this.options.locations && (++this.curLine, this.lineStart = this.pos), e = this.pos;
    } else
      ++this.pos;
  }
};
re.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++)
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{")
          break;
      // falls through
      case "`":
        return this.finishToken(L.invalidTemplate, this.input.slice(this.start, this.pos));
    }
  this.raise(this.start, "Unterminated template");
};
re.readEscapedChar = function(t) {
  var e = this.input.charCodeAt(++this.pos);
  switch (++this.pos, e) {
    case 110:
      return `
`;
    // 'n' -> '\n'
    case 114:
      return "\r";
    // 'r' -> '\r'
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    // 'x'
    case 117:
      return wu(this.readCodePoint());
    // 'u'
    case 116:
      return "	";
    // 't' -> '\t'
    case 98:
      return "\b";
    // 'b' -> '\b'
    case 118:
      return "\v";
    // 'v' -> '\u000b'
    case 102:
      return "\f";
    // 'f' -> '\f'
    case 13:
      this.input.charCodeAt(this.pos) === 10 && ++this.pos;
    // '\r\n'
    case 10:
      return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
    case 56:
    case 57:
      if (t) {
        var n = this.pos - 1;
        return this.invalidStringToken(
          n,
          "Invalid escape sequence in template string"
        ), null;
      }
    default:
      if (e >= 48 && e <= 55) {
        var s = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], o = parseInt(s, 8);
        return o > 255 && (s = s.slice(0, -1), o = parseInt(s, 8)), this.pos += s.length - 1, e = this.input.charCodeAt(this.pos), (s !== "0" || e === 56 || e === 57) && (this.strict || t) && this.invalidStringToken(
          this.pos - 1 - s.length,
          t ? "Octal literal in template string" : "Octal literal in strict mode"
        ), String.fromCharCode(o);
      }
      return Ar(e) ? "" : String.fromCharCode(e);
  }
};
re.readHexChar = function(t) {
  var e = this.pos, n = this.readInt(16, t);
  return n === null && this.invalidStringToken(e, "Bad character escape sequence"), n;
};
re.readWord1 = function() {
  this.containsEsc = !1;
  for (var t = "", e = !0, n = this.pos, s = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var o = this.fullCharCodeAtPos();
    if (Jn(o, s))
      this.pos += o <= 65535 ? 1 : 2;
    else if (o === 92) {
      this.containsEsc = !0, t += this.input.slice(n, this.pos);
      var l = this.pos;
      this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var _ = this.readCodePoint();
      (e ? an : Jn)(_, s) || this.invalidStringToken(l, "Invalid Unicode escape"), t += wu(_), n = this.pos;
    } else
      break;
    e = !1;
  }
  return t + this.input.slice(n, this.pos);
};
re.readWord = function() {
  var t = this.readWord1(), e = L.name;
  return this.keywords.test(t) && (e = fa[t]), this.finishToken(e, t);
};
var tc = "7.4.1";
Ae.acorn = {
  Parser: Ae,
  version: tc,
  defaultOptions: Gs,
  Position: Cr,
  SourceLocation: cs,
  getLineInfo: _u,
  Node: pa,
  TokenType: he,
  tokTypes: L,
  keywordTypes: fa,
  TokContext: Ci,
  tokContexts: Ee,
  isIdentifierChar: Jn,
  isIdentifierStart: an,
  Token: va,
  isNewLine: Ar,
  lineBreak: yi,
  lineBreakG: Sr,
  nonASCIIwhitespace: gu
};
function J_(t, e) {
  return Ae.parse(t, e);
}
function tm(t, e, n) {
  return Ae.parseExpressionAt(t, e, n);
}
function em(t, e) {
  return Ae.tokenizer(t, e);
}
const im = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Node: pa,
  Parser: Ae,
  Position: Cr,
  SourceLocation: cs,
  TokContext: Ci,
  Token: va,
  TokenType: he,
  defaultOptions: Gs,
  getLineInfo: _u,
  isIdentifierChar: Jn,
  isIdentifierStart: an,
  isNewLine: Ar,
  keywordTypes: fa,
  lineBreak: yi,
  lineBreakG: Sr,
  nonASCIIwhitespace: gu,
  parse: J_,
  parseExpressionAt: tm,
  tokContexts: Ee,
  tokTypes: L,
  tokenizer: em,
  version: tc
}, Symbol.toStringTag, { value: "Module" })), nm = /* @__PURE__ */ kf(im);
/*!
 * Paper.js v0.12.17 - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2020, Jürg Lehni & Jonathan Puckey
 * http://juerglehni.com/ & https://puckey.studio/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 * Date: Thu Nov 3 21:15:36 2022 +0100
 *
 ***
 *
 * Straps.js - Class inheritance library with support for bean-style accessors
 *
 * Copyright (c) 2006 - 2020 Jürg Lehni
 * http://juerglehni.com/
 *
 * Distributed under the MIT license.
 *
 ***
 *
 * Acorn.js
 * https://marijnhaverbeke.nl/acorn/
 *
 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
 * created by Marijn Haverbeke and released under an MIT license.
 *
 */
var rm = Ns.exports, Nl;
function sm() {
  return Nl || (Nl = 1, function(t) {
    (function(e, n) {
      e = e || El;
      var s = e.window, o = e.document, l = new function() {
        var i = /^(statics|enumerable|beans|preserve)$/, r = [], a = r.slice, u = Object.create, h = Object.getOwnPropertyDescriptor, f = Object.defineProperty, d = r.forEach || function(x, y) {
          for (var E = 0, C = this.length; E < C; E++)
            x.call(y, this[E], E, this);
        }, c = function(x, y) {
          for (var E in this)
            this.hasOwnProperty(E) && x.call(y, this[E], E, this);
        }, p = Object.assign || function(x) {
          for (var y = 1, E = arguments.length; y < E; y++) {
            var C = arguments[y];
            for (var O in C)
              C.hasOwnProperty(O) && (x[O] = C[O]);
          }
          return x;
        }, g = function(x, y, E) {
          if (x) {
            var C = h(x, "length");
            (C && typeof C.value == "number" ? d : c).call(x, y, E = E || x);
          }
          return E;
        };
        function b(x, y, E, C, O) {
          var w = {};
          function P(A, R) {
            R = R || (R = h(y, A)) && (R.get ? R : R.value), typeof R == "string" && R[0] === "#" && (R = x[R.substring(1)] || R);
            var V = typeof R == "function", B = R, H = O || V && !R.base ? R && R.get ? A in x : x[A] : null, D;
            (!O || !H) && (V && H && (R.base = H), V && C !== !1 && (D = A.match(/^([gs]et|is)(([A-Z])(.*))$/)) && (w[D[3].toLowerCase() + D[4]] = D[2]), (!B || V || !B.get || typeof B.get != "function" || !S.isPlainObject(B)) && (B = { value: B, writable: !0 }), (h(x, A) || { configurable: !0 }).configurable && (B.configurable = !0, B.enumerable = E ?? !D), f(x, A, B));
          }
          if (y) {
            for (var m in y)
              y.hasOwnProperty(m) && !i.test(m) && P(m);
            for (var m in w) {
              var I = w[m], T = x["set" + I], M = x["get" + I] || T && x["is" + I];
              M && (C === !0 || M.length === 0) && P(m, { get: M, set: T });
            }
          }
          return x;
        }
        function S() {
          for (var x = 0, y = arguments.length; x < y; x++) {
            var E = arguments[x];
            E && p(this, E);
          }
          return this;
        }
        return b(S, {
          inject: function(x) {
            if (x) {
              var y = x.statics === !0 ? x : x.statics, E = x.beans, C = x.preserve;
              y !== x && b(this.prototype, x, x.enumerable, E, C), b(this, y, null, E, C);
            }
            for (var O = 1, w = arguments.length; O < w; O++)
              this.inject(arguments[O]);
            return this;
          },
          extend: function() {
            for (var x = this, y, E, C = 0, O, w = arguments.length; C < w && !(y && E); C++)
              O = arguments[C], y = y || O.initialize, E = E || O.prototype;
            return y = y || function() {
              x.apply(this, arguments);
            }, E = y.prototype = E || u(this.prototype), f(
              E,
              "constructor",
              { value: y, writable: !0, configurable: !0 }
            ), b(y, this), arguments.length && this.inject.apply(y, arguments), y.base = x, y;
          }
        }).inject({
          enumerable: !1,
          initialize: S,
          set: S,
          inject: function() {
            for (var x = 0, y = arguments.length; x < y; x++) {
              var E = arguments[x];
              E && b(this, E, E.enumerable, E.beans, E.preserve);
            }
            return this;
          },
          extend: function() {
            var x = u(this);
            return x.inject.apply(x, arguments);
          },
          each: function(x, y) {
            return g(this, x, y);
          },
          clone: function() {
            return new this.constructor(this);
          },
          statics: {
            set: p,
            each: g,
            create: u,
            define: f,
            describe: h,
            clone: function(x) {
              return p(new x.constructor(), x);
            },
            isPlainObject: function(x) {
              var y = x != null && x.constructor;
              return y && (y === Object || y === S || y.name === "Object");
            },
            pick: function(x, y) {
              return x !== n ? x : y;
            },
            slice: function(x, y, E) {
              return a.call(x, y, E);
            }
          }
        });
      }();
      t.exports = l, l.inject({
        enumerable: !1,
        toString: function() {
          return this._id != null ? (this._class || "Object") + (this._name ? " '" + this._name + "'" : " @" + this._id) : "{ " + l.each(this, function(i, r) {
            if (!/^_/.test(r)) {
              var a = typeof i;
              this.push(r + ": " + (a === "number" ? z.instance.number(i) : a === "string" ? "'" + i + "'" : i));
            }
          }, []).join(", ") + " }";
        },
        getClassName: function() {
          return this._class || "";
        },
        importJSON: function(i) {
          return l.importJSON(i, this);
        },
        exportJSON: function(i) {
          return l.exportJSON(this, i);
        },
        toJSON: function() {
          return l.serialize(this);
        },
        set: function(i, r) {
          return i && l.filter(this, i, r, this._prioritize), this;
        }
      }, {
        beans: !1,
        statics: {
          exports: {},
          extend: function i() {
            var r = i.base.apply(this, arguments), a = r.prototype._class;
            return a && !l.exports[a] && (l.exports[a] = r), r;
          },
          equals: function(i, r) {
            if (i === r)
              return !0;
            if (i && i.equals)
              return i.equals(r);
            if (r && r.equals)
              return r.equals(i);
            if (i && r && typeof i == "object" && typeof r == "object") {
              if (Array.isArray(i) && Array.isArray(r)) {
                var a = i.length;
                if (a !== r.length)
                  return !1;
                for (; a--; )
                  if (!l.equals(i[a], r[a]))
                    return !1;
              } else {
                var u = Object.keys(i), a = u.length;
                if (a !== Object.keys(r).length)
                  return !1;
                for (; a--; ) {
                  var h = u[a];
                  if (!(r.hasOwnProperty(h) && l.equals(i[h], r[h])))
                    return !1;
                }
              }
              return !0;
            }
            return !1;
          },
          read: function(i, r, a, u) {
            if (this === l) {
              var h = this.peek(i, r);
              return i.__index++, h;
            }
            var f = this.prototype, d = f._readIndex, c = r || d && i.__index || 0, p = i.length, g = i[c];
            if (u = u || p - c, g instanceof this || a && a.readNull && g == null && u <= 1)
              return d && (i.__index = c + 1), g && a && a.clone ? g.clone() : g;
            if (g = l.create(f), d && (g.__read = !0), g = g.initialize.apply(g, c > 0 || c + u < p ? l.slice(i, c, c + u) : i) || g, d) {
              i.__index = c + g.__read;
              var b = g.__filtered;
              b && (i.__filtered = b, g.__filtered = n), g.__read = n;
            }
            return g;
          },
          peek: function(i, r) {
            return i[i.__index = r || i.__index || 0];
          },
          remain: function(i) {
            return i.length - (i.__index || 0);
          },
          readList: function(i, r, a, u) {
            for (var h = [], f, d = r || 0, c = u ? d + u : i.length, p = d; p < c; p++)
              h.push(Array.isArray(f = i[p]) ? this.read(f, 0, a) : this.read(i, p, a, 1));
            return h;
          },
          readNamed: function(i, r, a, u, h) {
            var f = this.getNamed(i, r), d = f !== n;
            if (d) {
              var c = i.__filtered;
              if (!c) {
                var p = this.getSource(i);
                c = i.__filtered = l.create(p), c.__unfiltered = p;
              }
              c[r] = n;
            }
            return this.read(d ? [f] : i, a, u, h);
          },
          readSupported: function(i, r) {
            var a = this.getSource(i), u = this, h = !1;
            return a && Object.keys(a).forEach(function(f) {
              if (f in r) {
                var d = u.readNamed(i, f);
                d !== n && (r[f] = d), h = !0;
              }
            }), h;
          },
          getSource: function(i) {
            var r = i.__source;
            if (r === n) {
              var a = i.length === 1 && i[0];
              r = i.__source = a && l.isPlainObject(a) ? a : null;
            }
            return r;
          },
          getNamed: function(i, r) {
            var a = this.getSource(i);
            if (a)
              return r ? a[r] : i.__filtered || a;
          },
          hasNamed: function(i, r) {
            return !!this.getNamed(i, r);
          },
          filter: function(i, r, a, u) {
            var h;
            function f(b) {
              if (!(a && b in a) && !(h && b in h)) {
                var S = r[b];
                S !== n && (i[b] = S);
              }
            }
            if (u) {
              for (var d = {}, c = 0, p, g = u.length; c < g; c++)
                (p = u[c]) in r && (f(p), d[p] = !0);
              h = d;
            }
            return Object.keys(r.__unfiltered || r).forEach(f), i;
          },
          isPlainValue: function(i, r) {
            return l.isPlainObject(i) || Array.isArray(i) || r && typeof i == "string";
          },
          serialize: function(i, r, a, u) {
            r = r || {};
            var h = !u, f;
            if (h && (r.formatter = new z(r.precision), u = {
              length: 0,
              definitions: {},
              references: {},
              add: function(S, x) {
                var y = "#" + S._id, E = this.references[y];
                if (!E) {
                  this.length++;
                  var C = x.call(S), O = S._class;
                  O && C[0] !== O && C.unshift(O), this.definitions[y] = C, E = this.references[y] = [y];
                }
                return E;
              }
            }), i && i._serialize) {
              f = i._serialize(r, u);
              var d = i._class;
              d && !i._compactSerialize && (h || !a) && f[0] !== d && f.unshift(d);
            } else if (Array.isArray(i)) {
              f = [];
              for (var c = 0, p = i.length; c < p; c++)
                f[c] = l.serialize(i[c], r, a, u);
            } else if (l.isPlainObject(i)) {
              f = {};
              for (var g = Object.keys(i), c = 0, p = g.length; c < p; c++) {
                var b = g[c];
                f[b] = l.serialize(
                  i[b],
                  r,
                  a,
                  u
                );
              }
            } else typeof i == "number" ? f = r.formatter.number(i, r.precision) : f = i;
            return h && u.length > 0 ? [["dictionary", u.definitions], f] : f;
          },
          deserialize: function(i, r, a, u, h) {
            var f = i, d = !a, c = d && i && i.length && i[0][0] === "dictionary";
            if (a = a || {}, Array.isArray(i)) {
              var p = i[0], g = p === "dictionary";
              if (i.length == 1 && /^#/.test(p))
                return a.dictionary[p];
              p = l.exports[p], f = [];
              for (var b = p ? 1 : 0, S = i.length; b < S; b++)
                f.push(l.deserialize(
                  i[b],
                  r,
                  a,
                  g,
                  c
                ));
              if (p) {
                var x = f;
                r ? f = r(p, x, d || h) : f = new p(x);
              }
            } else if (l.isPlainObject(i)) {
              f = {}, u && (a.dictionary = f);
              for (var y in i)
                f[y] = l.deserialize(i[y], r, a);
            }
            return c ? f[1] : f;
          },
          exportJSON: function(i, r) {
            var a = l.serialize(i, r);
            return r && r.asString == !1 ? a : JSON.stringify(a);
          },
          importJSON: function(i, r) {
            return l.deserialize(
              typeof i == "string" ? JSON.parse(i) : i,
              function(a, u, h) {
                var f = h && r && r.constructor === a, d = f ? r : l.create(a.prototype);
                if (u.length === 1 && d instanceof ht && (f || !(d instanceof Ft))) {
                  var c = u[0];
                  l.isPlainObject(c) && (c.insert = !1, f && (u = u.concat([ht.INSERT])));
                }
                return (f ? d.set : a).apply(d, u), f && (r = null), d;
              }
            );
          },
          push: function(i, r) {
            var a = r.length;
            if (a < 4096)
              i.push.apply(i, r);
            else {
              var u = i.length;
              i.length += a;
              for (var h = 0; h < a; h++)
                i[u + h] = r[h];
            }
            return i;
          },
          splice: function(i, r, a, u) {
            var h = r && r.length, f = a === n;
            a = f ? i.length : a, a > i.length && (a = i.length);
            for (var d = 0; d < h; d++)
              r[d]._index = a + d;
            if (f)
              return l.push(i, r), [];
            var c = [a, u];
            r && l.push(c, r);
            for (var p = i.splice.apply(i, c), d = 0, g = p.length; d < g; d++)
              p[d]._index = n;
            for (var d = a + h, g = i.length; d < g; d++)
              i[d]._index = d;
            return p;
          },
          capitalize: function(i) {
            return i.replace(/\b[a-z]/g, function(r) {
              return r.toUpperCase();
            });
          },
          camelize: function(i) {
            return i.replace(/-(.)/g, function(r, a) {
              return a.toUpperCase();
            });
          },
          hyphenate: function(i) {
            return i.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
          }
        }
      });
      var _ = {
        on: function(i, r) {
          if (typeof i != "string")
            l.each(i, function(f, d) {
              this.on(d, f);
            }, this);
          else {
            var a = this._eventTypes, u = a && a[i], h = this._callbacks = this._callbacks || {};
            h = h[i] = h[i] || [], h.indexOf(r) === -1 && (h.push(r), u && u.install && h.length === 1 && u.install.call(this, i));
          }
          return this;
        },
        off: function(i, r) {
          if (typeof i != "string") {
            l.each(i, function(d, c) {
              this.off(c, d);
            }, this);
            return;
          }
          var a = this._eventTypes, u = a && a[i], h = this._callbacks && this._callbacks[i], f;
          return h && (!r || (f = h.indexOf(r)) !== -1 && h.length === 1 ? (u && u.uninstall && u.uninstall.call(this, i), delete this._callbacks[i]) : f !== -1 && h.splice(f, 1)), this;
        },
        once: function(i, r) {
          return this.on(i, function a() {
            r.apply(this, arguments), this.off(i, a);
          });
        },
        emit: function(i, r) {
          var a = this._callbacks && this._callbacks[i];
          if (!a)
            return !1;
          var u = l.slice(arguments, 1), h = r && r.target && !r.currentTarget;
          a = a.slice(), h && (r.currentTarget = this);
          for (var f = 0, d = a.length; f < d; f++)
            if (a[f].apply(this, u) == !1) {
              r && r.stop && r.stop();
              break;
            }
          return h && delete r.currentTarget, !0;
        },
        responds: function(i) {
          return !!(this._callbacks && this._callbacks[i]);
        },
        attach: "#on",
        detach: "#off",
        fire: "#emit",
        _installEvents: function(i) {
          var r = this._eventTypes, a = this._callbacks, u = i ? "install" : "uninstall";
          if (r) {
            for (var h in a)
              if (a[h].length > 0) {
                var f = r[h], d = f && f[u];
                d && d.call(this, h);
              }
          }
        },
        statics: {
          inject: function i(r) {
            var a = r._events;
            if (a) {
              var u = {};
              l.each(a, function(h, f) {
                var d = typeof h == "string", c = d ? h : f, p = l.capitalize(c), g = c.substring(2).toLowerCase();
                u[g] = d ? {} : h, c = "_" + c, r["get" + p] = function() {
                  return this[c];
                }, r["set" + p] = function(b) {
                  var S = this[c];
                  S && this.off(g, S), b && this.on(g, b), this[c] = b;
                };
              }), r._eventTypes = u;
            }
            return i.base.apply(this, arguments);
          }
        }
      }, v = l.extend({
        _class: "PaperScope",
        initialize: function i() {
          gt = this, this.settings = new l({
            applyMatrix: !0,
            insertItems: !0,
            handleSize: 4,
            hitTolerance: 0
          }), this.project = null, this.projects = [], this.tools = [], this._id = i._id++, i._scopes[this._id] = this;
          var r = i.prototype;
          if (!this.support) {
            var a = st.getContext(1, 1) || {};
            r.support = {
              nativeDash: "setLineDash" in a || "mozDash" in a,
              nativeBlendModes: Ot.nativeModes
            }, st.release(a);
          }
          if (!this.agent) {
            var u = e.navigator.userAgent.toLowerCase(), h = (/(darwin|win|mac|linux|freebsd|sunos)/.exec(u) || [])[0], f = h === "darwin" ? "mac" : h, d = r.agent = r.browser = { platform: f };
            f && (d[f] = !0), u.replace(
              /(opera|chrome|safari|webkit|firefox|msie|trident|atom|node|jsdom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g,
              function(c, p, g, b, S) {
                if (!d.chrome) {
                  var x = p === "opera" ? b : /^(node|trident)$/.test(p) ? S : g;
                  d.version = x, d.versionNumber = parseFloat(x), p = { trident: "msie", jsdom: "node" }[p] || p, d.name = p, d[p] = !0;
                }
              }
            ), d.chrome && delete d.webkit, d.atom && delete d.chrome;
          }
        },
        version: "0.12.17",
        getView: function() {
          var i = this.project;
          return i && i._view;
        },
        getPaper: function() {
          return this;
        },
        execute: function(i, r) {
          var a = gt.PaperScript.execute(i, this, r);
          return ke.updateFocus(), a;
        },
        install: function(i) {
          var r = this;
          l.each(["project", "view", "tool"], function(u) {
            l.define(i, u, {
              configurable: !0,
              get: function() {
                return r[u];
              }
            });
          });
          for (var a in this)
            !/^_/.test(a) && this[a] && (i[a] = this[a]);
        },
        setup: function(i) {
          return gt = this, this.project = new Bt(i), this;
        },
        createCanvas: function(i, r) {
          return st.getCanvas(i, r);
        },
        activate: function() {
          gt = this;
        },
        clear: function() {
          for (var i = this.projects, r = this.tools, a = i.length - 1; a >= 0; a--)
            i[a].remove();
          for (var a = r.length - 1; a >= 0; a--)
            r[a].remove();
        },
        remove: function() {
          this.clear(), delete v._scopes[this._id];
        },
        statics: new function() {
          function i(r) {
            return r += "Attribute", function(a, u) {
              return a[r](u) || a[r]("data-paper-" + u);
            };
          }
          return {
            _scopes: {},
            _id: 0,
            get: function(r) {
              return this._scopes[r] || null;
            },
            getAttribute: i("get"),
            hasAttribute: i("has")
          };
        }()
      }), k = l.extend(_, {
        initialize: function(i) {
          this._scope = gt, this._index = this._scope[this._list].push(this) - 1, (i || !this._scope[this._reference]) && this.activate();
        },
        activate: function() {
          if (!this._scope)
            return !1;
          var i = this._scope[this._reference];
          return i && i !== this && i.emit("deactivate"), this._scope[this._reference] = this, this.emit("activate", i), !0;
        },
        isActive: function() {
          return this._scope[this._reference] === this;
        },
        remove: function() {
          return this._index == null ? !1 : (l.splice(this._scope[this._list], null, this._index, 1), this._scope[this._reference] == this && (this._scope[this._reference] = null), this._scope = null, !0);
        },
        getView: function() {
          return this._scope.getView();
        }
      }), N = {
        findItemBoundsCollisions: function(i, r, a) {
          function u(d) {
            for (var c = new Array(d.length), p = 0; p < d.length; p++) {
              var g = d[p].getBounds();
              c[p] = [g.left, g.top, g.right, g.bottom];
            }
            return c;
          }
          var h = u(i), f = !r || r === i ? h : u(r);
          return this.findBoundsCollisions(h, f, a || 0);
        },
        findCurveBoundsCollisions: function(i, r, a, u) {
          function h(x) {
            for (var y = Math.min, E = Math.max, C = new Array(x.length), O = 0; O < x.length; O++) {
              var w = x[O];
              C[O] = [
                y(w[0], w[2], w[4], w[6]),
                y(w[1], w[3], w[5], w[7]),
                E(w[0], w[2], w[4], w[6]),
                E(w[1], w[3], w[5], w[7])
              ];
            }
            return C;
          }
          var f = h(i), d = !r || r === i ? f : h(r);
          if (u) {
            for (var c = this.findBoundsCollisions(
              f,
              d,
              a || 0,
              !1,
              !0
            ), p = this.findBoundsCollisions(
              f,
              d,
              a || 0,
              !0,
              !0
            ), g = [], b = 0, S = c.length; b < S; b++)
              g[b] = { hor: c[b], ver: p[b] };
            return g;
          }
          return this.findBoundsCollisions(f, d, a || 0);
        },
        findBoundsCollisions: function(i, r, a, u, h) {
          var f = !r || i === r, d = f ? i : i.concat(r), c = i.length, p = d.length;
          function g(dt, _t, St) {
            for (var et = 0, nt = dt.length; et < nt; ) {
              var yt = nt + et >>> 1;
              d[dt[yt]][_t] < St ? et = yt + 1 : nt = yt;
            }
            return et - 1;
          }
          for (var b = u ? 1 : 0, S = b + 2, x = u ? 0 : 1, y = x + 2, E = new Array(p), C = 0; C < p; C++)
            E[C] = C;
          E.sort(function(dt, _t) {
            return d[dt][b] - d[_t][b];
          });
          for (var O = [], w = new Array(c), C = 0; C < p; C++) {
            var P = E[C], m = d[P], I = f ? P : P - c, T = P < c, M = f || !T, A = T ? [] : null;
            if (O.length) {
              var R = g(
                O,
                S,
                m[b] - a
              ) + 1;
              if (O.splice(0, R), f && h) {
                A = A.concat(O);
                for (var V = 0; V < O.length; V++) {
                  var B = O[V];
                  w[B].push(I);
                }
              } else
                for (var H = m[y], D = m[x], V = 0; V < O.length; V++) {
                  var B = O[V], j = d[B], G = B < c, Y = f || B >= c;
                  (h || (T && Y || M && G) && H >= j[x] - a && D <= j[y] + a) && (T && Y && A.push(
                    f ? B : B - c
                  ), M && G && w[B].push(I));
                }
            }
            if (T && (i === r && A.push(P), w[P] = A), O.length) {
              var $ = m[S], Q = g(O, S, $);
              O.splice(Q + 1, 0, P);
            } else
              O.push(P);
          }
          for (var C = 0; C < w.length; C++) {
            var at = w[C];
            at && at.sort(function(_t, St) {
              return _t - St;
            });
          }
          return w;
        }
      }, z = l.extend({
        initialize: function(i) {
          this.precision = l.pick(i, 5), this.multiplier = Math.pow(10, this.precision);
        },
        number: function(i) {
          return this.precision < 16 ? Math.round(i * this.multiplier) / this.multiplier : i;
        },
        pair: function(i, r, a) {
          return this.number(i) + (a || ",") + this.number(r);
        },
        point: function(i, r) {
          return this.number(i.x) + (r || ",") + this.number(i.y);
        },
        size: function(i, r) {
          return this.number(i.width) + (r || ",") + this.number(i.height);
        },
        rectangle: function(i, r) {
          return this.point(i, r) + (r || ",") + this.size(i, r);
        }
      });
      z.instance = new z();
      var q = new function() {
        var i = [
          [0.5773502691896257],
          [0, 0.7745966692414834],
          [0.33998104358485626, 0.8611363115940526],
          [0, 0.5384693101056831, 0.906179845938664],
          [0.2386191860831969, 0.6612093864662645, 0.932469514203152],
          [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585],
          [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363],
          [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261],
          [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717],
          [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057],
          [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192],
          [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881],
          [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123],
          [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854],
          [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]
        ], r = [
          [1],
          [0.8888888888888888, 0.5555555555555556],
          [0.6521451548625461, 0.34785484513745385],
          [0.5688888888888889, 0.47862867049936647, 0.23692688505618908],
          [0.46791393457269104, 0.3607615730481386, 0.17132449237917036],
          [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697],
          [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626],
          [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441],
          [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814],
          [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366],
          [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183],
          [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588],
          [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186],
          [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727],
          [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]
        ], a = Math.abs, u = Math.sqrt, h = Math.pow, f = Math.log2 || function(S) {
          return Math.log(S) * Math.LOG2E;
        }, d = 1e-12, c = 112e-18;
        function p(S, x, y) {
          return S < x ? x : S > y ? y : S;
        }
        function g(S, x, y) {
          function E(R) {
            var V = R * 134217729, B = R - V, H = B + V, D = R - H;
            return [H, D];
          }
          var C = x * x - S * y, O = x * x + S * y;
          if (a(C) * 3 < O) {
            var w = E(S), P = E(x), m = E(y), I = x * x, T = P[0] * P[0] - I + 2 * P[0] * P[1] + P[1] * P[1], M = S * y, A = w[0] * m[0] - M + w[0] * m[1] + w[1] * m[0] + w[1] * m[1];
            C = I - M + (T - A);
          }
          return C;
        }
        function b() {
          var S = Math.max.apply(Math, arguments);
          return S && (S < 1e-8 || S > 1e8) ? h(2, -Math.round(f(S))) : 0;
        }
        return {
          EPSILON: d,
          MACHINE_EPSILON: c,
          CURVETIME_EPSILON: 1e-8,
          GEOMETRIC_EPSILON: 1e-7,
          TRIGONOMETRIC_EPSILON: 1e-8,
          ANGULAR_EPSILON: 1e-5,
          KAPPA: 4 * (u(2) - 1) / 3,
          isZero: function(S) {
            return S >= -1e-12 && S <= d;
          },
          isMachineZero: function(S) {
            return S >= -112e-18 && S <= c;
          },
          clamp: p,
          integrate: function(S, x, y, E) {
            for (var C = i[E - 2], O = r[E - 2], w = (y - x) * 0.5, P = w + x, m = 0, I = E + 1 >> 1, T = E & 1 ? O[m++] * S(P) : 0; m < I; ) {
              var M = w * C[m];
              T += O[m++] * (S(P + M) + S(P - M));
            }
            return w * T;
          },
          findRoot: function(S, x, y, E, C, O, w) {
            for (var P = 0; P < O; P++) {
              var m = S(y), I = m / x(y), T = y - I;
              if (a(I) < w) {
                y = T;
                break;
              }
              m > 0 ? (C = y, y = T <= E ? (E + C) * 0.5 : T) : (E = y, y = T >= C ? (E + C) * 0.5 : T);
            }
            return p(y, E, C);
          },
          solveQuadratic: function(S, x, y, E, C, O) {
            var w, P = 1 / 0;
            if (a(S) < d) {
              if (a(x) < d)
                return a(y) < d ? -1 : 0;
              w = -y / x;
            } else {
              x *= -0.5;
              var m = g(S, x, y);
              if (m && a(m) < c) {
                var I = b(a(S), a(x), a(y));
                I && (S *= I, x *= I, y *= I, m = g(S, x, y));
              }
              if (m >= -112e-18) {
                var T = m < 0 ? 0 : u(m), M = x + (x < 0 ? -T : T);
                M === 0 ? (w = y / S, P = -w) : (w = M / S, P = y / M);
              }
            }
            var A = 0, R = C == null, V = C - d, B = O + d;
            return isFinite(w) && (R || w > V && w < B) && (E[A++] = R ? w : p(w, C, O)), P !== w && isFinite(P) && (R || P > V && P < B) && (E[A++] = R ? P : p(P, C, O)), A;
          },
          solveCubic: function(S, x, y, E, C, O, w) {
            var P = b(a(S), a(x), a(y), a(E)), m, I, T, M, A;
            P && (S *= P, x *= P, y *= P, E *= P);
            function R(Q) {
              m = Q;
              var at = S * m;
              I = at + x, T = I * m + y, M = (at + I) * m + T, A = T * m + E;
            }
            if (a(S) < d)
              S = x, I = y, T = E, m = 1 / 0;
            else if (a(E) < d)
              I = x, T = y, m = 0;
            else {
              R(-(x / S) / 3);
              var V = A / S, B = h(a(V), 1 / 3), H = V < 0 ? -1 : 1, D = -M / S, j = D > 0 ? 1.324717957244746 * Math.max(B, u(D)) : B, G = m - H * j;
              if (G !== m) {
                do
                  R(G), G = M === 0 ? m : m - A / M / (1 + c);
                while (H * G > H * m);
                a(S) * m * m > a(E / m) && (T = -E / m, I = (T - y) / m);
              }
            }
            var Y = q.solveQuadratic(S, I, T, C, O, w), $ = O == null;
            return isFinite(m) && (Y === 0 || Y > 0 && m !== C[0] && m !== C[1]) && ($ || m > O - d && m < w + d) && (C[Y++] = $ ? m : p(m, O, w)), Y;
          }
        };
      }(), tt = {
        _id: 1,
        _pools: {},
        get: function(i) {
          if (i) {
            var r = this._pools[i];
            return r || (r = this._pools[i] = { _id: 1 }), r._id++;
          } else
            return this._id++;
        }
      }, F = l.extend({
        _class: "Point",
        _readIndex: !0,
        initialize: function(r, a) {
          var u = typeof r, h = this.__read, f = 0;
          if (u === "number") {
            var d = typeof a == "number";
            this._set(r, d ? a : r), h && (f = d ? 2 : 1);
          } else if (u === "undefined" || r === null)
            this._set(0, 0), h && (f = r === null ? 1 : 0);
          else {
            var c = u === "string" ? r.split(/[\s,]+/) || [] : r;
            f = 1, Array.isArray(c) ? this._set(+c[0], +(c.length > 1 ? c[1] : c[0])) : "x" in c ? this._set(c.x || 0, c.y || 0) : "width" in c ? this._set(c.width || 0, c.height || 0) : "angle" in c ? (this._set(c.length || 0, 0), this.setAngle(c.angle || 0)) : (this._set(0, 0), f = 0);
          }
          return h && (this.__read = f), this;
        },
        set: "#initialize",
        _set: function(i, r) {
          return this.x = i, this.y = r, this;
        },
        equals: function(i) {
          return this === i || i && (this.x === i.x && this.y === i.y || Array.isArray(i) && this.x === i[0] && this.y === i[1]) || !1;
        },
        clone: function() {
          return new F(this.x, this.y);
        },
        toString: function() {
          var i = z.instance;
          return "{ x: " + i.number(this.x) + ", y: " + i.number(this.y) + " }";
        },
        _serialize: function(i) {
          var r = i.formatter;
          return [r.number(this.x), r.number(this.y)];
        },
        getLength: function() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        setLength: function(i) {
          if (this.isZero()) {
            var r = this._angle || 0;
            this._set(
              Math.cos(r) * i,
              Math.sin(r) * i
            );
          } else {
            var a = i / this.getLength();
            q.isZero(a) && this.getAngle(), this._set(
              this.x * a,
              this.y * a
            );
          }
        },
        getAngle: function() {
          return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
        },
        setAngle: function(i) {
          this.setAngleInRadians.call(this, i * Math.PI / 180);
        },
        getAngleInDegrees: "#getAngle",
        setAngleInDegrees: "#setAngle",
        getAngleInRadians: function() {
          if (arguments.length) {
            var i = F.read(arguments), r = this.getLength() * i.getLength();
            if (q.isZero(r))
              return NaN;
            var a = this.dot(i) / r;
            return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
          } else
            return this.isZero() ? this._angle || 0 : this._angle = Math.atan2(this.y, this.x);
        },
        setAngleInRadians: function(i) {
          if (this._angle = i, !this.isZero()) {
            var r = this.getLength();
            this._set(
              Math.cos(i) * r,
              Math.sin(i) * r
            );
          }
        },
        getQuadrant: function() {
          return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
        }
      }, {
        beans: !1,
        getDirectedAngle: function() {
          var i = F.read(arguments);
          return Math.atan2(this.cross(i), this.dot(i)) * 180 / Math.PI;
        },
        getDistance: function() {
          var i = arguments, r = F.read(i), a = r.x - this.x, u = r.y - this.y, h = a * a + u * u, f = l.read(i);
          return f ? h : Math.sqrt(h);
        },
        normalize: function(i) {
          i === n && (i = 1);
          var r = this.getLength(), a = r !== 0 ? i / r : 0, u = new F(this.x * a, this.y * a);
          return a >= 0 && (u._angle = this._angle), u;
        },
        rotate: function(i, r) {
          if (i === 0)
            return this.clone();
          i = i * Math.PI / 180;
          var a = r ? this.subtract(r) : this, u = Math.sin(i), h = Math.cos(i);
          return a = new F(
            a.x * h - a.y * u,
            a.x * u + a.y * h
          ), r ? a.add(r) : a;
        },
        transform: function(i) {
          return i ? i._transformPoint(this) : this;
        },
        add: function() {
          var i = F.read(arguments);
          return new F(this.x + i.x, this.y + i.y);
        },
        subtract: function() {
          var i = F.read(arguments);
          return new F(this.x - i.x, this.y - i.y);
        },
        multiply: function() {
          var i = F.read(arguments);
          return new F(this.x * i.x, this.y * i.y);
        },
        divide: function() {
          var i = F.read(arguments);
          return new F(this.x / i.x, this.y / i.y);
        },
        modulo: function() {
          var i = F.read(arguments);
          return new F(this.x % i.x, this.y % i.y);
        },
        negate: function() {
          return new F(-this.x, -this.y);
        },
        isInside: function() {
          return ut.read(arguments).contains(this);
        },
        isClose: function() {
          var i = arguments, r = F.read(i), a = l.read(i);
          return this.getDistance(r) <= a;
        },
        isCollinear: function() {
          var i = F.read(arguments);
          return F.isCollinear(this.x, this.y, i.x, i.y);
        },
        isColinear: "#isCollinear",
        isOrthogonal: function() {
          var i = F.read(arguments);
          return F.isOrthogonal(this.x, this.y, i.x, i.y);
        },
        isZero: function() {
          var i = q.isZero;
          return i(this.x) && i(this.y);
        },
        isNaN: function() {
          return isNaN(this.x) || isNaN(this.y);
        },
        isInQuadrant: function(i) {
          return this.x * (i > 1 && i < 4 ? -1 : 1) >= 0 && this.y * (i > 2 ? -1 : 1) >= 0;
        },
        dot: function() {
          var i = F.read(arguments);
          return this.x * i.x + this.y * i.y;
        },
        cross: function() {
          var i = F.read(arguments);
          return this.x * i.y - this.y * i.x;
        },
        project: function() {
          var i = F.read(arguments), r = i.isZero() ? 0 : this.dot(i) / i.dot(i);
          return new F(
            i.x * r,
            i.y * r
          );
        },
        statics: {
          min: function() {
            var i = arguments, r = F.read(i), a = F.read(i);
            return new F(
              Math.min(r.x, a.x),
              Math.min(r.y, a.y)
            );
          },
          max: function() {
            var i = arguments, r = F.read(i), a = F.read(i);
            return new F(
              Math.max(r.x, a.x),
              Math.max(r.y, a.y)
            );
          },
          random: function() {
            return new F(Math.random(), Math.random());
          },
          isCollinear: function(i, r, a, u) {
            return Math.abs(i * u - r * a) <= Math.sqrt((i * i + r * r) * (a * a + u * u)) * 1e-8;
          },
          isOrthogonal: function(i, r, a, u) {
            return Math.abs(i * a + r * u) <= Math.sqrt((i * i + r * r) * (a * a + u * u)) * 1e-8;
          }
        }
      }, l.each(["round", "ceil", "floor", "abs"], function(i) {
        var r = Math[i];
        this[i] = function() {
          return new F(r(this.x), r(this.y));
        };
      }, {})), mt = F.extend({
        initialize: function(r, a, u, h) {
          this._x = r, this._y = a, this._owner = u, this._setter = h;
        },
        _set: function(i, r, a) {
          return this._x = i, this._y = r, a || this._owner[this._setter](this), this;
        },
        getX: function() {
          return this._x;
        },
        setX: function(i) {
          this._x = i, this._owner[this._setter](this);
        },
        getY: function() {
          return this._y;
        },
        setY: function(i) {
          this._y = i, this._owner[this._setter](this);
        },
        isSelected: function() {
          return !!(this._owner._selection & this._getSelection());
        },
        setSelected: function(i) {
          this._owner._changeSelection(this._getSelection(), i);
        },
        _getSelection: function() {
          return this._setter === "setPosition" ? 4 : 0;
        }
      }), X = l.extend({
        _class: "Size",
        _readIndex: !0,
        initialize: function(r, a) {
          var u = typeof r, h = this.__read, f = 0;
          if (u === "number") {
            var d = typeof a == "number";
            this._set(r, d ? a : r), h && (f = d ? 2 : 1);
          } else if (u === "undefined" || r === null)
            this._set(0, 0), h && (f = r === null ? 1 : 0);
          else {
            var c = u === "string" ? r.split(/[\s,]+/) || [] : r;
            f = 1, Array.isArray(c) ? this._set(+c[0], +(c.length > 1 ? c[1] : c[0])) : "width" in c ? this._set(c.width || 0, c.height || 0) : "x" in c ? this._set(c.x || 0, c.y || 0) : (this._set(0, 0), f = 0);
          }
          return h && (this.__read = f), this;
        },
        set: "#initialize",
        _set: function(i, r) {
          return this.width = i, this.height = r, this;
        },
        equals: function(i) {
          return i === this || i && (this.width === i.width && this.height === i.height || Array.isArray(i) && this.width === i[0] && this.height === i[1]) || !1;
        },
        clone: function() {
          return new X(this.width, this.height);
        },
        toString: function() {
          var i = z.instance;
          return "{ width: " + i.number(this.width) + ", height: " + i.number(this.height) + " }";
        },
        _serialize: function(i) {
          var r = i.formatter;
          return [
            r.number(this.width),
            r.number(this.height)
          ];
        },
        add: function() {
          var i = X.read(arguments);
          return new X(this.width + i.width, this.height + i.height);
        },
        subtract: function() {
          var i = X.read(arguments);
          return new X(this.width - i.width, this.height - i.height);
        },
        multiply: function() {
          var i = X.read(arguments);
          return new X(this.width * i.width, this.height * i.height);
        },
        divide: function() {
          var i = X.read(arguments);
          return new X(this.width / i.width, this.height / i.height);
        },
        modulo: function() {
          var i = X.read(arguments);
          return new X(this.width % i.width, this.height % i.height);
        },
        negate: function() {
          return new X(-this.width, -this.height);
        },
        isZero: function() {
          var i = q.isZero;
          return i(this.width) && i(this.height);
        },
        isNaN: function() {
          return isNaN(this.width) || isNaN(this.height);
        },
        statics: {
          min: function(i, r) {
            return new X(
              Math.min(i.width, r.width),
              Math.min(i.height, r.height)
            );
          },
          max: function(i, r) {
            return new X(
              Math.max(i.width, r.width),
              Math.max(i.height, r.height)
            );
          },
          random: function() {
            return new X(Math.random(), Math.random());
          }
        }
      }, l.each(["round", "ceil", "floor", "abs"], function(i) {
        var r = Math[i];
        this[i] = function() {
          return new X(r(this.width), r(this.height));
        };
      }, {})), It = X.extend({
        initialize: function(r, a, u, h) {
          this._width = r, this._height = a, this._owner = u, this._setter = h;
        },
        _set: function(i, r, a) {
          return this._width = i, this._height = r, a || this._owner[this._setter](this), this;
        },
        getWidth: function() {
          return this._width;
        },
        setWidth: function(i) {
          this._width = i, this._owner[this._setter](this);
        },
        getHeight: function() {
          return this._height;
        },
        setHeight: function(i) {
          this._height = i, this._owner[this._setter](this);
        }
      }), ut = l.extend({
        _class: "Rectangle",
        _readIndex: !0,
        beans: !0,
        initialize: function(r, a, u, h) {
          var f = arguments, d = typeof r, c;
          if (d === "number" ? (this._set(r, a, u, h), c = 4) : d === "undefined" || r === null ? (this._set(0, 0, 0, 0), c = r === null ? 1 : 0) : f.length === 1 && (Array.isArray(r) ? (this._set.apply(this, r), c = 1) : r.x !== n || r.width !== n ? (this._set(
            r.x || 0,
            r.y || 0,
            r.width || 0,
            r.height || 0
          ), c = 1) : r.from === n && r.to === n && (this._set(0, 0, 0, 0), l.readSupported(f, this) && (c = 1))), c === n) {
            var p = F.readNamed(f, "from"), g = l.peek(f), b = p.x, S = p.y, x, y;
            if (g && g.x !== n || l.hasNamed(f, "to")) {
              var E = F.readNamed(f, "to");
              x = E.x - b, y = E.y - S, x < 0 && (b = E.x, x = -x), y < 0 && (S = E.y, y = -y);
            } else {
              var C = X.read(f);
              x = C.width, y = C.height;
            }
            this._set(b, S, x, y), c = f.__index;
          }
          var O = f.__filtered;
          return O && (this.__filtered = O), this.__read && (this.__read = c), this;
        },
        set: "#initialize",
        _set: function(i, r, a, u) {
          return this.x = i, this.y = r, this.width = a, this.height = u, this;
        },
        clone: function() {
          return new ut(this.x, this.y, this.width, this.height);
        },
        equals: function(i) {
          var r = l.isPlainValue(i) ? ut.read(arguments) : i;
          return r === this || r && this.x === r.x && this.y === r.y && this.width === r.width && this.height === r.height || !1;
        },
        toString: function() {
          var i = z.instance;
          return "{ x: " + i.number(this.x) + ", y: " + i.number(this.y) + ", width: " + i.number(this.width) + ", height: " + i.number(this.height) + " }";
        },
        _serialize: function(i) {
          var r = i.formatter;
          return [
            r.number(this.x),
            r.number(this.y),
            r.number(this.width),
            r.number(this.height)
          ];
        },
        getPoint: function(i) {
          var r = i ? F : mt;
          return new r(this.x, this.y, this, "setPoint");
        },
        setPoint: function() {
          var i = F.read(arguments);
          this.x = i.x, this.y = i.y;
        },
        getSize: function(i) {
          var r = i ? X : It;
          return new r(this.width, this.height, this, "setSize");
        },
        _fw: 1,
        _fh: 1,
        setSize: function() {
          var i = X.read(arguments), r = this._sx, a = this._sy, u = i.width, h = i.height;
          r && (this.x += (this.width - u) * r), a && (this.y += (this.height - h) * a), this.width = u, this.height = h, this._fw = this._fh = 1;
        },
        getLeft: function() {
          return this.x;
        },
        setLeft: function(i) {
          if (!this._fw) {
            var r = i - this.x;
            this.width -= this._sx === 0.5 ? r * 2 : r;
          }
          this.x = i, this._sx = this._fw = 0;
        },
        getTop: function() {
          return this.y;
        },
        setTop: function(i) {
          if (!this._fh) {
            var r = i - this.y;
            this.height -= this._sy === 0.5 ? r * 2 : r;
          }
          this.y = i, this._sy = this._fh = 0;
        },
        getRight: function() {
          return this.x + this.width;
        },
        setRight: function(i) {
          if (!this._fw) {
            var r = i - this.x;
            this.width = this._sx === 0.5 ? r * 2 : r;
          }
          this.x = i - this.width, this._sx = 1, this._fw = 0;
        },
        getBottom: function() {
          return this.y + this.height;
        },
        setBottom: function(i) {
          if (!this._fh) {
            var r = i - this.y;
            this.height = this._sy === 0.5 ? r * 2 : r;
          }
          this.y = i - this.height, this._sy = 1, this._fh = 0;
        },
        getCenterX: function() {
          return this.x + this.width / 2;
        },
        setCenterX: function(i) {
          this._fw || this._sx === 0.5 ? this.x = i - this.width / 2 : (this._sx && (this.x += (i - this.x) * 2 * this._sx), this.width = (i - this.x) * 2), this._sx = 0.5, this._fw = 0;
        },
        getCenterY: function() {
          return this.y + this.height / 2;
        },
        setCenterY: function(i) {
          this._fh || this._sy === 0.5 ? this.y = i - this.height / 2 : (this._sy && (this.y += (i - this.y) * 2 * this._sy), this.height = (i - this.y) * 2), this._sy = 0.5, this._fh = 0;
        },
        getCenter: function(i) {
          var r = i ? F : mt;
          return new r(this.getCenterX(), this.getCenterY(), this, "setCenter");
        },
        setCenter: function() {
          var i = F.read(arguments);
          return this.setCenterX(i.x), this.setCenterY(i.y), this;
        },
        getArea: function() {
          return this.width * this.height;
        },
        isEmpty: function() {
          return this.width === 0 || this.height === 0;
        },
        contains: function(i) {
          return i && i.width !== n || (Array.isArray(i) ? i : arguments).length === 4 ? this._containsRectangle(ut.read(arguments)) : this._containsPoint(F.read(arguments));
        },
        _containsPoint: function(i) {
          var r = i.x, a = i.y;
          return r >= this.x && a >= this.y && r <= this.x + this.width && a <= this.y + this.height;
        },
        _containsRectangle: function(i) {
          var r = i.x, a = i.y;
          return r >= this.x && a >= this.y && r + i.width <= this.x + this.width && a + i.height <= this.y + this.height;
        },
        intersects: function() {
          var i = ut.read(arguments), r = l.read(arguments) || 0;
          return i.x + i.width > this.x - r && i.y + i.height > this.y - r && i.x < this.x + this.width + r && i.y < this.y + this.height + r;
        },
        intersect: function() {
          var i = ut.read(arguments), r = Math.max(this.x, i.x), a = Math.max(this.y, i.y), u = Math.min(this.x + this.width, i.x + i.width), h = Math.min(this.y + this.height, i.y + i.height);
          return new ut(r, a, u - r, h - a);
        },
        unite: function() {
          var i = ut.read(arguments), r = Math.min(this.x, i.x), a = Math.min(this.y, i.y), u = Math.max(this.x + this.width, i.x + i.width), h = Math.max(this.y + this.height, i.y + i.height);
          return new ut(r, a, u - r, h - a);
        },
        include: function() {
          var i = F.read(arguments), r = Math.min(this.x, i.x), a = Math.min(this.y, i.y), u = Math.max(this.x + this.width, i.x), h = Math.max(this.y + this.height, i.y);
          return new ut(r, a, u - r, h - a);
        },
        expand: function() {
          var i = X.read(arguments), r = i.width, a = i.height;
          return new ut(
            this.x - r / 2,
            this.y - a / 2,
            this.width + r,
            this.height + a
          );
        },
        scale: function(i, r) {
          return this.expand(
            this.width * i - this.width,
            this.height * (r === n ? i : r) - this.height
          );
        }
      }, l.each(
        [
          ["Top", "Left"],
          ["Top", "Right"],
          ["Bottom", "Left"],
          ["Bottom", "Right"],
          ["Left", "Center"],
          ["Top", "Center"],
          ["Right", "Center"],
          ["Bottom", "Center"]
        ],
        function(i, r) {
          var a = i.join(""), u = /^[RL]/.test(a);
          r >= 4 && (i[1] += u ? "Y" : "X");
          var h = i[u ? 0 : 1], f = i[u ? 1 : 0], d = "get" + h, c = "get" + f, p = "set" + h, g = "set" + f, b = "get" + a, S = "set" + a;
          this[b] = function(x) {
            var y = x ? F : mt;
            return new y(this[d](), this[c](), this, S);
          }, this[S] = function() {
            var x = F.read(arguments);
            this[p](x.x), this[g](x.y);
          };
        },
        {
          beans: !0
        }
      )), Xt = ut.extend(
        {
          initialize: function(r, a, u, h, f, d) {
            this._set(r, a, u, h, !0), this._owner = f, this._setter = d;
          },
          _set: function(i, r, a, u, h) {
            return this._x = i, this._y = r, this._width = a, this._height = u, h || this._owner[this._setter](this), this;
          }
        },
        new function() {
          var i = ut.prototype;
          return l.each(
            ["x", "y", "width", "height"],
            function(r) {
              var a = l.capitalize(r), u = "_" + r;
              this["get" + a] = function() {
                return this[u];
              }, this["set" + a] = function(h) {
                this[u] = h, this._dontNotify || this._owner[this._setter](this);
              };
            },
            l.each(
              [
                "Point",
                "Size",
                "Center",
                "Left",
                "Top",
                "Right",
                "Bottom",
                "CenterX",
                "CenterY",
                "TopLeft",
                "TopRight",
                "BottomLeft",
                "BottomRight",
                "LeftCenter",
                "TopCenter",
                "RightCenter",
                "BottomCenter"
              ],
              function(r) {
                var a = "set" + r;
                this[a] = function() {
                  this._dontNotify = !0, i[a].apply(this, arguments), this._dontNotify = !1, this._owner[this._setter](this);
                };
              },
              {
                isSelected: function() {
                  return !!(this._owner._selection & 2);
                },
                setSelected: function(r) {
                  var a = this._owner;
                  a._changeSelection && a._changeSelection(2, r);
                }
              }
            )
          );
        }()
      ), Pt = l.extend({
        _class: "Matrix",
        initialize: function i(r, a) {
          var u = arguments, h = u.length, f = !0;
          if (h >= 6 ? this._set.apply(this, u) : h === 1 || h === 2 ? r instanceof i ? this._set(
            r._a,
            r._b,
            r._c,
            r._d,
            r._tx,
            r._ty,
            a
          ) : Array.isArray(r) ? this._set.apply(
            this,
            a ? r.concat([a]) : r
          ) : f = !1 : h ? f = !1 : this.reset(), !f)
            throw new Error("Unsupported matrix parameters");
          return this;
        },
        set: "#initialize",
        _set: function(i, r, a, u, h, f, d) {
          return this._a = i, this._b = r, this._c = a, this._d = u, this._tx = h, this._ty = f, d || this._changed(), this;
        },
        _serialize: function(i, r) {
          return l.serialize(this.getValues(), i, !0, r);
        },
        _changed: function() {
          var i = this._owner;
          i && (i._applyMatrix ? i.transform(null, !0) : i._changed(25));
        },
        clone: function() {
          return new Pt(
            this._a,
            this._b,
            this._c,
            this._d,
            this._tx,
            this._ty
          );
        },
        equals: function(i) {
          return i === this || i && this._a === i._a && this._b === i._b && this._c === i._c && this._d === i._d && this._tx === i._tx && this._ty === i._ty;
        },
        toString: function() {
          var i = z.instance;
          return "[[" + [
            i.number(this._a),
            i.number(this._c),
            i.number(this._tx)
          ].join(", ") + "], [" + [
            i.number(this._b),
            i.number(this._d),
            i.number(this._ty)
          ].join(", ") + "]]";
        },
        reset: function(i) {
          return this._a = this._d = 1, this._b = this._c = this._tx = this._ty = 0, i || this._changed(), this;
        },
        apply: function(i, r) {
          var a = this._owner;
          return a ? (a.transform(null, l.pick(i, !0), r), this.isIdentity()) : !1;
        },
        translate: function() {
          var i = F.read(arguments), r = i.x, a = i.y;
          return this._tx += r * this._a + a * this._c, this._ty += r * this._b + a * this._d, this._changed(), this;
        },
        scale: function() {
          var i = arguments, r = F.read(i), a = F.read(i, 0, { readNull: !0 });
          return a && this.translate(a), this._a *= r.x, this._b *= r.x, this._c *= r.y, this._d *= r.y, a && this.translate(a.negate()), this._changed(), this;
        },
        rotate: function(i) {
          i *= Math.PI / 180;
          var r = F.read(arguments, 1), a = r.x, u = r.y, h = Math.cos(i), f = Math.sin(i), d = a - a * h + u * f, c = u - a * f - u * h, p = this._a, g = this._b, b = this._c, S = this._d;
          return this._a = h * p + f * b, this._b = h * g + f * S, this._c = -f * p + h * b, this._d = -f * g + h * S, this._tx += d * p + c * b, this._ty += d * g + c * S, this._changed(), this;
        },
        shear: function() {
          var i = arguments, r = F.read(i), a = F.read(i, 0, { readNull: !0 });
          a && this.translate(a);
          var u = this._a, h = this._b;
          return this._a += r.y * this._c, this._b += r.y * this._d, this._c += r.x * u, this._d += r.x * h, a && this.translate(a.negate()), this._changed(), this;
        },
        skew: function() {
          var i = arguments, r = F.read(i), a = F.read(i, 0, { readNull: !0 }), u = Math.PI / 180, h = new F(
            Math.tan(r.x * u),
            Math.tan(r.y * u)
          );
          return this.shear(h, a);
        },
        append: function(i, r) {
          if (i) {
            var a = this._a, u = this._b, h = this._c, f = this._d, d = i._a, c = i._c, p = i._b, g = i._d, b = i._tx, S = i._ty;
            this._a = d * a + p * h, this._c = c * a + g * h, this._b = d * u + p * f, this._d = c * u + g * f, this._tx += b * a + S * h, this._ty += b * u + S * f, r || this._changed();
          }
          return this;
        },
        prepend: function(i, r) {
          if (i) {
            var a = this._a, u = this._b, h = this._c, f = this._d, d = this._tx, c = this._ty, p = i._a, g = i._c, b = i._b, S = i._d, x = i._tx, y = i._ty;
            this._a = p * a + g * u, this._c = p * h + g * f, this._b = b * a + S * u, this._d = b * h + S * f, this._tx = p * d + g * c + x, this._ty = b * d + S * c + y, r || this._changed();
          }
          return this;
        },
        appended: function(i) {
          return this.clone().append(i);
        },
        prepended: function(i) {
          return this.clone().prepend(i);
        },
        invert: function() {
          var i = this._a, r = this._b, a = this._c, u = this._d, h = this._tx, f = this._ty, d = i * u - r * a, c = null;
          return d && !isNaN(d) && isFinite(h) && isFinite(f) && (this._a = u / d, this._b = -r / d, this._c = -a / d, this._d = i / d, this._tx = (a * f - u * h) / d, this._ty = (r * h - i * f) / d, c = this), c;
        },
        inverted: function() {
          return this.clone().invert();
        },
        concatenate: "#append",
        preConcatenate: "#prepend",
        chain: "#appended",
        _shiftless: function() {
          return new Pt(this._a, this._b, this._c, this._d, 0, 0);
        },
        _orNullIfIdentity: function() {
          return this.isIdentity() ? null : this;
        },
        isIdentity: function() {
          return this._a === 1 && this._b === 0 && this._c === 0 && this._d === 1 && this._tx === 0 && this._ty === 0;
        },
        isInvertible: function() {
          var i = this._a * this._d - this._c * this._b;
          return i && !isNaN(i) && isFinite(this._tx) && isFinite(this._ty);
        },
        isSingular: function() {
          return !this.isInvertible();
        },
        transform: function(i, r, a) {
          return arguments.length < 3 ? this._transformPoint(F.read(arguments)) : this._transformCoordinates(i, r, a);
        },
        _transformPoint: function(i, r, a) {
          var u = i.x, h = i.y;
          return r || (r = new F()), r._set(
            u * this._a + h * this._c + this._tx,
            u * this._b + h * this._d + this._ty,
            a
          );
        },
        _transformCoordinates: function(i, r, a) {
          for (var u = 0, h = 2 * a; u < h; u += 2) {
            var f = i[u], d = i[u + 1];
            r[u] = f * this._a + d * this._c + this._tx, r[u + 1] = f * this._b + d * this._d + this._ty;
          }
          return r;
        },
        _transformCorners: function(i) {
          var r = i.x, a = i.y, u = r + i.width, h = a + i.height, f = [r, a, u, a, u, h, r, h];
          return this._transformCoordinates(f, f, 4);
        },
        _transformBounds: function(i, r, a) {
          for (var u = this._transformCorners(i), h = u.slice(0, 2), f = h.slice(), d = 2; d < 8; d++) {
            var c = u[d], p = d & 1;
            c < h[p] ? h[p] = c : c > f[p] && (f[p] = c);
          }
          return r || (r = new ut()), r._set(
            h[0],
            h[1],
            f[0] - h[0],
            f[1] - h[1],
            a
          );
        },
        inverseTransform: function() {
          return this._inverseTransform(F.read(arguments));
        },
        _inverseTransform: function(i, r, a) {
          var u = this._a, h = this._b, f = this._c, d = this._d, c = this._tx, p = this._ty, g = u * d - h * f, b = null;
          if (g && !isNaN(g) && isFinite(c) && isFinite(p)) {
            var S = i.x - this._tx, x = i.y - this._ty;
            r || (r = new F()), b = r._set(
              (S * d - x * f) / g,
              (x * u - S * h) / g,
              a
            );
          }
          return b;
        },
        decompose: function() {
          var i = this._a, r = this._b, a = this._c, u = this._d, h = i * u - r * a, f = Math.sqrt, d = Math.atan2, c = 180 / Math.PI, p, g, b;
          if (i !== 0 || r !== 0) {
            var S = f(i * i + r * r);
            p = Math.acos(i / S) * (r > 0 ? 1 : -1), g = [S, h / S], b = [d(i * a + r * u, S * S), 0];
          } else if (a !== 0 || u !== 0) {
            var x = f(a * a + u * u);
            p = Math.asin(a / x) * (u > 0 ? 1 : -1), g = [h / x, x], b = [0, d(i * a + r * u, x * x)];
          } else
            p = 0, b = g = [0, 0];
          return {
            translation: this.getTranslation(),
            rotation: p * c,
            scaling: new F(g),
            skewing: new F(b[0] * c, b[1] * c)
          };
        },
        getValues: function() {
          return [this._a, this._b, this._c, this._d, this._tx, this._ty];
        },
        getTranslation: function() {
          return new F(this._tx, this._ty);
        },
        getScaling: function() {
          return this.decompose().scaling;
        },
        getRotation: function() {
          return this.decompose().rotation;
        },
        applyToContext: function(i) {
          this.isIdentity() || i.transform(
            this._a,
            this._b,
            this._c,
            this._d,
            this._tx,
            this._ty
          );
        }
      }, l.each(["a", "b", "c", "d", "tx", "ty"], function(i) {
        var r = l.capitalize(i), a = "_" + i;
        this["get" + r] = function() {
          return this[a];
        }, this["set" + r] = function(u) {
          this[a] = u, this._changed();
        };
      }, {})), xt = l.extend({
        _class: "Line",
        initialize: function(r, a, u, h, f) {
          var d = !1;
          arguments.length >= 4 ? (this._px = r, this._py = a, this._vx = u, this._vy = h, d = f) : (this._px = r.x, this._py = r.y, this._vx = a.x, this._vy = a.y, d = u), d || (this._vx -= this._px, this._vy -= this._py);
        },
        getPoint: function() {
          return new F(this._px, this._py);
        },
        getVector: function() {
          return new F(this._vx, this._vy);
        },
        getLength: function() {
          return this.getVector().getLength();
        },
        intersect: function(i, r) {
          return xt.intersect(
            this._px,
            this._py,
            this._vx,
            this._vy,
            i._px,
            i._py,
            i._vx,
            i._vy,
            !0,
            r
          );
        },
        getSide: function(i, r) {
          return xt.getSide(
            this._px,
            this._py,
            this._vx,
            this._vy,
            i.x,
            i.y,
            !0,
            r
          );
        },
        getDistance: function(i) {
          return Math.abs(this.getSignedDistance(i));
        },
        getSignedDistance: function(i) {
          return xt.getSignedDistance(
            this._px,
            this._py,
            this._vx,
            this._vy,
            i.x,
            i.y,
            !0
          );
        },
        isCollinear: function(i) {
          return F.isCollinear(this._vx, this._vy, i._vx, i._vy);
        },
        isOrthogonal: function(i) {
          return F.isOrthogonal(this._vx, this._vy, i._vx, i._vy);
        },
        statics: {
          intersect: function(i, r, a, u, h, f, d, c, p, g) {
            p || (a -= i, u -= r, d -= h, c -= f);
            var b = a * c - u * d;
            if (!q.isMachineZero(b)) {
              var S = i - h, x = r - f, y = (d * x - c * S) / b, E = (a * x - u * S) / b, C = 1e-12, O = -C, w = 1 + C;
              if (g || O < y && y < w && O < E && E < w)
                return g || (y = y <= 0 ? 0 : y >= 1 ? 1 : y), new F(
                  i + y * a,
                  r + y * u
                );
            }
          },
          getSide: function(i, r, a, u, h, f, d, c) {
            d || (a -= i, u -= r);
            var p = h - i, g = f - r, b = p * u - g * a;
            return !c && q.isMachineZero(b) && (b = (p * a + p * a) / (a * a + u * u), b >= 0 && b <= 1 && (b = 0)), b < 0 ? -1 : b > 0 ? 1 : 0;
          },
          getSignedDistance: function(i, r, a, u, h, f, d) {
            return d || (a -= i, u -= r), a === 0 ? u > 0 ? h - i : i - h : u === 0 ? a < 0 ? f - r : r - f : ((h - i) * u - (f - r) * a) / (u > a ? u * Math.sqrt(1 + a * a / (u * u)) : a * Math.sqrt(1 + u * u / (a * a)));
          },
          getDistance: function(i, r, a, u, h, f, d) {
            return Math.abs(
              xt.getSignedDistance(i, r, a, u, h, f, d)
            );
          }
        }
      }), Bt = k.extend({
        _class: "Project",
        _list: "projects",
        _reference: "project",
        _compactSerialize: !0,
        initialize: function(r) {
          k.call(this, !0), this._children = [], this._namedChildren = {}, this._activeLayer = null, this._currentStyle = new Ln(null, null, this), this._view = ke.create(
            this,
            r || st.getCanvas(1, 1)
          ), this._selectionItems = {}, this._selectionCount = 0, this._updateVersion = 0;
        },
        _serialize: function(i, r) {
          return l.serialize(this._children, i, !0, r);
        },
        _changed: function(i, r) {
          if (i & 1) {
            var a = this._view;
            a && (a._needsUpdate = !0, !a._requested && a._autoUpdate && a.requestUpdate());
          }
          var u = this._changes;
          if (u && r) {
            var h = this._changesById, f = r._id, d = h[f];
            d ? d.flags |= i : u.push(h[f] = { item: r, flags: i });
          }
        },
        clear: function() {
          for (var i = this._children, r = i.length - 1; r >= 0; r--)
            i[r].remove();
        },
        isEmpty: function() {
          return !this._children.length;
        },
        remove: function i() {
          return i.base.call(this) ? (this._view && this._view.remove(), !0) : !1;
        },
        getView: function() {
          return this._view;
        },
        getCurrentStyle: function() {
          return this._currentStyle;
        },
        setCurrentStyle: function(i) {
          this._currentStyle.set(i);
        },
        getIndex: function() {
          return this._index;
        },
        getOptions: function() {
          return this._scope.settings;
        },
        getLayers: function() {
          return this._children;
        },
        getActiveLayer: function() {
          return this._activeLayer || new Ft({ project: this, insert: !0 });
        },
        getSymbolDefinitions: function() {
          var i = [], r = {};
          return this.getItems({
            class: Te,
            match: function(a) {
              var u = a._definition, h = u._id;
              return r[h] || (r[h] = !0, i.push(u)), !1;
            }
          }), i;
        },
        getSymbols: "getSymbolDefinitions",
        getSelectedItems: function() {
          var i = this._selectionItems, r = [];
          for (var a in i) {
            var u = i[a], h = u._selection;
            h & 1 && u.isInserted() ? r.push(u) : h || this._updateSelection(u);
          }
          return r;
        },
        _updateSelection: function(i) {
          var r = i._id, a = this._selectionItems;
          i._selection ? a[r] !== i && (this._selectionCount++, a[r] = i) : a[r] === i && (this._selectionCount--, delete a[r]);
        },
        selectAll: function() {
          for (var i = this._children, r = 0, a = i.length; r < a; r++)
            i[r].setFullySelected(!0);
        },
        deselectAll: function() {
          var i = this._selectionItems;
          for (var r in i)
            i[r].setFullySelected(!1);
        },
        addLayer: function(i) {
          return this.insertLayer(n, i);
        },
        insertLayer: function(i, r) {
          if (r instanceof Ft) {
            r._remove(!1, !0), l.splice(this._children, [r], i, 0), r._setProject(this, !0);
            var a = r._name;
            a && r.setName(a), this._changes && r._changed(5), this._activeLayer || (this._activeLayer = r);
          } else
            r = null;
          return r;
        },
        _insertItem: function(i, r, a) {
          return r = this.insertLayer(i, r) || (this._activeLayer || this._insertItem(
            n,
            new Ft(ht.NO_INSERT),
            !0
          )).insertChild(i, r), a && r.activate && r.activate(), r;
        },
        getItems: function(i) {
          return ht._getItems(this, i);
        },
        getItem: function(i) {
          return ht._getItems(this, i, null, null, !0)[0] || null;
        },
        importJSON: function(i) {
          this.activate();
          var r = this._activeLayer;
          return l.importJSON(i, r && r.isEmpty() && r);
        },
        removeOn: function(i) {
          var r = this._removeSets;
          if (r) {
            i === "mouseup" && (r.mousedrag = null);
            var a = r[i];
            if (a) {
              for (var u in a) {
                var h = a[u];
                for (var f in r) {
                  var d = r[f];
                  d && d != a && delete d[h._id];
                }
                h.remove();
              }
              r[i] = null;
            }
          }
        },
        draw: function(i, r, a) {
          this._updateVersion++, i.save(), r.applyToContext(i);
          for (var u = this._children, h = new l({
            offset: new F(0, 0),
            pixelRatio: a,
            viewMatrix: r.isIdentity() ? null : r,
            matrices: [new Pt()],
            updateMatrix: !0
          }), f = 0, d = u.length; f < d; f++)
            u[f].draw(i, h);
          if (i.restore(), this._selectionCount > 0) {
            i.save(), i.strokeWidth = 1;
            var c = this._selectionItems, p = this._scope.settings.handleSize, g = this._updateVersion;
            for (var b in c)
              c[b]._drawSelection(i, r, p, c, g);
            i.restore();
          }
        }
      }), ht = l.extend(
        _,
        {
          statics: {
            extend: function i(r) {
              return r._serializeFields && (r._serializeFields = l.set(
                {},
                this.prototype._serializeFields,
                r._serializeFields
              )), i.base.apply(this, arguments);
            },
            INSERT: { insert: !0 },
            NO_INSERT: { insert: !1 }
          },
          _class: "Item",
          _name: null,
          _applyMatrix: !0,
          _canApplyMatrix: !0,
          _canScaleStroke: !1,
          _pivot: null,
          _visible: !0,
          _blendMode: "normal",
          _opacity: 1,
          _locked: !1,
          _guide: !1,
          _clipMask: !1,
          _selection: 0,
          _selectBounds: !0,
          _selectChildren: !1,
          _serializeFields: {
            name: null,
            applyMatrix: null,
            matrix: new Pt(),
            pivot: null,
            visible: !0,
            blendMode: "normal",
            opacity: 1,
            locked: !1,
            guide: !1,
            clipMask: !1,
            selected: !1,
            data: {}
          },
          _prioritize: ["applyMatrix"]
        },
        new function() {
          var i = [
            "onMouseDown",
            "onMouseUp",
            "onMouseDrag",
            "onClick",
            "onDoubleClick",
            "onMouseMove",
            "onMouseEnter",
            "onMouseLeave"
          ];
          return l.each(
            i,
            function(r) {
              this._events[r] = {
                install: function(a) {
                  this.getView()._countItemEvent(a, 1);
                },
                uninstall: function(a) {
                  this.getView()._countItemEvent(a, -1);
                }
              };
            },
            {
              _events: {
                onFrame: {
                  install: function() {
                    this.getView()._animateItem(this, !0);
                  },
                  uninstall: function() {
                    this.getView()._animateItem(this, !1);
                  }
                },
                onLoad: {},
                onError: {}
              },
              statics: {
                _itemHandlers: i
              }
            }
          );
        }(),
        {
          initialize: function() {
          },
          _initialize: function(i, r) {
            var a = i && l.isPlainObject(i), u = a && i.internal === !0, h = this._matrix = new Pt(), f = a && i.project || gt.project, d = gt.settings;
            return this._id = u ? null : tt.get(), this._parent = this._index = null, this._applyMatrix = this._canApplyMatrix && d.applyMatrix, r && h.translate(r), h._owner = this, this._style = new Ln(f._currentStyle, this, f), u || a && i.insert == !1 || !d.insertItems && !(a && i.insert == !0) ? this._setProject(f) : (a && i.parent || f)._insertItem(n, this, !0), a && i !== ht.NO_INSERT && i !== ht.INSERT && this.set(i, {
              internal: !0,
              insert: !0,
              project: !0,
              parent: !0
            }), a;
          },
          _serialize: function(i, r) {
            var a = {}, u = this;
            function h(f) {
              for (var d in f) {
                var c = u[d];
                l.equals(c, d === "leading" ? f.fontSize * 1.2 : f[d]) || (a[d] = l.serialize(
                  c,
                  i,
                  d !== "data",
                  r
                ));
              }
            }
            return h(this._serializeFields), this instanceof At || h(this._style._defaults), [this._class, a];
          },
          _changed: function(i) {
            var r = this._symbol, a = this._parent || r, u = this._project;
            i & 8 && (this._bounds = this._position = this._decomposed = n), i & 16 && (this._globalMatrix = n), a && i & 72 && ht._clearBoundsCache(a), i & 2 && ht._clearBoundsCache(this), u && u._changed(i, this), r && r._changed(i);
          },
          getId: function() {
            return this._id;
          },
          getName: function() {
            return this._name;
          },
          setName: function(i) {
            if (this._name && this._removeNamed(), i === +i + "")
              throw new Error(
                "Names consisting only of numbers are not supported."
              );
            var r = this._getOwner();
            if (i && r) {
              var a = r._children, u = r._namedChildren;
              (u[i] = u[i] || []).push(this), i in a || (a[i] = this);
            }
            this._name = i || n, this._changed(256);
          },
          getStyle: function() {
            return this._style;
          },
          setStyle: function(i) {
            this.getStyle().set(i);
          }
        },
        l.each(
          ["locked", "visible", "blendMode", "opacity", "guide"],
          function(i) {
            var r = l.capitalize(i), a = "_" + i, u = {
              locked: 256,
              visible: 265
            };
            this["get" + r] = function() {
              return this[a];
            }, this["set" + r] = function(h) {
              h != this[a] && (this[a] = h, this._changed(u[i] || 257));
            };
          },
          {}
        ),
        {
          beans: !0,
          getSelection: function() {
            return this._selection;
          },
          setSelection: function(i) {
            if (i !== this._selection) {
              this._selection = i;
              var r = this._project;
              r && (r._updateSelection(this), this._changed(257));
            }
          },
          _changeSelection: function(i, r) {
            var a = this._selection;
            this.setSelection(r ? a | i : a & ~i);
          },
          isSelected: function() {
            if (this._selectChildren) {
              for (var i = this._children, r = 0, a = i.length; r < a; r++)
                if (i[r].isSelected())
                  return !0;
            }
            return !!(this._selection & 1);
          },
          setSelected: function(i) {
            if (this._selectChildren)
              for (var r = this._children, a = 0, u = r.length; a < u; a++)
                r[a].setSelected(i);
            this._changeSelection(1, i);
          },
          isFullySelected: function() {
            var i = this._children, r = !!(this._selection & 1);
            if (i && r) {
              for (var a = 0, u = i.length; a < u; a++)
                if (!i[a].isFullySelected())
                  return !1;
              return !0;
            }
            return r;
          },
          setFullySelected: function(i) {
            var r = this._children;
            if (r)
              for (var a = 0, u = r.length; a < u; a++)
                r[a].setFullySelected(i);
            this._changeSelection(1, i);
          },
          isClipMask: function() {
            return this._clipMask;
          },
          setClipMask: function(i) {
            this._clipMask != (i = !!i) && (this._clipMask = i, i && (this.setFillColor(null), this.setStrokeColor(null)), this._changed(257), this._parent && this._parent._changed(2048));
          },
          getData: function() {
            return this._data || (this._data = {}), this._data;
          },
          setData: function(i) {
            this._data = i;
          },
          getPosition: function(i) {
            var r = i ? F : mt, a = this._position || (this._position = this._getPositionFromBounds());
            return new r(a.x, a.y, this, "setPosition");
          },
          setPosition: function() {
            this.translate(F.read(arguments).subtract(this.getPosition(!0)));
          },
          _getPositionFromBounds: function(i) {
            return this._pivot ? this._matrix._transformPoint(this._pivot) : (i || this.getBounds()).getCenter(!0);
          },
          getPivot: function() {
            var i = this._pivot;
            return i ? new mt(i.x, i.y, this, "setPivot") : null;
          },
          setPivot: function() {
            this._pivot = F.read(arguments, 0, { clone: !0, readNull: !0 }), this._position = n;
          }
        },
        l.each(
          {
            getStrokeBounds: { stroke: !0 },
            getHandleBounds: { handle: !0 },
            getInternalBounds: { internal: !0 }
          },
          function(i, r) {
            this[r] = function(a) {
              return this.getBounds(a, i);
            };
          },
          {
            beans: !0,
            getBounds: function(i, r) {
              var a = r || i instanceof Pt, u = l.set(
                {},
                a ? r : i,
                this._boundsOptions
              );
              (!u.stroke || this.getStrokeScaling()) && (u.cacheItem = this);
              var h = this._getCachedBounds(a && i, u).rect;
              return arguments.length ? h : new Xt(
                h.x,
                h.y,
                h.width,
                h.height,
                this,
                "setBounds"
              );
            },
            setBounds: function() {
              var i = ut.read(arguments), r = this.getBounds(), a = this._matrix, u = new Pt(), h = i.getCenter();
              u.translate(h), (i.width != r.width || i.height != r.height) && (a.isInvertible() || (a.set(a._backup || new Pt().translate(a.getTranslation())), r = this.getBounds()), u.scale(
                r.width !== 0 ? i.width / r.width : 0,
                r.height !== 0 ? i.height / r.height : 0
              )), h = r.getCenter(), u.translate(-h.x, -h.y), this.transform(u);
            },
            _getBounds: function(i, r) {
              var a = this._children;
              return !a || !a.length ? new ut() : (ht._updateBoundsCache(this, r.cacheItem), ht._getBounds(a, i, r));
            },
            _getBoundsCacheKey: function(i, r) {
              return [
                i.stroke ? 1 : 0,
                i.handle ? 1 : 0,
                r ? 1 : 0
              ].join("");
            },
            _getCachedBounds: function(i, r, a) {
              i = i && i._orNullIfIdentity();
              var u = r.internal && !a, h = r.cacheItem, f = u ? null : this._matrix._orNullIfIdentity(), d = h && (!i || i.equals(f)) && this._getBoundsCacheKey(r, u), c = this._bounds;
              if (ht._updateBoundsCache(this._parent || this._symbol, h), d && c && d in c) {
                var p = c[d];
                return {
                  rect: p.rect.clone(),
                  nonscaling: p.nonscaling
                };
              }
              var g = this._getBounds(i || f, r), b = g.rect || g, S = this._style, x = g.nonscaling || S.hasStroke() && !S.getStrokeScaling();
              if (d) {
                c || (this._bounds = c = {});
                var p = c[d] = {
                  rect: b.clone(),
                  nonscaling: x,
                  internal: u
                };
              }
              return {
                rect: b,
                nonscaling: x
              };
            },
            _getStrokeMatrix: function(i, r) {
              var a = this.getStrokeScaling() ? null : r && r.internal ? this : this._parent || this._symbol && this._symbol._item, u = a ? a.getViewMatrix().invert() : i;
              return u && u._shiftless();
            },
            statics: {
              _updateBoundsCache: function(i, r) {
                if (i && r) {
                  var a = r._id, u = i._boundsCache = i._boundsCache || {
                    ids: {},
                    list: []
                  };
                  u.ids[a] || (u.list.push(r), u.ids[a] = r);
                }
              },
              _clearBoundsCache: function(i) {
                var r = i._boundsCache;
                if (r) {
                  i._bounds = i._position = i._boundsCache = n;
                  for (var a = 0, u = r.list, h = u.length; a < h; a++) {
                    var f = u[a];
                    f !== i && (f._bounds = f._position = n, f._boundsCache && ht._clearBoundsCache(f));
                  }
                }
              },
              _getBounds: function(i, r, a) {
                var u = 1 / 0, h = -u, f = u, d = h, c = !1;
                a = a || {};
                for (var p = 0, g = i.length; p < g; p++) {
                  var b = i[p];
                  if (b._visible && !b.isEmpty(!0)) {
                    var S = b._getCachedBounds(
                      r && r.appended(b._matrix),
                      a,
                      !0
                    ), x = S.rect;
                    u = Math.min(x.x, u), f = Math.min(x.y, f), h = Math.max(x.x + x.width, h), d = Math.max(x.y + x.height, d), S.nonscaling && (c = !0);
                  }
                }
                return {
                  rect: isFinite(u) ? new ut(u, f, h - u, d - f) : new ut(),
                  nonscaling: c
                };
              }
            }
          }
        ),
        {
          beans: !0,
          _decompose: function() {
            return this._applyMatrix ? null : this._decomposed || (this._decomposed = this._matrix.decompose());
          },
          getRotation: function() {
            var i = this._decompose();
            return i ? i.rotation : 0;
          },
          setRotation: function(i) {
            var r = this.getRotation();
            if (r != null && i != null) {
              var a = this._decomposed;
              this.rotate(i - r), a && (a.rotation = i, this._decomposed = a);
            }
          },
          getScaling: function() {
            var i = this._decompose(), r = i && i.scaling;
            return new mt(r ? r.x : 1, r ? r.y : 1, this, "setScaling");
          },
          setScaling: function() {
            var i = this.getScaling(), r = F.read(arguments, 0, { clone: !0, readNull: !0 });
            if (i && r && !i.equals(r)) {
              var a = this.getRotation(), u = this._decomposed, h = new Pt(), f = q.isZero;
              if (f(i.x) || f(i.y))
                h.translate(u.translation), a && h.rotate(a), h.scale(r.x, r.y), this._matrix.set(h);
              else {
                var d = this.getPosition(!0);
                h.translate(d), a && h.rotate(a), h.scale(r.x / i.x, r.y / i.y), a && h.rotate(-a), h.translate(d.negate()), this.transform(h);
              }
              u && (u.scaling = r, this._decomposed = u);
            }
          },
          getMatrix: function() {
            return this._matrix;
          },
          setMatrix: function() {
            var i = this._matrix;
            i.set.apply(i, arguments);
          },
          getGlobalMatrix: function(i) {
            var r = this._globalMatrix;
            if (r)
              for (var a = this._parent, u = []; a; ) {
                if (!a._globalMatrix) {
                  r = null;
                  for (var h = 0, f = u.length; h < f; h++)
                    u[h]._globalMatrix = null;
                  break;
                }
                u.push(a), a = a._parent;
              }
            if (!r) {
              r = this._globalMatrix = this._matrix.clone();
              var a = this._parent;
              a && r.prepend(a.getGlobalMatrix(!0));
            }
            return i ? r : r.clone();
          },
          getViewMatrix: function() {
            return this.getGlobalMatrix().prepend(this.getView()._matrix);
          },
          getApplyMatrix: function() {
            return this._applyMatrix;
          },
          setApplyMatrix: function(i) {
            (this._applyMatrix = this._canApplyMatrix && !!i) && this.transform(null, !0);
          },
          getTransformContent: "#getApplyMatrix",
          setTransformContent: "#setApplyMatrix"
        },
        {
          getProject: function() {
            return this._project;
          },
          _setProject: function(i, r) {
            if (this._project !== i) {
              this._project && this._installEvents(!1), this._project = i;
              for (var a = this._children, u = 0, h = a && a.length; u < h; u++)
                a[u]._setProject(i);
              r = !0;
            }
            r && this._installEvents(!0);
          },
          getView: function() {
            return this._project._view;
          },
          _installEvents: function i(r) {
            i.base.call(this, r);
            for (var a = this._children, u = 0, h = a && a.length; u < h; u++)
              a[u]._installEvents(r);
          },
          getLayer: function() {
            for (var i = this; i = i._parent; )
              if (i instanceof Ft)
                return i;
            return null;
          },
          getParent: function() {
            return this._parent;
          },
          setParent: function(i) {
            return i.addChild(this);
          },
          _getOwner: "#getParent",
          getChildren: function() {
            return this._children;
          },
          setChildren: function(i) {
            this.removeChildren(), this.addChildren(i);
          },
          getFirstChild: function() {
            return this._children && this._children[0] || null;
          },
          getLastChild: function() {
            return this._children && this._children[this._children.length - 1] || null;
          },
          getNextSibling: function() {
            var i = this._getOwner();
            return i && i._children[this._index + 1] || null;
          },
          getPreviousSibling: function() {
            var i = this._getOwner();
            return i && i._children[this._index - 1] || null;
          },
          getIndex: function() {
            return this._index;
          },
          equals: function(i) {
            return i === this || i && this._class === i._class && this._style.equals(i._style) && this._matrix.equals(i._matrix) && this._locked === i._locked && this._visible === i._visible && this._blendMode === i._blendMode && this._opacity === i._opacity && this._clipMask === i._clipMask && this._guide === i._guide && this._equals(i) || !1;
          },
          _equals: function(i) {
            return l.equals(this._children, i._children);
          },
          clone: function(i) {
            var r = new this.constructor(ht.NO_INSERT), a = this._children, u = l.pick(
              i ? i.insert : n,
              i === n || i === !0
            ), h = l.pick(i ? i.deep : n, !0);
            a && r.copyAttributes(this), (!a || h) && r.copyContent(this), a || r.copyAttributes(this), u && r.insertAbove(this);
            var f = this._name, d = this._parent;
            if (f && d) {
              for (var a = d._children, c = f, p = 1; a[f]; )
                f = c + " " + p++;
              f !== c && r.setName(f);
            }
            return r;
          },
          copyContent: function(i) {
            for (var r = i._children, a = 0, u = r && r.length; a < u; a++)
              this.addChild(r[a].clone(!1), !0);
          },
          copyAttributes: function(i, r) {
            this.setStyle(i._style);
            for (var a = [
              "_locked",
              "_visible",
              "_blendMode",
              "_opacity",
              "_clipMask",
              "_guide"
            ], u = 0, h = a.length; u < h; u++) {
              var f = a[u];
              i.hasOwnProperty(f) && (this[f] = i[f]);
            }
            r || this._matrix.set(i._matrix, !0), this.setApplyMatrix(i._applyMatrix), this.setPivot(i._pivot), this.setSelection(i._selection);
            var d = i._data, c = i._name;
            this._data = d ? l.clone(d) : null, c && this.setName(c);
          },
          rasterize: function(i, r) {
            var a, u, h;
            l.isPlainObject(i) ? (a = i.resolution, u = i.insert, h = i.raster) : (a = i, u = r), h || (h = new me(ht.NO_INSERT));
            var f = this.getStrokeBounds(), d = (a || this.getView().getResolution()) / 72, c = f.getTopLeft().floor(), p = f.getBottomRight().ceil(), g = new X(p.subtract(c)), b = g.multiply(d);
            if (h.setSize(b, !0), !b.isZero()) {
              var S = h.getContext(!0), x = new Pt().scale(d).translate(c.negate());
              S.save(), x.applyToContext(S), this.draw(S, new l({ matrices: [x] })), S.restore();
            }
            return h._matrix.set(
              new Pt().translate(c.add(g.divide(2))).scale(1 / d)
            ), (u === n || u) && h.insertAbove(this), h;
          },
          contains: function() {
            var i = this._matrix;
            return i.isInvertible() && !!this._contains(i._inverseTransform(F.read(arguments)));
          },
          _contains: function(i) {
            var r = this._children;
            if (r) {
              for (var a = r.length - 1; a >= 0; a--)
                if (r[a].contains(i))
                  return !0;
              return !1;
            }
            return i.isInside(this.getInternalBounds());
          },
          isInside: function() {
            return ut.read(arguments).contains(this.getBounds());
          },
          _asPathItem: function() {
            return new Jt.Rectangle({
              rectangle: this.getInternalBounds(),
              matrix: this._matrix,
              insert: !1
            });
          },
          intersects: function(i, r) {
            return i instanceof ht ? this._asPathItem().getIntersections(
              i._asPathItem(),
              null,
              r,
              !0
            ).length > 0 : !1;
          }
        },
        new function() {
          function i() {
            var u = arguments;
            return this._hitTest(
              F.read(u),
              Oe.getOptions(u)
            );
          }
          function r() {
            var u = arguments, h = F.read(u), f = Oe.getOptions(u), d = [];
            return this._hitTest(h, new l({ all: d }, f)), d;
          }
          function a(u, h, f, d) {
            var c = this._children;
            if (c)
              for (var p = c.length - 1; p >= 0; p--) {
                var g = c[p], b = g !== d && g._hitTest(
                  u,
                  h,
                  f
                );
                if (b && !h.all)
                  return b;
              }
            return null;
          }
          return Bt.inject({
            hitTest: i,
            hitTestAll: r,
            _hitTest: a
          }), {
            hitTest: i,
            hitTestAll: r,
            _hitTestChildren: a
          };
        }(),
        {
          _hitTest: function(i, r, a) {
            if (this._locked || !this._visible || this._guide && !r.guides || this.isEmpty())
              return null;
            var u = this._matrix, h = a ? a.appended(u) : this.getGlobalMatrix().prepend(this.getView()._matrix), f = Math.max(r.tolerance, 1e-12), d = r._tolerancePadding = new X(
              Jt._getStrokePadding(
                f,
                u._shiftless().invert()
              )
            );
            if (i = u._inverseTransform(i), !i || !this._children && !this.getBounds({ internal: !0, stroke: !0, handle: !0 }).expand(d.multiply(2))._containsPoint(i))
              return null;
            var c = !(r.guides && !this._guide || r.selected && !this.isSelected() || r.type && r.type !== l.hyphenate(this._class) || r.class && !(this instanceof r.class)), p = r.match, g = this, b, S;
            function x(m) {
              return m && p && !p(m) && (m = null), m && r.all && r.all.push(m), m;
            }
            function y(m, I) {
              var T = I ? b["get" + I]() : g.getPosition();
              if (i.subtract(T).divide(d).length <= 1)
                return new Oe(m, g, {
                  name: I ? l.hyphenate(I) : m,
                  point: T
                });
            }
            var E = r.position, C = r.center, O = r.bounds;
            if (c && this._parent && (E || C || O)) {
              if ((C || O) && (b = this.getInternalBounds()), S = E && y("position") || C && y("center", "Center"), !S && O)
                for (var w = [
                  "TopLeft",
                  "TopRight",
                  "BottomLeft",
                  "BottomRight",
                  "LeftCenter",
                  "TopCenter",
                  "RightCenter",
                  "BottomCenter"
                ], P = 0; P < 8 && !S; P++)
                  S = y("bounds", w[P]);
              S = x(S);
            }
            return S || (S = this._hitTestChildren(i, r, h) || c && x(this._hitTestSelf(
              i,
              r,
              h,
              this.getStrokeScaling() ? null : h._shiftless().invert()
            )) || null), S && S.point && (S.point = u.transform(S.point)), S;
          },
          _hitTestSelf: function(i, r) {
            if (r.fill && this.hasFill() && this._contains(i))
              return new Oe("fill", this);
          },
          matches: function(i, r) {
            function a(d, c) {
              for (var p in d)
                if (d.hasOwnProperty(p)) {
                  var g = d[p], b = c[p];
                  if (l.isPlainObject(g) && l.isPlainObject(b)) {
                    if (!a(g, b))
                      return !1;
                  } else if (!l.equals(g, b))
                    return !1;
                }
              return !0;
            }
            var u = typeof i;
            if (u === "object") {
              for (var h in i)
                if (i.hasOwnProperty(h) && !this.matches(h, i[h]))
                  return !1;
              return !0;
            } else {
              if (u === "function")
                return i(this);
              if (i === "match")
                return r(this);
              var f = /^(empty|editable)$/.test(i) ? this["is" + l.capitalize(i)]() : i === "type" ? l.hyphenate(this._class) : this[i];
              if (i === "class") {
                if (typeof r == "function")
                  return this instanceof r;
                f = this._class;
              }
              if (typeof r == "function")
                return !!r(f);
              if (r) {
                if (r.test)
                  return r.test(f);
                if (l.isPlainObject(r))
                  return a(r, f);
              }
              return l.equals(f, r);
            }
          },
          getItems: function(i) {
            return ht._getItems(this, i, this._matrix);
          },
          getItem: function(i) {
            return ht._getItems(this, i, this._matrix, null, !0)[0] || null;
          },
          statics: {
            _getItems: function i(r, a, u, h, f) {
              if (!h) {
                var d = typeof a == "object" && a, c = d && d.overlapping, p = d && d.inside, g = c || p, x = g && ut.read([g]);
                h = {
                  items: [],
                  recursive: d && d.recursive !== !1,
                  inside: !!p,
                  overlapping: !!c,
                  rect: x,
                  path: c && new Jt.Rectangle({
                    rectangle: x,
                    insert: !1
                  })
                }, d && (a = l.filter({}, a, {
                  recursive: !0,
                  inside: !0,
                  overlapping: !0
                }));
              }
              var b = r._children, S = h.items, x = h.rect;
              u = x && (u || new Pt());
              for (var y = 0, E = b && b.length; y < E; y++) {
                var C = b[y], O = u && u.appended(C._matrix), w = !0;
                if (x) {
                  var g = C.getBounds(O);
                  if (!x.intersects(g))
                    continue;
                  x.contains(g) || h.overlapping && (g.contains(x) || h.path.intersects(C, O)) || (w = !1);
                }
                if (w && C.matches(a) && (S.push(C), f) || (h.recursive !== !1 && i(C, a, O, h, f), f && S.length > 0))
                  break;
              }
              return S;
            }
          }
        },
        {
          importJSON: function(i) {
            var r = l.importJSON(i, this);
            return r !== this ? this.addChild(r) : r;
          },
          addChild: function(i) {
            return this.insertChild(n, i);
          },
          insertChild: function(i, r) {
            var a = r ? this.insertChildren(i, [r]) : null;
            return a && a[0];
          },
          addChildren: function(i) {
            return this.insertChildren(this._children.length, i);
          },
          insertChildren: function(i, r) {
            var a = this._children;
            if (a && r && r.length > 0) {
              r = l.slice(r);
              for (var u = {}, h = r.length - 1; h >= 0; h--) {
                var f = r[h], d = f && f._id;
                !f || u[d] ? r.splice(h, 1) : (f._remove(!1, !0), u[d] = !0);
              }
              l.splice(a, r, i, 0);
              for (var c = this._project, p = c._changes, h = 0, g = r.length; h < g; h++) {
                var f = r[h], b = f._name;
                f._parent = this, f._setProject(c, !0), b && f.setName(b), p && f._changed(5);
              }
              this._changed(11);
            } else
              r = null;
            return r;
          },
          _insertItem: "#insertChild",
          _insertAt: function(i, r) {
            var a = i && i._getOwner(), u = i !== this && a ? this : null;
            return u && (u._remove(!1, !0), a._insertItem(i._index + r, u)), u;
          },
          insertAbove: function(i) {
            return this._insertAt(i, 1);
          },
          insertBelow: function(i) {
            return this._insertAt(i, 0);
          },
          sendToBack: function() {
            var i = this._getOwner();
            return i ? i._insertItem(0, this) : null;
          },
          bringToFront: function() {
            var i = this._getOwner();
            return i ? i._insertItem(n, this) : null;
          },
          appendTop: "#addChild",
          appendBottom: function(i) {
            return this.insertChild(0, i);
          },
          moveAbove: "#insertAbove",
          moveBelow: "#insertBelow",
          addTo: function(i) {
            return i._insertItem(n, this);
          },
          copyTo: function(i) {
            return this.clone(!1).addTo(i);
          },
          reduce: function(i) {
            var r = this._children;
            if (r && r.length === 1) {
              var a = r[0].reduce(i);
              return this._parent ? (a.insertAbove(this), this.remove()) : a.remove(), a;
            }
            return this;
          },
          _removeNamed: function() {
            var i = this._getOwner();
            if (i) {
              var r = i._children, a = i._namedChildren, u = this._name, h = a[u], f = h ? h.indexOf(this) : -1;
              f !== -1 && (r[u] == this && delete r[u], h.splice(f, 1), h.length ? r[u] = h[0] : delete a[u]);
            }
          },
          _remove: function(i, r) {
            var a = this._getOwner(), u = this._project, h = this._index;
            return this._style && this._style._dispose(), a ? (this._name && this._removeNamed(), h != null && (u._activeLayer === this && (u._activeLayer = this.getNextSibling() || this.getPreviousSibling()), l.splice(a._children, null, h, 1)), this._installEvents(!1), i && u._changes && this._changed(5), r && a._changed(11, this), this._parent = null, !0) : !1;
          },
          remove: function() {
            return this._remove(!0, !0);
          },
          replaceWith: function(i) {
            var r = i && i.insertBelow(this);
            return r && this.remove(), r;
          },
          removeChildren: function(i, r) {
            if (!this._children)
              return null;
            i = i || 0, r = l.pick(r, this._children.length);
            for (var a = l.splice(this._children, null, i, r - i), u = a.length - 1; u >= 0; u--)
              a[u]._remove(!0, !1);
            return a.length > 0 && this._changed(11), a;
          },
          clear: "#removeChildren",
          reverseChildren: function() {
            if (this._children) {
              this._children.reverse();
              for (var i = 0, r = this._children.length; i < r; i++)
                this._children[i]._index = i;
              this._changed(11);
            }
          },
          isEmpty: function(i) {
            var r = this._children, a = r ? r.length : 0;
            if (i) {
              for (var u = 0; u < a; u++)
                if (!r[u].isEmpty(i))
                  return !1;
              return !0;
            }
            return !a;
          },
          isEditable: function() {
            for (var i = this; i; ) {
              if (!i._visible || i._locked)
                return !1;
              i = i._parent;
            }
            return !0;
          },
          hasFill: function() {
            return this.getStyle().hasFill();
          },
          hasStroke: function() {
            return this.getStyle().hasStroke();
          },
          hasShadow: function() {
            return this.getStyle().hasShadow();
          },
          _getOrder: function(i) {
            function r(d) {
              var c = [];
              do
                c.unshift(d);
              while (d = d._parent);
              return c;
            }
            for (var a = r(this), u = r(i), h = 0, f = Math.min(a.length, u.length); h < f; h++)
              if (a[h] != u[h])
                return a[h]._index < u[h]._index ? 1 : -1;
            return 0;
          },
          hasChildren: function() {
            return this._children && this._children.length > 0;
          },
          isInserted: function() {
            return this._parent ? this._parent.isInserted() : !1;
          },
          isAbove: function(i) {
            return this._getOrder(i) === -1;
          },
          isBelow: function(i) {
            return this._getOrder(i) === 1;
          },
          isParent: function(i) {
            return this._parent === i;
          },
          isChild: function(i) {
            return i && i._parent === this;
          },
          isDescendant: function(i) {
            for (var r = this; r = r._parent; )
              if (r === i)
                return !0;
            return !1;
          },
          isAncestor: function(i) {
            return i ? i.isDescendant(this) : !1;
          },
          isSibling: function(i) {
            return this._parent === i._parent;
          },
          isGroupedWith: function(i) {
            for (var r = this._parent; r; ) {
              if (r._parent && /^(Group|Layer|CompoundPath)$/.test(r._class) && i.isDescendant(r))
                return !0;
              r = r._parent;
            }
            return !1;
          }
        },
        l.each(["rotate", "scale", "shear", "skew"], function(i) {
          var r = i === "rotate";
          this[i] = function() {
            var a = arguments, u = (r ? l : F).read(a), h = F.read(a, 0, { readNull: !0 });
            return this.transform(new Pt()[i](
              u,
              h || this.getPosition(!0)
            ));
          };
        }, {
          translate: function() {
            var i = new Pt();
            return this.transform(i.translate.apply(i, arguments));
          },
          transform: function(i, r, a) {
            var u = this._matrix, h = i && !i.isIdentity(), f = a && this._canApplyMatrix || this._applyMatrix && (h || !u.isIdentity() || r && this._children);
            if (!h && !f)
              return this;
            if (h) {
              !i.isInvertible() && u.isInvertible() && (u._backup = u.getValues()), u.prepend(i, !0);
              var d = this._style, c = d.getFillColor(!0), p = d.getStrokeColor(!0);
              c && c.transform(i), p && p.transform(i);
            }
            if (f && (f = this._transformContent(
              u,
              r,
              a
            ))) {
              var g = this._pivot;
              g && u._transformPoint(g, g, !0), u.reset(!0), a && this._canApplyMatrix && (this._applyMatrix = !0);
            }
            var b = this._bounds, S = this._position;
            (h || f) && this._changed(25);
            var x = h && b && i.decompose();
            if (x && x.skewing.isZero() && x.rotation % 90 === 0) {
              for (var y in b) {
                var E = b[y];
                if (E.nonscaling)
                  delete b[y];
                else if (f || !E.internal) {
                  var C = E.rect;
                  i._transformBounds(C, C);
                }
              }
              this._bounds = b;
              var O = b[this._getBoundsCacheKey(
                this._boundsOptions || {}
              )];
              O && (this._position = this._getPositionFromBounds(O.rect));
            } else h && S && this._pivot && (this._position = i._transformPoint(S, S));
            return this;
          },
          _transformContent: function(i, r, a) {
            var u = this._children;
            if (u) {
              for (var h = 0, f = u.length; h < f; h++)
                u[h].transform(i, r, a);
              return !0;
            }
          },
          globalToLocal: function() {
            return this.getGlobalMatrix(!0)._inverseTransform(
              F.read(arguments)
            );
          },
          localToGlobal: function() {
            return this.getGlobalMatrix(!0)._transformPoint(
              F.read(arguments)
            );
          },
          parentToLocal: function() {
            return this._matrix._inverseTransform(F.read(arguments));
          },
          localToParent: function() {
            return this._matrix._transformPoint(F.read(arguments));
          },
          fitBounds: function(i, r) {
            i = ut.read(arguments);
            var a = this.getBounds(), u = a.height / a.width, h = i.height / i.width, f = (r ? u > h : u < h) ? i.width / a.width : i.height / a.height, d = new ut(
              new F(),
              new X(a.width * f, a.height * f)
            );
            d.setCenter(i.getCenter()), this.setBounds(d);
          }
        }),
        {
          _setStyles: function(i, r, a) {
            var u = this._style, h = this._matrix;
            if (u.hasFill() && (i.fillStyle = u.getFillColor().toCanvasStyle(i, h)), u.hasStroke()) {
              i.strokeStyle = u.getStrokeColor().toCanvasStyle(i, h), i.lineWidth = u.getStrokeWidth();
              var f = u.getStrokeJoin(), d = u.getStrokeCap(), c = u.getMiterLimit();
              if (f && (i.lineJoin = f), d && (i.lineCap = d), c && (i.miterLimit = c), gt.support.nativeDash) {
                var p = u.getDashArray(), g = u.getDashOffset();
                p && p.length && ("setLineDash" in i ? (i.setLineDash(p), i.lineDashOffset = g) : (i.mozDash = p, i.mozDashOffset = g));
              }
            }
            if (u.hasShadow()) {
              var b = r.pixelRatio || 1, S = a._shiftless().prepend(
                new Pt().scale(b, b)
              ), x = S.transform(new F(u.getShadowBlur(), 0)), y = S.transform(this.getShadowOffset());
              i.shadowColor = u.getShadowColor().toCanvasStyle(i), i.shadowBlur = x.getLength(), i.shadowOffsetX = y.x, i.shadowOffsetY = y.y;
            }
          },
          draw: function(i, r, a) {
            if (this._updateVersion = this._project._updateVersion, !(!this._visible || this._opacity === 0)) {
              var u = r.matrices, h = r.viewMatrix, f = this._matrix, d = u[u.length - 1].appended(f);
              if (d.isInvertible()) {
                h = h ? h.appended(d) : d, u.push(d), r.updateMatrix && (this._globalMatrix = d);
                var c = this._blendMode, p = q.clamp(this._opacity, 0, 1), g = c === "normal", b = Ot.nativeModes[c], S = g && p === 1 || r.dontStart || r.clip || (b || g && p < 1) && this._canComposite(), x = r.pixelRatio || 1, y, E, C;
                if (!S) {
                  var O = this.getStrokeBounds(h);
                  if (!O.width || !O.height) {
                    u.pop();
                    return;
                  }
                  C = r.offset, E = r.offset = O.getTopLeft().floor(), y = i, i = st.getContext(O.getSize().ceil().add(1).multiply(x)), x !== 1 && i.scale(x, x);
                }
                i.save();
                var w = a ? a.appended(f) : this._canScaleStroke && !this.getStrokeScaling(!0) && h, P = !S && r.clipItem, m = !w || P;
                if (S ? (i.globalAlpha = p, b && (i.globalCompositeOperation = c)) : m && i.translate(-E.x, -E.y), m && (S ? f : h).applyToContext(i), P && r.clipItem.draw(i, r.extend({ clip: !0 })), w) {
                  i.setTransform(x, 0, 0, x, 0, 0);
                  var I = r.offset;
                  I && i.translate(-I.x, -I.y);
                }
                this._draw(i, r, h, w), i.restore(), u.pop(), r.clip && !r.dontFinish && i.clip(this.getFillRule()), S || (Ot.process(
                  c,
                  i,
                  y,
                  p,
                  E.subtract(C).multiply(x)
                ), st.release(i), r.offset = C);
              }
            }
          },
          _isUpdated: function(i) {
            var r = this._parent;
            if (r instanceof Qe)
              return r._isUpdated(i);
            var a = this._updateVersion === i;
            return !a && r && r._visible && r._isUpdated(i) && (this._updateVersion = i, a = !0), a;
          },
          _drawSelection: function(i, r, a, u, h) {
            var f = this._selection, d = f & 1, c = f & 2 || d && this._selectBounds, p = f & 4;
            if (this._drawSelected || (d = !1), (d || c || p) && this._isUpdated(h)) {
              var g, b = this.getSelectedColor(!0) || (g = this.getLayer()) && g.getSelectedColor(!0), S = r.appended(this.getGlobalMatrix(!0)), x = a / 2;
              if (i.strokeStyle = i.fillStyle = b ? b.toCanvasStyle(i) : "#009dec", d && this._drawSelected(i, S, u), p) {
                var y = this.getPosition(!0), E = this._parent, C = E ? E.localToGlobal(y) : y, O = C.x, w = C.y;
                i.beginPath(), i.arc(O, w, x, 0, Math.PI * 2, !0), i.stroke();
                for (var P = [[0, -1], [1, 0], [0, 1], [-1, 0]], m = x, I = a + 1, T = 0; T < 4; T++) {
                  var M = P[T], A = M[0], R = M[1];
                  i.moveTo(O + A * m, w + R * m), i.lineTo(O + A * I, w + R * I), i.stroke();
                }
              }
              if (c) {
                var V = S._transformCorners(this.getInternalBounds());
                i.beginPath();
                for (var T = 0; T < 8; T++)
                  i[T ? "lineTo" : "moveTo"](V[T], V[++T]);
                i.closePath(), i.stroke();
                for (var T = 0; T < 8; T++)
                  i.fillRect(
                    V[T] - x,
                    V[++T] - x,
                    a,
                    a
                  );
              }
            }
          },
          _canComposite: function() {
            return !1;
          }
        },
        l.each(["down", "drag", "up", "move"], function(i) {
          this["removeOn" + l.capitalize(i)] = function() {
            var r = {};
            return r[i] = !0, this.removeOn(r);
          };
        }, {
          removeOn: function(i) {
            for (var r in i)
              if (i[r]) {
                var a = "mouse" + r, u = this._project, h = u._removeSets = u._removeSets || {};
                h[a] = h[a] || {}, h[a][this._id] = this;
              }
            return this;
          }
        }),
        {
          tween: function(i, r, a) {
            a || (a = r, r = i, i = null, a || (a = r, r = null));
            var u = a && a.easing, h = a && a.start, f = a != null && (typeof a == "number" ? a : a.duration), d = new bt(this, i, r, f, u, h);
            function c(p) {
              d._handleFrame(p.time * 1e3), d.running || this.off("frame", c);
            }
            return f && this.on("frame", c), d;
          },
          tweenTo: function(i, r) {
            return this.tween(null, i, r);
          },
          tweenFrom: function(i, r) {
            return this.tween(i, null, r);
          }
        }
      ), At = ht.extend({
        _class: "Group",
        _selectBounds: !1,
        _selectChildren: !0,
        _serializeFields: {
          children: []
        },
        initialize: function(r) {
          this._children = [], this._namedChildren = {}, this._initialize(r) || this.addChildren(Array.isArray(r) ? r : arguments);
        },
        _changed: function i(r) {
          i.base.call(this, r), r & 2050 && (this._clipItem = n);
        },
        _getClipItem: function() {
          var i = this._clipItem;
          if (i === n) {
            i = null;
            for (var r = this._children, a = 0, u = r.length; a < u; a++)
              if (r[a]._clipMask) {
                i = r[a];
                break;
              }
            this._clipItem = i;
          }
          return i;
        },
        isClipped: function() {
          return !!this._getClipItem();
        },
        setClipped: function(i) {
          var r = this.getFirstChild();
          r && r.setClipMask(i);
        },
        _getBounds: function i(r, a) {
          var u = this._getClipItem();
          return u ? u._getCachedBounds(
            u._matrix.prepended(r),
            l.set({}, a, { stroke: !1 })
          ) : i.base.call(this, r, a);
        },
        _hitTestChildren: function i(r, a, u) {
          var h = this._getClipItem();
          return (!h || h.contains(r)) && i.base.call(
            this,
            r,
            a,
            u,
            h
          );
        },
        _draw: function(i, r) {
          var a = r.clip, u = !a && this._getClipItem();
          r = r.extend({ clipItem: u, clip: !1 }), a ? (i.beginPath(), r.dontStart = r.dontFinish = !0) : u && u.draw(i, r.extend({ clip: !0 }));
          for (var h = this._children, f = 0, d = h.length; f < d; f++) {
            var c = h[f];
            c !== u && c.draw(i, r);
          }
        }
      }), Ft = At.extend({
        _class: "Layer",
        initialize: function() {
          At.apply(this, arguments);
        },
        _getOwner: function() {
          return this._parent || this._index != null && this._project;
        },
        isInserted: function i() {
          return this._parent ? i.base.call(this) : this._index != null;
        },
        activate: function() {
          this._project._activeLayer = this;
        },
        _hitTestSelf: function() {
        }
      }), zt = ht.extend(
        {
          _class: "Shape",
          _applyMatrix: !1,
          _canApplyMatrix: !1,
          _canScaleStroke: !0,
          _serializeFields: {
            type: null,
            size: null,
            radius: null
          },
          initialize: function(r, a) {
            this._initialize(r, a);
          },
          _equals: function(i) {
            return this._type === i._type && this._size.equals(i._size) && l.equals(this._radius, i._radius);
          },
          copyContent: function(i) {
            this.setType(i._type), this.setSize(i._size), this.setRadius(i._radius);
          },
          getType: function() {
            return this._type;
          },
          setType: function(i) {
            this._type = i;
          },
          getShape: "#getType",
          setShape: "#setType",
          getSize: function() {
            var i = this._size;
            return new It(i.width, i.height, this, "setSize");
          },
          setSize: function() {
            var i = X.read(arguments);
            if (!this._size)
              this._size = i.clone();
            else if (!this._size.equals(i)) {
              var r = this._type, a = i.width, u = i.height;
              r === "rectangle" ? this._radius.set(X.min(this._radius, i.divide(2).abs())) : r === "circle" ? (a = u = (a + u) / 2, this._radius = a / 2) : r === "ellipse" && this._radius._set(a / 2, u / 2), this._size._set(a, u), this._changed(9);
            }
          },
          getRadius: function() {
            var i = this._radius;
            return this._type === "circle" ? i : new It(i.width, i.height, this, "setRadius");
          },
          setRadius: function(i) {
            var r = this._type;
            if (r === "circle") {
              if (i === this._radius)
                return;
              var a = i * 2;
              this._radius = i, this._size._set(a, a);
            } else if (i = X.read(arguments), !this._radius)
              this._radius = i.clone();
            else {
              if (this._radius.equals(i))
                return;
              if (this._radius.set(i), r === "rectangle") {
                var a = X.max(this._size, i.multiply(2));
                this._size.set(a);
              } else r === "ellipse" && this._size._set(i.width * 2, i.height * 2);
            }
            this._changed(9);
          },
          isEmpty: function() {
            return !1;
          },
          toPath: function(i) {
            var r = new Jt[l.capitalize(this._type)]({
              center: new F(),
              size: this._size,
              radius: this._radius,
              insert: !1
            });
            return r.copyAttributes(this), gt.settings.applyMatrix && r.setApplyMatrix(!0), (i === n || i) && r.insertAbove(this), r;
          },
          toShape: "#clone",
          _asPathItem: function() {
            return this.toPath(!1);
          },
          _draw: function(i, r, a, u) {
            var h = this._style, f = h.hasFill(), d = h.hasStroke(), c = r.dontFinish || r.clip, p = !u;
            if (f || d || c) {
              var g = this._type, b = this._radius, S = g === "circle";
              if (r.dontStart || i.beginPath(), p && S)
                i.arc(0, 0, b, 0, Math.PI * 2, !0);
              else {
                var x = S ? b : b.width, y = S ? b : b.height, E = this._size, C = E.width, O = E.height;
                if (p && g === "rectangle" && x === 0 && y === 0)
                  i.rect(-C / 2, -O / 2, C, O);
                else {
                  var w = C / 2, P = O / 2, m = 1 - 0.5522847498307936, I = x * m, T = y * m, M = [
                    -w,
                    -P + y,
                    -w,
                    -P + T,
                    -w + I,
                    -P,
                    -w + x,
                    -P,
                    w - x,
                    -P,
                    w - I,
                    -P,
                    w,
                    -P + T,
                    w,
                    -P + y,
                    w,
                    P - y,
                    w,
                    P - T,
                    w - I,
                    P,
                    w - x,
                    P,
                    -w + x,
                    P,
                    -w + I,
                    P,
                    -w,
                    P - T,
                    -w,
                    P - y
                  ];
                  u && u.transform(M, M, 32), i.moveTo(M[0], M[1]), i.bezierCurveTo(M[2], M[3], M[4], M[5], M[6], M[7]), w !== x && i.lineTo(M[8], M[9]), i.bezierCurveTo(M[10], M[11], M[12], M[13], M[14], M[15]), P !== y && i.lineTo(M[16], M[17]), i.bezierCurveTo(M[18], M[19], M[20], M[21], M[22], M[23]), w !== x && i.lineTo(M[24], M[25]), i.bezierCurveTo(M[26], M[27], M[28], M[29], M[30], M[31]);
                }
              }
              i.closePath();
            }
            !c && (f || d) && (this._setStyles(i, r, a), f && (i.fill(h.getFillRule()), i.shadowColor = "rgba(0,0,0,0)"), d && i.stroke());
          },
          _canComposite: function() {
            return !(this.hasFill() && this.hasStroke());
          },
          _getBounds: function(i, r) {
            var a = new ut(this._size).setCenter(0, 0), u = this._style, h = r.stroke && u.hasStroke() && u.getStrokeWidth();
            return i && (a = i._transformBounds(a)), h ? a.expand(Jt._getStrokePadding(
              h,
              this._getStrokeMatrix(i, r)
            )) : a;
          }
        },
        new function() {
          function i(a, u, h) {
            var f = a._radius;
            if (!f.isZero())
              for (var d = a._size.divide(2), c = 1; c <= 4; c++) {
                var p = new F(c > 1 && c < 4 ? -1 : 1, c > 2 ? -1 : 1), g = p.multiply(d), b = g.subtract(p.multiply(f)), S = new ut(
                  h ? g.add(p.multiply(h)) : g,
                  b
                );
                if (S.contains(u))
                  return { point: b, quadrant: c };
              }
          }
          function r(a, u, h, f) {
            var d = a.divide(u);
            return (!f || d.isInQuadrant(f)) && d.subtract(d.normalize()).multiply(u).divide(h).length <= 1;
          }
          return {
            _contains: function a(u) {
              if (this._type === "rectangle") {
                var h = i(this, u);
                return h ? u.subtract(h.point).divide(this._radius).getLength() <= 1 : a.base.call(this, u);
              } else
                return u.divide(this.size).getLength() <= 0.5;
            },
            _hitTestSelf: function a(u, h, f, d) {
              var c = !1, p = this._style, g = h.stroke && p.hasStroke(), b = h.fill && p.hasFill();
              if (g || b) {
                var S = this._type, x = this._radius, y = g ? p.getStrokeWidth() / 2 : 0, E = h._tolerancePadding.add(
                  Jt._getStrokePadding(
                    y,
                    !p.getStrokeScaling() && d
                  )
                );
                if (S === "rectangle") {
                  var C = E.multiply(2), O = i(this, u, C);
                  if (O)
                    c = r(
                      u.subtract(O.point),
                      x,
                      E,
                      O.quadrant
                    );
                  else {
                    var w = new ut(this._size).setCenter(0, 0), P = w.expand(C), m = w.expand(C.negate());
                    c = P._containsPoint(u) && !m._containsPoint(u);
                  }
                } else
                  c = r(u, x, E);
              }
              return c ? new Oe(g ? "stroke" : "fill", this) : a.base.apply(this, arguments);
            }
          };
        }(),
        {
          statics: new function() {
            function i(r, a, u, h, f) {
              var d = l.create(zt.prototype);
              return d._type = r, d._size = u, d._radius = h, d._initialize(l.getNamed(f), a), d;
            }
            return {
              Circle: function() {
                var r = arguments, a = F.readNamed(r, "center"), u = l.readNamed(r, "radius");
                return i(
                  "circle",
                  a,
                  new X(u * 2),
                  u,
                  r
                );
              },
              Rectangle: function() {
                var r = arguments, a = ut.readNamed(r, "rectangle"), u = X.min(
                  X.readNamed(r, "radius"),
                  a.getSize(!0).divide(2)
                );
                return i(
                  "rectangle",
                  a.getCenter(!0),
                  a.getSize(!0),
                  u,
                  r
                );
              },
              Ellipse: function() {
                var r = arguments, a = zt._readEllipse(r), u = a.radius;
                return i(
                  "ellipse",
                  a.center,
                  u.multiply(2),
                  u,
                  r
                );
              },
              _readEllipse: function(r) {
                var a, u;
                if (l.hasNamed(r, "radius"))
                  a = F.readNamed(r, "center"), u = X.readNamed(r, "radius");
                else {
                  var h = ut.readNamed(r, "rectangle");
                  a = h.getCenter(!0), u = h.getSize(!0).divide(2);
                }
                return { center: a, radius: u };
              }
            };
          }()
        }
      ), me = ht.extend({
        _class: "Raster",
        _applyMatrix: !1,
        _canApplyMatrix: !1,
        _boundsOptions: { stroke: !1, handle: !1 },
        _serializeFields: {
          crossOrigin: null,
          source: null
        },
        _prioritize: ["crossOrigin"],
        _smoothing: "low",
        beans: !0,
        initialize: function(r, a) {
          if (!this._initialize(
            r,
            a !== n && F.read(arguments)
          )) {
            var u, h = typeof r, f = h === "string" ? o.getElementById(r) : h === "object" ? r : null;
            if (f && f !== ht.NO_INSERT) {
              if (f.getContext || f.naturalHeight != null)
                u = f;
              else if (f) {
                var d = X.read(arguments);
                d.isZero() || (u = st.getCanvas(d));
              }
            }
            u ? this.setImage(u) : this.setSource(r);
          }
          this._size || (this._size = new X(), this._loaded = !1);
        },
        _equals: function(i) {
          return this.getSource() === i.getSource();
        },
        copyContent: function(i) {
          var r = i._image, a = i._canvas;
          if (r)
            this._setImage(r);
          else if (a) {
            var u = st.getCanvas(i._size);
            u.getContext("2d").drawImage(a, 0, 0), this._setImage(u);
          }
          this._crossOrigin = i._crossOrigin;
        },
        getSize: function() {
          var i = this._size;
          return new It(
            i ? i.width : 0,
            i ? i.height : 0,
            this,
            "setSize"
          );
        },
        setSize: function(i, r) {
          var a = X.read(arguments);
          if (a.equals(this._size))
            r && this.clear();
          else if (a.width > 0 && a.height > 0) {
            var u = !r && this.getElement();
            this._setImage(st.getCanvas(a)), u && this.getContext(!0).drawImage(
              u,
              0,
              0,
              a.width,
              a.height
            );
          } else
            this._canvas && st.release(this._canvas), this._size = a.clone();
        },
        getWidth: function() {
          return this._size ? this._size.width : 0;
        },
        setWidth: function(i) {
          this.setSize(i, this.getHeight());
        },
        getHeight: function() {
          return this._size ? this._size.height : 0;
        },
        setHeight: function(i) {
          this.setSize(this.getWidth(), i);
        },
        getLoaded: function() {
          return this._loaded;
        },
        isEmpty: function() {
          var i = this._size;
          return !i || i.width === 0 && i.height === 0;
        },
        getResolution: function() {
          var i = this._matrix, r = new F(0, 0).transform(i), a = new F(1, 0).transform(i).subtract(r), u = new F(0, 1).transform(i).subtract(r);
          return new X(
            72 / a.getLength(),
            72 / u.getLength()
          );
        },
        getPpi: "#getResolution",
        getImage: function() {
          return this._image;
        },
        setImage: function(i) {
          var r = this;
          function a(u) {
            var h = r.getView(), f = u && u.type || "load";
            h && r.responds(f) && (gt = h._scope, r.emit(f, new K(u)));
          }
          this._setImage(i), this._loaded ? setTimeout(a, 0) : i && xe.add(i, {
            load: function(u) {
              r._setImage(i), a(u);
            },
            error: a
          });
        },
        _setImage: function(i) {
          this._canvas && st.release(this._canvas), i && i.getContext ? (this._image = null, this._canvas = i, this._loaded = !0) : (this._image = i, this._canvas = null, this._loaded = !!(i && i.src && i.complete)), this._size = new X(
            i ? i.naturalWidth || i.width : 0,
            i ? i.naturalHeight || i.height : 0
          ), this._context = null, this._changed(1033);
        },
        getCanvas: function() {
          if (!this._canvas) {
            var i = st.getContext(this._size);
            try {
              this._image && i.drawImage(this._image, 0, 0), this._canvas = i.canvas;
            } catch {
              st.release(i);
            }
          }
          return this._canvas;
        },
        setCanvas: "#setImage",
        getContext: function(i) {
          return this._context || (this._context = this.getCanvas().getContext("2d")), i && (this._image = null, this._changed(1025)), this._context;
        },
        setContext: function(i) {
          this._context = i;
        },
        getSource: function() {
          var i = this._image;
          return i && i.src || this.toDataURL();
        },
        setSource: function(i) {
          var r = new e.Image(), a = this._crossOrigin;
          a && (r.crossOrigin = a), i && (r.src = i), this.setImage(r);
        },
        getCrossOrigin: function() {
          var i = this._image;
          return i && i.crossOrigin || this._crossOrigin || "";
        },
        setCrossOrigin: function(i) {
          this._crossOrigin = i;
          var r = this._image;
          r && (r.crossOrigin = i);
        },
        getSmoothing: function() {
          return this._smoothing;
        },
        setSmoothing: function(i) {
          this._smoothing = typeof i == "string" ? i : i ? "low" : "off", this._changed(257);
        },
        getElement: function() {
          return this._canvas || this._loaded && this._image;
        }
      }, {
        beans: !1,
        getSubCanvas: function() {
          var i = ut.read(arguments), r = st.getContext(i.getSize());
          return r.drawImage(
            this.getCanvas(),
            i.x,
            i.y,
            i.width,
            i.height,
            0,
            0,
            i.width,
            i.height
          ), r.canvas;
        },
        getSubRaster: function() {
          var i = ut.read(arguments), r = new me(ht.NO_INSERT);
          return r._setImage(this.getSubCanvas(i)), r.translate(i.getCenter().subtract(this.getSize().divide(2))), r._matrix.prepend(this._matrix), r.insertAbove(this), r;
        },
        toDataURL: function() {
          var i = this._image, r = i && i.src;
          if (/^data:/.test(r))
            return r;
          var a = this.getCanvas();
          return a ? a.toDataURL.apply(a, arguments) : null;
        },
        drawImage: function(i) {
          var r = F.read(arguments, 1);
          this.getContext(!0).drawImage(i, r.x, r.y);
        },
        getAverageColor: function(i) {
          var r, a;
          if (i ? i instanceof ue ? (a = i, r = i.getBounds()) : typeof i == "object" && ("width" in i ? r = new ut(i) : "x" in i && (r = new ut(i.x - 0.5, i.y - 0.5, 1, 1))) : r = this.getBounds(), !r)
            return null;
          var u = 32, h = Math.min(r.width, u), f = Math.min(r.height, u), d = me._sampleContext;
          d ? d.clearRect(0, 0, u + 1, u + 1) : d = me._sampleContext = st.getContext(
            new X(u)
          ), d.save();
          var c = new Pt().scale(h / r.width, f / r.height).translate(-r.x, -r.y);
          c.applyToContext(d), a && a.draw(d, new l({ clip: !0, matrices: [c] })), this._matrix.applyToContext(d);
          var p = this.getElement(), g = this._size;
          p && d.drawImage(p, -g.width / 2, -g.height / 2), d.restore();
          for (var b = d.getImageData(
            0.5,
            0.5,
            Math.ceil(h),
            Math.ceil(f)
          ).data, S = [0, 0, 0], x = 0, y = 0, E = b.length; y < E; y += 4) {
            var C = b[y + 3];
            x += C, C /= 255, S[0] += b[y] * C, S[1] += b[y + 1] * C, S[2] += b[y + 2] * C;
          }
          for (var y = 0; y < 3; y++)
            S[y] /= x;
          return x ? Me.read(S) : null;
        },
        getPixel: function() {
          var i = F.read(arguments), r = this.getContext().getImageData(i.x, i.y, 1, 1).data;
          return new Me(
            "rgb",
            [r[0] / 255, r[1] / 255, r[2] / 255],
            r[3] / 255
          );
        },
        setPixel: function() {
          var i = arguments, r = F.read(i), a = Me.read(i), u = a._convert("rgb"), h = a._alpha, f = this.getContext(!0), d = f.createImageData(1, 1), c = d.data;
          c[0] = u[0] * 255, c[1] = u[1] * 255, c[2] = u[2] * 255, c[3] = h != null ? h * 255 : 255, f.putImageData(d, r.x, r.y);
        },
        clear: function() {
          var i = this._size;
          this.getContext(!0).clearRect(0, 0, i.width + 1, i.height + 1);
        },
        createImageData: function() {
          var i = X.read(arguments);
          return this.getContext().createImageData(i.width, i.height);
        },
        getImageData: function() {
          var i = ut.read(arguments);
          return i.isEmpty() && (i = new ut(this._size)), this.getContext().getImageData(
            i.x,
            i.y,
            i.width,
            i.height
          );
        },
        putImageData: function(i) {
          var r = F.read(arguments, 1);
          this.getContext(!0).putImageData(i, r.x, r.y);
        },
        setImageData: function(i) {
          this.setSize(i), this.getContext(!0).putImageData(i, 0, 0);
        },
        _getBounds: function(i, r) {
          var a = new ut(this._size).setCenter(0, 0);
          return i ? i._transformBounds(a) : a;
        },
        _hitTestSelf: function(i) {
          if (this._contains(i)) {
            var r = this;
            return new Oe("pixel", r, {
              offset: i.add(r._size.divide(2)).round(),
              color: {
                get: function() {
                  return r.getPixel(this.offset);
                }
              }
            });
          }
        },
        _draw: function(i, r, a) {
          var u = this.getElement();
          if (u && u.width > 0 && u.height > 0) {
            i.globalAlpha = q.clamp(this._opacity, 0, 1), this._setStyles(i, r, a);
            var h = this._smoothing, f = h === "off";
            Ce.setPrefixed(
              i,
              f ? "imageSmoothingEnabled" : "imageSmoothingQuality",
              f ? !1 : h
            ), i.drawImage(
              u,
              -this._size.width / 2,
              -this._size.height / 2
            );
          }
        },
        _canComposite: function() {
          return !0;
        }
      }), Te = ht.extend({
        _class: "SymbolItem",
        _applyMatrix: !1,
        _canApplyMatrix: !1,
        _boundsOptions: { stroke: !0 },
        _serializeFields: {
          symbol: null
        },
        initialize: function(r, a) {
          this._initialize(
            r,
            a !== n && F.read(arguments, 1)
          ) || this.setDefinition(r instanceof Fe ? r : new Fe(r));
        },
        _equals: function(i) {
          return this._definition === i._definition;
        },
        copyContent: function(i) {
          this.setDefinition(i._definition);
        },
        getDefinition: function() {
          return this._definition;
        },
        setDefinition: function(i) {
          this._definition = i, this._changed(9);
        },
        getSymbol: "#getDefinition",
        setSymbol: "#setDefinition",
        isEmpty: function() {
          return this._definition._item.isEmpty();
        },
        _getBounds: function(i, r) {
          var a = this._definition._item;
          return a._getCachedBounds(a._matrix.prepended(i), r);
        },
        _hitTestSelf: function(i, r, a) {
          var u = r.extend({ all: !1 }), h = this._definition._item._hitTest(i, u, a);
          return h && (h.item = this), h;
        },
        _draw: function(i, r) {
          this._definition._item.draw(i, r);
        }
      }), Fe = l.extend({
        _class: "SymbolDefinition",
        initialize: function(r, a) {
          this._id = tt.get(), this.project = gt.project, r && this.setItem(r, a);
        },
        _serialize: function(i, r) {
          return r.add(this, function() {
            return l.serialize(
              [this._class, this._item],
              i,
              !1,
              r
            );
          });
        },
        _changed: function(i) {
          i & 8 && ht._clearBoundsCache(this), i & 1 && this.project._changed(i);
        },
        getItem: function() {
          return this._item;
        },
        setItem: function(i, r) {
          i._symbol && (i = i.clone()), this._item && (this._item._symbol = null), this._item = i, i.remove(), i.setSelected(!1), r || i.setPosition(new F()), i._symbol = this, this._changed(9);
        },
        getDefinition: "#getItem",
        setDefinition: "#setItem",
        place: function(i) {
          return new Te(this, i);
        },
        clone: function() {
          return new Fe(this._item.clone(!1));
        },
        equals: function(i) {
          return i === this || i && this._item.equals(i._item) || !1;
        }
      }), Oe = l.extend({
        _class: "HitResult",
        initialize: function(r, a, u) {
          this.type = r, this.item = a, u && this.inject(u);
        },
        statics: {
          getOptions: function(i) {
            var r = i && l.read(i);
            return new l({
              type: null,
              tolerance: gt.settings.hitTolerance,
              fill: !r,
              stroke: !r,
              segments: !r,
              handles: !1,
              ends: !1,
              position: !1,
              center: !1,
              bounds: !1,
              guides: !1,
              selected: !1
            }, r);
          }
        }
      }), Tt = l.extend({
        _class: "Segment",
        beans: !0,
        _selection: 0,
        initialize: function(r, a, u, h, f, d) {
          var c = arguments.length, p, g, b, S;
          c > 0 && (r == null || typeof r == "object" ? c === 1 && r && "point" in r ? (p = r.point, g = r.handleIn, b = r.handleOut, S = r.selection) : (p = r, g = a, b = u, S = h) : (p = [r, a], g = u !== n ? [u, h] : null, b = f !== n ? [f, d] : null)), new fn(p, this, "_point"), new fn(g, this, "_handleIn"), new fn(b, this, "_handleOut"), S && this.setSelection(S);
        },
        _serialize: function(i, r) {
          var a = this._point, u = this._selection, h = u || this.hasHandles() ? [a, this._handleIn, this._handleOut] : a;
          return u && h.push(u), l.serialize(h, i, !0, r);
        },
        _changed: function(i) {
          var r = this._path;
          if (r) {
            var a = r._curves, u = this._index, h;
            a && ((!i || i === this._point || i === this._handleIn) && (h = u > 0 ? a[u - 1] : r._closed ? a[a.length - 1] : null) && h._changed(), (!i || i === this._point || i === this._handleOut) && (h = a[u]) && h._changed()), r._changed(41);
          }
        },
        getPoint: function() {
          return this._point;
        },
        setPoint: function() {
          this._point.set(F.read(arguments));
        },
        getHandleIn: function() {
          return this._handleIn;
        },
        setHandleIn: function() {
          this._handleIn.set(F.read(arguments));
        },
        getHandleOut: function() {
          return this._handleOut;
        },
        setHandleOut: function() {
          this._handleOut.set(F.read(arguments));
        },
        hasHandles: function() {
          return !this._handleIn.isZero() || !this._handleOut.isZero();
        },
        isSmooth: function() {
          var i = this._handleIn, r = this._handleOut;
          return !i.isZero() && !r.isZero() && i.isCollinear(r);
        },
        clearHandles: function() {
          this._handleIn._set(0, 0), this._handleOut._set(0, 0);
        },
        getSelection: function() {
          return this._selection;
        },
        setSelection: function(i) {
          var r = this._selection, a = this._path;
          this._selection = i = i || 0, a && i !== r && (a._updateSelection(this, r, i), a._changed(257));
        },
        _changeSelection: function(i, r) {
          var a = this._selection;
          this.setSelection(r ? a | i : a & ~i);
        },
        isSelected: function() {
          return !!(this._selection & 7);
        },
        setSelected: function(i) {
          this._changeSelection(7, i);
        },
        getIndex: function() {
          return this._index !== n ? this._index : null;
        },
        getPath: function() {
          return this._path || null;
        },
        getCurve: function() {
          var i = this._path, r = this._index;
          return i ? (r > 0 && !i._closed && r === i._segments.length - 1 && r--, i.getCurves()[r] || null) : null;
        },
        getLocation: function() {
          var i = this.getCurve();
          return i ? new Ut(i, this === i._segment1 ? 0 : 1) : null;
        },
        getNext: function() {
          var i = this._path && this._path._segments;
          return i && (i[this._index + 1] || this._path._closed && i[0]) || null;
        },
        smooth: function(i, r, a) {
          var u = i || {}, h = u.type, f = u.factor, d = this.getPrevious(), c = this.getNext(), p = (d || this)._point, g = this._point, b = (c || this)._point, S = p.getDistance(g), x = g.getDistance(b);
          if (!h || h === "catmull-rom") {
            var y = f === n ? 0.5 : f, E = Math.pow(S, y), C = E * E, O = Math.pow(x, y), w = O * O;
            if (!r && d) {
              var P = 2 * w + 3 * O * E + C, m = 3 * O * (O + E);
              this.setHandleIn(m !== 0 ? new F(
                (w * p._x + P * g._x - C * b._x) / m - g._x,
                (w * p._y + P * g._y - C * b._y) / m - g._y
              ) : new F());
            }
            if (!a && c) {
              var P = 2 * C + 3 * E * O + w, m = 3 * E * (E + O);
              this.setHandleOut(m !== 0 ? new F(
                (C * b._x + P * g._x - w * p._x) / m - g._x,
                (C * b._y + P * g._y - w * p._y) / m - g._y
              ) : new F());
            }
          } else if (h === "geometric") {
            if (d && c) {
              var I = p.subtract(b), T = f === n ? 0.4 : f, M = T * S / (S + x);
              r || this.setHandleIn(I.multiply(M)), a || this.setHandleOut(I.multiply(M - T));
            }
          } else
            throw new Error("Smoothing method '" + h + "' not supported.");
        },
        getPrevious: function() {
          var i = this._path && this._path._segments;
          return i && (i[this._index - 1] || this._path._closed && i[i.length - 1]) || null;
        },
        isFirst: function() {
          return !this._index;
        },
        isLast: function() {
          var i = this._path;
          return i && this._index === i._segments.length - 1 || !1;
        },
        reverse: function() {
          var i = this._handleIn, r = this._handleOut, a = i.clone();
          i.set(r), r.set(a);
        },
        reversed: function() {
          return new Tt(this._point, this._handleOut, this._handleIn);
        },
        remove: function() {
          return this._path ? !!this._path.removeSegment(this._index) : !1;
        },
        clone: function() {
          return new Tt(this._point, this._handleIn, this._handleOut);
        },
        equals: function(i) {
          return i === this || i && this._class === i._class && this._point.equals(i._point) && this._handleIn.equals(i._handleIn) && this._handleOut.equals(i._handleOut) || !1;
        },
        toString: function() {
          var i = ["point: " + this._point];
          return this._handleIn.isZero() || i.push("handleIn: " + this._handleIn), this._handleOut.isZero() || i.push("handleOut: " + this._handleOut), "{ " + i.join(", ") + " }";
        },
        transform: function(i) {
          this._transformCoordinates(i, new Array(6), !0), this._changed();
        },
        interpolate: function(i, r, a) {
          var u = 1 - a, h = a, f = i._point, d = r._point, c = i._handleIn, p = r._handleIn, g = r._handleOut, b = i._handleOut;
          this._point._set(
            u * f._x + h * d._x,
            u * f._y + h * d._y,
            !0
          ), this._handleIn._set(
            u * c._x + h * p._x,
            u * c._y + h * p._y,
            !0
          ), this._handleOut._set(
            u * b._x + h * g._x,
            u * b._y + h * g._y,
            !0
          ), this._changed();
        },
        _transformCoordinates: function(i, r, a) {
          var u = this._point, h = !a || !this._handleIn.isZero() ? this._handleIn : null, f = !a || !this._handleOut.isZero() ? this._handleOut : null, d = u._x, c = u._y, p = 2;
          return r[0] = d, r[1] = c, h && (r[p++] = h._x + d, r[p++] = h._y + c), f && (r[p++] = f._x + d, r[p++] = f._y + c), i && (i._transformCoordinates(r, r, p / 2), d = r[0], c = r[1], a ? (u._x = d, u._y = c, p = 2, h && (h._x = r[p++] - d, h._y = r[p++] - c), f && (f._x = r[p++] - d, f._y = r[p++] - c)) : (h || (r[p++] = d, r[p++] = c), f || (r[p++] = d, r[p++] = c))), r;
        }
      }), fn = F.extend({
        initialize: function(r, a, u) {
          var h, f, d;
          if (!r)
            h = f = 0;
          else if ((h = r[0]) !== n)
            f = r[1];
          else {
            var c = r;
            (h = c.x) === n && (c = F.read(arguments), h = c.x), f = c.y, d = c.selected;
          }
          this._x = h, this._y = f, this._owner = a, a[u] = this, d && this.setSelected(!0);
        },
        _set: function(i, r) {
          return this._x = i, this._y = r, this._owner._changed(this), this;
        },
        getX: function() {
          return this._x;
        },
        setX: function(i) {
          this._x = i, this._owner._changed(this);
        },
        getY: function() {
          return this._y;
        },
        setY: function(i) {
          this._y = i, this._owner._changed(this);
        },
        isZero: function() {
          var i = q.isZero;
          return i(this._x) && i(this._y);
        },
        isSelected: function() {
          return !!(this._owner._selection & this._getSelection());
        },
        setSelected: function(i) {
          this._owner._changeSelection(this._getSelection(), i);
        },
        _getSelection: function() {
          var i = this._owner;
          return this === i._point ? 1 : this === i._handleIn ? 2 : this === i._handleOut ? 4 : 0;
        }
      }), ot = l.extend(
        {
          _class: "Curve",
          beans: !0,
          initialize: function(r, a, u, h, f, d, c, p) {
            var g = arguments.length, b, S, x, y, E, C;
            g === 3 ? (this._path = r, b = a, S = u) : g ? g === 1 ? "segment1" in r ? (b = new Tt(r.segment1), S = new Tt(r.segment2)) : "point1" in r ? (x = r.point1, E = r.handle1, C = r.handle2, y = r.point2) : Array.isArray(r) && (x = [r[0], r[1]], y = [r[6], r[7]], E = [r[2] - r[0], r[3] - r[1]], C = [r[4] - r[6], r[5] - r[7]]) : g === 2 ? (b = new Tt(r), S = new Tt(a)) : g === 4 ? (x = r, E = a, C = u, y = h) : g === 8 && (x = [r, a], y = [c, p], E = [u - r, h - a], C = [f - c, d - p]) : (b = new Tt(), S = new Tt()), this._segment1 = b || new Tt(x, null, E), this._segment2 = S || new Tt(y, C, null);
          },
          _serialize: function(i, r) {
            return l.serialize(
              this.hasHandles() ? [
                this.getPoint1(),
                this.getHandle1(),
                this.getHandle2(),
                this.getPoint2()
              ] : [this.getPoint1(), this.getPoint2()],
              i,
              !0,
              r
            );
          },
          _changed: function() {
            this._length = this._bounds = n;
          },
          clone: function() {
            return new ot(this._segment1, this._segment2);
          },
          toString: function() {
            var i = ["point1: " + this._segment1._point];
            return this._segment1._handleOut.isZero() || i.push("handle1: " + this._segment1._handleOut), this._segment2._handleIn.isZero() || i.push("handle2: " + this._segment2._handleIn), i.push("point2: " + this._segment2._point), "{ " + i.join(", ") + " }";
          },
          classify: function() {
            return ot.classify(this.getValues());
          },
          remove: function() {
            var i = !1;
            if (this._path) {
              var r = this._segment2, a = r._handleOut;
              i = r.remove(), i && this._segment1._handleOut.set(a);
            }
            return i;
          },
          getPoint1: function() {
            return this._segment1._point;
          },
          setPoint1: function() {
            this._segment1._point.set(F.read(arguments));
          },
          getPoint2: function() {
            return this._segment2._point;
          },
          setPoint2: function() {
            this._segment2._point.set(F.read(arguments));
          },
          getHandle1: function() {
            return this._segment1._handleOut;
          },
          setHandle1: function() {
            this._segment1._handleOut.set(F.read(arguments));
          },
          getHandle2: function() {
            return this._segment2._handleIn;
          },
          setHandle2: function() {
            this._segment2._handleIn.set(F.read(arguments));
          },
          getSegment1: function() {
            return this._segment1;
          },
          getSegment2: function() {
            return this._segment2;
          },
          getPath: function() {
            return this._path;
          },
          getIndex: function() {
            return this._segment1._index;
          },
          getNext: function() {
            var i = this._path && this._path._curves;
            return i && (i[this._segment1._index + 1] || this._path._closed && i[0]) || null;
          },
          getPrevious: function() {
            var i = this._path && this._path._curves;
            return i && (i[this._segment1._index - 1] || this._path._closed && i[i.length - 1]) || null;
          },
          isFirst: function() {
            return !this._segment1._index;
          },
          isLast: function() {
            var i = this._path;
            return i && this._segment1._index === i._curves.length - 1 || !1;
          },
          isSelected: function() {
            return this.getPoint1().isSelected() && this.getHandle1().isSelected() && this.getHandle2().isSelected() && this.getPoint2().isSelected();
          },
          setSelected: function(i) {
            this.getPoint1().setSelected(i), this.getHandle1().setSelected(i), this.getHandle2().setSelected(i), this.getPoint2().setSelected(i);
          },
          getValues: function(i) {
            return ot.getValues(this._segment1, this._segment2, i);
          },
          getPoints: function() {
            for (var i = this.getValues(), r = [], a = 0; a < 8; a += 2)
              r.push(new F(i[a], i[a + 1]));
            return r;
          }
        },
        {
          getLength: function() {
            return this._length == null && (this._length = ot.getLength(this.getValues(), 0, 1)), this._length;
          },
          getArea: function() {
            return ot.getArea(this.getValues());
          },
          getLine: function() {
            return new xt(this._segment1._point, this._segment2._point);
          },
          getPart: function(i, r) {
            return new ot(ot.getPart(this.getValues(), i, r));
          },
          getPartLength: function(i, r) {
            return ot.getLength(this.getValues(), i, r);
          },
          divideAt: function(i) {
            return this.divideAtTime(i && i.curve === this ? i.time : this.getTimeAt(i));
          },
          divideAtTime: function(i, r) {
            var a = 1e-8, u = 1 - a, h = null;
            if (i >= a && i <= u) {
              var f = ot.subdivide(this.getValues(), i), d = f[0], c = f[1], p = r || this.hasHandles(), g = this._segment1, b = this._segment2, S = this._path;
              p && (g._handleOut._set(d[2] - d[0], d[3] - d[1]), b._handleIn._set(c[4] - c[6], c[5] - c[7]));
              var x = d[6], y = d[7], E = new Tt(
                new F(x, y),
                p && new F(d[4] - x, d[5] - y),
                p && new F(c[2] - x, c[3] - y)
              );
              S ? (S.insert(g._index + 1, E), h = this.getNext()) : (this._segment2 = E, this._changed(), h = new ot(E, b));
            }
            return h;
          },
          splitAt: function(i) {
            var r = this._path;
            return r ? r.splitAt(i) : null;
          },
          splitAtTime: function(i) {
            return this.splitAt(this.getLocationAtTime(i));
          },
          divide: function(i, r) {
            return this.divideAtTime(i === n ? 0.5 : r ? i : this.getTimeAt(i));
          },
          split: function(i, r) {
            return this.splitAtTime(i === n ? 0.5 : r ? i : this.getTimeAt(i));
          },
          reversed: function() {
            return new ot(this._segment2.reversed(), this._segment1.reversed());
          },
          clearHandles: function() {
            this._segment1._handleOut._set(0, 0), this._segment2._handleIn._set(0, 0);
          },
          statics: {
            getValues: function(i, r, a, u) {
              var h = i._point, f = i._handleOut, d = r._handleIn, c = r._point, p = h.x, g = h.y, b = c.x, S = c.y, x = u ? [p, g, p, g, b, S, b, S] : [
                p,
                g,
                p + f._x,
                g + f._y,
                b + d._x,
                S + d._y,
                b,
                S
              ];
              return a && a._transformCoordinates(x, x, 4), x;
            },
            subdivide: function(i, r) {
              var a = i[0], u = i[1], h = i[2], f = i[3], d = i[4], c = i[5], p = i[6], g = i[7];
              r === n && (r = 0.5);
              var b = 1 - r, S = b * a + r * h, x = b * u + r * f, y = b * h + r * d, E = b * f + r * c, C = b * d + r * p, O = b * c + r * g, w = b * S + r * y, P = b * x + r * E, m = b * y + r * C, I = b * E + r * O, T = b * w + r * m, M = b * P + r * I;
              return [
                [a, u, S, x, w, P, T, M],
                [T, M, m, I, C, O, p, g]
              ];
            },
            getMonoCurves: function(i, r) {
              var a = [], u = r ? 0 : 1, h = i[u + 0], f = i[u + 2], d = i[u + 4], c = i[u + 6];
              if (h >= f == f >= d && f >= d == d >= c || ot.isStraight(i))
                a.push(i);
              else {
                var p = 3 * (f - d) - h + c, g = 2 * (h + d) - 4 * f, b = f - h, S = 1e-8, x = 1 - S, y = [], E = q.solveQuadratic(p, g, b, y, S, x);
                if (!E)
                  a.push(i);
                else {
                  y.sort();
                  var C = y[0], O = ot.subdivide(i, C);
                  a.push(O[0]), E > 1 && (C = (y[1] - C) / (1 - C), O = ot.subdivide(O[1], C), a.push(O[0])), a.push(O[1]);
                }
              }
              return a;
            },
            solveCubic: function(i, r, a, u, h, f) {
              var d = i[r], c = i[r + 2], p = i[r + 4], g = i[r + 6], b = 0;
              if (!(d < a && g < a && c < a && p < a || d > a && g > a && c > a && p > a)) {
                var S = 3 * (c - d), x = 3 * (p - c) - S, y = g - d - S - x;
                b = q.solveCubic(y, x, S, d - a, u, h, f);
              }
              return b;
            },
            getTimeOf: function(i, r) {
              var a = new F(i[0], i[1]), u = new F(i[6], i[7]), h = 1e-12, f = 1e-7, d = r.isClose(a, h) ? 0 : r.isClose(u, h) ? 1 : null;
              if (d === null)
                for (var c = [r.x, r.y], p = [], g = 0; g < 2; g++)
                  for (var b = ot.solveCubic(i, g, c[g], p, 0, 1), S = 0; S < b; S++) {
                    var x = p[S];
                    if (r.isClose(ot.getPoint(i, x), f))
                      return x;
                  }
              return r.isClose(a, f) ? 0 : r.isClose(u, f) ? 1 : null;
            },
            getNearestTime: function(i, r) {
              if (ot.isStraight(i)) {
                var a = i[0], u = i[1], h = i[6], f = i[7], d = h - a, c = f - u, p = d * d + c * c;
                if (p === 0)
                  return 0;
                var g = ((r.x - a) * d + (r.y - u) * c) / p;
                return g < 1e-12 ? 0 : g > 0.999999999999 ? 1 : ot.getTimeOf(
                  i,
                  new F(a + g * d, u + g * c)
                );
              }
              var b = 100, S = 1 / 0, x = 0;
              function y(O) {
                if (O >= 0 && O <= 1) {
                  var w = r.getDistance(ot.getPoint(i, O), !0);
                  if (w < S)
                    return S = w, x = O, !0;
                }
              }
              for (var E = 0; E <= b; E++)
                y(E / b);
              for (var C = 1 / (b * 2); C > 1e-8; )
                !y(x - C) && !y(x + C) && (C /= 2);
              return x;
            },
            getPart: function(i, r, a) {
              var u = r > a;
              if (u) {
                var h = r;
                r = a, a = h;
              }
              return r > 0 && (i = ot.subdivide(i, r)[1]), a < 1 && (i = ot.subdivide(i, (a - r) / (1 - r))[0]), u ? [i[6], i[7], i[4], i[5], i[2], i[3], i[0], i[1]] : i;
            },
            isFlatEnough: function(i, r) {
              var a = i[0], u = i[1], h = i[2], f = i[3], d = i[4], c = i[5], p = i[6], g = i[7], b = 3 * h - 2 * a - p, S = 3 * f - 2 * u - g, x = 3 * d - 2 * p - a, y = 3 * c - 2 * g - u;
              return Math.max(b * b, x * x) + Math.max(S * S, y * y) <= 16 * r * r;
            },
            getArea: function(i) {
              var r = i[0], a = i[1], u = i[2], h = i[3], f = i[4], d = i[5], c = i[6], p = i[7];
              return 3 * ((p - a) * (u + f) - (c - r) * (h + d) + h * (r - f) - u * (a - d) + p * (f + r / 3) - c * (d + a / 3)) / 20;
            },
            getBounds: function(i) {
              for (var r = i.slice(0, 2), a = r.slice(), u = [0, 0], h = 0; h < 2; h++)
                ot._addBounds(
                  i[h],
                  i[h + 2],
                  i[h + 4],
                  i[h + 6],
                  h,
                  0,
                  r,
                  a,
                  u
                );
              return new ut(r[0], r[1], a[0] - r[0], a[1] - r[1]);
            },
            _addBounds: function(i, r, a, u, h, f, d, c, p) {
              function g(T, M) {
                var A = T - M, R = T + M;
                A < d[h] && (d[h] = A), R > c[h] && (c[h] = R);
              }
              f /= 2;
              var b = d[h] + f, S = c[h] - f;
              if (i < b || r < b || a < b || u < b || i > S || r > S || a > S || u > S)
                if (r < i != r < u && a < i != a < u)
                  g(i, 0), g(u, 0);
                else {
                  var x = 3 * (r - a) - i + u, y = 2 * (i + a) - 4 * r, E = r - i, C = q.solveQuadratic(x, y, E, p), O = 1e-8, w = 1 - O;
                  g(u, 0);
                  for (var P = 0; P < C; P++) {
                    var m = p[P], I = 1 - m;
                    O <= m && m <= w && g(
                      I * I * I * i + 3 * I * I * m * r + 3 * I * m * m * a + m * m * m * u,
                      f
                    );
                  }
                }
            }
          }
        },
        l.each(
          ["getBounds", "getStrokeBounds", "getHandleBounds"],
          function(i) {
            this[i] = function() {
              this._bounds || (this._bounds = {});
              var r = this._bounds[i];
              return r || (r = this._bounds[i] = Jt[i](
                [this._segment1, this._segment2],
                !1,
                this._path
              )), r.clone();
            };
          },
          {}
        ),
        l.each({
          isStraight: function(i, r, a, u) {
            if (r.isZero() && a.isZero())
              return !0;
            var h = u.subtract(i);
            if (h.isZero())
              return !1;
            if (h.isCollinear(r) && h.isCollinear(a)) {
              var f = new xt(i, u), d = 1e-7;
              if (f.getDistance(i.add(r)) < d && f.getDistance(u.add(a)) < d) {
                var c = h.dot(h), p = h.dot(r) / c, g = h.dot(a) / c;
                return p >= 0 && p <= 1 && g <= 0 && g >= -1;
              }
            }
            return !1;
          },
          isLinear: function(i, r, a, u) {
            var h = u.subtract(i).divide(3);
            return r.equals(h) && a.negate().equals(h);
          }
        }, function(i, r) {
          this[r] = function(a) {
            var u = this._segment1, h = this._segment2;
            return i(
              u._point,
              u._handleOut,
              h._handleIn,
              h._point,
              a
            );
          }, this.statics[r] = function(a, u) {
            var h = a[0], f = a[1], d = a[6], c = a[7];
            return i(
              new F(h, f),
              new F(a[2] - h, a[3] - f),
              new F(a[4] - d, a[5] - c),
              new F(d, c),
              u
            );
          };
        }, {
          statics: {},
          hasHandles: function() {
            return !this._segment1._handleOut.isZero() || !this._segment2._handleIn.isZero();
          },
          hasLength: function(i) {
            return (!this.getPoint1().equals(this.getPoint2()) || this.hasHandles()) && this.getLength() > (i || 0);
          },
          isCollinear: function(i) {
            return i && this.isStraight() && i.isStraight() && this.getLine().isCollinear(i.getLine());
          },
          isHorizontal: function() {
            return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).y) < 1e-8;
          },
          isVertical: function() {
            return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).x) < 1e-8;
          }
        }),
        {
          beans: !1,
          getLocationAt: function(i, r) {
            return this.getLocationAtTime(
              r ? i : this.getTimeAt(i)
            );
          },
          getLocationAtTime: function(i) {
            return i != null && i >= 0 && i <= 1 ? new Ut(this, i) : null;
          },
          getTimeAt: function(i, r) {
            return ot.getTimeAt(this.getValues(), i, r);
          },
          getParameterAt: "#getTimeAt",
          getTimesWithTangent: function() {
            var i = F.read(arguments);
            return i.isZero() ? [] : ot.getTimesWithTangent(this.getValues(), i);
          },
          getOffsetAtTime: function(i) {
            return this.getPartLength(0, i);
          },
          getLocationOf: function() {
            return this.getLocationAtTime(this.getTimeOf(F.read(arguments)));
          },
          getOffsetOf: function() {
            var i = this.getLocationOf.apply(this, arguments);
            return i ? i.getOffset() : null;
          },
          getTimeOf: function() {
            return ot.getTimeOf(this.getValues(), F.read(arguments));
          },
          getParameterOf: "#getTimeOf",
          getNearestLocation: function() {
            var i = F.read(arguments), r = this.getValues(), a = ot.getNearestTime(r, i), u = ot.getPoint(r, a);
            return new Ut(this, a, u, null, i.getDistance(u));
          },
          getNearestPoint: function() {
            var i = this.getNearestLocation.apply(this, arguments);
            return i && i.getPoint();
          }
        },
        new function() {
          var i = [
            "getPoint",
            "getTangent",
            "getNormal",
            "getWeightedTangent",
            "getWeightedNormal",
            "getCurvature"
          ];
          return l.each(
            i,
            function(r) {
              this[r + "At"] = function(a, u) {
                var h = this.getValues();
                return ot[r](h, u ? a : ot.getTimeAt(h, a));
              }, this[r + "AtTime"] = function(a) {
                return ot[r](this.getValues(), a);
              };
            },
            {
              statics: {
                _evaluateMethods: i
              }
            }
          );
        }(),
        new function() {
          function i(u) {
            var h = u[0], f = u[1], d = u[2], c = u[3], p = u[4], g = u[5], b = u[6], S = u[7], x = 9 * (d - p) + 3 * (b - h), y = 6 * (h + p) - 12 * d, E = 3 * (d - h), C = 9 * (c - g) + 3 * (S - f), O = 6 * (f + g) - 12 * c, w = 3 * (c - f);
            return function(P) {
              var m = (x * P + y) * P + E, I = (C * P + O) * P + w;
              return Math.sqrt(m * m + I * I);
            };
          }
          function r(u, h) {
            return Math.max(2, Math.min(16, Math.ceil(Math.abs(h - u) * 32)));
          }
          function a(u, h, f, d) {
            if (h == null || h < 0 || h > 1)
              return null;
            var c = u[0], p = u[1], g = u[2], b = u[3], S = u[4], x = u[5], y = u[6], E = u[7], C = q.isZero;
            C(g - c) && C(b - p) && (g = c, b = p), C(S - y) && C(x - E) && (S = y, x = E);
            var O = 3 * (g - c), w = 3 * (S - g) - O, P = y - c - O - w, m = 3 * (b - p), I = 3 * (x - b) - m, T = E - p - m - I, M, A;
            if (f === 0)
              M = h === 0 ? c : h === 1 ? y : ((P * h + w) * h + O) * h + c, A = h === 0 ? p : h === 1 ? E : ((T * h + I) * h + m) * h + p;
            else {
              var R = 1e-8, V = 1 - R;
              if (h < R ? (M = O, A = m) : h > V ? (M = 3 * (y - S), A = 3 * (E - x)) : (M = (3 * P * h + 2 * w) * h + O, A = (3 * T * h + 2 * I) * h + m), d) {
                M === 0 && A === 0 && (h < R || h > V) && (M = S - g, A = x - b);
                var B = Math.sqrt(M * M + A * A);
                B && (M /= B, A /= B);
              }
              if (f === 3) {
                var S = 6 * P * h + 2 * w, x = 6 * T * h + 2 * I, H = Math.pow(M * M + A * A, 3 / 2);
                M = H !== 0 ? (M * x - A * S) / H : 0, A = 0;
              }
            }
            return f === 2 ? new F(A, -M) : new F(M, A);
          }
          return { statics: {
            classify: function(u) {
              var h = u[0], f = u[1], d = u[2], c = u[3], p = u[4], g = u[5], b = u[6], S = u[7], x = h * (S - g) + f * (p - b) + b * g - S * p, y = d * (f - S) + c * (b - h) + h * S - f * b, E = p * (c - f) + g * (h - d) + d * f - c * h, C = 3 * E, O = C - y, w = O - y + x, P = Math.sqrt(w * w + O * O + C * C), m = P !== 0 ? 1 / P : 0, I = q.isZero, T = "serpentine";
              w *= m, O *= m, C *= m;
              function M(B, H, D) {
                var j = H !== n, G = j && H > 0 && H < 1, Y = j && D > 0 && D < 1;
                return j && (!(G || Y) || B === "loop" && !(G && Y)) && (B = "arch", G = Y = !1), {
                  type: B,
                  roots: G || Y ? G && Y ? H < D ? [H, D] : [D, H] : [G ? H : D] : null
                };
              }
              if (I(w))
                return I(O) ? M(I(C) ? "line" : "quadratic") : M(T, C / (3 * O));
              var A = 3 * O * O - 4 * w * C;
              if (I(A))
                return M("cusp", O / (2 * w));
              var R = A > 0 ? Math.sqrt(A / 3) : Math.sqrt(-A), V = 2 * w;
              return M(
                A > 0 ? T : "loop",
                (O + R) / V,
                (O - R) / V
              );
            },
            getLength: function(u, h, f, d) {
              if (h === n && (h = 0), f === n && (f = 1), ot.isStraight(u)) {
                var c = u;
                f < 1 && (c = ot.subdivide(c, f)[0], h /= f), h > 0 && (c = ot.subdivide(c, h)[1]);
                var p = c[6] - c[0], g = c[7] - c[1];
                return Math.sqrt(p * p + g * g);
              }
              return q.integrate(
                d || i(u),
                h,
                f,
                r(h, f)
              );
            },
            getTimeAt: function(u, h, f) {
              if (f === n && (f = h < 0 ? 1 : 0), h === 0)
                return f;
              var d = Math.abs, c = 1e-12, p = h > 0, g = p ? f : 0, b = p ? 1 : f, S = i(u), x = ot.getLength(u, g, b, S), y = d(h) - x;
              if (d(y) < c)
                return p ? b : g;
              if (y > c)
                return null;
              var E = h / x, C = 0;
              function O(w) {
                return C += q.integrate(
                  S,
                  f,
                  w,
                  r(f, w)
                ), f = w, C - h;
              }
              return q.findRoot(
                O,
                S,
                f + E,
                g,
                b,
                32,
                1e-12
              );
            },
            getPoint: function(u, h) {
              return a(u, h, 0, !1);
            },
            getTangent: function(u, h) {
              return a(u, h, 1, !0);
            },
            getWeightedTangent: function(u, h) {
              return a(u, h, 1, !1);
            },
            getNormal: function(u, h) {
              return a(u, h, 2, !0);
            },
            getWeightedNormal: function(u, h) {
              return a(u, h, 2, !1);
            },
            getCurvature: function(u, h) {
              return a(u, h, 3, !1).x;
            },
            getPeaks: function(u) {
              var h = u[0], f = u[1], d = u[2], c = u[3], p = u[4], g = u[5], b = u[6], S = u[7], x = -h + 3 * d - 3 * p + b, y = 3 * h - 6 * d + 3 * p, E = -3 * h + 3 * d, C = -f + 3 * c - 3 * g + S, O = 3 * f - 6 * c + 3 * g, w = -3 * f + 3 * c, P = 1e-8, m = 1 - P, I = [];
              return q.solveCubic(
                9 * (x * x + C * C),
                9 * (x * y + O * C),
                2 * (y * y + O * O) + 3 * (E * x + w * C),
                E * y + O * w,
                I,
                P,
                m
              ), I.sort();
            }
          } };
        }(),
        new function() {
          function i(y, E, C, O, w, P, m) {
            var I = !m && C.getPrevious() === w, T = !m && C !== w && C.getNext() === w, M = 1e-8, A = 1 - M;
            if (O !== null && O >= (I ? M : 0) && O <= (T ? A : 1) && P !== null && P >= (T ? M : 0) && P <= (I ? A : 1)) {
              var R = new Ut(C, O, null, m), V = new Ut(w, P, null, m);
              R._intersection = V, V._intersection = R, (!E || E(R)) && Ut.insert(y, R, !0);
            }
          }
          function r(y, E, C, O, w, P, m, I, T, M, A, R, V) {
            if (++T >= 4096 || ++I >= 40)
              return T;
            var B = 1e-9, H = E[0], D = E[1], j = E[6], G = E[7], Y = xt.getSignedDistance, $ = Y(H, D, j, G, E[2], E[3]), Q = Y(H, D, j, G, E[4], E[5]), at = $ * Q > 0 ? 3 / 4 : 4 / 9, dt = at * Math.min(0, $, Q), _t = at * Math.max(0, $, Q), St = Y(H, D, j, G, y[0], y[1]), et = Y(H, D, j, G, y[2], y[3]), nt = Y(H, D, j, G, y[4], y[5]), yt = Y(H, D, j, G, y[6], y[7]), kt = a(St, et, nt, yt), Ct = kt[0], Rt = kt[1], Mt, jt;
            if ($ === 0 && Q === 0 && St === 0 && et === 0 && nt === 0 && yt === 0 || (Mt = u(Ct, Rt, dt, _t)) == null || (jt = u(
              Ct.reverse(),
              Rt.reverse(),
              dt,
              _t
            )) == null)
              return T;
            var Zt = M + (A - M) * Mt, qt = M + (A - M) * jt;
            if (Math.max(V - R, qt - Zt) < B) {
              var Ve = (Zt + qt) / 2, Be = (R + V) / 2;
              i(
                w,
                P,
                m ? O : C,
                m ? Be : Ve,
                m ? C : O,
                m ? Ve : Be
              );
            } else {
              y = ot.getPart(y, Mt, jt);
              var We = V - R;
              if (jt - Mt > 0.8)
                if (qt - Zt > We) {
                  var Le = ot.subdivide(y, 0.5), Ve = (Zt + qt) / 2;
                  T = r(
                    E,
                    Le[0],
                    O,
                    C,
                    w,
                    P,
                    !m,
                    I,
                    T,
                    R,
                    V,
                    Zt,
                    Ve
                  ), T = r(
                    E,
                    Le[1],
                    O,
                    C,
                    w,
                    P,
                    !m,
                    I,
                    T,
                    R,
                    V,
                    Ve,
                    qt
                  );
                } else {
                  var Le = ot.subdivide(E, 0.5), Be = (R + V) / 2;
                  T = r(
                    Le[0],
                    y,
                    O,
                    C,
                    w,
                    P,
                    !m,
                    I,
                    T,
                    R,
                    Be,
                    Zt,
                    qt
                  ), T = r(
                    Le[1],
                    y,
                    O,
                    C,
                    w,
                    P,
                    !m,
                    I,
                    T,
                    Be,
                    V,
                    Zt,
                    qt
                  );
                }
              else
                We === 0 || We >= B ? T = r(
                  E,
                  y,
                  O,
                  C,
                  w,
                  P,
                  !m,
                  I,
                  T,
                  R,
                  V,
                  Zt,
                  qt
                ) : T = r(
                  y,
                  E,
                  C,
                  O,
                  w,
                  P,
                  m,
                  I,
                  T,
                  Zt,
                  qt,
                  R,
                  V
                );
            }
            return T;
          }
          function a(y, E, C, O) {
            var w = [0, y], P = [1 / 3, E], m = [2 / 3, C], I = [1, O], T = E - (2 * y + O) / 3, M = C - (y + 2 * O) / 3, A;
            if (T * M < 0)
              A = [[w, P, I], [w, m, I]];
            else {
              var R = T / M;
              A = [
                R >= 2 ? [w, P, I] : R <= 0.5 ? [w, m, I] : [w, P, m, I],
                [w, I]
              ];
            }
            return (T || M) < 0 ? A.reverse() : A;
          }
          function u(y, E, C, O) {
            return y[0][1] < C ? h(y, !0, C) : E[0][1] > O ? h(E, !1, O) : y[0][0];
          }
          function h(y, E, C) {
            for (var O = y[0][0], w = y[0][1], P = 1, m = y.length; P < m; P++) {
              var I = y[P][0], T = y[P][1];
              if (E ? T >= C : T <= C)
                return T === C ? I : O + (C - w) * (I - O) / (T - w);
              O = I, w = T;
            }
            return null;
          }
          function f(y, E, C, O, w) {
            var P = q.isZero;
            if (P(O) && P(w)) {
              var m = ot.getTimeOf(y, new F(E, C));
              return m === null ? [] : [m];
            }
            for (var I = Math.atan2(-w, O), T = Math.sin(I), M = Math.cos(I), A = [], R = [], V = 0; V < 8; V += 2) {
              var B = y[V] - E, H = y[V + 1] - C;
              A.push(
                B * M - H * T,
                B * T + H * M
              );
            }
            return ot.solveCubic(A, 1, 0, R, 0, 1), R;
          }
          function d(y, E, C, O, w, P, m) {
            for (var I = E[0], T = E[1], M = E[6], A = E[7], R = f(y, I, T, M - I, A - T), V = 0, B = R.length; V < B; V++) {
              var H = R[V], D = ot.getPoint(y, H), j = ot.getTimeOf(E, D);
              j !== null && i(
                w,
                P,
                m ? O : C,
                m ? j : H,
                m ? C : O,
                m ? H : j
              );
            }
          }
          function c(y, E, C, O, w, P) {
            var m = xt.intersect(
              y[0],
              y[1],
              y[6],
              y[7],
              E[0],
              E[1],
              E[6],
              E[7]
            );
            m && i(
              w,
              P,
              C,
              ot.getTimeOf(y, m),
              O,
              ot.getTimeOf(E, m)
            );
          }
          function p(y, E, C, O, w, P) {
            var m = 1e-12, I = Math.min, T = Math.max;
            if (T(y[0], y[2], y[4], y[6]) + m > I(E[0], E[2], E[4], E[6]) && I(y[0], y[2], y[4], y[6]) - m < T(E[0], E[2], E[4], E[6]) && T(y[1], y[3], y[5], y[7]) + m > I(E[1], E[3], E[5], E[7]) && I(y[1], y[3], y[5], y[7]) - m < T(E[1], E[3], E[5], E[7])) {
              var M = S(y, E);
              if (M)
                for (var A = 0; A < 2; A++) {
                  var R = M[A];
                  i(
                    w,
                    P,
                    C,
                    R[0],
                    O,
                    R[1],
                    !0
                  );
                }
              else {
                var V = ot.isStraight(y), B = ot.isStraight(E), H = V && B, D = V && !B, j = w.length;
                if ((H ? c : V || B ? d : r)(
                  D ? E : y,
                  D ? y : E,
                  D ? O : C,
                  D ? C : O,
                  w,
                  P,
                  D,
                  0,
                  0,
                  0,
                  1,
                  0,
                  1
                ), !H || w.length === j)
                  for (var A = 0; A < 4; A++) {
                    var G = A >> 1, Y = A & 1, $ = G * 6, Q = Y * 6, at = new F(y[$], y[$ + 1]), dt = new F(E[Q], E[Q + 1]);
                    at.isClose(dt, m) && i(
                      w,
                      P,
                      C,
                      G,
                      O,
                      Y
                    );
                  }
              }
            }
            return w;
          }
          function g(y, E, C, O) {
            var w = ot.classify(y);
            if (w.type === "loop") {
              var P = w.roots;
              i(
                C,
                O,
                E,
                P[0],
                E,
                P[1]
              );
            }
            return C;
          }
          function b(y, E, C, O, w, P) {
            var m = 1e-7, I = !E;
            I && (E = y);
            for (var T = y.length, M = E.length, A = new Array(T), R = I ? A : new Array(M), V = [], B = 0; B < T; B++)
              A[B] = y[B].getValues(O);
            if (!I)
              for (var B = 0; B < M; B++)
                R[B] = E[B].getValues(w);
            for (var H = N.findCurveBoundsCollisions(
              A,
              R,
              m
            ), D = 0; D < T; D++) {
              var j = y[D], G = A[D];
              I && g(G, j, V, C);
              var Y = H[D];
              if (Y)
                for (var $ = 0; $ < Y.length; $++) {
                  if (P && V.length)
                    return V;
                  var Q = Y[$];
                  if (!I || Q > D) {
                    var at = E[Q], dt = R[Q];
                    p(
                      G,
                      dt,
                      j,
                      at,
                      V,
                      C
                    );
                  }
                }
            }
            return V;
          }
          function S(y, E) {
            function C(yt) {
              var kt = yt[6] - yt[0], Ct = yt[7] - yt[1];
              return kt * kt + Ct * Ct;
            }
            var O = Math.abs, w = xt.getDistance, P = 1e-8, m = 1e-7, I = ot.isStraight(y), T = ot.isStraight(E), M = I && T, A = C(y) < C(E), R = A ? E : y, V = A ? y : E, B = R[0], H = R[1], D = R[6] - B, j = R[7] - H;
            if (w(B, H, D, j, V[0], V[1], !0) < m && w(B, H, D, j, V[6], V[7], !0) < m)
              !M && w(B, H, D, j, R[2], R[3], !0) < m && w(B, H, D, j, R[4], R[5], !0) < m && w(B, H, D, j, V[2], V[3], !0) < m && w(B, H, D, j, V[4], V[5], !0) < m && (I = T = M = !0);
            else if (M)
              return null;
            if (I ^ T)
              return null;
            for (var G = [y, E], Y = [], $ = 0; $ < 4 && Y.length < 2; $++) {
              var Q = $ & 1, at = Q ^ 1, dt = $ >> 1, _t = ot.getTimeOf(G[Q], new F(
                G[at][dt ? 6 : 0],
                G[at][dt ? 7 : 1]
              ));
              if (_t != null) {
                var St = Q ? [dt, _t] : [_t, dt];
                (!Y.length || O(St[0] - Y[0][0]) > P && O(St[1] - Y[0][1]) > P) && Y.push(St);
              }
              if ($ > 2 && !Y.length)
                break;
            }
            if (Y.length !== 2)
              Y = null;
            else if (!M) {
              var et = ot.getPart(y, Y[0][0], Y[1][0]), nt = ot.getPart(E, Y[0][1], Y[1][1]);
              (O(nt[2] - et[2]) > m || O(nt[3] - et[3]) > m || O(nt[4] - et[4]) > m || O(nt[5] - et[5]) > m) && (Y = null);
            }
            return Y;
          }
          function x(y, E) {
            var C = y[0], O = y[1], w = y[2], P = y[3], m = y[4], I = y[5], T = y[6], M = y[7], A = E.normalize(), R = A.x, V = A.y, B = 3 * T - 9 * m + 9 * w - 3 * C, H = 3 * M - 9 * I + 9 * P - 3 * O, D = 6 * m - 12 * w + 6 * C, j = 6 * I - 12 * P + 6 * O, G = 3 * w - 3 * C, Y = 3 * P - 3 * O, $ = 2 * B * V - 2 * H * R, Q = [];
            if (Math.abs($) < q.CURVETIME_EPSILON) {
              var at = B * Y - H * G, $ = B * j - H * D;
              if ($ != 0) {
                var dt = -at / $;
                dt >= 0 && dt <= 1 && Q.push(dt);
              }
            } else {
              var _t = (D * D - 4 * B * G) * V * V + (-2 * D * j + 4 * H * G + 4 * B * Y) * R * V + (j * j - 4 * H * Y) * R * R, St = D * V - j * R;
              if (_t >= 0 && $ != 0) {
                var et = Math.sqrt(_t), nt = -(St + et) / $, yt = (-St + et) / $;
                nt >= 0 && nt <= 1 && Q.push(nt), yt >= 0 && yt <= 1 && Q.push(yt);
              }
            }
            return Q;
          }
          return {
            getIntersections: function(y) {
              var E = this.getValues(), C = y && y !== this && y.getValues();
              return C ? p(E, C, this, y, []) : g(E, this, []);
            },
            statics: {
              getOverlaps: S,
              getIntersections: b,
              getCurveLineIntersections: f,
              getTimesWithTangent: x
            }
          };
        }()
      ), Ut = l.extend(
        {
          _class: "CurveLocation",
          initialize: function(r, a, u, h, f) {
            if (a >= 0.99999999) {
              var d = r.getNext();
              d && (a = 0, r = d);
            }
            this._setCurve(r), this._time = a, this._point = u || r.getPointAtTime(a), this._overlap = h, this._distance = f, this._intersection = this._next = this._previous = null;
          },
          _setPath: function(i) {
            this._path = i, this._version = i ? i._version : 0;
          },
          _setCurve: function(i) {
            this._setPath(i._path), this._curve = i, this._segment = null, this._segment1 = i._segment1, this._segment2 = i._segment2;
          },
          _setSegment: function(i) {
            var r = i.getCurve();
            r ? this._setCurve(r) : (this._setPath(i._path), this._segment1 = i, this._segment2 = null), this._segment = i, this._time = i === this._segment1 ? 0 : 1, this._point = i._point.clone();
          },
          getSegment: function() {
            var i = this._segment;
            if (!i) {
              var r = this.getCurve(), a = this.getTime();
              a === 0 ? i = r._segment1 : a === 1 ? i = r._segment2 : a != null && (i = r.getPartLength(0, a) < r.getPartLength(a, 1) ? r._segment1 : r._segment2), this._segment = i;
            }
            return i;
          },
          getCurve: function() {
            var i = this._path, r = this;
            i && i._version !== this._version && (this._time = this._offset = this._curveOffset = this._curve = null);
            function a(u) {
              var h = u && u.getCurve();
              if (h && (r._time = h.getTimeOf(r._point)) != null)
                return r._setCurve(h), h;
            }
            return this._curve || a(this._segment) || a(this._segment1) || a(this._segment2.getPrevious());
          },
          getPath: function() {
            var i = this.getCurve();
            return i && i._path;
          },
          getIndex: function() {
            var i = this.getCurve();
            return i && i.getIndex();
          },
          getTime: function() {
            var i = this.getCurve(), r = this._time;
            return i && r == null ? this._time = i.getTimeOf(this._point) : r;
          },
          getParameter: "#getTime",
          getPoint: function() {
            return this._point;
          },
          getOffset: function() {
            var i = this._offset;
            if (i == null) {
              i = 0;
              var r = this.getPath(), a = this.getIndex();
              if (r && a != null)
                for (var u = r.getCurves(), h = 0; h < a; h++)
                  i += u[h].getLength();
              this._offset = i += this.getCurveOffset();
            }
            return i;
          },
          getCurveOffset: function() {
            var i = this._curveOffset;
            if (i == null) {
              var r = this.getCurve(), a = this.getTime();
              this._curveOffset = i = a != null && r && r.getPartLength(0, a);
            }
            return i;
          },
          getIntersection: function() {
            return this._intersection;
          },
          getDistance: function() {
            return this._distance;
          },
          divide: function() {
            var i = this.getCurve(), r = i && i.divideAtTime(this.getTime());
            return r && this._setSegment(r._segment1), r;
          },
          split: function() {
            var i = this.getCurve(), r = i._path, a = i && i.splitAtTime(this.getTime());
            return a && this._setSegment(r.getLastSegment()), a;
          },
          equals: function(i, r) {
            var a = this === i;
            if (!a && i instanceof Ut) {
              var u = this.getCurve(), h = i.getCurve(), f = u._path, d = h._path;
              if (f === d) {
                var c = Math.abs, p = 1e-7, g = c(this.getOffset() - i.getOffset()), b = !r && this._intersection, S = !r && i._intersection;
                a = (g < p || f && c(f.getLength() - g) < p) && (!b && !S || b && S && b.equals(S, !0));
              }
            }
            return a;
          },
          toString: function() {
            var i = [], r = this.getPoint(), a = z.instance;
            r && i.push("point: " + r);
            var u = this.getIndex();
            u != null && i.push("index: " + u);
            var h = this.getTime();
            return h != null && i.push("time: " + a.number(h)), this._distance != null && i.push("distance: " + a.number(this._distance)), "{ " + i.join(", ") + " }";
          },
          isTouching: function() {
            var i = this._intersection;
            if (i && this.getTangent().isCollinear(i.getTangent())) {
              var r = this.getCurve(), a = i.getCurve();
              return !(r.isStraight() && a.isStraight() && r.getLine().intersect(a.getLine()));
            }
            return !1;
          },
          isCrossing: function() {
            var i = this._intersection;
            if (!i)
              return !1;
            var r = this.getTime(), a = i.getTime(), u = 1e-8, h = 1 - u, f = r >= u && r <= h, d = a >= u && a <= h;
            if (f && d)
              return !this.isTouching();
            var c = this.getCurve(), p = c && r < u ? c.getPrevious() : c, g = i.getCurve(), b = g && a < u ? g.getPrevious() : g;
            if (r > h && (c = c.getNext()), a > h && (g = g.getNext()), !p || !c || !b || !g)
              return !1;
            var S = [];
            function x(R, V) {
              var B = R.getValues(), H = ot.classify(B).roots || ot.getPeaks(B), D = H.length, j = ot.getLength(
                B,
                V && D ? H[D - 1] : 0,
                !V && D ? H[0] : 1
              );
              S.push(D ? j : j / 32);
            }
            function y(R, V, B) {
              return V < B ? R > V && R < B : R > V || R < B;
            }
            f || (x(p, !0), x(c, !1)), d || (x(b, !0), x(g, !1));
            var E = this.getPoint(), C = Math.min.apply(Math, S), O = f ? c.getTangentAtTime(r) : c.getPointAt(C).subtract(E), w = f ? O.negate() : p.getPointAt(-C).subtract(E), P = d ? g.getTangentAtTime(a) : g.getPointAt(C).subtract(E), m = d ? P.negate() : b.getPointAt(-C).subtract(E), I = w.getAngle(), T = O.getAngle(), M = m.getAngle(), A = P.getAngle();
            return !!(f ? y(I, M, A) ^ y(T, M, A) && y(I, A, M) ^ y(T, A, M) : y(M, I, T) ^ y(A, I, T) && y(M, T, I) ^ y(A, T, I));
          },
          hasOverlap: function() {
            return !!this._overlap;
          }
        },
        l.each(ot._evaluateMethods, function(i) {
          var r = i + "At";
          this[i] = function() {
            var a = this.getCurve(), u = this.getTime();
            return u != null && a && a[r](u, !0);
          };
        }, {
          preserve: !0
        }),
        new function() {
          function i(r, a, u) {
            var h = r.length, f = 0, d = h - 1;
            function c(E, C) {
              for (var O = E + C; O >= -1 && O <= h; O += C) {
                var w = r[(O % h + h) % h];
                if (!a.getPoint().isClose(
                  w.getPoint(),
                  1e-7
                ))
                  break;
                if (a.equals(w))
                  return w;
              }
              return null;
            }
            for (; f <= d; ) {
              var p = f + d >>> 1, g = r[p], b;
              if (u && (b = a.equals(g) ? g : c(p, -1) || c(p, 1)))
                return a._overlap && (b._overlap = b._intersection._overlap = !0), b;
              var S = a.getPath(), x = g.getPath(), y = S !== x ? S._id - x._id : a.getIndex() + a.getTime() - (g.getIndex() + g.getTime());
              y < 0 ? d = p - 1 : f = p + 1;
            }
            return r.splice(f, 0, a), a;
          }
          return { statics: {
            insert: i,
            expand: function(r) {
              for (var a = r.slice(), u = r.length - 1; u >= 0; u--)
                i(a, r[u]._intersection, !1);
              return a;
            }
          } };
        }()
      ), ue = ht.extend({
        _class: "PathItem",
        _selectBounds: !1,
        _canScaleStroke: !0,
        beans: !0,
        initialize: function() {
        },
        statics: {
          create: function(i) {
            var r, a, u;
            if (l.isPlainObject(i) ? (a = i.segments, r = i.pathData) : Array.isArray(i) ? a = i : typeof i == "string" && (r = i), a) {
              var h = a[0];
              u = h && Array.isArray(h[0]);
            } else r && (u = (r.match(/m/gi) || []).length > 1 || /z\s*\S+/i.test(r));
            var f = u ? Qe : Jt;
            return new f(i);
          }
        },
        _asPathItem: function() {
          return this;
        },
        isClockwise: function() {
          return this.getArea() >= 0;
        },
        setClockwise: function(i) {
          this.isClockwise() != (i = !!i) && this.reverse();
        },
        setPathData: function(i) {
          var r = i && i.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig), a, u = !1, h, f, d = new F(), c = new F();
          function p(m, I) {
            var T = +a[m];
            return u && (T += d[I]), T;
          }
          function g(m) {
            return new F(
              p(m, "x"),
              p(m + 1, "y")
            );
          }
          this.clear();
          for (var b = 0, S = r && r.length; b < S; b++) {
            var x = r[b], y = x[0], E = y.toLowerCase();
            a = x.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
            var C = a && a.length;
            switch (u = y === E, h === "z" && !/[mz]/.test(E) && this.moveTo(d), E) {
              case "m":
              case "l":
                for (var O = E === "m", w = 0; w < C; w += 2)
                  this[O ? "moveTo" : "lineTo"](d = g(w)), O && (c = d, O = !1);
                f = d;
                break;
              case "h":
              case "v":
                var P = E === "h" ? "x" : "y";
                d = d.clone();
                for (var w = 0; w < C; w++)
                  d[P] = p(w, P), this.lineTo(d);
                f = d;
                break;
              case "c":
                for (var w = 0; w < C; w += 6)
                  this.cubicCurveTo(
                    g(w),
                    f = g(w + 2),
                    d = g(w + 4)
                  );
                break;
              case "s":
                for (var w = 0; w < C; w += 4)
                  this.cubicCurveTo(
                    /[cs]/.test(h) ? d.multiply(2).subtract(f) : d,
                    f = g(w),
                    d = g(w + 2)
                  ), h = E;
                break;
              case "q":
                for (var w = 0; w < C; w += 4)
                  this.quadraticCurveTo(
                    f = g(w),
                    d = g(w + 2)
                  );
                break;
              case "t":
                for (var w = 0; w < C; w += 2)
                  this.quadraticCurveTo(
                    f = /[qt]/.test(h) ? d.multiply(2).subtract(f) : d,
                    d = g(w)
                  ), h = E;
                break;
              case "a":
                for (var w = 0; w < C; w += 7)
                  this.arcTo(
                    d = g(w + 5),
                    new X(+a[w], +a[w + 1]),
                    +a[w + 2],
                    +a[w + 4],
                    +a[w + 3]
                  );
                break;
              case "z":
                this.closePath(1e-12), d = c;
                break;
            }
            h = E;
          }
        },
        _canComposite: function() {
          return !(this.hasFill() && this.hasStroke());
        },
        _contains: function(i) {
          var r = i.isInside(
            this.getBounds({ internal: !0, handle: !0 })
          ) ? this._getWinding(i) : {};
          return r.onPath || !!(this.getFillRule() === "evenodd" ? r.windingL & 1 || r.windingR & 1 : r.winding);
        },
        getIntersections: function(i, r, a, u) {
          var h = this === i || !i, f = this._matrix._orNullIfIdentity(), d = h ? f : (a || i._matrix)._orNullIfIdentity();
          return h || this.getBounds(f).intersects(
            i.getBounds(d),
            1e-12
          ) ? ot.getIntersections(
            this.getCurves(),
            !h && i.getCurves(),
            r,
            f,
            d,
            u
          ) : [];
        },
        getCrossings: function(i) {
          return this.getIntersections(i, function(r) {
            return r.isCrossing();
          });
        },
        getNearestLocation: function() {
          for (var i = F.read(arguments), r = this.getCurves(), a = 1 / 0, u = null, h = 0, f = r.length; h < f; h++) {
            var d = r[h].getNearestLocation(i);
            d._distance < a && (a = d._distance, u = d);
          }
          return u;
        },
        getNearestPoint: function() {
          var i = this.getNearestLocation.apply(this, arguments);
          return i && i.getPoint();
        },
        interpolate: function(i, r, a) {
          var u = !this._children, h = u ? "_segments" : "_children", f = i[h], d = r[h], c = this[h];
          if (!f || !d || f.length !== d.length)
            throw new Error("Invalid operands in interpolate() call: " + i + ", " + r);
          var p = c.length, g = d.length;
          if (p < g)
            for (var b = u ? Tt : Jt, S = p; S < g; S++)
              this.add(new b());
          else p > g && this[u ? "removeSegments" : "removeChildren"](g, p);
          for (var S = 0; S < g; S++)
            c[S].interpolate(f[S], d[S], a);
          u && (this.setClosed(i._closed), this._changed(9));
        },
        compare: function(i) {
          var r = !1;
          if (i) {
            var a = this._children || [this], u = i._children ? i._children.slice() : [i], h = a.length, f = u.length, d = [], c = 0;
            r = !0;
            for (var p = N.findItemBoundsCollisions(a, u, q.GEOMETRIC_EPSILON), g = h - 1; g >= 0 && r; g--) {
              var b = a[g];
              r = !1;
              var S = p[g];
              if (S)
                for (var x = S.length - 1; x >= 0 && !r; x--)
                  b.compare(u[S[x]]) && (d[S[x]] || (d[S[x]] = !0, c++), r = !0);
            }
            r = r && c === f;
          }
          return r;
        }
      }), Jt = ue.extend(
        {
          _class: "Path",
          _serializeFields: {
            segments: [],
            closed: !1
          },
          initialize: function(r) {
            this._closed = !1, this._segments = [], this._version = 0;
            var a = arguments, u = Array.isArray(r) ? typeof r[0] == "object" ? r : a : r && r.size === n && (r.x !== n || r.point !== n) ? a : null;
            u && u.length > 0 ? this.setSegments(u) : (this._curves = n, this._segmentSelection = 0, !u && typeof r == "string" && (this.setPathData(r), r = null)), this._initialize(!u && r);
          },
          _equals: function(i) {
            return this._closed === i._closed && l.equals(this._segments, i._segments);
          },
          copyContent: function(i) {
            this.setSegments(i._segments), this._closed = i._closed;
          },
          _changed: function i(r) {
            if (i.base.call(this, r), r & 8) {
              if (this._length = this._area = n, r & 32)
                this._version++;
              else if (this._curves)
                for (var a = 0, u = this._curves.length; a < u; a++)
                  this._curves[a]._changed();
            } else r & 64 && (this._bounds = n);
          },
          getStyle: function() {
            var i = this._parent;
            return (i instanceof Qe ? i : this)._style;
          },
          getSegments: function() {
            return this._segments;
          },
          setSegments: function(i) {
            var r = this.isFullySelected(), a = i && i.length;
            if (this._segments.length = 0, this._segmentSelection = 0, this._curves = n, a) {
              var u = i[a - 1];
              typeof u == "boolean" && (this.setClosed(u), a--), this._add(Tt.readList(i, 0, {}, a));
            }
            r && this.setFullySelected(!0);
          },
          getFirstSegment: function() {
            return this._segments[0];
          },
          getLastSegment: function() {
            return this._segments[this._segments.length - 1];
          },
          getCurves: function() {
            var i = this._curves, r = this._segments;
            if (!i) {
              var a = this._countCurves();
              i = this._curves = new Array(a);
              for (var u = 0; u < a; u++)
                i[u] = new ot(
                  this,
                  r[u],
                  r[u + 1] || r[0]
                );
            }
            return i;
          },
          getFirstCurve: function() {
            return this.getCurves()[0];
          },
          getLastCurve: function() {
            var i = this.getCurves();
            return i[i.length - 1];
          },
          isClosed: function() {
            return this._closed;
          },
          setClosed: function(i) {
            if (this._closed != (i = !!i)) {
              if (this._closed = i, this._curves) {
                var r = this._curves.length = this._countCurves();
                i && (this._curves[r - 1] = new ot(
                  this,
                  this._segments[r - 1],
                  this._segments[0]
                ));
              }
              this._changed(41);
            }
          }
        },
        {
          beans: !0,
          getPathData: function(i, r) {
            var a = this._segments, u = a.length, h = new z(r), f = new Array(6), d = !0, c, p, g, b, S, x, y, E, C = [];
            function O(P, m) {
              if (P._transformCoordinates(i, f), c = f[0], p = f[1], d)
                C.push("M" + h.pair(c, p)), d = !1;
              else if (S = f[2], x = f[3], S === c && x === p && y === g && E === b) {
                if (!m) {
                  var I = c - g, T = p - b;
                  C.push(
                    I === 0 ? "v" + h.number(T) : T === 0 ? "h" + h.number(I) : "l" + h.pair(I, T)
                  );
                }
              } else
                C.push("c" + h.pair(y - g, E - b) + " " + h.pair(S - g, x - b) + " " + h.pair(c - g, p - b));
              g = c, b = p, y = f[4], E = f[5];
            }
            if (!u)
              return "";
            for (var w = 0; w < u; w++)
              O(a[w]);
            return this._closed && u > 0 && (O(a[0], !0), C.push("z")), C.join("");
          },
          isEmpty: function() {
            return !this._segments.length;
          },
          _transformContent: function(i) {
            for (var r = this._segments, a = new Array(6), u = 0, h = r.length; u < h; u++)
              r[u]._transformCoordinates(i, a, !0);
            return !0;
          },
          _add: function(i, d) {
            for (var a = this._segments, u = this._curves, h = i.length, f = d == null, d = f ? a.length : d, c = 0; c < h; c++) {
              var p = i[c];
              p._path && (p = i[c] = p.clone()), p._path = this, p._index = d + c, p._selection && this._updateSelection(p, 0, p._selection);
            }
            if (f)
              l.push(a, i);
            else {
              a.splice.apply(a, [d, 0].concat(i));
              for (var c = d + h, g = a.length; c < g; c++)
                a[c]._index = c;
            }
            if (u) {
              var b = this._countCurves(), S = d > 0 && d + h - 1 === b ? d - 1 : d, x = S, y = Math.min(S + h, b);
              i._curves && (u.splice.apply(u, [S, 0].concat(i._curves)), x += i._curves.length);
              for (var c = x; c < y; c++)
                u.splice(c, 0, new ot(this, null, null));
              this._adjustCurves(S, y);
            }
            return this._changed(41), i;
          },
          _adjustCurves: function(i, r) {
            for (var a = this._segments, u = this._curves, h, f = i; f < r; f++)
              h = u[f], h._path = this, h._segment1 = a[f], h._segment2 = a[f + 1] || a[0], h._changed();
            (h = u[this._closed && !i ? a.length - 1 : i - 1]) && (h._segment2 = a[i] || a[0], h._changed()), (h = u[r]) && (h._segment1 = a[r], h._changed());
          },
          _countCurves: function() {
            var i = this._segments.length;
            return !this._closed && i > 0 ? i - 1 : i;
          },
          add: function(i) {
            var r = arguments;
            return r.length > 1 && typeof i != "number" ? this._add(Tt.readList(r)) : this._add([Tt.read(r)])[0];
          },
          insert: function(i, r) {
            var a = arguments;
            return a.length > 2 && typeof r != "number" ? this._add(Tt.readList(a, 1), i) : this._add([Tt.read(a, 1)], i)[0];
          },
          addSegment: function() {
            return this._add([Tt.read(arguments)])[0];
          },
          insertSegment: function(i) {
            return this._add([Tt.read(arguments, 1)], i)[0];
          },
          addSegments: function(i) {
            return this._add(Tt.readList(i));
          },
          insertSegments: function(i, r) {
            return this._add(Tt.readList(r), i);
          },
          removeSegment: function(i) {
            return this.removeSegments(i, i + 1)[0] || null;
          },
          removeSegments: function(i, r, a) {
            i = i || 0, r = l.pick(r, this._segments.length);
            var u = this._segments, h = this._curves, f = u.length, d = u.splice(i, r - i), c = d.length;
            if (!c)
              return d;
            for (var p = 0; p < c; p++) {
              var g = d[p];
              g._selection && this._updateSelection(g, g._selection, 0), g._index = g._path = null;
            }
            for (var p = i, b = u.length; p < b; p++)
              u[p]._index = p;
            if (h) {
              for (var S = i > 0 && r === f + (this._closed ? 1 : 0) ? i - 1 : i, h = h.splice(S, c), p = h.length - 1; p >= 0; p--)
                h[p]._path = null;
              a && (d._curves = h.slice(1)), this._adjustCurves(S, S);
            }
            return this._changed(41), d;
          },
          clear: "#removeSegments",
          hasHandles: function() {
            for (var i = this._segments, r = 0, a = i.length; r < a; r++)
              if (i[r].hasHandles())
                return !0;
            return !1;
          },
          clearHandles: function() {
            for (var i = this._segments, r = 0, a = i.length; r < a; r++)
              i[r].clearHandles();
          },
          getLength: function() {
            if (this._length == null) {
              for (var i = this.getCurves(), r = 0, a = 0, u = i.length; a < u; a++)
                r += i[a].getLength();
              this._length = r;
            }
            return this._length;
          },
          getArea: function() {
            var i = this._area;
            if (i == null) {
              var r = this._segments, a = this._closed;
              i = 0;
              for (var u = 0, h = r.length; u < h; u++) {
                var f = u + 1 === h;
                i += ot.getArea(ot.getValues(
                  r[u],
                  r[f ? 0 : u + 1],
                  null,
                  f && !a
                ));
              }
              this._area = i;
            }
            return i;
          },
          isFullySelected: function() {
            var i = this._segments.length;
            return this.isSelected() && i > 0 && this._segmentSelection === i * 7;
          },
          setFullySelected: function(i) {
            i && this._selectSegments(!0), this.setSelected(i);
          },
          setSelection: function i(r) {
            r & 1 || this._selectSegments(!1), i.base.call(this, r);
          },
          _selectSegments: function(i) {
            var r = this._segments, a = r.length, u = i ? 7 : 0;
            this._segmentSelection = u * a;
            for (var h = 0; h < a; h++)
              r[h]._selection = u;
          },
          _updateSelection: function(i, r, a) {
            i._selection = a;
            var u = this._segmentSelection += a - r;
            u > 0 && this.setSelected(!0);
          },
          divideAt: function(i) {
            var r = this.getLocationAt(i), a;
            return r && (a = r.getCurve().divideAt(r.getCurveOffset())) ? a._segment1 : null;
          },
          splitAt: function(i) {
            var r = this.getLocationAt(i), a = r && r.index, u = r && r.time, h = 1e-8, f = 1 - h;
            u > f && (a++, u = 0);
            var d = this.getCurves();
            if (a >= 0 && a < d.length) {
              u >= h && d[a++].divideAtTime(u);
              var c = this.removeSegments(a, this._segments.length, !0), p;
              return this._closed ? (this.setClosed(!1), p = this) : (p = new Jt(ht.NO_INSERT), p.insertAbove(this), p.copyAttributes(this)), p._add(c, 0), this.addSegment(c[0]), p;
            }
            return null;
          },
          split: function(i, r) {
            var a, u = r === n ? i : (a = this.getCurves()[i]) && a.getLocationAtTime(r);
            return u != null ? this.splitAt(u) : null;
          },
          join: function(i, r) {
            var a = r || 0;
            if (i && i !== this) {
              var u = i._segments, h = this.getLastSegment(), f = i.getLastSegment();
              if (!f)
                return this;
              h && h._point.isClose(f._point, a) && i.reverse();
              var d = i.getFirstSegment();
              if (h && h._point.isClose(d._point, a))
                h.setHandleOut(d._handleOut), this._add(u.slice(1));
              else {
                var c = this.getFirstSegment();
                c && c._point.isClose(d._point, a) && i.reverse(), f = i.getLastSegment(), c && c._point.isClose(f._point, a) ? (c.setHandleIn(f._handleIn), this._add(u.slice(0, u.length - 1), 0)) : this._add(u.slice());
              }
              i._closed && this._add([u[0]]), i.remove();
            }
            var p = this.getFirstSegment(), g = this.getLastSegment();
            return p !== g && p._point.isClose(g._point, a) && (p.setHandleIn(g._handleIn), g.remove(), this.setClosed(!0)), this;
          },
          reduce: function(i) {
            for (var r = this.getCurves(), a = i && i.simplify, u = a ? 1e-7 : 0, h = r.length - 1; h >= 0; h--) {
              var f = r[h];
              !f.hasHandles() && (!f.hasLength(u) || a && f.isCollinear(f.getNext())) && f.remove();
            }
            return this;
          },
          reverse: function() {
            this._segments.reverse();
            for (var i = 0, r = this._segments.length; i < r; i++) {
              var a = this._segments[i], u = a._handleIn;
              a._handleIn = a._handleOut, a._handleOut = u, a._index = i;
            }
            this._curves = null, this._changed(9);
          },
          flatten: function(i) {
            for (var r = new Di(this, i || 0.25, 256, !0), a = r.parts, u = a.length, h = [], f = 0; f < u; f++)
              h.push(new Tt(a[f].curve.slice(0, 2)));
            !this._closed && u > 0 && h.push(new Tt(a[u - 1].curve.slice(6))), this.setSegments(h);
          },
          simplify: function(i) {
            var r = new bi(this).fit(i || 2.5);
            return r && this.setSegments(r), !!r;
          },
          smooth: function(i) {
            var r = this, a = i || {}, u = a.type || "asymmetric", h = this._segments, f = h.length, d = this._closed;
            function c(Ct, Rt) {
              var Mt = Ct && Ct.index;
              if (Mt != null) {
                var jt = Ct.path;
                if (jt && jt !== r)
                  throw new Error(Ct._class + " " + Mt + " of " + jt + " is not part of " + r);
                Rt && Ct instanceof ot && Mt++;
              } else
                Mt = typeof Ct == "number" ? Ct : Rt;
              return Math.min(Mt < 0 && d ? Mt % f : Mt < 0 ? Mt + f : Mt, f - 1);
            }
            var p = d && a.from === n && a.to === n, g = c(a.from, 0), b = c(a.to, f - 1);
            if (g > b)
              if (d)
                g -= f;
              else {
                var S = g;
                g = b, b = S;
              }
            if (/^(?:asymmetric|continuous)$/.test(u)) {
              var x = u === "asymmetric", y = Math.min, E = b - g + 1, C = E - 1, O = p ? y(E, 4) : 1, w = O, P = O, m = [];
              if (d || (w = y(1, g), P = y(1, f - b - 1)), C += w + P, C <= 1)
                return;
              for (var I = 0, T = g - w; I <= C; I++, T++)
                m[I] = h[(T < 0 ? T + f : T) % f]._point;
              for (var M = m[0]._x + 2 * m[1]._x, A = m[0]._y + 2 * m[1]._y, R = 2, V = C - 1, B = [M], H = [A], D = [R], j = [], G = [], I = 1; I < C; I++) {
                var Y = I < V, $ = Y || x ? 1 : 2, Q = Y ? 4 : x ? 2 : 7, at = Y ? 4 : x ? 3 : 8, dt = Y ? 2 : x ? 0 : 1, _t = $ / R;
                R = D[I] = Q - _t, M = B[I] = at * m[I]._x + dt * m[I + 1]._x - _t * M, A = H[I] = at * m[I]._y + dt * m[I + 1]._y - _t * A;
              }
              j[V] = B[V] / D[V], G[V] = H[V] / D[V];
              for (var I = C - 2; I >= 0; I--)
                j[I] = (B[I] - j[I + 1]) / D[I], G[I] = (H[I] - G[I + 1]) / D[I];
              j[C] = (3 * m[C]._x - j[V]) / 2, G[C] = (3 * m[C]._y - G[V]) / 2;
              for (var I = w, St = C - P, T = g; I <= St; I++, T++) {
                var et = h[T < 0 ? T + f : T], nt = et._point, yt = j[I] - nt._x, kt = G[I] - nt._y;
                (p || I < St) && et.setHandleOut(yt, kt), (p || I > w) && et.setHandleIn(-yt, -kt);
              }
            } else
              for (var I = g; I <= b; I++)
                h[I < 0 ? I + f : I].smooth(
                  a,
                  !p && I === g,
                  !p && I === b
                );
          },
          toShape: function(i) {
            if (!this._closed)
              return null;
            var r = this._segments, a, u, h, f;
            function d(x, y) {
              var E = r[x], C = E.getNext(), O = r[y], w = O.getNext();
              return E._handleOut.isZero() && C._handleIn.isZero() && O._handleOut.isZero() && w._handleIn.isZero() && C._point.subtract(E._point).isCollinear(
                w._point.subtract(O._point)
              );
            }
            function c(x) {
              var y = r[x], E = y.getPrevious(), C = y.getNext();
              return E._handleOut.isZero() && y._handleIn.isZero() && y._handleOut.isZero() && C._handleIn.isZero() && y._point.subtract(E._point).isOrthogonal(
                C._point.subtract(y._point)
              );
            }
            function p(x) {
              var y = r[x], E = y.getNext(), C = y._handleOut, O = E._handleIn, w = 0.5522847498307936;
              if (C.isOrthogonal(O)) {
                var P = y._point, m = E._point, I = new xt(P, C, !0).intersect(
                  new xt(m, O, !0),
                  !0
                );
                return I && q.isZero(C.getLength() / I.subtract(P).getLength() - w) && q.isZero(O.getLength() / I.subtract(m).getLength() - w);
              }
              return !1;
            }
            function g(x, y) {
              return r[x]._point.getDistance(r[y]._point);
            }
            if (!this.hasHandles() && r.length === 4 && d(0, 2) && d(1, 3) && c(1) ? (a = zt.Rectangle, u = new X(g(0, 3), g(0, 1)), f = r[1]._point.add(r[2]._point).divide(2)) : r.length === 8 && p(0) && p(2) && p(4) && p(6) && d(1, 5) && d(3, 7) ? (a = zt.Rectangle, u = new X(g(1, 6), g(0, 3)), h = u.subtract(new X(
              g(0, 7),
              g(1, 2)
            )).divide(2), f = r[3]._point.add(r[4]._point).divide(2)) : r.length === 4 && p(0) && p(1) && p(2) && p(3) && (q.isZero(g(0, 2) - g(1, 3)) ? (a = zt.Circle, h = g(0, 2) / 2) : (a = zt.Ellipse, h = new X(g(2, 0) / 2, g(3, 1) / 2)), f = r[1]._point), a) {
              var b = this.getPosition(!0), S = new a({
                center: b,
                size: u,
                radius: h,
                insert: !1
              });
              return S.copyAttributes(this, !0), S._matrix.prepend(this._matrix), S.rotate(f.subtract(b).getAngle() + 90), (i === n || i) && S.insertAbove(this), S;
            }
            return null;
          },
          toPath: "#clone",
          compare: function i(r) {
            if (!r || r instanceof Qe)
              return i.base.call(this, r);
            var a = this.getCurves(), u = r.getCurves(), h = a.length, f = u.length;
            if (!h || !f)
              return h == f;
            for (var d = a[0].getValues(), c = [], p = 0, g, b = 0, S, x = 0; x < f; x++) {
              var O = u[x].getValues();
              c.push(O);
              var y = ot.getOverlaps(d, O);
              if (y) {
                g = !x && y[0][0] > 0 ? f - 1 : x, S = y[0][1];
                break;
              }
            }
            for (var E = Math.abs, C = 1e-8, O = c[g], w; d && O; ) {
              var y = ot.getOverlaps(d, O);
              if (y) {
                var P = y[0][0];
                if (E(P - b) < C) {
                  b = y[1][0], b === 1 && (d = ++p < h ? a[p].getValues() : null, b = 0);
                  var m = y[0][1];
                  if (E(m - S) < C) {
                    if (w || (w = [g, m]), S = y[1][1], S === 1 && (++g >= f && (g = 0), O = c[g] || u[g].getValues(), S = 0), !d)
                      return w[0] === g && w[1] === S;
                    continue;
                  }
                }
              }
              break;
            }
            return !1;
          },
          _hitTestSelf: function(i, r, a, u) {
            var h = this, f = this.getStyle(), d = this._segments, c = d.length, p = this._closed, g = r._tolerancePadding, b = g, S, x, y, E, C, O, w = r.stroke && f.hasStroke(), P = r.fill && f.hasFill(), m = r.curves, I = w ? f.getStrokeWidth() / 2 : P && r.tolerance > 0 || m ? 0 : null;
            I !== null && (I > 0 ? (S = f.getStrokeJoin(), x = f.getStrokeCap(), y = f.getMiterLimit(), b = b.add(
              Jt._getStrokePadding(I, u)
            )) : S = x = "round");
            function T(j, G) {
              return i.subtract(j).divide(G).length <= 1;
            }
            function M(j, G, Y) {
              if (!r.selected || G.isSelected()) {
                var $ = j._point;
                if (G !== $ && (G = G.add($)), T(G, b))
                  return new Oe(Y, h, {
                    segment: j,
                    point: G
                  });
              }
            }
            function A(j, G) {
              return (G || r.segments) && M(j, j._point, "segment") || !G && r.handles && (M(j, j._handleIn, "handle-in") || M(j, j._handleOut, "handle-out"));
            }
            function R(j) {
              E.add(j);
            }
            function V(j) {
              var G = p || j._index > 0 && j._index < c - 1;
              if ((G ? S : x) === "round")
                return T(j._point, b);
              if (E = new Jt({ internal: !0, closed: !0 }), G ? j.isSmooth() || Jt._addBevelJoin(
                j,
                S,
                I,
                y,
                null,
                u,
                R,
                !0
              ) : x === "square" && Jt._addSquareCap(
                j,
                x,
                I,
                null,
                u,
                R,
                !0
              ), !E.isEmpty()) {
                var Y;
                return E.contains(i) || (Y = E.getNearestLocation(i)) && T(Y.getPoint(), g);
              }
            }
            if (r.ends && !r.segments && !p) {
              if (O = A(d[0], !0) || A(d[c - 1], !0))
                return O;
            } else if (r.segments || r.handles) {
              for (var B = 0; B < c; B++)
                if (O = A(d[B]))
                  return O;
            }
            if (I !== null) {
              if (C = this.getNearestLocation(i), C) {
                var H = C.getTime();
                H === 0 || H === 1 && c > 1 ? V(C.getSegment()) || (C = null) : T(C.getPoint(), b) || (C = null);
              }
              if (!C && S === "miter" && c > 1)
                for (var B = 0; B < c; B++) {
                  var D = d[B];
                  if (i.getDistance(D._point) <= y * I && V(D)) {
                    C = D.getLocation();
                    break;
                  }
                }
            }
            return !C && P && this._contains(i) || C && !w && !m ? new Oe("fill", this) : C ? new Oe(w ? "stroke" : "curve", this, {
              location: C,
              point: C.getPoint()
            }) : null;
          }
        },
        l.each(
          ot._evaluateMethods,
          function(i) {
            this[i + "At"] = function(r) {
              var a = this.getLocationAt(r);
              return a && a[i]();
            };
          },
          {
            beans: !1,
            getLocationOf: function() {
              for (var i = F.read(arguments), r = this.getCurves(), a = 0, u = r.length; a < u; a++) {
                var h = r[a].getLocationOf(i);
                if (h)
                  return h;
              }
              return null;
            },
            getOffsetOf: function() {
              var i = this.getLocationOf.apply(this, arguments);
              return i ? i.getOffset() : null;
            },
            getLocationAt: function(i) {
              if (typeof i == "number") {
                for (var r = this.getCurves(), a = 0, u = 0, h = r.length; u < h; u++) {
                  var f = a, d = r[u];
                  if (a += d.getLength(), a > i)
                    return d.getLocationAt(i - f);
                }
                if (r.length > 0 && i <= this.getLength())
                  return new Ut(r[r.length - 1], 1);
              } else if (i && i.getPath && i.getPath() === this)
                return i;
              return null;
            },
            getOffsetsWithTangent: function() {
              var i = F.read(arguments);
              if (i.isZero())
                return [];
              for (var r = [], a = 0, u = this.getCurves(), h = 0, f = u.length; h < f; h++) {
                for (var d = u[h], c = d.getTimesWithTangent(i), p = 0, g = c.length; p < g; p++) {
                  var b = a + d.getOffsetAtTime(c[p]);
                  r.indexOf(b) < 0 && r.push(b);
                }
                a += d.length;
              }
              return r;
            }
          }
        ),
        new function() {
          function i(a, u, h, f) {
            if (f <= 0) return;
            var d = f / 2, c = f - 2, p = d - 1, g = new Array(6), b, S;
            function x(P) {
              var m = g[P], I = g[P + 1];
              (b != m || S != I) && (a.beginPath(), a.moveTo(b, S), a.lineTo(m, I), a.stroke(), a.beginPath(), a.arc(m, I, d, 0, Math.PI * 2, !0), a.fill());
            }
            for (var y = 0, E = u.length; y < E; y++) {
              var C = u[y], O = C._selection;
              if (C._transformCoordinates(h, g), b = g[0], S = g[1], O & 2 && x(2), O & 4 && x(4), a.fillRect(b - d, S - d, f, f), c > 0 && !(O & 1)) {
                var w = a.fillStyle;
                a.fillStyle = "#ffffff", a.fillRect(b - p, S - p, c, c), a.fillStyle = w;
              }
            }
          }
          function r(a, u, h) {
            var f = u._segments, d = f.length, c = new Array(6), p = !0, g, b, S, x, y, E, C, O;
            function w(m) {
              if (h)
                m._transformCoordinates(h, c), g = c[0], b = c[1];
              else {
                var I = m._point;
                g = I._x, b = I._y;
              }
              if (p)
                a.moveTo(g, b), p = !1;
              else {
                if (h)
                  y = c[2], E = c[3];
                else {
                  var T = m._handleIn;
                  y = g + T._x, E = b + T._y;
                }
                y === g && E === b && C === S && O === x ? a.lineTo(g, b) : a.bezierCurveTo(C, O, y, E, g, b);
              }
              if (S = g, x = b, h)
                C = c[4], O = c[5];
              else {
                var T = m._handleOut;
                C = S + T._x, O = x + T._y;
              }
            }
            for (var P = 0; P < d; P++)
              w(f[P]);
            u._closed && d > 0 && w(f[0]);
          }
          return {
            _draw: function(a, u, h, f) {
              var d = u.dontStart, c = u.dontFinish || u.clip, p = this.getStyle(), g = p.hasFill(), b = p.hasStroke(), S = p.getDashArray(), x = !gt.support.nativeDash && b && S && S.length;
              d || a.beginPath(), (g || b && !x || c) && (r(a, this, f), this._closed && a.closePath());
              function y(m) {
                return S[(m % x + x) % x];
              }
              if (!c && (g || b) && (this._setStyles(a, u, h), g && (a.fill(p.getFillRule()), a.shadowColor = "rgba(0,0,0,0)"), b)) {
                if (x) {
                  d || a.beginPath();
                  for (var E = new Di(
                    this,
                    0.25,
                    32,
                    !1,
                    f
                  ), C = E.length, O = -p.getDashOffset(), w, P = 0; O > 0; )
                    O -= y(P--) + y(P--);
                  for (; O < C; )
                    w = O + y(P++), (O > 0 || w > 0) && E.drawPart(
                      a,
                      Math.max(O, 0),
                      Math.max(w, 0)
                    ), O = w + y(P++);
                }
                a.stroke();
              }
            },
            _drawSelected: function(a, u) {
              a.beginPath(), r(a, this, u), a.stroke(), i(a, this._segments, u, gt.settings.handleSize);
            }
          };
        }(),
        new function() {
          function i(r) {
            var a = r._segments;
            if (!a.length)
              throw new Error("Use a moveTo() command first");
            return a[a.length - 1];
          }
          return {
            moveTo: function() {
              var r = this._segments;
              r.length === 1 && this.removeSegment(0), r.length || this._add([new Tt(F.read(arguments))]);
            },
            moveBy: function() {
              throw new Error("moveBy() is unsupported on Path items.");
            },
            lineTo: function() {
              this._add([new Tt(F.read(arguments))]);
            },
            cubicCurveTo: function() {
              var r = arguments, a = F.read(r), u = F.read(r), h = F.read(r), f = i(this);
              f.setHandleOut(a.subtract(f._point)), this._add([new Tt(h, u.subtract(h))]);
            },
            quadraticCurveTo: function() {
              var r = arguments, a = F.read(r), u = F.read(r), h = i(this)._point;
              this.cubicCurveTo(
                a.add(h.subtract(a).multiply(1 / 3)),
                a.add(u.subtract(a).multiply(1 / 3)),
                u
              );
            },
            curveTo: function() {
              var r = arguments, a = F.read(r), u = F.read(r), h = l.pick(l.read(r), 0.5), f = 1 - h, d = i(this)._point, c = a.subtract(d.multiply(f * f)).subtract(u.multiply(h * h)).divide(2 * h * f);
              if (c.isNaN())
                throw new Error(
                  "Cannot put a curve through points with parameter = " + h
                );
              this.quadraticCurveTo(c, u);
            },
            arcTo: function() {
              var r = arguments, a = Math.abs, u = Math.sqrt, h = i(this), f = h._point, d = F.read(r), c, p = l.peek(r), g = l.pick(p, !0), b, S, x, y;
              if (typeof g == "boolean")
                var E = f.add(d).divide(2), c = E.add(E.subtract(f).rotate(
                  g ? -90 : 90
                ));
              else if (l.remain(r) <= 2)
                c = d, d = F.read(r);
              else if (!f.equals(d)) {
                var C = X.read(r), O = q.isZero;
                if (O(C.width) || O(C.height))
                  return this.lineTo(d);
                var w = l.read(r), g = !!l.read(r), P = !!l.read(r), E = f.add(d).divide(2), m = f.subtract(E).rotate(-w), I = m.x, T = m.y, M = a(C.width), A = a(C.height), R = M * M, V = A * A, B = I * I, H = T * T, D = u(B / R + H / V);
                if (D > 1 && (M *= D, A *= D, R = M * M, V = A * A), D = (R * V - R * H - V * B) / (R * H + V * B), a(D) < 1e-12 && (D = 0), D < 0)
                  throw new Error(
                    "Cannot create an arc with the given arguments"
                  );
                b = new F(M * T / A, -A * I / M).multiply((P === g ? -1 : 1) * u(D)).rotate(w).add(E), y = new Pt().translate(b).rotate(w).scale(M, A), x = y._inverseTransform(f), S = x.getDirectedAngle(y._inverseTransform(d)), !g && S > 0 ? S -= 360 : g && S < 0 && (S += 360);
              }
              if (c) {
                var j = new xt(
                  f.add(c).divide(2),
                  c.subtract(f).rotate(90),
                  !0
                ), G = new xt(
                  c.add(d).divide(2),
                  d.subtract(c).rotate(90),
                  !0
                ), Y = new xt(f, d), $ = Y.getSide(c);
                if (b = j.intersect(G, !0), !b) {
                  if (!$)
                    return this.lineTo(d);
                  throw new Error(
                    "Cannot create an arc with the given arguments"
                  );
                }
                x = f.subtract(b), S = x.getDirectedAngle(d.subtract(b));
                var Q = Y.getSide(b, !0);
                Q === 0 ? S = $ * a(S) : $ === Q && (S += S < 0 ? 360 : -360);
              }
              if (S) {
                for (var at = 1e-5, dt = a(S), _t = dt >= 360 ? 4 : Math.ceil((dt - at) / 90), St = S / _t, et = St * Math.PI / 360, nt = 4 / 3 * Math.sin(et) / (1 + Math.cos(et)), yt = [], kt = 0; kt <= _t; kt++) {
                  var m = d, Ct = null;
                  if (kt < _t && (Ct = x.rotate(90).multiply(nt), y ? (m = y._transformPoint(x), Ct = y._transformPoint(x.add(Ct)).subtract(m)) : m = b.add(x)), !kt)
                    h.setHandleOut(Ct);
                  else {
                    var Rt = x.rotate(-90).multiply(nt);
                    y && (Rt = y._transformPoint(x.add(Rt)).subtract(m)), yt.push(new Tt(m, Rt, Ct));
                  }
                  x = x.rotate(St);
                }
                this._add(yt);
              }
            },
            lineBy: function() {
              var r = F.read(arguments), a = i(this)._point;
              this.lineTo(a.add(r));
            },
            curveBy: function() {
              var r = arguments, a = F.read(r), u = F.read(r), h = l.read(r), f = i(this)._point;
              this.curveTo(f.add(a), f.add(u), h);
            },
            cubicCurveBy: function() {
              var r = arguments, a = F.read(r), u = F.read(r), h = F.read(r), f = i(this)._point;
              this.cubicCurveTo(
                f.add(a),
                f.add(u),
                f.add(h)
              );
            },
            quadraticCurveBy: function() {
              var r = arguments, a = F.read(r), u = F.read(r), h = i(this)._point;
              this.quadraticCurveTo(h.add(a), h.add(u));
            },
            arcBy: function() {
              var r = arguments, a = i(this)._point, u = a.add(F.read(r)), h = l.pick(l.peek(r), !0);
              typeof h == "boolean" ? this.arcTo(u, h) : this.arcTo(u, a.add(F.read(r)));
            },
            closePath: function(r) {
              this.setClosed(!0), this.join(this, r);
            }
          };
        }(),
        {
          _getBounds: function(i, r) {
            var a = r.handle ? "getHandleBounds" : r.stroke ? "getStrokeBounds" : "getBounds";
            return Jt[a](this._segments, this._closed, this, i, r);
          },
          statics: {
            getBounds: function(i, r, a, u, h, f) {
              var d = i[0];
              if (!d)
                return new ut();
              var c = new Array(6), p = d._transformCoordinates(u, new Array(6)), g = p.slice(0, 2), b = g.slice(), S = new Array(2);
              function x(C) {
                C._transformCoordinates(u, c);
                for (var O = 0; O < 2; O++)
                  ot._addBounds(
                    p[O],
                    p[O + 4],
                    c[O + 2],
                    c[O],
                    O,
                    f ? f[O] : 0,
                    g,
                    b,
                    S
                  );
                var w = p;
                p = c, c = w;
              }
              for (var y = 1, E = i.length; y < E; y++)
                x(i[y]);
              return r && x(d), new ut(g[0], g[1], b[0] - g[0], b[1] - g[1]);
            },
            getStrokeBounds: function(i, r, a, u, h) {
              var f = a.getStyle(), d = f.hasStroke(), c = f.getStrokeWidth(), p = d && a._getStrokeMatrix(u, h), g = d && Jt._getStrokePadding(
                c,
                p
              ), b = Jt.getBounds(
                i,
                r,
                a,
                u,
                h,
                g
              );
              if (!d)
                return b;
              var S = c / 2, x = f.getStrokeJoin(), y = f.getStrokeCap(), E = f.getMiterLimit(), C = new ut(new X(g));
              function O(M) {
                b = b.include(M);
              }
              function w(M) {
                b = b.unite(
                  C.setCenter(M._point.transform(u))
                );
              }
              function P(M, A) {
                A === "round" || M.isSmooth() ? w(M) : Jt._addBevelJoin(
                  M,
                  A,
                  S,
                  E,
                  u,
                  p,
                  O
                );
              }
              function m(M, A) {
                A === "round" ? w(M) : Jt._addSquareCap(
                  M,
                  A,
                  S,
                  u,
                  p,
                  O
                );
              }
              var I = i.length - (r ? 0 : 1);
              if (I > 0) {
                for (var T = 1; T < I; T++)
                  P(i[T], x);
                r ? P(i[0], x) : (m(i[0], y), m(i[i.length - 1], y));
              }
              return b;
            },
            _getStrokePadding: function(i, r) {
              if (!r)
                return [i, i];
              var a = new F(i, 0).transform(r), u = new F(0, i).transform(r), h = a.getAngleInRadians(), f = a.getLength(), d = u.getLength(), c = Math.sin(h), p = Math.cos(h), g = Math.tan(h), b = Math.atan2(d * g, f), S = Math.atan2(d, g * f);
              return [
                Math.abs(f * Math.cos(b) * p + d * Math.sin(b) * c),
                Math.abs(d * Math.sin(S) * p + f * Math.cos(S) * c)
              ];
            },
            _addBevelJoin: function(i, r, a, u, h, f, d, c) {
              var p = i.getCurve(), g = p.getPrevious(), b = p.getPoint1().transform(h), S = g.getNormalAtTime(1).multiply(a).transform(f), x = p.getNormalAtTime(0).multiply(a).transform(f), y = S.getDirectedAngle(x);
              if ((y < 0 || y >= 180) && (S = S.negate(), x = x.negate()), c && d(b), d(b.add(S)), r === "miter") {
                var E = new xt(
                  b.add(S),
                  new F(-S.y, S.x),
                  !0
                ).intersect(new xt(
                  b.add(x),
                  new F(-x.y, x.x),
                  !0
                ), !0);
                E && b.getDistance(E) <= u * a && d(E);
              }
              d(b.add(x));
            },
            _addSquareCap: function(i, r, a, u, h, f, d) {
              var c = i._point.transform(u), p = i.getLocation(), g = p.getNormal().multiply(p.getTime() === 0 ? a : -a).transform(h);
              r === "square" && (d && (f(c.subtract(g)), f(c.add(g))), c = c.add(g.rotate(-90))), f(c.add(g)), f(c.subtract(g));
            },
            getHandleBounds: function(i, r, a, u, h) {
              var f = a.getStyle(), d = h.stroke && f.hasStroke(), c, p;
              if (d) {
                var g = a._getStrokeMatrix(u, h), b = f.getStrokeWidth() / 2, S = b;
                f.getStrokeJoin() === "miter" && (S = b * f.getMiterLimit()), f.getStrokeCap() === "square" && (S = Math.max(S, b * Math.SQRT2)), c = Jt._getStrokePadding(b, g), p = Jt._getStrokePadding(S, g);
              }
              for (var x = new Array(6), y = 1 / 0, E = -y, C = y, O = E, w = 0, P = i.length; w < P; w++) {
                var m = i[w];
                m._transformCoordinates(u, x);
                for (var I = 0; I < 6; I += 2) {
                  var T = I ? c : p, M = T ? T[0] : 0, A = T ? T[1] : 0, R = x[I], V = x[I + 1], B = R - M, H = R + M, D = V - A, j = V + A;
                  B < y && (y = B), H > E && (E = H), D < C && (C = D), j > O && (O = j);
                }
              }
              return new ut(y, C, E - y, O - C);
            }
          }
        }
      );
      Jt.inject({ statics: new function() {
        var i = 0.5522847498307936, r = [
          new Tt([-1, 0], [0, i], [0, -0.5522847498307936]),
          new Tt([0, -1], [-0.5522847498307936, 0], [i, 0]),
          new Tt([1, 0], [0, -0.5522847498307936], [0, i]),
          new Tt([0, 1], [i, 0], [-0.5522847498307936, 0])
        ];
        function a(h, f, d) {
          var c = l.getNamed(d), p = new Jt(c && (c.insert == !0 ? ht.INSERT : c.insert == !1 ? ht.NO_INSERT : null));
          return p._add(h), p._closed = f, p.set(c, ht.INSERT);
        }
        function u(h, f, d) {
          for (var c = new Array(4), p = 0; p < 4; p++) {
            var g = r[p];
            c[p] = new Tt(
              g._point.multiply(f).add(h),
              g._handleIn.multiply(f),
              g._handleOut.multiply(f)
            );
          }
          return a(c, !0, d);
        }
        return {
          Line: function() {
            var h = arguments;
            return a([
              new Tt(F.readNamed(h, "from")),
              new Tt(F.readNamed(h, "to"))
            ], !1, h);
          },
          Circle: function() {
            var h = arguments, f = F.readNamed(h, "center"), d = l.readNamed(h, "radius");
            return u(f, new X(d), h);
          },
          Rectangle: function() {
            var h = arguments, f = ut.readNamed(h, "rectangle"), d = X.readNamed(
              h,
              "radius",
              0,
              { readNull: !0 }
            ), c = f.getBottomLeft(!0), p = f.getTopLeft(!0), g = f.getTopRight(!0), b = f.getBottomRight(!0), S;
            if (!d || d.isZero())
              S = [
                new Tt(c),
                new Tt(p),
                new Tt(g),
                new Tt(b)
              ];
            else {
              d = X.min(d, f.getSize(!0).divide(2));
              var x = d.width, y = d.height, E = x * i, C = y * i;
              S = [
                new Tt(c.add(x, 0), null, [-E, 0]),
                new Tt(c.subtract(0, y), [0, C]),
                new Tt(p.add(0, y), null, [0, -C]),
                new Tt(p.add(x, 0), [-E, 0], null),
                new Tt(g.subtract(x, 0), null, [E, 0]),
                new Tt(g.add(0, y), [0, -C], null),
                new Tt(b.subtract(0, y), null, [0, C]),
                new Tt(b.subtract(x, 0), [E, 0])
              ];
            }
            return a(S, !0, h);
          },
          RoundRectangle: "#Rectangle",
          Ellipse: function() {
            var h = arguments, f = zt._readEllipse(h);
            return u(f.center, f.radius, h);
          },
          Oval: "#Ellipse",
          Arc: function() {
            var h = arguments, f = F.readNamed(h, "from"), d = F.readNamed(h, "through"), c = F.readNamed(h, "to"), p = l.getNamed(h), g = new Jt(p && p.insert == !1 && ht.NO_INSERT);
            return g.moveTo(f), g.arcTo(d, c), g.set(p);
          },
          RegularPolygon: function() {
            for (var h = arguments, f = F.readNamed(h, "center"), d = l.readNamed(h, "sides"), c = l.readNamed(h, "radius"), p = 360 / d, g = d % 3 === 0, b = new F(0, g ? -c : c), S = g ? -1 : 0.5, x = new Array(d), y = 0; y < d; y++)
              x[y] = new Tt(f.add(
                b.rotate((y + S) * p)
              ));
            return a(x, !0, h);
          },
          Star: function() {
            for (var h = arguments, f = F.readNamed(h, "center"), d = l.readNamed(h, "points") * 2, c = l.readNamed(h, "radius1"), p = l.readNamed(h, "radius2"), g = 360 / d, b = new F(0, -1), S = new Array(d), x = 0; x < d; x++)
              S[x] = new Tt(f.add(b.rotate(g * x).multiply(x % 2 ? p : c)));
            return a(S, !0, h);
          }
        };
      }() });
      var Qe = ue.extend(
        {
          _class: "CompoundPath",
          _serializeFields: {
            children: []
          },
          beans: !0,
          initialize: function(r) {
            this._children = [], this._namedChildren = {}, this._initialize(r) || (typeof r == "string" ? this.setPathData(r) : this.addChildren(Array.isArray(r) ? r : arguments));
          },
          insertChildren: function i(r, a) {
            var u = a, h = u[0];
            h && typeof h[0] == "number" && (u = [u]);
            for (var f = a.length - 1; f >= 0; f--) {
              var d = u[f];
              u === a && !(d instanceof Jt) && (u = l.slice(u)), Array.isArray(d) ? u[f] = new Jt({ segments: d, insert: !1 }) : d instanceof Qe && (u.splice.apply(u, [f, 1].concat(d.removeChildren())), d.remove());
            }
            return i.base.call(this, r, u);
          },
          reduce: function i(r) {
            for (var a = this._children, u = a.length - 1; u >= 0; u--) {
              var h = a[u].reduce(r);
              h.isEmpty() && h.remove();
            }
            if (!a.length) {
              var h = new Jt(ht.NO_INSERT);
              return h.copyAttributes(this), h.insertAbove(this), this.remove(), h;
            }
            return i.base.call(this);
          },
          isClosed: function() {
            for (var i = this._children, r = 0, a = i.length; r < a; r++)
              if (!i[r]._closed)
                return !1;
            return !0;
          },
          setClosed: function(i) {
            for (var r = this._children, a = 0, u = r.length; a < u; a++)
              r[a].setClosed(i);
          },
          getFirstSegment: function() {
            var i = this.getFirstChild();
            return i && i.getFirstSegment();
          },
          getLastSegment: function() {
            var i = this.getLastChild();
            return i && i.getLastSegment();
          },
          getCurves: function() {
            for (var i = this._children, r = [], a = 0, u = i.length; a < u; a++)
              l.push(r, i[a].getCurves());
            return r;
          },
          getFirstCurve: function() {
            var i = this.getFirstChild();
            return i && i.getFirstCurve();
          },
          getLastCurve: function() {
            var i = this.getLastChild();
            return i && i.getLastCurve();
          },
          getArea: function() {
            for (var i = this._children, r = 0, a = 0, u = i.length; a < u; a++)
              r += i[a].getArea();
            return r;
          },
          getLength: function() {
            for (var i = this._children, r = 0, a = 0, u = i.length; a < u; a++)
              r += i[a].getLength();
            return r;
          },
          getPathData: function(i, r) {
            for (var a = this._children, u = [], h = 0, f = a.length; h < f; h++) {
              var d = a[h], c = d._matrix;
              u.push(d.getPathData(i && !c.isIdentity() ? i.appended(c) : i, r));
            }
            return u.join("");
          },
          _hitTestChildren: function i(r, a, u) {
            return i.base.call(
              this,
              r,
              a.class === Jt || a.type === "path" ? a : l.set({}, a, { fill: !1 }),
              u
            );
          },
          _draw: function(i, r, a, u) {
            var h = this._children;
            if (h.length) {
              r = r.extend({ dontStart: !0, dontFinish: !0 }), i.beginPath();
              for (var f = 0, d = h.length; f < d; f++)
                h[f].draw(i, r, u);
              if (!r.clip) {
                this._setStyles(i, r, a);
                var c = this._style;
                c.hasFill() && (i.fill(c.getFillRule()), i.shadowColor = "rgba(0,0,0,0)"), c.hasStroke() && i.stroke();
              }
            }
          },
          _drawSelected: function(i, r, a) {
            for (var u = this._children, h = 0, f = u.length; h < f; h++) {
              var d = u[h], c = d._matrix;
              a[d._id] || d._drawSelected(i, c.isIdentity() ? r : r.appended(c));
            }
          }
        },
        new function() {
          function i(r, a) {
            var u = r._children;
            if (a && !u.length)
              throw new Error("Use a moveTo() command first");
            return u[u.length - 1];
          }
          return l.each(
            [
              "lineTo",
              "cubicCurveTo",
              "quadraticCurveTo",
              "curveTo",
              "arcTo",
              "lineBy",
              "cubicCurveBy",
              "quadraticCurveBy",
              "curveBy",
              "arcBy"
            ],
            function(r) {
              this[r] = function() {
                var a = i(this, !0);
                a[r].apply(a, arguments);
              };
            },
            {
              moveTo: function() {
                var r = i(this), a = r && r.isEmpty() ? r : new Jt(ht.NO_INSERT);
                a !== r && this.addChild(a), a.moveTo.apply(a, arguments);
              },
              moveBy: function() {
                var r = i(this, !0), a = r && r.getLastSegment(), u = F.read(arguments);
                this.moveTo(a ? u.add(a._point) : u);
              },
              closePath: function(r) {
                i(this, !0).closePath(r);
              }
            }
          );
        }(),
        l.each(["reverse", "flatten", "simplify", "smooth"], function(i) {
          this[i] = function(r) {
            for (var a = this._children, u, h = 0, f = a.length; h < f; h++)
              u = a[h][i](r) || u;
            return u;
          };
        }, {})
      );
      ue.inject(new function() {
        var i = Math.min, r = Math.max, a = Math.abs, u = {
          unite: { 1: !0, 2: !0 },
          intersect: { 2: !0 },
          subtract: { 1: !0 },
          exclude: { 1: !0, "-1": !0 }
        };
        function h(w) {
          return w._children || [w];
        }
        function f(w, P) {
          var m = w.clone(!1).reduce({ simplify: !0 }).transform(null, !0, !0);
          if (P) {
            for (var I = h(m), T = 0, M = I.length; T < M; T++) {
              var w = I[T];
              !w._closed && !w.isEmpty() && (w.closePath(1e-12), w.getFirstSegment().setHandleIn(0, 0), w.getLastSegment().setHandleOut(0, 0));
            }
            m = m.resolveCrossings().reorient(m.getFillRule() === "nonzero", !0);
          }
          return m;
        }
        function d(w, P, m, I, T) {
          var M = new Qe(ht.NO_INSERT);
          return M.addChildren(w, !0), M = M.reduce({ simplify: P }), T && T.insert == !1 || M.insertAbove(I && m.isSibling(I) && m.getIndex() < I.getIndex() ? I : m), M.copyAttributes(m, !0), M;
        }
        function c(w) {
          return w.hasOverlap() || w.isCrossing();
        }
        function p(w, P, m, I) {
          if (I && (I.trace == !1 || I.stroke) && /^(subtract|intersect)$/.test(m))
            return g(w, P, m);
          var T = f(w, !0), M = P && w !== P && f(P, !0), A = u[m];
          A[m] = !0, M && (A.subtract || A.exclude) ^ (M.isClockwise() ^ T.isClockwise()) && M.reverse();
          var R = y(Ut.expand(
            T.getIntersections(M, c)
          )), V = h(T), B = M && h(M), H = [], D = [], j;
          function G(Ct) {
            for (var Rt = 0, Mt = Ct.length; Rt < Mt; Rt++) {
              var jt = Ct[Rt];
              l.push(H, jt._segments), l.push(D, jt.getCurves()), jt._overlapsOnly = !0;
            }
          }
          function Y(Ct) {
            for (var Rt = [], Mt = 0, jt = Ct && Ct.length; Mt < jt; Mt++)
              Rt.push(D[Ct[Mt]]);
            return Rt;
          }
          if (R.length) {
            G(V), B && G(B);
            for (var $ = new Array(D.length), Q = 0, at = D.length; Q < at; Q++)
              $[Q] = D[Q].getValues();
            for (var dt = N.findCurveBoundsCollisions(
              $,
              $,
              0,
              !0
            ), _t = {}, Q = 0; Q < D.length; Q++) {
              var St = D[Q], et = St._path._id, nt = _t[et] = _t[et] || {};
              nt[St.getIndex()] = {
                hor: Y(dt[Q].hor),
                ver: Y(dt[Q].ver)
              };
            }
            for (var Q = 0, at = R.length; Q < at; Q++)
              C(
                R[Q]._segment,
                T,
                M,
                _t,
                A
              );
            for (var Q = 0, at = H.length; Q < at; Q++) {
              var yt = H[Q], kt = yt._intersection;
              yt._winding || C(
                yt,
                T,
                M,
                _t,
                A
              ), kt && kt._overlap || (yt._path._overlapsOnly = !1);
            }
            j = O(H, A);
          } else
            j = x(
              B ? V.concat(B) : V.slice(),
              function(Ct) {
                return !!A[Ct];
              }
            );
          return d(j, !0, w, P, I);
        }
        function g(w, P, m) {
          var I = f(w), T = f(P), M = I.getIntersections(T, c), A = m === "subtract", R = m === "divide", V = {}, B = [];
          function H(G) {
            if (!V[G._id] && (R || T.contains(G.getPointAt(G.getLength() / 2)) ^ A))
              return B.unshift(G), V[G._id] = !0;
          }
          for (var D = M.length - 1; D >= 0; D--) {
            var j = M[D].split();
            j && (H(j) && j.getFirstSegment().setHandleIn(0, 0), I.getLastSegment().setHandleOut(0, 0));
          }
          return H(I), d(B, !1, w, P);
        }
        function b(w, P) {
          for (var m = w; m; ) {
            if (m === P)
              return;
            m = m._previous;
          }
          for (; w._next && w._next !== P; )
            w = w._next;
          if (!w._next) {
            for (; P._previous; )
              P = P._previous;
            w._next = P, P._previous = w;
          }
        }
        function S(w) {
          for (var P = w.length - 1; P >= 0; P--)
            w[P].clearHandles();
        }
        function x(w, P, m) {
          var I = w && w.length;
          if (I) {
            var T = l.each(w, function(dt, _t) {
              this[dt._id] = {
                container: null,
                winding: dt.isClockwise() ? 1 : -1,
                index: _t
              };
            }, {}), M = w.slice().sort(function(dt, _t) {
              return a(_t.getArea()) - a(dt.getArea());
            }), A = M[0], R = N.findItemBoundsCollisions(
              M,
              null,
              q.GEOMETRIC_EPSILON
            );
            m == null && (m = A.isClockwise());
            for (var V = 0; V < I; V++) {
              var B = M[V], H = T[B._id], D = 0, j = R[V];
              if (j) {
                for (var G = null, Y = j.length - 1; Y >= 0; Y--)
                  if (j[Y] < V) {
                    G = G || B.getInteriorPoint();
                    var $ = M[j[Y]];
                    if ($.contains(G)) {
                      var Q = T[$._id];
                      D = Q.winding, H.winding += D, H.container = Q.exclude ? Q.container : $;
                      break;
                    }
                  }
              }
              if (P(H.winding) === P(D))
                H.exclude = !0, w[H.index] = null;
              else {
                var at = H.container;
                B.setClockwise(
                  at ? !at.isClockwise() : m
                );
              }
            }
          }
          return w;
        }
        function y(w, P, m) {
          var I = P && [], T = 1e-8, M = 1 - T, A = !1, R = m || [], V = m && {}, B, H, D;
          function j(Rt) {
            return Rt._path._id + "." + Rt._segment1._index;
          }
          for (var G = (m && m.length) - 1; G >= 0; G--) {
            var Y = m[G];
            Y._path && (V[j(Y)] = !0);
          }
          for (var G = w.length - 1; G >= 0; G--) {
            var $ = w[G], Q = $._time, at = Q, dt = P && !P($), Y = $._curve, _t;
            if (Y && (Y !== H ? (A = !Y.hasHandles() || V && V[j(Y)], B = [], D = null, H = Y) : D >= T && (Q /= D)), dt) {
              B && B.push($);
              continue;
            } else P && I.unshift($);
            if (D = at, Q < T)
              _t = Y._segment1;
            else if (Q > M)
              _t = Y._segment2;
            else {
              var St = Y.divideAtTime(Q, !0);
              A && R.push(Y, St), _t = St._segment1;
              for (var et = B.length - 1; et >= 0; et--) {
                var nt = B[et];
                nt._time = (nt._time - Q) / (1 - Q);
              }
            }
            $._setSegment(_t);
            var yt = _t._intersection, kt = $._intersection;
            if (yt) {
              b(yt, kt);
              for (var Ct = yt; Ct; )
                b(Ct._intersection, yt), Ct = Ct._next;
            } else
              _t._intersection = kt;
          }
          return m || S(R), I || w;
        }
        function E(w, P, m, I, T) {
          var M = Array.isArray(P) ? P : P[m ? "hor" : "ver"], A = m ? 1 : 0, R = A ^ 1, V = [w.x, w.y], B = V[A], H = V[R], D = 1e-9, j = 1e-6, G = B - D, Y = B + D, $ = 0, Q = 0, at = 0, dt = 0, _t = !1, St = !1, et = 1, nt = [], yt, kt;
          function Ct(ge) {
            var Ne = ge[R + 0], si = ge[R + 6];
            if (!(H < i(Ne, si) || H > r(Ne, si))) {
              var Ue = ge[A + 0], xi = ge[A + 2], dn = ge[A + 4], Ai = ge[A + 6];
              if (Ne === si) {
                (Ue < Y && Ai > G || Ai < Y && Ue > G) && (_t = !0);
                return;
              }
              var Ti = H === Ne ? 0 : H === si || G > r(Ue, xi, dn, Ai) || Y < i(Ue, xi, dn, Ai) ? 1 : ot.solveCubic(ge, R, H, nt, 0, 1) > 0 ? nt[0] : 1, ai = Ti === 0 ? Ue : Ti === 1 ? Ai : ot.getPoint(ge, Ti)[m ? "y" : "x"], hi = Ne > si ? 1 : -1, pn = yt[R] > yt[R + 6] ? 1 : -1, Ei = yt[A + 6];
              return H !== Ne ? (ai < G ? at += hi : ai > Y ? dt += hi : _t = !0, ai > B - j && ai < B + j && (et /= 2)) : (hi !== pn ? Ue < G ? at += hi : Ue > Y && (dt += hi) : Ue != Ei && (Ei < Y && ai > Y ? (dt += hi, _t = !0) : Ei > G && ai < G && (at += hi, _t = !0)), et /= 4), yt = ge, !T && ai > G && ai < Y && ot.getTangent(ge, Ti)[m ? "x" : "y"] === 0 && E(w, P, !m, I, !0);
            }
          }
          function Rt(ge) {
            var Ne = ge[R + 0], si = ge[R + 2], Ue = ge[R + 4], xi = ge[R + 6];
            if (H <= r(Ne, si, Ue, xi) && H >= i(Ne, si, Ue, xi)) {
              for (var dn = ge[A + 0], Ai = ge[A + 2], Ti = ge[A + 4], ai = ge[A + 6], hi = G > r(dn, Ai, Ti, ai) || Y < i(dn, Ai, Ti, ai) ? [ge] : ot.getMonoCurves(ge, m), pn, Ei = 0, ps = hi.length; Ei < ps; Ei++)
                if (pn = Ct(hi[Ei]))
                  return pn;
            }
          }
          for (var Mt = 0, jt = M.length; Mt < jt; Mt++) {
            var Zt = M[Mt], qt = Zt._path, Ve = Zt.getValues(), Be;
            if ((!Mt || M[Mt - 1]._path !== qt) && (yt = null, qt._closed || (kt = ot.getValues(
              qt.getLastCurve().getSegment2(),
              Zt.getSegment1(),
              null,
              !I
            ), kt[R] !== kt[R + 6] && (yt = kt)), !yt)) {
              yt = Ve;
              for (var We = qt.getLastCurve(); We && We !== Zt; ) {
                var Le = We.getValues();
                if (Le[R] !== Le[R + 6]) {
                  yt = Le;
                  break;
                }
                We = We.getPrevious();
              }
            }
            if (Be = Rt(Ve))
              return Be;
            if (Mt + 1 === jt || M[Mt + 1]._path !== qt) {
              if (kt && (Be = Rt(kt)))
                return Be;
              _t && !at && !dt && (at = dt = qt.isClockwise(I) ^ m ? 1 : -1), $ += at, Q += dt, at = dt = 0, _t && (St = !0, _t = !1), kt = null;
            }
          }
          return $ = a($), Q = a(Q), {
            winding: r($, Q),
            windingL: $,
            windingR: Q,
            quality: et,
            onPath: St
          };
        }
        function C(w, P, m, I, T) {
          var M = [], A = w, R = 0, D;
          do {
            var V = w.getCurve();
            if (V) {
              var B = V.getLength();
              M.push({ segment: w, curve: V, length: B }), R += B;
            }
            w = w.getNext();
          } while (w && !w._intersection && w !== A);
          for (var H = [0.5, 0.25, 0.75], D = { winding: 0, quality: -1 }, j = 1e-3, G = 1 - j, Y = 0; Y < H.length && D.quality < 0.5; Y++)
            for (var B = R * H[Y], $ = 0, Q = M.length; $ < Q; $++) {
              var at = M[$], dt = at.length;
              if (B <= dt) {
                var V = at.curve, _t = V._path, St = _t._parent, et = St instanceof Qe ? St : _t, nt = q.clamp(V.getTimeAt(B), j, G), yt = V.getPointAtTime(nt), kt = a(V.getTangentAtTime(nt).y) < Math.SQRT1_2, Ct = null;
                if (T.subtract && m) {
                  var Rt = et === P ? m : P, Mt = Rt._getWinding(yt, kt, !0);
                  if (et === P && Mt.winding || et === m && !Mt.winding) {
                    if (Mt.quality < 1)
                      continue;
                    Ct = { winding: 0, quality: 1 };
                  }
                }
                Ct = Ct || E(
                  yt,
                  I[_t._id][V.getIndex()],
                  kt,
                  !0
                ), Ct.quality > D.quality && (D = Ct);
                break;
              }
              B -= dt;
            }
          for (var $ = M.length - 1; $ >= 0; $--)
            M[$].segment._winding = D;
        }
        function O(w, P) {
          var m = [], I;
          function T(jt) {
            var Zt;
            return !!(jt && !jt._visited && (!P || P[(Zt = jt._winding || {}).winding] && !(P.unite && Zt.winding === 2 && Zt.windingL && Zt.windingR)));
          }
          function M(jt) {
            if (jt) {
              for (var Zt = 0, qt = I.length; Zt < qt; Zt++)
                if (jt === I[Zt])
                  return !0;
            }
            return !1;
          }
          function A(jt) {
            for (var Zt = jt._segments, qt = 0, Ve = Zt.length; qt < Ve; qt++)
              Zt[qt]._visited = !0;
          }
          function R(jt, Zt) {
            var qt = jt._intersection, Ve = qt, Be = [];
            Zt && (I = [jt]);
            function We(Le, ge) {
              for (; Le && Le !== ge; ) {
                var Ne = Le._segment, si = Ne && Ne._path;
                if (si) {
                  var Ue = Ne.getNext() || si.getFirstSegment(), xi = Ue._intersection;
                  Ne !== jt && (M(Ne) || M(Ue) || Ue && T(Ne) && (T(Ue) || xi && T(xi._segment))) && Be.push(Ne), Zt && I.push(Ne);
                }
                Le = Le._next;
              }
            }
            if (qt) {
              for (We(qt); qt && qt._previous; )
                qt = qt._previous;
              We(qt, Ve);
            }
            return Be;
          }
          w.sort(function(jt, Zt) {
            var qt = jt._intersection, Ve = Zt._intersection, Be = !!(qt && qt._overlap), We = !!(Ve && Ve._overlap), Le = jt._path, ge = Zt._path;
            return Be ^ We ? Be ? 1 : -1 : !qt ^ !Ve ? qt ? 1 : -1 : Le !== ge ? Le._id - ge._id : jt._index - Zt._index;
          });
          for (var V = 0, B = w.length; V < B; V++) {
            var H = w[V], D = T(H), j = null, G = !1, Y = !0, $ = [], Q, at, dt;
            if (D && H._path._overlapsOnly) {
              var _t = H._path, St = H._intersection._segment._path;
              _t.compare(St) && (_t.getArea() && m.push(_t.clone(!1)), A(_t), A(St), D = !1);
            }
            for (; D; ) {
              var et = !j, nt = R(H, et), yt = nt.shift(), G = !et && (M(H) || M(yt)), kt = !G && yt;
              if (et && (j = new Jt(ht.NO_INSERT), Q = null), G) {
                (H.isFirst() || H.isLast()) && (Y = H._path._closed), H._visited = !0;
                break;
              }
              if (kt && Q && ($.push(Q), Q = null), Q || (kt && nt.push(H), Q = {
                start: j._segments.length,
                crossings: nt,
                visited: at = [],
                handleIn: dt
              }), kt && (H = yt), !T(H)) {
                j.removeSegments(Q.start);
                for (var Ct = 0, Rt = at.length; Ct < Rt; Ct++)
                  at[Ct]._visited = !1;
                at.length = 0;
                do
                  H = Q && Q.crossings.shift(), (!H || !H._path) && (H = null, Q = $.pop(), Q && (at = Q.visited, dt = Q.handleIn));
                while (Q && !T(H));
                if (!H)
                  break;
              }
              var Mt = H.getNext();
              j.add(new Tt(
                H._point,
                dt,
                Mt && H._handleOut
              )), H._visited = !0, at.push(H), H = Mt || H._path.getFirstSegment(), dt = Mt && Mt._handleIn;
            }
            G && (Y && (j.getFirstSegment().setHandleIn(dt), j.setClosed(Y)), j.getArea() !== 0 && m.push(j));
          }
          return m;
        }
        return {
          _getWinding: function(w, P, m) {
            return E(w, this.getCurves(), P, m);
          },
          unite: function(w, P) {
            return p(this, w, "unite", P);
          },
          intersect: function(w, P) {
            return p(this, w, "intersect", P);
          },
          subtract: function(w, P) {
            return p(this, w, "subtract", P);
          },
          exclude: function(w, P) {
            return p(this, w, "exclude", P);
          },
          divide: function(w, P) {
            return P && (P.trace == !1 || P.stroke) ? g(this, w, "divide") : d([
              this.subtract(w, P),
              this.intersect(w, P)
            ], !0, this, w, P);
          },
          resolveCrossings: function() {
            var w = this._children, P = w || [this];
            function m(Q, at) {
              var dt = Q && Q._intersection;
              return dt && dt._overlap && dt._path === at;
            }
            var I = !1, T = !1, M = this.getIntersections(null, function(Q) {
              return Q.hasOverlap() && (I = !0) || Q.isCrossing() && (T = !0);
            }), A = I && T && [];
            if (M = Ut.expand(M), I)
              for (var R = y(M, function(Q) {
                return Q.hasOverlap();
              }, A), V = R.length - 1; V >= 0; V--) {
                var B = R[V], H = B._path, D = B._segment, j = D.getPrevious(), G = D.getNext();
                m(j, H) && m(G, H) && (D.remove(), j._handleOut._set(0, 0), G._handleIn._set(0, 0), j !== D && !j.getCurve().hasLength() && (G._handleIn.set(j._handleIn), j.remove()));
              }
            T && (y(M, I && function(Q) {
              var at = Q.getCurve(), dt = Q.getSegment(), _t = Q._intersection, St = _t._curve, et = _t._segment;
              if (at && St && at._path && St._path)
                return !0;
              dt && (dt._intersection = null), et && (et._intersection = null);
            }, A), A && S(A), P = O(l.each(P, function(Q) {
              l.push(this, Q._segments);
            }, [])));
            var Y = P.length, $;
            return Y > 1 && w ? (P !== w && this.setChildren(P), $ = this) : Y === 1 && !w && (P[0] !== this && this.setSegments(P[0].removeSegments()), $ = this), $ || ($ = new Qe(ht.NO_INSERT), $.addChildren(P), $ = $.reduce(), $.copyAttributes(this), this.replaceWith($)), $;
          },
          reorient: function(w, P) {
            var m = this._children;
            return m && m.length ? this.setChildren(x(
              this.removeChildren(),
              function(I) {
                return !!(w ? I : I & 1);
              },
              P
            )) : P !== n && this.setClockwise(P), this;
          },
          getInteriorPoint: function() {
            var w = this.getBounds(), P = w.getCenter(!0);
            if (!this.contains(P)) {
              for (var m = this.getCurves(), I = P.y, T = [], M = [], A = 0, R = m.length; A < R; A++) {
                var V = m[A].getValues(), B = V[1], H = V[3], D = V[5], j = V[7];
                if (I >= i(B, H, D, j) && I <= r(B, H, D, j))
                  for (var G = ot.getMonoCurves(V), Y = 0, $ = G.length; Y < $; Y++) {
                    var Q = G[Y], at = Q[1], dt = Q[7];
                    if (at !== dt && (I >= at && I <= dt || I >= dt && I <= at)) {
                      var _t = I === at ? Q[0] : I === dt ? Q[6] : ot.solveCubic(Q, 1, I, M, 0, 1) === 1 ? ot.getPoint(Q, M[0]).x : (Q[0] + Q[6]) / 2;
                      T.push(_t);
                    }
                  }
              }
              T.length > 1 && (T.sort(function(St, et) {
                return St - et;
              }), P.x = (T[0] + T[1]) / 2);
            }
            return P;
          }
        };
      }());
      var Di = l.extend(
        {
          _class: "PathFlattener",
          initialize: function(i, r, a, u, h) {
            var f = [], d = [], c = 0, p = 1 / (a || 32), g = i._segments, b = g[0], S;
            function x(O, w) {
              var P = ot.getValues(O, w, h);
              f.push(P), y(P, O._index, 0, 1);
            }
            function y(O, w, P, m) {
              if (m - P > p && !(u && ot.isStraight(O)) && !ot.isFlatEnough(O, r || 0.25)) {
                var I = ot.subdivide(O, 0.5), T = (P + m) / 2;
                y(I[0], w, P, T), y(I[1], w, T, m);
              } else {
                var M = O[6] - O[0], A = O[7] - O[1], R = Math.sqrt(M * M + A * A);
                R > 0 && (c += R, d.push({
                  offset: c,
                  curve: O,
                  index: w,
                  time: m
                }));
              }
            }
            for (var E = 1, C = g.length; E < C; E++)
              S = g[E], x(b, S), b = S;
            i._closed && x(S || b, g[0]), this.curves = f, this.parts = d, this.length = c, this.index = 0;
          },
          _get: function(i) {
            for (var r = this.parts, a = r.length, u, h = this.index; u = h, !(!h || r[--h].offset < i); )
              ;
            for (; u < a; u++) {
              var f = r[u];
              if (f.offset >= i) {
                this.index = u;
                var d = r[u - 1], c = d && d.index === f.index ? d.time : 0, p = d ? d.offset : 0;
                return {
                  index: f.index,
                  time: c + (f.time - c) * (i - p) / (f.offset - p)
                };
              }
            }
            return {
              index: r[a - 1].index,
              time: 1
            };
          },
          drawPart: function(i, r, a) {
            for (var u = this._get(r), h = this._get(a), f = u.index, d = h.index; f <= d; f++) {
              var c = ot.getPart(
                this.curves[f],
                f === u.index ? u.time : 0,
                f === h.index ? h.time : 1
              );
              f === u.index && i.moveTo(c[0], c[1]), i.bezierCurveTo.apply(i, c.slice(2));
            }
          }
        },
        l.each(
          ot._evaluateMethods,
          function(i) {
            this[i + "At"] = function(r) {
              var a = this._get(r);
              return ot[i](this.curves[a.index], a.time);
            };
          },
          {}
        )
      ), bi = l.extend({
        initialize: function(i) {
          for (var r = this.points = [], a = i._segments, u = i._closed, h = 0, f, d = a.length; h < d; h++) {
            var c = a[h].point;
            (!f || !f.equals(c)) && r.push(f = c.clone());
          }
          u && (r.unshift(r[r.length - 1]), r.push(r[1])), this.closed = u;
        },
        fit: function(i) {
          var r = this.points, a = r.length, u = null;
          return a > 0 && (u = [new Tt(r[0])], a > 1 && (this.fitCubic(
            u,
            i,
            0,
            a - 1,
            r[1].subtract(r[0]),
            r[a - 2].subtract(r[a - 1])
          ), this.closed && (u.shift(), u.pop()))), u;
        },
        fitCubic: function(i, r, a, u, h, f) {
          var d = this.points;
          if (u - a === 1) {
            var c = d[a], p = d[u], g = c.getDistance(p) / 3;
            this.addCurve(i, [
              c,
              c.add(h.normalize(g)),
              p.add(f.normalize(g)),
              p
            ]);
            return;
          }
          for (var b = this.chordLengthParameterize(a, u), S = Math.max(r, r * r), x, y = !0, E = 0; E <= 4; E++) {
            var C = this.generateBezier(a, u, b, h, f), O = this.findMaxError(a, u, C, b);
            if (O.error < r && y) {
              this.addCurve(i, C);
              return;
            }
            if (x = O.index, O.error >= S)
              break;
            y = this.reparameterize(a, u, b, C), S = O.error;
          }
          var w = d[x - 1].subtract(d[x + 1]);
          this.fitCubic(i, r, a, x, h, w), this.fitCubic(i, r, x, u, w.negate(), f);
        },
        addCurve: function(i, r) {
          var a = i[i.length - 1];
          a.setHandleOut(r[1].subtract(r[0])), i.push(new Tt(r[3], r[2].subtract(r[3])));
        },
        generateBezier: function(i, r, a, u, h) {
          for (var f = 1e-12, d = Math.abs, c = this.points, p = c[i], g = c[r], b = [[0, 0], [0, 0]], S = [0, 0], x = 0, y = r - i + 1; x < y; x++) {
            var E = a[x], C = 1 - E, O = 3 * E * C, w = C * C * C, P = O * C, m = O * E, I = E * E * E, T = u.normalize(P), M = h.normalize(m), A = c[i + x].subtract(p.multiply(w + P)).subtract(g.multiply(m + I));
            b[0][0] += T.dot(T), b[0][1] += T.dot(M), b[1][0] = b[0][1], b[1][1] += M.dot(M), S[0] += T.dot(A), S[1] += M.dot(A);
          }
          var R = b[0][0] * b[1][1] - b[1][0] * b[0][1], V, B;
          if (d(R) > f) {
            var H = b[0][0] * S[1] - b[1][0] * S[0], D = S[0] * b[1][1] - S[1] * b[0][1];
            V = D / R, B = H / R;
          } else {
            var j = b[0][0] + b[0][1], G = b[1][0] + b[1][1];
            V = B = d(j) > f ? S[0] / j : d(G) > f ? S[1] / G : 0;
          }
          var Y = g.getDistance(p), $ = f * Y, Q, at;
          if (V < $ || B < $)
            V = B = Y / 3;
          else {
            var dt = g.subtract(p);
            Q = u.normalize(V), at = h.normalize(B), Q.dot(dt) - at.dot(dt) > Y * Y && (V = B = Y / 3, Q = at = null);
          }
          return [
            p,
            p.add(Q || u.normalize(V)),
            g.add(at || h.normalize(B)),
            g
          ];
        },
        reparameterize: function(i, r, a, u) {
          for (var h = i; h <= r; h++)
            a[h - i] = this.findRoot(u, this.points[h], a[h - i]);
          for (var h = 1, f = a.length; h < f; h++)
            if (a[h] <= a[h - 1])
              return !1;
          return !0;
        },
        findRoot: function(i, r, a) {
          for (var u = [], h = [], f = 0; f <= 2; f++)
            u[f] = i[f + 1].subtract(i[f]).multiply(3);
          for (var f = 0; f <= 1; f++)
            h[f] = u[f + 1].subtract(u[f]).multiply(2);
          var d = this.evaluate(3, i, a), c = this.evaluate(2, u, a), p = this.evaluate(1, h, a), g = d.subtract(r), b = c.dot(c) + g.dot(p);
          return q.isMachineZero(b) ? a : a - g.dot(c) / b;
        },
        evaluate: function(i, r, a) {
          for (var u = r.slice(), h = 1; h <= i; h++)
            for (var f = 0; f <= i - h; f++)
              u[f] = u[f].multiply(1 - a).add(u[f + 1].multiply(a));
          return u[0];
        },
        chordLengthParameterize: function(i, r) {
          for (var a = [0], u = i + 1; u <= r; u++)
            a[u - i] = a[u - i - 1] + this.points[u].getDistance(this.points[u - 1]);
          for (var u = 1, h = r - i; u <= h; u++)
            a[u] /= a[h];
          return a;
        },
        findMaxError: function(i, r, a, u) {
          for (var h = Math.floor((r - i + 1) / 2), f = 0, d = i + 1; d < r; d++) {
            var c = this.evaluate(3, a, u[d - i]), p = c.subtract(this.points[d]), g = p.x * p.x + p.y * p.y;
            g >= f && (f = g, h = d);
          }
          return {
            error: f,
            index: h
          };
        }
      }), Mn = ht.extend({
        _class: "TextItem",
        _applyMatrix: !1,
        _canApplyMatrix: !1,
        _serializeFields: {
          content: null
        },
        _boundsOptions: { stroke: !1, handle: !1 },
        initialize: function(r) {
          this._content = "", this._lines = [];
          var a = r && l.isPlainObject(r) && r.x === n && r.y === n;
          this._initialize(a && r, !a && F.read(arguments));
        },
        _equals: function(i) {
          return this._content === i._content;
        },
        copyContent: function(i) {
          this.setContent(i._content);
        },
        getContent: function() {
          return this._content;
        },
        setContent: function(i) {
          this._content = "" + i, this._lines = this._content.split(/\r\n|\n|\r/mg), this._changed(521);
        },
        isEmpty: function() {
          return !this._content;
        },
        getCharacterStyle: "#getStyle",
        setCharacterStyle: "#setStyle",
        getParagraphStyle: "#getStyle",
        setParagraphStyle: "#setStyle"
      }), ya = Mn.extend({
        _class: "PointText",
        initialize: function() {
          Mn.apply(this, arguments);
        },
        getPoint: function() {
          var i = this._matrix.getTranslation();
          return new mt(i.x, i.y, this, "setPoint");
        },
        setPoint: function() {
          var i = F.read(arguments);
          this.translate(i.subtract(this._matrix.getTranslation()));
        },
        _draw: function(i, r, a) {
          if (this._content) {
            this._setStyles(i, r, a);
            var u = this._lines, h = this._style, f = h.hasFill(), d = h.hasStroke(), c = h.getLeading(), p = i.shadowColor;
            i.font = h.getFontStyle(), i.textAlign = h.getJustification();
            for (var g = 0, b = u.length; g < b; g++) {
              i.shadowColor = p;
              var S = u[g];
              f && (i.fillText(S, 0, 0), i.shadowColor = "rgba(0,0,0,0)"), d && i.strokeText(S, 0, 0), i.translate(0, c);
            }
          }
        },
        _getBounds: function(i, r) {
          var a = this._style, u = this._lines, h = u.length, f = a.getJustification(), d = a.getLeading(), c = this.getView().getTextWidth(a.getFontStyle(), u), p = 0;
          f !== "left" && (p -= c / (f === "center" ? 2 : 1));
          var g = new ut(
            p,
            h ? -0.75 * d : 0,
            c,
            h * d
          );
          return i ? i._transformBounds(g, g) : g;
        }
      }), Me = l.extend(
        new function() {
          var i = {
            gray: ["gray"],
            rgb: ["red", "green", "blue"],
            hsb: ["hue", "saturation", "brightness"],
            hsl: ["hue", "saturation", "lightness"],
            gradient: ["gradient", "origin", "destination", "highlight"]
          }, r = {}, a = {
            transparent: [0, 0, 0, 0]
          }, u;
          function h(c) {
            var p = c.match(
              /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i
            ) || c.match(
              /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i
            ), g = "rgb", b;
            if (p) {
              var S = p[4] ? 4 : 3;
              b = new Array(S);
              for (var x = 0; x < S; x++) {
                var y = p[x + 1];
                b[x] = parseInt(y.length == 1 ? y + y : y, 16) / 255;
              }
            } else if (p = c.match(/^(rgb|hsl)a?\((.*)\)$/)) {
              g = p[1], b = p[2].trim().split(/[,\s]+/g);
              for (var E = g === "hsl", x = 0, C = Math.min(b.length, 4); x < C; x++) {
                var O = b[x], y = parseFloat(O);
                if (E)
                  if (x === 0) {
                    var w = O.match(/([a-z]*)$/)[1];
                    y *= {
                      turn: 360,
                      rad: 180 / Math.PI,
                      grad: 0.9
                    }[w] || 1;
                  } else x < 3 && (y /= 100);
                else x < 3 && (y /= /%$/.test(O) ? 100 : 255);
                b[x] = y;
              }
            } else {
              var P = a[c];
              if (!P)
                if (s) {
                  u || (u = st.getContext(1, 1, {
                    willReadFrequently: !0
                  }), u.globalCompositeOperation = "copy"), u.fillStyle = "rgba(0,0,0,0)", u.fillStyle = c, u.fillRect(0, 0, 1, 1);
                  var m = u.getImageData(0, 0, 1, 1).data;
                  P = a[c] = [
                    m[0] / 255,
                    m[1] / 255,
                    m[2] / 255
                  ];
                } else
                  P = [0, 0, 0];
              b = P.slice();
            }
            return [g, b];
          }
          var f = [
            [0, 3, 1],
            [2, 0, 1],
            [1, 0, 3],
            [1, 2, 0],
            [3, 1, 0],
            [0, 1, 2]
          ], d = {
            "rgb-hsb": function(c, p, g) {
              var b = Math.max(c, p, g), S = Math.min(c, p, g), x = b - S, y = x === 0 ? 0 : (b == c ? (p - g) / x + (p < g ? 6 : 0) : b == p ? (g - c) / x + 2 : (c - p) / x + 4) * 60;
              return [y, b === 0 ? 0 : x / b, b];
            },
            "hsb-rgb": function(c, p, g) {
              c = (c / 60 % 6 + 6) % 6;
              var S = Math.floor(c), b = c - S, S = f[S], x = [
                g,
                g * (1 - p),
                g * (1 - p * b),
                g * (1 - p * (1 - b))
              ];
              return [x[S[0]], x[S[1]], x[S[2]]];
            },
            "rgb-hsl": function(c, p, g) {
              var b = Math.max(c, p, g), S = Math.min(c, p, g), x = b - S, y = x === 0, E = y ? 0 : (b == c ? (p - g) / x + (p < g ? 6 : 0) : b == p ? (g - c) / x + 2 : (c - p) / x + 4) * 60, C = (b + S) / 2, O = y ? 0 : C < 0.5 ? x / (b + S) : x / (2 - b - S);
              return [E, O, C];
            },
            "hsl-rgb": function(c, p, g) {
              if (c = (c / 360 % 1 + 1) % 1, p === 0)
                return [g, g, g];
              for (var b = [c + 1 / 3, c, c - 1 / 3], S = g < 0.5 ? g * (1 + p) : g + p - g * p, x = 2 * g - S, y = [], E = 0; E < 3; E++) {
                var C = b[E];
                C < 0 && (C += 1), C > 1 && (C -= 1), y[E] = 6 * C < 1 ? x + (S - x) * 6 * C : 2 * C < 1 ? S : 3 * C < 2 ? x + (S - x) * (2 / 3 - C) * 6 : x;
              }
              return y;
            },
            "rgb-gray": function(c, p, g) {
              return [c * 0.2989 + p * 0.587 + g * 0.114];
            },
            "gray-rgb": function(c) {
              return [c, c, c];
            },
            "gray-hsb": function(c) {
              return [0, 0, c];
            },
            "gray-hsl": function(c) {
              return [0, 0, c];
            },
            "gradient-rgb": function() {
              return [];
            },
            "rgb-gradient": function() {
              return [];
            }
          };
          return l.each(i, function(c, p) {
            r[p] = [], l.each(c, function(g, b) {
              var S = l.capitalize(g), x = /^(hue|saturation)$/.test(g), y = r[p][b] = p === "gradient" ? g === "gradient" ? function(E) {
                var C = this._components[0];
                return E = Vi.read(
                  Array.isArray(E) ? E : arguments,
                  0,
                  { readNull: !0 }
                ), C !== E && (C && C._removeOwner(this), E && E._addOwner(this)), E;
              } : function() {
                return F.read(arguments, 0, {
                  readNull: g === "highlight",
                  clone: !0
                });
              } : function(E) {
                return E == null || isNaN(E) ? 0 : +E;
              };
              this["get" + S] = function() {
                return this._type === p || x && /^hs[bl]$/.test(this._type) ? this._components[b] : this._convert(p)[b];
              }, this["set" + S] = function(E) {
                this._type !== p && !(x && /^hs[bl]$/.test(this._type)) && (this._components = this._convert(p), this._properties = i[p], this._type = p), this._components[b] = y.call(this, E), this._changed();
              };
            }, this);
          }, {
            _class: "Color",
            _readIndex: !0,
            initialize: function c(p) {
              var g = arguments, b = this.__read, S = 0, x, y, E, C;
              Array.isArray(p) && (g = p, p = g[0]);
              var O = p != null && typeof p;
              if (O === "string" && p in i && (x = p, p = g[1], Array.isArray(p) ? (y = p, E = g[2]) : (b && (S = 1), g = l.slice(g, 1), O = typeof p)), !y) {
                if (C = O === "number" ? g : O === "object" && p.length != null ? p : null, C) {
                  x || (x = C.length >= 3 ? "rgb" : "gray");
                  var w = i[x].length;
                  E = C[w], b && (S += C === arguments ? w + (E != null ? 1 : 0) : 1), C.length > w && (C = l.slice(C, 0, w));
                } else if (O === "string") {
                  var P = h(p);
                  x = P[0], y = P[1], y.length === 4 && (E = y[3], y.length--);
                } else if (O === "object")
                  if (p.constructor === c) {
                    if (x = p._type, y = p._components.slice(), E = p._alpha, x === "gradient")
                      for (var m = 1, I = y.length; m < I; m++) {
                        var T = y[m];
                        T && (y[m] = T.clone());
                      }
                  } else if (p.constructor === Vi)
                    x = "gradient", C = g;
                  else {
                    x = "hue" in p ? "lightness" in p ? "hsl" : "hsb" : "gradient" in p || "stops" in p || "radial" in p ? "gradient" : "gray" in p ? "gray" : "rgb";
                    var M = i[x], A = r[x];
                    this._components = y = [];
                    for (var m = 0, I = M.length; m < I; m++) {
                      var R = p[M[m]];
                      R == null && !m && x === "gradient" && "stops" in p && (R = {
                        stops: p.stops,
                        radial: p.radial
                      }), R = A[m].call(this, R), R != null && (y[m] = R);
                    }
                    E = p.alpha;
                  }
                b && x && (S = 1);
              }
              if (this._type = x || "rgb", !y) {
                this._components = y = [];
                for (var A = r[this._type], m = 0, I = A.length; m < I; m++) {
                  var R = A[m].call(this, C && C[m]);
                  R != null && (y[m] = R);
                }
              }
              return this._components = y, this._properties = i[this._type], this._alpha = E, b && (this.__read = S), this;
            },
            set: "#initialize",
            _serialize: function(c, p) {
              var g = this.getComponents();
              return l.serialize(
                /^(gray|rgb)$/.test(this._type) ? g : [this._type].concat(g),
                c,
                !0,
                p
              );
            },
            _changed: function() {
              this._canvasStyle = null, this._owner && (this._setter ? this._owner[this._setter](this) : this._owner._changed(129));
            },
            _convert: function(c) {
              var p;
              return this._type === c ? this._components.slice() : (p = d[this._type + "-" + c]) ? p.apply(this, this._components) : d["rgb-" + c].apply(
                this,
                d[this._type + "-rgb"].apply(
                  this,
                  this._components
                )
              );
            },
            convert: function(c) {
              return new Me(c, this._convert(c), this._alpha);
            },
            getType: function() {
              return this._type;
            },
            setType: function(c) {
              this._components = this._convert(c), this._properties = i[c], this._type = c;
            },
            getComponents: function() {
              var c = this._components.slice();
              return this._alpha != null && c.push(this._alpha), c;
            },
            getAlpha: function() {
              return this._alpha != null ? this._alpha : 1;
            },
            setAlpha: function(c) {
              this._alpha = c == null ? null : Math.min(Math.max(c, 0), 1), this._changed();
            },
            hasAlpha: function() {
              return this._alpha != null;
            },
            equals: function(c) {
              var p = l.isPlainValue(c, !0) ? Me.read(arguments) : c;
              return p === this || p && this._class === p._class && this._type === p._type && this.getAlpha() === p.getAlpha() && l.equals(this._components, p._components) || !1;
            },
            toString: function() {
              for (var c = this._properties, p = [], g = this._type === "gradient", b = z.instance, S = 0, x = c.length; S < x; S++) {
                var y = this._components[S];
                y != null && p.push(c[S] + ": " + (g ? y : b.number(y)));
              }
              return this._alpha != null && p.push("alpha: " + b.number(this._alpha)), "{ " + p.join(", ") + " }";
            },
            toCSS: function(c) {
              var p = this._convert("rgb"), g = c || this._alpha == null ? 1 : this._alpha;
              function b(S) {
                return Math.round((S < 0 ? 0 : S > 1 ? 1 : S) * 255);
              }
              return p = [
                b(p[0]),
                b(p[1]),
                b(p[2])
              ], g < 1 && p.push(g < 0 ? 0 : g), c ? "#" + ((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1) : (p.length == 4 ? "rgba(" : "rgb(") + p.join(",") + ")";
            },
            toCanvasStyle: function(c, p) {
              if (this._canvasStyle)
                return this._canvasStyle;
              if (this._type !== "gradient")
                return this._canvasStyle = this.toCSS();
              var g = this._components, b = g[0], S = b._stops, x = g[1], y = g[2], E = g[3], C = p && p.inverted(), O;
              if (C && (x = C._transformPoint(x), y = C._transformPoint(y), E && (E = C._transformPoint(E))), b._radial) {
                var w = y.getDistance(x);
                if (E) {
                  var P = E.subtract(x);
                  P.getLength() > w && (E = x.add(P.normalize(w - 0.1)));
                }
                var m = E || x;
                O = c.createRadialGradient(
                  m.x,
                  m.y,
                  0,
                  x.x,
                  x.y,
                  w
                );
              } else
                O = c.createLinearGradient(
                  x.x,
                  x.y,
                  y.x,
                  y.y
                );
              for (var I = 0, T = S.length; I < T; I++) {
                var M = S[I], A = M._offset;
                O.addColorStop(
                  A ?? I / (T - 1),
                  M._color.toCanvasStyle()
                );
              }
              return this._canvasStyle = O;
            },
            transform: function(c) {
              if (this._type === "gradient") {
                for (var p = this._components, g = 1, b = p.length; g < b; g++) {
                  var S = p[g];
                  c._transformPoint(S, S, !0);
                }
                this._changed();
              }
            },
            statics: {
              _types: i,
              random: function() {
                var c = Math.random;
                return new Me(c(), c(), c());
              },
              _setOwner: function(c, p, g) {
                return c && (c._owner && p && c._owner !== p && (c = c.clone()), !c._owner ^ !p && (c._owner = p || null, c._setter = g || null)), c;
              }
            }
          });
        }(),
        new function() {
          var i = {
            add: function(r, a) {
              return r + a;
            },
            subtract: function(r, a) {
              return r - a;
            },
            multiply: function(r, a) {
              return r * a;
            },
            divide: function(r, a) {
              return r / a;
            }
          };
          return l.each(i, function(r, a) {
            this[a] = function(u) {
              u = Me.read(arguments);
              for (var h = this._type, f = this._components, d = u._convert(h), c = 0, p = f.length; c < p; c++)
                d[c] = r(f[c], d[c]);
              return new Me(
                h,
                d,
                this._alpha != null ? r(this._alpha, u.getAlpha()) : null
              );
            };
          }, {});
        }()
      ), Vi = l.extend({
        _class: "Gradient",
        initialize: function(r, a) {
          this._id = tt.get(), r && l.isPlainObject(r) && (this.set(r), r = a = null), this._stops == null && this.setStops(r || ["white", "black"]), this._radial == null && this.setRadial(typeof a == "string" && a === "radial" || a || !1);
        },
        _serialize: function(i, r) {
          return r.add(this, function() {
            return l.serialize(
              [this._stops, this._radial],
              i,
              !0,
              r
            );
          });
        },
        _changed: function() {
          for (var i = 0, r = this._owners && this._owners.length; i < r; i++)
            this._owners[i]._changed();
        },
        _addOwner: function(i) {
          this._owners || (this._owners = []), this._owners.push(i);
        },
        _removeOwner: function(i) {
          var r = this._owners ? this._owners.indexOf(i) : -1;
          r != -1 && (this._owners.splice(r, 1), this._owners.length || (this._owners = n));
        },
        clone: function() {
          for (var i = [], r = 0, a = this._stops.length; r < a; r++)
            i[r] = this._stops[r].clone();
          return new Vi(i, this._radial);
        },
        getStops: function() {
          return this._stops;
        },
        setStops: function(i) {
          if (i.length < 2)
            throw new Error(
              "Gradient stop list needs to contain at least two stops."
            );
          var r = this._stops;
          if (r)
            for (var a = 0, u = r.length; a < u; a++)
              r[a]._owner = n;
          r = this._stops = cn.readList(i, 0, { clone: !0 });
          for (var a = 0, u = r.length; a < u; a++)
            r[a]._owner = this;
          this._changed();
        },
        getRadial: function() {
          return this._radial;
        },
        setRadial: function(i) {
          this._radial = i, this._changed();
        },
        equals: function(i) {
          if (i === this)
            return !0;
          if (i && this._class === i._class) {
            var r = this._stops, a = i._stops, u = r.length;
            if (u === a.length) {
              for (var h = 0; h < u; h++)
                if (!r[h].equals(a[h]))
                  return !1;
              return !0;
            }
          }
          return !1;
        }
      }), cn = l.extend({
        _class: "GradientStop",
        initialize: function(r, a) {
          var u = r, h = a;
          typeof r == "object" && a === n && (Array.isArray(r) && typeof r[0] != "number" ? (u = r[0], h = r[1]) : ("color" in r || "offset" in r || "rampPoint" in r) && (u = r.color, h = r.offset || r.rampPoint || 0)), this.setColor(u), this.setOffset(h);
        },
        clone: function() {
          return new cn(this._color.clone(), this._offset);
        },
        _serialize: function(i, r) {
          var a = this._color, u = this._offset;
          return l.serialize(
            u == null ? [a] : [a, u],
            i,
            !0,
            r
          );
        },
        _changed: function() {
          this._owner && this._owner._changed(129);
        },
        getOffset: function() {
          return this._offset;
        },
        setOffset: function(i) {
          this._offset = i, this._changed();
        },
        getRampPoint: "#getOffset",
        setRampPoint: "#setOffset",
        getColor: function() {
          return this._color;
        },
        setColor: function() {
          Me._setOwner(this._color, null), this._color = Me._setOwner(
            Me.read(arguments, 0),
            this,
            "setColor"
          ), this._changed();
        },
        equals: function(i) {
          return i === this || i && this._class === i._class && this._color.equals(i._color) && this._offset == i._offset || !1;
        }
      }), Ln = l.extend(new function() {
        var i = {
          fillColor: null,
          fillRule: "nonzero",
          strokeColor: null,
          strokeWidth: 1,
          strokeCap: "butt",
          strokeJoin: "miter",
          strokeScaling: !0,
          miterLimit: 10,
          dashOffset: 0,
          dashArray: [],
          shadowColor: null,
          shadowBlur: 0,
          shadowOffset: new F(),
          selectedColor: null
        }, r = l.set({}, i, {
          fontFamily: "sans-serif",
          fontWeight: "normal",
          fontSize: 12,
          leading: null,
          justification: "left"
        }), a = l.set({}, r, {
          fillColor: new Me()
        }), u = {
          strokeWidth: 193,
          strokeCap: 193,
          strokeJoin: 193,
          strokeScaling: 201,
          miterLimit: 193,
          fontFamily: 9,
          fontWeight: 9,
          fontSize: 9,
          font: 9,
          leading: 9,
          justification: 9
        }, h = {
          beans: !0
        }, f = {
          _class: "Style",
          beans: !0,
          initialize: function(c, p, g) {
            this._values = {}, this._owner = p, this._project = p && p._project || g || gt.project, this._defaults = !p || p instanceof At ? r : p instanceof Mn ? a : i, c && this.set(c);
          }
        };
        return l.each(r, function(d, c) {
          var p = /Color$/.test(c), g = c === "shadowOffset", b = l.capitalize(c), S = u[c], x = "set" + b, y = "get" + b;
          f[x] = function(E) {
            var C = this._owner, O = C && C._children, w = O && O.length > 0 && !(C instanceof Qe);
            if (w)
              for (var P = 0, m = O.length; P < m; P++)
                O[P]._style[x](E);
            if ((c === "selectedColor" || !w) && c in this._defaults) {
              var I = this._values[c];
              I !== E && (p && (I && (Me._setOwner(I, null), I._canvasStyle = null), E && E.constructor === Me && (E = Me._setOwner(
                E,
                C,
                w && x
              ))), this._values[c] = E, C && C._changed(S || 129));
            }
          }, f[y] = function(E) {
            var C = this._owner, O = C && C._children, w = O && O.length > 0 && !(C instanceof Qe), P;
            if (w && !E)
              for (var m = 0, I = O.length; m < I; m++) {
                var T = O[m]._style[y]();
                if (!m)
                  P = T;
                else if (!l.equals(P, T))
                  return n;
              }
            else if (c in this._defaults) {
              var P = this._values[c];
              if (P === n)
                P = this._defaults[c], P && P.clone && (P = P.clone());
              else {
                var M = p ? Me : g ? F : null;
                M && !(P && P.constructor === M) && (this._values[c] = P = M.read(
                  [P],
                  0,
                  { readNull: !0, clone: !0 }
                ));
              }
            }
            return P && p && (P = Me._setOwner(P, C, w && x)), P;
          }, h[y] = function(E) {
            return this._style[y](E);
          }, h[x] = function(E) {
            this._style[x](E);
          };
        }), l.each({
          Font: "FontFamily",
          WindingRule: "FillRule"
        }, function(d, c) {
          var p = "get" + c, g = "set" + c;
          f[p] = h[p] = "#get" + d, f[g] = h[g] = "#set" + d;
        }), ht.inject(h), f;
      }(), {
        set: function(i) {
          var r = i instanceof Ln, a = r ? i._values : i;
          if (a) {
            for (var u in a)
              if (u in this._defaults) {
                var h = a[u];
                this[u] = h && r && h.clone ? h.clone() : h;
              }
          }
        },
        equals: function(i) {
          function r(a, u, h) {
            var f = a._values, d = u._values, c = u._defaults;
            for (var p in f) {
              var g = f[p], b = d[p];
              if (!(h && p in d) && !l.equals(
                g,
                b === n ? c[p] : b
              ))
                return !1;
            }
            return !0;
          }
          return i === this || i && this._class === i._class && r(this, i) && r(i, this, !0) || !1;
        },
        _dispose: function() {
          var i;
          i = this.getFillColor(), i && (i._canvasStyle = null), i = this.getStrokeColor(), i && (i._canvasStyle = null), i = this.getShadowColor(), i && (i._canvasStyle = null);
        },
        hasFill: function() {
          var i = this.getFillColor();
          return !!i && i.alpha > 0;
        },
        hasStroke: function() {
          var i = this.getStrokeColor();
          return !!i && i.alpha > 0 && this.getStrokeWidth() > 0;
        },
        hasShadow: function() {
          var i = this.getShadowColor();
          return !!i && i.alpha > 0 && (this.getShadowBlur() > 0 || !this.getShadowOffset().isZero());
        },
        getView: function() {
          return this._project._view;
        },
        getFontStyle: function() {
          var i = this.getFontSize();
          return this.getFontWeight() + " " + i + (/[a-z]/i.test(i + "") ? " " : "px ") + this.getFontFamily();
        },
        getFont: "#getFontFamily",
        setFont: "#setFontFamily",
        getLeading: function i() {
          var r = i.base.call(this), a = this.getFontSize();
          return /pt|em|%|px/.test(a) && (a = this.getView().getPixelSize(a)), r ?? a * 1.2;
        }
      }), Ce = new function() {
        function i(r, a, u, h) {
          for (var f = ["", "webkit", "moz", "Moz", "ms", "o"], d = a[0].toUpperCase() + a.substring(1), c = 0; c < 6; c++) {
            var p = f[c], g = p ? p + d : a;
            if (g in r) {
              if (u)
                r[g] = h;
              else
                return r[g];
              break;
            }
          }
        }
        return {
          getStyles: function(r) {
            var a = r && r.nodeType !== 9 ? r.ownerDocument : r, u = a && a.defaultView;
            return u && u.getComputedStyle(r, "");
          },
          getBounds: function(r, a) {
            var u = r.ownerDocument, h = u.body, f = u.documentElement, d;
            try {
              d = r.getBoundingClientRect();
            } catch {
              d = { left: 0, top: 0, width: 0, height: 0 };
            }
            var c = d.left - (f.clientLeft || h.clientLeft || 0), p = d.top - (f.clientTop || h.clientTop || 0);
            if (!a) {
              var g = u.defaultView;
              c += g.pageXOffset || f.scrollLeft || h.scrollLeft, p += g.pageYOffset || f.scrollTop || h.scrollTop;
            }
            return new ut(c, p, d.width, d.height);
          },
          getViewportBounds: function(r) {
            var a = r.ownerDocument, u = a.defaultView, h = a.documentElement;
            return new ut(
              0,
              0,
              u.innerWidth || h.clientWidth,
              u.innerHeight || h.clientHeight
            );
          },
          getOffset: function(r, a) {
            return Ce.getBounds(r, a).getPoint();
          },
          getSize: function(r) {
            return Ce.getBounds(r, !0).getSize();
          },
          isInvisible: function(r) {
            return Ce.getSize(r).equals(new X(0, 0));
          },
          isInView: function(r) {
            return !Ce.isInvisible(r) && Ce.getViewportBounds(r).intersects(
              Ce.getBounds(r, !0)
            );
          },
          isInserted: function(r) {
            return o.body.contains(r);
          },
          getPrefixed: function(r, a) {
            return r && i(r, a);
          },
          setPrefixed: function(r, a, u) {
            if (typeof a == "object")
              for (var h in a)
                i(r, h, !0, a[h]);
            else
              i(r, a, !0, u);
          }
        };
      }(), xe = {
        add: function(i, r) {
          if (i)
            for (var a in r)
              for (var u = r[a], h = a.split(/[\s,]+/g), f = 0, d = h.length; f < d; f++) {
                var c = h[f], p = i === o && (c === "touchstart" || c === "touchmove") ? { passive: !1 } : !1;
                i.addEventListener(c, u, p);
              }
        },
        remove: function(i, r) {
          if (i)
            for (var a in r)
              for (var u = r[a], h = a.split(/[\s,]+/g), f = 0, d = h.length; f < d; f++)
                i.removeEventListener(h[f], u, !1);
        },
        getPoint: function(i) {
          var r = i.targetTouches ? i.targetTouches.length ? i.targetTouches[0] : i.changedTouches[0] : i;
          return new F(
            r.pageX || r.clientX + o.documentElement.scrollLeft,
            r.pageY || r.clientY + o.documentElement.scrollTop
          );
        },
        getTarget: function(i) {
          return i.target || i.srcElement;
        },
        getRelatedTarget: function(i) {
          return i.relatedTarget || i.toElement;
        },
        getOffset: function(i, r) {
          return xe.getPoint(i).subtract(Ce.getOffset(
            r || xe.getTarget(i)
          ));
        }
      };
      xe.requestAnimationFrame = new function() {
        var i = Ce.getPrefixed(s, "requestAnimationFrame"), r = !1, a = [], u;
        function h() {
          var f = a;
          a = [];
          for (var d = 0, c = f.length; d < c; d++)
            f[d]();
          r = i && a.length, r && i(h);
        }
        return function(f) {
          a.push(f), i ? r || (i(h), r = !0) : u || (u = setInterval(h, 1e3 / 60));
        };
      }();
      var ke = l.extend(
        _,
        {
          _class: "View",
          initialize: function i(r, a) {
            function u(S) {
              return a[S] || parseInt(a.getAttribute(S), 10);
            }
            function h() {
              var S = Ce.getSize(a);
              return S.isNaN() || S.isZero() ? new X(u("width"), u("height")) : S;
            }
            var f;
            if (s && a) {
              this._id = a.getAttribute("id"), this._id == null && a.setAttribute("id", this._id = "paper-view-" + i._id++), xe.add(a, this._viewEvents);
              var d = "none";
              if (Ce.setPrefixed(a.style, {
                userDrag: d,
                userSelect: d,
                touchCallout: d,
                contentZooming: d,
                tapHighlightColor: "rgba(0,0,0,0)"
              }), v.hasAttribute(a, "resize")) {
                var c = this;
                xe.add(s, this._windowEvents = {
                  resize: function() {
                    c.setViewSize(h());
                  }
                });
              }
              if (f = h(), v.hasAttribute(a, "stats") && typeof Stats < "u") {
                this._stats = new Stats();
                var p = this._stats.domElement, g = p.style, b = Ce.getOffset(a);
                g.position = "absolute", g.left = b.x + "px", g.top = b.y + "px", o.body.appendChild(p);
              }
            } else
              f = new X(a), a = null;
            this._project = r, this._scope = r._scope, this._element = a, this._pixelRatio || (this._pixelRatio = s && s.devicePixelRatio || 1), this._setElementSize(f.width, f.height), this._viewSize = f, i._views.push(this), i._viewsById[this._id] = this, (this._matrix = new Pt())._owner = this, i._focused || (i._focused = this), this._frameItems = {}, this._frameItemCount = 0, this._itemEvents = { native: {}, virtual: {} }, this._autoUpdate = !gt.agent.node, this._needsUpdate = !1;
          },
          remove: function() {
            if (!this._project)
              return !1;
            ke._focused === this && (ke._focused = null), ke._views.splice(ke._views.indexOf(this), 1), delete ke._viewsById[this._id];
            var i = this._project;
            return i._view === this && (i._view = null), xe.remove(this._element, this._viewEvents), xe.remove(s, this._windowEvents), this._element = this._project = null, this.off("frame"), this._animate = !1, this._frameItems = {}, !0;
          },
          _events: l.each(
            ht._itemHandlers.concat(["onResize", "onKeyDown", "onKeyUp"]),
            function(i) {
              this[i] = {};
            },
            {
              onFrame: {
                install: function() {
                  this.play();
                },
                uninstall: function() {
                  this.pause();
                }
              }
            }
          ),
          _animate: !1,
          _time: 0,
          _count: 0,
          getAutoUpdate: function() {
            return this._autoUpdate;
          },
          setAutoUpdate: function(i) {
            this._autoUpdate = i, i && this.requestUpdate();
          },
          update: function() {
          },
          draw: function() {
            this.update();
          },
          requestUpdate: function() {
            if (!this._requested) {
              var i = this;
              xe.requestAnimationFrame(function() {
                if (i._requested = !1, i._animate) {
                  i.requestUpdate();
                  var r = i._element;
                  (!Ce.getPrefixed(o, "hidden") || v.getAttribute(r, "keepalive") === "true") && Ce.isInView(r) && i._handleFrame();
                }
                i._autoUpdate && i.update();
              }), this._requested = !0;
            }
          },
          play: function() {
            this._animate = !0, this.requestUpdate();
          },
          pause: function() {
            this._animate = !1;
          },
          _handleFrame: function() {
            gt = this._scope;
            var i = Date.now() / 1e3, r = this._last ? i - this._last : 0;
            this._last = i, this.emit("frame", new l({
              delta: r,
              time: this._time += r,
              count: this._count++
            })), this._stats && this._stats.update();
          },
          _animateItem: function(i, r) {
            var a = this._frameItems;
            r ? (a[i._id] = {
              item: i,
              time: 0,
              count: 0
            }, ++this._frameItemCount === 1 && this.on("frame", this._handleFrameItems)) : (delete a[i._id], --this._frameItemCount === 0 && this.off("frame", this._handleFrameItems));
          },
          _handleFrameItems: function(i) {
            for (var r in this._frameItems) {
              var a = this._frameItems[r];
              a.item.emit("frame", new l(i, {
                time: a.time += i.delta,
                count: a.count++
              }));
            }
          },
          _changed: function() {
            this._project._changed(4097), this._bounds = this._decomposed = n;
          },
          getElement: function() {
            return this._element;
          },
          getPixelRatio: function() {
            return this._pixelRatio;
          },
          getResolution: function() {
            return this._pixelRatio * 72;
          },
          getViewSize: function() {
            var i = this._viewSize;
            return new It(i.width, i.height, this, "setViewSize");
          },
          setViewSize: function() {
            var i = X.read(arguments), r = i.subtract(this._viewSize);
            r.isZero() || (this._setElementSize(i.width, i.height), this._viewSize.set(i), this._changed(), this.emit("resize", { size: i, delta: r }), this._autoUpdate && this.update());
          },
          _setElementSize: function(i, r) {
            var a = this._element;
            a && (a.width !== i && (a.width = i), a.height !== r && (a.height = r));
          },
          getBounds: function() {
            return this._bounds || (this._bounds = this._matrix.inverted()._transformBounds(
              new ut(new F(), this._viewSize)
            )), this._bounds;
          },
          getSize: function() {
            return this.getBounds().getSize();
          },
          isVisible: function() {
            return Ce.isInView(this._element);
          },
          isInserted: function() {
            return Ce.isInserted(this._element);
          },
          getPixelSize: function(i) {
            var r = this._element, a;
            if (r) {
              var u = r.parentNode, h = o.createElement("div");
              h.style.fontSize = i, u.appendChild(h), a = parseFloat(Ce.getStyles(h).fontSize), u.removeChild(h);
            } else
              a = parseFloat(a);
            return a;
          },
          getTextWidth: function(i, r) {
            return 0;
          }
        },
        l.each(["rotate", "scale", "shear", "skew"], function(i) {
          var r = i === "rotate";
          this[i] = function() {
            var a = arguments, u = (r ? l : F).read(a), h = F.read(a, 0, { readNull: !0 });
            return this.transform(new Pt()[i](
              u,
              h || this.getCenter(!0)
            ));
          };
        }, {
          _decompose: function() {
            return this._decomposed || (this._decomposed = this._matrix.decompose());
          },
          translate: function() {
            var i = new Pt();
            return this.transform(i.translate.apply(i, arguments));
          },
          getCenter: function() {
            return this.getBounds().getCenter();
          },
          setCenter: function() {
            var i = F.read(arguments);
            this.translate(this.getCenter().subtract(i));
          },
          getZoom: function() {
            var i = this._decompose().scaling;
            return (i.x + i.y) / 2;
          },
          setZoom: function(i) {
            this.transform(new Pt().scale(
              i / this.getZoom(),
              this.getCenter()
            ));
          },
          getRotation: function() {
            return this._decompose().rotation;
          },
          setRotation: function(i) {
            var r = this.getRotation();
            r != null && i != null && this.rotate(i - r);
          },
          getScaling: function() {
            var i = this._decompose().scaling;
            return new mt(i.x, i.y, this, "setScaling");
          },
          setScaling: function() {
            var i = this.getScaling(), r = F.read(arguments, 0, { clone: !0, readNull: !0 });
            i && r && this.scale(r.x / i.x, r.y / i.y);
          },
          getMatrix: function() {
            return this._matrix;
          },
          setMatrix: function() {
            var i = this._matrix;
            i.set.apply(i, arguments);
          },
          transform: function(i) {
            this._matrix.append(i);
          },
          scrollBy: function() {
            this.translate(F.read(arguments).negate());
          }
        }),
        {
          projectToView: function() {
            return this._matrix._transformPoint(F.read(arguments));
          },
          viewToProject: function() {
            return this._matrix._inverseTransform(F.read(arguments));
          },
          getEventPoint: function(i) {
            return this.viewToProject(xe.getOffset(i, this._element));
          }
        },
        {
          statics: {
            _views: [],
            _viewsById: {},
            _id: 0,
            create: function(i, r) {
              o && typeof r == "string" && (r = o.getElementById(r));
              var a = s ? W : ke;
              return new a(i, r);
            }
          }
        },
        new function() {
          if (!s)
            return;
          var i, r, a = !1, u = !1;
          function h(D) {
            var j = xe.getTarget(D);
            return j.getAttribute && ke._viewsById[j.getAttribute("id")];
          }
          function f() {
            var D = ke._focused;
            if (!D || !D.isVisible()) {
              for (var j = 0, G = ke._views.length; j < G; j++)
                if ((D = ke._views[j]).isVisible()) {
                  ke._focused = r = D;
                  break;
                }
            }
          }
          function d(D, j, G) {
            D._handleMouseEvent("mousemove", j, G);
          }
          var c = s.navigator, p, g, b;
          c.pointerEnabled || c.msPointerEnabled ? (p = "pointerdown MSPointerDown", g = "pointermove MSPointerMove", b = "pointerup pointercancel MSPointerUp MSPointerCancel") : (p = "touchstart", g = "touchmove", b = "touchend touchcancel", "ontouchstart" in s && c.userAgent.match(
            /mobile|tablet|ip(ad|hone|od)|android|silk/i
          ) || (p += " mousedown", g += " mousemove", b += " mouseup"));
          var S = {}, x = {
            mouseout: function(D) {
              var j = ke._focused, G = xe.getRelatedTarget(D);
              if (j && (!G || G.nodeName === "HTML")) {
                var Y = xe.getOffset(D, j._element), $ = Y.x, Q = Math.abs, at = Q($), dt = 1 << 25, _t = at - dt;
                Y.x = Q(_t) < at ? _t * ($ < 0 ? -1 : 1) : $, d(j, D, j.viewToProject(Y));
              }
            },
            scroll: f
          };
          S[p] = function(D) {
            var j = ke._focused = h(D);
            a || (a = !0, j._handleMouseEvent("mousedown", D));
          }, x[g] = function(D) {
            var j = ke._focused;
            if (!u) {
              var G = h(D);
              G ? j !== G && (j && d(j, D), i || (i = j), j = ke._focused = r = G) : r && r === j && (i && !i.isInserted() && (i = null), j = ke._focused = i, i = null, f());
            }
            j && d(j, D);
          }, x[p] = function() {
            u = !0;
          }, x[b] = function(D) {
            var j = ke._focused;
            j && a && j._handleMouseEvent("mouseup", D), u = a = !1;
          }, xe.add(o, x), xe.add(s, {
            load: f
          });
          var y = !1, E = !1, C = {
            doubleclick: "click",
            mousedrag: "mousemove"
          }, O = !1, w, P, m, I, T, M, A, R;
          function V(D, j, G, Y, $, Q, at) {
            var dt = !1, _t;
            function St(et, nt) {
              if (et.responds(nt)) {
                if (_t || (_t = new lt(
                  nt,
                  Y,
                  $,
                  j || et,
                  Q ? $.subtract(Q) : null
                )), et.emit(nt, _t) && (y = !0, _t.prevented && (E = !0), _t.stopped))
                  return dt = !0;
              } else {
                var yt = C[nt];
                if (yt)
                  return St(et, yt);
              }
            }
            for (; D && D !== at && !St(D, G); )
              D = D._parent;
            return dt;
          }
          function B(D, j, G, Y, $, Q) {
            return D._project.removeOn(G), E = y = !1, T && V(
              T,
              null,
              G,
              Y,
              $,
              Q
            ) || j && j !== T && !j.isDescendant(T) && V(j, null, G === "mousedrag" ? "mousemove" : G, Y, $, Q, T) || V(
              D,
              T || j || D,
              G,
              Y,
              $,
              Q
            );
          }
          var H = {
            mousedown: {
              mousedown: 1,
              mousedrag: 1,
              click: 1,
              doubleclick: 1
            },
            mouseup: {
              mouseup: 1,
              mousedrag: 1,
              click: 1,
              doubleclick: 1
            },
            mousemove: {
              mousedrag: 1,
              mousemove: 1,
              mouseenter: 1,
              mouseleave: 1
            }
          };
          return {
            _viewEvents: S,
            _handleMouseEvent: function(D, j, G) {
              var Y = this._itemEvents, $ = Y.native[D], Q = D === "mousemove", at = this._scope.tool, dt = this;
              function _t(Rt) {
                return Y.virtual[Rt] || dt.responds(Rt) || at && at.responds(Rt);
              }
              Q && a && _t("mousedrag") && (D = "mousedrag"), G || (G = this.getEventPoint(j));
              var St = this.getBounds().contains(G), et = $ && St && dt._project.hitTest(G, {
                tolerance: 0,
                fill: !0,
                stroke: !0
              }), nt = et && et.item || null, yt = !1, kt = {};
              if (kt[D.substr(5)] = !0, $ && nt !== I && (I && V(I, null, "mouseleave", j, G), nt && V(nt, null, "mouseenter", j, G), I = nt), O ^ St && (V(
                this,
                null,
                St ? "mouseenter" : "mouseleave",
                j,
                G
              ), yt = !0), (St || kt.drag) && !G.equals(P) && (B(
                this,
                nt,
                Q ? D : "mousemove",
                j,
                G,
                P
              ), yt = !0), O = St, kt.down && St || kt.up && w) {
                if (B(this, nt, D, j, G, w), kt.down) {
                  if (R = nt === M && Date.now() - A < 300, m = M = nt, !E && nt) {
                    for (var Ct = nt; Ct && !Ct.responds("mousedrag"); )
                      Ct = Ct._parent;
                    Ct && (T = nt);
                  }
                  w = G;
                } else kt.up && (!E && nt === m && (A = Date.now(), B(this, nt, R ? "doubleclick" : "click", j, G, w), R = !1), m = T = null);
                O = !1, yt = !0;
              }
              P = G, yt && at && (y = at._handleMouseEvent(D, j, G, kt) || y), j.cancelable !== !1 && (y && !kt.move || kt.down && _t("mouseup")) && j.preventDefault();
            },
            _handleKeyEvent: function(D, j, G, Y) {
              var $ = this._scope, Q = $.tool, at;
              function dt(_t) {
                _t.responds(D) && (gt = $, _t.emit(D, at = at || new it(D, j, G, Y)));
              }
              this.isVisible() && (dt(this), Q && Q.responds(D) && dt(Q));
            },
            _countItemEvent: function(D, j) {
              var G = this._itemEvents, Y = G.native, $ = G.virtual;
              for (var Q in H)
                Y[Q] = (Y[Q] || 0) + (H[Q][D] || 0) * j;
              $[D] = ($[D] || 0) + j;
            },
            statics: {
              updateFocus: f,
              _resetState: function() {
                a = u = y = O = !1, i = r = w = P = m = I = T = M = A = R = null;
              }
            }
          };
        }()
      ), W = ke.extend({
        _class: "CanvasView",
        initialize: function(r, a) {
          if (!(a instanceof s.HTMLCanvasElement)) {
            var u = X.read(arguments, 1);
            if (u.isZero())
              throw new Error(
                "Cannot create CanvasView with the provided argument: " + l.slice(arguments, 1)
              );
            a = st.getCanvas(u);
          }
          var h = this._context = a.getContext("2d");
          if (h.save(), this._pixelRatio = 1, !/^off|false$/.test(v.getAttribute(a, "hidpi"))) {
            var f = s.devicePixelRatio || 1, d = Ce.getPrefixed(
              h,
              "backingStorePixelRatio"
            ) || 1;
            this._pixelRatio = f / d;
          }
          ke.call(this, r, a), this._needsUpdate = !0;
        },
        remove: function i() {
          return this._context.restore(), i.base.call(this);
        },
        _setElementSize: function i(r, a) {
          var u = this._pixelRatio;
          if (i.base.call(this, r * u, a * u), u !== 1) {
            var h = this._element, f = this._context;
            if (!v.hasAttribute(h, "resize")) {
              var d = h.style;
              d.width = r + "px", d.height = a + "px";
            }
            f.restore(), f.save(), f.scale(u, u);
          }
        },
        getContext: function() {
          return this._context;
        },
        getPixelSize: function i(r) {
          var a = gt.agent, u;
          if (a && a.firefox)
            u = i.base.call(this, r);
          else {
            var h = this._context, f = h.font;
            h.font = r + " serif", u = parseFloat(h.font), h.font = f;
          }
          return u;
        },
        getTextWidth: function(i, r) {
          var a = this._context, u = a.font, h = 0;
          a.font = i;
          for (var f = 0, d = r.length; f < d; f++)
            h = Math.max(h, a.measureText(r[f]).width);
          return a.font = u, h;
        },
        update: function() {
          if (!this._needsUpdate)
            return !1;
          var i = this._project, r = this._context, a = this._viewSize;
          return r.clearRect(0, 0, a.width + 1, a.height + 1), i && i.draw(r, this._matrix, this._pixelRatio), this._needsUpdate = !1, !0;
        }
      }), K = l.extend({
        _class: "Event",
        initialize: function(r) {
          this.event = r, this.type = r && r.type;
        },
        prevented: !1,
        stopped: !1,
        preventDefault: function() {
          this.prevented = !0, this.event.preventDefault();
        },
        stopPropagation: function() {
          this.stopped = !0, this.event.stopPropagation();
        },
        stop: function() {
          this.stopPropagation(), this.preventDefault();
        },
        getTimeStamp: function() {
          return this.event.timeStamp;
        },
        getModifiers: function() {
          return ct.modifiers;
        }
      }), it = K.extend({
        _class: "KeyEvent",
        initialize: function(r, a, u, h) {
          this.type = r, this.event = a, this.key = u, this.character = h;
        },
        toString: function() {
          return "{ type: '" + this.type + "', key: '" + this.key + "', character: '" + this.character + "', modifiers: " + this.getModifiers() + " }";
        }
      }), ct = new function() {
        var i = {
          "	": "tab",
          " ": "space",
          "\b": "backspace",
          "": "delete",
          Spacebar: "space",
          Del: "delete",
          Win: "meta",
          Esc: "escape"
        }, r = {
          tab: "	",
          space: " ",
          enter: "\r"
        }, a = {}, u = {}, h, f, d = new l({
          shift: !1,
          control: !1,
          alt: !1,
          meta: !1,
          capsLock: !1,
          space: !1
        }).inject({
          option: {
            get: function() {
              return this.alt;
            }
          },
          command: {
            get: function() {
              var g = gt && gt.agent;
              return g && g.mac ? this.meta : this.control;
            }
          }
        });
        function c(g) {
          var b = g.key || g.keyIdentifier;
          return b = /^U\+/.test(b) ? String.fromCharCode(parseInt(b.substr(2), 16)) : /^Arrow[A-Z]/.test(b) ? b.substr(5) : b === "Unidentified" || b === n ? String.fromCharCode(g.keyCode) : b, i[b] || (b.length > 1 ? l.hyphenate(b) : b.toLowerCase());
        }
        function p(g, b, S, x) {
          var y = ke._focused, E;
          if (a[b] = g, g ? u[b] = S : delete u[b], b.length > 1 && (E = l.camelize(b)) in d) {
            d[E] = g;
            var C = gt && gt.agent;
            if (E === "meta" && C && C.mac)
              if (g)
                h = {};
              else {
                for (var O in h)
                  O in u && p(!1, O, h[O], x);
                h = null;
              }
          } else g && h && (h[b] = S);
          y && y._handleKeyEvent(
            g ? "keydown" : "keyup",
            x,
            b,
            S
          );
        }
        return xe.add(o, {
          keydown: function(g) {
            var b = c(g), S = gt && gt.agent;
            b.length > 1 || S && S.chrome && (g.altKey || S.mac && g.metaKey || !S.mac && g.ctrlKey) ? p(
              !0,
              b,
              r[b] || (b.length > 1 ? "" : b),
              g
            ) : f = b;
          },
          keypress: function(g) {
            if (f) {
              var b = c(g), S = g.charCode, x = S >= 32 ? String.fromCharCode(S) : b.length > 1 ? "" : b;
              b !== f && (b = x.toLowerCase()), p(!0, b, x, g), f = null;
            }
          },
          keyup: function(g) {
            var b = c(g);
            b in u && p(!1, b, u[b], g);
          }
        }), xe.add(s, {
          blur: function(g) {
            for (var b in u)
              p(!1, b, u[b], g);
          }
        }), {
          modifiers: d,
          isDown: function(g) {
            return !!a[g];
          }
        };
      }(), lt = K.extend({
        _class: "MouseEvent",
        initialize: function(r, a, u, h, f) {
          this.type = r, this.event = a, this.point = u, this.target = h, this.delta = f;
        },
        toString: function() {
          return "{ type: '" + this.type + "', point: " + this.point + ", target: " + this.target + (this.delta ? ", delta: " + this.delta : "") + ", modifiers: " + this.getModifiers() + " }";
        }
      }), ft = K.extend({
        _class: "ToolEvent",
        _item: null,
        initialize: function(r, a, u) {
          this.tool = r, this.type = a, this.event = u;
        },
        _choosePoint: function(i, r) {
          return i || (r ? r.clone() : null);
        },
        getPoint: function() {
          return this._choosePoint(this._point, this.tool._point);
        },
        setPoint: function(i) {
          this._point = i;
        },
        getLastPoint: function() {
          return this._choosePoint(this._lastPoint, this.tool._lastPoint);
        },
        setLastPoint: function(i) {
          this._lastPoint = i;
        },
        getDownPoint: function() {
          return this._choosePoint(this._downPoint, this.tool._downPoint);
        },
        setDownPoint: function(i) {
          this._downPoint = i;
        },
        getMiddlePoint: function() {
          return !this._middlePoint && this.tool._lastPoint ? this.tool._point.add(this.tool._lastPoint).divide(2) : this._middlePoint;
        },
        setMiddlePoint: function(i) {
          this._middlePoint = i;
        },
        getDelta: function() {
          return !this._delta && this.tool._lastPoint ? this.tool._point.subtract(this.tool._lastPoint) : this._delta;
        },
        setDelta: function(i) {
          this._delta = i;
        },
        getCount: function() {
          return this.tool[/^mouse(down|up)$/.test(this.type) ? "_downCount" : "_moveCount"];
        },
        setCount: function(i) {
          this.tool[/^mouse(down|up)$/.test(this.type) ? "downCount" : "count"] = i;
        },
        getItem: function() {
          if (!this._item) {
            var i = this.tool._scope.project.hitTest(this.getPoint());
            if (i) {
              for (var r = i.item, a = r._parent; /^(Group|CompoundPath)$/.test(a._class); )
                r = a, a = a._parent;
              this._item = r;
            }
          }
          return this._item;
        },
        setItem: function(i) {
          this._item = i;
        },
        toString: function() {
          return "{ type: " + this.type + ", point: " + this.getPoint() + ", count: " + this.getCount() + ", modifiers: " + this.getModifiers() + " }";
        }
      }), wt = k.extend({
        _class: "Tool",
        _list: "tools",
        _reference: "tool",
        _events: [
          "onMouseDown",
          "onMouseUp",
          "onMouseDrag",
          "onMouseMove",
          "onActivate",
          "onDeactivate",
          "onEditOptions",
          "onKeyDown",
          "onKeyUp"
        ],
        initialize: function(r) {
          k.call(this), this._moveCount = -1, this._downCount = -1, this.set(r);
        },
        getMinDistance: function() {
          return this._minDistance;
        },
        setMinDistance: function(i) {
          this._minDistance = i, i != null && this._maxDistance != null && i > this._maxDistance && (this._maxDistance = i);
        },
        getMaxDistance: function() {
          return this._maxDistance;
        },
        setMaxDistance: function(i) {
          this._maxDistance = i, this._minDistance != null && i != null && i < this._minDistance && (this._minDistance = i);
        },
        getFixedDistance: function() {
          return this._minDistance == this._maxDistance ? this._minDistance : null;
        },
        setFixedDistance: function(i) {
          this._minDistance = this._maxDistance = i;
        },
        _handleMouseEvent: function(i, r, a, u) {
          gt = this._scope, u.drag && !this.responds(i) && (i = "mousemove");
          var h = u.move || u.drag, f = this.responds(i), d = this.minDistance, c = this.maxDistance, p = !1, g = this;
          function b(x, y) {
            var E = a, C = h ? g._point : g._downPoint || E;
            if (h) {
              if (g._moveCount >= 0 && E.equals(C))
                return !1;
              if (C && (x != null || y != null)) {
                var O = E.subtract(C), w = O.getLength();
                if (w < (x || 0))
                  return !1;
                y && (E = C.add(O.normalize(
                  Math.min(w, y)
                )));
              }
              g._moveCount++;
            }
            return g._point = E, g._lastPoint = C || E, u.down && (g._moveCount = -1, g._downPoint = E, g._downCount++), !0;
          }
          function S() {
            f && (p = g.emit(i, new ft(g, i, r)) || p);
          }
          if (u.down)
            b(), S();
          else if (u.up)
            b(null, c), S();
          else if (f)
            for (; b(d, c); )
              S();
          return p;
        }
      }), bt = l.extend(_, {
        _class: "Tween",
        statics: {
          easings: new l({
            linear: function(i) {
              return i;
            },
            easeInQuad: function(i) {
              return i * i;
            },
            easeOutQuad: function(i) {
              return i * (2 - i);
            },
            easeInOutQuad: function(i) {
              return i < 0.5 ? 2 * i * i : -1 + 2 * (2 - i) * i;
            },
            easeInCubic: function(i) {
              return i * i * i;
            },
            easeOutCubic: function(i) {
              return --i * i * i + 1;
            },
            easeInOutCubic: function(i) {
              return i < 0.5 ? 4 * i * i * i : (i - 1) * (2 * i - 2) * (2 * i - 2) + 1;
            },
            easeInQuart: function(i) {
              return i * i * i * i;
            },
            easeOutQuart: function(i) {
              return 1 - --i * i * i * i;
            },
            easeInOutQuart: function(i) {
              return i < 0.5 ? 8 * i * i * i * i : 1 - 8 * --i * i * i * i;
            },
            easeInQuint: function(i) {
              return i * i * i * i * i;
            },
            easeOutQuint: function(i) {
              return 1 + --i * i * i * i * i;
            },
            easeInOutQuint: function(i) {
              return i < 0.5 ? 16 * i * i * i * i * i : 1 + 16 * --i * i * i * i * i;
            }
          })
        },
        initialize: function i(r, a, u, h, f, d) {
          this.object = r;
          var c = typeof f, p = c === "function";
          this.type = p ? c : c === "string" ? f : "linear", this.easing = p ? f : i.easings[this.type], this.duration = h, this.running = !1, this._then = null, this._startTime = null;
          var g = a || u;
          this._keys = g ? Object.keys(g) : [], this._parsedKeys = this._parseKeys(this._keys), this._from = g && this._getState(a), this._to = g && this._getState(u), d !== !1 && this.start();
        },
        then: function(i) {
          return this._then = i, this;
        },
        start: function() {
          return this._startTime = null, this.running = !0, this;
        },
        stop: function() {
          return this.running = !1, this;
        },
        update: function(i) {
          if (this.running) {
            i >= 1 && (i = 1, this.running = !1);
            for (var r = this.easing(i), a = this._keys, u = function(b) {
              return typeof b == "function" ? b(r, i) : b;
            }, h = 0, f = a && a.length; h < f; h++) {
              var d = a[h], c = u(this._from[d]), p = u(this._to[d]), g = c && p && c.__add && p.__add ? p.__subtract(c).__multiply(r).__add(c) : (p - c) * r + c;
              this._setProperty(this._parsedKeys[d], g);
            }
            this.responds("update") && this.emit("update", new l({
              progress: i,
              factor: r
            })), !this.running && this._then && this._then(this.object);
          }
          return this;
        },
        _events: {
          onUpdate: {}
        },
        _handleFrame: function(i) {
          var r = this._startTime, a = r ? (i - r) / this.duration : 0;
          r || (this._startTime = i), this.update(a);
        },
        _getState: function(i) {
          for (var r = this._keys, a = {}, u = 0, h = r.length; u < h; u++) {
            var f = r[u], d = this._parsedKeys[f], c = this._getProperty(d), p;
            if (i) {
              var g = this._resolveValue(c, i[f]);
              this._setProperty(d, g), p = this._getProperty(d), p = p && p.clone ? p.clone() : p, this._setProperty(d, c);
            } else
              p = c && c.clone ? c.clone() : c;
            a[f] = p;
          }
          return a;
        },
        _resolveValue: function(i, r) {
          if (r) {
            if (Array.isArray(r) && r.length === 2) {
              var a = r[0];
              return a && a.match && a.match(/^[+\-\*\/]=/) ? this._calculate(i, a[0], r[1]) : r;
            } else if (typeof r == "string") {
              var u = r.match(/^[+\-*/]=(.*)/);
              if (u) {
                var h = JSON.parse(u[1].replace(
                  /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
                  '"$2": '
                ));
                return this._calculate(i, r[0], h);
              }
            }
          }
          return r;
        },
        _calculate: function(i, r, a) {
          return gt.PaperScript.calculateBinary(i, r, a);
        },
        _parseKeys: function(i) {
          for (var r = {}, a = 0, u = i.length; a < u; a++) {
            var h = i[a], f = h.replace(/\.([^.]*)/g, "/$1").replace(/\[['"]?([^'"\]]*)['"]?\]/g, "/$1");
            r[h] = f.split("/");
          }
          return r;
        },
        _getProperty: function(i, r) {
          for (var a = this.object, u = 0, h = i.length - (r || 0); u < h && a; u++)
            a = a[i[u]];
          return a;
        },
        _setProperty: function(i, r) {
          var a = this._getProperty(i, 1);
          a && (a[i[i.length - 1]] = r);
        }
      }), vt = {
        request: function(i) {
          var r = new e.XMLHttpRequest();
          return r.open(
            (i.method || "get").toUpperCase(),
            i.url,
            l.pick(i.async, !0)
          ), i.mimeType && r.overrideMimeType(i.mimeType), r.onload = function() {
            var a = r.status;
            a === 0 || a === 200 ? i.onLoad && i.onLoad.call(r, r.responseText) : r.onerror();
          }, r.onerror = function() {
            var a = r.status, u = 'Could not load "' + i.url + '" (Status: ' + a + ")";
            if (i.onError)
              i.onError(u, a);
            else
              throw new Error(u);
          }, r.send(null);
        }
      }, st = l.exports.CanvasProvider = {
        canvases: [],
        getCanvas: function(i, r, a) {
          if (!s)
            return null;
          var u, h = !0;
          typeof i == "object" && (r = i.height, i = i.width), this.canvases.length ? u = this.canvases.pop() : (u = o.createElement("canvas"), h = !1);
          var f = u.getContext("2d", a || {});
          if (!f)
            throw new Error("Canvas " + u + " is unable to provide a 2D context.");
          return u.width === i && u.height === r ? h && f.clearRect(0, 0, i + 1, r + 1) : (u.width = i, u.height = r), f.save(), u;
        },
        getContext: function(i, r, a) {
          var u = this.getCanvas(i, r, a);
          return u ? u.getContext("2d", a || {}) : null;
        },
        release: function(i) {
          var r = i && i.canvas ? i.canvas : i;
          r && r.getContext && (r.getContext("2d").restore(), this.canvases.push(r));
        }
      }, Ot = new function() {
        var i = Math.min, r = Math.max, a = Math.abs, u, h, f, d, c, p, g, b, S, x, y;
        function E(T, M, A) {
          return 0.2989 * T + 0.587 * M + 0.114 * A;
        }
        function C(T, M, A, B) {
          var V = B - E(T, M, A);
          S = T + V, x = M + V, y = A + V;
          var B = E(S, x, y), H = i(S, x, y), D = r(S, x, y);
          if (H < 0) {
            var j = B - H;
            S = B + (S - B) * B / j, x = B + (x - B) * B / j, y = B + (y - B) * B / j;
          }
          if (D > 255) {
            var G = 255 - B, Y = D - B;
            S = B + (S - B) * G / Y, x = B + (x - B) * G / Y, y = B + (y - B) * G / Y;
          }
        }
        function O(T, M, A) {
          return r(T, M, A) - i(T, M, A);
        }
        function w(T, M, A, R) {
          var V = [T, M, A], B = r(T, M, A), H = i(T, M, A), D;
          H = H === T ? 0 : H === M ? 1 : 2, B = B === T ? 0 : B === M ? 1 : 2, D = i(H, B) === 0 ? r(H, B) === 1 ? 2 : 1 : 0, V[B] > V[H] ? (V[D] = (V[D] - V[H]) * R / (V[B] - V[H]), V[B] = R) : V[D] = V[B] = 0, V[H] = 0, S = V[0], x = V[1], y = V[2];
        }
        var P = {
          multiply: function() {
            S = c * u / 255, x = p * h / 255, y = g * f / 255;
          },
          screen: function() {
            S = c + u - c * u / 255, x = p + h - p * h / 255, y = g + f - g * f / 255;
          },
          overlay: function() {
            S = c < 128 ? 2 * c * u / 255 : 255 - 2 * (255 - c) * (255 - u) / 255, x = p < 128 ? 2 * p * h / 255 : 255 - 2 * (255 - p) * (255 - h) / 255, y = g < 128 ? 2 * g * f / 255 : 255 - 2 * (255 - g) * (255 - f) / 255;
          },
          "soft-light": function() {
            var T = u * c / 255;
            S = T + c * (255 - (255 - c) * (255 - u) / 255 - T) / 255, T = h * p / 255, x = T + p * (255 - (255 - p) * (255 - h) / 255 - T) / 255, T = f * g / 255, y = T + g * (255 - (255 - g) * (255 - f) / 255 - T) / 255;
          },
          "hard-light": function() {
            S = u < 128 ? 2 * u * c / 255 : 255 - 2 * (255 - u) * (255 - c) / 255, x = h < 128 ? 2 * h * p / 255 : 255 - 2 * (255 - h) * (255 - p) / 255, y = f < 128 ? 2 * f * g / 255 : 255 - 2 * (255 - f) * (255 - g) / 255;
          },
          "color-dodge": function() {
            S = c === 0 ? 0 : u === 255 ? 255 : i(255, 255 * c / (255 - u)), x = p === 0 ? 0 : h === 255 ? 255 : i(255, 255 * p / (255 - h)), y = g === 0 ? 0 : f === 255 ? 255 : i(255, 255 * g / (255 - f));
          },
          "color-burn": function() {
            S = c === 255 ? 255 : u === 0 ? 0 : r(0, 255 - (255 - c) * 255 / u), x = p === 255 ? 255 : h === 0 ? 0 : r(0, 255 - (255 - p) * 255 / h), y = g === 255 ? 255 : f === 0 ? 0 : r(0, 255 - (255 - g) * 255 / f);
          },
          darken: function() {
            S = c < u ? c : u, x = p < h ? p : h, y = g < f ? g : f;
          },
          lighten: function() {
            S = c > u ? c : u, x = p > h ? p : h, y = g > f ? g : f;
          },
          difference: function() {
            S = c - u, S < 0 && (S = -S), x = p - h, x < 0 && (x = -x), y = g - f, y < 0 && (y = -y);
          },
          exclusion: function() {
            S = c + u * (255 - c - c) / 255, x = p + h * (255 - p - p) / 255, y = g + f * (255 - g - g) / 255;
          },
          hue: function() {
            w(u, h, f, O(c, p, g)), C(S, x, y, E(c, p, g));
          },
          saturation: function() {
            w(c, p, g, O(u, h, f)), C(S, x, y, E(c, p, g));
          },
          luminosity: function() {
            C(c, p, g, E(u, h, f));
          },
          color: function() {
            C(u, h, f, E(c, p, g));
          },
          add: function() {
            S = i(c + u, 255), x = i(p + h, 255), y = i(g + f, 255);
          },
          subtract: function() {
            S = r(c - u, 0), x = r(p - h, 0), y = r(g - f, 0);
          },
          average: function() {
            S = (c + u) / 2, x = (p + h) / 2, y = (g + f) / 2;
          },
          negation: function() {
            S = 255 - a(255 - u - c), x = 255 - a(255 - h - p), y = 255 - a(255 - f - g);
          }
        }, m = this.nativeModes = l.each([
          "source-over",
          "source-in",
          "source-out",
          "source-atop",
          "destination-over",
          "destination-in",
          "destination-out",
          "destination-atop",
          "lighter",
          "darker",
          "copy",
          "xor"
        ], function(T) {
          this[T] = !0;
        }, {}), I = st.getContext(1, 1, { willReadFrequently: !0 });
        I && (l.each(P, function(T, M) {
          var A = M === "darken", R = !1;
          I.save();
          try {
            I.fillStyle = A ? "#300" : "#a00", I.fillRect(0, 0, 1, 1), I.globalCompositeOperation = M, I.globalCompositeOperation === M && (I.fillStyle = A ? "#a00" : "#300", I.fillRect(0, 0, 1, 1), R = I.getImageData(0, 0, 1, 1).data[0] !== A ? 170 : 51);
          } catch {
          }
          I.restore(), m[M] = R;
        }), st.release(I)), this.process = function(T, M, A, R, V) {
          var B = M.canvas, H = T === "normal";
          if (H || m[T])
            A.save(), A.setTransform(1, 0, 0, 1, 0, 0), A.globalAlpha = R, H || (A.globalCompositeOperation = T), A.drawImage(B, V.x, V.y), A.restore();
          else {
            var D = P[T];
            if (!D)
              return;
            for (var j = A.getImageData(
              V.x,
              V.y,
              B.width,
              B.height
            ), G = j.data, Y = M.getImageData(
              0,
              0,
              B.width,
              B.height
            ).data, $ = 0, Q = G.length; $ < Q; $ += 4) {
              u = Y[$], c = G[$], h = Y[$ + 1], p = G[$ + 1], f = Y[$ + 2], g = G[$ + 2], d = Y[$ + 3], b = G[$ + 3], D();
              var at = d * R / 255, dt = 1 - at;
              G[$] = at * S + dt * c, G[$ + 1] = at * x + dt * p, G[$ + 2] = at * y + dt * g, G[$ + 3] = d * R + dt * b;
            }
            A.putImageData(j, V.x, V.y);
          }
        };
      }(), pt = new function() {
        var i = "http://www.w3.org/2000/svg", r = "http://www.w3.org/2000/xmlns", a = "http://www.w3.org/1999/xlink", u = {
          href: a,
          xlink: r,
          xmlns: r + "/",
          "xmlns:xlink": r + "/"
        };
        function h(c, p, g) {
          return d(o.createElementNS(i, c), p, g);
        }
        function f(c, p) {
          var g = u[p], b = g ? c.getAttributeNS(g, p) : c.getAttribute(p);
          return b === "null" ? null : b;
        }
        function d(c, p, g) {
          for (var b in p) {
            var S = p[b], x = u[b];
            typeof S == "number" && g && (S = g.number(S)), x ? c.setAttributeNS(x, b, S) : c.setAttribute(b, S);
          }
          return c;
        }
        return {
          svg: i,
          xmlns: r,
          xlink: a,
          create: h,
          get: f,
          set: d
        };
      }(), Et = l.each({
        fillColor: ["fill", "color"],
        fillRule: ["fill-rule", "string"],
        strokeColor: ["stroke", "color"],
        strokeWidth: ["stroke-width", "number"],
        strokeCap: ["stroke-linecap", "string"],
        strokeJoin: ["stroke-linejoin", "string"],
        strokeScaling: ["vector-effect", "lookup", {
          true: "none",
          false: "non-scaling-stroke"
        }, function(i, r) {
          return !r && (i instanceof ue || i instanceof zt || i instanceof Mn);
        }],
        miterLimit: ["stroke-miterlimit", "number"],
        dashArray: ["stroke-dasharray", "array"],
        dashOffset: ["stroke-dashoffset", "number"],
        fontFamily: ["font-family", "string"],
        fontWeight: ["font-weight", "string"],
        fontSize: ["font-size", "number"],
        justification: ["text-anchor", "lookup", {
          left: "start",
          center: "middle",
          right: "end"
        }],
        opacity: ["opacity", "number"],
        blendMode: ["mix-blend-mode", "style"]
      }, function(i, r) {
        var a = l.capitalize(r), u = i[2];
        this[r] = {
          type: i[1],
          property: r,
          attribute: i[0],
          toSVG: u,
          fromSVG: u && l.each(u, function(h, f) {
            this[h] = f;
          }, {}),
          exportFilter: i[3],
          get: "get" + a,
          set: "set" + a
        };
      }, {});
      new function() {
        var i;
        function r(P, m, I) {
          var T = new l(), M = P.getTranslation();
          if (m) {
            var A;
            P.isInvertible() ? (P = P._shiftless(), A = P._inverseTransform(M), M = null) : A = new F(), T[I ? "cx" : "x"] = A.x, T[I ? "cy" : "y"] = A.y;
          }
          if (!P.isIdentity()) {
            var R = P.decompose();
            if (R) {
              var V = [], B = R.rotation, H = R.scaling, D = R.skewing;
              M && !M.isZero() && V.push("translate(" + i.point(M) + ")"), B && V.push("rotate(" + i.number(B) + ")"), (!q.isZero(H.x - 1) || !q.isZero(H.y - 1)) && V.push("scale(" + i.point(H) + ")"), D.x && V.push("skewX(" + i.number(D.x) + ")"), D.y && V.push("skewY(" + i.number(D.y) + ")"), T.transform = V.join(" ");
            } else
              T.transform = "matrix(" + P.getValues().join(",") + ")";
          }
          return T;
        }
        function a(P, m) {
          for (var I = r(P._matrix), T = P._children, M = pt.create("g", I, i), A = 0, R = T.length; A < R; A++) {
            var V = T[A], B = O(V, m);
            if (B)
              if (V.isClipMask()) {
                var H = pt.create("clipPath");
                H.appendChild(B), E(V, H, "clip"), pt.set(M, {
                  "clip-path": "url(#" + H.id + ")"
                });
              } else
                M.appendChild(B);
          }
          return M;
        }
        function u(P, m) {
          var I = r(P._matrix, !0), T = P.getSize(), M = P.getImage();
          return I.x -= T.width / 2, I.y -= T.height / 2, I.width = T.width, I.height = T.height, I.href = m.embedImages == !1 && M && M.src || P.toDataURL(), pt.create("image", I, i);
        }
        function h(P, m) {
          var I = m.matchShapes;
          if (I) {
            var T = P.toShape(!1);
            if (T)
              return f(T);
          }
          var M = P._segments, A = M.length, R, V = r(P._matrix);
          if (I && A >= 2 && !P.hasHandles())
            if (A > 2) {
              R = P._closed ? "polygon" : "polyline";
              for (var B = [], H = 0; H < A; H++)
                B.push(i.point(M[H]._point));
              V.points = B.join(" ");
            } else {
              R = "line";
              var D = M[0]._point, j = M[1]._point;
              V.set({
                x1: D.x,
                y1: D.y,
                x2: j.x,
                y2: j.y
              });
            }
          else
            R = "path", V.d = P.getPathData(null, m.precision);
          return pt.create(R, V, i);
        }
        function f(P) {
          var m = P._type, I = P._radius, T = r(P._matrix, !0, m !== "rectangle");
          if (m === "rectangle") {
            m = "rect";
            var M = P._size, A = M.width, R = M.height;
            T.x -= A / 2, T.y -= R / 2, T.width = A, T.height = R, I.isZero() && (I = null);
          }
          return I && (m === "circle" ? T.r = I : (T.rx = I.width, T.ry = I.height)), pt.create(m, T, i);
        }
        function d(P, m) {
          var I = r(P._matrix), T = P.getPathData(null, m.precision);
          return T && (I.d = T), pt.create("path", I, i);
        }
        function c(P, m) {
          var I = r(P._matrix, !0), T = P._definition, M = y(T, "symbol"), A = T._item, R = A.getStrokeBounds();
          return M || (M = pt.create("symbol", {
            viewBox: i.rectangle(R)
          }), M.appendChild(O(A, m)), E(T, M, "symbol")), I.href = "#" + M.id, I.x += R.x, I.y += R.y, I.width = R.width, I.height = R.height, I.overflow = "visible", pt.create("use", I, i);
        }
        function p(P) {
          var m = y(P, "color");
          if (!m) {
            var I = P.getGradient(), T = I._radial, M = P.getOrigin(), A = P.getDestination(), R;
            if (T) {
              R = {
                cx: M.x,
                cy: M.y,
                r: M.getDistance(A)
              };
              var V = P.getHighlight();
              V && (R.fx = V.x, R.fy = V.y);
            } else
              R = {
                x1: M.x,
                y1: M.y,
                x2: A.x,
                y2: A.y
              };
            R.gradientUnits = "userSpaceOnUse", m = pt.create((T ? "radial" : "linear") + "Gradient", R, i);
            for (var B = I._stops, H = 0, D = B.length; H < D; H++) {
              var j = B[H], G = j._color, Y = G.getAlpha(), $ = j._offset;
              R = {
                offset: $ ?? H / (D - 1)
              }, G && (R["stop-color"] = G.toCSS(!0)), Y < 1 && (R["stop-opacity"] = Y), m.appendChild(
                pt.create("stop", R, i)
              );
            }
            E(P, m, "color");
          }
          return "url(#" + m.id + ")";
        }
        function g(P) {
          var m = pt.create(
            "text",
            r(P._matrix, !0),
            i
          );
          return m.textContent = P._content, m;
        }
        var b = {
          Group: a,
          Layer: a,
          Raster: u,
          Path: h,
          Shape: f,
          CompoundPath: d,
          SymbolItem: c,
          PointText: g
        };
        function S(P, m, I) {
          var T = {}, M = !I && P.getParent(), A = [];
          return P._name != null && (T.id = P._name), l.each(Et, function(R) {
            var V = R.get, B = R.type, H = P[V]();
            if (R.exportFilter ? R.exportFilter(P, H) : !M || !l.equals(M[V](), H)) {
              if (B === "color" && H != null) {
                var D = H.getAlpha();
                D < 1 && (T[R.attribute + "-opacity"] = D);
              }
              B === "style" ? A.push(R.attribute + ": " + H) : T[R.attribute] = H == null ? "none" : B === "color" ? H.gradient ? p(H) : H.toCSS(!0) : B === "array" ? H.join(",") : B === "lookup" ? R.toSVG[H] : H;
            }
          }), A.length && (T.style = A.join(";")), T.opacity === 1 && delete T.opacity, P._visible || (T.visibility = "hidden"), pt.set(m, T, i);
        }
        var x;
        function y(P, m) {
          return x || (x = { ids: {}, svgs: {} }), P && x.svgs[m + "-" + (P._id || P.__id || (P.__id = tt.get("svg")))];
        }
        function E(P, m, I) {
          x || y();
          var T = x.ids[I] = (x.ids[I] || 0) + 1;
          m.id = I + "-" + T, x.svgs[I + "-" + (P._id || P.__id)] = m;
        }
        function C(P, m) {
          var I = P, T = null;
          if (x) {
            I = P.nodeName.toLowerCase() === "svg" && P;
            for (var M in x.svgs)
              T || (I || (I = pt.create("svg"), I.appendChild(P)), T = I.insertBefore(
                pt.create("defs"),
                I.firstChild
              )), T.appendChild(x.svgs[M]);
            x = null;
          }
          return m.asString ? new e.XMLSerializer().serializeToString(I) : I;
        }
        function O(P, m, I) {
          var T = b[P._class], M = T && T(P, m);
          if (M) {
            var A = m.onExport;
            A && (M = A(P, M, m) || M);
            var R = JSON.stringify(P._data);
            R && R !== "{}" && R !== "null" && M.setAttribute("data-paper-data", R);
          }
          return M && S(P, M, I);
        }
        function w(P) {
          return P || (P = {}), i = new z(P.precision), P;
        }
        ht.inject({
          exportSVG: function(P) {
            return P = w(P), C(O(this, P, !0), P);
          }
        }), Bt.inject({
          exportSVG: function(P) {
            P = w(P);
            var m = this._children, I = this.getView(), T = l.pick(P.bounds, "view"), M = P.matrix || T === "view" && I._matrix, A = M && Pt.read([M]), R = T === "view" ? new ut([0, 0], I.getViewSize()) : T === "content" ? ht._getBounds(m, A, { stroke: !0 }).rect : ut.read([T], 0, { readNull: !0 }), V = {
              version: "1.1",
              xmlns: pt.svg,
              "xmlns:xlink": pt.xlink
            };
            R && (V.width = R.width, V.height = R.height, (R.x || R.x === 0 || R.y || R.y === 0) && (V.viewBox = i.rectangle(R)));
            var B = pt.create("svg", V, i), H = B;
            A && !A.isIdentity() && (H = B.appendChild(pt.create(
              "g",
              r(A),
              i
            )));
            for (var D = 0, j = m.length; D < j; D++)
              H.appendChild(O(m[D], P, !0));
            return C(B, P);
          }
        });
      }(), new function() {
        var i = {}, r;
        function a(m, I, T, M, A, R) {
          var V = pt.get(m, I) || R, B = V == null ? M ? null : T ? "" : 0 : T ? V : parseFloat(V);
          return /%\s*$/.test(V) ? B / 100 * (A ? 1 : r[/x|^width/.test(I) ? "width" : "height"]) : B;
        }
        function u(m, I, T, M, A, R, V) {
          return I = a(m, I || "x", !1, M, A, R), T = a(m, T || "y", !1, M, A, V), M && (I == null || T == null) ? null : new F(I, T);
        }
        function h(m, I, T, M, A) {
          return I = a(m, I || "width", !1, M, A), T = a(m, T || "height", !1, M, A), M && (I == null || T == null) ? null : new X(I, T);
        }
        function f(m, I, T) {
          return m === "none" ? null : I === "number" ? parseFloat(m) : I === "array" ? m ? m.split(/[\s,]+/g).map(parseFloat) : [] : I === "color" ? O(m) || m : I === "lookup" ? T[m] : m;
        }
        function d(m, I, T, M) {
          var A = m.childNodes, R = I === "clippath", V = I === "defs", B = new At(), H = B._project, D = H._currentStyle, j = [];
          if (!R && !V && (B = C(B, m, M), H._currentStyle = B._style.clone()), M)
            for (var G = m.querySelectorAll("defs"), Y = 0, $ = G.length; Y < $; Y++)
              w(G[Y], T, !1);
          for (var Y = 0, $ = A.length; Y < $; Y++) {
            var Q = A[Y], at;
            Q.nodeType === 1 && !/^defs$/i.test(Q.nodeName) && (at = w(Q, T, !1)) && !(at instanceof Fe) && j.push(at);
          }
          return B.addChildren(j), R && (B = C(B.reduce(), m, M)), H._currentStyle = D, (R || V) && (B.remove(), B = null), B;
        }
        function c(m, I) {
          for (var T = m.getAttribute("points").match(
            /[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g
          ), M = [], A = 0, R = T.length; A < R; A += 2)
            M.push(new F(
              parseFloat(T[A]),
              parseFloat(T[A + 1])
            ));
          var V = new Jt(M);
          return I === "polygon" && V.closePath(), V;
        }
        function p(m) {
          return ue.create(m.getAttribute("d"));
        }
        function g(m, I) {
          var T = (a(m, "href", !0) || "").substring(1), M = I === "radialgradient", A;
          if (T)
            A = i[T].getGradient(), A._radial ^ M && (A = A.clone(), A._radial = M);
          else {
            for (var R = m.childNodes, V = [], B = 0, H = R.length; B < H; B++) {
              var D = R[B];
              D.nodeType === 1 && V.push(C(new cn(), D));
            }
            A = new Vi(V, M);
          }
          var j, G, Y, $ = a(m, "gradientUnits", !0) !== "userSpaceOnUse";
          M ? (j = u(
            m,
            "cx",
            "cy",
            !1,
            $,
            "50%",
            "50%"
          ), G = j.add(
            a(m, "r", !1, !1, $, "50%"),
            0
          ), Y = u(m, "fx", "fy", !0, $)) : (j = u(
            m,
            "x1",
            "y1",
            !1,
            $,
            "0%",
            "0%"
          ), G = u(
            m,
            "x2",
            "y2",
            !1,
            $,
            "100%",
            "0%"
          ));
          var Q = C(
            new Me(A, j, G, Y),
            m
          );
          return Q._scaleToBounds = $, null;
        }
        var b = {
          "#document": function(m, I, T, M) {
            for (var A = m.childNodes, R = 0, V = A.length; R < V; R++) {
              var B = A[R];
              if (B.nodeType === 1)
                return w(B, T, M);
            }
          },
          g: d,
          svg: d,
          clippath: d,
          polygon: c,
          polyline: c,
          path: p,
          lineargradient: g,
          radialgradient: g,
          image: function(m) {
            var I = new me(a(m, "href", !0));
            return I.on("load", function() {
              var T = h(m);
              this.setSize(T);
              var M = u(m).add(T.divide(2));
              this._matrix.append(new Pt().translate(M));
            }), I;
          },
          symbol: function(m, I, T, M) {
            return new Fe(
              d(m, I, T, M),
              !0
            );
          },
          defs: d,
          use: function(m) {
            var I = (a(m, "href", !0) || "").substring(1), T = i[I], M = u(m);
            return T ? T instanceof Fe ? T.place(M) : T.clone().translate(M) : null;
          },
          circle: function(m) {
            return new zt.Circle(
              u(m, "cx", "cy"),
              a(m, "r")
            );
          },
          ellipse: function(m) {
            return new zt.Ellipse({
              center: u(m, "cx", "cy"),
              radius: h(m, "rx", "ry")
            });
          },
          rect: function(m) {
            return new zt.Rectangle(new ut(
              u(m),
              h(m)
            ), h(m, "rx", "ry"));
          },
          line: function(m) {
            return new Jt.Line(
              u(m, "x1", "y1"),
              u(m, "x2", "y2")
            );
          },
          text: function(m) {
            var I = new ya(u(m).add(
              u(m, "dx", "dy")
            ));
            return I.setContent(m.textContent.trim() || ""), I;
          },
          switch: d
        };
        function S(m, I, T, M) {
          if (m.transform) {
            for (var A = (M.getAttribute(T) || "").split(/\)\s*/g), R = new Pt(), V = 0, B = A.length; V < B; V++) {
              var H = A[V];
              if (!H)
                break;
              for (var D = H.split(/\(\s*/), j = D[0], G = D[1].split(/[\s,]+/g), Y = 0, $ = G.length; Y < $; Y++)
                G[Y] = parseFloat(G[Y]);
              switch (j) {
                case "matrix":
                  R.append(
                    new Pt(G[0], G[1], G[2], G[3], G[4], G[5])
                  );
                  break;
                case "rotate":
                  R.rotate(G[0], G[1] || 0, G[2] || 0);
                  break;
                case "translate":
                  R.translate(G[0], G[1] || 0);
                  break;
                case "scale":
                  R.scale(G);
                  break;
                case "skewX":
                  R.skew(G[0], 0);
                  break;
                case "skewY":
                  R.skew(0, G[0]);
                  break;
              }
            }
            m.transform(R);
          }
        }
        function x(m, I, T) {
          var M = T === "fill-opacity" ? "getFillColor" : "getStrokeColor", A = m[M] && m[M]();
          A && A.setAlpha(parseFloat(I));
        }
        var y = l.set(l.each(Et, function(m) {
          this[m.attribute] = function(I, T) {
            if (I[m.set] && (I[m.set](f(T, m.type, m.fromSVG)), m.type === "color")) {
              var M = I[m.get]();
              if (M && M._scaleToBounds) {
                var A = I.getBounds();
                M.transform(new Pt().translate(A.getPoint()).scale(A.getSize()));
              }
            }
          };
        }, {}), {
          id: function(m, I) {
            i[I] = m, m.setName && m.setName(I);
          },
          "clip-path": function(m, I) {
            var T = O(I);
            if (T)
              if (T = T.clone(), T.setClipMask(!0), m instanceof At)
                m.insertChild(0, T);
              else
                return new At(T, m);
          },
          gradientTransform: S,
          transform: S,
          "fill-opacity": x,
          "stroke-opacity": x,
          visibility: function(m, I) {
            m.setVisible && m.setVisible(I === "visible");
          },
          display: function(m, I) {
            m.setVisible && m.setVisible(I !== null);
          },
          "stop-color": function(m, I) {
            m.setColor && m.setColor(I);
          },
          "stop-opacity": function(m, I) {
            m._color && m._color.setAlpha(parseFloat(I));
          },
          offset: function(m, I) {
            if (m.setOffset) {
              var T = I.match(/(.*)%$/);
              m.setOffset(T ? T[1] / 100 : parseFloat(I));
            }
          },
          viewBox: function(m, I, T, M, A) {
            var R = new ut(f(I, "array")), V = h(M, null, null, !0), B, H;
            if (m instanceof At) {
              var D = V ? V.divide(R.getSize()) : 1, H = new Pt().scale(D).translate(R.getPoint().negate());
              B = m;
            } else m instanceof Fe && (V && R.setSize(V), B = m._item);
            if (B) {
              if (E(M, "overflow", A) !== "visible") {
                var j = new zt.Rectangle(R);
                j.setClipMask(!0), B.addChild(j);
              }
              H && B.transform(H);
            }
          }
        });
        function E(m, I, T) {
          var M = m.attributes[I], A = M && M.value;
          if (!A && m.style) {
            var R = l.camelize(I);
            A = m.style[R], !A && T.node[R] !== T.parent[R] && (A = T.node[R]);
          }
          return A ? A === "none" ? null : A : n;
        }
        function C(m, I, T) {
          var M = I.parentNode, A = {
            node: Ce.getStyles(I) || {},
            parent: !T && !/^defs$/i.test(M.tagName) && Ce.getStyles(M) || {}
          };
          return l.each(y, function(R, V) {
            var B = E(I, V, A);
            m = B !== n && R(m, B, V, I, A) || m;
          }), m;
        }
        function O(m) {
          var I = m && m.match(/\((?:["'#]*)([^"')]+)/), T = I && I[1], M = T && i[s ? T.replace(s.location.href.split("#")[0] + "#", "") : T];
          return M && M._scaleToBounds && (M = M.clone(), M._scaleToBounds = !0), M;
        }
        function w(m, I, T) {
          var M = m.nodeName.toLowerCase(), A = M !== "#document", R = o.body, V, B, H;
          T && A && (r = gt.getView().getSize(), r = h(m, null, null, !0) || r, V = pt.create("svg", {
            style: "stroke-width: 1px; stroke-miterlimit: 10"
          }), B = m.parentNode, H = m.nextSibling, V.appendChild(m), R.appendChild(V));
          var D = gt.settings, j = D.applyMatrix, G = D.insertItems;
          D.applyMatrix = !1, D.insertItems = !1;
          var Y = b[M], $ = Y && Y(m, M, I, T) || null;
          if (D.insertItems = G, D.applyMatrix = j, $) {
            A && !($ instanceof At) && ($ = C($, m, T));
            var Q = I.onImport, at = A && m.getAttribute("data-paper-data");
            Q && ($ = Q(m, $, I) || $), I.expandShapes && $ instanceof zt && ($.remove(), $ = $.toPath()), at && ($._data = JSON.parse(at));
          }
          return V && (R.removeChild(V), B && (H ? B.insertBefore(m, H) : B.appendChild(m))), T && (i = {}, $ && l.pick(I.applyMatrix, j) && $.matrix.apply(!0, !0)), $;
        }
        function P(m, I, T) {
          if (!m)
            return null;
          I = typeof I == "function" ? { onLoad: I } : I || {};
          var M = gt, A = null;
          function R(D) {
            try {
              var j = typeof D == "object" ? D : new e.DOMParser().parseFromString(
                D.trim(),
                "image/svg+xml"
              );
              if (!j.nodeName)
                throw j = null, new Error("Unsupported SVG source: " + m);
              gt = M, A = w(j, I, !0), (!I || I.insert !== !1) && T._insertItem(n, A);
              var G = I.onLoad;
              G && G(A, D);
            } catch (Y) {
              V(Y);
            }
          }
          function V(D, j) {
            var G = I.onError;
            if (G)
              G(D, j);
            else
              throw new Error(D);
          }
          if (typeof m == "string" && !/^[\s\S]*</.test(m)) {
            var B = o.getElementById(m);
            B ? R(B) : vt.request({
              url: m,
              async: !0,
              onLoad: R,
              onError: V
            });
          } else if (typeof File < "u" && m instanceof File) {
            var H = new FileReader();
            return H.onload = function() {
              R(H.result);
            }, H.onerror = function() {
              V(H.error);
            }, H.readAsText(m);
          } else
            R(m);
          return A;
        }
        ht.inject({
          importSVG: function(m, I) {
            return P(m, I, this);
          }
        }), Bt.inject({
          importSVG: function(m, I) {
            return this.activate(), P(m, I, this);
          }
        });
      }(), l.exports.PaperScript = (function() {
        var i = this, r = i.acorn;
        if (!r && typeof k_ < "u")
          try {
            r = nm;
          } catch {
          }
        if (!r) {
          var a, u;
          r = a = u = {}, function(C, O) {
            if (typeof a == "object" && typeof u == "object") return O(a);
            if (typeof n == "function" && n.amd) return n(["exports"], O);
            O(C.acorn || (C.acorn = {}));
          }(this, function(C) {
            C.version = "0.5.0";
            var O, w, P, m;
            C.parse = function(U, Z) {
              return w = String(U), P = w.length, T(Z), zu(), Ec(O.program);
            };
            var I = C.defaultOptions = {
              ecmaVersion: 5,
              strictSemicolons: !1,
              allowTrailingCommas: !0,
              forbidReserved: !1,
              allowReturnOutsideFunction: !1,
              locations: !1,
              onComment: null,
              ranges: !1,
              program: null,
              sourceFile: null,
              directSourceFile: null
            };
            function T(U) {
              O = U || {};
              for (var Z in I) Object.prototype.hasOwnProperty.call(O, Z) || (O[Z] = I[Z]);
              m = O.sourceFile || null;
            }
            var M = C.getLineInfo = function(U, Z) {
              for (var J = 1, rt = 0; ; ) {
                rr.lastIndex = rt;
                var Dt = rr.exec(U);
                if (Dt && Dt.index < Z)
                  ++J, rt = Dt.index + Dt[0].length;
                else break;
              }
              return { line: J, column: Z - rt };
            };
            C.tokenize = function(U, Z) {
              w = String(U), P = w.length, T(Z), zu();
              var J = {};
              function rt(Dt) {
                return at = V, zn(Dt), J.start = R, J.end = V, J.startLoc = B, J.endLoc = H, J.type = D, J.value = j, J;
              }
              return rt.jumpTo = function(Dt, Vt) {
                if (A = Dt, O.locations) {
                  Y = 1, $ = rr.lastIndex = 0;
                  for (var Ht; (Ht = rr.exec(w)) && Ht.index < Dt; )
                    ++Y, $ = Ht.index + Ht[0].length;
                }
                G = Vt, sr();
              }, rt;
            };
            var A, R, V, B, H, D, j, G, Y, $, Q, at, dt, _t, St, et;
            function nt(U, Z) {
              var J = M(w, U);
              Z += " (" + J.line + ":" + J.column + ")";
              var rt = new SyntaxError(Z);
              throw rt.pos = U, rt.loc = J, rt.raisedAt = A, rt;
            }
            var yt = [], kt = { type: "num" }, Ct = { type: "regexp" }, Rt = { type: "string" }, Mt = { type: "name" }, jt = { type: "eof" }, Zt = { keyword: "break" }, qt = { keyword: "case", beforeExpr: !0 }, Ve = { keyword: "catch" }, Be = { keyword: "continue" }, We = { keyword: "debugger" }, Le = { keyword: "default" }, ge = { keyword: "do", isLoop: !0 }, Ne = { keyword: "else", beforeExpr: !0 }, si = { keyword: "finally" }, Ue = { keyword: "for", isLoop: !0 }, xi = { keyword: "function" }, dn = { keyword: "if" }, Ai = { keyword: "return", beforeExpr: !0 }, Ti = { keyword: "switch" }, ai = { keyword: "throw", beforeExpr: !0 }, hi = { keyword: "try" }, pn = { keyword: "var" }, Ei = { keyword: "while", isLoop: !0 }, ps = { keyword: "with" }, Cu = { keyword: "new", beforeExpr: !0 }, Iu = { keyword: "this" }, ku = { keyword: "null", atomValue: null }, Pu = { keyword: "true", atomValue: !0 }, Au = { keyword: "false", atomValue: !1 }, gs = { keyword: "in", binop: 7, beforeExpr: !0 }, ba = {
              break: Zt,
              case: qt,
              catch: Ve,
              continue: Be,
              debugger: We,
              default: Le,
              do: ge,
              else: Ne,
              finally: si,
              for: Ue,
              function: xi,
              if: dn,
              return: Ai,
              switch: Ti,
              throw: ai,
              try: hi,
              var: pn,
              while: Ei,
              with: ps,
              null: ku,
              true: Pu,
              false: Au,
              new: Cu,
              in: gs,
              instanceof: { keyword: "instanceof", binop: 7, beforeExpr: !0 },
              this: Iu,
              typeof: { keyword: "typeof", prefix: !0, beforeExpr: !0 },
              void: { keyword: "void", prefix: !0, beforeExpr: !0 },
              delete: { keyword: "delete", prefix: !0, beforeExpr: !0 }
            }, _s = { type: "[", beforeExpr: !0 }, ms = { type: "]" }, ir = { type: "{", beforeExpr: !0 }, Nn = { type: "}" }, Bi = { type: "(", beforeExpr: !0 }, Oi = { type: ")" }, Yi = { type: ",", beforeExpr: !0 }, Ui = { type: ";", beforeExpr: !0 }, nr = { type: ":", beforeExpr: !0 }, xa = { type: "." }, wa = { type: "?", beforeExpr: !0 }, Sa = { binop: 10, beforeExpr: !0 }, Ca = { isAssign: !0, beforeExpr: !0 }, Rn = { isAssign: !0, beforeExpr: !0 }, nc = { postfix: !0, prefix: !0, isUpdate: !0 }, Tu = { prefix: !0, beforeExpr: !0 }, Eu = { binop: 1, beforeExpr: !0 }, Ou = { binop: 2, beforeExpr: !0 }, rc = { binop: 3, beforeExpr: !0 }, sc = { binop: 4, beforeExpr: !0 }, ac = { binop: 5, beforeExpr: !0 }, oc = { binop: 6, beforeExpr: !0 }, uc = { binop: 7, beforeExpr: !0 }, lc = { binop: 8, beforeExpr: !0 }, hc = { binop: 9, prefix: !0, beforeExpr: !0 }, fc = { binop: 10, beforeExpr: !0 };
            C.tokTypes = {
              bracketL: _s,
              bracketR: ms,
              braceL: ir,
              braceR: Nn,
              parenL: Bi,
              parenR: Oi,
              comma: Yi,
              semi: Ui,
              colon: nr,
              dot: xa,
              question: wa,
              slash: Sa,
              eq: Ca,
              name: Mt,
              eof: jt,
              num: kt,
              regexp: Ct,
              string: Rt
            };
            for (var Mu in ba) C.tokTypes["_" + Mu] = ba[Mu];
            function Tr(U) {
              U = U.split(" ");
              var Z = "", J = [];
              t: for (var rt = 0; rt < U.length; ++rt) {
                for (var Dt = 0; Dt < J.length; ++Dt)
                  if (J[Dt][0].length == U[rt].length) {
                    J[Dt].push(U[rt]);
                    continue t;
                  }
                J.push([U[rt]]);
              }
              function Vt(ce) {
                if (ce.length == 1) return Z += "return str === " + JSON.stringify(ce[0]) + ";";
                Z += "switch(str){";
                for (var Li = 0; Li < ce.length; ++Li) Z += "case " + JSON.stringify(ce[Li]) + ":";
                Z += "return true}return false;";
              }
              if (J.length > 3) {
                J.sort(function(ce, Li) {
                  return Li.length - ce.length;
                }), Z += "switch(str.length){";
                for (var rt = 0; rt < J.length; ++rt) {
                  var Ht = J[rt];
                  Z += "case " + Ht[0].length + ":", Vt(Ht);
                }
                Z += "}";
              } else
                Vt(U);
              return new Function("str", Z);
            }
            var cc = Tr("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"), dc = Tr("class enum extends super const export import"), Lu = Tr("implements interface let package private protected public static yield"), vs = Tr("eval arguments"), pc = Tr("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"), gc = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Nu = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", _c = "̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿", Ru = new RegExp("[" + Nu + "]"), mc = new RegExp("[" + Nu + _c + "]"), ys = /[\n\r\u2028\u2029]/, rr = /\r\n|[\n\r\u2028\u2029]/g, bs = C.isIdentifierStart = function(U) {
              return U < 65 ? U === 36 : U < 91 ? !0 : U < 97 ? U === 95 : U < 123 ? !0 : U >= 170 && Ru.test(String.fromCharCode(U));
            }, Fu = C.isIdentifierChar = function(U) {
              return U < 48 ? U === 36 : U < 58 ? !0 : U < 65 ? !1 : U < 91 ? !0 : U < 97 ? U === 95 : U < 123 ? !0 : U >= 170 && mc.test(String.fromCharCode(U));
            };
            function Fn() {
              this.line = Y, this.column = A - $;
            }
            function zu() {
              Y = 1, A = $ = 0, G = !0, sr();
            }
            function qe(U, Z) {
              V = A, O.locations && (H = new Fn()), D = U, sr(), j = Z, G = U.beforeExpr;
            }
            function vc() {
              var U = O.onComment && O.locations && new Fn(), Z = A, J = w.indexOf("*/", A += 2);
              if (J === -1 && nt(A - 2, "Unterminated comment"), A = J + 2, O.locations) {
                rr.lastIndex = Z;
                for (var rt; (rt = rr.exec(w)) && rt.index < A; )
                  ++Y, $ = rt.index + rt[0].length;
              }
              O.onComment && O.onComment(
                !0,
                w.slice(Z + 2, J),
                Z,
                A,
                U,
                O.locations && new Fn()
              );
            }
            function Ia() {
              for (var U = A, Z = O.onComment && O.locations && new Fn(), J = w.charCodeAt(A += 2); A < P && J !== 10 && J !== 13 && J !== 8232 && J !== 8233; )
                ++A, J = w.charCodeAt(A);
              O.onComment && O.onComment(
                !1,
                w.slice(U + 2, A),
                U,
                A,
                Z,
                O.locations && new Fn()
              );
            }
            function sr() {
              for (; A < P; ) {
                var U = w.charCodeAt(A);
                if (U === 32)
                  ++A;
                else if (U === 13) {
                  ++A;
                  var Z = w.charCodeAt(A);
                  Z === 10 && ++A, O.locations && (++Y, $ = A);
                } else if (U === 10 || U === 8232 || U === 8233)
                  ++A, O.locations && (++Y, $ = A);
                else if (U > 8 && U < 14)
                  ++A;
                else if (U === 47) {
                  var Z = w.charCodeAt(A + 1);
                  if (Z === 42)
                    vc();
                  else if (Z === 47)
                    Ia();
                  else break;
                } else if (U === 160)
                  ++A;
                else if (U >= 5760 && gc.test(String.fromCharCode(U)))
                  ++A;
                else
                  break;
              }
            }
            function yc() {
              var U = w.charCodeAt(A + 1);
              return U >= 48 && U <= 57 ? Vu(!0) : (++A, qe(xa));
            }
            function bc() {
              var U = w.charCodeAt(A + 1);
              return G ? (++A, Du()) : U === 61 ? je(Rn, 2) : je(Sa, 1);
            }
            function xc() {
              var U = w.charCodeAt(A + 1);
              return U === 61 ? je(Rn, 2) : je(fc, 1);
            }
            function wc(U) {
              var Z = w.charCodeAt(A + 1);
              return Z === U ? je(U === 124 ? Eu : Ou, 2) : Z === 61 ? je(Rn, 2) : je(U === 124 ? rc : ac, 1);
            }
            function Sc() {
              var U = w.charCodeAt(A + 1);
              return U === 61 ? je(Rn, 2) : je(sc, 1);
            }
            function Cc(U) {
              var Z = w.charCodeAt(A + 1);
              return Z === U ? Z == 45 && w.charCodeAt(A + 2) == 62 && ys.test(w.slice(at, A)) ? (A += 3, Ia(), sr(), zn()) : je(nc, 2) : Z === 61 ? je(Rn, 2) : je(hc, 1);
            }
            function Ic(U) {
              var Z = w.charCodeAt(A + 1), J = 1;
              return Z === U ? (J = U === 62 && w.charCodeAt(A + 2) === 62 ? 3 : 2, w.charCodeAt(A + J) === 61 ? je(Rn, J + 1) : je(lc, J)) : Z == 33 && U == 60 && w.charCodeAt(A + 2) == 45 && w.charCodeAt(A + 3) == 45 ? (A += 4, Ia(), sr(), zn()) : (Z === 61 && (J = w.charCodeAt(A + 2) === 61 ? 3 : 2), je(uc, J));
            }
            function kc(U) {
              var Z = w.charCodeAt(A + 1);
              return Z === 61 ? je(oc, w.charCodeAt(A + 2) === 61 ? 3 : 2) : je(U === 61 ? Ca : Tu, 1);
            }
            function Pc(U) {
              switch (U) {
                case 46:
                  return yc();
                case 40:
                  return ++A, qe(Bi);
                case 41:
                  return ++A, qe(Oi);
                case 59:
                  return ++A, qe(Ui);
                case 44:
                  return ++A, qe(Yi);
                case 91:
                  return ++A, qe(_s);
                case 93:
                  return ++A, qe(ms);
                case 123:
                  return ++A, qe(ir);
                case 125:
                  return ++A, qe(Nn);
                case 58:
                  return ++A, qe(nr);
                case 63:
                  return ++A, qe(wa);
                case 48:
                  var Z = w.charCodeAt(A + 1);
                  if (Z === 120 || Z === 88) return Ac();
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                  return Vu(!1);
                case 34:
                case 39:
                  return Tc(U);
                case 47:
                  return bc();
                case 37:
                case 42:
                  return xc();
                case 124:
                case 38:
                  return wc(U);
                case 94:
                  return Sc();
                case 43:
                case 45:
                  return Cc(U);
                case 60:
                case 62:
                  return Ic(U);
                case 61:
                case 33:
                  return kc(U);
                case 126:
                  return je(Tu, 1);
              }
              return !1;
            }
            function zn(U) {
              if (U ? A = R + 1 : R = A, O.locations && (B = new Fn()), U) return Du();
              if (A >= P) return qe(jt);
              var Z = w.charCodeAt(A);
              if (bs(Z) || Z === 92) return Uu();
              var J = Pc(Z);
              if (J === !1) {
                var rt = String.fromCharCode(Z);
                if (rt === "\\" || Ru.test(rt)) return Uu();
                nt(A, "Unexpected character '" + rt + "'");
              }
              return J;
            }
            function je(U, Z) {
              var J = w.slice(A, A + Z);
              A += Z, qe(U, J);
            }
            function Du() {
              for (var Dt = "", U, Z, J = A; ; ) {
                A >= P && nt(J, "Unterminated regular expression");
                var rt = w.charAt(A);
                if (ys.test(rt) && nt(J, "Unterminated regular expression"), U)
                  U = !1;
                else {
                  if (rt === "[") Z = !0;
                  else if (rt === "]" && Z) Z = !1;
                  else if (rt === "/" && !Z) break;
                  U = rt === "\\";
                }
                ++A;
              }
              var Dt = w.slice(J, A);
              ++A;
              var Vt = Bu();
              Vt && !/^[gmsiy]*$/.test(Vt) && nt(J, "Invalid regexp flag");
              try {
                var Ht = new RegExp(Dt, Vt);
              } catch (ce) {
                ce instanceof SyntaxError && nt(J, ce.message), nt(ce);
              }
              return qe(Ct, Ht);
            }
            function Er(U, Z) {
              for (var J = A, rt = 0, Dt = 0, Vt = Z ?? 1 / 0; Dt < Vt; ++Dt) {
                var Ht = w.charCodeAt(A), ce;
                if (Ht >= 97 ? ce = Ht - 97 + 10 : Ht >= 65 ? ce = Ht - 65 + 10 : Ht >= 48 && Ht <= 57 ? ce = Ht - 48 : ce = 1 / 0, ce >= U) break;
                ++A, rt = rt * U + ce;
              }
              return A === J || Z != null && A - J !== Z ? null : rt;
            }
            function Ac() {
              A += 2;
              var U = Er(16);
              return U == null && nt(R + 2, "Expected hexadecimal number"), bs(w.charCodeAt(A)) && nt(A, "Identifier directly after number"), qe(kt, U);
            }
            function Vu(U) {
              var Z = A, J = !1, rt = w.charCodeAt(A) === 48;
              !U && Er(10) === null && nt(Z, "Invalid number"), w.charCodeAt(A) === 46 && (++A, Er(10), J = !0);
              var Dt = w.charCodeAt(A);
              (Dt === 69 || Dt === 101) && (Dt = w.charCodeAt(++A), (Dt === 43 || Dt === 45) && ++A, Er(10) === null && nt(Z, "Invalid number"), J = !0), bs(w.charCodeAt(A)) && nt(A, "Identifier directly after number");
              var Vt = w.slice(Z, A), Ht;
              return J ? Ht = parseFloat(Vt) : !rt || Vt.length === 1 ? Ht = parseInt(Vt, 10) : /[89]/.test(Vt) || et ? nt(Z, "Invalid number") : Ht = parseInt(Vt, 8), qe(kt, Ht);
            }
            function Tc(U) {
              A++;
              for (var Z = ""; ; ) {
                A >= P && nt(R, "Unterminated string constant");
                var J = w.charCodeAt(A);
                if (J === U)
                  return ++A, qe(Rt, Z);
                if (J === 92) {
                  J = w.charCodeAt(++A);
                  var rt = /^[0-7]+/.exec(w.slice(A, A + 3));
                  for (rt && (rt = rt[0]); rt && parseInt(rt, 8) > 255; ) rt = rt.slice(0, -1);
                  if (rt === "0" && (rt = null), ++A, rt)
                    et && nt(A - 2, "Octal literal in strict mode"), Z += String.fromCharCode(parseInt(rt, 8)), A += rt.length - 1;
                  else
                    switch (J) {
                      case 110:
                        Z += `
`;
                        break;
                      case 114:
                        Z += "\r";
                        break;
                      case 120:
                        Z += String.fromCharCode(xs(2));
                        break;
                      case 117:
                        Z += String.fromCharCode(xs(4));
                        break;
                      case 85:
                        Z += String.fromCharCode(xs(8));
                        break;
                      case 116:
                        Z += "	";
                        break;
                      case 98:
                        Z += "\b";
                        break;
                      case 118:
                        Z += "\v";
                        break;
                      case 102:
                        Z += "\f";
                        break;
                      case 48:
                        Z += "\0";
                        break;
                      case 13:
                        w.charCodeAt(A) === 10 && ++A;
                      case 10:
                        O.locations && ($ = A, ++Y);
                        break;
                      default:
                        Z += String.fromCharCode(J);
                        break;
                    }
                } else
                  (J === 13 || J === 10 || J === 8232 || J === 8233) && nt(R, "Unterminated string constant"), Z += String.fromCharCode(J), ++A;
              }
            }
            function xs(U) {
              var Z = Er(16, U);
              return Z === null && nt(R, "Bad character escape sequence"), Z;
            }
            var ar;
            function Bu() {
              ar = !1;
              for (var U, Z = !0, J = A; ; ) {
                var rt = w.charCodeAt(A);
                if (Fu(rt))
                  ar && (U += w.charAt(A)), ++A;
                else if (rt === 92) {
                  ar || (U = w.slice(J, A)), ar = !0, w.charCodeAt(++A) != 117 && nt(A, "Expecting Unicode escape sequence \\uXXXX"), ++A;
                  var Dt = xs(4), Vt = String.fromCharCode(Dt);
                  Vt || nt(A - 1, "Invalid Unicode escape"), (Z ? bs(Dt) : Fu(Dt)) || nt(A - 4, "Invalid Unicode escape"), U += Vt;
                } else
                  break;
                Z = !1;
              }
              return ar ? U : w.slice(J, A);
            }
            function Uu() {
              var U = Bu(), Z = Mt;
              return !ar && pc(U) && (Z = ba[U]), qe(Z, U);
            }
            function le() {
              Q = R, at = V, dt = H, zn();
            }
            function ka(U) {
              if (et = U, A = R, O.locations)
                for (; A < $; )
                  $ = w.lastIndexOf(`
`, $ - 2) + 1, --Y;
              sr(), zn();
            }
            function qu() {
              this.type = null, this.start = R, this.end = null;
            }
            function ju() {
              this.start = B, this.end = null, m !== null && (this.source = m);
            }
            function Ge() {
              var U = new qu();
              return O.locations && (U.loc = new ju()), O.directSourceFile && (U.sourceFile = O.directSourceFile), O.ranges && (U.range = [R, 0]), U;
            }
            function gn(U) {
              var Z = new qu();
              return Z.start = U.start, O.locations && (Z.loc = new ju(), Z.loc.start = U.loc.start), O.ranges && (Z.range = [U.range[0], 0]), Z;
            }
            function te(U, Z) {
              return U.type = Z, U.end = at, O.locations && (U.loc.end = dt), O.ranges && (U.range[1] = at), U;
            }
            function Pa(U) {
              return O.ecmaVersion >= 5 && U.type === "ExpressionStatement" && U.expression.type === "Literal" && U.expression.value === "use strict";
            }
            function Pe(U) {
              if (D === U)
                return le(), !0;
            }
            function ws() {
              return !O.strictSemicolons && (D === jt || D === Nn || ys.test(w.slice(at, R)));
            }
            function Dn() {
              !Pe(Ui) && !ws() && $i();
            }
            function ze(U) {
              D === U ? le() : $i();
            }
            function $i() {
              nt(R, "Unexpected token");
            }
            function Ss(U) {
              U.type !== "Identifier" && U.type !== "MemberExpression" && nt(U.start, "Assigning to rvalue"), et && U.type === "Identifier" && vs(U.name) && nt(U.start, "Assigning to " + U.name + " in strict mode");
            }
            function Ec(U) {
              Q = at = A, O.locations && (dt = new Fn()), _t = et = null, St = [], zn();
              var Z = U || Ge(), J = !0;
              for (U || (Z.body = []); D !== jt; ) {
                var rt = Mi();
                Z.body.push(rt), J && Pa(rt) && ka(!0), J = !1;
              }
              return te(Z, "Program");
            }
            var Aa = { kind: "loop" }, Oc = { kind: "switch" };
            function Mi() {
              (D === Sa || D === Rn && j == "/=") && zn(!0);
              var U = D, Z = Ge();
              switch (U) {
                case Zt:
                case Be:
                  le();
                  var J = U === Zt;
                  Pe(Ui) || ws() ? Z.label = null : D !== Mt ? $i() : (Z.label = _n(), Dn());
                  for (var rt = 0; rt < St.length; ++rt) {
                    var Dt = St[rt];
                    if ((Z.label == null || Dt.name === Z.label.name) && (Dt.kind != null && (J || Dt.kind === "loop") || Z.label && J))
                      break;
                  }
                  return rt === St.length && nt(Z.start, "Unsyntactic " + U.keyword), te(Z, J ? "BreakStatement" : "ContinueStatement");
                case We:
                  return le(), Dn(), te(Z, "DebuggerStatement");
                case ge:
                  return le(), St.push(Aa), Z.body = Mi(), St.pop(), ze(Ei), Z.test = Or(), Dn(), te(Z, "DoWhileStatement");
                case Ue:
                  if (le(), St.push(Aa), ze(Bi), D === Ui) return Ta(Z, null);
                  if (D === pn) {
                    var Vt = Ge();
                    return le(), Wu(Vt, !0), te(Vt, "VariableDeclaration"), Vt.declarations.length === 1 && Pe(gs) ? Hu(Z, Vt) : Ta(Z, Vt);
                  }
                  var Vt = Ze(!1, !0);
                  return Pe(gs) ? (Ss(Vt), Hu(Z, Vt)) : Ta(Z, Vt);
                case xi:
                  return le(), Na(Z, !0);
                case dn:
                  return le(), Z.test = Or(), Z.consequent = Mi(), Z.alternate = Pe(Ne) ? Mi() : null, te(Z, "IfStatement");
                case Ai:
                  return !_t && !O.allowReturnOutsideFunction && nt(R, "'return' outside of function"), le(), Pe(Ui) || ws() ? Z.argument = null : (Z.argument = Ze(), Dn()), te(Z, "ReturnStatement");
                case Ti:
                  le(), Z.discriminant = Or(), Z.cases = [], ze(ir), St.push(Oc);
                  for (var Ht, ce; D != Nn; )
                    if (D === qt || D === Le) {
                      var Li = D === qt;
                      Ht && te(Ht, "SwitchCase"), Z.cases.push(Ht = Ge()), Ht.consequent = [], le(), Li ? Ht.test = Ze() : (ce && nt(Q, "Multiple default clauses"), ce = !0, Ht.test = null), ze(nr);
                    } else
                      Ht || $i(), Ht.consequent.push(Mi());
                  return Ht && te(Ht, "SwitchCase"), le(), St.pop(), te(Z, "SwitchStatement");
                case ai:
                  return le(), ys.test(w.slice(at, R)) && nt(at, "Illegal newline after throw"), Z.argument = Ze(), Dn(), te(Z, "ThrowStatement");
                case hi:
                  if (le(), Z.block = Mr(), Z.handler = null, D === Ve) {
                    var Vn = Ge();
                    le(), ze(Bi), Vn.param = _n(), et && vs(Vn.param.name) && nt(Vn.param.start, "Binding " + Vn.param.name + " in strict mode"), ze(Oi), Vn.guard = null, Vn.body = Mr(), Z.handler = te(Vn, "CatchClause");
                  }
                  return Z.guardedHandlers = yt, Z.finalizer = Pe(si) ? Mr() : null, !Z.handler && !Z.finalizer && nt(Z.start, "Missing catch or finally clause"), te(Z, "TryStatement");
                case pn:
                  return le(), Wu(Z), Dn(), te(Z, "VariableDeclaration");
                case Ei:
                  return le(), Z.test = Or(), St.push(Aa), Z.body = Mi(), St.pop(), te(Z, "WhileStatement");
                case ps:
                  return et && nt(R, "'with' in strict mode"), le(), Z.object = Or(), Z.body = Mi(), te(Z, "WithStatement");
                case ir:
                  return Mr();
                case Ui:
                  return le(), te(Z, "EmptyStatement");
                default:
                  var Fa = j, Cs = Ze();
                  if (U === Mt && Cs.type === "Identifier" && Pe(nr)) {
                    for (var rt = 0; rt < St.length; ++rt)
                      St[rt].name === Fa && nt(Cs.start, "Label '" + Fa + "' is already declared");
                    var zc = D.isLoop ? "loop" : D === Ti ? "switch" : null;
                    return St.push({ name: Fa, kind: zc }), Z.body = Mi(), St.pop(), Z.label = Cs, te(Z, "LabeledStatement");
                  } else
                    return Z.expression = Cs, Dn(), te(Z, "ExpressionStatement");
              }
            }
            function Or() {
              ze(Bi);
              var U = Ze();
              return ze(Oi), U;
            }
            function Mr(U) {
              var Z = Ge(), J = !0, rt = !1, Dt;
              for (Z.body = [], ze(ir); !Pe(Nn); ) {
                var Vt = Mi();
                Z.body.push(Vt), J && U && Pa(Vt) && (Dt = rt, ka(rt = !0)), J = !1;
              }
              return rt && !Dt && ka(!1), te(Z, "BlockStatement");
            }
            function Ta(U, Z) {
              return U.init = Z, ze(Ui), U.test = D === Ui ? null : Ze(), ze(Ui), U.update = D === Oi ? null : Ze(), ze(Oi), U.body = Mi(), St.pop(), te(U, "ForStatement");
            }
            function Hu(U, Z) {
              return U.left = Z, U.right = Ze(), ze(Oi), U.body = Mi(), St.pop(), te(U, "ForInStatement");
            }
            function Wu(U, Z) {
              for (U.declarations = [], U.kind = "var"; ; ) {
                var J = Ge();
                if (J.id = _n(), et && vs(J.id.name) && nt(J.id.start, "Binding " + J.id.name + " in strict mode"), J.init = Pe(Ca) ? Ze(!0, Z) : null, U.declarations.push(te(J, "VariableDeclarator")), !Pe(Yi)) break;
              }
              return U;
            }
            function Ze(U, Z) {
              var J = Ea(Z);
              if (!U && D === Yi) {
                var rt = gn(J);
                for (rt.expressions = [J]; Pe(Yi); ) rt.expressions.push(Ea(Z));
                return te(rt, "SequenceExpression");
              }
              return J;
            }
            function Ea(U) {
              var Z = Mc(U);
              if (D.isAssign) {
                var J = gn(Z);
                return J.operator = j, J.left = Z, le(), J.right = Ea(U), Ss(Z), te(J, "AssignmentExpression");
              }
              return Z;
            }
            function Mc(U) {
              var Z = Lc(U);
              if (Pe(wa)) {
                var J = gn(Z);
                return J.test = Z, J.consequent = Ze(!0), ze(nr), J.alternate = Ze(!0, U), te(J, "ConditionalExpression");
              }
              return Z;
            }
            function Lc(U) {
              return Oa(Ma(), -1, U);
            }
            function Oa(U, Z, J) {
              var rt = D.binop;
              if (rt != null && (!J || D !== gs) && rt > Z) {
                var Dt = gn(U);
                Dt.left = U, Dt.operator = j;
                var Vt = D;
                le(), Dt.right = Oa(Ma(), rt, J);
                var Ht = te(Dt, Vt === Eu || Vt === Ou ? "LogicalExpression" : "BinaryExpression");
                return Oa(Ht, Z, J);
              }
              return U;
            }
            function Ma() {
              if (D.prefix) {
                var U = Ge(), Z = D.isUpdate;
                return U.operator = j, U.prefix = !0, G = !0, le(), U.argument = Ma(), Z ? Ss(U.argument) : et && U.operator === "delete" && U.argument.type === "Identifier" && nt(U.start, "Deleting local variable in strict mode"), te(U, Z ? "UpdateExpression" : "UnaryExpression");
              }
              for (var J = Nc(); D.postfix && !ws(); ) {
                var U = gn(J);
                U.operator = j, U.prefix = !1, U.argument = J, Ss(J), le(), J = te(U, "UpdateExpression");
              }
              return J;
            }
            function Nc() {
              return Lr(La());
            }
            function Lr(U, Z) {
              if (Pe(xa)) {
                var J = gn(U);
                return J.object = U, J.property = _n(!0), J.computed = !1, Lr(te(J, "MemberExpression"), Z);
              } else if (Pe(_s)) {
                var J = gn(U);
                return J.object = U, J.property = Ze(), J.computed = !0, ze(ms), Lr(te(J, "MemberExpression"), Z);
              } else if (!Z && Pe(Bi)) {
                var J = gn(U);
                return J.callee = U, J.arguments = Ra(Oi, !1), Lr(te(J, "CallExpression"), Z);
              } else return U;
            }
            function La() {
              switch (D) {
                case Iu:
                  var rt = Ge();
                  return le(), te(rt, "ThisExpression");
                case Mt:
                  return _n();
                case kt:
                case Rt:
                case Ct:
                  var rt = Ge();
                  return rt.value = j, rt.raw = w.slice(R, V), le(), te(rt, "Literal");
                case ku:
                case Pu:
                case Au:
                  var rt = Ge();
                  return rt.value = D.atomValue, rt.raw = D.keyword, le(), te(rt, "Literal");
                case Bi:
                  var U = B, Z = R;
                  le();
                  var J = Ze();
                  return J.start = Z, J.end = V, O.locations && (J.loc.start = U, J.loc.end = H), O.ranges && (J.range = [Z, V]), ze(Oi), J;
                case _s:
                  var rt = Ge();
                  return le(), rt.elements = Ra(ms, !0, !0), te(rt, "ArrayExpression");
                case ir:
                  return Fc();
                case xi:
                  var rt = Ge();
                  return le(), Na(rt, !1);
                case Cu:
                  return Rc();
                default:
                  $i();
              }
            }
            function Rc() {
              var U = Ge();
              return le(), U.callee = Lr(La(), !0), Pe(Bi) ? U.arguments = Ra(Oi, !1) : U.arguments = yt, te(U, "NewExpression");
            }
            function Fc() {
              var U = Ge(), Z = !0, J = !1;
              for (U.properties = [], le(); !Pe(Nn); ) {
                if (Z)
                  Z = !1;
                else if (ze(Yi), O.allowTrailingCommas && Pe(Nn)) break;
                var rt = { key: Gu() }, Dt = !1, Vt;
                if (Pe(nr) ? (rt.value = Ze(!0), Vt = rt.kind = "init") : O.ecmaVersion >= 5 && rt.key.type === "Identifier" && (rt.key.name === "get" || rt.key.name === "set") ? (Dt = J = !0, Vt = rt.kind = rt.key.name, rt.key = Gu(), D !== Bi && $i(), rt.value = Na(Ge(), !1)) : $i(), rt.key.type === "Identifier" && (et || J))
                  for (var Ht = 0; Ht < U.properties.length; ++Ht) {
                    var ce = U.properties[Ht];
                    if (ce.key.name === rt.key.name) {
                      var Li = Vt == ce.kind || Dt && ce.kind === "init" || Vt === "init" && (ce.kind === "get" || ce.kind === "set");
                      Li && !et && Vt === "init" && ce.kind === "init" && (Li = !1), Li && nt(rt.key.start, "Redefinition of property");
                    }
                  }
                U.properties.push(rt);
              }
              return te(U, "ObjectExpression");
            }
            function Gu() {
              return D === kt || D === Rt ? La() : _n(!0);
            }
            function Na(U, Z) {
              D === Mt ? U.id = _n() : Z ? $i() : U.id = null, U.params = [];
              var J = !0;
              for (ze(Bi); !Pe(Oi); )
                J ? J = !1 : ze(Yi), U.params.push(_n());
              var rt = _t, Dt = St;
              if (_t = !0, St = [], U.body = Mr(!0), _t = rt, St = Dt, et || U.body.body.length && Pa(U.body.body[0]))
                for (var Vt = U.id ? -1 : 0; Vt < U.params.length; ++Vt) {
                  var Ht = Vt < 0 ? U.id : U.params[Vt];
                  if ((Lu(Ht.name) || vs(Ht.name)) && nt(Ht.start, "Defining '" + Ht.name + "' in strict mode"), Vt >= 0) for (var ce = 0; ce < Vt; ++ce) Ht.name === U.params[ce].name && nt(Ht.start, "Argument name clash in strict mode");
                }
              return te(U, Z ? "FunctionDeclaration" : "FunctionExpression");
            }
            function Ra(U, Z, J) {
              for (var rt = [], Dt = !0; !Pe(U); ) {
                if (Dt)
                  Dt = !1;
                else if (ze(Yi), Z && O.allowTrailingCommas && Pe(U)) break;
                J && D === Yi ? rt.push(null) : rt.push(Ze(!0));
              }
              return rt;
            }
            function _n(U) {
              var Z = Ge();
              return U && O.forbidReserved == "everywhere" && (U = !1), D === Mt ? (!U && (O.forbidReserved && (O.ecmaVersion === 3 ? cc : dc)(j) || et && Lu(j)) && w.slice(R, V).indexOf("\\") == -1 && nt(R, "The keyword '" + j + "' is reserved"), Z.name = j) : U && D.keyword ? Z.name = D.keyword : $i(), G = !1, le(), te(Z, "Identifier");
            }
          }), r.version || (r = null);
        }
        function h(C, O) {
          return (i.acorn || r).parse(C, O);
        }
        var f = {
          "+": "__add",
          "-": "__subtract",
          "*": "__multiply",
          "/": "__divide",
          "%": "__modulo",
          "==": "__equals",
          "!=": "__equals"
        }, d = {
          "-": "__negate",
          "+": "__self"
        }, c = l.each(
          ["add", "subtract", "multiply", "divide", "modulo", "equals", "negate"],
          function(C) {
            this["__" + C] = "#" + C;
          },
          {
            __self: function() {
              return this;
            }
          }
        );
        F.inject(c), X.inject(c), Me.inject(c);
        function p(C, O, w) {
          var P = f[O];
          if (C && C[P]) {
            var m = C[P](w);
            return O === "!=" ? !m : m;
          }
          switch (O) {
            case "+":
              return C + w;
            case "-":
              return C - w;
            case "*":
              return C * w;
            case "/":
              return C / w;
            case "%":
              return C % w;
            case "==":
              return C == w;
            case "!=":
              return C != w;
          }
        }
        function g(C, O) {
          var w = d[C];
          if (O && O[w])
            return O[w]();
          switch (C) {
            case "+":
              return +O;
            case "-":
              return -O;
          }
        }
        function b(C, O) {
          if (!C)
            return "";
          O = O || {};
          var w = [];
          function P(et) {
            for (var nt = 0, yt = w.length; nt < yt; nt++) {
              var kt = w[nt];
              if (kt[0] >= et)
                break;
              et += kt[1];
            }
            return et;
          }
          function m(et) {
            return C.substring(
              P(et.range[0]),
              P(et.range[1])
            );
          }
          function I(et, nt) {
            return C.substring(
              P(et.range[1]),
              P(nt.range[0])
            );
          }
          function T(et, nt) {
            for (var yt = P(et.range[0]), kt = P(et.range[1]), Ct = 0, Rt = w.length - 1; Rt >= 0; Rt--)
              if (yt > w[Rt][0]) {
                Ct = Rt + 1;
                break;
              }
            w.splice(Ct, 0, [yt, nt.length - kt + yt]), C = C.substring(0, yt) + nt + C.substring(kt);
          }
          function M(et, nt) {
            switch (et.type) {
              case "UnaryExpression":
                if (et.operator in d && et.argument.type !== "Literal") {
                  var yt = m(et.argument);
                  T(et, '$__("' + et.operator + '", ' + yt + ")");
                }
                break;
              case "BinaryExpression":
                if (et.operator in f && et.left.type !== "Literal") {
                  var kt = m(et.left), Ct = m(et.right), Rt = I(et.left, et.right), Mt = et.operator;
                  T(et, "__$__(" + kt + "," + Rt.replace(
                    new RegExp("\\" + Mt),
                    '"' + Mt + '"'
                  ) + ", " + Ct + ")");
                }
                break;
              case "UpdateExpression":
              case "AssignmentExpression":
                var jt = nt && nt.type;
                if (!(jt === "ForStatement" || jt === "BinaryExpression" && /^[=!<>]/.test(nt.operator) || jt === "MemberExpression" && nt.computed)) {
                  if (et.type === "UpdateExpression") {
                    var yt = m(et.argument), Zt = "__$__(" + yt + ', "' + et.operator[0] + '", 1)', qt = yt + " = " + Zt;
                    et.prefix ? qt = "(" + qt + ")" : (jt === "AssignmentExpression" || jt === "VariableDeclarator" || jt === "BinaryExpression") && (m(nt.left || nt.id) === yt && (qt = Zt), qt = yt + "; " + qt), T(et, qt);
                  } else if (/^.=$/.test(et.operator) && et.left.type !== "Literal") {
                    var kt = m(et.left), Ct = m(et.right), Zt = kt + " = __$__(" + kt + ', "' + et.operator[0] + '", ' + Ct + ")";
                    T(et, /^\(.*\)$/.test(m(et)) ? "(" + Zt + ")" : Zt);
                  }
                }
                break;
            }
          }
          function A(et) {
            switch (et.type) {
              case "ExportDefaultDeclaration":
                T({
                  range: [et.start, et.declaration.start]
                }, "module.exports = ");
                break;
              case "ExportNamedDeclaration":
                var nt = et.declaration, yt = et.specifiers;
                if (nt) {
                  var kt = nt.declarations;
                  kt && (kt.forEach(function(Rt) {
                    T(Rt, "module.exports." + m(Rt));
                  }), T({
                    range: [
                      et.start,
                      nt.start + nt.kind.length
                    ]
                  }, ""));
                } else if (yt) {
                  var Ct = yt.map(function(Rt) {
                    var Mt = m(Rt);
                    return "module.exports." + Mt + " = " + Mt + "; ";
                  }).join("");
                  Ct && T(et, Ct);
                }
                break;
            }
          }
          function R(et, nt, yt) {
            if (et) {
              for (var kt in et)
                if (kt !== "range" && kt !== "loc") {
                  var Ct = et[kt];
                  if (Array.isArray(Ct))
                    for (var Rt = 0, Mt = Ct.length; Rt < Mt; Rt++)
                      R(Ct[Rt], et, yt);
                  else Ct && typeof Ct == "object" && R(Ct, et, yt);
                }
              yt.operatorOverloading !== !1 && M(et, nt), yt.moduleExports !== !1 && A(et);
            }
          }
          function V(et) {
            var nt = "", yt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for (et = (Math.abs(et) << 1) + (et < 0 ? 1 : 0); et || !nt; ) {
              var kt = et & 31;
              et >>= 5, et && (kt |= 32), nt += yt[kt];
            }
            return nt;
          }
          var B = O.url || "", H = O.sourceMaps, D = O.paperFeatures || {}, j = O.source || C, G = O.offset || 0, Y = gt.agent, $ = Y.versionNumber, Q = !1, at = /\r\n|\n|\r/mg, dt;
          if (H && (Y.chrome && $ >= 30 || Y.webkit && $ >= 537.76 || Y.firefox && $ >= 23 || Y.node)) {
            if (Y.node)
              G -= 2;
            else if (s && B && !s.location.href.indexOf(B)) {
              var _t = o.getElementsByTagName("html")[0].innerHTML;
              G = _t.substr(0, _t.indexOf(C) + 1).match(
                at
              ).length + 1;
            }
            Q = G > 0 && !(Y.chrome && $ >= 36 || Y.safari && $ >= 600 || Y.firefox && $ >= 40 || Y.node);
            var St = ["AA" + V(Q ? 0 : G) + "A"];
            St.length = (C.match(at) || []).length + 1 + (Q ? G : 0), dt = {
              version: 3,
              file: B,
              names: [],
              mappings: St.join(";AACA"),
              sourceRoot: "",
              sources: [B],
              sourcesContent: [j]
            };
          }
          return (D.operatorOverloading !== !1 || D.moduleExports !== !1) && R(h(C, {
            ranges: !0,
            preserveParens: !0,
            sourceType: "module"
          }), null, D), dt && (Q && (C = new Array(G + 1).join(`
`) + C), /^(inline|both)$/.test(H) && (C += `
//# sourceMappingURL=data:application/json;base64,` + e.btoa(unescape(encodeURIComponent(
            JSON.stringify(dt)
          )))), C += `
//# sourceURL=` + (B || "paperscript")), {
            url: B,
            source: j,
            code: C,
            map: dt
          };
        }
        function S(C, O, w) {
          gt = O;
          var P = O.getView(), m = /\btool\.\w+|\s+on(?:Key|Mouse)(?:Up|Down|Move|Drag)\b/.test(C) && !/\bnew\s+Tool\b/.test(C) ? new wt() : null, I = m ? m._events : [], T = ["onFrame", "onResize"].concat(I), M = [], A = [], R, V = typeof C == "object" ? C : b(C, w);
          C = V.code;
          function B($, Q) {
            for (var at in $)
              (Q || !/^_/.test(at)) && new RegExp("([\\b\\s\\W]|^)" + at.replace(/\$/g, "\\$") + "\\b").test(C) && (M.push(at), A.push($[at]));
          }
          B(
            { __$__: p, $__: g, paper: O, tool: m },
            !0
          ), B(O), C = "var module = { exports: {} }; " + C;
          var G = l.each(T, function($) {
            new RegExp("\\s+" + $ + "\\b").test(C) && (M.push($), this.push("module.exports." + $ + " = " + $ + ";"));
          }, []).join(`
`);
          G && (C += `
` + G), C += `
return module.exports;`;
          var H = gt.agent;
          if (o && (H.chrome || H.firefox && H.versionNumber < 40)) {
            var D = o.createElement("script"), j = o.head || o.getElementsByTagName("head")[0];
            H.firefox && (C = `
` + C), D.appendChild(o.createTextNode(
              "document.__paperscript__ = function(" + M + ") {" + C + `
}`
            )), j.appendChild(D), R = o.__paperscript__, delete o.__paperscript__, j.removeChild(D);
          } else
            R = Function(M, C);
          var G = R && R.apply(O, A), Y = G || {};
          return l.each(I, function($) {
            var Q = Y[$];
            Q && (m[$] = Q);
          }), P && (Y.onResize && P.setOnResize(Y.onResize), P.emit("resize", {
            size: P.size,
            delta: new F()
          }), Y.onFrame && P.setOnFrame(Y.onFrame), P.requestUpdate()), G;
        }
        function x(C) {
          if (/^text\/(?:x-|)paperscript$/.test(C.type) && v.getAttribute(C, "ignore") !== "true") {
            var O = v.getAttribute(C, "canvas"), w = o.getElementById(O), P = C.src || C.getAttribute("data-src"), m = v.hasAttribute(C, "async"), I = "data-paper-scope";
            if (!w)
              throw new Error('Unable to find canvas with id "' + O + '"');
            var T = v.get(w.getAttribute(I)) || new v().setup(w);
            return w.setAttribute(I, T._id), P ? vt.request({
              url: P,
              async: m,
              mimeType: "text/plain",
              onLoad: function(M) {
                S(M, T, P);
              }
            }) : S(C.innerHTML, T, C.baseURI), C.setAttribute("data-paper-ignore", "true"), T;
          }
        }
        function y() {
          l.each(
            o && o.getElementsByTagName("script"),
            x
          );
        }
        function E(C) {
          return C ? x(C) : y();
        }
        return s && (o.readyState === "complete" ? setTimeout(y) : xe.add(s, { load: y })), {
          compile: b,
          execute: S,
          load: E,
          parse: h,
          calculateBinary: p,
          calculateUnary: g
        };
      }).call(this);
      var gt = new (v.inject(l.exports, {
        Base: l,
        Numerical: q,
        Key: ct,
        DomEvent: xe,
        DomElement: Ce,
        document: o,
        window: s,
        Symbol: Fe,
        PlacedSymbol: Te
      }))();
      return gt.agent.node && El(gt), typeof n == "function" && n.amd ? n("paper", gt) : t && (t.exports = gt), gt;
    }).call(rm, typeof self == "object" ? self : null);
  }(Ns)), Ns.exports;
}
var am = sm();
const ae = /* @__PURE__ */ I_(am), ji = He(null), oi = He(null), Ni = He(null);
function ec() {
  return {
    project: ji,
    uiLayer: oi,
    artLayer: Ni,
    initializeProject: (o) => (ji.value || (ae.setup(o), ji.value = ae.project, Ni.value = new ae.Layer(), Ni.value.name = "artwork", oi.value = new ae.Layer(), oi.value.name = "ui", Ni.value.activate()), ji.value),
    resizeCanvas: (o, l, _) => {
      if (!ji.value || !oi.value || !Ni.value) return;
      oi.value.activate(), oi.value.removeChildren();
      let v = new ae.Path.Rectangle(
        new ae.Point(0, 0),
        new ae.Size(_.width, _.height)
      );
      v.strokeColor = "#222", v.dashArray = [3, 5], oi.value.addChild(v);
      let k = new ae.Path.Rectangle(
        new ae.Point(0, 0),
        new ae.Size(Number(o), Number(l))
      );
      k.strokeColor = "#2AA", k.dashArray = [3, 5], oi.value.addChild(k), Ni.value.activate();
      let N = Ni.value.getItem({ class: ae.Group });
      if (N) {
        v.fitBounds(k.bounds);
        let tt = v.bounds.width / _.width;
        N.data.previousScale && N.scale(1 / N.data.previousScale), N.scale(tt), N.position = N.data.initialOffset.multiply(tt).add(v.bounds.topLeft.subtract(k.bounds.topLeft)), N.data.previousScale = tt;
      }
      oi.value.activate();
      const z = new ae.PointText({
        point: new ae.Point(k.bounds.center.x, k.bounds.y - 5),
        content: o.toFixed(2) + " mm",
        justification: "center",
        fillColor: "#222"
      });
      oi.value.addChild(z);
      const q = new ae.PointText({
        point: new ae.Point(k.bounds.x - 5, k.bounds.center.y),
        content: l.toFixed(2) + " mm",
        justification: "center",
        fillColor: "#222",
        rotation: -90
      });
      oi.value.addChild(q), ji.value.view.update();
    },
    importArtwork: (o) => new Promise((l, _) => {
      if (!ji.value || !Ni.value) {
        _(new Error("Project or art layer not initialized"));
        return;
      }
      Ni.value.activate(), Ni.value.removeChildren(), ji.value.importSVG(o, {
        expandShapes: !0,
        applyMatrix: !0,
        insert: !0,
        onLoad: (v) => {
          v.data.initialOffset = v.bounds.center, l(v);
        },
        onError: (v) => {
          _(v);
        }
      });
    }),
    updateTravelLines: (o) => {
      !ji.value || !oi.value || (oi.value.activate(), oi.value.addChildren(o), ji.value.view.update(), Ni.value.activate());
    }
  };
}
function om(t) {
  if (!t)
    return console.warn("No project provided"), [];
  const e = t.layers.find((n) => n.name === "artwork");
  if (!e)
    return console.warn("No artwork layer found"), [];
  e.activate();
  try {
    const n = ee(e), s = n.getItems({
      recursive: !0,
      class: ae.Group,
      match: (l) => l.name && l.name.trim().length > 0
    });
    if (s.length > 0)
      return console.log("Found grouped artwork with", s.length, "layers"), s.map((l, _) => ({
        id: l.id,
        name: l.name || `Layer ${_ + 1}`,
        visible: !0,
        tool: 0,
        data: l
      }));
    const o = n.getItems({
      recursive: !0,
      class: ae.Path
    });
    if (o.length > 0) {
      console.log("Found ungrouped artwork with", o.length, "paths");
      const l = new ae.Group(o);
      return l.name = "Layer", console.log("ungroupedLayer", ee(t.activeLayer)), [
        {
          id: l.id,
          name: l.name,
          visible: !0,
          tool: 0,
          data: l
        }
      ];
    }
    return console.warn("No valid artwork content found"), [];
  } catch (n) {
    return console.error("Error processing artwork layers:", n), [];
  }
}
const Rl = [
  "#4e79a7",
  "#f28e2c",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ab"
];
function um(t, e) {
  let n = Eo(t);
  hm(n), n = Eo(t), fm(n), ic(n, e);
}
function lm(t, e) {
  const n = Eo(t);
  console.log("Colorize:", n), ic(n, e);
}
function Eo(t) {
  return t.getItems({ recursive: !0, class: ae.Path }).filter((e) => e.segments.length > 0).filter((e) => e.parent.visible).filter((e) => e.hasStroke || e.hasFill);
}
function hm(t) {
  t.filter((n) => n.dashArray.length > 0).forEach((n) => {
    let s = 0, o = n.dashArray.length, l = 0, _ = n.length;
    for (; s < _; ) {
      let v = n.dashArray[l % o], k = l % 2 === 1, N = n.splitAt(v);
      k && n.remove(), n = N, s += v, l++;
    }
  });
}
function fm(t) {
  t.forEach((e) => {
    e.flatten(0.05), e.fillColor = null, e.strokeWidth = 1, e.visible = !0, e.dashArray = [];
  });
}
function ic(t, { layers: e, viewbox: n }) {
  let s = new ae.Rectangle(
    new ae.Point(0, 0),
    new ae.Size(n.width, n.height)
  );
  t.forEach((o) => {
    let l;
    o.parent.name !== null && (l = e.find((_) => _.name === o.parent.name)), o.visible = l.visible, o.strokeColor = Rl[l.tool % Rl.length], o.strokeWidth = 1, o.fillColor = null, s.contains(o.bounds) || (o.strokeColor = "#D22");
  });
}
const Su = /* @__PURE__ */ p0("settings", {
  state: () => ({
    title: "Untitled",
    width: 200,
    height: 200,
    penUp: "M3S18",
    penDown: "M3S26",
    feedRate: 3e3,
    userModified: !1
  }),
  getters: {
    penUpValue: (t) => {
      const e = t.penUp.match(/M3S(\d+)/);
      return e ? parseInt(e[1]) : 0;
    },
    penDownValue: (t) => {
      const e = t.penDown.match(/M3S(\d+)/);
      return e ? parseInt(e[1]) : 0;
    }
  },
  actions: {
    updatePenUp(t) {
      this.penUp = `M3S${t}`, this.userModified = !0;
    },
    updatePenDown(t) {
      this.penDown = `M3S${t}`, this.userModified = !0;
    },
    updateSettings(t) {
      Object.assign(this, {
        ...t,
        userModified: !0
      });
    },
    resetToDefaults() {
      this.$reset();
    }
  },
  // Built-in persistence
  persist: {
    enabled: !0,
    strategies: [
      {
        key: "plotterSettings",
        storage: localStorage
      }
    ]
  }
}), cm = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, o] of e)
    n[s] = o;
  return n;
}, dm = {
  __name: "CanvasPreview",
  props: {
    viewbox: {
      type: Object,
      required: !0
    },
    svgString: {
      type: String,
      required: !0
    },
    travel: {
      type: Array,
      default: () => []
    }
  },
  setup(t) {
    const e = t, n = He(null), { project: s, initializeProject: o, updateTravelLines: l } = ec();
    return Sn(
      () => e.travel,
      (_) => {
        _ && _.length > 0 && l(_);
      },
      { deep: !1 }
    ), Zo(() => {
      o(n.value), l(e.travel.value), s.value.activate();
      let _ = new ae.Tool(), v = [0.67, 1, 1.5, 2.25], k = 2, N = !1;
      _.onMouseDown = function() {
        N = !1;
      }, _.onMouseDrag = function(z) {
        N = !0;
        let q = z.point.subtract(z.downPoint);
        document.getElementById("studio").style.cursor = "grabbing", ae.view.center = ae.view.center.subtract(q);
      }, _.onMouseUp = function(z) {
        document.getElementById("studio").style.cursor = "grab", N || (ae.view.zoom = v[k], k = (k + 1) % v.length, ae.view.center = z.point);
      };
    }), (_, v) => (rn(), Cn("canvas", {
      id: "studio",
      ref_key: "studio",
      ref: n
    }, null, 512));
  }
}, pm = /* @__PURE__ */ cm(dm, [["__scopeId", "data-v-01754b53"]]), gm = { class: "paired-values" }, _m = { class: "paired-values" }, mm = {
  __name: "OutputControls",
  setup(t) {
    const e = Su(), { title: n, width: s, height: o, feedRate: l } = g0(e), _ = He(e.penUpValue), v = He(e.penDownValue), k = () => e.updateSettings({ title: n.value }), N = () => e.updateSettings({ width: s.value }), z = () => e.updateSettings({ height: o.value }), q = () => e.updateSettings({ feedRate: l.value }), tt = () => e.updatePenUp(_.value), F = () => e.updatePenDown(v.value);
    return (mt, X) => (rn(), Cn(di, null, [
      Kt("label", null, [
        X[6] || (X[6] = Ji("Title")),
        ur(Kt("input", {
          type: "text",
          "onUpdate:modelValue": X[0] || (X[0] = (It) => ye(n) ? n.value = It : null),
          onChange: k
        }, null, 544), [
          [lr, Ri(n)]
        ])
      ]),
      Kt("fieldset", gm, [
        X[9] || (X[9] = Kt("legend", null, "Size (mm)", -1)),
        Kt("label", null, [
          X[7] || (X[7] = Ji(" Width ")),
          ur(Kt("input", {
            class: "output-control",
            type: "number",
            "onUpdate:modelValue": X[1] || (X[1] = (It) => ye(s) ? s.value = It : null),
            onChange: N
          }, null, 544), [
            [lr, Ri(s)]
          ])
        ]),
        Kt("label", null, [
          X[8] || (X[8] = Ji(" Height ")),
          ur(Kt("input", {
            class: "output-control",
            type: "number",
            "onUpdate:modelValue": X[2] || (X[2] = (It) => ye(o) ? o.value = It : null),
            onChange: z
          }, null, 544), [
            [lr, Ri(o)]
          ])
        ])
      ]),
      Kt("fieldset", _m, [
        X[12] || (X[12] = Kt("legend", null, "Tool", -1)),
        Kt("label", null, [
          X[10] || (X[10] = Ji(" Up ")),
          ur(Kt("input", {
            type: "number",
            "onUpdate:modelValue": X[3] || (X[3] = (It) => _.value = It),
            onChange: tt,
            min: "0",
            max: "1000",
            step: "1"
          }, null, 544), [
            [lr, _.value]
          ])
        ]),
        Kt("label", null, [
          X[11] || (X[11] = Ji(" Down ")),
          ur(Kt("input", {
            type: "number",
            "onUpdate:modelValue": X[4] || (X[4] = (It) => v.value = It),
            onChange: F,
            min: "0",
            max: "1000",
            step: "1"
          }, null, 544), [
            [lr, v.value]
          ])
        ])
      ]),
      Kt("label", null, [
        X[13] || (X[13] = Ji("Feed Rate")),
        ur(Kt("input", {
          type: "number",
          "onUpdate:modelValue": X[5] || (X[5] = (It) => ye(l) ? l.value = It : null),
          onChange: q
        }, null, 544), [
          [lr, Ri(l)]
        ])
      ])
    ], 64));
  }
}, vm = {
  id: "layers",
  class: "reorder",
  role: "list"
}, ym = {
  class: "layer-grab",
  tabindex: "0",
  role: "button"
}, bm = { class: "layer-control toggle" }, xm = ["id", "checked", "onChange"], wm = { class: "layer-control toggle" }, Sm = ["id", "checked", "onChange"], Cm = {
  __name: "LayerControls",
  props: {
    layers: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:layers"],
  setup(t, { emit: e }) {
    const n = t, s = e, o = He([...n.layers]);
    Sn(
      () => n.layers,
      (v) => {
        o.value = [...v];
      },
      { deep: !1 }
    );
    const l = (v) => {
      var q;
      const k = o.value.findIndex((tt) => tt.id === v);
      let N = o.value.slice(k);
      (((q = o.value[k - 1]) == null ? void 0 : q.tool) || 0) === N[0].tool ? N = N.map((tt) => ({
        ...tt,
        tool: tt.tool + 1
      })) : N = N.map((tt) => ({
        ...tt,
        tool: tt.tool - 1
      })), o.value = [
        ...o.value.slice(0, k),
        ...N,
        ...o.value.slice(k + N.length)
      ], s("update:layers", [...o.value]);
    }, _ = (v) => {
      o.value = o.value.map((k) => k.id === v ? {
        ...k,
        visible: !k.visible
      } : k), s("update:layers", [...o.value]);
    };
    return (v, k) => (rn(), Cn("div", null, [
      Kt("ul", vm, [
        (rn(!0), Cn(di, null, Wd(o.value, (N) => {
          var z;
          return rn(), Cn("li", {
            key: N.id
          }, [
            Kt("span", ym, no(N.name), 1),
            Kt("label", bm, [
              k[0] || (k[0] = Kt("span", { class: "sr" }, "Tool Change", -1)),
              Kt("span", null, no(N.tool), 1),
              Kt("input", {
                id: "toggle-layer-pause-" + N.name,
                type: "checkbox",
                checked: N.tool > ((z = o.value[N.id - 1]) == null ? void 0 : z.tool),
                onChange: (q) => l(N.id)
              }, null, 40, xm),
              k[1] || (k[1] = Kt("i", { class: "ph-bold ph-pencil-simple on" }, null, -1)),
              k[2] || (k[2] = Kt("i", { class: "ph-bold ph-arrow-down off" }, null, -1))
            ]),
            Kt("label", wm, [
              k[3] || (k[3] = Kt("span", { class: "sr" }, "Skip", -1)),
              Kt("input", {
                id: "toggle-layer-skip-" + N.name,
                type: "checkbox",
                checked: N.visible,
                onChange: (q) => _(N.id)
              }, null, 40, Sm),
              k[4] || (k[4] = Kt("i", { class: "ph-bold ph-eye on" }, null, -1)),
              k[5] || (k[5] = Kt("i", { class: "ph-bold ph-eye-slash off" }, null, -1))
            ])
          ]);
        }), 128))
      ])
    ]));
  }
}, Im = `
`, Es = 0.5, Fl = 3e3, mn = (t) => t.toFixed(3);
function km(t, e) {
  var _;
  let n = (_ = t[0]) == null ? void 0 : _.tool, s = null, o = ["G21; mm-mode"], l = [];
  return t.forEach((v) => {
    if (!v.visible) return;
    v.tool !== n && (o.push(`${e.penUp}; Pen UP`), o.push("G0 Z0; move to z-safe height"), o.push(`M0; stop for tool (${v.tool}) change (${v.name})`), n = v.tool), v.data.children.filter((z) => z.className === "Path").filter((z) => z.segments.length > 0).forEach((z) => {
      let q = z.firstSegment.point, tt = z.lastSegment.point;
      s !== null && s.getDistance(q) > 1 ? (o.push(`${e.penUp}; Pen UP`), o.push(`G4 P${Es}; Tool OFF`), o.push(""), o.push("G0 Z0; move to z-safe height"), s !== null && s.getDistance(tt) < s.getDistance(q) && (z.reverse(), q = z.firstSegment.point, tt = z.lastSegment.point), o.push(`G0 F1000 X${mn(q.x)} Y${mn(e.height - q.y)}`), l.push(
        new ae.Path.Line(
          new ae.Point(ee(s)),
          new ae.Point(ee(q))
        )
      ), o.push(`${e.penDown}; Pen DOWN`), o.push(`G4 P${Es}; Tool ON`), o.push("G1 F300 Z-0.1000")) : s === null && (o.push(`G0 F1000 X${mn(q.x)} Y${mn(e.height - q.y)}`), l.push(
        new ae.Path.Line(
          new ae.Point(ee(s)),
          new ae.Point(ee(q))
        )
      ), o.push(`${e.penDown}; Pen DOWN`), o.push(`G4 P${Es}; Tool ON (first)`), o.push("G1 F300 Z-0.1000")), z.segments.forEach((F) => {
        o.push(
          `G1 F${Fl} X${mn(F.point.x)} Y${mn(
            e.height - F.point.y
          )} Z-0.1000`
        );
      }), z.closed ? (o.push(
        `G1 F${Fl} X${mn(z.segments[0].point.x)} Y${mn(
          e.height - z.segments[0].point.y
        )} Z-0.1000`
      ), s = q) : s = tt;
    }), o.push(`${e.penUp}; Pen UP`), o.push(`G4 P${Es}; Tool OFF. Job done. `), o.push("G0 Z0; retracting back to z-safe");
  }), { gcode: o.join(Im), travel: l };
}
const Pm = ["href", "download"], Am = ["href", "download"], Tm = {
  __name: "DownloadControls",
  props: {
    layers: {
      type: Array,
      required: !0
    },
    svgString: {
      type: String,
      required: !0
    }
  },
  emits: ["travel-updated"],
  setup(t, { emit: e }) {
    const n = Su(), s = t, o = e, l = br(() => {
      if (!s.layers || !n) return "";
      const { gcode: k, travel: N } = km(s.layers, n), z = new Blob([k], { type: "text/plain" });
      return o("travel-updated", N), URL.createObjectURL(z);
    }), _ = br(() => {
      if (!s.layers || !n) return "";
      const k = new Blob([s.svgString], { type: "image/svg+xml" });
      return URL.createObjectURL(k);
    }), v = br(() => `${n.title}`);
    return (k, N) => (rn(), Cn(di, null, [
      Kt("a", {
        class: "icon-link",
        href: l.value,
        download: v.value + ".gcode"
      }, N[0] || (N[0] = [
        Kt("i", { class: "ph-bold ph-download-simple" }, null, -1),
        Ji(" GCODE")
      ]), 8, Pm),
      Kt("a", {
        class: "icon-link",
        href: _.value,
        download: v.value + ".svg"
      }, N[1] || (N[1] = [
        Kt("i", { class: "ph-bold ph-download-simple" }, null, -1),
        Ji(" SVG")
      ]), 8, Am)
    ], 64));
  }
}, Em = { class: "layers flow width-full" }, Om = {
  __name: "App",
  setup(t) {
    let e = He(""), n = He({ width: 200, height: 200 }), s = He([]);
    const { project: o, artLayer: l, initializeProject: _, resizeCanvas: v, importArtwork: k } = ec(), N = Su(), z = He([]), q = (ht) => {
      z.value = ht;
    };
    let tt = He(null), F = He(!1);
    const mt = He(null), X = He(!1), It = (ht) => {
      try {
        s.value = ht;
      } catch (At) {
        console.log("Couldn't update layers", At);
      }
    };
    Sn(
      () => [N.width, N.height],
      ([ht, At]) => {
        o.value && ht && At && v(ht, At, n.value);
      }
    );
    const ut = async (ht) => {
      try {
        const At = await k(ht);
        return s.value = om(o.value), um(At, { layers: s.value, viewbox: n.value }), At;
      } catch (At) {
        throw console.log("Couldn't import artwork", At), At;
      }
    }, Xt = async () => {
      try {
        const ht = C_(".canvas");
        e.value = ht.node.outerHTML, n.value = {
          width: ht.node.viewBox.baseVal.width,
          height: ht.node.viewBox.baseVal.height
        }, N.userModified || N.updateSettings({
          width: ht.node.viewBox.baseVal.width,
          height: ht.node.viewBox.baseVal.height
        }), await ut(e.value), v(N.width, N.height, n.value);
      } catch (ht) {
        console.log(ht, "Error updating canvas");
      }
    }, Pt = async (ht) => {
      const At = ht.target.files[0];
      if (At)
        try {
          const Ft = new FileReader();
          Ft.onload = async (zt) => {
            const me = zt.target.result, Te = document.createElement("div");
            Te.style.display = "none", Te.innerHTML = me, Te.querySelector("svg").classList.add("canvas");
            const Oe = document.querySelector(".canvas");
            Oe ? Oe.replaceWith(Te) : document.body.appendChild(Te), Bt();
          }, Ft.readAsText(At);
        } catch (Ft) {
          console.error("Error reading SVG file:", Ft);
        }
    }, xt = () => {
      F.value = !!document.querySelector(".canvas");
    }, Bt = () => {
      const ht = document.querySelector(".canvas");
      ht && mt.value && (mt.value.observe(ht, {
        childList: !0,
        subtree: !0,
        attributes: !0,
        attributeFilter: ["class"]
      }), Xt());
    };
    return Zo(async () => {
      try {
        if (X.value) return;
        const ht = document.getElementById("studio");
        if (!ht)
          throw new Error("Canvas element not found");
        _(ht), X.value = !0, xt(), mt.value = new MutationObserver(() => {
          Xt();
        });
        const At = document.querySelector("h1");
        At && (N.title = At.textContent), Bt();
      } catch (ht) {
        console.log(ht, "Studio mode. Waiting for file upload");
      }
    }), Ko(() => {
      mt.value && mt.value.disconnect(), X.value = !1;
    }), Sn(
      s,
      (ht) => {
        if (o.value && l.value)
          try {
            const At = l.value;
            At && At instanceof ae.Group ? (console.log(At, ht), lm(At, {
              layers: ht,
              viewbox: n.value
            }), o.value.view.update()) : console.log("No valid artwork group found");
          } catch (At) {
            console.error("Error updating colors:", At);
          }
      },
      { flush: "post" }
      // Try different timing
    ), (ht, At) => (rn(), Cn(di, null, [
      _i(pm, {
        svgString: Ri(e),
        settings: ht.settings,
        viewbox: Ri(n),
        travel: z.value
      }, null, 8, ["svgString", "settings", "viewbox", "travel"]),
      Kt("aside", null, [
        At[2] || (At[2] = Kt("h2", null, "Studio", -1)),
        Kt("form", null, [
          Ri(F) ? kp("", !0) : (rn(), Cn("input", {
            key: 0,
            type: "file",
            ref_key: "fileInput",
            ref: tt,
            accept: ".svg",
            onChange: Pt,
            class: "file-input"
          }, null, 544)),
          _i(mm, {
            settings: ht.settings,
            "onUpdate:settings": ht.updateSettings
          }, null, 8, ["settings", "onUpdate:settings"])
        ]),
        At[3] || (At[3] = Kt("hr", null, null, -1)),
        Kt("div", Em, [
          At[0] || (At[0] = Kt("h3", null, "Features", -1)),
          _i(Cm, {
            settings: ht.settings,
            layers: Ri(s),
            "onUpdate:layers": It
          }, null, 8, ["settings", "layers"]),
          At[1] || (At[1] = Kt("hr", null, null, -1))
        ]),
        At[4] || (At[4] = Kt("hr", null, null, -1)),
        _i(Tm, {
          layers: Ri(s),
          settings: ht.settings,
          svgString: Ri(e),
          onTravelUpdated: q
        }, null, 8, ["layers", "settings", "svgString"])
      ])
    ], 64));
  }
};
function Nm() {
  const t = s0(Om);
  return t.use(u0()), t;
}
export {
  Nm as createStudioApp
};
