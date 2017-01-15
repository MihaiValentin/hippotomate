import {startListeningForEvents} from './events/Incoming';
import {render} from './ui/Window';
import {exposeInternals} from './ui/Development'; // just include it

// useful for development/debugging in Chrome/Electron app
exposeInternals();

// start listening from events received from the backend process
startListeningForEvents();

// render the user interface based on the application data
render();

// used to update the "last modified X minutes ago" and other periodical events
setInterval(() => {
    render();
}, 30000);