var state = {
	items: []
}

var addItem = function(state, item){
	state.items.push(item);
}

var getItemHTML = function(item){
	return ('<li><span class="shopping-item">' + item 
		+ '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>');
}

var renderList = function(state, element){
	var itemsHTML = state.items.map(function(item){
		return getItemHTML(item);});
	element.html(itemsHTML);
}

var addItemSubmit = function(){
	addItem(state, $('input#shopping-list-entry').val());
	renderList(state, $('.shopping-list'));
}

var addItemListener = function(event){
	event.preventDefault();
	addItemSubmit();
}
var addItemButtonListener = function(){
	$('#js-shopping-list-form').submit(addItemListener);
}

var addItemReturnListener = function(){
	$('input#shopping-list-entry').keypress(function(event){
		if(event.which == 13)
			addItemListener(event);
	});
}

var addAddItemListeners = function(){
	addItemButtonListener();
	addItemReturnListener();
}

var deleteItem = function(item){
	var index = state.items.indexOf(item);
	if(index !== -1){
		state.items.splice(index, 1);
	}
}

var deleteItemListener = function(){
	$('.shopping-list').on('click', '.shopping-item-delete', function(event){
		var item = $(this).closest('li');
		var itemName = item.find('.shopping-item').text();
		deleteItem(itemName);
	});
}


var addAllListeners = function(){
	addAddItemListeners();
	deleteItemListener();
}
	

$(addAllListeners);