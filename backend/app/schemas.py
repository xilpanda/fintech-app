from datetime import datetime

from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    initial_balance: float = Field(default=100.0, ge=0)


class UserResponse(BaseModel):
    id: int
    name: str
    balance: float

    class Config:
        from_attributes = True


class TransferRequest(BaseModel):
    from_id: int = Field(..., gt=0)
    to_id: int = Field(..., gt=0)
    amount: float = Field(..., gt=0)


class MessageResponse(BaseModel):
    message: str


class TransferResponse(BaseModel):
    message: str
    transaction_id: int


class TransactionResponse(BaseModel):
    id: int
    from_user_id: int
    to_user_id: int
    amount: float
    created_at: datetime

    class Config:
        from_attributes = True
