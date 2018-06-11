// Add event listener for the GET TEXT button
document.getElementById('button1').addEventListener('click', getText);
// Add event lister for the GET JSON button 
document.getElementById('button2').addEventListener('click', getJSON);
// Add event listener for the GET API DATA button
document.getElementById('button3').addEventListener('click', getExternalAPI);

// Declare the getText() function to get local text file data
function getText() {
	// Call the Fetch API & handel it's promise() and catch() respectively
	fetch('./sample.txt').then( response => {
			// console.log(response.text()); // Returns a Promise
			// Check if the response is OK then return or else throw new error
			if(response.ok) {
				return response.text();
			} else {
				throw new Error(`Network response is NOT OK. Error: ${response.status} for ${response.url}`);
			}
		}).then( data => {
			//console.log(data);
			document.getElementById('output').innerHTML = data;
		}).catch( err => {
				//console.log(err);
				document.getElementById('output').innerHTML = `ERROR: There has been a problem with the fetch operation: ${err.message}`;
		});
}

// Declare getJSON() function to get the local JSON file data
function getJSON() {
	// Fetch the file using fetch API and then handle the respective Promise, Catch respectively
	fetch('./posts.json').then( (response) => {
			// check if response is ok
			if(response.ok) {
				return response.json();
			} else {
				throw new Error(`Network response is NOT OK. Error: ${response.status} for ${response.url}`);
			}
	}).then( (data) => {
			// note here data is in JSON format
			let output = '<table class="u-full-width"><thead><tr><th>Post ID</th><th>Post Title</th><th>Post Body</th></tr></thead><tbody>'
			// Run a forEach loop to run though the data and show them nicely
			data.forEach(function(post) {
				output += `<tr>
				<td>${post.id}</td>
				<td>${post.title}</td>
				<td>${post.body}</td>
				</tr>`;
			});
			output += '</tbody></table>';
			document.getElementById('output').innerHTML = output;
	}).catch( (err) => document.getElementById('output').innerHTML = `ERROR: There has been a problem with the fetch operation: ${err.message}`
	);
}

// Declare getExternalAPI() for fetching data from external APIs
function getExternalAPI() {
	// fetch the github users api
	fetch('https://api.github.com/users').then( (response) => {
		// check if response is ok
		if(response.ok) {
			return response.json();
		} else {
			throw new Error(`Network response is NOT OK. Error: ${response.status} for ${response.url}`);
		}
	}).then( (users) => {
		let output = '<h4>Top 30 GitHub Users</h4><ol>';
		users.forEach(function(user) {
			output += `<li>${user.login} - ${user.html_url}</li>`;
		});
		output += '</ol>';
		document.getElementById('output').innerHTML = output;
	}).catch( (err) => document.getElementById('output').innerHTML = `ERROR: There has been a problem with the fetch operation: ${err.message}`
	);
}