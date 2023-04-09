# Fibonacci Sequence

An application that calculates the value corresponding to a specific index in fibonacci series.

# Description

This is a full-stack application that consists of a React client, a Node.js server, a Postgres DB container. The application allows users to input an index value for the Fibonacci series and receives back the corresponding value from either Redis. The init.sql file is a script that will run when the postgres container starts to create the database and the table. The script.sh file to create bind volume directory locally in case of you don't use named volume.

# Installation

To install and run this application, you need to have Docker installed on your local machine. Once you have Docker installed, you can proceed with the following steps:

1. Clone this repository to your local machine.

```
git clone https://github.com/amr-elzahar/fibonacci-sequence.git
```

2. Navigate to the root directory of the project and open the terminal:

```
cd fibonacci-sequence/
```

3. Run this command to switch to feature/postgres branch:

```
git switch feature/postgres
```

4. Run the command to build the images and start the containers:

```
docker compose up -d
```

# Usage

Once the application is up and running, go to your web browser and type `http://localhost:3000/` to access the React client application. Now you can enter any index value in the text field and click on the "Calculate" button. After clicking on the "Calculate" button, you will see the corresponding value of the index in the Fibonacci series.
