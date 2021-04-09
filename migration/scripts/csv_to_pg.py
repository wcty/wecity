import pandas as pd
df = pd.read_csv('./{FILENAME}.csv', error_bad_lines=False, sep=",")
df.columns = [c.lower() for c in df.columns] 

from sqlalchemy import create_engine
engine = create_engine('{PG_CONNECTION_STR}')

df.to_sql("{SCHEMA}.{TABLE}", engine)
