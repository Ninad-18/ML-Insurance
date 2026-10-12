from pathlib import Path
import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "best_model.joblib"
app = Flask(__name__)
CORS(app)  # Local development only; restrict origins in production.

FEATURES = ["age", "sex", "bmi", "children", "smoker", "region"]
model = joblib.load(MODEL_PATH) if MODEL_PATH.exists() else None

@app.get("/api/health")
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})

@app.post("/api/predict")
def predict():
    if model is None:
        return jsonify({"error": "Model not found. Save your fitted preprocessing + regression pipeline to backend/models/best_model.joblib."}), 503
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Send a valid JSON object."}), 400
    try:
        row = {
            "age": int(data["age"]),
            "sex": str(data["sex"]).strip().lower(),
            "bmi": float(data["bmi"]),
            "children": int(data["children"]),
            "smoker": str(data["smoker"]).strip().lower(),
            "region": str(data["region"]).strip().lower(),
        }
    except (KeyError, TypeError, ValueError):
        return jsonify({"error": "Provide valid values for every field."}), 400

    if not 18 <= row["age"] <= 100:
        return jsonify({"error": "Age must be between 18 and 100."}), 400
    if not 10 <= row["bmi"] <= 80:
        return jsonify({"error": "BMI must be between 10 and 80."}), 400
    if not 0 <= row["children"] <= 10:
        return jsonify({"error": "Children must be between 0 and 10."}), 400
    if row["sex"] not in {"male", "female"}:
        return jsonify({"error": "Sex must be male or female."}), 400
    if row["smoker"] not in {"yes", "no"}:
        return jsonify({"error": "Smoker must be yes or no."}), 400
    if row["region"] not in {"northeast", "northwest", "southeast", "southwest"}:
        return jsonify({"error": "Choose a valid region."}), 400

    try:
        input_df = pd.DataFrame([row], columns=FEATURES)
        prediction = float(model.predict(input_df)[0])
    except Exception as exc:
        app.logger.exception("Prediction failed")
        return jsonify({"error": f"Prediction failed. Check that the saved pipeline accepts the six raw input columns. ({type(exc).__name__})"}), 500
    return jsonify({"predicted_charges": round(prediction, 2)})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
