var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var eventListener = require('eventlistener');
var ElementPan = (function (_super) {
    __extends(ElementPan, _super);
    function ElementPan() {
        var _this = _super.call(this) || this;
        _this.state = {
            dragging: false,
            elHeight: 0,
            elWidth: 0,
            startX: 0,
            startY: 0,
            scrollX: 0,
            scrollY: 0,
            maxX: 0,
            maxY: 0
        };
        _this.onDragMove = _this.onDragMove.bind(_this);
        _this.onDragStart = _this.onDragStart.bind(_this);
        _this.onDragStop = _this.onDragStop.bind(_this);
        _this.ref = _this.ref.bind(_this);
        return _this;
    }
    ElementPan.prototype.onDragStart = function (e) {
        eventListener.add(window, 'mousemove', this.onDragMove);
        eventListener.add(window, 'touchmove', this.onDragMove);
        eventListener.add(window, 'mouseup', this.onDragStop);
        eventListener.add(window, 'touchend', this.onDragStop);
        var bounds, target = e.currentTarget || e.target;
        if (target.childNodes.length > 1) {
            bounds = { width: target.scrollWidth, height: target.scrollHeight };
        }
        else {
            bounds = e.target.getBoundingClientRect();
        }
        var startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX, startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
        var state = {
            dragging: true,
            elHeight: this.el.clientHeight,
            elWidth: this.el.clientWidth,
            startX: startX,
            startY: startY,
            scrollX: this.el.scrollLeft,
            scrollY: this.el.scrollTop,
            maxX: bounds.width,
            maxY: bounds.height
        };
        this.setState(state);
        if (this.props.onPanStart) {
            this.props.onPanStart(state);
        }
    };
    ElementPan.prototype.onDragMove = function (e) {
        e.preventDefault();
        if (!this.state.dragging) {
            return;
        }
        var x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX, y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
        this.el.scrollLeft = Math.min(this.state.maxX - this.state.elWidth, this.state.scrollX - (x - this.state.startX));
        this.el.scrollTop = Math.min(this.state.maxY - this.state.elHeight, this.state.scrollY - (y - this.state.startY));
        if (this.props.onPan) {
            this.props.onPan({ x: this.el.scrollLeft, y: this.el.scrollTop });
        }
    };
    ElementPan.prototype.onDragStop = function () {
        this.setState({ dragging: false });
        eventListener.remove(window, 'mousemove', this.onDragMove);
        eventListener.remove(window, 'touchmove', this.onDragMove);
        eventListener.remove(window, 'mouseup', this.onDragStop);
        eventListener.remove(window, 'touchend', this.onDragStop);
        if (this.props.onPanStop) {
            this.props.onPanStop({ x: this.el.scrollLeft, y: this.el.scrollTop });
        }
    };
    ElementPan.prototype.componentDidMount = function () {
        if (this.props.startX) {
            this.el.scrollLeft = this.props.startX;
        }
        if (this.props.startY) {
            this.el.scrollTop = this.props.startY;
        }
    };
    ElementPan.prototype.getContainerStyles = function () {
        var style = {
            overflow: 'hidden',
            cursor: 'move'
        };
        if (this.props.width) {
            style.width = this.props.width;
        }
        if (this.props.height) {
            style.height = this.props.height;
        }
        if (this.props.style) {
            style = __assign({}, style, this.props.style);
        }
        return style;
    };
    ElementPan.prototype.ref = function (el) {
        if (el) {
            this.el = el;
        }
        ;
    };
    ElementPan.prototype.render = function () {
        return (React.createElement("div", { ref: this.ref, className: this.props.className, style: this.getContainerStyles(), onTouchStart: this.onDragStart, onMouseDown: this.onDragStart }, this.props.children));
    };
    return ElementPan;
}(React.Component));
exports.ElementPan = ElementPan;
