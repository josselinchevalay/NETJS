/************************************/
/*
* Chat possible avec c'est quelque ligne de codes
* je pense que je vais y incorporer aussi une possiblité de mise en reseaux
* avec dépendance avec Socket io et ajax
* --------------------------------------
*  Socket IO -> Network.Socket
*  Ajax -> Network.Ajax
*/
/***********************************/
var win = new NETJS.windows();

var label = new NETJS.stackPanel();
label.addAttributes("for", "test-input");

label.addClass("test");
//label.Orientation ="horizontal"; // stack panel orientation
//label.Padding = "0px 0px 0px 20px"; // stack panel 
label.addStyle("backgroundColor", "silver");

var test2 = new NETJS.inputBox("myField");
test2.addStyle("backgroundColor", "#ff0000");

var test = new NETJS.label("Chat Room");
test.addStyle("backgroundColor", "#ff25ee");

var lb = new NETJS.listbox("myListBox");
lb.Data.add("men", "Men");
lb.Data.add("women", "Women");

var button = new NETJS.button("Sent");
button.addStyle("background-color", "#ff0000");

var buttonClear = new NETJS.button("Clear");
buttonClear.addStyle("background-color", "#ff0000");


var conversation = new NETJS.stackPanel();


var datag = new NETJS.datagrid("test-datagrid");
datag.DataHeader.add("nom");


button.onClick = function(){
	var text = "";
	if(lb.value()=="men")
		text +="hi Mister "+test2.value();
	else
		text += "hi lady "+test2.value();

	var textLabel = new NETJS.label(text);
	conversation.addChild(textLabel);
	win.render();
}

buttonClear.onClick = function(){
	console.log("toto");
	conversation._child = new NETJS.list();
};



label.addChild(datag);
label.addChild(test);
label.addChild(test2);
label.addChild(lb);
label.addChild(button);
label.addChild(conversation);
label.addChild(buttonClear);

win.addChild(label);



win.render();






