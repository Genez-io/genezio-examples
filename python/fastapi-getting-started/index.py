from fastapi import FastAPI, Request
import asyncio
from typing import Optional

app = FastAPI()

@app.get("/")
async def home():
    return "Hello, World!"

@app.get("/name")
async def name_route(name: Optional[str] = "Unknown"):
    return f"Hello, {name}!"

@app.post("/post-data")
async def post_data(request: Request):
    data = await request.json()
    print(f"Received data: {data}")
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)