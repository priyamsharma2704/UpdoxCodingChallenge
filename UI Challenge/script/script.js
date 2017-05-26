window.onload = function(){

	var quickAddFormDiv = document.querySelector('.quickaddForm');	
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var lastname = document.getElementById('lastname');
	var firstname = document.getElementById('firstname');
	var email = document.getElementById('email');
	var specialty = document.getElementById('specialty');
	var practicename = document.getElementById('practicename');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');
	
	var addressBook = [];
	var people;
	localStorage.clear();
	//--------------------------------------------------------------------
	//To display the contents of JSON file
	var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			       var response = JSON.parse(xhttp.responseText);
			       people = response.people;
			       //var output = "";
			       var str1 = '';
					for(var i = 0; i <people.length;i++){
						str1 += '<div id="entry">';					
						str1 += '<div id="name"><p>' + people[i].last_name +', '+people[i].first_name+ '</p></div>';
						str1 += '<div id="email"><p>' + people[i].email_address + '</p></div>';
						str1 += '<div id="practicename"><p>' + people[i].practice_name + '</p></div>';					
						str1 += '<div id="specialty"><p>' + people[i].specialty + '</p></div>';
						str1 += '<div id="del"><a href="#" class="delbutton" data-id="' + i + '">Delete</a></div>';
						}
					for(var i = 0; i < people.length;i++){
						var obj = new jsonStructure(people[i].last_name,people[i].first_name,people[i].email_address,people[i].specialty,people[i].practice_name);					
						addressBook.push(obj);						
						localStorage['addbook'] = JSON.stringify(addressBook);
					}

					document.getElementsByClassName("addbook")[0].innerHTML = str1;

				}
			};
			xhttp.open("GET", "people.json", true);
			xhttp.send();
			//------------------------------------------------------------------------------
			
			
			AddBtn.addEventListener("click", addToBook);
			//var addressBook = [];
			addBookDiv.addEventListener("click", removeEntry);
			
			function jsonStructure(lastname,firstname,email,specialty,practicename){
				this.lastname = lastname;
				this.lastname += ", "+firstname;				
				this.email = email;
				this.specialty = specialty;
				this.practicename = practicename;
			}
			function addToBook(){
				var isNull = lastname.value!='' && firstname.value!='' && email.value!='' && specialty.value!='' && practicename.value!='';
				if(isNull){
					// format the input into a valid JSON structure
					var obj = new jsonStructure(lastname.value,firstname.value,email.value,specialty.value,practicename.value);					
					addressBook.push(obj);
					localStorage['addbook'] = JSON.stringify(addressBook);
					console.log(localStorage['addbook']);
					clearForm();
					showaddressBook();
				}
			}
			function removeEntry(e){
			// Remove an entry from the addressBook
				
				if(e.target.classList.contains('delbutton')){
					var remID = e.target.getAttribute('data-id');					
					addressBook.splice(remID,1);
					localStorage['addbook'] = JSON.stringify(addressBook);
					showaddressBook();
				}
			}
			function clearForm(){
				var formFields = document.querySelectorAll('.formFields');
				for(var i in formFields){
					formFields[i].value = '';
				}
			}
			function showaddressBook(){
				if(localStorage['addbook'] === undefined){
					localStorage['addbook'] = '';
				} else {
					addressBook = JSON.parse(localStorage['addbook']);
					console.log(addressBook);
					addBookDiv.innerHTML = '';
					var str = '';
					for(var i = 0; i <addressBook.length;i++){

						str += '<div id="entry">';					
						str += '<div id="name"><p>' + addressBook[i].lastname + '</p></div>';
						str += '<div id="email"><p>' + addressBook[i].email + '</p></div>';
						str += '<div id="practicename"><p>' + addressBook[i].practicename + '</p></div>';					
						str += '<div id="specialty"><p>' + addressBook[i].specialty + '</p></div>';
						str += '<div id="del"><a href="#" class="delbutton" data-id="' + i + '">Delete</a></div>';
						console.log(str);
					}
					document.getElementsByClassName("addbook")[0].innerHTML = str;
				}
			}

			showaddressBook();
}