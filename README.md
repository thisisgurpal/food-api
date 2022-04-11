# General Assembly Project 2 - Reciplease
This is an application built using JavaScript and React that allows you to search for your desired food and see how it’s made including details about measurements and ingredients. This project was paired programming for 48 hours. I was responsible for ensuring that the back end was correctly retrieving information from an external API, designing the home page, designing the individual recipe pages and also building the filter functions to choose a recipe. You can find the application <a href="https://reciplease-thisisgurpal.netlify.app/">here</a>.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160812981-bd9d0f42-f361-4f6c-bf7f-0a6f1875edcf.JPG" width="1000">

# Links
<h3>Application</h3>
Reciplease: https://reciplease-thisisgurpal.netlify.app/
<h3>Contact</h3>
Gurpal Gohler (LinkedIn): https://www.linkedin.com/in/gurpal-gohler/

# Brief
The brief is to build an application that consumes a public API and has several components.

# Installation
* Create app - `npx create-react-app APP_NAME`
* Go into folder created - `CD APP_NAME`
* Clone to GitHub repository - `git remote add origin git@github.com:YOUR_GITHUB_USERNAME/YOUR_REPO.git`
* Install dependencies - `yarn`
* Start server - `yarn start`

# Technologies and tools used
* React
* JavaScript
* Axios
* SCSS
* CSS
* React Router DOM
* Visual Studio Code

# Plan
When starting this project we both shared to each other any ideas we had for this application we were going to build. In both of our lists we had an idea of developing a recipe application, as this was the case we went forward with this idea. 

Now we have the idea, we began searching for public API’s to use that will be suitable for us. We knew that we wanted images, recipes information, ingredients and also a way to filter the recipes. In our case we found an API that tells us where the recipe is from and what type of food the recipes has in it, this information we used as our filters. After this we began wire framing the application, thinking about how we wanted it to look. 
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160825809-1301c381-18bd-4e50-9514-97fc0dd6cca8.JPG" width="1000">

# Walk through
<h3>Home page</h3>
Initially when the application loads there are no recipes shown, only the filters where you will have to choose your preferences. However in the background we made sure that all of the meals from the API are saved into a react state, so they are ready when the user filters the dropdowns. The home page box has a background image and a linear gradient so you are easily able to read text over the top of it. To create the dropdown options for area and type we took the distinct values and used those as the options.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161247849-c7301fdc-2450-44c8-b78f-7154269a8de9.JPG" width="1000">
<h3>Choose Area and Type of food</h3>
When the user has chosen their preference of area or type of food, the values are saved into states so we can use them to filter the total number of meals. This filtered array of meals is then saved into another state and then used to display the meals below. For example in this image you will see recipes for Vegetarian Indian food in relation to the dropdown choices. If the user changes the dropdown option the states and meals will be updated accordingly. Each of these meals shown have have been wrapped in a link tag which will take you to the individual recipe page, this is done using the meal id in the route path.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161248138-34a20bf4-ac85-4677-9881-98f9e5e38952.JPG" width="1000">
<h3>Recipe page</h3>
For the recipe page to get all the details of the individual recipe we need to get the meal id and use it in a get request. To get the meal id there is a method called useParams from React Router DOM which will help us do this, and now we use this value in the get request to retrieve the recipe details which will be saved into a state. 
<h3></h3>
The data for the recipe is now used and styled to show the meal name, origin, picture, ingredients, instructions and links to find out more. The ingredients section has two parts to it, the ingredients and then the measurements. Both of these are saved into a state and then displayed by using the map array method.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161247915-5d678cc4-b67b-4ba4-abd8-2ca622008b36.JPG" width="1000">
<img src="https://user-images.githubusercontent.com/97416784/161247951-26ce993b-4c53-4ce8-81fe-408c5b843149.JPG" width="1000">




# Code examples
<h3>Consuming public API</h3>
To consume the public API we used an Axios request. This API wasn't the easiest to use as we had to make one get request in order to retrive the meal id's, and another to use these id so we can get the details about the recipe. Therefore we put an Axios get request inside of another Axios get request.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160827106-2a65726b-8b1e-45b8-a8b1-5fbc39c09696.JPG" width="1000">
To filter the food using the dropdowns I created a function that will determine which option has been chosen by giving the select tag a name and then using an if statement to know which dropdown is being changed. The chosen option will then get saved to a state, everytime the filters are changed the states are also updated.
<h3></h3>
Each time these area and type of food states are updated the recipes filtered state also gets updates which hence updates the recipes shown on the page. In the useEffect you can see the dependencies are recipes, cuisineChosen and typeChosen. Inside of the useEffect is an if statement that will use the current filter choices and then use the filter srray method to filter the total recipes state.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160828059-d0d17cfd-e492-4d45-abd0-c3c52c258573.JPG" width="1000">

# Bugs
N/A

# Challenges
Working with multiple public API's to retrieve the data needed.

# Wins
Creating an application that help others find recipes they enjoy whilst premoting home cooking. Learning to use react and axios has been very beneficial.
