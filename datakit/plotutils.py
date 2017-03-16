#-*-coding:utf-8-*-  
'''
Created on 17 Jan 2016
@author: Chunheng Jiang jiangchunheng@gmail.com
Frequently Used Plot Command. 
'''
import numpy as np
import matplotlib.pyplot as plt


class PlotUtils:
    '''
    what could i do now?
    '''
    def scatterPlot(self, x, y):
        '''
        s是点的大小; colour设定点的颜色,默认蓝色'b',也可以是取值离散空间{0,1,2...}与数据点相同维度的数组; marker表示点的形状, 
                    比如u'v'是三角形, u'o'是圆形, u's'正方形, u'*'是五角星, u'p'是正五边形
        '''
        n = 50
        x = np.random.randn(n)
        y = np.random.randn(n)
        c=np.random.randint(3, len(x))
        
        plt.subplot(131)
        plt.scatter(x, y, s=20, color=c, marker=u'o')
        plt.subplot(132)
        plt.scatter(x, y, s=20, color=c, marker=u'v')
        plt.subplot(133)
        plt.scatter(x, y, s=20, color=c, marker=u's')
        
    def barPlot(self, stat):
        '''
        left表示每个bar的左侧坐标，stat实际上对应每个bar的高度height，默认地width=0.8
        '''
        sz = 10
        left = np.arange(sz)
        stat = np.random.randint(100, size=sz)
        plt.bar(left, stat)
    
    def linePlot(self, x, y):
        n = 12
        x = np.linspace(0, 1, n)
        y1 = (1 - x / float(n)) * np.random.uniform(0.5, 1.0, n)
        y2 = (1 - x / float(n)) * np.random.uniform(0.5, 1.0, n)
        plt.plot(x, y1)
        plt.plot(x, y2)
        plt.legend(['BLUE', 'GREEN'])
