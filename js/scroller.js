class Scroller {
    /**
     * 
     * @param {HTMLElement} id ancre html cible
     * @param {*} duration durée en ms
     */
    constructor(id, duration) {
        this.target = document.getElementById(id),
        this.duration = duration,
        this.animation = this.animation.bind(this)
    }

    smoothScroll() {
        this.targetPosition = this.target.getBoundingClientRect().top;
        this.startPosition = window.pageYOffset;
        this.distance = this.targetPosition;
        this.startTime = null;
        
        requestAnimationFrame(this.animation);
    }

    animation(currentTime) {
        
        if(this.startTime === null) this.startTime = currentTime;
        this.timeElapsed = currentTime - this.startTime;
        let run = this.easeInOut(this.timeElapsed, this.startPosition, this.distance, this.duration);
        window.scrollTo(0, run);
        if(this.timeElapsed < this.duration) requestAnimationFrame(this.animation);
    }

    easeInOut(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }
}