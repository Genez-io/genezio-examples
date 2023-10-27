package com.example.qrgeneratorfrontend;

import java.lang.System;

@kotlin.Metadata(mv = {1, 8, 0}, k = 1, d1 = {"\u0000>\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u000e\n\u0000\b\u0007\u0018\u00002\u00020\u0001B\u0005\u00a2\u0006\u0002\u0010\u0002J\u0012\u0010\r\u001a\u00020\u000e2\b\u0010\u000f\u001a\u0004\u0018\u00010\u0010H\u0014J\u000e\u0010\u0011\u001a\u00020\u000e2\u0006\u0010\u0012\u001a\u00020\u0013R\u000e\u0010\u0003\u001a\u00020\u0004X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0005\u001a\u00020\u0006X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0007\u001a\u00020\bX\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\t\u001a\u00020\nX\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u000b\u001a\u00020\fX\u0082.\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u0014"}, d2 = {"Lcom/example/qrgeneratorfrontend/ViewCodeActivity;", "Landroidx/appcompat/app/AppCompatActivity;", "()V", "binding", "Lcom/example/qrgeneratorfrontend/databinding/ActivityViewCodeBinding;", "progressBar", "Landroid/widget/ProgressBar;", "qrCodeViewModel", "Lcom/example/qrgeneratorfrontend/viewModels/QRCodeViewModel;", "titleView", "Landroid/widget/TextView;", "userLogged", "Lcom/genezio/sdk/UserId;", "onCreate", "", "savedInstanceState", "Landroid/os/Bundle;", "showAlertDialog", "text", "", "app_debug"})
public final class ViewCodeActivity extends androidx.appcompat.app.AppCompatActivity {
    private com.example.qrgeneratorfrontend.databinding.ActivityViewCodeBinding binding;
    private com.genezio.sdk.UserId userLogged;
    private com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel qrCodeViewModel;
    private android.widget.ProgressBar progressBar;
    private android.widget.TextView titleView;
    
    public ViewCodeActivity() {
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