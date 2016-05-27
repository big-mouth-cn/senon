(function($) {
	
	'use strict';
	
	$(function() {
		$.charts.buildLine('#journal-chart', '最近十日销量走势', '', '金额(元)', '元', []);
		$.charts.buildLine('#journal-hour-chart', '今日分小时走势', '', '金额(元)', '元', []);
		$.charts.buildLine('#journal-hour-chart-for-cp', '各商户今日分小时销量走势', '', '金额(元)', '元', []);
		
		$.getJSON("journal", function(data) {
			var series = [];
			var sale_data = [], cost_data = [], profit_data = [];
			$(data).each(function(i, item) {
				var time = item.time + (8 * 60 * 60 * 1000);
				sale_data.push({ x : time, y : item.sale });
				cost_data.push({ x : time, y : item.cost });
				profit_data.push({ x : time, y : item.profit });
			});
			
			$('#journal-chart').highcharts().addSeries({name : '销售额', type : 'line', data : sale_data});
			$('#journal-chart').highcharts().addSeries({name : '利润', type : 'line', data : profit_data});
		});
		
		$.getJSON(ctx + "/monitor/journal/journal_for_hour", function(data) {
			var series = [], seriesForCp = [];
			
			var timegroup = [];
			var sale_data = [], cost_data = [], profit_data = [];
			$(data).each(function(i, item) {
				var time = item.timeInSecond + (8 * 60 * 60 * 1000);
				var existed = false;
				$.each(timegroup, function(i,inner) {
					if (inner.time == time) {
						inner.sale += item.sale;
						inner.cost += item.cost;
						inner.profit += item.profit;
						existed = true;
					}
				});
				if (!existed) {
					timegroup.push({
						time : time, sale : item.sale, cost : item.cost, profit : item.profit
					});
				}
				
				existed = false;
				$.each(seriesForCp, function(i,sfc) {
					if (sfc.id == item.cpUser) {
						sfc.data.push({
							x : time, y : item.sale
						});
						existed = true;
					}
				});
				if (!existed) {
					seriesForCp.push({
						id : item.cpUser,
						name : item.cpName,
						type : 'line',
						data : [{x:time, y:item.sale}]
					});
				}
			});

			$(timegroup).each(function(i,item) {
				sale_data.push({x:item.time, y:parseFloat(item.sale.toFixed(2))});
				cost_data.push({x:item.time, y:parseFloat(item.cost.toFixed(2))});
				profit_data.push({x:item.time, y:parseFloat(item.profit.toFixed(2))});
			});
			
			$('#journal-hour-chart').highcharts().addSeries({name : '销售额', type : 'line', data : sale_data});
			$('#journal-hour-chart').highcharts().addSeries({name : '利润', type : 'line', data : profit_data});
			$.each(seriesForCp, function(i, series) {
				$('#journal-hour-chart-for-cp').highcharts().addSeries(series);
			});
		});
	});
	
})(jQuery);