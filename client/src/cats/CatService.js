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
      },
      {
        name: 'Gener Delosreyes',
        url: 'http://25.media.tumblr.com/tumblr_kox053z0jL1qzvqipo1_400.gif', 
        avatar: 'svg-3',
        content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
      },
      {
        name: 'Lawrence Ray',
        url: 'http://25.media.tumblr.com/tumblr_lkxhd01k9f1qiq7lto1_500.gif', 
        avatar: 'svg-4',
        content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
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
