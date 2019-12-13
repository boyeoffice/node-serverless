window._ = require('lodash');
window.Popper = require('popper.js').default;

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
    backgroundOrange = false,
		toggle_initialized = false;


		$(window).on('resize', function() {
			boyeKit.initNavbarImage();
	});

$(document).on('click', '.navbar-toggler', function() {
	$toggle = $(this);

	if (boyeKit.misc.navbar_menu_visible == 1) {
			$('html').removeClass('nav-open');
			boyeKit.misc.navbar_menu_visible = 0;
			$('#bodyClick').remove();
			setTimeout(function() {
					$toggle.removeClass('toggled');
			}, 550);
	} else {
			setTimeout(function() {
					$toggle.addClass('toggled');
			}, 580);
			div = '<div id="bodyClick"></div>';
			$(div).appendTo('body').click(function() {
					$('html').removeClass('nav-open');
					boyeKit.misc.navbar_menu_visible = 0;
					setTimeout(function() {
							$toggle.removeClass('toggled');
							$('#bodyClick').remove();
					}, 550);
			});

			$('html').addClass('nav-open');
			boyeKit.misc.navbar_menu_visible = 1;
	}
});

boyeKit = {
	misc: {
			navbar_menu_visible: 0
	},
	
	checkScrollForTransparentNavbar: _.debounce(function() {
		if ($(document).scrollTop() > scroll_distance) {
				if (transparent) {
						transparent = false;
						$('.navbar[color-on-scroll]').removeClass('navbar-transparent');
				}
		} else {
				if (!transparent) {
						transparent = true;
						$('.navbar[color-on-scroll]').addClass('navbar-transparent');
				}
		}
}, 17),

initNavbarImage: function() {
		var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
		var background_image = $navbar.data('nav-image');

		if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
				if (background_image != undefined) {
						$navbar.css('background', "url('" + background_image + "')")
								.removeAttr('data-nav-image')
								.css('background-size', "cover")
								.addClass('has-image');
				}
		} else if (background_image != undefined) {
				$navbar.css('background', "")
						.attr('data-nav-image', '' + background_image + '')
						.css('background-size', "")
						.removeClass('has-image');
		}
 }
}
// Activate the image for the navbar-collapse
boyeKit.initNavbarImage();

$navbar = $('.navbar[color-on-scroll]');
scroll_distance = $navbar.attr('color-on-scroll') || 500;

// Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

if ($('.navbar[color-on-scroll]').length != 0) {
		boyeKit.checkScrollForTransparentNavbar();
		$(window).on('scroll', boyeKit.checkScrollForTransparentNavbar)
}



/*
const nav = document.querySelector('#navigation')
	 const bodyClass = document.querySelector('body')
	 const htmlClass = document.querySelector('html')
	 //const appendDiv = document.createElement('div')
	 //appendDiv.style.cssText = 'position: fixed;'

	 const toggleNavbar = () => {
		 nav.classList.toggle('navbar-collapse')
		 bodyClass.classList.toggle('sidebar-collapse')
		 htmlClass.classList.toggle('nav-open')
		 if(nav.classList.contains('navbar-collapse')){
			 //document.body.innerHTML += '<div id="bodyClick" onclick="toggleNavbar()"></div>'
		 }
	 }

	 const navbar = document.querySelector("header")

	 document.addEventListener("scroll", () => {
			const fromTop = window.scrollY
			if(fromTop > 100){
				navbar.classList.add("main-header")
			}else{
			navbar.classList.remove("main-header")
			}
	 })

	 let mainNavLinks = document.querySelectorAll("header nav ul li .nav-link")
	 let mainSections = document.querySelectorAll(".wrapper #home #about #service #gallery")

	 let lastId;
	 let cur = [];
	 
	 const pageScroll = () => {

		const fromTop = window.scrollY

		mainNavLinks.forEach(link => {
			var section = document.querySelector(link.hash)
			console.log(section)

			if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop ){
				link.classList.add("active")
			}else{
				link.classList.remove("active")
			}
		})
	 }

	 window.addEventListener("scroll", () => {
		 _.debounce(pageScroll(), 2000);
	 })*/
