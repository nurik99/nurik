app.service('basket', BasketService);

function BasketService() {
	this.infoCart = function() {
		if (localStorage.getItem('basket')) {
			var basket = JSON.parse(localStorage.getItem('basket'));
			var allCount = 0;
			for(var i = 0; i < basket.length; i++){
        		allCount = (basket[i].count * 1) + allCount;
    		}
			// var allCount += basket.count;
			return allCount;
		}
		else {
			var allCount = 0;
			return allCount;
		}
		$interval(function(){basket.infoCart(); return console.log(basket.infoCart());}, 1000);
	}

	// this.addToCart = function (advall) {
	// 	if(localStorage.getItem('basket')) {
	// 		var basket = JSON.parse(localStorage.getItem('basket'));
	// 		var index = basket.findIndex(function(item) {
	// 			console.log("item.name = "+ item.name);
	// 			return item.name == advall.adv_name
	// 		})

	// 		if(index >= 0) {
	// 			basket[index].count = (basket[index].count * 1) + 1;
	// 		}else {
	// 			basket.push ({
	// 				name: advall.adv_name,
	// 				price: advall.new_price,
	// 				count: 1
	// 			})
	// 		}

	// 		localStorage.setItem('basket', JSON.stringify(basket));
	// 	}else {
	// 		var basket = [];
	// 		basket.push ({
	// 			name: advall.adv_name,
	// 			price: advall.new_price,
	// 			count: 1
	// 		})
	// 		localStorage.setItem('basket', JSON.stringify(basket));
	// 	}
	// 	BasketService.infoCart();
	// }

	this.getCart = function() {
		if (localStorage.getItem('basket')) {
			return JSON.parse(localStorage.getItem('basket'));
		}
		else {
			return []
		}
	}

	this.delCart = function(tBasket) {
		var basket = JSON.parse(localStorage.getItem('basket'));
		var index = basket.findIndex(function(item) {
			return item.name == tBasket.name
		})
		if(!localStorage.getItem('basket')) {
			return []
		}
		if (basket[index].count > 1) {
			basket[index].count = (basket[index].count * 1) - 1;
		}
		else {
			basket[index].count = 0;
		}
		if(basket[index].count < 0) {
			localStorage.removeItem('basket', JSON.stringify(basket));
		}
		localStorage.setItem('basket', JSON.stringify(basket));
		if(BasketService.infoCart == 0) {
			localStorage.remove('basket');
		}
		BasketService.infoCart;
		BasketService.getCart;

	}

	this.info = function(tBasket) {
		var basket = JSON.parse(localStorage.getItem('basket'));
		var index = basket.find(function(item) {
			return item.name == tBasket.name 
		});
		if(index) {
			return true;
		}
		else {
			return false;
		}
		return allCount;
	}
	this.infoCarts = function(tBasket) {
		var basket = JSON.parse(localStorage.getItem('basket'));
		var allCount = basket.find(function(item) {
			return item.name == tBasket.name 
		});
		var allCount = tBasket.count;
		return allCount;
	}
}
