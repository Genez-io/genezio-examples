package com.example.qrgeneratorfrontend

import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.ProgressBar
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel
import com.example.qrgeneratorfrontend.viewModelsFactory.QRCodeViewModelFactory
import com.genezio.sdk.QRCode
import com.genezio.sdk.UserId
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.gson.Gson
import com.google.zxing.BarcodeFormat
import com.google.zxing.BinaryBitmap
import com.google.zxing.MultiFormatWriter
import com.google.zxing.WriterException
import com.google.zxing.common.BitMatrix
import com.journeyapps.barcodescanner.BarcodeEncoder
import java.io.ByteArrayOutputStream

class CreateQRCodeActivity : AppCompatActivity() {

    // on below line we are creating a variable
    // for our image view, edit text and a button.
    private lateinit var qrIV: ImageView
    private lateinit var msgEdt: EditText
    private lateinit var generateQRBtn: Button
    private lateinit var saveQRBtn: Button
    private lateinit var nameEdit: EditText
    private lateinit var progressBar: ProgressBar

    // on below line we are creating
    // a variable for bitmap
    private lateinit var bitmap: Bitmap
    private var imageSet : Boolean = false

    private lateinit var qrCodeViewModel: QRCodeViewModel
    private lateinit var userLogged: UserId

    fun showAlertDialog(text: String){

        MaterialAlertDialogBuilder(this).setTitle("Alert").setMessage(text).setPositiveButton("OK"){ dialog, which ->
            // Handle the "OK" button click event
            // You can perform actions here if needed
        }.show()


    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_qrcode)

        saveQRBtn = findViewById(R.id.idBtnQRSave)
        progressBar = findViewById(R.id.loadingProgressBarCreate)

        val intentAuth: Intent = intent
        val gson : Gson = Gson()
        val jsonString = intentAuth.getStringExtra("userLogged")
        userLogged = gson.fromJson(jsonString, UserId::class.java)

        qrCodeViewModel = ViewModelProvider(this, QRCodeViewModelFactory(userLogged))[QRCodeViewModel::class.java]

        qrCodeViewModel.newCode.observe(this, Observer { newCodeArray ->
            if(newCodeArray != null && newCodeArray.size ==1){
                val intent : Intent = Intent(this, DashboardActivity::class.java)
                val gson = Gson()
                val jsonString = gson.toJson(userLogged)
                intent.putExtra("userLogged",jsonString)
                startActivity(intent)
                finish()
            }
        })

        qrCodeViewModel.status.observe(this, Observer { status ->
            if(status == "FAILURE" && qrCodeViewModel.error.value != "" && qrCodeViewModel.error.value != null){
                progressBar.visibility = View.INVISIBLE
                saveQRBtn.visibility = View.VISIBLE
                showAlertDialog(qrCodeViewModel.error.value.toString())
            }
        })



        nameEdit = findViewById(R.id.idEditName)
        msgEdt = findViewById(R.id.idEdt)
        generateQRBtn = findViewById(R.id.idBtnGenerateQR)
        qrIV = findViewById(R.id.idIVQrcode)


        generateQRBtn.setOnClickListener {
            val sText: String = msgEdt.text.toString().trim();
            val writer: MultiFormatWriter = MultiFormatWriter();

            if(sText == ""){
                showAlertDialog("Please enter your message then generate your qr code")
                return@setOnClickListener
            }



            try {
                val matrix: BitMatrix = writer.encode(sText, BarcodeFormat.QR_CODE,350,350);
                val encoder:BarcodeEncoder = BarcodeEncoder();

                bitmap = encoder.createBitmap(matrix)

                qrIV.setImageBitmap(bitmap);
                imageSet = true
                val manager: InputMethodManager = getSystemService( Context.INPUT_METHOD_SERVICE) as InputMethodManager

                manager.hideSoftInputFromWindow(msgEdt.applicationWindowToken,0)


            }
            catch (e: WriterException) {
                e.printStackTrace();
            }
        }

        saveQRBtn.setOnClickListener {
            if(imageSet == true){
                val name : String = nameEdit.text.toString()
                val byteArrayOutputStream = ByteArrayOutputStream()
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, byteArrayOutputStream)
                val byteArray = byteArrayOutputStream.toByteArray()
                println("THe size of the byte array is " + byteArray.size)
                val newQRCode = QRCode(userLogged._id,name,byteArray)
                qrCodeViewModel.addQRCode(newQRCode,userLogged)
                progressBar.visibility = View.VISIBLE
                saveQRBtn.visibility = View.GONE
                return@setOnClickListener
            }
            else{
                showAlertDialog("No QR Code generated")
                return@setOnClickListener
            }
        }


    }
}

