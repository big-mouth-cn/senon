package org.bigmouth.senon.admin.access.face;

import com.github.ltsopensource.monitor.access.domain.JobTrackerMDataPo;
import com.github.ltsopensource.monitor.access.face.JobTrackerMAccess;

import java.util.List;

import org.bigmouth.senon.admin.request.MDataPaginationReq;

/**
 * @author Robert HG (254963746@qq.com) on 9/22/15.
 */
public interface BackendJobTrackerMAccess extends JobTrackerMAccess {

    List<JobTrackerMDataPo> querySum(MDataPaginationReq request);

    void delete(MDataPaginationReq request);

    List<String> getJobTrackers();
}
