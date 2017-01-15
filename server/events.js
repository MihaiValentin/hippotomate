/**
 * Register events that can be received from the front-end
 */

const {ipcMain} = require('electron');

const event_client_connect = require('./events/client_connect');
const event_command = require('./events/command');
const event_command_method_url = require('./events/command_method_url');
const event_debug_continue = require('./events/debug_continue');
const event_debug_next = require('./events/debug_next');

[
    event_client_connect,
    event_command,
    event_command_method_url,
    event_debug_continue,
    event_debug_next
].forEach((event) => {
    ipcMain.on(event.event, event.action);
});