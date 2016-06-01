package org.bigmouth.senon.admin.access.face;

import com.github.ltsopensource.monitor.access.domain.JVMMemoryDataPo;
import com.github.ltsopensource.monitor.access.face.JVMMemoryAccess;

import java.util.List;

import org.bigmouth.senon.admin.request.JvmDataReq;
import org.bigmouth.senon.admin.request.MDataPaginationReq;

/**
 * @author Robert HG (254963746@qq.com) on 9/28/15.
 */
public interface BackendJVMMemoryAccess extends JVMMemoryAccess{

    void delete(JvmDataReq request);

    List<JVMMemoryDataPo> queryAvg(MDataPaginationReq request);
}
