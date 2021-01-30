add storage layer for persisting message history between client sessions
  * prefer nosql
  * compatible with firebase?

add api call for message history (last 20?)

profanity filter when server processing message (tree words aren't allowed)

create pre-set list of 2-3 themed rooms on launch page

see # of active users in each room

allow "create a new room" from launch page

add support for temporary user name (randomly assigned when entering room)

figure out what's needed to deploy
* add firebase project
* remove hard-coded SERVER_SOCKET_URL on client and PORT on server
* remove blanket cors policy on server
* remove all debugging console logs

allow authenticated users as well. user can choose their own name.

---

add styling to launch

add styling to message feed

add styling to pre-set rooms
