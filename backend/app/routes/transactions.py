import logging

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Transaction, User
from ..schemas import TransactionResponse, TransferRequest, TransferResponse

router = APIRouter(prefix="/transactions", tags=["transactions"])
logger = logging.getLogger(__name__)


@router.post("/transfer", response_model=TransferResponse)
def transfer(payload: TransferRequest, db: Session = Depends(get_db)) -> TransferResponse:
    if payload.from_id == payload.to_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Sender and receiver must be different users.",
        )

    try:
        with db.begin():
            sender = db.execute(
                select(User).where(User.id == payload.from_id).with_for_update()
            ).scalar_one_or_none()
            receiver = db.execute(
                select(User).where(User.id == payload.to_id).with_for_update()
            ).scalar_one_or_none()

            if sender is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Sender user {payload.from_id} not found.",
                )
            if receiver is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Receiver user {payload.to_id} not found.",
                )
            if sender.balance < payload.amount:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Insufficient funds.",
                )

            sender.balance -= payload.amount
            receiver.balance += payload.amount
            transfer_event = Transaction(
                from_user_id=payload.from_id,
                to_user_id=payload.to_id,
                amount=payload.amount,
            )
            db.add(transfer_event)

    except HTTPException:
        raise
    except SQLAlchemyError as exc:
        logger.exception("Database error while performing transfer.")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to perform transfer due to database error.",
        ) from exc

    logger.info(
        "Transfer successful: from_id=%s, to_id=%s, amount=%.2f",
        payload.from_id,
        payload.to_id,
        payload.amount,
    )
    db.refresh(transfer_event)
    return TransferResponse(
        message="Transfer successful",
        transaction_id=transfer_event.id,
    )


@router.get("/", response_model=list[TransactionResponse])
def list_transactions(limit: int = 50, db: Session = Depends(get_db)) -> list[Transaction]:
    bounded_limit = min(max(limit, 1), 200)
    rows = db.execute(
        select(Transaction).order_by(Transaction.id.desc()).limit(bounded_limit)
    ).scalars()
    return list(rows.all())
