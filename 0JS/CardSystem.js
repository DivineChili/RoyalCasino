///////////////////////////////////////
//                                   //
//  -----====== BIG WISE  =====----  //
//                                   //
///////////////////////////////////////

/**
 * @namespace BigWise
 * @desc Contains arithmetically correct bitwise manipulation of numbers greater than 32-bit.
 * @author Simon Andreas Bjørn
 * @since 10.01.2019
 */

/**
 * @desc Preforms a bitwise shift
 * @param x {number} - Number to shift
 * @param i {number} - Shift direction and amount. Positive is left.
 * @returns {number} - Shifted number
 * @memberOf BigWise
 */
const bigShift = (x, i) => {
    return x * Math.pow(2, i);
};

/**
 * @desc Inverts all bits in number
 * @param x {number} - Number to invert
 * @returns {number} - Inverted number
 * @memberOf BigWise
 */
const NOT = (x) => {
    return Math.pow(2, Math.floor(Math.log2(x)) + 1) - 1 - x;
};

/**
 * @desc AND operation on two given numbers
 * @param x {number} - First number in operation
 * @param y {number} - Second number in operation
 * @returns {number} - Result of operation
 * @memberOf BigWise
 */
const AND = (x, y) => {

    let n1 = Math.max(x, y);
    let n2 = Math.min(x, y);

    let sum = 0;
    for (let n = 0; n <= Math.floor(Math.log2(n1)); n++) {
        let twoN = Math.pow(2, n);
        sum +=
            twoN *
            (Math.floor(n1 / twoN) % 2) *
            (Math.floor(n2 / twoN) % 2);
    }
    return sum;
};

/**
 * @desc Inclusive OR operation on two given numbers
 * @param x {number} - First number in operation
 * @param y {number} - Second number in operation
 * @returns {number} - Result of operation
 * @memberOf BigWise
 */
const OR = (x, y) => {
    let n1 = Math.max(x, y);
    let n2 = Math.min(x, y);
    let sum = 0;
    for (let n = 0; n <= Math.floor(Math.log2(n1)); n++) {
        let twoN = Math.pow(2, n);
        sum +=
            twoN * (
                (
                    (Math.floor(n1 / twoN) % 2) + // First digit check
                    (Math.floor(n2 / twoN) % 2) + // Second digit check
                    (Math.floor(n1 / twoN) % 2) * // Fix if both are 1
                    (Math.floor(n2 / twoN) % 2)
                ) % 2
            );
    }
    return sum;
};

/**
 * Exclusive OR operation on two given numbers
 * @param x {number} - First number in operation
 * @param y {number} - Second number in operation
 * @returns {number} - Result of operation
 * @memberOf BigWise
 */
const XOR = (x, y) => {
    let n1 = Math.max(x, y);
    let n2 = Math.min(x, y);
    let sum = 0;
    for (let n = 0; n <= Math.floor(Math.log2(n1)); n++) {
        sum +=
            // Basically OR but without check for double digit
            Math.pow(2, n) * ((
                Math.floor(n1 / Math.pow(2, n)) +
                Math.floor(n2 / Math.pow(2, n))
            ) % 2);
    }
    return sum;
};


//////////////////////////////////////////
//                                      //
//  -----====== CARD SYSTEM  =====----  //
//                                      //
//////////////////////////////////////////

/**
 * @namespace
 * @name CardSystem
 * @desc Contains helpers and classes for easier and efficient management of card decs
 */

/**
 * @enum
 * @desc Enumeration of playing cards
 * @memberOf CardSystem
 */
const Cards = {
    SA: 0,
    S2: 1,
    S3: 2,
    S4: 3,
    S5: 4,
    S6: 5,
    S7: 6,
    S8: 7,
    S9: 8,
    S10: 9,
    SJ: 10,
    SQ: 11,
    SK: 12,
    HA: 13,
    H2: 14,
    H3: 15,
    H4: 16,
    H5: 17,
    H6: 18,
    H7: 19,
    H8: 20,
    H9: 21,
    H10: 22,
    HJ: 23,
    HQ: 24,
    HK: 25,
    CA: 26,
    C2: 27,
    C3: 28,
    C4: 29,
    C5: 30,
    C6: 31,
    C7: 32,
    C8: 33,
    C9: 34,
    C10: 35,
    CJ: 36,
    CQ: 37,
    CK: 38,
    DA: 39,
    D2: 40,
    D3: 41,
    D4: 42,
    D5: 43,
    D6: 44,
    D7: 45,
    D8: 46,
    D9: 47,
    D10: 48,
    DJ: 49,
    DQ: 50,
    DK: 51
};

/**
 * A reference of each card in a 52 card deck.
 * @memberOf CardSystem
 * @type {string}
 */
const cardRef =
    "SA S2 S3 S4 S5 S6 S7 S8 S9 S10 SJ SQ SK" +
    "DA D2 D3 D4 D5 D6 D7 D8 D9 D10 DJ DQ DK" +
    "CA C2 C3 C4 C5 C6 C7 C8 C9 C10 CJ CQ CK" +
    "HA H2 H3 H4 H5 H6 H7 H8 H9 H10 HJ HQ HK";

/**
 @enum
 * @name DeckEnum
 * @desc Enumeration of cards
 * @constant
 * @memberOf CardSystem
 */
const DeckEnum = {
    /**
     * @member {number} - Main deck
     */
    MAIN: 0,
    /**
     * @member {number} - Discard pile
     */
    DISCARD: 1,
    /**
     * @member {number} - Player's deck
     */
    PLAYER: 2
};

/**
 * Returns an array of card numbers matching the provided regexp
 * @memberOf CardSystem
 * @function
 * @param expression {RegExp} - Regular Expression to match cards with {@link CardSystem.cardRef|cardRef}
 * @return {Array} - Array of card numbers
 */
const deckFromExpression = (expression) => {
    let deck = cardRef.match(expression);
    let nDeck = [];
    for (let c of deck) {
        nDeck.push(Cards[c]);
    }
    return nDeck;
};

/**
 * Checks if given card number is in given deckmask
 * @memberOf CardSystem
 * @param card {number} - Card number to find
 * @param deckMask {number} - Deckmask to check against
 * @return {boolean} - Is the card in the mask?
 */
const isCardInDeck = (card, deckMask) => {

    let cardMask = getCardMask(card);

    return (AND(cardMask, deckMask) === cardMask);
};

/**
 * Converts Card name or number to cardmask
 * @function
 * @memberOf CardSystem
 * @param ex {string|number} - The card name or number to convert
 * @return {number} - The cardmask value of the card.
 */
const getCardMask = (ex) => {
    let cardNr = 0;

    if (typeof (ex) === "string" && Cards.hasOwnProperty(ex)) {
        cardNr = Cards[ex];
    } else if (typeof (ex) === "number" && ex >= 0 && ex < 52) {
        cardNr = ex;
    } else {
        throw "Expression not accepted!";
    }

    if (cardNr >= CardManager.MAX_CARDS_IN_DECK()) throw "Max deck size reached!";

    return bigShift(1, cardNr);
};

/**
 * Makes an array of card numbers from given cardmask.
 * @function
 * @memberOf CardSystem
 * @param mask {number} - Cardmask to interpret
 * @return {Array} - Sorted array of card numbers
 */
const getCardArrayFromMask = (mask) => {
    let cards = [];

    for (let i = 0; i < 52; i++) {
        if(isCardInDeck(i, mask)) cards.push(i);
    }
    return cards;
};

/**
 * Creates a deckmask from expression, by converting card number array from {@link CardSystem.deckFromExpression|deckFromExpression}
 * @memberOf CardSystem
 * @function
 * @param ex {RegExp} - The expression used to create the deck
 * @return {number} - Deckmask created from numbered array
 */
const getDeckMaskFromExpression = (ex) => {

    let deck = deckFromExpression(ex);

    let deckMask = 0;
    /*
        Example:
        cards: 1, 3 & 4
        cardMasks: 2, 8, 16 => 10, 1000, 10000
        deckMask: 11010 => 26
     */
    for (let card of deck) {
        console.log("Current Mask: " + deckMask);
        deckMask = OR(deckMask, getCardMask(card));
    }
    return deckMask;
};

/**
 * Creates a deckmask from given array of card numbers
 * @memberOf CardSystem
 * @function
 * @param deck {Array} - Array of cards to convert to mask
 * @return {number} - Cardmask created from card array
 */
const getDeckMaskFromArray = (deck) => {
    let deckMask = 0;

    for(let card of deck) {
        deckMask = OR(deckMask, getCardMask(card));
    }

    return deckMask;
};

/**
 * Removes given cardMask from deckmask
 * @memberOf CardSystem
 * @function
 * @param cardMaskSource {number} - Cardmask to remove
 * @param deckMask {number} - Deck to remove from
 * @return {number} - New deckmask with cardmask removed
 */
const removeCardsFromMask = (cardMaskSource, deckMask) => {
    return cardMaskSource - AND(cardMaskSource, deckMask);
};

/**
 * Utility function to get integer between to numbers
 * @function
 * @param min {number} - The minimum value returned (inclusive)
 * @param max {number} - The maximum value returned (inclusive)
 * @return {number} - The randomly generated number.
 */
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @class
 * @desc Manager class to keep track of cards and decks
 * @memberOf RoyaleSubsystem
 */
class CardManager {
    /**
     * @constructor
     * @method
     */
    constructor(decksToUse = 1) {
        console.assert(decksToUse === 1, "Currently only supports 1 deck");
        console.assert(decksToUse <= Math.floor(CardManager.MAX_CARDS_IN_DECK() / 52),
            "Too many decks in manager");

        console.log("Using " + decksToUse + " deck(s)...");
        this.deck = [];

        for (let i = 0; i < 52*decksToUse; i++) {
            this.deck.push(i % 52);
        }

        this.deckMask = Math.round(Math.pow(2, 52*decksToUse) - 1);

        this.cardAmount = 52 * decksToUse;
        this.playerDeck = [];
        this.playerMask = 0;
        this.discardPile = [];
        this.discardMask = 0;
    }

    /**
     * Return max cards that can be in a deck at any given time.
     * @static
     * @method
     * @returns {number}
     */
    static MAX_CARDS_IN_DECK() {
        return Math.floor(Math.log2(Number.MAX_VALUE))
    };

    /**
     * @method
     * @desc Shuffles the main deck
     */
    shuffle() {
        let shuffleOrder = [];
        let positionSet = [];

        for(let i = 0; i < this.deck.length; i++) {
            positionSet.push(i);
        }

        while(positionSet.length > 0) {

            let index = getRandomInt(0, positionSet.length-1);
            shuffleOrder.push(positionSet[index]);
            positionSet.splice(index, 1);

        }

        let newDeckOrder = [];

        for(let i = 0; i < shuffleOrder.length; i++) {
            newDeckOrder[shuffleOrder[i]] = this.deck[i];
        }

        console.log("ShuffleOrder:");
        console.log(shuffleOrder);
        this.deck = newDeckOrder;
    }


    /**
     * @method
     * @desc Deals an amount of cards to all players
     * @param amount {number} - Amount of cards to deal players
     * @return {Array} - Cards dealt in array (index 0) and mask form (index 1)
     */
    deal(amount) {

        // Dealing always happens from top => index 0

        // Example, let's deal SA, S2 and S4, which has value 0, 1 & 3
        let cardsToDeal = this.deck.splice(0,amount);     // Array -> [0, 1, 3]
        let dealMask = getDeckMaskFromArray(cardsToDeal); // 0b1011 = 11

        this.playerdeck = this.playerDeck.concat(cardsToDeal); // Add the cards to player deck
        this.playerMask = OR(this.playerMask, dealMask);       // Fix players card mask

        return [cardsToDeal, dealMask];
    }


    /**
     * @deprecated Only one player to deal cards.
     * @method
     * @desc Deals an amount of cards to specified player index
     * @param player {number} - Player index to deal cards
     * @param amount {number} - Amount of cards to deal player
     */
    dealPlayer(player, amount) {
        console.log("Deprecated!");
    }

    /**
     * @method
     * @desc Try to move cardMask from source deck and put them in target deck
     * @param cardMask {number} - Cards to move in bitmask form
     * @param source {DeckEnum} - Deck to move cards from
     * @param target {DeckEnum} - Deck to move cards to
     * @param toBottom {boolean} - Should the cards go on the bottom of target deck?
     */
    moveCards(cardMask, source, target, toBottom = true) {

        // Array of numbered cards
        let cards = getCardArrayFromMask(cardMask);


        // Determine source and remove cards from both deck and mask
        if(source === DeckEnum.MAIN) {
            for(let card of cards) {
                let index = this.deck.indexOf(card);
                if(index !== -1)
                    this.deck.splice(index, 1);
            }
            this.deckMask = removeCardsFromMask(this.deckMask, cardMask);
        } else if(source === DeckEnum.PLAYER) {
            for(let card of cards) {
                let index = this.playerDeck.indexOf(card);
                if(index !== -1)
                    this.playerDeck.splice(index, 1);
            }
            this.playerMask = removeCardsFromMask(this.playerMask, cardMask);
        } else if(source === DeckEnum.DISCARD) {
            for(let card of cards) {
                let index = this.discardPile.indexOf(card);
                if(index !== -1)
                    this.discardPile.splice(index, 1);
            }
            this.discardMask = removeCardsFromMask(this.discardMask, cardMask);
        } else {
            throw "Incorrect enumeration used!";
        }

        // Determine target and add cards to both deck and mask
        if(target === DeckEnum.MAIN) {
            if(toBottom) {
                this.deck = this.deck.concat(cards);
            } else {
                this.deck = cards.concat(this.deck);
            }
            this.deckMask = OR(this.deckMask, cardMask);
        } else if(target === DeckEnum.PLAYER) {
            if(toBottom) {
                this.playerDeck = this.playerDeck.concat(cards);
            } else {
                this.playerDeck = cards.concat(this.playerDeck);
            }
            this.playerMask = OR(this.playerMask, cardMask);
        } else if(target === DeckEnum.DISCARD) {
            if(toBottom) {
                this.discardPile = this.discardPile.concat(cards);
            } else {
                this.discardPile = cards.concat(this.discardPile);
            }
            this.discardMask = OR(this.discardMask, cardMask);
        } else {
            throw "Incorrect enumeration used!";
        }
    }

    /**
     * @method
     * @desc Discard cards from source deck
     * @param cardMask {number} - Cards to put on discard pile
     * @param source {DeckEnum} - Deck to discard from
     */
    discard(cardMask, source) {
        this.moveCards(cardMask, source, DeckEnum.DISCARD, false);
    }

}