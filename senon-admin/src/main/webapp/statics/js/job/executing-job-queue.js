(function() {

	'use strict';

	$(function() {

		LTS.colFormatter.optFormat = function (v, row) {
            var logUrl = "job-logger.htm?realTaskId=" + row['realTaskId'] + "&taskTrackerNodeGroup=" + row['taskTrackerNodeGroup'];
            return '<a target="_blank" href="' + logUrl + '"><span class="label label-info"><i class="fa fa-file-code-o"></i> 日志</span></a>&nbsp;' +
                    '<a href="javascript:;" class="job-edit-btn"><span class="label label-success"><i class="fa fa-edit"></i> 编辑</span><span class="hidden lts-data">' + JSON.stringify(row) + '</span></a>&nbsp;' +
                    '<a href="javascript:;" class="job-del-btn" jobId="' + row['jobId'] + '" cronExpression="' + row['cronExpression'] + '" taskTrackerNodeGroup="' + row['taskTrackerNodeGroup'] + '"><span class="label label-primary" style="background-color: #DD6B55;"><i class="fa fa-trash-o"></i> 删除</span></a>';
        }

		var ltsTable = $("#jobtable-container").ltsTable({
            url: ctx + '/job-queue/executing-job-get',
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