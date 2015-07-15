/*
 * functionalities of progress bar
 * author : Ray Huang
 * dependencies: jquery Ractive.js
 */

var progressBar;//for unit testing

(function($) {
	$(function() {
			progressBar = new Ractive({
			el : ".popup",
			template : "#progress-bar",
			data : {
				progressBar : [
					{
						id : "bar1",
						value : 25,
						text: "#progress1",
						selected: true,
						cls: ""
					},
					{
						id : "bar2",
						value : 50,
						text: "#progress2",
						selected: false,
						cls: ""
					},
					{
						id : "bar3",
						value : 75,
						text: "#progress3",
						selected: false,
						cls: ""
					}
				],
				button : ["-25","-10","+10","+25"]
			}
		});
		/*
		 * custom events
		 */
		progressBar.on({
			/**
			 * on button click, update current progress bar
			 * @param,event
			 **/
			runProgress : function(event) {
				var val = parseInt(this.get(event.keypath)),
					data = this.get("progressBar"),
					len = data.length,
					cls = "",
					i = 0;
				
				for (; i < len; i++){
					if(data[i].selected){
						var sum = data[i].value+val;
						sum = sum < 0 ? 0 : sum;
						
						if(sum>=100){
							cls = "completed";
						}
						this.set("progressBar["+i+"].value",sum);
						this.set("progressBar["+i+"].cls",cls);
					}
				}
			},
			/**
			 * on selection change, switch to current progress bar
			 * @param, event, event object
			 * @param, value, string. selected value
			 **/
			switchProgressbar : function(event,value) {
				var data = this.get("progressBar"),
					len = data.length,
					i = 0;
				//deselect progressbar
				this.set("progressBar.*.selected",false);
				
				//Rative js has a bug on getting value of selection in IE8, use querySelector to instead
				if(navigator.userAgent.indexOf("MSIE 8.0")>0){
					value = document.querySelector(".toolbar select").value
				}
				
				//select current bar
				for (; i < len; i++){
					if(data[i].id == value){
						this.set("progressBar["+i+"].selected",true);
					}
				}
			}
		});
	});
})(jQuery);
