document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger"),
    menu = document.querySelector(".menu"),
    closeElem = document.querySelector(".menu__close");
  hamburger.addEventListener("click", () => {
    menu.classList.add("active");
  });
  closeElem.addEventListener("click", () => {
    menu.classList.remove("active");
  });
  const counters = document.querySelectorAll(".progress__item-text"),
    lines = document.querySelectorAll(".progress__item-indicator");

  counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
  });
});
$(document).ready(function () {
  //validation

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 3,
        },

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

        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }
  validateForms("#name");
  validateForms("#email");

  $("contacts__form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");

      $("form").trigger("reset");
    });
    return false;
  });
});
