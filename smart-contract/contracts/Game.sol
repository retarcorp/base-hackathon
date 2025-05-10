// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Game {
    uint[] public actions;

    struct Card {
        uint sideA;
        uint sideB;
        uint sideC;
        uint sideD;
        bool isAvailable;
        uint cardId;
    }

    struct User {
        Card[] cards; // list of cards owned by the user
        uint score; // User's score
    }

    // List of all users who have interacted with the map // or who actually exist? - clarify
    address[] public userList;

    // Mapping to store user data. Access specific user at address (msg.sender?)
    mapping(address => User) public users;

    // Mapping to check if a user is already in the userList
    mapping(address => bool) private hasInteracted;

    // Mapping to store cards at specific coordinates

    mapping(bytes32 => Card) public coordinateToCard;

    // Mapping to track which user placed a card at specific coordinates
    mapping(bytes32 => address) public cardPlacedBy;


    function initializeUser(address user) public returns (User memory) {
        require(!hasInteracted[user], "User already exists / interacted");

        for (uint i = 0; i < 3; i++) {
            Card memory newCard = Card(
                getRandomNumber(123),
                getRandomNumber(321),
                getRandomNumber(456),
                getRandomNumber(612),
                true,
                i
            );

            // Add the card to the user's list
            users[user].cards.push(newCard);
        }

        // Initialize the user's score
        users[user].score = 0;

        // If the user is interacting for the first time, add them to the userList
        userList.push(user);

        // Mark the user as already existing
        hasInteracted[user] = true;

        return users[user];
    }

    // Function to retrieve a user's cards
    function getUserCards(address user) public view returns (Card[] memory) {
        return users[user].cards;
    }

    // Function to retrieve a user's score
    function getUserScore(address user) public view returns (uint) {
        return users[user].score;
    }

    // Function to get the list of all users
    function getAllUsers() public view returns (address[] memory) {
        return userList;
    }

    function getRandomNumber(uint seed) public view returns (uint) {
        // Generate a pseudo-random number between 1 and 4
        return
            (uint(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.prevrandao,
                        msg.sender,
                        seed
                    )
                )
            ) % 4) + 1;
    }

    // Function to add a card at specific coordinates
    function placeCard(address user, uint x, uint y, uint cardId) public {

        bytes32 coordinateKey = keccak256(abi.encodePacked(x, y));

        User storage currentUser = users[user];
        require(cardId < currentUser.cards.length, "Invalid card ID");
        Card storage userCard = currentUser.cards[cardId];

        // Ensure the card is available
        require(userCard.isAvailable, "Card is not available");

        // Trick - cause the line below saves a copy, not a reference
        userCard.isAvailable = false;

        coordinateToCard[coordinateKey] = userCard;

        // Track the user who placed the card
        cardPlacedBy[coordinateKey] = user;
    }

    // Function to retrieve a card at specific coordinates
    function getPlacedCardAtCoordinate(
        uint x,
        uint y
    ) public view returns (Card memory, address) {
        bytes32 coordinateKey = keccak256(abi.encodePacked(x, y));
        return (coordinateToCard[coordinateKey], cardPlacedBy[coordinateKey]);

        // Check if the coordinate is actually free
    }

    // 40 x 50 map
}