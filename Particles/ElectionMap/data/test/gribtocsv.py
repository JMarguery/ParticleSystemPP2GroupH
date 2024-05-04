import cfgrib
import pandas as pd

def gribtocsv():
    print("coucou")
    with cfgrib.open_dataset('./data.grb') as ds:
        df = ds.to_dataframe()
        print(df)
    df.to_csv('./zzzz.csv',index=False)

gribtocsv()