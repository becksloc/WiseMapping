package com.wisemapping.rest.model;

import com.wisemapping.model.Image;
import com.wisemapping.util.FileUtils;
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

@XmlRootElement(name = "image")
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
    private String location;

    public RestImage(@NotNull final Image image) {
        this.image = image;
    }

    public RestImage() {
        this(new Image());
    }

    public void setId(int id) {
        this.image.setId(id);
    }

    public int getId() {
        return this.image.getId();
    }

    public void setName(@NotNull final String name) {
        this.image.setName(name);
    }

    @Nullable
    public String getName() {
        return this.image.getName();
    }

    public void setLocation(@NotNull final String location) {
        this.location = location;
    }

    @Nullable
    public String getLocation() {
        return this.location;
    }

}
