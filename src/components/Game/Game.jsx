import React, { useEffect, useState } from "react";
import './Game.css';
import Board from '../Board/Board'
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } from "./Constants";
import deepClone from "clonedeep";
import { useEvent } from "../util";
import Header from "./Header/Header";

function Game() {
    const N = 4;
    const [nodes, setNodes] = useState(0);
    const [score, setScore] = useState(0);
    const [bestScore, setBest] = useState(0);
    const [grid, setGrid] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);

    let tempGrid;
    let moved;

    const init = () => {
        tempGrid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        addNumber();
        addNumber();
        setGrid(tempGrid);
        setNodes(2);
        setScore(0);
    }

    const addNumber = () => {
        let row = Math.floor(Math.random() * 4);
        let col = Math.floor(Math.random() * 4);

        if (tempGrid[row][col] === 0) {
            tempGrid[row][col] = Math.random() > 0.5 && score > 50 ? 4 : 2;
            setNodes(prev => prev + 1);
        } else {
            addNumber();
        }
    }

    const handleKeyDown = (event) => {
        tempGrid = deepClone(grid);
        moved = false;
        switch (event.keyCode) {
            case LEFT_ARROW:
                merge();
                break;
            case RIGHT_ARROW:
                rotate(180);
                merge();
                rotate(180);
                break;
            case UP_ARROW:
                rotate(270);
                merge();
                rotate(90);
                break;
            case DOWN_ARROW:
                rotate(90);
                merge();
                rotate(270);
                break;

            default:
                break;
        }

        if (moved) {
            addNumber(tempGrid)
            setGrid(tempGrid);
        }

        if (checkGameOver()) {
            console.log("game over!");
        }
    }

    const rotate = (deg) => {
        if (deg == 0 || deg == 360) return;

        // mirror of the top left and bottom right
        if (deg == 90) {
            for (let i = 0; i < N; i++) {
                for (let j = i; j < N; j++) {
                    let temp = tempGrid[i][j];
                    tempGrid[i][j] = tempGrid[j][i];
                    tempGrid[j][i] = temp;
                }
            }
        }

        if (deg == 270) {
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N - i; j++) {
                    let temp = tempGrid[i][j];
                    tempGrid[i][j] = tempGrid[N - j - 1][N - i - 1];
                    tempGrid[N - j - 1][N - i - 1] = temp;
                }
            }
        }

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N / 2; j++) {
                let temp = tempGrid[i][j];

                tempGrid[i][j] = tempGrid[i][N - j - 1];
                tempGrid[i][N - j - 1] = temp;
            }
        }
    }

    const merge = () => {
        for (let i = 0; i < 4; i++) {
            let p = 0;
            for (let j = 1; j < 4; j++) {
                if (tempGrid[i][j] == 0) continue;

                if (tempGrid[i][p] == 0) {
                    tempGrid[i][p] = tempGrid[i][j];
                    moved = true;

                } else if (tempGrid[i][p] != tempGrid[i][j]) {
                    p++;
                    tempGrid[i][p] = tempGrid[i][j];
                } else {
                    tempGrid[i][p] += tempGrid[i][j];
                    const gained = tempGrid[i][j] * 2;

                    setNodes(prev => prev - 1);
                    setScore((prev) => prev + gained);
                    setBest((prev) => Math.max(score + gained, prev));
                    moved = true;
                }
            }

            while (p < 3) tempGrid[i][++p] = 0;
        }
    }

    const checkGameOver = () => {
        if (nodes < 16) return false;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                let cur = grid[i][j];
                if (cur == grid[i][j + 1]) return false;
                if (i < 3 && cur == grid[i + 1][j]) return false;
            }
        }
        return true;
    }

    useEffect(() => {
        init();
    }, []);

    useEvent('keydown', handleKeyDown);

    let blocks = 0;

    return (
        <div className='game-container'>
            <Header score={score} bestScore={bestScore} reset={init} />
            <Board grid={grid} />
        </div>
    );
}

export default Game;
