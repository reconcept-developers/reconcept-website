import $ from "jquery";
class SubNavigation {
  constructor() {
    this.$subnavigationEl = $("[js-subnav]");
    this.$subnavigationToggle = $("[js-subnav-toggle]");
    this.bindEvents();
  }

  bindEvents() {

    /**
     * Subnavigation toggle click
     **/
    // this.$subnavigationToggle.mouseenter((e) => {
    //   this.toggleSubnavigation(e, true);
    // });

    this.$subnavigationToggle.on("click", (e) => {
      e.preventDefault();
      var isToggled = this.isExpanded(this.getSubnav($(e.currentTarget)))
      this.toggleSubnavigation(e, !isToggled);
    });

    // this.$subnavigationEl.mouseleave((e) => {
    //   this.toggleSubnavigation(e, false);
    // });

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

    this.hideAllSubnav();
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

export default SubNavigation;
