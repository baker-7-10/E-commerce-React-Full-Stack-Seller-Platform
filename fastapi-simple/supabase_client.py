import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()  # ← حمّل ملف .env

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL is missing. Check your .env file.")
if not SUPABASE_KEY:
    raise ValueError("SUPABASE_KEY is missing. Check your .env file.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
