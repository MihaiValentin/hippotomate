import _ from 'lodash';
import React from 'react';
import JSONTree from 'react-json-tree';

import Features from '../Features';
import JSONPreview from '../../../common/util/JSONPreview';
import Friendly from '../../../common/protocol/transformers/Friendly';

import SpecialInfo from '../SpecialInfo';
import entries from '../../data/Entries';

import {render} from '../Window';

/**
 * The friendly view shows user-friendly messages, without going too deep
 * in the technical details.
 */
export default class RequestFriendly extends React.Component {
    render() {
        let {request, session, expanded} = this.props;

        let friendly = Friendly(request);

        return <div className={"request-wrapper expanded-" + (expanded ? 'yes': 'no')}>
            <div className="expander">
                {this.props.renderExpandButton(request, session.expand)}
            </div>
            <div className="main">
                {
                    expanded ?
                        <div className="request-line">
                            <div><strong>{friendly.fReqUrl}</strong></div>
                            <SpecialInfo request={request} />
                            { friendly.fReqData ?
                            <small style={{paddingRight: '15px'}}>
                                { _.isObjectLike(friendly.fReqData) ?
                                    <JSONTree
                                        data={JSONPreview(friendly.fReqData, 200, true)}
                                        hideRoot={true}
                                    /> : (friendly.fReqData || null) }
                            </small> : null }
                        </div>
                        :
                        <div className="request-line">
                            <strong>{friendly.fReqUrl}</strong>
                            {friendly.fReqData ? <small>{JSON.stringify(friendly.fReqData)}</small> : null }
                        </div>
                }
                {
                    expanded ?
                        <div className="response-line">
                            <hr/>
                            <div className="line line-url">
                                <span>Response:&nbsp;</span>
                                <strong className={"code-" + request.dState.status.toLowerCase()}>{request.dState.text}</strong>
                            </div>
                        </div>
                        : null
                }
            </div>
            <div className="extra">
                <Features request={request} mini={!expanded} />
            </div>
        </div>;
    }
    renderExpandButton(item, globallyExpanded) {
        let el;

        if (item._requested) {
            el = <RefreshIndicator size={19} left={0} top={0} status="loading"/>;
        } else if (item._expanded || (globallyExpanded && item._expanded !== false)) {
            el = <button onClick={() => {render(() => {
                let it = _.find(entries.list, (l) => {
                    return l.uid === item.uid;
                });

                it._expanded = false;
            })}}>-</button>;
        } else {
            el = <button onClick={() => {render(() => {
                let it = _.find(entries.list, (l) => {
                    return l.uid === item.uid;
                });

                it._expanded = true;
            })}}>+</button>;
        }

        return el;
    }
}