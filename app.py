from mitmproxy import http
from flask import (
    Flask,
    request as flask_request,
    jsonify,
    render_template,
    send_from_directory,
)

import threading

app = Flask(__name__, static_folder="dist", template_folder="dist")

keywords = [b"gaming", b"Gaming", b"GAMING"]


def request(flow: http.HTTPFlow) -> None:
    if (
        flow.request.method in ["PUT", "POST"]
        and flow.request.host == "lms.snuchennai.edu.in"
    ):
        if flow.request.multipart_form:
            for part in flow.request.multipart_form.parts:
                if part.filename and part.filename.endswith(".c"):
                    flow.kill()


def response(flow: http.HTTPFlow) -> None:
    if flow.response:
        if flow.response.content:
            if any(keyword in flow.response.content for keyword in keywords):
                flow.kill()

        if flow.request.path.endswith(".exe"):
            flow.kill()

        if (
            flow.request.path.endswith(".c")
            and flow.request.host == "lms.snuchennai.edu.in"
        ):
            flow.kill()

        content_type = (
            flow.response.headers.get("Content-Type", "")
            and flow.request.host == "lms.snuchennai.edu.in"
        )
        if "text/x-c" in content_type:
            flow.kill()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/add_keyword", methods=["POST"])
def add_keyword():
    message = flask_request.form["message"]
    print(f"Received message: {message}")
    words = message.split()
    if len(words) > 1:
        new_keyword = words[1].encode("utf-8")  # Convert second word to bytes
        keywords.append(new_keyword)  # Add the new keyword to the list
        print(f"Added keyword: {new_keyword}")  # Debug output
        return jsonify({"status": "success", "added_keyword": new_keyword.decode()})
    else:
        return jsonify(
            {"status": "error", "message": "Please provide at least two words."}
        )


def run_flask():
    app.run(port=9999, debug=True, use_reloader=False, threaded=True)


flask_thread = threading.Thread(target=run_flask)
flask_thread.start()
