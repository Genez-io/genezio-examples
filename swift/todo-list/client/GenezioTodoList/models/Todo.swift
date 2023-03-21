//
//  Todo.swift
//  GenezioTodoList
//
//  Created by Iulian-Bogdan Vlad on 21.03.2023.
//

import Foundation

class Todo {
    var _id: String
    var title: String
    var solved: Bool

    init?(params: NSDictionary) {
        guard let _id = params["_id"] as? String else {
            return nil
        }

        guard let title = params["title"] as? String else {
            return nil
        }
        
        guard let solved = params["solved"] as? Bool else {
            return nil
        }
        
        self._id = _id
        self.title = title
        self.solved = solved
    }
}

