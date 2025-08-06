import sys
import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import pickle
import os
from datetime import datetime, time

def load_model():
    """Load the trained model and encoders"""
    try:
        with open('model.pkl', 'rb') as f:
            model = pickle.load(f)
        with open('vectorizer.pkl', 'rb') as f:
            vectorizer = pickle.load(f)
        with open('label_encoders.pkl', 'rb') as f:
            label_encoders = pickle.load(f)
        return model, vectorizer, label_encoders
    except FileNotFoundError:
        return None, None, None

def train_model():
    """Train a simple model with sample data"""
    # Sample training data
    reasons = [
        "Medical Appointment", "Medical Appointment", "Medical Appointment",
        "Family Emergency", "Family Emergency", "Family Emergency",
        "Personal Work", "Personal Work", "Personal Work",
        "Interview", "Interview", "Interview",
        "Other", "Other", "Other"
    ]
    
    types = ["Gate Pass"] * 15
    times = ["10:00", "14:00", "09:00", "15:00", "11:00", "16:00", 
             "08:00", "13:00", "12:00", "17:00", "18:00", "19:00",
             "20:00", "21:00", "22:00"]
    
    # Simulate approval rates based on reason and time
    approvals = [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0]  # 1 for approved, 0 for rejected
    
    # Create features
    vectorizer = TfidfVectorizer(max_features=10)
    reason_features = vectorizer.fit_transform(reasons)
    
    # Encode categorical variables
    type_encoder = LabelEncoder()
    time_encoder = LabelEncoder()
    
    encoded_types = type_encoder.fit_transform(types)
    encoded_times = time_encoder.fit_transform(times)
    
    # Combine features
    X = np.hstack([
        reason_features.toarray(),
        encoded_types.reshape(-1, 1),
        encoded_times.reshape(-1, 1)
    ])
    
    y = np.array(approvals)
    
    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # Save model and encoders
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    with open('vectorizer.pkl', 'wb') as f:
        pickle.dump(vectorizer, f)
    with open('label_encoders.pkl', 'wb') as f:
        pickle.dump({
            'type': type_encoder,
            'time': time_encoder
        }, f)
    
    return model, vectorizer, {'type': type_encoder, 'time': time_encoder}

def predict_approval(reason, request_type, time_str, student_id):
    """Predict approval likelihood and risk level"""
    
    # Load or train model
    model, vectorizer, label_encoders = load_model()
    if model is None:
        model, vectorizer, label_encoders = train_model()
    
    # Prepare features
    reason_features = vectorizer.transform([reason])
    
    # Encode categorical variables
    try:
        encoded_type = label_encoders['type'].transform([request_type])[0]
        encoded_time = label_encoders['time'].transform([time_str])[0]
    except ValueError:
        # Handle unseen categories
        encoded_type = 0
        encoded_time = 0
    
    # Combine features
    X = np.hstack([
        reason_features.toarray(),
        np.array([[encoded_type]]),
        np.array([[encoded_time]])
    ])
    
    # Get prediction probability
    prob_approved = model.predict_proba(X)[0][1]
    
    # Calculate score (0-100)
    score = int(prob_approved * 100)
    
    # Determine risk level
    if score >= 80:
        risk_level = "low"
    elif score >= 60:
        risk_level = "medium"
    else:
        risk_level = "high"
    
    # Add some randomness based on student_id for demo
    student_factor = hash(student_id) % 20 - 10  # -10 to 10
    score = max(0, min(100, score + student_factor))
    
    return {
        "score": score,
        "risk_level": risk_level,
        "confidence": min(0.95, prob_approved + 0.1)
    }

def main():
    """Main function to handle command line arguments"""
    if len(sys.argv) != 5:
        print(json.dumps({
            "error": "Invalid number of arguments. Expected: reason, type, time, student_id"
        }))
        sys.exit(1)
    
    reason = sys.argv[1]
    request_type = sys.argv[2]
    time_str = sys.argv[3]
    student_id = sys.argv[4]
    
    try:
        result = predict_approval(reason, request_type, time_str, student_id)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({
            "error": str(e),
            "score": 75,
            "risk_level": "medium"
        }))

if __name__ == "__main__":
    main() 