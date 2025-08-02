import networkx as nx
from datetime import datetime, timedelta

def build_graph(superheroes_df, links_df):
    G = nx.DiGraph()
    # Use 'id' as node key, store 'name' and 'created_at' as attributes
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
            print(f"Found date: '{data['added_date']}'")
            try:
                created_at = datetime.fromisoformat(data['added_date'])
                dates.append(created_at)
            except ValueError as e:
                print(f"Failed to parse date '{data['added_date']}': {e}")
    
    unique_dates = sorted(set(dates), reverse=True)[:3]
    print(f"Last 3 unique dates: {[d.strftime('%Y-%m-%d') for d in unique_dates]}")
    
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
    # Calculate degrees (in + out) for each node
    degrees = G.degree()
    # Sort by degree descending and take top 3
    top3 = sorted(degrees, key=lambda x: x[1], reverse=True)[:3]
    # Return list of (name, degree)
    result = []
    for node_id, degree in top3:
        name = G.nodes[node_id].get('name', node_id)
        result.append((name, degree))
    return result

def dataiskole_info(G):
    # Find node by name 'dataiskole'
    for node_id, data in G.nodes(data=True):
        if data.get('name', '').lower() == 'dataiskole':
            added_date = data.get('added_date', 'Unknown')
            friends = list(G.neighbors(node_id))  # Outgoing edges = friends
            # Convert friend IDs to names
            friend_names = [G.nodes[f].get('name', f) for f in friends]
            return added_date, friend_names
    return None, None
