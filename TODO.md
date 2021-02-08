add styling to message feed
* display name for channel is used
  * if initial load, add server route and call get by short_name
  * if coming from launch, can get through props
* timestamp

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

