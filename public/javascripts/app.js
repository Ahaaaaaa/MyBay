function PathLoader(el) {
    this.el = el;
    this.strokeLength = el.getTotalLength();

    // set dash offset to 0
    this.el.style.strokeDasharray =
        this.el.style.strokeDashoffset = this.strokeLength;
}

PathLoader.prototype._draw = function (val) {
    this.el.style.strokeDashoffset = this.strokeLength * (1 - val);
};

PathLoader.prototype.setProgress = function (val, cb) {
    this._draw(val);
    if(cb && typeof cb === 'function') cb();
};

PathLoader.prototype.setProgressFn = function (fn) {
    if(typeof fn === 'function') fn(this);
};

var body = document.body, svg = document.querySelector('svg path');

if(svg !== null) {
    svg = new PathLoader(svg);
    const apply=function(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/users/sign'+location.search);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if(response.status===200){
                    document.getElementById('loading').remove();
                    document.body.classList.add('active');
                    document.getElementsByClassName("success-message__title")[0].innerHTML=response.body;
                    svg.setProgress(1);
                    var count=3;
                    const interval=setInterval(function () {
                        if(count===-1){
                            clearInterval(interval);
                            ehopenapi.closeWindow();
                        }
                        document.getElementById("success-message__interval").innerHTML=count+'s';
                        count--;
                    },1000)
                }else{
                    alert("报名失败，请重新报名");
                    ehopenapi.closeWindow();
                }
            }
        };
        xhr.send();
    };
    setTimeout(function () {
        apply();
    }, 1000);
}

