package com.wisemapping.service;

import com.wisemapping.dao.ImageManager;
import com.wisemapping.exceptions.WiseMappingException;
import com.wisemapping.model.Image;
import com.wisemapping.model.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;

public class ImageServiceImpl implements ImageService {

    private ImageManager imageManager;

    public void setImageManager(ImageManager imageManager) {
        this.imageManager = imageManager;
    }

    @Override
    public void addImage(@NotNull final Image image) throws WiseMappingException {
        imageManager.addImage(image);
    }

    @NotNull
    @Override
    public List<Image> getAll(@NotNull final User user) {
        return imageManager.getAllImages(user);
    }

    @Override @Nullable
    public Image getImageById(int id) {
        return imageManager.getImageById(id);
    }
}
