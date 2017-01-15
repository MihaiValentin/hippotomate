import React from 'react';

/**
 * Requests that have a screenshot attached can open the screenshot in full
 * screen
 */
export default class Screenshot extends React.Component {
    toggleSize() {
        this.setState({
            max: !this.state.max
        });
    }
    getStyle() {
        if (!this.state) {
            this.state = {max:true};
        }

        let styles = {
            background:'white',
            cursor: '-webkit-zoom-' + (this.state.max ? 'in' : 'out')
        };
        if (this.state.max) {
            styles.maxWidth = '100%';
        }
        return styles;
    }
    render() {
        return <img style={this.getStyle()}
                    onClick={this.toggleSize.bind(this)}
                    src={"data:image/png;base64," +
                        this.props.data.screenshot}/>;
    }
}
