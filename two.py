import pandas as pd
import time
import re
from pyecharts.charts import Line,Bar,Page,WordCloud
from pyecharts.globals import SymbolType
from pyecharts import options as opts
import sys
import jieba.analyse as anl
def getyear(name,linkfile):
    year = []
    pick = []
    file = open(linkfile,'r',encoding='utf-8-sig')
    source = file.read()
    sourcelist = source.splitlines()
    begin = sourcelist[8][:4]
    end = sourcelist[-3][:4]
    #beginyear = begin[:4]
    print(begin)
    print(end)
    #年份部分
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
            .add_yaxis(name,pick)
            .set_global_opts(title_opts=opts.TitleOpts(title='年', subtitle="year"))
    )

    #月份部分
    attrmons = ['{}月'.format(str(i)) for i in range(1, 13)]
    linemon = (
        Line()
            .add_xaxis(attrmons)
            .set_global_opts(title_opts=opts.TitleOpts(title='月',subtitle="month"))
    )
    for x in range(1,lenyear+1):
        mons = []
        for z in range(1,13):
            #print(typeof(begin))

            begin = str(begin)
            if z < 10:
                z = str(z)
                mon = begin + '-0' + z
                #print(mon)
                mon = len(re.findall(mon,source))
                #print(mon)
                #print(x)
                #print(z)
                z = int(z) + 1
                mons.append(mon)
            else:
                z = str(z)
                mon = begin + '-' + z
                #print(mon)
                mon = len(re.findall(mon,source))
                #print(mon)
                #print(x)
                #print(z)
                z = int(z) + 1
                mons.append(mon)
        linemon.add_yaxis(begin,mons,markpoint_opts=opts.MarkPointOpts(data=[opts.MarkPointItem(type_="max")]), is_smooth=True)
        begin = int(begin) + 1
        print(mons)
    print(attrmons)
    #总的小时部分
    attrhour = ['{}点'.format(str(i)) for i in range(1, 25)]
    linehour = (
        Line()
            .add_xaxis(attrhour)
            .set_global_opts(title_opts=opts.TitleOpts(title='时', subtitle="hour"))
    )
    talktime = []

    for t in range(0,24):
        st = str(t)
        h = '\s' + st +':'
        print(h)
        hsum = len(re.findall(h,source))
        talktime.append(hsum)
        t = t + 1
    linehour.add_yaxis('eachhour',talktime,markpoint_opts=opts.MarkPointOpts(data=[opts.MarkPointItem(type_="max")]), is_smooth=True,markline_opts=opts.MarkLineOpts(data=[opts.MarkLineItem(type_="average")]))
    print(talktime)
    page.add(bar,linemon,linehour)
    #简单词云部分
def getcloud(linkfile):
    newtext = []
    for word in open(linkfile,'r',encoding='utf-8-sig'):
        tmp= word[0:4]
        if(tmp == "===="or tmp == "消息记录" or tmp == "消息分组" or tmp == "消息对象" or tmp == "2015" or tmp == "2016" or tmp == "2017" or tmp == "2018" or tmp == "2019"):
            continue
        newtext.append(word)
    with open('ebak.txt','w',encoding='utf-8-sig') as f:
        for i in newtext:
            f.write(i)
    text = open('ebak.txt','r',encoding='utf-8').read()
    keyword = anl.extract_tags(text,66,withWeight=True)
    print(keyword[:9])
    print(keyword[0][0])
    impkeyword = []
    keywordnum = []
    file = open(linkfile,'r',encoding='utf-8-sig')
    source = file.read()
    for k in range(0,9):
        impkeyword.append(keyword[k][0])
        keywordnum.append(len(re.findall(keyword[k][0],source)))
    print(impkeyword)
    print(keywordnum)
    file.close
    bar = (
        Bar()
            .add_xaxis(impkeyword)
            .add_yaxis('ly',keywordnum)
            .set_global_opts(title_opts=opts.TitleOpts(title='高频率词汇草率汇总', subtitle="草率"))
    )
    cloud =(
        WordCloud()
        .add("",keyword,word_size_range=[20,100],shape=SymbolType.DIAMOND)
        .set_global_opts(title_opts=opts.TitleOpts(title="巨草率的词云"))
    )
    page.add(bar)
    page.add(cloud)
        
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
    name = sys.argv[1]
    linkfile = sys.argv[2]
    print(name)
    print(linkfile)
    file = linkfile.split('/')
    page = Page()
    getyear(name,linkfile)
    getcloud(linkfile)
    #年度表格添加
    page.render('views/'+file[2]+'.handlebars')
