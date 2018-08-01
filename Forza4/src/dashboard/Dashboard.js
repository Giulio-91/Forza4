import React, {Component} from 'react';
import './Dashboard.css';

import { Board } from '../components/board/Board';

export class Dashboard extends Component {

    render() {

        return(
            <Board rows="6" cols="7" />
        );
    }
}