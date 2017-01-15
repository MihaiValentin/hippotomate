import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Screenshot from './full/Screenshot';
import Source from './full/Source';
import Raw from './full/Raw';
import entries from '../data/Entries';
import {render} from './Window';

/**
 * Full screen UI for viewing screenshots, page source, etc
 */
export default class Full extends React.Component {
    render() {
        if (!this.props.data) {
            return null;
        }
        return <Paper style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto', padding: '60px 20px 20px 20px', background: '#000'}}>
            <RaisedButton secondary={true} label="Back" labelPosition="after" icon={<i className="fa fa-arrow-left" style={{color: 'white'}}></i>}
                onClick={() => { render(() => {entries.full = null;}) }}
                style={{position: 'fixed', top: 15, left: 15, opacity: 0.95}}>
            </RaisedButton>

            {this.props.data.screenshot ?
                <Screenshot data={this.props.data} /> : null}

            {this.props.data.raw ?
                <Raw data={this.props.data} /> : null}

            {this.props.data.source ?
                <Source data={this.props.data} /> : null}

        </Paper>;
    }
}
