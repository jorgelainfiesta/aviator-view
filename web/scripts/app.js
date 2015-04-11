/*
 * Proyecto 3 - Gráficas
 * Jorge Lainfiesta 11142
 */

requirejs.config({
    "baseUrl": "scripts/lib",
    "paths": {
      "app": "../app",
    },
    "shim" : {
      "datgui" : {exports: "dat"}
    }
});

//http://soledadpenades.com/articles/three-js-tutorials/object-picking/
//http://workshop.chromeexperiments.com/examples/gui/#2--Constraining-Input

requirejs(["app/main"]);