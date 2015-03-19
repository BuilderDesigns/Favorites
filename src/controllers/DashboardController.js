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
        )
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