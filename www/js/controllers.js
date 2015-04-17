angular.module('ionic.controllers', [])

	.controller('ListCtrl', function ($scope) {

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
				title:'慢性鼻炎怎么预防？'
			},
			{
				id: 2,
				title:'高血压如何预防？'
			},
			{
				id: 3,
				title:'冠心病如何有效治疗？'
			},
			{
				id: 4,
				title:'高血压如何预防？'
			}
		];


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
				title:'慢性鼻炎怎么预防？'
			},
			{
				id: 2,
				title:'高血压如何预防？'
			},
			{
				id: 3,
				title:'冠心病如何有效治疗？'
			},
			{
				id: 4,
				title:'高血压如何预防？'
			}
		];
		$ionicModal.fromTemplateUrl('modal.html', function (modal) {
			$scope.modal = modal;
		}, {
			animation: 'slide-in-up'
		});
	})

	.controller('SlideboxCtrl', function($scope, $ionicSlideBoxDelegate) {
		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
	})

	.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {
		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};

		$ionicModal.fromTemplateUrl('modal.html', function (modal) {
			$scope.modal = modal;
		}, {
			animation: 'slide-in-up'
		});
	})


	.controller('AppCtrl', function() {

		ionic.Platform.ready(function() {

		});

	})
