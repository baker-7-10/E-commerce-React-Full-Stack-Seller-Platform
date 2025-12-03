# ai.py

from pydantic import BaseModel
from typing import List, Optional


class InterestInput(BaseModel):
    product_name: str
    category: str
    time_sec: float
    rating: Optional[float] = 0
    comment: Optional[str] = None
    favorite: Optional[bool] = False
    cart: Optional[List[str]] = []


def calculate_interest(
    time_sec: float,
    product_name: str,
    category: str,
    rating: float = 0,
    comment: Optional[str] = None,
    favorite: bool = False,
    cart: Optional[List[str]] = None
):
    if cart is None:
        cart = []

    time_points = time_sec / 10
    rating_points = rating
    comment_points = 3 if comment else 0
    favorite_points = 4 if favorite else 0
    cart_points = 6 if cart else 0

    w_time = 1
    w_rating = 2
    w_comment = 1.5
    w_favorite = 2
    w_cart = 3

    interest_score = (
        w_time * time_points +
        w_rating * rating_points +
        w_comment * comment_points +
        w_favorite * favorite_points +
        w_cart * cart_points
    )

    return {
        "product_name": product_name,
        "category": category,
        "interest_score": interest_score
    }
