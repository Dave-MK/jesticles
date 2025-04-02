/** 
 * @jest-environment jsdom
 */

jest.spyOn(window, "alert").mockImplementation(() => {});
const {
	test
} = require("picomatch");
const {
	game,
	newGame,
	showScore,
	addTurn,
	lightsOn,
	showTurns,
	playerTurn
} = require("../../assets/js/game.js");

beforeAll(() => {
	let fs = require("fs");
	let fileContents = fs.readFileSync("simon.html", "utf8");
	document.open();
	document.write(fileContents);
	document.close();
})

describe("game object contains correct keys", () => {
	test("score keys exist", () => {
		expect("score" in game).toBe(true);
	})
	test("currentGame key exist", () => {
		expect("currentGame" in game).toBe(true);
	})
	test("playerMoves key exist", () => {
		expect("playerMoves" in game).toBe(true);
	})
	test("choices key exist", () => {
		expect("choices" in game).toBe(true);
	})
	test("choices contain correct ids", () => {
		expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
	})
	test("turnNumber key exist", () => {
		expect("turnNumber" in game).toBe(true);
	})
})

describe("newGame works correctly", () => {
	beforeAll(() => {
		game.score = 42;
		game.playerMoves = [1, 2, 3, 4];
		game.currentGame = [1, 2, 3, 4];
		document.getElementById("score").innerHTML = "42";
		newGame();
	})
	test("score is reset to 0", () => {
		expect(game.score).toEqual(0);
	})
	test("playerMoves is reset to 0", () => {
		expect(game.playerMoves.length).toEqual(0);
	})
	test("should be one move in the computers game array", () => {
		expect(game.currentGame.length).toEqual(game.currentGame.length);
	})
	test("should display 0 in the score element", () => {
		expect(document.getElementById("score").innerText).toEqual(0);
	})
	test("should set data-listener to true on each circle", () => {
		const elements = document.getElementsByClassName("circle");
		for (let element of elements) {
			expect(element.getAttribute("data-listener")).toEqual("true");
		}
	})
})

describe("ganmeplay works correctly", () => {
	beforeEach(() => {
		game.score = 0;
		game.playerMoves = [];
		game.currentGame = [];
		addTurn();
	});
	afterEach(() => {
		game.score = 0;
		game.playerMoves = [];
		game.currentGame = [];
	})
	test("addTurn add new turn to game", () => {
		addTurn();
		expect(game.currentGame.length).toEqual(2);
	})
	test("should add correct class to light up button", () => {
		let button = document.getElementById(game.currentGame[0]);
		lightsOn(game.currentGame[0]);
		expect(button.classList).toContain("light");
	})
	test("showTurns should update game.turnNumber", () => {
		game.turnNumber = 42;
		showTurns();
		expect(game.turnNumber).toEqual(0);
	})
	test("incremennt score if turn is correct", () => {
		game.playerMoves.push(game.currentGame[0]);
		playerTurn();
		expect(game.score).toEqual(1);
	})
	test("should call alert if turn is incorrect", () => {
		game.playerMoves.push("wrong");
		playerTurn();
		expect(window.alert).toBeCalledWith("Wrong move! Try again.");
	})
})