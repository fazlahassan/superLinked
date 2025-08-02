import pandas as pd
import networkx as nx
from datetime import datetime, timedelta

# ------------------- Data Loaders -------------------

def load_superheroes(path):
    return pd.read_csv(path)

def load_links(path):
    return pd.read_csv(path)

# ------------------- Graph Logic -------------------

def build_graph(superheroes_df, links_df):
    G = nx.DiGraph()
    for _, row in superheroes_df.iterrows():
        G.add_node(row['id'], name=row['name'], added_date=row['created_at'])
    for _, row in links_df.iterrows():
        G.add_edge(row['source'], row['target'])
    return G

def total_superheroes(G):
    return G.number_of_nodes()

def total_connections(G):
    return G.number_of_edges()

def superheroes_added_last_3_days(G):
    dates = []
    for _, data in G.nodes(data=True):
        if 'added_date' in data:
            try:
                created_at = datetime.fromisoformat(data['added_date'])
                dates.append(created_at)
            except ValueError:
                continue
    unique_dates = sorted(set(dates), reverse=True)[:3]
    recent_heroes = []
    for node, data in G.nodes(data=True):
        if 'added_date' not in data:
            continue
        try:
            created_at = datetime.fromisoformat(data['added_date'])
        except ValueError:
            continue
        if created_at in unique_dates:
            recent_heroes.append(data.get('name', node))
    return recent_heroes

def top_3_most_connected(G):
    degrees = G.degree()
    top3 = sorted(degrees, key=lambda x: x[1], reverse=True)[:3]
    return [(G.nodes[n].get('name', n), deg) for n, deg in top3]

def dataiskole_info(G):
    for node_id, data in G.nodes(data=True):
        if data.get('name', '').lower() == 'dataiskole':
            added_date = data.get('added_date', 'Unknown')
            friends = list(G.neighbors(node_id))
            friend_names = [G.nodes[f].get('name', f) for f in friends]
            return added_date, friend_names
    return None, None

def get_graph_data(G):
    nodes = [{"id": n, "label": G.nodes[n].get("name", str(n))} for n in G.nodes()]
    edges = [{"source": int(u), "target": int(v)} for u, v in G.edges()]
    return {"nodes": nodes, "edges": edges}
