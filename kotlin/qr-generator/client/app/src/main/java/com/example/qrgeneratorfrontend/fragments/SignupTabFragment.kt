package com.example.qrgeneratorfrontend.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.ProgressBar
import androidx.activity.viewModels
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.qrgeneratorfrontend.DashboardActivity
import com.example.qrgeneratorfrontend.LoadingAuthActivity
import com.example.qrgeneratorfrontend.LoadingCodesActivity
import com.example.qrgeneratorfrontend.R
import com.example.qrgeneratorfrontend.viewModels.UserViewModel
import com.genezio.sdk.User
import com.genezio.sdk.UserResponse
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.example.qrgeneratorfrontend.databinding.ActivityMainBinding
import com.example.qrgeneratorfrontend.databinding.FragmentSignupTabBinding
import com.genezio.sdk.UserId
import com.google.gson.Gson
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.runBlocking


class SignupTabFragment : Fragment() {

    private lateinit var userViewModel : UserViewModel
    private lateinit var signupButton: Button
    private lateinit var progressBar: ProgressBar
    /**
     * Inflates the layout with Data Binding, sets its lifecycle owner to the OverviewFragment
     * to enable Data Binding to observe LiveData, and sets up the RecyclerView with an adapter.
     */

    fun showAlertDialog(text: String){

        MaterialAlertDialogBuilder(requireContext()).setTitle("Alert").setMessage(text).setPositiveButton("OK"){ dialog, which ->
            // Handle the "OK" button click event
            // You can perform actions here if needed
        }.show()


    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment

        userViewModel = ViewModelProvider(requireActivity())[UserViewModel::class.java]


        val binding : FragmentSignupTabBinding =  FragmentSignupTabBinding.inflate(inflater)

        signupButton = binding.signupButton
        progressBar = binding.progressSignup

        val layout = inflater.inflate(R.layout.fragment_signup_tab,container,false)
        // Allows Data Binding to Observe LiveData with the lifecycle of this Fragment
        binding.lifecycleOwner = this
        binding.viewModelUser = userViewModel

//        userViewModel.users.observe(viewLifecycleOwner, Observer { users -> usersLoaded = users  })
        userViewModel.userLoggedIn.observe(viewLifecycleOwner, Observer { user ->
            if(user != null && user.size == 1){
                navigateDashboard(user[0])
                signupButton.visibility = View.VISIBLE
                progressBar.visibility = View.INVISIBLE
            }
        })
        userViewModel.status.observe(viewLifecycleOwner, Observer { status ->
            if(status == "FAILURE" && userViewModel.error.value != "" && userViewModel.error.value != null){
                signupButton.visibility = View.VISIBLE
                progressBar.visibility = View.INVISIBLE
                showAlertDialog(userViewModel.error.value!!)
            }
        })


        signupButton.setOnClickListener {
            val email: String = binding.signupEmail.text.toString()
            val password: String = binding.signupPassword.text.toString()
            val passwordConfirm: String = binding.signupConfirm.text.toString()



            if(email ==""){
                showAlertDialog("Email is mandatory")
                return@setOnClickListener
            }
            if (password != passwordConfirm) {

                showAlertDialog("Passwords are not the same")
                return@setOnClickListener
            }
            if(password == "" || passwordConfirm ==""){
                showAlertDialog("Both passwords are mandatory")
                return@setOnClickListener
            }


            val newUser = User(email, password)
            userViewModel.addUser(newUser)
            signupButton.visibility = View.GONE
            progressBar.visibility = View.VISIBLE

        }

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)







    }

    private fun navigateLoading(user: User) {
        val intent : Intent = Intent(activity, LoadingAuthActivity::class.java)
        val gson = Gson()
        val jsonString = gson.toJson(user)
        intent.putExtra("userLogged",jsonString)
        intent.putExtra("status","register")
        startActivity(intent)
    }

    private fun navigateDashboard(user: UserId) {
        val intent : Intent = Intent(activity, DashboardActivity::class.java)
        val gson = Gson()
        val jsonString = gson.toJson(user)
        intent.putExtra("userLogged",jsonString)
        startActivity(intent)
    }

    override fun onDestroyView() {
        super.onDestroyView()
    }


}