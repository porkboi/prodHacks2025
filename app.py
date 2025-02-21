from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    # Get the input prompt from the request
    data = request.json
    prompt = data.get('prompt', '')

    # Generate text using Ollama
    response = ollama.generate(
        model='smollm',  # Use the model you pulled
        prompt=prompt
    )

    # Return the generated text
    return jsonify({
        "response": response['response']
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)