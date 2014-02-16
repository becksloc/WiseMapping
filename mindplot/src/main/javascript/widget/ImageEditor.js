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
    Extends:MooDialog,
    initialize:function (model) {
        $assert(model, "model can not be null");
        var panel = this._buildPanel(model);
        this.parent({
            closeButton:true,
            destroyOnClose:true,
            title:$msg('Add Image'),
            onInitialize:function (wrapper) {
                wrapper.setStyle('opacity', 0);
                this.fx = new Fx.Morph(wrapper, {
                    duration:600,
                    transition:Fx.Transitions.Bounce.easeOut
                });
            },

            onBeforeOpen:function () {
                this.overlay = new Overlay(this.options.inject, {
                    duration:this.options.duration
                });
                if (this.options.closeOnOverlayClick)
                    this.overlay.addEvent('click', this.close.bind(this));

                this.overlay.open();

                this.fx.start({
                    'margin-top':[-200, -100],
                    opacity:[0, 1]
                }).chain(function () {
                    this.fireEvent('show');
                }.bind(this));
            },

            onBeforeClose:function () {
                this.fx.start({
                    'margin-top':[-100, 0],
                    opacity:0
                }).chain(function () {
                    this.fireEvent('hide');
                }.bind(this));
                this.overlay.destroy();
            }
        });
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
        if (model.getValue() != null)
            input.value = model.getValue();

        input.setStyles({
            width:'99%',
            margin:"10px 0px"

        });
        input.inject(form);

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

    show:function () {
        this.open();
    }
});
