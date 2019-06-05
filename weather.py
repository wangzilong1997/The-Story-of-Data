import requests
import time
from lxml import etree

def getweather():
    weather = []
    getpage = requests.get(url='http://www.weather.com.cn/weather/101090101.shtml')
    getpage.encoding = 'utf-8'
    selectorpage = etree.HTML(getpage.text)
    #print(selectorpage)
    day = selectorpage.xpath('//*[@id="7d"]/ul/li[1]/h1/text()')
    wea = selectorpage.xpath('//*[@id="7d"]/ul/li[1]/p[1]/text()')
    temmax = selectorpage.xpath('//*[@id="7d"]/ul/li[1]/p[2]/span/text()')
    temmin = selectorpage.xpath('//*[@id="7d"]/ul/li[1]/p[2]/i/text()')
    weather.append(wea)
    weather.append(temmax)
    weather.append(temmin)
    print(weather)
if __name__ == '__main__':
    getweather()
