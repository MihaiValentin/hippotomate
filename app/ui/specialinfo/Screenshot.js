import React from 'react';
import entries from '../../data/Entries';
import {render} from '../Window';

export default class SpecialInfoScreenshot extends React.Component {
    doFull() {
        render(() => {entries.full = {screenshot: this.props.data.screenshot};});
    }
    getStyle() {
        return {
            cursor: '-webkit-zoom-in',
            width: '100%'
        };
    }
    render() {
        return <img style={this.getStyle()} onClick={this.doFull.bind(this)} src={"data:image/png;base64," + this.props.data.screenshot}/>;
    }
}
