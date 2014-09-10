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
				if (!$("link[href='stylesheets/csl.css']").length){
					$('<script src="javascripts/spin.js" type="text/javascript"></script>').appendTo("head");
					$('<script src="javascripts/trade-widget-vars.js" type="text/javascript"></script>').appendTo("head");
					$('<link href="stylesheets/csl.css" rel="stylesheet">').appendTo("head");
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