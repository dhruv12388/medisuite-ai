from sqlalchemy import Column, Integer, String, Boolean, Float, Date, ForeignKey
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    is_admin = Column(Boolean, default=False)
    kyc_status = Column(String, default="Pending")

class Policy(Base):
    __tablename__ = "policies"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    provider_name = Column(String)
    policy_number = Column(String, unique=True)
    coverage_amount = Column(Float)
    expiry_date = Column(Date)