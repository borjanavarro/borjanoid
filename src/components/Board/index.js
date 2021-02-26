import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import Wall from '../Wall/index';
import Ball from '../Ball/index';
import Player from '../Player/index';
import useKeyboard from '../../utils/Keyboard';
import useFrameLoop from '../../utils/FrameLoop';
import { generateRandomVector } from '../../utils/functions';

import './styles.scss';

function Board() {
    const boardData = useSelector(state => state.board);
    const ballData = useSelector(state => state.ball);
    const [clock, setClock] = useState(0);
    const [ballTop, setBallTop] = useState(boardData.topMaxPos - ballData.size);
    const [ballLeft, setBallLeft] = useState((boardData.leftMaxPos - boardData.leftMinPos) / 2 - ballData.size);
    const vector = useRef( generateRandomVector() );
    const pauseRef = useRef(true);
    const keyDown = useKeyboard();
    const { topMinPos, topMaxPos, leftMinPos, leftMaxPos } = boardData;

    useEffect(() => {
        if ( keyDown === 'Space' ) {
            pauseRef.current = true;
        } else if ( keyDown === 'Esc' ) {
            pauseRef.current = pauseRef.current ? false: true;
        }
    }, [keyDown])

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
                    {/* <Wall /> */}
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
                />
            </div>
        </div>
    )
}

export default Board;
