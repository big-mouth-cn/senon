package org.bigmouth.senon.admin.access.face;


import java.util.List;

import org.bigmouth.senon.admin.access.domain.NodeOnOfflineLog;
import org.bigmouth.senon.admin.request.NodeOnOfflineLogPaginationReq;

/**
 * @author Robert HG (254963746@qq.com) on 9/26/15.
 */
public interface BackendNodeOnOfflineLogAccess {

    void insert(List<NodeOnOfflineLog> nodeOnOfflineLogs);

    List<NodeOnOfflineLog> select(NodeOnOfflineLogPaginationReq request);

    Long count(NodeOnOfflineLogPaginationReq request);

    void delete(NodeOnOfflineLogPaginationReq request);

}
