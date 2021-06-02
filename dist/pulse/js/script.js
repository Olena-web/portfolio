$(document).ready(function () {
  //$('.carousel__inner').slick({
  //speed: 1200,
  //adaptiveHeight: true,
  //autoplay: true,
  //autoplaySpeed: 2000,
  //fade: true,
  //cssEase: 'linear'
  //prevArrow:'<type="button" class="slick-prev"><img src="icons/chevron_left.jpg"></button>',
  //nextArrow:'<type="button" class="slick-next"><img src="icons/chevron_right.jpg"></button>',
  //responsive:[
  // {
  //breakpoint: 992,
  // settings: {
  // dots: true,
  //arrows: false,
  // }
  // }
  // ],
  //});
  //})];
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content_active")
        .eq($(this).index())
        .addClass("catalog__content_active");
    }
  );

  /* $('.catalog-item__link').each(function (i) {
      $(this).on('click', function (e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
  })
  $('.catalog-item__back').each(function (i) {
    $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
}) */

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item__content")
          .eq(i)
          .toggleClass("catalog-item__content_active");
        $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
      });
    });
  }
  toggleSlide(".catalog-item__link");
  toggleSlide(".catalog-item__back");

  //modal windows
  $("[data-modal = consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay,#consultation, #thanks, #order").fadeOut("slow");
  });

  //$('.button_mini').on('click',function(){
  //   $('.overlay, #order').fadeIn('slow');
  //});

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__description").text(
        $(".catalog-item__subtitle").eq(i).text()
      );
      $(".overlay, #order").fadeIn("slow");
    });
  });

  //validation

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format(
            "Как минимум {0} буквы требуется!"
          ),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }
  validateForms("#consultation-form");
  validateForms("#order form");
  validateForms("#consultation form");

  //mask for phone
  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $("#thanks").fadeIn();
      $("form").trigger("reset");
    });
    return false;
  });

  //smooth scroll and pageup

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();
});

const modal = document.querySelector(".overlay,#consultation, #thanks, #order");

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});
