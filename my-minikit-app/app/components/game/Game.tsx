// @ts-nocheck
import React, { useEffect, useState } from "react";
import { StatusBar } from "./StatusBar/StatusBar";
import { Map } from "./Map/Map";
import { Card, CardParams, CellParams } from "./Card/Card";
import { getField, getUserCards, getUserPoints, placeCard } from "@/app/utils/api";
import { useViewProfile } from "@coinbase/onchainkit/minikit";
import { useAccount, useConnect, useEnsName, useReadContract, useT, useWriteContract } from "wagmi";
import { wagmiContractConfig } from "@/app/wagmi/contracts";

export function Game(props) {

    useEffect(() => {

        new Promise(async () => {
            const points = await getUserPoints();
            setPoints(points);

            const userCards = await getUserCards(); 
            setUserCards(userCards);

            const field = await getField();
            setField(field);
        })
    }, [])

    const [points, setPoints] = useState(42);

    const [field, setField] = useState<(CellParams | null)[][]>([]);
    const putCardOnField = (x: number, y: number, card: CardParams) => {
        if (field[x][y] !== null) {
            throw new Error('This cell is already taken!')
        }

        placeCard(x, y, card).then(() => {

        })

        field[x][y] = card;
        setField(field);

    }

    const [userCards, setUserCards] = useState<CardParams[]>([]);

    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const onSelectCard = (idx) => { setSelectedCardIndex(idx) }
    const unselectCard = () => setSelectedCardIndex(-1)

    const onClickMapCell = (x, y) => {
        if (selectedCardIndex !== -1) {
            setUserCards(userCards.filter(i => i !== userCards[selectedCardIndex]))
            putCardOnField(x, y, userCards[selectedCardIndex]);
            unselectCard();
        }
    }

    // const profile = useViewProfile();
    // console.log(profile());

    // const profile = useAccount();
    // console.log(profile.address, profile.chain, profile.chainId, profile.addresses);

    // profile.chain.blockExplorers
    // useWriteContract({
    // mutation: 
    // })

    const { connectors, connect } = useConnect()
    // console.log(connectors, connect);

    const { address } = useAccount()
    const { data: ensName } = useEnsName({ address })

    console.log(address, ensName);

    const { isPending, data, isSuccess} = useReadContract({
        ...wagmiContractConfig,
        functionName: 'balanceOf',
        args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    })

    useEffect(() => {
        console.log(data)
    }, [isPending, isSuccess, data, address])


    return <>
        <div className="w-full h-[100vh] flex flex-col justify-between">

            <div className="w-full my-2">
                <StatusBar points={points} />
            </div>

            <div className="w-full h-auto grow max-h-[80vh]">
                <Map field={field} w={40} h={50} onClickEmptyCell={onClickMapCell} />
            </div>

            <div className="w-full h-auto">
                <h2 className="text-4">Choose a card to pick up:</h2>
                <div className="p-2">
                    <div className="cards flex gap-2">
                        {userCards.map((c, i) => <Card key={i} {...c} selected={i === selectedCardIndex} onSelect={() => onSelectCard(i)} />)}
                    </div>
                </div>
            </div>
        </div>
    </>
}