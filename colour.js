var Colour = function() {
  if (arguments.length === 1) {
    if (typeof arguments[0] === "string") {
      this.createFromString(arguments[0]);
    } else if (typeof arguments[0] === "object") {
      this.createFromObject(arguments[0]);
    }
  } else if (arguments.length >= 3) {
    Colour.prototype.createFromRGBA.apply(this, arguments);
  }
};

Colour.prototype = {
  _rgba: [0, 0, 0, 1],

  /* Accessors */
  r: function(val) { return val !== undefined ? this.setComponent(0, val) : this.getComponent(0); },
  g: function(val) { return val !== undefined ? this.setComponent(1, val) : this.getComponent(1); },
  b: function(val) { return val !== undefined ? this.setComponent(2, val) : this.getComponent(2); },
  a: function(val) { return val !== undefined ? this.setComponent(3, val) : this.getComponent(3); },

  getComponent: function(idx) {
    return this._clamp(idx, this._rgba[idx]);
  },

  /* Setters */
  createFromString: function(str) {

  },

  createFromObject: function(o) {

  },

  createFromRGBA: function(r, g, b, a) {
    for (var i = 0; i < this._rgba.length; ++i) {
      this.setComponent(i, arguments[i]);
    }
  },

  setComponent: function(idx, val) {
    val = (this._isAlpha(idx)) ? parseFloat(val) || 1.0 : parseInt(val, 10) || 0;
    this._rgba[idx] = this._clamp(idx, val);
  },

  /* Conversions */
  toCSS: function(forceRGBA) {
    if (this.a() < 1.0 || !!forceRGBA) {
      return 'rgba(' + this._rgba.join(",") + ')';
    }
    var hex = this.toHex(),
        hex1 = "",
        hex2 = "";
    for (var i = 0; i < 3; ++i) {
      hex1 += hex[2*i];
      hex2 += hex[2*i+1];
    }
    return '#' + (hex1 == hex2 ? hex1 : hex);
  },

  toHex: function() {
    var hex = [];
    for (var i = 0; i < 3; ++i) {
      var comp = this._rgba[i];
      hex.push((comp < 16 ? "0" : "") + comp.toString(16));
    }
    return hex.join('');
  },

  /* Helpers */
  _isAlpha: function(idx) { return idx === 3; },

  _clamp: function(idx, val) {
    var max = (this._isAlpha(idx)) ? 1.0 : 255;
    return val < 0 ? 0 : val > max ? max : val;
  }
};