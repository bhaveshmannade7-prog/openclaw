from fastapi import FastAPI
from moltbot import run  # actual moltbot entry

app = FastAPI()

@app.get("/")
def home():
    return {"status": "Moltbot running on Render"}

@app.post("/run")
async def run_agent(cmd: str):
    result = run(cmd)
    return {"result": result}
