from pydantic import BaseModel, EmailStr
from typing import Optional

# This handles the data coming IN from the user
class UserCreate(BaseModel):
    email: EmailStr
    password: str

# This handles the data going OUT to the user (The fix!)
class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True