# Android Studio Build Guide

Follow these steps to convert this Web App into a Native Android APK.

## 1. Setup
1. Run `npm run build` in your web project.
2. Create a new **Empty Views Activity** project in Android Studio.
3. Create folder: `app/src/main/assets/www`.
4. Copy the contents of your `dist` folder into `assets/www`.

## 2. AndroidManifest.xml
Open `app/src/main/AndroidManifest.xml` and replace the content. This enables hardware acceleration (smooth scrolling) and internet access (if you update the app later).

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.NUCGPAGenius"
        android:hardwareAccelerated="true"
        tools:targetApi="31">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden"
            android:theme="@style/Theme.NUCGPAGenius">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

## 3. Layout XML
Open `app/src/main/res/layout/activity_main.xml` and replace with this. It creates a full-screen WebView.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## 4. Kotlin Code (MainActivity.kt)
Open `app/src/main/java/com/yourpackage/nucgpagenius/MainActivity.kt`.
This code handles the local file loading and ensures "Local Storage" works (critical for your Save feature).

```kotlin
package com.estiyak.nucgpagenius // Make sure this matches your package name

import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var myWebView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        myWebView = findViewById(R.id.webview)
        
        // Configure WebView Settings
        val webSettings: WebSettings = myWebView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true // CRITICAL: Enables LocalStorage for saving results
        webSettings.databaseEnabled = true
        webSettings.allowFileAccess = true
        
        // Improve performance
        webSettings.cacheMode = WebSettings.LOAD_DEFAULT
        
        // Ensure links open within the app, not in Chrome
        myWebView.webViewClient = WebViewClient()

        // Load the local index.html file
        myWebView.loadUrl("file:///android_asset/www/index.html")

        // Handle Back Button (Go back in browser history instead of closing app)
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (myWebView.canGoBack()) {
                    myWebView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }
}
```

## 5. Build APK
1. In Android Studio, go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
2. Once done, click **locate** to find your `app-debug.apk`.
3. Transfer this to your phone to test!
