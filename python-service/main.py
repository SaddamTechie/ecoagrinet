from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from pathlib import Path

app = FastAPI(
    title="EcoAgriNet Crop Recommendation Service",
    description="Predicts the best crop based on environmental data.",
    version="1.0.0"
)

# Define input data model
class CropInput(BaseModel):
    temp: float
    rainfall: float
    soil_ph: float

# Load the trained model
model_path = Path("models/crop_model.pkl")
if not model_path.exists():
    raise FileNotFoundError("Model file 'crop_model.pkl' not found. Run train_model.py first.")
model = joblib.load(model_path)

@app.post("/predict_crop")
async def predict_crop(input_data: CropInput):
    """
    Predict the best crop based on temperature, rainfall, and soil pH.
    
    Args:
        input_data: JSON with temp (°C), rainfall (mm), and soil_ph
        
    Returns:
        JSON with the predicted crop
    """
    try:
        # Prepare input data as a DataFrame with feature names
        data = pd.DataFrame(
            [[input_data.temp, input_data.rainfall, input_data.soil_ph]],
            columns=['temp', 'rainfall', 'soil_ph']
        )
        
        # Make prediction
        prediction = model.predict(data)
        
        return {"crop": prediction[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/")
async def root():
    return {"message": "EcoAgriNet Crop Recommendation Service is running"}

# Run with: uvicorn main:app --reload --port 5001