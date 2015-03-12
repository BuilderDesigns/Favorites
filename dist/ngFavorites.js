angular.module('Favorites', ['ui.bootstrap'])

    .run(function($rootScope,MyFavorites) {

        $rootScope.favorites = MyFavorites.favorites;
        $rootScope.$watch('favorites', function(){
            MyFavorites.sync();
        }, true);

        $rootScope.favorite = function(id,type)
        {
            MyFavorites.toggle({id:id,type:type});
        }

        $rootScope.removeFavorite = function(id,type)
        {
            MyFavorites.remove({id:id,type:type});
        }

    });
angular.module('Favorites').controller('DashboardController',function($scope,$http,$modal){

    $scope.communities = [
        {
            name:'Com One'
        },
        {
            name: 'Com Two'
        },
        {
            name: 'Com Three'
        }
    ];


    $scope.open = function(){

        var dashboardModal = $modal.open({
            templateUrl: 'dashboardModal.html',
            controller: 'DashboardInstanceController',
            resolve: {
                communities: function () {
                    return $scope.communities;
                }
            }
        });

    }



});

angular.module('Favorites').controller('DashboardInstanceController',function($scope,$http,$modalInstance, communities){

    $scope.communities = communities;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}).directive('favoriteItem', function(){
    return {
        template: '<div class="favorite-card">'+
                    '<h4>{{com.name}}</h4>'+
                    '<p></p>'+
                   '</div>'
    };
});

angular.module('Favorites').controller('FavoritesController',function($scope,$http){



});
angular.module('Favorites').service('MyFavorites',function($http){

    this.favorites = [];

    if(window.localStorage.getItem('favorites') === null)
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    } else {
        this.favorites = JSON.parse(window.localStorage.getItem('favorites'));
    }

    this.toggle = function(fav)
    {
        for(var i = 0;i < this.favorites.length; i++)
        {
            if(fav.id == this.favorites[i].id)
            {
                this.remove(fav);
                return fav;
            }
        }
        this.add(fav);
    }

    this.add = function(fav){
        for(var i = 0;i < this.favorites.length; i++)
        {
            if(fav.id == this.favorites[i].id)
                return this.favorites[i];
        }
        this.favorites.push(fav);
        return fav;
    }

    this.remove = function(fav)
    {
        for(var i = 0;i < this.favorites.length; i++)
        {
            if(fav.id == this.favorites[i].id)
                this.favorites.splice(i,1);
        }
    }


    this.sync = function()
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


});