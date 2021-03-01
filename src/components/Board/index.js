import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Wall from '../Wall/index';
import Ball from '../Ball/index';
import Player from '../Player/index';
import useFrameLoop from '../../utils/FrameLoop';
import { generateRandomVector } from '../../utils/functions';

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

    useFrameLoop((time) => {
        setClock(time);
    });

    return (
        <div className="center-board">
            <div className="board-container" style={{
                width: leftMaxPos - leftMinPos,
                height: topMaxPos - topMinPos
            }}>
                <div id="board">
                    <Wall 
                        clock={clock} 
                        ballRef={ballRef}
                        vector={vector}
                        setEndGame={setEndGame}
                    />
                    <Ball 
                        clock={clock}
                        ballRef={ballRef}
                        vector={vector}
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
        </div>
    )
}

export default Board;
