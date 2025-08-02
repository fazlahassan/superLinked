# 🦸‍♂️ Superhero Universe Network – Take-Home Assignment

Welcome! This project is part of a take-home coding challenge where you will design and analyze a superhero network using two CSV files.

---

<img width="426" alt="Screenshot 2025-05-26 at 21 17 15" src="https://github.com/user-attachments/assets/710e270f-2b58-4a66-a1f7-811e5f5b5a86" />


- 

## 📘 Project Story

You are the designer of a **superhero universe**.

In this world:

- Each **superhero is a node**  
- Each **friendship is a link** between two superheroes

You have been given CSV files with a list of superheroes and their connections. Your job is to build a simple program that reads this data and gives us useful insights.

---

## 📂 Provided Files

You will use two CSV files:

- `superheroes.csv`: List of superheroes and when they were added
- `links.csv`: Connections between superheroes (who is friends with whom)

---
## 🧰 Preparation

Before you start, please follow these steps carefully:

1. **Fork or Download the Starter Repo**  
   - You can **fork** this GitHub repository to your own account  
   - Or you can **download the files** to your local computer

2. **Make Sure Your Repo is Public**  
   - Your project **must be on a public GitHub repo**
   - If your repo is private, we **cannot review your code**
   - Private repos will be **de-prioritized**, and you may have to **wait longer** for your interview

3. **If Forking is Confusing**  
   - You can **create a brand-new public GitHub repo** in your account
   - Just **download the CSV files** from this repo and **continue working from your own**
-------

## ✅ Requirements

Your program must:

1. Load the CSV files and create the network
2. Show:
   - Total number of superheroes
   - Total number of connections
   - Superheroes added in the **last 3 days**
3. Find the **top 3 most connected superheroes**
4. Check the **new superhero called `dataiskole`**:
   - When was `dataiskole` added?
   - Who are `dataiskole`'s friends?
5. Display or print the results clearly

Optional (Bonus):
- Show a visual graph
- Allow user to add new superheroes and connections

---

## 🛠️ Tools You Can Use

- Python, Java, or JavaScript/TypeScript
- You can use **ChatGPT, GitHub Copilot, or any AI tools**

---

## 🚀 Submission Rules (Important!)

- ✅ **Submit via GitHub only** – Zip files or email submissions will be rejected  ( you can send git repo url via email :) ) 
- 🕒 You have **2 days** to complete the task  
- ⏱ You will have a **45-minute video interview**
  - You must run your code live
  - We will ask questions about what you built

---

## 📄 What to Include in Your Submission

- Your working code
- This `README.md` file with:
  - How to run your code
  -    ### Backend
         **clone the repository**
          1. Navigate to the backend folder:
               ```bash
                  cd Backend
               ```
          2. Activate the Python virtual environment:
             windows
               ```bash
                  .\venv\Scripts\Activate.ps1
               ```
               macOS/Linux 
                ```bash
                 source venv/bin/activate
               ```
          3. Install dependencies:
               ```bash
                 pip install -r requirements.txt
               ```
          4. Run the FastAPI server:
               ```bash
                 uvicorn app:app --reload
               ```
          5. Backend API will be available at:
               ```bash
                http://127.0.0.1:8000
                http://127.0.0.1:8000/docs (for test the end point and server)
               ```
    -    ### Frontend
         **clone the repository**
          1. Navigate to the backend folder:
               ```bash
                  cd Frontend
               ```
          2. Install dependencies:
               ```bash
                  npm install
               ```
          3. Start the React development server:
               ```bash
                  npm run dev
               ```
          5. Open your browser and visit:
               ```bash
                  http://localhost:5173
               ```
  - Sample output
![Sample Screenshot](output.png)

  - Tools or libraries you used
  - ## 🧰 Tools and Libraries Used

      ### Backend
      - Python 3.12  
      - FastAPI — REST API server  
      - NetworkX — Graph data processing  
      - Uvicorn — ASGI server  
      - pandas — CSV file handling  
      
      ### Frontend
      - React — UI library  
      - Vite — Fast frontend build tool  
      - react-force-graph — Interactive graph visualization  
      - react-icons — Icon set for UI  
      - TypeScript — Static typing  

  - Any extra info you want to share
  - ## ℹ️ Additional Info

      - Images are served from the React frontend public folder and mapped by hero name  
      - Backend serves data via REST endpoints: `/total`, `/top`, `/recent`, `/dataiskole`, `/graph-data`  
      - The graph layout uses a circular spread and force simulation for clarity  
      - The UI includes neumorphic styling for header/footer and animated fade-in sections  
      - Feel free to customize image assets in the `public/assets` folder  

 
----------

#  ❤️  ❤️  ❤️ Happy Coding ❤️  ❤️  ❤️
<img width="426" alt="Screenshot 2025-05-26 at 21 17 15" src="https://media.npr.org/assets/img/2016/06/09/john-p-fleenor-courtesy-of-hbo_wide-f730538a10afad26c9de9a42561772522e4e87e6.jpg?s=1400&c=100&f=jpeg">


