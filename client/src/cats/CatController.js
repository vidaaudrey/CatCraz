(function(){

  angular
       .module('cats')
       .controller('CatController', [
          'catService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          CatController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function CatController( catService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected     = null;
    self.cats        = [ ];
    self.selectCat   = selectCat;
    self.toggleList   = toggleCatsList;
    self.showContactOptions  = showContactOptions;

    // Load all registered cats

    catService
          .loadAllCats()
          .then( function( cats ) {
            self.cats    = [].concat(cats);
            self.selected = cats[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleCatsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectCat ( cat ) {
      self.selected = angular.isNumber(cat) ? $scope.cats[cat] : cat;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    function showContactOptions($event) {
        var cat = self.selected;

        return $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: './src/cats/view/contactSheet.html',
          controller: [ '$mdBottomSheet', ContactPanelController],
          controllerAs: "cp",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function ContactPanelController( $mdBottomSheet ) {
          this.cat = cat;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.submitContact = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
