(function($) {
	
	'use strict';
	
	$(function() {
		$.charts.buildLine('#cp-trend-chart', '商户销售量趋势', '', '金额(元)', '元', []);
		$.getJSON(ctx + '/stat/of_cp_trend/json', function(data) {
			var series = [];
			
			$(data).each(function(i, item) {
				var cpUser = item.cpUser;
				var exist = false;
				var time = item.time + (8 * 60 * 60 * 1000);
				$(series).each(function(j, cp) {
					if (cp.id == item.cpUser) {
						cp.data.push({
							x : time, y : item.sum
						});
						exist = true;
					}
				});
				if (!exist) {
					series.push({
						id : item.cpUser,
						name : item.cpName,
						type : 'line',
						data : [{
							x : time, y : item.sum
						}]
					});
				}
			});
			$.each(series, function(i, item) {
				$('#cp-trend-chart').highcharts().addSeries(item);
			});
		});
	});
	
})(jQuery);