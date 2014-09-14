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

mindplot.widget.image.AbstractTab = new Class({

    initialize: function(model, tabName, tabId, active) {
        $assert(model, 'model could not be null');
        $assert(tabName, 'tabName could not be null');
        $assert(tabId, 'tabId could not be null');
        this.model = model;
        this.name = tabName;
        this._native = $('<li></li>')
            .append($('<a data-toggle="tab"></a>')
                        .attr('href', "#" + tabId)
                        .html(tabName));
        this.imagePreview = this._buildImagePreview();
        this.container = $('<div class="tab-pane fade"></div>').attr('id', tabId);
        this.content = this._buildContent();
        this.container.append(this.content);
        if (active) {
            this._native.attr('class', "active");
            this.container.attr('class', "tab-pane active");
        }
    },

    _buildImagePreview: function() {
        return new mindplot.widget.image.ImagePreview();
    },

    //preview of the image
    _loadThumbnail: function(src) {
        this.imagePreview.loadThumbnail(src);
    },

    appendTo: function(element) {
        element.append(this._native);
    },

    appendContainerTo: function(element) {
        element.append(this.container);
    },

    submitData: function() {

    }
});