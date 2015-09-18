"use strict";

import PrototypeChain from "../lib/PrototypeChain";

describe("PrototypeChain", () => {
  describe("constructor(object)", () => {
    it("creates a `PrototypeChain` which can be enumerated in order",
      () => {

      let f = () => {};
      let chain = new PrototypeChain(f);
      let index = 0;
      for (let link of chain) {
        let object = link.object;
        switch (index) {
          case 0:
            expect(object).to.equal(f);
            break;
          case 1:
            expect(object).to.equal(Function.prototype);
            break;
          case 2:
            expect(object).to.equal(Object.prototype);
            break;
          case 3:
            expect(true).to.equal(false); // Shouldn't get here
            break;
        }
        index++;
      }
    });
  });

  describe("get(index)", () => {
    it("gets the correct link in the prototype chain", () => {
      let a = [];
      let chain = new PrototypeChain(a);
      let object = chain.get(1).object;
      expect(object).to.equal(Array.prototype);
    });
  });
});