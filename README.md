![WePark Logo](https://github.com/aisong1/we-park/blob/main/img/WePark.png?raw=true)

# WePark
This is WePark - the one-stop-shop application that allows you to track available parking spaces in the Greater Seattle Area. 

Have plans Downtown but you're worried that you'll spend hours looking for a parking space? We've all been there. 

But never fear - WePark is here! 

Built with React (Hooks), NodeJS Express, CSS Modules, Mapbox, and PostgreSQL.

## Demo
Create an account, or login into an existing one, and watch as all available parking meters not currently in use will show up on an interactive map. 

<img src="https://github.com/aisong1/we-park/blob/main/img/signupDemo.gif" width="700">
<img src="https://github.com/aisong1/we-park/blob/main/img/loginDemo.gif" width="700">

Explore different areas with a click-and-drag, or type in an address of your own to see nearby available meters! 

<img src="https://github.com/aisong1/we-park/blob/main/img/searchDemo.gif" width="700">


Have a parking meter you like to frequent? Add to your favorites list, conveniently displayed on the left hand side of the map - click one, and be "flown over" to that parking meter on the map!

<img src="https://github.com/aisong1/we-park/blob/main/img/favoriteDemo.gif" width="700">

## Setup

Make sure you have the latest version of [PostgreSQL](https://www.postgresql.org/download/) installed and run the following commands.
```sh
# Install all dependencies for the application
npm install

# Update and shape data to seed into PostgreSQL database
npm run wrangle

# Run webpack
npm run build

# While webpack is running, start the application
npm start
```
Head over to [localhost:3000](http://localhost:3000), and voila!
