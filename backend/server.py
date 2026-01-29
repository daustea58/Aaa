from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AIMessageRequest(BaseModel):
    message_type: str  # "birthday" or "thankyou"

class AIMessageResponse(BaseModel):
    message: str
    type: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/generate-message", response_model=AIMessageResponse)
async def generate_ai_message(request: AIMessageRequest):
    try:
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not api_key:
            raise HTTPException(status_code=500, detail="API key not configured")
        
        # Initialize Claude chat
        chat = LlmChat(
            api_key=api_key,
            session_id=f"lixie-birthday-{request.message_type}",
            system_message="Kamu adalah Ryzen yang sedang menulis pesan romantis untuk pacarnya, Lixie. Gunakan bahasa Indonesia yang natural, casual, playful, dan penuh kasih sayang. Panggil Lixie dengan 'bb'. Sisipkan emoji lucu di beberapa tempat. Tulis seperti chat personal yang manis dan bikin baper."
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")
        
        if request.message_type == "birthday":
            prompt = """Buatkan ucapan selamat ulang tahun yang manis dan romantis untuk Lixie yang berulang tahun ke-22 (lahir 1 Februari 2003).

Konteks hubungan:
- Kita jadian tanggal 22 Desember 2024
- Pertama kali kenal di Facebook karena dia tertarik nama Ryzen yang unik
- Sudah melewati banyak ujian sebelum jadian
- Pertama kali ketemu 6 Juni 2025 di Cianjur, grogi tapi diterima orang tuanya

Tulis ucapan yang:
- Natural dan seperti chat personal (bukan formal)
- Playful dan bikin senyum
- Panjangnya 4-6 kalimat
- Pakai emoji lucu
- Panggil dia 'bb'
- Mention salah satu momen manis kita

Contoh vibe: "bb, selamat ulang tahun! 🥰 Gak nyangka ya akhirnya kita sampai sini... dari kamu nanya soal nama Ryzen di FB sampai sekarang 😆💕"
"""
        else:  # thankyou
            prompt = """Buatkan pesan terima kasih yang panjang, manis, dan romantis untuk Lixie.

Konteks hubungan:
- Kita jadian tanggal 22 Desember 2024
- Pertama kali kenal di Facebook karena dia tertarik nama Ryzen yang unik
- Sudah melewati banyak ujian sebelum jadian
- Pertama kali ketemu 6 Juni 2025 di Cianjur, grogi tapi diterima orang tuanya

Tulis pesan yang:
- Panjang dan heartfelt (8-12 kalimat)
- Natural seperti chat personal
- Cerita tentang perjalanan hubungan kita
- Mention momen-momen penting (kenal di FB, jadian setelah banyak ujian, first meet di Cianjur)
- Playful tapi tetap romantis
- Pakai emoji lucu di beberapa tempat
- Panggil dia 'bb'
- Akhiri dengan janji manis untuk masa depan

Contoh vibe: "bb, terima kasih ya udah nyempetin waktu buat aku hari ini 😌💕 Masih inget gak waktu kamu nanya soal nama Ryzen di FB? Dari situ kita jadi makin deket... wkwk siapa sangka 😆"
"""
        
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        return AIMessageResponse(
            message=response,
            type=request.message_type
        )
        
    except Exception as e:
        logging.error(f"Error generating AI message: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate message: {str(e)}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
