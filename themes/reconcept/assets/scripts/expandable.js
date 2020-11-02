import $ from "jquery";

class Expandable {
  constructor() {
    this.$expandables = $("[js-expandable]");
    console.log(this.$expandables)
    this.$expandables.each((t, elm) => {
      this.bindEvents(elm)
    })
  }

  bindEvents(expandable) {
    var $expandable = $(expandable);
    this.$button = $expandable.find("[js-expandable-button]");

    this.$button.on("click", (e) => {
      e.preventDefault();
      console.log('click');
      $expandable.toggleClass('expanded')
    });
  }

}

export default Expandable;
