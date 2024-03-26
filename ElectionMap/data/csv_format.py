import pandas as pd
import os

def cleaner_csv(file,char_before,char_after):
    file.replace(char_before,char_after,regex=True,inplace=True)
    return file

def sort_csv(file,sort_column_id,ascending=True):
    file_sorted = file.sort_values(by=sort_column_id,ascending=ascending)
    return file_sorted

def sort_df(df,sort_column_id,ascending=True):
    df.sort_values(by=sort_column_id,ascending=ascending)

def delete_columns(file_in,file_out,columns_to_delete,separator):
    file = pd.read_csv(file_in,sep = separator,header=None,skiprows=1)

    print(file.columns)

    file.drop(columns=columns_to_delete,inplace=True,axis=1)

    file.to_csv(file_out,index=False,header=None)

def good_sort_yeah(file_in,sep):
    df = pd.read_csv(file_in,sep=sep,header=None,skiprows=1,encoding="latin1")
    print("Replacing all occurences of ',' with '.' : ")
    df.replace(',','.',regex=True,inplace=True)
    #df = cleaner_csv(df,',','.')
    #todelete = [16,17,18]
    #i = 0
    #tbdeleted = 25
    #while tbdeleted<=len(df.columns):
    #    todelete.append(tbdeleted)
    #    tbdeleted+=7
    #print("Deleting columns with ids : ")
    #print(todelete)
    #df.drop(columns = todelete,inplace=True,axis=1)
    df.to_csv(file_in.replace("txt","")+'_clean'+".csv",index=False,header=None)
    #
    #sort_types = {
    #    "VOTANTS" : 8,
    #    "INSCRITS" : 5,
    #    "VOT_per_INS" : 9,
    #    "BLANCS_per_INS" : 9,
    #    "NULS_per_INS" : 12,
    #    "ABS_per_INS" : 7,
    #}
    #print("Beginning sorting on : ")
    #print(sort_types.keys)
    #for cle in sort_types:
    #    print("Sorting values by column id : ")
    #    print(sort_types[cle])
    #    df_sorted = df.sort_values(by=sort_types[cle],ascending=True)
    #    print(df_sorted[sort_types[cle]][0])
    #    df_sorted.to_csv(file_in.replace("txt","")+'_sorted_by_'+cle+".csv",index=False,header=None)

if __name__ == "__main__":
    file_in = input("Enter .csv file input : ")
    #file_out = input("Enter .csv file output : ")
    separator = input('Enter file separator : ')

    good_sort_yeah(file_in,separator)
    #columns_to_delete = input("Enter ID of columns to delete (separated by commas ) : ")
    #columns_to_delete = [int(column.strip()) for column in columns_to_delete.split(',')]
    
    #print(columns_to_delete)
    #delete_columns(file_in,file_out,columns_to_delete,separator)
    #print("Columns succefully deleted.")
    




#exp = 16
#%exp/ins = 17
#%exp/vot = 18
#%voix/exp = 25 +(7*i)
