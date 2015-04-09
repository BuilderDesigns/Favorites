(function(module) {
try { module = angular.module("Favorites.templates"); }
catch(err) { module = angular.module("Favorites.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/dashboard.html",
    "<!-- start of favorites-tab -->\n" +
    "<div class=\"favorites-tab\">\n" +
    "\n" +
    "    <!-- start of DashboardController -->\n" +
    "    <div ng-controller=\"DashboardController\">\n" +
    "\n" +
    "        <script type=\"text/ng-template\" id=\"FavoritesDashboardModal\">\n" +
    "\n" +
    "            <!-- start of modal-header -->\n" +
    "            <div class=\"modal-header\">\n" +
    "\n" +
    "                <h3 class=\"modal-title\">Favorites Dashboard</h3>\n" +
    "                <div class=\"pull-right modal-right-links\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div><!-- end of modal-header -->\n" +
    "\n" +
    "            <!-- start of modal-body -->\n" +
    "            <div class=\"modal-body\">\n" +
    "\n" +
    "\n" +
    "                <!-- start of row -->\n" +
    "                <div class=\"row\">\n" +
    "\n" +
    "                    <!-- start of faves-col01 -->\n" +
    "                    <div class=\"faves-col01\">\n" +
    "\n" +
    "                        <!-- start of favorites-view -->\n" +
    "                        <div class=\"favorites-view\">\n" +
    "\n" +
    "                            <!-- start of favorite-group -->\n" +
    "                            <div class=\"favorite-group\" ng-repeat=\"(key, value) in favorites | groupBy: 'type'\">\n" +
    "\n" +
    "                                <div class=\"fav-type-title\"><h3>{{key}}</h3></div>\n" +
    "\n" +
    "                                <div ng-repeat=\"fav in value track by $index\">\n" +
    "\n" +
    "                                    <fav-item></fav-item>\n" +
    "\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div><!-- end of favorite-group -->\n" +
    "\n" +
    "                        </div><!-- end of favorites-view -->\n" +
    "\n" +
    "                    </div><!-- end of faves-col01 -->\n" +
    "\n" +
    "                    <!-- start of faves-col02 -->\n" +
    "                    <div class=\"faves-col02\">\n" +
    "\n" +
    "                        <h3>Send Favorites</h3>\n" +
    "                        <form novalidate name=\"pform\" >\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <input class=\"form-control\" type=\"text\" ng-model=\"printuser.firstName\" placeholder=\"First Name\" required />\n" +
    "                            </div>\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <input class=\"form-control\" type=\"text\" ng-model=\"printuser.lastName\" placeholder=\"Last Name\" required />\n" +
    "                            </div>\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <input class=\"form-control\" name=\"email\" type=\"email\" ng-model=\"printuser.email\" placeholder=\"Email\" required  />\n" +
    "                            </div>\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <input class=\"form-control\" name=\"phone\" type=\"phone\" ng-model=\"printuser.phone\" placeholder=\"Phone\"  />\n" +
    "                            </div>\n" +
    "                            <div class=\"clearfix\"></div>\n" +
    "                            <button role=\"button\" class=\"btn\" type=\"submit\" ng-disabled=\"pform.$invalid\" ng-click=\"print(print)\">Email</button>\n" +
    "                        </form>\n" +
    "\n" +
    "                    </div><!-- end of faves-col02 -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "                </div><!-- end of row -->\n" +
    "\n" +
    "            </div><!-- end of modal-body -->\n" +
    "\n" +
    "            <!-- start of modal-footer -->\n" +
    "            <div class=\"modal-footer\">\n" +
    "\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "                <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>\n" +
    "\n" +
    "            </div><!-- end of modal-footer -->\n" +
    "\n" +
    "        </script>\n" +
    "\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-click=\"open()\" ng-if=\"favorites.length\">\n" +
    "\n" +
    "            My Favorites\n" +
    "\n" +
    "            <span class=\"badge\">{{favorites.length}}</span>\n" +
    "\n" +
    "        </button>\n" +
    "\n" +
    "\n" +
    "    </div><!-- end of DashboardController -->\n" +
    "\n" +
    "</div><!-- end of favorites-tab -->\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("Favorites.templates"); }
catch(err) { module = angular.module("Favorites.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/favoriteItem.html",
    "\n" +
    "<div class=\"fav_dashboard_item\">\n" +
    "\n" +
    "    <div class=\"fav-item-col1\">\n" +
    "\n" +
    "        <img ng-src=\"{{fav.thumbnail}}\"width=\"50\" />\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fav-item-col2\">\n" +
    "\n" +
    "        <h4>{{fav.title}}</h4>\n" +
    "\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"li in fav.lis\">{{li}}</li>\n" +
    "        </ul>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fav-item-col3\">\n" +
    "\n" +
    "        <a class=\"btn\" href=\"{{fav.url}}\">Visit Detail</a>\n" +
    "        <button class=\"btn\" ng-click=\"remove(fav)\">Remove</button>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);
})();
