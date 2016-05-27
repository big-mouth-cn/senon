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
	
	function getProviders() {
		$('#provider').empty();
		$.getJSON("monitor_of_tape_providers", {
			'opCode' : $('#select-operators').val(),
			'providerId' : $('#select-providers').val(),
			'cpUser' : $('#select-cpUsers').val()
		}, function(data) {
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var $source = 
				$('<div class="col-md-4">' +
				'	<div class="col-md-3" style="text-align: left;">' + item.providerName + '</div>' +
				'	<div class="col-md-9">' +
				'		<div class="progress">' +
				'		  <div class="progress-bar" style="text-shadow: 1px 1px 3px #000; width: ' + item.successRatio + '%;">' +
				'			' + item.successRatio + '%' +
				'		  </div>' +
				'		</div>' +
				'	</div>' +
				'</div>');
				if (item.successRatio > 90) {
					$source.find('.progress-bar').addClass('progress-bar-success');
				}
				else if (item.successRatio > 80) {
					$source.find('.progress-bar').addClass('progress-bar-info');
				}
				else if (item.successRatio > 70) {
					$source.find('.progress-bar').addClass('progress-bar-warning');
				}
				else {
					$source.find('.progress-bar').addClass('progress-bar-danger');
				}
				$source.find('.progress').attr('title', '成功率:' + item.success + '/' + (item.fail+item.success+item.doing));
				$('#provider').append($source);
			}
		});
	}
	
	function getOps() {
		$.getJSON("monitor_of_tape_ops", {
			'opCode' : $('#select-operators').val(),
			'providerId' : $('#select-providers').val(),
			'cpUser' : $('#select-cpUsers').val()
		}, function(data) {
			$('#op').empty();
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var $source = 
					$('<div class="col-md-4">' +
							'	<div class="col-md-3" style="text-align: left;">' + item.opName + '</div>' +
							'	<div class="col-md-9">' +
							'		<div class="progress">' +
							'		  <div class="progress-bar" style="text-shadow: 1px 1px 3px #000; width: ' + item.successRatio + '%;">' +
							'			' + item.successRatio + '%' +
							'		  </div>' +
							'		</div>' +
							'	</div>' +
					'</div>');
				if (item.successRatio > 90) {
					$source.find('.progress-bar').addClass('progress-bar-success');
				}
				else if (item.successRatio > 80) {
					$source.find('.progress-bar').addClass('progress-bar-info');
				}
				else if (item.successRatio > 70) {
					$source.find('.progress-bar').addClass('progress-bar-warning');
				}
				else {
					$source.find('.progress-bar').addClass('progress-bar-danger');
				}
				$source.find('.progress').attr('title', '成功率:' + item.success + '/' + (item.fail+item.success+item.doing));
				$('#op').append($source);
			}
		});
	}
	
	function getCps() {
		$.getJSON("monitor_of_tape_cps", {
			'opCode' : $('#select-operators').val(),
			'providerId' : $('#select-providers').val(),
			'cpUser' : $('#select-cpUsers').val()
		}, function(data) {
			$('#cp').empty();
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var $source = 
					$('<div class="col-md-4">' +
							'	<div class="col-md-3" style="text-align: left;">' + item.cpName + '</div>' +
							'	<div class="col-md-9">' +
							'		<div class="progress">' +
							'		  <div class="progress-bar" style="text-shadow: 1px 1px 3px #000; width: ' + item.successRatio + '%;">' +
							'			' + item.successRatio + '%' +
							'		  </div>' +
							'		</div>' +
							'	</div>' +
					'</div>');
				if (item.successRatio > 90) {
					$source.find('.progress-bar').addClass('progress-bar-success');
				}
				else if (item.successRatio > 80) {
					$source.find('.progress-bar').addClass('progress-bar-info');
				}
				else if (item.successRatio > 70) {
					$source.find('.progress-bar').addClass('progress-bar-warning');
				}
				else {
					$source.find('.progress-bar').addClass('progress-bar-danger');
				}
				$source.find('.progress').attr('title', '成功率:' + item.success + '/' + (item.fail+item.success+item.doing));
				$('#cp').append($source);
			}
		});
	}
	
	function getProvinces() {
		$.getJSON("monitor_of_tape_provinces", {
			'opCode' : $('#select-operators').val(),
			'providerId' : $('#select-providers').val(),
			'orderBy' : 'SUCCESS_ASC',
			'cpUser' : $('#select-cpUsers').val()
		}, function(data) {
			var series = {};
			$('#province_table tbody').empty();
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				for (var j = 0; j < mapCodes.length; j++) {
					var mapCode = mapCodes[j];
					var regx = new RegExp("^(.*" + mapCode.name + ".*)$");
					if (regx.test(item.provinceName)) {
						var value = series[mapCode.code];
						series[mapCode.code] = (value > 0) ? (value + item.successRatio) : item.successRatio;
						data[i].mapCode = mapCode.code;
					}
				}
				
				// table
				var $tr = $('<tr>');
				if (i % 2) {
					$tr.append('<td>' + data[i-1].provinceName + '</td>');
					$tr.append('<td>' + data[i-1].successRatio + '%</td>');
					$tr.append('<td>' + item.provinceName + '</td>');
					$tr.append('<td>' + item.successRatio + '%</td>');
					$('#province_table tbody').append($tr);
				}
				else if (i + 1 == data.length) {
					$tr.append('<td>' + item.provinceName + '</td>');
					$tr.append('<td>' + item.successRatio + '%</td>');
					$tr.append('<td></td>');
					$tr.append('<td></td>');
					$('#province_table tbody').append($tr);
				}
			}
			
			$('#province').empty();
			var map = new jvm.WorldMap({ 
				map: 'cn_merc_en', // cn_merc_en, world_mill_en
				container : $('#province'),
				series: {
			        regions: [{
			          scale: [
			            '#FF0000',
						'#FFFFFF'
			          ],
			          attribute: 'fill',
			          values: series
			        }]
		        },
		        onRegionLabelShow: function(event, label, code){
		        	var content = '<p><b>' + label.html() + '</b></p>';
		        	if (typeof(series[code]) != 'undefined') {
		        		content += '成功率:'+series[code]+'%<br>';
		        		$(data).each(function(i, item) {
		        			if (item.mapCode == code) {
		        				content += ' ' + '订单数:' + item.success + '/' + (item.fail+item.success+item.doing);
		        			}
		        		});
		        	}
		        	else {
		        		content += '无订单';
		        	}
		            label.html(content);
	            }
			});
		});
	}
	
	function refresh() {
		getProviders();
		getOps();
		getCps();
		getProvinces();
	}
	
	$(function() {
		$('#select-operators').loadOps();
		$('#select-providers').loadSps();
		$('#select-cpUsers').loadCps();
		
		refresh();
		$('#search').click(refresh);
	});
	
})(jQuery);