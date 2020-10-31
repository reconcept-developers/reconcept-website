import $ from "jquery";
import ContactForm from "./contact-form";
import Cookies from "./cookies";
import Navigation from "./navigation";
import SubNavigation from "./sub-navigation";

$(document).ready(function () {
  new Navigation();
  new Cookies();
  new SubNavigation();
  new ContactForm();
});
