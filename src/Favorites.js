angular.module('Favorites', ['ui.bootstrap', 'Favorites.templates','angular.filter'])
    .constant('FavConfig',{
        EVENTS:{
            FAV_ADDED:          "favoriteAdded",
            FAV_REMOVE:         "favoriteRemoved",
            DASHBOARD_OPENED:   "dashboardOpened",
            DASHBOARD_CANCELED: "dashboardCanceled",
            DASHBOARD_OK:       "dashboardOk",
            SAVE_EVENT:         "favoritesSaved"
        },
        TEMPLATES:{
            "FAVORITE_ITEM":''
        },
        CSS_CLASSES:{
            DISABLED_FAV_LINK: "fav_disabled"
        },
        OPTIONS:{
            SAVING_ENABLED: true
        }

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