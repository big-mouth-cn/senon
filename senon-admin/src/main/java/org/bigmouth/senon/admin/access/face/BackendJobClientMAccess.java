package org.bigmouth.senon.admin.access.face;

import com.github.ltsopensource.monitor.access.domain.JobClientMDataPo;
import com.github.ltsopensource.monitor.access.face.JobClientMAccess;

import java.util.List;

import org.bigmouth.senon.admin.request.MDataPaginationReq;
import org.bigmouth.senon.admin.web.vo.NodeInfo;

/**
 * @author Robert HG (254963746@qq.com) on 3/12/16.
 */
public interface BackendJobClientMAccess extends JobClientMAccess {

    void delete(MDataPaginationReq request);

    List<JobClientMDataPo> querySum(MDataPaginationReq request);

    List<NodeInfo> getJobClients();
}
