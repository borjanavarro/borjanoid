import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { black } from '../../utils/constants';

import './styles.scss';

function Brick({clock, brickTop, brickLeft, ballTop, setBallTop, ballLeft, setBallLeft, vector }) {
    const [destroyed, setDestroyed] = useState(false);
    const brickRef = useRef();
    const brickData = useSelector(state => state.brick);
    const ballData = useSelector(state => state.ball);
    const topMinPos = brickTop;
    const topMaxPos = brickTop + brickData.height;
    const leftMinPos = brickLeft;
    const leftMaxPos = brickLeft + brickData.width;

    const timer = useRef(0);
    const [flag, setFlag] = useState(false)

    const topLeftisCollision = useCallback(() => {
        const prevBallTop = ballTop;
        const prevBallLeft = ballLeft;
        // if ( prevBallTop < topMaxPos && prevBallLeft > leftMinPos && prevBallLeft < leftMaxPos ) {
        //     const bottomDist = topMaxPos - prevBallTop;
        //     // const topDist = prevBallTop - leftMinPos;
        //     const leftDist = prevBallLeft - leftMinPos;
        //     const rightDist = leftMaxPos - prevBallLeft;
            
        //     // if ( bottomDist < topDist ) {
        //     //     // collision inferior
        //         if ( leftDist < rightDist ) {
        //             // colision izq
        //             if ( bottomDist < leftDist ) {
        //                 // colision inferior
        //                 setBallTop(topMaxPos);
        //                 vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        //             } else {
        //                 // colision izquierda
        //                 setBallLeft(leftMaxPos);
        //                 vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        //             }
        //         } else {
        //             // colision derecha
        //             if ( bottomDist < rightDist ) {
        //                 // colsion 
        //                 if ( bottomDist < leftDist ) {
        //                     // colision inferior
        //                     setBallTop(topMaxPos);
        //                     vector.current = {'top': -vector.current.top, 'left': vector.current.left};
        //                 } else {
        //                     // colision izquierda
        //                     setBallLeft(leftMaxPos);
        //                     vector.current = {'top': vector.current.top, 'left': -vector.current.left};
        //                 }
        //             }
        //         }
        //     return true;
        // }

        // return false;
        if ( prevBallTop < topMaxPos ) {
            setBallTop(topMaxPos);
            vector.current = {'top': -vector.current.top, 'left': vector.current.left};
            return true;
        }

        return false;
    }, [ballLeft, ballTop, leftMaxPos, leftMinPos, setBallLeft, setBallTop, topMaxPos, topMinPos, vector]);

    // const topLeftisCollision = useCallback(() => {
    //     const prevBallTop = ballTop;
    //     const prevBallLeft = ballLeft;
    //     if ( prevBallTop > topMinPos && prevBallTop < topMaxPos && prevBallLeft > leftMinPos && prevBallLeft < leftMaxPos ) {
    //         if ( topMaxPos - prevBallTop > prevBallTop - leftMinPos ) {
    //             // colision inferior
    //             setBallTop(topMaxPos);
    //             // vector: top cambia de signo
    //             vector.current = {'top': -vector.current.top, 'left': vector.current.left};

    //         } else {
    //             // colision izquierda
    //             setBallLeft(leftMaxPos);
    //             // vector: left cambia de signo
    //             vector.current = {'top': vector.current.top, 'left': -vector.current.left};
    //         }
            
    //         return true;
    //     }

    //     return false;
    // }, [ballLeft, ballTop, leftMaxPos, leftMinPos, setBallLeft, setBallTop, topMaxPos, topMinPos, vector]);

    // const topRightisCollision = useCallback(() => {
    //     const prevBallTop = ballTop;
    //     const prevBallRight = ballLeft + ballData.width;
    //     if ( prevBallTop > topMinPos && prevBallTop < topMaxPos && prevBallRight < leftMinPos && prevBallRight < leftMaxPos ) {
    //         if ( prevBallTop - topMaxPos > prevBallRight - leftMaxPos ) {
    //             // colision inferior
    //             setBallTop(topMaxPos);
    //             // vector: top cambia de signo
    //             vector.current = {'top': -vector.current.top, 'left': vector.current.left};

    //         } else {
    //             // colision derecha
    //             setBallLeft(leftMinPos - ballData.size);
    //             // vector: left cambia de signo
    //             vector.current = {'top': vector.current.top, 'left': -vector.current.left};
    //         }
            
    //         return true;
    //     }
    // }, [ballData.size, ballData.width, ballLeft, ballTop, leftMaxPos, leftMinPos, setBallLeft, setBallTop, topMaxPos, topMinPos, vector]);

    // const bottomLeftisCollision = useCallback(() => {
    //     const prevBallBottom = ballTop + ballData.height;
    //     const prevBallLeft = ballLeft;
    //     if ( prevBallBottom > topMinPos && prevBallBottom < topMaxPos && prevBallLeft < leftMinPos && prevBallLeft < leftMaxPos ) {
    //         if ( prevBallBottom - topMinPos > prevBallLeft - leftMaxPos ) {
    //             // colision superior
    //             setBallTop(topMinPos - ballData.size);
    //             // vector: top cambia de signo
    //             vector.current = {'top': -vector.current.top, 'left': vector.current.left};

    //         } else {
    //             // colision lateral
    //             setBallLeft(leftMaxPos);
    //             // vector: left cambia de signo
    //             vector.current = {'top': vector.current.top, 'left': -vector.current.left};
    //         }
            
    //         return true;
    //     }

    //     return false;
    // }, [ballData.height, ballData.size, ballLeft, ballTop, leftMaxPos, leftMinPos, setBallLeft, setBallTop, topMaxPos, topMinPos, vector]);

    // const bottomRightisCollision = useCallback(() => {
    //     const prevBallBottom = ballTop + ballData.size;
    //     const prevBallRight = ballLeft + ballData.width;
    //     if ( prevBallBottom > topMinPos && prevBallBottom < topMaxPos && prevBallRight > leftMinPos && prevBallRight < leftMaxPos ) {
    //         if ( prevBallBottom - topMinPos > prevBallRight - leftMinPos ) {
    //             // colision superior
    //             setBallTop(topMinPos - ballData.size);
    //             // vector: top cambia de signo
    //             vector.current = {'top': -vector.current.top, 'left': vector.current.left};


    //         } else {
    //             // colision izquierda
    //             setBallLeft(leftMinPos - ballData.size);
    //             // vector: left cambia de signo
    //             vector.current = {'top': vector.current.top, 'left': -vector.current.left};

    //         }
            
    //         return true;
    //     }

    //     return false;
    // }, [ballData.width, ballData.size, ballLeft, ballTop, leftMaxPos, leftMinPos, setBallLeft, setBallTop, topMaxPos, topMinPos, vector]);

    const isCollision = useCallback(() => {
        if ( topLeftisCollision() && !destroyed ) return true;
        // if ( topRightisCollision() && !destroyed ) return true;
        // if ( bottomLeftisCollision() && !destroyed ) return true;
        // if ( bottomRightisCollision() && !destroyed ) return true;

        return false;
    // }, [bottomLeftisCollision, bottomRightisCollision, topLeftisCollision, topRightisCollision, destroyed]);
}, [topLeftisCollision, destroyed]);

    useEffect(() => {
        if ( isCollision() ) {
            // setDestroyed(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clock])

    // useEffect(() => {
    //     timer.current++;
    //     if ( timer.current >= 60 ) {
    //         timer.current = 0;
    //         setFlag(flag ? false : true);
    //     }
    // }, [clock, timer, flag])

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
