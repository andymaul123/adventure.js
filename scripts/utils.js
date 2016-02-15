"use strict";

var canBeIdentifiedByName = function canBeIdentifiedByName(state) {
  return {
    toString: function toString() {
      return state.name;
    }
  };
};