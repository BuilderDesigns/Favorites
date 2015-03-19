(function(module) {
try { module = angular.module("Favorites.templates"); }
catch(err) { module = angular.module("Favorites.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/dashboard.html",
    "<div class=\"favorites-tab\">\n" +
    "\n" +
    "    <div ng-controller=\"DashboardController\">\n" +
    "\n" +
    "        <script type=\"text/ng-template\" id=\"FavoritesDashboardModal\">\n" +
    "\n" +
    "            <div class=\"modal-header\">\n" +
    "\n" +
    "                <h3 class=\"modal-title\">Favorites Dashboard</h3>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <span class=\"glyphicon glyphicon-print\" ng-click=\"print()\"></span>\n" +
    "                    <span class=\"glyphicon glyphicon-floppy-disk\" ng-click=\"save()\"></span>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-body\">\n" +
    "\n" +
    "                <div class=\"favorites-view\">\n" +
    "\n" +
    "                    <div class=\"favorite-group\" ng-repeat=\"(key, value) in favorites | groupBy: 'type'\">\n" +
    "\n" +
    "                        <div class=\"fav-type-title\"><h4>{{key}}</h4></div>\n" +
    "\n" +
    "                        <div ng-repeat=\"fav in value track by $index\">\n" +
    "\n" +
    "                            <fav-item></fav-item>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"modal-footer\">\n" +
    "\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>\n" +
    "\n" +
    "                <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </script>\n" +
    "\n" +
    "        <button class=\"btn btn-default\" ng-click=\"open()\" ng-if=\"favorites.length\">\n" +
    "\n" +
    "            My Favorites\n" +
    "\n" +
    "            <badge class=\"fav-count-badge\">{{favorites.length}}</badge>\n" +
    "\n" +
    "        </button>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
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
    "        <a class=\"btn\" id=\"no-print\" href=\"{{fav.url}}\">Visit Detail</a>\n" +
    "        <button class=\"btn\" id=\"no-print\" ng-click=\"remove(fav)\">Remove</button>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("Favorites.templates"); }
catch(err) { module = angular.module("Favorites.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("templates/printHeader.html",
    "<div class=\"print-header\">\n" +
    "    <div class=\"print-logo\">\n" +
    "        <img src=\"house.png\" />\n" +
    "    </div>\n" +
    "    <div class=\"print-info\">\n" +
    "        <h2>Your Test Builder Favorites!</h2>\n" +
    "        <ul>\n" +
    "            <li><a href=\"http://www.testbuilder.com\">http://www.testbuilder.com</a></li>\n" +
    "            <li>Ph: 111-111-1111</li>\n" +
    "            <li>Ph: test@testbuilder.com</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);
})();
