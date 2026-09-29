This repo consit of ML operations like data preprocessing , cleaning of insurance dataset.

First I have loaded the dataset , got an idea about how is it using operations like mean,max,median , then peformed cleaning and analysing the data and then finally applied ML model and identified its accuracy.

Medical Cost Insurance Prediction

A machine learning project that predicts medical insurance costs based on personal and demographic information such as age, BMI, number of children, smoking status, and region.

🎯 Objective

Build and compare multiple regression machine learning models to predict an individual's medical insurance charges.

📊 Dataset

The project uses the popular Medical Cost Personal Dataset.

Typical features:

age
sex
bmi
children
smoker
region

Target:
charges — medical insurance cost

🛠️ Technologies Used
Python
Pandas
NumPy
Matplotlib
Seaborn
Scikit-learn
Jupyter Notebook
Joblib
Streamlit (for deployment)

🔍 Project Workflow
   Dataset
      ↓
   Data Cleaning
      ↓
   EDA & Visualization
      ↓
   Preprocessing
      ↓
   Train-Test Split
      ↓
   Feature Encoding / Scaling
      ↓
   ML Regression Models
      ↓
   Model Evaluation
      ↓
   Best Model Selection
      ↓
   Streamlit UI
    🤖 Models

The project will compare regression algorithms such as:
Decision tree regressor
Support vector regressor
Linear regressor


📈 Evaluation Metrics

Models will be evaluated using:

MAE — Mean Absolute Error
MSE — Mean Squared Error
RMSE — Root Mean Squared Error
R² Score

The model with the best performance will be selected for deployment.

🌐 Streamlit Application

The final model will be integrated into a Streamlit web application where users can enter details such as:

Age
Gender
BMI
Number of Children
Smoker
Region

and receive a predicted medical insurance cost.
