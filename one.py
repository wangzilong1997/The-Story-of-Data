import pandas as pd
import time
import re
from pyecharts.charts import Line,Bar
from pyecharts import options as opts

def getyear():
    year = []
    pick = []
    file = open('public/files/cdays-4-result.txt','r',encoding='utf-8')
    source = file.read()
    sourcelist = source.splitlines()
    begin = sourcelist[8][:4]
    end = sourcelist[-3][:4]
    #beginyear = begin[:4]
    print(begin)
    print(end)
    for y in range(int(begin),int(end)+1):
        a = str(y)
        size = len(re.findall(a,source))
        print(size)
        print(y)
        pick.append(size)
        year.append(y)
    print(year)
    print(pick)
    lenyear = int(end) - int(begin) + 1
    print(lenyear)
    print(typeof(sourcelist))
    file.close
    bar = (
        Bar()
            .add_xaxis(year)
            .add_yaxis('总计沟通频率',pick)
            .set_global_opts(title_opts=opts.TitleOpts(title='主标题', subtitle="副标题"))
    )
    bar.render(r'views/process.handlebars')

#判断变量类型的函数
def typeof(variate):
    type=None
    if isinstance(variate,int):
        type = "int"
    elif isinstance(variate,str):
        type = "str"
    elif isinstance(variate,float):
        type = "float"
    elif isinstance(variate,list):
        type = "list"
    elif isinstance(variate,tuple):
        type = "tuple"
    elif isinstance(variate,dict):
        type = "dict"
    elif isinstance(variate,set):
        type = "set"
    return type
if __name__ == '__main__':
    getyear()
