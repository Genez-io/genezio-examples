package com.example.qrgeneratorfrontend.viewModels;

import java.lang.System;

@kotlin.Metadata(mv = {1, 8, 0}, k = 1, d1 = {"\u0000F\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\u0010\u000e\n\u0000\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\b\u0005\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0002\b\n\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0004\b\u0007\u0018\u00002\u00020\u0001B\r\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\u0016\u0010\u001e\u001a\u00020\u001f2\u0006\u0010 \u001a\u00020!2\u0006\u0010\u001a\u001a\u00020\u0003J\u0016\u0010\"\u001a\u00020\u001f2\u0006\u0010#\u001a\u00020\n2\u0006\u0010\u001a\u001a\u00020\u0003J\u000e\u0010$\u001a\u00020\u001f2\u0006\u0010\u001a\u001a\u00020\u0003R\u0014\u0010\u0005\u001a\b\u0012\u0004\u0012\u00020\u00070\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u001c\u0010\b\u001a\u0010\u0012\f\u0012\n\u0012\u0004\u0012\u00020\n\u0018\u00010\t0\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u001c\u0010\u000b\u001a\u0010\u0012\f\u0012\n\u0012\u0004\u0012\u00020\n\u0018\u00010\t0\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\f\u001a\b\u0012\u0004\u0012\u00020\u00070\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\r\u001a\b\u0012\u0004\u0012\u00020\u00030\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u001c\u0010\u000e\u001a\u0010\u0012\f\u0012\n\u0012\u0004\u0012\u00020\n\u0018\u00010\t0\u0006X\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0017\u0010\u000f\u001a\b\u0012\u0004\u0012\u00020\u00070\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0011\u0010\u0012R+\u0010\u0013\u001a\u001c\u0012\u0018\u0012\u0016\u0012\u0004\u0012\u00020\n\u0018\u00010\tj\n\u0012\u0004\u0012\u00020\n\u0018\u0001`\u00140\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0015\u0010\u0012R+\u0010\u0016\u001a\u001c\u0012\u0018\u0012\u0016\u0012\u0004\u0012\u00020\n\u0018\u00010\tj\n\u0012\u0004\u0012\u00020\n\u0018\u0001`\u00140\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0017\u0010\u0012R\u0017\u0010\u0018\u001a\b\u0012\u0004\u0012\u00020\u00070\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0019\u0010\u0012R\u0017\u0010\u001a\u001a\b\u0012\u0004\u0012\u00020\u00030\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u001b\u0010\u0012R+\u0010\u001c\u001a\u001c\u0012\u0018\u0012\u0016\u0012\u0004\u0012\u00020\n\u0018\u00010\tj\n\u0012\u0004\u0012\u00020\n\u0018\u0001`\u00140\u0010\u00a2\u0006\b\n\u0000\u001a\u0004\b\u001d\u0010\u0012\u00a8\u0006%"}, d2 = {"Lcom/example/qrgeneratorfrontend/viewModels/QRCodeViewModel;", "Landroidx/lifecycle/ViewModel;", "userLoggedIn", "Lcom/genezio/sdk/UserId;", "(Lcom/genezio/sdk/UserId;)V", "_error", "Landroidx/lifecycle/MutableLiveData;", "", "_newCode", "Ljava/util/ArrayList;", "Lcom/genezio/sdk/QRCodeId;", "_qrcodes", "_status", "_user", "_viewCode", "error", "Landroidx/lifecycle/LiveData;", "getError", "()Landroidx/lifecycle/LiveData;", "newCode", "Lkotlin/collections/ArrayList;", "getNewCode", "qrcodes", "getQrcodes", "status", "getStatus", "user", "getUser", "viewCode", "getViewCode", "addQRCode", "", "qrCode", "Lcom/genezio/sdk/QRCode;", "deleteQRCode", "qrCodeId", "getCodes", "app_debug"})
public final class QRCodeViewModel extends androidx.lifecycle.ViewModel {
    private final androidx.lifecycle.MutableLiveData<java.lang.String> _status = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.lang.String> status = null;
    private final androidx.lifecycle.MutableLiveData<com.genezio.sdk.UserId> _user = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<com.genezio.sdk.UserId> user = null;
    private final androidx.lifecycle.MutableLiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> _qrcodes = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> qrcodes = null;
    private final androidx.lifecycle.MutableLiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> _newCode = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> newCode = null;
    private final androidx.lifecycle.MutableLiveData<java.lang.String> _error = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.lang.String> error = null;
    private final androidx.lifecycle.MutableLiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> _viewCode = null;
    @org.jetbrains.annotations.NotNull
    private final androidx.lifecycle.LiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> viewCode = null;
    
    public QRCodeViewModel(@org.jetbrains.annotations.NotNull
    com.genezio.sdk.UserId userLoggedIn) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.lang.String> getStatus() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<com.genezio.sdk.UserId> getUser() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> getQrcodes() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> getNewCode() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.lang.String> getError() {
        return null;
    }
    
    @org.jetbrains.annotations.NotNull
    public final androidx.lifecycle.LiveData<java.util.ArrayList<com.genezio.sdk.QRCodeId>> getViewCode() {
        return null;
    }
    
    public final void getCodes(@org.jetbrains.annotations.NotNull
    com.genezio.sdk.UserId user) {
    }
    
    public final void addQRCode(@org.jetbrains.annotations.NotNull
    com.genezio.sdk.QRCode qrCode, @org.jetbrains.annotations.NotNull
    com.genezio.sdk.UserId user) {
    }
    
    public final void deleteQRCode(@org.jetbrains.annotations.NotNull
    com.genezio.sdk.QRCodeId qrCodeId, @org.jetbrains.annotations.NotNull
    com.genezio.sdk.UserId user) {
    }
}