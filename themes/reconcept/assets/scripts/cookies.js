import $ from "jquery";

class Cookies {
  constructor() {
    this.$bar = $("[js-cookie-bar]");
    this.$button = this.$bar.find("[js-cookie-dismiss]");

    if (this.$button.length > 0) {
      this.tryHideCookieBar();
      this.bindEvents();
    }
  }

  bindEvents() {
    this.$button.on("click", (e) => {
      e.preventDefault();
      this.dismissCookieBar();
    });
  }

  dismissCookieBar() {
    window.localStorage.setItem('cookie-dismissed', true)
    this.hideCookieBar();
  }

  // hide if dismissed earlier
  tryHideCookieBar() {
    var wasHidden = window.localStorage.getItem('cookie-dismissed');

    if(wasHidden){
      this.hideCookieBar();
    }
  }

  hideCookieBar(){
    this.$bar.addClass('dismissed')
  }

}

export default Cookies;
