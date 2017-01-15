import _ from 'lodash';
import OwnCommands from './OwnCommands';
let CommandsList = require('../CommandsList').default;
import entries from '../../app/data/Entries';

export default class Commands {
    static getConnectedItem(item, items) {
        let elementId;
        if (elementId = item.reqUrl.match(/\/element\/([0-9]+)/)) {
            return _.find(items, (search) => {
                let isSameSessionId = search.sessionId === item.sessionId
                let isPost = search.reqMethod === 'POST';
                let isFindElement = search.reqUrl.endsWith('/element');
                if (isSameSessionId && isPost && isFindElement && search.responseData.value.ELEMENT == elementId[1]) {
                    return true;
                }
                return false;
            });
        }
    }
    static matchPattern(pattern, data) {
        var matchedUrlParams = [];
        var patRegex = new RegExp(pattern.replace(/:[a-zA-Z0-9-]+/g, function(m) {
            matchedUrlParams.push(m);
            return "([^/]+)";
        }) + "$");
        var matches = data.match(patRegex);
        if (!matches) {
            return null;
        }
        var urlParamsValues = {};
        matchedUrlParams.forEach(function(matchedUrlParam, matchedIndex) {
            urlParamsValues[matchedUrlParam] = matches[matchedIndex + 1];
        });
        return urlParamsValues;
    }
    static getProtocol(item) {
        // protocol commands
        let matchingCommand = Commands.getMatchingCommand(item);
        if (!matchingCommand) {
            return null;
        }
        // urlParams
        let urlParams = this.matchPattern(matchingCommand.url, item.reqUrl);
        // custom own command
        let ownCommand = OwnCommands.getOwnCommand(item, matchingCommand);
        // connected commands
        let connectedItem = Commands.getConnectedItem(item, entries.list);
        let connection;
        if (connectedItem) {
            connection = {
                type: 'element',
                target: connectedItem
            };
        }
        return {
            command: matchingCommand,
            urlParams,
            ownCommand,
            connection
        };
    }
    static getMatchingCommand(item) {
        return _.find(CommandsList, (command) => {
            if (item.reqMethod !== command.method) {
                return false;
            }
            if (!item.reqUrl.endsWith(command.url) && command.url.indexOf(':') === -1) {
                return false;
            }
            let urlParams = Commands.matchPattern(command.url, item.reqUrl);
            if (!urlParams) {
                return false;
            }
            return true;
        }) || {
                requestLabel: "This may be a custom method!" // TODO fix this!
            };
    }
}