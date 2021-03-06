(function(){
  'use strict';

  angular.module('cats')
         .service('catService', ['$q', '$http', CatService]);


  function CatService($q, $http){
    // var cats = [
    //   {
    //     name: 'Lia Lugo',
    //     url: 'http://29.media.tumblr.com/tumblr_ly4pyyiH8U1qh66wqo1_1280.jpg', 
    //     avatar: 'svg-1',
    //     content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
    //   },
    //   {
    //     name: 'George Duke',
    //     url: 'http://24.media.tumblr.com/Jjkybd3nSc0hubrh9sB4zSFU_500.jpg', 
    //     avatar: 'svg-2',
    //     content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
    //   }
    // ];

    // Promise-based API
    // return {
    //   loadAllCats : function() {
    //     // Simulate async nature of real remote calls
    //     return $q.when(cats);
    //   }
    // };
    
    var deferred = $q.defer(); 
    this.loadAllCats = function(){
      return $http.get('/cats/')
        .then(function(response){
          deferred.resolve(response.data);
          return deferred.promise;
        }, function(err){
          deferred.reject(err);
          return deferred.promise;
        });
    };
    this.saveVotes = function(cat){
      console.log('trying to save cat  using service');
      return $http.put('/cats/'+cat._id, cat)
        .then(function(response){
          deferred.resolve(response.data);
          console.log('saved cat in server, got data back', response.data);
          return deferred.promise;
        }, function(err){
          deferred.reject(err);
          console.log('error saving cat in server', err);
          return deferred.promise;
        });
    };

    this.deleteCat = function(cat){
      console.log('trying to save vote in using service');
      return $http.delete('/cats/'+cat._id, cat)
        .then(function(response){
          deferred.resolve(response.data);
          console.log('deleting cat from server successfull', response.data);
          return deferred.promise;
        }, function(err){
          deferred.reject(err);
          console.log('error deleting cat in server', err);
          return deferred.promise;
        });
    };
  }


})();

// app.service("githubService", function ($http, $q) {
 
//     var deferred = $q.defer();
 
//     this.getAccount = function () {
//         return $http.get('https://api.github.com/users/haroldrv')
//             .then(function (response) {
//                 // promise is fulfilled
//                 deferred.resolve(response.data);
//                 // promise is returned
//                 return deferred.promise;
//             }, function (response) {
//                 // the following line rejects the promise 
//                 deferred.reject(response);
//                 // promise is returned
//                 return deferred.promise;
//             })
//         ;
//     };
// });