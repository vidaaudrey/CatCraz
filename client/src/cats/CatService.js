(function(){
  'use strict';

  angular.module('cats')
         .service('catService', ['$q', CatService]);


  function CatService($q){
    var cats = [
      {
        name: 'Lia Lugo',
        url: 'http://29.media.tumblr.com/tumblr_ly4pyyiH8U1qh66wqo1_1280.jpg', 
        avatar: 'svg-1',
        content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
      },
      {
        name: 'George Duke',
        url: 'http://24.media.tumblr.com/Jjkybd3nSc0hubrh9sB4zSFU_500.jpg', 
        avatar: 'svg-2',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
      }
    ];

    // Promise-based API
    return {
      loadAllCats : function() {
        // Simulate async nature of real remote calls
        return $q.when(cats);
      }
    };
  }

})();
