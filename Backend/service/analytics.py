from sqlalchemy import func

def get_dashboard_stats(db: Session):
    total_claims = db.query(models.Claim).count()
    total_amount = db.query(func.sum(models.Claim.amount_claimed)).scalar() or 0
    fraud_flags = db.query(models.Claim).filter(models.Claim.risk_score >= 70).count()
    
    # Grouping by status for a Pie Chart later
    status_counts = db.query(
        models.Claim.status, func.count(models.Claim.id)
    ).group_by(models.Claim.status).all()

    return {
        "total_claims": total_claims,
        "total_payout_requested": total_amount,
        "high_risk_alerts": fraud_flags,
        "status_breakdown": dict(status_counts)
    }