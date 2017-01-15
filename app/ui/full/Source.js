import React from 'react';

/**
 * Requests that ask for the full page source can view it full screen
 */
export default class Source extends React.Component {
    render() {
        return <textarea readOnly style={{height:'98%', width:'99%'}}
                         defaultValue={this.getText()}></textarea>;
    }
    getText() {
        return this.props.data.source;
    }
}
