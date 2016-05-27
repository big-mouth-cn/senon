(function($) {
	
	$(function() {
		initSearch();
		list();
	});

	var params = {
		'pageNo' : 1,
		'cpUser' : ''
	};
	
	function initSearch() {
		$('#cpUser').loadCps();
		
		$('#search').click(function() {
			params.pageNo = 1;
			params.cpUser = $('#cpUser').val();
			
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
		$.getJSON(ctx + '/operator/cp/list', params, function(data) {
			var result = data.result;
			$('#cp tbody tr:not(.empty)').remove();
			if (result && result.length > 0) {
				$('#cp tbody tr.empty').hide();
				$.each(result, function(index, item) {
					var $tr = $('<tr>').addClass('animated').attr('cpUser', item.cpUser);
					
					var td1 = $('<td>').append(item.cpUser);
					var td2 = $('<td>').append(item.accountUser);
					var td3 = $('<td>').append(item.accountName);
					var td4 = $('<td>').append(item.contacts);
					var td5 = $('<td>').append(item.cellphone);
					var td6 = $('<td>').append(item.companyName);
					var mode = item.mode == 0 ? '批发' :
						item.mode == 1 ? '分成' :
							'无效';
					var td7 = $('<td>').append(mode);
					var td9 = $('<td>').append(item.mode == 0 ? (item.balance/100).toFixed(2) : (item.totalProfit/100).toFixed(2));
					var td10 = $('<td>').append(item.mode == 0 ? (item.used/100).toFixed(2) : (item.totalSales/100).toFixed(2));
					var td11 = $('<td>');
					
//					var $recharge = $('<button class="btn btn-xs btn-success">充值</button>');
//					$recharge.click(function() {
//						openRechargeDialog(item)();
//					});
//					
//					td11.append($recharge)
					
					$tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td9).append(td10).append(td11);
					
					$('#cp tbody').append($tr);
				});
			}
			else {
				$('#cp tbody tr.empty').show();
			}
			$('#cp .tfoot').empty();
			$('#cp .tfoot').html(data.pageSource);
			initPageEvent();
		});
	}
	
	function openRechargeDialog(item) {
		return function() {
			var $body = $('<div>');
			$body.append('<div class="alert alert-info">您正在为账号【'+item.accountName+'('+item.cpUser+')】进行余额充值</div>');
			
			var slt = 
				'<div class="form-group">' + 
				'    <label class="col-sm-2 control-label">充值类型</label>' + 
				'    <div class="col-sm-10">' +
				'    <select class="form-control" id="type">' + 
				'      <option value="0">正常加款</option>' +
				'      <option value="1">授信加款</option>' +
				'      <option value="4">测试加款</option>' +
				'      <option value="7">提现扣款</option>' +
				'    </select>' +
				'    </div>' +
				'</div>';
			var ipt = 
				'<div class="form-group">' + 
				'    <label class="col-sm-2 control-label">充值金额</label>' + 
				'    <div class="col-sm-10">' +
				'    <input type="text" class="form-control" id="payMoney" placeholder="充值金额（元）">' + 
				'    </div>' + 
				'</div>';
			var sltop = 
				'<div class="form-group">' + 
				'    <label class="col-sm-2 control-label">操作人</label>' + 
				'    <div class="col-sm-10">' +
				'    <select class="form-control" id="opeName">' + 
				'      <option value="Doug">Doug</option>' +
				'      <option value="Shuo">Shuo</option>' +
				'      <option value="Allen">Allen</option>' +
				'    </select>' +
				'    </div>' + 
				'</div>';
			var remark = 
				'<div class="form-group">' + 
				'    <label class="col-sm-2 control-label">备注</label>' + 
				'    <div class="col-sm-10">' +
				'    <input type="text" class="form-control" id="remark" placeholder="本次充值备注">' + 
				'    </div>' + 
				'</div>';
			var $form = $('<form class="form-horizontal">');
			
			$body.append($form.append(slt).append(ipt).append(sltop).append(remark));
			
			var wait = [];
			if (wait && wait.length > 0) {
				// Have wait for pay orders.
				$body.append($('<hr>'));
				$body.append($('<div class="alert alert-info">').append('以下是该商户未结清的授信款项'));
				var $tbl = $('<table class="table">');
				var thead = $('<thead>');
				var theadtr = $('<tr>');
				theadtr.append('<th>时间</th>');
				theadtr.append('<th>充值金额</th>');
				theadtr.append('<th>操作人</th>');
				theadtr.append('<th>备注</th>');
				theadtr.append('<th></th>');
				$tbl.append(thead.append(theadtr));
				$.each(wait, function(i, item) {
					$tr = $('<tr>');
					$tr.append('<td>' +DateUtils.format(item.createTime, 'MM/dd hh:mm')+ '</td>');
					$tr.append('<td class="text-right">' +(item.payMoney/100).toFixed(2)+ '</td>');
					$tr.append('<td>' +item.opeName+ '</td>');
					$tr.append('<td>' +item.remark+ '</td>');
					$repay = $('<button class="btn btn-xs btn-default">').text('已结清');
					tdop = $('<td class="text-right">').append($repay);
					$tr.append(tdop);
					$tbl.append($tr);
				});
				$body.append($tbl);
			}
			
			
			$.modal.open({
				title : '账号充值',
				body : $body,
				keyboard : false,
				shown : function() {
					$body.find('#payMoney').focus();
				},
				okHandler : function() {
					var type = $body.find('#type').val();
					var cpUser = item.cpUser;
					var payMoney = $body.find('#payMoney').val();
					var opeName = $body.find('#opeName').val();
					var remark = $body.find('#remark').val();
					if (!payMoney) {
						$body.find('#payMoney').focus();
						return;
					}
					$.getJSON(ctx + '/operator/cp/recharge', {
						cpUser : cpUser,
						iptAmount : payMoney,
						opeName : opeName,
						type : type,
						remark : remark
					}, function(result) {
						if (result.statusCode == 200) {
							$.modal.close(function() {
								list();
							});
							Toast.success('充值成功!');
						}
						else {
							Toast.danger(result.message);
						}
					});
				}
			});
		}
	}
	
	function queryWaitForPay(cpUser, callback) {
		$.getJSON(ctx + '/operator/cp/waitForPay', { cpUser : cpUser }, function(json) {
			callback(json);
		});
	}
})(jQuery);