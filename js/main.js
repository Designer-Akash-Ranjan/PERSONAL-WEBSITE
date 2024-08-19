/* -------------------------------------------

Name: 		Ruizarch
Version:    1.0
Developer:	Nazar argler (arglerDigitalDesign)
Portfolio:  https://themeforest.net/user/arglerdigitaldesign/portfolio?ref=arglerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). email: argler.themes@gmail.com

------------------------------------------- */

$(function () {

    "use strict";

    /***************************

    swup

    ***************************/
    const options = {
        containers: ['#swupMain', '#swupMenu'],
        animateHistoryBrowsing: true,
        linkSelector: 'a:not([data-no-swup])',
        animationSelector: '[class="arg-main-transition"]'
    };
    const swup = new Swup(options);

    /***************************

    register gsap plugins

    ***************************/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    /***************************

    color variables

    ***************************/

    var accent = 'rgba(255, 152, 0, 1)';
    var dark = '#000';
    var light = '#fff';

    /***************************

    preloader
    
    ***************************/

    var timeline = gsap.timeline();

    timeline.to(".arg-preloader-animation", {
        opacity: 1,
    });

    timeline.fromTo(
        ".arg-animation-1 .arg-h3", {
            y: "30px",
            opacity: 0
        }, {
            y: "0px",
            opacity: 1,
            stagger: 0.4
        },
    );

    timeline.to(".arg-animation-1 .arg-h3", {
        opacity: 0,
        y: '-30',
    }, "+=.3");

    timeline.fromTo(".arg-reveal-box", 0.1, {
        opacity: 0,
    }, {
        opacity: 1,
        x: '-30',
    });

    timeline.to(".arg-reveal-box", 0.45, {
        width: "100%",
        x: 0,
    }, "+=.1");
    timeline.to(".arg-reveal-box", {
        right: "0"
    });
    timeline.to(".arg-reveal-box", 0.3, {
        width: "0%"
    });
    timeline.fromTo(".arg-animation-2 .arg-h3", {
        opacity: 0,
    }, {
        opacity: 1,
    }, "-=.5");
    timeline.to(".arg-animation-2 .arg-h3", 0.6, {
        opacity: 0,
        y: '-30'
    }, "+=.5");
    timeline.to(".arg-preloader", 0.8, {
        opacity: 0,
        ease: 'sine',
    }, "+=.2");
    timeline.fromTo(".arg-up", 0.8, {
        opacity: 0,
        y: 40,
        scale: .98,
        ease: 'sine',

    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        onComplete: function () {
            $('.arg-preloader').addClass("arg-hidden");
        },
    }, "-=1");
    /***************************

    anchor scroll

    ***************************/
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        var target = $($.attr(this, 'href'));
        var offset = 0;

        if ($(window).width() < 1200) {
            offset = 90;
        }

        $('html, body').animate({
            scrollTop: target.offset().top - offset
        }, 400);
    });
    /***************************

    append

    ***************************/
    $(document).ready(function () {
        $(".arg-arrow").clone().appendTo(".arg-arrow-place");
        $(".arg-dodecahedron").clone().appendTo(".arg-animation");
        $(".arg-lines").clone().appendTo(".arg-lines-place");
        $(".arg-main-menu ul li.arg-active > a").clone().appendTo(".arg-current-page");
    });
    /***************************

    accordion

    ***************************/

    let groups = gsap.utils.toArray(".arg-accordion-group");
    let menus = gsap.utils.toArray(".arg-accordion-menu");
    let menuToggles = groups.map(createAnimation);

    menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleMenu(menu));
    });

    function toggleMenu(clickedMenu) {
        menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
    }

    function createAnimation(element) {
        let menu = element.querySelector(".arg-accordion-menu");
        let box = element.querySelector(".arg-accordion-content");
        let symbol = element.querySelector(".arg-symbol");
        let minusElement = element.querySelector(".arg-minus");
        let plusElement = element.querySelector(".arg-plus");

        gsap.set(box, {
            height: "auto",
        });

        let animation = gsap
            .timeline()
            .from(box, {
                height: 0,
                duration: 0.4,
                ease: "sine"
            })
            .from(minusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(plusElement, {
                duration: 0.4,
                autoAlpha: 0,
                ease: "none",
            }, 0)
            .to(symbol, {
                background: accent,
                ease: "none",
            }, 0)
            .reverse();

        return function (clickedMenu) {
            if (clickedMenu === menu) {
                animation.reversed(!animation.reversed());
            } else {
                animation.reverse();
            }
        };
    }
    /***************************

    back to top

    ***************************/
    const btt = document.querySelector(".arg-back-to-top .arg-link");

    gsap.set(btt, {
        x: -30,
        opacity: 0,
    });

    gsap.to(btt, {
        x: 0,
        opacity: 1,
        ease: 'sine',
        scrollTrigger: {
            trigger: "body",
            start: "top -40%",
            end: "top -40%",
            toggleActions: "play none reverse none"
        }
    });
    /***************************

    cursor

    ***************************/
    const cursor = document.querySelector('.arg-ball');

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
    });

    document.addEventListener('pointermove', movecursor);

    function movecursor(e) {
        gsap.to(cursor, {
            duration: 0.6,
            ease: 'sine',
            x: e.clientX,
            y: e.clientY,
        });
    }

    $('.arg-drag, .arg-more, .arg-choose').mouseover(function () {
        gsap.to($(cursor), .2, {
            width: 90,
            height: 90,
            opacity: 1,
            ease: 'sine',
        });
    });

    $('.arg-drag, .arg-more, .arg-choose').mouseleave(function () {
        gsap.to($(cursor), .2, {
            width: 20,
            height: 20,
            opacity: .1,
            ease: 'sine',
        });
    });

    $('.arg-accent-cursor').mouseover(function () {
        gsap.to($(cursor), .2, {
            background: accent,
            ease: 'sine',
        });
        $(cursor).addClass('arg-accent');
    });

    $('.arg-accent-cursor').mouseleave(function () {
        gsap.to($(cursor), .2, {
            background: dark,
            ease: 'sine',
        });
        $(cursor).removeClass('arg-accent');
    });

    $('.arg-drag').mouseover(function () {
        gsap.to($('.arg-ball .arg-icon-1'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.arg-drag').mouseleave(function () {
        gsap.to($('.arg-ball .arg-icon-1'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.arg-more').mouseover(function () {
        gsap.to($('.arg-ball .arg-more-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.arg-more').mouseleave(function () {
        gsap.to($('.arg-ball .arg-more-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('.arg-choose').mouseover(function () {
        gsap.to($('.arg-ball .arg-choose-text'), .2, {
            scale: '1',
            ease: 'sine',
        });
    });

    $('.arg-choose').mouseleave(function () {
        gsap.to($('.arg-ball .arg-choose-text'), .2, {
            scale: '0',
            ease: 'sine',
        });
    });

    $('a:not(".arg-choose , .arg-more , .arg-drag , .arg-accent-cursor"), input , textarea, .arg-accordion-menu').mouseover(function () {
        gsap.to($(cursor), .2, {
            scale: 0,
            ease: 'sine',
        });
        gsap.to($('.arg-ball svg'), .2, {
            scale: 0,
        });
    });

    $('a:not(".arg-choose , .arg-more , .arg-drag , .arg-accent-cursor"), input, textarea, .arg-accordion-menu').mouseleave(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });

        gsap.to($('.arg-ball svg'), .2, {
            scale: 1,
        });
    });

    $('body').mousedown(function () {
        gsap.to($(cursor), .2, {
            scale: .1,
            ease: 'sine',
        });
    });
    $('body').mouseup(function () {
        gsap.to($(cursor), .2, {
            scale: 1,
            ease: 'sine',
        });
    });
    /***************************

     menu

    ***************************/
    $('.arg-menu-btn').on("click", function () {
        $('.arg-menu-btn').toggleClass('arg-active');
        $('.arg-menu').toggleClass('arg-active');
        $('.arg-menu-frame').toggleClass('arg-active');
    });
    /***************************

    main menu

    ***************************/
    $('.arg-has-children a').on('click', function () {
        $('.arg-has-children ul').removeClass('arg-active');
        $('.arg-has-children a').removeClass('arg-active');
        $(this).toggleClass('arg-active');
        $(this).next().toggleClass('arg-active');
    });
    /***************************

    progressbar

    ***************************/
    gsap.to('.arg-progress', {
        height: '100%',
        ease: 'sine',
        scrollTrigger: {
            scrub: 0.3
        }
    });
    /***************************

    scroll animations

    ***************************/

    const appearance = document.querySelectorAll(".arg-up");

    appearance.forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 40,
            scale: .98,
            ease: 'sine',

        }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .4,
            scrollTrigger: {
                trigger: section,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const scaleImage = document.querySelectorAll(".arg-scale");

    scaleImage.forEach((section) => {
        var value1 = $(section).data("value-1");
        var value2 = $(section).data("value-2");
        gsap.fromTo(section, {
            ease: 'sine',
            scale: value1,

        }, {
            scale: value2,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });

    const parallaxImage = document.querySelectorAll(".arg-parallax");


    if ($(window).width() > 960) {
        parallaxImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                y: value1,

            }, {
                y: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
    }

    const rotate = document.querySelectorAll(".arg-rotate");

    rotate.forEach((section) => {
        var value = $(section).data("value");
        gsap.fromTo(section, {
            ease: 'sine',
            rotate: 0,

        }, {
            rotate: value,
            scrollTrigger: {
                trigger: section,
                scrub: true,
                toggleActions: 'play none none reverse',
            }
        });
    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
        loop: false,
        protect: true
    });
    $.fancybox.defaults.hash = false;
    /***************************

    reviews slider

    ***************************/

    var menu = ['<div class="arg-custom-dot arg-slide-1"></div>', '<div class="arg-custom-dot arg-slide-2"></div>', '<div class="arg-custom-dot arg-slide-3"></div>', '<div class="arg-custom-dot arg-slide-4"></div>', '<div class="arg-custom-dot arg-slide-5"></div>', '<div class="arg-custom-dot arg-slide-6"></div>', '<div class="arg-custom-dot arg-slide-7"></div>']
    var mySwiper = new Swiper('.arg-reviews-slider', {
        // If we need pagination
        pagination: {
            el: '.arg-revi-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        speed: 800,
        effect: 'fade',
        parallax: true,
        navigation: {
            nextEl: '.arg-revi-next',
            prevEl: '.arg-revi-prev',
        },
    })

    /***************************

    infinite slider

    ***************************/
    var swiper = new Swiper('.arg-infinite-show', {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 5000,
        autoplay: true,
        autoplay: {
            delay: 0,
        },
        loop: true,
        freeMode: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
        },
    });

    /***************************

    portfolio slider

    ***************************/
    var swiper = new Swiper('.arg-portfolio-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        parallax: true,
        mousewheel: {
            enable: true
        },
        navigation: {
            nextEl: '.arg-portfolio-next',
            prevEl: '.arg-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    1 item slider

    ***************************/
    var swiper = new Swiper('.arg-1-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.arg-portfolio-next',
            prevEl: '.arg-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
    });
    /***************************

    2 item slider

    ***************************/
    var swiper = new Swiper('.arg-2-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        parallax: true,
        navigation: {
            nextEl: '.arg-portfolio-next',
            prevEl: '.arg-portfolio-prev',
        },
        pagination: {
            el: '.swiper-portfolio-pagination',
            type: 'fraction',
        },
        breakpoints: {
            992: {
                slidesPerView: 2,
            },
        },
    });

    /*----------------------------------------------------------
    ------------------------------------------------------------

    REINIT

    ------------------------------------------------------------
    ----------------------------------------------------------*/
    document.addEventListener("swup:contentReplaced", function () {

        $('html, body').animate({
            scrollTop: 0,
        }, 0);

        gsap.to('.arg-progress', {
            height: 0,
            ease: 'sine',
            onComplete: () => {
                ScrollTrigger.refresh()
            },
        });
        /***************************

         menu

        ***************************/
        $('.arg-menu-btn').removeClass('arg-active');
        $('.arg-menu').removeClass('arg-active');
        $('.arg-menu-frame').removeClass('arg-active');
        /***************************

        append

        ***************************/
        $(document).ready(function () {
            $(".arg-arrow-place .arg-arrow, .arg-animation .arg-dodecahedron, .arg-current-page a").remove();
            $(".arg-arrow").clone().appendTo(".arg-arrow-place");
            $(".arg-dodecahedron").clone().appendTo(".arg-animation");
            $(".arg-lines").clone().appendTo(".arg-lines-place");
            $(".arg-main-menu ul li.arg-active > a").clone().appendTo(".arg-current-page");
        });
        /***************************

        accordion

        ***************************/

        let groups = gsap.utils.toArray(".arg-accordion-group");
        let menus = gsap.utils.toArray(".arg-accordion-menu");
        let menuToggles = groups.map(createAnimation);

        menus.forEach((menu) => {
            menu.addEventListener("click", () => toggleMenu(menu));
        });

        function toggleMenu(clickedMenu) {
            menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
        }

        function createAnimation(element) {
            let menu = element.querySelector(".arg-accordion-menu");
            let box = element.querySelector(".arg-accordion-content");
            let symbol = element.querySelector(".arg-symbol");
            let minusElement = element.querySelector(".arg-minus");
            let plusElement = element.querySelector(".arg-plus");

            gsap.set(box, {
                height: "auto",
            });

            let animation = gsap
                .timeline()
                .from(box, {
                    height: 0,
                    duration: 0.4,
                    ease: "sine"
                })
                .from(minusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(plusElement, {
                    duration: 0.4,
                    autoAlpha: 0,
                    ease: "none",
                }, 0)
                .to(symbol, {
                    background: accent,
                    ease: "none",
                }, 0)
                .reverse();

            return function (clickedMenu) {
                if (clickedMenu === menu) {
                    animation.reversed(!animation.reversed());
                } else {
                    animation.reverse();
                }
            };
        }

        /***************************

        cursor

        ***************************/

        $('.arg-drag, .arg-more, .arg-choose').mouseover(function () {
            gsap.to($(cursor), .2, {
                width: 90,
                height: 90,
                opacity: 1,
                ease: 'sine',
            });
        });

        $('.arg-drag, .arg-more, .arg-choose').mouseleave(function () {
            gsap.to($(cursor), .2, {
                width: 20,
                height: 20,
                opacity: .1,
                ease: 'sine',
            });
        });

        $('.arg-accent-cursor').mouseover(function () {
            gsap.to($(cursor), .2, {
                background: accent,
                ease: 'sine',
            });
            $(cursor).addClass('arg-accent');
        });

        $('.arg-accent-cursor').mouseleave(function () {
            gsap.to($(cursor), .2, {
                background: dark,
                ease: 'sine',
            });
            $(cursor).removeClass('arg-accent');
        });

        $('.arg-drag').mouseover(function () {
            gsap.to($('.arg-ball .arg-icon-1'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.arg-drag').mouseleave(function () {
            gsap.to($('.arg-ball .arg-icon-1'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.arg-more').mouseover(function () {
            gsap.to($('.arg-ball .arg-more-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.arg-more').mouseleave(function () {
            gsap.to($('.arg-ball .arg-more-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('.arg-choose').mouseover(function () {
            gsap.to($('.arg-ball .arg-choose-text'), .2, {
                scale: '1',
                ease: 'sine',
            });
        });

        $('.arg-choose').mouseleave(function () {
            gsap.to($('.arg-ball .arg-choose-text'), .2, {
                scale: '0',
                ease: 'sine',
            });
        });

        $('a:not(".arg-choose , .arg-more , .arg-drag , .arg-accent-cursor"), input , textarea, .arg-accordion-menu').mouseover(function () {
            gsap.to($(cursor), .2, {
                scale: 0,
                ease: 'sine',
            });
            gsap.to($('.arg-ball svg'), .2, {
                scale: 0,
            });
        });

        $('a:not(".arg-choose , .arg-more , .arg-drag , .arg-accent-cursor"), input, textarea, .arg-accordion-menu').mouseleave(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });

            gsap.to($('.arg-ball svg'), .2, {
                scale: 1,
            });
        });

        $('body').mousedown(function () {
            gsap.to($(cursor), .2, {
                scale: .1,
                ease: 'sine',
            });
        });
        $('body').mouseup(function () {
            gsap.to($(cursor), .2, {
                scale: 1,
                ease: 'sine',
            });
        });
        /***************************

        main menu

        ***************************/
        $('.arg-has-children a').on('click', function () {
            $('.arg-has-children ul').removeClass('arg-active');
            $('.arg-has-children a').removeClass('arg-active');
            $(this).toggleClass('arg-active');
            $(this).next().toggleClass('arg-active');
        });
        /***************************

        scroll animations

        ***************************/

        const appearance = document.querySelectorAll(".arg-up");

        appearance.forEach((section) => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 40,
                scale: .98,
                ease: 'sine',

            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: .4,
                scrollTrigger: {
                    trigger: section,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const scaleImage = document.querySelectorAll(".arg-scale");

        scaleImage.forEach((section) => {
            var value1 = $(section).data("value-1");
            var value2 = $(section).data("value-2");
            gsap.fromTo(section, {
                ease: 'sine',
                scale: value1,

            }, {
                scale: value2,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });

        const parallaxImage = document.querySelectorAll(".arg-parallax");


        if ($(window).width() > 960) {
            parallaxImage.forEach((section) => {
                var value1 = $(section).data("value-1");
                var value2 = $(section).data("value-2");
                gsap.fromTo(section, {
                    ease: 'sine',
                    y: value1,

                }, {
                    y: value2,
                    scrollTrigger: {
                        trigger: section,
                        scrub: true,
                        toggleActions: 'play none none reverse',
                    }
                });
            });
        }

        const rotate = document.querySelectorAll(".arg-rotate");

        rotate.forEach((section) => {
            var value = $(section).data("value");
            gsap.fromTo(section, {
                ease: 'sine',
                rotate: 0,

            }, {
                rotate: value,
                scrollTrigger: {
                    trigger: section,
                    scrub: true,
                    toggleActions: 'play none none reverse',
                }
            });
        });
        /***************************

        fancybox

        ***************************/
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
            "slideShow",
            "zoom",
            "fullScreen",
            "close"
          ],
            loop: false,
            protect: true
        });
        $.fancybox.defaults.hash = false;
        /***************************

        reviews slider

        ***************************/

        var menu = ['<div class="arg-custom-dot arg-slide-1"></div>', '<div class="arg-custom-dot arg-slide-2"></div>', '<div class="arg-custom-dot arg-slide-3"></div>', '<div class="arg-custom-dot arg-slide-4"></div>', '<div class="arg-custom-dot arg-slide-5"></div>', '<div class="arg-custom-dot arg-slide-6"></div>', '<div class="arg-custom-dot arg-slide-7"></div>']
        var mySwiper = new Swiper('.arg-reviews-slider', {
            // If we need pagination
            pagination: {
                el: '.arg-revi-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (menu[index]) + '</span>';
                },
            },
            speed: 800,
            effect: 'fade',
            parallax: true,
            navigation: {
                nextEl: '.arg-revi-next',
                prevEl: '.arg-revi-prev',
            },
        })

        /***************************

        infinite slider

        ***************************/
        var swiper = new Swiper('.arg-infinite-show', {
            slidesPerView: 2,
            spaceBetween: 30,
            speed: 5000,
            autoplay: true,
            autoplay: {
                delay: 0,
            },
            loop: true,
            freeMode: true,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
            },
        });

        /***************************

        portfolio slider

        ***************************/
        var swiper = new Swiper('.arg-portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            parallax: true,
            mousewheel: {
                enable: true
            },
            navigation: {
                nextEl: '.arg-portfolio-next',
                prevEl: '.arg-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        1 item slider

        ***************************/
        var swiper = new Swiper('.arg-1-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.arg-portfolio-next',
                prevEl: '.arg-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
        });
        /***************************

        2 item slider

        ***************************/
        var swiper = new Swiper('.arg-2-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 800,
            parallax: true,
            navigation: {
                nextEl: '.arg-portfolio-next',
                prevEl: '.arg-portfolio-prev',
            },
            pagination: {
                el: '.swiper-portfolio-pagination',
                type: 'fraction',
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });

    });

});
