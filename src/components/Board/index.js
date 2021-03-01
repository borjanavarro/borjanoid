import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Wall from '../Wall/index';
import Ball from '../Ball/index';
import Player from '../Player/index';
import useFrameLoop from '../../utils/FrameLoop';
import { generateRandomVector } from '../../utils/functions';
import { LATERAL_COLUMNS_WIDTH } from '../../utils/constants';

import './styles.scss';

function Board({ keyDown, setEndGame }) {
    const boardData = useSelector(state => state.board);
    const ballData = useSelector(state => state.ball);
    const [clock, setClock] = useState(0);
    const vector = useRef( generateRandomVector() );
    const ballRef = useRef({
        top: boardData.topMaxPos - ballData.size,
        left: (boardData.leftMaxPos - boardData.leftMinPos) / 2 - ballData.size
    });
    const { topMinPos, topMaxPos, leftMinPos, leftMaxPos } = boardData;
    const [counter, setCounter] = useState(0);
    const [points, setPoints] = useState(0);
    const pause = useRef(false);
    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);

    const keyHandler = (e) => {
        if ( e.code === 'Escape' ) {
            pause.current = pause.current ? false : true;
        } else if ( e.code === 'ArrowLeft' ) {
            if ( !pause.current ) setMoveLeft(true);
        } else if ( e.code === 'ArrowRight' ) {
            if ( !pause.current ) setMoveRight(true);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', (e) => keyHandler(e));

        return document.removeEventListener('keydown', (e) => keyHandler(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let interval;

        const main = () => {
            interval = setInterval(() => {
                if ( !pause.current ) {
                    setCounter(counter + 1);
                }
            }, 1000)
        };

        main();

        return () => clearInterval(interval);
    }, [counter, pause])

    useFrameLoop((time) => {
        setClock(time);
    });

    return (
        <div className="screen-container">
            <div className="info-container" style={{ width: LATERAL_COLUMNS_WIDTH }}>
                <h1>Arkanoid</h1>
                <p>Score: {points}</p>
                <p>Time: {counter} s</p>
                <p>press Esc to pause</p>
                <p>{ pause.current ? 'PAUSE' : ''}</p>
            </div>
            <div className="board-container" style={{
                width: leftMaxPos - leftMinPos,
                height: topMaxPos - topMinPos
            }}>
                <div id="board">
                    <Wall 
                        clock={clock} 
                        ballRef={ballRef}
                        vector={vector}
                        points={points}
                        setPoints={setPoints}
                        setEndGame={setEndGame}
                    />
                    <Ball 
                        clock={clock}
                        ballRef={ballRef}
                        vector={vector}
                        points={points}
                        setEndGame={setEndGame}
                        pause={pause}
                    />
                </div>
                <Player 
                    clock={clock}
                    ballRef={ballRef}
                    vector={vector}
                    pause={pause}
                    moveLeft={moveLeft}
                    moveRight={moveRight}
                    setMoveLeft={setMoveLeft}
                    setMoveRight={setMoveRight}
                />
            </div>
            <div className="info-container" style={{ width: LATERAL_COLUMNS_WIDTH }}></div>
        </div>
    )
}

export default Board;
