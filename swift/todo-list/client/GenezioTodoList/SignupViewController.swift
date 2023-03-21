//
//  SignupViewController.swift
//  GenezioTodoList
//
//  Created by Iulian-Bogdan Vlad on 20.03.2023.
//

import UIKit
import Foundation

class SignupViewController: UIViewController {

    @IBOutlet var name: UITextField!;
    @IBOutlet var email: UITextField!;
    @IBOutlet var password: UITextField!;
 
    @IBAction func signupButtonPressed(sender: UIButton) {
        guard let name = name.text else {
            NSLog("Wrong Password!")
            return
        }
        
        guard let email = email.text else {
            NSLog("Wrong email!")
            return
        }
        
        guard let password = password.text else {
            NSLog("Wrong Password!")
            return
        }
        
        Task {
            let result = await UserService.register(name: name, email: email, password: password) as! NSDictionary
            let success = result["success"] as! Int
            
            if (success == 0) {
                NSLog("Show error to user because login failed!")
                return
            }
            
            self.navigationController?.popViewController(animated: true)
        }
    }
}
