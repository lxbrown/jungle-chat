# Jungle Chat

A simple, potentially scalable (soon to be lions, tigers, and bears themed) messaging app

## Live site

Check it out at https://chat.lxbrown.dev

## Application Overview

This project wasn't intended to fill any market need, or to really be used, other than for the experience of building a full-stack messaging application.

Typically when working on a software project, work or personal, the scope is quite limited but depth can be extensive - designing a REST API, adding a UI component, modifying a database query. With this project, I wanted to cover the entire development lifecycle by building and hosting an (admittedly small in scope) application from scratch. While this application likely isn't going to see significant use, I set a goal to build one which could be relatively easily scaled to manage a large number of concurrent users. More details in [SCALING.md](SCALING.md).

I'm quite happy with where this project is at right now. When I started, I don't think I fully understood the number of design considerations I would need to make and the implications of each of them, I just knew there would be many. But making myself to go through the process of building this from scratch forced me to be a full-stack developer + dev-ops + sys-admin and evaulate each of the decisions those individuals need to make (again, on a much smaller scale). And I think I came out a better developer for it. Here's just a short list of topics I researched for this project:
* Full stack hosted cloud application
* Cloud-based database
* NoSQL database optimizations
* Scaling thresholds
* Websocket connections
* Domain hosting
* SSL cert. generation

I don't consider myself a UX designer by any means, I'm very aware it isn't the greatest *looking* application, but the fundamentals it's built on should be solid. :) 

## Getting Started

This application is built using Node.js for the server implementation, React for the client implementation, Heroku for hosting and MongoDB for storage.

The live site is set up to track the 'main' branch of this repository. Any commits/PRs will trigger a build and update the site.

To work on this application:

Install the application

```shell
git clone https://github.com/lxbrown/jungle-chat.git
cd server
yarn .
cd ../client
yarn .
```

Add a .env file to ./server to connect to a MongoDB database (local or remote)
```code
MONGODB_URI=XXX
MONGO_USERNAME=XXX
MONGO_PASSWORD=XXX
```

Start the application

Terminal #1

```shell
cd server
yarn start
```

Terminal #2

```shell
cd client
yarn start
```

The client should be accessible at http://localhost:3000 and the server will be running at http://localhost:4000
