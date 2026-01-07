from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


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
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# Reservation Models
class ReservationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    guests: str = Field(..., min_length=1)
    date: str = Field(..., description="Reservation date in YYYY-MM-DD format")
    time: str = Field(..., description="Reservation time slot")
    requests: Optional[str] = None


class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    guests: str
    date: str
    time: str
    requests: Optional[str] = None
    status: str = Field(default="pending")  # pending, confirmed, cancelled
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ============ RESERVATION ENDPOINTS ============

@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(reservation_data: ReservationCreate):
    """Create a new table reservation"""
    try:
        # Create reservation object
        reservation = Reservation(**reservation_data.model_dump())
        
        # Convert to dict for MongoDB
        doc = reservation.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into database
        await db.reservations.insert_one(doc)
        
        logger.info(f"New reservation created: {reservation.id} for {reservation.name} on {reservation.date}")
        return reservation
        
    except Exception as e:
        logger.error(f"Error creating reservation: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create reservation")


@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations():
    """Get all reservations (for admin purposes)"""
    try:
        reservations = await db.reservations.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for res in reservations:
            if isinstance(res.get('created_at'), str):
                res['created_at'] = datetime.fromisoformat(res['created_at'])
        
        return reservations
    except Exception as e:
        logger.error(f"Error fetching reservations: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch reservations")


@api_router.get("/reservations/{reservation_id}", response_model=Reservation)
async def get_reservation(reservation_id: str):
    """Get a specific reservation by ID"""
    try:
        reservation = await db.reservations.find_one({"id": reservation_id}, {"_id": 0})
        
        if not reservation:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        if isinstance(reservation.get('created_at'), str):
            reservation['created_at'] = datetime.fromisoformat(reservation['created_at'])
        
        return reservation
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching reservation: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch reservation")


@api_router.patch("/reservations/{reservation_id}/status")
async def update_reservation_status(reservation_id: str, status: str):
    """Update reservation status (pending, confirmed, cancelled)"""
    valid_statuses = ["pending", "confirmed", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    try:
        result = await db.reservations.update_one(
            {"id": reservation_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        logger.info(f"Reservation {reservation_id} status updated to {status}")
        return {"message": f"Reservation status updated to {status}"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating reservation status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update reservation status")


@api_router.delete("/reservations/{reservation_id}")
async def delete_reservation(reservation_id: str):
    """Delete a reservation"""
    try:
        result = await db.reservations.delete_one({"id": reservation_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Reservation not found")
        
        logger.info(f"Reservation {reservation_id} deleted")
        return {"message": "Reservation deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting reservation: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete reservation")

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