package org.bigmouth.senon.admin.web.api;

import java.util.Collections;

import org.bigmouth.senon.admin.cluster.BackendAppContext;
import org.bigmouth.senon.admin.support.I18nManager;
import org.bigmouth.senon.admin.web.AbstractMVC;
import org.bigmouth.senon.admin.web.support.Builder;
import org.bigmouth.senon.admin.web.vo.RestfulResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.ltsopensource.cmd.DefaultHttpCmd;
import com.github.ltsopensource.cmd.HttpCmd;
import com.github.ltsopensource.cmd.HttpCmdClient;
import com.github.ltsopensource.cmd.HttpCmdResponse;
import com.github.ltsopensource.core.cluster.Node;
import com.github.ltsopensource.core.cmd.HttpCmdNames;

/**
 * @author Robert HG (254963746@qq.com) on 9/28/15.
 */
@Controller
@RequestMapping("/jvm")
public class JvmDataApi extends AbstractMVC {

    @Autowired
    private BackendAppContext appContext;

    @RequestMapping("node-jvm-info-get")
    @ResponseBody
    public RestfulResponse getNodeList(String identity) {

        RestfulResponse restfulResponse = new RestfulResponse();

        Node node = appContext.getNodeMemCacheAccess().getNodeByIdentity(identity);

        if (node == null) {
            return Builder.build(false, I18nManager.getMessage("node.dose.not.alive"));
        }

        HttpCmd cmd = new DefaultHttpCmd();
        cmd.setCommand(HttpCmdNames.HTTP_CMD_JVM_INFO_GET);
        cmd.setNodeIdentity(identity);

        HttpCmdResponse response = HttpCmdClient.doGet(node.getIp(), node.getHttpCmdPort(), cmd);
        if (response.isSuccess()) {
            restfulResponse.setSuccess(true);
            restfulResponse.setResults(1);
            restfulResponse.setRows(Collections.singletonList(response.getObj()));
        } else {
            restfulResponse.setSuccess(false);
            restfulResponse.setMsg(response.getMsg());
        }

        return restfulResponse;
    }

}
