import { gql } from "graphql-tag";
import $ from "jquery";
import ReconceptApolloClient from "./apollo";

const SendMailMutation = gql `
  mutation sendMailToReconcept($input: SendMailToReconceptInput!) {
    sendMailToReconcept(input: $input) {
      emailAddresses
      errors {
        message
        path
      }
    }
  }
`;

class ContactForm {
  constructor() {
    this.$form = $("[js-contact-form]");
    this.$submit = this.$form.find("[js-contact-form-submit]");
    this.apolloClient = new ReconceptApolloClient();

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
    let formData = this.getFormData(whichContactForm);
    formData.pageUrl = location.href;

    this.sendMail(formData)
    .then(r => {
      whichContactForm.classList.add("submitted");
      whichContactForm
        .querySelector("[js-contact-form-submit]")
        .setAttribute("disabled", "disabled");
    }, e => {
      console.error(e)
      whichContactForm.classList.add("submitted-error");
    })

    // ads analytics
    // gtag_report_conversion();

    return false;
  }

  getFormData(whichForm) {
    return $(whichForm).serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
  }

  sendMail(formData){
    return this.apolloClient.mutate(SendMailMutation, {
      subject: formData.subject,
      body: this.getBody(formData),
      emailAddresses: this.getEmailAddresses(formData)
    })
    .then(r => {
      if(r?.data?.sendMailToReconcept?.errors?.length){
        throw "Error"
      }
      
      return r;
      
    })
  }

  getEmailAddresses(formData) {
    return formData.to_email.split(',').map(e => e.trim());
  }

  getBody(formData) {
    return `
      Naam: ${formData.name} \n
      E-mail: ${formData.email} \n
      Telefoon: ${formData.telephone} \n
      Pagina op site: ${formData.pageUrl} \n
      \n
      Overige opmerkingen: ${formData.description} \n
      
      Keuze: ${formData.selection} \n
      Stemt in met privacybeleid: ${formData.agree} \n
    `
  }

}

export default ContactForm;
