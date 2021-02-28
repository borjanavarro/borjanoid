import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { black } from '../../utils/constants';

import './styles.scss';

function Brick({clock, brickTop, brickLeft, ballRef, vector, collisionDetected, setCollisionDetected }) {
    const [destroyed, setDestroyed] = useState(false);
    const brickRef = useRef();
    const brickData = useSelector(state => state.brick);
    const ballData = useSelector(state => state.ball);
    const topMinPos = brickTop;
    const topMaxPos = brickTop + brickData.height;
    const leftMinPos = brickLeft;
    const leftMaxPos = brickLeft + brickData.width;

    const ballTopLeftisCollision = useCallback(() => {
        const prevBallTop = ballRef.current.top;
        const prevBallLeft = ballRef.current.left;

        if ( prevBallTop < topMaxPos && prevBallTop > topMinPos && prevBallLeft > leftMinPos && prevBallLeft < leftMaxPos ) {
            const topDist = topMaxPos - prevBallTop;
            const leftDist =  leftMaxPos - prevBallLeft;
            
            if ( topDist > leftDist ) {
                // colision por la derecha del ladrillo
                ballRef.current.left = leftMaxPos;
                vector.current = {'top': vector.current.top, 'left': -vector.current.left};
            } else {
                // colision por la inferior del ladrillo
                ballRef.current.top = topMaxPos;
                vector.current = {'top': -vector.current.top, 'left': vector.current.left};
            }
            
            return true;
        }

        return false;
    }, [leftMaxPos, leftMinPos, topMaxPos, topMinPos, vector, ballRef]);

    const ballTopRightisCollision = useCallback(() => {
        const prevBallTop = ballRef.current.top;
        const prevBallRight = ballRef.current.left + ballData.size;

        if ( prevBallTop < topMaxPos && prevBallTop > topMinPos && prevBallRight > leftMinPos && prevBallRight < leftMaxPos ) {
            const topDist = topMaxPos - prevBallTop;
            const rightDist = prevBallRight - topMinPos;
            
            if ( topDist > rightDist ) {
                // colision por la izquierda del ladrillo
                ballRef.current.left = leftMaxPos;
                vector.current = {'top': vector.current.top, 'left': -vector.current.left};
            } else {
                // colision por la inferior del ladrillo
                ballRef.current.top = topMaxPos;
                vector.current = {'top': -vector.current.top, 'left': vector.current.left};
            }
            
            return true;
        }

        return false;
    }, [ballData.size, leftMaxPos, leftMinPos, topMaxPos, topMinPos, vector, ballRef]);

    const ballBottomLeftisCollision = useCallback(() => {
        const prevBallBottom = ballRef.current.top + ballData.size;
        const prevBallLeft = ballRef.current.left;

        if ( prevBallBottom > topMinPos && prevBallBottom < topMaxPos && prevBallLeft > leftMinPos && prevBallLeft < leftMaxPos ) {
            const bottomDist = prevBallBottom - leftMinPos;
            const leftDist =  leftMaxPos - prevBallLeft;
            
            if ( bottomDist > leftDist ) {
                // colision por la derecha del ladrillo
                ballRef.current.left = leftMinPos + ballData.size;
                vector.current = {'top': vector.current.top, 'left': -vector.current.left};
            } else {
                // colision por la superior del ladrillo
                ballRef.current.top = topMinPos + ballData.size;
                vector.current = {'top': -vector.current.top, 'left': vector.current.left};
            }
            
            return true;
        }

        return false;
    }, [ballData.size, topMaxPos, topMinPos, leftMinPos, leftMaxPos, vector, ballRef]);

    const ballBottomRightisCollision = useCallback(() => {
        const prevBallBottom = ballRef.current.top + ballData.size;
        const prevBallRight = ballRef.current.left + ballData.size;

        if ( prevBallBottom > topMinPos && prevBallBottom < topMaxPos && prevBallRight > leftMinPos && prevBallRight < leftMaxPos ) {
            const bottomDist = leftMinPos - prevBallBottom;
            const rightDist =  topMinPos - prevBallRight;
            
            if ( bottomDist > rightDist ) {
                // colision por la izquierda del ladrillo
                ballRef.current.left = leftMinPos + ballData.size;
                vector.current = {'top': vector.current.top, 'left': -vector.current.left};
            } else {
                // colision por la superior del ladrillo
                ballRef.current.top = topMinPos + ballData.size;
                vector.current = {'top': -vector.current.top, 'left': vector.current.left};
            }
            
            return true;
        }

        return false;
    }, [ballData.size, topMaxPos, topMinPos, leftMinPos, leftMaxPos, vector, ballRef]);

    const isCollision = useCallback(() => {
        if ( !destroyed ) { 
            if ( ballTopLeftisCollision() ) { return true; }
            else if ( ballTopRightisCollision() ) { return true; }
            else if ( ballBottomLeftisCollision() ) { return true; }
            else if ( ballBottomRightisCollision() ) { return true; }
        }
        
        return false;
    }, [ballTopLeftisCollision, ballTopRightisCollision, ballBottomLeftisCollision, ballBottomRightisCollision, destroyed]);

    useEffect(() => {
        if ( !collisionDetected ) {
            if ( isCollision() ) {
                setCollisionDetected(true);
                setDestroyed(true);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clock])

    useEffect(() => {
        if ( collisionDetected ) {
            setTimeout(() => {
                setCollisionDetected(false);
            }, 17)
        }
    }, [collisionDetected, setCollisionDetected])

    return (
        <div className="brick-container" style={{
            top: brickTop, 
            left: brickLeft,
            width: brickData.width,
            height: brickData.height
        }}>
            <div className="brick" ref={brickRef} style={{
                backgroundColor: destroyed ? 'transparent' : black
            }}></div>
        </div>
    );
}

export default Brick;
