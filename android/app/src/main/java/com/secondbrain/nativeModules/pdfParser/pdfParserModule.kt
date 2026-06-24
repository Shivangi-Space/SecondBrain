package com.secondbrain.nativeModules.pdfParser

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class PdfParserModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "PdfParserModule"

    @ReactMethod
    fun extractText(filePath: String, promise: Promise) {
        try{
            // Actual extraction logic
            promise.resolve("placeholder");
        } catch (e: Exception) {
            promise.reject("EXTRACTION_ERROR", e);
        }
    }
}