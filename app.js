angular.module('WebApp',['Favorites']).run(function($rootScope,$http){

    //$rootScope.injectFavorites(JSON.parse('[{"id":7,"type":"Communities","title":"Riss Lake","lis":["Location: Parkville, MO","Price Range: 300,000 - 1,200,000","SQ FT Range: 3,000 - 7,000"]},{"id":1,"type":"Communities","title":"Copperleaf","lis":["Location: Kansas City, MO","Price Range: $300,000 - $700,000","SQ FT Range: 2,500 - 5,000"]},{"id":3,"type":"Communities","title":"Autumn Ridge","lis":["Location: Kansas City, MO","Price Range: $180,000 - $300,000","SQ FT Range: 1,800 - 3,600"]},{"id":2,"type":"Communities","title":"Benson Place","lis":["Location: Kansas City, MO","Price Range: $175,000 - $400,000","SQ FT Range: 1,800 - 3,900"]}]'));

    $rootScope.$on('favoritresPrint',function(event, data){
        return $http({
            method: 'POST',
            url: "http://104.236.107.163/API/printFavorites.php",
            data: $.param({
                favs: data,
                action: 'print'
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
            console.log(data);
            return data;
        });
    })

});