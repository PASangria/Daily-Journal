from flask import Blueprint, request, jsonify
from db import db
from models import JournalEntry
from datetime import datetime

bp = Blueprint("entries", __name__)

@bp.route("/entries", methods=["GET"])
def get_entries():
    entries = JournalEntry.query.order_by(JournalEntry.date.desc()).all()
    return jsonify([{"id": e.id, "date": e.date.strftime("%Y-%m-%d"), "title": e.title, "content": e.content} for e in entries])

@bp.route("/entries", methods=["POST"])
def add_entry():
    try:
        data = request.json
        print("Received data:", data)  # Debugging line
        new_entry = JournalEntry(
            date=datetime.strptime(data["date"], "%Y-%m-%d"),
            title=data["title"],
            content=data["content"]
        )
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({"message": "Entry added"}), 201
    except Exception as e:
        print("Error adding entry:", e)  # Print error to terminal
        return jsonify({"error": str(e)}), 500

@bp.route("/entries/<int:id>", methods=["GET"])
def get_entry(id):
    entry = JournalEntry.query.get(id)
    if not entry:
        return jsonify({"error": "Entry not found"}), 404

    return jsonify({
        "id": entry.id,
        "date": entry.date.strftime("%Y-%m-%d"),
        "title": entry.title,
        "content": entry.content
    })


@bp.route("/entries/<int:id>", methods=["PUT"])
def update_entry(id):
    entry = JournalEntry.query.get(id)
    if not entry:
        return jsonify({"error": "Entry not found"}), 404

    data = request.json
    entry.title = data.get("title", entry.title)
    entry.content = data.get("content", entry.content)
    db.session.commit()
    return jsonify({"message": "Entry updated"})

@bp.route("/entries/<int:id>", methods=["DELETE"])
def delete_entry(id):
    entry = JournalEntry.query.get(id)
    if not entry:
        return jsonify({"error": "Entry not found"}), 404

    db.session.delete(entry)
    db.session.commit()
    return jsonify({"message": "Entry deleted"})
