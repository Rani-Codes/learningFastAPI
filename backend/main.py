from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

#Creates the db tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

#Dependency
# creates a new SQLAlchemy SessionLocal that will be used in a single request, then closes after request finished
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.UserInDB, tags=["users"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username = user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.UserInDB], tags=["users"])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip = skip, limit = limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.UserInDB, tags=["users"])
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db = db, user_id = user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.delete("/users/{user_id}", response_model=dict, tags=["users"])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return crud.delete_user(db = db, user_id = user_id)

# ----- Path Operations for Tasks below -----

@app.post("/users/{user_id}/tasks/", response_model=schemas.TaskInDB, tags=["tasks"])
def create_task_for_user(user_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db = db, task = task, user_id = user_id)

@app.get("/users/{user_id}/tasks/", response_model=list[schemas.TaskInDB], tags=["tasks"])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_tasks(db, skip = skip, limit = limit)

@app.get("/users/{user_id}/tasks/{task_id}", response_model=schemas.TaskInDB, tags=["tasks"])
def read_task(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.get_task_by_id(db = db, task_id = task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@app.put("/users/{user_id}/tasks/{task_id}", response_model=schemas.TaskInDB, tags=["tasks"])
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    return crud.update_task(db = db, task = task, task_id = task_id)

@app.delete("/users/{user_id}/tasks/{task_id}", response_model=dict, tags=["tasks"])
def delete_task(task_id: int, db: Session = Depends(get_db)):
    return crud.delete_task(db = db, task_id = task_id)