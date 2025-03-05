/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function So(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const n of t.split(",")) e[n] = 1;
  return (n) => n in e;
}
const _e = {}, dr = [], Gi = () => {
}, xc = () => !1, Ws = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
(t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97), Co = (t) => t.startsWith("onUpdate:"), ei = Object.assign, Io = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, wc = Object.prototype.hasOwnProperty, de = (t, e) => wc.call(t, e), jt = Array.isArray, pr = (t) => Gs(t) === "[object Map]", Al = (t) => Gs(t) === "[object Set]", Zt = (t) => typeof t == "function", Le = (t) => typeof t == "string", In = (t) => typeof t == "symbol", Ie = (t) => t !== null && typeof t == "object", Pl = (t) => (Ie(t) || Zt(t)) && Zt(t.then) && Zt(t.catch), Tl = Object.prototype.toString, Gs = (t) => Tl.call(t), Sc = (t) => Gs(t).slice(8, -1), El = (t) => Gs(t) === "[object Object]", ko = (t) => Le(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Fr = /* @__PURE__ */ So(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Zs = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Cc = /-(\w)/g, wn = Zs(
  (t) => t.replace(Cc, (e, n) => n ? n.toUpperCase() : "")
), Ic = /\B([A-Z])/g, $n = Zs(
  (t) => t.replace(Ic, "-$1").toLowerCase()
), Ol = Zs((t) => t.charAt(0).toUpperCase() + t.slice(1)), Oa = Zs(
  (t) => t ? `on${Ol(t)}` : ""
), yn = (t, e) => !Object.is(t, e), ks = (t, ...e) => {
  for (let n = 0; n < t.length; n++)
    t[n](...e);
}, Ml = (t, e, n, a = !1) => {
  Object.defineProperty(t, e, {
    configurable: !0,
    enumerable: !1,
    writable: a,
    value: n
  });
}, Ya = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? t : e;
};
let Du;
const Ks = () => Du || (Du = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ao(t) {
  if (jt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const a = t[n], o = Le(a) ? Tc(a) : Ao(a);
      if (o)
        for (const h in o)
          e[h] = o[h];
    }
    return e;
  } else if (Le(t) || Ie(t))
    return t;
}
const kc = /;(?![^(]*\))/g, Ac = /:([^]+)/, Pc = /\/\*[^]*?\*\//g;
function Tc(t) {
  const e = {};
  return t.replace(Pc, "").split(kc).forEach((n) => {
    if (n) {
      const a = n.split(Ac);
      a.length > 1 && (e[a[0].trim()] = a[1].trim());
    }
  }), e;
}
function Po(t) {
  let e = "";
  if (Le(t))
    e = t;
  else if (jt(t))
    for (let n = 0; n < t.length; n++) {
      const a = Po(t[n]);
      a && (e += a + " ");
    }
  else if (Ie(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
const Ec = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Oc = /* @__PURE__ */ So(Ec);
function Ll(t) {
  return !!t || t === "";
}
const Nl = (t) => !!(t && t.__v_isRef === !0), $a = (t) => Le(t) ? t : t == null ? "" : jt(t) || Ie(t) && (t.toString === Tl || !Zt(t.toString)) ? Nl(t) ? $a(t.value) : JSON.stringify(t, Rl, 2) : String(t), Rl = (t, e) => Nl(e) ? Rl(t, e.value) : pr(e) ? {
  [`Map(${e.size})`]: [...e.entries()].reduce(
    (n, [a, o], h) => (n[Ma(a, h) + " =>"] = o, n),
    {}
  )
} : Al(e) ? {
  [`Set(${e.size})`]: [...e.values()].map((n) => Ma(n))
} : In(e) ? Ma(e) : Ie(e) && !jt(e) && !El(e) ? String(e) : e, Ma = (t, e = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    In(t) ? `Symbol(${(n = t.description) != null ? n : e})` : t
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let fi;
class Fl {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = fi, !e && fi && (this.index = (fi.scopes || (fi.scopes = [])).push(
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
      const n = fi;
      try {
        return fi = this, e();
      } finally {
        fi = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    fi = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    fi = this.parent;
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let n, a;
      for (n = 0, a = this.effects.length; n < a; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, a = this.cleanups.length; n < a; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, a = this.scopes.length; n < a; n++)
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
function Mc(t) {
  return new Fl(t);
}
function Lc() {
  return fi;
}
let me;
const La = /* @__PURE__ */ new WeakSet();
class zl {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, fi && fi.active && fi.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, La.has(this) && (La.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Vl(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Vu(this), Bl(this);
    const e = me, n = Fi;
    me = this, Fi = !0;
    try {
      return this.fn();
    } finally {
      ql(this), me = e, Fi = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        Oo(e);
      this.deps = this.depsTail = void 0, Vu(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? La.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Xa(this) && this.run();
  }
  get dirty() {
    return Xa(this);
  }
}
let Dl = 0, zr, Dr;
function Vl(t, e = !1) {
  if (t.flags |= 8, e) {
    t.next = Dr, Dr = t;
    return;
  }
  t.next = zr, zr = t;
}
function To() {
  Dl++;
}
function Eo() {
  if (--Dl > 0)
    return;
  if (Dr) {
    let e = Dr;
    for (Dr = void 0; e; ) {
      const n = e.next;
      e.next = void 0, e.flags &= -9, e = n;
    }
  }
  let t;
  for (; zr; ) {
    let e = zr;
    for (zr = void 0; e; ) {
      const n = e.next;
      if (e.next = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (a) {
          t || (t = a);
        }
      e = n;
    }
  }
  if (t) throw t;
}
function Bl(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function ql(t) {
  let e, n = t.depsTail, a = n;
  for (; a; ) {
    const o = a.prevDep;
    a.version === -1 ? (a === n && (n = o), Oo(a), Nc(a)) : e = a, a.dep.activeLink = a.prevActiveLink, a.prevActiveLink = void 0, a = o;
  }
  t.deps = e, t.depsTail = n;
}
function Xa(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && (Ul(e.dep.computed) || e.dep.version !== e.version))
      return !0;
  return !!t._dirty;
}
function Ul(t) {
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === jr))
    return;
  t.globalVersion = jr;
  const e = t.dep;
  if (t.flags |= 2, e.version > 0 && !t.isSSR && t.deps && !Xa(t)) {
    t.flags &= -3;
    return;
  }
  const n = me, a = Fi;
  me = t, Fi = !0;
  try {
    Bl(t);
    const o = t.fn(t._value);
    (e.version === 0 || yn(o, t._value)) && (t._value = o, e.version++);
  } catch (o) {
    throw e.version++, o;
  } finally {
    me = n, Fi = a, ql(t), t.flags &= -3;
  }
}
function Oo(t, e = !1) {
  const { dep: n, prevSub: a, nextSub: o } = t;
  if (a && (a.nextSub = o, t.prevSub = void 0), o && (o.prevSub = a, t.nextSub = void 0), n.subs === t && (n.subs = a, !a && n.computed)) {
    n.computed.flags &= -5;
    for (let h = n.computed.deps; h; h = h.nextDep)
      Oo(h, !0);
  }
  !e && !--n.sc && n.map && n.map.delete(n.key);
}
function Nc(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
let Fi = !0;
const jl = [];
function kn() {
  jl.push(Fi), Fi = !1;
}
function An() {
  const t = jl.pop();
  Fi = t === void 0 ? !0 : t;
}
function Vu(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = me;
    me = void 0;
    try {
      e();
    } finally {
      me = n;
    }
  }
}
let jr = 0;
class Rc {
  constructor(e, n) {
    this.sub = e, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Mo {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e) {
    if (!me || !Fi || me === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== me)
      n = this.activeLink = new Rc(me, this), me.deps ? (n.prevDep = me.depsTail, me.depsTail.nextDep = n, me.depsTail = n) : me.deps = me.depsTail = n, Hl(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const a = n.nextDep;
      a.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = a), n.prevDep = me.depsTail, n.nextDep = void 0, me.depsTail.nextDep = n, me.depsTail = n, me.deps === n && (me.deps = a);
    }
    return n;
  }
  trigger(e) {
    this.version++, jr++, this.notify(e);
  }
  notify(e) {
    To();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Eo();
    }
  }
}
function Hl(t) {
  if (t.dep.sc++, t.sub.flags & 4) {
    const e = t.dep.computed;
    if (e && !t.dep.subs) {
      e.flags |= 20;
      for (let a = e.deps; a; a = a.nextDep)
        Hl(a);
    }
    const n = t.dep.subs;
    n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
  }
}
const Qa = /* @__PURE__ */ new WeakMap(), jn = Symbol(
  ""
), Ja = Symbol(
  ""
), Hr = Symbol(
  ""
);
function He(t, e, n) {
  if (Fi && me) {
    let a = Qa.get(t);
    a || Qa.set(t, a = /* @__PURE__ */ new Map());
    let o = a.get(n);
    o || (a.set(n, o = new Mo()), o.map = a, o.key = n), o.track();
  }
}
function tn(t, e, n, a, o, h) {
  const _ = Qa.get(t);
  if (!_) {
    jr++;
    return;
  }
  const v = (k) => {
    k && k.trigger();
  };
  if (To(), e === "clear")
    _.forEach(v);
  else {
    const k = jt(t), R = k && ko(n);
    if (k && n === "length") {
      const z = Number(a);
      _.forEach((U, et) => {
        (et === "length" || et === Hr || !In(et) && et >= z) && v(U);
      });
    } else
      switch ((n !== void 0 || _.has(void 0)) && v(_.get(n)), R && v(_.get(Hr)), e) {
        case "add":
          k ? R && v(_.get("length")) : (v(_.get(jn)), pr(t) && v(_.get(Ja)));
          break;
        case "delete":
          k || (v(_.get(jn)), pr(t) && v(_.get(Ja)));
          break;
        case "set":
          pr(t) && v(_.get(jn));
          break;
      }
  }
  Eo();
}
function rr(t) {
  const e = te(t);
  return e === t ? e : (He(e, "iterate", Hr), ki(t) ? e : e.map(We));
}
function Ys(t) {
  return He(t = te(t), "iterate", Hr), t;
}
const Fc = {
  __proto__: null,
  [Symbol.iterator]() {
    return Na(this, Symbol.iterator, We);
  },
  concat(...t) {
    return rr(this).concat(
      ...t.map((e) => jt(e) ? rr(e) : e)
    );
  },
  entries() {
    return Na(this, "entries", (t) => (t[1] = We(t[1]), t));
  },
  every(t, e) {
    return Xi(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return Xi(this, "filter", t, e, (n) => n.map(We), arguments);
  },
  find(t, e) {
    return Xi(this, "find", t, e, We, arguments);
  },
  findIndex(t, e) {
    return Xi(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return Xi(this, "findLast", t, e, We, arguments);
  },
  findLastIndex(t, e) {
    return Xi(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return Xi(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return Ra(this, "includes", t);
  },
  indexOf(...t) {
    return Ra(this, "indexOf", t);
  },
  join(t) {
    return rr(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return Ra(this, "lastIndexOf", t);
  },
  map(t, e) {
    return Xi(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Or(this, "pop");
  },
  push(...t) {
    return Or(this, "push", t);
  },
  reduce(t, ...e) {
    return Bu(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Bu(this, "reduceRight", t, e);
  },
  shift() {
    return Or(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return Xi(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Or(this, "splice", t);
  },
  toReversed() {
    return rr(this).toReversed();
  },
  toSorted(t) {
    return rr(this).toSorted(t);
  },
  toSpliced(...t) {
    return rr(this).toSpliced(...t);
  },
  unshift(...t) {
    return Or(this, "unshift", t);
  },
  values() {
    return Na(this, "values", We);
  }
};
function Na(t, e, n) {
  const a = Ys(t), o = a[e]();
  return a !== t && !ki(t) && (o._next = o.next, o.next = () => {
    const h = o._next();
    return h.value && (h.value = n(h.value)), h;
  }), o;
}
const zc = Array.prototype;
function Xi(t, e, n, a, o, h) {
  const _ = Ys(t), v = _ !== t && !ki(t), k = _[e];
  if (k !== zc[e]) {
    const U = k.apply(t, h);
    return v ? We(U) : U;
  }
  let R = n;
  _ !== t && (v ? R = function(U, et) {
    return n.call(this, We(U), et, t);
  } : n.length > 2 && (R = function(U, et) {
    return n.call(this, U, et, t);
  }));
  const z = k.call(_, R, a);
  return v && o ? o(z) : z;
}
function Bu(t, e, n, a) {
  const o = Ys(t);
  let h = n;
  return o !== t && (ki(t) ? n.length > 3 && (h = function(_, v, k) {
    return n.call(this, _, v, k, t);
  }) : h = function(_, v, k) {
    return n.call(this, _, We(v), k, t);
  }), o[e](h, ...a);
}
function Ra(t, e, n) {
  const a = te(t);
  He(a, "iterate", Hr);
  const o = a[e](...n);
  return (o === -1 || o === !1) && Fo(n[0]) ? (n[0] = te(n[0]), a[e](...n)) : o;
}
function Or(t, e, n = []) {
  kn(), To();
  const a = te(t)[e].apply(t, n);
  return Eo(), An(), a;
}
const Dc = /* @__PURE__ */ So("__proto__,__v_isRef,__isVue"), Wl = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(In)
);
function Vc(t) {
  In(t) || (t = String(t));
  const e = te(this);
  return He(e, "has", t), e.hasOwnProperty(t);
}
class Gl {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, a) {
    if (n === "__v_skip") return e.__v_skip;
    const o = this._isReadonly, h = this._isShallow;
    if (n === "__v_isReactive")
      return !o;
    if (n === "__v_isReadonly")
      return o;
    if (n === "__v_isShallow")
      return h;
    if (n === "__v_raw")
      return a === (o ? h ? Yc : $l : h ? Yl : Kl).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(a) ? e : void 0;
    const _ = jt(e);
    if (!o) {
      let k;
      if (_ && (k = Fc[n]))
        return k;
      if (n === "hasOwnProperty")
        return Vc;
    }
    const v = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ge(e) ? e : a
    );
    return (In(n) ? Wl.has(n) : Dc(n)) || (o || He(e, "get", n), h) ? v : Ge(v) ? _ && ko(n) ? v : v.value : Ie(v) ? o ? Xl(v) : No(v) : v;
  }
}
class Zl extends Gl {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, a, o) {
    let h = e[n];
    if (!this._isShallow) {
      const k = Wn(h);
      if (!ki(a) && !Wn(a) && (h = te(h), a = te(a)), !jt(e) && Ge(h) && !Ge(a))
        return k ? !1 : (h.value = a, !0);
    }
    const _ = jt(e) && ko(n) ? Number(n) < e.length : de(e, n), v = Reflect.set(
      e,
      n,
      a,
      Ge(e) ? e : o
    );
    return e === te(o) && (_ ? yn(a, h) && tn(e, "set", n, a) : tn(e, "add", n, a)), v;
  }
  deleteProperty(e, n) {
    const a = de(e, n);
    e[n];
    const o = Reflect.deleteProperty(e, n);
    return o && a && tn(e, "delete", n, void 0), o;
  }
  has(e, n) {
    const a = Reflect.has(e, n);
    return (!In(n) || !Wl.has(n)) && He(e, "has", n), a;
  }
  ownKeys(e) {
    return He(
      e,
      "iterate",
      jt(e) ? "length" : jn
    ), Reflect.ownKeys(e);
  }
}
class Bc extends Gl {
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
const qc = /* @__PURE__ */ new Zl(), Uc = /* @__PURE__ */ new Bc(), jc = /* @__PURE__ */ new Zl(!0);
const to = (t) => t, bs = (t) => Reflect.getPrototypeOf(t);
function Hc(t, e, n) {
  return function(...a) {
    const o = this.__v_raw, h = te(o), _ = pr(h), v = t === "entries" || t === Symbol.iterator && _, k = t === "keys" && _, R = o[t](...a), z = n ? to : e ? eo : We;
    return !e && He(
      h,
      "iterate",
      k ? Ja : jn
    ), {
      // iterator protocol
      next() {
        const { value: U, done: et } = R.next();
        return et ? { value: U, done: et } : {
          value: v ? [z(U[0]), z(U[1])] : z(U),
          done: et
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function xs(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Wc(t, e) {
  const n = {
    get(o) {
      const h = this.__v_raw, _ = te(h), v = te(o);
      t || (yn(o, v) && He(_, "get", o), He(_, "get", v));
      const { has: k } = bs(_), R = e ? to : t ? eo : We;
      if (k.call(_, o))
        return R(h.get(o));
      if (k.call(_, v))
        return R(h.get(v));
      h !== _ && h.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !t && He(te(o), "iterate", jn), Reflect.get(o, "size", o);
    },
    has(o) {
      const h = this.__v_raw, _ = te(h), v = te(o);
      return t || (yn(o, v) && He(_, "has", o), He(_, "has", v)), o === v ? h.has(o) : h.has(o) || h.has(v);
    },
    forEach(o, h) {
      const _ = this, v = _.__v_raw, k = te(v), R = e ? to : t ? eo : We;
      return !t && He(k, "iterate", jn), v.forEach((z, U) => o.call(h, R(z), R(U), _));
    }
  };
  return ei(
    n,
    t ? {
      add: xs("add"),
      set: xs("set"),
      delete: xs("delete"),
      clear: xs("clear")
    } : {
      add(o) {
        !e && !ki(o) && !Wn(o) && (o = te(o));
        const h = te(this);
        return bs(h).has.call(h, o) || (h.add(o), tn(h, "add", o, o)), this;
      },
      set(o, h) {
        !e && !ki(h) && !Wn(h) && (h = te(h));
        const _ = te(this), { has: v, get: k } = bs(_);
        let R = v.call(_, o);
        R || (o = te(o), R = v.call(_, o));
        const z = k.call(_, o);
        return _.set(o, h), R ? yn(h, z) && tn(_, "set", o, h) : tn(_, "add", o, h), this;
      },
      delete(o) {
        const h = te(this), { has: _, get: v } = bs(h);
        let k = _.call(h, o);
        k || (o = te(o), k = _.call(h, o)), v && v.call(h, o);
        const R = h.delete(o);
        return k && tn(h, "delete", o, void 0), R;
      },
      clear() {
        const o = te(this), h = o.size !== 0, _ = o.clear();
        return h && tn(
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
    n[o] = Hc(o, t, e);
  }), n;
}
function Lo(t, e) {
  const n = Wc(t, e);
  return (a, o, h) => o === "__v_isReactive" ? !t : o === "__v_isReadonly" ? t : o === "__v_raw" ? a : Reflect.get(
    de(n, o) && o in a ? n : a,
    o,
    h
  );
}
const Gc = {
  get: /* @__PURE__ */ Lo(!1, !1)
}, Zc = {
  get: /* @__PURE__ */ Lo(!1, !0)
}, Kc = {
  get: /* @__PURE__ */ Lo(!0, !1)
};
const Kl = /* @__PURE__ */ new WeakMap(), Yl = /* @__PURE__ */ new WeakMap(), $l = /* @__PURE__ */ new WeakMap(), Yc = /* @__PURE__ */ new WeakMap();
function $c(t) {
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
function Xc(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : $c(Sc(t));
}
function No(t) {
  return Wn(t) ? t : Ro(
    t,
    !1,
    qc,
    Gc,
    Kl
  );
}
function Qc(t) {
  return Ro(
    t,
    !1,
    jc,
    Zc,
    Yl
  );
}
function Xl(t) {
  return Ro(
    t,
    !0,
    Uc,
    Kc,
    $l
  );
}
function Ro(t, e, n, a, o) {
  if (!Ie(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const h = o.get(t);
  if (h)
    return h;
  const _ = Xc(t);
  if (_ === 0)
    return t;
  const v = new Proxy(
    t,
    _ === 2 ? a : n
  );
  return o.set(t, v), v;
}
function gr(t) {
  return Wn(t) ? gr(t.__v_raw) : !!(t && t.__v_isReactive);
}
function Wn(t) {
  return !!(t && t.__v_isReadonly);
}
function ki(t) {
  return !!(t && t.__v_isShallow);
}
function Fo(t) {
  return t ? !!t.__v_raw : !1;
}
function te(t) {
  const e = t && t.__v_raw;
  return e ? te(e) : t;
}
function Ql(t) {
  return !de(t, "__v_skip") && Object.isExtensible(t) && Ml(t, "__v_skip", !0), t;
}
const We = (t) => Ie(t) ? No(t) : t, eo = (t) => Ie(t) ? Xl(t) : t;
function Ge(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function je(t) {
  return Jc(t, !1);
}
function Jc(t, e) {
  return Ge(t) ? t : new td(t, e);
}
class td {
  constructor(e, n) {
    this.dep = new Mo(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? e : te(e), this._value = n ? e : We(e), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const n = this._rawValue, a = this.__v_isShallow || ki(e) || Wn(e);
    e = a ? e : te(e), yn(e, n) && (this._rawValue = e, this._value = a ? e : We(e), this.dep.trigger());
  }
}
function Ri(t) {
  return Ge(t) ? t.value : t;
}
const ed = {
  get: (t, e, n) => e === "__v_raw" ? t : Ri(Reflect.get(t, e, n)),
  set: (t, e, n, a) => {
    const o = t[e];
    return Ge(o) && !Ge(n) ? (o.value = n, !0) : Reflect.set(t, e, n, a);
  }
};
function Jl(t) {
  return gr(t) ? t : new Proxy(t, ed);
}
class id {
  constructor(e, n, a) {
    this.fn = e, this.setter = n, this._value = void 0, this.dep = new Mo(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = jr - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = a;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    me !== this)
      return Vl(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Ul(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
}
function nd(t, e, n = !1) {
  let a, o;
  return Zt(t) ? a = t : (a = t.get, o = t.set), new id(a, o, n);
}
const ws = {}, Ms = /* @__PURE__ */ new WeakMap();
let Vn;
function rd(t, e = !1, n = Vn) {
  if (n) {
    let a = Ms.get(n);
    a || Ms.set(n, a = []), a.push(t);
  }
}
function sd(t, e, n = _e) {
  const { immediate: a, deep: o, once: h, scheduler: _, augmentJob: v, call: k } = n, R = (xt) => o ? xt : ki(xt) || o === !1 || o === 0 ? en(xt, 1) : en(xt);
  let z, U, et, F, yt = !1, it = !1;
  if (Ge(t) ? (U = () => t.value, yt = ki(t)) : gr(t) ? (U = () => R(t), yt = !0) : jt(t) ? (it = !0, yt = t.some((xt) => gr(xt) || ki(xt)), U = () => t.map((xt) => {
    if (Ge(xt))
      return xt.value;
    if (gr(xt))
      return R(xt);
    if (Zt(xt))
      return k ? k(xt, 2) : xt();
  })) : Zt(t) ? e ? U = k ? () => k(t, 2) : t : U = () => {
    if (et) {
      kn();
      try {
        et();
      } finally {
        An();
      }
    }
    const xt = Vn;
    Vn = z;
    try {
      return k ? k(t, 3, [F]) : t(F);
    } finally {
      Vn = xt;
    }
  } : U = Gi, e && o) {
    const xt = U, ie = o === !0 ? 1 / 0 : o;
    U = () => en(xt(), ie);
  }
  const Tt = Lc(), ut = () => {
    z.stop(), Tt && Tt.active && Io(Tt.effects, z);
  };
  if (h && e) {
    const xt = e;
    e = (...ie) => {
      xt(...ie), ut();
    };
  }
  let Qt = it ? new Array(t.length).fill(ws) : ws;
  const It = (xt) => {
    if (!(!(z.flags & 1) || !z.dirty && !xt))
      if (e) {
        const ie = z.run();
        if (o || yt || (it ? ie.some((kt, At) => yn(kt, Qt[At])) : yn(ie, Qt))) {
          et && et();
          const kt = Vn;
          Vn = z;
          try {
            const At = [
              ie,
              // pass undefined as the old value when it's changed for the first time
              Qt === ws ? void 0 : it && Qt[0] === ws ? [] : Qt,
              F
            ];
            k ? k(e, 3, At) : (
              // @ts-expect-error
              e(...At)
            ), Qt = ie;
          } finally {
            Vn = kt;
          }
        }
      } else
        z.run();
  };
  return v && v(It), z = new zl(U), z.scheduler = _ ? () => _(It, !1) : It, F = (xt) => rd(xt, !1, z), et = z.onStop = () => {
    const xt = Ms.get(z);
    if (xt) {
      if (k)
        k(xt, 4);
      else
        for (const ie of xt) ie();
      Ms.delete(z);
    }
  }, e ? a ? It(!0) : Qt = z.run() : _ ? _(It.bind(null, !0), !0) : z.run(), ut.pause = z.pause.bind(z), ut.resume = z.resume.bind(z), ut.stop = ut, ut;
}
function en(t, e = 1 / 0, n) {
  if (e <= 0 || !Ie(t) || t.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(t)))
    return t;
  if (n.add(t), e--, Ge(t))
    en(t.value, e, n);
  else if (jt(t))
    for (let a = 0; a < t.length; a++)
      en(t[a], e, n);
  else if (Al(t) || pr(t))
    t.forEach((a) => {
      en(a, e, n);
    });
  else if (El(t)) {
    for (const a in t)
      en(t[a], e, n);
    for (const a of Object.getOwnPropertySymbols(t))
      Object.prototype.propertyIsEnumerable.call(t, a) && en(t[a], e, n);
  }
  return t;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Jr(t, e, n, a) {
  try {
    return a ? t(...a) : t();
  } catch (o) {
    $s(o, e, n);
  }
}
function Zi(t, e, n, a) {
  if (Zt(t)) {
    const o = Jr(t, e, n, a);
    return o && Pl(o) && o.catch((h) => {
      $s(h, e, n);
    }), o;
  }
  if (jt(t)) {
    const o = [];
    for (let h = 0; h < t.length; h++)
      o.push(Zi(t[h], e, n, a));
    return o;
  }
}
function $s(t, e, n, a = !0) {
  const o = e ? e.vnode : null, { errorHandler: h, throwUnhandledErrorInProduction: _ } = e && e.appContext.config || _e;
  if (e) {
    let v = e.parent;
    const k = e.proxy, R = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; v; ) {
      const z = v.ec;
      if (z) {
        for (let U = 0; U < z.length; U++)
          if (z[U](t, k, R) === !1)
            return;
      }
      v = v.parent;
    }
    if (h) {
      kn(), Jr(h, null, 10, [
        t,
        k,
        R
      ]), An();
      return;
    }
  }
  ad(t, n, o, a, _);
}
function ad(t, e, n, a = !0, o = !1) {
  if (o)
    throw t;
  console.error(t);
}
const Qe = [];
let Hi = -1;
const _r = [];
let _n = null, lr = 0;
const th = /* @__PURE__ */ Promise.resolve();
let Ls = null;
function od(t) {
  const e = Ls || th;
  return t ? e.then(this ? t.bind(this) : t) : e;
}
function ud(t) {
  let e = Hi + 1, n = Qe.length;
  for (; e < n; ) {
    const a = e + n >>> 1, o = Qe[a], h = Wr(o);
    h < t || h === t && o.flags & 2 ? e = a + 1 : n = a;
  }
  return e;
}
function zo(t) {
  if (!(t.flags & 1)) {
    const e = Wr(t), n = Qe[Qe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(t.flags & 2) && e >= Wr(n) ? Qe.push(t) : Qe.splice(ud(e), 0, t), t.flags |= 1, eh();
  }
}
function eh() {
  Ls || (Ls = th.then(nh));
}
function ld(t) {
  jt(t) ? _r.push(...t) : _n && t.id === -1 ? _n.splice(lr + 1, 0, t) : t.flags & 1 || (_r.push(t), t.flags |= 1), eh();
}
function qu(t, e, n = Hi + 1) {
  for (; n < Qe.length; n++) {
    const a = Qe[n];
    if (a && a.flags & 2) {
      if (t && a.id !== t.uid)
        continue;
      Qe.splice(n, 1), n--, a.flags & 4 && (a.flags &= -2), a(), a.flags & 4 || (a.flags &= -2);
    }
  }
}
function ih(t) {
  if (_r.length) {
    const e = [...new Set(_r)].sort(
      (n, a) => Wr(n) - Wr(a)
    );
    if (_r.length = 0, _n) {
      _n.push(...e);
      return;
    }
    for (_n = e, lr = 0; lr < _n.length; lr++) {
      const n = _n[lr];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    _n = null, lr = 0;
  }
}
const Wr = (t) => t.id == null ? t.flags & 2 ? -1 : 1 / 0 : t.id;
function nh(t) {
  try {
    for (Hi = 0; Hi < Qe.length; Hi++) {
      const e = Qe[Hi];
      e && !(e.flags & 8) && (e.flags & 4 && (e.flags &= -2), Jr(
        e,
        e.i,
        e.i ? 15 : 14
      ), e.flags & 4 || (e.flags &= -2));
    }
  } finally {
    for (; Hi < Qe.length; Hi++) {
      const e = Qe[Hi];
      e && (e.flags &= -2);
    }
    Hi = -1, Qe.length = 0, ih(), Ls = null, (Qe.length || _r.length) && nh();
  }
}
let Ii = null, rh = null;
function Ns(t) {
  const e = Ii;
  return Ii = t, rh = t && t.type.__scopeId || null, e;
}
function hd(t, e = Ii, n) {
  if (!e || t._n)
    return t;
  const a = (...o) => {
    a._d && $u(-1);
    const h = Ns(e);
    let _;
    try {
      _ = t(...o);
    } finally {
      Ns(h), a._d && $u(1);
    }
    return _;
  };
  return a._n = !0, a._c = !0, a._d = !0, a;
}
function sr(t, e) {
  if (Ii === null)
    return t;
  const n = ta(Ii), a = t.dirs || (t.dirs = []);
  for (let o = 0; o < e.length; o++) {
    let [h, _, v, k = _e] = e[o];
    h && (Zt(h) && (h = {
      mounted: h,
      updated: h
    }), h.deep && en(_), a.push({
      dir: h,
      instance: n,
      value: _,
      oldValue: void 0,
      arg: v,
      modifiers: k
    }));
  }
  return t;
}
function zn(t, e, n, a) {
  const o = t.dirs, h = e && e.dirs;
  for (let _ = 0; _ < o.length; _++) {
    const v = o[_];
    h && (v.oldValue = h[_].value);
    let k = v.dir[a];
    k && (kn(), Zi(k, n, 8, [
      t.el,
      v,
      t,
      e
    ]), An());
  }
}
const fd = Symbol("_vte"), cd = (t) => t.__isTeleport;
function Do(t, e) {
  t.shapeFlag & 6 && t.component ? (t.transition = e, Do(t.component.subTree, e)) : t.shapeFlag & 128 ? (t.ssContent.transition = e.clone(t.ssContent), t.ssFallback.transition = e.clone(t.ssFallback)) : t.transition = e;
}
function sh(t) {
  t.ids = [t.ids[0] + t.ids[2]++ + "-", 0, 0];
}
function Rs(t, e, n, a, o = !1) {
  if (jt(t)) {
    t.forEach(
      (yt, it) => Rs(
        yt,
        e && (jt(e) ? e[it] : e),
        n,
        a,
        o
      )
    );
    return;
  }
  if (Vr(a) && !o) {
    a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && Rs(t, e, n, a.component.subTree);
    return;
  }
  const h = a.shapeFlag & 4 ? ta(a.component) : a.el, _ = o ? null : h, { i: v, r: k } = t, R = e && e.r, z = v.refs === _e ? v.refs = {} : v.refs, U = v.setupState, et = te(U), F = U === _e ? () => !1 : (yt) => de(et, yt);
  if (R != null && R !== k && (Le(R) ? (z[R] = null, F(R) && (U[R] = null)) : Ge(R) && (R.value = null)), Zt(k))
    Jr(k, v, 12, [_, z]);
  else {
    const yt = Le(k), it = Ge(k);
    if (yt || it) {
      const Tt = () => {
        if (t.f) {
          const ut = yt ? F(k) ? U[k] : z[k] : k.value;
          o ? jt(ut) && Io(ut, h) : jt(ut) ? ut.includes(h) || ut.push(h) : yt ? (z[k] = [h], F(k) && (U[k] = z[k])) : (k.value = [h], t.k && (z[t.k] = k.value));
        } else yt ? (z[k] = _, F(k) && (U[k] = _)) : it && (k.value = _, t.k && (z[t.k] = _));
      };
      _ ? (Tt.id = -1, hi(Tt, n)) : Tt();
    }
  }
}
Ks().requestIdleCallback;
Ks().cancelIdleCallback;
const Vr = (t) => !!t.type.__asyncLoader, ah = (t) => t.type.__isKeepAlive;
function dd(t, e) {
  oh(t, "a", e);
}
function pd(t, e) {
  oh(t, "da", e);
}
function oh(t, e, n = Je) {
  const a = t.__wdc || (t.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return t();
  });
  if (Xs(e, a, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      ah(o.parent.vnode) && gd(a, e, n, o), o = o.parent;
  }
}
function gd(t, e, n, a) {
  const o = Xs(
    e,
    t,
    a,
    !0
    /* prepend */
  );
  Bo(() => {
    Io(a[e], o);
  }, n);
}
function Xs(t, e, n = Je, a = !1) {
  if (n) {
    const o = n[t] || (n[t] = []), h = e.__weh || (e.__weh = (..._) => {
      kn();
      const v = ts(n), k = Zi(e, n, t, _);
      return v(), An(), k;
    });
    return a ? o.unshift(h) : o.push(h), h;
  }
}
const an = (t) => (e, n = Je) => {
  (!Zr || t === "sp") && Xs(t, (...a) => e(...a), n);
}, _d = an("bm"), Vo = an("m"), md = an(
  "bu"
), vd = an("u"), yd = an(
  "bum"
), Bo = an("um"), bd = an(
  "sp"
), xd = an("rtg"), wd = an("rtc");
function Sd(t, e = Je) {
  Xs("ec", t, e);
}
const Cd = Symbol.for("v-ndc");
function Id(t, e, n, a) {
  let o;
  const h = n, _ = jt(t);
  if (_ || Le(t)) {
    const v = _ && gr(t);
    let k = !1;
    v && (k = !ki(t), t = Ys(t)), o = new Array(t.length);
    for (let R = 0, z = t.length; R < z; R++)
      o[R] = e(
        k ? We(t[R]) : t[R],
        R,
        void 0,
        h
      );
  } else if (typeof t == "number") {
    o = new Array(t);
    for (let v = 0; v < t; v++)
      o[v] = e(v + 1, v, void 0, h);
  } else if (Ie(t))
    if (t[Symbol.iterator])
      o = Array.from(
        t,
        (v, k) => e(v, k, void 0, h)
      );
    else {
      const v = Object.keys(t);
      o = new Array(v.length);
      for (let k = 0, R = v.length; k < R; k++) {
        const z = v[k];
        o[k] = e(t[z], z, k, h);
      }
    }
  else
    o = [];
  return o;
}
const io = (t) => t ? Th(t) ? ta(t) : io(t.parent) : null, Br = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ei(/* @__PURE__ */ Object.create(null), {
    $: (t) => t,
    $el: (t) => t.vnode.el,
    $data: (t) => t.data,
    $props: (t) => t.props,
    $attrs: (t) => t.attrs,
    $slots: (t) => t.slots,
    $refs: (t) => t.refs,
    $parent: (t) => io(t.parent),
    $root: (t) => io(t.root),
    $host: (t) => t.ce,
    $emit: (t) => t.emit,
    $options: (t) => lh(t),
    $forceUpdate: (t) => t.f || (t.f = () => {
      zo(t.update);
    }),
    $nextTick: (t) => t.n || (t.n = od.bind(t.proxy)),
    $watch: (t) => Zd.bind(t)
  })
), Fa = (t, e) => t !== _e && !t.__isScriptSetup && de(t, e), kd = {
  get({ _: t }, e) {
    if (e === "__v_skip")
      return !0;
    const { ctx: n, setupState: a, data: o, props: h, accessCache: _, type: v, appContext: k } = t;
    let R;
    if (e[0] !== "$") {
      const F = _[e];
      if (F !== void 0)
        switch (F) {
          case 1:
            return a[e];
          case 2:
            return o[e];
          case 4:
            return n[e];
          case 3:
            return h[e];
        }
      else {
        if (Fa(a, e))
          return _[e] = 1, a[e];
        if (o !== _e && de(o, e))
          return _[e] = 2, o[e];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (R = t.propsOptions[0]) && de(R, e)
        )
          return _[e] = 3, h[e];
        if (n !== _e && de(n, e))
          return _[e] = 4, n[e];
        no && (_[e] = 0);
      }
    }
    const z = Br[e];
    let U, et;
    if (z)
      return e === "$attrs" && He(t.attrs, "get", ""), z(t);
    if (
      // css module (injected by vue-loader)
      (U = v.__cssModules) && (U = U[e])
    )
      return U;
    if (n !== _e && de(n, e))
      return _[e] = 4, n[e];
    if (
      // global properties
      et = k.config.globalProperties, de(et, e)
    )
      return et[e];
  },
  set({ _: t }, e, n) {
    const { data: a, setupState: o, ctx: h } = t;
    return Fa(o, e) ? (o[e] = n, !0) : a !== _e && de(a, e) ? (a[e] = n, !0) : de(t.props, e) || e[0] === "$" && e.slice(1) in t ? !1 : (h[e] = n, !0);
  },
  has({
    _: { data: t, setupState: e, accessCache: n, ctx: a, appContext: o, propsOptions: h }
  }, _) {
    let v;
    return !!n[_] || t !== _e && de(t, _) || Fa(e, _) || (v = h[0]) && de(v, _) || de(a, _) || de(Br, _) || de(o.config.globalProperties, _);
  },
  defineProperty(t, e, n) {
    return n.get != null ? t._.accessCache[e] = 0 : de(n, "value") && this.set(t, e, n.value, null), Reflect.defineProperty(t, e, n);
  }
};
function Uu(t) {
  return jt(t) ? t.reduce(
    (e, n) => (e[n] = null, e),
    {}
  ) : t;
}
let no = !0;
function Ad(t) {
  const e = lh(t), n = t.proxy, a = t.ctx;
  no = !1, e.beforeCreate && ju(e.beforeCreate, t, "bc");
  const {
    // state
    data: o,
    computed: h,
    methods: _,
    watch: v,
    provide: k,
    inject: R,
    // lifecycle
    created: z,
    beforeMount: U,
    mounted: et,
    beforeUpdate: F,
    updated: yt,
    activated: it,
    deactivated: Tt,
    beforeDestroy: ut,
    beforeUnmount: Qt,
    destroyed: It,
    unmounted: xt,
    render: ie,
    renderTracked: kt,
    renderTriggered: At,
    errorCaptured: Ot,
    serverPrefetch: ve,
    // public API
    expose: Ke,
    inheritAttrs: Ai,
    // assets
    components: Ne,
    directives: Ye,
    filters: Pt
  } = e;
  if (R && Pd(R, a, null), _)
    for (const re in _) {
      const oe = _[re];
      Zt(oe) && (a[re] = oe.bind(n));
    }
  if (o) {
    const re = o.call(n, n);
    Ie(re) && (t.data = No(re));
  }
  if (no = !0, h)
    for (const re in h) {
      const oe = h[re], Yt = Zt(oe) ? oe.bind(n, n) : Zt(oe.get) ? oe.get.bind(n, n) : Gi, $e = !Zt(oe) && Zt(oe.set) ? oe.set.bind(n) : Gi, Di = Ts({
        get: Yt,
        set: $e
      });
      Object.defineProperty(a, re, {
        enumerable: !0,
        configurable: !0,
        get: () => Di.value,
        set: (vi) => Di.value = vi
      });
    }
  if (v)
    for (const re in v)
      uh(v[re], a, n, re);
  if (k) {
    const re = Zt(k) ? k.call(n) : k;
    Reflect.ownKeys(re).forEach((oe) => {
      Nd(oe, re[oe]);
    });
  }
  z && ju(z, t, "c");
  function lt(re, oe) {
    jt(oe) ? oe.forEach((Yt) => re(Yt.bind(n))) : oe && re(oe.bind(n));
  }
  if (lt(_d, U), lt(Vo, et), lt(md, F), lt(vd, yt), lt(dd, it), lt(pd, Tt), lt(Sd, Ot), lt(wd, kt), lt(xd, At), lt(yd, Qt), lt(Bo, xt), lt(bd, ve), jt(Ke))
    if (Ke.length) {
      const re = t.exposed || (t.exposed = {});
      Ke.forEach((oe) => {
        Object.defineProperty(re, oe, {
          get: () => n[oe],
          set: (Yt) => n[oe] = Yt
        });
      });
    } else t.exposed || (t.exposed = {});
  ie && t.render === Gi && (t.render = ie), Ai != null && (t.inheritAttrs = Ai), Ne && (t.components = Ne), Ye && (t.directives = Ye), ve && sh(t);
}
function Pd(t, e, n = Gi) {
  jt(t) && (t = ro(t));
  for (const a in t) {
    const o = t[a];
    let h;
    Ie(o) ? "default" in o ? h = As(
      o.from || a,
      o.default,
      !0
    ) : h = As(o.from || a) : h = As(o), Ge(h) ? Object.defineProperty(e, a, {
      enumerable: !0,
      configurable: !0,
      get: () => h.value,
      set: (_) => h.value = _
    }) : e[a] = h;
  }
}
function ju(t, e, n) {
  Zi(
    jt(t) ? t.map((a) => a.bind(e.proxy)) : t.bind(e.proxy),
    e,
    n
  );
}
function uh(t, e, n, a) {
  let o = a.includes(".") ? Sh(n, a) : () => n[a];
  if (Le(t)) {
    const h = e[t];
    Zt(h) && bn(o, h);
  } else if (Zt(t))
    bn(o, t.bind(n));
  else if (Ie(t))
    if (jt(t))
      t.forEach((h) => uh(h, e, n, a));
    else {
      const h = Zt(t.handler) ? t.handler.bind(n) : e[t.handler];
      Zt(h) && bn(o, h, t);
    }
}
function lh(t) {
  const e = t.type, { mixins: n, extends: a } = e, {
    mixins: o,
    optionsCache: h,
    config: { optionMergeStrategies: _ }
  } = t.appContext, v = h.get(e);
  let k;
  return v ? k = v : !o.length && !n && !a ? k = e : (k = {}, o.length && o.forEach(
    (R) => Fs(k, R, _, !0)
  ), Fs(k, e, _)), Ie(e) && h.set(e, k), k;
}
function Fs(t, e, n, a = !1) {
  const { mixins: o, extends: h } = e;
  h && Fs(t, h, n, !0), o && o.forEach(
    (_) => Fs(t, _, n, !0)
  );
  for (const _ in e)
    if (!(a && _ === "expose")) {
      const v = Td[_] || n && n[_];
      t[_] = v ? v(t[_], e[_]) : e[_];
    }
  return t;
}
const Td = {
  data: Hu,
  props: Wu,
  emits: Wu,
  // objects
  methods: Nr,
  computed: Nr,
  // lifecycle
  beforeCreate: Xe,
  created: Xe,
  beforeMount: Xe,
  mounted: Xe,
  beforeUpdate: Xe,
  updated: Xe,
  beforeDestroy: Xe,
  beforeUnmount: Xe,
  destroyed: Xe,
  unmounted: Xe,
  activated: Xe,
  deactivated: Xe,
  errorCaptured: Xe,
  serverPrefetch: Xe,
  // assets
  components: Nr,
  directives: Nr,
  // watch
  watch: Od,
  // provide / inject
  provide: Hu,
  inject: Ed
};
function Hu(t, e) {
  return e ? t ? function() {
    return ei(
      Zt(t) ? t.call(this, this) : t,
      Zt(e) ? e.call(this, this) : e
    );
  } : e : t;
}
function Ed(t, e) {
  return Nr(ro(t), ro(e));
}
function ro(t) {
  if (jt(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++)
      e[t[n]] = t[n];
    return e;
  }
  return t;
}
function Xe(t, e) {
  return t ? [...new Set([].concat(t, e))] : e;
}
function Nr(t, e) {
  return t ? ei(/* @__PURE__ */ Object.create(null), t, e) : e;
}
function Wu(t, e) {
  return t ? jt(t) && jt(e) ? [.../* @__PURE__ */ new Set([...t, ...e])] : ei(
    /* @__PURE__ */ Object.create(null),
    Uu(t),
    Uu(e ?? {})
  ) : e;
}
function Od(t, e) {
  if (!t) return e;
  if (!e) return t;
  const n = ei(/* @__PURE__ */ Object.create(null), t);
  for (const a in e)
    n[a] = Xe(t[a], e[a]);
  return n;
}
function hh() {
  return {
    app: null,
    config: {
      isNativeTag: xc,
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
let Md = 0;
function Ld(t, e) {
  return function(a, o = null) {
    Zt(a) || (a = ei({}, a)), o != null && !Ie(o) && (o = null);
    const h = hh(), _ = /* @__PURE__ */ new WeakSet(), v = [];
    let k = !1;
    const R = h.app = {
      _uid: Md++,
      _component: a,
      _props: o,
      _container: null,
      _context: h,
      _instance: null,
      version: gp,
      get config() {
        return h.config;
      },
      set config(z) {
      },
      use(z, ...U) {
        return _.has(z) || (z && Zt(z.install) ? (_.add(z), z.install(R, ...U)) : Zt(z) && (_.add(z), z(R, ...U))), R;
      },
      mixin(z) {
        return h.mixins.includes(z) || h.mixins.push(z), R;
      },
      component(z, U) {
        return U ? (h.components[z] = U, R) : h.components[z];
      },
      directive(z, U) {
        return U ? (h.directives[z] = U, R) : h.directives[z];
      },
      mount(z, U, et) {
        if (!k) {
          const F = R._ceVNode || pi(a, o);
          return F.appContext = h, et === !0 ? et = "svg" : et === !1 && (et = void 0), t(F, z, et), k = !0, R._container = z, z.__vue_app__ = R, ta(F.component);
        }
      },
      onUnmount(z) {
        v.push(z);
      },
      unmount() {
        k && (Zi(
          v,
          R._instance,
          16
        ), t(null, R._container), delete R._container.__vue_app__);
      },
      provide(z, U) {
        return h.provides[z] = U, R;
      },
      runWithContext(z) {
        const U = mr;
        mr = R;
        try {
          return z();
        } finally {
          mr = U;
        }
      }
    };
    return R;
  };
}
let mr = null;
function Nd(t, e) {
  if (Je) {
    let n = Je.provides;
    const a = Je.parent && Je.parent.provides;
    a === n && (n = Je.provides = Object.create(a)), n[t] = e;
  }
}
function As(t, e, n = !1) {
  const a = Je || Ii;
  if (a || mr) {
    const o = mr ? mr._context.provides : a ? a.parent == null ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides : void 0;
    if (o && t in o)
      return o[t];
    if (arguments.length > 1)
      return n && Zt(e) ? e.call(a && a.proxy) : e;
  }
}
const fh = {}, ch = () => Object.create(fh), dh = (t) => Object.getPrototypeOf(t) === fh;
function Rd(t, e, n, a = !1) {
  const o = {}, h = ch();
  t.propsDefaults = /* @__PURE__ */ Object.create(null), ph(t, e, o, h);
  for (const _ in t.propsOptions[0])
    _ in o || (o[_] = void 0);
  n ? t.props = a ? o : Qc(o) : t.type.props ? t.props = o : t.props = h, t.attrs = h;
}
function Fd(t, e, n, a) {
  const {
    props: o,
    attrs: h,
    vnode: { patchFlag: _ }
  } = t, v = te(o), [k] = t.propsOptions;
  let R = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (a || _ > 0) && !(_ & 16)
  ) {
    if (_ & 8) {
      const z = t.vnode.dynamicProps;
      for (let U = 0; U < z.length; U++) {
        let et = z[U];
        if (Qs(t.emitsOptions, et))
          continue;
        const F = e[et];
        if (k)
          if (de(h, et))
            F !== h[et] && (h[et] = F, R = !0);
          else {
            const yt = wn(et);
            o[yt] = so(
              k,
              v,
              yt,
              F,
              t,
              !1
            );
          }
        else
          F !== h[et] && (h[et] = F, R = !0);
      }
    }
  } else {
    ph(t, e, o, h) && (R = !0);
    let z;
    for (const U in v)
      (!e || // for camelCase
      !de(e, U) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((z = $n(U)) === U || !de(e, z))) && (k ? n && // for camelCase
      (n[U] !== void 0 || // for kebab-case
      n[z] !== void 0) && (o[U] = so(
        k,
        v,
        U,
        void 0,
        t,
        !0
      )) : delete o[U]);
    if (h !== v)
      for (const U in h)
        (!e || !de(e, U)) && (delete h[U], R = !0);
  }
  R && tn(t.attrs, "set", "");
}
function ph(t, e, n, a) {
  const [o, h] = t.propsOptions;
  let _ = !1, v;
  if (e)
    for (let k in e) {
      if (Fr(k))
        continue;
      const R = e[k];
      let z;
      o && de(o, z = wn(k)) ? !h || !h.includes(z) ? n[z] = R : (v || (v = {}))[z] = R : Qs(t.emitsOptions, k) || (!(k in a) || R !== a[k]) && (a[k] = R, _ = !0);
    }
  if (h) {
    const k = te(n), R = v || _e;
    for (let z = 0; z < h.length; z++) {
      const U = h[z];
      n[U] = so(
        o,
        k,
        U,
        R[U],
        t,
        !de(R, U)
      );
    }
  }
  return _;
}
function so(t, e, n, a, o, h) {
  const _ = t[n];
  if (_ != null) {
    const v = de(_, "default");
    if (v && a === void 0) {
      const k = _.default;
      if (_.type !== Function && !_.skipFactory && Zt(k)) {
        const { propsDefaults: R } = o;
        if (n in R)
          a = R[n];
        else {
          const z = ts(o);
          a = R[n] = k.call(
            null,
            e
          ), z();
        }
      } else
        a = k;
      o.ce && o.ce._setProp(n, a);
    }
    _[
      0
      /* shouldCast */
    ] && (h && !v ? a = !1 : _[
      1
      /* shouldCastTrue */
    ] && (a === "" || a === $n(n)) && (a = !0));
  }
  return a;
}
const zd = /* @__PURE__ */ new WeakMap();
function gh(t, e, n = !1) {
  const a = n ? zd : e.propsCache, o = a.get(t);
  if (o)
    return o;
  const h = t.props, _ = {}, v = [];
  let k = !1;
  if (!Zt(t)) {
    const z = (U) => {
      k = !0;
      const [et, F] = gh(U, e, !0);
      ei(_, et), F && v.push(...F);
    };
    !n && e.mixins.length && e.mixins.forEach(z), t.extends && z(t.extends), t.mixins && t.mixins.forEach(z);
  }
  if (!h && !k)
    return Ie(t) && a.set(t, dr), dr;
  if (jt(h))
    for (let z = 0; z < h.length; z++) {
      const U = wn(h[z]);
      Gu(U) && (_[U] = _e);
    }
  else if (h)
    for (const z in h) {
      const U = wn(z);
      if (Gu(U)) {
        const et = h[z], F = _[U] = jt(et) || Zt(et) ? { type: et } : ei({}, et), yt = F.type;
        let it = !1, Tt = !0;
        if (jt(yt))
          for (let ut = 0; ut < yt.length; ++ut) {
            const Qt = yt[ut], It = Zt(Qt) && Qt.name;
            if (It === "Boolean") {
              it = !0;
              break;
            } else It === "String" && (Tt = !1);
          }
        else
          it = Zt(yt) && yt.name === "Boolean";
        F[
          0
          /* shouldCast */
        ] = it, F[
          1
          /* shouldCastTrue */
        ] = Tt, (it || de(F, "default")) && v.push(U);
      }
    }
  const R = [_, v];
  return Ie(t) && a.set(t, R), R;
}
function Gu(t) {
  return t[0] !== "$" && !Fr(t);
}
const _h = (t) => t[0] === "_" || t === "$stable", qo = (t) => jt(t) ? t.map(Wi) : [Wi(t)], Dd = (t, e, n) => {
  if (e._n)
    return e;
  const a = hd((...o) => qo(e(...o)), n);
  return a._c = !1, a;
}, mh = (t, e, n) => {
  const a = t._ctx;
  for (const o in t) {
    if (_h(o)) continue;
    const h = t[o];
    if (Zt(h))
      e[o] = Dd(o, h, a);
    else if (h != null) {
      const _ = qo(h);
      e[o] = () => _;
    }
  }
}, vh = (t, e) => {
  const n = qo(e);
  t.slots.default = () => n;
}, yh = (t, e, n) => {
  for (const a in e)
    (n || a !== "_") && (t[a] = e[a]);
}, Vd = (t, e, n) => {
  const a = t.slots = ch();
  if (t.vnode.shapeFlag & 32) {
    const o = e._;
    o ? (yh(a, e, n), n && Ml(a, "_", o, !0)) : mh(e, a);
  } else e && vh(t, e);
}, Bd = (t, e, n) => {
  const { vnode: a, slots: o } = t;
  let h = !0, _ = _e;
  if (a.shapeFlag & 32) {
    const v = e._;
    v ? n && v === 1 ? h = !1 : yh(o, e, n) : (h = !e.$stable, mh(e, o)), _ = e;
  } else e && (vh(t, e), _ = { default: 1 });
  if (h)
    for (const v in o)
      !_h(v) && _[v] == null && delete o[v];
}, hi = tp;
function qd(t) {
  return Ud(t);
}
function Ud(t, e) {
  const n = Ks();
  n.__VUE__ = !0;
  const {
    insert: a,
    remove: o,
    patchProp: h,
    createElement: _,
    createText: v,
    createComment: k,
    setText: R,
    setElementText: z,
    parentNode: U,
    nextSibling: et,
    setScopeId: F = Gi,
    insertStaticContent: yt
  } = t, it = (W, K, tt, ft = null, ot = null, ht = null, bt = void 0, vt = null, _t = !!K.dynamicChildren) => {
    if (W === K)
      return;
    W && !Mr(W, K) && (ft = hn(W), vi(W, ot, ht, !0), W = null), K.patchFlag === -2 && (_t = !1, K.dynamicChildren = null);
    const { type: st, ref: Mt, shapeFlag: dt } = K;
    switch (st) {
      case Js:
        Tt(W, K, tt, ft);
        break;
      case Gn:
        ut(W, K, tt, ft);
        break;
      case Da:
        W == null && Qt(K, tt, ft, bt);
        break;
      case ci:
        Ne(
          W,
          K,
          tt,
          ft,
          ot,
          ht,
          bt,
          vt,
          _t
        );
        break;
      default:
        dt & 1 ? ie(
          W,
          K,
          tt,
          ft,
          ot,
          ht,
          bt,
          vt,
          _t
        ) : dt & 6 ? Ye(
          W,
          K,
          tt,
          ft,
          ot,
          ht,
          bt,
          vt,
          _t
        ) : (dt & 64 || dt & 128) && st.process(
          W,
          K,
          tt,
          ft,
          ot,
          ht,
          bt,
          vt,
          _t,
          ye
        );
    }
    Mt != null && ot && Rs(Mt, W && W.ref, ht, K || W, !K);
  }, Tt = (W, K, tt, ft) => {
    if (W == null)
      a(
        K.el = v(K.children),
        tt,
        ft
      );
    else {
      const ot = K.el = W.el;
      K.children !== W.children && R(ot, K.children);
    }
  }, ut = (W, K, tt, ft) => {
    W == null ? a(
      K.el = k(K.children || ""),
      tt,
      ft
    ) : K.el = W.el;
  }, Qt = (W, K, tt, ft) => {
    [W.el, W.anchor] = yt(
      W.children,
      K,
      tt,
      ft,
      W.el,
      W.anchor
    );
  }, It = ({ el: W, anchor: K }, tt, ft) => {
    let ot;
    for (; W && W !== K; )
      ot = et(W), a(W, tt, ft), W = ot;
    a(K, tt, ft);
  }, xt = ({ el: W, anchor: K }) => {
    let tt;
    for (; W && W !== K; )
      tt = et(W), o(W), W = tt;
    o(K);
  }, ie = (W, K, tt, ft, ot, ht, bt, vt, _t) => {
    K.type === "svg" ? bt = "svg" : K.type === "math" && (bt = "mathml"), W == null ? kt(
      K,
      tt,
      ft,
      ot,
      ht,
      bt,
      vt,
      _t
    ) : ve(
      W,
      K,
      ot,
      ht,
      bt,
      vt,
      _t
    );
  }, kt = (W, K, tt, ft, ot, ht, bt, vt) => {
    let _t, st;
    const { props: Mt, shapeFlag: dt, transition: Et, dirs: pt } = W;
    if (_t = W.el = _(
      W.type,
      ht,
      Mt && Mt.is,
      Mt
    ), dt & 8 ? z(_t, W.children) : dt & 16 && Ot(
      W.children,
      _t,
      null,
      ft,
      ot,
      za(W, ht),
      bt,
      vt
    ), pt && zn(W, null, ft, "created"), At(_t, W, W.scopeId, bt, ft), Mt) {
      for (const r in Mt)
        r !== "value" && !Fr(r) && h(_t, r, null, Mt[r], ht, ft);
      "value" in Mt && h(_t, "value", null, Mt.value, ht), (st = Mt.onVnodeBeforeMount) && Ui(st, ft, W);
    }
    pt && zn(W, null, ft, "beforeMount");
    const i = jd(ot, Et);
    i && Et.beforeEnter(_t), a(_t, K, tt), ((st = Mt && Mt.onVnodeMounted) || i || pt) && hi(() => {
      st && Ui(st, ft, W), i && Et.enter(_t), pt && zn(W, null, ft, "mounted");
    }, ot);
  }, At = (W, K, tt, ft, ot) => {
    if (tt && F(W, tt), ft)
      for (let ht = 0; ht < ft.length; ht++)
        F(W, ft[ht]);
    if (ot) {
      let ht = ot.subTree;
      if (K === ht || Ih(ht.type) && (ht.ssContent === K || ht.ssFallback === K)) {
        const bt = ot.vnode;
        At(
          W,
          bt,
          bt.scopeId,
          bt.slotScopeIds,
          ot.parent
        );
      }
    }
  }, Ot = (W, K, tt, ft, ot, ht, bt, vt, _t = 0) => {
    for (let st = _t; st < W.length; st++) {
      const Mt = W[st] = vt ? mn(W[st]) : Wi(W[st]);
      it(
        null,
        Mt,
        K,
        tt,
        ft,
        ot,
        ht,
        bt,
        vt
      );
    }
  }, ve = (W, K, tt, ft, ot, ht, bt) => {
    const vt = K.el = W.el;
    let { patchFlag: _t, dynamicChildren: st, dirs: Mt } = K;
    _t |= W.patchFlag & 16;
    const dt = W.props || _e, Et = K.props || _e;
    let pt;
    if (tt && Dn(tt, !1), (pt = Et.onVnodeBeforeUpdate) && Ui(pt, tt, K, W), Mt && zn(K, W, tt, "beforeUpdate"), tt && Dn(tt, !0), (dt.innerHTML && Et.innerHTML == null || dt.textContent && Et.textContent == null) && z(vt, ""), st ? Ke(
      W.dynamicChildren,
      st,
      vt,
      tt,
      ft,
      za(K, ot),
      ht
    ) : bt || oe(
      W,
      K,
      vt,
      null,
      tt,
      ft,
      za(K, ot),
      ht,
      !1
    ), _t > 0) {
      if (_t & 16)
        Ai(vt, dt, Et, tt, ot);
      else if (_t & 2 && dt.class !== Et.class && h(vt, "class", null, Et.class, ot), _t & 4 && h(vt, "style", dt.style, Et.style, ot), _t & 8) {
        const i = K.dynamicProps;
        for (let r = 0; r < i.length; r++) {
          const s = i[r], u = dt[s], l = Et[s];
          (l !== u || s === "value") && h(vt, s, u, l, ot, tt);
        }
      }
      _t & 1 && W.children !== K.children && z(vt, K.children);
    } else !bt && st == null && Ai(vt, dt, Et, tt, ot);
    ((pt = Et.onVnodeUpdated) || Mt) && hi(() => {
      pt && Ui(pt, tt, K, W), Mt && zn(K, W, tt, "updated");
    }, ft);
  }, Ke = (W, K, tt, ft, ot, ht, bt) => {
    for (let vt = 0; vt < K.length; vt++) {
      const _t = W[vt], st = K[vt], Mt = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        _t.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (_t.type === ci || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Mr(_t, st) || // - In the case of a component, it could contain anything.
        _t.shapeFlag & 70) ? U(_t.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          tt
        )
      );
      it(
        _t,
        st,
        Mt,
        null,
        ft,
        ot,
        ht,
        bt,
        !0
      );
    }
  }, Ai = (W, K, tt, ft, ot) => {
    if (K !== tt) {
      if (K !== _e)
        for (const ht in K)
          !Fr(ht) && !(ht in tt) && h(
            W,
            ht,
            K[ht],
            null,
            ot,
            ft
          );
      for (const ht in tt) {
        if (Fr(ht)) continue;
        const bt = tt[ht], vt = K[ht];
        bt !== vt && ht !== "value" && h(W, ht, vt, bt, ot, ft);
      }
      "value" in tt && h(W, "value", K.value, tt.value, ot);
    }
  }, Ne = (W, K, tt, ft, ot, ht, bt, vt, _t) => {
    const st = K.el = W ? W.el : v(""), Mt = K.anchor = W ? W.anchor : v("");
    let { patchFlag: dt, dynamicChildren: Et, slotScopeIds: pt } = K;
    pt && (vt = vt ? vt.concat(pt) : pt), W == null ? (a(st, tt, ft), a(Mt, tt, ft), Ot(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      K.children || [],
      tt,
      Mt,
      ot,
      ht,
      bt,
      vt,
      _t
    )) : dt > 0 && dt & 64 && Et && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    W.dynamicChildren ? (Ke(
      W.dynamicChildren,
      Et,
      tt,
      ot,
      ht,
      bt,
      vt
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (K.key != null || ot && K === ot.subTree) && bh(
      W,
      K,
      !0
      /* shallow */
    )) : oe(
      W,
      K,
      tt,
      Mt,
      ot,
      ht,
      bt,
      vt,
      _t
    );
  }, Ye = (W, K, tt, ft, ot, ht, bt, vt, _t) => {
    K.slotScopeIds = vt, W == null ? K.shapeFlag & 512 ? ot.ctx.activate(
      K,
      tt,
      ft,
      bt,
      _t
    ) : Pt(
      K,
      tt,
      ft,
      ot,
      ht,
      bt,
      _t
    ) : Qn(W, K, _t);
  }, Pt = (W, K, tt, ft, ot, ht, bt) => {
    const vt = W.component = lp(
      W,
      ft,
      ot
    );
    if (ah(W) && (vt.ctx.renderer = ye), hp(vt, !1, bt), vt.asyncDep) {
      if (ot && ot.registerDep(vt, lt, bt), !W.el) {
        const _t = vt.subTree = pi(Gn);
        ut(null, _t, K, tt);
      }
    } else
      lt(
        vt,
        W,
        K,
        tt,
        ot,
        ht,
        bt
      );
  }, Qn = (W, K, tt) => {
    const ft = K.component = W.component;
    if (Qd(W, K, tt))
      if (ft.asyncDep && !ft.asyncResolved) {
        re(ft, K, tt);
        return;
      } else
        ft.next = K, ft.update();
    else
      K.el = W.el, ft.vnode = K;
  }, lt = (W, K, tt, ft, ot, ht, bt) => {
    const vt = () => {
      if (W.isMounted) {
        let { next: dt, bu: Et, u: pt, parent: i, vnode: r } = W;
        {
          const d = xh(W);
          if (d) {
            dt && (dt.el = r.el, re(W, dt, bt)), d.asyncDep.then(() => {
              W.isUnmounted || vt();
            });
            return;
          }
        }
        let s = dt, u;
        Dn(W, !1), dt ? (dt.el = r.el, re(W, dt, bt)) : dt = r, Et && ks(Et), (u = dt.props && dt.props.onVnodeBeforeUpdate) && Ui(u, i, dt, r), Dn(W, !0);
        const l = Ku(W), f = W.subTree;
        W.subTree = l, it(
          f,
          l,
          // parent may have changed if it's in a teleport
          U(f.el),
          // anchor may have changed if it's in a fragment
          hn(f),
          W,
          ot,
          ht
        ), dt.el = l.el, s === null && Jd(W, l.el), pt && hi(pt, ot), (u = dt.props && dt.props.onVnodeUpdated) && hi(
          () => Ui(u, i, dt, r),
          ot
        );
      } else {
        let dt;
        const { el: Et, props: pt } = K, { bm: i, m: r, parent: s, root: u, type: l } = W, f = Vr(K);
        Dn(W, !1), i && ks(i), !f && (dt = pt && pt.onVnodeBeforeMount) && Ui(dt, s, K), Dn(W, !0);
        {
          u.ce && u.ce._injectChildStyle(l);
          const d = W.subTree = Ku(W);
          it(
            null,
            d,
            tt,
            ft,
            W,
            ot,
            ht
          ), K.el = d.el;
        }
        if (r && hi(r, ot), !f && (dt = pt && pt.onVnodeMounted)) {
          const d = K;
          hi(
            () => Ui(dt, s, d),
            ot
          );
        }
        (K.shapeFlag & 256 || s && Vr(s.vnode) && s.vnode.shapeFlag & 256) && W.a && hi(W.a, ot), W.isMounted = !0, K = tt = ft = null;
      }
    };
    W.scope.on();
    const _t = W.effect = new zl(vt);
    W.scope.off();
    const st = W.update = _t.run.bind(_t), Mt = W.job = _t.runIfDirty.bind(_t);
    Mt.i = W, Mt.id = W.uid, _t.scheduler = () => zo(Mt), Dn(W, !0), st();
  }, re = (W, K, tt) => {
    K.component = W;
    const ft = W.vnode.props;
    W.vnode = K, W.next = null, Fd(W, K.props, ft, tt), Bd(W, K.children, tt), kn(), qu(W), An();
  }, oe = (W, K, tt, ft, ot, ht, bt, vt, _t = !1) => {
    const st = W && W.children, Mt = W ? W.shapeFlag : 0, dt = K.children, { patchFlag: Et, shapeFlag: pt } = K;
    if (Et > 0) {
      if (Et & 128) {
        $e(
          st,
          dt,
          tt,
          ft,
          ot,
          ht,
          bt,
          vt,
          _t
        );
        return;
      } else if (Et & 256) {
        Yt(
          st,
          dt,
          tt,
          ft,
          ot,
          ht,
          bt,
          vt,
          _t
        );
        return;
      }
    }
    pt & 8 ? (Mt & 16 && Vi(st, ot, ht), dt !== st && z(tt, dt)) : Mt & 16 ? pt & 16 ? $e(
      st,
      dt,
      tt,
      ft,
      ot,
      ht,
      bt,
      vt,
      _t
    ) : Vi(st, ot, ht, !0) : (Mt & 8 && z(tt, ""), pt & 16 && Ot(
      dt,
      tt,
      ft,
      ot,
      ht,
      bt,
      vt,
      _t
    ));
  }, Yt = (W, K, tt, ft, ot, ht, bt, vt, _t) => {
    W = W || dr, K = K || dr;
    const st = W.length, Mt = K.length, dt = Math.min(st, Mt);
    let Et;
    for (Et = 0; Et < dt; Et++) {
      const pt = K[Et] = _t ? mn(K[Et]) : Wi(K[Et]);
      it(
        W[Et],
        pt,
        tt,
        null,
        ot,
        ht,
        bt,
        vt,
        _t
      );
    }
    st > Mt ? Vi(
      W,
      ot,
      ht,
      !0,
      !1,
      dt
    ) : Ot(
      K,
      tt,
      ft,
      ot,
      ht,
      bt,
      vt,
      _t,
      dt
    );
  }, $e = (W, K, tt, ft, ot, ht, bt, vt, _t) => {
    let st = 0;
    const Mt = K.length;
    let dt = W.length - 1, Et = Mt - 1;
    for (; st <= dt && st <= Et; ) {
      const pt = W[st], i = K[st] = _t ? mn(K[st]) : Wi(K[st]);
      if (Mr(pt, i))
        it(
          pt,
          i,
          tt,
          null,
          ot,
          ht,
          bt,
          vt,
          _t
        );
      else
        break;
      st++;
    }
    for (; st <= dt && st <= Et; ) {
      const pt = W[dt], i = K[Et] = _t ? mn(K[Et]) : Wi(K[Et]);
      if (Mr(pt, i))
        it(
          pt,
          i,
          tt,
          null,
          ot,
          ht,
          bt,
          vt,
          _t
        );
      else
        break;
      dt--, Et--;
    }
    if (st > dt) {
      if (st <= Et) {
        const pt = Et + 1, i = pt < Mt ? K[pt].el : ft;
        for (; st <= Et; )
          it(
            null,
            K[st] = _t ? mn(K[st]) : Wi(K[st]),
            tt,
            i,
            ot,
            ht,
            bt,
            vt,
            _t
          ), st++;
      }
    } else if (st > Et)
      for (; st <= dt; )
        vi(W[st], ot, ht, !0), st++;
    else {
      const pt = st, i = st, r = /* @__PURE__ */ new Map();
      for (st = i; st <= Et; st++) {
        const g = K[st] = _t ? mn(K[st]) : Wi(K[st]);
        g.key != null && r.set(g.key, st);
      }
      let s, u = 0;
      const l = Et - i + 1;
      let f = !1, d = 0;
      const c = new Array(l);
      for (st = 0; st < l; st++) c[st] = 0;
      for (st = pt; st <= dt; st++) {
        const g = W[st];
        if (u >= l) {
          vi(g, ot, ht, !0);
          continue;
        }
        let b;
        if (g.key != null)
          b = r.get(g.key);
        else
          for (s = i; s <= Et; s++)
            if (c[s - i] === 0 && Mr(g, K[s])) {
              b = s;
              break;
            }
        b === void 0 ? vi(g, ot, ht, !0) : (c[b - i] = st + 1, b >= d ? d = b : f = !0, it(
          g,
          K[b],
          tt,
          null,
          ot,
          ht,
          bt,
          vt,
          _t
        ), u++);
      }
      const p = f ? Hd(c) : dr;
      for (s = p.length - 1, st = l - 1; st >= 0; st--) {
        const g = i + st, b = K[g], S = g + 1 < Mt ? K[g + 1].el : ft;
        c[st] === 0 ? it(
          null,
          b,
          tt,
          S,
          ot,
          ht,
          bt,
          vt,
          _t
        ) : f && (s < 0 || st !== p[s] ? Di(b, tt, S, 2) : s--);
      }
    }
  }, Di = (W, K, tt, ft, ot = null) => {
    const { el: ht, type: bt, transition: vt, children: _t, shapeFlag: st } = W;
    if (st & 6) {
      Di(W.component.subTree, K, tt, ft);
      return;
    }
    if (st & 128) {
      W.suspense.move(K, tt, ft);
      return;
    }
    if (st & 64) {
      bt.move(W, K, tt, ye);
      return;
    }
    if (bt === ci) {
      a(ht, K, tt);
      for (let dt = 0; dt < _t.length; dt++)
        Di(_t[dt], K, tt, ft);
      a(W.anchor, K, tt);
      return;
    }
    if (bt === Da) {
      It(W, K, tt);
      return;
    }
    if (ft !== 2 && st & 1 && vt)
      if (ft === 0)
        vt.beforeEnter(ht), a(ht, K, tt), hi(() => vt.enter(ht), ot);
      else {
        const { leave: dt, delayLeave: Et, afterLeave: pt } = vt, i = () => a(ht, K, tt), r = () => {
          dt(ht, () => {
            i(), pt && pt();
          });
        };
        Et ? Et(ht, i, r) : r();
      }
    else
      a(ht, K, tt);
  }, vi = (W, K, tt, ft = !1, ot = !1) => {
    const {
      type: ht,
      props: bt,
      ref: vt,
      children: _t,
      dynamicChildren: st,
      shapeFlag: Mt,
      patchFlag: dt,
      dirs: Et,
      cacheIndex: pt
    } = W;
    if (dt === -2 && (ot = !1), vt != null && Rs(vt, null, tt, W, !0), pt != null && (K.renderCache[pt] = void 0), Mt & 256) {
      K.ctx.deactivate(W);
      return;
    }
    const i = Mt & 1 && Et, r = !Vr(W);
    let s;
    if (r && (s = bt && bt.onVnodeBeforeUnmount) && Ui(s, K, W), Mt & 6)
      Pe(W.component, tt, ft);
    else {
      if (Mt & 128) {
        W.suspense.unmount(tt, ft);
        return;
      }
      i && zn(W, null, K, "beforeUnmount"), Mt & 64 ? W.type.remove(
        W,
        K,
        tt,
        ye,
        ft
      ) : st && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !st.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (ht !== ci || dt > 0 && dt & 64) ? Vi(
        st,
        K,
        tt,
        !1,
        !0
      ) : (ht === ci && dt & 384 || !ot && Mt & 16) && Vi(_t, K, tt), ft && Tn(W);
    }
    (r && (s = bt && bt.onVnodeUnmounted) || i) && hi(() => {
      s && Ui(s, K, W), i && zn(W, null, K, "unmounted");
    }, tt);
  }, Tn = (W) => {
    const { type: K, el: tt, anchor: ft, transition: ot } = W;
    if (K === ci) {
      da(tt, ft);
      return;
    }
    if (K === Da) {
      xt(W);
      return;
    }
    const ht = () => {
      o(tt), ot && !ot.persisted && ot.afterLeave && ot.afterLeave();
    };
    if (W.shapeFlag & 1 && ot && !ot.persisted) {
      const { leave: bt, delayLeave: vt } = ot, _t = () => bt(tt, ht);
      vt ? vt(W.el, ht, _t) : _t();
    } else
      ht();
  }, da = (W, K) => {
    let tt;
    for (; W !== K; )
      tt = et(W), o(W), W = tt;
    o(K);
  }, Pe = (W, K, tt) => {
    const { bum: ft, scope: ot, job: ht, subTree: bt, um: vt, m: _t, a: st } = W;
    Zu(_t), Zu(st), ft && ks(ft), ot.stop(), ht && (ht.flags |= 8, vi(bt, W, K, tt)), vt && hi(vt, K), hi(() => {
      W.isUnmounted = !0;
    }, K), K && K.pendingBranch && !K.isUnmounted && W.asyncDep && !W.asyncResolved && W.suspenseId === K.pendingId && (K.deps--, K.deps === 0 && K.resolve());
  }, Vi = (W, K, tt, ft = !1, ot = !1, ht = 0) => {
    for (let bt = ht; bt < W.length; bt++)
      vi(W[bt], K, tt, ft, ot);
  }, hn = (W) => {
    if (W.shapeFlag & 6)
      return hn(W.component.subTree);
    if (W.shapeFlag & 128)
      return W.suspense.next();
    const K = et(W.anchor || W.el), tt = K && K[fd];
    return tt ? et(tt) : K;
  };
  let En = !1;
  const we = (W, K, tt) => {
    W == null ? K._vnode && vi(K._vnode, null, null, !0) : it(
      K._vnode || null,
      W,
      K,
      null,
      null,
      null,
      tt
    ), K._vnode = W, En || (En = !0, qu(), ih(), En = !1);
  }, ye = {
    p: it,
    um: vi,
    m: Di,
    r: Tn,
    mt: Pt,
    mc: Ot,
    pc: oe,
    pbc: Ke,
    n: hn,
    o: t
  };
  return {
    render: we,
    hydrate: void 0,
    createApp: Ld(we)
  };
}
function za({ type: t, props: e }, n) {
  return n === "svg" && t === "foreignObject" || n === "mathml" && t === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : n;
}
function Dn({ effect: t, job: e }, n) {
  n ? (t.flags |= 32, e.flags |= 4) : (t.flags &= -33, e.flags &= -5);
}
function jd(t, e) {
  return (!t || t && !t.pendingBranch) && e && !e.persisted;
}
function bh(t, e, n = !1) {
  const a = t.children, o = e.children;
  if (jt(a) && jt(o))
    for (let h = 0; h < a.length; h++) {
      const _ = a[h];
      let v = o[h];
      v.shapeFlag & 1 && !v.dynamicChildren && ((v.patchFlag <= 0 || v.patchFlag === 32) && (v = o[h] = mn(o[h]), v.el = _.el), !n && v.patchFlag !== -2 && bh(_, v)), v.type === Js && (v.el = _.el);
    }
}
function Hd(t) {
  const e = t.slice(), n = [0];
  let a, o, h, _, v;
  const k = t.length;
  for (a = 0; a < k; a++) {
    const R = t[a];
    if (R !== 0) {
      if (o = n[n.length - 1], t[o] < R) {
        e[a] = o, n.push(a);
        continue;
      }
      for (h = 0, _ = n.length - 1; h < _; )
        v = h + _ >> 1, t[n[v]] < R ? h = v + 1 : _ = v;
      R < t[n[h]] && (h > 0 && (e[a] = n[h - 1]), n[h] = a);
    }
  }
  for (h = n.length, _ = n[h - 1]; h-- > 0; )
    n[h] = _, _ = e[_];
  return n;
}
function xh(t) {
  const e = t.subTree.component;
  if (e)
    return e.asyncDep && !e.asyncResolved ? e : xh(e);
}
function Zu(t) {
  if (t)
    for (let e = 0; e < t.length; e++)
      t[e].flags |= 8;
}
const Wd = Symbol.for("v-scx"), Gd = () => As(Wd);
function bn(t, e, n) {
  return wh(t, e, n);
}
function wh(t, e, n = _e) {
  const { immediate: a, deep: o, flush: h, once: _ } = n, v = ei({}, n), k = e && a || !e && h !== "post";
  let R;
  if (Zr) {
    if (h === "sync") {
      const F = Gd();
      R = F.__watcherHandles || (F.__watcherHandles = []);
    } else if (!k) {
      const F = () => {
      };
      return F.stop = Gi, F.resume = Gi, F.pause = Gi, F;
    }
  }
  const z = Je;
  v.call = (F, yt, it) => Zi(F, z, yt, it);
  let U = !1;
  h === "post" ? v.scheduler = (F) => {
    hi(F, z && z.suspense);
  } : h !== "sync" && (U = !0, v.scheduler = (F, yt) => {
    yt ? F() : zo(F);
  }), v.augmentJob = (F) => {
    e && (F.flags |= 4), U && (F.flags |= 2, z && (F.id = z.uid, F.i = z));
  };
  const et = sd(t, e, v);
  return Zr && (R ? R.push(et) : k && et()), et;
}
function Zd(t, e, n) {
  const a = this.proxy, o = Le(t) ? t.includes(".") ? Sh(a, t) : () => a[t] : t.bind(a, a);
  let h;
  Zt(e) ? h = e : (h = e.handler, n = e);
  const _ = ts(this), v = wh(o, h.bind(a), n);
  return _(), v;
}
function Sh(t, e) {
  const n = e.split(".");
  return () => {
    let a = t;
    for (let o = 0; o < n.length && a; o++)
      a = a[n[o]];
    return a;
  };
}
const Kd = (t, e) => e === "modelValue" || e === "model-value" ? t.modelModifiers : t[`${e}Modifiers`] || t[`${wn(e)}Modifiers`] || t[`${$n(e)}Modifiers`];
function Yd(t, e, ...n) {
  if (t.isUnmounted) return;
  const a = t.vnode.props || _e;
  let o = n;
  const h = e.startsWith("update:"), _ = h && Kd(a, e.slice(7));
  _ && (_.trim && (o = n.map((z) => Le(z) ? z.trim() : z)), _.number && (o = n.map(Ya)));
  let v, k = a[v = Oa(e)] || // also try camelCase event handler (#2249)
  a[v = Oa(wn(e))];
  !k && h && (k = a[v = Oa($n(e))]), k && Zi(
    k,
    t,
    6,
    o
  );
  const R = a[v + "Once"];
  if (R) {
    if (!t.emitted)
      t.emitted = {};
    else if (t.emitted[v])
      return;
    t.emitted[v] = !0, Zi(
      R,
      t,
      6,
      o
    );
  }
}
function Ch(t, e, n = !1) {
  const a = e.emitsCache, o = a.get(t);
  if (o !== void 0)
    return o;
  const h = t.emits;
  let _ = {}, v = !1;
  if (!Zt(t)) {
    const k = (R) => {
      const z = Ch(R, e, !0);
      z && (v = !0, ei(_, z));
    };
    !n && e.mixins.length && e.mixins.forEach(k), t.extends && k(t.extends), t.mixins && t.mixins.forEach(k);
  }
  return !h && !v ? (Ie(t) && a.set(t, null), null) : (jt(h) ? h.forEach((k) => _[k] = null) : ei(_, h), Ie(t) && a.set(t, _), _);
}
function Qs(t, e) {
  return !t || !Ws(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), de(t, e[0].toLowerCase() + e.slice(1)) || de(t, $n(e)) || de(t, e));
}
function Ku(t) {
  const {
    type: e,
    vnode: n,
    proxy: a,
    withProxy: o,
    propsOptions: [h],
    slots: _,
    attrs: v,
    emit: k,
    render: R,
    renderCache: z,
    props: U,
    data: et,
    setupState: F,
    ctx: yt,
    inheritAttrs: it
  } = t, Tt = Ns(t);
  let ut, Qt;
  try {
    if (n.shapeFlag & 4) {
      const xt = o || a, ie = xt;
      ut = Wi(
        R.call(
          ie,
          xt,
          z,
          U,
          F,
          et,
          yt
        )
      ), Qt = v;
    } else {
      const xt = e;
      ut = Wi(
        xt.length > 1 ? xt(
          U,
          { attrs: v, slots: _, emit: k }
        ) : xt(
          U,
          null
        )
      ), Qt = e.props ? v : $d(v);
    }
  } catch (xt) {
    qr.length = 0, $s(xt, t, 1), ut = pi(Gn);
  }
  let It = ut;
  if (Qt && it !== !1) {
    const xt = Object.keys(Qt), { shapeFlag: ie } = It;
    xt.length && ie & 7 && (h && xt.some(Co) && (Qt = Xd(
      Qt,
      h
    )), It = vr(It, Qt, !1, !0));
  }
  return n.dirs && (It = vr(It, null, !1, !0), It.dirs = It.dirs ? It.dirs.concat(n.dirs) : n.dirs), n.transition && Do(It, n.transition), ut = It, Ns(Tt), ut;
}
const $d = (t) => {
  let e;
  for (const n in t)
    (n === "class" || n === "style" || Ws(n)) && ((e || (e = {}))[n] = t[n]);
  return e;
}, Xd = (t, e) => {
  const n = {};
  for (const a in t)
    (!Co(a) || !(a.slice(9) in e)) && (n[a] = t[a]);
  return n;
};
function Qd(t, e, n) {
  const { props: a, children: o, component: h } = t, { props: _, children: v, patchFlag: k } = e, R = h.emitsOptions;
  if (e.dirs || e.transition)
    return !0;
  if (n && k >= 0) {
    if (k & 1024)
      return !0;
    if (k & 16)
      return a ? Yu(a, _, R) : !!_;
    if (k & 8) {
      const z = e.dynamicProps;
      for (let U = 0; U < z.length; U++) {
        const et = z[U];
        if (_[et] !== a[et] && !Qs(R, et))
          return !0;
      }
    }
  } else
    return (o || v) && (!v || !v.$stable) ? !0 : a === _ ? !1 : a ? _ ? Yu(a, _, R) : !0 : !!_;
  return !1;
}
function Yu(t, e, n) {
  const a = Object.keys(e);
  if (a.length !== Object.keys(t).length)
    return !0;
  for (let o = 0; o < a.length; o++) {
    const h = a[o];
    if (e[h] !== t[h] && !Qs(n, h))
      return !0;
  }
  return !1;
}
function Jd({ vnode: t, parent: e }, n) {
  for (; e; ) {
    const a = e.subTree;
    if (a.suspense && a.suspense.activeBranch === t && (a.el = t.el), a === t)
      (t = e.vnode).el = n, e = e.parent;
    else
      break;
  }
}
const Ih = (t) => t.__isSuspense;
function tp(t, e) {
  e && e.pendingBranch ? jt(t) ? e.effects.push(...t) : e.effects.push(t) : ld(t);
}
const ci = Symbol.for("v-fgt"), Js = Symbol.for("v-txt"), Gn = Symbol.for("v-cmt"), Da = Symbol.for("v-stc"), qr = [];
let di = null;
function nn(t = !1) {
  qr.push(di = t ? null : []);
}
function ep() {
  qr.pop(), di = qr[qr.length - 1] || null;
}
let Gr = 1;
function $u(t, e = !1) {
  Gr += t, t < 0 && di && e && (di.hasOnce = !0);
}
function kh(t) {
  return t.dynamicChildren = Gr > 0 ? di || dr : null, ep(), Gr > 0 && di && di.push(t), t;
}
function xn(t, e, n, a, o, h) {
  return kh(
    Wt(
      t,
      e,
      n,
      a,
      o,
      h,
      !0
    )
  );
}
function ip(t, e, n, a, o) {
  return kh(
    pi(
      t,
      e,
      n,
      a,
      o,
      !0
    )
  );
}
function Ah(t) {
  return t ? t.__v_isVNode === !0 : !1;
}
function Mr(t, e) {
  return t.type === e.type && t.key === e.key;
}
const Ph = ({ key: t }) => t ?? null, Ps = ({
  ref: t,
  ref_key: e,
  ref_for: n
}) => (typeof t == "number" && (t = "" + t), t != null ? Le(t) || Ge(t) || Zt(t) ? { i: Ii, r: t, k: e, f: !!n } : t : null);
function Wt(t, e = null, n = null, a = 0, o = null, h = t === ci ? 0 : 1, _ = !1, v = !1) {
  const k = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t,
    props: e,
    key: e && Ph(e),
    ref: e && Ps(e),
    scopeId: rh,
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
    shapeFlag: h,
    patchFlag: a,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ii
  };
  return v ? (Uo(k, n), h & 128 && t.normalize(k)) : n && (k.shapeFlag |= Le(n) ? 8 : 16), Gr > 0 && // avoid a block node from tracking itself
  !_ && // has current parent block
  di && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (k.patchFlag > 0 || h & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  k.patchFlag !== 32 && di.push(k), k;
}
const pi = np;
function np(t, e = null, n = null, a = 0, o = null, h = !1) {
  if ((!t || t === Cd) && (t = Gn), Ah(t)) {
    const v = vr(
      t,
      e,
      !0
      /* mergeRef: true */
    );
    return n && Uo(v, n), Gr > 0 && !h && di && (v.shapeFlag & 6 ? di[di.indexOf(t)] = v : di.push(v)), v.patchFlag = -2, v;
  }
  if (pp(t) && (t = t.__vccOpts), e) {
    e = rp(e);
    let { class: v, style: k } = e;
    v && !Le(v) && (e.class = Po(v)), Ie(k) && (Fo(k) && !jt(k) && (k = ei({}, k)), e.style = Ao(k));
  }
  const _ = Le(t) ? 1 : Ih(t) ? 128 : cd(t) ? 64 : Ie(t) ? 4 : Zt(t) ? 2 : 0;
  return Wt(
    t,
    e,
    n,
    a,
    o,
    _,
    h,
    !0
  );
}
function rp(t) {
  return t ? Fo(t) || dh(t) ? ei({}, t) : t : null;
}
function vr(t, e, n = !1, a = !1) {
  const { props: o, ref: h, patchFlag: _, children: v, transition: k } = t, R = e ? ap(o || {}, e) : o, z = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: t.type,
    props: R,
    key: R && Ph(R),
    ref: e && e.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && h ? jt(h) ? h.concat(Ps(e)) : [h, Ps(e)] : Ps(e)
    ) : h,
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
    patchFlag: e && t.type !== ci ? _ === -1 ? 16 : _ | 16 : _,
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
    ssContent: t.ssContent && vr(t.ssContent),
    ssFallback: t.ssFallback && vr(t.ssFallback),
    el: t.el,
    anchor: t.anchor,
    ctx: t.ctx,
    ce: t.ce
  };
  return k && a && Do(
    z,
    k.clone(z)
  ), z;
}
function Ji(t = " ", e = 0) {
  return pi(Js, null, t, e);
}
function sp(t = "", e = !1) {
  return e ? (nn(), ip(Gn, null, t)) : pi(Gn, null, t);
}
function Wi(t) {
  return t == null || typeof t == "boolean" ? pi(Gn) : jt(t) ? pi(
    ci,
    null,
    // #3666, avoid reference pollution when reusing vnode
    t.slice()
  ) : Ah(t) ? mn(t) : pi(Js, null, String(t));
}
function mn(t) {
  return t.el === null && t.patchFlag !== -1 || t.memo ? t : vr(t);
}
function Uo(t, e) {
  let n = 0;
  const { shapeFlag: a } = t;
  if (e == null)
    e = null;
  else if (jt(e))
    n = 16;
  else if (typeof e == "object")
    if (a & 65) {
      const o = e.default;
      o && (o._c && (o._d = !1), Uo(t, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = e._;
      !o && !dh(e) ? e._ctx = Ii : o === 3 && Ii && (Ii.slots._ === 1 ? e._ = 1 : (e._ = 2, t.patchFlag |= 1024));
    }
  else Zt(e) ? (e = { default: e, _ctx: Ii }, n = 32) : (e = String(e), a & 64 ? (n = 16, e = [Ji(e)]) : n = 8);
  t.children = e, t.shapeFlag |= n;
}
function ap(...t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const a = t[n];
    for (const o in a)
      if (o === "class")
        e.class !== a.class && (e.class = Po([e.class, a.class]));
      else if (o === "style")
        e.style = Ao([e.style, a.style]);
      else if (Ws(o)) {
        const h = e[o], _ = a[o];
        _ && h !== _ && !(jt(h) && h.includes(_)) && (e[o] = h ? [].concat(h, _) : _);
      } else o !== "" && (e[o] = a[o]);
  }
  return e;
}
function Ui(t, e, n, a = null) {
  Zi(t, e, 7, [
    n,
    a
  ]);
}
const op = hh();
let up = 0;
function lp(t, e, n) {
  const a = t.type, o = (e ? e.appContext : t.appContext) || op, h = {
    uid: up++,
    vnode: t,
    type: a,
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
    scope: new Fl(
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
    propsOptions: gh(a, o),
    emitsOptions: Ch(a, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: _e,
    // inheritAttrs
    inheritAttrs: a.inheritAttrs,
    // state
    ctx: _e,
    data: _e,
    props: _e,
    attrs: _e,
    slots: _e,
    refs: _e,
    setupState: _e,
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
  return h.ctx = { _: h }, h.root = e ? e.root : h, h.emit = Yd.bind(null, h), t.ce && t.ce(h), h;
}
let Je = null, zs, ao;
{
  const t = Ks(), e = (n, a) => {
    let o;
    return (o = t[n]) || (o = t[n] = []), o.push(a), (h) => {
      o.length > 1 ? o.forEach((_) => _(h)) : o[0](h);
    };
  };
  zs = e(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Je = n
  ), ao = e(
    "__VUE_SSR_SETTERS__",
    (n) => Zr = n
  );
}
const ts = (t) => {
  const e = Je;
  return zs(t), t.scope.on(), () => {
    t.scope.off(), zs(e);
  };
}, Xu = () => {
  Je && Je.scope.off(), zs(null);
};
function Th(t) {
  return t.vnode.shapeFlag & 4;
}
let Zr = !1;
function hp(t, e = !1, n = !1) {
  e && ao(e);
  const { props: a, children: o } = t.vnode, h = Th(t);
  Rd(t, a, h, e), Vd(t, o, n);
  const _ = h ? fp(t, e) : void 0;
  return e && ao(!1), _;
}
function fp(t, e) {
  const n = t.type;
  t.accessCache = /* @__PURE__ */ Object.create(null), t.proxy = new Proxy(t.ctx, kd);
  const { setup: a } = n;
  if (a) {
    kn();
    const o = t.setupContext = a.length > 1 ? dp(t) : null, h = ts(t), _ = Jr(
      a,
      t,
      0,
      [
        t.props,
        o
      ]
    ), v = Pl(_);
    if (An(), h(), (v || t.sp) && !Vr(t) && sh(t), v) {
      if (_.then(Xu, Xu), e)
        return _.then((k) => {
          Qu(t, k);
        }).catch((k) => {
          $s(k, t, 0);
        });
      t.asyncDep = _;
    } else
      Qu(t, _);
  } else
    Eh(t);
}
function Qu(t, e, n) {
  Zt(e) ? t.type.__ssrInlineRender ? t.ssrRender = e : t.render = e : Ie(e) && (t.setupState = Jl(e)), Eh(t);
}
function Eh(t, e, n) {
  const a = t.type;
  t.render || (t.render = a.render || Gi);
  {
    const o = ts(t);
    kn();
    try {
      Ad(t);
    } finally {
      An(), o();
    }
  }
}
const cp = {
  get(t, e) {
    return He(t, "get", ""), t[e];
  }
};
function dp(t) {
  const e = (n) => {
    t.exposed = n || {};
  };
  return {
    attrs: new Proxy(t.attrs, cp),
    slots: t.slots,
    emit: t.emit,
    expose: e
  };
}
function ta(t) {
  return t.exposed ? t.exposeProxy || (t.exposeProxy = new Proxy(Jl(Ql(t.exposed)), {
    get(e, n) {
      if (n in e)
        return e[n];
      if (n in Br)
        return Br[n](t);
    },
    has(e, n) {
      return n in e || n in Br;
    }
  })) : t.proxy;
}
function pp(t) {
  return Zt(t) && "__vccOpts" in t;
}
const Ts = (t, e) => nd(t, e, Zr), gp = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let oo;
const Ju = typeof window < "u" && window.trustedTypes;
if (Ju)
  try {
    oo = /* @__PURE__ */ Ju.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const Oh = oo ? (t) => oo.createHTML(t) : (t) => t, _p = "http://www.w3.org/2000/svg", mp = "http://www.w3.org/1998/Math/MathML", Qi = typeof document < "u" ? document : null, tl = Qi && /* @__PURE__ */ Qi.createElement("template"), vp = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, a) => {
    const o = e === "svg" ? Qi.createElementNS(_p, t) : e === "mathml" ? Qi.createElementNS(mp, t) : n ? Qi.createElement(t, { is: n }) : Qi.createElement(t);
    return t === "select" && a && a.multiple != null && o.setAttribute("multiple", a.multiple), o;
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
  insertStaticContent(t, e, n, a, o, h) {
    const _ = n ? n.previousSibling : e.lastChild;
    if (o && (o === h || o.nextSibling))
      for (; e.insertBefore(o.cloneNode(!0), n), !(o === h || !(o = o.nextSibling)); )
        ;
    else {
      tl.innerHTML = Oh(
        a === "svg" ? `<svg>${t}</svg>` : a === "mathml" ? `<math>${t}</math>` : t
      );
      const v = tl.content;
      if (a === "svg" || a === "mathml") {
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
}, yp = Symbol("_vtc");
function bp(t, e, n) {
  const a = t[yp];
  a && (e = (e ? [e, ...a] : [...a]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const el = Symbol("_vod"), xp = Symbol("_vsh"), wp = Symbol(""), Sp = /(^|;)\s*display\s*:/;
function Cp(t, e, n) {
  const a = t.style, o = Le(n);
  let h = !1;
  if (n && !o) {
    if (e)
      if (Le(e))
        for (const _ of e.split(";")) {
          const v = _.slice(0, _.indexOf(":")).trim();
          n[v] == null && Es(a, v, "");
        }
      else
        for (const _ in e)
          n[_] == null && Es(a, _, "");
    for (const _ in n)
      _ === "display" && (h = !0), Es(a, _, n[_]);
  } else if (o) {
    if (e !== n) {
      const _ = a[wp];
      _ && (n += ";" + _), a.cssText = n, h = Sp.test(n);
    }
  } else e && t.removeAttribute("style");
  el in t && (t[el] = h ? a.display : "", t[xp] && (a.display = "none"));
}
const il = /\s*!important$/;
function Es(t, e, n) {
  if (jt(n))
    n.forEach((a) => Es(t, e, a));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const a = Ip(t, e);
    il.test(n) ? t.setProperty(
      $n(a),
      n.replace(il, ""),
      "important"
    ) : t[a] = n;
  }
}
const nl = ["Webkit", "Moz", "ms"], Va = {};
function Ip(t, e) {
  const n = Va[e];
  if (n)
    return n;
  let a = wn(e);
  if (a !== "filter" && a in t)
    return Va[e] = a;
  a = Ol(a);
  for (let o = 0; o < nl.length; o++) {
    const h = nl[o] + a;
    if (h in t)
      return Va[e] = h;
  }
  return e;
}
const rl = "http://www.w3.org/1999/xlink";
function sl(t, e, n, a, o, h = Oc(e)) {
  a && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(rl, e.slice(6, e.length)) : t.setAttributeNS(rl, e, n) : n == null || h && !Ll(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    h ? "" : In(n) ? String(n) : n
  );
}
function al(t, e, n, a, o) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? Oh(n) : n);
    return;
  }
  const h = t.tagName;
  if (e === "value" && h !== "PROGRESS" && // custom elements may use _value internally
  !h.includes("-")) {
    const v = h === "OPTION" ? t.getAttribute("value") || "" : t.value, k = n == null ? (
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
    v === "boolean" ? n = Ll(n) : n == null && v === "string" ? (n = "", _ = !0) : v === "number" && (n = 0, _ = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  _ && t.removeAttribute(o || e);
}
function hr(t, e, n, a) {
  t.addEventListener(e, n, a);
}
function kp(t, e, n, a) {
  t.removeEventListener(e, n, a);
}
const ol = Symbol("_vei");
function Ap(t, e, n, a, o = null) {
  const h = t[ol] || (t[ol] = {}), _ = h[e];
  if (a && _)
    _.value = a;
  else {
    const [v, k] = Pp(e);
    if (a) {
      const R = h[e] = Op(
        a,
        o
      );
      hr(t, v, R, k);
    } else _ && (kp(t, v, _, k), h[e] = void 0);
  }
}
const ul = /(?:Once|Passive|Capture)$/;
function Pp(t) {
  let e;
  if (ul.test(t)) {
    e = {};
    let a;
    for (; a = t.match(ul); )
      t = t.slice(0, t.length - a[0].length), e[a[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : $n(t.slice(2)), e];
}
let Ba = 0;
const Tp = /* @__PURE__ */ Promise.resolve(), Ep = () => Ba || (Tp.then(() => Ba = 0), Ba = Date.now());
function Op(t, e) {
  const n = (a) => {
    if (!a._vts)
      a._vts = Date.now();
    else if (a._vts <= n.attached)
      return;
    Zi(
      Mp(a, n.value),
      e,
      5,
      [a]
    );
  };
  return n.value = t, n.attached = Ep(), n;
}
function Mp(t, e) {
  if (jt(e)) {
    const n = t.stopImmediatePropagation;
    return t.stopImmediatePropagation = () => {
      n.call(t), t._stopped = !0;
    }, e.map(
      (a) => (o) => !o._stopped && a && a(o)
    );
  } else
    return e;
}
const ll = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, Lp = (t, e, n, a, o, h) => {
  const _ = o === "svg";
  e === "class" ? bp(t, a, _) : e === "style" ? Cp(t, n, a) : Ws(e) ? Co(e) || Ap(t, e, n, a, h) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Np(t, e, a, _)) ? (al(t, e, a), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && sl(t, e, a, _, h, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && (/[A-Z]/.test(e) || !Le(a)) ? al(t, wn(e), a, h, e) : (e === "true-value" ? t._trueValue = a : e === "false-value" && (t._falseValue = a), sl(t, e, a, _));
};
function Np(t, e, n, a) {
  if (a)
    return !!(e === "innerHTML" || e === "textContent" || e in t && ll(e) && Zt(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const o = t.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return ll(e) && Le(n) ? !1 : e in t;
}
const hl = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return jt(e) ? (n) => ks(e, n) : e;
};
function Rp(t) {
  t.target.composing = !0;
}
function fl(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const qa = Symbol("_assign"), ar = {
  created(t, { modifiers: { lazy: e, trim: n, number: a } }, o) {
    t[qa] = hl(o);
    const h = a || o.props && o.props.type === "number";
    hr(t, e ? "change" : "input", (_) => {
      if (_.target.composing) return;
      let v = t.value;
      n && (v = v.trim()), h && (v = Ya(v)), t[qa](v);
    }), n && hr(t, "change", () => {
      t.value = t.value.trim();
    }), e || (hr(t, "compositionstart", Rp), hr(t, "compositionend", fl), hr(t, "change", fl));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: a, trim: o, number: h } }, _) {
    if (t[qa] = hl(_), t.composing) return;
    const v = (h || t.type === "number") && !/^0\d/.test(t.value) ? Ya(t.value) : t.value, k = e ?? "";
    v !== k && (document.activeElement === t && t.type !== "range" && (a && e === n || o && t.value.trim() === k) || (t.value = k));
  }
}, Fp = /* @__PURE__ */ ei({ patchProp: Lp }, vp);
let cl;
function zp() {
  return cl || (cl = qd(Fp));
}
const Dp = (...t) => {
  const e = zp().createApp(...t), { mount: n } = e;
  return e.mount = (a) => {
    const o = Bp(a);
    if (!o) return;
    const h = e._component;
    !Zt(h) && !h.render && !h.template && (h.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const _ = n(o, !1, Vp(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), _;
  }, e;
};
function Vp(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function Bp(t) {
  return Le(t) ? document.querySelector(t) : t;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const qp = (
  /* istanbul ignore next */
  Symbol()
);
var dl;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(dl || (dl = {}));
function Up() {
  const t = Mc(!0), e = t.run(() => je({}));
  let n = [], a = [];
  const o = Ql({
    install(h) {
      o._a = h, h.provide(qp, o), h.config.globalProperties.$pinia = o, a.forEach((_) => n.push(_)), a = [];
    },
    use(h) {
      return this._a ? n.push(h) : a.push(h), this;
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
const uo = {}, Mh = [];
function Kt(t, e) {
  if (Array.isArray(t)) {
    for (const n of t)
      Kt(n, e);
    return;
  }
  if (typeof t == "object") {
    for (const n in t)
      Kt(n, t[n]);
    return;
  }
  Lh(Object.getOwnPropertyNames(e)), uo[t] = Object.assign(uo[t] || {}, e);
}
function ai(t) {
  return uo[t] || {};
}
function jp() {
  return [...new Set(Mh)];
}
function Lh(t) {
  Mh.push(...t);
}
function jo(t, e) {
  let n;
  const a = t.length, o = [];
  for (n = 0; n < a; n++)
    o.push(e(t[n]));
  return o;
}
function Hp(t, e) {
  let n;
  const a = t.length, o = [];
  for (n = 0; n < a; n++)
    e(t[n]) && o.push(t[n]);
  return o;
}
function Ua(t) {
  return t % 360 * Math.PI / 180;
}
function Ss(t) {
  return t.toLowerCase().replace(/-(.)/g, function(e, n) {
    return n.toUpperCase();
  });
}
function Wp(t) {
  return t.replace(/([A-Z])/g, function(e, n) {
    return "-" + n.toLowerCase();
  });
}
function Nh(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function wr(t, e, n, a) {
  return (e == null || n == null) && (a = a || t.bbox(), e == null ? e = a.width / a.height * n : n == null && (n = a.height / a.width * e)), {
    width: e,
    height: n
  };
}
function lo(t, e) {
  const n = t.origin;
  let a = t.ox != null ? t.ox : t.originX != null ? t.originX : "center", o = t.oy != null ? t.oy : t.originY != null ? t.originY : "center";
  n != null && ([a, o] = Array.isArray(n) ? n : typeof n == "object" ? [n.x, n.y] : [n, n]);
  const h = typeof a == "string", _ = typeof o == "string";
  if (h || _) {
    const {
      height: v,
      width: k,
      x: R,
      y: z
    } = e.bbox();
    h && (a = a.includes("left") ? R : a.includes("right") ? R + k : R + k / 2), _ && (o = o.includes("top") ? z : o.includes("bottom") ? z + v : z + v / 2);
  }
  return [a, o];
}
const Ho = "http://www.w3.org/2000/svg", Gp = "http://www.w3.org/1999/xhtml", Cs = "http://www.w3.org/2000/xmlns/", es = "http://www.w3.org/1999/xlink", Zp = "http://svgjs.dev/svgjs", he = {
  window: typeof window > "u" ? null : window,
  document: typeof document > "u" ? null : document
};
class Wo {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}
const Hn = {}, Go = "___SYMBOL___ROOT___";
function Kr(t, e = Ho) {
  return he.document.createElementNS(e, t);
}
function ti(t, e = !1) {
  if (t instanceof Wo) return t;
  if (typeof t == "object")
    return ja(t);
  if (t == null)
    return new Hn[Go]();
  if (typeof t == "string" && t.charAt(0) !== "<")
    return ja(he.document.querySelector(t));
  const n = e ? he.document.createElement("div") : Kr("svg");
  return n.innerHTML = t, t = ja(n.firstChild), n.removeChild(n.firstChild), t;
}
function xe(t, e) {
  return e && e.ownerDocument && e instanceof e.ownerDocument.defaultView.Node ? e : Kr(t);
}
function Si(t) {
  if (!t) return null;
  if (t.instance instanceof Wo) return t.instance;
  if (t.nodeName === "#document-fragment")
    return new Hn.Fragment(t);
  let e = Nh(t.nodeName || "Dom");
  return e === "LinearGradient" || e === "RadialGradient" ? e = "Gradient" : Hn[e] || (e = "Dom"), new Hn[e](t);
}
let ja = Si;
function ae(t, e = t.name, n = !1) {
  return Hn[e] = t, n && (Hn[Go] = t), Lh(Object.getOwnPropertyNames(t.prototype)), t;
}
function Kp(t) {
  return Hn[t];
}
let Yp = 1e3;
function Rh(t) {
  return "Svgjs" + Nh(t) + Yp++;
}
function Fh(t) {
  for (let e = t.children.length - 1; e >= 0; e--)
    Fh(t.children[e]);
  return t.id && (t.id = Rh(t.nodeName)), t;
}
function Jt(t, e) {
  let n, a;
  for (t = Array.isArray(t) ? t : [t], a = t.length - 1; a >= 0; a--)
    for (n in e)
      t[a].prototype[n] = e[n];
}
function be(t) {
  return function(...e) {
    const n = e[e.length - 1];
    return n && n.constructor === Object && !(n instanceof Array) ? t.apply(this, e.slice(0, -1)).attr(n) : t.apply(this, e);
  };
}
function $p() {
  return this.parent().children();
}
function Xp() {
  return this.parent().index(this);
}
function Qp() {
  return this.siblings()[this.position() + 1];
}
function Jp() {
  return this.siblings()[this.position() - 1];
}
function t0() {
  const t = this.position();
  return this.parent().add(this.remove(), t + 1), this;
}
function e0() {
  const t = this.position();
  return this.parent().add(this.remove(), t ? t - 1 : 0), this;
}
function i0() {
  return this.parent().add(this.remove()), this;
}
function n0() {
  return this.parent().add(this.remove(), 0), this;
}
function r0(t) {
  t = ti(t), t.remove();
  const e = this.position();
  return this.parent().add(t, e), this;
}
function s0(t) {
  t = ti(t), t.remove();
  const e = this.position();
  return this.parent().add(t, e + 1), this;
}
function a0(t) {
  return t = ti(t), t.before(this), this;
}
function o0(t) {
  return t = ti(t), t.after(this), this;
}
Kt("Dom", {
  siblings: $p,
  position: Xp,
  next: Qp,
  prev: Jp,
  forward: t0,
  backward: e0,
  front: i0,
  back: n0,
  before: r0,
  after: s0,
  insertBefore: a0,
  insertAfter: o0
});
const zh = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i, u0 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i, l0 = /rgb\((\d+),(\d+),(\d+)\)/, h0 = /(#[a-z_][a-z0-9\-_]*)/i, f0 = /\)\s*,?\s*/, c0 = /\s/g, pl = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i, gl = /^rgb\(/, _l = /^(\s+)?$/, ml = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, d0 = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i, on = /[\s,]+/, Zo = /[MLHVCSQTAZ]/i;
function p0() {
  const t = this.attr("class");
  return t == null ? [] : t.trim().split(on);
}
function g0(t) {
  return this.classes().indexOf(t) !== -1;
}
function _0(t) {
  if (!this.hasClass(t)) {
    const e = this.classes();
    e.push(t), this.attr("class", e.join(" "));
  }
  return this;
}
function m0(t) {
  return this.hasClass(t) && this.attr("class", this.classes().filter(function(e) {
    return e !== t;
  }).join(" ")), this;
}
function v0(t) {
  return this.hasClass(t) ? this.removeClass(t) : this.addClass(t);
}
Kt("Dom", {
  classes: p0,
  hasClass: g0,
  addClass: _0,
  removeClass: m0,
  toggleClass: v0
});
function y0(t, e) {
  const n = {};
  if (arguments.length === 0)
    return this.node.style.cssText.split(/\s*;\s*/).filter(function(a) {
      return !!a.length;
    }).forEach(function(a) {
      const o = a.split(/\s*:\s*/);
      n[o[0]] = o[1];
    }), n;
  if (arguments.length < 2) {
    if (Array.isArray(t)) {
      for (const a of t) {
        const o = Ss(a);
        n[a] = this.node.style[o];
      }
      return n;
    }
    if (typeof t == "string")
      return this.node.style[Ss(t)];
    if (typeof t == "object")
      for (const a in t)
        this.node.style[Ss(a)] = t[a] == null || _l.test(t[a]) ? "" : t[a];
  }
  return arguments.length === 2 && (this.node.style[Ss(t)] = e == null || _l.test(e) ? "" : e), this;
}
function b0() {
  return this.css("display", "");
}
function x0() {
  return this.css("display", "none");
}
function w0() {
  return this.css("display") !== "none";
}
Kt("Dom", {
  css: y0,
  show: b0,
  hide: x0,
  visible: w0
});
function S0(t, e, n) {
  if (t == null)
    return this.data(jo(Hp(this.node.attributes, (a) => a.nodeName.indexOf("data-") === 0), (a) => a.nodeName.slice(5)));
  if (t instanceof Array) {
    const a = {};
    for (const o of t)
      a[o] = this.data(o);
    return a;
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
Kt("Dom", {
  data: S0
});
function C0(t, e) {
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
function I0() {
  if (arguments.length === 0)
    this._memory = {};
  else
    for (let t = arguments.length - 1; t >= 0; t--)
      delete this.memory()[arguments[t]];
  return this;
}
function k0() {
  return this._memory = this._memory || {};
}
Kt("Dom", {
  remember: C0,
  forget: I0,
  memory: k0
});
function A0(t) {
  return t.length === 4 ? ["#", t.substring(1, 2), t.substring(1, 2), t.substring(2, 3), t.substring(2, 3), t.substring(3, 4), t.substring(3, 4)].join("") : t;
}
function P0(t) {
  const e = Math.round(t), a = Math.max(0, Math.min(255, e)).toString(16);
  return a.length === 1 ? "0" + a : a;
}
function or(t, e) {
  for (let n = e.length; n--; )
    if (t[e[n]] == null)
      return !1;
  return !0;
}
function T0(t, e) {
  const n = or(t, "rgb") ? {
    _a: t.r,
    _b: t.g,
    _c: t.b,
    _d: 0,
    space: "rgb"
  } : or(t, "xyz") ? {
    _a: t.x,
    _b: t.y,
    _c: t.z,
    _d: 0,
    space: "xyz"
  } : or(t, "hsl") ? {
    _a: t.h,
    _b: t.s,
    _c: t.l,
    _d: 0,
    space: "hsl"
  } : or(t, "lab") ? {
    _a: t.l,
    _b: t.a,
    _c: t.b,
    _d: 0,
    space: "lab"
  } : or(t, "lch") ? {
    _a: t.l,
    _b: t.c,
    _c: t.h,
    _d: 0,
    space: "lch"
  } : or(t, "cmyk") ? {
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
function E0(t) {
  return t === "lab" || t === "xyz" || t === "lch";
}
function Ha(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
class ge {
  constructor(...e) {
    this.init(...e);
  }
  // Test if given value is a color
  static isColor(e) {
    return e && (e instanceof ge || this.isRgb(e) || this.test(e));
  }
  // Test if given value is an rgb object
  static isRgb(e) {
    return e && typeof e.r == "number" && typeof e.g == "number" && typeof e.b == "number";
  }
  /*
  Generating random colors
  */
  static random(e = "vibrant", n, a) {
    const {
      random: o,
      round: h,
      sin: _,
      PI: v
    } = Math;
    if (e === "vibrant") {
      const k = 24 * o() + 57, R = 38 * o() + 45, z = 360 * o();
      return new ge(k, R, z, "lch");
    } else if (e === "sine") {
      n = n ?? o();
      const k = h(80 * _(2 * v * n / 0.5 + 0.01) + 150), R = h(50 * _(2 * v * n / 0.5 + 4.6) + 200), z = h(100 * _(2 * v * n / 0.5 + 2.3) + 150);
      return new ge(k, R, z);
    } else if (e === "pastel") {
      const k = 8 * o() + 86, R = 17 * o() + 9, z = 360 * o();
      return new ge(k, R, z, "lch");
    } else if (e === "dark") {
      const k = 10 + 10 * o(), R = 50 * o() + 86, z = 360 * o();
      return new ge(k, R, z, "lch");
    } else if (e === "rgb") {
      const k = 255 * o(), R = 255 * o(), z = 255 * o();
      return new ge(k, R, z);
    } else if (e === "lab") {
      const k = 100 * o(), R = 256 * o() - 128, z = 256 * o() - 128;
      return new ge(k, R, z, "lab");
    } else if (e === "grey") {
      const k = 255 * o();
      return new ge(k, k, k);
    } else
      throw new Error("Unsupported random color mode");
  }
  // Test if given value is a color string
  static test(e) {
    return typeof e == "string" && (pl.test(e) || gl.test(e));
  }
  cmyk() {
    const {
      _a: e,
      _b: n,
      _c: a
    } = this.rgb(), [o, h, _] = [e, n, a].map((et) => et / 255), v = Math.min(1 - o, 1 - h, 1 - _);
    if (v === 1)
      return new ge(0, 0, 0, 1, "cmyk");
    const k = (1 - o - v) / (1 - v), R = (1 - h - v) / (1 - v), z = (1 - _ - v) / (1 - v);
    return new ge(k, R, z, v, "cmyk");
  }
  hsl() {
    const {
      _a: e,
      _b: n,
      _c: a
    } = this.rgb(), [o, h, _] = [e, n, a].map((it) => it / 255), v = Math.max(o, h, _), k = Math.min(o, h, _), R = (v + k) / 2, z = v === k, U = v - k, et = z ? 0 : R > 0.5 ? U / (2 - v - k) : U / (v + k), F = z ? 0 : v === o ? ((h - _) / U + (h < _ ? 6 : 0)) / 6 : v === h ? ((_ - o) / U + 2) / 6 : v === _ ? ((o - h) / U + 4) / 6 : 0;
    return new ge(360 * F, 100 * et, 100 * R, "hsl");
  }
  init(e = 0, n = 0, a = 0, o = 0, h = "rgb") {
    if (e = e || 0, this.space)
      for (const U in this.space)
        delete this[this.space[U]];
    if (typeof e == "number")
      h = typeof o == "string" ? o : h, o = typeof o == "string" ? 0 : o, Object.assign(this, {
        _a: e,
        _b: n,
        _c: a,
        _d: o,
        space: h
      });
    else if (e instanceof Array)
      this.space = n || (typeof e[3] == "string" ? e[3] : e[4]) || "rgb", Object.assign(this, {
        _a: e[0],
        _b: e[1],
        _c: e[2],
        _d: e[3] || 0
      });
    else if (e instanceof Object) {
      const U = T0(e, n);
      Object.assign(this, U);
    } else if (typeof e == "string")
      if (gl.test(e)) {
        const U = e.replace(c0, ""), [et, F, yt] = l0.exec(U).slice(1, 4).map((it) => parseInt(it));
        Object.assign(this, {
          _a: et,
          _b: F,
          _c: yt,
          _d: 0,
          space: "rgb"
        });
      } else if (pl.test(e)) {
        const U = (it) => parseInt(it, 16), [, et, F, yt] = u0.exec(A0(e)).map(U);
        Object.assign(this, {
          _a: et,
          _b: F,
          _c: yt,
          _d: 0,
          space: "rgb"
        });
      } else throw Error("Unsupported string format, can't construct Color");
    const {
      _a: _,
      _b: v,
      _c: k,
      _d: R
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
      k: R
    } : {};
    Object.assign(this, z);
  }
  lab() {
    const {
      x: e,
      y: n,
      z: a
    } = this.xyz(), o = 116 * n - 16, h = 500 * (e - n), _ = 200 * (n - a);
    return new ge(o, h, _, "lab");
  }
  lch() {
    const {
      l: e,
      a: n,
      b: a
    } = this.lab(), o = Math.sqrt(n ** 2 + a ** 2);
    let h = 180 * Math.atan2(a, n) / Math.PI;
    return h < 0 && (h *= -1, h = 360 - h), new ge(e, o, h, "lch");
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb")
      return this;
    if (E0(this.space)) {
      let {
        x: e,
        y: n,
        z: a
      } = this;
      if (this.space === "lab" || this.space === "lch") {
        let {
          l: F,
          a: yt,
          b: it
        } = this;
        if (this.space === "lch") {
          const {
            c: kt,
            h: At
          } = this, Ot = Math.PI / 180;
          yt = kt * Math.cos(Ot * At), it = kt * Math.sin(Ot * At);
        }
        const Tt = (F + 16) / 116, ut = yt / 500 + Tt, Qt = Tt - it / 200, It = 16 / 116, xt = 8856e-6, ie = 7.787;
        e = 0.95047 * (ut ** 3 > xt ? ut ** 3 : (ut - It) / ie), n = 1 * (Tt ** 3 > xt ? Tt ** 3 : (Tt - It) / ie), a = 1.08883 * (Qt ** 3 > xt ? Qt ** 3 : (Qt - It) / ie);
      }
      const o = e * 3.2406 + n * -1.5372 + a * -0.4986, h = e * -0.9689 + n * 1.8758 + a * 0.0415, _ = e * 0.0557 + n * -0.204 + a * 1.057, v = Math.pow, k = 31308e-7, R = o > k ? 1.055 * v(o, 1 / 2.4) - 0.055 : 12.92 * o, z = h > k ? 1.055 * v(h, 1 / 2.4) - 0.055 : 12.92 * h, U = _ > k ? 1.055 * v(_, 1 / 2.4) - 0.055 : 12.92 * _;
      return new ge(255 * R, 255 * z, 255 * U);
    } else if (this.space === "hsl") {
      let {
        h: e,
        s: n,
        l: a
      } = this;
      if (e /= 360, n /= 100, a /= 100, n === 0)
        return a *= 255, new ge(a, a, a);
      const o = a < 0.5 ? a * (1 + n) : a + n - a * n, h = 2 * a - o, _ = 255 * Ha(h, o, e + 1 / 3), v = 255 * Ha(h, o, e), k = 255 * Ha(h, o, e - 1 / 3);
      return new ge(_, v, k);
    } else if (this.space === "cmyk") {
      const {
        c: e,
        m: n,
        y: a,
        k: o
      } = this, h = 255 * (1 - Math.min(1, e * (1 - o) + o)), _ = 255 * (1 - Math.min(1, n * (1 - o) + o)), v = 255 * (1 - Math.min(1, a * (1 - o) + o));
      return new ge(h, _, v);
    } else
      return this;
  }
  toArray() {
    const {
      _a: e,
      _b: n,
      _c: a,
      _d: o,
      space: h
    } = this;
    return [e, n, a, o, h];
  }
  toHex() {
    const [e, n, a] = this._clamped().map(P0);
    return `#${e}${n}${a}`;
  }
  toRgb() {
    const [e, n, a] = this._clamped();
    return `rgb(${e},${n},${a})`;
  }
  toString() {
    return this.toHex();
  }
  xyz() {
    const {
      _a: e,
      _b: n,
      _c: a
    } = this.rgb(), [o, h, _] = [e, n, a].map((ut) => ut / 255), v = o > 0.04045 ? Math.pow((o + 0.055) / 1.055, 2.4) : o / 12.92, k = h > 0.04045 ? Math.pow((h + 0.055) / 1.055, 2.4) : h / 12.92, R = _ > 0.04045 ? Math.pow((_ + 0.055) / 1.055, 2.4) : _ / 12.92, z = (v * 0.4124 + k * 0.3576 + R * 0.1805) / 0.95047, U = (v * 0.2126 + k * 0.7152 + R * 0.0722) / 1, et = (v * 0.0193 + k * 0.1192 + R * 0.9505) / 1.08883, F = z > 8856e-6 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116, yt = U > 8856e-6 ? Math.pow(U, 1 / 3) : 7.787 * U + 16 / 116, it = et > 8856e-6 ? Math.pow(et, 1 / 3) : 7.787 * et + 16 / 116;
    return new ge(F, yt, it, "xyz");
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const {
      _a: e,
      _b: n,
      _c: a
    } = this.rgb(), {
      max: o,
      min: h,
      round: _
    } = Math, v = (k) => o(0, h(_(k), 255));
    return [e, n, a].map(v);
  }
  /*
  Constructing colors
  */
}
class Oe {
  // Initialize
  constructor(...e) {
    this.init(...e);
  }
  // Clone point
  clone() {
    return new Oe(this);
  }
  init(e, n) {
    const a = {
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
    return this.x = o.x == null ? a.x : o.x, this.y = o.y == null ? a.y : o.y, this;
  }
  toArray() {
    return [this.x, this.y];
  }
  transform(e) {
    return this.clone().transformO(e);
  }
  // Transform point with matrix
  transformO(e) {
    Rt.isMatrixLike(e) || (e = new Rt(e));
    const {
      x: n,
      y: a
    } = this;
    return this.x = e.a * n + e.c * a + e.e, this.y = e.b * n + e.d * a + e.f, this;
  }
}
function O0(t, e) {
  return new Oe(t, e).transformO(this.screenCTM().inverseO());
}
function ur(t, e, n) {
  return Math.abs(e - t) < 1e-6;
}
class Rt {
  constructor(...e) {
    this.init(...e);
  }
  static formatTransforms(e) {
    const n = e.flip === "both" || e.flip === !0, a = e.flip && (n || e.flip === "x") ? -1 : 1, o = e.flip && (n || e.flip === "y") ? -1 : 1, h = e.skew && e.skew.length ? e.skew[0] : isFinite(e.skew) ? e.skew : isFinite(e.skewX) ? e.skewX : 0, _ = e.skew && e.skew.length ? e.skew[1] : isFinite(e.skew) ? e.skew : isFinite(e.skewY) ? e.skewY : 0, v = e.scale && e.scale.length ? e.scale[0] * a : isFinite(e.scale) ? e.scale * a : isFinite(e.scaleX) ? e.scaleX * a : a, k = e.scale && e.scale.length ? e.scale[1] * o : isFinite(e.scale) ? e.scale * o : isFinite(e.scaleY) ? e.scaleY * o : o, R = e.shear || 0, z = e.rotate || e.theta || 0, U = new Oe(e.origin || e.around || e.ox || e.originX, e.oy || e.originY), et = U.x, F = U.y, yt = new Oe(e.position || e.px || e.positionX || NaN, e.py || e.positionY || NaN), it = yt.x, Tt = yt.y, ut = new Oe(e.translate || e.tx || e.translateX, e.ty || e.translateY), Qt = ut.x, It = ut.y, xt = new Oe(e.relative || e.rx || e.relativeX, e.ry || e.relativeY), ie = xt.x, kt = xt.y;
    return {
      scaleX: v,
      scaleY: k,
      skewX: h,
      skewY: _,
      shear: R,
      theta: z,
      rx: ie,
      ry: kt,
      tx: Qt,
      ty: It,
      ox: et,
      oy: F,
      px: it,
      py: Tt
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
  static matrixMultiply(e, n, a) {
    const o = e.a * n.a + e.c * n.b, h = e.b * n.a + e.d * n.b, _ = e.a * n.c + e.c * n.d, v = e.b * n.c + e.d * n.d, k = e.e + e.a * n.e + e.c * n.f, R = e.f + e.b * n.e + e.d * n.f;
    return a.a = o, a.b = h, a.c = _, a.d = v, a.e = k, a.f = R, a;
  }
  around(e, n, a) {
    return this.clone().aroundO(e, n, a);
  }
  // Transform around a center point
  aroundO(e, n, a) {
    const o = e || 0, h = n || 0;
    return this.translateO(-o, -h).lmultiplyO(a).translateO(o, h);
  }
  // Clones this matrix
  clone() {
    return new Rt(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(e = 0, n = 0) {
    const a = this.a, o = this.b, h = this.c, _ = this.d, v = this.e, k = this.f, R = a * _ - o * h, z = R > 0 ? 1 : -1, U = z * Math.sqrt(a * a + o * o), et = Math.atan2(z * o, z * a), F = 180 / Math.PI * et, yt = Math.cos(et), it = Math.sin(et), Tt = (a * h + o * _) / R, ut = h * U / (Tt * a - o) || _ * U / (Tt * o + a), Qt = v - e + e * yt * U + n * (Tt * yt * U - it * ut), It = k - n + e * it * U + n * (Tt * it * U + yt * ut);
    return {
      // Return the affine parameters
      scaleX: U,
      scaleY: ut,
      shear: Tt,
      rotate: F,
      translateX: Qt,
      translateY: It,
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
    const n = new Rt(e);
    return ur(this.a, n.a) && ur(this.b, n.b) && ur(this.c, n.c) && ur(this.d, n.d) && ur(this.e, n.e) && ur(this.f, n.f);
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
    const n = Rt.fromArray([1, 0, 0, 1, 0, 0]);
    return e = e instanceof Ki ? e.matrixify() : typeof e == "string" ? Rt.fromArray(e.split(on).map(parseFloat)) : Array.isArray(e) ? Rt.fromArray(e) : typeof e == "object" && Rt.isMatrixLike(e) ? e : typeof e == "object" ? new Rt().transform(e) : arguments.length === 6 ? Rt.fromArray([].slice.call(arguments)) : n, this.a = e.a != null ? e.a : n.a, this.b = e.b != null ? e.b : n.b, this.c = e.c != null ? e.c : n.c, this.d = e.d != null ? e.d : n.d, this.e = e.e != null ? e.e : n.e, this.f = e.f != null ? e.f : n.f, this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const e = this.a, n = this.b, a = this.c, o = this.d, h = this.e, _ = this.f, v = e * o - n * a;
    if (!v) throw new Error("Cannot invert " + this);
    const k = o / v, R = -n / v, z = -a / v, U = e / v, et = -(k * h + z * _), F = -(R * h + U * _);
    return this.a = k, this.b = R, this.c = z, this.d = U, this.e = et, this.f = F, this;
  }
  lmultiply(e) {
    return this.clone().lmultiplyO(e);
  }
  lmultiplyO(e) {
    const n = this, a = e instanceof Rt ? e : new Rt(e);
    return Rt.matrixMultiply(a, n, this);
  }
  // Left multiplies by the given matrix
  multiply(e) {
    return this.clone().multiplyO(e);
  }
  multiplyO(e) {
    const n = this, a = e instanceof Rt ? e : new Rt(e);
    return Rt.matrixMultiply(n, a, this);
  }
  // Rotate matrix
  rotate(e, n, a) {
    return this.clone().rotateO(e, n, a);
  }
  rotateO(e, n = 0, a = 0) {
    e = Ua(e);
    const o = Math.cos(e), h = Math.sin(e), {
      a: _,
      b: v,
      c: k,
      d: R,
      e: z,
      f: U
    } = this;
    return this.a = _ * o - v * h, this.b = v * o + _ * h, this.c = k * o - R * h, this.d = R * o + k * h, this.e = z * o - U * h + a * h - n * o + n, this.f = U * o + z * h - n * h - a * o + a, this;
  }
  // Scale matrix
  scale(e, n, a, o) {
    return this.clone().scaleO(...arguments);
  }
  scaleO(e, n = e, a = 0, o = 0) {
    arguments.length === 3 && (o = a, a = n, n = e);
    const {
      a: h,
      b: _,
      c: v,
      d: k,
      e: R,
      f: z
    } = this;
    return this.a = h * e, this.b = _ * n, this.c = v * e, this.d = k * n, this.e = R * e - a * e + a, this.f = z * n - o * n + o, this;
  }
  // Shear matrix
  shear(e, n, a) {
    return this.clone().shearO(e, n, a);
  }
  shearO(e, n = 0, a = 0) {
    const {
      a: o,
      b: h,
      c: _,
      d: v,
      e: k,
      f: R
    } = this;
    return this.a = o + h * e, this.c = _ + v * e, this.e = k + R * e - a * e, this;
  }
  // Skew Matrix
  skew(e, n, a, o) {
    return this.clone().skewO(...arguments);
  }
  skewO(e, n = e, a = 0, o = 0) {
    arguments.length === 3 && (o = a, a = n, n = e), e = Ua(e), n = Ua(n);
    const h = Math.tan(e), _ = Math.tan(n), {
      a: v,
      b: k,
      c: R,
      d: z,
      e: U,
      f: et
    } = this;
    return this.a = v + k * h, this.b = k + v * _, this.c = R + z * h, this.d = z + R * _, this.e = U + et * h - o * h, this.f = et + U * _ - a * _, this;
  }
  // SkewX
  skewX(e, n, a) {
    return this.skew(e, 0, n, a);
  }
  // SkewY
  skewY(e, n, a) {
    return this.skew(0, e, n, a);
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
    if (Rt.isMatrixLike(e))
      return new Rt(e).multiplyO(this);
    const n = Rt.formatTransforms(e), a = this, {
      x: o,
      y: h
    } = new Oe(n.ox, n.oy).transform(a), _ = new Rt().translateO(n.rx, n.ry).lmultiplyO(a).translateO(-o, -h).scaleO(n.scaleX, n.scaleY).skewO(n.skewX, n.skewY).shearO(n.shear).rotateO(n.theta).translateO(o, h);
    if (isFinite(n.px) || isFinite(n.py)) {
      const v = new Oe(o, h).transform(_), k = isFinite(n.px) ? n.px - v.x : 0, R = isFinite(n.py) ? n.py - v.y : 0;
      _.translateO(k, R);
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
function M0() {
  return new Rt(this.node.getCTM());
}
function L0() {
  if (typeof this.isRoot == "function" && !this.isRoot()) {
    const t = this.rect(1, 1), e = t.node.getScreenCTM();
    return t.remove(), new Rt(e);
  }
  return new Rt(this.node.getScreenCTM());
}
ae(Rt, "Matrix");
function vn() {
  if (!vn.nodes) {
    const t = ti().size(2, 0);
    t.node.style.cssText = ["opacity: 0", "position: absolute", "left: -100%", "top: -100%", "overflow: hidden"].join(";"), t.attr("focusable", "false"), t.attr("aria-hidden", "true");
    const e = t.path().node;
    vn.nodes = {
      svg: t,
      path: e
    };
  }
  if (!vn.nodes.svg.node.parentNode) {
    const t = he.document.body || he.document.documentElement;
    vn.nodes.svg.addTo(t);
  }
  return vn.nodes;
}
function Dh(t) {
  return !t.width && !t.height && !t.x && !t.y;
}
function N0(t) {
  return t === he.document || (he.document.documentElement.contains || function(e) {
    for (; e.parentNode; )
      e = e.parentNode;
    return e === he.document;
  }).call(he.document.documentElement, t);
}
class Ze {
  constructor(...e) {
    this.init(...e);
  }
  addOffset() {
    return this.x += he.window.pageXOffset, this.y += he.window.pageYOffset, new Ze(this);
  }
  init(e) {
    const n = [0, 0, 0, 0];
    return e = typeof e == "string" ? e.split(on).map(parseFloat) : Array.isArray(e) ? e : typeof e == "object" ? [e.left != null ? e.left : e.x, e.top != null ? e.top : e.y, e.width, e.height] : arguments.length === 4 ? [].slice.call(arguments) : n, this.x = e[0] || 0, this.y = e[1] || 0, this.width = this.w = e[2] || 0, this.height = this.h = e[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }
  isNulled() {
    return Dh(this);
  }
  // Merge rect box with another, return a new instance
  merge(e) {
    const n = Math.min(this.x, e.x), a = Math.min(this.y, e.y), o = Math.max(this.x + this.width, e.x + e.width) - n, h = Math.max(this.y + this.height, e.y + e.height) - a;
    return new Ze(n, a, o, h);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(e) {
    e instanceof Rt || (e = new Rt(e));
    let n = 1 / 0, a = -1 / 0, o = 1 / 0, h = -1 / 0;
    return [new Oe(this.x, this.y), new Oe(this.x2, this.y), new Oe(this.x, this.y2), new Oe(this.x2, this.y2)].forEach(function(v) {
      v = v.transform(e), n = Math.min(n, v.x), a = Math.max(a, v.x), o = Math.min(o, v.y), h = Math.max(h, v.y);
    }), new Ze(n, o, a - n, h - o);
  }
}
function Vh(t, e, n) {
  let a;
  try {
    if (a = e(t.node), Dh(a) && !N0(t.node))
      throw new Error("Element not in the dom");
  } catch {
    a = n(t);
  }
  return a;
}
function R0() {
  const n = Vh(this, (o) => o.getBBox(), (o) => {
    try {
      const h = o.clone().addTo(vn().svg).show(), _ = h.node.getBBox();
      return h.remove(), _;
    } catch (h) {
      throw new Error(`Getting bbox of element "${o.node.nodeName}" is not possible: ${h.toString()}`);
    }
  });
  return new Ze(n);
}
function F0(t) {
  const a = Vh(this, (h) => h.getBoundingClientRect(), (h) => {
    throw new Error(`Getting rbox of element "${h.node.nodeName}" is not possible`);
  }), o = new Ze(a);
  return t ? o.transform(t.screenCTM().inverseO()) : o.addOffset();
}
function z0(t, e) {
  const n = this.bbox();
  return t > n.x && e > n.y && t < n.x + n.width && e < n.y + n.height;
}
Kt({
  viewbox: {
    viewbox(t, e, n, a) {
      return t == null ? new Ze(this.attr("viewBox")) : this.attr("viewBox", new Ze(t, e, n, a));
    },
    zoom(t, e) {
      let {
        width: n,
        height: a
      } = this.attr(["width", "height"]);
      if ((!n && !a || typeof n == "string" || typeof a == "string") && (n = this.node.clientWidth, a = this.node.clientHeight), !n || !a)
        throw new Error("Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element");
      const o = this.viewbox(), h = n / o.width, _ = a / o.height, v = Math.min(h, _);
      if (t == null)
        return v;
      let k = v / t;
      k === 1 / 0 && (k = Number.MAX_SAFE_INTEGER / 100), e = e || new Oe(n / 2 / h + o.x, a / 2 / _ + o.y);
      const R = new Ze(o).transform(new Rt({
        scale: k,
        origin: e
      }));
      return this.viewbox(R);
    }
  }
});
ae(Ze, "Box");
class Zn extends Array {
  constructor(e = [], ...n) {
    if (super(e, ...n), typeof e == "number") return this;
    this.length = 0, this.push(...e);
  }
}
Jt([Zn], {
  each(t, ...e) {
    return typeof t == "function" ? this.map((n, a, o) => t.call(n, n, a, o)) : this.map((n) => n[t](...e));
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
const D0 = ["toArray", "constructor", "each"];
Zn.extend = function(t) {
  t = t.reduce((e, n) => (D0.includes(n) || n[0] === "_" || (e[n] = function(...a) {
    return this.each(n, ...a);
  }), e), {}), Jt([Zn], t);
};
function Sr(t, e) {
  return new Zn(jo((e || he.document).querySelectorAll(t), function(n) {
    return Si(n);
  }));
}
function V0(t) {
  return Sr(t, this.node);
}
function B0(t) {
  return Si(this.node.querySelector(t));
}
let q0 = 0;
const Bh = {};
function qh(t) {
  let e = t.getEventHolder();
  return e === he.window && (e = Bh), e.events || (e.events = {}), e.events;
}
function Ko(t) {
  return t.getEventTarget();
}
function U0(t) {
  let e = t.getEventHolder();
  e === he.window && (e = Bh), e.events && (e.events = {});
}
function ho(t, e, n, a, o) {
  const h = n.bind(a || t), _ = ti(t), v = qh(_), k = Ko(_);
  e = Array.isArray(e) ? e : e.split(on), n._svgjsListenerId || (n._svgjsListenerId = ++q0), e.forEach(function(R) {
    const z = R.split(".")[0], U = R.split(".")[1] || "*";
    v[z] = v[z] || {}, v[z][U] = v[z][U] || {}, v[z][U][n._svgjsListenerId] = h, k.addEventListener(z, h, o || !1);
  });
}
function fr(t, e, n, a) {
  const o = ti(t), h = qh(o), _ = Ko(o);
  typeof n == "function" && (n = n._svgjsListenerId, !n) || (e = Array.isArray(e) ? e : (e || "").split(on), e.forEach(function(v) {
    const k = v && v.split(".")[0], R = v && v.split(".")[1];
    let z, U;
    if (n)
      h[k] && h[k][R || "*"] && (_.removeEventListener(k, h[k][R || "*"][n], a || !1), delete h[k][R || "*"][n]);
    else if (k && R) {
      if (h[k] && h[k][R]) {
        for (U in h[k][R])
          fr(_, [k, R].join("."), U);
        delete h[k][R];
      }
    } else if (R)
      for (v in h)
        for (z in h[v])
          R === z && fr(_, [v, R].join("."));
    else if (k) {
      if (h[k]) {
        for (z in h[k])
          fr(_, [k, z].join("."));
        delete h[k];
      }
    } else {
      for (v in h)
        fr(_, v);
      U0(o);
    }
  }));
}
function j0(t, e, n, a) {
  const o = Ko(t);
  return e instanceof he.window.Event || (e = new he.window.CustomEvent(e, {
    detail: n,
    cancelable: !0,
    ...a
  })), o.dispatchEvent(e), e;
}
class is extends Wo {
  addEventListener() {
  }
  dispatch(e, n, a) {
    return j0(this, e, n, a);
  }
  dispatchEvent(e) {
    const n = this.getEventHolder().events;
    if (!n) return !0;
    const a = n[e.type];
    for (const o in a)
      for (const h in a[o])
        a[o][h](e);
    return !e.defaultPrevented;
  }
  // Fire given event
  fire(e, n, a) {
    return this.dispatch(e, n, a), this;
  }
  getEventHolder() {
    return this;
  }
  getEventTarget() {
    return this;
  }
  // Unbind event from listener
  off(e, n, a) {
    return fr(this, e, n, a), this;
  }
  // Bind given event to listener
  on(e, n, a, o) {
    return ho(this, e, n, a, o), this;
  }
  removeEventListener() {
  }
}
ae(is, "EventTarget");
function vl() {
}
const Rr = {
  duration: 400,
  ease: ">",
  delay: 0
}, H0 = {
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
class yr extends Array {
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
    return e instanceof Array ? e : e.trim().split(on).map(parseFloat);
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
class Ut {
  // Initialize
  constructor(...e) {
    this.init(...e);
  }
  convert(e) {
    return new Ut(this.value, e);
  }
  // Divide number
  divide(e) {
    return e = new Ut(e), new Ut(this / e, this.unit || e.unit);
  }
  init(e, n) {
    return n = Array.isArray(e) ? e[1] : n, e = Array.isArray(e) ? e[0] : e, this.value = 0, this.unit = n || "", typeof e == "number" ? this.value = isNaN(e) ? 0 : isFinite(e) ? e : e < 0 ? -34e37 : 34e37 : typeof e == "string" ? (n = e.match(zh), n && (this.value = parseFloat(n[1]), n[5] === "%" ? this.value /= 100 : n[5] === "s" && (this.value *= 1e3), this.unit = n[5])) : e instanceof Ut && (this.value = e.valueOf(), this.unit = e.unit), this;
  }
  // Subtract number
  minus(e) {
    return e = new Ut(e), new Ut(this - e, this.unit || e.unit);
  }
  // Add number
  plus(e) {
    return e = new Ut(e), new Ut(this + e, this.unit || e.unit);
  }
  // Multiply number
  times(e) {
    return e = new Ut(e), new Ut(this * e, this.unit || e.unit);
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
const Uh = [];
function W0(t) {
  Uh.push(t);
}
function G0(t, e, n) {
  if (t == null) {
    t = {}, e = this.node.attributes;
    for (const a of e)
      t[a.nodeName] = ml.test(a.nodeValue) ? parseFloat(a.nodeValue) : a.nodeValue;
    return t;
  } else {
    if (t instanceof Array)
      return t.reduce((a, o) => (a[o] = this.attr(o), a), {});
    if (typeof t == "object" && t.constructor === Object)
      for (e in t) this.attr(e, t[e]);
    else if (e === null)
      this.node.removeAttribute(t);
    else {
      if (e == null)
        return e = this.node.getAttribute(t), e == null ? H0[t] : ml.test(e) ? parseFloat(e) : e;
      e = Uh.reduce((a, o) => o(t, a, this), e), typeof e == "number" ? e = new Ut(e) : ge.isColor(e) ? e = new ge(e) : e.constructor === Array && (e = new yr(e)), t === "leading" ? this.leading && this.leading(e) : typeof n == "string" ? this.node.setAttributeNS(n, t, e.toString()) : this.node.setAttribute(t, e.toString()), this.rebuild && (t === "font-size" || t === "x") && this.rebuild();
    }
  }
  return this;
}
class Sn extends is {
  constructor(e, n) {
    super(), this.node = e, this.type = e.nodeName, n && e !== n && this.attr(n);
  }
  // Add given element at a position
  add(e, n) {
    return e = ti(e), e.removeNamespace && this.node instanceof he.window.SVGElement && e.removeNamespace(), n == null ? this.node.appendChild(e.node) : e.node !== this.node.childNodes[n] && this.node.insertBefore(e.node, this.node.childNodes[n]), this;
  }
  // Add element to given container and return self
  addTo(e, n) {
    return ti(e).put(this, n);
  }
  // Returns all child elements
  children() {
    return new Zn(jo(this.node.children, function(e) {
      return Si(e);
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
    let a = this.node.cloneNode(e);
    return n && (a = Fh(a)), new this.constructor(a);
  }
  // Iterates over all children and invokes a given block
  each(e, n) {
    const a = this.children();
    let o, h;
    for (o = 0, h = a.length; o < h; o++)
      e.apply(a[o], [o, a]), n && a[o].each(e, n);
    return this;
  }
  element(e, n) {
    return this.put(new Sn(Kr(e), n));
  }
  // Get first child
  first() {
    return Si(this.node.firstChild);
  }
  // Get a element at the given index
  get(e) {
    return Si(this.node.childNodes[e]);
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
    return this.xml(e, n, Gp);
  }
  // Get / set id
  id(e) {
    return typeof e > "u" && !this.node.id && (this.node.id = Rh(this.type)), this.attr("id", e);
  }
  // Gets index of given element
  index(e) {
    return [].slice.call(this.node.childNodes).indexOf(e.node);
  }
  // Get the last child
  last() {
    return Si(this.node.lastChild);
  }
  // matches the element vs a css selector
  matches(e) {
    const n = this.node, a = n.matches || n.matchesSelector || n.msMatchesSelector || n.mozMatchesSelector || n.webkitMatchesSelector || n.oMatchesSelector || null;
    return a && a.call(n, e);
  }
  // Returns the parent element instance
  parent(e) {
    let n = this;
    if (!n.node.parentNode) return null;
    if (n = Si(n.node.parentNode), !e) return n;
    do
      if (typeof e == "string" ? n.matches(e) : n instanceof e) return n;
    while (n = Si(n.node.parentNode));
    return n;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(e, n) {
    return e = ti(e), this.add(e, n), e;
  }
  // Add element to given container and return container
  putIn(e, n) {
    return ti(e).add(this, n);
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
    return e = ti(e), this.node.parentNode && this.node.parentNode.replaceChild(e.node, this.node), e;
  }
  round(e = 2, n = null) {
    const a = 10 ** e, o = this.attr(n);
    for (const h in o)
      typeof o[h] == "number" && (o[h] = Math.round(o[h] * a) / a);
    return this.attr(o), this;
  }
  // Import / Export raw svg
  svg(e, n) {
    return this.xml(e, n, Ho);
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
    const a = n.index(this);
    return n.put(e, a).put(this);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    return this.each(function() {
      this.writeDataToDom();
    }), this;
  }
  // Import / Export raw svg
  xml(e, n, a) {
    if (typeof e == "boolean" && (a = n, n = e, e = null), e == null || typeof e == "function") {
      n = n ?? !0, this.writeDataToDom();
      let v = this;
      if (e != null) {
        if (v = Si(v.node.cloneNode(!0)), n) {
          const k = e(v);
          if (v = k || v, k === !1) return "";
        }
        v.each(function() {
          const k = e(this), R = k || this;
          k === !1 ? this.remove() : k && this !== R && this.replace(R);
        }, !0);
      }
      return n ? v.node.outerHTML : v.node.innerHTML;
    }
    n = n ?? !1;
    const o = Kr("wrapper", a), h = he.document.createDocumentFragment();
    o.innerHTML = e;
    for (let v = o.children.length; v--; )
      h.appendChild(o.firstElementChild);
    const _ = this.parent();
    return n ? this.replace(h) && _ : this.add(h);
  }
}
Jt(Sn, {
  attr: G0,
  find: V0,
  findOne: B0
});
ae(Sn, "Dom");
let Ki = class extends Sn {
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
    return this.x(new Ut(e).plus(this.x()));
  }
  // Relative move over y axis
  dy(e = 0) {
    return this.y(new Ut(e).plus(this.y()));
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
    n || (e = ti(e));
    const a = new Zn();
    let o = this;
    for (; (o = o.parent()) && o.node !== he.document && o.nodeName !== "#document-fragment" && (a.push(o), !(!n && o.node === e.node || n && o.matches(e))); )
      if (o.node === this.root().node)
        return null;
    return a;
  }
  // Get referenced element form attribute value
  reference(e) {
    if (e = this.attr(e), !e) return null;
    const n = (e + "").match(h0);
    return n ? ti(n[1]) : null;
  }
  // Get parent document
  root() {
    const e = this.parent(Kp(Go));
    return e && e.root();
  }
  // set given data to the elements data property
  setData(e) {
    return this.dom = e, this;
  }
  // Set element size to given width and height
  size(e, n) {
    const a = wr(this, e, n);
    return this.width(new Ut(a.width)).height(new Ut(a.height));
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
Jt(Ki, {
  bbox: R0,
  rbox: F0,
  inside: z0,
  point: O0,
  ctm: M0,
  screenCTM: L0
});
ae(Ki, "Element");
const Lr = {
  stroke: ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"],
  fill: ["color", "opacity", "rule"],
  prefix: function(t, e) {
    return e === "color" ? t : t + "-" + e;
  }
};
["fill", "stroke"].forEach(function(t) {
  const e = {};
  let n;
  e[t] = function(a) {
    if (typeof a > "u")
      return this.attr(t);
    if (typeof a == "string" || a instanceof ge || ge.isRgb(a) || a instanceof Ki)
      this.attr(t, a);
    else
      for (n = Lr[t].length - 1; n >= 0; n--)
        a[Lr[t][n]] != null && this.attr(Lr.prefix(t, Lr[t][n]), a[Lr[t][n]]);
    return this;
  }, Kt(["Element", "Runner"], e);
});
Kt(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(t, e, n, a, o, h) {
    return t == null ? new Rt(this) : this.attr("transform", new Rt(t, e, n, a, o, h));
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
  skew: function(t, e, n, a) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      skew: t,
      ox: e,
      oy: n
    }, !0) : this.transform({
      skew: [t, e],
      ox: n,
      oy: a
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
  scale: function(t, e, n, a) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      scale: t,
      ox: e,
      oy: n
    }, !0) : this.transform({
      scale: [t, e],
      ox: n,
      oy: a
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
Kt("radius", {
  // Add x and y radius
  radius: function(t, e = t) {
    return (this._element || this).type === "radialGradient" ? this.attr("r", new Ut(t)) : this.rx(t).ry(e);
  }
});
Kt("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(t) {
    return new Oe(this.node.getPointAtLength(t));
  }
});
Kt(["Element", "Runner"], {
  // Set font
  font: function(t, e) {
    if (typeof t == "object") {
      for (e in t) this.font(e, t[e]);
      return this;
    }
    return t === "leading" ? this.leading(e) : t === "anchor" ? this.attr("text-anchor", e) : t === "size" || t === "family" || t === "weight" || t === "stretch" || t === "variant" || t === "style" ? this.attr("font-" + t, e) : this.attr(t, e);
  }
});
const Z0 = ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchleave", "touchend", "touchcancel"].reduce(function(t, e) {
  const n = function(a) {
    return a === null ? this.off(e) : this.on(e, a), this;
  };
  return t[e] = n, t;
}, {});
Kt("Element", Z0);
function K0() {
  return this.attr("transform", null);
}
function Y0() {
  return (this.attr("transform") || "").split(f0).slice(0, -1).map(function(e) {
    const n = e.trim().split("(");
    return [n[0], n[1].split(on).map(function(a) {
      return parseFloat(a);
    })];
  }).reverse().reduce(function(e, n) {
    return n[0] === "matrix" ? e.lmultiply(Rt.fromArray(n[1])) : e[n[0]].apply(e, n[1]);
  }, new Rt());
}
function $0(t, e) {
  if (this === t) return this;
  const n = this.screenCTM(), a = t.screenCTM().inverse();
  return this.addTo(t, e).untransform().transform(a.multiply(n)), this;
}
function X0(t) {
  return this.toParent(this.root(), t);
}
function Q0(t, e) {
  if (t == null || typeof t == "string") {
    const o = new Rt(this).decompose();
    return t == null ? o : o[t];
  }
  Rt.isMatrixLike(t) || (t = {
    ...t,
    origin: lo(t, this)
  });
  const n = e === !0 ? this : e || !1, a = new Rt(n).transform(t);
  return this.attr("transform", a);
}
Kt("Element", {
  untransform: K0,
  matrixify: Y0,
  toParent: $0,
  toRoot: X0,
  transform: Q0
});
class oi extends Ki {
  flatten(e = this, n) {
    return this.each(function() {
      if (this instanceof oi)
        return this.flatten().ungroup();
    }), this;
  }
  ungroup(e = this.parent(), n = e.index(this)) {
    return n = n === -1 ? e.children().length : n, this.each(function(a, o) {
      return o[o.length - a - 1].toParent(e, n);
    }), this.remove();
  }
}
ae(oi, "Container");
class Yo extends oi {
  constructor(e, n = e) {
    super(xe("defs", e), n);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
}
ae(Yo, "Defs");
class _i extends Ki {
}
ae(_i, "Shape");
function $o(t) {
  return this.attr("rx", t);
}
function Xo(t) {
  return this.attr("ry", t);
}
function jh(t) {
  return t == null ? this.cx() - this.rx() : this.cx(t + this.rx());
}
function Hh(t) {
  return t == null ? this.cy() - this.ry() : this.cy(t + this.ry());
}
function Wh(t) {
  return this.attr("cx", t);
}
function Gh(t) {
  return this.attr("cy", t);
}
function Zh(t) {
  return t == null ? this.rx() * 2 : this.rx(new Ut(t).divide(2));
}
function Kh(t) {
  return t == null ? this.ry() * 2 : this.ry(new Ut(t).divide(2));
}
var J0 = {
  __proto__: null,
  rx: $o,
  ry: Xo,
  x: jh,
  y: Hh,
  cx: Wh,
  cy: Gh,
  width: Zh,
  height: Kh
};
class ea extends _i {
  constructor(e, n = e) {
    super(xe("ellipse", e), n);
  }
  size(e, n) {
    const a = wr(this, e, n);
    return this.rx(new Ut(a.width).divide(2)).ry(new Ut(a.height).divide(2));
  }
}
Jt(ea, J0);
Kt("Container", {
  // Create an ellipse
  ellipse: be(function(t = 0, e = t) {
    return this.put(new ea()).size(t, e).move(0, 0);
  })
});
ae(ea, "Ellipse");
class Yh extends Sn {
  constructor(e = he.document.createDocumentFragment()) {
    super(e);
  }
  // Import / Export raw xml
  xml(e, n, a) {
    if (typeof e == "boolean" && (a = n, n = e, e = null), e == null || typeof e == "function") {
      const o = new Sn(Kr("wrapper", a));
      return o.add(this.node.cloneNode(!0)), o.xml(!1, a);
    }
    return super.xml(e, !1, a);
  }
}
ae(Yh, "Fragment");
function $h(t, e) {
  return (this._element || this).type === "radialGradient" ? this.attr({
    fx: new Ut(t),
    fy: new Ut(e)
  }) : this.attr({
    x1: new Ut(t),
    y1: new Ut(e)
  });
}
function Xh(t, e) {
  return (this._element || this).type === "radialGradient" ? this.attr({
    cx: new Ut(t),
    cy: new Ut(e)
  }) : this.attr({
    x2: new Ut(t),
    y2: new Ut(e)
  });
}
var tg = {
  __proto__: null,
  from: $h,
  to: Xh
};
class ns extends oi {
  constructor(e, n) {
    super(xe(e + "Gradient", typeof e == "string" ? null : e), n);
  }
  // custom attr to handle transform
  attr(e, n, a) {
    return e === "transform" && (e = "gradientTransform"), super.attr(e, n, a);
  }
  bbox() {
    return new Ze();
  }
  targets() {
    return Sr("svg [fill*=" + this.id() + "]");
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
Jt(ns, tg);
Kt({
  Container: {
    // Create gradient element in defs
    gradient(...t) {
      return this.defs().gradient(...t);
    }
  },
  // define gradient
  Defs: {
    gradient: be(function(t, e) {
      return this.put(new ns(t)).update(e);
    })
  }
});
ae(ns, "Gradient");
class Yr extends oi {
  // Initialize node
  constructor(e, n = e) {
    super(xe("pattern", e), n);
  }
  // custom attr to handle transform
  attr(e, n, a) {
    return e === "transform" && (e = "patternTransform"), super.attr(e, n, a);
  }
  bbox() {
    return new Ze();
  }
  targets() {
    return Sr("svg [fill*=" + this.id() + "]");
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
Kt({
  Container: {
    // Create pattern element in defs
    pattern(...t) {
      return this.defs().pattern(...t);
    }
  },
  Defs: {
    pattern: be(function(t, e, n) {
      return this.put(new Yr()).update(n).attr({
        x: 0,
        y: 0,
        width: t,
        height: e,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
ae(Yr, "Pattern");
class ia extends _i {
  constructor(e, n = e) {
    super(xe("image", e), n);
  }
  // (re)load image
  load(e, n) {
    if (!e) return this;
    const a = new he.window.Image();
    return ho(a, "load", function(o) {
      const h = this.parent(Yr);
      this.width() === 0 && this.height() === 0 && this.size(a.width, a.height), h instanceof Yr && h.width() === 0 && h.height() === 0 && h.size(this.width(), this.height()), typeof n == "function" && n.call(this, o);
    }, this), ho(a, "load error", function() {
      fr(a);
    }), this.attr("href", a.src = e, es);
  }
}
W0(function(t, e, n) {
  return (t === "fill" || t === "stroke") && d0.test(e) && (e = n.root().defs().image(e)), e instanceof ia && (e = n.root().defs().pattern(0, 0, (a) => {
    a.add(e);
  })), e;
});
Kt({
  Container: {
    // create image element, load image and set its size
    image: be(function(t, e) {
      return this.put(new ia()).size(0, 0).load(t, e);
    })
  }
});
ae(ia, "Image");
class Cn extends yr {
  // Get bounding box of points
  bbox() {
    let e = -1 / 0, n = -1 / 0, a = 1 / 0, o = 1 / 0;
    return this.forEach(function(h) {
      e = Math.max(h[0], e), n = Math.max(h[1], n), a = Math.min(h[0], a), o = Math.min(h[1], o);
    }), new Ze(a, o, e - a, n - o);
  }
  // Move point string
  move(e, n) {
    const a = this.bbox();
    if (e -= a.x, n -= a.y, !isNaN(e) && !isNaN(n))
      for (let o = this.length - 1; o >= 0; o--)
        this[o] = [this[o][0] + e, this[o][1] + n];
    return this;
  }
  // Parse point string and flat array
  parse(e = [0, 0]) {
    const n = [];
    e instanceof Array ? e = Array.prototype.concat.apply([], e) : e = e.trim().split(on).map(parseFloat), e.length % 2 !== 0 && e.pop();
    for (let a = 0, o = e.length; a < o; a = a + 2)
      n.push([e[a], e[a + 1]]);
    return n;
  }
  // Resize poly string
  size(e, n) {
    let a;
    const o = this.bbox();
    for (a = this.length - 1; a >= 0; a--)
      o.width && (this[a][0] = (this[a][0] - o.x) * e / o.width + o.x), o.height && (this[a][1] = (this[a][1] - o.y) * n / o.height + o.y);
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
    for (let n = 0, a = this.length; n < a; n++)
      e.push(this[n].join(","));
    return e.join(" ");
  }
  transform(e) {
    return this.clone().transformO(e);
  }
  // transform points with matrix (similar to Point.transform)
  transformO(e) {
    Rt.isMatrixLike(e) || (e = new Rt(e));
    for (let n = this.length; n--; ) {
      const [a, o] = this[n];
      this[n][0] = e.a * a + e.c * o + e.e, this[n][1] = e.b * a + e.d * o + e.f;
    }
    return this;
  }
}
const eg = Cn;
function ig(t) {
  return t == null ? this.bbox().x : this.move(t, this.bbox().y);
}
function ng(t) {
  return t == null ? this.bbox().y : this.move(this.bbox().x, t);
}
function rg(t) {
  const e = this.bbox();
  return t == null ? e.width : this.size(t, e.height);
}
function sg(t) {
  const e = this.bbox();
  return t == null ? e.height : this.size(e.width, t);
}
var Qo = {
  __proto__: null,
  MorphArray: eg,
  x: ig,
  y: ng,
  width: rg,
  height: sg
};
class $r extends _i {
  // Initialize node
  constructor(e, n = e) {
    super(xe("line", e), n);
  }
  // Get array
  array() {
    return new Cn([[this.attr("x1"), this.attr("y1")], [this.attr("x2"), this.attr("y2")]]);
  }
  // Move by left top corner
  move(e, n) {
    return this.attr(this.array().move(e, n).toLine());
  }
  // Overwrite native plot() method
  plot(e, n, a, o) {
    return e == null ? this.array() : (typeof n < "u" ? e = {
      x1: e,
      y1: n,
      x2: a,
      y2: o
    } : e = new Cn(e).toLine(), this.attr(e));
  }
  // Set element size to given width and height
  size(e, n) {
    const a = wr(this, e, n);
    return this.attr(this.array().size(a.width, a.height).toLine());
  }
}
Jt($r, Qo);
Kt({
  Container: {
    // Create a line element
    line: be(function(...t) {
      return $r.prototype.plot.apply(this.put(new $r()), t[0] != null ? t : [0, 0, 0, 0]);
    })
  }
});
ae($r, "Line");
class Ds extends oi {
  // Initialize node
  constructor(e, n = e) {
    super(xe("marker", e), n);
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
Kt({
  Container: {
    marker(...t) {
      return this.defs().marker(...t);
    }
  },
  Defs: {
    // Create marker
    marker: be(function(t, e, n) {
      return this.put(new Ds()).size(t, e).ref(t / 2, e / 2).viewbox(0, 0, t, e).attr("orient", "auto").update(n);
    })
  },
  marker: {
    // Create and attach markers
    marker(t, e, n, a) {
      let o = ["marker"];
      return t !== "all" && o.push(t), o = o.join("-"), t = arguments[1] instanceof Ds ? arguments[1] : this.defs().marker(e, n, a), this.attr(o, t);
    }
  }
});
ae(Ds, "Marker");
function cr(t, e) {
  return function(n) {
    return n == null ? this[t] : (this[t] = n, e && e.call(this), this);
  };
}
const ag = {
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
  bezier: function(t, e, n, a) {
    return function(o) {
      return o < 0 ? t > 0 ? e / t * o : n > 0 ? a / n * o : 0 : o > 1 ? n < 1 ? (1 - a) / (1 - n) * o + (a - n) / (1 - n) : t < 1 ? (1 - e) / (1 - t) * o + (e - t) / (1 - t) : 1 : 3 * o * (1 - o) ** 2 * e + 3 * o ** 2 * (1 - o) * a + o ** 3;
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function(t, e = "end") {
    e = e.split("-").reverse()[0];
    let n = t;
    return e === "none" ? --n : e === "both" && ++n, (a, o = !1) => {
      let h = Math.floor(a * t);
      const _ = a * h % 1 === 0;
      return (e === "start" || e === "both") && ++h, o && _ && --h, a >= 0 && h < 0 && (h = 0), a <= 1 && h > n && (h = n), h / n;
    };
  }
};
class Jo {
  done() {
    return !1;
  }
}
class fo extends Jo {
  constructor(e = Rr.ease) {
    super(), this.ease = ag[e] || e;
  }
  step(e, n, a) {
    return typeof e != "number" ? a < 1 ? e : n : e + (n - e) * this.ease(a);
  }
}
class Vs extends Jo {
  constructor(e) {
    super(), this.stepper = e;
  }
  done(e) {
    return e.done;
  }
  step(e, n, a, o) {
    return this.stepper(e, n, a, o);
  }
}
function yl() {
  const t = (this._duration || 500) / 1e3, e = this._overshoot || 0, n = 1e-10, a = Math.PI, o = Math.log(e / 100 + n), h = -o / Math.sqrt(a * a + o * o), _ = 3.9 / (h * t);
  this.d = 2 * h * _, this.k = _ * _;
}
class og extends Vs {
  constructor(e = 500, n = 0) {
    super(), this.duration(e).overshoot(n);
  }
  step(e, n, a, o) {
    if (typeof e == "string") return e;
    if (o.done = a === 1 / 0, a === 1 / 0) return n;
    if (a === 0) return e;
    a > 100 && (a = 16), a /= 1e3;
    const h = o.velocity || 0, _ = -this.d * h - this.k * (e - n), v = e + h * a + _ * a * a / 2;
    return o.velocity = h + _ * a, o.done = Math.abs(n - v) + Math.abs(h) < 2e-3, o.done ? n : v;
  }
}
Jt(og, {
  duration: cr("_duration", yl),
  overshoot: cr("_overshoot", yl)
});
class ug extends Vs {
  constructor(e = 0.1, n = 0.01, a = 0, o = 1e3) {
    super(), this.p(e).i(n).d(a).windup(o);
  }
  step(e, n, a, o) {
    if (typeof e == "string") return e;
    if (o.done = a === 1 / 0, a === 1 / 0) return n;
    if (a === 0) return e;
    const h = n - e;
    let _ = (o.integral || 0) + h * a;
    const v = (h - (o.error || 0)) / a, k = this._windup;
    return k !== !1 && (_ = Math.max(-k, Math.min(_, k))), o.error = h, o.integral = _, o.done = Math.abs(h) < 1e-3, o.done ? n : e + (this.P * h + this.I * _ + this.D * v);
  }
}
Jt(ug, {
  windup: cr("_windup"),
  p: cr("P"),
  i: cr("I"),
  d: cr("D")
});
const lg = {
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
}, co = {
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
}, Wa = "mlhvqtcsaz".split("");
for (let t = 0, e = Wa.length; t < e; ++t)
  co[Wa[t]] = /* @__PURE__ */ function(n) {
    return function(a, o, h) {
      if (n === "H") a[0] = a[0] + o.x;
      else if (n === "V") a[0] = a[0] + o.y;
      else if (n === "A")
        a[5] = a[5] + o.x, a[6] = a[6] + o.y;
      else
        for (let _ = 0, v = a.length; _ < v; ++_)
          a[_] = a[_] + (_ % 2 ? o.y : o.x);
      return co[n](a, o, h);
    };
  }(Wa[t].toUpperCase());
function hg(t) {
  const e = t.segment[0];
  return co[e](t.segment.slice(1), t.p, t.p0);
}
function po(t) {
  return t.segment.length && t.segment.length - 1 === lg[t.segment[0].toUpperCase()];
}
function fg(t, e) {
  t.inNumber && Bn(t, !1);
  const n = Zo.test(e);
  if (n)
    t.segment = [e];
  else {
    const a = t.lastCommand, o = a.toLowerCase(), h = a === o;
    t.segment = [o === "m" ? h ? "l" : "L" : a];
  }
  return t.inSegment = !0, t.lastCommand = t.segment[0], n;
}
function Bn(t, e) {
  if (!t.inNumber) throw new Error("Parser Error");
  t.number && t.segment.push(parseFloat(t.number)), t.inNumber = e, t.number = "", t.pointSeen = !1, t.hasExponent = !1, po(t) && go(t);
}
function go(t) {
  t.inSegment = !1, t.absolute && (t.segment = hg(t)), t.segments.push(t.segment);
}
function cg(t) {
  if (!t.segment.length) return !1;
  const e = t.segment[0].toUpperCase() === "A", n = t.segment.length;
  return e && (n === 4 || n === 5);
}
function dg(t) {
  return t.lastToken.toUpperCase() === "E";
}
function pg(t, e = !0) {
  let n = 0, a = "";
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
    p0: new Oe(),
    p: new Oe()
  };
  for (; o.lastToken = a, a = t.charAt(n++); )
    if (!(!o.inSegment && fg(o, a))) {
      if (a === ".") {
        if (o.pointSeen || o.hasExponent) {
          Bn(o, !1), --n;
          continue;
        }
        o.inNumber = !0, o.pointSeen = !0, o.number += a;
        continue;
      }
      if (!isNaN(parseInt(a))) {
        if (o.number === "0" || cg(o)) {
          o.inNumber = !0, o.number = a, Bn(o, !0);
          continue;
        }
        o.inNumber = !0, o.number += a;
        continue;
      }
      if (a === " " || a === ",") {
        o.inNumber && Bn(o, !1);
        continue;
      }
      if (a === "-") {
        if (o.inNumber && !dg(o)) {
          Bn(o, !1), --n;
          continue;
        }
        o.number += a, o.inNumber = !0;
        continue;
      }
      if (a.toUpperCase() === "E") {
        o.number += a, o.hasExponent = !0;
        continue;
      }
      if (Zo.test(a)) {
        if (o.inNumber)
          Bn(o, !1);
        else if (po(o))
          go(o);
        else
          throw new Error("parser Error");
        --n;
      }
    }
  return o.inNumber && Bn(o, !1), o.inSegment && po(o) && go(o), o.segments;
}
function gg(t) {
  let e = "";
  for (let n = 0, a = t.length; n < a; n++)
    e += t[n][0], t[n][1] != null && (e += t[n][1], t[n][2] != null && (e += " ", e += t[n][2], t[n][3] != null && (e += " ", e += t[n][3], e += " ", e += t[n][4], t[n][5] != null && (e += " ", e += t[n][5], e += " ", e += t[n][6], t[n][7] != null && (e += " ", e += t[n][7])))));
  return e + " ";
}
class Kn extends yr {
  // Get bounding box of path
  bbox() {
    return vn().path.setAttribute("d", this.toString()), new Ze(vn.nodes.path.getBBox());
  }
  // Move path string
  move(e, n) {
    const a = this.bbox();
    if (e -= a.x, n -= a.y, !isNaN(e) && !isNaN(n))
      for (let o, h = this.length - 1; h >= 0; h--)
        o = this[h][0], o === "M" || o === "L" || o === "T" ? (this[h][1] += e, this[h][2] += n) : o === "H" ? this[h][1] += e : o === "V" ? this[h][1] += n : o === "C" || o === "S" || o === "Q" ? (this[h][1] += e, this[h][2] += n, this[h][3] += e, this[h][4] += n, o === "C" && (this[h][5] += e, this[h][6] += n)) : o === "A" && (this[h][6] += e, this[h][7] += n);
    return this;
  }
  // Absolutize and parse path to array
  parse(e = "M0 0") {
    return Array.isArray(e) && (e = Array.prototype.concat.apply([], e).toString()), pg(e);
  }
  // Resize path string
  size(e, n) {
    const a = this.bbox();
    let o, h;
    for (a.width = a.width === 0 ? 1 : a.width, a.height = a.height === 0 ? 1 : a.height, o = this.length - 1; o >= 0; o--)
      h = this[o][0], h === "M" || h === "L" || h === "T" ? (this[o][1] = (this[o][1] - a.x) * e / a.width + a.x, this[o][2] = (this[o][2] - a.y) * n / a.height + a.y) : h === "H" ? this[o][1] = (this[o][1] - a.x) * e / a.width + a.x : h === "V" ? this[o][1] = (this[o][1] - a.y) * n / a.height + a.y : h === "C" || h === "S" || h === "Q" ? (this[o][1] = (this[o][1] - a.x) * e / a.width + a.x, this[o][2] = (this[o][2] - a.y) * n / a.height + a.y, this[o][3] = (this[o][3] - a.x) * e / a.width + a.x, this[o][4] = (this[o][4] - a.y) * n / a.height + a.y, h === "C" && (this[o][5] = (this[o][5] - a.x) * e / a.width + a.x, this[o][6] = (this[o][6] - a.y) * n / a.height + a.y)) : h === "A" && (this[o][1] = this[o][1] * e / a.width, this[o][2] = this[o][2] * n / a.height, this[o][6] = (this[o][6] - a.x) * e / a.width + a.x, this[o][7] = (this[o][7] - a.y) * n / a.height + a.y);
    return this;
  }
  // Convert array to string
  toString() {
    return gg(this);
  }
}
const Qh = (t) => {
  const e = typeof t;
  return e === "number" ? Ut : e === "string" ? ge.isColor(t) ? ge : on.test(t) ? Zo.test(t) ? Kn : yr : zh.test(t) ? Ut : _o : tu.indexOf(t.constructor) > -1 ? t.constructor : Array.isArray(t) ? yr : e === "object" ? Xr : _o;
};
class qn {
  constructor(e) {
    this._stepper = e || new fo("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
  }
  at(e) {
    return this._morphObj.morph(this._from, this._to, e, this._stepper, this._context);
  }
  done() {
    return this._context.map(this._stepper.done).reduce(function(n, a) {
      return n && a;
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
    this._type || this.type(Qh(e));
    let n = new this._type(e);
    return this._type === ge && (n = this._to ? n[this._to[4]]() : this._from ? n[this._from[4]]() : n), this._type === Xr && (n = this._to ? n.align(this._to) : this._from ? n.align(this._from) : n), n = n.toConsumable(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(n.length)).map(Object).map(function(a) {
      return a.done = !0, a;
    }), n;
  }
}
class _o {
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
class rs {
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
    }), Object.assign(this, rs.defaults, e), this;
  }
  toArray() {
    const e = this;
    return [e.scaleX, e.scaleY, e.shear, e.rotate, e.translateX, e.translateY, e.originX, e.originY];
  }
}
rs.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
const _g = (t, e) => t[0] < e[0] ? -1 : t[0] > e[0] ? 1 : 0;
class Xr {
  constructor(...e) {
    this.init(...e);
  }
  align(e) {
    const n = this.values;
    for (let a = 0, o = n.length; a < o; ++a) {
      if (n[a + 1] === e[a + 1]) {
        if (n[a + 1] === ge && e[a + 7] !== n[a + 7]) {
          const v = e[a + 7], k = new ge(this.values.splice(a + 3, 5))[v]().toArray();
          this.values.splice(a + 3, 0, ...k);
        }
        a += n[a + 2] + 2;
        continue;
      }
      if (!e[a + 1])
        return this;
      const h = new e[a + 1]().toArray(), _ = n[a + 2] + 3;
      n.splice(a, _, e[a], e[a + 1], e[a + 2], ...h), a += n[a + 2] + 2;
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
    for (const a in e) {
      const o = Qh(e[a]), h = new o(e[a]).toArray();
      n.push([a, o, h.length, ...h]);
    }
    return n.sort(_g), this.values = n.reduce((a, o) => a.concat(o), []), this;
  }
  toArray() {
    return this.values;
  }
  valueOf() {
    const e = {}, n = this.values;
    for (; n.length; ) {
      const a = n.shift(), o = n.shift(), h = n.shift(), _ = n.splice(0, h);
      e[a] = new o(_);
    }
    return e;
  }
}
const tu = [_o, rs, Xr];
function mg(t = []) {
  tu.push(...[].concat(t));
}
function vg() {
  Jt(tu, {
    to(t) {
      return new qn().type(this.constructor).from(this.toArray()).to(t);
    },
    fromArray(t) {
      return this.init(t), this;
    },
    toConsumable() {
      return this.toArray();
    },
    morph(t, e, n, a, o) {
      const h = function(_, v) {
        return a.step(_, e[v], n, o[v], o);
      };
      return this.fromArray(t.map(h));
    }
  });
}
class Cr extends _i {
  // Initialize node
  constructor(e, n = e) {
    super(xe("path", e), n);
  }
  // Get array
  array() {
    return this._array || (this._array = new Kn(this.attr("d")));
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
    return e == null ? this.array() : this.clear().attr("d", typeof e == "string" ? e : this._array = new Kn(e));
  }
  // Set element size to given width and height
  size(e, n) {
    const a = wr(this, e, n);
    return this.attr("d", this.array().size(a.width, a.height));
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
Cr.prototype.MorphArray = Kn;
Kt({
  Container: {
    // Create a wrapped path element
    path: be(function(t) {
      return this.put(new Cr()).plot(t || new Kn());
    })
  }
});
ae(Cr, "Path");
function yg() {
  return this._array || (this._array = new Cn(this.attr("points")));
}
function bg() {
  return delete this._array, this;
}
function xg(t, e) {
  return this.attr("points", this.array().move(t, e));
}
function wg(t) {
  return t == null ? this.array() : this.clear().attr("points", typeof t == "string" ? t : this._array = new Cn(t));
}
function Sg(t, e) {
  const n = wr(this, t, e);
  return this.attr("points", this.array().size(n.width, n.height));
}
var Jh = {
  __proto__: null,
  array: yg,
  clear: bg,
  move: xg,
  plot: wg,
  size: Sg
};
class ss extends _i {
  // Initialize node
  constructor(e, n = e) {
    super(xe("polygon", e), n);
  }
}
Kt({
  Container: {
    // Create a wrapped polygon element
    polygon: be(function(t) {
      return this.put(new ss()).plot(t || new Cn());
    })
  }
});
Jt(ss, Qo);
Jt(ss, Jh);
ae(ss, "Polygon");
class as extends _i {
  // Initialize node
  constructor(e, n = e) {
    super(xe("polyline", e), n);
  }
}
Kt({
  Container: {
    // Create a wrapped polygon element
    polyline: be(function(t) {
      return this.put(new as()).plot(t || new Cn());
    })
  }
});
Jt(as, Qo);
Jt(as, Jh);
ae(as, "Polyline");
class na extends _i {
  // Initialize node
  constructor(e, n = e) {
    super(xe("rect", e), n);
  }
}
Jt(na, {
  rx: $o,
  ry: Xo
});
Kt({
  Container: {
    // Create a rect element
    rect: be(function(t, e) {
      return this.put(new na()).size(t, e);
    })
  }
});
ae(na, "Rect");
class Ga {
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
const ce = {
  nextDraw: null,
  frames: new Ga(),
  timeouts: new Ga(),
  immediates: new Ga(),
  timer: () => he.window.performance || he.window.Date,
  transforms: [],
  frame(t) {
    const e = ce.frames.push({
      run: t
    });
    return ce.nextDraw === null && (ce.nextDraw = he.window.requestAnimationFrame(ce._draw)), e;
  },
  timeout(t, e) {
    e = e || 0;
    const n = ce.timer().now() + e, a = ce.timeouts.push({
      run: t,
      time: n
    });
    return ce.nextDraw === null && (ce.nextDraw = he.window.requestAnimationFrame(ce._draw)), a;
  },
  immediate(t) {
    const e = ce.immediates.push(t);
    return ce.nextDraw === null && (ce.nextDraw = he.window.requestAnimationFrame(ce._draw)), e;
  },
  cancelFrame(t) {
    t != null && ce.frames.remove(t);
  },
  clearTimeout(t) {
    t != null && ce.timeouts.remove(t);
  },
  cancelImmediate(t) {
    t != null && ce.immediates.remove(t);
  },
  _draw(t) {
    let e = null;
    const n = ce.timeouts.last();
    for (; (e = ce.timeouts.shift()) && (t >= e.time ? e.run() : ce.timeouts.push(e), e !== n); )
      ;
    let a = null;
    const o = ce.frames.last();
    for (; a !== o && (a = ce.frames.shift()); )
      a.run(t);
    let h = null;
    for (; h = ce.immediates.shift(); )
      h();
    ce.nextDraw = ce.timeouts.first() || ce.frames.first() ? he.window.requestAnimationFrame(ce._draw) : null;
  }
}, Cg = function(t) {
  const e = t.start, n = t.runner.duration(), a = e + n;
  return {
    start: e,
    duration: n,
    end: a,
    runner: t.runner
  };
}, Ig = function() {
  const t = he.window;
  return (t.performance || t.Date).now();
};
class tf extends is {
  // Construct a new timeline on the given element
  constructor(e = Ig) {
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
    const a = Math.abs(n);
    return this.speed(e ? -a : a);
  }
  // schedules a runner on the timeline
  schedule(e, n, a) {
    if (e == null)
      return this._runners.map(Cg);
    let o = 0;
    const h = this.getEndTime();
    if (n = n || 0, a == null || a === "last" || a === "after")
      o = h;
    else if (a === "absolute" || a === "start")
      o = n, n = 0;
    else if (a === "now")
      o = this._time;
    else if (a === "relative") {
      const k = this.getRunnerInfoById(e.id);
      k && (o = k.start + n, n = 0);
    } else if (a === "with-last") {
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
    return this._lastRunnerId = e.id, this._runners.push(v), this._runners.sort((k, R) => k.start - R.start), this._runnerIds = this._runners.map((k) => k.runner.id), this.updateTime()._continue(), this;
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
    return ce.cancelFrame(this._nextFrame), this._nextFrame = null, e ? this._stepImmediate() : this._paused ? this : (this._nextFrame = ce.frame(this._step), this);
  }
  _stepFn(e = !1) {
    const n = this._timeSource();
    let a = n - this._lastSourceTime;
    e && (a = 0);
    const o = this._speed * a + (this._time - this._lastStepTime);
    this._lastSourceTime = n, e || (this._time += o, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);
    for (let _ = this._runners.length; _--; ) {
      const v = this._runners[_], k = v.runner;
      this._time - v.start <= 0 && k.reset();
    }
    let h = !1;
    for (let _ = 0, v = this._runners.length; _ < v; _++) {
      const k = this._runners[_], R = k.runner;
      let z = o;
      const U = this._time - k.start;
      if (U <= 0) {
        h = !0;
        continue;
      } else U < z && (z = U);
      if (!R.active()) continue;
      R.step(z).done ? k.persist !== !0 && R.duration() - R.time() + this._time + k.persist < this._time && (R.unschedule(), --_, --v) : h = !0;
    }
    return h && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished")), this;
  }
}
Kt({
  Element: {
    timeline: function(t) {
      return t == null ? (this._timeline = this._timeline || new tf(), this._timeline) : (this._timeline = t, this);
    }
  }
});
class gi extends is {
  constructor(e) {
    super(), this.id = gi.id++, e = e ?? Rr.duration, e = typeof e == "function" ? new Vs(e) : e, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = typeof e == "number" && e, this._isDeclarative = e instanceof Vs, this._stepper = this._isDeclarative ? e : new fo(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new Rt(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = this._isDeclarative ? !0 : null;
  }
  static sanitise(e, n, a) {
    let o = 1, h = !1, _ = 0;
    return e = e || Rr.duration, n = n || Rr.delay, a = a || "last", typeof e == "object" && !(e instanceof Jo) && (n = e.delay || n, a = e.when || a, h = e.swing || h, o = e.times || o, _ = e.wait || _, e = e.duration || Rr.duration), {
      duration: e,
      delay: n,
      swing: h,
      times: o,
      wait: _,
      when: a
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
  animate(e, n, a) {
    const o = gi.sanitise(e, n, a), h = new gi(o.duration);
    return this._timeline && h.timeline(this._timeline), this._element && h.element(this._element), h.loop(o).schedule(o.delay, o.when);
  }
  clearTransform() {
    return this.transforms = new Rt(), this;
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
    return this._stepper = new fo(e), this;
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
  loop(e, n, a) {
    return typeof e == "object" && (n = e.swing, a = e.wait, e = e.times), this._times = e || 1 / 0, this._swing = n || !1, this._wait = a || 0, this._times === !0 && (this._times = 1 / 0), this;
  }
  loops(e) {
    const n = this._duration + this._wait;
    if (e == null) {
      const _ = Math.floor(this._time / n), k = (this._time - _ * n) / this._duration;
      return Math.min(_ + k, this._times);
    }
    const a = Math.floor(e), o = e % 1, h = n * a + this._duration * o;
    return this.time(h);
  }
  persist(e) {
    return e == null ? this._persist : (this._persist = e, this);
  }
  position(e) {
    const n = this._time, a = this._duration, o = this._wait, h = this._times, _ = this._swing, v = this._reverse;
    let k;
    if (e == null) {
      const et = function(yt) {
        const it = _ * Math.floor(yt % (2 * (o + a)) / (o + a)), Tt = it && !v || !it && v, ut = Math.pow(-1, Tt) * (yt % (o + a)) / a + Tt;
        return Math.max(Math.min(ut, 1), 0);
      }, F = h * (o + a) - o;
      return k = n <= 0 ? Math.round(et(1e-5)) : n < F ? et(n) : Math.round(et(F - 1e-5)), k;
    }
    const R = Math.floor(this.loops()), z = _ && R % 2 === 0;
    return k = R + (z && !v || v && z ? e : 1 - e), this.loops(k);
  }
  progress(e) {
    return e == null ? Math.min(1, this._time / this.duration()) : this.time(e * this.duration());
  }
  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */
  queue(e, n, a, o) {
    return this._queue.push({
      initialiser: e || vl,
      runner: n || vl,
      retarget: a,
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
  schedule(e, n, a) {
    if (e instanceof tf || (a = n, n = e, e = this.timeline()), !e)
      throw Error("Runner cannot be scheduled without timeline");
    return e.schedule(this, n, a), this;
  }
  step(e) {
    if (!this.enabled) return this;
    e = e ?? 16, this._time += e;
    const n = this.position(), a = this._lastPosition !== n && this._time >= 0;
    this._lastPosition = n;
    const o = this.duration(), h = this._lastTime <= 0 && this._time > 0, _ = this._lastTime < o && this._time >= o;
    this._lastTime = this._time, h && this.fire("start", this);
    const v = this._isDeclarative;
    this.done = !v && !_ && this._time >= o, this._reseted = !1;
    let k = !1;
    return (a || v) && (this._initialise(a), this.transforms = new Rt(), k = this._run(v ? e : n), this.fire("step", this)), this.done = this.done || k && v, _ && this.fire("finished", this), this;
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
      for (let n = 0, a = this._queue.length; n < a; ++n) {
        const o = this._queue[n], h = this._isDeclarative || !o.initialised && e;
        e = !o.finished, h && e && (o.initialiser.call(this), o.initialised = !0);
      }
  }
  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher(e, n) {
    if (this._history[e] = {
      morpher: n,
      caller: this._queue[this._queue.length - 1]
    }, this._isDeclarative) {
      const a = this.timeline();
      a && a.play();
    }
  }
  // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given
  _run(e) {
    let n = !0;
    for (let a = 0, o = this._queue.length; a < o; ++a) {
      const h = this._queue[a], _ = h.runner.call(this, e);
      h.finished = h.finished || _ === !0, n = n && h.finished;
    }
    return n;
  }
  // do nothing and return false
  _tryRetarget(e, n, a) {
    if (this._history[e]) {
      if (!this._history[e].caller.initialised) {
        const h = this._queue.indexOf(this._history[e].caller);
        return this._queue.splice(h, 1), !1;
      }
      this._history[e].caller.retarget ? this._history[e].caller.retarget.call(this, n, a) : this._history[e].morpher.to(n), this._history[e].caller.finished = !1;
      const o = this.timeline();
      return o && o.play(), !0;
    }
    return !1;
  }
}
gi.id = 0;
class Bs {
  constructor(e = new Rt(), n = -1, a = !0) {
    this.transforms = e, this.id = n, this.done = a;
  }
  clearTransformsFromQueue() {
  }
}
Jt([gi, Bs], {
  mergeWith(t) {
    return new Bs(t.transforms.lmultiply(this.transforms), t.id);
  }
});
const ef = (t, e) => t.lmultiplyO(e), nf = (t) => t.transforms;
function kg() {
  const e = this._transformationRunners.runners.map(nf).reduce(ef, new Rt());
  this.transform(e), this._transformationRunners.merge(), this._transformationRunners.length() === 1 && (this._frameId = null);
}
class Ag {
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
    return this.ids.splice(0, n, 0), this.runners.splice(0, n, new Bs()).forEach((a) => a.clearTransformsFromQueue()), this;
  }
  edit(e, n) {
    const a = this.ids.indexOf(e + 1);
    return this.ids.splice(a, 1, e + 1), this.runners.splice(a, 1, n), this;
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
      const a = this.runners[n];
      if (e && a.done && e.done && (!a._timeline || !a._timeline._runnerIds.includes(a.id)) && (!e._timeline || !e._timeline._runnerIds.includes(e.id))) {
        this.remove(a.id);
        const h = a.mergeWith(e);
        this.edit(e.id, h), e = h, --n;
      } else
        e = a;
    }
    return this;
  }
  remove(e) {
    const n = this.ids.indexOf(e + 1);
    return this.ids.splice(n, 1), this.runners.splice(n, 1), this;
  }
}
Kt({
  Element: {
    animate(t, e, n) {
      const a = gi.sanitise(t, e, n), o = this.timeline();
      return new gi(a.duration).loop(a).element(this).timeline(o.play()).schedule(a.delay, a.when);
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
      return this._transformationRunners.runners.filter((e) => e.id <= t.id).map(nf).reduce(ef, new Rt());
    },
    _addRunner(t) {
      this._transformationRunners.add(t), ce.cancelImmediate(this._frameId), this._frameId = ce.immediate(kg.bind(this));
    },
    _prepareRunner() {
      this._frameId == null && (this._transformationRunners = new Ag().add(new Bs(new Rt(this))));
    }
  }
});
const Pg = (t, e) => t.filter((n) => !e.includes(n));
Jt(gi, {
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
    let a = e;
    if (this._tryRetarget(t, a)) return this;
    let o = new qn(this._stepper).to(a), h = Object.keys(a);
    return this.queue(function() {
      o = o.from(this.element()[t](h));
    }, function(_) {
      return this.element()[t](o.at(_).valueOf()), o.done();
    }, function(_) {
      const v = Object.keys(_), k = Pg(v, h);
      if (k.length) {
        const z = this.element()[t](k), U = new Xr(o.from()).valueOf();
        Object.assign(U, z), o.from(U);
      }
      const R = new Xr(o.to()).valueOf();
      Object.assign(R, _), o.to(R), h = v, a = _;
    }), this._rememberMorpher(t, o), this;
  },
  zoom(t, e) {
    if (this._tryRetarget("zoom", t, e)) return this;
    let n = new qn(this._stepper).to(new Ut(t));
    return this.queue(function() {
      n = n.from(this.element().zoom());
    }, function(a) {
      return this.element().zoom(n.at(a), e), n.done();
    }, function(a, o) {
      e = o, n.to(a);
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
    const a = Rt.isMatrixLike(t);
    n = t.affine != null ? t.affine : n ?? !a;
    const o = new qn(this._stepper).type(n ? rs : Rt);
    let h, _, v, k, R;
    function z() {
      _ = _ || this.element(), h = h || lo(t, _), R = new Rt(e ? void 0 : _), _._addRunner(this), e || _._clearTransformRunnersBefore(this);
    }
    function U(F) {
      e || this.clearTransform();
      const {
        x: yt,
        y: it
      } = new Oe(h).transform(_._currentTransform(this));
      let Tt = new Rt({
        ...t,
        origin: [yt, it]
      }), ut = this._isDeclarative && v ? v : R;
      if (n) {
        Tt = Tt.decompose(yt, it), ut = ut.decompose(yt, it);
        const It = Tt.rotate, xt = ut.rotate, ie = [It - 360, It, It + 360], kt = ie.map((ve) => Math.abs(ve - xt)), At = Math.min(...kt), Ot = kt.indexOf(At);
        Tt.rotate = ie[Ot];
      }
      e && (a || (Tt.rotate = t.rotate || 0), this._isDeclarative && k && (ut.rotate = k)), o.from(ut), o.to(Tt);
      const Qt = o.at(F);
      return k = Qt.rotate, v = new Rt(Qt), this.addTransform(v), _._addRunner(this), o.done();
    }
    function et(F) {
      (F.origin || "center").toString() !== (t.origin || "center").toString() && (h = lo(F, _)), t = {
        ...F,
        origin: h
      };
    }
    return this.queue(z, U, et, !0), this._isDeclarative && this._rememberMorpher("transform", o), this;
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
    if (e = new Ut(e), this._tryRetarget(t, e)) return this;
    const n = new qn(this._stepper).to(e);
    let a = null;
    return this.queue(function() {
      a = this.element()[t](), n.from(a), n.to(a + e);
    }, function(o) {
      return this.element()[t](n.at(o)), n.done();
    }, function(o) {
      n.to(a + new Ut(o));
    }), this._rememberMorpher(t, n), this;
  },
  _queueObject(t, e) {
    if (this._tryRetarget(t, e)) return this;
    const n = new qn(this._stepper).to(e);
    return this.queue(function() {
      n.from(this.element()[t]());
    }, function(a) {
      return this.element()[t](n.at(a)), n.done();
    }), this._rememberMorpher(t, n), this;
  },
  _queueNumber(t, e) {
    return this._queueObject(t, new Ut(e));
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
  plot(t, e, n, a) {
    if (arguments.length === 4)
      return this.plot([t, e, n, a]);
    if (this._tryRetarget("plot", t)) return this;
    const o = new qn(this._stepper).type(this._element.MorphArray).to(t);
    return this.queue(function() {
      o.from(this._element.array());
    }, function(h) {
      return this._element.plot(o.at(h)), o.done();
    }), this._rememberMorpher("plot", o), this;
  },
  // Add leading method
  leading(t) {
    return this._queueNumber("leading", t);
  },
  // Add animatable viewbox
  viewbox(t, e, n, a) {
    return this._queueObject("viewbox", new Ze(t, e, n, a));
  },
  update(t) {
    return typeof t != "object" ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (t.opacity != null && this.attr("stop-opacity", t.opacity), t.color != null && this.attr("stop-color", t.color), t.offset != null && this.attr("offset", t.offset), this);
  }
});
Jt(gi, {
  rx: $o,
  ry: Xo,
  from: $h,
  to: Xh
});
ae(gi, "Runner");
class eu extends oi {
  constructor(e, n = e) {
    super(xe("svg", e), n), this.namespace();
  }
  // Creates and returns defs element
  defs() {
    return this.isRoot() ? Si(this.node.querySelector("defs")) || this.put(new Yo()) : this.root().defs();
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof he.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    return this.isRoot() ? this.attr({
      xmlns: Ho,
      version: "1.1"
    }).attr("xmlns:xlink", es, Cs).attr("xmlns:svgjs", Zp, Cs) : this.root().namespace();
  }
  removeNamespace() {
    return this.attr({
      xmlns: null,
      version: null
    }).attr("xmlns:xlink", null, Cs).attr("xmlns:svgjs", null, Cs);
  }
  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    return this.isRoot() ? this : super.root();
  }
}
Kt({
  Container: {
    // Create nested svg document
    nested: be(function() {
      return this.put(new eu());
    })
  }
});
ae(eu, "Svg", !0);
let iu = class extends oi {
  // Initialize node
  constructor(e, n = e) {
    super(xe("symbol", e), n);
  }
};
Kt({
  Container: {
    symbol: be(function() {
      return this.put(new iu());
    })
  }
});
ae(iu, "Symbol");
function Tg(t) {
  return this._build === !1 && this.clear(), this.node.appendChild(he.document.createTextNode(t)), this;
}
function Eg() {
  return this.node.getComputedTextLength();
}
function Og(t, e = this.bbox()) {
  return t == null ? e.x : this.attr("x", this.attr("x") + t - e.x);
}
function Mg(t, e = this.bbox()) {
  return t == null ? e.y : this.attr("y", this.attr("y") + t - e.y);
}
function Lg(t, e, n = this.bbox()) {
  return this.x(t, n).y(e, n);
}
function Ng(t, e = this.bbox()) {
  return t == null ? e.cx : this.attr("x", this.attr("x") + t - e.cx);
}
function Rg(t, e = this.bbox()) {
  return t == null ? e.cy : this.attr("y", this.attr("y") + t - e.cy);
}
function Fg(t, e, n = this.bbox()) {
  return this.cx(t, n).cy(e, n);
}
function zg(t) {
  return this.attr("x", t);
}
function Dg(t) {
  return this.attr("y", t);
}
function Vg(t, e) {
  return this.ax(t).ay(e);
}
function Bg(t) {
  return this._build = !!t, this;
}
var rf = {
  __proto__: null,
  plain: Tg,
  length: Eg,
  x: Og,
  y: Mg,
  move: Lg,
  cx: Ng,
  cy: Rg,
  center: Fg,
  ax: zg,
  ay: Dg,
  amove: Vg,
  build: Bg
};
class zi extends _i {
  // Initialize node
  constructor(e, n = e) {
    super(xe("text", e), n), this.dom.leading = new Ut(1.3), this._rebuild = !0, this._build = !1;
  }
  // Set / get leading
  leading(e) {
    return e == null ? this.dom.leading : (this.dom.leading = new Ut(e), this.rebuild());
  }
  // Rebuild appearance type
  rebuild(e) {
    if (typeof e == "boolean" && (this._rebuild = e), this._rebuild) {
      const n = this;
      let a = 0;
      const o = this.dom.leading;
      this.each(function(h) {
        const _ = he.window.getComputedStyle(this.node).getPropertyValue("font-size"), v = o * new Ut(_);
        this.dom.newLined && (this.attr("x", n.attr("x")), this.text() === `
` ? a += v : (this.attr("dy", h ? v + a : 0), a = 0));
      }), this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(e) {
    return this.dom = e, this.dom.leading = new Ut(e.leading || 1.3), this;
  }
  // Set the text content
  text(e) {
    if (e === void 0) {
      const n = this.node.childNodes;
      let a = 0;
      e = "";
      for (let o = 0, h = n.length; o < h; ++o) {
        if (n[o].nodeName === "textPath") {
          o === 0 && (a = 1);
          continue;
        }
        o !== a && n[o].nodeType !== 3 && Si(n[o]).dom.newLined === !0 && (e += `
`), e += n[o].textContent;
      }
      return e;
    }
    if (this.clear().build(!0), typeof e == "function")
      e.call(this, this);
    else {
      e = (e + "").split(`
`);
      for (let n = 0, a = e.length; n < a; n++)
        this.newLine(e[n]);
    }
    return this.build(!1).rebuild();
  }
}
Jt(zi, rf);
Kt({
  Container: {
    // Create text element
    text: be(function(t = "") {
      return this.put(new zi()).text(t);
    }),
    // Create plain text element
    plain: be(function(t = "") {
      return this.put(new zi()).plain(t);
    })
  }
});
ae(zi, "Text");
class ra extends _i {
  // Initialize node
  constructor(e, n = e) {
    super(xe("tspan", e), n), this._build = !1;
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
    const n = e.index(this), a = he.window.getComputedStyle(this.node).getPropertyValue("font-size"), o = e.dom.leading * new Ut(a);
    return this.dy(n ? o : 0).attr("x", e.x());
  }
  // Set text content
  text(e) {
    return e == null ? this.node.textContent + (this.dom.newLined ? `
` : "") : (typeof e == "function" ? (this.clear().build(!0), e.call(this, this), this.build(!1)) : this.plain(e), this);
  }
}
Jt(ra, rf);
Kt({
  Tspan: {
    tspan: be(function(t = "") {
      const e = new ra();
      return this._build || this.clear(), this.put(e).text(t);
    })
  },
  Text: {
    newLine: function(t = "") {
      return this.tspan(t).newLine();
    }
  }
});
ae(ra, "Tspan");
class nu extends _i {
  constructor(e, n = e) {
    super(xe("circle", e), n);
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
    return this.radius(new Ut(e).divide(2));
  }
}
Jt(nu, {
  x: jh,
  y: Hh,
  cx: Wh,
  cy: Gh,
  width: Zh,
  height: Kh
});
Kt({
  Container: {
    // Create circle element
    circle: be(function(t = 0) {
      return this.put(new nu()).size(t).move(0, 0);
    })
  }
});
ae(nu, "Circle");
class mo extends oi {
  constructor(e, n = e) {
    super(xe("clipPath", e), n);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    return this.targets().forEach(function(e) {
      e.unclip();
    }), super.remove();
  }
  targets() {
    return Sr("svg [clip-path*=" + this.id() + "]");
  }
}
Kt({
  Container: {
    // Create clipping element
    clip: be(function() {
      return this.defs().put(new mo());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(t) {
      const e = t instanceof mo ? t : this.parent().clip().add(t);
      return this.attr("clip-path", "url(#" + e.id() + ")");
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
ae(mo, "ClipPath");
class sf extends Ki {
  constructor(e, n = e) {
    super(xe("foreignObject", e), n);
  }
}
Kt({
  Container: {
    foreignObject: be(function(t, e) {
      return this.put(new sf()).size(t, e);
    })
  }
});
ae(sf, "ForeignObject");
function qg(t, e) {
  return this.children().forEach((n, a) => {
    let o;
    try {
      o = n.bbox();
    } catch {
      return;
    }
    const h = new Rt(n), _ = h.translate(t, e).transform(h.inverse()), v = new Oe(o.x, o.y).transform(_);
    n.move(v.x, v.y);
  }), this;
}
function Ug(t) {
  return this.dmove(t, 0);
}
function jg(t) {
  return this.dmove(0, t);
}
function Hg(t, e = this.bbox()) {
  return t == null ? e.height : this.size(e.width, t, e);
}
function Wg(t = 0, e = 0, n = this.bbox()) {
  const a = t - n.x, o = e - n.y;
  return this.dmove(a, o);
}
function Gg(t, e, n = this.bbox()) {
  const a = wr(this, t, e, n), o = a.width / n.width, h = a.height / n.height;
  return this.children().forEach((_, v) => {
    const k = new Oe(n).transform(new Rt(_).inverse());
    _.scale(o, h, k.x, k.y);
  }), this;
}
function Zg(t, e = this.bbox()) {
  return t == null ? e.width : this.size(t, e.height, e);
}
function Kg(t, e = this.bbox()) {
  return t == null ? e.x : this.move(t, e.y, e);
}
function Yg(t, e = this.bbox()) {
  return t == null ? e.y : this.move(e.x, t, e);
}
var af = {
  __proto__: null,
  dmove: qg,
  dx: Ug,
  dy: jg,
  height: Hg,
  move: Wg,
  size: Gg,
  width: Zg,
  x: Kg,
  y: Yg
};
class ru extends oi {
  constructor(e, n = e) {
    super(xe("g", e), n);
  }
}
Jt(ru, af);
Kt({
  Container: {
    // Create a group element
    group: be(function() {
      return this.put(new ru());
    })
  }
});
ae(ru, "G");
class qs extends oi {
  constructor(e, n = e) {
    super(xe("a", e), n);
  }
  // Link target attribute
  target(e) {
    return this.attr("target", e);
  }
  // Link url
  to(e) {
    return this.attr("href", e, es);
  }
}
Jt(qs, af);
Kt({
  Container: {
    // Create a hyperlink element
    link: be(function(t) {
      return this.put(new qs()).to(t);
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
      return e || (e = new qs(), this.wrap(e)), typeof t == "function" ? t.call(e, e) : e.to(t), this;
    },
    linker() {
      const t = this.parent();
      return t && t.node.nodeName.toLowerCase() === "a" ? t : null;
    }
  }
});
ae(qs, "A");
class vo extends oi {
  // Initialize node
  constructor(e, n = e) {
    super(xe("mask", e), n);
  }
  // Unmask all masked elements and remove itself
  remove() {
    return this.targets().forEach(function(e) {
      e.unmask();
    }), super.remove();
  }
  targets() {
    return Sr("svg [mask*=" + this.id() + "]");
  }
}
Kt({
  Container: {
    mask: be(function() {
      return this.defs().put(new vo());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(t) {
      const e = t instanceof vo ? t : this.parent().mask().add(t);
      return this.attr("mask", "url(#" + e.id() + ")");
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
ae(vo, "Mask");
class of extends Ki {
  constructor(e, n = e) {
    super(xe("stop", e), n);
  }
  // add color stops
  update(e) {
    return (typeof e == "number" || e instanceof Ut) && (e = {
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }), e.opacity != null && this.attr("stop-opacity", e.opacity), e.color != null && this.attr("stop-color", e.color), e.offset != null && this.attr("offset", new Ut(e.offset)), this;
  }
}
Kt({
  Gradient: {
    // Add a color stop
    stop: function(t, e, n) {
      return this.put(new of()).update(t, e, n);
    }
  }
});
ae(of, "Stop");
function $g(t, e) {
  if (!t) return "";
  if (!e) return t;
  let n = t + "{";
  for (const a in e)
    n += Wp(a) + ":" + e[a] + ";";
  return n += "}", n;
}
class yo extends Ki {
  constructor(e, n = e) {
    super(xe("style", e), n);
  }
  addText(e = "") {
    return this.node.textContent += e, this;
  }
  font(e, n, a = {}) {
    return this.rule("@font-face", {
      fontFamily: e,
      src: n,
      ...a
    });
  }
  rule(e, n) {
    return this.addText($g(e, n));
  }
}
Kt("Dom", {
  style(t, e) {
    return this.put(new yo()).rule(t, e);
  },
  fontface(t, e, n) {
    return this.put(new yo()).font(t, e, n);
  }
});
ae(yo, "Style");
class su extends zi {
  // Initialize node
  constructor(e, n = e) {
    super(xe("textPath", e), n);
  }
  // return the array of the path track element
  array() {
    const e = this.track();
    return e ? e.array() : null;
  }
  // Plot path if any
  plot(e) {
    const n = this.track();
    let a = null;
    return n && (a = n.plot(e)), e == null ? a : this;
  }
  // Get the path element
  track() {
    return this.reference("href");
  }
}
Kt({
  Container: {
    textPath: be(function(t, e) {
      return t instanceof zi || (t = this.text(t)), t.path(e);
    })
  },
  Text: {
    // Create path for text to run on
    path: be(function(t, e = !0) {
      const n = new su();
      t instanceof Cr || (t = this.defs().path(t)), n.attr("href", "#" + t, es);
      let a;
      if (e)
        for (; a = this.node.firstChild; )
          n.node.appendChild(a);
      return this.put(n);
    }),
    // Get the textPath children
    textPath() {
      return this.findOne("textPath");
    }
  },
  Path: {
    // creates a textPath from this path
    text: be(function(t) {
      return t instanceof zi || (t = new zi().addTo(this.parent()).text(t)), t.path(this);
    }),
    targets() {
      return Sr("svg textPath").filter((t) => (t.attr("href") || "").includes(this.id()));
    }
  }
});
su.prototype.MorphArray = Kn;
ae(su, "TextPath");
class uf extends _i {
  constructor(e, n = e) {
    super(xe("use", e), n);
  }
  // Use element as a reference
  use(e, n) {
    return this.attr("href", (n || "") + "#" + e, es);
  }
}
Kt({
  Container: {
    // Create a use element
    use: be(function(t, e) {
      return this.put(new uf()).use(t, e);
    })
  }
});
ae(uf, "Use");
const Xg = ti;
Jt([eu, iu, ia, Yr, Ds], ai("viewbox"));
Jt([$r, as, ss, Cr], ai("marker"));
Jt(zi, ai("Text"));
Jt(Cr, ai("Path"));
Jt(Yo, ai("Defs"));
Jt([zi, ra], ai("Tspan"));
Jt([na, ea, ns, gi], ai("radius"));
Jt(is, ai("EventTarget"));
Jt(Sn, ai("Dom"));
Jt(Ki, ai("Element"));
Jt(_i, ai("Shape"));
Jt([oi, Yh], ai("Container"));
Jt(ns, ai("Gradient"));
Jt(gi, ai("Runner"));
Zn.extend(jp());
mg([Ut, ge, Ze, Rt, yr, Cn, Kn, Oe]);
vg();
function Qg(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function lf(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function a() {
      return this instanceof a ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(a) {
    var o = Object.getOwnPropertyDescriptor(t, a);
    Object.defineProperty(n, a, o.get ? o : {
      enumerable: !0,
      get: function() {
        return t[a];
      }
    });
  }), n;
}
function Jg(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Os = { exports: {} };
const t_ = {}, e_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: t_
}, Symbol.toStringTag, { value: "Module" })), bl = /* @__PURE__ */ lf(e_);
var Za = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}, Ka = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", i_ = {
  5: Ka,
  "5module": Ka + " export import",
  6: Ka + " const class extends export import super"
}, n_ = /^in(stanceof)?$/, au = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", hf = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿", r_ = new RegExp("[" + au + "]"), s_ = new RegExp("[" + au + hf + "]");
au = hf = null;
var ff = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938], a_ = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
function bo(t, e) {
  for (var n = 65536, a = 0; a < e.length; a += 2) {
    if (n += e[a], n > t)
      return !1;
    if (n += e[a + 1], n >= t)
      return !0;
  }
}
function sn(t, e) {
  return t < 65 ? t === 36 : t < 91 ? !0 : t < 97 ? t === 95 : t < 123 ? !0 : t <= 65535 ? t >= 170 && r_.test(String.fromCharCode(t)) : e === !1 ? !1 : bo(t, ff);
}
function Yn(t, e) {
  return t < 48 ? t === 36 : t < 58 ? !0 : t < 65 ? !1 : t < 91 ? !0 : t < 97 ? t === 95 : t < 123 ? !0 : t <= 65535 ? t >= 170 && s_.test(String.fromCharCode(t)) : e === !1 ? !1 : bo(t, ff) || bo(t, a_);
}
var le = function(e, n) {
  n === void 0 && (n = {}), this.label = e, this.keyword = n.keyword, this.beforeExpr = !!n.beforeExpr, this.startsExpr = !!n.startsExpr, this.isLoop = !!n.isLoop, this.isAssign = !!n.isAssign, this.prefix = !!n.prefix, this.postfix = !!n.postfix, this.binop = n.binop || null, this.updateContext = null;
};
function bi(t, e) {
  return new le(t, { beforeExpr: !0, binop: e });
}
var xi = { beforeExpr: !0 }, li = { startsExpr: !0 }, sa = {};
function ne(t, e) {
  return e === void 0 && (e = {}), e.keyword = t, sa[t] = new le(t, e);
}
var L = {
  num: new le("num", li),
  regexp: new le("regexp", li),
  string: new le("string", li),
  name: new le("name", li),
  eof: new le("eof"),
  // Punctuation token types.
  bracketL: new le("[", { beforeExpr: !0, startsExpr: !0 }),
  bracketR: new le("]"),
  braceL: new le("{", { beforeExpr: !0, startsExpr: !0 }),
  braceR: new le("}"),
  parenL: new le("(", { beforeExpr: !0, startsExpr: !0 }),
  parenR: new le(")"),
  comma: new le(",", xi),
  semi: new le(";", xi),
  colon: new le(":", xi),
  dot: new le("."),
  question: new le("?", xi),
  questionDot: new le("?."),
  arrow: new le("=>", xi),
  template: new le("template"),
  invalidTemplate: new le("invalidTemplate"),
  ellipsis: new le("...", xi),
  backQuote: new le("`", li),
  dollarBraceL: new le("${", { beforeExpr: !0, startsExpr: !0 }),
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
  eq: new le("=", { beforeExpr: !0, isAssign: !0 }),
  assign: new le("_=", { beforeExpr: !0, isAssign: !0 }),
  incDec: new le("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
  prefix: new le("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  logicalOR: bi("||", 1),
  logicalAND: bi("&&", 2),
  bitwiseOR: bi("|", 3),
  bitwiseXOR: bi("^", 4),
  bitwiseAND: bi("&", 5),
  equality: bi("==/!=/===/!==", 6),
  relational: bi("</>/<=/>=", 7),
  bitShift: bi("<</>>/>>>", 8),
  plusMin: new le("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
  modulo: bi("%", 10),
  star: bi("*", 10),
  slash: bi("/", 10),
  starstar: new le("**", { beforeExpr: !0 }),
  coalesce: bi("??", 1),
  // Keyword token types.
  _break: ne("break"),
  _case: ne("case", xi),
  _catch: ne("catch"),
  _continue: ne("continue"),
  _debugger: ne("debugger"),
  _default: ne("default", xi),
  _do: ne("do", { isLoop: !0, beforeExpr: !0 }),
  _else: ne("else", xi),
  _finally: ne("finally"),
  _for: ne("for", { isLoop: !0 }),
  _function: ne("function", li),
  _if: ne("if"),
  _return: ne("return", xi),
  _switch: ne("switch"),
  _throw: ne("throw", xi),
  _try: ne("try"),
  _var: ne("var"),
  _const: ne("const"),
  _while: ne("while", { isLoop: !0 }),
  _with: ne("with"),
  _new: ne("new", { beforeExpr: !0, startsExpr: !0 }),
  _this: ne("this", li),
  _super: ne("super", li),
  _class: ne("class", li),
  _extends: ne("extends", xi),
  _export: ne("export"),
  _import: ne("import", li),
  _null: ne("null", li),
  _true: ne("true", li),
  _false: ne("false", li),
  _in: ne("in", { beforeExpr: !0, binop: 7 }),
  _instanceof: ne("instanceof", { beforeExpr: !0, binop: 7 }),
  _typeof: ne("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _void: ne("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _delete: ne("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 })
}, mi = /\r\n?|\n|\u2028|\u2029/, br = new RegExp(mi.source, "g");
function Ir(t, e) {
  return t === 10 || t === 13 || !e && (t === 8232 || t === 8233);
}
var ou = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Ci = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, cf = Object.prototype, o_ = cf.hasOwnProperty, u_ = cf.toString;
function aa(t, e) {
  return o_.call(t, e);
}
var xl = Array.isArray || function(t) {
  return u_.call(t) === "[object Array]";
};
function Un(t) {
  return new RegExp("^(?:" + t.replace(/ /g, "|") + ")$");
}
var xr = function(e, n) {
  this.line = e, this.column = n;
};
xr.prototype.offset = function(e) {
  return new xr(this.line, this.column + e);
};
var os = function(e, n, a) {
  this.start = n, this.end = a, e.sourceFile !== null && (this.source = e.sourceFile);
};
function uu(t, e) {
  for (var n = 1, a = 0; ; ) {
    br.lastIndex = a;
    var o = br.exec(t);
    if (o && o.index < e)
      ++n, a = o.index + o[0].length;
    else
      return new xr(n, e - a);
  }
}
var Us = {
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
function l_(t) {
  var e = {};
  for (var n in Us)
    e[n] = t && aa(t, n) ? t[n] : Us[n];
  if (e.ecmaVersion >= 2015 && (e.ecmaVersion -= 2009), e.allowReserved == null && (e.allowReserved = e.ecmaVersion < 5), xl(e.onToken)) {
    var a = e.onToken;
    e.onToken = function(o) {
      return a.push(o);
    };
  }
  return xl(e.onComment) && (e.onComment = h_(e, e.onComment)), e;
}
function h_(t, e) {
  return function(n, a, o, h, _, v) {
    var k = {
      type: n ? "Block" : "Line",
      value: a,
      start: o,
      end: h
    };
    t.locations && (k.loc = new os(this, _, v)), t.ranges && (k.range = [o, h]), e.push(k);
  };
}
var Qr = 1, us = 2, lu = Qr | us, df = 4, pf = 8, gf = 16, _f = 32, mf = 64, vf = 128;
function hu(t, e) {
  return us | (t ? df : 0) | (e ? pf : 0);
}
var wl = 0, fu = 1, rn = 2, yf = 3, bf = 4, xf = 5, ke = function(e, n, a) {
  this.options = e = l_(e), this.sourceFile = e.sourceFile, this.keywords = Un(i_[e.ecmaVersion >= 6 ? 6 : e.sourceType === "module" ? "5module" : 5]);
  var o = "";
  if (e.allowReserved !== !0) {
    for (var h = e.ecmaVersion; !(o = Za[h]); h--)
      ;
    e.sourceType === "module" && (o += " await");
  }
  this.reservedWords = Un(o);
  var _ = (o ? o + " " : "") + Za.strict;
  this.reservedWordsStrict = Un(_), this.reservedWordsStrictBind = Un(_ + " " + Za.strictBind), this.input = String(n), this.containsEsc = !1, a ? (this.pos = a, this.lineStart = this.input.lastIndexOf(`
`, a - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(mi).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = L.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = e.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = {}, this.pos === 0 && e.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(Qr), this.regexpState = null;
}, Xn = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 } };
ke.prototype.parse = function() {
  var e = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(e);
};
Xn.inFunction.get = function() {
  return (this.currentVarScope().flags & us) > 0;
};
Xn.inGenerator.get = function() {
  return (this.currentVarScope().flags & pf) > 0;
};
Xn.inAsync.get = function() {
  return (this.currentVarScope().flags & df) > 0;
};
Xn.allowSuper.get = function() {
  return (this.currentThisScope().flags & mf) > 0;
};
Xn.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & vf) > 0;
};
Xn.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
ke.prototype.inNonArrowFunction = function() {
  return (this.currentThisScope().flags & us) > 0;
};
ke.extend = function() {
  for (var e = [], n = arguments.length; n--; ) e[n] = arguments[n];
  for (var a = this, o = 0; o < e.length; o++)
    a = e[o](a);
  return a;
};
ke.parse = function(e, n) {
  return new this(n, e).parse();
};
ke.parseExpressionAt = function(e, n, a) {
  var o = new this(a, e, n);
  return o.nextToken(), o.parseExpression();
};
ke.tokenizer = function(e, n) {
  return new this(n, e);
};
Object.defineProperties(ke.prototype, Xn);
var ii = ke.prototype, f_ = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
ii.strictDirective = function(t) {
  for (; ; ) {
    Ci.lastIndex = t, t += Ci.exec(this.input)[0].length;
    var e = f_.exec(this.input.slice(t));
    if (!e)
      return !1;
    if ((e[1] || e[2]) === "use strict") {
      Ci.lastIndex = t + e[0].length;
      var n = Ci.exec(this.input), a = n.index + n[0].length, o = this.input.charAt(a);
      return o === ";" || o === "}" || mi.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(o) || o === "!" && this.input.charAt(a + 1) === "=");
    }
    t += e[0].length, Ci.lastIndex = t, t += Ci.exec(this.input)[0].length, this.input[t] === ";" && t++;
  }
};
ii.eat = function(t) {
  return this.type === t ? (this.next(), !0) : !1;
};
ii.isContextual = function(t) {
  return this.type === L.name && this.value === t && !this.containsEsc;
};
ii.eatContextual = function(t) {
  return this.isContextual(t) ? (this.next(), !0) : !1;
};
ii.expectContextual = function(t) {
  this.eatContextual(t) || this.unexpected();
};
ii.canInsertSemicolon = function() {
  return this.type === L.eof || this.type === L.braceR || mi.test(this.input.slice(this.lastTokEnd, this.start));
};
ii.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
};
ii.semicolon = function() {
  !this.eat(L.semi) && !this.insertSemicolon() && this.unexpected();
};
ii.afterTrailingComma = function(t, e) {
  if (this.type === t)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), e || this.next(), !0;
};
ii.expect = function(t) {
  this.eat(t) || this.unexpected();
};
ii.unexpected = function(t) {
  this.raise(t ?? this.start, "Unexpected token");
};
function oa() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
}
ii.checkPatternErrors = function(t, e) {
  if (t) {
    t.trailingComma > -1 && this.raiseRecoverable(t.trailingComma, "Comma is not permitted after the rest element");
    var n = e ? t.parenthesizedAssign : t.parenthesizedBind;
    n > -1 && this.raiseRecoverable(n, "Parenthesized pattern");
  }
};
ii.checkExpressionErrors = function(t, e) {
  if (!t)
    return !1;
  var n = t.shorthandAssign, a = t.doubleProto;
  if (!e)
    return n >= 0 || a >= 0;
  n >= 0 && this.raise(n, "Shorthand property assignments are valid only in destructuring patterns"), a >= 0 && this.raiseRecoverable(a, "Redefinition of __proto__ property");
};
ii.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
};
ii.isSimpleAssignTarget = function(t) {
  return t.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(t.expression) : t.type === "Identifier" || t.type === "MemberExpression";
};
var Gt = ke.prototype;
Gt.parseTopLevel = function(t) {
  var e = {};
  for (t.body || (t.body = []); this.type !== L.eof; ) {
    var n = this.parseStatement(null, !0, e);
    t.body.push(n);
  }
  if (this.inModule)
    for (var a = 0, o = Object.keys(this.undefinedExports); a < o.length; a += 1) {
      var h = o[a];
      this.raiseRecoverable(this.undefinedExports[h].start, "Export '" + h + "' is not defined");
    }
  return this.adaptDirectivePrologue(t.body), this.next(), t.sourceType = this.options.sourceType, this.finishNode(t, "Program");
};
var cu = { kind: "loop" }, c_ = { kind: "switch" };
Gt.isLet = function(t) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return !1;
  Ci.lastIndex = this.pos;
  var e = Ci.exec(this.input), n = this.pos + e[0].length, a = this.input.charCodeAt(n);
  if (a === 91)
    return !0;
  if (t)
    return !1;
  if (a === 123)
    return !0;
  if (sn(a, !0)) {
    for (var o = n + 1; Yn(this.input.charCodeAt(o), !0); )
      ++o;
    var h = this.input.slice(n, o);
    if (!n_.test(h))
      return !0;
  }
  return !1;
};
Gt.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return !1;
  Ci.lastIndex = this.pos;
  var t = Ci.exec(this.input), e = this.pos + t[0].length;
  return !mi.test(this.input.slice(this.pos, e)) && this.input.slice(e, e + 8) === "function" && (e + 8 === this.input.length || !Yn(this.input.charAt(e + 8)));
};
Gt.parseStatement = function(t, e, n) {
  var a = this.type, o = this.startNode(), h;
  switch (this.isLet(t) && (a = L._var, h = "let"), a) {
    case L._break:
    case L._continue:
      return this.parseBreakContinueStatement(o, a.keyword);
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
      return h = h || this.value, t && h !== "var" && this.unexpected(), this.parseVarStatement(o, h);
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
      if (this.options.ecmaVersion > 10 && a === L._import) {
        Ci.lastIndex = this.pos;
        var _ = Ci.exec(this.input), v = this.pos + _[0].length, k = this.input.charCodeAt(v);
        if (k === 40 || k === 46)
          return this.parseExpressionStatement(o, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (e || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), a === L._import ? this.parseImport(o) : this.parseExport(o, n);
    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    default:
      if (this.isAsyncFunction())
        return t && this.unexpected(), this.next(), this.parseFunctionStatement(o, !0, !t);
      var R = this.value, z = this.parseExpression();
      return a === L.name && z.type === "Identifier" && this.eat(L.colon) ? this.parseLabeledStatement(o, R, z, t) : this.parseExpressionStatement(o, z);
  }
};
Gt.parseBreakContinueStatement = function(t, e) {
  var n = e === "break";
  this.next(), this.eat(L.semi) || this.insertSemicolon() ? t.label = null : this.type !== L.name ? this.unexpected() : (t.label = this.parseIdent(), this.semicolon());
  for (var a = 0; a < this.labels.length; ++a) {
    var o = this.labels[a];
    if ((t.label == null || o.name === t.label.name) && (o.kind != null && (n || o.kind === "loop") || t.label && n))
      break;
  }
  return a === this.labels.length && this.raise(t.start, "Unsyntactic " + e), this.finishNode(t, n ? "BreakStatement" : "ContinueStatement");
};
Gt.parseDebuggerStatement = function(t) {
  return this.next(), this.semicolon(), this.finishNode(t, "DebuggerStatement");
};
Gt.parseDoStatement = function(t) {
  return this.next(), this.labels.push(cu), t.body = this.parseStatement("do"), this.labels.pop(), this.expect(L._while), t.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(L.semi) : this.semicolon(), this.finishNode(t, "DoWhileStatement");
};
Gt.parseForStatement = function(t) {
  this.next();
  var e = this.options.ecmaVersion >= 9 && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction) && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(cu), this.enterScope(0), this.expect(L.parenL), this.type === L.semi)
    return e > -1 && this.unexpected(e), this.parseFor(t, null);
  var n = this.isLet();
  if (this.type === L._var || this.type === L._const || n) {
    var a = this.startNode(), o = n ? "let" : this.value;
    return this.next(), this.parseVar(a, !0, o), this.finishNode(a, "VariableDeclaration"), (this.type === L._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && a.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === L._in ? e > -1 && this.unexpected(e) : t.await = e > -1), this.parseForIn(t, a)) : (e > -1 && this.unexpected(e), this.parseFor(t, a));
  }
  var h = new oa(), _ = this.parseExpression(!0, h);
  return this.type === L._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? (this.options.ecmaVersion >= 9 && (this.type === L._in ? e > -1 && this.unexpected(e) : t.await = e > -1), this.toAssignable(_, !1, h), this.checkLVal(_), this.parseForIn(t, _)) : (this.checkExpressionErrors(h, !0), e > -1 && this.unexpected(e), this.parseFor(t, _));
};
Gt.parseFunctionStatement = function(t, e, n) {
  return this.next(), this.parseFunction(t, Ur | (n ? 0 : xo), !1, e);
};
Gt.parseIfStatement = function(t) {
  return this.next(), t.test = this.parseParenExpression(), t.consequent = this.parseStatement("if"), t.alternate = this.eat(L._else) ? this.parseStatement("if") : null, this.finishNode(t, "IfStatement");
};
Gt.parseReturnStatement = function(t) {
  return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(L.semi) || this.insertSemicolon() ? t.argument = null : (t.argument = this.parseExpression(), this.semicolon()), this.finishNode(t, "ReturnStatement");
};
Gt.parseSwitchStatement = function(t) {
  this.next(), t.discriminant = this.parseParenExpression(), t.cases = [], this.expect(L.braceL), this.labels.push(c_), this.enterScope(0);
  for (var e, n = !1; this.type !== L.braceR; )
    if (this.type === L._case || this.type === L._default) {
      var a = this.type === L._case;
      e && this.finishNode(e, "SwitchCase"), t.cases.push(e = this.startNode()), e.consequent = [], this.next(), a ? e.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), n = !0, e.test = null), this.expect(L.colon);
    } else
      e || this.unexpected(), e.consequent.push(this.parseStatement(null));
  return this.exitScope(), e && this.finishNode(e, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(t, "SwitchStatement");
};
Gt.parseThrowStatement = function(t) {
  return this.next(), mi.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), t.argument = this.parseExpression(), this.semicolon(), this.finishNode(t, "ThrowStatement");
};
var d_ = [];
Gt.parseTryStatement = function(t) {
  if (this.next(), t.block = this.parseBlock(), t.handler = null, this.type === L._catch) {
    var e = this.startNode();
    if (this.next(), this.eat(L.parenL)) {
      e.param = this.parseBindingAtom();
      var n = e.param.type === "Identifier";
      this.enterScope(n ? _f : 0), this.checkLVal(e.param, n ? bf : rn), this.expect(L.parenR);
    } else
      this.options.ecmaVersion < 10 && this.unexpected(), e.param = null, this.enterScope(0);
    e.body = this.parseBlock(!1), this.exitScope(), t.handler = this.finishNode(e, "CatchClause");
  }
  return t.finalizer = this.eat(L._finally) ? this.parseBlock() : null, !t.handler && !t.finalizer && this.raise(t.start, "Missing catch or finally clause"), this.finishNode(t, "TryStatement");
};
Gt.parseVarStatement = function(t, e) {
  return this.next(), this.parseVar(t, !1, e), this.semicolon(), this.finishNode(t, "VariableDeclaration");
};
Gt.parseWhileStatement = function(t) {
  return this.next(), t.test = this.parseParenExpression(), this.labels.push(cu), t.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(t, "WhileStatement");
};
Gt.parseWithStatement = function(t) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), t.object = this.parseParenExpression(), t.body = this.parseStatement("with"), this.finishNode(t, "WithStatement");
};
Gt.parseEmptyStatement = function(t) {
  return this.next(), this.finishNode(t, "EmptyStatement");
};
Gt.parseLabeledStatement = function(t, e, n, a) {
  for (var o = 0, h = this.labels; o < h.length; o += 1) {
    var _ = h[o];
    _.name === e && this.raise(n.start, "Label '" + e + "' is already declared");
  }
  for (var v = this.type.isLoop ? "loop" : this.type === L._switch ? "switch" : null, k = this.labels.length - 1; k >= 0; k--) {
    var R = this.labels[k];
    if (R.statementStart === t.start)
      R.statementStart = this.start, R.kind = v;
    else
      break;
  }
  return this.labels.push({ name: e, kind: v, statementStart: this.start }), t.body = this.parseStatement(a ? a.indexOf("label") === -1 ? a + "label" : a : "label"), this.labels.pop(), t.label = n, this.finishNode(t, "LabeledStatement");
};
Gt.parseExpressionStatement = function(t, e) {
  return t.expression = e, this.semicolon(), this.finishNode(t, "ExpressionStatement");
};
Gt.parseBlock = function(t, e, n) {
  for (t === void 0 && (t = !0), e === void 0 && (e = this.startNode()), e.body = [], this.expect(L.braceL), t && this.enterScope(0); this.type !== L.braceR; ) {
    var a = this.parseStatement(null);
    e.body.push(a);
  }
  return n && (this.strict = !1), this.next(), t && this.exitScope(), this.finishNode(e, "BlockStatement");
};
Gt.parseFor = function(t, e) {
  return t.init = e, this.expect(L.semi), t.test = this.type === L.semi ? null : this.parseExpression(), this.expect(L.semi), t.update = this.type === L.parenR ? null : this.parseExpression(), this.expect(L.parenR), t.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(t, "ForStatement");
};
Gt.parseForIn = function(t, e) {
  var n = this.type === L._in;
  return this.next(), e.type === "VariableDeclaration" && e.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || e.kind !== "var" || e.declarations[0].id.type !== "Identifier") ? this.raise(
    e.start,
    (n ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
  ) : e.type === "AssignmentPattern" && this.raise(e.start, "Invalid left-hand side in for-loop"), t.left = e, t.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(L.parenR), t.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(t, n ? "ForInStatement" : "ForOfStatement");
};
Gt.parseVar = function(t, e, n) {
  for (t.declarations = [], t.kind = n; ; ) {
    var a = this.startNode();
    if (this.parseVarId(a, n), this.eat(L.eq) ? a.init = this.parseMaybeAssign(e) : n === "const" && !(this.type === L._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : a.id.type !== "Identifier" && !(e && (this.type === L._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : a.init = null, t.declarations.push(this.finishNode(a, "VariableDeclarator")), !this.eat(L.comma))
      break;
  }
  return t;
};
Gt.parseVarId = function(t, e) {
  t.id = this.parseBindingAtom(), this.checkLVal(t.id, e === "var" ? fu : rn, !1);
};
var Ur = 1, xo = 2, wf = 4;
Gt.parseFunction = function(t, e, n, a) {
  this.initFunction(t), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !a) && (this.type === L.star && e & xo && this.unexpected(), t.generator = this.eat(L.star)), this.options.ecmaVersion >= 8 && (t.async = !!a), e & Ur && (t.id = e & wf && this.type !== L.name ? null : this.parseIdent(), t.id && !(e & xo) && this.checkLVal(t.id, this.strict || t.generator || t.async ? this.treatFunctionsAsVar ? fu : rn : yf));
  var o = this.yieldPos, h = this.awaitPos, _ = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(hu(t.async, t.generator)), e & Ur || (t.id = this.type === L.name ? this.parseIdent() : null), this.parseFunctionParams(t), this.parseFunctionBody(t, n, !1), this.yieldPos = o, this.awaitPos = h, this.awaitIdentPos = _, this.finishNode(t, e & Ur ? "FunctionDeclaration" : "FunctionExpression");
};
Gt.parseFunctionParams = function(t) {
  this.expect(L.parenL), t.params = this.parseBindingList(L.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
};
Gt.parseClass = function(t, e) {
  this.next();
  var n = this.strict;
  this.strict = !0, this.parseClassId(t, e), this.parseClassSuper(t);
  var a = this.startNode(), o = !1;
  for (a.body = [], this.expect(L.braceL); this.type !== L.braceR; ) {
    var h = this.parseClassElement(t.superClass !== null);
    h && (a.body.push(h), h.type === "MethodDefinition" && h.kind === "constructor" && (o && this.raise(h.start, "Duplicate constructor in the same class"), o = !0));
  }
  return this.strict = n, this.next(), t.body = this.finishNode(a, "ClassBody"), this.finishNode(t, e ? "ClassDeclaration" : "ClassExpression");
};
Gt.parseClassElement = function(t) {
  var e = this;
  if (this.eat(L.semi))
    return null;
  var n = this.startNode(), a = function(k, R) {
    R === void 0 && (R = !1);
    var z = e.start, U = e.startLoc;
    return e.eatContextual(k) ? e.type !== L.parenL && (!R || !e.canInsertSemicolon()) ? !0 : (n.key && e.unexpected(), n.computed = !1, n.key = e.startNodeAt(z, U), n.key.name = k, e.finishNode(n.key, "Identifier"), !1) : !1;
  };
  n.kind = "method", n.static = a("static");
  var o = this.eat(L.star), h = !1;
  o || (this.options.ecmaVersion >= 8 && a("async", !0) ? (h = !0, o = this.options.ecmaVersion >= 9 && this.eat(L.star)) : a("get") ? n.kind = "get" : a("set") && (n.kind = "set")), n.key || this.parsePropertyName(n);
  var _ = n.key, v = !1;
  return !n.computed && !n.static && (_.type === "Identifier" && _.name === "constructor" || _.type === "Literal" && _.value === "constructor") ? (n.kind !== "method" && this.raise(_.start, "Constructor can't have get/set modifier"), o && this.raise(_.start, "Constructor can't be a generator"), h && this.raise(_.start, "Constructor can't be an async method"), n.kind = "constructor", v = t) : n.static && _.type === "Identifier" && _.name === "prototype" && this.raise(_.start, "Classes may not have a static property named prototype"), this.parseClassMethod(n, o, h, v), n.kind === "get" && n.value.params.length !== 0 && this.raiseRecoverable(n.value.start, "getter should have no params"), n.kind === "set" && n.value.params.length !== 1 && this.raiseRecoverable(n.value.start, "setter should have exactly one param"), n.kind === "set" && n.value.params[0].type === "RestElement" && this.raiseRecoverable(n.value.params[0].start, "Setter cannot use rest params"), n;
};
Gt.parseClassMethod = function(t, e, n, a) {
  return t.value = this.parseMethod(e, n, a), this.finishNode(t, "MethodDefinition");
};
Gt.parseClassId = function(t, e) {
  this.type === L.name ? (t.id = this.parseIdent(), e && this.checkLVal(t.id, rn, !1)) : (e === !0 && this.unexpected(), t.id = null);
};
Gt.parseClassSuper = function(t) {
  t.superClass = this.eat(L._extends) ? this.parseExprSubscripts() : null;
};
Gt.parseExport = function(t, e) {
  if (this.next(), this.eat(L.star))
    return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (t.exported = this.parseIdent(!0), this.checkExport(e, t.exported.name, this.lastTokStart)) : t.exported = null), this.expectContextual("from"), this.type !== L.string && this.unexpected(), t.source = this.parseExprAtom(), this.semicolon(), this.finishNode(t, "ExportAllDeclaration");
  if (this.eat(L._default)) {
    this.checkExport(e, "default", this.lastTokStart);
    var n;
    if (this.type === L._function || (n = this.isAsyncFunction())) {
      var a = this.startNode();
      this.next(), n && this.next(), t.declaration = this.parseFunction(a, Ur | wf, !1, n);
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
      for (var h = 0, _ = t.specifiers; h < _.length; h += 1) {
        var v = _[h];
        this.checkUnreserved(v.local), this.checkLocalExport(v.local);
      }
      t.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(t, "ExportNamedDeclaration");
};
Gt.checkExport = function(t, e, n) {
  t && (aa(t, e) && this.raiseRecoverable(n, "Duplicate export '" + e + "'"), t[e] = !0);
};
Gt.checkPatternExport = function(t, e) {
  var n = e.type;
  if (n === "Identifier")
    this.checkExport(t, e.name, e.start);
  else if (n === "ObjectPattern")
    for (var a = 0, o = e.properties; a < o.length; a += 1) {
      var h = o[a];
      this.checkPatternExport(t, h);
    }
  else if (n === "ArrayPattern")
    for (var _ = 0, v = e.elements; _ < v.length; _ += 1) {
      var k = v[_];
      k && this.checkPatternExport(t, k);
    }
  else n === "Property" ? this.checkPatternExport(t, e.value) : n === "AssignmentPattern" ? this.checkPatternExport(t, e.left) : n === "RestElement" ? this.checkPatternExport(t, e.argument) : n === "ParenthesizedExpression" && this.checkPatternExport(t, e.expression);
};
Gt.checkVariableExport = function(t, e) {
  if (t)
    for (var n = 0, a = e; n < a.length; n += 1) {
      var o = a[n];
      this.checkPatternExport(t, o.id);
    }
};
Gt.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
Gt.parseExportSpecifiers = function(t) {
  var e = [], n = !0;
  for (this.expect(L.braceL); !this.eat(L.braceR); ) {
    if (n)
      n = !1;
    else if (this.expect(L.comma), this.afterTrailingComma(L.braceR))
      break;
    var a = this.startNode();
    a.local = this.parseIdent(!0), a.exported = this.eatContextual("as") ? this.parseIdent(!0) : a.local, this.checkExport(t, a.exported.name, a.exported.start), e.push(this.finishNode(a, "ExportSpecifier"));
  }
  return e;
};
Gt.parseImport = function(t) {
  return this.next(), this.type === L.string ? (t.specifiers = d_, t.source = this.parseExprAtom()) : (t.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), t.source = this.type === L.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(t, "ImportDeclaration");
};
Gt.parseImportSpecifiers = function() {
  var t = [], e = !0;
  if (this.type === L.name) {
    var n = this.startNode();
    if (n.local = this.parseIdent(), this.checkLVal(n.local, rn), t.push(this.finishNode(n, "ImportDefaultSpecifier")), !this.eat(L.comma))
      return t;
  }
  if (this.type === L.star) {
    var a = this.startNode();
    return this.next(), this.expectContextual("as"), a.local = this.parseIdent(), this.checkLVal(a.local, rn), t.push(this.finishNode(a, "ImportNamespaceSpecifier")), t;
  }
  for (this.expect(L.braceL); !this.eat(L.braceR); ) {
    if (e)
      e = !1;
    else if (this.expect(L.comma), this.afterTrailingComma(L.braceR))
      break;
    var o = this.startNode();
    o.imported = this.parseIdent(!0), this.eatContextual("as") ? o.local = this.parseIdent() : (this.checkUnreserved(o.imported), o.local = o.imported), this.checkLVal(o.local, rn), t.push(this.finishNode(o, "ImportSpecifier"));
  }
  return t;
};
Gt.adaptDirectivePrologue = function(t) {
  for (var e = 0; e < t.length && this.isDirectiveCandidate(t[e]); ++e)
    t[e].directive = t[e].expression.raw.slice(1, -1);
};
Gt.isDirectiveCandidate = function(t) {
  return t.type === "ExpressionStatement" && t.expression.type === "Literal" && typeof t.expression.value == "string" && // Reject parenthesized strings.
  (this.input[t.start] === '"' || this.input[t.start] === "'");
};
var un = ke.prototype;
un.toAssignable = function(t, e, n) {
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
        for (var a = 0, o = t.properties; a < o.length; a += 1) {
          var h = o[a];
          this.toAssignable(h, e), h.type === "RestElement" && (h.argument.type === "ArrayPattern" || h.argument.type === "ObjectPattern") && this.raise(h.argument.start, "Unexpected token");
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
un.toAssignableList = function(t, e) {
  for (var n = t.length, a = 0; a < n; a++) {
    var o = t[a];
    o && this.toAssignable(o, e);
  }
  if (n) {
    var h = t[n - 1];
    this.options.ecmaVersion === 6 && e && h && h.type === "RestElement" && h.argument.type !== "Identifier" && this.unexpected(h.argument.start);
  }
  return t;
};
un.parseSpread = function(t) {
  var e = this.startNode();
  return this.next(), e.argument = this.parseMaybeAssign(!1, t), this.finishNode(e, "SpreadElement");
};
un.parseRestBinding = function() {
  var t = this.startNode();
  return this.next(), this.options.ecmaVersion === 6 && this.type !== L.name && this.unexpected(), t.argument = this.parseBindingAtom(), this.finishNode(t, "RestElement");
};
un.parseBindingAtom = function() {
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
un.parseBindingList = function(t, e, n) {
  for (var a = [], o = !0; !this.eat(t); )
    if (o ? o = !1 : this.expect(L.comma), e && this.type === L.comma)
      a.push(null);
    else {
      if (n && this.afterTrailingComma(t))
        break;
      if (this.type === L.ellipsis) {
        var h = this.parseRestBinding();
        this.parseBindingListItem(h), a.push(h), this.type === L.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.expect(t);
        break;
      } else {
        var _ = this.parseMaybeDefault(this.start, this.startLoc);
        this.parseBindingListItem(_), a.push(_);
      }
    }
  return a;
};
un.parseBindingListItem = function(t) {
  return t;
};
un.parseMaybeDefault = function(t, e, n) {
  if (n = n || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(L.eq))
    return n;
  var a = this.startNodeAt(t, e);
  return a.left = n, a.right = this.parseMaybeAssign(), this.finishNode(a, "AssignmentPattern");
};
un.checkLVal = function(t, e, n) {
  switch (e === void 0 && (e = wl), t.type) {
    case "Identifier":
      e === rn && t.name === "let" && this.raiseRecoverable(t.start, "let is disallowed as a lexically bound name"), this.strict && this.reservedWordsStrictBind.test(t.name) && this.raiseRecoverable(t.start, (e ? "Binding " : "Assigning to ") + t.name + " in strict mode"), n && (aa(n, t.name) && this.raiseRecoverable(t.start, "Argument name clash"), n[t.name] = !0), e !== wl && e !== xf && this.declareName(t.name, e, t.start);
      break;
    case "ChainExpression":
      this.raiseRecoverable(t.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      e && this.raiseRecoverable(t.start, "Binding member expression");
      break;
    case "ObjectPattern":
      for (var a = 0, o = t.properties; a < o.length; a += 1) {
        var h = o[a];
        this.checkLVal(h, e, n);
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
var Xt = ke.prototype;
Xt.checkPropClash = function(t, e, n) {
  if (!(this.options.ecmaVersion >= 9 && t.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (t.computed || t.method || t.shorthand))) {
    var a = t.key, o;
    switch (a.type) {
      case "Identifier":
        o = a.name;
        break;
      case "Literal":
        o = String(a.value);
        break;
      default:
        return;
    }
    var h = t.kind;
    if (this.options.ecmaVersion >= 6) {
      o === "__proto__" && h === "init" && (e.proto && (n ? n.doubleProto < 0 && (n.doubleProto = a.start) : this.raiseRecoverable(a.start, "Redefinition of __proto__ property")), e.proto = !0);
      return;
    }
    o = "$" + o;
    var _ = e[o];
    if (_) {
      var v;
      h === "init" ? v = this.strict && _.init || _.get || _.set : v = _.init || _[h], v && this.raiseRecoverable(a.start, "Redefinition of property");
    } else
      _ = e[o] = {
        init: !1,
        get: !1,
        set: !1
      };
    _[h] = !0;
  }
};
Xt.parseExpression = function(t, e) {
  var n = this.start, a = this.startLoc, o = this.parseMaybeAssign(t, e);
  if (this.type === L.comma) {
    var h = this.startNodeAt(n, a);
    for (h.expressions = [o]; this.eat(L.comma); )
      h.expressions.push(this.parseMaybeAssign(t, e));
    return this.finishNode(h, "SequenceExpression");
  }
  return o;
};
Xt.parseMaybeAssign = function(t, e, n) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(t);
    this.exprAllowed = !1;
  }
  var a = !1, o = -1, h = -1;
  e ? (o = e.parenthesizedAssign, h = e.trailingComma, e.parenthesizedAssign = e.trailingComma = -1) : (e = new oa(), a = !0);
  var _ = this.start, v = this.startLoc;
  (this.type === L.parenL || this.type === L.name) && (this.potentialArrowAt = this.start);
  var k = this.parseMaybeConditional(t, e);
  if (n && (k = n.call(this, k, _, v)), this.type.isAssign) {
    var R = this.startNodeAt(_, v);
    return R.operator = this.value, R.left = this.type === L.eq ? this.toAssignable(k, !1, e) : k, a || (e.parenthesizedAssign = e.trailingComma = e.doubleProto = -1), e.shorthandAssign >= R.left.start && (e.shorthandAssign = -1), this.checkLVal(k), this.next(), R.right = this.parseMaybeAssign(t), this.finishNode(R, "AssignmentExpression");
  } else
    a && this.checkExpressionErrors(e, !0);
  return o > -1 && (e.parenthesizedAssign = o), h > -1 && (e.trailingComma = h), k;
};
Xt.parseMaybeConditional = function(t, e) {
  var n = this.start, a = this.startLoc, o = this.parseExprOps(t, e);
  if (this.checkExpressionErrors(e))
    return o;
  if (this.eat(L.question)) {
    var h = this.startNodeAt(n, a);
    return h.test = o, h.consequent = this.parseMaybeAssign(), this.expect(L.colon), h.alternate = this.parseMaybeAssign(t), this.finishNode(h, "ConditionalExpression");
  }
  return o;
};
Xt.parseExprOps = function(t, e) {
  var n = this.start, a = this.startLoc, o = this.parseMaybeUnary(e, !1);
  return this.checkExpressionErrors(e) || o.start === n && o.type === "ArrowFunctionExpression" ? o : this.parseExprOp(o, n, a, -1, t);
};
Xt.parseExprOp = function(t, e, n, a, o) {
  var h = this.type.binop;
  if (h != null && (!o || this.type !== L._in) && h > a) {
    var _ = this.type === L.logicalOR || this.type === L.logicalAND, v = this.type === L.coalesce;
    v && (h = L.logicalAND.binop);
    var k = this.value;
    this.next();
    var R = this.start, z = this.startLoc, U = this.parseExprOp(this.parseMaybeUnary(null, !1), R, z, h, o), et = this.buildBinary(e, n, t, U, k, _ || v);
    return (_ && this.type === L.coalesce || v && (this.type === L.logicalOR || this.type === L.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(et, e, n, a, o);
  }
  return t;
};
Xt.buildBinary = function(t, e, n, a, o, h) {
  var _ = this.startNodeAt(t, e);
  return _.left = n, _.operator = o, _.right = a, this.finishNode(_, h ? "LogicalExpression" : "BinaryExpression");
};
Xt.parseMaybeUnary = function(t, e) {
  var n = this.start, a = this.startLoc, o;
  if (this.isContextual("await") && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction))
    o = this.parseAwait(), e = !0;
  else if (this.type.prefix) {
    var h = this.startNode(), _ = this.type === L.incDec;
    h.operator = this.value, h.prefix = !0, this.next(), h.argument = this.parseMaybeUnary(null, !0), this.checkExpressionErrors(t, !0), _ ? this.checkLVal(h.argument) : this.strict && h.operator === "delete" && h.argument.type === "Identifier" ? this.raiseRecoverable(h.start, "Deleting local variable in strict mode") : e = !0, o = this.finishNode(h, _ ? "UpdateExpression" : "UnaryExpression");
  } else {
    if (o = this.parseExprSubscripts(t), this.checkExpressionErrors(t))
      return o;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var v = this.startNodeAt(n, a);
      v.operator = this.value, v.prefix = !1, v.argument = o, this.checkLVal(o), this.next(), o = this.finishNode(v, "UpdateExpression");
    }
  }
  return !e && this.eat(L.starstar) ? this.buildBinary(n, a, o, this.parseMaybeUnary(null, !1), "**", !1) : o;
};
Xt.parseExprSubscripts = function(t) {
  var e = this.start, n = this.startLoc, a = this.parseExprAtom(t);
  if (a.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    return a;
  var o = this.parseSubscripts(a, e, n);
  return t && o.type === "MemberExpression" && (t.parenthesizedAssign >= o.start && (t.parenthesizedAssign = -1), t.parenthesizedBind >= o.start && (t.parenthesizedBind = -1)), o;
};
Xt.parseSubscripts = function(t, e, n, a) {
  for (var o = this.options.ecmaVersion >= 8 && t.type === "Identifier" && t.name === "async" && this.lastTokEnd === t.end && !this.canInsertSemicolon() && t.end - t.start === 5 && this.potentialArrowAt === t.start, h = !1; ; ) {
    var _ = this.parseSubscript(t, e, n, a, o, h);
    if (_.optional && (h = !0), _ === t || _.type === "ArrowFunctionExpression") {
      if (h) {
        var v = this.startNodeAt(e, n);
        v.expression = _, _ = this.finishNode(v, "ChainExpression");
      }
      return _;
    }
    t = _;
  }
};
Xt.parseSubscript = function(t, e, n, a, o, h) {
  var _ = this.options.ecmaVersion >= 11, v = _ && this.eat(L.questionDot);
  a && v && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var k = this.eat(L.bracketL);
  if (k || v && this.type !== L.parenL && this.type !== L.backQuote || this.eat(L.dot)) {
    var R = this.startNodeAt(e, n);
    R.object = t, R.property = k ? this.parseExpression() : this.parseIdent(this.options.allowReserved !== "never"), R.computed = !!k, k && this.expect(L.bracketR), _ && (R.optional = v), t = this.finishNode(R, "MemberExpression");
  } else if (!a && this.eat(L.parenL)) {
    var z = new oa(), U = this.yieldPos, et = this.awaitPos, F = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var yt = this.parseExprList(L.parenR, this.options.ecmaVersion >= 8, !1, z);
    if (o && !v && !this.canInsertSemicolon() && this.eat(L.arrow))
      return this.checkPatternErrors(z, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = U, this.awaitPos = et, this.awaitIdentPos = F, this.parseArrowExpression(this.startNodeAt(e, n), yt, !0);
    this.checkExpressionErrors(z, !0), this.yieldPos = U || this.yieldPos, this.awaitPos = et || this.awaitPos, this.awaitIdentPos = F || this.awaitIdentPos;
    var it = this.startNodeAt(e, n);
    it.callee = t, it.arguments = yt, _ && (it.optional = v), t = this.finishNode(it, "CallExpression");
  } else if (this.type === L.backQuote) {
    (v || h) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var Tt = this.startNodeAt(e, n);
    Tt.tag = t, Tt.quasi = this.parseTemplate({ isTagged: !0 }), t = this.finishNode(Tt, "TaggedTemplateExpression");
  }
  return t;
};
Xt.parseExprAtom = function(t) {
  this.type === L.slash && this.readRegexp();
  var e, n = this.potentialArrowAt === this.start;
  switch (this.type) {
    case L._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), e = this.startNode(), this.next(), this.type === L.parenL && !this.allowDirectSuper && this.raise(e.start, "super() call outside constructor of a subclass"), this.type !== L.dot && this.type !== L.bracketL && this.type !== L.parenL && this.unexpected(), this.finishNode(e, "Super");
    case L._this:
      return e = this.startNode(), this.next(), this.finishNode(e, "ThisExpression");
    case L.name:
      var a = this.start, o = this.startLoc, h = this.containsEsc, _ = this.parseIdent(!1);
      if (this.options.ecmaVersion >= 8 && !h && _.name === "async" && !this.canInsertSemicolon() && this.eat(L._function))
        return this.parseFunction(this.startNodeAt(a, o), 0, !1, !0);
      if (n && !this.canInsertSemicolon()) {
        if (this.eat(L.arrow))
          return this.parseArrowExpression(this.startNodeAt(a, o), [_], !1);
        if (this.options.ecmaVersion >= 8 && _.name === "async" && this.type === L.name && !h)
          return _ = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(L.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(a, o), [_], !0);
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
      var k = this.start, R = this.parseParenAndDistinguishExpression(n);
      return t && (t.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(R) && (t.parenthesizedAssign = k), t.parenthesizedBind < 0 && (t.parenthesizedBind = k)), R;
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
Xt.parseExprImport = function() {
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
Xt.parseDynamicImport = function(t) {
  if (this.next(), t.source = this.parseMaybeAssign(), !this.eat(L.parenR)) {
    var e = this.start;
    this.eat(L.comma) && this.eat(L.parenR) ? this.raiseRecoverable(e, "Trailing comma is not allowed in import()") : this.unexpected(e);
  }
  return this.finishNode(t, "ImportExpression");
};
Xt.parseImportMeta = function(t) {
  this.next();
  var e = this.containsEsc;
  return t.property = this.parseIdent(!0), t.property.name !== "meta" && this.raiseRecoverable(t.property.start, "The only valid meta property for import is 'import.meta'"), e && this.raiseRecoverable(t.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && this.raiseRecoverable(t.start, "Cannot use 'import.meta' outside a module"), this.finishNode(t, "MetaProperty");
};
Xt.parseLiteral = function(t) {
  var e = this.startNode();
  return e.value = t, e.raw = this.input.slice(this.start, this.end), e.raw.charCodeAt(e.raw.length - 1) === 110 && (e.bigint = e.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(e, "Literal");
};
Xt.parseParenExpression = function() {
  this.expect(L.parenL);
  var t = this.parseExpression();
  return this.expect(L.parenR), t;
};
Xt.parseParenAndDistinguishExpression = function(t) {
  var e = this.start, n = this.startLoc, a, o = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var h = this.start, _ = this.startLoc, v = [], k = !0, R = !1, z = new oa(), U = this.yieldPos, et = this.awaitPos, F;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== L.parenR; )
      if (k ? k = !1 : this.expect(L.comma), o && this.afterTrailingComma(L.parenR, !0)) {
        R = !0;
        break;
      } else if (this.type === L.ellipsis) {
        F = this.start, v.push(this.parseParenItem(this.parseRestBinding())), this.type === L.comma && this.raise(this.start, "Comma is not permitted after the rest element");
        break;
      } else
        v.push(this.parseMaybeAssign(!1, z, this.parseParenItem));
    var yt = this.start, it = this.startLoc;
    if (this.expect(L.parenR), t && !this.canInsertSemicolon() && this.eat(L.arrow))
      return this.checkPatternErrors(z, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = U, this.awaitPos = et, this.parseParenArrowList(e, n, v);
    (!v.length || R) && this.unexpected(this.lastTokStart), F && this.unexpected(F), this.checkExpressionErrors(z, !0), this.yieldPos = U || this.yieldPos, this.awaitPos = et || this.awaitPos, v.length > 1 ? (a = this.startNodeAt(h, _), a.expressions = v, this.finishNodeAt(a, "SequenceExpression", yt, it)) : a = v[0];
  } else
    a = this.parseParenExpression();
  if (this.options.preserveParens) {
    var Tt = this.startNodeAt(e, n);
    return Tt.expression = a, this.finishNode(Tt, "ParenthesizedExpression");
  } else
    return a;
};
Xt.parseParenItem = function(t) {
  return t;
};
Xt.parseParenArrowList = function(t, e, n) {
  return this.parseArrowExpression(this.startNodeAt(t, e), n);
};
var p_ = [];
Xt.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var t = this.startNode(), e = this.parseIdent(!0);
  if (this.options.ecmaVersion >= 6 && this.eat(L.dot)) {
    t.meta = e;
    var n = this.containsEsc;
    return t.property = this.parseIdent(!0), t.property.name !== "target" && this.raiseRecoverable(t.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(t.start, "'new.target' must not contain escaped characters"), this.inNonArrowFunction() || this.raiseRecoverable(t.start, "'new.target' can only be used in functions"), this.finishNode(t, "MetaProperty");
  }
  var a = this.start, o = this.startLoc, h = this.type === L._import;
  return t.callee = this.parseSubscripts(this.parseExprAtom(), a, o, !0), h && t.callee.type === "ImportExpression" && this.raise(a, "Cannot use new with import()"), this.eat(L.parenL) ? t.arguments = this.parseExprList(L.parenR, this.options.ecmaVersion >= 8, !1) : t.arguments = p_, this.finishNode(t, "NewExpression");
};
Xt.parseTemplateElement = function(t) {
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
Xt.parseTemplate = function(t) {
  t === void 0 && (t = {});
  var e = t.isTagged;
  e === void 0 && (e = !1);
  var n = this.startNode();
  this.next(), n.expressions = [];
  var a = this.parseTemplateElement({ isTagged: e });
  for (n.quasis = [a]; !a.tail; )
    this.type === L.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(L.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(L.braceR), n.quasis.push(a = this.parseTemplateElement({ isTagged: e }));
  return this.next(), this.finishNode(n, "TemplateLiteral");
};
Xt.isAsyncProp = function(t) {
  return !t.computed && t.key.type === "Identifier" && t.key.name === "async" && (this.type === L.name || this.type === L.num || this.type === L.string || this.type === L.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === L.star) && !mi.test(this.input.slice(this.lastTokEnd, this.start));
};
Xt.parseObj = function(t, e) {
  var n = this.startNode(), a = !0, o = {};
  for (n.properties = [], this.next(); !this.eat(L.braceR); ) {
    if (a)
      a = !1;
    else if (this.expect(L.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(L.braceR))
      break;
    var h = this.parseProperty(t, e);
    t || this.checkPropClash(h, o, e), n.properties.push(h);
  }
  return this.finishNode(n, t ? "ObjectPattern" : "ObjectExpression");
};
Xt.parseProperty = function(t, e) {
  var n = this.startNode(), a, o, h, _;
  if (this.options.ecmaVersion >= 9 && this.eat(L.ellipsis))
    return t ? (n.argument = this.parseIdent(!1), this.type === L.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(n, "RestElement")) : (this.type === L.parenL && e && (e.parenthesizedAssign < 0 && (e.parenthesizedAssign = this.start), e.parenthesizedBind < 0 && (e.parenthesizedBind = this.start)), n.argument = this.parseMaybeAssign(!1, e), this.type === L.comma && e && e.trailingComma < 0 && (e.trailingComma = this.start), this.finishNode(n, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (t || e) && (h = this.start, _ = this.startLoc), t || (a = this.eat(L.star)));
  var v = this.containsEsc;
  return this.parsePropertyName(n), !t && !v && this.options.ecmaVersion >= 8 && !a && this.isAsyncProp(n) ? (o = !0, a = this.options.ecmaVersion >= 9 && this.eat(L.star), this.parsePropertyName(n, e)) : o = !1, this.parsePropertyValue(n, t, a, o, h, _, e, v), this.finishNode(n, "Property");
};
Xt.parsePropertyValue = function(t, e, n, a, o, h, _, v) {
  if ((n || a) && this.type === L.colon && this.unexpected(), this.eat(L.colon))
    t.value = e ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, _), t.kind = "init";
  else if (this.options.ecmaVersion >= 6 && this.type === L.parenL)
    e && this.unexpected(), t.kind = "init", t.method = !0, t.value = this.parseMethod(n, a);
  else if (!e && !v && this.options.ecmaVersion >= 5 && !t.computed && t.key.type === "Identifier" && (t.key.name === "get" || t.key.name === "set") && this.type !== L.comma && this.type !== L.braceR && this.type !== L.eq) {
    (n || a) && this.unexpected(), t.kind = t.key.name, this.parsePropertyName(t), t.value = this.parseMethod(!1);
    var k = t.kind === "get" ? 0 : 1;
    if (t.value.params.length !== k) {
      var R = t.value.start;
      t.kind === "get" ? this.raiseRecoverable(R, "getter should have no params") : this.raiseRecoverable(R, "setter should have exactly one param");
    } else
      t.kind === "set" && t.value.params[0].type === "RestElement" && this.raiseRecoverable(t.value.params[0].start, "Setter cannot use rest params");
  } else this.options.ecmaVersion >= 6 && !t.computed && t.key.type === "Identifier" ? ((n || a) && this.unexpected(), this.checkUnreserved(t.key), t.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = o), t.kind = "init", e ? t.value = this.parseMaybeDefault(o, h, t.key) : this.type === L.eq && _ ? (_.shorthandAssign < 0 && (_.shorthandAssign = this.start), t.value = this.parseMaybeDefault(o, h, t.key)) : t.value = t.key, t.shorthand = !0) : this.unexpected();
};
Xt.parsePropertyName = function(t) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(L.bracketL))
      return t.computed = !0, t.key = this.parseMaybeAssign(), this.expect(L.bracketR), t.key;
    t.computed = !1;
  }
  return t.key = this.type === L.num || this.type === L.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
Xt.initFunction = function(t) {
  t.id = null, this.options.ecmaVersion >= 6 && (t.generator = t.expression = !1), this.options.ecmaVersion >= 8 && (t.async = !1);
};
Xt.parseMethod = function(t, e, n) {
  var a = this.startNode(), o = this.yieldPos, h = this.awaitPos, _ = this.awaitIdentPos;
  return this.initFunction(a), this.options.ecmaVersion >= 6 && (a.generator = t), this.options.ecmaVersion >= 8 && (a.async = !!e), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(hu(e, a.generator) | mf | (n ? vf : 0)), this.expect(L.parenL), a.params = this.parseBindingList(L.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(a, !1, !0), this.yieldPos = o, this.awaitPos = h, this.awaitIdentPos = _, this.finishNode(a, "FunctionExpression");
};
Xt.parseArrowExpression = function(t, e, n) {
  var a = this.yieldPos, o = this.awaitPos, h = this.awaitIdentPos;
  return this.enterScope(hu(n, !1) | gf), this.initFunction(t), this.options.ecmaVersion >= 8 && (t.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, t.params = this.toAssignableList(e, !0), this.parseFunctionBody(t, !0, !1), this.yieldPos = a, this.awaitPos = o, this.awaitIdentPos = h, this.finishNode(t, "ArrowFunctionExpression");
};
Xt.parseFunctionBody = function(t, e, n) {
  var a = e && this.type !== L.braceL, o = this.strict, h = !1;
  if (a)
    t.body = this.parseMaybeAssign(), t.expression = !0, this.checkParams(t, !1);
  else {
    var _ = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(t.params);
    (!o || _) && (h = this.strictDirective(this.end), h && _ && this.raiseRecoverable(t.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
    var v = this.labels;
    this.labels = [], h && (this.strict = !0), this.checkParams(t, !o && !h && !e && !n && this.isSimpleParamList(t.params)), this.strict && t.id && this.checkLVal(t.id, xf), t.body = this.parseBlock(!1, void 0, h && !o), t.expression = !1, this.adaptDirectivePrologue(t.body.body), this.labels = v;
  }
  this.exitScope();
};
Xt.isSimpleParamList = function(t) {
  for (var e = 0, n = t; e < n.length; e += 1) {
    var a = n[e];
    if (a.type !== "Identifier")
      return !1;
  }
  return !0;
};
Xt.checkParams = function(t, e) {
  for (var n = {}, a = 0, o = t.params; a < o.length; a += 1) {
    var h = o[a];
    this.checkLVal(h, fu, e ? null : n);
  }
};
Xt.parseExprList = function(t, e, n, a) {
  for (var o = [], h = !0; !this.eat(t); ) {
    if (h)
      h = !1;
    else if (this.expect(L.comma), e && this.afterTrailingComma(t))
      break;
    var _ = void 0;
    n && this.type === L.comma ? _ = null : this.type === L.ellipsis ? (_ = this.parseSpread(a), a && this.type === L.comma && a.trailingComma < 0 && (a.trailingComma = this.start)) : _ = this.parseMaybeAssign(!1, a), o.push(_);
  }
  return o;
};
Xt.checkUnreserved = function(t) {
  var e = t.start, n = t.end, a = t.name;
  if (this.inGenerator && a === "yield" && this.raiseRecoverable(e, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && a === "await" && this.raiseRecoverable(e, "Cannot use 'await' as identifier inside an async function"), this.keywords.test(a) && this.raise(e, "Unexpected keyword '" + a + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(e, n).indexOf("\\") !== -1)) {
    var o = this.strict ? this.reservedWordsStrict : this.reservedWords;
    o.test(a) && (!this.inAsync && a === "await" && this.raiseRecoverable(e, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(e, "The keyword '" + a + "' is reserved"));
  }
};
Xt.parseIdent = function(t, e) {
  var n = this.startNode();
  return this.type === L.name ? n.name = this.value : this.type.keyword ? (n.name = this.type.keyword, (n.name === "class" || n.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop()) : this.unexpected(), this.next(!!t), this.finishNode(n, "Identifier"), t || (this.checkUnreserved(n), n.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = n.start)), n;
};
Xt.parseYield = function(t) {
  this.yieldPos || (this.yieldPos = this.start);
  var e = this.startNode();
  return this.next(), this.type === L.semi || this.canInsertSemicolon() || this.type !== L.star && !this.type.startsExpr ? (e.delegate = !1, e.argument = null) : (e.delegate = this.eat(L.star), e.argument = this.parseMaybeAssign(t)), this.finishNode(e, "YieldExpression");
};
Xt.parseAwait = function() {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeUnary(null, !1), this.finishNode(t, "AwaitExpression");
};
var js = ke.prototype;
js.raise = function(t, e) {
  var n = uu(this.input, t);
  e += " (" + n.line + ":" + n.column + ")";
  var a = new SyntaxError(e);
  throw a.pos = t, a.loc = n, a.raisedAt = this.pos, a;
};
js.raiseRecoverable = js.raise;
js.curPosition = function() {
  if (this.options.locations)
    return new xr(this.curLine, this.pos - this.lineStart);
};
var Pn = ke.prototype, g_ = function(e) {
  this.flags = e, this.var = [], this.lexical = [], this.functions = [];
};
Pn.enterScope = function(t) {
  this.scopeStack.push(new g_(t));
};
Pn.exitScope = function() {
  this.scopeStack.pop();
};
Pn.treatFunctionsAsVarInScope = function(t) {
  return t.flags & us || !this.inModule && t.flags & Qr;
};
Pn.declareName = function(t, e, n) {
  var a = !1;
  if (e === rn) {
    var o = this.currentScope();
    a = o.lexical.indexOf(t) > -1 || o.functions.indexOf(t) > -1 || o.var.indexOf(t) > -1, o.lexical.push(t), this.inModule && o.flags & Qr && delete this.undefinedExports[t];
  } else if (e === bf) {
    var h = this.currentScope();
    h.lexical.push(t);
  } else if (e === yf) {
    var _ = this.currentScope();
    this.treatFunctionsAsVar ? a = _.lexical.indexOf(t) > -1 : a = _.lexical.indexOf(t) > -1 || _.var.indexOf(t) > -1, _.functions.push(t);
  } else
    for (var v = this.scopeStack.length - 1; v >= 0; --v) {
      var k = this.scopeStack[v];
      if (k.lexical.indexOf(t) > -1 && !(k.flags & _f && k.lexical[0] === t) || !this.treatFunctionsAsVarInScope(k) && k.functions.indexOf(t) > -1) {
        a = !0;
        break;
      }
      if (k.var.push(t), this.inModule && k.flags & Qr && delete this.undefinedExports[t], k.flags & lu)
        break;
    }
  a && this.raiseRecoverable(n, "Identifier '" + t + "' has already been declared");
};
Pn.checkLocalExport = function(t) {
  this.scopeStack[0].lexical.indexOf(t.name) === -1 && this.scopeStack[0].var.indexOf(t.name) === -1 && (this.undefinedExports[t.name] = t);
};
Pn.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
Pn.currentVarScope = function() {
  for (var t = this.scopeStack.length - 1; ; t--) {
    var e = this.scopeStack[t];
    if (e.flags & lu)
      return e;
  }
};
Pn.currentThisScope = function() {
  for (var t = this.scopeStack.length - 1; ; t--) {
    var e = this.scopeStack[t];
    if (e.flags & lu && !(e.flags & gf))
      return e;
  }
};
var ua = function(e, n, a) {
  this.type = "", this.start = n, this.end = 0, e.options.locations && (this.loc = new os(e, a)), e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile), e.options.ranges && (this.range = [n, 0]);
}, la = ke.prototype;
la.startNode = function() {
  return new ua(this, this.start, this.startLoc);
};
la.startNodeAt = function(t, e) {
  return new ua(this, t, e);
};
function Sf(t, e, n, a) {
  return t.type = e, t.end = n, this.options.locations && (t.loc.end = a), this.options.ranges && (t.range[1] = n), t;
}
la.finishNode = function(t, e) {
  return Sf.call(this, t, e, this.lastTokEnd, this.lastTokEndLoc);
};
la.finishNodeAt = function(t, e, n, a) {
  return Sf.call(this, t, e, n, a);
};
var wi = function(e, n, a, o, h) {
  this.token = e, this.isExpr = !!n, this.preserveSpace = !!a, this.override = o, this.generator = !!h;
}, Ae = {
  b_stat: new wi("{", !1),
  b_expr: new wi("{", !0),
  b_tmpl: new wi("${", !1),
  p_stat: new wi("(", !1),
  p_expr: new wi("(", !0),
  q_tmpl: new wi("`", !0, !0, function(t) {
    return t.tryReadTemplateToken();
  }),
  f_stat: new wi("function", !1),
  f_expr: new wi("function", !0),
  f_expr_gen: new wi("function", !0, !1, null, !0),
  f_gen: new wi("function", !1, !1, null, !0)
}, ha = ke.prototype;
ha.initialContext = function() {
  return [Ae.b_stat];
};
ha.braceIsBlock = function(t) {
  var e = this.curContext();
  return e === Ae.f_expr || e === Ae.f_stat ? !0 : t === L.colon && (e === Ae.b_stat || e === Ae.b_expr) ? !e.isExpr : t === L._return || t === L.name && this.exprAllowed ? mi.test(this.input.slice(this.lastTokEnd, this.start)) : t === L._else || t === L.semi || t === L.eof || t === L.parenR || t === L.arrow ? !0 : t === L.braceL ? e === Ae.b_stat : t === L._var || t === L._const || t === L.name ? !1 : !this.exprAllowed;
};
ha.inGeneratorContext = function() {
  for (var t = this.context.length - 1; t >= 1; t--) {
    var e = this.context[t];
    if (e.token === "function")
      return e.generator;
  }
  return !1;
};
ha.updateContext = function(t) {
  var e, n = this.type;
  n.keyword && t === L.dot ? this.exprAllowed = !1 : (e = n.updateContext) ? e.call(this, t) : this.exprAllowed = n.beforeExpr;
};
L.parenR.updateContext = L.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = !0;
    return;
  }
  var t = this.context.pop();
  t === Ae.b_stat && this.curContext().token === "function" && (t = this.context.pop()), this.exprAllowed = !t.isExpr;
};
L.braceL.updateContext = function(t) {
  this.context.push(this.braceIsBlock(t) ? Ae.b_stat : Ae.b_expr), this.exprAllowed = !0;
};
L.dollarBraceL.updateContext = function() {
  this.context.push(Ae.b_tmpl), this.exprAllowed = !0;
};
L.parenL.updateContext = function(t) {
  var e = t === L._if || t === L._for || t === L._with || t === L._while;
  this.context.push(e ? Ae.p_stat : Ae.p_expr), this.exprAllowed = !0;
};
L.incDec.updateContext = function() {
};
L._function.updateContext = L._class.updateContext = function(t) {
  t.beforeExpr && t !== L.semi && t !== L._else && !(t === L._return && mi.test(this.input.slice(this.lastTokEnd, this.start))) && !((t === L.colon || t === L.braceL) && this.curContext() === Ae.b_stat) ? this.context.push(Ae.f_expr) : this.context.push(Ae.f_stat), this.exprAllowed = !1;
};
L.backQuote.updateContext = function() {
  this.curContext() === Ae.q_tmpl ? this.context.pop() : this.context.push(Ae.q_tmpl), this.exprAllowed = !1;
};
L.star.updateContext = function(t) {
  if (t === L._function) {
    var e = this.context.length - 1;
    this.context[e] === Ae.f_expr ? this.context[e] = Ae.f_expr_gen : this.context[e] = Ae.f_gen;
  }
  this.exprAllowed = !0;
};
L.name.updateContext = function(t) {
  var e = !1;
  this.options.ecmaVersion >= 6 && t !== L.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (e = !0), this.exprAllowed = e;
};
var Cf = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", If = Cf + " Extended_Pictographic", __ = If, m_ = {
  9: Cf,
  10: If,
  11: __
}, Sl = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", kf = "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", Af = kf + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", v_ = Af + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", y_ = {
  9: kf,
  10: Af,
  11: v_
}, Pf = {};
function du(t) {
  var e = Pf[t] = {
    binary: Un(m_[t] + " " + Sl),
    nonBinary: {
      General_Category: Un(Sl),
      Script: Un(y_[t])
    }
  };
  e.nonBinary.Script_Extensions = e.nonBinary.Script, e.nonBinary.gc = e.nonBinary.General_Category, e.nonBinary.sc = e.nonBinary.Script, e.nonBinary.scx = e.nonBinary.Script_Extensions;
}
du(9);
du(10);
du(11);
var Nt = ke.prototype, ln = function(e) {
  this.parser = e, this.validFlags = "gim" + (e.options.ecmaVersion >= 6 ? "uy" : "") + (e.options.ecmaVersion >= 9 ? "s" : ""), this.unicodeProperties = Pf[e.options.ecmaVersion >= 11 ? 11 : e.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = [], this.backReferenceNames = [];
};
ln.prototype.reset = function(e, n, a) {
  var o = a.indexOf("u") !== -1;
  this.start = e | 0, this.source = n + "", this.flags = a, this.switchU = o && this.parser.options.ecmaVersion >= 6, this.switchN = o && this.parser.options.ecmaVersion >= 9;
};
ln.prototype.raise = function(e) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e);
};
ln.prototype.at = function(e, n) {
  n === void 0 && (n = !1);
  var a = this.source, o = a.length;
  if (e >= o)
    return -1;
  var h = a.charCodeAt(e);
  if (!(n || this.switchU) || h <= 55295 || h >= 57344 || e + 1 >= o)
    return h;
  var _ = a.charCodeAt(e + 1);
  return _ >= 56320 && _ <= 57343 ? (h << 10) + _ - 56613888 : h;
};
ln.prototype.nextIndex = function(e, n) {
  n === void 0 && (n = !1);
  var a = this.source, o = a.length;
  if (e >= o)
    return o;
  var h = a.charCodeAt(e), _;
  return !(n || this.switchU) || h <= 55295 || h >= 57344 || e + 1 >= o || (_ = a.charCodeAt(e + 1)) < 56320 || _ > 57343 ? e + 1 : e + 2;
};
ln.prototype.current = function(e) {
  return e === void 0 && (e = !1), this.at(this.pos, e);
};
ln.prototype.lookahead = function(e) {
  return e === void 0 && (e = !1), this.at(this.nextIndex(this.pos, e), e);
};
ln.prototype.advance = function(e) {
  e === void 0 && (e = !1), this.pos = this.nextIndex(this.pos, e);
};
ln.prototype.eat = function(e, n) {
  return n === void 0 && (n = !1), this.current(n) === e ? (this.advance(n), !0) : !1;
};
function Hs(t) {
  return t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10) + 55296, (t & 1023) + 56320));
}
Nt.validateRegExpFlags = function(t) {
  for (var e = t.validFlags, n = t.flags, a = 0; a < n.length; a++) {
    var o = n.charAt(a);
    e.indexOf(o) === -1 && this.raise(t.start, "Invalid regular expression flag"), n.indexOf(o, a + 1) > -1 && this.raise(t.start, "Duplicate regular expression flag");
  }
};
Nt.validateRegExpPattern = function(t) {
  this.regexp_pattern(t), !t.switchN && this.options.ecmaVersion >= 9 && t.groupNames.length > 0 && (t.switchN = !0, this.regexp_pattern(t));
};
Nt.regexp_pattern = function(t) {
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
    var a = n[e];
    t.groupNames.indexOf(a) === -1 && t.raise("Invalid named capture referenced");
  }
};
Nt.regexp_disjunction = function(t) {
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
Nt.regexp_alternative = function(t) {
  for (; t.pos < t.source.length && this.regexp_eatTerm(t); )
    ;
};
Nt.regexp_eatTerm = function(t) {
  return this.regexp_eatAssertion(t) ? (t.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(t) && t.switchU && t.raise("Invalid quantifier"), !0) : (t.switchU ? this.regexp_eatAtom(t) : this.regexp_eatExtendedAtom(t)) ? (this.regexp_eatQuantifier(t), !0) : !1;
};
Nt.regexp_eatAssertion = function(t) {
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
Nt.regexp_eatQuantifier = function(t, e) {
  return e === void 0 && (e = !1), this.regexp_eatQuantifierPrefix(t, e) ? (t.eat(
    63
    /* ? */
  ), !0) : !1;
};
Nt.regexp_eatQuantifierPrefix = function(t, e) {
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
Nt.regexp_eatBracedQuantifier = function(t, e) {
  var n = t.pos;
  if (t.eat(
    123
    /* { */
  )) {
    var a = 0, o = -1;
    if (this.regexp_eatDecimalDigits(t) && (a = t.lastIntValue, t.eat(
      44
      /* , */
    ) && this.regexp_eatDecimalDigits(t) && (o = t.lastIntValue), t.eat(
      125
      /* } */
    )))
      return o !== -1 && o < a && !e && t.raise("numbers out of order in {} quantifier"), !0;
    t.switchU && !e && t.raise("Incomplete quantifier"), t.pos = n;
  }
  return !1;
};
Nt.regexp_eatAtom = function(t) {
  return this.regexp_eatPatternCharacters(t) || t.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(t) || this.regexp_eatCharacterClass(t) || this.regexp_eatUncapturingGroup(t) || this.regexp_eatCapturingGroup(t);
};
Nt.regexp_eatReverseSolidusAtomEscape = function(t) {
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
Nt.regexp_eatUncapturingGroup = function(t) {
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
Nt.regexp_eatCapturingGroup = function(t) {
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
Nt.regexp_eatExtendedAtom = function(t) {
  return t.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(t) || this.regexp_eatCharacterClass(t) || this.regexp_eatUncapturingGroup(t) || this.regexp_eatCapturingGroup(t) || this.regexp_eatInvalidBracedQuantifier(t) || this.regexp_eatExtendedPatternCharacter(t);
};
Nt.regexp_eatInvalidBracedQuantifier = function(t) {
  return this.regexp_eatBracedQuantifier(t, !0) && t.raise("Nothing to repeat"), !1;
};
Nt.regexp_eatSyntaxCharacter = function(t) {
  var e = t.current();
  return Tf(e) ? (t.lastIntValue = e, t.advance(), !0) : !1;
};
function Tf(t) {
  return t === 36 || t >= 40 && t <= 43 || t === 46 || t === 63 || t >= 91 && t <= 94 || t >= 123 && t <= 125;
}
Nt.regexp_eatPatternCharacters = function(t) {
  for (var e = t.pos, n = 0; (n = t.current()) !== -1 && !Tf(n); )
    t.advance();
  return t.pos !== e;
};
Nt.regexp_eatExtendedPatternCharacter = function(t) {
  var e = t.current();
  return e !== -1 && e !== 36 && !(e >= 40 && e <= 43) && e !== 46 && e !== 63 && e !== 91 && e !== 94 && e !== 124 ? (t.advance(), !0) : !1;
};
Nt.regexp_groupSpecifier = function(t) {
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
Nt.regexp_eatGroupName = function(t) {
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
Nt.regexp_eatRegExpIdentifierName = function(t) {
  if (t.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(t)) {
    for (t.lastStringValue += Hs(t.lastIntValue); this.regexp_eatRegExpIdentifierPart(t); )
      t.lastStringValue += Hs(t.lastIntValue);
    return !0;
  }
  return !1;
};
Nt.regexp_eatRegExpIdentifierStart = function(t) {
  var e = t.pos, n = this.options.ecmaVersion >= 11, a = t.current(n);
  return t.advance(n), a === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(t, n) && (a = t.lastIntValue), b_(a) ? (t.lastIntValue = a, !0) : (t.pos = e, !1);
};
function b_(t) {
  return sn(t, !0) || t === 36 || t === 95;
}
Nt.regexp_eatRegExpIdentifierPart = function(t) {
  var e = t.pos, n = this.options.ecmaVersion >= 11, a = t.current(n);
  return t.advance(n), a === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(t, n) && (a = t.lastIntValue), x_(a) ? (t.lastIntValue = a, !0) : (t.pos = e, !1);
};
function x_(t) {
  return Yn(t, !0) || t === 36 || t === 95 || t === 8204 || t === 8205;
}
Nt.regexp_eatAtomEscape = function(t) {
  return this.regexp_eatBackReference(t) || this.regexp_eatCharacterClassEscape(t) || this.regexp_eatCharacterEscape(t) || t.switchN && this.regexp_eatKGroupName(t) ? !0 : (t.switchU && (t.current() === 99 && t.raise("Invalid unicode escape"), t.raise("Invalid escape")), !1);
};
Nt.regexp_eatBackReference = function(t) {
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
Nt.regexp_eatKGroupName = function(t) {
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
Nt.regexp_eatCharacterEscape = function(t) {
  return this.regexp_eatControlEscape(t) || this.regexp_eatCControlLetter(t) || this.regexp_eatZero(t) || this.regexp_eatHexEscapeSequence(t) || this.regexp_eatRegExpUnicodeEscapeSequence(t, !1) || !t.switchU && this.regexp_eatLegacyOctalEscapeSequence(t) || this.regexp_eatIdentityEscape(t);
};
Nt.regexp_eatCControlLetter = function(t) {
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
Nt.regexp_eatZero = function(t) {
  return t.current() === 48 && !fa(t.lookahead()) ? (t.lastIntValue = 0, t.advance(), !0) : !1;
};
Nt.regexp_eatControlEscape = function(t) {
  var e = t.current();
  return e === 116 ? (t.lastIntValue = 9, t.advance(), !0) : e === 110 ? (t.lastIntValue = 10, t.advance(), !0) : e === 118 ? (t.lastIntValue = 11, t.advance(), !0) : e === 102 ? (t.lastIntValue = 12, t.advance(), !0) : e === 114 ? (t.lastIntValue = 13, t.advance(), !0) : !1;
};
Nt.regexp_eatControlLetter = function(t) {
  var e = t.current();
  return Ef(e) ? (t.lastIntValue = e % 32, t.advance(), !0) : !1;
};
function Ef(t) {
  return t >= 65 && t <= 90 || t >= 97 && t <= 122;
}
Nt.regexp_eatRegExpUnicodeEscapeSequence = function(t, e) {
  e === void 0 && (e = !1);
  var n = t.pos, a = e || t.switchU;
  if (t.eat(
    117
    /* u */
  )) {
    if (this.regexp_eatFixedHexDigits(t, 4)) {
      var o = t.lastIntValue;
      if (a && o >= 55296 && o <= 56319) {
        var h = t.pos;
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
        t.pos = h, t.lastIntValue = o;
      }
      return !0;
    }
    if (a && t.eat(
      123
      /* { */
    ) && this.regexp_eatHexDigits(t) && t.eat(
      125
      /* } */
    ) && w_(t.lastIntValue))
      return !0;
    a && t.raise("Invalid unicode escape"), t.pos = n;
  }
  return !1;
};
function w_(t) {
  return t >= 0 && t <= 1114111;
}
Nt.regexp_eatIdentityEscape = function(t) {
  if (t.switchU)
    return this.regexp_eatSyntaxCharacter(t) ? !0 : t.eat(
      47
      /* / */
    ) ? (t.lastIntValue = 47, !0) : !1;
  var e = t.current();
  return e !== 99 && (!t.switchN || e !== 107) ? (t.lastIntValue = e, t.advance(), !0) : !1;
};
Nt.regexp_eatDecimalEscape = function(t) {
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
Nt.regexp_eatCharacterClassEscape = function(t) {
  var e = t.current();
  if (S_(e))
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
function S_(t) {
  return t === 100 || t === 68 || t === 115 || t === 83 || t === 119 || t === 87;
}
Nt.regexp_eatUnicodePropertyValueExpression = function(t) {
  var e = t.pos;
  if (this.regexp_eatUnicodePropertyName(t) && t.eat(
    61
    /* = */
  )) {
    var n = t.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(t)) {
      var a = t.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(t, n, a), !0;
    }
  }
  if (t.pos = e, this.regexp_eatLoneUnicodePropertyNameOrValue(t)) {
    var o = t.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(t, o), !0;
  }
  return !1;
};
Nt.regexp_validateUnicodePropertyNameAndValue = function(t, e, n) {
  aa(t.unicodeProperties.nonBinary, e) || t.raise("Invalid property name"), t.unicodeProperties.nonBinary[e].test(n) || t.raise("Invalid property value");
};
Nt.regexp_validateUnicodePropertyNameOrValue = function(t, e) {
  t.unicodeProperties.binary.test(e) || t.raise("Invalid property name");
};
Nt.regexp_eatUnicodePropertyName = function(t) {
  var e = 0;
  for (t.lastStringValue = ""; Of(e = t.current()); )
    t.lastStringValue += Hs(e), t.advance();
  return t.lastStringValue !== "";
};
function Of(t) {
  return Ef(t) || t === 95;
}
Nt.regexp_eatUnicodePropertyValue = function(t) {
  var e = 0;
  for (t.lastStringValue = ""; C_(e = t.current()); )
    t.lastStringValue += Hs(e), t.advance();
  return t.lastStringValue !== "";
};
function C_(t) {
  return Of(t) || fa(t);
}
Nt.regexp_eatLoneUnicodePropertyNameOrValue = function(t) {
  return this.regexp_eatUnicodePropertyValue(t);
};
Nt.regexp_eatCharacterClass = function(t) {
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
Nt.regexp_classRanges = function(t) {
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
Nt.regexp_eatClassAtom = function(t) {
  var e = t.pos;
  if (t.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatClassEscape(t))
      return !0;
    if (t.switchU) {
      var n = t.current();
      (n === 99 || Nf(n)) && t.raise("Invalid class escape"), t.raise("Invalid escape");
    }
    t.pos = e;
  }
  var a = t.current();
  return a !== 93 ? (t.lastIntValue = a, t.advance(), !0) : !1;
};
Nt.regexp_eatClassEscape = function(t) {
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
Nt.regexp_eatClassControlLetter = function(t) {
  var e = t.current();
  return fa(e) || e === 95 ? (t.lastIntValue = e % 32, t.advance(), !0) : !1;
};
Nt.regexp_eatHexEscapeSequence = function(t) {
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
Nt.regexp_eatDecimalDigits = function(t) {
  var e = t.pos, n = 0;
  for (t.lastIntValue = 0; fa(n = t.current()); )
    t.lastIntValue = 10 * t.lastIntValue + (n - 48), t.advance();
  return t.pos !== e;
};
function fa(t) {
  return t >= 48 && t <= 57;
}
Nt.regexp_eatHexDigits = function(t) {
  var e = t.pos, n = 0;
  for (t.lastIntValue = 0; Mf(n = t.current()); )
    t.lastIntValue = 16 * t.lastIntValue + Lf(n), t.advance();
  return t.pos !== e;
};
function Mf(t) {
  return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102;
}
function Lf(t) {
  return t >= 65 && t <= 70 ? 10 + (t - 65) : t >= 97 && t <= 102 ? 10 + (t - 97) : t - 48;
}
Nt.regexp_eatLegacyOctalEscapeSequence = function(t) {
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
Nt.regexp_eatOctalDigit = function(t) {
  var e = t.current();
  return Nf(e) ? (t.lastIntValue = e - 48, t.advance(), !0) : (t.lastIntValue = 0, !1);
};
function Nf(t) {
  return t >= 48 && t <= 55;
}
Nt.regexp_eatFixedHexDigits = function(t, e) {
  var n = t.pos;
  t.lastIntValue = 0;
  for (var a = 0; a < e; ++a) {
    var o = t.current();
    if (!Mf(o))
      return t.pos = n, !1;
    t.lastIntValue = 16 * t.lastIntValue + Lf(o), t.advance();
  }
  return !0;
};
var ca = function(e) {
  this.type = e.type, this.value = e.value, this.start = e.start, this.end = e.end, e.options.locations && (this.loc = new os(e, e.startLoc, e.endLoc)), e.options.ranges && (this.range = [e.start, e.end]);
}, ee = ke.prototype;
ee.next = function(t) {
  !t && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new ca(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
};
ee.getToken = function() {
  return this.next(), new ca(this);
};
typeof Symbol < "u" && (ee[Symbol.iterator] = function() {
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
ee.curContext = function() {
  return this.context[this.context.length - 1];
};
ee.nextToken = function() {
  var t = this.curContext();
  if ((!t || !t.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
    return this.finishToken(L.eof);
  if (t.override)
    return t.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
ee.readToken = function(t) {
  return sn(t, this.options.ecmaVersion >= 6) || t === 92 ? this.readWord() : this.getTokenFromCode(t);
};
ee.fullCharCodeAtPos = function() {
  var t = this.input.charCodeAt(this.pos);
  if (t <= 55295 || t >= 57344)
    return t;
  var e = this.input.charCodeAt(this.pos + 1);
  return (t << 10) + e - 56613888;
};
ee.skipBlockComment = function() {
  var t = this.options.onComment && this.curPosition(), e = this.pos, n = this.input.indexOf("*/", this.pos += 2);
  if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations) {
    br.lastIndex = e;
    for (var a; (a = br.exec(this.input)) && a.index < this.pos; )
      ++this.curLine, this.lineStart = a.index + a[0].length;
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
ee.skipLineComment = function(t) {
  for (var e = this.pos, n = this.options.onComment && this.curPosition(), a = this.input.charCodeAt(this.pos += t); this.pos < this.input.length && !Ir(a); )
    a = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(
    !1,
    this.input.slice(e + t, this.pos),
    e,
    this.pos,
    n,
    this.curPosition()
  );
};
ee.skipSpace = function() {
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
        if (t > 8 && t < 14 || t >= 5760 && ou.test(String.fromCharCode(t)))
          ++this.pos;
        else
          break t;
    }
  }
};
ee.finishToken = function(t, e) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var n = this.type;
  this.type = t, this.value = e, this.updateContext(n);
};
ee.readToken_dot = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t >= 48 && t <= 57)
    return this.readNumber(!0);
  var e = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && t === 46 && e === 46 ? (this.pos += 3, this.finishToken(L.ellipsis)) : (++this.pos, this.finishToken(L.dot));
};
ee.readToken_slash = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : t === 61 ? this.finishOp(L.assign, 2) : this.finishOp(L.slash, 1);
};
ee.readToken_mult_modulo_exp = function(t) {
  var e = this.input.charCodeAt(this.pos + 1), n = 1, a = t === 42 ? L.star : L.modulo;
  return this.options.ecmaVersion >= 7 && t === 42 && e === 42 && (++n, a = L.starstar, e = this.input.charCodeAt(this.pos + 2)), e === 61 ? this.finishOp(L.assign, n + 1) : this.finishOp(a, n);
};
ee.readToken_pipe_amp = function(t) {
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
ee.readToken_caret = function() {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61 ? this.finishOp(L.assign, 2) : this.finishOp(L.bitwiseXOR, 1);
};
ee.readToken_plus_min = function(t) {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === t ? e === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || mi.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(L.incDec, 2) : e === 61 ? this.finishOp(L.assign, 2) : this.finishOp(L.plusMin, 1);
};
ee.readToken_lt_gt = function(t) {
  var e = this.input.charCodeAt(this.pos + 1), n = 1;
  return e === t ? (n = t === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(L.assign, n + 1) : this.finishOp(L.bitShift, n)) : e === 33 && t === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (e === 61 && (n = 2), this.finishOp(L.relational, n));
};
ee.readToken_eq_excl = function(t) {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(L.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : t === 61 && e === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(L.arrow)) : this.finishOp(t === 61 ? L.eq : L.prefix, 1);
};
ee.readToken_question = function() {
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
        var a = this.input.charCodeAt(this.pos + 2);
        if (a === 61)
          return this.finishOp(L.assign, 3);
      }
      return this.finishOp(L.coalesce, 2);
    }
  }
  return this.finishOp(L.question, 1);
};
ee.getTokenFromCode = function(t) {
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
  this.raise(this.pos, "Unexpected character '" + pu(t) + "'");
};
ee.finishOp = function(t, e) {
  var n = this.input.slice(this.pos, this.pos + e);
  return this.pos += e, this.finishToken(t, n);
};
ee.readRegexp = function() {
  for (var t, e, n = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(n, "Unterminated regular expression");
    var a = this.input.charAt(this.pos);
    if (mi.test(a) && this.raise(n, "Unterminated regular expression"), t)
      t = !1;
    else {
      if (a === "[")
        e = !0;
      else if (a === "]" && e)
        e = !1;
      else if (a === "/" && !e)
        break;
      t = a === "\\";
    }
    ++this.pos;
  }
  var o = this.input.slice(n, this.pos);
  ++this.pos;
  var h = this.pos, _ = this.readWord1();
  this.containsEsc && this.unexpected(h);
  var v = this.regexpState || (this.regexpState = new ln(this));
  v.reset(n, o, _), this.validateRegExpFlags(v), this.validateRegExpPattern(v);
  var k = null;
  try {
    k = new RegExp(o, _);
  } catch {
  }
  return this.finishToken(L.regexp, { pattern: o, flags: _, value: k });
};
ee.readInt = function(t, e, n) {
  for (var a = this.options.ecmaVersion >= 12 && e === void 0, o = n && this.input.charCodeAt(this.pos) === 48, h = this.pos, _ = 0, v = 0, k = 0, R = e ?? 1 / 0; k < R; ++k, ++this.pos) {
    var z = this.input.charCodeAt(this.pos), U = void 0;
    if (a && z === 95) {
      o && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), v === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), k === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), v = z;
      continue;
    }
    if (z >= 97 ? U = z - 97 + 10 : z >= 65 ? U = z - 65 + 10 : z >= 48 && z <= 57 ? U = z - 48 : U = 1 / 0, U >= t)
      break;
    v = z, _ = _ * t + U;
  }
  return a && v === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === h || e != null && this.pos - h !== e ? null : _;
};
function I_(t, e) {
  return e ? parseInt(t, 8) : parseFloat(t.replace(/_/g, ""));
}
function Rf(t) {
  return typeof BigInt != "function" ? null : BigInt(t.replace(/_/g, ""));
}
ee.readRadixNumber = function(t) {
  var e = this.pos;
  this.pos += 2;
  var n = this.readInt(t);
  return n == null && this.raise(this.start + 2, "Expected number in radix " + t), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = Rf(this.input.slice(e, this.pos)), ++this.pos) : sn(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(L.num, n);
};
ee.readNumber = function(t) {
  var e = this.pos;
  !t && this.readInt(10, void 0, !0) === null && this.raise(e, "Invalid number");
  var n = this.pos - e >= 2 && this.input.charCodeAt(e) === 48;
  n && this.strict && this.raise(e, "Invalid number");
  var a = this.input.charCodeAt(this.pos);
  if (!n && !t && this.options.ecmaVersion >= 11 && a === 110) {
    var o = Rf(this.input.slice(e, this.pos));
    return ++this.pos, sn(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(L.num, o);
  }
  n && /[89]/.test(this.input.slice(e, this.pos)) && (n = !1), a === 46 && !n && (++this.pos, this.readInt(10), a = this.input.charCodeAt(this.pos)), (a === 69 || a === 101) && !n && (a = this.input.charCodeAt(++this.pos), (a === 43 || a === 45) && ++this.pos, this.readInt(10) === null && this.raise(e, "Invalid number")), sn(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var h = I_(this.input.slice(e, this.pos), n);
  return this.finishToken(L.num, h);
};
ee.readCodePoint = function() {
  var t = this.input.charCodeAt(this.pos), e;
  if (t === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var n = ++this.pos;
    e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, e > 1114111 && this.invalidStringToken(n, "Code point out of bounds");
  } else
    e = this.readHexChar(4);
  return e;
};
function pu(t) {
  return t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10) + 55296, (t & 1023) + 56320));
}
ee.readString = function(t) {
  for (var e = "", n = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var a = this.input.charCodeAt(this.pos);
    if (a === t)
      break;
    a === 92 ? (e += this.input.slice(n, this.pos), e += this.readEscapedChar(!1), n = this.pos) : (Ir(a, this.options.ecmaVersion >= 10) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return e += this.input.slice(n, this.pos++), this.finishToken(L.string, e);
};
var Ff = {};
ee.tryReadTemplateToken = function() {
  this.inTemplateElement = !0;
  try {
    this.readTmplToken();
  } catch (t) {
    if (t === Ff)
      this.readInvalidTemplateToken();
    else
      throw t;
  }
  this.inTemplateElement = !1;
};
ee.invalidStringToken = function(t, e) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw Ff;
  this.raise(t, e);
};
ee.readTmplToken = function() {
  for (var t = "", e = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var n = this.input.charCodeAt(this.pos);
    if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      return this.pos === this.start && (this.type === L.template || this.type === L.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(L.dollarBraceL)) : (++this.pos, this.finishToken(L.backQuote)) : (t += this.input.slice(e, this.pos), this.finishToken(L.template, t));
    if (n === 92)
      t += this.input.slice(e, this.pos), t += this.readEscapedChar(!0), e = this.pos;
    else if (Ir(n)) {
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
ee.readInvalidTemplateToken = function() {
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
ee.readEscapedChar = function(t) {
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
      return pu(this.readCodePoint());
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
        var a = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], o = parseInt(a, 8);
        return o > 255 && (a = a.slice(0, -1), o = parseInt(a, 8)), this.pos += a.length - 1, e = this.input.charCodeAt(this.pos), (a !== "0" || e === 56 || e === 57) && (this.strict || t) && this.invalidStringToken(
          this.pos - 1 - a.length,
          t ? "Octal literal in template string" : "Octal literal in strict mode"
        ), String.fromCharCode(o);
      }
      return Ir(e) ? "" : String.fromCharCode(e);
  }
};
ee.readHexChar = function(t) {
  var e = this.pos, n = this.readInt(16, t);
  return n === null && this.invalidStringToken(e, "Bad character escape sequence"), n;
};
ee.readWord1 = function() {
  this.containsEsc = !1;
  for (var t = "", e = !0, n = this.pos, a = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var o = this.fullCharCodeAtPos();
    if (Yn(o, a))
      this.pos += o <= 65535 ? 1 : 2;
    else if (o === 92) {
      this.containsEsc = !0, t += this.input.slice(n, this.pos);
      var h = this.pos;
      this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var _ = this.readCodePoint();
      (e ? sn : Yn)(_, a) || this.invalidStringToken(h, "Invalid Unicode escape"), t += pu(_), n = this.pos;
    } else
      break;
    e = !1;
  }
  return t + this.input.slice(n, this.pos);
};
ee.readWord = function() {
  var t = this.readWord1(), e = L.name;
  return this.keywords.test(t) && (e = sa[t]), this.finishToken(e, t);
};
var zf = "7.4.1";
ke.acorn = {
  Parser: ke,
  version: zf,
  defaultOptions: Us,
  Position: xr,
  SourceLocation: os,
  getLineInfo: uu,
  Node: ua,
  TokenType: le,
  tokTypes: L,
  keywordTypes: sa,
  TokContext: wi,
  tokContexts: Ae,
  isIdentifierChar: Yn,
  isIdentifierStart: sn,
  Token: ca,
  isNewLine: Ir,
  lineBreak: mi,
  lineBreakG: br,
  nonASCIIwhitespace: ou
};
function k_(t, e) {
  return ke.parse(t, e);
}
function A_(t, e, n) {
  return ke.parseExpressionAt(t, e, n);
}
function P_(t, e) {
  return ke.tokenizer(t, e);
}
const T_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Node: ua,
  Parser: ke,
  Position: xr,
  SourceLocation: os,
  TokContext: wi,
  Token: ca,
  TokenType: le,
  defaultOptions: Us,
  getLineInfo: uu,
  isIdentifierChar: Yn,
  isIdentifierStart: sn,
  isNewLine: Ir,
  keywordTypes: sa,
  lineBreak: mi,
  lineBreakG: br,
  nonASCIIwhitespace: ou,
  parse: k_,
  parseExpressionAt: A_,
  tokContexts: Ae,
  tokTypes: L,
  tokenizer: P_,
  version: zf
}, Symbol.toStringTag, { value: "Module" })), E_ = /* @__PURE__ */ lf(T_);
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
var O_ = Os.exports, Cl;
function M_() {
  return Cl || (Cl = 1, function(t) {
    (function(e, n) {
      e = e || bl;
      var a = e.window, o = e.document, h = new function() {
        var i = /^(statics|enumerable|beans|preserve)$/, r = [], s = r.slice, u = Object.create, l = Object.getOwnPropertyDescriptor, f = Object.defineProperty, d = r.forEach || function(x, y) {
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
            var C = l(x, "length");
            (C && typeof C.value == "number" ? d : c).call(x, y, E = E || x);
          }
          return E;
        };
        function b(x, y, E, C, O) {
          var w = {};
          function A(P, N) {
            N = N || (N = l(y, P)) && (N.get ? N : N.value), typeof N == "string" && N[0] === "#" && (N = x[N.substring(1)] || N);
            var V = typeof N == "function", B = N, H = O || V && !N.base ? N && N.get ? P in x : x[P] : null, D;
            (!O || !H) && (V && H && (N.base = H), V && C !== !1 && (D = P.match(/^([gs]et|is)(([A-Z])(.*))$/)) && (w[D[3].toLowerCase() + D[4]] = D[2]), (!B || V || !B.get || typeof B.get != "function" || !S.isPlainObject(B)) && (B = { value: B, writable: !0 }), (l(x, P) || { configurable: !0 }).configurable && (B.configurable = !0, B.enumerable = E ?? !D), f(x, P, B));
          }
          if (y) {
            for (var m in y)
              y.hasOwnProperty(m) && !i.test(m) && A(m);
            for (var m in w) {
              var I = w[m], T = x["set" + I], M = x["get" + I] || T && x["is" + I];
              M && (C === !0 || M.length === 0) && A(m, { get: M, set: T });
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
            describe: l,
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
              return s.call(x, y, E);
            }
          }
        });
      }();
      t.exports = h, h.inject({
        enumerable: !1,
        toString: function() {
          return this._id != null ? (this._class || "Object") + (this._name ? " '" + this._name + "'" : " @" + this._id) : "{ " + h.each(this, function(i, r) {
            if (!/^_/.test(r)) {
              var s = typeof i;
              this.push(r + ": " + (s === "number" ? z.instance.number(i) : s === "string" ? "'" + i + "'" : i));
            }
          }, []).join(", ") + " }";
        },
        getClassName: function() {
          return this._class || "";
        },
        importJSON: function(i) {
          return h.importJSON(i, this);
        },
        exportJSON: function(i) {
          return h.exportJSON(this, i);
        },
        toJSON: function() {
          return h.serialize(this);
        },
        set: function(i, r) {
          return i && h.filter(this, i, r, this._prioritize), this;
        }
      }, {
        beans: !1,
        statics: {
          exports: {},
          extend: function i() {
            var r = i.base.apply(this, arguments), s = r.prototype._class;
            return s && !h.exports[s] && (h.exports[s] = r), r;
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
                var s = i.length;
                if (s !== r.length)
                  return !1;
                for (; s--; )
                  if (!h.equals(i[s], r[s]))
                    return !1;
              } else {
                var u = Object.keys(i), s = u.length;
                if (s !== Object.keys(r).length)
                  return !1;
                for (; s--; ) {
                  var l = u[s];
                  if (!(r.hasOwnProperty(l) && h.equals(i[l], r[l])))
                    return !1;
                }
              }
              return !0;
            }
            return !1;
          },
          read: function(i, r, s, u) {
            if (this === h) {
              var l = this.peek(i, r);
              return i.__index++, l;
            }
            var f = this.prototype, d = f._readIndex, c = r || d && i.__index || 0, p = i.length, g = i[c];
            if (u = u || p - c, g instanceof this || s && s.readNull && g == null && u <= 1)
              return d && (i.__index = c + 1), g && s && s.clone ? g.clone() : g;
            if (g = h.create(f), d && (g.__read = !0), g = g.initialize.apply(g, c > 0 || c + u < p ? h.slice(i, c, c + u) : i) || g, d) {
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
          readList: function(i, r, s, u) {
            for (var l = [], f, d = r || 0, c = u ? d + u : i.length, p = d; p < c; p++)
              l.push(Array.isArray(f = i[p]) ? this.read(f, 0, s) : this.read(i, p, s, 1));
            return l;
          },
          readNamed: function(i, r, s, u, l) {
            var f = this.getNamed(i, r), d = f !== n;
            if (d) {
              var c = i.__filtered;
              if (!c) {
                var p = this.getSource(i);
                c = i.__filtered = h.create(p), c.__unfiltered = p;
              }
              c[r] = n;
            }
            return this.read(d ? [f] : i, s, u, l);
          },
          readSupported: function(i, r) {
            var s = this.getSource(i), u = this, l = !1;
            return s && Object.keys(s).forEach(function(f) {
              if (f in r) {
                var d = u.readNamed(i, f);
                d !== n && (r[f] = d), l = !0;
              }
            }), l;
          },
          getSource: function(i) {
            var r = i.__source;
            if (r === n) {
              var s = i.length === 1 && i[0];
              r = i.__source = s && h.isPlainObject(s) ? s : null;
            }
            return r;
          },
          getNamed: function(i, r) {
            var s = this.getSource(i);
            if (s)
              return r ? s[r] : i.__filtered || s;
          },
          hasNamed: function(i, r) {
            return !!this.getNamed(i, r);
          },
          filter: function(i, r, s, u) {
            var l;
            function f(b) {
              if (!(s && b in s) && !(l && b in l)) {
                var S = r[b];
                S !== n && (i[b] = S);
              }
            }
            if (u) {
              for (var d = {}, c = 0, p, g = u.length; c < g; c++)
                (p = u[c]) in r && (f(p), d[p] = !0);
              l = d;
            }
            return Object.keys(r.__unfiltered || r).forEach(f), i;
          },
          isPlainValue: function(i, r) {
            return h.isPlainObject(i) || Array.isArray(i) || r && typeof i == "string";
          },
          serialize: function(i, r, s, u) {
            r = r || {};
            var l = !u, f;
            if (l && (r.formatter = new z(r.precision), u = {
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
              d && !i._compactSerialize && (l || !s) && f[0] !== d && f.unshift(d);
            } else if (Array.isArray(i)) {
              f = [];
              for (var c = 0, p = i.length; c < p; c++)
                f[c] = h.serialize(i[c], r, s, u);
            } else if (h.isPlainObject(i)) {
              f = {};
              for (var g = Object.keys(i), c = 0, p = g.length; c < p; c++) {
                var b = g[c];
                f[b] = h.serialize(
                  i[b],
                  r,
                  s,
                  u
                );
              }
            } else typeof i == "number" ? f = r.formatter.number(i, r.precision) : f = i;
            return l && u.length > 0 ? [["dictionary", u.definitions], f] : f;
          },
          deserialize: function(i, r, s, u, l) {
            var f = i, d = !s, c = d && i && i.length && i[0][0] === "dictionary";
            if (s = s || {}, Array.isArray(i)) {
              var p = i[0], g = p === "dictionary";
              if (i.length == 1 && /^#/.test(p))
                return s.dictionary[p];
              p = h.exports[p], f = [];
              for (var b = p ? 1 : 0, S = i.length; b < S; b++)
                f.push(h.deserialize(
                  i[b],
                  r,
                  s,
                  g,
                  c
                ));
              if (p) {
                var x = f;
                r ? f = r(p, x, d || l) : f = new p(x);
              }
            } else if (h.isPlainObject(i)) {
              f = {}, u && (s.dictionary = f);
              for (var y in i)
                f[y] = h.deserialize(i[y], r, s);
            }
            return c ? f[1] : f;
          },
          exportJSON: function(i, r) {
            var s = h.serialize(i, r);
            return r && r.asString == !1 ? s : JSON.stringify(s);
          },
          importJSON: function(i, r) {
            return h.deserialize(
              typeof i == "string" ? JSON.parse(i) : i,
              function(s, u, l) {
                var f = l && r && r.constructor === s, d = f ? r : h.create(s.prototype);
                if (u.length === 1 && d instanceof kt && (f || !(d instanceof Ot))) {
                  var c = u[0];
                  h.isPlainObject(c) && (c.insert = !1, f && (u = u.concat([kt.INSERT])));
                }
                return (f ? d.set : s).apply(d, u), f && (r = null), d;
              }
            );
          },
          push: function(i, r) {
            var s = r.length;
            if (s < 4096)
              i.push.apply(i, r);
            else {
              var u = i.length;
              i.length += s;
              for (var l = 0; l < s; l++)
                i[u + l] = r[l];
            }
            return i;
          },
          splice: function(i, r, s, u) {
            var l = r && r.length, f = s === n;
            s = f ? i.length : s, s > i.length && (s = i.length);
            for (var d = 0; d < l; d++)
              r[d]._index = s + d;
            if (f)
              return h.push(i, r), [];
            var c = [s, u];
            r && h.push(c, r);
            for (var p = i.splice.apply(i, c), d = 0, g = p.length; d < g; d++)
              p[d]._index = n;
            for (var d = s + l, g = i.length; d < g; d++)
              i[d]._index = d;
            return p;
          },
          capitalize: function(i) {
            return i.replace(/\b[a-z]/g, function(r) {
              return r.toUpperCase();
            });
          },
          camelize: function(i) {
            return i.replace(/-(.)/g, function(r, s) {
              return s.toUpperCase();
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
            h.each(i, function(f, d) {
              this.on(d, f);
            }, this);
          else {
            var s = this._eventTypes, u = s && s[i], l = this._callbacks = this._callbacks || {};
            l = l[i] = l[i] || [], l.indexOf(r) === -1 && (l.push(r), u && u.install && l.length === 1 && u.install.call(this, i));
          }
          return this;
        },
        off: function(i, r) {
          if (typeof i != "string") {
            h.each(i, function(d, c) {
              this.off(c, d);
            }, this);
            return;
          }
          var s = this._eventTypes, u = s && s[i], l = this._callbacks && this._callbacks[i], f;
          return l && (!r || (f = l.indexOf(r)) !== -1 && l.length === 1 ? (u && u.uninstall && u.uninstall.call(this, i), delete this._callbacks[i]) : f !== -1 && l.splice(f, 1)), this;
        },
        once: function(i, r) {
          return this.on(i, function s() {
            r.apply(this, arguments), this.off(i, s);
          });
        },
        emit: function(i, r) {
          var s = this._callbacks && this._callbacks[i];
          if (!s)
            return !1;
          var u = h.slice(arguments, 1), l = r && r.target && !r.currentTarget;
          s = s.slice(), l && (r.currentTarget = this);
          for (var f = 0, d = s.length; f < d; f++)
            if (s[f].apply(this, u) == !1) {
              r && r.stop && r.stop();
              break;
            }
          return l && delete r.currentTarget, !0;
        },
        responds: function(i) {
          return !!(this._callbacks && this._callbacks[i]);
        },
        attach: "#on",
        detach: "#off",
        fire: "#emit",
        _installEvents: function(i) {
          var r = this._eventTypes, s = this._callbacks, u = i ? "install" : "uninstall";
          if (r) {
            for (var l in s)
              if (s[l].length > 0) {
                var f = r[l], d = f && f[u];
                d && d.call(this, l);
              }
          }
        },
        statics: {
          inject: function i(r) {
            var s = r._events;
            if (s) {
              var u = {};
              h.each(s, function(l, f) {
                var d = typeof l == "string", c = d ? l : f, p = h.capitalize(c), g = c.substring(2).toLowerCase();
                u[g] = d ? {} : l, c = "_" + c, r["get" + p] = function() {
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
      }, v = h.extend({
        _class: "PaperScope",
        initialize: function i() {
          pt = this, this.settings = new h({
            applyMatrix: !0,
            insertItems: !0,
            handleSize: 4,
            hitTolerance: 0
          }), this.project = null, this.projects = [], this.tools = [], this._id = i._id++, i._scopes[this._id] = this;
          var r = i.prototype;
          if (!this.support) {
            var s = st.getContext(1, 1) || {};
            r.support = {
              nativeDash: "setLineDash" in s || "mozDash" in s,
              nativeBlendModes: Mt.nativeModes
            }, st.release(s);
          }
          if (!this.agent) {
            var u = e.navigator.userAgent.toLowerCase(), l = (/(darwin|win|mac|linux|freebsd|sunos)/.exec(u) || [])[0], f = l === "darwin" ? "mac" : l, d = r.agent = r.browser = { platform: f };
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
          var s = pt.PaperScript.execute(i, this, r);
          return Se.updateFocus(), s;
        },
        install: function(i) {
          var r = this;
          h.each(["project", "view", "tool"], function(u) {
            h.define(i, u, {
              configurable: !0,
              get: function() {
                return r[u];
              }
            });
          });
          for (var s in this)
            !/^_/.test(s) && this[s] && (i[s] = this[s]);
        },
        setup: function(i) {
          return pt = this, this.project = new ie(i), this;
        },
        createCanvas: function(i, r) {
          return st.getCanvas(i, r);
        },
        activate: function() {
          pt = this;
        },
        clear: function() {
          for (var i = this.projects, r = this.tools, s = i.length - 1; s >= 0; s--)
            i[s].remove();
          for (var s = r.length - 1; s >= 0; s--)
            r[s].remove();
        },
        remove: function() {
          this.clear(), delete v._scopes[this._id];
        },
        statics: new function() {
          function i(r) {
            return r += "Attribute", function(s, u) {
              return s[r](u) || s[r]("data-paper-" + u);
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
      }), k = h.extend(_, {
        initialize: function(i) {
          this._scope = pt, this._index = this._scope[this._list].push(this) - 1, (i || !this._scope[this._reference]) && this.activate();
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
          return this._index == null ? !1 : (h.splice(this._scope[this._list], null, this._index, 1), this._scope[this._reference] == this && (this._scope[this._reference] = null), this._scope = null, !0);
        },
        getView: function() {
          return this._scope.getView();
        }
      }), R = {
        findItemBoundsCollisions: function(i, r, s) {
          function u(d) {
            for (var c = new Array(d.length), p = 0; p < d.length; p++) {
              var g = d[p].getBounds();
              c[p] = [g.left, g.top, g.right, g.bottom];
            }
            return c;
          }
          var l = u(i), f = !r || r === i ? l : u(r);
          return this.findBoundsCollisions(l, f, s || 0);
        },
        findCurveBoundsCollisions: function(i, r, s, u) {
          function l(x) {
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
          var f = l(i), d = !r || r === i ? f : l(r);
          if (u) {
            for (var c = this.findBoundsCollisions(
              f,
              d,
              s || 0,
              !1,
              !0
            ), p = this.findBoundsCollisions(
              f,
              d,
              s || 0,
              !0,
              !0
            ), g = [], b = 0, S = c.length; b < S; b++)
              g[b] = { hor: c[b], ver: p[b] };
            return g;
          }
          return this.findBoundsCollisions(f, d, s || 0);
        },
        findBoundsCollisions: function(i, r, s, u, l) {
          var f = !r || i === r, d = f ? i : i.concat(r), c = i.length, p = d.length;
          function g(ct, gt, wt) {
            for (var J = 0, nt = ct.length; J < nt; ) {
              var mt = nt + J >>> 1;
              d[ct[mt]][gt] < wt ? J = mt + 1 : nt = mt;
            }
            return J - 1;
          }
          for (var b = u ? 1 : 0, S = b + 2, x = u ? 0 : 1, y = x + 2, E = new Array(p), C = 0; C < p; C++)
            E[C] = C;
          E.sort(function(ct, gt) {
            return d[ct][b] - d[gt][b];
          });
          for (var O = [], w = new Array(c), C = 0; C < p; C++) {
            var A = E[C], m = d[A], I = f ? A : A - c, T = A < c, M = f || !T, P = T ? [] : null;
            if (O.length) {
              var N = g(
                O,
                S,
                m[b] - s
              ) + 1;
              if (O.splice(0, N), f && l) {
                P = P.concat(O);
                for (var V = 0; V < O.length; V++) {
                  var B = O[V];
                  w[B].push(I);
                }
              } else
                for (var H = m[y], D = m[x], V = 0; V < O.length; V++) {
                  var B = O[V], j = d[B], G = B < c, Y = f || B >= c;
                  (l || (T && Y || M && G) && H >= j[x] - s && D <= j[y] + s) && (T && Y && P.push(
                    f ? B : B - c
                  ), M && G && w[B].push(I));
                }
            }
            if (T && (i === r && P.push(A), w[A] = P), O.length) {
              var $ = m[S], X = g(O, S, $);
              O.splice(X + 1, 0, A);
            } else
              O.push(A);
          }
          for (var C = 0; C < w.length; C++) {
            var at = w[C];
            at && at.sort(function(gt, wt) {
              return gt - wt;
            });
          }
          return w;
        }
      }, z = h.extend({
        initialize: function(i) {
          this.precision = h.pick(i, 5), this.multiplier = Math.pow(10, this.precision);
        },
        number: function(i) {
          return this.precision < 16 ? Math.round(i * this.multiplier) / this.multiplier : i;
        },
        pair: function(i, r, s) {
          return this.number(i) + (s || ",") + this.number(r);
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
      var U = new function() {
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
        ], s = Math.abs, u = Math.sqrt, l = Math.pow, f = Math.log2 || function(S) {
          return Math.log(S) * Math.LOG2E;
        }, d = 1e-12, c = 112e-18;
        function p(S, x, y) {
          return S < x ? x : S > y ? y : S;
        }
        function g(S, x, y) {
          function E(N) {
            var V = N * 134217729, B = N - V, H = B + V, D = N - H;
            return [H, D];
          }
          var C = x * x - S * y, O = x * x + S * y;
          if (s(C) * 3 < O) {
            var w = E(S), A = E(x), m = E(y), I = x * x, T = A[0] * A[0] - I + 2 * A[0] * A[1] + A[1] * A[1], M = S * y, P = w[0] * m[0] - M + w[0] * m[1] + w[1] * m[0] + w[1] * m[1];
            C = I - M + (T - P);
          }
          return C;
        }
        function b() {
          var S = Math.max.apply(Math, arguments);
          return S && (S < 1e-8 || S > 1e8) ? l(2, -Math.round(f(S))) : 0;
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
            for (var C = i[E - 2], O = r[E - 2], w = (y - x) * 0.5, A = w + x, m = 0, I = E + 1 >> 1, T = E & 1 ? O[m++] * S(A) : 0; m < I; ) {
              var M = w * C[m];
              T += O[m++] * (S(A + M) + S(A - M));
            }
            return w * T;
          },
          findRoot: function(S, x, y, E, C, O, w) {
            for (var A = 0; A < O; A++) {
              var m = S(y), I = m / x(y), T = y - I;
              if (s(I) < w) {
                y = T;
                break;
              }
              m > 0 ? (C = y, y = T <= E ? (E + C) * 0.5 : T) : (E = y, y = T >= C ? (E + C) * 0.5 : T);
            }
            return p(y, E, C);
          },
          solveQuadratic: function(S, x, y, E, C, O) {
            var w, A = 1 / 0;
            if (s(S) < d) {
              if (s(x) < d)
                return s(y) < d ? -1 : 0;
              w = -y / x;
            } else {
              x *= -0.5;
              var m = g(S, x, y);
              if (m && s(m) < c) {
                var I = b(s(S), s(x), s(y));
                I && (S *= I, x *= I, y *= I, m = g(S, x, y));
              }
              if (m >= -112e-18) {
                var T = m < 0 ? 0 : u(m), M = x + (x < 0 ? -T : T);
                M === 0 ? (w = y / S, A = -w) : (w = M / S, A = y / M);
              }
            }
            var P = 0, N = C == null, V = C - d, B = O + d;
            return isFinite(w) && (N || w > V && w < B) && (E[P++] = N ? w : p(w, C, O)), A !== w && isFinite(A) && (N || A > V && A < B) && (E[P++] = N ? A : p(A, C, O)), P;
          },
          solveCubic: function(S, x, y, E, C, O, w) {
            var A = b(s(S), s(x), s(y), s(E)), m, I, T, M, P;
            A && (S *= A, x *= A, y *= A, E *= A);
            function N(X) {
              m = X;
              var at = S * m;
              I = at + x, T = I * m + y, M = (at + I) * m + T, P = T * m + E;
            }
            if (s(S) < d)
              S = x, I = y, T = E, m = 1 / 0;
            else if (s(E) < d)
              I = x, T = y, m = 0;
            else {
              N(-(x / S) / 3);
              var V = P / S, B = l(s(V), 1 / 3), H = V < 0 ? -1 : 1, D = -M / S, j = D > 0 ? 1.324717957244746 * Math.max(B, u(D)) : B, G = m - H * j;
              if (G !== m) {
                do
                  N(G), G = M === 0 ? m : m - P / M / (1 + c);
                while (H * G > H * m);
                s(S) * m * m > s(E / m) && (T = -E / m, I = (T - y) / m);
              }
            }
            var Y = U.solveQuadratic(S, I, T, C, O, w), $ = O == null;
            return isFinite(m) && (Y === 0 || Y > 0 && m !== C[0] && m !== C[1]) && ($ || m > O - d && m < w + d) && (C[Y++] = $ ? m : p(m, O, w)), Y;
          }
        };
      }(), et = {
        _id: 1,
        _pools: {},
        get: function(i) {
          if (i) {
            var r = this._pools[i];
            return r || (r = this._pools[i] = { _id: 1 }), r._id++;
          } else
            return this._id++;
        }
      }, F = h.extend({
        _class: "Point",
        _readIndex: !0,
        initialize: function(r, s) {
          var u = typeof r, l = this.__read, f = 0;
          if (u === "number") {
            var d = typeof s == "number";
            this._set(r, d ? s : r), l && (f = d ? 2 : 1);
          } else if (u === "undefined" || r === null)
            this._set(0, 0), l && (f = r === null ? 1 : 0);
          else {
            var c = u === "string" ? r.split(/[\s,]+/) || [] : r;
            f = 1, Array.isArray(c) ? this._set(+c[0], +(c.length > 1 ? c[1] : c[0])) : "x" in c ? this._set(c.x || 0, c.y || 0) : "width" in c ? this._set(c.width || 0, c.height || 0) : "angle" in c ? (this._set(c.length || 0, 0), this.setAngle(c.angle || 0)) : (this._set(0, 0), f = 0);
          }
          return l && (this.__read = f), this;
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
            var s = i / this.getLength();
            U.isZero(s) && this.getAngle(), this._set(
              this.x * s,
              this.y * s
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
            if (U.isZero(r))
              return NaN;
            var s = this.dot(i) / r;
            return Math.acos(s < -1 ? -1 : s > 1 ? 1 : s);
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
          var i = arguments, r = F.read(i), s = r.x - this.x, u = r.y - this.y, l = s * s + u * u, f = h.read(i);
          return f ? l : Math.sqrt(l);
        },
        normalize: function(i) {
          i === n && (i = 1);
          var r = this.getLength(), s = r !== 0 ? i / r : 0, u = new F(this.x * s, this.y * s);
          return s >= 0 && (u._angle = this._angle), u;
        },
        rotate: function(i, r) {
          if (i === 0)
            return this.clone();
          i = i * Math.PI / 180;
          var s = r ? this.subtract(r) : this, u = Math.sin(i), l = Math.cos(i);
          return s = new F(
            s.x * l - s.y * u,
            s.x * u + s.y * l
          ), r ? s.add(r) : s;
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
          var i = arguments, r = F.read(i), s = h.read(i);
          return this.getDistance(r) <= s;
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
          var i = U.isZero;
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
            var i = arguments, r = F.read(i), s = F.read(i);
            return new F(
              Math.min(r.x, s.x),
              Math.min(r.y, s.y)
            );
          },
          max: function() {
            var i = arguments, r = F.read(i), s = F.read(i);
            return new F(
              Math.max(r.x, s.x),
              Math.max(r.y, s.y)
            );
          },
          random: function() {
            return new F(Math.random(), Math.random());
          },
          isCollinear: function(i, r, s, u) {
            return Math.abs(i * u - r * s) <= Math.sqrt((i * i + r * r) * (s * s + u * u)) * 1e-8;
          },
          isOrthogonal: function(i, r, s, u) {
            return Math.abs(i * s + r * u) <= Math.sqrt((i * i + r * r) * (s * s + u * u)) * 1e-8;
          }
        }
      }, h.each(["round", "ceil", "floor", "abs"], function(i) {
        var r = Math[i];
        this[i] = function() {
          return new F(r(this.x), r(this.y));
        };
      }, {})), yt = F.extend({
        initialize: function(r, s, u, l) {
          this._x = r, this._y = s, this._owner = u, this._setter = l;
        },
        _set: function(i, r, s) {
          return this._x = i, this._y = r, s || this._owner[this._setter](this), this;
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
      }), it = h.extend({
        _class: "Size",
        _readIndex: !0,
        initialize: function(r, s) {
          var u = typeof r, l = this.__read, f = 0;
          if (u === "number") {
            var d = typeof s == "number";
            this._set(r, d ? s : r), l && (f = d ? 2 : 1);
          } else if (u === "undefined" || r === null)
            this._set(0, 0), l && (f = r === null ? 1 : 0);
          else {
            var c = u === "string" ? r.split(/[\s,]+/) || [] : r;
            f = 1, Array.isArray(c) ? this._set(+c[0], +(c.length > 1 ? c[1] : c[0])) : "width" in c ? this._set(c.width || 0, c.height || 0) : "x" in c ? this._set(c.x || 0, c.y || 0) : (this._set(0, 0), f = 0);
          }
          return l && (this.__read = f), this;
        },
        set: "#initialize",
        _set: function(i, r) {
          return this.width = i, this.height = r, this;
        },
        equals: function(i) {
          return i === this || i && (this.width === i.width && this.height === i.height || Array.isArray(i) && this.width === i[0] && this.height === i[1]) || !1;
        },
        clone: function() {
          return new it(this.width, this.height);
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
          var i = it.read(arguments);
          return new it(this.width + i.width, this.height + i.height);
        },
        subtract: function() {
          var i = it.read(arguments);
          return new it(this.width - i.width, this.height - i.height);
        },
        multiply: function() {
          var i = it.read(arguments);
          return new it(this.width * i.width, this.height * i.height);
        },
        divide: function() {
          var i = it.read(arguments);
          return new it(this.width / i.width, this.height / i.height);
        },
        modulo: function() {
          var i = it.read(arguments);
          return new it(this.width % i.width, this.height % i.height);
        },
        negate: function() {
          return new it(-this.width, -this.height);
        },
        isZero: function() {
          var i = U.isZero;
          return i(this.width) && i(this.height);
        },
        isNaN: function() {
          return isNaN(this.width) || isNaN(this.height);
        },
        statics: {
          min: function(i, r) {
            return new it(
              Math.min(i.width, r.width),
              Math.min(i.height, r.height)
            );
          },
          max: function(i, r) {
            return new it(
              Math.max(i.width, r.width),
              Math.max(i.height, r.height)
            );
          },
          random: function() {
            return new it(Math.random(), Math.random());
          }
        }
      }, h.each(["round", "ceil", "floor", "abs"], function(i) {
        var r = Math[i];
        this[i] = function() {
          return new it(r(this.width), r(this.height));
        };
      }, {})), Tt = it.extend({
        initialize: function(r, s, u, l) {
          this._width = r, this._height = s, this._owner = u, this._setter = l;
        },
        _set: function(i, r, s) {
          return this._width = i, this._height = r, s || this._owner[this._setter](this), this;
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
      }), ut = h.extend({
        _class: "Rectangle",
        _readIndex: !0,
        beans: !0,
        initialize: function(r, s, u, l) {
          var f = arguments, d = typeof r, c;
          if (d === "number" ? (this._set(r, s, u, l), c = 4) : d === "undefined" || r === null ? (this._set(0, 0, 0, 0), c = r === null ? 1 : 0) : f.length === 1 && (Array.isArray(r) ? (this._set.apply(this, r), c = 1) : r.x !== n || r.width !== n ? (this._set(
            r.x || 0,
            r.y || 0,
            r.width || 0,
            r.height || 0
          ), c = 1) : r.from === n && r.to === n && (this._set(0, 0, 0, 0), h.readSupported(f, this) && (c = 1))), c === n) {
            var p = F.readNamed(f, "from"), g = h.peek(f), b = p.x, S = p.y, x, y;
            if (g && g.x !== n || h.hasNamed(f, "to")) {
              var E = F.readNamed(f, "to");
              x = E.x - b, y = E.y - S, x < 0 && (b = E.x, x = -x), y < 0 && (S = E.y, y = -y);
            } else {
              var C = it.read(f);
              x = C.width, y = C.height;
            }
            this._set(b, S, x, y), c = f.__index;
          }
          var O = f.__filtered;
          return O && (this.__filtered = O), this.__read && (this.__read = c), this;
        },
        set: "#initialize",
        _set: function(i, r, s, u) {
          return this.x = i, this.y = r, this.width = s, this.height = u, this;
        },
        clone: function() {
          return new ut(this.x, this.y, this.width, this.height);
        },
        equals: function(i) {
          var r = h.isPlainValue(i) ? ut.read(arguments) : i;
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
          var r = i ? F : yt;
          return new r(this.x, this.y, this, "setPoint");
        },
        setPoint: function() {
          var i = F.read(arguments);
          this.x = i.x, this.y = i.y;
        },
        getSize: function(i) {
          var r = i ? it : Tt;
          return new r(this.width, this.height, this, "setSize");
        },
        _fw: 1,
        _fh: 1,
        setSize: function() {
          var i = it.read(arguments), r = this._sx, s = this._sy, u = i.width, l = i.height;
          r && (this.x += (this.width - u) * r), s && (this.y += (this.height - l) * s), this.width = u, this.height = l, this._fw = this._fh = 1;
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
          var r = i ? F : yt;
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
          var r = i.x, s = i.y;
          return r >= this.x && s >= this.y && r <= this.x + this.width && s <= this.y + this.height;
        },
        _containsRectangle: function(i) {
          var r = i.x, s = i.y;
          return r >= this.x && s >= this.y && r + i.width <= this.x + this.width && s + i.height <= this.y + this.height;
        },
        intersects: function() {
          var i = ut.read(arguments), r = h.read(arguments) || 0;
          return i.x + i.width > this.x - r && i.y + i.height > this.y - r && i.x < this.x + this.width + r && i.y < this.y + this.height + r;
        },
        intersect: function() {
          var i = ut.read(arguments), r = Math.max(this.x, i.x), s = Math.max(this.y, i.y), u = Math.min(this.x + this.width, i.x + i.width), l = Math.min(this.y + this.height, i.y + i.height);
          return new ut(r, s, u - r, l - s);
        },
        unite: function() {
          var i = ut.read(arguments), r = Math.min(this.x, i.x), s = Math.min(this.y, i.y), u = Math.max(this.x + this.width, i.x + i.width), l = Math.max(this.y + this.height, i.y + i.height);
          return new ut(r, s, u - r, l - s);
        },
        include: function() {
          var i = F.read(arguments), r = Math.min(this.x, i.x), s = Math.min(this.y, i.y), u = Math.max(this.x + this.width, i.x), l = Math.max(this.y + this.height, i.y);
          return new ut(r, s, u - r, l - s);
        },
        expand: function() {
          var i = it.read(arguments), r = i.width, s = i.height;
          return new ut(
            this.x - r / 2,
            this.y - s / 2,
            this.width + r,
            this.height + s
          );
        },
        scale: function(i, r) {
          return this.expand(
            this.width * i - this.width,
            this.height * (r === n ? i : r) - this.height
          );
        }
      }, h.each(
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
          var s = i.join(""), u = /^[RL]/.test(s);
          r >= 4 && (i[1] += u ? "Y" : "X");
          var l = i[u ? 0 : 1], f = i[u ? 1 : 0], d = "get" + l, c = "get" + f, p = "set" + l, g = "set" + f, b = "get" + s, S = "set" + s;
          this[b] = function(x) {
            var y = x ? F : yt;
            return new y(this[d](), this[c](), this, S);
          }, this[S] = function() {
            var x = F.read(arguments);
            this[p](x.x), this[g](x.y);
          };
        },
        {
          beans: !0
        }
      )), Qt = ut.extend(
        {
          initialize: function(r, s, u, l, f, d) {
            this._set(r, s, u, l, !0), this._owner = f, this._setter = d;
          },
          _set: function(i, r, s, u, l) {
            return this._x = i, this._y = r, this._width = s, this._height = u, l || this._owner[this._setter](this), this;
          }
        },
        new function() {
          var i = ut.prototype;
          return h.each(
            ["x", "y", "width", "height"],
            function(r) {
              var s = h.capitalize(r), u = "_" + r;
              this["get" + s] = function() {
                return this[u];
              }, this["set" + s] = function(l) {
                this[u] = l, this._dontNotify || this._owner[this._setter](this);
              };
            },
            h.each(
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
                var s = "set" + r;
                this[s] = function() {
                  this._dontNotify = !0, i[s].apply(this, arguments), this._dontNotify = !1, this._owner[this._setter](this);
                };
              },
              {
                isSelected: function() {
                  return !!(this._owner._selection & 2);
                },
                setSelected: function(r) {
                  var s = this._owner;
                  s._changeSelection && s._changeSelection(2, r);
                }
              }
            )
          );
        }()
      ), It = h.extend({
        _class: "Matrix",
        initialize: function i(r, s) {
          var u = arguments, l = u.length, f = !0;
          if (l >= 6 ? this._set.apply(this, u) : l === 1 || l === 2 ? r instanceof i ? this._set(
            r._a,
            r._b,
            r._c,
            r._d,
            r._tx,
            r._ty,
            s
          ) : Array.isArray(r) ? this._set.apply(
            this,
            s ? r.concat([s]) : r
          ) : f = !1 : l ? f = !1 : this.reset(), !f)
            throw new Error("Unsupported matrix parameters");
          return this;
        },
        set: "#initialize",
        _set: function(i, r, s, u, l, f, d) {
          return this._a = i, this._b = r, this._c = s, this._d = u, this._tx = l, this._ty = f, d || this._changed(), this;
        },
        _serialize: function(i, r) {
          return h.serialize(this.getValues(), i, !0, r);
        },
        _changed: function() {
          var i = this._owner;
          i && (i._applyMatrix ? i.transform(null, !0) : i._changed(25));
        },
        clone: function() {
          return new It(
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
          var s = this._owner;
          return s ? (s.transform(null, h.pick(i, !0), r), this.isIdentity()) : !1;
        },
        translate: function() {
          var i = F.read(arguments), r = i.x, s = i.y;
          return this._tx += r * this._a + s * this._c, this._ty += r * this._b + s * this._d, this._changed(), this;
        },
        scale: function() {
          var i = arguments, r = F.read(i), s = F.read(i, 0, { readNull: !0 });
          return s && this.translate(s), this._a *= r.x, this._b *= r.x, this._c *= r.y, this._d *= r.y, s && this.translate(s.negate()), this._changed(), this;
        },
        rotate: function(i) {
          i *= Math.PI / 180;
          var r = F.read(arguments, 1), s = r.x, u = r.y, l = Math.cos(i), f = Math.sin(i), d = s - s * l + u * f, c = u - s * f - u * l, p = this._a, g = this._b, b = this._c, S = this._d;
          return this._a = l * p + f * b, this._b = l * g + f * S, this._c = -f * p + l * b, this._d = -f * g + l * S, this._tx += d * p + c * b, this._ty += d * g + c * S, this._changed(), this;
        },
        shear: function() {
          var i = arguments, r = F.read(i), s = F.read(i, 0, { readNull: !0 });
          s && this.translate(s);
          var u = this._a, l = this._b;
          return this._a += r.y * this._c, this._b += r.y * this._d, this._c += r.x * u, this._d += r.x * l, s && this.translate(s.negate()), this._changed(), this;
        },
        skew: function() {
          var i = arguments, r = F.read(i), s = F.read(i, 0, { readNull: !0 }), u = Math.PI / 180, l = new F(
            Math.tan(r.x * u),
            Math.tan(r.y * u)
          );
          return this.shear(l, s);
        },
        append: function(i, r) {
          if (i) {
            var s = this._a, u = this._b, l = this._c, f = this._d, d = i._a, c = i._c, p = i._b, g = i._d, b = i._tx, S = i._ty;
            this._a = d * s + p * l, this._c = c * s + g * l, this._b = d * u + p * f, this._d = c * u + g * f, this._tx += b * s + S * l, this._ty += b * u + S * f, r || this._changed();
          }
          return this;
        },
        prepend: function(i, r) {
          if (i) {
            var s = this._a, u = this._b, l = this._c, f = this._d, d = this._tx, c = this._ty, p = i._a, g = i._c, b = i._b, S = i._d, x = i._tx, y = i._ty;
            this._a = p * s + g * u, this._c = p * l + g * f, this._b = b * s + S * u, this._d = b * l + S * f, this._tx = p * d + g * c + x, this._ty = b * d + S * c + y, r || this._changed();
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
          var i = this._a, r = this._b, s = this._c, u = this._d, l = this._tx, f = this._ty, d = i * u - r * s, c = null;
          return d && !isNaN(d) && isFinite(l) && isFinite(f) && (this._a = u / d, this._b = -r / d, this._c = -s / d, this._d = i / d, this._tx = (s * f - u * l) / d, this._ty = (r * l - i * f) / d, c = this), c;
        },
        inverted: function() {
          return this.clone().invert();
        },
        concatenate: "#append",
        preConcatenate: "#prepend",
        chain: "#appended",
        _shiftless: function() {
          return new It(this._a, this._b, this._c, this._d, 0, 0);
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
        transform: function(i, r, s) {
          return arguments.length < 3 ? this._transformPoint(F.read(arguments)) : this._transformCoordinates(i, r, s);
        },
        _transformPoint: function(i, r, s) {
          var u = i.x, l = i.y;
          return r || (r = new F()), r._set(
            u * this._a + l * this._c + this._tx,
            u * this._b + l * this._d + this._ty,
            s
          );
        },
        _transformCoordinates: function(i, r, s) {
          for (var u = 0, l = 2 * s; u < l; u += 2) {
            var f = i[u], d = i[u + 1];
            r[u] = f * this._a + d * this._c + this._tx, r[u + 1] = f * this._b + d * this._d + this._ty;
          }
          return r;
        },
        _transformCorners: function(i) {
          var r = i.x, s = i.y, u = r + i.width, l = s + i.height, f = [r, s, u, s, u, l, r, l];
          return this._transformCoordinates(f, f, 4);
        },
        _transformBounds: function(i, r, s) {
          for (var u = this._transformCorners(i), l = u.slice(0, 2), f = l.slice(), d = 2; d < 8; d++) {
            var c = u[d], p = d & 1;
            c < l[p] ? l[p] = c : c > f[p] && (f[p] = c);
          }
          return r || (r = new ut()), r._set(
            l[0],
            l[1],
            f[0] - l[0],
            f[1] - l[1],
            s
          );
        },
        inverseTransform: function() {
          return this._inverseTransform(F.read(arguments));
        },
        _inverseTransform: function(i, r, s) {
          var u = this._a, l = this._b, f = this._c, d = this._d, c = this._tx, p = this._ty, g = u * d - l * f, b = null;
          if (g && !isNaN(g) && isFinite(c) && isFinite(p)) {
            var S = i.x - this._tx, x = i.y - this._ty;
            r || (r = new F()), b = r._set(
              (S * d - x * f) / g,
              (x * u - S * l) / g,
              s
            );
          }
          return b;
        },
        decompose: function() {
          var i = this._a, r = this._b, s = this._c, u = this._d, l = i * u - r * s, f = Math.sqrt, d = Math.atan2, c = 180 / Math.PI, p, g, b;
          if (i !== 0 || r !== 0) {
            var S = f(i * i + r * r);
            p = Math.acos(i / S) * (r > 0 ? 1 : -1), g = [S, l / S], b = [d(i * s + r * u, S * S), 0];
          } else if (s !== 0 || u !== 0) {
            var x = f(s * s + u * u);
            p = Math.asin(s / x) * (u > 0 ? 1 : -1), g = [l / x, x], b = [0, d(i * s + r * u, x * x)];
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
      }, h.each(["a", "b", "c", "d", "tx", "ty"], function(i) {
        var r = h.capitalize(i), s = "_" + i;
        this["get" + r] = function() {
          return this[s];
        }, this["set" + r] = function(u) {
          this[s] = u, this._changed();
        };
      }, {})), xt = h.extend({
        _class: "Line",
        initialize: function(r, s, u, l, f) {
          var d = !1;
          arguments.length >= 4 ? (this._px = r, this._py = s, this._vx = u, this._vy = l, d = f) : (this._px = r.x, this._py = r.y, this._vx = s.x, this._vy = s.y, d = u), d || (this._vx -= this._px, this._vy -= this._py);
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
          intersect: function(i, r, s, u, l, f, d, c, p, g) {
            p || (s -= i, u -= r, d -= l, c -= f);
            var b = s * c - u * d;
            if (!U.isMachineZero(b)) {
              var S = i - l, x = r - f, y = (d * x - c * S) / b, E = (s * x - u * S) / b, C = 1e-12, O = -C, w = 1 + C;
              if (g || O < y && y < w && O < E && E < w)
                return g || (y = y <= 0 ? 0 : y >= 1 ? 1 : y), new F(
                  i + y * s,
                  r + y * u
                );
            }
          },
          getSide: function(i, r, s, u, l, f, d, c) {
            d || (s -= i, u -= r);
            var p = l - i, g = f - r, b = p * u - g * s;
            return !c && U.isMachineZero(b) && (b = (p * s + p * s) / (s * s + u * u), b >= 0 && b <= 1 && (b = 0)), b < 0 ? -1 : b > 0 ? 1 : 0;
          },
          getSignedDistance: function(i, r, s, u, l, f, d) {
            return d || (s -= i, u -= r), s === 0 ? u > 0 ? l - i : i - l : u === 0 ? s < 0 ? f - r : r - f : ((l - i) * u - (f - r) * s) / (u > s ? u * Math.sqrt(1 + s * s / (u * u)) : s * Math.sqrt(1 + u * u / (s * s)));
          },
          getDistance: function(i, r, s, u, l, f, d) {
            return Math.abs(
              xt.getSignedDistance(i, r, s, u, l, f, d)
            );
          }
        }
      }), ie = k.extend({
        _class: "Project",
        _list: "projects",
        _reference: "project",
        _compactSerialize: !0,
        initialize: function(r) {
          k.call(this, !0), this._children = [], this._namedChildren = {}, this._activeLayer = null, this._currentStyle = new En(null, null, this), this._view = Se.create(
            this,
            r || st.getCanvas(1, 1)
          ), this._selectionItems = {}, this._selectionCount = 0, this._updateVersion = 0;
        },
        _serialize: function(i, r) {
          return h.serialize(this._children, i, !0, r);
        },
        _changed: function(i, r) {
          if (i & 1) {
            var s = this._view;
            s && (s._needsUpdate = !0, !s._requested && s._autoUpdate && s.requestUpdate());
          }
          var u = this._changes;
          if (u && r) {
            var l = this._changesById, f = r._id, d = l[f];
            d ? d.flags |= i : u.push(l[f] = { item: r, flags: i });
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
          return this._activeLayer || new Ot({ project: this, insert: !0 });
        },
        getSymbolDefinitions: function() {
          var i = [], r = {};
          return this.getItems({
            class: Ai,
            match: function(s) {
              var u = s._definition, l = u._id;
              return r[l] || (r[l] = !0, i.push(u)), !1;
            }
          }), i;
        },
        getSymbols: "getSymbolDefinitions",
        getSelectedItems: function() {
          var i = this._selectionItems, r = [];
          for (var s in i) {
            var u = i[s], l = u._selection;
            l & 1 && u.isInserted() ? r.push(u) : l || this._updateSelection(u);
          }
          return r;
        },
        _updateSelection: function(i) {
          var r = i._id, s = this._selectionItems;
          i._selection ? s[r] !== i && (this._selectionCount++, s[r] = i) : s[r] === i && (this._selectionCount--, delete s[r]);
        },
        selectAll: function() {
          for (var i = this._children, r = 0, s = i.length; r < s; r++)
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
          if (r instanceof Ot) {
            r._remove(!1, !0), h.splice(this._children, [r], i, 0), r._setProject(this, !0);
            var s = r._name;
            s && r.setName(s), this._changes && r._changed(5), this._activeLayer || (this._activeLayer = r);
          } else
            r = null;
          return r;
        },
        _insertItem: function(i, r, s) {
          return r = this.insertLayer(i, r) || (this._activeLayer || this._insertItem(
            n,
            new Ot(kt.NO_INSERT),
            !0
          )).insertChild(i, r), s && r.activate && r.activate(), r;
        },
        getItems: function(i) {
          return kt._getItems(this, i);
        },
        getItem: function(i) {
          return kt._getItems(this, i, null, null, !0)[0] || null;
        },
        importJSON: function(i) {
          this.activate();
          var r = this._activeLayer;
          return h.importJSON(i, r && r.isEmpty() && r);
        },
        removeOn: function(i) {
          var r = this._removeSets;
          if (r) {
            i === "mouseup" && (r.mousedrag = null);
            var s = r[i];
            if (s) {
              for (var u in s) {
                var l = s[u];
                for (var f in r) {
                  var d = r[f];
                  d && d != s && delete d[l._id];
                }
                l.remove();
              }
              r[i] = null;
            }
          }
        },
        draw: function(i, r, s) {
          this._updateVersion++, i.save(), r.applyToContext(i);
          for (var u = this._children, l = new h({
            offset: new F(0, 0),
            pixelRatio: s,
            viewMatrix: r.isIdentity() ? null : r,
            matrices: [new It()],
            updateMatrix: !0
          }), f = 0, d = u.length; f < d; f++)
            u[f].draw(i, l);
          if (i.restore(), this._selectionCount > 0) {
            i.save(), i.strokeWidth = 1;
            var c = this._selectionItems, p = this._scope.settings.handleSize, g = this._updateVersion;
            for (var b in c)
              c[b]._drawSelection(i, r, p, c, g);
            i.restore();
          }
        }
      }), kt = h.extend(
        _,
        {
          statics: {
            extend: function i(r) {
              return r._serializeFields && (r._serializeFields = h.set(
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
            matrix: new It(),
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
          return h.each(
            i,
            function(r) {
              this._events[r] = {
                install: function(s) {
                  this.getView()._countItemEvent(s, 1);
                },
                uninstall: function(s) {
                  this.getView()._countItemEvent(s, -1);
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
            var s = i && h.isPlainObject(i), u = s && i.internal === !0, l = this._matrix = new It(), f = s && i.project || pt.project, d = pt.settings;
            return this._id = u ? null : et.get(), this._parent = this._index = null, this._applyMatrix = this._canApplyMatrix && d.applyMatrix, r && l.translate(r), l._owner = this, this._style = new En(f._currentStyle, this, f), u || s && i.insert == !1 || !d.insertItems && !(s && i.insert == !0) ? this._setProject(f) : (s && i.parent || f)._insertItem(n, this, !0), s && i !== kt.NO_INSERT && i !== kt.INSERT && this.set(i, {
              internal: !0,
              insert: !0,
              project: !0,
              parent: !0
            }), s;
          },
          _serialize: function(i, r) {
            var s = {}, u = this;
            function l(f) {
              for (var d in f) {
                var c = u[d];
                h.equals(c, d === "leading" ? f.fontSize * 1.2 : f[d]) || (s[d] = h.serialize(
                  c,
                  i,
                  d !== "data",
                  r
                ));
              }
            }
            return l(this._serializeFields), this instanceof At || l(this._style._defaults), [this._class, s];
          },
          _changed: function(i) {
            var r = this._symbol, s = this._parent || r, u = this._project;
            i & 8 && (this._bounds = this._position = this._decomposed = n), i & 16 && (this._globalMatrix = n), s && i & 72 && kt._clearBoundsCache(s), i & 2 && kt._clearBoundsCache(this), u && u._changed(i, this), r && r._changed(i);
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
              var s = r._children, u = r._namedChildren;
              (u[i] = u[i] || []).push(this), i in s || (s[i] = this);
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
        h.each(
          ["locked", "visible", "blendMode", "opacity", "guide"],
          function(i) {
            var r = h.capitalize(i), s = "_" + i, u = {
              locked: 256,
              visible: 265
            };
            this["get" + r] = function() {
              return this[s];
            }, this["set" + r] = function(l) {
              l != this[s] && (this[s] = l, this._changed(u[i] || 257));
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
            var s = this._selection;
            this.setSelection(r ? s | i : s & ~i);
          },
          isSelected: function() {
            if (this._selectChildren) {
              for (var i = this._children, r = 0, s = i.length; r < s; r++)
                if (i[r].isSelected())
                  return !0;
            }
            return !!(this._selection & 1);
          },
          setSelected: function(i) {
            if (this._selectChildren)
              for (var r = this._children, s = 0, u = r.length; s < u; s++)
                r[s].setSelected(i);
            this._changeSelection(1, i);
          },
          isFullySelected: function() {
            var i = this._children, r = !!(this._selection & 1);
            if (i && r) {
              for (var s = 0, u = i.length; s < u; s++)
                if (!i[s].isFullySelected())
                  return !1;
              return !0;
            }
            return r;
          },
          setFullySelected: function(i) {
            var r = this._children;
            if (r)
              for (var s = 0, u = r.length; s < u; s++)
                r[s].setFullySelected(i);
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
            var r = i ? F : yt, s = this._position || (this._position = this._getPositionFromBounds());
            return new r(s.x, s.y, this, "setPosition");
          },
          setPosition: function() {
            this.translate(F.read(arguments).subtract(this.getPosition(!0)));
          },
          _getPositionFromBounds: function(i) {
            return this._pivot ? this._matrix._transformPoint(this._pivot) : (i || this.getBounds()).getCenter(!0);
          },
          getPivot: function() {
            var i = this._pivot;
            return i ? new yt(i.x, i.y, this, "setPivot") : null;
          },
          setPivot: function() {
            this._pivot = F.read(arguments, 0, { clone: !0, readNull: !0 }), this._position = n;
          }
        },
        h.each(
          {
            getStrokeBounds: { stroke: !0 },
            getHandleBounds: { handle: !0 },
            getInternalBounds: { internal: !0 }
          },
          function(i, r) {
            this[r] = function(s) {
              return this.getBounds(s, i);
            };
          },
          {
            beans: !0,
            getBounds: function(i, r) {
              var s = r || i instanceof It, u = h.set(
                {},
                s ? r : i,
                this._boundsOptions
              );
              (!u.stroke || this.getStrokeScaling()) && (u.cacheItem = this);
              var l = this._getCachedBounds(s && i, u).rect;
              return arguments.length ? l : new Qt(
                l.x,
                l.y,
                l.width,
                l.height,
                this,
                "setBounds"
              );
            },
            setBounds: function() {
              var i = ut.read(arguments), r = this.getBounds(), s = this._matrix, u = new It(), l = i.getCenter();
              u.translate(l), (i.width != r.width || i.height != r.height) && (s.isInvertible() || (s.set(s._backup || new It().translate(s.getTranslation())), r = this.getBounds()), u.scale(
                r.width !== 0 ? i.width / r.width : 0,
                r.height !== 0 ? i.height / r.height : 0
              )), l = r.getCenter(), u.translate(-l.x, -l.y), this.transform(u);
            },
            _getBounds: function(i, r) {
              var s = this._children;
              return !s || !s.length ? new ut() : (kt._updateBoundsCache(this, r.cacheItem), kt._getBounds(s, i, r));
            },
            _getBoundsCacheKey: function(i, r) {
              return [
                i.stroke ? 1 : 0,
                i.handle ? 1 : 0,
                r ? 1 : 0
              ].join("");
            },
            _getCachedBounds: function(i, r, s) {
              i = i && i._orNullIfIdentity();
              var u = r.internal && !s, l = r.cacheItem, f = u ? null : this._matrix._orNullIfIdentity(), d = l && (!i || i.equals(f)) && this._getBoundsCacheKey(r, u), c = this._bounds;
              if (kt._updateBoundsCache(this._parent || this._symbol, l), d && c && d in c) {
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
              var s = this.getStrokeScaling() ? null : r && r.internal ? this : this._parent || this._symbol && this._symbol._item, u = s ? s.getViewMatrix().invert() : i;
              return u && u._shiftless();
            },
            statics: {
              _updateBoundsCache: function(i, r) {
                if (i && r) {
                  var s = r._id, u = i._boundsCache = i._boundsCache || {
                    ids: {},
                    list: []
                  };
                  u.ids[s] || (u.list.push(r), u.ids[s] = r);
                }
              },
              _clearBoundsCache: function(i) {
                var r = i._boundsCache;
                if (r) {
                  i._bounds = i._position = i._boundsCache = n;
                  for (var s = 0, u = r.list, l = u.length; s < l; s++) {
                    var f = u[s];
                    f !== i && (f._bounds = f._position = n, f._boundsCache && kt._clearBoundsCache(f));
                  }
                }
              },
              _getBounds: function(i, r, s) {
                var u = 1 / 0, l = -u, f = u, d = l, c = !1;
                s = s || {};
                for (var p = 0, g = i.length; p < g; p++) {
                  var b = i[p];
                  if (b._visible && !b.isEmpty(!0)) {
                    var S = b._getCachedBounds(
                      r && r.appended(b._matrix),
                      s,
                      !0
                    ), x = S.rect;
                    u = Math.min(x.x, u), f = Math.min(x.y, f), l = Math.max(x.x + x.width, l), d = Math.max(x.y + x.height, d), S.nonscaling && (c = !0);
                  }
                }
                return {
                  rect: isFinite(u) ? new ut(u, f, l - u, d - f) : new ut(),
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
              var s = this._decomposed;
              this.rotate(i - r), s && (s.rotation = i, this._decomposed = s);
            }
          },
          getScaling: function() {
            var i = this._decompose(), r = i && i.scaling;
            return new yt(r ? r.x : 1, r ? r.y : 1, this, "setScaling");
          },
          setScaling: function() {
            var i = this.getScaling(), r = F.read(arguments, 0, { clone: !0, readNull: !0 });
            if (i && r && !i.equals(r)) {
              var s = this.getRotation(), u = this._decomposed, l = new It(), f = U.isZero;
              if (f(i.x) || f(i.y))
                l.translate(u.translation), s && l.rotate(s), l.scale(r.x, r.y), this._matrix.set(l);
              else {
                var d = this.getPosition(!0);
                l.translate(d), s && l.rotate(s), l.scale(r.x / i.x, r.y / i.y), s && l.rotate(-s), l.translate(d.negate()), this.transform(l);
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
              for (var s = this._parent, u = []; s; ) {
                if (!s._globalMatrix) {
                  r = null;
                  for (var l = 0, f = u.length; l < f; l++)
                    u[l]._globalMatrix = null;
                  break;
                }
                u.push(s), s = s._parent;
              }
            if (!r) {
              r = this._globalMatrix = this._matrix.clone();
              var s = this._parent;
              s && r.prepend(s.getGlobalMatrix(!0));
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
              for (var s = this._children, u = 0, l = s && s.length; u < l; u++)
                s[u]._setProject(i);
              r = !0;
            }
            r && this._installEvents(!0);
          },
          getView: function() {
            return this._project._view;
          },
          _installEvents: function i(r) {
            i.base.call(this, r);
            for (var s = this._children, u = 0, l = s && s.length; u < l; u++)
              s[u]._installEvents(r);
          },
          getLayer: function() {
            for (var i = this; i = i._parent; )
              if (i instanceof Ot)
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
            return h.equals(this._children, i._children);
          },
          clone: function(i) {
            var r = new this.constructor(kt.NO_INSERT), s = this._children, u = h.pick(
              i ? i.insert : n,
              i === n || i === !0
            ), l = h.pick(i ? i.deep : n, !0);
            s && r.copyAttributes(this), (!s || l) && r.copyContent(this), s || r.copyAttributes(this), u && r.insertAbove(this);
            var f = this._name, d = this._parent;
            if (f && d) {
              for (var s = d._children, c = f, p = 1; s[f]; )
                f = c + " " + p++;
              f !== c && r.setName(f);
            }
            return r;
          },
          copyContent: function(i) {
            for (var r = i._children, s = 0, u = r && r.length; s < u; s++)
              this.addChild(r[s].clone(!1), !0);
          },
          copyAttributes: function(i, r) {
            this.setStyle(i._style);
            for (var s = [
              "_locked",
              "_visible",
              "_blendMode",
              "_opacity",
              "_clipMask",
              "_guide"
            ], u = 0, l = s.length; u < l; u++) {
              var f = s[u];
              i.hasOwnProperty(f) && (this[f] = i[f]);
            }
            r || this._matrix.set(i._matrix, !0), this.setApplyMatrix(i._applyMatrix), this.setPivot(i._pivot), this.setSelection(i._selection);
            var d = i._data, c = i._name;
            this._data = d ? h.clone(d) : null, c && this.setName(c);
          },
          rasterize: function(i, r) {
            var s, u, l;
            h.isPlainObject(i) ? (s = i.resolution, u = i.insert, l = i.raster) : (s = i, u = r), l || (l = new Ke(kt.NO_INSERT));
            var f = this.getStrokeBounds(), d = (s || this.getView().getResolution()) / 72, c = f.getTopLeft().floor(), p = f.getBottomRight().ceil(), g = new it(p.subtract(c)), b = g.multiply(d);
            if (l.setSize(b, !0), !b.isZero()) {
              var S = l.getContext(!0), x = new It().scale(d).translate(c.negate());
              S.save(), x.applyToContext(S), this.draw(S, new h({ matrices: [x] })), S.restore();
            }
            return l._matrix.set(
              new It().translate(c.add(g.divide(2))).scale(1 / d)
            ), (u === n || u) && l.insertAbove(this), l;
          },
          contains: function() {
            var i = this._matrix;
            return i.isInvertible() && !!this._contains(i._inverseTransform(F.read(arguments)));
          },
          _contains: function(i) {
            var r = this._children;
            if (r) {
              for (var s = r.length - 1; s >= 0; s--)
                if (r[s].contains(i))
                  return !0;
              return !1;
            }
            return i.isInside(this.getInternalBounds());
          },
          isInside: function() {
            return ut.read(arguments).contains(this.getBounds());
          },
          _asPathItem: function() {
            return new Yt.Rectangle({
              rectangle: this.getInternalBounds(),
              matrix: this._matrix,
              insert: !1
            });
          },
          intersects: function(i, r) {
            return i instanceof kt ? this._asPathItem().getIntersections(
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
              Ye.getOptions(u)
            );
          }
          function r() {
            var u = arguments, l = F.read(u), f = Ye.getOptions(u), d = [];
            return this._hitTest(l, new h({ all: d }, f)), d;
          }
          function s(u, l, f, d) {
            var c = this._children;
            if (c)
              for (var p = c.length - 1; p >= 0; p--) {
                var g = c[p], b = g !== d && g._hitTest(
                  u,
                  l,
                  f
                );
                if (b && !l.all)
                  return b;
              }
            return null;
          }
          return ie.inject({
            hitTest: i,
            hitTestAll: r,
            _hitTest: s
          }), {
            hitTest: i,
            hitTestAll: r,
            _hitTestChildren: s
          };
        }(),
        {
          _hitTest: function(i, r, s) {
            if (this._locked || !this._visible || this._guide && !r.guides || this.isEmpty())
              return null;
            var u = this._matrix, l = s ? s.appended(u) : this.getGlobalMatrix().prepend(this.getView()._matrix), f = Math.max(r.tolerance, 1e-12), d = r._tolerancePadding = new it(
              Yt._getStrokePadding(
                f,
                u._shiftless().invert()
              )
            );
            if (i = u._inverseTransform(i), !i || !this._children && !this.getBounds({ internal: !0, stroke: !0, handle: !0 }).expand(d.multiply(2))._containsPoint(i))
              return null;
            var c = !(r.guides && !this._guide || r.selected && !this.isSelected() || r.type && r.type !== h.hyphenate(this._class) || r.class && !(this instanceof r.class)), p = r.match, g = this, b, S;
            function x(m) {
              return m && p && !p(m) && (m = null), m && r.all && r.all.push(m), m;
            }
            function y(m, I) {
              var T = I ? b["get" + I]() : g.getPosition();
              if (i.subtract(T).divide(d).length <= 1)
                return new Ye(m, g, {
                  name: I ? h.hyphenate(I) : m,
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
                ], A = 0; A < 8 && !S; A++)
                  S = y("bounds", w[A]);
              S = x(S);
            }
            return S || (S = this._hitTestChildren(i, r, l) || c && x(this._hitTestSelf(
              i,
              r,
              l,
              this.getStrokeScaling() ? null : l._shiftless().invert()
            )) || null), S && S.point && (S.point = u.transform(S.point)), S;
          },
          _hitTestSelf: function(i, r) {
            if (r.fill && this.hasFill() && this._contains(i))
              return new Ye("fill", this);
          },
          matches: function(i, r) {
            function s(d, c) {
              for (var p in d)
                if (d.hasOwnProperty(p)) {
                  var g = d[p], b = c[p];
                  if (h.isPlainObject(g) && h.isPlainObject(b)) {
                    if (!s(g, b))
                      return !1;
                  } else if (!h.equals(g, b))
                    return !1;
                }
              return !0;
            }
            var u = typeof i;
            if (u === "object") {
              for (var l in i)
                if (i.hasOwnProperty(l) && !this.matches(l, i[l]))
                  return !1;
              return !0;
            } else {
              if (u === "function")
                return i(this);
              if (i === "match")
                return r(this);
              var f = /^(empty|editable)$/.test(i) ? this["is" + h.capitalize(i)]() : i === "type" ? h.hyphenate(this._class) : this[i];
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
                if (h.isPlainObject(r))
                  return s(r, f);
              }
              return h.equals(f, r);
            }
          },
          getItems: function(i) {
            return kt._getItems(this, i, this._matrix);
          },
          getItem: function(i) {
            return kt._getItems(this, i, this._matrix, null, !0)[0] || null;
          },
          statics: {
            _getItems: function i(r, s, u, l, f) {
              if (!l) {
                var d = typeof s == "object" && s, c = d && d.overlapping, p = d && d.inside, g = c || p, x = g && ut.read([g]);
                l = {
                  items: [],
                  recursive: d && d.recursive !== !1,
                  inside: !!p,
                  overlapping: !!c,
                  rect: x,
                  path: c && new Yt.Rectangle({
                    rectangle: x,
                    insert: !1
                  })
                }, d && (s = h.filter({}, s, {
                  recursive: !0,
                  inside: !0,
                  overlapping: !0
                }));
              }
              var b = r._children, S = l.items, x = l.rect;
              u = x && (u || new It());
              for (var y = 0, E = b && b.length; y < E; y++) {
                var C = b[y], O = u && u.appended(C._matrix), w = !0;
                if (x) {
                  var g = C.getBounds(O);
                  if (!x.intersects(g))
                    continue;
                  x.contains(g) || l.overlapping && (g.contains(x) || l.path.intersects(C, O)) || (w = !1);
                }
                if (w && C.matches(s) && (S.push(C), f) || (l.recursive !== !1 && i(C, s, O, l, f), f && S.length > 0))
                  break;
              }
              return S;
            }
          }
        },
        {
          importJSON: function(i) {
            var r = h.importJSON(i, this);
            return r !== this ? this.addChild(r) : r;
          },
          addChild: function(i) {
            return this.insertChild(n, i);
          },
          insertChild: function(i, r) {
            var s = r ? this.insertChildren(i, [r]) : null;
            return s && s[0];
          },
          addChildren: function(i) {
            return this.insertChildren(this._children.length, i);
          },
          insertChildren: function(i, r) {
            var s = this._children;
            if (s && r && r.length > 0) {
              r = h.slice(r);
              for (var u = {}, l = r.length - 1; l >= 0; l--) {
                var f = r[l], d = f && f._id;
                !f || u[d] ? r.splice(l, 1) : (f._remove(!1, !0), u[d] = !0);
              }
              h.splice(s, r, i, 0);
              for (var c = this._project, p = c._changes, l = 0, g = r.length; l < g; l++) {
                var f = r[l], b = f._name;
                f._parent = this, f._setProject(c, !0), b && f.setName(b), p && f._changed(5);
              }
              this._changed(11);
            } else
              r = null;
            return r;
          },
          _insertItem: "#insertChild",
          _insertAt: function(i, r) {
            var s = i && i._getOwner(), u = i !== this && s ? this : null;
            return u && (u._remove(!1, !0), s._insertItem(i._index + r, u)), u;
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
              var s = r[0].reduce(i);
              return this._parent ? (s.insertAbove(this), this.remove()) : s.remove(), s;
            }
            return this;
          },
          _removeNamed: function() {
            var i = this._getOwner();
            if (i) {
              var r = i._children, s = i._namedChildren, u = this._name, l = s[u], f = l ? l.indexOf(this) : -1;
              f !== -1 && (r[u] == this && delete r[u], l.splice(f, 1), l.length ? r[u] = l[0] : delete s[u]);
            }
          },
          _remove: function(i, r) {
            var s = this._getOwner(), u = this._project, l = this._index;
            return this._style && this._style._dispose(), s ? (this._name && this._removeNamed(), l != null && (u._activeLayer === this && (u._activeLayer = this.getNextSibling() || this.getPreviousSibling()), h.splice(s._children, null, l, 1)), this._installEvents(!1), i && u._changes && this._changed(5), r && s._changed(11, this), this._parent = null, !0) : !1;
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
            i = i || 0, r = h.pick(r, this._children.length);
            for (var s = h.splice(this._children, null, i, r - i), u = s.length - 1; u >= 0; u--)
              s[u]._remove(!0, !1);
            return s.length > 0 && this._changed(11), s;
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
            var r = this._children, s = r ? r.length : 0;
            if (i) {
              for (var u = 0; u < s; u++)
                if (!r[u].isEmpty(i))
                  return !1;
              return !0;
            }
            return !s;
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
            for (var s = r(this), u = r(i), l = 0, f = Math.min(s.length, u.length); l < f; l++)
              if (s[l] != u[l])
                return s[l]._index < u[l]._index ? 1 : -1;
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
        h.each(["rotate", "scale", "shear", "skew"], function(i) {
          var r = i === "rotate";
          this[i] = function() {
            var s = arguments, u = (r ? h : F).read(s), l = F.read(s, 0, { readNull: !0 });
            return this.transform(new It()[i](
              u,
              l || this.getPosition(!0)
            ));
          };
        }, {
          translate: function() {
            var i = new It();
            return this.transform(i.translate.apply(i, arguments));
          },
          transform: function(i, r, s) {
            var u = this._matrix, l = i && !i.isIdentity(), f = s && this._canApplyMatrix || this._applyMatrix && (l || !u.isIdentity() || r && this._children);
            if (!l && !f)
              return this;
            if (l) {
              !i.isInvertible() && u.isInvertible() && (u._backup = u.getValues()), u.prepend(i, !0);
              var d = this._style, c = d.getFillColor(!0), p = d.getStrokeColor(!0);
              c && c.transform(i), p && p.transform(i);
            }
            if (f && (f = this._transformContent(
              u,
              r,
              s
            ))) {
              var g = this._pivot;
              g && u._transformPoint(g, g, !0), u.reset(!0), s && this._canApplyMatrix && (this._applyMatrix = !0);
            }
            var b = this._bounds, S = this._position;
            (l || f) && this._changed(25);
            var x = l && b && i.decompose();
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
            } else l && S && this._pivot && (this._position = i._transformPoint(S, S));
            return this;
          },
          _transformContent: function(i, r, s) {
            var u = this._children;
            if (u) {
              for (var l = 0, f = u.length; l < f; l++)
                u[l].transform(i, r, s);
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
            var s = this.getBounds(), u = s.height / s.width, l = i.height / i.width, f = (r ? u > l : u < l) ? i.width / s.width : i.height / s.height, d = new ut(
              new F(),
              new it(s.width * f, s.height * f)
            );
            d.setCenter(i.getCenter()), this.setBounds(d);
          }
        }),
        {
          _setStyles: function(i, r, s) {
            var u = this._style, l = this._matrix;
            if (u.hasFill() && (i.fillStyle = u.getFillColor().toCanvasStyle(i, l)), u.hasStroke()) {
              i.strokeStyle = u.getStrokeColor().toCanvasStyle(i, l), i.lineWidth = u.getStrokeWidth();
              var f = u.getStrokeJoin(), d = u.getStrokeCap(), c = u.getMiterLimit();
              if (f && (i.lineJoin = f), d && (i.lineCap = d), c && (i.miterLimit = c), pt.support.nativeDash) {
                var p = u.getDashArray(), g = u.getDashOffset();
                p && p.length && ("setLineDash" in i ? (i.setLineDash(p), i.lineDashOffset = g) : (i.mozDash = p, i.mozDashOffset = g));
              }
            }
            if (u.hasShadow()) {
              var b = r.pixelRatio || 1, S = s._shiftless().prepend(
                new It().scale(b, b)
              ), x = S.transform(new F(u.getShadowBlur(), 0)), y = S.transform(this.getShadowOffset());
              i.shadowColor = u.getShadowColor().toCanvasStyle(i), i.shadowBlur = x.getLength(), i.shadowOffsetX = y.x, i.shadowOffsetY = y.y;
            }
          },
          draw: function(i, r, s) {
            if (this._updateVersion = this._project._updateVersion, !(!this._visible || this._opacity === 0)) {
              var u = r.matrices, l = r.viewMatrix, f = this._matrix, d = u[u.length - 1].appended(f);
              if (d.isInvertible()) {
                l = l ? l.appended(d) : d, u.push(d), r.updateMatrix && (this._globalMatrix = d);
                var c = this._blendMode, p = U.clamp(this._opacity, 0, 1), g = c === "normal", b = Mt.nativeModes[c], S = g && p === 1 || r.dontStart || r.clip || (b || g && p < 1) && this._canComposite(), x = r.pixelRatio || 1, y, E, C;
                if (!S) {
                  var O = this.getStrokeBounds(l);
                  if (!O.width || !O.height) {
                    u.pop();
                    return;
                  }
                  C = r.offset, E = r.offset = O.getTopLeft().floor(), y = i, i = st.getContext(O.getSize().ceil().add(1).multiply(x)), x !== 1 && i.scale(x, x);
                }
                i.save();
                var w = s ? s.appended(f) : this._canScaleStroke && !this.getStrokeScaling(!0) && l, A = !S && r.clipItem, m = !w || A;
                if (S ? (i.globalAlpha = p, b && (i.globalCompositeOperation = c)) : m && i.translate(-E.x, -E.y), m && (S ? f : l).applyToContext(i), A && r.clipItem.draw(i, r.extend({ clip: !0 })), w) {
                  i.setTransform(x, 0, 0, x, 0, 0);
                  var I = r.offset;
                  I && i.translate(-I.x, -I.y);
                }
                this._draw(i, r, l, w), i.restore(), u.pop(), r.clip && !r.dontFinish && i.clip(this.getFillRule()), S || (Mt.process(
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
            if (r instanceof $e)
              return r._isUpdated(i);
            var s = this._updateVersion === i;
            return !s && r && r._visible && r._isUpdated(i) && (this._updateVersion = i, s = !0), s;
          },
          _drawSelection: function(i, r, s, u, l) {
            var f = this._selection, d = f & 1, c = f & 2 || d && this._selectBounds, p = f & 4;
            if (this._drawSelected || (d = !1), (d || c || p) && this._isUpdated(l)) {
              var g, b = this.getSelectedColor(!0) || (g = this.getLayer()) && g.getSelectedColor(!0), S = r.appended(this.getGlobalMatrix(!0)), x = s / 2;
              if (i.strokeStyle = i.fillStyle = b ? b.toCanvasStyle(i) : "#009dec", d && this._drawSelected(i, S, u), p) {
                var y = this.getPosition(!0), E = this._parent, C = E ? E.localToGlobal(y) : y, O = C.x, w = C.y;
                i.beginPath(), i.arc(O, w, x, 0, Math.PI * 2, !0), i.stroke();
                for (var A = [[0, -1], [1, 0], [0, 1], [-1, 0]], m = x, I = s + 1, T = 0; T < 4; T++) {
                  var M = A[T], P = M[0], N = M[1];
                  i.moveTo(O + P * m, w + N * m), i.lineTo(O + P * I, w + N * I), i.stroke();
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
                    s,
                    s
                  );
              }
            }
          },
          _canComposite: function() {
            return !1;
          }
        },
        h.each(["down", "drag", "up", "move"], function(i) {
          this["removeOn" + h.capitalize(i)] = function() {
            var r = {};
            return r[i] = !0, this.removeOn(r);
          };
        }, {
          removeOn: function(i) {
            for (var r in i)
              if (i[r]) {
                var s = "mouse" + r, u = this._project, l = u._removeSets = u._removeSets || {};
                l[s] = l[s] || {}, l[s][this._id] = this;
              }
            return this;
          }
        }),
        {
          tween: function(i, r, s) {
            s || (s = r, r = i, i = null, s || (s = r, r = null));
            var u = s && s.easing, l = s && s.start, f = s != null && (typeof s == "number" ? s : s.duration), d = new vt(this, i, r, f, u, l);
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
      ), At = kt.extend({
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
            for (var r = this._children, s = 0, u = r.length; s < u; s++)
              if (r[s]._clipMask) {
                i = r[s];
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
        _getBounds: function i(r, s) {
          var u = this._getClipItem();
          return u ? u._getCachedBounds(
            u._matrix.prepended(r),
            h.set({}, s, { stroke: !1 })
          ) : i.base.call(this, r, s);
        },
        _hitTestChildren: function i(r, s, u) {
          var l = this._getClipItem();
          return (!l || l.contains(r)) && i.base.call(
            this,
            r,
            s,
            u,
            l
          );
        },
        _draw: function(i, r) {
          var s = r.clip, u = !s && this._getClipItem();
          r = r.extend({ clipItem: u, clip: !1 }), s ? (i.beginPath(), r.dontStart = r.dontFinish = !0) : u && u.draw(i, r.extend({ clip: !0 }));
          for (var l = this._children, f = 0, d = l.length; f < d; f++) {
            var c = l[f];
            c !== u && c.draw(i, r);
          }
        }
      }), Ot = At.extend({
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
      }), ve = kt.extend(
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
          initialize: function(r, s) {
            this._initialize(r, s);
          },
          _equals: function(i) {
            return this._type === i._type && this._size.equals(i._size) && h.equals(this._radius, i._radius);
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
            return new Tt(i.width, i.height, this, "setSize");
          },
          setSize: function() {
            var i = it.read(arguments);
            if (!this._size)
              this._size = i.clone();
            else if (!this._size.equals(i)) {
              var r = this._type, s = i.width, u = i.height;
              r === "rectangle" ? this._radius.set(it.min(this._radius, i.divide(2).abs())) : r === "circle" ? (s = u = (s + u) / 2, this._radius = s / 2) : r === "ellipse" && this._radius._set(s / 2, u / 2), this._size._set(s, u), this._changed(9);
            }
          },
          getRadius: function() {
            var i = this._radius;
            return this._type === "circle" ? i : new Tt(i.width, i.height, this, "setRadius");
          },
          setRadius: function(i) {
            var r = this._type;
            if (r === "circle") {
              if (i === this._radius)
                return;
              var s = i * 2;
              this._radius = i, this._size._set(s, s);
            } else if (i = it.read(arguments), !this._radius)
              this._radius = i.clone();
            else {
              if (this._radius.equals(i))
                return;
              if (this._radius.set(i), r === "rectangle") {
                var s = it.max(this._size, i.multiply(2));
                this._size.set(s);
              } else r === "ellipse" && this._size._set(i.width * 2, i.height * 2);
            }
            this._changed(9);
          },
          isEmpty: function() {
            return !1;
          },
          toPath: function(i) {
            var r = new Yt[h.capitalize(this._type)]({
              center: new F(),
              size: this._size,
              radius: this._radius,
              insert: !1
            });
            return r.copyAttributes(this), pt.settings.applyMatrix && r.setApplyMatrix(!0), (i === n || i) && r.insertAbove(this), r;
          },
          toShape: "#clone",
          _asPathItem: function() {
            return this.toPath(!1);
          },
          _draw: function(i, r, s, u) {
            var l = this._style, f = l.hasFill(), d = l.hasStroke(), c = r.dontFinish || r.clip, p = !u;
            if (f || d || c) {
              var g = this._type, b = this._radius, S = g === "circle";
              if (r.dontStart || i.beginPath(), p && S)
                i.arc(0, 0, b, 0, Math.PI * 2, !0);
              else {
                var x = S ? b : b.width, y = S ? b : b.height, E = this._size, C = E.width, O = E.height;
                if (p && g === "rectangle" && x === 0 && y === 0)
                  i.rect(-C / 2, -O / 2, C, O);
                else {
                  var w = C / 2, A = O / 2, m = 1 - 0.5522847498307936, I = x * m, T = y * m, M = [
                    -w,
                    -A + y,
                    -w,
                    -A + T,
                    -w + I,
                    -A,
                    -w + x,
                    -A,
                    w - x,
                    -A,
                    w - I,
                    -A,
                    w,
                    -A + T,
                    w,
                    -A + y,
                    w,
                    A - y,
                    w,
                    A - T,
                    w - I,
                    A,
                    w - x,
                    A,
                    -w + x,
                    A,
                    -w + I,
                    A,
                    -w,
                    A - T,
                    -w,
                    A - y
                  ];
                  u && u.transform(M, M, 32), i.moveTo(M[0], M[1]), i.bezierCurveTo(M[2], M[3], M[4], M[5], M[6], M[7]), w !== x && i.lineTo(M[8], M[9]), i.bezierCurveTo(M[10], M[11], M[12], M[13], M[14], M[15]), A !== y && i.lineTo(M[16], M[17]), i.bezierCurveTo(M[18], M[19], M[20], M[21], M[22], M[23]), w !== x && i.lineTo(M[24], M[25]), i.bezierCurveTo(M[26], M[27], M[28], M[29], M[30], M[31]);
                }
              }
              i.closePath();
            }
            !c && (f || d) && (this._setStyles(i, r, s), f && (i.fill(l.getFillRule()), i.shadowColor = "rgba(0,0,0,0)"), d && i.stroke());
          },
          _canComposite: function() {
            return !(this.hasFill() && this.hasStroke());
          },
          _getBounds: function(i, r) {
            var s = new ut(this._size).setCenter(0, 0), u = this._style, l = r.stroke && u.hasStroke() && u.getStrokeWidth();
            return i && (s = i._transformBounds(s)), l ? s.expand(Yt._getStrokePadding(
              l,
              this._getStrokeMatrix(i, r)
            )) : s;
          }
        },
        new function() {
          function i(s, u, l) {
            var f = s._radius;
            if (!f.isZero())
              for (var d = s._size.divide(2), c = 1; c <= 4; c++) {
                var p = new F(c > 1 && c < 4 ? -1 : 1, c > 2 ? -1 : 1), g = p.multiply(d), b = g.subtract(p.multiply(f)), S = new ut(
                  l ? g.add(p.multiply(l)) : g,
                  b
                );
                if (S.contains(u))
                  return { point: b, quadrant: c };
              }
          }
          function r(s, u, l, f) {
            var d = s.divide(u);
            return (!f || d.isInQuadrant(f)) && d.subtract(d.normalize()).multiply(u).divide(l).length <= 1;
          }
          return {
            _contains: function s(u) {
              if (this._type === "rectangle") {
                var l = i(this, u);
                return l ? u.subtract(l.point).divide(this._radius).getLength() <= 1 : s.base.call(this, u);
              } else
                return u.divide(this.size).getLength() <= 0.5;
            },
            _hitTestSelf: function s(u, l, f, d) {
              var c = !1, p = this._style, g = l.stroke && p.hasStroke(), b = l.fill && p.hasFill();
              if (g || b) {
                var S = this._type, x = this._radius, y = g ? p.getStrokeWidth() / 2 : 0, E = l._tolerancePadding.add(
                  Yt._getStrokePadding(
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
                    var w = new ut(this._size).setCenter(0, 0), A = w.expand(C), m = w.expand(C.negate());
                    c = A._containsPoint(u) && !m._containsPoint(u);
                  }
                } else
                  c = r(u, x, E);
              }
              return c ? new Ye(g ? "stroke" : "fill", this) : s.base.apply(this, arguments);
            }
          };
        }(),
        {
          statics: new function() {
            function i(r, s, u, l, f) {
              var d = h.create(ve.prototype);
              return d._type = r, d._size = u, d._radius = l, d._initialize(h.getNamed(f), s), d;
            }
            return {
              Circle: function() {
                var r = arguments, s = F.readNamed(r, "center"), u = h.readNamed(r, "radius");
                return i(
                  "circle",
                  s,
                  new it(u * 2),
                  u,
                  r
                );
              },
              Rectangle: function() {
                var r = arguments, s = ut.readNamed(r, "rectangle"), u = it.min(
                  it.readNamed(r, "radius"),
                  s.getSize(!0).divide(2)
                );
                return i(
                  "rectangle",
                  s.getCenter(!0),
                  s.getSize(!0),
                  u,
                  r
                );
              },
              Ellipse: function() {
                var r = arguments, s = ve._readEllipse(r), u = s.radius;
                return i(
                  "ellipse",
                  s.center,
                  u.multiply(2),
                  u,
                  r
                );
              },
              _readEllipse: function(r) {
                var s, u;
                if (h.hasNamed(r, "radius"))
                  s = F.readNamed(r, "center"), u = it.readNamed(r, "radius");
                else {
                  var l = ut.readNamed(r, "rectangle");
                  s = l.getCenter(!0), u = l.getSize(!0).divide(2);
                }
                return { center: s, radius: u };
              }
            };
          }()
        }
      ), Ke = kt.extend({
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
        initialize: function(r, s) {
          if (!this._initialize(
            r,
            s !== n && F.read(arguments)
          )) {
            var u, l = typeof r, f = l === "string" ? o.getElementById(r) : l === "object" ? r : null;
            if (f && f !== kt.NO_INSERT) {
              if (f.getContext || f.naturalHeight != null)
                u = f;
              else if (f) {
                var d = it.read(arguments);
                d.isZero() || (u = st.getCanvas(d));
              }
            }
            u ? this.setImage(u) : this.setSource(r);
          }
          this._size || (this._size = new it(), this._loaded = !1);
        },
        _equals: function(i) {
          return this.getSource() === i.getSource();
        },
        copyContent: function(i) {
          var r = i._image, s = i._canvas;
          if (r)
            this._setImage(r);
          else if (s) {
            var u = st.getCanvas(i._size);
            u.getContext("2d").drawImage(s, 0, 0), this._setImage(u);
          }
          this._crossOrigin = i._crossOrigin;
        },
        getSize: function() {
          var i = this._size;
          return new Tt(
            i ? i.width : 0,
            i ? i.height : 0,
            this,
            "setSize"
          );
        },
        setSize: function(i, r) {
          var s = it.read(arguments);
          if (s.equals(this._size))
            r && this.clear();
          else if (s.width > 0 && s.height > 0) {
            var u = !r && this.getElement();
            this._setImage(st.getCanvas(s)), u && this.getContext(!0).drawImage(
              u,
              0,
              0,
              s.width,
              s.height
            );
          } else
            this._canvas && st.release(this._canvas), this._size = s.clone();
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
          var i = this._matrix, r = new F(0, 0).transform(i), s = new F(1, 0).transform(i).subtract(r), u = new F(0, 1).transform(i).subtract(r);
          return new it(
            72 / s.getLength(),
            72 / u.getLength()
          );
        },
        getPpi: "#getResolution",
        getImage: function() {
          return this._image;
        },
        setImage: function(i) {
          var r = this;
          function s(u) {
            var l = r.getView(), f = u && u.type || "load";
            l && r.responds(f) && (pt = l._scope, r.emit(f, new K(u)));
          }
          this._setImage(i), this._loaded ? setTimeout(s, 0) : i && ye.add(i, {
            load: function(u) {
              r._setImage(i), s(u);
            },
            error: s
          });
        },
        _setImage: function(i) {
          this._canvas && st.release(this._canvas), i && i.getContext ? (this._image = null, this._canvas = i, this._loaded = !0) : (this._image = i, this._canvas = null, this._loaded = !!(i && i.src && i.complete)), this._size = new it(
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
          var r = new e.Image(), s = this._crossOrigin;
          s && (r.crossOrigin = s), i && (r.src = i), this.setImage(r);
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
          var i = ut.read(arguments), r = new Ke(kt.NO_INSERT);
          return r._setImage(this.getSubCanvas(i)), r.translate(i.getCenter().subtract(this.getSize().divide(2))), r._matrix.prepend(this._matrix), r.insertAbove(this), r;
        },
        toDataURL: function() {
          var i = this._image, r = i && i.src;
          if (/^data:/.test(r))
            return r;
          var s = this.getCanvas();
          return s ? s.toDataURL.apply(s, arguments) : null;
        },
        drawImage: function(i) {
          var r = F.read(arguments, 1);
          this.getContext(!0).drawImage(i, r.x, r.y);
        },
        getAverageColor: function(i) {
          var r, s;
          if (i ? i instanceof oe ? (s = i, r = i.getBounds()) : typeof i == "object" && ("width" in i ? r = new ut(i) : "x" in i && (r = new ut(i.x - 0.5, i.y - 0.5, 1, 1))) : r = this.getBounds(), !r)
            return null;
          var u = 32, l = Math.min(r.width, u), f = Math.min(r.height, u), d = Ke._sampleContext;
          d ? d.clearRect(0, 0, u + 1, u + 1) : d = Ke._sampleContext = st.getContext(
            new it(u)
          ), d.save();
          var c = new It().scale(l / r.width, f / r.height).translate(-r.x, -r.y);
          c.applyToContext(d), s && s.draw(d, new h({ clip: !0, matrices: [c] })), this._matrix.applyToContext(d);
          var p = this.getElement(), g = this._size;
          p && d.drawImage(p, -g.width / 2, -g.height / 2), d.restore();
          for (var b = d.getImageData(
            0.5,
            0.5,
            Math.ceil(l),
            Math.ceil(f)
          ).data, S = [0, 0, 0], x = 0, y = 0, E = b.length; y < E; y += 4) {
            var C = b[y + 3];
            x += C, C /= 255, S[0] += b[y] * C, S[1] += b[y + 1] * C, S[2] += b[y + 2] * C;
          }
          for (var y = 0; y < 3; y++)
            S[y] /= x;
          return x ? Pe.read(S) : null;
        },
        getPixel: function() {
          var i = F.read(arguments), r = this.getContext().getImageData(i.x, i.y, 1, 1).data;
          return new Pe(
            "rgb",
            [r[0] / 255, r[1] / 255, r[2] / 255],
            r[3] / 255
          );
        },
        setPixel: function() {
          var i = arguments, r = F.read(i), s = Pe.read(i), u = s._convert("rgb"), l = s._alpha, f = this.getContext(!0), d = f.createImageData(1, 1), c = d.data;
          c[0] = u[0] * 255, c[1] = u[1] * 255, c[2] = u[2] * 255, c[3] = l != null ? l * 255 : 255, f.putImageData(d, r.x, r.y);
        },
        clear: function() {
          var i = this._size;
          this.getContext(!0).clearRect(0, 0, i.width + 1, i.height + 1);
        },
        createImageData: function() {
          var i = it.read(arguments);
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
          var s = new ut(this._size).setCenter(0, 0);
          return i ? i._transformBounds(s) : s;
        },
        _hitTestSelf: function(i) {
          if (this._contains(i)) {
            var r = this;
            return new Ye("pixel", r, {
              offset: i.add(r._size.divide(2)).round(),
              color: {
                get: function() {
                  return r.getPixel(this.offset);
                }
              }
            });
          }
        },
        _draw: function(i, r, s) {
          var u = this.getElement();
          if (u && u.width > 0 && u.height > 0) {
            i.globalAlpha = U.clamp(this._opacity, 0, 1), this._setStyles(i, r, s);
            var l = this._smoothing, f = l === "off";
            we.setPrefixed(
              i,
              f ? "imageSmoothingEnabled" : "imageSmoothingQuality",
              f ? !1 : l
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
      }), Ai = kt.extend({
        _class: "SymbolItem",
        _applyMatrix: !1,
        _canApplyMatrix: !1,
        _boundsOptions: { stroke: !0 },
        _serializeFields: {
          symbol: null
        },
        initialize: function(r, s) {
          this._initialize(
            r,
            s !== n && F.read(arguments, 1)
          ) || this.setDefinition(r instanceof Ne ? r : new Ne(r));
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
          var s = this._definition._item;
          return s._getCachedBounds(s._matrix.prepended(i), r);
        },
        _hitTestSelf: function(i, r, s) {
          var u = r.extend({ all: !1 }), l = this._definition._item._hitTest(i, u, s);
          return l && (l.item = this), l;
        },
        _draw: function(i, r) {
          this._definition._item.draw(i, r);
        }
      }), Ne = h.extend({
        _class: "SymbolDefinition",
        initialize: function(r, s) {
          this._id = et.get(), this.project = pt.project, r && this.setItem(r, s);
        },
        _serialize: function(i, r) {
          return r.add(this, function() {
            return h.serialize(
              [this._class, this._item],
              i,
              !1,
              r
            );
          });
        },
        _changed: function(i) {
          i & 8 && kt._clearBoundsCache(this), i & 1 && this.project._changed(i);
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
          return new Ai(this, i);
        },
        clone: function() {
          return new Ne(this._item.clone(!1));
        },
        equals: function(i) {
          return i === this || i && this._item.equals(i._item) || !1;
        }
      }), Ye = h.extend({
        _class: "HitResult",
        initialize: function(r, s, u) {
          this.type = r, this.item = s, u && this.inject(u);
        },
        statics: {
          getOptions: function(i) {
            var r = i && h.read(i);
            return new h({
              type: null,
              tolerance: pt.settings.hitTolerance,
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
      }), Pt = h.extend({
        _class: "Segment",
        beans: !0,
        _selection: 0,
        initialize: function(r, s, u, l, f, d) {
          var c = arguments.length, p, g, b, S;
          c > 0 && (r == null || typeof r == "object" ? c === 1 && r && "point" in r ? (p = r.point, g = r.handleIn, b = r.handleOut, S = r.selection) : (p = r, g = s, b = u, S = l) : (p = [r, s], g = u !== n ? [u, l] : null, b = f !== n ? [f, d] : null)), new Qn(p, this, "_point"), new Qn(g, this, "_handleIn"), new Qn(b, this, "_handleOut"), S && this.setSelection(S);
        },
        _serialize: function(i, r) {
          var s = this._point, u = this._selection, l = u || this.hasHandles() ? [s, this._handleIn, this._handleOut] : s;
          return u && l.push(u), h.serialize(l, i, !0, r);
        },
        _changed: function(i) {
          var r = this._path;
          if (r) {
            var s = r._curves, u = this._index, l;
            s && ((!i || i === this._point || i === this._handleIn) && (l = u > 0 ? s[u - 1] : r._closed ? s[s.length - 1] : null) && l._changed(), (!i || i === this._point || i === this._handleOut) && (l = s[u]) && l._changed()), r._changed(41);
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
          var r = this._selection, s = this._path;
          this._selection = i = i || 0, s && i !== r && (s._updateSelection(this, r, i), s._changed(257));
        },
        _changeSelection: function(i, r) {
          var s = this._selection;
          this.setSelection(r ? s | i : s & ~i);
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
          return i ? new re(i, this === i._segment1 ? 0 : 1) : null;
        },
        getNext: function() {
          var i = this._path && this._path._segments;
          return i && (i[this._index + 1] || this._path._closed && i[0]) || null;
        },
        smooth: function(i, r, s) {
          var u = i || {}, l = u.type, f = u.factor, d = this.getPrevious(), c = this.getNext(), p = (d || this)._point, g = this._point, b = (c || this)._point, S = p.getDistance(g), x = g.getDistance(b);
          if (!l || l === "catmull-rom") {
            var y = f === n ? 0.5 : f, E = Math.pow(S, y), C = E * E, O = Math.pow(x, y), w = O * O;
            if (!r && d) {
              var A = 2 * w + 3 * O * E + C, m = 3 * O * (O + E);
              this.setHandleIn(m !== 0 ? new F(
                (w * p._x + A * g._x - C * b._x) / m - g._x,
                (w * p._y + A * g._y - C * b._y) / m - g._y
              ) : new F());
            }
            if (!s && c) {
              var A = 2 * C + 3 * E * O + w, m = 3 * E * (E + O);
              this.setHandleOut(m !== 0 ? new F(
                (C * b._x + A * g._x - w * p._x) / m - g._x,
                (C * b._y + A * g._y - w * p._y) / m - g._y
              ) : new F());
            }
          } else if (l === "geometric") {
            if (d && c) {
              var I = p.subtract(b), T = f === n ? 0.4 : f, M = T * S / (S + x);
              r || this.setHandleIn(I.multiply(M)), s || this.setHandleOut(I.multiply(M - T));
            }
          } else
            throw new Error("Smoothing method '" + l + "' not supported.");
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
          var i = this._handleIn, r = this._handleOut, s = i.clone();
          i.set(r), r.set(s);
        },
        reversed: function() {
          return new Pt(this._point, this._handleOut, this._handleIn);
        },
        remove: function() {
          return this._path ? !!this._path.removeSegment(this._index) : !1;
        },
        clone: function() {
          return new Pt(this._point, this._handleIn, this._handleOut);
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
        interpolate: function(i, r, s) {
          var u = 1 - s, l = s, f = i._point, d = r._point, c = i._handleIn, p = r._handleIn, g = r._handleOut, b = i._handleOut;
          this._point._set(
            u * f._x + l * d._x,
            u * f._y + l * d._y,
            !0
          ), this._handleIn._set(
            u * c._x + l * p._x,
            u * c._y + l * p._y,
            !0
          ), this._handleOut._set(
            u * b._x + l * g._x,
            u * b._y + l * g._y,
            !0
          ), this._changed();
        },
        _transformCoordinates: function(i, r, s) {
          var u = this._point, l = !s || !this._handleIn.isZero() ? this._handleIn : null, f = !s || !this._handleOut.isZero() ? this._handleOut : null, d = u._x, c = u._y, p = 2;
          return r[0] = d, r[1] = c, l && (r[p++] = l._x + d, r[p++] = l._y + c), f && (r[p++] = f._x + d, r[p++] = f._y + c), i && (i._transformCoordinates(r, r, p / 2), d = r[0], c = r[1], s ? (u._x = d, u._y = c, p = 2, l && (l._x = r[p++] - d, l._y = r[p++] - c), f && (f._x = r[p++] - d, f._y = r[p++] - c)) : (l || (r[p++] = d, r[p++] = c), f || (r[p++] = d, r[p++] = c))), r;
        }
      }), Qn = F.extend({
        initialize: function(r, s, u) {
          var l, f, d;
          if (!r)
            l = f = 0;
          else if ((l = r[0]) !== n)
            f = r[1];
          else {
            var c = r;
            (l = c.x) === n && (c = F.read(arguments), l = c.x), f = c.y, d = c.selected;
          }
          this._x = l, this._y = f, this._owner = s, s[u] = this, d && this.setSelected(!0);
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
          var i = U.isZero;
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
      }), lt = h.extend(
        {
          _class: "Curve",
          beans: !0,
          initialize: function(r, s, u, l, f, d, c, p) {
            var g = arguments.length, b, S, x, y, E, C;
            g === 3 ? (this._path = r, b = s, S = u) : g ? g === 1 ? "segment1" in r ? (b = new Pt(r.segment1), S = new Pt(r.segment2)) : "point1" in r ? (x = r.point1, E = r.handle1, C = r.handle2, y = r.point2) : Array.isArray(r) && (x = [r[0], r[1]], y = [r[6], r[7]], E = [r[2] - r[0], r[3] - r[1]], C = [r[4] - r[6], r[5] - r[7]]) : g === 2 ? (b = new Pt(r), S = new Pt(s)) : g === 4 ? (x = r, E = s, C = u, y = l) : g === 8 && (x = [r, s], y = [c, p], E = [u - r, l - s], C = [f - c, d - p]) : (b = new Pt(), S = new Pt()), this._segment1 = b || new Pt(x, null, E), this._segment2 = S || new Pt(y, C, null);
          },
          _serialize: function(i, r) {
            return h.serialize(
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
            return new lt(this._segment1, this._segment2);
          },
          toString: function() {
            var i = ["point1: " + this._segment1._point];
            return this._segment1._handleOut.isZero() || i.push("handle1: " + this._segment1._handleOut), this._segment2._handleIn.isZero() || i.push("handle2: " + this._segment2._handleIn), i.push("point2: " + this._segment2._point), "{ " + i.join(", ") + " }";
          },
          classify: function() {
            return lt.classify(this.getValues());
          },
          remove: function() {
            var i = !1;
            if (this._path) {
              var r = this._segment2, s = r._handleOut;
              i = r.remove(), i && this._segment1._handleOut.set(s);
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
            return lt.getValues(this._segment1, this._segment2, i);
          },
          getPoints: function() {
            for (var i = this.getValues(), r = [], s = 0; s < 8; s += 2)
              r.push(new F(i[s], i[s + 1]));
            return r;
          }
        },
        {
          getLength: function() {
            return this._length == null && (this._length = lt.getLength(this.getValues(), 0, 1)), this._length;
          },
          getArea: function() {
            return lt.getArea(this.getValues());
          },
          getLine: function() {
            return new xt(this._segment1._point, this._segment2._point);
          },
          getPart: function(i, r) {
            return new lt(lt.getPart(this.getValues(), i, r));
          },
          getPartLength: function(i, r) {
            return lt.getLength(this.getValues(), i, r);
          },
          divideAt: function(i) {
            return this.divideAtTime(i && i.curve === this ? i.time : this.getTimeAt(i));
          },
          divideAtTime: function(i, r) {
            var s = 1e-8, u = 1 - s, l = null;
            if (i >= s && i <= u) {
              var f = lt.subdivide(this.getValues(), i), d = f[0], c = f[1], p = r || this.hasHandles(), g = this._segment1, b = this._segment2, S = this._path;
              p && (g._handleOut._set(d[2] - d[0], d[3] - d[1]), b._handleIn._set(c[4] - c[6], c[5] - c[7]));
              var x = d[6], y = d[7], E = new Pt(
                new F(x, y),
                p && new F(d[4] - x, d[5] - y),
                p && new F(c[2] - x, c[3] - y)
              );
              S ? (S.insert(g._index + 1, E), l = this.getNext()) : (this._segment2 = E, this._changed(), l = new lt(E, b));
            }
            return l;
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
            return new lt(this._segment2.reversed(), this._segment1.reversed());
          },
          clearHandles: function() {
            this._segment1._handleOut._set(0, 0), this._segment2._handleIn._set(0, 0);
          },
          statics: {
            getValues: function(i, r, s, u) {
              var l = i._point, f = i._handleOut, d = r._handleIn, c = r._point, p = l.x, g = l.y, b = c.x, S = c.y, x = u ? [p, g, p, g, b, S, b, S] : [
                p,
                g,
                p + f._x,
                g + f._y,
                b + d._x,
                S + d._y,
                b,
                S
              ];
              return s && s._transformCoordinates(x, x, 4), x;
            },
            subdivide: function(i, r) {
              var s = i[0], u = i[1], l = i[2], f = i[3], d = i[4], c = i[5], p = i[6], g = i[7];
              r === n && (r = 0.5);
              var b = 1 - r, S = b * s + r * l, x = b * u + r * f, y = b * l + r * d, E = b * f + r * c, C = b * d + r * p, O = b * c + r * g, w = b * S + r * y, A = b * x + r * E, m = b * y + r * C, I = b * E + r * O, T = b * w + r * m, M = b * A + r * I;
              return [
                [s, u, S, x, w, A, T, M],
                [T, M, m, I, C, O, p, g]
              ];
            },
            getMonoCurves: function(i, r) {
              var s = [], u = r ? 0 : 1, l = i[u + 0], f = i[u + 2], d = i[u + 4], c = i[u + 6];
              if (l >= f == f >= d && f >= d == d >= c || lt.isStraight(i))
                s.push(i);
              else {
                var p = 3 * (f - d) - l + c, g = 2 * (l + d) - 4 * f, b = f - l, S = 1e-8, x = 1 - S, y = [], E = U.solveQuadratic(p, g, b, y, S, x);
                if (!E)
                  s.push(i);
                else {
                  y.sort();
                  var C = y[0], O = lt.subdivide(i, C);
                  s.push(O[0]), E > 1 && (C = (y[1] - C) / (1 - C), O = lt.subdivide(O[1], C), s.push(O[0])), s.push(O[1]);
                }
              }
              return s;
            },
            solveCubic: function(i, r, s, u, l, f) {
              var d = i[r], c = i[r + 2], p = i[r + 4], g = i[r + 6], b = 0;
              if (!(d < s && g < s && c < s && p < s || d > s && g > s && c > s && p > s)) {
                var S = 3 * (c - d), x = 3 * (p - c) - S, y = g - d - S - x;
                b = U.solveCubic(y, x, S, d - s, u, l, f);
              }
              return b;
            },
            getTimeOf: function(i, r) {
              var s = new F(i[0], i[1]), u = new F(i[6], i[7]), l = 1e-12, f = 1e-7, d = r.isClose(s, l) ? 0 : r.isClose(u, l) ? 1 : null;
              if (d === null)
                for (var c = [r.x, r.y], p = [], g = 0; g < 2; g++)
                  for (var b = lt.solveCubic(i, g, c[g], p, 0, 1), S = 0; S < b; S++) {
                    var x = p[S];
                    if (r.isClose(lt.getPoint(i, x), f))
                      return x;
                  }
              return r.isClose(s, f) ? 0 : r.isClose(u, f) ? 1 : null;
            },
            getNearestTime: function(i, r) {
              if (lt.isStraight(i)) {
                var s = i[0], u = i[1], l = i[6], f = i[7], d = l - s, c = f - u, p = d * d + c * c;
                if (p === 0)
                  return 0;
                var g = ((r.x - s) * d + (r.y - u) * c) / p;
                return g < 1e-12 ? 0 : g > 0.999999999999 ? 1 : lt.getTimeOf(
                  i,
                  new F(s + g * d, u + g * c)
                );
              }
              var b = 100, S = 1 / 0, x = 0;
              function y(O) {
                if (O >= 0 && O <= 1) {
                  var w = r.getDistance(lt.getPoint(i, O), !0);
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
            getPart: function(i, r, s) {
              var u = r > s;
              if (u) {
                var l = r;
                r = s, s = l;
              }
              return r > 0 && (i = lt.subdivide(i, r)[1]), s < 1 && (i = lt.subdivide(i, (s - r) / (1 - r))[0]), u ? [i[6], i[7], i[4], i[5], i[2], i[3], i[0], i[1]] : i;
            },
            isFlatEnough: function(i, r) {
              var s = i[0], u = i[1], l = i[2], f = i[3], d = i[4], c = i[5], p = i[6], g = i[7], b = 3 * l - 2 * s - p, S = 3 * f - 2 * u - g, x = 3 * d - 2 * p - s, y = 3 * c - 2 * g - u;
              return Math.max(b * b, x * x) + Math.max(S * S, y * y) <= 16 * r * r;
            },
            getArea: function(i) {
              var r = i[0], s = i[1], u = i[2], l = i[3], f = i[4], d = i[5], c = i[6], p = i[7];
              return 3 * ((p - s) * (u + f) - (c - r) * (l + d) + l * (r - f) - u * (s - d) + p * (f + r / 3) - c * (d + s / 3)) / 20;
            },
            getBounds: function(i) {
              for (var r = i.slice(0, 2), s = r.slice(), u = [0, 0], l = 0; l < 2; l++)
                lt._addBounds(
                  i[l],
                  i[l + 2],
                  i[l + 4],
                  i[l + 6],
                  l,
                  0,
                  r,
                  s,
                  u
                );
              return new ut(r[0], r[1], s[0] - r[0], s[1] - r[1]);
            },
            _addBounds: function(i, r, s, u, l, f, d, c, p) {
              function g(T, M) {
                var P = T - M, N = T + M;
                P < d[l] && (d[l] = P), N > c[l] && (c[l] = N);
              }
              f /= 2;
              var b = d[l] + f, S = c[l] - f;
              if (i < b || r < b || s < b || u < b || i > S || r > S || s > S || u > S)
                if (r < i != r < u && s < i != s < u)
                  g(i, 0), g(u, 0);
                else {
                  var x = 3 * (r - s) - i + u, y = 2 * (i + s) - 4 * r, E = r - i, C = U.solveQuadratic(x, y, E, p), O = 1e-8, w = 1 - O;
                  g(u, 0);
                  for (var A = 0; A < C; A++) {
                    var m = p[A], I = 1 - m;
                    O <= m && m <= w && g(
                      I * I * I * i + 3 * I * I * m * r + 3 * I * m * m * s + m * m * m * u,
                      f
                    );
                  }
                }
            }
          }
        },
        h.each(
          ["getBounds", "getStrokeBounds", "getHandleBounds"],
          function(i) {
            this[i] = function() {
              this._bounds || (this._bounds = {});
              var r = this._bounds[i];
              return r || (r = this._bounds[i] = Yt[i](
                [this._segment1, this._segment2],
                !1,
                this._path
              )), r.clone();
            };
          },
          {}
        ),
        h.each({
          isStraight: function(i, r, s, u) {
            if (r.isZero() && s.isZero())
              return !0;
            var l = u.subtract(i);
            if (l.isZero())
              return !1;
            if (l.isCollinear(r) && l.isCollinear(s)) {
              var f = new xt(i, u), d = 1e-7;
              if (f.getDistance(i.add(r)) < d && f.getDistance(u.add(s)) < d) {
                var c = l.dot(l), p = l.dot(r) / c, g = l.dot(s) / c;
                return p >= 0 && p <= 1 && g <= 0 && g >= -1;
              }
            }
            return !1;
          },
          isLinear: function(i, r, s, u) {
            var l = u.subtract(i).divide(3);
            return r.equals(l) && s.negate().equals(l);
          }
        }, function(i, r) {
          this[r] = function(s) {
            var u = this._segment1, l = this._segment2;
            return i(
              u._point,
              u._handleOut,
              l._handleIn,
              l._point,
              s
            );
          }, this.statics[r] = function(s, u) {
            var l = s[0], f = s[1], d = s[6], c = s[7];
            return i(
              new F(l, f),
              new F(s[2] - l, s[3] - f),
              new F(s[4] - d, s[5] - c),
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
            return i != null && i >= 0 && i <= 1 ? new re(this, i) : null;
          },
          getTimeAt: function(i, r) {
            return lt.getTimeAt(this.getValues(), i, r);
          },
          getParameterAt: "#getTimeAt",
          getTimesWithTangent: function() {
            var i = F.read(arguments);
            return i.isZero() ? [] : lt.getTimesWithTangent(this.getValues(), i);
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
            return lt.getTimeOf(this.getValues(), F.read(arguments));
          },
          getParameterOf: "#getTimeOf",
          getNearestLocation: function() {
            var i = F.read(arguments), r = this.getValues(), s = lt.getNearestTime(r, i), u = lt.getPoint(r, s);
            return new re(this, s, u, null, i.getDistance(u));
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
          return h.each(
            i,
            function(r) {
              this[r + "At"] = function(s, u) {
                var l = this.getValues();
                return lt[r](l, u ? s : lt.getTimeAt(l, s));
              }, this[r + "AtTime"] = function(s) {
                return lt[r](this.getValues(), s);
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
            var l = u[0], f = u[1], d = u[2], c = u[3], p = u[4], g = u[5], b = u[6], S = u[7], x = 9 * (d - p) + 3 * (b - l), y = 6 * (l + p) - 12 * d, E = 3 * (d - l), C = 9 * (c - g) + 3 * (S - f), O = 6 * (f + g) - 12 * c, w = 3 * (c - f);
            return function(A) {
              var m = (x * A + y) * A + E, I = (C * A + O) * A + w;
              return Math.sqrt(m * m + I * I);
            };
          }
          function r(u, l) {
            return Math.max(2, Math.min(16, Math.ceil(Math.abs(l - u) * 32)));
          }
          function s(u, l, f, d) {
            if (l == null || l < 0 || l > 1)
              return null;
            var c = u[0], p = u[1], g = u[2], b = u[3], S = u[4], x = u[5], y = u[6], E = u[7], C = U.isZero;
            C(g - c) && C(b - p) && (g = c, b = p), C(S - y) && C(x - E) && (S = y, x = E);
            var O = 3 * (g - c), w = 3 * (S - g) - O, A = y - c - O - w, m = 3 * (b - p), I = 3 * (x - b) - m, T = E - p - m - I, M, P;
            if (f === 0)
              M = l === 0 ? c : l === 1 ? y : ((A * l + w) * l + O) * l + c, P = l === 0 ? p : l === 1 ? E : ((T * l + I) * l + m) * l + p;
            else {
              var N = 1e-8, V = 1 - N;
              if (l < N ? (M = O, P = m) : l > V ? (M = 3 * (y - S), P = 3 * (E - x)) : (M = (3 * A * l + 2 * w) * l + O, P = (3 * T * l + 2 * I) * l + m), d) {
                M === 0 && P === 0 && (l < N || l > V) && (M = S - g, P = x - b);
                var B = Math.sqrt(M * M + P * P);
                B && (M /= B, P /= B);
              }
              if (f === 3) {
                var S = 6 * A * l + 2 * w, x = 6 * T * l + 2 * I, H = Math.pow(M * M + P * P, 3 / 2);
                M = H !== 0 ? (M * x - P * S) / H : 0, P = 0;
              }
            }
            return f === 2 ? new F(P, -M) : new F(M, P);
          }
          return { statics: {
            classify: function(u) {
              var l = u[0], f = u[1], d = u[2], c = u[3], p = u[4], g = u[5], b = u[6], S = u[7], x = l * (S - g) + f * (p - b) + b * g - S * p, y = d * (f - S) + c * (b - l) + l * S - f * b, E = p * (c - f) + g * (l - d) + d * f - c * l, C = 3 * E, O = C - y, w = O - y + x, A = Math.sqrt(w * w + O * O + C * C), m = A !== 0 ? 1 / A : 0, I = U.isZero, T = "serpentine";
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
              var P = 3 * O * O - 4 * w * C;
              if (I(P))
                return M("cusp", O / (2 * w));
              var N = P > 0 ? Math.sqrt(P / 3) : Math.sqrt(-P), V = 2 * w;
              return M(
                P > 0 ? T : "loop",
                (O + N) / V,
                (O - N) / V
              );
            },
            getLength: function(u, l, f, d) {
              if (l === n && (l = 0), f === n && (f = 1), lt.isStraight(u)) {
                var c = u;
                f < 1 && (c = lt.subdivide(c, f)[0], l /= f), l > 0 && (c = lt.subdivide(c, l)[1]);
                var p = c[6] - c[0], g = c[7] - c[1];
                return Math.sqrt(p * p + g * g);
              }
              return U.integrate(
                d || i(u),
                l,
                f,
                r(l, f)
              );
            },
            getTimeAt: function(u, l, f) {
              if (f === n && (f = l < 0 ? 1 : 0), l === 0)
                return f;
              var d = Math.abs, c = 1e-12, p = l > 0, g = p ? f : 0, b = p ? 1 : f, S = i(u), x = lt.getLength(u, g, b, S), y = d(l) - x;
              if (d(y) < c)
                return p ? b : g;
              if (y > c)
                return null;
              var E = l / x, C = 0;
              function O(w) {
                return C += U.integrate(
                  S,
                  f,
                  w,
                  r(f, w)
                ), f = w, C - l;
              }
              return U.findRoot(
                O,
                S,
                f + E,
                g,
                b,
                32,
                1e-12
              );
            },
            getPoint: function(u, l) {
              return s(u, l, 0, !1);
            },
            getTangent: function(u, l) {
              return s(u, l, 1, !0);
            },
            getWeightedTangent: function(u, l) {
              return s(u, l, 1, !1);
            },
            getNormal: function(u, l) {
              return s(u, l, 2, !0);
            },
            getWeightedNormal: function(u, l) {
              return s(u, l, 2, !1);
            },
            getCurvature: function(u, l) {
              return s(u, l, 3, !1).x;
            },
            getPeaks: function(u) {
              var l = u[0], f = u[1], d = u[2], c = u[3], p = u[4], g = u[5], b = u[6], S = u[7], x = -l + 3 * d - 3 * p + b, y = 3 * l - 6 * d + 3 * p, E = -3 * l + 3 * d, C = -f + 3 * c - 3 * g + S, O = 3 * f - 6 * c + 3 * g, w = -3 * f + 3 * c, A = 1e-8, m = 1 - A, I = [];
              return U.solveCubic(
                9 * (x * x + C * C),
                9 * (x * y + O * C),
                2 * (y * y + O * O) + 3 * (E * x + w * C),
                E * y + O * w,
                I,
                A,
                m
              ), I.sort();
            }
          } };
        }(),
        new function() {
          function i(y, E, C, O, w, A, m) {
            var I = !m && C.getPrevious() === w, T = !m && C !== w && C.getNext() === w, M = 1e-8, P = 1 - M;
            if (O !== null && O >= (I ? M : 0) && O <= (T ? P : 1) && A !== null && A >= (T ? M : 0) && A <= (I ? P : 1)) {
              var N = new re(C, O, null, m), V = new re(w, A, null, m);
              N._intersection = V, V._intersection = N, (!E || E(N)) && re.insert(y, N, !0);
            }
          }
          function r(y, E, C, O, w, A, m, I, T, M, P, N, V) {
            if (++T >= 4096 || ++I >= 40)
              return T;
            var B = 1e-9, H = E[0], D = E[1], j = E[6], G = E[7], Y = xt.getSignedDistance, $ = Y(H, D, j, G, E[2], E[3]), X = Y(H, D, j, G, E[4], E[5]), at = $ * X > 0 ? 3 / 4 : 4 / 9, ct = at * Math.min(0, $, X), gt = at * Math.max(0, $, X), wt = Y(H, D, j, G, y[0], y[1]), J = Y(H, D, j, G, y[2], y[3]), nt = Y(H, D, j, G, y[4], y[5]), mt = Y(H, D, j, G, y[6], y[7]), Ct = s(wt, J, nt, mt), St = Ct[0], Ft = Ct[1], Lt, Bt;
            if ($ === 0 && X === 0 && wt === 0 && J === 0 && nt === 0 && mt === 0 || (Lt = u(St, Ft, ct, gt)) == null || (Bt = u(
              St.reverse(),
              Ft.reverse(),
              ct,
              gt
            )) == null)
              return T;
            var Ht = M + (P - M) * Lt, Vt = M + (P - M) * Bt;
            if (Math.max(V - N, Vt - Ht) < B) {
              var Re = (Ht + Vt) / 2, Fe = (N + V) / 2;
              i(
                w,
                A,
                m ? O : C,
                m ? Fe : Re,
                m ? C : O,
                m ? Re : Fe
              );
            } else {
              y = lt.getPart(y, Lt, Bt);
              var Be = V - N;
              if (Bt - Lt > 0.8)
                if (Vt - Ht > Be) {
                  var Te = lt.subdivide(y, 0.5), Re = (Ht + Vt) / 2;
                  T = r(
                    E,
                    Te[0],
                    O,
                    C,
                    w,
                    A,
                    !m,
                    I,
                    T,
                    N,
                    V,
                    Ht,
                    Re
                  ), T = r(
                    E,
                    Te[1],
                    O,
                    C,
                    w,
                    A,
                    !m,
                    I,
                    T,
                    N,
                    V,
                    Re,
                    Vt
                  );
                } else {
                  var Te = lt.subdivide(E, 0.5), Fe = (N + V) / 2;
                  T = r(
                    Te[0],
                    y,
                    O,
                    C,
                    w,
                    A,
                    !m,
                    I,
                    T,
                    N,
                    Fe,
                    Ht,
                    Vt
                  ), T = r(
                    Te[1],
                    y,
                    O,
                    C,
                    w,
                    A,
                    !m,
                    I,
                    T,
                    Fe,
                    V,
                    Ht,
                    Vt
                  );
                }
              else
                Be === 0 || Be >= B ? T = r(
                  E,
                  y,
                  O,
                  C,
                  w,
                  A,
                  !m,
                  I,
                  T,
                  N,
                  V,
                  Ht,
                  Vt
                ) : T = r(
                  y,
                  E,
                  C,
                  O,
                  w,
                  A,
                  m,
                  I,
                  T,
                  Ht,
                  Vt,
                  N,
                  V
                );
            }
            return T;
          }
          function s(y, E, C, O) {
            var w = [0, y], A = [1 / 3, E], m = [2 / 3, C], I = [1, O], T = E - (2 * y + O) / 3, M = C - (y + 2 * O) / 3, P;
            if (T * M < 0)
              P = [[w, A, I], [w, m, I]];
            else {
              var N = T / M;
              P = [
                N >= 2 ? [w, A, I] : N <= 0.5 ? [w, m, I] : [w, A, m, I],
                [w, I]
              ];
            }
            return (T || M) < 0 ? P.reverse() : P;
          }
          function u(y, E, C, O) {
            return y[0][1] < C ? l(y, !0, C) : E[0][1] > O ? l(E, !1, O) : y[0][0];
          }
          function l(y, E, C) {
            for (var O = y[0][0], w = y[0][1], A = 1, m = y.length; A < m; A++) {
              var I = y[A][0], T = y[A][1];
              if (E ? T >= C : T <= C)
                return T === C ? I : O + (C - w) * (I - O) / (T - w);
              O = I, w = T;
            }
            return null;
          }
          function f(y, E, C, O, w) {
            var A = U.isZero;
            if (A(O) && A(w)) {
              var m = lt.getTimeOf(y, new F(E, C));
              return m === null ? [] : [m];
            }
            for (var I = Math.atan2(-w, O), T = Math.sin(I), M = Math.cos(I), P = [], N = [], V = 0; V < 8; V += 2) {
              var B = y[V] - E, H = y[V + 1] - C;
              P.push(
                B * M - H * T,
                B * T + H * M
              );
            }
            return lt.solveCubic(P, 1, 0, N, 0, 1), N;
          }
          function d(y, E, C, O, w, A, m) {
            for (var I = E[0], T = E[1], M = E[6], P = E[7], N = f(y, I, T, M - I, P - T), V = 0, B = N.length; V < B; V++) {
              var H = N[V], D = lt.getPoint(y, H), j = lt.getTimeOf(E, D);
              j !== null && i(
                w,
                A,
                m ? O : C,
                m ? j : H,
                m ? C : O,
                m ? H : j
              );
            }
          }
          function c(y, E, C, O, w, A) {
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
              A,
              C,
              lt.getTimeOf(y, m),
              O,
              lt.getTimeOf(E, m)
            );
          }
          function p(y, E, C, O, w, A) {
            var m = 1e-12, I = Math.min, T = Math.max;
            if (T(y[0], y[2], y[4], y[6]) + m > I(E[0], E[2], E[4], E[6]) && I(y[0], y[2], y[4], y[6]) - m < T(E[0], E[2], E[4], E[6]) && T(y[1], y[3], y[5], y[7]) + m > I(E[1], E[3], E[5], E[7]) && I(y[1], y[3], y[5], y[7]) - m < T(E[1], E[3], E[5], E[7])) {
              var M = S(y, E);
              if (M)
                for (var P = 0; P < 2; P++) {
                  var N = M[P];
                  i(
                    w,
                    A,
                    C,
                    N[0],
                    O,
                    N[1],
                    !0
                  );
                }
              else {
                var V = lt.isStraight(y), B = lt.isStraight(E), H = V && B, D = V && !B, j = w.length;
                if ((H ? c : V || B ? d : r)(
                  D ? E : y,
                  D ? y : E,
                  D ? O : C,
                  D ? C : O,
                  w,
                  A,
                  D,
                  0,
                  0,
                  0,
                  1,
                  0,
                  1
                ), !H || w.length === j)
                  for (var P = 0; P < 4; P++) {
                    var G = P >> 1, Y = P & 1, $ = G * 6, X = Y * 6, at = new F(y[$], y[$ + 1]), ct = new F(E[X], E[X + 1]);
                    at.isClose(ct, m) && i(
                      w,
                      A,
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
            var w = lt.classify(y);
            if (w.type === "loop") {
              var A = w.roots;
              i(
                C,
                O,
                E,
                A[0],
                E,
                A[1]
              );
            }
            return C;
          }
          function b(y, E, C, O, w, A) {
            var m = 1e-7, I = !E;
            I && (E = y);
            for (var T = y.length, M = E.length, P = new Array(T), N = I ? P : new Array(M), V = [], B = 0; B < T; B++)
              P[B] = y[B].getValues(O);
            if (!I)
              for (var B = 0; B < M; B++)
                N[B] = E[B].getValues(w);
            for (var H = R.findCurveBoundsCollisions(
              P,
              N,
              m
            ), D = 0; D < T; D++) {
              var j = y[D], G = P[D];
              I && g(G, j, V, C);
              var Y = H[D];
              if (Y)
                for (var $ = 0; $ < Y.length; $++) {
                  if (A && V.length)
                    return V;
                  var X = Y[$];
                  if (!I || X > D) {
                    var at = E[X], ct = N[X];
                    p(
                      G,
                      ct,
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
            function C(mt) {
              var Ct = mt[6] - mt[0], St = mt[7] - mt[1];
              return Ct * Ct + St * St;
            }
            var O = Math.abs, w = xt.getDistance, A = 1e-8, m = 1e-7, I = lt.isStraight(y), T = lt.isStraight(E), M = I && T, P = C(y) < C(E), N = P ? E : y, V = P ? y : E, B = N[0], H = N[1], D = N[6] - B, j = N[7] - H;
            if (w(B, H, D, j, V[0], V[1], !0) < m && w(B, H, D, j, V[6], V[7], !0) < m)
              !M && w(B, H, D, j, N[2], N[3], !0) < m && w(B, H, D, j, N[4], N[5], !0) < m && w(B, H, D, j, V[2], V[3], !0) < m && w(B, H, D, j, V[4], V[5], !0) < m && (I = T = M = !0);
            else if (M)
              return null;
            if (I ^ T)
              return null;
            for (var G = [y, E], Y = [], $ = 0; $ < 4 && Y.length < 2; $++) {
              var X = $ & 1, at = X ^ 1, ct = $ >> 1, gt = lt.getTimeOf(G[X], new F(
                G[at][ct ? 6 : 0],
                G[at][ct ? 7 : 1]
              ));
              if (gt != null) {
                var wt = X ? [ct, gt] : [gt, ct];
                (!Y.length || O(wt[0] - Y[0][0]) > A && O(wt[1] - Y[0][1]) > A) && Y.push(wt);
              }
              if ($ > 2 && !Y.length)
                break;
            }
            if (Y.length !== 2)
              Y = null;
            else if (!M) {
              var J = lt.getPart(y, Y[0][0], Y[1][0]), nt = lt.getPart(E, Y[0][1], Y[1][1]);
              (O(nt[2] - J[2]) > m || O(nt[3] - J[3]) > m || O(nt[4] - J[4]) > m || O(nt[5] - J[5]) > m) && (Y = null);
            }
            return Y;
          }
          function x(y, E) {
            var C = y[0], O = y[1], w = y[2], A = y[3], m = y[4], I = y[5], T = y[6], M = y[7], P = E.normalize(), N = P.x, V = P.y, B = 3 * T - 9 * m + 9 * w - 3 * C, H = 3 * M - 9 * I + 9 * A - 3 * O, D = 6 * m - 12 * w + 6 * C, j = 6 * I - 12 * A + 6 * O, G = 3 * w - 3 * C, Y = 3 * A - 3 * O, $ = 2 * B * V - 2 * H * N, X = [];
            if (Math.abs($) < U.CURVETIME_EPSILON) {
              var at = B * Y - H * G, $ = B * j - H * D;
              if ($ != 0) {
                var ct = -at / $;
                ct >= 0 && ct <= 1 && X.push(ct);
              }
            } else {
              var gt = (D * D - 4 * B * G) * V * V + (-2 * D * j + 4 * H * G + 4 * B * Y) * N * V + (j * j - 4 * H * Y) * N * N, wt = D * V - j * N;
              if (gt >= 0 && $ != 0) {
                var J = Math.sqrt(gt), nt = -(wt + J) / $, mt = (-wt + J) / $;
                nt >= 0 && nt <= 1 && X.push(nt), mt >= 0 && mt <= 1 && X.push(mt);
              }
            }
            return X;
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
      ), re = h.extend(
        {
          _class: "CurveLocation",
          initialize: function(r, s, u, l, f) {
            if (s >= 0.99999999) {
              var d = r.getNext();
              d && (s = 0, r = d);
            }
            this._setCurve(r), this._time = s, this._point = u || r.getPointAtTime(s), this._overlap = l, this._distance = f, this._intersection = this._next = this._previous = null;
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
              var r = this.getCurve(), s = this.getTime();
              s === 0 ? i = r._segment1 : s === 1 ? i = r._segment2 : s != null && (i = r.getPartLength(0, s) < r.getPartLength(s, 1) ? r._segment1 : r._segment2), this._segment = i;
            }
            return i;
          },
          getCurve: function() {
            var i = this._path, r = this;
            i && i._version !== this._version && (this._time = this._offset = this._curveOffset = this._curve = null);
            function s(u) {
              var l = u && u.getCurve();
              if (l && (r._time = l.getTimeOf(r._point)) != null)
                return r._setCurve(l), l;
            }
            return this._curve || s(this._segment) || s(this._segment1) || s(this._segment2.getPrevious());
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
              var r = this.getPath(), s = this.getIndex();
              if (r && s != null)
                for (var u = r.getCurves(), l = 0; l < s; l++)
                  i += u[l].getLength();
              this._offset = i += this.getCurveOffset();
            }
            return i;
          },
          getCurveOffset: function() {
            var i = this._curveOffset;
            if (i == null) {
              var r = this.getCurve(), s = this.getTime();
              this._curveOffset = i = s != null && r && r.getPartLength(0, s);
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
            var i = this.getCurve(), r = i._path, s = i && i.splitAtTime(this.getTime());
            return s && this._setSegment(r.getLastSegment()), s;
          },
          equals: function(i, r) {
            var s = this === i;
            if (!s && i instanceof re) {
              var u = this.getCurve(), l = i.getCurve(), f = u._path, d = l._path;
              if (f === d) {
                var c = Math.abs, p = 1e-7, g = c(this.getOffset() - i.getOffset()), b = !r && this._intersection, S = !r && i._intersection;
                s = (g < p || f && c(f.getLength() - g) < p) && (!b && !S || b && S && b.equals(S, !0));
              }
            }
            return s;
          },
          toString: function() {
            var i = [], r = this.getPoint(), s = z.instance;
            r && i.push("point: " + r);
            var u = this.getIndex();
            u != null && i.push("index: " + u);
            var l = this.getTime();
            return l != null && i.push("time: " + s.number(l)), this._distance != null && i.push("distance: " + s.number(this._distance)), "{ " + i.join(", ") + " }";
          },
          isTouching: function() {
            var i = this._intersection;
            if (i && this.getTangent().isCollinear(i.getTangent())) {
              var r = this.getCurve(), s = i.getCurve();
              return !(r.isStraight() && s.isStraight() && r.getLine().intersect(s.getLine()));
            }
            return !1;
          },
          isCrossing: function() {
            var i = this._intersection;
            if (!i)
              return !1;
            var r = this.getTime(), s = i.getTime(), u = 1e-8, l = 1 - u, f = r >= u && r <= l, d = s >= u && s <= l;
            if (f && d)
              return !this.isTouching();
            var c = this.getCurve(), p = c && r < u ? c.getPrevious() : c, g = i.getCurve(), b = g && s < u ? g.getPrevious() : g;
            if (r > l && (c = c.getNext()), s > l && (g = g.getNext()), !p || !c || !b || !g)
              return !1;
            var S = [];
            function x(N, V) {
              var B = N.getValues(), H = lt.classify(B).roots || lt.getPeaks(B), D = H.length, j = lt.getLength(
                B,
                V && D ? H[D - 1] : 0,
                !V && D ? H[0] : 1
              );
              S.push(D ? j : j / 32);
            }
            function y(N, V, B) {
              return V < B ? N > V && N < B : N > V || N < B;
            }
            f || (x(p, !0), x(c, !1)), d || (x(b, !0), x(g, !1));
            var E = this.getPoint(), C = Math.min.apply(Math, S), O = f ? c.getTangentAtTime(r) : c.getPointAt(C).subtract(E), w = f ? O.negate() : p.getPointAt(-C).subtract(E), A = d ? g.getTangentAtTime(s) : g.getPointAt(C).subtract(E), m = d ? A.negate() : b.getPointAt(-C).subtract(E), I = w.getAngle(), T = O.getAngle(), M = m.getAngle(), P = A.getAngle();
            return !!(f ? y(I, M, P) ^ y(T, M, P) && y(I, P, M) ^ y(T, P, M) : y(M, I, T) ^ y(P, I, T) && y(M, T, I) ^ y(P, T, I));
          },
          hasOverlap: function() {
            return !!this._overlap;
          }
        },
        h.each(lt._evaluateMethods, function(i) {
          var r = i + "At";
          this[i] = function() {
            var s = this.getCurve(), u = this.getTime();
            return u != null && s && s[r](u, !0);
          };
        }, {
          preserve: !0
        }),
        new function() {
          function i(r, s, u) {
            var l = r.length, f = 0, d = l - 1;
            function c(E, C) {
              for (var O = E + C; O >= -1 && O <= l; O += C) {
                var w = r[(O % l + l) % l];
                if (!s.getPoint().isClose(
                  w.getPoint(),
                  1e-7
                ))
                  break;
                if (s.equals(w))
                  return w;
              }
              return null;
            }
            for (; f <= d; ) {
              var p = f + d >>> 1, g = r[p], b;
              if (u && (b = s.equals(g) ? g : c(p, -1) || c(p, 1)))
                return s._overlap && (b._overlap = b._intersection._overlap = !0), b;
              var S = s.getPath(), x = g.getPath(), y = S !== x ? S._id - x._id : s.getIndex() + s.getTime() - (g.getIndex() + g.getTime());
              y < 0 ? d = p - 1 : f = p + 1;
            }
            return r.splice(f, 0, s), s;
          }
          return { statics: {
            insert: i,
            expand: function(r) {
              for (var s = r.slice(), u = r.length - 1; u >= 0; u--)
                i(s, r[u]._intersection, !1);
              return s;
            }
          } };
        }()
      ), oe = kt.extend({
        _class: "PathItem",
        _selectBounds: !1,
        _canScaleStroke: !0,
        beans: !0,
        initialize: function() {
        },
        statics: {
          create: function(i) {
            var r, s, u;
            if (h.isPlainObject(i) ? (s = i.segments, r = i.pathData) : Array.isArray(i) ? s = i : typeof i == "string" && (r = i), s) {
              var l = s[0];
              u = l && Array.isArray(l[0]);
            } else r && (u = (r.match(/m/gi) || []).length > 1 || /z\s*\S+/i.test(r));
            var f = u ? $e : Yt;
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
          var r = i && i.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig), s, u = !1, l, f, d = new F(), c = new F();
          function p(m, I) {
            var T = +s[m];
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
            s = x.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
            var C = s && s.length;
            switch (u = y === E, l === "z" && !/[mz]/.test(E) && this.moveTo(d), E) {
              case "m":
              case "l":
                for (var O = E === "m", w = 0; w < C; w += 2)
                  this[O ? "moveTo" : "lineTo"](d = g(w)), O && (c = d, O = !1);
                f = d;
                break;
              case "h":
              case "v":
                var A = E === "h" ? "x" : "y";
                d = d.clone();
                for (var w = 0; w < C; w++)
                  d[A] = p(w, A), this.lineTo(d);
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
                    /[cs]/.test(l) ? d.multiply(2).subtract(f) : d,
                    f = g(w),
                    d = g(w + 2)
                  ), l = E;
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
                    f = /[qt]/.test(l) ? d.multiply(2).subtract(f) : d,
                    d = g(w)
                  ), l = E;
                break;
              case "a":
                for (var w = 0; w < C; w += 7)
                  this.arcTo(
                    d = g(w + 5),
                    new it(+s[w], +s[w + 1]),
                    +s[w + 2],
                    +s[w + 4],
                    +s[w + 3]
                  );
                break;
              case "z":
                this.closePath(1e-12), d = c;
                break;
            }
            l = E;
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
        getIntersections: function(i, r, s, u) {
          var l = this === i || !i, f = this._matrix._orNullIfIdentity(), d = l ? f : (s || i._matrix)._orNullIfIdentity();
          return l || this.getBounds(f).intersects(
            i.getBounds(d),
            1e-12
          ) ? lt.getIntersections(
            this.getCurves(),
            !l && i.getCurves(),
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
          for (var i = F.read(arguments), r = this.getCurves(), s = 1 / 0, u = null, l = 0, f = r.length; l < f; l++) {
            var d = r[l].getNearestLocation(i);
            d._distance < s && (s = d._distance, u = d);
          }
          return u;
        },
        getNearestPoint: function() {
          var i = this.getNearestLocation.apply(this, arguments);
          return i && i.getPoint();
        },
        interpolate: function(i, r, s) {
          var u = !this._children, l = u ? "_segments" : "_children", f = i[l], d = r[l], c = this[l];
          if (!f || !d || f.length !== d.length)
            throw new Error("Invalid operands in interpolate() call: " + i + ", " + r);
          var p = c.length, g = d.length;
          if (p < g)
            for (var b = u ? Pt : Yt, S = p; S < g; S++)
              this.add(new b());
          else p > g && this[u ? "removeSegments" : "removeChildren"](g, p);
          for (var S = 0; S < g; S++)
            c[S].interpolate(f[S], d[S], s);
          u && (this.setClosed(i._closed), this._changed(9));
        },
        compare: function(i) {
          var r = !1;
          if (i) {
            var s = this._children || [this], u = i._children ? i._children.slice() : [i], l = s.length, f = u.length, d = [], c = 0;
            r = !0;
            for (var p = R.findItemBoundsCollisions(s, u, U.GEOMETRIC_EPSILON), g = l - 1; g >= 0 && r; g--) {
              var b = s[g];
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
      }), Yt = oe.extend(
        {
          _class: "Path",
          _serializeFields: {
            segments: [],
            closed: !1
          },
          initialize: function(r) {
            this._closed = !1, this._segments = [], this._version = 0;
            var s = arguments, u = Array.isArray(r) ? typeof r[0] == "object" ? r : s : r && r.size === n && (r.x !== n || r.point !== n) ? s : null;
            u && u.length > 0 ? this.setSegments(u) : (this._curves = n, this._segmentSelection = 0, !u && typeof r == "string" && (this.setPathData(r), r = null)), this._initialize(!u && r);
          },
          _equals: function(i) {
            return this._closed === i._closed && h.equals(this._segments, i._segments);
          },
          copyContent: function(i) {
            this.setSegments(i._segments), this._closed = i._closed;
          },
          _changed: function i(r) {
            if (i.base.call(this, r), r & 8) {
              if (this._length = this._area = n, r & 32)
                this._version++;
              else if (this._curves)
                for (var s = 0, u = this._curves.length; s < u; s++)
                  this._curves[s]._changed();
            } else r & 64 && (this._bounds = n);
          },
          getStyle: function() {
            var i = this._parent;
            return (i instanceof $e ? i : this)._style;
          },
          getSegments: function() {
            return this._segments;
          },
          setSegments: function(i) {
            var r = this.isFullySelected(), s = i && i.length;
            if (this._segments.length = 0, this._segmentSelection = 0, this._curves = n, s) {
              var u = i[s - 1];
              typeof u == "boolean" && (this.setClosed(u), s--), this._add(Pt.readList(i, 0, {}, s));
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
              var s = this._countCurves();
              i = this._curves = new Array(s);
              for (var u = 0; u < s; u++)
                i[u] = new lt(
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
                i && (this._curves[r - 1] = new lt(
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
            var s = this._segments, u = s.length, l = new z(r), f = new Array(6), d = !0, c, p, g, b, S, x, y, E, C = [];
            function O(A, m) {
              if (A._transformCoordinates(i, f), c = f[0], p = f[1], d)
                C.push("M" + l.pair(c, p)), d = !1;
              else if (S = f[2], x = f[3], S === c && x === p && y === g && E === b) {
                if (!m) {
                  var I = c - g, T = p - b;
                  C.push(
                    I === 0 ? "v" + l.number(T) : T === 0 ? "h" + l.number(I) : "l" + l.pair(I, T)
                  );
                }
              } else
                C.push("c" + l.pair(y - g, E - b) + " " + l.pair(S - g, x - b) + " " + l.pair(c - g, p - b));
              g = c, b = p, y = f[4], E = f[5];
            }
            if (!u)
              return "";
            for (var w = 0; w < u; w++)
              O(s[w]);
            return this._closed && u > 0 && (O(s[0], !0), C.push("z")), C.join("");
          },
          isEmpty: function() {
            return !this._segments.length;
          },
          _transformContent: function(i) {
            for (var r = this._segments, s = new Array(6), u = 0, l = r.length; u < l; u++)
              r[u]._transformCoordinates(i, s, !0);
            return !0;
          },
          _add: function(i, d) {
            for (var s = this._segments, u = this._curves, l = i.length, f = d == null, d = f ? s.length : d, c = 0; c < l; c++) {
              var p = i[c];
              p._path && (p = i[c] = p.clone()), p._path = this, p._index = d + c, p._selection && this._updateSelection(p, 0, p._selection);
            }
            if (f)
              h.push(s, i);
            else {
              s.splice.apply(s, [d, 0].concat(i));
              for (var c = d + l, g = s.length; c < g; c++)
                s[c]._index = c;
            }
            if (u) {
              var b = this._countCurves(), S = d > 0 && d + l - 1 === b ? d - 1 : d, x = S, y = Math.min(S + l, b);
              i._curves && (u.splice.apply(u, [S, 0].concat(i._curves)), x += i._curves.length);
              for (var c = x; c < y; c++)
                u.splice(c, 0, new lt(this, null, null));
              this._adjustCurves(S, y);
            }
            return this._changed(41), i;
          },
          _adjustCurves: function(i, r) {
            for (var s = this._segments, u = this._curves, l, f = i; f < r; f++)
              l = u[f], l._path = this, l._segment1 = s[f], l._segment2 = s[f + 1] || s[0], l._changed();
            (l = u[this._closed && !i ? s.length - 1 : i - 1]) && (l._segment2 = s[i] || s[0], l._changed()), (l = u[r]) && (l._segment1 = s[r], l._changed());
          },
          _countCurves: function() {
            var i = this._segments.length;
            return !this._closed && i > 0 ? i - 1 : i;
          },
          add: function(i) {
            var r = arguments;
            return r.length > 1 && typeof i != "number" ? this._add(Pt.readList(r)) : this._add([Pt.read(r)])[0];
          },
          insert: function(i, r) {
            var s = arguments;
            return s.length > 2 && typeof r != "number" ? this._add(Pt.readList(s, 1), i) : this._add([Pt.read(s, 1)], i)[0];
          },
          addSegment: function() {
            return this._add([Pt.read(arguments)])[0];
          },
          insertSegment: function(i) {
            return this._add([Pt.read(arguments, 1)], i)[0];
          },
          addSegments: function(i) {
            return this._add(Pt.readList(i));
          },
          insertSegments: function(i, r) {
            return this._add(Pt.readList(r), i);
          },
          removeSegment: function(i) {
            return this.removeSegments(i, i + 1)[0] || null;
          },
          removeSegments: function(i, r, s) {
            i = i || 0, r = h.pick(r, this._segments.length);
            var u = this._segments, l = this._curves, f = u.length, d = u.splice(i, r - i), c = d.length;
            if (!c)
              return d;
            for (var p = 0; p < c; p++) {
              var g = d[p];
              g._selection && this._updateSelection(g, g._selection, 0), g._index = g._path = null;
            }
            for (var p = i, b = u.length; p < b; p++)
              u[p]._index = p;
            if (l) {
              for (var S = i > 0 && r === f + (this._closed ? 1 : 0) ? i - 1 : i, l = l.splice(S, c), p = l.length - 1; p >= 0; p--)
                l[p]._path = null;
              s && (d._curves = l.slice(1)), this._adjustCurves(S, S);
            }
            return this._changed(41), d;
          },
          clear: "#removeSegments",
          hasHandles: function() {
            for (var i = this._segments, r = 0, s = i.length; r < s; r++)
              if (i[r].hasHandles())
                return !0;
            return !1;
          },
          clearHandles: function() {
            for (var i = this._segments, r = 0, s = i.length; r < s; r++)
              i[r].clearHandles();
          },
          getLength: function() {
            if (this._length == null) {
              for (var i = this.getCurves(), r = 0, s = 0, u = i.length; s < u; s++)
                r += i[s].getLength();
              this._length = r;
            }
            return this._length;
          },
          getArea: function() {
            var i = this._area;
            if (i == null) {
              var r = this._segments, s = this._closed;
              i = 0;
              for (var u = 0, l = r.length; u < l; u++) {
                var f = u + 1 === l;
                i += lt.getArea(lt.getValues(
                  r[u],
                  r[f ? 0 : u + 1],
                  null,
                  f && !s
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
            var r = this._segments, s = r.length, u = i ? 7 : 0;
            this._segmentSelection = u * s;
            for (var l = 0; l < s; l++)
              r[l]._selection = u;
          },
          _updateSelection: function(i, r, s) {
            i._selection = s;
            var u = this._segmentSelection += s - r;
            u > 0 && this.setSelected(!0);
          },
          divideAt: function(i) {
            var r = this.getLocationAt(i), s;
            return r && (s = r.getCurve().divideAt(r.getCurveOffset())) ? s._segment1 : null;
          },
          splitAt: function(i) {
            var r = this.getLocationAt(i), s = r && r.index, u = r && r.time, l = 1e-8, f = 1 - l;
            u > f && (s++, u = 0);
            var d = this.getCurves();
            if (s >= 0 && s < d.length) {
              u >= l && d[s++].divideAtTime(u);
              var c = this.removeSegments(s, this._segments.length, !0), p;
              return this._closed ? (this.setClosed(!1), p = this) : (p = new Yt(kt.NO_INSERT), p.insertAbove(this), p.copyAttributes(this)), p._add(c, 0), this.addSegment(c[0]), p;
            }
            return null;
          },
          split: function(i, r) {
            var s, u = r === n ? i : (s = this.getCurves()[i]) && s.getLocationAtTime(r);
            return u != null ? this.splitAt(u) : null;
          },
          join: function(i, r) {
            var s = r || 0;
            if (i && i !== this) {
              var u = i._segments, l = this.getLastSegment(), f = i.getLastSegment();
              if (!f)
                return this;
              l && l._point.isClose(f._point, s) && i.reverse();
              var d = i.getFirstSegment();
              if (l && l._point.isClose(d._point, s))
                l.setHandleOut(d._handleOut), this._add(u.slice(1));
              else {
                var c = this.getFirstSegment();
                c && c._point.isClose(d._point, s) && i.reverse(), f = i.getLastSegment(), c && c._point.isClose(f._point, s) ? (c.setHandleIn(f._handleIn), this._add(u.slice(0, u.length - 1), 0)) : this._add(u.slice());
              }
              i._closed && this._add([u[0]]), i.remove();
            }
            var p = this.getFirstSegment(), g = this.getLastSegment();
            return p !== g && p._point.isClose(g._point, s) && (p.setHandleIn(g._handleIn), g.remove(), this.setClosed(!0)), this;
          },
          reduce: function(i) {
            for (var r = this.getCurves(), s = i && i.simplify, u = s ? 1e-7 : 0, l = r.length - 1; l >= 0; l--) {
              var f = r[l];
              !f.hasHandles() && (!f.hasLength(u) || s && f.isCollinear(f.getNext())) && f.remove();
            }
            return this;
          },
          reverse: function() {
            this._segments.reverse();
            for (var i = 0, r = this._segments.length; i < r; i++) {
              var s = this._segments[i], u = s._handleIn;
              s._handleIn = s._handleOut, s._handleOut = u, s._index = i;
            }
            this._curves = null, this._changed(9);
          },
          flatten: function(i) {
            for (var r = new Di(this, i || 0.25, 256, !0), s = r.parts, u = s.length, l = [], f = 0; f < u; f++)
              l.push(new Pt(s[f].curve.slice(0, 2)));
            !this._closed && u > 0 && l.push(new Pt(s[u - 1].curve.slice(6))), this.setSegments(l);
          },
          simplify: function(i) {
            var r = new vi(this).fit(i || 2.5);
            return r && this.setSegments(r), !!r;
          },
          smooth: function(i) {
            var r = this, s = i || {}, u = s.type || "asymmetric", l = this._segments, f = l.length, d = this._closed;
            function c(St, Ft) {
              var Lt = St && St.index;
              if (Lt != null) {
                var Bt = St.path;
                if (Bt && Bt !== r)
                  throw new Error(St._class + " " + Lt + " of " + Bt + " is not part of " + r);
                Ft && St instanceof lt && Lt++;
              } else
                Lt = typeof St == "number" ? St : Ft;
              return Math.min(Lt < 0 && d ? Lt % f : Lt < 0 ? Lt + f : Lt, f - 1);
            }
            var p = d && s.from === n && s.to === n, g = c(s.from, 0), b = c(s.to, f - 1);
            if (g > b)
              if (d)
                g -= f;
              else {
                var S = g;
                g = b, b = S;
              }
            if (/^(?:asymmetric|continuous)$/.test(u)) {
              var x = u === "asymmetric", y = Math.min, E = b - g + 1, C = E - 1, O = p ? y(E, 4) : 1, w = O, A = O, m = [];
              if (d || (w = y(1, g), A = y(1, f - b - 1)), C += w + A, C <= 1)
                return;
              for (var I = 0, T = g - w; I <= C; I++, T++)
                m[I] = l[(T < 0 ? T + f : T) % f]._point;
              for (var M = m[0]._x + 2 * m[1]._x, P = m[0]._y + 2 * m[1]._y, N = 2, V = C - 1, B = [M], H = [P], D = [N], j = [], G = [], I = 1; I < C; I++) {
                var Y = I < V, $ = Y || x ? 1 : 2, X = Y ? 4 : x ? 2 : 7, at = Y ? 4 : x ? 3 : 8, ct = Y ? 2 : x ? 0 : 1, gt = $ / N;
                N = D[I] = X - gt, M = B[I] = at * m[I]._x + ct * m[I + 1]._x - gt * M, P = H[I] = at * m[I]._y + ct * m[I + 1]._y - gt * P;
              }
              j[V] = B[V] / D[V], G[V] = H[V] / D[V];
              for (var I = C - 2; I >= 0; I--)
                j[I] = (B[I] - j[I + 1]) / D[I], G[I] = (H[I] - G[I + 1]) / D[I];
              j[C] = (3 * m[C]._x - j[V]) / 2, G[C] = (3 * m[C]._y - G[V]) / 2;
              for (var I = w, wt = C - A, T = g; I <= wt; I++, T++) {
                var J = l[T < 0 ? T + f : T], nt = J._point, mt = j[I] - nt._x, Ct = G[I] - nt._y;
                (p || I < wt) && J.setHandleOut(mt, Ct), (p || I > w) && J.setHandleIn(-mt, -Ct);
              }
            } else
              for (var I = g; I <= b; I++)
                l[I < 0 ? I + f : I].smooth(
                  s,
                  !p && I === g,
                  !p && I === b
                );
          },
          toShape: function(i) {
            if (!this._closed)
              return null;
            var r = this._segments, s, u, l, f;
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
                var A = y._point, m = E._point, I = new xt(A, C, !0).intersect(
                  new xt(m, O, !0),
                  !0
                );
                return I && U.isZero(C.getLength() / I.subtract(A).getLength() - w) && U.isZero(O.getLength() / I.subtract(m).getLength() - w);
              }
              return !1;
            }
            function g(x, y) {
              return r[x]._point.getDistance(r[y]._point);
            }
            if (!this.hasHandles() && r.length === 4 && d(0, 2) && d(1, 3) && c(1) ? (s = ve.Rectangle, u = new it(g(0, 3), g(0, 1)), f = r[1]._point.add(r[2]._point).divide(2)) : r.length === 8 && p(0) && p(2) && p(4) && p(6) && d(1, 5) && d(3, 7) ? (s = ve.Rectangle, u = new it(g(1, 6), g(0, 3)), l = u.subtract(new it(
              g(0, 7),
              g(1, 2)
            )).divide(2), f = r[3]._point.add(r[4]._point).divide(2)) : r.length === 4 && p(0) && p(1) && p(2) && p(3) && (U.isZero(g(0, 2) - g(1, 3)) ? (s = ve.Circle, l = g(0, 2) / 2) : (s = ve.Ellipse, l = new it(g(2, 0) / 2, g(3, 1) / 2)), f = r[1]._point), s) {
              var b = this.getPosition(!0), S = new s({
                center: b,
                size: u,
                radius: l,
                insert: !1
              });
              return S.copyAttributes(this, !0), S._matrix.prepend(this._matrix), S.rotate(f.subtract(b).getAngle() + 90), (i === n || i) && S.insertAbove(this), S;
            }
            return null;
          },
          toPath: "#clone",
          compare: function i(r) {
            if (!r || r instanceof $e)
              return i.base.call(this, r);
            var s = this.getCurves(), u = r.getCurves(), l = s.length, f = u.length;
            if (!l || !f)
              return l == f;
            for (var d = s[0].getValues(), c = [], p = 0, g, b = 0, S, x = 0; x < f; x++) {
              var O = u[x].getValues();
              c.push(O);
              var y = lt.getOverlaps(d, O);
              if (y) {
                g = !x && y[0][0] > 0 ? f - 1 : x, S = y[0][1];
                break;
              }
            }
            for (var E = Math.abs, C = 1e-8, O = c[g], w; d && O; ) {
              var y = lt.getOverlaps(d, O);
              if (y) {
                var A = y[0][0];
                if (E(A - b) < C) {
                  b = y[1][0], b === 1 && (d = ++p < l ? s[p].getValues() : null, b = 0);
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
          _hitTestSelf: function(i, r, s, u) {
            var l = this, f = this.getStyle(), d = this._segments, c = d.length, p = this._closed, g = r._tolerancePadding, b = g, S, x, y, E, C, O, w = r.stroke && f.hasStroke(), A = r.fill && f.hasFill(), m = r.curves, I = w ? f.getStrokeWidth() / 2 : A && r.tolerance > 0 || m ? 0 : null;
            I !== null && (I > 0 ? (S = f.getStrokeJoin(), x = f.getStrokeCap(), y = f.getMiterLimit(), b = b.add(
              Yt._getStrokePadding(I, u)
            )) : S = x = "round");
            function T(j, G) {
              return i.subtract(j).divide(G).length <= 1;
            }
            function M(j, G, Y) {
              if (!r.selected || G.isSelected()) {
                var $ = j._point;
                if (G !== $ && (G = G.add($)), T(G, b))
                  return new Ye(Y, l, {
                    segment: j,
                    point: G
                  });
              }
            }
            function P(j, G) {
              return (G || r.segments) && M(j, j._point, "segment") || !G && r.handles && (M(j, j._handleIn, "handle-in") || M(j, j._handleOut, "handle-out"));
            }
            function N(j) {
              E.add(j);
            }
            function V(j) {
              var G = p || j._index > 0 && j._index < c - 1;
              if ((G ? S : x) === "round")
                return T(j._point, b);
              if (E = new Yt({ internal: !0, closed: !0 }), G ? j.isSmooth() || Yt._addBevelJoin(
                j,
                S,
                I,
                y,
                null,
                u,
                N,
                !0
              ) : x === "square" && Yt._addSquareCap(
                j,
                x,
                I,
                null,
                u,
                N,
                !0
              ), !E.isEmpty()) {
                var Y;
                return E.contains(i) || (Y = E.getNearestLocation(i)) && T(Y.getPoint(), g);
              }
            }
            if (r.ends && !r.segments && !p) {
              if (O = P(d[0], !0) || P(d[c - 1], !0))
                return O;
            } else if (r.segments || r.handles) {
              for (var B = 0; B < c; B++)
                if (O = P(d[B]))
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
            return !C && A && this._contains(i) || C && !w && !m ? new Ye("fill", this) : C ? new Ye(w ? "stroke" : "curve", this, {
              location: C,
              point: C.getPoint()
            }) : null;
          }
        },
        h.each(
          lt._evaluateMethods,
          function(i) {
            this[i + "At"] = function(r) {
              var s = this.getLocationAt(r);
              return s && s[i]();
            };
          },
          {
            beans: !1,
            getLocationOf: function() {
              for (var i = F.read(arguments), r = this.getCurves(), s = 0, u = r.length; s < u; s++) {
                var l = r[s].getLocationOf(i);
                if (l)
                  return l;
              }
              return null;
            },
            getOffsetOf: function() {
              var i = this.getLocationOf.apply(this, arguments);
              return i ? i.getOffset() : null;
            },
            getLocationAt: function(i) {
              if (typeof i == "number") {
                for (var r = this.getCurves(), s = 0, u = 0, l = r.length; u < l; u++) {
                  var f = s, d = r[u];
                  if (s += d.getLength(), s > i)
                    return d.getLocationAt(i - f);
                }
                if (r.length > 0 && i <= this.getLength())
                  return new re(r[r.length - 1], 1);
              } else if (i && i.getPath && i.getPath() === this)
                return i;
              return null;
            },
            getOffsetsWithTangent: function() {
              var i = F.read(arguments);
              if (i.isZero())
                return [];
              for (var r = [], s = 0, u = this.getCurves(), l = 0, f = u.length; l < f; l++) {
                for (var d = u[l], c = d.getTimesWithTangent(i), p = 0, g = c.length; p < g; p++) {
                  var b = s + d.getOffsetAtTime(c[p]);
                  r.indexOf(b) < 0 && r.push(b);
                }
                s += d.length;
              }
              return r;
            }
          }
        ),
        new function() {
          function i(s, u, l, f) {
            if (f <= 0) return;
            var d = f / 2, c = f - 2, p = d - 1, g = new Array(6), b, S;
            function x(A) {
              var m = g[A], I = g[A + 1];
              (b != m || S != I) && (s.beginPath(), s.moveTo(b, S), s.lineTo(m, I), s.stroke(), s.beginPath(), s.arc(m, I, d, 0, Math.PI * 2, !0), s.fill());
            }
            for (var y = 0, E = u.length; y < E; y++) {
              var C = u[y], O = C._selection;
              if (C._transformCoordinates(l, g), b = g[0], S = g[1], O & 2 && x(2), O & 4 && x(4), s.fillRect(b - d, S - d, f, f), c > 0 && !(O & 1)) {
                var w = s.fillStyle;
                s.fillStyle = "#ffffff", s.fillRect(b - p, S - p, c, c), s.fillStyle = w;
              }
            }
          }
          function r(s, u, l) {
            var f = u._segments, d = f.length, c = new Array(6), p = !0, g, b, S, x, y, E, C, O;
            function w(m) {
              if (l)
                m._transformCoordinates(l, c), g = c[0], b = c[1];
              else {
                var I = m._point;
                g = I._x, b = I._y;
              }
              if (p)
                s.moveTo(g, b), p = !1;
              else {
                if (l)
                  y = c[2], E = c[3];
                else {
                  var T = m._handleIn;
                  y = g + T._x, E = b + T._y;
                }
                y === g && E === b && C === S && O === x ? s.lineTo(g, b) : s.bezierCurveTo(C, O, y, E, g, b);
              }
              if (S = g, x = b, l)
                C = c[4], O = c[5];
              else {
                var T = m._handleOut;
                C = S + T._x, O = x + T._y;
              }
            }
            for (var A = 0; A < d; A++)
              w(f[A]);
            u._closed && d > 0 && w(f[0]);
          }
          return {
            _draw: function(s, u, l, f) {
              var d = u.dontStart, c = u.dontFinish || u.clip, p = this.getStyle(), g = p.hasFill(), b = p.hasStroke(), S = p.getDashArray(), x = !pt.support.nativeDash && b && S && S.length;
              d || s.beginPath(), (g || b && !x || c) && (r(s, this, f), this._closed && s.closePath());
              function y(m) {
                return S[(m % x + x) % x];
              }
              if (!c && (g || b) && (this._setStyles(s, u, l), g && (s.fill(p.getFillRule()), s.shadowColor = "rgba(0,0,0,0)"), b)) {
                if (x) {
                  d || s.beginPath();
                  for (var E = new Di(
                    this,
                    0.25,
                    32,
                    !1,
                    f
                  ), C = E.length, O = -p.getDashOffset(), w, A = 0; O > 0; )
                    O -= y(A--) + y(A--);
                  for (; O < C; )
                    w = O + y(A++), (O > 0 || w > 0) && E.drawPart(
                      s,
                      Math.max(O, 0),
                      Math.max(w, 0)
                    ), O = w + y(A++);
                }
                s.stroke();
              }
            },
            _drawSelected: function(s, u) {
              s.beginPath(), r(s, this, u), s.stroke(), i(s, this._segments, u, pt.settings.handleSize);
            }
          };
        }(),
        new function() {
          function i(r) {
            var s = r._segments;
            if (!s.length)
              throw new Error("Use a moveTo() command first");
            return s[s.length - 1];
          }
          return {
            moveTo: function() {
              var r = this._segments;
              r.length === 1 && this.removeSegment(0), r.length || this._add([new Pt(F.read(arguments))]);
            },
            moveBy: function() {
              throw new Error("moveBy() is unsupported on Path items.");
            },
            lineTo: function() {
              this._add([new Pt(F.read(arguments))]);
            },
            cubicCurveTo: function() {
              var r = arguments, s = F.read(r), u = F.read(r), l = F.read(r), f = i(this);
              f.setHandleOut(s.subtract(f._point)), this._add([new Pt(l, u.subtract(l))]);
            },
            quadraticCurveTo: function() {
              var r = arguments, s = F.read(r), u = F.read(r), l = i(this)._point;
              this.cubicCurveTo(
                s.add(l.subtract(s).multiply(1 / 3)),
                s.add(u.subtract(s).multiply(1 / 3)),
                u
              );
            },
            curveTo: function() {
              var r = arguments, s = F.read(r), u = F.read(r), l = h.pick(h.read(r), 0.5), f = 1 - l, d = i(this)._point, c = s.subtract(d.multiply(f * f)).subtract(u.multiply(l * l)).divide(2 * l * f);
              if (c.isNaN())
                throw new Error(
                  "Cannot put a curve through points with parameter = " + l
                );
              this.quadraticCurveTo(c, u);
            },
            arcTo: function() {
              var r = arguments, s = Math.abs, u = Math.sqrt, l = i(this), f = l._point, d = F.read(r), c, p = h.peek(r), g = h.pick(p, !0), b, S, x, y;
              if (typeof g == "boolean")
                var E = f.add(d).divide(2), c = E.add(E.subtract(f).rotate(
                  g ? -90 : 90
                ));
              else if (h.remain(r) <= 2)
                c = d, d = F.read(r);
              else if (!f.equals(d)) {
                var C = it.read(r), O = U.isZero;
                if (O(C.width) || O(C.height))
                  return this.lineTo(d);
                var w = h.read(r), g = !!h.read(r), A = !!h.read(r), E = f.add(d).divide(2), m = f.subtract(E).rotate(-w), I = m.x, T = m.y, M = s(C.width), P = s(C.height), N = M * M, V = P * P, B = I * I, H = T * T, D = u(B / N + H / V);
                if (D > 1 && (M *= D, P *= D, N = M * M, V = P * P), D = (N * V - N * H - V * B) / (N * H + V * B), s(D) < 1e-12 && (D = 0), D < 0)
                  throw new Error(
                    "Cannot create an arc with the given arguments"
                  );
                b = new F(M * T / P, -P * I / M).multiply((A === g ? -1 : 1) * u(D)).rotate(w).add(E), y = new It().translate(b).rotate(w).scale(M, P), x = y._inverseTransform(f), S = x.getDirectedAngle(y._inverseTransform(d)), !g && S > 0 ? S -= 360 : g && S < 0 && (S += 360);
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
                var X = Y.getSide(b, !0);
                X === 0 ? S = $ * s(S) : $ === X && (S += S < 0 ? 360 : -360);
              }
              if (S) {
                for (var at = 1e-5, ct = s(S), gt = ct >= 360 ? 4 : Math.ceil((ct - at) / 90), wt = S / gt, J = wt * Math.PI / 360, nt = 4 / 3 * Math.sin(J) / (1 + Math.cos(J)), mt = [], Ct = 0; Ct <= gt; Ct++) {
                  var m = d, St = null;
                  if (Ct < gt && (St = x.rotate(90).multiply(nt), y ? (m = y._transformPoint(x), St = y._transformPoint(x.add(St)).subtract(m)) : m = b.add(x)), !Ct)
                    l.setHandleOut(St);
                  else {
                    var Ft = x.rotate(-90).multiply(nt);
                    y && (Ft = y._transformPoint(x.add(Ft)).subtract(m)), mt.push(new Pt(m, Ft, St));
                  }
                  x = x.rotate(wt);
                }
                this._add(mt);
              }
            },
            lineBy: function() {
              var r = F.read(arguments), s = i(this)._point;
              this.lineTo(s.add(r));
            },
            curveBy: function() {
              var r = arguments, s = F.read(r), u = F.read(r), l = h.read(r), f = i(this)._point;
              this.curveTo(f.add(s), f.add(u), l);
            },
            cubicCurveBy: function() {
              var r = arguments, s = F.read(r), u = F.read(r), l = F.read(r), f = i(this)._point;
              this.cubicCurveTo(
                f.add(s),
                f.add(u),
                f.add(l)
              );
            },
            quadraticCurveBy: function() {
              var r = arguments, s = F.read(r), u = F.read(r), l = i(this)._point;
              this.quadraticCurveTo(l.add(s), l.add(u));
            },
            arcBy: function() {
              var r = arguments, s = i(this)._point, u = s.add(F.read(r)), l = h.pick(h.peek(r), !0);
              typeof l == "boolean" ? this.arcTo(u, l) : this.arcTo(u, s.add(F.read(r)));
            },
            closePath: function(r) {
              this.setClosed(!0), this.join(this, r);
            }
          };
        }(),
        {
          _getBounds: function(i, r) {
            var s = r.handle ? "getHandleBounds" : r.stroke ? "getStrokeBounds" : "getBounds";
            return Yt[s](this._segments, this._closed, this, i, r);
          },
          statics: {
            getBounds: function(i, r, s, u, l, f) {
              var d = i[0];
              if (!d)
                return new ut();
              var c = new Array(6), p = d._transformCoordinates(u, new Array(6)), g = p.slice(0, 2), b = g.slice(), S = new Array(2);
              function x(C) {
                C._transformCoordinates(u, c);
                for (var O = 0; O < 2; O++)
                  lt._addBounds(
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
            getStrokeBounds: function(i, r, s, u, l) {
              var f = s.getStyle(), d = f.hasStroke(), c = f.getStrokeWidth(), p = d && s._getStrokeMatrix(u, l), g = d && Yt._getStrokePadding(
                c,
                p
              ), b = Yt.getBounds(
                i,
                r,
                s,
                u,
                l,
                g
              );
              if (!d)
                return b;
              var S = c / 2, x = f.getStrokeJoin(), y = f.getStrokeCap(), E = f.getMiterLimit(), C = new ut(new it(g));
              function O(M) {
                b = b.include(M);
              }
              function w(M) {
                b = b.unite(
                  C.setCenter(M._point.transform(u))
                );
              }
              function A(M, P) {
                P === "round" || M.isSmooth() ? w(M) : Yt._addBevelJoin(
                  M,
                  P,
                  S,
                  E,
                  u,
                  p,
                  O
                );
              }
              function m(M, P) {
                P === "round" ? w(M) : Yt._addSquareCap(
                  M,
                  P,
                  S,
                  u,
                  p,
                  O
                );
              }
              var I = i.length - (r ? 0 : 1);
              if (I > 0) {
                for (var T = 1; T < I; T++)
                  A(i[T], x);
                r ? A(i[0], x) : (m(i[0], y), m(i[i.length - 1], y));
              }
              return b;
            },
            _getStrokePadding: function(i, r) {
              if (!r)
                return [i, i];
              var s = new F(i, 0).transform(r), u = new F(0, i).transform(r), l = s.getAngleInRadians(), f = s.getLength(), d = u.getLength(), c = Math.sin(l), p = Math.cos(l), g = Math.tan(l), b = Math.atan2(d * g, f), S = Math.atan2(d, g * f);
              return [
                Math.abs(f * Math.cos(b) * p + d * Math.sin(b) * c),
                Math.abs(d * Math.sin(S) * p + f * Math.cos(S) * c)
              ];
            },
            _addBevelJoin: function(i, r, s, u, l, f, d, c) {
              var p = i.getCurve(), g = p.getPrevious(), b = p.getPoint1().transform(l), S = g.getNormalAtTime(1).multiply(s).transform(f), x = p.getNormalAtTime(0).multiply(s).transform(f), y = S.getDirectedAngle(x);
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
                E && b.getDistance(E) <= u * s && d(E);
              }
              d(b.add(x));
            },
            _addSquareCap: function(i, r, s, u, l, f, d) {
              var c = i._point.transform(u), p = i.getLocation(), g = p.getNormal().multiply(p.getTime() === 0 ? s : -s).transform(l);
              r === "square" && (d && (f(c.subtract(g)), f(c.add(g))), c = c.add(g.rotate(-90))), f(c.add(g)), f(c.subtract(g));
            },
            getHandleBounds: function(i, r, s, u, l) {
              var f = s.getStyle(), d = l.stroke && f.hasStroke(), c, p;
              if (d) {
                var g = s._getStrokeMatrix(u, l), b = f.getStrokeWidth() / 2, S = b;
                f.getStrokeJoin() === "miter" && (S = b * f.getMiterLimit()), f.getStrokeCap() === "square" && (S = Math.max(S, b * Math.SQRT2)), c = Yt._getStrokePadding(b, g), p = Yt._getStrokePadding(S, g);
              }
              for (var x = new Array(6), y = 1 / 0, E = -y, C = y, O = E, w = 0, A = i.length; w < A; w++) {
                var m = i[w];
                m._transformCoordinates(u, x);
                for (var I = 0; I < 6; I += 2) {
                  var T = I ? c : p, M = T ? T[0] : 0, P = T ? T[1] : 0, N = x[I], V = x[I + 1], B = N - M, H = N + M, D = V - P, j = V + P;
                  B < y && (y = B), H > E && (E = H), D < C && (C = D), j > O && (O = j);
                }
              }
              return new ut(y, C, E - y, O - C);
            }
          }
        }
      );
      Yt.inject({ statics: new function() {
        var i = 0.5522847498307936, r = [
          new Pt([-1, 0], [0, i], [0, -0.5522847498307936]),
          new Pt([0, -1], [-0.5522847498307936, 0], [i, 0]),
          new Pt([1, 0], [0, -0.5522847498307936], [0, i]),
          new Pt([0, 1], [i, 0], [-0.5522847498307936, 0])
        ];
        function s(l, f, d) {
          var c = h.getNamed(d), p = new Yt(c && (c.insert == !0 ? kt.INSERT : c.insert == !1 ? kt.NO_INSERT : null));
          return p._add(l), p._closed = f, p.set(c, kt.INSERT);
        }
        function u(l, f, d) {
          for (var c = new Array(4), p = 0; p < 4; p++) {
            var g = r[p];
            c[p] = new Pt(
              g._point.multiply(f).add(l),
              g._handleIn.multiply(f),
              g._handleOut.multiply(f)
            );
          }
          return s(c, !0, d);
        }
        return {
          Line: function() {
            var l = arguments;
            return s([
              new Pt(F.readNamed(l, "from")),
              new Pt(F.readNamed(l, "to"))
            ], !1, l);
          },
          Circle: function() {
            var l = arguments, f = F.readNamed(l, "center"), d = h.readNamed(l, "radius");
            return u(f, new it(d), l);
          },
          Rectangle: function() {
            var l = arguments, f = ut.readNamed(l, "rectangle"), d = it.readNamed(
              l,
              "radius",
              0,
              { readNull: !0 }
            ), c = f.getBottomLeft(!0), p = f.getTopLeft(!0), g = f.getTopRight(!0), b = f.getBottomRight(!0), S;
            if (!d || d.isZero())
              S = [
                new Pt(c),
                new Pt(p),
                new Pt(g),
                new Pt(b)
              ];
            else {
              d = it.min(d, f.getSize(!0).divide(2));
              var x = d.width, y = d.height, E = x * i, C = y * i;
              S = [
                new Pt(c.add(x, 0), null, [-E, 0]),
                new Pt(c.subtract(0, y), [0, C]),
                new Pt(p.add(0, y), null, [0, -C]),
                new Pt(p.add(x, 0), [-E, 0], null),
                new Pt(g.subtract(x, 0), null, [E, 0]),
                new Pt(g.add(0, y), [0, -C], null),
                new Pt(b.subtract(0, y), null, [0, C]),
                new Pt(b.subtract(x, 0), [E, 0])
              ];
            }
            return s(S, !0, l);
          },
          RoundRectangle: "#Rectangle",
          Ellipse: function() {
            var l = arguments, f = ve._readEllipse(l);
            return u(f.center, f.radius, l);
          },
          Oval: "#Ellipse",
          Arc: function() {
            var l = arguments, f = F.readNamed(l, "from"), d = F.readNamed(l, "through"), c = F.readNamed(l, "to"), p = h.getNamed(l), g = new Yt(p && p.insert == !1 && kt.NO_INSERT);
            return g.moveTo(f), g.arcTo(d, c), g.set(p);
          },
          RegularPolygon: function() {
            for (var l = arguments, f = F.readNamed(l, "center"), d = h.readNamed(l, "sides"), c = h.readNamed(l, "radius"), p = 360 / d, g = d % 3 === 0, b = new F(0, g ? -c : c), S = g ? -1 : 0.5, x = new Array(d), y = 0; y < d; y++)
              x[y] = new Pt(f.add(
                b.rotate((y + S) * p)
              ));
            return s(x, !0, l);
          },
          Star: function() {
            for (var l = arguments, f = F.readNamed(l, "center"), d = h.readNamed(l, "points") * 2, c = h.readNamed(l, "radius1"), p = h.readNamed(l, "radius2"), g = 360 / d, b = new F(0, -1), S = new Array(d), x = 0; x < d; x++)
              S[x] = new Pt(f.add(b.rotate(g * x).multiply(x % 2 ? p : c)));
            return s(S, !0, l);
          }
        };
      }() });
      var $e = oe.extend(
        {
          _class: "CompoundPath",
          _serializeFields: {
            children: []
          },
          beans: !0,
          initialize: function(r) {
            this._children = [], this._namedChildren = {}, this._initialize(r) || (typeof r == "string" ? this.setPathData(r) : this.addChildren(Array.isArray(r) ? r : arguments));
          },
          insertChildren: function i(r, s) {
            var u = s, l = u[0];
            l && typeof l[0] == "number" && (u = [u]);
            for (var f = s.length - 1; f >= 0; f--) {
              var d = u[f];
              u === s && !(d instanceof Yt) && (u = h.slice(u)), Array.isArray(d) ? u[f] = new Yt({ segments: d, insert: !1 }) : d instanceof $e && (u.splice.apply(u, [f, 1].concat(d.removeChildren())), d.remove());
            }
            return i.base.call(this, r, u);
          },
          reduce: function i(r) {
            for (var s = this._children, u = s.length - 1; u >= 0; u--) {
              var l = s[u].reduce(r);
              l.isEmpty() && l.remove();
            }
            if (!s.length) {
              var l = new Yt(kt.NO_INSERT);
              return l.copyAttributes(this), l.insertAbove(this), this.remove(), l;
            }
            return i.base.call(this);
          },
          isClosed: function() {
            for (var i = this._children, r = 0, s = i.length; r < s; r++)
              if (!i[r]._closed)
                return !1;
            return !0;
          },
          setClosed: function(i) {
            for (var r = this._children, s = 0, u = r.length; s < u; s++)
              r[s].setClosed(i);
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
            for (var i = this._children, r = [], s = 0, u = i.length; s < u; s++)
              h.push(r, i[s].getCurves());
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
            for (var i = this._children, r = 0, s = 0, u = i.length; s < u; s++)
              r += i[s].getArea();
            return r;
          },
          getLength: function() {
            for (var i = this._children, r = 0, s = 0, u = i.length; s < u; s++)
              r += i[s].getLength();
            return r;
          },
          getPathData: function(i, r) {
            for (var s = this._children, u = [], l = 0, f = s.length; l < f; l++) {
              var d = s[l], c = d._matrix;
              u.push(d.getPathData(i && !c.isIdentity() ? i.appended(c) : i, r));
            }
            return u.join("");
          },
          _hitTestChildren: function i(r, s, u) {
            return i.base.call(
              this,
              r,
              s.class === Yt || s.type === "path" ? s : h.set({}, s, { fill: !1 }),
              u
            );
          },
          _draw: function(i, r, s, u) {
            var l = this._children;
            if (l.length) {
              r = r.extend({ dontStart: !0, dontFinish: !0 }), i.beginPath();
              for (var f = 0, d = l.length; f < d; f++)
                l[f].draw(i, r, u);
              if (!r.clip) {
                this._setStyles(i, r, s);
                var c = this._style;
                c.hasFill() && (i.fill(c.getFillRule()), i.shadowColor = "rgba(0,0,0,0)"), c.hasStroke() && i.stroke();
              }
            }
          },
          _drawSelected: function(i, r, s) {
            for (var u = this._children, l = 0, f = u.length; l < f; l++) {
              var d = u[l], c = d._matrix;
              s[d._id] || d._drawSelected(i, c.isIdentity() ? r : r.appended(c));
            }
          }
        },
        new function() {
          function i(r, s) {
            var u = r._children;
            if (s && !u.length)
              throw new Error("Use a moveTo() command first");
            return u[u.length - 1];
          }
          return h.each(
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
                var s = i(this, !0);
                s[r].apply(s, arguments);
              };
            },
            {
              moveTo: function() {
                var r = i(this), s = r && r.isEmpty() ? r : new Yt(kt.NO_INSERT);
                s !== r && this.addChild(s), s.moveTo.apply(s, arguments);
              },
              moveBy: function() {
                var r = i(this, !0), s = r && r.getLastSegment(), u = F.read(arguments);
                this.moveTo(s ? u.add(s._point) : u);
              },
              closePath: function(r) {
                i(this, !0).closePath(r);
              }
            }
          );
        }(),
        h.each(["reverse", "flatten", "simplify", "smooth"], function(i) {
          this[i] = function(r) {
            for (var s = this._children, u, l = 0, f = s.length; l < f; l++)
              u = s[l][i](r) || u;
            return u;
          };
        }, {})
      );
      oe.inject(new function() {
        var i = Math.min, r = Math.max, s = Math.abs, u = {
          unite: { 1: !0, 2: !0 },
          intersect: { 2: !0 },
          subtract: { 1: !0 },
          exclude: { 1: !0, "-1": !0 }
        };
        function l(w) {
          return w._children || [w];
        }
        function f(w, A) {
          var m = w.clone(!1).reduce({ simplify: !0 }).transform(null, !0, !0);
          if (A) {
            for (var I = l(m), T = 0, M = I.length; T < M; T++) {
              var w = I[T];
              !w._closed && !w.isEmpty() && (w.closePath(1e-12), w.getFirstSegment().setHandleIn(0, 0), w.getLastSegment().setHandleOut(0, 0));
            }
            m = m.resolveCrossings().reorient(m.getFillRule() === "nonzero", !0);
          }
          return m;
        }
        function d(w, A, m, I, T) {
          var M = new $e(kt.NO_INSERT);
          return M.addChildren(w, !0), M = M.reduce({ simplify: A }), T && T.insert == !1 || M.insertAbove(I && m.isSibling(I) && m.getIndex() < I.getIndex() ? I : m), M.copyAttributes(m, !0), M;
        }
        function c(w) {
          return w.hasOverlap() || w.isCrossing();
        }
        function p(w, A, m, I) {
          if (I && (I.trace == !1 || I.stroke) && /^(subtract|intersect)$/.test(m))
            return g(w, A, m);
          var T = f(w, !0), M = A && w !== A && f(A, !0), P = u[m];
          P[m] = !0, M && (P.subtract || P.exclude) ^ (M.isClockwise() ^ T.isClockwise()) && M.reverse();
          var N = y(re.expand(
            T.getIntersections(M, c)
          )), V = l(T), B = M && l(M), H = [], D = [], j;
          function G(St) {
            for (var Ft = 0, Lt = St.length; Ft < Lt; Ft++) {
              var Bt = St[Ft];
              h.push(H, Bt._segments), h.push(D, Bt.getCurves()), Bt._overlapsOnly = !0;
            }
          }
          function Y(St) {
            for (var Ft = [], Lt = 0, Bt = St && St.length; Lt < Bt; Lt++)
              Ft.push(D[St[Lt]]);
            return Ft;
          }
          if (N.length) {
            G(V), B && G(B);
            for (var $ = new Array(D.length), X = 0, at = D.length; X < at; X++)
              $[X] = D[X].getValues();
            for (var ct = R.findCurveBoundsCollisions(
              $,
              $,
              0,
              !0
            ), gt = {}, X = 0; X < D.length; X++) {
              var wt = D[X], J = wt._path._id, nt = gt[J] = gt[J] || {};
              nt[wt.getIndex()] = {
                hor: Y(ct[X].hor),
                ver: Y(ct[X].ver)
              };
            }
            for (var X = 0, at = N.length; X < at; X++)
              C(
                N[X]._segment,
                T,
                M,
                gt,
                P
              );
            for (var X = 0, at = H.length; X < at; X++) {
              var mt = H[X], Ct = mt._intersection;
              mt._winding || C(
                mt,
                T,
                M,
                gt,
                P
              ), Ct && Ct._overlap || (mt._path._overlapsOnly = !1);
            }
            j = O(H, P);
          } else
            j = x(
              B ? V.concat(B) : V.slice(),
              function(St) {
                return !!P[St];
              }
            );
          return d(j, !0, w, A, I);
        }
        function g(w, A, m) {
          var I = f(w), T = f(A), M = I.getIntersections(T, c), P = m === "subtract", N = m === "divide", V = {}, B = [];
          function H(G) {
            if (!V[G._id] && (N || T.contains(G.getPointAt(G.getLength() / 2)) ^ P))
              return B.unshift(G), V[G._id] = !0;
          }
          for (var D = M.length - 1; D >= 0; D--) {
            var j = M[D].split();
            j && (H(j) && j.getFirstSegment().setHandleIn(0, 0), I.getLastSegment().setHandleOut(0, 0));
          }
          return H(I), d(B, !1, w, A);
        }
        function b(w, A) {
          for (var m = w; m; ) {
            if (m === A)
              return;
            m = m._previous;
          }
          for (; w._next && w._next !== A; )
            w = w._next;
          if (!w._next) {
            for (; A._previous; )
              A = A._previous;
            w._next = A, A._previous = w;
          }
        }
        function S(w) {
          for (var A = w.length - 1; A >= 0; A--)
            w[A].clearHandles();
        }
        function x(w, A, m) {
          var I = w && w.length;
          if (I) {
            var T = h.each(w, function(ct, gt) {
              this[ct._id] = {
                container: null,
                winding: ct.isClockwise() ? 1 : -1,
                index: gt
              };
            }, {}), M = w.slice().sort(function(ct, gt) {
              return s(gt.getArea()) - s(ct.getArea());
            }), P = M[0], N = R.findItemBoundsCollisions(
              M,
              null,
              U.GEOMETRIC_EPSILON
            );
            m == null && (m = P.isClockwise());
            for (var V = 0; V < I; V++) {
              var B = M[V], H = T[B._id], D = 0, j = N[V];
              if (j) {
                for (var G = null, Y = j.length - 1; Y >= 0; Y--)
                  if (j[Y] < V) {
                    G = G || B.getInteriorPoint();
                    var $ = M[j[Y]];
                    if ($.contains(G)) {
                      var X = T[$._id];
                      D = X.winding, H.winding += D, H.container = X.exclude ? X.container : $;
                      break;
                    }
                  }
              }
              if (A(H.winding) === A(D))
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
        function y(w, A, m) {
          var I = A && [], T = 1e-8, M = 1 - T, P = !1, N = m || [], V = m && {}, B, H, D;
          function j(Ft) {
            return Ft._path._id + "." + Ft._segment1._index;
          }
          for (var G = (m && m.length) - 1; G >= 0; G--) {
            var Y = m[G];
            Y._path && (V[j(Y)] = !0);
          }
          for (var G = w.length - 1; G >= 0; G--) {
            var $ = w[G], X = $._time, at = X, ct = A && !A($), Y = $._curve, gt;
            if (Y && (Y !== H ? (P = !Y.hasHandles() || V && V[j(Y)], B = [], D = null, H = Y) : D >= T && (X /= D)), ct) {
              B && B.push($);
              continue;
            } else A && I.unshift($);
            if (D = at, X < T)
              gt = Y._segment1;
            else if (X > M)
              gt = Y._segment2;
            else {
              var wt = Y.divideAtTime(X, !0);
              P && N.push(Y, wt), gt = wt._segment1;
              for (var J = B.length - 1; J >= 0; J--) {
                var nt = B[J];
                nt._time = (nt._time - X) / (1 - X);
              }
            }
            $._setSegment(gt);
            var mt = gt._intersection, Ct = $._intersection;
            if (mt) {
              b(mt, Ct);
              for (var St = mt; St; )
                b(St._intersection, mt), St = St._next;
            } else
              gt._intersection = Ct;
          }
          return m || S(N), I || w;
        }
        function E(w, A, m, I, T) {
          var M = Array.isArray(A) ? A : A[m ? "hor" : "ver"], P = m ? 1 : 0, N = P ^ 1, V = [w.x, w.y], B = V[P], H = V[N], D = 1e-9, j = 1e-6, G = B - D, Y = B + D, $ = 0, X = 0, at = 0, ct = 0, gt = !1, wt = !1, J = 1, nt = [], mt, Ct;
          function St(pe) {
            var Ee = pe[N + 0], ni = pe[N + 6];
            if (!(H < i(Ee, ni) || H > r(Ee, ni))) {
              var ze = pe[P + 0], yi = pe[P + 2], fn = pe[P + 4], Pi = pe[P + 6];
              if (Ee === ni) {
                (ze < Y && Pi > G || Pi < Y && ze > G) && (gt = !0);
                return;
              }
              var Ti = H === Ee ? 0 : H === ni || G > r(ze, yi, fn, Pi) || Y < i(ze, yi, fn, Pi) ? 1 : lt.solveCubic(pe, N, H, nt, 0, 1) > 0 ? nt[0] : 1, ri = Ti === 0 ? ze : Ti === 1 ? Pi : lt.getPoint(pe, Ti)[m ? "y" : "x"], ui = Ee > ni ? 1 : -1, cn = mt[N] > mt[N + 6] ? 1 : -1, Ei = mt[P + 6];
              return H !== Ee ? (ri < G ? at += ui : ri > Y ? ct += ui : gt = !0, ri > B - j && ri < B + j && (J /= 2)) : (ui !== cn ? ze < G ? at += ui : ze > Y && (ct += ui) : ze != Ei && (Ei < Y && ri > Y ? (ct += ui, gt = !0) : Ei > G && ri < G && (at += ui, gt = !0)), J /= 4), mt = pe, !T && ri > G && ri < Y && lt.getTangent(pe, Ti)[m ? "x" : "y"] === 0 && E(w, A, !m, I, !0);
            }
          }
          function Ft(pe) {
            var Ee = pe[N + 0], ni = pe[N + 2], ze = pe[N + 4], yi = pe[N + 6];
            if (H <= r(Ee, ni, ze, yi) && H >= i(Ee, ni, ze, yi)) {
              for (var fn = pe[P + 0], Pi = pe[P + 2], Ti = pe[P + 4], ri = pe[P + 6], ui = G > r(fn, Pi, Ti, ri) || Y < i(fn, Pi, Ti, ri) ? [pe] : lt.getMonoCurves(pe, m), cn, Ei = 0, ls = ui.length; Ei < ls; Ei++)
                if (cn = St(ui[Ei]))
                  return cn;
            }
          }
          for (var Lt = 0, Bt = M.length; Lt < Bt; Lt++) {
            var Ht = M[Lt], Vt = Ht._path, Re = Ht.getValues(), Fe;
            if ((!Lt || M[Lt - 1]._path !== Vt) && (mt = null, Vt._closed || (Ct = lt.getValues(
              Vt.getLastCurve().getSegment2(),
              Ht.getSegment1(),
              null,
              !I
            ), Ct[N] !== Ct[N + 6] && (mt = Ct)), !mt)) {
              mt = Re;
              for (var Be = Vt.getLastCurve(); Be && Be !== Ht; ) {
                var Te = Be.getValues();
                if (Te[N] !== Te[N + 6]) {
                  mt = Te;
                  break;
                }
                Be = Be.getPrevious();
              }
            }
            if (Fe = Ft(Re))
              return Fe;
            if (Lt + 1 === Bt || M[Lt + 1]._path !== Vt) {
              if (Ct && (Fe = Ft(Ct)))
                return Fe;
              gt && !at && !ct && (at = ct = Vt.isClockwise(I) ^ m ? 1 : -1), $ += at, X += ct, at = ct = 0, gt && (wt = !0, gt = !1), Ct = null;
            }
          }
          return $ = s($), X = s(X), {
            winding: r($, X),
            windingL: $,
            windingR: X,
            quality: J,
            onPath: wt
          };
        }
        function C(w, A, m, I, T) {
          var M = [], P = w, N = 0, D;
          do {
            var V = w.getCurve();
            if (V) {
              var B = V.getLength();
              M.push({ segment: w, curve: V, length: B }), N += B;
            }
            w = w.getNext();
          } while (w && !w._intersection && w !== P);
          for (var H = [0.5, 0.25, 0.75], D = { winding: 0, quality: -1 }, j = 1e-3, G = 1 - j, Y = 0; Y < H.length && D.quality < 0.5; Y++)
            for (var B = N * H[Y], $ = 0, X = M.length; $ < X; $++) {
              var at = M[$], ct = at.length;
              if (B <= ct) {
                var V = at.curve, gt = V._path, wt = gt._parent, J = wt instanceof $e ? wt : gt, nt = U.clamp(V.getTimeAt(B), j, G), mt = V.getPointAtTime(nt), Ct = s(V.getTangentAtTime(nt).y) < Math.SQRT1_2, St = null;
                if (T.subtract && m) {
                  var Ft = J === A ? m : A, Lt = Ft._getWinding(mt, Ct, !0);
                  if (J === A && Lt.winding || J === m && !Lt.winding) {
                    if (Lt.quality < 1)
                      continue;
                    St = { winding: 0, quality: 1 };
                  }
                }
                St = St || E(
                  mt,
                  I[gt._id][V.getIndex()],
                  Ct,
                  !0
                ), St.quality > D.quality && (D = St);
                break;
              }
              B -= ct;
            }
          for (var $ = M.length - 1; $ >= 0; $--)
            M[$].segment._winding = D;
        }
        function O(w, A) {
          var m = [], I;
          function T(Bt) {
            var Ht;
            return !!(Bt && !Bt._visited && (!A || A[(Ht = Bt._winding || {}).winding] && !(A.unite && Ht.winding === 2 && Ht.windingL && Ht.windingR)));
          }
          function M(Bt) {
            if (Bt) {
              for (var Ht = 0, Vt = I.length; Ht < Vt; Ht++)
                if (Bt === I[Ht])
                  return !0;
            }
            return !1;
          }
          function P(Bt) {
            for (var Ht = Bt._segments, Vt = 0, Re = Ht.length; Vt < Re; Vt++)
              Ht[Vt]._visited = !0;
          }
          function N(Bt, Ht) {
            var Vt = Bt._intersection, Re = Vt, Fe = [];
            Ht && (I = [Bt]);
            function Be(Te, pe) {
              for (; Te && Te !== pe; ) {
                var Ee = Te._segment, ni = Ee && Ee._path;
                if (ni) {
                  var ze = Ee.getNext() || ni.getFirstSegment(), yi = ze._intersection;
                  Ee !== Bt && (M(Ee) || M(ze) || ze && T(Ee) && (T(ze) || yi && T(yi._segment))) && Fe.push(Ee), Ht && I.push(Ee);
                }
                Te = Te._next;
              }
            }
            if (Vt) {
              for (Be(Vt); Vt && Vt._previous; )
                Vt = Vt._previous;
              Be(Vt, Re);
            }
            return Fe;
          }
          w.sort(function(Bt, Ht) {
            var Vt = Bt._intersection, Re = Ht._intersection, Fe = !!(Vt && Vt._overlap), Be = !!(Re && Re._overlap), Te = Bt._path, pe = Ht._path;
            return Fe ^ Be ? Fe ? 1 : -1 : !Vt ^ !Re ? Vt ? 1 : -1 : Te !== pe ? Te._id - pe._id : Bt._index - Ht._index;
          });
          for (var V = 0, B = w.length; V < B; V++) {
            var H = w[V], D = T(H), j = null, G = !1, Y = !0, $ = [], X, at, ct;
            if (D && H._path._overlapsOnly) {
              var gt = H._path, wt = H._intersection._segment._path;
              gt.compare(wt) && (gt.getArea() && m.push(gt.clone(!1)), P(gt), P(wt), D = !1);
            }
            for (; D; ) {
              var J = !j, nt = N(H, J), mt = nt.shift(), G = !J && (M(H) || M(mt)), Ct = !G && mt;
              if (J && (j = new Yt(kt.NO_INSERT), X = null), G) {
                (H.isFirst() || H.isLast()) && (Y = H._path._closed), H._visited = !0;
                break;
              }
              if (Ct && X && ($.push(X), X = null), X || (Ct && nt.push(H), X = {
                start: j._segments.length,
                crossings: nt,
                visited: at = [],
                handleIn: ct
              }), Ct && (H = mt), !T(H)) {
                j.removeSegments(X.start);
                for (var St = 0, Ft = at.length; St < Ft; St++)
                  at[St]._visited = !1;
                at.length = 0;
                do
                  H = X && X.crossings.shift(), (!H || !H._path) && (H = null, X = $.pop(), X && (at = X.visited, ct = X.handleIn));
                while (X && !T(H));
                if (!H)
                  break;
              }
              var Lt = H.getNext();
              j.add(new Pt(
                H._point,
                ct,
                Lt && H._handleOut
              )), H._visited = !0, at.push(H), H = Lt || H._path.getFirstSegment(), ct = Lt && Lt._handleIn;
            }
            G && (Y && (j.getFirstSegment().setHandleIn(ct), j.setClosed(Y)), j.getArea() !== 0 && m.push(j));
          }
          return m;
        }
        return {
          _getWinding: function(w, A, m) {
            return E(w, this.getCurves(), A, m);
          },
          unite: function(w, A) {
            return p(this, w, "unite", A);
          },
          intersect: function(w, A) {
            return p(this, w, "intersect", A);
          },
          subtract: function(w, A) {
            return p(this, w, "subtract", A);
          },
          exclude: function(w, A) {
            return p(this, w, "exclude", A);
          },
          divide: function(w, A) {
            return A && (A.trace == !1 || A.stroke) ? g(this, w, "divide") : d([
              this.subtract(w, A),
              this.intersect(w, A)
            ], !0, this, w, A);
          },
          resolveCrossings: function() {
            var w = this._children, A = w || [this];
            function m(X, at) {
              var ct = X && X._intersection;
              return ct && ct._overlap && ct._path === at;
            }
            var I = !1, T = !1, M = this.getIntersections(null, function(X) {
              return X.hasOverlap() && (I = !0) || X.isCrossing() && (T = !0);
            }), P = I && T && [];
            if (M = re.expand(M), I)
              for (var N = y(M, function(X) {
                return X.hasOverlap();
              }, P), V = N.length - 1; V >= 0; V--) {
                var B = N[V], H = B._path, D = B._segment, j = D.getPrevious(), G = D.getNext();
                m(j, H) && m(G, H) && (D.remove(), j._handleOut._set(0, 0), G._handleIn._set(0, 0), j !== D && !j.getCurve().hasLength() && (G._handleIn.set(j._handleIn), j.remove()));
              }
            T && (y(M, I && function(X) {
              var at = X.getCurve(), ct = X.getSegment(), gt = X._intersection, wt = gt._curve, J = gt._segment;
              if (at && wt && at._path && wt._path)
                return !0;
              ct && (ct._intersection = null), J && (J._intersection = null);
            }, P), P && S(P), A = O(h.each(A, function(X) {
              h.push(this, X._segments);
            }, [])));
            var Y = A.length, $;
            return Y > 1 && w ? (A !== w && this.setChildren(A), $ = this) : Y === 1 && !w && (A[0] !== this && this.setSegments(A[0].removeSegments()), $ = this), $ || ($ = new $e(kt.NO_INSERT), $.addChildren(A), $ = $.reduce(), $.copyAttributes(this), this.replaceWith($)), $;
          },
          reorient: function(w, A) {
            var m = this._children;
            return m && m.length ? this.setChildren(x(
              this.removeChildren(),
              function(I) {
                return !!(w ? I : I & 1);
              },
              A
            )) : A !== n && this.setClockwise(A), this;
          },
          getInteriorPoint: function() {
            var w = this.getBounds(), A = w.getCenter(!0);
            if (!this.contains(A)) {
              for (var m = this.getCurves(), I = A.y, T = [], M = [], P = 0, N = m.length; P < N; P++) {
                var V = m[P].getValues(), B = V[1], H = V[3], D = V[5], j = V[7];
                if (I >= i(B, H, D, j) && I <= r(B, H, D, j))
                  for (var G = lt.getMonoCurves(V), Y = 0, $ = G.length; Y < $; Y++) {
                    var X = G[Y], at = X[1], ct = X[7];
                    if (at !== ct && (I >= at && I <= ct || I >= ct && I <= at)) {
                      var gt = I === at ? X[0] : I === ct ? X[6] : lt.solveCubic(X, 1, I, M, 0, 1) === 1 ? lt.getPoint(X, M[0]).x : (X[0] + X[6]) / 2;
                      T.push(gt);
                    }
                  }
              }
              T.length > 1 && (T.sort(function(wt, J) {
                return wt - J;
              }), A.x = (T[0] + T[1]) / 2);
            }
            return A;
          }
        };
      }());
      var Di = h.extend(
        {
          _class: "PathFlattener",
          initialize: function(i, r, s, u, l) {
            var f = [], d = [], c = 0, p = 1 / (s || 32), g = i._segments, b = g[0], S;
            function x(O, w) {
              var A = lt.getValues(O, w, l);
              f.push(A), y(A, O._index, 0, 1);
            }
            function y(O, w, A, m) {
              if (m - A > p && !(u && lt.isStraight(O)) && !lt.isFlatEnough(O, r || 0.25)) {
                var I = lt.subdivide(O, 0.5), T = (A + m) / 2;
                y(I[0], w, A, T), y(I[1], w, T, m);
              } else {
                var M = O[6] - O[0], P = O[7] - O[1], N = Math.sqrt(M * M + P * P);
                N > 0 && (c += N, d.push({
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
            for (var r = this.parts, s = r.length, u, l = this.index; u = l, !(!l || r[--l].offset < i); )
              ;
            for (; u < s; u++) {
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
              index: r[s - 1].index,
              time: 1
            };
          },
          drawPart: function(i, r, s) {
            for (var u = this._get(r), l = this._get(s), f = u.index, d = l.index; f <= d; f++) {
              var c = lt.getPart(
                this.curves[f],
                f === u.index ? u.time : 0,
                f === l.index ? l.time : 1
              );
              f === u.index && i.moveTo(c[0], c[1]), i.bezierCurveTo.apply(i, c.slice(2));
            }
          }
        },
        h.each(
          lt._evaluateMethods,
          function(i) {
            this[i + "At"] = function(r) {
              var s = this._get(r);
              return lt[i](this.curves[s.index], s.time);
            };
          },
          {}
        )
      ), vi = h.extend({
        initialize: function(i) {
          for (var r = this.points = [], s = i._segments, u = i._closed, l = 0, f, d = s.length; l < d; l++) {
            var c = s[l].point;
            (!f || !f.equals(c)) && r.push(f = c.clone());
          }
          u && (r.unshift(r[r.length - 1]), r.push(r[1])), this.closed = u;
        },
        fit: function(i) {
          var r = this.points, s = r.length, u = null;
          return s > 0 && (u = [new Pt(r[0])], s > 1 && (this.fitCubic(
            u,
            i,
            0,
            s - 1,
            r[1].subtract(r[0]),
            r[s - 2].subtract(r[s - 1])
          ), this.closed && (u.shift(), u.pop()))), u;
        },
        fitCubic: function(i, r, s, u, l, f) {
          var d = this.points;
          if (u - s === 1) {
            var c = d[s], p = d[u], g = c.getDistance(p) / 3;
            this.addCurve(i, [
              c,
              c.add(l.normalize(g)),
              p.add(f.normalize(g)),
              p
            ]);
            return;
          }
          for (var b = this.chordLengthParameterize(s, u), S = Math.max(r, r * r), x, y = !0, E = 0; E <= 4; E++) {
            var C = this.generateBezier(s, u, b, l, f), O = this.findMaxError(s, u, C, b);
            if (O.error < r && y) {
              this.addCurve(i, C);
              return;
            }
            if (x = O.index, O.error >= S)
              break;
            y = this.reparameterize(s, u, b, C), S = O.error;
          }
          var w = d[x - 1].subtract(d[x + 1]);
          this.fitCubic(i, r, s, x, l, w), this.fitCubic(i, r, x, u, w.negate(), f);
        },
        addCurve: function(i, r) {
          var s = i[i.length - 1];
          s.setHandleOut(r[1].subtract(r[0])), i.push(new Pt(r[3], r[2].subtract(r[3])));
        },
        generateBezier: function(i, r, s, u, l) {
          for (var f = 1e-12, d = Math.abs, c = this.points, p = c[i], g = c[r], b = [[0, 0], [0, 0]], S = [0, 0], x = 0, y = r - i + 1; x < y; x++) {
            var E = s[x], C = 1 - E, O = 3 * E * C, w = C * C * C, A = O * C, m = O * E, I = E * E * E, T = u.normalize(A), M = l.normalize(m), P = c[i + x].subtract(p.multiply(w + A)).subtract(g.multiply(m + I));
            b[0][0] += T.dot(T), b[0][1] += T.dot(M), b[1][0] = b[0][1], b[1][1] += M.dot(M), S[0] += T.dot(P), S[1] += M.dot(P);
          }
          var N = b[0][0] * b[1][1] - b[1][0] * b[0][1], V, B;
          if (d(N) > f) {
            var H = b[0][0] * S[1] - b[1][0] * S[0], D = S[0] * b[1][1] - S[1] * b[0][1];
            V = D / N, B = H / N;
          } else {
            var j = b[0][0] + b[0][1], G = b[1][0] + b[1][1];
            V = B = d(j) > f ? S[0] / j : d(G) > f ? S[1] / G : 0;
          }
          var Y = g.getDistance(p), $ = f * Y, X, at;
          if (V < $ || B < $)
            V = B = Y / 3;
          else {
            var ct = g.subtract(p);
            X = u.normalize(V), at = l.normalize(B), X.dot(ct) - at.dot(ct) > Y * Y && (V = B = Y / 3, X = at = null);
          }
          return [
            p,
            p.add(X || u.normalize(V)),
            g.add(at || l.normalize(B)),
            g
          ];
        },
        reparameterize: function(i, r, s, u) {
          for (var l = i; l <= r; l++)
            s[l - i] = this.findRoot(u, this.points[l], s[l - i]);
          for (var l = 1, f = s.length; l < f; l++)
            if (s[l] <= s[l - 1])
              return !1;
          return !0;
        },
        findRoot: function(i, r, s) {
          for (var u = [], l = [], f = 0; f <= 2; f++)
            u[f] = i[f + 1].subtract(i[f]).multiply(3);
          for (var f = 0; f <= 1; f++)
            l[f] = u[f + 1].subtract(u[f]).multiply(2);
          var d = this.evaluate(3, i, s), c = this.evaluate(2, u, s), p = this.evaluate(1, l, s), g = d.subtract(r), b = c.dot(c) + g.dot(p);
          return U.isMachineZero(b) ? s : s - g.dot(c) / b;
        },
        evaluate: function(i, r, s) {
          for (var u = r.slice(), l = 1; l <= i; l++)
            for (var f = 0; f <= i - l; f++)
              u[f] = u[f].multiply(1 - s).add(u[f + 1].multiply(s));
          return u[0];
        },
        chordLengthParameterize: function(i, r) {
          for (var s = [0], u = i + 1; u <= r; u++)
            s[u - i] = s[u - i - 1] + this.points[u].getDistance(this.points[u - 1]);
          for (var u = 1, l = r - i; u <= l; u++)
            s[u] /= s[l];
          return s;
        },
        findMaxError: function(i, r, s, u) {
          for (var l = Math.floor((r - i + 1) / 2), f = 0, d = i + 1; d < r; d++) {
            var c = this.evaluate(3, s, u[d - i]), p = c.subtract(this.points[d]), g = p.x * p.x + p.y * p.y;
            g >= f && (f = g, l = d);
          }
          return {
            error: f,
            index: l
          };
        }
      }), Tn = kt.extend({
        _class: "TextItem",
        _applyMatrix: !1,
        _canApplyMatrix: !1,
        _serializeFields: {
          content: null
        },
        _boundsOptions: { stroke: !1, handle: !1 },
        initialize: function(r) {
          this._content = "", this._lines = [];
          var s = r && h.isPlainObject(r) && r.x === n && r.y === n;
          this._initialize(s && r, !s && F.read(arguments));
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
      }), da = Tn.extend({
        _class: "PointText",
        initialize: function() {
          Tn.apply(this, arguments);
        },
        getPoint: function() {
          var i = this._matrix.getTranslation();
          return new yt(i.x, i.y, this, "setPoint");
        },
        setPoint: function() {
          var i = F.read(arguments);
          this.translate(i.subtract(this._matrix.getTranslation()));
        },
        _draw: function(i, r, s) {
          if (this._content) {
            this._setStyles(i, r, s);
            var u = this._lines, l = this._style, f = l.hasFill(), d = l.hasStroke(), c = l.getLeading(), p = i.shadowColor;
            i.font = l.getFontStyle(), i.textAlign = l.getJustification();
            for (var g = 0, b = u.length; g < b; g++) {
              i.shadowColor = p;
              var S = u[g];
              f && (i.fillText(S, 0, 0), i.shadowColor = "rgba(0,0,0,0)"), d && i.strokeText(S, 0, 0), i.translate(0, c);
            }
          }
        },
        _getBounds: function(i, r) {
          var s = this._style, u = this._lines, l = u.length, f = s.getJustification(), d = s.getLeading(), c = this.getView().getTextWidth(s.getFontStyle(), u), p = 0;
          f !== "left" && (p -= c / (f === "center" ? 2 : 1));
          var g = new ut(
            p,
            l ? -0.75 * d : 0,
            c,
            l * d
          );
          return i ? i._transformBounds(g, g) : g;
        }
      }), Pe = h.extend(
        new function() {
          var i = {
            gray: ["gray"],
            rgb: ["red", "green", "blue"],
            hsb: ["hue", "saturation", "brightness"],
            hsl: ["hue", "saturation", "lightness"],
            gradient: ["gradient", "origin", "destination", "highlight"]
          }, r = {}, s = {
            transparent: [0, 0, 0, 0]
          }, u;
          function l(c) {
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
              var A = s[c];
              if (!A)
                if (a) {
                  u || (u = st.getContext(1, 1, {
                    willReadFrequently: !0
                  }), u.globalCompositeOperation = "copy"), u.fillStyle = "rgba(0,0,0,0)", u.fillStyle = c, u.fillRect(0, 0, 1, 1);
                  var m = u.getImageData(0, 0, 1, 1).data;
                  A = s[c] = [
                    m[0] / 255,
                    m[1] / 255,
                    m[2] / 255
                  ];
                } else
                  A = [0, 0, 0];
              b = A.slice();
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
          return h.each(i, function(c, p) {
            r[p] = [], h.each(c, function(g, b) {
              var S = h.capitalize(g), x = /^(hue|saturation)$/.test(g), y = r[p][b] = p === "gradient" ? g === "gradient" ? function(E) {
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
              if (O === "string" && p in i && (x = p, p = g[1], Array.isArray(p) ? (y = p, E = g[2]) : (b && (S = 1), g = h.slice(g, 1), O = typeof p)), !y) {
                if (C = O === "number" ? g : O === "object" && p.length != null ? p : null, C) {
                  x || (x = C.length >= 3 ? "rgb" : "gray");
                  var w = i[x].length;
                  E = C[w], b && (S += C === arguments ? w + (E != null ? 1 : 0) : 1), C.length > w && (C = h.slice(C, 0, w));
                } else if (O === "string") {
                  var A = l(p);
                  x = A[0], y = A[1], y.length === 4 && (E = y[3], y.length--);
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
                    var M = i[x], P = r[x];
                    this._components = y = [];
                    for (var m = 0, I = M.length; m < I; m++) {
                      var N = p[M[m]];
                      N == null && !m && x === "gradient" && "stops" in p && (N = {
                        stops: p.stops,
                        radial: p.radial
                      }), N = P[m].call(this, N), N != null && (y[m] = N);
                    }
                    E = p.alpha;
                  }
                b && x && (S = 1);
              }
              if (this._type = x || "rgb", !y) {
                this._components = y = [];
                for (var P = r[this._type], m = 0, I = P.length; m < I; m++) {
                  var N = P[m].call(this, C && C[m]);
                  N != null && (y[m] = N);
                }
              }
              return this._components = y, this._properties = i[this._type], this._alpha = E, b && (this.__read = S), this;
            },
            set: "#initialize",
            _serialize: function(c, p) {
              var g = this.getComponents();
              return h.serialize(
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
              return new Pe(c, this._convert(c), this._alpha);
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
              var p = h.isPlainValue(c, !0) ? Pe.read(arguments) : c;
              return p === this || p && this._class === p._class && this._type === p._type && this.getAlpha() === p.getAlpha() && h.equals(this._components, p._components) || !1;
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
                  var A = E.subtract(x);
                  A.getLength() > w && (E = x.add(A.normalize(w - 0.1)));
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
                var M = S[I], P = M._offset;
                O.addColorStop(
                  P ?? I / (T - 1),
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
                return new Pe(c(), c(), c());
              },
              _setOwner: function(c, p, g) {
                return c && (c._owner && p && c._owner !== p && (c = c.clone()), !c._owner ^ !p && (c._owner = p || null, c._setter = g || null)), c;
              }
            }
          });
        }(),
        new function() {
          var i = {
            add: function(r, s) {
              return r + s;
            },
            subtract: function(r, s) {
              return r - s;
            },
            multiply: function(r, s) {
              return r * s;
            },
            divide: function(r, s) {
              return r / s;
            }
          };
          return h.each(i, function(r, s) {
            this[s] = function(u) {
              u = Pe.read(arguments);
              for (var l = this._type, f = this._components, d = u._convert(l), c = 0, p = f.length; c < p; c++)
                d[c] = r(f[c], d[c]);
              return new Pe(
                l,
                d,
                this._alpha != null ? r(this._alpha, u.getAlpha()) : null
              );
            };
          }, {});
        }()
      ), Vi = h.extend({
        _class: "Gradient",
        initialize: function(r, s) {
          this._id = et.get(), r && h.isPlainObject(r) && (this.set(r), r = s = null), this._stops == null && this.setStops(r || ["white", "black"]), this._radial == null && this.setRadial(typeof s == "string" && s === "radial" || s || !1);
        },
        _serialize: function(i, r) {
          return r.add(this, function() {
            return h.serialize(
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
          for (var i = [], r = 0, s = this._stops.length; r < s; r++)
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
            for (var s = 0, u = r.length; s < u; s++)
              r[s]._owner = n;
          r = this._stops = hn.readList(i, 0, { clone: !0 });
          for (var s = 0, u = r.length; s < u; s++)
            r[s]._owner = this;
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
            var r = this._stops, s = i._stops, u = r.length;
            if (u === s.length) {
              for (var l = 0; l < u; l++)
                if (!r[l].equals(s[l]))
                  return !1;
              return !0;
            }
          }
          return !1;
        }
      }), hn = h.extend({
        _class: "GradientStop",
        initialize: function(r, s) {
          var u = r, l = s;
          typeof r == "object" && s === n && (Array.isArray(r) && typeof r[0] != "number" ? (u = r[0], l = r[1]) : ("color" in r || "offset" in r || "rampPoint" in r) && (u = r.color, l = r.offset || r.rampPoint || 0)), this.setColor(u), this.setOffset(l);
        },
        clone: function() {
          return new hn(this._color.clone(), this._offset);
        },
        _serialize: function(i, r) {
          var s = this._color, u = this._offset;
          return h.serialize(
            u == null ? [s] : [s, u],
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
          Pe._setOwner(this._color, null), this._color = Pe._setOwner(
            Pe.read(arguments, 0),
            this,
            "setColor"
          ), this._changed();
        },
        equals: function(i) {
          return i === this || i && this._class === i._class && this._color.equals(i._color) && this._offset == i._offset || !1;
        }
      }), En = h.extend(new function() {
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
        }, r = h.set({}, i, {
          fontFamily: "sans-serif",
          fontWeight: "normal",
          fontSize: 12,
          leading: null,
          justification: "left"
        }), s = h.set({}, r, {
          fillColor: new Pe()
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
        }, l = {
          beans: !0
        }, f = {
          _class: "Style",
          beans: !0,
          initialize: function(c, p, g) {
            this._values = {}, this._owner = p, this._project = p && p._project || g || pt.project, this._defaults = !p || p instanceof At ? r : p instanceof Tn ? s : i, c && this.set(c);
          }
        };
        return h.each(r, function(d, c) {
          var p = /Color$/.test(c), g = c === "shadowOffset", b = h.capitalize(c), S = u[c], x = "set" + b, y = "get" + b;
          f[x] = function(E) {
            var C = this._owner, O = C && C._children, w = O && O.length > 0 && !(C instanceof $e);
            if (w)
              for (var A = 0, m = O.length; A < m; A++)
                O[A]._style[x](E);
            if ((c === "selectedColor" || !w) && c in this._defaults) {
              var I = this._values[c];
              I !== E && (p && (I && (Pe._setOwner(I, null), I._canvasStyle = null), E && E.constructor === Pe && (E = Pe._setOwner(
                E,
                C,
                w && x
              ))), this._values[c] = E, C && C._changed(S || 129));
            }
          }, f[y] = function(E) {
            var C = this._owner, O = C && C._children, w = O && O.length > 0 && !(C instanceof $e), A;
            if (w && !E)
              for (var m = 0, I = O.length; m < I; m++) {
                var T = O[m]._style[y]();
                if (!m)
                  A = T;
                else if (!h.equals(A, T))
                  return n;
              }
            else if (c in this._defaults) {
              var A = this._values[c];
              if (A === n)
                A = this._defaults[c], A && A.clone && (A = A.clone());
              else {
                var M = p ? Pe : g ? F : null;
                M && !(A && A.constructor === M) && (this._values[c] = A = M.read(
                  [A],
                  0,
                  { readNull: !0, clone: !0 }
                ));
              }
            }
            return A && p && (A = Pe._setOwner(A, C, w && x)), A;
          }, l[y] = function(E) {
            return this._style[y](E);
          }, l[x] = function(E) {
            this._style[x](E);
          };
        }), h.each({
          Font: "FontFamily",
          WindingRule: "FillRule"
        }, function(d, c) {
          var p = "get" + c, g = "set" + c;
          f[p] = l[p] = "#get" + d, f[g] = l[g] = "#set" + d;
        }), kt.inject(l), f;
      }(), {
        set: function(i) {
          var r = i instanceof En, s = r ? i._values : i;
          if (s) {
            for (var u in s)
              if (u in this._defaults) {
                var l = s[u];
                this[u] = l && r && l.clone ? l.clone() : l;
              }
          }
        },
        equals: function(i) {
          function r(s, u, l) {
            var f = s._values, d = u._values, c = u._defaults;
            for (var p in f) {
              var g = f[p], b = d[p];
              if (!(l && p in d) && !h.equals(
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
          var r = i.base.call(this), s = this.getFontSize();
          return /pt|em|%|px/.test(s) && (s = this.getView().getPixelSize(s)), r ?? s * 1.2;
        }
      }), we = new function() {
        function i(r, s, u, l) {
          for (var f = ["", "webkit", "moz", "Moz", "ms", "o"], d = s[0].toUpperCase() + s.substring(1), c = 0; c < 6; c++) {
            var p = f[c], g = p ? p + d : s;
            if (g in r) {
              if (u)
                r[g] = l;
              else
                return r[g];
              break;
            }
          }
        }
        return {
          getStyles: function(r) {
            var s = r && r.nodeType !== 9 ? r.ownerDocument : r, u = s && s.defaultView;
            return u && u.getComputedStyle(r, "");
          },
          getBounds: function(r, s) {
            var u = r.ownerDocument, l = u.body, f = u.documentElement, d;
            try {
              d = r.getBoundingClientRect();
            } catch {
              d = { left: 0, top: 0, width: 0, height: 0 };
            }
            var c = d.left - (f.clientLeft || l.clientLeft || 0), p = d.top - (f.clientTop || l.clientTop || 0);
            if (!s) {
              var g = u.defaultView;
              c += g.pageXOffset || f.scrollLeft || l.scrollLeft, p += g.pageYOffset || f.scrollTop || l.scrollTop;
            }
            return new ut(c, p, d.width, d.height);
          },
          getViewportBounds: function(r) {
            var s = r.ownerDocument, u = s.defaultView, l = s.documentElement;
            return new ut(
              0,
              0,
              u.innerWidth || l.clientWidth,
              u.innerHeight || l.clientHeight
            );
          },
          getOffset: function(r, s) {
            return we.getBounds(r, s).getPoint();
          },
          getSize: function(r) {
            return we.getBounds(r, !0).getSize();
          },
          isInvisible: function(r) {
            return we.getSize(r).equals(new it(0, 0));
          },
          isInView: function(r) {
            return !we.isInvisible(r) && we.getViewportBounds(r).intersects(
              we.getBounds(r, !0)
            );
          },
          isInserted: function(r) {
            return o.body.contains(r);
          },
          getPrefixed: function(r, s) {
            return r && i(r, s);
          },
          setPrefixed: function(r, s, u) {
            if (typeof s == "object")
              for (var l in s)
                i(r, l, !0, s[l]);
            else
              i(r, s, !0, u);
          }
        };
      }(), ye = {
        add: function(i, r) {
          if (i)
            for (var s in r)
              for (var u = r[s], l = s.split(/[\s,]+/g), f = 0, d = l.length; f < d; f++) {
                var c = l[f], p = i === o && (c === "touchstart" || c === "touchmove") ? { passive: !1 } : !1;
                i.addEventListener(c, u, p);
              }
        },
        remove: function(i, r) {
          if (i)
            for (var s in r)
              for (var u = r[s], l = s.split(/[\s,]+/g), f = 0, d = l.length; f < d; f++)
                i.removeEventListener(l[f], u, !1);
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
          return ye.getPoint(i).subtract(we.getOffset(
            r || ye.getTarget(i)
          ));
        }
      };
      ye.requestAnimationFrame = new function() {
        var i = we.getPrefixed(a, "requestAnimationFrame"), r = !1, s = [], u;
        function l() {
          var f = s;
          s = [];
          for (var d = 0, c = f.length; d < c; d++)
            f[d]();
          r = i && s.length, r && i(l);
        }
        return function(f) {
          s.push(f), i ? r || (i(l), r = !0) : u || (u = setInterval(l, 1e3 / 60));
        };
      }();
      var Se = h.extend(
        _,
        {
          _class: "View",
          initialize: function i(r, s) {
            function u(S) {
              return s[S] || parseInt(s.getAttribute(S), 10);
            }
            function l() {
              var S = we.getSize(s);
              return S.isNaN() || S.isZero() ? new it(u("width"), u("height")) : S;
            }
            var f;
            if (a && s) {
              this._id = s.getAttribute("id"), this._id == null && s.setAttribute("id", this._id = "paper-view-" + i._id++), ye.add(s, this._viewEvents);
              var d = "none";
              if (we.setPrefixed(s.style, {
                userDrag: d,
                userSelect: d,
                touchCallout: d,
                contentZooming: d,
                tapHighlightColor: "rgba(0,0,0,0)"
              }), v.hasAttribute(s, "resize")) {
                var c = this;
                ye.add(a, this._windowEvents = {
                  resize: function() {
                    c.setViewSize(l());
                  }
                });
              }
              if (f = l(), v.hasAttribute(s, "stats") && typeof Stats < "u") {
                this._stats = new Stats();
                var p = this._stats.domElement, g = p.style, b = we.getOffset(s);
                g.position = "absolute", g.left = b.x + "px", g.top = b.y + "px", o.body.appendChild(p);
              }
            } else
              f = new it(s), s = null;
            this._project = r, this._scope = r._scope, this._element = s, this._pixelRatio || (this._pixelRatio = a && a.devicePixelRatio || 1), this._setElementSize(f.width, f.height), this._viewSize = f, i._views.push(this), i._viewsById[this._id] = this, (this._matrix = new It())._owner = this, i._focused || (i._focused = this), this._frameItems = {}, this._frameItemCount = 0, this._itemEvents = { native: {}, virtual: {} }, this._autoUpdate = !pt.agent.node, this._needsUpdate = !1;
          },
          remove: function() {
            if (!this._project)
              return !1;
            Se._focused === this && (Se._focused = null), Se._views.splice(Se._views.indexOf(this), 1), delete Se._viewsById[this._id];
            var i = this._project;
            return i._view === this && (i._view = null), ye.remove(this._element, this._viewEvents), ye.remove(a, this._windowEvents), this._element = this._project = null, this.off("frame"), this._animate = !1, this._frameItems = {}, !0;
          },
          _events: h.each(
            kt._itemHandlers.concat(["onResize", "onKeyDown", "onKeyUp"]),
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
              ye.requestAnimationFrame(function() {
                if (i._requested = !1, i._animate) {
                  i.requestUpdate();
                  var r = i._element;
                  (!we.getPrefixed(o, "hidden") || v.getAttribute(r, "keepalive") === "true") && we.isInView(r) && i._handleFrame();
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
            pt = this._scope;
            var i = Date.now() / 1e3, r = this._last ? i - this._last : 0;
            this._last = i, this.emit("frame", new h({
              delta: r,
              time: this._time += r,
              count: this._count++
            })), this._stats && this._stats.update();
          },
          _animateItem: function(i, r) {
            var s = this._frameItems;
            r ? (s[i._id] = {
              item: i,
              time: 0,
              count: 0
            }, ++this._frameItemCount === 1 && this.on("frame", this._handleFrameItems)) : (delete s[i._id], --this._frameItemCount === 0 && this.off("frame", this._handleFrameItems));
          },
          _handleFrameItems: function(i) {
            for (var r in this._frameItems) {
              var s = this._frameItems[r];
              s.item.emit("frame", new h(i, {
                time: s.time += i.delta,
                count: s.count++
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
            return new Tt(i.width, i.height, this, "setViewSize");
          },
          setViewSize: function() {
            var i = it.read(arguments), r = i.subtract(this._viewSize);
            r.isZero() || (this._setElementSize(i.width, i.height), this._viewSize.set(i), this._changed(), this.emit("resize", { size: i, delta: r }), this._autoUpdate && this.update());
          },
          _setElementSize: function(i, r) {
            var s = this._element;
            s && (s.width !== i && (s.width = i), s.height !== r && (s.height = r));
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
            return we.isInView(this._element);
          },
          isInserted: function() {
            return we.isInserted(this._element);
          },
          getPixelSize: function(i) {
            var r = this._element, s;
            if (r) {
              var u = r.parentNode, l = o.createElement("div");
              l.style.fontSize = i, u.appendChild(l), s = parseFloat(we.getStyles(l).fontSize), u.removeChild(l);
            } else
              s = parseFloat(s);
            return s;
          },
          getTextWidth: function(i, r) {
            return 0;
          }
        },
        h.each(["rotate", "scale", "shear", "skew"], function(i) {
          var r = i === "rotate";
          this[i] = function() {
            var s = arguments, u = (r ? h : F).read(s), l = F.read(s, 0, { readNull: !0 });
            return this.transform(new It()[i](
              u,
              l || this.getCenter(!0)
            ));
          };
        }, {
          _decompose: function() {
            return this._decomposed || (this._decomposed = this._matrix.decompose());
          },
          translate: function() {
            var i = new It();
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
            this.transform(new It().scale(
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
            return new yt(i.x, i.y, this, "setScaling");
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
            return this.viewToProject(ye.getOffset(i, this._element));
          }
        },
        {
          statics: {
            _views: [],
            _viewsById: {},
            _id: 0,
            create: function(i, r) {
              o && typeof r == "string" && (r = o.getElementById(r));
              var s = a ? W : Se;
              return new s(i, r);
            }
          }
        },
        new function() {
          if (!a)
            return;
          var i, r, s = !1, u = !1;
          function l(D) {
            var j = ye.getTarget(D);
            return j.getAttribute && Se._viewsById[j.getAttribute("id")];
          }
          function f() {
            var D = Se._focused;
            if (!D || !D.isVisible()) {
              for (var j = 0, G = Se._views.length; j < G; j++)
                if ((D = Se._views[j]).isVisible()) {
                  Se._focused = r = D;
                  break;
                }
            }
          }
          function d(D, j, G) {
            D._handleMouseEvent("mousemove", j, G);
          }
          var c = a.navigator, p, g, b;
          c.pointerEnabled || c.msPointerEnabled ? (p = "pointerdown MSPointerDown", g = "pointermove MSPointerMove", b = "pointerup pointercancel MSPointerUp MSPointerCancel") : (p = "touchstart", g = "touchmove", b = "touchend touchcancel", "ontouchstart" in a && c.userAgent.match(
            /mobile|tablet|ip(ad|hone|od)|android|silk/i
          ) || (p += " mousedown", g += " mousemove", b += " mouseup"));
          var S = {}, x = {
            mouseout: function(D) {
              var j = Se._focused, G = ye.getRelatedTarget(D);
              if (j && (!G || G.nodeName === "HTML")) {
                var Y = ye.getOffset(D, j._element), $ = Y.x, X = Math.abs, at = X($), ct = 1 << 25, gt = at - ct;
                Y.x = X(gt) < at ? gt * ($ < 0 ? -1 : 1) : $, d(j, D, j.viewToProject(Y));
              }
            },
            scroll: f
          };
          S[p] = function(D) {
            var j = Se._focused = l(D);
            s || (s = !0, j._handleMouseEvent("mousedown", D));
          }, x[g] = function(D) {
            var j = Se._focused;
            if (!u) {
              var G = l(D);
              G ? j !== G && (j && d(j, D), i || (i = j), j = Se._focused = r = G) : r && r === j && (i && !i.isInserted() && (i = null), j = Se._focused = i, i = null, f());
            }
            j && d(j, D);
          }, x[p] = function() {
            u = !0;
          }, x[b] = function(D) {
            var j = Se._focused;
            j && s && j._handleMouseEvent("mouseup", D), u = s = !1;
          }, ye.add(o, x), ye.add(a, {
            load: f
          });
          var y = !1, E = !1, C = {
            doubleclick: "click",
            mousedrag: "mousemove"
          }, O = !1, w, A, m, I, T, M, P, N;
          function V(D, j, G, Y, $, X, at) {
            var ct = !1, gt;
            function wt(J, nt) {
              if (J.responds(nt)) {
                if (gt || (gt = new ot(
                  nt,
                  Y,
                  $,
                  j || J,
                  X ? $.subtract(X) : null
                )), J.emit(nt, gt) && (y = !0, gt.prevented && (E = !0), gt.stopped))
                  return ct = !0;
              } else {
                var mt = C[nt];
                if (mt)
                  return wt(J, mt);
              }
            }
            for (; D && D !== at && !wt(D, G); )
              D = D._parent;
            return ct;
          }
          function B(D, j, G, Y, $, X) {
            return D._project.removeOn(G), E = y = !1, T && V(
              T,
              null,
              G,
              Y,
              $,
              X
            ) || j && j !== T && !j.isDescendant(T) && V(j, null, G === "mousedrag" ? "mousemove" : G, Y, $, X, T) || V(
              D,
              T || j || D,
              G,
              Y,
              $,
              X
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
              var Y = this._itemEvents, $ = Y.native[D], X = D === "mousemove", at = this._scope.tool, ct = this;
              function gt(Ft) {
                return Y.virtual[Ft] || ct.responds(Ft) || at && at.responds(Ft);
              }
              X && s && gt("mousedrag") && (D = "mousedrag"), G || (G = this.getEventPoint(j));
              var wt = this.getBounds().contains(G), J = $ && wt && ct._project.hitTest(G, {
                tolerance: 0,
                fill: !0,
                stroke: !0
              }), nt = J && J.item || null, mt = !1, Ct = {};
              if (Ct[D.substr(5)] = !0, $ && nt !== I && (I && V(I, null, "mouseleave", j, G), nt && V(nt, null, "mouseenter", j, G), I = nt), O ^ wt && (V(
                this,
                null,
                wt ? "mouseenter" : "mouseleave",
                j,
                G
              ), mt = !0), (wt || Ct.drag) && !G.equals(A) && (B(
                this,
                nt,
                X ? D : "mousemove",
                j,
                G,
                A
              ), mt = !0), O = wt, Ct.down && wt || Ct.up && w) {
                if (B(this, nt, D, j, G, w), Ct.down) {
                  if (N = nt === M && Date.now() - P < 300, m = M = nt, !E && nt) {
                    for (var St = nt; St && !St.responds("mousedrag"); )
                      St = St._parent;
                    St && (T = nt);
                  }
                  w = G;
                } else Ct.up && (!E && nt === m && (P = Date.now(), B(this, nt, N ? "doubleclick" : "click", j, G, w), N = !1), m = T = null);
                O = !1, mt = !0;
              }
              A = G, mt && at && (y = at._handleMouseEvent(D, j, G, Ct) || y), j.cancelable !== !1 && (y && !Ct.move || Ct.down && gt("mouseup")) && j.preventDefault();
            },
            _handleKeyEvent: function(D, j, G, Y) {
              var $ = this._scope, X = $.tool, at;
              function ct(gt) {
                gt.responds(D) && (pt = $, gt.emit(D, at = at || new tt(D, j, G, Y)));
              }
              this.isVisible() && (ct(this), X && X.responds(D) && ct(X));
            },
            _countItemEvent: function(D, j) {
              var G = this._itemEvents, Y = G.native, $ = G.virtual;
              for (var X in H)
                Y[X] = (Y[X] || 0) + (H[X][D] || 0) * j;
              $[D] = ($[D] || 0) + j;
            },
            statics: {
              updateFocus: f,
              _resetState: function() {
                s = u = y = O = !1, i = r = w = A = m = I = T = M = P = N = null;
              }
            }
          };
        }()
      ), W = Se.extend({
        _class: "CanvasView",
        initialize: function(r, s) {
          if (!(s instanceof a.HTMLCanvasElement)) {
            var u = it.read(arguments, 1);
            if (u.isZero())
              throw new Error(
                "Cannot create CanvasView with the provided argument: " + h.slice(arguments, 1)
              );
            s = st.getCanvas(u);
          }
          var l = this._context = s.getContext("2d");
          if (l.save(), this._pixelRatio = 1, !/^off|false$/.test(v.getAttribute(s, "hidpi"))) {
            var f = a.devicePixelRatio || 1, d = we.getPrefixed(
              l,
              "backingStorePixelRatio"
            ) || 1;
            this._pixelRatio = f / d;
          }
          Se.call(this, r, s), this._needsUpdate = !0;
        },
        remove: function i() {
          return this._context.restore(), i.base.call(this);
        },
        _setElementSize: function i(r, s) {
          var u = this._pixelRatio;
          if (i.base.call(this, r * u, s * u), u !== 1) {
            var l = this._element, f = this._context;
            if (!v.hasAttribute(l, "resize")) {
              var d = l.style;
              d.width = r + "px", d.height = s + "px";
            }
            f.restore(), f.save(), f.scale(u, u);
          }
        },
        getContext: function() {
          return this._context;
        },
        getPixelSize: function i(r) {
          var s = pt.agent, u;
          if (s && s.firefox)
            u = i.base.call(this, r);
          else {
            var l = this._context, f = l.font;
            l.font = r + " serif", u = parseFloat(l.font), l.font = f;
          }
          return u;
        },
        getTextWidth: function(i, r) {
          var s = this._context, u = s.font, l = 0;
          s.font = i;
          for (var f = 0, d = r.length; f < d; f++)
            l = Math.max(l, s.measureText(r[f]).width);
          return s.font = u, l;
        },
        update: function() {
          if (!this._needsUpdate)
            return !1;
          var i = this._project, r = this._context, s = this._viewSize;
          return r.clearRect(0, 0, s.width + 1, s.height + 1), i && i.draw(r, this._matrix, this._pixelRatio), this._needsUpdate = !1, !0;
        }
      }), K = h.extend({
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
          return ft.modifiers;
        }
      }), tt = K.extend({
        _class: "KeyEvent",
        initialize: function(r, s, u, l) {
          this.type = r, this.event = s, this.key = u, this.character = l;
        },
        toString: function() {
          return "{ type: '" + this.type + "', key: '" + this.key + "', character: '" + this.character + "', modifiers: " + this.getModifiers() + " }";
        }
      }), ft = new function() {
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
        }, s = {}, u = {}, l, f, d = new h({
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
              var g = pt && pt.agent;
              return g && g.mac ? this.meta : this.control;
            }
          }
        });
        function c(g) {
          var b = g.key || g.keyIdentifier;
          return b = /^U\+/.test(b) ? String.fromCharCode(parseInt(b.substr(2), 16)) : /^Arrow[A-Z]/.test(b) ? b.substr(5) : b === "Unidentified" || b === n ? String.fromCharCode(g.keyCode) : b, i[b] || (b.length > 1 ? h.hyphenate(b) : b.toLowerCase());
        }
        function p(g, b, S, x) {
          var y = Se._focused, E;
          if (s[b] = g, g ? u[b] = S : delete u[b], b.length > 1 && (E = h.camelize(b)) in d) {
            d[E] = g;
            var C = pt && pt.agent;
            if (E === "meta" && C && C.mac)
              if (g)
                l = {};
              else {
                for (var O in l)
                  O in u && p(!1, O, l[O], x);
                l = null;
              }
          } else g && l && (l[b] = S);
          y && y._handleKeyEvent(
            g ? "keydown" : "keyup",
            x,
            b,
            S
          );
        }
        return ye.add(o, {
          keydown: function(g) {
            var b = c(g), S = pt && pt.agent;
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
        }), ye.add(a, {
          blur: function(g) {
            for (var b in u)
              p(!1, b, u[b], g);
          }
        }), {
          modifiers: d,
          isDown: function(g) {
            return !!s[g];
          }
        };
      }(), ot = K.extend({
        _class: "MouseEvent",
        initialize: function(r, s, u, l, f) {
          this.type = r, this.event = s, this.point = u, this.target = l, this.delta = f;
        },
        toString: function() {
          return "{ type: '" + this.type + "', point: " + this.point + ", target: " + this.target + (this.delta ? ", delta: " + this.delta : "") + ", modifiers: " + this.getModifiers() + " }";
        }
      }), ht = K.extend({
        _class: "ToolEvent",
        _item: null,
        initialize: function(r, s, u) {
          this.tool = r, this.type = s, this.event = u;
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
              for (var r = i.item, s = r._parent; /^(Group|CompoundPath)$/.test(s._class); )
                r = s, s = s._parent;
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
      }), bt = k.extend({
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
        _handleMouseEvent: function(i, r, s, u) {
          pt = this._scope, u.drag && !this.responds(i) && (i = "mousemove");
          var l = u.move || u.drag, f = this.responds(i), d = this.minDistance, c = this.maxDistance, p = !1, g = this;
          function b(x, y) {
            var E = s, C = l ? g._point : g._downPoint || E;
            if (l) {
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
            f && (p = g.emit(i, new ht(g, i, r)) || p);
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
      }), vt = h.extend(_, {
        _class: "Tween",
        statics: {
          easings: new h({
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
        initialize: function i(r, s, u, l, f, d) {
          this.object = r;
          var c = typeof f, p = c === "function";
          this.type = p ? c : c === "string" ? f : "linear", this.easing = p ? f : i.easings[this.type], this.duration = l, this.running = !1, this._then = null, this._startTime = null;
          var g = s || u;
          this._keys = g ? Object.keys(g) : [], this._parsedKeys = this._parseKeys(this._keys), this._from = g && this._getState(s), this._to = g && this._getState(u), d !== !1 && this.start();
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
            for (var r = this.easing(i), s = this._keys, u = function(b) {
              return typeof b == "function" ? b(r, i) : b;
            }, l = 0, f = s && s.length; l < f; l++) {
              var d = s[l], c = u(this._from[d]), p = u(this._to[d]), g = c && p && c.__add && p.__add ? p.__subtract(c).__multiply(r).__add(c) : (p - c) * r + c;
              this._setProperty(this._parsedKeys[d], g);
            }
            this.responds("update") && this.emit("update", new h({
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
          var r = this._startTime, s = r ? (i - r) / this.duration : 0;
          r || (this._startTime = i), this.update(s);
        },
        _getState: function(i) {
          for (var r = this._keys, s = {}, u = 0, l = r.length; u < l; u++) {
            var f = r[u], d = this._parsedKeys[f], c = this._getProperty(d), p;
            if (i) {
              var g = this._resolveValue(c, i[f]);
              this._setProperty(d, g), p = this._getProperty(d), p = p && p.clone ? p.clone() : p, this._setProperty(d, c);
            } else
              p = c && c.clone ? c.clone() : c;
            s[f] = p;
          }
          return s;
        },
        _resolveValue: function(i, r) {
          if (r) {
            if (Array.isArray(r) && r.length === 2) {
              var s = r[0];
              return s && s.match && s.match(/^[+\-\*\/]=/) ? this._calculate(i, s[0], r[1]) : r;
            } else if (typeof r == "string") {
              var u = r.match(/^[+\-*/]=(.*)/);
              if (u) {
                var l = JSON.parse(u[1].replace(
                  /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
                  '"$2": '
                ));
                return this._calculate(i, r[0], l);
              }
            }
          }
          return r;
        },
        _calculate: function(i, r, s) {
          return pt.PaperScript.calculateBinary(i, r, s);
        },
        _parseKeys: function(i) {
          for (var r = {}, s = 0, u = i.length; s < u; s++) {
            var l = i[s], f = l.replace(/\.([^.]*)/g, "/$1").replace(/\[['"]?([^'"\]]*)['"]?\]/g, "/$1");
            r[l] = f.split("/");
          }
          return r;
        },
        _getProperty: function(i, r) {
          for (var s = this.object, u = 0, l = i.length - (r || 0); u < l && s; u++)
            s = s[i[u]];
          return s;
        },
        _setProperty: function(i, r) {
          var s = this._getProperty(i, 1);
          s && (s[i[i.length - 1]] = r);
        }
      }), _t = {
        request: function(i) {
          var r = new e.XMLHttpRequest();
          return r.open(
            (i.method || "get").toUpperCase(),
            i.url,
            h.pick(i.async, !0)
          ), i.mimeType && r.overrideMimeType(i.mimeType), r.onload = function() {
            var s = r.status;
            s === 0 || s === 200 ? i.onLoad && i.onLoad.call(r, r.responseText) : r.onerror();
          }, r.onerror = function() {
            var s = r.status, u = 'Could not load "' + i.url + '" (Status: ' + s + ")";
            if (i.onError)
              i.onError(u, s);
            else
              throw new Error(u);
          }, r.send(null);
        }
      }, st = h.exports.CanvasProvider = {
        canvases: [],
        getCanvas: function(i, r, s) {
          if (!a)
            return null;
          var u, l = !0;
          typeof i == "object" && (r = i.height, i = i.width), this.canvases.length ? u = this.canvases.pop() : (u = o.createElement("canvas"), l = !1);
          var f = u.getContext("2d", s || {});
          if (!f)
            throw new Error("Canvas " + u + " is unable to provide a 2D context.");
          return u.width === i && u.height === r ? l && f.clearRect(0, 0, i + 1, r + 1) : (u.width = i, u.height = r), f.save(), u;
        },
        getContext: function(i, r, s) {
          var u = this.getCanvas(i, r, s);
          return u ? u.getContext("2d", s || {}) : null;
        },
        release: function(i) {
          var r = i && i.canvas ? i.canvas : i;
          r && r.getContext && (r.getContext("2d").restore(), this.canvases.push(r));
        }
      }, Mt = new function() {
        var i = Math.min, r = Math.max, s = Math.abs, u, l, f, d, c, p, g, b, S, x, y;
        function E(T, M, P) {
          return 0.2989 * T + 0.587 * M + 0.114 * P;
        }
        function C(T, M, P, B) {
          var V = B - E(T, M, P);
          S = T + V, x = M + V, y = P + V;
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
        function O(T, M, P) {
          return r(T, M, P) - i(T, M, P);
        }
        function w(T, M, P, N) {
          var V = [T, M, P], B = r(T, M, P), H = i(T, M, P), D;
          H = H === T ? 0 : H === M ? 1 : 2, B = B === T ? 0 : B === M ? 1 : 2, D = i(H, B) === 0 ? r(H, B) === 1 ? 2 : 1 : 0, V[B] > V[H] ? (V[D] = (V[D] - V[H]) * N / (V[B] - V[H]), V[B] = N) : V[D] = V[B] = 0, V[H] = 0, S = V[0], x = V[1], y = V[2];
        }
        var A = {
          multiply: function() {
            S = c * u / 255, x = p * l / 255, y = g * f / 255;
          },
          screen: function() {
            S = c + u - c * u / 255, x = p + l - p * l / 255, y = g + f - g * f / 255;
          },
          overlay: function() {
            S = c < 128 ? 2 * c * u / 255 : 255 - 2 * (255 - c) * (255 - u) / 255, x = p < 128 ? 2 * p * l / 255 : 255 - 2 * (255 - p) * (255 - l) / 255, y = g < 128 ? 2 * g * f / 255 : 255 - 2 * (255 - g) * (255 - f) / 255;
          },
          "soft-light": function() {
            var T = u * c / 255;
            S = T + c * (255 - (255 - c) * (255 - u) / 255 - T) / 255, T = l * p / 255, x = T + p * (255 - (255 - p) * (255 - l) / 255 - T) / 255, T = f * g / 255, y = T + g * (255 - (255 - g) * (255 - f) / 255 - T) / 255;
          },
          "hard-light": function() {
            S = u < 128 ? 2 * u * c / 255 : 255 - 2 * (255 - u) * (255 - c) / 255, x = l < 128 ? 2 * l * p / 255 : 255 - 2 * (255 - l) * (255 - p) / 255, y = f < 128 ? 2 * f * g / 255 : 255 - 2 * (255 - f) * (255 - g) / 255;
          },
          "color-dodge": function() {
            S = c === 0 ? 0 : u === 255 ? 255 : i(255, 255 * c / (255 - u)), x = p === 0 ? 0 : l === 255 ? 255 : i(255, 255 * p / (255 - l)), y = g === 0 ? 0 : f === 255 ? 255 : i(255, 255 * g / (255 - f));
          },
          "color-burn": function() {
            S = c === 255 ? 255 : u === 0 ? 0 : r(0, 255 - (255 - c) * 255 / u), x = p === 255 ? 255 : l === 0 ? 0 : r(0, 255 - (255 - p) * 255 / l), y = g === 255 ? 255 : f === 0 ? 0 : r(0, 255 - (255 - g) * 255 / f);
          },
          darken: function() {
            S = c < u ? c : u, x = p < l ? p : l, y = g < f ? g : f;
          },
          lighten: function() {
            S = c > u ? c : u, x = p > l ? p : l, y = g > f ? g : f;
          },
          difference: function() {
            S = c - u, S < 0 && (S = -S), x = p - l, x < 0 && (x = -x), y = g - f, y < 0 && (y = -y);
          },
          exclusion: function() {
            S = c + u * (255 - c - c) / 255, x = p + l * (255 - p - p) / 255, y = g + f * (255 - g - g) / 255;
          },
          hue: function() {
            w(u, l, f, O(c, p, g)), C(S, x, y, E(c, p, g));
          },
          saturation: function() {
            w(c, p, g, O(u, l, f)), C(S, x, y, E(c, p, g));
          },
          luminosity: function() {
            C(c, p, g, E(u, l, f));
          },
          color: function() {
            C(u, l, f, E(c, p, g));
          },
          add: function() {
            S = i(c + u, 255), x = i(p + l, 255), y = i(g + f, 255);
          },
          subtract: function() {
            S = r(c - u, 0), x = r(p - l, 0), y = r(g - f, 0);
          },
          average: function() {
            S = (c + u) / 2, x = (p + l) / 2, y = (g + f) / 2;
          },
          negation: function() {
            S = 255 - s(255 - u - c), x = 255 - s(255 - l - p), y = 255 - s(255 - f - g);
          }
        }, m = this.nativeModes = h.each([
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
        I && (h.each(A, function(T, M) {
          var P = M === "darken", N = !1;
          I.save();
          try {
            I.fillStyle = P ? "#300" : "#a00", I.fillRect(0, 0, 1, 1), I.globalCompositeOperation = M, I.globalCompositeOperation === M && (I.fillStyle = P ? "#a00" : "#300", I.fillRect(0, 0, 1, 1), N = I.getImageData(0, 0, 1, 1).data[0] !== P ? 170 : 51);
          } catch {
          }
          I.restore(), m[M] = N;
        }), st.release(I)), this.process = function(T, M, P, N, V) {
          var B = M.canvas, H = T === "normal";
          if (H || m[T])
            P.save(), P.setTransform(1, 0, 0, 1, 0, 0), P.globalAlpha = N, H || (P.globalCompositeOperation = T), P.drawImage(B, V.x, V.y), P.restore();
          else {
            var D = A[T];
            if (!D)
              return;
            for (var j = P.getImageData(
              V.x,
              V.y,
              B.width,
              B.height
            ), G = j.data, Y = M.getImageData(
              0,
              0,
              B.width,
              B.height
            ).data, $ = 0, X = G.length; $ < X; $ += 4) {
              u = Y[$], c = G[$], l = Y[$ + 1], p = G[$ + 1], f = Y[$ + 2], g = G[$ + 2], d = Y[$ + 3], b = G[$ + 3], D();
              var at = d * N / 255, ct = 1 - at;
              G[$] = at * S + ct * c, G[$ + 1] = at * x + ct * p, G[$ + 2] = at * y + ct * g, G[$ + 3] = d * N + ct * b;
            }
            P.putImageData(j, V.x, V.y);
          }
        };
      }(), dt = new function() {
        var i = "http://www.w3.org/2000/svg", r = "http://www.w3.org/2000/xmlns", s = "http://www.w3.org/1999/xlink", u = {
          href: s,
          xlink: r,
          xmlns: r + "/",
          "xmlns:xlink": r + "/"
        };
        function l(c, p, g) {
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
          xlink: s,
          create: l,
          get: f,
          set: d
        };
      }(), Et = h.each({
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
          return !r && (i instanceof oe || i instanceof ve || i instanceof Tn);
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
        var s = h.capitalize(r), u = i[2];
        this[r] = {
          type: i[1],
          property: r,
          attribute: i[0],
          toSVG: u,
          fromSVG: u && h.each(u, function(l, f) {
            this[l] = f;
          }, {}),
          exportFilter: i[3],
          get: "get" + s,
          set: "set" + s
        };
      }, {});
      new function() {
        var i;
        function r(A, m, I) {
          var T = new h(), M = A.getTranslation();
          if (m) {
            var P;
            A.isInvertible() ? (A = A._shiftless(), P = A._inverseTransform(M), M = null) : P = new F(), T[I ? "cx" : "x"] = P.x, T[I ? "cy" : "y"] = P.y;
          }
          if (!A.isIdentity()) {
            var N = A.decompose();
            if (N) {
              var V = [], B = N.rotation, H = N.scaling, D = N.skewing;
              M && !M.isZero() && V.push("translate(" + i.point(M) + ")"), B && V.push("rotate(" + i.number(B) + ")"), (!U.isZero(H.x - 1) || !U.isZero(H.y - 1)) && V.push("scale(" + i.point(H) + ")"), D.x && V.push("skewX(" + i.number(D.x) + ")"), D.y && V.push("skewY(" + i.number(D.y) + ")"), T.transform = V.join(" ");
            } else
              T.transform = "matrix(" + A.getValues().join(",") + ")";
          }
          return T;
        }
        function s(A, m) {
          for (var I = r(A._matrix), T = A._children, M = dt.create("g", I, i), P = 0, N = T.length; P < N; P++) {
            var V = T[P], B = O(V, m);
            if (B)
              if (V.isClipMask()) {
                var H = dt.create("clipPath");
                H.appendChild(B), E(V, H, "clip"), dt.set(M, {
                  "clip-path": "url(#" + H.id + ")"
                });
              } else
                M.appendChild(B);
          }
          return M;
        }
        function u(A, m) {
          var I = r(A._matrix, !0), T = A.getSize(), M = A.getImage();
          return I.x -= T.width / 2, I.y -= T.height / 2, I.width = T.width, I.height = T.height, I.href = m.embedImages == !1 && M && M.src || A.toDataURL(), dt.create("image", I, i);
        }
        function l(A, m) {
          var I = m.matchShapes;
          if (I) {
            var T = A.toShape(!1);
            if (T)
              return f(T);
          }
          var M = A._segments, P = M.length, N, V = r(A._matrix);
          if (I && P >= 2 && !A.hasHandles())
            if (P > 2) {
              N = A._closed ? "polygon" : "polyline";
              for (var B = [], H = 0; H < P; H++)
                B.push(i.point(M[H]._point));
              V.points = B.join(" ");
            } else {
              N = "line";
              var D = M[0]._point, j = M[1]._point;
              V.set({
                x1: D.x,
                y1: D.y,
                x2: j.x,
                y2: j.y
              });
            }
          else
            N = "path", V.d = A.getPathData(null, m.precision);
          return dt.create(N, V, i);
        }
        function f(A) {
          var m = A._type, I = A._radius, T = r(A._matrix, !0, m !== "rectangle");
          if (m === "rectangle") {
            m = "rect";
            var M = A._size, P = M.width, N = M.height;
            T.x -= P / 2, T.y -= N / 2, T.width = P, T.height = N, I.isZero() && (I = null);
          }
          return I && (m === "circle" ? T.r = I : (T.rx = I.width, T.ry = I.height)), dt.create(m, T, i);
        }
        function d(A, m) {
          var I = r(A._matrix), T = A.getPathData(null, m.precision);
          return T && (I.d = T), dt.create("path", I, i);
        }
        function c(A, m) {
          var I = r(A._matrix, !0), T = A._definition, M = y(T, "symbol"), P = T._item, N = P.getStrokeBounds();
          return M || (M = dt.create("symbol", {
            viewBox: i.rectangle(N)
          }), M.appendChild(O(P, m)), E(T, M, "symbol")), I.href = "#" + M.id, I.x += N.x, I.y += N.y, I.width = N.width, I.height = N.height, I.overflow = "visible", dt.create("use", I, i);
        }
        function p(A) {
          var m = y(A, "color");
          if (!m) {
            var I = A.getGradient(), T = I._radial, M = A.getOrigin(), P = A.getDestination(), N;
            if (T) {
              N = {
                cx: M.x,
                cy: M.y,
                r: M.getDistance(P)
              };
              var V = A.getHighlight();
              V && (N.fx = V.x, N.fy = V.y);
            } else
              N = {
                x1: M.x,
                y1: M.y,
                x2: P.x,
                y2: P.y
              };
            N.gradientUnits = "userSpaceOnUse", m = dt.create((T ? "radial" : "linear") + "Gradient", N, i);
            for (var B = I._stops, H = 0, D = B.length; H < D; H++) {
              var j = B[H], G = j._color, Y = G.getAlpha(), $ = j._offset;
              N = {
                offset: $ ?? H / (D - 1)
              }, G && (N["stop-color"] = G.toCSS(!0)), Y < 1 && (N["stop-opacity"] = Y), m.appendChild(
                dt.create("stop", N, i)
              );
            }
            E(A, m, "color");
          }
          return "url(#" + m.id + ")";
        }
        function g(A) {
          var m = dt.create(
            "text",
            r(A._matrix, !0),
            i
          );
          return m.textContent = A._content, m;
        }
        var b = {
          Group: s,
          Layer: s,
          Raster: u,
          Path: l,
          Shape: f,
          CompoundPath: d,
          SymbolItem: c,
          PointText: g
        };
        function S(A, m, I) {
          var T = {}, M = !I && A.getParent(), P = [];
          return A._name != null && (T.id = A._name), h.each(Et, function(N) {
            var V = N.get, B = N.type, H = A[V]();
            if (N.exportFilter ? N.exportFilter(A, H) : !M || !h.equals(M[V](), H)) {
              if (B === "color" && H != null) {
                var D = H.getAlpha();
                D < 1 && (T[N.attribute + "-opacity"] = D);
              }
              B === "style" ? P.push(N.attribute + ": " + H) : T[N.attribute] = H == null ? "none" : B === "color" ? H.gradient ? p(H) : H.toCSS(!0) : B === "array" ? H.join(",") : B === "lookup" ? N.toSVG[H] : H;
            }
          }), P.length && (T.style = P.join(";")), T.opacity === 1 && delete T.opacity, A._visible || (T.visibility = "hidden"), dt.set(m, T, i);
        }
        var x;
        function y(A, m) {
          return x || (x = { ids: {}, svgs: {} }), A && x.svgs[m + "-" + (A._id || A.__id || (A.__id = et.get("svg")))];
        }
        function E(A, m, I) {
          x || y();
          var T = x.ids[I] = (x.ids[I] || 0) + 1;
          m.id = I + "-" + T, x.svgs[I + "-" + (A._id || A.__id)] = m;
        }
        function C(A, m) {
          var I = A, T = null;
          if (x) {
            I = A.nodeName.toLowerCase() === "svg" && A;
            for (var M in x.svgs)
              T || (I || (I = dt.create("svg"), I.appendChild(A)), T = I.insertBefore(
                dt.create("defs"),
                I.firstChild
              )), T.appendChild(x.svgs[M]);
            x = null;
          }
          return m.asString ? new e.XMLSerializer().serializeToString(I) : I;
        }
        function O(A, m, I) {
          var T = b[A._class], M = T && T(A, m);
          if (M) {
            var P = m.onExport;
            P && (M = P(A, M, m) || M);
            var N = JSON.stringify(A._data);
            N && N !== "{}" && N !== "null" && M.setAttribute("data-paper-data", N);
          }
          return M && S(A, M, I);
        }
        function w(A) {
          return A || (A = {}), i = new z(A.precision), A;
        }
        kt.inject({
          exportSVG: function(A) {
            return A = w(A), C(O(this, A, !0), A);
          }
        }), ie.inject({
          exportSVG: function(A) {
            A = w(A);
            var m = this._children, I = this.getView(), T = h.pick(A.bounds, "view"), M = A.matrix || T === "view" && I._matrix, P = M && It.read([M]), N = T === "view" ? new ut([0, 0], I.getViewSize()) : T === "content" ? kt._getBounds(m, P, { stroke: !0 }).rect : ut.read([T], 0, { readNull: !0 }), V = {
              version: "1.1",
              xmlns: dt.svg,
              "xmlns:xlink": dt.xlink
            };
            N && (V.width = N.width, V.height = N.height, (N.x || N.x === 0 || N.y || N.y === 0) && (V.viewBox = i.rectangle(N)));
            var B = dt.create("svg", V, i), H = B;
            P && !P.isIdentity() && (H = B.appendChild(dt.create(
              "g",
              r(P),
              i
            )));
            for (var D = 0, j = m.length; D < j; D++)
              H.appendChild(O(m[D], A, !0));
            return C(B, A);
          }
        });
      }(), new function() {
        var i = {}, r;
        function s(m, I, T, M, P, N) {
          var V = dt.get(m, I) || N, B = V == null ? M ? null : T ? "" : 0 : T ? V : parseFloat(V);
          return /%\s*$/.test(V) ? B / 100 * (P ? 1 : r[/x|^width/.test(I) ? "width" : "height"]) : B;
        }
        function u(m, I, T, M, P, N, V) {
          return I = s(m, I || "x", !1, M, P, N), T = s(m, T || "y", !1, M, P, V), M && (I == null || T == null) ? null : new F(I, T);
        }
        function l(m, I, T, M, P) {
          return I = s(m, I || "width", !1, M, P), T = s(m, T || "height", !1, M, P), M && (I == null || T == null) ? null : new it(I, T);
        }
        function f(m, I, T) {
          return m === "none" ? null : I === "number" ? parseFloat(m) : I === "array" ? m ? m.split(/[\s,]+/g).map(parseFloat) : [] : I === "color" ? O(m) || m : I === "lookup" ? T[m] : m;
        }
        function d(m, I, T, M) {
          var P = m.childNodes, N = I === "clippath", V = I === "defs", B = new At(), H = B._project, D = H._currentStyle, j = [];
          if (!N && !V && (B = C(B, m, M), H._currentStyle = B._style.clone()), M)
            for (var G = m.querySelectorAll("defs"), Y = 0, $ = G.length; Y < $; Y++)
              w(G[Y], T, !1);
          for (var Y = 0, $ = P.length; Y < $; Y++) {
            var X = P[Y], at;
            X.nodeType === 1 && !/^defs$/i.test(X.nodeName) && (at = w(X, T, !1)) && !(at instanceof Ne) && j.push(at);
          }
          return B.addChildren(j), N && (B = C(B.reduce(), m, M)), H._currentStyle = D, (N || V) && (B.remove(), B = null), B;
        }
        function c(m, I) {
          for (var T = m.getAttribute("points").match(
            /[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g
          ), M = [], P = 0, N = T.length; P < N; P += 2)
            M.push(new F(
              parseFloat(T[P]),
              parseFloat(T[P + 1])
            ));
          var V = new Yt(M);
          return I === "polygon" && V.closePath(), V;
        }
        function p(m) {
          return oe.create(m.getAttribute("d"));
        }
        function g(m, I) {
          var T = (s(m, "href", !0) || "").substring(1), M = I === "radialgradient", P;
          if (T)
            P = i[T].getGradient(), P._radial ^ M && (P = P.clone(), P._radial = M);
          else {
            for (var N = m.childNodes, V = [], B = 0, H = N.length; B < H; B++) {
              var D = N[B];
              D.nodeType === 1 && V.push(C(new hn(), D));
            }
            P = new Vi(V, M);
          }
          var j, G, Y, $ = s(m, "gradientUnits", !0) !== "userSpaceOnUse";
          M ? (j = u(
            m,
            "cx",
            "cy",
            !1,
            $,
            "50%",
            "50%"
          ), G = j.add(
            s(m, "r", !1, !1, $, "50%"),
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
          var X = C(
            new Pe(P, j, G, Y),
            m
          );
          return X._scaleToBounds = $, null;
        }
        var b = {
          "#document": function(m, I, T, M) {
            for (var P = m.childNodes, N = 0, V = P.length; N < V; N++) {
              var B = P[N];
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
            var I = new Ke(s(m, "href", !0));
            return I.on("load", function() {
              var T = l(m);
              this.setSize(T);
              var M = u(m).add(T.divide(2));
              this._matrix.append(new It().translate(M));
            }), I;
          },
          symbol: function(m, I, T, M) {
            return new Ne(
              d(m, I, T, M),
              !0
            );
          },
          defs: d,
          use: function(m) {
            var I = (s(m, "href", !0) || "").substring(1), T = i[I], M = u(m);
            return T ? T instanceof Ne ? T.place(M) : T.clone().translate(M) : null;
          },
          circle: function(m) {
            return new ve.Circle(
              u(m, "cx", "cy"),
              s(m, "r")
            );
          },
          ellipse: function(m) {
            return new ve.Ellipse({
              center: u(m, "cx", "cy"),
              radius: l(m, "rx", "ry")
            });
          },
          rect: function(m) {
            return new ve.Rectangle(new ut(
              u(m),
              l(m)
            ), l(m, "rx", "ry"));
          },
          line: function(m) {
            return new Yt.Line(
              u(m, "x1", "y1"),
              u(m, "x2", "y2")
            );
          },
          text: function(m) {
            var I = new da(u(m).add(
              u(m, "dx", "dy")
            ));
            return I.setContent(m.textContent.trim() || ""), I;
          },
          switch: d
        };
        function S(m, I, T, M) {
          if (m.transform) {
            for (var P = (M.getAttribute(T) || "").split(/\)\s*/g), N = new It(), V = 0, B = P.length; V < B; V++) {
              var H = P[V];
              if (!H)
                break;
              for (var D = H.split(/\(\s*/), j = D[0], G = D[1].split(/[\s,]+/g), Y = 0, $ = G.length; Y < $; Y++)
                G[Y] = parseFloat(G[Y]);
              switch (j) {
                case "matrix":
                  N.append(
                    new It(G[0], G[1], G[2], G[3], G[4], G[5])
                  );
                  break;
                case "rotate":
                  N.rotate(G[0], G[1] || 0, G[2] || 0);
                  break;
                case "translate":
                  N.translate(G[0], G[1] || 0);
                  break;
                case "scale":
                  N.scale(G);
                  break;
                case "skewX":
                  N.skew(G[0], 0);
                  break;
                case "skewY":
                  N.skew(0, G[0]);
                  break;
              }
            }
            m.transform(N);
          }
        }
        function x(m, I, T) {
          var M = T === "fill-opacity" ? "getFillColor" : "getStrokeColor", P = m[M] && m[M]();
          P && P.setAlpha(parseFloat(I));
        }
        var y = h.set(h.each(Et, function(m) {
          this[m.attribute] = function(I, T) {
            if (I[m.set] && (I[m.set](f(T, m.type, m.fromSVG)), m.type === "color")) {
              var M = I[m.get]();
              if (M && M._scaleToBounds) {
                var P = I.getBounds();
                M.transform(new It().translate(P.getPoint()).scale(P.getSize()));
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
          viewBox: function(m, I, T, M, P) {
            var N = new ut(f(I, "array")), V = l(M, null, null, !0), B, H;
            if (m instanceof At) {
              var D = V ? V.divide(N.getSize()) : 1, H = new It().scale(D).translate(N.getPoint().negate());
              B = m;
            } else m instanceof Ne && (V && N.setSize(V), B = m._item);
            if (B) {
              if (E(M, "overflow", P) !== "visible") {
                var j = new ve.Rectangle(N);
                j.setClipMask(!0), B.addChild(j);
              }
              H && B.transform(H);
            }
          }
        });
        function E(m, I, T) {
          var M = m.attributes[I], P = M && M.value;
          if (!P && m.style) {
            var N = h.camelize(I);
            P = m.style[N], !P && T.node[N] !== T.parent[N] && (P = T.node[N]);
          }
          return P ? P === "none" ? null : P : n;
        }
        function C(m, I, T) {
          var M = I.parentNode, P = {
            node: we.getStyles(I) || {},
            parent: !T && !/^defs$/i.test(M.tagName) && we.getStyles(M) || {}
          };
          return h.each(y, function(N, V) {
            var B = E(I, V, P);
            m = B !== n && N(m, B, V, I, P) || m;
          }), m;
        }
        function O(m) {
          var I = m && m.match(/\((?:["'#]*)([^"')]+)/), T = I && I[1], M = T && i[a ? T.replace(a.location.href.split("#")[0] + "#", "") : T];
          return M && M._scaleToBounds && (M = M.clone(), M._scaleToBounds = !0), M;
        }
        function w(m, I, T) {
          var M = m.nodeName.toLowerCase(), P = M !== "#document", N = o.body, V, B, H;
          T && P && (r = pt.getView().getSize(), r = l(m, null, null, !0) || r, V = dt.create("svg", {
            style: "stroke-width: 1px; stroke-miterlimit: 10"
          }), B = m.parentNode, H = m.nextSibling, V.appendChild(m), N.appendChild(V));
          var D = pt.settings, j = D.applyMatrix, G = D.insertItems;
          D.applyMatrix = !1, D.insertItems = !1;
          var Y = b[M], $ = Y && Y(m, M, I, T) || null;
          if (D.insertItems = G, D.applyMatrix = j, $) {
            P && !($ instanceof At) && ($ = C($, m, T));
            var X = I.onImport, at = P && m.getAttribute("data-paper-data");
            X && ($ = X(m, $, I) || $), I.expandShapes && $ instanceof ve && ($.remove(), $ = $.toPath()), at && ($._data = JSON.parse(at));
          }
          return V && (N.removeChild(V), B && (H ? B.insertBefore(m, H) : B.appendChild(m))), T && (i = {}, $ && h.pick(I.applyMatrix, j) && $.matrix.apply(!0, !0)), $;
        }
        function A(m, I, T) {
          if (!m)
            return null;
          I = typeof I == "function" ? { onLoad: I } : I || {};
          var M = pt, P = null;
          function N(D) {
            try {
              var j = typeof D == "object" ? D : new e.DOMParser().parseFromString(
                D.trim(),
                "image/svg+xml"
              );
              if (!j.nodeName)
                throw j = null, new Error("Unsupported SVG source: " + m);
              pt = M, P = w(j, I, !0), (!I || I.insert !== !1) && T._insertItem(n, P);
              var G = I.onLoad;
              G && G(P, D);
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
            B ? N(B) : _t.request({
              url: m,
              async: !0,
              onLoad: N,
              onError: V
            });
          } else if (typeof File < "u" && m instanceof File) {
            var H = new FileReader();
            return H.onload = function() {
              N(H.result);
            }, H.onerror = function() {
              V(H.error);
            }, H.readAsText(m);
          } else
            N(m);
          return P;
        }
        kt.inject({
          importSVG: function(m, I) {
            return A(m, I, this);
          }
        }), ie.inject({
          importSVG: function(m, I) {
            return this.activate(), A(m, I, this);
          }
        });
      }(), h.exports.PaperScript = (function() {
        var i = this, r = i.acorn;
        if (!r && typeof Jg < "u")
          try {
            r = E_;
          } catch {
          }
        if (!r) {
          var s, u;
          r = s = u = {}, function(C, O) {
            if (typeof s == "object" && typeof u == "object") return O(s);
            if (typeof n == "function" && n.amd) return n(["exports"], O);
            O(C.acorn || (C.acorn = {}));
          }(this, function(C) {
            C.version = "0.5.0";
            var O, w, A, m;
            C.parse = function(q, Z) {
              return w = String(q), A = w.length, T(Z), Pu(), dc(O.program);
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
            function T(q) {
              O = q || {};
              for (var Z in I) Object.prototype.hasOwnProperty.call(O, Z) || (O[Z] = I[Z]);
              m = O.sourceFile || null;
            }
            var M = C.getLineInfo = function(q, Z) {
              for (var Q = 1, rt = 0; ; ) {
                er.lastIndex = rt;
                var zt = er.exec(q);
                if (zt && zt.index < Z)
                  ++Q, rt = zt.index + zt[0].length;
                else break;
              }
              return { line: Q, column: Z - rt };
            };
            C.tokenize = function(q, Z) {
              w = String(q), A = w.length, T(Z), Pu();
              var Q = {};
              function rt(zt) {
                return at = V, Nn(zt), Q.start = N, Q.end = V, Q.startLoc = B, Q.endLoc = H, Q.type = D, Q.value = j, Q;
              }
              return rt.jumpTo = function(zt, Dt) {
                if (P = zt, O.locations) {
                  Y = 1, $ = er.lastIndex = 0;
                  for (var qt; (qt = er.exec(w)) && qt.index < zt; )
                    ++Y, $ = qt.index + qt[0].length;
                }
                G = Dt, ir();
              }, rt;
            };
            var P, N, V, B, H, D, j, G, Y, $, X, at, ct, gt, wt, J;
            function nt(q, Z) {
              var Q = M(w, q);
              Z += " (" + Q.line + ":" + Q.column + ")";
              var rt = new SyntaxError(Z);
              throw rt.pos = q, rt.loc = Q, rt.raisedAt = P, rt;
            }
            var mt = [], Ct = { type: "num" }, St = { type: "regexp" }, Ft = { type: "string" }, Lt = { type: "name" }, Bt = { type: "eof" }, Ht = { keyword: "break" }, Vt = { keyword: "case", beforeExpr: !0 }, Re = { keyword: "catch" }, Fe = { keyword: "continue" }, Be = { keyword: "debugger" }, Te = { keyword: "default" }, pe = { keyword: "do", isLoop: !0 }, Ee = { keyword: "else", beforeExpr: !0 }, ni = { keyword: "finally" }, ze = { keyword: "for", isLoop: !0 }, yi = { keyword: "function" }, fn = { keyword: "if" }, Pi = { keyword: "return", beforeExpr: !0 }, Ti = { keyword: "switch" }, ri = { keyword: "throw", beforeExpr: !0 }, ui = { keyword: "try" }, cn = { keyword: "var" }, Ei = { keyword: "while", isLoop: !0 }, ls = { keyword: "with" }, gu = { keyword: "new", beforeExpr: !0 }, _u = { keyword: "this" }, mu = { keyword: "null", atomValue: null }, vu = { keyword: "true", atomValue: !0 }, yu = { keyword: "false", atomValue: !1 }, hs = { keyword: "in", binop: 7, beforeExpr: !0 }, pa = {
              break: Ht,
              case: Vt,
              catch: Re,
              continue: Fe,
              debugger: Be,
              default: Te,
              do: pe,
              else: Ee,
              finally: ni,
              for: ze,
              function: yi,
              if: fn,
              return: Pi,
              switch: Ti,
              throw: ri,
              try: ui,
              var: cn,
              while: Ei,
              with: ls,
              null: mu,
              true: vu,
              false: yu,
              new: gu,
              in: hs,
              instanceof: { keyword: "instanceof", binop: 7, beforeExpr: !0 },
              this: _u,
              typeof: { keyword: "typeof", prefix: !0, beforeExpr: !0 },
              void: { keyword: "void", prefix: !0, beforeExpr: !0 },
              delete: { keyword: "delete", prefix: !0, beforeExpr: !0 }
            }, fs = { type: "[", beforeExpr: !0 }, cs = { type: "]" }, Jn = { type: "{", beforeExpr: !0 }, On = { type: "}" }, Bi = { type: "(", beforeExpr: !0 }, Oi = { type: ")" }, Yi = { type: ",", beforeExpr: !0 }, qi = { type: ";", beforeExpr: !0 }, tr = { type: ":", beforeExpr: !0 }, ga = { type: "." }, _a = { type: "?", beforeExpr: !0 }, ma = { binop: 10, beforeExpr: !0 }, va = { isAssign: !0, beforeExpr: !0 }, Mn = { isAssign: !0, beforeExpr: !0 }, Bf = { postfix: !0, prefix: !0, isUpdate: !0 }, bu = { prefix: !0, beforeExpr: !0 }, xu = { binop: 1, beforeExpr: !0 }, wu = { binop: 2, beforeExpr: !0 }, qf = { binop: 3, beforeExpr: !0 }, Uf = { binop: 4, beforeExpr: !0 }, jf = { binop: 5, beforeExpr: !0 }, Hf = { binop: 6, beforeExpr: !0 }, Wf = { binop: 7, beforeExpr: !0 }, Gf = { binop: 8, beforeExpr: !0 }, Zf = { binop: 9, prefix: !0, beforeExpr: !0 }, Kf = { binop: 10, beforeExpr: !0 };
            C.tokTypes = {
              bracketL: fs,
              bracketR: cs,
              braceL: Jn,
              braceR: On,
              parenL: Bi,
              parenR: Oi,
              comma: Yi,
              semi: qi,
              colon: tr,
              dot: ga,
              question: _a,
              slash: ma,
              eq: va,
              name: Lt,
              eof: Bt,
              num: Ct,
              regexp: St,
              string: Ft
            };
            for (var Su in pa) C.tokTypes["_" + Su] = pa[Su];
            function kr(q) {
              q = q.split(" ");
              var Z = "", Q = [];
              t: for (var rt = 0; rt < q.length; ++rt) {
                for (var zt = 0; zt < Q.length; ++zt)
                  if (Q[zt][0].length == q[rt].length) {
                    Q[zt].push(q[rt]);
                    continue t;
                  }
                Q.push([q[rt]]);
              }
              function Dt(fe) {
                if (fe.length == 1) return Z += "return str === " + JSON.stringify(fe[0]) + ";";
                Z += "switch(str){";
                for (var Li = 0; Li < fe.length; ++Li) Z += "case " + JSON.stringify(fe[Li]) + ":";
                Z += "return true}return false;";
              }
              if (Q.length > 3) {
                Q.sort(function(fe, Li) {
                  return Li.length - fe.length;
                }), Z += "switch(str.length){";
                for (var rt = 0; rt < Q.length; ++rt) {
                  var qt = Q[rt];
                  Z += "case " + qt[0].length + ":", Dt(qt);
                }
                Z += "}";
              } else
                Dt(q);
              return new Function("str", Z);
            }
            var Yf = kr("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"), $f = kr("class enum extends super const export import"), Cu = kr("implements interface let package private protected public static yield"), ds = kr("eval arguments"), Xf = kr("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"), Qf = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Iu = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Jf = "̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿", ku = new RegExp("[" + Iu + "]"), tc = new RegExp("[" + Iu + Jf + "]"), ps = /[\n\r\u2028\u2029]/, er = /\r\n|[\n\r\u2028\u2029]/g, gs = C.isIdentifierStart = function(q) {
              return q < 65 ? q === 36 : q < 91 ? !0 : q < 97 ? q === 95 : q < 123 ? !0 : q >= 170 && ku.test(String.fromCharCode(q));
            }, Au = C.isIdentifierChar = function(q) {
              return q < 48 ? q === 36 : q < 58 ? !0 : q < 65 ? !1 : q < 91 ? !0 : q < 97 ? q === 95 : q < 123 ? !0 : q >= 170 && tc.test(String.fromCharCode(q));
            };
            function Ln() {
              this.line = Y, this.column = P - $;
            }
            function Pu() {
              Y = 1, P = $ = 0, G = !0, ir();
            }
            function De(q, Z) {
              V = P, O.locations && (H = new Ln()), D = q, ir(), j = Z, G = q.beforeExpr;
            }
            function ec() {
              var q = O.onComment && O.locations && new Ln(), Z = P, Q = w.indexOf("*/", P += 2);
              if (Q === -1 && nt(P - 2, "Unterminated comment"), P = Q + 2, O.locations) {
                er.lastIndex = Z;
                for (var rt; (rt = er.exec(w)) && rt.index < P; )
                  ++Y, $ = rt.index + rt[0].length;
              }
              O.onComment && O.onComment(
                !0,
                w.slice(Z + 2, Q),
                Z,
                P,
                q,
                O.locations && new Ln()
              );
            }
            function ya() {
              for (var q = P, Z = O.onComment && O.locations && new Ln(), Q = w.charCodeAt(P += 2); P < A && Q !== 10 && Q !== 13 && Q !== 8232 && Q !== 8233; )
                ++P, Q = w.charCodeAt(P);
              O.onComment && O.onComment(
                !1,
                w.slice(q + 2, P),
                q,
                P,
                Z,
                O.locations && new Ln()
              );
            }
            function ir() {
              for (; P < A; ) {
                var q = w.charCodeAt(P);
                if (q === 32)
                  ++P;
                else if (q === 13) {
                  ++P;
                  var Z = w.charCodeAt(P);
                  Z === 10 && ++P, O.locations && (++Y, $ = P);
                } else if (q === 10 || q === 8232 || q === 8233)
                  ++P, O.locations && (++Y, $ = P);
                else if (q > 8 && q < 14)
                  ++P;
                else if (q === 47) {
                  var Z = w.charCodeAt(P + 1);
                  if (Z === 42)
                    ec();
                  else if (Z === 47)
                    ya();
                  else break;
                } else if (q === 160)
                  ++P;
                else if (q >= 5760 && Qf.test(String.fromCharCode(q)))
                  ++P;
                else
                  break;
              }
            }
            function ic() {
              var q = w.charCodeAt(P + 1);
              return q >= 48 && q <= 57 ? Eu(!0) : (++P, De(ga));
            }
            function nc() {
              var q = w.charCodeAt(P + 1);
              return G ? (++P, Tu()) : q === 61 ? Ve(Mn, 2) : Ve(ma, 1);
            }
            function rc() {
              var q = w.charCodeAt(P + 1);
              return q === 61 ? Ve(Mn, 2) : Ve(Kf, 1);
            }
            function sc(q) {
              var Z = w.charCodeAt(P + 1);
              return Z === q ? Ve(q === 124 ? xu : wu, 2) : Z === 61 ? Ve(Mn, 2) : Ve(q === 124 ? qf : jf, 1);
            }
            function ac() {
              var q = w.charCodeAt(P + 1);
              return q === 61 ? Ve(Mn, 2) : Ve(Uf, 1);
            }
            function oc(q) {
              var Z = w.charCodeAt(P + 1);
              return Z === q ? Z == 45 && w.charCodeAt(P + 2) == 62 && ps.test(w.slice(at, P)) ? (P += 3, ya(), ir(), Nn()) : Ve(Bf, 2) : Z === 61 ? Ve(Mn, 2) : Ve(Zf, 1);
            }
            function uc(q) {
              var Z = w.charCodeAt(P + 1), Q = 1;
              return Z === q ? (Q = q === 62 && w.charCodeAt(P + 2) === 62 ? 3 : 2, w.charCodeAt(P + Q) === 61 ? Ve(Mn, Q + 1) : Ve(Gf, Q)) : Z == 33 && q == 60 && w.charCodeAt(P + 2) == 45 && w.charCodeAt(P + 3) == 45 ? (P += 4, ya(), ir(), Nn()) : (Z === 61 && (Q = w.charCodeAt(P + 2) === 61 ? 3 : 2), Ve(Wf, Q));
            }
            function lc(q) {
              var Z = w.charCodeAt(P + 1);
              return Z === 61 ? Ve(Hf, w.charCodeAt(P + 2) === 61 ? 3 : 2) : Ve(q === 61 ? va : bu, 1);
            }
            function hc(q) {
              switch (q) {
                case 46:
                  return ic();
                case 40:
                  return ++P, De(Bi);
                case 41:
                  return ++P, De(Oi);
                case 59:
                  return ++P, De(qi);
                case 44:
                  return ++P, De(Yi);
                case 91:
                  return ++P, De(fs);
                case 93:
                  return ++P, De(cs);
                case 123:
                  return ++P, De(Jn);
                case 125:
                  return ++P, De(On);
                case 58:
                  return ++P, De(tr);
                case 63:
                  return ++P, De(_a);
                case 48:
                  var Z = w.charCodeAt(P + 1);
                  if (Z === 120 || Z === 88) return fc();
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                  return Eu(!1);
                case 34:
                case 39:
                  return cc(q);
                case 47:
                  return nc();
                case 37:
                case 42:
                  return rc();
                case 124:
                case 38:
                  return sc(q);
                case 94:
                  return ac();
                case 43:
                case 45:
                  return oc(q);
                case 60:
                case 62:
                  return uc(q);
                case 61:
                case 33:
                  return lc(q);
                case 126:
                  return Ve(bu, 1);
              }
              return !1;
            }
            function Nn(q) {
              if (q ? P = N + 1 : N = P, O.locations && (B = new Ln()), q) return Tu();
              if (P >= A) return De(Bt);
              var Z = w.charCodeAt(P);
              if (gs(Z) || Z === 92) return Mu();
              var Q = hc(Z);
              if (Q === !1) {
                var rt = String.fromCharCode(Z);
                if (rt === "\\" || ku.test(rt)) return Mu();
                nt(P, "Unexpected character '" + rt + "'");
              }
              return Q;
            }
            function Ve(q, Z) {
              var Q = w.slice(P, P + Z);
              P += Z, De(q, Q);
            }
            function Tu() {
              for (var zt = "", q, Z, Q = P; ; ) {
                P >= A && nt(Q, "Unterminated regular expression");
                var rt = w.charAt(P);
                if (ps.test(rt) && nt(Q, "Unterminated regular expression"), q)
                  q = !1;
                else {
                  if (rt === "[") Z = !0;
                  else if (rt === "]" && Z) Z = !1;
                  else if (rt === "/" && !Z) break;
                  q = rt === "\\";
                }
                ++P;
              }
              var zt = w.slice(Q, P);
              ++P;
              var Dt = Ou();
              Dt && !/^[gmsiy]*$/.test(Dt) && nt(Q, "Invalid regexp flag");
              try {
                var qt = new RegExp(zt, Dt);
              } catch (fe) {
                fe instanceof SyntaxError && nt(Q, fe.message), nt(fe);
              }
              return De(St, qt);
            }
            function Ar(q, Z) {
              for (var Q = P, rt = 0, zt = 0, Dt = Z ?? 1 / 0; zt < Dt; ++zt) {
                var qt = w.charCodeAt(P), fe;
                if (qt >= 97 ? fe = qt - 97 + 10 : qt >= 65 ? fe = qt - 65 + 10 : qt >= 48 && qt <= 57 ? fe = qt - 48 : fe = 1 / 0, fe >= q) break;
                ++P, rt = rt * q + fe;
              }
              return P === Q || Z != null && P - Q !== Z ? null : rt;
            }
            function fc() {
              P += 2;
              var q = Ar(16);
              return q == null && nt(N + 2, "Expected hexadecimal number"), gs(w.charCodeAt(P)) && nt(P, "Identifier directly after number"), De(Ct, q);
            }
            function Eu(q) {
              var Z = P, Q = !1, rt = w.charCodeAt(P) === 48;
              !q && Ar(10) === null && nt(Z, "Invalid number"), w.charCodeAt(P) === 46 && (++P, Ar(10), Q = !0);
              var zt = w.charCodeAt(P);
              (zt === 69 || zt === 101) && (zt = w.charCodeAt(++P), (zt === 43 || zt === 45) && ++P, Ar(10) === null && nt(Z, "Invalid number"), Q = !0), gs(w.charCodeAt(P)) && nt(P, "Identifier directly after number");
              var Dt = w.slice(Z, P), qt;
              return Q ? qt = parseFloat(Dt) : !rt || Dt.length === 1 ? qt = parseInt(Dt, 10) : /[89]/.test(Dt) || J ? nt(Z, "Invalid number") : qt = parseInt(Dt, 8), De(Ct, qt);
            }
            function cc(q) {
              P++;
              for (var Z = ""; ; ) {
                P >= A && nt(N, "Unterminated string constant");
                var Q = w.charCodeAt(P);
                if (Q === q)
                  return ++P, De(Ft, Z);
                if (Q === 92) {
                  Q = w.charCodeAt(++P);
                  var rt = /^[0-7]+/.exec(w.slice(P, P + 3));
                  for (rt && (rt = rt[0]); rt && parseInt(rt, 8) > 255; ) rt = rt.slice(0, -1);
                  if (rt === "0" && (rt = null), ++P, rt)
                    J && nt(P - 2, "Octal literal in strict mode"), Z += String.fromCharCode(parseInt(rt, 8)), P += rt.length - 1;
                  else
                    switch (Q) {
                      case 110:
                        Z += `
`;
                        break;
                      case 114:
                        Z += "\r";
                        break;
                      case 120:
                        Z += String.fromCharCode(_s(2));
                        break;
                      case 117:
                        Z += String.fromCharCode(_s(4));
                        break;
                      case 85:
                        Z += String.fromCharCode(_s(8));
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
                        w.charCodeAt(P) === 10 && ++P;
                      case 10:
                        O.locations && ($ = P, ++Y);
                        break;
                      default:
                        Z += String.fromCharCode(Q);
                        break;
                    }
                } else
                  (Q === 13 || Q === 10 || Q === 8232 || Q === 8233) && nt(N, "Unterminated string constant"), Z += String.fromCharCode(Q), ++P;
              }
            }
            function _s(q) {
              var Z = Ar(16, q);
              return Z === null && nt(N, "Bad character escape sequence"), Z;
            }
            var nr;
            function Ou() {
              nr = !1;
              for (var q, Z = !0, Q = P; ; ) {
                var rt = w.charCodeAt(P);
                if (Au(rt))
                  nr && (q += w.charAt(P)), ++P;
                else if (rt === 92) {
                  nr || (q = w.slice(Q, P)), nr = !0, w.charCodeAt(++P) != 117 && nt(P, "Expecting Unicode escape sequence \\uXXXX"), ++P;
                  var zt = _s(4), Dt = String.fromCharCode(zt);
                  Dt || nt(P - 1, "Invalid Unicode escape"), (Z ? gs(zt) : Au(zt)) || nt(P - 4, "Invalid Unicode escape"), q += Dt;
                } else
                  break;
                Z = !1;
              }
              return nr ? q : w.slice(Q, P);
            }
            function Mu() {
              var q = Ou(), Z = Lt;
              return !nr && Xf(q) && (Z = pa[q]), De(Z, q);
            }
            function ue() {
              X = N, at = V, ct = H, Nn();
            }
            function ba(q) {
              if (J = q, P = N, O.locations)
                for (; P < $; )
                  $ = w.lastIndexOf(`
`, $ - 2) + 1, --Y;
              ir(), Nn();
            }
            function Lu() {
              this.type = null, this.start = N, this.end = null;
            }
            function Nu() {
              this.start = B, this.end = null, m !== null && (this.source = m);
            }
            function qe() {
              var q = new Lu();
              return O.locations && (q.loc = new Nu()), O.directSourceFile && (q.sourceFile = O.directSourceFile), O.ranges && (q.range = [N, 0]), q;
            }
            function dn(q) {
              var Z = new Lu();
              return Z.start = q.start, O.locations && (Z.loc = new Nu(), Z.loc.start = q.loc.start), O.ranges && (Z.range = [q.range[0], 0]), Z;
            }
            function $t(q, Z) {
              return q.type = Z, q.end = at, O.locations && (q.loc.end = ct), O.ranges && (q.range[1] = at), q;
            }
            function xa(q) {
              return O.ecmaVersion >= 5 && q.type === "ExpressionStatement" && q.expression.type === "Literal" && q.expression.value === "use strict";
            }
            function Ce(q) {
              if (D === q)
                return ue(), !0;
            }
            function ms() {
              return !O.strictSemicolons && (D === Bt || D === On || ps.test(w.slice(at, N)));
            }
            function Rn() {
              !Ce(qi) && !ms() && $i();
            }
            function Me(q) {
              D === q ? ue() : $i();
            }
            function $i() {
              nt(N, "Unexpected token");
            }
            function vs(q) {
              q.type !== "Identifier" && q.type !== "MemberExpression" && nt(q.start, "Assigning to rvalue"), J && q.type === "Identifier" && ds(q.name) && nt(q.start, "Assigning to " + q.name + " in strict mode");
            }
            function dc(q) {
              X = at = P, O.locations && (ct = new Ln()), gt = J = null, wt = [], Nn();
              var Z = q || qe(), Q = !0;
              for (q || (Z.body = []); D !== Bt; ) {
                var rt = Mi();
                Z.body.push(rt), Q && xa(rt) && ba(!0), Q = !1;
              }
              return $t(Z, "Program");
            }
            var wa = { kind: "loop" }, pc = { kind: "switch" };
            function Mi() {
              (D === ma || D === Mn && j == "/=") && Nn(!0);
              var q = D, Z = qe();
              switch (q) {
                case Ht:
                case Fe:
                  ue();
                  var Q = q === Ht;
                  Ce(qi) || ms() ? Z.label = null : D !== Lt ? $i() : (Z.label = pn(), Rn());
                  for (var rt = 0; rt < wt.length; ++rt) {
                    var zt = wt[rt];
                    if ((Z.label == null || zt.name === Z.label.name) && (zt.kind != null && (Q || zt.kind === "loop") || Z.label && Q))
                      break;
                  }
                  return rt === wt.length && nt(Z.start, "Unsyntactic " + q.keyword), $t(Z, Q ? "BreakStatement" : "ContinueStatement");
                case Be:
                  return ue(), Rn(), $t(Z, "DebuggerStatement");
                case pe:
                  return ue(), wt.push(wa), Z.body = Mi(), wt.pop(), Me(Ei), Z.test = Pr(), Rn(), $t(Z, "DoWhileStatement");
                case ze:
                  if (ue(), wt.push(wa), Me(Bi), D === qi) return Sa(Z, null);
                  if (D === cn) {
                    var Dt = qe();
                    return ue(), Fu(Dt, !0), $t(Dt, "VariableDeclaration"), Dt.declarations.length === 1 && Ce(hs) ? Ru(Z, Dt) : Sa(Z, Dt);
                  }
                  var Dt = Ue(!1, !0);
                  return Ce(hs) ? (vs(Dt), Ru(Z, Dt)) : Sa(Z, Dt);
                case yi:
                  return ue(), Pa(Z, !0);
                case fn:
                  return ue(), Z.test = Pr(), Z.consequent = Mi(), Z.alternate = Ce(Ee) ? Mi() : null, $t(Z, "IfStatement");
                case Pi:
                  return !gt && !O.allowReturnOutsideFunction && nt(N, "'return' outside of function"), ue(), Ce(qi) || ms() ? Z.argument = null : (Z.argument = Ue(), Rn()), $t(Z, "ReturnStatement");
                case Ti:
                  ue(), Z.discriminant = Pr(), Z.cases = [], Me(Jn), wt.push(pc);
                  for (var qt, fe; D != On; )
                    if (D === Vt || D === Te) {
                      var Li = D === Vt;
                      qt && $t(qt, "SwitchCase"), Z.cases.push(qt = qe()), qt.consequent = [], ue(), Li ? qt.test = Ue() : (fe && nt(X, "Multiple default clauses"), fe = !0, qt.test = null), Me(tr);
                    } else
                      qt || $i(), qt.consequent.push(Mi());
                  return qt && $t(qt, "SwitchCase"), ue(), wt.pop(), $t(Z, "SwitchStatement");
                case ri:
                  return ue(), ps.test(w.slice(at, N)) && nt(at, "Illegal newline after throw"), Z.argument = Ue(), Rn(), $t(Z, "ThrowStatement");
                case ui:
                  if (ue(), Z.block = Tr(), Z.handler = null, D === Re) {
                    var Fn = qe();
                    ue(), Me(Bi), Fn.param = pn(), J && ds(Fn.param.name) && nt(Fn.param.start, "Binding " + Fn.param.name + " in strict mode"), Me(Oi), Fn.guard = null, Fn.body = Tr(), Z.handler = $t(Fn, "CatchClause");
                  }
                  return Z.guardedHandlers = mt, Z.finalizer = Ce(ni) ? Tr() : null, !Z.handler && !Z.finalizer && nt(Z.start, "Missing catch or finally clause"), $t(Z, "TryStatement");
                case cn:
                  return ue(), Fu(Z), Rn(), $t(Z, "VariableDeclaration");
                case Ei:
                  return ue(), Z.test = Pr(), wt.push(wa), Z.body = Mi(), wt.pop(), $t(Z, "WhileStatement");
                case ls:
                  return J && nt(N, "'with' in strict mode"), ue(), Z.object = Pr(), Z.body = Mi(), $t(Z, "WithStatement");
                case Jn:
                  return Tr();
                case qi:
                  return ue(), $t(Z, "EmptyStatement");
                default:
                  var Ea = j, ys = Ue();
                  if (q === Lt && ys.type === "Identifier" && Ce(tr)) {
                    for (var rt = 0; rt < wt.length; ++rt)
                      wt[rt].name === Ea && nt(ys.start, "Label '" + Ea + "' is already declared");
                    var bc = D.isLoop ? "loop" : D === Ti ? "switch" : null;
                    return wt.push({ name: Ea, kind: bc }), Z.body = Mi(), wt.pop(), Z.label = ys, $t(Z, "LabeledStatement");
                  } else
                    return Z.expression = ys, Rn(), $t(Z, "ExpressionStatement");
              }
            }
            function Pr() {
              Me(Bi);
              var q = Ue();
              return Me(Oi), q;
            }
            function Tr(q) {
              var Z = qe(), Q = !0, rt = !1, zt;
              for (Z.body = [], Me(Jn); !Ce(On); ) {
                var Dt = Mi();
                Z.body.push(Dt), Q && q && xa(Dt) && (zt = rt, ba(rt = !0)), Q = !1;
              }
              return rt && !zt && ba(!1), $t(Z, "BlockStatement");
            }
            function Sa(q, Z) {
              return q.init = Z, Me(qi), q.test = D === qi ? null : Ue(), Me(qi), q.update = D === Oi ? null : Ue(), Me(Oi), q.body = Mi(), wt.pop(), $t(q, "ForStatement");
            }
            function Ru(q, Z) {
              return q.left = Z, q.right = Ue(), Me(Oi), q.body = Mi(), wt.pop(), $t(q, "ForInStatement");
            }
            function Fu(q, Z) {
              for (q.declarations = [], q.kind = "var"; ; ) {
                var Q = qe();
                if (Q.id = pn(), J && ds(Q.id.name) && nt(Q.id.start, "Binding " + Q.id.name + " in strict mode"), Q.init = Ce(va) ? Ue(!0, Z) : null, q.declarations.push($t(Q, "VariableDeclarator")), !Ce(Yi)) break;
              }
              return q;
            }
            function Ue(q, Z) {
              var Q = Ca(Z);
              if (!q && D === Yi) {
                var rt = dn(Q);
                for (rt.expressions = [Q]; Ce(Yi); ) rt.expressions.push(Ca(Z));
                return $t(rt, "SequenceExpression");
              }
              return Q;
            }
            function Ca(q) {
              var Z = gc(q);
              if (D.isAssign) {
                var Q = dn(Z);
                return Q.operator = j, Q.left = Z, ue(), Q.right = Ca(q), vs(Z), $t(Q, "AssignmentExpression");
              }
              return Z;
            }
            function gc(q) {
              var Z = _c(q);
              if (Ce(_a)) {
                var Q = dn(Z);
                return Q.test = Z, Q.consequent = Ue(!0), Me(tr), Q.alternate = Ue(!0, q), $t(Q, "ConditionalExpression");
              }
              return Z;
            }
            function _c(q) {
              return Ia(ka(), -1, q);
            }
            function Ia(q, Z, Q) {
              var rt = D.binop;
              if (rt != null && (!Q || D !== hs) && rt > Z) {
                var zt = dn(q);
                zt.left = q, zt.operator = j;
                var Dt = D;
                ue(), zt.right = Ia(ka(), rt, Q);
                var qt = $t(zt, Dt === xu || Dt === wu ? "LogicalExpression" : "BinaryExpression");
                return Ia(qt, Z, Q);
              }
              return q;
            }
            function ka() {
              if (D.prefix) {
                var q = qe(), Z = D.isUpdate;
                return q.operator = j, q.prefix = !0, G = !0, ue(), q.argument = ka(), Z ? vs(q.argument) : J && q.operator === "delete" && q.argument.type === "Identifier" && nt(q.start, "Deleting local variable in strict mode"), $t(q, Z ? "UpdateExpression" : "UnaryExpression");
              }
              for (var Q = mc(); D.postfix && !ms(); ) {
                var q = dn(Q);
                q.operator = j, q.prefix = !1, q.argument = Q, vs(Q), ue(), Q = $t(q, "UpdateExpression");
              }
              return Q;
            }
            function mc() {
              return Er(Aa());
            }
            function Er(q, Z) {
              if (Ce(ga)) {
                var Q = dn(q);
                return Q.object = q, Q.property = pn(!0), Q.computed = !1, Er($t(Q, "MemberExpression"), Z);
              } else if (Ce(fs)) {
                var Q = dn(q);
                return Q.object = q, Q.property = Ue(), Q.computed = !0, Me(cs), Er($t(Q, "MemberExpression"), Z);
              } else if (!Z && Ce(Bi)) {
                var Q = dn(q);
                return Q.callee = q, Q.arguments = Ta(Oi, !1), Er($t(Q, "CallExpression"), Z);
              } else return q;
            }
            function Aa() {
              switch (D) {
                case _u:
                  var rt = qe();
                  return ue(), $t(rt, "ThisExpression");
                case Lt:
                  return pn();
                case Ct:
                case Ft:
                case St:
                  var rt = qe();
                  return rt.value = j, rt.raw = w.slice(N, V), ue(), $t(rt, "Literal");
                case mu:
                case vu:
                case yu:
                  var rt = qe();
                  return rt.value = D.atomValue, rt.raw = D.keyword, ue(), $t(rt, "Literal");
                case Bi:
                  var q = B, Z = N;
                  ue();
                  var Q = Ue();
                  return Q.start = Z, Q.end = V, O.locations && (Q.loc.start = q, Q.loc.end = H), O.ranges && (Q.range = [Z, V]), Me(Oi), Q;
                case fs:
                  var rt = qe();
                  return ue(), rt.elements = Ta(cs, !0, !0), $t(rt, "ArrayExpression");
                case Jn:
                  return yc();
                case yi:
                  var rt = qe();
                  return ue(), Pa(rt, !1);
                case gu:
                  return vc();
                default:
                  $i();
              }
            }
            function vc() {
              var q = qe();
              return ue(), q.callee = Er(Aa(), !0), Ce(Bi) ? q.arguments = Ta(Oi, !1) : q.arguments = mt, $t(q, "NewExpression");
            }
            function yc() {
              var q = qe(), Z = !0, Q = !1;
              for (q.properties = [], ue(); !Ce(On); ) {
                if (Z)
                  Z = !1;
                else if (Me(Yi), O.allowTrailingCommas && Ce(On)) break;
                var rt = { key: zu() }, zt = !1, Dt;
                if (Ce(tr) ? (rt.value = Ue(!0), Dt = rt.kind = "init") : O.ecmaVersion >= 5 && rt.key.type === "Identifier" && (rt.key.name === "get" || rt.key.name === "set") ? (zt = Q = !0, Dt = rt.kind = rt.key.name, rt.key = zu(), D !== Bi && $i(), rt.value = Pa(qe(), !1)) : $i(), rt.key.type === "Identifier" && (J || Q))
                  for (var qt = 0; qt < q.properties.length; ++qt) {
                    var fe = q.properties[qt];
                    if (fe.key.name === rt.key.name) {
                      var Li = Dt == fe.kind || zt && fe.kind === "init" || Dt === "init" && (fe.kind === "get" || fe.kind === "set");
                      Li && !J && Dt === "init" && fe.kind === "init" && (Li = !1), Li && nt(rt.key.start, "Redefinition of property");
                    }
                  }
                q.properties.push(rt);
              }
              return $t(q, "ObjectExpression");
            }
            function zu() {
              return D === Ct || D === Ft ? Aa() : pn(!0);
            }
            function Pa(q, Z) {
              D === Lt ? q.id = pn() : Z ? $i() : q.id = null, q.params = [];
              var Q = !0;
              for (Me(Bi); !Ce(Oi); )
                Q ? Q = !1 : Me(Yi), q.params.push(pn());
              var rt = gt, zt = wt;
              if (gt = !0, wt = [], q.body = Tr(!0), gt = rt, wt = zt, J || q.body.body.length && xa(q.body.body[0]))
                for (var Dt = q.id ? -1 : 0; Dt < q.params.length; ++Dt) {
                  var qt = Dt < 0 ? q.id : q.params[Dt];
                  if ((Cu(qt.name) || ds(qt.name)) && nt(qt.start, "Defining '" + qt.name + "' in strict mode"), Dt >= 0) for (var fe = 0; fe < Dt; ++fe) qt.name === q.params[fe].name && nt(qt.start, "Argument name clash in strict mode");
                }
              return $t(q, Z ? "FunctionDeclaration" : "FunctionExpression");
            }
            function Ta(q, Z, Q) {
              for (var rt = [], zt = !0; !Ce(q); ) {
                if (zt)
                  zt = !1;
                else if (Me(Yi), Z && O.allowTrailingCommas && Ce(q)) break;
                Q && D === Yi ? rt.push(null) : rt.push(Ue(!0));
              }
              return rt;
            }
            function pn(q) {
              var Z = qe();
              return q && O.forbidReserved == "everywhere" && (q = !1), D === Lt ? (!q && (O.forbidReserved && (O.ecmaVersion === 3 ? Yf : $f)(j) || J && Cu(j)) && w.slice(N, V).indexOf("\\") == -1 && nt(N, "The keyword '" + j + "' is reserved"), Z.name = j) : q && D.keyword ? Z.name = D.keyword : $i(), G = !1, ue(), $t(Z, "Identifier");
            }
          }), r.version || (r = null);
        }
        function l(C, O) {
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
        }, c = h.each(
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
        F.inject(c), it.inject(c), Pe.inject(c);
        function p(C, O, w) {
          var A = f[O];
          if (C && C[A]) {
            var m = C[A](w);
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
          function A(J) {
            for (var nt = 0, mt = w.length; nt < mt; nt++) {
              var Ct = w[nt];
              if (Ct[0] >= J)
                break;
              J += Ct[1];
            }
            return J;
          }
          function m(J) {
            return C.substring(
              A(J.range[0]),
              A(J.range[1])
            );
          }
          function I(J, nt) {
            return C.substring(
              A(J.range[1]),
              A(nt.range[0])
            );
          }
          function T(J, nt) {
            for (var mt = A(J.range[0]), Ct = A(J.range[1]), St = 0, Ft = w.length - 1; Ft >= 0; Ft--)
              if (mt > w[Ft][0]) {
                St = Ft + 1;
                break;
              }
            w.splice(St, 0, [mt, nt.length - Ct + mt]), C = C.substring(0, mt) + nt + C.substring(Ct);
          }
          function M(J, nt) {
            switch (J.type) {
              case "UnaryExpression":
                if (J.operator in d && J.argument.type !== "Literal") {
                  var mt = m(J.argument);
                  T(J, '$__("' + J.operator + '", ' + mt + ")");
                }
                break;
              case "BinaryExpression":
                if (J.operator in f && J.left.type !== "Literal") {
                  var Ct = m(J.left), St = m(J.right), Ft = I(J.left, J.right), Lt = J.operator;
                  T(J, "__$__(" + Ct + "," + Ft.replace(
                    new RegExp("\\" + Lt),
                    '"' + Lt + '"'
                  ) + ", " + St + ")");
                }
                break;
              case "UpdateExpression":
              case "AssignmentExpression":
                var Bt = nt && nt.type;
                if (!(Bt === "ForStatement" || Bt === "BinaryExpression" && /^[=!<>]/.test(nt.operator) || Bt === "MemberExpression" && nt.computed)) {
                  if (J.type === "UpdateExpression") {
                    var mt = m(J.argument), Ht = "__$__(" + mt + ', "' + J.operator[0] + '", 1)', Vt = mt + " = " + Ht;
                    J.prefix ? Vt = "(" + Vt + ")" : (Bt === "AssignmentExpression" || Bt === "VariableDeclarator" || Bt === "BinaryExpression") && (m(nt.left || nt.id) === mt && (Vt = Ht), Vt = mt + "; " + Vt), T(J, Vt);
                  } else if (/^.=$/.test(J.operator) && J.left.type !== "Literal") {
                    var Ct = m(J.left), St = m(J.right), Ht = Ct + " = __$__(" + Ct + ', "' + J.operator[0] + '", ' + St + ")";
                    T(J, /^\(.*\)$/.test(m(J)) ? "(" + Ht + ")" : Ht);
                  }
                }
                break;
            }
          }
          function P(J) {
            switch (J.type) {
              case "ExportDefaultDeclaration":
                T({
                  range: [J.start, J.declaration.start]
                }, "module.exports = ");
                break;
              case "ExportNamedDeclaration":
                var nt = J.declaration, mt = J.specifiers;
                if (nt) {
                  var Ct = nt.declarations;
                  Ct && (Ct.forEach(function(Ft) {
                    T(Ft, "module.exports." + m(Ft));
                  }), T({
                    range: [
                      J.start,
                      nt.start + nt.kind.length
                    ]
                  }, ""));
                } else if (mt) {
                  var St = mt.map(function(Ft) {
                    var Lt = m(Ft);
                    return "module.exports." + Lt + " = " + Lt + "; ";
                  }).join("");
                  St && T(J, St);
                }
                break;
            }
          }
          function N(J, nt, mt) {
            if (J) {
              for (var Ct in J)
                if (Ct !== "range" && Ct !== "loc") {
                  var St = J[Ct];
                  if (Array.isArray(St))
                    for (var Ft = 0, Lt = St.length; Ft < Lt; Ft++)
                      N(St[Ft], J, mt);
                  else St && typeof St == "object" && N(St, J, mt);
                }
              mt.operatorOverloading !== !1 && M(J, nt), mt.moduleExports !== !1 && P(J);
            }
          }
          function V(J) {
            var nt = "", mt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            for (J = (Math.abs(J) << 1) + (J < 0 ? 1 : 0); J || !nt; ) {
              var Ct = J & 31;
              J >>= 5, J && (Ct |= 32), nt += mt[Ct];
            }
            return nt;
          }
          var B = O.url || "", H = O.sourceMaps, D = O.paperFeatures || {}, j = O.source || C, G = O.offset || 0, Y = pt.agent, $ = Y.versionNumber, X = !1, at = /\r\n|\n|\r/mg, ct;
          if (H && (Y.chrome && $ >= 30 || Y.webkit && $ >= 537.76 || Y.firefox && $ >= 23 || Y.node)) {
            if (Y.node)
              G -= 2;
            else if (a && B && !a.location.href.indexOf(B)) {
              var gt = o.getElementsByTagName("html")[0].innerHTML;
              G = gt.substr(0, gt.indexOf(C) + 1).match(
                at
              ).length + 1;
            }
            X = G > 0 && !(Y.chrome && $ >= 36 || Y.safari && $ >= 600 || Y.firefox && $ >= 40 || Y.node);
            var wt = ["AA" + V(X ? 0 : G) + "A"];
            wt.length = (C.match(at) || []).length + 1 + (X ? G : 0), ct = {
              version: 3,
              file: B,
              names: [],
              mappings: wt.join(";AACA"),
              sourceRoot: "",
              sources: [B],
              sourcesContent: [j]
            };
          }
          return (D.operatorOverloading !== !1 || D.moduleExports !== !1) && N(l(C, {
            ranges: !0,
            preserveParens: !0,
            sourceType: "module"
          }), null, D), ct && (X && (C = new Array(G + 1).join(`
`) + C), /^(inline|both)$/.test(H) && (C += `
//# sourceMappingURL=data:application/json;base64,` + e.btoa(unescape(encodeURIComponent(
            JSON.stringify(ct)
          )))), C += `
//# sourceURL=` + (B || "paperscript")), {
            url: B,
            source: j,
            code: C,
            map: ct
          };
        }
        function S(C, O, w) {
          pt = O;
          var A = O.getView(), m = /\btool\.\w+|\s+on(?:Key|Mouse)(?:Up|Down|Move|Drag)\b/.test(C) && !/\bnew\s+Tool\b/.test(C) ? new bt() : null, I = m ? m._events : [], T = ["onFrame", "onResize"].concat(I), M = [], P = [], N, V = typeof C == "object" ? C : b(C, w);
          C = V.code;
          function B($, X) {
            for (var at in $)
              (X || !/^_/.test(at)) && new RegExp("([\\b\\s\\W]|^)" + at.replace(/\$/g, "\\$") + "\\b").test(C) && (M.push(at), P.push($[at]));
          }
          B(
            { __$__: p, $__: g, paper: O, tool: m },
            !0
          ), B(O), C = "var module = { exports: {} }; " + C;
          var G = h.each(T, function($) {
            new RegExp("\\s+" + $ + "\\b").test(C) && (M.push($), this.push("module.exports." + $ + " = " + $ + ";"));
          }, []).join(`
`);
          G && (C += `
` + G), C += `
return module.exports;`;
          var H = pt.agent;
          if (o && (H.chrome || H.firefox && H.versionNumber < 40)) {
            var D = o.createElement("script"), j = o.head || o.getElementsByTagName("head")[0];
            H.firefox && (C = `
` + C), D.appendChild(o.createTextNode(
              "document.__paperscript__ = function(" + M + ") {" + C + `
}`
            )), j.appendChild(D), N = o.__paperscript__, delete o.__paperscript__, j.removeChild(D);
          } else
            N = Function(M, C);
          var G = N && N.apply(O, P), Y = G || {};
          return h.each(I, function($) {
            var X = Y[$];
            X && (m[$] = X);
          }), A && (Y.onResize && A.setOnResize(Y.onResize), A.emit("resize", {
            size: A.size,
            delta: new F()
          }), Y.onFrame && A.setOnFrame(Y.onFrame), A.requestUpdate()), G;
        }
        function x(C) {
          if (/^text\/(?:x-|)paperscript$/.test(C.type) && v.getAttribute(C, "ignore") !== "true") {
            var O = v.getAttribute(C, "canvas"), w = o.getElementById(O), A = C.src || C.getAttribute("data-src"), m = v.hasAttribute(C, "async"), I = "data-paper-scope";
            if (!w)
              throw new Error('Unable to find canvas with id "' + O + '"');
            var T = v.get(w.getAttribute(I)) || new v().setup(w);
            return w.setAttribute(I, T._id), A ? _t.request({
              url: A,
              async: m,
              mimeType: "text/plain",
              onLoad: function(M) {
                S(M, T, A);
              }
            }) : S(C.innerHTML, T, C.baseURI), C.setAttribute("data-paper-ignore", "true"), T;
          }
        }
        function y() {
          h.each(
            o && o.getElementsByTagName("script"),
            x
          );
        }
        function E(C) {
          return C ? x(C) : y();
        }
        return a && (o.readyState === "complete" ? setTimeout(y) : ye.add(a, { load: y })), {
          compile: b,
          execute: S,
          load: E,
          parse: l,
          calculateBinary: p,
          calculateUnary: g
        };
      }).call(this);
      var pt = new (v.inject(h.exports, {
        Base: h,
        Numerical: U,
        Key: ft,
        DomEvent: ye,
        DomElement: we,
        document: o,
        window: a,
        Symbol: Ne,
        PlacedSymbol: Ai
      }))();
      return pt.agent.node && bl(pt), typeof n == "function" && n.amd ? n("paper", pt) : t && (t.exports = pt), pt;
    }).call(O_, typeof self == "object" ? self : null);
  }(Os)), Os.exports;
}
var L_ = M_();
const se = /* @__PURE__ */ Qg(L_), ji = je(null), si = je(null), Ni = je(null);
function Df() {
  return {
    project: ji,
    uiLayer: si,
    artLayer: Ni,
    initializeProject: (o) => (ji.value || (se.setup(o), ji.value = se.project, Ni.value = new se.Layer(), Ni.value.name = "artwork", si.value = new se.Layer(), si.value.name = "ui", Ni.value.activate()), ji.value),
    resizeCanvas: (o, h, _) => {
      if (!ji.value || !si.value || !Ni.value) return;
      si.value.activate(), si.value.removeChildren();
      let v = new se.Path.Rectangle(
        new se.Point(0, 0),
        new se.Size(_.width, _.height)
      );
      v.strokeColor = "#222", v.dashArray = [3, 5], si.value.addChild(v);
      let k = new se.Path.Rectangle(
        new se.Point(0, 0),
        new se.Size(Number(o), Number(h))
      );
      k.strokeColor = "#2AA", k.dashArray = [3, 5], si.value.addChild(k), Ni.value.activate();
      let R = Ni.value.getItem({ class: se.Group });
      if (R) {
        v.fitBounds(k.bounds);
        let et = v.bounds.width / _.width;
        R.data.previousScale && R.scale(1 / R.data.previousScale), R.scale(et), R.position = R.data.initialOffset.multiply(et).add(v.bounds.topLeft.subtract(k.bounds.topLeft)), R.data.previousScale = et;
      }
      si.value.activate();
      const z = new se.PointText({
        point: new se.Point(k.bounds.center.x, k.bounds.y - 5),
        content: o.toFixed(2) + " mm",
        justification: "center",
        fillColor: "#222"
      });
      si.value.addChild(z);
      const U = new se.PointText({
        point: new se.Point(k.bounds.x - 5, k.bounds.center.y),
        content: h.toFixed(2) + " mm",
        justification: "center",
        fillColor: "#222",
        rotation: -90
      });
      si.value.addChild(U), ji.value.view.update();
    },
    importArtwork: (o) => new Promise((h, _) => {
      if (!ji.value || !Ni.value) {
        _(new Error("Project or art layer not initialized"));
        return;
      }
      Ni.value.activate(), Ni.value.removeChildren(), ji.value.importSVG(o, {
        expandShapes: !0,
        applyMatrix: !0,
        insert: !0,
        onLoad: (v) => {
          v.data.initialOffset = v.bounds.center, h(v);
        },
        onError: (v) => {
          _(v);
        }
      });
    }),
    updateTravelLines: (o) => {
      !ji.value || !si.value || (si.value.activate(), si.value.addChildren(o), ji.value.view.update(), Ni.value.activate());
    }
  };
}
function N_(t) {
  if (!t)
    return console.warn("No project provided"), [];
  const e = t.layers.find((n) => n.name === "artwork");
  if (!e)
    return console.warn("No artwork layer found"), [];
  e.activate();
  try {
    const n = te(e), a = n.getItems({
      recursive: !0,
      class: se.Group,
      match: (h) => h.name && h.name.trim().length > 0
    });
    if (a.length > 0)
      return console.log("Found grouped artwork with", a.length, "layers"), a.map((h, _) => ({
        id: h.id,
        name: h.name || `Layer ${_ + 1}`,
        visible: !0,
        tool: 0,
        data: h
      }));
    const o = n.getItems({
      recursive: !0,
      class: se.Path
    });
    if (o.length > 0) {
      console.log("Found ungrouped artwork with", o.length, "paths");
      const h = new se.Group(o);
      return h.name = "Layer", console.log("ungroupedLayer", te(t.activeLayer)), [
        {
          id: h.id,
          name: h.name,
          visible: !0,
          tool: 0,
          data: h
        }
      ];
    }
    return console.warn("No valid artwork content found"), [];
  } catch (n) {
    return console.error("Error processing artwork layers:", n), [];
  }
}
const Il = [
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
function R_(t, e) {
  let n = wo(t);
  z_(n), n = wo(t), D_(n), Vf(n, e);
}
function F_(t, e) {
  const n = wo(t);
  console.log("Colorize:", n), Vf(n, e);
}
function wo(t) {
  return t.getItems({ recursive: !0, class: se.Path }).filter((e) => e.segments.length > 0).filter((e) => e.parent.visible).filter((e) => e.hasStroke || e.hasFill);
}
function z_(t) {
  t.filter((n) => n.dashArray.length > 0).forEach((n) => {
    let a = 0, o = n.dashArray.length, h = 0, _ = n.length;
    for (; a < _; ) {
      let v = n.dashArray[h % o], k = h % 2 === 1, R = n.splitAt(v);
      k && n.remove(), n = R, a += v, h++;
    }
  });
}
function D_(t) {
  t.forEach((e) => {
    e.flatten(), e.fillColor = null, e.strokeWidth = 1, e.visible = !0, e.dashArray = [];
  });
}
function Vf(t, { layers: e, viewbox: n }) {
  let a = new se.Rectangle(
    new se.Point(0, 0),
    new se.Size(n.width, n.height)
  );
  t.forEach((o) => {
    let h;
    o.parent.name !== null && (h = e.find((_) => _.name === o.parent.name)), o.visible = h.visible, o.strokeColor = Il[h.tool % Il.length], o.strokeWidth = 1, o.fillColor = null, a.contains(o.bounds) || (o.strokeColor = "#D22");
  });
}
const V_ = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [a, o] of e)
    n[a] = o;
  return n;
}, B_ = {
  __name: "CanvasPreview",
  props: {
    settings: {
      type: Object,
      required: !0
    },
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
    const e = t, n = je(null), { project: a, initializeProject: o, updateTravelLines: h } = Df();
    return bn(
      () => e.travel,
      (_) => {
        _ && _.length > 0 && h(_);
      },
      { deep: !1 }
    ), Vo(() => {
      o(n.value), h(e.travel.value), a.value.activate();
      let _ = new se.Tool(), v = [0.67, 1, 1.5, 2.25], k = 2, R = !1;
      _.onMouseDown = function() {
        R = !1;
      }, _.onMouseDrag = function(z) {
        R = !0;
        let U = z.point.subtract(z.downPoint);
        document.getElementById("studio").style.cursor = "grabbing", se.view.center = se.view.center.subtract(U);
      }, _.onMouseUp = function(z) {
        document.getElementById("studio").style.cursor = "grab", R || (se.view.zoom = v[k], k = (k + 1) % v.length, se.view.center = z.point);
      };
    }), (_, v) => (nn(), xn("canvas", {
      id: "studio",
      ref_key: "studio",
      ref: n
    }, null, 512));
  }
}, q_ = /* @__PURE__ */ V_(B_, [["__scopeId", "data-v-09a84616"]]), U_ = { class: "paired-values" }, j_ = { class: "paired-values" }, H_ = {
  __name: "OutputControls",
  props: {
    settings: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:settings"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = je({ ...n.settings });
    bn(
      () => n.settings,
      (_) => {
        o.value = { ..._ };
      },
      { deep: !0 }
    );
    const h = () => {
      a("update:settings", { ...o.value });
    };
    return (_, v) => (nn(), xn(ci, null, [
      Wt("label", null, [
        v[6] || (v[6] = Ji("Title")),
        sr(Wt("input", {
          type: "text",
          "onUpdate:modelValue": v[0] || (v[0] = (k) => o.value.title = k),
          onChange: h
        }, null, 544), [
          [ar, o.value.title]
        ])
      ]),
      Wt("fieldset", U_, [
        v[9] || (v[9] = Wt("legend", null, "Size (mm)", -1)),
        Wt("label", null, [
          v[7] || (v[7] = Ji(" Width ")),
          sr(Wt("input", {
            class: "output-control",
            type: "number",
            "onUpdate:modelValue": v[1] || (v[1] = (k) => o.value.width = k),
            onChange: h
          }, null, 544), [
            [ar, o.value.width]
          ])
        ]),
        Wt("label", null, [
          v[8] || (v[8] = Ji(" Height ")),
          sr(Wt("input", {
            class: "output-control",
            type: "number",
            "onUpdate:modelValue": v[2] || (v[2] = (k) => o.value.height = k),
            onChange: h
          }, null, 544), [
            [ar, o.value.height]
          ])
        ])
      ]),
      Wt("fieldset", j_, [
        v[12] || (v[12] = Wt("legend", null, "Tool", -1)),
        Wt("label", null, [
          v[10] || (v[10] = Ji("Up")),
          sr(Wt("input", {
            type: "text",
            "onUpdate:modelValue": v[3] || (v[3] = (k) => o.value.penUp = k),
            onChange: h
          }, null, 544), [
            [ar, o.value.penUp]
          ])
        ]),
        Wt("label", null, [
          v[11] || (v[11] = Ji("Down")),
          sr(Wt("input", {
            type: "text",
            "onUpdate:modelValue": v[4] || (v[4] = (k) => o.value.penDown = k),
            onChange: h
          }, null, 544), [
            [ar, o.value.penDown]
          ])
        ])
      ]),
      Wt("label", null, [
        v[13] || (v[13] = Ji("Feed Rate")),
        sr(Wt("input", {
          type: "number",
          "onUpdate:modelValue": v[5] || (v[5] = (k) => o.value.feedRate = k),
          onChange: h
        }, null, 544), [
          [ar, o.value.feedRate]
        ])
      ])
    ], 64));
  }
}, W_ = {
  id: "layers",
  class: "reorder",
  role: "list"
}, G_ = {
  class: "layer-grab",
  tabindex: "0",
  role: "button"
}, Z_ = { class: "layer-control toggle" }, K_ = ["id", "checked", "onChange"], Y_ = { class: "layer-control toggle" }, $_ = ["id", "checked", "onChange"], X_ = {
  __name: "LayerControls",
  props: {
    layers: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:layers"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = je([...n.layers]);
    bn(
      () => n.layers,
      (v) => {
        o.value = [...v];
      },
      { deep: !1 }
    );
    const h = (v) => {
      var U;
      const k = o.value.findIndex((et) => et.id === v);
      let R = o.value.slice(k);
      (((U = o.value[k - 1]) == null ? void 0 : U.tool) || 0) === R[0].tool ? R = R.map((et) => ({
        ...et,
        tool: et.tool + 1
      })) : R = R.map((et) => ({
        ...et,
        tool: et.tool - 1
      })), o.value = [
        ...o.value.slice(0, k),
        ...R,
        ...o.value.slice(k + R.length)
      ], a("update:layers", [...o.value]);
    }, _ = (v) => {
      o.value = o.value.map((k) => k.id === v ? {
        ...k,
        visible: !k.visible
      } : k), a("update:layers", [...o.value]);
    };
    return (v, k) => (nn(), xn("div", null, [
      Wt("ul", W_, [
        (nn(!0), xn(ci, null, Id(o.value, (R) => {
          var z;
          return nn(), xn("li", {
            key: R.id
          }, [
            Wt("span", G_, $a(R.name), 1),
            Wt("label", Z_, [
              k[0] || (k[0] = Wt("span", { class: "sr" }, "Tool Change", -1)),
              Wt("span", null, $a(R.tool), 1),
              Wt("input", {
                id: "toggle-layer-pause-" + R.name,
                type: "checkbox",
                checked: R.tool > ((z = o.value[R.id - 1]) == null ? void 0 : z.tool),
                onChange: (U) => h(R.id)
              }, null, 40, K_),
              k[1] || (k[1] = Wt("i", { class: "ph-bold ph-pencil-simple on" }, null, -1)),
              k[2] || (k[2] = Wt("i", { class: "ph-bold ph-arrow-down off" }, null, -1))
            ]),
            Wt("label", Y_, [
              k[3] || (k[3] = Wt("span", { class: "sr" }, "Skip", -1)),
              Wt("input", {
                id: "toggle-layer-skip-" + R.name,
                type: "checkbox",
                checked: R.visible,
                onChange: (U) => _(R.id)
              }, null, 40, $_),
              k[4] || (k[4] = Wt("i", { class: "ph-bold ph-eye on" }, null, -1)),
              k[5] || (k[5] = Wt("i", { class: "ph-bold ph-eye-slash off" }, null, -1))
            ])
          ]);
        }), 128))
      ])
    ]));
  }
}, Q_ = `
`, Is = 0.5, kl = 3e3, gn = (t) => t.toFixed(3);
function J_(t, e) {
  var _;
  let n = (_ = t[0]) == null ? void 0 : _.tool, a = null, o = ["G21; mm-mode"], h = [];
  return t.forEach((v) => {
    v.tool !== n && (o.push(`${e.penUp}; Pen UP`), o.push("G0 Z0; move to z-safe height"), o.push(`M0; stop for tool (${v.tool}) change (${v.name})`), n = v.tool), v.data.children.filter((z) => z.className === "Path").filter((z) => z.segments.length > 0).forEach((z) => {
      let U = z.firstSegment.point, et = z.lastSegment.point;
      a !== null && a.getDistance(U) > 1 ? (o.push(`${e.penUp}; Pen UP`), o.push(`G4 P${Is}; Tool OFF`), o.push(""), o.push("G0 Z0; move to z-safe height"), a !== null && a.getDistance(et) < a.getDistance(U) && (z.reverse(), U = z.firstSegment.point, et = z.lastSegment.point), o.push(`G0 F1000 X${gn(U.x)} Y${gn(e.height - U.y)}`), h.push(
        new se.Path.Line(
          new se.Point(te(a)),
          new se.Point(te(U))
        )
      ), o.push(`${e.penDown}; Pen DOWN`), o.push(`G4 P${Is}; Tool ON`), o.push("G1 F300 Z-0.1000")) : a === null && (o.push(`G0 F1000 X${gn(U.x)} Y${gn(e.height - U.y)}`), h.push(
        new se.Path.Line(
          new se.Point(te(a)),
          new se.Point(te(U))
        )
      ), o.push(`${e.penDown}; Pen DOWN`), o.push(`G4 P${Is}; Tool ON (first)`), o.push("G1 F300 Z-0.1000")), z.segments.forEach((F) => {
        o.push(
          `G1 F${kl} X${gn(F.point.x)} Y${gn(
            e.height - F.point.y
          )} Z-0.1000`
        );
      }), z.closed ? (o.push(
        `G1 F${kl} X${gn(z.segments[0].point.x)} Y${gn(
          e.height - z.segments[0].point.y
        )} Z-0.1000`
      ), a = U) : a = et, o.push(`${e.penUp}; Pen UP`), o.push(`G4 P${Is}; Tool OFF. Job done. `), o.push("G0 Z0; retracting back to z-safe");
    });
  }), { gcode: o.join(Q_), travel: h };
}
const tm = ["href", "download"], em = ["href", "download"], im = {
  __name: "DownloadControls",
  props: {
    layers: {
      type: Array,
      required: !0
    },
    settings: {
      type: Object,
      required: !0
    },
    svgString: {
      type: String,
      required: !0
    }
  },
  emits: ["travel-updated"],
  setup(t, { emit: e }) {
    const n = t, a = e, o = Ts(() => {
      if (!n.layers || !n.settings) return "";
      const { gcode: v, travel: k } = J_(n.layers, n.settings), R = new Blob([v], { type: "text/plain" });
      return a("travel-updated", k), URL.createObjectURL(R);
    }), h = Ts(() => {
      if (!n.layers || !n.settings) return "";
      const v = new Blob([n.svgString], { type: "image/svg+xml" });
      return URL.createObjectURL(v);
    }), _ = Ts(() => `${n.settings.title}`);
    return (v, k) => (nn(), xn(ci, null, [
      Wt("a", {
        class: "icon-link",
        href: o.value,
        download: _.value + ".gcode"
      }, k[0] || (k[0] = [
        Wt("i", { class: "ph-bold ph-download-simple" }, null, -1),
        Ji(" GCODE")
      ]), 8, tm),
      Wt("a", {
        class: "icon-link",
        href: h.value,
        download: _.value + ".svg"
      }, k[1] || (k[1] = [
        Wt("i", { class: "ph-bold ph-download-simple" }, null, -1),
        Ji(" SVG")
      ]), 8, em)
    ], 64));
  }
}, nm = { class: "layers flow width-full" }, rm = {
  __name: "App",
  setup(t) {
    let e = je(""), n = je({ width: 200, height: 200 }), a = je([]);
    const { project: o, artLayer: h, initializeProject: _, resizeCanvas: v, importArtwork: k } = Df();
    let R = je({
      title: "Untitled",
      width: 200,
      height: 200,
      penUp: "M3S18",
      penDown: "M3S26",
      feedRate: 3e3
    });
    const z = je([]), U = (At) => {
      z.value = At;
    };
    let et = je(null), F = je(!1);
    const yt = je(null), it = je(!1), Tt = (At) => {
      R.value = At;
    }, ut = (At) => {
      try {
        a.value = At;
      } catch (Ot) {
        console.log("Couldn't update layers", Ot);
      }
    };
    bn(
      () => [R.value.width, R.value.height],
      ([At, Ot]) => {
        o.value && At && Ot && v(At, Ot, n.value);
      }
    );
    const Qt = async (At) => {
      try {
        const Ot = await k(At);
        return a.value = N_(o.value), R_(Ot, { layers: a.value, viewbox: n.value }), Ot;
      } catch (Ot) {
        throw console.log("Couldn't import artwork", Ot), Ot;
      }
    }, It = async () => {
      try {
        const At = Xg(".canvas");
        e.value = At.node.outerHTML, n.value = {
          width: At.node.viewBox.baseVal.width,
          height: At.node.viewBox.baseVal.height
        }, R.value.width = At.node.viewBox.baseVal.width, R.value.height = At.node.viewBox.baseVal.height, await Qt(e.value), v(R.value.width, R.value.height, n.value);
      } catch (At) {
        console.log(At, "Error updating canvas");
      }
    }, xt = async (At) => {
      const Ot = At.target.files[0];
      if (Ot)
        try {
          const ve = new FileReader();
          ve.onload = async (Ke) => {
            const Ai = Ke.target.result, Ne = document.createElement("div");
            Ne.style.display = "none", Ne.innerHTML = Ai, Ne.querySelector("svg").classList.add("canvas");
            const Pt = document.querySelector(".canvas");
            Pt ? Pt.replaceWith(Ne) : document.body.appendChild(Ne), kt();
          }, ve.readAsText(Ot);
        } catch (ve) {
          console.error("Error reading SVG file:", ve);
        }
    }, ie = () => {
      F.value = !!document.querySelector(".canvas");
    }, kt = () => {
      const At = document.querySelector(".canvas");
      At && yt.value && (yt.value.observe(At, {
        childList: !0,
        subtree: !0,
        attributes: !0,
        attributeFilter: ["class"]
      }), It());
    };
    return Vo(async () => {
      try {
        if (it.value) return;
        const At = document.getElementById("studio");
        if (!At)
          throw new Error("Canvas element not found");
        _(At), it.value = !0, ie(), yt.value = new MutationObserver(() => {
          It();
        });
        const Ot = document.querySelector("h1");
        Ot && (R.value.title = Ot.textContent), kt();
      } catch (At) {
        console.log(At, "Studio mode. Waiting for file upload");
      }
    }), Bo(() => {
      yt.value && yt.value.disconnect(), it.value = !1;
    }), bn(
      a,
      (At) => {
        if (o.value && h.value)
          try {
            const Ot = h.value;
            Ot && Ot instanceof se.Group ? (console.log(Ot, At), F_(Ot, {
              layers: At,
              viewbox: n.value
            }), o.value.view.update()) : console.log("No valid artwork group found");
          } catch (Ot) {
            console.error("Error updating colors:", Ot);
          }
      },
      { flush: "post" }
      // Try different timing
    ), (At, Ot) => (nn(), xn(ci, null, [
      pi(q_, {
        svgString: Ri(e),
        settings: Ri(R),
        viewbox: Ri(n),
        travel: z.value
      }, null, 8, ["svgString", "settings", "viewbox", "travel"]),
      Wt("aside", null, [
        Ot[2] || (Ot[2] = Wt("h2", null, "Studio", -1)),
        Wt("form", null, [
          Ri(F) ? sp("", !0) : (nn(), xn("input", {
            key: 0,
            type: "file",
            ref_key: "fileInput",
            ref: et,
            accept: ".svg",
            onChange: xt,
            class: "file-input"
          }, null, 544)),
          pi(H_, {
            settings: Ri(R),
            "onUpdate:settings": Tt
          }, null, 8, ["settings"])
        ]),
        Ot[3] || (Ot[3] = Wt("hr", null, null, -1)),
        Wt("div", nm, [
          Ot[0] || (Ot[0] = Wt("h3", null, "Features", -1)),
          pi(X_, {
            settings: Ri(R),
            layers: Ri(a),
            "onUpdate:layers": ut
          }, null, 8, ["settings", "layers"]),
          Ot[1] || (Ot[1] = Wt("hr", null, null, -1))
        ]),
        Ot[4] || (Ot[4] = Wt("hr", null, null, -1)),
        pi(im, {
          layers: Ri(a),
          settings: Ri(R),
          svgString: Ri(e),
          onTravelUpdated: U
        }, null, 8, ["layers", "settings", "svgString"])
      ])
    ], 64));
  }
};
function om() {
  const t = Dp(rm);
  return t.use(Up()), t;
}
export {
  om as createStudioApp
};
