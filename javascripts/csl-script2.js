(function() {

	if(typeof jQuery=='undefined') {
	    var headTag = document.getElementsByTagName("head")[0];
	    var jqTag = document.createElement('script');
	    jqTag.type = 'text/javascript';
	    jqTag.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
	    jqTag.onload = main;
	    headTag.appendChild(jqTag);
	} else {
	     main();
	}
	var country = "";
	var source = "";

	function stopSpinner(spinner){
		$('#country-csl-button').removeClass('search-button-clear');
		$('#source-csl-button').removeClass('search-button-clear');
		spinner.stop();	
	}

	function getCSL2(spinner){
		var countryIndex = $('#csl-country').val();
		var sourceIndex = $('#csl-source').val();
		if (countryIndex == 0 && sourceIndex == 0){
			alert("No selection has been chosen");
			document.getElementById("csl-results2").innerHTML = "";
			stopSpinner(spinner);
			return;
		}
		else{
			if (sourceIndex > 0){
				source = sourceList[sourceIndex];
			}
			if (countryIndex > 0){
				country = countryList[countryIndex][1]
			}
			var searchParams = "country=" + country + "&source=" + source;
		}

		var url = "http://api.trade.gov/consolidated_screening_list/search?" + searchParams + "&callback=?";
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(feed){
				var results = feed.results;
				if (results.length == 0){
					list = "<p>No lists were found, please try another selection.<p>"
				}
				else {
					$('#csl-results2').addClass('results-container2');
					var list = "<p></p>";
					for (var i=0; i<=results.length-1; i++){
						
						var title = results[i].title;
						var ids = results[i].ids;
						var name = results[i].name;
						var alt_names = results[i].alt_names;
						var entity_number = results[i].entity_number;
						var sdn_type = results[i].sdn_type;
						var programs = results[i].programs;
						var citizenships = results[i].citizenships;
						var dates_of_birth = results[i].dates_of_birth;
						var nationalities = results[i].nationalities;
						var places_of_birth = results[i].places_of_birth;
						var addresses = results[i].addresses;
						var source = results[i].source;	
						var source_list_url = results[i].source_list_url;
						var remarks = results[i].remarks;
						
						
						
						
						
						
						
						 
					list += "<p class='results-legend'>" + name + "<table> <tr><td><h6 >Alternate Names:</h6></td><td>" +  alt_names + "</td></tr> <tr><td><h6>SDN Type:</h6></td><td>" +  sdn_type + "</td></tr> <tr><td><h6>Entity Number:</h6></td><td>" +  entity_number + "</td></tr> <tr><td><h6>Programs:</h6></td><td>" +  programs + "</td></tr> <tr><td><h6>Citizenships:</h6></td><td>" +  citizenships + "</td></tr> <tr><td><h6>Dates of Birth:</h6></td><td>" +  dates_of_birth + "</td></tr> <tr><td><h6>Nationalities</h6></td><td>" +  nationalities + "</td></tr> <tr><td><h6>Places of Birth</h6></td><td>" +  places_of_birth + "</td></tr>  <tr><td><h6>Title:</h6></td><td>" +  title + "</td></tr>  <tr><td><h6>Source</h6></td><td>" +  source + "</td></tr> <tr><td><h6>Source List URL</h6></td><td> <a href=" + source_list_url + " target='_blank'>" + source_list_url +  "</a></td></tr> <tr><td><h6>Remarks:</h6></td><td>" +  remarks + "</td></tr>   </table> </br></br>"
					}
				}
				document.getElementById("csl-results2").innerHTML = list;
				stopSpinner(spinner);
			},
			error: function(error) {
				stopSpinner(spinner);
				alert("Error retriving lists, please try again");
			},
			timeout:3000
		});
	}

	function main() { 
	    $(document).ready(function($) {
				if (!$("link[href='']").length){
					$('<script src="javascripts/spin.js" type="text/javascript"></script>').appendTo("head");
					$('<script src="javascripts/trade-widget-vars.js" type="text/javascript"></script>').appendTo("head");
					$('<link href="" rel="stylesheet">').appendTo("head");
				}
				var container = "";
				container += ('<div id="csl-form2" class="form-container2"></div>');
				container += ('<div id="csl-results2" class="results-container2"></div>');			
				document.getElementById('csl-container2').innerHTML = container;
				$('#csl-container2').addClass('widget-container2');
				var form = "";				
	      
	      
				form += ('<div class="select-input"><select class="search-input" id="csl-source"></select>');
				form += ('<button style="display: none;" id="source-csl-button"></button></div></p>');
				form += ('<div class="select-input"><select class="search-input" id="csl-country"></select>');
				form += ('</br></br><button class="search-button3" id="country-csl-button">Filter</button></div>');
				
				
				
				
				document.getElementById('csl-form2').innerHTML = form;
				$('#source-csl-button').on('click', function(){
					$(this).addClass('search-button-clear');
					var spinner = new Spinner(spinnerVars).spin(this);
					getCSL2(spinner)
					});
				$('#country-csl-button').on('click', function(){
					$(this).addClass('search-button-clear');
					var spinner = new Spinner(spinnerVars).spin(this);
					getCSL2(spinner);
					});
				$('#country-csl-button').on('click', function(){
					$(this).addClass('search-button-clear');
					var spinner = new Spinner(spinnerVars).spin(this);
					getCSL2(spinner);
					});

				
				//populate dropdown lists
				$.each(sourceList, function(val, text) {
		      $('#csl-source').append( $('<option></option>').val(val).html(text));
		     });
				$.each(countryList, function(val, array) {
		      $('#csl-country').append( $('<option></option>').val(val).html(array[0]));
		     });
	    });
	}

})();