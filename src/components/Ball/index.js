import React, {useRef, useEffect, useCallback} from 'react';

import './styles.scss';

function Ball(clock) {
    const vector = useRef({'top': 1/Math.sqrt(2), 'left': 1/Math.sqrt(2)});
    const ball = useRef(null);

    let velocity = 20;
    const lateralMargin = 20;
    const ballSize = 50;
    const topMinPos = lateralMargin;
    const leftMinPos = lateralMargin;
    const h = window.innerHeight;
    const w = window.innerWidth;
    const topMaxPos = h - ballSize - lateralMargin;
    const leftMaxPos = w - ballSize - lateralMargin;

    const isThereCollision = useCallback((ballTop, ballLeft) => {
        if ( ballTop < topMinPos || ballTop > topMaxPos || ballLeft < leftMinPos || ballLeft > leftMaxPos) {
            return true;
        }

        return false;
    }, [topMinPos, topMaxPos, leftMinPos, leftMaxPos]);

    const collision = useCallback((ballTop, ballLeft) => {
        if ( ballTop < topMinPos ) {
            ball.current.style.top = topMinPos + 'px';
            vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        } else if ( ballTop > topMaxPos ) {
            ball.current.style.top = topMaxPos + 'px';
            vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        } else if ( ballLeft < leftMinPos ) {
            ball.current.style.left = leftMinPos + 'px';
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        } else if ( ballLeft > leftMaxPos ) {
            ball.current.style.left = leftMaxPos + 'px';
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        }
    }, [topMinPos, topMaxPos, leftMinPos, leftMaxPos])

    useEffect(() => {
        const ballTop = parseInt(ball.current.style.top, 10);
        const ballLeft = parseInt(ball.current.style.left, 10);

        if (isThereCollision(ballTop, ballLeft)) {
            collision(ballTop, ballLeft);
        } else {
            ball.current.style.top = parseInt(ball.current.style.top, 10) + vector.current.top * velocity + 'px';
            ball.current.style.left = parseInt(ball.current.style.left, 10) + vector.current.left * velocity + 'px';
        }
    }, [clock, isThereCollision, collision, vector.current.top, vector.current.left, velocity]);

    return (
        <div id="ball" ref={ball} style={{"top": lateralMargin, "left": lateralMargin}}></div>
    );
}

export default Ball;