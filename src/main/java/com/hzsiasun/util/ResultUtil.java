package com.hzsiasun.util;

import java.io.Serializable;

public class ResultUtil implements Serializable{
    private static final long serialVersionUID = 8413782072084810966L;
    
    public static final String SUCCESS = "SUCCESS";
    public static final String ERROR = "ERROR";
    public static final String WARN = "WARN";
    public static final String ERRORMSG = "服务器炸了，请稍后重试";
    
    public ResultUtil(){}
    public ResultUtil(String result,String msg){
        this.result = result;
        this.msg = msg;
    }
    
    
    /**
     * 请使用本类的静态变量，SUCCESS,ERROR,WARN
     */
    private String result;
    
    /**
     * 对页面的消息提示，比如说出错的时候，给页面的错误提示信息
     */
    private String msg;
    
    /**
     * 传递回去的数据，比如说从数据库中查询的数据，存放到此变量中
     */
    private Object data;
    
    /**
     * 页面跳转的Url，如果有的话
     */
    private String url;

    public String getResult() {
        return result;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Result [result=" + result + ", msg=" + msg + ", data=" + data + ", url=" + url + "]";
    }
    
}