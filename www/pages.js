/**
 * @author wangzilong
 * @date 2019/12/16 17:05
 */
Pages =  {
    main: function (app,fortune,processes){
        app.get('/',function(req,res){
            res.render('home' ,{ fortune:fortune.getFortune(), processes:processes});
        });
    },
    start:function (app,fortune) {
        app.get('/start',function(req,res){
            res.render('start',{ fortune: fortune.getFortune() });
        });
    },
    qunar:function (app,__dirname) {
        app.get('/qunar',function(req,res){
            res.sendFile(__dirname + '/index.html');
        });
    },
    about:function (app) {
        app.get('/about',function(req,res){
            res.render('about');
        });
    },
    wangshuaishuai:function (app) {
        app.get('/wangshuaishuai',function(req,res){
            res.download(__dirname + '/resume/王子龙个人简历.pdf')
        });
    },
    i:function (app,__dirname) {
        app.get('/i',function(req,res){
            res.sendFile(__dirname + '/resume/index.html');
        });
    },



}
module.exports = Pages;