import _ from 'lodash';
import React from 'react';
import Paper from 'material-ui/Paper';

import Request from './Request';
import Breakpoint from './Breakpoint';
import TimeSince from '../../common/util/TimeSince';
import entries from '../data/Entries';

import {render} from './Window';

/**
 * Session UI functionality
 */
export default class Session extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minified: false
        };
    }
    deleteSession() {
        // I know, confirm with two parameters. Works in Electron :D
        if (confirm("By removing the session you remove all its logs and any future logs relating to it", "Remove session?")) {
            render(() => {
                entries.deletedSessions.push(this.props.session.id);
                entries.list = entries.list.filter((it) => {
                    // TODO also include in-progress requests
                    return it.sessionId != this.props.session.id;
                });
            });
        }
    }
    render() {
        let lastActivity;
        let browser;

        if (this.props.session.data.items.length) {
            lastActivity = _.maxBy(this.props.session.data.items, (o) => { return o._respondedDate; });
            if (lastActivity) {
                lastActivity = "Last activity " + TimeSince(lastActivity._respondedDate);
            } else {
                lastActivity = null;
            }

            browser = this.props.session.data.items.find((ci) => {
                return ci && ci.reqData && ci.reqData.desiredCapabilities && ci.reqData.desiredCapabilities.browserName;
            }).reqData.desiredCapabilities.browserName;
        }

        return <Paper className="session-container">
                    <div className="session-header">
                        <div className="icon">
                            <div style={{
                                width: 44,
                                height: 44,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                backgroundSize: '80%',
                                backgroundImage: 'url("app/product/browsers-logo/'+ browser +'_48x48.png")',
                                borderRadius: '50%',
                                backgroundColor: '#ffccff'
                            }}></div>
                        </div>
                        <div className="text">
                            <div>{"Session " + this.props.session.id}</div>
                            { lastActivity ? <div style={{color: '#999'}}>{lastActivity}</div> : null }
                        </div>
                        <div className="buttons">
                            <button title="Expand all the requests" className="fa fa-plus-square-o" onClick={() => {render(() => { entries.setExpand(this.props.session.id, true); })}}></button>
                            <button title="Collapse all the requests" className="fa fa-minus-square-o" onClick={() => {render(() => { entries.setExpand(this.props.session.id, false); })}}></button>
                            <button title="Delete all the logs for this session" className="fa fa-trash-o" onClick={() => {this.deleteSession();}}></button>
                            <button style={{marginLeft: '15px'}} className={"fa fa-chevron-" + (this.state.minified ? "down" : "up")} onClick={() => { this.setState({minified: !this.state.minified})}}></button>
                        </div>
                    </div>
            { !this.state.minified ?
                    <div className="session-content">
                        <ul className="requests">
                            {this.props.session.data.items.filter((item) => !item.hide).map((item, idx) => {
                                return <Request item={item} session={this.props.session} friendly={this.props.friendly} key={idx} />;
                            })}
                        </ul>
                        {
                            this.props.breakpoint ? <Breakpoint session={this.props.session} /> : null
                        }
                    </div> : null }
            </Paper>;
    }
}