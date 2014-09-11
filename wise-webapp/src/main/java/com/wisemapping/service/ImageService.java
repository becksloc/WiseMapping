package com.wisemapping.service;

import com.wisemapping.exceptions.WiseMappingException;
import com.wisemapping.model.Image;
import com.wisemapping.model.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;

public interface ImageService {

    void addImage(@NotNull final Image image) throws WiseMappingException;

    @NotNull List<Image> getAll(@NotNull final User user);

    @Nullable
    Image getImageById(int id);

    void removeImage(Image image);

    Image getImageByHashCode(int fileHashCode,final User user);
}
