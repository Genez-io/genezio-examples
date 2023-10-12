package com.genezio.todo.viewmodels


import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.genezio.sdk.Task
import com.genezio.sdk.TaskService
import kotlinx.coroutines.launch
import java.lang.Exception

class TaskViewModel : ViewModel() {

    // The internal MutableLiveData that stores the status of the most recent request
    private val _status = MutableLiveData<String>()

    // The external immutable LiveData for the request status
    val status: LiveData<String> = _status

    // Internally, we use a MutableLiveData, because we will be updating the List of MarsPhoto
    // with new values
    private val _tasks = MutableLiveData<ArrayList<Task>>()

    // The external LiveData interface to the property is immutable, so only this class can modify
    val tasks: LiveData<ArrayList<Task>> = _tasks

    init {
        getTasks()
    }

    private fun getTasks() {
        viewModelScope.launch {
            _status.value = "PENDING"
            try {
                _tasks.value = TaskService().fetchTasks()
                _status.value = "SUCCESS"
            } catch (e : Exception) {
                println(e)
                _tasks.value = arrayListOf()
                _status.value = "FAILURE"
            }
        }
    }

    fun addTask(task: Task) {
        viewModelScope.launch {
            _status.value = "PENDING"
            try {
                TaskService().addNewTask(task)
                _tasks.value = TaskService().fetchTasks()
                _status.value = "SUCCESS"
            } catch (e : Exception) {
                _tasks.value = arrayListOf()
                _status.value = "FAILURE"
            }
        }
    }

}