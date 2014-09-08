package com.wisemapping.persistence;

import com.wisemapping.model.Image;

import java.io.FileOutputStream;
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class ImageSaver {

    private static final String IMAGE_FOLDER = "/images";

    private ImageSaver() {}

    public static void save(Image image, byte[] data) throws NoSuchAlgorithmException, IOException {
        String name = image.getName();
        final StringBuilder fileName = new StringBuilder(IMAGE_FOLDER);
        final MessageDigest md5 = MessageDigest.getInstance("MD5");
        final byte[] digest = md5.digest(data);
        fileName.append("/").append(name).append("-").append(new String(digest));
        FileOutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(fileName.toString());
            outputStream.write(data);
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }
    }
}
