angular.module('Favorites', ['ui.bootstrap', 'Favorites.templates','angular.filter'])
    .constant('FavConfig',{
        EVENTS:{
            FAV_ADDED:          "favoriteAdded",
            FAV_REMOVED:        "favoriteRemoved",
            FAV_CHANGED:        "favoritesChanged",
            DASHBOARD_OPENED:   "dashboardOpened",
            DASHBOARD_CANCELED: "dashboardCanceled",
            DASHBOARD_OK:       "dashboardOk",
            SAVE_EVENT:         "favoritesSaved",
            EMAIL_CLICKED:      "favoritresPrint"
        },
        CSS_CLASSES:{
            DISABLED_FAV_LINK: "fav_disabled"
        },
        TEMPLATES: {
            FAV_ITEM: 'templates/favoriteItem.html',
            DASHBOARD: 'templates/dashboard.html',
            PRINT_HEADER: 'templates/printHeader.html'
        }

    })
    .run(function($rootScope, MyFavorites, FavConfig, Fav, Print) {

        $rootScope.favorites = MyFavorites.favorites;

        $rootScope.Print = Print;

        $rootScope.setupLinks = function(){

            $('.fav-item').each(function(){


                if($(this).data('fav'))
                {

                } else {

                    var fav = Fav.fromHTMLElement(this);

                    $(this).data('fav',fav);
                }

            });
        };
        $rootScope.addClickEvents = function(){
            $('.fav-link').each(function(){

                $(this).on('click',function(){

                    var fav = Fav.fromFavLink(this);

                    MyFavorites.toggle(fav);

                    $rootScope.$digest();
                });
            });
        };

        $rootScope.setupLinks();
        $rootScope.addClickEvents();

        $rootScope.$watch('favorites', function(){

            MyFavorites.sync();
            $rootScope.$emit(FavConfig.EVENTS.FAV_CHANGED,$rootScope.favorites);
            $rootScope.updateLinks();

        }, true);






        $rootScope.updateLinks = function(){

            $('.fav-link').each(function(){

                var fav = Fav.fromFavLink(this);

                if(MyFavorites.isFavored(fav)) {

                    $(this).addClass(FavConfig.CSS_CLASSES.DISABLED_FAV_LINK);

                } else {

                    $(this).removeClass(FavConfig.CSS_CLASSES.DISABLED_FAV_LINK);
                }
            });
        };

        $rootScope.injectFavorites = function(favs){
            MyFavorites.favorites = favs;
            MyFavorites.sync();
            $rootScope.updateLinks();

        };

    } // end .run

);
angular.module('Favorites').controller('DashboardController',function($scope, $http, $modal, MyFavorites){

    $scope.favorites = MyFavorites.favorites;

    $scope.open = function(){

        var dashboardModal = $modal.open({

            templateUrl: 'FavoritesDashboardModal',

            controller: 'DashboardInstanceController'

        });
    }




});

angular.module('Favorites').controller(
    'DashboardInstanceController',
    function($scope, $http, $modalInstance, MyFavorites, FavConfig,$templateCache,Print){

    $scope.favorites = MyFavorites.favorites;

    $scope.printuser = Print.printuser;

    $scope.ok = function () {

        $modalInstance.close();
    };

    $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
    };

    $scope.print = function(){

        Print.print();
    };


}).directive('favItem', ['MyFavorites','FavConfig',function(MyFavorites,FavConfig){

    return {
        templateUrl: 'templates/favoriteItem.html',

        link: function(scope, elem, attrs){

            scope.remove = function(fav)
            {
                MyFavorites.toggle(fav);
            }
        }

    };
}]);
angular.module('Favorites').controller('FavoritesController',function($scope,$http){



});
'use strict';
angular.module('Favorites').factory('Fav', function() {

    function Fav(id,type,title,lis,thumbnail,url){
        this.id = id;
        this.type = type;
        this.title = title;
        this.lis = lis;
        this.thumbnail = thumbnail;
        this.url = url;
    }


    Fav.fromHTMLElement = function(element){
        var id = $(element).data('favid'),
            type = $(element).data('favtype'),
            lis = [];

        $(element).find('.fav-li').each(function() { lis.push($(this).text()) });

        return new Fav(
            id,
            type,
            $(element).find('.fav-title').first().text(),
            lis,
            $(element).find('.fav-image').first().attr('src'),
            $(element).find('.fav-url').first().attr('href')
        );

    };

    Fav.fromFavLink = function(element){


        if($(element).data('favid') && $(element).data('favtype'))
        {
            var id = $(element).data('favid'),

                type = $(element).data('favtype'),

                favItem = $('.fav-item[data-favid="'+id+'"][data-favtype="'+type+'"]');

            return $(favItem).data('fav');

        }

        var favItem = $(element).parents('.fav-item').first();

        if($(favItem).data('favjson'))
        {
            return Fav.fromJson($(favItem).data('favjson'));
        }

        return $(favItem).data('fav');

    };

    Fav.fromJson = function(json)
    {

        return new Fav(
            json.id,
            json.type,
            json.title,
            json.lis,
            json.thumbnail,
            json.url
        );

    };


    return Fav;
});

angular.module('Favorites').service('MyFavorites',['FavConfig','$rootScope',function(FavConfig,$rootScope){

    this.favorites = [];

    if(window.localStorage.getItem('favorites') === null)
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    } else {
        this.favorites = JSON.parse(window.localStorage.getItem('favorites'));
    }


    this.toggle = function(fav)
    {
        if(this.isFavored(fav)) {

            this.remove(fav);

            return false;
        }

        this.add(fav);

        return true;
    };

    this.add = function(fav){

        if(this.isFavored(fav)) {

            return true;
        }

        this.favorites.push(fav);

        $rootScope.$emit(FavConfig.EVENTS.FAV_ADDED,fav);

        return true;
    };

    this.remove = function(fav)
    {

        for(var i = 0;i < this.favorites.length; i++) {

            if (fav.id == this.favorites[i].id && fav.type == this.favorites[i].type) {

                this.favorites.splice(i, 1);
                $rootScope.$emit(FavConfig.EVENTS.FAV_REMOVED,fav);
            }
        }

        return false;
    };


    this.isFavored = function(fav)
    {
        for(var i = 0;i < this.favorites.length; i++){

            if (fav.id == this.favorites[i].id && fav.type == this.favorites[i].type){

                return true;
            }
        }

        return false;
    };

    this.wipe = function(){
        this.favorites = [];
        window.localStorage.removeItem('favorites');
    };

    this.sync = function()
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


}]);
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