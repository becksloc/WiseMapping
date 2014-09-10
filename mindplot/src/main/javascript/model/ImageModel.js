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

mindplot.model.ImageModel = new Class({
    Extends:mindplot.model.FeatureModel,
    initialize:function (attributes) {
        this.parent(mindplot.model.ImageModel.FEATURE_TYPE);
        this.setValue(attributes.value);
    },

    getValue:function () {
        return this.getAttribute('value');
    },

    setValue:function (value) {
        $assert(value, 'image source can not be null');
        if (this.getType() == 'url') {
            value = this._fixUrl(value);
        }
        this.setAttribute('value', value);
    },

    _fixUrl:function (url) {
        var result = url;
        if (!result.contains('http://') && !result.contains('https://')) {
            result = "http://" + result;
        }
        return result;
    }
});

mindplot.model.ImageModel.FEATURE_TYPE = 'image';