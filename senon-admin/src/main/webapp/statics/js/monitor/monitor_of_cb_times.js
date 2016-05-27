(function($) {
	
	'use strict';
	
	var mapCodes = [
    	{ code : 'CN-54', name : '西藏' },
    	{ code : 'CN-52', name : '贵州' },
    	{ code : 'CN-35', name : '福建' },
    	{ code : 'CN-50', name : '重庆' },
    	{ code : 'CN-51', name : '四川' },
    	{ code : 'CN-31', name : '上海' },
    	{ code : 'CN-32', name : '江苏' },
    	{ code : 'CN-33', name : '浙江' },
    	{ code : 'CN-14', name : '山西' },
    	{ code : 'CN-15', name : '内蒙古' },
    	{ code : 'CN-12', name : '天津' },
    	{ code : 'CN-13', name : '河北' },
    	{ code : 'CN-11', name : '北京' },
    	{ code : 'CN-34', name : '安徽' },
    	{ code : 'CN-53', name : '云南' },
    	{ code : 'CN-36', name : '江西' },
    	{ code : 'CN-37', name : '山东' },
    	{ code : 'CN-41', name : '河南' },
    	{ code : 'CN-43', name : '湖南' },
    	{ code : 'CN-42', name : '湖北' },
    	{ code : 'CN-45', name : '广西' },
    	{ code : 'CN-44', name : '广东' },
    	{ code : 'CN-46', name : '海南' },
    	{ code : 'CN-65', name : '新疆' },
    	{ code : 'CN-64', name : '宁夏' },
    	{ code : 'CN-63', name : '青海' },
    	{ code : 'CN-62', name : '甘肃' },
    	{ code : 'CN-61', name : '陕西' },
    	{ code : 'CN-23', name : '黑龙江' },
    	{ code : 'CN-22', name : '吉林' },
    	{ code : 'CN-21', name : '辽宁' },
    	{ code : 'CN-18', name : '台湾' }
    ];
	
	function dateFormat(second){  
	      var dd,hh,mm,ss;  
	      second = typeof second === 'string' ? parseInt(second) : second;  
	      if(!second || second < 0){  
	          return;  
	      }  
	      //天  
	      dd = second / (24 * 3600) | 0;  
	      second = Math.round(second) - dd * 24 * 3600;  
	      //小时  
	      hh = second / 3600 | 0;  
	      second = Math.round(second) - hh * 3600;  
	      //分  
	      mm = second / 60 | 0;  
	      //秒  
	      ss = Math.round(second) - mm * 60;  
	      if(Math.round(dd) < 10){  
	          dd = dd > 0 ? '0' + dd : '';  
	      }  
	      if(Math.round(hh) < 10){  
	          hh = '0' + hh;  
	      }  
	      if(Math.round(mm) < 10){  
	          mm = '0' + mm;  
	      }  
	      if(Math.round(ss) < 10){  
	          ss = '0' + ss;  
	      }  
	      return( dd + ' ' + hh + ':' + mm + ':' + ss);  
	  }
	 
	function getTimes() {
		$.getJSON("monitor_of_cb_times/json", {
			'opCode' : $('#select-operators').val(),
			'providerId' : $('#select-providers').val(),
			'cpUser' : $('#select-cpUsers').val()
		}, function(data) {
			if (!data || data.length<=0) {
				$('#province-details').append('无数据');
			}
			
			var series = {};
			$('#avg_cb_seconds_detail tbody').empty();
			
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				item.avgCbSeconds = item.avgCbSeconds*10
				item.avgCbTime = dateFormat(item.avgCbSeconds);
				
				for (var j = 0; j < mapCodes.length; j++) {
					var mapCode = mapCodes[j];
					var regx = new RegExp("^(.*" + mapCode.name + ".*)$");
					if (regx.test(item.provinceName)) {
						var value = series[mapCode.code];
						series[mapCode.code] = (value > 0) ? (value + item.avgCbSeconds) : item.avgCbSeconds;
						data[i].mapCode = mapCode.code;
					}
				}
				
				var $tr = $('<tr>');
				if (i % 2) {
					$tr.append('<td>' + data[i-1].provinceName + '</td>');
					$tr.append('<td>' + data[i-1].avgCbTime + '</td>');
					$tr.append('<td>' + item.provinceName + '</td>');
					$tr.append('<td>' + item.avgCbTime + '</td>');
					$('#avg_cb_seconds_detail tbody').append($tr);
				}
				else if (i + 1 == data.length) {
					$tr.append('<td>' + item.provinceName + '</td>');
					$tr.append('<td>' + item.avgCbTime + '</td>');
					$tr.append('<td></td>');
					$tr.append('<td></td>');
					$('#avg_cb_seconds_detail tbody').append($tr);
				}
			}
			
			$('#province').empty();
			var map = new jvm.WorldMap({ 
				map: 'cn_merc_en', // cn_merc_en, world_mill_en
				container : $('#province'),
				series: {
			        regions: [{
			          scale: [
			                  '#FFFFFF',
			            '#FF0000'
			          ],
			          attribute: 'fill',
			          values: series
			        }]
		        },
		        onRegionLabelShow: function(event, label, code){
		        	var content = '<p><b>' + label.html() + '</b></p>';
		        	if (typeof(series[code]) != 'undefined') {
		        		$(data).each(function(i, item) {
		        			if (item.mapCode == code) {
		        				content += '回调时间:' + item.avgCbTime;
		        			}
		        		});
		        	}
		        	else {
		        		content += '无数据';
		        	}
		            label.html(content);
	            }
			});
		});
	}
	
	function refresh() {
		getTimes();
	}
	
	$(function() {
		$('#select-operators').loadOps();
		$('#select-providers').loadSps();
		$('#select-cpUsers').loadCps();
		
		refresh();
		$('#search').click(refresh);
	});
	
})(jQuery);