package com.wisemapping.test.export;

import com.wisemapping.exporter.ExportException;
import com.wisemapping.exporter.ExportFormat;
import com.wisemapping.exporter.Exporter;
import com.wisemapping.exporter.XSLTExporter;
import com.wisemapping.importer.ImporterException;
import com.wisemapping.model.Mindmap;
import org.apache.commons.io.FileUtils;
import org.jetbrains.annotations.NotNull;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.*;

@Test
public class ExportXsltBasedTest {
    private static final String DATA_DIR_PATH = "src/test/resources/data/export/";
    private static final String ENC_UTF_8 = "UTF-8";


    @Test(dataProvider = "Data-Provider-Function")
    public void exportImportExportTest(@NotNull XSLTExporter.Type type, @NotNull final File wisemap, @NotNull final File recFile) throws ImporterException, IOException, ExportException {

        final Exporter exporter = XSLTExporter.create(type);
        byte[] wiseMapContent = FileUtils.readFileToByteArray(wisemap);
        if (recFile.exists()) {
            // Compare rec and file ...
            final String recContent = FileUtils.readFileToString(recFile, ENC_UTF_8);

            // Export mile content ...
            final ByteArrayOutputStream bos = new ByteArrayOutputStream();
            exporter.export(wiseMapContent, bos);
            final String exportContent = new String(bos.toByteArray(), ENC_UTF_8);
            Assert.assertEquals(exportContent, recContent);

        } else {
            final OutputStream fos = new FileOutputStream(recFile);
            exporter.export(wiseMapContent, fos);
            fos.close();
        }
    }

    private Mindmap load(@NotNull File wisemap) throws IOException {
        final byte[] recContent = FileUtils.readFileToByteArray(wisemap);
        final Mindmap result = new Mindmap();
        result.setUnzipXml(recContent);
        return result;
    }

    //This function will provide the parameter data
    @DataProvider(name = "Data-Provider-Function")
    public Object[][] parameterIntTestProvider() {

        final File dataDir = new File(DATA_DIR_PATH);
        final File[] freeMindFiles = dataDir.listFiles(new FilenameFilter() {

            public boolean accept(File dir, String name) {
                return name.endsWith(".wxml");
            }
        });

        final Object[][] result = new Object[freeMindFiles.length * 7][2];
        for (int i = 0; i < freeMindFiles.length; i++) {
            File freeMindFile = freeMindFiles[i];
            final String name = freeMindFile.getName();

            int pos = i * 7;
            final String fileName = name.substring(0, name.lastIndexOf("."));
            result[pos++] = new Object[]{XSLTExporter.Type.TEXT, freeMindFile, new File(DATA_DIR_PATH, fileName + "." + ExportFormat.TEXT.getFileExtension())};
            result[pos++] = new Object[]{XSLTExporter.Type.CSV, freeMindFile, new File(DATA_DIR_PATH, fileName + ".csv")};
            result[pos++] = new Object[]{XSLTExporter.Type.WORD, freeMindFile, new File(DATA_DIR_PATH, fileName + "." + ExportFormat.MICROSOFT_WORD.getFileExtension())};
            result[pos++] = new Object[]{XSLTExporter.Type.LATEX, freeMindFile, new File(DATA_DIR_PATH, fileName + ".latex")};
            result[pos++] = new Object[]{XSLTExporter.Type.MICROSOFT_EXCEL, freeMindFile, new File(DATA_DIR_PATH, fileName + "." + ExportFormat.MICROSOFT_EXCEL.getFileExtension())};
            result[pos++] = new Object[]{XSLTExporter.Type.OPEN_OFFICE, freeMindFile, new File(DATA_DIR_PATH, fileName + "." + ExportFormat.OPEN_OFFICE_WRITER.getFileExtension())};
            result[pos++] = new Object[]{XSLTExporter.Type.MINDJET, freeMindFile, new File(DATA_DIR_PATH, fileName + "." + ExportFormat.MINDJET.getFileExtension())};

        }

        return result;
    }
}
