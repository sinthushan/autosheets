from flask import Flask, jsonify, render_template


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/evaluate', methods=['POST'])
def get_message():
    
    return jsonify({'message': 'Hello from Flask!'})


if __name__ == "__main__":
    app.run(debug=True)
