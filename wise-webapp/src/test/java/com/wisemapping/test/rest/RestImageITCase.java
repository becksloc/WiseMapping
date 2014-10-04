package com.wisemapping.test.rest;

import com.wisemapping.exceptions.WiseMappingException;
import com.wisemapping.rest.model.RestImage;
import com.wisemapping.rest.model.RestImageList;
import com.wisemapping.util.FileUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.testng.Assert;
import org.testng.FileAssert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.wisemapping.test.rest.RestHelper.BASE_REST_URL;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

@Test
public class RestImageITCase {

    private String userEmail;
    private static final String DATA_DIR_PATH = "src/test/resources/data/image/";

    @BeforeClass
    void createUser() {
        final RestAdminITCase restAdminITCase = new RestAdminITCase();
        userEmail = restAdminITCase.createNewUser(MediaType.APPLICATION_JSON);
    }

    @Test(dataProvider="Image-Provider-Function")
    public void saveImage(final @NotNull File image, final @NotNull MediaType mediaType) throws IOException, WiseMappingException {
        RestTemplate template = RestHelper.createTemplate(userEmail + ":" + "admin");
        final URI imageLocation = addNewImage(template, image);
        String expectedLocation = buildImageLocation(image);

        assertEquals(imageLocation.getPath(), expectedLocation, "Image could not be save properly");

        final RestImageList restImageList = getImages(template, mediaType);
        boolean found = false;
        for (RestImage restImage : restImageList.getImages()) {
            if (expectedLocation.equals(restImage.getLocation())) {
                found = true;
            }
        }

        assertTrue(found, "Image could not be found");
    }


    @Test(dataProvider="Image-Provider-Function")
    public void deleteImage(final @NotNull File image, final @NotNull MediaType mediaType) throws IOException, WiseMappingException {
        final RestTemplate template = RestHelper.createTemplate(userEmail + ":" + "admin");

        final URI imageLocation = addNewImage(template, image);
        String expectedLocation = buildImageLocation(image);

        RestImageList restImageList = getImages(template, mediaType);
        int imageId = 0;
        for (RestImage restImage : restImageList.getImages()) {
            if (expectedLocation.equals(restImage.getLocation())) {
                imageId = restImage.getId();
            }
        }

        template.delete(RestHelper.HOST_PORT + "/service/maps/img/" + imageId);

        restImageList = getImages(template, mediaType);
        for (RestImage restImage : restImageList.getImages()) {
            if (expectedLocation.equals(restImage.getLocation())) {
                Assert.fail("Image could not be removed:" + imageLocation);
            }
        }

    }

    static URI addNewImage(@NotNull RestTemplate template, File image) throws IOException {

        MultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();
        parts.add("file", new FileSystemResource(image.getAbsoluteFile()));
        return template.postForLocation(BASE_REST_URL + "/maps/img", parts);

    }

    private String buildImageLocation(File image) throws IOException {
        final String fileName = FileUtils.getFileName(image.getName());
        final String fileExtension = FileUtils.getFileExtension(image.getName());
        int hashCode = FileUtils.getFileHashCode(Files.readAllBytes(Paths.get(String.valueOf(image.getAbsoluteFile()))));
        final StringBuilder fileNameBuilder = new StringBuilder();
        return FileUtils.IMAGE_FOLDER + "/" + fileNameBuilder.append(fileName).append('-').append(hashCode).append(fileExtension).toString();
    }

    static RestImageList getImages(RestTemplate template, MediaType mediaType) {
        final HttpHeaders requestHeaders = RestHelper.createHeaders(mediaType);
        final HttpEntity findImageEntity = new HttpEntity(requestHeaders);
        final ResponseEntity<RestImageList> response = template.exchange(BASE_REST_URL + "/maps/img", HttpMethod.GET, findImageEntity, RestImageList.class);
        return response.getBody();
    }

    //This function will provide the parameter data
    @DataProvider(name = "Image-Provider-Function")
    public Object[][] parameterImageTestProvider() {

        final MediaType[] types = {MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON};
        final String testNameToRun = System.getProperty("wise.test.name");

        final File imagesDir = new File(DATA_DIR_PATH);
        final File[] imageFiles = imagesDir.listFiles(new FilenameFilter() {

            public boolean accept(File dir, String name) {
                return name.endsWith(".jpg") && (testNameToRun == null || name.startsWith(testNameToRun));
            }
        });
        final Object[][] result = new Object[imageFiles.length * types.length][2];
        for (int i = 0; i < imageFiles.length; i++) {
            File image = imageFiles[i];
            for (int j = 0; j < types.length; j++) {
                MediaType type = types[j];
                result[(i * types.length) + j] = new Object[]{image, type};
            }
        }

        return result;
    }

}
