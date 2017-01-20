import _ from 'lodash';
import {MaybeJSON} from './MaybeJSON';

export default function JSONPreview(json, mini, expandJsonLikeStrings) {
    return _.reduce(json, function(result, value, key) {
        if (_.isArray(value) || _.isObject(value)) {
            result[key] = JSONPreview(value, mini, expandJsonLikeStrings);
        } else if (_.isString(value)) {
            if (expandJsonLikeStrings) {
                let obj = MaybeJSON(value);
                if (_.isObject(obj)) {
                    result[key] = JSONPreview(obj, mini, expandJsonLikeStrings);
                    return result;
                }
            }
            if (_.isNumber(mini) && mini < value.length) {
                value = value.substring(0, mini) + " ...";
            }
            result[key] = value;
        }
        return result;
    }, _.isArray(json) ? [] : {})
}