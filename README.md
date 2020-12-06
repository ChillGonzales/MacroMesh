# Macro Mesh

## Daily Macro Optimizer 

[Macro Mesh](macromesh.app) is a small app that uses the [hill climbing algorithm](https://en.wikipedia.org/wiki/Hill_climbing) to optimize food servings to meet a daily macronutrient budget.

The app is deployed using [AWS Amplify](https://aws.amazon.com/amplify/) and is hosted at [macromesh.app](macromesh.app).


## Project overview
Macro Mesh is a simple web application that is built using the following tech stack:

- HTML/CSS/js
- CSS framework: [Bootstrap 4](https://getbootstrap.com/)
- Icons: [Font Awesome 5](https://fontawesome.com/)
- [jQuery](https://jquery.com/)
- Chat: [Crisp Chat](crisp.chat)
- Analytics: [Google Analytics](analytics.google.com)

No package management, bundling/transpiling, or front end frameworks needed!


## Running locally
> NOTE: This repo uses a simple python web server to serve files locally. You will need to download and install [python 3](https://www.python.org/) to use the local server from this repo. Otherwise, you can use whatever web server you'd like to locally serve files.

In order to run the site locally, simply clone the repository and run the following command from the root directory (using whatever shell you'd like):

```bash
python server.py
```

After that, simply navigate to [localhost:8000](localhost:8000) to view the app!


## Project structure

### **Front End Logic**
All of the front end behavior is accomplished using jQuery and is found in `index.html`.

### **Macro Optimization**
The hill climbing optimization algorithm can be found in the `main.js` file. This file takes in an object containing the macro goals of the user and the list of Food objects to optimize servings for. It then returns the same list of foods with the servings optimized for the macro goals.

### **Dynamic Elements**
The `elements.js` file contains HTML elements that get modified/generated at runtime.

### **Food Info**
The `foods.js` file contains information about the pre-defined food choices contained in the app. Adding additional objects to this file will automatically expand the food choices available in the app.


## Contributing
Simply fork the repo and submit a PR if you're interested in contributing!


