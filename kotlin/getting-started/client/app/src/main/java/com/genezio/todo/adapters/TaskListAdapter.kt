package com.genezio.todo.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.databinding.BindingAdapter
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.genezio.sdk.Task

import com.genezio.todo.databinding.TaskListItemBinding



class TaskListAdapter : ListAdapter<Task, TaskListAdapter.TaskCardViewHolder>(DiffCallback)  {

    class TaskCardViewHolder(private var binding: TaskListItemBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(task: Task) {
            binding.taskCardTitle.text = task.title
            binding.taskCardDescription.text = task.description

            binding.taskCardButton.setOnClickListener {
                task.status = !task.status
                if (task.status) {
                    binding.taskCardButton.text = "Mark Unfinished"
                } else {
                    binding.taskCardButton.text = "Mark Finished"
                }
            }
        }
    }

    companion object DiffCallback : DiffUtil.ItemCallback<Task>() {
        override fun areItemsTheSame(oldItem: Task, newItem: Task): Boolean {
            return oldItem.title == newItem.title
        }

        override fun areContentsTheSame(oldItem: Task, newItem: Task): Boolean {
            return oldItem.title == newItem.title
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TaskCardViewHolder {
        return TaskCardViewHolder(
            TaskListItemBinding.inflate(LayoutInflater.from(parent.context))
        )
    }

    override fun onBindViewHolder(holder: TaskCardViewHolder, position: Int) {
        val task = getItem(position)
        holder.bind(task)
    }
}

@BindingAdapter("listData")
fun bindRecyclerView(recyclerView: RecyclerView, data: ArrayList<Task>?) {
    val adapter = recyclerView.adapter as TaskListAdapter
    adapter.submitList(data)
}