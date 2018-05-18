

<p align="center">
<img src="https://raw.githubusercontent.com/jsbarragan796/alikeness/master/public/logo.png" title="Alikeness" alt="Alikeness logo" href="https://alikeness.herokuapp.com/" height = 240vw>
</p>


# Alikeness - Personality relations insights
## Description
This is a web application to help others to find insights in the personality relations between twitter's user and the accounts this account follows or  is following. Aiming to this the apps evaluate personality using the method [Big Five personality traits](https://console.bluemix.net/docs/services/personality-insights/models.html#models), service provided by IBM. Also there are a variety of visualizations that help to understand the results.

The wed teclonologies used were:  
* React.
* Meteor.
* Node.
* MongoDB.

There is a live demo available  [here.](https://alikeness.herokuapp.com/)

## Motivation
This is a web development exercise that happened to be the final project of the [Web development course](http://johnguerra.co/classes/webDevelopment_spring_2018/) at [University of the Andes](https://www.uniandes.edu.co).

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository has the standard MIT license. You can find it [here.](https://github.com/jsbarragan796/alikeness/blob/master/LICENSE)
## Getting Started

Before you can run this project locally you need to have installed ```npm``` and ```Meteor```.

### Credentials
* It is needed to have credentials to use the IBM's api [personality insights](https://console.bluemix.net/docs/services/personality-insights/science.html#science)
* It is needed to have two twitter api credentials in [apps twitter](https://apps.twitter.com)
#### Environment Variables
You need to define de following variables, the two credentials of twitter is optional if you define both twitter credentials with the same one.

```
export TWITTER_CONSUMER_KEY="yourCredentialsHere"
export TWITTER_CONSUMER_SECRET="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_KEY="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_SECRET="yourCredentialsHere"

export TWITTER_CONSUMER_KEY2="yourCredentialsHere"
export TWITTER_CONSUMER_SECRET2="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_KEY2="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_SECRET2="yourCredentialsHere"

export WATSON_PASSWORD="yourCredentialsHere"
export WATSON_USERNAME="yourCredentialsHere"
```

## Deployment
Once you have define the Environment Variables then clone or download this repository on your computer, open your terminal go to the directory of the project then run :
* ```meteor npm install```or: ```npm install```
* ```meteor```

Now you only need to open your browser and type on the address bar  ```localhost:3000``` now the project is running locally.

## Authors
* [__Juan Sebastián Barragán Jerónimo__](https://github.com/jsbarragan796)
* [__Camilo Zambrano Votto__](https://github.com/cawolfkreo)
