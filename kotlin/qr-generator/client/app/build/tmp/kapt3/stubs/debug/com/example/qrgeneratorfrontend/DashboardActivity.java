package com.example.qrgeneratorfrontend;

import java.lang.System;

@kotlin.Metadata(mv = {1, 8, 0}, k = 1, d1 = {"\u0000L\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\u000e\n\u0000\b\u0007\u0018\u00002\u00020\u00012\u00020\u0002B\u0005\u00a2\u0006\u0002\u0010\u0003J\b\u0010\u000e\u001a\u00020\u000fH\u0016J\u0012\u0010\u0010\u001a\u00020\u000f2\b\u0010\u0011\u001a\u0004\u0018\u00010\u0012H\u0014J\u0010\u0010\u0013\u001a\u00020\u000f2\u0006\u0010\u0014\u001a\u00020\u0015H\u0016J\u000e\u0010\u0016\u001a\u00020\u000f2\u0006\u0010\u0017\u001a\u00020\u0018R\u000e\u0010\u0004\u001a\u00020\u0005X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\u0006\u001a\u00020\u0007X\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\b\u001a\u00020\tX\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\n\u001a\u00020\u000bX\u0082.\u00a2\u0006\u0002\n\u0000R\u000e\u0010\f\u001a\u00020\rX\u0082.\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u0019"}, d2 = {"Lcom/example/qrgeneratorfrontend/DashboardActivity;", "Landroidx/appcompat/app/AppCompatActivity;", "Lcom/example/qrgeneratorfrontend/adapters/QRCodesAdapter$OnCodeDeleteClickListener;", "()V", "binding", "Lcom/example/qrgeneratorfrontend/databinding/ActivityDashboardBinding;", "fabButton", "Lcom/google/android/material/floatingactionbutton/FloatingActionButton;", "qrCodeViewModel", "Lcom/example/qrgeneratorfrontend/viewModels/QRCodeViewModel;", "qrCodesAdapter", "Lcom/example/qrgeneratorfrontend/adapters/QRCodesAdapter;", "userLogged", "Lcom/genezio/sdk/UserId;", "onBackPressed", "", "onCreate", "savedInstanceState", "Landroid/os/Bundle;", "onDeleteClick", "item", "Lcom/genezio/sdk/QRCodeId;", "showAlertDialog", "text", "", "app_debug"})
public final class DashboardActivity extends androidx.appcompat.app.AppCompatActivity implements com.example.qrgeneratorfrontend.adapters.QRCodesAdapter.OnCodeDeleteClickListener {
    private com.example.qrgeneratorfrontend.databinding.ActivityDashboardBinding binding;
    private com.genezio.sdk.UserId userLogged;
    private com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel qrCodeViewModel;
    private com.google.android.material.floatingactionbutton.FloatingActionButton fabButton;
    private com.example.qrgeneratorfrontend.adapters.QRCodesAdapter qrCodesAdapter;
    
    public DashboardActivity() {
        super();
    }
    
    public final void showAlertDialog(@org.jetbrains.annotations.NotNull
    java.lang.String text) {
    }
    
    @java.lang.Override
    protected void onCreate(@org.jetbrains.annotations.Nullable
    android.os.Bundle savedInstanceState) {
    }
    
    @java.lang.Override
    public void onDeleteClick(@org.jetbrains.annotations.NotNull
    com.genezio.sdk.QRCodeId item) {
    }
    
    @java.lang.Override
    public void onBackPressed() {
    }
}