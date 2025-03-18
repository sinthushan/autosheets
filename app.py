from flask import Flask, jsonify, render_template, request
from IPython.core.interactiveshell import InteractiveShell

app = Flask(__name__)


shell = InteractiveShell.instance()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/code')
def code():
    return render_template('code.html')




@app.route('/evaluate', methods=['POST'])
def get_message():
    data = request.json
    code = data.get("cell", '')
    result = shell.run_cell(code)
    print(code, result)
    return jsonify({'result': result.result})


if __name__ == "__main__":
    app.run(debug=True)
