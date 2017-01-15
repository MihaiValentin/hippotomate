import Commands from './protocol/Commands';

export default function DetailedRequest(request) {
    let protocol = Commands.getProtocol(request);

    let state = {};
    if (protocol.ownCommand) {
        state.text = 'Success';
        state.status = 'OWN';
    } else {
        if (request._requested) {
            state.text = 'In progress';
            state.status = 'PROGRESS';
        } else if (request.responseCode < 300) {
            state.text = 'Success';
            state.status = 'SUCCESS';
        } else {
            state.text = 'Failure';
            state.status = 'FAILURE';
        }
    }

    return Object.assign({}, request, {
        dState: state,
        dProtocol: protocol
    });
}