from sqlalchemy.orm import Session
import models, schemas, auth

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        email=user.email, 
        hashed_password=auth.get_password_hash(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_claims(db: Session):
    return db.query(models.Claim).all()