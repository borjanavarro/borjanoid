import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3-timer';

import './scss/global.scss';

function App() {
    let vector = {'top': 1/Math.sqrt(2), 'left': 1/Math.sqrt(2)};
    let ballVelocity = 20;
    let playerVelocity = 10;
    let playerWidth = 100;
    const ball = useRef(null);
    const player = useRef(null);
    const lateralMargin = 20;
    const ballSize = 50;
    const topMinPos = lateralMargin;
    const leftMinPos = lateralMargin;
    const h = window.innerHeight;
    const w = window.innerWidth;
    const topMaxPos = h - ballSize - lateralMargin;
    const leftMaxPos = w - ballSize - lateralMargin;

    const isThereCollision = (ballTop, ballLeft) => {
        if ( ballTop < topMinPos || ballTop > topMaxPos || ballLeft < leftMinPos || ballLeft > leftMaxPos) {
            return true;
        }

        return false;
    }

    const collision = (ballTop, ballLeft) => {
        if ( ballTop < topMinPos ) {
            ball.current.style.top = topMinPos + 'px';
            vector = {'top': -vector.top, 'left': vector.left};
        } else if ( ballTop > topMaxPos ) {
            ball.current.style.top = topMaxPos + 'px';
            vector = {'top': -vector.top, 'left': vector.left};
        } else if ( ballLeft < leftMinPos ) {
            ball.current.style.left = leftMinPos + 'px';
            vector = {'top': vector.top, 'left': -vector.left};
        } else if ( ballLeft > leftMaxPos ) {
            ball.current.style.left = leftMaxPos + 'px';
            vector = {'top': vector.top, 'left': -vector.left};
        }
    }

    const main = () => {
        const ballTop = parseInt(ball.current.style.top, 10);
        const ballLeft = parseInt(ball.current.style.left, 10);

        if (isThereCollision(ballTop, ballLeft)) {
            collision(ballTop, ballLeft);
        } else {
            ball.current.style.top = parseInt(ball.current.style.top, 10) + vector.top * ballVelocity + 'px';
            ball.current.style.left = parseInt(ball.current.style.left, 10) + vector.left * ballVelocity + 'px';
        }

        movePlatform();
    }

    const movePlatform = (e) => {
        const playerLeft = parseInt(player.current.style.left, 10);

        if ( e.keyCode === 37 && playerLeft > leftMinPos ) {
            player.current.style.left = parseInt(player.current.style.left) - playerVelocity + 'px';

        } else if ( e.keyCode === 39 && playerLeft + playerWidth < leftMaxPos ) {
            player.current.style.left = parseInt(player.current.style.left) + playerVelocity + 'px';
        }
    }

    useEffect(() => {
        const t = d3.timer(main);
        document.addEventListener("keydown", e => movePlatform(e), false);

        return () => t.stop();
    })

    return (
        <div className="App">
            <div className="container">
                <div id="ball" ref={ball} style={{"top": lateralMargin, "left": lateralMargin}}></div>
                <div id="player" ref={player}></div>
            </div>
        </div>
    );
}

export default App;
