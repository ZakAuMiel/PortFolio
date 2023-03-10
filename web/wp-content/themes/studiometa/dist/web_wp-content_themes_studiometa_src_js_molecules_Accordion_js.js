(self["webpackChunk_studiometa_wordpress_project"] = self["webpackChunk_studiometa_wordpress_project"] || []).push([["web_wp-content_themes_studiometa_src_js_molecules_Accordion_js"],{

/***/ "./node_modules/@studiometa/ui/molecules/Accordion/Accordion.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Accordion": () => (/* binding */ Accordion)
/* harmony export */ });
/* harmony import */ var _AccordionCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/ui/molecules/Accordion/AccordionCore.js");
/* harmony import */ var _AccordionItem_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/ui/molecules/Accordion/AccordionItem.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};


class Accordion extends _AccordionCore_js__WEBPACK_IMPORTED_MODULE_0__.AccordionCore {
}
__publicField(Accordion, "config", {
  ..._AccordionCore_js__WEBPACK_IMPORTED_MODULE_0__.AccordionCore.config,
  components: {
    AccordionItem: _AccordionItem_js__WEBPACK_IMPORTED_MODULE_1__.AccordionItem
  }
});



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/ui/molecules/Accordion/AccordionCore.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccordionCore": () => (/* binding */ AccordionCore)
/* harmony export */ });
/* harmony import */ var _studiometa_js_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/index.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

class AccordionCore extends _studiometa_js_toolkit__WEBPACK_IMPORTED_MODULE_0__.Base {
  onAccordionItemOpen(index) {
    this.$emit("open", this.$children.AccordionItem[index], index);
    if (this.$options.autoclose) {
      this.$children.AccordionItem.filter((el, i) => index !== i).forEach((item) => item.close());
    }
  }
  onAccordionItemClose(index) {
    this.$emit("close", this.$children.AccordionItem[index], index);
  }
}
__publicField(AccordionCore, "config", {
  name: "Accordion",
  emits: ["open", "close"],
  options: {
    autoclose: Boolean,
    item: {
      type: Object,
      default: () => ({})
    }
  }
});



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./node_modules/@studiometa/ui/molecules/Accordion/AccordionItem.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccordionItem": () => (/* binding */ AccordionItem)
/* harmony export */ });
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _studiometa_js_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/Base/index.js");
/* harmony import */ var _studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@studiometa/js-toolkit/utils/css/transition.js");
/* harmony import */ var _AccordionCore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@studiometa/ui/molecules/Accordion/AccordionCore.js");
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};




const _AccordionItem = class extends _studiometa_js_toolkit__WEBPACK_IMPORTED_MODULE_1__.Base {
  mounted() {
    if (this.$parent && this.$parent instanceof _AccordionCore_js__WEBPACK_IMPORTED_MODULE_2__.AccordionCore && this.$parent.$options.item) {
      Object.entries(this.$parent.$options.item).forEach(([key, value]) => {
        var _a;
        if (key in this.$options) {
          const type = (_a = _AccordionItem.config.options[key].type) != null ? _a : _AccordionItem.config.options[key];
          if (type === Array || type === Object) {
            this.$options[key] = deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(this.$options[key], value);
          } else {
            this.$options[key] = value;
          }
        }
      });
    }
    this.$refs.btn.setAttribute("id", this.$id);
    this.$refs.btn.setAttribute("aria-controls", this.contentId);
    this.$refs.content.setAttribute("aria-labelledby", this.$id);
    this.$refs.content.setAttribute("id", this.contentId);
    const { isOpen } = this.$options;
    this.updateAttributes(isOpen);
    const { container, ...otherStyles } = this.$options.styles;
    const { $refs } = this;
    Object.entries(otherStyles).filter(([refName]) => $refs[refName]).forEach(([refName, { open, closed } = { open: "", closed: "" }]) => {
      (0,_studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_3__["default"])($refs[refName], { to: isOpen ? open : closed }, "keep");
    });
  }
  destroyed() {
    this.$refs.container.style.visibility = "";
    this.$refs.container.style.height = "";
  }
  onBtnClick() {
    if (this.$options.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  get contentId() {
    return `content-${this.$id}`;
  }
  updateAttributes(isOpen) {
    this.$refs.container.style.visibility = isOpen ? "" : "invisible";
    this.$refs.container.style.height = isOpen ? "" : "0";
    this.$refs.content.setAttribute("aria-hidden", isOpen ? "false" : "true");
    this.$refs.btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
  async open() {
    if (this.$options.isOpen) {
      return;
    }
    this.$log("open");
    this.$emit("open");
    this.$options.isOpen = true;
    this.updateAttributes(this.$options.isOpen);
    this.$refs.container.style.visibility = "";
    const { container, ...otherStyles } = this.$options.styles;
    const { $refs } = this;
    await Promise.all([
      (0,_studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_3__["default"])($refs.container, {
        from: { height: "0" },
        active: container.active,
        to: { height: `${$refs.content.offsetHeight}px` }
      }).then(() => {
        if (this.$options.isOpen) {
          $refs.content.style.position = "";
        }
        return Promise.resolve();
      }),
      ...Object.entries(otherStyles).filter(([refName]) => $refs[refName]).map(
        ([refName, { open, active, closed } = { open: "", active: "", closed: "" }]) => (0,_studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_3__["default"])(
          $refs[refName],
          {
            from: closed,
            active,
            to: open
          },
          "keep"
        )
      )
    ]);
  }
  async close() {
    if (!this.$options.isOpen) {
      return;
    }
    this.$log("close");
    this.$emit("close");
    this.$options.isOpen = false;
    const height = this.$refs.container.offsetHeight;
    this.$refs.content.style.position = "absolute";
    const { container, ...otherStyles } = this.$options.styles;
    const refs = this.$refs;
    await Promise.all([
      (0,_studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_3__["default"])(refs.container, {
        from: { height: `${height}px` },
        active: container.active,
        to: { height: "0" }
      }).then(() => {
        if (!this.$options.isOpen) {
          refs.container.style.height = "0";
          refs.container.style.visibility = "invisible";
          this.updateAttributes(this.$options.isOpen);
        }
        return Promise.resolve();
      }),
      ...Object.entries(otherStyles).filter(([refName]) => refs[refName]).map(
        ([refName, { open, active, closed } = { open: "", active: "", closed: "" }]) => (0,_studiometa_js_toolkit_utils__WEBPACK_IMPORTED_MODULE_3__["default"])(
          refs[refName],
          {
            from: open,
            active,
            to: closed
          },
          "keep"
        )
      )
    ]);
  }
};
let AccordionItem = _AccordionItem;
__publicField(AccordionItem, "config", {
  name: "AccordionItem",
  refs: ["btn", "content", "container"],
  emits: ["open", "close"],
  options: {
    isOpen: Boolean,
    styles: {
      type: Object,
      default: () => ({
        container: {
          open: "",
          active: "",
          closed: ""
        }
      }),
      merge: true
    }
  }
});



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ }),

/***/ "./web/wp-content/themes/studiometa/src/js/molecules/Accordion.js":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accordion)
/* harmony export */ });
/* harmony import */ var _studiometa_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@studiometa/ui/molecules/Accordion/Accordion.js");

class Accordion extends _studiometa_ui__WEBPACK_IMPORTED_MODULE_0__.Accordion {
}
Accordion.config = {
  name: "Accordion"
};



if (true) {module.hot.accept(function(err) {
if (err) {
console.error(err);
}
});
}


/***/ })

}])
//# sourceMappingURL=web_wp-content_themes_studiometa_src_js_molecules_Accordion_js.js.map