(function () {

  angular
    .module('cats')
    .controller('CatController', [
      'catService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$mdDialog', '$mdMedia',
      CatController
    ]);
  // .controller('CommentFormCtrl', [
  //    'catService',
  //    CommentFormCtrl
  // ]);



  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function CatController(catService, $mdSidenav, $mdBottomSheet, $log, $q, $mdDialog, $mdMedia) {
    var self = this;

    self.selected = null;
    self.cats = [];
    self.selectCat = selectCat;
    self.toggleList = toggleCatsList;
    self.showContactOptions = showContactOptions;
    self.showAlert = showAlert;
    self.getCommentsHeaderString = getCommentsHeaderString;
    self.voteUp = voteUp;
    self.deleteCat = deleteCat;
    self.submitComment = submitComment;
    self.newComment = {
      username: 'John Doe',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/maz/128.jpg',
      text: 'I want to say...'
    };

    // Load all registered cats

    catService
      .loadAllCats()
      .then(function (cats) {
        console.log('got cats from service', cats);
        self.cats = [].concat(cats);
        self.selected = cats[0];
      });

    // *********************************
    // Internal methods
    // *********************************

    function submitComment(ev) {
      console.log('submitting new comment', self.newComment);
      self.selected.comments.push(self.newComment);
      // reset
      self.newComment = {
        username: 'John Doe',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/maz/128.jpg',
        text: 'I want to say...'
      };
      catService
        .saveVotes(self.selected)
        .then(function (savedCat) {
          console.log('Cat new comment saved to server', savedCat.comments);
        });

    }

    function voteUp(ev) {
      self.selected.vote++;
      console.log(self.selected.vote);
      catService
        .saveVotes(self.selected)
        .then(function (savedCat) {
          console.log('Cat vote saved to server', savedCat.vote);
        });
    }

    function deleteCat(ev) {
      console.log("trying to delete cat", self.selected);
      var index = self.cats.indexOf(self.selected);
      catService
        .deleteCat(self.selected)
        .then(function (msg) {
          console.log('Cat deleted from server', msg);
          // automatically move to the next cat in the view
          var nextIndex = _getNextCat(index);
          if (nextIndex !== null) {
            self.selectCat(self.cats[nextIndex]);
            self.cats.splice(index, 1);
            console.log('selecting next cat');
          }
        });
    }

    function _getNextCat(index) {
      if (self.cats === null) return null;
      if (index >= self.cats.length - 1 || index < 0) {
        return 0;
      }
      return index + 1;
    }

    function showAlert(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('About CatBook')
        .textContent('CatBook, formerly known as CatCraz, is an app built for crazy cat lovers.   CatBook helps you get out of boredom, greatlly reduce your stress level, and ultimately improve your mental and physical health.   ///// - Created with love by Audrey (Github: VidaAudrey)')
        .ariaLabel('About CatBook Dialog')
        .ok('Got it.')
        .targetEvent(ev)
      );
    }

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleCatsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function () {
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectCat(cat) {
      self.selected = angular.isNumber(cat) ? $scope.cats[cat] : cat;
      self.toggleList();
    }

    function getCommentsHeaderString(comments) {
      if (!comments) return '';
      if (comments.length === 0) return "No comments";
      if (comments.length === 1) return "One comment";
      return comments.length + " comments";
    }

    /**
     * Show the bottom sheet
     */
    function showContactOptions($event) {
      var cat = self.selected;

      return $mdBottomSheet.show({
        parent: angular.element(document.getElementById('content')),
        templateUrl: './src/cats/view/contactSheet.html',
        controller: ['$mdBottomSheet', ContactPanelController],
        controllerAs: "cp",
        bindToController: true,
        targetEvent: $event
      }).then(function (clickedItem) {
        clickedItem && $log.debug(clickedItem.name + ' clicked!');
      });

      /**
       * Bottom Sheet controller for the Avatar Actions
       */
      function ContactPanelController($mdBottomSheet) {
        this.cat = cat;
        this.actions = [{
          name: 'Phone',
          icon: 'phone',
          icon_url: 'assets/svg/phone.svg'
        }, {
          name: 'Twitter',
          icon: 'twitter',
          icon_url: 'assets/svg/twitter.svg'
        }, {
          name: 'Google+',
          icon: 'google_plus',
          icon_url: 'assets/svg/google_plus.svg'
        }, {
          name: 'Hangout',
          icon: 'hangouts',
          icon_url: 'assets/svg/hangouts.svg'
        }];
        this.submitContact = function (action) {
          $mdBottomSheet.hide(action);
        };
      }
    }

  }

})();
