package com.weblab2.beans;

import java.util.LinkedList;
import java.util.List;

public class RawBean {

    private final List<Raw> raws;

    public RawBean() {
        raws = new LinkedList<>();
    }

    public List<Raw> getRaws() {
        return raws;
    }
}
