# MarkLogic University Character Search

The `mlu-character-search` project is an example Node.js application that displays and searches data in a MarkLogic database. The application demonstrates using the **MarkLogic Node.js API** to communicate between a **Node.js** application and **MarkLogic**. The example data is information about Star Wars characters stored in JSON format and also image files.

## Requirements

Before configuring the `mlu-character-search` application, ensure you have the following requirements.

* `node` installed and functioning.
	* To get the Node.js installation software, visit <https://nodejs.org/en/download/> .
	* To verify:
		* Open a terminal session (Linux/Mac) or command prompt (Windows).
		* Type `node -v` then press ENTER. The version should be returned.
* `npm`
	* The node package manager should be installed during the `node` installation.
	* To verify:
		* Open a terminal session (Linux/Mac) or command prompt (Windows).
		* Type `npm -v` the press ENTER. The version should be returned.
* `yarn`
	* To install the `yarn` package manager:
		* Open a terminal session (Linux/Mac) or command prompt (Windows).
		* Type `npm i yarn -g` then press ENTER.
* `curl`
	* Windows, download from <https://curl.haxx.se/download.html> . *Note: If you are running Windows 10, you may already have `curl` installed. You can open a command prompt and type `curl --version` then press ENTER to see if curl is already installed.*
	* Linux/Mac, `curl` should already be installed. If not, download from <https://curl.haxx.se/download.html> .
* **MarkLogic** installed and running.
	* Download MarkLogic from <https://developer.marklogic.com/products> .
	* Install MarkLogic and start the MarkLogic service, <https://docs.marklogic.com/guide/installation/procedures>
	* Initialize MarkLogic and create an Admin user account, <https://docs.marklogic.com/guide/installation/procedures#id_60220>

## Configure the `mlu-character-search` application

1. Clone or download the `mlu-character-search` application from MarkLogic University's GitHub repository, <https://github.com/MarkLogicUniversity/mlu-character-search> .
2. Open a terminal session (Linux/Mac) or command prompt (Windows).
3. Create the MarkLogic application server and database for the `mlu-character-search` application.
	* Change to the `mlu-character-search` folder.
	* Change to the `ml-rest` folder.
	* Edit the `create-sw.bat` file on Windows or the `create-sw.sh` file on Linux/Mac.
	* Change the user name in the `SET USER=` line to your MarkLogic Admin user name.
	* Change the password in the `SET PASS=` line to your MarkLogic Admin user's password.
	* Save your changes and exit your editor.
	* At the command prompt, type in `create-sw.bat` on Windows or `. create-sw.sh` on Linux/Mac. Press ENTER.
4. Load the example data to the MarkLogic database.
	* Change to the `mlu-character-search` folder.
	* Change to the `data` folder.
		* Edit the `insert.bat` file on Windows or the `insert.sh` file on Linux/Mac.
	* Change the user name in the `SET USER=` line to your MarkLogic Admin user name.
	* Change the password in the `SET PASS=` line to your MarkLogic Admin user's password.
	* Save your changes and exit your editor.
	* At the command prompt, type in `insert.bat` on Windows or `. insert.sh` on Linux/Mac. Press ENTER.
5. Change to the `mlu-character-search` folder.
6. Edit the `settings.js` file in the `mlu-character-search` folder.
	* Change to the `mlu-character-search` folder.
	* Edit the `settings.js` file.
	* The settings to connect to MarkLogic from the `mlu-character-search` application are defined in this file.

		```
		var connection = {  	  
		host: 'localhost',  
		port: 5002,  
		user: 'adminuser',
		password: 'adminpassword'
		};
		```

	* Change the `user:` property value to a MarkLogic Admin user name.
	* Change the `password:` property value a MarkLogic Admin user's password.
	* Save your changes and exit your editor.
7. Type `yarn` then press ENTER. `yarn` downloads the Node.js project dependencies defined in the `package.json` file.
8. Type `node app.js` then press ENTER. Node.js starts and the `express` server begins listening on port **8080**.
9. Open a browser (Chrome or FireFox recommended) then go to the url of <http://localhost:8080>. The homepage of the `mlu-character-search` application displays.
10. To exit the `mlu-character-search` Node.js application, in your command prompt (Windows) or Terminal window (Linux/Mac), press `<CTRL>-C`. This stops the running Node.js application and exits Node.js.

## Remove the `mlu-character-search` application

Follow the instructions below to delete the `mlu-character-search` application from MarkLogic. This removes the application server, content and module databases, the corresponding forests and any loaded content.

1. Open a terminal session (Linux/Mac) or command prompt (Windows).
2. If you are still running the Node.js application, exit the application by pressing `<CTRL>-C`. Node.js should stop running the application code and exit to a command prompt.
3. Delete the MarkLogic application server and database for the `mlu-character-search` application.
	* Change to the `mlu-character-search` folder.
	* Change to the `ml-rest` folder.
	* Edit the `remove-sw.bat` file on Windows or the `remove-sw.sh` file on Linux/Mac.
	* Change the user name in the `SET USER=` line to your MarkLogic Admin user name.
	* Change the password in the `SET PASS=` line to your MarkLogic Admin user's password.
	* Save your changes and exit your editor.
	* At the command prompt, type in `remove-sw.bat` on Windows or `. remove-sw.sh` on Linux/Mac. Press ENTER.
4. The `mlu-characters-search` application, database, forests and content is now removed from MarkLogic.
