package com.example.qrgeneratorfrontend

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.qrgeneratorfrontend.adapters.QRCodesAdapter
import com.example.qrgeneratorfrontend.classes.QRCodeIdDelete
import com.example.qrgeneratorfrontend.databinding.ActivityDashboardBinding
import com.example.qrgeneratorfrontend.viewModels.QRCodeViewModel
import com.example.qrgeneratorfrontend.viewModelsFactory.QRCodeViewModelFactory
import com.genezio.sdk.QRCodeId
import com.genezio.sdk.UserId
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class DashboardActivity : AppCompatActivity(), QRCodesAdapter.OnCodeDeleteClickListener {

    private lateinit var binding: ActivityDashboardBinding
    private lateinit var userLogged: UserId

    private lateinit var qrCodeViewModel: QRCodeViewModel

    private lateinit var fabButton: FloatingActionButton


//    private var codesLoaded : ArrayList<QRCodeId>?  = null
    private lateinit var qrCodesAdapter: QRCodesAdapter


    fun showAlertDialog(text: String){

        MaterialAlertDialogBuilder(this).setTitle("Alert").setMessage(text).setPositiveButton("OK"){ dialog, which ->
            // Handle the "OK" button click event
            // You can perform actions here if needed
        }.show()


    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)

        val intentAuth: Intent = intent
        val gson : Gson = Gson()
        val jsonString = intentAuth.getStringExtra("userLogged")
        userLogged = gson.fromJson(jsonString, UserId::class.java)


        val recyclerView = binding.qrRecyclerView
        val progressBar = binding.loadingProgressBarDashboard
        progressBar.visibility = View.VISIBLE
        recyclerView.visibility = View.GONE
        qrCodesAdapter = QRCodesAdapter(listOf(),this,userLogged,this)
        binding.qrRecyclerView.layoutManager = LinearLayoutManager(this)
        binding.qrRecyclerView.adapter = qrCodesAdapter


        qrCodeViewModel = ViewModelProvider(this, QRCodeViewModelFactory(userLogged))[QRCodeViewModel::class.java]
        qrCodeViewModel.qrcodes.observe(this, Observer { qrcodes ->
            if(qrcodes != null){
                val listOfQrIdDel = ArrayList<QRCodeIdDelete>()
                for (elem in qrcodes){
                    val newItem = QRCodeIdDelete(elem._id,elem.userId,elem.name,elem.bitmap,false)
                    listOfQrIdDel.add(newItem)
                }
                qrCodesAdapter.refreshData(listOfQrIdDel)
                recyclerView.visibility = View.VISIBLE
                progressBar.visibility = View.GONE
            }
        })

        qrCodeViewModel.status.observe(this, Observer { status ->
            if(status == "FAILURE" && qrCodeViewModel.error.value != "" && qrCodeViewModel.error.value != null){
                progressBar.visibility = View.INVISIBLE
                qrCodesAdapter.refreshData(listOf())
                showAlertDialog(qrCodeViewModel.error.value.toString())
            }
        })

        fabButton = binding.fab
        fabButton.setOnClickListener {
            val intentCreate : Intent = Intent(this, CreateQRCodeActivity::class.java)
            val gson = Gson()
            val jsonString = gson.toJson(userLogged)
            intentCreate.putExtra("userLogged",jsonString)
            startActivity(intentCreate)
        }
        setContentView(binding.root)
    }

    override fun onDeleteClick(item: QRCodeId) {
        qrCodeViewModel.deleteQRCode(item,userLogged)
    }


//    override fun onResume() {
//        super.onResume()
//        val recyclerView = binding.qrRecyclerView
//        val progressBar = binding.loadingProgressBarDashboard
//        recyclerView.visibility = View.GONE
//        progressBar.visibility = View.VISIBLE
//        if(userLogged!=null){
//            println("On resume called")
//            qrCodeViewModel.getCodes(userLogged)
//        }
//    }

    override fun onBackPressed() {
        val intent = Intent(this,MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP;
        intent.putExtra("EXIT", true);
        startActivity(intent);
        super.onBackPressed()
    }
}