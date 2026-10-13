# Medical Cost Insurance Prediction — React + Flask

Full-stack starter for predicting insurance charges with a Python regression model.

## Stack
- React + Vite frontend
- Flask REST API
- scikit-learn + Joblib model
- Features: `age`, `sex`, `bmi`, `children`, `smoker`, `region`
- Target: `charges`

## Critical model requirement
The backend expects `backend/models/best_model.joblib` to be a fitted scikit-learn **Pipeline** that accepts a DataFrame containing the six raw columns listed above. The pipeline should contain the same preprocessing and estimator used during training. A model trained on an already-encoded matrix will not accept raw categorical strings directly.

Example pattern for your notebook (replace `best_regressor` with your selected model; use your existing train/test split for final evaluation):

```python
from pathlib import Path
import joblib
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor

numeric = ["age", "bmi", "children"]
categorical = ["sex", "smoker", "region"]

preprocessor = ColumnTransformer([
    ("numeric", Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ]), numeric),
    ("categorical", Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("encoder", OneHotEncoder(handle_unknown="ignore")),
    ]), categorical),
])

best_regressor = RandomForestRegressor(random_state=42)  # replace with chosen estimator
pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", best_regressor),
])

X = df[["age", "sex", "bmi", "children", "smoker", "region"]]
y = df["charges"]
pipeline.fit(X_train_raw, y_train)  # X_train_raw must contain the six unencoded columns
Path("backend/models").mkdir(parents=True, exist_ok=True)
joblib.dump(pipeline, "backend/models/best_model.joblib")
```

Make sure `X_train_raw` is the raw-column training split and that your `y_train` is the matching target split.

## Run backend (PowerShell)

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Health check: `http://127.0.0.1:5000/api/health`

## Run frontend (second terminal)

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in terminal, usually `http://localhost:5173`.

Optional `frontend/.env`:

```text
VITE_API_URL = http://127.0.0.1:5000
```

Restart Vite after editing `.env`.

## Notes
- The trained `best_model.joblib` is not included; generate it from your notebook.
- CORS is enabled for local development; restrict origins in production.
- Keep scikit-learn versions compatible between model training and inference.
- Educational estimate only, not an actual insurance quote or medical/financial advice.
