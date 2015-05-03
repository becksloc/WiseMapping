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

mindplot.widget.image.UrlTab = new Class({
    Extends: mindplot.widget.image.AbstractTab,

    initialize: function(model, tabId, active) {
        this.parent(model, $msg("FROM_URL"), tabId, active);
    },

    _buildContent: function() {
        this.form = $('<form action="none" id="imageFormId"></form>');
        // Add Text
        this.form.append($('<p style="margin: 1em"></p>').text($msg("PASTE_YOUR_LINK")));

        // Add Input
        this.input = $('<input/>').attr({
            'placeholder': 'http://www.example.com/',
            'required': 'true',
            'autofocus': 'autofocus',
            'class': 'form-control'
        });

        this.input.on("keypress", function(event) {
            event.stopPropagation();
        });

        this.form.append(this.input);
        this.imagePreview.appendTo(this.form);

        this._registerInputEvents();
        this.form.on('submit', function(event){
            event.preventDefault();
            event.stopPropagation();
        });
        return this.form;
    },
    
    submitData: function() {
        var resizeTopicImg = mindplot.widget.image.ImagePreview._calculateAspectRatioFit(this.imagePreview.getWidth(), this.imagePreview.getHeight(),
            mindplot.widget.image.ImagePreview.SIZE.WIDTH_IMG_TOPIC, mindplot.widget.image.ImagePreview.SIZE.HEIGHT_IMG_TOPIC);
        var inputValue = this.input.val();
        if (inputValue != null && inputValue.trim() != "") {
            this.model.setValue(inputValue, resizeTopicImg, "url");
        }
    },

    _registerInputEvents: function() {
        var me = this;
        // register event for thumbnail
        this.input.keyup(function(event){
            me.fireEvent("change");
            var inputValue = $(this).val();
            if (inputValue.length != 0) {
                me.form.find("#imagePreview").remove();
                me.imagePreview = me._buildImagePreview();
                me.imagePreview.appendTo(me.form);
                me._loadThumbnail(inputValue);
            }
            me.fireEvent("loaded");
        });

        var previousValue = this.model.getValue();
        if (previousValue) {
            this.input.val(previousValue);
        }
    }
});