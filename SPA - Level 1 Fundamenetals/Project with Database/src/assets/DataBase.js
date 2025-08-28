
//-------------------------------------------------------- Main View ----------------------------------------------------------------------------------

// // 1A - Option:  Creating data using static JSON array and display trough the HTML "tbody" implemented in JavaScript -------------------------------------------------------------

// // Creating a "dataStaticJSON" table using static JSON array
// const dataStaticJSON = [
//     { Role_Category: "Advertising", Role: "Media Planning Executive/Manager", Location: "London", Industry: "Advertising, PR, MR, Event Management", Function: "Marketing , Advertising , MR , PR , Media Planning", Job_Title: "Digital Media Planner", experience: "5 - 10 yrs", Salary: "Not Disclosed by Recruiter" },
//     { Role_Category: "Retail Sales", Role: "Sales Executive/Officer", Location: "Leeds", Industry: "IT-Software, Software Services", Function: "Sales , Retail , Business Developme", Job_Title: "Online Bidding Executive", experience: "2 - 5 yrs", Salary: "Not Disclosed by Recruiter" },
//     { Role_Category: "R&D", Role: "R&D Executive", Location: "Manchester", Industry: "Recruitment, Staffing", Function: "Engineering Design , R&D", Job_Title: "Trainee Research/ Research Executive- Hi- Tech Operations", experience: "0 - 1 yrs", Salary: "Not Disclosed by Recruiter" },
//     { Role_Category: "Admin/Maintenance/Security/Datawarehousing", Role: "Technical Support Engineer", Location: "London", Industry: "IT-Software, Software Services", Function: "IT Software - Application Programming, Maintenance", Job_Title: "Technical Support", experience: "0 - 5 yrs", Salary: "2,00,000 - 4,00,000 PA." },
//     { Role_Category: "Programming & Design", Role: "Testing Engineer", Location: "Birmingham", Industry: "IT-Software, Software Services", Function: "IT Software - QA & Testing", Job_Title: "Software Test Engineer-Birmingham", experience: "2 - 5 yrs", Salary: "Not Disclosed by Recruiter" }
// ];

// // Display "dataStaticJSON" in HTML inside "tbody" elements in "Main View" page
// function DisplayStaticDataJSON() {

//     // Get references into HTML "table body" element
//     const tableBodyMainViewStaticJSON = document.getElementById('table-main-view').getElementsByTagName('tbody')[0];


//     // Creating and iterating rows and cells for particular data already existing header rows in HTML structure of "Main-view" page
//     dataStaticJSON.forEach(item => {

//         const row = document.createElement('tr');


//         const cellRoleCategoryStaticJSON = document.createElement('td');
//         cellRoleCategoryStaticJSON.textContent = item.Role_Category;
//         row.appendChild(cellRoleCategoryStaticJSON);

//         const cellRoleStaticJSON = document.createElement('td');
//         cellRoleStaticJSON.textContent = item.Role;
//         row.appendChild(cellRoleStaticJSON);

//         const cellLocationStaticJSON = document.createElement('td');
//         cellLocationStaticJSON.textContent = item.Location;
//         row.appendChild(cellLocationStaticJSON);

//         const cellIndustryStaticJSON = document.createElement('td');
//         cellIndustryStaticJSON.textContent = item.Industry;
//         row.appendChild(cellIndustryStaticJSON);

//         const cellFunctionStaticJSON = document.createElement('td');
//         cellFunctionStaticJSON.textContent = item.Function;
//         row.appendChild(cellFunctionStaticJSON);

//         const cellJobTitleStaticJSON = document.createElement('td');
//         cellJobTitleStaticJSON.textContent = item.Job_Title;
//         row.appendChild(cellJobTitleStaticJSON);

//         const cellexperienceStaticJSON = document.createElement('td');
//         cellexperienceStaticJSON.textContent = item.experience;
//         row.appendChild(cellexperienceStaticJSON);

//         const cellSalaryStaticJSON = document.createElement('td');
//         cellSalaryStaticJSON.textContent = item.Salary;
//         row.appendChild(cellSalaryStaticJSON);

        
        
//         // Adding "Details" button on the end of each row 
//         const cellDetailsApplyStaticJSON = DetailsBtn();
//         row.appendChild(cellDetailsApplyStaticJSON);

//         tableBodyMainViewStaticJSON.appendChild(row);

//     });

//     // checking if function is loaded
//     // console.log("function is executed");
// };




// // 1A.A - Option:  Saving static JSON data in "IndexedDB" and read data from it afterwords-----------------------------------------------------------------------------------


// function JSONStaticDataInIDB() {

//     // Creating instance of "IndexedDB" object
//     let db;


//     /*---------- Opening "IDB" in current browser ------------*/


//     // Opening "IDB". It is creating if it doesn't already exist
//     const openRequestCSVdb = window.indexedDB.open('staticJson_db', 1);  // the second parameter("1") is the version of database - that's determines the database schema

//     // Success handler if browser support IDB
//     openRequestCSVdb.addEventListener("success", () => {
//         console.log("Database is opened successfully");

//         // store the result of opening the database in the "db" variable
//         db = openRequestCSVdb.result;

//         // If the Json static / file source content is specify in this function then we call a function
//         // In this example JSON static data is already implemented globally so function is no needed to call
//         // functionName();

//         // function for reading data from IDB
//         ReadingDataIDB();


//     });

//     // Error handler if browser doesn't support IDB or has has an other initializations issues
//     openRequestCSVdb.addEventListener("error", () => {
//         console.log("Database failed to open");
//     });



//     /*------------ Set up database tables and assign the values into them ------------*/


//     openRequestCSVdb.addEventListener("upgradeneeded", ev => {

//         // grab references to the opened database
//         db = ev.target.result;

//         // create "objectStore" in our database to store the
//         const objectStore = db.createObjectStore('staticJson_os', { keyPath: "Role" });   // {autoIncrement: true} will do as well: (Then "Role_Category" index need to be created exactly this same way as other objects right below )

//         // defining what data items the "objectStore" contain and provide a "complete" console message if do so
//         objectStore.createIndex("Role Category", "Role_Category", { unique: false });
//         objectStore.createIndex("Location", "Location", { unique: false });
//         objectStore.createIndex("Industry", "Industry", { unique: false });
//         objectStore.createIndex("Function", "Function", { unique: false });
//         objectStore.createIndex("Job Title", "Job_Title", { unique: false });
//         objectStore.createIndex("experience", "experience", { unique: false });
//         objectStore.createIndex("Salary", "Salary", { unique: false });

//         console.log("Data table setup is complete");

//         // using transaction "oncomplete" guarantees that the transaction is saved as a whole
//         objectStore.transaction.oncomplete = (ev2) => {

//             // store values in the newly created "objectStore"
//             const jsonObjectStore = db.transaction("staticJson_os", "readwrite").objectStore("staticJson_os");

//             dataStaticJSON.forEach((item) => {
//                 jsonObjectStore.add(item);
//             });

//             console.log("The JSON data is imported into 'indexedDB' tables successfully");
//         };
//     });


//     /*---------- Function reading data from IDB ------------*/

//     function ReadingDataIDB() {

//         // open a read/write db transaction, ready for retrieving the data
//         const retrieveData = db.transaction("staticJson_os", "readonly");


//         // report on the success of the transaction completing, when everything is done
//         retrieveData.oncomplete = () => {
//             console.log("Data is retrieved successfully");
//         };


//         retrieveData.onerror = (ev) => {
//             console.log(`Retrieve not opened due the error: ${ev.target.error}`);
//         };


//         // create an object retrieve on the retrieve data
//         const objectRetrieve = retrieveData.objectStore("staticJson_os");


//         // create a request to get all data
//         const objectRetrieveRequest = objectRetrieve.getAll();

//         objectRetrieveRequest.addEventListener("success", () => {
//             console.log("Data from IDB is readded successfully");

//             const myRecord = objectRetrieveRequest.result;
//             console.log(myRecord);
//         });
//     };
// };






//----------------------------------------------------------- Main View ---------------------------------------------------------------------------------------------------------------------

// 1B - Option:  Functions implementations where "submit" button is pressed on '#File-Load' page --------------------------------------------------------------------------

// CSVIndexedDB implementation such like:
//      readCSV file,
//      initiation IDB,
//      store data in IDB,
//      load Data into table,
//      clearing data in IDB for updating purposes like adding or remove data from CSV file (so far)


function ReadCSVFileAndConvertToJSON(csvFile) {

    // ONLY Reading CSV file and Converting without multiply values in a particular cell separated by comma
    
    /* const readCSVFileAndConvertToJSON = new Promise((resolve, reject) => {

        const fileReader = new FileReader();
        
        fileReader.addEventListener("load", ev => {
            
            const csv = ev.target.result;
            const rows = csv.split('\n');
            const result = [];
            const headers = rows[0].split(',');

            for(let i = 1; i < rows.length; i += 1){
                const obj = {};
                const currentRow  = rows[i].split(',');
                
                headers.forEach((header, j) => {
                    obj[header] = currentRow [j];
                });

                result.push(obj);
            };
            
            resolve(result);
            console.log(result);
        });

        fileReader.addEventListener("error", () => {
            reject(fileReader.error);
        });

        fileReader.readAsText(scvFile);
    });

    return readCSVFileAndConvertToJSON; */


    
    // This one is using "papaParse" package ("npm install papaparse command" in terminal) and provide source path of "papaparse.min.js" in second script element in HTML file
    // ONLY if we have dealing with CSV files which contains multiply values in particular cell separated by commas 
    const readCSVFileAndConvertToJSON = new Promise((resolve, reject) => {

        const fileReader = new FileReader();

        fileReader.addEventListener("load", ev => {
            const csv = ev.target.result;

            Papa.parse(csv, {
                header: true,           // treat the first row as headers
                skipEmptyLines: true,   // skip empty lines
                dynamicTyping: true,    // this means every numbers or boolean values which are in string it will automatically converts to: numbers string into numbers and "true" or "false" strings into boolean true or false values
                                        // by default ("dynamicTyping: flase"), all fields remains string only
                complete: result => {   // treat as when task is complete successful
                    resolve(result.data);
                    console.log(result.data);
                },
                error: error => {
                    reject(error);
                }
            });
        });

        
        fileReader.addEventListener("error", () => {
            reject(fileReader.error);
        });

        fileReader.readAsText(csvFile);
    });

    return readCSVFileAndConvertToJSON;
};


// Open IDB(IndexedDB) and creating tables in new CSV database
function initCSVIndexedDB() {

    let db;

    const initIDB = new Promise((resolve, reject) => {

        // opening database
        const openRequestCSVdb = window.indexedDB.open('CSVDataIDB', 1);

        // creating tables of new opened databases
        openRequestCSVdb.addEventListener("upgradeneeded", ev => {
            db = ev.target.result;

            db.createObjectStore('csvData_os', { keyPath: "Role" });    // "{ autoIncrement: true }" - every record stored in the csvData_os object store will be automatically assigned a unique numeric key, starting from 1, and incrementing with each new entry.

        });

        // success handler
        openRequestCSVdb.addEventListener("success", ev => {
            resolve(ev.target.result);
            console.log("CSV database, opened successfully");
        });

        // error handler
        openRequestCSVdb.addEventListener("error", (ev) => {
            reject(ev.target.error);
            console.log("CSV database failed to open");
        });
    });

    return initIDB;
};


// Add CSV JSON Data into IDB
function StoreCSVJSONDataInIDB(csvData) {

    return initCSVIndexedDB().then(db => {
        const storeCSVJSONDataInIDB = new Promise((resolve, reject) => {

            // open a read/write db transaction, ready for adding the data
            const CSVTransaction = db.transaction(['csvData_os'], "readwrite");

            // create a "CSVObjectsStore" variable to enable operations such as: adding, retrieving(reading), updating, deleting records within this "object store" during the scope of transaction
            const CSVObjectsStore = CSVTransaction.objectStore('csvData_os');

            // check if the data is an array or a single object and convert to an array if needed (later implemented). We achieved this using "Array" class to convert anything into Array and checking that condition using "Ternary" operator
            const dataArray = Array.isArray(csvData) ? csvData : [csvData];         // this ensures that dataArray is always an array, whether the input is a single object or an array of objects.
                                                                                    // because at "Add / Edit Job Employer" we modify the job (if wanted to) ONLY if we pressing "Manage" anchor button at "Main View Employer" page

            dataArray.forEach(item => {      // before was "csvData.forEach()"
                CSVObjectsStore.put(item);   // add - if we want add ONLY and for update we need to use "ClearCsvIDBStore" method in "Submit" button in try catch block
                                             // put - if updates a given record in a database, or inserts a new record if the given item does not already exist. NO "ClearCsvIDBStore" is needed any more

                CSVTransaction.oncomplete = () => { // event listener it wont works in "forEach" statement block
                    resolve();
                    console.log("Transaction completed successfully");
                    console.log("CSV file added to database table successfully");
                };
                                                    
                CSVTransaction.onerror = ev => {
                    reject(ev.target.error);
                    console.error("CSV file is NOT added to database table");
                    console.error("Transaction failed");
                };

            });

        });

        return storeCSVJSONDataInIDB;
    });
};


// Load CSV JSON Data from IDB and display it in the "Main View" table page
// LoadCSVDatafromIDBandDisplayInTable() doesn’t need to be explicitly marked as async or return a Promise because it already includes asynchronous operations inside, handled through chaining with .then() method. 
// Also in this case we not need to return "initCSVIndexedDB" because is simply ensuring that CSVDataIDB is open before any data operations occur
function LoadCSVDatafromIDBandDisplayInTable() {

    initCSVIndexedDB().then(db => {

        const loadCSVTransaction = db.transaction(['csvData_os'], "readonly");
        const loadCSVStoreObject = loadCSVTransaction.objectStore('csvData_os');
        const loadRequestCSVData = loadCSVStoreObject.getAll();

        loadRequestCSVData.addEventListener("success", (ev) => {
            const csvDataLoad = ev.target.result;

            // declare and define HTML reference foor the table in "Main View"
            const tableBodyMainViewCSVJSON = document.getElementById('tbody-main-view');
            tableBodyMainViewCSVJSON.innerHTML = "";  // clear any existing content implemented at <tbody> attribute in "Main view" page

            csvDataLoad.forEach(item => {

                // Remove "__parsed_extra" field(objectStore) before displaying in the tableBody
                // The "__parsed_extra" object is from "Papa.parse()" method which we used for CSV file converting to JSON. This process adding the "__parsed_extra" additional field which is appended in IDB.
                delete item.__parsed_extra;

                // Creating rows
                const row = document.createElement('tr');

                // The "Object.keys()" is useful when you need to iterate over an object's properties.
                Object.keys(item).forEach(key => {
                    const cell = document.createElement('td');
                    cell.textContent = item[key];   // cell.textContent = item[key] || ""; - provide data cell or as a default leave cell empty
                    
                    row.appendChild(cell);
                });

                
                // // Second way iterate over the object's properties and create table cells using "hasOwnProperty(key)".
                // for(const key in item){
                //     if(item.hasOwnProperty(key)){
                //         const cell = document.createElement('td');
                //         cell.textContent = item[key];
                //         row.appendChild(cell);
                //     }
                // }


                // Adding "Details / Apply" cell button which navigate to "Applicant job display view" page
                
                // Now, pass the "Role" key to the DetailsBtn
                const role = item.Role;  // Accessing the role from the data object
                const cellDetailBtnCSVJSON = DetailsBtn(role);  // passing "Role" to the DetailsBtn
                row.appendChild(cellDetailBtnCSVJSON);

                
                // append the filled row to the tbody "Main View"
                tableBodyMainViewCSVJSON.appendChild(row);

            });

            console.log("The 'CVS' data is imported from \"CSVDataIDB\" and loaded into 'Main View' table successfully");
        });
    });    
};


// // Clearing CSVIDB and prepare space for rewriting data manually in "csv" file.
// // ONLY if we use ".add()" method inside "StoreCSVJSONDataInIDB" within Promises statement
// function ClearCsvIDBStore(){
//     return initCSVIndexedDB().then(db => {
//         const ClearCsvIDBStore = new Promise((resolve, reject) => {
            
//             const clearTransaction = db.transaction(['csvData_os'], "readwrite");
//             const clearObjectStore = clearTransaction.objectStore('csvData_os');
//             const clearDataRequest = clearObjectStore.clear();

//             clearDataRequest.addEventListener("success", () => {
//                 resolve();
//             });

//             clearDataRequest.addEventListener("error", ev => {
//                 reject(ev.target.error);
//             });
//         });

//         return ClearCsvIDBStore;
//     });
// }



//-------------------------------------------------------- Applicant Job Display View ----------------------------------------------------------------------------------
// Populate Data from "Main View" into "Applicant Job Display View" page using "DetailsBtn" which passing the key path "Role" from "CSVDataIDB"-----------------------------------------


function PopulateIntoApplicantJobDisplayView(role){

    return initCSVIndexedDB().then(db => {
        return new Promise((resolve, reject) => {

            const transactionRetrieve = db.transaction(['csvData_os'], "readonly");
            const objectStoreRetrieve = transactionRetrieve.objectStore('csvData_os');
            
            // Request the objet using the "Role" as the keyPath
            const requestRetrieveRole = objectStoreRetrieve.get(role);
    
            requestRetrieveRole.addEventListener("success", ev => {
                const data = ev.target.result;
    
                if(data){

                    // delete "__parsed_extra" to prevent null value and also is unnecessary field
                    if(data.__parsed_extra){
                        delete data.__parsed_extra;
                    };

                    // Populate fields with fetched data
                    document.getElementById('applicant-job-display-role-category-drop-down').value = data['Role Category'] || 'Select Role Category';
                    document.getElementById('applicant-job-display-role').value = data['Role'] || '';
                    document.getElementById('applicant-job-display-location-combo-box').value = data['Location'] || 'Select Location';
                    document.getElementById('applicant-job-display-industry').value = data['Industry'] || '';
                    document.getElementById('applicant-job-display-function').value = data['Function'] || '';
                    document.getElementById('applicant-job-display-job-title').value = data['Job Title'] || '';
                    document.getElementById('applicant-job-display-experience').value = data['Experience'] || '';
                    document.getElementById('applicant-job-display-salary').value = data['Salary'] || '';                    
                }
                else{
                    console.log("No data found for 'Role'");
                }
                resolve();
                console.log("Data from \"Main View\" populated successfully");
            });

            requestRetrieveRole.addEventListener("error", ev => {
                reject(ev.target.error);
            });

            // checking if "Applicant Profile" page contain name, phone and email. Whatever exist or not, show or hide the following buttons in "Applicant Job Display View"
            // also this method need to invoking here rather then at "UpdatePageContent" method (where all pages contents invokes in if statements blocks), just for in case if the page "Applicant Job Display View" it will reload for some reason, then the values are will disappear and applicant would not able to apply any more (even if name, phone, and email are present at localStorage)
            ApplicantProfileInputsCheckAndDisplayBtnsAtAJDV();
        });
    });

}


// checking if "Applicant Profile" page contain name, phone and email (at localStorage). Whatever exist or not, show or hide the following buttons in "Applicant Job Display View"
function ApplicantProfileInputsCheckAndDisplayBtnsAtAJDV(){

    // getting references to the HTML elements    
    const applicantProfileBtn = document.getElementById('applicant-profileBtn');
    const applicantApplyMessageBtn = document.getElementById('applyMessageBtn');

    // getting applicant profile data from localStorage (essentially is checking is data exist or not at local storage)
    const applicantNameLS = localStorage.getItem('applicant-profile-name');
    const applicantPhoneLS = localStorage.getItem('applicant-phone');
    const applicantEmailLS = localStorage.getItem('applicant-email');

    // If "Applicant Profile" is incomplete, show applicant profile anchor btn and hide "Apply" button
    if(!applicantNameLS || !applicantPhoneLS || !applicantEmailLS){
        
        applicantProfileBtn.style.display = 'block';
        applicantApplyMessageBtn.style.display = 'none';
    }
    else{

        // if "Applicant Profile" exist hide applicant profile anchor btn and show "Apply" button
        applicantProfileBtn.style.display = 'none';
        applicantApplyMessageBtn.style.display = 'block';
    }
}


// leave "Applicant Profile" anchor button and hide "Apply" button if data not exist at "Applicant Job Display View"
function NoPopulateDataAtApplicantJobDisplayView(){

    const applicantProfileBtn = document.getElementById('applicant-profileBtn');
    const applicantApplyMessageBtn = document.getElementById('applyMessageBtn');

    applicantProfileBtn.style.display = 'block';
    applicantApplyMessageBtn.style.display = 'none';
}



// //----------------------------------------------------------- Applicant Profile --------------------------------------------------
// // ApplicantProfile IDB & localStorage ----------------------------------------------------------------


// // Initialize Applicant Profile database
// function initApplicantProfileIDB(){

//     let db;

//     return new Promise((resolve, reject) => {

//         // creating and opening new database
//         const openRequestApplicantProfileDB = window.indexedDB.open('ApplicantProfileIDB', 1);

//         // creating table of new opened databases
//         openRequestApplicantProfileDB.addEventListener("upgradeneeded", ev => {
//             db = ev.target.result;
            
//             // create object store for "applicantProfile_os" with "Email" as the keyPath
//             const applicantProfileStoreOS = db.createObjectStore('applicantProfile_os', {keyPath: "Applicant_Name"});
            
//             // creating indexes for "applicantProfile_os"
//             applicantProfileStoreOS.createIndex("Applicant Name", "Applicant_Name", {unique: true});
//             applicantProfileStoreOS.createIndex("Phone Number", "Phone_Number", {unique: false});
//             applicantProfileStoreOS.createIndex("Email", "Email", {unique: false});
//             applicantProfileStoreOS.createIndex("Profile Picture", "Profile_Picture", {unique: false});
//             applicantProfileStoreOS.createIndex("CV", "CV", {unique: false});

//         });

//         openRequestApplicantProfileDB.addEventListener("success", ev => {
//             resolve(ev.target.result);
//             console.log("Applicant profile database, opened successfully");
//         });

//         openRequestApplicantProfileDB.addEventListener("error", ev => {
//             reject(ev.target.error);
//             console.log("Applicant profile database fail to open");
//         });
//     });

// };


// // Store data in ApplicantProfileIDB from localStorage
// function StoreApplicantProfileDataIDB(){

//     return initApplicantProfileIDB().then(db => {
//         return new Promise((resolve, reject) => {
            
//             const applicantDataTransaction = db.transaction(['applicantProfile_os'], "readwrite");
//             const applicantDataObjectsStore = applicantDataTransaction.objectStore('applicantProfile_os');

//             // provide the applicant data object from localStorage
//             const applicantData = {
//                 Applicant_Name: localStorage.getItem("applicant-profile-name"),
//                 Phone_Number: localStorage.getItem("applicant-phone"),
//                 Email: localStorage.getItem("applicant-email"),
//                 Profile_Picture: localStorage.getItem("applicantProfilePictureDataURL"),
//                 CV: localStorage.getItem("applicantProfileCVDataURL")
//             }
            
//             // Put (add/update) the applicant data into the object store
//             const request = applicantDataObjectsStore.put(applicantData);

//             request.addEventListener("success", () => {
//                 resolve();
//                 console.log("Applicant profile data is added to database successfully.");
//             });

//             request.addEventListener("error", ev => {
//                 reject(ev.target.error);
//                 console.log("Applicant Profile data is NOT added to database table");
//             });

//             applicantDataTransaction.addEventListener("complete", () => {
//                 resolve();
//                 console.log("Transaction completed successfully");
//             });

//             applicantDataTransaction.addEventListener("error", ev => {
//                 reject(ev.target.error);
//                 console.error("Transaction failed", error);
//             });
            
//         });
//     });    
// }



// Get welcome name to the "Applicant Profile" page
async function ApplicantProfileGetWelcomeName(){
    
    const applicantWelcomeName = document.getElementById('applicant-profile-welcome-name');    
    const applicantNameInput = document.getElementById('applicant-profile-name');    

    
    applicantNameInput.addEventListener("blur", ev => {
        ev.preventDefault();
        
        const savedName = localStorage.getItem('applicant-profile-name');     

        if(applicantNameInput){
            applicantWelcomeName.textContent = savedName;
        }
        else{
            applicantWelcomeName.textContent = "Applicant Name (Entered)";
        }       
    });
}


// Uploading and displaying "Applicant Profile" picture      / function Name..(LS).. - LocalStorage
async function ApplicantProfilePictureUploadAtLSandDisplay(){
    
    const applicantImageSrc = document.getElementById('applicant-profile-photo-src');
    const applicantPictureInput = document.getElementById('applicant-profile-picture');

    applicantPictureInput.addEventListener("change", ev => {
        ev.preventDefault();
        
        ////// Note:
        
        /// checking in the console if the file is actually chosen by the user. If so, the first file it will index "0" as is shown on console log. That's why we know which file we need to chose when we getting the file as below"...files[0]"
        /// because we use the "blur" event for saving data and if you want to log result in console you must delete the attribute "save-input-data-blur" on this particular element which you corrent working on
        /// next, under the method just invoke "DOM" on load as follow:
        /// document.addEventListener("DOMContentLoaded", () => {
        ///     ApplicantProfilePictureUploadAtLSandDisplay();
        /// });
        /// now you are able to see the result on console log ;) 

        // console.log(applicantPictureInput.files);

        // get the selected file
        const imageFile = ev.target.files[0];

        // converting file into data url (in this case the url contains the information about this image file in string format)
        const imageFileReader = new FileReader();

        // add a "load" event listener to the "fileReader" instance 
        imageFileReader.addEventListener("load", ev => {
            const imageDataURL = ev.target.result;

            // set the "src" of the img element to display the image
            applicantImageSrc.src = imageDataURL;

            // save the image data URL to localStorage
            localStorage.setItem("applicantProfilePictureDataURL", ev.target.result);
                        
            // console.log(ev.target.result)    // the result it will print in the console only when the "imageFile" it will reading the data URL as below outside of the "load" listener
        });

        // start reading the image file as data URL
        imageFileReader.readAsDataURL(imageFile);
    });
}


// Uploading and displaying "Applicant Profile" CV        / function Name..(LS).. - LocalStorage
async function ApplicantProfileCVUploadAtLSandDownload(){

    const applicantProfileCvInput = document.getElementById('applicant-profile-cv');
    const applicantProfileCVLink = document.getElementById('applicant-profile-CV-link');

    const applicantName = localStorage.getItem('applicant-profile-name');


    applicantProfileCvInput.addEventListener("change", ev => {
        ev.preventDefault();
        
        // checking the file if is chosen by user
        // console.log(applicantProfileCvInput.files);

        // get the selected file
        const cvFile = ev.target.files[0];


        // converting file into data URL(is converting URL path into string)
        const cvFileReader = new FileReader();

        // checking file type
        const fileType = cvFile.type;

        // set up file reading based on file type
        if(fileType === "text/plain"){
            
            // for text files
            fileReader.readAsText(cvFile);
        }
        else if(fileType === "application/pdf" ||
                fileType === "application/rtf" ||
                fileType === "application/msword" ||    // for .doc
                fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"  // for .docx
        ){
            cvFileReader.readAsDataURL(cvFile);
        }

        // store the file content when the file is loaded.
        cvFileReader.addEventListener("load", ev => {
            const cvDataURL = ev.target.result;

            
            // // set the href of CV link to the Data URL;
            // applicantProfileCVLink.href = CVDataURL;
            // applicantProfileCVLink.download = cvFile.name;

            // save the file content as a string in localStorage
            localStorage.setItem("applicantProfileCVDataURL", cvDataURL);

            // console.log(CVDataURL);  checking only


            // check if CV is already exist in localStorage, if so then immediately trigger for downloading
            const storedCV = localStorage.getItem('applicantProfileCVDataURL');

            if(storedCV){

                // If a CV exists, enable the download link
                applicantProfileCVLink.href = storedCV;

                //applicant name while the CV is downloaded
                applicantProfileCVLink.setAttribute("download", `${applicantName} CV`);
                applicantProfileCVLink.textContent = "Download CV";
                // applicantProfileCVLink.style.pointerEvents = "auto";
            
            }
        });
    });    
}


// function for providing current data while the Applicant Profile page is reload
async function ApplicantProfileReloadedContent(){

    applicantWelcomeSpan = document.getElementById('applicant-profile-welcome-name');
    applicantPictureSrc = document.getElementById('applicant-profile-photo-src');
    applicantCVLink = document.getElementById('applicant-profile-CV-link');

    
    // handle page load or back/forward button navigation
    if(localStorage.length > 0){
        const applicantName = localStorage.getItem('applicant-profile-name');
        const applicantPicture = localStorage.getItem('applicantProfilePictureDataURL');
        const applicantCV = localStorage.getItem('applicantProfileCVDataURL');

        if(applicantName){
            applicantWelcomeSpan.textContent = applicantName;  //update the welcome span text
        }
        
        // Update applicant picture if it exist
        if(applicantPicture){
            applicantPictureSrc.src = applicantPicture;     // update the image source
        }

        // update CV link if is exist
        if(applicantCV){
            applicantCVLink.href = applicantCV;     // update the link href to the CV URL
            applicantCVLink.setAttribute("download", `${applicantName} CV`);
            applicantCVLink.textContent = "Download CV";
        }

    }
}  


// while typing a new name, clear applicant profile keys localStorage and letting provide other applicants input data
async function ChangeNameApplicantProfileAndClearLocalStorageKeys(){

    const applicantNameInput = document.getElementById('applicant-profile-name');
    const welcomeSpan = document.getElementById('applicant-profile-welcome-name').textContent.trim();

    applicantNameInput.addEventListener("change", async ev => {
        // console.log("Name is now: ", ev.target.value);    // for checking only
        
        const newName = ev.target.value.trim();
        const existingApplicantProfileName = localStorage.getItem('applicant-profile-name');

        // proceed only if the new name is different from the welcomeSpan, is not empty and if is not this same as already existing applicant profile name at localStorage
        if (newName !== welcomeSpan && newName!== '' && newName !== existingApplicantProfileName){

            // waiting for clearing localStorage first before move forward
            await ClearApplicantProfileLocalStorageDataKeys();

            // set new name in local storage
            localStorage.setItem('applicant-profile-name', newName);
            
            // reload the page after setting the new name
            location.reload();
        }
    }); 
}


// function for clearing localStorage if the new applicant providing new data
async function ClearApplicantProfileLocalStorageDataKeys(){

    
    // specify the keys to be cleared
    const fieldsToClear = [ 'applicant-profile-name', 'applicant-phone', 'applicant-email', 'applicantProfilePictureDataURL', 'applicantProfileCVDataURL', 'applicant-profile-picture', 'applicant-profile-cv' ];

    // clearing localStorage "keys" at "Applicant Profile" page
    fieldsToClear.forEach(key => {
        localStorage.removeItem(key);
    });

    console.log("LocalStorage cleared for new applicant");


    // // simply clearing all entire localStorage
    // localStorage.clear();

    // console.log("LocalStorage cleared");

}    


// hide "Applicant Profile" button in Main View page if "Applicant Profile" page contain any data
async function HideApplicantProfileBtnsAtMainView(){

    // getting references to the HTML elements
    const applicantProfileMainViewBtn = document.getElementById('main-view-applicant-profile-anchor');

    // getting applicant profile data from localStorage
    const applicantNameInput = localStorage.getItem('applicant-profile-name');
    const applicantPhoneInput = localStorage.getItem('applicant-phone');
    const applicantEmailInput = localStorage.getItem('applicant-email');

    // If "Applicant Profile" is incomplete, show and hide buttons
    if(applicantNameInput && applicantPhoneInput && applicantEmailInput){
        
        applicantProfileMainViewBtn.style.display = 'none';
    }
}



// // --------------------------------------------- Applicant Job Display View -------------------------------------------------------
// // ApplicantJobDisplayViewIDB ----------------------------------------------------------------

// function initApplicantJobDisplayViewIDB(){
    
//     let db;
    
//     return new Promise((resolve, reject) =>{

//         // creating and opening new database
//         const openRequestApplicantJobDisplayView = window.indexedDB.open('ApplicantJobDisplayViewIDB', 1);

//         // creating table of new opened database
//         openRequestApplicantJobDisplayView.addEventListener("upgradeneeded", ev => {
//             db = ev.target.result;

//             // creating object stores tables
//             db.createObjectStore('applicantJobDisplayView_os', {autoIncrement: true});      // {keyPath: "Role"} The exception appearing if other applicant will apply on already existing vacancy at "Applicant(s) Applies View" page
//         });

//         openRequestApplicantJobDisplayView.addEventListener("success", ev =>{
//             resolve(ev.target.result);
//             console.log("Applicant Job Display View database is opened successfully");
//         });

//         openRequestApplicantJobDisplayView.addEventListener("error", ev => {
//             reject(ev.target.error);
//             console.log("Applicant Job Display View database is fail to open:", ev.target.error);
//         });
//     });
// }


// function StoreApplicantJobDisplayViewDataInIDB(){

//     return initApplicantJobDisplayViewIDB().then(db => {
//         return new Promise((resolve, reject) => {

//             const transact = db.transaction(['applicantJobDisplayView_os'], "readwrite");
//             const objStore = transact.objectStore('applicantJobDisplayView_os');


//             // getting the values from the HTML elements
//             const roleCategoryDropDown = document.getElementById('applicant-job-display-role-category-drop-down').value;
//             const role = document.getElementById('applicant-job-display-role').value;
//             const locationComboBox = document.getElementById('applicant-job-display-location-combo-box').value;
//             const industry = document.getElementById('applicant-job-display-industry').value;
//             const functionAsRole = document.getElementById('applicant-job-display-function').value;
//             const jobTitle = document.getElementById('applicant-job-display-job-title').value;
//             const experience = document.getElementById('applicant-job-display-experience').value;
//             const salary = document.getElementById('applicant-job-display-salary').value;

//             // create the object containing the data to be stored in IDB
//             const applicantJobDisplayViewData = {

//                 Role_Category: roleCategoryDropDown,
//                 Role: role,
//                 Location: locationComboBox,
//                 Industry: industry,
//                 Function: functionAsRole,
//                 Job_Title: jobTitle,
//                 Experience: experience,
//                 Salary: salary
//             }

//             // adding applicant data to the object store 'applicantJobDisplayView_os'
//             const requestData = objStore.add(applicantJobDisplayViewData);

//             // data request successful or NOT
//             requestData.addEventListener("success", () =>{
//                 resolve();
//                 console.log("The Applicant Job Display View is added to database table successfully");
//             });

//             requestData.addEventListener("error", ev => {
//                 reject(ev.target.error);
//                 console.log("The ApplicantJob Display View data in NOT added to database table: ", ev.traget.error);
//             });

//             // transaction completed or NOT
//             transact.addEventListener("complete", () =>{
//                 resolve();
//                 console.log("The Applicant Job Display View transaction is completed");
//             });

//             transact.addEventListener("error", ev =>{
//                 reject(ev.traget.error);
//                 console.log("The Applicant Job Display View data transaction is failed: ", ev.traget.error);
//             });
//         });
//     });
// }


/* 
    At the beginning that was my first idea to store data of each pages in separate storages like localStorage and "ApplicantProfileIDB" which these two was corresponding each other just only for "Applicant Profile" and other IDB one just for "Applicant Job Display View" to retrieve all data and display later on in new page "Applicant(s) Applies View"(this page is NEW and I added personally just for better working the whole application purposes).
    The "Business Scenario" doesn't provide anything about displaying applicant jobs chosen from the "Main View" page. So I thought is good to create one 
    
    However later on I realise is to complicated to do like it was as my first idea, so instead of that I create other IDB "ApplicantProfileAndJobDisplayViewIDB" which is stand for store, retrieve and display all data from two pages on this same time in "Applicant(s) Profile View" page to have an access which jobs applicant has applied for.
    
    Now I realise the "ApplicantProfileIDB" & "ApplicantJobDisplayViewIDB" are unnecessary created. However I decided to leave them (active / or commented) just for learning purposes ONLY.
 
*/




// ---------------------------------------------- Combine two pages data into one database -----------------------------------------
// ApplicantProfileAndJobDisplayViewIDB ----------------------------------------------------------------------------------


function initApplicantProfileAndJobDisplayViewIDB(){
    
    let db;
    
    return new Promise((resolve, reject) =>{

        // creating and opening new database
        const openRequestApplicantJobDisplayView = window.indexedDB.open('ApplicantProfileAndJobDisplayViewIDB', 1);

        // creating table of new opened database
        openRequestApplicantJobDisplayView.addEventListener("upgradeneeded", ev => {
            db = ev.target.result;

            // creating object stores tables
            db.createObjectStore('ApplicantProfileAndJobDisplayView_os', {autoIncrement: true});  // {keyPath: "Applicant_Name"}    // The exception appearing if the SAME applicant applied on at least two different jobs 
        });

        openRequestApplicantJobDisplayView.addEventListener("success", ev =>{
            resolve(ev.target.result);
            console.log("Applicant Profile and Job Display View database is opened successfully");
        });

        openRequestApplicantJobDisplayView.addEventListener("error", ev => {
            reject(ev.target.error);
            console.log("Applicant Profile and Job Display View database is fail to open:", ev.target.error);
        });
    });
}



function StoreApplicantProfileAndJobDisplayViewDataInIDB(){

    return initApplicantProfileAndJobDisplayViewIDB().then(db => {
        return new Promise((resolve, reject) => {

            const transact = db.transaction(['ApplicantProfileAndJobDisplayView_os'], "readwrite");
            const objStore = transact.objectStore('ApplicantProfileAndJobDisplayView_os');


            // getting the values from the HTML elements of Applicant Job Display View
            const roleCategoryDropDown = document.getElementById('applicant-job-display-role-category-drop-down').value;
            const role = document.getElementById('applicant-job-display-role').value;
            const locationComboBox = document.getElementById('applicant-job-display-location-combo-box').value;
            const industry = document.getElementById('applicant-job-display-industry').value;
            const functionAsRole = document.getElementById('applicant-job-display-function').value;
            const jobTitle = document.getElementById('applicant-job-display-job-title').value;
            const experience = document.getElementById('applicant-job-display-experience').value;
            const salary = document.getElementById('applicant-job-display-salary').value;

            // create the object containing the data to be stored in IDB
            const applicantProfileAndJobDisplayViewData = {

                Role_Category: roleCategoryDropDown,
                Role: role,
                Location: locationComboBox,
                Industry: industry,
                Function: functionAsRole,
                Job_Title: jobTitle,
                Experience: experience,
                Salary: salary,
                Applicant_Name: localStorage.getItem("applicant-profile-name"),
                Phone_Number: localStorage.getItem("applicant-phone"),
                Email: localStorage.getItem("applicant-email"),
                Profile_Picture: localStorage.getItem("applicantProfilePictureDataURL"),
                CV: localStorage.getItem("applicantProfileCVDataURL")

            }

            // adding applicant data to the object store 'applicantJobDisplayView_os'
            const requestData = objStore.add(applicantProfileAndJobDisplayViewData);

            // data request successful or NOT
            requestData.addEventListener("success", () =>{
                resolve();
                console.log("The Applicant Profile and Job Display View is added to database table successfully");
            });

            requestData.addEventListener("error", ev => {
                reject(ev.target.error);
                console.log("The Applicant Profile and Job Display View data in NOT added to database table: ", ev.target.error);
            });

            // transaction completed or NOT
            transact.addEventListener("complete", () =>{
                resolve();
                console.log("The Applicant Profile and Job Display View transaction is completed");
            });

            transact.addEventListener("error", ev =>{
                reject(ev.traget.error);
                console.log("The Applicant Profile and Job Display View data transaction is failed: ", ev.target.error);
            });
        });
    });
}



// retrieve "Applicant Profile and Job Display View" data from IDB and display in "Applicant(s) Applies View" table
function LoadApplicantProfileAndJobDisplayViewDataIDBAndDisplayInTable(){

    initApplicantProfileAndJobDisplayViewIDB().then(db => {

        const loadTransaction = db.transaction(['ApplicantProfileAndJobDisplayView_os'], "readonly");
        const loadObjStore = loadTransaction.objectStore('ApplicantProfileAndJobDisplayView_os');

        const requestLoadObjStore = loadObjStore.getAll();

        // if request success - display this particular dataIDB
        requestLoadObjStore.addEventListener("success", ev => {
            const dataIDB = ev.target.result;

            // for checking only
            // console.log("Applicant Job display view data result: ", ev.target.result);

            // declare and define HTML reference for the table in "Applicants applies"
            const tBodyApplicantsApplies = document.getElementById('tbody-applicants-applies');
            
            // clear any existing content implemented at <div id="applicant-job-display-view-IDBcontent"> element at "Applicant(s) Applies View" page
            tBodyApplicantsApplies.innerHTML = "";

            // iterating IDB data using forEach method
            dataIDB.forEach(item => {

                // creating a new row for each data entry
                const row = document.createElement('tr');

                // // iterate over an object's properties dataIDB and display through the cells using "Object.keys()" method. Without data URL passing via buttons or anchor(href) 
                // Object.keys(item).forEach(key => {
                    
                //     // creating cells
                //     const cell = document.createElement('td');

                //     // provide every item of object store to the individual cell
                //     cell.textContent = item[key] || ""; // insert data into cells, default to empty if no data

                //     // displaying cell
                //     row.appendChild(cell);
                // });

                
                // iterate over an object's properties dataIDB and display through the cells using "Object.keys()" method. ONLY if we dealing with "data URL" like in this example which are in "Picture_Profile" and "CV" and they need to be passing via buttons or anchors(href) like is on example below 
                Object.keys(item).forEach((key, index) => {
                    if(key === "Profile_Picture" || key === "CV"){  // handle applicant picture and CV separately
                        
                        // skip handling "Profile_Picture" and "CV" for now, handle them separately below
                        return;
                    }

                    const cell = row.insertCell(index);      // create or find corresponding table cell
                    cell.textContent = item[key] || "";      // insert data into cells, default to empty if no data
                 });

                 
                 
                 /* handle the "Profile_Picture" (if exists) using ".insertCell()" and "Object.keys()" methods */
                 const photoCell = row.insertCell(Object.keys(item).length - 2);    // The predefined(wstepnie zdefiniowany) index for profile picture.                                                                                     
                                                                                    // Generally the "Object.keys()" method is associated with object store fields in "ApplicantProfileAndJobDisplayView_os", so available cells are 13 and always is 1 extra. So 14 in total. That is mean any last Cell (heder or normal) after in this case 13 cells it will always specify as "..length" not "...length + 1";
                                                                                    // The "...length + 1"; it will available ONLY THEN when all cells will field out. In his case after 14 cells if you want add unspecified one the ""...length + 1";" will work perfectly without throwing exceptions via compiler
                                                                                    // The "-2" is the cell which need to be assigned into "Applicant Picture" cell.                                                                                    
                 const photoImg = document.createElement('img');
                 photoImg.style.width = "100px";
                 photoImg.style.height = "70px";
                 
                 if(item.Profile_Picture){
                    photoImg.src = item.Profile_Picture;
                    photoImg.style.display = "block";
                    // append the image to the cell
                    photoCell.appendChild(photoImg);
                 }
                 // if not exist 
                 else{
                    // photoImg.style.display = "none";
                    const text = document.createElement('span');
                    text.textContent = "No Picture Provided";

                    // adding text into photo cell
                    photoCell.appendChild(text);
                 }
                
                 
                 
                 /* handle the "CV" (if exists) */
                 const cvCell = row.insertCell(Object.keys(item).length - 1);
                 const cvLink = document.createElement('a');                 
                 cvLink.classList.add('nav-link', 'green-btn');

                 if(item.CV){
                    cvLink.href = item.CV;
                    cvLink.textContent = "Download CV";
                    cvLink.setAttribute("download", `${item.Applicant_Name} CV`);
                    cvCell.appendChild(cvLink);
                 }
                 else{
                    const text = document.createElement('span');
                    text.textContent = "No CV Provided";
                    cvCell.appendChild(text);
                 }


                 
                 /* handle the delete button */
                 const deleteCell = row.insertCell(Object.keys(item).length);
                 const deleteBtn = document.createElement('button');
                 deleteBtn.textContent = "Delete";
                 deleteBtn.classList.add('pink-btn');

                 if(item.Applicant_Name){

                    // appending button
                    deleteCell.appendChild(deleteBtn);

                    // create a key "Phone_number" and passing for "DeleteApplicantApply" particular applicant and execute the method via "click" listener
                    const phoneNumber = item.Phone_Number;
                    deleteBtn.addEventListener("click", () => {
                        DeleteApplicantApply(phoneNumber);
                        // location.reload();
                    });
                    
                 }


                // append the filled row to the tbody Applicant(s) Applies
                tBodyApplicantsApplies.appendChild(row);
            });

            console.log("The data from Applicant Profile and Job Display View is loaded and displayed successfully at Applicant(s) Applies table.");
        });
    });
}


// delete the current applicant using openCursor() method because we are not specify keypath in "ApplicantProfileAndJobDisplayView_os" to handle multiply applies for this same applicant(user) name or this same vacancy job
function DeleteApplicantApply(deleteViaPhoneNr){

    initApplicantProfileAndJobDisplayViewIDB().then(db => {
        const trans = db.transaction(['ApplicantProfileAndJobDisplayView_os'], "readwrite");
        const objStore = trans.objectStore('ApplicantProfileAndJobDisplayView_os');

        const requestCursor = objStore.openCursor();

         requestCursor.addEventListener("success", ev =>{
            const cursor = ev.target.result;
            
            if(cursor){
                
                // match if applicant phone matches the one you want to delete
                if(cursor.value.Phone_Number === deleteViaPhoneNr){

                    // use the cursor's key to delete particular applicant
                    cursor.delete();
                    location.reload();
                    console.log("Applicant has been deleted");
                }
                else{
                    
                    // if not matching go to the next applicant if available
                    cursor.continue();
                }
            }
            else {
                console.log("No more applicants to process");
            }
         }); 
    });
}


// function for showing or hiding "Applicant(s) Applies" anchor button whenever applicant applied or not and if so, is stored at "ApplicantProfileAndJobDisplayView_os".
async function ShowingApplicantAppliesBtnAtMainViewEmployer(){
    
    const mainViewEmployerApplicantAppliesHref = document.getElementById('main-view-employer-applicant-applies-href');

    // open the IDB connection
    initApplicantProfileAndJobDisplayViewIDB().then(db => {

        // start transaction and open the object store
        const trans = db.transaction(['ApplicantProfileAndJobDisplayView_os'], "readonly");
        const objStore = trans.objectStore('ApplicantProfileAndJobDisplayView_os');

        // use count method to check if there are any records in the object store
        const countRequest = objStore.count();

        countRequest.addEventListener("success", ev => {
            // const count = countRequest.result;   // this works as well
            const count = ev.target.result;

            // show or hide applicant applies href button based on the count f records
            if(count > 0){
                mainViewEmployerApplicantAppliesHref.style.display = "block";
            }
            else{
                
                // mainViewEmployerApplicantAppliesHref.style.display = "none";
                mainViewEmployerApplicantAppliesHref.textContent = "NO Applicant(s) Applies (Additional Page)";
                mainViewEmployerApplicantAppliesHref.classList.remove('green-btn');
                mainViewEmployerApplicantAppliesHref.classList.add('grey-btn');
            }
        });

        countRequest.addEventListener("error", () => {
            console.error("Error counting records in IDB: ", error.target.result);
        });
    });    
}



// ------------------------------------ Employer Profile -----------------------------------------------------------------
// Retrieve and load data into Employer Profile from localStorage ----------------------------------------------------------------------------------


// Early on we implemented the method ("SaveInputDataOnBlur") which save all data into localStorage, so is good practice to use it this storage for retriving data into particular page or other pages. On this example would be "Employer Profile" and "Main View Employer" pages
async function RetrieveEmployerProfileDatafromLocalStorage(){

    // invoking the following methods
    await GetEmployerWelcomeName();
    await EmployerProfilePictureDataURLandDisplay();
    await EmployerProfileLogoDataURLandStoreAtLS();
    await UploadAndReloadEmployerPicture();
    
}


// retrieve employer profile name from localStorage and display right to next to "Welcome" span
async function GetEmployerWelcomeName(){

    const emplyerProfileEmployerNameLS = localStorage.getItem('employer-profile-employer-name');

    const welcomeEmployerProfileSpan = document.getElementById('employer-profile-welcome-name');
    const emplyerProfileEmployerNameInput = document.getElementById('employer-profile-employer-name');

    // this listener is for when we would like to update and display in "welcome" span immediately employer name from local storage
    emplyerProfileEmployerNameInput.addEventListener("blur", ev => {
        ev.preventDefault();

        const savedName = localStorage.getItem('employer-profile-employer-name');

        if(emplyerProfileEmployerNameInput){
            welcomeEmployerProfileSpan.textContent = savedName;
         }
    });

    // when the page is reloaded, the name it will the last one which is provided from localStorage
    if(emplyerProfileEmployerNameLS){
        welcomeEmployerProfileSpan.textContent = emplyerProfileEmployerNameLS;
    }
}


// function to create picture data URL from "Employer Profile" page and store in localStorage
async function EmployerProfilePictureDataURLandDisplay(){

    const employerProfilePictureSrc = document.getElementById('employer-profile-picture-src');
    const inputEmployerProfilePicture = document.getElementById('employer-profile-picture-input');

    inputEmployerProfilePicture.addEventListener("change", ev => {
        ev.preventDefault();

        // checking the file if is chosen by user ,if so it wil provide which index this file have location. I this scenario it will "0"
        // console.log(inputEmployerProfilePicture.files);

        // get selected file
        const imageFile = ev.target.files[0];

        // converting file data URL into string
        const imageFileReader = new FileReader();

        
        // add a "load" event listener to the "fileReader" instance 
        imageFileReader.addEventListener("load", ev => {
            const imageDataURLResult = ev.target.result;
            
            // set the "src" of the img element to display the image
            employerProfilePictureSrc.src = imageDataURLResult;

            // save the image data URL to localStorage
            localStorage.setItem("employerProfilePictureDataURL", imageDataURLResult);

            // checking
            // console.log(imageDataURLResult);
        });

        // start reading the image file as data URL
        imageFileReader.readAsDataURL(imageFile);
    })
}

// just for checking if the file is exist
// document.addEventListener("DOMContentLoaded", () => {
//     EmployerProfilePictureDataURLandDisplay();
// });


// converting Employer Profile logo file into data url string and storing at LocalStorage
async function EmployerProfileLogoDataURLandStoreAtLS(){

    const employerPprofileCompanyLogo = document.getElementById('employer-profile-company-logo');

    employerPprofileCompanyLogo.addEventListener('change', ev => {
        ev.preventDefault();

        // getting file
        const logoFile = ev.target.files[0];

        // converting file DataURL into string
        const logoFileReader = new FileReader();

        // loading file using "load" listener and storing in localStorage
        logoFileReader.addEventListener("load", ev => {
            const logoDataUrlResult = ev.target.result;

            // there is NO "src" setting to image because the logo is not displaying in the whole "Employer Profile" page

            localStorage.setItem('employerProfileLogoDataURL', logoDataUrlResult)
        });

        // start reading the image logo as data url
        logoFileReader.readAsDataURL(logoFile);


    });
}


// displaying "Employer Profile" picture image after reloading page
async function UploadAndReloadEmployerPicture(){

    // 
    const employerProfilePictureSrc = document.getElementById('employer-profile-picture-src');

    if(localStorage.length > 0){
        
        // take a reference from localStorage
        const employerProfilePictureUrlLS = localStorage.getItem('employerProfilePictureDataURL');        

        // if employer picture exist then display in <img> attribute
        if(employerProfilePictureUrlLS){
            employerProfilePictureSrc.src = employerProfilePictureUrlLS;
        }
    }
}


// lastly we need to provide the method which will hide and unhide "Employer Profile" button (anchor) at "Main View" page. Simply after providing all user data in "Employer Profile" page the button (anchor) will disapire
async function HideEmployerProfileBtnsAtMainView(){

    // getting reference into HTML element
    const mainViewEmployerProfileBtn = document.getElementById('main-view-employer-profile-anchor');


    // retrieving Employer Profile data from localStorage and define values into new variables
    const employerProfileCompanyNameLS = localStorage.getItem('employer-profile-company-name');
    const employerProfileCompanyWebsiteLS = localStorage.getItem('employer-profile-company-website');
    const employerProfileCompanyLogoLS = localStorage.getItem('employerProfileLogoDataURL');
    const emplyerProfileEmployerNameLS = localStorage.getItem('employer-profile-employer-name');
    const employerProfilePhoneNumberLS = localStorage.getItem('employer-profile-phone');
    const employerProfileEmailLS = localStorage.getItem('employer-profile-email');
    const employerProfilePhotoLS = localStorage.getItem('employerProfilePictureDataURL');

    // hide anchor button if Employer Profile is completed via user
    if(
        employerProfileCompanyNameLS && employerProfileCompanyWebsiteLS && employerProfileCompanyLogoLS &&
        emplyerProfileEmployerNameLS && employerProfilePhoneNumberLS && employerProfileEmailLS && employerProfilePhotoLS
    ){
        mainViewEmployerProfileBtn.style.display = 'none';
    }
}



// --------------------------------------- Main View Employer --------------------------------------------------------------

// Retrieve and load data into Main View Employer TOP only from localStorage
async function RetrieveMainViewEmployerContentTopFromLS(){

    // retrieving name from localStorage and displaying on top "Main View Employer"
    const mainViewEmployerNameSpan = document.getElementById('main-view-employer-welcome-name');
    const employerProfileNameLS = localStorage.getItem('employer-profile-employer-name');

    // displaying employer profile name at "Main View Employer" page if already exist at localStorage
    if(employerProfileNameLS){
        mainViewEmployerNameSpan.textContent = employerProfileNameLS;
    }

    
    // retrieving picture from localStorage and displaying on top "Main View Employer"
    const mainViewEmployerPictureImg = document.getElementById('main-view-employer-picture-img');
    const employerProfilePhotoLS = localStorage.getItem('employerProfilePictureDataURL');

    // displaying employer profile picture at "Main View Employer" page if already exist at localStorage
    if(employerProfilePhotoLS){
        mainViewEmployerPictureImg.src = employerProfilePhotoLS;    // providing "src" attribute path and define into "employerProfilePhotoLS"
    }

    
    // retrieving logo from localStorage and displaying on top "Main View Employer"
    const mainViewEmployerLogoImg = document.getElementById('main-view-employer-logo-img');
    const employerProfileLogoLS = localStorage.getItem('employerProfileLogoDataURL');

    // displaying employer profile logo at "Main View Employer" page if already exist at localStorage
    if(employerProfileLogoLS){
        mainViewEmployerLogoImg.src = employerProfileLogoLS;
    }
    
}


// Retrieve and load data into "Main View Employer" table from already created IDB "CSVDataIDB"
function LoadCSVdataIDBatMainViewEmployerTable(){

    initCSVIndexedDB().then(db => {

        const trans = db.transaction(['csvData_os'], "readonly");
        const objStore = trans.objectStore('csvData_os');
        const loadRequest  = objStore.getAll();

        loadRequest.addEventListener("success", ev => {
            const csvData = ev.target.result;

            // checking only
            // console.log("CSV Data: ", csvData);

            // declare and define HTML reference foor the table in "Main View Employer"
            const tbodyMainViewEmployer = document.getElementById('tbody-main-view-employer');

            // clearing current table content part of headers cells
            tbodyMainViewEmployer.innerHTML = "";

            // iterating IDB data using forEach method
            csvData.forEach(item => {

                // Remove "__parsed_extra" field(object) before displaying in the tableBody
                delete item.__parsed_extra;

                // creating a new row for each data entry
                const row = document.createElement('tr');

                // iterate over an object's properties dataIDB and display through the cells using "Object.keys()" method.
                Object.keys(item).forEach(key => {

                    // creating cell
                    const cell = document.createElement('td');

                    // insert data into cells, default to empty if no data 
                    cell.textContent = item[key] || "";

                    // displaying cell
                    row.appendChild(cell);
                });

                
                
                /* handle "Manage" button using ".insertCell()" and "Object.keys()" methods */                
                const manageCell = row.insertCell(Object.keys(item).length);
                
                // creating div element to contain "Manage" anchor button
                const divElementManage = document.createElement('div');
                divElementManage.classList.add('nav-section');
                
                // creating "Manage" button as an anchor element
                const aManageElement = document.createElement('a');
                aManageElement.classList.add('nav-link', 'green-btn');
                aManageElement.id = 'manage-anchor-btn-main-view-employer';
                aManageElement.textContent = "Manage";

                // if "Role" field exist, display the "Manage" anchor button and set up click event
                if(item.Role){
                    
                    // append the "Manage" anchor button to the div element
                    divElementManage.appendChild(aManageElement);

                    // append the div element to the "Manage" cell
                    manageCell.appendChild(divElementManage);

                    // creating a key "Role"(which is associate with CSV database) and passing into "PopulateIntoAddeditJobEmployer" method and execute via "click" listener
                    const role = item.Role;
                    aManageElement.addEventListener("click", async (ev) => {
                        ev.preventDefault();

                        window.location.href = "#Add-Edit-Job-Employer";

                        await PopulateDataIntoAddeditJobEmployer(role);
                    });



                    /* handle Delete button */
                    const deleteCell = row.insertCell(Object.keys(item).length + 1);

                    const divElementDelete = document.createElement('div');
                    const deleteBtn = document.createElement('button');
                    deleteBtn.classList.add('pink-btn');
                    deleteBtn.textContent = "Delete";

                    if(item.Role){
                        divElementDelete.appendChild(deleteBtn);
                        deleteCell.appendChild(divElementDelete);

                        const role = item.Role;
                        deleteBtn.addEventListener("click", () => {
                            
                            DeleteMainViewEmployerBtn(role);
                        });
                    }
                }

                // append the filled rows to the tbody Main View Employers
                tbodyMainViewEmployer.appendChild(row);
            });
            
            // displaying loading message on console after importing data from "CSVDataIDB"
            console.log("The 'CVS' data is imported from \"CSVDataIDB\" and loaded into 'Main View Employer' table successfully");

            // displaying deleting message on console after reloading page.
            DisplayingDeleteJobOnConsole();
        });
    });
}


// delete particular job using key path from IDB
function DeleteMainViewEmployerBtn(roleKey){
    initCSVIndexedDB().then(db => {
        
        const trans = db.transaction(['csvData_os'], "readwrite");
        const objStore = trans.objectStore('csvData_os');

        // delete by the key path which is already specify at "LoadCSVdataIDBatMainViewEmployerTable" in "handle Delete button" section
        const deleteReguest = objStore.delete(roleKey);                

        deleteReguest.addEventListener("success", () => {            

            // displaying deleting message on console after reloading page. As you can see, the solution is achieved using sessionalStorge.
            const successDeleteMessage = (`The job with role: "${roleKey}" is REMOVE from table successfully`);
            sessionStorage.setItem("deleteSuccesMessageAtMainViewEpmployer", successDeleteMessage);            
        });

        deleteReguest.addEventListener("error", err =>{

            const errorDeleteMessage = (`Error deleting job: ${err.target.error}`);
            sessionStorage.setItem("deleteErrorMessageAtMainViewEpmployer", errorDeleteMessage);
        });
    });
    
    location.reload();
}


function DisplayingDeleteJobOnConsole(){

    const deleteSuccessMessage = sessionStorage.getItem('deleteSuccesMessageAtMainViewEpmployer');
    const deleteErrorMessage = sessionStorage.getItem('deleteErrorMessageAtMainViewEpmployer');

        if(deleteSuccessMessage){
            console.log(deleteSuccessMessage);
               
            // remove "deleteSuccesMessageAtMainViewEpmployer" from sessional storage after 1 sec
            setTimeout(() => {
                sessionStorage.removeItem('deleteSuccesMessageAtMainViewEpmployer');
            }, 1000);
        }
        if(deleteErrorMessage){
            console.error(deleteErrorMessage);

            setTimeout(() => {
                sessionStorage.removeItem('deleteErrorMessageAtMainViewEpmployer');
            }, 1000);
        }
}



//-------------------------------------------------------- Add / edit Job Employer ----------------------------------------------------------------------------------

// Retrieve and load employer name and picture into "Add / edit Job Employer" from localStorage
async function RetrieveEmployerNameAndPictureAtAddEditJobEmployer(){

    // retrieving name from localStorage and displaying on top "Add / edit Job Employer"
    const spanWelcomeAddEditEmployerName = document.getElementById('welcome-add-edit-name');
    const employerProfileNameLS = localStorage.getItem('employer-profile-employer-name');
    
    if(employerProfileNameLS){
        spanWelcomeAddEditEmployerName.textContent = employerProfileNameLS;
    }

    // retrieving picture URL string from localStorage and displaying on top "Add / edit Job Employer"
    const pictureAddEditEmployer = document.getElementById('add-edit-job-employer-img');
    const employerProfilePictureUrlLS = localStorage.getItem('employerProfilePictureDataURL');

    if(employerProfilePictureUrlLS){
        pictureAddEditEmployer.src = employerProfilePictureUrlLS;
    }
}


//
function PopulateDataIntoAddeditJobEmployer(roleKey){
    return initCSVIndexedDB().then(db => {
        return new Promise((resolve, reject) => {
            
            const trans = db.transaction(['csvData_os'], "readwrite");
            const objStore = trans.objectStore('csvData_os');
            
            // request to retrieve the object field using "Role" as a key
            const retrieveRequest = objStore.get(roleKey);

            retrieveRequest.addEventListener("success", ev => {
                const data = ev.target.result;

                if(data){

                    if(data.__parsed_extra){
                        
                        delete data.__parsed_extra;
                    }

                    // populate fields with fetched data
                    document.getElementById('add-edit-role-category-drop-down').value = data['Role Category'];
                    document.getElementById('add-edit-job-employer-role').value = data['Role'] || "";
                    document.getElementById('add-edit-location-combo-box').value = data['Location'];
                    document.getElementById('add-edit-job-employer-industry').value = data['Industry'] || "";
                    document.getElementById('add-edit-job-employer-function').value = data['Function'] || "";
                    document.getElementById('add-edit-job-employer-job-title').value = data['Job Title'] || "";
                    document.getElementById('add-edit-job-employer-experience').value = data['Experience'] || "";
                    document.getElementById('add-edit-job-employer-salary').value = data['Salary'] || "";
                }
                else{
                    console.log("No data found for 'Role'");
                }
                resolve();
                console.log("Data from \"Main View Employer\" populated successfully");
            });

            retrieveRequest.addEventListener("error", ev => {
                
                reject(ev.target.error);
            });
        });
    });
}