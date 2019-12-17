/**
 * @author wangzilong
 * @date 2019/12/16 17:28
 */
const schedule = require('node-schedule');
var Schedule = {
    scheduleweather:function (weather) {
        //每天每小时执行
        schedule.scheduleJob('30 0 * * * *', () => {
            console.log(weather);
            weather = [];
            console.log('schedule执行：' + new Date());
        });
    },


}
module.exports = Schedule;