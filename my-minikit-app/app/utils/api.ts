// @ts-nocheck

import { CardParams } from "../components/game/Card/Card";
import { generateCard, generateField } from "./generateField";

export const getUserPoints = async () => {

    return 42;
}

export const getUserCards = async () => {

    return [generateCard(), generateCard(), generateCard()];
}

export const getField = async () => {

    return generateField(40, 50, 0.2);
}

export const placeCard = async (x, y, card: CardParams) => {

    return null;
}

export const getActions = async () => {
    return []
}