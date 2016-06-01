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

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.commons.lang.ArrayUtils;
import org.bigmouth.senon.common.utils.PathUtils;

import com.github.ltsopensource.core.commons.file.FileUtils;
import com.github.ltsopensource.core.commons.utils.StringUtils;
import com.github.ltsopensource.core.domain.Action;
import com.github.ltsopensource.core.domain.Job;
import com.github.ltsopensource.core.logger.Logger;
import com.github.ltsopensource.core.logger.LoggerFactory;
import com.github.ltsopensource.tasktracker.Result;
import com.github.ltsopensource.tasktracker.logger.BizLogger;
import com.github.ltsopensource.tasktracker.runner.JobContext;
import com.github.ltsopensource.tasktracker.runner.JobRunner;


/**
 * Abstract job runner
 * @since 1.0
 * @author Allen Hu - (big-mouth.cn)
 */
public abstract class AbstractJobRunner implements JobRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(ShellJobRunner.class);
    private static final ExecutorService loggerExecutor = Executors.newFixedThreadPool(2);
    private static final String SCRIPT_CONTENT_KEY = "JobCode";
    private String jobBasePath = System.getProperty("user.home");

    protected String getJobFullPath() {
        StringBuilder buf = new StringBuilder();
        buf.append(PathUtils.appendEndFileSeparator(jobBasePath)).append(PathUtils.appendEndFileSeparator(PathUtils.trimBeginFileSeparator(getSubDirName())));
        return buf.toString();
    }
    
    protected abstract String getSubDirName();
    
    protected abstract String getJobSuffix();
    
    protected abstract String[] getCommands();
    
    protected String getLogSuffix() {
        return ".log";
    }
    
    @Override
    public Result run(JobContext jobContext) throws Throwable {
        Job job = jobContext.getJob();
        String script = job.getParam(SCRIPT_CONTENT_KEY);
        if (StringUtils.isEmpty(script)) {
            return new Result(Action.EXECUTE_EXCEPTION, "任务执行失败!因为该任务没有任何可执行脚本,请在提交任务时将脚本内容设置到扩展参数“" + SCRIPT_CONTENT_KEY
                    + "”中");
        }
        String pathname = PathUtils.appendEndFileSeparator(getJobFullPath()) + job.getTaskId() + getJobSuffix();
        File file = new File(pathname);
        file = FileUtils.createFileIfNotExist(file);
        if (! writeFile(file, script)) {
            return new Result(Action.EXECUTE_EXCEPTION, "任务执行失败!无法将执行脚本写入到文件中：" + file);
        }
        
        BizLogger bizLogger = jobContext.getBizLogger();
        
        StringBuilder log = new StringBuilder();
        
        boolean executeResult = executeScript(bizLogger, file, log, getCommands());
        bizLogger.info(log.toString());
        
        return executeResult ? new Result(Action.EXECUTE_SUCCESS) : new Result(Action.EXECUTE_FAILED);
    }
    
    private boolean writeFile(File file, String content) {
        BufferedWriter writer = null;
        try {
            writer = new BufferedWriter(new FileWriter(file));
            writer.write(content);
            writer.flush();
            return true;
        }
        catch (IOException e) {
            if (LOGGER.isErrorEnabled())
                LOGGER.error("writeFile:", e);
            return false;
        }
        finally {
            if (null != writer) {
                try {
                    writer.close();
                }
                catch (IOException e) {
                }
            }
        }
    }
    
    private boolean executeScript(BizLogger logger, File script, StringBuilder log, String...command) throws IOException, InterruptedException {
        List<String> commands = new LinkedList<String>();
        if (ArrayUtils.isNotEmpty(command)) {
            for (String cmd : command) {
                commands.add(cmd);
            }
        }
        commands.add(script.getAbsolutePath());
        ProcessBuilder builder = new ProcessBuilder(commands);
        
        Process process = builder.start();
        InputStream infois = process.getInputStream();
        InputStream erris = process.getErrorStream();
        
        loggerExecutor.submit(new LoggerInputStream(infois, log));
        loggerExecutor.submit(new LoggerInputStream(erris, log));
        
        int waitFor = process.waitFor();
        process.destroy();
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("task [{}] execute finished, result code: {}!", script, waitFor);
        }
        return waitFor == 0;
    }
    
    private class LoggerInputStream implements Runnable {

        private final InputStream is;
        private final StringBuilder logger;
        
        private LoggerInputStream(InputStream is, StringBuilder logger) {
            this.is = is;
            this.logger = logger;
        }

        @Override
        public void run() {
            InputStreamReader in = null;
            BufferedReader br = null;
            try {
                in = new InputStreamReader(is);
                br = new BufferedReader(in);
                String line = null;
                while ( (line = br.readLine()) != null) {
                    logger.append(line).append("\n");
                }
            }
            catch (IOException e) {
                logger.append(e.getMessage());
            }
            finally {
                if (null != br)
                {
                    try {
                        br.close();
                    }
                    catch (IOException e) {
                    }
                }
                if (null != in) {
                    try {
                        in.close();
                    }
                    catch (IOException e) {
                    }
                }
                if (null != is) {
                    try {
                        is.close();
                    }
                    catch (IOException e) {
                    }
                }
            }
        }
    }
    
    public String getJobBasePath() {
        return jobBasePath;
    }

    public void setJobBasePath(String jobBasePath) {
        this.jobBasePath = jobBasePath;
    }
}
