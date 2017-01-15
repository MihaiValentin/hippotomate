import React from 'react';
import { render as RenderDOM } from 'react-dom';

import Intro from './Intro';
import Root from './Root';
import Full from './Full';
import License from './License';
 
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import '../styles.less';
import 'font-awesome/css/font-awesome.min.css';

import entries from '../data/Entries';

import {productName} from '../product/product';

document.head.querySelector('title').innerText = productName;

/**
 * Run the fn() function, and then re-render to update the UI
 * To be migrated to Redux in the future
 * @param fn
 */
export function render(fn = function(){}) {
    fn();
    console.time('rendering');
    if (entries.intro) {
        RenderDOM(
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                {localStorage.getItem('hippotomateLicenseAccepted') ? <Intro errors={entries.introErrors} data={entries.introData} /> : <License />}
            </MuiThemeProvider>, document.getElementById('root'));
    } else {
        RenderDOM(<MuiThemeProvider muiTheme={getMuiTheme()}>
            <Root full={entries.full} expands={entries.getExpands()} friendly={entries.friendly} breakpoints={entries.getBreakpoints()} store={entries.getGroupedBySession()} />
        </MuiThemeProvider>, document.getElementById('root'));
        RenderDOM(<MuiThemeProvider muiTheme={getMuiTheme()}>
            <Full data={entries.full} />
        </MuiThemeProvider>, document.getElementById('full'));
    }
    console.timeEnd('rendering');
}