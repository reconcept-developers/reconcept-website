import $ from "jquery";
class Navigation {
  constructor() {
    this.$navHeader = $("[js-nav-header]");
    this.$navMainToggle = $("[js-nav-main-toggle]");
    this.bindEvents();
  }

  bindEvents() {

    /**
     * navigation toggle click
     **/

    this.$navMainToggle.on("click", (e) => {
      this.toggleNavigation(e);
    });

    // any document click hides all subnavs
    $(document).on("click", (e) => {
      this.hideNavigation()
    });
  }

  /**
   * Subnavigation toggle
   **/
  toggleNavigation(e) {
    e.preventDefault();
    e.stopPropagation();

    this.$navHeader.toggleClass("expanded");
  }

  hideNavigation() {
    this.$navHeader.toggleClass("expanded", false);
  }
}

export default Navigation;
