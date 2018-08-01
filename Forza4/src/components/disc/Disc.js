import React, {Component} from 'react';
import './Disc.css';

export class Disc extends Component {

    /*color = (function (context) {
        if(context.props.color && context.props.color === 'red') {
            return 'inset 0 0 0 1000px tomato';
        } else {
            return 'inset 0 0 0 1000px darkblue';
        }
    })(this);*/

    style = {
        animation: 'fall'+this.props.fall+'0 ease-in',
        animationDuration: `.${this.props.fall > 2 ? 6 : 3 }s`  ,
        //
        ...this.props.style
    }

    render() {

        return(
            <div className="Disc" style={ this.style } onClick={this.props.onClick}>

            </div>
        );
    }
}