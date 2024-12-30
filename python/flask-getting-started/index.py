from flask import Flask, request, Response, stream_with_context
import time

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/name')
def name_route():
    name = request.args.get('name', 'Unknown')
    return f'Hello, {name}!'

@app.route('/stream')
def stream():
    def generate():
        for i in range(5):
            time.sleep(1)
            yield f'Chunk {i}\n'
    return Response(stream_with_context(generate()))

@app.route('/post-data', methods=['POST'])
def post_data():
    data = request.get_json()
    if not data:
        return {'error': 'No data found in request'}, 400
    print(f"Received data: {data}")
    return data 