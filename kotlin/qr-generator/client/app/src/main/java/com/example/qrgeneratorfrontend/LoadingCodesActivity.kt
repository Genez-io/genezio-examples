package com.example.qrgeneratorfrontend

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel
import com.example.qrgeneratorfrontend.viewModelsFactory.QRCodeViewModelFactory
import com.genezio.sdk.QRCodeId
import com.genezio.sdk.UserId
import com.google.gson.Gson

class LoadingCodesActivity : AppCompatActivity() {
    private lateinit var userLogged: UserId

    private lateinit var qrCodeViewModel: QRCodeViewModel

    private var codesLoaded : ArrayList<QRCodeId>?  = null


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_loading_codes)
        val intentAuth: Intent = intent
        val gson : Gson = Gson()
        val jsonString = intentAuth.getStringExtra("userLogged")
        userLogged = gson.fromJson(jsonString, UserId::class.java)

        if(userLogged ==null){
            val intentLogin = Intent(this,MainActivity::class.java)
            startActivity(intentLogin)
        }

        qrCodeViewModel = ViewModelProvider(this, QRCodeViewModelFactory(userLogged))[QRCodeViewModel::class.java]

        qrCodeViewModel.qrcodes.observe(this, Observer { qrcodes ->
            codesLoaded = qrcodes
            if(codesLoaded != null){
                println(codesLoaded.toString())
                val intent : Intent = Intent(this, DashboardActivity::class.java)
                val gson = Gson()
                val jsonString = gson.toJson(userLogged)
                val jsonStringCodes = gson.toJson(codesLoaded)
                intent.putExtra("userLogged",jsonString)
                intent.putExtra("qrCodes",jsonStringCodes)
                startActivity(intent)
                finish()
            }
          })
    }
}