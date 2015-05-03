package com.wisemapping.test.export;

import com.wisemapping.exporter.ExportException;
import com.wisemapping.exporter.ExportFormat;
import com.wisemapping.exporter.ExportProperties;
import com.wisemapping.exporter.ExporterFactory;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.commons.io.FileUtils;
import org.jetbrains.annotations.NotNull;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import javax.xml.parsers.ParserConfigurationException;
import java.io.*;

@Test
public class ExportSVGBasedTest {
    private static final String DATA_DIR_PATH = "src/test/resources/data/svg/";

    @Test(dataProvider = "Data-Provider-Function")
    public void exportPngTest(@NotNull final File svgFile) throws IOException, ExportException, TranscoderException, ParserConfigurationException {
        final String name = svgFile.getName();
        final File pngFile = new File(DATA_DIR_PATH, name.substring(0, name.lastIndexOf(".")) + ".png");
        final File pdfFile = new File(DATA_DIR_PATH, name.substring(0, name.lastIndexOf(".")) + ".pdf");
        final File svgExpFile = new File(DATA_DIR_PATH, name.substring(0, name.lastIndexOf(".")) + "-exp.svg");
        final String svgXml = FileUtils.readFileToString(svgFile, "UTF-8");

        exportPng(svgFile, pngFile, svgXml);
        exportPdf(svgFile, pdfFile, svgXml);
        exportSvg(svgFile, svgExpFile, svgXml);

    }
    
    private void exportSvg(File svgFile, File pdfFile, String svgXml) throws IOException, ExportException, TranscoderException, ParserConfigurationException {
        final ExportFormat format = ExportFormat.SVG;
        final ExportProperties properties = ExportProperties.create(format);

        String baseUrl = svgFile.getParentFile().getAbsolutePath() + "/../../../../../../wise-editor/src/main/webapp";
        ExporterFactory factory = new ExporterFactory(new File(baseUrl));
        // Write content ...
        if (pdfFile.exists()) {
            // Export mile content ...
            final ByteArrayOutputStream bos = new ByteArrayOutputStream();
            factory.export(properties, null, bos, svgXml);
        } else {
            OutputStream outputStream = new FileOutputStream(pdfFile, false);
            factory.export(properties, null, outputStream, svgXml);
            outputStream.close();
        }
    }

    private void exportPng(File svgFile, File pngFile, String svgXml) throws ParserConfigurationException, ExportException, IOException, TranscoderException {
        final ExportFormat format = ExportFormat.PNG;
        final ExportProperties properties = ExportProperties.create(format);
        final ExportProperties.ImageProperties imageProperties = (ExportProperties.ImageProperties) properties;
        imageProperties.setSize(ExportProperties.ImageProperties.Size.LARGE);

        String baseUrl = svgFile.getParentFile().getAbsolutePath() + "/../../../../../../wise-editor/src/main/webapp";
        ExporterFactory factory = new ExporterFactory(new File(baseUrl));
        // Write content ...
        if (pngFile.exists()) {
            // Export mile content ...
            final ByteArrayOutputStream bos = new ByteArrayOutputStream();
            factory.export(imageProperties, null, bos, svgXml);
        } else {
            OutputStream outputStream = new FileOutputStream(pngFile, false);
            factory.export(imageProperties, null, outputStream, svgXml);
            outputStream.close();
        }
    }

    private void exportPdf(File svgFile, File pdfFile, String svgXml) throws ParserConfigurationException, ExportException, IOException, TranscoderException {
        final ExportFormat format = ExportFormat.PDF;
        final ExportProperties properties = ExportProperties.create(format);

        String baseUrl = svgFile.getParentFile().getAbsolutePath() + "/../../../../../../wise-editor/src/main/webapp";
        ExporterFactory factory = new ExporterFactory(new File(baseUrl));
        // Write content ...
        if (pdfFile.exists()) {
            // Export mile content ...
            final ByteArrayOutputStream bos = new ByteArrayOutputStream();
            factory.export(properties, null, bos, svgXml);
        } else {
            OutputStream outputStream = new FileOutputStream(pdfFile, false);
            factory.export(properties, null, outputStream, svgXml);
            outputStream.close();
        }
    }

    //This function will provide the parameter data
    @DataProvider(name = "Data-Provider-Function")
    public Object[][] parameterIntTestProvider() {

        final File dataDir = new File(DATA_DIR_PATH);
        final File[] svgFile = dataDir.listFiles(new FilenameFilter() {

            public boolean accept(File dir, String name) {
                return name.endsWith(".svg") &&  !name.contains( "-exp.svg");
            }
        });

        if(svgFile==null){
            throw new IllegalArgumentException("Wrong based path specified. Change based path...");
        }

        final Object[][] result = new Object[svgFile.length][4];
        for (int i = 0; i < svgFile.length; i++) {
            File freeMindFile = svgFile[i];
            result[i] = new Object[]{freeMindFile};
        }

        return result;
    }


}
