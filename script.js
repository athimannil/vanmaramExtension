document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('search').addEventListener('input', suggestword);

	function suggestword() {
			const search = document.getElementById('search').value;
			console.log("search", search);
			if (search.length > 2) {
					if (/[\u0D00-\u0D7F]/.test(search)) {
							target = 'ml';
					} else if (/[A-Za-z]/.test(search)) {
							target = 'en';
					} else {
							console.error('Unknown script');
							return;
					}

					let url = 'https://www.vanmaram.com/ajax_json_suggestion.php?' + target + '=' + search;
					fetch(url)
							.then(response => response.json())
							.then(data => {
									if (data.length > 3) {
											displaySuggestions(data, 'suggetionresult', 9);
											clearResults();
									} else {
											clearSuggestions();
									}
							})
							.catch(error => {
									console.error('Request failed', error);
							});
			} else {
					clearSuggestions();
			}
	}

	function displaySuggestions(data, elementId, displayItems = 20) {
			let resultElement = document.getElementById(elementId);
			resultElement.innerHTML = '<li>Suggestions:</li>';
			data.slice(0, displayItems).forEach(word => {
					let li = document.createElement('li');
					let a = document.createElement('a');
					a.textContent = word;
					a.href = '#';
					a.addEventListener('click', function(event) {
							event.preventDefault();
							search(word);
					});
					li.appendChild(a);
					resultElement.appendChild(li);
			});
	};


	document.getElementById('form').addEventListener('submit', function(event) {
			event.preventDefault();
			search();
	});

	function search(word = null) {
			const search = word || document.getElementById('search').value;
			let langTarget;
			if (/[\u0D00-\u0D7F]/.test(search)) {
					langTarget = 'ml';
			} else if (/[A-Za-z]/.test(search)) {
					langTarget = 'en';
			} else {
					console.error('Unknown script');
					return;
			}

			let url = 'https://www.vanmaram.com/json_result.php?' + langTarget + '=' + search;
			fetch(url)
					.then(response => response.json())
					.then(data => {
							displayResults(data, 'result', langTarget, search, 4);
							clearSuggestions();
					})
					.catch(error => {
							console.error('Request failed', error);
							// Consider adding user feedback here
					});
	};

	function displayResults(data, elementId, language, search, displayItems = 20) {
			let resultElement = document.getElementById(elementId);
			resultElement.innerHTML = '';
			console.log("data in displayResults", data);
			console.log(data, elementId, language, search, displayItems);
			data.slice(0, displayItems).forEach(word => {
					console.log("word", word);
					let li = document.createElement('li');
					li.textContent = word;
					resultElement.appendChild(li);
			});
			// Add a link to the full search results
			let li = document.createElement('li');
			li.className = 'more-results';
			let link = document.createElement('a');
			link.target = '_blank';
			link.href = `https://www.vanmaram.com/${language}/${search}`;
			link.innerHTML = 'കൂടുതല്‍ &gt;&gt;';
			li.appendChild(link);
			resultElement.appendChild(li);
	}

	function clearResults() {
			document.getElementById('result').innerHTML = '';
	}

	function clearSuggestions() {
			document.getElementById('suggetionresult').innerHTML = '';
	}
});