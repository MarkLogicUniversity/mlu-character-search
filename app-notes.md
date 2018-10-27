# `mlu-character-search` Application Notes

The `mlu-character-search` is a simple Node.js application that displays character data and images stored in a MarkLogic database. You can also do string searches such as `"rebel"` or `"lightsaber AND tatooine"`.

The application is structured as a single page web application. Initially, all of the characters in the database are displayed. There is no design for pagination since there are not a lot of characters in the database. However, as the amount of data in *your* application grows, you should consider the UX design of letting people know how much data is available and limiting the how many items are displayed by  default. MarkLogic databases can store lots of data so your application should be coded as if billions of documents are stored in the database.

## Pre-requisite knowledge

Below is a list of technologies used in the `mlu-character-search` project. Experience with these technologies is helpful to understand the project and are needed to make any desired changes to the project.

### Front-end knowledge
* HTML
* Angular
* JavaScript

### Node.js knowledge  skills
* Node.js
* Express and routes
* JavaScript
* Pug HTML template engine

### MarkLogic database knowledge or skills
* MarkLogic Node.js API. This includes using the MarkLogic Node.js API to get a connection to MarkLogic, using the API to read documents and images and using the API to do basic queries with QueryBuilder.

## The request/response Flow

Requests come to the application from the browser to Node.js. The `express` server begins listening on port 8080 when Node.js executes the `app.js` application file.

The request flow is as follows:

Browser request -> `express` (port 8080) -> MarkLogic `mlu-starwars` application server (port 5002) -> `mlu-starwars-content` database

The response back to the browser just reverses the above request flow.

## `app.js`

This is the main Node.js application. The routes for the application URLs are established. The `express` server begins listening on port 8080.

### The API URLs (routes)

Routes are relative URLs. They define APIs in the Node.js application that map to specific functionality in code. 

Below is a list of the routes and what functionality they provide.

* route('/') - Display the main application page.
* route('/image/:uri') - Get an image file from the `mlu-starwars-content` database with the given URI (`:uri`). Example: `http://localhost:8080/image/bobafett` where `:uri` is the filename of a character without the file extension.
* route('/api/characters') - Get all characters from the `mlu-starwars-content` database. Example: `http://localhost:8080/api/characters`
* route('/api/search/characters/:term') - Search the `mlu-starwars-content` database with the given word or phrase (`:term`). Example: `http://localhost:8080/api/search/characters/lightsaber`
* route('/api/search/characters/:key/:term') - Search the `mlu-starwars-content` database for the word or phrase (`:term`) within the given JSON property name (`:key`).
* route('/api/characters/:name') - Get a character from the `mlu-starwars-content` database with the given character name (`:name`) where `:name` if the filename of the JSON character file without the extension. Example: `http://localhost:8080/api/characters/bobafett`

## `routes.js`

`routes.js` defines and implements the routes described above. The routes are calls to MarkLogic using the **MarkLogic Node.js API**, <https://docs.marklogic.com/guide/node-dev>, to read and search character data in the `mlu-starwars-database`.

The connection to MarkLogic is defined in `settings.js`. By default, the username and password of a MarkLogic user with the Admin role is used to read and search data. A user with the Admin role is not a requirement. You should be able to use any MarkLogic user that has the `rest-reader` role. See <https://docs.marklogic.com/guide/node-dev/intro#id_70898> for more information about security and the **MarkLogic Node.js API**. 

## Other Directories and Files

* `data` folder - The character data and images for the application.
* `ml-rest` folder - MarkLogic REST api to create and remove the application's App Server and Databases.
* `public` folder - the CSS styles used in the HTML, Fonts for styles and the JavaScript files used with Angular. The `app.js` file in the `js` folder sets up Angular-specifics such as models, controllers and routes. AngularJS can be used in Single Page Applications (SPA) where it is desirable not to reload the entire web page when only part has changed.
* `views` folder - The `pug` templates. Pug is a HTML templating engine, previously known as `jade`. The templates are rendered to HTML and returned as part of the response back from Node.js to the browser. 