import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Wall from '../Wall/index';
import Ball from '../Ball/index';
import Player from '../Player/index';
import useFrameLoop from '../../utils/FrameLoop';
import { generateRandomVector } from '../../utils/functions';
import { LATERAL_COLUMNS_WIDTH } from '../../utils/constants';

import './styles.scss';

function Board({ keyDown, setEndGame }) {
    const boardData = useSelector(state => state.board);
    const ballData = useSelector(state => state.ball);
    const [clock, setClock] = useState(0);
    const vector = useRef( generateRandomVector() );
    const ballRef = useRef({
        top: boardData.topMaxPos - ballData.size,
        left: (boardData.leftMaxPos - boardData.leftMinPos) / 2 - ballData.size
    });
    const { topMinPos, topMaxPos, leftMinPos, leftMaxPos } = boardData;
    const [counter, setCounter] = useState(0);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        let interval;

        const main = () => {
            interval = setInterval(() => {
                setCounter(counter + 1);
            }, 1000)
        };

        main();

        return () => clearInterval(interval);
    }, [counter])

    useFrameLoop((time) => {
        setClock(time);
    });

    return (
        <div className="screen-container">
            <div className="info-container" style={{ width: LATERAL_COLUMNS_WIDTH }}>
                <h1>Arkanoid</h1>
                <p>Score: {points}</p>
                <p>Time: {counter} s</p>
                <p>press Esc to pause</p>
            </div>
            <div className="board-container" style={{
                width: leftMaxPos - leftMinPos,
                height: topMaxPos - topMinPos
            }}>
                <div id="board">
                    <Wall 
                        clock={clock} 
                        ballRef={ballRef}
                        vector={vector}
                        points={points}
                        setPoints={setPoints}
                        setEndGame={setEndGame}
                    />
                    <Ball 
                        clock={clock}
                        ballRef={ballRef}
                        vector={vector}
                        points={points}
                        setEndGame={setEndGame}
                    />
                </div>
                <Player 
                    clock={clock}
                    ballRef={ballRef}
                    vector={vector}
                    keyDown={keyDown}
                />
            </div>
            <div className="info-container" style={{ width: LATERAL_COLUMNS_WIDTH }}></div>
        </div>
    )
}

export default Board;
