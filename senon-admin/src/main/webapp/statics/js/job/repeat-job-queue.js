(function($) {

	'use strict';

	$(function() {
		LTS.colFormatter.optFormat = function (v, row) {
            var logUrl = "job-logger.htm?taskId=" + row['taskId'] + "&taskTrackerNodeGroup=" + row['taskTrackerNodeGroup'];
            return '<a class="btn btn-default btn-sm job-suspend-btn" jobId="' + row['jobId'] + '" taskTrackerNodeGroup="' + row['taskTrackerNodeGroup'] + '" href="javascript:;">暂停</a>' +
            '<a class="btn btn-danger btn-sm job-del-btn" jobId="' + row['jobId'] + '" taskTrackerNodeGroup="' + row['taskTrackerNodeGroup'] + '" href="javascript:;">删除</a>';
        }

        $(document).on("click", ".job-suspend-btn", function () {
            var that = $(this);

            var jobId = that.attr("jobId");
            var taskTrackerNodeGroup = that.attr("taskTrackerNodeGroup");
            $.modal.open({
                title : '暂停任务',
                body : '您确定要暂停该任务吗？',
                okHandler : function() {
                    $.ajax({
                        url: ctx + '/job-queue/cron-job-suspend',
                        type: 'POST',
                        dataType: 'json',
                        data: {jobId: jobId, taskTrackerNodeGroup: taskTrackerNodeGroup},
                        success: function (json) {
                            $.modal.close();
                            if (json && json.success) {
                                Toast.success("暂停成功!");
                                that.parents("tr").remove();
                            } else {
                                Toast.danger(json['msg']);
                            }
                        }
                    });
                }
            });
        });

        $(document).on("click", ".job-del-btn", function () {
            var that = $(this);

            var jobId = that.attr("jobId");
            var taskTrackerNodeGroup = that.attr("taskTrackerNodeGroup");
            $.modal.open({
                title : '删除任务',
                body : '您确定要删除该任务吗？',
                okHandler : function() {
                    $.ajax({
                        url: ctx + '/job-queue/cron-job-delete',
                        type: 'POST',
                        dataType: 'json',
                        data: {jobId: jobId, taskTrackerNodeGroup: taskTrackerNodeGroup},
                        success: function (json) {
                            $.modal.close();
                            if (json && json.success) {
                                Toast.success("删除成功!");
                                that.parents("tr").remove();
                            } else {
                                Toast.danger(json['msg']);
                            }
                        }
                    });
                }
            });
        });

		var ltsTable = $("#jobtable-container").ltsTable({
            url: ctx + '/job-queue/repeat-job-get',
            templateId: 'ltstable'
        });

        $(document).on("click", "#search", function () {
            var params = {};
            $.each($('.form .form-control'), function () {
                var name = $(this).attr("name");
                var value = $(this).val();
                params[name] = value;
            });
            ltsTable.post(params, 1);
        });
        $("#search").trigger("click");
	});

})(jQuery);