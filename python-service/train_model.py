import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
data = pd.read_csv('data/crop_data.csv')
X = data[['temp', 'rainfall', 'soil_ph']]
y = data['crop']

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save model
joblib.dump(model, 'models/crop_model.pkl')
print("Model trained and saved to 'models/crop_model.pkl'")