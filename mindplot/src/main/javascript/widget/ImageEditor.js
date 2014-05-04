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
    Extends:BootstrapDialog,

    initialize:function (model) {
        $assert(model, "model can not be null");
        this._model = model;
        this.parent($msg("Image"), {  //FIXME: $msg("IMAGE")
            cancelButton: true,
            closeButton: true,
            acceptButton: true,
            removeButton: true,
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
        tab1.html('From URL');//FIXME:cambiar a $msg('FROM_URL')
        li_url.append(tab1);
        var tab2 = $('<a></a>').attr({
            'href':'#tab-2',
            'data-toggle':'pill'
        });
        tab2.html('Upload'); //FIXME:cambiar a $msg('UPLOAD')
        li_upload.append(tab2);

        ul.append(li_upload);
        ul.append(li_url);

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

        var form = $('<form></form>').attr({
            'action': 'none',
            'id': 'imageFormId'
        });

        // Add Text
        var text = $('<p></p>').text("Paste your link below:");
        text.css("margin","1em");

        form.append(text);

        // Add Input
        var input = $('<input/>').attr({
            'placeholder': 'http://www.example.com/',
            'type': 'url', //FIXME: THIS not work on IE, see workaround below
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

        form.append(input);

        var imagePreview = $('<img>').attr({
            'title':'IMAGEN',
            'class': 'img-thumbnail',
            'id': 'imagePreview'
        })
        imagePreview.hide();
        imagePreview.css({
            margin:"1em auto"
        });

        form.append($('<div></div>').css('display', 'flex').append(imagePreview));

        //preview of the image
        function preload(src) {
            imagePreview.prop('src', src).load(function() {
                var me = $(this);
                var resize = calculateAspectRatioFit(me.width(), me.height(), 300, 100);
                me.width(resize.width);
                me.height(resize.height);
                me.show();
            });


        }

        //resize the image to fit in the dialog
        function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
            var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            return {
                width: srcWidth * ratio,
                height: srcHeight * ratio
            };
        }

        $(document).ready(function () {
            var me = this;
            $(document).on('submit','#imageFormId',function (event) {
                event.stopPropagation();
                event.preventDefault();
                var inputValue = input.val();
                if (inputValue != null && inputValue.trim() != "") {
                    model.setValue(inputValue);
                }
                me.close();
            });

        });

        if (typeof model.getValue() != 'undefined'){
            this.showRemoveButton();
        }

        // Add Text
        div_upload.append($('<p></p>').text('Drag your image here').css("margin","1em"));

        div_url.append(form);
        div.append(div_url);
        div.append(div_upload);
        result.append(ul);
        result.append(div);

        return result;

    },

    onAcceptClick: function() {
        $("#imageFormId").submit();
    }
});
