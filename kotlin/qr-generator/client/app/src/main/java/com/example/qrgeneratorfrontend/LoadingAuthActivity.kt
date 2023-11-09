package com.example.qrgeneratorfrontend

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import com.example.qrgeneratorfrontend.viewModels.UserViewModel
import com.genezio.sdk.User
import com.genezio.sdk.UserId
import com.google.gson.Gson

class LoadingAuthActivity : AppCompatActivity() {


    private lateinit var userViewModel : UserViewModel
    private lateinit var userCred: User

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_loading_auth)
        val intentAuth: Intent = intent
        val gson : Gson = Gson()
        val jsonString = intentAuth.getStringExtra("userLogged")
        val jsonStringStatus = intentAuth.getStringExtra("status")
        userCred = gson.fromJson(jsonString, User::class.java)

        if(userCred ==null){
            val intentLogin = Intent(this,MainActivity::class.java)
            startActivity(intentLogin)
        }

        userViewModel = ViewModelProvider(this)[UserViewModel::class.java]

        userViewModel.userLoggedIn.observe(this) { user ->
            if (user != null && user.size == 1) {
                val intent : Intent = Intent(this, LoadingCodesActivity::class.java)
                val gson = Gson()
                val jsonStringUser = gson.toJson(user[0])
                intent.putExtra("userLogged",jsonStringUser)
                startActivity(intent)
                finish()
            }
        }

        if(jsonStringStatus=="register"){
            userViewModel.addUser(userCred)
        }
        else{
            userViewModel.loginUser(userCred)
        }
    }
}