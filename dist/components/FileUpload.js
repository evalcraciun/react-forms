'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUpload = function (_React$Component) {
  _inherits(FileUpload, _React$Component);

  function FileUpload() {
    _classCallCheck(this, FileUpload);

    return _possibleConstructorReturn(this, (FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).apply(this, arguments));
  }

  _createClass(FileUpload, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var dndZone = this.refs.dndzone;
      var fileInput = this.refs.fileInput;

      dndZone.addEventListener('dragover', this.handleDragOver, false);
      dndZone.addEventListener('drop', this.handleFileDrop.bind(this), false);
      dndZone.addEventListener('click', function () {
        return fileInput.click();
      }, false);
    }
  }, {
    key: 'fileRead',
    value: function fileRead(files) {
      if (files.length > 1) {
        alert("Only one file allowed");
        return;
      }

      var file = files[0];
      var reader = new FileReader();

      reader.onloadstart = function (event) {
        console.log("load start", event);
      };

      reader.onloadend = function (event) {
        console.log("load end", event);
      };

      reader.onprogress = function (event) {
        console.log("progress", event);
      };

      reader.onerror = function (event) {
        console.log("error", event);
      };

      reader.readAsDataURL(file);
    }
  }, {
    key: 'handleDragOver',
    value: function handleDragOver() {}
  }, {
    key: 'handleFileDrop',
    value: function handleFileDrop() {}
  }, {
    key: 'handleFileSelect',
    value: function handleFileSelect(event) {
      event.preventDefault();
      event.stopPropagation();

      var files = event.target.files;
      this.fileRead(files);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: 'dndzone' },
        _react2.default.createElement('input', _extends({}, this.props, { type: 'file', ref: 'fileInput' }))
      );
    }
  }]);

  return FileUpload;
}(_react2.default.Component);

exports.default = FileUpload;