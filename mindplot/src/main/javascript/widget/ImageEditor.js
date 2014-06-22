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

mindplot.widget.ImageEditor = new Class({
    Extends: BootstrapDialog,

    initialize:function (model) {
        $assert(model, "model can not be null");
        this._model = model;
        this.parent($msg("Image"), {
            cancelButton: true,
            closeButton: true,
            acceptButton: true,
            removeButton: true,
            errorMessage: false,
            onRemoveClickData: {model: this._model}
        });
        this.css({width:"600px"});
        var panel = this._buildPanel(model);
        this.setContent(panel);
    },

    _buildPanel:function (model) {
        var result = $('<div></div>').css("margin-bottom", "-2em"); //FIXME: remove this hack for centered preview

        var ul = $('<ul></ul>').attr({
            'class':'nav nav-tabs',
            'id':'imageUlId'
        });

        var li_url = $('<li></li>').attr({'class':'active'});
        var li_upload = $('<li></li>');

        var tab1 = $('<a></a>').attr({
            'href':'#tab-1',
            'data-toggle':'pill'
        });
        tab1.html($msg('FROM_URL'));
        li_url.append(tab1);
        var tab2 = $('<a></a>').attr({
            'href':'#tab-2',
            'data-toggle':'pill'
        });
        tab2.html($msg('UPLOAD'));
        li_upload.append(tab2);

        ul.append(li_url);
        ul.append(li_upload);

        var div = $('<div></div>').attr({
            'class':'tab-content'
        });

        var div_url = $('<div></div>').attr({
            'class':'tab-pane active',
            'id':'tab-1'
        });

        var div_upload = $('<div></div>').attr({
            'class':'tab-pane fade',
            'id':'tab-2'
        });

        this.form = $('<form></form>').attr({
            'action': 'none',
            'id': 'imageFormId'
        });

        // Add Text
        var text = $('<p></p>').text("Paste your link below:");
        text.css("margin","1em");

        this.form.append(text);

        // Add Input
        var input = $('<input/>').attr({
            'placeholder': 'http://www.example.com/',
            'required': 'true',
            'autofocus': 'autofocus',
            'class': 'form-control'
        });

        if (model.getValue() != null){
            input.val(model.getValue());
        }

        input.keyup(function(event){
            setTimeout(function () {
                if (input.val().length != 0) {
                    preload(input.val());
                }
            }, 0);
        });

        this.form.append(input);

        var imagePreview = $('<img>').attr({
            'title':'IMAGEN',
            'class': 'img-thumbnail',
            'id': 'imagePreview'
        })
        imagePreview.hide();
        imagePreview.css({
            margin:"1em auto"
        });

        this.form.append($('<div></div>').css('display', 'flex').append(imagePreview));

        //preview of the image
        function preload(src) {
            imagePreview.prop('src', src).load(function() {
                var me = $(this);
                var resize = calculateAspectRatioFit(me.width(), me.height(), mindplot.widget.ImageEditor.SIZE.WIDTH_IMG_EDITOR, mindplot.widget.ImageEditor.SIZE.HEIGHT_IMG_EDITOR);
                me.width(resize.width);
                me.height(resize.height);
                me.show();
            });
        }

        imagePreview.bind('error', function (event) {
            var errorImage = "images/image-not-found.png"
            imagePreview.prop('src', errorImage);
        });

        //resize the image to fit in the dialog
        function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
            var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            return {
                width: srcWidth * ratio,
                height: srcHeight * ratio
            };
        }

        var me = this;
        this.form.submit(
            function (event) {
                event.preventDefault();
                var resizeTopicImg = calculateAspectRatioFit(imagePreview.width(), imagePreview.height(), mindplot.widget.ImageEditor.SIZE.WIDTH_IMG_TOPIC, mindplot.widget.ImageEditor.SIZE.HEIGHT_IMG_TOPIC);
                var inputValue;
                var imgSource;
                if(input.val() != "" ){
                    inputValue = input.val();
                    imgSource = "url";
                }
                else{
                    inputValue = inputFileUpload.val();
                    imgSource = "disk";
                }
                if (inputValue != null && inputValue.trim() != "") {
                    model.setValue(inputValue, resizeTopicImg, imgSource);
                }
                me.close();
            }
        );

        if (typeof model.getValue() != 'undefined'){
            this.showRemoveButton();
        }

        // Add Text
//        div_upload.append($('<p></p>').text('Drag your image here').css("margin","1em"));

        var inputFileUpload =  $('<input style="display: none">').attr({
            'type': 'file'
        });

        var button = $('<button>Choose from disk</button>').attr({
            'class': 'btn btn-primary'
        });
        button.click(function() {
            inputFileUpload.click();
        });
        button.css("margin","2em");
        div_upload.append(button);
        div_upload.append(inputFileUpload);

        div_url.append(this.form);
        div.append(div_url);
        div.append(div_upload);
        result.append(ul);
        result.append(div);

        return result;

    },

    onAcceptClick: function(event) {
        var me = event.data.dialog;
        me.form.trigger('submit');
        event.stopPropagation();
    }
});

mindplot.widget.ImageEditor.SIZE = {
    HEIGHT_IMG_EDITOR: 100,
    WIDTH_IMG_EDITOR: 600,
    HEIGHT_IMG_TOPIC: 100,
    WIDTH_IMG_TOPIC: 100
};

