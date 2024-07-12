from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from . import models, schemas


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed" #UPDATE THIS LINE
    db_user = models.User(username=user.username, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, user_username: str):
    return db.query(models.User).filter(models.User.username == user_username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def delete_user(db: Session, user_id: int):
    user_data = get_user_by_id(db, user_id)

    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user_data)
    db.commit()
    return {"message": "User deleted successfully"}

# ---- Below are the CRUD functions for the Task db table ----------


def create_task(db: Session, task: schemas.TaskCreate, user_id: int):
    db_task = models.Task(**task.model_dump(), owner_id = user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_task_by_id(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Task).offset(skip).limit(limit).all()


def update_task(db: Session, task: schemas.TaskUpdate, task_id: int):
    db_task = get_task_by_id(db, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    #Converts task input pydantic schema into a dict w only the fields provided
    update_data = task.model_dump(exclude_unset=True)

    #Uses the dict from update_data to loop through the db and 
    #set the new attributes to the provided fields
    for key, value in update_data.items():
        setattr(db_task, key, value)

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, task_id: int):
    task_data = get_task_by_id(db, task_id)

    if not task_data:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task_data)
    db.commit()
    return {"message": "Task deleted successfully"}