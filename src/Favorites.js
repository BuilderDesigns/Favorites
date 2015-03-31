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