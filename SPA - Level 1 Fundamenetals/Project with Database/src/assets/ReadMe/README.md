# Level 1 Development (JavaScript, HTML, CSS - without Database)

This Project showing how to SPA (Single Page Application) is builded using HTML, CSS and JavaScript files.

## Content:

At the minute is only showing how does pages are looks like and has some functionalities like:
    
* navigating to each page
* choosing files using "input" elements of "type="files""
* selecting "Roles" or "Locations" using "select" elements
* a certain message pops up when a particular button is pressed
* initiation of saving data in console while some user input is provided in certain rows and file choosing as well. Also when the user goes to another input the value on the previous one is cleared too.


## Addition:

As an addition when we press the "Submit" button I decided to show the word "Loading" instead of "File Loader" appear and update this a few times to get a nice feature view like.

* "Loading.", "Loading..", "Loading..."

Once it is finished loading, get updated again on "Files are loaded" for 1,5 second and finally assigned back into default value: "File Loader".

To achieve that I have been using the "setTimeout()" API.

For me it looks <b>cool</b> with this features ;).


## Other pages links:

Please look on pictures attached which will navigate to other pages were for some the reason are not bounded all together:

<br>

![Add Edit Job Employer](<Screenshot 2024-06-07 161915.jpg>)

![Employer Profile](<Screenshot 2024-06-13 181621.jpg>)

![Main View Employer](<Screenshot 2024-06-10 142903.jpg>)

![Applicant Profile](<Screenshot 2024-06-07 161936.jpg>)

<br>
<br>
<br>

# Level 1 Development (JavaScript, HTML, CSS - with Database) - the 1st and last upgrade:

In this project I have been given the following task to achieve a whole Single Page Application (SPA) work as expected:

<br>

1) Two IndexedIDB object stores and localStorage, ("CSVDataIDB", "ApplicantProfileAndJobDisplayViewIDB")

<br>

2) For displaying Table at "Main View" page I use: 

    * "Papa.parse" which is JavaScript library designed for converting CSV to JSON using API like: ("header: true", "skipEmptyLines: true,", etc). Please look at "ReadCSVFileAndConvertToJSON();",

    * to retrieve all object fields from "CSVDataIDB" I used called "Object.keys()" method. This Method is very useful if you need to iterate over an object's properties(fields). All code is provided at "LoadCSVDatafromIDBandDisplayInTable".

<br>

3) Any inputs / "drop down", "combo box" fields were associated with individual input provided by the user (both applicant and employer) and lastly displaying on console and stored in localStorage.

	* to achieve this goal I used "for" and "id" attributes which are associated together in html structure regarding "label" and "input" elements
	
    * code to achieve this solution is: "const variableName = document.querySelector(`label[for="${ev.target.id}"]`);"
    
    * please look at o "SaveInputDataOnBlur()", "SaveSelectOptionOnBlur()"

<br>

4) I have decided to store all inputs in local storage to retrieve some inputs like name, photo or Cv   text into already existing empty "spans", "image" or anchor elements. 
Especially that last one is provided in anchor elements because for some reason, if there is no Cv attached, it would have nothing to download.
Also thanks to storing all inputs in localStorage it is a lot easier manipulate every individual button to hide or unhide some particular page buttons or anchor links like "Applicant Profile" or "Employer Profile" at "Main View" page.
	
	* regarding saving photos in local storage I have used the "FileReader();" class to convert this particular photo into a URL path in string format. The solution is provided at "ApplicantProfilePictureUploadAtLSandDisplay();",
	
    * this same solution I have provided with CV - I use "FileReader()"; class to convert a file into a URL path in string format. Please look at "ApplicantProfileCVUploadAtLSandDownload();" to see how code is implemented.

5) In "Applicant Job Display View" I have populate fields using already existing "CSVDataIDB" object's fields which thanks to transaction and requested ".get(role)" method I would able to retrieve the individual object using "Role" as a key path and associate "Applicant Job Display View" fields with them. Please look at the "PopulateIntoApplicantJobDisplayView(role)" method.

<br>

6) In "Applicant Profile" I spent quite a lot of time because it was my first page where I wondered, what would it be if I did the following: 
			
	- prevent users from writing the wrong data into specific fields like "email" or "phone number", which then I thought would be more efficient to provide validation here. All validation you will find at: 
				
	    - ApplicantValidateEmailInput(), ApplicantValidateMobileInput(), EmployerValidateEmailInput() and EmployerValidateMobileInput(),
	
        - lastly I have invoke them at "SaveInputDataOnBlur" in case statement conditions,
			
	- I wanted to keep all data visible like name, picture and Cv(if it existed) even if the page is reloaded or not. The solution is provided at "ApplicantProfileReloadedContent();"
			
	- input fields are overwriting in localStorage but I wanted to avoid keeping all mixed data with previous applicant data and that would happen if: 
				
		- for some reason the web page is reloaded before applicant finishing filling all fields, 
		- step away from pc for a while because they need to,
		- press the "step backward" button on the browser because they wanted to check something else before finishing filling in "Applicant Profile". 
			  
		Now we have a situation where they come back to this page and they are not sure if they filled in all required fields which later they wouldn't be able to apply for a particular job.
			  
		Unfortunately this happens because you as a client wants all data in this page to disappear right after the cell is left by user.
			  
		To avoid this issue I decided to clear all "Applicant Profile" keys (all data regarding this particular page) right after when the button "apply" is clicked by the applicant at "Applicant Job Display View" or if the user is giving a new name in the "Applicant Profile" page. 
				
        The last one is for when the applicant provides all data, press "back" at "Applicant Profile" then "step forward" (because there is no "Applicant Profile" button any more at "Main View"), then they would be able to provide another piece of data. If it doesn't fill all or it only fills in partly, then the all data is mixed with previous data (just for silly jokes as example).
			  
		I know how this scenario sounds but it could happen and in this case whenever that applicant starts typing a new name, then the all "Applicant Profile" keys are clear and ready for new data.
			  
		To achieve that, I created the following methods: "ChangeNameApplicantProfileAndClearLocalStorageKeys();", "ClearApplicantProfileLocalStorageDataKeys();"
			  
	- also I have provided a button which can download an applicant's CV if attached. The button is called by default "No CV Available (Additional Button)" if CV IS NOT attached. When the CV is attached then the name changes to "Download CV".
        
        I achived that using "FileReader()" class which I already mentioned in point four (4).

<br>

7) The "Business Scenario" is when nothing is said about storing Jobs by applicants. So I decided to create an additional page for the Employer so that he/she could have access to all applicants which apply for the particular jobs. The page is called "Applicant(s) Applies View".
		
    * In this page I have combined two pages data and stored them in IndexedDB called "ApplicantProfileAndJobDisplayViewIDB",
    
    * to get access to this page I provided the button "Applicant(s) Applies (Additional Page)" at "Main View Employer" page,
	
    * this page has all cells regarding job descriptions and applicants data like name, phone, email, picture, CV and  "Delete" button as the last one,

    * also I used the "Object.keys()" method to iterate over an object's fields to fill the table cells. All code is implemented at "LoadApplicantProfileAndJobDisplayViewDataIDBAndDisplayInTable()" method 

    However to display an aplicant picture, CV and delete button I use again "Object.keys()":
      
    * but within the ".insertCell()" method to create a "photoCell" if the applicant attatche a picture. The following code is: ".insertCell(Object.keys(item).length - 2)" - all is specified in comments if you wonder why in this case it is exactly like that.

    * for other cells I have used a similar solution.

<br>

8) In "Employer Profile" the employer name and picture are retrieved from localStorage which are associated with "Employer Profile" input fields. Also thanks to that I am able to retrieve required elements at "Main View Employer" such as:
    
    * company picture,
    * employer name,
    * employer picture.

<br>

9) In "Main View Employer" the company name picture, employer picture and employer name are retrieved also from localStorage.

    The "Main View Employer" table is retrieved from "CSVDataIDB" object fields (same as "Main View"). This is because whatever new vacancy, manage current one or delete either will effect immediately at the "Main View" page and the applicant can see it.

    I used a similar solution to retrieve and display all cells in "Main View Employer" as in "Applicant(s) Applies View" including "Manage" and "Delete" button as well.
    
    * The "Manage" button I implemented is similar to the "Details" button in the "Main View" page. I retrieve a particular job by accessing already existing indexedIDB "CSVDataIDB" then I used transaction of this database and requested for ".get(roleKey)" method to retrieve the individual object using "Role" as a key path from "CSVDataIDB" objects fields where lastly I would able to populate individual job at "Add / Edit Job Employer". Please look at "PopulateDataIntoAddeditJobEmployer(roleKey)" method.

<br>

10) In "Add / Edit Job Employer" the employer name and picture are retrieved from localStorage as well.

    Regarding managing all fields in "Add / Edit Job Employer" which stand for updating individual jobs or adding a new vacancy I achieve this solution using the ".put()" method at "StoreCSVJSONDataInIDB(csvData)". The ".put()" method updates records in the database or inserts a new one if the particular record doesn't exist (in this case job). That's why in this scenario at "Add / Edit Job Employer" page:
    
    * an employer is able to update a particular job using "Manage" button at "Main View Employer"
    
    * or an employer is able to add a new vacancy if it does not already exist using "Add New Job" also at "Main View Employer".