import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Ball from '../Ball/index.js';
import updateData from '../../redux/actions/action'

import './styles.scss';

function Board({clock, updateBoardData, boardData, ballData, playerData}) {
    const [loading, setLoading] = useState(true);
    const board = useRef(null);

    useEffect( () => {
        updateBoardData({
            topMinPos: 0,
            topMaxPos: 600 - ballData.size,
            leftMinPos: 0,
            leftMaxPos: 400 - ballData.size,
        });
        setLoading(false);

    }, [board, boardData.borderWidth, ballData.size, updateBoardData])

    if ( loading ) {
        return (
            <div className="center-board">
                <div className="board-container" ref={board} style={{
                    width: 400,
                    height: 600
                }}>
                    <div id="board"></div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="center-board">
                <div className="board-container" ref={board} style={{
                    width: 400,
                    height: 600
                }}>
                    <div id="board">
                        <Ball clock={clock} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boardData: state.board,
        ballData: state.ball,
        playerData: state.player
     }
}

const mapDispatchToProps = dispatch => {
    return { updateBoardData: (data) => dispatch( updateData(data)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);