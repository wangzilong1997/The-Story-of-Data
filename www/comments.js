/**
 * @author wangzilong
 * @date 2019/12/17 11:28
 * 这个模块基本用不了
 */
var Comments = {
    commentsfrom:function (app) {
        app.get('/comments/form',(req,res) => {
            res.render('comform');
        });
    },
    comments:function (app,url) {
        app.get('/comments',(req,res) => {
            let com = url.parse(req.url,true)
            console.log(com)
            let pathname = com.pathname
            let query = com.query
            console.log(pathname)
            console.log(query)
            if (query.name) {
                var date = new Date();

                let time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                console.log(time)
                query.time = time
                comments.unshift(query);
            }
            res.statusCode = 302
            res.setHeader('location','/commentss')
            res.end()
        });
    },
    commentss:function (app) {
        app.get('/commentss',(req,res) => {
            res.render('comments',{comments:comments});
        });
    }
}

module.exports = Comments;