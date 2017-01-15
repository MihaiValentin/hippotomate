import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * During debug mode, you can run a command based on an element.
 * This is the UI for running such command, and lets the user specify
 * the selector type and its value.
 */
export default class CommandWithElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            how: 'css selector',
            what: null
        };
    }
    handleElementSelectorType(event, index, value) {
        this.setState({how: value});
    }
    handleElementSelectorValue(event, value) {
        this.setState({what: value});
    }
    render() {
        return <Paper>
            <SelectField value={this.state.how} onChange={this.handleElementSelectorType.bind(this)}>
                {
                    ['class name', 'css selector', 'id', 'name', 'link text', 'partial link text', 'tag name', 'xpath'].map((how) => {
                        return <MenuItem value={how} primaryText={how} />
                    })
                }
            </SelectField>
            <br/>
            <TextField
                onChange={this.handleElementSelectorValue.bind(this)}
                hintText={"The " + this.state.how + " to search for"}
            />
            <RaisedButton onClick={() => {this.props.onClickCallback(this.state.how, this.state.what)}} label="Run" />
        </Paper>;
    }
}