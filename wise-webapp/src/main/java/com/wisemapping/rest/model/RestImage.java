package com.wisemapping.rest.model;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.jetbrains.annotations.NotNull;

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
    private String extension;

    private String mindmapId;

    private String userId;
    private byte[] data;


    public RestImage() {
    }

    @NotNull
    public String getMindmapId() {
        return mindmapId;
    }

    public void setMindmapId(@NotNull final String mindmapId) {
        this.mindmapId = mindmapId;
    }

    @NotNull
    public String getUserId() {
        return userId;
    }

    public void setUserId(@NotNull final String userId) {
        this.userId = userId;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
