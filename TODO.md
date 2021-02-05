create channels
* why is it letting me create more than one with the same short_name?
* pre-set list of 2-3 channels
* remove api to add a channel
* only persist messages from known channels

add temporary user names (randomly assigned)
* Anonymouse
* KING OF THE JUNGLE
* first:
    * Sprightly
    * Mongo
    * Tepid
    * Slowly
    * Dirty
    * Silly
    * Spongebob
    * Teeny tiny
* second:
    * Monkey
    * Caterpiller
    * Bengal Cat
    * Tarzan
    * The Rock
    * King Kong
    * Godzilla

profanity filter when server processing message (tree words aren't allowed)

add "is typing..." event

rate limiter on new messages

allow authenticated users. user can choose their own name.

---

add styling to launch
* Join a room
  * horizontal list of persistent channels, centered on page. each channel has:
    * border with border radius
    * red shadow if active
    * number of users next to name if active
* or
* Make a temporary room
  * [text box] {Start}
  * horizontal list of persistent channels, centered on page. each channel has:
    * border with border radius
    * red shadow if active
    * number of users next to name if active

add styling to message feed
* text box is fixed near bottom
* send button to the right of text box
* feed is above, and is scrollable
* user messages appear on right, others on left
* display name is shown
* Enter == Send

add theming
* tree svgs on left and right edges of launch
* temporary rooms keep launch svgs
* each room has different svgs


Deploy instructions:
* yarn add global heroku
* heroku login
* git push heroku <local_branch>:main