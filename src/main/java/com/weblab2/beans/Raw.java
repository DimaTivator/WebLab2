package com.weblab2.beans;

import java.io.Serializable;

public class Raw implements Serializable {

    private double x;
    private double y;
    private double R;
    private String currentTime;
    private String executionTime;
    private boolean hitFact;

    public Raw(){}

    public Raw(double x, double y, double r, String current, String execution, boolean res){
        this.x = x;
        this.y = y;
        this.R = r;
        this.currentTime = current;
        this.executionTime = execution;
        hitFact = res;
    }

    public double getR() {
        return R;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public boolean getHitFact() {
        return hitFact;
    }
}
