
# Level 2 Development HTML, CSS, JavaScript and TypeScript in "Live Server"

In this project I have been given the following task to achieve a whole Single Page Application (SPA) work as expected in TypeScript campilation:

<br>

1) I had to copy and paste the original JavaScript project into this “Live Server” folder.

    Removed all “node-modules”, package.json and package-lock.json files using:
    
    * “rm -rf src/package.json src/package-lock.json src/node_modules”. Also I did remove ”.vscode/launcher.json”

<br>

2) Then I install again:
    * npm install - creating package.json in the button of main folder,
    * npm init -y - that is update package.json for using this same dependencies if project will copied for other users,
    * npm install papaparse --save - installing papaparse library for JavaScript and creating package-lock.json,

    After installations the package.json should looks like that:

    <img src="./Screenshots Readme/Screenshot 2.jpg" width="700">

<br>

3) Create a new launch for debugger and provide “localhost 5500” which is shows as below:

<img src="./Screenshots Readme/Screenshot 3.jpg" width="700">

<br>

4) After those steps the explorer and html structure should look like this:

<img src="./Screenshots Readme/Screenshot 4.jpg" width="200"> &&
<img src="./Screenshots Readme/Screenshot 5.jpg" width="700">

The application is working with JavaScript build only.

<br>

# After set it up into Javascript / set it up into TypeScript:

There is a few things which need to be done:
* Create tsconfig.json file and configure  - “npx tsc --init” 

<img src="./Screenshots Readme/Screenshot 6.jpg" width="700">

* tsconfig.json will initiate an error - that is happening because there are not any .ts files provided yet (just ignore for now).
* Install @types/papaparse for TypeScript - “npm install @types/papaparse --save-dev”
* Check if papaparse and @types/papaparse are exist using “npm list”
* Change extensions “.js” into “.ts”
* Modify the contents of those files(already done it)
* Compile “.ts” file into “.js” using “tsc” command in the terminal 
* tsc --build --clean - undo tsc
* Because in this scenario we use the “live server” not “express” where ever the compiled files will generate the index.html, style.css and papaparse.min.js need to be in this same folder.

After new set up the explorer should looks like that:

<img src="./Screenshots Readme/Screenshot 7.jpg" width="190">

* Now, the papaparse import doesn't work as expected in DataBase.ts so I had to declare the papaparse library globally instead of using node_module directly(the exception is appearing while the app is running). 

Next, in the html structure I needed to provide a “papaparse.min.js” path from folder where .js files was generated via TypeScript.

<img src="./Screenshots Readme/Screenshot 8.jpg" width="600">

<br>

In index.html:

<img src="./Screenshots Readme/Screenshot 9.jpg" width="600">

* Or using the “CDN” in index.html: Don't need TypeScript to process papaparse, It can load it directly in index.html and the structure should look like as in the picture bellow:

<img src="./Screenshots Readme/Screenshot 10.jpg" width="600">

Regarding paths provided at index.html (e.g. “src="./DataBase.js"). The “./” keywords is specify like that because the index.html is in this same file as the others “DataBase.js”, “Navi-btns-alerts-etc.js”, “paparse.min.js”, “style.css”. There is no path needed to provide index.html to search for.

Application is working but not everything works as expected which needs to be fixed.

<br>

## Correction “bugs” while applications is running(Live Server) in “.ts” files: 

I had 2 issues:

1) The keyword “_awaiter” was provided in async “.js” generated functions.
    This issue was recorded as an exception.
    To solve that I changed in tsconfig.json file  “target”: “ES6” into “ESNext” which is stand for native async/await without _awaiter:

    <img src="./Screenshots Readme/Screenshot 11.jpg" width="700">
    
    exception at inspect tool in web browser:

    <img src="./Screenshots Readme/Screenshot 12.jpg" width="700">

<br>

2) Delete button wasn’t working at all at “Applicat Apply View” and that was without EXCEPTION.
    JavaScript’s implicit type coercion hides the problem in my first project.
    TypeScript enforces type safety but doesn’t stop runtime mismatches.
    Even though no exception appeared, the delete button failed due to type mismatches.
    Fixing the type mismatch (ensuring both are strings) made deletion work correctly:
    
    * “phoneNumber” variable in “LoadApplicantProfileAndJobDisplayViewDataIDBAndDisplayInTable()” function is converting all to the “String”.
        
    * “parameter” in the “DeleteApplicantApply()” function is assigned into “string” type annotation instead of number (how it was in JavaScript project).

    <br>

    <img src="./Screenshots Readme/Screenshot 13.jpg" width="1000">

<br>

After corrections of these issues the Single Page Application (SPA) is working as expected.