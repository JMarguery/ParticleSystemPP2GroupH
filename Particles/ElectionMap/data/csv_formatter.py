import pandas as pd
import os

def cleaner_csv(file,char_before,char_after):
    file.replace(char_before,char_after,regex=True,inplace=True)
    return file

def sort_csv(file,sort_column_id,ascending=True):
    file_sorted = file.sort_values(by=sort_column_id,ascending=ascending)
    return file_sorted

def delete_columns(file_in,file_out,columns_to_delete,separator):
    file = pd.read_csv(file_in,sep = separator,header=None,skiprows=1,encoding="latin1")

    print(file.columns)

    file.drop(columns=columns_to_delete,inplace=True,axis=1)

    file.to_csv(file_out,index=False,header=None)

if __name__ == "__main__":
    file_in = input("Enter .csv file input : ")
    file_out = input("Enter .csv file output : ")
    separator = input('Enter file separator : ')

    columns_to_delete = input("Enter ID of columns to delete (separated by commas ) : ")
    columns_to_delete = [int(column.strip()) for column in columns_to_delete.split(',')]
    print(columns_to_delete)
    delete_columns(file_in,file_out,columns_to_delete,separator)
    print("Columns succefully deleted.")
    