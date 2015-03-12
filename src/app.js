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