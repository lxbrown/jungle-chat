deploy
* configure SSL
* add heroku to website sub-domain
* pare down package scripts to just what's needed
* add env variables where appropriate (dev vs. prod)
* add deploy instructions to README (git push heroku <local_branch>:main)
* remove blanket cors policy on server. not needed now that they're on the same port
* remove all debugging console logs

add storage layer for persisting message history between client sessions
* mongodb

add api call for message history (last 20?)

profanity filter when server processing message (tree words aren't allowed)

create pre-set list of 2-3 themed rooms on launch page

see # of active users in each room

allow "create a new room" from launch page

add support for temporary user name (randomly assigned when entering room)


allow authenticated users as well. user can choose their own name.

---

add styling to launch

add styling to message feed

add styling to pre-set rooms
