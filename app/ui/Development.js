import entries from '../data/Entries';
import {render} from './Window';

export function exposeInternals() {
    // export global utilities
    Object.assign(window, {
        hippo: {
            entries: entries,
            render: render
        }
    });

    // provide some demo data
    if (document.location.search.indexOf('demo') > -1) {
        entries.demo();
    }
    if (document.location.search.indexOf('intro') > -1) {
        entries.intro = true;
        entries.introData = {
            appPort: 9020,
            serverHostname: '127.0.0.1',
            serverPort: 4444,
            serverPath: '/wd/hub'
        }
    }
}