from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/pokemons', methods=['GET'])
def get_pokemons():
    url = 'https://pokeapi.co/api/v2/pokemon?limit=100'
    response = requests.get(url)
    data = response.json()

    pokemons = []
    for p in data['results']:
        detail = requests.get(p['url']).json()
        pokemons.append({
            'name': p['name'],
            'image': detail['sprites']['front_default'],
            'weight': detail['weight'],
            'height': detail['height'],
        })

    return jsonify(pokemons)

if __name__ == '__main__':
    app.run(debug=True)

