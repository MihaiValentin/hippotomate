import extractSessionId from '../../common/util/extractSessionId';

/**
 * The central data store for the front-end of the app
 */
class Entries {

    constructor() {
        this.intro = false; // used to display connection settings step
        this.introData = undefined; // object containing connection details data
        this.list = []; // all the requests
        this.breakpoints = []; // breakpoints list (used for step by step func)
        this.expands = []; // manage expansion of the session in the UI
        this.full = null; // show screenshots/page source in a full screen
        this.deletedSessions = []; // the sessions deleted via the UI
        this.friendly = true; // friendly messages or technical messages
    }

    /**
     * Add a request/response to the list of the app
     * First, the request is added, and then when the response comes,
     * the initial request is updated, based on the uid. So, this function
     * supports adding both a request and a response, while normalizing it under
     * a single entity in the list[] array
     */
    add(request) {
        var exists = false;
        for(var i = 0; i< this.list.length; i++) {
            if (request.uid == this.list[i].uid) {
                exists = this.list[i];
                break;
            }
        }

        request.sessionId = extractSessionId(request);

        if (request.sessionId && this.deletedSessions.indexOf(request.sessionId) > -1) {
            return;
        }

        if (exists) {
            for (var k in request) {
                if (request.hasOwnProperty(k)) {
                    exists[k] = request[k];
                }
            }
            exists._respondedDate = new Date().getTime();
            delete exists._requested;
        } else {
            request._requested = true;
            request._requestedDate = new Date().getTime();
            this.list.push(request);
        }
    };

    breakpoint(sessionId) {
        var idx = this.breakpoints.indexOf(sessionId);
        if (idx === -1) {
            this.breakpoints.push(sessionId);
        }
    };

    getBreakpoints() {
        return this.breakpoints;
    }

    continue(sessionId) {
        var idx = this.breakpoints.indexOf(sessionId);
        if (idx > -1) {
            this.breakpoints.splice(idx, 1);
        }
    };

    /**
     * list[] keeps the request linear. This method returns the requests
     * groupped by the session id so they are easier to traverse and use
     * Besides the numerical sessions, there is also the "general" session
     * that refers to requests that are not bound to a specific session
     * Eg: POST /session is one of them, as it is not sent for a specific
     * session, but rather it creates a session
     */
    getGroupedBySession() {
        var map = {general:{items:[]}};
        for(var i = 0; i< this.list.length; i++) {
            if (this.list[i].sessionId) {
                if (!(this.list[i].sessionId in map)) {
                    map[this.list[i].sessionId] = {items: []};
                }
                map[this.list[i].sessionId].items.push(this.list[i]);
            } else {
                map['general'].items.push(this.list[i]);
            }
        }
        return map;
    };

    getList() {
        return this.list;
    };

    setExpand(sessionId, expand) {
        this.expands[sessionId] = expand;
        for(var i = 0; i < this.list.length; i++) {
            if (this.list[i].sessionId == sessionId && '_expanded' in this.list[i]) {
                delete this.list[i]._expanded;
            }
        }
    };

    getExpands() {
        return this.expands;
    }

    demo() {
        this.breakpoints = window.demo_breakpoints;
        this.list = window.demo_list;
    }
}

export default new Entries();