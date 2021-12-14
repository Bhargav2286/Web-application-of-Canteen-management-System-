function acquire(){
	items 			= 	document.querySelectorAll("#item");
	select_btns 	= 	document.querySelectorAll("#select-btn");
	cart_display 	= 	document.querySelector("#cart");
	menu 			= 	document.querySelector("#menu");
	cart_list 		= 	document.querySelector("#cart_list");
	row 			= 	document.querySelector("#outer_row");
	remove_btns		= 	document.querySelectorAll("#remove_item");
	checkout_form	= 	document.querySelector("#checkout_form");
}

function data_init(){
	list = [];
}

function checkout(){
	acquire();
	checkout_form.setAttribute("action", "/Order/"+list.length);
	list.forEach(function(cart_item){
		var orderName = document.createElement("input");
		var orderQnt = document.createElement("input");
		orderName.setAttribute("type", "hidden");
		orderName.setAttribute("name", "items[item_name]");
		orderName.setAttribute("value", cart_item.item_name)
		orderQnt.setAttribute("type", "hidden");
		orderQnt.setAttribute("name", "items[num]");
		orderQnt.setAttribute("value", cart_item.quantity);

		checkout_form.appendChild(orderName);
		checkout_form.appendChild(orderQnt);
	});
	var button = document.createElement("button");
	button.setAttribute("type", "submit");
	button.setAttribute("class", "btn btn-success");
	button.setAttribute("id", "checkout_btn");
	button.textContent = "Checkout";
	checkout_form.appendChild(button);
}

function disp_cart(){
	var disp = "";
	list.forEach(function(cart_item){
		disp += "<div>" +
				"<li class='cart_li'>"	+
				"<h5 class='inline-view'><strong>" + cart_item.item_name +  "</strong></h5>" +
				"<p class='inline-view'> x " + cart_item.quantity + "</p>" +
				"<button class='btn btn-default inline-view' id='remove_item'><i class='fa fa-trash-o' aria-hidden='true'></i></button>" +
				"</li>" +
				"</div>" ;
	});
	disp += "<hr><form id='checkout_form' method='POST'>" + "</form>";
	cart_list.innerHTML = disp;
	checkout();
}

function remove_btn_init(){
	acquire();
	remove_btns.forEach(function(remove_btn){
		remove_btn.addEventListener("click", function(){
			var text = this.parentElement.querySelector("h5").textContent;
			list.forEach(function(cart_item){
				if(cart_item.item_name === text){
					list.splice(list.indexOf(cart_item),1);
				}
			})
			// list.pop(this.parentElement.querySelector("h5").textContent);
			console.log(list);
			disp_cart();
			remove_btn_init();
		});
	});
}

function init(){
	acquire();
	data_init();
	if(cart_display !== null){
		cart_display.style.display = "none";
	}
	if(row !== null){
		row.style.margin = "0 0";
	}
}

var items,
	select_btns,
	cart_display,
	menu,
	cart_list,
	row,
	list,
	remove_btns,
	checkout_form;

init();

if (items !== undefined){
	items.forEach(function(item){
		var count 	= 0;
		var plus 	= item.querySelector("#plus");
		var minus 	= item.querySelector("#minus");
		var sel_btn = item.querySelector("#select-btn");

		var num_disp = item.querySelector("#select-num");
		plus.addEventListener("click", function(){
			count += 1;
			num_disp.textContent = count;
			sel_btn.style.display = "inline-block";
		});

		minus.addEventListener("click", function(){
			if(count > 0){
				count -= 1;
				num_disp.textContent = count;
			}
			if(count === 0){
				sel_btn.style.display = "none";
			}
		});

		num_disp.textContent = count;
	});
}

if (select_btns !== undefined){
	select_btns.forEach(function(select_btn){
		select_btn.style.display = "none";
		select_btn.addEventListener("click", function(){
			menu.setAttribute("class", "col-lg-8");
			cart_display.style.display = "block";

			var num_disp = select_btn.parentElement.querySelector("#select-num").textContent;
			var item_name = select_btn.parentElement.querySelector("#item_name").textContent;

			var selection = {
				"item_name": item_name,
				"quantity": num_disp
			}

			list.push(selection);
			disp_cart();
			remove_btn_init();
		});
	});
}

// menu_btn.addEventListener("click", function(){
// 	menu_btn.classList.add("active");
// 	console.log(menu_btn);
// });
