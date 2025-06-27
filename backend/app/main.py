from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

class Volunteer(BaseModel):
    id: int
    name: str
    zipcode: str
    skills: List[str] = []

class Opportunity(BaseModel):
    id: int
    name: str
    zipcode: str
    skills: List[str] = []

volunteers: Dict[int, Volunteer] = {}
opportunities: Dict[int, Opportunity] = {}
donations_by_zip: Dict[str, float] = {}
donations_by_opportunity: Dict[int, float] = {}

@app.get("/volunteers", response_model=List[Volunteer])
def list_volunteers():
    return list(volunteers.values())

@app.post("/volunteers", response_model=Volunteer)
def create_volunteer(v: Volunteer):
    if v.id in volunteers:
        raise HTTPException(status_code=400, detail="Volunteer exists")
    volunteers[v.id] = v
    return v

@app.get("/opportunities", response_model=List[Opportunity])
def list_opportunities():
    return list(opportunities.values())

@app.post("/opportunities", response_model=Opportunity)
def create_opportunity(o: Opportunity):
    if o.id in opportunities:
        raise HTTPException(status_code=400, detail="Opportunity exists")
    opportunities[o.id] = o
    return o

class CommunityDonation(BaseModel):
    zipcode: str
    amount: float

class OpportunityDonation(BaseModel):
    opportunity_id: int
    amount: float

@app.post("/donate/community")
def donate_to_community(d: CommunityDonation):
    donations_by_zip[d.zipcode] = donations_by_zip.get(d.zipcode, 0) + d.amount
    return {"zipcode": d.zipcode, "total": donations_by_zip[d.zipcode]}

@app.post("/donate/opportunity")
def donate_to_opportunity(d: OpportunityDonation):
    if d.opportunity_id not in opportunities:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    donations_by_opportunity[d.opportunity_id] = donations_by_opportunity.get(d.opportunity_id, 0) + d.amount
    return {"opportunity_id": d.opportunity_id, "total": donations_by_opportunity[d.opportunity_id]}
