function customersController($scope, $http) {
    var target, searchword;
    $scope.search = function(searchUrl) {
        //Check for searchUrl, otherwise use keywords.
        if ($scope.languagevalue){
            target = 'ml';
            searchUrl = typeof(searchUrl) != 'undefined' ? searchUrl : document.getElementById('english').value;
        }else{
            target = 'en';
            searchUrl = typeof(searchUrl) != 'undefined' ? searchUrl : $scope.enkeywords;
        }

        $scope.url = 'http://www.vanmaram.com/json_result.php?'+target+'='+searchUrl;
        $http.get($scope.url).
        success(function(data, status) {
            $scope.status = status;
            $scope.searchword = searchUrl;
            $scope.result = data; // Show result from server in <li> element
            $scope.suggetionresult = null;
        }).
        error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    };
    $scope.suggestword = function () {
        if ($scope.languagevalue){
            target = 'ml';
            searchUrl = $scope.mlkeywords;
        }else{
            target = 'en';
            searchUrl = $scope.enkeywords;
        }
        $scope.url = 'http://www.vanmaram.com/ajax_json_suggestion.php?'+target+'='+searchUrl; // The url of our search
        $http.get($scope.url).
        success(function(data, status) {
            $scope.status = status;
            $scope.suggetionresult = data; // Show result from server in <li> element
            $scope.result = null;
        }).
        error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
        
    };
}

var switchSearch = document.getElementById("switch");
var forMalayalam = document.getElementById('malayalam');
var forEnglish = document.getElementById('english');
switchSearch.onchange = function(){
    if(switchSearch.checked){
        forMalayalam.value = "";
        forMalayalam.style.display = 'none';
        forEnglish.style.display = 'block';
    }else{
        forEnglish.value = "";
        forEnglish.style.display = 'none';
        forMalayalam.style.display = 'block';
    }
};
document.getElementById('english').onkeypress = function(e) {
    transliterateKey(e);
};