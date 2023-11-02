import React, { useEffect, useState } from "react";
import "./Tile.css"

function Tile({ value }) {
    let displayVal = (value === 0) ? ' ' : value;

    return (
        <div className={`tile tile-${displayVal}`}>
            {displayVal}
        </div>
    )
}

export { Tile };