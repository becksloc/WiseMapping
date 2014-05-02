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
        this.parent($msg("Add Image"), {
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
        var result = new Element('div');
        result.setStyle("padding-top", "15px");

        var ul = new Element('ul', {'class':'nav nav-tabs','id':'imageUlId'});

        var li_url = new Element('li', {'class':'active'});
        var li_upload = new Element('li');

        var tab1 = new Element('a', { href:'#tab-1', 'data-toggle':'tab', text:'From URL' });
        tab1.setStyle('text-decoration', 'none');
        tab1.inject(li_url);
        var tab2 = new Element('a', { href:'#tab-2', 'data-toggle':'tab', text:'Upload' });
        tab2.setStyle('text-decoration', 'none');
        tab2.inject(li_upload);

        li_url.inject(ul);
        li_upload.inject(ul);

        var div = new Element('div', {'class':'tab-content'});
        var div_url = new Element('div', {'class':'tab-pane active', 'id':'tab-1'});
        var div_upload = new Element('div', {'class':'tab-pane fade', 'id':'tab-2'});

        var form = new Element('form');

        // Add Text
        new Element('p', {text:'Paste your link below'}).inject(form);

        // Add Input ...
        var input = new Element('input', {
            placeholder:'http://www.example.com/',
            type:Browser.ie ? 'text' : 'url', // IE workaround
            required:true,
            autofocus:'autofocus'
        });
        if (model.getValue() != null){
            input.value = model.getValue();
        }

        input.setStyles({
            width:'99%',
            margin:"10px 0px"

        });
        input.addEvent('keyup', function(event){
            setTimeout(function () {
                if (input.value.length != 0) {
                    preload(input.value);
                }
            }, 0);
        });
        input.inject(form);

        var ima = new Element('img', {'title':'IMAGEN', 'src':'http://aprendeenlinea.udea.edu.co/lms/sitio/file.php/1/boletin/201212/bol27_image04.png'});
        ima.setStyles({
            width:'99%',
            height:"100px",
            margin:"10px 0px"
        });

        ima.inject(form);
        ima.hide();

        var errorUrl = new Element('p',{text:"Invalid URL"});
        errorUrl.setStyle('color', 'red');
        errorUrl.inject(form);
        errorUrl.hide();

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
            return { width: srcWidth*ratio, height: srcHeight*ratio };
        }

        // Register submit event ...
        form.addEvent('submit', function (event) {
            event.stopPropagation();
            event.preventDefault();
            if (input.value != null && input.value.trim() != "") {
                model.setValue(input.value);
            }
            this.close();
        }.bind(this));

        form.inject(div_url);

        // Add Text
        new Element('p', {text:'Drag your image here'}).inject(div_upload);
        div_url.inject(div);

        div_upload.inject(div);
        ul.inject(result);
        div.inject(result);

        result.addEvent('keydown', function (event) {
            event.stopPropagation();
        });

        return result;

    },

    onAcceptClick: function() {
        $("#imageFormId").submit();
    }
});
