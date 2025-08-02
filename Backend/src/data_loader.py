import pandas as pd

def load_superheroes(path):
    return pd.read_csv(path)

def load_links(path):
    return pd.read_csv(path)
