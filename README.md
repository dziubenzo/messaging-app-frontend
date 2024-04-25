# Odin Project - Messaging App (Frontend)

<p align="center">
  <img src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1714057805/messaging_app/gpww83xlhtsflekh3jgg.png" height="500" title="App - Home Page">
  <img src="https://res.cloudinary.com/dvhkp9wc6/image/upload/v1714057805/messaging_app/s2biyhzign7klmrndjbf.png" height="500" title="App - Chat Page">
</p>

A real-time messaging app with two types of statuses, original GG emoticons, group chats and notifications.

It is based on (and a tribute to) the [Gadu-Gadu (GG) instant messaging app](https://en.wikipedia.org/wiki/Gadu-Gadu), which was the most popular communication app in Poland 15-20 years ago.

The functionality and design of the app are heavily inspired by [GG version 6](https://spidersweb.pl/_next/image?url=https%3A%2F%2Focs-pl.oktawave.com%2Fv1%2FAUTH_2887234e-384a-4873-8bc5-405211db13a2%2Fspidersweb%2F2019%2F04%2Fgadu-gadu-historia-2.png&w=700&q=75), with some modern twists (e.g. toasts).

## Features

- Real-time updates for almost everything: messages, changes to statuses, changes to options and more
- Availability (status icons) and text statuses
- Rich text formatting and GG 6 emoticons
- "User is typing" indicators for all chats
- Group chats and one all-users chat
- Contacts for easier access to your friends
- New direct message and new user notifications

## How To Use

- Create an account (you will be logged in automatically)
- You will be assigned a number between 1000000 and 9999999 (you'll see it in the top bar, it has no other meaningful uses)
- Click on a user to chat with them
- Tap/hover over **My status** in the bottom left corner to set your status icon:

1. "Available" is the status icon set when you log in or open the app
2. "Be Right Back" is like available, but you can tell others that you are away from the computer or do not want to be disturbed for some reason
3. "Invisible" makes you appear unavailable to other users
4. There is also the "Unavailable" status icon, but it is set automatically on logout or tab close/change.

- Click on the three dots in the bottom right corner to change your username and/or text status
- Add users to contacts first to create a new group chat
- Have fun!

### Tech Stack

#### Frontend

- React (Vite)
- React Router
- Socket.IO
- styled-components
- react-icons
- react-spinners
- react-toastify
- slugify
- date-fns
- html-react-parser

#### Backend

- Node.js (Express)
- MongoDB (Mongoose)
- Socket.IO
- Passport Local Strategy (authentication)

### Acknowledgements

- App inspired by [**Gadu-Gadu**](https://www.gg.pl/)
- GG 6 emoticons taken from [here](https://emots.yetihehe.com/)
