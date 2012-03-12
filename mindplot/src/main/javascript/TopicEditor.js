/*
 *    Copyright [2011] [wisemapping]
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

mindplot.TopicEditor = new Class({
    Extends: Events,
    Static: {
        _instance: null,

        configure: function(options) {
            this._instance = new mindplot.TopicEditor();
        },

        getInstance : function() {
            return this._instance;
        }
    },

    initialize:function() {
        this._activeEditor = null;
        this._multilineEditor = new mindplot.MultilineTextEditor();
    },

    close : function(update) {
        if (this.isVisible()) {
            this._activeEditor.close(update);
            this._activeEditor = null;
        }
    },

    show : function(topic, options) {

        // Close all previous open editor ....
        if (this.isVisible()) {
            this.close();
        }

        // Open the new editor ...
        var model = topic.getModel();
        if (model.getShapeType() != mindplot.model.TopicShape.IMAGE) {
            this._multilineEditor.show(topic, options ? options.text : null);
            this._activeEditor = this._multilineEditor;
        } else {
            // To be implemented....
        }
    },

    isVisible: function() {
        return this._activeEditor != null && this._activeEditor.isVisible();
    }
});
