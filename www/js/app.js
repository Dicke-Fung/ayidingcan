angular.module('ionicApp', ['ionic'])

	.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('menu', {
				url: "/menu",
				abstract: true,
				templateUrl: "templates/menu.html",
				controller: 'MenuCtrl'
			})
			.state('menu.tabs', {
				url: "/tab",
				views: {
					'menuContent': {
						templateUrl: "templates/tabs.html"
					}
				}
			})
			.state('menu.tabs.buttons', {
				url: "/buttons",
				views: {
					'buttons-tab': {
						templateUrl: "templates/buttons.html",
						controller: 'ButtonsTabCtrl'
					}
				}
			})
			.state('menu.tabs.list', {
				url: "/list",
				views: {
					'list-tab': {
						templateUrl: "templates/list.html",
						controller: 'ListCtrl'
					}
				}
			})
			.state('menu.tabs.item', {
				url: "/item",
				views: {
					'list-tab': {
						templateUrl: "templates/item.html"
					}
				}
			})
			.state('menu.tabs.testItem', {
				url: "/testItem",
				views: {
					'buttons-tab': {
						templateUrl: "templates/testItem.html"
					}
				}
			})
			.state('menu.tabs.form', {
				url: "/form",
				views: {
					'form-tab': {
						templateUrl: "templates/form.html"
					}
				}
			})
			.state('menu.plan', {
				url: "/plan",
				views: {
					'menuContent': {
						templateUrl: "templates/plan.html",
						controller: "planCtrl"
					}
				}
			})
			.state('menu.keyboard', {
				url: "/keyboard",
				views: {
					'menuContent': {
						templateUrl: "templates/keyboard.html"
					}
				}
			})
			.state('menu.slidebox', {
				url: "/slidebox",
				views: {
					'menuContent': {
						templateUrl: "templates/slidebox.html",
						controller: 'SlideboxCtrl'
					}
				}
			})
			.state('menu.about', {
				url: "/about",
				views: {
					'menuContent': {
						templateUrl: "templates/about.html"
					}
				}
			});

		$urlRouterProvider.otherwise("menu/tab/buttons");

	})

	.controller('ListCtrl', function ($scope, $timeout) {

		$scope.data = {
			showDelete: false
		};

		$scope.itemButtons = [
			{
				text: 'Delete',
				type: 'button-assertive',
				onTap: function (item) {
					alert('Delete Item: ' + item.id + ' ?');
				}
			}
		];

		$scope.onItemDelete = function (item) {
			$scope.items.splice($scope.items.indexOf(item), 1);
		};
		$scope.items = [
			{
				id: 1,
				title: '慢性鼻炎怎么预防？'
			},
			{
				id: 2,
				title: '高血压如何预防？'
			},
			{
				id: 3,
				title: '冠心病如何有效治疗？'
			},
			{
				id: 4,
				title: '高血压如何预防？'
			}
		];

		var base = 0;
		$scope.doRefresh = function () {
			for (var i = 0; i < 10; i++, base++)
				$scope.items.unshift(["item ", base].join(""));
			// Stop the ion-refresher from spinning
			$scope.$broadcast("scroll.refreshComplete");
		};
		$scope.load_more = function () {
			$timeout(function () {
				for (var i = 0; i < 10; i++, base++)
					$scope.items.push(["item ", base].join(""));
				$scope.$broadcast("scroll.infiniteScrollComplete");
			}, 500);
		};

	})
	.controller('planCtrl', function ($scope) {

		$scope.settingsList = [
			{text: "是否计划订餐", checked: false}
		];
		var mobileDialogElement = document.getElementById("planList");
		if($scope.settingsList[0].checked===true){
			$scope.items = [
				{label:"HTML5",selected:true},
				{label:"CSS3"},
				{label:"ECMAScript6"}
			];
			angular.element(document.body).append(mobileDialogElement);
		}else if($scope.settingsList[0].checked===false){
			$scope.items = [];
			angular.element(mobileDialogElement).remove();

		}

		$scope.pushNotificationChange = function () {
			console.log('Push Notification Change', $scope.pushNotification.checked);
		};

		$scope.pushNotification = {checked: true};
		$scope.emailNotification = 'Subscribed';

	})
	.controller('loginController', function ($scope, $http) {
		// create a blank object to hold our form information
		// $scope will allow this to pass between controller and view
		$scope.formData = {};
		// process the form
		$scope.processForm = function () {
			$http({
				method: 'POST',
				url: 'http://ayi.xiaolu.co/Service/Api100/userLogin',
				data: {
					'mobile': '13143033498',
					'pass': '123456',
					push_token:''
				},  // pass in data as strings
				headers: {'Content-Type': 'application/x-www-form-urlencoded;'}  // set the headers so angular passing info as form data (not request payload)
			}).success(function (data) {
				console.log(data);
				if (!data.success) {
					// if not successful, bind errors to error variables
					$scope.errorName = data.errors.name;
					$scope.errorSuperhero = data.errors.superheroAlias;
				} else {
					// if successful, bind success message to message

					$scope.message = data.message;
					alert($scope.message);
				}
			});
		};

	})

	.controller('ButtonsTabCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
		$scope.showPopup = function () {
			$ionicPopup.alert({
				title: 'Popup',
				content: 'This is ionic popup alert!'
			});
		};
		$scope.showActionsheet = function () {
			$ionicActionSheet.show({
				titleText: 'Ionic ActionSheet',
				buttons: [
					{
						text: 'Facebook'
					},
					{
						text: 'Twitter'
					},
				],
				destructiveText: 'Delete',
				cancelText: 'Cancel',
				cancel: function () {
					console.log('CANCELLED');
				},
				buttonClicked: function (index) {
					console.log('BUTTON CLICKED', index);
					return true;
				},
				destructiveButtonClicked: function () {
					console.log('DESTRUCT');
					return true;
				}
			});
		};
		$scope.testItems = [
			{
				id: 1,
				title: '慢性鼻炎怎么预防？'
			},
			{
				id: 2,
				title: '高血压如何预防？'
			},
			{
				id: 3,
				title: '冠心病如何有效治疗？'
			},
			{
				id: 4,
				title: '高血压如何预防？'
			}
		];
		$ionicModal.fromTemplateUrl('templates/modal.html', function (modal) {
			$scope.modal = modal;
		}, {
			animation: 'slide-in-up'
		});
	})

	.controller('SlideboxCtrl', function ($scope, $ionicSlideBoxDelegate) {
		$scope.nextSlide = function () {
			$ionicSlideBoxDelegate.next();
		}
	})

	.controller('MenuCtrl', function ($scope, $ionicSideMenuDelegate, $ionicModal) {
		$scope.toggleLeft = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};

		$ionicModal.fromTemplateUrl('templates/modal.html', function (modal) {
			$scope.modal = modal;
		}, {
			animation: 'slide-in-up'
		});
	})
	.controller('PopupCtrl', function ($scope, $ionicPopup) {
		// A confirm dialog
		$scope.showConfirm = function () {
			var confirmPopup = $ionicPopup.confirm({
				title: '提示', // String. The title of the popup.
				cssClass: 'text-center', // String, The custom CSS class name
				template: '你确定要点赞？', // String (optional). The html template to place in the popup body.
				cancelText: '取消', // String (default: 'Cancel'). The text of the Cancel button.
				okText: '确定'// String (default: 'OK'). The text of the OK button.
			});
			confirmPopup.then(function (res) {
				if (res) {
					console.log('You are sure');
				} else {
					console.log('You are not sure');
				}
			});
		};

	})

	.controller('AppCtrl', function () {

		ionic.Platform.ready(function () {

		});

	});