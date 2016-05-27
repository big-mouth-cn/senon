(function($) {
	
	$.refund = function(options) {
		refundClick(options.orderId);
	}
	
	function refundClick(orderId) {
		var queryFun = function(flag, refundItem) {
			var body = $('<div>');
			body.append('<div class="alert alert-warning">您正在为订单【'+orderId+'】退款，请务必确定该订单流量未到账。</div>');
			var chk = '<div class="radio">'+
						'<label class="radio-inline">'+
						'  <input type="radio" name="spHasRefund" value="1"> 供应商已退款'+
						'</label>'+
						'<label class="radio-inline">'+
						'  <input type="radio" name="spHasRefund" value="0"> 供应商未退款'+
						'</label>'+
					  '</div>';
			body.append(chk);
			body.append('<textarea class="form-control" name="remark" rows="5" style="width:100%;" placeholder="填写未到账描述和凭证"></textarea>');
			if (flag) {
				body.find('.alert').removeClass('alert-warning').addClass('alert-success').text('当前订单【'+orderId+'】已完成退款，退款单号：' + refundItem.refundId);
				body.find('input[name="spHasRefund"][value='+refundItem.providerRefunded+']').attr('checked', true);
				body.find('textarea[name="remark"]').val(refundItem.remark);
			}
			else {
				body.find('input[name="spHasRefund"][value=0]').attr('checked', true);
			}
			
			$.modal.open({
				title : '订单退款',
				body : body,
				okBtn : 'show',
				closeBtn : 'show',
				shown : function() {
					body.find('textarea[name="remark"]').focus();
				},
				okHandler: function() {
					var $r = body.find('input[name="spHasRefund"]:checked');
					var $m = body.find('textarea[name="remark"]');
					refund(flag, orderId, $r.val(), $m.val(), function(flag) {
						if (flag) {
							$.modal.close();
						}
					});
				}
			});
		}

		queryRefund(orderId, queryFun);
	}
	
	function queryRefund(orderId, callback) {
		return new function() {
			$.getJSON(ctx + '/operator/refund/q', {
				orderId : orderId
			}, function(rst) {
				if (rst.statusCode == 200) {
					callback(true, rst.data);
				}
				else {
					callback(false);
				}
			});
		}
	}
	
	function refund(refunded, orderId, isRefund, remark, callback) {
		return new function() {
			$.getJSON(ctx + '/operator/refund/do', {
				orderId : orderId,
				spHasRefund : isRefund,
				remark : remark
			}, function(rst) {
				if (rst.statusCode == 200) {
					if (refunded)
						Toast.success('退款单信息修改成功');
					else 
						Toast.success('订单退款成功');
				}
				else {
					Toast.danger(rst.message);
				}
				callback((rst.statusCode == 200));
			});
		}
	}
	
})(jQuery);