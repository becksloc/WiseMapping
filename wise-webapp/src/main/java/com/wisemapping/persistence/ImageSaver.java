package com.wisemapping.persistence;

import com.wisemapping.model.Image;
import org.jetbrains.annotations.NotNull;

import java.io.FileOutputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class ImageSaver {

    private static final String IMAGE_FOLDER = "/images";

    private ImageSaver() {}

    @NotNull
    public static String save(@NotNull final Image image, final byte[] data) throws NoSuchAlgorithmException, IOException {
        final String name = image.getName();
        final StringBuilder fileNameBuilder = new StringBuilder(IMAGE_FOLDER);
        final MessageDigest md5 = MessageDigest.getInstance("MD5");
        final byte[] digest = md5.digest(data);
        fileNameBuilder.append("/").append(name).append("-").append(new String(digest));
        final String fileName = fileNameBuilder.toString();
        FileOutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(fileName);
            outputStream.write(data);
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }
        return fileName;
    }
}
