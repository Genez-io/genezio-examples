package com.example.qrgeneratorfrontend

import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.ProgressBar
import android.widget.TextView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.qrgeneratorfrontend.adapters.QRCodesAdapter
import com.example.qrgeneratorfrontend.databinding.ActivityDashboardBinding
import com.example.qrgeneratorfrontend.databinding.ActivityViewCodeBinding
import com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel
import com.example.qrgeneratorfrontend.viewModelsFactory.QRCodeViewModelFactory
import com.genezio.sdk.QRCodeId
import com.genezio.sdk.UserId
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.gson.Gson

class ViewCodeActivity : AppCompatActivity() {
    private lateinit var binding: ActivityViewCodeBinding
    private lateinit var userLogged: UserId

    private lateinit var qrCodeViewModel: QRCodeViewModel
    private lateinit var progressBar: ProgressBar
    private lateinit var titleView: TextView

    fun showAlertDialog(text: String){

        MaterialAlertDialogBuilder(this).setTitle("Alert").setMessage(text).setPositiveButton("OK"){ dialog, which ->
            // Handle the "OK" button click event
            // You can perform actions here if needed
        }.show()


    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_view_code)

        binding = ActivityViewCodeBinding.inflate(layoutInflater)


        val intentAuth: Intent = intent
        val gson : Gson = Gson()
        val jsonString = intentAuth.getStringExtra("userLogged")
        val jsonStringId = intentAuth.getStringExtra("codeId")
        userLogged = gson.fromJson(jsonString, UserId::class.java)

        val imageView : ImageView = binding.idQrcodeView
        progressBar = binding.loadingProgressBarViewQr
        titleView = binding.idTitleViewQr

        imageView.visibility = View.GONE
        titleView.visibility = View.GONE
        progressBar.visibility = View.VISIBLE



        qrCodeViewModel = ViewModelProvider(this, QRCodeViewModelFactory(userLogged))[QRCodeViewModel::class.java]
        qrCodeViewModel.qrcodes.observe(this, Observer { qrcodes ->
            if(qrcodes != null){
                for(elem in qrcodes){
                    if(elem._id == jsonStringId){
                        val bitmap : Bitmap = BitmapFactory.decodeByteArray(elem.bitmap,0,elem.bitmap.size)
                        if(bitmap != null){
                            imageView.setImageBitmap(bitmap)
                            progressBar.visibility = View.GONE
                            imageView.visibility = View.VISIBLE
                            titleView.text = elem.name
                            titleView.visibility= View.VISIBLE

                        }
                        else{
                            showAlertDialog("Error at getting the qr code")
                        }
                    }
                }
            }
        })

        setContentView(binding.root)
    }
}