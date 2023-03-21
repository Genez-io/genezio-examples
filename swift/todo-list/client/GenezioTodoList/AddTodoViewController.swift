//
//  AddTodoViewController.swift
//  GenezioTodoList
//
//  Created by Iulian-Bogdan Vlad on 21.03.2023.
//

import UIKit
import Foundation

class AddTodoViewController: UIViewController {

    @IBOutlet var titleTextField: UITextField!;
    
    @IBAction func addTodoButtonPressed(sender: UIButton) {
        guard let titleText = titleTextField.text else {
            NSLog("Missing title.")
            return
        }
        
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
        
        Task {
            guard
                let result = await TaskService.createTask(token: token, title: titleText, ownerId: userId) as? NSDictionary,
                (result["success"] as? Int == 1) else {
                NSLog("Error!")
                return
            }
            
            DispatchQueue.main.async {
                self.navigationController?.popViewController(animated: true)
            }
        }
    }
}
