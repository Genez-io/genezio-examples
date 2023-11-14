package com.example.qrgeneratorfrontend

import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.view.View
import android.widget.Button
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
    private lateinit var shareBtn: Button

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
        var imageBitmap: Bitmap? = null
        userLogged = gson.fromJson(jsonString, UserId::class.java)

        val imageView : ImageView = binding.idQrcodeView
        progressBar = binding.loadingProgressBarViewQr
        titleView = binding.idTitleViewQr
        shareBtn = binding.idBtnShare

        imageView.visibility = View.GONE
        titleView.visibility = View.GONE
        progressBar.visibility = View.VISIBLE



        qrCodeViewModel = ViewModelProvider(this, QRCodeViewModelFactory(userLogged))[QRCodeViewModel::class.java]
        qrCodeViewModel.qrcodes.observe(this, Observer { qrcodes ->
            if(qrcodes != null){
                for(elem in qrcodes){
                    if(elem._id == jsonStringId){
                        val bitmap : Bitmap = BitmapFactory.decodeByteArray(elem.bitmap,0,elem.bitmap.size)
                        imageBitmap = bitmap
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

        shareBtn.setOnClickListener{
            if(imageBitmap==null){
                showAlertDialog("Wait for the Qr code to be loaded")
                return@setOnClickListener
            }
//            val mBitmap = (imageBitmap as BitmapDrawable).bitmap

            val path = MediaStore.Images.Media.insertImage(contentResolver,imageBitmap,"Image Description",null)

            val uri = Uri.parse(path)

            val shareIntent = Intent(Intent.ACTION_SEND)
            shareIntent.type="image/*"
            shareIntent.putExtra(Intent.EXTRA_TEXT,"This is the text that's you want to share with your image")
            shareIntent.putExtra(Intent.EXTRA_STREAM,uri)
            startActivity(Intent.createChooser(shareIntent,"share image"))

        }





        setContentView(binding.root)
    }
}