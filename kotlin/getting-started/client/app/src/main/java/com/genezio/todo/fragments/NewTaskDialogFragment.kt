package com.genezio.todo.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.DialogFragment
import com.genezio.sdk.Task
import com.genezio.todo.R
import com.genezio.todo.viewmodels.TaskViewModel


class NewTaskDialogFragment(private val viewModel: TaskViewModel) : DialogFragment() {

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val layout = inflater.inflate(R.layout.fragment_newtaskdialog, container, false)

        val dialogCancel : Button = layout.findViewById(R.id.cancelButton)
        dialogCancel.setOnClickListener{
            dismiss()
        }

        val newTaskSubmit : Button = layout.findViewById(R.id.submitButton)
        newTaskSubmit.setOnClickListener {
            val titleView : TextView = layout.findViewById(R.id.newTaskTitle)
            val descView : TextView = layout.findViewById(R.id.newTaskDescription)
            val newTask = Task(titleView.text.toString(), descView.text.toString(), false)

            viewModel.addTask(newTask)
            dismiss()
        }
        return layout
    }
}