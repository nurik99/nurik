app.controller('IndexContentCtrl', IndexContentCtrl);

IndexContentCtrl.$inject = ['$http', '$scope', '$state', 'basket', '$cookies'];

// 'basket'

function IndexContentCtrl($http, $scope, $state, basket, $cookies) {
    var vm = this;
    $http.get('/api/advall/' + $state.params.id)
        .success(function(response) {
            vm.advall = response;
            var advall = response;
            // vm.addToCart = basket.addToCart;
        })
        .error(function(err) {
            console.log(err);
        })
    vm.link = [];
    vm.ses = $cookies.getObject('session')._id;

    $http({
        method: 'GET',
        url: '/api/advall/avaGet/?i=' + vm.ses
    }).then(function(response) {
        vm.avatar = response.data;
        vm.link.push(response.data[response.data.length - 1].link);
        console.log(vm.avatar);
    }, function(response) {
        console.log(err);
    });
    console.log(vm.link);



    vm.addComment = function() {
        var data = {
            text: vm.text,
            link: vm.link[vm.link.length - 1]
        }

        $http.post('/api/comment/' + $state.params.id, data)
            .success(function(response) {
                console.log(response);
                vm.advall.comments = vm.advall.comments || [];
                vm.advall.comments.push(response);
            })
            .error(function(err) {
                console.log(err);
            })
    }
    vm.deleteComment = function(index, comment) {
        // var data = {
        //  post_id: comment.post
        // }

        $http.delete('/api/comment/' + comment._id + '/' + comment.post)
            .success(function(response) {
                vm.advall.comments.splice(index, 1);
            })
            .error(function(err) {
                console.log(err);
            })
    }


    vm.selectComment = function(index, comment) {
        vm.currentComment = index;
        vm.currentCommentText = comment.text;
        vm.currentCommentId = comment._id;
    }

    vm.editSaveComment = function(index, comment) {
        $http.put('/api/comment/' + comment.post)
            .success(function(response) {
                console.log(response);
                vm.currentCommentText = comment.text;
                vm.currentCommentId = comment._id;
                vm.currentComment = null;
                vm.advall = vm.advall || [];
                vm.advall.comments.push(response);
            })
            .error(function(err) {
                console.log(err);
            });
    }

    vm.editCancelComment = function() {
        vm.currentComment = null;
    }

    vm.addToCart = function() {
        $http.post('/api/basket/' + $state.params.id)
            .success(function(response) {
                console.log(response);
            })
            .error(function(err) {
                console.log(err);
            })

        $http.get('/api/basket/')
        .success(function(response){
            vm.basket = response;
            console.log(response);
        })
        .error(function(err){
            console.log(err)
        })
    }

    var swiper2 = new Swiper('#id_image .swiper-container', {
        spaceBetween: 30,
        speed: 500,
        centeredSlides: true,
        loop: false,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

}