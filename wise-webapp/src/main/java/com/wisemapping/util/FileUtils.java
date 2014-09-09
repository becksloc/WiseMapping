package com.wisemapping.util;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.File;

public final class FileUtils {

    public static final String IMAGE_FOLDER = "userImages";

    private FileUtils() {}

    @NotNull
    public static String getFileName(@NotNull final String fullName) {
        String result = fullName;
        final int i = fullName.lastIndexOf(".");
        if (i != -1) {
            result = fullName.substring(0, i);
        }
        return result;
    }

    @Nullable
    public static String getFileExtension(@NotNull final String fullName) {
        String result = null;
        final int i = fullName.lastIndexOf(".");
        if (i != -1) {
            result = fullName.substring(i);
        }
        return result;
    }

    public static File getUserImagesFolder(@NotNull final String contextPath) {
        final File folder = new File(contextPath, IMAGE_FOLDER);
        if (!folder.exists()) {
            folder.mkdir();
        }
        return folder;

    }
}
