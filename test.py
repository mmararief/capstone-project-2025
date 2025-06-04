import joblib
model = joblib.load("models_ml/model_svd_surprise.pkl")
print(type(model))