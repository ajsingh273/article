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



	function stopSpinner(spinner){
		$('#csl-button').removeClass('search-button-clear');
		spinner.stop();
	}

	function getCsl(spinner) {
		var keyword = document.getElementById("csl-keyword").value;
		var url = "http://api.trade.gov/consolidated_screening_list/search.json?q=" ;


		if (keyword.length > 0){
			url += keyword;
		}
		else {
			alert("No search term entered");
			document.getElementById("csl-results").innerHTML = "";
			stopSpinner(spinner);
			return;
		}
		url += "&callback=?";
		$.ajax({
			url: url,
			dataType: 'jsonp',
			success: function(feed){
				var results = feed.results;
				if (results.length == 0){
					list = "<p>No CSL results were found, please try another search term.<p>"
				}
				else {
					$('#csl-results').addClass('csl-container');
					var list = "<p class='results-title'></p>";
					for (var i=0; i<=results.length-1; i++){
						var csl = results[i];

						var addresses = '';
            if (csl.addresses !== null) {
              for (var i = 0; i < csl.addresses.length; ++i) {
                var addressString = '';
                csl_address = csl.addresses[i];

                if (csl_address.address !== null) {
                  addressString += (csl_address.address + ' ');
                }
                if (csl_address.city !== null) {
                  addressString += (', ' + csl_address.city + ' ');
                }

                if (csl_address.state !== null) {
                  addressString += (', ' + csl_address.state + ' ');
                }

                if (csl_address.postal_code !== null) {
                  addressString += (', ' + csl_address.postal_code + ' ');
                }

                if (csl_address.country !== null) {
                  addressString += (', ' + csl_address.country + ' ');
                }
                addresses += (addressString + "<br />");
              }
            }
        

						var alt_names = csl.alt_names;
						var citizenships = csl.citizenships;
						var dates_of_birth = csl.dates_of_birth;
						var entity_number = csl.entity_number;
						var ids = csl.ids;
						var name = csl.name;
						var nationalities = csl.nationalities;
						var places_of_birth = csl.places_of_birth;
						var programs = csl.programs;
						var remarks = csl.remarks;
						var sdn_type = csl.sdn_type;
						var source = csl.source;
						var source_list_url = csl.source_list_url;
						var title = csl.title;




						list += "<p class='results-legend'>" + "<table> <tr><td>Addresses</td><td>" + addresses + "</td></tr> <tr><td>Alternate Names</td><td>" +  alt_names + "</td></tr> <tr><td>Citizenships</td><td>" +  citizenships + "</td></tr> <tr><td>Dates of Birth</td><td>" +  dates_of_birth + "</td></tr> <tr><td>Entity Number</td><td>" +  entity_number + "</td></tr> <tr><td>IDs</td><td>" +  ids + "</td></tr> <tr><td>Name</td><td>" +  name + "</td></tr> <tr><td>Nationalities</td><td>" +  nationalities + "</td></tr> <tr><td>Places of Birth</td><td>" +  places_of_birth + "</td></tr> <tr><td>Programs</td><td>" +  programs + "</td></tr> <tr><td>Remarks</td><td>" +  remarks + "</td></tr> <tr><td>SDN Type</td><td>" +  sdn_type + "</td></tr> <tr><td>Source</td><td>" +  source + "</td></tr> <tr><td>Source List URL</td><td> <a href=" + source_list_url + " target='_blank'>" + source_list_url +  "</a></td></tr> <tr><td>title</td><td>" +  title + "</td></tr>   </table> </br></br></br></br>"

					}
				}
				document.getElementById("csl-results").innerHTML = list;
				stopSpinner(spinner);
			},
			error: function(error) {
				stopSpinner(spinner);
				alert("Error retriving CSL results, please try again");
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
				container += ('<div id="csl-form" class="form-container"></div>');
				container += ('<div id="csl-results" class="csl-container"></div>');
				document.getElementById('csl-container').innerHTML = container;
				$('#csl-container').addClass('widget-container');
				var form = "";
	      form += ('<p class="widget-title"><h2>Consolidated Screening List</h1></p>');
				form += ('<div><input class="search-input" type="text" id="csl-keyword" placeholder="" size="40" style="border: 1px solid #03738c; color:#024059">');
				form += ('<button class="search-button" id="csl-button">SEARCH</button></div>');
				document.getElementById('csl-form').innerHTML = form;
				$('#csl-button').on('click', function(){
					$(this).addClass('search-button-clear');
					var spinner = new Spinner(spinnerVars).spin(this);
					getCsl(spinner);
					});
				$('#csl-keyword').keypress(function (e){
				    if(e.which == 13){
							$('#csl-button').addClass('search-button-clear');
							target = document.getElementById('csl-button');
							var spinner = new Spinner(spinnerVars).spin(target);
							getCsl(spinner);
				    }
				});
	    });
	}

})();