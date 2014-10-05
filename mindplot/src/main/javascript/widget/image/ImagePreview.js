/*
 *    Copyright [2012] [wisemapping]
 *
 *   Licensed under WiseMapping Public License, Version 1.0 (the "License").
 *   It is basically the Apache License, Version 2.0 (the "License") plus the
 *   "powered by wisemapping" text requirement on every single page;
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the license at
 *
 *       http://www.wisemapping.org/license
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

mindplot.widget.image.ImagePreview = new Class({

    initialize: function() {
        this._native = $('<img>').attr({
            'class': 'img-thumbnail',
            'id': 'imagePreview'
        });
        this._native.hide();
        this._native.css("margin", "1em auto");
        this._native.bind('error', function (event) {
            $(this).prop('src', "images/image-not-found.png");
        });
        this.container = $('<div></div>').css('display', 'flex');
        this.container.append(this._native);
    },

    //preview of the image
    loadThumbnail: function(src) {
        var me = this;
        this._native.prop('src', src).load(function() {
            var resize = mindplot.widget.image.ImagePreview._calculateAspectRatioFit(me.getWidth(), me.getHeight(),
                mindplot.widget.image.ImagePreview.SIZE.WIDTH_IMG_EDITOR, mindplot.widget.image.ImagePreview.SIZE.HEIGHT_IMG_EDITOR);
            $(this).width(resize.width);
            $(this).height(resize.height);
            $(this).show();
        });
    },

    appendTo: function(element) {
        element.append(this.container);
    },

    getWidth: function(){
        return this._native.width();
    },

    getHeight: function(){
        return this._native.height();
    }
});


mindplot.widget.image.ImagePreview.SIZE = {
    HEIGHT_IMG_EDITOR: 100,
    WIDTH_IMG_EDITOR: 600,
    HEIGHT_IMG_TOPIC: 100,
    WIDTH_IMG_TOPIC: 100
};

mindplot.widget.image.ImagePreview._calculateAspectRatioFit = function(width, height, maxWidth, maxHeight) {
    var ratio = Math.min(
        maxWidth  / width,
        maxHeight / height
    );
    return {
        width: width * ratio,
        height: height * ratio
    };
}

