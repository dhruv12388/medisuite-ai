from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

# Configurations
SECRET_KEY = "medisuite_secret_key_2026" 
ALGORITHM = "HS256"
PWD_CONTEXT = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return PWD_CONTEXT.hash(password)

def verify_password(plain_password, hashed_password):
    return PWD_CONTEXT.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)