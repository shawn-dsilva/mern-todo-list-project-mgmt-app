
# List-Wala

List-Wala is a Fully Free & Open Source, Dockerized, To-Do List and Project Management web app, supporting user authentication, routing, protected routes, descriptions, status changes, checklists and deletions, Fully responsive across Desktop, Tablet and Mobile.
Live Demo on https://demos.shawndsilva.com/list-wala

## Features

-   Login page with success/error messages
-   Register page with success/error messages
-   Protected List page route that needs authentication to access
-   Persistence achieved using Sessions, with session ID stored on Cookie
-   Logout deletes session in database and cookie from browser
-   Create Lists containing ToDo items.
-    ToDo items have editable descriptions, checklists and status
-    Status can be changed to Done, In Progress or back to Not Started
-  Lists and ToDo items can be Deleted
-   Fully responsive across Desktop, Tablet and Mobile

## Feature Walkthrough GIF


![List-Wala-Feature-Demo](https://imgur.com/Ik7btS0.gif)


## Prerequisites

-   NodeJS
-   NPM
-   ReactJS
-   Bootstrap
-   MongoDB Atlas MongoURI
-   **.env file with ENV variables**

## Quick Start

Clone the repository

```
 https://github.com/shawn-dsilva/list-wala.git

```

Install packages for Node backend

```
 cd list-wala
 npm install

```

Install packages for React client

```
 cd list-wala/client
 npm install

```

Start Dev Server ( both React server and Nodejs server )

```
 npm run dev

```

## Author

**Shawn D'silva**(shawndsilva.com)
