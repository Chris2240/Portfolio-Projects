# Level 2 Development HTML, CSS, JavaScript and TypeScript

In this project I have been given the following task to achieve a whole Single Page Application (SPA) work as expected in TypeScript campilation:

<br>

1) I had to copy and paste the original JavaScript project into this “Express Server” folder.

    Removed all “node-modules”, package.json and package-lock.json files using: “rm -rf src/package.json src/package-lock.json src/node_modules”. Also I did remove ”.vscode/launcher.json”
    Created tsconfig.json file using “npx tsc --init” and configured as follow:

    ![alt text](<Screenshots Readme/Screenshot 1.jpg>)

<br>

2) Then I installed again:
    * npm install (reinstallation only to set all in new folder “Express Server”)
    * npm init -y (initialize new package.json)
    * npm install papaparse --save (that is install node_module folder with papaparse library)
    * npm install @types/papaparse --save-dev (papaparse libraries for devDependencies)
    * npm install express
    * npm install @types/express --save-dev
    * npm install --save-dev typescript (is recommended install locally typescript into this project even if is already installed globally)
    * npm install --save-dev ts-node nodemon
        * ts-node allows you to run .ts files directly without compiling first.
        * nodemon automatically restarts your server when you make changes to your code.

<br>

3) Then I had to modify the “script” inside the package.json using the following commands in the terminal to add the missed scripts(they wasn’t there as a default):
    * npm pkg set scripts.start="npm run build:live" - when “npm start” runs, it will execute npm run build:live
    * npm pkg set scripts.build:live="nodemon"

    Now because this application have to running with papaparse library I need to provide this command into terminal:
    * npm pkg set scripts.build="tsc && cp ./node_modules/papaparse/papaparse.min.js ./build/src/assets/"
        * (after types npm run build in terminal) that converts all .ts files into .js ones and copies the paaparse.mini.js from node_mdules folder and pastes into build/src/assets folder with already including all converted .js files
    * then in app.ts (after creating this file) we need to provide the following code as well:
    
    ![alt text](<Screenshots Readme/Screenshot 2.jpg>)

    If you would like to delete one of the scripts:
    * npm pkg delete scripts.test - that is only example

    After all those tasks the package.json should look like that:

    <img src="./Screenshots Readme/Screenshot 3.jpg" width="650" />
<br>

## Modifying ".ts" files - specifying annotations types to the methods and variables:

After changing extensions from “js” into “ts” files, I saw a lot of exceptions which I had to handle before compiling them into “js” files.
There are a bunch of methods which must be modified by adding variable types or implementing a bit different way of already existing codes.

After modifying them all, I had come to next stage which has creating and implementing **"app.ts"** file.


<br>

## Creating and implementing “app.ts” file:

In the terminal type "touch app.ts" and implement content file as follow:

<img src="./Screenshots Readme/Screenshot 4.jpg" width="600">

Next, type the “npm run build” - this will convert all ts.files into .js, and will copy the papaparse.mini.js from node_modules into build/src/assets folder including all eariel converted files as well.

Lastly type “npm start” to run the application in localhost:3000. Unfortunately some issues appeared and all fixes are provided below.
    
To cancel using expess server simply press "ctr + c".

<br>

## Errors appeared and how I handeled them (them nie with it bo jest wiele):

* Changed at package.json: "main": "index.js" into "main": "build/app.js" - The error occurs in web browser (http://localhost:3000) because Node.js is trying to run index.js, but my package.json does not specify it as the main file.

    As an alternative, while I use “npm start” I do not need to have this “main:...” keyword inside the package.
    But, if I need to use “node .” manually (node app.js in terminal) then I should keep “main:...” keyword.

        npm run build - for updating all changes in both packages and app.js


* Added "type": "module" into package.json - without this I saw the error because my TypeScript output is using ES modules (import/export), but Node.js expects CommonJS (require) by default. To prevent that I have to create additional “type module” in package.json using following command:
    
    npm pkg set type=”module”;

        npm run build - for updating all changes in both packages and app.js
 
    The package.json should look like this:

    <img src="./Screenshots Readme/Screenshot 5.jpg" width="600">

* Modifying app.ts because seen “ReferenceError: __dirname is not defined” error:

    ![alt text](<Screenshots Readme/Screenshot 6.jpg>)

    In the app.ts I have to change the “handling request” to find the index.html. For some reason when the app.js is ran from build/, the issue is that “__dirname” refers to the build/ directory when running the server. To fix that issue I have to modify the app.ts as follow:

    it was:

    ![alt text](<Screenshots Readme/Screenshot 7.jpg>) 
    
    into this: 
    
    ![alt text](<Screenshots Readme/Screenshot 8.jpg>)

    Now, the app.ts should look as follows:

    <img src="./Screenshots Readme/Screenshot 9.jpg" width="900">

* Changing the root in index.html of style.css, DataBase.js, Navi-btns-alerts-etc.js, papaparse.mini.js

    That is because the Express server was not serving correctly in the index.html file.

    After root updated at index.html the sources should look like this now:

    <img src="./Screenshots Readme/Screenshot 10.jpg" width="600">

<br>

After all those changes the exceptions disappeared and my SPA application is working as expected in Express Server.