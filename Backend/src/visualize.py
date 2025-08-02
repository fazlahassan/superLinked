import matplotlib.pyplot as plt
import networkx as nx

# def draw_graph(G):
#     plt.figure(figsize=(15, 12))
    
#     # Try Kamada-Kawai layout for better spacing
#     pos = nx.kamada_kawai_layout(G)
    
#     node_labels = {node: data.get('name', str(node)) for node, data in G.nodes(data=True)}
    
#     # Customize node sizes and colors
#     node_sizes = [300 + 50 * G.degree(n) for n in G.nodes()]
#     node_colors = ['skyblue' if node_labels[n] != 'dataiskole' else 'red' for n in G.nodes()]
    
#     nx.draw_networkx_nodes(G, pos, node_size=node_sizes, node_color=node_colors, alpha=0.9)
#     nx.draw_networkx_edges(G, pos, arrowsize=20, arrowstyle='-|>', alpha=0.5)
#     nx.draw_networkx_labels(G, pos, labels=node_labels, font_size=7)
    
#     plt.title("Superhero Network")
#     plt.axis('off')
#     plt.tight_layout()
#     plt.show()


import numpy as np

def draw_graph(G):
    plt.figure(figsize=(15, 12))
    
    pos = nx.kamada_kawai_layout(G)
    
    # Set a random seed for reproducibility
    np.random.seed(75)
    # Add small random noise to positions
    pos = {k: (v[0] + np.random.uniform(-0.25, 0.8), v[1] + np.random.uniform(-0.2, 0.15)) for k, v in pos.items()}
    
    node_labels = {node: data.get('name', str(node)) for node, data in G.nodes(data=True)}
    node_sizes = [300 + 50 * G.degree(n) for n in G.nodes()]
    node_colors = ['skyblue' if node_labels[n] != 'dataiskole' else 'red' for n in G.nodes()]
    
    nx.draw_networkx_nodes(G, pos, node_size=node_sizes, node_color=node_colors, alpha=0.9)
    nx.draw_networkx_edges(G, pos, arrowsize=20, arrowstyle='-|>', alpha=0.5)
    nx.draw_networkx_labels(G, pos, labels=node_labels, font_size=7)
    
    plt.title("Superhero Network")
    plt.axis('off')
    plt.tight_layout()
    plt.show()
