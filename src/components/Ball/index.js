import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import './styles.scss';

function Ball({ clock, boardData, ballData }) {
    const [position, setPosition] = useState({top: boardData.topMinPos, left: boardData.leftMinPos})
    const vector = useRef({'top': 1/Math.sqrt(2), 'left': 1/Math.sqrt(2)});
    const ball = useRef(null);
    const { topMinPos, topMaxPos, leftMinPos, leftMaxPos } = boardData;

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
            setPosition({top: topMinPos, left: ballLeft});
            vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        } else if ( ballTop > topMaxPos ) {
                setPosition({top: topMaxPos, left: ballLeft});
                vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        } else if ( ballLeft < leftMinPos ) {
            setPosition({top: ballTop, left: leftMinPos});
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        } else if ( ballLeft > leftMaxPos ) {
            setPosition({top: ballTop, left: leftMaxPos});
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        }
    }, [topMinPos, topMaxPos, leftMinPos, leftMaxPos])

    useEffect(() => {
        const ballTop = parseInt(ball.current.style.top, 10);
        const ballLeft = parseInt(ball.current.style.left, 10);

        if (isThereCollision(ballTop, ballLeft)) {
            collision(ballTop, ballLeft);
        } else {
            setPosition({
                top: ballTop + vector.current.top * ballData.velocity + 'px',
                left: ballLeft + vector.current.left * ballData.velocity + 'px'
            });
        }
    }, [clock, isThereCollision, collision, setPosition, vector.current.top, vector.current.left, ballData.velocity]);

    return (
        <div id="ball" ref={ball} style={{
            top: position.top,
            left: position.left,
            width: ballData.size,
            height: ballData.size,
            borderRadius: ballData.size
        }}></div>
    );
}

const mapStateToProps = state => {
    return {
        boardData : state.board, 
        ballData: state.ball
    }
}

export default connect(mapStateToProps)(Ball);
