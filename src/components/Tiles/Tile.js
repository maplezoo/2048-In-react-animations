import React, { useEffect, useState } from "react";
import "./Tile.css"

function Tile({ value }) {
    return (
        <div className={`tile tile-${value}`}>
            {value}
        </div>
    )
}

export { Tile };