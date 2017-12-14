var app = app || {};

app.main = (function(){

	var projects = [];

	function attachEvents(){
		console.log('attach events Works!');

		$('.close').click(function (e) {
			e.preventDefault();
			window.location.hash = '#';
		});
		

	};

	/*------------------------------------------------*/
	//	Load the JSON
	/*------------------------------------------------*/
	function loadData() {

		console.log('loadData works..');
		
		$.getJSON( "../../projects.json", function( data ) {
			// Write the data into our global variable.

			projects = data;

			generateAllProjectsHTML(projects);
			
			$(window).trigger('hashchange');
		});
	};

	function render(url) {

		var temp = url.split('/')[0];

		//Make sure all pages are hidden to start with.

		$('.all-content .page').removeClass('visible');

		var	map = {
			
			'': function() {
				renderStudentsPage(projects);
			},

			'#project': function() {
				
				var index = url.split('#project/')[1].trim();
				renderSingleProjectPage(index, projects);
			}

		};

		if(map[temp]){
			map[temp]();
		}
		else {
			renderErrorPage();
		}
	}

	function generateAllProjectsHTML(data) {
		console.log('generateProjects works..');

		var list = $('.squares');

		var source = $("#projects-template").html();

		var template = Handlebars.compile(source);
		list.append (template(data));

		list.find('li').on('click', function (e) {
			e.preventDefault();
			var studentIndex = $(this).data('index');
			console.log(studentIndex);
			if(studentIndex !== 1){
			window.location.hash = 'project/' + studentIndex;
			}
		});

	}

	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}

	/*------------------------------------------------*/
	// Iterate through the projects to make the clicked one visible
	/*------------------------------------------------*/
	function renderStudentsPage(data){

		var page = $('.grid'),
			allProjects = $('.squares > li');

		// Hide all the projects
		allProjects.addClass('hidden');

		allProjects.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		// Show the page itself.
		// (the render function hides all pages so we need to show the one we want).
		page.addClass('visible');
	}

	function renderSingleProjectPage(index, data){
		var page = $('.single-project'),
			container = $('.popup-detail');
			var myHojd = $( ".grid" ).height();
					container.css('height', myHojd);
		// Find the wanted project by iterating the data object and searching for the chosen index.
		if(data.length){
			data.forEach(function (item) {
				
				if(item.id == index){
					// Changing the page depending on which project is chosen.
					window.scrollTo(0, 0);
					container.find('iframe').remove();
					container.find('figure').remove();
					container.find('img').remove();
					container.find('a.link1').remove();
					container.find('a.link2').remove();
					container.find('a.link3').remove();
					container.find('a.link4').remove();
					container.find('p.description1').remove();
					container.find('p.description2').remove();
					container.find('p.description3').remove();
					container.find('p.description4').remove();
					container.find('p.description5').remove();
					container.find('p.description6').remove();
					container.find('p.description7').remove();
					container.find('h4').after('<figure></figure>');
					container.find('figure').after('<p class="description1"><mark style="background-color: #FFFFFF"></mark></p>');
					container.find('figure').after('<a href="http://error.com/" target="_blank" class="link1"><mark style="background-color: #FFFFFF">LINKEDIN</mark></a>');
					container.find('a.link1').after('<a href="http://error.com/" target="_blank" class="link2"><mark style="background-color: #FFFFFF">GITHUB</mark></a>');
					container.find('a.link2').after('<a href="http://error.com/" target="_blank" class="link3"><mark style="background-color: #FFFFFF">VIMEO</mark></a>');
					container.find('a.link3').after('<a href="http://error.com/" class="link4"><mark style="background-color: #FFFFFF">EMAIL</mark><br/></a>');
					container.find('p.description1').after('<p class="description2"><mark style="background-color: #FFFFFF"></mark></p>');
					container.find('p.description2').after('<p class="description3"><mark style="background-color: #FFFFFF"></mark></p>');
					container.find('p.description3').after('<p class="description4"><mark style="background-color: #FFFFFF"></mark></p>');
					container.find('p.description4').after('<p class="description5"><mark style="background-color: #FFFFFF"></mark></p>');
					container.find('p.description5').after('<p class="description6"><mark style="background-color: #FFFFFF"></mark></p>');
					container.find('p.description6').after('<p class="description7"><mark style="background-color: #FFFFFF"></mark></p>');
					container.css('background-color', item.color);
					container.find('h1 mark').text(item.name);
					container.find('h4 mark').text(item.type);
					container.find('figure').css('background-image', item.image.large);
					container.find('p.description1 mark').text(item.description1);
					container.find('p.description2 mark').text(item.description2);
					container.find('p.description3 mark').text(item.description3);
					container.find('p.description4 mark').text(item.description4);
					container.find('p.description5 mark').text(item.description5);
					container.find('p.description6 mark').text(item.description6);
					container.find('p.description7 mark').text(item.description7);
					container.find('a.link1').attr("href", item.link1.adress);
					container.find('a.link1 mark').text(item.link1.text);
					container.find('a.link2').attr("href", item.link2.adress);
					container.find('a.link2 mark').text(item.link2.text); 
					container.find('a.link3').attr("href", item.link3.adress);
					container.find('a.link3 mark').text(item.link3.text);
					container.find('a.link4').attr("href", item.link4.adress);
					container.find('a.link4 mark').text(item.link4.text);
					if(item.id == 3){
						$( "a" ).remove();
						$( ".description2" ).remove();
						$( ".description3" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 4) {
						var htmlSting = '<iframe src="https://player.vimeo.com/video/178489068" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						$( "p.description1" ).after( htmlSting );
						$( ".link4" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 5) {
						$( ".link2" ).remove();
						$( ".link3" ).remove();
						$( ".link4" ).remove();
						$( ".description2" ).remove();
						$( ".description3" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 6) {
						var htmlSting = '<iframe src="https://player.vimeo.com/video/239624793" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						$( "p.description1" ).after( htmlSting );
						$( ".link2" ).remove();
						$( ".link3" ).remove();
						$( ".link4" ).remove();
						$( ".description2" ).remove();
						$( ".description3" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 7) {
						$( ".link4" ).remove();
						$( ".description2" ).remove();
						$( ".description3" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 8) {
						var htmlSting = '<iframe src="https://player.vimeo.com/video/239625370" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></br>';
						$( "h4" ).after( htmlSting );
						var htmlSting2 = '<img src="assets/img/Lovedetector_Box.jpg">';
						$( "p.description3" ).after( htmlSting2 );
						var htmlSting3 = '<img src="assets/img/Lovedetector_Pcb.jpg">';
						$( "p.description2" ).after( htmlSting3 );
						var htmlSting3 = '<img src="assets/img/Lovedetector_Inspiration.jpg">';
						$( "p.description4" ).after( htmlSting3 );
						$( "figure" ).remove();
						$( ".link3" ).remove();
						$( ".link4" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 9) {
						var htmlSting1 = '<iframe src="https://player.vimeo.com/video/239647463" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						$( "p.description1" ).after( htmlSting1 );
						var htmlSting2 = '<iframe src="https://player.vimeo.com/video/239645871" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						$( "p.description3" ).after( htmlSting2 );
						var htmlSting3 = '<iframe src="https://player.vimeo.com/video/239646571" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></br>';
						$( "p.description2" ).after( htmlSting3 );
						$( ".link2" ).remove();
						$( ".link3" ).remove();
						$( ".link4" ).remove();
						$( ".description3" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 10) {
						var htmlSting1 = '<iframe src="https://player.vimeo.com/video/218222442" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						$( "h4" ).after( htmlSting1 );
						$( "figure" ).remove();
						$( ".link1" ).remove();
						$( ".link2" ).remove();
						$( ".link3" ).remove();
						$( ".link4" ).remove();
						$( ".description3" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 11) {
						var h = '90vw';
						$(".popup-detail figure").css('height', h);
						var mh = '464px';
						$(".popup-detail figure").css('max-height', mh);
						//Problem bör vara med wv ist för %?
						var w = '90vw';
						$(".popup-detail figure").css('width', w);
						var mw = '550px';
						$(".popup-detail figure").css('max-width', mw);
						$( ".link1" ).remove();
						$( ".link2" ).remove();
						$( ".link3" ).remove();
						$( ".link4" ).remove();
						$( ".description3" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					} else if (item.id == 12) {
						$( ".link1" ).remove();
						$( ".link2" ).remove();
						$( ".link3" ).remove();
						$( ".link4" ).remove();
						$( ".description2" ).remove();
						$( ".description3" ).remove();
						$( ".description4" ).remove();
						$( ".description5" ).remove();
						$( ".description6" ).remove();
						$( ".description7" ).remove();
					}
				}
			});
		}

		// Show the page.
		page.addClass('visible');

	}



	var init = function(){
		console.log('Initializing app.');
		attachEvents();
		loadData();

		$(window).on('hashchange', function(){
			render(decodeURI(window.location.hash));
		});
	};

	return {
		init: init
	};

})();

$(window).resize(function() {

          var hojd = $( ".grid" ).height();
					$(".popup-detail").css('height', hojd);
       });

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);
