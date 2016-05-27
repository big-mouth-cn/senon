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
package org.bigmouth.senon.common;



/**
 * 操作系统平台
 * 
 * @since 1.0
 * @author Allen Hu - (big-mouth.cn)
 */
public enum OSPlatform {
    
    Any("any"),  
    Linux("Linux"),  
    Mac_OS("Mac OS"),  
    Mac_OS_X("Mac OS X"),  
    Windows("Windows"),  
    OS2("OS/2"),  
    Solaris("Solaris"),  
    SunOS("SunOS"),  
    MPEiX("MPE/iX"),  
    HP_UX("HP-UX"),  
    AIX("AIX"),  
    OS390("OS/390"),  
    FreeBSD("FreeBSD"),  
    Irix("Irix"),  
    Digital_Unix("Digital Unix"),  
    NetWare_411("NetWare"),  
    OSF1("OSF1"),  
    OpenVMS("OpenVMS"),  
    Others("Others");  
      
    private static final String OS = System.getProperty("os.name").toLowerCase();
    private String description;
    private OSPlatform(String desc){  
        this.description = desc;  
    }
    
    public String getDescription() {
        return description;
    }

    public static boolean isLinux() {
        return OS.indexOf("linux") >= 0;
    }

    public static boolean isMacOS() {
        return OS.indexOf("mac") >= 0 && OS.indexOf("os") > 0 && OS.indexOf("x") < 0;
    }

    public static boolean isMacOSX() {
        return OS.indexOf("mac") >= 0 && OS.indexOf("os") > 0 && OS.indexOf("x") > 0;
    }

    public static boolean isWindows() {
        return OS.indexOf("windows") >= 0;
    }

    public static boolean isOS2() {
        return OS.indexOf("os/2") >= 0;
    }

    public static boolean isSolaris() {
        return OS.indexOf("solaris") >= 0;
    }

    public static boolean isSunOS() {
        return OS.indexOf("sunos") >= 0;
    }

    public static boolean isMPEiX() {
        return OS.indexOf("mpe/ix") >= 0;
    }

    public static boolean isHPUX() {
        return OS.indexOf("hp-ux") >= 0;
    }

    public static boolean isAix() {
        return OS.indexOf("aix") >= 0;
    }

    public static boolean isOS390() {
        return OS.indexOf("os/390") >= 0;
    }

    public static boolean isFreeBSD() {
        return OS.indexOf("freebsd") >= 0;
    }

    public static boolean isIrix() {
        return OS.indexOf("irix") >= 0;
    }

    public static boolean isDigitalUnix() {
        return OS.indexOf("digital") >= 0 && OS.indexOf("unix") > 0;
    }

    public static boolean isNetWare() {
        return OS.indexOf("netware") >= 0;
    }

    public static boolean isOSF1() {
        return OS.indexOf("osf1") >= 0;
    }

    public static boolean isOpenVMS() {
        return OS.indexOf("openvms") >= 0;
    }
    
    public static OSPlatform getOSPlatform(){  
        if (isAix()) {
            return OSPlatform.AIX;
        }
        else if (isDigitalUnix()) {
            return OSPlatform.Digital_Unix;
        }
        else if (isFreeBSD()) {
            return OSPlatform.FreeBSD;
        }
        else if (isHPUX()) {
            return OSPlatform.HP_UX;
        }
        else if (isIrix()) {
            return OSPlatform.Irix;
        }
        else if (isLinux()) {
            return OSPlatform.Linux;
        }
        else if (isMacOS()) {
            return OSPlatform.Mac_OS;
        }
        else if (isMacOSX()) {
            return OSPlatform.Mac_OS_X;
        }
        else if (isMPEiX()) {
            return OSPlatform.MPEiX;
        }
        else if (isNetWare()) {
            return OSPlatform.NetWare_411;
        }
        else if (isOpenVMS()) {
            return OSPlatform.OpenVMS;
        }
        else if (isOS2()) {
            return OSPlatform.OS2;
        }
        else if (isOS390()) {
            return OSPlatform.OS390;
        }
        else if (isOSF1()) {
            return OSPlatform.OSF1;
        }
        else if (isSolaris()) {
            return OSPlatform.Solaris;
        }
        else if (isSunOS()) {
            return OSPlatform.SunOS;
        }
        else if (isWindows()) {
            return OSPlatform.Windows;
        }
        else {
            return OSPlatform.Others;
        }
    }  
}
