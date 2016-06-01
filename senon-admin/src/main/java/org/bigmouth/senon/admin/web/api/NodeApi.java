package org.bigmouth.senon.admin.web.api;

import java.util.ArrayList;
import java.util.List;

import org.bigmouth.senon.admin.access.domain.NodeOnOfflineLog;
import org.bigmouth.senon.admin.cluster.BackendAppContext;
import org.bigmouth.senon.admin.request.NodeGroupRequest;
import org.bigmouth.senon.admin.request.NodeOnOfflineLogPaginationReq;
import org.bigmouth.senon.admin.request.NodePaginationReq;
import org.bigmouth.senon.admin.web.AbstractMVC;
import org.bigmouth.senon.admin.web.vo.RestfulResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.ltsopensource.admin.response.PaginationRsp;
import com.github.ltsopensource.core.cluster.Node;
import com.github.ltsopensource.core.cluster.NodeType;
import com.github.ltsopensource.core.commons.utils.CollectionUtils;
import com.github.ltsopensource.core.domain.NodeGroupGetReq;
import com.github.ltsopensource.queue.domain.NodeGroupPo;

/**
 * @author Robert HG (254963746@qq.com) on 5/11/15.
 */
@Controller
@RequestMapping("/node")
public class NodeApi extends AbstractMVC {

    @Autowired
    private BackendAppContext appContext;

    @RequestMapping("node-list-get")
    @ResponseBody
    public RestfulResponse getNodeList(NodePaginationReq request) {
        RestfulResponse response = new RestfulResponse();

        List<Node> nodes = appContext.getBackendRegistrySrv().getOnlineNodes(request);

        response.setSuccess(true);
        response.setResults(CollectionUtils.sizeOf(nodes));
        response.setRows(nodes);

        return response;
    }

    @RequestMapping("registry-re-subscribe")
    @ResponseBody
    public RestfulResponse reSubscribe() {
        RestfulResponse response = new RestfulResponse();

        appContext.getBackendRegistrySrv().reSubscribe();

        response.setSuccess(true);
        return response;
    }

    @RequestMapping("node-group-get")
    @ResponseBody
    public RestfulResponse getNodeGroup(NodeGroupRequest request) {
        RestfulResponse response = new RestfulResponse();
        NodeGroupGetReq nodeGroupGetReq = new NodeGroupGetReq();
        nodeGroupGetReq.setNodeGroup(request.getNodeGroup());
        nodeGroupGetReq.setNodeType(request.getNodeType());
        PaginationRsp<NodeGroupPo> paginationRsp = appContext.getNodeGroupStore().getNodeGroup(nodeGroupGetReq);

        response.setResults(paginationRsp.getResults());
        response.setRows(paginationRsp.getRows());
        response.setSuccess(true);
        return response;
    }

    @RequestMapping("node-group-add")
    @ResponseBody
    public RestfulResponse addNodeGroup(NodeGroupRequest request) {
        RestfulResponse response = new RestfulResponse();
        appContext.getNodeGroupStore().addNodeGroup(request.getNodeType(), request.getNodeGroup());
        if (NodeType.TASK_TRACKER.equals(request.getNodeType())) {
            appContext.getExecutableJobQueue().createQueue(request.getNodeGroup());
        } else if (NodeType.JOB_CLIENT.equals(request.getNodeType())) {
            appContext.getJobFeedbackQueue().createQueue(request.getNodeGroup());
        }
        response.setSuccess(true);
        return response;
    }

    @RequestMapping("node-group-del")
    @ResponseBody
    public RestfulResponse delNodeGroup(NodeGroupRequest request) {
        RestfulResponse response = new RestfulResponse();
        appContext.getNodeGroupStore().removeNodeGroup(request.getNodeType(), request.getNodeGroup());
        if (NodeType.TASK_TRACKER.equals(request.getNodeType())) {
            appContext.getExecutableJobQueue().removeQueue(request.getNodeGroup());
        } else if (NodeType.JOB_CLIENT.equals(request.getNodeType())) {
            appContext.getJobFeedbackQueue().removeQueue(request.getNodeGroup());
        }
        response.setSuccess(true);
        return response;
    }

    @RequestMapping("node-onoffline-log-get")
    @ResponseBody
    public RestfulResponse delNodeGroup(NodeOnOfflineLogPaginationReq request) {
        RestfulResponse response = new RestfulResponse();
        Long results = appContext.getBackendNodeOnOfflineLogAccess().count(request);
        response.setResults(results.intValue());
        if (results > 0) {
            List<NodeOnOfflineLog> rows = appContext.getBackendNodeOnOfflineLogAccess().select(request);
            response.setRows(rows);
        } else {
            response.setRows(new ArrayList<Object>(0));
        }
        response.setSuccess(true);
        return response;
    }
}
