import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

import './styles.scss';

function Player({ clock, vector, keyDown, ballRef, pause }) {
    const boardData = useSelector(state => state.board);
    const ballData = useSelector(state => state.ball);
    const playerData = useSelector(state => state.player);
    let { leftMinPos, leftMaxPos, topMaxPos } = boardData;
    leftMaxPos = leftMaxPos - playerData.width;
    const [position, setPosition] = useState(leftMaxPos / 2);
    const player = useRef();

    useEffect( () => {
        if ( keyDown ) {
            const oldPosition = parseInt(player.current.style.left, 10);      

            if ( keyDown === 'ArrowLeft' ) {
                if ( oldPosition > leftMinPos ) {
                    setPosition( oldPosition - playerData.velocity );
                } else {
                    setPosition( leftMinPos );
                }
            } else if ( keyDown === 'ArrowRight' ) {
                if ( oldPosition < leftMaxPos ) {
                    setPosition( oldPosition + playerData.velocity );
                } else {
                    setPosition( leftMaxPos );
                }
            }
        }
    }, [keyDown, playerData.velocity, leftMaxPos, leftMinPos ]);

    const collision = useCallback(() => {
        const ballTop = ballRef.current.top;
        const ballLeft = ballRef.current.left;

        if ( ballTop + ballData.size > topMaxPos ) {
            const playerLeft = parseInt(player.current.style.left, 10);

            if ( ballLeft >= playerLeft - ballData.size && ballLeft <= playerLeft + playerData.width ) {
                ballRef.current.top = topMaxPos - ballData.size;
                vector.current = {'top': -vector.current.top, 'left': vector.current.left};
            } else {
                // gameLost();
            }
        }
    }, [ topMaxPos, vector, ballData.size, playerData.width, ballRef])
// }, [ballTop, ballLeft, setBallTop, topMaxPos, vector, ballData.size, playerData.width])

    useEffect(() => {
        collision();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clock])

    return (
        <div id="player" ref={player} style={{
            bottom: - playerData.height,
            left: position
            }}>

        </div>
    );
}

export default Player;
