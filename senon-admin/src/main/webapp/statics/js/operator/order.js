(function($) {
	
	$(function() {
		initSearch();
		list();
	});

	var params = {
		'pageNo' : 1,
		'cpUser' : '',
		'providerCode' : '',
		'orderId' : '',
		'cellphoneNumber' : '',
		'status' : '2'
	};
	
	function initSearch() {
		$('#cpUser').loadCps();
		$('#providerCode').loadSps();
		$('#search').click(function() {
			params.pageNo = 1;
			params.cpUser = $('#cpUser').val();
			params.providerCode = $('#providerCode').val();
			params.orderId = $('#orderId').val();
			params.cellphoneNumber = $('#cellphoneNumber').val();
			params.status = $('#status').val();
			
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
		$.getJSON(ctx + '/operator/order/list', params, function(data) {
			var result = data.result;
			$('#order tbody tr:not(.empty)').remove();
			if (result && result.length > 0) {
				$('#order tbody tr.empty').hide();
				$.each(result, function(index, item) {
					var $tr = $('<tr>').addClass('animated').attr('orderid', item.orderId);
					
					var td1 = $('<td>').append(item.cpUser);
					var td2 = $('<td>').append(item.providerCode);
					var td3 = $('<td>').append(item.orderId);
					var td4 = $('<td>').append(item.bzCode);
					var td5 = $('<td>').append(item.cellphoneNumber);
					var td6 = $('<td>').append(item.amountComment);
					var td7 = $('<td>').append(item.settlePrice);
					
					var status = item.status == 1 ? '充值成功' :
						item.status == 2 ? '充值中' :
							item.status == 9 ? '待提交' :
								item.status == 10 ? '无资源' :
								'充值失败';
					
					var td8 = $('<td name="status">').append(status);
					var td9 = $('<td>').append(item.createTimeComment);
					var td11 = $('<td>').append(item.status == 1 || item.status == 0 ? dateFormat((item.modifyTime-item.createTime)/1000) : '-');
					var td10 = $('<td>').append();
					
					var group = $('<div class="btn-group" role="group" aria-label="...">');
					
					td10.append(group);
					var $btnDetail = $('<button class="btn btn-xs btn-default">详情</button>');
					$btnDetail.click(function() {
						var $detailbody = $('<table class="table">');
						
						var tbody = $('<tbody>');
						tbody.append($('<tr>').append('<td colspan="2" style="background-color:#f5f6fa;"><b>订单明细</b></td>'));
						tbody.append($('<tr>').append('<td>订单号</td>').append('<td>' + item.orderId + '</td>'));
						tbody.append($('<tr>').append('<td>手机号码</td>').append('<td>' + item.cellphoneNumber + '</td>'));
						tbody.append($('<tr>').append('<td>流量包</td>').append('<td>' + item.amountComment + ' (' + item.bzCode + ')</td>'));
						tbody.append($('<tr>').append('<td>当前状态</td>').append('<td>' + status + '</td>'));
						tbody.append($('<tr>').append('<td>创建时间</td>').append('<td>' + item.createTimeComment + '</td>'));
						tbody.append($('<tr>').append('<td>最后更新</td>').append('<td>' + item.modifyTimeComment + '</td>'));
						tbody.append($('<tr>').append('<td colspan="2" style="background-color:#f5f6fa;"><b>商户明细</b></td>'));
						tbody.append($('<tr>').append('<td>商户信息</td>').append('<td>' + item.cpUser + '</td>'));
						tbody.append($('<tr>').append('<td colspan="2" style="background-color:#f5f6fa;"><b>供应商明细</b></td>'));
						if (item.providerOrderId)
							tbody.append($('<tr>').append('<td>供应商订单号</td>').append('<td>' + item.providerOrderId + '</td>'));
						if (item.providerOrderStatusCode)
							tbody.append($('<tr>').append('<td>供应商响应码</td>').append('<td>' + item.providerOrderStatusCode + '</td>'));
						if (item.providerOrderContent)
							tbody.append($('<tr>').append('<td>供应商订单描述</td>').append('<td>' + item.providerOrderContent + '</td>'));
						if (item.providerProductId)
							tbody.append($('<tr>').append('<td>供应商产品编号</td>').append('<td>' + item.providerProductId + '</td>'));
						if (item.providerOrderStatus)
							tbody.append($('<tr>').append('<td>供应商订单状态</td>').append('<td>' + item.providerOrderStatus + '</td>'));
						if (item.providerCreateTime)
							tbody.append($('<tr>').append('<td>供应商创建时间</td>').append('<td>' + item.providerCreateTime + '</td>'));
						
						$detailbody.append(tbody);
						
						$.modal.open({
							title : '订单详情',
							body : $detailbody,
							okBtn : 'hide',
							closeBtn : 'hide'
						});
					});
					group.append($btnDetail);
					
					var $btnSuccess = $('<button class="btn btn-xs btn-success manual">成功</button>');
					var $btnFail = $('<button class="btn btn-xs btn-danger manual">失败</button>');
					var $btnRefund = $('<button class="btn btn-xs btn-info">退款</button>');
					if (item.status == 1) {
						$btnRefund.click(function() {
							$.refund({ orderId : item.orderId });
						});
						group.append($btnRefund);
					}
					if (item.status == 2) {
						$btnSuccess.click(function() {
							$.modal.open({
								title : '手动处理',
								body : '您确定要将订单【'+item.orderId+'】设置为<span class="text-success">充值成功</span>吗?',
								okBtn : 'show',
								closeBtn : 'show',
								okHandler: function() {
									$.modal.close();
									manual(item.orderId, true);
								}
							});
						});
						group.append($btnSuccess);
					}
					if (item.status == 2 || item.status == 9) {
						$btnFail.click(function() {
							$.modal.open({
								title : '手动处理',
								body : '您确定要将订单【'+item.orderId+'】设置为<span class="text-danger">充值失败</span>吗?',
								okBtn : 'show',
								closeBtn : 'show',
								okHandler: function() {
									$.modal.close();
									manual(item.orderId, false);
								}
							});
						});
						group.append($btnFail);
					}
					
					$tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td8).append(td9).append(td11).append(td10);
					
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
	
	function manual(orderId, flag, callback) {
		return new function() {
			var $tr = $('tr[orderid="'+orderId+'"]');
			
			$tr.find('.manual').hide();
			$.getJSON(ctx + '/operator/order/manual', {
				orderId : orderId,
				success : flag
			}, function(data) {
				if (callback) callback(data);
				if (data) {
					$tr.addClass('bounceOut');
					Toast.success('订单手动处理成功!');
					setTimeout(function() { 
						$tr.removeClass('bounceOut').addClass('fadeIn') 
						$tr.find('td[name="status"]').empty().append(flag ? '充值成功' : '充值失败');
					}, 1000);
				}
				else {
					$tr.find('.manual').fadeIn();
					Toast.danger('订单手动处理失败!');
				}
			});
		}
	}
	
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
	
})(jQuery);