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

mindplot.widget.image.UploadTab = new Class({
    Extends: mindplot.widget.image.AbstractTab,

    initialize: function(model, tabId, active) {
        this.parent(model, $msg("UPLOAD"), tabId, active);
    },

    _buildContent: function() {

        var uploadContent = $('<div id="uploadContent"></div>');
        // Add Text
        uploadContent.append($('<p style="margin: 1em"></p>').text($msg("SELECT_IMAGE")));

        this.inputFileUpload =  $('<input type="file" name="file" id="fileUpload" style="display: none">');

        var me = this;
        var button = $('<button class="btn"></button>')
            .html($msg('CHOOSE_FROM_DISK'))
            .css({"color": "white", "background-color": "black"})
            .click(function() {
                me.inputFileUpload.click();
            });

        var fileName = $('<input id="fileName" readonly="readonly" class="form-control">');
        var container = $('<div class="input-group"></div>');

        var spanControl = $('<span class="input-group-btn"></span>');
        spanControl.append(button);

        uploadContent.append(this.inputFileUpload).append(container.append(fileName).append(spanControl));
        this.imagePreview.appendTo(uploadContent);

        this.inputFileUpload.on('change', function() {
            var name = $(this).val().replace("fakepath", "..");
            fileName.val(name);
            var reader = new FileReader();
            reader.onload = function(event){
                me._loadThumbnail(reader.result);
            };
            reader.readAsDataURL(me.inputFileUpload.get(0).files[0]);
        });

        return uploadContent;
    },

    submitData: function() {
        var resizeTopicImg = this.imagePreview._calculateAspectRatioFit(
            mindplot.widget.image.ImagePreview.SIZE.WIDTH_IMG_TOPIC,
            mindplot.widget.image.ImagePreview.SIZE.HEIGHT_IMG_TOPIC
        );
        var formData = new FormData();
        formData.append('file', this.inputFileUpload.get(0).files[0]);
        formData.append('mindmapId', this.model.getMindmapId());
        var me = this;
        $.ajax({
            type: 'post',
            url: "c/restful/maps/img",
            data: formData,
            contentType:false,
            processData: false,
            async: false,
            success: function(data, status, xhr) {
                me.model.setValue(xhr.getResponseHeader('Location'), resizeTopicImg, "disk");
            }
        });
    }
});