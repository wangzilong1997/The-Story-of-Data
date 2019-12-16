/**
 * @author wangzilong
 * @date 2019/12/16 14:15
 */
var Mysql = {
    config: function () {
        return {
            host: '47.106.158.206',user: 'root', password: 'root', database: 'sum', port: '3306'
        }
    },
    connect: function (err) {
        if(err){console.log('___:'+err);return;}console.log('链接数据库')
    },
    insert:function (num,connection) {
        var ins = 'insert into number (people) values (?)';
        var param = num;
        connection.query(ins,param,function(err,res){
            if(err){
                console.log(err.message);
                return;
            }
            console.log('插入数据完成');
        });
    },
    select: async function(connection){
         return new Promise((resolve, reject) => {
            connection.query('select people from number',(err,res) => {
                if(err){
                    console.log(err);
                    return;
                }
                let rlen = res.length
                console.log(res[rlen-1].people)
                bill = res[rlen-1].people
                console.log('queryf',bill)
                resolve(bill);
            });
        }).then(
             () => {
                 return bill;
             }
        );
    },
    close:function (connection) {
        connection.end(function(err){
            if(err){
                console.log('___:'+err);
                return
            }
            console.log('关闭成功')
        })
    }

};

module.exports = Mysql;