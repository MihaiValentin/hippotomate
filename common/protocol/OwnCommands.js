import {MaybeJSON} from '../util/MaybeJSON';

export default class OwnCommands {
    static padder(cmdStr) {
        return '--' + cmdStr + ';';
    }

    static getOwnCommand(item, matchingCommand) {
        let ownCommand = null;
        //console.log('owncommand - identified element', matchingCommand.method, matchingCommand.url)
        if (matchingCommand.method === 'POST' && matchingCommand.url === '/session/:sessionId/element') {
            if (item.reqData.value.indexOf(this.padder(OwnCommands.DEBUGGER)) === 0) {
                ownCommand = {
                    type: OwnCommands.DEBUGGER
                };
            } else if (item.reqData.value.indexOf(this.padder(OwnCommands.LOGGER)) === 0) {
                let payload = item.reqData.value.substring(this.padder(OwnCommands.LOGGER).length);
                ownCommand = {
                    type: OwnCommands.LOGGER,
                    payload: MaybeJSON(payload)
                };
            }
        }
        return ownCommand;
    }
}

OwnCommands.DEBUGGER = 'debugger';
OwnCommands.LOGGER = 'logger';