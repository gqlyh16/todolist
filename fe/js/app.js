(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	$('.todo-list').empty(); 
	itemList(0);
	
})(window);


function itemList(filterNum) {
	$.ajax({
		url:"./api/todos",
		dataType: "json",
		method: "GET",
		success: function(data){
			
			for(var i=0 ; i<data.length ; i++){		
				var li = null;
				
				if(filters(filterNum, data[i].completed, 1)) {
					li = "<li class='completed' id='"
						+ data[i].id 
						+ "'><div class='view'><input class='toggle' type='checkbox' checked='checked'><label>" 
						+ data[i].todo 
						+ "</label><button class='destroy'></button></div></li>"; 
				}
				
				if(filters(filterNum, data[i].completed, 0)) {
					li = "<li id='"
						+ data[i].id 
						+ "'><div class='view'><input class='toggle' type='checkbox'><label>"
						+ data[i].todo
						+ "</label><button class='destroy'></button></div></li>";
				}
				
				$(".todo-list").append(li);
			}
			countNotCompleted();
		}
	});
}

function filters(filterNum, isCompleted, option){
	
	if((filterNum == 0) && (isCompleted == 0) && (option == 0))
		return true;
	if((filterNum == 0) && (isCompleted == 1) && (option == 1))
		return true;
	if((filterNum == 1) && (isCompleted == 0) && (option == 0))
		return true;
	if((filterNum == 2) && (isCompleted == 1) && (option == 1))
		return true;
	
	return false;
}

function countNotCompleted(){
	$.ajax({
		url:"./api/todos/count",
		method: "GET",
		success: function(data){
			$(".todo-count").children("strong").text(data);
		}
	})
}

function insertItem(todoText){
	$.ajax({
		url:"./api/todos",
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
			"todo": todoText
		}),
		dataType: "json",
		success: function(data){
			var li = null; 
			
			if( !$('#completed').hasClass('selected')) {
				li = "<li id='"
					+ data.id 
					+ "'><div class='view'><input class='toggle' type='checkbox'><label>"
					+ data.todo
					+ "</label><button class='destroy'></button></div></li>";			
			}	
			$(".todo-list").prepend(li);
			countNotCompleted();
			$(".new-todo").val("");
		}
	});
}

function updateItem(li, liId) {
	var item = {};
	item.id = liId;
	
	if(li.prop("checked"))
		item.completed = 1;
	else
		item.completed = 0;
	
	$.ajax({
		url:"./api/todos/" + liId,
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		data: JSON.stringify(item),
		dataType: "json",
		success: function(data){
			$('.todo-list').empty();
			
			if($('#all').hasClass('selected'))
				itemList(0);
				
			else if($('#active').hasClass('selected'))
				itemList(1);
				
			else
				itemList(2);
		}
	});
}

function deleteItem(liId) {
	$.ajax({
		url:"./api/todos/" + liId,
		method: "DELETE",
		dataType: "json",
		success: function(data){
			$('.todo-list').empty();
			
			if($('#all').hasClass('selected'))
				itemList(0);
				
			else if($('#active').hasClass('selected'))
				itemList(1);
				
			else
				itemList(2);
		}
	});
}

function deleteCompletedItem() {
	$.ajax({
		url:"./api/todos",
		method: "DELETE",
		dataType: "json",
		success: function(data){
			$('.todo-list').empty();
			
			if($('#all').hasClass('selected'))
				itemList(0);
				
			else if($('#active').hasClass('selected'))
				itemList(1);
				
			else
				itemList(2);
		}
	});
}


$(".filters").find("#all").click(function() { 
	
	$('.todo-list').empty(); 
	$(".filters").find(".selected").removeClass();
	$("#all").attr("class", "selected");
	
	itemList(0);
});

$(".filters").find("#active").click(function() { 
	
	$('.todo-list').empty(); 
	$(".filters").find(".selected").removeClass();
	$("#active").attr("class", "selected");
	
	itemList(1);
});

$(".filters").find("#completed").click(function() { 
	
	$('.todo-list').empty(); 
	$(".filters").find(".selected").removeClass();
	$("#completed").attr("class", "selected");
	
	itemList(2);
}); 

$('.new-todo').keypress(function(e){
	var value;
	
    if(e.which === 13){
    	value = $(".new-todo").val().trim();
    	if(value == "")
    		alert("Blank content is NOT registered.");
    	else
    		insertItem(value);
    }

});

$(".todo-list").on("click", ".toggle", function() {
	var item = $(this); 
	var value = $(this).parent().parent().get(0).id;
	
	updateItem(item, value);
});

$(".todo-list").on("click", ".destroy", function() {
	var value = parseInt($(this).parent().parent().get(0).id);
	deleteItem(value);
});

$(".clear-completed").on("click", function() {
	deleteCompletedItem();
});
