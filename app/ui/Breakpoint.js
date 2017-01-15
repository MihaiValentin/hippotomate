import _ from 'lodash';
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
var ipc = require("electron").ipcRenderer;

import PauseIcon from 'material-ui/svg-icons/av/pause';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import CodeIcon from 'material-ui/svg-icons/action/code';
import PhotoCameraIcon from 'material-ui/svg-icons/image/photo-camera';
import SkipNextIcon from 'material-ui/svg-icons/av/skip-next';
import TimeSince from '../../common/util/TimeSince';
import DetailedRequest from '../../common/DetailedRequest';
let CommandsList = require('../../common/CommandsList').default;
import ElementCommand from './command/Element';
import ScriptCommand from './command/Script';

function getUid() {
    return "" + Math.round(new Date().getTime() + Math.random() * Math.pow(10,20));
}

export default class Session extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cmd: false,
            c: null
        };
    }
    cont(sessionId) {
        ipc.send("DEBUG_CONTINUE", {
            sessionId: sessionId
        });
    }
    screen(sessionId) {
        ipc.send("COMMAND", {
            sessionId: sessionId,
            command: 'screenshot'
        });
    }
    command(sessionId, command) {
        console.log('command');
        if (command.url.indexOf('/:id') > -1 || command.url.indexOf("execute") > -1) {
            console.log('oh yes, :id');
            this.setState({
                c: command
            });
        } else {
            ipc.send("COMMAND_METHOD_URL", {
                sessionId: sessionId,
                method: command.method,
                url: command.url
            });
        }
    }
    commandWithId(sessionId, command, more) {
        let uiUID = getUid();
        ipc.send("COMMAND_METHOD_URL", {
            sessionId: sessionId,
            method: 'POST',
            url: '/session/:sessionId/element',
            data: more,
            uiUID: uiUID
        });
        ipc.once("COMMAND_METHOD_URL_FINISHED_UIUID_" + uiUID, function(ev, payload) {
            ipc.send("COMMAND_METHOD_URL", {
                sessionId: sessionId,
                method: command.method,
                url: command.url.replace(':id', payload.responseData.value.ELEMENT)
            });
        });
    }
    commandWithData(sessionId, command, more) {
        console.log(arguments);
        ipc.send("COMMAND_METHOD_URL", {
            sessionId: sessionId,
            method: command.method,
            url: command.url,
            data: more
        });
    }
    next(sessionId) {
        ipc.send("DEBUG_NEXT", {
            sessionId: sessionId
        });
        // TODO keep scroll during debugging step by step - make better
        window.scrollTo(0,window.scrollY+39);
    }
    render() {
        return <Paper className="breakpoint-container">
            <div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <PauseIcon color={red500} /> Your execution is paused
                        </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                <RaisedButton labelStyle={{textTransform: 'none'}} style={{marginRight:15}} icon={<PlayArrowIcon />} label="Continue" onClick={() => this.cont(this.props.session.id)} />
                <RaisedButton labelStyle={{textTransform: 'none'}} icon={<CodeIcon />} style={{marginRight:15}} label="Run a command" onClick={() => this.setState({cmd: true})} />
                        <RaisedButton labelStyle={{textTransform: 'none'}} primary={true} icon={<SkipNextIcon />} label="Next" onClick={() => this.next(this.props.session.id)} />
                    </div>
                </div>
                {this.state.cmd ?

                    <div>
                        {
                            CommandsList.filter((c) => c.label).map((c) => {
                                return <RaisedButton
                                    onClick={() => {this.command(this.props.session.id, c)}}
                                    style={{marginRight: 15, marginBottom: 15, height: 28, lineHeight: '28px'}}
                                    labelStyle={{textTransform: 'none'}}
                                    label={c.label}
                                />
                            })
                        }
                        { this.state.c ?
                            <div>
                        <ElementCommand onClickCallback={(using, value) => this.commandWithId(this.props.session.id, this.state.c, {using, value})} />
                                <ScriptCommand onClickCallback={(script, args) => this.commandWithData(this.props.session.id, this.state.c, {script, args})} />
                            </div>
                            : null }

                    </div>

                    : null}
                {this.getScreen()}
            </div>
            </Paper>;
    }
    getScreen() {
        let imgItem = _.findLast(this.props.session.data.items, (itemx) => {
            // TODO make sure we get the one from the current debug session
            let item = DetailedRequest(itemx);
            if (item.dProtocol.command.method === 'GET' && item.dProtocol.command.url === '/session/:sessionId/screenshot') {
                if (item.intercept && !item._requested) {
                    return true;
                }
            }
        });
        if (imgItem) {
            let src = "data:image/png;base64," + imgItem.responseData.value;
            return <div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4}}>
                <p style={{margin: 0, color: '#bbb'}}>Screenshot taken {TimeSince(imgItem._respondedDate, true)} ago</p>
                <FlatButton labelStyle={{textTransform: 'none', color: '#999'}} style={{height: 28, lineHeight: '28px'}} icon={<PhotoCameraIcon color="#999" />} label="Update screenshot" onClick={() => this.screen(this.props.session.id)} />
                    </div>
                <img src={src} style={{border: '1px solid #eee', width: '100%', boxSizing: 'border-box'}} />
                </div>;
        }
    }
}