create channel package with handler, model, and schema

add api call for message history (last 20?)

create pre-set list of 2-3 themed rooms on launch page

allow "create a new room" from launch page

add support for temporary user name (randomly assigned)
* anonymouse
* KING OF THE JUNGLE
* first:
    * sprightly
    * mongo
    * tepid
    * slowly
    * dirty
    * silly
    * spongebob
    * teeny tiny
* second:
    * monkey
    * caterpiller
    * bengal cat
    * king kong
    * godzilla

profanity filter when server processing message (tree words aren't allowed)

add "is typing..." event

allow authenticated users. user can choose their own name.

---

add styling to launch
* Join a room
  * horizontal list of persistent channels, centered on page
  * border with border radius
  * red shadow if active
  * number of users next to name if active
  * tree svgs on left and right edges
* or
* Make a temporary room
* [text box]
* {Join}

add styling to message feed


add styling to pre-set rooms


Deploy instructions:
* yarn add global heroku
* heroku login
* git push heroku <local_branch>:main