
var List = new NETJS.list();

var win = new NETJS.windows();

var label = new NETJS.stackPanel();
label.addAttributes("for", "test-input");

label.addClass("test");
label.Orientation ="horizontal";
label.Padding = "0px 0px 0px 20px";


var test2 = new NETJS.inputBox("myField");
test2.addStyle("background-color", "#ff0000");

var test = new NETJS.label("my Label");
test.addStyle("background-color", "#ff25ee");

test.onClick = function(){
	alert(test2.value());
}



label.addChild(test);
label.addChild(test2);
win.addChild(label);



win.render();






