import pandas as pd
import os

def good_sort_yeah(file_in,sep,save_path):
    df = pd.read_csv(file_in,sep=sep,header=None,skiprows=1,encoding="latin1")
    print("Replacing all occurences of ',' with '.' : ")
    df.replace(',','.',regex=True,inplace=True)
    #todelete = [16,17,18]
    #i = 0
    #tbdeleted = 25
    #while tbdeleted<=len(df.columns):
    #    todelete.append(tbdeleted)
    #    tbdeleted+=7
    #print("Deleting columns with ids : ")
    #print(todelete)
    #print(len(df[tbdeleted-7]))
    #df.drop(columns = todelete,inplace=True,axis=1)
    #print("Deleting cities outside of Metropolitan France (sorry) : ")
    #df = df[~df[0].apply(lambda x: 'Z' in str(x))]
    df.to_csv(save_path+file_in.replace(".csv","")+'_clean'+".csv",index=False,header=None)
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
    #    print("Sorting values by column "+cle+" of id  :"+str(sort_types[cle]))
    #    df_sorted = df.sort_values(by=sort_types[cle],ascending=True)
    #    df_sorted.to_csv(save_path+file_in.replace(".txt","")+'_sorted_by_'+cle+".csv",index=False,header=None)
    #    print(file_in.replace(".txt","")+'_sorted_by_'+cle+".csv" + "Saved")

if __name__ == "__main__":
    for file_name in os.listdir("."):
        if os.path.isfile("./"+file_name) and file_name!="auto_format.py":
            os.makedirs("./"+file_name.replace(".txt","").replace(".csv",""),exist_ok=True)
            good_sort_yeah(file_name,";","./"+file_name.replace(".txt","").replace(".csv","")+"/")
    




#exp = 16
#%exp/ins = 17
#%exp/vot = 18
#%voix/exp = 25 +(7*i)