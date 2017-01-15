export default function Technical(request) {

    let sReqUrl = request.reqUrl.replace(/.*?\/session\/[0-9-a-fA-F]+\//g, '/');
    if (request.dProtocol.connection && request.dProtocol.connection.type === 'element') {
        sReqUrl = sReqUrl.replace(/\/element\/([0-9]+)/, (m) => {
            return '/element/' + request.dProtocol.connection.target.reqData.value;
        });
    }
    sReqUrl = request.reqMethod + " " + sReqUrl;

    let eReqUrl = request.reqMethod + " " + request.reqUrl;

    let reqData;
    if (request.dProtocol.ownCommand) {
        if (request.dProtocol.ownCommand.type === 'logger') {
            reqData = request.dProtocol.ownCommand.payload;

            sReqUrl = eReqUrl = "Logging";
        } else if (request.dProtocol.ownCommand.type === 'debugger') {
            sReqUrl = eReqUrl = "Started debugging";
        }
    } else {
        reqData = request.reqData;
    }
    let sReqData = reqData, eReqData = reqData;

    return Object.assign({}, request, {
        tSReqUrl: sReqUrl,
        tEReqUrl: eReqUrl,
        tSReqData: sReqData,
        tEReqData: eReqData
    });
}