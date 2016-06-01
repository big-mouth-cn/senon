package org.bigmouth.senon.admin.web.api;

import java.util.List;

import org.bigmouth.senon.admin.cluster.BackendAppContext;
import org.bigmouth.senon.admin.request.MDataPaginationReq;
import org.bigmouth.senon.admin.web.AbstractMVC;
import org.bigmouth.senon.admin.web.support.Builder;
import org.bigmouth.senon.admin.web.vo.RestfulResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.ltsopensource.core.commons.utils.CollectionUtils;
import com.github.ltsopensource.core.commons.utils.StringUtils;
import com.github.ltsopensource.monitor.access.domain.MDataPo;

/**
 * @author Robert HG (254963746@qq.com) on 8/21/15.
 */
@Controller
public class MonitorApi extends AbstractMVC {

    @Autowired
    private BackendAppContext appContext;

    @RequestMapping(value = "/monitor/monitor-data-get", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public RestfulResponse monitorDataGet(MDataPaginationReq request) {
        RestfulResponse response = new RestfulResponse();
        if (request.getNodeType() == null) {
            return Builder.build(false, "nodeType can not be null.");
        }
        if (request.getStartTime() == null || request.getEndTime() == null) {
            return Builder.build(false, "Search time range must be input.");
        }
        if (StringUtils.isNotEmpty(request.getIdentity())) {
            request.setNodeGroup(null);
        }

        List<? extends MDataPo> rows = null;
        switch (request.getNodeType()) {
            case JOB_CLIENT:
                rows = appContext.getBackendJobClientMAccess().querySum(request);
                break;
            case JOB_TRACKER:
                rows = appContext.getBackendJobTrackerMAccess().querySum(request);
                break;
            case TASK_TRACKER:
                rows = appContext.getBackendTaskTrackerMAccess().querySum(request);
                break;
        }
        response.setSuccess(true);
        response.setRows(rows);
        response.setResults(CollectionUtils.sizeOf(rows));
        return response;
    }

    @RequestMapping(value = "/monitor/jvm-monitor-data-get", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public RestfulResponse jvmMDataGet(MDataPaginationReq request) {
        RestfulResponse response = new RestfulResponse();
        if (request.getJvmType() == null) {
            return Builder.build(false, "jvmType can not be null.");
        }
        if (request.getStartTime() == null || request.getEndTime() == null) {
            return Builder.build(false, "Search time range must be input.");
        }
        if (StringUtils.isNotEmpty(request.getIdentity())) {
            request.setNodeGroup(null);
        }

        List<? extends MDataPo> rows = null;
        switch (request.getJvmType()) {
            case GC:
                rows = appContext.getBackendJVMGCAccess().queryAvg(request);
                break;
            case MEMORY:
                rows = appContext.getBackendJVMMemoryAccess().queryAvg(request);
                break;
            case THREAD:
                rows = appContext.getBackendJVMThreadAccess().queryAvg(request);
                break;
        }
        response.setSuccess(true);
        response.setRows(rows);
        response.setResults(CollectionUtils.sizeOf(rows));
        return response;
    }

}
