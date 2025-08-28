// Importing contents or method(s) from "DataBase.js" file using script element type="module"    "<script type="module" src="/assets/Navi-btns-alerts-etc.js"></script>"
// Also particular method need to precede "export" keyword and add to curly brackets right below
// import { DisplayStaticDataJSON, JSONStaticDataInIDB, ReadCSVFileAndConvertToJSON, StoreCSVJSONDataInIDB,....(if more) } from "./DataBase.js";


// Set hash to default
if (!location.hash) {
    location.hash = '#File-Load';
}

// Get reference to the section container
const allPages = document.getElementById('section');

// Update page on load
UpdatePage();

// update page content when the hash is changed
window.addEventListener("hashchange", UpdatePage);


// Update page content based on hash
function UpdatePage() {
    var pageName = location.hash.substring(1);
    UpdatePageContent(pageName);

};

// Updates the innerHTML of the "page" element.
async function UpdatePageContent(pageName) {

    allPages.innerHTML = GetPageContent(pageName);


    // Call back functions(methods) for some particular pages

    BackBtnNavToMV();
    ApplyMessageBtn();
    SaveInputDataOnBlur();
    SaveSelectOptionOnBlur();
    SaveAddEditBtn();


    // Call back functions(methods) for some particular pages with references
    if (pageName === "File-Load") {

        // BackBtnNavToMV();
        await SubmitBtn();
    }
    else if (pageName === "Main-View") {

        // DisplayStaticDataJSON();
        // JSONStaticDataInIDB();
        LoadCSVDatafromIDBandDisplayInTable();
        await HideApplicantProfileBtnsAtMainView();
        await HideEmployerProfileBtnsAtMainView();
    }
    else if (pageName === "Main-View-Employer"){

        await ShowingApplicantAppliesBtnAtMainViewEmployer();
        await RetrieveMainViewEmployerContentTopFromLS();
        LoadCSVdataIDBatMainViewEmployerTable();

    }
    else if (pageName === "Applicant-Job-Display-View") {
        
        NoPopulateDataAtApplicantJobDisplayView();

    }
    else if (pageName === "Applicant-Profile") {

        await ApplicantProfileGetWelcomeName();
        await ApplicantProfilePictureUploadAtLSandDisplay();
        await ApplicantProfileCVUploadAtLSandDownload();
        await ChangeNameApplicantProfileAndClearLocalStorageKeys(); // clearing applicant profile localStorage keys whenever applicant will provide a new name in "Applicant Profile" page

        await ApplicantProfileReloadedContent();    // function for providing current data while the Applicant Profile page is reload
        
    }
    else if(pageName === "Applicants-Applies-View"){

        LoadApplicantProfileAndJobDisplayViewDataIDBAndDisplayInTable();
    }
    else if (pageName === "Employer-Profile"){

        await RetrieveEmployerProfileDatafromLocalStorage();
    }
    else if(pageName === "Add-Edit-Job-Employer"){
        
        await RetrieveEmployerNameAndPictureAtAddEditJobEmployer();
    }
};



// Individual functions implementations for each page -------------------------------------------------------

function BackBtnNavToMV() {

    const backBtnNavToMV = document.querySelectorAll('#back-main-viewBtn-url');

    backBtnNavToMV.forEach(button => {
        button.addEventListener("click", ev => {
            ev.preventDefault();
            const url = button.getAttribute('data-url-main-view');
            window.location.href = url;
        });
    });
};


async function SubmitBtn() {

    const fileLoadSubBtn = document.getElementById('submit-file-loader-Btn');
    const fileLoaderLabel = document.getElementById('file-loader-label');

    if (fileLoadSubBtn) {

        fileLoadSubBtn.addEventListener("click", async (ev) => {
            ev.preventDefault();

            // First functionality - message appearing on console and label keyword changing using "setTimeout()" APIs

            // Data saving initiation
            console.log("Data converts to JSON and stores in 'IDB'");

            // Setting load text
            let loadingText = setTimeout(() => {
                fileLoaderLabel.textContent = "Loading";
            }, 50);

            setTimeout(() => {
                fileLoaderLabel.textContent = "Loading."
            }, 1000);

            setTimeout(() => {
                fileLoaderLabel.textContent = "Loading.."
            }, 2000);

            setTimeout(() => {
                fileLoaderLabel.textContent = "Loading..."
            }, 3000);


            // Clearing timeout after seconds
            setTimeout(() => {
                clearTimeout(loadingText);
                fileLoaderLabel.textContent = "Files are loaded"

                // Back to the default string using "Ternary Operator" / Finally used "if statement", otherwise bugs appearing while multiply pressed "Submit" button. (Still appearing but is not as that bad ;))
                setTimeout(() => {
                    // fileLoaderLabel.textContent = fileLoaderLabel.textContent === "Files are loaded" ? "File Loaded" : "Files are loaded";
                    if (fileLoaderLabel.textContent === "Files are loaded") {
                        fileLoaderLabel.textContent = "File Loader";
                    }
                }, 1500);
            }, 4000);


            // Second functionality - reading CSV file and convert into JSON array

            const csvInputFile = document.getElementById('input-file-file-load');
            const file = csvInputFile.files[0];

            if (file) {

                // The try-catch block contains the complex asynchronous operations
                try {
                    const data = await ReadCSVFileAndConvertToJSON(file);

                    // Clearing IDB store if we need to rewrite / update data
                    // await ClearCsvIDBStore();

                    // Restore IDB data
                    await StoreCSVJSONDataInIDB(data);
                }
                catch (error) {
                    console.log(`Error: ${error}`);
                }
            }
        });
    }
};


// Details button appear if any row it will exist
function DetailsBtn(role) {     // If navigate Only - without parameter

    // creating td element 
    const tdElement = document.createElement('td');

    // creating div element and set class attribute
    const divElement = document.createElement('div');
    divElement.classList.add('nav-section');

    // creating anchor element, set href, btn name and class attribute
    const aElement = document.createElement('a');
    
    // aElement.href = "#Applicant-Job-Display-View";   // navigation only
    
    aElement.textContent = "Details";
    aElement.classList.add('nav-link', 'green-btn');

    // Add click event to call PopulateIntoApplicantJobDisplayView with role
    aElement.addEventListener("click", async (ev) => {
        ev.preventDefault();

        window.location.href = "#Applicant-Job-Display-View";   // Navigate before loading data              

        await PopulateIntoApplicantJobDisplayView(role);
    });

    // appending elements inside div element
    divElement.appendChild(aElement);
    tdElement.appendChild(divElement);

    return tdElement;
}



function ApplyMessageBtn() {

    const applyMessageBtn = document.getElementById('applyMessageBtn');

    if (applyMessageBtn) {
        applyMessageBtn.addEventListener("click", async () => {
            alert("Thank you for your application");


            try {
                // await StoreApplicantJobDisplayViewDataInIDB();              // not needed database (realise later)
                await StoreApplicantProfileAndJobDisplayViewDataInIDB();                

                
            } catch (error) {
                console.log("Error: ", error);
            }
            
            // If error appearing in try catch block the "ClearApplicantProfileLocalStorageDataKeys" it will clear localStorage anyway
            await ClearApplicantProfileLocalStorageDataKeys();
            
            location.reload();
        });
    };
};


function EmployerValidateEmailInput() {
    const employerEmailInput = document.getElementById('employer-profile-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(employerEmailInput)) {
        return true;    // Email is valid
    }
    else if (employerEmailInput.trim() === "") {
        return true;    // Skip the validation if the field is empty
    }
    else {
        alert("Please enter a valid email address");
        return false;   // Prevent saving data if email is invalid
    }

}


function EmployerValidateMobileInput() {
    const employerMobileInput = document.getElementById('employer-profile-phone').value;
    const mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;    // Match a all phone numbers even including "0" precede /or country code

    if (mobileRegex.test(employerMobileInput)) {
        return true;    // Mobile valid
    }
    else if (employerMobileInput.trim() === "") {
        return true;
    }
    else {
        alert("Invalid phone number or wrong format request. Please provide a valid phone number");
        return false;
    }
}


function ApplicantValidateEmailInput() {
    const applicantEmailInput = document.getElementById('applicant-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(applicantEmailInput)) {
        return true;    // Email is valid
    }
    else if (applicantEmailInput.trim() === "") {
        return true;    // Skip the validation if the field is empty
    }
    else {
        alert("Please enter a valid email address");
        return false;   // Prevent saving data if email is invalid
    }

}


function ApplicantValidateMobileInput() {
    const applicantMobileInput = document.getElementById('applicant-phone').value;
    const mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;    // Match a all phone numbers even including "0" precede or country code

    if (mobileRegex.test(applicantMobileInput)) {
        return true;    // Mobile valid
    }
    else if (applicantMobileInput.trim() === "") {
        return true;
    }
    else {
        alert("Invalid phone number or wrong format request. Please provide a valid phone number");
        return false;
    }
}



async function SaveInputDataOnBlur() {
    const AllInputDataOnBlur = document.querySelectorAll('input.save-input-data-blur');
    // const blurStr = document.querySelectorAll('.blur-cell-data');    // (for future if needed & attribute need to provided into particular element as well)

    // save any user data on "blur"
    if (AllInputDataOnBlur)
        AllInputDataOnBlur.forEach(inputData => {
            inputData.addEventListener("blur", async ev => {
                ev.preventDefault();

                // Validation for email and phone input
                // Checking all conditions using "Switch" statement
                switch (ev.target.id) {

                    // Check if the input is the employer email field and validate it
                    case "employer-profile-email":

                        const isValidEmailEmployer = EmployerValidateEmailInput();

                        if (!isValidEmailEmployer) {
                            ev.target.value = "";   // clearing input user after row leaving
                            return true; // Exit if email is invalid                        
                        }
                        break;

                    // Check if the input is the employer phone number field and validate it
                    case "employer-profile-phone":

                        const isValidPhoneEmployer = EmployerValidateMobileInput();

                        if (!isValidPhoneEmployer) {
                            ev.target.value = "";
                            return true;    // Exit if phone is invalid
                        }
                        break;

                    // Check if the input is the applicant email field and validate it
                    case "applicant-email":

                        const isValidEmailApplicant = ApplicantValidateEmailInput();

                        if (!isValidEmailApplicant) {
                            ev.target.value = "";
                            return true;
                        }
                        break;

                    // Check if the input is the applicant phone field and validate it
                    case "applicant-phone":

                        const isValidPhoneApplicant = ApplicantValidateMobileInput();

                        if (!isValidPhoneApplicant) {
                            ev.target.value = "";
                            return true;
                        }
                        break;


                    // default:     // is not needed because all cases (one or other) are will "true"                    
                }


                // Find the corresponding label using "for" attribute
                const associatedLabel = document.querySelector(`label[for="${ev.target.id}"]`);
                const inputValue = ev.target.value.trim();      // get the input value without whitespaces (avoiding empty spaces before first value input)


                if (inputValue !== "" && associatedLabel) {

                    // Save the all inputs values to localStorage
                    localStorage.setItem(ev.target.id, inputValue);

                    // associated labels displaying on console with individual user inputs(this is not saving data to any of storage)
                    console.log(`The "${inputValue}" is saved in "${associatedLabel.textContent}"`);


                    // // updating ApplicantProfileIDB automatically after saving to localStorage
                    // try {
                    //     await StoreApplicantProfileDataIDB();   // not needed database (realise later)

                    // }
                    // catch (error) {
                    //     console.error(`Error: ${error}`);
                    // }


                    ev.target.value = "";   // Reset input field after saving
                };


                // Checking all conditions using "If, else if" statement

                // // Check if the input is the employer email field and validate it
                // if(ev.target.id === 'employer-profile-email'){

                //     const isValidEmailEmployer = EmployerValidateEmailInput();   // declared and assigned variable into the method for checking all conditions

                //     if(!isValidEmailEmployer){
                //         ev.target.value = "";   // clearing input user after row leaving
                //         return true; // Exit if email is invalid                        
                //     }                                    
                // }

                // // Check if the input is the employer phone number field and validate it
                // else if(ev.target.id === 'employer-profile-phone'){

                //     const isValidPhoneEmployer = EmployerValidateMobileInput();

                //     if(!isValidPhoneEmployer){
                //         ev.target.value = "";
                //         return true;    // Exit if phone is invalid
                //     }
                // }

                // // Check if the input is the applicant email field and validate it
                // else if(ev.target.id === 'applicant-email'){

                //     const isValidEmailApplicant = ApplicantValidateEmailInput();

                //     if(!isValidEmailApplicant){
                //         ev.target.value = "";
                //         return true;
                //     }
                // }

                // // Check if the input is the applicant phone field and validate it
                // else if(ev.target.id ==='applicant-phone'){

                //     const isValidPhoneApplicant = ApplicantValidateMobileInput();

                //     if(!isValidPhoneApplicant){
                //         ev.target.value = "";
                //         return true;
                //     }
                // }

            });
        });


    // Implementing blur(focus) function     (for future if needed)
    // function ApplyBlurStr(element){
    //     if(element.value !== ""){
    //         element.classList.add('filter');
    //     }
    //     else{
    //         element.classList.remove('filter');
    //     }
    // }
};


function SaveSelectOptionOnBlur() {

    const allSelectedDropDownOptions = document.querySelectorAll('.all-drop-down');
    const allSelectedComboBoxOptions = document.querySelectorAll('.all-combo-box');

    if (allSelectedDropDownOptions) {
        allSelectedDropDownOptions.forEach(selectData => {
            selectData.addEventListener("blur", ev => {
                ev.preventDefault();

                const roleCategoryLabel = document.querySelector('.role-category-blur');

                const dropDownOptionSlectedIndex = ev.target.selectedIndex;           // get the index of the selected option
                const getDropDownTextOfSelectedIndex = ev.target.options[dropDownOptionSlectedIndex].text;    // get the text of selected option

                if (getDropDownTextOfSelectedIndex !== 'Select Role Category' && getDropDownTextOfSelectedIndex !== "") {
                    console.log(`The "${getDropDownTextOfSelectedIndex}" is saved in "${roleCategoryLabel.textContent}".`);
                    
                    document.querySelector(`label[for="${ev.target.id}"]`);     // find the corresponding label using "for" attribute for saving in localStorage
                    localStorage.setItem(ev.target.id, getDropDownTextOfSelectedIndex);  // save associate label in localStorage

                    ev.target.value = "Select Role Category";  // Reset dropdown text into "Select Role Category"
                }
            });
        });
    }

    if (allSelectedComboBoxOptions) {
        allSelectedComboBoxOptions.forEach(selectData => {
            selectData.addEventListener("blur", ev => {
                ev.preventDefault();

                const locationLabel = document.querySelector('.location-blur');

                const comboBoxOptionSelectedIndex = ev.target.selectedIndex;
                const getComboBoxTextOfSelectedIndex = ev.target.options[comboBoxOptionSelectedIndex].text;

                if (getComboBoxTextOfSelectedIndex !== 'Select Location' && getComboBoxTextOfSelectedIndex !== "") {
                    console.log(`The "${getComboBoxTextOfSelectedIndex}" is saved in "${locationLabel.textContent}".`);

                    document.querySelector(`label[for="${ev.target.id}"]`);
                    localStorage.setItem(ev.target.id, getComboBoxTextOfSelectedIndex);

                    ev.target.value = "Select Location";
                }
            });
        });
    }
}



function SaveAddEditBtn() {
    const saveAddEditBtn = document.getElementById('save-add-edit-btn');

    if (saveAddEditBtn) {
        saveAddEditBtn.addEventListener("click", async ev => {
            ev.preventDefault();

            // now we need to update fields / add new values into fields from "Add / Edit Job Employer" and importing again into "CSVDataIDB".
            // 
            const updateData = {
                "Role Category": document.getElementById('add-edit-role-category-drop-down').value,
                Role: document.getElementById('add-edit-job-employer-role').value,
                Location: document.getElementById('add-edit-location-combo-box').value,
                Industry: document.getElementById('add-edit-job-employer-industry').value,
                Function: document.getElementById('add-edit-job-employer-function').value,
                "Job Title": document.getElementById('add-edit-job-employer-job-title').value,
                Experience: document.getElementById('add-edit-job-employer-experience').value,
                Salary: document.getElementById('add-edit-job-employer-salary').value,
            }
            
            try{

                // await ClearCsvIDBStore();
                await StoreCSVJSONDataInIDB(updateData);

                console.log("Data saved in: 'i.e. array / indexDB / API'");
                location.hash = "#Main-View-Employer" 
            }
            catch(error){
                console.error("Error: ", error);
            }
        });
    }
};



// Get Page Content based on the "pageName" --------------------------------------------------------
function GetPageContent(pageName) {

    if (pageName === "File-Load") {
        return GetFileLoadContent();
    }
    else if (pageName === "Main-View") {
        return GetMainViewContent();
    }
    else if (pageName === "Main-View-Employer") {
        return GetMainViewEmployerContent();
    }
    else if(pageName === "Applicants-Applies-View")
        return GetApplicantsApplies();
    
    else if (pageName === "Applicant-Profile") {
        return GetApplicantProfileContent();
    }
    else if (pageName === "Employer-Profile") {
        return GetEmployerProfileContent();
    }
    else if (pageName === "Add-Edit-Job-Employer") {
        return GetAddEditJobEmployerContent();
    }
    else if (pageName === "Applicant-Job-Display-View") {
        return GetApplicantJobDisplayViewContent();
    }

    else {
        return PageNotFoundContent();
    }
}

// Functions to return HTML content for each page --------------------------------------------

function GetFileLoadContent() {
    return `
            <h1 class="section-title">File Load</h1>            
            <div class="dn-border">
                <div id="section-file-load">
                    <button id="back-main-viewBtn-url" class="green-btn" data-url-main-view="#Main-View">Back</button>
                    <div id="dn-file-load-center">
                        <form id="file-loader-form">                            
                            <input type="file" name="file" class="green-btn " id="input-file-file-load" accept=".csv"><br><br>        <!-- save-input-data-blur -->
                            <label for="file-loader-label" id="file-loader-label">File Loader</label><br>
                            <input id="submit-file-loader-Btn" type="submit">
                        </form>
                    </div>
                </div>
            </div>
    `;
}

function GetMainViewContent() {
    return `
            <a href="#File-Load" class="nav-link2 green-btn">File Load Page</a>
            <h1 class="section-title">Main View</h1>
            <div class="dn-increase-border">
                <div id="section-main-view">
                    <div id="top-main-view">                        
                        <div class="nav-section">
                            <a href="#Employer-Profile" id="main-view-employer-profile-anchor" class="nav-link green-btn">Employer Profile (Displayed if no profile entered)</a>
                            <a href="#Applicant-Profile" id="main-view-applicant-profile-anchor" class=" nav-link green-btn">Applicant Profile (Displayed if no profile entered)</a>
                        </div>
                    </div>
                    <table id="table-main-view">
                        <thead>
                            <tr>
                                <th>Role Category</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Industry</th>
                                <th>Function</th>
                                <th>Job Title</th>
                                <th>Experience</th>
                                <th>Salary</th>
                                <th>Details / Apply</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-main-view">
                        <!-- Data "tbody" inserted here via JavaScript 
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div class="nav-section">
                                        <a href="#Applicant-Job-Display-View" class=" nav-link green-btn">Details</a>
                                    </div>
                                </td>                        
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div class="nav-section">
                                        <a href="#Applicant-Job-Display-View" class=" nav-link green-btn">Details</a>
                                    </div>
                                </td>
                            </tr>
                        -->
                        </tbody>                        
                    </table>
                </div>
            </div>
    `;
};

function GetMainViewEmployerContent() {
    return `        
            <a href="#File-Load" class="nav-link2 green-btn">File Load Page</a>
            <h2 class="section-title">Main View Employer</h2>
            <div class="dn-increase-border">
                <div class="section-main-view-employer">
                    <div id="top-main-view-employer">
                        <img src="" id="main-view-employer-logo-img" alt="Company Logo loaded in the profile view" width= "auto" height="125px" style="margin-left: 30px">
                            <form id="form-welcome-main-view-employer">
                                <label for="main-view-employer-welcome-name">Welcome:</label>
                                <span id="main-view-employer-welcome-name" name="main-view-employer-welcome-name">Employer Name</span>                                
                                <a href="#Add-Edit-Job-Employer" id="main-view-employer-add-new-job-anchor" class="nav-link green-btn">Add New Job</a>
                            </form>
                            <form id="form-authentication">
                                <input id="login-btn" class="green-btn" type="submit" value="Login"><br>
                                <div class="nav-section">
                                    <a href="#Employer-Profile" id="main-view-employer-profile-href" class="nav-link green-btn">Profile</a>                                    
                                </div>
                                <!-- added Applicant apply href if user apply for the job -->
                                <div>
                                    <a href="#Applicants-Applies-View" id="main-view-employer-applicant-applies-href" class="nav-link green-btn">Applicant(s) Applies (Additional Page)</a>
                                </div>
                            </form>                                                
                        <img src="" id="main-view-employer-picture-img" alt="Profile Picture loaded in the profile view" width="auto" height="125px" style="margin-right: 30px">
                    </div>
                    <table id="table-main-view-employer">
                        <thead>
                            <tr>
                                <th>Role Category</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Industry</th>
                                <th>Function</th>
                                <th>Job Title</th>
                                <th>Experience</th>
                                <th>Salary</th>
                                <th>Manage Vacancy</th>
                                <th>Delete Job</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-main-view-employer">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                     <div class="nav-section">
                                        <a href="#Add-Edit-Job-Employer" class="nav-link green-btn">Manage</a>
                                    </div>                                    
                                </td>
                                <td>
                                    <div>
                                        <button class="pink-btn">Delete</button>
                                    </div>
                                </td>                               
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                     <div class="nav-section">
                                        <a href="#Add-Edit-Job-Employer" class="nav-link green-btn">Manage</a>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <button class="pink-btn">Delete</button>
                                    </div>
                                </td>
                            </tr>
                            
                            <!-- Hiding "Add New Job" anchor button from table and move to the Top section of "Main View Employer" 
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div class="nav-section">
                                        <a href="#Add-Edit-Job-Employer" id="main-view-employer-add-new-job-anchor" class="nav-link green-btn">Add New Job</a>
                                    </div>
                                </td>                                
                            </tr>
                            -->

                        </tbody>
                    </table>
                </div>
            </div>                  
    `;
};

function GetApplicantsApplies() {   // Additional Page
    return `
            <a href="#File-Load" class="nav-link2 green-btn">File Load Page</a>
            <h1 class="section-title">Applicant(s) Applies View</h1>
            <div class="dn-increase-border">
                <div id="section-main-view">
                    <div id="top-applicants-applies">                        
                    </div>
                    <table id="table-applicants-applies">
                        <thead>
                            <tr>
                                <th>Role Category</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Industry</th>
                                <th>Function</th>
                                <th>Job Title</th>
                                <th>Experience</th>
                                <th>Salary</th>
                                <th>Applicant Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Applicant Picture</th>
                                <th>CV</th>
                                <th>Delete Applicant</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-applicants-applies">
                        <!-- Data "tbody" inserted here via JavaScript -->
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>                                                        
                                <td></td>                                                        
                                <td>
                                    <img src="" id="applicant-applies-photo-src1" alt="Applicant Photo" style="width: 100px; height: 70px; display: none">
                                </td>
                                <td>
                                    <!-- added Applicant CV link to download file if user attach the CV -->
                                    <a id="applicant-applies-CV-link1" class="nav-link green-btn">No CV Available</a>
                                </td>                                                                                                
                                <td>
                                    <button class="pink-btn">Delete</button>
                                </td>                                                       
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>                                                        
                                <td></td>                                                        
                                <td>
                                    <img src="" id="applicant-applies-photo-src2" alt="Applicant Photo" style="width: 100px; height: 70px; display: none">
                                </td>
                                <td>
                                    <!-- added Applicant CV link to download file if user attach the CV -->
                                    <a id="applicant-applies-CV-link2" class="nav-link green-btn">No CV Available</a>
                                </td>
                                <td>
                                    <button class="pink-btn">Delete</button>
                                </td>                                                       
                            </tr>
                        </tbody>                        
                    </table>
                </div>
            </div>
    `;
};

function GetApplicantProfileContent() {
    return `        
            <a href="#File-Load" class="nav-link2 green-btn">File Load Page</a>
            <h2 class="section-title">Applicant Profile</h2>
            <div class="dn-border">
                <div class="section-applicant-profile">
                    <div id="top-applicant-profile">
                        <form>
                            <label for="applicant-profile-welcome-name">Welcome:</label>
                            <span id="applicant-profile-welcome-name" name="applicant-profile-welcome-name">Applicant Name (Entered)</span><br>                            
                        </form>
                        <div>
                            <img src="" id="applicant-profile-photo-src" alt="Applicant Photo" style="width: 100px; height: 70px">
                        </div>
                        
                        <!-- added Applicant CV link to download file if user attach the CV -->
                        <div>
                            <a id="applicant-profile-CV-link" class="nav-link green-btn">No CV Available (Additional Button)</a>
                        </div>
                    </div>
                    <div class="nav-section">
                        <a href="#Main-View" id="applicant-profile-nav-link" class="nav-link green-btn">Back(MV)</a>
                    </div>
                    <form id="applicant-profile-form-table">
                        <table id="table-applicant-profile">
                            <tr style="text-align: left;">
                                <th><label for="applicant-profile-name">Applicant Name</label></th>
                                <th><input type="text" id="applicant-profile-name" name="applicant-profile-name" class="save-input-data-blur"></th>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="applicant-phone">Phone Number</label></td>
                                <td><input 
                                        type="text" 
                                        id="applicant-phone" 
                                        name="applicant-phone" 
                                        title="Please provide a valied phone number"
                                        placeholder="mobile phone"
                                        class="save-input-data-blur"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td> <label for="applicant-email">Email</label></td>
                                <td><input
                                        type="email" 
                                        id="applicant-email" 
                                        name="applicant-email"
                                        maxlength="32"
                                        required                                            // providing default value "Please fill in this field" when mice arrow hover the input bar
                                        placeholder="userName@example.com"                                        
                                        title="Please provide a vailed email address"      // title attribute deleting default value and providing other text instead (if title attribute contain one)
                                        class="save-input-data-blur">
                                </td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="applicant-profile-picture">Profile Picture</label></td>
                                <td><input type="file" id="applicant-profile-picture" name="applicant-profile-picture" class="green-btn save-input-data-blur" accept="image/*, .pdf"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td> <label for="applicant-profile-cv">CV</label></td>
                                <td><input type="file" id="applicant-profile-cv" name="applicant-profile-cv" class=" green-btn save-input-data-blur" accept=".rtf, .pdf, .doc, .docx"></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
    `;
};

function GetEmployerProfileContent() {
    return `
            <a href="#File-Load" class="nav-link2 green-btn">File Load Page</a>
            <h2 class="section-title">Employer Profile</h2>
            <div class="dn-border">
                <div class="section-employer-profile">
                    <div id="top-employer-profile">
                        <form>
                            <label for="employer-profile-welcome-name">Welcome:</label>
                            <span id="employer-profile-welcome-name" name="employer-profile-welcome-name">Employer Name</span>
                            <a href="#Main-View-Employer" id="employer-profile-nav-link" class="nav-link green-btn" style="margin-left: 0px">Back(MVE)</a>
                        </form>
                        <img src="" id="employer-profile-picture-src" alt="Employer Profile Picture" height= "150px"; width= "auto">                        
                    </div>
                    <form id="employer-profile-form-table">
                        <table id="table-employer-profile">
                            <tr style="text-align: left;">
                                <th><label for="employer-profile-company-name">Company Name</label></th>
                                <th><input type="text" id="employer-profile-company-name" name="employer-profile-company-name" class="save-input-data-blur"></th>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="employer-profile-company-website">Company Website</label></td>
                                <td><input 
                                    type="text" 
                                    id="employer-profile-company-website" 
                                    name="employer-profile-company-website"
                                    placeholder= "www.website-name.com"
                                    title= "Please provide correct website domain name" 
                                    class="save-input-data-blur">                                    
                                </td>                                    
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="employer-profile-company-logo">Company Logo</label></td>
                                <td><input type="file" id="employer-profile-company-logo" name="employer-profile-company-logo" class="green-btn save-input-data-blur" accept="image/*, .pdf, .doc, .docx, .webp"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="employer-profile-employer-name">Employer Name</label></td>
                                <td><input type="text" id="employer-profile-employer-name" name="employer-profile-employer-name" class="save-input-data-blur"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="employer-profile-phone">Phone Number:</label></td>
                                <td><input 
                                        type="text" 
                                        id="employer-profile-phone" 
                                        name="employer-profile-phone"                                                                        
                                        title="Please provide a vailed phone number"
                                        placeholder="mobile phone"
                                        class="save-input-data-blur">
                                </td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="employer-profile-email">Email</label></td>
                                <td><input 
                                        type="email"
                                        id="employer-profile-email" 
                                        name="employer-profile-email"
                                        maxlength="32"                                        
                                        placeholder="userName@example.com"                                        
                                        title="Please provide a vailed email address" 
                                        class="save-input-data-blur" >
                                </td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="employer-profile-picture-input">Profile Picture</label></td>
                                <td><input type="file" id="employer-profile-picture-input" name="employer-profile-picture-input" class="green-btn save-input-data-blur" accept="image/*, .pdf, .doc, .docx"></td>
                            </tr>
                        </table>
                    </form>                                       
                </div>
            </div>
    `;
};

function GetAddEditJobEmployerContent() {
    return `        
            <a href="#File-Load" class="nav-link2 green-btn">File Load Page</a>
            <h2 class="section-title">Add / Edit Job Employer</h2>
            <div class="dn-border">
                <div id="section-add-edit-job-employer">
                    <div id="top-welcome-add-edit-job-employer">
                        <form id="form-welcome-add-edit-job-employer">
                            <label for="welcome-add-edit-name">Welcome:</label>
                            <span id="welcome-add-edit-name" name="welcome-add-edit-name">Employer Name</span><br>
                            <button id="save-add-edit-btn" class="green-btn">Save (array / IDB / API) & Back(MVE)</button><br/>
                        </form>                        
                        <img src="" id="add-edit-job-employer-img" alt="Employer Profile Picture" height= "150px"; width= "auto">
                    </div>
                    <div class="nav-section">
                        <a href="#Main-View-Employer" class=" nav-link green-btn">Back(MVE)</a> 
                    </div>
                    <form id="add-edit-job-employer-form-table">
                        <table id="table-add-edit-job-employer">
                            <tr style="text-align: left;">
                                <td><label for="add-edit-job-employer-role-category"></label>Role Category</td>
                                <td>
                                    <select id="add-edit-role-category-drop-down" class="green-btn">
                                        <option value="Select Role Category">Select Role Category</option>
                                        <option value="Advertising">Advertising</option>
                                        <option value="Programming & Design">Programming & Design</option>
                                        <option value="Corporate Planning/Consulting/Strategy">Corporate Planning/Consulting/Strategy</option>
                                        <option value="Online/Digital Marketing">Online/Digital Marketing</option>
                                        <option value="Accounts">Accounts</option>
                                        <option value="QA/Testing/Documentation">QA/Testing/Documentation</option>
                                        <option value="Machine Operator">Machine Operator</option>
                                        <option value="Project Management">Project Management</option>
                                        <option value="Retail Sales">Retail Sales</option>
                                        <option value="R&D">R&D</option>
                                        <option value="Admin/Maintenance/Security/Datawarehousing">Admin/Maintenance/Security/Datawarehousing</option>
                                    </select>
                                    (Preview only)                                                             
                                </td>
                            </tr>                        
                            <tr style="text-align: left;">
                                <td><label for="add-edit-job-employer-role">Role</label></td>
                                <td><input type="text" id="add-edit-job-employer-role" name="add-edit-job-employer-role"></td>
                            </tr>                        
                            <tr style="text-align: left;">
                                <td><label for="add-edit-job-employer-location">Location</label></td>
                                <td>
                                    <select id="add-edit-location-combo-box" class="green-btn">
                                        <option value="Select Location">Select Location</option>
                                        <option value="Leeds">Leeds</option>
                                        <option value="London">London</option>
                                        <option value="Bradford">Bradford</option>
                                        <option value="Huddersfield">Huddersfield</option>
                                        <option value="Manchester">Manchester</option>
                                        <option value="Liverpool">Liverpool</option>
                                        <option value="Harrogate">Harrogate</option>
                                        <option value="Hull">Hull</option>
                                        <option value="Doncaster">Doncaster</option>
                                        <option value="Birmingham">Birmingham</option>
                                    </select>
                                    (Preview only)                                       
                                </td>
                            </tr>                                             
                            <tr style="text-align: left;">
                                <td><label for="add-edit-job-employer-industry">Industry</label></td>
                                <td><input type="text" id="add-edit-job-employer-industry" name="add-edit-job-employer-industry"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="add-edit-job-employer-function">Function</label></td>
                                <td><input type="text" id="add-edit-job-employer-function" name="add-edit-job-employer-function" class></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="add-edit-job-employer-job-title">Job Title</label></td>
                                <td><input type="text" id="add-edit-job-employer-job-title" name="add-edit-job-employer-job-title"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="add-edit-job-employer-experience">Experience</label></td>
                                <td><input type="text" id="add-edit-job-employer-experience" name="add-edit-job-employer-experience"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="add-edit-job-employer-salary">Salary</label></td>
                                <td><input type="text" id="add-edit-job-employer-salary" name="add-edit-job-employer-salary"></td>
                            </tr>
                        </table>
                    </form>                                            
                </div>
            </div>
    `;
};

function GetApplicantJobDisplayViewContent() {
    return `        
            <a href="#File-Load" class="nav-link2 green-btn">File Load Page</a>
            <h2 class="section-title">Applicant Job Display View</h2>
            <div class="dn-border">
                <div id="section-applicant-job-display-view">
                    <div id="applicant-job-display-top-buttons" class="nav-section">
                        <a href="#Applicant-Profile" id="applicant-profileBtn" class="nav-link green-btn">Applicant Profile (Display if an Applic. is NOT known)</a>
                        <button id="applyMessageBtn" class="green-btn">Apply (Display if an Applic. profile is known)</button><br>
                        <button id="back-main-viewBtn-url" class="green-btn" data-url-main-view="#Main-View">Back(MV)</button>
                    </div>
                    <form id="applicant-job-display-form">
                        <table id="applicant-job-display-table">
                            <tr style="text-align: left;">
                                <td><label for="applicant-job-display-role-category-drop-down" class="role-category-blur">Role Category</label></td>
                                <td>
                                    <select id="applicant-job-display-role-category-drop-down" class="green-btn all-drop-down">
                                        <option value="Select Role Category">Select Role Category</option>
                                        <option value="Advertising">Advertising</option>
                                        <option value="Programming & Design">Programming & Design</option>
                                        <option value="Corporate Planning/Consulting/Strategy">Corporate Planning/Consulting/Strategy</option>
                                        <option value="Online/Digital Marketing">Online/Digital Marketing</option>
                                        <option value="Accounts">Accounts</option>
                                        <option value="QA/Testing/Documentation">QA/Testing/Documentation</option>
                                        <option value="Machine Operator">Machine Operator</option>
                                        <option value="Project Management">Project Management</option>
                                        <option value="Retail Sales">Retail Sales</option>
                                        <option value="R&D">R&D</option>
                                        <option value="Admin/Maintenance/Security/Datawarehousing">Admin/Maintenance/Security/Datawarehousing</option>
                                    </select>
                                    (Preview only)                                                             
                                </td>
                            </tr>                        
                            <tr style="text-align: left;">
                                <td><label for="applicant-job-display-role">Role</label></td>
                                <td><input type="text" id="applicant-job-display-role" name="applicant-job-display-role" class="save-input-data-blur"></td>
                            </tr>                        
                            <tr style="text-align: left;">
                                <td><label for="applicant-job-display-location-combo-box" class="location-blur">Location</label></td>
                                <td>
                                    <select id="applicant-job-display-location-combo-box" class="green-btn all-combo-box">
                                        <option value="Select Location">Select Location</option>
                                        <option value="Leeds">Leeds</option>
                                        <option value="London">London</option>
                                        <option value="Bradford">Bradford</option>
                                        <option value="Huddersfield">Huddersfield</option>
                                        <option value="Manchester">Manchester</option>
                                        <option value="Liverpool">Liverpool</option>
                                        <option value="Harrogate">Harrogate</option>
                                        <option value="Hull">Hull</option>
                                        <option value="Doncaster">Doncaster</option>
                                        <option value="Birmingham">Birmingham</option>
                                    </select>
                                    (Preview only)                                       
                                </td>
                            </tr>                                                
                            <tr style="text-align: left;">
                                <td><label for="applicant-job-display-industry">Industry</label></td>
                                <td><input type="text" id="applicant-job-display-industry" name="applicant-job-display-industry" class="save-input-data-blur"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="applicant-job-display-function">Function</label></td>
                                <td><input type="text" id="applicant-job-display-function" name="applicant-job-display-function" class="save-input-data-blur"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="applicant-job-display-job-title">Job Title</label></td>
                                <td><input type="text" id="applicant-job-display-job-title" name="applicant-job-display-job-title" class="save-input-data-blur"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="applicant-job-display-experience">Experience</label></td>
                                <td><input type="text" id="applicant-job-display-experience" name="applicant-job-display-experience" class="save-input-data-blur"></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td><label for="applicant-job-display-salary">Salary</label></td>
                                <td><input type="text" id="applicant-job-display-salary" name="applicant-job-display-salary" class="save-input-data-blur"></td>
                            </tr>
                        </table>
                    </form>                                              
                </div>
            </div>
    `;
};

function PageNotFoundContent() {
    return `        
            <h2 class="section-title">Page was not found. Please go to "Main Page"</h2>
            <div class="section-nav">
                <a href="#Main-View" class="nav-link green-btn">Main Page</a>
            </div>
    `;
};