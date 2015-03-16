angular.module('Favorites').service('MyFavorites',['Fav', function($http, Fav){

    this.favorites = [];

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

        console.log(fav);

        this.favorites.push(fav);

        console.log(this.favorites);

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

    this.loadFavorites = function(callback)
    {
        var favs = this.favorites,
            that = this;




        if(callback)
        {
            callback();
        }

    };


    this.sync = function()
    {
        window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }


}]);