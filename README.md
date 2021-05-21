<h1 align="center">
  VUTTR - Very Usefull Tools To Remember
  <br>
</h1>

<h4 align="center">A repository to manage tools with them respective names, links, descriptions and tags. </h4>

<p align="center">
  <a href="#tecnologies">Tecnologies</a> •
  <a href="#how-to-run">Running the Project</a>
</p>

## Tecnologies

- NestJs
- Express
- MongoDB
- Mongoose

## How To Run

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/LarissaDornelas/vuttr-backend

# Go into the repository
$ cd vuttr-backend

# Install dependencies
$ npm install
```

You'll need an MongoDB instance for running the project. You can use MongoAtlas, Docker or whatever you prefer.

Here are some usefull tutorials for helping you on this process:

- [Getting started with Mongodb Atlas](https://www.knowi.com/blog/getting-started-with-mongodb-atlas-overview-and-tutorial/)
- [MongoDB with Docker](https://www.bmc.com/blogs/mongodb-docker-container/)

The next step is to create a .env file in your project with the <strong>connection string</strong> of your database:

```
DATABASE_URL=''
```

After following all the steps you can start the application with this command:

```bash

$ npm run start:dev
```

## Notes

- The Swagger documentation is found on the endpoint [/api](https://vuttr-backend-bossa.herokuapp.com/api/)
