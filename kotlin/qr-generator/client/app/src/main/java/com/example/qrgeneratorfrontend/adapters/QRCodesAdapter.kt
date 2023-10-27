package com.example.qrgeneratorfrontend.adapters

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.TextView
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.RecyclerView
import com.example.qrgeneratorfrontend.R
import com.example.qrgeneratorfrontend.ViewCodeActivity
import com.example.qrgeneratorfrontend.classes.QRCodeIdDelete
import com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel
import com.example.qrgeneratorfrontend.viewModelsFactory.QRCodeViewModelFactory
import com.genezio.sdk.QRCodeId
import com.genezio.sdk.UserId
import com.google.gson.Gson

class QRCodesAdapter(private var qrCodes: List<QRCodeIdDelete>, context : Context, private val userLoggedIn: UserId, private val onCodeDeleteClickListener: OnCodeDeleteClickListener) : RecyclerView.Adapter<QRCodesAdapter.QRCodeViewHolder>(){



    class QRCodeViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val nameTextView: TextView = itemView.findViewById(R.id.titleTextView)
        val viewButton: Button = itemView.findViewById(R.id.viewQrButton)
        val deleteButton: Button = itemView.findViewById(R.id.deleteQrButton)
        val progressBar: ProgressBar = itemView.findViewById(R.id.loadingProgressBarDeleteQr)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): QRCodeViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.qrcode_item,parent,false)
        return QRCodeViewHolder(view)
    }

    override fun getItemCount(): Int {
        return qrCodes.size
    }

    override fun onBindViewHolder(holder: QRCodeViewHolder, position: Int) {
        val qrCode = qrCodes[position]

        holder.nameTextView.text = qrCode.name
        if(qrCode.isDeleting == true){
            holder.deleteButton.visibility=View.GONE
            holder.progressBar.visibility=View.VISIBLE
        }
        else{
            holder.deleteButton.visibility=View.VISIBLE
            holder.progressBar.visibility=View.GONE

        }
        holder.viewButton.setOnClickListener {
            val intent = Intent(holder.itemView.context,ViewCodeActivity::class.java).apply {
                putExtra("codeId",qrCode._id)
                val gson = Gson()
                val jsonString = gson.toJson(userLoggedIn)
                putExtra("userLogged",jsonString)
            }
            holder.itemView.context.startActivity(intent)
        }
        holder.deleteButton.setOnClickListener{
            val newQrCodeId = QRCodeId(qrCode._id,qrCode.userId,qrCode.name,qrCode.bitmap)
            qrCode.isDeleting=true
            holder.deleteButton.visibility=View.GONE
            holder.progressBar.visibility=View.VISIBLE
            onCodeDeleteClickListener.onDeleteClick(newQrCodeId)
        }

    }


    interface OnCodeDeleteClickListener {
        fun onDeleteClick(item: QRCodeId)
    }
    fun refreshData(newCodes : List<QRCodeIdDelete>){
        qrCodes = newCodes
        notifyDataSetChanged()

    }
}