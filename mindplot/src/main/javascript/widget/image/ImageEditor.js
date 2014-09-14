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

mindplot.widget.image.ImageEditor = new Class({
    Extends: BootstrapDialog,

    initialize:function (model) {
        $assert(model, "model can not be null");
        this.parent($msg("Image"), {
            cancelButton: true,
            closeButton: true,
            removeButton: typeof model.getValue() != 'undefined',
            onRemoveClickData: {model: model}
        });
        this.css({width:"800px"});
        this.tabs = {
            tab1: new mindplot.widget.image.UrlTab(model, 'tab1', true),
            tab2: new mindplot.widget.image.UploadTab(model, 'tab2'),
            tab3: new mindplot.widget.image.MyImagesTab(model, 'tab3')
        };
        this.setContent(this._buildPanel());
    },

    onDialogShown: function(event) {
        var model = event.data.model;
        var dialog = event.data.dialog;
        if (model.getValue()) {
            dialog.tabs['tab1'].input.trigger('keyup');
            $(this).find('textarea').focus();
        }
    },

    _buildPanel:function () {
        var result = $('<div id="imageEditor"></div>').css("margin-bottom", "-2em");

        /* building tab bar */
        var tabBar = $('<ul class="nav nav-tabs"></ul>');

        var urlTab = this.tabs["tab1"];
        urlTab.appendTo(tabBar);
        var uploadTab = this.tabs["tab2"];
        uploadTab.appendTo(tabBar);
        var myImageTab = this.tabs["tab3"];
        myImageTab.appendTo(tabBar)

        /* building tab contents..*/
        var div = $('<div></div>').attr({
            'class':'tab-content'
        });

        urlTab.appendContainerTo(div);
        uploadTab.appendContainerTo(div);
        myImageTab.appendContainerTo(div);

        result.append(tabBar);
        result.append(div);

        return result;

    },

    onAcceptClick: function(event) {
        var dialog = event.data.dialog;
        var activeTabId = $(".tab-content div.tab-pane.active").attr('id');
        var tab = dialog.tabs[activeTabId];

        tab.submitData(dialog.model);
        event.stopPropagation();
        dialog.close();
    },

    show: function() {
        this.parent();
    },

    onRemoveClick: function(event) {
        event.data.model.setValue(null,null,null);
        event.data.dialog.close();
    }
});


