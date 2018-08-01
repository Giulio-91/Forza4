import React, {Component} from 'react';
import './Board.css';

import { Disc } from '../disc/Disc'
import { CheckBoard } from './check-board';

export class Board extends Component {

    PLAYER_ONE = 'tomato';
    PLAYER_TWO = 'darkblue';

    ROWS = 6;
    COLS = 7;

    itemsPerRow = new Array( this.COLS ).fill(); 
    itemsPerCol = new Array( this.ROWS ).fill();

    id = 0;

    boardStyle = {
        width: `${this.COLS * 10}vmin`,
        height: `${this.ROWS * 10}vmin`
    }
    colsStyle = {
        width: `10vmin`,
        height: `${this.ROWS * 10}vmin`
    }

    constructor(props) {
        super(props);

        const board = this.itemsPerRow.reduce( (board, row, index) => {

            board[index] = [];
            return board;

        }, this.itemsPerRow.slice(0) );

        this.state = {
            boardMap: board,
            next: {
                id: ++this.id,
                color: this.id % 2 === 0 ? this.PLAYER_ONE : this.PLAYER_TWO
            }
        }
    }

    render() {
        const insertDisc = (columnIndex) => {
            //
            if (this.state.boardMap[columnIndex].length >= this.ROWS) {
                return;
            }

            this.setState(previousState => {
                
                let player = previousState.next.color;

                const discNumber = previousState.boardMap[columnIndex].push( previousState.next );
                previousState.next = {
                    id: ++this.id,
                    color: this.id % 2 === 0 ? this.PLAYER_ONE : this.PLAYER_TWO
                }

                const result = CheckBoard(
                    this.state.boardMap,
                    columnIndex,
                    discNumber-1, //
                    player,
                    this.ROWS-1,
                    this.id-1
                );

                if(result) {
                    alert(`${(this.id % 2 !== 0 ? this.PLAYER_ONE : this.PLAYER_TWO).toUpperCase()} WINS!` );
                    result.forEach(winnerDisk => {
                        console.log(winnerDisk)
                        //this.state.boardMap[winnerDisk.x][winnerDisk.y]['color'] = 'winnerColor';
                    });
                }

                return {
                    ...previousState
                }
            })
        }

        const autoFill = () => {

            this.itemsPerCol.map(
                (row, i) => {
                    
                    this.state.boardMap.map(
                        (column, j) => {
                            
                            if( this.state.boardMap[i][j] ) return;

                            setTimeout(
                                insertHere => {
                                    insertDisc(insertHere);                            
                                }, (i*700)+(j*700), j
                            );
                        }
                    )
                }
            )

        }

        return (
            <div>
                {/*
                    <button onClick={autoFill}>FILL ALL</button>
                */}
                {/*
                    RIGA DI INSERIMENTO DISCO
                */}
                <div style={{display: 'flex', flexFlow: 'row nowrap', zIndex: 12}}>
                    {
                        this.itemsPerRow.map( (x, i) => {
                            return (
                                <div className="Insert-disc" key={i}>
                                    { 
                                        <Disc 
                                            key={this.state.next.id} 
                                            onClick={insertDisc.bind(this, i)}
                                            style={{backgroundColor: this.state.next.color }}
                                        /> 
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="Board-container" style={ this.boardStyle }>
                    {/*
                        GRIGLIA FRONTALE
                    */}
                    <div className="Board">
                        {
                            this.itemsPerCol.map( (item, i) => {
                                return (
                                    <div className="Slot-row" key={i}>
                                        {
                                            this.itemsPerRow.map( (elem, j) => {
                                                return ( <div className="Disc-slot" key={j}></div> );
                                            })
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                    {/*
                        DISCHI INSERITI
                    */}
                    {
                        this.state.boardMap.map( (row, i) => {
                            return (
                                <div className="Slot-col" key={i} style={ this.colsStyle }>
                                    {
                                        row.map( (elem, j) => {
                                            if( elem ) {
                                                return ( 
                                                    <Disc 
                                                        color={elem.color} 
                                                        key={elem.id} 
                                                        fall={this.ROWS - j}
                                                        style={{backgroundColor: elem.color}}        
                                                    /> 
                                                );
                                            }
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}