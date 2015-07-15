describe("testing for progressbar", function() {
	//defind global varibles
	var container,data;
	
	beforeEach(function() {
	    container = $(".progress-container");
	    data = $.extend(true, [], progressBar.get("progressBar"));
	});
	//remain original data after each change
	afterEach(function(){
		progressBar.set("progressBar",data);
	});
	
	it("Data has been changed by switching selection", function() {
		//switch selection
		var switchTo = "bar2";
		progressBar.fire("switchProgressbar",false,switchTo);
		//verify whether data has been changed by switching selection
		var data = progressBar.get("progressBar"),
			len = data.length,
			i = 0,
			id; 
			
		for (; i < len; i++){
			if(data[i].selected){
				id=data[i].id;
			}
		}
		expect(switchTo).toEqual(id);
	});

	it("Extra class has been added as identity when value exceed 100", function() {
		var idx = 0;
		//set the mocked value
		progressBar.set("progressBar["+idx+"].value",130);
		$("input[type='button']:eq("+idx+")",container).click();
		expect($(".progress:eq("+idx+")",container).hasClass("completed")).toBeTruthy();
	});
	
	it("a new progress bar should be added on data change", function() {
		//mocked data
		var data = {
			id : "bar4",
			value : 30,
			text: "#progress4",
			selected: false,
			cls: ""
	    }
		progressBar.push("progressBar",data);
		expect($("#"+data.id).length).toEqual(1);
		expect($("select option[value='"+data.id+"']").length).toEqual(1);
	});

});
