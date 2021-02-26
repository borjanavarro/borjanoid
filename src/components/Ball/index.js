import React, { useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './styles.scss';

function Ball({ clock, top, setTop, left, setLeft, vector }) {
    const ball = useRef();
    const boardData = useSelector(state => state.board);
    const ballData = useSelector(state => state.ball);
    let { topMinPos, topMaxPos, leftMinPos, leftMaxPos } = boardData;
    topMaxPos = topMaxPos - ballData.size;
    leftMaxPos = leftMaxPos - ballData.size;

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
            setTop(topMinPos);
            vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        } else if ( ballTop > topMaxPos ) {
            // gameLost();
        } else if ( ballLeft < leftMinPos ) {
            setLeft(leftMinPos);
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        } else if ( ballLeft > leftMaxPos ) {
            setLeft(leftMaxPos);
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        }
    }, [topMinPos, topMaxPos, leftMinPos, leftMaxPos, setTop,setLeft, vector])

    useEffect(() => {
        const prevTop = parseInt(ball.current.style.top, 10); 
        const prevLeft = parseInt(ball.current.style.left, 10);

        if (isThereCollision(prevTop, prevLeft)) {
            collision(prevTop, prevLeft);
        } else {
            setTop(prevTop + vector.current.top * ballData.velocity);
            setLeft(prevLeft + vector.current.left * ballData.velocity);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clock]);

    return (
        <div id="ball" ref={ball} style={{
            top: top,
            left: left,
            width: ballData.size,
            height: ballData.size,
            borderRadius: ballData.size
        }}></div>
    );
}

export default Ball;
