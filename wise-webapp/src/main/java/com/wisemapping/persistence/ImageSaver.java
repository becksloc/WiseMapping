package com.wisemapping.persistence;

import com.wisemapping.model.Image;
import com.wisemapping.util.FileUtils;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

public class ImageSaver {

    private ImageSaver() {}

    @NotNull
    public static Image save(@NotNull final File folder, @NotNull final String originalFileName, final byte[] data) throws NoSuchAlgorithmException, IOException {
        Image image = new Image();
        final StringBuilder fileNameBuilder = new StringBuilder();
        final String fileName = FileUtils.getFileName(originalFileName);
        final String extension = FileUtils.getFileExtension(originalFileName);
        final int hashCode = FileUtils.getFileHashCode(data);
        fileNameBuilder.append(fileName).append("-").append(hashCode);
        if (extension != null) {
            fileNameBuilder.append(extension);
        }
        final String fileSystemFileName = fileNameBuilder.toString();
        FileOutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(new File(folder, fileSystemFileName));
            outputStream.write(data);
            image.setName(fileSystemFileName);
            image.setHashCode(hashCode);
            image.setExtension(extension);
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }
        return image;
    }
}
