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
      this.submitContactForm(e);
    });

    this.$form.on("change", (e) => {
      console.log('change')
      this.onFormChange(e);
    });
  }

  // Contact form
  onFormChange(e) {
    let whichContactForm = e.target.form;
    whichContactForm.classList.add("show-additional-fields");
  }

  submitContactForm(e) {

    let whichContactForm = e.target;
    let serialized = `${$(whichContactForm).serialize()}&page_url=${encodeURIComponent(location.href)}`;

    $.post("/scripts/contact_form.php", serialized, function () {
      whichContactForm.classList.add("submitted");
      whichContactForm
        .querySelector("[js-contact-form-submit]")
        .setAttribute("disabled", "disabled");
    });

    // ads analytics
    gtag_report_conversion();

    return false;
  }

}

export default ContactForm;
