import React, { useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './styles.scss';

function Ball({ clock, ballRef, vector, points, setEndGame }) {
    const elem = useRef();
    const boardData = useSelector(state => state.board);
    const ballData = useSelector(state => state.ball);
    let { topMinPos, topMaxPos, leftMinPos, leftMaxPos } = boardData;
    topMaxPos = topMaxPos - ballData.size;
    leftMaxPos = leftMaxPos - ballData.size;

    const gameLost = useCallback(() => {
        setTimeout(() => {
            setEndGame({message: 'You lose', submessage: 'You scored ' + points + ' points'});
        }, 500);
    }, [setEndGame, points])

    const isThereCollision = useCallback((ballTop, ballLeft) => {
        if ( ballTop < topMinPos
            || ballTop > topMaxPos
            || ballLeft < leftMinPos
            || ballLeft > leftMaxPos
        ) {
            return true;
        }

        return false;
    }, [topMinPos, topMaxPos, leftMinPos, leftMaxPos]);

    const collision = useCallback((ballTop, ballLeft) => {
        if ( ballTop < topMinPos ) {
            ballRef.current.top = topMinPos;
            vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        } else if ( ballTop > topMaxPos ) {
            gameLost();
        } else if ( ballLeft < leftMinPos ) {
            ballRef.current.left = leftMinPos;
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        } else if ( ballLeft > leftMaxPos ) {
            ballRef.current.left = leftMaxPos;
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        }
    }, [topMinPos, topMaxPos, leftMinPos, leftMaxPos, vector, ballRef, gameLost])

    useEffect(() => {
        const prevTop = parseInt(elem.current.style.top, 10); 
        const prevLeft = parseInt(elem.current.style.left, 10);

        if (isThereCollision(prevTop, prevLeft)) {
            collision(prevTop, prevLeft);
        } else {
            ballRef.current.top = prevTop + vector.current.top * ballData.velocity;
            ballRef.current.left = prevLeft + vector.current.left * ballData.velocity
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clock]);

    return (
        <div id="ball" ref={elem} style={{
            top: ballRef.current.top,
            left: ballRef.current.left,
            width: ballData.size,
            height: ballData.size,
            borderRadius: ballData.size
        }}></div>
    );
}

export default Ball;
