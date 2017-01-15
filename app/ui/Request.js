import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import DetailedRequest from '../../common/DetailedRequest';
import RequestFriendly from './views/RequestFriendly';
import RequestTechnical from './views/RequestTechnical';
import entries from '../data/Entries';
import {render} from './Window';

/**
 * The UI component for the request line. Based on the settings, it will load
 * either the friendly view, either the technical view
 */
export default class Request extends React.Component {
    render() {
        let {item, session} = this.props;
        let expanded = (item._expanded || (session.expand && item._expanded !== false)) && !item._requested;

        let request = DetailedRequest(item);

        return <li className={this.getStatusClass(request)}>
            {
                this.props.friendly ?
                    <RequestFriendly request={request} session={session} expanded={expanded} renderExpandButton={this.renderExpandButton} /> :
                    <RequestTechnical request={request} session={session} expanded={expanded} renderExpandButton={this.renderExpandButton} />
            }
        </li>;
    }
    getStatusClass(request) {
        return "sp-" + request.dState.status.toLowerCase();
    }
    renderExpandButton(request, globallyExpanded) {
        let el;

        if (request._requested) {
            el = <RefreshIndicator size={19} left={0} top={0} status="loading"/>;
        } else if (request._expanded || (globallyExpanded && request._expanded !== false)) {
            el = <button onClick={() => {render(() => {
                let it = _.find(entries.list, (l) => {
                    return l.uid === request.uid;
                });

                it._expanded = false;
            })}}>-</button>;
        } else {
            el = <button onClick={() => {render(() => {
                let it = _.find(entries.list, (l) => {
                    return l.uid === request.uid;
                });

                it._expanded = true;
            })}}>+</button>;
        }

        return el;
    }
}