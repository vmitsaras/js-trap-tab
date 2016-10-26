# js-trap-tab
Accessible Keyboard Traps

Based on [accessible-modal-dialog](https://github.com/gdkraus/accessible-modal-dialog/blob/master/modal-window.js) by Greg Kraus

##Usage

```js
    // Init
    trapTabKey = new componentNamespace.TrapTabKey(element);
    trapTabKey.init();
  
    // Functions
    trapTabKey.giveFocus();
    trapTabKey.bindTrap();
    trapTabKey.unbindTrap();
```

##### Example
[jQuery accessible Offcanvas plugin](https://github.com/vmitsaras/js-offcanvas/blob/master/src/js-offcanvas.js#L96)

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Release History

* `v0.1.0`: Initial release.
