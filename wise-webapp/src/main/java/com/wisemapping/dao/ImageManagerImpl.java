package com.wisemapping.dao;

import com.wisemapping.model.Image;
import com.wisemapping.model.User;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import java.util.List;

public class ImageManagerImpl extends HibernateDaoSupport
        implements ImageManager {

    @Override
    public void addImage(@NotNull final Image image) {
        saveImage(image);
    }

    @Override
    public void saveImage(@NotNull final Image image) {
        getSession().save(image);
    }

    @NotNull
    @Override
    public List<Image> getAllImages(@NotNull final User user) {
        return getHibernateTemplate().find("from com.wisemapping.model.Image wisemapping where user_id=?", user.getId());
    }

    @Nullable
    @Override
    public Image getImageById(int id) {
        final List<Image> images = getHibernateTemplate().find("from com.wisemapping.model.Image wisemapping where id=?", id);
        return getFirst(images);
    }

    @Nullable private Image getFirst(List<Image> images) {
        Image result = null;
        if (images != null && !images.isEmpty()) {
            result = images.get(0);
        }
        return result;
    }
    
}
