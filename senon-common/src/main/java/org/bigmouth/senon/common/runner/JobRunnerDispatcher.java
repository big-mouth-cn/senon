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

import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.github.ltsopensource.core.domain.Action;
import com.github.ltsopensource.core.domain.Job;
import com.github.ltsopensource.tasktracker.Result;
import com.github.ltsopensource.tasktracker.runner.JobContext;
import com.github.ltsopensource.tasktracker.runner.JobRunner;
import com.google.common.collect.Maps;


/**
 * Job runner dispathcer
 * @since 1.0
 * @author Allen Hu - (big-mouth.cn)
 */
public class JobRunnerDispatcher implements JobRunner {

    private static final String JOB_TYPE_KEY = "JobType";
    private static final Map<JobType, JobRunner> JOBRUNNER = Maps.newConcurrentMap();
    
    public enum JobType {
        SHELL,
        PYTHON,
        HIVE
    }
    
    static {
        JOBRUNNER.put(JobType.SHELL, new ShellJobRunner());
        JOBRUNNER.put(JobType.PYTHON, new PythonJobRunner());
        JOBRUNNER.put(JobType.HIVE, new HiveJobRunner());
    }
    
    @Override
    public Result run(JobContext jobContext) throws Throwable {
        Job job = jobContext.getJob();
        String jobType = job.getParam(JOB_TYPE_KEY);
        if (StringUtils.isBlank(jobType))
            return JOBRUNNER.get(JobType.SHELL).run(jobContext);
        JobType valueOf = JobType.valueOf(jobType);
        if (null == valueOf) {
            return new Result(Action.EXECUTE_SUCCESS, "Unsupported job type: " + jobType);
        }
        return JOBRUNNER.get(valueOf).run(jobContext);
    }
}
