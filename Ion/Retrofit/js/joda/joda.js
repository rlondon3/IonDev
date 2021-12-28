﻿//! @version @js-joda/core - 1.11.0
//! @copyright (c) 2015-present, Philipp Thürwächter, Pattrick Hüper & js-joda contributors
//! @copyright (c) 2007-present, Stephen Colebourne & Michael Nascimento Santos
//! @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
var JSJoda = (function (t) {
  'use strict';
  function e(t, e, n) {
    function i(t) {
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = new Error().stack),
        (this.message = t),
        e && e.apply(this, arguments),
        (this.toString = function () {
          return this.name + ': ' + this.message;
        });
    }
    return (
      void 0 === n && (n = Error),
      ((i.prototype = new n()).name = t),
      (i.prototype.constructor = i)
    );
  }
  var M = e('DateTimeException', function (t, e) {
      void 0 === e && (e = null);
      var n = t || this.name;
      null !== e &&
        e instanceof Error &&
        (n += '\n-------\nCaused by: ' + e.stack + '\n-------\n');
      this.message = n;
    }),
    p = e('DateTimeParseException', function (t, e, n, i) {
      void 0 === e && (e = '');
      void 0 === n && (n = 0);
      void 0 === i && (i = null);
      var r = t || this.name;
      (r += ': ' + e + ', at index: ' + n),
        null !== i &&
          i instanceof Error &&
          (r += '\n-------\nCaused by: ' + i.stack + '\n-------\n');
      (this.message = r),
        (this.parsedString = function () {
          return e;
        }),
        (this.errorIndex = function () {
          return n;
        });
    }),
    l = e('UnsupportedTemporalTypeException', null, M),
    S = e('ArithmeticException'),
    c = e('IllegalArgumentException'),
    r = e('IllegalStateException'),
    s = e('NullPointerException');
  function _(t, e) {
    (t.prototype = Object.create(e.prototype)),
      ((t.prototype.constructor = t).__proto__ = e);
  }
  function d(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function m(t, e, n) {
    if (!t) throw n ? new n(e) : new Error(e);
  }
  function E(t, e) {
    if (null == t) throw new s(e + ' must not be null');
    return t;
  }
  function o(t, e, n) {
    if (!(t instanceof e))
      throw new c(
        n +
          ' must be an instance of ' +
          (e.name ? e.name : e) +
          (t && t.constructor && t.constructor.name
            ? ', but is ' + t.constructor.name
            : '')
      );
    return t;
  }
  function n(t) {
    throw new TypeError('abstract method "' + t + '" is not implemented');
  }
  var i,
    a = Object.freeze({
      assert: m,
      requireNonNull: E,
      requireInstance: o,
      abstractMethodFail: n,
    }),
    u = 9007199254740991,
    h = -9007199254740991,
    w =
      ((f.intDiv = function (t, e) {
        var n = t / e;
        return (n = f.roundDown(n)), f.safeZero(n);
      }),
      (f.intMod = function (t, e) {
        var n = t - f.intDiv(t, e) * e;
        return (n = f.roundDown(n)), f.safeZero(n);
      }),
      (f.roundDown = function (t) {
        return t < 0 ? Math.ceil(t) : Math.floor(t);
      }),
      (f.floorDiv = function (t, e) {
        var n = Math.floor(t / e);
        return f.safeZero(n);
      }),
      (f.floorMod = function (t, e) {
        var n = t - f.floorDiv(t, e) * e;
        return f.safeZero(n);
      }),
      (f.safeAdd = function (t, e) {
        if ((f.verifyInt(t), f.verifyInt(e), 0 === t)) return f.safeZero(e);
        if (0 === e) return f.safeZero(t);
        var n = f.safeToInt(t + e);
        if (n === t || n === e)
          throw new S('Invalid addition beyond MAX_SAFE_INTEGER!');
        return n;
      }),
      (f.safeSubtract = function (t, e) {
        return (
          f.verifyInt(t),
          f.verifyInt(e),
          0 === t && 0 === e
            ? 0
            : 0 === t
            ? f.safeZero(-1 * e)
            : 0 === e
            ? f.safeZero(t)
            : f.safeToInt(t - e)
        );
      }),
      (f.safeMultiply = function (t, e) {
        if ((f.verifyInt(t), f.verifyInt(e), 1 === t)) return f.safeZero(e);
        if (1 === e) return f.safeZero(t);
        if (0 === t || 0 === e) return 0;
        var n = f.safeToInt(t * e);
        if (n / e !== t || (t === h && -1 === e) || (e === h && -1 === t))
          throw new S('Multiplication overflows: ' + t + ' * ' + e);
        return n;
      }),
      (f.parseInt =
        ((i = function (t) {
          var e = parseInt(t);
          return f.safeToInt(e);
        }),
        (O.toString = function () {
          return i.toString();
        }),
        O)),
      (f.safeToInt = function (t) {
        return f.verifyInt(t), f.safeZero(t);
      }),
      (f.verifyInt = function (t) {
        if (null == t)
          throw new S(
            "Invalid value: '" + t + "', using null or undefined as argument"
          );
        if (isNaN(t)) throw new S('Invalid int value, using NaN as argument');
        if (t % 1 != 0) throw new S("Invalid value: '" + t + "' is a float");
        if (u < t || t < h) throw new S('Calculation overflows an int: ' + t);
      }),
      (f.safeZero = function (t) {
        return 0 === t ? 0 : +t;
      }),
      (f.compareNumbers = function (t, e) {
        return t < e ? -1 : e < t ? 1 : 0;
      }),
      (f.smi = function (t) {
        return ((t >>> 1) & 1073741824) | (3221225471 & t);
      }),
      (f.hash = function (t) {
        if (t != t || t === 1 / 0) return 0;
        for (var e = t; 4294967295 < t; ) e ^= t /= 4294967295;
        return f.smi(e);
      }),
      (f.hashCode = function () {
        for (
          var t = 17, e = arguments.length, n = new Array(e), i = 0;
          i < e;
          i++
        )
          n[i] = arguments[i];
        for (var r = 0, s = n; r < s.length; r++) {
          var o = s[r];
          t = (t << 5) - t + f.hash(o);
        }
        return f.hash(t);
      }),
      f);
  function f() {}
  function O(t) {
    return i.apply(this, arguments);
  }
  (w.MAX_SAFE_INTEGER = u), (w.MIN_SAFE_INTEGER = h);
  var N,
    D =
      (((N = A.prototype).equals = function (t) {
        return this === t;
      }),
      (N.toString = function () {
        return this._name;
      }),
      (N.toJSON = function () {
        return this.toString();
      }),
      A);
  function A(t) {
    this._name = t;
  }
  var v,
    T =
      (((v = y.prototype).get = function (t) {
        n('get');
      }),
      (v.units = function () {
        n('units');
      }),
      (v.addTo = function (t) {
        n('addTo');
      }),
      (v.subtractFrom = function (t) {
        n('subtractFrom');
      }),
      y);
  function y() {}
  var R,
    g =
      (((R = I.prototype).duration = function () {
        n('duration');
      }),
      (R.isDurationEstimated = function () {
        n('isDurationEstimated');
      }),
      (R.isDateBased = function () {
        n('isDateBased');
      }),
      (R.isTimeBased = function () {
        n('isTimeBased');
      }),
      (R.isSupportedBy = function (t) {
        n('isSupportedBy');
      }),
      (R.addTo = function (t, e) {
        n('addTo');
      }),
      (R.between = function (t, e) {
        n('between');
      }),
      I);
  function I() {}
  var Y = (function (i) {
    function d(t, e) {
      var n;
      return (
        ((n = i.call(this) || this)._seconds = w.safeToInt(t)),
        (n._nanos = w.safeToInt(e)),
        n
      );
    }
    _(d, i),
      (d.ofDays = function (t) {
        return d._create(w.safeMultiply(t, dn.SECONDS_PER_DAY), 0);
      }),
      (d.ofHours = function (t) {
        return d._create(w.safeMultiply(t, dn.SECONDS_PER_HOUR), 0);
      }),
      (d.ofMinutes = function (t) {
        return d._create(w.safeMultiply(t, dn.SECONDS_PER_MINUTE), 0);
      }),
      (d.ofSeconds = function (t, e) {
        void 0 === e && (e = 0);
        var n = w.safeAdd(t, w.floorDiv(e, dn.NANOS_PER_SECOND)),
          i = w.floorMod(e, dn.NANOS_PER_SECOND);
        return d._create(n, i);
      }),
      (d.ofMillis = function (t) {
        var e = w.intDiv(t, 1e3),
          n = w.intMod(t, 1e3);
        return n < 0 && ((n += 1e3), e--), d._create(e, 1e6 * n);
      }),
      (d.ofNanos = function (t) {
        var e = w.intDiv(t, dn.NANOS_PER_SECOND),
          n = w.intMod(t, dn.NANOS_PER_SECOND);
        return n < 0 && ((n += dn.NANOS_PER_SECOND), e--), this._create(e, n);
      }),
      (d.of = function (t, e) {
        return d.ZERO.plus(t, e);
      }),
      (d.from = function (e) {
        E(e, 'amount'), o(e, T);
        var n = d.ZERO;
        return (
          e.units().forEach(function (t) {
            n = n.plus(e.get(t), t);
          }),
          n
        );
      }),
      (d.between = function (t, e) {
        E(t, 'startInclusive'), E(e, 'endExclusive');
        var n = t.until(e, C.SECONDS),
          i = 0;
        if (t.isSupported(b.NANO_OF_SECOND) && e.isSupported(b.NANO_OF_SECOND))
          try {
            var r = t.getLong(b.NANO_OF_SECOND);
            if (((i = e.getLong(b.NANO_OF_SECOND) - r), 0 < n && i < 0))
              i += dn.NANOS_PER_SECOND;
            else if (n < 0 && 0 < i) i -= dn.NANOS_PER_SECOND;
            else if (0 === n && 0 !== i) {
              var s = e.with(b.NANO_OF_SECOND, r);
              n = t.until(s, C.SECONDS);
            }
          } catch (t) {}
        return this.ofSeconds(n, i);
      }),
      (d.parse = function (e) {
        E(e, 'text');
        var t = new RegExp(
          '([-+]?)P(?:([-+]?[0-9]+)D)?(T(?:([-+]?[0-9]+)H)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)(?:[.,]([0-9]{0,9}))?S)?)?',
          'i'
        ).exec(e);
        if (null !== t && ('T' === t[3]) == !1) {
          var n = '-' === t[1],
            i = t[2],
            r = t[4],
            s = t[5],
            o = t[6],
            a = t[7];
          if (null != i || null != r || null != s || null != o) {
            var u = d._parseNumber(e, i, dn.SECONDS_PER_DAY, 'days'),
              h = d._parseNumber(e, r, dn.SECONDS_PER_HOUR, 'hours'),
              f = d._parseNumber(e, s, dn.SECONDS_PER_MINUTE, 'minutes'),
              c = d._parseNumber(e, o, 1, 'seconds'),
              l = null != o && '-' === o.charAt(0),
              _ = d._parseFraction(e, a, l ? -1 : 1);
            try {
              return d._create(n, u, h, f, c, _);
            } catch (t) {
              throw new p(
                'Text cannot be parsed to a Duration: overflow',
                e,
                0,
                t
              );
            }
          }
        }
        throw new p('Text cannot be parsed to a Duration', e, 0);
      }),
      (d._parseNumber = function (e, t, n, i) {
        if (null == t) return 0;
        try {
          return (
            '+' === t[0] && (t = t.substring(1)),
            w.safeMultiply(parseFloat(t), n)
          );
        } catch (t) {
          throw new p('Text cannot be parsed to a Duration: ' + i, e, 0, t);
        }
      }),
      (d._parseFraction = function (t, e, n) {
        return null == e || 0 === e.length
          ? 0
          : ((e = (e + '000000000').substring(0, 9)), parseFloat(e) * n);
      }),
      (d._create = function (t, e, n, i, r, s) {
        return arguments.length <= 2
          ? d._createSecondsNanos(t, e)
          : d._createNegateDaysHoursMinutesSecondsNanos(t, e, n, i, r, s);
      }),
      (d._createNegateDaysHoursMinutesSecondsNanos = function (
        t,
        e,
        n,
        i,
        r,
        s
      ) {
        var o = w.safeAdd(e, w.safeAdd(n, w.safeAdd(i, r)));
        return t ? d.ofSeconds(o, s).negated() : d.ofSeconds(o, s);
      }),
      (d._createSecondsNanos = function (t, e) {
        return (
          void 0 === t && (t = 0),
          void 0 === e && (e = 0),
          0 == (t | e) ? d.ZERO : new d(t, e)
        );
      });
    var t = d.prototype;
    return (
      (t.get = function (t) {
        if (t === C.SECONDS) return this._seconds;
        if (t === C.NANOS) return this._nanos;
        throw new l('Unsupported unit: ' + t);
      }),
      (t.units = function () {
        return [C.SECONDS, C.NANOS];
      }),
      (t.isZero = function () {
        return 0 == (this._seconds | this._nanos);
      }),
      (t.isNegative = function () {
        return this._seconds < 0;
      }),
      (t.seconds = function () {
        return this._seconds;
      }),
      (t.nano = function () {
        return this._nanos;
      }),
      (t.withSeconds = function (t) {
        return d._create(t, this._nanos);
      }),
      (t.withNanos = function (t) {
        return (
          b.NANO_OF_SECOND.checkValidIntValue(t), d._create(this._seconds, t)
        );
      }),
      (t.plusDuration = function (t) {
        return E(t, 'duration'), this.plus(t.seconds(), t.nano());
      }),
      (t.plus = function (t, e) {
        return 1 === arguments.length
          ? this.plusDuration(t)
          : 2 === arguments.length && e instanceof g
          ? this.plusAmountUnit(t, e)
          : this.plusSecondsNanos(t, e);
      }),
      (t.plusAmountUnit = function (t, e) {
        if ((E(t, 'amountToAdd'), E(e, 'unit'), e === C.DAYS))
          return this.plusSecondsNanos(
            w.safeMultiply(t, dn.SECONDS_PER_DAY),
            0
          );
        if (e.isDurationEstimated())
          throw new l('Unit must not have an estimated duration');
        if (0 === t) return this;
        if (e instanceof C) {
          switch (e) {
            case C.NANOS:
              return this.plusNanos(t);
            case C.MICROS:
              return this.plusSecondsNanos(
                1e3 * w.intDiv(t, 1e9),
                1e3 * w.intMod(t, 1e9)
              );
            case C.MILLIS:
              return this.plusMillis(t);
            case C.SECONDS:
              return this.plusSeconds(t);
          }
          return this.plusSecondsNanos(
            w.safeMultiply(e.duration().seconds(), t),
            0
          );
        }
        var n = e.duration().multipliedBy(t);
        return this.plusSecondsNanos(n.seconds(), n.nano());
      }),
      (t.plusDays = function (t) {
        return this.plusSecondsNanos(w.safeMultiply(t, dn.SECONDS_PER_DAY), 0);
      }),
      (t.plusHours = function (t) {
        return this.plusSecondsNanos(w.safeMultiply(t, dn.SECONDS_PER_HOUR), 0);
      }),
      (t.plusMinutes = function (t) {
        return this.plusSecondsNanos(
          w.safeMultiply(t, dn.SECONDS_PER_MINUTE),
          0
        );
      }),
      (t.plusSeconds = function (t) {
        return this.plusSecondsNanos(t, 0);
      }),
      (t.plusMillis = function (t) {
        return this.plusSecondsNanos(w.intDiv(t, 1e3), 1e6 * w.intMod(t, 1e3));
      }),
      (t.plusNanos = function (t) {
        return this.plusSecondsNanos(0, t);
      }),
      (t.plusSecondsNanos = function (t, e) {
        if ((E(t, 'secondsToAdd'), E(e, 'nanosToAdd'), 0 == (t | e)))
          return this;
        var n = w.safeAdd(this._seconds, t);
        (n = w.safeAdd(n, w.intDiv(e, dn.NANOS_PER_SECOND))),
          (e = w.intMod(e, dn.NANOS_PER_SECOND));
        var i = w.safeAdd(this._nanos, e);
        return d.ofSeconds(n, i);
      }),
      (t.minus = function (t, e) {
        return 1 === arguments.length
          ? this.minusDuration(t)
          : this.minusAmountUnit(t, e);
      }),
      (t.minusDuration = function (t) {
        E(t, 'duration');
        var e = t.seconds(),
          n = t.nano();
        return e === h ? this.plus(u, -n) : this.plus(-e, -n);
      }),
      (t.minusAmountUnit = function (t, e) {
        return (
          E(t, 'amountToSubtract'),
          E(e, 'unit'),
          t === h ? this.plusAmountUnit(u, e) : this.plusAmountUnit(-t, e)
        );
      }),
      (t.minusDays = function (t) {
        return t === h ? this.plusDays(u) : this.plusDays(-t);
      }),
      (t.minusHours = function (t) {
        return t === h ? this.plusHours(u) : this.plusHours(-t);
      }),
      (t.minusMinutes = function (t) {
        return t === h ? this.plusMinutes(u) : this.plusMinutes(-t);
      }),
      (t.minusSeconds = function (t) {
        return t === h ? this.plusSeconds(u) : this.plusSeconds(-t);
      }),
      (t.minusMillis = function (t) {
        return t === h ? this.plusMillis(u) : this.plusMillis(-t);
      }),
      (t.minusNanos = function (t) {
        return t === h ? this.plusNanos(u) : this.plusNanos(-t);
      }),
      (t.multipliedBy = function (t) {
        if (0 === t) return d.ZERO;
        if (1 === t) return this;
        var e = w.safeMultiply(this._seconds, t),
          n = w.safeMultiply(this._nanos, t);
        return (
          (e += w.intDiv(n, dn.NANOS_PER_SECOND)),
          (n = w.intMod(n, dn.NANOS_PER_SECOND)),
          d.ofSeconds(e, n)
        );
      }),
      (t.dividedBy = function (t) {
        if (0 === t) throw new S('Cannot divide by zero');
        if (1 === t) return this;
        var e = w.intDiv(this._seconds, t),
          n = w.roundDown((this._seconds / t - e) * dn.NANOS_PER_SECOND),
          i = w.intDiv(this._nanos, t);
        return d.ofSeconds(e, (i = n + i));
      }),
      (t.negated = function () {
        return this.multipliedBy(-1);
      }),
      (t.abs = function () {
        return this.isNegative() ? this.negated() : this;
      }),
      (t.addTo = function (t) {
        return (
          E(t, 'temporal'),
          0 !== this._seconds && (t = t.plus(this._seconds, C.SECONDS)),
          0 !== this._nanos && (t = t.plus(this._nanos, C.NANOS)),
          t
        );
      }),
      (t.subtractFrom = function (t) {
        return (
          E(t, 'temporal'),
          0 !== this._seconds && (t = t.minus(this._seconds, C.SECONDS)),
          0 !== this._nanos && (t = t.minus(this._nanos, C.NANOS)),
          t
        );
      }),
      (t.toDays = function () {
        return w.intDiv(this._seconds, dn.SECONDS_PER_DAY);
      }),
      (t.toHours = function () {
        return w.intDiv(this._seconds, dn.SECONDS_PER_HOUR);
      }),
      (t.toMinutes = function () {
        return w.intDiv(this._seconds, dn.SECONDS_PER_MINUTE);
      }),
      (t.toMillis = function () {
        var t = Math.round(w.safeMultiply(this._seconds, 1e3));
        return (t = w.safeAdd(t, w.intDiv(this._nanos, 1e6)));
      }),
      (t.toNanos = function () {
        var t = w.safeMultiply(this._seconds, dn.NANOS_PER_SECOND);
        return (t = w.safeAdd(t, this._nanos));
      }),
      (t.compareTo = function (t) {
        E(t, 'otherDuration'), o(t, d, 'otherDuration');
        var e = w.compareNumbers(this._seconds, t.seconds());
        return 0 !== e ? e : this._nanos - t.nano();
      }),
      (t.equals = function (t) {
        return (
          this === t ||
          (t instanceof d &&
            this.seconds() === t.seconds() &&
            this.nano() === t.nano())
        );
      }),
      (t.toString = function () {
        if (this === d.ZERO) return 'PT0S';
        var t,
          e = w.intDiv(this._seconds, dn.SECONDS_PER_HOUR),
          n = w.intDiv(
            w.intMod(this._seconds, dn.SECONDS_PER_HOUR),
            dn.SECONDS_PER_MINUTE
          ),
          i = w.intMod(this._seconds, dn.SECONDS_PER_MINUTE),
          r = 'PT';
        if (
          (0 !== e && (r += e + 'H'),
          0 !== n && (r += n + 'M'),
          0 === i && 0 === this._nanos && 2 < r.length)
        )
          return r;
        if (
          (i < 0 && 0 < this._nanos ? (r += -1 === i ? '-0' : i + 1) : (r += i),
          0 < this._nanos)
        )
          for (
            r += '.',
              r += t =
                (t =
                  i < 0
                    ? '' + (2 * dn.NANOS_PER_SECOND - this._nanos)
                    : '' + (dn.NANOS_PER_SECOND + this._nanos)).slice(
                  1,
                  t.length
                );
            '0' === r.charAt(r.length - 1);

          )
            r = r.slice(0, r.length - 1);
        return (r += 'S');
      }),
      (t.toJSON = function () {
        return this.toString();
      }),
      d
    );
  })(T);
  var F = function () {};
  var C = (function (i) {
    function t(t, e) {
      var n;
      return ((n = i.call(this) || this)._name = t), (n._duration = e), n;
    }
    _(t, i);
    var e = t.prototype;
    return (
      (e.duration = function () {
        return this._duration;
      }),
      (e.isDurationEstimated = function () {
        return this.isDateBased() || this === t.FOREVER;
      }),
      (e.isDateBased = function () {
        return 0 <= this.compareTo(t.DAYS) && this !== t.FOREVER;
      }),
      (e.isTimeBased = function () {
        return this.compareTo(t.DAYS) < 0;
      }),
      (e.isSupportedBy = function (e) {
        if (this === t.FOREVER) return !1;
        try {
          return e.plus(1, this), !0;
        } catch (t) {
          try {
            return e.plus(-1, this), !0;
          } catch (t) {
            return !1;
          }
        }
      }),
      (e.addTo = function (t, e) {
        return t.plus(e, this);
      }),
      (e.between = function (t, e) {
        return t.until(e, this);
      }),
      (e.toString = function () {
        return this._name;
      }),
      (e.compareTo = function (t) {
        return this.duration().compareTo(t.duration());
      }),
      t
    );
  })(g);
  function L() {}
  var P,
    U =
      (((P = V.prototype).isFixed = function () {
        return (
          this._minSmallest === this._minLargest &&
          this._maxSmallest === this._maxLargest
        );
      }),
      (P.minimum = function () {
        return this._minSmallest;
      }),
      (P.largestMinimum = function () {
        return this._minLargest;
      }),
      (P.maximum = function () {
        return this._maxLargest;
      }),
      (P.smallestMaximum = function () {
        return this._maxSmallest;
      }),
      (P.isValidValue = function (t) {
        return this.minimum() <= t && t <= this.maximum();
      }),
      (P.checkValidValue = function (t, e) {
        if (!this.isValidValue(t))
          return m(
            !1,
            null != e
              ? 'Invalid value for ' +
                  e +
                  ' (valid values ' +
                  this.toString() +
                  '): ' +
                  t
              : 'Invalid value (valid values ' + this.toString() + '): ' + t,
            M
          );
      }),
      (P.checkValidIntValue = function (t, e) {
        if (!1 === this.isValidIntValue(t))
          throw new M('Invalid int value for ' + e + ': ' + t);
        return t;
      }),
      (P.isValidIntValue = function (t) {
        return this.isIntValue() && this.isValidValue(t);
      }),
      (P.isIntValue = function () {
        return (
          this.minimum() >= w.MIN_SAFE_INTEGER &&
          this.maximum() <= w.MAX_SAFE_INTEGER
        );
      }),
      (P.equals = function (t) {
        return (
          t === this ||
          (t instanceof V &&
            this._minSmallest === t._minSmallest &&
            this._minLargest === t._minLargest &&
            this._maxSmallest === t._maxSmallest &&
            this._maxLargest === t._maxLargest)
        );
      }),
      (P.hashCode = function () {
        return w.hashCode(
          this._minSmallest,
          this._minLargest,
          this._maxSmallest,
          this._maxLargest
        );
      }),
      (P.toString = function () {
        var t =
          this.minimum() +
          (this.minimum() !== this.largestMinimum()
            ? '/' + this.largestMinimum()
            : '');
        return (
          (t += ' - '),
          (t +=
            this.smallestMaximum() +
            (this.smallestMaximum() !== this.maximum()
              ? '/' + this.maximum()
              : ''))
        );
      }),
      (V.of = function (t, e, n, i) {
        return 2 === arguments.length
          ? new V(t, t, e, e)
          : 3 === arguments.length
          ? new V(t, t, e, n)
          : 4 === arguments.length
          ? new V(t, e, n, i)
          : m(!1, 'Invalid number of arguments ' + arguments.length, c);
      }),
      V);
  function V(t, e, n, i) {
    m(
      !(e < t),
      "Smallest minimum value '" +
        t +
        "' must be less than largest minimum value '" +
        e +
        "'",
      c
    ),
      m(
        !(i < n),
        "Smallest maximum value '" +
          n +
          "' must be less than largest maximum value '" +
          i +
          "'",
        c
      ),
      m(
        !(i < e),
        "Minimum value '" + e + "' must be less than maximum value '" + i + "'",
        c
      ),
      (this._minSmallest = t),
      (this._minLargest = e),
      (this._maxLargest = i),
      (this._maxSmallest = n);
  }
  var b = (function (s) {
    function n(t, e, n, i) {
      var r;
      return (
        ((r = s.call(this) || this)._name = t),
        (r._baseUnit = e),
        (r._rangeUnit = n),
        (r._range = i),
        r
      );
    }
    _(n, s),
      (n.byName = function (t) {
        for (var e in n)
          if (n[e] && n[e] instanceof n && n[e].name() === t) return n[e];
      });
    var t = n.prototype;
    return (
      (t.name = function () {
        return this._name;
      }),
      (t.baseUnit = function () {
        return this._baseUnit;
      }),
      (t.rangeUnit = function () {
        return this._rangeUnit;
      }),
      (t.range = function () {
        return this._range;
      }),
      (t.displayName = function () {
        return this.toString();
      }),
      (t.checkValidValue = function (t) {
        return this.range().checkValidValue(t, this.name());
      }),
      (t.isDateBased = function () {
        return (
          this === n.DAY_OF_WEEK ||
          this === n.ALIGNED_DAY_OF_WEEK_IN_MONTH ||
          this === n.ALIGNED_DAY_OF_WEEK_IN_YEAR ||
          this === n.DAY_OF_MONTH ||
          this === n.DAY_OF_YEAR ||
          this === n.EPOCH_DAY ||
          this === n.ALIGNED_WEEK_OF_MONTH ||
          this === n.ALIGNED_WEEK_OF_YEAR ||
          this === n.MONTH_OF_YEAR ||
          this === n.YEAR_OF_ERA ||
          this === n.YEAR ||
          this === n.ERA
        );
      }),
      (t.isTimeBased = function () {
        return (
          this === n.NANO_OF_SECOND ||
          this === n.NANO_OF_DAY ||
          this === n.MICRO_OF_SECOND ||
          this === n.MICRO_OF_DAY ||
          this === n.MILLI_OF_SECOND ||
          this === n.MILLI_OF_DAY ||
          this === n.SECOND_OF_MINUTE ||
          this === n.SECOND_OF_DAY ||
          this === n.MINUTE_OF_HOUR ||
          this === n.MINUTE_OF_DAY ||
          this === n.HOUR_OF_AMPM ||
          this === n.CLOCK_HOUR_OF_AMPM ||
          this === n.HOUR_OF_DAY ||
          this === n.CLOCK_HOUR_OF_DAY ||
          this === n.AMPM_OF_DAY
        );
      }),
      (t.rangeRefinedBy = function (t) {
        return t.range(this);
      }),
      (t.checkValidIntValue = function (t) {
        return this.range().checkValidIntValue(t, this);
      }),
      (t.getFrom = function (t) {
        return t.getLong(this);
      }),
      (t.toString = function () {
        return this.name();
      }),
      (t.equals = function (t) {
        return this === t;
      }),
      n
    );
  })(L);
  var H =
    ((W.zoneId = function () {
      return W.ZONE_ID;
    }),
    (W.chronology = function () {
      return W.CHRONO;
    }),
    (W.precision = function () {
      return W.PRECISION;
    }),
    (W.zone = function () {
      return W.ZONE;
    }),
    (W.offset = function () {
      return W.OFFSET;
    }),
    (W.localDate = function () {
      return W.LOCAL_DATE;
    }),
    (W.localTime = function () {
      return W.LOCAL_TIME;
    }),
    W);
  function W() {}
  var x,
    k =
      (((x = B.prototype).query = function (t) {
        return t === H.zoneId() || t === H.chronology() || t === H.precision()
          ? null
          : t.queryFrom(this);
      }),
      (x.get = function (t) {
        return this.range(t).checkValidIntValue(this.getLong(t), t);
      }),
      (x.range = function (t) {
        if (t instanceof b) {
          if (this.isSupported(t)) return t.range();
          throw new l('Unsupported field: ' + t);
        }
        return t.rangeRefinedBy(this);
      }),
      B);
  function B() {}
  var q,
    Z = (_(z, (q = k)), z);
  function z() {
    return q.apply(this, arguments) || this;
  }
  var K,
    j =
      (_(G, (K = D)),
      (G.prototype.queryFrom = function (t) {
        n('queryFrom');
      }),
      G);
  function G() {
    return K.apply(this, arguments) || this;
  }
  function X(t, e) {
    var n,
      i = (_(r, (n = j)), r);
    function r() {
      return n.apply(this, arguments) || this;
    }
    return (i.prototype.queryFrom = e), new i(t);
  }
  var J,
    Q = (function (i) {
      function n(t, e) {
        var n;
        return ((n = i.call(this) || this)._ordinal = t), (n._name = e), n;
      }
      _(n, i);
      var t = n.prototype;
      return (
        (t.ordinal = function () {
          return this._ordinal;
        }),
        (t.name = function () {
          return this._name;
        }),
        (n.values = function () {
          return J.slice();
        }),
        (n.valueOf = function (t) {
          for (var e = 0; e < J.length && J[e].name() !== t; e++);
          return n.of(e + 1);
        }),
        (n.of = function (t) {
          if (t < 1 || 7 < t) throw new M('Invalid value for DayOfWeek: ' + t);
          return J[t - 1];
        }),
        (n.from = function (e) {
          if ((m(null != e, 'temporal', s), e instanceof n)) return e;
          try {
            return n.of(e.get(b.DAY_OF_WEEK));
          } catch (t) {
            throw t instanceof M
              ? new M(
                  'Unable to obtain DayOfWeek from TemporalAccessor: ' +
                    e +
                    ', type ' +
                    (null != e.constructor ? e.constructor.name : ''),
                  t
                )
              : t;
          }
        }),
        (t.value = function () {
          return this._ordinal + 1;
        }),
        (t.getDisplayName = function (t, e) {
          throw new c('Pattern using (localized) text not implemented yet!');
        }),
        (t.isSupported = function (t) {
          return t instanceof b
            ? t === b.DAY_OF_WEEK
            : null != t && t.isSupportedBy(this);
        }),
        (t.range = function (t) {
          if (t === b.DAY_OF_WEEK) return t.range();
          if (t instanceof b) throw new l('Unsupported field: ' + t);
          return t.rangeRefinedBy(this);
        }),
        (t.get = function (t) {
          return t === b.DAY_OF_WEEK
            ? this.value()
            : this.range(t).checkValidIntValue(this.getLong(t), t);
        }),
        (t.getLong = function (t) {
          if (t === b.DAY_OF_WEEK) return this.value();
          if (t instanceof b) throw new l('Unsupported field: ' + t);
          return t.getFrom(this);
        }),
        (t.plus = function (t) {
          var e = w.floorMod(t, 7);
          return J[w.floorMod(this._ordinal + (e + 7), 7)];
        }),
        (t.minus = function (t) {
          return this.plus(-1 * w.floorMod(t, 7));
        }),
        (t.query = function (t) {
          return t === H.precision()
            ? C.DAYS
            : t === H.localDate() ||
              t === H.localTime() ||
              t === H.chronology() ||
              t === H.zone() ||
              t === H.zoneId() ||
              t === H.offset()
            ? null
            : (m(null != t, 'query', s), t.queryFrom(this));
        }),
        (t.adjustInto = function (t) {
          return E(t, 'temporal'), t.with(b.DAY_OF_WEEK, this.value());
        }),
        (t.equals = function (t) {
          return this === t;
        }),
        (t.toString = function () {
          return this._name;
        }),
        (t.compareTo = function (t) {
          return E(t, 'other'), o(t, n, 'other'), this._ordinal - t._ordinal;
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        n
      );
    })(Z);
  var $,
    tt = (function (i) {
      function r(t, e) {
        var n;
        return (
          ((n = i.call(this) || this)._value = w.safeToInt(t)), (n._name = e), n
        );
      }
      _(r, i);
      var t = r.prototype;
      return (
        (t.value = function () {
          return this._value;
        }),
        (t.ordinal = function () {
          return this._value - 1;
        }),
        (t.name = function () {
          return this._name;
        }),
        (t.getDisplayName = function (t, e) {
          throw new c('Pattern using (localized) text not implemented yet!');
        }),
        (t.isSupported = function (t) {
          return (
            null !== t &&
            (t instanceof b
              ? t === b.MONTH_OF_YEAR
              : null != t && t.isSupportedBy(this))
          );
        }),
        (t.get = function (t) {
          return t === b.MONTH_OF_YEAR
            ? this.value()
            : this.range(t).checkValidIntValue(this.getLong(t), t);
        }),
        (t.getLong = function (t) {
          if (t === b.MONTH_OF_YEAR) return this.value();
          if (t instanceof b) throw new l('Unsupported field: ' + t);
          return t.getFrom(this);
        }),
        (t.plus = function (t) {
          var e = w.intMod(t, 12) + 12,
            n = w.intMod(this.value() + e, 12);
          return r.of((n = 0 === n ? 12 : n));
        }),
        (t.minus = function (t) {
          return this.plus(-1 * w.intMod(t, 12));
        }),
        (t.length = function (t) {
          switch (this) {
            case r.FEBRUARY:
              return t ? 29 : 28;
            case r.APRIL:
            case r.JUNE:
            case r.SEPTEMBER:
            case r.NOVEMBER:
              return 30;
            default:
              return 31;
          }
        }),
        (t.minLength = function () {
          switch (this) {
            case r.FEBRUARY:
              return 28;
            case r.APRIL:
            case r.JUNE:
            case r.SEPTEMBER:
            case r.NOVEMBER:
              return 30;
            default:
              return 31;
          }
        }),
        (t.maxLength = function () {
          switch (this) {
            case r.FEBRUARY:
              return 29;
            case r.APRIL:
            case r.JUNE:
            case r.SEPTEMBER:
            case r.NOVEMBER:
              return 30;
            default:
              return 31;
          }
        }),
        (t.firstDayOfYear = function (t) {
          var e = t ? 1 : 0;
          switch (this) {
            case r.JANUARY:
              return 1;
            case r.FEBRUARY:
              return 32;
            case r.MARCH:
              return 60 + e;
            case r.APRIL:
              return 91 + e;
            case r.MAY:
              return 121 + e;
            case r.JUNE:
              return 152 + e;
            case r.JULY:
              return 182 + e;
            case r.AUGUST:
              return 213 + e;
            case r.SEPTEMBER:
              return 244 + e;
            case r.OCTOBER:
              return 274 + e;
            case r.NOVEMBER:
              return 305 + e;
            case r.DECEMBER:
            default:
              return 335 + e;
          }
        }),
        (t.firstMonthOfQuarter = function () {
          switch (this) {
            case r.JANUARY:
            case r.FEBRUARY:
            case r.MARCH:
              return r.JANUARY;
            case r.APRIL:
            case r.MAY:
            case r.JUNE:
              return r.APRIL;
            case r.JULY:
            case r.AUGUST:
            case r.SEPTEMBER:
              return r.JULY;
            case r.OCTOBER:
            case r.NOVEMBER:
            case r.DECEMBER:
            default:
              return r.OCTOBER;
          }
        }),
        (t.query = function (t) {
          return (
            m(null != t, 'query() parameter must not be null', M),
            t === H.chronology()
              ? an.INSTANCE
              : t === H.precision()
              ? C.MONTHS
              : i.prototype.query.call(this, t)
          );
        }),
        (t.toString = function () {
          switch (this) {
            case r.JANUARY:
              return 'JANUARY';
            case r.FEBRUARY:
              return 'FEBRUARY';
            case r.MARCH:
              return 'MARCH';
            case r.APRIL:
              return 'APRIL';
            case r.MAY:
              return 'MAY';
            case r.JUNE:
              return 'JUNE';
            case r.JULY:
              return 'JULY';
            case r.AUGUST:
              return 'AUGUST';
            case r.SEPTEMBER:
              return 'SEPTEMBER';
            case r.OCTOBER:
              return 'OCTOBER';
            case r.NOVEMBER:
              return 'NOVEMBER';
            case r.DECEMBER:
              return 'DECEMBER';
            default:
              return 'unknown Month, value: ' + this.value();
          }
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        (t.adjustInto = function (t) {
          return t.with(b.MONTH_OF_YEAR, this.value());
        }),
        (t.compareTo = function (t) {
          return E(t, 'other'), o(t, r, 'other'), this._value - t._value;
        }),
        (t.equals = function (t) {
          return this === t;
        }),
        (r.valueOf = function (t) {
          for (var e = 0; e < $.length && $[e].name() !== t; e++);
          return r.of(e + 1);
        }),
        (r.values = function () {
          return $.slice();
        }),
        (r.of = function (t) {
          return (
            (t < 1 || 12 < t) &&
              m(!1, 'Invalid value for MonthOfYear: ' + t, M),
            $[t - 1]
          );
        }),
        (r.from = function (e) {
          if (e instanceof r) return e;
          try {
            return r.of(e.get(b.MONTH_OF_YEAR));
          } catch (t) {
            throw new M(
              'Unable to obtain Month from TemporalAccessor: ' +
                e +
                ' of type ' +
                (e && null != e.constructor ? e.constructor.name : ''),
              t
            );
          }
        }),
        r
      );
    })(Z);
  var et =
      /([-+]?)P(?:([-+]?[0-9]+)Y)?(?:([-+]?[0-9]+)M)?(?:([-+]?[0-9]+)W)?(?:([-+]?[0-9]+)D)?/,
    nt = (function (a) {
      function c(t, e, n) {
        var i;
        i = a.call(this) || this;
        var r = w.safeToInt(t),
          s = w.safeToInt(e),
          o = w.safeToInt(n);
        return 0 == (r | s | o)
          ? (c.ZERO ||
              ((i._years = r), (i._months = s), (i._days = o), (c.ZERO = d(i))),
            c.ZERO || d(i))
          : ((i._years = r), (i._months = s), (i._days = o), i);
      }
      _(c, a),
        (c.ofYears = function (t) {
          return c.create(t, 0, 0);
        }),
        (c.ofMonths = function (t) {
          return c.create(0, t, 0);
        }),
        (c.ofWeeks = function (t) {
          return c.create(0, 0, w.safeMultiply(t, 7));
        }),
        (c.ofDays = function (t) {
          return c.create(0, 0, t);
        }),
        (c.of = function (t, e, n) {
          return c.create(t, e, n);
        }),
        (c.from = function (t) {
          if (t instanceof c) return t;
          E(t, 'amount');
          for (
            var e = 0, n = 0, i = 0, r = t.units(), s = 0;
            s < r.length;
            s++
          ) {
            var o = r[s],
              a = t.get(o);
            if (o === C.YEARS) e = w.safeToInt(a);
            else if (o === C.MONTHS) n = w.safeToInt(a);
            else {
              if (o !== C.DAYS)
                throw new M('Unit must be Years, Months or Days, but was ' + o);
              i = w.safeToInt(a);
            }
          }
          return c.create(e, n, i);
        }),
        (c.between = function (t, e) {
          return (
            E(t, 'startDate'),
            E(e, 'endDate'),
            o(t, cn, 'startDate'),
            o(e, cn, 'endDate'),
            t.until(e)
          );
        }),
        (c.parse = function (e) {
          E(e, 'text');
          try {
            return c._parse(e);
          } catch (t) {
            throw t instanceof S
              ? new p('Text cannot be parsed to a Period', e, 0, t)
              : t;
          }
        }),
        (c._parse = function (t) {
          var e = et.exec(t);
          if (null != e) {
            var n = '-' === e[1] ? -1 : 1,
              i = e[2],
              r = e[3],
              s = e[4],
              o = e[5];
            if (null != i || null != r || null != s || null != o) {
              var a = c._parseNumber(t, i, n),
                u = c._parseNumber(t, r, n),
                h = c._parseNumber(t, s, n),
                f = c._parseNumber(t, o, n);
              return (
                (f = w.safeAdd(f, w.safeMultiply(h, 7))), c.create(a, u, f)
              );
            }
          }
          throw new p('Text cannot be parsed to a Period', t, 0);
        }),
        (c._parseNumber = function (t, e, n) {
          if (null == e) return 0;
          var i = w.parseInt(e);
          return w.safeMultiply(i, n);
        }),
        (c.create = function (t, e, n) {
          return new c(t, e, n);
        });
      var t = c.prototype;
      return (
        (t.units = function () {
          return [C.YEARS, C.MONTHS, C.DAYS];
        }),
        (t.chronology = function () {
          return an.INSTANCE;
        }),
        (t.get = function (t) {
          if (t === C.YEARS) return this._years;
          if (t === C.MONTHS) return this._months;
          if (t === C.DAYS) return this._days;
          throw new l('Unsupported unit: ' + t);
        }),
        (t.isZero = function () {
          return this === c.ZERO;
        }),
        (t.isNegative = function () {
          return this._years < 0 || this._months < 0 || this._days < 0;
        }),
        (t.years = function () {
          return this._years;
        }),
        (t.months = function () {
          return this._months;
        }),
        (t.days = function () {
          return this._days;
        }),
        (t.withYears = function (t) {
          return t === this._years
            ? this
            : c.create(t, this._months, this._days);
        }),
        (t.withMonths = function (t) {
          return t === this._months
            ? this
            : c.create(this._years, t, this._days);
        }),
        (t.withDays = function (t) {
          return t === this._days
            ? this
            : c.create(this._years, this._months, t);
        }),
        (t.plus = function (t) {
          var e = c.from(t);
          return c.create(
            w.safeAdd(this._years, e._years),
            w.safeAdd(this._months, e._months),
            w.safeAdd(this._days, e._days)
          );
        }),
        (t.plusYears = function (t) {
          return 0 === t
            ? this
            : c.create(
                w.safeToInt(w.safeAdd(this._years, t)),
                this._months,
                this._days
              );
        }),
        (t.plusMonths = function (t) {
          return 0 === t
            ? this
            : c.create(
                this._years,
                w.safeToInt(w.safeAdd(this._months, t)),
                this._days
              );
        }),
        (t.plusDays = function (t) {
          return 0 === t
            ? this
            : c.create(
                this._years,
                this._months,
                w.safeToInt(w.safeAdd(this._days, t))
              );
        }),
        (t.minus = function (t) {
          var e = c.from(t);
          return c.create(
            w.safeSubtract(this._years, e._years),
            w.safeSubtract(this._months, e._months),
            w.safeSubtract(this._days, e._days)
          );
        }),
        (t.minusYears = function (t) {
          return this.plusYears(-1 * t);
        }),
        (t.minusMonths = function (t) {
          return this.plusMonths(-1 * t);
        }),
        (t.minusDays = function (t) {
          return this.plusDays(-1 * t);
        }),
        (t.multipliedBy = function (t) {
          return this === c.ZERO || 1 === t
            ? this
            : c.create(
                w.safeMultiply(this._years, t),
                w.safeMultiply(this._months, t),
                w.safeMultiply(this._days, t)
              );
        }),
        (t.negated = function () {
          return this.multipliedBy(-1);
        }),
        (t.normalized = function () {
          var t = this.toTotalMonths(),
            e = w.intDiv(t, 12),
            n = w.intMod(t, 12);
          return e === this._years && n === this._months
            ? this
            : c.create(w.safeToInt(e), n, this._days);
        }),
        (t.toTotalMonths = function () {
          return 12 * this._years + this._months;
        }),
        (t.addTo = function (t) {
          return (
            E(t, 'temporal'),
            0 !== this._years
              ? (t =
                  0 !== this._months
                    ? t.plus(this.toTotalMonths(), C.MONTHS)
                    : t.plus(this._years, C.YEARS))
              : 0 !== this._months && (t = t.plus(this._months, C.MONTHS)),
            0 !== this._days && (t = t.plus(this._days, C.DAYS)),
            t
          );
        }),
        (t.subtractFrom = function (t) {
          return (
            E(t, 'temporal'),
            0 !== this._years
              ? (t =
                  0 !== this._months
                    ? t.minus(this.toTotalMonths(), C.MONTHS)
                    : t.minus(this._years, C.YEARS))
              : 0 !== this._months && (t = t.minus(this._months, C.MONTHS)),
            0 !== this._days && (t = t.minus(this._days, C.DAYS)),
            t
          );
        }),
        (t.equals = function (t) {
          if (this === t) return !0;
          if (t instanceof c) {
            var e = t;
            return (
              this._years === e._years &&
              this._months === e._months &&
              this._days === e._days
            );
          }
          return !1;
        }),
        (t.hashCode = function () {
          return w.hashCode(this._years, this._months, this._days);
        }),
        (t.toString = function () {
          if (this === c.ZERO) return 'P0D';
          var t = 'P';
          return (
            0 !== this._years && (t += this._years + 'Y'),
            0 !== this._months && (t += this._months + 'M'),
            0 !== this._days && (t += this._days + 'D'),
            t
          );
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        c
      );
    })(T);
  var it,
    rt =
      (((it = st.prototype).getIndex = function () {
        return this._index;
      }),
      (it.setIndex = function (t) {
        this._index = t;
      }),
      (it.getErrorIndex = function () {
        return this._errorIndex;
      }),
      (it.setErrorIndex = function (t) {
        this._errorIndex = t;
      }),
      st);
  function st(t) {
    (this._index = t), (this._errorIndex = -1);
  }
  var ot,
    at =
      (((ot = ut.prototype).putAll = function (t) {
        for (var e in t._map) this._map[e] = t._map[e];
        return this;
      }),
      (ot.containsKey = function (t) {
        return this._map.hasOwnProperty(t.name()) && void 0 !== this.get(t);
      }),
      (ot.get = function (t) {
        return this._map[t.name()];
      }),
      (ot.put = function (t, e) {
        return this.set(t, e);
      }),
      (ot.set = function (t, e) {
        return (this._map[t.name()] = e), this;
      }),
      (ot.retainAll = function (t) {
        for (var e = {}, n = 0; n < t.length; n++) {
          var i = t[n].name();
          e[i] = this._map[i];
        }
        return (this._map = e), this;
      }),
      (ot.remove = function (t) {
        var e = t.name(),
          n = this._map[e];
        return (this._map[e] = void 0), n;
      }),
      (ot.keySet = function () {
        return this._map;
      }),
      (ot.clear = function () {
        this._map = {};
      }),
      ut);
  function ut() {
    this._map = {};
  }
  var ht,
    ft = (_(ct, (ht = D)), ct);
  function ct() {
    return ht.apply(this, arguments) || this;
  }
  (ft.STRICT = new ft('STRICT')),
    (ft.SMART = new ft('SMART')),
    (ft.LENIENT = new ft('LENIENT'));
  var lt = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      _(t, e);
      var n = t.prototype;
      return (
        (n.isSupported = function (t) {
          return t instanceof b
            ? t.isDateBased()
            : t instanceof C
            ? t.isDateBased()
            : null != t && t.isSupportedBy(this);
        }),
        (n.query = function (t) {
          return t === H.chronology()
            ? this.chronology()
            : t === H.precision()
            ? C.DAYS
            : t === H.localDate()
            ? cn.ofEpochDay(this.toEpochDay())
            : t === H.localTime() ||
              t === H.zone() ||
              t === H.zoneId() ||
              t === H.offset()
            ? null
            : e.prototype.query.call(this, t);
        }),
        (n.adjustInto = function (t) {
          return t.with(b.EPOCH_DAY, this.toEpochDay());
        }),
        (n.format = function (t) {
          return E(t, 'formatter'), o(t, We, 'formatter'), t.format(this);
        }),
        t
      );
    })(Z),
    _t =
      ((dt.startsWith = function (t, e) {
        return 0 === t.indexOf(e);
      }),
      (dt.hashCode = function (t) {
        var e = t.length;
        if (0 === e) return 0;
        for (var n = 0, i = 0; i < e; i++)
          (n = (n << 5) - n + t.charCodeAt(i)), (n |= 0);
        return w.smi(n);
      }),
      dt);
  function dt() {}
  var pt = (function () {
      function e() {}
      (e.systemDefault = function () {
        throw new M('not supported operation');
      }),
        (e.getAvailableZoneIds = function () {
          throw new M('not supported operation');
        }),
        (e.of = function (t) {
          throw new M('not supported operation' + t);
        }),
        (e.ofOffset = function (t, e) {
          throw new M('not supported operation' + t + e);
        }),
        (e.from = function (t) {
          throw new M('not supported operation' + t);
        });
      var t = e.prototype;
      return (
        (t.id = function () {
          n('ZoneId.id');
        }),
        (t.rules = function () {
          n('ZoneId.rules');
        }),
        (t.normalized = function () {
          var t = this.rules();
          return t.isFixedOffset() ? t.offset(pn.EPOCH) : this;
        }),
        (t.equals = function (t) {
          return this === t || (t instanceof e && this.id() === t.id());
        }),
        (t.hashCode = function () {
          return _t.hashCode(this.id());
        }),
        (t.toString = function () {
          return this.id();
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        e
      );
    })(),
    Et = (function () {
      function t() {}
      t.of = function (t) {
        return E(t, 'offset'), new Ot(t);
      };
      var e = t.prototype;
      return (
        (e.isFixedOffset = function () {
          n('ZoneRules.isFixedOffset');
        }),
        (e.offset = function (t) {
          return t instanceof pn
            ? this.offsetOfInstant(t)
            : this.offsetOfLocalDateTime(t);
        }),
        (e.offsetOfInstant = function (t) {
          n('ZoneRules.offsetInstant');
        }),
        (e.offsetOfEpochMilli = function (t) {
          n('ZoneRules.offsetOfEpochMilli');
        }),
        (e.offsetOfLocalDateTime = function (t) {
          n('ZoneRules.offsetLocalDateTime');
        }),
        (e.validOffsets = function (t) {
          n('ZoneRules.validOffsets');
        }),
        (e.transition = function (t) {
          n('ZoneRules.transition');
        }),
        (e.standardOffset = function (t) {
          n('ZoneRules.standardOffset');
        }),
        (e.daylightSavings = function (t) {
          n('ZoneRules.daylightSavings');
        }),
        (e.isDaylightSavings = function (t) {
          n('ZoneRules.isDaylightSavings');
        }),
        (e.isValidOffset = function (t, e) {
          n('ZoneRules.isValidOffset');
        }),
        (e.nextTransition = function (t) {
          n('ZoneRules.nextTransition');
        }),
        (e.previousTransition = function (t) {
          n('ZoneRules.previousTransition');
        }),
        (e.transitions = function () {
          n('ZoneRules.transitions');
        }),
        (e.transitionRules = function () {
          n('ZoneRules.transitionRules');
        }),
        (e.toString = function () {
          n('ZoneRules.toString');
        }),
        (e.toJSON = function () {
          return this.toString();
        }),
        t
      );
    })(),
    Ot = (function (n) {
      function e(t) {
        var e;
        return ((e = n.call(this) || this)._offset = t), e;
      }
      _(e, n);
      var t = e.prototype;
      return (
        (t.isFixedOffset = function () {
          return !0;
        }),
        (t.offsetOfInstant = function () {
          return this._offset;
        }),
        (t.offsetOfEpochMilli = function () {
          return this._offset;
        }),
        (t.offsetOfLocalDateTime = function () {
          return this._offset;
        }),
        (t.validOffsets = function () {
          return [this._offset];
        }),
        (t.transition = function () {
          return null;
        }),
        (t.standardOffset = function () {
          return this._offset;
        }),
        (t.daylightSavings = function () {
          return Y.ZERO;
        }),
        (t.isDaylightSavings = function () {
          return !1;
        }),
        (t.isValidOffset = function (t, e) {
          return this._offset.equals(e);
        }),
        (t.nextTransition = function () {
          return null;
        }),
        (t.previousTransition = function () {
          return null;
        }),
        (t.transitions = function () {
          return [];
        }),
        (t.transitionRules = function () {
          return [];
        }),
        (t.equals = function (t) {
          return (
            this === t || (t instanceof e && this._offset.equals(t._offset))
          );
        }),
        (t.toString = function () {
          return 'FixedRules:' + this._offset.toString();
        }),
        e
      );
    })(Et),
    St = {},
    mt = {},
    Nt = (function (n) {
      function o(t) {
        var e;
        return (
          (e = n.call(this) || this),
          o._validateTotalSeconds(t),
          (e._totalSeconds = w.safeToInt(t)),
          (e._rules = Et.of(d(e))),
          (e._id = o._buildId(t)),
          e
        );
      }
      _(o, n);
      var t = o.prototype;
      return (
        (t.totalSeconds = function () {
          return this._totalSeconds;
        }),
        (t.id = function () {
          return this._id;
        }),
        (o._buildId = function (t) {
          if (0 === t) return 'Z';
          var e = Math.abs(t),
            n = w.intDiv(e, dn.SECONDS_PER_HOUR),
            i = w.intMod(
              w.intDiv(e, dn.SECONDS_PER_MINUTE),
              dn.MINUTES_PER_HOUR
            ),
            r =
              (t < 0 ? '-' : '+') +
              (n < 10 ? '0' : '') +
              n +
              (i < 10 ? ':0' : ':') +
              i,
            s = w.intMod(e, dn.SECONDS_PER_MINUTE);
          return 0 !== s && (r += (s < 10 ? ':0' : ':') + s), r;
        }),
        (o._validateTotalSeconds = function (t) {
          if (Math.abs(t) > o.MAX_SECONDS)
            throw new M('Zone offset not in valid range: -18:00 to +18:00');
        }),
        (o._validate = function (t, e, n) {
          if (t < -18 || 18 < t)
            throw new M(
              'Zone offset hours not in valid range: value ' +
                t +
                ' is not in the range -18 to 18'
            );
          if (0 < t) {
            if (e < 0 || n < 0)
              throw new M(
                'Zone offset minutes and seconds must be positive because hours is positive'
              );
          } else if (t < 0) {
            if (0 < e || 0 < n)
              throw new M(
                'Zone offset minutes and seconds must be negative because hours is negative'
              );
          } else if ((0 < e && n < 0) || (e < 0 && 0 < n))
            throw new M(
              'Zone offset minutes and seconds must have the same sign'
            );
          if (59 < Math.abs(e))
            throw new M(
              'Zone offset minutes not in valid range: abs(value) ' +
                Math.abs(e) +
                ' is not in the range 0 to 59'
            );
          if (59 < Math.abs(n))
            throw new M(
              'Zone offset seconds not in valid range: abs(value) ' +
                Math.abs(n) +
                ' is not in the range 0 to 59'
            );
          if (18 === Math.abs(t) && (0 < Math.abs(e) || 0 < Math.abs(n)))
            throw new M('Zone offset not in valid range: -18:00 to +18:00');
        }),
        (o.of = function (t) {
          E(t, 'offsetId');
          var e,
            n,
            i,
            r = mt[t];
          if (null != r) return r;
          switch (t.length) {
            case 2:
              t = t[0] + '0' + t[1];
            case 3:
              (e = o._parseNumber(t, 1, !1)), (i = n = 0);
              break;
            case 5:
              (e = o._parseNumber(t, 1, !1)),
                (n = o._parseNumber(t, 3, !1)),
                (i = 0);
              break;
            case 6:
              (e = o._parseNumber(t, 1, !1)),
                (n = o._parseNumber(t, 4, !0)),
                (i = 0);
              break;
            case 7:
              (e = o._parseNumber(t, 1, !1)),
                (n = o._parseNumber(t, 3, !1)),
                (i = o._parseNumber(t, 5, !1));
              break;
            case 9:
              (e = o._parseNumber(t, 1, !1)),
                (n = o._parseNumber(t, 4, !0)),
                (i = o._parseNumber(t, 7, !0));
              break;
            default:
              throw new M('Invalid ID for ZoneOffset, invalid format: ' + t);
          }
          var s = t[0];
          if ('+' !== s && '-' !== s)
            throw new M(
              'Invalid ID for ZoneOffset, plus/minus not found when expected: ' +
                t
            );
          return '-' === s
            ? o.ofHoursMinutesSeconds(-e, -n, -i)
            : o.ofHoursMinutesSeconds(e, n, i);
        }),
        (o._parseNumber = function (t, e, n) {
          if (n && ':' !== t[e - 1])
            throw new M(
              'Invalid ID for ZoneOffset, colon not found when expected: ' + t
            );
          var i = t[e],
            r = t[e + 1];
          if (i < '0' || '9' < i || r < '0' || '9' < r)
            throw new M(
              'Invalid ID for ZoneOffset, non numeric characters found: ' + t
            );
          return 10 * (i.charCodeAt(0) - 48) + (r.charCodeAt(0) - 48);
        }),
        (o.ofHours = function (t) {
          return o.ofHoursMinutesSeconds(t, 0, 0);
        }),
        (o.ofHoursMinutes = function (t, e) {
          return o.ofHoursMinutesSeconds(t, e, 0);
        }),
        (o.ofHoursMinutesSeconds = function (t, e, n) {
          o._validate(t, e, n);
          var i = t * dn.SECONDS_PER_HOUR + e * dn.SECONDS_PER_MINUTE + n;
          return o.ofTotalSeconds(i);
        }),
        (o.ofTotalMinutes = function (t) {
          var e = t * dn.SECONDS_PER_MINUTE;
          return o.ofTotalSeconds(e);
        }),
        (o.ofTotalSeconds = function (t) {
          if (t % (15 * dn.SECONDS_PER_MINUTE) != 0) return new o(t);
          var e = t,
            n = St[e];
          return (
            null == n && ((n = new o(t)), (St[e] = n), (mt[n.id()] = n)), n
          );
        }),
        (t.rules = function () {
          return this._rules;
        }),
        (t.get = function (t) {
          return this.getLong(t);
        }),
        (t.getLong = function (t) {
          if (t === b.OFFSET_SECONDS) return this._totalSeconds;
          if (t instanceof b) throw new M('Unsupported field: ' + t);
          return t.getFrom(this);
        }),
        (t.query = function (t) {
          return (
            E(t, 'query'),
            t === H.offset() || t === H.zone()
              ? this
              : t === H.localDate() ||
                t === H.localTime() ||
                t === H.precision() ||
                t === H.chronology() ||
                t === H.zoneId()
              ? null
              : t.queryFrom(this)
          );
        }),
        (t.adjustInto = function (t) {
          return t.with(b.OFFSET_SECONDS, this._totalSeconds);
        }),
        (t.compareTo = function (t) {
          return E(t, 'other'), t._totalSeconds - this._totalSeconds;
        }),
        (t.equals = function (t) {
          return (
            this === t ||
            (t instanceof o && this._totalSeconds === t._totalSeconds)
          );
        }),
        (t.hashCode = function () {
          return this._totalSeconds;
        }),
        (t.toString = function () {
          return this._id;
        }),
        o
      );
    })(pt);
  var Dt,
    At = (function (e) {
      function i() {
        var t;
        return (
          ((t = e.call(this) || this).fieldValues = new at()),
          (t.chrono = null),
          (t.zone = null),
          (t.date = null),
          (t.time = null),
          (t.leapSecond = !1),
          (t.excessDays = null),
          t
        );
      }
      _(i, e),
        (i.create = function (t, e) {
          var n = new i();
          return n._addFieldValue(t, e), n;
        });
      var t = i.prototype;
      return (
        (t.getFieldValue0 = function (t) {
          return this.fieldValues.get(t);
        }),
        (t._addFieldValue = function (t, e) {
          E(t, 'field');
          var n = this.getFieldValue0(t);
          if (null != n && n !== e)
            throw new M(
              'Conflict found: ' +
                t +
                ' ' +
                n +
                ' differs from ' +
                t +
                ' ' +
                e +
                ': ' +
                this
            );
          return this._putFieldValue0(t, e);
        }),
        (t._putFieldValue0 = function (t, e) {
          return this.fieldValues.put(t, e), this;
        }),
        (t.resolve = function (t, e) {
          return (
            null != e && this.fieldValues.retainAll(e),
            this._mergeDate(t),
            this._mergeTime(t),
            this._resolveTimeInferZeroes(t),
            null != this.excessDays &&
              !1 === this.excessDays.isZero() &&
              null != this.date &&
              null != this.time &&
              ((this.date = this.date.plus(this.excessDays)),
              (this.excessDays = nt.ZERO)),
            this._resolveInstant(),
            this
          );
        }),
        (t._mergeDate = function (t) {
          this._checkDate(an.INSTANCE.resolveDate(this.fieldValues, t));
        }),
        (t._checkDate = function (t) {
          if (null != t)
            for (var e in (this._addObject(t), this.fieldValues.keySet())) {
              var n = b.byName(e);
              if (n && void 0 !== this.fieldValues.get(n) && n.isDateBased()) {
                var i = void 0;
                try {
                  i = t.getLong(n);
                } catch (t) {
                  if (t instanceof M) continue;
                  throw t;
                }
                var r = this.fieldValues.get(n);
                if (i !== r)
                  throw new M(
                    'Conflict found: Field ' +
                      n +
                      ' ' +
                      i +
                      ' differs from ' +
                      n +
                      ' ' +
                      r +
                      ' derived from ' +
                      t
                  );
              }
            }
        }),
        (t._mergeTime = function (t) {
          if (this.fieldValues.containsKey(b.CLOCK_HOUR_OF_DAY)) {
            var e = this.fieldValues.remove(b.CLOCK_HOUR_OF_DAY);
            t !== ft.LENIENT &&
              ((t === ft.SMART && 0 === e) ||
                b.CLOCK_HOUR_OF_DAY.checkValidValue(e)),
              this._addFieldValue(b.HOUR_OF_DAY, 24 === e ? 0 : e);
          }
          if (this.fieldValues.containsKey(b.CLOCK_HOUR_OF_AMPM)) {
            var n = this.fieldValues.remove(b.CLOCK_HOUR_OF_AMPM);
            t !== ft.LENIENT &&
              ((t === ft.SMART && 0 === n) ||
                b.CLOCK_HOUR_OF_AMPM.checkValidValue(n)),
              this._addFieldValue(b.HOUR_OF_AMPM, 12 === n ? 0 : n);
          }
          if (
            (t !== ft.LENIENT &&
              (this.fieldValues.containsKey(b.AMPM_OF_DAY) &&
                b.AMPM_OF_DAY.checkValidValue(
                  this.fieldValues.get(b.AMPM_OF_DAY)
                ),
              this.fieldValues.containsKey(b.HOUR_OF_AMPM) &&
                b.HOUR_OF_AMPM.checkValidValue(
                  this.fieldValues.get(b.HOUR_OF_AMPM)
                )),
            this.fieldValues.containsKey(b.AMPM_OF_DAY) &&
              this.fieldValues.containsKey(b.HOUR_OF_AMPM))
          ) {
            var i = this.fieldValues.remove(b.AMPM_OF_DAY),
              r = this.fieldValues.remove(b.HOUR_OF_AMPM);
            this._addFieldValue(b.HOUR_OF_DAY, 12 * i + r);
          }
          if (this.fieldValues.containsKey(b.NANO_OF_DAY)) {
            var s = this.fieldValues.remove(b.NANO_OF_DAY);
            t !== ft.LENIENT && b.NANO_OF_DAY.checkValidValue(s),
              this._addFieldValue(b.SECOND_OF_DAY, w.intDiv(s, 1e9)),
              this._addFieldValue(b.NANO_OF_SECOND, w.intMod(s, 1e9));
          }
          if (this.fieldValues.containsKey(b.MICRO_OF_DAY)) {
            var o = this.fieldValues.remove(b.MICRO_OF_DAY);
            t !== ft.LENIENT && b.MICRO_OF_DAY.checkValidValue(o),
              this._addFieldValue(b.SECOND_OF_DAY, w.intDiv(o, 1e6)),
              this._addFieldValue(b.MICRO_OF_SECOND, w.intMod(o, 1e6));
          }
          if (this.fieldValues.containsKey(b.MILLI_OF_DAY)) {
            var a = this.fieldValues.remove(b.MILLI_OF_DAY);
            t !== ft.LENIENT && b.MILLI_OF_DAY.checkValidValue(a),
              this._addFieldValue(b.SECOND_OF_DAY, w.intDiv(a, 1e3)),
              this._addFieldValue(b.MILLI_OF_SECOND, w.intMod(a, 1e3));
          }
          if (this.fieldValues.containsKey(b.SECOND_OF_DAY)) {
            var u = this.fieldValues.remove(b.SECOND_OF_DAY);
            t !== ft.LENIENT && b.SECOND_OF_DAY.checkValidValue(u),
              this._addFieldValue(b.HOUR_OF_DAY, w.intDiv(u, 3600)),
              this._addFieldValue(
                b.MINUTE_OF_HOUR,
                w.intMod(w.intDiv(u, 60), 60)
              ),
              this._addFieldValue(b.SECOND_OF_MINUTE, w.intMod(u, 60));
          }
          if (this.fieldValues.containsKey(b.MINUTE_OF_DAY)) {
            var h = this.fieldValues.remove(b.MINUTE_OF_DAY);
            t !== ft.LENIENT && b.MINUTE_OF_DAY.checkValidValue(h),
              this._addFieldValue(b.HOUR_OF_DAY, w.intDiv(h, 60)),
              this._addFieldValue(b.MINUTE_OF_HOUR, w.intMod(h, 60));
          }
          if (
            (t !== ft.LENIENT &&
              (this.fieldValues.containsKey(b.MILLI_OF_SECOND) &&
                b.MILLI_OF_SECOND.checkValidValue(
                  this.fieldValues.get(b.MILLI_OF_SECOND)
                ),
              this.fieldValues.containsKey(b.MICRO_OF_SECOND) &&
                b.MICRO_OF_SECOND.checkValidValue(
                  this.fieldValues.get(b.MICRO_OF_SECOND)
                )),
            this.fieldValues.containsKey(b.MILLI_OF_SECOND) &&
              this.fieldValues.containsKey(b.MICRO_OF_SECOND))
          ) {
            var f = this.fieldValues.remove(b.MILLI_OF_SECOND),
              c = this.fieldValues.get(b.MICRO_OF_SECOND);
            this._putFieldValue0(b.MICRO_OF_SECOND, 1e3 * f + w.intMod(c, 1e3));
          }
          if (
            this.fieldValues.containsKey(b.MICRO_OF_SECOND) &&
            this.fieldValues.containsKey(b.NANO_OF_SECOND)
          ) {
            var l = this.fieldValues.get(b.NANO_OF_SECOND);
            this._putFieldValue0(b.MICRO_OF_SECOND, w.intDiv(l, 1e3)),
              this.fieldValues.remove(b.MICRO_OF_SECOND);
          }
          if (
            this.fieldValues.containsKey(b.MILLI_OF_SECOND) &&
            this.fieldValues.containsKey(b.NANO_OF_SECOND)
          ) {
            var _ = this.fieldValues.get(b.NANO_OF_SECOND);
            this._putFieldValue0(b.MILLI_OF_SECOND, w.intDiv(_, 1e6)),
              this.fieldValues.remove(b.MILLI_OF_SECOND);
          }
          if (this.fieldValues.containsKey(b.MICRO_OF_SECOND)) {
            var d = this.fieldValues.remove(b.MICRO_OF_SECOND);
            this._putFieldValue0(b.NANO_OF_SECOND, 1e3 * d);
          } else if (this.fieldValues.containsKey(b.MILLI_OF_SECOND)) {
            var p = this.fieldValues.remove(b.MILLI_OF_SECOND);
            this._putFieldValue0(b.NANO_OF_SECOND, 1e6 * p);
          }
        }),
        (t._resolveTimeInferZeroes = function (t) {
          var e = this.fieldValues.get(b.HOUR_OF_DAY),
            n = this.fieldValues.get(b.MINUTE_OF_HOUR),
            i = this.fieldValues.get(b.SECOND_OF_MINUTE),
            r = this.fieldValues.get(b.NANO_OF_SECOND);
          if (
            null != e &&
            (null != n || (null == i && null == r)) &&
            (null == n || null != i || null == r)
          ) {
            if (t !== ft.LENIENT) {
              if (null != e) {
                t !== ft.SMART ||
                  24 !== e ||
                  (null != n && 0 !== n) ||
                  (null != i && 0 !== i) ||
                  (null != r && 0 !== r) ||
                  ((e = 0), (this.excessDays = nt.ofDays(1)));
                var s = b.HOUR_OF_DAY.checkValidIntValue(e);
                if (null != n) {
                  var o = b.MINUTE_OF_HOUR.checkValidIntValue(n);
                  if (null != i) {
                    var a = b.SECOND_OF_MINUTE.checkValidIntValue(i);
                    if (null != r) {
                      var u = b.NANO_OF_SECOND.checkValidIntValue(r);
                      this._addObject(dn.of(s, o, a, u));
                    } else this._addObject(dn.of(s, o, a));
                  } else null == r && this._addObject(dn.of(s, o));
                } else null == i && null == r && this._addObject(dn.of(s, 0));
              }
            } else if (null != e) {
              var h = e;
              if (null != n)
                if (null != i) {
                  null == r && (r = 0);
                  var f = w.safeMultiply(h, 36e11);
                  (f = w.safeAdd(f, w.safeMultiply(n, 6e10))),
                    (f = w.safeAdd(f, w.safeMultiply(i, 1e9))),
                    (f = w.safeAdd(f, r));
                  var c = w.floorDiv(f, 864e11),
                    l = w.floorMod(f, 864e11);
                  this._addObject(dn.ofNanoOfDay(l)),
                    (this.excessDays = nt.ofDays(c));
                } else {
                  var _ = w.safeMultiply(h, 3600);
                  _ = w.safeAdd(_, w.safeMultiply(n, 60));
                  var d = w.floorDiv(_, 86400),
                    p = w.floorMod(_, 86400);
                  this._addObject(dn.ofSecondOfDay(p)),
                    (this.excessDays = nt.ofDays(d));
                }
              else {
                var E = w.safeToInt(w.floorDiv(h, 24));
                (h = w.floorMod(h, 24)),
                  this._addObject(dn.of(h, 0)),
                  (this.excessDays = nt.ofDays(E));
              }
            }
            this.fieldValues.remove(b.HOUR_OF_DAY),
              this.fieldValues.remove(b.MINUTE_OF_HOUR),
              this.fieldValues.remove(b.SECOND_OF_MINUTE),
              this.fieldValues.remove(b.NANO_OF_SECOND);
          }
        }),
        (t._addObject = function (t) {
          t instanceof lt
            ? (this.date = t)
            : t instanceof dn && (this.time = t);
        }),
        (t._resolveInstant = function () {
          if (null != this.date && null != this.time) {
            var t = this.fieldValues.get(b.OFFSET_SECONDS);
            if (null != t) {
              var e = Nt.ofTotalSeconds(t),
                n = this.date
                  .atTime(this.time)
                  .atZone(e)
                  .getLong(b.INSTANT_SECONDS);
              this.fieldValues.put(b.INSTANT_SECONDS, n);
            } else if (null != this.zone) {
              var i = this.date
                .atTime(this.time)
                .atZone(this.zone)
                .getLong(b.INSTANT_SECONDS);
              this.fieldValues.put(b.INSTANT_SECONDS, i);
            }
          }
        }),
        (t.build = function (t) {
          return t.queryFrom(this);
        }),
        (t.isSupported = function (t) {
          return (
            null != t &&
            ((this.fieldValues.containsKey(t) &&
              void 0 !== this.fieldValues.get(t)) ||
              (null != this.date && this.date.isSupported(t)) ||
              (null != this.time && this.time.isSupported(t)))
          );
        }),
        (t.getLong = function (t) {
          E(t, 'field');
          var e = this.getFieldValue0(t);
          if (null != e) return e;
          if (null != this.date && this.date.isSupported(t))
            return this.date.getLong(t);
          if (null != this.time && this.time.isSupported(t))
            return this.time.getLong(t);
          throw new M('Field not found: ' + t);
        }),
        (t.query = function (t) {
          return t === H.zoneId()
            ? this.zone
            : t === H.chronology()
            ? this.chrono
            : t === H.localDate()
            ? null != this.date
              ? cn.from(this.date)
              : null
            : t === H.localTime()
            ? this.time
            : t === H.zone() || t === H.offset()
            ? t.queryFrom(this)
            : t === H.precision()
            ? null
            : t.queryFrom(this);
        }),
        i
      );
    })(Z),
    vt =
      (((Dt = Tt.prototype)._constructorParam = function (t, e, n) {
        (this._locale = t), (this._symbols = e), (this._overrideChronology = n);
      }),
      (Dt._constructorFormatter = function (t) {
        (this._locale = t.locale()),
          (this._symbols = t.decimalStyle()),
          (this._overrideChronology = t.chronology());
      }),
      (Dt._constructorSelf = function (t) {
        (this._locale = t._locale),
          (this._symbols = t._symbols),
          (this._overrideChronology = t._overrideChronology),
          (this._overrideZone = t._overrideZone),
          (this._caseSensitive = t._caseSensitive),
          (this._strict = t._strict),
          (this._parsed = [new yt(this)]);
      }),
      (Dt.copy = function () {
        return new Tt(this);
      }),
      (Dt.symbols = function () {
        return this._symbols;
      }),
      (Dt.isStrict = function () {
        return this._strict;
      }),
      (Dt.setStrict = function (t) {
        this._strict = t;
      }),
      (Dt.locale = function () {
        return this._locale;
      }),
      (Dt.setLocale = function (t) {
        this._locale = t;
      }),
      (Dt.startOptional = function () {
        this._parsed.push(this.currentParsed().copy());
      }),
      (Dt.endOptional = function (t) {
        t
          ? this._parsed.splice(this._parsed.length - 2, 1)
          : this._parsed.splice(this._parsed.length - 1, 1);
      }),
      (Dt.isCaseSensitive = function () {
        return this._caseSensitive;
      }),
      (Dt.setCaseSensitive = function (t) {
        this._caseSensitive = t;
      }),
      (Dt.subSequenceEquals = function (t, e, n, i, r) {
        if (e + r > t.length || i + r > n.length) return !1;
        this.isCaseSensitive() ||
          ((t = t.toLowerCase()), (n = n.toLowerCase()));
        for (var s = 0; s < r; s++) if (t[e + s] !== n[i + s]) return !1;
        return !0;
      }),
      (Dt.charEquals = function (t, e) {
        return this.isCaseSensitive()
          ? t === e
          : this.charEqualsIgnoreCase(t, e);
      }),
      (Dt.charEqualsIgnoreCase = function (t, e) {
        return t === e || t.toLowerCase() === e.toLowerCase();
      }),
      (Dt.setParsedField = function (t, e, n, i) {
        var r = this.currentParsed().fieldValues,
          s = r.get(t);
        return r.set(t, e), null != s && s !== e ? ~n : i;
      }),
      (Dt.setParsedZone = function (t) {
        E(t, 'zone'), (this.currentParsed().zone = t);
      }),
      (Dt.getParsed = function (t) {
        return this.currentParsed().fieldValues.get(t);
      }),
      (Dt.toParsed = function () {
        return this.currentParsed();
      }),
      (Dt.currentParsed = function () {
        return this._parsed[this._parsed.length - 1];
      }),
      (Dt.setParsedLeapSecond = function () {
        this.currentParsed().leapSecond = !0;
      }),
      (Dt.getEffectiveChronology = function () {
        var t = this.currentParsed().chrono;
        return (
          null == t &&
            null == (t = this._overrideChronology) &&
            (t = an.INSTANCE),
          t
        );
      }),
      Tt);
  function Tt() {
    if (1 === arguments.length) {
      if (arguments[0] instanceof Tt)
        return void this._constructorSelf.apply(this, arguments);
      this._constructorFormatter.apply(this, arguments);
    } else this._constructorParam.apply(this, arguments);
    (this._caseSensitive = !0),
      (this._strict = !0),
      (this._parsed = [new yt(this)]);
  }
  var yt = (function (n) {
      function e(t) {
        var e;
        return (
          ((e = n.call(this) || this).chrono = null),
          (e.zone = null),
          (e.fieldValues = new at()),
          (e.leapSecond = !1),
          (e.dateTimeParseContext = t),
          e
        );
      }
      _(e, n);
      var t = e.prototype;
      return (
        (t.copy = function () {
          var t = new e();
          return (
            (t.chrono = this.chrono),
            (t.zone = this.zone),
            t.fieldValues.putAll(this.fieldValues),
            (t.leapSecond = this.leapSecond),
            (t.dateTimeParseContext = this.dateTimeParseContext),
            t
          );
        }),
        (t.toString = function () {
          return this.fieldValues + ', ' + this.chrono + ', ' + this.zone;
        }),
        (t.isSupported = function (t) {
          return this.fieldValues.containsKey(t);
        }),
        (t.get = function (t) {
          var e = this.fieldValues.get(t);
          return m(null != e), e;
        }),
        (t.query = function (t) {
          return t === H.chronology()
            ? this.chrono
            : t === H.zoneId() || t === H.zone()
            ? this.zone
            : n.prototype.query.call(this, t);
        }),
        (t.toBuilder = function () {
          var t = new At();
          return (
            t.fieldValues.putAll(this.fieldValues),
            (t.chrono = this.dateTimeParseContext.getEffectiveChronology()),
            null != this.zone
              ? (t.zone = this.zone)
              : (t.zone = this.overrideZone),
            (t.leapSecond = this.leapSecond),
            (t.excessDays = this.excessDays),
            t
          );
        }),
        e
      );
    })(Z),
    Mt = (function () {
      function i(t, e, n) {
        2 === arguments.length && e instanceof We
          ? ((this._temporal = i.adjust(t, e)),
            (this._locale = e.locale()),
            (this._symbols = e.decimalStyle()))
          : ((this._temporal = t), (this._locale = e), (this._symbols = n)),
          (this._optional = 0);
      }
      i.adjust = function (t, e) {
        return t;
      };
      var t = i.prototype;
      return (
        (t.symbols = function () {
          return this._symbols;
        }),
        (t.startOptional = function () {
          this._optional++;
        }),
        (t.endOptional = function () {
          this._optional--;
        }),
        (t.getValueQuery = function (t) {
          var e = this._temporal.query(t);
          if (null == e && 0 === this._optional)
            throw new M('Unable to extract value: ' + this._temporal);
          return e;
        }),
        (t.getValue = function (t) {
          try {
            return this._temporal.getLong(t);
          } catch (t) {
            if (t instanceof M && 0 < this._optional) return null;
            throw t;
          }
        }),
        (t.temporal = function () {
          return this._temporal;
        }),
        (t.locale = function () {
          return this._locale;
        }),
        (t.setDateTime = function (t) {
          this._temporal = t;
        }),
        (t.setLocale = function (t) {
          this._locale = t;
        }),
        i
      );
    })(),
    wt = function () {},
    Rt = [0, 90, 181, 273, 0, 91, 182, 274],
    gt = (function (t) {
      function o() {
        return t.apply(this, arguments) || this;
      }
      _(o, t);
      var e = o.prototype;
      return (
        (e.isDateBased = function () {
          return !0;
        }),
        (e.isTimeBased = function () {
          return !1;
        }),
        (e._isIso = function () {
          return !0;
        }),
        (o._getWeekRangeByLocalDate = function (t) {
          var e = o._getWeekBasedYear(t);
          return U.of(1, o._getWeekRangeByYear(e));
        }),
        (o._getWeekRangeByYear = function (t) {
          var e = cn.of(t, 1, 1);
          return e.dayOfWeek() === Q.THURSDAY ||
            (e.dayOfWeek() === Q.WEDNESDAY && e.isLeapYear())
            ? 53
            : 52;
        }),
        (o._getWeek = function (t) {
          var e = t.dayOfWeek().ordinal(),
            n = t.dayOfYear() - 1,
            i = 3 - e + n,
            r = i - 7 * w.intDiv(i, 7) - 3;
          if ((r < -3 && (r += 7), n < r))
            return o
              ._getWeekRangeByLocalDate(t.withDayOfYear(180).minusYears(1))
              .maximum();
          var s = w.intDiv(n - r, 7) + 1;
          return (
            53 === s &&
              !1 === (-3 === r || (-2 === r && t.isLeapYear())) &&
              (s = 1),
            s
          );
        }),
        (o._getWeekBasedYear = function (t) {
          var e = t.year(),
            n = t.dayOfYear();
          if (n <= 3) n - t.dayOfWeek().ordinal() < -2 && e--;
          else if (363 <= n) {
            var i = t.dayOfWeek().ordinal();
            0 <= (n = n - 363 - (t.isLeapYear() ? 1 : 0)) - i && e++;
          }
          return e;
        }),
        (e.getDisplayName = function () {
          return this.toString();
        }),
        (e.resolve = function () {
          return null;
        }),
        (e.name = function () {
          return this.toString();
        }),
        o
      );
    })(L),
    It = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      _(e, t);
      var n = e.prototype;
      return (
        (n.toString = function () {
          return 'DayOfQuarter';
        }),
        (n.baseUnit = function () {
          return C.DAYS;
        }),
        (n.rangeUnit = function () {
          return Wt;
        }),
        (n.range = function () {
          return U.of(1, 90, 92);
        }),
        (n.isSupportedBy = function (t) {
          return (
            t.isSupported(b.DAY_OF_YEAR) &&
            t.isSupported(b.MONTH_OF_YEAR) &&
            t.isSupported(b.YEAR) &&
            this._isIso(t)
          );
        }),
        (n.rangeRefinedBy = function (t) {
          if (!1 === t.isSupported(this))
            throw new l('Unsupported field: DayOfQuarter');
          var e = t.getLong(Ut);
          if (1 !== e)
            return 2 === e
              ? U.of(1, 91)
              : 3 === e || 4 === e
              ? U.of(1, 92)
              : this.range();
          var n = t.getLong(b.YEAR);
          return an.isLeapYear(n) ? U.of(1, 91) : U.of(1, 90);
        }),
        (n.getFrom = function (t) {
          if (!1 === t.isSupported(this))
            throw new l('Unsupported field: DayOfQuarter');
          var e = t.get(b.DAY_OF_YEAR),
            n = t.get(b.MONTH_OF_YEAR),
            i = t.getLong(b.YEAR);
          return e - Rt[w.intDiv(n - 1, 3) + (an.isLeapYear(i) ? 4 : 0)];
        }),
        (n.adjustInto = function (t, e) {
          var n = this.getFrom(t);
          return (
            this.range().checkValidValue(e, this),
            t.with(b.DAY_OF_YEAR, t.getLong(b.DAY_OF_YEAR) + (e - n))
          );
        }),
        (n.resolve = function (t, e, n) {
          var i = t.get(b.YEAR),
            r = t.get(Ut);
          if (null == i || null == r) return null;
          var s,
            o = b.YEAR.checkValidIntValue(i),
            a = t.get(Pt);
          if (n === ft.LENIENT) {
            var u = r;
            s = (s = (s = cn.of(o, 1, 1)).plusMonths(
              w.safeMultiply(w.safeSubtract(u, 1), 3)
            )).plusDays(w.safeSubtract(a, 1));
          } else {
            var h = Ut.range().checkValidIntValue(r, Ut);
            if (n === ft.STRICT) {
              var f = 92;
              1 === h ? (f = an.isLeapYear(o) ? 91 : 90) : 2 === h && (f = 91),
                U.of(1, f).checkValidValue(a, this);
            } else this.range().checkValidValue(a, this);
            s = cn.of(o, 3 * (h - 1) + 1, 1).plusDays(a - 1);
          }
          return t.remove(this), t.remove(b.YEAR), t.remove(Ut), s;
        }),
        e
      );
    })(gt),
    Yt = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      _(e, t);
      var n = e.prototype;
      return (
        (n.toString = function () {
          return 'QuarterOfYear';
        }),
        (n.baseUnit = function () {
          return Wt;
        }),
        (n.rangeUnit = function () {
          return C.YEARS;
        }),
        (n.range = function () {
          return U.of(1, 4);
        }),
        (n.isSupportedBy = function (t) {
          return t.isSupported(b.MONTH_OF_YEAR) && this._isIso(t);
        }),
        (n.rangeRefinedBy = function (t) {
          return this.range();
        }),
        (n.getFrom = function (t) {
          if (!1 === t.isSupported(this))
            throw new l('Unsupported field: QuarterOfYear');
          var e = t.getLong(b.MONTH_OF_YEAR);
          return w.intDiv(e + 2, 3);
        }),
        (n.adjustInto = function (t, e) {
          var n = this.getFrom(t);
          return (
            this.range().checkValidValue(e, this),
            t.with(b.MONTH_OF_YEAR, t.getLong(b.MONTH_OF_YEAR) + 3 * (e - n))
          );
        }),
        e
      );
    })(gt),
    Ft = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      _(e, t);
      var n = e.prototype;
      return (
        (n.toString = function () {
          return 'WeekOfWeekBasedYear';
        }),
        (n.baseUnit = function () {
          return C.WEEKS;
        }),
        (n.rangeUnit = function () {
          return Ht;
        }),
        (n.range = function () {
          return U.of(1, 52, 53);
        }),
        (n.isSupportedBy = function (t) {
          return t.isSupported(b.EPOCH_DAY) && this._isIso(t);
        }),
        (n.rangeRefinedBy = function (t) {
          if (!1 === t.isSupported(this))
            throw new l('Unsupported field: WeekOfWeekBasedYear');
          return gt._getWeekRangeByLocalDate(cn.from(t));
        }),
        (n.getFrom = function (t) {
          if (!1 === t.isSupported(this))
            throw new l('Unsupported field: WeekOfWeekBasedYear');
          return gt._getWeek(cn.from(t));
        }),
        (n.adjustInto = function (t, e) {
          return (
            this.range().checkValidValue(e, this),
            t.plus(w.safeSubtract(e, this.getFrom(t)), C.WEEKS)
          );
        }),
        (n.resolve = function (t, e, n) {
          var i = t.get(bt),
            r = t.get(b.DAY_OF_WEEK);
          if (null == i || null == r) return null;
          var s,
            o = bt.range().checkValidIntValue(i, bt),
            a = t.get(Vt);
          if (n === ft.LENIENT) {
            var u = r,
              h = 0;
            7 < u
              ? ((h = w.intDiv(u - 1, 7)), (u = w.intMod(u - 1, 7) + 1))
              : u < 1 && ((h = w.intDiv(u, 7) - 1), (u = w.intMod(u, 7) + 7)),
              (s = cn
                .of(o, 1, 4)
                .plusWeeks(a - 1)
                .plusWeeks(h)
                .with(b.DAY_OF_WEEK, u));
          } else {
            var f = b.DAY_OF_WEEK.checkValidIntValue(r);
            if (n === ft.STRICT) {
              var c = cn.of(o, 1, 4);
              gt._getWeekRangeByLocalDate(c).checkValidValue(a, this);
            } else this.range().checkValidValue(a, this);
            s = cn
              .of(o, 1, 4)
              .plusWeeks(a - 1)
              .with(b.DAY_OF_WEEK, f);
          }
          return t.remove(this), t.remove(bt), t.remove(b.DAY_OF_WEEK), s;
        }),
        (n.getDisplayName = function () {
          return 'Week';
        }),
        e
      );
    })(gt),
    Ct = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      _(e, t);
      var n = e.prototype;
      return (
        (n.toString = function () {
          return 'WeekBasedYear';
        }),
        (n.baseUnit = function () {
          return Ht;
        }),
        (n.rangeUnit = function () {
          return C.FOREVER;
        }),
        (n.range = function () {
          return b.YEAR.range();
        }),
        (n.isSupportedBy = function (t) {
          return t.isSupported(b.EPOCH_DAY) && this._isIso(t);
        }),
        (n.rangeRefinedBy = function (t) {
          return b.YEAR.range();
        }),
        (n.getFrom = function (t) {
          if (!1 === t.isSupported(this))
            throw new l('Unsupported field: WeekBasedYear');
          return gt._getWeekBasedYear(cn.from(t));
        }),
        (n.adjustInto = function (t, e) {
          if (!1 === this.isSupportedBy(t))
            throw new l('Unsupported field: WeekBasedYear');
          var n = this.range().checkValidIntValue(e, bt),
            i = cn.from(t),
            r = i.get(b.DAY_OF_WEEK),
            s = gt._getWeek(i);
          53 === s && 52 === gt._getWeekRangeByYear(n) && (s = 52);
          var o = cn.of(n, 1, 4),
            a = r - o.get(b.DAY_OF_WEEK) + 7 * (s - 1);
          return (o = o.plusDays(a)), t.with(o);
        }),
        e
      );
    })(gt),
    Lt = (function (i) {
      function t(t, e) {
        var n;
        return ((n = i.call(this) || this)._name = t), (n._duration = e), n;
      }
      _(t, i);
      var e = t.prototype;
      return (
        (e.duration = function () {
          return this._duration;
        }),
        (e.isDurationEstimated = function () {
          return !0;
        }),
        (e.isDateBased = function () {
          return !0;
        }),
        (e.isTimeBased = function () {
          return !1;
        }),
        (e.isSupportedBy = function (t) {
          return t.isSupported(b.EPOCH_DAY);
        }),
        (e.addTo = function (t, e) {
          switch (this) {
            case Ht:
              var n = w.safeAdd(t.get(bt), e);
              return t.with(bt, n);
            case Wt:
              return t
                .plus(w.intDiv(e, 256), C.YEARS)
                .plus(3 * w.intMod(e, 256), C.MONTHS);
            default:
              throw new r('Unreachable');
          }
        }),
        (e.between = function (t, e) {
          switch (this) {
            case Ht:
              return w.safeSubtract(e.getLong(bt), t.getLong(bt));
            case Wt:
              return w.intDiv(t.until(e, C.MONTHS), 3);
            default:
              throw new r('Unreachable');
          }
        }),
        (e.toString = function () {
          return name;
        }),
        t
      );
    })(g),
    Pt = null,
    Ut = null,
    Vt = null,
    bt = null,
    Ht = null,
    Wt = null;
  var xt,
    kt =
      (((xt = Bt.prototype).positiveSign = function () {
        return this._positiveSign;
      }),
      (xt.withPositiveSign = function (t) {
        return t === this._positiveSign
          ? this
          : new Bt(
              this._zeroDigit,
              t,
              this._negativeSign,
              this._decimalSeparator
            );
      }),
      (xt.negativeSign = function () {
        return this._negativeSign;
      }),
      (xt.withNegativeSign = function (t) {
        return t === this._negativeSign
          ? this
          : new Bt(
              this._zeroDigit,
              this._positiveSign,
              t,
              this._decimalSeparator
            );
      }),
      (xt.zeroDigit = function () {
        return this._zeroDigit;
      }),
      (xt.withZeroDigit = function (t) {
        return t === this._zeroDigit
          ? this
          : new Bt(
              t,
              this._positiveSign,
              this._negativeSign,
              this._decimalSeparator
            );
      }),
      (xt.decimalSeparator = function () {
        return this._decimalSeparator;
      }),
      (xt.withDecimalSeparator = function (t) {
        return t === this._decimalSeparator
          ? this
          : new Bt(this._zeroDigit, this._positiveSign, this._negativeSign, t);
      }),
      (xt.convertToDigit = function (t) {
        var e = t.charCodeAt(0) - this._zeroDigitCharCode;
        return 0 <= e && e <= 9 ? e : -1;
      }),
      (xt.convertNumberToI18N = function (t) {
        if ('0' === this._zeroDigit) return t;
        for (
          var e = this._zeroDigitCharCode - '0'.charCodeAt(0), n = '', i = 0;
          i < t.length;
          i++
        )
          n += String.fromCharCode(t.charCodeAt(i) + e);
        return n;
      }),
      (xt.equals = function (t) {
        return (
          this === t ||
          (t instanceof Bt &&
            this._zeroDigit === t._zeroDigit &&
            this._positiveSign === t._positiveSign &&
            this._negativeSign === t._negativeSign &&
            this._decimalSeparator === t._decimalSeparator)
        );
      }),
      (xt.hashCode = function () {
        return (
          this._zeroDigit +
          this._positiveSign +
          this._negativeSign +
          this._decimalSeparator
        );
      }),
      (xt.toString = function () {
        return (
          'DecimalStyle[' +
          this._zeroDigit +
          this._positiveSign +
          this._negativeSign +
          this._decimalSeparator +
          ']'
        );
      }),
      (Bt.of = function () {
        throw new Error('not yet supported');
      }),
      (Bt.availableLocales = function () {
        throw new Error('not yet supported');
      }),
      Bt);
  function Bt(t, e, n, i) {
    (this._zeroDigit = t),
      (this._zeroDigitCharCode = t.charCodeAt(0)),
      (this._positiveSign = e),
      (this._negativeSign = n),
      (this._decimalSeparator = i);
  }
  kt.STANDARD = new kt('0', '+', '-', '.');
  var qt,
    Zt =
      (_(zt, (qt = D)),
      (zt.prototype.parse = function (t, e, n) {
        switch (this) {
          case zt.NORMAL:
            return !t || !e;
          case zt.ALWAYS:
          case zt.EXCEEDS_PAD:
            return !0;
          default:
            return !e && !n;
        }
      }),
      zt);
  function zt() {
    return qt.apply(this, arguments) || this;
  }
  (Zt.NORMAL = new Zt('NORMAL')),
    (Zt.NEVER = new Zt('NEVER')),
    (Zt.ALWAYS = new Zt('ALWAYS')),
    (Zt.EXCEEDS_PAD = new Zt('EXCEEDS_PAD')),
    (Zt.NOT_NEGATIVE = new Zt('NOT_NEGATIVE'));
  var Kt = (function (t) {
    function e() {
      return t.apply(this, arguments) || this;
    }
    _(e, t);
    var n = e.prototype;
    return (
      (n.isStandalone = function () {
        switch (this) {
          case e.FULL_STANDALONE:
          case e.SHORT_STANDALONE:
          case e.NARROW_STANDALONE:
            return !0;
          default:
            return !1;
        }
      }),
      (n.asStandalone = function () {
        switch (this) {
          case e.FULL:
            return e.FULL_STANDALONE;
          case e.SHORT:
            return e.SHORT_STANDALONE;
          case e.NARROW:
            return e.NARROW_STANDALONE;
          default:
            return this;
        }
      }),
      (n.asNormal = function () {
        switch (this) {
          case e.FULL_STANDALONE:
            return e.FULL;
          case e.SHORT_STANDALONE:
            return e.SHORT;
          case e.NARROW_STANDALONE:
            return e.NARROW;
          default:
            return this;
        }
      }),
      e
    );
  })(D);
  (Kt.FULL = new Kt('FULL')),
    (Kt.FULL_STANDALONE = new Kt('FULL_STANDALONE')),
    (Kt.SHORT = new Kt('SHORT')),
    (Kt.SHORT_STANDALONE = new Kt('SHORT_STANDALONE')),
    (Kt.NARROW = new Kt('NARROW')),
    (Kt.NARROW_STANDALONE = new Kt('NARROW_STANDALONE'));
  var jt,
    Gt =
      (((jt = Xt.prototype).print = function (t, e) {
        return e.append(this._literal), !0;
      }),
      (jt.parse = function (t, e, n) {
        if (n === e.length) return ~n;
        var i = e.charAt(n);
        return !1 === t.charEquals(this._literal, i)
          ? ~n
          : n + this._literal.length;
      }),
      (jt.toString = function () {
        return "'" === this._literal ? "''" : "'" + this._literal + "'";
      }),
      Xt);
  function Xt(t) {
    if (1 < t.length) throw new c('invalid literal, too long: "' + t + '"');
    this._literal = t;
  }
  var Jt,
    Qt =
      (((Jt = $t.prototype).withOptional = function (t) {
        return t === this._optional ? this : new $t(this._printerParsers, t);
      }),
      (Jt.print = function (t, e) {
        var n = e.length();
        this._optional && t.startOptional();
        try {
          for (var i = 0; i < this._printerParsers.length; i++)
            if (!1 === this._printerParsers[i].print(t, e))
              return e.setLength(n), !0;
        } finally {
          this._optional && t.endOptional();
        }
        return !0;
      }),
      (Jt.parse = function (t, e, n) {
        if (this._optional) {
          t.startOptional();
          for (var i = n, r = 0; r < this._printerParsers.length; r++)
            if ((i = this._printerParsers[r].parse(t, e, i)) < 0)
              return t.endOptional(!1), n;
          return t.endOptional(!0), i;
        }
        for (
          var s = 0;
          s < this._printerParsers.length &&
          !((n = this._printerParsers[s].parse(t, e, n)) < 0);
          s++
        );
        return n;
      }),
      (Jt.toString = function () {
        var t = '';
        if (null != this._printerParsers) {
          t += this._optional ? '[' : '(';
          for (var e = 0; e < this._printerParsers.length; e++)
            t += this._printerParsers[e].toString();
          t += this._optional ? ']' : ')';
        }
        return t;
      }),
      $t);
  function $t(t, e) {
    (this._printerParsers = t), (this._optional = e);
  }
  var te,
    ee =
      (((te = ne.prototype).print = function (t, e) {
        var n = t.getValue(this.field);
        if (null === n) return !1;
        var i = t.symbols();
        if (0 === n) {
          if (0 < this.minWidth) {
            this.decimalPoint && e.append(i.decimalSeparator());
            for (var r = 0; r < this.minWidth; r++) e.append(i.zeroDigit());
          }
        } else {
          var s = this.convertToFraction(n, i.zeroDigit()),
            o = Math.min(Math.max(s.length, this.minWidth), this.maxWidth);
          if (0 < 1 * (s = s.substr(0, o)))
            for (; s.length > this.minWidth && '0' === s[s.length - 1]; )
              s = s.substr(0, s.length - 1);
          var a = s;
          (a = i.convertNumberToI18N(a)),
            this.decimalPoint && e.append(i.decimalSeparator()),
            e.append(a);
        }
        return !0;
      }),
      (te.parse = function (t, e, n) {
        var i = t.isStrict() ? this.minWidth : 0,
          r = t.isStrict() ? this.maxWidth : 9,
          s = e.length;
        if (n === s) return 0 < i ? ~n : n;
        if (this.decimalPoint) {
          if (e[n] !== t.symbols().decimalSeparator()) return 0 < i ? ~n : n;
          n++;
        }
        var o = n + i;
        if (s < o) return ~n;
        for (var a = Math.min(n + r, s), u = 0, h = n; h < a; ) {
          var f = e.charAt(h++),
            c = t.symbols().convertToDigit(f);
          if (c < 0) {
            if (h < o) return ~n;
            h--;
            break;
          }
          u = 10 * u + c;
        }
        var l = h - n,
          _ = Math.pow(10, l),
          d = this.convertFromFraction(u, _);
        return t.setParsedField(this.field, d, n, h);
      }),
      (te.convertToFraction = function (t, e) {
        var n = this.field.range();
        n.checkValidValue(t, this.field);
        for (
          var i = n.minimum(),
            r = n.maximum() - i + 1,
            s = t - i,
            o = '' + w.intDiv(1e9 * s, r);
          o.length < 9;

        )
          o = e + o;
        return o;
      }),
      (te.convertFromFraction = function (t, e) {
        var n = this.field.range(),
          i = n.minimum(),
          r = n.maximum() - i + 1;
        return w.intDiv(t * r, e);
      }),
      (te.toString = function () {
        var t = this.decimalPoint ? ',DecimalPoint' : '';
        return (
          'Fraction(' +
          this.field +
          ',' +
          this.minWidth +
          ',' +
          this.maxWidth +
          t +
          ')'
        );
      }),
      ne);
  function ne(t, e, n, i) {
    if ((E(t, 'field'), !1 === t.range().isFixed()))
      throw new c('Field must have a fixed set of values: ' + t);
    if (e < 0 || 9 < e)
      throw new c('Minimum width must be from 0 to 9 inclusive but was ' + e);
    if (n < 1 || 9 < n)
      throw new c('Maximum width must be from 1 to 9 inclusive but was ' + n);
    if (n < e)
      throw new c(
        'Maximum width must exceed or equal the minimum width but ' +
          n +
          ' < ' +
          e
      );
    (this.field = t),
      (this.minWidth = e),
      (this.maxWidth = n),
      (this.decimalPoint = i);
  }
  var ie,
    re = [0, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9],
    se =
      (((ie = oe.prototype).field = function () {
        return this._field;
      }),
      (ie.minWidth = function () {
        return this._minWidth;
      }),
      (ie.maxWidth = function () {
        return this._maxWidth;
      }),
      (ie.signStyle = function () {
        return this._signStyle;
      }),
      (ie.withFixedWidth = function () {
        return -1 === this._subsequentWidth
          ? this
          : new oe(
              this._field,
              this._minWidth,
              this._maxWidth,
              this._signStyle,
              -1
            );
      }),
      (ie.withSubsequentWidth = function (t) {
        return new oe(
          this._field,
          this._minWidth,
          this._maxWidth,
          this._signStyle,
          this._subsequentWidth + t
        );
      }),
      (ie._isFixedWidth = function () {
        return (
          -1 === this._subsequentWidth ||
          (0 < this._subsequentWidth &&
            this._minWidth === this._maxWidth &&
            this._signStyle === Zt.NOT_NEGATIVE)
        );
      }),
      (ie.print = function (t, e) {
        var n = t.getValue(this._field);
        if (null == n) return !1;
        var i = this._getValue(t, n),
          r = t.symbols(),
          s = '' + Math.abs(i);
        if (s.length > this._maxWidth)
          throw new M(
            'Field ' +
              this._field +
              ' cannot be printed as the value ' +
              i +
              ' exceeds the maximum print width of ' +
              this._maxWidth
          );
        if (((s = r.convertNumberToI18N(s)), 0 <= i))
          switch (this._signStyle) {
            case Zt.EXCEEDS_PAD:
              this._minWidth < 15 &&
                i >= re[this._minWidth] &&
                e.append(r.positiveSign());
              break;
            case Zt.ALWAYS:
              e.append(r.positiveSign());
          }
        else
          switch (this._signStyle) {
            case Zt.NORMAL:
            case Zt.EXCEEDS_PAD:
            case Zt.ALWAYS:
              e.append(r.negativeSign());
              break;
            case Zt.NOT_NEGATIVE:
              throw new M(
                'Field ' +
                  this._field +
                  ' cannot be printed as the value ' +
                  i +
                  ' cannot be negative according to the SignStyle'
              );
          }
        for (var o = 0; o < this._minWidth - s.length; o++)
          e.append(r.zeroDigit());
        return e.append(s), !0;
      }),
      (ie.parse = function (t, e, n) {
        var i = e.length;
        if (n === i) return ~n;
        m(0 <= n && n < i);
        var r = e.charAt(n),
          s = !1,
          o = !1;
        if (r === t.symbols().positiveSign()) {
          if (
            !1 ===
            this._signStyle.parse(
              !0,
              t.isStrict(),
              this._minWidth === this._maxWidth
            )
          )
            return ~n;
          (o = !0), n++;
        } else if (r === t.symbols().negativeSign()) {
          if (
            !1 ===
            this._signStyle.parse(
              !1,
              t.isStrict(),
              this._minWidth === this._maxWidth
            )
          )
            return ~n;
          (s = !0), n++;
        } else if (this._signStyle === Zt.ALWAYS && t.isStrict()) return ~n;
        var a = t.isStrict() || this._isFixedWidth() ? this._minWidth : 1,
          u = n + a;
        if (i < u) return ~n;
        for (
          var h =
              (t.isStrict() || this._isFixedWidth() ? this._maxWidth : 9) +
              Math.max(this._subsequentWidth, 0),
            f = 0,
            c = n,
            l = 0;
          l < 2;
          l++
        ) {
          for (var _ = Math.min(c + h, i); c < _; ) {
            var d = e.charAt(c++),
              p = t.symbols().convertToDigit(d);
            if (p < 0) {
              if (--c < u) return ~n;
              break;
            }
            if (15 < c - n) throw new S('number text exceeds length');
            f = 10 * f + p;
          }
          if (!(0 < this._subsequentWidth && 0 === l)) break;
          var E = c - n;
          (h = Math.max(a, E - this._subsequentWidth)), (c = n), (f = 0);
        }
        if (s) {
          if (0 === f && t.isStrict()) return ~(n - 1);
          0 !== f && (f = -f);
        } else if (this._signStyle === Zt.EXCEEDS_PAD && t.isStrict()) {
          var O = c - n;
          if (o) {
            if (O <= this._minWidth) return ~(n - 1);
          } else if (O > this._minWidth) return ~n;
        }
        return this._setValue(t, f, n, c);
      }),
      (ie._getValue = function (t, e) {
        return e;
      }),
      (ie._setValue = function (t, e, n, i) {
        return t.setParsedField(this._field, e, n, i);
      }),
      (ie.toString = function () {
        return 1 === this._minWidth &&
          15 === this._maxWidth &&
          this._signStyle === Zt.NORMAL
          ? 'Value(' + this._field + ')'
          : this._minWidth === this._maxWidth &&
            this._signStyle === Zt.NOT_NEGATIVE
          ? 'Value(' + this._field + ',' + this._minWidth + ')'
          : 'Value(' +
            this._field +
            ',' +
            this._minWidth +
            ',' +
            this._maxWidth +
            ',' +
            this._signStyle +
            ')';
      }),
      oe);
  function oe(t, e, n, i, r) {
    void 0 === r && (r = 0),
      (this._field = t),
      (this._minWidth = e),
      (this._maxWidth = n),
      (this._signStyle = i),
      (this._subsequentWidth = r);
  }
  var ae,
    ue = (function (o) {
      function e(t, e, n, i, r) {
        var s;
        if (
          ((s = o.call(this, t, e, n, Zt.NOT_NEGATIVE) || this),
          e < 1 || 10 < e)
        )
          throw new c('The width must be from 1 to 10 inclusive but was ' + e);
        if (n < 1 || 10 < n)
          throw new c(
            'The maxWidth must be from 1 to 10 inclusive but was ' + n
          );
        if (n < e) throw new c('The maxWidth must be greater than the width');
        if (null === r) {
          if (!1 === t.range().isValidValue(i))
            throw new c('The base value must be within the range of the field');
          if (i + re[e] > w.MAX_SAFE_INTEGER)
            throw new M(
              'Unable to add printer-parser as the range exceeds the capacity of an int'
            );
        }
        return (s._baseValue = i), (s._baseDate = r), s;
      }
      _(e, o);
      var t = e.prototype;
      return (
        (t._getValue = function (t, e) {
          var n = Math.abs(e),
            i = this._baseValue;
          null !== this._baseDate &&
            (t.temporal(),
            (i = an.INSTANCE.date(this._baseDate).get(this._field)));
          return i <= e && e < i + re[this._minWidth]
            ? n % re[this._minWidth]
            : n % re[this._maxWidth];
        }),
        (t._setValue = function (t, e, n, i) {
          var r = this._baseValue;
          null != this._baseDate &&
            (r = t
              .getEffectiveChronology()
              .date(this._baseDate)
              .get(this._field));
          if (i - n === this._minWidth && 0 <= e) {
            var s = re[this._minWidth],
              o = r - (r % s);
            (e = 0 < r ? o + e : o - e) < r && (e += s);
          }
          return t.setParsedField(this._field, e, n, i);
        }),
        (t.withFixedWidth = function () {
          return -1 === this._subsequentWidth
            ? this
            : new e(
                this._field,
                this._minWidth,
                this._maxWidth,
                this._baseValue,
                this._baseDate,
                -1
              );
        }),
        (t.withSubsequentWidth = function (t) {
          return new e(
            this._field,
            this._minWidth,
            this._maxWidth,
            this._baseValue,
            this._baseDate,
            this._subsequentWidth + t
          );
        }),
        (t.isFixedWidth = function (t) {
          return !1 !== t.isStrict() && o.prototype.isFixedWidth.call(this, t);
        }),
        (t.toString = function () {
          return (
            'ReducedValue(' +
            this._field +
            ',' +
            this._minWidth +
            ',' +
            this._maxWidth +
            ',' +
            (null != this._baseDate ? this._baseDate : this._baseValue) +
            ')'
          );
        }),
        e
      );
    })(se),
    he = [
      '+HH',
      '+HHmm',
      '+HH:mm',
      '+HHMM',
      '+HH:MM',
      '+HHMMss',
      '+HH:MM:ss',
      '+HHMMSS',
      '+HH:MM:SS',
    ],
    fe =
      (((ae = ce.prototype)._checkPattern = function (t) {
        for (var e = 0; e < he.length; e++) if (he[e] === t) return e;
        throw new c('Invalid zone offset pattern: ' + t);
      }),
      (ae.print = function (t, e) {
        var n = t.getValue(b.OFFSET_SECONDS);
        if (null == n) return !1;
        var i = w.safeToInt(n);
        if (0 === i) e.append(this.noOffsetText);
        else {
          var r = Math.abs(w.intMod(w.intDiv(i, 3600), 100)),
            s = Math.abs(w.intMod(w.intDiv(i, 60), 60)),
            o = Math.abs(w.intMod(i, 60)),
            a = e.length(),
            u = r;
          e
            .append(i < 0 ? '-' : '+')
            .appendChar(w.intDiv(r, 10) + '0')
            .appendChar(w.intMod(r, 10) + '0'),
            (3 <= this.type || (1 <= this.type && 0 < s)) &&
              (e
                .append(this.type % 2 == 0 ? ':' : '')
                .appendChar(w.intDiv(s, 10) + '0')
                .appendChar((s % 10) + '0'),
              (u += s),
              (7 <= this.type || (5 <= this.type && 0 < o)) &&
                (e
                  .append(this.type % 2 == 0 ? ':' : '')
                  .appendChar(w.intDiv(o, 10) + '0')
                  .appendChar((o % 10) + '0'),
                (u += o))),
            0 === u && (e.setLength(a), e.append(this.noOffsetText));
        }
        return !0;
      }),
      (ae.parse = function (t, e, n) {
        var i = e.length,
          r = this.noOffsetText.length;
        if (0 === r) {
          if (n === i) return t.setParsedField(b.OFFSET_SECONDS, 0, n, n);
        } else {
          if (n === i) return ~n;
          if (t.subSequenceEquals(e, n, this.noOffsetText, 0, r))
            return t.setParsedField(b.OFFSET_SECONDS, 0, n, n + r);
        }
        var s = e[n];
        if ('+' === s || '-' === s) {
          var o = '-' === s ? -1 : 1,
            a = [0, 0, 0, 0];
          if (
            ((a[0] = n + 1),
            !1 ===
              (this._parseNumber(a, 1, e, !0) ||
                this._parseNumber(a, 2, e, 3 <= this.type) ||
                this._parseNumber(a, 3, e, !1)))
          ) {
            var u = w.safeZero(o * (3600 * a[1] + 60 * a[2] + a[3]));
            return t.setParsedField(b.OFFSET_SECONDS, u, n, a[0]);
          }
        }
        return 0 === r ? t.setParsedField(b.OFFSET_SECONDS, 0, n, n + r) : ~n;
      }),
      (ae._parseNumber = function (t, e, n, i) {
        if ((this.type + 3) / 2 < e) return !1;
        var r = t[0];
        if (this.type % 2 == 0 && 1 < e) {
          if (r + 1 > n.length || ':' !== n[r]) return i;
          r++;
        }
        if (r + 2 > n.length) return i;
        var s = n[r++],
          o = n[r++];
        if (s < '0' || '9' < s || o < '0' || '9' < o) return i;
        var a = 10 * (s.charCodeAt(0) - 48) + (o.charCodeAt(0) - 48);
        return a < 0 || 59 < a ? i : ((t[e] = a), (t[0] = r), !1);
      }),
      (ae.toString = function () {
        var t = this.noOffsetText.replace("'", "''");
        return 'Offset(' + he[this.type] + ",'" + t + "')";
      }),
      ce);
  function ce(t, e) {
    E(t, 'noOffsetText'),
      E(e, 'pattern'),
      (this.noOffsetText = t),
      (this.type = this._checkPattern(e));
  }
  (fe.INSTANCE_ID = new fe('Z', '+HH:MM:ss')), (fe.PATTERNS = he);
  var le,
    _e =
      (((le = de.prototype).print = function (t, e) {
        var n = e.length();
        if (!1 === this._printerParser.print(t, e)) return !1;
        var i = e.length() - n;
        if (i > this._padWidth)
          throw new M(
            'Cannot print as output of ' +
              i +
              ' characters exceeds pad width of ' +
              this._padWidth
          );
        for (var r = 0; r < this._padWidth - i; r++) e.insert(n, this._padChar);
        return !0;
      }),
      (le.parse = function (t, e, n) {
        var i = t.isStrict(),
          r = t.isCaseSensitive();
        if ((m(!(n > e.length)), m(0 <= n), n === e.length)) return ~n;
        var s = n + this._padWidth;
        if (s > e.length) {
          if (i) return ~n;
          s = e.length;
        }
        for (
          var o = n;
          o < s &&
          (r ? e[o] === this._padChar : t.charEquals(e[o], this._padChar));

        )
          o++;
        e = e.substring(0, s);
        var a = this._printerParser.parse(t, e, o);
        return a !== s && i ? ~(n + o) : a;
      }),
      (le.toString = function () {
        return (
          'Pad(' +
          this._printerParser +
          ',' +
          this._padWidth +
          (' ' === this._padChar ? ')' : ",'" + this._padChar + "')")
        );
      }),
      de);
  function de(t, e, n) {
    (this._printerParser = t), (this._padWidth = e), (this._padChar = n);
  }
  var pe = (function (t) {
    function i() {
      return t.apply(this, arguments) || this;
    }
    _(i, t);
    var e = i.prototype;
    return (
      (e.print = function () {
        return !0;
      }),
      (e.parse = function (t, e, n) {
        switch (this) {
          case i.SENSITIVE:
            t.setCaseSensitive(!0);
            break;
          case i.INSENSITIVE:
            t.setCaseSensitive(!1);
            break;
          case i.STRICT:
            t.setStrict(!0);
            break;
          case i.LENIENT:
            t.setStrict(!1);
        }
        return n;
      }),
      (e.toString = function () {
        switch (this) {
          case i.SENSITIVE:
            return 'ParseCaseSensitive(true)';
          case i.INSENSITIVE:
            return 'ParseCaseSensitive(false)';
          case i.STRICT:
            return 'ParseStrict(true)';
          case i.LENIENT:
            return 'ParseStrict(false)';
        }
      }),
      i
    );
  })(D);
  (pe.SENSITIVE = new pe('SENSITIVE')),
    (pe.INSENSITIVE = new pe('INSENSITIVE')),
    (pe.STRICT = new pe('STRICT')),
    (pe.LENIENT = new pe('LENIENT'));
  var Ee,
    Oe =
      (((Ee = Se.prototype).print = function (t, e) {
        return e.append(this._literal), !0;
      }),
      (Ee.parse = function (t, e, n) {
        return (
          m(!(e.length < n || n < 0)),
          !1 ===
          t.subSequenceEquals(e, n, this._literal, 0, this._literal.length)
            ? ~n
            : n + this._literal.length
        );
      }),
      (Ee.toString = function () {
        return "'" + this._literal.replace("'", "''") + "'";
      }),
      Se);
  function Se(t) {
    this._literal = t;
  }
  var me =
    ((Ne.getRules = function (t) {
      throw new M('unsupported ZoneId:' + t);
    }),
    (Ne.getAvailableZoneIds = function () {
      return [];
    }),
    Ne);
  function Ne() {}
  var De,
    Ae = (function (i) {
      function e(t, e) {
        var n;
        return ((n = i.call(this) || this)._id = t), (n._rules = e), n;
      }
      _(e, i),
        (e.ofId = function (t) {
          return new e(t, me.getRules(t));
        });
      var t = e.prototype;
      return (
        (t.id = function () {
          return this._id;
        }),
        (t.rules = function () {
          return this._rules;
        }),
        e
      );
    })(pt),
    ve =
      (((De = Te.prototype).print = function (t, e) {
        var n = t.getValueQuery(this.query);
        return null != n && (e.append(n.id()), !0);
      }),
      (De.parse = function (t, e, n) {
        var i = e.length;
        if (i < n) return ~n;
        if (n === i) return ~n;
        var r = e.charAt(n);
        if ('+' === r || '-' === r) {
          var s = t.copy(),
            o = fe.INSTANCE_ID.parse(s, e, n);
          if (o < 0) return o;
          var a = s.getParsed(b.OFFSET_SECONDS),
            u = Nt.ofTotalSeconds(a);
          return t.setParsedZone(u), o;
        }
        if (n + 2 <= i) {
          var h = e.charAt(n + 1);
          if (t.charEquals(r, 'U') && t.charEquals(h, 'T'))
            return n + 3 <= i && t.charEquals(e.charAt(n + 2), 'C')
              ? this._parsePrefixedOffset(t, e, n, n + 3)
              : this._parsePrefixedOffset(t, e, n, n + 2);
          if (
            t.charEquals(r, 'G') &&
            n + 3 <= i &&
            t.charEquals(h, 'M') &&
            t.charEquals(e.charAt(n + 2), 'T')
          )
            return this._parsePrefixedOffset(t, e, n, n + 3);
        }
        if ('SYSTEM' === e.substr(n, 6))
          return t.setParsedZone(pt.systemDefault()), n + 6;
        if (t.charEquals(r, 'Z')) return t.setParsedZone(Nt.UTC), n + 1;
        var f = me.getAvailableZoneIds();
        Ye.size !== f.length && (Ye = ye.createTreeMap(f));
        for (var c = i - n, l = Ye.treeMap, _ = null, d = 0; null != l; ) {
          var p = e.substr(n, Math.min(l.length, c));
          null != (l = l.get(p)) && l.isLeaf && ((_ = p), (d = l.length));
        }
        return null != _ ? (t.setParsedZone(Ae.ofId(_)), n + d) : ~n;
      }),
      (De._parsePrefixedOffset = function (t, e, n, i) {
        var r = e.substring(n, i).toUpperCase(),
          s = t.copy();
        if (i < e.length && t.charEquals(e.charAt(i), 'Z'))
          return t.setParsedZone(pt.ofOffset(r, Nt.UTC)), i;
        var o = fe.INSTANCE_ID.parse(s, e, i);
        if (o < 0) return t.setParsedZone(pt.ofOffset(r, Nt.UTC)), i;
        var a = s.getParsed(b.OFFSET_SECONDS),
          u = Nt.ofTotalSeconds(a);
        return t.setParsedZone(pt.ofOffset(r, u)), o;
      }),
      (De.toString = function () {
        return this.description;
      }),
      Te);
  function Te(t, e) {
    (this.query = t), (this.description = e);
  }
  var ye =
    ((Me.createTreeMap = function (t) {
      for (
        var e = t.sort(function (t, e) {
            return t.length - e.length;
          }),
          n = new Re(e[0].length, !1),
          i = 0;
        i < e.length;
        i++
      )
        n.add(e[i]);
      return new Me(e.length, n);
    }),
    Me);
  function Me(t, e) {
    (this.size = t), (this.treeMap = e);
  }
  var we,
    Re =
      (((we = ge.prototype).add = function (t) {
        var e = t.length;
        if (e === this.length) this._treeMap[t] = new ge(e, !0);
        else if (e > this.length) {
          var n = t.substr(0, this.length),
            i = this._treeMap[n];
          null == i && ((i = new ge(e, !1)), (this._treeMap[n] = i)), i.add(t);
        }
      }),
      (we.get = function (t) {
        return this._treeMap[t];
      }),
      ge);
  function ge(t, e) {
    void 0 === t && (t = 0),
      void 0 === e && (e = !1),
      (this.length = t),
      (this.isLeaf = e),
      (this._treeMap = {});
  }
  var Ie,
    Ye = new ye([]),
    Fe = (function () {
      function i() {
        ((this._active = this)._parent = null),
          (this._printerParsers = []),
          (this._optional = !1),
          (this._padNextWidth = 0),
          (this._padNextChar = null),
          (this._valueParserIndex = -1);
      }
      i._of = function (t, e) {
        E(t, 'parent'), E(e, 'optional');
        var n = new i();
        return (n._parent = t), (n._optional = e), n;
      };
      var t = i.prototype;
      return (
        (t.parseCaseSensitive = function () {
          return this._appendInternalPrinterParser(pe.SENSITIVE), this;
        }),
        (t.parseCaseInsensitive = function () {
          return this._appendInternalPrinterParser(pe.INSENSITIVE), this;
        }),
        (t.parseStrict = function () {
          return this._appendInternalPrinterParser(pe.STRICT), this;
        }),
        (t.parseLenient = function () {
          return this._appendInternalPrinterParser(pe.LENIENT), this;
        }),
        (t.appendValue = function () {
          return 1 === arguments.length
            ? this._appendValue1.apply(this, arguments)
            : 2 === arguments.length
            ? this._appendValue2.apply(this, arguments)
            : this._appendValue4.apply(this, arguments);
        }),
        (t._appendValue1 = function (t) {
          return (
            E(t),
            this._appendValuePrinterParser(new se(t, 1, 15, Zt.NORMAL)),
            this
          );
        }),
        (t._appendValue2 = function (t, e) {
          if ((E(t), e < 1 || 15 < e))
            throw new c(
              'The width must be from 1 to 15 inclusive but was ' + e
            );
          var n = new se(t, e, e, Zt.NOT_NEGATIVE);
          return this._appendValuePrinterParser(n), this;
        }),
        (t._appendValue4 = function (t, e, n, i) {
          if ((E(t), E(i), e === n && i === Zt.NOT_NEGATIVE))
            return this._appendValue2(t, n);
          if (e < 1 || 15 < e)
            throw new c(
              'The minimum width must be from 1 to 15 inclusive but was ' + e
            );
          if (n < 1 || 15 < n)
            throw new c(
              'The minimum width must be from 1 to 15 inclusive but was ' + n
            );
          if (n < e)
            throw new c(
              'The maximum width must exceed or equal the minimum width but ' +
                n +
                ' < ' +
                e
            );
          var r = new se(t, e, n, i);
          return this._appendValuePrinterParser(r), this;
        }),
        (t.appendValueReduced = function (t, e, n, i) {
          return 4 === arguments.length && i instanceof lt
            ? this._appendValueReducedFieldWidthMaxWidthBaseDate.apply(
                this,
                arguments
              )
            : this._appendValueReducedFieldWidthMaxWidthBaseValue.apply(
                this,
                arguments
              );
        }),
        (t._appendValueReducedFieldWidthMaxWidthBaseValue = function (
          t,
          e,
          n,
          i
        ) {
          E(t, 'field');
          var r = new ue(t, e, n, i, null);
          return this._appendValuePrinterParser(r), this;
        }),
        (t._appendValueReducedFieldWidthMaxWidthBaseDate = function (
          t,
          e,
          n,
          i
        ) {
          E(t, 'field'), E(i, 'baseDate'), o(i, lt, 'baseDate');
          var r = new ue(t, e, n, 0, i);
          return this._appendValuePrinterParser(r), this;
        }),
        (t._appendValuePrinterParser = function (t) {
          if (
            (m(null != t),
            0 <= this._active._valueParserIndex &&
              this._active._printerParsers[
                this._active._valueParserIndex
              ] instanceof se)
          ) {
            var e = this._active._valueParserIndex,
              n = this._active._printerParsers[e];
            t.minWidth() === t.maxWidth() && t.signStyle() === Zt.NOT_NEGATIVE
              ? ((n = n.withSubsequentWidth(t.maxWidth())),
                this._appendInternal(t.withFixedWidth()),
                (this._active._valueParserIndex = e))
              : ((n = n.withFixedWidth()),
                (this._active._valueParserIndex = this._appendInternal(t))),
              (this._active._printerParsers[e] = n);
          } else this._active._valueParserIndex = this._appendInternal(t);
          return this;
        }),
        (t.appendFraction = function (t, e, n, i) {
          return this._appendInternal(new ee(t, e, n, i)), this;
        }),
        (t.appendInstant = function (t) {
          if ((void 0 === t && (t = -2), t < -2 || 9 < t))
            throw new c('Invalid fractional digits: ' + t);
          return this._appendInternal(new Pe(t)), this;
        }),
        (t.appendOffsetId = function () {
          return this._appendInternal(fe.INSTANCE_ID), this;
        }),
        (t.appendOffset = function (t, e) {
          return this._appendInternalPrinterParser(new fe(e, t)), this;
        }),
        (t.appendZoneId = function () {
          return this._appendInternal(new ve(H.zoneId(), 'ZoneId()')), this;
        }),
        (t.appendPattern = function (t) {
          return E(t, 'pattern'), this._parsePattern(t), this;
        }),
        (t.appendZoneText = function () {
          throw new c(
            'Pattern using (localized) text not implemented, use js-joda-locale plugin!'
          );
        }),
        (t.appendText = function () {
          throw new c(
            'Pattern using (localized) text not implemented, use js-joda-locale plugin!'
          );
        }),
        (t.appendLocalizedOffset = function () {
          throw new c(
            'Pattern using (localized) text not implemented, use js-joda-locale plugin!'
          );
        }),
        (t.appendWeekField = function () {
          throw new c(
            'Pattern using (localized) text not implemented, use js-joda-locale plugin!'
          );
        }),
        (t._parsePattern = function (t) {
          for (
            var e = {
                G: b.ERA,
                y: b.YEAR_OF_ERA,
                u: b.YEAR,
                Q: wt.QUARTER_OF_YEAR,
                q: wt.QUARTER_OF_YEAR,
                M: b.MONTH_OF_YEAR,
                L: b.MONTH_OF_YEAR,
                D: b.DAY_OF_YEAR,
                d: b.DAY_OF_MONTH,
                F: b.ALIGNED_DAY_OF_WEEK_IN_MONTH,
                E: b.DAY_OF_WEEK,
                c: b.DAY_OF_WEEK,
                e: b.DAY_OF_WEEK,
                a: b.AMPM_OF_DAY,
                H: b.HOUR_OF_DAY,
                k: b.CLOCK_HOUR_OF_DAY,
                K: b.HOUR_OF_AMPM,
                h: b.CLOCK_HOUR_OF_AMPM,
                m: b.MINUTE_OF_HOUR,
                s: b.SECOND_OF_MINUTE,
                S: b.NANO_OF_SECOND,
                A: b.MILLI_OF_DAY,
                n: b.NANO_OF_SECOND,
                N: b.NANO_OF_DAY,
              },
              n = 0;
            n < t.length;
            n++
          ) {
            var i = t.charAt(n);
            if (('A' <= i && i <= 'Z') || ('a' <= i && i <= 'z')) {
              for (var r = n++; n < t.length && t.charAt(n) === i; n++);
              var s = n - r;
              if ('p' === i) {
                var o = 0;
                if (
                  n < t.length &&
                  (('A' <= (i = t.charAt(n)) && i <= 'Z') ||
                    ('a' <= i && i <= 'z'))
                ) {
                  for (o = s, r = n++; n < t.length && t.charAt(n) === i; n++);
                  s = n - r;
                }
                if (0 === o)
                  throw new c(
                    "Pad letter 'p' must be followed by valid pad pattern: " + t
                  );
                this.padNext(o);
              }
              var a = e[i];
              if (null != a) this._parseField(i, s, a);
              else if ('z' === i) {
                if (4 < s) throw new c('Too many pattern letters: ' + i);
                4 === s
                  ? this.appendZoneText(Kt.FULL)
                  : this.appendZoneText(Kt.SHORT);
              } else if ('V' === i) {
                if (2 !== s)
                  throw new c('Pattern letter count must be 2: ' + i);
                this.appendZoneId();
              } else if ('Z' === i)
                if (s < 4) this.appendOffset('+HHMM', '+0000');
                else if (4 === s) this.appendLocalizedOffset(Kt.FULL);
                else {
                  if (5 !== s) throw new c('Too many pattern letters: ' + i);
                  this.appendOffset('+HH:MM:ss', 'Z');
                }
              else if ('O' === i)
                if (1 === s) this.appendLocalizedOffset(Kt.SHORT);
                else {
                  if (4 !== s)
                    throw new c('Pattern letter count must be 1 or 4: ' + i);
                  this.appendLocalizedOffset(Kt.FULL);
                }
              else if ('X' === i) {
                if (5 < s) throw new c('Too many pattern letters: ' + i);
                this.appendOffset(fe.PATTERNS[s + (1 === s ? 0 : 1)], 'Z');
              } else if ('x' === i) {
                if (5 < s) throw new c('Too many pattern letters: ' + i);
                var u = 1 === s ? '+00' : s % 2 == 0 ? '+0000' : '+00:00';
                this.appendOffset(fe.PATTERNS[s + (1 === s ? 0 : 1)], u);
              } else if ('W' === i) {
                if (1 < s) throw new c('Too many pattern letters: ' + i);
                this.appendWeekField('W', s);
              } else if ('w' === i) {
                if (2 < s) throw new c('Too many pattern letters: ' + i);
                this.appendWeekField('w', s);
              } else {
                if ('Y' !== i) throw new c('Unknown pattern letter: ' + i);
                this.appendWeekField('Y', s);
              }
              n--;
            } else if ("'" === i) {
              for (var h = n++; n < t.length; n++)
                if ("'" === t.charAt(n)) {
                  if (!(n + 1 < t.length && "'" === t.charAt(n + 1))) break;
                  n++;
                }
              if (n >= t.length)
                throw new c(
                  'Pattern ends with an incomplete string literal: ' + t
                );
              var f = t.substring(1 + h, n);
              0 === f.length
                ? this.appendLiteral("'")
                : this.appendLiteral(f.replace("''", "'"));
            } else if ('[' === i) this.optionalStart();
            else if (']' === i) {
              if (null === this._active._parent)
                throw new c(
                  'Pattern invalid as it contains ] without previous ['
                );
              this.optionalEnd();
            } else {
              if ('{' === i || '}' === i || '#' === i)
                throw new c("Pattern includes reserved character: '" + i + "'");
              this.appendLiteral(i);
            }
          }
        }),
        (t._parseField = function (t, e, n) {
          switch (t) {
            case 'u':
            case 'y':
              2 === e
                ? this.appendValueReduced(n, 2, 2, ue.BASE_DATE)
                : e < 4
                ? this.appendValue(n, e, 15, Zt.NORMAL)
                : this.appendValue(n, e, 15, Zt.EXCEEDS_PAD);
              break;
            case 'M':
            case 'Q':
              switch (e) {
                case 1:
                  this.appendValue(n);
                  break;
                case 2:
                  this.appendValue(n, 2);
                  break;
                case 3:
                  this.appendText(n, Kt.SHORT);
                  break;
                case 4:
                  this.appendText(n, Kt.FULL);
                  break;
                case 5:
                  this.appendText(n, Kt.NARROW);
                  break;
                default:
                  throw new c('Too many pattern letters: ' + t);
              }
              break;
            case 'L':
            case 'q':
              switch (e) {
                case 1:
                  this.appendValue(n);
                  break;
                case 2:
                  this.appendValue(n, 2);
                  break;
                case 3:
                  this.appendText(n, Kt.SHORT_STANDALONE);
                  break;
                case 4:
                  this.appendText(n, Kt.FULL_STANDALONE);
                  break;
                case 5:
                  this.appendText(n, Kt.NARROW_STANDALONE);
                  break;
                default:
                  throw new c('Too many pattern letters: ' + t);
              }
              break;
            case 'e':
              switch (e) {
                case 1:
                case 2:
                  this.appendWeekField('e', e);
                  break;
                case 3:
                  this.appendText(n, Kt.SHORT);
                  break;
                case 4:
                  this.appendText(n, Kt.FULL);
                  break;
                case 5:
                  this.appendText(n, Kt.NARROW);
                  break;
                default:
                  throw new c('Too many pattern letters: ' + t);
              }
              break;
            case 'c':
              switch (e) {
                case 1:
                  this.appendWeekField('c', e);
                  break;
                case 2:
                  throw new c('Invalid number of pattern letters: ' + t);
                case 3:
                  this.appendText(n, Kt.SHORT_STANDALONE);
                  break;
                case 4:
                  this.appendText(n, Kt.FULL_STANDALONE);
                  break;
                case 5:
                  this.appendText(n, Kt.NARROW_STANDALONE);
                  break;
                default:
                  throw new c('Too many pattern letters: ' + t);
              }
              break;
            case 'a':
              if (1 !== e) throw new c('Too many pattern letters: ' + t);
              this.appendText(n, Kt.SHORT);
              break;
            case 'E':
            case 'G':
              switch (e) {
                case 1:
                case 2:
                case 3:
                  this.appendText(n, Kt.SHORT);
                  break;
                case 4:
                  this.appendText(n, Kt.FULL);
                  break;
                case 5:
                  this.appendText(n, Kt.NARROW);
                  break;
                default:
                  throw new c('Too many pattern letters: ' + t);
              }
              break;
            case 'S':
              this.appendFraction(b.NANO_OF_SECOND, e, e, !1);
              break;
            case 'F':
              if (1 !== e) throw new c('Too many pattern letters: ' + t);
              this.appendValue(n);
              break;
            case 'd':
            case 'h':
            case 'H':
            case 'k':
            case 'K':
            case 'm':
            case 's':
              if (1 === e) this.appendValue(n);
              else {
                if (2 !== e) throw new c('Too many pattern letters: ' + t);
                this.appendValue(n, e);
              }
              break;
            case 'D':
              if (1 === e) this.appendValue(n);
              else {
                if (!(e <= 3)) throw new c('Too many pattern letters: ' + t);
                this.appendValue(n, e);
              }
              break;
            default:
              1 === e ? this.appendValue(n) : this.appendValue(n, e);
          }
        }),
        (t.padNext = function () {
          return 1 === arguments.length
            ? this._padNext1.apply(this, arguments)
            : this._padNext2.apply(this, arguments);
        }),
        (t._padNext1 = function (t) {
          return this._padNext2(t, ' ');
        }),
        (t._padNext2 = function (t, e) {
          if (t < 1)
            throw new c('The pad width must be at least one but was ' + t);
          return (
            (this._active._padNextWidth = t),
            (this._active._padNextChar = e),
            (this._active._valueParserIndex = -1),
            this
          );
        }),
        (t.optionalStart = function () {
          return (
            (this._active._valueParserIndex = -1),
            (this._active = i._of(this._active, !0)),
            this
          );
        }),
        (t.optionalEnd = function () {
          if (null == this._active._parent)
            throw new r(
              'Cannot call optionalEnd() as there was no previous call to optionalStart()'
            );
          if (0 < this._active._printerParsers.length) {
            var t = new Qt(
              this._active._printerParsers,
              this._active._optional
            );
            (this._active = this._active._parent), this._appendInternal(t);
          } else this._active = this._active._parent;
          return this;
        }),
        (t._appendInternal = function (t) {
          return (
            m(null != t),
            0 < this._active._padNextWidth &&
              (null != t &&
                (t = new _e(
                  t,
                  this._active._padNextWidth,
                  this._active._padNextChar
                )),
              (this._active._padNextWidth = 0),
              (this._active._padNextChar = 0)),
            this._active._printerParsers.push(t),
            (this._active._valueParserIndex = -1),
            this._active._printerParsers.length - 1
          );
        }),
        (t.appendLiteral = function (t) {
          return (
            m(null != t),
            0 < t.length &&
              (1 === t.length
                ? this._appendInternalPrinterParser(new Gt(t.charAt(0)))
                : this._appendInternalPrinterParser(new Oe(t))),
            this
          );
        }),
        (t._appendInternalPrinterParser = function (t) {
          return (
            m(null != t),
            0 < this._active._padNextWidth &&
              (null != t &&
                (t = new _e(
                  t,
                  this._active._padNextWidth,
                  this._active._padNextChar
                )),
              (this._active._padNextWidth = 0),
              (this._active._padNextChar = 0)),
            this._active._printerParsers.push(t),
            (this._active._valueParserIndex = -1),
            this._active._printerParsers.length - 1
          );
        }),
        (t.append = function (t) {
          return (
            E(t, 'formatter'),
            this._appendInternal(t._toPrinterParser(!1)),
            this
          );
        }),
        (t.toFormatter = function (t) {
          for (void 0 === t && (t = ft.SMART); null != this._active._parent; )
            this.optionalEnd();
          var e = new Qt(this._printerParsers, !1);
          return new We(e, null, kt.STANDARD, t, null, null, null);
        }),
        i
      );
    })(),
    Ce = 31556952e4,
    Le = 62167219200,
    Pe =
      (((Ie = Ue.prototype).print = function (t, e) {
        var n = t.getValue(b.INSTANT_SECONDS),
          i = 0;
        if (
          (t.temporal().isSupported(b.NANO_OF_SECOND) &&
            (i = t.temporal().getLong(b.NANO_OF_SECOND)),
          null == n)
        )
          return !1;
        var r = n,
          s = b.NANO_OF_SECOND.checkValidIntValue(i);
        if (-Le <= r) {
          var o = r - Ce + Le,
            a = w.floorDiv(o, Ce) + 1,
            u = w.floorMod(o, Ce),
            h = _n.ofEpochSecond(u - Le, 0, Nt.UTC);
          0 < a && e.append('+').append(a),
            e.append(h),
            0 === h.second() && e.append(':00');
        } else {
          var f = r + Le,
            c = w.intDiv(f, Ce),
            l = w.intMod(f, Ce),
            _ = _n.ofEpochSecond(l - Le, 0, Nt.UTC),
            d = e.length();
          e.append(_),
            0 === _.second() && e.append(':00'),
            c < 0 &&
              (-1e4 === _.year()
                ? e.replace(d, d + 2, '' + (c - 1))
                : 0 === l
                ? e.insert(d, c)
                : e.insert(d + 1, Math.abs(c)));
        }
        if (-2 === this.fractionalDigits)
          0 !== s &&
            (e.append('.'),
            0 === w.intMod(s, 1e6)
              ? e.append(('' + (w.intDiv(s, 1e6) + 1e3)).substring(1))
              : 0 === w.intMod(s, 1e3)
              ? e.append(('' + (w.intDiv(s, 1e3) + 1e6)).substring(1))
              : e.append(('' + (s + 1e9)).substring(1)));
        else if (
          0 < this.fractionalDigits ||
          (-1 === this.fractionalDigits && 0 < s)
        ) {
          e.append('.');
          for (
            var p = 1e8, E = 0;
            (-1 === this.fractionalDigits && 0 < s) ||
            E < this.fractionalDigits;
            E++
          ) {
            var O = w.intDiv(s, p);
            e.append(O), (s -= O * p), (p = w.intDiv(p, 10));
          }
        }
        return e.append('Z'), !0;
      }),
      (Ie.parse = function (t, e, n) {
        var i = t.copy(),
          r = this.fractionalDigits < 0 ? 0 : this.fractionalDigits,
          s = this.fractionalDigits < 0 ? 9 : this.fractionalDigits,
          o = new Fe()
            .append(We.ISO_LOCAL_DATE)
            .appendLiteral('T')
            .appendValue(b.HOUR_OF_DAY, 2)
            .appendLiteral(':')
            .appendValue(b.MINUTE_OF_HOUR, 2)
            .appendLiteral(':')
            .appendValue(b.SECOND_OF_MINUTE, 2)
            .appendFraction(b.NANO_OF_SECOND, r, s, !0)
            .appendLiteral('Z')
            .toFormatter()
            ._toPrinterParser(!1)
            .parse(i, e, n);
        if (o < 0) return o;
        var a,
          u = i.getParsed(b.YEAR),
          h = i.getParsed(b.MONTH_OF_YEAR),
          f = i.getParsed(b.DAY_OF_MONTH),
          c = i.getParsed(b.HOUR_OF_DAY),
          l = i.getParsed(b.MINUTE_OF_HOUR),
          _ = i.getParsed(b.SECOND_OF_MINUTE),
          d = i.getParsed(b.NANO_OF_SECOND),
          p = null != _ ? _ : 0,
          E = null != d ? d : 0,
          O = w.intMod(u, 1e4),
          S = 0;
        24 === c && 0 === l && 0 === p && 0 === E
          ? ((c = 0), (S = 1))
          : 23 === c &&
            59 === l &&
            60 === p &&
            (t.setParsedLeapSecond(), (p = 59));
        try {
          (a = _n.of(O, h, f, c, l, p, 0).plusDays(S).toEpochSecond(Nt.UTC)),
            (a += w.safeMultiply(w.intDiv(u, 1e4), Ce));
        } catch (t) {
          return ~n;
        }
        var m = o;
        return (
          (m = t.setParsedField(b.INSTANT_SECONDS, a, n, m)),
          t.setParsedField(b.NANO_OF_SECOND, E, n, m)
        );
      }),
      (Ie.toString = function () {
        return 'Instant()';
      }),
      Ue);
  function Ue(t) {
    this.fractionalDigits = t;
  }
  var Ve,
    be =
      (((Ve = He.prototype).append = function (t) {
        return (this._str += t), this;
      }),
      (Ve.appendChar = function (t) {
        return (this._str += t[0]), this;
      }),
      (Ve.insert = function (t, e) {
        return (
          (this._str = this._str.slice(0, t) + e + this._str.slice(t)), this
        );
      }),
      (Ve.replace = function (t, e, n) {
        return (
          (this._str = this._str.slice(0, t) + n + this._str.slice(e)), this
        );
      }),
      (Ve.length = function () {
        return this._str.length;
      }),
      (Ve.setLength = function (t) {
        return (this._str = this._str.slice(0, t)), this;
      }),
      (Ve.toString = function () {
        return this._str;
      }),
      He);
  function He() {
    this._str = '';
  }
  var We = (function () {
    function e(t, e, n, i, r, s, o) {
      void 0 === s && (s = an.INSTANCE),
        m(null != t),
        m(null != n),
        m(null != i),
        (this._printerParser = t),
        (this._locale = e),
        (this._decimalStyle = n),
        (this._resolverStyle = i),
        (this._resolverFields = r),
        (this._chrono = s),
        (this._zone = o);
    }
    (e.parsedExcessDays = function () {
      return e.PARSED_EXCESS_DAYS;
    }),
      (e.parsedLeapSecond = function () {
        return e.PARSED_LEAP_SECOND;
      }),
      (e.ofPattern = function (t) {
        return new Fe().appendPattern(t).toFormatter();
      });
    var t = e.prototype;
    return (
      (t.locale = function () {
        return this._locale;
      }),
      (t.decimalStyle = function () {
        return this._decimalStyle;
      }),
      (t.chronology = function () {
        return this._chrono;
      }),
      (t.withChronology = function (t) {
        return null != this._chrono && this._chrono.equals(t)
          ? this
          : new e(
              this._printerParser,
              this._locale,
              this._decimalStyle,
              this._resolverStyle,
              this._resolverFields,
              t,
              this._zone
            );
      }),
      (t.withLocale = function () {
        return this;
      }),
      (t.withResolverStyle = function (t) {
        return (
          E(t, 'resolverStyle'),
          t.equals(this._resolverStyle)
            ? this
            : new e(
                this._printerParser,
                this._locale,
                this._decimalStyle,
                t,
                this._resolverFields,
                this._chrono,
                this._zone
              )
        );
      }),
      (t.format = function (t) {
        var e = new be(32);
        return this._formatTo(t, e), e.toString();
      }),
      (t._formatTo = function (t, e) {
        E(t, 'temporal'), E(e, 'appendable');
        var n = new Mt(t, this);
        this._printerParser.print(n, e);
      }),
      (t.parse = function (t, e) {
        return 1 === arguments.length ? this.parse1(t) : this.parse2(t, e);
      }),
      (t.parse1 = function (e) {
        E(e, 'text');
        try {
          return this._parseToBuilder(e, null).resolve(
            this._resolverStyle,
            this._resolverFields
          );
        } catch (t) {
          throw t instanceof p ? t : this._createError(e, t);
        }
      }),
      (t.parse2 = function (e, t) {
        E(e, 'text'), E(t, 'type');
        try {
          return this._parseToBuilder(e, null)
            .resolve(this._resolverStyle, this._resolverFields)
            .build(t);
        } catch (t) {
          throw t instanceof p ? t : this._createError(e, t);
        }
      }),
      (t._createError = function (t, e) {
        var n = '';
        return (
          (n = 64 < t.length ? t.substring(0, 64) + '...' : t),
          new p("Text '" + n + "' could not be parsed: " + e.message, t, 0, e)
        );
      }),
      (t._parseToBuilder = function (t, e) {
        var n = null != e ? e : new rt(0),
          i = this._parseUnresolved0(t, n);
        if (
          null == i ||
          0 <= n.getErrorIndex() ||
          (null == e && n.getIndex() < t.length)
        ) {
          var r = '';
          throw (
            ((r = 64 < t.length ? t.substr(0, 64).toString() + '...' : t),
            0 <= n.getErrorIndex()
              ? new p(
                  "Text '" +
                    r +
                    "' could not be parsed at index " +
                    n.getErrorIndex(),
                  t,
                  n.getErrorIndex()
                )
              : new p(
                  "Text '" +
                    r +
                    "' could not be parsed, unparsed text found at index " +
                    n.getIndex(),
                  t,
                  n.getIndex()
                ))
          );
        }
        return i.toBuilder();
      }),
      (t.parseUnresolved = function (t, e) {
        return this._parseUnresolved0(t, e);
      }),
      (t._parseUnresolved0 = function (t, e) {
        m(null != t, 'text', s), m(null != e, 'position', s);
        var n = new vt(this),
          i = e.getIndex();
        return (i = this._printerParser.parse(n, t, i)) < 0
          ? (e.setErrorIndex(~i), null)
          : (e.setIndex(i), n.toParsed());
      }),
      (t._toPrinterParser = function (t) {
        return this._printerParser.withOptional(t);
      }),
      (t.toString = function () {
        var t = this._printerParser.toString();
        return 0 === t.indexOf('[') ? t : t.substring(1, t.length - 1);
      }),
      e
    );
  })();
  var xe,
    ke = (function (i) {
      function n(t, e) {
        var n;
        return (
          ((n = i.call(this) || this)._month = w.safeToInt(t)),
          (n._day = w.safeToInt(e)),
          n
        );
      }
      _(n, i),
        (n.now = function (t) {
          return 0 === arguments.length
            ? n.now0()
            : 1 === arguments.length && t instanceof pt
            ? n.nowZoneId(t)
            : n.nowClock(t);
        }),
        (n.now0 = function () {
          return this.nowClock(En.systemDefaultZone());
        }),
        (n.nowZoneId = function (t) {
          return E(t, 'zone'), this.nowClock(En.system(t));
        }),
        (n.nowClock = function (t) {
          E(t, 'clock');
          var e = cn.now(t);
          return n.of(e.month(), e.dayOfMonth());
        }),
        (n.of = function (t, e) {
          return 2 === arguments.length && t instanceof tt
            ? n.ofMonthNumber(t, e)
            : n.ofNumberNumber(t, e);
        }),
        (n.ofMonthNumber = function (t, e) {
          if (
            (E(t, 'month'),
            b.DAY_OF_MONTH.checkValidValue(e),
            e > t.maxLength())
          )
            throw new M(
              'Illegal value for DayOfMonth field, value ' +
                e +
                ' is not valid for month ' +
                t.toString()
            );
          return new n(t.value(), e);
        }),
        (n.ofNumberNumber = function (t, e) {
          return E(t, 'month'), E(e, 'dayOfMonth'), n.of(tt.of(t), e);
        }),
        (n.from = function (e) {
          if ((E(e, 'temporal'), o(e, k, 'temporal'), e instanceof n)) return e;
          try {
            return n.of(e.get(b.MONTH_OF_YEAR), e.get(b.DAY_OF_MONTH));
          } catch (t) {
            throw new M(
              'Unable to obtain MonthDay from TemporalAccessor: ' +
                e +
                ', type ' +
                (e && null != e.constructor ? e.constructor.name : '')
            );
          }
        }),
        (n.parse = function (t, e) {
          return 1 === arguments.length
            ? n.parseString(t)
            : n.parseStringFormatter(t, e);
        }),
        (n.parseString = function (t) {
          return n.parseStringFormatter(t, xe);
        }),
        (n.parseStringFormatter = function (t, e) {
          return (
            E(t, 'text'),
            E(e, 'formatter'),
            o(e, We, 'formatter'),
            e.parse(t, n.FROM)
          );
        });
      var t = n.prototype;
      return (
        (t.monthValue = function () {
          return this._month;
        }),
        (t.month = function () {
          return tt.of(this._month);
        }),
        (t.dayOfMonth = function () {
          return this._day;
        }),
        (t.isSupported = function (t) {
          return t instanceof b
            ? t === b.MONTH_OF_YEAR || t === b.DAY_OF_MONTH
            : null != t && t.isSupportedBy(this);
        }),
        (t.range = function (t) {
          return t === b.MONTH_OF_YEAR
            ? t.range()
            : t === b.DAY_OF_MONTH
            ? U.of(1, this.month().minLength(), this.month().maxLength())
            : i.prototype.range.call(this, t);
        }),
        (t.get = function (t) {
          return this.range(t).checkValidIntValue(this.getLong(t), t);
        }),
        (t.getLong = function (t) {
          if ((E(t, 'field'), t instanceof b)) {
            switch (t) {
              case b.DAY_OF_MONTH:
                return this._day;
              case b.MONTH_OF_YEAR:
                return this._month;
            }
            throw new l('Unsupported field: ' + t);
          }
          return t.getFrom(this);
        }),
        (t.isValidYear = function (t) {
          return (
            !1 == (29 === this._day && 2 === this._month && !1 === ze.isLeap(t))
          );
        }),
        (t.withMonth = function (t) {
          return this.with(tt.of(t));
        }),
        (t.with = function (t) {
          if ((E(t, 'month'), t.value() === this._month)) return this;
          var e = Math.min(this._day, t.maxLength());
          return new n(t.value(), e);
        }),
        (t.withDayOfMonth = function (t) {
          return t === this._day ? this : n.of(this._month, t);
        }),
        (t.query = function (t) {
          return (
            E(t, 'query'),
            o(t, j, 'query'),
            t === H.chronology() ? an.INSTANCE : i.prototype.query.call(this, t)
          );
        }),
        (t.adjustInto = function (t) {
          return (
            E(t, 'temporal'),
            (t = t.with(b.MONTH_OF_YEAR, this._month)).with(
              b.DAY_OF_MONTH,
              Math.min(t.range(b.DAY_OF_MONTH).maximum(), this._day)
            )
          );
        }),
        (t.atYear = function (t) {
          return cn.of(t, this._month, this.isValidYear(t) ? this._day : 28);
        }),
        (t.compareTo = function (t) {
          E(t, 'other'), o(t, n, 'other');
          var e = this._month - t.monthValue();
          return 0 === e && (e = this._day - t.dayOfMonth()), e;
        }),
        (t.isAfter = function (t) {
          return E(t, 'other'), o(t, n, 'other'), 0 < this.compareTo(t);
        }),
        (t.isBefore = function (t) {
          return E(t, 'other'), o(t, n, 'other'), this.compareTo(t) < 0;
        }),
        (t.equals = function (t) {
          if (this === t) return !0;
          if (t instanceof n) {
            var e = t;
            return (
              this.monthValue() === e.monthValue() &&
              this.dayOfMonth() === e.dayOfMonth()
            );
          }
          return !1;
        }),
        (t.toString = function () {
          return (
            '--' +
            (this._month < 10 ? '0' : '') +
            this._month +
            (this._day < 10 ? '-0' : '-') +
            this._day
          );
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        (t.format = function (t) {
          return E(t, 'formatter'), o(t, We, 'formatter'), t.format(this);
        }),
        n
      );
    })(Z);
  var Be,
    qe = (function (i) {
      function r(t, e) {
        var n;
        return (
          ((n = i.call(this) || this)._year = w.safeToInt(t)),
          (n._month = w.safeToInt(e)),
          n
        );
      }
      _(r, i),
        (r.now = function (t) {
          return 0 === arguments.length
            ? r.now0()
            : 1 === arguments.length && t instanceof pt
            ? r.nowZoneId(t)
            : r.nowClock(t);
        }),
        (r.now0 = function () {
          return r.nowClock(En.systemDefaultZone());
        }),
        (r.nowZoneId = function (t) {
          return r.nowClock(En.system(t));
        }),
        (r.nowClock = function (t) {
          var e = cn.now(t);
          return r.of(e.year(), e.month());
        }),
        (r.of = function (t, e) {
          return 2 === arguments.length && e instanceof tt
            ? r.ofNumberMonth(t, e)
            : r.ofNumberNumber(t, e);
        }),
        (r.ofNumberMonth = function (t, e) {
          return (
            E(e, 'month'), o(e, tt, 'month'), r.ofNumberNumber(t, e.value())
          );
        }),
        (r.ofNumberNumber = function (t, e) {
          return (
            E(t, 'year'),
            E(e, 'month'),
            b.YEAR.checkValidValue(t),
            b.MONTH_OF_YEAR.checkValidValue(e),
            new r(t, e)
          );
        }),
        (r.from = function (e) {
          if ((E(e, 'temporal'), e instanceof r)) return e;
          try {
            return r.of(e.get(b.YEAR), e.get(b.MONTH_OF_YEAR));
          } catch (t) {
            throw new M(
              'Unable to obtain YearMonth from TemporalAccessor: ' +
                e +
                ', type ' +
                (e && null != e.constructor ? e.constructor.name : '')
            );
          }
        }),
        (r.parse = function (t, e) {
          return 1 === arguments.length
            ? r.parseString(t)
            : r.parseStringFormatter(t, e);
        }),
        (r.parseString = function (t) {
          return r.parseStringFormatter(t, Be);
        }),
        (r.parseStringFormatter = function (t, e) {
          return E(e, 'formatter'), e.parse(t, r.FROM);
        });
      var t = r.prototype;
      return (
        (t.isSupported = function (t) {
          return 1 === arguments.length && t instanceof L
            ? this.isSupportedField(t)
            : this.isSupportedUnit(t);
        }),
        (t.isSupportedField = function (t) {
          return t instanceof b
            ? t === b.YEAR ||
                t === b.MONTH_OF_YEAR ||
                t === b.PROLEPTIC_MONTH ||
                t === b.YEAR_OF_ERA ||
                t === b.ERA
            : null != t && t.isSupportedBy(this);
        }),
        (t.isSupportedUnit = function (t) {
          return t instanceof C
            ? t === C.MONTHS ||
                t === C.YEARS ||
                t === C.DECADES ||
                t === C.CENTURIES ||
                t === C.MILLENNIA ||
                t === C.ERAS
            : null != t && t.isSupportedBy(this);
        }),
        (t.range = function (t) {
          return t === b.YEAR_OF_ERA
            ? this.year() <= 0
              ? U.of(1, ze.MAX_VALUE + 1)
              : U.of(1, ze.MAX_VALUE)
            : i.prototype.range.call(this, t);
        }),
        (t.get = function (t) {
          return (
            E(t, 'field'),
            o(t, L, 'field'),
            this.range(t).checkValidIntValue(this.getLong(t), t)
          );
        }),
        (t.getLong = function (t) {
          if ((E(t, 'field'), o(t, L, 'field'), t instanceof b)) {
            switch (t) {
              case b.MONTH_OF_YEAR:
                return this._month;
              case b.PROLEPTIC_MONTH:
                return this._getProlepticMonth();
              case b.YEAR_OF_ERA:
                return this._year < 1 ? 1 - this._year : this._year;
              case b.YEAR:
                return this._year;
              case b.ERA:
                return this._year < 1 ? 0 : 1;
            }
            throw new l('Unsupported field: ' + t);
          }
          return t.getFrom(this);
        }),
        (t._getProlepticMonth = function () {
          return w.safeAdd(w.safeMultiply(this._year, 12), this._month - 1);
        }),
        (t.year = function () {
          return this._year;
        }),
        (t.monthValue = function () {
          return this._month;
        }),
        (t.month = function () {
          return tt.of(this._month);
        }),
        (t.isLeapYear = function () {
          return an.isLeapYear(this._year);
        }),
        (t.isValidDay = function (t) {
          return 1 <= t && t <= this.lengthOfMonth();
        }),
        (t.lengthOfMonth = function () {
          return this.month().length(this.isLeapYear());
        }),
        (t.lengthOfYear = function () {
          return this.isLeapYear() ? 366 : 365;
        }),
        (t.with = function (t, e) {
          return 1 === arguments.length
            ? this.withAdjuster(t)
            : 2 === arguments.length && t instanceof L
            ? this.withFieldValue(t, e)
            : this.withYearMonth(t, e);
        }),
        (t.withYearMonth = function (t, e) {
          return (
            E(t),
            E(e),
            this._year === t && this._month === e ? this : new r(t, e)
          );
        }),
        (t.withAdjuster = function (t) {
          return E(t, 'adjuster'), t.adjustInto(this);
        }),
        (t.withFieldValue = function (t, e) {
          if ((E(t, 'field'), o(t, L, 'field'), t instanceof b)) {
            var n = t;
            switch ((n.checkValidValue(e), n)) {
              case b.MONTH_OF_YEAR:
                return this.withMonth(e);
              case b.PROLEPTIC_MONTH:
                return this.plusMonths(e - this.getLong(b.PROLEPTIC_MONTH));
              case b.YEAR_OF_ERA:
                return this.withYear(this._year < 1 ? 1 - e : e);
              case b.YEAR:
                return this.withYear(e);
              case b.ERA:
                return this.getLong(b.ERA) === e
                  ? this
                  : this.withYear(1 - this._year);
            }
            throw new l('Unsupported field: ' + t);
          }
          return t.adjustInto(this, e);
        }),
        (t.withYear = function (t) {
          return b.YEAR.checkValidValue(t), this.withYearMonth(t, this._month);
        }),
        (t.withMonth = function (t) {
          return (
            b.MONTH_OF_YEAR.checkValidValue(t),
            this.withYearMonth(this._year, t)
          );
        }),
        (t.plus = function (t, e) {
          return 1 === arguments.length
            ? this.plusAmount(t)
            : this.plusAmountUnit(t, e);
        }),
        (t.plusAmount = function (t) {
          return E(t, 'amount'), o(t, T, 'amount'), t.addTo(this);
        }),
        (t.plusAmountUnit = function (t, e) {
          if ((E(e, 'unit'), o(e, g, 'unit'), e instanceof C)) {
            switch (e) {
              case C.MONTHS:
                return this.plusMonths(t);
              case C.YEARS:
                return this.plusYears(t);
              case C.DECADES:
                return this.plusYears(w.safeMultiply(t, 10));
              case C.CENTURIES:
                return this.plusYears(w.safeMultiply(t, 100));
              case C.MILLENNIA:
                return this.plusYears(w.safeMultiply(t, 1e3));
              case C.ERAS:
                return this.with(b.ERA, w.safeAdd(this.getLong(b.ERA), t));
            }
            throw new l('Unsupported unit: ' + e);
          }
          return e.addTo(this, t);
        }),
        (t.plusYears = function (t) {
          if (0 === t) return this;
          var e = b.YEAR.checkValidIntValue(this._year + t);
          return this.withYearMonth(e, this._month);
        }),
        (t.plusMonths = function (t) {
          if (0 === t) return this;
          var e = 12 * this._year + (this._month - 1) + t,
            n = b.YEAR.checkValidIntValue(w.floorDiv(e, 12)),
            i = w.floorMod(e, 12) + 1;
          return this.withYearMonth(n, i);
        }),
        (t.minus = function (t, e) {
          return 1 === arguments.length
            ? this.minusAmount(t)
            : this.minusAmountUnit(t, e);
        }),
        (t.minusAmount = function (t) {
          return E(t, 'amount'), t.subtractFrom(this);
        }),
        (t.minusAmountUnit = function (t, e) {
          return t === w.MIN_SAFE_INTEGER
            ? this.plusAmountUnit(w.MAX_SAFE_INTEGER, e).plusAmountUnit(1, e)
            : this.plusAmountUnit(-t, e);
        }),
        (t.minusYears = function (t) {
          return t === w.MIN_SAFE_INTEGER
            ? this.plusYears(w.MIN_SAFE_INTEGER).plusYears(1)
            : this.plusYears(-t);
        }),
        (t.minusMonths = function (t) {
          return t === w.MIN_SAFE_INTEGER
            ? this.plusMonths(Math.MAX_SAFE_INTEGER).plusMonths(1)
            : this.plusMonths(-t);
        }),
        (t.query = function (t) {
          return (
            E(t, 'query'),
            o(t, j, 'query'),
            t === H.chronology()
              ? an.INSTANCE
              : t === H.precision()
              ? C.MONTHS
              : t === H.localDate() ||
                t === H.localTime() ||
                t === H.zone() ||
                t === H.zoneId() ||
                t === H.offset()
              ? null
              : i.prototype.query.call(this, t)
          );
        }),
        (t.adjustInto = function (t) {
          return (
            E(t, 'temporal'),
            o(t, Z, 'temporal'),
            t.with(b.PROLEPTIC_MONTH, this._getProlepticMonth())
          );
        }),
        (t.until = function (t, e) {
          E(t, 'endExclusive'),
            E(e, 'unit'),
            o(t, Z, 'endExclusive'),
            o(e, g, 'unit');
          var n = r.from(t);
          if (e instanceof C) {
            var i = n._getProlepticMonth() - this._getProlepticMonth();
            switch (e) {
              case C.MONTHS:
                return i;
              case C.YEARS:
                return i / 12;
              case C.DECADES:
                return i / 120;
              case C.CENTURIES:
                return i / 1200;
              case C.MILLENNIA:
                return i / 12e3;
              case C.ERAS:
                return n.getLong(b.ERA) - this.getLong(b.ERA);
            }
            throw new l('Unsupported unit: ' + e);
          }
          return e.between(this, n);
        }),
        (t.atDay = function (t) {
          return cn.of(this._year, this._month, t);
        }),
        (t.atEndOfMonth = function () {
          return cn.of(this._year, this._month, this.lengthOfMonth());
        }),
        (t.compareTo = function (t) {
          E(t, 'other'), o(t, r, 'other');
          var e = this._year - t.year();
          return 0 === e && (e = this._month - t.monthValue()), e;
        }),
        (t.isAfter = function (t) {
          return 0 < this.compareTo(t);
        }),
        (t.isBefore = function (t) {
          return this.compareTo(t) < 0;
        }),
        (t.equals = function (t) {
          if (this === t) return !0;
          if (t instanceof r) {
            var e = t;
            return (
              this.year() === e.year() && this.monthValue() === e.monthValue()
            );
          }
          return !1;
        }),
        (t.toString = function () {
          return Be.format(this);
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        (t.format = function (t) {
          return E(t, 'formatter'), t.format(this);
        }),
        r
      );
    })(Z);
  var Ze,
    ze = (function (n) {
      function i(t) {
        var e;
        return ((e = n.call(this) || this)._year = w.safeToInt(t)), e;
      }
      _(i, n);
      var t = i.prototype;
      return (
        (t.value = function () {
          return this._year;
        }),
        (i.now = function (t) {
          return (
            void 0 === t && (t = void 0),
            void 0 === t
              ? i.now0()
              : t instanceof pt
              ? i.nowZoneId(t)
              : i.nowClock(t)
          );
        }),
        (i.now0 = function () {
          return i.nowClock(En.systemDefaultZone());
        }),
        (i.nowZoneId = function (t) {
          return E(t, 'zone'), o(t, pt, 'zone'), i.nowClock(En.system(t));
        }),
        (i.nowClock = function (t) {
          E(t, 'clock'), o(t, En, 'clock');
          var e = cn.now(t);
          return i.of(e.year());
        }),
        (i.of = function (t) {
          return E(t, 'isoYear'), b.YEAR.checkValidValue(t), new i(t);
        }),
        (i.from = function (e) {
          if ((E(e, 'temporal'), o(e, k, 'temporal'), e instanceof i)) return e;
          try {
            return i.of(e.get(b.YEAR));
          } catch (t) {
            throw new M(
              'Unable to obtain Year from TemporalAccessor: ' +
                e +
                ', type ' +
                (e && null != e.constructor ? e.constructor.name : '')
            );
          }
        }),
        (i.parse = function (t, e) {
          return arguments.length <= 1
            ? i.parseText(t)
            : i.parseTextFormatter(t, e);
        }),
        (i.parseText = function (t) {
          return E(t, 'text'), i.parse(t, Ze);
        }),
        (i.parseTextFormatter = function (t, e) {
          return (
            void 0 === e && (e = Ze),
            E(t, 'text'),
            E(e, 'formatter'),
            o(e, We, 'formatter'),
            e.parse(t, i.FROM)
          );
        }),
        (i.isLeap = function (t) {
          return (
            0 === w.intMod(t, 4) &&
            (0 !== w.intMod(t, 100) || 0 === w.intMod(t, 400))
          );
        }),
        (t.isSupported = function (t) {
          return 1 === arguments.length && t instanceof L
            ? this.isSupportedField(t)
            : this.isSupportedUnit(t);
        }),
        (t.isSupportedField = function (t) {
          return t instanceof b
            ? t === b.YEAR || t === b.YEAR_OF_ERA || t === b.ERA
            : null != t && t.isSupportedBy(this);
        }),
        (t.isSupportedUnit = function (t) {
          return t instanceof C
            ? t === C.YEARS ||
                t === C.DECADES ||
                t === C.CENTURIES ||
                t === C.MILLENNIA ||
                t === C.ERAS
            : null != t && t.isSupportedBy(this);
        }),
        (t.range = function (t) {
          if (this.isSupported(t)) return t.range();
          if (t instanceof b) throw new l('Unsupported field: ' + t);
          return n.prototype.range.call(this, t);
        }),
        (t.get = function (t) {
          return this.range(t).checkValidIntValue(this.getLong(t), t);
        }),
        (t.getLong = function (t) {
          if ((E(t, 'field'), t instanceof b)) {
            switch (t) {
              case b.YEAR_OF_ERA:
                return this._year < 1 ? 1 - this._year : this._year;
              case b.YEAR:
                return this._year;
              case b.ERA:
                return this._year < 1 ? 0 : 1;
            }
            throw new l('Unsupported field: ' + t);
          }
          return t.getFrom(this);
        }),
        (t.isLeap = function () {
          return i.isLeap(this._year);
        }),
        (t.with = function (t, e) {
          return 2 === arguments.length && t instanceof L
            ? this.withFieldValue(t, e)
            : this.withAdjuster(t);
        }),
        (t.withAdjuster = function (t) {
          return E(t, 'adjuster'), t.adjustInto(this);
        }),
        (t.withFieldValue = function (t, e) {
          if ((E(t, 'field'), o(t, L, 'field'), t instanceof b)) {
            switch ((t.checkValidValue(e), t)) {
              case b.YEAR_OF_ERA:
                return i.of(this._year < 1 ? 1 - e : e);
              case b.YEAR:
                return i.of(e);
              case b.ERA:
                return this.getLong(b.ERA) === e ? this : i.of(1 - this._year);
            }
            throw new l('Unsupported field: ' + t);
          }
          return t.adjustInto(this, e);
        }),
        (t.plus = function (t, e) {
          return 1 === arguments.length
            ? this.plusAmount(t)
            : this.plusAmountToAddUnit(t, e);
        }),
        (t.plusAmount = function (t) {
          return E(t, 'amount'), o(t, T, 'amount'), t.addTo(this);
        }),
        (t.plusAmountToAddUnit = function (t, e) {
          if (
            (E(t, 'amountToAdd'), E(e, 'unit'), o(e, g, 'unit'), e instanceof C)
          ) {
            switch (e) {
              case C.YEARS:
                return this.plusYears(t);
              case C.DECADES:
                return this.plusYears(w.safeMultiply(t, 10));
              case C.CENTURIES:
                return this.plusYears(w.safeMultiply(t, 100));
              case C.MILLENNIA:
                return this.plusYears(w.safeMultiply(t, 1e3));
              case C.ERAS:
                return this.with(b.ERA, w.safeAdd(this.getLong(b.ERA), t));
            }
            throw new l('Unsupported unit: ' + e);
          }
          return e.addTo(this, t);
        }),
        (t.plusYears = function (t) {
          return 0 === t
            ? this
            : i.of(b.YEAR.checkValidIntValue(w.safeAdd(this._year, t)));
        }),
        (t.minus = function (t, e) {
          return 1 === arguments.length
            ? this.minusAmount(t)
            : this.minusAmountToSubtractUnit(t, e);
        }),
        (t.minusAmount = function (t) {
          return E(t, 'amount'), o(t, T, 'amount'), t.subtractFrom(this);
        }),
        (t.minusAmountToSubtractUnit = function (t, e) {
          return (
            E(t, 'amountToSubtract'),
            E(e, 'unit'),
            o(e, g, 'unit'),
            t === w.MIN_SAFE_INTEGER
              ? this.plus(w.MAX_SAFE_INTEGER, e).plus(1, e)
              : this.plus(-t, e)
          );
        }),
        (t.minusYears = function (t) {
          return t === w.MIN_SAFE_INTEGER
            ? this.plusYears(w.MAX_SAFE_INTEGER).plusYears(1)
            : this.plusYears(-t);
        }),
        (t.adjustInto = function (t) {
          return E(t, 'temporal'), t.with(b.YEAR, this._year);
        }),
        (t.isValidMonthDay = function (t) {
          return null != t && t.isValidYear(this._year);
        }),
        (t.length = function () {
          return this.isLeap() ? 366 : 365;
        }),
        (t.atDay = function (t) {
          return cn.ofYearDay(this._year, t);
        }),
        (t.atMonth = function (t) {
          return 1 === arguments.length && t instanceof tt
            ? this.atMonthMonth(t)
            : this.atMonthNumber(t);
        }),
        (t.atMonthMonth = function (t) {
          return E(t, 'month'), o(t, tt, 'month'), qe.of(this._year, t);
        }),
        (t.atMonthNumber = function (t) {
          return E(t, 'month'), qe.of(this._year, t);
        }),
        (t.atMonthDay = function (t) {
          return E(t, 'monthDay'), o(t, ke, 'monthDay'), t.atYear(this._year);
        }),
        (t.query = function (t) {
          return (
            E(t, 'query()'),
            o(t, j, 'query()'),
            t === H.chronology()
              ? an.INSTANCE
              : t === H.precision()
              ? C.YEARS
              : t === H.localDate() ||
                t === H.localTime() ||
                t === H.zone() ||
                t === H.zoneId() ||
                t === H.offset()
              ? null
              : n.prototype.query.call(this, t)
          );
        }),
        (t.compareTo = function (t) {
          return E(t, 'other'), o(t, i, 'other'), this._year - t._year;
        }),
        (t.isAfter = function (t) {
          return E(t, 'other'), o(t, i, 'other'), this._year > t._year;
        }),
        (t.isBefore = function (t) {
          return E(t, 'other'), o(t, i, 'other'), this._year < t._year;
        }),
        (t.format = function (t) {
          return E(t, 'formatter'), o(t, We, 'formatter'), t.format(this);
        }),
        (t.equals = function (t) {
          return this === t || (t instanceof i && this.value() === t.value());
        }),
        (t.toString = function () {
          return '' + this._year;
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        i
      );
    })(Z);
  var Ke =
    ((je.prototype.adjustInto = function (t) {
      n('adjustInto');
    }),
    je);
  function je() {}
  var Ge =
    ((Xe.firstDayOfMonth = function () {
      return Qe.FIRST_DAY_OF_MONTH;
    }),
    (Xe.lastDayOfMonth = function () {
      return Qe.LAST_DAY_OF_MONTH;
    }),
    (Xe.firstDayOfNextMonth = function () {
      return Qe.FIRST_DAY_OF_NEXT_MONTH;
    }),
    (Xe.firstDayOfYear = function () {
      return Qe.FIRST_DAY_OF_YEAR;
    }),
    (Xe.lastDayOfYear = function () {
      return Qe.LAST_DAY_OF_YEAR;
    }),
    (Xe.firstDayOfNextYear = function () {
      return Qe.FIRST_DAY_OF_NEXT_YEAR;
    }),
    (Xe.firstInMonth = function (t) {
      return E(t, 'dayOfWeek'), new en(1, t);
    }),
    (Xe.lastInMonth = function (t) {
      return E(t, 'dayOfWeek'), new en(-1, t);
    }),
    (Xe.dayOfWeekInMonth = function (t, e) {
      return E(e, 'dayOfWeek'), new en(t, e);
    }),
    (Xe.next = function (t) {
      return new sn(2, t);
    }),
    (Xe.nextOrSame = function (t) {
      return new sn(0, t);
    }),
    (Xe.previous = function (t) {
      return new sn(3, t);
    }),
    (Xe.previousOrSame = function (t) {
      return new sn(1, t);
    }),
    Xe);
  function Xe() {}
  var Je,
    Qe =
      (_($e, (Je = Ke)),
      ($e.prototype.adjustInto = function (t) {
        switch (this._ordinal) {
          case 0:
            return t.with(b.DAY_OF_MONTH, 1);
          case 1:
            return t.with(b.DAY_OF_MONTH, t.range(b.DAY_OF_MONTH).maximum());
          case 2:
            return t.with(b.DAY_OF_MONTH, 1).plus(1, C.MONTHS);
          case 3:
            return t.with(b.DAY_OF_YEAR, 1);
          case 4:
            return t.with(b.DAY_OF_YEAR, t.range(b.DAY_OF_YEAR).maximum());
          case 5:
            return t.with(b.DAY_OF_YEAR, 1).plus(1, C.YEARS);
        }
        throw new r('Unreachable');
      }),
      $e);
  function $e(t) {
    var e;
    return ((e = Je.call(this) || this)._ordinal = t), e;
  }
  (Qe.FIRST_DAY_OF_MONTH = new Qe(0)),
    (Qe.LAST_DAY_OF_MONTH = new Qe(1)),
    (Qe.FIRST_DAY_OF_NEXT_MONTH = new Qe(2)),
    (Qe.FIRST_DAY_OF_YEAR = new Qe(3)),
    (Qe.LAST_DAY_OF_YEAR = new Qe(4)),
    (Qe.FIRST_DAY_OF_NEXT_YEAR = new Qe(5));
  var tn,
    en =
      (_(nn, (tn = Ke)),
      (nn.prototype.adjustInto = function (t) {
        if (0 <= this._ordinal) {
          var e = t.with(b.DAY_OF_MONTH, 1),
            n = e.get(b.DAY_OF_WEEK),
            i = w.intMod(this._dowValue - n + 7, 7);
          return (i += 7 * (this._ordinal - 1)), e.plus(i, C.DAYS);
        }
        var r = t.with(b.DAY_OF_MONTH, t.range(b.DAY_OF_MONTH).maximum()),
          s = r.get(b.DAY_OF_WEEK),
          o = this._dowValue - s;
        return (
          (o = 0 === o ? 0 : 0 < o ? o - 7 : o),
          (o -= 7 * (-this._ordinal - 1)),
          r.plus(o, C.DAYS)
        );
      }),
      nn);
  function nn(t, e) {
    var n;
    return (
      ((n = tn.call(this) || this)._ordinal = t), (n._dowValue = e.value()), n
    );
  }
  var rn,
    sn =
      (_(on, (rn = Ke)),
      (on.prototype.adjustInto = function (t) {
        var e = t.get(b.DAY_OF_WEEK);
        if (this._relative < 2 && e === this._dowValue) return t;
        if (0 == (1 & this._relative)) {
          var n = e - this._dowValue;
          return t.plus(0 <= n ? 7 - n : -n, C.DAYS);
        }
        var i = this._dowValue - e;
        return t.minus(0 <= i ? 7 - i : -i, C.DAYS);
      }),
      on);
  function on(t, e) {
    var n;
    return (
      (n = rn.call(this) || this),
      E(e, 'dayOfWeek'),
      (n._relative = t),
      (n._dowValue = e.value()),
      n
    );
  }
  var an = (function (t) {
    function e() {
      return t.apply(this, arguments) || this;
    }
    _(e, t),
      (e.isLeapYear = function (t) {
        return 0 == (3 & t) && (t % 100 != 0 || t % 400 == 0);
      });
    var n = e.prototype;
    return (
      (n._updateResolveMap = function (t, e, n) {
        E(t, 'fieldValues'), E(e, 'field');
        var i = t.get(e);
        if (null != i && i !== n)
          throw new M(
            'Invalid state, field: ' +
              e +
              ' ' +
              i +
              ' conflicts with ' +
              e +
              ' ' +
              n
          );
        t.put(e, n);
      }),
      (n.resolveDate = function (t, e) {
        if (t.containsKey(b.EPOCH_DAY))
          return cn.ofEpochDay(t.remove(b.EPOCH_DAY));
        var n = t.remove(b.PROLEPTIC_MONTH);
        null != n &&
          (e !== ft.LENIENT && b.PROLEPTIC_MONTH.checkValidValue(n),
          this._updateResolveMap(t, b.MONTH_OF_YEAR, w.floorMod(n, 12) + 1),
          this._updateResolveMap(t, b.YEAR, w.floorDiv(n, 12)));
        var i = t.remove(b.YEAR_OF_ERA);
        if (null != i) {
          e !== ft.LENIENT && b.YEAR_OF_ERA.checkValidValue(i);
          var r = t.remove(b.ERA);
          if (null == r) {
            var s = t.get(b.YEAR);
            e === ft.STRICT
              ? null != s
                ? this._updateResolveMap(
                    t,
                    b.YEAR,
                    0 < s ? i : w.safeSubtract(1, i)
                  )
                : t.put(b.YEAR_OF_ERA, i)
              : this._updateResolveMap(
                  t,
                  b.YEAR,
                  null == s || 0 < s ? i : w.safeSubtract(1, i)
                );
          } else if (1 === r) this._updateResolveMap(t, b.YEAR, i);
          else {
            if (0 !== r) throw new M('Invalid value for era: ' + r);
            this._updateResolveMap(t, b.YEAR, w.safeSubtract(1, i));
          }
        } else t.containsKey(b.ERA) && b.ERA.checkValidValue(t.get(b.ERA));
        if (t.containsKey(b.YEAR)) {
          if (t.containsKey(b.MONTH_OF_YEAR) && t.containsKey(b.DAY_OF_MONTH)) {
            var o = b.YEAR.checkValidIntValue(t.remove(b.YEAR)),
              a = t.remove(b.MONTH_OF_YEAR),
              u = t.remove(b.DAY_OF_MONTH);
            if (e !== ft.LENIENT)
              return (
                e === ft.SMART &&
                  (b.DAY_OF_MONTH.checkValidValue(u),
                  4 === a || 6 === a || 9 === a || 11 === a
                    ? (u = Math.min(u, 30))
                    : 2 === a &&
                      (u = Math.min(u, tt.FEBRUARY.length(ze.isLeap(o))))),
                cn.of(o, a, u)
              );
            var h = a - 1,
              f = u - 1;
            return cn.of(o, 1, 1).plusMonths(h).plusDays(f);
          }
          if (t.containsKey(b.DAY_OF_YEAR)) {
            var c = b.YEAR.checkValidIntValue(t.remove(b.YEAR));
            if (e === ft.LENIENT) {
              var l = w.safeSubtract(t.remove(b.DAY_OF_YEAR), 1);
              return cn.ofYearDay(c, 1).plusDays(l);
            }
            var _ = b.DAY_OF_YEAR.checkValidIntValue(t.remove(b.DAY_OF_YEAR));
            return cn.ofYearDay(c, _);
          }
          if (t.containsKey(b.ALIGNED_WEEK_OF_YEAR)) {
            if (t.containsKey(b.ALIGNED_DAY_OF_WEEK_IN_YEAR)) {
              var d = b.YEAR.checkValidIntValue(t.remove(b.YEAR));
              if (e === ft.LENIENT) {
                var p = w.safeSubtract(t.remove(b.ALIGNED_WEEK_OF_YEAR), 1),
                  E = w.safeSubtract(
                    t.remove(b.ALIGNED_DAY_OF_WEEK_IN_YEAR),
                    1
                  );
                return cn.of(d, 1, 1).plusWeeks(p).plusDays(E);
              }
              var O = b.ALIGNED_WEEK_OF_YEAR.checkValidIntValue(
                  t.remove(b.ALIGNED_WEEK_OF_YEAR)
                ),
                S = b.ALIGNED_DAY_OF_WEEK_IN_YEAR.checkValidIntValue(
                  t.remove(b.ALIGNED_DAY_OF_WEEK_IN_YEAR)
                ),
                m = cn.of(d, 1, 1).plusDays(7 * (O - 1) + (S - 1));
              if (e === ft.STRICT && m.get(b.YEAR) !== d)
                throw new M(
                  'Strict mode rejected date parsed to a different year'
                );
              return m;
            }
            if (t.containsKey(b.DAY_OF_WEEK)) {
              var N = b.YEAR.checkValidIntValue(t.remove(b.YEAR));
              if (e === ft.LENIENT) {
                var D = w.safeSubtract(t.remove(b.ALIGNED_WEEK_OF_YEAR), 1),
                  A = w.safeSubtract(t.remove(b.DAY_OF_WEEK), 1);
                return cn.of(N, 1, 1).plusWeeks(D).plusDays(A);
              }
              var v = b.ALIGNED_WEEK_OF_YEAR.checkValidIntValue(
                  t.remove(b.ALIGNED_WEEK_OF_YEAR)
                ),
                T = b.DAY_OF_WEEK.checkValidIntValue(t.remove(b.DAY_OF_WEEK)),
                y = cn
                  .of(N, 1, 1)
                  .plusWeeks(v - 1)
                  .with(Ge.nextOrSame(Q.of(T)));
              if (e === ft.STRICT && y.get(b.YEAR) !== N)
                throw new M(
                  'Strict mode rejected date parsed to a different month'
                );
              return y;
            }
          }
        }
        return null;
      }),
      (n.date = function (t) {
        return cn.from(t);
      }),
      e
    );
  })(D);
  var un = (function (e) {
    function n() {
      return e.apply(this, arguments) || this;
    }
    _(n, e);
    var t = n.prototype;
    return (
      (t.query = function (t) {
        return t === H.zoneId() || t === H.zone()
          ? this.zone()
          : t === H.chronology()
          ? this.toLocalDate().chronology()
          : t === H.precision()
          ? C.NANOS
          : t === H.offset()
          ? this.offset()
          : t === H.localDate()
          ? cn.ofEpochDay(this.toLocalDate().toEpochDay())
          : t === H.localTime()
          ? this.toLocalTime()
          : e.prototype.query.call(this, t);
      }),
      (t.format = function (t) {
        return E(t, 'formatter'), t.format(this);
      }),
      (t.toInstant = function () {
        return pn.ofEpochSecond(
          this.toEpochSecond(),
          this.toLocalTime().nano()
        );
      }),
      (t.toEpochSecond = function () {
        var t =
          86400 * this.toLocalDate().toEpochDay() +
          this.toLocalTime().toSecondOfDay();
        return (t -= this.offset().totalSeconds());
      }),
      (t.compareTo = function (t) {
        E(t, 'other');
        var e = w.compareNumbers(this.toEpochSecond(), t.toEpochSecond());
        return (
          0 === e &&
            0 === (e = this.toLocalTime().nano() - t.toLocalTime().nano()) &&
            0 === (e = this.toLocalDateTime().compareTo(t.toLocalDateTime())) &&
            (e = (function (t, e) {
              if (t < e) return -1;
              if (e < t) return 1;
              return 0;
            })(this.zone().id(), t.zone().id())),
          e
        );
      }),
      (t.isAfter = function (t) {
        E(t, 'other');
        var e = this.toEpochSecond(),
          n = t.toEpochSecond();
        return (
          n < e ||
          (e === n && this.toLocalTime().nano() > t.toLocalTime().nano())
        );
      }),
      (t.isBefore = function (t) {
        E(t, 'other');
        var e = this.toEpochSecond(),
          n = t.toEpochSecond();
        return (
          e < n ||
          (e === n && this.toLocalTime().nano() < t.toLocalTime().nano())
        );
      }),
      (t.isEqual = function (t) {
        return (
          E(t, 'other'),
          this.toEpochSecond() === t.toEpochSecond() &&
            this.toLocalTime().nano() === t.toLocalTime().nano()
        );
      }),
      (t.equals = function (t) {
        return this === t || (t instanceof n && 0 === this.compareTo(t));
      }),
      n
    );
  })(Z);
  var hn = (function (r) {
    function h(t, e, n) {
      var i;
      return (
        E(t, 'dateTime'),
        E(e, 'offset'),
        E(n, 'zone'),
        ((i = r.call(this) || this)._dateTime = t),
        (i._offset = e),
        (i._zone = n),
        i
      );
    }
    _(h, r),
      (h.now = function (t) {
        var e;
        return (
          (e =
            t instanceof pt
              ? En.system(t)
              : null == t
              ? En.systemDefaultZone()
              : t),
          h.ofInstant(e.instant(), e.zone())
        );
      }),
      (h.of = function (t) {
        return arguments.length <= 2
          ? h.of2.apply(this, arguments)
          : 3 === arguments.length && t instanceof cn
          ? h.of3.apply(this, arguments)
          : h.of8.apply(this, arguments);
      }),
      (h.of3 = function (t, e, n) {
        return h.of2(_n.of(t, e), n);
      }),
      (h.of2 = function (t, e) {
        return h.ofLocal(t, e, null);
      }),
      (h.of8 = function (t, e, n, i, r, s, o, a) {
        var u = _n.of(t, e, n, i, r, s, o);
        return h.ofLocal(u, a, null);
      }),
      (h.ofLocal = function (t, e, n) {
        if ((E(t, 'localDateTime'), E(e, 'zone'), e instanceof Nt))
          return new h(t, e, e);
        var i = null,
          r = e.rules(),
          s = r.validOffsets(t);
        if (1 === s.length) i = s[0];
        else if (0 === s.length) {
          var o = r.transition(t);
          (t = t.plusSeconds(o.duration().seconds())), (i = o.offsetAfter());
        } else
          i =
            null != n &&
            s.some(function (t) {
              return t.equals(n);
            })
              ? n
              : E(s[0], 'offset');
        return new h(t, i, e);
      }),
      (h.ofInstant = function () {
        return 2 === arguments.length
          ? h.ofInstant2.apply(this, arguments)
          : h.ofInstant3.apply(this, arguments);
      }),
      (h.ofInstant2 = function (t, e) {
        return (
          E(t, 'instant'), E(e, 'zone'), h._create(t.epochSecond(), t.nano(), e)
        );
      }),
      (h.ofInstant3 = function (t, e, n) {
        return (
          E(t, 'localDateTime'),
          E(e, 'offset'),
          E(n, 'zone'),
          h._create(t.toEpochSecond(e), t.nano(), n)
        );
      }),
      (h._create = function (t, e, n) {
        var i = n.rules(),
          r = pn.ofEpochSecond(t, e),
          s = i.offset(r);
        return new h(_n.ofEpochSecond(t, e, s), s, n);
      }),
      (h.ofStrict = function (t, e, n) {
        E(t, 'localDateTime'), E(e, 'offset'), E(n, 'zone');
        var i = n.rules();
        if (!1 !== i.isValidOffset(t, e)) return new h(t, e, n);
        var r = i.transition(t);
        if (null != r && r.isGap())
          throw new M(
            'LocalDateTime ' +
              t +
              ' does not exist in zone ' +
              n +
              ' due to a gap in the local time-line, typically caused by daylight savings'
          );
        throw new M(
          'ZoneOffset "' +
            e +
            '" is not valid for LocalDateTime "' +
            t +
            '" in zone "' +
            n +
            '"'
        );
      }),
      (h.ofLenient = function (t, e, n) {
        if (
          (E(t, 'localDateTime'),
          E(e, 'offset'),
          E(n, 'zone'),
          n instanceof Nt && !1 === e.equals(n))
        )
          throw new c('ZoneId must match ZoneOffset');
        return new h(t, e, n);
      }),
      (h.from = function (t) {
        if ((E(t, 'temporal'), t instanceof h)) return t;
        var e = pt.from(t);
        if (t.isSupported(b.INSTANT_SECONDS)) {
          var n = h._from(t, e);
          if (null != n) return n;
        }
        var i = _n.from(t);
        return h.of2(i, e);
      }),
      (h._from = function (t, e) {
        try {
          return h.__from(t, e);
        } catch (t) {
          if (!(t instanceof M)) throw t;
        }
      }),
      (h.__from = function (t, e) {
        var n = t.getLong(b.INSTANT_SECONDS),
          i = t.get(b.NANO_OF_SECOND);
        return h._create(n, i, e);
      }),
      (h.parse = function (t, e) {
        return (
          void 0 === e && (e = We.ISO_ZONED_DATE_TIME),
          E(e, 'formatter'),
          e.parse(t, h.FROM)
        );
      });
    var t = h.prototype;
    return (
      (t._resolveLocal = function (t) {
        return E(t, 'newDateTime'), h.ofLocal(t, this._zone, this._offset);
      }),
      (t._resolveInstant = function (t) {
        return h.ofInstant3(t, this._offset, this._zone);
      }),
      (t._resolveOffset = function (t) {
        return !1 === t.equals(this._offset) &&
          this._zone.rules().isValidOffset(this._dateTime, t)
          ? new h(this._dateTime, t, this._zone)
          : this;
      }),
      (t.isSupported = function (t) {
        return (
          t instanceof b ||
          (t instanceof C
            ? t.isDateBased() || t.isTimeBased()
            : null != t && t.isSupportedBy(this))
        );
      }),
      (t.range = function (t) {
        return t instanceof b
          ? t === b.INSTANT_SECONDS || t === b.OFFSET_SECONDS
            ? t.range()
            : this._dateTime.range(t)
          : t.rangeRefinedBy(this);
      }),
      (t.get = function (t) {
        return this.getLong(t);
      }),
      (t.getLong = function (t) {
        if (t instanceof b) {
          switch (t) {
            case b.INSTANT_SECONDS:
              return this.toEpochSecond();
            case b.OFFSET_SECONDS:
              return this._offset.totalSeconds();
          }
          return this._dateTime.getLong(t);
        }
        return E(t, 'field'), t.getFrom(this);
      }),
      (t.offset = function () {
        return this._offset;
      }),
      (t.withEarlierOffsetAtOverlap = function () {
        var t = this._zone.rules().transition(this._dateTime);
        if (null != t && t.isOverlap()) {
          var e = t.offsetBefore();
          if (!1 === e.equals(this._offset))
            return new h(this._dateTime, e, this._zone);
        }
        return this;
      }),
      (t.withLaterOffsetAtOverlap = function () {
        var t = this._zone.rules().transition(this.toLocalDateTime());
        if (null != t) {
          var e = t.offsetAfter();
          if (!1 === e.equals(this._offset))
            return new h(this._dateTime, e, this._zone);
        }
        return this;
      }),
      (t.zone = function () {
        return this._zone;
      }),
      (t.withZoneSameLocal = function (t) {
        return (
          E(t, 'zone'),
          this._zone.equals(t)
            ? this
            : h.ofLocal(this._dateTime, t, this._offset)
        );
      }),
      (t.withZoneSameInstant = function (t) {
        return (
          E(t, 'zone'),
          this._zone.equals(t)
            ? this
            : h._create(
                this._dateTime.toEpochSecond(this._offset),
                this._dateTime.nano(),
                t
              )
        );
      }),
      (t.withFixedOffsetZone = function () {
        return this._zone.equals(this._offset)
          ? this
          : new h(this._dateTime, this._offset, this._offset);
      }),
      (t.year = function () {
        return this._dateTime.year();
      }),
      (t.monthValue = function () {
        return this._dateTime.monthValue();
      }),
      (t.month = function () {
        return this._dateTime.month();
      }),
      (t.dayOfMonth = function () {
        return this._dateTime.dayOfMonth();
      }),
      (t.dayOfYear = function () {
        return this._dateTime.dayOfYear();
      }),
      (t.dayOfWeek = function () {
        return this._dateTime.dayOfWeek();
      }),
      (t.hour = function () {
        return this._dateTime.hour();
      }),
      (t.minute = function () {
        return this._dateTime.minute();
      }),
      (t.second = function () {
        return this._dateTime.second();
      }),
      (t.nano = function () {
        return this._dateTime.nano();
      }),
      (t.with = function () {
        return 1 === arguments.length
          ? this.withTemporalAdjuster.apply(this, arguments)
          : this.with2.apply(this, arguments);
      }),
      (t.withTemporalAdjuster = function (t) {
        if (t instanceof cn)
          return this._resolveLocal(_n.of(t, this._dateTime.toLocalTime()));
        if (t instanceof dn)
          return this._resolveLocal(_n.of(this._dateTime.toLocalDate(), t));
        if (t instanceof _n) return this._resolveLocal(t);
        if (t instanceof pn) {
          var e = t;
          return h._create(e.epochSecond(), e.nano(), this._zone);
        }
        return t instanceof Nt
          ? this._resolveOffset(t)
          : (E(t, 'adjuster'), t.adjustInto(this));
      }),
      (t.with2 = function (t, e) {
        if (t instanceof b) {
          switch (t) {
            case b.INSTANT_SECONDS:
              return h._create(e, this.nano(), this._zone);
            case b.OFFSET_SECONDS:
              var n = Nt.ofTotalSeconds(t.checkValidIntValue(e));
              return this._resolveOffset(n);
          }
          return this._resolveLocal(this._dateTime.with(t, e));
        }
        return t.adjustInto(this, e);
      }),
      (t.withYear = function (t) {
        return this._resolveLocal(this._dateTime.withYear(t));
      }),
      (t.withMonth = function (t) {
        return this._resolveLocal(this._dateTime.withMonth(t));
      }),
      (t.withDayOfMonth = function (t) {
        return this._resolveLocal(this._dateTime.withDayOfMonth(t));
      }),
      (t.withDayOfYear = function (t) {
        return this._resolveLocal(this._dateTime.withDayOfYear(t));
      }),
      (t.withHour = function (t) {
        return this._resolveLocal(this._dateTime.withHour(t));
      }),
      (t.withMinute = function (t) {
        return this._resolveLocal(this._dateTime.withMinute(t));
      }),
      (t.withSecond = function (t) {
        return this._resolveLocal(this._dateTime.withSecond(t));
      }),
      (t.withNano = function (t) {
        return this._resolveLocal(this._dateTime.withNano(t));
      }),
      (t.truncatedTo = function (t) {
        return this._resolveLocal(this._dateTime.truncatedTo(t));
      }),
      (t.plus = function () {
        return 1 === arguments.length
          ? this.plusTemporalAmount.apply(this, arguments)
          : this.plus2.apply(this, arguments);
      }),
      (t.plusTemporalAmount = function (t) {
        return E(t), t.addTo(this);
      }),
      (t.plus2 = function (t, e) {
        return e instanceof C
          ? e.isDateBased()
            ? this._resolveLocal(this._dateTime.plus(t, e))
            : this._resolveInstant(this._dateTime.plus(t, e))
          : (E(e, 'unit'), e.addTo(this, t));
      }),
      (t.plusYears = function (t) {
        return this._resolveLocal(this._dateTime.plusYears(t));
      }),
      (t.plusMonths = function (t) {
        return this._resolveLocal(this._dateTime.plusMonths(t));
      }),
      (t.plusWeeks = function (t) {
        return this._resolveLocal(this._dateTime.plusWeeks(t));
      }),
      (t.plusDays = function (t) {
        return this._resolveLocal(this._dateTime.plusDays(t));
      }),
      (t.plusHours = function (t) {
        return this._resolveInstant(this._dateTime.plusHours(t));
      }),
      (t.plusMinutes = function (t) {
        return this._resolveInstant(this._dateTime.plusMinutes(t));
      }),
      (t.plusSeconds = function (t) {
        return this._resolveInstant(this._dateTime.plusSeconds(t));
      }),
      (t.plusNanos = function (t) {
        return this._resolveInstant(this._dateTime.plusNanos(t));
      }),
      (t.minus = function () {
        return 1 === arguments.length
          ? this.minusTemporalAmount.apply(this, arguments)
          : this.minus2.apply(this, arguments);
      }),
      (t.minusTemporalAmount = function (t) {
        return E(t, 'amount'), t.subtractFrom(this);
      }),
      (t.minus2 = function (t, e) {
        return this.plus2(-1 * t, e);
      }),
      (t.minusYears = function (t) {
        return this.plusYears(-1 * t);
      }),
      (t.minusMonths = function (t) {
        return this.plusMonths(-1 * t);
      }),
      (t.minusWeeks = function (t) {
        return this.plusWeeks(-1 * t);
      }),
      (t.minusDays = function (t) {
        return this.plusDays(-1 * t);
      }),
      (t.minusHours = function (t) {
        return this.plusHours(-1 * t);
      }),
      (t.minusMinutes = function (t) {
        return this.plusMinutes(-1 * t);
      }),
      (t.minusSeconds = function (t) {
        return this.plusSeconds(-1 * t);
      }),
      (t.minusNanos = function (t) {
        return this.plusNanos(-1 * t);
      }),
      (t.query = function (t) {
        return t === H.localDate()
          ? this.toLocalDate()
          : (E(t, 'query'), r.prototype.query.call(this, t));
      }),
      (t.until = function (t, e) {
        var n = h.from(t);
        if (e instanceof C) {
          if (((n = n.withZoneSameInstant(this._zone)), e.isDateBased()))
            return this._dateTime.until(n._dateTime, e);
          var i = this._offset.totalSeconds() - n._offset.totalSeconds(),
            r = n._dateTime.plusSeconds(i);
          return this._dateTime.until(r, e);
        }
        return e.between(this, n);
      }),
      (t.toLocalDateTime = function () {
        return this._dateTime;
      }),
      (t.toLocalDate = function () {
        return this._dateTime.toLocalDate();
      }),
      (t.toLocalTime = function () {
        return this._dateTime.toLocalTime();
      }),
      (t.equals = function (t) {
        return (
          this === t ||
          (t instanceof h &&
            this._dateTime.equals(t._dateTime) &&
            this._offset.equals(t._offset) &&
            this._zone.equals(t._zone))
        );
      }),
      (t.hashCode = function () {
        return w.hashCode(
          this._dateTime.hashCode(),
          this._offset.hashCode(),
          this._zone.hashCode()
        );
      }),
      (t.toString = function () {
        var t = this._dateTime.toString() + this._offset.toString();
        return (
          this._offset !== this._zone &&
            (t += '[' + this._zone.toString() + ']'),
          t
        );
      }),
      (t.toJSON = function () {
        return this.toString();
      }),
      (t.format = function (t) {
        return r.prototype.format.call(this, t);
      }),
      h
    );
  })(un);
  var fn = 146097,
    cn = (function (r) {
      function f(t, e, n) {
        var i;
        return (
          (i = r.call(this) || this),
          e instanceof tt && (e = e.value()),
          (i._year = w.safeToInt(t)),
          (i._month = w.safeToInt(e)),
          (i._day = w.safeToInt(n)),
          f._validate(i._year, i._month, i._day),
          i
        );
      }
      _(f, r),
        (f.now = function (t) {
          var e;
          return (
            (e =
              null == t
                ? En.systemDefaultZone()
                : t instanceof pt
                ? En.system(t)
                : t),
            f.ofInstant(e.instant(), e.zone())
          );
        }),
        (f.ofInstant = function (t, e) {
          void 0 === e && (e = pt.systemDefault()), E(t, 'instant');
          var n = e.rules().offset(t),
            i = t.epochSecond() + n.totalSeconds(),
            r = w.floorDiv(i, dn.SECONDS_PER_DAY);
          return f.ofEpochDay(r);
        }),
        (f.of = function (t, e, n) {
          return new f(t, e, n);
        }),
        (f.ofYearDay = function (t, e) {
          b.YEAR.checkValidValue(t);
          var n = an.isLeapYear(t);
          366 === e &&
            !1 === n &&
            m(
              !1,
              "Invalid date 'DayOfYear 366' as '" + t + "' is not a leap year",
              M
            );
          var i = tt.of(Math.floor((e - 1) / 31 + 1));
          i.firstDayOfYear(n) + i.length(n) - 1 < e && (i = i.plus(1));
          var r = e - i.firstDayOfYear(n) + 1;
          return new f(t, i.value(), r);
        }),
        (f.ofEpochDay = function (t) {
          var e, n, i, r, s;
          void 0 === t && (t = 0),
            (s = t + 719528),
            (s -= 60) < (e = 0) &&
              ((e = 400 * (n = w.intDiv(s + 1, fn) - 1)), (s += -n * fn)),
            (i =
              s -
              (365 * (r = w.intDiv(400 * s + 591, fn)) +
                w.intDiv(r, 4) -
                w.intDiv(r, 100) +
                w.intDiv(r, 400))) < 0 &&
              (i =
                s -
                (365 * --r +
                  w.intDiv(r, 4) -
                  w.intDiv(r, 100) +
                  w.intDiv(r, 400))),
            (r += e);
          var o = i,
            a = w.intDiv(5 * o + 2, 153),
            u = ((a + 2) % 12) + 1,
            h = o - w.intDiv(306 * a + 5, 10) + 1;
          return new f((r += w.intDiv(a, 10)), u, h);
        }),
        (f.from = function (t) {
          E(t, 'temporal');
          var e = t.query(H.localDate());
          if (null == e)
            throw new M(
              'Unable to obtain LocalDate from TemporalAccessor: ' +
                t +
                ', type ' +
                (null != t.constructor ? t.constructor.name : '')
            );
          return e;
        }),
        (f.parse = function (t, e) {
          return (
            void 0 === e && (e = We.ISO_LOCAL_DATE),
            m(null != e, 'formatter', s),
            e.parse(t, f.FROM)
          );
        }),
        (f._resolvePreviousValid = function (t, e, n) {
          switch (e) {
            case 2:
              n = Math.min(n, an.isLeapYear(t) ? 29 : 28);
              break;
            case 4:
            case 6:
            case 9:
            case 11:
              n = Math.min(n, 30);
          }
          return f.of(t, e, n);
        }),
        (f._validate = function (t, e, n) {
          var i;
          if (
            (b.YEAR.checkValidValue(t),
            b.MONTH_OF_YEAR.checkValidValue(e),
            b.DAY_OF_MONTH.checkValidValue(n),
            28 < n)
          ) {
            switch (((i = 31), e)) {
              case 2:
                i = an.isLeapYear(t) ? 29 : 28;
                break;
              case 4:
              case 6:
              case 9:
              case 11:
                i = 30;
            }
            i < n &&
              m(
                !1,
                29 === n
                  ? "Invalid date 'February 29' as '" +
                      t +
                      "' is not a leap year"
                  : "Invalid date '" + t + "' '" + e + "' '" + n + "'",
                M
              );
          }
        });
      var t = f.prototype;
      return (
        (t.isSupported = function (t) {
          return r.prototype.isSupported.call(this, t);
        }),
        (t.range = function (t) {
          if (t instanceof b) {
            if (t.isDateBased()) {
              switch (t) {
                case b.DAY_OF_MONTH:
                  return U.of(1, this.lengthOfMonth());
                case b.DAY_OF_YEAR:
                  return U.of(1, this.lengthOfYear());
                case b.ALIGNED_WEEK_OF_MONTH:
                  return U.of(
                    1,
                    this.month() === tt.FEBRUARY && !1 === this.isLeapYear()
                      ? 4
                      : 5
                  );
                case b.YEAR_OF_ERA:
                  return this._year <= 0
                    ? U.of(1, ze.MAX_VALUE + 1)
                    : U.of(1, ze.MAX_VALUE);
              }
              return t.range();
            }
            throw new l('Unsupported field: ' + t);
          }
          return t.rangeRefinedBy(this);
        }),
        (t.get = function (t) {
          return this.getLong(t);
        }),
        (t.getLong = function (t) {
          return (
            m(null != t, '', s),
            t instanceof b ? this._get0(t) : t.getFrom(this)
          );
        }),
        (t._get0 = function (t) {
          switch (t) {
            case b.DAY_OF_WEEK:
              return this.dayOfWeek().value();
            case b.ALIGNED_DAY_OF_WEEK_IN_MONTH:
              return w.intMod(this._day - 1, 7) + 1;
            case b.ALIGNED_DAY_OF_WEEK_IN_YEAR:
              return w.intMod(this.dayOfYear() - 1, 7) + 1;
            case b.DAY_OF_MONTH:
              return this._day;
            case b.DAY_OF_YEAR:
              return this.dayOfYear();
            case b.EPOCH_DAY:
              return this.toEpochDay();
            case b.ALIGNED_WEEK_OF_MONTH:
              return w.intDiv(this._day - 1, 7) + 1;
            case b.ALIGNED_WEEK_OF_YEAR:
              return w.intDiv(this.dayOfYear() - 1, 7) + 1;
            case b.MONTH_OF_YEAR:
              return this._month;
            case b.PROLEPTIC_MONTH:
              return this._prolepticMonth();
            case b.YEAR_OF_ERA:
              return 1 <= this._year ? this._year : 1 - this._year;
            case b.YEAR:
              return this._year;
            case b.ERA:
              return 1 <= this._year ? 1 : 0;
          }
          throw new l('Unsupported field: ' + t);
        }),
        (t._prolepticMonth = function () {
          return 12 * this._year + (this._month - 1);
        }),
        (t.chronology = function () {
          return an.INSTANCE;
        }),
        (t.year = function () {
          return this._year;
        }),
        (t.monthValue = function () {
          return this._month;
        }),
        (t.month = function () {
          return tt.of(this._month);
        }),
        (t.dayOfMonth = function () {
          return this._day;
        }),
        (t.dayOfYear = function () {
          return this.month().firstDayOfYear(this.isLeapYear()) + this._day - 1;
        }),
        (t.dayOfWeek = function () {
          var t = w.floorMod(this.toEpochDay() + 3, 7);
          return Q.of(t + 1);
        }),
        (t.isLeapYear = function () {
          return an.isLeapYear(this._year);
        }),
        (t.lengthOfMonth = function () {
          switch (this._month) {
            case 2:
              return this.isLeapYear() ? 29 : 28;
            case 4:
            case 6:
            case 9:
            case 11:
              return 30;
            default:
              return 31;
          }
        }),
        (t.lengthOfYear = function () {
          return this.isLeapYear() ? 366 : 365;
        }),
        (t.with = function (t, e) {
          return arguments.length < 2
            ? this.withTemporalAdjuster(t)
            : this.withFieldAndValue(t, e);
        }),
        (t.withTemporalAdjuster = function (t) {
          return (
            E(t, 'adjuster'),
            t instanceof f
              ? t
              : (m('function' == typeof t.adjustInto, 'adjuster', c),
                t.adjustInto(this))
          );
        }),
        (t.withFieldAndValue = function (t, e) {
          if ((m(null != t, 'field', s), t instanceof b)) {
            var n = t;
            switch ((n.checkValidValue(e), n)) {
              case b.DAY_OF_WEEK:
                return this.plusDays(e - this.dayOfWeek().value());
              case b.ALIGNED_DAY_OF_WEEK_IN_MONTH:
                return this.plusDays(
                  e - this.getLong(b.ALIGNED_DAY_OF_WEEK_IN_MONTH)
                );
              case b.ALIGNED_DAY_OF_WEEK_IN_YEAR:
                return this.plusDays(
                  e - this.getLong(b.ALIGNED_DAY_OF_WEEK_IN_YEAR)
                );
              case b.DAY_OF_MONTH:
                return this.withDayOfMonth(e);
              case b.DAY_OF_YEAR:
                return this.withDayOfYear(e);
              case b.EPOCH_DAY:
                return f.ofEpochDay(e);
              case b.ALIGNED_WEEK_OF_MONTH:
                return this.plusWeeks(
                  e - this.getLong(b.ALIGNED_WEEK_OF_MONTH)
                );
              case b.ALIGNED_WEEK_OF_YEAR:
                return this.plusWeeks(e - this.getLong(b.ALIGNED_WEEK_OF_YEAR));
              case b.MONTH_OF_YEAR:
                return this.withMonth(e);
              case b.PROLEPTIC_MONTH:
                return this.plusMonths(e - this.getLong(b.PROLEPTIC_MONTH));
              case b.YEAR_OF_ERA:
                return this.withYear(1 <= this._year ? e : 1 - e);
              case b.YEAR:
                return this.withYear(e);
              case b.ERA:
                return this.getLong(b.ERA) === e
                  ? this
                  : this.withYear(1 - this._year);
            }
            throw new l('Unsupported field: ' + t);
          }
          return t.adjustInto(this, e);
        }),
        (t.withYear = function (t) {
          return this._year === t
            ? this
            : (b.YEAR.checkValidValue(t),
              f._resolvePreviousValid(t, this._month, this._day));
        }),
        (t.withMonth = function (t) {
          var e = t instanceof tt ? t.value() : t;
          return this._month === e
            ? this
            : (b.MONTH_OF_YEAR.checkValidValue(e),
              f._resolvePreviousValid(this._year, e, this._day));
        }),
        (t.withDayOfMonth = function (t) {
          return this._day === t ? this : f.of(this._year, this._month, t);
        }),
        (t.withDayOfYear = function (t) {
          return this.dayOfYear() === t ? this : f.ofYearDay(this._year, t);
        }),
        (t.plus = function (t, e) {
          return arguments.length < 2 ? this.plus1(t) : this.plus2(t, e);
        }),
        (t.plus1 = function (t) {
          return E(t, 'amount'), t.addTo(this);
        }),
        (t.plus2 = function (t, e) {
          if ((E(t, 'amountToAdd'), E(e, 'unit'), e instanceof C)) {
            switch (e) {
              case C.DAYS:
                return this.plusDays(t);
              case C.WEEKS:
                return this.plusWeeks(t);
              case C.MONTHS:
                return this.plusMonths(t);
              case C.YEARS:
                return this.plusYears(t);
              case C.DECADES:
                return this.plusYears(w.safeMultiply(t, 10));
              case C.CENTURIES:
                return this.plusYears(w.safeMultiply(t, 100));
              case C.MILLENNIA:
                return this.plusYears(w.safeMultiply(t, 1e3));
              case C.ERAS:
                return this.with(b.ERA, w.safeAdd(this.getLong(b.ERA), t));
            }
            throw new l('Unsupported unit: ' + e);
          }
          return e.addTo(this, t);
        }),
        (t.plusYears = function (t) {
          if (0 === t) return this;
          var e = b.YEAR.checkValidIntValue(this._year + t);
          return f._resolvePreviousValid(e, this._month, this._day);
        }),
        (t.plusMonths = function (t) {
          if (0 === t) return this;
          var e = 12 * this._year + (this._month - 1) + t,
            n = b.YEAR.checkValidIntValue(w.floorDiv(e, 12)),
            i = w.floorMod(e, 12) + 1;
          return f._resolvePreviousValid(n, i, this._day);
        }),
        (t.plusWeeks = function (t) {
          return this.plusDays(w.safeMultiply(t, 7));
        }),
        (t.plusDays = function (t) {
          if (0 === t) return this;
          var e = w.safeAdd(this.toEpochDay(), t);
          return f.ofEpochDay(e);
        }),
        (t.minus = function (t, e) {
          return arguments.length < 2 ? this.minus1(t) : this.minus2(t, e);
        }),
        (t.minus1 = function (t) {
          return E(t, 'amount'), t.subtractFrom(this);
        }),
        (t.minus2 = function (t, e) {
          return E(t, 'amountToSubtract'), E(e, 'unit'), this.plus2(-1 * t, e);
        }),
        (t.minusYears = function (t) {
          return this.plusYears(-1 * t);
        }),
        (t.minusMonths = function (t) {
          return this.plusMonths(-1 * t);
        }),
        (t.minusWeeks = function (t) {
          return this.plusWeeks(-1 * t);
        }),
        (t.minusDays = function (t) {
          return this.plusDays(-1 * t);
        }),
        (t.query = function (t) {
          return (
            E(t, 'query'),
            t === H.localDate() ? this : r.prototype.query.call(this, t)
          );
        }),
        (t.adjustInto = function (t) {
          return r.prototype.adjustInto.call(this, t);
        }),
        (t.until = function (t, e) {
          return arguments.length < 2 ? this.until1(t) : this.until2(t, e);
        }),
        (t.until2 = function (t, e) {
          var n = f.from(t);
          if (e instanceof C) {
            switch (e) {
              case C.DAYS:
                return this.daysUntil(n);
              case C.WEEKS:
                return w.intDiv(this.daysUntil(n), 7);
              case C.MONTHS:
                return this._monthsUntil(n);
              case C.YEARS:
                return w.intDiv(this._monthsUntil(n), 12);
              case C.DECADES:
                return w.intDiv(this._monthsUntil(n), 120);
              case C.CENTURIES:
                return w.intDiv(this._monthsUntil(n), 1200);
              case C.MILLENNIA:
                return w.intDiv(this._monthsUntil(n), 12e3);
              case C.ERAS:
                return n.getLong(b.ERA) - this.getLong(b.ERA);
            }
            throw new l('Unsupported unit: ' + e);
          }
          return e.between(this, n);
        }),
        (t.daysUntil = function (t) {
          return t.toEpochDay() - this.toEpochDay();
        }),
        (t._monthsUntil = function (t) {
          var e = 32 * this._prolepticMonth() + this.dayOfMonth(),
            n = 32 * t._prolepticMonth() + t.dayOfMonth();
          return w.intDiv(n - e, 32);
        }),
        (t.until1 = function (t) {
          var e = f.from(t),
            n = e._prolepticMonth() - this._prolepticMonth(),
            i = e._day - this._day;
          if (0 < n && i < 0) {
            n--;
            var r = this.plusMonths(n);
            i = e.toEpochDay() - r.toEpochDay();
          } else n < 0 && 0 < i && (n++, (i -= e.lengthOfMonth()));
          var s = w.intDiv(n, 12),
            o = w.intMod(n, 12);
          return nt.of(s, o, i);
        }),
        (t.atTime = function () {
          return 1 === arguments.length
            ? this.atTime1.apply(this, arguments)
            : this.atTime4.apply(this, arguments);
        }),
        (t.atTime1 = function (t) {
          return _n.of(this, t);
        }),
        (t.atTime4 = function (t, e, n, i) {
          return (
            void 0 === n && (n = 0),
            void 0 === i && (i = 0),
            this.atTime1(dn.of(t, e, n, i))
          );
        }),
        (t.atStartOfDay = function (t) {
          return null != t
            ? this.atStartOfDayWithZone(t)
            : _n.of(this, dn.MIDNIGHT);
        }),
        (t.atStartOfDayWithZone = function (t) {
          E(t, 'zone');
          var e = this.atTime(dn.MIDNIGHT);
          if (t instanceof Nt == !1) {
            var n = t.rules().transition(e);
            null != n && n.isGap() && (e = n.dateTimeAfter());
          }
          return hn.of(e, t);
        }),
        (t.toEpochDay = function () {
          var t = this._year,
            e = this._month,
            n = 0;
          return (
            (n += 365 * t),
            0 <= t
              ? (n +=
                  w.intDiv(t + 3, 4) -
                  w.intDiv(t + 99, 100) +
                  w.intDiv(t + 399, 400))
              : (n -= w.intDiv(t, -4) - w.intDiv(t, -100) + w.intDiv(t, -400)),
            (n += w.intDiv(367 * e - 362, 12)),
            (n += this.dayOfMonth() - 1),
            2 < e && (n--, an.isLeapYear(t) || n--),
            n - 719528
          );
        }),
        (t.compareTo = function (t) {
          return E(t, 'other'), o(t, f, 'other'), this._compareTo0(t);
        }),
        (t._compareTo0 = function (t) {
          var e = this._year - t._year;
          return (
            0 === e &&
              0 === (e = this._month - t._month) &&
              (e = this._day - t._day),
            e
          );
        }),
        (t.isAfter = function (t) {
          return 0 < this.compareTo(t);
        }),
        (t.isBefore = function (t) {
          return this.compareTo(t) < 0;
        }),
        (t.isEqual = function (t) {
          return 0 === this.compareTo(t);
        }),
        (t.equals = function (t) {
          return this === t || (t instanceof f && 0 === this._compareTo0(t));
        }),
        (t.hashCode = function () {
          var t = this._year,
            e = this._month,
            n = this._day;
          return w.hash((4294965248 & t) ^ ((t << 11) + (e << 6) + n));
        }),
        (t.toString = function () {
          var t = this._year,
            e = this._month,
            n = this._day;
          return (
            (Math.abs(t) < 1e3
              ? t < 0
                ? '-' + ('' + (t - 1e4)).slice(-4)
                : ('' + (t + 1e4)).slice(-4)
              : 9999 < t
              ? '+' + t
              : '' + t) +
            (e < 10 ? '-0' + e : '-' + e) +
            (n < 10 ? '-0' + n : '-' + n)
          );
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        (t.format = function (t) {
          return (
            E(t, 'formatter'),
            o(t, We, 'formatter'),
            r.prototype.format.call(this, t)
          );
        }),
        f
      );
    })(lt);
  var ln = (function (e) {
      function t() {
        return e.apply(this, arguments) || this;
      }
      _(t, e);
      var n = t.prototype;
      return (
        (n.chronology = function () {
          return this.toLocalDate().chronology();
        }),
        (n.query = function (t) {
          return t === H.chronology()
            ? this.chronology()
            : t === H.precision()
            ? C.NANOS
            : t === H.localDate()
            ? cn.ofEpochDay(this.toLocalDate().toEpochDay())
            : t === H.localTime()
            ? this.toLocalTime()
            : t === H.zone() || t === H.zoneId() || t === H.offset()
            ? null
            : e.prototype.query.call(this, t);
        }),
        (n.adjustInto = function (t) {
          return t
            .with(b.EPOCH_DAY, this.toLocalDate().toEpochDay())
            .with(b.NANO_OF_DAY, this.toLocalTime().toNanoOfDay());
        }),
        (n.toInstant = function (t) {
          return (
            o(t, Nt, 'zoneId'),
            pn.ofEpochSecond(this.toEpochSecond(t), this.toLocalTime().nano())
          );
        }),
        (n.toEpochSecond = function (t) {
          E(t, 'offset');
          var e =
            86400 * this.toLocalDate().toEpochDay() +
            this.toLocalTime().toSecondOfDay();
          return (e -= t.totalSeconds()), w.safeToInt(e);
        }),
        t
      );
    })(Z),
    _n = (function (i) {
      function u(t, e) {
        var n;
        return (
          (n = i.call(this) || this),
          o(t, cn, 'date'),
          o(e, dn, 'time'),
          (n._date = t),
          (n._time = e),
          n
        );
      }
      _(u, i),
        (u.now = function (t) {
          return u._now(
            null == t
              ? En.systemDefaultZone()
              : t instanceof En
              ? t
              : En.system(t)
          );
        }),
        (u._now = function (t) {
          return E(t, 'clock'), u.ofInstant(t.instant(), t.zone());
        }),
        (u._ofEpochMillis = function (t, e) {
          var n = w.floorDiv(t, 1e3) + e.totalSeconds(),
            i = w.floorDiv(n, dn.SECONDS_PER_DAY),
            r = w.floorMod(n, dn.SECONDS_PER_DAY),
            s = 1e6 * w.floorMod(t, 1e3);
          return new u(cn.ofEpochDay(i), dn.ofSecondOfDay(r, s));
        }),
        (u.of = function (t, e) {
          return 2 === arguments.length && (t instanceof cn || e instanceof dn)
            ? u.ofDateAndTime.apply(this, arguments)
            : u.ofNumbers.apply(this, arguments);
        }),
        (u.ofNumbers = function (t, e, n, i, r, s, o) {
          return (
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === n && (n = 0),
            void 0 === i && (i = 0),
            void 0 === r && (r = 0),
            void 0 === s && (s = 0),
            void 0 === o && (o = 0),
            new u(cn.of(t, e, n), dn.of(i, r, s, o))
          );
        }),
        (u.ofDateAndTime = function (t, e) {
          return E(t, 'date'), E(e, 'time'), new u(t, e);
        }),
        (u.ofInstant = function (t, e) {
          void 0 === e && (e = pt.systemDefault()),
            E(t, 'instant'),
            o(t, pn, 'instant'),
            E(e, 'zone');
          var n = e.rules().offset(t);
          return u.ofEpochSecond(t.epochSecond(), t.nano(), n);
        }),
        (u.ofEpochSecond = function (t, e, n) {
          void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            2 === arguments.length && e instanceof Nt && ((n = e), (e = 0)),
            E(n, 'offset');
          var i = t + n.totalSeconds(),
            r = w.floorDiv(i, dn.SECONDS_PER_DAY),
            s = w.floorMod(i, dn.SECONDS_PER_DAY);
          return new u(cn.ofEpochDay(r), dn.ofSecondOfDay(s, e));
        }),
        (u.from = function (e) {
          if ((E(e, 'temporal'), e instanceof u)) return e;
          if (e instanceof hn) return e.toLocalDateTime();
          try {
            return new u(cn.from(e), dn.from(e));
          } catch (t) {
            throw new M(
              'Unable to obtain LocalDateTime TemporalAccessor: ' +
                e +
                ', type ' +
                (null != e.constructor ? e.constructor.name : '')
            );
          }
        }),
        (u.parse = function (t, e) {
          return (
            void 0 === e && (e = We.ISO_LOCAL_DATE_TIME),
            E(e, 'formatter'),
            e.parse(t, u.FROM)
          );
        });
      var t = u.prototype;
      return (
        (t._withDateTime = function (t, e) {
          return this._date === t && this._time === e ? this : new u(t, e);
        }),
        (t.isSupported = function (t) {
          return t instanceof b
            ? t.isDateBased() || t.isTimeBased()
            : t instanceof C
            ? t.isDateBased() || t.isTimeBased()
            : null != t && t.isSupportedBy(this);
        }),
        (t.range = function (t) {
          return t instanceof b
            ? t.isTimeBased()
              ? this._time.range(t)
              : this._date.range(t)
            : t.rangeRefinedBy(this);
        }),
        (t.get = function (t) {
          return t instanceof b
            ? t.isTimeBased()
              ? this._time.get(t)
              : this._date.get(t)
            : i.prototype.get.call(this, t);
        }),
        (t.getLong = function (t) {
          return (
            E(t, 'field'),
            t instanceof b
              ? t.isTimeBased()
                ? this._time.getLong(t)
                : this._date.getLong(t)
              : t.getFrom(this)
          );
        }),
        (t.year = function () {
          return this._date.year();
        }),
        (t.monthValue = function () {
          return this._date.monthValue();
        }),
        (t.month = function () {
          return this._date.month();
        }),
        (t.dayOfMonth = function () {
          return this._date.dayOfMonth();
        }),
        (t.dayOfYear = function () {
          return this._date.dayOfYear();
        }),
        (t.dayOfWeek = function () {
          return this._date.dayOfWeek();
        }),
        (t.hour = function () {
          return this._time.hour();
        }),
        (t.minute = function () {
          return this._time.minute();
        }),
        (t.second = function () {
          return this._time.second();
        }),
        (t.nano = function () {
          return this._time.nano();
        }),
        (t.with = function (t, e) {
          return 1 === arguments.length
            ? this.withTemporalAdjuster(t)
            : this.with2(t, e);
        }),
        (t.withTemporalAdjuster = function (t) {
          return (
            E(t, 'adjuster'),
            t instanceof cn
              ? this._withDateTime(t, this._time)
              : t instanceof dn
              ? this._withDateTime(this._date, t)
              : t instanceof u
              ? t
              : (m('function' == typeof t.adjustInto, 'adjuster', c),
                t.adjustInto(this))
          );
        }),
        (t.with2 = function (t, e) {
          return (
            E(t, 'field'),
            t instanceof b
              ? t.isTimeBased()
                ? this._withDateTime(this._date, this._time.with(t, e))
                : this._withDateTime(this._date.with(t, e), this._time)
              : t.adjustInto(this, e)
          );
        }),
        (t.withYear = function (t) {
          return this._withDateTime(this._date.withYear(t), this._time);
        }),
        (t.withMonth = function (t) {
          return this._withDateTime(this._date.withMonth(t), this._time);
        }),
        (t.withDayOfMonth = function (t) {
          return this._withDateTime(this._date.withDayOfMonth(t), this._time);
        }),
        (t.withDayOfYear = function (t) {
          return this._withDateTime(this._date.withDayOfYear(t), this._time);
        }),
        (t.withHour = function (t) {
          var e = this._time.withHour(t);
          return this._withDateTime(this._date, e);
        }),
        (t.withMinute = function (t) {
          var e = this._time.withMinute(t);
          return this._withDateTime(this._date, e);
        }),
        (t.withSecond = function (t) {
          var e = this._time.withSecond(t);
          return this._withDateTime(this._date, e);
        }),
        (t.withNano = function (t) {
          var e = this._time.withNano(t);
          return this._withDateTime(this._date, e);
        }),
        (t.truncatedTo = function (t) {
          return this._withDateTime(this._date, this._time.truncatedTo(t));
        }),
        (t.plus = function (t, e) {
          return 1 === arguments.length
            ? this.plusTemporalAmount(t)
            : this.plus2(t, e);
        }),
        (t.plusTemporalAmount = function (t) {
          return E(t, 'amount'), t.addTo(this);
        }),
        (t.plus2 = function (t, e) {
          if ((E(e, 'unit'), e instanceof C)) {
            switch (e) {
              case C.NANOS:
                return this.plusNanos(t);
              case C.MICROS:
                return this.plusDays(w.intDiv(t, dn.MICROS_PER_DAY)).plusNanos(
                  1e3 * w.intMod(t, dn.MICROS_PER_DAY)
                );
              case C.MILLIS:
                return this.plusDays(w.intDiv(t, dn.MILLIS_PER_DAY)).plusNanos(
                  1e6 * w.intMod(t, dn.MILLIS_PER_DAY)
                );
              case C.SECONDS:
                return this.plusSeconds(t);
              case C.MINUTES:
                return this.plusMinutes(t);
              case C.HOURS:
                return this.plusHours(t);
              case C.HALF_DAYS:
                return this.plusDays(w.intDiv(t, 256)).plusHours(
                  12 * w.intMod(t, 256)
                );
            }
            return this._withDateTime(this._date.plus(t, e), this._time);
          }
          return e.addTo(this, t);
        }),
        (t.plusYears = function (t) {
          var e = this._date.plusYears(t);
          return this._withDateTime(e, this._time);
        }),
        (t.plusMonths = function (t) {
          var e = this._date.plusMonths(t);
          return this._withDateTime(e, this._time);
        }),
        (t.plusWeeks = function (t) {
          var e = this._date.plusWeeks(t);
          return this._withDateTime(e, this._time);
        }),
        (t.plusDays = function (t) {
          var e = this._date.plusDays(t);
          return this._withDateTime(e, this._time);
        }),
        (t.plusHours = function (t) {
          return this._plusWithOverflow(this._date, t, 0, 0, 0, 1);
        }),
        (t.plusMinutes = function (t) {
          return this._plusWithOverflow(this._date, 0, t, 0, 0, 1);
        }),
        (t.plusSeconds = function (t) {
          return this._plusWithOverflow(this._date, 0, 0, t, 0, 1);
        }),
        (t.plusNanos = function (t) {
          return this._plusWithOverflow(this._date, 0, 0, 0, t, 1);
        }),
        (t.minus = function (t, e) {
          return 1 === arguments.length
            ? this.minusTemporalAmount(t)
            : this.minus2(t, e);
        }),
        (t.minusTemporalAmount = function (t) {
          return E(t, 'amount'), t.subtractFrom(this);
        }),
        (t.minus2 = function (t, e) {
          return E(e, 'unit'), this.plus2(-1 * t, e);
        }),
        (t.minusYears = function (t) {
          return this.plusYears(-1 * t);
        }),
        (t.minusMonths = function (t) {
          return this.plusMonths(-1 * t);
        }),
        (t.minusWeeks = function (t) {
          return this.plusWeeks(-1 * t);
        }),
        (t.minusDays = function (t) {
          return this.plusDays(-1 * t);
        }),
        (t.minusHours = function (t) {
          return this._plusWithOverflow(this._date, t, 0, 0, 0, -1);
        }),
        (t.minusMinutes = function (t) {
          return this._plusWithOverflow(this._date, 0, t, 0, 0, -1);
        }),
        (t.minusSeconds = function (t) {
          return this._plusWithOverflow(this._date, 0, 0, t, 0, -1);
        }),
        (t.minusNanos = function (t) {
          return this._plusWithOverflow(this._date, 0, 0, 0, t, -1);
        }),
        (t._plusWithOverflow = function (t, e, n, i, r, s) {
          if (0 == (e | n | i | r)) return this._withDateTime(t, this._time);
          var o =
            w.intDiv(r, dn.NANOS_PER_DAY) +
            w.intDiv(i, dn.SECONDS_PER_DAY) +
            w.intDiv(n, dn.MINUTES_PER_DAY) +
            w.intDiv(e, dn.HOURS_PER_DAY);
          o *= s;
          var a =
              w.intMod(r, dn.NANOS_PER_DAY) +
              w.intMod(i, dn.SECONDS_PER_DAY) * dn.NANOS_PER_SECOND +
              w.intMod(n, dn.MINUTES_PER_DAY) * dn.NANOS_PER_MINUTE +
              w.intMod(e, dn.HOURS_PER_DAY) * dn.NANOS_PER_HOUR,
            u = this._time.toNanoOfDay();
          (a = a * s + u), (o += w.floorDiv(a, dn.NANOS_PER_DAY));
          var h = w.floorMod(a, dn.NANOS_PER_DAY),
            f = h === u ? this._time : dn.ofNanoOfDay(h);
          return this._withDateTime(t.plusDays(o), f);
        }),
        (t.query = function (t) {
          return (
            E(t, 'query'),
            t === H.localDate()
              ? this.toLocalDate()
              : i.prototype.query.call(this, t)
          );
        }),
        (t.adjustInto = function (t) {
          return i.prototype.adjustInto.call(this, t);
        }),
        (t.until = function (t, e) {
          E(t, 'endExclusive'), E(e, 'unit');
          var n = u.from(t);
          if (e instanceof C) {
            if (e.isTimeBased()) {
              var i = this._date.daysUntil(n._date),
                r = n._time.toNanoOfDay() - this._time.toNanoOfDay();
              0 < i && r < 0
                ? (i--, (r += dn.NANOS_PER_DAY))
                : i < 0 && 0 < r && (i++, (r -= dn.NANOS_PER_DAY));
              var s = i;
              switch (e) {
                case C.NANOS:
                  return (
                    (s = w.safeMultiply(s, dn.NANOS_PER_DAY)), w.safeAdd(s, r)
                  );
                case C.MICROS:
                  return (
                    (s = w.safeMultiply(s, dn.MICROS_PER_DAY)),
                    w.safeAdd(s, w.intDiv(r, 1e3))
                  );
                case C.MILLIS:
                  return (
                    (s = w.safeMultiply(s, dn.MILLIS_PER_DAY)),
                    w.safeAdd(s, w.intDiv(r, 1e6))
                  );
                case C.SECONDS:
                  return (
                    (s = w.safeMultiply(s, dn.SECONDS_PER_DAY)),
                    w.safeAdd(s, w.intDiv(r, dn.NANOS_PER_SECOND))
                  );
                case C.MINUTES:
                  return (
                    (s = w.safeMultiply(s, dn.MINUTES_PER_DAY)),
                    w.safeAdd(s, w.intDiv(r, dn.NANOS_PER_MINUTE))
                  );
                case C.HOURS:
                  return (
                    (s = w.safeMultiply(s, dn.HOURS_PER_DAY)),
                    w.safeAdd(s, w.intDiv(r, dn.NANOS_PER_HOUR))
                  );
                case C.HALF_DAYS:
                  return (
                    (s = w.safeMultiply(s, 2)),
                    w.safeAdd(s, w.intDiv(r, 12 * dn.NANOS_PER_HOUR))
                  );
              }
              throw new l('Unsupported unit: ' + e);
            }
            var o = n._date,
              a = n._time;
            return (
              o.isAfter(this._date) && a.isBefore(this._time)
                ? (o = o.minusDays(1))
                : o.isBefore(this._date) &&
                  a.isAfter(this._time) &&
                  (o = o.plusDays(1)),
              this._date.until(o, e)
            );
          }
          return e.between(this, n);
        }),
        (t.atZone = function (t) {
          return hn.of(this, t);
        }),
        (t.toLocalDate = function () {
          return this._date;
        }),
        (t.toLocalTime = function () {
          return this._time;
        }),
        (t.compareTo = function (t) {
          return E(t, 'other'), o(t, u, 'other'), this._compareTo0(t);
        }),
        (t._compareTo0 = function (t) {
          var e = this._date.compareTo(t.toLocalDate());
          return 0 === e && (e = this._time.compareTo(t.toLocalTime())), e;
        }),
        (t.isAfter = function (t) {
          return 0 < this.compareTo(t);
        }),
        (t.isBefore = function (t) {
          return this.compareTo(t) < 0;
        }),
        (t.isEqual = function (t) {
          return 0 === this.compareTo(t);
        }),
        (t.equals = function (t) {
          return (
            this === t ||
            (t instanceof u &&
              this._date.equals(t._date) &&
              this._time.equals(t._time))
          );
        }),
        (t.hashCode = function () {
          return this._date.hashCode() ^ this._time.hashCode();
        }),
        (t.toString = function () {
          return this._date.toString() + 'T' + this._time.toString();
        }),
        (t.toJSON = function () {
          return this.toString();
        }),
        (t.format = function (t) {
          return E(t, 'formatter'), t.format(this);
        }),
        u
      );
    })(ln);
  var dn = (function (h) {
    function f(t, e, n, i) {
      var r;
      void 0 === t && (t = 0),
        void 0 === e && (e = 0),
        void 0 === n && (n = 0),
        void 0 === i && (i = 0),
        (r = h.call(this) || this);
      var s = w.safeToInt(t),
        o = w.safeToInt(e),
        a = w.safeToInt(n),
        u = w.safeToInt(i);
      return (
        f._validate(s, o, a, u),
        0 == (o | a | u)
          ? (f.HOURS[s] ||
              ((r._hour = s),
              (r._minute = o),
              (r._second = a),
              (r._nano = u),
              (f.HOURS[s] = d(r))),
            f.HOURS[s] || d(r))
          : ((r._hour = s), (r._minute = o), (r._second = a), (r._nano = u), r)
      );
    }
    _(f, h),
      (f.now = function (t) {
        return f._now(
          null == t
            ? En.systemDefaultZone()
            : t instanceof En
            ? t
            : En.system(t)
        );
      }),
      (f._now = function (t) {
        return (
          void 0 === t && (t = En.systemDefaultZone()),
          E(t, 'clock'),
          f.ofInstant(t.instant(), t.zone())
        );
      }),
      (f.ofInstant = function (t, e) {
        void 0 === e && (e = pt.systemDefault());
        var n = e.rules().offset(t),
          i = w.intMod(t.epochSecond(), f.SECONDS_PER_DAY);
        return (
          (i = w.intMod(i + n.totalSeconds(), f.SECONDS_PER_DAY)) < 0 &&
            (i += f.SECONDS_PER_DAY),
          f.ofSecondOfDay(i, t.nano())
        );
      }),
      (f.of = function (t, e, n, i) {
        return new f(t, e, n, i);
      }),
      (f.ofSecondOfDay = function (t, e) {
        void 0 === t && (t = 0),
          void 0 === e && (e = 0),
          b.SECOND_OF_DAY.checkValidValue(t),
          b.NANO_OF_SECOND.checkValidValue(e);
        var n = w.intDiv(t, f.SECONDS_PER_HOUR);
        t -= n * f.SECONDS_PER_HOUR;
        var i = w.intDiv(t, f.SECONDS_PER_MINUTE);
        return new f(n, i, (t -= i * f.SECONDS_PER_MINUTE), e);
      }),
      (f.ofNanoOfDay = function (t) {
        void 0 === t && (t = 0), b.NANO_OF_DAY.checkValidValue(t);
        var e = w.intDiv(t, f.NANOS_PER_HOUR);
        t -= e * f.NANOS_PER_HOUR;
        var n = w.intDiv(t, f.NANOS_PER_MINUTE);
        t -= n * f.NANOS_PER_MINUTE;
        var i = w.intDiv(t, f.NANOS_PER_SECOND);
        return new f(e, n, i, (t -= i * f.NANOS_PER_SECOND));
      }),
      (f.from = function (t) {
        E(t, 'temporal');
        var e = t.query(H.localTime());
        if (null == e)
          throw new M(
            'Unable to obtain LocalTime TemporalAccessor: ' +
              t +
              ', type ' +
              (null != t.constructor ? t.constructor.name : '')
          );
        return e;
      }),
      (f.parse = function (t, e) {
        return (
          void 0 === e && (e = We.ISO_LOCAL_TIME),
          E(e, 'formatter'),
          e.parse(t, f.FROM)
        );
      }),
      (f._validate = function (t, e, n, i) {
        b.HOUR_OF_DAY.checkValidValue(t),
          b.MINUTE_OF_HOUR.checkValidValue(e),
          b.SECOND_OF_MINUTE.checkValidValue(n),
          b.NANO_OF_SECOND.checkValidValue(i);
      });
    var t = f.prototype;
    return (
      (t.isSupported = function (t) {
        return t instanceof b
          ? t.isTimeBased()
          : t instanceof C
          ? t.isTimeBased()
          : null != t && t.isSupportedBy(this);
      }),
      (t.range = function (t) {
        return E(t), h.prototype.range.call(this, t);
      }),
      (t.get = function (t) {
        return this.getLong(t);
      }),
      (t.getLong = function (t) {
        return E(t, 'field'), t instanceof b ? this._get0(t) : t.getFrom(this);
      }),
      (t._get0 = function (t) {
        switch (t) {
          case b.NANO_OF_SECOND:
            return this._nano;
          case b.NANO_OF_DAY:
            return this.toNanoOfDay();
          case b.MICRO_OF_SECOND:
            return w.intDiv(this._nano, 1e3);
          case b.MICRO_OF_DAY:
            return w.intDiv(this.toNanoOfDay(), 1e3);
          case b.MILLI_OF_SECOND:
            return w.intDiv(this._nano, 1e6);
          case b.MILLI_OF_DAY:
            return w.intDiv(this.toNanoOfDay(), 1e6);
          case b.SECOND_OF_MINUTE:
            return this._second;
          case b.SECOND_OF_DAY:
            return this.toSecondOfDay();
          case b.MINUTE_OF_HOUR:
            return this._minute;
          case b.MINUTE_OF_DAY:
            return 60 * this._hour + this._minute;
          case b.HOUR_OF_AMPM:
            return w.intMod(this._hour, 12);
          case b.CLOCK_HOUR_OF_AMPM:
            var e = w.intMod(this._hour, 12);
            return e % 12 == 0 ? 12 : e;
          case b.HOUR_OF_DAY:
            return this._hour;
          case b.CLOCK_HOUR_OF_DAY:
            return 0 === this._hour ? 24 : this._hour;
          case b.AMPM_OF_DAY:
            return w.intDiv(this._hour, 12);
        }
        throw new l('Unsupported field: ' + t);
      }),
      (t.hour = function () {
        return this._hour;
      }),
      (t.minute = function () {
        return this._minute;
      }),
      (t.second = function () {
        return this._second;
      }),
      (t.nano = function () {
        return this._nano;
      }),
      (t.with = function (t, e) {
        return arguments.length < 2
          ? this.withTemporalAdjuster(t)
          : this.with2(t, e);
      }),
      (t.withTemporalAdjuster = function (t) {
        return (
          E(t, 'adjuster'),
          t instanceof f
            ? t
            : (m('function' == typeof t.adjustInto, 'adjuster', c),
              t.adjustInto(this))
        );
      }),
      (t.with2 = function (t, e) {
        if ((E(t, 'field'), o(t, L, 'field'), t instanceof b)) {
          switch ((t.checkValidValue(e), t)) {
            case b.NANO_OF_SECOND:
              return this.withNano(e);
            case b.NANO_OF_DAY:
              return f.ofNanoOfDay(e);
            case b.MICRO_OF_SECOND:
              return this.withNano(1e3 * e);
            case b.MICRO_OF_DAY:
              return f.ofNanoOfDay(1e3 * e);
            case b.MILLI_OF_SECOND:
              return this.withNano(1e6 * e);
            case b.MILLI_OF_DAY:
              return f.ofNanoOfDay(1e6 * e);
            case b.SECOND_OF_MINUTE:
              return this.withSecond(e);
            case b.SECOND_OF_DAY:
              return this.plusSeconds(e - this.toSecondOfDay());
            case b.MINUTE_OF_HOUR:
              return this.withMinute(e);
            case b.MINUTE_OF_DAY:
              return this.plusMinutes(e - (60 * this._hour + this._minute));
            case b.HOUR_OF_AMPM:
              return this.plusHours(e - w.intMod(this._hour, 12));
            case b.CLOCK_HOUR_OF_AMPM:
              return this.plusHours(
                (12 === e ? 0 : e) - w.intMod(this._hour, 12)
              );
            case b.HOUR_OF_DAY:
              return this.withHour(e);
            case b.CLOCK_HOUR_OF_DAY:
              return this.withHour(24 === e ? 0 : e);
            case b.AMPM_OF_DAY:
              return this.plusHours(12 * (e - w.intDiv(this._hour, 12)));
          }
          throw new l('Unsupported field: ' + t);
        }
        return t.adjustInto(this, e);
      }),
      (t.withHour = function (t) {
        return (
          void 0 === t && (t = 0),
          this._hour === t
            ? this
            : new f(t, this._minute, this._second, this._nano)
        );
      }),
      (t.withMinute = function (t) {
        return (
          void 0 === t && (t = 0),
          this._minute === t
            ? this
            : new f(this._hour, t, this._second, this._nano)
        );
      }),
      (t.withSecond = function (t) {
        return (
          void 0 === t && (t = 0),
          this._second === t
            ? this
            : new f(this._hour, this._minute, t, this._nano)
        );
      }),
      (t.withNano = function (t) {
        return (
          void 0 === t && (t = 0),
          this._nano === t
            ? this
            : new f(this._hour, this._minute, this._second, t)
        );
      }),
      (t.truncatedTo = function (t) {
        if ((E(t, 'unit'), t === C.NANOS)) return this;
        var e = t.duration();
        if (e.seconds() > f.SECONDS_PER_DAY)
          throw new M('Unit is too large to be used for truncation');
        var n = e.toNanos();
        if (0 !== w.intMod(f.NANOS_PER_DAY, n))
          throw new M('Unit must divide into a standard day without remainder');
        var i = this.toNanoOfDay();
        return f.ofNanoOfDay(w.intDiv(i, n) * n);
      }),
      (t.plus = function (t, e) {
        return arguments.length < 2 ? this.plus1(t) : this.plus2(t, e);
      }),
      (t.plus1 = function (t) {
        return E(t, 'amount'), t.addTo(this);
      }),
      (t.plus2 = function (t, e) {
        if ((E(e, 'unit'), e instanceof C)) {
          switch (e) {
            case C.NANOS:
              return this.plusNanos(t);
            case C.MICROS:
              return this.plusNanos(1e3 * w.intMod(t, f.MICROS_PER_DAY));
            case C.MILLIS:
              return this.plusNanos(1e6 * w.intMod(t, f.MILLIS_PER_DAY));
            case C.SECONDS:
              return this.plusSeconds(t);
            case C.MINUTES:
              return this.plusMinutes(t);
            case C.HOURS:
              return this.plusHours(t);
            case C.HALF_DAYS:
              return this.plusHours(12 * w.intMod(t, 2));
          }
          throw new l('Unsupported unit: ' + e);
        }
        return e.addTo(this, t);
      }),
      (t.plusHours = function (t) {
        return 0 === t
          ? this
          : new f(
              w.intMod(
                w.intMod(t, f.HOURS_PER_DAY) + this._hour + f.HOURS_PER_DAY,
                f.HOURS_PER_DAY
              ),
              this._minute,
              this._second,
              this._nano
            );
      }),
      (t.plusMinutes = function (t) {
        if (0 === t) return this;
        var e = this._hour * f.MINUTES_PER_HOUR + this._minute,
          n = w.intMod(
            w.intMod(t, f.MINUTES_PER_DAY) + e + f.MINUTES_PER_DAY,
            f.MINUTES_PER_DAY
          );
        return e === n
          ? this
          : new f(
              w.intDiv(n, f.MINUTES_PER_HOUR),
              w.intMod(n, f.MINUTES_PER_HOUR),
              this._second,
              this._nano
            );
      }),
      (t.plusSeconds = function (t) {
        if (0 === t) return this;
        var e =
            this._hour * f.SECONDS_PER_HOUR +
            this._minute * f.SECONDS_PER_MINUTE +
            this._second,
          n = w.intMod(
            w.intMod(t, f.SECONDS_PER_DAY) + e + f.SECONDS_PER_DAY,
            f.SECONDS_PER_DAY
          );
        return e === n
          ? this
          : new f(
              w.intDiv(n, f.SECONDS_PER_HOUR),
              w.intMod(w.intDiv(n, f.SECONDS_PER_MINUTE), f.MINUTES_PER_HOUR),
              w.intMod(n, f.SECONDS_PER_MINUTE),
              this._nano
            );
      }),
      (t.plusNanos = function (t) {
        if (0 === t) return this;
        var e = this.toNanoOfDay(),
          n = w.intMod(
            w.intMod(t, f.NANOS_PER_DAY) + e + f.NANOS_PER_DAY,
            f.NANOS_PER_DAY
          );
        return e === n
          ? this
          : new f(
              w.intDiv(n, f.NANOS_PER_HOUR),
              w.intMod(w.intDiv(n, f.NANOS_PER_MINUTE), f.MINUTES_PER_HOUR),
              w.intMod(w.intDiv(n, f.NANOS_PER_SECOND), f.SECONDS_PER_MINUTE),
              w.intMod(n, f.NANOS_PER_SECOND)
            );
      }),
      (t.minus = function (t, e) {
        return arguments.length < 2 ? this.minus1(t) : this.minus2(t, e);
      }),
      (t.minus1 = function (t) {
        return E(t, 'amount'), t.subtractFrom(this);
      }),
      (t.minus2 = function (t, e) {
        return E(e, 'unit'), this.plus2(-1 * t, e);
      }),
      (t.minusHours = function (t) {
        return this.plusHours(-1 * w.intMod(t, f.HOURS_PER_DAY));
      }),
      (t.minusMinutes = function (t) {
        return this.plusMinutes(-1 * w.intMod(t, f.MINUTES_PER_DAY));
      }),
      (t.minusSeconds = function (t) {
        return this.plusSeconds(-1 * w.intMod(t, f.SECONDS_PER_DAY));
      }),
      (t.minusNanos = function (t) {
        return this.plusNanos(-1 * w.intMod(t, f.NANOS_PER_DAY));
      }),
      (t.query = function (t) {
        return (
          E(t, 'query'),
          t === H.precision()
            ? C.NANOS
            : t === H.localTime()
            ? this
            : t === H.chronology() ||
              t === H.zoneId() ||
              t === H.zone() ||
              t === H.offset() ||
              t === H.localDate()
            ? null
            : t.queryFrom(this)
        );
      }),
      (t.adjustInto = function (t) {
        return t.with(f.NANO_OF_DAY, this.toNanoOfDay());
      }),
      (t.until = function (t, e) {
        E(t, 'endExclusive'), E(e, 'unit');
        var n = f.from(t);
        if (e instanceof C) {
          var i = n.toNanoOfDay() - this.toNanoOfDay();
          switch (e) {
            case C.NANOS:
              return i;
            case C.MICROS:
              return w.intDiv(i, 1e3);
            case C.MILLIS:
              return w.intDiv(i, 1e6);
            case C.SECONDS:
              return w.intDiv(i, f.NANOS_PER_SECOND);
            case C.MINUTES:
              return w.intDiv(i, f.NANOS_PER_MINUTE);
            case C.HOURS:
              return w.intDiv(i, f.NANOS_PER_HOUR);
            case C.HALF_DAYS:
              return w.intDiv(i, 12 * f.NANOS_PER_HOUR);
          }
          throw new l('Unsupported unit: ' + e);
        }
        return e.between(this, n);
      }),
      (t.atDate = function (t) {
        return _n.of(t, this);
      }),
      (t.toSecondOfDay = function () {
        var t = this._hour * f.SECONDS_PER_HOUR;
        return (t += this._minute * f.SECONDS_PER_MINUTE), (t += this._second);
      }),
      (t.toNanoOfDay = function () {
        var t = this._hour * f.NANOS_PER_HOUR;
        return (
          (t += this._minute * f.NANOS_PER_MINUTE),
          (t += this._second * f.NANOS_PER_SECOND),
          (t += this._nano)
        );
      }),
      (t.compareTo = function (t) {
        E(t, 'other'), o(t, f, 'other');
        var e = w.compareNumbers(this._hour, t._hour);
        return (
          0 === e &&
            0 === (e = w.compareNumbers(this._minute, t._minute)) &&
            0 === (e = w.compareNumbers(this._second, t._second)) &&
            (e = w.compareNumbers(this._nano, t._nano)),
          e
        );
      }),
      (t.isAfter = function (t) {
        return 0 < this.compareTo(t);
      }),
      (t.isBefore = function (t) {
        return this.compareTo(t) < 0;
      }),
      (t.equals = function (t) {
        return (
          this === t ||
          (t instanceof f &&
            this._hour === t._hour &&
            this._minute === t._minute &&
            this._second === t._second &&
            this._nano === t._nano)
        );
      }),
      (t.hashCode = function () {
        var t = this.toNanoOfDay();
        return w.hash(t);
      }),
      (t.toString = function () {
        var t = '',
          e = this._hour,
          n = this._minute,
          i = this._second,
          r = this._nano;
        return (
          (t += e < 10 ? '0' : ''),
          (t += e),
          (t += n < 10 ? ':0' : ':'),
          (t += n),
          (0 < i || 0 < r) &&
            ((t += i < 10 ? ':0' : ':'),
            (t += i),
            0 < r &&
              ((t += '.'),
              0 === w.intMod(r, 1e6)
                ? (t += ('' + (w.intDiv(r, 1e6) + 1e3)).substring(1))
                : 0 === w.intMod(r, 1e3)
                ? (t += ('' + (w.intDiv(r, 1e3) + 1e6)).substring(1))
                : (t += ('' + (r + 1e9)).substring(1)))),
          t
        );
      }),
      (t.toJSON = function () {
        return this.toString();
      }),
      (t.format = function (t) {
        return E(t, 'formatter'), t.format(this);
      }),
      f
    );
  })(Z);
  (dn.HOURS_PER_DAY = 24),
    (dn.MINUTES_PER_HOUR = 60),
    (dn.MINUTES_PER_DAY = dn.MINUTES_PER_HOUR * dn.HOURS_PER_DAY),
    (dn.SECONDS_PER_MINUTE = 60),
    (dn.SECONDS_PER_HOUR = dn.SECONDS_PER_MINUTE * dn.MINUTES_PER_HOUR),
    (dn.SECONDS_PER_DAY = dn.SECONDS_PER_HOUR * dn.HOURS_PER_DAY),
    (dn.MILLIS_PER_DAY = 1e3 * dn.SECONDS_PER_DAY),
    (dn.MICROS_PER_DAY = 1e6 * dn.SECONDS_PER_DAY),
    (dn.NANOS_PER_SECOND = 1e9),
    (dn.NANOS_PER_MINUTE = dn.NANOS_PER_SECOND * dn.SECONDS_PER_MINUTE),
    (dn.NANOS_PER_HOUR = dn.NANOS_PER_MINUTE * dn.MINUTES_PER_HOUR),
    (dn.NANOS_PER_DAY = dn.NANOS_PER_HOUR * dn.HOURS_PER_DAY);
  var pn = (function (i) {
    function r(t, e) {
      var n;
      return (
        (n = i.call(this) || this),
        r._validate(t, e),
        (n._seconds = w.safeToInt(t)),
        (n._nanos = w.safeToInt(e)),
        n
      );
    }
    _(r, i),
      (r.now = function (t) {
        return void 0 === t && (t = En.systemUTC()), t.instant();
      }),
      (r.ofEpochSecond = function (t, e) {
        void 0 === e && (e = 0);
        var n = t + w.floorDiv(e, dn.NANOS_PER_SECOND),
          i = w.floorMod(e, dn.NANOS_PER_SECOND);
        return r._create(n, i);
      }),
      (r.ofEpochMilli = function (t) {
        var e = w.floorDiv(t, 1e3),
          n = w.floorMod(t, 1e3);
        return r._create(e, 1e6 * n);
      }),
      (r.from = function (e) {
        try {
          var t = e.getLong(b.INSTANT_SECONDS),
            n = e.get(b.NANO_OF_SECOND);
          return r.ofEpochSecond(t, n);
        } catch (t) {
          throw new M(
            'Unable to obtain Instant from TemporalAccessor: ' +
              e +
              ', type ' +
              typeof e,
            t
          );
        }
      }),
      (r.parse = function (t) {
        return We.ISO_INSTANT.parse(t, r.FROM);
      }),
      (r._create = function (t, e) {
        return 0 === t && 0 === e ? r.EPOCH : new r(t, e);
      }),
      (r._validate = function (t, e) {
        if (t < r.MIN_SECONDS || r.MAX_SECONDS < t)
          throw new M('Instant exceeds minimum or maximum instant');
        if (e < 0 || e > dn.NANOS_PER_SECOND)
          throw new M('Instant exceeds minimum or maximum instant');
      });
    var t = r.prototype;
    return (
      (t.isSupported = function (t) {
        return t instanceof b
          ? t === b.INSTANT_SECONDS ||
              t === b.NANO_OF_SECOND ||
              t === b.MICRO_OF_SECOND ||
              t === b.MILLI_OF_SECOND
          : t instanceof C
          ? t.isTimeBased() || t === C.DAYS
          : null != t && t.isSupportedBy(this);
      }),
      (t.range = function (t) {
        return i.prototype.range.call(this, t);
      }),
      (t.get = function (t) {
        return this.getLong(t);
      }),
      (t.getLong = function (t) {
        if (t instanceof b) {
          switch (t) {
            case b.NANO_OF_SECOND:
              return this._nanos;
            case b.MICRO_OF_SECOND:
              return w.intDiv(this._nanos, 1e3);
            case b.MILLI_OF_SECOND:
              return w.intDiv(this._nanos, 1e6);
            case b.INSTANT_SECONDS:
              return this._seconds;
          }
          throw new l('Unsupported field: ' + t);
        }
        return t.getFrom(this);
      }),
      (t.epochSecond = function () {
        return this._seconds;
      }),
      (t.nano = function () {
        return this._nanos;
      }),
      (t.with = function (t, e) {
        return 1 === arguments.length
          ? this.withTemporalAdjuster(t)
          : this.with2(t, e);
      }),
      (t.withTemporalAdjuster = function (t) {
        return E(t, 'adjuster'), t.adjustInto(this);
      }),
      (t.with2 = function (t, e) {
        if ((E(t, 'field'), t instanceof b)) {
          switch ((t.checkValidValue(e), t)) {
            case b.MILLI_OF_SECOND:
              var n = 1e6 * e;
              return n !== this._nanos ? r._create(this._seconds, n) : this;
            case b.MICRO_OF_SECOND:
              var i = 1e3 * e;
              return i !== this._nanos ? r._create(this._seconds, i) : this;
            case b.NANO_OF_SECOND:
              return e !== this._nanos ? r._create(this._seconds, e) : this;
            case b.INSTANT_SECONDS:
              return e !== this._seconds ? r._create(e, this._nanos) : this;
          }
          throw new l('Unsupported field: ' + t);
        }
        return t.adjustInto(this, e);
      }),
      (t.truncatedTo = function (t) {
        if ((E(t, 'unit'), t === C.NANOS)) return this;
        var e = t.duration();
        if (e.seconds() > dn.SECONDS_PER_DAY)
          throw new M('Unit is too large to be used for truncation');
        var n = e.toNanos();
        if (0 !== w.intMod(dn.NANOS_PER_DAY, n))
          throw new M('Unit must divide into a standard day without remainder');
        var i =
            w.intMod(this._seconds, dn.SECONDS_PER_DAY) * dn.NANOS_PER_SECOND +
            this._nanos,
          r = w.intDiv(i, n) * n;
        return this.plusNanos(r - i);
      }),
      (t.plus = function (t, e) {
        return 1 === arguments.length ? this.plus1(t) : this.plus2(t, e);
      }),
      (t.plus1 = function (t) {
        return E(t, 'amount'), t.addTo(this);
      }),
      (t.plus2 = function (t, e) {
        if ((E(t, 'amountToAdd'), E(e, 'unit'), o(e, g), e instanceof C)) {
          switch (e) {
            case C.NANOS:
              return this.plusNanos(t);
            case C.MICROS:
              return this._plus(w.intDiv(t, 1e6), 1e3 * w.intMod(t, 1e6));
            case C.MILLIS:
              return this.plusMillis(t);
            case C.SECONDS:
              return this.plusSeconds(t);
            case C.MINUTES:
              return this.plusSeconds(w.safeMultiply(t, dn.SECONDS_PER_MINUTE));
            case C.HOURS:
              return this.plusSeconds(w.safeMultiply(t, dn.SECONDS_PER_HOUR));
            case C.HALF_DAYS:
              return this.plusSeconds(
                w.safeMultiply(t, dn.SECONDS_PER_DAY / 2)
              );
            case C.DAYS:
              return this.plusSeconds(w.safeMultiply(t, dn.SECONDS_PER_DAY));
          }
          throw new l('Unsupported unit: ' + e);
        }
        return e.addTo(this, t);
      }),
      (t.plusSeconds = function (t) {
        return this._plus(t, 0);
      }),
      (t.plusMillis = function (t) {
        return this._plus(w.intDiv(t, 1e3), 1e6 * w.intMod(t, 1e3));
      }),
      (t.plusNanos = function (t) {
        return this._plus(0, t);
      }),
      (t._plus = function (t, e) {
        if (0 == (t | e)) return this;
        var n = this._seconds + t;
        n += w.intDiv(e, dn.NANOS_PER_SECOND);
        var i = this._nanos + (e % dn.NANOS_PER_SECOND);
        return r.ofEpochSecond(n, i);
      }),
      (t.minus = function (t, e) {
        return 1 === arguments.length ? this.minus1(t) : this.minus2(t, e);
      }),
      (t.minus1 = function (t) {
        return E(t, 'amount'), t.subtractFrom(this);
      }),
      (t.minus2 = function (t, e) {
        return this.plus2(-1 * t, e);
      }),
      (t.minusSeconds = function (t) {
        return this.plusSeconds(-1 * t);
      }),
      (t.minusMillis = function (t) {
        return this.plusMillis(-1 * t);
      }),
      (t.minusNanos = function (t) {
        return this.plusNanos(-1 * t);
      }),
      (t.query = function (t) {
        return (
          E(t, 'query'),
          t === H.precision()
            ? C.NANOS
            : t === H.localDate() ||
              t === H.localTime() ||
              t === H.chronology() ||
              t === H.zoneId() ||
              t === H.zone() ||
              t === H.offset()
            ? null
            : t.queryFrom(this)
        );
      }),
      (t.adjustInto = function (t) {
        return (
          E(t, 'temporal'),
          t
            .with(b.INSTANT_SECONDS, this._seconds)
            .with(b.NANO_OF_SECOND, this._nanos)
        );
      }),
      (t.until = function (t, e) {
        E(t, 'endExclusive'), E(e, 'unit');
        var n = r.from(t);
        if (e instanceof C) {
          switch (e) {
            case C.NANOS:
              return this._nanosUntil(n);
            case C.MICROS:
              return w.intDiv(this._nanosUntil(n), 1e3);
            case C.MILLIS:
              return w.safeSubtract(n.toEpochMilli(), this.toEpochMilli());
            case C.SECONDS:
              return this._secondsUntil(n);
            case C.MINUTES:
              return w.intDiv(this._secondsUntil(n), dn.SECONDS_PER_MINUTE);
            case C.HOURS:
              return w.intDiv(this._secondsUntil(n), dn.SECONDS_PER_HOUR);
            case C.HALF_DAYS:
              return w.intDiv(this._secondsUntil(n), 12 * dn.SECONDS_PER_HOUR);
            case C.DAYS:
              return w.intDiv(this._secondsUntil(n), dn.SECONDS_PER_DAY);
          }
          throw new l('Unsupported unit: ' + e);
        }
        return e.between(this, n);
      }),
      (t._nanosUntil = function (t) {
        var e = w.safeSubtract(t.epochSecond(), this.epochSecond()),
          n = w.safeMultiply(e, dn.NANOS_PER_SECOND);
        return w.safeAdd(n, t.nano() - this.nano());
      }),
      (t._secondsUntil = function (t) {
        var e = w.safeSubtract(t.epochSecond(), this.epochSecond()),
          n = t.nano() - this.nano();
        return 0 < e && n < 0 ? e-- : e < 0 && 0 < n && e++, e;
      }),
      (t.atZone = function (t) {
        return hn.ofInstant(this, t);
      }),
      (t.toEpochMilli = function () {
        return w.safeMultiply(this._seconds, 1e3) + w.intDiv(this._nanos, 1e6);
      }),
      (t.compareTo = function (t) {
        E(t, 'otherInstant'), o(t, r, 'otherInstant');
        var e = w.compareNumbers(this._seconds, t._seconds);
        return 0 !== e ? e : this._nanos - t._nanos;
      }),
      (t.isAfter = function (t) {
        return 0 < this.compareTo(t);
      }),
      (t.isBefore = function (t) {
        return this.compareTo(t) < 0;
      }),
      (t.equals = function (t) {
        return (
          this === t ||
          (t instanceof r &&
            this.epochSecond() === t.epochSecond() &&
            this.nano() === t.nano())
        );
      }),
      (t.hashCode = function () {
        return w.hashCode(this._seconds, this._nanos);
      }),
      (t.toString = function () {
        return We.ISO_INSTANT.format(this);
      }),
      (t.toJSON = function () {
        return this.toString();
      }),
      r
    );
  })(Z);
  var En = (function () {
      function t() {}
      (t.systemUTC = function () {
        return new On(Nt.UTC);
      }),
        (t.systemDefaultZone = function () {
          return new On(pt.systemDefault());
        }),
        (t.system = function (t) {
          return new On(t);
        }),
        (t.fixed = function (t, e) {
          return new Sn(t, e);
        }),
        (t.offset = function (t, e) {
          return new mn(t, e);
        });
      var e = t.prototype;
      return (
        (e.millis = function () {
          n('Clock.millis');
        }),
        (e.instant = function () {
          n('Clock.instant');
        }),
        (e.zone = function () {
          n('Clock.zone');
        }),
        (e.withZone = function () {
          n('Clock.withZone');
        }),
        t
      );
    })(),
    On = (function (n) {
      function e(t) {
        var e;
        return E(t, 'zone'), ((e = n.call(this) || this)._zone = t), e;
      }
      _(e, n);
      var t = e.prototype;
      return (
        (t.zone = function () {
          return this._zone;
        }),
        (t.millis = function () {
          return new Date().getTime();
        }),
        (t.instant = function () {
          return pn.ofEpochMilli(this.millis());
        }),
        (t.equals = function (t) {
          return t instanceof e && this._zone.equals(t._zone);
        }),
        (t.withZone = function (t) {
          return t.equals(this._zone) ? this : new e(t);
        }),
        (t.toString = function () {
          return 'SystemClock[' + this._zone.toString() + ']';
        }),
        e
      );
    })(En),
    Sn = (function (i) {
      function e(t, e) {
        var n;
        return ((n = i.call(this) || this)._instant = t), (n._zoneId = e), n;
      }
      _(e, i);
      var t = e.prototype;
      return (
        (t.instant = function () {
          return this._instant;
        }),
        (t.millis = function () {
          return this._instant.toEpochMilli();
        }),
        (t.zone = function () {
          return this._zoneId;
        }),
        (t.toString = function () {
          return 'FixedClock[]';
        }),
        (t.equals = function (t) {
          return (
            t instanceof e &&
            this._instant.equals(t._instant) &&
            this._zoneId.equals(t._zoneId)
          );
        }),
        (t.withZone = function (t) {
          return t.equals(this._zoneId) ? this : new e(this._instant, t);
        }),
        e
      );
    })(En),
    mn = (function (i) {
      function e(t, e) {
        var n;
        return ((n = i.call(this) || this)._baseClock = t), (n._offset = e), n;
      }
      _(e, i);
      var t = e.prototype;
      return (
        (t.zone = function () {
          return this._baseClock.zone();
        }),
        (t.withZone = function (t) {
          return t.equals(this._baseClock.zone())
            ? this
            : new e(this._baseClock.withZone(t), this._offset);
        }),
        (t.millis = function () {
          return this._baseClock.millis() + this._offset.toMillis();
        }),
        (t.instant = function () {
          return this._baseClock.instant().plus(this._offset);
        }),
        (t.equals = function (t) {
          return (
            t instanceof e &&
            this._baseClock.equals(t._baseClock) &&
            this._offset.equals(t._offset)
          );
        }),
        (t.toString = function () {
          return 'OffsetClock[' + this._baseClock + ',' + this._offset + ']';
        }),
        e
      );
    })(En),
    Nn = (function () {
      function i(t, e, n) {
        if (
          (E(t, 'transition'),
          E(e, 'offsetBefore'),
          E(n, 'offsetAfter'),
          e.equals(n))
        )
          throw new c('Offsets must not be equal');
        if (0 !== t.nano()) throw new c('Nano-of-second must be zero');
        (this._transition = t instanceof _n ? t : _n.ofEpochSecond(t, 0, e)),
          (this._offsetBefore = e),
          (this._offsetAfter = n);
      }
      i.of = function (t, e, n) {
        return new i(t, e, n);
      };
      var t = i.prototype;
      return (
        (t.instant = function () {
          return this._transition.toInstant(this._offsetBefore);
        }),
        (t.toEpochSecond = function () {
          return this._transition.toEpochSecond(this._offsetBefore);
        }),
        (t.dateTimeBefore = function () {
          return this._transition;
        }),
        (t.dateTimeAfter = function () {
          return this._transition.plusSeconds(this.durationSeconds());
        }),
        (t.offsetBefore = function () {
          return this._offsetBefore;
        }),
        (t.offsetAfter = function () {
          return this._offsetAfter;
        }),
        (t.duration = function () {
          return Y.ofSeconds(this.durationSeconds());
        }),
        (t.durationSeconds = function () {
          return (
            this._offsetAfter.totalSeconds() - this._offsetBefore.totalSeconds()
          );
        }),
        (t.isGap = function () {
          return (
            this._offsetAfter.totalSeconds() > this._offsetBefore.totalSeconds()
          );
        }),
        (t.isOverlap = function () {
          return (
            this._offsetAfter.totalSeconds() < this._offsetBefore.totalSeconds()
          );
        }),
        (t.isValidOffset = function (t) {
          return (
            !this.isGap() &&
            (this._offsetBefore.equals(t) || this._offsetAfter.equals(t))
          );
        }),
        (t.validOffsets = function () {
          return this.isGap() ? [] : [this._offsetBefore, this._offsetAfter];
        }),
        (t.compareTo = function (t) {
          return this.instant().compareTo(t.instant());
        }),
        (t.equals = function (t) {
          if (t === this) return !0;
          if (t instanceof i) {
            var e = t;
            return (
              this._transition.equals(e._transition) &&
              this._offsetBefore.equals(e.offsetBefore()) &&
              this._offsetAfter.equals(e.offsetAfter())
            );
          }
          return !1;
        }),
        (t.hashCode = function () {
          return (
            this._transition.hashCode() ^
            this._offsetBefore.hashCode() ^
            (this._offsetAfter.hashCode() >>> 16)
          );
        }),
        (t.toString = function () {
          return (
            'Transition[' +
            (this.isGap() ? 'Gap' : 'Overlap') +
            ' at ' +
            this._transition.toString() +
            this._offsetBefore.toString() +
            ' to ' +
            this._offsetAfter +
            ']'
          );
        }),
        i
      );
    })();
  var Dn = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      _(e, t);
      var n = e.prototype;
      return (
        (n.isFixedOffset = function () {
          return !1;
        }),
        (n.offsetOfInstant = function (t) {
          var e = new Date(t.toEpochMilli()).getTimezoneOffset();
          return Nt.ofTotalMinutes(-1 * e);
        }),
        (n.offsetOfEpochMilli = function (t) {
          var e = new Date(t).getTimezoneOffset();
          return Nt.ofTotalMinutes(-1 * e);
        }),
        (n.offsetOfLocalDateTime = function (t) {
          var e = 1e3 * t.toEpochSecond(Nt.UTC),
            n = new Date(e).getTimezoneOffset(),
            i = new Date(e + 6e4 * n).getTimezoneOffset();
          return Nt.ofTotalMinutes(-1 * i);
        }),
        (n.validOffsets = function (t) {
          return [this.offsetOfLocalDateTime(t)];
        }),
        (n.transition = function () {
          return null;
        }),
        (n.standardOffset = function (t) {
          return this.offsetOfInstant(t);
        }),
        (n.daylightSavings = function () {
          this._throwNotSupported();
        }),
        (n.isDaylightSavings = function () {
          this._throwNotSupported();
        }),
        (n.isValidOffset = function (t, e) {
          return this.offsetOfLocalDateTime(t).equals(e);
        }),
        (n.nextTransition = function () {
          this._throwNotSupported();
        }),
        (n.previousTransition = function () {
          this._throwNotSupported();
        }),
        (n.transitions = function () {
          this._throwNotSupported();
        }),
        (n.transitionRules = function () {
          this._throwNotSupported();
        }),
        (n._throwNotSupported = function () {
          throw new M('not supported operation');
        }),
        (n.equals = function (t) {
          return this === t || t instanceof e;
        }),
        (n.toString = function () {
          return 'SYSTEM';
        }),
        e
      );
    })(Et),
    An = (function (e) {
      function t() {
        var t;
        return ((t = e.call(this) || this)._rules = new Dn()), t;
      }
      _(t, e);
      var n = t.prototype;
      return (
        (n.rules = function () {
          return this._rules;
        }),
        (n.equals = function (t) {
          return this === t;
        }),
        (n.id = function () {
          return 'SYSTEM';
        }),
        t
      );
    })(pt),
    vn =
      ((Tn.systemDefault = function () {
        return yn;
      }),
      (Tn.getAvailableZoneIds = function () {
        return me.getAvailableZoneIds();
      }),
      (Tn.of = function (t) {
        if ((E(t, 'zoneId'), 'Z' === t)) return Nt.UTC;
        if (1 === t.length) throw new M('Invalid zone: ' + t);
        if (_t.startsWith(t, '+') || _t.startsWith(t, '-')) return Nt.of(t);
        if ('UTC' === t || 'GMT' === t || 'GMT0' === t || 'UT' === t)
          return new Ae(t, Nt.UTC.rules());
        if (
          _t.startsWith(t, 'UTC+') ||
          _t.startsWith(t, 'GMT+') ||
          _t.startsWith(t, 'UTC-') ||
          _t.startsWith(t, 'GMT-')
        ) {
          var e = Nt.of(t.substring(3));
          return 0 === e.totalSeconds()
            ? new Ae(t.substring(0, 3), e.rules())
            : new Ae(t.substring(0, 3) + e.id(), e.rules());
        }
        if (_t.startsWith(t, 'UT+') || _t.startsWith(t, 'UT-')) {
          var n = Nt.of(t.substring(2));
          return 0 === n.totalSeconds()
            ? new Ae('UT', n.rules())
            : new Ae('UT' + n.id(), n.rules());
        }
        return 'SYSTEM' === t ? pt.systemDefault() : Ae.ofId(t);
      }),
      (Tn.ofOffset = function (t, e) {
        if ((E(t, 'prefix'), E(e, 'offset'), 0 === t.length)) return e;
        if ('GMT' === t || 'UTC' === t || 'UT' === t)
          return 0 === e.totalSeconds()
            ? new Ae(t, e.rules())
            : new Ae(t + e.id(), e.rules());
        throw new c('Invalid prefix, must be GMT, UTC or UT: ' + t);
      }),
      (Tn.from = function (t) {
        E(t, 'temporal');
        var e = t.query(H.zone());
        if (null == e)
          throw new M(
            'Unable to obtain ZoneId from TemporalAccessor: ' +
              t +
              ', type ' +
              (null != t.constructor ? t.constructor.name : '')
          );
        return e;
      }),
      Tn);
  function Tn() {}
  var yn = null;
  var Mn = !1;
  Mn ||
    ((Mn = !0),
    (F.MIN_VALUE = -999999),
    (F.MAX_VALUE = 999999),
    (Y.ZERO = new Y(0, 0)),
    (C.NANOS = new C('Nanos', Y.ofNanos(1))),
    (C.MICROS = new C('Micros', Y.ofNanos(1e3))),
    (C.MILLIS = new C('Millis', Y.ofNanos(1e6))),
    (C.SECONDS = new C('Seconds', Y.ofSeconds(1))),
    (C.MINUTES = new C('Minutes', Y.ofSeconds(60))),
    (C.HOURS = new C('Hours', Y.ofSeconds(3600))),
    (C.HALF_DAYS = new C('HalfDays', Y.ofSeconds(43200))),
    (C.DAYS = new C('Days', Y.ofSeconds(86400))),
    (C.WEEKS = new C('Weeks', Y.ofSeconds(604800))),
    (C.MONTHS = new C('Months', Y.ofSeconds(2629746))),
    (C.YEARS = new C('Years', Y.ofSeconds(31556952))),
    (C.DECADES = new C('Decades', Y.ofSeconds(315569520))),
    (C.CENTURIES = new C('Centuries', Y.ofSeconds(3155695200))),
    (C.MILLENNIA = new C('Millennia', Y.ofSeconds(31556952e3))),
    (C.ERAS = new C('Eras', Y.ofSeconds(31556952 * (F.MAX_VALUE + 1)))),
    (C.FOREVER = new C('Forever', Y.ofSeconds(w.MAX_SAFE_INTEGER, 999999999))),
    (b.NANO_OF_SECOND = new b(
      'NanoOfSecond',
      C.NANOS,
      C.SECONDS,
      U.of(0, 999999999)
    )),
    (b.NANO_OF_DAY = new b('NanoOfDay', C.NANOS, C.DAYS, U.of(0, 864e11 - 1))),
    (b.MICRO_OF_SECOND = new b(
      'MicroOfSecond',
      C.MICROS,
      C.SECONDS,
      U.of(0, 999999)
    )),
    (b.MICRO_OF_DAY = new b(
      'MicroOfDay',
      C.MICROS,
      C.DAYS,
      U.of(0, 864e8 - 1)
    )),
    (b.MILLI_OF_SECOND = new b(
      'MilliOfSecond',
      C.MILLIS,
      C.SECONDS,
      U.of(0, 999)
    )),
    (b.MILLI_OF_DAY = new b(
      'MilliOfDay',
      C.MILLIS,
      C.DAYS,
      U.of(0, 864e5 - 1)
    )),
    (b.SECOND_OF_MINUTE = new b(
      'SecondOfMinute',
      C.SECONDS,
      C.MINUTES,
      U.of(0, 59)
    )),
    (b.SECOND_OF_DAY = new b('SecondOfDay', C.SECONDS, C.DAYS, U.of(0, 86399))),
    (b.MINUTE_OF_HOUR = new b('MinuteOfHour', C.MINUTES, C.HOURS, U.of(0, 59))),
    (b.MINUTE_OF_DAY = new b('MinuteOfDay', C.MINUTES, C.DAYS, U.of(0, 1439))),
    (b.HOUR_OF_AMPM = new b('HourOfAmPm', C.HOURS, C.HALF_DAYS, U.of(0, 11))),
    (b.CLOCK_HOUR_OF_AMPM = new b(
      'ClockHourOfAmPm',
      C.HOURS,
      C.HALF_DAYS,
      U.of(1, 12)
    )),
    (b.HOUR_OF_DAY = new b('HourOfDay', C.HOURS, C.DAYS, U.of(0, 23))),
    (b.CLOCK_HOUR_OF_DAY = new b(
      'ClockHourOfDay',
      C.HOURS,
      C.DAYS,
      U.of(1, 24)
    )),
    (b.AMPM_OF_DAY = new b('AmPmOfDay', C.HALF_DAYS, C.DAYS, U.of(0, 1))),
    (b.DAY_OF_WEEK = new b('DayOfWeek', C.DAYS, C.WEEKS, U.of(1, 7))),
    (b.ALIGNED_DAY_OF_WEEK_IN_MONTH = new b(
      'AlignedDayOfWeekInMonth',
      C.DAYS,
      C.WEEKS,
      U.of(1, 7)
    )),
    (b.ALIGNED_DAY_OF_WEEK_IN_YEAR = new b(
      'AlignedDayOfWeekInYear',
      C.DAYS,
      C.WEEKS,
      U.of(1, 7)
    )),
    (b.DAY_OF_MONTH = new b(
      'DayOfMonth',
      C.DAYS,
      C.MONTHS,
      U.of(1, 28, 31),
      'day'
    )),
    (b.DAY_OF_YEAR = new b('DayOfYear', C.DAYS, C.YEARS, U.of(1, 365, 366))),
    (b.EPOCH_DAY = new b(
      'EpochDay',
      C.DAYS,
      C.FOREVER,
      U.of(Math.floor(365.25 * F.MIN_VALUE), Math.floor(365.25 * F.MAX_VALUE))
    )),
    (b.ALIGNED_WEEK_OF_MONTH = new b(
      'AlignedWeekOfMonth',
      C.WEEKS,
      C.MONTHS,
      U.of(1, 4, 5)
    )),
    (b.ALIGNED_WEEK_OF_YEAR = new b(
      'AlignedWeekOfYear',
      C.WEEKS,
      C.YEARS,
      U.of(1, 53)
    )),
    (b.MONTH_OF_YEAR = new b(
      'MonthOfYear',
      C.MONTHS,
      C.YEARS,
      U.of(1, 12),
      'month'
    )),
    (b.PROLEPTIC_MONTH = new b(
      'ProlepticMonth',
      C.MONTHS,
      C.FOREVER,
      U.of(12 * F.MIN_VALUE, 12 * F.MAX_VALUE + 11)
    )),
    (b.YEAR_OF_ERA = new b(
      'YearOfEra',
      C.YEARS,
      C.FOREVER,
      U.of(1, F.MAX_VALUE, F.MAX_VALUE + 1)
    )),
    (b.YEAR = new b(
      'Year',
      C.YEARS,
      C.FOREVER,
      U.of(F.MIN_VALUE, F.MAX_VALUE),
      'year'
    )),
    (b.ERA = new b('Era', C.ERAS, C.FOREVER, U.of(0, 1))),
    (b.INSTANT_SECONDS = new b(
      'InstantSeconds',
      C.SECONDS,
      C.FOREVER,
      U.of(h, u)
    )),
    (b.OFFSET_SECONDS = new b(
      'OffsetSeconds',
      C.SECONDS,
      C.FOREVER,
      U.of(-64800, 64800)
    )),
    (function () {
      dn.HOURS = [];
      for (var t = 0; t < 24; t++) dn.of(t, 0, 0, 0);
      (dn.MIN = dn.HOURS[0]),
        (dn.MAX = new dn(23, 59, 59, 999999999)),
        (dn.MIDNIGHT = dn.HOURS[0]),
        (dn.NOON = dn.HOURS[12]),
        (dn.FROM = X('LocalTime.FROM', function (t) {
          return dn.from(t);
        }));
    })(),
    (Pt = new It()),
    (Ut = new Yt()),
    (Vt = new Ft()),
    (bt = new Ct()),
    (Ht = new Lt('WeekBasedYears', Y.ofSeconds(31556952))),
    (Wt = new Lt('QuarterYears', Y.ofSeconds(7889238))),
    (wt.DAY_OF_QUARTER = Pt),
    (wt.QUARTER_OF_YEAR = Ut),
    (wt.WEEK_OF_WEEK_BASED_YEAR = Vt),
    (wt.WEEK_BASED_YEAR = bt),
    (wt.WEEK_BASED_YEARS = Ht),
    (wt.QUARTER_YEARS = Wt),
    (cn.prototype.isoWeekOfWeekyear = function () {
      return this.get(wt.WEEK_OF_WEEK_BASED_YEAR);
    }),
    (cn.prototype.isoWeekyear = function () {
      return this.get(wt.WEEK_BASED_YEAR);
    }),
    (H.ZONE_ID = X('ZONE_ID', function (t) {
      return t.query(H.ZONE_ID);
    })),
    (H.CHRONO = X('CHRONO', function (t) {
      return t.query(H.CHRONO);
    })),
    (H.PRECISION = X('PRECISION', function (t) {
      return t.query(H.PRECISION);
    })),
    (H.OFFSET = X('OFFSET', function (t) {
      return t.isSupported(b.OFFSET_SECONDS)
        ? Nt.ofTotalSeconds(t.get(b.OFFSET_SECONDS))
        : null;
    })),
    (H.ZONE = X('ZONE', function (t) {
      var e = t.query(H.ZONE_ID);
      return null != e ? e : t.query(H.OFFSET);
    })),
    (H.LOCAL_DATE = X('LOCAL_DATE', function (t) {
      return t.isSupported(b.EPOCH_DAY)
        ? cn.ofEpochDay(t.getLong(b.EPOCH_DAY))
        : null;
    })),
    (H.LOCAL_TIME = X('LOCAL_TIME', function (t) {
      return t.isSupported(b.NANO_OF_DAY)
        ? dn.ofNanoOfDay(t.getLong(b.NANO_OF_DAY))
        : null;
    })),
    (Q.MONDAY = new Q(0, 'MONDAY')),
    (Q.TUESDAY = new Q(1, 'TUESDAY')),
    (Q.WEDNESDAY = new Q(2, 'WEDNESDAY')),
    (Q.THURSDAY = new Q(3, 'THURSDAY')),
    (Q.FRIDAY = new Q(4, 'FRIDAY')),
    (Q.SATURDAY = new Q(5, 'SATURDAY')),
    (Q.SUNDAY = new Q(6, 'SUNDAY')),
    (Q.FROM = X('DayOfWeek.FROM', function (t) {
      return Q.from(t);
    })),
    (J = [
      Q.MONDAY,
      Q.TUESDAY,
      Q.WEDNESDAY,
      Q.THURSDAY,
      Q.FRIDAY,
      Q.SATURDAY,
      Q.SUNDAY,
    ]),
    (pn.MIN_SECONDS = -31619119219200),
    (pn.MAX_SECONDS = 31494816403199),
    (pn.EPOCH = new pn(0, 0)),
    (pn.MIN = pn.ofEpochSecond(pn.MIN_SECONDS, 0)),
    (pn.MAX = pn.ofEpochSecond(pn.MAX_SECONDS, 999999999)),
    (pn.FROM = X('Instant.FROM', function (t) {
      return pn.from(t);
    })),
    (cn.MIN = cn.of(F.MIN_VALUE, 1, 1)),
    (cn.MAX = cn.of(F.MAX_VALUE, 12, 31)),
    (cn.EPOCH_0 = cn.ofEpochDay(0)),
    (cn.FROM = X('LocalDate.FROM', function (t) {
      return cn.from(t);
    })),
    (_n.MIN = _n.of(cn.MIN, dn.MIN)),
    (_n.MAX = _n.of(cn.MAX, dn.MAX)),
    (_n.FROM = X('LocalDateTime.FROM', function (t) {
      return _n.from(t);
    })),
    (ze.MIN_VALUE = F.MIN_VALUE),
    (ze.MAX_VALUE = F.MAX_VALUE),
    (Ze = new Fe().appendValue(b.YEAR, 4, 10, Zt.EXCEEDS_PAD).toFormatter()),
    (ze.FROM = X('Year.FROM', function (t) {
      return ze.from(t);
    })),
    (tt.JANUARY = new tt(1, 'JANUARY')),
    (tt.FEBRUARY = new tt(2, 'FEBRUARY')),
    (tt.MARCH = new tt(3, 'MARCH')),
    (tt.APRIL = new tt(4, 'APRIL')),
    (tt.MAY = new tt(5, 'MAY')),
    (tt.JUNE = new tt(6, 'JUNE')),
    (tt.JULY = new tt(7, 'JULY')),
    (tt.AUGUST = new tt(8, 'AUGUST')),
    (tt.SEPTEMBER = new tt(9, 'SEPTEMBER')),
    (tt.OCTOBER = new tt(10, 'OCTOBER')),
    (tt.NOVEMBER = new tt(11, 'NOVEMBER')),
    (tt.DECEMBER = new tt(12, 'DECEMBER')),
    ($ = [
      tt.JANUARY,
      tt.FEBRUARY,
      tt.MARCH,
      tt.APRIL,
      tt.MAY,
      tt.JUNE,
      tt.JULY,
      tt.AUGUST,
      tt.SEPTEMBER,
      tt.OCTOBER,
      tt.NOVEMBER,
      tt.DECEMBER,
    ]),
    (Be = new Fe()
      .appendValue(b.YEAR, 4, 10, Zt.EXCEEDS_PAD)
      .appendLiteral('-')
      .appendValue(b.MONTH_OF_YEAR, 2)
      .toFormatter()),
    (qe.FROM = X('YearMonth.FROM', function (t) {
      return qe.from(t);
    })),
    (xe = new Fe()
      .appendLiteral('--')
      .appendValue(b.MONTH_OF_YEAR, 2)
      .appendLiteral('-')
      .appendValue(b.DAY_OF_MONTH, 2)
      .toFormatter()),
    (ke.FROM = X('MonthDay.FROM', function (t) {
      return ke.from(t);
    })),
    nt.ofDays(0),
    (Nt.MAX_SECONDS = 18 * dn.SECONDS_PER_HOUR),
    (Nt.UTC = Nt.ofTotalSeconds(0)),
    (Nt.MIN = Nt.ofTotalSeconds(-Nt.MAX_SECONDS)),
    (Nt.MAX = Nt.ofTotalSeconds(Nt.MAX_SECONDS)),
    (hn.FROM = X('ZonedDateTime.FROM', function (t) {
      return hn.from(t);
    })),
    (yn = new An()),
    (pt.systemDefault = vn.systemDefault),
    (pt.getAvailableZoneIds = vn.getAvailableZoneIds),
    (pt.of = vn.of),
    (pt.ofOffset = vn.ofOffset),
    (pt.from = vn.from),
    (Nt.from = vn.from),
    (pt.SYSTEM = yn),
    (pt.UTC = Nt.ofTotalSeconds(0)),
    (an.INSTANCE = new an('IsoChronology')),
    (We.ISO_LOCAL_DATE = new Fe()
      .appendValue(b.YEAR, 4, 10, Zt.EXCEEDS_PAD)
      .appendLiteral('-')
      .appendValue(b.MONTH_OF_YEAR, 2)
      .appendLiteral('-')
      .appendValue(b.DAY_OF_MONTH, 2)
      .toFormatter(ft.STRICT)
      .withChronology(an.INSTANCE)),
    (We.ISO_LOCAL_TIME = new Fe()
      .appendValue(b.HOUR_OF_DAY, 2)
      .appendLiteral(':')
      .appendValue(b.MINUTE_OF_HOUR, 2)
      .optionalStart()
      .appendLiteral(':')
      .appendValue(b.SECOND_OF_MINUTE, 2)
      .optionalStart()
      .appendFraction(b.NANO_OF_SECOND, 0, 9, !0)
      .toFormatter(ft.STRICT)),
    (We.ISO_LOCAL_DATE_TIME = new Fe()
      .parseCaseInsensitive()
      .append(We.ISO_LOCAL_DATE)
      .appendLiteral('T')
      .append(We.ISO_LOCAL_TIME)
      .toFormatter(ft.STRICT)
      .withChronology(an.INSTANCE)),
    (We.ISO_INSTANT = new Fe()
      .parseCaseInsensitive()
      .appendInstant()
      .toFormatter(ft.STRICT)),
    (We.ISO_OFFSET_DATE_TIME = new Fe()
      .parseCaseInsensitive()
      .append(We.ISO_LOCAL_DATE_TIME)
      .appendOffsetId()
      .toFormatter(ft.STRICT)
      .withChronology(an.INSTANCE)),
    (We.ISO_ZONED_DATE_TIME = new Fe()
      .append(We.ISO_OFFSET_DATE_TIME)
      .optionalStart()
      .appendLiteral('[')
      .parseCaseSensitive()
      .appendZoneId()
      .appendLiteral(']')
      .toFormatter(ft.STRICT)
      .withChronology(an.INSTANCE)),
    (We.PARSED_EXCESS_DAYS = X('PARSED_EXCESS_DAYS', function (t) {
      return t instanceof At ? t.excessDays : nt.ZERO;
    })),
    (We.PARSED_LEAP_SECOND = X('PARSED_LEAP_SECOND', function (t) {
      return t instanceof At && t.leapSecond;
    })),
    (ue.BASE_DATE = cn.of(2e3, 1, 1)),
    (Fe.CompositePrinterParser = Qt),
    (Fe.PadPrinterParserDecorator = _e),
    (Fe.SettingsParser = pe),
    (Fe.CharLiteralPrinterParser = Oe),
    (Fe.StringLiteralPrinterParser = Oe),
    (Fe.CharLiteralPrinterParser = Gt),
    (Fe.NumberPrinterParser = se),
    (Fe.ReducedPrinterParser = ue),
    (Fe.FractionPrinterParser = ee),
    (Fe.OffsetIdPrinterParser = fe),
    (Fe.ZoneIdPrinterParser = ve));
  var wn,
    Rn =
      (((wn = gn.prototype).toDate = function () {
        return new Date(this.instant.toEpochMilli());
      }),
      (wn.toEpochMilli = function () {
        return this.instant.toEpochMilli();
      }),
      gn);
  function gn(t, e) {
    var n;
    if (t instanceof cn)
      (e = null == e ? pt.systemDefault() : e), (n = t.atStartOfDay(e));
    else if (t instanceof _n)
      (e = null == e ? pt.systemDefault() : e), (n = t.atZone(e));
    else {
      if (!(t instanceof hn))
        throw new c('unsupported instance for convert operation:' + t);
      n = null == e ? t : t.withZoneSameInstant(e);
    }
    this.instant = n.toInstant();
  }
  function In(t, e) {
    return new Rn(t, e);
  }
  var Yn = (function (i) {
    function t(t, e) {
      var n;
      return (
        void 0 === e && (e = pt.systemDefault()),
        ((n = i.call(this) || this)._zone = e),
        t instanceof Date
          ? ((n._epochMilli = t.getTime()), d(n))
          : 'function' == typeof t.toDate && t.toDate() instanceof Date
          ? ((n._epochMilli = t.toDate().getTime()), d(n))
          : (m(!1, 'date must be either a javascript date or a moment'), n)
      );
    }
    _(t, i);
    var e = t.prototype;
    return (
      (e.query = function (t) {
        return (
          E(t, 'query'),
          t === H.localDate()
            ? cn.ofInstant(pn.ofEpochMilli(this._epochMilli), this._zone)
            : t === H.localTime()
            ? dn.ofInstant(pn.ofEpochMilli(this._epochMilli), this._zone)
            : t === H.zone()
            ? this._zone
            : i.prototype.query.call(this, t)
        );
      }),
      (e.get = function (t) {
        return this.getLong(t);
      }),
      (e.getLong = function (t) {
        if ((E(t, 'field'), t instanceof b)) {
          switch (t) {
            case b.NANO_OF_SECOND:
              return 1e6 * w.floorMod(this._epochMilli, 1e3);
            case b.INSTANT_SECONDS:
              return w.floorDiv(this._epochMilli, 1e3);
          }
          throw new l('Unsupported field: ' + t);
        }
        return t.getFrom(this);
      }),
      (e.isSupported = function (t) {
        return t === b.INSTANT_SECONDS || t === b.NANO_OF_SECOND;
      }),
      t
    );
  })(k);
  function Fn(t, e) {
    return new Yn(t, e);
  }
  var Cn,
    Ln,
    Pn = {
      assert: a,
      DateTimeBuilder: At,
      DateTimeParseContext: vt,
      DateTimePrintContext: Mt,
      MathUtil: w,
      StringUtil: _t,
      StringBuilder: be,
    },
    Un = {
      _: Pn,
      convert: In,
      nativeJs: Fn,
      ArithmeticException: S,
      DateTimeException: M,
      DateTimeParseException: p,
      IllegalArgumentException: c,
      IllegalStateException: r,
      UnsupportedTemporalTypeException: l,
      NullPointerException: s,
      Clock: En,
      DayOfWeek: Q,
      Duration: Y,
      Instant: pn,
      LocalDate: cn,
      LocalTime: dn,
      LocalDateTime: _n,
      Month: tt,
      MonthDay: ke,
      Period: nt,
      Year: ze,
      YearConstants: F,
      YearMonth: qe,
      ZonedDateTime: hn,
      ZoneOffset: Nt,
      ZoneId: pt,
      ZoneRegion: Ae,
      ZoneOffsetTransition: Nn,
      ZoneRules: Et,
      ZoneRulesProvider: me,
      ChronoLocalDate: lt,
      ChronoLocalDateTime: ln,
      ChronoZonedDateTime: un,
      IsoChronology: an,
      ChronoField: b,
      ChronoUnit: C,
      IsoFields: wt,
      Temporal: Z,
      TemporalAccessor: k,
      TemporalAdjuster: Ke,
      TemporalAdjusters: Ge,
      TemporalAmount: T,
      TemporalField: L,
      TemporalQueries: H,
      TemporalQuery: j,
      TemporalUnit: g,
      ValueRange: U,
      DateTimeFormatter: We,
      DateTimeFormatterBuilder: Fe,
      DecimalStyle: kt,
      ResolverStyle: ft,
      SignStyle: Zt,
      TextStyle: Kt,
    },
    Vn =
      ((Cn = Un),
      (Ln = []),
      function (t) {
        return ~Ln.indexOf(t) || (t(Cn), Ln.push(t)), Cn;
      });
  return (
    (Un.use = Vn),
    (t.ArithmeticException = S),
    (t.ChronoField = b),
    (t.ChronoLocalDate = lt),
    (t.ChronoLocalDateTime = ln),
    (t.ChronoUnit = C),
    (t.ChronoZonedDateTime = un),
    (t.Clock = En),
    (t.DateTimeException = M),
    (t.DateTimeFormatter = We),
    (t.DateTimeFormatterBuilder = Fe),
    (t.DateTimeParseException = p),
    (t.DayOfWeek = Q),
    (t.DecimalStyle = kt),
    (t.Duration = Y),
    (t.IllegalArgumentException = c),
    (t.IllegalStateException = r),
    (t.Instant = pn),
    (t.IsoChronology = an),
    (t.IsoFields = wt),
    (t.LocalDate = cn),
    (t.LocalDateTime = _n),
    (t.LocalTime = dn),
    (t.Month = tt),
    (t.MonthDay = ke),
    (t.NullPointerException = s),
    (t.Period = nt),
    (t.ResolverStyle = ft),
    (t.SignStyle = Zt),
    (t.Temporal = Z),
    (t.TemporalAccessor = k),
    (t.TemporalAdjuster = Ke),
    (t.TemporalAdjusters = Ge),
    (t.TemporalAmount = T),
    (t.TemporalField = L),
    (t.TemporalQueries = H),
    (t.TemporalQuery = j),
    (t.TemporalUnit = g),
    (t.TextStyle = Kt),
    (t.UnsupportedTemporalTypeException = l),
    (t.ValueRange = U),
    (t.Year = ze),
    (t.YearConstants = F),
    (t.YearMonth = qe),
    (t.ZoneId = pt),
    (t.ZoneOffset = Nt),
    (t.ZoneOffsetTransition = Nn),
    (t.ZoneRegion = Ae),
    (t.ZoneRules = Et),
    (t.ZoneRulesProvider = me),
    (t.ZonedDateTime = hn),
    (t._ = Pn),
    (t.convert = In),
    (t.nativeJs = Fn),
    (t.use = Vn),
    t
  );
})({});
