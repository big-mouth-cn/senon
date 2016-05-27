(function($) {
	
	'use strict';
	
	var defaults = {
		title: 'Modal',
		body: '',
		backdrop: true,
		shown: function() {},
		hiden: function() {},
		closeHandler: function() {},
		okHandler: function() {},
		size: '',  // lg|sm
		okBtn: 'show', // show|hide
		closeBtn: 'show', // show|hide
		headerCloseBtn: 'show', // show|hide
		keyboard: true
	};
	
	$.modal = {
		attr: {
			id : 'modal',
			label : 'modalLabel'
		},
		tags: {
			modal: null, 
			modal_dialog: null, 
			modal_content: null, 
			modal_header: null, 
			modal_header_close: null, 
			modal_header_title: null, 
			modal_body: null, 
			modal_footer: null, 
			modal_footer_close: null, 
			modal_footer_ok: null
		},
		init: function() {
			this.build();
		},
		
		modal: function() {
			return $('#' + this.attr.id);
		},
		
		open: function(options) {
			this.empty();
			
			var settings = $.extend({}, defaults, options);
			
			var title = settings.title;
			var body = settings.body;
			var close = settings.closeHandler;
			var ok = settings.okHandler;
			var size = settings.size;
			
			if (!title) {
				title = body;
			}
			this.tags.modal_header_title.text(title);
			if (body) {
				this.tags.modal_body.append(body);
			}
			if (close) {
				this.tags.modal_footer_close.bind('click', close);
			}
			if (ok) {
				this.tags.modal_footer_ok.bind('click', ok);
			}
			if (size) {
				this.tags.modal_dialog.addClass((size == 'lg') ? 'modal-lg' : 'modal-sm');
			}
			
			this.modal().bind('shown.bs.modal', function() {
				if (settings.shown) settings.shown();
			});
			this.modal().bind('hidden.bs.modal', function() {
				if (settings.hiden) settings.hiden();
			});
			if (settings.backdrop)
				this.modal().data('backdrop', settings.backdrop);
			if (typeof(settings.keyboard) == 'undefined')
				settings.keyboard = true;
			this.modal().modal({
				keyboard : (typeof(settings.keyboard) == 'undefined') || settings.keyboard
			});
			
			this.tags.modal_footer_ok.removeClass('hide');
			this.tags.modal_footer_close.removeClass('hide');
			this.tags.modal_header_close.removeClass('hide');
			if (settings.okBtn && settings.okBtn == 'hide') {
				this.hideOkButton();
			}
			if (settings.closeBtn && settings.closeBtn == 'hide') {
				this.hideCloseButton();
			}
			if (settings.okBtn && settings.okBtn == 'hide' && settings.closeBtn && settings.closeBtn == 'hide') {
				this.hideFooter();
			}
			else {
				this.showFooter();
			}
			if (settings.headerCloseBtn && settings.headerCloseBtn == 'hide') {
				this.hideHeaderCloseButton();
			}
		},
		
		close: function(callback) {
			this.modal().modal('hide');
			this.modal().on('hidden.bs.modal', function(e) {
				if (callback) callback();
			});
		},
		
		empty: function() {
			this.tags.modal_header_title.text('');
			this.tags.modal_body.empty();
			this.tags.modal_footer_close.unbind('click');
			this.tags.modal_footer_ok.unbind('click');
			this.modal().unbind('shown.bs.modal');
			this.modal().unbind('hidden.bs.modal');
			this.tags.modal_dialog.removeClass('modal-lg modal-sm');
		},
		
		hideOkButton: function() {
			this.tags.modal_footer_ok.addClass('hide');
		},
		hideCloseButton: function() {
			this.tags.modal_footer_close.addClass('hide');
		},
		hideHeaderCloseButton: function() {
			this.tags.modal_header_close.addClass('hide');
		},
		hideFooter: function() {
			this.tags.modal_footer.addClass('hide');
		},
		showFooter: function() {
			this.tags.modal_footer.addClass('show');
		},
		
		build: function() {
			if (this.modal().length > 0) {
				return;
			}
			
			this.tags.modal = $('<div class="modal fade" id="' + this.attr.id + '" tabindex="-1" role="dialog" aria-labelledby="' + this.attr.label + '" aria-hidden="false" data-backdrop="false">');
			this.tags.modal_dialog = $('<div class="modal-dialog">');
			this.tags.modal_content = $('<div class="modal-content">');
			this.tags.modal_header = $('<div class="modal-header">');
			this.tags.modal_header_close = $('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
			this.tags.modal_header_title = $('<h4 class="modal-title" id="' + this.attr.label + '"></h4>');
			this.tags.modal_body = $('<div class="modal-body">');
			this.tags.modal_footer = $('<div class="modal-footer">');
			this.tags.modal_footer_close = $('<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>');
			this.tags.modal_footer_ok = $('<button type="submit" class="btn btn-primary">确定</button>');
			
			this.tags.modal_footer.append(this.tags.modal_footer_close);
			this.tags.modal_footer.append(this.tags.modal_footer_ok);
			
			this.tags.modal_header.append(this.tags.modal_header_close);
			this.tags.modal_header.append(this.tags.modal_header_title);
			
			this.tags.modal_content.append(this.tags.modal_header);
			this.tags.modal_content.append(this.tags.modal_body);
			this.tags.modal_content.append(this.tags.modal_footer);
			
			this.tags.modal_dialog.append(this.tags.modal_content);
			
			this.tags.modal.append(this.tags.modal_dialog);
			
			$('body').append(this.tags.modal);
		}
	}
	
	$(function() {
		$.modal.init();
	});
	
})(jQuery);