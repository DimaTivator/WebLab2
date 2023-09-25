package com.weblab2.servlets;

import com.weblab2.beans.RawBean;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "ControllerServlet", urlPatterns = "/control")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //System.out.println("GET REQUEST HAS BEEN MADE TO /control " + req.getParameter("x") + " " +
        //        req.getParameter("y") + " " + req.getParameter("r"));

        if(req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null) {
            //System.out.println("GO TO AREA CHECK");
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, resp);
        }
        else if (req.getParameter("clear") != null){
            //System.out.println("GO TO main.jsp");
            RawBean beans = (RawBean) req.getSession().getAttribute("table");
            if (beans == null) beans = new RawBean();
            beans.getRaws().clear();
            req.getSession().setAttribute("table", beans);
            getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
        }
        else {
            //System.out.println("ELSE GO TO JSP");
            getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
        }
    }
}
