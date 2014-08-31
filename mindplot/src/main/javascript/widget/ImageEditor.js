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
        this.filePreview = $("#filePreview");
        this.uploadContent = $("#uploadContent");
        this.inputFileUpload = $("#inputFileUpload");
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

        var urlTab = $('<li type="url" class="active"></li>').append($('<a href="#tab1" data-toggle="tab"></a>').html($msg('FROM_URL')));
        tabBar.append(urlTab);

        var uploadTab = $('<li type="disk"></li>').append($('<a href="#tab2" data-toggle="tab"></a>').html($msg('UPLOAD')));
        tabBar.append(uploadTab);

        /* building tab contents..*/
        var div = $('<div></div>').attr({
            'class':'tab-content'
        });

        this.form = this._buildForm();

        this.uploadContent = this._buildFormUpload();

        var urlContent = $('<div id="tab1" class="tab-pane active"></div>');
        urlContent.append(this.form);
        div.append(urlContent);
        var fromFileContent = $('<div id="tab2" class="tab-pane fade"></div>');
        fromFileContent.append(this.uploadContent);
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
                    me._loadThumbail(input.val(),me.imagePreview);
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
                if (input.val() != null && input.val().trim() != "") {
                    dialog.model.setValue(input.val(), resizeTopicImg, me.imgSource);
                }
                dialog.close();
            }
        );
        return form;
    },

    _buildFormUpload: function(){
        this.uploadContent = $('<div id="uploadContent"></div>');
        this.inputFileUpload =  $('<input type="file" id="fileUpload" style="display: none">');

        var me = this;
        this.inputFileUpload.on('change', function() {
            $("#fileName").text(me.inputFileUpload.val());
            buttonUpload.text("Upload Image");
            buttonUpload.prop({
                'disabled':false
            });
            buttonUpload.show();
        });

        var button = $('<button class="btn btn-primary">Choose from disk</button>');
        button.click(function() {
            me.inputFileUpload.click();
        });

        button.css("margin","2em");


        var fileName = $('<p id="fileName" class="col-md-8"></p>');

        var buttonUpload = $('<button class="btn btn-info col-md-4">Upload Image</button>');
        buttonUpload.click(function(){
            var reader = new FileReader();
            reader.onload = function(event){
                console.log(event);
                buttonUpload.text("Image uploaded successfully!");
                buttonUpload.prop({
                    'disabled':true
                });
                me._loadThumbail(reader.result,me.filePreview);
            };
            reader.readAsDataURL(me.inputFileUpload.get(0).files[0]);
        });

        var container = $('<div class="row" style="padding-left: 2em"></div>');

        this.filePreview = $('<img>').attr({
            'class': 'img-thumbnail',
            'id': 'imagePreview'
        });
        this.filePreview.hide();
        this.filePreview.css({
            margin:"1em auto"
        });


        this.uploadContent.append(button).append(this.inputFileUpload).append(container.append(fileName).append(buttonUpload));
        this.uploadContent.append($('<div></div>').css('display', 'flex').append(this.filePreview));

        return this.uploadContent;

    },

    show: function() {
        var me = this;
        this.form.unbind("submit").on("submit", function(event) {
            $(this).trigger("submitData", [me])
            event.preventDefault();
        });
        var input = this.form.find("input");
//        this.uploadContent.find("input").val("");
        this.uploadContent.find("p").text("");
        me.uploadContent.find('.btn-info').hide();

        this.imagePreview.hide();
        this.filePreview.hide();

        input.val("");
        if (this.model.getValue() != null){
            input.val(this.model.getValue());
            this._loadThumbail(input.val());
        }
        if (typeof this.model.getValue() != 'undefined'){
            this.showRemoveButton();
        }
        this.parent();
    },

    //preview of the image
    _loadThumbail: function(src,tab) {
        var me = this;
        tab.prop('src', src).load(function() {
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

