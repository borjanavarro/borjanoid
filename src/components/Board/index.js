import React, { useEffect, useRef } from 'react';
// import Wall from '../Wall/index';
import Ball from '../Ball/index';
import Player from '../Player/index';
import useKeyboard from '../../utils/Keyboard';
// import useBallPosition from '../../utils/BallPosition';

import './styles.scss';

function Board() {
    const pauseRef = useRef(true);
    const ballRef = useRef();
    const keyDown = useKeyboard();
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
                width: 400,
                height: 600
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
