
function JavaScriptTable(zoneId, tableId, tableClass) {
    
	this.doc = document;
    this.zoneId = zoneId;
	this.zone = this.doc.getElementById(this.zoneId);
	this.tableId = tableId || 'tableId';
	this.tableClass = tableClass || 'tableClass';
	this.table;
    this.config={};
    this.header={};
    this.data={};
   
 
	// create input field for modal on basis of type name and value
    this.CreateInput=function(aType,aName,aValue){
        var doc = this.doc;
        var html_type,html_value,html_readOnly;
        var elem = doc.createElement("input");
        return elem;
    }
    
   
    // set modal config
    this.SetConfig=function(json_str){
		this.config = JSON.parse(json_str);
        
    }
    
	//set data to display
    this.SetData=function(json_str){
		this.data = JSON.parse(json_str);
    }
	
	//set header
    this.SetHeader=function(json_str){
		this.header = JSON.parse(json_str);
           
    } 
    
    // Show modal window to edit the record by clicking on a row    
    this.showModal=function(rowId){
		//CreateInput will be called to create fields
    }
    

    this.Draw=function(){
        
			var athead,aHead,att,elem,item,txt,aLine,lineObj,lineObjLen;

			this.zone.innerHTML = "";
			var doc = this.doc;
            var aTable = doc.createElement("table");
            aTable.setAttribute('class',this.tableClass); 
			// ------------- Building Header -------------------------
    
             athead = doc.createElement("div");
             if(this.config.width){
                    var aWidth = parseInt(this.config.width);
                    aWidth = aWidth - 20;
                    athead.setAttribute('style','width:'+aWidth+'px;width:'+aWidth+'px;overflow-y: hidden;'); 
             }
        
			aHead = doc.createElement("tr");
      
            var nrCols = this.header.arr.length;
				
			for(var i=0;i<nrCols;i++){
                if(this.header.arr[i].width!=='0px'){
				elem = doc.createElement("th");
             	// Computing the size of each column
                if(this.header.arr[i].width){
                    aWidth = parseInt(this.header.arr[i].width);
                    elem.setAttribute('style','width:'+aWidth+'px;'); 
                }
                // Adding the title of each column header
				txt = doc.createTextNode(this.header.arr[i].title); 
				elem.appendChild(txt); 
                // adding the column header to the header
				aHead.appendChild(elem);
                }
			}
              athead.appendChild(aHead); // adding the header (tr) to div  
              aTable.appendChild(athead); // adding the div to the table
              var self = this;
			// ------------- Building Body -----------------------------
			
            // Creating a scrollable div (overflow-y) surrounding the body of the table
		
            var atbody = doc.createElement('div');
            var aStyle = "overflow-y: scroll;";

            if(this.config.height){ // If we have defined an height 
                var anHeight = parseInt(this.config.height);
                anHeight = anHeight - 24; // lowering by 24 px to figure out approximatly the height of the header
                aStyle = aStyle+"height:"+anHeight+"px;max-height:"+anHeight+"px;";
            }
             atbody.setAttribute('style',aStyle); 

       // Creating the data for the table
		for(var i=0;i<this.data.arr.length;i++){
            // Getting the object from the array
            lineObj = this.data.arr[i];
            aLine= doc.createElement("tr");
        	// Looping thru properties of each data object
            var j =0;
			Object.keys(lineObj).forEach(function(key) {
               
                  if(self.header.arr[j].width!=='0px'){
                        elem = doc.createElement("td");
                        txt = doc.createTextNode(lineObj[key]); // Set the td content to the corresponding item in the data array
                        elem.appendChild(txt);

                        if(self.header.arr[j].width){ // If we were given a width
                            aStyle ="width:"+self.header.arr[j].width+";"; 
                            elem.setAttribute('style',aStyle); 
                        }
                        aLine.appendChild(elem);
                  }
                
                j++;
                
			});
            atbody.appendChild(aLine);// adding the line (tr) to the table
           
		}
        aTable.appendChild(atbody);// adding the line (tr) to the table
        this.zone.style="width:"+this.config.width+";border-radius:6px;padding:6px;padding-bottom:6px;border:1px solid black;";
        this.zone.appendChild(aTable);  
        
               
      
        
    }
    
}




