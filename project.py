from flask import Flask, render_template, request
import json
import folium

app = Flask(__name__)

class Edge:
    import folium

def generate_map(safest_path):
    # Example: center map on first location
    if not safest_path or not safest_path["path"]:
        return None

    m = folium.Map(location=[9.5916, 76.5222], zoom_start=8)  # Example: Kerala coords

    # Add markers for each location in path
    for loc in safest_path["path"]:
        folium.Marker(location=[9.5, 76.5], popup=loc).add_to(m)  # Replace with real coords

    # Save map
    m.save("templates/map.html")
    return "map.html"

    def __init__(self, to, distance, streetlights, crimes, policeProximity):
        self.to = to
        self.distance = distance
        self.streetlights = streetlights
        self.crimes = crimes
        self.policeProximity = policeProximity
    @app.route("/sos", methods=["POST"])
def sos_alert():
     print("SOS alert triggered")
    


def computeSafetyScore(edge, night=False):
    w_distance = 0.5
    w_lights = 1.0
    w_police = 1.5
    w_crime = 2.0
    w_night = 3.0 if night else 0.0
    score = (w_distance*edge.distance - w_lights*edge.streetlights - w_police*edge.policeProximity
             + w_crime*edge.crimes + w_night)
    return max(score, 1)

def dfs_all_paths(graph, current, end, visited, path, all_paths):
    visited.add(current)
    path.append(current)
    if current == end:
        all_paths.append(list(path))
    else:
        for edge in graph[current]:
            if edge.to not in visited:
                dfs_all_paths(graph, edge.to, end, visited, path, all_paths)
    path.pop()
    visited.remove(current)

def compute_path_safety(graph, path, night=False):
    score = 0
    total_distance = 0
    for i in range(len(path)-1):
        for edge in graph[path[i]]:
            if edge.to == path[i+1]:
                score += computeSafetyScore(edge, night)
                total_distance += edge.distance
                break
    return score, total_distance


def nearestPolice(graph, path, policeStations):
    max_proximity = -1
    nearest = None
    for i in range(len(path)-1):
        for edge in graph[path[i]]:
            if edge.to == path[i+1] and edge.policeProximity > max_proximity:
                max_proximity = edge.policeProximity
                nearest = edge.to
    return nearest

def find_paths(graph, start, end, policeStations, night):
    all_paths = []
    dfs_all_paths(graph, start, end, set(), [], all_paths)

    paths_with_scores = []
    for path in all_paths:
        score, distance = compute_path_safety(graph, path, night)
        paths_with_scores.append({
            "path": path,
            "safetyScore": score,
            "distance": distance
        })

    
    paths_with_scores.sort(key=lambda x: x["safetyScore"])
    safest_path = paths_with_scores[0] if paths_with_scores else None
    nearest = nearestPolice(graph, safest_path["path"], policeStations) if safest_path else None

    return {
        "allPaths": paths_with_scores,
        "safestPath": {
            "path": safest_path["path"] if safest_path else [],
            "safetyScore": safest_path["safetyScore"] if safest_path else None,
            "distance": safest_path["distance"] if safest_path else None,
            "nearestPoliceStation": nearest
        }
    }




graph, policeStations, night = None, None, True  

def load_graph_once():
    global graph, policeStations, night
    if graph is None:
        night = True
        policeStations = ["Kottayam", "Kochi"]  
        with open("roads.json") as f:
            data = json.load(f)
        nodes = set()
        for r in data:
            nodes.add(r["from"])
            nodes.add(r["to"])
        graph = {node: [] for node in nodes}
        for r in data:
            e1 = Edge(r["to"], r["distance"], r["streetlights"], r["crimes"], r["policeProximity"])
            e2 = Edge(r["from"], r["distance"], r["streetlights"], r["crimes"], r["policeProximity"])
            graph[r["from"]].append(e1)
            graph[r["to"]].append(e2)

load_graph_once()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/find_route", methods=["POST"])
def find_route():
    start = request.form.get("start")
    end = request.form.get("end")

    result = find_paths(graph, start, end, policeStations, night)

    # Generate folium map
    map_file = generate_map(result["safestPath"])

    return render_template(
        "result.html",
        safest=result["safestPath"],
        all_paths=result["allPaths"],
        map_file=map_file
    )

if __name__ == "__main__":
    app.run(debug=True)
