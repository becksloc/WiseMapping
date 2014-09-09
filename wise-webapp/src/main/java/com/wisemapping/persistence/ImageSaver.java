package com.wisemapping.persistence;

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
    public static String save(@NotNull final File folder, @NotNull final String name, @Nullable final String extension, final byte[] data) throws NoSuchAlgorithmException, IOException {
        final StringBuilder fileNameBuilder = new StringBuilder();
        final int hashCode = Arrays.hashCode(data);
        fileNameBuilder.append(name).append("-").append(hashCode);
        if (extension != null) {
            fileNameBuilder.append(extension);
        }
        final String fileName = fileNameBuilder.toString();
        FileOutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(new File(folder, fileName));
            outputStream.write(data);
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }
        return fileName;
    }
}
