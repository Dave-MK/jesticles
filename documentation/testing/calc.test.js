const addition = require("../../assets/js/calc.js");

describe("Calculator", () => {
	describe("Addition function", () => {
		test('should return 42 for 20 + 22', () => {
			expect(addition(20, 22)).toBe(42);
		});
		test('should return 73 for 42 + 31', () => {
			expect(addition(42, 31)).toBe(73);
		});
		test('should return NaN for a string', () => {
			expect(addition("20", "22")).toBe(NaN);
		});
		test('should return NaN for empty / undefined params', () => {
			expect(addition()).toBe(NaN);
		});
	});

	describe("Subtraction function", () => {

	});

	describe("Multiply function", () => {

	});

	describe("Division function", () => {

	});
})