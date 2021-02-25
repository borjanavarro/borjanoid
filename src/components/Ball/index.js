import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { useFrameLoop } from '../../utils/FrameLoop'
import { generateRandomVector } from '../../utils/functions'

import './styles.scss';

function Ball({ boardData, ballData, keyDown, setKeyDown, pauseRef }) {
    const [position, setPosition] = useState({
        top: boardData.topMaxPos - ballData.size,
        left: (boardData.leftMaxPos - boardData.leftMinPos) / 2 - ballData.size
    })
    const vector = useRef( generateRandomVector() );
    const ball = useRef(null);
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

    useFrameLoop(() => {
        if ( !pauseRef.current ) {
            const ballTop = parseInt(ball.current.style.top, 10);
            const ballLeft = parseInt(ball.current.style.left, 10);

            if (isThereCollision(ballTop, ballLeft)) {
                collision(ballTop, ballLeft);
            } else {
                setPosition({
                    top: ballTop + vector.current.top * ballData.velocity,
                    left: ballLeft + vector.current.left * ballData.velocity,
                });
            }
        }
    })

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
