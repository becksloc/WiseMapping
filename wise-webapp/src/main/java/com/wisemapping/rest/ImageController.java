package com.wisemapping.rest;

import com.wisemapping.exceptions.ImageCouldNotFoundException;
import com.wisemapping.exceptions.WiseMappingException;
import com.wisemapping.model.Image;
import com.wisemapping.model.User;
import com.wisemapping.persistence.ImageSaver;
import com.wisemapping.rest.model.RestImageList;
import com.wisemapping.security.Utils;
import com.wisemapping.service.ImageService;
import com.wisemapping.util.FileUtils;
import com.wordnik.swagger.annotations.Api;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Controller
public class ImageController extends BaseController {

    @Qualifier("imageService")
    @Autowired
    private ImageService imageService;


    @RequestMapping(method = RequestMethod.POST, value = "/maps/img", produces = {"application/xml", "application/json", "text/plain"})
    @ResponseStatus(value = HttpStatus.OK)
    public void saveImage(@RequestParam("file") MultipartFile file, @NotNull HttpServletResponse response) throws WiseMappingException {
        final User user = Utils.getUser();
        final String originalFileName = file.getOriginalFilename();
        final String fileName = FileUtils.getFileName(originalFileName);
        final String extension = FileUtils.getFileExtension(originalFileName);
        try {
            final String saveFileName = ImageSaver.save(FileUtils.getUserImagesFolder(this.context.getRealPath("")), fileName, extension, file.getBytes());
            final Image image = new Image();
            assert user != null;
            image.setCreator(user);
            image.setName(saveFileName);
            image.setExtension(extension);
            imageService.addImage(image);
            response.setHeader("Location", FileUtils.IMAGE_FOLDER + "/" + saveFileName);
        } catch (IOException | NoSuchAlgorithmException e) {
            throw new WiseMappingException("image cannot be saved", e);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/maps/img", produces = {"application/json", "application/xml"})
    public RestImageList retrieveList() {
        final User user = Utils.getUser();
        assert user != null;
        final List<Image> all = imageService.getAll(user);
        return new RestImageList(all);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/maps/img")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteImageById(@RequestParam("imageId") int imageId) throws WiseMappingException {
        final Image image = imageService.getImageById(imageId);
        if (image == null) {
            throw new ImageCouldNotFoundException("Image could not be found. Id:" + imageId);
        }
        imageService.removeImage(image);
    }
}
