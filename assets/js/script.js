app = angular.module('myApp', []);
app.controller('signupForm',
        function ($scope, $http, $location, $rootScope) {
            $rootScope.userId = 0;
            url = $location.absUrl();
            token_number = url.substring(url.lastIndexOf('=') + 1);
            id = url.substring(url.lastIndexOf('?') + 1);
            get = id.split('&');
            user_id = Number(get[0].substring(2))


            $scope.postData = {
                userId: user_id,
                tokenId: token_number,
                type: 7
            };

//            console.log($scope.postData);
//            return;

           /* $http.post('#', $scope.postData).success(
                    function (res) {
                        if (res.status === 'success') {
                            data = res.data;
                            console.log(data);
//                            return;
                            $rootScope.userId = data.u_id;
//                            $scope.u_id = data.u_id;
                            $rootScope.firstname = data.u_fname;
                            $rootScope.lastname = data.u_lname;
                            $rootScope.preferredname = data.u_perferd_name;
                            $rootScope.emailaddress = data.u_email;
                            $rootScope.reemailaddress = data.u_email;
                            $rootScope.membershipType = data.u_plan_id;

							
							var selectedType = "#" + $rootScope.membershipType + "Div";
                            $(selectedType).addClass('active');
                            $("#selectetmembershipType").html($(selectedType).find('.membershipTypeDetails').html());
                            $(selectedType).find('.membershipTypeDetails').css({'margin-top': -50, 'opacity': 0});
                            $(selectedType).find('span').animate({
                                
                                opacity: 0,
                            }, 100, function () {});
                            $(selectedType).find('.membershipTypeDetails').animate({
                                marginTop: -99,
                                opacity: 1,
                            }, 1000, function () {});
							
							var date_array = data.u_dob.split("-");
                            $rootScope.date = date_array[0];
                            $rootScope.month = date_array[1];
                            $rootScope.year = date_array[2];

                            $rootScope.gender = data.u_gender;
                            $rootScope.telephone = data.u_tel_phone;
                            $rootScope.address1 = data.u_addres_1;
                            $rootScope.address2 = data.u_address_2;
                            $rootScope.city = data.u_city;
                            $rootScope.postcode = data.u_post_code;
                            $rootScope.country = data.u_country;
                            $rootScope.industry = data.u_industry_name;
                            $rootScope.company = data.u_company;
                            $rootScope.positionheld = data.u_position;
                            $rootScope.workemail = data.u_work_email;
                            $rootScope.workaddress1 = data.u_work_address_1;
                            $rootScope.workaddress2 = data.u_work_address_2;
                            $rootScope.workpostcode = data.u_work_post_code;
                            $rootScope.worktelephone = data.u_work_tel;
                            $rootScope.tellus = data.u_why_work;
                            $rootScope.wouldlike = data.u_why_chess_club;

                        } else {
                            $rootScope.userId = 0;
                            $rootScope.firstname = '';
                            $rootScope.lastname = '';
                            $rootScope.preferredname = '';
                            $rootScope.emailaddress = '';
                            $rootScope.reemailaddress = '';
                            $rootScope.membershipType = '';

                            $rootScope.date = '';
                            $rootScope.month = '';
                            $rootScope.year = '';

                            $rootScope.gender = '';
                            $rootScope.telephone = '';
                            $rootScope.address1 = '';
                            $rootScope.address2 = '';
                            $rootScope.city = '';
                            $rootScope.postcode = '';
                            $rootScope.country = '';
                            $rootScope.industry = '';
                            $rootScope.company = '';
                            $rootScope.positionheld = '';
                            $rootScope.workemail = '';
                            $rootScope.workaddress1 = '';
                            $rootScope.workaddress2 = '';
                            $rootScope.workpostcode = '';
                            $rootScope.worktelephone = '';
                            $rootScope.tellus = '';
                            $rootScope.wouldlike = '';
                        }

                    }).error(function (res) {
                console.log(res);

            });*/


            $scope.signupValidate = function () {
                $scope.userBasic = {
                    uId: $rootScope.userId,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    preferredname: $scope.preferredname,
                    emailaddress: $scope.emailaddress,
                    reemailaddress: $scope.reemailaddress,
                    membershipType: $scope.membershipType,
                    type: 1//1 for basic info save
                }
                /*$http.post('process.php', $scope.userBasic).success(function (res) {
                    console.log(res);

                }).error(function (res) {
                    console.log(res);
                });*/


                console.log($scope.userBasic);
                showTab('#aboutyouWrap');
                showSavedMsg();
            };



        });
app.factory('dataService', ['$http', function ($http) {
        var dataFactory = {};

        dataFactory.checkUniqueValue = function (id, property, value) {
            if (!id) id = 0;
            return $http.get('process_get.php?email=' + value + "&id=" + id).then(
                function (results) {
                    return results.data;
                });
        };

        return dataFactory;

}]);
        
app.directive('emailUnique', ['dataService', function (dataService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.bind('blur', function (e) {
                if (!ngModel || !element.val()) return;
                console.log(scope);
                var keyProperty = scope.$eval(attrs.emailUnique);
                var currentValue = element.val();
                dataService.checkUniqueValue(keyProperty.key, keyProperty.property, currentValue)
                    .then(function (unique) {
                        //Ensure value that being checked hasn't changed
                        //since the Ajax call was made

                        if (currentValue == element.val()) { 
                            ngModel.$setValidity('unique', unique === "true");
                        }
                    }, function () {
                        //Probably want a more robust way to handle an error
                        //For this demo we'll set unique to true though
                        ngModel.$setValidity('unique', false);
                    });
            });
        }
    }
}]);
		
app.controller('aboutyouForm', function ($scope, $http) {
    $scope.aboutyouValidate = function () {
        $scope.userAbout = {
            date: $scope.date,
            month: $scope.month,
            year: $scope.year,
            gender: $scope.gender,
            telephone: $scope.telephone,
            address1: $scope.address1,
            address2: $scope.address2,
            city: $scope.city,
            postcode: $scope.postcode,
            country: $scope.country,
            type: 2//1 for basic info save
        }
        console.log($scope.userAbout);
        $http.post('process.php', $scope.userAbout).success(function (res) {
            console.log(res);

        }).error(function (res) {
            console.log(res);
        });
        showTab('#yourworkWrap');
        showSavedMsg();
    };
    $scope.setGender = function (obj) {
        $scope.resetted = {gender: obj};
        $scope.user = angular.copy($scope.resetted);
    };
});
app.controller('yourworkForm', function ($scope, $http) {
    $scope.yourworkValidate = function () {
        $scope.userWork = {
            industry: $scope.industry,
            company: $scope.company,
            positionheld: $scope.positionheld,
            workemail: $scope.workemail,
            workaddress1: $scope.workaddress1,
            workaddress2: $scope.workaddress2,
            workpostcode: $scope.workpostcode,
            worktelephone: $scope.worktelephone,
            type: 3//1 for basic info save
        }
        console.log($scope.userWork);
        $http.post('process.php', $scope.userWork).success(function (res) {
            console.log(res);

        }).error(function (res) {
            console.log(res);
        });
        showTab('#whyyouWrap');
        showSavedMsg();
		if($('#textarea_1').val() != ''){
			setTimeout(function(){
				document.getElementById('textarea_1').style.cssText = 'height:auto; padding:0';
				document.getElementById('textarea_1').style.cssText = 'height:' + (document.getElementById('textarea_1').scrollHeight+2) + 'px';
				$('.tabWrap, .tabContainerWrap').css({'min-height': $(window).height()});
			    $('.tabContainerWrap').css({'height': $(oldTabId).outerHeight(true)});
			},2000);
		}
		if($('#textarea_2').val() != ''){
			setTimeout(function(){
				document.getElementById('textarea_2').style.cssText = 'height:auto; padding:0';
				document.getElementById('textarea_2').style.cssText = 'height:' + (document.getElementById('textarea_2').scrollHeight+2) + 'px';
				$('.tabWrap, .tabContainerWrap').css({'min-height': $(window).height()});
			    $('.tabContainerWrap').css({'height': $(oldTabId).outerHeight(true)});
			},2000);
		}
    };
});
app.controller('whyyouForm', function ($scope, $http) {
    $scope.whyyouValidate = function () {
        $scope.userForm = {
            wouldlike: $scope.wouldlike,
			tellus: $scope.tellus,
            type: 4//1 for basic info save
        }
        console.log($scope.userForm);
        $http.post('process.php', $scope.userForm).success(function (res) {
            console.log(res);

        }).error(function (res) {
            console.log(res);
        });
        /*showTab('#proposerWrap');*/
        showTab('#paymentWrap');
        showSavedMsg();
    };
});
app.controller('proposerForm', ['$scope', function proposerForm($scope) {
        $scope.proposerValidate = function () {
            showTab('#paymentWrap');
            showSavedMsg();
        };
    }]);
app.controller('mailCtrl', function ($scope, $http) {
    $('.leaveLink').click(function () {
        $scope.userEmail = {
            type: 6//1 for basic info save
        }
        $http.post('process.php', $scope.userEmail).success(function (res) {
            console.log(res);

        }).error(function (res) {
            console.log(res);
        });

//    $(".pageLoader").fadeIn(1000, function () {
//        location.reload();
//    });
    });
//    $scope.sendMail = function () {
//        $scope.userEmail = {
//            type: 6//1 for basic info save
//        }
//        $http.post('process.php', $scope.userEmail).success(function (res) {
//            console.log(res);
//
//        }).error(function (res) {
//            console.log(res);
//        });
//    }

});
app.controller('paymentForm', function ($scope, $http, $window) {
    $scope.paymentValidate = function () {
        $scope.userpaymentForm = {
            term: $scope.payment.term,
            type: 5//1 for basic info save
        }
//        console.log($scope.userpaymentForm);
        $http.post('process.php', $scope.userpaymentForm).success(function (res) {
            console.log(res);
            if (res.status == 'success') {
                var url = res.data;
                $window.location = url;
            } else {
                alert('Something is wrong, please try again later');

            }

        }).error(function (res) {
//            console.log(res);
        });
        //showTab('#confirmationWrap');
        $(".tabBreadcrumb").removeClass('active');
    };
    $scope.setPayment = function (obj) {
        $scope.resetted = {term: obj};
        $scope.payment = angular.copy($scope.resetted);
    };
});



var mobileWidth = 1025;
var oldTabId = '#signupWrap';
var PrevTabId;

$(document).ready(function () {
    oldTabId = '#' + $('.tabContainerWrap .tabWrap:first-child').attr('id');
    $('.tabContainerWrap').css({'height': $('.tabContainerWrap .tabWrap:first-child').outerHeight(true)});
    $('.tabContainerWrap .tabWrap').css({'top': $('.tabContainerWrap').height() + 100});


});
var stickyName;
$(window).load(function () {

    setMainPages();

    $('.tabBreadcrumb li, .restaurantMenu li').append('<span class="crumbMask"></span>');

    scrollFunctionSticky();
    $('html, body').stop().animate({
        scrollTop: 0
    }, 500, function () {
        $(".pageLoader").fadeOut(1000, function () {
            $(".down_arrow").addClass('active');
        });
    });


});
$(window).resize(function () {

    setMainPages()

    var setH = $(".continueMsg").height() / 2;
    var setW = $(".continueMsg").width() / 2;
    $(".continueMsg").css({'margin-top': -setH, 'margin-left': -setW});

    scrollFunctionSticky();
});
$(window).scroll(function () {
    scrollFunctionSticky();
});

function scrollFunctionSticky() {
    if (stickyName) {
        if ($(window).scrollTop() > stickyName.top) {
            $('.stickyRestaurantName').addClass('stickyName');
        } else {
            $('.stickyRestaurantName').removeClass('stickyName');
        }
    }
    if ($(window).width() >= mobileWidth) {

        if ($(window).scrollTop() >= $(window).height()) {
            $('footer').addClass('active');
        } else {
            $('footer').removeClass('active');
        }
        if ($(window).scrollTop() >= ($(window).height() * 2)) {
            if (!$('.restaurantMenu').hasClass('active')) {
                $('.restaurantMenu').addClass('active');
                $('.restaurantMenu li .crumbMask').css({'width': '100%'});
                $('.restaurantMenu li').each(function (index, element) {
                    $(this).find('.crumbMask').delay(index * 250).animate({
                        width: 0,
                    }, 700, function () {
                        // Animation complete.
                    });
                });
            }
        } else {
            $('.restaurantMenu').removeClass('active');
        }

        var setTop = $(window).scrollTop() - ($(window).height() / 4);
        $(".setRestaurantMenu").each(function (index, element) {
            if (setTop >= ($(this).attr('offsettop'))) {
                $('.restaurantMenuDesc .setRestaurantMenu').removeClass('active');
                $('.restaurantMenuDesc .setRestaurantMenu').eq($(this).attr('rel')).addClass('active');
                $('.restaurantMenu li').removeClass('active');
                $('.restaurantMenu li').eq($(this).attr('rel')).addClass('active');
            }
        });
        if (setTop < $('.restaurantMenuDesc .setRestaurantMenu').eq(0).attr('offsettop')) {
            $('.restaurantMenuDesc .setRestaurantMenu').removeClass('active');
        }
    }
    if ($(window).scrollTop() >= $(window).height()) {
        $('.landingPage').css({'opacity': 0});
    } else {
        $('.landingPage').css({'opacity': 1});
    }

    if ($(window).scrollTop() >= $(window).height() * 2) {
        $('.restaurantPage').addClass('fixed');
    } else {
        $('.restaurantPage').removeClass('fixed');
    }

}

function setMainPages() {
    $('.stickyRestaurantName').removeClass('stickyName');
    $('.pages, .tabWrap, .tabContainerWrap, .pageWrap').css({'min-height': $(window).height()});
    $('.tabContainerWrap').css({'height': $(oldTabId).outerHeight(true)});

    $('footer .desktop .footerSection_right').css({'width': ($(window).width() - 700) / 2});
	$('footer .desktop .footerSection_left').css({'width': ($(window).width()-($(window).width() - 700) / 2)});
    if ($(window).width() < mobileWidth) {
        $('footer').css({'min-height': $(window).height()});
    }else {
		$('footer').css({'min-height': 'auto'});		
	}

    $('.secondPage').css({'margin-top': $(window).height()});

    stickyName = $('.stickyRestaurantName').offset();

    if ($(window).width() >= mobileWidth) {
        if ($(window).scrollTop() > stickyName.top) {
            $('.stickyRestaurantName').addClass('stickyName');
        } else {
            $('.stickyRestaurantName').removeClass('stickyName');
        }

        $('.restaurantMenu').css({'margin-top': -($('.restaurantMenu').height() / 2)});
    }
    $('.tabBreadcrumb').css({'margin-top': -($('.tabBreadcrumb').height() / 2)});

    if ($(window).width() < mobileWidth) {
        $('.restaurantMenuMobile li').each(function (index, element) {
            $('.restaurantMenuMobile').css({'width': $('.restaurantMenuMobile').width() + $(this).outerWidth(true)});
        });
        device_width = $('.restaurantDetailMobileOuterWrap').width();
        $('.restaurantDetailMobileWrap .setRestaurantMenu').css({'width': $('.restaurantDetailMobileOuterWrap').width()})
        $('.restaurantDetailMobileWrap .setRestaurantMenu').each(function (index, element) {
            $('.restaurantDetailMobileWrap').css({'width': $('.restaurantDetailMobileWrap').width() + $(this).outerWidth(true)});

        });
        scrollImages_1(device_width * currentImg, speed);

        setTimeout(function () {
            //console.log($('.restaurantDetailMobileWrap .setRestaurantMenu').eq(currentImg).outerHeight(true));
            $('.restaurantDetailMobileWrap').css({'height': $('.restaurantDetailMobileWrap .setRestaurantMenu').eq(currentImg).outerHeight(true)});
        }, 1000);

    }
}

$('.restaurantMenu li').click(function () {
    if (!$(this).hasClass('active')) {
        var scrollToPosition = $($(this).attr('rel')).offset();
        $('html, body').stop().animate({
            scrollTop: scrollToPosition.top,
        }, 500, function () {
        });

    }
});
$('.setRestaurantMenu').each(function (index, element) {
    $(this).attr('offsettop', $(this).offset().top).attr('rel', index);
});



$('.applyMembership').click(function () {
    showMask();
    $('.tabContainerWrap .tabWrap:first-child .tabClose, .tabContainerWrap .tabWrap:first-child .backBtn').fadeOut();
    $('html, body').stop().animate({
        scrollTop: 0,
    }, 500, function () {
        $('.pages, footer').hide();

        $('.tabContainerWrap').css({'margin-top': 0, 'display': 'none'}).fadeIn(500, function () {
            $('.pageClose').trigger('click');
            //$('.tabContainerWrap').show().css({'margin-top':$(window).height()}).animate({
            //marginTop:0,
//		}, 1000,function(){
            $('.tabBreadcrumb').delay(1000).addClass('active');
            $('.tabBreadcrumb li').each(function (index, element) {
                $(this).find('.crumbMask').delay(index * 250).animate({
                    width: 0,
                }, 700, function () {
                    // Animation complete.
                });
            });
            $('.tabContainerWrap .tabWrap:first-child .tabClose, .tabContainerWrap .tabWrap:first-child .backBtn').fadeIn();
            $('.tabContainerWrap').css({'height': $(oldTabId).outerHeight(true)});
            hideMask();

        });

        $('.tabWrap').each(function (index, element) {
            if (!$(this).hasClass('active')) {
                $(this).css({'top': 0, 'display': 'none'});
            }
        });

    });

});
$('.membershipType').click(function () {
	var thisMember = $(this)
    $('.membershipType').removeClass('active');
	$(this).addClass('active').mouseenter();

	if($(this).find('input').attr('id') == 'radio_1'){
		$('#radio_4').prop("checked", true).parent('.membershipType').addClass('active');
	}else if($(this).find('input').attr('id') == 'radio_2'){
		$('#radio_5').prop("checked", true).parent('.membershipType').addClass('active');
	}else if($(this).find('input').attr('id') == 'radio_3'){
		$('#radio_6').prop("checked", true).parent('.membershipType').addClass('active');
	}else if($(this).find('input').attr('id') == 'radio_4'){
		$('#radio_1').prop("checked", true).parent('.membershipType').addClass('active');
	}else if($(this).find('input').attr('id') == 'radio_5'){
		$('#radio_2').prop("checked", true).parent('.membershipType').addClass('active');
	}else if($(this).find('input').attr('id') == 'radio_6'){
		$('#radio_3').prop("checked", true).parent('.membershipType').addClass('active');
	}
});
$('.radioWrap').click(function () {
	$(this).parents('.radioOuterWrap').find('.radioWrap').removeClass('active');
    $(this).addClass('active');
});
/*$('.membershipType').mouseenter(function() {
 if(!$(this).hasClass('active')){
 $(this).addClass('hover');
 $(this).find('.membershipTypeDetails').css({'margin-top':78,'opacity':0});
 $(this).find('.membershipTypeDetails').animate({
 marginTop:0,
 opacity:1,
 }, 1000,function(){});
 }
 }).mouseleave(function() {
 var thisE = $(this);
 if(!$(this).hasClass('active')){
 thisE.removeClass('hover');
 $(this).find('.membershipTypeDetails').animate({
 marginTop:78,
 opacity:0,
 }, 1000,function(){
 
 });
 }else {
 thisE.removeClass('hover');	
 }
 });*/

$('.membershipType').stop().mouseenter(function () {
    if (!$(this).hasClass('active')) {
        $(this).addClass('hover');
        /*$(this).find('.membershipTypeDetails').css({'margin-top': -50, 'opacity': 0});
        $(this).find('span').animate({
            opacity: 0,
        }, 100, function () {});
        $(this).find('.membershipTypeDetails').animate({
            marginTop: -99,
            opacity: 1,
        }, 1000, function () {});*/
    }
}).stop().mouseleave(function () {
    var thisE = $(this);
    if (!$(this).hasClass('active')) {
        thisE.removeClass('hover');

       /* $(this).find('.membershipTypeDetails').animate({
            marginTop: -50,
            opacity: 0,
        }, 100, function () {
            thisE.find('span').animate({
                opacity: 1,
            }, 1000, function () {});
        });*/
    } else {
        thisE.removeClass('hover');
    }
});


$("input[type=text], input[type=email], input[type=password]").focus(function () {
    $(this).addClass('activefield');
});
$("input[type=text], input[type=email], input[type=password]").blur(function () {
    $(this).removeClass('activefield');
});

$('.checkBoxWrap').click(function () {
    if ($(this).find('input').is(":checked")) {
        $(this).addClass('active');
    } else {
        $(this).removeClass('active');
    }
});

$(".backBtn, .tabClose").click(function () {
    if ($(this).hasClass('alertMsg')) {
        showContinueMsgPopup();
    } else {
        //hideTab($(this).attr('backTab'), $(this).attr('oldId'))
		$('.tabBreadcrumb li.active').prev('li').trigger('click');
    }
});
var footerBoolean = false;
var footerOldPage;
$(".nextPageBtn").click(function (event) {
    event.preventDefault();
    $('.pageWrap').css({'min-height': $(window).height()});

    if ($(this).hasClass('footer')) {
        if (!$(this).hasClass('active')) {
            $("footer").css({'z-index': 10000});
            showMask();
            if (footerBoolean) {
                $(footerOldPage).delay(1000).fadeOut(500, function () {
                    $(this).removeClass('active');
                    hideMask();
                });
                /*$(footerOldPage).animate({
                 top:$(window).height()+10,
                 }, 1000,function(){
                 });*/
            }
            footerBoolean = true;
            footerOldPage = $(this).attr('href');
            $($(this).attr('href')).addClass('active').css({'top': 0, 'display': 'none'}).fadeIn(500, function () {
                $('html, body').css({'overflow-y': 'hidden'});
                hideMask();
            });
            /*$($(this).attr('href')).addClass('active').css({'top':$(window).height()+10}).animate({
             top:0
             }, 1000,function(){
             $('html, body').css({'overflow-y':'hidden'});
             hideMask();
             });*/
            $('footer a').removeClass('active');
            $(this).addClass('active');
        }
    } else {
        showMask();
        $($(this).attr('href')).addClass('active').css({'top': 0, 'display': 'none'}).fadeIn(500, function () {
            $('html, body').css({'overflow-y': 'hidden'});
            hideMask();
        });
        /*$($(this).attr('href')).addClass('active').css({'top':$(window).height()+10}).animate({
         top:0
         }, 1000,function(){
         $('html, body').css({'overflow-y':'hidden'});
         hideMask();
         });*/

    }
});
$('.pageClose').click(function (event) {
    showMask();
    $($(this).attr('pageid')).fadeOut(500, function () {
        $('html, body').css({'overflow-y': 'visible'});
        $(this).removeClass('active');
        if (footerBoolean) {
            footerBoolean = false;
            $("footer").css({'z-index': 2});
            $('footer a').removeClass('active');
        }
        hideMask();
    });
    /*	$($(this).attr('pageid')).animate({
     top:$(window).height()+10,
     }, 1000,function(){
     $('html, body').css({'overflow-y':'visible'});
     $(this).removeClass('active');
     if(footerBoolean){
     footerBoolean = false;
     $("footer").css({'z-index':2});	
     $('footer a').removeClass('active');
     }
     hideMask();
     });*/

});
$('.okBtn, .goToHome').click(function (event) {
    $(".pageLoader").fadeIn(500, function () {
        location.reload();
    });
});
$('.down_arrow').click(function (event) {
    $('html, body').stop().animate({
        scrollTop: $(window).height(),
    }, 1000, function () {

    });
});
function showContinueMsgPopup() {
    $(".continueMsgPopup").fadeIn();
    var setH = $(".continueMsg").height() / 2;
    var setW = $(".continueMsg").width() / 2;
    $(".continueMsg").css({'margin-top': -setH, 'margin-left': -setW});

}
$('.continueLink').click(function () {
    $(".continueMsgPopup").fadeOut(500);
});
$('.leaveLink').click(function ($scope) {
    $.ajax({
        method: "POST",
        url: "process.php",
        data: {type: 6}
    })
    $(".pageLoader").fadeIn(1000, function () {
        location.reload();
    });
});
$('.tabBreadcrumb li').click(function () {
    if ($(this).hasClass('filled') && !$(this).hasClass('active')) {
        var tabLiIndex = $(this).index();
        $('.tabBreadcrumb li').removeClass('active');
        $(this).addClass('active');
        $('.tabBreadcrumb li').each(function (index, element) {
            if (index > tabLiIndex) {
                $(this).removeClass('filled');
            }
        });
        $('.tabContainerWrap .tabWrap').each(function (index, element) {
            if (index > tabLiIndex) {
                $(this).fadeOut(500, function () {
                    $(this).removeClass('active');
                });
            }
			if(index == tabLiIndex){
				$(".tabContainerWrap").css({'height': $('#'+$(this).attr('id')).outerHeight(true)});
			}
        });
    }

});
function showTab(tabId) {
    showMask();
    $('html, body').stop().animate({
        scrollTop: 0
    }, 500, function () {
        $(tabId + ' .tabClose, ' + tabId + ' .backBtn').fadeOut();
        $(tabId).addClass('active').css({'top': 0, 'display': 'none'}).fadeIn(500, function () {
            $(".tabContainerWrap").css({'height': $(tabId).outerHeight(true)});
            $('.tabContainerWrap .tabWrap').each(function (index, element) {
                if (!$(this).hasClass('active')) {
                    $(this).css({'top': $('.tabContainerWrap').height() + 100});
                }
            });
            // Animation complete.
            $('.tabBreadcrumb li').removeClass('active');
            $('.tabBreadcrumb li').eq($(this).attr('rel')).addClass('active filled');
            $('.tabBreadcrumb li').eq($(this).attr('rel') - 1).addClass('filled');
            $(tabId + ' .tabClose, ' + tabId + ' .backBtn').fadeIn();
            oldTabId = tabId;
            hideMask();

        });
    });
}
function hideTab(tabId, oldId) {
    showMask();
    $('html, body').stop().animate({
        scrollTop: 0
    }, 500, function () {
        if (oldId == 'home') {

            $(tabId + ' .tabClose, ' + tabId + ' .backBtn').fadeOut();
            $('.pages, footer').hide();
            $('.tabBreadcrumb').removeClass('active');
            $('.tabContainerWrap').animate({
                marginTop: $(window).height(),
            }, 500, function () {
                $(this).hide();
                $('.pages, footer').show();
                hideMask();
            });


        } else {
            $(".tabContainerWrap").css({'height': $(oldId).outerHeight(true)});
            $(tabId + ' .tabClose, ' + tabId + ' .backBtn').fadeOut();
            $(tabId).fadeOut(500, function () {
                $(tabId).removeClass('active');
                $('.tabContainerWrap .tabWrap').each(function (index, element) {
                    if (!$(this).hasClass('active')) {
                        $(this).css({'top': $('.tabContainerWrap').height() + 100});
                    }
                });
                $('.tabBreadcrumb li').removeClass('active');
                $('.tabBreadcrumb li').eq($(this).attr('rel') - 1).addClass('active');
                // Animation complete.
                oldTabId = oldId;
                hideMask();
            });
        }
    });
}
function showSavedMsg() {
    $(".saveMsg").delay(1500).fadeIn().delay(3500).fadeOut();
}
$(".saveMsgClose").click(function (e) {
    $(".saveMsg").fadeOut();
});
$('.selectBoxWrap .dropdown_spacer').click(function (event) {
    event.stopPropagation();
    if ($(this).parent('.selectBoxWrap').find('ul').css('display') == 'none') {
        $(this).parent('.selectBoxWrap').find('.txtBox').focus();
        $(this).parent('.selectBoxWrap').find('ul').slideDown();
    } else {
        $(this).parent('.selectBoxWrap').find('ul').slideUp();
    }
});
$('.selectBoxWrap ul li').click(function (event) {
    event.stopPropagation();
    $(this).parent('ul').slideUp();
});

$(document).on("click", function () {
    //if($('.selectBoxWrap ul').css('display') == 'block'){
    $('.selectBoxWrap ul').slideUp();
//	}
});

function h(e) {
    $(e).css({'height': 'auto', 'overflow-y': 'hidden'}).height(e.scrollHeight - 20);
    $('.tabWrap, .tabContainerWrap').css({'min-height': $(window).height()});
    $('.tabContainerWrap').css({'height': $(oldTabId).outerHeight(true)});
}
$('textarea').each(function () {
    h(this);
}).on('input', function () {
    h(this);
}).keyup(function( event ) {
	var lastTwo = $(this).val().substring($(this).val().length, $(this).val().length-2);
	if (lastTwo == "  "){
		$(this).val($(this).val().substring(0, $(this).val().length-1));
	}
	var res = $(this).val().split(" ");
	if(res.length >= 300){
		$(this).val($(this).val().substring(0, $(this).val().length-1));
	}
});


function showMask() {
    $('.pageMask').show();
}
function hideMask() {
    $('.pageMask').hide();
}
function showHideMask(tabId) {
    showMask();
    setTimeout(function () {
        $(oldTabId).removeClass('active');
        hideMask();
        $(oldTabId).css({'top': $('.tabContainerWrap').height(), 'position': 'absolute'});
        oldTabId = tabId;
    }, 3000);
}

var movePosition = 0;
var oldMovePosition = 0;

var device_width = $('.restaurantDetailMobileOuterWrap').width();

var IMG_WIDTH = 100;
var currentImg = 0;
var maxImages = 5;
var speed = 500;

var imgs;
var imgs_1;

var swipeOptions = {
    triggerOnTouchEnd: true,
    swipeStatus: swipeStatus,
    allowPageScroll: "vertical",
    threshold: 75
};

$(function () {
    imgs = $("#restaurantMenuMobile");
    imgs.swipe(swipeOptions);

    imgs_1 = $('.restaurantDetailMobileWrap')
    imgs_1.swipe(swipeOptions);


    if ($(window).width() < mobileWidth) {
        oldMovePosition = ($("#restaurantMenuMobile li:first-child").outerWidth(true) / 2);
        scrollImages(oldMovePosition, speed);
    }
});


/**
 * Catch each phase of the swipe.
 * move : we drag the div
 * cancel : we animate back to where we were
 * end : we animate to the next image
 */
function swipeStatus(event, phase, direction, distance) {
    //If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
    if (phase == "move" && (direction == "left" || direction == "right")) {
        var duration = 0;

        if (direction == "left") {
            scrollImages((oldMovePosition) + distance, duration);
            //scrollImages_1((device_width * currentImg) + (distance+(device_width*100)/$("#restaurantMenuMobile li").eq(currentImg).outerWidth(true)), speed);
            scrollImages_1((device_width * currentImg) + (distance + (device_width / $("#restaurantMenuMobile li").eq(currentImg).outerWidth(true)) * 100), speed);
        } else if (direction == "right") {
            scrollImages((oldMovePosition) - distance, duration);
            //scrollImages_1((device_width * currentImg) - (distance+(device_width*100)/$("#restaurantMenuMobile li").eq(currentImg).outerWidth(true)), speed);
            scrollImages_1((device_width * currentImg) - (distance + (device_width / $("#restaurantMenuMobile li").eq(currentImg).outerWidth(true)) * 100), speed);
        }

    } else if (phase == "cancel") {
        scrollImages(oldMovePosition, speed);
        scrollImages_1(device_width * currentImg, speed);
    } else if (phase == "end") {
        if (direction == "right") {
            previousImage();
        } else if (direction == "left") {
            nextImage();
        }
        $('.restaurantDetailMobileWrap').css({'height': $('.restaurantDetailMobileWrap .setRestaurantMenu').eq(currentImg).outerHeight(true)});
    }
}

function previousImage() {
    currentImg = Math.max(currentImg - 1, 0);
    //scrollImages(IMG_WIDTH * currentImg, speed);
    movePosition = 0;
    $("#restaurantMenuMobile li").each(function (index, element) {
        if (index < currentImg) {
            movePosition = movePosition + $(this).outerWidth(true);
        }
        if (index == currentImg) {
            movePosition = movePosition + ($(this).outerWidth(true) / 2);
        }
    });
    $("#restaurantMenuMobile li").removeClass('active');
    $("#restaurantMenuMobile li").eq(currentImg).addClass('active');

    scrollImages(movePosition, speed);
    oldMovePosition = movePosition;

    scrollImages_1(device_width * currentImg, speed);
//	console.log(currentImg)
}

function nextImage() {
    currentImg = Math.min(currentImg + 1, maxImages - 1);
    //scrollImages(IMG_WIDTH * currentImg, speed);
    movePosition = 0;
    $("#restaurantMenuMobile li").each(function (index, element) {
        if (index < currentImg) {
            movePosition = movePosition + $(this).outerWidth(true);
        }
        if (index == currentImg) {
            movePosition = movePosition + ($(this).outerWidth(true) / 2);
        }
    });
    $("#restaurantMenuMobile li").removeClass('active');
    $("#restaurantMenuMobile li").eq(currentImg).addClass('active');
    scrollImages(movePosition, speed);
    oldMovePosition = movePosition;

    scrollImages_1(device_width * currentImg, speed);
    //console.log(movePosition);
}

/**
 * Manually update the position of the imgs on drag
 */
function scrollImages(distance, duration) {
    imgs.css("transition-duration", (duration / 1000).toFixed(1) + "s");

    //inverse the number we set in the css
    var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    imgs.css("transform", "translate(" + value + "px,0)");
}
function scrollImages_1(distance, duration) {
    imgs_1.css("transition-duration", (duration / 1000).toFixed(1) + "s");

    //inverse the number we set in the css
    var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
    imgs_1.css("transform", "translate(" + value + "px,0)");

}
