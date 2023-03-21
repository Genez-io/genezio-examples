//
//  ViewController.swift
//  GenezioTodoList
//
//  Created by Iulian-Bogdan Vlad on 20.03.2023.
//

import UIKit
import Foundation

class LoginViewController: UIViewController {

    @IBOutlet var email: UITextField!;
    @IBOutlet var password: UITextField!;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let email = UserDefaults.standard.string(forKey: "loggedInEmail") else {
            NSLog("Not logged in1")
            return
        }

        guard let userId = UserDefaults.standard.string(forKey: "userId") else {
            NSLog("Not logged in2")
            return
        }
        
        guard let token = KeychainManager.retrieveToken(username: email) else {
            NSLog("Not logged in3")
            return
        }
        
        let customViewController = self.storyboard!.instantiateViewController(withIdentifier: "ListViewController")
        self.navigationController?.pushViewController(customViewController, animated: true)
        // Do any additional setup after loading the view.
    }

    @IBAction func loginButtonPressed(sender: UIButton) {
        NSLog(email.text! + " " + password.text!)
        
        guard let email = email.text else {
            NSLog("Wrong email!")
            return
        }
        
        guard let password = password.text else {
            NSLog("Wrong Password!")
            return
        }

        Task {
            let result = await UserService.login(email: email, password: password) as! NSDictionary

            let success = result["success"] as! Int
            let token = result["token"] as? String
            
            if (success == 0) {
                NSLog("Show error to user because login failed!")
                return
            }
            
            guard let token = token else {
                return
            }
            
            let _id = (result["user"] as! NSDictionary)["_id"] as! String
            
            UserDefaults.standard.set(email, forKey: "loggedInEmail")
            UserDefaults.standard.set(_id, forKey: "userId")
            KeychainManager.saveToken(username: email, token: token)

            DispatchQueue.main.async {
                let customViewController = self.storyboard!.instantiateViewController(withIdentifier: "ListViewController")
                self.navigationController?.pushViewController(customViewController, animated: true)
                self.email.text = ""
                self.password.text = ""
                self.password.resignFirstResponder()
                self.email.resignFirstResponder()
            }
        }
        
    }

}

