#-*-coding:utf-8-*-  
'''
Created on 17 Jan 2016
@author: Chunheng Jiang jiangchunheng@gmail.com
Frequently Used IO Operation. 
'''

import pandas as pd
import numpy as np
import os
import xlrd

from fuzzywuzzy import process

class DataFrameUtil:
    def loadCSVTable(self, csvFile):
        '''
        Load Table from Local File.
        @param csvFile: input csv file
        @return DataFrame instance 
        '''
        return pd.read_csv(csvFile)

    def loadXLSFile(self, xlsFile, sheetId):
        '''
        Load XLS Table from Local File.
        @param xlsFile: input xls file
        @param sheetId: index of sheet in spread book
        @return DataFrame instance
        '''
        workBook = xlrd.open_workbook(xlsFile)
        sheet = workBook.sheet_by_index(sheetId)
        # read data by rows
        row_dict = {}
        for rid in range(sheet.nrows):
            row_dict[rid] = sheet.row(rid)
        return pd.DataFrame(row_dict)

    def selectRow(self, df, condition):
        '''
        Select rows based on boolean condition
        @param df: data frame instance 
        @param condition: boolean list
        '''
        
        if condition != np.nan:
            return df[condition]
        
    def columnRename(self, df, cid, newName):
        df.columns.values[cid] = newName
        return df

    def dropColumnRow(self, df, name, axis):
        df.drop(name, axis = axis) # axis=0 for row and axis=1 for column
        return df;
    
    def replaceValue(self, df, oldVal, newVal):
        df.replace({oldVal:newVal})
        return df

    def getRowNames(self, df):
        return df.index
    
    def fuzzyMatchName(self, name, choices, cutoff):
        '''
        Fuzzy match name from chose list. 
        '''
        return process.extractOne(name, choices, score_cutoff=cutoff)
        
    def getFileList(self, location):
        return [os.path.join(root, f) for root, _, files in os.walk(location) for f in files]
    
#     if __name__ == "__main__":