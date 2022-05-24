function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}
var mockResponse = [{
        id: 1,
        name: 'Sandra',
        type: 'user',
        username: 'sandra'
    },
    {
        id: 2,
        name: 'John',
        type: 'admin',
        username: 'johnny2'
    },
    {
        id: 3,
        name: 'Peter',
        type: 'user',
        username: 'pete'
    },
    {
        id: 4,
        name: 'Bobby',
        type: 'user',
        username: 'be_bob'
    }
];

var mockRequest = [{
        id: 3
    }, {
        name: 'Peter'
    }, {
        type: 'user'
    }, {
        username: 'pete'
    }

];
const request = mockRequest.reduce(function (result, current) {
    return Object.assign(result, current);
}, {})

var props = Object.keys(request);

let condition = {}
if (props.length) {
    let groupCondition = props.reduce((a, v) => ({
        ...a,
        [v]: '$' + `${v}`
    }), {})
    let projectCondition = props.reduce((a, v) => ({
        ...a,
        [v]: '$' + '_id.' + `${v}`
    }), {})
    condition = {
        ...{
            "$group": {
                _id: {
                    groupCondition
                }
            }
        },
        ...{
            "$project": {
                _id: {
                    projectCondition
                }
            }
        },
    }

}
//get data from database
// const data = db.user.aggregate([
//    ...condition
// ])

//giả sử data lấy được từ database là mockResponse
var result = mockResponse.filter(function (o1) {
    return !deepEqual(o1, request)
}).map(function (o) {
    return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
    }, {});
});

console.log(result)