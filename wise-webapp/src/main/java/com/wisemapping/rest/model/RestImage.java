package com.wisemapping.rest.model;

import com.wisemapping.model.Image;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import static org.codehaus.jackson.annotate.JsonAutoDetect.Visibility.NONE;
import static org.codehaus.jackson.annotate.JsonAutoDetect.Visibility.PUBLIC_ONLY;

@XmlRootElement(name = "label")
@XmlAccessorType(XmlAccessType.PROPERTY)
@JsonAutoDetect(
        fieldVisibility = NONE,
        setterVisibility = PUBLIC_ONLY,
        isGetterVisibility = NONE,
        getterVisibility = PUBLIC_ONLY
)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RestImage {

    @JsonIgnore
    private Image image;
    private byte[] data;


    public RestImage() {
        this.image = new Image();
    }

    @JsonIgnore
    public Image getDelegated() {
        return this.image;
    }

    public int getMindmapId() {
        return this.image.getMap().getId();
    }

    public void setMindmapId(final int mindmapId) {
        this.image.getMap().setId(mindmapId);
    }

    public long getUserId() {
        return this.image.getCreator().getId();
    }

    public void setUserId(final long userId) {
        this.image.getCreator().setId(userId);
    }

    public void setName(@NotNull final String name) {
        this.image.setName(name);
    }

    @NotNull public String getName() {
        return this.image.getName();
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    @Nullable public String getExtension() {
        return this.image.getExtension();
    }

    public void setExtension(@Nullable final String extension) {
        this.image.setExtension(extension);
    }
}
