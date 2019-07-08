const countriesList = require('country-list').getData();
module.exports = {
    'secret': process.env.SECRET_KEY,
    'tokenExpiresIn': process.env.TOKEN_EXPIRES_IN,
    'apiVersion': 'api/v1/',
    'roles': Object.freeze({
        admin: 'admin',
        user: 'user'
    }),
    'userStatuses': Object.freeze({
        active: 'active',
        stopped: 'stopped'
    }),
    'entitiesStatuses': Object.freeze({
        active: 'active',
        stopped: 'stopped'
    }),
    'frequencyCaps': [
        { label: '0 min', value: 0 },
        { label: '1 min', value: 60000 },
        { label: '1 hr', value: 3600000 },
        { label: '6 hr', value: 21600000 },
        { label: '12 hr', value: 43200000 },
        { label: '24 hr', value: 86400000 },
        { label: '72 hr', value: 259200000 },
        { label: '168 hr', value: 604800000 }
    ],
    countriesList,
    osList: [
        { name: "Mac", code: "mac" },
        { name: "Linux", code: "linux" },
        { name: "Windows", code: "win" },
        { name: "Open/FreeBSD", code: "openbsd" },
        { name: "Chrome OS", code: "cros" },
        { name: "Android", code: "android" }
    ],
    browsersList: [
        { name: "Chrome", code: "chrome" },
        { name: "Firefox", code: "firefox" },
        { name: "Opera", code: "opera" },
        { name: "Edge", code: "edge" },
        { name: "IE", code: "ie" }
    ]
};