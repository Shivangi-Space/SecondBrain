package com.secondbrain.nativemodules.legacyutils;

import android.content.Context;
import android.net.Uri;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.IOException;

public class FileUtils {
    public String copyUriToInternalStorage(Context context, Uri uri, String fileName) throws IOException {
        InputStream inputStream = context.getContentResolver().openInputStream(uri);
        if(inputStream == null) {
            throw new IOException("Unable to open input stream for Uri: " + uri.toString());
        }

        File outputDir = new File(context.getFilesDir(), "documents");
        if(!outputDir.exists()){
            outputDir.mkdirs();
        }

        File outputFile = new File(outputDir, fileName);
        FileOutputStream outputStream = new FileOutputStream(outputFile);

        byte[] buffer = new byte[4096];
        int bytesRead;

        while((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }

        outputStream.close();
        inputStream.close();

        return outputFile.getAbsolutePath();
    }
}