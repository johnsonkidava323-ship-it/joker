(function ($) {
	'use strict';

	$(function () {
		var $window = $(window);
		var $body = $('body');
		var $aside = $('#colorlib-aside');

		if ($.fn.flexslider) {
			$('.flexslider').flexslider({
				animation: 'fade',
				slideshowSpeed: 5000,
				animationSpeed: 600,
				controlNav: true,
				directionNav: false,
				pauseOnAction: true,
				pauseOnHover: true
			});
		}

		function scrollToSection(section) {
			var $target = $('[data-section="' + section + '"]');
			if ($target.length) {
				$('html, body').stop().animate({ scrollTop: $target.offset().top }, 700);
			}
		}

		$('[data-nav-section]').on('click', function (event) {
			event.preventDefault();
			var section = $(this).data('nav-section');
			scrollToSection(section);
			if ($window.width() <= 768 && $aside.hasClass('active')) {
				$aside.removeClass('active');
				$('.js-colorlib-nav-toggle').removeClass('active');
				$body.removeClass('offcanvas');
			}
		});

		$('.js-colorlib-nav-toggle').on('click', function (event) {
			event.preventDefault();
			$(this).toggleClass('active');
			$aside.toggleClass('active');
			$body.toggleClass('offcanvas');
		});

		if ($.fn.waypoint) {
			$('.animate-box').waypoint(function (direction) {
				if (direction === 'down') {
					$(this.element).addClass('animated ' + ($(this.element).data('animate-effect') || 'fadeInUp'));
				}
			}, { offset: '85%' });
		}

		$('.js-counter').each(function () {
			var $counter = $(this);
			var target = parseInt($counter.data('to'), 10) || 0;
			var speed = parseInt($counter.data('speed'), 10) || 1500;
			var started = false;

			function startCounter() {
				if (started) return;
				started = true;
				$({ value: 0 }).animate({ value: target }, {
					duration: speed,
					easing: 'swing',
					step: function () { $counter.text(Math.ceil(this.value)); },
					complete: function () { $counter.text(target); }
				});
			}

			if ($.fn.waypoint) {
				$counter.waypoint(startCounter, { offset: '90%' });
			} else {
				startCounter();
			}
		});
	});
}(jQuery));
