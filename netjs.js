/************************************/
/*The MIT License (MIT)

Copyright (c) 2014 josselin chevalay

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/************************************/

'use strict';

var NETJS = NETJS|| {};

(function(){
  /********** string ************************/
  NETJS.string = function(char){
  	this._value = char.toString();
  	this._type = "string";
  };


  //Methods
  NETJS.string.prototype.append = function(char){
  		this._value += char;
  };
  NETJS.string.prototype.value = function(){
  		return this._value;
  };  
  NETJS.string.prototype.type = function(){
  		return this._type;
  }
  NETJS.string.prototype.__toString = function(){
    return this._value;
  }
  /****************End string ***************/

  /**************** int   ********************/
  NETJS.int = function(int){  	
  	this._value = parseInt(int);
  	this._type = "int"
  };
  // Methods
  NETJS.int.prototype.value = function(){
  	 return this._value;
  };
  NETJS.int.prototype.getHex = function(){
  	 return Number(this._value).toString(16);
  }
  NETJS.int.prototype.type = function(){
  	return this._type;
  };
  /**************** end int *****************/

  /**************** Float *******************/
  NETJS.float = function(float){
  	this._value = parseFloat(float);
  	this._type = "float";
  };
  // Methods
  NETJS.float.prototype.value = function()
  {
  	return this._value;
  };
  NETJS.float.prototype.getHex = function(){
  	 return this._value.toString(16);
  }
  NETJS.float.prototype.type = function(){
  	return this._type;
  };
  /*************** end Float ****************/

  /*************** Math *********************/
  NETJS.math = function(){};
  NETJS.math.multiply = function(number1, number2, param3){ 
    try{
    	number1.type();
    	number2.type();
    	param3.type();
    }catch(e){
    	console.log("Error NETJS : [MATH] - Type of parameters is not NETJS object");

    }	
    if(param3.type()=="string")
    {
      switch(param3.value()){
        case "float": return new NETJS.float(number1.value()*number2.value());break;
        case "int" : return new NETJS.int(number1.value()*number2.value());break;
        default : return new NETJS.int(number1.value()*number2.value());break;
      }
    }
    if(param3.type()=="int"){
      var multiply = new NETJS.float(number1.value()*number2.value());
      return NETJS.math.round(multiply,param3);
    }else{
      console.log("Error NETJS : [MATH] - multiply wait third param [string, int]");
      return false;
    }

  	
  }
  NETJS.math.power = function(number1, number2){
  	try{
    	number1.type();
    	number2.type();
    }catch(e){
    	console.log("Error NETJS : [MATH] - Type of parameters is not NETJS object");

    }  
    return new NETJS.int(Math.pow(number1.value(),number2.value()));	
  }
  NETJS.math.round =function(number, round){
  	try{
    	number.type();
    	round.type();
    }catch(e){
    	console.log("Error NETJS : [MATH] - Type of parameters is not NETJS object");

    }  
     if(number.type() == "float"){
     	return new NETJS.float(number.value().toFixed(round.value()));
     }else{
     	console.log("Error NETJS : [MATH] - can round float only");
     	return false;
     }
  };
  /*************** End Math *****************/

  /*************** LIST *********************/
  NETJS.list = function(){
      this._value = new Array();
      this._type = "list";
  };
  // Methods 
  NETJS.list.prototype.length = function(){
    return new NETJS.int(this._value.length);
  };
  NETJS.list.prototype.add = function(value){
      try{
        this._value.push(value);
      }catch(e){
        console.log("Error NETJS : [LIST] - can't push value");
        return false;
      }      
      return true;
  };
  NETJS.list.prototype.addRange = function(table){
    for(var index in table){
      this._value.push(table[index]);
    }
  };
  NETJS.list.prototype.remove = function(value){
      try{
        var index = this._value.indexOf(value);
        this.splice(index,1);
      }catch(err){
        console.log("Error NETJS : [LIST] - value not exist");
        return false;
      }
  };
  NETJS.list.prototype.removeAt = function(index){
    if(index.hasOwnProperty("_type") && index.type()=="int"){
        this._value.splice(index.value(),1);
        return true;
    }else{
      console.log("Error NETJS : [LIST] - index must be int");
      return false;
    }
  };
  NETJS.list.prototype.removeRange = function(index, length){
     if((index.hasOwnProperty("_type") && index.type()=="int") && (length.hasOwnProperty("_type") && length.type()=="int") ){
        this._value.splice(index.value(),length.value());
        return true;
    }else{
      console.log("Error NETJS : [LIST] - index must be int");
      return false;
    }
  };
  NETJS.list.prototype.contains = function(value){
     try{
        var index = this._value.indexOf(value);        
      }catch(err){        
        return false;
      }
  };
  NETJS.list.prototype.toArray = function(){
      return this._value;
  };
  NETJS.list.prototype.get = function(index){
     return this._value[index];
  }
  /************** End List ******************/
  NETJS.dictionary = function(){
    this._type = "dictionary";
    this._value = new Array();
    this._increment = 0;
  };
  // Methods
  NETJS.dictionary.prototype.type = function(){
      return this._type();
  };
  NETJS.dictionary.prototype.add =function(key, value){
      this._increment++;
      return this._value[key.toString()] = value;
  };
  NETJS.dictionary.prototype.isExist = function(key){      
      if(typeof this._value.key == 'undefined')
        return true;
      else
        return false;
  };
  NETJS.dictionary.prototype.get = function(key){
     if(this.isExist(key))
      return this._value[key];
    else
    {
      console.log("Error NETJS : [Dictionary] - key doesn't exist");
      return false;
    }
  }
  NETJS.dictionary.prototype.toArray = function(){
    return this._value;
  }
  NETJS.dictionary.prototype.isEmpty = function(){    
    if(this.length()==0)
      return true;
    else
      return false;
  }
  NETJS.dictionary.prototype.length = function(){
      return this._increment;
  }
  /*************  Dictionnary **************/


  /************* End Dictionnary ***********/

  /************** UI constant **************/
  NETJS.ui = function(){};
  NETJS.ui.prototype.ClICK = "click";
  /*****************************************/

  /************** UI : windows **************/
  // windows is html page
  // c'est un container il posséde la propertie _child
  // element ou vue n'a pas de _child il est le child d'un container
  // le vue est container doivent avoir la propertie uiAble
  NETJS.windows = function(){
    this._document = document;
    this._child = new NETJS.list();
    this._type = "windows";
    this._uiAble = true;
  };
  // Method
  NETJS.windows.prototype.addChild = function(child){
   if(!child.hasOwnProperty("_type")){console.log("Error NETJS : [Type] - type no manage ");return false;}
   if(!child.hasOwnProperty("_uiAble")){console.log("Error NETJS : [UI] - variable not uiAble");return false;}
   this._child.add(child);
  };
  NETJS.windows.prototype.render = function(){
    this._document.body.innerHTML ='';
    for(var element in this._child.toArray()){
        var domElement = this._child.get(element).render(this._document);
        this._document.body.appendChild(domElement);
    }
  };
  /******************************************/

  /************ UI : Label ******************/
  NETJS.label = function(value){
    this._value = value;
    this._type = "label";
    this._uiAble = true;
    this._attributes = new NETJS.dictionary();
    this._css = new NETJS.dictionary();
    this._class = new NETJS.list();
  };  
  // Properties
  NETJS.label.prototype.Id = null;
  NETJS.label.prototype.onClick = null;
  NETJS.label.prototype.onMouseOver = null;
  NETJS.label.prototype.onMouseOut = null;
  // Methods
  NETJS.label.prototype.render = function(instanceDoc){
     try{
        var element = instanceDoc.createElement("label");
        element.innerHTML = this._value;     
        try{  // part for html attributes        
          if(!this._attributes.isEmpty())
           {
             for(var index in this._attributes.toArray()){               
                  element.setAttribute(index, this._attributes.get(index));                          
             }
           }         
        }
        catch(err){
          console.log("Error NETJS : [Label] - UI ->  'Attributes contain an error'");
          return false;
        } // end of part for attributes
        try{   // part for css style      
          if(!this._css.isEmpty())
           {
             for(var index in this._css.toArray()){                                
                  element.style[index] = this._css.get(index);                         
             }
           }         
        }
        catch(err){
          console.log("Error NETJS : [Label] - UI -> Label 'Attributes contain an error'");
          return false;
        }     // end of par for style 


        try{ // part for classes
            if(!this._class.length()==0)
             {
               for(var index in this._class.toArray()){                                
                    element.className += " "+this._class.get(index);                         
               }
             }  
        }catch(err){

        }// end of part for classes
        if(this.Id != null)
          element.setAttribute("id", this.Id);

        // onCLick event     
        if(typeof (this.onClick) ==='function')
          element.addEventListener("click", this.onClick, false);
         
        // onMouseOver event
        if(typeof(this.onMouseOver)==='function')
          element.addEventListener("mouseover", this.onMouseOver, false);

        // onMouseOut event
        if(typeof(this.onMouseOut)==='function')
          element.addEventListener("mouseout",this.onMouseOut, false);

        return element; // return DOM element for apply on body         
     }catch(err){
        console.log("Error NETJS : [] - UI not availbe document");
        return false;
     }
  };
  NETJS.label.prototype.addAttributes = function(key, value){
    this._attributes.add(key, value);
    return true;
  };
  NETJS.label.prototype.addStyle = function(key, value){
    this._css.add(key, value);
    return true;
  };
  NETJS.label.prototype.addClass = function(key){
    this._class.add(key);
    return true;
  };
  /******************************************/

  /************ UI : stackPanel *************/
  NETJS.stackPanel = function(){
    this._child = new NETJS.list();
    this._type = "stackPanel";
    this._uiAble = true;
    this._attributes = new NETJS.dictionary();
    this._css = new NETJS.dictionary();
    this._class = new NETJS.list();
  };
  // Properties
  NETJS.stackPanel.prototype.Id = null;
  NETJS.stackPanel.prototype.Orientation = "vertical";
  NETJS.stackPanel.prototype.Padding = null;
  // Methods
  NETJS.stackPanel.prototype.render = function(instanceDoc){
    try{
      var element = instanceDoc.createElement("div");
      try{  // part for html attributes        
          if(!this._attributes.isEmpty())
           {
             for(var index in this._attributes.toArray()){               
                  element.setAttribute(index, this._attributes.get(index));                          
             }
           }         
      }
      catch(err){
        console.log("Error NETJS : [Label] - UI ->  'Attributes contain an error'");
        return false;
      } // end of part for attributes


      try{   // part for css style      
          if(!this._css.isEmpty())
           {
             for(var index in this._css.toArray()){                                
                  element.style[index] = this._css.get(index);                         
             }
           }         
        }catch(err){
        console.log("Error NETJS : [Label] - UI -> Label 'Attributes contain an error'");
        return false;
      }     // end of par for style 

      try{ // part for classes
            if(!this._class.length()==0)
             {
               for(var index in this._class.toArray()){                                
                    element.className += " "+this._class.get(index);                         
               }
             }  
        }catch(err){

        }// end of part for classes

        if(this.Id != null)
          element.setAttribute("id", this.Id);

    for(var index in this._child.toArray()){
      var div = instanceDoc.createElement("div");
      // Part of display
      if(this.Orientation=="horizontal")
        div.style.display = "inline";
      else if(this.Orientation == "vertical")
        div.style.display ="block";
      else{
        console.log("Error NETJS : [UI] - stackPanel Orientation not validate ");
        return false;
      }
      // End part display

      // part of Padding
      if(this.Padding!=null)
        div.style.margin = this.Padding;

      div.appendChild(this._child.get(index).render(instanceDoc))
      element.appendChild(div);
    }    

    return element;

    }catch(err){
      console.log("Error NETJS : [UI] stackPanel - document not availble");
      return false;
    }
  };
  NETJS.stackPanel.prototype.addAttributes = function(key, value){
    this._attributes.add(key, value);
    return true;
  };
  NETJS.stackPanel.prototype.addStyle = function(key, value){
    this._css.add(key, value);
    return true;
  };
  NETJS.stackPanel.prototype.addClass = function(key){
    this._class.add(key);
    return true;
  };
  NETJS.stackPanel.prototype.addChild = function(child){
   if(!child.hasOwnProperty("_type")){console.log("Error NETJS : [Type] - type no manage ");return false;}
   if(!child.hasOwnProperty("_uiAble")){console.log("Error NETJS : [UI] - variable not uiAble");return false;}
   this._child.add(child);
  };
  /************ END UI : stackPanel ********/ 

  /************ UI - InputBox ************/
  NETJS.inputBox = function(name){
    this._name = name;
    this._type = "inputBox";
    this._uiAble = true;
    this._attributes = new NETJS.dictionary();
    this._css = new NETJS.dictionary();
    this._class = new NETJS.list();
    this._instanceDoc = null;
    this.Id = name;
  }
  // Properties
  NETJS.inputBox.prototype.Id = null;
  //Methods
  NETJS.inputBox.prototype.addAttributes = function(key, value){
    this._attributes.add(key, value);
    return true;
  };
  NETJS.inputBox.prototype.addStyle = function(key, value){
    this._css.add(key, value);
    return true;
  };
  NETJS.inputBox.prototype.addClass = function(key){
    this._class.add(key);
    return true;
  };
  NETJS.inputBox.prototype.type = function(){
    return this._type;
  };
  NETJS.inputBox.prototype.render = function(instanceDoc){
    this._instanceDoc = instanceDoc;
      try{
          var element = instanceDoc.createElement("input");
          element.type = "text";

          try{  // part for html attributes        
          if(!this._attributes.isEmpty())
           {
             for(var index in this._attributes.toArray()){               
                  element.setAttribute(index, this._attributes.get(index));                          
             }
           }         
          }
          catch(err){
            console.log("Error NETJS : [Label] - UI ->  'Attributes contain an error'");
            return false;
          } // end of part for attributes

          try{   // part for css style      
          if(!this._css.isEmpty())
           {
             for(var index in this._css.toArray()){                                
                  element.style[index] = this._css.get(index);                         
             }
           }         
          }catch(err){
            console.log("Error NETJS : [Label] - UI -> Label 'Attributes contain an error'");
            return false;
          }     // end of par for style

          try{ // part for classes
            if(!this._class.length()==0)
             {
               for(var index in this._class.toArray()){                                
                    element.className += " "+this._class.get(index);                         
               }
             }  
        }catch(err){

        }// end of part for classes

        if(this.Id != null)
          element.setAttribute("id", this.Id);
          return element;
      }catch(err){
        console.log("Error NETJS : [UI] - InputBox document not availbe");
        return false
      }
  };
  NETJS.inputBox.prototype.value = function(){

      if(this._instanceDoc!=null){
          return this._instanceDoc.getElementById(this._name).value;
      }else{
        console.log("Error NETJS : [UI] InputBox windows must render for get value");
        return false;
      }
  }
  /************ END UI - InputBox*********/

  /************ UI - Button **************/
  NETJS.button = function(text){
    this._text = text;
    this._type = "button";
    this._uiAble = true;
    this._attributes = new NETJS.dictionary();
    this._css = new NETJS.dictionary();
    this._class = new NETJS.list();
    this._instanceDoc = null;
  };
  //Properties
  NETJS.button.prototype.Id = null;
  // Methods 

  NETJS.button.prototype.type = function(){
    return this._type;
  };
  NETJS.button.prototype.addAttributes = function(key, value){
    this._attributes.add(key, value);
    return true;
  };
  NETJS.button.prototype.addStyle = function(key, value){
    this._css.add(key, value);
    return true;
  };
  NETJS.button.prototype.addClass = function(key){
    this._class.add(key);
    return true;
  };
  NETJS.button.prototype.render = function(instanceDoc){
      try{
        var element = instanceDoc.createElement("button");
        element.innerHTML = this._text;     
        try{  // part for html attributes        
          if(!this._attributes.isEmpty())
           {
             for(var index in this._attributes.toArray()){               
                  element.setAttribute(index, this._attributes.get(index));                          
             }
           }         
        }
        catch(err){
          console.log("Error NETJS : [Label] - UI ->  'Attributes contain an error'");
          return false;
        } // end of part for attributes
        try{   // part for css style      
          if(!this._css.isEmpty())
           {
             for(var index in this._css.toArray()){                                
                  element.style[index] = this._css.get(index);                         
             }
           }         
        }
        catch(err){
          console.log("Error NETJS : [Label] - UI -> Label 'Attributes contain an error'");
          return false;
        }     // end of par for style 


        try{ // part for classes
            if(!this._class.length()==0)
             {
               for(var index in this._class.toArray()){                                
                    element.className += " "+this._class.get(index);                         
               }
             }  
        }catch(err){

        }// end of part for classes
        if(this.Id != null)
          element.setAttribute("id", this.Id);

        // onCLick event     
        if(typeof (this.onClick) ==='function')
          element.addEventListener("click", this.onClick, false);

        return element;
      }catch(err){
        console.log("Error NETJS : [UI] Button - Document Not avaible ");
        return false;
      }
  };
  /*********** END UI - Button **********/

  /********** UI - ListBox *************/
  NETJS.listbox = function(name){
    this._name = name;
    this._instanceDoc = null;
    this._type = "listbox";
    this._uiAble = true;
    this._attributes = new NETJS.dictionary();
    this._css = new NETJS.dictionary();
    this._class = new NETJS.list();
    this.Id = this._name;
  };
  // Properties
  NETJS.listbox.prototype.Data = new NETJS.dictionary();
  NETJS.listbox.prototype.Id =null;
  NETJS.listbox.prototype.ItemSelectionChange = null
  // Methods 
  NETJS.listbox.prototype.type = function(){
    return this._type;
  };
   NETJS.listbox.prototype.addAttributes = function(key, value){
    this._attributes.add(key, value);
    return true;
  };
  NETJS.listbox.prototype.addStyle = function(key, value){
    this._css.add(key, value);
    return true;
  };
  NETJS.listbox.prototype.addClass = function(key){
    this._class.add(key);
    return true;
  };
  NETJS.listbox.prototype.render = function(instanceDoc){
    this._instanceDoc = instanceDoc;
    try{
      var element = instanceDoc.createElement("select");

      try{  // part for html attributes        
          if(!this._attributes.isEmpty())
           {
             for(var index in this._attributes.toArray()){               
                  element.setAttribute(index, this._attributes.get(index));                          
             }
           }         
        }
        catch(err){
          console.log("Error NETJS : [Label] - UI ->  'Attributes contain an error'");
          return false;
        } // end of part for attributes
        try{   // part for css style      
          if(!this._css.isEmpty())
           {
             for(var index in this._css.toArray()){                                
                  element.style[index] = this._css.get(index);                         
             }
           }         
        }
        catch(err){
          console.log("Error NETJS : [Label] - UI -> Label 'Attributes contain an error'");
          return false;
        }     // end of par for style 


        try{ // part for classes
            if(!this._class.length()==0)
             {
               for(var index in this._class.toArray()){                                
                    element.className += " "+this._class.get(index);                         
               }
             }  
        }catch(err){

        }// end of part for classes
        if(this.Id != null)
          element.setAttribute("id", this.Id);

        // Apply Datas
        for(var index in this.Data.toArray()){
            var option = instanceDoc.createElement("option");
            option.value = index;
            option.innerHTML = this.Data.get(index);
            element.appendChild(option);
        }

        /********** Part of event ***************/
        if(typeof(this.ItemSelectionChange)==='function')
          element.addEventListener("change", this.ItemSelectionChange, false);

        /*****************************************/

      return element;
    }catch(err){
      console.log("Error NETJS : [UI] - listBox document not availbe");
      return false;
    }
  };
  NETJS.listbox.prototype.value = function(){
     if(this._instanceDoc!=null){
      var element = this._instanceDoc.getElementById(this._name);
      return element.options[element.selectedIndex].value;
     }else{
      console.log("Error NETJS : [UI] - listbox windows must be render for get value");
      return false;
     }
  };
  /********** END UI - listBox *********/

  /********** UI Datagrid      ********/
  NETJS.datagrid = function(id){
    this._name = id;
    this._instanceDoc = null;
    this._type = "datagrid";
    this._uiAble = true;
    this._attributes = new NETJS.dictionary();
    this._css = new NETJS.dictionary();
    this._class = new NETJS.list();
    this.Id = id;
  };
  // Properties
  NETJS.datagrid.prototype.DataContext = new NETJS.list();
  NETJS.datagrid.prototype.Id =null;
  NETJS.datagrid.prototype.DataHeader = new NETJS.list();
  // Methods
  NETJS.datagrid.prototype.type = function(){
    return this._type;
  };
  NETJS.datagrid.prototype.addAttributes = function(key, value){
    this._attributes.add(key, value);
    return true;
  };
  NETJS.datagrid.prototype.addStyle = function(key, value){
    this._css.add(key, value);
    return true;
  };
  NETJS.datagrid.prototype.addClass = function(key){
    this._class.add(key);
    return true;
  };
  NETJS.datagrid.prototype.render = function(instanceDoc){
    this._instanceDoc = instanceDoc;
    try{
        var element = instanceDoc.createElement("table");
        element.Id = this.Id;
          if(this.DataHeader.length().value() >0){// si nous mettons un header
              var tempHead = instanceDoc.createElement("thead"); // nous créons la section head
              var tempRow = instanceDoc.createElement("tr"); // créeons une ligne dans cette section
              for(var index in this.DataHeader.toArray()){                
                var tempCell = instanceDoc.createElement("th"); // nous y ajoutons des cellules en th
                tempCell.innerHTML = this.DataHeader.get(index); // on y est met les texte de la liste
                tempRow.appendChild(tempCell); // on add la cellule dans la ligne
                tempHead.appendChild(tempRow); // on add la ligne dans la section
              }
              element.appendChild(tempHead); // on ajoute la section
          } // fin des header
          if(this.DataContext.length().value()>0){ // si nous avons des valeur
              var tempBody = instanceDoc.createElement("tbody");
              for(var index in this.DataContext.toArray()){// Pour chaque entrée de la liste
                if(typeof(this.DataContext.get(index))==='string'){
                  var tempRow = instanceDoc.createElement("tr");
                  var tempCell = instanceDoc.createElement("td");
                  tempCell.innerHTML = this.DataContext.get(index);
                  tempRow.appendChild(tempCell);
                  tempBody.appendChild(tempRow);
                }else if(typeof(this.DataContext.get(index))==='object' && !this.DataContext.get(index).hasOwnProperty('_type')){
                  var tableRow = this.DataContext.get(index);
                  for(var rowIndex in tableRow){
                    var tableCell = tableRow[rowIndex];
                    var tempRow = instanceDoc.createElement("tr");
                    for(var cellIndex in tableCell){
                      var tempCell = instanceDoc.createElement("td");
                      tempCell.innerHTML = tableCell[cellIndex];
                      tempRow.appendChild(tempCell);
                    }
                    tempBody.appendChild(tempRow);
                  }
                }else if(typeof(this.DataContext.get(index))==='object' && this.DataContext.get(index).hasOwnProperty('_type')){ 
                  var tableRow = this.DataContext.get(index).toArray();
                  for(var rowIndex in tableRow){
                    var tableCell = tableRow[rowIndex];
                    var tempRow = instanceDoc.createElement("tr");
                    for(var cellIndex in tableCell){
                      var tempCell = instanceDoc.createElement("td");
                      tempCell.innerHTML = tableCell[cellIndex];
                      tempRow.appendChild(tempCell);
                    }
                    tempBody.appendChild(tempRow);
                  }
                }               
              }
              
              element.appendChild(tempBody);
          }

          if(this.Id != null)
            element.setAttribute("id", this.Id);

        return element;
    }catch(err){
      console.log("Error  NETJS : [UI] - datagrid document not avaible");
      return false;
    }
  }
  /********** END UI datagrid  ********/
})();
