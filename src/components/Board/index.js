import React, { useEffect, useRef } from 'react';
// import Wall from '../Wall/index';
import Ball from '../Ball/index';
import Player from '../Player/index';
import useKeyboard from '../../utils/Keyboard';
// import useBallPosition from '../../utils/BallPosition';
import { useSelector } from 'react-redux';

import './styles.scss';

function Board() {
    const pauseRef = useRef(true);
    const ballRef = useRef();
    const keyDown = useKeyboard();
    const boardData = useSelector(state => state.board);
    const { topMinPos, topMaxPos, leftMinPos, leftMaxPos } = boardData;
    // const [ballTop, ballLeft] = useBallPosition(ballRef);

    useEffect(() => {
        if ( keyDown === 'Space' ) {
            pauseRef.current = true;
        } else if ( keyDown === 'Esc' ) {
            pauseRef.current = pauseRef.current ? false: true;
        }
    }, [keyDown])

    return (
        <div className="center-board">
            <div className="board-container" style={{
                width: leftMaxPos - leftMinPos,
                height: topMaxPos - topMinPos
            }}>
                <div id="board">
                    {/* <Wall /> */}
                    <Ball ballRef={ballRef} pauseRef={pauseRef} />
                </div>
                <Player pauseRef={pauseRef} />
            </div>
        </div>
    )
}

export default Board;
