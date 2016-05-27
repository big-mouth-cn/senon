(function($) {
	
	'use strict';
	
	$(function() {
		refresh();
		setInterval(refresh, 10000);
	});
	
	function refresh() {
		$.getJSON("monitor_of_tape_orders", function(data) {
			$('#orders tbody').empty();
			for (var i = 0; i < data.length; i++) {
				var o = data[i];
				var $tr = $('<tr>');
				
				$tr.append($('<td>').append(o.orderId));
				$tr.append($('<td>').append(o.cpUser));
				$tr.append($('<td>').append(o.cellphoneNumber));
				$tr.append($('<td>').append(o.statusMessage));
				$tr.append($('<td>').append(new Date(o.createTime).Format('yyyy-MM-dd hh:mm:ss')));
				$tr.append($('<td>').append(new Date(o.modifyTime).Format('yyyy-MM-dd hh:mm:ss')));
				
				$('#orders tbody').append($tr);
			}
		});
	}
	
	Date.prototype.Format = function(fmt) { //author: meizz 
		var o = {
			"M+" : this.getMonth() + 1, //月份 
			"d+" : this.getDate(), //日 
			"h+" : this.getHours(), //小时 
			"m+" : this.getMinutes(), //分 
			"s+" : this.getSeconds(), //秒 
			"q+" : Math.floor((this.getMonth() + 3) / 3), //季度 
			"S" : this.getMilliseconds()
		//毫秒 
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		for ( var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
						: (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	
})(jQuery);