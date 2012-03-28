// Unit tests for Colour.
describe("Colour", function() {
  describe("when constructing", function() {
    it("accepts no parameters and defaults to black", function() {
      expect(new Colour().toCSS()).toBe("#000");
    });

    // describe("accepts one string parameter", function() {
    //   it("constructs a color from parsing the hex string", function() {
    //     expect(new Colour("003300").toCSS()).toBe("#030");
    //   });

    //   it("constructs a color from parsing the hex string, with a hash", function() {
    //     expect(new Colour("#00abaa").toCSS()).toBe("#00abaa");
    //   });
    // });

    // describe("accepts one object parameter", function() {
    // });

    describe("accepts multiple parameters", function() {
      it("constructs a color using three parameters as RGB values", function() {
        var c = new Colour(0, 255, 0);
        expect(c.toCSS()).toBe("#0f0");
        expect(c.a()).toBe(1);
      });

      it("constructs a color using four parameters as RGBA values", function() {
        var c = new Colour(128, 128, 128, 0.5);
        expect(c.toCSS()).toBe('rgba(128,128,128,0.5)');
      });
    });
  });
});