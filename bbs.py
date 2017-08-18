# -*- coding: utf-8 -*-
# @Author: John
# @Date:   2017-08-01 15:41:42
# @Last Modified by:   John
# @Last Modified time: 2017-08-03 17:45:47

import urllib.request
from bs4 import BeautifulSoup
import re
import requests


# 备用网址     官网：http://sis001.com/forum/index.php
# 可访问地址：http://38.103.161.226
home_url1 = 'http://38.103.161.226/forum/'
home_url = 'http://38.103.161.171/forum/'
firsturl = home_url1+'forumdisplay.php?fid=25'
# firsturl = home_url1 + 'forum-25-1.html' #也可以用这种方式进行直接访问

def get_bs4_request(url):
    try:
        repson = requests.get(url)
    except Exception:
        print("网页打开失败,IP被墙！请更换ip链接地址!")
    
    # 使用系统自带的去读取系统内容
    # html = repson.read()
    repson.encoding = 'GB18030'
    html = repson.text
    # 使用lxml的方式进行解析网站
    soup = BeautifulSoup(html, "lxml")
    return soup

# 获取每页的跳转链接，和标题，
def get_one_page(): 
    
    soup=get_bs4_request(firsturl)
    
    # 爬到全部含有网页连接，并包含<a>,标签的网址以及内容，使用正则判断是否包含thread，以此证明是否是论坛的地址
    # 使用正则，判断href标签里面是否含有thread，以此判断是否是需要的
    # 此循环可以正确输出
    # for node in soup.find_all('a',href=re.compile("thread")):
    #     print(node.get_tex())
    #     #print(node.prettify('gb18030'))
    
    # for node in soup.find_all('a',href=re.compile("thread")):
    #     if(node.string != None):
    #         print(node)
    #         print(node.string) # 得到标签里面的文本
    #         print(node['href']) #获取网页中的链接
    
    
    # 使用bs4的选择器方式进行，
    # soup.select('a[href]') #获取a标签中具有href属性的标签
    # 关于BS4标签选择器的参考文章http://blog.csdn.net/winterto1990/article/details/47808949
    # 爬去第一会所网站的
    # 选择器用法网址：http://www.w3school.com.cn/cssref/css_selectors.ASP
    # 输出长度
    # print(len(soup.select('#forum_25 .new a[href^="thread"]')))
    av_data = {}
    for i in range(0,len(soup.select('#forum_25 .new a[href^="thread"]'))):
        av_data[soup.select('#forum_25 .new a[href^="thread"]')[i].get_text()] = home_url1 + soup.select('#forum_25 .new a[href^="thread"]')[i].get('href')
    for i in range(0,len(soup.select('#forum_25 .common a[href^="thread"]'))):
        av_data[soup.select('#forum_25 .common a[href^="thread"]')[i].get_text()] = home_url1 + soup.select('#forum_25 .common a[href^="thread"]')[i].get('href')
   
    #     av_data['title'] = soup.select('#forum_25 .new a[href^="thread"]')[i].get_text()
    #     av_data['url'] = home_url1 + soup.select('#forum_25 .new a[href^="thread"]')[i].get('href')
    # print(soup.select('#forum_25 .new a[href^="thread"]')[0].get_text())
    # print(soup.select('#forum_25 .common a[href^="thread"]')[0].get('href'))
    
    #  解读字典中的数据
    for k,v in av_data.items():
        print(k,v)
    # print(av_data)
        
    
    # print(soup.find_all('a',id=re.compile("thread")))
    # for node in soup.find_all('a'):
    return av_data

# 获取详细链接后里面的种子下载地址
def get_page_detailed_info(url):
    
    soup = get_bs4_request(url)
  
# 获取种子下载地址和种子的文件名,并下载
    for node in soup.find_all('a',string=re.compile(".torrent")):
        torrent_string = node.string
        print(node.string)
        torrent_url = home_url1 + node['href']
        print(home_url1 + node['href'])
# 下载网页上爬取的链接，需完善下载图片的功能     
        f = urllib.request.urlopen(torrent_url) 
        with open(torrent_string+".torrent", "wb") as code:
            code.write(f.read()) 
#     print(soup.prettify())  #格式化输出得到的网页
# 获取网页中的图片，并下载图片
    for img in soup.find_all('img',onclick="zoom(this)"):
        img_name = re.split('/',img['src'])[-1]
        print(img_name)
        img_url = img['src']
        print(img_url)   #图片链接  
        f = urllib.request.urlopen(img_url) 
        with open(img_name, "wb") as code:
            code.write(f.read()) 
        print(img['src'])
      
# 获取总共有多少页数  
def get_last_page_number(url):
    soup = get_bs4_request(url)
    return re.split(' ',soup.select('.last')[0].get_text())[1]
     
# 获取每页的信息
def get_all_page():
    last_num = int(get_last_page_number(firsturl))
#     根据网页提示获取页面最大值，进行循环，取到所有的链接.
    print(last_num)
    for i in range(1,last_num+1):
        all_url = home_url1 + 'forum-25-' + str(i) + '.html'
#         print(all_url) 
    return


if __name__ == '__main__':
#     get_one_page()
    get_page_detailed_info('http://38.103.161.226/forum/thread-9997355-1-1.html')
    get_all_page()
    print('程序运行完毕！')
