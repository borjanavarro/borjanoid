import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Wall from '../Wall/index';
import Ball from '../Ball/index';
import Player from '../Player/index';
import useFrameLoop from '../../utils/FrameLoop';
import { generateRandomVector } from '../../utils/functions';

import './styles.scss';

function Board({ keyDown }) {
    const boardData = useSelector(state => state.board);
    const ballData = useSelector(state => state.ball);
    const [clock, setClock] = useState(0);
    const [ballTop, setBallTop] = useState(boardData.topMaxPos - ballData.size);
    const [ballLeft, setBallLeft] = useState((boardData.leftMaxPos - boardData.leftMinPos) / 2 - ballData.size);
    const vector = useRef( generateRandomVector() );
    
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
                        ballTop={ballTop} 
                        setBallTop={setBallTop} 
                        ballLeft={ballLeft} 
                        setBallLeft={setBallLeft}
                        vector={vector}
                    />
                    <Ball 
                        clock={clock}
                        top={ballTop} 
                        setTop={setBallTop} 
                        left={ballLeft} 
                        setLeft={setBallLeft} 
                        vector={vector}
                    />
                </div>
                <Player 
                    clock={clock}
                    ballTop={ballTop}
                    setBallTop={setBallTop}
                    ballLeft={ballLeft}
                    setBallLeft={setBallLeft}
                    vector={vector}
                    keyDown={keyDown}
                />
            </div>
        </div>
    )
}

export default Board;
