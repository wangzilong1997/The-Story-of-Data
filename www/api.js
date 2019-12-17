/**
 * @author wangzilong
 * @date 2019/12/17 10:47
 */
const iconv = require('iconv-lite');
var Api = {
    weather:function (app,weather,cp) {
        app.get('/weather',function(req,res){
            res.status(200);
            console.log(typeof(weather))
            //第一次过来的时候执行第一部分
            if(weather instanceof Object){
                cp.exec('python weather.py',{encoding: 'utf-8'},(err,stdout,stderr)=>{
                    stdout = iconv.decode(stdout, 'utf-8');
                    if(err) console.log('stderr',err);
                    console.log(stdout)
                    if(stdout) weather=stdout
                    console.log(typeof(weather));
                    res.json({weather})

                })
            }
            else{
                console.log('String执行');
                res.json({weather});
            }

        });
    },
    handlebars:function (app,num) {
        app.get('/handlebars',function(req,res){
            res.status(200);
            res.json({num})
        });
    }
}
module.exports = Api;