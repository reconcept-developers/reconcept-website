import $ from "jquery";
import ContactForm from "./contact-form";
import Cookies from "./cookies";
import Expandable from "./expandable";
import Navigation from "./navigation";
import SubNavigation from "./sub-navigation";

$(document).ready(function () {
  new Navigation();
  new Cookies();
  new Expandable();
  new SubNavigation();
  new ContactForm();
});
