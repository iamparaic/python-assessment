from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Initialize with a default page
pages = [{"id": 1, "title": "Welcome Page", "content": "Welcome to your note-taking app!"}]

@app.route('/')
def index():
    return render_template('index.html', pages=pages)

@app.route('/add_page', methods=['POST'])
def add_page():
    data = request.json
    new_page = {
        "id": len(pages) + 1,
        "title": data['title'],
        "content": data['content']
    }
    pages.append(new_page)
    return jsonify(new_page)

@app.route('/delete_page/<int:page_id>', methods=['DELETE'])
def delete_page(page_id):
    global pages
    pages = [page for page in pages if page['id'] != page_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)

main = app 