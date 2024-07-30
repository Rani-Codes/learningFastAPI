# Project Stack: Next.js, FastAPI, PostgreSQL

Reading the official FastAPI documentation and messing around with developing a CRUD API using the framework.

After reading the FastAPI docs I have decided to create a simple ToDo app with user auth

Once I was satasfied with how the backend was performing I decided to move on to the Next.js documentation to get a review of react concepts and to also figure out how to use Next.js to connect my frontend to my backend and database.

Note to Self: Node modules should not be committed to repository. (Add node_modules directory to .gitignore file)

Note to Self: Future projects deploy the frontend to Vercel and backend to Render if you want free hosting.

Note to Self: When deploying to Vercel or Render, don't add quotes around the env variable values, it leads to countless CORS errors.

# Update
After nearly three weeks of working on this, and around 80 hours spent, the project is finally done and deployed. I am very happy with how it turned out and am proud of myself for designing, developing, and deploying it all on my own.

I had to create a new branch for the backend to host it seperately but I think in the future I may not need to do that.

### Site live at: todo-frontend-zeta-sandy.vercel.app/
Note: The site may take long for the first time it loads up or it may also return a 504: GATEWAY_TIMEOUT response. This is due to the fact that the backend is being hosted for free causing the server to spin down if it is inactive for more than a few minutes. This will cause a delay of **50 seconds or more** at first, but please be patient. The site should be live and functioning after the first minute or so.

### 7-29-2024 Update
I feel like I keep writing updates so I'm gonna start adding the date to each one for better reference. Today I had to merge my db from **SQLite** to **PostgreSQL**. 

I had to do this because my data wasn't persisting in the backend. I think this is likely due to the fact that Render closes my server down when it isn't being used which typically cuases that small delay when trying to access the site after it hasn't been live for a while. 

Whenever Render would restart the server it would revert back to the SQLite db that I submitted when pushing the site, not the one that was being modified on the frontend. 

The solution I came up with was to create a PostgreSQL database on Vercel and link it to my site. This is working well so far but if I exceed the free limit then I will revert the db back to SQLite. That would suck but this project is just a hobby project for me so I don't want to pay for db hosting.


### DEMO
This is a typical user flow of the site. Please use this as a reference to how the site looks if the site is down.
![Home page of the website](Demo/Home.png)
![Signup page of the website](Demo/Signup.png)
![Task page of the website with no tasks currently added](Demo/EmptyTasks.png)
![Task page of the website with multiple tasks added](Demo/FullTasks.png)
![Profile page of the website](Demo/Profile.png)


