'''
Created on Feb 11, 2017

@author: Chunheng Jiang
'''

import matplotlib.pyplot as plt
import pandas as pd

base = "/Users/chjiang/Documents/csc/" 

def bar(file):
    data = pd.read_csv(base + file, sep='\t')
    data.plot(x="em", y="k", kind="bar", rot=0)
    plt.show()

import numpy as np
def subplots(names):
    data0 = pd.read_csv(base + "soc-3-k1-1000-" + names[0] + '-perf.txt', sep='\t')
    data1 = pd.read_csv(base + "soc-3-k1-1000-" + names[1] + '-perf.txt', sep='\t')

    m = np.unique(data0['m'])
    n = m.shape[0]
    for i in range(n):
        ax = plt.subplot(2, n, i + 1)
        idx = (data0['m'] == m[i])
        ax.plot(data0[idx]['n'], data0[idx]['time'])
        idx = (data1['m'] == m[i])
        ax.plot(data1[idx]['n'], data1[idx]['time'])
        ax.set_title('m=' + str(m[i]))
        if i == 0:
            ax.set_ylabel('Running Time (s)')
    
    for i in range(n):
        ax = plt.subplot(2, n, n + i + 1)
        idx = (data0['m'] == m[i])
        ax.plot(data0[idx]['n'], data0[idx]['numNode'])
        idx = (data1['m'] == m[i])
        ax.plot(data1[idx]['n'], data1[idx]['numNode'])
        ax.set_title('m=' + str(m[i]))
        if i == 0:
            ax.set_ylabel('Number of Nodes')
        ax.set_xlabel('n')

    ax.legend(names, loc=1, bbox_to_anchor=(1.2, 1.0))
    plt.show()


def group(names):
    n = len(names)
    for i in range(n):
        name = names[i]
        data = pd.read_csv(base + name)
        means = data.ix[:, 2:].groupby([data["m"], data["n"]]).mean()
        means = means.drop("k", 1)
        means.iloc[0].plot(kind="line", legend=name)
    plt.show()

# names = ['h0c1p1s0t0r0', 'h1c1p1s0t0r0']
# subplots(names)

names = ["soc-3-k1-1000-h1c1p1s0t0r0-trace-format.txt", 
       "soc-3-k1-1000-h0c1p1s0t0r0-trace-format.txt", 
       "soc-3-k1-1000-h1c1p1s0t1r0-trace-format.txt",
       "soc-3-k1-1000-h1c1p1s1t0r0-trace-format.txt"]
group(names)
