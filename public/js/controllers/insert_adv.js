app.controller('InsertAdvCtrl', InsertAdvCtrl);

InsertAdvCtrl.$inject = ['$http', '$scope', 'basket'];

function InsertAdvCtrl($http, $scope, basket) {
  var vm = this;

   $scope.$watchGroup(['vm.old_price', 'vm.discount'], function(){
    if($scope.vm.old_price !== undefined && $scope.vm.discount <=100 && $scope.vm.discount !== undefined && $scope.vm.discount>0){
      $scope.vm.new_price = ($scope.vm.old_price - (($scope.vm.discount*$scope.vm.old_price)/100).toFixed(0));
    }else{
      $scope.vm.new_price = "Ошибка"
    }
  })


  // vm.insert_adv = function(){
  //   var data = {
  //     city: vm.city,
  //     adv_name: vm.adv_name,
  //     categorya: vm.categorya,
  //     adv_date: vm.adv_date,
  //     adv_conditions: vm.adv_conditions,
  //     adv_description: vm.adv_description,
  //     old_price: vm.old_price,
  //     discount: vm.discount,
  //     new_price: vm.new_price
  //   // data.append('link', vm.file);
  //   }
  //   console.log(data);

  //   $http.post('/api/advall', data)
  //   .success(function(response){
  //     console.log(response);
  //   })
  //   .error(function(err){
  //     console.log(err);
  //   })
  // }

    vm.insert_adv = function(){
   console.log(vm.file._file);
   var data = new FormData();
   data.append('city', vm.city);
   data.append('adv_name', vm.adv_name);
   data.append('categorya', vm.categorya);
   data.append('adv_date', vm.adv_date);
   data.append('adv_conditions', vm.adv_conditions);
   data.append('adv_description', vm.adv_description);
   data.append('old_price', vm.old_price);
   data.append('discount', vm.discount);
   data.append('new_price', vm.new_price);
   data.append('myFile', vm.file._file);
   console.log(data);

   $http.post('/api/advall', data, 
     {
       headers: {'Content-Type': undefined},
       transformRequest: angular.identity
     })
   .success(function(response){
     vm.advall.push(response);
     res.redirect('/')
   })
   .error(function(err){
     console.log(err);
   })
  }
}


app.directive('ngFileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                       // File Name 
                        name: item.name,
                        //File Size 
                        size: item.size,
                        //File URL to view 
                        url: URL.createObjectURL(item),
                        // File Input Value 
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);

