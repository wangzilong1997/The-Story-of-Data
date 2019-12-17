/**
 * @author wangzilong
 * @date 2019/12/17 10:00
 */
var Middleware = {
    404:function (app) {
        app.use(function(req,res){
            console.log("404被访问");
            res.status(404);
            res.render('404');
        });
    },
    500:function (app) {
        app.use(function(err,req,res,next){
            console.log("500被访问");
            console.error(err.stack);
            res.status(500);
            res.render('500');
        });
    },
    statics:function (app,express,__dirname) {
        app.use(express.static(__dirname + '/public'));
    },
    uploadDir:function (app,path,__dirname) {
        app.set('files',path.join(__dirname,'/public/files'));
    }
}

module.exports = Middleware;