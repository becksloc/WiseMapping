package com.wisemapping.model;


import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class Image {

    //~ Instance fields ......................................................................................
    private int id;
    @NotNull private String name;
    @NotNull private User creator;
    @NotNull private Mindmap map;
    @Nullable private String extension;

    public Image() {
        this(new Mindmap(), new User());
    }

    public Image(@NotNull final Mindmap map, @NotNull final User creator) {
        this.creator = creator;
        this.map = map;
    }

    public void setCreator(@NotNull User creator) {
        this.creator = creator;
    }

    @NotNull
    public User getCreator() {
        return creator;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @NotNull
    public Mindmap getMap() {
        return map;
    }

    public void setMap(@NotNull Mindmap map) {
        this.map = map;
    }

    @Nullable
    public String getExtension() {
        return extension;
    }

    public void setExtension(@Nullable String extension) {
        this.extension = extension;
    }

    @NotNull
    public String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

}
