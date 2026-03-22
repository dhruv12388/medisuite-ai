from datetime import date
from sqlalchemy.orm import Session
import models

def analyze_claim_risk(db: Session, user_id: int, policy_id: int, bill_amount: float, bill_date: date):
    risk_score = 0
    reasons = []

    # 1. Fetch Policy for Validation
    policy = db.query(models.Policy).filter(models.Policy.id == policy_id).first()
    
    if not policy:
        return {"status": "Rejected", "score": 100, "reason": "Invalid Policy"}

    # 2. Check Expiry (Logic Check)
    if bill_date > policy.expiry_date:
        risk_score += 50
        reasons.append("Bill date is after policy expiry.")

    # 3. Check Coverage Limit
    if bill_amount > policy.coverage_amount:
        risk_score += 30
        reasons.append("Claim exceeds total policy coverage.")

    # 4. Duplicate Detection (Fraud Check)
    duplicate = db.query(models.Claim).filter(
        models.Claim.user_id == user_id,
        models.Claim.amount_claimed == bill_amount,
        # In a real app, you'd also check a hash of the image
    ).first()

    if duplicate:
        risk_score += 80
        reasons.append("Potential duplicate claim detected.")

    # 5. Final Decision
    status = "Flagged" if risk_score >= 50 else "Pending"
    
    return {
        "risk_score": min(risk_score, 100),
        "status": status,
        "analysis_notes": "; ".join(reasons) if reasons else "Clean claim."
    }