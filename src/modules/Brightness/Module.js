/*
* Changes the Image Brightness
*/
module.exports = function Brightness(options,UI){

    var defaults = require('./../../util/getDefaults.js')(require('./info.json'));
    var output;



    function draw(input,callback,progressObj){

        options.brightness = parseInt(options.brightness) || defaults.brightness;
        var val = (options.brightness)/100.0;
        progressObj.stop(true);
        progressObj.overrideFlag = true;

        /*
        In this case progress is handled by changepixel internally otherwise progressObj
        needs to be overriden and used
        For eg. progressObj = new SomeProgressModule()
        */

        var step = this;

        function changePixel(r, g, b, a){

            r = Math.min(val*r, 255)
            g = Math.min(val*g, 255)
            b = Math.min(val*b, 255)
            return [r, g, b, a]
        }

        function output(image,datauri,mimetype){

            // This output is accessible by Image Sequencer
            step.output = {src:datauri,format:mimetype};

        }

        return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
            changePixel: changePixel,
            format: input.format,
            image: options.image,
            inBrowser: options.inBrowser,
            callback: callback
        });

    }
    return {
        options: options,
        draw:  draw,
        output: output,
        UI: UI
    }
}
