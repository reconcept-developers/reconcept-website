import $ from "jquery";
class Navigation {
  constructor() {
    // this.$navigationEl = $('.c-navigation');

    // this.$navigationToggle = $('[js-navigation-toggle]');
    this.$subnavigationEl = $("[js-subnav]");
    this.$subnavigationToggle = $("[js-subnav-toggle]");
    this.bindEvents();
  }

  bindEvents() {
    /**
     * Navigation toggle event
     **/
    // this.$navigationToggle.on('click', (e) => {
    //     e.preventDefault();

    //     //Toggle navigation
    //     this.$navigationEl.toggleClass('navigation--is-visible');

    //     //Toggle navigation toggle
    //     this.$navigationToggle.toggleClass('header__navigation-toggle--is-toggled');
    //     this.$navigationToggle.find('.fa').toggleClass('fa-times');
    //     this.$navigationToggle.find('.fa').toggleClass('fa-bars');
    // });

    /**
     * Subnavigation toggle click
     **/
    this.$subnavigationToggle.mouseenter((e) => {
      this.toggleSubnavigation(e, true);
    });

    this.$subnavigationToggle.on("click", (e) => {
      e.preventDefault();
      var isToggled = this.isExpanded(this.getSubnav($(e.currentTarget)))
      this.toggleSubnavigation(e, !isToggled);
    });

    this.$subnavigationEl.mouseleave((e) => {
      this.toggleSubnavigation(e, false);
    });

    // any document click hides all subnavs
    $(document).on("click", (e) => {
      this.hideAllSubnav()
    });
  }

  /**
   * Subnavigation toggle
   **/
  toggleSubnavigation(e, show) {
    e.preventDefault();
    e.stopPropagation();

    var $target = $(e.currentTarget);
    var $subNav = this.getSubnav($target);
    $subNav.toggleClass("expanded", show);
  }

  hideAllSubnav() {
    this.$subnavigationEl.toggleClass("expanded", false);
  }

  isExpanded($subNav){
    return $subNav.hasClass("expanded");
  }

  getSubnav($toggleOrSubnav){
    return $toggleOrSubnav.is("[js-subnav]")
      ? $toggleOrSubnav
      : $toggleOrSubnav.parents("[js-subnav]")
  }
}

export default Navigation;
