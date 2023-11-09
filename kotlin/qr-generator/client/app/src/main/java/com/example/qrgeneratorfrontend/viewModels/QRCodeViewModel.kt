package com.example.qrgeneratorfrontend.viewModels


import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.genezio.sdk.QRCode
import com.genezio.sdk.QRCodeHandler
import com.genezio.sdk.QRCodeId
import com.genezio.sdk.UserHandler
import com.genezio.sdk.UserId
import com.genezio.sdk.UserResponse
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import java.lang.Exception

class QRCodeViewModel(userLoggedIn : UserId) : ViewModel() {

    // The internal MutableLiveData that stores the status of the most recent request
    private val _status = MutableLiveData<String>()

    // The external immutable LiveData for the request status
    val status: LiveData<String> = _status

    // Internally, we use a MutableLiveData, because we will be updating the List of MarsPhoto
    // with new values
    private val _user = MutableLiveData<UserId>()

    // The external LiveData interface to the property is immutable, so only this class can modify
    val user: LiveData<UserId> = _user

    private val _qrcodes = MutableLiveData<ArrayList<QRCodeId>?>()

    val qrcodes: LiveData<ArrayList<QRCodeId>?> = _qrcodes

    private val _newCode = MutableLiveData<ArrayList<QRCodeId>?>()

    val newCode : LiveData<ArrayList<QRCodeId>?> = _newCode

    private val _error = MutableLiveData<String>()

    // The external immutable LiveData for the request status
    val error: LiveData<String> = _error

    private val _viewCode = MutableLiveData<ArrayList<QRCodeId>?>()

    val viewCode : LiveData<ArrayList<QRCodeId>?> = _viewCode

    init {
        _user.value = userLoggedIn
        getCodes(userLoggedIn)
    }

    fun getCodes(user: UserId) {
        viewModelScope.launch {
            _status.value = "PENDING"
            try {
                println("USer in getcodes")
                println(user)
                _qrcodes.value = QRCodeHandler().fetchCodes(user._id).data
                _status.value = "SUCCESS"
            } catch (e : Exception) {
                println(e)
                _qrcodes.value = arrayListOf()
                _error.value = "Unexpcted error please try again later"
                _status.value = "FAILURE"
            }
        }
    }

    fun addQRCode(qrCode: QRCode, user: UserId) {

        viewModelScope.launch {
            _status.value = "PENDING"

            try {
                val res = QRCodeHandler().addNewQRCode(qrCode)
                if(res.success){
                    _newCode.value = res.data
                    _qrcodes.value?.add(res.data!![0])
                    _status.value = "SUCCESS"

                }
                else{
                    _error.value = res.message.toString()
                    _status.value = "FAILURE"
                }


            }
            catch (e : Exception) {
                println(e)
                _error.value = e.message
                _status.value = "FAILURE"
            }
        }
    }

    fun deleteQRCode(qrCodeId: QRCodeId, user: UserId) {
        viewModelScope.launch {
            _status.value = "PENDING"

            try {
                val res = QRCodeHandler().delete(qrCodeId)
                if(res.success){
                    _qrcodes.value = QRCodeHandler().fetchCodes(user._id).data
                    _status.value = "SUCCESS"
                }
                else{
                    println(res)
                    _error.value = res.message.toString()
                    _status.value = "FAILURE"
                }
            }
            catch (e : Exception) {
                println(e)
                _error.value = e.message
                _status.value = "FAILURE"
            }
        }
    }

}