package org.bigmouth.senon.admin.access.face;

import com.github.ltsopensource.monitor.access.domain.TaskTrackerMDataPo;
import com.github.ltsopensource.monitor.access.face.TaskTrackerMAccess;

import java.util.List;

import org.bigmouth.senon.admin.request.MDataPaginationReq;
import org.bigmouth.senon.admin.web.vo.NodeInfo;

/**
 * @author Robert HG (254963746@qq.com) on 9/22/15.
 */
public interface BackendTaskTrackerMAccess extends TaskTrackerMAccess{

    List<TaskTrackerMDataPo> querySum(MDataPaginationReq request);

    void delete(MDataPaginationReq request);

    List<NodeInfo> getTaskTrackers();
}
