angular.module('Favorites').service('MyFavorites',function($http){

    this.favorites = [],
    this.communities = [],
    this.models = [],
    this.inventory = [],
    this.communityModels = [];

    if(window.localStorage.getItem('favorites') === null)
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    } else {
        this.favorites = JSON.parse(window.localStorage.getItem('favorites'));
    }


    this.toggle = function(fav)
    {
        if(this.isFavored(fav))
        {
            this.remove(fav);
            return false;
        }

        this.add(fav);
        return true;
    };

    this.add = function(fav){

        if(this.isFavored(fav))
                return true;
        console.log(this.favorites);
        this.favorites.push(fav);

        return true;
    };

    this.remove = function(fav)
    {
        for(var i = 0;i < this.favorites.length; i++) {
            if (fav.id == this.favorites[i].id && fav.type == this.favorites[i].type) {
                this.favorites.splice(i, 1);
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

    this.loadFavorites = function()
    {

        return $http.get('http://104.236.107.163/API/loadFavorites.php?fav='+JSON.stringify(this.favorites));
    };

    this.sync = function()
    {
        this.loadFavorites();
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


});