package com.weblab2.servlets;

import com.weblab2.beans.Raw;
import com.weblab2.beans.RawBean;
import com.weblab2.exceptions.InvalidDataException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.text.DecimalFormat;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@WebServlet(name = "AreaCheckServlet", urlPatterns = {})
public class AreaCheckServlet extends HttpServlet {

    private final DecimalFormat df = new DecimalFormat("#.###");
    private List<Double> rValues = Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0);
    private double xMin = -3;
    private double xMax = 5;
    private double yMin = -5;
    private double yMax = 3;


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        long startTime = System.nanoTime();

        String x = req.getParameter("x");
        String y = req.getParameter("y");
        String r = req.getParameter("r");

        try {
            if (x == null || x.isEmpty()) {
                throw new InvalidDataException("x is not set");
            }
            if (y == null || y.isEmpty()) {
                throw  new InvalidDataException("y is not set");
            }
            if (r == null || r.isEmpty()) {
                throw  new InvalidDataException("r is not set");
            }

            double xValue = parseX(x);
            double yValue = parseY(y);
            double rValue = parseR(r);

            LocalTime currentTime = LocalTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
            String formattedTime = currentTime.format(formatter);

            String executionTime = String.format("%.6f",(Double)((System.nanoTime() - startTime) / 1_000_000.0));
            RawBean raws = (RawBean) req.getSession().getAttribute("table");

            if (raws == null) {
                raws = new RawBean();
            }

            //System.out.println("AREA CHECK " + xValue + " " + yValue + " " + rValue + " " + isInArea(xValue, yValue, rValue));

            Raw raw = new Raw(xValue, yValue, rValue, formattedTime, executionTime, isInArea(xValue, yValue, rValue));
            raws.getRaws().add(raw);
            req.getSession().setAttribute("table", raws);
            req.getSession().setAttribute("check", raw);

            getServletContext().getRequestDispatcher("/result_page.jsp").forward(req, resp);
        }
        catch (InvalidDataException e) {
            //System.out.println(e.getMessage());
            req.setAttribute("error_message", e.getMessage());
            getServletContext().getRequestDispatcher("/invalid_data.jsp").forward(req, resp);
        }
    }


    private boolean isValidX(double x) {
        return xMin <= x && x <= xMax;
    }


    private boolean isValidY(double y) {
        return yMin <= y && y <= yMax;
    }


    private boolean isValidR(double r) {
        return rValues.contains(r);
    }


    private double parseX(String x) throws InvalidDataException {
        double parsedX = 0;
        try {
            parsedX = Double.parseDouble(x.trim());
            if (!isValidX(parsedX)) {
                //System.out.println("Invalid X: " + parsedX);
                throw new InvalidDataException("X is out of bounds");
            }
        }
        catch (NumberFormatException e) {
            throw new InvalidDataException("Incorrect X value");
        }
        return Math.round(parsedX * 1000.0) / 1000.0;
    }


    private double parseY(String y) throws InvalidDataException {
        double parsedY = 0;
        try {
            parsedY = Double.parseDouble(y.trim());
            if (!isValidY(parsedY)) {
                //System.out.println("Invalid Y: " + parsedY);
                throw new InvalidDataException("Y is out of bounds");
            }
        }
        catch (NumberFormatException e) {
            throw new InvalidDataException("Incorrect Y value");
        }
        return Math.round(parsedY * 1000.0) / 1000.0;
    }


    private double parseR(String r) throws InvalidDataException {
        double parsedR = 0;
        try {
            parsedR = Double.parseDouble(r.trim());
            if (!isValidR(parsedR)) {
                //System.out.println("Invalid R: " + parsedR);
                throw new InvalidDataException("R is out of bounds");
            }
        }
        catch (NumberFormatException e) {
            throw new InvalidDataException("Incorrect R value");
        }
        return parsedR;
    }


    private boolean isInCircle(double x, double y, double r) {
        return x >= 0 && y >= 0 && x * x + y * y <= r * r;
    }


    private boolean isInRectangle(double x, double y, double r) {
        return x <= 0 && y <= 0 && x >= -r && y >= -r / 2;
    }


    private boolean isInTriangle(double x, double y, double r) {
        return x <= 0 && y >= 0 && y <= 0.5 * x + r / 2;
    }


    private boolean isInArea(double x, double y, double r) {
        return isInCircle(x, y, r) || isInRectangle(x, y, r) || isInTriangle(x, y, r);
    }
}
