	var quickAddFormDiv = document.querySelector('.quickaddForm');	
	var AddBtn = document.getElementById('Add');
	// Form Fields
	var lastname = document.getElementById('lastname');
	var firstname = document.getElementById('firstname');
	var email = document.getElementById('email');
	var specialty = document.getElementById('specialty');
	var practicename = document.getElementById('practicename');
	// Divs etc.
	var providerListDiv = document.querySelector('.providerListDiv');
	var body = document.querySelector('.body');
	var providerList = [];
	var people;
	localStorage.clear();
	
	//To display the contents of JSON file
	var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(xhttp.responseText);
			people = response.people;
			var str1  = '';
			for(var i = 0; i <people.length;i++){
				str1 += '<tr>';
				str1 += '<td class="lastname"><p>' + people[i].last_name +', '+people[i].first_name+ '</p></td>';					
				str1 += '<td class="email"><p>' + people[i].email_address +  '</p></td>';
				str1 += '<td class="practicename"><p>' + people[i].practice_name + '</p></td>';					
				str1 += '<td class="specialty"><p>' + people[i].specialty + '</p></td>';
				str1 += '<td class="del"><a href="#" class="delbutton" data-id="' + i + '">Delete</a></td>';
				str1 += '</tr>';
			}
			
			for(var i = 0; i < people.length;i++){
				var obj = new jsonStructure(people[i].last_name,people[i].first_name,people[i].email_address,people[i].specialty,people[i].practice_name);					
				providerList.push(obj);							
				localStorage['providerListLocalStrorage'] = JSON.stringify(providerList);
			}			
			document.getElementsByClassName("body")[0].innerHTML = str1;
			}
		};
		xhttp.open("GET", "people.json", true);
		xhttp.send();
		
		AddBtn.addEventListener("click", addToBook);
		providerListDiv.addEventListener("click", removeEntry);
			
		/*
		Function to convert the data into JSON format
		*/
		function jsonStructure(lastname,firstname,email,specialty,practicename){
			this.lastname = lastname;
			this.lastname += ", "+firstname;				
			this.email = email;
			this.specialty = specialty;
			this.practicename = practicename;
		}

		/*
		Function to read the data from input fields,
		convert it into JSON format	and store in local storage.
		*/
		function addToBook(){
			var isNull = lastname.value!='' && firstname.value!='' && email.value!='' && specialty.value!='' && practicename.value!='';
			if(isNull){
				var obj = new jsonStructure(lastname.value,firstname.value,email.value,specialty.value,practicename.value);					
				providerList.push(obj);
				localStorage['providerListLocalStrorage'] = JSON.stringify(providerList);
				clearForm();
				showproviderList();
			}
		}

		/*
		Function to remove an entry when the DELETE button is clicked
		*/
		function removeEntry(e){
			if(e.target.classList.contains('delbutton')){
				var remID = e.target.getAttribute('data-id');					
				providerList.splice(remID,1);
				localStorage['providerListLocalStrorage'] = JSON.stringify(providerList);
				showproviderList();
			}
		}

		/*
		Function to clear the form once the SUBMIT button is clicked
		*/
		function clearForm(){
			var formFields = document.querySelectorAll('.formFields');
			for(var i in formFields){
				formFields[i].value = '';
			}
		}

		/*
		Function to display the data 
		*/
		function showproviderList(){
			if(localStorage['providerListLocalStrorage'] === undefined){			
				localStorage['providerListLocalStrorage'] = '';
			 }
			else{	
				console.log(localStorage['providerListLocalStrorage']);				
				providerList = JSON.parse(localStorage['providerListLocalStrorage']);
				body.innerHTML = '';
				var str = '';
				for(var i = 0; i <providerList.length;i++){
					str += '<tr>';
					str += '<td class="lastname"><p>' + providerList[i].lastname +'</p></td>';					
					str += '<td class="email"><p>' + providerList[i].email +  '</p></td>';
					str += '<td class="practicename"><p>' + providerList[i].practicename + '</p></td>';					
					str += '<td class="specialty"><p>' + providerList[i].specialty + '</p></td>';
					str += '<td class="del"><a href="#" class="delbutton" data-id="' + i + '">Delete</a></td>';
					str += '</tr>';
				}
				str += '</tbody></table>';
				document.getElementsByClassName("body")[0].innerHTML = str;
				
			}
		}


$(document).ready(function() 
{  
  $("th").click(function() {
	sortTable($(".sortable"), $(this));
  });  
}
);

function sortTable(table, th) {
	var rows = $(table).find("tr:gt(0)").toArray().sort(compare($(th).index()));	
	if ($(th).hasClass("ascending")) {
      $(th).removeClass("ascending").addClass("descending");
	  rows = rows.reverse();
	}
	else {
	  $(th).removeClass("descending").addClass("ascending");
	}
	
	for (var i = 0; i < rows.length; i++) {
		$(table).append(rows[i]);
	}		
}

function compare(index) {
	return function(a, b) {
		var valA = $(a).children("td").eq(index).html();
		var valB = $(b).children("td").eq(index).html();
		return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
	}
}