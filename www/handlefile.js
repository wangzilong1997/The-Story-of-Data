/**
 * @author wangzilong
 * @date 2019/12/17 10:45
 */
//图片文件上传部分
var formidable = require('formidable')
var Handlefile = {
    chatrecord:function (app,name,fs,cp) {
        app.post('/chatrecord/:year/:month',function(req,res){
            var form = new formidable.IncomingForm();
            form.uploadDir = './public/files';
            form.parse(req,function(err,fields,files){
                console.log(fields)
                console.log(fields.name)
                console.log(files.txt.name)
                console.log(files.txt.lastModifiedDate)
                console.log(files)
                name = fields.name
                if(err) return res.redirect(303,'/error');
                let filepath = files.txt.path
                //基于windows 开发的修改
                let file = filepath.split('/').length == 1?filepath.split('\\'):filepath.split('/');

                setTimeout(()=>{
                    fs.unlink(filepath,(err)=>{
                        if(err) {
                            throw err;
                        }
                        console.log('成功删除了'+filepath)
                    });
                    fs.unlink('views/userfile/'+file[2]+'.handlebars',(err)=>{
                        if(err){
                            throw err;
                        }
                        console.log('成功删除了views/userfile/'+file[2]+'.handlebars')
                    });
                },1000 * 600)
                var processdate  = new Date();
                let oneprocess = {}
                oneprocess.filename = files.txt.name
                oneprocess.fileid = file[2]
                oneprocess.ontime = processdate.getHours()+':'+processdate.getMinutes()+':'+processdate.getSeconds()

                cp.exec('python two.py '+name+' '+filepath,(err,stdout,stderr)=>{
                    if(err) console.log('stderr',err)
                    if(stdout) console.log('stdout',stdout)
                    console.log(file[2] + '当前用户处理程序完成')
                    console.log(filepath)
                    res.redirect(303,'/thank-you?userid=' +	file[2] + '#thankyou')
                });
            })
        });
    },
    thankyou:function (app) {
        app.get('/thank-you',function(req,res){
            console.log(req.query.userid)
            res.render('thank-you',{userid:req.query.userid});
        });
    },
    process:function (app) {
        app.get('/process',function(req,res){
            console.log(req.query.userid)
            res.render('userfile/'+req.query.userid,{bodynamehave:666})
        });
    },
    processes:function (app) {
        app.get('/processes',function(req,res){
            res.render('home',{processes:processes});
        });

    }
}
module.exports = Handlefile;