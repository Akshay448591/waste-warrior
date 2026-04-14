from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = YOLO("best.pt")

class_names = ["cardboard", "glass", "metal", "paper", "plastic"]

@app.get("/")
def home():
    return {"message": "API running 🚀"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    results = model.predict(image)

    probs = results[0].probs.data.tolist()
    max_index = probs.index(max(probs))

    label = class_names[max_index]
    confidence = round(probs[max_index] * 100, 2)

    emoji_map = {
        "plastic": "♻️",
        "paper": "📄",
        "metal": "🔩",
        "glass": "🍾",
        "cardboard": "📦"
    }

    return {
        "label": f"{label.capitalize()} {emoji_map.get(label, '')}",
        "confidence": confidence,
        "points": 10,
        "fact": f"{label.capitalize()} can be recycled 🌍"
    }