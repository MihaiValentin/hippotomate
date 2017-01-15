var ipc = require("electron").ipcRenderer;
import entries from '../data/Entries';
import {render} from '../ui/Window';

/**
 * Wait for events from the backend part of the app, and update the data on the
 * front-end accordingly
 */
export function startListeningForEvents() {

    // when a request is being caught by the backend, add it to the list
    ipc.on('request', function(ev, payload) {
        entries.add(payload);
        render();
    });

    // when a response is being caught by the backend, add it to the list
    ipc.on('response', function(ev, payload) {
        entries.add(payload);
        render();
    });

    // when a debug_start is caught, update the frontend and also ask for a
    // screenshot
    ipc.on('DEBUG_START', function(ev, payload) {
        entries.breakpoint(payload.sessionId);
        render();

        ipc.send("COMMAND", {
            sessionId: payload.sessionId,
            command: 'screenshot',
            hide: true
        });
    });

    // for every command that has been executed from the front-end, also
    // run a screenshot command to update the UI
    ipc.on('COMMAND_EXECUTED', function(ev, payload) {
        ipc.send("COMMAND", {
            sessionId: payload.sessionId,
            command: 'screenshot',
            hide: true
        });
    });

    // stop debugging and continue with execution
    ipc.on('continue', function(ev, payload) {
        entries.continue(payload.sessionId);
        render();
    });

    // backend sends the default connection settings at the beginning of the app
    ipc.on('settings', function(ev, payload) {
        entries.intro = true;
        entries.introData = payload;
        render();
    });

    // when the backend part connected successfully (or not) to the server
    ipc.on('SERVER_CONNECT', function(ev, payload) {
        if (payload.errors) {
            entries.introErrors = payload.errors;
        } else {
            entries.intro = false;
        }
        render();
    });

}