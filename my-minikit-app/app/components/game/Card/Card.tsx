import { terrainColors, TerrainType } from "@/app/utils/terrain";
import React from "react";

export type CellParams = { n: TerrainType, e: TerrainType, w: TerrainType, s: TerrainType }
export type CardParams = CellParams;

export function Card(props: CellParams & {selected?: boolean, onSelect?: () => void}) {
    const { n, e, w, s, selected, onSelect } = props;
    const getTerrainStyle = (terrain: TerrainType) => ({
        style: {
            backgroundColor: terrainColors[terrain]
        }
    })

    return <div className="w-[50px] h-[50px] border overflow-hidden cursor-pointer hover:shadow-sm" style={ selected ? {outline: ' solid 5px #aaaa00'} : {}} onClick={onSelect ? onSelect : () => {}}>
        <div className=" mt-[-77px] ml-[-77px] w-[200px] h-[200px]" style={{ transform: 'rotate(-45deg)', transformOrigin: 'center' }}>
            <div className="flex w-[200px] h-[100px]">
                <div className="west w-[100px] h-[100px]" {...getTerrainStyle(w)}></div>
                <div className="north w-[100px] h-[100px]" {...getTerrainStyle(n)}></div>
            </div>

            <div className="flex w-[200px] h-[100px]">
                <div className="south w-[100px] h-[100px] " {...getTerrainStyle(s)}></div>
                <div className="east w-[100px] h-[100px]" {...getTerrainStyle(e)}></div>
            </div>
        </div>
    </div>
}

// south, east 45 deg to the left