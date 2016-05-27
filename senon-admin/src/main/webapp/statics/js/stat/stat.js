(function($) {
	
	'use strict';
	
	$(function() {
		$.getJSON("stat_details", function(data) {
			
			var soc = data.StatOfCp;
			var soo = data.StatOfOp;
			var sop = data.StatOfProvince;
			
			var series_soc = [];
			$(soc).each(function(i, item) {
				var data = [item.cpName, item.count];
				series_soc.push(data);
			});
			
			var series_soo = [];
			$(soo).each(function(i, item) {
				var name = item.op==0 ? '中国移动' : item.op==1 ? '中国联通' : '中国电信';
				var data = [name, item.count];
				series_soo.push(data);
			});
			
			var series_sop = [];
			$(sop).each(function(i, item) {
				var data = [item.provinceName, item.count];
				series_sop.push(data);
			});

			$.charts.buildPie('#stat-cp-chart', '按商户统计', [{
				type: 'pie',
				name: '订单数',
				data: series_soc
			}]);
			$.charts.buildPie('#stat-op-chart', '按运营商统计', [{
				type: 'pie',
				name: '订单数',
				data: series_soo
			}]);
			$.charts.buildPie('#stat-province-chart', '按省份统计', [{
				type: 'pie',
				name: '订单数',
				data: series_sop
			}]);
		});
	});
	
})(jQuery);