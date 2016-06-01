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

// ---------- senon -------------- //
var LTS = {
    colFormatter: {},
    ReExp: {
        time: /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/,         // yyyy-MM-dd HH:mm:ss
        number: /^\d+$/              // 正整数
    }
};

/**
 * 将JSON对象转为字符串
 */
LTS.colFormatter.stringifyJSON = function (v) {
    return v ? JSON.stringify(v) : v;
};

LTS.colFormatter.needFeedbackLabel = function (v) {
    return v ? "YES" : "NO";
};

LTS.colFormatter.jobTypeFormat = function (v) {
    if (v == 'CRON') {
        return "Cron Task";
    } else if (v == "REPEAT") {
        return "Repeat Task";
    } else if (v == 'REAL_TIME') {
        return "RealTime Task";
    } else if (v == 'TRIGGER_TIME') {
        return "Timer";
    }
    return v;
};

LTS.colFormatter.formatRelyOnPrevCycle = function (v) {
    return v ? "YES" : "NO";
};

LTS.colFormatter.formatGroup = function (v, row) {
    if (row.nodeType == 'JOB_CLIENT' || row.nodeType == 'TASK_TRACKER') {
        return v;
    } else {
        return "";
    }
};

LTS.colFormatter.formatRetryTimes = function (v, row) {
    return row['retryTimes'] + "/" + row['maxRetryTimes'];
};

LTS.colFormatter.repeatIntervalFormat = function (v, row) {
    if (!row['repeatInterval']) {
        return "";
    }
    return row['repeatInterval'] + "ms";
};

LTS.colFormatter.repeatCountFormat = function (v, row) {
    if (!row['repeatInterval']) {
        return "";
    }
    if (row['repeatCount'] == -1) {
        return row['repeatedCount'] + '/(无限)';
    }
    return row['repeatedCount'] + '/' + (row['repeatCount'])
};

template.defaults.escape = false; // 关闭转移功能
template.helper('dateFormat', function (date, format) {
    if (!date) {
        return "";
    }
    return DateUtil.format(date, format);
});

template.helper('format', function (v, colFormatter, row) {
    var formatterFn = LTS.colFormatter[colFormatter];
    return formatterFn ? formatterFn(v, row) : obj;
});

/**
 * 封装的分页表格
 */
function LtsTable(options) {
    this.cachedParams = {};

    //var defaultOpts = {
    //    url: '',
    //    templateId: '',
    //    pageSize: 10,
    //    container: null
    //};

    this.container = options.container;
    this.pageSize = options.pageSize || 10;
    this.templateId = options.templateId;
    this.url = options.url;

    var _this = this;

    _this.renderEmpty = function () {
        _this.render({}, 0, {}, 1);
    };

    _this.render = function (rows, results, params, curPage) {
        var html = template(_this.templateId, {rows: rows, results: results, pageSize: _this.pageSize});
        _this.container.html(html);
        //_this.container.children('table').footable();

        if (results == 0) results = 1;
        _this.container.find(".pagination-sm").twbsPagination({
            totalPages: (results % _this.pageSize == 0) ? results / _this.pageSize : results / _this.pageSize + 1,
            visiblePages: 7,
            startPage: curPage,
            first: '«',
            prev: '‹',
            next: '›',
            last: '»',
            onPageClick: function (event, page) {
                _this.post(_this.cachedParams, page);
            }
        });
    };

    _this.post = function (params, curPage) {
        params['start'] = (curPage - 1) * _this.pageSize;
        params['limit'] = _this.pageSize;
        $.ajax({
            url: _this.url,
            type: 'POST',
            dataType: 'json',
            data: params,
            success: function (json) {                
                if (json && json.success) {
                    _this.cachedParams = params;
                    var results = json['results'];
                    var rows = json['rows'];
                    _this.render(rows, results, params, curPage);
                } else {
                    if (json) {
                        Toast.danger(json['msg']);
                    }
                }
            }
        });
    };
}

jQuery.fn.extend({
    ltsTable: function (options) {
        var container = $(this);
        var opts = {};
        $.extend(opts, options, {container: container});
        return new LtsTable(opts);
    }
});