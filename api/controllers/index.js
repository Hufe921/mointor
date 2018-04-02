const http = require('http')
const logUtil = require('../log/util')
const indexServices = require('../core/services/index')
const APIError = require('../rest').APIError;
// throw new APIError('auth:index_not_found', 'index not found');错误实例
const ipAddress = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json'

module.exports = {
    // 响应时间记录
    'GET /api/postAction': async (ctx, next) => {
        const start = new Date();
        var ms;
        try {
            const data = ctx.query
            const ipMsg = await getCityByIp()
            const result = await indexServices.postAction(data, ipMsg)
            ctx.rest(result)
        } catch (error) {
            ms = new Date() - start;
            logUtil.logError(ctx, error, ms)
        }
    },
    // 错误记录
    'GET /api/postError': async (ctx, next) => {
        const start = new Date();
        var ms;
        try {
            const data = ctx.query
            const result = await indexServices.postError(data)
            ctx.rest(result)
        } catch (error) {
            ms = new Date() - start;
            logUtil.logError(ctx, error, ms)
        }
    },
    // 浏览器占比统计
    'GET /api/fromsStatic': async (ctx, next) => {
        const start = new Date();
        var ms;
        try {
            const result = await indexServices.fromsStatic()
            ctx.rest(result)
        } catch (error) {
            ms = new Date() - start;
            logUtil.logError(ctx, error, ms)
        }
    },
    // 页面响应时间统计
    'GET /api/actionsStatic': async (ctx, next) => {
        const start = new Date();
        var ms;
        try {
            const result = await indexServices.actionsStatic()
            ctx.rest(result)
        } catch (error) {
            ms = new Date() - start;
            logUtil.logError(ctx, error, ms)
        }
    },
    // 页面错误统计
    'GET /api/errorsStatic': async (ctx, next) => {
        const start = new Date();
        var ms;
        try {
            const result = await indexServices.errorsStatic()
            ctx.rest(result)
        } catch (error) {
            ms = new Date() - start;
            logUtil.logError(ctx, error, ms)
        }
    },
    // 根据时段获取错误详细信息
    'POST /api/getDetailError': [async (ctx, next) => {
        const start = new Date();
        var ms;
        try {
            const time = ctx.request.body.time
            const result = await indexServices.getDetailError(time)
            ctx.rest(result)
        } catch (error) {
            ms = new Date() - start;
            logUtil.logError(ctx, error, ms)
        }
    }],
     // 获取访客的地理位置
     'GET /api/placesStatic': async (ctx, next) => {
        const start = new Date();
        var ms;
        try {
            const result = await indexServices.placesStatic()
            ctx.rest(result)
        } catch (error) {
            ms = new Date() - start;
            logUtil.logError(ctx, error, ms)
        }
    }
};

// 根据ip地址获取城市位置
async function getCityByIp() {
    let msg = "";
    await new Promise((resolve, reject) => {
        http.get(ipAddress, function (res) {
            res.on("data", function (data) {
                msg += data;
            });
            res.on("end", function () {
                resolve(msg)
            })
        })
    })
    return unicodeToChinese(msg)
}

// unicode转中文
function unicodeToChinese(str) {
    return unescape(str.replace(/\\u/g, '%u'))
}