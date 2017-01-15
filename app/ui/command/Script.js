import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
var ipc = require("electron").ipcRenderer;

/**
 * During debug mode, you can run a script command.
 * This is the UI for running such command, and lets the user specify
 * the script to be ran and its arguments.
 */
export default class ScriptCommand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            script: "",
            args: ""
        };
    }
    handleScript(event, value) {
        this.setState({script: value});
    }
    handleArguments(event, value) {
        this.setState({args: value});
    }
    render() {
        return <Paper>
            <TextField
                onChange={this.handleScript.bind(this)}
                hintText={"The script"}
            />
            <br/>
            <TextField
                onChange={this.handleArguments.bind(this)}
                hintText={"The args"}
            />
            <RaisedButton onClick={() => {this.props.onClickCallback(this.state.script, this.state.args)}} label="Run" />
        </Paper>;
    }
}