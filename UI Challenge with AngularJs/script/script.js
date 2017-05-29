var ProviderList = angular.module('Provider List', []);
ProviderList.controller('Controller', function ($scope, $http){
    /*
    Reading the data from JSON file
    */
    $http.get('people.json').success(function(data) {
        $scope.people = data.people;
        $scope.sortColumn="LastName"
        $scope.reverseSort = false;
        /*
        Sorting the selected column by clicking on the table heading
        */
        $scope.sortData = function (column) {
            $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
            $scope.sortColumn = column;
        }
                
        $scope.getSortClass = function (column) {
            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            } return ''; 
        }

        /*
        Adding the data in JSON format which was entered in the form fields
        */    
        $scope.addRow = function(){
            $scope.people.push({ 'last_name':$scope.last_name,
                         'first_name': $scope.first_name,
                         'email_address':$scope.email_address,
                         'specialty' :$scope.specialty,
                         'practice_name': $scope.practice_name
            });

            /*
            To clear the input fields once SUBMIT button is clicked.
            */
            $scope.people.last_name=' ';
            $scope.people.first_name=' ';
            $scope.people.email_address='';
            $scope.people.specialty='';
            $scope.people.practice_name='';
        };

        /*
        Removing the selected row by clicking the delete button.
        */
        $scope.removeRow = function (idx) {
        $scope.people.splice(idx, 1);
        };
    });
});