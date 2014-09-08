package com.wisemapping.model;


import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

public class Image {

    //~ Instance fields ......................................................................................
    private int id;
    @NotNull private String name;
    @NotNull private User creator;
    @NotNull private Mindmap map;


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
    @NotNull
    public String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

}
