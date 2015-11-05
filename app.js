var app = angular.module('weatherApp', []);

app.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
  function fetchWeather(selected_city) {
    weatherService.getWeather(selected_city).then(function(data){
      $scope.place = data;
    }); 
  }
  

  
  $scope.findWeather = function(selected_city) {
    $scope.place = '';
    fetchWeather(selected_city);
  };
}]);

app.factory('weatherService', ['$http', '$q', function ($http, $q){
  function getWeather (selected_city) {
    var deferred = $q.defer();
    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+ selected_city +'%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
	
      .success(function(data){
        deferred.resolve(data.query.results.channel);
      })
      .error(function(err){
        console.log('Error retrieving Weather');
        deferred.reject(err);
      });
    return deferred.promise;
  }
  
  return {
    getWeather: getWeather
  };
}]);