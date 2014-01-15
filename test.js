
var List = new NETJS.list();

var win = new NETJS.windows();

var label = new NETJS.stackPanel();
label.addAttributes("for", "test-input");

label.addClass("test");
label.Orientation ="horizontal";
label.Padding = "0px 0px 0px 20px";


var test = new NETJS.label("my Label");
test.addStyle("background-color", "#ff25ee");
test.onClick = function(){alert('titi');};

var test2 = new NETJS.label("my label 2");

label.addChild(test);
label.addChild(test2);
win.addChild(label);



win.render();




