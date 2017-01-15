/**
 * Initialize the communication channel from the server process to the front-end
 * `setIpc` is called at app's bootstrap, and after that the `send` method can
 * be used to send messages
 */

var ipcObj = null;

function setIpc(ipc) {
    ipcObj = ipc;
}

function send() {
    if (!ipcObj) {
        throw new Error("IPC not set yet, cannot send messages yet");
    }
    return ipcObj.send.apply(ipcObj, arguments);
}

exports.setIpc = setIpc;
exports.send = send;