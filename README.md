# WTL AI Trial Project

## Overview

This is a trial project created for the AI Engineer position at **WTL Design**. The application sets up a server that connects a **Large Language Model (LLM)** to a MySQL database. Based on user prompts, the LLM generates SQL queries that retrieve or summarize metadata from the database.

---

## Features

- Connects to a MySQL database using Node.js.
- Leverages a language model to interpret natural language prompts.
- Automatically generates and executes SQL queries.
- Returns results or summaries based on query outputs.

---

## Setup Instructions

### packages

Ensure the following are installed on your **Linux environment**:

- Node.js
- Node Version Manager (nvm)
- A working **mySQL database**
- A valid openAI API key
- Node.js mySQL package (`mysql2` required)

download repository with bash command:
```shell
git clone https://github.com/max09lui/WTL-AI_Trial_Project```

## running program

can edit LLM/ user prompts in helper.js

run code with bash command:
```shell
node main.js```


