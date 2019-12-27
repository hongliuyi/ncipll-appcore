# ncipll-appcore
a javascrip interactive with mobile app   utils for html5

## Usage

```
import appCore from 'ncipll-appcore'
let App=appCore.CurrentApp;
App.Ready(function () {
            App.setValue("Referer", window.location.host);
            App.hideBar();
});

## Install

`npm install ncipll-appcore --save`
