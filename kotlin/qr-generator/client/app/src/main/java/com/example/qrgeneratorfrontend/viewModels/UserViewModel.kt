package com.example.qrgeneratorfrontend.viewModels


import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.genezio.sdk.User
import com.genezio.sdk.UserHandler
import com.genezio.sdk.UserId
import com.genezio.sdk.UserResponse
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import java.lang.Exception

class UserViewModel : ViewModel() {

    // The internal MutableLiveData that stores the status of the most recent request
    private val _status = MutableLiveData<String>()

    // The external immutable LiveData for the request status
    val status: LiveData<String> = _status

    private val _error = MutableLiveData<String>()

    // The external immutable LiveData for the request status
    val error: LiveData<String> = _error

    // Internally, we use a MutableLiveData, because we will be updating the List of MarsPhoto
    // with new values
//    private val _users = MutableLiveData<ArrayList<UserId>?>()

//    // The external LiveData interface to the property is immutable, so only this class can modify
//    val users: LiveData<ArrayList<UserId>?> = _users

    private val _userLoggedIn = MutableLiveData<ArrayList<UserId>?>()

    val userLoggedIn: LiveData<ArrayList<UserId>?> = _userLoggedIn




    init {
        getUsers()
    }

    private fun getUsers() {
        viewModelScope.launch {
            _status.value = "PENDING"
            try {
                _status.value = "SUCCESS"
            } catch (e : Exception) {
                println(e)
                _error.value = "Unexpected error, please try again later"
                _status.value = "FAILURE"

            }
        }
    }

    fun addUser(user: User) {
            viewModelScope.launch {
                 _status.value = "PENDING"
                 try {
                     val res = UserHandler().addNewUser(user)
                     if(res.success){
                         _status.value = "SUCCESS"
                         _userLoggedIn.value = res.data
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

    fun loginUser(user: User) {
        viewModelScope.launch {
            _status.value = "PENDING"
            try {
                val res = UserHandler().login(user)
                if(res.success){
                    _status.value = "SUCCESS"
                    _userLoggedIn.value = res.data
                }
                else{
                    _error.value = res.message.toString()
                    _status.value = "FAILURE"
                }
            }
            catch (e : Exception) {
                _error.value = e.message
                _status.value = "FAILURE"
            }
        }
    }

}