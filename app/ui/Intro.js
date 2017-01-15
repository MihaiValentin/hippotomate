import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

import {productName} from '../product/product';

/**
 * The intro screen where the user will input connection details
 */
export default class Full extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.data, {
            loading: false,
            errors: false
        });
    }

    go() {
        var ipc = require("electron").ipcRenderer;
        ipc.send("CLIENT_CONNECT", this.state);
        this.setState({
            loading: true
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors !== this.props.errors || nextProps.data !== this.props.data) {

            if (nextProps.errors) {
                this.setState({
                    errors: true
                });
            }

            this.setState({
                loading: false
            });
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                secondary={true}
                onClick={()=>{
                    this.setState({
                        errors: false
                    });
                }}
                onTouchTap={() => { // whatever you'll add here, it will not work. went to onClick
                }}
            />,
        ];

        let errMsg;
        if (this.state.errors && this.props.errors && this.props.errors[0]) {
            if (this.props.errors[0].type === 'LISTEN_ERROR') {
                errMsg = <div><p>Could not start listening on port {this.state.appPort}</p><p>More details:<br/><span style={{color: '#aaa'}}>{this.props.errors[0].message}</span></p></div>;
            } else if (this.props.errors[0].type === 'TARGET_CONNECT_ERROR') {
                errMsg = <div><p>Could not connect to {this.state.serverHostname}:{this.state.serverPort}/{this.state.serverPath}</p><p>More details:<br/><span style={{color: '#aaa'}}>{this.props.errors[0].message}</span></p></div>;
            }
        }

        return <div className="intro-screen">

            <Dialog
                title="Incorrect connection details"
                actions={actions}
                modal={true}
                open={this.state.errors}
            >
                {errMsg}
            </Dialog>

            <div className="intro-container">

            {this.state.loading ? <div className="loading-mask"><CircularProgress size={1.5} /></div> : null}

            <div className="intro-statement">{productName} works by acting like a middleman between your test automation script and the test automation server</div>
            <div className="intro-draw">
                <div className="intro-col intro-col-1">
                    <div className="intro-pic-container"><img src="app/product/img/code.svg" /></div>
                    <div className="intro-text">Your test automation script</div>
                </div>
                <div className="intro-col intro-col-2">
                    <div className="intro-pic-container"><img src="app/product/img/arrow.png" /></div>
                </div>
                <div className="intro-col intro-col-3">
                    <div className="intro-pic-container"><img src="app/product/img/logo.png" /></div>
                    <div className="intro-text">{productName}</div>
                </div>
                <div className="intro-col intro-col-4">
                    <div className="intro-pic-container"><img src="app/product/img/arrow.png" /></div>
                </div>
                <div className="intro-col intro-col-5">
                    <div className="intro-pic-container"><img src="app/product/img/server.svg" /></div>
                    <div className="intro-text">Test automation server</div>
                </div>
            </div>
                </div>
            <div>
                <div className="intro-stripe-container">
                    <div className="intro-stripe">
                        <div className="intro-stripe-col intro-stripe-col-1">
                            <label>
                                Start {productName} on port
                            </label><br/>
                            <input type="number" min="1024" max="65535" step="1" className="intro-field-listen-port" defaultValue={this.state.appPort}
                                   onChange={(e) => {this.setState({appPort: e.target.value});}} />
                        </div>
                        <div className="intro-stripe-col intro-stripe-col-2">
                            <label>
                                Test automation server hostname, port and path
                            </label><br/>
                            <input type="text" className="intro-field-address" defaultValue={this.state.serverHostname}
                                   onChange={(e) => {this.setState({serverHostname: e.target.value});}} /> : <input type="number" min="1" max="65535" step="1" className="intro-field-port" defaultValue={this.state.serverPort}
                                                                                                                    onChange={(e) => {this.setState({serverPort: e.target.value});}} /> / <input type="text" className="intro-field-path" defaultValue={this.state.serverPath}
                                                                                                                                                                                                 onChange={(e) => {this.setState({serverPath: e.target.value});}} />
                        </div>
                        <div data-test-id="intro-button-go" className="intro-stripe-col intro-stripe-col-3">
                            <RaisedButton
                                primary={true}
                                label="Let's go!"
                                onClick={() => this.go()}
                                style={{height: '44px', padding: 0}}
                                labelStyle={{lineHeight: '44px'}}
                            />
                        </div>
                    </div>
                </div>
                </div>
        </div>;
    }
}
