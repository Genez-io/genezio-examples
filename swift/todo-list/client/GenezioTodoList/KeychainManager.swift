//
//  KeychainManager.swift
//  GenezioTodoList
//
//  Created by Iulian-Bogdan Vlad on 20.03.2023.
//

import Foundation
import Security

class KeychainManager {
    static func saveToken(username: String, token: String) {
        // Set attributes
        let attributes: [String: Any] = [
            kSecClass as String: kSecClassKey,
            kSecAttrApplicationTag as String: username,
            kSecValueData as String: token.data(using: String.Encoding.utf8),
            kSecAttrKeySizeInBits as String: "512"
        ]

        // Add user
        if let x = SecItemAdd(attributes as CFDictionary, nil) as? Int32 {
            if x == noErr {
                print("User saved successfully in the keychain")
            } else {
                print("Something went wrong trying to save the user in the keychain" + x.description)
            }
        }
    }
    
    static func retrieveToken(username: String) -> String? {
        // Set query
        let query: [String: Any] = [
            kSecClass as String: kSecClassKey,
            kSecAttrApplicationTag as String: username,
            kSecMatchLimit as String: kSecMatchLimitOne,
            kSecReturnAttributes as String: true,
            kSecReturnData as String: true,
        ]
        var item: CFTypeRef?

        // Check if user exists in the keychain
        if SecItemCopyMatching(query as CFDictionary, &item) == noErr {
            // Extract result
            if let existingItem = item as? [String: Any],
               let username = existingItem[kSecAttrApplicationTag as String] as? String,
               let passwordData = existingItem[kSecValueData as String] as? Data,
               let password = String(data: passwordData, encoding: .utf8)
            {
                print(username)
                print(password)
                return password
            } else {
                NSLog(item!.description)
            }
        } else {
            print("Something went wrong trying to find the user in the keychain")
        }
        
        return nil
    }
    
    static func delete(username: String) {
        // Set query
        let query: [String: Any] = [
            kSecClass as String: kSecClassKey,
            kSecAttrApplicationTag as String: username,
        ]

        // Find user and delete
        if let x = SecItemDelete(query as CFDictionary) as? Int32 {
            if x == noErr {
                print("User removed successfully from the keychain")
            } else {
                print("Something went wrong trying to remove the user from the keychain" + x.description + " qweq ")
            }
        }
    }
}
