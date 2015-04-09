angular.module('Favorites')
    .service('Print',[
        'FavConfig','$rootScope','MyFavorites', '$http',
        function(FavConfig,$rootScope,MyFavorites,$http){

        this.printuser = {};

        this.setPrintUser = function(user)
        {
            this.printuser = user;
        };

        this.print = function(){

            $rootScope.$emit(FavConfig.EVENTS.EMAIL_CLICKED,{
                favs: MyFavorites.favorites,
                user: this.printuser
            });
        }

}]);