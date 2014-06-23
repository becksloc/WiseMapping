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
        this.model = model;
        this.parent($msg("Image"), {
            cancelButton: true,
            closeButton: true,
            acceptButton: true,
            removeButton: true,
            errorMessage: false,
            onRemoveClickData: {model: this.model}
        });
        this.css({width:"600px"});
        this.form = $("#imageFormId");
        this.imagePreview = $("#imagePreview");
        var editor = $("#imageEditor");
        if (editor.length == 0) {
            editor = this._buildPanel();
        }
        this.setContent(editor);
    },

    _buildPanel:function () {
        var result = $('<div id="imageEditor"></div>').css("margin-bottom", "-2em"); //FIXME: remove this hack for centered preview

        /* building tab bar */
        var tabBar = $('<ul class="nav nav-tabs"></ul>');

        var urlTab = $('<li class="active"></li>').append($('<a href="#tab1" data-toggle="tab"></a>').html($msg('FROM_URL')));
        tabBar.append(urlTab);

        var uploadTab = $('<li></li>').append($('<a href="#tab2" data-toggle="tab"></a>').html($msg('UPLOAD')));
        tabBar.append(uploadTab);

        /* building tab contents..*/
        var div = $('<div></div>').attr({
            'class':'tab-content'
        });

        this.form = this._buildForm();

        if (typeof this.model.getValue() != 'undefined'){
            this.showRemoveButton();
        }

        // Add Text
//        fromFileContent.append($('<p></p>').text('Drag your image here').css("margin","1em"));

        var inputFileUpload =  $('<input type="file" style="display: none">');

        var button = $('<button class="btn btn-primary">Choose from disk</button>');
        button.click(function() {
            inputFileUpload.click();
        });
        button.css("margin","2em");
        var urlContent = $('<div id="tab1" class="tab-pane active"></div>');
        urlContent.append(this.form);
        div.append(urlContent);
        var fromFileContent = $('<div id="tab2" class="tab-pane fade"></div>').append(button).append(inputFileUpload);
        div.append(fromFileContent);
        result.append(tabBar);
        result.append(div);

        return result;

    },

    onAcceptClick: function(event) {
        $("#imageFormId").trigger('submit', [event.data.dialog]);
        event.stopPropagation();
    },

    _buildForm: function() {
        var form = $('<form action="none" id="imageFormId"></form>');
        // Add Text
        var text = $('<p></p>').text("Paste your link below:");
        text.css("margin","1em");
        form.append(text);

        // Add Input
        var input = $('<input/>').attr({
            'placeholder': 'http://www.example.com/',
            'required': 'true',
            'autofocus': 'autofocus',
            'class': 'form-control'
        });

        form.append(input);

        this.imagePreview = $('<img>').attr({
            'class': 'img-thumbnail',
            'id': 'imagePreview'
        });
        this.imagePreview.hide();
        this.imagePreview.css({
            margin:"1em auto"
        });

        form.append($('<div></div>').css('display', 'flex').append(this.imagePreview));

        var me = this;
        // register event for thumbnail
        input.keyup(function(event){
            setTimeout(function () {
                if (input.val().length != 0) {
                    me._loadThumbail(input.val());
                }
            }, 0);
        });

        this.imagePreview.bind('error', function (event) {
            var errorImage = "images/image-not-found.png"
            $(this).prop('src', errorImage);
        });

        form.on("submitData",
            function (event, dialog) {
                event.preventDefault();
                var resizeTopicImg = dialog._calculateAspectRatioFit(dialog.imagePreview.width(), dialog.imagePreview.height(), mindplot.widget.ImageEditor.SIZE.WIDTH_IMG_TOPIC, mindplot.widget.ImageEditor.SIZE.HEIGHT_IMG_TOPIC);
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
                    dialog.model.setValue(inputValue, resizeTopicImg, imgSource);
                }
                dialog.close();
            }
        );
        return form;
    },

    show: function() {
        var me = this;
        this.form.unbind("submit").on("submit", function(event) {
            $(this).trigger("submitData", [me])
            event.preventDefault();
        });
        var input = this.form.find("input");
        this.imagePreview.hide();
        input.val("");
        if (this.model.getValue() != null){
            input.val(this.model.getValue());
            this._loadThumbail(input.val());
        }
        this.parent();
    },

    //preview of the image
    _loadThumbail: function(src) {
        var me = this;
        this.imagePreview.prop('src', src).load(function() {
            var resize = me._calculateAspectRatioFit($(this).width(), $(this).height(), mindplot.widget.ImageEditor.SIZE.WIDTH_IMG_EDITOR, mindplot.widget.ImageEditor.SIZE.HEIGHT_IMG_EDITOR);
            $(this).width(resize.width);
            $(this).height(resize.height);
            $(this).show();
        });
    },

    //resize the image to fit in the dialog
    _calculateAspectRatioFit: function(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
            width: srcWidth * ratio,
            height: srcHeight * ratio
        };
    }
});

mindplot.widget.ImageEditor.SIZE = {
    HEIGHT_IMG_EDITOR: 100,
    WIDTH_IMG_EDITOR: 600,
    HEIGHT_IMG_TOPIC: 100,
    WIDTH_IMG_TOPIC: 100
};

