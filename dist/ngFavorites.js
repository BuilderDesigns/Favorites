angular.module('Favorites', ['ui.bootstrap', 'Favorites.templates','angular.filter'])
    .constant('FavConfig',{
        EVENTS:{
            FAV_ADDED:          "favoriteAdded",
            FAV_REMOVED:        "favoriteRemoved",
            DASHBOARD_OPENED:   "dashboardOpened",
            DASHBOARD_CANCELED: "dashboardCanceled",
            DASHBOARD_OK:       "dashboardOk",
            SAVE_EVENT:         "favoritesSaved"
        },
        CSS_CLASSES:{
            DISABLED_FAV_LINK: "fav_disabled"
        },
        TEMPLATES: {
            FAV_ITEM: 'templates/favoriteItem.html',
            DASHBOARD: 'templates/dashboard.html',
            PRINT_HEADER: 'templates/printHeader.html'
        },
        SAVING_ENABLED: true,
        SAVE_FILENAME: "MyFavorites"
    })
    .run(function($rootScope, MyFavorites, FavConfig, Fav) {

        $rootScope.favorites = MyFavorites.favorites;

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

        $rootScope.setupLinks();

        $rootScope.$watch('favorites', function(){

            MyFavorites.sync();

            $rootScope.updateLinks();

        }, true);

        $('.fav-link').each(function(){

            $(this).on('click',function(){

                var fav = Fav.fromFavLink(this);

                MyFavorites.toggle(fav);

                $rootScope.$digest();
            });
        });

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
    } // end .run

);
angular.module('Favorites').controller('DashboardController',function($scope,$http,$modal, MyFavorites){

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
    function($scope, $http, $modalInstance, MyFavorites, FavConfig,$templateCache){

    $scope.favorites = MyFavorites.favorites;

    $scope.ok = function () {

        $modalInstance.close();
    };

    $scope.cancel = function () {

        $modalInstance.dismiss('cancel');
    };

    $scope.print = function(){

        compilePdf('dataurlnewwindow');


    };


    $scope.save = function(){

        compilePdf('save');

    };


    function compilePdf(outputOption)
    {
        var favView = $($('.favorites-view')[0]).html();
        var html = $templateCache.get(FavConfig.TEMPLATES.PRINT_HEADER)+favView;

        html2canvas($(html) , { onrendered : function( canvas ) {
            var pdf = new jsPDF(), border = 10, width = 210-border*2;
            pdf.addImage(
                canvas.toDataURL( 'image/jpeg' , 0.98 ),
                'JPEG',
                border,
                border,
                width,
                canvas.height*width/canvas.width
            );


            pdf.output(outputOption,FavConfig.SAVE_FILENAME);

        } } );



        /*
        var pdf = new jsPDF('p', 'pt', 'letter'),
            source = $templateCache.get(FavConfig.TEMPLATES.PRINT_HEADER)
                +$(angular.element('.favorites-view')[0]).html(),
            specialElementHandlers = {
                '#no-print': function(element, renderer){
                    return true
                }
            },

            margins = {
                top: 20,
                bottom: 60,
                left: 40,
                width: 522
            };

        pdf.fromHTML(
            source,
            margins.left,
            margins.top,
            {
                'width': margins.width,
                'elementHandlers': specialElementHandlers
            },
            function (dispose) {

                pdf.output(outputOption,FavConfig.SAVE_FILENAME);
            },
            margins
        )*/
    }



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


    this.sync = function()
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


}]);