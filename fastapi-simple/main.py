from fastapi import FastAPI
from ai import calculate_interest, InterestInput
from supabase_client import supabase


app = FastAPI()

@app.post("/calculate_interest")
def calculate_interest_api(payload: InterestInput):
    result = calculate_interest(
        time_sec=payload.time_sec,
        product_name=payload.product_name,
        category=payload.category,
        rating=payload.rating,
        comment=payload.comment,
        favorite=payload.favorite,
        cart=payload.cart
    )

    supabase.table("ia").insert({
        "product_name": result["product_name"],
        "category": result["category"],
        "interest_score": result["interest_score"],
        "user_id": '9163ab9d-7979-4ce0-805e-b7d4aa19aeab',
    }).execute()

    return result




@app.get("/products")
def get_products():
    data = supabase.table("DataOfProduct").select("*").execute()
    return data.data


# @app.get("/ML")
# def get_products():
#     data = supabase.table("DataOfProduct").select("*").execute()
#     return data.data

