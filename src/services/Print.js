angular.module('Favorites')
    .service('Print',[
        'FavConfig','$rootScope','MyFavorites', '$http',
        function(FavConfig,$rootScope,MyFavorites,$http){

        this.print = function(){


            $rootScope.$emit(FavConfig.EVENTS.EMAIL_CLICKED,MyFavorites.favorites);



        }

}]);