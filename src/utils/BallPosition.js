import { useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { generateRandomVector } from '../utils/functions';
import useFrameLoop from '../utils/FrameLoop';

const useBallPosition = ( ballRef ) => {
    const vector = useRef( generateRandomVector() );
    const boardData = useSelector(state => state.board);
    const ballData = useSelector(state => state.ball);
    let { topMinPos, topMaxPos, leftMinPos, leftMaxPos } = boardData;
    topMaxPos = topMaxPos - ballData.size;
    leftMaxPos = leftMaxPos - ballData.size;
    const [ballTop, setBallTop] = useState(boardData.topMaxPos - ballData.size);
    const [ballLeft, setBallLeft] = useState((boardData.leftMaxPos - boardData.leftMinPos) / 2 - ballData.size);
    // debug
    const isTherePlayer = _ => true;

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
            setBallTop(topMinPos);
            vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        } else if ( ballTop > topMaxPos ) {
            if ( isTherePlayer() ) {
                setBallTop(topMaxPos);
                vector.current = {'top': -vector.current.top, 'left': vector.current.left};
            } else {
                // gameLost();
            }
        } else if ( ballLeft < leftMinPos ) {
            setBallLeft(leftMinPos);
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        } else if ( ballLeft > leftMaxPos ) {
            setBallLeft(leftMaxPos);
            vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        }
    }, [topMinPos, topMaxPos, leftMinPos, leftMaxPos, setBallTop,setBallLeft])

    useFrameLoop(() => {
        // if ( !pauseRef.current ) {
            if ( ballRef !== undefined ) {
                const top = parseInt(ballRef.current.style.top, 10); 
                const left = parseInt(ballRef.current.style.left, 10);

                if (isThereCollision(top, left)) {
                    collision(top, left);
                } else {
                    setBallTop(top + vector.current.top * ballData.velocity);
                    setBallLeft(left + vector.current.left * ballData.velocity);
                }
            }
        // }
    }, [ ballTop, ballLeft, setBallTop, setBallLeft, ballData.velocity, collision, isThereCollision/*, pauseRef */])

    return [ ballTop, ballLeft ];
}

export default useBallPosition;
