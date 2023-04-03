//
//  ListViewController.swift
//  GenezioTodoList
//
//  Created by Iulian-Bogdan Vlad on 20.03.2023.
//

import UIKit
import Foundation

class ListViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    @IBOutlet var tableView: UITableView!;
    var todoList: [Todo] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.delegate = self
        tableView.dataSource = self
        navigationItem.hidesBackButton = true
    }
    

    func refresh() {
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
                let taskResponse = await TaskService.getAllTasksByUser(token: token, userId: userId) as? NSDictionary,
                (taskResponse["success"] as? Int == 1) else {
                NSLog("Error!")
                return
            }
            
            todoList = []
            (((taskResponse )["tasks"]) as! [Any]).forEach { task in
                todoList.append(Todo(params: task as! NSDictionary)!)
            }
            
            DispatchQueue.main.async {
                self.tableView.reloadData()
            }
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        NSLog("view will appear is called")
     
        refresh()
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        NSLog("Count is " + todoList.count.description)
        return todoList.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "todos", for: indexPath)
        let todo = todoList[indexPath.row]
        
        let solved = todo.solved ? " - Done" : ""
        cell.textLabel?.text = todo.title + solved
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let todo = todoList[indexPath.row]
        
        Task {
            guard let email = UserDefaults.standard.string(forKey: "loggedInEmail") else {
                NSLog("Not logged in1")
                return
            }

            guard let token = KeychainManager.retrieveToken(username: email) else {
                NSLog("Not logged in3")
                return
            }
            
            await TaskService.updateTask(token: token, id: todo._id, title: todo.title, solved: !todo.solved)
            
            refresh()
        }
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Remove the todo from the data source
            let todo = todoList.remove(at: indexPath.row)
            
            // Delete the row from the table view
            tableView.deleteRows(at: [indexPath], with: .fade)
            
            Task {
                guard let email = UserDefaults.standard.string(forKey: "loggedInEmail") else {
                    NSLog("Not logged in1")
                    return
                }

                guard let token = KeychainManager.retrieveToken(username: email) else {
                    NSLog("Not logged in3")
                    return
                }
                
                await TaskService.deleteTask(token: token, id: todo._id)
            }
        }
    }
    
    @IBAction func logoutButtonPressed(sender: UIButton) {
        guard let email = UserDefaults.standard.string(forKey: "loggedInEmail") else {
            NSLog("Not logged in1")
            return
        }

        KeychainManager.delete(username: email)
        UserDefaults.standard.removeObject(forKey: "loggedInEmail")
        UserDefaults.standard.removeObject(forKey: "userId")
        
        DispatchQueue.main.async {
            self.navigationController?.popViewController(animated: true)
        }
    }
}
