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

mindplot.widget.image.MyImagesTab = new Class({
    Extends: mindplot.widget.image.AbstractTab,

    initialize: function(model, tabId, active) {
        this.parent(model, $msg("GALLERY"), tabId, active);
    },

    _buildContent: function() {
        var form = $('<form action="none" id="imageFormId"></form>');
        // Add Text
        form.append($('<p style="margin: 1em"></p>').text($msg("SELECT_IMAGE")));

        form.append(this._createGallery());
        return form;
    },
    
    submitData: function() {
        var image = $('.thumbnailBorderSelected').find('img');
        var location = image.attr('src');
        var width = image.width();
        var height = image.height();
        var aspectRatioFit = mindplot.widget.image.ImagePreview._calculateAspectRatioFit(width, height);
        this.model.setValue(location, aspectRatioFit, "disk");
    },

    _createGallery: function() {
        var gallery = $('<div class="row"></div>');
        var me = this;
        jQuery.ajax("c/restful/maps/img/", {
            async:false,
            dataType:'json',
            type:'GET',
            success:function (data) {
                _.each(data.images,function(value) {
                    gallery.append(me._createThumbnail(value));
                });
            },
            error:function (jqXHR, textStatus, errorThrown) {
                $('#messagesPanel div').text(errorThrown).parent().show();
            }
        });
        return gallery;
    },

    _createThumbnail: function(value) {
        var container = $('<div class="col-xs-6 col-md-3"></div>');
        container.attr('id', 'imageContainer' + value.id);
        var thumbnailBorder = this._createThumbnailBorder();
        var remover = this._createRemover();
        var img = $('<img>');
        img.attr('alt', $msg("IMAGE_NOT_FOUND"));
        img.attr('id', value.id);
        img.attr('src', value.location);
        thumbnailBorder.append(remover);
        thumbnailBorder.append(img);
        container.append(thumbnailBorder);
        return container;
    },

    _createThumbnailBorder: function() {
        var thumbnailBorder = $('<div class="thumbnail thumbnailBorder"></div>');
        thumbnailBorder.click(function() {
            var allThumbs = $(".thumbnail");
            allThumbs.removeClass("thumbnailBorderSelected");
            allThumbs.addClass("thumbnailBorder");
            $(this).addClass("thumbnailBorderSelected");
        });
        thumbnailBorder.on("mouseover", function() {
            $(this).find(".thumbnailClose").show();
        });
        thumbnailBorder.on("mouseleave", function() {
            $(this).find(".thumbnailClose").hide();
        });
        return thumbnailBorder;
    },

    _createRemover: function() {
        var remover = $('<div class="thumbnailClose">×</div>');
        remover.on("click", function () {
            console.log("removeImage");
            var imageId = $(this).siblings().attr("id");
            jQuery.ajax({
                url: "c/restful/maps/img/" + imageId,
                async: false,
                type: 'delete',
                success: function () {
                    $("#imageContainer" + imageId).remove();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('#messagesPanel div').text(errorThrown).parent().show();
                }
            });
        });
        return remover;
    }
});