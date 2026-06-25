package com.secondbrain.nativeModules.pdfParser

import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.secondbrain.nativemodules.legacyutils.FileUtils
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader
import com.tom_roush.pdfbox.pdmodel.PDDocument
import com.tom_roush.pdfbox.text.PDFTextStripper
import java.io.File

class PdfParserModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    init{
        PDFBoxResourceLoader.init(reactContext)
    }
    override fun getName(): String = "PdfParserModule"

    @ReactMethod
    fun extractText(contentUri: String, fileName: String, promise: Promise) {
        try{
            val uri = Uri.parse(contentUri)

            // Step 1 - Copy the picked file in internal storage (Java utility)
            val localPath = FileUtils().copyUriToInternalStorage(getReactApplicationContext(), uri, fileName)

            // Step 2 - Extract text using PdfBox
            val document = PDDocument.load(File(localPath))
            val stripper = PDFTextStripper()
            val extractedText = stripper.getText(document)
            document.close()

            // Actual extraction logic
            promise.resolve(extractedText);
        } catch (e: Exception) {
            promise.reject("EXTRACTION_ERROR", e.message, e);
        }
    }
}