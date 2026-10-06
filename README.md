Medical Cost Insurance Prediction

A machine learning project that predicts medical insurance charges based on personal and demographic information such as age, BMI, number of children, smoking status, gender, and region.

📌 Objective

The objective of this project is to build and compare multiple regression machine learning models and identify the model that performs best at predicting medical insurance costs.

📊 Dataset

The project uses the Medical Cost Personal Dataset.

Features
Feature	Description
age	Age of the individual
sex	Gender
bmi	Body Mass Index
children	Number of dependent children
smoker	Smoking status
region	Residential region
charges	Medical insurance cost — target variable
🔄 Machine Learning Workflow
Dataset
   ↓
Data Cleaning
   ↓
Exploratory Data Analysis
   ↓
Feature Selection
   ↓
Categorical Encoding
   ↓
Train-Test Split
   ↓
Feature Scaling
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Model Comparison
   ↓
Best Model
   ↓
Prediction
🤖 Models Used

The following regression algorithms are implemented and compared:

Linear Regression
Lasso Regression
Ridge Regression
ElasticNet Regression
Decision Tree Regressor
Random Forest Regressor
Extra Trees Regressor
Support Vector Regressor (SVR)
AdaBoost Regressor
Gradient Boosting Regressor
XGBoost Regressor
CatBoost Regressor
SGD Regressor
📈 Evaluation Metrics

The models are evaluated using:

MAE (Mean Absolute Error) — average absolute prediction error
MSE (Mean Squared Error) — average squared prediction error
RMSE (Root Mean Squared Error) — square root of MSE
R² Score — measures how well the model explains the variation in insurance charges

For MAE, MSE and RMSE, lower is better.

For R², higher is better.

🧹 Preprocessing

The preprocessing includes:

Checking for missing values
Checking duplicate records
Encoding categorical features
Splitting data into training and testing sets
Feature scaling where required
Preparing data for regression models

Note: Feature scaling is particularly important for algorithms such as SVR, Ridge, Lasso, ElasticNet and SGD.

📂 Project Structure
Medical-Cost-Insurance/
│
├── data/
│   └── insurance.csv
│
├── notebooks/
│   └── medical_cost_analysis.ipynb
│
├── models/
│   └── best_model.joblib
│
├── app.py
├── requirements.txt
├── .gitignore
└── README.md
🖥️ Streamlit Application

A Streamlit interface can be used to make predictions using the trained model.

The application accepts:

Age
Gender
BMI
Number of Children
Smoking Status
Region

and returns the predicted medical insurance charges.

Run the application
streamlit run app.py
🛠️ Technologies Used
Python
Pandas
NumPy
Matplotlib
Seaborn
Scikit-learn
XGBoost
CatBoost
Jupyter Notebook
Joblib
Streamlit
🎯 Project Goals
Understand medical insurance cost data
Perform EDA and preprocessing
Apply multiple regression algorithms
Compare model performance
Select an appropriate regression model
Build a prediction application using Streamlit
⚠️ Disclaimer

This project is created for educational and machine learning practice purposes. The predictions should not be considered actual insurance quotes, medical advice, or financial advice.

👨‍💻 Author

Ninad Patil