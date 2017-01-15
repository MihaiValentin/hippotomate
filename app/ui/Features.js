import React from 'react';
import entries from '../data/Entries';
import {render} from './Window';

/**
 * Provides the small buttons for things like screenshots, page source, etc
 */
export default class Features extends React.Component {
    renderButton(icon, label, tooltip, onClick) {
        return <a key={label} href="#" {...this.getIconButtonAttributes(icon)}
            onClick={(e) => { onClick(); return false; }}
            title={tooltip}
        >{this.props.mini ? "" : <div>{label}</div>}</a>
    }
    getIconButtonAttributes(icon) {
        let attrs = {
            style: {
                marginLeft: '8px'
            },
            className: "fa fa-" + icon
        };
        if (icon === 'ellipsis-h') {
            attrs.style = Object.assign(attrs.style, {
                border: '1px solid #aaa',
                color: '#aaa',
                background: '#fff'
            })
        }
        return attrs;
    }
    render() {
        return this.props.request._requested ? null : <div>{this.renderButtons(this.props.request)}</div>;
    }
    renderButtons(item) {
        let features = [];
        if (!item.dProtocol.ownCommand) {
            if(item.responseCode === 500) {
                var screen = (item.responseData.value.screen)
            }
            if(item.reqUrl.indexOf("/screenshot") > -1 && !item._requested){
                var screen = item.responseData.value;
            }
            if (item.reqUrl.indexOf('/source') > -1 && !item._requested) {
                var source = item.responseData.value;
            }
        }
        if (screen) {
            features.push(
                this.renderButton("camera", "View screenshot", "View screenshot captured in this request", () => {
                    render(() => {entries.full = {screenshot: screen};});
                })
            );
        }
        if (source) {
            features.push(
                this.renderButton("code", "View page source", "View page HTML source", () => {
                    render(() => {entries.full = {source: source};});
                })
            );
        }

        features.push(
            this.renderButton("ellipsis-h", "View raw request", "View raw request data", () => {
                render(() => {entries.full = {raw: item};});
            })
        );

        return features;
    }
}