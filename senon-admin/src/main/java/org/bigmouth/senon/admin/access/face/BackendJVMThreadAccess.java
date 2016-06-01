package org.bigmouth.senon.admin.access.face;

import com.github.ltsopensource.monitor.access.domain.JVMThreadDataPo;
import com.github.ltsopensource.monitor.access.face.JVMThreadAccess;

import java.util.List;

import org.bigmouth.senon.admin.request.JvmDataReq;
import org.bigmouth.senon.admin.request.MDataPaginationReq;

/**
 * @author Robert HG (254963746@qq.com) on 9/28/15.
 */
public interface BackendJVMThreadAccess extends JVMThreadAccess {

    void delete(JvmDataReq request);

    List<JVMThreadDataPo> queryAvg(MDataPaginationReq request);

}
