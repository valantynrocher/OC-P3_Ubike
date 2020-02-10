class Canvas {
    constructor() {
        // DOM
        this.canvas = document.querySelector("canvas"),
        this.deleteBtnElt = document.getElementById("delete-firm"),
        // canvas
        this.ctx = this.canvas.getContext("2d"),
        this.radius = 1,
        this.drawing = false,
        this.hasDrawed = false
    }

    manageEvents() {
        // événements de la souris
        this.canvas.addEventListener("mousedown", (e) => {
            this.drawing = true;
            this.lastPos = this.getMousePos(this.canvas, e);
            this.hasDrawed = true;
            this.renderCanvas();
        }, false);

        this.canvas.addEventListener("mouseup", (e) => {
            this.drawing = false;
            this.hasDrawed = true;
        }, false);
        
        this.canvas.addEventListener("mousemove", (e) => {
            this.mousePos = this.getMousePos(this.canvas, e);
            this.renderCanvas();
        }, false);

        // événements tactiles
        this.canvas.addEventListener("touchstart", (e) => {
            this.mousePos = this.getTouchPos(this.canvas, e);
            var touch = e.touches[0];
            this.mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(this.mouseEvent);
        }, false);

        this.canvas.addEventListener("touchend", (e) => {
            this.mouseEvent = new MouseEvent("mouseup", {});
            this.canvas.dispatchEvent(this.mouseEvent);
        }, false);

        this.canvas.addEventListener("touchmove", (e) => {
            var touch = e.touches[0];
            this.mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(this.mouseEvent);
        }, false);

        // réinitialisation du canvas
        this.deleteBtnElt.addEventListener("click", this.clearCanvas.bind(this));
    }

    // obtient la position de la souris relative au canvas
    getMousePos(canvasDom, mouseEvent) {
        this.rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - this.rect.left,
            y: mouseEvent.clientY - this.rect.top
        };
    }

    // obtient la position du touché sur l'écran relatif au canvas
    getTouchPos(canvasDom, touchEvent) {
        this.rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - this.rect.left,
            y: touchEvent.touches[0].clientY - this.rect.top
        };
    }

    renderCanvas() {
        if (this.drawing) {
            this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
            this.ctx.lineTo(this.mousePos.x, this.mousePos.y);
            this.ctx.stroke();
            this.ctx.lineWidth = this.radius * 2;
            this.ctx.lineCap = "round";
            this.lastPos = this.mousePos;
        }
    }

    // efface le canvas
    clearCanvas() {
        this.canvas.width = this.canvas.width;
        this.drawing = false;
        this.hasDrawed = false;
    }

    // empêche le scroll lorsque l'on touche le canvas en tactile
    preventScroll() {
        document.addEventListener("touchstart", (e) => {
            if (e.target == this.canvas) {
              e.preventDefault();
            }
        }, false);
        
        document.addEventListener("touchend", (e) => {
            if (e.target == this.canvas) {
              e.preventDefault();
            }
        }, false);
        
        document.addEventListener("touchmove", (e) => {
            if (e.target == this.canvas) {
              e.preventDefault();
            }
        }, false);
    }

}