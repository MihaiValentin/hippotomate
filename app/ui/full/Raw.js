import React from 'react';

/**
 * You can view the full raw request (including url, headers, data and so on)
 * This component gathers all this data to provide the raw request
 */
export default class Raw extends React.Component {
    render() {
        return <textarea readOnly style={{height:'98%', width:'99%'}}
                         defaultValue={this.getText()}></textarea>;
    }
    getText() {
        let item = this.props.data.raw;
        let str = [];

        str.push(item.reqMethod + " " + item.reqUrl);
        for (let headerName in item.reqHeaders) {
            if (item.reqHeaders.hasOwnProperty(headerName)) {
                str.push(headerName + ": " + item.reqHeaders[headerName]);
            }
        }

        str.push(JSON.stringify(item.reqData));

        str.push("");

        str.push(item.responseCode);
        for (let headerName in item.responseHeaders) {
            if (item.responseHeaders.hasOwnProperty(headerName)) {
                str.push(headerName + ": " + item.responseHeaders[headerName]);
            }
        }
        str.push(JSON.stringify(item.responseData));

        return str.join("\n");
    }
}
