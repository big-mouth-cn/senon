(function($) {
	
	$.fn.loadOps = function() {
		var self = $(this);
		var array = [
		             {code:0, name:'中国移动'},
		             {code:1, name:'中国联通'},
		             {code:2, name:'中国电信'}
		];
		appendEmpty(self, '运营商');
		$.each(array, function(i, item) {
			var opt = $('<option>');
			opt.val(item.code).text(item.name);
			self.append(opt);
		});
	}
	
	$.fn.loadSps = function() {
		var self = $(this);
		$.getJSON(ctx + '/meta/providers', function(json) {
			appendEmpty(self, '供应商');
			$.each(json, function(i, item) {
				var opt = $('<option>');
				opt.val(item.typeCode).text(item.typeCode + ' - ' + item.name);
				self.append(opt);
			});
		});
	}
	
	$.fn.loadCps = function() {
		var self = $(this);
		$.getJSON(ctx + '/meta/cps', function(json) {
			appendEmpty(self, '商户');
			$.each(json, function(i, item) {
				var opt = $('<option>');
				opt.val(item.cpUser).text(item.cpUser + ' - ' + item.accountName);
				self.append(opt);
			});
		});
	}
	
	function appendEmpty(select, text) {
		select.append('<option value="">全部'+text+'</option>');
	}
})(jQuery);