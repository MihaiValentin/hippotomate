import _ from 'lodash';
import React from 'react';
import JSONTree from 'react-json-tree';

import Features from '../Features';
import JSONPreview from '../../../common/util/JSONPreview';
import Technical from '../../../common/protocol/transformers/Technical';

import SpecialInfo from '../SpecialInfo';

/**
 * The technical view goes deep into technical details
 */
export default class RequestTechnical extends React.Component {
    render() {
        let {request, session, expanded} = this.props;

        let technical = Technical(request);

        return <div className={"request-wrapper expanded-" + (expanded ? 'yes': 'no')}>
                <div className="expander">
                    {this.props.renderExpandButton(request, session.expand)}
                </div>
                <div className="main">
                    {
                        expanded ?
                            <div className="request-line">
                                <div>Request URL:&nbsp;<strong>{technical.tEReqUrl}</strong></div>

                                <SpecialInfo request={request} />

                                <div>Request data: </div>
                                <small style={{paddingRight: '15px'}}>
                                    { _.isObjectLike(technical.tEReqData) ?
                                    <JSONTree
                                        data={JSONPreview(technical.tEReqData, 200, true)}
                                        hideRoot={true}
                                    /> : (technical.tEReqData || "no request data") }
                                </small>
                            </div>
                            :
                            <div className="request-line">
                                <strong>{technical.tSReqUrl}</strong>
                                {technical.tSReqData ? <small>{JSON.stringify(technical.tSReqData)}</small> : null }
                            </div>
                    }
                    {
                        expanded ?
                            <div className="response-line">
                                <hr/>
                                <div className="line line-url">
                                    <span>Response code:&nbsp;</span>
                                    <strong className={"code-" + request.dState.status.toLowerCase()}>{request.responseCode + " " + request.dState.text}</strong>
                                </div>
                                <div className="line line-data">
                                    <span>Response data: </span>
                                    <small style={{paddingRight: '15px'}}>
                                        <JSONTree
                                            data={JSONPreview(request.responseData, 200, true)}
                                            hideRoot={true}
                                        />
                                    </small>
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
}