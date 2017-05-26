window.onload = function(){
	var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			       var response = JSON.parse(xhttp.responseText);
			       console.log(response.people);
			       var people = response.people;
			       //console.log(xhttp.responseText);
			       //var output = "";
			       var str = '';
					for(var i = 0; i <people.length;i++){
						// console.log(person[i].name);
						//output+="<li>"+people[i].first_name+"</li>";

						str += '<div id="entry">';					
						str += '<div id="name"><p>' + people[i].last_name +', '+people[i].first_name+ '</p></div>';
						str += '<div id="email"><p>' + people[i].email_address + '</p></div>';
						str += '<div id="practicename"><p>' + people[i].practice_name + '</p></div>';					
						str += '<div id="specialty"><p>' + people[i].specialty + '</p></div>';
						str += '<div id="del"><a href="#" class="delbutton" data-id="' + i + '">Delete</a></div>';
					}

					//document.getElementById("people").innerHTML = output;
					document.getElementById("addbook").innerHTML = str;

				}
			};
			xhttp.open("GET", "people.json", true);
			xhttp.send();
}