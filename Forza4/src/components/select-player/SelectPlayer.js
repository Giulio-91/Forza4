import React, { Component } from 'react';

export class SelectPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: 'CIAONE'
        }
    }

    clickMe() {
        this.setState({
            text: 'BELLA!'
        });
    }

    render() {
        const clickMe = () => {
            this.setState({
                text: 'BELLA!'
            });
        }
        return(
            <div>
                <h1>{this.state.text}</h1>
                <button onClick={clickMe} ></button>
            </div>
        )
    }
}