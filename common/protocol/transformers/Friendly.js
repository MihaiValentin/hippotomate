export default function Friendly(request) {

    let reqUrl;
    let reqData;
    if (request.dProtocol.ownCommand) {
        if (request.dProtocol.ownCommand.type === 'logger') {
            reqData = request.dProtocol.ownCommand.payload;

            reqUrl = "Logging";
        } else if (request.dProtocol.ownCommand.type === 'debugger') {
            reqUrl = "Started debugging";
        }
    } else if (_.isFunction(request.dProtocol.command.requestLabel)) {
        reqUrl = request.dProtocol.command.requestLabel(request, request.dProtocol.urlParams, request.dProtocol.connection);
    } else {
        reqUrl = request.dProtocol.command.requestLabel;
    }

    return Object.assign({}, request, {
        fReqUrl: reqUrl,
        fReqData: reqData
    });
}