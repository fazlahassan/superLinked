import pandas as pd
from graph_builder import (
    build_graph, total_superheroes, total_connections,
    superheroes_added_last_3_days, top_3_most_connected, dataiskole_info
)

from visualize import draw_graph

def main():
    superheroes = pd.read_csv('../data/superheroes.csv')
    links = pd.read_csv('../data/links.csv')

    G = build_graph(superheroes, links)

    print(f"Total superheroes: {total_superheroes(G)}")
    print(f"Total connections: {total_connections(G)}")
  
    recent = superheroes_added_last_3_days(G)
    print("Superheroes added in last 3 days:")
    for hero in recent:
        print(f"  - {hero}")

    top3 = top_3_most_connected(G)
    print("Top 3 most connected superheroes:")
    for name, degree in top3:
        print(f"  - {name}: {degree} connections")

    added_date, friends = dataiskole_info(G)
    if added_date is not None:
        print(f"'dataiskole' was added on: {added_date}")
        print(f"'dataiskole's friends: {friends}")
    else:
        print("'dataiskole' not found in the network.")
    
    # Draw the graph at the end
    draw_graph(G)

if __name__ == '__main__':
    main()
