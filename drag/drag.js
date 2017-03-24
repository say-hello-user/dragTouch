
var touch_screen = {
　　 //方向
    direction: {
        _clientX: 0,
        _clientY: 0,
        _moveX: 0,
        _moveY: 0,
        _startX: 0,
        _startY: 0,
        _object: null,
        _direction: "no",
        _controller: true,
        _endX:0,
        _endY:0,
        //开始滑动、拖动
        start: function() {
            var self = this,
                obj = self._object;
            obj.addEventListener('touchstart', function(e) {

                self._startX = e.touches[0].pageX;
                self._startY = e.touches[0].pageY;
                self._clientX = e.touches[0].clientX - parseInt(this.offsetLeft);
                self._clientY = e.touches[0].clientY - parseInt(this.offsetTop);
                self.move();
            }, false);
            obj.addEventListener('touchend', function(e) {
              
                self._controller = true;
                var mytext = document.getElementById('mytext');
                texttop = parseInt(mytext.style.top);
                textleft = parseInt(mytext.style.left);
              //  alert(self._endX+"----"+self._endY)
               // console.log(texttop+"------"+textleft)
               /// mytext.value = 'wgre';
                if((self._endX>=20)&&(self._endX<=220)&&(self._endY<=160)&&(self._endY>=80)){
                    mytext.value = e.target.innerHTML;
                    e.target.innerHTML  = '';
                   
                }
            }, false);
        },
        //拖动滑动时
        move: function() {
            var self = this;
            self._object.addEventListener('touchmove', function(e) {
                if (self._controller) {
                    var endX, endY;
                    endX = e.changedTouches[0].pageX;
                    endY = e.changedTouches[0].pageY;
                    var direction = self.get_slide_direction(self._startX, self._startY, endX, endY);
                    switch (direction) {
                    case 0:
                        self._direction = "no";
                        break;
                    case 1:
                        self._direction = "right";
                        break;
                    case 2:
                        self._direction = "left";
                        break;
                    case 3:
                        self._direction = "down";
                        break;
                    case 4:
                        self._direction = "up";
                        break;
                    default:
                    }
                    self._controller = false;
                }
                e.preventDefault();
                self._moveX = e.touches[0].clientX - self._clientX;
                self._moveY = e.touches[0].clientY - self._clientY;
                this.style.left = self._moveX + 'px';
                this.style.top = self._moveY + 'px';
               // this.innerHTML = self._moveX + "|" + self._moveY + "|" + self._direction
                self._endX = e.touches[0].pageX;
                self._endY = e.touches[0].pageY;
            }, false);
        },
        //计算滑动角度
        get_slide_angle: function(a, b) {
            return Math.atan2(a, b) * 180 / Math.PI;
        },
        //根据角度给出方向
        get_slide_direction: function(a, b, c, d) {
            var dy = b - d;
            var dx = c - a;
            var result = 0;
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return result
            }
            var angle = this.get_slide_angle(dx, dy);
            if (angle >= -45 && angle < 45) {
                result = 4;
            } else if (angle >= 45 && angle < 135) {
                result = 1;
            } else if (angle >= -135 && angle < -45) {
                result = 2;
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }
            return result;
        },
        //通过一个dom对象进行初始化
        init: function(a) {
            var class_clone = function(source) { 
                var result={};
                for (var key in source) {
                    result[key] = typeof source[key]==="object" ? class_clone(source[key]) : source[key];
                } 
                return result; 
            }
            var self =  class_clone(touch_screen.direction);
            self._object = document.getElementById(a);
            if (!self._object) {
                alert('bind_object is not an object');
                return false;
            }
            self.start();
        }
    }
}

//页面加载完成
window.onload = function() {
    touch_screen.direction.init("test_div");
    touch_screen.direction.init("test_div2");
}