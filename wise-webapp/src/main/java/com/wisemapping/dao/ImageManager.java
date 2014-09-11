package com.wisemapping.dao;

import com.wisemapping.model.Image;
import com.wisemapping.model.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;

public interface ImageManager {

    void addImage(@NotNull final Image image);

    void saveImage(@NotNull final Image image);

    @NotNull
    List<Image> getAllImages(@NotNull final User user);

    @Nullable
    Image getImageById(int id);

    void remove(Image image);
}
