import React from 'react';
import entries from '../data/Entries';

import {productName} from '../product/product';

/**
 * This screen is shown until the first request is being intercepted between
 * the test script and the test automation server
 */
export default class Empty extends React.Component {
    render() {
        return <div className="empty-container">
            <h1>{productName} is ready!</h1>
            <img src="app/product/img/logo.png" /><br/>
            <p>
                Change your test automation script to connect to {productName}
                 (127.0.0.1:{entries.introData ? entries.introData.appPort:null})
                 instead of your test automation server to start using it!
            </p>
            </div>;
    }
}