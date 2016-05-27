(function($) {
	
	'use strict';
	
	$(function() {
		refresh();
	});
	
	function refresh() {
		$.getJSON("monitor_of_provider_balance", function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var $source = 
				$('<div class="col-sm-4 col-md-3">' +
				'	<div class="col-md-6 col-xs-4 col-sm-5" style="text-align: left;">' + item.providerName + '</div>' +
				'	<div class="col-md-6 col-xs-8 col-sm-7">' +
				'		<div>' +
				'			' + (item.balance/100).toFixed(2) + 
				'		</div>' +
				'	</div>' +
				'</div>');
				$('#provider').append($source);
			}
		});
		
		$.getJSON("monitor_of_cp_balance", function(data) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var $source = 
				$('<div class="col-sm-4 col-md-3">' +
				'	<div class="col-md-6 col-xs-4 col-sm-5" style="text-align: left;">' + item.accountName + '</div>' +
				'	<div class="col-md-6 col-xs-8 col-sm-7">' +
				'		<div>' +
				'			' + (item.balance/100).toFixed(2) + 
				'		</div>' +
				'	</div>' +
				'</div>');
				$('#cp').append($source);
			}
		});
	}
})(jQuery);