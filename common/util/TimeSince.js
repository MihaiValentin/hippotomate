export default function TimeSince(dt, precise) {
    let diff = parseInt((new Date().getTime() - dt) / 1000, 10);

    if (precise && diff < 3600) {
        var minutes = Math.floor(diff / 60);
        var seconds = diff - minutes * 60;
        return minutes + " minute(s) and " + seconds + " second(s)";
    }

    let moments = {
        0: "now",
        20: "few moments ago",
        60: "a minute ago",
        300: "few minutes ago",
        1800: "half an hour ago",
        3600: "an hour ago",
        7200: "? hours ago"
    };

    let result;

    for(var key in moments) {
        if (moments.hasOwnProperty(key)) {
            if (diff >= key) {
                result = moments[key];
            }
        }
    }

    result = result.replace('?', Math.floor(diff / 3600));

    return result;
}