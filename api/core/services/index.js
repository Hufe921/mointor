const Sequelize = require('sequelize');
const generic = require('../../utils/generic')
const model = require('../models/index')
const Op = Sequelize.Op
const ActionEntity = model.ActionEntity
const ErrorEntity = model.ErrorEntity

// 响应时间记录
async function postAction(data, ipMsg) {
    var guestAddress = JSON.parse(ipMsg)
    const actions = {
        whiteScreenTime: data.whiteScreenTime,
        readyTime: data.readyTime,
        allLoadTime: data.allLoadTime,
        mobile: data.mobile,
        nowTime: new Date(Number(data.nowTime)),
        country: guestAddress.country,
        province: guestAddress.province,
        city: guestAddress.city
    }
    var result = await ActionEntity.create(actions);
    return result
}

// 错误记录
async function postError(data) {
    const errors = {
        msg: data.msg,
        url: data.url,
        line: data.line,
        col: data.col,
        nowTime: new Date(Number(data.nowTime))
    }
    var result = await ErrorEntity.create(errors);
    return result
}

// 浏览器占比统计
async function fromsStatic() {
    const dayBreak = generic.divideTime()[0]
    const now = new Date()
    let originResult = await ActionEntity.findAll({
        attributes: ['mobile'],
        where: {
            nowTime: {
                [Op.lt]: now,
                [Op.gt]: dayBreak
            }
        }
    });
    let result = {}
    originResult.map(c => c.mobile)
        .map(c => {
            if (c in result) {
                result[c]++
            } else {
                result[c] = 1
            }
        });

    return result
}

// 页面响应时间统计
async function actionsStatic() {
    const now = new Date()
    const dayBreak = generic.divideTime()[0]
    let originResult = await ActionEntity.findAll({
        attributes: ['whiteScreenTime', 'readyTime', 'allLoadTime', 'nowTime'],
        where: {
            nowTime: {
                [Op.lt]: now,
                [Op.gt]: dayBreak
            }
        }
    });
    return originResult
}

// 页面错误量统计
async function errorsStatic() {
    const now = new Date()
    const time = generic.divideTime()
    let originResult = await ErrorEntity.findAll({
        attributes: ['msg', 'url', 'line', 'col', 'nowTime'],
        where: {
            nowTime: {
                [Op.lt]: now,
                [Op.gt]: time[0]
            }
        }
    });
    let result = {
        '00:00-04:00': 0,
        '04:00-08:00': 0,
        '08:00-12:00': 0,
        '12:00-16:00': 0,
        '16:00-20:00': 0,
        '20:00-24:00': 0
    }
    originResult.forEach(c => {
        if (c.nowTime > time[0] && c.nowTime < time[1]) {
            result['00:00-04:00']++
        } else if (c.nowTime > time[1] && c.nowTime < time[2]) {
            result['04:00-08:00']++
        } else if (c.nowTime > time[2] && c.nowTime < time[3]) {
            result['08:00-12:00']++
        } else if (c.nowTime > time[3] && c.nowTime < time[4]) {
            result['12:00-16:00']++
        } else if (c.nowTime > time[4] && c.nowTime < time[5]) {
            result['16:00-20:00']++
        } else {
            result['20:00-24:00']++
        }
    })

    return result
}

// 根据时段获取错误详细信息
async function getDetailError(time) {
    const divideTime = generic.divideTime()
    let timeArea = {
        lt: '',
        gt: ''
    }
    switch (time) {
        case '00:00-04:00':
            timeArea.gt = divideTime[0]
            timeArea.lt = divideTime[1]
            break;
        case '04:00-08:00':
            timeArea.gt = divideTime[1]
            timeArea.lt = divideTime[2]
            break;
        case '08:00-12:00':
            timeArea.gt = divideTime[2]
            timeArea.lt = divideTime[3]
            break;
        case '12:00-16:00':
            timeArea.gt = divideTime[3]
            timeArea.lt = divideTime[4]
            break;
        case '16:00-20:00':
            timeArea.gt = divideTime[4]
            timeArea.lt = divideTime[5]
            break;
        case '20:00-24:00':
            timeArea.gt = divideTime[5]
            timeArea.lt = divideTime[6]
            break;
    }
    let result = await ErrorEntity.findAll({
        attributes: ['msg', 'url', 'line', 'col', 'nowTime'],
        where: {
            nowTime: {
                [Op.lt]: timeArea.lt,
                [Op.gt]: timeArea.gt
            }
        }
    });
    return result
}

// 获取访客地理位置数据
async function placesStatic() {
    const now = new Date()
    const dayBreak = generic.divideTime()[0]
    let originResult = await ActionEntity.findAll({
        attributes: ['country', 'province', 'city'],
        where: {
            nowTime: {
                [Op.lt]: now,
                [Op.gt]: dayBreak
            }
        }
    });
    let result = {}
    originResult.map(c => c.province)
        .map(c => {
            if (c in result) {
                result[c]++
            } else {
                result[c] = 1
            }
        });
    return result
}


module.exports = {
    postAction,
    postError,
    fromsStatic,
    actionsStatic,
    errorsStatic,
    getDetailError,
    placesStatic
}