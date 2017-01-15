exports.default = [
    {
        method: 'GET',
        url: '/status',
        returns: 'object',
        requestLabel: "Get the server's status"
    },
    {
        method: 'POST',
        url: '/session',
        jsonParams: [
            {
                type: 'desiredCapabilities',
                dataType: 'object'
            },
            {
                type: 'requiredCapabilities',
                dataType: 'object',
                optional: true
            }
        ],
        returns: 'object',
        requestLabel: (item) => {
            let browsers = {
                'firefox': 'Mozilla Firefox',
                'chrome': 'Google Chrome',
                'iexplore': 'Internet Explorer',
                'googlechrome': 'Google Chrome',
                'safari': 'Safari',
                'opera': 'Opera'
            };
            let browserName = "";
            try {
                browserName = item.reqData.desiredCapabilities.browserName;
                browserName = browsers[browserName] || selBn;
            } catch(e) {}

            return "Creating a new session using " + browserName;
        }
    },
    {
        method: 'GET',
        url: '/sessions',
        returns: 'array',
        requestLabel: "Get the active sessions on the server"
    },
    {
        method: 'GET',
        url: '/session/:sessionId',
        returns: 'object',
        requestLabel: "Get the capabilities for the current session"
    },
    {
        method: 'DELETE',
        url: '/session/:sessionId',
        returns: 'object',
        requestLabel: "Delete the current session"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/timeouts',
        jsonParams: [
            {
                type: 'type',
                values: ['script', 'implicit', 'page load']
            },
            {
                type: 'ms',
                dataType: 'number'
            }
        ],
        returns: 'object',
        requestLabel: (item) => {
            return "Set timeout for " + item.reqData.type + " to " + item.reqData.ms + " ms";
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/timeouts/async_script',
        jsonParams: [
            {
                type: 'ms',
                dataType: 'number'
            }
        ],
        returns: 'object',
        requestLabel: (item) => {
            return "Set timeout for executing async_scripts to " + item.reqData.ms + " ms";
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/timeouts/implicit_wait',
        jsonParams: [
            {
                type: 'ms',
                dataType: 'number'
            }
        ],
        returns: 'object',
        requestLabel: (item) => {
            return "Set timeout for searching for elements to " + item.reqData.ms + " ms";
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/window_handle',
        returns: 'string',
        requestLabel: "Get the current window handle",
        label: "Get window handle"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/window_handles',
        returns: 'array',
        requestLabel: "Get all the window handles for the current session",
        label: "Get all window handles"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/url',
        returns: 'string',
        requestLabel: "Get the current url",
        label: "Get the current url"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/url',
        jsonParams: [
            {
                type: 'url',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item) => {
            return "Navigate to " + item.reqData.url;
        },
        label: 'Go to another URL'
    },
    {
        method: 'POST',
        url: '/session/:sessionId/forward',
        returns: 'string',
        requestLabel: "Navigate forward, if possible",
        label: "Forward"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/back',
        returns: 'string',
        requestLabel: "Navigate back, if possible",
        label: "Back"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/refresh',
        returns: 'string',
        requestLabel: "Refresh page",
        label: "Refresh"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/execute',
        jsonParams: [
            {
                type: 'script',
                dataType: 'string'
            },
            {
                type: 'args',
                dataType: 'array'
            }
        ],
        returns: 'string',
        requestLabel: "Execute a JS script in the page synchronously",
        label: "Execute JS script"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/execute_async',
        jsonParams: [
            {
                type: 'script',
                dataType: 'string'
            },
            {
                type: 'args',
                dataType: 'array'
            }
        ],
        returns: 'string',
        requestLabel: "Execute a JS script in the page asynchronously",
        label: "Execute JS script asynchronously"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/screenshot',
        returns: 'string',
        requestLabel: "Take screenshot of the current page"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/ime/available_engines',
        returns: 'string',
        requestLabel: "Get all the engines available on the machine"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/ime/active_engine',
        returns: 'string',
        requestLabel: "Get the name of the active IME engine"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/ime/activated',
        returns: 'string',
        requestLabel: "Get whether IME input is active at the moment"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/ime/deactivate',
        returns: 'string',
        requestLabel: "De-activates the currently-active IME engine."
    },
    {
        method: 'POST',
        url: '/session/:sessionId/ime/activate',
        jsonParams: [
            {
                type: 'engine',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item) => {
            return "Activate the " + item.reqData.engine + " IME engine";
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/frame',
        jsonParams: [
            {
                type: 'id',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item) => {
            return "Focus frame with id: " + item.reqData.id;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/frame/parent',
        returns: 'string',
        requestLabel: "Change the focus back to the parent"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/window',
        jsonParams: [
            {
                type: 'name',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item) => {
            return "Change focus to window with name: " + item.reqData.name;
        }
    },
    {
        method: 'DELETE',
        url: '/session/:sessionId/window',
        returns: 'string',
        requestLabel: "Close the current window"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/window/:windowHandle/size',
        jsonParams: [
            {
                type: 'width',
                dataType: 'number'
            },
            {
                type: 'height',
                dataType: 'number'
            }
        ],
        returns: 'string',
        requestLabel: (item) => {
            return "Change the size of window to :" + item.reqData.width + " x " + item.reqData.height;
        },
        label: "Resize window"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/window/:windowHandle/size',
        returns: 'string',
        requestLabel: "Get size of window",
        label: "Get window size"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/window/:windowHandle/position',
        jsonParams: [
            {
                type: 'x',
                dataType: 'number'
            },
            {
                type: 'y',
                dataType: 'number'
            }
        ],
        returns: 'string',
        requestLabel: (item) => {
            return "Change the position of window to (" + item.reqData.x + ", " + item.reqData.y + ")";
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/window/:windowHandle/position',
        returns: 'string',
        requestLabel: "Get position of window"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/window/:windowHandle/maximize',
        returns: 'string',
        requestLabel: "Maximize the window",
        label: "Maximize window"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/cookie',
        returns: 'string',
        requestLabel: "Get all cookies",
        label: "Get all cookies"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/cookie',
        jsonParams: [
            {
                type: 'cookie',
                dataType: 'object'
            }
        ],
        returns: 'string',
        requestLabel: "Set a cookie",
        label: "Set a cookie"
    },
    {
        method: 'DELETE',
        url: '/session/:sessionId/cookie',
        returns: 'string',
        requestLabel: "Delete all cookies"
    },
    {
        method: 'DELETE',
        url: '/session/:sessionId/cookie/:name',
        returns: 'string',
        requestLabel: (item, urlParams) => {
            return "Delete the cookie named " + urlParams.name;
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/source',
        returns: 'string',
        requestLabel: "Get the HTML source of the page",
        label: "Get HTML source"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/title',
        returns: 'string',
        requestLabel: "Get the title of the page",
        label: "Get page title"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/element',
        jsonParams: [
            {
                type: 'using',
                values: ['class name', 'css selector', 'id', 'name', 'link text', 'partial link text', 'tag name', 'xpath']
            },
            {
                type: 'value',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item) => {
            return "Searching for a single element using " + item.reqData.using + ", " + item.reqData.value;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/elements',
        jsonParams: [
            {
                type: 'using',
                values: ['class name', 'css selector', 'id', 'name', 'link text', 'partial link text', 'tag name', 'xpath']
            },
            {
                type: 'value',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item) => {
            return "Searching for elements using " + item.reqData.using + ", " + item.reqData.value;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/element/active',
        returns: 'string',
        requestLabel: "Get the active element in the page"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/element/:id/element',
        jsonParams: [
            {
                type: 'using',
                values: ['class name', 'css selector', 'id', 'name', 'link text', 'partial link text', 'tag name', 'xpath']
            },
            {
                type: 'value',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item, urlParams) => {
            return "Searching for a single element using " + item.reqData.using + ", " + item.reqData.value + ", starting from " + urlParams.id;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/element/:id/elements',
        jsonParams: [
            {
                type: 'using',
                values: ['class name', 'css selector', 'id', 'name', 'link text', 'partial link text', 'tag name', 'xpath']
            },
            {
                type: 'value',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item, urlParams) => {
            return "Searching for elements using " + item.reqData.using + ", " + item.reqData.value + ", starting from " + urlParams.id;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/element/:id/click',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Click the element " + connectedItem.target.reqData.value;
        },
        label: "Click an element"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/element/:id/submit',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Submits the element " + connectedItem.target.reqData.value;
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/text',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Get the visible text for the element " + connectedItem.target.reqData.value;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/element/:id/value',
        jsonParams: [
            {
                type: 'value',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            let val = item.reqData.value[0];
            if (val.length === 1 && (val.charCodeAt(0) === 57350 || val.charCodeAt(0) === 57351)) {
                val = "Enter key";
            }
            return "Send keys '"+val+"' to the element " + connectedItem.target.reqData.value;
        },
        label: "Set value to element"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/keys',
        jsonParams: [
            {
                type: 'value',
                dataType: 'string'
            }
        ],
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Send keys '"+item.reqData.value+"' to the active element";
        },
        label: "Send text to element"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/name',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Gets the tag name for the element " + connectedItem.target.reqData.value;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/element/:id/clear',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Clears the element " + connectedItem.target.reqData.value;
        },
        label: "Clear element"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/selected',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Check if the element " + connectedItem.target.reqData.value + " is currently selected";
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/enabled',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Check if the element " + connectedItem.target.reqData.value + " is currently enabled";
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/attribute/:name',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Get the '"+urlParams.name+"' attribute's value for the element " + connectedItem.target.reqData.value;
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/equals/:other',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Check if two elements are the same. The first one is " + connectedItem.target.reqData.value;
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/displayed',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Check if the element " + connectedItem.target.reqData.value + " is displayed";
        },
        label: 'Is element displayed/visible?'
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/location',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Get the location of the element " + connectedItem.target.reqData.value;
        },
        label: 'Get element location'
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/location_in_view',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Get the location in view of the element " + connectedItem.target.reqData.value;
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/size',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Get the size of the element " + connectedItem.target.reqData.value;
        },
        label: 'Get element size'
    },
    {
        method: 'GET',
        url: '/session/:sessionId/element/:id/css/:propertyName',
        returns: 'string',
        requestLabel: (item, urlParams, connectedItem) => {
            return "Get the css property '"+urlParams.propertyName+"' of the element " + connectedItem.target.reqData.value;
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/orientation',
        returns: 'string',
        requestLabel: "Get the current orientation"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/orientation',
        jsonParams: [{
            type: 'orientation',
            values: ['PORTRAIT', 'LANDSCAPE']
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Set the current orientation to " + item.reqData.orientation;
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/alert_text',
        returns: 'string',
        requestLabel: "Get the text on the currently displayed alert"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/alert_text',
        jsonParams: [{
            type: 'text',
            dataType: 'string'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Send '" + item.reqData.text + "' to the currently displayed prompt";
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/accept_alert',
        returns: 'string',
        requestLabel: "Accept the current alert"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/dismiss_alert',
        returns: 'string',
        requestLabel: "Dismiss the current alert"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/moveto',
        jsonParams: [{
            type: 'element',
            dataType: 'string'
        }, {
            type: 'xoffset',
            dataType: 'number'
        }, {
            type: 'yoffset',
            dataType: 'number'
        }],
        returns: 'string',
        requestLabel: (item) => {
            // TODO here the element could come from element - concept better the connectedItems
            return "Move mouse to element to element " + item.reqData.element;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/click',
        jsonParams: [{
            type: 'button',
            values: [0, 1, 2]
        }],
        returns: 'string',
        requestLabel: "Click the mouse button at the current position"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/buttondown',
        jsonParams: [{
            type: 'button',
            values: [0, 1, 2]
        }],
        returns: 'string',
        requestLabel: "Mouse button down at the current position"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/buttonup',
        jsonParams: [{
            type: 'button',
            values: [0, 1, 2]
        }],
        returns: 'string',
        requestLabel: "Mouse button up at the current position"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/doubleclick',
        returns: 'string',
        requestLabel: "Double click at the current coordinates"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/touch/click',
        jsonParams: [{
            type: 'element',
            dataType: 'string'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Tap the element '" + item.reqData.element + "' (on the touch enabled device)";
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/touch/down',
        jsonParams: [{
            type: 'x',
            dataType: 'number'
        },{
            type: 'y',
            dataType: 'number'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Finger down on the screen at ("+[item.reqData.x,item.reqData.y].join(", ")+") (on the touch enabled device)";
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/touch/up',
        jsonParams: [{
            type: 'x',
            dataType: 'number'
        },{
            type: 'y',
            dataType: 'number'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Finger up on the screen at ("+[item.reqData.x,item.reqData.y].join(", ")+") (on the touch enabled device)";
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/touch/move',
        jsonParams: [{
            type: 'x',
            dataType: 'number'
        },{
            type: 'y',
            dataType: 'number'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Finger move on the screen at ("+[item.reqData.x,item.reqData.y].join(", ")+") (on the touch enabled device)";
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/touch/scroll',
        jsonParams: [{
            type: 'element',
            dataType: 'string'
        }, {
            type: 'xoffset',
            dataType: 'number'
        }, {
            type: 'yoffset',
            dataType: 'number'
        }],
        returns: 'string',
        requestLabel: (item) => {
            // TODO here the element could come from element - concept better the connectedItems
            return "Scroll on the screen to element " + item.reqData.element;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/touch/doubleclick',
        jsonParams: [{
            type: 'element',
            dataType: 'string'
        }],
        returns: 'string',
        requestLabel: (item) => {
            // TODO here the element could come from element - concept better the connectedItems
            return "Double tap on the element " + item.reqData.element;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/touch/longclick',
        jsonParams: [{
            type: 'element',
            dataType: 'string'
        }],
        returns: 'string',
        requestLabel: (item) => {
            // TODO here the element could come from element - concept better the connectedItems
            return "Long tap on the element " + item.reqData.element;
        }
    },
    {
        method: 'POST',
        url: '/session/:sessionId/touch/flick',
        jsonParams: [{
            type: 'element',
            dataType: 'string'
        }, {
            type: 'xoffset',
            dataType: 'number'
        }, {
            type: 'yoffset',
            dataType: 'number'
        }, {
            type: 'speed',
            dataType: 'number'
        }],
        returns: 'string',
        requestLabel: (item) => {
            // TODO here the element could come from element - concept better the connectedItems
            return "Flick on the screen to element " + item.reqData.element;
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/location',
        returns: 'string',
        requestLabel: "Get the current geo-location"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/location',
        jsonParams: [{
            type: 'location',
            dataType: 'object'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Set the location to (lat, lon, alt) = ("+[item.reqData.location.latitude,item.reqData.location.longitude,item.reqData.location.altitude].join(", "),+")";
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/local_storage',
        returns: 'string',
        requestLabel: "Get all the keys of the local storage"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/local_storage',
        jsonParams: [{
            type: 'key',
            dataType: 'string'
        }, {
            type: 'value',
            dataType: 'string'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Set local storage key '" + item.reqData.key + "' to value '" + item.reqData.value + "'";
        }
    },
    {
        method: 'DELETE',
        url: '/session/:sessionId/local_storage',
        returns: 'string',
        requestLabel: "Delete all the keys of the local storage"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/local_storage/key/:key',
        returns: 'string',
        requestLabel: (item, urlParams) => {
            return "Get the value of the key '" + urlParams.key + "' of the local storage";
        }
    },
    {
        method: 'DELETE',
        url: '/session/:sessionId/local_storage/key/:key',
        returns: 'string',
        requestLabel: (item, urlParams) => {
            return "Delete the key '" + urlParams.key + "' of the local storage";
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/local_storage/size',
        returns: 'string',
        requestLabel: "Get the number of the items in the local storage"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/session_storage',
        returns: 'string',
        requestLabel: "Get all the keys of the session storage"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/session_storage',
        jsonParams: [{
            type: 'key',
            dataType: 'string'
        }, {
            type: 'value',
            dataType: 'string'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Set session storage key '" + item.reqData.key + "' to value '" + item.reqData.value + "'";
        }
    },
    {
        method: 'DELETE',
        url: '/session/:sessionId/session_storage',
        returns: 'string',
        requestLabel: "Delete all the keys of the session storage"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/session_storage/key/:key',
        returns: 'string',
        requestLabel: (item, urlParams) => {
            return "Get the value of the key '" + urlParams.key + "' of the session storage";
        }
    },
    {
        method: 'DELETE',
        url: '/session/:sessionId/session_storage/key/:key',
        returns: 'string',
        requestLabel: (item, urlParams) => {
            return "Delete the key '" + urlParams.key + "' of the session storage";
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/session_storage/size',
        returns: 'string',
        requestLabel: "Get the number of the items in the session storage"
    },
    {
        method: 'POST',
        url: '/session/:sessionId/log',
        jsonParams: [{
            type: 'type',
            dataType: 'string'
        }],
        returns: 'string',
        requestLabel: (item) => {
            return "Get the log for the type '" + item.reqData.type + "'";
        }
    },
    {
        method: 'GET',
        url: '/session/:sessionId/log/types',
        returns: 'string',
        requestLabel: "Get available log types"
    },
    {
        method: 'GET',
        url: '/session/:sessionId/application_cache/status',
        returns: 'string',
        requestLabel: "Get the status of the html5 application cache"
    }
];