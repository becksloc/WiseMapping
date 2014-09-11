package com.wisemapping.rest.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.wisemapping.model.Image;
import org.jetbrains.annotations.NotNull;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "images")
@XmlAccessorType(XmlAccessType.PROPERTY)
@JsonAutoDetect(
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        getterVisibility = JsonAutoDetect.Visibility.PUBLIC_ONLY,
        isGetterVisibility = JsonAutoDetect.Visibility.PUBLIC_ONLY)

public class RestImageList {

    @NotNull
    private final List<RestImage> restImages;

    public RestImageList(){
        this.restImages = new ArrayList<>();
    }

    public RestImageList(@NotNull final List<Image> images) {
        this.restImages = new ArrayList<>(images.size());
        for (Image image : images) {
            this.restImages.add(new RestImage(image));
        }
    }

    @NotNull @XmlElement(name = "image")
    public List<RestImage> getImages() {
        return restImages;
    }
}
