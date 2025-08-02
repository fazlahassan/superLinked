from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph_logic import (
    load_superheroes, load_links, build_graph,
    total_superheroes, total_connections,
    superheroes_added_last_3_days, top_3_most_connected,
    dataiskole_info, get_graph_data
)

# ---------- Initialize FastAPI ----------
app = FastAPI()

# ---------- Enable CORS for frontend ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later to your React app's domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Load Graph Data at Startup ----------
superheroes = load_superheroes("data/superheroes.csv")
links = load_links("data/links.csv")
G = build_graph(superheroes, links)

# ---------- Routes ----------
@app.get("/")
def root():
    return {"message": "🦸 Superhero Network API is running!"}

@app.get("/superheroes")
def get_superheroes():
    return [{"id": node, **G.nodes[node]} for node in G.nodes()]

@app.get("/connections")
def get_connections():
    return [{"source": int(u), "target": int(v)} for u, v in G.edges()]

@app.get("/graph-data")
def graph_data():
    return get_graph_data(G)

@app.get("/total")
def total():
    return {
        "superheroes": total_superheroes(G),
        "connections": total_connections(G)
    }

@app.get("/recent")
def recent():
    return superheroes_added_last_3_days(G)

@app.get("/top")
def top():
    return [{"name": name, "connections": degree} for name, degree in top_3_most_connected(G)]

@app.get("/dataiskole")
def dataiskole():
    added_date, friends = dataiskole_info(G)
    return {
        "added_date": added_date,
        "friends": friends
    }
