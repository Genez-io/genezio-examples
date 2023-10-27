package com.example.qrgeneratorfrontend.adapters;

import java.lang.System;

@kotlin.Metadata(mv = {1, 8, 0}, k = 1, d1 = {"\u0000B\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0010 \n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0010\b\n\u0000\n\u0002\u0010\u0002\n\u0002\b\u0004\n\u0002\u0018\u0002\n\u0002\b\u0006\b\u0007\u0018\u00002\b\u0012\u0004\u0012\u00020\u00020\u0001:\u0002\u0019\u001aB+\u0012\f\u0010\u0003\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004\u0012\u0006\u0010\u0006\u001a\u00020\u0007\u0012\u0006\u0010\b\u001a\u00020\t\u0012\u0006\u0010\n\u001a\u00020\u000b\u00a2\u0006\u0002\u0010\fJ\b\u0010\r\u001a\u00020\u000eH\u0016J\u0018\u0010\u000f\u001a\u00020\u00102\u0006\u0010\u0011\u001a\u00020\u00022\u0006\u0010\u0012\u001a\u00020\u000eH\u0016J\u0018\u0010\u0013\u001a\u00020\u00022\u0006\u0010\u0014\u001a\u00020\u00152\u0006\u0010\u0016\u001a\u00020\u000eH\u0016J\u0014\u0010\u0017\u001a\u00020\u00102\f\u0010\u0018\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004R\u000e\u0010\n\u001a\u00020\u000bX\u0082\u0004\u00a2\u0006\u0002\n\u0000R\u0014\u0010\u0003\u001a\b\u0012\u0004\u0012\u00020\u00050\u0004X\u0082\u000e\u00a2\u0006\u0002\n\u0000R\u000e\u0010\b\u001a\u00020\tX\u0082\u0004\u00a2\u0006\u0002\n\u0000\u00a8\u0006\u001b"}, d2 = {"Lcom/example/qrgeneratorfrontend/adapters/QRCodesAdapter;", "Landroidx/recyclerview/widget/RecyclerView$Adapter;", "Lcom/example/qrgeneratorfrontend/adapters/QRCodesAdapter$QRCodeViewHolder;", "qrCodes", "", "Lcom/example/qrgeneratorfrontend/classes/QRCodeIdDelete;", "context", "Landroid/content/Context;", "userLoggedIn", "Lcom/genezio/sdk/UserId;", "onCodeDeleteClickListener", "Lcom/example/qrgeneratorfrontend/adapters/QRCodesAdapter$OnCodeDeleteClickListener;", "(Ljava/util/List;Landroid/content/Context;Lcom/genezio/sdk/UserId;Lcom/example/qrgeneratorfrontend/adapters/QRCodesAdapter$OnCodeDeleteClickListener;)V", "getItemCount", "", "onBindViewHolder", "", "holder", "position", "onCreateViewHolder", "parent", "Landroid/view/ViewGroup;", "viewType", "refreshData", "newCodes", "OnCodeDeleteClickListener", "QRCodeViewHolder", "app_debug"})
public final class QRCodesAdapter extends androidx.recyclerview.widget.RecyclerView.Adapter<com.example.qrgeneratorfrontend.adapters.QRCodesAdapter.QRCodeViewHolder> {
    private java.util.List<com.example.qrgeneratorfrontend.classes.QRCodeIdDelete> qrCodes;
    private final com.genezio.sdk.UserId userLoggedIn = null;
    private final com.example.qrgeneratorfrontend.adapters.QRCodesAdapter.OnCodeDeleteClickListener onCodeDeleteClickListener = null;
    
    public QRCodesAdapter(@org.jetbrains.annotations.NotNull
    java.util.List<com.example.qrgeneratorfrontend.classes.QRCodeIdDelete> qrCodes, @org.jetbrains.annotations.NotNull
    android.content.Context context, @org.jetbrains.annotations.NotNull
    com.genezio.sdk.UserId userLoggedIn, @org.jetbrains.annotations.NotNull
    com.example.qrgeneratorfrontend.adapters.QRCodesAdapter.OnCodeDeleteClickListener onCodeDeleteClickListener) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull
    @java.lang.Override
    public com.example.qrgeneratorfrontend.adapters.QRCodesAdapter.QRCodeViewHolder onCreateViewHolder(@org.jetbrains.annotations.NotNull
    android.view.ViewGroup parent, int viewType) {
        return null;
    }
    
    @java.lang.Override
    public int getItemCount() {
        return 0;
    }
    
    @java.lang.Override
    public void onBindViewHolder(@org.jetbrains.annotations.NotNull
    com.example.qrgeneratorfrontend.adapters.QRCodesAdapter.QRCodeViewHolder holder, int position) {
    }
    
    public final void refreshData(@org.jetbrains.annotations.NotNull
    java.util.List<com.example.qrgeneratorfrontend.classes.QRCodeIdDelete> newCodes) {
    }
    
    @kotlin.Metadata(mv = {1, 8, 0}, k = 1, d1 = {"\u0000*\n\u0002\u0018\u0002\n\u0002\u0018\u0002\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0002\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0002\b\u0003\n\u0002\u0018\u0002\n\u0002\b\u0005\b\u0007\u0018\u00002\u00020\u0001B\r\u0012\u0006\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004R\u0011\u0010\u0005\u001a\u00020\u0006\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0007\u0010\bR\u0011\u0010\t\u001a\u00020\n\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000b\u0010\fR\u0011\u0010\r\u001a\u00020\u000e\u00a2\u0006\b\n\u0000\u001a\u0004\b\u000f\u0010\u0010R\u0011\u0010\u0011\u001a\u00020\u0006\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0012\u0010\b\u00a8\u0006\u0013"}, d2 = {"Lcom/example/qrgeneratorfrontend/adapters/QRCodesAdapter$QRCodeViewHolder;", "Landroidx/recyclerview/widget/RecyclerView$ViewHolder;", "itemView", "Landroid/view/View;", "(Landroid/view/View;)V", "deleteButton", "Landroid/widget/Button;", "getDeleteButton", "()Landroid/widget/Button;", "nameTextView", "Landroid/widget/TextView;", "getNameTextView", "()Landroid/widget/TextView;", "progressBar", "Landroid/widget/ProgressBar;", "getProgressBar", "()Landroid/widget/ProgressBar;", "viewButton", "getViewButton", "app_debug"})
    public static final class QRCodeViewHolder extends androidx.recyclerview.widget.RecyclerView.ViewHolder {
        @org.jetbrains.annotations.NotNull
        private final android.widget.TextView nameTextView = null;
        @org.jetbrains.annotations.NotNull
        private final android.widget.Button viewButton = null;
        @org.jetbrains.annotations.NotNull
        private final android.widget.Button deleteButton = null;
        @org.jetbrains.annotations.NotNull
        private final android.widget.ProgressBar progressBar = null;
        
        public QRCodeViewHolder(@org.jetbrains.annotations.NotNull
        android.view.View itemView) {
            super(null);
        }
        
        @org.jetbrains.annotations.NotNull
        public final android.widget.TextView getNameTextView() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull
        public final android.widget.Button getViewButton() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull
        public final android.widget.Button getDeleteButton() {
            return null;
        }
        
        @org.jetbrains.annotations.NotNull
        public final android.widget.ProgressBar getProgressBar() {
            return null;
        }
    }
    
    @kotlin.Metadata(mv = {1, 8, 0}, k = 1, d1 = {"\u0000\u0016\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0010\u0002\n\u0000\n\u0002\u0018\u0002\n\u0000\bf\u0018\u00002\u00020\u0001J\u0010\u0010\u0002\u001a\u00020\u00032\u0006\u0010\u0004\u001a\u00020\u0005H&\u00a8\u0006\u0006"}, d2 = {"Lcom/example/qrgeneratorfrontend/adapters/QRCodesAdapter$OnCodeDeleteClickListener;", "", "onDeleteClick", "", "item", "Lcom/genezio/sdk/QRCodeId;", "app_debug"})
    public static abstract interface OnCodeDeleteClickListener {
        
        public abstract void onDeleteClick(@org.jetbrains.annotations.NotNull
        com.genezio.sdk.QRCodeId item);
    }
}