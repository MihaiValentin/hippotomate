import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';

import Session from './Session';
import Empty from './Empty';
import {productName} from '../product/product';
import entries from '../data/Entries';
import {render} from './Window';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, {
            showGeneral: false
        });
    }

    render() {
        let sessionIds = Object.keys(this.props.store);
        let isEmpty = sessionIds.length === 1 && !this.props.store[sessionIds[0]].items.length;

        return <div style={{display: this.props.full ? 'none' : 'block'}}>
            {
                isEmpty ? <Empty /> : [
                    <div key="topbar" className="topbar">
                        <div className="topbar-logo">
                            <img src="app/product/img/logo.png" />
                        </div>
                        <div className="topbar-title">
                            <h1>{productName}</h1>
                        </div>
                        <div className="topbar-view">
                            <RadioButtonGroup className="hptm-mui-fix" style={{display: 'flex', flexDirection: 'row', width: 'auto', justifyContent: 'flex-end'}} name="shipSpeed" defaultSelected={this.props.friendly ? 'friendly' : 'technical'}>
                                <RadioButton
                                    labelStyle={{marginLeft: -14, marginRight: 7}}
                                    value="friendly"
                                    label="Simple"
                                    onClick={(e) => {render(() => {entries.friendly = true;});}}
                                />
                                <RadioButton
                                    labelStyle={{marginLeft: -14, marginRight: 7}}
                                    value="technical"
                                    label="Advanced"
                                    onClick={(e) => {render(() => {entries.friendly = false;});}}
                                />
                            </RadioButtonGroup>
                        </div>
                        <div className="topbar-settings">
                            <Checkbox
                                defaultChecked={this.state.showGeneral}
                                onCheck={() => {
                                    this.setState({
                                        showGeneral: !this.state.showGeneral
                                    });
                                }}
                                className="hptm-mui-fix"
                                labelStyle={{marginLeft: -14, marginRight: 7}}
                                style={{display: 'flex', flexDirection: 'row', width: 'auto', justifyContent: 'flex-end'}}
                                label="General"
                            />
                        </div>
                    </div>,
                    <div key="content" className="content">
                        {
                            sessionIds.filter((sessionId) => {
                                if (!this.state.showGeneral && sessionId === 'general') {
                                    return false;
                                }
                                return true;
                            }).map((sessionId) => {
                                let session = {
                                    id: sessionId,
                                    data: this.props.store[sessionId],
                                    expand: sessionId in this.props.expands && this.props.expands[sessionId]
                                };
                                return <Session friendly={this.props.friendly} key={sessionId} session={session} breakpoint={this.props.breakpoints.indexOf(sessionId) > -1} />;
                            })
                        }
                    </div>
                ]
            }
        </div>;
    }
}