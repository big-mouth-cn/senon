package org.bigmouth.senon.admin.support;

import java.util.Map;

import org.bigmouth.nvwa.zookeeper.config.ZkPropertyPlaceholderConfigurer;

/**
 * 系统的配置信息（lts-admin.cfg）
 *
 * @author Robert HG (254963746@qq.com) on 5/11/15.
 */
public class AppConfigurer extends ZkPropertyPlaceholderConfigurer {

    public static Map<String, String> allConfig() {
        return getProperties();
    }

    public static String getProperty(String name) {
        return getContextProperty(name);
    }

    public static String getProperty(String name, String defaultValue) {
        String returnValue = getContextProperty(name);
        if (returnValue == null || returnValue.equals("")) {
            returnValue = defaultValue;
        }
        return returnValue;
    }
}
