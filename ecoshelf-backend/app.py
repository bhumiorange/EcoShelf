from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# ── Load trained model ───────────────────────────────────────────
with open("retail_waste_model.pkl", "rb") as f:
    model = pickle.load(f)

# ── Helper: decide shelf position ────────────────────────────────
def get_shelf_priority(risk: str, category: int | str, temperature_c: float) -> str:
    """
    Very simple rule set:
      • High‑risk -> front of shelf
      • Dairy / Meat or cold items (<10 °C) -> refrigerated shelf
      • Otherwise -> back
    """
    if risk == "High":
        return "Front"
    # category may be numeric (0‑5) or a string; handle both
    cat_str = str(category).lower()
    if cat_str in ("1", "dairy", "3", "meat") or temperature_c < 10:
        return "Refrigerated Shelf"
    return "Back"

# ── Routes ───────────────────────────────────────────────────────
@app.route("/")
def home():
    return "EcoShelf AI backend is running ✅"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        print("DATA RECEIVED:", data)

        # ➊ Extract & ensure numeric types
        category        = int(data["category"])
        sales_per_day   = float(data["sales_per_day"])
        shelf_life_days = int(data["shelf_life_days"])
        days_on_shelf   = int(data["days_on_shelf"])
        temperature_c   = float(data["temperature_C"])

        # ➋ Hard override if expired
        if days_on_shelf >= shelf_life_days:
            return jsonify({
                "risk": "High",
                "suggestion": "Product expired — remove from shelf",
                "confidence": 99,
                "shelf_action": get_shelf_priority("High", category, temperature_c)
            })

        # ➌ Prepare model features (shape 1×5)
        features = np.array([[category,
                              sales_per_day,
                              shelf_life_days,
                              days_on_shelf,
                              temperature_c]])

        # ➍ Predict
        prediction = model.predict(features)[0]          # 0 = Low, 1 = High
        risk = "High" if prediction == 1 else "Low"

        # ➎ Confidence
        try:
            proba = model.predict_proba(features)[0]
            confidence = round(max(proba) * 100)
        except AttributeError:
            # Model has no predict_proba (or not supported); give fallback
            confidence = 95 if risk == "High" else 90

        # ➏ Suggestion text
        suggestion = ("Donate / discount / remove"
                      if risk == "High"
                      else "Keep on shelf and monitor")

        return jsonify({
            "risk": risk,
            "suggestion": suggestion,
            "confidence": confidence,
            "shelf_action": get_shelf_priority(risk, category, temperature_c)
        })

    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400
    except Exception as e:
        # Log full traceback if needed
        print("❌ Prediction error:", e)
        return jsonify({"error": str(e)}), 400

# ── Run ──────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
