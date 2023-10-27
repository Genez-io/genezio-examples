package com.example.qrgeneratorfrontend;

import java.lang.System;

@kotlin.Metadata(mv = {1, 8, 0}, k = 1, d1 = {"\u0000T\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u000b\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u000e\n\u0000\b\u0007\u0018\u00002\u00020\u0001B\u0005\u00a2\u0006\u0002\u0010\u0002J\u0012\u0010\u0015\u001a\u00020\u00162\b\u0010\u0017\u001a\u0004\u0018\u00010\u0018H\u0014J\u000e\u0010\u0019\u001a\u00020\u00162\u0006\u0010\u001a\u001a\u00020\u001bR\u000e\u0010\u0003\u001a\u00020\u0004X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0005\u001a\u00020\u0006X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0007\u001a\u00020\bX\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u000e\u0010\t\u001a\u00020\nX\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u000b\u001a\u00020\nX\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\f\u001a\u00020\rX\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u000e\u001a\u00020\u000fX\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0010\u001a\u00020\u0011X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0012\u001a\u00020\u0006X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0013\u001a\u00020\u0014X\u0082.\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u001c"}, d2 = {"Lcom/example/qrgeneratorfrontend/CreateQRCodeActivity;", "Landroidx/appcompat/app/AppCompatActivity;", "()V", "bitmap", "Landroid/graphics/Bitmap;", "generateQRBtn", "Landroid/widget/Button;", "imageSet", "", "msgEdt", "Landroid/widget/EditText;", "nameEdit", "progressBar", "Landroid/widget/ProgressBar;", "qrCodeViewModel", "Lcom/example/qrgeneratorfrontend/viewModels/QRCodeViewModel;", "qrIV", "Landroid/widget/ImageView;", "saveQRBtn", "userLogged", "Lcom/genezio/sdk/UserId;", "onCreate", "", "savedInstanceState", "Landroid/os/Bundle;", "showAlertDialog", "text", "", "app_debug"})
public final class CreateQRCodeActivity extends androidx.appcompat.app.AppCompatActivity {
    private android.widget.ImageView qrIV;
    private android.widget.EditText msgEdt;
    private android.widget.Button generateQRBtn;
    private android.widget.Button saveQRBtn;
    private android.widget.EditText nameEdit;
    private android.widget.ProgressBar progressBar;
    private android.graphics.Bitmap bitmap;
    private boolean imageSet = false;
    private com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel qrCodeViewModel;
    private com.genezio.sdk.UserId userLogged;
    
    public CreateQRCodeActivity() {
        super();
    }
    
    public final void showAlertDialog(@org.jetbrains.annotations.NotNull
    java.lang.String text) {
    }
    
    @java.lang.Override
    protected void onCreate(@org.jetbrains.annotations.Nullable
    android.os.Bundle savedInstanceState) {
    }
}