angular.module('Favorites', ['ui.bootstrap'])
    .constant('FavConfig',{
        EVENTS:{
            FAV_ADDED:          "favoriteAdded",
            FAV_REMOVE:         "favoriteRemoved",
            DASHBOARD_OPENED:   "dashboardOpened",
            DASHBOARD_CANCELED: "dashboardCanceled",
            DASHBOARD_OK:       "dashboardOk"
        },
        TEMPLATES:{
            "FAVORITE_ITEM":    '<div class="fav_dashboard_item"><h4>{{fav.title}}</h4>'
                                    +'<img ng-src="{{fav.thumbnail}}"width="50" /><br/>'
                                    +'<ul>'
                                        +'<li ng-repeat="li in fav.lis">{{li}}</li>'
                                    +'</ul>'
                                    +'<button class="btn" ng-click="remove(fav)">Remove</button>'
                                +'</div>'
        },
        CSS_CLASSES:{
            DISABLED_FAV_LINK: "disabled"
        }
    })
    .run(function($rootScope, MyFavorites, FavConfig, Fav) {

        $rootScope.favorites = MyFavorites.favorites;

        $rootScope.setupLinks = function(){

            $('.fav-item').each(function(){

                var fav = Fav.fromHTMLElement(this);

                $(this).data('fav',fav);
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