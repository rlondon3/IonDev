function isUndefined(input) {
  return input === void 0;
}
function copyConfig(to, from) {
  var i, prop, val;

  if (!isUndefined(from._isAJodaObject)) {
    to._isAJodaObject = from._isAJodaObject;
  }
  if (!isUndefined(from._i)) {
    to._i = from._i;
  }
  if (!isUndefined(from._f)) {
    to._f = from._f;
  }
  if (!isUndefined(from._l)) {
    to._l = from._l;
  }
  if (!isUndefined(from._strict)) {
    to._strict = from._strict;
  }
  if (!isUndefined(from._tzm)) {
    to._tzm = from._tzm;
  }
  if (!isUndefined(from._isUTC)) {
    to._isUTC = from._isUTC;
  }
  if (!isUndefined(from._offset)) {
    to._offset = from._offset;
  }
  if (!isUndefined(from._pf)) {
    to._pf = getParsingFlags(from);
  }
  if (!isUndefined(from._locale)) {
    to._locale = from._locale;
  }

  if (jodaproperties.length > 0) {
    for (i = 0; i < jodaproperties.length; i++) {
      prop = jodaproperties[i];
      val = from[prop];
      if (!isUndefined(val)) {
        to[prop] = val;
      }
    }
  }

  return to;
}

function isJoda(obj) {
  return obj instanceof JSJoda || (obj != null && obj._isAJodaObject != null);
}

function createLocalOrUTC(input, format, locale, strict, isUTC) {
  var c = {};

  if (format === true || format === false) {
    strict = format;
    format = undefined;
  }

  if (locale === true || locale === false) {
    strict = locale;
    locale = undefined;
  }

  if (
    (isObject(input) && isObjectEmpty(input)) ||
    (isArray(input) && input.length === 0)
  ) {
    input = undefined;
  }
  // object construction must be done this way.
  // https://github.com/moment/moment/issues/1423
  c._isAJodaObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale;
  c._i = input;
  c._f = format;
  c._strict = strict;

  return createFromConfig(c);
}

function createLocal(input, format, locale, strict) {
  return createLocalOrUTC(input, format, locale, strict, false);
}

function configFromObject(config) {
  if (config._d) {
    return;
  }

  var i = normalizeObjectUnits(config._i),
    dayOrDate = i.day === undefined ? i.date : i.day;
  config._a = map(
    [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
    function (obj) {
      return obj && parseInt(obj, 10);
    }
  );

  configFromArray(config);
}

function createFromConfig(config) {
  var res = new Joda(checkOverflow(prepareConfig(config)));
  if (res._nextDay) {
    // Adding is smart enough around DST
    res.add(1, 'd');
    res._nextDay = undefined;
  }

  return res;
}

function prepareConfig(config) {
  var input = config._i,
    format = config._f;

  config._locale = config._locale || getLocale(config._l);

  if (input === null || (format === undefined && input === '')) {
    return createInvalid({ nullInput: true });
  }

  if (typeof input === 'string') {
    config._i = input = config._locale.preparse(input);
  }

  if (isJoda(input)) {
    return new Joda(checkOverflow(input));
  } else if (isDate(input)) {
    config._d = input;
  } else if (isArray(format)) {
    configFromStringAndArray(config);
  } else if (format) {
    configFromStringAndFormat(config);
  } else {
    configFromInput(config);
  }

  if (!isValid(config)) {
    config._d = null;
  }

  return config;
}

function configFromInput(config) {
  var input = config._i;
  if (isUndefined(input)) {
    config._d = new Date(hooks.now());
  } else if (isDate(input)) {
    config._d = new Date(input.valueOf());
  } else if (typeof input === 'string') {
    configFromString(config);
  } else if (isArray(input)) {
    config._a = map(input.slice(0), function (obj) {
      return parseInt(obj, 10);
    });
    configFromArray(config);
  } else if (isObject(input)) {
    configFromObject(config);
  } else if (isNumber(input)) {
    // from milliseconds
    config._d = new Date(input);
  } else {
    hooks.createFromInputFallback(config);
  }
}

function createLocalOrUTC(input, format, locale, strict, isUTC) {
  var c = {};

  if (format === true || format === false) {
    strict = format;
    format = undefined;
  }

  if (locale === true || locale === false) {
    strict = locale;
    locale = undefined;
  }

  if (
    (isObject(input) && isObjectEmpty(input)) ||
    (isArray(input) && input.length === 0)
  ) {
    input = undefined;
  }
  // object construction must be done this way.
  // https://github.com/moment/moment/issues/1423
  c._isAJodaObject = true;
  c._useUTC = c._isUTC = isUTC;
  c._l = locale;
  c._i = input;
  c._f = format;
  c._strict = strict;

  return createFromConfig(c);
}

function isJodaInput(input) {
  return (
    isJoda(input) ||
    isDate(input) ||
    isString(input) ||
    isNumber(input) ||
    isNumberOrStringArray(input) ||
    isJodaInputObject(input) ||
    input === null ||
    input === undefined
  );
}

function isJodaInputObject(input) {
  var objectTest = isObject(input) && !isObjectEmpty(input),
    propertyTest = false,
    properties = [
      'years',
      'year',
      'y',
      'months',
      'month',
      'M',
      'days',
      'day',
      'd',
      'dates',
      'date',
      'D',
      'hours',
      'hour',
      'h',
      'minutes',
      'minute',
      'm',
      'seconds',
      'second',
      's',
      'milliseconds',
      'millisecond',
      'ms',
    ],
    i,
    property;

  for (i = 0; i < properties.length; i += 1) {
    property = properties[i];
    propertyTest = propertyTest || hasOwnProp(input, property);
  }

  return objectTest && propertyTest;
}
