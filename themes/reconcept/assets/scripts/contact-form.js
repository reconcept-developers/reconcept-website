import $ from "jquery";

class ContactForm {
  constructor() {
    this.$form = $("[js-contact-form]");
    this.$submit = this.$form.find("[js-contact-form-submit]");

    if (this.$submit.length > 0 && this.$form.length > 0) {
      this.bindEvents();
    }
  }

  bindEvents() {
    this.$form.on("submit", (e) => {
      e.preventDefault();
      this.submitContactForm();
    });
  }

  // Contact form
  submitContactForm() {
    // ads analytics
    // gtag("event", "conversion", {
    //   send_to: "AW-593897330/9XqPCMyNrt0BEPLOmJsC",
    // });

    let serialized = this.$form.serialize();

    $.post("/scripts/contact_form.php", serialized, function () {
      document
        .querySelector("[js-contact-form]")
        .classList.add("submitted");
      document
        .querySelector("[js-contact-form-submit]")
        .setAttribute("disabled", "disabled");
    });

    return false;
  }

}

export default ContactForm;
