window.onload = function() {

    const canvas = document.getElementById("chart");
    canvas.width = 600;
    canvas.height = 530;
    let R = 25
    let width = canvas.width
    let height = canvas.height
    let chartColor = "#8f9f4f"
    let inChartColor = "#8f9f4f"

    let points = []
    let cartesianPoints = []

    const context = canvas.getContext("2d");
    const mouse = {
        x: 0,
        y: 0,
        left: false,
        over: false,
        inChart: false
    }

    canvas.addEventListener('mouseenter', mouseEnterHandler)

    canvas.addEventListener('mousemove', mouseMoveHandler)


    canvas.addEventListener('mouseleave', mouseLeaveHandler)

    canvas.addEventListener('mousedown', mouseDownHandler)


    function mouseDownHandler(event) {
        console.log("clicked")
        if (mouse.inChart) {
            //let cartesianX = (mouse.x - width / 2) / (R / 2)
            //let cartesianY = (-mouse.y + height / 2) / (R / 2)
            let cartesianX = (mouse.x - width / 2) / 50
            let cartesianY = (-mouse.y + height / 2) / 50

            const rect = canvas.getBoundingClientRect();

            cartesianPoints.push([cartesianX, cartesianY])
            points.push([mouse.x, mouse.y])

            clear(inChartColor)
            console.log("in chart")
            // send data to the server
            console.log(cartesianX);
            console.log(cartesianY);
            checkAndSendData(true, cartesianX, cartesianY);
        }
        else {
            alert("Click inside green area");
        }
    }

    function mouseEnterHandler(event) {
        mouse.over = true;

    }

    function mouseMoveHandler(event) {
        const rect = canvas.getBoundingClientRect()
        mouse.x = event.clientX - rect.left
        mouse.y = event.clientY - rect.top

    }

    function mouseLeaveHandler(event) {
        mouse.over = false;
    }

    function draw(color) {
        context.lineWidth = 2;

        let deltaY = 6
        let deltaX = 10
        context.font = "10px monospace"

        drawChart(context, width, height, R, color)

        context.fillStyle = 'black'
        context.strokeStyle = 'black'


        // x axis

        context.beginPath();
        context.moveTo(0, height / 2)
        context.lineTo(width, height / 2)
        context.stroke()
        context.closePath()

        // y axis

        context.beginPath();
        context.moveTo(width / 2, 0)
        context.lineTo(width / 2, height)
        context.stroke()
        context.closePath()

        // y arrow
        let length = 7
        context.beginPath();
        context.moveTo(width / 2 - length, length)
        context.lineTo(width / 2, 0)
        context.lineTo(width / 2 + length, length)
        context.fill()
        context.closePath()

        // x arrow

        context.beginPath();
        context.moveTo(width - length, height / 2 - length)
        context.lineTo(width - length, height / 2 + length)
        context.lineTo(width, height / 2)
        context.fill()
        context.closePath()

        // x text

        context.fillText('R/2', width / 2 + R, height / 2 - deltaY)
        context.fillText('R', width / 2 + R * 2, height / 2 - deltaY)

        context.fillText('-R/2', width / 2 - R - deltaX, height / 2 - deltaY)
        context.fillText('-R', width / 2 - R * 2 - deltaX, height / 2 - deltaY)

        //y text

        context.fillText('R/2', width / 2 + deltaX, height / 2 - R)
        context.fillText('R', width / 2 + deltaX, height / 2 - R * 2)

        context.fillText('-R/2', width / 2 + deltaX, height / 2 + R)
        context.fillText('-R', width / 2 + deltaX, height / 2 + R * 2)

        // points

        drawPoint(context, width / 2, height / 2, 5, 'black')

        drawPoint(context, width / 2 - R, height / 2, 5, 'black')
        drawPoint(context, width / 2 - R * 2, height / 2, 5, 'black')
        drawPoint(context, width / 2 + R, height / 2, 5, 'black')
        drawPoint(context, width / 2 + R * 2, height / 2, 5, 'black')
        drawPoint(context, width / 2, height / 2 - R, 5, 'black')
        drawPoint(context, width / 2, height / 2 - R * 2, 5, 'black')
        drawPoint(context, width / 2, height / 2 + R, 5, 'black')
        drawPoint(context, width / 2, height / 2 + R * 2, 5, 'black')


        points.forEach(point => {
            drawPoint(context, point[0], point[1], 5, 'red')
        })
    }


    function drawPoint(context, x, y, R, color) {
        context.beginPath()
        context.moveTo(x, y)
        context.arc(x, y, R, 0, Math.PI * 2)
        context.fillStyle = color
        context.fill()
        context.closePath()
    }

    function drawChart(context, width, height, R, color) {
        context.fillStyle = color

        // rectangle
        context.fillRect(width / 2, height / 2, -2 * R, R)

        //triangle
        context.beginPath()
        context.moveTo(width / 2, height / 2)
        context.lineTo(width / 2, height / 2 - R)
        context.lineTo(width / 2 - R * 2, height / 2)
        context.fill()
        context.closePath()

        //circle
        context.beginPath()
        context.moveTo(width / 2, height / 2)
        context.arc(width / 2, height / 2, 2 * R, 3 * Math.PI / 2, 0)
        context.fill()
        context.closePath()

    }

    function clear(color) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        draw(color)
    }

    requestAnimationFrame(update)

    function checkPointInPolygon(point, vs) {
        let x = point[0], y = point[1];

        let inside = false;
        for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            let xi = vs[i][0], yi = vs[i][1];
            let xj = vs[j][0], yj = vs[j][1];

            let intersect = ((yi > y) !== (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }

    function checkPointInCircle(point, centerX, centerY, radius) {
        radius *= 2
        return (centerX - point[0]) ** 2 +(centerY - point[1]) ** 2 <= radius ** 2 && point[0] >= 0 && point[1] >= 0;
    }

    function update() {
        requestAnimationFrame(update);

        let cartesianX = mouse.x - width / 2
        let cartesianY = -mouse.y + height / 2
        let point = [cartesianX, cartesianY]

        let triangle = [[width / 2, height / 2], [width / 2, (height / 2 - R)], [width / 2 - 2 * R, height / 2]]
        let rect = [[width / 2 - 2 * R, height / 2], [width / 2, height / 2], [width / 2, height / 2 + R], [width / 2 - 2 * R, height / 2 + R]]

        triangle.forEach(point => {
            point[0] -= width / 2
            point[1] = -(point[1] - height / 2)
        })

        rect.forEach(point => {
            point[0] -= width / 2
            point[1] = -(point[1] - height / 2)
        })
        
        let inChart = checkPointInPolygon(point, triangle) || checkPointInPolygon(point, rect) || checkPointInCircle(point, 0, 0, R)
        mouse.inChart = inChart

        if (inChart){
            clear(inChartColor)
        } else {
            clear(chartColor)
        }
    }

    const radioButtons = document.getElementsByName("r_button");

    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("click", handleRChange);
    });

    function handleRChange(event) {
        const selectedValue = event.target.value
        R = 25 * selectedValue
        update()
    }
}