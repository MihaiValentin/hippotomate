import React from 'react';

import SpecialInfoScreenshot from './specialinfo/Screenshot.js';

export default class SpecialInfo extends React.Component {
    render() {
        let command = this.props.request.dProtocol.command;

        if (this.props.request.responseCode === 200 && command.method === 'GET' && command.url === '/session/:sessionId/screenshot') {
            return <div className="specialinfo-container"><SpecialInfoScreenshot data={{screenshot: this.props.request.responseData.value}} /></div>;
        }

        return null;
    }
}