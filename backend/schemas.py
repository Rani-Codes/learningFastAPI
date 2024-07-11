from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    description: str | None = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    completed: bool

class TaskInDB(TaskBase):
    id: int
    completed: bool
    owner_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    id: int
    tasks: list[TaskInDB] = []

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
