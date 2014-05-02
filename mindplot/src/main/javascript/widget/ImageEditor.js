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







        // Add Text
        });
        if (model.getValue() != null){
        }

            setTimeout(function () {
                }
            }, 0);
        });

        });


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
        }





        return result;

    },

    onAcceptClick: function() {
        $("#imageFormId").submit();
    }
});
