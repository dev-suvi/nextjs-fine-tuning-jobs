import "@testing-library/jest-dom";

Object.defineProperty(HTMLFormElement.prototype, "requestSubmit", {
  value: function () {
    // Do nothing — bypass jsdom's broken implementation
  },
  configurable: true,
});
