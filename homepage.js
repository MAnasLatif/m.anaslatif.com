
let imgl = document.querySelector('header .img .before')

setTimeout(function() {		 
 let imglx1 = imgl.clientWidth
 imgl.style.height = imglx1 + "px"
}, 500);
window.addEventListener('resize', function(event) {
    let imglx = imgl.clientWidth
    imgl.style.height = imglx + "px";
});

/* ======================= Text animation Selection ================ */
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid var(--text-1)}";
    document.body.appendChild(css);
};


// for number loder

const projactBox = document.querySelectorAll(".projact-box h1");

projactBox.forEach(animateValue);

function animateValue(obj) {
    let num = obj.getAttribute("num");
    let numTime;
    if (num < 20) {
        numTime = (num * 1000)
    } else {
        numTime = (num * 10);
    }
    let startTimestamp = 0;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / numTime, 1);
        obj.innerHTML = Math.floor(progress * (num - 0) + 0);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}