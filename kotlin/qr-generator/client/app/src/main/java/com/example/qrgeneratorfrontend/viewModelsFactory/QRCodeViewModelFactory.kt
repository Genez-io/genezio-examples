package com.example.qrgeneratorfrontend.viewModelsFactory

import android.app.Application
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel
import com.genezio.sdk.UserId


class QRCodeViewModelFactory(private val userLogged: UserId) : ViewModelProvider.Factory {
     override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(QRCodeViewModel::class.java)) {
            return QRCodeViewModel(userLogged) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }

}