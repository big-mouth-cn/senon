/*
 * Copyright 2016 mopote.com
 *
 * The Project licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
package org.bigmouth.senon.common.runner;

import org.bigmouth.senon.common.OSPlatform;


/**
 * Job runner for shell script
 * 
 * @since 1.0
 * @author Allen Hu - (big-mouth.cn)
 */
public class ShellJobRunner extends AbstractJobRunner {

    private static final String SUFFIX_WINDOWS = ".bat";
    private static final String SUFFIX_LINUX = ".sh";

    protected String getSubDirName() {
        return "SHELL";
    }
    
    protected String getJobSuffix() {
        OSPlatform os = OSPlatform.getOSPlatform();
        switch (os) {
            case Windows:
                return SUFFIX_WINDOWS;
            case Linux:
                return SUFFIX_LINUX;
            default:
                throw new IllegalStateException("Does not support os platform: " + os);
        }
    }

    @Override
    protected String[] getCommands() {
        return new String[0];
    }
}
