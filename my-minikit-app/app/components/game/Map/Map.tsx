import React from "react";
import { Card, CellParams } from "../Card/Card";
export function Map({w, h, field, onClickEmptyCell}) {

    const getCell = (cell: null | CellParams,x : number, y: number ) => {
        return cell === null ? 
            <div className="w-[50px] h-[50px] bg-gray-300 hover:bg-[#cc0] cursor-pointer" onClick={() => onClickEmptyCell(x, y)}></div> :
            <Card {...cell} selected={false} />
    }

    return <div className="grow w-full h-full overflow-scroll">
        <table cellSpacing={0} cellPadding={0}>
            <tbody>
                {
                    field.map((row, x) => 
                        <tr>
                            {row.map((cell, y) => <td>{getCell(cell, x, y)}</td>)}
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
}