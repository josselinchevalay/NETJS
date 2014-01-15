
var List = new NETJS.list();

var win = new NETJS.windows();

var label = new NETJS.stackPanel();
label.addAttributes("for", "test-input");

label.addClass("test");
label.Orientation ="horizontal";
label.Padding = "0px 0px 0px 20px";
label.addStyle("background-color", "silver");

var test2 = new NETJS.inputBox("myField");
test2.addStyle("background-color", "#ff0000");

var test = new NETJS.label("my Label");
test.addStyle("background-color", "#ff25ee");

var lb = new NETJS.listbox("myListBox");
lb.Data.add("1", "Men");
lb.Data.add("2", "Women");

var button = new NETJS.button("my button");
button.addStyle("background-color", "#ff0000");

button.onClick = function(){
	alert(lb.value());
}




label.addChild(test);
label.addChild(test2);
label.addChild(lb);
label.addChild(button);



win.addChild(label);



win.render();






