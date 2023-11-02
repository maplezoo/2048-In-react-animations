import React, { useState } from "react";
import { Tile } from "../Tiles/Tile";
import "./Board.css";

function Board({ grid }) {
    return (
        <div className="board">
            {grid.map((row, idx) => {
                return (
                    <div className="board-row" key={idx}>
                        {row.map((digit, i) => {
                            return <Tile value={digit} key={i} />
                        })}
                    </div>
                );
            })}
        </div>
    );

}

export default Board;
