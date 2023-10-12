package com.genezio.todo.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.genezio.todo.adapters.TaskListAdapter
import com.genezio.todo.viewmodels.TaskViewModel
import com.genezio.todo.databinding.ContentMainBinding

class TaskFragment : Fragment() {

    private val viewModel: TaskViewModel by viewModels()

    /**
     * Inflates the layout with Data Binding, sets its lifecycle owner to the OverviewFragment
     * to enable Data Binding to observe LiveData, and sets up the RecyclerView with an adapter.
     */
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = ContentMainBinding.inflate(inflater)

        // Allows Data Binding to Observe LiveData with the lifecycle of this Fragment
        binding.lifecycleOwner = this

        // Giving the binding access to the OverviewViewModel
        binding.viewModel = viewModel

        // Sets the adapter of the photosGrid RecyclerView
        binding.taskList.adapter = TaskListAdapter()

        val newTaskDialog = NewTaskDialogFragment(viewModel)
        binding.fab.setOnClickListener {
            newTaskDialog.show(this.childFragmentManager, "newTaskDialog")
        }
        return binding.root
    }
}