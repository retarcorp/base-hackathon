import { expect } from "chai";
import hre from "hardhat";
import { Game, Game__factory } from "../typechain-types";

describe("Game", function () {
	describe("User initialization and property reading works", function () {
		let Game: Game__factory;
		let game: Game;

		before(async () => {
			Game = await hre.ethers.getContractFactory("Game");
			game = await Game.deploy();
		});

		it("Should create an user", async function () {
			const [owner, otherAccount] = await hre.ethers.getSigners();

			await game.initializeUser(owner.address);

			const userCards = await game.getUserCards(owner.address);
			const userScore = await game.getUserScore(owner.address);

			// Check that the user has 3 cards
			expect(userCards.length).to.equal(3);

			// Check the properties of the first card
			expect(userCards[0].isAvailable).to.be.true;
			expect(userCards[0].cardId).to.equal(0);

			expect(userScore).to.equal(0);
		});

		it("Should not create the same user twice", async function () {
			const [owner, otherAccount] = await hre.ethers.getSigners();

			await expect(game.initializeUser(owner.address)).to.be.revertedWith(
				"User already exists / interacted"
			);
		});

		it("Should create a different user", async function () {
			const [owner, otherAccount] = await hre.ethers.getSigners();

			await game.initializeUser(otherAccount.address);

			const userCards = await game.getUserCards(otherAccount.address);
			const userScore = await game.getUserScore(otherAccount.address);

			// Check that the user has 3 cards
			expect(userCards.length).to.equal(3);

			// Check the properties of the first card
			expect(userCards[0].isAvailable).to.be.true;
			expect(userCards[0].cardId).to.equal(0);

			expect(userScore).to.equal(0);
		});

		it("Total users length should equal 2", async function () {
			const allUsers = await game.getAllUsers();

			expect(allUsers.length).to.equal(2);
			expect(allUsers[0]).not.to.equal(allUsers[1]);
		});
	});

	describe("Card operations on map work", function () {
		let Game: Game__factory;
		let game: Game;

		before(async () => {
			Game = await hre.ethers.getContractFactory("Game");
			game = await Game.deploy();
		});

		it("Should place a card on given coordinate by user", async function () {
			const [owner, otherAccount] = await hre.ethers.getSigners();

			await game.initializeUser(owner.address);

			const userCards = await game.getUserCards(owner.address);

			const selectedCard = userCards[0];

			await game.placeCard(owner.address, 0, 0, selectedCard.cardId);

			const [placedCard, user] = await game.getPlacedCardAtCoordinate(0, 0);

			expect(placedCard.isAvailable).to.equal(false);
			expect(placedCard.sideA).to.equal(selectedCard.sideA);
			expect(placedCard.sideB).to.equal(selectedCard.sideB);
			expect(placedCard.sideC).to.equal(selectedCard.sideC);
			expect(placedCard.sideD).to.equal(selectedCard.sideD);

			expect(user).to.equal(owner.address);
		});
	});
});
