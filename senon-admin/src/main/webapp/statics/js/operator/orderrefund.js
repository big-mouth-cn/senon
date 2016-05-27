(function($) {
	
	$(function() {
		initSearch();
		list();
	});

	var params = {
		'pageNo' : 1
	};
	
	function initSearch() {
		$('#search').click(function() {
			params.pageNo = 1;
			
			list();
		});
	}
	
	function initPageEvent() {
		var alink = $('.pagination a');
		$.each(alink, function(index, item) {
			var pageNo = $(this).attr('index');
			if (pageNo) {
				$(this).click(function() {
					$('.pagination li').removeClass('active');
					$(this).parent().addClass('active');
					params.pageNo = pageNo;
					list();
				});
			}
		});
	}
	
	function list() {
		$.getJSON(ctx + '/operator/refund/list', params, function(data) {
			var result = data.result;
			$('#order tbody tr:not(.empty)').remove();
			if (result && result.length > 0) {
				$('#order tbody tr.empty').hide();
				$.each(result, function(index, item) {
					var $tr = $('<tr>').addClass('animated').attr('orderid', item.orderId);

					var td1 = $('<td>').append(item.refundId);
					var td2 = $('<td>').append(item.orderId);
					var td3 = $('<td>').append(item.mobile);
					var td4 = $('<td>').append(item.providerRefunded == 1 ? '已退款' : '未退款');
					var td5 = $('<td>').append(DateUtils.format(item.createTime, 'yyyy-MM-dd hh:mm:ss'));
					var td6 = $('<td>').append(item.modifyTime ? DateUtils.format(item.modifyTime, 'yyyy-MM-dd hh:mm:ss') : '-');
					var td7 = $('<td>').append();
					
					var $modify = $('<button class="btn btn-xs btn-default">编辑</button>');
					$modify.click(function() {
						$.refund({ orderId : item.orderId });
					});
					td7.append($modify);
					
					$tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7);
					
					$('#order tbody').append($tr);
				});
			}
			else {
				$('#order tbody tr.empty').show();
			}
			$('#order .tfoot').empty();
			$('#order .tfoot').html(data.pageSource);
			initPageEvent();
		});
	}
})(jQuery);