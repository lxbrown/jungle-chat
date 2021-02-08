add styling to launch
* center room stuff on the page
* add a title at the top
* move Start textbox below
* style Start as a button

add styling to message feed
* text box is fixed near bottom
* send button to the right of text box
* feed is above, and is scrollable
* user messages appear on right, others on left
* display name is shown
* Enter == Send

ensure mobile is fully supported

add pagination for message scrolling

don't url encode on channel persistence

add scaling plans
* redis
* multiple dynos
* stress test by loading in large # of messages

see who else is in the channel (list of active users)

add theming
* tree svgs on left and right edges of launch
* temporary rooms keep launch svgs
* each room has different svgs

get rid of temporary channels

profanity filter when server processing message (tree words aren't allowed)

add "is typing..." event

rate limiter on new messages

allow authenticated users. user can choose their own name.

