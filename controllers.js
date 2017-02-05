(function(){
  angular.module('app')
    .controller('mainPageCtrl',['$scope',function($scope){
        $scope.message = "This is amaziing!!!";
    }])
    .controller('loginCtrl',['$scope','Authenticate','$http','$state','$mdToast',function($scope,Authenticate,$http,$state,$mdToast){

      $scope.incorrectPassword = function() {
                $mdToast.show($mdToast.simple()
                  .textContent('Incorrect Password!!')
                  .position('top left')
                  );
              };
      $scope.notVerified = function() {
                $mdToast.show($mdToast.simple()
                  .textContent('Please Verify Your account first only then you can login!!')
                  .position('top left')
                  );
              };

      $scope.logIn = function(data){
        var $data = angular.toJson(data);
        Authenticate.logIn($scope,$data).then(function(data){
           console.log(data.data);
           var user = data.data;
           if(user){
             $state.go('user.home',{});
           }
           else {
             $scope.incorrectPassword();
             $scope.msgtxt='Please enter the correct username and password';
             $state.go('home',{});
           }
        });
      }
    }])
    .controller('signUpCtrl',['$scope','user','$state','$mdDialog',function($scope,user,$state,$mdDialog){
      $scope.emailAvailable = 0;
      $scope.openFromLeft = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Thank you for signing up!')
          .textContent('You may now Log In')
          .ariaLabel('Verification Dialog!')
          .ok('OK!!')
          // You can specify either sting with query selector
          // or an element
      );
     };
        $scope.validMail = function(){
          if($scope.noUser){
            return true;
          }
          else{
            return false;
          }
        }
        $scope.signUp = function(data){
          var $data = angular.toJson(data);
          user.signup($scope,$data).then(function(data){
            console.log(data.data);
            $scope.openFromLeft();
          });
          $state.go('home',{});
        }

    }])
    .controller('pformCtrl',['$scope','user',function($scope,user){
      $scope.saveProctor = function(data){
        var $data = angular.toJson(data);
        user.saveProctor($scope,$data).then(function(data){

          $scope.form1.$setUntouched();
          $scope.user= " ";
          $scope.form1.$setPristine();

        });
      }
      $scope.shiftList = [
            { time: 'I', value: 'I' },
            { time: 'II', value: 'II' }
          ];
      $scope.branchList = [
            { name: 'Computer Engineering', value: 'Computer' },
            { name: 'Mechanical Engineering', value: 'Mechanical' },
            { name: 'Electronics and Telecommunication ', value: 'ENTC' }
          ];
      $scope.yoaList = [
        {year:'2016-17', value: '16-17'},
        {year:'2017-18', value: '17-18'},
        {year:'2015-16', value: '15-16'},
        {year:'2014-15', value: '14-15'},
        {year:'2013-14', value: '13-14'},
        {year:'2012-13', value: '12-13'}
]

    }])
    .controller('userHomeCtrl',['$scope',function($scope){
        $scope.message = "Welcome to the dashboard";
    }])
    .controller('profileMenuCtrl',['$scope','Authenticate','$state',function($scope,Authenticate,$state){
        $scope.logout = function(){
          Authenticate.logout();
          $state.go('home',{});
        }
    }])
    .controller('attendanceCtrl',['$scope','attendanceData',function($scope,attendanceData){
          $scope.classes = [
            { name: 'First Year', value: '1' },
            { name: 'Second Year', value: '2' },
            { name: 'Third Year', value: '3' },
            { name: 'Fourth Year', value: '4' }
          ];
            $scope.semester = [
            { name: 'I', value: '1' },
            { name: 'II', value: '2' }
          ];

          $scope.checkUserEntry=function(userData){
            var $data=angular.toJson(userData);
            console.log($data);
            attendanceData.checkEntryAttendance($scope,$data).then(function(userData){
              console.log(userData.data);
              if(userData.data==0){
                  $scope.serverRespFalse = false;
                  $scope.serverRespTrue = true;
                }
              else {
                  $scope.serverRespFalse = true;
                  $scope.serverRespTrue = false;
              }
            });
  }
             $scope.saveAttendanceData= function(userData){
            var $data = angular.toJson(userData);
            attendanceData.storeAttendanceData($scope,$data).then(function(userData){

              $scope.serverRespFalse = false;
              $scope.serverRespTrue = false;
              console.log(userData.data);

            });

          }
    }])
    .controller('unitTestDataCtrl',['$scope','unitTestData',function($scope,unitTestData){
          $scope.classes = [
            { name: 'F.E.', value: '1' },
            { name: 'S.E.', value: '2' },
              { name: 'T.E.', value: '3' },
                { name: 'B.E.', value: '4' }
          ];
      $scope.semester = [
            { name: 'I', value: '1' },
            { name: 'II', value: '2' }

          ];
      $scope.unitTests = [
        { name: 'I', value: '1' },
        { name: 'II', value: '2' }
          ];

          $scope.checkUserEntry= function(userData){
            var $Udata = angular.toJson(userData);
            unitTestData.checkEntryUnitTest($scope,$Udata).then(function(userData){
              console.log(userData.data);
              if(userData.data==0){
                  $scope.serverRespFalse = false;
                  $scope.serverRespTrue = true;
                }
              else {
                  $scope.serverRespFalse = true;
                  $scope.serverRespTrue = false;
              }

            });
          }
          $scope.saveUnitTestData= function(userData){
            var $Udata = angular.toJson(userData);
            unitTestData.storeUnitTestData($scope,$Udata).then(function(userData){

              $scope.serverRespFalse = false;
              $scope.serverRespTrue = false;
              console.log(userData.data);

            });
          }
    }])
    
    .controller('academicInfoCtrl',['$scope','academicData',function($scope,academicData){

      academicData.checkAcademicData().then(function(data){

          if(data.data == 0){
            $scope.negativeServResp = false ;
            $scope.positiveServResp = true;
            $scope.thankYou = false;

          }
          else {
            $scope.negativeServResp = true;
            $scope.positiveServResp = false;
            $scope.thankYou = false;

          }
      });

      $scope.submitAcademicInfo = function(data){
        var $data = angular.toJson(data);
        academicData.submitAcademicInfo($scope,$data).then(function(data){

          $scope.negativeServResp = false;
          $scope.positiveServResp = false;
          $scope.thankYou = true;

          $scope.academicDataForm.$setUntouched();
          $scope.academicData= " ";
          $scope.academicDataForm.$setPristine();

        });
      }
    }])

    //*****************PTG Faculty Record****************************************//
    .controller('ptgRecordCtrl',['$scope','PTGData',function($scope,PTGData)
    {
          $scope.classes = [
            { name: 'First Year', value: '1' },
            { name: 'Second Year', value: '2' },
            { name: 'Third Year', value: '3' },
            { name: 'Fourth Year', value: '4' }
          ];
            $scope.semester = [
            { name: 'I', value: '1' },
            { name: 'II', value: '2' }
          ];

         $scope.checkUserEntry=function(userData){
            var $data=angular.toJson(userData);
            console.log($data);
            PTGData.checkEntryPTG($scope,$data).then(function(userData){
              console.log(userData.data);
              if(userData.data==0){
                  $scope.serverRespFalse = false;
                  $scope.serverRespTrue = true;
                  $scope.thankYou = false;
                }
              else {
                  $scope.serverRespFalse = true;
                  $scope.serverRespTrue = false;
                  $scope.thankYou = false;
              }
            });
  }
             $scope.savePTGData= function(userData){
            var $data = angular.toJson(userData);
            attendanceData.storePTGData($scope,$data).then(function(userData){

              $scope.serverRespFalse = false;
              $scope.serverRespTrue = false;
              $scope.thankYou = true;
              console.log(userData.data);

            });

          }
    }])
    //#################################################### DIRECTIVES
    .directive('ngUnique', function(user) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attr, model) {
        elm.on('keyup',function(evt) {
          var val = elm.val();
          user.isUniqueUser(scope,val);
          });
        }
      }
    }) //#################################################### SERVICES
    .factory('user',['$http',function($http){
      return {
        signup: function(scope,data){
            return  $http.post('/ksm/data/users/signup.php',data);
         },
         isUniqueUser:function(scope,dat){
        var data = {
          email:dat
        };
          $http.post('/ksm/data/users/isUniqueUser.php',data).then(function(data){

            if(data.data == 0){
              scope.showerr = false;
              scope.user1 = false;
              scope.noUser = true;
              scope.emailAvailable = 1;
            }
            else if (data.data == 1){
              scope.showerr = false;
              scope.user1 = true;
              scope.noUser = false;
              scope.emailAvailable = 2;

            }
            else{
              scope.showerr = true;
              scope.noUser = false;
              scope.user1 = false;
              scope.message = data.data;
              scope.emailAvailable = 2;

                 }
              });
           },
         saveProctor : function (scope,data) {
           return $http.post('/ksm/data/users/proctor-form.php',data);
         }

      }
    }])
    .factory('Authenticate',['$http',function($http){
      return {
        isLogged: function(){
          var $checkSession = $http.post('/ksm/data/session/checkSession.php');
          return $checkSession;
        },
        logIn: function(scope,data){
         return $http.post('/ksm/data/session/login.php',data);
        },
        logout: function(scope,data) {
          $http.get('/ksm/data/session/logout.php');
        }
      }
    }])
    .factory('academicData',['$http',function($http){
      return {
        submitAcademicInfo: function(scope,data){
          return $http.post('/ksm/data/proctor/submitAcademicInfo.php',data);
        },
        checkAcademicData: function(){
          return $http.post('/ksm/data/proctor/checkAcademicData.php');
        }
      }
    }])
    .factory('unitTestData',['$http',function($http){
      return {
        checkEntryUnitTest: function($scope,data){
          return $http.post('/ksm/data/proctor/checkEntryUnitTest.php',data);
        },
        storeUnitTestData: function(scope,data){
          return $http.post('/ksm/data/proctor/storeUnitTestData.php',data);
        }

      }
    }])
    .factory('attendanceData',['$http',function($http){
      return {
        checkEntryAttendance: function($scope,data){
          return $http.post('/ksm/data/proctor/checkEntryAttendance.php',data);
        },
        storeAttendanceData: function(scope,data){
          return $http.post('/ksm/data/proctor/storeAttendanceData.php',data);
        }

      }
    }])
    .factory('PTGData',['$http',function($http){
      return {
        checkEntryPTG: function($scope,data){
          return $http.post('/ksm/data/proctor/checkEntryPTG.php',data);
        },
        storePTGData: function(scope,data){
          return $http.post('/ksm/data/proctor/storePTGData.php',data);
        }

      }
    }]);
})();
