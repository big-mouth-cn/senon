$(document).ajaxStart(function() {
	NProgress.start();
}).ajaxComplete(function(event, request, settings) {
	NProgress.done();
});

var Tag = {
	medially: function(o) {
		var height = $(o).outerHeight();
		var wh = $(window).height();
		$(o).css('margin-top', (wh - height)/2);
	}
};

var StringUtils = {
	isBlank: function(string) {
		return !string || string.length <= 0;
	},
	isNotBlank: function(string) {
		return !this.isBlank(string);
	}
};

var Btn = {
	loading: function(e) {
		$(e.target).data('reset', $(e.target).text()).text($(e.target).data('loading')).prop('disabled', true);
	},
	reset: function(e) {
		$(e.target).text($(e.target).data('reset')).prop('disabled', false);
	},
	text: function(e, regx) {
		$(e.target).text($(e.target).data(regx));
	}
};

// ----------- Date -------------- //
Date.prototype.Format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
var DateUtils = {
	format : function(time, pattern) {
		var date = new Date();
		date.setTime(time);
		return date.Format(pattern);
	}
};

// --------- toast ---------- //
var Toast = {
	info: function(t) {
		Toast.open(t, 'info');
	},
	success: function(t) {
		Toast.open(t, 'success');
	},
	danger: function(t) {
		Toast.open(t, 'danger');
	},
	open: function(t, type) {
		$.bootstrapGrowl(t, {
		  type: type,
	      align: 'center',
	      width: 'auto',
	      delay: 2000,
	      offset: {
	        from: "top",
	        amount: ($(window).height()-50)/2
	      },
	      allow_dismiss: false
		});
	}
};

// --------- event listener ------- //
$(function() {
	
	$('#logout').bind('click', function() {
		$.modal.open({
			title : '安全退出',
			body : '您确定要退出系统吗?',
			okHandler: function() {
				location.href = ctx + '/logout';
			}
		});
	});
});